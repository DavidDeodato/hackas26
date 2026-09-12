"""Bounded free TRELLIS Space call; no paid jobs, no app integration."""
import concurrent.futures, datetime, hashlib, json, pathlib, struct, time, uuid
import requests
from huggingface_hub import get_token

BASE = "https://trellis-community-trellis.hf.space"
HERE = pathlib.Path(__file__).resolve().parent
DEST = HERE.parents[1] / "public" / "avatar" / "generated"
DEADLINE = time.monotonic() + 240
token = get_token()
headers = {"Authorization": "Bearer " + token} if token else {}
def say(kind, **kw):
    print(json.dumps({"at": datetime.datetime.now(datetime.timezone.utc).isoformat(), "kind": kind, **kw}, ensure_ascii=True), flush=True)
def run(kind):
    session = requests.Session()
    session.headers.update(headers)
    sid = uuid.uuid4().hex
    config = session.get(BASE + '/config', timeout=20).json()
    dependencies = {x['api_name']: x for x in config['dependencies']}
    components = {x['id']: x for x in config['components']}
    record = {"kind": kind, "space": "trellis-community/TRELLIS", "authenticated": bool(token), "status": "started", "events": []}
    def call(name, data):
        if time.monotonic() >= DEADLINE:
            raise TimeoutError("bounded deadline reached")
        dependency = dependencies[name]
        values = iter(data)
        queue_data = [None if components[cid]['type'] == 'state' else next(values) for cid in dependency['inputs']]
        response = session.post(BASE + "/gradio_api/queue/join", json={"data": queue_data, "session_hash": sid, "fn_index": dependency['id'], "event_data": None}, timeout=25)
        response.raise_for_status()
        event_id = response.json()["event_id"]
        say("submitted", avatar=kind, endpoint=name, event_id=event_id)
        record["events"].append({"endpoint": name, "event_id": event_id})
        with session.get(BASE + "/gradio_api/queue/data", params={"session_hash": sid}, stream=True, timeout=(20, 45)) as stream:
            stream.raise_for_status()
            event = ""
            for raw in stream.iter_lines():
                if time.monotonic() >= DEADLINE:
                    raise TimeoutError("bounded deadline reached while awaiting Space")
                line = raw.decode()
                if line.startswith("event: "):
                    event = line[7:]
                elif line.startswith("data: "):
                    payload = json.loads(line[6:])
                    msg = payload.get('msg')
                    if msg == 'estimation':
                        say('queue', avatar=kind, endpoint=name, rank=payload.get('rank'), queue_size=payload.get('queue_size'))
                    if msg == 'process_completed':
                        output = payload.get('output', {})
                        if payload.get('success'):
                            return output.get('data', [])
                        raise RuntimeError('Space returned error: ' + json.dumps(output)[:1800])
                    if msg in ['unexpected_error', 'server_stopped']:
                        raise RuntimeError('Space returned error: ' + json.dumps(payload)[:1800])
        raise RuntimeError("Space stream ended without result")
    try:
        info = session.get(BASE + "/gradio_api/info", timeout=20).json()["named_endpoints"]
        names = [x["parameter_name"] for x in info["/generate_and_extract_glb"]["parameters"]]
        record["generation_parameters"] = names
        say("parameters", avatar=kind, parameters=names, authenticated=bool(token))
        call("start_session", [])
        image_path = HERE / ("avatar-" + kind + "-input-v1.png")
        with image_path.open("rb") as file:
            upload = session.post(BASE + "/gradio_api/upload", files={"files": (image_path.name, file, "image/png")}, timeout=30)
        upload.raise_for_status()
        uploaded = upload.json()[0]
        preprocessed = call("preprocess_image", [{"path": uploaded, "orig_name": image_path.name, "meta": {"_type": "gradio.FileData"}}])[0]
        values = {"image": preprocessed, "multiimages": [], "is_multiimage": False, "seed": 42,
                  "ss_guidance_strength": 7.5, "ss_sampling_steps": 12,
                  "slat_guidance_strength": 3.0, "slat_sampling_steps": 12,
                  "multiimage_algo": "stochastic", "mesh_simplify": 0.95, "texture_size": 1024}
        result = call("generate_and_extract_glb", [values[n] for n in names])
        record["result"] = result
        def files_in(value):
            if isinstance(value, dict):
                if isinstance(value.get("path"), str) and value["path"].lower().endswith(".glb"):
                    yield value
                else:
                    for v in value.values(): yield from files_in(v)
            elif isinstance(value, list):
                for v in value: yield from files_in(v)
        glb_data = next(files_in(result), None)
        if not glb_data:
            raise RuntimeError("Generation returned no GLB file")
        url = glb_data.get("url") or BASE + "/gradio_api/file=" + glb_data["path"]
        if not url.startswith(BASE + "/"):
            raise RuntimeError("Unexpected artifact origin")
        downloaded = session.get(url, timeout=35)
        downloaded.raise_for_status()
        blob = downloaded.content
        if blob[:4] != b"glTF":
            raise RuntimeError("Downloaded artifact is not GLB")
        version, length = struct.unpack_from("<II", blob, 4)
        if version != 2 or length != len(blob):
            raise RuntimeError("Invalid GLB header")
        json_length, json_type = struct.unpack_from("<II", blob, 12)
        model = json.loads(blob[20:20+json_length])
        target = DEST / ("trellis-" + kind + "-v1.glb")
        if target.exists(): raise FileExistsError(str(target))
        target.write_bytes(blob)
        metrics = {"bytes":len(blob), "sha256":hashlib.sha256(blob).hexdigest(),
                   "meshes":len(model.get("meshes",[])), "nodes":len(model.get("nodes",[])),
                   "skins":len(model.get("skins",[])), "animations":len(model.get("animations",[])),
                   "materials":len(model.get("materials",[])), "textures":len(model.get("textures",[]))}
        record.update(status="glb_downloaded_not_visually_approved", path=str(target), metrics=metrics)
        say("glb_downloaded", avatar=kind, path=str(target), **metrics)
    except Exception as exc:
        message = str(exc)
        if token: message = message.replace(token, "[REDACTED]")
        record.update(status="failed", error=message[:2000])
        say("failed", avatar=kind, error=message[:2000])
    finally:
        (HERE / ("trellis-" + kind + "-attempt.json")).write_text(json.dumps(record, indent=2, ensure_ascii=True), encoding="utf-8")
    return record["status"]

if __name__ == "__main__":
    DEST.mkdir(parents=True, exist_ok=True)
    # Separate input images, same authorized free Space; do not retry quota/auth errors.
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        list(pool.map(run, ["masculine", "feminine"]))

"""Inspect the downloaded GLB and preserve the Space's own preview."""
import hashlib, io, json, pathlib, struct
import requests
from PIL import Image
HERE=pathlib.Path(__file__).resolve().parent
ROOT=HERE.parents[1]
target=ROOT/"public/avatar/generated/trellis-feminine-v1.glb"
blob=target.read_bytes()
offset=12
chunks={}
while offset<len(blob):
    size, kind=struct.unpack_from("<II",blob,offset)
    chunks[kind]=blob[offset+8:offset+8+size]
    offset+=8+size
model=json.loads(chunks[0x4e4f534a])
binary=chunks[0x004e4942]
primitives=[p for m in model["meshes"] for p in m["primitives"]]
triangle_counts=[model["accessors"][p["indices"]]["count"]//3 for p in primitives if "indices" in p]
vertices=[model["accessors"][p["attributes"]["POSITION"]]["count"] for p in primitives]
textures=[]
for index,img in enumerate(model.get("images",[])):
    if "bufferView" in img:
        view=model["bufferViews"][img["bufferView"]]
        data=binary[view.get("byteOffset",0):view.get("byteOffset",0)+view["byteLength"]]
        image=Image.open(io.BytesIO(data))
        textures.append({"index":index,"mimeType":img.get("mimeType"),"width":image.width,"height":image.height,"embedded":True})
report={"asset":str(target),"bytes":len(blob),"sha256":hashlib.sha256(blob).hexdigest(),
        "meshes":len(model.get("meshes",[])),"nodes":len(model.get("nodes",[])),
        "materials":len(model.get("materials",[])),"skins":len(model.get("skins",[])),
        "animations":len(model.get("animations",[])),"triangles":sum(triangle_counts),
        "vertices":sum(vertices),"textures":textures,
        "material_names":[x.get("name") for x in model.get("materials",[])],
        "has_uv":all("TEXCOORD_0" in p["attributes"] for p in primitives),
        "position_bounds":[{k:model["accessors"][p["attributes"]["POSITION"]].get(k) for k in ["min","max"]} for p in primitives],
        "external_resources":[x["uri"] for group in ["buffers","images"] for x in model.get(group,[]) if "uri" in x and not x["uri"].startswith("data:")],
        "visual_qa":"Space preview to inspect separately; application renderer not modified or tested"}
attempt=json.loads((HERE/"trellis-feminine-attempt.json").read_text())
video=next(x["video"] for x in attempt["result"] if isinstance(x,dict) and "video" in x)
response=requests.get(video["url"],timeout=25)
response.raise_for_status()
preview=HERE/"trellis-feminine-space-preview.mp4"
preview.write_bytes(response.content)
report["space_preview"]=str(preview)
report["space_preview_bytes"]=len(response.content)
(HERE/"trellis-feminine-validation.json").write_text(json.dumps(report,indent=2),encoding="utf-8")
print(json.dumps(report,indent=2))


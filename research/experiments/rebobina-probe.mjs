// Bounded mechanism probe. Synthetic scenarios; no AI API or human-learning claim.
import assert from 'node:assert/strict';

function classify(claim, facts) {
  if (!Object.hasOwn(facts, claim.key)) return 'unknown';
  return facts[claim.key] === claim.value ? 'supported' : 'contradicted';
}
function run(scenario, actions) {
  const state = {completed: 0, unsupported: 0, pending: 0, skippedValid: 0};
  const trace = [];
  for (const c of scenario.claims) {
    const action = actions[c.id] ?? 'hold';
    const status = classify(c, scenario.facts);
    if (action === 'accept') {
      if (status === 'supported') state.completed++;
      else state.unsupported++;
    } else if (action === 'correct') {
      if (status === 'contradicted') state.completed++;
      else state.pending++;
    } else if (action === 'ask' && status === 'unknown') {
      state.pending++;
    } else if (status === 'supported') state.skippedValid++;
    else state.pending++;
    trace.push({claim: c.id, status, action, state: {...state}});
  }
  return {state, trace};
}
const scenario = {
  facts: {stock: 4, pickup: '16:00'},
  claims: [{id:'a',key:'stock',value:8},{id:'b',key:'pickup',value:'16:00'},{id:'c',key:'delivery',value:'today'}]
};
const initial = JSON.stringify(scenario);
const blind = run(scenario, {a:'accept',b:'accept',c:'accept'});
const revised = run(scenario, {a:'correct',b:'accept',c:'ask'});
assert.equal(blind.state.unsupported, 2);
assert.deepEqual(revised.state, {completed:2,unsupported:0,pending:1,skippedValid:0});
assert.deepEqual(run(scenario,{a:'correct',b:'accept',c:'ask'}), revised);
assert.equal(JSON.stringify(scenario), initial);
const rejectAll = run(scenario,{a:'hold',b:'hold',c:'hold'});
assert.equal(rejectAll.state.skippedValid,1);
const different = {facts:{approvedDiscount:5,slots:2}, claims:[
  {id:'x',key:'slots',value:2},{id:'y',key:'approvedDiscount',value:10},{id:'z',key:'approval',value:true}
]};
const transfer = run(different,{x:'accept',y:'correct',z:'ask'});
assert.equal(transfer.state.unsupported,0);
assert.equal(transfer.state.completed,2);
assert.equal(transfer.state.pending,1);
// Vary composition: not every exercise has one error and one unknown.
let combinations = 0;
for (const one of ['supported','contradicted','unknown']) {
  for (const two of ['supported','contradicted','unknown']) {
    for (const three of ['supported','contradicted','unknown']) {
      const statuses = [one,two,three];
      const facts = {};
      const claims = statuses.map((status,i) => {
        if (status !== 'unknown') facts['k'+i] = status === 'supported' ? 1 : 0;
        return {id:'c'+i,key:'k'+i,value:1};
      });
      const actions = Object.fromEntries(statuses.map((status,i) => ['c'+i,
        status === 'supported' ? 'accept' : status === 'contradicted' ? 'correct' : 'ask']));
      const result = run({facts,claims}, actions);
      assert.equal(result.state.unsupported,0);
      assert.equal(result.state.completed,statuses.filter(s=>s!=='unknown').length);
      assert.equal(result.state.pending,statuses.filter(s=>s==='unknown').length);
      const reversed = run({facts,claims:[...claims].reverse()},actions);
      assert.deepEqual(reversed.state,result.state);
      combinations++;
    }
  }
}
console.log(JSON.stringify({status:'PASS_SYNTHETIC_MECHANISM_ONLY', baselineAssertions:8, compositionCases:combinations,
  blind:blind.state, revised:revised.state, rejectAll:rejectAll.state, transfer:transfer.state,
  limitations:['No model call','No UI test','No human test','Consequences are authored simulation rules, not real-world prediction']},null,2));

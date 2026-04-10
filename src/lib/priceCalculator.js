export function calculatePrice(wizard, products, priceRules) {
  const { customWidth:w=300, customHeight:h=240, customDepth:d=60,
    kitchenShape:shape="taisna", facadeMaterial, corpusMaterial, surfaceMaterial,
    stovePosition, ovenPosition, fridgePosition, fridgeType } = wizard;
  const shapeM = { taisna:1, L:1.6, U:2.2, sala:1.8 };
  const facadeM2 = parseFloat(((w/100)*(h/100)*shapeM[shape]).toFixed(2));
  const corpusM  = parseFloat(((w/100)*shapeM[shape]*0.7).toFixed(2));
  const counterM = parseFloat(((w/100)*(shape==="L"?1.5:shape==="U"?2:1)).toFixed(2));
  const fp = products.find(p=>p.category==="fasade"&&p.name_lv===facadeMaterial);
  const cp = products.find(p=>p.category==="korpuss"&&p.name_lv===corpusMaterial);
  const sp = products.find(p=>p.category==="virsma"&&p.name_lv===surfaceMaterial);
  let total = 0;
  const bd = {};
  bd.facade  = Math.round((fp?.base_price||90)*facadeM2);
  bd.corpus  = Math.round((cp?.base_price||25)*corpusM);
  bd.surface = Math.round((sp?.base_price||80)*counterM);
  total = bd.facade + bd.corpus + bd.surface;
  if(stovePosition){ const p=products.find(p=>p.category==="tehnika"&&p.name_lv?.includes("Indukcijas")); bd.stove=p?.base_price||350; total+=bd.stove; }
  if(ovenPosition){ const p=products.find(p=>p.category==="tehnika"&&p.name_lv?.includes("standarta")); bd.oven=p?.base_price||280; total+=bd.oven; }
  if(fridgePosition){ const kw=fridgeType==="iebuvejams"?"Iebūvējams":"Atsevišķs"; const p=products.find(p=>p.category==="tehnika"&&p.name_lv?.includes(kw)); bd.fridge=p?.base_price||450; total+=bd.fridge; }
  (priceRules||[]).forEach(r=>{
    if(r.rule_type==="multiplier"&&wizard[r.condition_key]===r.condition_value) total*=r.value;
  });
  const inst = Math.round(total*0.15);
  const vat  = Math.round((total+inst)*0.21);
  return { materials:Math.round(total), installation:inst, vat, total:Math.round(total+inst+vat), breakdown:bd };
}
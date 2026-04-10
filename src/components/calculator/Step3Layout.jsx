import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWizardStore } from "../../store/wizardStore";
const ZONES=[
  {k:"waterPoint",color:"bg-blue-400",label:"step3.water",icon:"💧"},
  {k:"stovePosition",color:"bg-orange-400",label:"step3.stove",icon:"🔥"},
  {k:"ovenPosition",color:"bg-red-400",label:"step3.oven",icon:"⬛"},
  {k:"fridgePosition",color:"bg-cyan-400",label:"step3.fridge",icon:"❄️"},
];
export default function Step3Layout() {
  const{t}=useTranslation(); const store=useWizardStore();
  const[active,setActive]=useState("waterPoint");
  const shape=store.kitchenShape||"taisna";
  function handleClick(zone){
    if(active) store.setField(active,zone);
  }
  const grid=shape==="taisna"?["A1","A2","A3","A4","A5"]:shape==="L"?["A1","A2","A3","B1","B2"]:["A1","A2","A3","B1","B3","C1","C2","C3"]:["A1","A2","A3","A4","A5"];
  const zones=shape==="taisna"?["A1","A2","A3","A4","A5"]:shape==="L"?["A1","A2","A3","B1","B2","B3"]:shape==="U"?["A1","A2","A3","B1","B3","C1","C2","C3"]:["A1","A2","A3","A4","A5","I1","I2","I3"];
  return(
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold mb-1">{t("step3.title")}</h2><p className="text-gray-500">{t("step3.subtitle")}</p></div>
      <div className="flex flex-wrap gap-2">
        {ZONES.map(z=>(
          <button key={z.k} onClick={()=>setActive(z.k)} className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${active===z.k?"border-brand-500 bg-brand-50":"border-gray-200"}`}>
            <span>{z.icon}</span><span>{t(z.label)}</span>
            {store[z.k]&&<span className="text-xs text-green-600 font-bold">✓ {store[z.k]}</span>}
          </button>
        ))}
      </div>
      {active==="fridgePosition"&&store.fridgePosition===null&&(
        <div className="flex gap-3">
          {["iebuvejams","atsevisks"].map(fk=>(
            <button key={fk} onClick={()=>store.setField("fridgeType",fk)} className={`px-4 py-2 rounded-xl border-2 text-sm font-medium ${store.fridgeType===fk?"border-brand-500 bg-brand-50":"border-gray-200"}`}>{t(`step3.fridge_${fk}`)}</button>
          ))}
        </div>
      )}
      <div className="bg-gray-50 rounded-2xl p-4">
        <p className="text-xs text-gray-400 mb-3 text-center">{t("step3.click_to_place")}: <strong>{active&&t(ZONES.find(z=>z.k===active)?.label||"")}</strong></p>
        <div className="flex flex-wrap gap-2 justify-center">
          {zones.map(zone=>{
            const placed=ZONES.find(z=>store[z.k]===zone);
            return(
              <button key={zone} onClick={()=>handleClick(zone)} className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center text-xs font-semibold transition-all ${placed?"border-brand-500 bg-brand-50":"border-gray-200 hover:border-brand-300 hover:bg-white"}`}>
                {placed?<span className="text-lg">{placed.icon}</span>:<span className="text-gray-300">+</span>}
                <span className="text-gray-500">{zone}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWizardStore } from "../../store/wizardStore";
const ZONES=[
  {k:"waterPoint",label:"step3.water",icon:"💧"},
  {k:"stovePosition",label:"step3.stove",icon:"🔥"},
  {k:"ovenPosition",label:"step3.oven",icon:"⬛"},
  {k:"fridgePosition",label:"step3.fridge",icon:"❄️"},
];
const SHAPE_ZONES={
  taisna:["A1","A2","A3","A4","A5"],
  L:["A1","A2","A3","B1","B2","B3"],
  U:["A1","A2","A3","B1","B3","C1","C2","C3"],
  sala:["A1","A2","A3","A4","A5","I1","I2","I3"],
};
export default function Step3Layout() {
  const{t}=useTranslation(); const store=useWizardStore();
  const[active,setActive]=useState("waterPoint");
  const zones=SHAPE_ZONES[store.kitchenShape||"taisna"];
  return(
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold mb-1">{t("step3.title")}</h2><p className="text-gray-500">{t("step3.subtitle")}</p></div>
      <div className="flex flex-wrap gap-2">
        {ZONES.map(z=>(
          <button key={z.k} onClick={()=>setActive(z.k)} className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${active===z.k?"border-amber-500 bg-amber-50":"border-gray-200 hover:border-amber-200"}`}>
            <span>{z.icon}</span><span>{t(z.label)}</span>
            {store[z.k]&&<span className="text-green-600 font-bold text-xs">{t("step3.placed")} {store[z.k]}</span>}
          </button>
        ))}
      </div>
      {active==="fridgePosition"&&(
        <div className="flex gap-3">
          {["iebuvejams","atsevisks"].map(fk=>(
            <button key={fk} onClick={()=>store.setField("fridgeType",fk)} className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${store.fridgeType===fk?"border-amber-500 bg-amber-50":"border-gray-200"}`}>{t(`step3.fridge_${fk}`)}</button>
          ))}
        </div>
      )}
      <div className="bg-gray-50 rounded-2xl p-4">
        <p className="text-xs text-gray-400 mb-3 text-center">{t("step3.click_to_place")}: <strong>{t(ZONES.find(z=>z.k===active)?.label||"")}</strong></p>
        <div className="flex flex-wrap gap-2 justify-center">
          {zones.map(zone=>{
            const placed=ZONES.find(z=>store[z.k]===zone);
            return(
              <button key={zone} onClick={()=>{ if(active) store.setField(active,zone); }} className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center text-xs font-semibold transition-all ${placed?"border-amber-500 bg-amber-50":"border-gray-200 hover:border-amber-300 bg-white"}`}>
                {placed?<span className="text-xl">{placed.icon}</span>:<span className="text-gray-300 text-lg">+</span>}
                <span className="text-gray-500">{zone}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
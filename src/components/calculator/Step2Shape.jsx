import { useTranslation } from "react-i18next";
import { useWizardStore } from "../../store/wizardStore";
const SHAPES=[
  {k:"taisna",svg:<svg viewBox="0 0 80 80" className="w-16 h-16"><rect x="10" y="35" width="60" height="12" fill="currentColor" rx="2"/></svg>},
  {k:"L",svg:<svg viewBox="0 0 80 80" className="w-16 h-16"><rect x="10" y="20" width="12" height="50" fill="currentColor" rx="2"/><rect x="10" y="58" width="60" height="12" fill="currentColor" rx="2"/></svg>},
  {k:"U",svg:<svg viewBox="0 0 80 80" className="w-16 h-16"><rect x="8" y="15" width="12" height="55" fill="currentColor" rx="2"/><rect x="60" y="15" width="12" height="55" fill="currentColor" rx="2"/><rect x="8" y="58" width="64" height="12" fill="currentColor" rx="2"/></svg>},
  {k:"sala",svg:<svg viewBox="0 0 80 80" className="w-16 h-16"><rect x="8" y="15" width="64" height="12" fill="currentColor" rx="2"/><rect x="20" y="50" width="40" height="12" fill="currentColor" rx="2"/></svg>}
];
export default function Step2Shape() {
  const{t}=useTranslation(); const{kitchenShape,setField,planType}=useWizardStore();
  const disabled=planType==="serija"?["sala"]:[]; 
  return(
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold mb-1">{t("step2.title")}</h2><p className="text-gray-500">{t("step2.subtitle")}</p></div>
      <div className="grid grid-cols-2 gap-4">
        {SHAPES.map(({k,svg})=>{
          const dis=disabled.includes(k);
          return(
            <button key={k} disabled={dis} onClick={()=>setField("kitchenShape",k)} className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${dis?"opacity-30 cursor-not-allowed border-gray-100":kitchenShape===k?"border-brand-500 bg-brand-50 text-brand-700":"border-gray-200 hover:border-brand-200 text-gray-400"}`}>
              {svg}
              <span className="font-semibold text-gray-900">{t(`step2.${k}`)}</span>
              <span className="text-xs text-gray-500 text-center">{t(`step2.${k}_desc`)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

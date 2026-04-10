import { useTranslation } from "react-i18next";
import { useWizardStore } from "../../store/wizardStore";
const SHAPES=[
  {k:"taisna",icon:"▬"},
  {k:"L",icon:"⌐"},
  {k:"U",icon:"⊓"},
  {k:"sala",icon:"⊟"},
];
export default function Step2Shape() {
  const{t}=useTranslation(); const{kitchenShape,planType,setField}=useWizardStore();
  const disabled=planType==="serija"?["sala"]:[];
  return(
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold mb-1">{t("step2.title")}</h2><p className="text-gray-500">{t("step2.subtitle")}</p></div>
      <div className="grid grid-cols-2 gap-4">
        {SHAPES.map(({k,icon})=>{
          const dis=disabled.includes(k);
          return(
            <button key={k} disabled={dis} onClick={()=>setField("kitchenShape",k)} className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${dis?"opacity-30 cursor-not-allowed border-gray-100":kitchenShape===k?"border-amber-500 bg-amber-50":"border-gray-200 hover:border-amber-200"}`}>
              <span className="text-4xl">{icon}</span>
              <span className="font-semibold text-gray-900">{t(`step2.${k}`)}</span>
              <span className="text-xs text-gray-500 text-center">{t(`step2.${k}_desc`)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
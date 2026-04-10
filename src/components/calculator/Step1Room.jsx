import { useTranslation } from "react-i18next";
import { useWizardStore } from "../../store/wizardStore";
import { useApartmentTypes } from "../../hooks/useApartmentTypes";
export default function Step1Room() {
  const{t}=useTranslation();
  const store=useWizardStore();
  const{planType,apartmentTypeId,customWidth,customDepth,customHeight}=store;
  const{data:types=[],isLoading}=useApartmentTypes();
  const series=[...new Set(types.map(x=>x.series))];
  return(
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold mb-1">{t("step1.title")}</h2><p className="text-gray-500">{t("step1.subtitle")}</p></div>
      <div className="grid grid-cols-2 gap-4">
        {["serija","brivajs"].map(k=>(
          <button key={k} onClick={()=>store.setField("planType",k)} className={`p-5 rounded-2xl border-2 text-left transition-all ${planType===k?"border-amber-500 bg-amber-50":"border-gray-200 hover:border-amber-200"}`}>
            <div className="font-semibold text-gray-900 mb-1">{t(`step1.${k}`)}</div>
            <div className="text-sm text-gray-500">{t(`step1.${k}_desc`)}</div>
          </button>
        ))}
      </div>
      {planType==="serija"&&(
        <div className="space-y-4">
          {isLoading?<p className="text-gray-400 text-sm">Ielādē...</p>:series.map(s=>(
            <div key={s}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{s}</p>
              <div className="grid grid-cols-2 gap-2">
                {types.filter(x=>x.series===s).map(apt=>(
                  <button key={apt.id} onClick={()=>{store.setField("apartmentTypeId",apt.id);store.setField("customWidth",apt.kitchen_width_cm);store.setField("customDepth",apt.kitchen_depth_cm||60);store.setField("customHeight",apt.ceiling_height_cm||240);}} className={`p-3 rounded-xl border text-sm text-left transition-all ${apartmentTypeId===apt.id?"border-amber-500 bg-amber-50 font-semibold":"border-gray-200 hover:border-amber-200"}`}>
                    <span className="font-medium block">{apt.name_lv||apt.apartment_type}</span>
                    <span className="text-xs text-gray-400">{apt.kitchen_width_cm}×{apt.kitchen_depth_cm||60} cm</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {planType==="brivajs"&&(
        <div className="grid grid-cols-3 gap-4">
          {[["customWidth","step1.width_label",customWidth],["customDepth","step1.depth_label",customDepth],["customHeight","step1.height_label",customHeight]].map(([k,lk,val])=>(
            <div key={k}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t(lk)}</label>
              <input type="number" className="step-input" value={val} onChange={e=>store.setField(k,Number(e.target.value))} min="100" max="800" step="10"/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
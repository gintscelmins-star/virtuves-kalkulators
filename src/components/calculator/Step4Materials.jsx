import { useTranslation } from "react-i18next";
import { useWizardStore } from "../../store/wizardStore";
import { useProductsByCategory } from "../../hooks/useProducts";
const STYLES=["modern","classic","minimal","nordic"];
export default function Step4Materials() {
  const{t}=useTranslation(); const s=useWizardStore();
  const{data:facades=[]}=useProductsByCategory("fasade");
  const{data:corpus=[]}=useProductsByCategory("korpuss");
  const{data:surfaces=[]}=useProductsByCategory("virsma");
  return(
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold mb-1">{t("step4.title")}</h2><p className="text-gray-500">{t("step4.subtitle")}</p></div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{t("step4.facade_style")}</label>
        <div className="flex flex-wrap gap-2">
          {STYLES.map(st=><button key={st} onClick={()=>s.setField("facadeStyle",st)} className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${s.facadeStyle===st?"border-brand-500 bg-brand-50 text-brand-700":"border-gray-200 hover:border-brand-200"}`}>{t(`step4.${st}`)}</button>)}
        </div>
      </div>
      <MaterialPicker label={t("step4.facade_material")} items={facades} field="facadeMaterial" current={s.facadeMaterial} set={s.setField}/>
      <MaterialPicker label={t("step4.corpus_material")} items={corpus} field="corpusMaterial" current={s.corpusMaterial} set={s.setField}/>
      <MaterialPicker label={t("step4.surface_material")} items={surfaces} field="surfaceMaterial" current={s.surfaceMaterial} set={s.setField}/>
    </div>
  );
}
function MaterialPicker({label,items,field,current,set}){
  if(!items.length) return null;
  return(
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {items.map(item=>(
          <button key={item.id} onClick={()=>set(field,item.name_lv)} className={`p-3 rounded-xl border-2 text-sm text-left transition-all ${current===item.name_lv?"border-brand-500 bg-brand-50":"border-gray-200 hover:border-brand-200"}`}>
            <div className="font-medium text-gray-900">{item.name_lv}</div>
            <div className="text-xs text-brand-600 font-semibold">no €{item.base_price}/m²</div>
          </button>
        ))}
      </div>
    </div>
  );
}

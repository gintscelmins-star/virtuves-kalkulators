import { useTranslation } from "react-i18next";
import { usePrice } from "../hooks/usePrice";
export default function PricePanel() {
  const{t}=useTranslation(); const p=usePrice();
  if(!p) return(
    <div className="card bg-brand-50 border-brand-100">
      <h3 className="text-brand-700 font-semibold mb-2">{t("price.title")}</h3>
      <p className="text-sm text-gray-500">Cena tiks rēķināta automātiski</p>
    </div>
  );
  return(
    <div className="card bg-brand-50 border-brand-100 sticky top-24">
      <h3 className="text-brand-700 font-semibold text-lg mb-4">{t("price.title")}</h3>
      <div className="space-y-2 text-sm">
        <Row label={t("price.materials")} val={p.materials}/>
        <Row label={t("price.installation")} val={p.installation}/>
        <div className="border-t pt-2 mt-2"><Row label={t("price.vat")} val={p.vat}/></div>
        <div className="border-t-2 border-brand-300 pt-2 mt-2 font-bold text-base"><Row label={t("price.total")} val={p.total} big/></div>
      </div>
      <p className="text-xs text-gray-400 mt-3">{t("price.disclaimer")}</p>
    </div>
  );
}
function Row({label,val,big}){
  return(<div className={`flex justify-between ${big?"text-brand-800 font-bold":"text-gray-700"}`}><span>{label}</span><span>€{val.toLocaleString()}</span></div>);
}

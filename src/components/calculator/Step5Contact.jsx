import { useTranslation } from "react-i18next";
import { useWizardStore } from "../../store/wizardStore";
import { useLeads } from "../../hooks/useLeads";
import { usePrice } from "../../hooks/usePrice";
export default function Step5Contact() {
  const{t}=useTranslation(); const s=useWizardStore(); const price=usePrice();
  const{submitLead,loading,error}=useLeads();
  async function handleSubmit(e){
    e.preventDefault();
    const lead=await submitLead(s,price);
    if(lead){ s.setField("submitted",true); s.setField("leadId",lead.id); }
  }
  if(s.submitted) return(
    <div className="text-center py-12">
      <div className="text-6xl mb-4">✅</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("step5.success")}</h2>
    </div>
  );
  return(
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold mb-1">{t("step5.title")}</h2><p className="text-gray-500">{t("step5.subtitle")}</p></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">{t("step5.name")} *</label><input required className="step-input" value={s.name} onChange={e=>s.setField("name",e.target.value)} placeholder="Jānis Bērziņš"/></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">{t("step5.phone")} *</label><input required type="tel" className="step-input" value={s.phone} onChange={e=>s.setField("phone",e.target.value)} placeholder="+371 2x xxx xxx"/></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">{t("step5.email")}</label><input type="email" className="step-input" value={s.email} onChange={e=>s.setField("email",e.target.value)} placeholder="janis@gmail.com"/></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">{t("step5.comment")}</label><textarea rows={3} className="step-input resize-none" value={s.comment} onChange={e=>s.setField("comment",e.target.value)}/></div>
        {error&&<p className="text-red-500 text-sm">{t("step5.error")}</p>}
        <button type="submit" disabled={loading||!s.canAdvance()} className="btn-primary w-full">{loading?t("step5.submitting"):t("step5.submit")}</button>
      </form>
    </div>
  );
}
import { useTranslation } from "react-i18next";
import { useWizardStore } from "../store/wizardStore";
export default function Navbar() {
  const{t,i18n}=useTranslation(); const{language,setLanguage}=useWizardStore();
  function toggle(l){ setLanguage(l); i18n.changeLanguage(l); }
  return(
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="https://www.iebuvejamasvirtuves.lv" className="text-brand-700 font-semibold text-sm">← iebuvejamasvirtuves.lv</a>
        <span className="font-semibold text-gray-800 hidden sm:block">{t("nav.title")}</span>
        <div className="flex gap-1">
          {["lv","ru"].map(l=><button key={l} onClick={()=>toggle(l)} className={`px-3 py-1 rounded-lg text-sm font-medium transition ${language===l?"bg-brand-500 text-white":"text-gray-500 hover:bg-gray-100"}`}>{l.toUpperCase()}</button>)}
        </div>
      </div>
    </nav>
  );
}

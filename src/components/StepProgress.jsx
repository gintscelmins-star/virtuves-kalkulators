import { useTranslation } from "react-i18next";
import { useWizardStore } from "../store/wizardStore";
export default function StepProgress() {
  const{t}=useTranslation(); const{currentStep}=useWizardStore();
  return(
    <div className="flex items-center gap-1 mb-8">
      {[1,2,3,4,5].map(n=>(
        <div key={n} className="flex items-center flex-1 last:flex-none">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${n<currentStep?"bg-amber-600 text-white":n===currentStep?"bg-amber-700 text-white ring-4 ring-amber-100":"bg-gray-100 text-gray-400"}`}>{n<currentStep?"✓":n}</div>
          <span className={`hidden sm:block ml-1 text-xs font-medium mr-2 ${n===currentStep?"text-amber-700":"text-gray-400"}`}>{t(`nav_steps.${n}`)}</span>
          {n<5&&<div className={`flex-1 h-0.5 mx-1 ${n<currentStep?"bg-amber-400":"bg-gray-200"}`}/>}
        </div>
      ))}
    </div>
  );
}
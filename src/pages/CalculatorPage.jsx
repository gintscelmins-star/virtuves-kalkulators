import { useTranslation } from "react-i18next";
import { useWizardStore } from "../store/wizardStore";
import Navbar from "../components/Navbar";
import StepProgress from "../components/StepProgress";
import PricePanel from "../components/PricePanel";
import Step1Room from "../components/calculator/Step1Room";
import Step2Shape from "../components/calculator/Step2Shape";
import Step3Layout from "../components/calculator/Step3Layout";
import Step4Materials from "../components/calculator/Step4Materials";
import Step5Contact from "../components/calculator/Step5Contact";
const STEPS=[Step1Room,Step2Shape,Step3Layout,Step4Materials,Step5Contact];
export default function CalculatorPage() {
  const{t}=useTranslation(); const{currentStep,nextStep,prevStep,canAdvance}=useWizardStore();
  const StepComponent=STEPS[currentStep-1];
  return(
    <div className="min-h-screen bg-stone-50">
      <Navbar/>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <StepProgress/>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card min-h-[480px]"><StepComponent/></div>
            <div className="flex gap-3 mt-6">
              {currentStep>1&&<button onClick={prevStep} className="btn-secondary">{t("back")}</button>}
              {currentStep<5&&<button onClick={nextStep} disabled={!canAdvance()} className="btn-primary ml-auto">{t("next")}</button>}
            </div>
          </div>
          <div className="lg:col-span-1"><PricePanel/></div>
        </div>
      </div>
    </div>
  );
}

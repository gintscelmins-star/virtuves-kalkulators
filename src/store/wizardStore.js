import { create } from "zustand";
const init = {
  currentStep:1, totalSteps:5,
  planType:null, apartmentTypeId:null,
  customWidth:360, customDepth:60, customHeight:240,
  kitchenShape:null,
  waterPoint:null, fridgePosition:null, fridgeType:"atsevisks",
  stovePosition:null, ovenPosition:null,
  facadeStyle:"modern", facadeMaterial:null, corpusMaterial:null, surfaceMaterial:null,
  name:"", phone:"", email:"", comment:"",
  language:"lv", submitted:false, leadId:null
};
export const useWizardStore = create((set,get) => ({
  ...init,
  setField:(k,v)=>set({[k]:v}),
  nextStep:()=>set(s=>({currentStep:Math.min(s.currentStep+1,s.totalSteps)})),
  prevStep:()=>set(s=>({currentStep:Math.max(s.currentStep-1,1)})),
  goToStep:(n)=>set({currentStep:n}),
  setLanguage:(l)=>set({language:l}),
  reset:()=>set(init),
  canAdvance:()=>{
    const s=get();
    if(s.currentStep===1) return !!s.planType&&(s.planType==="brivajs"||!!s.apartmentTypeId);
    if(s.currentStep===2) return !!s.kitchenShape;
    if(s.currentStep===3) return !!s.waterPoint;
    if(s.currentStep===4) return !!s.facadeMaterial&&!!s.corpusMaterial&&!!s.surfaceMaterial;
    if(s.currentStep===5) return s.name.trim().length>1&&s.phone.trim().length>7;
    return true;
  }
}));
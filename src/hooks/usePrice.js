import { useMemo } from "react";
import { useWizardStore } from "../store/wizardStore";
import { useProducts } from "./useProducts";
import { usePriceRules } from "./usePriceRules";
import { calculatePrice } from "../lib/priceCalculator";
export function usePrice() {
  const w=useWizardStore(); const{data:products=[]}=useProducts(); const{data:rules=[]}=usePriceRules();
  return useMemo(()=>{ if(!w.kitchenShape||!w.facadeMaterial)return null; return calculatePrice(w,products,rules); },[w,products,rules]);
}

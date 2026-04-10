import { useState } from "react";
import { supabase } from "../lib/supabase";
export function useLeads() {
  const[loading,setLoading]=useState(false); const[error,setError]=useState(null);
  async function submitLead(w,price) {
    setLoading(true); setError(null);
    try {
      const{data,error:e}=await supabase.from("leads").insert({
        name:w.name, phone:w.phone, email:w.email||null, language:w.language,
        configuration:{ planType:w.planType, apartmentTypeId:w.apartmentTypeId, kitchenShape:w.kitchenShape,
          facadeStyle:w.facadeStyle, facadeMaterial:w.facadeMaterial, corpusMaterial:w.corpusMaterial,
          surfaceMaterial:w.surfaceMaterial, fridgeType:w.fridgeType,
          waterPoint:w.waterPoint, fridgePosition:w.fridgePosition, stovePosition:w.stovePosition, ovenPosition:w.ovenPosition },
        estimated_price:price?.total||null, status:"new", notes:w.comment||null
      }).select().single();
      if(e)throw e; return data;
    } catch(e){ setError(e.message); return null; } finally{ setLoading(false); }
  }
  return{submitLead,loading,error};
}

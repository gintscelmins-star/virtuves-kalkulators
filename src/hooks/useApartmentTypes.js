import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
export function useApartmentTypes() {
  return useQuery({
    queryKey:["apartment_types"],
    queryFn:async()=>{ const{data,error}=await supabase.from("apartment_types").select("*").eq("is_active",true).order("series"); if(error)throw error; return data||[]; }
  });
}
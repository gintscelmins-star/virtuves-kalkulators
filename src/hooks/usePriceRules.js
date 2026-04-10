import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
export function usePriceRules() {
  return useQuery({ queryKey:["price_rules"], queryFn:async()=>{ const{data,error}=await supabase.from("price_rules").select("*"); if(error)throw error; return data; } });
}

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
export function useProducts() {
  return useQuery({ queryKey:["products"], queryFn:async()=>{ const{data,error}=await supabase.from("products").select("*").eq("is_active",true); if(error)throw error; return data; } });
}
export function useProductsByCategory(cat) {
  return useQuery({ queryKey:["products",cat], enabled:!!cat, queryFn:async()=>{ const{data,error}=await supabase.from("products").select("*").eq("category",cat).eq("is_active",true); if(error)throw error; return data; } });
}

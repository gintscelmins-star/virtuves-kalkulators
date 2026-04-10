import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
const SC={new:"bg-blue-100 text-blue-700",contacted:"bg-yellow-100 text-yellow-700",quoted:"bg-purple-100 text-purple-700",won:"bg-green-100 text-green-700",lost:"bg-red-100 text-red-700"};
export default function AdminDashboard() {
  const[leads,setLeads]=useState([]); const[loading,setLoading]=useState(true); const nav=useNavigate();
  useEffect(()=>{ supabase.auth.getSession().then(({data:{session}})=>{ if(!session)nav("/admin/login"); }); fetchLeads(); },[]);
  async function fetchLeads(){ const{data}=await supabase.from("leads").select("*").order("created_at",{ascending:false}); setLeads(data||[]); setLoading(false); }
  async function updateStatus(id,status){ await supabase.from("leads").update({status}).eq("id",id); fetchLeads(); }
  async function logout(){ await supabase.auth.signOut(); nav("/admin/login"); }
  if(loading) return <div className="flex items-center justify-center min-h-screen text-gray-400">Ielādē...</div>;
  return(
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Leads ({leads.length})</h1>
          <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-700">Iziet</button>
        </div>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-gray-500">{["Vārds","Tālrunis","E-pasts","Cena","Statuss","Datums"].map(h=><th key={h} className="pb-3 pr-4 font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {leads.map(l=>(
                <tr key={l.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3 pr-4 font-medium">{l.name}</td>
                  <td className="py-3 pr-4"><a href={"tel:"+l.phone} className="text-amber-600">{l.phone}</a></td>
                  <td className="py-3 pr-4 text-gray-500">{l.email||"—"}</td>
                  <td className="py-3 pr-4 font-semibold text-amber-700">{l.estimated_price?"€"+l.estimated_price.toLocaleString():"—"}</td>
                  <td className="py-3 pr-4">
                    <select value={l.status||"new"} onChange={e=>updateStatus(l.id,e.target.value)} className={"text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer "+(SC[l.status||"new"]||"")}>
                      {["new","contacted","quoted","won","lost"].map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="py-3 text-gray-400">{new Date(l.created_at).toLocaleDateString("lv")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length===0&&<p className="text-center text-gray-400 py-8">Nav leads vēl</p>}
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
export default function AdminLogin() {
  const[email,setEmail]=useState(""); const[pass,setPass]=useState(""); const[err,setErr]=useState(""); const nav=useNavigate();
  async function handleLogin(e){
    e.preventDefault(); const{error}=await supabase.auth.signInWithPassword({email,password:pass});
    if(error)setErr(error.message); else nav("/admin");
  }
  return(
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="card w-full max-w-sm">
        <h1 className="text-xl font-bold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" required className="step-input" placeholder="E-pasts" value={email} onChange={e=>setEmail(e.target.value)}/>
          <input type="password" required className="step-input" placeholder="Parole" value={pass} onChange={e=>setPass(e.target.value)}/>
          {err&&<p className="text-red-500 text-sm">{err}</p>}
          <button type="submit" className="btn-primary w-full">Ieiet</button>
        </form>
      </div>
    </div>
  );
}

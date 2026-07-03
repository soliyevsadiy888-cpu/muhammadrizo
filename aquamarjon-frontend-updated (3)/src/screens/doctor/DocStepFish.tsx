import React, { useState } from "react";
import { COLORS } from "../../theme";
import { DBtn } from "../../components/ui/DoctorControls";
import { FISH_OPTIONS_DOCTOR } from "../../data/doctor-content";
import { Pd } from "../../lib/doctor-styles";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = {animation:"slideUpDoc 0.3s ease"} as const;
const __style2 = {fontSize:13,color:Pd.soft,marginBottom:16,lineHeight:1.6} as const;
const __style3 = {fontSize:13,fontWeight:700,color:Pd.soft,marginBottom:10} as const;
const __style4 = {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16} as const;
const __style5 = {width:"100%",background:COLORS.panel,border:`1px solid ${Pd.border}`,borderRadius:10,
            padding:"10px 12px",color:Pd.text,fontSize:13,outline:"none",boxSizing:"border-box",marginBottom:16} as const;


export function DocStepFish({ onNext }) {
  const [fish,setFish]=useState("");
  const [custom,setCustom]=useState("");
  return (
    <div style={__style1}>
      <div style={__style2}>
        AI проанализирует симптомы и подберёт лекарство из нашего каталога.
      </div>
      <div style={__style3}>Какая рыба заболела?</div>
      <div style={__style4}>
        {FISH_OPTIONS_DOCTOR.map(f=>(
          <button key={f} onClick={()=>setFish(f)} style={{
            background:fish===f?Pd.teal+"22":COLORS.panel,
            border:`1px solid ${fish===f?Pd.teal:Pd.border}`,
            borderRadius:10,padding:"10px 8px",
            color:fish===f?Pd.teal:Pd.soft,
            fontSize:13,fontWeight:fish===f?700:400,cursor:"pointer",textAlign:"left",
          }}>{f}</button>
        ))}
      </div>
      {fish==="Другая"&&(
        <input autoFocus value={custom} onChange={e=>setCustom(e.target.value)}
          placeholder="Напишите название рыбы"
          style={__style5}/>
      )}
      <DBtn disabled={!fish||(fish==="Другая"&&!custom.trim())} onClick={()=>onNext(fish==="Другая"?custom:fish)}>
        Далее →
      </DBtn>
    </div>
  );
}


import React, { useState } from "react";
import { COLORS } from "../../theme";
import { BubblesDoc } from "../../components/ui/DoctorControls";
import { Pd } from "../../lib/doctor-styles";
import { AIChatWidget } from "../catalog/AIChatWidget";
import { DocStepDiagnosis } from "./DocStepDiagnosis";
import { DocStepFish } from "./DocStepFish";
import { DocStepSymptoms } from "./DocStepSymptoms";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = {minHeight:"100vh",background:Pd.bg,color:Pd.text,paddingBottom:40} as const;
const __style2 = {background:Pd.card,borderBottom:`1px solid ${Pd.border}`,padding:"16px 16px 14px",position:"relative",overflow:"hidden"} as const;
const __style3 = {position:"relative",zIndex:1} as const;
const __style4 = {background:"none",border:"none",color:Pd.soft,fontSize:13,cursor:"pointer",marginBottom:8,padding:0} as const;
const __style5 = {fontSize:11,color:Pd.teal,fontWeight:700,letterSpacing:1.5,marginBottom:4,textTransform:"uppercase"} as const;
const __style6 = {fontSize:21,fontWeight:900,letterSpacing:-0.5,marginBottom:2} as const;
const __style7 = {fontSize:12.5,color:Pd.muted} as const;
const __style8 = {padding:"14px 16px 0",display:"flex",gap:6,alignItems:"center"} as const;
const __style9 = {display:"flex",alignItems:"center",gap:5} as const;
const __style10 = {padding:"16px 16px 0"} as const;
const __style11 = {padding:"20px 16px 0",fontSize:11.5,color:Pd.muted,textAlign:"center",lineHeight:1.6} as const;
const __style12 = {color:Pd.teal,cursor:"pointer",textDecoration:"underline"} as const;


export function FishDoctorScreen({ onBack, cart, setCart }) {
  const [step,setStep]=useState(1);
  const [fishName,setFishName]=useState("");
  const [diagData,setDiagData]=useState(null);
  const [chatOpen,setChatOpen]=useState(false);
  const [autoEscalate,setAutoEscalate]=useState(false);
  const stepLabels=["Рыба","Симптомы","Диагноз"];
  function reset(){setStep(1);setFishName("");setDiagData(null);}
  function openLiveChat(){ setAutoEscalate(true); setChatOpen(true); }
  return(
    <div style={__style1}>
      <div style={__style2}>
        <BubblesDoc/>
        <div style={__style3}>
          <button onClick={onBack} style={__style4}>← Назад в каталог</button>
          <div style={__style5}>AquaMarjon</div>
          <div style={__style6}>🩺 AI Доктор рыб</div>
          <div style={__style7}>Опишите симптомы — AI поставит диагноз и подберёт лечение</div>
        </div>
      </div>
      <div style={__style8}>
        {stepLabels.map((label,i)=>{
          const n=i+1;const done=step>n;const active=step===n;
          return(
            <div key={n} style={{display:"flex",alignItems:"center",flex:n<3?"1":"none"}}>
              <div style={__style9}>
                <div style={{width:24,height:24,borderRadius:"50%",background:done?Pd.teal:active?Pd.teal+"33":COLORS.panel,border:`1.5px solid ${done||active?Pd.teal:Pd.border}`,color:done?COLORS.bg:active?Pd.teal:Pd.muted,fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {done?"✓":n}
                </div>
                <span style={{fontSize:11.5,color:active?Pd.text:Pd.muted,fontWeight:active?700:400}}>{label}</span>
              </div>
              {n<3&&<div style={{flex:1,height:1,background:done?Pd.teal:Pd.border,margin:"0 6px",transition:"background 0.3s"}}/>}
            </div>
          );
        })}
      </div>
      <div style={__style10}>
        {step===1&&<DocStepFish onNext={name=>{setFishName(name);setStep(2);}}/>}
        {step===2&&<DocStepSymptoms fishName={fishName} onNext={data=>{setDiagData(data);setStep(3);}} onBack={()=>setStep(1)}/>}
        {step===3&&diagData&&<DocStepDiagnosis fishName={fishName} data={diagData} onBack={()=>setStep(2)} onReset={reset} cart={cart} setCart={setCart} onOpenChat={openLiveChat}/>}
      </div>
      <div style={__style11}>
        AI-диагностика не заменяет специалиста. При тяжёлых симптомах — <span onClick={openLiveChat} style={__style12}>напишите нам в чат</span>.
      </div>
      <AIChatWidget cart={cart||[]} open={chatOpen} onOpenChange={(v)=>{setChatOpen(v); if(!v) setAutoEscalate(false);}} autoEscalate={autoEscalate} />
    </div>
  );
}

/* ============================================================
   📔 ДНЕВНИК АКВАРИУМА — интегрированный модуль
   ============================================================ */


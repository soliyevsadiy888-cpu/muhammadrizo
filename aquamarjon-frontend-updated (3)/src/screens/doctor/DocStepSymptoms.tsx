import React, { useRef, useState } from "react";
import { COLORS } from "../../theme";
import { AppleEmoji } from "../../components/ui/AppleEmoji";
import { DBtn } from "../../components/ui/DoctorControls";
import { IconBadge } from "../../components/ui/IconBadge";
import { SYMPTOMS_DOCTOR } from "../../data/doctor-content";
import { Pd } from "../../lib/doctor-styles";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = {animation:"slideUpDoc 0.3s ease"} as const;
const __style2 = {background:Pd.card,border:`1px solid ${Pd.border}`,borderRadius:12,padding:"10px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:8} as const;
const __style3 = {fontSize:20} as const;
const __style4 = {fontSize:13,fontWeight:700} as const;
const __style5 = {background:"none",border:"none",color:Pd.muted,fontSize:11,cursor:"pointer",padding:0} as const;
const __style6 = {fontSize:13,fontWeight:700,color:Pd.soft,marginBottom:10} as const;
const __style7 = {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16} as const;
const __style8 = {lineHeight:1.3} as const;
const __style9 = {marginBottom:6,display:"flex",justifyContent:"center"} as const;
const __style10 = {fontSize:12.5,color:Pd.teal,fontWeight:600} as const;
const __style11 = {fontSize:11,color:Pd.muted,marginTop:2} as const;
const __style12 = {fontSize:13,color:Pd.soft,fontWeight:600} as const;
const __style13 = {fontSize:11.5,color:Pd.muted,marginTop:2} as const;
const __style14 = {display:"none"} as const;
const __style15 = {width:"100%",background:COLORS.panel,border:`1px solid ${Pd.border}`,
          borderRadius:10,padding:"10px 12px",color:Pd.text,fontSize:13,outline:"none",
          resize:"none",boxSizing:"border-box",marginBottom:16} as const;


export function DocStepSymptoms({ fishName, onNext, onBack }: { fishName: string; onNext: (data: any) => void; onBack: () => void }) {
  const [selected,setSelected]=useState<string[]>([]);
  const [photoData,setPhotoData]=useState<string | null>(null);
  const [photoName,setPhotoName]=useState("");
  const [extra,setExtra]=useState("");
  const fileRef=useRef<HTMLInputElement>(null);

  function toggle(id: string){setSelected(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);}
  function handleFile(e: React.ChangeEvent<HTMLInputElement>){
    const file=e.target.files?.[0];if(!file)return;
    setPhotoName(file.name);
    const reader=new FileReader();
    reader.onload=ev=>setPhotoData(String(ev.target?.result ?? "").split(",")[1]);
    reader.readAsDataURL(file);
  }
  const canNext=selected.length>0||photoData;
  return (
    <div style={__style1}>
      <div style={__style2}>
        <span style={__style3}>🐠</span>
        <div>
          <div style={__style4}>{fishName}</div>
          <button onClick={onBack} style={__style5}>← изменить</button>
        </div>
      </div>
      <div style={__style6}>Отметьте симптомы:</div>
      <div style={__style7}>
        {SYMPTOMS_DOCTOR.map(s=>{
          const on=selected.includes(s.id);
          return(
            <button key={s.id} onClick={()=>toggle(s.id)} style={{
              background:on?COLORS.greenBg:COLORS.panel,border:`1px solid ${on?Pd.teal:Pd.border}`,
              borderRadius:10,padding:"9px 10px",color:on?Pd.teal:Pd.soft,
              fontSize:12,fontWeight:on?700:400,cursor:"pointer",textAlign:"left",
              display:"flex",gap:6,alignItems:"center",
            }}>
              <AppleEmoji e={s.icon} size={16} />
              <span style={__style8}>{s.label}</span>
            </button>
          );
        })}
      </div>
      <div onClick={()=>fileRef.current.click()} style={{
        border:`1.5px dashed ${photoData?Pd.teal:Pd.border}`,borderRadius:12,padding:"16px",
        textAlign:"center",cursor:"pointer",background:photoData?Pd.teal+"0D":"transparent",
        marginBottom:14,transition:"border-color 0.2s",
      }}>
        {photoData?(
          <div><div style={__style9}><IconBadge icon="camera" size={40} grad="linear-gradient(135deg, #00C9B1, #00A896)" /></div>
            <div style={__style10}>{photoName}</div>
            <div style={__style11}>Фото загружено — AI проанализирует</div>
          </div>
        ):(
          <div><div style={__style9}><IconBadge icon="camera" size={40} grad="linear-gradient(135deg, #4D9FFE, #2F6FCB)" /></div>
            <div style={__style12}>Загрузить фото рыбы</div>
            <div style={__style13}>AI поставит диагноз точнее</div>
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" style={__style14} onChange={handleFile}/>
      <textarea value={extra} onChange={e=>setExtra(e.target.value)}
        placeholder="Дополнительно: как давно заметили, что изменилось в поведении..."
        rows={3} style={__style15}/>
      <DBtn disabled={!canNext} onClick={()=>onNext({symptoms:selected,photoData,extra})}>
        🤖 Поставить диагноз
      </DBtn>
    </div>
  );
}


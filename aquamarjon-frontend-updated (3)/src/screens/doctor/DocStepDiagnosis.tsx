import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../../theme";
import { DBtn } from "../../components/ui/DoctorControls";
import { Sticker } from "../../components/ui/Sticker";
import { MEDS_DOCTOR, SYMPTOMS_DOCTOR } from "../../data/doctor-content";
import { Pd } from "../../lib/doctor-styles";
import { aiDiagnose } from "../../lib/api";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = {textAlign:"center",padding:"50px 0",animation:"slideUpDoc 0.3s ease"} as const;
const __style2 = {fontSize:40,marginBottom:16,animation:"pulseDoc 1.5s infinite"} as const;
const __style3 = {fontSize:15,fontWeight:700,marginBottom:8} as const;
const __style4 = {fontSize:13,color:Pd.muted,lineHeight:1.6} as const;
const __style5 = {animation:"slideUpDoc 0.3s ease"} as const;
const __style6 = {background:Pd.dangerBg,border:`1px solid ${Pd.danger}66`,borderRadius:14,padding:"16px",marginBottom:16,textAlign:"center"} as const;
const __style7 = {fontSize:28,marginBottom:8} as const;
const __style8 = {fontSize:13,color:Pd.red} as const;
const __style9 = {marginTop:8} as const;
const __style10 = {display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10} as const;
const __style11 = {fontSize:11,color:Pd.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:1} as const;
const __style12 = {fontSize:18,fontWeight:800} as const;
const __style13 = {textAlign:"right"} as const;
const __style14 = {fontSize:11,color:Pd.muted} as const;
const __style15 = {fontSize:13,color:Pd.text,lineHeight:1.6,marginBottom:10} as const;
const __style16 = {display:"flex",gap:8,flexWrap:"wrap"} as const;
const __style17 = {background:COLORS.panel,border:`1px solid ${Pd.border}`,borderRadius:8,padding:"6px 10px",fontSize:12} as const;
const __style18 = {background:"#2A1F0A",border:`1px solid ${Pd.amber}33`,borderRadius:12,padding:"12px 14px",marginBottom:14,fontSize:13,color:Pd.amber,lineHeight:1.5} as const;
const __style19 = {fontSize:13,fontWeight:700,color:Pd.soft,marginBottom:8} as const;
const __style20 = {background:Pd.card,border:`1px solid ${Pd.border}`,borderRadius:14,padding:"14px",marginBottom:14} as const;
const __style21 = {width:24,height:24,borderRadius:"50%",background:Pd.teal+"22",border:`1px solid ${Pd.teal}44`,color:Pd.teal,fontSize:12,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0} as const;
const __style22 = {fontSize:13,color:Pd.text,lineHeight:1.5,paddingTop:2} as const;
const __style23 = {flex:1} as const;
const __style24 = {fontSize:13.5,fontWeight:700} as const;
const __style25 = {fontSize:13,color:Pd.amber,fontWeight:700} as const;
const __style26 = {background:Pd.successBg,border:`1px solid ${Pd.teal}44`,borderRadius:12,padding:"10px 14px",marginBottom:14,fontSize:13,color:Pd.teal,textAlign:"center"} as const;
const __style27 = {background:Pd.successBg,border:`1px solid ${Pd.teal}22`,borderRadius:12,padding:"12px 14px",marginBottom:20,fontSize:13,color:Pd.soft,lineHeight:1.5} as const;
const __style28 = {color:Pd.teal} as const;
const __style29 = {background:Pd.dangerBg,border:`1px solid ${Pd.danger}44`,borderRadius:12,padding:"12px 14px",marginBottom:14,fontSize:12.5,color:"#FF8F8F",lineHeight:1.5} as const;
const __style30 = {marginBottom:10} as const;
const __style31 = {width:"100%",background:Pd.danger,border:"none",borderRadius:10,padding:"10px",color:COLORS.bg,fontSize:13,fontWeight:700,cursor:"pointer"} as const;


export function DocStepDiagnosis({ fishName, data, onBack, onReset, cart, setCart, onOpenChat }) {
  const [result,setResult]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const ran=useRef(false);

  const symptomLabels=data.symptoms.map(id=>SYMPTOMS_DOCTOR.find(s=>s.id===id)?.label).filter(Boolean);

  async function diagnose(){
    setLoading(true);setError(null);
    const systemPrompt=`Ты — опытный ветеринар по аквариумным рыбам для магазина AquaMarjon (Узбекистан).
Анализируй симптомы и ставь диагноз. Отвечай ТОЛЬКО в JSON, без markdown, без пояснений вне JSON.
Формат: {"disease":"Название болезни на русском","severity":"mild"|"moderate"|"severe","confidence":75,"description":"2-3 предложения","cause":"Основная причина","treatment":["шаг 1","шаг 2","шаг 3"],"meds":["ich"|"fungus"|"bacteria"|"parasites"|"salt"|"vitamin"],"urgency":"Немедленно"|"В течение суток"|"Можно подождать до 3 дней","prevention":"1-2 предложения","prognosis":"Хороший"|"Осторожный"|"Серьёзный"}
Доступные лекарства: ich, fungus, bacteria, parasites, salt, vitamin. Если не уверен — confidence<60, предложи salt+vitamin.`;
    const userMsg=[`Рыба: ${fishName}`,symptomLabels.length?`Симптомы: ${symptomLabels.join(", ")}`:"",data.extra?`Дополнительно: ${data.extra}`:"",].filter(Boolean).join("\n");
    try{
      const messages=data.photoData
        ?[{role:"user",content:[{type:"image",source:{type:"base64",media_type:"image/jpeg",data:data.photoData}},{type:"text",text:userMsg}]}]
        :[{role:"user",content:userMsg}];
      // Раньше здесь был прямой fetch на https://api.anthropic.com — та же проблема,
      // что и в AIChatWidget (см. комментарий у aiDiagnose в lib/api.ts): без ключа
      // не работает, с ключом — ключ утёк бы в клиентский бандл. Зовём свой бэкенд.
      const raw=(await aiDiagnose(systemPrompt, messages)).trim();
      setResult(JSON.parse(raw.replace(/```json|```/g,"").trim()));
    }catch(e){setError("Не удалось получить диагноз. Проверьте соединение и попробуйте снова.");}
    finally{setLoading(false);}
  }

  useEffect(()=>{if(!ran.current){ran.current=true;diagnose();}},[]);

  const sevColor={mild:COLORS.green,moderate:Pd.amber,severe:Pd.danger};
  const sevLabel={mild:"Лёгкая",moderate:"Средняя",severe:"Тяжёлая"};
  const progColor={"Хороший":COLORS.green,"Осторожный":Pd.amber,"Серьёзный":Pd.danger};

  if(loading) return(
    <div style={__style1}>
      <div style={__style2}>🔬</div>
      <div style={__style3}>AI анализирует симптомы…</div>
      <div style={__style4}>Проверяем базу болезней,<br/>подбираем лечение из каталога</div>
    </div>
  );
  if(error) return(
    <div style={__style5}>
      <div style={__style6}>
        <div style={__style7}>⚠️</div>
        <div style={__style8}>{error}</div>
      </div>
      <DBtn onClick={diagnose}>Попробовать снова</DBtn>
      <DBtn variant="ghost" onClick={onBack} style={__style9}>← Назад</DBtn>
    </div>
  );
  if(!result) return null;
  const recommendedMeds=(result.meds||[]).map(id=>MEDS_DOCTOR.find(m=>m.id===id)).filter(Boolean);
  return(
    <div style={__style5}>
      <div style={{background:Pd.card,border:`1px solid ${sevColor[result.severity]}44`,borderRadius:16,padding:"16px",marginBottom:14}}>
        <div style={__style10}>
          <div>
            <div style={__style11}>Диагноз AI</div>
            <div style={__style12}>{result.disease}</div>
          </div>
          <div style={__style13}>
            <div style={{background:sevColor[result.severity]+"22",border:`1px solid ${sevColor[result.severity]}44`,color:sevColor[result.severity],borderRadius:999,fontSize:11.5,fontWeight:700,padding:"3px 10px",marginBottom:4}}>
              {sevLabel[result.severity]}
            </div>
            <div style={__style14}>уверенность {result.confidence}%</div>
          </div>
        </div>
        <div style={__style15}>{result.description}</div>
        <div style={__style16}>
          <div style={__style17}>
            🕐 <span style={{color:result.urgency==="Немедленно"?Pd.danger:Pd.amber}}>{result.urgency}</span>
          </div>
          <div style={__style17}>
            📊 Прогноз: <span style={{color:progColor[result.prognosis]||Pd.soft}}>{result.prognosis}</span>
          </div>
        </div>
      </div>
      <div style={__style18}>
        💡 <strong>Причина:</strong> {result.cause}
      </div>
      <div style={__style19}>🩺 Схема лечения:</div>
      <div style={__style20}>
        {(result.treatment||[]).map((step,i)=>(
          <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",paddingBottom:i<result.treatment.length-1?10:0,marginBottom:i<result.treatment.length-1?10:0,borderBottom:i<result.treatment.length-1?`1px solid ${Pd.border}`:"none"}}>
            <div style={__style21}>{i+1}</div>
            <div style={__style22}>{step}</div>
          </div>
        ))}
      </div>
      {recommendedMeds.length>0&&(
        <>
          <div style={__style19}>💊 Лекарства из нашего магазина:</div>
          {recommendedMeds.map(med=>{
            const inCart=(cart||[]).some(c=>c.id===med.id);
            return(
              <div key={med.id} style={{background:Pd.card,border:`1px solid ${inCart?Pd.teal+"66":Pd.border}`,borderRadius:14,padding:"12px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:12,transition:"border-color 0.2s"}}>
                <Sticker e={med.img} size={44} radius={12} ring />
                <div style={__style23}>
                  <div style={__style24}>{med.name}</div>
                  <div style={__style25}>{med.price.toLocaleString("ru-RU")} сум</div>
                </div>
                <button onClick={()=>{
                  if(!setCart) return;
                  if(inCart){ setCart(c=>{const idx=c.findIndex(x=>x.id===med.id); if(idx===-1) return c; const copy=[...c]; copy.splice(idx,1); return copy;}); }
                  else { setCart(c=>[...c, {id:med.id, type:"medicine", name:med.name, price:med.price, img:med.img, color:COLORS.teal, rating:4.9}]); }
                }} style={{background:inCart?Pd.teal:"transparent",border:`1px solid ${inCart?Pd.teal:Pd.border}`,borderRadius:10,padding:"7px 12px",color:inCart?COLORS.bg:Pd.soft,fontSize:12.5,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                  {inCart?"✓ В корзине":"+ В корзину"}
                </button>
              </div>
            );
          })}
          {(cart||[]).some(c=>recommendedMeds.some(m=>m.id===c.id))&&(
            <div style={__style26}>
              ✅ Лекарства добавлены в корзину — оформите заказ в каталоге
            </div>
          )}
        </>
      )}
      <div style={__style27}>
        🛡 <strong style={__style28}>Профилактика:</strong> {result.prevention}
      </div>
      {result.confidence<65&&(
        <div style={__style29}>
          <div style={__style30}>⚠️ Уверенность AI ниже 65% — рекомендуем проконсультироваться с нашим специалистом.</div>
          {onOpenChat && (
            <button onClick={onOpenChat} style={__style31}>
              💬 Написать живому консультанту
            </button>
          )}
        </div>
      )}
      <DBtn variant="ghost" onClick={onReset}>🔄 Новая диагностика</DBtn>
    </div>
  );
}


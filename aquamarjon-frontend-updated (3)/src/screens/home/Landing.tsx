import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../../theme";
import { Bubbles } from "../../components/ui/Bubbles";
import { Sticker } from "../../components/ui/Sticker";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = {
        minHeight: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        overflowY: "auto",
        fontFamily: "system-ui, -apple-system, sans-serif",
      } as const;
const __style2 = { display: "flex", alignItems: "center", gap: 8 } as const;
const __style3 = { fontSize: 22 } as const;
const __style4 = { fontSize: 18, fontWeight: 900, letterSpacing: "-0.03em", color: COLORS.teal } as const;
const __style5 = {
            background: COLORS.teal, color: COLORS.bg, border: "none",
            borderRadius: 10, padding: "9px 18px", fontSize: 13, fontWeight: 700,
            cursor: "pointer", boxShadow: "0 4px 14px rgba(0,201,177,0.3)",
          } as const;
const __style6 = { position: "relative", overflow: "hidden", padding: "60px 24px 70px", textAlign: "center" } as const;
const __style7 = {
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, #00C9B122 0%, transparent 70%)",
        } as const;
const __style8 = { position: "relative", zIndex: 1 } as const;
const __style9 = {
            display: "inline-block",
            background: "#00C9B122", border: "1px solid #00C9B144",
            borderRadius: 999, padding: "5px 14px",
            fontSize: 12, fontWeight: 700, color: COLORS.teal,
            letterSpacing: 1, textTransform: "uppercase",
            marginBottom: 22,
          } as const;
const __style10 = {
            fontSize: 38, fontWeight: 900, lineHeight: 1.15,
            letterSpacing: "-0.03em", margin: "0 0 16px",
            fontFamily: "Georgia, serif",
          } as const;
const __style11 = {
              background: "linear-gradient(90deg, #00C9B1, #4DE8D5)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            } as const;
const __style12 = {
            fontSize: 15.5, color: COLORS.soft, lineHeight: 1.65,
            maxWidth: 320, margin: "0 auto 32px",
          } as const;
const __style13 = {
              background: "linear-gradient(135deg, #00C9B1, #00A896)",
              color: COLORS.bg, border: "none",
              borderRadius: 14, padding: "15px 40px",
              fontSize: 16, fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(0,201,177,0.4)",
              letterSpacing: "-0.01em",
              display: "block", margin: "0 auto 14px",
            } as const;
const __style14 = { fontSize: 12, color: COLORS.muted } as const;
const __style15 = { padding: "0 16px 48px", overflow: "hidden" } as const;
const __style16 = {
          display: "flex", gap: 10, overflowX: "auto",
          paddingBottom: 8, scrollbarWidth: "none",
        } as const;
const __style17 = {
                flex: "0 0 130px",
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16, padding: "14px 10px 12px",
                cursor: "pointer", textAlign: "center",
              } as const;
const __style18 = { display: "flex", justifyContent: "center", marginBottom: 8 } as const;
const __style19 = { fontSize: 11.5, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 } as const;
const __style20 = { fontSize: 10, background: COLORS.panel, color: COLORS.soft, borderRadius: 6, padding: "2px 6px", marginBottom: 6 } as const;
const __style21 = { fontSize: 12, fontWeight: 800, color: COLORS.amber } as const;
const __style22 = { fontSize: 12, color: COLORS.muted, textAlign: "center", marginTop: 10 } as const;
const __style23 = {
        margin: "0 16px 48px",
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 20, padding: "24px 16px",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 16,
      } as const;
const __style24 = { textAlign: "center" } as const;
const __style25 = { fontSize: 26, fontWeight: 900, color: COLORS.teal, letterSpacing: "-0.03em" } as const;
const __style26 = { fontSize: 12, color: COLORS.muted, marginTop: 2 } as const;
const __style27 = { padding: "0 16px 48px" } as const;
const __style28 = { fontSize: 11, color: COLORS.teal, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 } as const;
const __style29 = { fontSize: 22, fontWeight: 900, margin: "0 0 20px", letterSpacing: "-0.02em" } as const;
const __style30 = { display: "flex", flexDirection: "column", gap: 10 } as const;
const __style31 = {
              background: COLORS.card, border: `1px solid ${COLORS.border}`,
              borderRadius: 16, padding: "16px",
              display: "flex", gap: 14, alignItems: "flex-start",
            } as const;
const __style32 = {
                width: 44, height: 44, flexShrink: 0,
                background: COLORS.panel, border: `1px solid ${COLORS.border}`,
                borderRadius: 12, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 22,
              } as const;
const __style33 = { fontSize: 14, fontWeight: 700, marginBottom: 4 } as const;
const __style34 = { fontSize: 12.5, color: COLORS.muted, lineHeight: 1.55 } as const;
const __style35 = { display: "flex", gap: 14, marginBottom: 20 } as const;
const __style36 = {
              width: 36, height: 36, flexShrink: 0,
              background: "#00C9B122", border: "1px solid #00C9B144",
              borderRadius: 10, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 11, fontWeight: 900, color: COLORS.teal,
            } as const;
const __style37 = { paddingTop: 4 } as const;
const __style38 = { fontSize: 14, fontWeight: 700, marginBottom: 3 } as const;
const __style39 = {
            background: COLORS.card, border: `1px solid ${COLORS.border}`,
            borderRadius: 16, padding: "16px", marginBottom: 12,
          } as const;
const __style40 = { fontSize: 15, marginBottom: 8, letterSpacing: 2 } as const;
const __style41 = { fontSize: 13.5, color: COLORS.soft2, lineHeight: 1.6, marginBottom: 12 } as const;
const __style42 = { color: COLORS.soft } as const;
const __style43 = { fontSize: 11, color: COLORS.amber, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 } as const;
const __style44 = {
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 18, padding: "18px",
              marginBottom: 12, position: "relative", overflow: "hidden",
            } as const;
const __style45 = { display: "flex", alignItems: "flex-start", gap: 12 } as const;
const __style46 = { flex: 1 } as const;
const __style47 = { fontSize: 14.5, fontWeight: 800, marginBottom: 5, lineHeight: 1.35 } as const;
const __style48 = { fontSize: 12.5, color: "#8BABB5", lineHeight: 1.6, marginBottom: 10 } as const;
const __style49 = { fontSize: 11, color: COLORS.soft, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 } as const;
const __style50 = {
            background: COLORS.card, border: `1px solid ${COLORS.border}`,
            borderRadius: 16, padding: "14px", marginBottom: 10,
            display: "flex", gap: 12, alignItems: "flex-start",
          } as const;
const __style51 = {
              width: 38, height: 38, flexShrink: 0,
              background: COLORS.panel, border: `1px solid ${COLORS.border}`,
              borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
            } as const;
const __style52 = { display: "inline-block", background: "#9FC4CC22", border: "1px solid #9FC4CC33", borderRadius: 999, padding: "1px 8px", fontSize: 9, fontWeight: 700, color: COLORS.soft, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 5 } as const;
const __style53 = { fontSize: 13.5, fontWeight: 800, marginBottom: 4, lineHeight: 1.3 } as const;
const __style54 = { fontSize: 12, color: "#8BABB5", lineHeight: 1.55, marginBottom: 8 } as const;
const __style55 = { fontSize: 11.5, color: COLORS.soft, background: "#9FC4CC11", borderRadius: 7, padding: "4px 9px", fontWeight: 600 } as const;
const __style56 = {
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 18,
              padding: "18px",
              marginBottom: 12,
              position: "relative",
              overflow: "hidden",
            } as const;
const __style57 = {
        margin: "0 16px 0",
        background: "linear-gradient(135deg, #0E2A26, #091A14)",
        border: "1px solid #00C9B133",
        borderRadius: 24, padding: "36px 24px",
        textAlign: "center", marginBottom: 40,
        position: "relative", overflow: "hidden",
      } as const;
const __style58 = { fontSize: 40, marginBottom: 12 } as const;
const __style59 = { fontSize: 24, fontWeight: 900, margin: "0 0 10px", letterSpacing: "-0.02em", fontFamily: "Georgia, serif" } as const;
const __style60 = { fontSize: 13.5, color: COLORS.soft, margin: "0 0 24px", lineHeight: 1.6 } as const;
const __style61 = {
              background: "linear-gradient(135deg, #00C9B1, #00A896)",
              color: COLORS.bg, border: "none",
              borderRadius: 14, padding: "15px 40px",
              fontSize: 16, fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(0,201,177,0.4)",
              display: "block", margin: "0 auto 12px",
            } as const;
const __style62 = { fontSize: 11.5, color: COLORS.muted } as const;
const __style63 = { padding: "24px 20px 32px", borderTop: `1px solid ${COLORS.border}`, textAlign: "center" } as const;
const __style64 = { fontSize: 16, fontWeight: 900, color: COLORS.teal, marginBottom: 6 } as const;
const __style65 = { fontSize: 12, color: COLORS.muted, lineHeight: 1.7 } as const;


export function Landing({ onEnter }) {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 40);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const features = [
    { icon: "🐠", title: "300+ видов рыб", desc: "Гуппи, неоны, дискусы, скалярии — местные и привозные из лучших питомников Азии" },
    { icon: "🚚", title: "Доставка сегодня", desc: "По Ташкенту за 2–4 часа. В регионы — 1–3 дня. Курьеры с термопакетами" },
    { icon: "✅", title: "Гарантия 48 часов", desc: "Если рыба не прижилась — вернём деньги или заменим. Без вопросов" },
    { icon: "🩺", title: "AI-доктор рыб", desc: "Опишите симптомы — AI поставит диагноз и подберёт лечение прямо в приложении" },
    { icon: "🔬", title: "Карта совместимости", desc: "Умная система покажет, уживутся ли рыбы в одном аквариуме перед покупкой" },
    { icon: "📔", title: "Дневник аквариума", desc: "Ведите записи ухода, получайте напоминания о смене воды и чистке фильтра" },
  ];

  const testimonials = [
    { name: "Анвар Т.", city: "Ташкент", text: "Заказал дискусов — привезли живых и здоровых за 3 часа. Упаковка на высоте!", stars: 5 },
    { name: "Малика Р.", city: "Самарканд", text: "AI-конфигуратор подобрал идеальный набор для моего 120-литрового аквариума. Всё совместимо!", stars: 5 },
    { name: "Ботир С.", city: "Андижан", text: "Петушок «Королевский бархат» — просто красавец. Уже узнаёт меня у стекла 🐠", stars: 5 },
  ];

  const stats = [
    { value: "2 400+", label: "довольных покупателей" },
    { value: "300+", label: "видов рыб" },
    { value: "12", label: "регионов Узбекистана" },
    { value: "48 ч", label: "гарантия здоровья" },
  ];

  return (
    <div
      ref={containerRef}
      style={__style1}
    >
      {/* ---- Sticky nav ---- */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(8,19,31,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : "1px solid transparent",
        padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.3s ease",
      }}>
        <div style={__style2}>
          <span style={__style3}>🐠</span>
          <span style={__style4}>AquaMarjon</span>
        </div>
        <button
          onClick={onEnter}
          style={__style5}
        >
          Открыть магазин →
        </button>
      </nav>

      {/* ---- HERO ---- */}
      <div style={__style6}>
        <Bubbles count={20} />

        {/* глубоководное свечение */}
        <div style={__style7} />

        <div style={__style8}>
          <div style={__style9}>
            🇺🇿 Доставка по всему Узбекистану
          </div>

          <h1 style={__style10}>
            Живые рыбы —<br />
            <span style={__style11}>
              прямо к вашей двери
            </span>
          </h1>

          <p style={__style12}>
            Первый онлайн-магазин аквариумных рыб в Узбекистане.
            Местные и привозные рыбы, корм и оборудование — с доставкой сегодня.
          </p>

          <button
            onClick={onEnter}
            style={__style13}
          >
            🐠 Выбрать рыбу
          </button>
          <div style={__style14}>Бесплатно · Без регистрации</div>
        </div>
      </div>

      {/* ---- РЫБЫ-превью (живая витрина) ---- */}
      <div style={__style15}>
        <div style={__style16}>
          {[
            { name: "Гуппи «Огненный хвост»", price: "25 000 сум", img: "🐠", color: COLORS.amber, badge: "🏠 Местная" },
            { name: "Неон «Голубая искра»",    price: "8 000 сум",  img: "🐟", color: COLORS.teal, badge: "⭐ Хит продаж" },
            { name: "Петушок «Бархат»",        price: "45 000 сум", img: "👑", color: COLORS.amber, badge: "❤️ Узнаёт хозяина" },
            { name: "Дискус «Королевский»",    price: "180 000 сум",img: "👑", color: COLORS.teal, badge: "🔴 Редкая" },
            { name: "Скалярия «Парус»",        price: "55 000 сум", img: "🦈", color: COLORS.teal, badge: "✈️ Привозная" },
            { name: "Данио «Зебра»",           price: "7 000 сум",  img: "🐟", color: COLORS.amber, badge: "🧒 Для детей" },
          ].map((fish, i) => (
            <div
              key={i}
              onClick={onEnter}
              role="button"
              tabIndex={0}
              aria-label={`Войти в каталог — ${fish.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onEnter();
                }
              }}
              style={__style17}
            >
              <div style={__style18}>
                <Sticker e={fish.img} size={64} radius={12} bg={`radial-gradient(circle, ${fish.color}33, #0E2030 75%)`} />
              </div>
              <div style={__style19}>{fish.name}</div>
              <div style={__style20}>{fish.badge}</div>
              <div style={__style21}>от {fish.price}</div>
            </div>
          ))}
        </div>
        <div style={__style22}>← прокрутите, чтобы увидеть больше</div>
      </div>

      {/* ---- STATS ---- */}
      <div style={__style23}>
        {stats.map((s, i) => (
          <div key={i} style={__style24}>
            <div style={__style25}>{s.value}</div>
            <div style={__style26}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ---- ФИЧИ ---- */}
      <div style={__style27}>
        <div style={__style28}>Возможности</div>
        <h2 style={__style29}>
          Всё что нужно<br />аквариумисту
        </h2>
        <div style={__style30}>
          {features.map((f, i) => (
            <div key={i} style={__style31}>
              <div style={__style32}>{f.icon}</div>
              <div>
                <div style={__style33}>{f.title}</div>
                <div style={__style34}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- КАК ЭТО РАБОТАЕТ ---- */}
      <div style={__style27}>
        <div style={__style28}>Процесс</div>
        <h2 style={__style29}>
          Рыба дома<br />за 4 шага
        </h2>
        {[
          { step: "01", title: "Выберите город",        desc: "Укажите регион — покажем актуальные цены доставки и время" },
          { step: "02", title: "Подберите рыб",         desc: "AI проверит совместимость. Можно добавить корм и оборудование" },
          { step: "03", title: "Оформите заказ",        desc: "Укажите адрес и время — курьер свяжется с вами перед выездом" },
          { step: "04", title: "Получите живых рыб",    desc: "Термопакет, инструкция по запуску в аквариум — всё включено" },
        ].map((s, i) => (
          <div key={i} style={__style35}>
            <div style={__style36}>{s.step}</div>
            <div style={__style37}>
              <div style={__style38}>{s.title}</div>
              <div style={__style34}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ---- ОТЗЫВЫ ---- */}
      <div style={__style27}>
        <div style={__style28}>Отзывы</div>
        <h2 style={__style29}>
          Что говорят<br />покупатели
        </h2>
        {testimonials.map((t, i) => (
          <div key={i} style={__style39}>
            <div style={__style40}>{"⭐".repeat(t.stars)}</div>
            <div style={__style41}>
              «{t.text}»
            </div>
            <div style={__style14}>
              <strong style={__style42}>{t.name}</strong> · {t.city}
            </div>
          </div>
        ))}
      </div>

      {/* ---- WOW — делает приложение незабываемым ---- */}
      <div style={__style27}>
        <div style={__style43}>WOW</div>
        <h2 style={__style29}>
          Делает приложение<br />незабываемым
        </h2>
        {[
          {
            tag: "WOW",
            icon: "🗺️",
            title: "Визуализация аквариума",
            desc: "Схема аквариума с кружками рыб из корзины. Красные стрелки — конфликты, зелёные — дружба.",
            metric: "📸 Главная фича для соцсетей",
            color: COLORS.amber,
          },
          {
            tag: "WOW",
            icon: "⚖️",
            title: "Сравнение рыб",
            desc: "Кнопка «Сравнить» на карточке → таблица рядом: температура, размер, сложность, цена.",
            metric: "🎯 Помогает выбрать между похожими",
            color: COLORS.amber,
          },
          {
            tag: "WOW",
            icon: "📸",
            title: "«Посмотреть в моём аквариуме»",
            desc: "Кнопка на карточке рыбы — камера + анимация рыбки поверх видео. Демо без реального AR.",
            metric: "🔥 Вирусный контент",
            color: COLORS.amber,
          },
        ].map((card, i) => (
          <div
            key={i}
            style={__style44}
          >
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: `linear-gradient(90deg, ${card.color}, transparent)`,
              borderRadius: "18px 18px 0 0",
            }} />
            <div style={__style45}>
              <div style={{
                width: 40, height: 40, flexShrink: 0,
                background: card.color + "22", border: `1px solid ${card.color}44`,
                borderRadius: 12, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 20,
              }}>{card.icon}</div>
              <div style={__style46}>
                <div style={{
                  display: "inline-block",
                  background: card.color + "22", border: `1px solid ${card.color}44`,
                  borderRadius: 999, padding: "2px 10px",
                  fontSize: 10, fontWeight: 700, color: card.color,
                  letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6,
                }}>{card.tag}</div>
                <div style={__style47}>{card.title}</div>
                <div style={__style48}>{card.desc}</div>
                <div style={{
                  fontSize: 12, color: card.color,
                  background: card.color + "11",
                  borderRadius: 8, padding: "5px 10px", fontWeight: 600,
                }}>{card.metric}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---- UX — убрать трение ---- */}
      <div style={__style27}>
        <div style={__style49}>UX</div>
        <h2 style={__style29}>
          Убрать трение<br />на каждом шаге
        </h2>
        {[
          { icon: "🔍", title: "Поиск с автодополнением", desc: "Выпадающий список с эмодзи и ценой при вводе — включая латинские названия.", metric: "⏱ −5 секунд на поиск" },
          { icon: "💬", title: "Чат-поддержка", desc: "Плавающая кнопка → AI отвечает на вопросы. «Как держать дискуса?» «Когда привезут?»", metric: "🛒 Меньше брошенных корзин" },
          { icon: "🪣", title: "Фильтр по объёму аквариума", desc: "Слайдер «мой аквариум — 60 л». Каталог показывает только рыб, которые туда влезут.", metric: "✅ Меньше ошибок при покупке" },
          { icon: "↕️", title: "Сортировка каталога", desc: "По цене, рейтингу, новинкам, популярности. Сейчас порядок фиксированный.", metric: "🎯 Быстрее находят нужное" },
          { icon: "📋", title: "«Пока везут» — инструкция", desc: "После заказа показываем что подготовить: температура воды, карантин, первое кормление.", metric: "🐠 Меньше гибели рыб → меньше возвратов" },
          { icon: "💰", title: "Фильтр по цене", desc: "Слайдер min-max. Клиент с бюджетом 50 000 сум видит только подходящее.", metric: "⚡ Быстрее решение о покупке" },
        ].map((card, i) => (
          <div key={i} style={__style50}>
            <div style={__style51}>{card.icon}</div>
            <div style={__style46}>
              <div style={__style52}>UX</div>
              <div style={__style53}>{card.title}</div>
              <div style={__style54}>{card.desc}</div>
              <div style={__style55}>{card.metric}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ---- ДОВЕРИЕ — критично для живого товара ---- */}
      <div style={__style27}>
        <div style={__style28}>Доверие</div>
        <h2 style={__style29}>
          Критично для<br />живого товара
        </h2>
        {[
          {
            tag: "Доверие",
            title: "Отзывы на карточке рыбы",
            desc: "Рейтинг уже есть, но нет текстов. Нужны 3–5 отзывов с именем и городом.",
            metric: "⭐ +20% к конверсии в корзину",
            color: COLORS.teal,
            icon: "💬",
            action: "Оставить отзыв",
          },
          {
            tag: "Доверие",
            title: "Страница «Как мы работаем»",
            desc: "Карантин, упаковка с кислородом, термопакет, видеофиксация — с фото и иллюстрациями.",
            metric: "🛡️ Снимает страх первой покупки",
            color: COLORS.teal,
            icon: "📦",
            action: "Посмотреть процесс",
          },
          {
            tag: "Доверие",
            title: "Остаток в наличии",
            desc: "«Осталось 3 шт» создаёт срочность и честность. «Под заказ» управляет ожиданиями.",
            metric: "😌 Меньше разочарований",
            color: COLORS.teal,
            icon: "🔢",
            action: "Смотреть в каталоге",
          },
        ].map((card, i) => (
          <div
            key={i}
            style={__style56}
          >
            {/* фоновый акцент */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: `linear-gradient(90deg, ${card.color}, transparent)`,
              borderRadius: "18px 18px 0 0",
            }} />
            <div style={__style45}>
              <div style={{
                width: 40, height: 40, flexShrink: 0,
                background: card.color + "22",
                border: `1px solid ${card.color}44`,
                borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }}>{card.icon}</div>
              <div style={__style46}>
                <div style={{
                  display: "inline-block",
                  background: card.color + "22", border: `1px solid ${card.color}44`,
                  borderRadius: 999, padding: "2px 10px",
                  fontSize: 10, fontWeight: 700, color: card.color,
                  letterSpacing: 0.5, textTransform: "uppercase",
                  marginBottom: 6,
                }}>{card.tag}</div>
                <div style={__style47}>{card.title}</div>
                <div style={__style48}>{card.desc}</div>
                <div style={{
                  fontSize: 12, color: card.color,
                  background: card.color + "11",
                  borderRadius: 8, padding: "5px 10px",
                  fontWeight: 600,
                }}>{card.metric}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---- CTA финальный ---- */}
      <div style={__style57}>
        <Bubbles count={8} />
        <div style={__style8}>
          <div style={__style58}>🐠</div>
          <h2 style={__style59}>
            Готовы выбрать<br />своих рыб?
          </h2>
          <p style={__style60}>
            AI подберёт совместимых жителей,<br />курьер привезёт сегодня.
          </p>
          <button
            onClick={onEnter}
            style={__style61}
          >
            Открыть магазин →
          </button>
          <div style={__style62}>Бесплатно · 300+ видов рыб · Доставка сегодня</div>
        </div>
      </div>

      {/* ---- Footer ---- */}
      <div style={__style63}>
        <div style={__style64}>🐠 AquaMarjon</div>
        <div style={__style65}>
          Первый онлайн-магазин аквариумных рыб Узбекистана<br />
          Работаем ежедневно с 08:00 до 22:00<br />
          📍 Ташкент и 11 регионов
        </div>
      </div>
    </div>
  );
}

/* ---------- Welcome screen ---------- */

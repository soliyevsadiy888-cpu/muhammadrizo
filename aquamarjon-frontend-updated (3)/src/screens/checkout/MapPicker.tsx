import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../../theme";
import { REGION_COORDS } from "../../data/regions";
import { CkLabel } from "./CkFields";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { marginBottom: 18 } as const;
const __style2 = { position: "absolute", inset: 0, background: COLORS.panel,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: COLORS.muted, fontSize: 13 } as const;
const __style3 = { width: "100%", height: "100%" } as const;
const __style4 = { position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
            background: "rgba(8,19,31,0.85)", border: `1px solid ${COLORS.border}`,
            borderRadius: 10, padding: "7px 14px", fontSize: 12, color: COLORS.soft,
            pointerEvents: "none", whiteSpace: "nowrap", backdropFilter: "blur(4px)" } as const;
const __style5 = { position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
            background: "rgba(8,19,31,0.85)", border: "1px solid #00C9B144",
            borderRadius: 10, padding: "7px 14px", fontSize: 12, color: COLORS.teal,
            pointerEvents: "none", backdropFilter: "blur(4px)" } as const;
const __style6 = { display: "flex", alignItems: "flex-start", gap: 8, marginTop: 10,
          background: COLORS.greenBg2, border: "1px solid #00C9B144",
          borderRadius: 10, padding: "10px 12px" } as const;
const __style7 = { fontSize: 16, flexShrink: 0 } as const;
const __style8 = { flex: 1, fontSize: 13, color: COLORS.text, lineHeight: 1.5 } as const;
const __style9 = { background: "none", border: "none", color: COLORS.muted,
            fontSize: 16, cursor: "pointer", flexShrink: 0, padding: 0, lineHeight: 1 } as const;


export function MapPicker({ region, onAddressSelect }) {
  const mapRef = useRef(null);
  const leafRef = useRef(null);
  const markerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [mapAddr, setMapAddr] = useState("");
  const [picking, setPicking] = useState(false);

  useEffect(() => {
    if (window.L) { setLoaded(true); return; }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!loaded || !mapRef.current || leafRef.current) return;
    const coords = REGION_COORDS[region] || [41.2995, 69.2401];
    const map = window.L.map(mapRef.current, { zoomControl: true, attributionControl: false }).setView(coords, 13);
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19, attribution: "© OSM",
    }).addTo(map);

    const icon = window.L.divIcon({
      className: "",
      html: `<div style="width:32px;height:40px;display:flex;flex-direction:column;align-items:center">
        <div style="width:28px;height:28px;border-radius:50% 50% 50% 0;background:#00C9B1;transform:rotate(-45deg);border:3px solid #08131F;box-shadow:0 2px 8px rgba(0,201,177,0.6)"></div>
        <div style="width:4px;height:12px;background:#00C9B1;margin-top:-2px;border-radius:0 0 4px 4px"></div>
      </div>`,
      iconSize: [32, 40], iconAnchor: [16, 40],
    });

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      if (markerRef.current) markerRef.current.remove();
      markerRef.current = window.L.marker([lat, lng], { icon }).addTo(map);
      setPicking(true);
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=ru`)
        .then((r) => r.json())
        .then((d) => {
          const a = d.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
          const p = d.address || {};
          const short = [p.road || p.pedestrian || p.footway, p.house_number, p.city || p.town || p.village]
            .filter(Boolean).join(", ") || a;
          setMapAddr(short);
          onAddressSelect(short);
          setPicking(false);
        })
        .catch(() => {
          const fb = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
          setMapAddr(fb); onAddressSelect(fb); setPicking(false);
        });
    });

    leafRef.current = map;
    return () => { map.remove(); leafRef.current = null; };
  }, [loaded]);

  useEffect(() => {
    if (!leafRef.current) return;
    const coords = REGION_COORDS[region] || [41.2995, 69.2401];
    leafRef.current.flyTo(coords, 13, { duration: 1.2 });
    if (markerRef.current) { markerRef.current.remove(); markerRef.current = null; }
    setMapAddr("");
    onAddressSelect("");
  }, [region]);

  return (
    <div style={__style1}>
      <CkLabel>Нажмите на карту, чтобы отметить адрес</CkLabel>
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden",
        border: `1px solid ${mapAddr ? "#00C9B166" : COLORS.border}`, height: 220 }}>
        {!loaded && (
          <div style={__style2}>🗺️ Загрузка карты…</div>
        )}
        <div ref={mapRef} style={__style3} />
        {loaded && !mapAddr && !picking && (
          <div style={__style4}>
            📍 Нажмите на карту чтобы поставить пин
          </div>
        )}
        {picking && (
          <div style={__style5}>
            ⌛ Определяем адрес…
          </div>
        )}
      </div>
      {mapAddr && (
        <div style={__style6}>
          <span style={__style7}>📍</span>
          <div style={__style8}>{mapAddr}</div>
          <button onClick={() => {
            setMapAddr(""); onAddressSelect("");
            if (markerRef.current) { markerRef.current.remove(); markerRef.current = null; }
          }} aria-label="Очистить адрес" style={__style9}>✕</button>
        </div>
      )}
    </div>
  );
}

/* ── Таймер закрытия слота доставки ──────────────────────── */

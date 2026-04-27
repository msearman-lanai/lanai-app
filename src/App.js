import { useState } from "react";
import Concierge from "./pages/Concierge";
import Guidebook from "./pages/Guidebook";
import ReturnClub from "./pages/ReturnClub";

const SLATE = "#2a3f48";
const LIGHT = "#8aacb8";

export default function App() {
  const [view, setView] = useState("concierge");
  const tabs = [
    { id: "concierge", label: "Concierge" },
    { id: "guidebook", label: "Guidebook" },
    { id: "return",    label: "Stay Again" },
  ];
  return (
    <div style={{ minHeight: "100vh", background: "#c8d8dc" }}>
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(180,205,212,0.97)",
        borderTop: "1px solid rgba(255,255,255,0.5)",
        backdropFilter: "blur(12px)",
        display: "flex", justifyContent: "space-around",
        padding: "10px 0 max(20px, env(safe-area-inset-bottom))",
      }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setView(tab.id)} style={{
            flex: 1, background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            padding: "4px 0",
            fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase",
            fontFamily: "'Jost', sans-serif",
            color: view === tab.id ? SLATE : LIGHT,
            fontWeight: view === tab.id ? 600 : 300,
          }}>
            {tab.label}
            {view === tab.id && <div style={{ width: 16, height: 1.5, background: SLATE, borderRadius: 1 }} />}
          </button>
        ))}
      </div>
      <div style={{ paddingBottom: 72 }}>
        {view === "concierge" && <Concierge />}
        {view === "guidebook" && <Guidebook />}
        {view === "return"    && <ReturnClub />}
      </div>
    </div>
  );
}

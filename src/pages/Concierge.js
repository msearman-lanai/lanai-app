import { useState, useRef, useEffect } from "react";
import { LOGO } from "../logo";

const SLATE = "#2a3f48";
const MID = "#5a7a88";
const LIGHT = "#8aacb8";
const BG = "#c8d8dc";
const CARD = "rgba(255,255,255,0.55)";
const BORDER = "rgba(255,255,255,0.7)";

const PROPERTY_CONTEXT = `You are the AI concierge for Lanai, a beautiful vacation rental on the north shore of Eleuthera, Bahamas, in the village of Current. You speak warmly and helpfully with a relaxed island tone. The owners are Mike and Val.

CONTACTS: Emergency (Bahamas): 919 (911 also works). Mike (owner): 919.345.6063. Valerie (owner): 540.878.9465. Always direct guests to Mike or Val — never suggest contacting anyone else directly.

WIFI & CHECK-IN: WiFi password: pineapple. Check-in: 4:00 PM. Check-out: 10:00 AM.

WATER: Regular faucets are NOT for drinking. Use the small RO faucet to the RIGHT of the main sink for drinking water only.

POWER: Solar + grid + battery backup. Only run A/C in rooms needed overnight. If grid goes down, hot water unavailable.

PROPANE: Self-igniting range. Backup 20lb tank on far side of house. Tell Mike if it runs out.

TRASH: Bins at end of paved road, 2/3 mile from property. Drop off coming and going. Never leave outside overnight.

AMENITIES: Cooler, Bluetooth speaker, snorkel gear, beach chairs, grilling supplies in bins on far side of porch. Pack-n-play crib, high chair, kids gear available. Washer/dryer in shed. Paddleboard in board locker (far side from screen door).

BEACH & SNORKELING: Head RIGHT from beach along rocks for snorkeling — fish, rays, turtles, octopus, sharks. Gets better further along. Second beach 5 min away — calm when Lanai is windy.

CAR RENTALS: Arthur Turnquest (turnquestcarrental@gmail.com) — go-to, mention Mike's place. Chris Darling (WhatsApp: 242.553.6638). Pick Pay Rentals (pickpayrentals.com). Agatha Hepburn (WhatsApp: 242.816.7213) — around the corner, also does catering.

BOAT TRIPS: Captain James picks up from beach at Lanai! Fishing, snorkeling, stingrays, swimming pigs (~10 min away), isolated beaches. WhatsApp: +1 (242) 470-0671.

RESTAURANTS (nearby): Daddy Joe's (20 min) — MUST, great lunch/dinner, near Gaulding Cay. Uncle Tommy's Bakery (15 min) — coconut bread Thursdays, pizza Fridays, best conch fritters. LeLe's Pizzas (20 min) — delivers to Current! The Cove Eleuthera — great for nicer dinner, call ahead. El Karaka Glass Window Bar & Grill (20 min) — unbeatable views. Bahamas Paradise Farms / Eddy's Kitchen — pizza delivers to Current.

RESTAURANTS (Harbour Island): The Landing — iconic brunch. The Dunmore Hotel — overlooks Pink Sands Beach. Coral Sands Hotel — large shaded deck.

RESTAURANTS (Spanish Wells): The Shipyard — great views, walk from boat. Wreckers — beautiful marina deck. Sandbar Beach Bar & Grill — live music Sundays.

BEACHES: Gaulding Cay (20 min) — Daddy Joe's across street. Ben Bay (20 min) — horseshoe bay, Mike & Val's favorite. Preacher's Cave Beach (20 min). Rainbow Bay (30 min). Ten Bay (1hr 15min) — worth the drive! Twin Cove (1hr) — most beautiful, dirt road through jungle. Pink Sands Beach — Harbour Island, world famous.

SIGHTSEEING: Glass Window Bridge (20 min) — where Atlantic meets Caribbean, 68 locals recommend! Sapphire Blue Hole — jump in forest blue hole. Bahamas Paradise Farms — hidden gem, call ahead, ask about mango tasting. Hatchet Bay Cave. Queen's Bath — bring shoes, careful in rough seas.

GROCERIES: North Eleuthera Shopping Center (15-20 min) — largest, most stocked. Johnson's Grocery (15 min) in Lower Bogue. Bring specialty items (gluten free, good meats) from home. Bring cash — ATMs rare.

INSIDER TIPS: Spend more time at the beach — guests always wish they had. Goats may wander yard — harmless. Island time is real. Weather shifts fast — if one beach is windy, try the other.

Keep responses 2-4 sentences. Plain conversational sentences only — no bullet points or markdown.`;

const WELCOME = {
  role: "assistant",
  content: "Welcome to Lanai! I'm your AI concierge — here to help make your stay as wonderful as possible. Ask me anything about the property, the beach, restaurants, excursions, or getting around Eleuthera.",
};

const SUGGESTED = [
  "What's the WiFi password?",
  "Where's the snorkel gear?",
  "Best restaurants nearby?",
  "How do I rent a car?",
  "Can I book a boat trip?",
];

function formatTime(iso) {
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
}

function ChatLogModal({ log, onClear, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(42,63,72,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ background: BG, borderRadius: "24px 24px 0 0", padding: 24, width: "100%", maxWidth: 560, maxHeight: "85vh", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h2 style={{ color: SLATE, fontSize: 20, fontWeight: 400, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Chat Log</h2>
            <p style={{ color: LIGHT, fontSize: 12, fontFamily: "'Jost', sans-serif" }}>{log.length} session{log.length !== 1 ? "s" : ""} on this device</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: MID, fontSize: 24, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {log.length === 0 && <p style={{ textAlign: "center", color: LIGHT, fontFamily: "'Jost', sans-serif", padding: "40px 0" }}>No conversations yet</p>}
          {[...log].reverse().map((session, i) => (
            <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 14 }}>
              <div style={{ color: LIGHT, fontSize: 11, fontFamily: "'Jost', sans-serif", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
                {formatTime(session.startedAt)}{session.guestName ? ` · ${session.guestName}` : ""}
              </div>
              {session.messages.map((msg, mi) => (
                <div key={mi} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: 6 }}>
                  <div style={{ maxWidth: "85%", padding: "7px 11px", borderRadius: 12, fontSize: 13, lineHeight: 1.5, background: msg.role === "user" ? SLATE : "rgba(255,255,255,0.6)", color: msg.role === "user" ? "#fff" : SLATE, fontFamily: msg.role === "user" ? "'Jost', sans-serif" : "'Cormorant Garamond', Georgia, serif" }}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {log.length > 0 && <button onClick={onClear} style={{ marginTop: 16, width: "100%", background: "rgba(192,80,80,0.1)", border: "1px solid rgba(192,80,80,0.3)", borderRadius: 12, padding: 12, color: "#c05050", fontSize: 13, fontFamily: "'Jost', sans-serif", cursor: "pointer" }}>Clear All Logs</button>}
      </div>
    </div>
  );
}

function GuestNameModal({ value, onSave, onClose }) {
  const [name, setName] = useState(value);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(42,63,72,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: BG, borderRadius: 24, padding: 28, width: "100%", maxWidth: 360 }}>
        <h2 style={{ color: SLATE, fontSize: 20, fontWeight: 400, marginBottom: 4, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Guest Name</h2>
        <p style={{ color: MID, fontSize: 12, fontFamily: "'Jost', sans-serif", marginBottom: 16 }}>Labels your chat log sessions.</p>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sarah" style={{ width: "100%", background: "rgba(255,255,255,0.7)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", color: SLATE, fontSize: 14, fontFamily: "'Jost', sans-serif", outline: "none", boxSizing: "border-box", marginBottom: 16 }} />
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, background: "rgba(255,255,255,0.4)", border: `1px solid ${BORDER}`, borderRadius: 12, padding: 12, color: MID, fontSize: 14, fontFamily: "'Jost', sans-serif", cursor: "pointer" }}>Cancel</button>
          <button onClick={() => onSave(name.trim())} style={{ flex: 2, background: SLATE, border: "none", borderRadius: 12, padding: 12, color: "#fff", fontSize: 14, fontFamily: "'Jost', sans-serif", fontWeight: 500, cursor: "pointer" }}>Save</button>
        </div>
      </div>
    </div>
  );
}

async function sendEmail(guestMsg, aiReply) {
  try {
    const cfg = JSON.parse(localStorage.getItem("lanai_email_config") || "{}");
    if (!cfg.serviceId || !cfg.templateId || !cfg.publicKey || !cfg.ownerEmail) return;
    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: cfg.serviceId,
        template_id: cfg.templateId,
        user_id: cfg.publicKey,
        template_params: {
          guest_message: guestMsg,
          ai_reply: aiReply.slice(0, 300),
          time: new Date().toLocaleString(),
          guest_name: localStorage.getItem("lanai_guest_name") || "Guest",
          to_email: cfg.ownerEmail,
        },
      }),
    });
  } catch {}
}

function EmailSettingsModal({ onClose }) {
  const [cfg, setCfg] = useState(() => { try { return JSON.parse(localStorage.getItem("lanai_email_config") || "{}"); } catch { return {}; } });
  const f = k => e => setCfg(p => ({ ...p, [k]: e.target.value }));
  const save = () => { localStorage.setItem("lanai_email_config", JSON.stringify(cfg)); onClose(); };
  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.7)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", color: SLATE, fontSize: 14, fontFamily: "'Jost', sans-serif", outline: "none", boxSizing: "border-box", marginBottom: 12 };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(42,63,72,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: BG, borderRadius: 24, padding: 28, width: "100%", maxWidth: 420, maxHeight: "90vh", overflowY: "auto" }}>
        <h2 style={{ color: SLATE, fontSize: 20, fontWeight: 400, marginBottom: 4, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Email Alerts</h2>
        <p style={{ color: MID, fontSize: 12, fontFamily: "'Jost', sans-serif", marginBottom: 16, lineHeight: 1.6 }}>
          Sign up free at <strong>emailjs.com</strong> → create a service (Gmail works) → create a template using <strong>{"{{guest_name}}"}</strong>, <strong>{"{{guest_message}}"}</strong>, <strong>{"{{ai_reply}}"}</strong>, <strong>{"{{time}}"}</strong> → paste your IDs below.
        </p>
        {[
          { key: "serviceId", label: "Service ID", placeholder: "service_xxxxxxx" },
          { key: "templateId", label: "Template ID", placeholder: "template_xxxxxxx" },
          { key: "publicKey", label: "Public Key", placeholder: "your_public_key" },
          { key: "ownerEmail", label: "Your Email", placeholder: "mike@example.com" },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label style={{ color: MID, fontSize: 11, fontFamily: "'Jost', sans-serif", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>
            <input value={cfg[key] || ""} onChange={f(key)} placeholder={placeholder} style={inputStyle} />
          </div>
        ))}
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button onClick={onClose} style={{ flex: 1, background: "rgba(255,255,255,0.4)", border: `1px solid ${BORDER}`, borderRadius: 12, padding: 12, color: MID, fontSize: 14, fontFamily: "'Jost', sans-serif", cursor: "pointer" }}>Cancel</button>
          <button onClick={save} style={{ flex: 2, background: SLATE, border: "none", borderRadius: 12, padding: 12, color: "#fff", fontSize: 14, fontFamily: "'Jost', sans-serif", fontWeight: 500, cursor: "pointer" }}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default function Concierge() {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [guestName, setGuestName] = useState(() => localStorage.getItem("lanai_guest_name") || "");
  const [chatLog, setChatLog] = useState(() => { try { return JSON.parse(localStorage.getItem("lanai_chat_log") || "[]"); } catch { return []; } });
  const [sessionId] = useState(() => Date.now());
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => { localStorage.setItem("lanai_chat_log", JSON.stringify(chatLog)); }, [chatLog]);

  const saveToLog = (userText, aiReply) => {
    setChatLog(prev => {
      const existing = prev.find(s => s.id === sessionId);
      const pair = [{ role: "user", content: userText }, { role: "assistant", content: aiReply }];
      if (existing) return prev.map(s => s.id === sessionId ? { ...s, messages: [...s.messages, ...pair] } : s);
      return [...prev, { id: sessionId, startedAt: new Date().toISOString(), guestName: guestName || null, messages: pair }];
    });
  };

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1000,
          system: PROPERTY_CONTEXT,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type === "text")?.text || "I'm having trouble connecting. Please reach out to Mike at 919.345.6063.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      saveToLog(userText, reply);
      sendEmail(userText, reply);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again or contact Mike at 919.345.6063." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: "'Cormorant Garamond', Georgia, serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: 640, padding: "20px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 12 }}>
          <button onClick={() => setShowLog(true)} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "6px 14px", color: MID, fontSize: 11, fontFamily: "'Jost', sans-serif", cursor: "pointer" }}>
            Chat Log{chatLog.length > 0 ? ` · ${chatLog.length}` : ""}
          </button>
          <button onClick={() => setShowEmail(true)} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "6px 14px", color: MID, fontSize: 11, fontFamily: "'Jost', sans-serif", cursor: "pointer" }}>
            Email Alerts
          </button>
          <button onClick={() => setShowName(true)} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "6px 14px", color: MID, fontSize: 11, fontFamily: "'Jost', sans-serif", cursor: "pointer" }}>
            {guestName || "Guest Name"}
          </button>
        </div>
        <div style={{ textAlign: "center", paddingBottom: 8 }}>
          <img src={LOGO} alt="Lanai" style={{ width: 160, marginBottom: 6 }} onError={e => { e.target.style.display = "none"; }} />
          <p style={{ color: MID, fontSize: 11, margin: "0 0 16px", letterSpacing: 2.5, fontFamily: "'Jost', sans-serif", textTransform: "uppercase", fontWeight: 300 }}>Your AI Concierge</p>
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: 640, flex: 1, display: "flex", flexDirection: "column", padding: "0 16px", gap: 10 }}>
        <div style={{ overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 8, maxHeight: "50vh", scrollbarWidth: "none" }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
              {msg.role === "assistant" && (
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: SLATE, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 8, flexShrink: 0, marginTop: 2 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                </div>
              )}
              <div style={{
                maxWidth: "78%", padding: "12px 16px", fontSize: 15, lineHeight: 1.6,
                background: msg.role === "user" ? SLATE : CARD,
                border: msg.role === "user" ? "none" : `1px solid ${BORDER}`,
                borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                color: msg.role === "user" ? "#fff" : SLATE,
                fontFamily: msg.role === "user" ? "'Jost', sans-serif" : "'Cormorant Garamond', Georgia, serif",
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: SLATE, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </div>
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: "18px 18px 18px 4px", padding: "14px 18px", display: "flex", gap: 5, alignItems: "center" }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: MID, animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />)}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length === 1 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {SUGGESTED.map(q => (
              <button key={q} onClick={() => sendMessage(q)} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "7px 14px", color: MID, fontSize: 13, fontFamily: "'Jost', sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>{q}</button>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 10, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 28, padding: "8px 8px 8px 18px", marginBottom: 8 }}>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask me anything about Lanai…" disabled={loading} style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: SLATE, fontSize: 15, fontFamily: "'Cormorant Garamond', Georgia, serif" }} />
          <button onClick={() => sendMessage()} disabled={!input.trim() || loading} style={{ width: 40, height: 40, borderRadius: "50%", background: input.trim() && !loading ? SLATE : "rgba(42,63,72,0.15)", border: "none", cursor: input.trim() && !loading ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !loading ? "#fff" : LIGHT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </button>
        </div>
      </div>

      {showLog && <ChatLogModal log={chatLog} onClear={() => { setChatLog([]); localStorage.removeItem("lanai_chat_log"); }} onClose={() => setShowLog(false)} />}
      {showEmail && <EmailSettingsModal onClose={() => setShowEmail(false)} />}
      {showName && <GuestNameModal value={guestName} onSave={n => { setGuestName(n); localStorage.setItem("lanai_guest_name", n); setShowName(false); }} onClose={() => setShowName(false)} />}
      <style>{`@keyframes pulse{0%,100%{transform:scale(0.7);opacity:0.4}50%{transform:scale(1);opacity:1}}::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}

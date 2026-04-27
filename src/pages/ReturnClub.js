import { useState } from "react";
import { LOGO } from "../logo";

const SLATE = "#2a3f48";
const MID = "#5a7a88";
const LIGHT = "#8aacb8";
const CARD = "rgba(255,255,255,0.55)";
const BORDER = "rgba(255,255,255,0.7)";

const inp = {
  width: "100%", background: "rgba(255,255,255,0.6)",
  border: `1px solid rgba(255,255,255,0.7)`, borderRadius: 12,
  padding: "12px 16px", color: SLATE, fontSize: 15,
  fontFamily: "'Jost', sans-serif", outline: "none", boxSizing: "border-box",
};

export default function ReturnClub() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", hometown: "", stayedWhen: "", heardAbout: "", wishlist: "", memory: "" });
  const [submitted, setSubmitted] = useState(false);

  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    const existing = JSON.parse(localStorage.getItem("lanai_return_club") || "[]");
    existing.push({ ...form, submittedAt: new Date().toISOString() });
    localStorage.setItem("lanai_return_club", JSON.stringify(existing));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#c8d8dc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
        <img src={LOGO} alt="Lanai" style={{ width: 110, marginBottom: 20 }} onError={e => { e.target.style.display = "none"; }} />
        <h2 style={{ color: SLATE, fontSize: 26, fontWeight: 400, fontFamily: "'Cormorant Garamond', Georgia, serif", marginBottom: 12 }}>
          You're in the club, {form.name.split(" ")[0]}!
        </h2>
        <p style={{ color: MID, fontSize: 15, fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1.7, fontStyle: "italic" }}>
          Mike & Val will be in touch when dates open up.
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#c8d8dc", fontFamily: "'Cormorant Garamond', Georgia, serif", padding: "28px 16px 80px" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <img src={LOGO} alt="Lanai" style={{ width: 110, marginBottom: 8 }} onError={e => { e.target.style.display = "none"; }} />
          <h1 style={{ color: SLATE, fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 400, marginBottom: 10 }}>Come Back to Lanai</h1>
          <p style={{ color: MID, fontSize: 14, fontStyle: "italic", lineHeight: 1.7 }}>Once a Lanai guest, always part of the family. Join our list and we'll reach out personally when dates open up — before they hit Airbnb.</p>
        </div>

        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "16px 20px", marginBottom: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {["First access to open dates", "Personal note from Mike & Val", "Return guest priority", "A reason to return to Eleuthera"].map(perk => (
            <div key={perk} style={{ color: MID, fontSize: 12, fontFamily: "'Jost', sans-serif", lineHeight: 1.4 }}>{perk}</div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={{ color: MID, fontSize: 11, fontFamily: "'Jost', sans-serif", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Full Name *</label>
              <input value={form.name} onChange={f("name")} placeholder="Sarah Johnson" style={inp} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ color: MID, fontSize: 11, fontFamily: "'Jost', sans-serif", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Hometown</label>
              <input value={form.hometown} onChange={f("hometown")} placeholder="Charlotte, NC" style={inp} />
            </div>
          </div>

          <div>
            <label style={{ color: MID, fontSize: 11, fontFamily: "'Jost', sans-serif", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Email Address *</label>
            <input type="email" value={form.email} onChange={f("email")} placeholder="sarah@email.com" style={inp} />
          </div>

          <div>
            <label style={{ color: MID, fontSize: 11, fontFamily: "'Jost', sans-serif", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Phone / WhatsApp</label>
            <input value={form.phone} onChange={f("phone")} placeholder="+1 555 000 0000" style={inp} />
          </div>

          <div>
            <label style={{ color: MID, fontSize: 11, fontFamily: "'Jost', sans-serif", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>When did you stay?</label>
            <input value={form.stayedWhen} onChange={f("stayedWhen")} placeholder="e.g. March 2025" style={inp} />
          </div>

          <div>
            <label style={{ color: MID, fontSize: 11, fontFamily: "'Jost', sans-serif", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>How did you find Lanai?</label>
            <select value={form.heardAbout} onChange={f("heardAbout")} style={{ ...inp, appearance: "none" }}>
              <option value="">Select one…</option>
              {["Airbnb", "VRBO", "Instagram", "Friend / Family referral", "Google", "Other"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <label style={{ color: MID, fontSize: 11, fontFamily: "'Jost', sans-serif", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Property Wish List</label>
            <textarea value={form.wishlist} onChange={f("wishlist")} placeholder="Anything you'd love to see at Lanai on your next stay?" rows={3} style={{ ...inp, resize: "vertical", lineHeight: 1.5, fontFamily: "'Cormorant Garamond', Georgia, serif" }} />
          </div>

          <div>
            <label style={{ color: MID, fontSize: 11, fontFamily: "'Jost', sans-serif", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Favorite memory?</label>
            <textarea value={form.memory} onChange={f("memory")} placeholder="The sunset on the last night…" rows={3} style={{ ...inp, resize: "vertical", lineHeight: 1.5, fontFamily: "'Cormorant Garamond', Georgia, serif" }} />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!form.name.trim() || !form.email.trim()}
            style={{
              width: "100%", background: form.name.trim() && form.email.trim() ? SLATE : "rgba(42,63,72,0.2)",
              border: "none", borderRadius: 14, padding: "16px", color: "#fff",
              fontSize: 16, fontFamily: "'Cormorant Garamond', Georgia, serif",
              cursor: form.name.trim() && form.email.trim() ? "pointer" : "default", marginTop: 4,
            }}
          >
            Join the Lanai Family
          </button>

          <p style={{ textAlign: "center", color: LIGHT, fontSize: 12, fontFamily: "'Jost', sans-serif", margin: 0 }}>
            No spam, ever. Just a personal note from Mike & Val.
          </p>
        </div>
      </div>
    </div>
  );
}

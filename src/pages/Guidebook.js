import { useState } from "react";
import { LOGO } from "../logo";

const SLATE = "#2a3f48";
const MID = "#5a7a88";
const LIGHT = "#8aacb8";
const CARD = "rgba(255,255,255,0.55)";
const BORDER = "rgba(255,255,255,0.7)";

const SECTIONS = [
  {
    id: "property", title: "Property Tips", subtitle: "House essentials",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=75",
    featured: [
      { tag: "Important", name: "Drinking Water", detail: "Regular faucets are NOT for drinking. Use the small RO faucet to the RIGHT of the main sink — clean filtered water only." },
      { tag: "WiFi", name: "Password: pineapple", detail: "Check-in 4pm · Check-out 10am. Washer/dryer in the shed by driveway." },
    ],
    items: [
      { name: "Power", detail: "Solar + grid + battery backup. Only run A/C in rooms you need overnight. If grid goes down, hot water will be temporarily unavailable." },
      { name: "Trash", detail: "Bins at end of paved road, ~2/3 mile from property. Drop off coming and going. Never leave outside overnight." },
      { name: "Gear & Amenities", detail: "Cooler, Bluetooth speaker, snorkel gear, beach chairs, grilling supplies in bins on far side of porch. Paddleboard in board locker (far side from screen door)." },
      { name: "Family", detail: "Pack-n-play crib, high chair, kids cutlery/plates/cups, and toys available." },
    ],
  },
  {
    id: "beaches", title: "Beaches", subtitle: "North Eleuthera shores",
    img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=75",
    featured: [
      { tag: "On Property", name: "Lanai Beach", detail: "Head RIGHT along the rocks for snorkeling. Fish, rays, turtles, octopus, sharks. Gets better the further you go." },
      { tag: "5 min · Mike & Val fave", name: "Ben Bay Beach", detail: "Horseshoe bay. Not easiest to reach — avoid after rain, but absolutely worth it when dry." },
    ],
    items: [
      { name: "Current Beach / Sand Bar — 5 min", detail: "When Lanai is rough, this is always calm. Very shallow — walk out half a mile. Off the main road just before town." },
      { name: "Gaulding Cay Beach — 20 min", detail: "Amazing day trip beach. Shallow for hundreds of yards. Daddy Joe's is right across the street." },
      { name: "Preacher's Cave Beach — 20 min", detail: "Easily accessible. Bring lunch and watch boats heading to Harbour Island." },
      { name: "Rainbow Bay Beach — 30 min", detail: "Palapas for shade, decent snorkeling out to the island on the left." },
      { name: "Surfer's Beach", detail: "Best surf on the island — great stop even if you're not surfing." },
      { name: "Ten Bay Beach — 1hr 15min", detail: "Worth the drive! Long shaded beach, walk out almost half a mile. Stop in Governor's Harbour for lunch on the way." },
      { name: "Twin Cove Beach — 1hr", detail: "One of the most beautiful on the island. Old sand road through jungle to get there." },
      { name: "Pink Sands Beach — Harbour Island", detail: "World famous. Drive 20 min to ferry, take taxi boat. Check out Ms. V's for chair/umbrella rentals." },
    ],
  },
  {
    id: "restaurants", title: "Restaurants", subtitle: "Mike & Val's favorites",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=75",
    featured: [
      { tag: "20 min · Must Do", name: "Daddy Joe's", detail: "Great lunch & dinner near Gaulding Cay Beach. Sometimes live music at night. Pair with a beach day across the street." },
      { tag: "15 min · Don't miss", name: "Uncle Tommy's Bakery", detail: "Coconut bread Thursdays, pizza Fridays, best conch fritters on the island. In Lower Bogue past the playground on the left." },
    ],
    items: [
      { name: "The Cove, Eleuthera", detail: "Great for a nicer dinner. Incredible property. Call ahead for reservations." },
      { name: "LeLe's Homemade Pizzas — 20 min", detail: "Delivers to Current! Order online. Also does cinnamon rolls — call ahead." },
      { name: "El Karaka Glass Window Bar & Grill — 20 min", detail: "Unbeatable views of Glass Window Bridge. Perfect for drinks or sunset." },
      { name: "Rainbow Inn Restaurant — 30 min", detail: "Decent pizza, small balcony with water views." },
      { name: "Pascal's Oceanfront — 1hr", detail: "Grab lunch, hop in the pool, near Governor's Harbour. Ask for Sammy." },
      { name: "Pittman's Cove Seafood", detail: "Governor's Harbour — stop for Conch Salad! Cool little shack right on the water." },
      { name: "Bahamas Paradise Farms / Eddy's Kitchen", detail: "Great pizza — delivers to Current on request! Call ahead." },
    ],
  },
  {
    id: "island_dining", title: "Island Day Trips", subtitle: "Harbour Island & Spanish Wells",
    img: "https://images.unsplash.com/photo-1520116468816-95b69f847357?w=600&q=75",
    featured: [
      { tag: "Harbour Island · Iconic", name: "The Landing", detail: "Exceptional brunch and drinks, right where the taxi boat drops you off. No golf cart needed. 15 locals recommend." },
      { tag: "Spanish Wells · 22 recommend", name: "The Shipyard", detail: "Great views of the Atlantic, wonderful food. Short walk from boat drop-off — no golf cart needed." },
    ],
    items: [
      { name: "Pink Sands Beach — Harbour Island", detail: "World famous. Take taxi boat from the north end (~20 min drive). Rent golf carts to explore. Also: The Dunmore Hotel and Coral Sands for meals." },
      { name: "Spanish Wells", detail: "Short taxi boat ride. Golf carts are primary transport. Also try: Wreckers (marina views) and Sandbar Beach Bar (live music Sundays)." },
      { name: "Getting There", detail: "Drive ~20 min north to the ferry, take the water taxi. Boats cost ~$6. Rent golf carts on each island." },
    ],
  },
  {
    id: "sightseeing", title: "Sightseeing", subtitle: "Eleuthera's natural wonders",
    img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=75",
    featured: [
      { tag: "20 min · 68 locals recommend", name: "Glass Window Bridge", detail: "Where the Atlantic meets the Caribbean. Stunning contrasting water colors. Small bar & grill just north." },
      { tag: "Hidden gem", name: "Bahamas Paradise Farms", detail: "Call ahead for a tour. Tropical fruits, animals, beach area, swimming holes, rock shower. Ask Edward about the mango tasting." },
    ],
    items: [
      { name: "Sapphire Blue Hole", detail: "Blue hole in the forest — jump in and swim in crystal clear water. Use the rope to climb out carefully." },
      { name: "Hatchet Bay Cave", detail: "Limestone caves near Alice Town. Stalagmites, stalactites, underground adventure." },
      { name: "Queen's Bath", detail: "Beautiful rock pools. Bring shoes. Be very careful in rough conditions — waves sneak up." },
      { name: "Preacher's Cave", detail: "Historically significant early Bahamian settlement site. Great adjacent beach — bring lunch and watch boats." },
    ],
  },
  {
    id: "excursions", title: "Water Excursions", subtitle: "Adventures from your beach",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=75",
    featured: [
      { tag: "Picks up from Lanai beach", name: "Captain James", detail: "Our local captain of choice. Fishing, snorkeling, stingrays, swimming pigs, isolated beaches. WhatsApp: +1 (242) 470-0671" },
    ],
    items: [
      { name: "Swimming Pigs", detail: "Only ~10 min by boat from the property. Captain James can take you!" },
      { name: "Snorkeling at Lanai", detail: "Head right from beach along the rocks. Gets better the further you go — fish, rays, turtles, sharks." },
      { name: "Paddleboard", detail: "In the board locker on far side of house from screen door. Electric pump + power bank or manual pump." },
    ],
  },
  {
    id: "groceries", title: "Groceries", subtitle: "Stock up before you arrive",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=75",
    featured: [
      { tag: "15-20 min · Best stocked", name: "North Eleuthera Shopping Center", detail: "Largest store in Eleuthera. From Current, head toward airport, past Rubi's gas station, left turn toward Bluff — store on your right." },
    ],
    items: [
      { name: "Johnson's Grocery — 15 min", detail: "In Lower Bogue. From Current, past playground, past Healthy Choice restaurant, right at the small service station." },
      { name: "Uncle Tommy's Bakery — 15 min", detail: "Fresh bread, coconut bread Thursdays. Also great for a food stop." },
      { name: "Bring Specialty Items", detail: "Good meats and dietary specialty items (gluten free etc.) can be hard to find. Pack a cooler from home if possible." },
      { name: "Bring Cash", detail: "ATMs are rare on the island. Some places are cash only." },
    ],
  },
  {
    id: "getting_here", title: "Getting Here", subtitle: "Travel tips for Eleuthera",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=75",
    featured: [
      { tag: "North Eleuthera Airport (ELH)", name: "Flying In", detail: "Fly through Miami (MIA) — just 37 min flight to ELH. Also one daily through Charlotte (CLT). Usually under $600/person outside peak season." },
    ],
    items: [
      { name: "Car Rental — Essential", detail: "You need a car here! Dirt and rock roads lead to the best beaches. An SUV is best. Arthur Turnquest (go-to), Chris Darling (WhatsApp: 242.553.6638), Pick Pay Rentals (pickpayrentals.com), Agatha (242.816.7213) — right around the corner." },
      { name: "From the Airport", detail: "~15-20 min drive to Lanai. Pass trash bins on the left about 2/3 mile before the property — drop bags there on the way in." },
    ],
  },
  {
    id: "medical", title: "Emergency & Medical", subtitle: "Important contacts",
    img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=75",
    items: [
      { name: "Emergency (Bahamas)", detail: "919 — or 911 also works." },
      { name: "Mike (Owner)", detail: "919.345.6063 — always reach out to Mike or Val first for any property issues." },
      { name: "Valerie (Owner)", detail: "540.878.9465" },
      { name: "Briland Premier Medical Center", detail: "Local medical center on the island." },
      { name: "Spanish Wells Medical Centre", detail: "Tel: (242) 333-4633" },
    ],
  },
];

function Section({ section, isOpen, onToggle }) {
  return (
    <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 12px rgba(42,63,72,0.08)" }}>
      <div onClick={onToggle} style={{ position: "relative", height: 130, overflow: "hidden", cursor: "pointer" }}>
        <img src={section.img} alt={section.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.background = "#c8d8dc"; }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(42,63,72,0.1) 0%, rgba(42,63,72,0.65) 100%)", display: "flex", alignItems: "flex-end", padding: "14px 18px", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: "#fff", fontSize: 18, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}>{section.title}</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 10, fontFamily: "'Jost', sans-serif", textTransform: "uppercase", letterSpacing: 1, fontWeight: 300, marginTop: 2 }}>{section.subtitle}</div>
          </div>
          <div style={{ color: "#fff", fontSize: 13 }}>{isOpen ? "▲" : "▼"}</div>
        </div>
      </div>
      {isOpen && (
        <div style={{ background: CARD }}>
          {section.featured && section.featured.length > 0 && (
            <div style={{ padding: "14px 14px 6px", display: "grid", gridTemplateColumns: section.featured.length === 1 ? "1fr" : "1fr 1fr", gap: 10 }}>
              {section.featured.map((f, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.7)", borderRadius: 14, padding: "12px 14px", border: `1px solid ${BORDER}` }}>
                  {f.tag && <span style={{ display: "inline-block", background: SLATE, color: "#fff", borderRadius: 20, padding: "2px 10px", fontSize: 10, fontFamily: "'Jost', sans-serif", marginBottom: 6, fontWeight: 500 }}>{f.tag}</span>}
                  <div style={{ color: SLATE, fontSize: 14, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, marginBottom: 4, lineHeight: 1.3 }}>{f.name}</div>
                  <div style={{ color: MID, fontSize: 13, fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1.6 }}>{f.detail}</div>
                </div>
              ))}
            </div>
          )}
          {section.items && section.items.length > 0 && (
            <div style={{ padding: section.featured ? "4px 16px 14px" : "14px 16px" }}>
              {section.items.map((item, i) => (
                <div key={i} style={{ padding: "12px 0", borderBottom: i < section.items.length - 1 ? "1px solid rgba(42,63,72,0.07)" : "none", display: "flex", gap: 12 }}>
                  <div style={{ width: 3, borderRadius: 2, background: "rgba(122,170,184,0.4)", flexShrink: 0, alignSelf: "stretch", minHeight: 16 }} />
                  <div>
                    <div style={{ color: SLATE, fontSize: 13, fontFamily: "'Jost', sans-serif", fontWeight: 500, marginBottom: 3 }}>{item.name}</div>
                    <div style={{ color: MID, fontSize: 14, fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1.65 }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Guidebook() {
  const [openSection, setOpenSection] = useState("beaches");

  const toggle = (id) => setOpenSection(prev => prev === id ? null : id);

  return (
    <div style={{ minHeight: "100vh", background: "#c8d8dc", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80" alt="Lanai beach" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(200,216,220,0.5) 0%, rgba(42,63,72,0.6) 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <img src={LOGO} alt="Lanai" style={{ width: 120, marginBottom: 6 }} onError={e => { e.target.style.display = "none"; }} />
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 11, letterSpacing: 2.5, fontFamily: "'Jost', sans-serif", textTransform: "uppercase", fontWeight: 300 }}>Guest Guidebook · Eleuthera</p>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8, padding: "14px 16px 8px", overflowX: "auto", scrollbarWidth: "none" }}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => toggle(s.id)} style={{
              background: openSection === s.id ? SLATE : CARD,
              border: `1px solid ${openSection === s.id ? SLATE : BORDER}`,
              borderRadius: 20, padding: "6px 14px", whiteSpace: "nowrap",
              color: openSection === s.id ? "#fff" : MID,
              fontSize: 12, fontFamily: "'Jost', sans-serif", cursor: "pointer",
              fontWeight: openSection === s.id ? 500 : 300, letterSpacing: 0.5, flexShrink: 0,
            }}>{s.title}</button>
          ))}
        </div>

        <div style={{ padding: "4px 16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          {SECTIONS.map(section => (
            <Section key={section.id} section={section} isOpen={openSection === section.id} onToggle={() => toggle(section.id)} />
          ))}
        </div>

        <p style={{ textAlign: "center", color: LIGHT, fontSize: 11, fontFamily: "'Jost', sans-serif", padding: "0 0 24px", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 300 }}>
          Made with love by Mike & Val
        </p>
      </div>
      <style>{`::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}

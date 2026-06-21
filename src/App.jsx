import { useState } from "react";
import { BookOpen, FileText, Bell, Download, Send, CheckCircle, GraduationCap, MessageSquare, AlertCircle } from "lucide-react";

const C = {
  navy: "#0F2247", navyMid: "#1B3A6B", teal: "#00B4A6", tealBg: "#E0F7F5",
  amber: "#F59E0B", amberBg: "#FEF3C7", green: "#10B981", greenBg: "#D1FAE5",
  surface: "#F8FAFC", white: "#fff", border: "#E2E8F0",
  text: "#1E293B", muted: "#64748B", light: "#94A3B8",
};

const YEARS = [
  { id: 1, label: "PCEM1", sub: "Basic Sciences", color: "#4361EE", bg: "#EEF0FF",
    courses: [
      { code: "ANAT101", name: "General Anatomy", files: 4, updated: "Jun 10" },
      { code: "HIST101", name: "Histology & Cytology", files: 2, updated: "Jun 5" },
      { code: "BIOC101", name: "Biochemistry", files: 5, updated: "Jun 8" },
      { code: "PHYS101", name: "Human Physiology I", files: 3, updated: "May 28" },
      { code: "BPHY101", name: "Biophysics", files: 1, updated: "May 20" },
      { code: "EMBR101", name: "Embryology", files: 2, updated: "Jun 1" },
      { code: "MENG101", name: "Medical English", files: 3, updated: "Jun 12" },
    ]},
  { id: 2, label: "PCEM2", sub: "Fundamental Sciences", color: "#3B82F6", bg: "#EFF6FF",
    courses: [
      { code: "ANAT201", name: "Regional Anatomy", files: 6, updated: "Jun 11" },
      { code: "PHYS201", name: "Human Physiology II", files: 4, updated: "Jun 9" },
      { code: "PHAR201", name: "General Pharmacology", files: 5, updated: "Jun 7" },
      { code: "MICR201", name: "Microbiology & Virology", files: 3, updated: "Jun 3" },
      { code: "IMMU201", name: "Immunology", files: 2, updated: "May 25" },
      { code: "PATH201", name: "General Pathology", files: 4, updated: "Jun 1" },
    ]},
  { id: 3, label: "DCEM1", sub: "Clinical Introduction", color: "#06B6D4", bg: "#ECFEFF",
    courses: [
      { code: "SEMI301", name: "Clinical Semiology", files: 5, updated: "Jun 12" },
      { code: "PATH301", name: "Special Pathology", files: 4, updated: "Jun 8" },
      { code: "PHAR301", name: "Clinical Pharmacology", files: 3, updated: "Jun 5" },
      { code: "RADI301", name: "Radiology Basics", files: 2, updated: "May 30" },
      { code: "EPID301", name: "Epidemiology", files: 2, updated: "May 22" },
      { code: "ETH301", name: "Medical Ethics & Law", files: 1, updated: "May 18" },
    ]},
  { id: 4, label: "DCEM2", sub: "Clinical Rotations", color: "#10B981", bg: "#ECFDF5",
    courses: [
      { code: "INTM401", name: "Internal Medicine", files: 7, updated: "Jun 14" },
      { code: "SURG401", name: "General Surgery", files: 6, updated: "Jun 13" },
      { code: "PEDI401", name: "Pediatrics", files: 5, updated: "Jun 10" },
      { code: "GYNE401", name: "Gynecology & Obstetrics", files: 4, updated: "Jun 8" },
      { code: "EMER401", name: "Emergency Medicine", files: 3, updated: "Jun 5" },
      { code: "PSYC401", name: "Psychiatry", files: 3, updated: "Jun 2" },
    ]},
  { id: 5, label: "DCEM3", sub: "Advanced Clinical", color: "#059669", bg: "#D1FAE5",
    courses: [
      { code: "CARD501", name: "Cardiology", files: 6, updated: "Jun 15" },
      { code: "NEUR501", name: "Neurology", files: 5, updated: "Jun 12" },
      { code: "DERM501", name: "Dermatology", files: 3, updated: "Jun 8" },
      { code: "ORTH501", name: "Orthopedics", files: 4, updated: "Jun 6" },
      { code: "ONCO501", name: "Oncology", files: 3, updated: "Jun 3" },
      { code: "OPHT501", name: "Ophthalmology", files: 2, updated: "May 28" },
    ]},
];

const RESOURCES = [
  { type: "Summary",    year: "PCEM1", title: "Upper Limb Anatomy — Complete Summary",            author: "Dr. Ben Salem",  date: "Jun 2025" },
  { type: "Past Exams", year: "All",    title: "Final Exam 2024 — Pharmacology",                   author: "Admin",          date: "Apr 2025" },
  { type: "Summary",    year: "PCEM2", title: "Immunology — Key Concepts & Mnemonics",            author: "Student Rep",    date: "Mar 2025" },
  { type: "Guide",      year: "All",    title: "Studying Medicine in English — Tips & Tools",       author: "Admin",          date: "Feb 2025" },
  { type: "Summary",    year: "DCEM1", title: "Cardiovascular Semiology Guide",                   author: "Dr. Khelil",     date: "Jan 2025" },
  { type: "Past Exams", year: "DCEM2", title: "2024 Surgery OSCE Preparation Guide",              author: "Admin",          date: "Jun 2024" },
  { type: "Summary",    year: "PCEM2", title: "Microbiology — Bacteria Classification",           author: "Student Rep",    date: "Dec 2024" },
  { type: "Guide",      year: "PCEM1", title: "How to Approach Anatomy Practical Exams",          author: "Dr. Zouari",     date: "Nov 2024" },
];

const NOTICES = [
  { id: 1, text: "New Anatomy materials uploaded for Year 1", date: "Jun 15", urgent: false },
  { id: 2, text: "URGENT: Year 2 exam schedule released — July 2025", date: "Jun 10", urgent: true },
  { id: 3, text: "Student feedback deadline extended to June 30", date: "Jun 5", urgent: true },
  { id: 4, text: "Welcome to the Tabib Hub portal!", date: "Jun 1", urgent: false },
];

const CATEGORIES = ["Missing course", "Exam schedule", "Translation issue", "Resource request", "Other"];

const typeStyle = (t) => ({
  Summary:    { bg: "#DBEAFE", color: "#1E40AF" },
  "Past Exams": { bg: "#FEF3C7", color: "#92400E" },
  Guide:      { bg: "#D1FAE5", color: "#065F46" },
}[t] || { bg: C.surface, color: C.muted });

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function App() {
  const [activeYear, setActiveYear] = useState(1);
  const [resFilter, setResFilter] = useState("All");
  const [form, setForm] = useState({ name: "", year: "", subject: "", message: "", category: "" });
  const [submitted, setSubmitted] = useState(false);
  const [navActive, setNavActive] = useState("home");

  const year = YEARS.find(y => y.id === activeYear);
  const filteredRes = resFilter === "All" ? RESOURCES : RESOURCES.filter(r => r.type === resFilter);

  const nav = (id) => { scrollTo(id); setNavActive(id); };

  const handleSubmit = () => {
    if (!form.message.trim()) return;
    setSubmitted(true);
    setForm({ name: "", year: "", subject: "", message: "", category: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif", background: C.surface, minHeight: "100vh", color: C.text }}>

      {/* ── NAV ── */}
      <nav style={{ background: C.navy, position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 0 rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 58 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: C.teal, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>⚕</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.1 }}>Tabib Hub</div>
              <div style={{ color: C.light, fontSize: 9.5, letterSpacing: "0.07em", textTransform: "uppercase" }}>English Program</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {[["home","Home"],["courses","Courses"],["resources","Resources"],["feedback","Feedback"]].map(([id,label]) => (
              <button key={id} onClick={() => nav(id)} style={{
                background: navActive === id ? "rgba(0,180,166,0.14)" : "none",
                border: "none", color: navActive === id ? C.teal : "#CBD5E1",
                cursor: "pointer", padding: "6px 14px", borderRadius: 7, fontSize: 13, fontWeight: 500,
              }}>{label}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div id="home" style={{ background: `linear-gradient(140deg, ${C.navy} 0%, ${C.navyMid} 60%, #0E6D8A 100%)`, padding: "70px 24px 50px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -40, width: 300, height: 300, borderRadius: "50%", background: "rgba(0,180,166,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -70, left: -20, width: 240, height: 240, borderRadius: "50%", background: "rgba(67,97,238,0.08)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 740, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,180,166,0.12)", border: "1px solid rgba(0,180,166,0.28)", borderRadius: 20, padding: "4px 14px", fontSize: 12, color: "#5EEAD4", marginBottom: 18, letterSpacing: "0.04em" }}>
            🇹🇳 Faculty of Medicine of Sousse — English Program
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(26px, 5vw, 46px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 14px", fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Your Medical Journey,<br /><span style={{ color: "#5EEAD4" }}>All in One Place</span>
          </h1>
          <p style={{ color: C.light, fontSize: 15.5, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 26px" }}>
            The official student hub for the English-language medicine program at Sousse. Courses, summaries, key resources, and feedback — from Year 1 to Year 5.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => nav("courses")} style={{ background: C.teal, color: "#fff", border: "none", padding: "11px 26px", borderRadius: 9, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Browse Courses →</button>
            <button onClick={() => nav("resources")} style={{ background: "rgba(255,255,255,0.07)", color: "#fff", border: "1px solid rgba(255,255,255,0.17)", padding: "11px 26px", borderRadius: 9, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>View Resources</button>
          </div>
        </div>
        <div style={{ maxWidth: 660, margin: "44px auto 0", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {[["5","Years Covered"],["All","Courses"],["50+","Resources"],["100%","Taught in English"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center", background: "rgba(255,255,255,0.05)", borderRadius: 11, padding: "14px 8px", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ color: "#5EEAD4", fontSize: 22, fontWeight: 800 }}>{n}</div>
              <div style={{ color: C.light, fontSize: 11, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NOTICE TICKER ── */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 24px", display: "flex", gap: 12, alignItems: "center", overflowX: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: "fit-content", fontWeight: 700, fontSize: 11.5, letterSpacing: "0.07em", color: C.navy }}>
            <Bell size={13} color={C.amber} /> NOTICES
          </div>
          <div style={{ width: 1, height: 18, background: C.border, flexShrink: 0 }} />
          {NOTICES.map(a => (
            <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 7, background: a.urgent ? "#FFFBEB" : C.surface, borderRadius: 7, padding: "6px 13px", minWidth: "fit-content", border: `1px solid ${a.urgent ? "#FDE68A" : C.border}`, flexShrink: 0 }}>
              {a.urgent && <span style={{ fontSize: 9, background: "#EF4444", color: "#fff", borderRadius: 3, padding: "1px 6px", fontWeight: 700 }}>URGENT</span>}
              <span style={{ fontSize: 13, color: C.text }}>{a.text}</span>
              <span style={{ fontSize: 11, color: C.light }}>— {a.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── COURSES ── */}
      <div id="courses" style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Course Materials</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: C.navy, margin: "0 0 8px", fontFamily: "Georgia, serif" }}>Browse by Year</h2>
            <p style={{ color: C.muted, margin: 0, fontSize: 15 }}>Select your academic year to access materials uploaded by faculty and administrators.</p>
          </div>

          {/* Year selector */}
          <div style={{ display: "flex", gap: 8, marginBottom: 30, flexWrap: "wrap" }}>
            {YEARS.map(y => (
              <button key={y.id} onClick={() => setActiveYear(y.id)} style={{
                flex: "1 1 150px", padding: "13px 16px", borderRadius: 11,
                border: `2px solid ${activeYear === y.id ? y.color : C.border}`,
                background: activeYear === y.id ? y.color : C.white,
                color: activeYear === y.id ? "#fff" : C.muted,
                cursor: "pointer", textAlign: "left", transition: "all 0.15s",
              }}>
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{y.label}</div>
                <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>{y.sub}</div>
                <div style={{ fontSize: 10.5, marginTop: 8, opacity: 0.65 }}>{y.courses.length} modules</div>
              </button>
            ))}
          </div>

          {year && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 18 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: year.color }} />
                <span style={{ fontWeight: 700, color: C.navy, fontSize: 16 }}>{year.label} — {year.sub}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 13 }}>
                {year.courses.map(c => (
                  <div key={c.code} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.09)"; e.currentTarget.style.borderColor = year.color + "55"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = C.border; }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div>
                        <div style={{ fontSize: 10, color: year.color, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 4 }}>{c.code}</div>
                        <div style={{ fontWeight: 700, color: C.text, fontSize: 14, lineHeight: 1.35 }}>{c.name}</div>
                      </div>
                      <div style={{ background: year.bg, borderRadius: 7, padding: "5px 9px", display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                        <FileText size={12} color={year.color} />
                        <span style={{ fontSize: 12, color: year.color, fontWeight: 600 }}>{c.files}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: C.light }}>Updated {c.updated}</span>
                      <button style={{ background: year.bg, border: "none", borderRadius: 7, padding: "6px 12px", color: year.color, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                        View →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── RESOURCES ── */}
      <div id="resources" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "60px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 30 }}>
            <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Library</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: C.navy, margin: "0 0 8px", fontFamily: "Georgia, serif" }}>Summaries & Resources</h2>
            <p style={{ color: C.muted, margin: 0, fontSize: 15 }}>Curated summaries, past papers, and guides — vetted by faculty and student representatives.</p>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
            {["All", "Summary", "Past Exams", "Guide"].map(f => (
              <button key={f} onClick={() => setResFilter(f)} style={{
                padding: "7px 16px", borderRadius: 20, border: `1px solid ${resFilter === f ? C.teal : C.border}`,
                background: resFilter === f ? C.teal : C.white, color: resFilter === f ? "#fff" : C.muted,
                fontSize: 13, fontWeight: 500, cursor: "pointer",
              }}>{f}</button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 13 }}>
            {filteredRes.map((r, i) => {
              const ts = typeStyle(r.type);
              return (
                <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: ts.bg, color: ts.color }}>{r.type}</span>
                    <span style={{ fontSize: 11, color: C.light }}>{r.date}</span>
                  </div>
                  <div style={{ fontWeight: 700, color: C.text, fontSize: 14, lineHeight: 1.4 }}>{r.title}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: C.muted }}>By {r.author}</span>
                    <button style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 7, padding: "6px 12px", color: C.navy, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                      <Download size={12} /> Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FEEDBACK ── */}
      <div id="feedback" style={{ background: C.white, borderTop: `1px solid ${C.border}`, padding: "60px 24px" }}>
        <div style={{ maxWidth: 660, margin: "0 auto" }}>
          <div style={{ marginBottom: 30, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Student Voice</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: C.navy, margin: "0 0 8px", fontFamily: "Georgia, serif" }}>Submit Feedback</h2>
            <p style={{ color: C.muted, margin: 0, fontSize: 15 }}>Report issues, request resources, or suggest improvements. All submissions go directly to student representatives.</p>
          </div>

          {submitted && (
            <div style={{ background: C.greenBg, border: `1px solid ${C.green}`, borderRadius: 11, padding: "13px 18px", display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <CheckCircle size={17} color={C.green} />
              <span style={{ color: "#065F46", fontWeight: 600, fontSize: 14 }}>Feedback submitted successfully. Student representatives will review it shortly.</span>
            </div>
          )}

          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "26px" }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "block", marginBottom: 7 }}>Category</label>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setForm(p => ({ ...p, category: cat }))} style={{
                    padding: "6px 13px", borderRadius: 18, border: `1px solid ${form.category === cat ? C.teal : C.border}`,
                    background: form.category === cat ? C.tealBg : C.white,
                    color: form.category === cat ? C.teal : C.muted,
                    fontSize: 12, fontWeight: 500, cursor: "pointer",
                  }}>{cat}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>Full name <span style={{ fontWeight: 400, color: C.light }}>(optional)</span></label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your name"
                  style={{ width: "100%", padding: "9px 13px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>Academic year</label>
                <select value={form.year} onChange={e => setForm(p => ({ ...p, year: e.target.value }))}
                  style={{ width: "100%", padding: "9px 13px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, outline: "none", background: C.white, boxSizing: "border-box" }}>
                  <option value="">Select year</option>
                  {YEARS.map(y => <option key={y.id} value={y.label}>{y.label}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>Subject</label>
              <input value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="Brief subject of your message"
                style={{ width: "100%", padding: "9px 13px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>Message</label>
              <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={5}
                placeholder="Describe your issue, request, or suggestion in detail…"
                style={{ width: "100%", padding: "9px 13px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>

            <button onClick={handleSubmit} style={{ width: "100%", background: C.navy, color: "#fff", border: "none", padding: "13px", borderRadius: 9, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Send size={16} /> Submit Feedback
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.navy, padding: "28px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 28, height: 28, background: C.teal, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>⚕</div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Tabib Hub</span>
        </div>
        <p style={{ color: C.light, fontSize: 13, margin: "0 0 4px" }}>Faculty of Medicine of Sousse — English Program © 2025</p>
        <p style={{ color: "#334155", fontSize: 12, margin: 0 }}>Built for students, by students. Contact your student representatives for technical support.</p>
      </footer>

    </div>
  );
}

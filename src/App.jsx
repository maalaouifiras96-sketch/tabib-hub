import { useState } from "react";
import { BookOpen, FileText, Bell, Download, Send, CheckCircle, GraduationCap, MessageSquare, AlertCircle, X, UploadCloud } from "lucide-react";

const C = {
  navy: "#0F2247", navyMid: "#1B3A6B", teal: "#00B4A6", tealBg: "#E0F7F5",
  amber: "#F59E0B", amberBg: "#FEF3C7", green: "#10B981", greenBg: "#D1FAE5",
  surface: "#F8FAFC", white: "#fff", border: "#E2E8F0",
  text: "#1E293B", muted: "#64748B", light: "#94A3B8",
};

const YEARS = [
  { id: 1, label: "PCEM1", sub: "Basic Sciences", color: "#4361EE", bg: "#EEF0FF",
    courses: [
      { code: "SM1", name: "General Anatomy", bloc: "Bloc 1", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25177", files: [] },
      { code: "SM2", name: "Cellular & Molecular Biology", bloc: "Bloc 1", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25178", files: [] },
      { code: "SM3", name: "General Physiology", bloc: "Bloc 1", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25179", files: [] },
      { code: "SM4", name: "Metabolic, Structural and General Biochemistry", bloc: "Bloc 1", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25180", files: [] },
      { code: "SM5", name: "Biophysics", bloc: "Bloc 1", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25181", files: [] },
      { code: "SM9", name: "Sciences Philosophy and the History of Medicine", bloc: "Bloc 1", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25183", files: [] },
      { code: "SM6", name: "General Immunology", bloc: "Bloc 2", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25182", files: [] },
      { code: "SM7", name: "General Genetics", bloc: "Bloc 2", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25107", files: [] },
      { code: "SM8", name: "Health Sociology", bloc: "Bloc 2", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25108", files: [] },
      { code: "SM10", name: "Community Medicine", bloc: "Bloc 2", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25109", files: [] },
      { code: "SM11", name: "Tissue and Embryonic Development", bloc: "Bloc 2", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25110", files: [] },
      { code: "SM13", name: "Internal Milieu and Blood Components", bloc: "Bloc 2", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25111", files: [] },
      { code: "SM19.2", name: "Numerical Culture and Competence N2C", bloc: "Bloc 2", officialLink: "https://uso2026.uvt.tn/course/view.php?id=27399", files: [] },
      { code: "SM12", name: "Growth and Development", bloc: "Bloc 3", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25184", files: [] },
      { code: "SM14", name: "Defense Mechanism, Immunology and Inflammation", bloc: "Bloc 3", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25112", files: [] },
      { code: "SM15", name: "Physical Basics and Imagery Technologies", bloc: "Bloc 3", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25185", files: [] },
      { code: "SM16", name: "Scientific Basics of Medicine (Scientific Approach)", bloc: "Bloc 3", officialLink: "https://uso2026.uvt.tn/course/view.php?id=8136", files: [] },
      { code: "SM17", name: "Clinical Skills and Semiology", bloc: "Bloc 3", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25186", files: [] },
      { code: "SM18", name: "Medical Leadership", bloc: "Bloc 3", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25187", files: [] },
    ]},
  { id: 2, label: "PCEM2", sub: "Fundamental Sciences", color: "#3B82F6", bg: "#EFF6FF",
    courses: [
      { code: "TH21", name: "The Respiratory System & ENT (Respiration)", bloc: "Bloc 1", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25188", files: [] },
      { code: "TH22", name: "The Cardiovascular System (Circulation)", bloc: "Bloc 1", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25189", files: [] },
      { code: "TH23", name: "The Urinary System", bloc: "Bloc 1", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25190", files: [] },
      { code: "TH25", name: "The Reproductive System & Sexuality", bloc: "Bloc 1", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25191", files: [] },
      { code: "TH26", name: "Scientific Bases of Medicine 2 (Epidemiology)", bloc: "Bloc 1", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25192", files: [] },
      { code: "TH29.2", name: "Medical Computer Science (Digitisation and Image Processing)", bloc: "Bloc 1", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25201", files: [] },
      { code: "TH27", name: "Clinical Skills & Semiology 2", bloc: "Bloc 1", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25193", files: [] },
      { code: "TH20", name: "Musculoskeletal System", bloc: "Bloc 2", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25114", files: [] },
      { code: "TH24", name: "Digestive System & Nutrition", bloc: "Bloc 2", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25115", files: [] },
      { code: "TH28", name: "Medical Leadership 2 (Ethics, Deontology and Human Rights)", bloc: "Bloc 2", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25116", files: [] },
      { code: "TH30", name: "The Endocrine System", bloc: "Bloc 2", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25117", files: [] },
      { code: "TH31", name: "The Nervous System & Sense Organs", bloc: "Bloc 2", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25195", files: [] },
      { code: "TH36", name: "Scientific Bases of Medicine 3 (Research Methodology)", bloc: "Bloc 2", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25118", files: [] },
      { code: "TH37", name: "Clinical Skills & Semiology 3", bloc: "Bloc 2", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25119", files: [] },
      { code: "TH32", name: "The Psychic System", bloc: "Bloc 3", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25196", files: [] },
      { code: "TH33", name: "Micro-organisms and Infections: Microbiology-Parasitology-Mycology", bloc: "Bloc 3", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25197", files: [] },
      { code: "TH34", name: "General Pathology", bloc: "Bloc 3", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25198", files: [] },
      { code: "TH35", name: "General Pharmacology", bloc: "Bloc 3", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25199", files: [] },
      { code: "TH38", name: "Medical Leadership 3 \"Understanding Practice Environment\"", bloc: "Bloc 3", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25200", files: [] },
      { code: "TH39.2", name: "Medical Computer Science (Medical Information System)", bloc: "Bloc 3", officialLink: "https://uso2026.uvt.tn/course/view.php?id=25194", files: [] },
    ]},
  { id: 3, label: "DCEM1", sub: "Clinical Introduction", color: "#06B6D4", bg: "#ECFEFF",
    courses: []},
  { id: 4, label: "DCEM2", sub: "Clinical Rotations", color: "#10B981", bg: "#ECFDF5",
    courses: []},
  { id: 5, label: "DCEM3", sub: "Advanced Clinical", color: "#059669", bg: "#D1FAE5",
    courses: []},
];

const RESOURCES = [];

const NOTICES = [
  { id: 1, text: "Welcome to the Tabib Hub portal!", date: "Jun 1", urgent: false },
];

const CATEGORIES = ["Missing course", "Exam schedule", "Translation issue", "Resource request", "Other"];

const typeStyle = (t) => ({
  Summary:    { bg: "#DBEAFE", color: "#1E40AF" },
  "Past Exams": { bg: "#FEF3C7", color: "#92400E" },
  "Schedules & Important Dates": { bg: "#D1FAE5", color: "#065F46" },
}[t] || { bg: C.surface, color: C.muted });

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function App() {
  const [activeYear, setActiveYear] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [resFilter, setResFilter] = useState("All");
  const [form, setForm] = useState({ name: "", year: "", subject: "", message: "", category: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [navActive, setNavActive] = useState("home");

  const year = YEARS.find(y => y.id === activeYear);
  const filteredRes = resFilter === "All" ? RESOURCES : RESOURCES.filter(r => r.type === resFilter);

  const nav = (id) => { scrollTo(id); setNavActive(id); };

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

  const handleSubmit = async () => {
    if (!form.message.trim()) return;
    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name || "Anonymous",
          year: form.year || "Not specified",
          category: form.category || "Not specified",
          subject: form.subject || "(no subject)",
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      setForm({ name: "", year: "", subject: "", message: "", category: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
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
            {[["home","Home"],["courses","Courses"],["resources","Resources"],["announcements","Announcements"],["feedback","Feedback"]].map(([id,label]) => (
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
              {year.courses.length === 0 ? (
                <div style={{ textAlign: "center", padding: "50px 20px", background: C.white, border: `1px dashed ${C.border}`, borderRadius: 12 }}>
                  <GraduationCap size={28} color={C.light} style={{ marginBottom: 10 }} />
                  <div style={{ color: C.muted, fontSize: 14.5, fontWeight: 500 }}>Courses coming soon</div>
                  <div style={{ color: C.light, fontSize: 13, marginTop: 4 }}>{year.label} modules haven't been added yet — check back soon.</div>
                </div>
              ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 13 }}>
                {year.courses.map(c => (
                  <div key={c.code} onClick={() => setSelectedCourse({ ...c, yearColor: year.color, yearBg: year.bg, yearLabel: year.label })} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.09)"; e.currentTarget.style.borderColor = year.color + "55"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = C.border; }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div>
                        <div style={{ fontSize: 10, color: year.color, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 4 }}>{c.code}</div>
                        <div style={{ fontWeight: 700, color: C.text, fontSize: 14, lineHeight: 1.35 }}>{c.name}</div>
                      </div>
                      <div style={{ background: year.bg, borderRadius: 7, padding: "5px 9px", display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                        <FileText size={12} color={year.color} />
                        <span style={{ fontSize: 12, color: year.color, fontWeight: 600 }}>{c.files.length}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: C.light }}>{c.bloc ? c.bloc : `Updated ${c.updated}`}</span>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedCourse({ ...c, yearColor: year.color, yearBg: year.bg, yearLabel: year.label }); }} style={{ background: year.bg, border: "none", borderRadius: 7, padding: "6px 12px", color: year.color, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                        View →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              )}
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
            {["All", "Summary", "Past Exams", "Schedules & Important Dates"].map(f => (
              <button key={f} onClick={() => setResFilter(f)} style={{
                padding: "7px 16px", borderRadius: 20, border: `1px solid ${resFilter === f ? C.teal : C.border}`,
                background: resFilter === f ? C.teal : C.white, color: resFilter === f ? "#fff" : C.muted,
                fontSize: 13, fontWeight: 500, cursor: "pointer",
              }}>{f}</button>
            ))}
          </div>

          {filteredRes.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px 20px", background: C.white, border: `1px dashed ${C.border}`, borderRadius: 12 }}>
              <FileText size={28} color={C.light} style={{ marginBottom: 10 }} />
              <div style={{ color: C.muted, fontSize: 14.5, fontWeight: 500 }}>No resources uploaded yet</div>
              <div style={{ color: C.light, fontSize: 13, marginTop: 4 }}>Check back soon — student representatives will add summaries and materials here.</div>
            </div>
          ) : (
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
                    <a href={r.link} target="_blank" rel="noopener noreferrer" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 7, padding: "6px 12px", color: C.navy, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, textDecoration: "none" }}>
                      <Download size={12} /> Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </div>

      {/* ── ANNOUNCEMENTS ── */}
      <div id="announcements" style={{ background: C.white, borderTop: `1px solid ${C.border}`, padding: "60px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ marginBottom: 30 }}>
            <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Stay Informed</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: C.navy, margin: "0 0 8px", fontFamily: "Georgia, serif" }}>Announcements</h2>
            <p style={{ color: C.muted, margin: 0, fontSize: 15 }}>Official updates from faculty staff and student representatives — exam schedules, new materials, and program news.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {NOTICES.map(a => (
              <div key={a.id} style={{ display: "flex", alignItems: "flex-start", gap: 14, background: a.urgent ? "#FFFBEB" : C.surface, border: `1px solid ${a.urgent ? "#FDE68A" : C.border}`, borderRadius: 12, padding: "16px 18px" }}>
                <div style={{ background: a.urgent ? C.amber : C.navy, borderRadius: 9, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {a.urgent ? <AlertCircle size={16} color="#fff" /> : <Bell size={15} color="#fff" />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    {a.urgent && <span style={{ fontSize: 9.5, background: "#EF4444", color: "#fff", borderRadius: 4, padding: "2px 7px", fontWeight: 700, letterSpacing: "0.03em" }}>URGENT</span>}
                    <span style={{ fontSize: 11, color: C.light }}>{a.date}</span>
                  </div>
                  <div style={{ fontSize: 14.5, color: C.text, fontWeight: 500, lineHeight: 1.5 }}>{a.text}</div>
                </div>
              </div>
            ))}
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

          {submitError && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 11, padding: "13px 18px", display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <AlertCircle size={17} color="#DC2626" />
              <span style={{ color: "#991B1B", fontWeight: 600, fontSize: 14 }}>Something went wrong sending your feedback. Please try again in a moment.</span>
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

            <button onClick={handleSubmit} disabled={submitting} style={{ width: "100%", background: submitting ? C.muted : C.navy, color: "#fff", border: "none", padding: "13px", borderRadius: 9, fontSize: 15, fontWeight: 700, cursor: submitting ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Send size={16} /> {submitting ? "Sending…" : "Submit Feedback"}
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

      {/* ── COURSE DETAIL MODAL ── */}
      {selectedCourse && (
        <div onClick={() => setSelectedCourse(null)} style={{ position: "fixed", inset: 0, background: "rgba(15,34,71,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: C.white, borderRadius: 16, maxWidth: 540, width: "100%", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>

            {/* Header */}
            <div style={{ background: selectedCourse.yearColor, padding: "22px 24px", borderRadius: "16px 16px 0 0", position: "relative" }}>
              <button onClick={() => setSelectedCourse(null)} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 7, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <X size={15} color="#fff" />
              </button>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 700, letterSpacing: "0.07em", marginBottom: 6 }}>{selectedCourse.yearLabel} · {selectedCourse.code}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{selectedCourse.name}</div>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>{selectedCourse.files.length} file{selectedCourse.files.length !== 1 ? "s" : ""} · {selectedCourse.bloc ? selectedCourse.bloc : `Updated ${selectedCourse.updated}`}</div>
            </div>

            {/* File list */}
            <div style={{ padding: "20px 24px" }}>
              {selectedCourse.officialLink && (
                <a href={selectedCourse.officialLink} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, background: C.navy, color: "#fff", borderRadius: 9, padding: "10px 14px", fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 18 }}>
                  Open on University E-Learning Platform ↗
                </a>
              )}

              <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>Course Materials</div>
              {selectedCourse.files.length === 0 ? (
                <div style={{ textAlign: "center", padding: "26px 16px", background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 10, marginBottom: 22 }}>
                  <div style={{ color: C.muted, fontSize: 13.5, fontWeight: 500 }}>No materials uploaded yet</div>
                  <div style={{ color: C.light, fontSize: 12, marginTop: 3 }}>Check the official platform above, or check back once reps upload PDFs here.</div>
                </div>
              ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22 }}>
                {selectedCourse.files.map((f, i) => (
                  <a key={i} href={f.link} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ background: selectedCourse.yearBg, borderRadius: 7, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <FileText size={14} color={selectedCourse.yearColor} />
                      </div>
                      <span style={{ fontSize: 13.5, color: C.text, fontWeight: 500 }}>{f.title}</span>
                    </div>
                    <Download size={14} color={C.muted} />
                  </a>
                ))}
              </div>
              )}
              {/* Admin upload instructions */}
              <div style={{ background: C.tealBg, border: `1px solid #99E6DE`, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                  <UploadCloud size={15} color={C.navy} />
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: C.navy }}>Admins: how to add a PDF to this course</span>
                </div>
                <ol style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: "#1B3A6B", lineHeight: 1.7 }}>
                  <li>Upload the PDF to the shared Google Drive folder</li>
                  <li>Set sharing to "Anyone with the link"</li>
                  <li>Copy the link and paste it into this course's <code style={{ background: "rgba(0,0,0,0.06)", padding: "1px 5px", borderRadius: 4 }}>files</code> list in <code style={{ background: "rgba(0,0,0,0.06)", padding: "1px 5px", borderRadius: 4 }}>src/App.jsx</code></li>
                  <li>Commit on GitHub — the live site updates automatically</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

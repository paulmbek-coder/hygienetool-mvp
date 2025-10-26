import { useState } from "react";

export default function Mitarbeiterschulungen() {
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("schulungen") || "[]")
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    typ: "erstbelehrung",
    sprache: "de",
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sprachoptionen = [
    { code: "de", label: "Deutsch" },
    { code: "en", label: "English" },
    { code: "tr", label: "Türkçe" },
    { code: "ar", label: "العربية" },
    { code: "pl", label: "Polski" },
    { code: "uk", label: "Українська" },
    { code: "fa", label: "فارسی" },
  ];

  // 🧠 Formular ändern
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ➕ Mitarbeiter hinzufügen
  function handleAdd(e) {
    e.preventDefault();
    const neu = {
      ...form,
      id: Date.now(),
      status: "offen",
      zertifikat: null,
      link: null,
    };
    const updated = [...employees, neu];
    setEmployees(updated);
    localStorage.setItem("schulungen", JSON.stringify(updated));
    setForm({ name: "", email: "", typ: "erstbelehrung", sprache: "de" });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  // 📤 Upload Zertifikat (lokal)
  function handleUpload(id, file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = employees.map((emp) =>
        emp.id === id ? { ...emp, zertifikat: reader.result, status: "abgeschlossen" } : emp
      );
      setEmployees(updated);
      localStorage.setItem("schulungen", JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  }

  // 🧩 Schulungslink über Backend generieren
  async function handleGenerateLink(emp) {
    try {
      setLoading(true);
      setMessage("Generiere Schulungslink ...");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/training/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emp),
      });

      const data = await res.json();
      if (data.success) {
        const updated = employees.map((e) =>
          e.id === emp.id
            ? { ...e, link: data.link, status: "link-generiert" }
            : e
        );
        setEmployees(updated);
        localStorage.setItem("schulungen", JSON.stringify(updated));

        setMessage(`✅ Link erstellt: ${data.link}`);
      } else {
        setMessage("❌ Fehler: " + data.message);
      }
    } catch (err) {
      setMessage("❌ Verbindung zum Server fehlgeschlagen");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 4000);
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="h1 text-center mb-6">👩‍🍳 Mitarbeiterschulungen</h1>

        {/* Formular */}
        <form onSubmit={handleAdd} className="card space-y-3 mb-6">
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              className="input"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="input"
              placeholder="E-Mail"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <select
              className="input"
              name="typ"
              value={form.typ}
              onChange={handleChange}
            >
              <option value="erstbelehrung">Erstbelehrung (§§ 42, 43 IfSG)</option>
              <option value="folgebelehrung">Wiederholungsschulung</option>
            </select>

            <select
              className="input"
              name="sprache"
              value={form.sprache}
              onChange={handleChange}
            >
              {sprachoptionen.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.label}
                </option>
              ))}
            </select>

            <button className="btn w-full sm:w-auto">Hinzufügen</button>
          </div>
          {saved && <p className="success text-center">✅ Mitarbeiter hinzugefügt</p>}
        </form>

        {message && (
          <div className="text-center text-sm text-gray-700 mb-4">{message}</div>
        )}

        {/* Liste */}
        {employees.length === 0 ? (
          <p className="text-gray-500 text-center">
            Noch keine Mitarbeiter eingetragen.
          </p>
        ) : (
          <div className="space-y-4">
            {employees.map((emp) => (
              <div
                key={emp.id}
                className="card flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div>
                  <p className="font-semibold">{emp.name}</p>
                  <p className="text-sm text-gray-500">{emp.email}</p>
                  <p className="text-xs text-gray-400">
                    {emp.typ === "erstbelehrung" ? "Erstbelehrung" : "Wiederholung"} •{" "}
                    {emp.sprache.toUpperCase()}
                  </p>
                  {emp.link && (
                    <a
                      href={emp.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 text-sm underline"
                    >
                      🔗 Schulungslink öffnen
                    </a>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0 items-center">
                  {emp.status === "offen" && (
                    <>
                      <button
                        className="btn-secondary text-sm"
                        onClick={() => handleGenerateLink(emp)}
                        disabled={loading}
                      >
                        {loading ? "⏳ Generiere..." : "🔗 Schulungslink generieren"}
                      </button>
                      <button className="btn text-sm">
                        💳 Bezahlen ({emp.typ === "erstbelehrung" ? "15 €" : "10 €"})
                      </button>
                    </>
                  )}
                  {emp.status === "abgeschlossen" && (
                    <a
                      href={emp.zertifikat}
                      download={`${emp.name}_Zertifikat.pdf`}
                      className="btn text-sm"
                    >
                      📄 Zertifikat herunterladen
                    </a>
                  )}
                  <label className="upload text-sm">
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      className="hidden"
                      onChange={(e) => handleUpload(emp.id, e.target.files[0])}
                    />
                    📤 Zertifikat hochladen
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

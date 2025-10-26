import { useState } from "react";

export default function Setup({ onComplete }) {
  const [form, setForm] = useState({
    wareneingang: false,
    kueche: false,
    theke: false,
    toiletten: 0,
    kuehlschraenke: 0,
    mitarbeiter: "",
    schulung: false,
  });

  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    const { name, type, checked, value } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("setup", JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    if (onComplete) onComplete();
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 p-6 fade-in">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-lg space-y-6"
      >
        <h1 className="h1 text-center">Betriebskonfiguration</h1>

        {/* Warenlieferung */}
        <div className="field-group flex items-center justify-between">
          <label className="field-label">Bekommst du Waren geliefert?</label>
          <input
            type="checkbox"
            name="wareneingang"
            checked={form.wareneingang}
            onChange={handleChange}
          />
        </div>

        {/* Küche */}
        <div className="field-group flex items-center justify-between">
          <label className="field-label">Hast du eine Küche?</label>
          <input
            type="checkbox"
            name="kueche"
            checked={form.kueche}
            onChange={handleChange}
          />
        </div>

        {/* Theke */}
        <div className="field-group flex items-center justify-between">
          <label className="field-label">Hast du eine Theke / Verkaufsbereich?</label>
          <input
            type="checkbox"
            name="theke"
            checked={form.theke}
            onChange={handleChange}
          />
        </div>

        {/* Toiletten */}
        <div className="field-group">
          <label className="field-label">Wie viele Toiletten hast du?</label>
          <input
            type="number"
            min="0"
            name="toiletten"
            className="input"
            value={form.toiletten}
            onChange={handleChange}
          />
        </div>

        {/* Kühlschränke */}
        <div className="field-group">
          <label className="field-label">Wie viele Kühlschränke hast du?</label>
          <input
            type="number"
            min="0"
            name="kuehlschraenke"
            className="input"
            value={form.kuehlschraenke}
            onChange={handleChange}
          />
        </div>

        {/* Mitarbeiter */}
        <div className="field-group">
          <label className="field-label">Mitarbeiter (kommagetrennt eingeben):</label>
          <input
            type="text"
            name="mitarbeiter"
            className="input"
            value={form.mitarbeiter}
            onChange={handleChange}
          />
        </div>

        {/* Schulung */}
        <div className="field-group flex items-center justify-between">
          <label className="field-label">Personalschulung durchführen?</label>
          <input
            type="checkbox"
            name="schulung"
            checked={form.schulung}
            onChange={handleChange}
          />
        </div>

        {/* Speichern */}
        <div className="pt-4">
          <button type="submit" className="btn w-full">
            Speichern
          </button>
          {saved && (
            <p className="success text-center mt-2">✅ Gespeichert!</p>
          )}
        </div>
      </form>
    </div>
  );
}

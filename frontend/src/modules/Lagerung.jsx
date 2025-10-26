import { useState } from "react";

export default function Lagerung() {
  const [entry, setEntry] = useState({
    datum: "",
    kuehlraum: "",
    tresen: "",
    tresen2: "",
    kuehlschrank: "",
    korrektur: "",
    pruefer: "",
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("lagerung") || "[]");
    data.push(entry);
    localStorage.setItem("lagerung", JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen p-6 flex justify-center bg-gray-50 fade-in">
      <form onSubmit={handleSubmit} className="card w-full max-w-2xl space-y-4">
        <h1 className="h1 text-center">❄️ Lagerung & Kühlraum</h1>

        <input className="input" type="date" name="datum" value={entry.datum} onChange={handleChange} />
        <input className="input" placeholder="Kühlraum °C" name="kuehlraum" value={entry.kuehlraum} onChange={handleChange} />
        <input className="input" placeholder="Kühltresen 1 °C" name="tresen" value={entry.tresen} onChange={handleChange} />
        <input className="input" placeholder="Kühltresen 2 °C" name="tresen2" value={entry.tresen2} onChange={handleChange} />
        <input className="input" placeholder="Kühlschrank °C" name="kuehlschrank" value={entry.kuehlschrank} onChange={handleChange} />
        <input className="input" placeholder="Korrekturmaßnahme" name="korrektur" value={entry.korrektur} onChange={handleChange} />
        <input className="input" placeholder="Prüfer" name="pruefer" value={entry.pruefer} onChange={handleChange} />

        <button className="btn w-full">Speichern</button>
        {saved && <p className="success text-center mt-2">✅ Gespeichert</p>}
      </form>
    </div>
  );
}

import { useState } from "react";

export default function Ausgabe() {
  const [entry, setEntry] = useState({
    datum: "",
    produkt: "",
    temperatur: "",
    korrektur: "",
    pruefer: "",
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("ausgabe") || "[]");
    data.push(entry);
    localStorage.setItem("ausgabe", JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen p-6 flex justify-center bg-gray-50 fade-in">
      <form onSubmit={handleSubmit} className="card w-full max-w-2xl space-y-4">
        <h1 className="h1 text-center">🍽️ Ausgabetemperatur</h1>

        <input className="input" type="date" name="datum" value={entry.datum} onChange={handleChange} />
        <input className="input" placeholder="Produkt / Speise" name="produkt" value={entry.produkt} onChange={handleChange} />
        <input className="input" placeholder="Ausgabetemperatur (°C)" name="temperatur" value={entry.temperatur} onChange={handleChange} />
        <input className="input" placeholder="Korrekturmaßnahme" name="korrektur" value={entry.korrektur} onChange={handleChange} />
        <input className="input" placeholder="Prüfer" name="pruefer" value={entry.pruefer} onChange={handleChange} />

        <button className="btn w-full">Speichern</button>
        {saved && <p className="success text-center mt-2">✅ Gespeichert</p>}
      </form>
    </div>
  );
}

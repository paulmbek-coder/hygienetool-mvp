import { useState } from "react";

export default function Schaedlinge() {
  const [entry, setEntry] = useState({
    datum: "",
    ort: "",
    spuren: "",
    maßnahme: "",
    firma: "",
    pruefer: "",
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("schaedlinge") || "[]");
    data.push(entry);
    localStorage.setItem("schaedlinge", JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen p-6 flex justify-center bg-gray-50 fade-in">
      <form onSubmit={handleSubmit} className="card w-full max-w-2xl space-y-4">
        <h1 className="h1 text-center">🐀 Schädlingskontrolle</h1>

        <input className="input" type="date" name="datum" value={entry.datum} onChange={handleChange} />
        <input className="input" placeholder="Ort / Bereich" name="ort" value={entry.ort} onChange={handleChange} />
        <textarea className="input" placeholder="Spuren / Beobachtungen" name="spuren" value={entry.spuren} onChange={handleChange} />
        <input className="input" placeholder="Maßnahmen" name="maßnahme" value={entry.maßnahme} onChange={handleChange} />
        <input className="input" placeholder="Beauftragte Firma (mit Anschrift)" name="firma" value={entry.firma} onChange={handleChange} />
        <input className="input" placeholder="Prüfer" name="pruefer" value={entry.pruefer} onChange={handleChange} />

        <button className="btn w-full">Speichern</button>
        {saved && <p className="success text-center mt-2">✅ Gespeichert</p>}
      </form>
    </div>
  );
}

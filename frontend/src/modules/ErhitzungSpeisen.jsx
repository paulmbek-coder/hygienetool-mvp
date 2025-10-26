import { useState } from "react";

export default function ErhitzungSpeisen() {
  const [entry, setEntry] = useState({
    datum: "",
    speise: "",
    dauer: "",
    soll: "",
    ist: "",
    aussehen: "",
    pruefer: "",
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("erhitzungSpeisen") || "[]");
    data.push(entry);
    localStorage.setItem("erhitzungSpeisen", JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setEntry({
      datum: "",
      speise: "",
      dauer: "",
      soll: "",
      ist: "",
      aussehen: "",
      pruefer: "",
    });
  }

  return (
    <div className="min-h-screen p-6 flex justify-center bg-gray-50 fade-in">
      <form onSubmit={handleSubmit} className="card w-full max-w-2xl space-y-4">
        <h1 className="h1 text-center">🔥 Erhitzung – Speisen</h1>

        <input className="input" type="date" name="datum" value={entry.datum} onChange={handleChange} />
        <input className="input" placeholder="Speise" name="speise" value={entry.speise} onChange={handleChange} />
        <input className="input" placeholder="Erhitzungsdauer (Minuten)" name="dauer" value={entry.dauer} onChange={handleChange} />
        <input className="input" placeholder="Kerntemperatur Soll (°C)" name="soll" value={entry.soll} onChange={handleChange} />
        <input className="input" placeholder="Kerntemperatur Ist (°C)" name="ist" value={entry.ist} onChange={handleChange} />
        <textarea className="input" placeholder="Aussehen im Inneren" name="aussehen" value={entry.aussehen} onChange={handleChange} />
        <input className="input" placeholder="Prüfer" name="pruefer" value={entry.pruefer} onChange={handleChange} />

        <button className="btn w-full">Speichern</button>
        {saved && <p className="success text-center mt-2">✅ Gespeichert</p>}
      </form>
    </div>
  );
}

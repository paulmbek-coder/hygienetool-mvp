import { useState } from "react";

export default function Schulung() {
  const [entry, setEntry] = useState({
    datum: "",
    teilnehmer: "",
    art: "",
    pruefer: "",
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("schulung") || "[]");
    data.push(entry);
    localStorage.setItem("schulung", JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen p-6 flex justify-center bg-gray-50 fade-in">
      <form onSubmit={handleSubmit} className="card w-full max-w-2xl space-y-4">
        <h1 className="h1 text-center">👩‍🍳 Personalschulung</h1>

        <input className="input" type="date" name="datum" value={entry.datum} onChange={handleChange} />
        <input className="input" placeholder="Teilnehmer" name="teilnehmer" value={entry.teilnehmer} onChange={handleChange} />
        <select className="input" name="art" value={entry.art} onChange={handleChange}>
          <option value="">Art der Schulung</option>
          <option value="Erstschulung">Erstschulung</option>
          <option value="Wiederholung">Wiederholungsschulung</option>
        </select>
        <input className="input" placeholder="Prüfer" name="pruefer" value={entry.pruefer} onChange={handleChange} />

        <button className="btn w-full">Speichern</button>
        {saved && <p className="success text-center mt-2">✅ Gespeichert</p>}
      </form>
    </div>
  );
}

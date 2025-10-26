import { useState } from "react";

export default function Reinigung() {
  const [entry, setEntry] = useState({
    datum: "",
    wer: "",
    mittel: "",
    desinfektion: "",
    bereiche: "",
    kontrolle: "",
    fotos: [],
  });
  const [preview, setPreview] = useState([]);
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }

  function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    const fileReaders = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEntry((prev) => ({
          ...prev,
          fotos: [...prev.fotos, reader.result],
        }));
        setPreview((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
      fileReaders.push(reader);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("reinigung") || "[]");
    data.push(entry);
    localStorage.setItem("reinigung", JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setEntry({
      datum: "",
      wer: "",
      mittel: "",
      desinfektion: "",
      bereiche: "",
      kontrolle: "",
      fotos: [],
    });
    setPreview([]);
  }

  return (
    <div className="min-h-screen p-6 flex justify-center bg-gray-50 fade-in">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-2xl space-y-4"
      >
        <h1 className="h1 text-center">🧽 Reinigung & Desinfektion</h1>

        <input className="input" type="date" name="datum" value={entry.datum} onChange={handleChange} />
        <input className="input" placeholder="Wer?" name="wer" value={entry.wer} onChange={handleChange} />
        <input className="input" placeholder="Reinigungsmittel (Fabrikat)" name="mittel" value={entry.mittel} onChange={handleChange} />
        <input className="input" placeholder="Desinfektionsmittel (Fabrikat)" name="desinfektion" value={entry.desinfektion} onChange={handleChange} />
        <textarea className="input" placeholder="Bereiche / Geräte / Flächen" name="bereiche" value={entry.bereiche} onChange={handleChange} />
        <input className="input" placeholder="Kontrolle" name="kontrolle" value={entry.kontrolle} onChange={handleChange} />

        {/* Foto-Upload */}
        <div>
          <label className="field-label">Fotos (optional)</label>
          <label className="upload block cursor-pointer">
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
            📸 Foto(s) hochladen
          </label>

          {preview.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {preview.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="upload"
                  className="rounded-xl border object-cover w-full h-24"
                />
              ))}
            </div>
          )}
        </div>

        <button className="btn w-full mt-4">Speichern</button>
        {saved && <p className="success text-center mt-2">✅ Gespeichert</p>}
      </form>
    </div>
  );
}

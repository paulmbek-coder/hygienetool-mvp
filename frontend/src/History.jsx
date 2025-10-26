import { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function History() {
  const [data, setData] = useState({});

  useEffect(() => {
    const modules = [
      "wareneingang",
      "lagerung",
      "erhitzungSpeisen",
      "erhitzungProdukte",
      "ausgabe",
      "reinigung",
      "schaedlinge",
      "schulung",
    ];
    const result = {};
    modules.forEach((mod) => {
      const entries = JSON.parse(localStorage.getItem(mod) || "[]");
      // Filter: letzte 14 Tage
      const recent = entries.filter((e) => {
        const d = new Date(e.datum);
        const now = new Date();
        const diff = (now - d) / (1000 * 60 * 60 * 24);
        return diff <= 14;
      });
      if (recent.length > 0) result[mod] = recent;
    });
    setData(result);
  }, []);

  function exportPDF() {
    const doc = new jsPDF();
    let y = 15;
    doc.setFont("helvetica", "bold");
    doc.text("Hygiene-Dokumentation (letzte 2 Wochen)", 10, y);
    y += 10;

    Object.entries(data).forEach(([mod, entries]) => {
      doc.setFont("helvetica", "bold");
      doc.text(mod.toUpperCase(), 10, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      entries.forEach((e, i) => {
        const text = Object.entries(e)
          .map(([k, v]) => `${k}: ${v}`)
          .join(" | ");
        doc.text(`• ${text}`, 10, y);
        y += 6;
        if (y > 280) {
          doc.addPage();
          y = 15;
        }
      });
      y += 8;
    });

    doc.save("Hygiene-Historie.pdf");
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 fade-in">
      <div className="max-w-5xl mx-auto">
        <h1 className="h1 text-center mb-4">📋 Historie (letzte 14 Tage)</h1>

        {Object.keys(data).length === 0 && (
          <p className="text-center text-gray-500">Keine Daten vorhanden</p>
        )}

        {Object.entries(data).map(([mod, entries]) => (
          <div key={mod} className="card mb-6">
            <h2 className="h2 mb-2">{mod.toUpperCase()}</h2>
            <table className="table">
              <thead>
                <tr>
                  {Object.keys(entries[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries.map((e, i) => (
                  <tr key={i}>
                    {Object.values(e).map((v, j) => (
                      <td key={j}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {Object.keys(data).length > 0 && (
          <div className="text-center mt-6">
            <button onClick={exportPDF} className="btn">
              📄 PDF exportieren
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


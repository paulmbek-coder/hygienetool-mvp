import { Link } from "react-router-dom";

export default function Dashboard() {
  const modules = [
    { name: "Wareneingang", path: "/wareneingang", emoji: "📦", desc: "Eingangskontrolle von Lieferungen" },
    { name: "Lagerung", path: "/lagerung", emoji: "❄️", desc: "Temperatur- & Lagerüberwachung" },
    { name: "Erhitzung (Speisen)", path: "/erhitzung-speisen", emoji: "🔥", desc: "Kerntemperaturkontrolle bei Speisen" },
    { name: "Erhitzung (Produkte)", path: "/erhitzung-produkte", emoji: "🌡️", desc: "Temperaturprüfung bei Produkten" },
    { name: "Ausgabe", path: "/ausgabe", emoji: "🍽️", desc: "Ausgabetemperaturkontrolle" },
    { name: "Reinigung", path: "/reinigung", emoji: "🧽", desc: "Reinigungs- & Desinfektionsnachweise" },
    { name: "Schädlingskontrolle", path: "/schaedlinge", emoji: "🐀", desc: "Dokumentation von Sichtkontrollen" },
    { name: "Personalschulung", path: "/schulung", emoji: "👩‍🍳", desc: "Erst- & Wiederholungsschulungen" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 fade-in">
      <div className="max-w-6xl mx-auto">
        <h1 className="h1 mb-6 text-center">📊 Dashboard – Übersicht</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <Link
              to={m.path}
              key={m.name}
              className="card hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-3">{m.emoji}</div>
              <h2 className="h2">{m.name}</h2>
              <p className="text-gray-500 text-sm">{m.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

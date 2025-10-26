import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

// Seiten / Module
import Dashboard from "./Dashboard";
import Setup from "./setup";
import Wareneingang from "./modules/Wareneingang";
import Lagerung from "./modules/Lagerung";
import ErhitzungSpeisen from "./modules/ErhitzungSpeisen";
import ErhitzungProdukte from "./modules/ErhitzungProdukte";
import Ausgabe from "./modules/Ausgabe";
import Reinigung from "./modules/Reinigung";
import Schaedlinge from "./modules/Schaedlinge";
import Schulung from "./modules/Schulung";
import Mitarbeiterschulungen from "./modules/Mitarbeiterschulungen";
import History from "./History";

export default function App() {
  // ganz simples Login (lokal)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [creds, setCreds] = useState({ user: "", pw: "" });
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (creds.user === "beispiel" && creds.pw === "123") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("❌ Falscher Nutzername oder Passwort");
    }
  }

  // Nicht eingeloggt -> Login-Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 fade-in">
        <form
          onSubmit={handleLogin}
          className="card w-80 space-y-4 text-center"
        >
          <h1 className="h1 text-center">🍏 HygieneTool Login</h1>

          <input
            className="input"
            placeholder="Nutzername"
            value={creds.user}
            onChange={(e) => setCreds({ ...creds, user: e.target.value })}
          />

          <input
            className="input"
            placeholder="Passwort"
            type="password"
            value={creds.pw}
            onChange={(e) => setCreds({ ...creds, pw: e.target.value })}
          />

          <button className="btn w-full">Anmelden</button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    );
  }

  // Eingeloggt -> App mit Navbar, Routing etc.
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 gap-4 sm:gap-0">

          {/* Logo / Brand */}
          <Link
            to="/dashboard"
            className="font-bold text-lg hover:text-blue-600 transition"
          >
            🍏 HygieneTool
          </Link>

          {/* Links */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-700">
            <Link to="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/history" className="hover:text-blue-600">
              Historie
            </Link>
            <Link to="/setup" className="hover:text-blue-600">
              Setup
            </Link>
            <Link to="/schulungen" className="hover:text-blue-600">
              Schulungen
            </Link>

            <button
              onClick={() => setIsLoggedIn(false)}
              className="btn-secondary text-sm"
            >
              Abmelden
            </button>
          </div>
        </div>
      </nav>

      {/* INHALT */}
      <main className="flex-grow">
        <Routes>
          {/* Default-Weiterleitung auf Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Dashboard + Setup */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setup" element={<Setup />} />

          {/* Module */}
          <Route path="/wareneingang" element={<Wareneingang />} />
          <Route path="/lagerung" element={<Lagerung />} />
          <Route path="/erhitzung-speisen" element={<ErhitzungSpeisen />} />
          <Route path="/erhitzung-produkte" element={<ErhitzungProdukte />} />
          <Route path="/ausgabe" element={<Ausgabe />} />
          <Route path="/reinigung" element={<Reinigung />} />
          <Route path="/schaedlinge" element={<Schaedlinge />} />
          <Route path="/schulung" element={<Schulung />} />

          {/* Schulungen-Verwaltung (Admin-Sicht) */}
          <Route path="/schulungen" element={<Mitarbeiterschulungen />} />

          {/* Historie / PDF */}
          <Route path="/history" element={<History />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-500 py-4 border-t bg-white/50">
        © {new Date().getFullYear()} HygieneTool – Clean. Simple. Compliant.
      </footer>

    </div>
  );
}

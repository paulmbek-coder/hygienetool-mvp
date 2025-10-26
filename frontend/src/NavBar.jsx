import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar({ onLogout }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/setup", label: "🏠 Setup" },
    { to: "/wareneingang", label: "📦 Wareneingang" },
    { to: "/lagerung", label: "❄️ Lagerung" },
    { to: "/history", label: "📋 Historie" },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Titel (Link zur Startseite) */}
        <Link to="/setup" className="font-bold text-lg hover:text-blue-200">
          HygieneTool
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`transition ${
                location.pathname === l.to
                  ? "font-semibold underline underline-offset-4"
                  : "hover:text-blue-200"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={onLogout}
            className="bg-blue-800 px-3 py-1 rounded hover:bg-blue-900 transition"
          >
            🚪 Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden bg-blue-700 p-2 rounded text-xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-blue-700 p-3 flex flex-col gap-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block py-1 ${
                location.pathname === l.to
                  ? "font-semibold underline underline-offset-2"
                  : "hover:text-blue-200"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="bg-blue-800 px-3 py-1 rounded hover:bg-blue-900 mt-2"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </nav>
  );
}

import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/login", {
        username,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("loggedIn", true);
        window.location.reload();
      }
    } catch {
      setError("Falsche Zugangsdaten");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <input className="w-full p-2 mb-3 border rounded" placeholder="Nutzername"
               value={username} onChange={e => setUsername(e.target.value)} />
        <input className="w-full p-2 mb-3 border rounded" placeholder="Passwort" type="password"
               value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Anmelden
        </button>
      </form>
    </div>
  );
}

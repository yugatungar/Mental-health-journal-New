import './Register.css';  
import API from "./config";

import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await axios.post(`${API}/register`, { email, password });
    alert("Registered! Now login.");
    window.location.href = "/";
  };

  return (
        <div className="register-container">
        <div className="register-card">
          <h2>Register</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={register}>Register</button>
        </div>
      </div>
  );
}

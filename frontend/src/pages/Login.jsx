import { useState } from "react";
import { backendUrl } from "../api";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import "./Login.scss";
import { silentRefreshLoop } from "../utils/tokens.js";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loginUser = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage("email and password must be defined");
      return;
    }

    // const emailAndPasswordBase64 = btoa(`${email}:${password}`); // raus für refreshToken
    //const authorization = `Basic ${emailAndPasswordBase64}`; // hier raus für refreshToken und eingefügt unten in fetch

    fetch(backendUrl + "/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then(({ success, result, message }) => {
        if (!success) return setErrorMessage(message || "❌  Login failed");
        // result.tokens.refreshToken
        const authorization = `Basic ${result.tokens.accessToken}`; // neu für refreshToken
        onLoginSuccess(authorization, result.user); // neu refreshToken: .user // result sind die profile infos

        // neu für refreshToken
        silentRefreshLoop(
          result.tokens.accessToken,
          result.tokens.refreshToken,
          function onSilentRefreshDoneCallback(newAccessToken) {
            const authorization = `Bearer ${newAccessToken}`;
            onLoginSuccess(authorization, result.user); // update authorization state
          }
        );

        setErrorMessage(""); // reset error message after success
        setSuccessMessage("✅  Login successful!");
      });
  };

  return (
    <>
      <Nav />
      <section className="content-wrapper">
        <h2>Login</h2>
        <form className="login-card">
          {/* E-Mail */}
          <div className="login-data-container">
            <label htmlFor="email">E-Mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="login-data-container">
            <label htmlFor="password">Passwort:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button Login */}
          <button onClick={loginUser} className="btn">
            login
          </button>
        </form>

        <p className="login-message-style login-message-error">
          {errorMessage}
        </p>

        <p className="login-message-style login-message-success">
          {successMessage ? (
            successMessage
          ) : (
            <Link to="/register" className="btn btn-register">
              Registrieren
            </Link>
          )}
        </p>
      </section>
    </>
  );
};

export default Login;

import { useState } from "react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage("Alle Felder müssen ausgefüllt werden");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Fehler bei Passwortwiederholung! Bitte Eingabe prüfen.");
      return;
    }

    fetch(backendUrl + "/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then(({ success, result, message }) => {
        if (!success)
          return setErrorMessage(message || "Registrierung fehlgeschlagen");
        console.log("hier: ", result);

        setErrorMessage("");
        navigate("/verify-email/" + result._id);
      });
  };

  return (
    <>
      <Nav />
      <section className="content-wrapper">
        <h2>Registrierung</h2>
        <form className="register-card">
          {/* Name */}
          <div className="register-data-container">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Vorname Nachname"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* E-Mail */}
          <div className="register-data-container">
            <label htmlFor="email">E-Mail:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-Mail-Adresse"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Passwort */}
          <div className="register-data-container">
            <label htmlFor="password">Passwort:</label>
            <input
              type="password"
              name="password"
              id="passwordConfirmation"
              placeholder="Passwort (min. 4 Zeichen)"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Passwort Wiederholung */}
          <div className="register-data-container">
            <label htmlFor="password">Passwort wiederholen:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Passwort (min. 4 Zeichen)"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Boat license */}
          <div className="register-data-container">
            <p>Bootsführerschein vorhanden?</p>
            <input
              type="checkbox"
              name="boatLicense"
              id="boatLicenseTrue"
              value={true}
            />
            <label htmlFor="boatLicenseTrue">ja</label>
            <input
              type="checkbox"
              name="boatLicenseFalse"
              id="boatLicenseFalsev"
              value={false}
            />
            <label htmlFor="boatLicenseFalse">nein</label>
          </div>

          {/* Profilbild */}
          <div className="register-data-container">
            <label htmlFor="profilePicture">Profilbild</label>
            <input type="file" name="profilePicture" id="profilePicture" />
          </div>

          <div className="register-data-container">
            <button className="btn" onClick={registerUser}>
              konto anlegen
            </button>
          </div>
        </form>

        <p>{errorMessage}</p>
      </section>
    </>
  );
};

export default Register;

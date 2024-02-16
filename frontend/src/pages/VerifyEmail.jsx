import { useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../api";

const VerifyEmail = () => {
  const [sixDigitCode, setSixDigitCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { userId } = useParams();

  async function verifyEmail(even) {
    event.preventDefault();
    if (!sixDigitCode) {
      setErrorMessage(
        "Bitte gib deinen 6-stelligen Code ein, den du in einer separaten Bestätigungs-Mail bekommen hast"
      );
      return;
    }

    fetch(backendUrl + "/api/users/verifyEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, sixDigitCode }),
    })
      .then((res) => res.json())
      .then(({ success, result, message }) => {
        if (!success)
          return setErrorMessage(message || "E-Mail verification failed");
        console.log({ result });
        setErrorMessage("");
        setSuccessMessage(
          "Die Verifizierung deines Kontos war erfolgreich! Du kanns dich jetzt einloggen."
        );
      });
  }

  async function resendEmail() {
    fetch(backendUrl + "/api/users/resendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then(({ success, message }) => {
        if (!success) return setErrorMessage(message || "Resend email failed");
        setErrorMessage(
          "Die Verifizierungs-E-Mail mit dem 6-stelligen Code wurde dir erneut zugesandt. Bitte prüfe dein E-Mail-Posteingang."
        );
      });
  }

  return (
    <>
      <section className="content-wrapper">
        <h2>E-Mail Verifizierung</h2>
        <p style={{ textAlign: "center" }}>
          Fast geschafft! Dein Nutzerkonto wurde erfolgreich erstellt.
        </p>
        <p>
          Bitte gib als letzten Schritt noch den 6-stelligen Code aus deiner
          Bestätigungs-Mail ein.
        </p>

        <form>
          <div>
            <label htmlFor="sixDigitCode">
              6-stelligen Code hier eingeben:
            </label>
            <input
              type="text"
              id="sixDigitCode"
              value={sixDigitCode}
              onChange={(e) => setSixDigitCode(e.target.value)}
            />
          </div>

          <button className="btn" onClick={verifyEmail}>
            registrierung abschließen
          </button>

          {/* Error Message */}
          <p>{errorMessage}</p>
          {/* Success Message */}
          <p>{successMessage}</p>
        </form>

        <button className="btn" onClick={resendEmail}>
          neuen coden anfordern
        </button>
      </section>
    </>
  );
};

export default VerifyEmail;

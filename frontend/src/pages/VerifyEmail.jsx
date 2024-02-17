import { useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../api";
import Nav from "../components/Nav";
import "./VerifyEmail.scss";

const VerifyEmail = () => {
  const [sixDigitCode, setSixDigitCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { userId } = useParams();

  async function verifyEmail(event) {
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
        // console.log({ result });

        setErrorMessage("");
        setSuccessMessage(
          "Die Verifizierung deines Kontos war erfolgreich! Du kanns dich jetzt einloggen."
        );
        setTimeout(() => {
          Navigate("/");
        }, 5000);
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
      <Nav />
      <section className="content-wrapper">
        <h2>Land in Sicht, Matrose!</h2>
        <article className="verify-email-container">
          <p className="verify-email-text">
            Dein Nutzerkonto wurde erfolgreich erstellt.
          </p>
          <p className="verify-email-text">
            Bitte gib als letzten Schritt noch den
            <span className="bold"> 6-stelligen Code</span> aus deiner
            Bestätigungs-Mail ein.
          </p>

          <form>
            <input
              type="text"
              id="sixDigitCode"
              maxLength={6}
              value={sixDigitCode}
              onChange={(e) => setSixDigitCode(e.target.value)}
            />

            <button className="btn" onClick={verifyEmail}>
              registrierung abschließen
            </button>

            {/* Error Message */}
            <p>{errorMessage}</p>
            {/* Success Message */}
            <p>{successMessage}</p>
          </form>

          <div className="resend-mail-container">
            <p>
              <span className="bold">
                Probleme?
                <br />
              </span>{" "}
              Fordere hier einen neuen Code an:
            </p>
            <button className="btn" onClick={resendEmail}>
              code erneut anfordern
            </button>
          </div>
        </article>
      </section>
    </>
  );
};

export default VerifyEmail;

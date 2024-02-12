import Nav from "../components/Nav";

const register = () => {
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
            />
          </div>

          {/* Passwort */}
          <div className="register-data-container">
            <label htmlFor="password">Passwort:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Passwort (min. 4 Zeichen)"
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
            />
          </div>

          {/* Boat license */}
          <div className="register-data-container">
            <p>Bootsführerschein vorhanden?</p>
            <input
              type="checkbox"
              name="boatLicenseTrue"
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
        </form>
      </section>
    </>
  );
};

export default register;

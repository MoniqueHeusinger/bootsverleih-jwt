import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import Nav from "../components/Nav";
import "./Home.scss";
import LoginComponent from "../components/LoginComponent";

const Home = ({ authorization, onLogout }) => {
  return (
    <>
      <Nav />
      <section className="content-wrapper">
        <h2>Willkommen</h2>
        <section className="welcome-container">
          <article className="welcome-text">
            <p>
              Du bist auf der Suche nach einem unvergesslichen Abenteuer? <br />
              <span>Dann bist du bei uns genau richtig!</span>
            </p>
            <p>
              Wähle aus unserem Boot-Pool deinen Favoriten aus und reserviere es
              für deine nächste Reise.
            </p>
            <p>
              Du besitzt bereits ein Boot und möchtest an unserem Boot-Sharing
              teilnehmen? <br /> Dann lade dein Boot einfach in unsere Datenbank
              hoch und schon kannst du es über unsere Seite vermieten.
            </p>
            <p>Worauf wartest du noch?</p>
            <Link to="/boatlist" className="btn btn-no-login">
              weiter ohne login
            </Link>
          </article>
          <article className="login-container">
            <LoginComponent />
          </article>
        </section>
      </section>
    </>
  );
};

export default Home;

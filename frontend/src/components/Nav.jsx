import "./Nav.scss";
import dashboardIcon from "./../assets/img/icons/icon-compass-white.png";
import userIcon from "./../assets/img/icons/icon-captain.png";
import bootIcon from "./../assets/img/icons/icon-boat-white.png";
import reservierungIcon from "./../assets/img/icons/icon-calender-white.png";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <section className="nav">
        <nav>
          {/* Home - Dashboard */}
          <NavLink to="/" className="nav-link-dashboard tooltip">
            <img src={dashboardIcon} alt="Dashboard" />
            <span className="tooltip-text-small">Dashboard</span>
          </NavLink>

          <div className="nav-container-middle">
            {/* User Login */}
            <NavLink to="/login" className="tooltip">
              <img src={userIcon} alt="user login" />
              <span className="tooltip-text">Login</span>
            </NavLink>

            {/* Übersicht alle Boote */}
            <NavLink to="/boatlist" className="tooltip">
              <img src={bootIcon} alt="Boote" />
              <span className="tooltip-text">Boote</span>
            </NavLink>

            {/* Übersicht alle Reservierungen */}
            <NavLink to="/reservierungen" className="tooltip">
              <img src={reservierungIcon} alt="Reservierungen" />
              <span className="tooltip-text-small">Reservieren</span>
            </NavLink>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Nav;

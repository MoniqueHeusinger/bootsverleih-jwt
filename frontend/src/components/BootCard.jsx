import { Link } from "react-router-dom";
import "./BootCardNew.scss";
import { backendUrl } from "../api";
import deleteIcon from "../assets/img/icons/icon-trash-white.png";
import calenderIcon from "../assets/img/icons/icon-calender-white.png";

// neu BasicAuth
const BootCard = (props, { authorization, userProfileInfo }) => {
  const deleteBoat = () => {
    fetch(`${backendUrl}/api/boote/${props._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(({ success }) => console.log(success))
      .catch((err) => console.log(err));
    window.location.reload();
  };
  return (
    <article className="boat-card">
      {/* Bild vom Boot */}
      <Link to={`/boat-detail/${props._id}`}>
        <img src={props.bildUrl} alt="boot" onError={props.errFunc} />
      </Link>

      {/* Container für Boot-Daten (Name, Typ, Bj) */}
      <Link to={`/boat-detail/${props._id}`}>
        <div className="card-text-container">
          <p className="boot-name">{props.name}</p>
          <p className="boot-typ">{props.bootsart}</p>
          <p className="baujahr">(Baujahr: {props.baujahr})</p>
        </div>
      </Link>
      {/* Container für Action-Buttons (reservieren, login...) */}
      <div className="action-container">
        <Link className="btn btn-icon" to={`/add-reservierung/${props._id}`}>
          {/* reservieren */}
          <img src={calenderIcon} alt="reservieren" />
        </Link>
        {!authorization ? (
          <Link to="/login" className="btn btn-icon">
            {/* Login zum Löschen */}
            <img src={deleteIcon} alt="löschen" />
          </Link>
        ) : (
          <a className="btn btn-icon" onClick={deleteBoat}>
            <img src={deleteIcon} alt="löschen" />
            {/* Boot löschen */}
          </a>
        )}
      </div>
    </article>
  );
};

export default BootCard;

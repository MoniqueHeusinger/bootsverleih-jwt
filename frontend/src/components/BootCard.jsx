import { Link } from "react-router-dom";
import "./BootCardNew.scss";
import { backendUrl } from "../api";

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
      <Link to={`/boat-detail/${props._id}`}>
        <img src={props.bildUrl} alt="boot" onError={props.errFunc} />
      </Link>
      <div className="card-text-container">
        <p className="boot-name">{props.name}</p>
        <p className="boot-typ">{props.bootsart}</p>
        <p className="baujahr">(Baujahr: {props.baujahr})</p>
        <Link className="btn" to={`/add-reservierung/${props._id}`}>
          reservieren
        </Link>
        {!authorization ? (
          <Link to="/login" className="btn">
            Login zum Löschen
          </Link>
        ) : (
          <a className="btn" onClick={deleteBoat}>
            Boot löschen
          </a>
        )}
      </div>
    </article>
  );
};

export default BootCard;

import "./ReservierungsCard.scss";
import deleteIcon from "./../assets/img/icons/icon-trash-white.png";
import { backendUrl } from "../api";

const ReservierungsCard = ({ boot }) => {
  const reservierung = {
    istReserviert: false,
    startdatum: "",
    enddatum: "",
    reservierungsnummer: null,
  };
  const start = new Date(boot.reservierung.startdatum);
  const end = new Date(boot.reservierung.enddatum);
  const deleteReservierung = () => {
    fetch(`${backendUrl}/api/boote/edit/${boot._id}`, {
      method: "PATCH",
      body: JSON.stringify({ reservierung }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ success }) => console.log(success))
      .catch((err) => console.log(err));
    window.location.reload();
  };

  return (
    <>
      <article className="reservierungen-card">
        <p>{boot.reservierung.reservierungsnummer}</p>
        <p>{boot.name}</p>
        <p>
          Reserviert von: {start.getDate()}.{start.getMonth() + 1}.
          {start.getFullYear()} bis: {end.getDate()}.{end.getMonth() + 1}.
          {end.getFullYear()}
        </p>
        {/* ===== Fix me ===== */}
        {/* Hier muss noch die Lösch-Funktion eingebaut werden */}
        <img src={deleteIcon} alt="löschen" onClick={deleteReservierung} />
      </article>
    </>
  );
};

export default ReservierungsCard;

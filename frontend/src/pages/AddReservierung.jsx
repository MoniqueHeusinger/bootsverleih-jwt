import { useEffect, useState } from "react";
import { backendUrl } from "../api";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import "./AddReservierung.scss";

const AddReservierung = () => {
  const [boot, setBoot] = useState([]);
  const [startdatum, setStartDatum] = useState("");
  const [enddatum, setEndDatum] = useState("");

  const params = useParams();
  const id = params.bootId;
  useEffect(() => {
    fetch(`${backendUrl}/api/boote`)
      .then((res) => res.json())
      .then((data) => {
        const filteredBoot = data.result.filter(
          (singleBoot) => singleBoot._id === id
        );
        setBoot(filteredBoot);
      });
  }, []);

  const changeReservierung = () => {
    fetch(`${backendUrl}/api/boote/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ startdatum, enddatum }),
    })
      .then((res) => res.json())
      .then(({ success, result, error, message }) => {
        console.log({ success, result, error, message });
      })
      .catch((err) => console.log(err));
  };

  // console.log(boot);
  console.log(enddatum);
  console.log(startdatum);
  return (
    <>
      <Nav />
      <section className="content-wrapper">
        <form>
          <h2>Reservierung für das Boot {boot[0]?.name}:</h2>
          <div>
            <label htmlFor="start">Startdatum auswählen</label>
            <input
              type="date"
              name="start"
              id="start"
              onChange={(e) => setStartDatum(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="end">Enddatum auswählen</label>
            <input
              type="date"
              name="end"
              id="end"
              onChange={(e) => setEndDatum(e.target.value)}
            />
          </div>
          <input
            type="button"
            value="add Reservierung"
            className="btn"
            onClick={changeReservierung}
          />
        </form>
      </section>
    </>
  );
};

export default AddReservierung;

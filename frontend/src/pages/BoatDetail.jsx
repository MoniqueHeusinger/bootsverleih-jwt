import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../api";
import Nav from "../components/Nav";
import bootfb from "../assets/img/bootfb.jpeg";
import "./BootDetail.scss";

const BoatDetail = () => {
  const navigate = useNavigate();
  const [boot, setBoot] = useState([]);
  const params = useParams();
  const id = params.bootId;
  // ---- States für Edit-Boot-Form:
  const [name, setName] = useState("");
  const [baujahr, setBaujahr] = useState("");
  const [serienNr, setSerienNr] = useState("");
  const [material, setMaterial] = useState([]);
  const [singleMaterial, setSingleMaterial] = useState("");
  const [bootsart, setBootsart] = useState("");
  const [bildUrl, setBildUrl] = useState(null);
  //   const [reservierung, setReservierung] = useState({});
  const [startdatum, setStartDatum] = useState("");
  const [enddatum, setEndDatum] = useState("");

  const [editBoot, setEditBoot] = useState(false);

  //   ---- getBoote-Fetch mit Filter für richtiges Boot:
  useEffect(() => {
    fetch(`${backendUrl}/api/boote`)
      .then((res) => res.json())
      .then((data) => {
        const filteredBoot = data.result.filter(
          (singleBoot) => singleBoot._id === id
        );
        setBoot(filteredBoot);
        // setName(boot[0]?.name);
        // setBaujahr(boot[0]?.baujahr);
        // setSerienNr(boot[0]?.serienNr);
        // setMaterial(boot[0]?.material);
        // setBootsart(boot[0]?.bootsart);
        // setBildUrl(boot[0]?.bildUrl);
        // // setReservierung(boot[0]?.reservierung);
        // setStartDatum(boot[0]?.reservierung.startdatum);
        // setEndDatum(boot[0]?.reservierung.enddatum);
      });
  }, []);
  console.log(boot);

  const editBootFunc = () => {
    setEditBoot(!editBoot);
    setName(boot[0]?.name);
    setBaujahr(boot[0]?.baujahr);
    setSerienNr(boot[0]?.serienNr);
    setMaterial(boot[0]?.material);
    setBootsart(boot[0]?.bootsart);
    setBildUrl(boot[0]?.bildUrl);
  };
  console.log("bootsname: ", name);
  //   console.log(name);

  const addMaterial = (e) => {
    e.preventDefault();
    setMaterial((prevMaterial) => [...prevMaterial, singleMaterial]);
    setSingleMaterial("");
  };

  const postEdit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", bildUrl, bildUrl.filename);

    fetch(`${backendUrl}/api/files/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ success, result, error, message }) => {
        if (success) return result.filename;
        else {
          console.log({ message });
          throw error; // jump to catch
        }
      })
      .then((uploadedFilename) =>
        fetch(`${backendUrl}/api/boote/edit/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            name,
            baujahr,
            serienNr,
            material,
            bootsart,
            bildUrl: uploadedFilename,
          }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then(({ success, result, error, message }) => {
            console.log({ success, result, error, message });
            // setEditBoot(false);
          })
          .catch((error) => console.log(error))
      );
  };

  const backToDetails = () => {
    navigate(`/boat-detail/${id}`);
  };

  return (
    <>
      <Nav />
      <section className="content-wrapper">
        {boot && editBoot ? (
          <form>
            <h2>Boot bearbeiten: </h2>
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                name=""
                id=""
                value={baujahr}
                onChange={(e) => setBaujahr(Number(e.target.value))}
              />
              <input
                type="number"
                value={serienNr}
                onChange={(e) => setSerienNr(Number(e.target.value))}
              />

              <div>
                {material?.map((mat, index) => (
                  <li key={index}>{mat}</li>
                ))}
                <label htmlFor="materialien">
                  Du kannst mit dem "+" button mehrere Materialien hinzufügen
                </label>
                <input
                  type="text"
                  name="materialien"
                  id="materialien"
                  placeholder="Materialien.."
                  value={singleMaterial}
                  onChange={(e) => setSingleMaterial(e.target.value)}
                />
                <button onClick={addMaterial}>+</button>
              </div>
              <input
                type="text"
                name=""
                id=""
                placeholder="Bootsart..."
                value={bootsart}
                onChange={(e) => setBootsart(e.target.value)}
              />
              <input
                type="file"
                name=""
                id=""
                placeholder="Bootsbild..."
                onChange={(e) => setBildUrl(e.target.files[0])}
              />
            </div>

            <button className="btn" onClick={postEdit}>
              Änderungen posten
            </button>
            <button className="btn" onClick={backToDetails}>
              Zurück zur Detailansicht
            </button>
          </form>
        ) : (
          <section className="bootDetails-wrapper">
            {boot &&
              boot.map((singleBoat, index) => (
                <article key={index}>
                  <img
                    src={
                      singleBoat.bildUrl
                        ? `${backendUrl}/download/${singleBoat.bildUrl}`
                        : bootfb
                    }
                    alt="boot"
                  />
                  <div>
                    <h2>{singleBoat.name}</h2>
                    <p>Baujahr: {singleBoat.baujahr}</p>
                    <p>SerienNr: {singleBoat.serienNr}</p>
                    <h3>Materialien:</h3>
                    {singleBoat.material.map((singleMaterial) => (
                      <p>{singleMaterial}</p>
                    ))}
                    <h4>Bootstyp: {singleBoat.bootsart}</h4>
                  </div>

                  {singleBoat.reservierung.istReserviert ? (
                    <div>
                      <p>Bestehende Reservierung:</p>
                      <p>
                        {" "}
                        Von:{" "}
                        {new Date(singleBoat.reservierung.startdatum).getDate()}
                        .
                        {new Date(
                          singleBoat.reservierung.startdatum
                        ).getMonth() + 1}
                        .
                        {new Date(
                          singleBoat.reservierung.startdatum
                        ).getFullYear()}
                      </p>
                      <p>
                        {" "}
                        bis:{" "}
                        {new Date(singleBoat.reservierung.enddatum).getDate()}.
                        {new Date(singleBoat.reservierung.enddatum).getMonth() +
                          1}
                        .
                        {new Date(
                          singleBoat.reservierung.enddatum
                        ).getFullYear()}
                      </p>
                    </div>
                  ) : null}
                  <button className="btn" onClick={editBootFunc}>
                    Boot Infos bearbeiten
                  </button>
                </article>
              ))}
          </section>
        )}
      </section>
    </>
  );
};

export default BoatDetail;

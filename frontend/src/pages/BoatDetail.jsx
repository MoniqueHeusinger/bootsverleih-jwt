import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../api";
import Nav from "../components/Nav";
import bootfb from "../assets/img/bootfb.jpeg";
import imgDummy from "../assets/img/icons/img-dummy.png";
import "./BootDetail.scss";

const BoatDetail = () => {
  const navigate = useNavigate();

  const [boot, setBoot] = useState([]);
  const params = useParams();
  const id = params.bootId;
  console.log("id: ", id);
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
    //  if boat image is set
    if (bildUrl !== null) {
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
    }

    // no boat image set
    fetch(`${backendUrl}/api/boote/edit/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        baujahr,
        serienNr,
        material,
        bootsart,
        // bildUrl: uploadedFilename,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ success, result, error, message }) => {
        console.log({ success, result, error, message });
        // setEditBoot(false);
      })
      .catch((error) => console.log(error));
  };

  const backToDetails = () => {
    setEditBoot(false);
    navigate(`/boat-detail/${id}`);
  };

  return (
    <>
      <Nav />
      <section className="content-wrapper">
        {boot && editBoot ? (
          <section className="boat-details-wrapper">
            <h2>Boot bearbeiten: </h2>
            <article className="boat-details-grid">
              <div className="boat-img-edit">
                <div>
                  <img src={imgDummy} alt="" />
                </div>

                <input
                  type="file"
                  name=""
                  id=""
                  placeholder="Bootsbild..."
                  onChange={(e) => setBildUrl(e.target.files[0])}
                />
              </div>
              <div className="boat-data-edit-container">
                <form>
                  <div className="edit-data">
                    <label htmlFor="name">Bootname:</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="edit-data">
                    <label htmlFor="baujahr">Bj.:</label>
                    <input
                      type="number"
                      name="baujahr"
                      id=""
                      value={baujahr}
                      onChange={(e) => setBaujahr(Number(e.target.value))}
                    />
                  </div>

                  <div className="edit-data">
                    <label htmlFor="serialNumber">Seriennr.:</label>
                    <input
                      type="number"
                      name="serialNumber"
                      value={serienNr}
                      onChange={(e) => setSerienNr(Number(e.target.value))}
                    />
                  </div>

                  <div className="edit-material">
                    <h4>Material:</h4>
                    <ul>
                      {material?.map((mat, index) => (
                        <li key={index}>{mat}</li>
                      ))}
                    </ul>

                    <label htmlFor="materialien">
                      Du kannst mit dem "+" Button <br />
                      neue Materialien hinzufügen
                    </label>
                    <div className="add-material">
                      <input
                        type="text"
                        name="materialien"
                        id="materialien"
                        placeholder="z.B. Holz"
                        value={singleMaterial}
                        onChange={(e) => setSingleMaterial(e.target.value)}
                      />
                      <button className="btn" onClick={addMaterial}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="edit-data">
                    <label htmlFor="boatType">Typ:</label>
                    <input
                      type="text"
                      name="boatType"
                      id=""
                      placeholder="Bootsart..."
                      value={bootsart}
                      onChange={(e) => setBootsart(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              {/* <Link
                className="btn btn-back-to-details-page"
                to={`/boat-detail/${id}`}
              >
                Zurück zur Detailansicht
              </Link> */}
              <button
                className="btn btn-back-to-details-page"
                onClick={backToDetails}
              >
                Zurück zur Detailansicht
              </button>
              <button className="btn btn-post-changes" onClick={postEdit}>
                Änderungen posten
              </button>
            </article>
          </section>
        ) : (
          <section className="boat-details-wrapper">
            {boot &&
              boot.map((singleBoat, index) => (
                <article className="boat-details-grid" key={index}>
                  <div className="boat-img">
                    <img
                      src={
                        singleBoat.bildUrl
                          ? `${backendUrl}/download/${singleBoat.bildUrl}`
                          : bootfb
                      }
                      alt="boot"
                    />
                  </div>

                  <div className="boat-data-container">
                    <h2>{singleBoat.name}</h2>
                    <p>Baujahr: {singleBoat.baujahr}</p>
                    <p>SerienNr: {singleBoat.serienNr}</p>
                    <h3>Materialien:</h3>
                    <ul>
                      {singleBoat.material.map((singleMaterial) => (
                        <li className="boat-material">{singleMaterial}</li>
                      ))}
                    </ul>
                    {/* {singleBoat.material.map((singleMaterial) => (
                      <p className="boat-material">{singleMaterial}</p>
                    ))} */}
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
                    Boot Details bearbeiten
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

import { useState } from "react";
import Nav from "../components/Nav";
import { backendUrl } from "../api";
import "./AddNewBootForm.scss";

const AddNewBootForm = () => {
  const [name, setName] = useState("");
  const [baujahr, setBaujahr] = useState();
  const [serienNr, setSerienNr] = useState();
  const [material, setMaterial] = useState([]);
  const [singleMaterial, setSingleMaterial] = useState("");
  const [bootsart, setBootsart] = useState("");
  const [bildUrl, setBildUrl] = useState(null);
  //   const [reservierung, setReservierung] = useState({});
  //   // states für reservierungs-Object:
  //   const [startdatum, setStartdatum] = useState();
  //   const [enddatum, setEnddatum] = useState();

  //   ADD-MATERIAL-Function:
  const addMaterial = (e) => {
    e.preventDefault();
    setMaterial((prevMaterial) => [...prevMaterial, singleMaterial]);
    setSingleMaterial("");
  };

  //   ADD-BOOT-Function:
  const addBoot = (e) => {
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
        fetch(`${backendUrl}/api/boote`, {
          method: "POST",
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
      )
      .then((res) => res.json())
      .then(({ success, result, error, message }) => {
        console.log({ success, result, error, message });
      })
      .catch((error) => console.log(error));

    setName("");
    setSerienNr("");
    setBootsart("");
    setBaujahr("");
    setMaterial([]);
  };
  return (
    <>
      <Nav />
      <section className="content-wrapper">
        <form>
          <h2>Füge ein neues Boot hinzu</h2>
          <div>
            <input
              type="text"
              placeholder="Bootsname..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              name=""
              id=""
              placeholder="Baujahr..."
              value={baujahr}
              onChange={(e) => setBaujahr(Number(e.target.value))}
            />
            <input
              type="number"
              name=""
              id=""
              placeholder="Serien-Nummer"
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
            <div>
              <label htmlFor="bild">Lade ein Bild des Bootes hoch:</label>
              <input
                type="file"
                name="bild"
                id="bild"
                placeholder="Bootsbild..."
                onChange={(e) => setBildUrl(e.target.files[0])}
              />
            </div>
          </div>
          <button onClick={addBoot} className="btn">
            Boot Hinzufügen
          </button>
        </form>
      </section>
    </>
  );
};

export default AddNewBootForm;

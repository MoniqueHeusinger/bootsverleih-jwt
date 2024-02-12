// booteRouter mit allen Endpunkte (POST / PATCH / DELETE) + integrierten Controllern
import express from "express";
import { BooteService } from "../services/index.js";
import { doJwtAuth } from "../middleware/doJwtAuth.js";

const bootRouter = express.Router();

// alle Boote anzeigen
//=========================
bootRouter.get("/", async function getAllBooteCtrl(_, res) {
  try {
    const result = await BooteService.getAllBoote();
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error.message || "Could not retrieve boote",
    });
  }
});

// neues Boot anlegen
//=========================
bootRouter.post(
  "/",
  doJwtAuth, // BasicAuth "Türsteher" --> middleware
  express.json(), // hier wird der json body parser nur getriggert, wenn der endpunkt matched
  async function postNewBootCtrl(req, res) {
    try {
      const bootInfo = req.body;
      const authenticatedUserId = req.verifiedUserClaims.sub; // neu für jwtAuth
      // const userInfo = req.authenticatedUser; // neu: für BasicAuth
      const result = await BooteService.addBoot(bootInfo, authenticatedUserId); // authenticatedUserId: neu für jwtAuth
      res.status(201).json({ success: true, result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error,
        message: error.message || "Could not add boat",
      });
    }
  }
);

// Boot löschen
//=========================
bootRouter.delete(
  "/:bootId",
  doJwtAuth, // neu: für BasicAuth
  async function deleteBootByIdCtrl(req, res) {
    try {
      const bootId = req.params.bootId;
      const authenticatedUserId = req.verifiedUserClaims.sub; // neu: für jwtAuth
      const result = await BooteService.removeBoot(bootId, authenticatedUserId); // neu: für BasicAuth
      res.json({ success: true, result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error,
        message: error.message || "Could not delete boat",
      });
    }
  }
);

// Reservierung durchführen
//=========================
bootRouter.patch(
  "/:bootId",
  async function updateBootsReservierungCtrl(req, res) {
    try {
      const bootId = req.params.bootId;
      const reservInfo = req.body;
      const result = await BooteService.toggleReservierung(reservInfo, bootId);
      res.json({ success: true, result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error,
        message: error.message || "Could not update boat",
      });
    }
  }
);

// Boot-Daten ändern
//=========================
bootRouter.patch(
  "/edit/:bootId",
  doJwtAuth, // neu: für BasicAuth
  async function updateBootCtrl(req, res) {
    try {
      const bootId = req.params.bootId;
      const bootInfo = req.body;
      const authenticatedUserId = req.verifiedUserClaims.sub; // neu: für jwtAuth
      const result = await BooteService.editBoot(
        bootInfo,
        bootId,
        authenticatedUserId
      ); // neu: für jwtAuth
      res.json({ success: true, result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error,
        message: error.message || "Could not update boat",
      });
    }
  }
);

export default bootRouter;

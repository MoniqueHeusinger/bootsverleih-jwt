// removeBoot(bootId) function mit Boot.findByIdAndDelete(bootId)
import { Boot } from "../models/index.js";

export const removeBoot = async (bootId, authenticatedUser) => {
  // neu für BasicAuth
  const foundBoot = await Boot.findById(bootId);
  if (!foundBoot) throw new Error("Boat doesn't exist");

  console.log("typeof foundBoot.userId:", typeof foundBoot.userId);
  console.log("typeof authenticatedUser._id:", typeof authenticatedUser._id); // stimmt mit foundBoot.userId überein + gefundenes Boot wird auch gelöscht - keine Fehlermeldung

  if (foundBoot.userId === authenticatedUser._id) {
    console.log("matched"); // wird nicht ausgegeben!
  } else if (foundBoot.userId.toString() !== authenticatedUser._id.toString()) {
    throw new Error("You cannot remove boats created by other users!"); // mit .toString() funktioniert der Vergleich und das Boot wird gelöscht vom gleichen User
  } else {
    console.log("Delete operation: Another error occured."); // wird ausgegeben
  }

  // authorization step /// Funktioniert so nicht!
  // if (foundBoot.userId !== authenticatedUser._id)
  //   throw new Error("You cannot remove boats created by other users!");

  const deletedBoot = await Boot.findByIdAndDelete(bootId);
  // To do: boot-bild aus data/images/ löschen
  return deletedBoot;
};

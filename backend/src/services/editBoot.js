// evtl editBoot function um andere Änderungen am Boot durcgzuführen....

import { Boot } from "../models/index.js";

export const editBoot = async (bootInfo, bootId, authenticatedUser) => {
  // neu für BasicAuth
  const foundBoot = await Boot.findById(bootId);
  if (!foundBoot) throw new Error("The boat you want to edit doesn't exist");

  // authorization step
  if (foundBoot.userId.toString() !== authenticatedUser._id.toString()) {
    throw new Error("You cannot edit boats created by other users!");
  }

  const filter = { _id: bootId };
  const update = {
    name: bootInfo.name,
    baujahr: bootInfo.baujahr,
    serienNr: bootInfo.serienNr,
    material: bootInfo.material,
    bootsart: bootInfo.bootsart,
    bildUrl: bootInfo.bildUrl,
    reservierung: bootInfo.reservierung,
  };
  // hier fehlt noch await
  const bootUpdate = Boot.findOneAndUpdate(filter, update, { new: true });
  return bootUpdate;
};

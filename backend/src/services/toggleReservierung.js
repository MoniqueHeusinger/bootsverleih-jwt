// toggleReservierung(bootId? / reservierungInfo?) mit  evtl Boot.findOneAndUpdate()
import { Boot } from "../models/index.js";

export const toggleReservierung = async (reservInfo, bootId) => {
  const filter = { _id: bootId };
  const update = {
    reservierung: {
      istReserviert: true,
      startdatum: reservInfo.startdatum,
      enddatum: reservInfo.enddatum,
      reservierungsnummer: Date.now(),
    },
  };
  const bootMatchAndUpdate = Boot.findOneAndUpdate(filter, update, {
    new: true,
  });
  return bootMatchAndUpdate;
};

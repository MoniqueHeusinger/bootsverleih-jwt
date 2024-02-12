// addBoot function mit Boot.create(bootInfo)

import { Boot } from "../models/index.js";

export const addBoot = async (bootInfo, authenticatedUser) => {
  return Boot.create({ ...bootInfo, userId: authenticatedUser });
};

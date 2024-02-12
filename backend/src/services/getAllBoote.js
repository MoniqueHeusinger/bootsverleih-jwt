// getAllBoote function mit Boot.find()

import { Boot } from "../models/index.js";

export const getAllBoote = async () => {
  const boote = await Boot.find();
  return boote;
};

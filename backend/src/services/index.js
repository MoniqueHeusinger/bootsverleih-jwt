// import/ export service functions in BootService-Object
import { getAllBoote } from "./getAllBoote.js";
import { addBoot } from "./addBoot.js";
import { removeBoot } from "./removeBoot.js";
import { toggleReservierung } from "./toggleReservierung.js";
import { editBoot } from "./editBoot.js";
import { registerUser } from "./registerUser.js";
import { loginUser } from "./loginUser.js";

export const BooteService = {
  getAllBoote,
  addBoot,
  removeBoot,
  toggleReservierung,
  editBoot,
};

export const UserService = {
  registerUser,
  loginUser,
};

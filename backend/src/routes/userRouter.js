import express from "express";
import { UserService } from "../services/index.js";

const userRouter = express.Router();

// neu: für BasicAuth:
userRouter.post(
  "/login",
  express.json(), // neu für jwtAuth
  async function postLoginUserCtrl(req, res) {
    try {
      const loginInfo = { email: req.body.email, password: req.body.password }; // neu für jwtAuth
      const result = await UserService.loginUser(loginInfo); // neu für jwtAuth
      res.json({ success: true, result }); // neu für jwtAuth
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error,
        message: error.message || "Could not register user",
      });
    }
  }
);

userRouter.post(
  "/register",
  express.json(), // body parser für die user infos im body
  async function postRegisterUserCtrl(req, res) {
    try {
      const result = await UserService.registerUser(req.body);
      res.json({ success: true, result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error,
        message: error.message || "Could not register user",
      });
    }
  }
);

export default userRouter;

import express from "express";
import { signUp } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signUp);

router.get("/login", (req, res) => {
  res.send("Login Endpoint");
});

router.get("/logout", (req, res) => {
  res.send("Logout Endpoint");
})

export default router;
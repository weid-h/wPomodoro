import { Router } from "express";

export const router = Router();

router.get(`/`, (req, res) => {
  res.send("Wassup dude");
});

router.post(`/`, (req, res) => {
  res.send("Thanks dude");
});

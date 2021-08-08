import express from "express";

const router = express.Router();

import { signin, signup, test } from "../controller/users.js";

// we will be using the post request for signin and signup controllers
router.post("/signin", signin);
router.post("/signup", signup);

export default router;

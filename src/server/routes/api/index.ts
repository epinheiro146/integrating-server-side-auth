import * as express from "express";
import usersRouter from "./users";
import chirpsRouter from "./chirps";

import pizzaRouter from "./pizza"; // delete later

const router = express.Router();

router.use("/users", usersRouter);
router.use("/chirps", chirpsRouter);

router.use("/pizza", pizzaRouter); // delete later

export default router;
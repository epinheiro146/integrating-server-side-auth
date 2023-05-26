import * as express from "express";
import { ReqUser } from "../../../types"
import { tokenCheck } from "../../middlewares/auth.mw";

const router = express.Router();

router.get('/', tokenCheck, (req: ReqUser, res) => {
    try {
        res.json({ message: `Enjoy your Pizza Time, ${req.user?.email}!` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
});

export default router;
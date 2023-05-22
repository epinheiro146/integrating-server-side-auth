import * as express from "express";
import * as passport from "passport";
import { ReqUser } from "../../../types"

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), async (req: ReqUser, res) => {
    try {
        res.json({ message: `Enjoy your Pizza Time, ${req.user?.email}!` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
});

export default router;
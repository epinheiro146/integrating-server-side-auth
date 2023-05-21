import * as express from "express";
import db from "../../db";

const router = express.Router();

router.post('/', async (req, res) => {

    try {

        const email = req.body.email;
        const password = req.body.password;

        // check for the user's email
        const [userFound] = await db.users.find('email', email);

        res.json(userFound);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried to log in, but something went wrong." })
    }
});

export default router;
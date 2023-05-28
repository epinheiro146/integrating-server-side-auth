import * as express from "express";
import Users from '../../db/queries/users';
import { ReqUser } from "../../../types";
import { tokenCheck } from "../../middlewares/auth.mw";

const router = express.Router();

// GET /api/users
router.get('/', tokenCheck, async (req: ReqUser, res) => {
    try {
        req.user?.id;
        const users = await Users.getAll();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried getting all users, but something went wrong.", error: error.message })
    }
});

// GET /api/users/123
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const user = await Users.getById(id);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried getting this user, but something went wrong." })
    }
});

// GET /api/users/chirps/123
router.get('/chirps/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const userChirps = await Users.getChirps(id);
        res.json(userChirps);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried getting this user's chirps, but something went wrong." })
    }
});

// GET /api/users/mentions/123
router.get('/mentions/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const userMentions = await Users.getMentionsById(id);
        res.json(userMentions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried getting chirps this user has been mentioned in, but something went wrong." })
    }
});

router.post('/', tokenCheck, async (req: ReqUser, res) => {
    try {
        req.user?.id;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.json({ message: "Need both a name and email to create a new user." });
        }
        const results = await Users.create(name, email);
        res.status(201).json({ message: "New user registered.", id: results.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried adding a user, but something went wrong.", error: error.message })
    }
});

router.put('/:id', tokenCheck, async (req: ReqUser, res) => {
    try {
        req.user?.id;
        const id = parseInt(req.params.id);
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Please make sure both your username and email fields are filled out." });
        }

        await Users.update(id, name, email);

        res.status(201).json({ message: "User information has been updated." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried updating the user, but something went wrong.", error: error.message })
    }
});

router.delete('/:id', tokenCheck, async (req: ReqUser, res) => {
    try {
        req.user?.id;
        const id = parseInt(req.params.id);
        const metaDataResults = await Users.destroy(id);
        if (metaDataResults.affectedRows) {
            res.json({ message: "User successfully deleted." });
        } else {
            res.status(404).json({ message: "User either doesn't exist or has already been deleted." })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried deleting a user, but something went wrong.", error: error.message })
    }
});

export default router;
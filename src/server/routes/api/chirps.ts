import * as express from "express";
import Chirps from "../../db/queries/chirps";
import Users from "../../db/queries/users";
import Mentions from "../../db/queries/mentions";
import mentions from "../../db/queries/mentions";

const router = express.Router();

// GET /api/chirps
router.get('/', async (req, res) => {
    try {
        const chirps = await Chirps.getAll();
        res.json(chirps);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried getting all chirps, but something went wrong." })
    }
});

// GET /api/chirps/?
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const chirp = await Chirps.getById(id);
        res.json(chirp[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried getting a chirp, but something went wrong." })
    }
});

router.post('/', async (req, res) => {
    try {
        const { content } = req.body as { content: string }; // cast req.body as an object containing content w/ type string, to make sure the methods in foundUsers (below) will work properly on a string 
        const userid = 12;



        const allUsers = await Users.getAll();

        const foundUsers = content // parses text for usernames that will be added to Mentions
            .split(' ')
            .filter(word => word.includes('@'))
            .map(t => t.replace('@', ''));

        const results = await Chirps.create(userid, content);

        for await (const user of foundUsers) { // for/of can be done asynchronously, unlike regular for loops.
            const isValid = allUsers.find(t => t.name === user);
            if (isValid) {
                await Mentions.create(isValid.id, results.insertId);
            };
            console.log(isValid);
        };

        console.log(foundUsers);

        if (!content || typeof content !== "string" || content.length > 280) {
            return res.status(400).json({ message: "Sorry, chirps must be between 1 and 280 characters." });
        };

        res.status(201).json({ message: "Posted new chirp!", id: results.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried posting a chirp, but something went wrong." })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { content } = req.body;

        if (!content || typeof content !== "string" || content.length > 280) {
            return res.status(400).json({ message: "Sorry, chirps must be between 1 and 280 characters." });
        };

        await mentions.deletebyChirpId(id);
        await Chirps.update(id, content);

        const foundUsers = content // parses text for usernames that will be added to Mentions
            .split(' ')
            .filter(word => word.includes('@'))
            .map(t => t.replace('@', ''));

        const allUsers = await Users.getAll();

        for await (const user of foundUsers) { // for/of can be done asynchronously, unlike regular for loops.
            const isValid = allUsers.find(t => t.name === user);
            if (isValid) {
                await Mentions.create(isValid.id, id);
            };
            console.log(isValid);
        };

        res.status(201).json({ message: "Chirp has been updated." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried updating chirp, but something went wrong." })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await mentions.deletebyChirpId(id);
        const metaDataResults = await Chirps.destroy(id);
        if (metaDataResults.affectedRows) {
            res.json({ message: "Chirp successfully deleted." });
        } else {
            res.status(404).json({ message: "Chirp either doesn't exist or has already been deleted." })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried deleting chirp, but something went wrong." })
    }
});

export default router;
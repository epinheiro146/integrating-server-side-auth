import * as express from "express";
import * as jwt from 'jsonwebtoken';
import { jwtCredentials } from '../../config';
import { generateHash } from '../../utils/passwords'
import users from "../../db/queries/users";

const router = express.Router();

router.post('/', async (req, res) => {
    const newUser = req.body;
    try {
        newUser.password = generateHash(newUser.password);
        const result = await users.insert(newUser);

        const token = jwt.sign(
            { userid: result.insertId, email: newUser.email, role: 1 },
            jwtCredentials.secret!,
            { expiresIn: jwtCredentials.expires }
        );

        res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried to register new user, but something went wrong." })
    }
});

export default router;
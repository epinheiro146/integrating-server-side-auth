import { Query } from "..";
import { Chirp, User } from "../../../types";

const create = (userid: User['id'], chirpid: Chirp['id']) => Query("INSERT INTO mentions (userid, chirpid) VALUES (?, ?)", [userid, chirpid]);

const deletebyChirpId = (chirpid: Chirp['id']) => Query("DELETE FROM mentions WHERE chirpid=?", [chirpid]);

const deletebyUserId = (userid: User['id']) => Query("DELETE FROM mentions WHERE userid=?", [userid]);


export default {
    create,
    deletebyChirpId,
    deletebyUserId
};
import * as React from "react";
import { useState, useEffect } from "react";
import { Chirp, User, UserWMentions } from "../../types";
import { useParams, Link } from "react-router-dom";
import { fetcher } from "../services/fetch-helper";
import swal from "sweetalert";

const Profile = () => {

    const [user, setUser] = useState<User>();
    const [chirps, setChirps] = useState<Chirp[]>([]);
    const [mentions, setMentions] = useState<UserWMentions[]>([]);
    const [chirpsLoaded, setChirpsLoaded] = useState(false);
    const [mentionsLoaded, setMentionsLoaded] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetcher(`/api/users/${id}`)
            .then(data => {
                setUser(data[0]);
            })
            .catch(error => swal("Oops!", error.message, "error"));

        fetcher(`/api/users/chirps/${id}`)
            .then(data => {
                setChirps(data);
                setChirpsLoaded(true);
            })
            .catch(error => swal("Oops!", error.message, "error"));

        fetcher(`/api/users/mentions/${id}`)
            .then(data => {
                setMentions(data);
                setMentionsLoaded(true);
            })
            .catch(error => swal("Oops!", error.message, "error"));
    }, [id]);

    return (
        <div className="mt-5">
            <div className="p-2">
                <h1>{user?.name}</h1>
                <h5>user#{user?.id}</h5>
                <p>Member since {user?._created ? `${new Date(user?._created).toLocaleString()}` : ""}</p>
            </div>


            {chirpsLoaded ? <h3 className="p-2">{chirps.length ? "Chirps by user:" : "This user hasn't chirped anything yet."}</h3> : <h3 className="p-2">Loading chirps by user...</h3>}
            {chirps.map(chirp => (
                <div className="col-12 col-md-4 col-lg-3 m-2" key={`chirp-${chirp.id}`}>

                    <div className="card text-bg-dark shadow-lg">
                        <Link className="text-light text-decoration-none" to={`/chirps/${chirp.id}`}>
                            <div className="card-body">
                                <p>{chirp.content}</p>
                            </div>
                            <div className="card-footer">
                                <p>{chirp._created ? `${new Date(chirp._created).toLocaleString()}` : ""}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}

            {mentionsLoaded ? <h3 className="p-2">{mentions.length ? "Chirps that mention user:" : "This user hasn't been mentioned yet."}</h3> : <h3 className="p-2">Loading user mentions...</h3>}
            {mentions.map(chirp => (
                <div className="col-12 col-md-4 col-lg-3 m-2" key={`chirp-${chirp.chirpid}`}>

                    <div className="card text-bg-dark shadow-lg">
                        <Link className="text-light" to={`/users/${chirp.chirp_author_id}`}>
                            <div className="card-title">
                                <p className="mx-2">{chirp.chirp_author_name}:</p>
                            </div>
                        </Link>
                        <Link className="text-light text-decoration-none" to={`/chirps/${chirp.chirpid}`}>
                            <div className="card-body">
                                <p>{chirp.content}</p>
                            </div>
                            <div className="card-footer">
                                <p>{chirp.chirp_created ? `${new Date(chirp.chirp_created).toLocaleString()}` : ""}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}

        </div>
    )

};

export default Profile;
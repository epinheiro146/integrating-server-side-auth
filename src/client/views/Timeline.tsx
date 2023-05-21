import * as React from "react";
import { useState, useEffect } from "react";
import { ChirpWUser } from "../../types";
import { Link } from "react-router-dom";
import { fetcher } from "../services/fetch-helper";
import swal from "sweetalert";

const Timeline = () => {
    const [chirps, setChirps] = useState<ChirpWUser[]>([]);

    useEffect(() => {
        fetcher(`/api/chirps`)
            .then(data => setChirps(data))
            .catch(error => swal("Oops!", error.message, "error"));
    }, []);

    // the fetcher above replaced the commented code below, and now allows for error handling

    /*useEffect(() => {
        fetch(`/api/chirps`)
            .then(res => res.json())
            .then(data => setChirps(data));
    }, []);*/

    return (
        <div className="mt-5">
            <h1 className="p-2">Timeline</h1>
            {chirps.map(chirp => (
                <div className="col-12 col-md-4 col-lg-3 m-2" key={`chirp-${chirp.id}`}>
                    <div className="card text-bg-dark shadow-lg">
                        <div className="card-title">
                            <Link className="text-light" to={`/users/${chirp.userid}`}>
                                <p className="mx-2">{chirp.username}:</p>
                            </Link>
                        </div>
                        <Link className="text-reset text-decoration-none" to={`/chirps/${chirp.id}`}>
                            <div className="card-body">
                                <p>{chirp.content}</p>
                            </div>
                            <div className="card-footer">
                                <p>{chirp?._created ? `${new Date(chirp?._created).toLocaleString()}` : ""}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Timeline;
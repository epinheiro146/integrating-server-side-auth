import * as React from "react";
import { useState, useEffect } from "react";
import { ChirpWUser } from "../../types";
import { useParams, Link } from "react-router-dom";
import { fetcher } from "../services/fetch-helper";
import swal from "sweetalert";

const ChirpDetails = () => {
    const [chirp, setChirp] = useState<ChirpWUser>();
    const { id } = useParams();

    useEffect(() => {
        fetcher(`/api/chirps/${id}`)
            .then(data => setChirp(data))
            .catch(error => swal("Oops!", error.message, "error"));

        // the fetcher above replaced the commented code below, and now allows for error handling

        /*fetch(`/api/chirps/${id}`)
            .then(res => res.json())
            .then(data => setChirp(data))*/
    }, [id]);

    return (
        <div className="mt-5 row justify-content-center">
            <div className="col-12 col-md-8">
                <div className="card text-bg-dark shadow-lg">
                    <div className="card-title text-center">
                        <p>chirp#{chirp?.id} from {<Link className="text-light" to={`/users/${chirp?.userid}`}>{chirp?.username}:</Link>}</p>
                    </div>
                    <div className="card-body">
                        <p>{chirp?.content}</p>
                    </div>
                    <div className="card-footer">
                        <p>{chirp?._created ? `Created on ${new Date(chirp?._created).toLocaleString()}` : ""}</p>
                        <Link className="btn btn-outline-light" to={`/chirps/${id}/edit`}>
                            Edit/Delete
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChirpDetails;
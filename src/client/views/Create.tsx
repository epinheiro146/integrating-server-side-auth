import * as React from "react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetcher } from "../services/fetch-helper";
import swal from "sweetalert";

const MAX_CHIRP_LENGTH = 280;

const Create = () => {
    const [chirp, setChirp] = useState("");
    const nav = useNavigate();

    const handleSubmitButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!chirp) {
            swal("Feeling shy?", "Please enter some content!", "error");
            return;
        }

        if (chirp.length > MAX_CHIRP_LENGTH) {
            swal("OK, settle down...", `Your chirp has to be under ${MAX_CHIRP_LENGTH} characters.`, "error");
            return;
        }

        fetcher("/api/chirps", "POST", { content: chirp })
            .then((data: any) => {
                swal("Nice!", `${data.message}`, "success");
                nav(`/chirps/${data.id}`)
            })
            .catch(error => swal("Oops!", `${error.message}`, "error")); // will handle any network or server-side error

        // the fetcher above, thanks to your fetch-helper.ts service, replaces the entire try-catch block commented out below:

        /*try {
            const res = await fetch("/api/chirps", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ chirp })
            });

            const data = await res.json();

            if (res.ok) {
                swal("Nice!", `${data.message}`, "success");

                if (data.id) {
                    nav(`/chirps/${data.id}`);
                }
            } else {
                throw new Error(data.message);
            }

        } catch (error) {
            swal("Oops!", `${error.message}`, "error");
            console.error(error);
        }*/

    };

    return (
        <div className="mt-5 row justify-content-center">
            <div className="col-12 col-md-8">
                <div className="card text-bg-dark shadow-lg">
                    <div className="card-title text-center">
                        <p>Creating New Chirp</p>
                    </div>
                    <div className="card-body">
                        <div>
                            <span className={`${chirp.length >= MAX_CHIRP_LENGTH ? "text-danger" : "text-light"}`}>
                                {chirp.length}/{MAX_CHIRP_LENGTH}
                            </span>
                            <textarea className="form-control" value={chirp} maxLength={MAX_CHIRP_LENGTH} onChange={e => setChirp(e.target.value)} />
                            <button onClick={handleSubmitButton} className="btn btn-outline-success mt-2">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
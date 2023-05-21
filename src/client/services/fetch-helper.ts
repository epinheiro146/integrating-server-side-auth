type method_types = "GET" | "POST" | "PUT" | "DELETE"; // prevent typos and other errors in the future by specifying these here

export const fetcher = <T = any>(url: string, method: method_types = 'GET', data?: unknown) => { //saying here that GET is the default if you don't specify a method
    return new Promise<T>(async (resolve, reject) => {
        try {
            const fetchOptions: RequestInit = { // requestInit is just a global fetch that gets you good autocomplete, but also allows you to make exceptions for your options.
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }

            if (method === "GET" || method === "DELETE") { // requestInit comes in handy right here, where it lets you delete the header and body properties, since they are not required for GET and DELETE.
                delete fetchOptions.headers;
                delete fetchOptions.body;
            }
            // console.log(fetchOptions);
            const res = await fetch(url, fetchOptions);
            const resData = await res.json(); // your fetcher will always run this line, which gets us pre-parsed data in our .then chain

            if (res.ok) {
                resolve(resData);
            } else {
                throw new Error(resData.message);
            }
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};

// All this can serve as a single source of truth and handle all your fetch calls
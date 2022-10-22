/*!
 * Carrier.js
 * v0.0.1 - 2022-08-12
 * (c) Ritik Chourasiya;  License
 * Created by: Ritik Chourasiya
 */

! function(a, b) {
    "use strict";
    let db = null;

    let isEmpty = (a) => {
        if(a === undefined || a === null || a.length === 0) return true;
    }

    // create indexedDB instance
    let createIndexedDB = () => {
        let promise = new Promise((resolve, reject) => {
            const request = indexedDB.open('carrierjs');

            //on upgrade needed
            request.onupgradeneeded = e => {
                db = e.target.result;
                const responsesDB = db.createObjectStore("responses", {keyPath: "url"})
            }
    
            //on success 
            request.onsuccess = e => {
                db = e.target.result;
                // db.name = "responses";
                resolve();
            }
    
            //on error
            request.onerror = e => {
                console.log("onError", e);
            }
        });

        return promise;
    }

    // check db has response data, if yes then return it;
    let dbHasResponse = (url = null) => {
        let promise = new Promise(function(resolve, reject) {
            if(!url) {
                console.log(new Error("Invalid url"));
                return;
            };

            const tx = db.transaction("responses","readonly")
            const requestStore = tx.objectStore("responses")
            const request = requestStore.get(url);
            let res = undefined;
            request.onsuccess = e => {

                res = e.target.result;
                resolve(res);
            };
        });

        return promise;
    }

    let addResponseToDB = (response) => {
        let promise = new Promise(function(resolve, reject) {

            const tx = db.transaction("responses", "readwrite")
            tx.onerror = e => console.log(e.target);
            const responseStore = tx.objectStore("responses");
            responseStore.add(response);
            resolve(response);
        });
        return promise;
    };

    let updateResponseToDB = (object) => {
        let promise = new Promise((resolve, reject) => {
            const tx = db.transaction("responses", "readwrite")
            tx.onerror = e => console.log(e.target);
            const responseStore = tx.objectStore("responses");
            responseStore.put(object);
            resolve(object);
        });

        return promise;
    };
    
    (async () => {
        await createIndexedDB();
    })();

    a.carrier = {
        get: function(url, refresh = false) {
            let promise = new Promise(async (resolve, reject) =>{

                if(isEmpty(url)) {
                    console.error(new Error('Url is required to make request'))
                    return;
                }

                await createIndexedDB();
                let response = await dbHasResponse(url);

                if(!refresh && response) {
                    resolve(response);
                } else {

                    let req = new XMLHttpRequest();
                    req.responseType = 'json';
                    req.open("GET", url);

                    req.send();

                    req.onload = async () => {

                        // Response Object
                        const res = {
                            config: '',
                            response: req.response,
                            headers: req.getAllResponseHeaders(),
                            request: req.readyState,
                            url: req.responseURL,
                            status: req.status,
                            type: 'json'
                        };

                        if(req.status === 200) {

                            if(response) {
                                await updateResponseToDB(res);
                            }
                            
                            if(!response) {
                                await addResponseToDB(res);
                            }

                            resolve(res);
                        }

                        if(req.status === 404) {
                            reject(new Error('Url not Found'));
                        }
                    }

                    req.onreadystatechange = () => {
                        if(req.readyState === 4 && req.status === 404) {
                            // TODO
                        }
                    }

                }
            });

            return promise;
        },
        post: function(url, data) {
            let promise = new Promise((resolve, reject) =>{
                let req = new XMLHttpRequest();
                req.responseType = 'json';
                req.open("POST", url);
                req.setRequestHeader('Content-Type', 'application/json');

                req.send(JSON.stringify(data));

                req.onload = () => {
                    // Response Object
                    const res = {
                        config: '',
                        response: req.response,
                        headers: req.getAllResponseHeaders(),
                        request: req.readyState,
                        url: req.responseURL,
                        status: req.status,
                        type: 'json'
                    };

                    if(req.status === 200 || req.status === 201) {
                        resolve(res);
                    }

                    if(req.status === 404) {
                        reject(res);
                    }
                }

                req.onreadystatechange = () => {
                    if(req.readyState === 4 && req.status === 404) {
                        // TODO
                    }
                }
            });

            return promise;
        },
    }

}(this, document);
/*!
 * Carrier.js
 * v0.0.1 - 2022-08-12
 * (c) Ritik Chourasiya;  License
 * Created by: Ritik Chourasiya
 */

! function(a, b) {
    "use strict";
    let cache = JSON.parse(localStorage.getItem('carrierCache'));

    let appendScript = function(res) {
        var c = b.head || b.getElementsByTagName("head")[0];
        var d = b.createElement("script");
        d.defer = !0, d.text = res.response, c.appendChild(d)
    };

    let cacheHasProperty = (url) => {
        return cache && cache.hasOwnProperty(url)
    }

    let isEmpty = (a) => {
        if(a === undefined || a === null || a.length === 0) return true
    }

    a.carrier = {
        get: function(url) {
            let promise = new Promise((resolve, reject) =>{

                if(isEmpty(url)) {
                    console.error(new Error('Url is required to make request'))
                    return;
                }

                let req = new XMLHttpRequest();
                req.responseType = 'json';
                req.open("GET", url);

                req.send();

                req.onload = () => {

                    // Response Object
                    const res = {
                        config: '',
                        response: eval(req.response),
                        headers: req.getAllResponseHeaders(),
                        request: req.readyState,
                        url: req.responseURL,
                        status: req.status,
                        type: 'json'
                    }

                    if(req.status === 200) {
                        resolve(res)
                    }

                    if(req.status === 404) {
                        reject(res)
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
                        response: eval(req.response),
                        headers: req.getAllResponseHeaders(),
                        request: req.readyState,
                        url: req.responseURL,
                        status: req.status,
                        type: 'json'
                    }

                    if(req.status === 200 || req.status === 201) {
                        resolve(res)
                    }

                    if(req.status === 404) {
                        reject(res)
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
        script: function(url) {
            let promise = new Promise((resolve, reject) =>{

                if(isEmpty(url)) {
                    console.error(new Error('Script source is required to make request'))
                    return;
                }
        
                if(cacheHasProperty(url)) {
                    const res = cache[url];
                    if(res.status === 200) {
                        appendScript(res);
                        resolve(res.response)
                    }
                    resolve(res)
                } else {

                    const req = new XMLHttpRequest();
                    req.responseType = 'text';

                    req.open("GET", url);
                    req.onload = () => {
                        const res = {
                            config: '',
                            response: req.response,
                            headers: req.getAllResponseHeaders(),
                            request: req.readyState,
                            url: req.responseURL,
                            status: req.status,
                            type: 'script'
                        }

                        if (req.status === 200) {

                            // Cache is null or blank
                            if(cache === null) {
                                cache = {};
                                cache[url] = res
                                localStorage.setItem('carrierCache', JSON.stringify(cache));
                            }

                            cache[url] = res        
                            localStorage.setItem('carrierCache', JSON.stringify(cache));

                            appendScript(res);
                            resolve(res.response)
                        }
                    }
                    req.send();
                }
        
            })
        
            return promise;
        },
    }

}(this, document);
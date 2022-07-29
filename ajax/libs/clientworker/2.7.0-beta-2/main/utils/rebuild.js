import cons from "./cons.js"
const rebuild = {
    request:(req, init) => {
        req = req.clone()
        if (req.mode === 'navigate') {
            cons.w(`You can't rebuild a POST method with body when it is a navigate request.ClientWorker will ignore it's body`)
        }
        let nReq = new Request(req, {
            headers: rebuildheaders(req, init.headers),
            method: init.method || req.method,
            mode: req.mode === 'navigate' ? "same-origin" : (init.mode || req.mode),
            credentials: init.credentials || req.credentials,
            redirect: init.redirect || req.redirect
        })
        if (!!init.url) nReq = new Request(init.url, nReq)
        return nReq
    },
    response:(res, init) => {
        if(res.type === 'opaque') {
            cons.e(`You can't rebuild a opaque response.ClientWorker will ignore this build`)
            return res
        }
        let nRes = new Response(res.body, {
            headers: rebuildheaders(res, init.headers),
            status: init.status || res.status,
            statusText: init.statusText || res.statusText
        })
        return nRes
    }
}

const rebuildheaders = (re, headers) => {
    if (!!headers) {
        const nHeaders = new Headers(re.headers)
        for (let key in headers) {
            if (headers[key] !== undefined) {
                nHeaders.set(key, headers[key])
            } else {
                nHeaders.delete(key)
            }
        }
        return nHeaders
    }
    return new Headers(re.headers)
}
export default rebuild
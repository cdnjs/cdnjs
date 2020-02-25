import { validateContent } from './validate';
export const ioniconContent = new Map();
const requests = new Map();
export const getSvgContent = (url) => {
    // see if we already have a request for this url
    let req = requests.get(url);
    if (!req) {
        // we don't already have a request
        req = fetch(url).then(rsp => {
            if (rsp.ok) {
                return rsp.text().then(svgContent => {
                    ioniconContent.set(url, validateContent(svgContent));
                });
            }
            ioniconContent.set(url, '');
        });
        // cache for the same requests
        requests.set(url, req);
    }
    return req;
};

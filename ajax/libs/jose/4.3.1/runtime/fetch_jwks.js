import { JOSEError, JWKSTimeout } from '../util/errors.js';
import { isCloudflareWorkers } from './env.js';
const fetchJwks = async (url, timeout) => {
    let controller;
    let id;
    let timedOut = false;
    if (typeof AbortController === 'function') {
        controller = new AbortController();
        id = setTimeout(() => {
            timedOut = true;
            controller.abort();
        }, timeout);
    }
    const response = await fetch(url.href, {
        signal: controller ? controller.signal : undefined,
        redirect: 'manual',
        method: 'GET',
        ...(!isCloudflareWorkers()
            ? {
                referrerPolicy: 'no-referrer',
                credentials: 'omit',
                mode: 'cors',
            }
            : undefined),
    }).catch((err) => {
        if (timedOut)
            throw new JWKSTimeout();
        throw err;
    });
    if (id !== undefined)
        clearTimeout(id);
    if (response.status !== 200) {
        throw new JOSEError('Expected 200 OK from the JSON Web Key Set HTTP response');
    }
    try {
        return await response.json();
    }
    catch (_a) {
        throw new JOSEError('Failed to parse the JSON Web Key Set HTTP response as JSON');
    }
};
export default fetchJwks;

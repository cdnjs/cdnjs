import * as b64u from '../util/base64url.js';
import { decoder } from '../lib/buffer_utils.js';
import { JWTInvalid } from '../util/errors.js';
import jwtPayload from '../lib/jwt_claims_set.js';
import { ProduceJWT } from './produce.js';
export class UnsecuredJWT extends ProduceJWT {
    encode() {
        const header = b64u.encode(JSON.stringify({ alg: 'none' }));
        const payload = b64u.encode(JSON.stringify(this._payload));
        return `${header}.${payload}.`;
    }
    static decode(jwt, options) {
        if (typeof jwt !== 'string') {
            throw new JWTInvalid('Unsecured JWT must be a string');
        }
        const { 0: encodedHeader, 1: encodedPayload, 2: signature, length } = jwt.split('.');
        if (length !== 3 || signature !== '') {
            throw new JWTInvalid('Invalid Unsecured JWT');
        }
        let header;
        try {
            header = JSON.parse(decoder.decode(b64u.decode(encodedHeader)));
            if (header.alg !== 'none')
                throw new Error();
        }
        catch {
            throw new JWTInvalid('Invalid Unsecured JWT');
        }
        const payload = jwtPayload(header, b64u.decode(encodedPayload), options);
        return { payload, header };
    }
}

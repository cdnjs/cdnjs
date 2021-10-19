import { JWEInvalid } from '../util/errors.js';
const checkCekLength = (cek, expected) => {
    if (cek.length << 3 !== expected) {
        throw new JWEInvalid('Invalid Content Encryption Key length');
    }
};
export default checkCekLength;

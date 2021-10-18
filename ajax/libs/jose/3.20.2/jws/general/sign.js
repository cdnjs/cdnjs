import FlattenedSign from '../flattened/sign.js';
import { JWSInvalid } from '../../util/errors.js';
const signatureRef = new WeakMap();
class IndividualSignature {
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError('setUnprotectedHeader can only be called once');
        }
        this._unprotectedHeader = unprotectedHeader;
        return this;
    }
    set _protectedHeader(value) {
        signatureRef.get(this).protectedHeader = value;
    }
    get _protectedHeader() {
        return signatureRef.get(this).protectedHeader;
    }
    set _unprotectedHeader(value) {
        signatureRef.get(this).unprotectedHeader = value;
    }
    get _unprotectedHeader() {
        return signatureRef.get(this).unprotectedHeader;
    }
}
class GeneralSign {
    constructor(payload) {
        this._signatures = [];
        this._payload = payload;
    }
    addSignature(key, options) {
        const signature = new IndividualSignature();
        signatureRef.set(signature, { key, options });
        this._signatures.push(signature);
        return signature;
    }
    async sign() {
        if (!this._signatures.length) {
            throw new JWSInvalid('at least one signature must be added');
        }
        const jws = {
            signatures: [],
            payload: '',
        };
        let payloads = new Set();
        await Promise.all(this._signatures.map(async (sig) => {
            const { protectedHeader, unprotectedHeader, options, key } = signatureRef.get(sig);
            const flattened = new FlattenedSign(this._payload);
            if (protectedHeader) {
                flattened.setProtectedHeader(protectedHeader);
            }
            if (unprotectedHeader) {
                flattened.setUnprotectedHeader(unprotectedHeader);
            }
            const { payload, ...rest } = await flattened.sign(key, options);
            payloads.add(payload);
            jws.payload = payload;
            jws.signatures.push(rest);
        }));
        if (payloads.size !== 1) {
            throw new JWSInvalid('inconsistent use of JWS Unencoded Payload Option (RFC7797)');
        }
        return jws;
    }
}
export { GeneralSign };
export default GeneralSign;

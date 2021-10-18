import { importJWK } from '../key/import.js';
async function parseJwk(jwk, alg, octAsKeyObject) {
    return importJWK(jwk, alg, octAsKeyObject);
}
export { parseJwk };
export default parseJwk;

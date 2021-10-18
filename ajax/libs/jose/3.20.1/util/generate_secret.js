import { generateSecret as generate } from '../runtime/generate.js';
async function generateSecret(alg, options) {
    return generate(alg, options);
}
export { generateSecret };
export default generateSecret;

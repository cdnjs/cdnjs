import { generateKeyPair as generate } from '../runtime/generate.js';
async function generateKeyPair(alg, options) {
    return generate(alg, options);
}
export { generateKeyPair };
export default generateKeyPair;

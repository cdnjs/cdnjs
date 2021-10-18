import crypto from './webcrypto.js';
const random = crypto.getRandomValues.bind(crypto);
export default random;

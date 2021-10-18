import { exportJWK } from '../key/export.js';
async function fromKeyLike(key) {
    return exportJWK(key);
}
export { fromKeyLike };
export default fromKeyLike;

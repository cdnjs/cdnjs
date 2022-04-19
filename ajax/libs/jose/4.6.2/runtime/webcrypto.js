export default crypto;
export function isCryptoKey(key) {
    try {
        return (key != null &&
            typeof key.extractable === 'boolean' &&
            typeof key.algorithm.name === 'string' &&
            typeof key.type === 'string');
    }
    catch (_a) {
        return false;
    }
}

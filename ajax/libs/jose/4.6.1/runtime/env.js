export function isCloudflareWorkers() {
    return typeof WebSocketPair === 'function';
}
export function isNodeJs() {
    try {
        return process.versions.node !== undefined;
    }
    catch (_a) {
        return false;
    }
}

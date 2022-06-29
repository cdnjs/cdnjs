export function isCloudflareWorkers() {
    return typeof WebSocketPair === 'function';
}

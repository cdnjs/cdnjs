export function addEvent(event, details) {
    let detail = {};
    if (details && details.detail) {
        detail = { detail: details.detail };
    }
    return new CustomEvent(event, detail);
}
export const events = [
    'loadstart', 'durationchange', 'loadedmetadata', 'loadeddata',
    'progress', 'canplay', 'canplaythrough', 'suspend', 'abort', 'error',
    'emptied', 'stalled', 'play', 'playing', 'pause', 'waiting', 'seeking',
    'seeked', 'timeupdate', 'ended', 'ratechange', 'volumechange',
];

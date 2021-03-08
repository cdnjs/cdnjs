export function addEvent(event, details) {
    if (typeof event !== 'string') {
        throw new Error('Event name must be a string');
    }
    let detail = {};
    if (details) {
        detail = details.detail ? { detail: details.detail } : { detail: details };
    }
    return new CustomEvent(event, detail);
}
export const events = [
    'loadstart', 'durationchange', 'loadedmetadata', 'loadeddata',
    'progress', 'canplay', 'canplaythrough', 'suspend', 'abort', 'error',
    'emptied', 'stalled', 'play', 'playing', 'pause', 'waiting', 'seeking',
    'seeked', 'timeupdate', 'ended', 'ratechange', 'volumechange',
];

export function formatTime(seconds, frameRate) {
    const f = Math.floor((seconds % 1) * (frameRate || 0));
    let s = Math.floor(seconds);
    let m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const wrap = (value) => {
        if (value < 10) {
            if (value <= 0) {
                return '00';
            }
            return `0${value.toString()}`;
        }
        return value.toString();
    };
    m %= 60;
    s %= 60;
    return `${h > 0 ? `${wrap(h)}:` : ''}${wrap(m)}:${wrap(s)}${f ? `:${wrap(f)}` : ''}`;
}
export function timeToSeconds(timeCode) {
    const time = timeCode.replace(/;/g, ':').split(':');
    let seconds = 0;
    if (time.length === 3) {
        seconds += parseFloat(time[0]) * 60 * 60;
        seconds += parseFloat(time[1]) * 60;
        seconds += parseFloat(time[2]);
    }
    else {
        seconds += parseFloat(time[0]) * 60;
        seconds += parseFloat(time[1]);
    }
    return seconds;
}

export function getExtension(url) {
    const baseUrl = url.split('?')[0];
    const baseFrags = baseUrl ? baseUrl.split('\\') : null;
    const baseUrlFragment = baseFrags ? baseFrags.pop() : null;
    const baseNameFrags = baseUrlFragment ? baseUrlFragment.split('/') : null;
    const baseName = baseNameFrags ? baseNameFrags.pop() : null;
    return baseName && baseName.indexOf('.') > -1 ? baseName.substring(baseName.lastIndexOf('.') + 1) : '';
}
export function isHlsSource(media) {
    return /\.m3u8$/i.test(media.src) || ['application/x-mpegURL', 'application/vnd.apple.mpegurl'].indexOf(media.type) > -1;
}
export function isM3USource(media) {
    return /\.m3u$/i.test(media.src);
}
export function isDashSource(media) {
    return /\.mpd/i.test(media.src) || media.type === 'application/dash+xml';
}
export function isFlvSource(media) {
    return /(^rtmp:\/\/|\.flv$)/i.test(media.src) || ['video/x-flv', 'video/flv'].indexOf(media.type) > -1;
}
export function predictType(url) {
    const extension = getExtension(url);
    let type;
    if (!extension) {
        return 'video/mp4';
    }
    switch (extension) {
        case 'm3u8':
        case 'm3u':
            type = 'application/x-mpegURL';
            break;
        case 'mpd':
            type = 'application/dash+xml';
            break;
        case 'mp3':
            type = 'audio/mp3';
            break;
        case 'webm':
            type = 'video/webm';
            break;
        case 'ogg':
            type = 'video/ogg';
            break;
        default:
            type = 'video/mp4';
            break;
    }
    return type;
}
export function isAutoplaySupported(media, defaultVol, autoplay, muted, callback) {
    const playPromise = media.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            media.pause();
            autoplay(true);
            muted(false);
            return callback();
        }).catch(() => {
            media.volume = 0;
            media.muted = true;
            media.play().then(() => {
                media.pause();
                autoplay(true);
                muted(true);
                return callback();
            }).catch(() => {
                media.volume = defaultVol;
                media.muted = false;
                autoplay(false);
                muted(false);
                callback();
            });
        });
    }
    else {
        autoplay(!media.paused || 'Promise' in window && playPromise instanceof Promise);
        media.pause();
        muted(false);
        callback();
    }
}

import { DVR_THRESHOLD, EVENT_OPTIONS } from '../utils/constants';
import { addEvent } from '../utils/events';
import { isAudio, isVideo } from '../utils/general';
import { isHlsSource } from '../utils/media';
import Native from './native';
class HTML5Media extends Native {
    constructor(element, mediaFile) {
        super(element, mediaFile);
        this.currentLevel = null;
        this.levelList = [];
        this.isStreaming = false;
        element.addEventListener('error', (e) => {
            const details = {
                detail: {
                    data: e,
                    message: e.message,
                    type: 'HTML5',
                },
            };
            const errorEvent = addEvent('playererror', details);
            element.dispatchEvent(errorEvent);
        }, EVENT_OPTIONS);
        if (!isAudio(element) && !isVideo(element)) {
            throw new TypeError('Native method only supports video/audio tags');
        }
        this.isStreaming = isHlsSource(mediaFile);
        this.element.addEventListener('loadeddata', this._isDvrEnabled.bind(this), EVENT_OPTIONS);
        this.element.textTracks.addEventListener('addtrack', this._readMediadataInfo.bind(this), EVENT_OPTIONS);
        return this;
    }
    canPlayType(mimeType) {
        return !!(this.element.canPlayType(mimeType).replace('no', ''));
    }
    load() {
        this.element.load();
    }
    destroy() {
        this.element.removeEventListener('loadeddata', this._isDvrEnabled.bind(this));
        this.element.textTracks.removeEventListener('addtrack', this._readMediadataInfo.bind(this));
        return this;
    }
    get levels() {
        if (!this.levelList.length) {
            const levels = this.element.querySelectorAll('source[title]');
            for (let i = 0, total = levels.length; i < total; ++i) {
                const level = {
                    height: 0,
                    id: `${i}`,
                    label: levels[i].getAttribute('title'),
                };
                this.levelList.push(level);
            }
        }
        return this.levelList;
    }
    set level(level) {
        const idx = this.levelList.findIndex((item) => parseInt(item.id, 10) === level);
        if (idx > -1) {
            this.currentLevel = this.levels[idx];
            const levels = this.element.querySelectorAll('source[title]');
            for (let i = 0, total = levels.length; i < total; ++i) {
                const source = levels[i].getAttribute('src');
                if (source && parseInt(this.currentLevel.id, 10) === i) {
                    this.element.src = source;
                }
            }
        }
    }
    get level() {
        return this.currentLevel ? this.currentLevel.id : '-1';
    }
    set src(media) {
        this.element.src = media.src;
    }
    _isDvrEnabled() {
        const time = this.element.seekable.end(this.element.seekable.length - 1) - this.element.seekable.start(0);
        if (this.isStreaming && time > DVR_THRESHOLD && !this.element.getAttribute('op-dvr__enabled')) {
            this.element.setAttribute('op-dvr__enabled', 'true');
            const timeEvent = addEvent('timeupdate');
            this.element.dispatchEvent(timeEvent);
        }
    }
    _readMediadataInfo(e) {
        const target = e;
        if (target.track.kind === 'metadata') {
            target.track.mode = 'hidden';
            target.track.addEventListener('cuechange', (event) => {
                const track = event.target;
                const cue = track.activeCues ? track.activeCues[0] : null;
                if (cue) {
                    const metaDataEvent = addEvent('metadataready', { detail: cue });
                    this.element.dispatchEvent(metaDataEvent);
                }
            }, EVENT_OPTIONS);
        }
    }
}
export default HTML5Media;

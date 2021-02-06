import { EVENT_OPTIONS } from '../utils/constants';
import { removeElement } from '../utils/general';
import { formatTime } from '../utils/time';
class Time {
    constructor(player, position, layer) {
        this.events = {
            controls: {},
            media: {},
        };
        this.player = player;
        this.labels = player.getOptions().labels;
        this.position = position;
        this.layer = layer;
        return this;
    }
    create() {
        this.current = document.createElement('time');
        this.current.className = 'op-controls__current';
        this.current.setAttribute('role', 'timer');
        this.current.setAttribute('aria-live', 'off');
        this.current.setAttribute('aria-hidden', 'false');
        this.current.innerText = '0:00';
        this.delimiter = document.createElement('span');
        this.delimiter.className = 'op-controls__time-delimiter';
        this.delimiter.setAttribute('aria-hidden', 'false');
        this.delimiter.innerText = '/';
        this.duration = document.createElement('time');
        this.duration.className = 'op-controls__duration';
        this.duration.setAttribute('aria-hidden', 'false');
        this.duration.innerText = '0:00';
        const setInitialTime = () => {
            const el = this.player.activeElement();
            if (el.duration !== Infinity && !this.player.getElement().getAttribute('op-live__enabled')) {
                const duration = !isNaN(el.duration) ? el.duration : 0;
                this.duration.innerText = formatTime(duration);
                this.current.innerText = formatTime(el.currentTime);
            }
            else {
                this.duration.setAttribute('aria-hidden', 'true');
                this.delimiter.setAttribute('aria-hidden', 'true');
            }
        };
        this.events.media.loadedmetadata = setInitialTime.bind(this);
        this.events.controls.controlschanged = setInitialTime.bind(this);
        const { showLabel: showLiveLabel } = this.player.getOptions().live;
        this.events.media.timeupdate = () => {
            const el = this.player.activeElement();
            if (el.duration !== Infinity && !this.player.getElement().getAttribute('op-live__enabled') &&
                !this.player.getElement().getAttribute('op-dvr__enabled')) {
                const duration = formatTime(el.duration);
                if (!isNaN(el.duration) && duration !== this.duration.innerText) {
                    this.duration.innerText = duration;
                    this.duration.setAttribute('aria-hidden', 'false');
                    this.delimiter.setAttribute('aria-hidden', 'false');
                }
                else if (duration !== this.duration.innerText) {
                    this.current.innerText = showLiveLabel ? this.labels.live : formatTime(el.currentTime);
                }
                this.current.innerText = formatTime(el.currentTime);
            }
            else if (this.player.getElement().getAttribute('op-dvr__enabled')) {
                this.duration.setAttribute('aria-hidden', 'true');
                this.delimiter.setAttribute('aria-hidden', 'true');
                this.current.innerText = formatTime(el.currentTime);
            }
            else if (!this.player.getElement().getAttribute('op-dvr__enabled') && this.duration.getAttribute('aria-hidden') === 'false') {
                this.duration.setAttribute('aria-hidden', 'true');
                this.delimiter.setAttribute('aria-hidden', 'true');
                this.current.innerText = showLiveLabel ? this.labels.live : formatTime(el.currentTime);
            }
            else {
                this.current.innerText = showLiveLabel ? this.labels.live : formatTime(el.currentTime);
            }
        };
        this.events.media.ended = () => {
            const el = this.player.activeElement();
            const duration = !isNaN(el.duration) ? el.duration : 0;
            if (this.player.isMedia()) {
                this.duration.innerText = formatTime(duration);
            }
        };
        Object.keys(this.events.media).forEach(event => {
            this.player.getElement().addEventListener(event, this.events.media[event], EVENT_OPTIONS);
        });
        this.player.getControls().getContainer().addEventListener('controlschanged', this.events.controls.controlschanged, EVENT_OPTIONS);
        const controls = this.player.getControls().getLayer(this.layer);
        this.container = document.createElement('span');
        this.container.className = `op-controls-time op-control__${this.position}`;
        this.container.appendChild(this.current);
        this.container.appendChild(this.delimiter);
        this.container.appendChild(this.duration);
        controls.appendChild(this.container);
    }
    destroy() {
        Object.keys(this.events.media).forEach(event => {
            this.player.getElement().removeEventListener(event, this.events.media[event]);
        });
        this.player.getControls().getContainer().removeEventListener('controlschanged', this.events.controls.controlschanged);
        removeElement(this.current);
        removeElement(this.delimiter);
        removeElement(this.duration);
        removeElement(this.container);
    }
}
export default Time;

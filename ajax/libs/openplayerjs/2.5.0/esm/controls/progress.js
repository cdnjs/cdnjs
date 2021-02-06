import { EVENT_OPTIONS, IS_ANDROID, IS_IOS } from '../utils/constants';
import { hasClass, offset, removeElement } from '../utils/general';
import { formatTime } from '../utils/time';
class Progress {
    constructor(player, position, layer) {
        this.events = {
            container: {},
            controls: {},
            global: {},
            media: {},
            slider: {},
        };
        this.player = player;
        this.labels = player.getOptions().labels;
        this.forcePause = false;
        this.position = position;
        this.layer = layer;
        return this;
    }
    create() {
        this.progress = document.createElement('div');
        this.progress.className = `op-controls__progress op-control__${this.position}`;
        this.progress.tabIndex = 0;
        this.progress.setAttribute('aria-label', this.labels.progressSlider);
        this.progress.setAttribute('aria-valuemin', '0');
        this.slider = document.createElement('input');
        this.slider.type = 'range';
        this.slider.className = 'op-controls__progress--seek';
        this.slider.tabIndex = -1;
        this.slider.setAttribute('min', '0');
        this.slider.setAttribute('max', '0');
        this.slider.setAttribute('step', '0.1');
        this.slider.value = '0';
        this.slider.setAttribute('aria-label', this.labels.progressRail);
        this.slider.setAttribute('role', 'slider');
        this.buffer = document.createElement('progress');
        this.buffer.className = 'op-controls__progress--buffer';
        this.buffer.setAttribute('max', '100');
        this.buffer.value = 0;
        this.played = document.createElement('progress');
        this.played.className = 'op-controls__progress--played';
        this.played.setAttribute('max', '100');
        this.played.setAttribute('role', 'presentation');
        this.played.value = 0;
        this.progress.appendChild(this.slider);
        this.progress.appendChild(this.played);
        this.progress.appendChild(this.buffer);
        if (!IS_IOS && !IS_ANDROID) {
            this.tooltip = document.createElement('span');
            this.tooltip.className = 'op-controls__tooltip';
            this.tooltip.tabIndex = -1;
            this.tooltip.innerHTML = '00:00';
            this.progress.appendChild(this.tooltip);
        }
        const setInitialProgress = () => {
            const el = this.player.activeElement();
            if (el.duration !== Infinity && !this.player.getElement().getAttribute('op-live__enabled') &&
                !this.player.getElement().getAttribute('op-dvr__enabled')) {
                this.slider.setAttribute('max', `${el.duration}`);
                const current = this.player.isMedia() ? el.currentTime : (el.duration - el.currentTime);
                this.slider.value = current.toString();
                this.progress.setAttribute('aria-valuemax', el.duration.toString());
            }
            else if (this.player.getElement().getAttribute('op-dvr__enabled')) {
                this.slider.setAttribute('max', '1');
                this.slider.value = '1';
                this.slider.style.backgroundSize = '100% 100%';
                this.played.value = 1;
                this.progress.setAttribute('aria-valuemax', '1');
                this.progress.setAttribute('aria-hidden', 'false');
            }
            else if (this.player.getElement().getAttribute('op-live__enabled') && !this.player.getOptions().live.showProgress) {
                this.progress.setAttribute('aria-hidden', 'true');
            }
        };
        let lastCurrentTime = 0;
        this.events.media.loadedmetadata = setInitialProgress.bind(this);
        this.events.controls.controlschanged = setInitialProgress.bind(this);
        this.events.media.progress = (e) => {
            const el = e.target;
            if (el.duration !== Infinity && !this.player.getElement().getAttribute('op-live__enabled')) {
                if (el.duration > 0) {
                    for (let i = 0, total = el.buffered.length; i < total; i++) {
                        if (el.buffered.start(el.buffered.length - 1 - i) < el.currentTime) {
                            this.buffer.value = (el.buffered.end(el.buffered.length - 1 - i) / el.duration) * 100;
                            break;
                        }
                    }
                }
            }
            else if (!this.player.getElement().getAttribute('op-dvr__enabled') && this.progress.getAttribute('aria-hidden') === 'false') {
                this.progress.setAttribute('aria-hidden', 'true');
            }
        };
        this.events.media.pause = () => {
            const el = this.player.activeElement();
            if (el.duration !== Infinity && !this.player.getElement().getAttribute('op-live__enabled')) {
                const current = el.currentTime;
                this.progress.setAttribute('aria-valuenow', current.toString());
                this.progress.setAttribute('aria-valuetext', formatTime(current));
            }
        };
        this.events.media.play = () => {
            if (this.player.activeElement().duration !== Infinity && !this.player.getElement().getAttribute('op-live__enabled')) {
                this.progress.removeAttribute('aria-valuenow');
                this.progress.removeAttribute('aria-valuetext');
            }
        };
        this.events.media.timeupdate = () => {
            const el = this.player.activeElement();
            if (el.duration !== Infinity &&
                (!this.player.getElement().getAttribute('op-live__enabled') || this.player.getElement().getAttribute('op-dvr__enabled'))) {
                if (!this.slider.getAttribute('max') || this.slider.getAttribute('max') === '0' ||
                    parseFloat(this.slider.getAttribute('max') || '-1') !== el.duration) {
                    this.slider.setAttribute('max', `${el.duration}`);
                    this.progress.setAttribute('aria-hidden', 'false');
                }
                const current = this.player.isMedia() ? el.currentTime :
                    ((el.duration - el.currentTime) + 1 >= 100 ? 100 :
                        (el.duration - el.currentTime) + 1);
                const min = parseFloat(this.slider.min);
                const max = parseFloat(this.slider.max);
                this.slider.value = current.toString();
                this.slider.style.backgroundSize = `${(current - min) * 100 / (max - min)}% 100%`;
                this.played.value = el.duration <= 0 || isNaN(el.duration) || !isFinite(el.duration) ?
                    0 : ((current / el.duration) * 100);
                if (this.player.getElement().getAttribute('op-dvr__enabled') && Math.floor(this.played.value) >= 99) {
                    lastCurrentTime = el.currentTime;
                    this.progress.setAttribute('aria-hidden', 'false');
                }
            }
            else if (!this.player.getElement().getAttribute('op-dvr__enabled') && this.progress.getAttribute('aria-hidden') === 'false') {
                this.progress.setAttribute('aria-hidden', 'true');
            }
        };
        this.events.media.durationchange = () => {
            const el = this.player.activeElement();
            const current = this.player.isMedia() ? el.currentTime : (el.duration - el.currentTime);
            this.slider.setAttribute('max', `${el.duration}`);
            this.progress.setAttribute('aria-valuemax', el.duration.toString());
            this.played.value = el.duration <= 0 || isNaN(el.duration) || !isFinite(el.duration) ?
                0 : ((current / el.duration) * 100);
        };
        this.events.media.ended = () => {
            this.slider.style.backgroundSize = '0% 100%';
            this.slider.setAttribute('max', '0');
            this.buffer.value = 0;
            this.played.value = 0;
        };
        const updateSlider = (e) => {
            if (hasClass(this.slider, 'op-progress--pressed')) {
                return;
            }
            const target = e.target;
            this.slider.classList.add('.op-progress--pressed');
            const el = this.player.activeElement();
            const min = parseFloat(target.min);
            const max = parseFloat(target.max);
            const val = parseFloat(target.value);
            this.slider.style.backgroundSize = `${(val - min) * 100 / (max - min)}% 100%`;
            this.played.value = el.duration <= 0 || isNaN(el.duration) || !isFinite(el.duration) ?
                0 : ((val / el.duration) * 100);
            if (this.player.getElement().getAttribute('op-dvr__enabled')) {
                el.currentTime = (Math.round(this.played.value) >= 99) ? lastCurrentTime : val;
            }
            else {
                el.currentTime = val;
            }
            this.slider.classList.remove('.op-progress--pressed');
            e.preventDefault();
        };
        const forcePause = (e) => {
            const el = this.player.activeElement();
            if ((e.which === 1 || e.which === 0) && this.player.isMedia()) {
                if (!el.paused) {
                    el.play().then(() => {
                        el.pause.bind(this);
                        this.forcePause = true;
                    });
                }
            }
        };
        const releasePause = () => {
            const el = this.player.activeElement();
            if (this.forcePause === true && this.player.isMedia()) {
                if (el.paused) {
                    el.play();
                    this.forcePause = false;
                }
            }
        };
        const mobileForcePause = (e) => {
            const el = this.player.activeElement();
            if (el.duration === Infinity) {
                return true;
            }
            const changedTouches = e.originalEvent ? e.originalEvent.changedTouches : e.changedTouches;
            const x = changedTouches ? changedTouches[0].pageX : e.pageX;
            const pos = x - offset(this.progress).left;
            const percentage = (pos / this.progress.offsetWidth);
            const time = percentage * el.duration;
            this.slider.value = time.toString();
            updateSlider(e);
            forcePause(e);
            e.preventDefault();
        };
        this.events.slider.input = updateSlider.bind(this);
        this.events.slider.change = updateSlider.bind(this);
        this.events.slider.mousedown = forcePause.bind(this);
        this.events.slider.mouseup = releasePause.bind(this);
        this.events.slider.touchstart = mobileForcePause.bind(this);
        this.events.slider.touchend = releasePause.bind(this);
        if (!IS_IOS && !IS_ANDROID) {
            this.events.container.mousemove = (e) => {
                const el = this.player.activeElement();
                if (el.duration === Infinity || this.player.isAd()) {
                    return true;
                }
                const x = (e.originalEvent && e.originalEvent.changedTouches) ?
                    e.originalEvent.changedTouches[0].pageX : e.pageX;
                let pos = x - offset(this.progress).left;
                const half = this.tooltip.offsetWidth / 2;
                const percentage = (pos / this.progress.offsetWidth);
                const time = percentage * el.duration;
                const mediaContainer = this.player.getContainer();
                const limit = mediaContainer.offsetWidth - this.tooltip.offsetWidth;
                if (pos <= 0 || x - offset(mediaContainer).left <= half) {
                    pos = 0;
                }
                else if (x - offset(mediaContainer).left >= limit) {
                    pos = limit - offset(this.slider).left - 10;
                }
                else {
                    pos -= half;
                }
                if (percentage >= 0 && percentage <= 1) {
                    this.tooltip.classList.add('op-controls__tooltip--visible');
                }
                else {
                    this.tooltip.classList.remove('op-controls__tooltip--visible');
                }
                this.tooltip.style.left = `${pos}px`;
                this.tooltip.innerHTML = isNaN(time) ? '00:00' : formatTime(time);
            };
            this.events.global.mousemove = (e) => {
                if (!e.target.closest('.op-controls__progress') || this.player.isAd()) {
                    this.tooltip.classList.remove('op-controls__tooltip--visible');
                }
            };
        }
        Object.keys(this.events.media).forEach(event => {
            this.player.getElement().addEventListener(event, this.events.media[event], EVENT_OPTIONS);
        });
        Object.keys(this.events.slider).forEach(event => {
            this.slider.addEventListener(event, this.events.slider[event], EVENT_OPTIONS);
        });
        this.progress.addEventListener('keydown', this.player.getEvents().keydown, EVENT_OPTIONS);
        this.progress.addEventListener('mousemove', this.events.container.mousemove, EVENT_OPTIONS);
        document.addEventListener('mousemove', this.events.global.mousemove, EVENT_OPTIONS);
        this.player.getContainer().addEventListener('keydown', this._keydownEvent.bind(this), EVENT_OPTIONS);
        this.player.getControls().getContainer().addEventListener('controlschanged', this.events.controls.controlschanged, EVENT_OPTIONS);
        this.player.getControls().getLayer(this.layer).appendChild(this.progress);
    }
    destroy() {
        Object.keys(this.events).forEach(event => {
            this.player.getElement().removeEventListener(event, this.events[event]);
        });
        Object.keys(this.events.slider).forEach(event => {
            this.slider.removeEventListener(event, this.events.slider[event]);
        });
        this.progress.removeEventListener('keydown', this.player.getEvents().keydown);
        this.progress.removeEventListener('mousemove', this.events.container.mousemove);
        document.removeEventListener('mousemove', this.events.global.mousemove);
        this.player.getContainer().removeEventListener('keydown', this._keydownEvent.bind(this));
        this.player.getControls().getContainer().removeEventListener('controlschanged', this.events.controls.controlschanged);
        removeElement(this.buffer);
        removeElement(this.played);
        removeElement(this.slider);
        if (!IS_IOS && !IS_ANDROID) {
            removeElement(this.tooltip);
        }
        removeElement(this.progress);
    }
    _keydownEvent(e) {
        const el = this.player.activeElement();
        const isAd = this.player.isAd();
        const key = e.which || e.keyCode || 0;
        const newStep = this.player.getOptions().step ? this.player.getOptions().step : el.duration * 0.05;
        const step = el.duration !== Infinity ? newStep : 0;
        if (key === 35 && !isAd) {
            el.currentTime = el.duration;
            e.preventDefault();
        }
        else if (key === 36 && !isAd) {
            el.currentTime = 0;
            e.preventDefault();
        }
        else if ((key === 37 || key === 39) && !isAd && el.duration !== Infinity) {
            el.currentTime += key === 37 ? (step * -1) : step;
            if (el.currentTime < 0) {
                el.currentTime = 0;
            }
            else if (el.currentTime >= el.duration) {
                el.currentTime = el.duration;
            }
            e.preventDefault();
        }
    }
}
export default Progress;

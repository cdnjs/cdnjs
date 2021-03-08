import { EVENT_OPTIONS, IS_ANDROID, IS_IOS } from '../utils/constants';
import { addEvent } from '../utils/events';
import { isAudio, removeElement } from '../utils/general';
class Volume {
    constructor(player, position, layer) {
        this.events = {
            button: {},
            media: {},
            slider: {},
        };
        this.player = player;
        this.labels = player.getOptions().labels;
        this.volume = this.player.getMedia().volume;
        this.position = position;
        this.layer = layer;
        return this;
    }
    create() {
        this.container = document.createElement('div');
        this.container.className = `op-controls__volume op-control__${this.position}`;
        this.container.tabIndex = 0;
        this.container.setAttribute('aria-valuemin', '0');
        this.container.setAttribute('aria-valuemax', '100');
        this.container.setAttribute('aria-valuenow', `${this.volume}`);
        this.container.setAttribute('aria-valuetext', `${this.labels.volume}: ${this.volume}`);
        this.container.setAttribute('aria-orientation', 'vertical');
        this.container.setAttribute('aria-label', this.labels.volumeSlider);
        this.slider = document.createElement('input');
        this.slider.type = 'range';
        this.slider.className = 'op-controls__volume--input';
        this.slider.tabIndex = -1;
        this.slider.value = this.player.getMedia().volume.toString();
        this.slider.setAttribute('min', '0');
        this.slider.setAttribute('max', '1');
        this.slider.setAttribute('step', '0.1');
        this.slider.setAttribute('aria-label', this.labels.volumeControl);
        this.display = document.createElement('progress');
        this.display.className = 'op-controls__volume--display';
        this.display.setAttribute('max', '10');
        this.display.setAttribute('role', 'presentation');
        this.display.value = this.player.getMedia().volume * 10;
        this.container.appendChild(this.slider);
        this.container.appendChild(this.display);
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.className = 'op-controls__mute';
        this.button.tabIndex = 0;
        this.button.title = this.labels.mute;
        this.button.setAttribute('aria-controls', this.player.id);
        this.button.setAttribute('aria-pressed', 'false');
        this.button.setAttribute('aria-label', this.labels.mute);
        this.button.innerHTML = `<span class="op-sr">${this.labels.mute}</span>`;
        const updateSlider = (element) => {
            const mediaVolume = element.volume * 1;
            const vol = Math.floor(mediaVolume * 100);
            this.slider.value = `${element.volume}`;
            this.display.value = (mediaVolume * 10);
            this.container.setAttribute('aria-valuenow', `${vol}`);
            this.container.setAttribute('aria-valuetext', `${this.labels.volume}: ${vol}`);
        };
        const updateButton = (element) => {
            const vol = element.volume;
            if (vol <= 0.5 && vol > 0) {
                this.button.classList.remove('op-controls__mute--muted');
                this.button.classList.add('op-controls__mute--half');
            }
            else if (vol === 0) {
                this.button.classList.add('op-controls__mute--muted');
                this.button.classList.remove('op-controls__mute--half');
            }
            else {
                this.button.classList.remove('op-controls__mute--muted');
                this.button.classList.remove('op-controls__mute--half');
            }
        };
        const updateVolume = (event) => {
            const el = this.player.activeElement();
            const value = parseFloat(event.target.value);
            el.volume = value;
            el.muted = (el.volume === 0);
            this.volume = value;
            const unmuteEl = this.player.getContainer().querySelector('.op-player__unmute');
            if (!el.muted && unmuteEl) {
                removeElement(unmuteEl);
            }
            const e = addEvent('volumechange');
            this.player.getElement().dispatchEvent(e);
        };
        this.events.media.volumechange = () => {
            const el = this.player.activeElement();
            updateSlider(el);
            updateButton(el);
        };
        this.events.media.timeupdate = () => {
            if (isAudio(this.player.getElement()) && (this.player.activeElement().duration === Infinity ||
                this.player.getElement().getAttribute('op-live__enabled'))) {
                this.button.classList.add('op-control__right');
            }
        };
        this.events.media.loadedmetadata = () => {
            const el = this.player.activeElement();
            if (el.muted) {
                el.volume = 0;
            }
            const e = addEvent('volumechange');
            this.player.getElement().dispatchEvent(e);
        };
        this.events.slider.input = updateVolume.bind(this);
        this.events.slider.change = updateVolume.bind(this);
        this.events.button.click = () => {
            this.button.setAttribute('aria-pressed', 'true');
            const el = this.player.activeElement();
            el.muted = !el.muted;
            if (el.muted) {
                el.volume = 0;
                this.button.title = this.labels.unmute;
                this.button.setAttribute('aria-label', this.labels.unmute);
            }
            else {
                el.volume = this.volume;
                this.button.title = this.labels.mute;
                this.button.setAttribute('aria-label', this.labels.mute);
            }
            const event = addEvent('volumechange');
            this.player.getElement().dispatchEvent(event);
        };
        this.button.addEventListener('click', this.events.button.click, EVENT_OPTIONS);
        Object.keys(this.events.media).forEach(event => {
            this.player.getElement().addEventListener(event, this.events.media[event], EVENT_OPTIONS);
        });
        Object.keys(this.events.slider).forEach(event => {
            this.slider.addEventListener(event, this.events.slider[event], EVENT_OPTIONS);
        });
        this.player.getContainer().addEventListener('keydown', this._keydownEvent.bind(this), EVENT_OPTIONS);
        if (!IS_ANDROID && !IS_IOS) {
            const controls = this.player.getControls().getLayer(this.layer);
            controls.appendChild(this.button);
            controls.appendChild(this.container);
        }
    }
    destroy() {
        this.button.removeEventListener('click', this.events.button.click);
        Object.keys(this.events.media).forEach(event => {
            this.player.getElement().removeEventListener(event, this.events.media[event]);
        });
        Object.keys(this.events.slider).forEach(event => {
            this.slider.removeEventListener(event, this.events.slider[event]);
        });
        this.player.getContainer().removeEventListener('keydown', this._keydownEvent.bind(this));
        removeElement(this.slider);
        removeElement(this.display);
        removeElement(this.container);
    }
    _keydownEvent(e) {
        const key = e.which || e.keyCode || 0;
        const el = this.player.activeElement();
        if (key === 38 || key === 40) {
            const newVol = key === 38 ? Math.min(el.volume + 0.1, 1) : Math.max(el.volume - 0.1, 0);
            el.volume = newVol;
            el.muted = !(newVol > 0);
            e.preventDefault();
        }
    }
}
export default Volume;

import Player from '../player';
import { EVENT_OPTIONS } from '../utils/constants';
import { addEvent } from '../utils/events';
import { hasClass, removeElement } from '../utils/general';
class Play {
    constructor(player, position, layer) {
        this.events = {
            controls: {},
            media: {},
        };
        this.player = player;
        this.labels = this.player.getOptions().labels;
        this.position = position;
        this.layer = layer;
        return this;
    }
    create() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.className = `op-controls__playpause op-control__${this.position}`;
        this.button.tabIndex = 0;
        this.button.title = this.labels.play;
        this.button.setAttribute('aria-controls', this.player.id);
        this.button.setAttribute('aria-pressed', 'false');
        this.button.setAttribute('aria-label', this.labels.play);
        this.button.innerHTML = `<span class="op-sr">${this.labels.play}/${this.labels.pause}</span>`;
        this.player.getControls().getLayer(this.layer).appendChild(this.button);
        this.events.media.click = (e) => {
            this.button.setAttribute('aria-pressed', 'true');
            const el = this.player.activeElement();
            if (el.paused || el.ended) {
                if (this.player.adsInstance) {
                    this.player.adsInstance.playRequested = true;
                }
                el.play();
            }
            else {
                el.pause();
            }
            e.preventDefault();
        };
        this.events.media.play = () => {
            if (this.player.activeElement().ended) {
                if (this.player.isMedia()) {
                    this.button.classList.add('op-controls__playpause--replay');
                }
                else {
                    this.button.classList.add('op-controls__playpause--pause');
                }
                this.button.title = this.labels.play;
                this.button.setAttribute('aria-label', this.labels.play);
            }
            else {
                this.button.classList.remove('op-controls__playpause--replay');
                this.button.classList.add('op-controls__playpause--pause');
                this.button.title = this.labels.pause;
                this.button.setAttribute('aria-label', this.labels.pause);
                Object.keys(Player.instances).forEach(key => {
                    if (key !== this.player.id) {
                        const target = Player.instances[key].activeElement();
                        target.pause();
                    }
                });
            }
        };
        this.events.media.loadedmetadata = () => {
            if (hasClass(this.button, 'op-controls__playpause--pause')) {
                this.button.classList.remove('op-controls__playpause--replay');
                this.button.classList.remove('op-controls__playpause--pause');
                this.button.title = this.labels.play;
                this.button.setAttribute('aria-label', this.labels.play);
            }
        };
        this.events.media.playing = () => {
            if (!hasClass(this.button, 'op-controls__playpause--pause')) {
                this.button.classList.remove('op-controls__playpause--replay');
                this.button.classList.add('op-controls__playpause--pause');
                this.button.title = this.labels.pause;
                this.button.setAttribute('aria-label', this.labels.pause);
            }
        };
        this.events.media.pause = () => {
            this.button.classList.remove('op-controls__playpause--pause');
            this.button.title = this.labels.play;
            this.button.setAttribute('aria-label', this.labels.play);
        };
        this.events.media.ended = () => {
            if (this.player.activeElement().ended && this.player.isMedia()) {
                this.button.classList.add('op-controls__playpause--replay');
                this.button.classList.remove('op-controls__playpause--pause');
            }
            else if (this.player.getElement().currentTime >= this.player.getElement().duration ||
                this.player.getElement().currentTime <= 0) {
                this.button.classList.add('op-controls__playpause--replay');
                this.button.classList.remove('op-controls__playpause--pause');
            }
            else {
                this.button.classList.remove('op-controls__playpause--replay');
                this.button.classList.add('op-controls__playpause--pause');
            }
            this.button.title = this.labels.play;
            this.button.setAttribute('aria-label', this.labels.play);
        };
        this.events.media['adsmediaended'] = () => {
            this.button.classList.remove('op-controls__playpause--replay');
            this.button.classList.add('op-controls__playpause--pause');
            this.button.title = this.labels.pause;
            this.button.setAttribute('aria-label', this.labels.pause);
        };
        const element = this.player.getElement();
        this.events.controls.controlschanged = () => {
            if (!this.player.activeElement().paused) {
                const event = addEvent('playing');
                element.dispatchEvent(event);
            }
        };
        Object.keys(this.events.media).forEach(event => {
            element.addEventListener(event, this.events.media[event], EVENT_OPTIONS);
        });
        this.player.getControls().getContainer().addEventListener('controlschanged', this.events.controls.controlschanged, EVENT_OPTIONS);
        this.player.getContainer().addEventListener('keydown', this._keydownEvent.bind(this), EVENT_OPTIONS);
        this.button.addEventListener('click', this.events.media.click, EVENT_OPTIONS);
    }
    destroy() {
        Object.keys(this.events.media).forEach(event => {
            this.player.getElement().removeEventListener(event, this.events.media[event]);
        });
        this.player.getControls().getContainer().removeEventListener('controlschanged', this.events.controls.controlschanged);
        this.player.getContainer().removeEventListener('keydown', this._keydownEvent.bind(this));
        this.button.removeEventListener('click', this.events.media.click);
        removeElement(this.button);
    }
    _keydownEvent(e) {
        const key = e.which || e.keyCode || 0;
        const el = this.player.activeElement();
        if (key === 13 || key === 32) {
            if (el.paused) {
                el.play();
            }
            else {
                el.pause();
            }
            e.preventDefault();
        }
    }
}
export default Play;

var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _player, _button, _container, _display, _slider, _events, _volume, _labels, _position, _layer;
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS } from '../utils/constants';
import { addEvent } from '../utils/events';
import { isAudio, removeElement } from '../utils/general';
class Volume {
    constructor(player, position, layer) {
        _player.set(this, void 0);
        _button.set(this, void 0);
        _container.set(this, void 0);
        _display.set(this, void 0);
        _slider.set(this, void 0);
        _events.set(this, {
            button: {},
            media: {},
            slider: {},
        });
        _volume.set(this, void 0);
        _labels.set(this, void 0);
        _position.set(this, void 0);
        _layer.set(this, void 0);
        __classPrivateFieldSet(this, _player, player);
        __classPrivateFieldSet(this, _labels, player.getOptions().labels);
        __classPrivateFieldSet(this, _volume, __classPrivateFieldGet(this, _player).getMedia().volume);
        __classPrivateFieldSet(this, _position, position);
        __classPrivateFieldSet(this, _layer, layer);
        return this;
    }
    create() {
        __classPrivateFieldSet(this, _container, document.createElement('div'));
        __classPrivateFieldGet(this, _container).className = `op-controls__volume op-control__${__classPrivateFieldGet(this, _position)}`;
        __classPrivateFieldGet(this, _container).tabIndex = 0;
        __classPrivateFieldGet(this, _container).setAttribute('aria-valuemin', '0');
        __classPrivateFieldGet(this, _container).setAttribute('aria-valuemax', '100');
        __classPrivateFieldGet(this, _container).setAttribute('aria-valuenow', `${__classPrivateFieldGet(this, _volume)}`);
        __classPrivateFieldGet(this, _container).setAttribute('aria-valuetext', `${__classPrivateFieldGet(this, _labels).volume}: ${__classPrivateFieldGet(this, _volume)}`);
        __classPrivateFieldGet(this, _container).setAttribute('aria-orientation', 'vertical');
        __classPrivateFieldGet(this, _container).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).volumeSlider);
        __classPrivateFieldSet(this, _slider, document.createElement('input'));
        __classPrivateFieldGet(this, _slider).type = 'range';
        __classPrivateFieldGet(this, _slider).className = 'op-controls__volume--input';
        __classPrivateFieldGet(this, _slider).tabIndex = -1;
        __classPrivateFieldGet(this, _slider).value = __classPrivateFieldGet(this, _player).getMedia().volume.toString();
        __classPrivateFieldGet(this, _slider).setAttribute('min', '0');
        __classPrivateFieldGet(this, _slider).setAttribute('max', '1');
        __classPrivateFieldGet(this, _slider).setAttribute('step', '0.1');
        __classPrivateFieldGet(this, _slider).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).volumeControl);
        __classPrivateFieldSet(this, _display, document.createElement('progress'));
        __classPrivateFieldGet(this, _display).className = 'op-controls__volume--display';
        __classPrivateFieldGet(this, _display).setAttribute('max', '10');
        __classPrivateFieldGet(this, _display).setAttribute('role', 'presentation');
        __classPrivateFieldGet(this, _display).value = __classPrivateFieldGet(this, _player).getMedia().volume * 10;
        __classPrivateFieldGet(this, _container).appendChild(__classPrivateFieldGet(this, _slider));
        __classPrivateFieldGet(this, _container).appendChild(__classPrivateFieldGet(this, _display));
        __classPrivateFieldSet(this, _button, document.createElement('button'));
        __classPrivateFieldGet(this, _button).type = 'button';
        __classPrivateFieldGet(this, _button).className = `op-controls__mute op-control__${__classPrivateFieldGet(this, _position)}`;
        __classPrivateFieldGet(this, _button).tabIndex = 0;
        __classPrivateFieldGet(this, _button).title = __classPrivateFieldGet(this, _labels).mute;
        __classPrivateFieldGet(this, _button).setAttribute('aria-controls', __classPrivateFieldGet(this, _player).id);
        __classPrivateFieldGet(this, _button).setAttribute('aria-pressed', 'false');
        __classPrivateFieldGet(this, _button).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).mute);
        __classPrivateFieldGet(this, _button).innerHTML = `<span class="op-sr">${__classPrivateFieldGet(this, _labels).mute}</span>`;
        const updateSlider = (element) => {
            const mediaVolume = element.volume * 1;
            const vol = Math.floor(mediaVolume * 100);
            __classPrivateFieldGet(this, _slider).value = `${element.volume}`;
            __classPrivateFieldGet(this, _display).value = (mediaVolume * 10);
            __classPrivateFieldGet(this, _container).setAttribute('aria-valuenow', `${vol}`);
            __classPrivateFieldGet(this, _container).setAttribute('aria-valuetext', `${__classPrivateFieldGet(this, _labels).volume}: ${vol}`);
        };
        const updateButton = (element) => {
            const vol = element.volume;
            if (vol <= 0.5 && vol > 0) {
                __classPrivateFieldGet(this, _button).classList.remove('op-controls__mute--muted');
                __classPrivateFieldGet(this, _button).classList.add('op-controls__mute--half');
            }
            else if (vol === 0) {
                __classPrivateFieldGet(this, _button).classList.add('op-controls__mute--muted');
                __classPrivateFieldGet(this, _button).classList.remove('op-controls__mute--half');
            }
            else {
                __classPrivateFieldGet(this, _button).classList.remove('op-controls__mute--muted');
                __classPrivateFieldGet(this, _button).classList.remove('op-controls__mute--half');
            }
        };
        const updateVolume = (event) => {
            const el = __classPrivateFieldGet(this, _player).activeElement();
            const value = parseFloat(event.target.value);
            el.volume = value;
            el.muted = (el.volume === 0);
            __classPrivateFieldSet(this, _volume, value);
            const unmuteEl = __classPrivateFieldGet(this, _player).getContainer().querySelector('.op-player__unmute');
            if (!el.muted && unmuteEl) {
                removeElement(unmuteEl);
            }
            const e = addEvent('volumechange');
            __classPrivateFieldGet(this, _player).getElement().dispatchEvent(e);
        };
        __classPrivateFieldGet(this, _events).media.volumechange = () => {
            const el = __classPrivateFieldGet(this, _player).activeElement();
            updateSlider(el);
            updateButton(el);
        };
        __classPrivateFieldGet(this, _events).media.timeupdate = () => {
            if (isAudio(__classPrivateFieldGet(this, _player).getElement()) && (__classPrivateFieldGet(this, _player).activeElement().duration === Infinity ||
                __classPrivateFieldGet(this, _player).getElement().getAttribute('op-live__enabled'))) {
            }
        };
        __classPrivateFieldGet(this, _events).media.loadedmetadata = () => {
            const el = __classPrivateFieldGet(this, _player).activeElement();
            if (el.muted) {
                el.volume = 0;
            }
            const e = addEvent('volumechange');
            __classPrivateFieldGet(this, _player).getElement().dispatchEvent(e);
        };
        __classPrivateFieldGet(this, _events).slider.input = updateVolume.bind(this);
        __classPrivateFieldGet(this, _events).slider.change = updateVolume.bind(this);
        __classPrivateFieldGet(this, _events).button.click = () => {
            __classPrivateFieldGet(this, _button).setAttribute('aria-pressed', 'true');
            const el = __classPrivateFieldGet(this, _player).activeElement();
            el.muted = !el.muted;
            if (el.muted) {
                el.volume = 0;
                __classPrivateFieldGet(this, _button).title = __classPrivateFieldGet(this, _labels).unmute;
                __classPrivateFieldGet(this, _button).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).unmute);
            }
            else {
                el.volume = __classPrivateFieldGet(this, _volume);
                __classPrivateFieldGet(this, _button).title = __classPrivateFieldGet(this, _labels).mute;
                __classPrivateFieldGet(this, _button).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).mute);
            }
            const event = addEvent('volumechange');
            __classPrivateFieldGet(this, _player).getElement().dispatchEvent(event);
        };
        __classPrivateFieldGet(this, _button).addEventListener('click', __classPrivateFieldGet(this, _events).button.click, EVENT_OPTIONS);
        Object.keys(__classPrivateFieldGet(this, _events).media).forEach(event => {
            __classPrivateFieldGet(this, _player).getElement().addEventListener(event, __classPrivateFieldGet(this, _events).media[event], EVENT_OPTIONS);
        });
        Object.keys(__classPrivateFieldGet(this, _events).slider).forEach(event => {
            __classPrivateFieldGet(this, _slider).addEventListener(event, __classPrivateFieldGet(this, _events).slider[event], EVENT_OPTIONS);
        });
        __classPrivateFieldGet(this, _player).getContainer().addEventListener('keydown', this._keydownEvent.bind(this), EVENT_OPTIONS);
        if (!IS_ANDROID && !IS_IOS) {
            const controls = __classPrivateFieldGet(this, _player).getControls().getLayer(__classPrivateFieldGet(this, _layer));
            controls.appendChild(__classPrivateFieldGet(this, _button));
            controls.appendChild(__classPrivateFieldGet(this, _container));
        }
    }
    destroy() {
        __classPrivateFieldGet(this, _button).removeEventListener('click', __classPrivateFieldGet(this, _events).button.click);
        Object.keys(__classPrivateFieldGet(this, _events).media).forEach(event => {
            __classPrivateFieldGet(this, _player).getElement().removeEventListener(event, __classPrivateFieldGet(this, _events).media[event]);
        });
        Object.keys(__classPrivateFieldGet(this, _events).slider).forEach(event => {
            __classPrivateFieldGet(this, _slider).removeEventListener(event, __classPrivateFieldGet(this, _events).slider[event]);
        });
        __classPrivateFieldGet(this, _player).getContainer().removeEventListener('keydown', this._keydownEvent.bind(this));
        removeElement(__classPrivateFieldGet(this, _slider));
        removeElement(__classPrivateFieldGet(this, _display));
        removeElement(__classPrivateFieldGet(this, _container));
    }
    _keydownEvent(e) {
        const key = e.which || e.keyCode || 0;
        const el = __classPrivateFieldGet(this, _player).activeElement();
        if (key === 38 || key === 40) {
            const newVol = key === 38 ? Math.min(el.volume + 0.1, 1) : Math.max(el.volume - 0.1, 0);
            el.volume = newVol;
            el.muted = !(newVol > 0);
            e.preventDefault();
        }
    }
}
_player = new WeakMap(), _button = new WeakMap(), _container = new WeakMap(), _display = new WeakMap(), _slider = new WeakMap(), _events = new WeakMap(), _volume = new WeakMap(), _labels = new WeakMap(), _position = new WeakMap(), _layer = new WeakMap();
export default Volume;

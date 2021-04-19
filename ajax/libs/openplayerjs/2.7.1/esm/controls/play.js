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
var _player, _button, _events, _labels, _position, _layer;
import Player from '../player';
import { EVENT_OPTIONS } from '../utils/constants';
import { addEvent } from '../utils/events';
import { hasClass, isAudio, removeElement } from '../utils/general';
class Play {
    constructor(player, position, layer) {
        _player.set(this, void 0);
        _button.set(this, void 0);
        _events.set(this, {
            controls: {},
            media: {},
        });
        _labels.set(this, void 0);
        _position.set(this, void 0);
        _layer.set(this, void 0);
        __classPrivateFieldSet(this, _player, player);
        __classPrivateFieldSet(this, _labels, __classPrivateFieldGet(this, _player).getOptions().labels);
        __classPrivateFieldSet(this, _position, position);
        __classPrivateFieldSet(this, _layer, layer);
        return this;
    }
    create() {
        __classPrivateFieldSet(this, _button, document.createElement('button'));
        __classPrivateFieldGet(this, _button).type = 'button';
        __classPrivateFieldGet(this, _button).className = `op-controls__playpause op-control__${__classPrivateFieldGet(this, _position)}`;
        __classPrivateFieldGet(this, _button).tabIndex = 0;
        __classPrivateFieldGet(this, _button).title = __classPrivateFieldGet(this, _labels).play;
        __classPrivateFieldGet(this, _button).setAttribute('aria-controls', __classPrivateFieldGet(this, _player).id);
        __classPrivateFieldGet(this, _button).setAttribute('aria-pressed', 'false');
        __classPrivateFieldGet(this, _button).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).play);
        __classPrivateFieldGet(this, _button).innerHTML = `<span class="op-sr">${__classPrivateFieldGet(this, _labels).play}/${__classPrivateFieldGet(this, _labels).pause}</span>`;
        __classPrivateFieldGet(this, _player).getControls().getLayer(__classPrivateFieldGet(this, _layer)).appendChild(__classPrivateFieldGet(this, _button));
        __classPrivateFieldGet(this, _events).media.click = (e) => {
            __classPrivateFieldGet(this, _button).setAttribute('aria-pressed', 'true');
            const el = __classPrivateFieldGet(this, _player).activeElement();
            if (el.paused || el.ended) {
                if (__classPrivateFieldGet(this, _player).getAd()) {
                    __classPrivateFieldGet(this, _player).getAd().playRequested = true;
                }
                el.play();
            }
            else {
                el.pause();
            }
            e.preventDefault();
        };
        const isAudioEl = isAudio(__classPrivateFieldGet(this, _player).getElement());
        __classPrivateFieldGet(this, _events).media.play = () => {
            if (__classPrivateFieldGet(this, _player).activeElement().ended) {
                if (__classPrivateFieldGet(this, _player).isMedia()) {
                    __classPrivateFieldGet(this, _button).classList.add('op-controls__playpause--replay');
                }
                else {
                    __classPrivateFieldGet(this, _button).classList.add('op-controls__playpause--pause');
                }
                __classPrivateFieldGet(this, _button).title = __classPrivateFieldGet(this, _labels).play;
                __classPrivateFieldGet(this, _button).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).play);
            }
            else {
                __classPrivateFieldGet(this, _button).classList.remove('op-controls__playpause--replay');
                __classPrivateFieldGet(this, _button).classList.add('op-controls__playpause--pause');
                __classPrivateFieldGet(this, _button).title = __classPrivateFieldGet(this, _labels).pause;
                __classPrivateFieldGet(this, _button).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).pause);
                Object.keys(Player.instances).forEach(key => {
                    if (key !== __classPrivateFieldGet(this, _player).id) {
                        const target = Player.instances[key].activeElement();
                        target.pause();
                    }
                });
            }
        };
        __classPrivateFieldGet(this, _events).media.loadedmetadata = () => {
            if (hasClass(__classPrivateFieldGet(this, _button), 'op-controls__playpause--pause')) {
                __classPrivateFieldGet(this, _button).classList.remove('op-controls__playpause--replay');
                __classPrivateFieldGet(this, _button).classList.remove('op-controls__playpause--pause');
                __classPrivateFieldGet(this, _button).title = __classPrivateFieldGet(this, _labels).play;
                __classPrivateFieldGet(this, _button).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).play);
            }
        };
        __classPrivateFieldGet(this, _events).media.playing = () => {
            if (!hasClass(__classPrivateFieldGet(this, _button), 'op-controls__playpause--pause')) {
                __classPrivateFieldGet(this, _button).classList.remove('op-controls__playpause--replay');
                __classPrivateFieldGet(this, _button).classList.add('op-controls__playpause--pause');
                __classPrivateFieldGet(this, _button).title = __classPrivateFieldGet(this, _labels).pause;
                __classPrivateFieldGet(this, _button).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).pause);
            }
        };
        __classPrivateFieldGet(this, _events).media.pause = () => {
            __classPrivateFieldGet(this, _button).classList.remove('op-controls__playpause--pause');
            __classPrivateFieldGet(this, _button).title = __classPrivateFieldGet(this, _labels).play;
            __classPrivateFieldGet(this, _button).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).play);
        };
        __classPrivateFieldGet(this, _events).media.ended = () => {
            if (__classPrivateFieldGet(this, _player).activeElement().ended && __classPrivateFieldGet(this, _player).isMedia()) {
                __classPrivateFieldGet(this, _button).classList.add('op-controls__playpause--replay');
                __classPrivateFieldGet(this, _button).classList.remove('op-controls__playpause--pause');
            }
            else if (__classPrivateFieldGet(this, _player).getElement().currentTime >= __classPrivateFieldGet(this, _player).getElement().duration ||
                __classPrivateFieldGet(this, _player).getElement().currentTime <= 0) {
                __classPrivateFieldGet(this, _button).classList.add('op-controls__playpause--replay');
                __classPrivateFieldGet(this, _button).classList.remove('op-controls__playpause--pause');
            }
            else {
                __classPrivateFieldGet(this, _button).classList.remove('op-controls__playpause--replay');
                __classPrivateFieldGet(this, _button).classList.add('op-controls__playpause--pause');
            }
            __classPrivateFieldGet(this, _button).title = __classPrivateFieldGet(this, _labels).play;
            __classPrivateFieldGet(this, _button).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).play);
        };
        __classPrivateFieldGet(this, _events).media.adsmediaended = () => {
            __classPrivateFieldGet(this, _button).classList.remove('op-controls__playpause--replay');
            __classPrivateFieldGet(this, _button).classList.add('op-controls__playpause--pause');
            __classPrivateFieldGet(this, _button).title = __classPrivateFieldGet(this, _labels).pause;
            __classPrivateFieldGet(this, _button).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).pause);
        };
        __classPrivateFieldGet(this, _events).media.playererror = () => {
            if (isAudioEl) {
                const el = __classPrivateFieldGet(this, _player).activeElement();
                el.pause();
            }
        };
        const element = __classPrivateFieldGet(this, _player).getElement();
        __classPrivateFieldGet(this, _events).controls.controlschanged = () => {
            if (!__classPrivateFieldGet(this, _player).activeElement().paused) {
                const event = addEvent('playing');
                element.dispatchEvent(event);
            }
        };
        Object.keys(__classPrivateFieldGet(this, _events).media).forEach(event => {
            element.addEventListener(event, __classPrivateFieldGet(this, _events).media[event], EVENT_OPTIONS);
        });
        __classPrivateFieldGet(this, _player).getControls().getContainer().addEventListener('controlschanged', __classPrivateFieldGet(this, _events).controls.controlschanged, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _player).getContainer().addEventListener('keydown', this._keydownEvent.bind(this), EVENT_OPTIONS);
        __classPrivateFieldGet(this, _button).addEventListener('click', __classPrivateFieldGet(this, _events).media.click, EVENT_OPTIONS);
    }
    destroy() {
        Object.keys(__classPrivateFieldGet(this, _events).media).forEach(event => {
            __classPrivateFieldGet(this, _player).getElement().removeEventListener(event, __classPrivateFieldGet(this, _events).media[event]);
        });
        __classPrivateFieldGet(this, _player).getControls().getContainer().removeEventListener('controlschanged', __classPrivateFieldGet(this, _events).controls.controlschanged);
        __classPrivateFieldGet(this, _player).getContainer().removeEventListener('keydown', this._keydownEvent.bind(this));
        __classPrivateFieldGet(this, _button).removeEventListener('click', __classPrivateFieldGet(this, _events).media.click);
        removeElement(__classPrivateFieldGet(this, _button));
    }
    _keydownEvent(e) {
        const key = e.which || e.keyCode || 0;
        const el = __classPrivateFieldGet(this, _player).activeElement();
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
_player = new WeakMap(), _button = new WeakMap(), _events = new WeakMap(), _labels = new WeakMap(), _position = new WeakMap(), _layer = new WeakMap();
export default Play;

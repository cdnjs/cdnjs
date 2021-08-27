var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Play_player, _Play_button, _Play_events, _Play_labels, _Play_position, _Play_layer;
import Player from '../player';
import { EVENT_OPTIONS } from '../utils/constants';
import { addEvent } from '../utils/events';
import { hasClass, isAudio, removeElement } from '../utils/general';
class Play {
    constructor(player, position, layer) {
        _Play_player.set(this, void 0);
        _Play_button.set(this, void 0);
        _Play_events.set(this, {
            controls: {},
            media: {},
        });
        _Play_labels.set(this, void 0);
        _Play_position.set(this, void 0);
        _Play_layer.set(this, void 0);
        __classPrivateFieldSet(this, _Play_player, player, "f");
        __classPrivateFieldSet(this, _Play_labels, __classPrivateFieldGet(this, _Play_player, "f").getOptions().labels, "f");
        __classPrivateFieldSet(this, _Play_position, position, "f");
        __classPrivateFieldSet(this, _Play_layer, layer, "f");
        this._keydownEvent = this._keydownEvent.bind(this);
        return this;
    }
    create() {
        __classPrivateFieldSet(this, _Play_button, document.createElement('button'), "f");
        __classPrivateFieldGet(this, _Play_button, "f").type = 'button';
        __classPrivateFieldGet(this, _Play_button, "f").className = `op-controls__playpause op-control__${__classPrivateFieldGet(this, _Play_position, "f")}`;
        __classPrivateFieldGet(this, _Play_button, "f").tabIndex = 0;
        __classPrivateFieldGet(this, _Play_button, "f").title = __classPrivateFieldGet(this, _Play_labels, "f").play;
        __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-controls', __classPrivateFieldGet(this, _Play_player, "f").id);
        __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-pressed', 'false');
        __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', __classPrivateFieldGet(this, _Play_labels, "f").play);
        __classPrivateFieldGet(this, _Play_button, "f").innerHTML = `<span class="op-sr">${__classPrivateFieldGet(this, _Play_labels, "f").play}/${__classPrivateFieldGet(this, _Play_labels, "f").pause}</span>`;
        __classPrivateFieldGet(this, _Play_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Play_layer, "f")).appendChild(__classPrivateFieldGet(this, _Play_button, "f"));
        __classPrivateFieldGet(this, _Play_events, "f").media.click = (e) => {
            __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-pressed', 'true');
            const el = __classPrivateFieldGet(this, _Play_player, "f").activeElement();
            if (el.paused || el.ended) {
                if (__classPrivateFieldGet(this, _Play_player, "f").getAd()) {
                    __classPrivateFieldGet(this, _Play_player, "f").getAd().playRequested = true;
                }
                el.play();
            }
            else {
                el.pause();
            }
            e.preventDefault();
            e.stopPropagation();
        };
        const isAudioEl = isAudio(__classPrivateFieldGet(this, _Play_player, "f").getElement());
        __classPrivateFieldGet(this, _Play_events, "f").media.play = () => {
            if (__classPrivateFieldGet(this, _Play_player, "f").activeElement().ended) {
                if (__classPrivateFieldGet(this, _Play_player, "f").isMedia()) {
                    __classPrivateFieldGet(this, _Play_button, "f").classList.add('op-controls__playpause--replay');
                }
                else {
                    __classPrivateFieldGet(this, _Play_button, "f").classList.add('op-controls__playpause--pause');
                }
                __classPrivateFieldGet(this, _Play_button, "f").title = __classPrivateFieldGet(this, _Play_labels, "f").play;
                __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', __classPrivateFieldGet(this, _Play_labels, "f").play);
            }
            else {
                __classPrivateFieldGet(this, _Play_button, "f").classList.remove('op-controls__playpause--replay');
                __classPrivateFieldGet(this, _Play_button, "f").classList.add('op-controls__playpause--pause');
                __classPrivateFieldGet(this, _Play_button, "f").title = __classPrivateFieldGet(this, _Play_labels, "f").pause;
                __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', __classPrivateFieldGet(this, _Play_labels, "f").pause);
                if (__classPrivateFieldGet(this, _Play_player, "f").getOptions().pauseOthers) {
                    Object.keys(Player.instances).forEach(key => {
                        if (key !== __classPrivateFieldGet(this, _Play_player, "f").id) {
                            const target = Player.instances[key].activeElement();
                            target.pause();
                        }
                    });
                }
            }
        };
        __classPrivateFieldGet(this, _Play_events, "f").media.loadedmetadata = () => {
            if (hasClass(__classPrivateFieldGet(this, _Play_button, "f"), 'op-controls__playpause--pause')) {
                __classPrivateFieldGet(this, _Play_button, "f").classList.remove('op-controls__playpause--replay');
                __classPrivateFieldGet(this, _Play_button, "f").classList.remove('op-controls__playpause--pause');
                __classPrivateFieldGet(this, _Play_button, "f").title = __classPrivateFieldGet(this, _Play_labels, "f").play;
                __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', __classPrivateFieldGet(this, _Play_labels, "f").play);
            }
        };
        __classPrivateFieldGet(this, _Play_events, "f").media.playing = () => {
            if (!hasClass(__classPrivateFieldGet(this, _Play_button, "f"), 'op-controls__playpause--pause')) {
                __classPrivateFieldGet(this, _Play_button, "f").classList.remove('op-controls__playpause--replay');
                __classPrivateFieldGet(this, _Play_button, "f").classList.add('op-controls__playpause--pause');
                __classPrivateFieldGet(this, _Play_button, "f").title = __classPrivateFieldGet(this, _Play_labels, "f").pause;
                __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', __classPrivateFieldGet(this, _Play_labels, "f").pause);
            }
        };
        __classPrivateFieldGet(this, _Play_events, "f").media.pause = () => {
            __classPrivateFieldGet(this, _Play_button, "f").classList.remove('op-controls__playpause--pause');
            __classPrivateFieldGet(this, _Play_button, "f").title = __classPrivateFieldGet(this, _Play_labels, "f").play;
            __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', __classPrivateFieldGet(this, _Play_labels, "f").play);
        };
        __classPrivateFieldGet(this, _Play_events, "f").media.ended = () => {
            if (__classPrivateFieldGet(this, _Play_player, "f").activeElement().ended && __classPrivateFieldGet(this, _Play_player, "f").isMedia()) {
                __classPrivateFieldGet(this, _Play_button, "f").classList.add('op-controls__playpause--replay');
                __classPrivateFieldGet(this, _Play_button, "f").classList.remove('op-controls__playpause--pause');
            }
            else if (__classPrivateFieldGet(this, _Play_player, "f").getElement().currentTime >= __classPrivateFieldGet(this, _Play_player, "f").getElement().duration ||
                __classPrivateFieldGet(this, _Play_player, "f").getElement().currentTime <= 0) {
                __classPrivateFieldGet(this, _Play_button, "f").classList.add('op-controls__playpause--replay');
                __classPrivateFieldGet(this, _Play_button, "f").classList.remove('op-controls__playpause--pause');
            }
            else {
                __classPrivateFieldGet(this, _Play_button, "f").classList.remove('op-controls__playpause--replay');
                __classPrivateFieldGet(this, _Play_button, "f").classList.add('op-controls__playpause--pause');
            }
            __classPrivateFieldGet(this, _Play_button, "f").title = __classPrivateFieldGet(this, _Play_labels, "f").play;
            __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', __classPrivateFieldGet(this, _Play_labels, "f").play);
        };
        __classPrivateFieldGet(this, _Play_events, "f").media.adsmediaended = () => {
            __classPrivateFieldGet(this, _Play_button, "f").classList.remove('op-controls__playpause--replay');
            __classPrivateFieldGet(this, _Play_button, "f").classList.add('op-controls__playpause--pause');
            __classPrivateFieldGet(this, _Play_button, "f").title = __classPrivateFieldGet(this, _Play_labels, "f").pause;
            __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', __classPrivateFieldGet(this, _Play_labels, "f").pause);
        };
        __classPrivateFieldGet(this, _Play_events, "f").media.playererror = () => {
            if (isAudioEl) {
                const el = __classPrivateFieldGet(this, _Play_player, "f").activeElement();
                el.pause();
            }
        };
        const element = __classPrivateFieldGet(this, _Play_player, "f").getElement();
        __classPrivateFieldGet(this, _Play_events, "f").controls.controlschanged = () => {
            if (!__classPrivateFieldGet(this, _Play_player, "f").activeElement().paused) {
                const event = addEvent('playing');
                element.dispatchEvent(event);
            }
        };
        Object.keys(__classPrivateFieldGet(this, _Play_events, "f").media).forEach(event => {
            element.addEventListener(event, __classPrivateFieldGet(this, _Play_events, "f").media[event], EVENT_OPTIONS);
        });
        __classPrivateFieldGet(this, _Play_player, "f").getControls().getContainer().addEventListener('controlschanged', __classPrivateFieldGet(this, _Play_events, "f").controls.controlschanged, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Play_player, "f").getContainer().addEventListener('keydown', this._keydownEvent, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Play_button, "f").addEventListener('click', __classPrivateFieldGet(this, _Play_events, "f").media.click, EVENT_OPTIONS);
    }
    destroy() {
        Object.keys(__classPrivateFieldGet(this, _Play_events, "f").media).forEach(event => {
            __classPrivateFieldGet(this, _Play_player, "f").getElement().removeEventListener(event, __classPrivateFieldGet(this, _Play_events, "f").media[event]);
        });
        __classPrivateFieldGet(this, _Play_player, "f").getControls().getContainer().removeEventListener('controlschanged', __classPrivateFieldGet(this, _Play_events, "f").controls.controlschanged);
        __classPrivateFieldGet(this, _Play_player, "f").getContainer().removeEventListener('keydown', this._keydownEvent);
        __classPrivateFieldGet(this, _Play_button, "f").removeEventListener('click', __classPrivateFieldGet(this, _Play_events, "f").media.click);
        removeElement(__classPrivateFieldGet(this, _Play_button, "f"));
    }
    _keydownEvent(e) {
        var _a;
        const key = e.which || e.keyCode || 0;
        const playBtnFocused = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains('op-controls__playpause');
        if (playBtnFocused && (key === 13 || key === 32)) {
            __classPrivateFieldGet(this, _Play_events, "f").media.click(e);
        }
    }
}
_Play_player = new WeakMap(), _Play_button = new WeakMap(), _Play_events = new WeakMap(), _Play_labels = new WeakMap(), _Play_position = new WeakMap(), _Play_layer = new WeakMap();
export default Play;

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
var _Play_player, _Play_button, _Play_events, _Play_controlPosition, _Play_controlLayer;
import Player from '../player';
import { EVENT_OPTIONS } from '../utils/constants';
import { addEvent, isAudio } from '../utils/general';
class Play {
    constructor(player, position, layer) {
        _Play_player.set(this, void 0);
        _Play_button.set(this, void 0);
        _Play_events.set(this, {
            controls: {},
            media: {},
        });
        _Play_controlPosition.set(this, void 0);
        _Play_controlLayer.set(this, void 0);
        __classPrivateFieldSet(this, _Play_player, player, "f");
        __classPrivateFieldSet(this, _Play_controlPosition, position, "f");
        __classPrivateFieldSet(this, _Play_controlLayer, layer, "f");
        this._enterSpaceKeyEvent = this._enterSpaceKeyEvent.bind(this);
    }
    create() {
        var _a;
        const { labels } = __classPrivateFieldGet(this, _Play_player, "f").getOptions();
        __classPrivateFieldSet(this, _Play_button, document.createElement('button'), "f");
        __classPrivateFieldGet(this, _Play_button, "f").type = 'button';
        __classPrivateFieldGet(this, _Play_button, "f").className = `op-controls__playpause op-control__${__classPrivateFieldGet(this, _Play_controlPosition, "f")}`;
        __classPrivateFieldGet(this, _Play_button, "f").tabIndex = 0;
        __classPrivateFieldGet(this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.play) || '';
        __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-controls', __classPrivateFieldGet(this, _Play_player, "f").id);
        __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-pressed', 'false');
        __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.play) || '');
        __classPrivateFieldGet(this, _Play_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Play_controlLayer, "f")).appendChild(__classPrivateFieldGet(this, _Play_button, "f"));
        __classPrivateFieldGet(this, _Play_events, "f").button = (e) => {
            __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-pressed', 'true');
            const el = __classPrivateFieldGet(this, _Play_player, "f").activeElement();
            if (el.paused || el.ended) {
                if (__classPrivateFieldGet(this, _Play_player, "f").getAd()) {
                    __classPrivateFieldGet(this, _Play_player, "f").getAd().playRequested = true;
                }
                el.play();
                __classPrivateFieldGet(this, _Play_events, "f").media.play();
            }
            else {
                el.pause();
                __classPrivateFieldGet(this, _Play_events, "f").media.pause();
            }
            e.preventDefault();
            e.stopPropagation();
        };
        const isAudioEl = isAudio(__classPrivateFieldGet(this, _Play_player, "f").getElement());
        __classPrivateFieldGet(this, _Play_events, "f").media.play = () => {
            var _a;
            if (__classPrivateFieldGet(this, _Play_player, "f").activeElement().ended) {
                if (__classPrivateFieldGet(this, _Play_player, "f").isMedia()) {
                    __classPrivateFieldGet(this, _Play_button, "f").classList.add('op-controls__playpause--replay');
                }
                else {
                    __classPrivateFieldGet(this, _Play_button, "f").classList.add('op-controls__playpause--pause');
                }
                __classPrivateFieldGet(this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.play) || '';
                __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.play) || '');
            }
            else {
                __classPrivateFieldGet(this, _Play_button, "f").classList.remove('op-controls__playpause--replay');
                __classPrivateFieldGet(this, _Play_button, "f").classList.add('op-controls__playpause--pause');
                __classPrivateFieldGet(this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.pause) || '';
                __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.pause) || '');
                if ((_a = __classPrivateFieldGet(this, _Play_player, "f").getOptions()) === null || _a === void 0 ? void 0 : _a.pauseOthers) {
                    Object.keys(Player.instances).forEach((key) => {
                        if (key !== __classPrivateFieldGet(this, _Play_player, "f").id) {
                            const target = Player.instances[key].activeElement();
                            target.pause();
                        }
                    });
                }
            }
        };
        __classPrivateFieldGet(this, _Play_events, "f").media.loadedmetadata = () => {
            if (__classPrivateFieldGet(this, _Play_button, "f").classList.contains('op-controls__playpause--pause') ||
                __classPrivateFieldGet(this, _Play_button, "f").classList.contains('op-controls__playpause--replay')) {
                __classPrivateFieldGet(this, _Play_button, "f").classList.remove('op-controls__playpause--replay');
                __classPrivateFieldGet(this, _Play_button, "f").classList.remove('op-controls__playpause--pause');
                __classPrivateFieldGet(this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.play) || '';
                __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.play) || '');
            }
        };
        __classPrivateFieldGet(this, _Play_events, "f").media.playing = () => {
            if (!__classPrivateFieldGet(this, _Play_button, "f").classList.contains('op-controls__playpause--pause')) {
                __classPrivateFieldGet(this, _Play_button, "f").classList.remove('op-controls__playpause--replay');
                __classPrivateFieldGet(this, _Play_button, "f").classList.add('op-controls__playpause--pause');
                __classPrivateFieldGet(this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.pause) || '';
                __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.pause) || '');
            }
        };
        __classPrivateFieldGet(this, _Play_events, "f").media.pause = () => {
            __classPrivateFieldGet(this, _Play_button, "f").classList.remove('op-controls__playpause--pause');
            __classPrivateFieldGet(this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.play) || '';
            __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.play) || '');
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
            __classPrivateFieldGet(this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.play) || '';
            __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.play) || '');
        };
        __classPrivateFieldGet(this, _Play_events, "f").media.adsmediaended = () => {
            __classPrivateFieldGet(this, _Play_button, "f").classList.remove('op-controls__playpause--replay');
            __classPrivateFieldGet(this, _Play_button, "f").classList.add('op-controls__playpause--pause');
            __classPrivateFieldGet(this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.pause) || '';
            __classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.pause) || '');
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
        Object.keys(__classPrivateFieldGet(this, _Play_events, "f").media).forEach((event) => {
            element.addEventListener(event, __classPrivateFieldGet(this, _Play_events, "f").media[event], EVENT_OPTIONS);
        });
        if ((_a = __classPrivateFieldGet(this, _Play_player, "f").getOptions().media) === null || _a === void 0 ? void 0 : _a.pauseOnClick) {
            element.addEventListener('click', __classPrivateFieldGet(this, _Play_events, "f").button, EVENT_OPTIONS);
        }
        __classPrivateFieldGet(this, _Play_player, "f")
            .getControls()
            .getContainer()
            .addEventListener('controlschanged', __classPrivateFieldGet(this, _Play_events, "f").controls.controlschanged, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Play_player, "f").getContainer().addEventListener('keydown', this._enterSpaceKeyEvent, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Play_button, "f").addEventListener('click', __classPrivateFieldGet(this, _Play_events, "f").button, EVENT_OPTIONS);
    }
    destroy() {
        var _a;
        Object.keys(__classPrivateFieldGet(this, _Play_events, "f").media).forEach((event) => {
            __classPrivateFieldGet(this, _Play_player, "f").getElement().removeEventListener(event, __classPrivateFieldGet(this, _Play_events, "f").media[event]);
        });
        if ((_a = __classPrivateFieldGet(this, _Play_player, "f").getOptions().media) === null || _a === void 0 ? void 0 : _a.pauseOnClick) {
            __classPrivateFieldGet(this, _Play_player, "f").getElement().removeEventListener('click', __classPrivateFieldGet(this, _Play_events, "f").button);
        }
        __classPrivateFieldGet(this, _Play_player, "f")
            .getControls()
            .getContainer()
            .removeEventListener('controlschanged', __classPrivateFieldGet(this, _Play_events, "f").controls.controlschanged);
        __classPrivateFieldGet(this, _Play_player, "f").getContainer().removeEventListener('keydown', this._enterSpaceKeyEvent);
        __classPrivateFieldGet(this, _Play_button, "f").removeEventListener('click', __classPrivateFieldGet(this, _Play_events, "f").button);
        __classPrivateFieldGet(this, _Play_button, "f").remove();
    }
    _enterSpaceKeyEvent(e) {
        var _a;
        const key = e.which || e.keyCode || 0;
        const playBtnFocused = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains('op-controls__playpause');
        if (playBtnFocused && (key === 13 || key === 32)) {
            __classPrivateFieldGet(this, _Play_events, "f").button(e);
        }
    }
}
_Play_player = new WeakMap(), _Play_button = new WeakMap(), _Play_events = new WeakMap(), _Play_controlPosition = new WeakMap(), _Play_controlLayer = new WeakMap();
export default Play;

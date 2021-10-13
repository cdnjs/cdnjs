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
var _Fullscreen_player, _Fullscreen_isFullscreen, _Fullscreen_button, _Fullscreen_fullscreenEvents, _Fullscreen_fullscreenWidth, _Fullscreen_fullscreenHeight, _Fullscreen_clickEvent, _Fullscreen_labels, _Fullscreen_position, _Fullscreen_layer;
import { EVENT_OPTIONS, IS_ANDROID, IS_IPHONE } from '../utils/constants';
import { removeElement } from '../utils/general';
class Fullscreen {
    constructor(player, position, layer) {
        _Fullscreen_player.set(this, void 0);
        _Fullscreen_isFullscreen.set(this, void 0);
        _Fullscreen_button.set(this, void 0);
        _Fullscreen_fullscreenEvents.set(this, []);
        _Fullscreen_fullscreenWidth.set(this, 0);
        _Fullscreen_fullscreenHeight.set(this, 0);
        _Fullscreen_clickEvent.set(this, void 0);
        _Fullscreen_labels.set(this, void 0);
        _Fullscreen_position.set(this, void 0);
        _Fullscreen_layer.set(this, void 0);
        __classPrivateFieldSet(this, _Fullscreen_player, player, "f");
        __classPrivateFieldSet(this, _Fullscreen_labels, player.getOptions().labels, "f");
        __classPrivateFieldSet(this, _Fullscreen_position, position, "f");
        __classPrivateFieldSet(this, _Fullscreen_layer, layer, "f");
        __classPrivateFieldSet(this, _Fullscreen_isFullscreen, document.body.classList.contains('op-fullscreen__on'), "f");
        const target = document;
        this.fullScreenEnabled = !!(target.fullscreenEnabled || target.mozFullScreenEnabled || target.msFullscreenEnabled
            || target.webkitSupportsFullscreen || target.webkitFullscreenEnabled
            || document.createElement('video').webkitRequestFullScreen);
        this._keydownEvent = this._keydownEvent.bind(this);
        this._fullscreenChange = this._fullscreenChange.bind(this);
        __classPrivateFieldSet(this, _Fullscreen_fullscreenEvents, [
            'fullscreenchange',
            'mozfullscreenchange',
            'webkitfullscreenchange',
            'msfullscreenchange',
        ], "f");
        __classPrivateFieldGet(this, _Fullscreen_fullscreenEvents, "f").forEach(event => {
            document.addEventListener(event, this._fullscreenChange, EVENT_OPTIONS);
        });
        this._setFullscreenData(false);
        __classPrivateFieldGet(this, _Fullscreen_player, "f").getContainer().addEventListener('keydown', this._keydownEvent, EVENT_OPTIONS);
        if (IS_IPHONE) {
            __classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().addEventListener('webkitbeginfullscreen', () => {
                __classPrivateFieldSet(this, _Fullscreen_isFullscreen, true, "f");
                this._setFullscreenData(true);
                document.body.classList.add('op-fullscreen__on');
            }, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().addEventListener('webkitendfullscreen', () => {
                __classPrivateFieldSet(this, _Fullscreen_isFullscreen, false, "f");
                this._setFullscreenData(false);
                document.body.classList.remove('op-fullscreen__on');
            }, EVENT_OPTIONS);
        }
        return this;
    }
    create() {
        __classPrivateFieldSet(this, _Fullscreen_button, document.createElement('button'), "f");
        __classPrivateFieldGet(this, _Fullscreen_button, "f").type = 'button';
        __classPrivateFieldGet(this, _Fullscreen_button, "f").className = `op-controls__fullscreen op-control__${__classPrivateFieldGet(this, _Fullscreen_position, "f")}`;
        __classPrivateFieldGet(this, _Fullscreen_button, "f").tabIndex = 0;
        __classPrivateFieldGet(this, _Fullscreen_button, "f").title = __classPrivateFieldGet(this, _Fullscreen_labels, "f").fullscreen;
        __classPrivateFieldGet(this, _Fullscreen_button, "f").setAttribute('aria-controls', __classPrivateFieldGet(this, _Fullscreen_player, "f").id);
        __classPrivateFieldGet(this, _Fullscreen_button, "f").setAttribute('aria-pressed', 'false');
        __classPrivateFieldGet(this, _Fullscreen_button, "f").setAttribute('aria-label', __classPrivateFieldGet(this, _Fullscreen_labels, "f").fullscreen);
        __classPrivateFieldGet(this, _Fullscreen_button, "f").innerHTML = `<span class="op-sr">${__classPrivateFieldGet(this, _Fullscreen_labels, "f").fullscreen}</span>`;
        __classPrivateFieldSet(this, _Fullscreen_clickEvent, () => {
            __classPrivateFieldGet(this, _Fullscreen_button, "f").setAttribute('aria-pressed', 'true');
            this.toggleFullscreen();
        }, "f");
        __classPrivateFieldSet(this, _Fullscreen_clickEvent, __classPrivateFieldGet(this, _Fullscreen_clickEvent, "f").bind(this), "f");
        __classPrivateFieldGet(this, _Fullscreen_button, "f").addEventListener('click', __classPrivateFieldGet(this, _Fullscreen_clickEvent, "f"), EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Fullscreen_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Fullscreen_layer, "f")).appendChild(__classPrivateFieldGet(this, _Fullscreen_button, "f"));
    }
    destroy() {
        __classPrivateFieldGet(this, _Fullscreen_player, "f").getContainer().removeEventListener('keydown', this._keydownEvent);
        __classPrivateFieldGet(this, _Fullscreen_fullscreenEvents, "f").forEach(event => {
            document.removeEventListener(event, this._fullscreenChange);
        });
        if (IS_IPHONE) {
            __classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().removeEventListener('webkitbeginfullscreen', () => {
                __classPrivateFieldSet(this, _Fullscreen_isFullscreen, true, "f");
                this._setFullscreenData(false);
                document.body.classList.add('op-fullscreen__on');
            });
            __classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().removeEventListener('webkitendfullscreen', () => {
                __classPrivateFieldSet(this, _Fullscreen_isFullscreen, false, "f");
                this._setFullscreenData(true);
                document.body.classList.remove('op-fullscreen__on');
            });
        }
        __classPrivateFieldGet(this, _Fullscreen_button, "f").removeEventListener('click', __classPrivateFieldGet(this, _Fullscreen_clickEvent, "f"));
        removeElement(__classPrivateFieldGet(this, _Fullscreen_button, "f"));
    }
    toggleFullscreen() {
        if (__classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f")) {
            const target = document;
            if (target.exitFullscreen) {
                target.exitFullscreen();
            }
            else if (target.mozCancelFullScreen) {
                target.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                target.webkitCancelFullScreen();
            }
            else if (target.msExitFullscreen) {
                target.msExitFullscreen();
            }
            else {
                this._fullscreenChange();
            }
            document.body.classList.remove('op-fullscreen__on');
        }
        else {
            const video = __classPrivateFieldGet(this, _Fullscreen_player, "f").getElement();
            __classPrivateFieldSet(this, _Fullscreen_fullscreenWidth, window.screen.width, "f");
            __classPrivateFieldSet(this, _Fullscreen_fullscreenHeight, window.screen.height, "f");
            if (video.requestFullscreen) {
                video.parentElement.requestFullscreen();
            }
            else if (video.mozRequestFullScreen) {
                video.parentElement.mozRequestFullScreen();
            }
            else if (video.webkitRequestFullScreen) {
                video.parentElement.webkitRequestFullScreen();
            }
            else if (video.msRequestFullscreen) {
                video.parentElement.msRequestFullscreen();
            }
            else if (video.webkitEnterFullscreen) {
                video.webkitEnterFullscreen();
            }
            else {
                this._fullscreenChange();
            }
            document.body.classList.add('op-fullscreen__on');
        }
        if (typeof window !== 'undefined' && (IS_ANDROID || IS_IPHONE)) {
            const screen = window.screen;
            if (screen.orientation) {
                if (!__classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f")) {
                    screen.orientation.lock('landscape');
                }
            }
        }
    }
    _fullscreenChange() {
        const width = __classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f") ? undefined : __classPrivateFieldGet(this, _Fullscreen_fullscreenWidth, "f");
        const height = __classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f") ? undefined : __classPrivateFieldGet(this, _Fullscreen_fullscreenHeight, "f");
        this._setFullscreenData(!__classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f"));
        if (__classPrivateFieldGet(this, _Fullscreen_player, "f").isAd()) {
            __classPrivateFieldGet(this, _Fullscreen_player, "f").getAd().resizeAds(width, height);
        }
        __classPrivateFieldSet(this, _Fullscreen_isFullscreen, !__classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f"), "f");
        if (__classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f")) {
            document.body.classList.add('op-fullscreen__on');
        }
        else {
            document.body.classList.remove('op-fullscreen__on');
        }
        this._resize(width, height);
    }
    _setFullscreenData(state) {
        __classPrivateFieldGet(this, _Fullscreen_player, "f").getContainer().setAttribute('data-fullscreen', (!!state).toString());
        if (__classPrivateFieldGet(this, _Fullscreen_button, "f")) {
            if (state) {
                __classPrivateFieldGet(this, _Fullscreen_button, "f").classList.add('op-controls__fullscreen--out');
            }
            else {
                __classPrivateFieldGet(this, _Fullscreen_button, "f").classList.remove('op-controls__fullscreen--out');
            }
        }
    }
    _resize(width, height) {
        const wrapper = __classPrivateFieldGet(this, _Fullscreen_player, "f").getContainer();
        const video = __classPrivateFieldGet(this, _Fullscreen_player, "f").getElement();
        const options = __classPrivateFieldGet(this, _Fullscreen_player, "f").getOptions();
        let styles = '';
        if (width) {
            wrapper.style.width = '100%';
            video.style.width = '100%';
        }
        else if (options.width) {
            const defaultWidth = typeof options.width === 'number' ? `${options.width}px` : options.width;
            styles += `width: ${defaultWidth} !important;`;
            video.style.removeProperty('width');
        }
        else {
            video.style.removeProperty('width');
            wrapper.style.removeProperty('width');
        }
        if (height) {
            video.style.height = '100%';
            wrapper.style.height = '100%';
        }
        else if (options.height) {
            const defaultHeight = typeof options.height === 'number' ? `${options.height}px` : options.height;
            styles += `height: ${defaultHeight} !important;`;
            video.style.removeProperty('height');
        }
        else {
            video.style.removeProperty('height');
            wrapper.style.removeProperty('height');
        }
        if (styles) {
            wrapper.setAttribute('style', styles);
        }
    }
    _keydownEvent(e) {
        var _a;
        const key = e.which || e.keyCode || 0;
        const fullscreenBtnFocused = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains('op-controls__fullscreen');
        if (fullscreenBtnFocused && (key === 13 || key === 32)) {
            this.toggleFullscreen();
            e.preventDefault();
            e.stopPropagation();
        }
    }
}
_Fullscreen_player = new WeakMap(), _Fullscreen_isFullscreen = new WeakMap(), _Fullscreen_button = new WeakMap(), _Fullscreen_fullscreenEvents = new WeakMap(), _Fullscreen_fullscreenWidth = new WeakMap(), _Fullscreen_fullscreenHeight = new WeakMap(), _Fullscreen_clickEvent = new WeakMap(), _Fullscreen_labels = new WeakMap(), _Fullscreen_position = new WeakMap(), _Fullscreen_layer = new WeakMap();
export default Fullscreen;

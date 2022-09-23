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
var _Fullscreen_player, _Fullscreen_isFullscreen, _Fullscreen_button, _Fullscreen_fullscreenEvents, _Fullscreen_fullscreenWidth, _Fullscreen_fullscreenHeight, _Fullscreen_clickEvent, _Fullscreen_controlPosition, _Fullscreen_controlLayer;
import { EVENT_OPTIONS, IS_ANDROID, IS_IPHONE } from '../utils/constants';
class Fullscreen {
    constructor(player, position, layer) {
        _Fullscreen_player.set(this, void 0);
        _Fullscreen_isFullscreen.set(this, void 0);
        _Fullscreen_button.set(this, void 0);
        _Fullscreen_fullscreenEvents.set(this, []);
        _Fullscreen_fullscreenWidth.set(this, 0);
        _Fullscreen_fullscreenHeight.set(this, 0);
        _Fullscreen_clickEvent.set(this, void 0);
        _Fullscreen_controlPosition.set(this, void 0);
        _Fullscreen_controlLayer.set(this, void 0);
        __classPrivateFieldSet(this, _Fullscreen_player, player, "f");
        __classPrivateFieldSet(this, _Fullscreen_controlPosition, position, "f");
        __classPrivateFieldSet(this, _Fullscreen_controlLayer, layer, "f");
        __classPrivateFieldSet(this, _Fullscreen_isFullscreen, document.body.classList.contains('op-fullscreen__on'), "f");
        const target = document;
        this.fullScreenEnabled = !!(target.fullscreenEnabled ||
            target.mozFullScreenEnabled ||
            target.msFullscreenEnabled ||
            target.webkitSupportsFullscreen ||
            target.webkitFullscreenEnabled ||
            document.createElement('video').webkitRequestFullScreen);
        this._enterSpaceKeyEvent = this._enterSpaceKeyEvent.bind(this);
        this._resize = this._resize.bind(this);
        this._fullscreenChange = this._fullscreenChange.bind(this);
        this._setFullscreen = this._setFullscreen.bind(this);
        this._unsetFullscreen = this._unsetFullscreen.bind(this);
        __classPrivateFieldSet(this, _Fullscreen_fullscreenEvents, [
            'fullscreenchange',
            'mozfullscreenchange',
            'webkitfullscreenchange',
            'msfullscreenchange',
        ], "f");
        __classPrivateFieldGet(this, _Fullscreen_fullscreenEvents, "f").forEach((event) => {
            document.addEventListener(event, this._fullscreenChange, EVENT_OPTIONS);
        });
        this._setFullscreenData(false);
        __classPrivateFieldGet(this, _Fullscreen_player, "f").getContainer().addEventListener('keydown', this._enterSpaceKeyEvent, EVENT_OPTIONS);
        if (IS_IPHONE) {
            __classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().addEventListener('webkitbeginfullscreen', this._setFullscreen, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().addEventListener('webkitendfullscreen', this._unsetFullscreen, EVENT_OPTIONS);
        }
    }
    create() {
        const { labels } = __classPrivateFieldGet(this, _Fullscreen_player, "f").getOptions();
        __classPrivateFieldSet(this, _Fullscreen_button, document.createElement('button'), "f");
        __classPrivateFieldGet(this, _Fullscreen_button, "f").type = 'button';
        __classPrivateFieldGet(this, _Fullscreen_button, "f").className = `op-controls__fullscreen op-control__${__classPrivateFieldGet(this, _Fullscreen_controlPosition, "f")}`;
        __classPrivateFieldGet(this, _Fullscreen_button, "f").tabIndex = 0;
        __classPrivateFieldGet(this, _Fullscreen_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.fullscreen) || '';
        __classPrivateFieldGet(this, _Fullscreen_button, "f").setAttribute('aria-controls', __classPrivateFieldGet(this, _Fullscreen_player, "f").id);
        __classPrivateFieldGet(this, _Fullscreen_button, "f").setAttribute('aria-pressed', 'false');
        __classPrivateFieldGet(this, _Fullscreen_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.fullscreen) || '');
        __classPrivateFieldSet(this, _Fullscreen_clickEvent, () => {
            __classPrivateFieldGet(this, _Fullscreen_button, "f").setAttribute('aria-pressed', 'true');
            this.toggleFullscreen();
        }, "f");
        __classPrivateFieldSet(this, _Fullscreen_clickEvent, __classPrivateFieldGet(this, _Fullscreen_clickEvent, "f").bind(this), "f");
        __classPrivateFieldGet(this, _Fullscreen_button, "f").addEventListener('click', __classPrivateFieldGet(this, _Fullscreen_clickEvent, "f"), EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Fullscreen_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Fullscreen_controlLayer, "f")).appendChild(__classPrivateFieldGet(this, _Fullscreen_button, "f"));
    }
    destroy() {
        __classPrivateFieldGet(this, _Fullscreen_player, "f").getContainer().removeEventListener('keydown', this._enterSpaceKeyEvent);
        __classPrivateFieldGet(this, _Fullscreen_fullscreenEvents, "f").forEach((event) => {
            document.removeEventListener(event, this._fullscreenChange);
        });
        if (IS_IPHONE) {
            __classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().removeEventListener('webkitbeginfullscreen', this._setFullscreen);
            __classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().removeEventListener('webkitendfullscreen', this._unsetFullscreen);
        }
        __classPrivateFieldGet(this, _Fullscreen_button, "f").removeEventListener('click', __classPrivateFieldGet(this, _Fullscreen_clickEvent, "f"));
        __classPrivateFieldGet(this, _Fullscreen_button, "f").remove();
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
            else if (target.webkitCancelFullScreen) {
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
            const { screen } = window;
            if (screen.orientation && !__classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f")) {
                screen.orientation.lock('landscape');
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
    _setFullscreenData(isFullscreen) {
        __classPrivateFieldGet(this, _Fullscreen_player, "f").getContainer().setAttribute('data-fullscreen', (!!isFullscreen).toString());
        if (__classPrivateFieldGet(this, _Fullscreen_button, "f")) {
            if (isFullscreen) {
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
    _enterSpaceKeyEvent(e) {
        var _a;
        const key = e.which || e.keyCode || 0;
        const fullscreenBtnFocused = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains('op-controls__fullscreen');
        if (fullscreenBtnFocused && (key === 13 || key === 32)) {
            this.toggleFullscreen();
            e.preventDefault();
            e.stopPropagation();
        }
    }
    _setFullscreen() {
        __classPrivateFieldSet(this, _Fullscreen_isFullscreen, true, "f");
        this._setFullscreenData(true);
        document.body.classList.add('op-fullscreen__on');
    }
    _unsetFullscreen() {
        __classPrivateFieldSet(this, _Fullscreen_isFullscreen, false, "f");
        this._setFullscreenData(false);
        document.body.classList.remove('op-fullscreen__on');
    }
}
_Fullscreen_player = new WeakMap(), _Fullscreen_isFullscreen = new WeakMap(), _Fullscreen_button = new WeakMap(), _Fullscreen_fullscreenEvents = new WeakMap(), _Fullscreen_fullscreenWidth = new WeakMap(), _Fullscreen_fullscreenHeight = new WeakMap(), _Fullscreen_clickEvent = new WeakMap(), _Fullscreen_controlPosition = new WeakMap(), _Fullscreen_controlLayer = new WeakMap();
export default Fullscreen;

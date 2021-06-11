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
var _player, _isFullscreen, _button, _fullscreenEvents, _fullscreenWidth, _fullscreenHeight, _clickEvent, _labels, _position, _layer;
import { EVENT_OPTIONS, IS_ANDROID, IS_IPHONE } from '../utils/constants';
import { removeElement } from '../utils/general';
class Fullscreen {
    constructor(player, position, layer) {
        _player.set(this, void 0);
        _isFullscreen.set(this, void 0);
        _button.set(this, void 0);
        _fullscreenEvents.set(this, []);
        _fullscreenWidth.set(this, 0);
        _fullscreenHeight.set(this, 0);
        _clickEvent.set(this, void 0);
        _labels.set(this, void 0);
        _position.set(this, void 0);
        _layer.set(this, void 0);
        __classPrivateFieldSet(this, _player, player);
        __classPrivateFieldSet(this, _labels, player.getOptions().labels);
        __classPrivateFieldSet(this, _position, position);
        __classPrivateFieldSet(this, _layer, layer);
        __classPrivateFieldSet(this, _isFullscreen, document.body.classList.contains('op-fullscreen__on'));
        const target = document;
        this.fullScreenEnabled = !!(target.fullscreenEnabled || target.mozFullScreenEnabled ||
            target.msFullscreenEnabled || target.webkitSupportsFullscreen ||
            target.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
        return this;
    }
    create() {
        __classPrivateFieldSet(this, _button, document.createElement('button'));
        __classPrivateFieldGet(this, _button).type = 'button';
        __classPrivateFieldGet(this, _button).className = `op-controls__fullscreen op-control__${__classPrivateFieldGet(this, _position)}`;
        __classPrivateFieldGet(this, _button).tabIndex = 0;
        __classPrivateFieldGet(this, _button).title = __classPrivateFieldGet(this, _labels).fullscreen;
        __classPrivateFieldGet(this, _button).setAttribute('aria-controls', __classPrivateFieldGet(this, _player).id);
        __classPrivateFieldGet(this, _button).setAttribute('aria-pressed', 'false');
        __classPrivateFieldGet(this, _button).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).fullscreen);
        __classPrivateFieldGet(this, _button).innerHTML = `<span class="op-sr">${__classPrivateFieldGet(this, _labels).fullscreen}</span>`;
        __classPrivateFieldSet(this, _clickEvent, () => {
            __classPrivateFieldGet(this, _button).setAttribute('aria-pressed', 'true');
            this.toggleFullscreen();
        });
        __classPrivateFieldSet(this, _fullscreenEvents, [
            'fullscreenchange',
            'mozfullscreenchange',
            'webkitfullscreenchange',
            'msfullscreenchange',
        ]);
        this._setFullscreenData(false);
        __classPrivateFieldGet(this, _player).getContainer().addEventListener('keydown', this._keydownEvent.bind(this), EVENT_OPTIONS);
        __classPrivateFieldGet(this, _fullscreenEvents).forEach(event => {
            document.addEventListener(event, this._fullscreenChange.bind(this), EVENT_OPTIONS);
        });
        __classPrivateFieldGet(this, _button).addEventListener('click', __classPrivateFieldGet(this, _clickEvent).bind(this), EVENT_OPTIONS);
        __classPrivateFieldGet(this, _player).getControls().getLayer(__classPrivateFieldGet(this, _layer)).appendChild(__classPrivateFieldGet(this, _button));
        if (IS_IPHONE) {
            __classPrivateFieldGet(this, _player).getElement().addEventListener('webkitbeginfullscreen', () => {
                __classPrivateFieldSet(this, _isFullscreen, true);
                this._setFullscreenData(true);
                document.body.classList.add('op-fullscreen__on');
            }, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _player).getElement().addEventListener('webkitendfullscreen', () => {
                __classPrivateFieldSet(this, _isFullscreen, false);
                this._setFullscreenData(false);
                document.body.classList.remove('op-fullscreen__on');
            }, EVENT_OPTIONS);
        }
    }
    destroy() {
        __classPrivateFieldGet(this, _player).getContainer().removeEventListener('keydown', this._keydownEvent.bind(this));
        __classPrivateFieldGet(this, _fullscreenEvents).forEach(event => {
            document.removeEventListener(event, this._fullscreenChange.bind(this));
        });
        if (IS_IPHONE) {
            __classPrivateFieldGet(this, _player).getElement().removeEventListener('webkitbeginfullscreen', () => {
                __classPrivateFieldSet(this, _isFullscreen, true);
                this._setFullscreenData(false);
                document.body.classList.add('op-fullscreen__on');
            });
            __classPrivateFieldGet(this, _player).getElement().removeEventListener('webkitendfullscreen', () => {
                __classPrivateFieldSet(this, _isFullscreen, false);
                this._setFullscreenData(true);
                document.body.classList.remove('op-fullscreen__on');
            });
        }
        __classPrivateFieldGet(this, _button).removeEventListener('click', __classPrivateFieldGet(this, _clickEvent).bind(this));
        removeElement(__classPrivateFieldGet(this, _button));
    }
    toggleFullscreen() {
        if (__classPrivateFieldGet(this, _isFullscreen)) {
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
            const video = __classPrivateFieldGet(this, _player).getElement();
            __classPrivateFieldSet(this, _fullscreenWidth, window.screen.width);
            __classPrivateFieldSet(this, _fullscreenHeight, window.screen.height);
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
                if (!__classPrivateFieldGet(this, _isFullscreen)) {
                    screen.orientation.lock('landscape');
                }
            }
        }
    }
    _fullscreenChange() {
        const width = __classPrivateFieldGet(this, _isFullscreen) ? 0 : __classPrivateFieldGet(this, _fullscreenWidth);
        const height = __classPrivateFieldGet(this, _isFullscreen) ? 0 : __classPrivateFieldGet(this, _fullscreenHeight);
        this._setFullscreenData(!__classPrivateFieldGet(this, _isFullscreen));
        if (__classPrivateFieldGet(this, _player).isAd()) {
            __classPrivateFieldGet(this, _player).getAd().resizeAds(width, height);
        }
        __classPrivateFieldSet(this, _isFullscreen, !__classPrivateFieldGet(this, _isFullscreen));
        if (__classPrivateFieldGet(this, _isFullscreen)) {
            document.body.classList.add('op-fullscreen__on');
        }
        else {
            document.body.classList.remove('op-fullscreen__on');
        }
        this._resize(width, height);
    }
    _setFullscreenData(state) {
        __classPrivateFieldGet(this, _player).getContainer().setAttribute('data-fullscreen', (!!state).toString());
        if (state) {
            __classPrivateFieldGet(this, _button).classList.add('op-controls__fullscreen--out');
        }
        else {
            __classPrivateFieldGet(this, _button).classList.remove('op-controls__fullscreen--out');
        }
    }
    _resize(width, height) {
        const wrapper = __classPrivateFieldGet(this, _player).getContainer();
        const video = __classPrivateFieldGet(this, _player).getElement();
        const options = __classPrivateFieldGet(this, _player).getOptions();
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
        const key = e.which || e.keyCode || 0;
        if (key === 70 && !e.ctrlKey && typeof this.fullScreenEnabled !== 'undefined') {
            this.toggleFullscreen();
            e.preventDefault();
        }
    }
}
_player = new WeakMap(), _isFullscreen = new WeakMap(), _button = new WeakMap(), _fullscreenEvents = new WeakMap(), _fullscreenWidth = new WeakMap(), _fullscreenHeight = new WeakMap(), _clickEvent = new WeakMap(), _labels = new WeakMap(), _position = new WeakMap(), _layer = new WeakMap();
export default Fullscreen;

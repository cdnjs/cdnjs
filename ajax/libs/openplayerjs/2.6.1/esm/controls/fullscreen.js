import { EVENT_OPTIONS, IS_ANDROID, IS_IPHONE } from '../utils/constants';
import { removeElement } from '../utils/general';
class Fullscreen {
    constructor(player, position, layer) {
        this.fullscreenEvents = [];
        this.fullscreenWidth = 0;
        this.fullscreenHeight = 0;
        this.player = player;
        this.labels = player.getOptions().labels;
        this.position = position;
        this.layer = layer;
        this.isFullscreen = document.body.classList.contains('op-fullscreen__on');
        const target = document;
        this.fullScreenEnabled = !!(target.fullscreenEnabled || target.mozFullScreenEnabled ||
            target.msFullscreenEnabled || target.webkitSupportsFullscreen ||
            target.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
        return this;
    }
    create() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.className = `op-controls__fullscreen op-control__${this.position}`;
        this.button.tabIndex = 0;
        this.button.title = this.labels.fullscreen;
        this.button.setAttribute('aria-controls', this.player.id);
        this.button.setAttribute('aria-pressed', 'false');
        this.button.setAttribute('aria-label', this.labels.fullscreen);
        this.button.innerHTML = `<span class="op-sr">${this.labels.fullscreen}</span>`;
        this.clickEvent = () => {
            this.button.setAttribute('aria-pressed', 'true');
            this.toggleFullscreen();
        };
        this.fullscreenEvents = [
            'fullscreenchange',
            'mozfullscreenchange',
            'webkitfullscreenchange',
            'msfullscreenchange',
        ];
        this._setFullscreenData(false);
        this.player.getContainer().addEventListener('keydown', this._keydownEvent.bind(this), EVENT_OPTIONS);
        this.fullscreenEvents.forEach(event => {
            document.addEventListener(event, this._fullscreenChange.bind(this), EVENT_OPTIONS);
        });
        this.button.addEventListener('click', this.clickEvent.bind(this), EVENT_OPTIONS);
        this.player.getControls().getLayer(this.layer).appendChild(this.button);
        if (IS_IPHONE) {
            this.player.getElement().addEventListener('webkitbeginfullscreen', () => {
                this.isFullscreen = true;
                this._setFullscreenData(true);
                document.body.classList.add('op-fullscreen__on');
            }, EVENT_OPTIONS);
            this.player.getElement().addEventListener('webkitendfullscreen', () => {
                this.isFullscreen = false;
                this._setFullscreenData(false);
                document.body.classList.remove('op-fullscreen__on');
            }, EVENT_OPTIONS);
        }
    }
    destroy() {
        this.player.getContainer().removeEventListener('keydown', this._keydownEvent.bind(this));
        this.fullscreenEvents.forEach(event => {
            document.removeEventListener(event, this._fullscreenChange.bind(this));
        });
        if (IS_IPHONE) {
            this.player.getElement().removeEventListener('webkitbeginfullscreen', () => {
                this.isFullscreen = true;
                this._setFullscreenData(false);
                document.body.classList.add('op-fullscreen__on');
            });
            this.player.getElement().removeEventListener('webkitendfullscreen', () => {
                this.isFullscreen = false;
                this._setFullscreenData(true);
                document.body.classList.remove('op-fullscreen__on');
            });
        }
        this.button.removeEventListener('click', this.clickEvent.bind(this));
        removeElement(this.button);
    }
    toggleFullscreen() {
        if (this.isFullscreen) {
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
            const video = this.player.getElement();
            this.fullscreenWidth = window.screen.width;
            this.fullscreenHeight = window.screen.height;
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
                if (!this.isFullscreen) {
                    screen.orientation.lock('landscape');
                }
            }
        }
    }
    _fullscreenChange() {
        const width = this.isFullscreen ? 0 : this.fullscreenWidth;
        const height = this.isFullscreen ? 0 : this.fullscreenHeight;
        this._setFullscreenData(!this.isFullscreen);
        if (this.player.isAd()) {
            this.player.getAd().resizeAds(width, height);
        }
        this.isFullscreen = !this.isFullscreen;
        if (this.isFullscreen) {
            document.body.classList.add('op-fullscreen__on');
        }
        else {
            document.body.classList.remove('op-fullscreen__on');
        }
        this._resize(width, height);
    }
    _setFullscreenData(state) {
        this.player.getContainer().setAttribute('data-fullscreen', (!!state).toString());
        if (state) {
            this.button.classList.add('op-controls__fullscreen--out');
        }
        else {
            this.button.classList.remove('op-controls__fullscreen--out');
        }
    }
    _resize(width, height) {
        const wrapper = this.player.getContainer();
        const video = this.player.getElement();
        const options = this.player.getOptions();
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
export default Fullscreen;

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
var _settings, _timer, _controls, _player, _items, _controlEls;
import Captions from './controls/captions';
import Fullscreen from './controls/fullscreen';
import Levels from './controls/levels';
import Play from './controls/play';
import Progress from './controls/progress';
import Settings from './controls/settings';
import Time from './controls/time';
import Volume from './controls/volume';
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS } from './utils/constants';
import { addEvent } from './utils/events';
import { isAudio, isVideo, removeElement } from './utils/general';
class Controls {
    constructor(player) {
        this.events = {
            media: {},
            mouse: {},
        };
        _settings.set(this, void 0);
        _timer.set(this, 0);
        _controls.set(this, void 0);
        _player.set(this, void 0);
        _items.set(this, void 0);
        _controlEls.set(this, {
            Captions,
            Fullscreen,
            Levels,
            Play,
            Progress,
            Settings,
            Time,
            Volume,
        });
        __classPrivateFieldSet(this, _player, player);
        this._setElements();
        return this;
    }
    create() {
        __classPrivateFieldGet(this, _player).getElement().controls = false;
        const isMediaVideo = isVideo(__classPrivateFieldGet(this, _player).getElement());
        this._createControlsLayer();
        this._buildElements();
        this.events.controlschanged = () => {
            this.destroy();
            this._setElements();
            this.create();
        };
        this.events.ended = () => {
            __classPrivateFieldGet(this, _player).getContainer().classList.remove('op-controls--hidden');
        };
        __classPrivateFieldGet(this, _player).getElement().addEventListener('controlschanged', this.events.controlschanged, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _player).getElement().addEventListener('ended', this.events.ended, EVENT_OPTIONS);
        const { alwaysVisible } = __classPrivateFieldGet(this, _player).getOptions().controls;
        if (!alwaysVisible && !IS_ANDROID && !IS_IOS) {
            this.events.mouse.mouseenter = () => {
                if (isMediaVideo && !__classPrivateFieldGet(this, _player).activeElement().paused) {
                    this._stopControlTimer();
                    if (__classPrivateFieldGet(this, _player).activeElement().currentTime) {
                        __classPrivateFieldGet(this, _player).playBtn.setAttribute('aria-hidden', __classPrivateFieldGet(this, _player).isMedia() ? 'false' : 'true');
                        __classPrivateFieldGet(this, _player).loader.setAttribute('aria-hidden', 'true');
                    }
                    else if (__classPrivateFieldGet(this, _player).getOptions().showLoaderOnInit) {
                        __classPrivateFieldGet(this, _player).playBtn.setAttribute('aria-hidden', 'true');
                        __classPrivateFieldGet(this, _player).loader.setAttribute('aria-hidden', 'false');
                    }
                    __classPrivateFieldGet(this, _player).getContainer().classList.remove('op-controls--hidden');
                    this._startControlTimer(2500);
                }
            };
            this.events.mouse.mousemove = () => {
                if (isMediaVideo) {
                    if (__classPrivateFieldGet(this, _player).activeElement().currentTime) {
                        __classPrivateFieldGet(this, _player).loader.setAttribute('aria-hidden', 'true');
                        __classPrivateFieldGet(this, _player).playBtn.setAttribute('aria-hidden', __classPrivateFieldGet(this, _player).isMedia() ? 'false' : 'true');
                    }
                    else {
                        __classPrivateFieldGet(this, _player).playBtn.setAttribute('aria-hidden', __classPrivateFieldGet(this, _player).getOptions().showLoaderOnInit ? 'true' : 'false');
                        __classPrivateFieldGet(this, _player).loader.setAttribute('aria-hidden', __classPrivateFieldGet(this, _player).getOptions().showLoaderOnInit ? 'false' : 'true');
                    }
                    __classPrivateFieldGet(this, _player).getContainer().classList.remove('op-controls--hidden');
                    this._startControlTimer(2500);
                }
            };
            this.events.mouse.mouseleave = () => {
                if (isMediaVideo && !__classPrivateFieldGet(this, _player).activeElement().paused) {
                    this._startControlTimer(1000);
                }
            };
            this.events.media.play = () => {
                if (isMediaVideo) {
                    this._startControlTimer(__classPrivateFieldGet(this, _player).getOptions().hidePlayBtnTimer);
                }
            };
            this.events.media.pause = () => {
                __classPrivateFieldGet(this, _player).getContainer().classList.remove('op-controls--hidden');
                this._stopControlTimer();
            };
            Object.keys(this.events.media).forEach(event => {
                __classPrivateFieldGet(this, _player).getElement().addEventListener(event, this.events.media[event], EVENT_OPTIONS);
            });
            Object.keys(this.events.mouse).forEach(event => {
                __classPrivateFieldGet(this, _player).getContainer().addEventListener(event, this.events.mouse[event], EVENT_OPTIONS);
            });
            this._startControlTimer(3000);
        }
    }
    destroy() {
        if (!IS_ANDROID && !IS_IOS) {
            Object.keys(this.events.mouse).forEach(event => {
                __classPrivateFieldGet(this, _player).getContainer().removeEventListener(event, this.events.mouse[event]);
            });
            Object.keys(this.events.media).forEach(event => {
                __classPrivateFieldGet(this, _player).getElement().removeEventListener(event, this.events.media[event]);
            });
            this._stopControlTimer();
        }
        __classPrivateFieldGet(this, _player).getElement().removeEventListener('controlschanged', this.events.controlschanged);
        __classPrivateFieldGet(this, _player).getElement().removeEventListener('ended', this.events.ended);
        Object.keys(__classPrivateFieldGet(this, _items)).forEach((position) => {
            __classPrivateFieldGet(this, _items)[position].forEach((item) => {
                if (item.custom) {
                    this._destroyCustomControl(item);
                }
                else if (typeof item.destroy === 'function') {
                    item.destroy();
                }
            });
        });
        removeElement(__classPrivateFieldGet(this, _controls));
    }
    getContainer() {
        return __classPrivateFieldGet(this, _controls);
    }
    getLayer(layer) {
        return __classPrivateFieldGet(this, _controls).querySelector(`.op-controls-layer__${layer}`) || __classPrivateFieldGet(this, _controls);
    }
    _createControlsLayer() {
        if (!__classPrivateFieldGet(this, _controls) || !__classPrivateFieldGet(this, _player).getContainer().querySelector('.op-controls')) {
            __classPrivateFieldSet(this, _controls, document.createElement('div'));
            __classPrivateFieldGet(this, _controls).className = 'op-controls';
            __classPrivateFieldGet(this, _player).getContainer().appendChild(__classPrivateFieldGet(this, _controls));
        }
    }
    _startControlTimer(time) {
        const el = __classPrivateFieldGet(this, _player).activeElement();
        this._stopControlTimer();
        if (typeof window !== 'undefined') {
            __classPrivateFieldSet(this, _timer, window.setTimeout(() => {
                if ((!el.paused || !el.ended) && isVideo(__classPrivateFieldGet(this, _player).getElement())) {
                    __classPrivateFieldGet(this, _player).getContainer().classList.add('op-controls--hidden');
                    __classPrivateFieldGet(this, _player).playBtn.setAttribute('aria-hidden', 'true');
                    this._stopControlTimer();
                    const event = addEvent('controlshidden');
                    __classPrivateFieldGet(this, _player).getElement().dispatchEvent(event);
                }
            }, time));
        }
    }
    _stopControlTimer() {
        if (__classPrivateFieldGet(this, _timer) !== 0) {
            clearTimeout(__classPrivateFieldGet(this, _timer));
            __classPrivateFieldSet(this, _timer, 0);
        }
    }
    _setElements() {
        const controls = __classPrivateFieldGet(this, _player).getOptions().controls.layers;
        __classPrivateFieldSet(this, _items, {
            'bottom-left': [],
            'bottom-middle': [],
            'bottom-right': [],
            'left': [],
            'main': [],
            'middle': [],
            'right': [],
            'top-left': [],
            'top-middle': [],
            'top-right': [],
        });
        const isVideoEl = isVideo(__classPrivateFieldGet(this, _player).getElement());
        const isAudioEl = isAudio(__classPrivateFieldGet(this, _player).getElement());
        const controlPositions = Object.keys(controls);
        const layersExist = controlPositions.find(item => /^(top|bottom)/.test(item));
        this._createControlsLayer();
        controlPositions.forEach((position) => {
            const [layer, pos] = position.split('-');
            if (pos) {
                if (!__classPrivateFieldGet(this, _controls).classList.contains('op-controls__stacked')) {
                    __classPrivateFieldGet(this, _controls).classList.add('op-controls__stacked');
                }
                const className = `op-controls-layer__${layer}`;
                if (!__classPrivateFieldGet(this, _controls).querySelector(`.${className}`)) {
                    const controlLayer = document.createElement('div');
                    controlLayer.className = className;
                    __classPrivateFieldGet(this, _controls).appendChild(controlLayer);
                }
            }
            else if (layersExist) {
                const className = 'op-controls-layer__center';
                if (!__classPrivateFieldGet(this, _controls).querySelector(`.${className}`)) {
                    const controlLayer = document.createElement('div');
                    controlLayer.className = className;
                    __classPrivateFieldGet(this, _controls).appendChild(controlLayer);
                }
            }
            controls[position]
                .filter((v, i, a) => a.indexOf(v) === i)
                .forEach((el) => {
                const currentLayer = layersExist && !pos ? 'center' : layer;
                const className = `${el.charAt(0).toUpperCase()}${el.slice(1)}`;
                const item = new (__classPrivateFieldGet(this, _controlEls)[className])(__classPrivateFieldGet(this, _player), pos || layer, currentLayer);
                if (el === 'settings') {
                    __classPrivateFieldSet(this, _settings, item);
                }
                if (isVideoEl || (el !== 'fullscreen' && isAudioEl)) {
                    __classPrivateFieldGet(this, _items)[position].push(item);
                }
            });
        });
        __classPrivateFieldGet(this, _player).getCustomControls().forEach(item => {
            const [layer, pos] = item.position.split('-');
            const currentLayer = layersExist && !pos ? 'center' : layer;
            item.layer = currentLayer;
            item.position = pos || layer;
            if (item.position === 'right') {
                __classPrivateFieldGet(this, _items)[item.position].unshift(item);
            }
            else {
                __classPrivateFieldGet(this, _items)[item.position].push(item);
            }
        });
    }
    _buildElements() {
        Object.keys(__classPrivateFieldGet(this, _items)).forEach((position) => {
            __classPrivateFieldGet(this, _items)[position].forEach((item) => {
                if (item.custom) {
                    this._createCustomControl(item);
                }
                else {
                    item.create();
                }
            });
        });
        Object.keys(__classPrivateFieldGet(this, _items)).forEach((position) => {
            __classPrivateFieldGet(this, _items)[position].forEach((item) => {
                const allowDefault = !__classPrivateFieldGet(this, _player).getOptions().detachMenus || item instanceof Settings;
                if (allowDefault && !item.custom && typeof item.addSettings === 'function') {
                    const menuItem = item.addSettings();
                    if (__classPrivateFieldGet(this, _settings) && Object.keys(menuItem).length) {
                        __classPrivateFieldGet(this, _settings).addItem(menuItem.name, menuItem.key, menuItem.default, menuItem.subitems, menuItem.className);
                    }
                }
            });
        });
        const e = addEvent('controlschanged');
        __classPrivateFieldGet(this, _controls).dispatchEvent(e);
    }
    _hideCustomMenu(menu) {
        let timeout;
        if (timeout && typeof window !== 'undefined') {
            window.cancelAnimationFrame(timeout);
        }
        if (typeof window !== 'undefined') {
            timeout = window.requestAnimationFrame(() => {
                menu.setAttribute('aria-hidden', 'true');
            });
        }
    }
    _toggleCustomMenu(event, menu, item) {
        const menus = __classPrivateFieldGet(this, _player).getContainer().querySelectorAll('.op-settings');
        menus.forEach(m => {
            if (m.getAttribute('aria-hidden') === 'false' && m.id !== menu.id) {
                m.setAttribute('aria-hidden', 'true');
            }
        });
        menu.setAttribute('aria-hidden', menu.getAttribute('aria-hidden') === 'true' ? 'false' : 'true');
        if (typeof item.click === 'function') {
            item.click(event);
        }
    }
    _createCustomControl(item) {
        const control = document.createElement('button');
        const icon = /\.(jpg|png|svg|gif)$/.test(item.icon) ? `<img src="${item.icon}">` : item.icon;
        control.className = `op-controls__${item.id} op-control__${item.position} ${item.showInAds ? '' : 'op-control__hide-in-ad'}`;
        control.tabIndex = 0;
        control.id = item.id;
        control.title = item.title;
        control.innerHTML = `${icon} <span class="op-sr">${item.title}</span>`;
        if (item.subitems && Array.isArray(item.subitems) && item.subitems.length > 0) {
            const menu = document.createElement('div');
            menu.className = 'op-settings op-settings__custom';
            menu.id = `${item.id}-menu`;
            menu.setAttribute('aria-hidden', 'true');
            const items = item.subitems.map(s => {
                let itemIcon = '';
                if (s.icon) {
                    itemIcon = /\.(jpg|png|svg|gif)$/.test(s.icon) ? `<img src="${s.icon}">` : s.icon;
                }
                return `<div class="op-settings__menu-item" tabindex="0" ${s.title ? `title="${s.title}"` : ''} role="menuitemradio">
                    <div class="op-settings__menu-label" id="${s.id}" data-value="${item.id}-${s.id}">${itemIcon} ${s.label}</div>
                </div>`;
            });
            menu.innerHTML = `<div class="op-settings__menu" role="menu">${items.join('')}</div>`;
            __classPrivateFieldGet(this, _player).getContainer().appendChild(menu);
            item.subitems.forEach(subitem => {
                const menuItem = menu.querySelector(`#${subitem.id}`);
                if (menuItem && subitem.click && typeof subitem.click === 'function') {
                    menuItem.addEventListener('click', subitem.click, EVENT_OPTIONS);
                }
            });
            control.addEventListener('click', (e) => this._toggleCustomMenu(e, menu, item), EVENT_OPTIONS);
            __classPrivateFieldGet(this, _player).getElement().addEventListener('controlshidden', () => this._hideCustomMenu(menu), EVENT_OPTIONS);
        }
        else if (item.click && typeof item.click === 'function') {
            control.addEventListener('click', item.click, EVENT_OPTIONS);
        }
        if (item.mouseenter && typeof item.mouseenter === 'function') {
            control.addEventListener('mouseenter', item.mouseenter, EVENT_OPTIONS);
        }
        if (item.mouseleave && typeof item.mouseleave === 'function') {
            control.addEventListener('mouseenter', item.mouseleave, EVENT_OPTIONS);
        }
        if (item.keydown && typeof item.keydown === 'function') {
            control.addEventListener('keydown', item.keydown, EVENT_OPTIONS);
        }
        if (item.blur && typeof item.blur === 'function') {
            control.addEventListener('blur', item.blur, EVENT_OPTIONS);
        }
        if (item.focus && typeof item.focus === 'function') {
            control.addEventListener('focus', item.focus, EVENT_OPTIONS);
        }
        if (item.layer) {
            if (item.layer === 'main') {
                __classPrivateFieldGet(this, _player).getContainer().appendChild(control);
            }
            else {
                this.getLayer(item.layer).appendChild(control);
            }
        }
    }
    _destroyCustomControl(item) {
        const key = item.title.toLowerCase().replace(' ', '-');
        const control = this.getContainer().querySelector(`.op-controls__${key}`);
        if (control) {
            if (item.subitems && Array.isArray(item.subitems) && item.subitems.length > 0) {
                const menu = __classPrivateFieldGet(this, _player).getContainer().querySelector(`#${item.id}-menu`);
                if (menu) {
                    item.subitems.forEach(subitem => {
                        const menuItem = menu.querySelector(`#${subitem.id}`);
                        if (menuItem && subitem.click && typeof subitem.click === 'function') {
                            menuItem.removeEventListener('click', subitem.click);
                        }
                    });
                    control.removeEventListener('click', (e) => this._toggleCustomMenu(e, menu, item));
                    __classPrivateFieldGet(this, _player).getElement().removeEventListener('controlshidden', () => this._hideCustomMenu(menu));
                    removeElement(menu);
                }
            }
            if (item.click && typeof item.click === 'function') {
                control.removeEventListener('click', item.click);
            }
            if (item.mouseenter && typeof item.mouseenter === 'function') {
                control.removeEventListener('mouseenter', item.mouseenter);
            }
            if (item.mouseleave && typeof item.mouseleave === 'function') {
                control.removeEventListener('mouseenter', item.mouseleave);
            }
            if (item.keydown && typeof item.keydown === 'function') {
                control.removeEventListener('keydown', item.keydown);
            }
            if (item.blur && typeof item.blur === 'function') {
                control.removeEventListener('blur', item.blur);
            }
            if (item.focus && typeof item.focus === 'function') {
                control.removeEventListener('focus', item.focus);
            }
            removeElement(control);
        }
    }
}
_settings = new WeakMap(), _timer = new WeakMap(), _controls = new WeakMap(), _player = new WeakMap(), _items = new WeakMap(), _controlEls = new WeakMap();
export default Controls;

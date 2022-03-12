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
var _Controls_settings, _Controls_timer, _Controls_controls, _Controls_player, _Controls_items, _Controls_controlEls;
import Captions from './controls/captions';
import Fullscreen from './controls/fullscreen';
import Levels from './controls/levels';
import Play from './controls/play';
import Progress from './controls/progress';
import Settings from './controls/settings';
import Time from './controls/time';
import Volume from './controls/volume';
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS } from './utils/constants';
import { addEvent, isAudio, isVideo, sanitize } from './utils/general';
class Controls {
    constructor(player) {
        this.events = {
            media: {},
            mouse: {},
        };
        _Controls_settings.set(this, void 0);
        _Controls_timer.set(this, 0);
        _Controls_controls.set(this, void 0);
        _Controls_player.set(this, void 0);
        _Controls_items.set(this, void 0);
        _Controls_controlEls.set(this, {
            Captions,
            Fullscreen,
            Levels,
            Play,
            Progress,
            Settings,
            Time,
            Volume,
        });
        __classPrivateFieldSet(this, _Controls_player, player, "f");
        this._setElements();
        return this;
    }
    create() {
        __classPrivateFieldGet(this, _Controls_player, "f").getElement().controls = false;
        const isMediaVideo = isVideo(__classPrivateFieldGet(this, _Controls_player, "f").getElement());
        this._createControlsLayer();
        this._buildElements();
        this.events.controlschanged = () => {
            this.destroy();
            this._setElements();
            this.create();
        };
        this.events.ended = () => {
            __classPrivateFieldGet(this, _Controls_player, "f").getContainer().classList.remove('op-controls--hidden');
        };
        __classPrivateFieldGet(this, _Controls_player, "f").getElement().addEventListener('controlschanged', this.events.controlschanged, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Controls_player, "f").getElement().addEventListener('ended', this.events.ended, EVENT_OPTIONS);
        const { alwaysVisible } = __classPrivateFieldGet(this, _Controls_player, "f").getOptions().controls || {};
        if (!alwaysVisible) {
            const showControls = () => {
                if (isMediaVideo) {
                    __classPrivateFieldGet(this, _Controls_player, "f").getContainer().classList.remove('op-controls--hidden');
                    this._stopControlTimer();
                }
            };
            this.events.mouse.mouseenter = () => {
                if (isMediaVideo && !__classPrivateFieldGet(this, _Controls_player, "f").activeElement().paused) {
                    this._stopControlTimer();
                    if (__classPrivateFieldGet(this, _Controls_player, "f").activeElement().currentTime) {
                        __classPrivateFieldGet(this, _Controls_player, "f").playBtn.setAttribute('aria-hidden', __classPrivateFieldGet(this, _Controls_player, "f").isMedia() ? 'false' : 'true');
                        __classPrivateFieldGet(this, _Controls_player, "f").loader.setAttribute('aria-hidden', 'true');
                    }
                    else if (__classPrivateFieldGet(this, _Controls_player, "f").getOptions().showLoaderOnInit) {
                        __classPrivateFieldGet(this, _Controls_player, "f").playBtn.setAttribute('aria-hidden', 'true');
                        __classPrivateFieldGet(this, _Controls_player, "f").loader.setAttribute('aria-hidden', 'false');
                    }
                    __classPrivateFieldGet(this, _Controls_player, "f").getContainer().classList.remove('op-controls--hidden');
                    this._startControlTimer(2500);
                }
            };
            this.events.mouse.mousemove = () => {
                if (isMediaVideo && !__classPrivateFieldGet(this, _Controls_player, "f").activeElement().paused) {
                    if (__classPrivateFieldGet(this, _Controls_player, "f").activeElement().currentTime) {
                        __classPrivateFieldGet(this, _Controls_player, "f").loader.setAttribute('aria-hidden', 'true');
                        __classPrivateFieldGet(this, _Controls_player, "f").playBtn.setAttribute('aria-hidden', __classPrivateFieldGet(this, _Controls_player, "f").isMedia() ? 'false' : 'true');
                    }
                    else {
                        __classPrivateFieldGet(this, _Controls_player, "f").playBtn.setAttribute('aria-hidden', __classPrivateFieldGet(this, _Controls_player, "f").getOptions().showLoaderOnInit ? 'true' : 'false');
                        __classPrivateFieldGet(this, _Controls_player, "f").loader.setAttribute('aria-hidden', __classPrivateFieldGet(this, _Controls_player, "f").getOptions().showLoaderOnInit ? 'false' : 'true');
                    }
                    __classPrivateFieldGet(this, _Controls_player, "f").getContainer().classList.remove('op-controls--hidden');
                    this._startControlTimer(2500);
                }
            };
            this.events.mouse.mouseleave = () => {
                if (isMediaVideo && !__classPrivateFieldGet(this, _Controls_player, "f").activeElement().paused) {
                    this._startControlTimer(1000);
                }
            };
            this.events.media.play = () => {
                if (isMediaVideo) {
                    this._startControlTimer(__classPrivateFieldGet(this, _Controls_player, "f").getOptions().hidePlayBtnTimer || 350);
                }
            };
            this.events.media.loadedmetadata = showControls.bind(this);
            this.events.media.pause = showControls.bind(this);
            this.events.media.waiting = showControls.bind(this);
            this.events.media.stalled = showControls.bind(this);
            this.events.media.playererror = showControls.bind(this);
            Object.keys(this.events.media).forEach((event) => {
                __classPrivateFieldGet(this, _Controls_player, "f").getElement().addEventListener(event, this.events.media[event], EVENT_OPTIONS);
            });
            if (IS_ANDROID || IS_IOS) {
                __classPrivateFieldGet(this, _Controls_player, "f").getContainer().addEventListener('click', this.events.mouse.mouseenter, EVENT_OPTIONS);
            }
            else {
                Object.keys(this.events.mouse).forEach((event) => {
                    __classPrivateFieldGet(this, _Controls_player, "f").getContainer().addEventListener(event, this.events.mouse[event], EVENT_OPTIONS);
                });
            }
            if (isMediaVideo && !__classPrivateFieldGet(this, _Controls_player, "f").activeElement().paused) {
                this._startControlTimer(3000);
            }
        }
    }
    destroy() {
        if (!IS_ANDROID && !IS_IOS) {
            Object.keys(this.events.mouse).forEach((event) => {
                __classPrivateFieldGet(this, _Controls_player, "f").getContainer().removeEventListener(event, this.events.mouse[event]);
            });
            Object.keys(this.events.media).forEach((event) => {
                __classPrivateFieldGet(this, _Controls_player, "f").getElement().removeEventListener(event, this.events.media[event]);
            });
            this._stopControlTimer();
        }
        __classPrivateFieldGet(this, _Controls_player, "f").getElement().removeEventListener('controlschanged', this.events.controlschanged);
        __classPrivateFieldGet(this, _Controls_player, "f").getElement().removeEventListener('ended', this.events.ended);
        Object.keys(__classPrivateFieldGet(this, _Controls_items, "f")).forEach((position) => {
            __classPrivateFieldGet(this, _Controls_items, "f")[position].forEach((item) => {
                if (item.custom) {
                    this._destroyCustomControl(item);
                }
                else if (typeof item.destroy === 'function') {
                    item.destroy();
                }
            });
        });
        __classPrivateFieldGet(this, _Controls_controls, "f").remove();
    }
    getContainer() {
        return __classPrivateFieldGet(this, _Controls_controls, "f");
    }
    getLayer(layer) {
        return __classPrivateFieldGet(this, _Controls_controls, "f").querySelector(`.op-controls-layer__${layer}`) || __classPrivateFieldGet(this, _Controls_controls, "f");
    }
    _createControlsLayer() {
        if (!__classPrivateFieldGet(this, _Controls_controls, "f") || !__classPrivateFieldGet(this, _Controls_player, "f").getContainer().querySelector('.op-controls')) {
            __classPrivateFieldSet(this, _Controls_controls, document.createElement('div'), "f");
            __classPrivateFieldGet(this, _Controls_controls, "f").className = 'op-controls';
            __classPrivateFieldGet(this, _Controls_player, "f").getContainer().appendChild(__classPrivateFieldGet(this, _Controls_controls, "f"));
            const messageContainer = document.createElement('div');
            messageContainer.className = 'op-status';
            messageContainer.innerHTML = '<span></span>';
            messageContainer.tabIndex = -1;
            messageContainer.setAttribute('aria-hidden', 'true');
            if (isAudio(__classPrivateFieldGet(this, _Controls_player, "f").getElement())) {
                __classPrivateFieldGet(this, _Controls_controls, "f").appendChild(messageContainer);
            }
        }
    }
    _startControlTimer(time) {
        const el = __classPrivateFieldGet(this, _Controls_player, "f").activeElement();
        this._stopControlTimer();
        if (typeof window !== 'undefined') {
            __classPrivateFieldSet(this, _Controls_timer, window.setTimeout(() => {
                if ((!el.paused || !el.ended) && isVideo(__classPrivateFieldGet(this, _Controls_player, "f").getElement())) {
                    __classPrivateFieldGet(this, _Controls_player, "f").getContainer().classList.add('op-controls--hidden');
                    __classPrivateFieldGet(this, _Controls_player, "f").playBtn.setAttribute('aria-hidden', 'true');
                    this._stopControlTimer();
                    const event = addEvent('controlshidden');
                    __classPrivateFieldGet(this, _Controls_player, "f").getElement().dispatchEvent(event);
                }
            }, time), "f");
        }
    }
    _stopControlTimer() {
        if (__classPrivateFieldGet(this, _Controls_timer, "f") !== 0) {
            clearTimeout(__classPrivateFieldGet(this, _Controls_timer, "f"));
            __classPrivateFieldSet(this, _Controls_timer, 0, "f");
        }
    }
    _setElements() {
        var _a;
        const controls = ((_a = __classPrivateFieldGet(this, _Controls_player, "f").getOptions().controls) === null || _a === void 0 ? void 0 : _a.layers) || {};
        __classPrivateFieldSet(this, _Controls_items, {
            'bottom-left': [],
            'bottom-middle': [],
            'bottom-right': [],
            left: [],
            main: [],
            middle: [],
            right: [],
            'top-left': [],
            'top-middle': [],
            'top-right': [],
        }, "f");
        const isVideoEl = isVideo(__classPrivateFieldGet(this, _Controls_player, "f").getElement());
        const isAudioEl = isAudio(__classPrivateFieldGet(this, _Controls_player, "f").getElement());
        const controlPositions = Object.keys(controls);
        const layersExist = controlPositions.find((item) => /^(top|bottom)/.test(item));
        this._createControlsLayer();
        controlPositions.forEach((position) => {
            const [layer, pos] = position.split('-');
            if (pos) {
                if (!__classPrivateFieldGet(this, _Controls_controls, "f").classList.contains('op-controls__stacked')) {
                    __classPrivateFieldGet(this, _Controls_controls, "f").classList.add('op-controls__stacked');
                }
                const className = `op-controls-layer__${layer}`;
                if (!__classPrivateFieldGet(this, _Controls_controls, "f").querySelector(`.${className}`)) {
                    const controlLayer = document.createElement('div');
                    controlLayer.className = className;
                    __classPrivateFieldGet(this, _Controls_controls, "f").appendChild(controlLayer);
                }
            }
            else if (layersExist) {
                const className = 'op-controls-layer__center';
                if (!__classPrivateFieldGet(this, _Controls_controls, "f").querySelector(`.${className}`)) {
                    const controlLayer = document.createElement('div');
                    controlLayer.className = className;
                    __classPrivateFieldGet(this, _Controls_controls, "f").appendChild(controlLayer);
                }
            }
            const layers = controls ? controls[position] : null;
            if (layers) {
                layers
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .forEach((el) => {
                    const currentLayer = layersExist && !pos ? 'center' : layer;
                    const className = `${el.charAt(0).toUpperCase()}${el.slice(1)}`;
                    const item = new (__classPrivateFieldGet(this, _Controls_controlEls, "f")[className])(__classPrivateFieldGet(this, _Controls_player, "f"), pos || layer, currentLayer);
                    if (el === 'settings') {
                        __classPrivateFieldSet(this, _Controls_settings, item, "f");
                    }
                    if (isVideoEl || (el !== 'fullscreen' && isAudioEl)) {
                        __classPrivateFieldGet(this, _Controls_items, "f")[position].push(item);
                    }
                });
            }
        });
        __classPrivateFieldGet(this, _Controls_player, "f").getCustomControls().forEach((item) => {
            const [layer, pos] = item.position.split('-');
            const currentLayer = layersExist && !pos ? 'center' : layer;
            item.layer = currentLayer;
            item.position = pos || layer;
            if (item.position === 'right') {
                __classPrivateFieldGet(this, _Controls_items, "f")[item.position].unshift(item);
            }
            else {
                __classPrivateFieldGet(this, _Controls_items, "f")[item.position].push(item);
            }
        });
    }
    _buildElements() {
        Object.keys(__classPrivateFieldGet(this, _Controls_items, "f")).forEach((position) => {
            __classPrivateFieldGet(this, _Controls_items, "f")[position].forEach((item) => {
                if (item.custom) {
                    this._createCustomControl(item);
                }
                else {
                    item.create();
                }
            });
        });
        Object.keys(__classPrivateFieldGet(this, _Controls_items, "f")).forEach((position) => {
            __classPrivateFieldGet(this, _Controls_items, "f")[position].forEach((item) => {
                const allowDefault = !__classPrivateFieldGet(this, _Controls_player, "f").getOptions().detachMenus || item instanceof Settings;
                const current = item;
                if (allowDefault && !current.custom && typeof current.addSettings === 'function') {
                    const menuItem = current.addSettings();
                    if (__classPrivateFieldGet(this, _Controls_settings, "f") && Object.keys(menuItem).length) {
                        __classPrivateFieldGet(this, _Controls_settings, "f").addItem(menuItem.name, menuItem.key, menuItem.default, menuItem.subitems, menuItem.className);
                    }
                }
            });
        });
        const e = addEvent('controlschanged');
        __classPrivateFieldGet(this, _Controls_controls, "f").dispatchEvent(e);
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
        const menus = __classPrivateFieldGet(this, _Controls_player, "f").getContainer().querySelectorAll('.op-settings');
        menus.forEach((m) => {
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
        const icon = /\.(jpg|png|svg|gif)$/.test(item.icon) ? `<img src="${sanitize(item.icon)}">` : sanitize(item.icon);
        control.className = `op-controls__${item.id} op-control__${item.position} ${item.showInAds ? '' : 'op-control__hide-in-ad'}`;
        control.tabIndex = 0;
        control.id = item.id;
        control.title = sanitize(item.title);
        control.innerHTML = item.content ? sanitize(item.content) : icon;
        if (item.subitems && Array.isArray(item.subitems) && item.subitems.length > 0) {
            const menu = document.createElement('div');
            menu.className = 'op-settings op-settings__custom';
            menu.id = `${item.id}-menu`;
            menu.setAttribute('aria-hidden', 'true');
            const items = item.subitems.map((s) => {
                let itemIcon = '';
                if (s.icon) {
                    itemIcon = /\.(jpg|png|svg|gif)$/.test(s.icon) ? `<img src="${s.icon}">` : s.icon;
                }
                return `<div class="op-settings__menu-item" tabindex="0" ${s.title ? `title="${s.title}"` : ''} role="menuitemradio">
                    <div class="op-settings__menu-label" id="${s.id}" data-value="${item.id}-${s.id}">${itemIcon} ${s.label}</div>
                </div>`;
            });
            menu.innerHTML = `<div class="op-settings__menu" role="menu">${items.join('')}</div>`;
            __classPrivateFieldGet(this, _Controls_player, "f").getContainer().appendChild(menu);
            item.subitems.forEach((subitem) => {
                const menuItem = menu.querySelector(`#${subitem.id}`);
                if (menuItem && subitem.click && typeof subitem.click === 'function') {
                    menuItem.addEventListener('click', subitem.click, EVENT_OPTIONS);
                }
            });
            control.addEventListener('click', (e) => this._toggleCustomMenu(e, menu, item), EVENT_OPTIONS);
            __classPrivateFieldGet(this, _Controls_player, "f").getElement().addEventListener('controlshidden', () => this._hideCustomMenu(menu), EVENT_OPTIONS);
        }
        else if (item.click && typeof item.click === 'function') {
            control.addEventListener('click', item.click, EVENT_OPTIONS);
        }
        if (item.mouseenter && typeof item.mouseenter === 'function') {
            control.addEventListener('mouseenter', item.mouseenter, EVENT_OPTIONS);
        }
        if (item.mouseleave && typeof item.mouseleave === 'function') {
            control.addEventListener('mouseleave', item.mouseleave, EVENT_OPTIONS);
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
                __classPrivateFieldGet(this, _Controls_player, "f").getContainer().appendChild(control);
            }
            else {
                this.getLayer(item.layer).appendChild(control);
            }
        }
        if (item.init && typeof item.init === 'function') {
            item.init(__classPrivateFieldGet(this, _Controls_player, "f"));
        }
    }
    _destroyCustomControl(item) {
        const key = item.title.toLowerCase().replace(' ', '-');
        const control = this.getContainer().querySelector(`.op-controls__${key}`);
        if (control) {
            if (item.subitems && Array.isArray(item.subitems) && item.subitems.length > 0) {
                const menu = __classPrivateFieldGet(this, _Controls_player, "f").getContainer().querySelector(`#${item.id}-menu`);
                if (menu) {
                    item.subitems.forEach((subitem) => {
                        const menuItem = menu.querySelector(`#${subitem.id}`);
                        if (menuItem && subitem.click && typeof subitem.click === 'function') {
                            menuItem.removeEventListener('click', subitem.click);
                        }
                    });
                    control.removeEventListener('click', (e) => this._toggleCustomMenu(e, menu, item));
                    __classPrivateFieldGet(this, _Controls_player, "f").getElement().removeEventListener('controlshidden', () => this._hideCustomMenu(menu));
                    menu.remove();
                }
            }
            if (item.click && typeof item.click === 'function') {
                control.removeEventListener('click', item.click);
            }
            if (item.mouseenter && typeof item.mouseenter === 'function') {
                control.removeEventListener('mouseenter', item.mouseenter);
            }
            if (item.mouseleave && typeof item.mouseleave === 'function') {
                control.removeEventListener('mouseleave', item.mouseleave);
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
            control.remove();
            if (item.destroy && typeof item.destroy === 'function') {
                item.destroy(__classPrivateFieldGet(this, _Controls_player, "f"));
            }
        }
    }
}
_Controls_settings = new WeakMap(), _Controls_timer = new WeakMap(), _Controls_controls = new WeakMap(), _Controls_player = new WeakMap(), _Controls_items = new WeakMap(), _Controls_controlEls = new WeakMap();
export default Controls;

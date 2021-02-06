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
        this.timer = 0;
        this.controlEls = {
            Captions,
            Fullscreen,
            Levels,
            Play,
            Progress,
            Settings,
            Time,
            Volume,
        };
        this.player = player;
        this._setElements();
        return this;
    }
    create() {
        this.player.getElement().controls = false;
        const isMediaVideo = isVideo(this.player.getElement());
        this._createControlsLayer();
        this._buildElements();
        this.events.controlschanged = () => {
            this.destroy();
            this._setElements();
            this.create();
        };
        this.events.ended = () => {
            this.player.getContainer().classList.remove('op-controls--hidden');
        };
        this.player.getElement().addEventListener('controlschanged', this.events.controlschanged, EVENT_OPTIONS);
        this.player.getElement().addEventListener('ended', this.events.ended, EVENT_OPTIONS);
        const { alwaysVisible } = this.player.getOptions().controls;
        if (!alwaysVisible && !IS_ANDROID && !IS_IOS) {
            this.events.mouse.mouseenter = () => {
                if (isMediaVideo && !this.player.activeElement().paused) {
                    this._stopControlTimer();
                    if (this.player.activeElement().currentTime) {
                        this.player.playBtn.setAttribute('aria-hidden', this.player.isMedia() ? 'false' : 'true');
                        this.player.loader.setAttribute('aria-hidden', 'true');
                    }
                    else if (this.player.getOptions().showLoaderOnInit) {
                        this.player.playBtn.setAttribute('aria-hidden', 'true');
                        this.player.loader.setAttribute('aria-hidden', 'false');
                    }
                    this.player.getContainer().classList.remove('op-controls--hidden');
                    this._startControlTimer(2500);
                }
            };
            this.events.mouse.mousemove = () => {
                if (isMediaVideo) {
                    if (this.player.activeElement().currentTime) {
                        this.player.loader.setAttribute('aria-hidden', 'true');
                        this.player.playBtn.setAttribute('aria-hidden', this.player.isMedia() ? 'false' : 'true');
                    }
                    else {
                        this.player.playBtn.setAttribute('aria-hidden', this.player.getOptions().showLoaderOnInit ? 'true' : 'false');
                        this.player.loader.setAttribute('aria-hidden', this.player.getOptions().showLoaderOnInit ? 'false' : 'true');
                    }
                    this.player.getContainer().classList.remove('op-controls--hidden');
                    this._startControlTimer(2500);
                }
            };
            this.events.mouse.mouseleave = () => {
                if (isMediaVideo && !this.player.activeElement().paused) {
                    this._startControlTimer(1000);
                }
            };
            this.events.media.play = () => {
                if (isMediaVideo) {
                    this._startControlTimer(this.player.getOptions().hidePlayBtnTimer);
                }
            };
            this.events.media.pause = () => {
                this.player.getContainer().classList.remove('op-controls--hidden');
                this._stopControlTimer();
            };
            Object.keys(this.events.media).forEach(event => {
                this.player.getElement().addEventListener(event, this.events.media[event], EVENT_OPTIONS);
            });
            Object.keys(this.events.mouse).forEach(event => {
                this.player.getContainer().addEventListener(event, this.events.mouse[event], EVENT_OPTIONS);
            });
            this._startControlTimer(3000);
        }
    }
    destroy() {
        if (!IS_ANDROID && !IS_IOS) {
            Object.keys(this.events.mouse).forEach(event => {
                this.player.getContainer().removeEventListener(event, this.events.mouse[event]);
            });
            Object.keys(this.events.media).forEach(event => {
                this.player.getElement().removeEventListener(event, this.events.media[event]);
            });
            this._stopControlTimer();
        }
        this.player.getElement().removeEventListener('controlschanged', this.events.controlschanged);
        this.player.getElement().removeEventListener('ended', this.events.ended);
        Object.keys(this.items).forEach((position) => {
            this.items[position].forEach((item) => {
                if (item.custom) {
                    this._destroyCustomControl(item);
                }
                else if (typeof item.destroy === 'function') {
                    item.destroy();
                }
            });
        });
        removeElement(this.controls);
    }
    getContainer() {
        return this.controls;
    }
    getLayer(layer) {
        return this.controls.querySelector(`.op-controls-layer__${layer}`) || this.controls;
    }
    _createControlsLayer() {
        if (!this.controls || !this.player.getContainer().querySelector('.op-controls')) {
            this.controls = document.createElement('div');
            this.controls.className = 'op-controls';
            this.player.getContainer().appendChild(this.controls);
        }
    }
    _startControlTimer(time) {
        const el = this.player.activeElement();
        this._stopControlTimer();
        if (typeof window !== 'undefined') {
            this.timer = window.setTimeout(() => {
                if ((!el.paused || !el.ended) && isVideo(this.player.getElement())) {
                    this.player.getContainer().classList.add('op-controls--hidden');
                    this.player.playBtn.setAttribute('aria-hidden', 'true');
                    this._stopControlTimer();
                    const event = addEvent('controlshidden');
                    this.player.getElement().dispatchEvent(event);
                }
            }, time);
        }
    }
    _stopControlTimer() {
        if (this.timer !== 0) {
            clearTimeout(this.timer);
            this.timer = 0;
        }
    }
    _setElements() {
        const controls = this.player.getOptions().controls.layers;
        this.items = {
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
        };
        const isVideoEl = isVideo(this.player.getElement());
        const isAudioEl = isAudio(this.player.getElement());
        const controlPositions = Object.keys(controls);
        const layersExist = controlPositions.find(item => /^(top|bottom)/.test(item));
        this._createControlsLayer();
        controlPositions.forEach((position) => {
            const [layer, pos] = position.split('-');
            if (pos) {
                const className = `op-controls-layer__${layer}`;
                if (!this.controls.querySelector(`.${className}`)) {
                    const controlLayer = document.createElement('div');
                    controlLayer.className = className;
                    this.controls.appendChild(controlLayer);
                }
            }
            else if (layersExist) {
                const className = 'op-controls-layer__center';
                if (!this.controls.querySelector(`.${className}`)) {
                    const controlLayer = document.createElement('div');
                    controlLayer.className = className;
                    this.controls.appendChild(controlLayer);
                }
            }
            controls[position]
                .filter((v, i, a) => a.indexOf(v) === i)
                .forEach((el) => {
                const currentLayer = layersExist && !pos ? 'center' : layer;
                const className = `${el.charAt(0).toUpperCase()}${el.slice(1)}`;
                const item = new this.controlEls[className](this.player, pos || layer, currentLayer);
                if (el === 'settings') {
                    this.settings = item;
                }
                if (isVideoEl || (el !== 'fullscreen' && isAudioEl)) {
                    this.items[position].push(item);
                }
            });
        });
        this.player.getCustomControls().forEach(item => {
            const [layer, pos] = item.position.split('-');
            const currentLayer = layersExist && !pos ? 'center' : layer;
            item.layer = currentLayer;
            item.position = pos || layer;
            if (item.position === 'right') {
                this.items[item.position].unshift(item);
            }
            else {
                this.items[item.position].push(item);
            }
        });
    }
    _buildElements() {
        Object.keys(this.items).forEach((position) => {
            this.items[position].forEach((item) => {
                if (item.custom) {
                    this._createCustomControl(item);
                }
                else {
                    item.create();
                }
            });
        });
        Object.keys(this.items).forEach((position) => {
            this.items[position].forEach((item) => {
                const allowDefault = !this.player.getOptions().detachMenus || item instanceof Settings;
                if (allowDefault && !item.custom && typeof item.addSettings === 'function') {
                    const menuItem = item.addSettings();
                    if (this.settings && Object.keys(menuItem).length) {
                        this.settings.addItem(menuItem.name, menuItem.key, menuItem.default, menuItem.subitems, menuItem.className);
                    }
                }
            });
        });
        const e = addEvent('controlschanged');
        this.controls.dispatchEvent(e);
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
        const menus = this.player.getContainer().querySelectorAll('.op-settings');
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
            this.player.getContainer().appendChild(menu);
            item.subitems.forEach(subitem => {
                const menuItem = menu.querySelector(`#${subitem.id}`);
                if (menuItem && subitem.click && typeof subitem.click === 'function') {
                    menuItem.addEventListener('click', subitem.click, EVENT_OPTIONS);
                }
            });
            control.addEventListener('click', (e) => this._toggleCustomMenu(e, menu, item), EVENT_OPTIONS);
            this.player.getElement().addEventListener('controlshidden', () => this._hideCustomMenu(menu), EVENT_OPTIONS);
        }
        else if (typeof item.click === 'function') {
            control.addEventListener('click', item.click, EVENT_OPTIONS);
        }
        if (item.layer) {
            if (item.layer === 'main') {
                this.player.getContainer().appendChild(control);
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
                const menu = this.player.getContainer().querySelector(`#${item.id}-menu`);
                if (menu) {
                    item.subitems.forEach(subitem => {
                        const menuItem = menu.querySelector(`#${subitem.id}`);
                        if (menuItem && subitem.click && typeof subitem.click === 'function') {
                            menuItem.removeEventListener('click', subitem.click);
                        }
                    });
                    control.removeEventListener('click', (e) => this._toggleCustomMenu(e, menu, item));
                    this.player.getElement().removeEventListener('controlshidden', () => this._hideCustomMenu(menu));
                    removeElement(menu);
                }
            }
            if (typeof item.click === 'function') {
                control.removeEventListener('click', item.click);
            }
            removeElement(control);
        }
    }
}
export default Controls;

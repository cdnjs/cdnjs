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
var _player, _button, _menu, _events, _detachMenu, _labels, _levels, _default, _position, _layer;
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS, NAV } from '../utils/constants';
import { addEvent } from '../utils/events';
import { hasClass, removeElement } from '../utils/general';
import { isDashSource, isHlsSource } from '../utils/media';
class Levels {
    constructor(player, position, layer) {
        _player.set(this, void 0);
        _button.set(this, void 0);
        _menu.set(this, void 0);
        _events.set(this, {
            button: {},
            global: {},
            media: {},
        });
        _detachMenu.set(this, void 0);
        _labels.set(this, void 0);
        _levels.set(this, []);
        _default.set(this, '');
        _position.set(this, void 0);
        _layer.set(this, void 0);
        __classPrivateFieldSet(this, _player, player);
        __classPrivateFieldSet(this, _labels, player.getOptions().labels);
        __classPrivateFieldSet(this, _detachMenu, player.getOptions().detachMenus);
        __classPrivateFieldSet(this, _position, position);
        __classPrivateFieldSet(this, _layer, layer);
        return this;
    }
    create() {
        const initialLevel = __classPrivateFieldGet(this, _player).getOptions().defaultLevel !== null ?
            parseInt(__classPrivateFieldGet(this, _player).getOptions().defaultLevel, 10) : __classPrivateFieldGet(this, _player).getMedia().level;
        __classPrivateFieldSet(this, _default, `${initialLevel}`);
        const menuItems = this._formatMenuItems();
        const defaultLevel = menuItems.length ? menuItems.find((items) => items.key === __classPrivateFieldGet(this, _default)) : null;
        const defaultLabel = defaultLevel ? defaultLevel.label : __classPrivateFieldGet(this, _labels).auto;
        let levelSet = false;
        __classPrivateFieldSet(this, _button, document.createElement('button'));
        __classPrivateFieldGet(this, _button).className = `op-controls__levels op-control__${__classPrivateFieldGet(this, _position)}`;
        __classPrivateFieldGet(this, _button).tabIndex = 0;
        __classPrivateFieldGet(this, _button).title = __classPrivateFieldGet(this, _labels).mediaLevels;
        __classPrivateFieldGet(this, _button).setAttribute('aria-controls', __classPrivateFieldGet(this, _player).id);
        __classPrivateFieldGet(this, _button).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).mediaLevels);
        __classPrivateFieldGet(this, _button).setAttribute('data-active-level', __classPrivateFieldGet(this, _default));
        __classPrivateFieldGet(this, _button).innerHTML = `<span>${defaultLabel}</span>`;
        const loadLevelsEvent = () => {
            if (!__classPrivateFieldGet(this, _levels).length) {
                this._gatherLevels.bind(this);
                setTimeout(() => {
                    __classPrivateFieldGet(this, _player).getMedia().level = initialLevel;
                    const e = addEvent('controlschanged');
                    __classPrivateFieldGet(this, _player).getElement().dispatchEvent(e);
                }, 0);
            }
            else if (!levelSet) {
                __classPrivateFieldGet(this, _player).getMedia().level = initialLevel;
                levelSet = true;
            }
        };
        __classPrivateFieldGet(this, _events).media.loadedmetadata = loadLevelsEvent.bind(this);
        __classPrivateFieldGet(this, _events).media.manifestLoaded = loadLevelsEvent.bind(this);
        __classPrivateFieldGet(this, _events).media.hlsManifestParsed = loadLevelsEvent.bind(this);
        if (__classPrivateFieldGet(this, _detachMenu)) {
            this._buildMenu();
            __classPrivateFieldGet(this, _events).button.click = () => {
                if (__classPrivateFieldGet(this, _detachMenu)) {
                    const menus = __classPrivateFieldGet(this, _player).getContainer().querySelectorAll('.op-settings');
                    for (let i = 0, total = menus.length; i < total; ++i) {
                        if (menus[i] !== __classPrivateFieldGet(this, _menu)) {
                            menus[i].setAttribute('aria-hidden', 'true');
                        }
                    }
                    if (__classPrivateFieldGet(this, _menu).getAttribute('aria-hidden') === 'true') {
                        __classPrivateFieldGet(this, _menu).setAttribute('aria-hidden', 'false');
                    }
                    else {
                        __classPrivateFieldGet(this, _menu).setAttribute('aria-hidden', 'true');
                    }
                }
            };
            __classPrivateFieldGet(this, _events).button.mouseover = () => {
                if (!IS_IOS && !IS_ANDROID) {
                    const menus = __classPrivateFieldGet(this, _player).getContainer().querySelectorAll('.op-settings');
                    for (let i = 0, total = menus.length; i < total; ++i) {
                        if (menus[i] !== __classPrivateFieldGet(this, _menu)) {
                            menus[i].setAttribute('aria-hidden', 'true');
                        }
                    }
                    if (__classPrivateFieldGet(this, _menu).getAttribute('aria-hidden') === 'true') {
                        __classPrivateFieldGet(this, _menu).setAttribute('aria-hidden', 'false');
                    }
                }
            };
            __classPrivateFieldGet(this, _events).button.mouseout = () => {
                if (!IS_IOS && !IS_ANDROID) {
                    const menus = __classPrivateFieldGet(this, _player).getContainer().querySelectorAll('.op-settings');
                    for (let i = 0, total = menus.length; i < total; ++i) {
                        menus[i].setAttribute('aria-hidden', 'true');
                    }
                    if (__classPrivateFieldGet(this, _menu).getAttribute('aria-hidden') === 'false') {
                        __classPrivateFieldGet(this, _menu).setAttribute('aria-hidden', 'true');
                    }
                }
            };
            __classPrivateFieldGet(this, _button).addEventListener('click', __classPrivateFieldGet(this, _events).button.click, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _button).addEventListener('mouseover', __classPrivateFieldGet(this, _events).button.mouseover, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _menu).addEventListener('mouseover', __classPrivateFieldGet(this, _events).button.mouseover, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _menu).addEventListener('mouseout', __classPrivateFieldGet(this, _events).button.mouseout, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _player).getElement().addEventListener('controlshidden', __classPrivateFieldGet(this, _events).button.mouseout, EVENT_OPTIONS);
        }
        __classPrivateFieldGet(this, _events).global.click = (e) => {
            const option = e.target;
            const currentTime = __classPrivateFieldGet(this, _player).getMedia().currentTime;
            const isPaused = __classPrivateFieldGet(this, _player).getMedia().paused;
            if (option.closest(`#${__classPrivateFieldGet(this, _player).id}`) && hasClass(option, 'op-levels__option')) {
                const levelVal = option.getAttribute('data-value');
                const level = parseInt(levelVal ? levelVal.replace('levels-', '') : '-1', 10);
                __classPrivateFieldSet(this, _default, `${level}`);
                if (__classPrivateFieldGet(this, _detachMenu)) {
                    __classPrivateFieldGet(this, _button).setAttribute('data-active-level', `${level}`);
                    __classPrivateFieldGet(this, _button).innerHTML = `<span>${option.innerText}</span>`;
                    const levels = option.parentElement && option.parentElement.parentElement ?
                        option.parentElement.parentElement.querySelectorAll('.op-settings__submenu-item') : [];
                    for (let i = 0, total = levels.length; i < total; ++i) {
                        levels[i].setAttribute('aria-checked', 'false');
                    }
                    if (option.parentElement) {
                        option.parentElement.setAttribute('aria-checked', 'true');
                    }
                    __classPrivateFieldGet(this, _menu).setAttribute('aria-hidden', 'false');
                }
                __classPrivateFieldGet(this, _player).getMedia().level = level;
                __classPrivateFieldGet(this, _player).getMedia().currentTime = currentTime;
                if (!isPaused) {
                    __classPrivateFieldGet(this, _player).play();
                }
                const event = addEvent('levelchanged', {
                    detail: {
                        label: option.innerText.trim(),
                        level,
                    },
                });
                __classPrivateFieldGet(this, _player).getElement().dispatchEvent(event);
                e.preventDefault();
            }
        };
        const connection = NAV.connection || NAV.mozConnection || NAV.webkitConnection;
        __classPrivateFieldGet(this, _events).global.connection = () => {
            const media = __classPrivateFieldGet(this, _player).getMedia().current;
            if (!isDashSource(media) && !isHlsSource(media)) {
                let type = connection.effectiveType;
                const levels = __classPrivateFieldGet(this, _levels).map(item => (Object.assign(Object.assign({}, item), { resolution: parseInt(item.label.replace('p', ''), 10) })));
                let level = levels.find(item => item.resolution < 360);
                if (type === '4g') {
                    level = levels.find(item => item.resolution >= 720);
                }
                else if (type === '3g') {
                    level = levels.find(item => item.resolution >= 360 && item.resolution < 720);
                }
                if (level) {
                    __classPrivateFieldGet(this, _player).pause();
                    __classPrivateFieldGet(this, _player).getMedia().level = level.id;
                    __classPrivateFieldGet(this, _player).play();
                }
                type = connection.effectiveType;
            }
        };
        Object.keys(__classPrivateFieldGet(this, _events).media).forEach(event => {
            __classPrivateFieldGet(this, _player).getElement().addEventListener(event, __classPrivateFieldGet(this, _events).media[event], EVENT_OPTIONS);
        });
        document.addEventListener('click', __classPrivateFieldGet(this, _events).global.click, EVENT_OPTIONS);
        if (connection) {
            connection.addEventListener('change', __classPrivateFieldGet(this, _events).global.connection, EVENT_OPTIONS);
        }
    }
    destroy() {
        const connection = NAV.connection || NAV.mozConnection || NAV.webkitConnection;
        Object.keys(__classPrivateFieldGet(this, _events).media).forEach(event => {
            __classPrivateFieldGet(this, _player).getElement().removeEventListener(event, __classPrivateFieldGet(this, _events).media[event]);
        });
        document.removeEventListener('click', __classPrivateFieldGet(this, _events).global.click);
        if (connection) {
            connection.removeEventListener('change', __classPrivateFieldGet(this, _events).global.connection);
        }
        if (__classPrivateFieldGet(this, _detachMenu)) {
            __classPrivateFieldGet(this, _button).removeEventListener('click', __classPrivateFieldGet(this, _events).button.click);
            removeElement(__classPrivateFieldGet(this, _button));
            __classPrivateFieldGet(this, _button).removeEventListener('mouseover', __classPrivateFieldGet(this, _events).button.mouseover);
            __classPrivateFieldGet(this, _menu).removeEventListener('mouseover', __classPrivateFieldGet(this, _events).button.mouseover);
            __classPrivateFieldGet(this, _menu).removeEventListener('mouseout', __classPrivateFieldGet(this, _events).button.mouseout);
            __classPrivateFieldGet(this, _player).getElement().removeEventListener('controlshidden', __classPrivateFieldGet(this, _events).button.mouseout);
            removeElement(__classPrivateFieldGet(this, _menu));
        }
    }
    addSettings() {
        if (__classPrivateFieldGet(this, _detachMenu)) {
            return {};
        }
        const subitems = this._formatMenuItems();
        return subitems.length > 2 ? {
            className: 'op-levels__option',
            default: __classPrivateFieldGet(this, _default) || '-1',
            key: 'levels',
            name: __classPrivateFieldGet(this, _labels).levels,
            subitems,
        } : {};
    }
    _formatMenuItems() {
        const levels = this._gatherLevels();
        const total = levels.length;
        let items = total ? [{ key: '-1', label: __classPrivateFieldGet(this, _labels).auto }] : [];
        for (let i = 0; i < total; i++) {
            const level = levels[i];
            items = items.filter(el => el.key !== level.id);
            items.push({ key: level.id, label: level.label });
        }
        items = items.reduce((acc, current) => {
            const duplicate = acc.find(item => item.label === current.label);
            if (!duplicate) {
                return acc.concat([current]);
            }
            return acc;
        }, []).sort((a, b) => parseInt(a.label, 10) > parseInt(b.label, 10) ? 1 : -1);
        return items;
    }
    _getResolutionsLabel(height) {
        if (height >= 4320) {
            return '8K';
        }
        else if (height >= 2160) {
            return '4K';
        }
        else if (height >= 1440) {
            return '1440p';
        }
        else if (height >= 1080) {
            return '1080p';
        }
        else if (height >= 720) {
            return '720p';
        }
        else if (height >= 480) {
            return '480p';
        }
        else if (height >= 360) {
            return '360p';
        }
        else if (height >= 240) {
            return '240p';
        }
        else if (height >= 144) {
            return '144p';
        }
        return __classPrivateFieldGet(this, _labels).auto;
    }
    _gatherLevels() {
        if (!__classPrivateFieldGet(this, _levels).length) {
            __classPrivateFieldGet(this, _player).getMedia().levels.forEach((level) => {
                __classPrivateFieldGet(this, _levels).push(Object.assign(Object.assign({}, level), { label: level.label || this._getResolutionsLabel(level.height) }));
            });
        }
        return __classPrivateFieldGet(this, _levels);
    }
    _buildMenu() {
        if (__classPrivateFieldGet(this, _detachMenu)) {
            __classPrivateFieldGet(this, _button).classList.add('op-control--no-hover');
            __classPrivateFieldSet(this, _menu, document.createElement('div'));
            __classPrivateFieldGet(this, _menu).className = 'op-settings op-levels__menu';
            __classPrivateFieldGet(this, _menu).setAttribute('aria-hidden', 'true');
            const className = 'op-levels__option';
            const options = this._formatMenuItems();
            const menu = `<div class="op-settings__menu" role="menu" id="menu-item-levels">
                ${options.map(item => `
                <div class="op-settings__submenu-item" tabindex="0" role="menuitemradio"
                    aria-checked="${__classPrivateFieldGet(this, _default) === item.key ? 'true' : 'false'}">
                    <div class="op-settings__submenu-label ${className || ''}" data-value="levels-${item.key}">${item.label}</div>
                </div>`).join('')}
            </div>`;
            __classPrivateFieldGet(this, _menu).innerHTML = menu;
            const itemContainer = document.createElement('div');
            itemContainer.className = `op-controls__container op-control__${__classPrivateFieldGet(this, _position)}`;
            itemContainer.appendChild(__classPrivateFieldGet(this, _button));
            itemContainer.appendChild(__classPrivateFieldGet(this, _menu));
            __classPrivateFieldGet(this, _player).getControls().getLayer(__classPrivateFieldGet(this, _layer)).appendChild(itemContainer);
        }
    }
}
_player = new WeakMap(), _button = new WeakMap(), _menu = new WeakMap(), _events = new WeakMap(), _detachMenu = new WeakMap(), _labels = new WeakMap(), _levels = new WeakMap(), _default = new WeakMap(), _position = new WeakMap(), _layer = new WeakMap();
export default Levels;

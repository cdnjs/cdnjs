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
var _Levels_player, _Levels_button, _Levels_menu, _Levels_events, _Levels_detachMenu, _Levels_labels, _Levels_levels, _Levels_default, _Levels_position, _Levels_layer;
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS, NAV } from '../utils/constants';
import { addEvent } from '../utils/events';
import { hasClass, removeElement } from '../utils/general';
import { isDashSource, isHlsSource } from '../utils/media';
class Levels {
    constructor(player, position, layer) {
        _Levels_player.set(this, void 0);
        _Levels_button.set(this, void 0);
        _Levels_menu.set(this, void 0);
        _Levels_events.set(this, {
            button: {},
            global: {},
            media: {},
        });
        _Levels_detachMenu.set(this, void 0);
        _Levels_labels.set(this, void 0);
        _Levels_levels.set(this, []);
        _Levels_default.set(this, '');
        _Levels_position.set(this, void 0);
        _Levels_layer.set(this, void 0);
        __classPrivateFieldSet(this, _Levels_player, player, "f");
        __classPrivateFieldSet(this, _Levels_labels, player.getOptions().labels, "f");
        __classPrivateFieldSet(this, _Levels_detachMenu, player.getOptions().detachMenus, "f");
        __classPrivateFieldSet(this, _Levels_position, position, "f");
        __classPrivateFieldSet(this, _Levels_layer, layer, "f");
        return this;
    }
    create() {
        const initialLevel = __classPrivateFieldGet(this, _Levels_player, "f").getOptions().defaultLevel !== null ?
            parseInt(__classPrivateFieldGet(this, _Levels_player, "f").getOptions().defaultLevel, 10) : __classPrivateFieldGet(this, _Levels_player, "f").getMedia().level;
        __classPrivateFieldSet(this, _Levels_default, `${initialLevel}`, "f");
        const menuItems = this._formatMenuItems();
        const defaultLevel = menuItems.length ? menuItems.find((items) => items.key === __classPrivateFieldGet(this, _Levels_default, "f")) : null;
        const defaultLabel = defaultLevel ? defaultLevel.label : __classPrivateFieldGet(this, _Levels_labels, "f").auto;
        let levelSet = false;
        __classPrivateFieldSet(this, _Levels_button, document.createElement('button'), "f");
        __classPrivateFieldGet(this, _Levels_button, "f").className = `op-controls__levels op-control__${__classPrivateFieldGet(this, _Levels_position, "f")}`;
        __classPrivateFieldGet(this, _Levels_button, "f").tabIndex = 0;
        __classPrivateFieldGet(this, _Levels_button, "f").title = __classPrivateFieldGet(this, _Levels_labels, "f").mediaLevels;
        __classPrivateFieldGet(this, _Levels_button, "f").setAttribute('aria-controls', __classPrivateFieldGet(this, _Levels_player, "f").id);
        __classPrivateFieldGet(this, _Levels_button, "f").setAttribute('aria-label', __classPrivateFieldGet(this, _Levels_labels, "f").mediaLevels);
        __classPrivateFieldGet(this, _Levels_button, "f").setAttribute('data-active-level', __classPrivateFieldGet(this, _Levels_default, "f"));
        __classPrivateFieldGet(this, _Levels_button, "f").innerHTML = `<span>${defaultLabel}</span>`;
        const loadLevelsEvent = () => {
            if (!__classPrivateFieldGet(this, _Levels_levels, "f").length) {
                this._gatherLevels();
                setTimeout(() => {
                    __classPrivateFieldGet(this, _Levels_player, "f").getMedia().level = initialLevel;
                    const e = addEvent('controlschanged');
                    __classPrivateFieldGet(this, _Levels_player, "f").getElement().dispatchEvent(e);
                }, 0);
            }
            else if (!levelSet) {
                __classPrivateFieldGet(this, _Levels_player, "f").getMedia().level = initialLevel;
                levelSet = true;
            }
        };
        __classPrivateFieldGet(this, _Levels_events, "f").media.loadedmetadata = loadLevelsEvent.bind(this);
        __classPrivateFieldGet(this, _Levels_events, "f").media.manifestLoaded = loadLevelsEvent.bind(this);
        __classPrivateFieldGet(this, _Levels_events, "f").media.hlsManifestParsed = loadLevelsEvent.bind(this);
        if (__classPrivateFieldGet(this, _Levels_detachMenu, "f")) {
            this._buildMenu();
            __classPrivateFieldGet(this, _Levels_events, "f").button.click = () => {
                if (__classPrivateFieldGet(this, _Levels_detachMenu, "f")) {
                    const menus = __classPrivateFieldGet(this, _Levels_player, "f").getContainer().querySelectorAll('.op-settings');
                    for (let i = 0, total = menus.length; i < total; ++i) {
                        if (menus[i] !== __classPrivateFieldGet(this, _Levels_menu, "f")) {
                            menus[i].setAttribute('aria-hidden', 'true');
                        }
                    }
                    if (__classPrivateFieldGet(this, _Levels_menu, "f").getAttribute('aria-hidden') === 'true') {
                        __classPrivateFieldGet(this, _Levels_menu, "f").setAttribute('aria-hidden', 'false');
                    }
                    else {
                        __classPrivateFieldGet(this, _Levels_menu, "f").setAttribute('aria-hidden', 'true');
                    }
                }
            };
            __classPrivateFieldGet(this, _Levels_events, "f").button.mouseover = () => {
                if (!IS_IOS && !IS_ANDROID) {
                    const menus = __classPrivateFieldGet(this, _Levels_player, "f").getContainer().querySelectorAll('.op-settings');
                    for (let i = 0, total = menus.length; i < total; ++i) {
                        if (menus[i] !== __classPrivateFieldGet(this, _Levels_menu, "f")) {
                            menus[i].setAttribute('aria-hidden', 'true');
                        }
                    }
                    if (__classPrivateFieldGet(this, _Levels_menu, "f").getAttribute('aria-hidden') === 'true') {
                        __classPrivateFieldGet(this, _Levels_menu, "f").setAttribute('aria-hidden', 'false');
                    }
                }
            };
            __classPrivateFieldGet(this, _Levels_events, "f").button.mouseout = () => {
                if (!IS_IOS && !IS_ANDROID) {
                    const menus = __classPrivateFieldGet(this, _Levels_player, "f").getContainer().querySelectorAll('.op-settings');
                    for (let i = 0, total = menus.length; i < total; ++i) {
                        menus[i].setAttribute('aria-hidden', 'true');
                    }
                    if (__classPrivateFieldGet(this, _Levels_menu, "f").getAttribute('aria-hidden') === 'false') {
                        __classPrivateFieldGet(this, _Levels_menu, "f").setAttribute('aria-hidden', 'true');
                    }
                }
            };
            __classPrivateFieldGet(this, _Levels_button, "f").addEventListener('click', __classPrivateFieldGet(this, _Levels_events, "f").button.click, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _Levels_button, "f").addEventListener('mouseover', __classPrivateFieldGet(this, _Levels_events, "f").button.mouseover, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _Levels_menu, "f").addEventListener('mouseover', __classPrivateFieldGet(this, _Levels_events, "f").button.mouseover, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _Levels_menu, "f").addEventListener('mouseout', __classPrivateFieldGet(this, _Levels_events, "f").button.mouseout, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _Levels_player, "f").getElement().addEventListener('controlshidden', __classPrivateFieldGet(this, _Levels_events, "f").button.mouseout, EVENT_OPTIONS);
        }
        __classPrivateFieldGet(this, _Levels_events, "f").global.click = (e) => {
            const option = e.target;
            const currentTime = __classPrivateFieldGet(this, _Levels_player, "f").getMedia().currentTime;
            const isPaused = __classPrivateFieldGet(this, _Levels_player, "f").getMedia().paused;
            if (option.closest(`#${__classPrivateFieldGet(this, _Levels_player, "f").id}`) && hasClass(option, 'op-levels__option')) {
                const levelVal = option.getAttribute('data-value');
                const level = parseInt(levelVal ? levelVal.replace('levels-', '') : '-1', 10);
                __classPrivateFieldSet(this, _Levels_default, `${level}`, "f");
                if (__classPrivateFieldGet(this, _Levels_detachMenu, "f")) {
                    __classPrivateFieldGet(this, _Levels_button, "f").setAttribute('data-active-level', `${level}`);
                    __classPrivateFieldGet(this, _Levels_button, "f").innerHTML = `<span>${option.innerText}</span>`;
                    const levels = option.parentElement && option.parentElement.parentElement ?
                        option.parentElement.parentElement.querySelectorAll('.op-settings__submenu-item') : [];
                    for (let i = 0, total = levels.length; i < total; ++i) {
                        levels[i].setAttribute('aria-checked', 'false');
                    }
                    if (option.parentElement) {
                        option.parentElement.setAttribute('aria-checked', 'true');
                    }
                    __classPrivateFieldGet(this, _Levels_menu, "f").setAttribute('aria-hidden', 'false');
                }
                __classPrivateFieldGet(this, _Levels_player, "f").getMedia().level = level;
                __classPrivateFieldGet(this, _Levels_player, "f").getMedia().currentTime = currentTime;
                if (!isPaused) {
                    __classPrivateFieldGet(this, _Levels_player, "f").play();
                }
                const event = addEvent('levelchanged', {
                    detail: {
                        label: option.innerText.trim(),
                        level,
                    },
                });
                __classPrivateFieldGet(this, _Levels_player, "f").getElement().dispatchEvent(event);
                e.preventDefault();
            }
        };
        const connection = NAV.connection || NAV.mozConnection || NAV.webkitConnection;
        __classPrivateFieldGet(this, _Levels_events, "f").global.connection = () => {
            const media = __classPrivateFieldGet(this, _Levels_player, "f").getMedia().current;
            if (!isDashSource(media) && !isHlsSource(media)) {
                let type = connection.effectiveType;
                const levels = __classPrivateFieldGet(this, _Levels_levels, "f").map(item => (Object.assign(Object.assign({}, item), { resolution: parseInt(item.label.replace('p', ''), 10) })));
                let level = levels.find(item => item.resolution < 360);
                if (type === '4g') {
                    level = levels.find(item => item.resolution >= 720);
                }
                else if (type === '3g') {
                    level = levels.find(item => item.resolution >= 360 && item.resolution < 720);
                }
                if (level) {
                    __classPrivateFieldGet(this, _Levels_player, "f").pause();
                    __classPrivateFieldGet(this, _Levels_player, "f").getMedia().level = level.id;
                    __classPrivateFieldGet(this, _Levels_player, "f").play();
                }
                type = connection.effectiveType;
            }
        };
        Object.keys(__classPrivateFieldGet(this, _Levels_events, "f").media).forEach(event => {
            __classPrivateFieldGet(this, _Levels_player, "f").getElement().addEventListener(event, __classPrivateFieldGet(this, _Levels_events, "f").media[event], EVENT_OPTIONS);
        });
        document.addEventListener('click', __classPrivateFieldGet(this, _Levels_events, "f").global.click, EVENT_OPTIONS);
        if (connection) {
            connection.addEventListener('change', __classPrivateFieldGet(this, _Levels_events, "f").global.connection, EVENT_OPTIONS);
        }
    }
    destroy() {
        const connection = NAV.connection || NAV.mozConnection || NAV.webkitConnection;
        Object.keys(__classPrivateFieldGet(this, _Levels_events, "f").media).forEach(event => {
            __classPrivateFieldGet(this, _Levels_player, "f").getElement().removeEventListener(event, __classPrivateFieldGet(this, _Levels_events, "f").media[event]);
        });
        document.removeEventListener('click', __classPrivateFieldGet(this, _Levels_events, "f").global.click);
        if (connection) {
            connection.removeEventListener('change', __classPrivateFieldGet(this, _Levels_events, "f").global.connection);
        }
        if (__classPrivateFieldGet(this, _Levels_detachMenu, "f")) {
            __classPrivateFieldGet(this, _Levels_button, "f").removeEventListener('click', __classPrivateFieldGet(this, _Levels_events, "f").button.click);
            removeElement(__classPrivateFieldGet(this, _Levels_button, "f"));
            __classPrivateFieldGet(this, _Levels_button, "f").removeEventListener('mouseover', __classPrivateFieldGet(this, _Levels_events, "f").button.mouseover);
            __classPrivateFieldGet(this, _Levels_menu, "f").removeEventListener('mouseover', __classPrivateFieldGet(this, _Levels_events, "f").button.mouseover);
            __classPrivateFieldGet(this, _Levels_menu, "f").removeEventListener('mouseout', __classPrivateFieldGet(this, _Levels_events, "f").button.mouseout);
            __classPrivateFieldGet(this, _Levels_player, "f").getElement().removeEventListener('controlshidden', __classPrivateFieldGet(this, _Levels_events, "f").button.mouseout);
            removeElement(__classPrivateFieldGet(this, _Levels_menu, "f"));
        }
    }
    addSettings() {
        if (__classPrivateFieldGet(this, _Levels_detachMenu, "f")) {
            return {};
        }
        const subitems = this._formatMenuItems();
        return subitems.length > 2 ? {
            className: 'op-levels__option',
            default: __classPrivateFieldGet(this, _Levels_default, "f") || '-1',
            key: 'levels',
            name: __classPrivateFieldGet(this, _Levels_labels, "f").levels,
            subitems,
        } : {};
    }
    _formatMenuItems() {
        const levels = this._gatherLevels();
        const total = levels.length;
        let items = total ? [{ key: '-1', label: __classPrivateFieldGet(this, _Levels_labels, "f").auto }] : [];
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
        return __classPrivateFieldGet(this, _Levels_labels, "f").auto;
    }
    _gatherLevels() {
        if (!__classPrivateFieldGet(this, _Levels_levels, "f").length) {
            __classPrivateFieldGet(this, _Levels_player, "f").getMedia().levels.forEach((level) => {
                __classPrivateFieldGet(this, _Levels_levels, "f").push(Object.assign(Object.assign({}, level), { label: level.label || this._getResolutionsLabel(level.height) }));
            });
        }
        return __classPrivateFieldGet(this, _Levels_levels, "f");
    }
    _buildMenu() {
        if (__classPrivateFieldGet(this, _Levels_detachMenu, "f")) {
            __classPrivateFieldGet(this, _Levels_button, "f").classList.add('op-control--no-hover');
            __classPrivateFieldSet(this, _Levels_menu, document.createElement('div'), "f");
            __classPrivateFieldGet(this, _Levels_menu, "f").className = 'op-settings op-levels__menu';
            __classPrivateFieldGet(this, _Levels_menu, "f").setAttribute('aria-hidden', 'true');
            const className = 'op-levels__option';
            const options = this._formatMenuItems();
            const menu = `<div class="op-settings__menu" role="menu" id="menu-item-levels">
                ${options.map(item => `
                <div class="op-settings__submenu-item" tabindex="0" role="menuitemradio"
                    aria-checked="${__classPrivateFieldGet(this, _Levels_default, "f") === item.key ? 'true' : 'false'}">
                    <div class="op-settings__submenu-label ${className || ''}" data-value="levels-${item.key}">${item.label}</div>
                </div>`).join('')}
            </div>`;
            __classPrivateFieldGet(this, _Levels_menu, "f").innerHTML = menu;
            const itemContainer = document.createElement('div');
            itemContainer.className = `op-controls__container op-control__${__classPrivateFieldGet(this, _Levels_position, "f")}`;
            itemContainer.appendChild(__classPrivateFieldGet(this, _Levels_button, "f"));
            itemContainer.appendChild(__classPrivateFieldGet(this, _Levels_menu, "f"));
            __classPrivateFieldGet(this, _Levels_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Levels_layer, "f")).appendChild(itemContainer);
        }
    }
}
_Levels_player = new WeakMap(), _Levels_button = new WeakMap(), _Levels_menu = new WeakMap(), _Levels_events = new WeakMap(), _Levels_detachMenu = new WeakMap(), _Levels_labels = new WeakMap(), _Levels_levels = new WeakMap(), _Levels_default = new WeakMap(), _Levels_position = new WeakMap(), _Levels_layer = new WeakMap();
export default Levels;

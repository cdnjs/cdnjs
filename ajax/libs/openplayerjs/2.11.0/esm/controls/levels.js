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
var _Levels_player, _Levels_button, _Levels_menu, _Levels_events, _Levels_levels, _Levels_defaultLevel, _Levels_controlPosition, _Levels_controlLayer;
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS, NAV } from '../utils/constants';
import { addEvent, sanitize } from '../utils/general';
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
        _Levels_levels.set(this, []);
        _Levels_defaultLevel.set(this, '');
        _Levels_controlPosition.set(this, void 0);
        _Levels_controlLayer.set(this, void 0);
        __classPrivateFieldSet(this, _Levels_player, player, "f");
        __classPrivateFieldSet(this, _Levels_controlPosition, position, "f");
        __classPrivateFieldSet(this, _Levels_controlLayer, layer, "f");
        return this;
    }
    create() {
        const { labels, defaultLevel: startLevel, detachMenus } = __classPrivateFieldGet(this, _Levels_player, "f").getOptions();
        const initialLevel = startLevel !== null ? parseInt(startLevel || '0', 10) : __classPrivateFieldGet(this, _Levels_player, "f").getMedia().level;
        __classPrivateFieldSet(this, _Levels_defaultLevel, `${initialLevel}`, "f");
        const menuItems = this._formatMenuItems();
        const defaultLevel = menuItems.length ? menuItems.find((items) => items.key === __classPrivateFieldGet(this, _Levels_defaultLevel, "f")) : null;
        const defaultLabel = defaultLevel ? defaultLevel.label : (labels === null || labels === void 0 ? void 0 : labels.auto) || '';
        let levelSet = false;
        __classPrivateFieldSet(this, _Levels_button, document.createElement('button'), "f");
        __classPrivateFieldGet(this, _Levels_button, "f").className = `op-controls__levels op-control__${__classPrivateFieldGet(this, _Levels_controlPosition, "f")}`;
        __classPrivateFieldGet(this, _Levels_button, "f").tabIndex = 0;
        __classPrivateFieldGet(this, _Levels_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.mediaLevels) || '';
        __classPrivateFieldGet(this, _Levels_button, "f").setAttribute('aria-controls', __classPrivateFieldGet(this, _Levels_player, "f").id);
        __classPrivateFieldGet(this, _Levels_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.mediaLevels) || '');
        __classPrivateFieldGet(this, _Levels_button, "f").setAttribute('data-active-level', __classPrivateFieldGet(this, _Levels_defaultLevel, "f"));
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
        if (detachMenus) {
            this._buildMenu();
            __classPrivateFieldGet(this, _Levels_events, "f").button.click = () => {
                if (detachMenus) {
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
            const { currentTime } = __classPrivateFieldGet(this, _Levels_player, "f").getMedia();
            const isPaused = __classPrivateFieldGet(this, _Levels_player, "f").getMedia().paused;
            if (option.closest(`#${__classPrivateFieldGet(this, _Levels_player, "f").id}`) && option.classList.contains('op-levels__option')) {
                const levelVal = option.getAttribute('data-value');
                const level = parseInt(levelVal ? levelVal.replace('levels-', '') : '-1', 10);
                __classPrivateFieldSet(this, _Levels_defaultLevel, `${level}`, "f");
                if (detachMenus) {
                    __classPrivateFieldGet(this, _Levels_button, "f").setAttribute('data-active-level', `${level}`);
                    __classPrivateFieldGet(this, _Levels_button, "f").innerHTML = `<span>${sanitize(option.innerText, true)}</span>`;
                    const levels = option.parentElement && option.parentElement.parentElement
                        ? option.parentElement.parentElement.querySelectorAll('.op-settings__submenu-item')
                        : [];
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
                e.stopPropagation();
            }
        };
        const connection = (NAV === null || NAV === void 0 ? void 0 : NAV.connection) || (NAV === null || NAV === void 0 ? void 0 : NAV.mozConnection) || (NAV === null || NAV === void 0 ? void 0 : NAV.webkitConnection);
        __classPrivateFieldGet(this, _Levels_events, "f").global.connection = () => {
            const media = __classPrivateFieldGet(this, _Levels_player, "f").getMedia().current;
            if (!isDashSource(media) && !isHlsSource(media)) {
                const type = (connection === null || connection === void 0 ? void 0 : connection.effectiveType) || '';
                const levels = __classPrivateFieldGet(this, _Levels_levels, "f").map((item) => (Object.assign(Object.assign({}, item), { resolution: parseInt(item.label.replace('p', ''), 10) })));
                let level = levels.find((item) => item.resolution < 360);
                if (type === '4g') {
                    level = levels.find((item) => item.resolution >= 720);
                }
                else if (type === '3g') {
                    level = levels.find((item) => item.resolution >= 360 && item.resolution < 720);
                }
                if (level) {
                    __classPrivateFieldGet(this, _Levels_player, "f").pause();
                    __classPrivateFieldGet(this, _Levels_player, "f").getMedia().level = level.id;
                    __classPrivateFieldGet(this, _Levels_player, "f").play();
                }
            }
        };
        Object.keys(__classPrivateFieldGet(this, _Levels_events, "f").media).forEach((event) => {
            __classPrivateFieldGet(this, _Levels_player, "f").getElement().addEventListener(event, __classPrivateFieldGet(this, _Levels_events, "f").media[event], EVENT_OPTIONS);
        });
        document.addEventListener('click', __classPrivateFieldGet(this, _Levels_events, "f").global.click, EVENT_OPTIONS);
        if (connection) {
            connection.addEventListener('change', __classPrivateFieldGet(this, _Levels_events, "f").global.connection, EVENT_OPTIONS);
        }
    }
    destroy() {
        const { detachMenus } = __classPrivateFieldGet(this, _Levels_player, "f").getOptions();
        const connection = (NAV === null || NAV === void 0 ? void 0 : NAV.connection) || (NAV === null || NAV === void 0 ? void 0 : NAV.mozConnection) || (NAV === null || NAV === void 0 ? void 0 : NAV.webkitConnection);
        Object.keys(__classPrivateFieldGet(this, _Levels_events, "f").media).forEach((event) => {
            __classPrivateFieldGet(this, _Levels_player, "f").getElement().removeEventListener(event, __classPrivateFieldGet(this, _Levels_events, "f").media[event]);
        });
        document.removeEventListener('click', __classPrivateFieldGet(this, _Levels_events, "f").global.click);
        if (connection) {
            connection.removeEventListener('change', __classPrivateFieldGet(this, _Levels_events, "f").global.connection);
        }
        if (detachMenus) {
            __classPrivateFieldGet(this, _Levels_button, "f").removeEventListener('click', __classPrivateFieldGet(this, _Levels_events, "f").button.click);
            __classPrivateFieldGet(this, _Levels_button, "f").remove();
            __classPrivateFieldGet(this, _Levels_button, "f").removeEventListener('mouseover', __classPrivateFieldGet(this, _Levels_events, "f").button.mouseover);
            __classPrivateFieldGet(this, _Levels_menu, "f").removeEventListener('mouseover', __classPrivateFieldGet(this, _Levels_events, "f").button.mouseover);
            __classPrivateFieldGet(this, _Levels_menu, "f").removeEventListener('mouseout', __classPrivateFieldGet(this, _Levels_events, "f").button.mouseout);
            __classPrivateFieldGet(this, _Levels_player, "f").getElement().removeEventListener('controlshidden', __classPrivateFieldGet(this, _Levels_events, "f").button.mouseout);
            __classPrivateFieldGet(this, _Levels_menu, "f").remove();
        }
    }
    addSettings() {
        const { labels, detachMenus } = __classPrivateFieldGet(this, _Levels_player, "f").getOptions();
        if (detachMenus) {
            return {};
        }
        const subitems = this._formatMenuItems();
        return subitems.length > 2
            ? {
                className: 'op-levels__option',
                default: __classPrivateFieldGet(this, _Levels_defaultLevel, "f") || '-1',
                key: 'levels',
                name: labels === null || labels === void 0 ? void 0 : labels.levels,
                subitems,
            }
            : {};
    }
    _formatMenuItems() {
        const { labels } = __classPrivateFieldGet(this, _Levels_player, "f").getOptions();
        const levels = this._gatherLevels();
        const total = levels.length;
        let items = total ? [{ key: '-1', label: labels === null || labels === void 0 ? void 0 : labels.auto }] : [];
        for (let i = 0; i < total; i++) {
            const level = levels[i];
            items = items.filter((el) => el.key !== level.id);
            items.push({ key: level.id, label: level.label });
        }
        return items
            .reduce((acc, current) => {
            const duplicate = acc.find((item) => item.label === current.label);
            if (!duplicate) {
                return acc.concat([current]);
            }
            return acc;
        }, [])
            .sort((a, b) => (parseInt((a === null || a === void 0 ? void 0 : a.label) || '', 10) > parseInt((b === null || b === void 0 ? void 0 : b.label) || '', 10) ? 1 : -1));
    }
    _getResolutionsLabel(height) {
        const { labels } = __classPrivateFieldGet(this, _Levels_player, "f").getOptions();
        if (height >= 4320) {
            return '8K';
        }
        if (height >= 2160) {
            return '4K';
        }
        if (height >= 1440) {
            return '1440p';
        }
        if (height >= 1080) {
            return '1080p';
        }
        if (height >= 720) {
            return '720p';
        }
        if (height >= 480) {
            return '480p';
        }
        if (height >= 360) {
            return '360p';
        }
        if (height >= 240) {
            return '240p';
        }
        if (height >= 144) {
            return '144p';
        }
        return (labels === null || labels === void 0 ? void 0 : labels.auto) || '';
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
        const { detachMenus } = __classPrivateFieldGet(this, _Levels_player, "f").getOptions();
        if (detachMenus) {
            __classPrivateFieldGet(this, _Levels_button, "f").classList.add('op-control--no-hover');
            __classPrivateFieldSet(this, _Levels_menu, document.createElement('div'), "f");
            __classPrivateFieldGet(this, _Levels_menu, "f").className = 'op-settings op-levels__menu';
            __classPrivateFieldGet(this, _Levels_menu, "f").setAttribute('aria-hidden', 'true');
            const className = 'op-levels__option';
            const options = this._formatMenuItems();
            const menu = `<div class="op-settings__menu" role="menu" id="menu-item-levels">
                ${options
                .map((item) => `
                <div class="op-settings__submenu-item" tabindex="0" role="menuitemradio"
                    aria-checked="${__classPrivateFieldGet(this, _Levels_defaultLevel, "f") === item.key ? 'true' : 'false'}">
                    <div class="op-settings__submenu-label ${className || ''}" data-value="levels-${item.key}">${item.label}</div>
                </div>`)
                .join('')}
            </div>`;
            __classPrivateFieldGet(this, _Levels_menu, "f").innerHTML = menu;
            const itemContainer = document.createElement('div');
            itemContainer.className = `op-controls__container op-control__${__classPrivateFieldGet(this, _Levels_controlPosition, "f")}`;
            itemContainer.appendChild(__classPrivateFieldGet(this, _Levels_button, "f"));
            itemContainer.appendChild(__classPrivateFieldGet(this, _Levels_menu, "f"));
            __classPrivateFieldGet(this, _Levels_player, "f")
                .getControls()
                .getLayer(__classPrivateFieldGet(this, _Levels_controlLayer, "f"))
                .appendChild(itemContainer);
        }
    }
}
_Levels_player = new WeakMap(), _Levels_button = new WeakMap(), _Levels_menu = new WeakMap(), _Levels_events = new WeakMap(), _Levels_levels = new WeakMap(), _Levels_defaultLevel = new WeakMap(), _Levels_controlPosition = new WeakMap(), _Levels_controlLayer = new WeakMap();
export default Levels;

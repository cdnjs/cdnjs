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
var _Settings_player, _Settings_submenu, _Settings_button, _Settings_menu, _Settings_events, _Settings_originalOutput, _Settings_controlPosition, _Settings_controlLayer;
import { EVENT_OPTIONS } from '../utils/constants';
import { sanitize } from '../utils/general';
class Settings {
    constructor(player, position, layer) {
        _Settings_player.set(this, void 0);
        _Settings_submenu.set(this, {});
        _Settings_button.set(this, void 0);
        _Settings_menu.set(this, void 0);
        _Settings_events.set(this, {
            global: {},
            media: {},
        });
        _Settings_originalOutput.set(this, '');
        _Settings_controlPosition.set(this, void 0);
        _Settings_controlLayer.set(this, void 0);
        __classPrivateFieldSet(this, _Settings_player, player, "f");
        __classPrivateFieldSet(this, _Settings_controlPosition, position, "f");
        __classPrivateFieldSet(this, _Settings_controlLayer, layer, "f");
        this._enterSpaceKeyEvent = this._enterSpaceKeyEvent.bind(this);
        return this;
    }
    create() {
        const { labels } = __classPrivateFieldGet(this, _Settings_player, "f").getOptions();
        __classPrivateFieldSet(this, _Settings_button, document.createElement('button'), "f");
        __classPrivateFieldGet(this, _Settings_button, "f").className = `op-controls__settings op-control__${__classPrivateFieldGet(this, _Settings_controlPosition, "f")}`;
        __classPrivateFieldGet(this, _Settings_button, "f").tabIndex = 0;
        __classPrivateFieldGet(this, _Settings_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.settings) || '';
        __classPrivateFieldGet(this, _Settings_button, "f").setAttribute('aria-controls', __classPrivateFieldGet(this, _Settings_player, "f").id);
        __classPrivateFieldGet(this, _Settings_button, "f").setAttribute('aria-pressed', 'false');
        __classPrivateFieldGet(this, _Settings_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.settings) || '');
        __classPrivateFieldSet(this, _Settings_menu, document.createElement('div'), "f");
        __classPrivateFieldGet(this, _Settings_menu, "f").className = 'op-settings';
        __classPrivateFieldGet(this, _Settings_menu, "f").setAttribute('aria-hidden', 'true');
        __classPrivateFieldGet(this, _Settings_menu, "f").innerHTML = '<div class="op-settings__menu" role="menu"></div>';
        this.clickEvent = () => {
            __classPrivateFieldGet(this, _Settings_button, "f").setAttribute('aria-pressed', 'true');
            const menus = __classPrivateFieldGet(this, _Settings_player, "f").getContainer().querySelectorAll('.op-settings');
            for (let i = 0, total = menus.length; i < total; ++i) {
                if (menus[i] !== __classPrivateFieldGet(this, _Settings_menu, "f")) {
                    menus[i].setAttribute('aria-hidden', 'true');
                }
            }
            __classPrivateFieldGet(this, _Settings_menu, "f").setAttribute('aria-hidden', __classPrivateFieldGet(this, _Settings_menu, "f").getAttribute('aria-hidden') === 'false' ? 'true' : 'false');
        };
        this.hideEvent = () => {
            let timeout;
            if (timeout && typeof window !== 'undefined') {
                window.cancelAnimationFrame(timeout);
            }
            if (typeof window !== 'undefined') {
                timeout = window.requestAnimationFrame(() => {
                    __classPrivateFieldGet(this, _Settings_menu, "f").innerHTML = __classPrivateFieldGet(this, _Settings_originalOutput, "f");
                    __classPrivateFieldGet(this, _Settings_menu, "f").setAttribute('aria-hidden', 'true');
                });
            }
        };
        this.removeEvent = (e) => {
            const { id, type } = e.detail;
            this.removeItem(id, type);
        };
        this.clickEvent = this.clickEvent.bind(this);
        this.hideEvent = this.hideEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        __classPrivateFieldGet(this, _Settings_events, "f").media.controlshidden = this.hideEvent.bind(this);
        __classPrivateFieldGet(this, _Settings_events, "f").media.settingremoved = this.removeEvent.bind(this);
        __classPrivateFieldGet(this, _Settings_events, "f").media.play = this.hideEvent.bind(this);
        __classPrivateFieldGet(this, _Settings_events, "f").media.pause = this.hideEvent.bind(this);
        __classPrivateFieldGet(this, _Settings_player, "f").getContainer().addEventListener('keydown', this._enterSpaceKeyEvent, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Settings_events, "f").global.click = (e) => {
            const { target } = e;
            const current = target;
            if ((current === null || current === void 0 ? void 0 : current.closest(`#${__classPrivateFieldGet(this, _Settings_player, "f").id}`)) && (current === null || current === void 0 ? void 0 : current.classList.contains('op-speed__option'))) {
                const level = (current === null || current === void 0 ? void 0 : current.getAttribute('data-value')) || '';
                __classPrivateFieldGet(this, _Settings_player, "f").getMedia().playbackRate = parseFloat(level.replace('speed-', ''));
            }
        };
        __classPrivateFieldGet(this, _Settings_events, "f").global.resize = this.hideEvent.bind(this);
        __classPrivateFieldGet(this, _Settings_button, "f").addEventListener('click', this.clickEvent, EVENT_OPTIONS);
        Object.keys(__classPrivateFieldGet(this, _Settings_events, "f")).forEach((event) => {
            __classPrivateFieldGet(this, _Settings_player, "f").getElement().addEventListener(event, __classPrivateFieldGet(this, _Settings_events, "f").media[event], EVENT_OPTIONS);
        });
        document.addEventListener('click', __classPrivateFieldGet(this, _Settings_events, "f").global.click, EVENT_OPTIONS);
        document.addEventListener('keydown', __classPrivateFieldGet(this, _Settings_events, "f").global.click, EVENT_OPTIONS);
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', __classPrivateFieldGet(this, _Settings_events, "f").global.resize, EVENT_OPTIONS);
        }
        __classPrivateFieldGet(this, _Settings_player, "f")
            .getControls()
            .getLayer(__classPrivateFieldGet(this, _Settings_controlLayer, "f"))
            .appendChild(__classPrivateFieldGet(this, _Settings_button, "f"));
        __classPrivateFieldGet(this, _Settings_player, "f").getContainer().appendChild(__classPrivateFieldGet(this, _Settings_menu, "f"));
    }
    destroy() {
        __classPrivateFieldGet(this, _Settings_button, "f").removeEventListener('click', this.clickEvent);
        Object.keys(__classPrivateFieldGet(this, _Settings_events, "f")).forEach((event) => {
            __classPrivateFieldGet(this, _Settings_player, "f").getElement().removeEventListener(event, __classPrivateFieldGet(this, _Settings_events, "f").media[event]);
        });
        document.removeEventListener('click', __classPrivateFieldGet(this, _Settings_events, "f").global.click);
        document.removeEventListener('keydown', __classPrivateFieldGet(this, _Settings_events, "f").global.click);
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', __classPrivateFieldGet(this, _Settings_events, "f").global.resize);
        }
        if (__classPrivateFieldGet(this, _Settings_events, "f").global['settings.submenu'] !== undefined) {
            document.removeEventListener('click', __classPrivateFieldGet(this, _Settings_events, "f").global['settings.submenu']);
            __classPrivateFieldGet(this, _Settings_player, "f").getElement().removeEventListener('controlshidden', this.hideEvent);
        }
        __classPrivateFieldGet(this, _Settings_player, "f").getContainer().removeEventListener('keydown', this._enterSpaceKeyEvent);
        __classPrivateFieldGet(this, _Settings_menu, "f").remove();
        __classPrivateFieldGet(this, _Settings_button, "f").remove();
    }
    addSettings() {
        const media = __classPrivateFieldGet(this, _Settings_player, "f").getMedia();
        const { labels } = __classPrivateFieldGet(this, _Settings_player, "f").getOptions();
        let rate = 1;
        if (__classPrivateFieldGet(this, _Settings_player, "f") && media) {
            rate = media.defaultPlaybackRate !== media.playbackRate ? media.playbackRate : media.defaultPlaybackRate;
        }
        return {
            className: 'op-speed__option',
            default: rate.toString(),
            key: 'speed',
            name: (labels === null || labels === void 0 ? void 0 : labels.speed) || '',
            subitems: [
                { key: '0.25', label: '0.25' },
                { key: '0.5', label: '0.5' },
                { key: '0.75', label: '0.75' },
                { key: '1', label: (labels === null || labels === void 0 ? void 0 : labels.speedNormal) || '' },
                { key: '1.25', label: '1.25' },
                { key: '1.5', label: '1.5' },
                { key: '2', label: '2' },
            ],
        };
    }
    addItem(name, key, defaultValue, submenu, className) {
        const dataValue = `${key}-${sanitize(defaultValue, true)}`;
        const menuItem = document.createElement('div');
        menuItem.className = 'op-settings__menu-item';
        menuItem.tabIndex = 0;
        menuItem.setAttribute('role', 'menuitemradio');
        menuItem.innerHTML = `<div class="op-settings__menu-label" data-value="${dataValue}">${name}</div>`;
        const submenuMatch = submenu ? submenu.find((x) => x.key === defaultValue) : null;
        if (submenuMatch) {
            menuItem.innerHTML += `<div class="op-settings__menu-content" tabindex="0">${submenuMatch.label}</div>`;
        }
        const mainMenu = __classPrivateFieldGet(this, _Settings_menu, "f").querySelector('.op-settings__menu');
        if (mainMenu) {
            mainMenu.appendChild(menuItem);
        }
        __classPrivateFieldSet(this, _Settings_originalOutput, __classPrivateFieldGet(this, _Settings_menu, "f").innerHTML, "f");
        if (submenu) {
            const subItems = `
                <div class="op-settings__header">
                    <button type="button" class="op-settings__back" tabindex="0">${name}</button>
                </div>
                <div class="op-settings__menu" role="menu" id="menu-item-${key}">
                    ${submenu
                .map((item) => `
                    <div class="op-settings__submenu-item" role="menuitemradio" aria-checked="${defaultValue === item.key ? 'true' : 'false'}">
                        <div class="op-settings__submenu-label ${className || ''}" tabindex="0" data-value="${key}-${item.key}">
                            ${item.label}
                        </div>
                    </div>`)
                .join('')}
                </div>`;
            __classPrivateFieldGet(this, _Settings_submenu, "f")[key] = subItems;
        }
        __classPrivateFieldGet(this, _Settings_events, "f").global['settings.submenu'] = (e) => {
            const target = e.target;
            if (target.closest(`#${__classPrivateFieldGet(this, _Settings_player, "f").id}`)) {
                if (target.classList.contains('op-settings__back')) {
                    __classPrivateFieldGet(this, _Settings_menu, "f").classList.add('op-settings--sliding');
                    setTimeout(() => {
                        __classPrivateFieldGet(this, _Settings_menu, "f").innerHTML = __classPrivateFieldGet(this, _Settings_originalOutput, "f");
                        __classPrivateFieldGet(this, _Settings_menu, "f").classList.remove('op-settings--sliding');
                    }, 100);
                }
                else if (target.classList.contains('op-settings__menu-content')) {
                    const labelEl = target.parentElement ? target.parentElement.querySelector('.op-settings__menu-label') : null;
                    const label = labelEl ? labelEl.getAttribute('data-value') : null;
                    const fragments = label ? label.split('-') : [];
                    if (fragments.length > 0) {
                        fragments.pop();
                        const current = fragments.join('-').replace(/^\-|\-$/, '');
                        if (typeof __classPrivateFieldGet(this, _Settings_submenu, "f")[current] !== 'undefined') {
                            __classPrivateFieldGet(this, _Settings_menu, "f").classList.add('op-settings--sliding');
                            setTimeout(() => {
                                __classPrivateFieldGet(this, _Settings_menu, "f").innerHTML = __classPrivateFieldGet(this, _Settings_submenu, "f")[current];
                                __classPrivateFieldGet(this, _Settings_menu, "f").classList.remove('op-settings--sliding');
                            }, 100);
                        }
                    }
                }
                else if (target.classList.contains('op-settings__submenu-label')) {
                    const current = target.getAttribute('data-value');
                    const value = current ? current.replace(`${key}-`, '') : '';
                    const label = target.innerText;
                    const menuTarget = __classPrivateFieldGet(this, _Settings_menu, "f").querySelector(`#menu-item-${key} .op-settings__submenu-item[aria-checked=true]`);
                    if (menuTarget) {
                        menuTarget.setAttribute('aria-checked', 'false');
                        if (target.parentElement) {
                            target.parentElement.setAttribute('aria-checked', 'true');
                        }
                        __classPrivateFieldGet(this, _Settings_submenu, "f")[key] = __classPrivateFieldGet(this, _Settings_menu, "f").innerHTML;
                        __classPrivateFieldGet(this, _Settings_menu, "f").classList.add('op-settings--sliding');
                        setTimeout(() => {
                            __classPrivateFieldGet(this, _Settings_menu, "f").innerHTML = __classPrivateFieldGet(this, _Settings_originalOutput, "f");
                            const prev = __classPrivateFieldGet(this, _Settings_menu, "f").querySelector(`.op-settings__menu-label[data-value="${key}-${defaultValue}"]`);
                            if (prev) {
                                prev.setAttribute('data-value', `${current}`);
                                if (prev.nextElementSibling) {
                                    prev.nextElementSibling.textContent = label;
                                }
                            }
                            defaultValue = value;
                            __classPrivateFieldSet(this, _Settings_originalOutput, __classPrivateFieldGet(this, _Settings_menu, "f").innerHTML, "f");
                            __classPrivateFieldGet(this, _Settings_menu, "f").classList.remove('op-settings--sliding');
                        }, 100);
                    }
                }
            }
            else {
                this.hideEvent();
            }
        };
        document.addEventListener('click', __classPrivateFieldGet(this, _Settings_events, "f").global['settings.submenu'], EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Settings_player, "f").getElement().addEventListener('controlshidden', this.hideEvent, EVENT_OPTIONS);
    }
    removeItem(id, type, minItems = 2) {
        const target = __classPrivateFieldGet(this, _Settings_player, "f").getElement().querySelector(`.op-settings__submenu-label[data-value=${type}-${id}]`);
        if (target) {
            target.remove();
        }
        if (__classPrivateFieldGet(this, _Settings_player, "f").getElement().querySelectorAll(`.op-settings__submenu-label[data-value^=${type}]`).length < minItems) {
            delete __classPrivateFieldGet(this, _Settings_submenu, "f")[type];
            const label = __classPrivateFieldGet(this, _Settings_player, "f").getElement().querySelector(`.op-settings__menu-label[data-value^=${type}]`);
            const menuItem = label ? label.closest('.op-settings__menu-item') : null;
            if (menuItem) {
                menuItem.remove();
            }
        }
    }
    _enterSpaceKeyEvent(e) {
        var _a, _b, _c, _d;
        const key = e.which || e.keyCode || 0;
        const isAd = __classPrivateFieldGet(this, _Settings_player, "f").isAd();
        const settingsBtnFocused = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains('op-controls__settings');
        const menuFocused = ((_b = document === null || document === void 0 ? void 0 : document.activeElement) === null || _b === void 0 ? void 0 : _b.classList.contains('op-settings__menu-content')) ||
            ((_c = document === null || document === void 0 ? void 0 : document.activeElement) === null || _c === void 0 ? void 0 : _c.classList.contains('op-settings__back')) ||
            ((_d = document === null || document === void 0 ? void 0 : document.activeElement) === null || _d === void 0 ? void 0 : _d.classList.contains('op-settings__submenu-label'));
        if (!isAd) {
            if (settingsBtnFocused && (key === 13 || key === 32)) {
                this.clickEvent();
                e.preventDefault();
                e.stopPropagation();
            }
            else if (menuFocused && (key === 13 || key === 32)) {
                __classPrivateFieldGet(this, _Settings_events, "f").global['settings.submenu'](e);
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }
}
_Settings_player = new WeakMap(), _Settings_submenu = new WeakMap(), _Settings_button = new WeakMap(), _Settings_menu = new WeakMap(), _Settings_events = new WeakMap(), _Settings_originalOutput = new WeakMap(), _Settings_controlPosition = new WeakMap(), _Settings_controlLayer = new WeakMap();
export default Settings;

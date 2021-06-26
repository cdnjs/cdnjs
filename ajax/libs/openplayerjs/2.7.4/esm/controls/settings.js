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
var _Settings_player, _Settings_submenu, _Settings_button, _Settings_menu, _Settings_events, _Settings_originalOutput, _Settings_labels, _Settings_position, _Settings_layer;
import { EVENT_OPTIONS } from '../utils/constants';
import { hasClass, removeElement } from '../utils/general';
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
        _Settings_labels.set(this, void 0);
        _Settings_position.set(this, void 0);
        _Settings_layer.set(this, void 0);
        __classPrivateFieldSet(this, _Settings_player, player, "f");
        __classPrivateFieldSet(this, _Settings_labels, player.getOptions().labels, "f");
        __classPrivateFieldSet(this, _Settings_position, position, "f");
        __classPrivateFieldSet(this, _Settings_layer, layer, "f");
        return this;
    }
    create() {
        __classPrivateFieldSet(this, _Settings_button, document.createElement('button'), "f");
        __classPrivateFieldGet(this, _Settings_button, "f").className = `op-controls__settings op-control__${__classPrivateFieldGet(this, _Settings_position, "f")}`;
        __classPrivateFieldGet(this, _Settings_button, "f").tabIndex = 0;
        __classPrivateFieldGet(this, _Settings_button, "f").title = __classPrivateFieldGet(this, _Settings_labels, "f").settings;
        __classPrivateFieldGet(this, _Settings_button, "f").setAttribute('aria-controls', __classPrivateFieldGet(this, _Settings_player, "f").id);
        __classPrivateFieldGet(this, _Settings_button, "f").setAttribute('aria-pressed', 'false');
        __classPrivateFieldGet(this, _Settings_button, "f").setAttribute('aria-label', __classPrivateFieldGet(this, _Settings_labels, "f").settings);
        __classPrivateFieldGet(this, _Settings_button, "f").innerHTML = `<span class="op-sr">${__classPrivateFieldGet(this, _Settings_labels, "f").settings}</span>`;
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
            __classPrivateFieldGet(this, _Settings_menu, "f").setAttribute('aria-hidden', (__classPrivateFieldGet(this, _Settings_menu, "f").getAttribute('aria-hidden') === 'false' ? 'true' : 'false'));
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
        __classPrivateFieldGet(this, _Settings_events, "f").media.controlshidden = this.hideEvent.bind(this);
        __classPrivateFieldGet(this, _Settings_events, "f").media.settingremoved = this.removeEvent.bind(this);
        __classPrivateFieldGet(this, _Settings_events, "f").media.play = this.hideEvent.bind(this);
        __classPrivateFieldGet(this, _Settings_events, "f").media.pause = this.hideEvent.bind(this);
        __classPrivateFieldGet(this, _Settings_events, "f").global.click = (e) => {
            if (e.target.closest(`#${__classPrivateFieldGet(this, _Settings_player, "f").id}`) && hasClass(e.target, 'op-speed__option')) {
                __classPrivateFieldGet(this, _Settings_player, "f").getMedia().playbackRate = parseFloat(e.target.getAttribute('data-value').replace('speed-', ''));
            }
        };
        __classPrivateFieldGet(this, _Settings_events, "f").global.resize = this.hideEvent.bind(this);
        __classPrivateFieldGet(this, _Settings_button, "f").addEventListener('click', this.clickEvent.bind(this), EVENT_OPTIONS);
        Object.keys(__classPrivateFieldGet(this, _Settings_events, "f")).forEach(event => {
            __classPrivateFieldGet(this, _Settings_player, "f").getElement().addEventListener(event, __classPrivateFieldGet(this, _Settings_events, "f").media[event], EVENT_OPTIONS);
        });
        document.addEventListener('click', __classPrivateFieldGet(this, _Settings_events, "f").global.click, EVENT_OPTIONS);
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', __classPrivateFieldGet(this, _Settings_events, "f").global.resize, EVENT_OPTIONS);
        }
        __classPrivateFieldGet(this, _Settings_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Settings_layer, "f")).appendChild(__classPrivateFieldGet(this, _Settings_button, "f"));
        __classPrivateFieldGet(this, _Settings_player, "f").getContainer().appendChild(__classPrivateFieldGet(this, _Settings_menu, "f"));
    }
    destroy() {
        __classPrivateFieldGet(this, _Settings_button, "f").removeEventListener('click', this.clickEvent.bind(this));
        Object.keys(__classPrivateFieldGet(this, _Settings_events, "f")).forEach(event => {
            __classPrivateFieldGet(this, _Settings_player, "f").getElement().removeEventListener(event, __classPrivateFieldGet(this, _Settings_events, "f").media[event]);
        });
        document.removeEventListener('click', __classPrivateFieldGet(this, _Settings_events, "f").global.click);
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', __classPrivateFieldGet(this, _Settings_events, "f").global.resize);
        }
        if (__classPrivateFieldGet(this, _Settings_events, "f").global['settings.submenu'] !== undefined) {
            document.removeEventListener('click', __classPrivateFieldGet(this, _Settings_events, "f").global['settings.submenu']);
            __classPrivateFieldGet(this, _Settings_player, "f").getElement().removeEventListener('controlshidden', this.hideEvent);
        }
        removeElement(__classPrivateFieldGet(this, _Settings_menu, "f"));
        removeElement(__classPrivateFieldGet(this, _Settings_button, "f"));
    }
    addSettings() {
        return {
            className: 'op-speed__option',
            default: __classPrivateFieldGet(this, _Settings_player, "f") && __classPrivateFieldGet(this, _Settings_player, "f").getMedia() ? __classPrivateFieldGet(this, _Settings_player, "f").getMedia().defaultPlaybackRate.toString() : '1',
            key: 'speed',
            name: __classPrivateFieldGet(this, _Settings_labels, "f").speed,
            subitems: [
                { key: '0.25', label: '0.25' },
                { key: '0.5', label: '0.5' },
                { key: '0.75', label: '0.75' },
                { key: '1', label: __classPrivateFieldGet(this, _Settings_labels, "f").speedNormal },
                { key: '1.25', label: '1.25' },
                { key: '1.5', label: '1.5' },
                { key: '2', label: '2' },
            ],
        };
    }
    addItem(name, key, defaultValue, submenu, className) {
        const menuItem = document.createElement('div');
        menuItem.className = 'op-settings__menu-item';
        menuItem.tabIndex = 0;
        menuItem.setAttribute('role', 'menuitemradio');
        menuItem.innerHTML = `<div class="op-settings__menu-label" data-value="${key}-${defaultValue}">${name}</div>`;
        const submenuMatch = submenu ? submenu.find(x => x.key === defaultValue) : null;
        if (submenuMatch) {
            menuItem.innerHTML += `<div class="op-settings__menu-content">${submenuMatch.label}</div>`;
        }
        const mainMenu = __classPrivateFieldGet(this, _Settings_menu, "f").querySelector('.op-settings__menu');
        if (mainMenu) {
            mainMenu.appendChild(menuItem);
        }
        __classPrivateFieldSet(this, _Settings_originalOutput, __classPrivateFieldGet(this, _Settings_menu, "f").innerHTML, "f");
        if (submenu) {
            const subItems = `
                <div class="op-settings__header">
                    <button type="button" class="op-settings__back">${name}</button>
                </div>
                <div class="op-settings__menu" role="menu" id="menu-item-${key}">
                    ${submenu.map((item) => `
                    <div class="op-settings__submenu-item" tabindex="0" role="menuitemradio"
                        aria-checked="${defaultValue === item.key ? 'true' : 'false'}">
                        <div class="op-settings__submenu-label ${className || ''}" data-value="${key}-${item.key}">${item.label}</div>
                    </div>`).join('')}
                </div>`;
            __classPrivateFieldGet(this, _Settings_submenu, "f")[key] = subItems;
        }
        __classPrivateFieldGet(this, _Settings_events, "f").global['settings.submenu'] = (e) => {
            const target = e.target;
            if (target.closest(`#${__classPrivateFieldGet(this, _Settings_player, "f").id}`)) {
                if (hasClass(target, 'op-settings__back')) {
                    __classPrivateFieldGet(this, _Settings_menu, "f").classList.add('op-settings--sliding');
                    setTimeout(() => {
                        __classPrivateFieldGet(this, _Settings_menu, "f").innerHTML = __classPrivateFieldGet(this, _Settings_originalOutput, "f");
                        __classPrivateFieldGet(this, _Settings_menu, "f").classList.remove('op-settings--sliding');
                    }, 100);
                }
                else if (hasClass(target, 'op-settings__menu-content')) {
                    const labelEl = target.parentElement ? target.parentElement.querySelector('.op-settings__menu-label') : null;
                    const label = labelEl ? labelEl.getAttribute('data-value') : null;
                    const fragments = label ? label.split('-') : [];
                    if (fragments.length > 0) {
                        fragments.pop();
                        const current = fragments.join('-').replace(/^\-|\-$/, '');
                        if (typeof __classPrivateFieldGet(this, _Settings_submenu, "f")[current] !== undefined) {
                            __classPrivateFieldGet(this, _Settings_menu, "f").classList.add('op-settings--sliding');
                            setTimeout(() => {
                                __classPrivateFieldGet(this, _Settings_menu, "f").innerHTML = __classPrivateFieldGet(this, _Settings_submenu, "f")[current];
                                __classPrivateFieldGet(this, _Settings_menu, "f").classList.remove('op-settings--sliding');
                            }, 100);
                        }
                    }
                }
                else if (hasClass(target, 'op-settings__submenu-label')) {
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
                                    prev.nextElementSibling.innerHTML = label;
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
            removeElement(target);
        }
        if (__classPrivateFieldGet(this, _Settings_player, "f").getElement().querySelectorAll(`.op-settings__submenu-label[data-value^=${type}]`).length < minItems) {
            delete __classPrivateFieldGet(this, _Settings_submenu, "f")[type];
            const label = __classPrivateFieldGet(this, _Settings_player, "f").getElement().querySelector(`.op-settings__menu-label[data-value^=${type}]`);
            const menuItem = label ? label.closest('.op-settings__menu-item') : null;
            if (menuItem) {
                removeElement(menuItem);
            }
        }
    }
}
_Settings_player = new WeakMap(), _Settings_submenu = new WeakMap(), _Settings_button = new WeakMap(), _Settings_menu = new WeakMap(), _Settings_events = new WeakMap(), _Settings_originalOutput = new WeakMap(), _Settings_labels = new WeakMap(), _Settings_position = new WeakMap(), _Settings_layer = new WeakMap();
export default Settings;

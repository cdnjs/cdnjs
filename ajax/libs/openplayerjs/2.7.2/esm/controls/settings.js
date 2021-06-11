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
var _player, _submenu, _button, _menu, _events, _originalOutput, _labels, _position, _layer;
import { EVENT_OPTIONS } from '../utils/constants';
import { hasClass, removeElement } from '../utils/general';
class Settings {
    constructor(player, position, layer) {
        _player.set(this, void 0);
        _submenu.set(this, {});
        _button.set(this, void 0);
        _menu.set(this, void 0);
        _events.set(this, {
            global: {},
            media: {},
        });
        _originalOutput.set(this, '');
        _labels.set(this, void 0);
        _position.set(this, void 0);
        _layer.set(this, void 0);
        __classPrivateFieldSet(this, _player, player);
        __classPrivateFieldSet(this, _labels, player.getOptions().labels);
        __classPrivateFieldSet(this, _position, position);
        __classPrivateFieldSet(this, _layer, layer);
        return this;
    }
    create() {
        __classPrivateFieldSet(this, _button, document.createElement('button'));
        __classPrivateFieldGet(this, _button).className = `op-controls__settings op-control__${__classPrivateFieldGet(this, _position)}`;
        __classPrivateFieldGet(this, _button).tabIndex = 0;
        __classPrivateFieldGet(this, _button).title = __classPrivateFieldGet(this, _labels).settings;
        __classPrivateFieldGet(this, _button).setAttribute('aria-controls', __classPrivateFieldGet(this, _player).id);
        __classPrivateFieldGet(this, _button).setAttribute('aria-pressed', 'false');
        __classPrivateFieldGet(this, _button).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).settings);
        __classPrivateFieldGet(this, _button).innerHTML = `<span class="op-sr">${__classPrivateFieldGet(this, _labels).settings}</span>`;
        __classPrivateFieldSet(this, _menu, document.createElement('div'));
        __classPrivateFieldGet(this, _menu).className = 'op-settings';
        __classPrivateFieldGet(this, _menu).setAttribute('aria-hidden', 'true');
        __classPrivateFieldGet(this, _menu).innerHTML = '<div class="op-settings__menu" role="menu"></div>';
        this.clickEvent = () => {
            __classPrivateFieldGet(this, _button).setAttribute('aria-pressed', 'true');
            const menus = __classPrivateFieldGet(this, _player).getContainer().querySelectorAll('.op-settings');
            for (let i = 0, total = menus.length; i < total; ++i) {
                if (menus[i] !== __classPrivateFieldGet(this, _menu)) {
                    menus[i].setAttribute('aria-hidden', 'true');
                }
            }
            __classPrivateFieldGet(this, _menu).setAttribute('aria-hidden', (__classPrivateFieldGet(this, _menu).getAttribute('aria-hidden') === 'false' ? 'true' : 'false'));
        };
        this.hideEvent = () => {
            let timeout;
            if (timeout && typeof window !== 'undefined') {
                window.cancelAnimationFrame(timeout);
            }
            if (typeof window !== 'undefined') {
                timeout = window.requestAnimationFrame(() => {
                    __classPrivateFieldGet(this, _menu).innerHTML = __classPrivateFieldGet(this, _originalOutput);
                    __classPrivateFieldGet(this, _menu).setAttribute('aria-hidden', 'true');
                });
            }
        };
        this.removeEvent = (e) => {
            const { id, type } = e.detail;
            this.removeItem(id, type);
        };
        __classPrivateFieldGet(this, _events).media.controlshidden = this.hideEvent.bind(this);
        __classPrivateFieldGet(this, _events).media.settingremoved = this.removeEvent.bind(this);
        __classPrivateFieldGet(this, _events).media.play = this.hideEvent.bind(this);
        __classPrivateFieldGet(this, _events).media.pause = this.hideEvent.bind(this);
        __classPrivateFieldGet(this, _events).global.click = (e) => {
            if (e.target.closest(`#${__classPrivateFieldGet(this, _player).id}`) && hasClass(e.target, 'op-speed__option')) {
                __classPrivateFieldGet(this, _player).getMedia().playbackRate = parseFloat(e.target.getAttribute('data-value').replace('speed-', ''));
            }
        };
        __classPrivateFieldGet(this, _events).global.resize = this.hideEvent.bind(this);
        __classPrivateFieldGet(this, _button).addEventListener('click', this.clickEvent.bind(this), EVENT_OPTIONS);
        Object.keys(__classPrivateFieldGet(this, _events)).forEach(event => {
            __classPrivateFieldGet(this, _player).getElement().addEventListener(event, __classPrivateFieldGet(this, _events).media[event], EVENT_OPTIONS);
        });
        document.addEventListener('click', __classPrivateFieldGet(this, _events).global.click, EVENT_OPTIONS);
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', __classPrivateFieldGet(this, _events).global.resize, EVENT_OPTIONS);
        }
        __classPrivateFieldGet(this, _player).getControls().getLayer(__classPrivateFieldGet(this, _layer)).appendChild(__classPrivateFieldGet(this, _button));
        __classPrivateFieldGet(this, _player).getContainer().appendChild(__classPrivateFieldGet(this, _menu));
    }
    destroy() {
        __classPrivateFieldGet(this, _button).removeEventListener('click', this.clickEvent.bind(this));
        Object.keys(__classPrivateFieldGet(this, _events)).forEach(event => {
            __classPrivateFieldGet(this, _player).getElement().removeEventListener(event, __classPrivateFieldGet(this, _events).media[event]);
        });
        document.removeEventListener('click', __classPrivateFieldGet(this, _events).global.click);
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', __classPrivateFieldGet(this, _events).global.resize);
        }
        if (__classPrivateFieldGet(this, _events).global['settings.submenu'] !== undefined) {
            document.removeEventListener('click', __classPrivateFieldGet(this, _events).global['settings.submenu']);
            __classPrivateFieldGet(this, _player).getElement().removeEventListener('controlshidden', this.hideEvent);
        }
        removeElement(__classPrivateFieldGet(this, _menu));
        removeElement(__classPrivateFieldGet(this, _button));
    }
    addSettings() {
        return {
            className: 'op-speed__option',
            default: __classPrivateFieldGet(this, _player) && __classPrivateFieldGet(this, _player).getMedia() ? __classPrivateFieldGet(this, _player).getMedia().defaultPlaybackRate.toString() : '1',
            key: 'speed',
            name: __classPrivateFieldGet(this, _labels).speed,
            subitems: [
                { key: '0.25', label: '0.25' },
                { key: '0.5', label: '0.5' },
                { key: '0.75', label: '0.75' },
                { key: '1', label: __classPrivateFieldGet(this, _labels).speedNormal },
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
        const mainMenu = __classPrivateFieldGet(this, _menu).querySelector('.op-settings__menu');
        if (mainMenu) {
            mainMenu.appendChild(menuItem);
        }
        __classPrivateFieldSet(this, _originalOutput, __classPrivateFieldGet(this, _menu).innerHTML);
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
            __classPrivateFieldGet(this, _submenu)[key] = subItems;
        }
        __classPrivateFieldGet(this, _events).global['settings.submenu'] = (e) => {
            const target = e.target;
            if (target.closest(`#${__classPrivateFieldGet(this, _player).id}`)) {
                if (hasClass(target, 'op-settings__back')) {
                    __classPrivateFieldGet(this, _menu).classList.add('op-settings--sliding');
                    setTimeout(() => {
                        __classPrivateFieldGet(this, _menu).innerHTML = __classPrivateFieldGet(this, _originalOutput);
                        __classPrivateFieldGet(this, _menu).classList.remove('op-settings--sliding');
                    }, 100);
                }
                else if (hasClass(target, 'op-settings__menu-content')) {
                    const labelEl = target.parentElement ? target.parentElement.querySelector('.op-settings__menu-label') : null;
                    const label = labelEl ? labelEl.getAttribute('data-value') : null;
                    const fragments = label ? label.split('-') : [];
                    if (fragments.length > 0) {
                        fragments.pop();
                        const current = fragments.join('-').replace(/^\-|\-$/, '');
                        if (typeof __classPrivateFieldGet(this, _submenu)[current] !== undefined) {
                            __classPrivateFieldGet(this, _menu).classList.add('op-settings--sliding');
                            setTimeout(() => {
                                __classPrivateFieldGet(this, _menu).innerHTML = __classPrivateFieldGet(this, _submenu)[current];
                                __classPrivateFieldGet(this, _menu).classList.remove('op-settings--sliding');
                            }, 100);
                        }
                    }
                }
                else if (hasClass(target, 'op-settings__submenu-label')) {
                    const current = target.getAttribute('data-value');
                    const value = current ? current.replace(`${key}-`, '') : '';
                    const label = target.innerText;
                    const menuTarget = __classPrivateFieldGet(this, _menu).querySelector(`#menu-item-${key} .op-settings__submenu-item[aria-checked=true]`);
                    if (menuTarget) {
                        menuTarget.setAttribute('aria-checked', 'false');
                        if (target.parentElement) {
                            target.parentElement.setAttribute('aria-checked', 'true');
                        }
                        __classPrivateFieldGet(this, _submenu)[key] = __classPrivateFieldGet(this, _menu).innerHTML;
                        __classPrivateFieldGet(this, _menu).classList.add('op-settings--sliding');
                        setTimeout(() => {
                            __classPrivateFieldGet(this, _menu).innerHTML = __classPrivateFieldGet(this, _originalOutput);
                            const prev = __classPrivateFieldGet(this, _menu).querySelector(`.op-settings__menu-label[data-value="${key}-${defaultValue}"]`);
                            if (prev) {
                                prev.setAttribute('data-value', `${current}`);
                                if (prev.nextElementSibling) {
                                    prev.nextElementSibling.innerHTML = label;
                                }
                            }
                            defaultValue = value;
                            __classPrivateFieldSet(this, _originalOutput, __classPrivateFieldGet(this, _menu).innerHTML);
                            __classPrivateFieldGet(this, _menu).classList.remove('op-settings--sliding');
                        }, 100);
                    }
                }
            }
            else {
                this.hideEvent();
            }
        };
        document.addEventListener('click', __classPrivateFieldGet(this, _events).global['settings.submenu'], EVENT_OPTIONS);
        __classPrivateFieldGet(this, _player).getElement().addEventListener('controlshidden', this.hideEvent, EVENT_OPTIONS);
    }
    removeItem(id, type, minItems = 2) {
        const target = __classPrivateFieldGet(this, _player).getElement().querySelector(`.op-settings__submenu-label[data-value=${type}-${id}]`);
        if (target) {
            removeElement(target);
        }
        if (__classPrivateFieldGet(this, _player).getElement().querySelectorAll(`.op-settings__submenu-label[data-value^=${type}]`).length < minItems) {
            delete __classPrivateFieldGet(this, _submenu)[type];
            const label = __classPrivateFieldGet(this, _player).getElement().querySelector(`.op-settings__menu-label[data-value^=${type}]`);
            const menuItem = label ? label.closest('.op-settings__menu-item') : null;
            if (menuItem) {
                removeElement(menuItem);
            }
        }
    }
}
_player = new WeakMap(), _submenu = new WeakMap(), _button = new WeakMap(), _menu = new WeakMap(), _events = new WeakMap(), _originalOutput = new WeakMap(), _labels = new WeakMap(), _position = new WeakMap(), _layer = new WeakMap();
export default Settings;

import { EVENT_OPTIONS } from '../utils/constants';
import { hasClass, removeElement } from '../utils/general';
class Settings {
    constructor(player, position, layer) {
        this.submenu = {};
        this.events = {
            global: {},
            media: {},
        };
        this.originalOutput = '';
        this.player = player;
        this.labels = player.getOptions().labels;
        this.position = position;
        this.layer = layer;
        return this;
    }
    create() {
        this.button = document.createElement('button');
        this.button.className = `op-controls__settings op-control__${this.position}`;
        this.button.tabIndex = 0;
        this.button.title = this.labels.settings;
        this.button.setAttribute('aria-controls', this.player.id);
        this.button.setAttribute('aria-pressed', 'false');
        this.button.setAttribute('aria-label', this.labels.settings);
        this.button.innerHTML = `<span class="op-sr">${this.labels.settings}</span>`;
        this.menu = document.createElement('div');
        this.menu.className = 'op-settings';
        this.menu.setAttribute('aria-hidden', 'true');
        this.menu.innerHTML = '<div class="op-settings__menu" role="menu"></div>';
        this.clickEvent = () => {
            this.button.setAttribute('aria-pressed', 'true');
            const menus = this.player.getContainer().querySelectorAll('.op-settings');
            for (let i = 0, total = menus.length; i < total; ++i) {
                if (menus[i] !== this.menu) {
                    menus[i].setAttribute('aria-hidden', 'true');
                }
            }
            this.menu.setAttribute('aria-hidden', (this.menu.getAttribute('aria-hidden') === 'false' ? 'true' : 'false'));
        };
        this.hideEvent = () => {
            let timeout;
            if (timeout && typeof window !== 'undefined') {
                window.cancelAnimationFrame(timeout);
            }
            if (typeof window !== 'undefined') {
                timeout = window.requestAnimationFrame(() => {
                    this.menu.innerHTML = this.originalOutput;
                    this.menu.setAttribute('aria-hidden', 'true');
                });
            }
        };
        this.removeEvent = (e) => {
            const { id, type } = e.detail;
            this.removeItem(id, type);
        };
        this.events.media.controlshidden = this.hideEvent.bind(this);
        this.events.media.settingremoved = this.removeEvent.bind(this);
        this.events.media.play = this.hideEvent.bind(this);
        this.events.media.pause = this.hideEvent.bind(this);
        this.events.global.click = (e) => {
            if (e.target.closest(`#${this.player.id}`) && hasClass(e.target, 'op-speed__option')) {
                this.player.getMedia().playbackRate = parseFloat(e.target.getAttribute('data-value').replace('speed-', ''));
            }
        };
        this.events.global.resize = this.hideEvent.bind(this);
        this.button.addEventListener('click', this.clickEvent.bind(this), EVENT_OPTIONS);
        Object.keys(this.events).forEach(event => {
            this.player.getElement().addEventListener(event, this.events.media[event], EVENT_OPTIONS);
        });
        document.addEventListener('click', this.events.global.click, EVENT_OPTIONS);
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.events.global.resize, EVENT_OPTIONS);
        }
        this.player.getControls().getLayer(this.layer).appendChild(this.button);
        this.player.getContainer().appendChild(this.menu);
    }
    destroy() {
        this.button.removeEventListener('click', this.clickEvent.bind(this));
        Object.keys(this.events).forEach(event => {
            this.player.getElement().removeEventListener(event, this.events.media[event]);
        });
        document.removeEventListener('click', this.events.global.click);
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.events.global.resize);
        }
        if (this.events.global['settings.submenu'] !== undefined) {
            document.removeEventListener('click', this.events.global['settings.submenu']);
            this.player.getElement().removeEventListener('controlshidden', this.hideEvent);
        }
        removeElement(this.menu);
        removeElement(this.button);
    }
    addSettings() {
        return {
            className: 'op-speed__option',
            default: this.player && this.player.getMedia() ? this.player.getMedia().defaultPlaybackRate.toString() : '1',
            key: 'speed',
            name: this.labels.speed,
            subitems: [
                { key: '0.25', label: '0.25' },
                { key: '0.5', label: '0.5' },
                { key: '0.75', label: '0.75' },
                { key: '1', label: this.labels.speedNormal },
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
        const mainMenu = this.menu.querySelector('.op-settings__menu');
        if (mainMenu) {
            mainMenu.appendChild(menuItem);
        }
        this.originalOutput = this.menu.innerHTML;
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
            this.submenu[key] = subItems;
        }
        this.events.global['settings.submenu'] = (e) => {
            const target = e.target;
            if (target.closest(`#${this.player.id}`)) {
                if (hasClass(target, 'op-settings__back')) {
                    this.menu.classList.add('op-settings--sliding');
                    setTimeout(() => {
                        this.menu.innerHTML = this.originalOutput;
                        this.menu.classList.remove('op-settings--sliding');
                    }, 100);
                }
                else if (hasClass(target, 'op-settings__menu-content')) {
                    const labelEl = target.parentElement ? target.parentElement.querySelector('.op-settings__menu-label') : null;
                    const label = labelEl ? labelEl.getAttribute('data-value') : null;
                    const fragments = label ? label.split('-') : [];
                    if (fragments.length > 0) {
                        fragments.pop();
                        const current = fragments.join('-').replace(/^\-|\-$/, '');
                        if (typeof this.submenu[current] !== undefined) {
                            this.menu.classList.add('op-settings--sliding');
                            setTimeout(() => {
                                this.menu.innerHTML = this.submenu[current];
                                this.menu.classList.remove('op-settings--sliding');
                            }, 100);
                        }
                    }
                }
                else if (hasClass(target, 'op-settings__submenu-label')) {
                    const current = target.getAttribute('data-value');
                    const value = current ? current.replace(`${key}-`, '') : '';
                    const label = target.innerText;
                    const menuTarget = this.menu.querySelector(`#menu-item-${key} .op-settings__submenu-item[aria-checked=true]`);
                    if (menuTarget) {
                        menuTarget.setAttribute('aria-checked', 'false');
                        if (target.parentElement) {
                            target.parentElement.setAttribute('aria-checked', 'true');
                        }
                        this.submenu[key] = this.menu.innerHTML;
                        this.menu.classList.add('op-settings--sliding');
                        setTimeout(() => {
                            this.menu.innerHTML = this.originalOutput;
                            const prev = this.menu.querySelector(`.op-settings__menu-label[data-value="${key}-${defaultValue}"]`);
                            if (prev) {
                                prev.setAttribute('data-value', `${current}`);
                                if (prev.nextElementSibling) {
                                    prev.nextElementSibling.innerHTML = label;
                                }
                            }
                            defaultValue = value;
                            this.originalOutput = this.menu.innerHTML;
                            this.menu.classList.remove('op-settings--sliding');
                        }, 100);
                    }
                }
            }
            else {
                this.hideEvent();
            }
        };
        document.addEventListener('click', this.events.global['settings.submenu'], EVENT_OPTIONS);
        this.player.getElement().addEventListener('controlshidden', this.hideEvent, EVENT_OPTIONS);
    }
    removeItem(id, type, minItems = 2) {
        const target = this.player.getElement().querySelector(`.op-settings__submenu-label[data-value=${type}-${id}]`);
        if (target) {
            removeElement(target);
        }
        if (this.player.getElement().querySelectorAll(`.op-settings__submenu-label[data-value^=${type}]`).length < minItems) {
            delete this.submenu[type];
            const label = this.player.getElement().querySelector(`.op-settings__menu-label[data-value^=${type}]`);
            const menuItem = label ? label.closest('.op-settings__menu-item') : null;
            if (menuItem) {
                removeElement(menuItem);
            }
        }
    }
}
export default Settings;

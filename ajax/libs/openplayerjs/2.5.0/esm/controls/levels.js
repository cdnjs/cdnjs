import { EVENT_OPTIONS, IS_ANDROID, IS_IOS, NAV } from '../utils/constants';
import { addEvent } from '../utils/events';
import { hasClass, removeElement } from '../utils/general';
import { isDashSource, isHlsSource } from '../utils/media';
class Levels {
    constructor(player, position, layer) {
        this.events = {
            button: {},
            global: {},
            media: {},
        };
        this.levels = [];
        this.default = '';
        this.player = player;
        this.labels = player.getOptions().labels;
        this.detachMenu = player.getOptions().detachMenus;
        this.position = position;
        this.layer = layer;
        return this;
    }
    create() {
        const initialLevel = this.player.getOptions().defaultLevel !== null ?
            parseInt(this.player.getOptions().defaultLevel, 10) : this.player.getMedia().level;
        this.default = `${initialLevel}`;
        const menuItems = this._formatMenuItems();
        const defaultLevel = menuItems.length ? menuItems.find((items) => items.key === this.default) : null;
        const defaultLabel = defaultLevel ? defaultLevel.label : this.labels.auto;
        let levelSet = false;
        this.button = document.createElement('button');
        this.button.className = `op-controls__levels op-control__${this.position}`;
        this.button.tabIndex = 0;
        this.button.title = this.labels.mediaLevels;
        this.button.setAttribute('aria-controls', this.player.id);
        this.button.setAttribute('aria-label', this.labels.mediaLevels);
        this.button.setAttribute('data-active-level', this.default);
        this.button.innerHTML = `<span>${defaultLabel}</span>`;
        const loadLevelsEvent = () => {
            if (!this.levels.length) {
                this._gatherLevels.bind(this);
                setTimeout(() => {
                    this.player.getMedia().level = initialLevel;
                    const e = addEvent('controlschanged');
                    this.player.getElement().dispatchEvent(e);
                }, 0);
            }
            else if (!levelSet) {
                this.player.getMedia().level = initialLevel;
                levelSet = true;
            }
        };
        this.events.media.loadedmetadata = loadLevelsEvent.bind(this);
        this.events.media.manifestLoaded = loadLevelsEvent.bind(this);
        this.events.media.hlsManifestParsed = loadLevelsEvent.bind(this);
        if (this.detachMenu) {
            this.player.getControls().getLayer(this.layer).appendChild(this.button);
            this._buildMenu();
            this.events.button.click = () => {
                if (this.detachMenu) {
                    const menus = this.player.getContainer().querySelectorAll('.op-settings');
                    for (let i = 0, total = menus.length; i < total; ++i) {
                        if (menus[i] !== this.menu) {
                            menus[i].setAttribute('aria-hidden', 'true');
                        }
                    }
                    if (this.menu.getAttribute('aria-hidden') === 'true') {
                        this.menu.setAttribute('aria-hidden', 'false');
                    }
                    else {
                        this.menu.setAttribute('aria-hidden', 'true');
                    }
                }
            };
            this.events.button.mouseover = () => {
                if (!IS_IOS && !IS_ANDROID) {
                    const menus = this.player.getContainer().querySelectorAll('.op-settings');
                    for (let i = 0, total = menus.length; i < total; ++i) {
                        if (menus[i] !== this.menu) {
                            menus[i].setAttribute('aria-hidden', 'true');
                        }
                    }
                    if (this.menu.getAttribute('aria-hidden') === 'true') {
                        this.menu.setAttribute('aria-hidden', 'false');
                    }
                }
            };
            this.events.button.mouseout = () => {
                if (!IS_IOS && !IS_ANDROID) {
                    const menus = this.player.getContainer().querySelectorAll('.op-settings');
                    for (let i = 0, total = menus.length; i < total; ++i) {
                        menus[i].setAttribute('aria-hidden', 'true');
                    }
                    if (this.menu.getAttribute('aria-hidden') === 'false') {
                        this.menu.setAttribute('aria-hidden', 'true');
                    }
                }
            };
            this.button.addEventListener('click', this.events.button.click, EVENT_OPTIONS);
            this.button.addEventListener('mouseover', this.events.button.mouseover, EVENT_OPTIONS);
            this.menu.addEventListener('mouseover', this.events.button.mouseover, EVENT_OPTIONS);
            this.menu.addEventListener('mouseout', this.events.button.mouseout, EVENT_OPTIONS);
            this.player.getElement().addEventListener('controlshidden', this.events.button.mouseout, EVENT_OPTIONS);
        }
        this.events.global.click = (e) => {
            const option = e.target;
            const currentTime = this.player.getMedia().currentTime;
            const isPaused = this.player.getMedia().paused;
            if (option.closest(`#${this.player.id}`) && hasClass(option, 'op-levels__option')) {
                const levelVal = option.getAttribute('data-value');
                const level = parseInt(levelVal ? levelVal.replace('levels-', '') : '-1', 10);
                this.default = `${level}`;
                if (this.detachMenu) {
                    this.button.setAttribute('data-active-level', `${level}`);
                    this.button.innerHTML = `<span>${option.innerText}</span>`;
                    const levels = option.parentElement && option.parentElement.parentElement ?
                        option.parentElement.parentElement.querySelectorAll('.op-settings__submenu-item') : [];
                    for (let i = 0, total = levels.length; i < total; ++i) {
                        levels[i].setAttribute('aria-checked', 'false');
                    }
                    if (option.parentElement) {
                        option.parentElement.setAttribute('aria-checked', 'true');
                    }
                    this.menu.setAttribute('aria-hidden', 'false');
                }
                this.player.getMedia().level = level;
                this.player.getMedia().currentTime = currentTime;
                if (!isPaused) {
                    this.player.play();
                }
                const event = addEvent('levelchanged', {
                    detail: {
                        label: option.innerText.trim(),
                        level,
                    },
                });
                this.player.getElement().dispatchEvent(event);
                e.preventDefault();
            }
        };
        const connection = NAV.connection || NAV.mozConnection || NAV.webkitConnection;
        this.events.global.connection = () => {
            const media = this.player.getMedia().media.media;
            if (!isDashSource(media) && !isHlsSource(media)) {
                let type = connection.effectiveType;
                const levels = this.levels.map(item => (Object.assign(Object.assign({}, item), { resolution: parseInt(item.label.replace('p', ''), 10) })));
                let level = levels.find(item => item.resolution < 360);
                if (type === '4g') {
                    level = levels.find(item => item.resolution >= 720);
                }
                else if (type === '3g') {
                    level = levels.find(item => item.resolution >= 360 && item.resolution < 720);
                }
                if (level) {
                    this.player.pause();
                    this.player.getMedia().level = level.id;
                    this.player.play();
                }
                type = connection.effectiveType;
            }
        };
        Object.keys(this.events.media).forEach(event => {
            this.player.getElement().addEventListener(event, this.events.media[event], EVENT_OPTIONS);
        });
        document.addEventListener('click', this.events.global.click, EVENT_OPTIONS);
        if (connection) {
            connection.addEventListener('change', this.events.global.connection, EVENT_OPTIONS);
        }
    }
    destroy() {
        const connection = NAV.connection || NAV.mozConnection || NAV.webkitConnection;
        Object.keys(this.events.media).forEach(event => {
            this.player.getElement().removeEventListener(event, this.events.media[event]);
        });
        document.removeEventListener('click', this.events.global.click);
        if (connection) {
            connection.removeEventListener('change', this.events.global.connection);
        }
        if (this.detachMenu) {
            this.button.removeEventListener('click', this.events.button.click);
            removeElement(this.button);
            this.button.removeEventListener('mouseover', this.events.button.mouseover);
            this.menu.removeEventListener('mouseover', this.events.button.mouseover);
            this.menu.removeEventListener('mouseout', this.events.button.mouseout);
            this.player.getElement().removeEventListener('controlshidden', this.events.button.mouseout);
            removeElement(this.menu);
        }
    }
    addSettings() {
        if (this.detachMenu) {
            return {};
        }
        const subitems = this._formatMenuItems();
        return subitems.length > 2 ? {
            className: 'op-levels__option',
            default: this.default || '-1',
            key: 'levels',
            name: this.labels.levels,
            subitems,
        } : {};
    }
    _formatMenuItems() {
        const levels = this._gatherLevels();
        const total = levels.length;
        let items = total ? [{ key: '-1', label: this.labels.auto }] : [];
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
        return this.labels.auto;
    }
    _gatherLevels() {
        if (!this.levels.length) {
            this.player.getMedia().levels.forEach((level) => {
                this.levels.push(Object.assign(Object.assign({}, level), { label: level.label || this._getResolutionsLabel(level.height) }));
            });
        }
        return this.levels;
    }
    _buildMenu() {
        if (this.detachMenu) {
            this.button.classList.add('op-control--no-hover');
            this.menu = document.createElement('div');
            this.menu.className = 'op-settings op-levels__menu';
            this.menu.setAttribute('aria-hidden', 'true');
            const className = 'op-levels__option';
            const options = this._formatMenuItems();
            const menu = `<div class="op-settings__menu" role="menu" id="menu-item-levels">
                ${options.map(item => `
                <div class="op-settings__submenu-item" tabindex="0" role="menuitemradio"
                    aria-checked="${this.default === item.key ? 'true' : 'false'}">
                    <div class="op-settings__submenu-label ${className || ''}" data-value="levels-${item.key}">${item.label}</div>
                </div>`).join('')}
            </div>`;
            this.menu.innerHTML = menu;
            this.player.getControls().getLayer(this.layer).appendChild(this.menu);
        }
    }
}
export default Levels;

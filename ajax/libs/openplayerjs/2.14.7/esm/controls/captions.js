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
var _Captions_player, _Captions_button, _Captions_captions, _Captions_menu, _Captions_events, _Captions_mediaTrackList, _Captions_hasTracks, _Captions_currentTrack, _Captions_default, _Captions_controlPosition, _Captions_controlLayer;
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS } from '../utils/constants';
import { addEvent } from '../utils/general';
class Captions {
    constructor(player, position, layer) {
        _Captions_player.set(this, void 0);
        _Captions_button.set(this, void 0);
        _Captions_captions.set(this, void 0);
        _Captions_menu.set(this, void 0);
        _Captions_events.set(this, {
            button: {},
            global: {},
            media: {},
        });
        _Captions_mediaTrackList.set(this, void 0);
        _Captions_hasTracks.set(this, void 0);
        _Captions_currentTrack.set(this, void 0);
        _Captions_default.set(this, 'off');
        _Captions_controlPosition.set(this, void 0);
        _Captions_controlLayer.set(this, void 0);
        __classPrivateFieldSet(this, _Captions_player, player, "f");
        __classPrivateFieldSet(this, _Captions_controlPosition, position, "f");
        __classPrivateFieldSet(this, _Captions_controlLayer, layer, "f");
        this._formatMenuItems = this._formatMenuItems.bind(this);
        this._setDefaultTrack = this._setDefaultTrack.bind(this);
        this._showCaptions = this._showCaptions.bind(this);
        this._hideCaptions = this._hideCaptions.bind(this);
    }
    create() {
        var _a;
        const { textTracks } = __classPrivateFieldGet(this, _Captions_player, "f").getElement();
        const { labels, detachMenus } = __classPrivateFieldGet(this, _Captions_player, "f").getOptions();
        __classPrivateFieldSet(this, _Captions_mediaTrackList, Object.keys(textTracks)
            .map((k) => textTracks[Number(k)])
            .filter((el) => ['subtitles', 'captions'].includes(el.kind) && el.language), "f");
        __classPrivateFieldSet(this, _Captions_hasTracks, !!__classPrivateFieldGet(this, _Captions_mediaTrackList, "f").length, "f");
        if (!__classPrivateFieldGet(this, _Captions_hasTracks, "f")) {
            return;
        }
        __classPrivateFieldSet(this, _Captions_button, document.createElement('button'), "f");
        __classPrivateFieldGet(this, _Captions_button, "f").className = `op-controls__captions op-control__${__classPrivateFieldGet(this, _Captions_controlPosition, "f")}`;
        __classPrivateFieldGet(this, _Captions_button, "f").tabIndex = 0;
        __classPrivateFieldGet(this, _Captions_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.toggleCaptions) || '';
        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('aria-controls', __classPrivateFieldGet(this, _Captions_player, "f").id);
        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('aria-pressed', 'false');
        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.toggleCaptions) || '');
        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', 'off');
        __classPrivateFieldSet(this, _Captions_captions, document.createElement('div'), "f");
        __classPrivateFieldGet(this, _Captions_captions, "f").className = 'op-captions';
        const target = __classPrivateFieldGet(this, _Captions_player, "f").getContainer();
        target.insertBefore(__classPrivateFieldGet(this, _Captions_captions, "f"), target.firstChild);
        if (detachMenus) {
            __classPrivateFieldGet(this, _Captions_button, "f").classList.add('op-control--no-hover');
            __classPrivateFieldSet(this, _Captions_menu, document.createElement('div'), "f");
            __classPrivateFieldGet(this, _Captions_menu, "f").className = 'op-settings op-captions__menu';
            __classPrivateFieldGet(this, _Captions_menu, "f").setAttribute('aria-hidden', 'true');
            __classPrivateFieldGet(this, _Captions_menu, "f").innerHTML = `<div class="op-settings__menu" role="menu" id="menu-item-captions">
                <div class="op-settings__submenu-item" tabindex="0" role="menuitemradio" aria-checked="${__classPrivateFieldGet(this, _Captions_default, "f") === 'off' ? 'true' : 'false'}">
                    <div class="op-settings__submenu-label op-subtitles__option" data-value="captions-off">${labels === null || labels === void 0 ? void 0 : labels.off}</div>
                </div>
            </div>`;
            const itemContainer = document.createElement('div');
            itemContainer.className = `op-controls__container op-control__${__classPrivateFieldGet(this, _Captions_controlPosition, "f")}`;
            itemContainer.append(__classPrivateFieldGet(this, _Captions_button, "f"), __classPrivateFieldGet(this, _Captions_menu, "f"));
            __classPrivateFieldGet(this, _Captions_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Captions_controlLayer, "f")).append(itemContainer);
            for (const track of __classPrivateFieldGet(this, _Captions_mediaTrackList, "f")) {
                const item = document.createElement('div');
                const label = ((_a = labels === null || labels === void 0 ? void 0 : labels.lang) === null || _a === void 0 ? void 0 : _a[track.language]) || null;
                item.className = 'op-settings__submenu-item';
                item.tabIndex = 0;
                item.setAttribute('role', 'menuitemradio');
                item.setAttribute('aria-checked', __classPrivateFieldGet(this, _Captions_default, "f") === track.language ? 'true' : 'false');
                item.innerHTML = `<div class="op-settings__submenu-label op-subtitles__option"
                    data-value="captions-${track.language}">
                    ${label || track.label}
                </div>`;
                __classPrivateFieldGet(this, _Captions_menu, "f").append(item);
            }
        }
        else {
            __classPrivateFieldGet(this, _Captions_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Captions_controlLayer, "f")).append(__classPrivateFieldGet(this, _Captions_button, "f"));
        }
        __classPrivateFieldGet(this, _Captions_events, "f").button.click = (e) => {
            var _a;
            const button = e.target;
            if (detachMenus) {
                const menus = __classPrivateFieldGet(this, _Captions_player, "f").getContainer().querySelectorAll('.op-settings');
                for (const menuItem of Array.from(menus)) {
                    if (menuItem !== __classPrivateFieldGet(this, _Captions_menu, "f")) {
                        menuItem.setAttribute('aria-hidden', 'true');
                    }
                }
                if (__classPrivateFieldGet(this, _Captions_menu, "f").getAttribute('aria-hidden') === 'true') {
                    __classPrivateFieldGet(this, _Captions_menu, "f").setAttribute('aria-hidden', 'false');
                }
                else {
                    __classPrivateFieldGet(this, _Captions_menu, "f").setAttribute('aria-hidden', 'true');
                }
            }
            else {
                button.setAttribute('aria-pressed', 'true');
                if (button.classList.contains('op-controls__captions--on')) {
                    button.classList.remove('op-controls__captions--on');
                    button.setAttribute('data-active-captions', 'off');
                    this._hideCaptions();
                }
                else {
                    button.classList.add('op-controls__captions--on');
                    button.setAttribute('data-active-captions', ((_a = __classPrivateFieldGet(this, _Captions_currentTrack, "f")) === null || _a === void 0 ? void 0 : _a.language) || 'off');
                    this._showCaptions();
                }
                for (const track of __classPrivateFieldGet(this, _Captions_mediaTrackList, "f")) {
                    track.mode = button.getAttribute('data-active-captions') === track.language ? 'showing' : 'hidden';
                }
            }
        };
        __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover = () => {
            if (!IS_IOS && !IS_ANDROID && detachMenus) {
                const menus = __classPrivateFieldGet(this, _Captions_player, "f").getContainer().querySelectorAll('.op-settings');
                for (let i = 0, total = menus.length; i < total; ++i) {
                    if (menus[i] !== __classPrivateFieldGet(this, _Captions_menu, "f")) {
                        menus[i].setAttribute('aria-hidden', 'true');
                    }
                }
                if (__classPrivateFieldGet(this, _Captions_menu, "f").getAttribute('aria-hidden') === 'true') {
                    __classPrivateFieldGet(this, _Captions_menu, "f").setAttribute('aria-hidden', 'false');
                }
            }
        };
        __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout = () => {
            if (!IS_IOS && !IS_ANDROID && detachMenus) {
                const menus = __classPrivateFieldGet(this, _Captions_player, "f").getContainer().querySelectorAll('.op-settings');
                for (let i = 0, total = menus.length; i < total; ++i) {
                    menus[i].setAttribute('aria-hidden', 'true');
                }
                if (__classPrivateFieldGet(this, _Captions_menu, "f").getAttribute('aria-hidden') === 'false') {
                    __classPrivateFieldGet(this, _Captions_menu, "f").setAttribute('aria-hidden', 'true');
                }
            }
        };
        __classPrivateFieldGet(this, _Captions_button, "f").addEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").button.click, EVENT_OPTIONS);
        __classPrivateFieldGet(this, _Captions_events, "f").global.click = (e) => {
            const option = e.target;
            if (option.closest(`#${__classPrivateFieldGet(this, _Captions_player, "f").id}`) && option.classList.contains('op-subtitles__option')) {
                const language = option.getAttribute('data-value').replace('captions-', '');
                this._hideCaptions();
                if (language === 'off') {
                    __classPrivateFieldSet(this, _Captions_currentTrack, undefined, "f");
                }
                for (const track of __classPrivateFieldGet(this, _Captions_mediaTrackList, "f")) {
                    track.mode = track.language === language ? 'showing' : 'hidden';
                    if (track.language === language) {
                        __classPrivateFieldSet(this, _Captions_currentTrack, track, "f");
                        this._showCaptions();
                    }
                }
                if (detachMenus) {
                    if (__classPrivateFieldGet(this, _Captions_button, "f").classList.contains('op-controls__captions--on')) {
                        __classPrivateFieldGet(this, _Captions_button, "f").classList.remove('op-controls__captions--on');
                        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', 'off');
                    }
                    else {
                        __classPrivateFieldGet(this, _Captions_button, "f").classList.add('op-controls__captions--on');
                        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', language);
                    }
                    const captions = __classPrivateFieldGet(this, _Captions_menu, "f").querySelectorAll('.op-settings__submenu-item');
                    for (const caption of Array.from(captions)) {
                        caption.setAttribute('aria-checked', 'false');
                    }
                    option.parentElement.setAttribute('aria-checked', 'true');
                    __classPrivateFieldGet(this, _Captions_menu, "f").setAttribute('aria-hidden', 'false');
                }
                else {
                    __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', language);
                }
                const event = addEvent('captionschanged');
                __classPrivateFieldGet(this, _Captions_player, "f").getElement().dispatchEvent(event);
            }
        };
        __classPrivateFieldGet(this, _Captions_events, "f").global.cuechange = (e) => {
            var _a;
            this._hideCaptions();
            const t = e.target;
            if (t.mode !== 'showing' || __classPrivateFieldGet(this, _Captions_button, "f").getAttribute('data-active-captions') === 'off') {
                return;
            }
            if (t.activeCues && ((_a = t.activeCues) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                this._showCaptions();
            }
        };
        if (detachMenus) {
            __classPrivateFieldGet(this, _Captions_button, "f").addEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _Captions_menu, "f").addEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _Captions_menu, "f").addEventListener('mouseout', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _Captions_player, "f").getElement().addEventListener('controlshidden', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout, EVENT_OPTIONS);
        }
        document.addEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").global.click, EVENT_OPTIONS);
        for (const track of __classPrivateFieldGet(this, _Captions_mediaTrackList, "f")) {
            track.mode = track.mode !== 'showing' ? 'hidden' : track.mode;
            track.addEventListener('cuechange', __classPrivateFieldGet(this, _Captions_events, "f").global.cuechange, EVENT_OPTIONS);
        }
        const targetTrack = __classPrivateFieldGet(this, _Captions_player, "f")
            .getElement()
            .querySelector('track:is([kind="subtitles"],[kind="captions"])[default]');
        if (targetTrack) {
            const matchTrack = __classPrivateFieldGet(this, _Captions_mediaTrackList, "f").find((el) => el.language === targetTrack.srclang);
            if (matchTrack) {
                this._setDefaultTrack(matchTrack);
            }
        }
    }
    destroy() {
        const { detachMenus } = __classPrivateFieldGet(this, _Captions_player, "f").getOptions();
        if (!__classPrivateFieldGet(this, _Captions_hasTracks, "f")) {
            return;
        }
        for (const track of __classPrivateFieldGet(this, _Captions_mediaTrackList, "f")) {
            track.removeEventListener('cuechange', __classPrivateFieldGet(this, _Captions_events, "f").global.cuechange);
        }
        document.removeEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").global.click);
        __classPrivateFieldGet(this, _Captions_button, "f").removeEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").button.click);
        if (detachMenus) {
            __classPrivateFieldGet(this, _Captions_button, "f").removeEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover);
            __classPrivateFieldGet(this, _Captions_menu, "f").removeEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover);
            __classPrivateFieldGet(this, _Captions_menu, "f").removeEventListener('mouseout', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout);
            __classPrivateFieldGet(this, _Captions_player, "f").getElement().removeEventListener('controlshidden', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout);
            __classPrivateFieldGet(this, _Captions_menu, "f").remove();
        }
        __classPrivateFieldGet(this, _Captions_button, "f").remove();
    }
    addSettings() {
        const { detachMenus, labels } = __classPrivateFieldGet(this, _Captions_player, "f").getOptions();
        if (detachMenus || __classPrivateFieldGet(this, _Captions_mediaTrackList, "f").length <= 1) {
            return {};
        }
        const subitems = this._formatMenuItems();
        return subitems.length > 2
            ? {
                className: 'op-subtitles__option',
                default: __classPrivateFieldGet(this, _Captions_default, "f") || 'off',
                key: 'captions',
                name: (labels === null || labels === void 0 ? void 0 : labels.captions) || '',
                subitems,
            }
            : {};
    }
    _formatMenuItems() {
        const { labels, detachMenus } = __classPrivateFieldGet(this, _Captions_player, "f").getOptions();
        if (__classPrivateFieldGet(this, _Captions_mediaTrackList, "f").length <= 1 && !detachMenus) {
            return [];
        }
        let items = [{ key: 'off', label: (labels === null || labels === void 0 ? void 0 : labels.off) || '' }];
        for (const track of __classPrivateFieldGet(this, _Captions_mediaTrackList, "f")) {
            const label = (labels === null || labels === void 0 ? void 0 : labels.lang) ? labels.lang[track.language] : null;
            items = items.filter((el) => el.key !== track.language);
            items.push({ key: track.language, label: label || track.label });
        }
        return items;
    }
    _setDefaultTrack(track) {
        var _a, _b;
        track.mode = 'showing';
        __classPrivateFieldSet(this, _Captions_default, track.language, "f");
        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', __classPrivateFieldGet(this, _Captions_default, "f"));
        __classPrivateFieldGet(this, _Captions_button, "f").classList.add('op-controls__captions--on');
        __classPrivateFieldGet(this, _Captions_captions, "f").classList.add('op-captions--on');
        __classPrivateFieldSet(this, _Captions_currentTrack, track, "f");
        const options = document.querySelectorAll('.op-settings__submenu-item') || [];
        for (const option of Array.from(options)) {
            option.setAttribute('aria-checked', 'false');
        }
        (_b = (_a = document
            .querySelector(`.op-subtitles__option[data-value="captions-${track.language}"]`)) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.setAttribute('aria-checked', 'true');
    }
    _showCaptions() {
        var _a;
        for (const cue of Array.from(((_a = __classPrivateFieldGet(this, _Captions_currentTrack, "f")) === null || _a === void 0 ? void 0 : _a.activeCues) || [])) {
            const content = (cue === null || cue === void 0 ? void 0 : cue.text) || '';
            if (content && __classPrivateFieldGet(this, _Captions_captions, "f")) {
                const caption = document.createElement('span');
                caption.innerHTML = content;
                __classPrivateFieldGet(this, _Captions_captions, "f").prepend(caption);
                __classPrivateFieldGet(this, _Captions_captions, "f").classList.add('op-captions--on');
            }
            else {
                this._hideCaptions();
            }
        }
    }
    _hideCaptions() {
        var _a;
        while ((_a = __classPrivateFieldGet(this, _Captions_captions, "f")) === null || _a === void 0 ? void 0 : _a.lastChild) {
            __classPrivateFieldGet(this, _Captions_captions, "f").removeChild(__classPrivateFieldGet(this, _Captions_captions, "f").lastChild);
        }
    }
}
_Captions_player = new WeakMap(), _Captions_button = new WeakMap(), _Captions_captions = new WeakMap(), _Captions_menu = new WeakMap(), _Captions_events = new WeakMap(), _Captions_mediaTrackList = new WeakMap(), _Captions_hasTracks = new WeakMap(), _Captions_currentTrack = new WeakMap(), _Captions_default = new WeakMap(), _Captions_controlPosition = new WeakMap(), _Captions_controlLayer = new WeakMap();
export default Captions;

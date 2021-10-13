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
var _Captions_player, _Captions_button, _Captions_captions, _Captions_menu, _Captions_events, _Captions_tracks, _Captions_trackList, _Captions_trackUrlList, _Captions_hasTracks, _Captions_current, _Captions_default, _Captions_detachMenu, _Captions_labels, _Captions_position, _Captions_layer;
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS } from '../utils/constants';
import { addEvent } from '../utils/events';
import { getAbsoluteUrl, hasClass, removeElement, request } from '../utils/general';
import { timeToSeconds } from '../utils/time';
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
        _Captions_tracks.set(this, {});
        _Captions_trackList.set(this, void 0);
        _Captions_trackUrlList.set(this, {});
        _Captions_hasTracks.set(this, void 0);
        _Captions_current.set(this, void 0);
        _Captions_default.set(this, 'off');
        _Captions_detachMenu.set(this, void 0);
        _Captions_labels.set(this, void 0);
        _Captions_position.set(this, void 0);
        _Captions_layer.set(this, void 0);
        __classPrivateFieldSet(this, _Captions_player, player, "f");
        __classPrivateFieldSet(this, _Captions_labels, player.getOptions().labels, "f");
        __classPrivateFieldSet(this, _Captions_detachMenu, player.getOptions().detachMenus, "f");
        __classPrivateFieldSet(this, _Captions_position, position, "f");
        __classPrivateFieldSet(this, _Captions_layer, layer, "f");
        const trackList = __classPrivateFieldGet(this, _Captions_player, "f").getElement().textTracks;
        const tracks = [];
        for (let i = 0, total = trackList.length; i < total; i++) {
            const selector = [
                `track[kind="subtitles"][srclang="${trackList[i].language}"][label="${trackList[i].label}"]`,
                `track[kind="captions"][srclang="${trackList[i].language}"][label="${trackList[i].label}"]`,
            ];
            const tag = __classPrivateFieldGet(this, _Captions_player, "f").getElement().querySelector(selector.join(', '));
            if (tag) {
                tracks.push(trackList[i]);
            }
        }
        if (!tracks.length) {
            for (let i = 0, total = trackList.length; i < total; i++) {
                tracks.push(trackList[i]);
            }
        }
        __classPrivateFieldSet(this, _Captions_trackList, tracks, "f");
        __classPrivateFieldSet(this, _Captions_hasTracks, !!__classPrivateFieldGet(this, _Captions_trackList, "f").length, "f");
        return this;
    }
    create() {
        if (!__classPrivateFieldGet(this, _Captions_hasTracks, "f")) {
            return;
        }
        __classPrivateFieldSet(this, _Captions_button, document.createElement('button'), "f");
        __classPrivateFieldGet(this, _Captions_button, "f").className = `op-controls__captions op-control__${__classPrivateFieldGet(this, _Captions_position, "f")}`;
        __classPrivateFieldGet(this, _Captions_button, "f").tabIndex = 0;
        __classPrivateFieldGet(this, _Captions_button, "f").title = __classPrivateFieldGet(this, _Captions_labels, "f").toggleCaptions;
        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('aria-controls', __classPrivateFieldGet(this, _Captions_player, "f").id);
        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('aria-pressed', 'false');
        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('aria-label', __classPrivateFieldGet(this, _Captions_labels, "f").toggleCaptions);
        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', 'off');
        __classPrivateFieldGet(this, _Captions_button, "f").innerHTML = `<span class="op-sr">${__classPrivateFieldGet(this, _Captions_labels, "f").toggleCaptions}</span>`;
        if (__classPrivateFieldGet(this, _Captions_detachMenu, "f")) {
            __classPrivateFieldGet(this, _Captions_button, "f").classList.add('op-control--no-hover');
            __classPrivateFieldSet(this, _Captions_menu, document.createElement('div'), "f");
            __classPrivateFieldGet(this, _Captions_menu, "f").className = 'op-settings op-captions__menu';
            __classPrivateFieldGet(this, _Captions_menu, "f").setAttribute('aria-hidden', 'true');
            __classPrivateFieldGet(this, _Captions_menu, "f").innerHTML = `<div class="op-settings__menu" role="menu" id="menu-item-captions">
                <div class="op-settings__submenu-item" tabindex="0" role="menuitemradio" aria-checked="${__classPrivateFieldGet(this, _Captions_default, "f") === 'off' ? 'true' : 'false'}">
                    <div class="op-settings__submenu-label op-subtitles__option" data-value="captions-off">${__classPrivateFieldGet(this, _Captions_labels, "f").off}</div>
                </div>
            </div>`;
        }
        for (let i = 0, tracks = __classPrivateFieldGet(this, _Captions_player, "f").getElement().querySelectorAll('track'), total = tracks.length; i < total; i++) {
            const element = tracks[i];
            if (element.kind === 'subtitles' || element.kind === 'captions') {
                if (element.default) {
                    __classPrivateFieldSet(this, _Captions_default, element.srclang, "f");
                    __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', element.srclang);
                }
                const trackUrl = getAbsoluteUrl(element.src);
                const currTrack = __classPrivateFieldGet(this, _Captions_trackList, "f")[i];
                if (currTrack && currTrack.language === element.srclang) {
                    if (currTrack.cues && currTrack.cues.length > 0) {
                        __classPrivateFieldGet(this, _Captions_tracks, "f")[element.srclang] = this._getNativeCues(__classPrivateFieldGet(this, _Captions_trackList, "f")[i]);
                        this._prepareTrack(i, element.srclang, trackUrl, element.default || false);
                    }
                    else {
                        request(trackUrl, 'text', d => {
                            __classPrivateFieldGet(this, _Captions_tracks, "f")[element.srclang] = this._getCuesFromText(d);
                            this._prepareTrack(i, element.srclang, trackUrl, element.default || false);
                            const selector = `.op-subtitles__option[data-value="captions-${__classPrivateFieldGet(this, _Captions_trackList, "f")[i].language}"]`;
                            if (__classPrivateFieldGet(this, _Captions_menu, "f") && !__classPrivateFieldGet(this, _Captions_menu, "f").querySelector(selector)) {
                                const item = document.createElement('div');
                                item.className = 'op-settings__submenu-item';
                                item.tabIndex = 0;
                                item.setAttribute('role', 'menuitemradio');
                                item.setAttribute('aria-checked', __classPrivateFieldGet(this, _Captions_default, "f") === __classPrivateFieldGet(this, _Captions_trackList, "f")[i].language ? 'true' : 'false');
                                item.innerHTML = `<div class="op-settings__submenu-label op-subtitles__option"
                                        data-value="captions-${__classPrivateFieldGet(this, _Captions_trackList, "f")[i].language}">
                                        ${__classPrivateFieldGet(this, _Captions_labels, "f").lang[__classPrivateFieldGet(this, _Captions_trackList, "f")[i].language] || __classPrivateFieldGet(this, _Captions_trackList, "f")[i].label}
                                    </div>`;
                                __classPrivateFieldGet(this, _Captions_menu, "f").appendChild(item);
                            }
                        });
                    }
                }
            }
        }
        __classPrivateFieldSet(this, _Captions_captions, document.createElement('div'), "f");
        __classPrivateFieldGet(this, _Captions_captions, "f").className = 'op-captions';
        __classPrivateFieldGet(this, _Captions_captions, "f").innerHTML = '<span></span>';
        const container = __classPrivateFieldGet(this, _Captions_captions, "f").querySelector('span');
        __classPrivateFieldGet(this, _Captions_events, "f").media.timeupdate = () => {
            if (__classPrivateFieldGet(this, _Captions_player, "f").isMedia()) {
                if (__classPrivateFieldGet(this, _Captions_current, "f")) {
                    const currentCues = __classPrivateFieldGet(this, _Captions_tracks, "f")[__classPrivateFieldGet(this, _Captions_current, "f").language];
                    if (container && currentCues !== undefined) {
                        const index = this._search(currentCues, __classPrivateFieldGet(this, _Captions_player, "f").getMedia().currentTime);
                        container.innerHTML = '';
                        if (index > -1 && hasClass(__classPrivateFieldGet(this, _Captions_button, "f"), 'op-controls__captions--on')) {
                            __classPrivateFieldGet(this, _Captions_captions, "f").classList.add('op-captions--on');
                            container.innerHTML = this._sanitize(currentCues[index].text);
                        }
                        else {
                            this._hide();
                        }
                    }
                }
                else {
                    this._hide();
                }
            }
            else {
                this._hide();
            }
        };
        __classPrivateFieldGet(this, _Captions_events, "f").button.click = (e) => {
            const button = e.target;
            if (__classPrivateFieldGet(this, _Captions_detachMenu, "f")) {
                const menus = __classPrivateFieldGet(this, _Captions_player, "f").getContainer().querySelectorAll('.op-settings');
                for (let i = 0, total = menus.length; i < total; ++i) {
                    if (menus[i] !== __classPrivateFieldGet(this, _Captions_menu, "f")) {
                        menus[i].setAttribute('aria-hidden', 'true');
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
                if (hasClass(button, 'op-controls__captions--on')) {
                    this._hide();
                    button.classList.remove('op-controls__captions--on');
                    button.setAttribute('data-active-captions', 'off');
                }
                else {
                    if (!__classPrivateFieldGet(this, _Captions_current, "f")) {
                        __classPrivateFieldSet(this, _Captions_current, __classPrivateFieldGet(this, _Captions_trackList, "f")[0], "f");
                    }
                    this._show();
                    button.classList.add('op-controls__captions--on');
                    button.setAttribute('data-active-captions', __classPrivateFieldGet(this, _Captions_current, "f").language);
                }
            }
        };
        __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover = () => {
            if (!IS_IOS && !IS_ANDROID && __classPrivateFieldGet(this, _Captions_detachMenu, "f")) {
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
            if (!IS_IOS && !IS_ANDROID && __classPrivateFieldGet(this, _Captions_detachMenu, "f")) {
                const menus = __classPrivateFieldGet(this, _Captions_player, "f").getContainer().querySelectorAll('.op-settings');
                for (let i = 0, total = menus.length; i < total; ++i) {
                    menus[i].setAttribute('aria-hidden', 'true');
                }
                if (__classPrivateFieldGet(this, _Captions_menu, "f").getAttribute('aria-hidden') === 'false') {
                    __classPrivateFieldGet(this, _Captions_menu, "f").setAttribute('aria-hidden', 'true');
                }
            }
        };
        if (__classPrivateFieldGet(this, _Captions_hasTracks, "f")) {
            const target = __classPrivateFieldGet(this, _Captions_player, "f").getContainer();
            target.insertBefore(__classPrivateFieldGet(this, _Captions_captions, "f"), target.firstChild);
            if (__classPrivateFieldGet(this, _Captions_detachMenu, "f")) {
                const itemContainer = document.createElement('div');
                itemContainer.className = `op-controls__container op-control__${__classPrivateFieldGet(this, _Captions_position, "f")}`;
                itemContainer.appendChild(__classPrivateFieldGet(this, _Captions_button, "f"));
                itemContainer.appendChild(__classPrivateFieldGet(this, _Captions_menu, "f"));
                __classPrivateFieldGet(this, _Captions_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Captions_layer, "f")).appendChild(itemContainer);
            }
            else {
                __classPrivateFieldGet(this, _Captions_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Captions_layer, "f")).appendChild(__classPrivateFieldGet(this, _Captions_button, "f"));
            }
            __classPrivateFieldGet(this, _Captions_button, "f").addEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").button.click, EVENT_OPTIONS);
        }
        if ((__classPrivateFieldGet(this, _Captions_trackList, "f").length <= 1 && !__classPrivateFieldGet(this, _Captions_detachMenu, "f")) || (!__classPrivateFieldGet(this, _Captions_trackList, "f").length && __classPrivateFieldGet(this, _Captions_detachMenu, "f"))) {
            return;
        }
        __classPrivateFieldGet(this, _Captions_events, "f").global.click = (e) => {
            const option = e.target;
            if (option.closest(`#${__classPrivateFieldGet(this, _Captions_player, "f").id}`) && hasClass(option, 'op-subtitles__option')) {
                const langEl = option.getAttribute('data-value');
                const language = langEl ? langEl.replace('captions-', '') : '';
                const currentLang = Array.from(__classPrivateFieldGet(this, _Captions_trackList, "f")).filter(item => item.language === language);
                __classPrivateFieldSet(this, _Captions_current, currentLang ? currentLang.pop() : undefined, "f");
                if (__classPrivateFieldGet(this, _Captions_detachMenu, "f")) {
                    if (hasClass(__classPrivateFieldGet(this, _Captions_button, "f"), 'op-controls__captions--on')) {
                        this._hide();
                        __classPrivateFieldGet(this, _Captions_button, "f").classList.remove('op-controls__captions--on');
                        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', 'off');
                    }
                    else {
                        this._show();
                        __classPrivateFieldGet(this, _Captions_button, "f").classList.add('op-controls__captions--on');
                        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', language);
                    }
                    if (option.parentElement && option.parentElement.parentElement) {
                        const captions = option.parentElement.parentElement.querySelectorAll('.op-settings__submenu-item');
                        for (let i = 0, total = captions.length; i < total; ++i) {
                            captions[i].setAttribute('aria-checked', 'false');
                        }
                    }
                    if (option.parentElement) {
                        option.parentElement.setAttribute('aria-checked', 'true');
                    }
                    __classPrivateFieldGet(this, _Captions_menu, "f").setAttribute('aria-hidden', 'false');
                }
                else {
                    this._show();
                    __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', language);
                }
                const event = addEvent('captionschanged');
                __classPrivateFieldGet(this, _Captions_player, "f").getElement().dispatchEvent(event);
            }
        };
        if (__classPrivateFieldGet(this, _Captions_detachMenu, "f")) {
            __classPrivateFieldGet(this, _Captions_button, "f").addEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _Captions_menu, "f").addEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _Captions_menu, "f").addEventListener('mouseout', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _Captions_player, "f").getElement().addEventListener('controlshidden', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout, EVENT_OPTIONS);
        }
        if (typeof __classPrivateFieldGet(this, _Captions_events, "f").global.click !== 'undefined') {
            document.addEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").global.click, EVENT_OPTIONS);
        }
    }
    destroy() {
        if (typeof __classPrivateFieldGet(this, _Captions_events, "f").global.click !== 'undefined') {
            document.removeEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").global.click);
        }
        if (__classPrivateFieldGet(this, _Captions_hasTracks, "f")) {
            __classPrivateFieldGet(this, _Captions_button, "f").removeEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").button.click);
            if (__classPrivateFieldGet(this, _Captions_detachMenu, "f")) {
                __classPrivateFieldGet(this, _Captions_button, "f").removeEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover);
                __classPrivateFieldGet(this, _Captions_menu, "f").removeEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover);
                __classPrivateFieldGet(this, _Captions_menu, "f").removeEventListener('mouseout', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout);
                __classPrivateFieldGet(this, _Captions_player, "f").getElement().removeEventListener('controlshidden', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout);
                removeElement(__classPrivateFieldGet(this, _Captions_menu, "f"));
            }
            __classPrivateFieldGet(this, _Captions_player, "f").getElement().removeEventListener('timeupdate', __classPrivateFieldGet(this, _Captions_events, "f").media.timeupdate);
            removeElement(__classPrivateFieldGet(this, _Captions_button, "f"));
            removeElement(__classPrivateFieldGet(this, _Captions_captions, "f"));
        }
    }
    addSettings() {
        if (__classPrivateFieldGet(this, _Captions_detachMenu, "f") || __classPrivateFieldGet(this, _Captions_trackList, "f").length <= 1) {
            return {};
        }
        const subitems = this._formatMenuItems();
        return subitems.length > 2 ? {
            className: 'op-subtitles__option',
            default: __classPrivateFieldGet(this, _Captions_default, "f") || 'off',
            key: 'captions',
            name: __classPrivateFieldGet(this, _Captions_labels, "f").captions,
            subitems,
        } : {};
    }
    _getCuesFromText(webvttText) {
        const lines = webvttText.split(/\r?\n/);
        const entries = [];
        const urlRegexp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
        let timePattern = '^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --> ';
        timePattern += '((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*?)$';
        const regexp = new RegExp(timePattern);
        let identifier;
        function isJson(item) {
            item = typeof item !== 'string' ? JSON.stringify(item) : item;
            try {
                item = JSON.parse(item);
            }
            catch (e) {
                return false;
            }
            if (typeof item === 'object' && item !== null) {
                return true;
            }
            return false;
        }
        for (let i = 0, total = lines.length; i < total; i++) {
            const timecode = regexp.exec(lines[i]);
            if (timecode && i < lines.length) {
                if ((i - 1) >= 0 && lines[i - 1] !== '') {
                    identifier = lines[i - 1];
                }
                i++;
                let cue = lines[i];
                i++;
                while (lines[i] !== '' && i < lines.length) {
                    cue = `${cue}\n${lines[i]}`;
                    i++;
                }
                cue = cue.trim().replace(urlRegexp, "<a href='$1' target='_blank'>$1</a>");
                const initTime = timeToSeconds(timecode[1]);
                entries.push({
                    endTime: timeToSeconds(timecode[3]),
                    identifier: identifier || '',
                    settings: isJson(timecode[5]) ? JSON.parse(timecode[5]) : {},
                    startTime: (initTime === 0) ? 0.200 : initTime,
                    text: cue,
                });
            }
            identifier = '';
        }
        return entries;
    }
    _getNativeCues(track) {
        const cues = [];
        const trackCues = track.cues;
        Object.keys(trackCues).forEach(index => {
            const j = parseInt(index, 10);
            const current = trackCues[j];
            cues.push({
                endTime: current.endTime,
                identifier: current.id,
                settings: {},
                startTime: current.startTime,
                text: current.text,
            });
        });
        return cues;
    }
    _show() {
        if (!__classPrivateFieldGet(this, _Captions_captions, "f") || !__classPrivateFieldGet(this, _Captions_current, "f") || __classPrivateFieldGet(this, _Captions_current, "f").cues === undefined) {
            return;
        }
        const container = __classPrivateFieldGet(this, _Captions_captions, "f").querySelector('span');
        if (container) {
            container.innerHTML = '';
        }
        __classPrivateFieldGet(this, _Captions_player, "f").getElement().addEventListener('timeupdate', __classPrivateFieldGet(this, _Captions_events, "f").media.timeupdate, EVENT_OPTIONS);
    }
    _hide() {
        __classPrivateFieldGet(this, _Captions_captions, "f").classList.remove('op-captions--on');
        if (!__classPrivateFieldGet(this, _Captions_current, "f")) {
            __classPrivateFieldGet(this, _Captions_button, "f").classList.remove('op-controls__captions--on');
            __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', 'off');
        }
    }
    _search(tracks, currentTime) {
        let low = 0;
        let high = tracks.length - 1;
        while (low <= high) {
            const mid = ((low + high) >> 1);
            const start = tracks[mid].startTime;
            const stop = tracks[mid].endTime;
            if (currentTime >= start && currentTime < stop) {
                return mid;
            }
            if (start < currentTime) {
                low = mid + 1;
            }
            else if (start > currentTime) {
                high = mid - 1;
            }
        }
        return -1;
    }
    _sanitize(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        const scripts = div.getElementsByTagName('script');
        let i = scripts.length;
        while (i--) {
            removeElement(scripts[i]);
        }
        const allElements = div.getElementsByTagName('*');
        for (let index = 0, n = allElements.length; index < n; index++) {
            const attributesObj = allElements[index].attributes;
            const attributes = Array.prototype.slice.call(attributesObj);
            for (let j = 0, total = attributes.length; j < total; j++) {
                if (/^(on|javascript:)/.test(attributes[j].name)) {
                    removeElement(allElements[index]);
                }
                else if (attributes[j].name === 'style') {
                    allElements[index].removeAttribute(attributes[j].name);
                }
            }
        }
        return div.innerHTML;
    }
    _prepareTrack(index, language, trackUrl, showTrack = false) {
        __classPrivateFieldGet(this, _Captions_trackUrlList, "f")[language] = trackUrl;
        __classPrivateFieldGet(this, _Captions_trackList, "f")[index].mode = 'disabled';
        if (showTrack) {
            __classPrivateFieldSet(this, _Captions_default, language, "f");
            __classPrivateFieldGet(this, _Captions_button, "f").classList.add('op-controls__captions--on');
            __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', language);
            __classPrivateFieldSet(this, _Captions_current, Array.from(__classPrivateFieldGet(this, _Captions_trackList, "f"))
                .filter(item => item.language === __classPrivateFieldGet(this, _Captions_default, "f")).pop(), "f");
            this._show();
            if (!__classPrivateFieldGet(this, _Captions_player, "f").getContainer().classList.contains('op-captions--detected')) {
                __classPrivateFieldGet(this, _Captions_player, "f").getContainer().classList.add('op-captions--detected');
            }
        }
    }
    _formatMenuItems() {
        let items = [{ key: 'off', label: __classPrivateFieldGet(this, _Captions_labels, "f").off }];
        for (let i = 0, total = __classPrivateFieldGet(this, _Captions_trackList, "f").length; i < total; i++) {
            const track = __classPrivateFieldGet(this, _Captions_trackList, "f")[i];
            items = items.filter(el => el.key !== track.language);
            items.push({ key: track.language, label: __classPrivateFieldGet(this, _Captions_labels, "f").lang[track.language] || __classPrivateFieldGet(this, _Captions_trackList, "f")[i].label });
        }
        return items;
    }
}
_Captions_player = new WeakMap(), _Captions_button = new WeakMap(), _Captions_captions = new WeakMap(), _Captions_menu = new WeakMap(), _Captions_events = new WeakMap(), _Captions_tracks = new WeakMap(), _Captions_trackList = new WeakMap(), _Captions_trackUrlList = new WeakMap(), _Captions_hasTracks = new WeakMap(), _Captions_current = new WeakMap(), _Captions_default = new WeakMap(), _Captions_detachMenu = new WeakMap(), _Captions_labels = new WeakMap(), _Captions_position = new WeakMap(), _Captions_layer = new WeakMap();
export default Captions;

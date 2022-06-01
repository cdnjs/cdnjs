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
var _Captions_player, _Captions_button, _Captions_captions, _Captions_menu, _Captions_events, _Captions_langTracks, _Captions_mediaTrackList, _Captions_trackUrlList, _Captions_hasTracks, _Captions_currentTrack, _Captions_default, _Captions_controlPosition, _Captions_controlLayer;
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS } from '../utils/constants';
import { addEvent, getAbsoluteUrl, isJson, sanitize } from '../utils/general';
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
        _Captions_langTracks.set(this, {});
        _Captions_mediaTrackList.set(this, void 0);
        _Captions_trackUrlList.set(this, {});
        _Captions_hasTracks.set(this, void 0);
        _Captions_currentTrack.set(this, void 0);
        _Captions_default.set(this, 'off');
        _Captions_controlPosition.set(this, void 0);
        _Captions_controlLayer.set(this, void 0);
        __classPrivateFieldSet(this, _Captions_player, player, "f");
        __classPrivateFieldSet(this, _Captions_controlPosition, position, "f");
        __classPrivateFieldSet(this, _Captions_controlLayer, layer, "f");
        this._getCuesFromText = this._getCuesFromText.bind(this);
        this._getNativeCues = this._getNativeCues.bind(this);
        this._displayCaptions = this._displayCaptions.bind(this);
        this._hideCaptions = this._hideCaptions.bind(this);
        this._search = this._search.bind(this);
        this._prepareTrack = this._prepareTrack.bind(this);
        this._formatMenuItems = this._formatMenuItems.bind(this);
        return this;
    }
    create() {
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
        __classPrivateFieldSet(this, _Captions_mediaTrackList, tracks, "f");
        __classPrivateFieldSet(this, _Captions_hasTracks, !!__classPrivateFieldGet(this, _Captions_mediaTrackList, "f").length, "f");
        if (!__classPrivateFieldGet(this, _Captions_hasTracks, "f")) {
            return;
        }
        const { labels, detachMenus } = __classPrivateFieldGet(this, _Captions_player, "f").getOptions();
        __classPrivateFieldSet(this, _Captions_button, document.createElement('button'), "f");
        __classPrivateFieldGet(this, _Captions_button, "f").className = `op-controls__captions op-control__${__classPrivateFieldGet(this, _Captions_controlPosition, "f")}`;
        __classPrivateFieldGet(this, _Captions_button, "f").tabIndex = 0;
        __classPrivateFieldGet(this, _Captions_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.toggleCaptions) || '';
        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('aria-controls', __classPrivateFieldGet(this, _Captions_player, "f").id);
        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('aria-pressed', 'false');
        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.toggleCaptions) || '');
        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', 'off');
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
        }
        for (let i = 0, trackItems = __classPrivateFieldGet(this, _Captions_player, "f").getElement().querySelectorAll('track'), total = trackItems.length; i < total; i++) {
            const element = trackItems[i];
            if (element.kind === 'subtitles' || element.kind === 'captions') {
                if (element.default) {
                    __classPrivateFieldSet(this, _Captions_default, element.srclang, "f");
                    __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', element.srclang);
                }
                const trackUrl = getAbsoluteUrl(element.src);
                const currTrack = __classPrivateFieldGet(this, _Captions_mediaTrackList, "f")[i];
                if (currTrack && currTrack.language === element.srclang) {
                    if (currTrack.cues && currTrack.cues.length > 0) {
                        __classPrivateFieldGet(this, _Captions_langTracks, "f")[element.srclang] = this._getNativeCues(__classPrivateFieldGet(this, _Captions_mediaTrackList, "f")[i]);
                        this._prepareTrack(i, element.srclang, trackUrl, element.default || false);
                    }
                    else {
                        fetch(trackUrl)
                            .then((response) => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.text();
                        })
                            .then((d) => {
                            __classPrivateFieldGet(this, _Captions_langTracks, "f")[element.srclang] = this._getCuesFromText(d);
                            this._prepareTrack(i, element.srclang, trackUrl, element.default || false);
                            const selector = `.op-subtitles__option[data-value="captions-${__classPrivateFieldGet(this, _Captions_mediaTrackList, "f")[i].language}"]`;
                            if (__classPrivateFieldGet(this, _Captions_menu, "f") && !__classPrivateFieldGet(this, _Captions_menu, "f").querySelector(selector)) {
                                const item = document.createElement('div');
                                const label = (labels === null || labels === void 0 ? void 0 : labels.lang) ? labels.lang[__classPrivateFieldGet(this, _Captions_mediaTrackList, "f")[i].language] : null;
                                item.className = 'op-settings__submenu-item';
                                item.tabIndex = 0;
                                item.setAttribute('role', 'menuitemradio');
                                item.setAttribute('aria-checked', __classPrivateFieldGet(this, _Captions_default, "f") === __classPrivateFieldGet(this, _Captions_mediaTrackList, "f")[i].language ? 'true' : 'false');
                                item.innerHTML = `<div class="op-settings__submenu-label op-subtitles__option"
                                        data-value="captions-${__classPrivateFieldGet(this, _Captions_mediaTrackList, "f")[i].language}">
                                        ${label || __classPrivateFieldGet(this, _Captions_mediaTrackList, "f")[i].label}
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
                if (__classPrivateFieldGet(this, _Captions_currentTrack, "f")) {
                    const currentCues = __classPrivateFieldGet(this, _Captions_langTracks, "f")[__classPrivateFieldGet(this, _Captions_currentTrack, "f").language];
                    if (container && currentCues !== undefined) {
                        const index = this._search(currentCues, __classPrivateFieldGet(this, _Captions_player, "f").getMedia().currentTime);
                        container.innerHTML = '';
                        if (index > -1 && __classPrivateFieldGet(this, _Captions_button, "f").classList.contains('op-controls__captions--on')) {
                            __classPrivateFieldGet(this, _Captions_captions, "f").classList.add('op-captions--on');
                            container.innerHTML = sanitize(currentCues[index].text, false);
                        }
                        else {
                            this._hideCaptions();
                        }
                    }
                }
                else {
                    this._hideCaptions();
                }
            }
            else {
                this._hideCaptions();
            }
        };
        __classPrivateFieldGet(this, _Captions_events, "f").button.click = (e) => {
            const button = e.target;
            if (detachMenus) {
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
                if (button.classList.contains('op-controls__captions--on')) {
                    this._hideCaptions();
                    button.classList.remove('op-controls__captions--on');
                    button.setAttribute('data-active-captions', 'off');
                }
                else {
                    if (!__classPrivateFieldGet(this, _Captions_currentTrack, "f")) {
                        const [track] = __classPrivateFieldGet(this, _Captions_mediaTrackList, "f");
                        __classPrivateFieldSet(this, _Captions_currentTrack, track, "f");
                    }
                    this._displayCaptions();
                    button.classList.add('op-controls__captions--on');
                    button.setAttribute('data-active-captions', __classPrivateFieldGet(this, _Captions_currentTrack, "f").language);
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
        if (__classPrivateFieldGet(this, _Captions_hasTracks, "f")) {
            const target = __classPrivateFieldGet(this, _Captions_player, "f").getContainer();
            target.insertBefore(__classPrivateFieldGet(this, _Captions_captions, "f"), target.firstChild);
            if (detachMenus) {
                const itemContainer = document.createElement('div');
                itemContainer.className = `op-controls__container op-control__${__classPrivateFieldGet(this, _Captions_controlPosition, "f")}`;
                itemContainer.appendChild(__classPrivateFieldGet(this, _Captions_button, "f"));
                itemContainer.appendChild(__classPrivateFieldGet(this, _Captions_menu, "f"));
                __classPrivateFieldGet(this, _Captions_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Captions_controlLayer, "f")).appendChild(itemContainer);
            }
            else {
                __classPrivateFieldGet(this, _Captions_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Captions_controlLayer, "f")).appendChild(__classPrivateFieldGet(this, _Captions_button, "f"));
            }
            __classPrivateFieldGet(this, _Captions_button, "f").addEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").button.click, EVENT_OPTIONS);
        }
        if ((__classPrivateFieldGet(this, _Captions_mediaTrackList, "f").length <= 1 && !detachMenus) || (!__classPrivateFieldGet(this, _Captions_mediaTrackList, "f").length && detachMenus)) {
            return;
        }
        __classPrivateFieldGet(this, _Captions_events, "f").global.click = (e) => {
            const option = e.target;
            if (option.closest(`#${__classPrivateFieldGet(this, _Captions_player, "f").id}`) && option.classList.contains('op-subtitles__option')) {
                const langEl = option.getAttribute('data-value');
                const language = langEl ? langEl.replace('captions-', '') : '';
                const currentLang = Array.from(__classPrivateFieldGet(this, _Captions_mediaTrackList, "f")).filter((item) => item.language === language);
                __classPrivateFieldSet(this, _Captions_currentTrack, currentLang ? currentLang.pop() : undefined, "f");
                if (detachMenus) {
                    if (__classPrivateFieldGet(this, _Captions_button, "f").classList.contains('op-controls__captions--on')) {
                        this._hideCaptions();
                        __classPrivateFieldGet(this, _Captions_button, "f").classList.remove('op-controls__captions--on');
                        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', 'off');
                    }
                    else {
                        this._displayCaptions();
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
                    this._displayCaptions();
                    __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', language);
                }
                const event = addEvent('captionschanged');
                __classPrivateFieldGet(this, _Captions_player, "f").getElement().dispatchEvent(event);
            }
        };
        if (detachMenus) {
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
        const { detachMenus } = __classPrivateFieldGet(this, _Captions_player, "f").getOptions();
        if (typeof __classPrivateFieldGet(this, _Captions_events, "f").global.click !== 'undefined') {
            document.removeEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").global.click);
        }
        if (__classPrivateFieldGet(this, _Captions_hasTracks, "f")) {
            __classPrivateFieldGet(this, _Captions_button, "f").removeEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").button.click);
            if (detachMenus) {
                __classPrivateFieldGet(this, _Captions_button, "f").removeEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover);
                __classPrivateFieldGet(this, _Captions_menu, "f").removeEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover);
                __classPrivateFieldGet(this, _Captions_menu, "f").removeEventListener('mouseout', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout);
                __classPrivateFieldGet(this, _Captions_player, "f").getElement().removeEventListener('controlshidden', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout);
                __classPrivateFieldGet(this, _Captions_menu, "f").remove();
            }
            __classPrivateFieldGet(this, _Captions_player, "f").getElement().removeEventListener('timeupdate', __classPrivateFieldGet(this, _Captions_events, "f").media.timeupdate);
            __classPrivateFieldGet(this, _Captions_button, "f").remove();
            __classPrivateFieldGet(this, _Captions_captions, "f").remove();
        }
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
    _getCuesFromText(vttText) {
        const lines = vttText.split(/\r?\n/);
        const entries = [];
        const urlRegexp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
        let timePattern = '^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --> ';
        timePattern += '((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*?)$';
        const regexp = new RegExp(timePattern);
        let identifier;
        for (let i = 0, total = lines.length; i < total; i++) {
            const timeCode = regexp.exec(lines[i]);
            if (timeCode && i < lines.length) {
                if (i - 1 >= 0 && lines[i - 1] !== '') {
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
                const initTime = timeToSeconds(timeCode[1]);
                entries.push({
                    endTime: timeToSeconds(timeCode[3]),
                    identifier: identifier || '',
                    settings: isJson(timeCode[5]) ? JSON.parse(timeCode[5]) : {},
                    startTime: initTime === 0 ? 0.2 : initTime,
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
        Object.keys(trackCues).forEach((index) => {
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
    _displayCaptions() {
        if (!__classPrivateFieldGet(this, _Captions_captions, "f") || !__classPrivateFieldGet(this, _Captions_currentTrack, "f") || __classPrivateFieldGet(this, _Captions_currentTrack, "f").cues === undefined) {
            return;
        }
        const container = __classPrivateFieldGet(this, _Captions_captions, "f").querySelector('span');
        if (container) {
            container.innerHTML = '';
        }
        __classPrivateFieldGet(this, _Captions_player, "f").getElement().addEventListener('timeupdate', __classPrivateFieldGet(this, _Captions_events, "f").media.timeupdate, EVENT_OPTIONS);
    }
    _hideCaptions() {
        __classPrivateFieldGet(this, _Captions_captions, "f").classList.remove('op-captions--on');
        if (!__classPrivateFieldGet(this, _Captions_currentTrack, "f")) {
            __classPrivateFieldGet(this, _Captions_button, "f").classList.remove('op-controls__captions--on');
            __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', 'off');
        }
    }
    _search(tracks, currentTime) {
        let low = 0;
        let high = tracks.length - 1;
        while (low <= high) {
            const mid = (low + high) >> 1;
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
    _prepareTrack(index, language, trackUrl, showTrack = false) {
        __classPrivateFieldGet(this, _Captions_trackUrlList, "f")[language] = trackUrl;
        __classPrivateFieldGet(this, _Captions_mediaTrackList, "f")[index].mode = 'disabled';
        if (showTrack) {
            __classPrivateFieldSet(this, _Captions_default, language, "f");
            __classPrivateFieldGet(this, _Captions_button, "f").classList.add('op-controls__captions--on');
            __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', language);
            __classPrivateFieldSet(this, _Captions_currentTrack, Array.from(__classPrivateFieldGet(this, _Captions_mediaTrackList, "f"))
                .filter((item) => item.language === __classPrivateFieldGet(this, _Captions_default, "f"))
                .pop(), "f");
            this._displayCaptions();
            if (!__classPrivateFieldGet(this, _Captions_player, "f").getContainer().classList.contains('op-captions--detected')) {
                __classPrivateFieldGet(this, _Captions_player, "f").getContainer().classList.add('op-captions--detected');
            }
        }
    }
    _formatMenuItems() {
        const { labels } = __classPrivateFieldGet(this, _Captions_player, "f").getOptions();
        let items = [{ key: 'off', label: (labels === null || labels === void 0 ? void 0 : labels.off) || '' }];
        for (let i = 0, total = __classPrivateFieldGet(this, _Captions_mediaTrackList, "f").length; i < total; i++) {
            const track = __classPrivateFieldGet(this, _Captions_mediaTrackList, "f")[i];
            const label = (labels === null || labels === void 0 ? void 0 : labels.lang) ? labels.lang[track.language] : null;
            items = items.filter((el) => el.key !== track.language);
            items.push({ key: track.language, label: label || __classPrivateFieldGet(this, _Captions_mediaTrackList, "f")[i].label });
        }
        return items;
    }
}
_Captions_player = new WeakMap(), _Captions_button = new WeakMap(), _Captions_captions = new WeakMap(), _Captions_menu = new WeakMap(), _Captions_events = new WeakMap(), _Captions_langTracks = new WeakMap(), _Captions_mediaTrackList = new WeakMap(), _Captions_trackUrlList = new WeakMap(), _Captions_hasTracks = new WeakMap(), _Captions_currentTrack = new WeakMap(), _Captions_default = new WeakMap(), _Captions_controlPosition = new WeakMap(), _Captions_controlLayer = new WeakMap();
export default Captions;

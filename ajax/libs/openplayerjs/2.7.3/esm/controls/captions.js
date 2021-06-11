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
var _player, _button, _captions, _menu, _events, _tracks, _trackList, _trackUrlList, _hasTracks, _current, _default, _detachMenu, _labels, _position, _layer;
import { EVENT_OPTIONS, IS_ANDROID, IS_IOS } from '../utils/constants';
import { addEvent } from '../utils/events';
import { getAbsoluteUrl, hasClass, removeElement, request } from '../utils/general';
import { timeToSeconds } from '../utils/time';
class Captions {
    constructor(player, position, layer) {
        _player.set(this, void 0);
        _button.set(this, void 0);
        _captions.set(this, void 0);
        _menu.set(this, void 0);
        _events.set(this, {
            button: {},
            global: {},
            media: {},
        });
        _tracks.set(this, {});
        _trackList.set(this, void 0);
        _trackUrlList.set(this, {});
        _hasTracks.set(this, void 0);
        _current.set(this, void 0);
        _default.set(this, 'off');
        _detachMenu.set(this, void 0);
        _labels.set(this, void 0);
        _position.set(this, void 0);
        _layer.set(this, void 0);
        __classPrivateFieldSet(this, _player, player);
        __classPrivateFieldSet(this, _labels, player.getOptions().labels);
        __classPrivateFieldSet(this, _detachMenu, player.getOptions().detachMenus);
        __classPrivateFieldSet(this, _position, position);
        __classPrivateFieldSet(this, _layer, layer);
        const trackList = __classPrivateFieldGet(this, _player).getElement().textTracks;
        const tracks = [];
        for (let i = 0, total = trackList.length; i < total; i++) {
            const selector = [
                `track[kind="subtitles"][srclang="${trackList[i].language}"][label="${trackList[i].label}"]`,
                `track[kind="captions"][srclang="${trackList[i].language}"][label="${trackList[i].label}"]`,
            ];
            const tag = __classPrivateFieldGet(this, _player).getElement().querySelector(selector.join(', '));
            if (tag) {
                tracks.push(trackList[i]);
            }
        }
        if (!tracks.length) {
            for (let i = 0, total = trackList.length; i < total; i++) {
                tracks.push(trackList[i]);
            }
        }
        __classPrivateFieldSet(this, _trackList, tracks);
        __classPrivateFieldSet(this, _hasTracks, !!__classPrivateFieldGet(this, _trackList).length);
        return this;
    }
    create() {
        if (!__classPrivateFieldGet(this, _hasTracks)) {
            return;
        }
        __classPrivateFieldSet(this, _button, document.createElement('button'));
        __classPrivateFieldGet(this, _button).className = `op-controls__captions op-control__${__classPrivateFieldGet(this, _position)}`;
        __classPrivateFieldGet(this, _button).tabIndex = 0;
        __classPrivateFieldGet(this, _button).title = __classPrivateFieldGet(this, _labels).toggleCaptions;
        __classPrivateFieldGet(this, _button).setAttribute('aria-controls', __classPrivateFieldGet(this, _player).id);
        __classPrivateFieldGet(this, _button).setAttribute('aria-pressed', 'false');
        __classPrivateFieldGet(this, _button).setAttribute('aria-label', __classPrivateFieldGet(this, _labels).toggleCaptions);
        __classPrivateFieldGet(this, _button).setAttribute('data-active-captions', 'off');
        __classPrivateFieldGet(this, _button).innerHTML = `<span class="op-sr">${__classPrivateFieldGet(this, _labels).toggleCaptions}</span>`;
        if (__classPrivateFieldGet(this, _detachMenu)) {
            __classPrivateFieldGet(this, _button).classList.add('op-control--no-hover');
            __classPrivateFieldSet(this, _menu, document.createElement('div'));
            __classPrivateFieldGet(this, _menu).className = 'op-settings op-captions__menu';
            __classPrivateFieldGet(this, _menu).setAttribute('aria-hidden', 'true');
            __classPrivateFieldGet(this, _menu).innerHTML = `<div class="op-settings__menu" role="menu" id="menu-item-captions">
                <div class="op-settings__submenu-item" tabindex="0" role="menuitemradio" aria-checked="${__classPrivateFieldGet(this, _default) === 'off' ? 'true' : 'false'}">
                    <div class="op-settings__submenu-label op-subtitles__option" data-value="captions-off">${__classPrivateFieldGet(this, _labels).off}</div>
                </div>
            </div>`;
        }
        for (let i = 0, tracks = __classPrivateFieldGet(this, _player).getElement().querySelectorAll('track'), total = tracks.length; i < total; i++) {
            const element = tracks[i];
            if (element.kind === 'subtitles' || element.kind === 'captions') {
                if (element.default) {
                    __classPrivateFieldSet(this, _default, element.srclang);
                    __classPrivateFieldGet(this, _button).setAttribute('data-active-captions', element.srclang);
                }
                const trackUrl = getAbsoluteUrl(element.src);
                const currTrack = __classPrivateFieldGet(this, _trackList)[i];
                if (currTrack && currTrack.language === element.srclang) {
                    if (currTrack.cues && currTrack.cues.length > 0) {
                        __classPrivateFieldGet(this, _tracks)[element.srclang] = this._getNativeCues(__classPrivateFieldGet(this, _trackList)[i]);
                        this._prepareTrack(i, element.srclang, trackUrl, element.default || false);
                    }
                    else {
                        request(trackUrl, 'text', d => {
                            __classPrivateFieldGet(this, _tracks)[element.srclang] = this._getCuesFromText(d);
                            this._prepareTrack(i, element.srclang, trackUrl, element.default || false);
                            if (__classPrivateFieldGet(this, _menu) && !__classPrivateFieldGet(this, _menu).querySelector(`.op-subtitles__option[data-value="captions-${__classPrivateFieldGet(this, _trackList)[i].language}"]`)) {
                                const item = document.createElement('div');
                                item.className = 'op-settings__submenu-item';
                                item.tabIndex = 0;
                                item.setAttribute('role', 'menuitemradio');
                                item.setAttribute('aria-checked', __classPrivateFieldGet(this, _default) === __classPrivateFieldGet(this, _trackList)[i].language ? 'true' : 'false');
                                item.innerHTML = `<div class="op-settings__submenu-label op-subtitles__option"
                                        data-value="captions-${__classPrivateFieldGet(this, _trackList)[i].language}">
                                        ${__classPrivateFieldGet(this, _labels).lang[__classPrivateFieldGet(this, _trackList)[i].language] || __classPrivateFieldGet(this, _trackList)[i].label}
                                    </div>`;
                                __classPrivateFieldGet(this, _menu).appendChild(item);
                            }
                        });
                    }
                }
            }
        }
        __classPrivateFieldSet(this, _captions, document.createElement('div'));
        __classPrivateFieldGet(this, _captions).className = 'op-captions';
        __classPrivateFieldGet(this, _captions).innerHTML = '<span></span>';
        const container = __classPrivateFieldGet(this, _captions).querySelector('span');
        __classPrivateFieldGet(this, _events).media.timeupdate = () => {
            if (__classPrivateFieldGet(this, _player).isMedia()) {
                if (__classPrivateFieldGet(this, _current)) {
                    const currentCues = __classPrivateFieldGet(this, _tracks)[__classPrivateFieldGet(this, _current).language];
                    if (container && currentCues !== undefined) {
                        const index = this._search(currentCues, __classPrivateFieldGet(this, _player).getMedia().currentTime);
                        container.innerHTML = '';
                        if (index > -1 && hasClass(__classPrivateFieldGet(this, _button), 'op-controls__captions--on')) {
                            __classPrivateFieldGet(this, _captions).classList.add('op-captions--on');
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
        __classPrivateFieldGet(this, _events).button.click = (e) => {
            const button = e.target;
            if (__classPrivateFieldGet(this, _detachMenu)) {
                const menus = __classPrivateFieldGet(this, _player).getContainer().querySelectorAll('.op-settings');
                for (let i = 0, total = menus.length; i < total; ++i) {
                    if (menus[i] !== __classPrivateFieldGet(this, _menu)) {
                        menus[i].setAttribute('aria-hidden', 'true');
                    }
                }
                if (__classPrivateFieldGet(this, _menu).getAttribute('aria-hidden') === 'true') {
                    __classPrivateFieldGet(this, _menu).setAttribute('aria-hidden', 'false');
                }
                else {
                    __classPrivateFieldGet(this, _menu).setAttribute('aria-hidden', 'true');
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
                    if (!__classPrivateFieldGet(this, _current)) {
                        __classPrivateFieldSet(this, _current, __classPrivateFieldGet(this, _trackList)[0]);
                    }
                    this._show();
                    button.classList.add('op-controls__captions--on');
                    button.setAttribute('data-active-captions', __classPrivateFieldGet(this, _current).language);
                }
            }
        };
        __classPrivateFieldGet(this, _events).button.mouseover = () => {
            if (!IS_IOS && !IS_ANDROID && __classPrivateFieldGet(this, _detachMenu)) {
                const menus = __classPrivateFieldGet(this, _player).getContainer().querySelectorAll('.op-settings');
                for (let i = 0, total = menus.length; i < total; ++i) {
                    if (menus[i] !== __classPrivateFieldGet(this, _menu)) {
                        menus[i].setAttribute('aria-hidden', 'true');
                    }
                }
                if (__classPrivateFieldGet(this, _menu).getAttribute('aria-hidden') === 'true') {
                    __classPrivateFieldGet(this, _menu).setAttribute('aria-hidden', 'false');
                }
            }
        };
        __classPrivateFieldGet(this, _events).button.mouseout = () => {
            if (!IS_IOS && !IS_ANDROID && __classPrivateFieldGet(this, _detachMenu)) {
                const menus = __classPrivateFieldGet(this, _player).getContainer().querySelectorAll('.op-settings');
                for (let i = 0, total = menus.length; i < total; ++i) {
                    menus[i].setAttribute('aria-hidden', 'true');
                }
                if (__classPrivateFieldGet(this, _menu).getAttribute('aria-hidden') === 'false') {
                    __classPrivateFieldGet(this, _menu).setAttribute('aria-hidden', 'true');
                }
            }
        };
        if (__classPrivateFieldGet(this, _hasTracks)) {
            const target = __classPrivateFieldGet(this, _player).getContainer();
            target.insertBefore(__classPrivateFieldGet(this, _captions), target.firstChild);
            if (__classPrivateFieldGet(this, _detachMenu)) {
                const itemContainer = document.createElement('div');
                itemContainer.className = `op-controls__container op-control__${__classPrivateFieldGet(this, _position)}`;
                itemContainer.appendChild(__classPrivateFieldGet(this, _button));
                itemContainer.appendChild(__classPrivateFieldGet(this, _menu));
                __classPrivateFieldGet(this, _player).getControls().getLayer(__classPrivateFieldGet(this, _layer)).appendChild(itemContainer);
            }
            else {
                __classPrivateFieldGet(this, _player).getControls().getLayer(__classPrivateFieldGet(this, _layer)).appendChild(__classPrivateFieldGet(this, _button));
            }
            __classPrivateFieldGet(this, _button).addEventListener('click', __classPrivateFieldGet(this, _events).button.click, EVENT_OPTIONS);
        }
        if ((__classPrivateFieldGet(this, _trackList).length <= 1 && !__classPrivateFieldGet(this, _detachMenu)) || (!__classPrivateFieldGet(this, _trackList).length && __classPrivateFieldGet(this, _detachMenu))) {
            return;
        }
        __classPrivateFieldGet(this, _events).global.click = (e) => {
            const option = e.target;
            if (option.closest(`#${__classPrivateFieldGet(this, _player).id}`) && hasClass(option, 'op-subtitles__option')) {
                const langEl = option.getAttribute('data-value');
                const language = langEl ? langEl.replace('captions-', '') : '';
                const currentLang = Array.from(__classPrivateFieldGet(this, _trackList)).filter(item => item.language === language);
                __classPrivateFieldSet(this, _current, currentLang ? currentLang.pop() : undefined);
                if (__classPrivateFieldGet(this, _detachMenu)) {
                    if (hasClass(__classPrivateFieldGet(this, _button), 'op-controls__captions--on')) {
                        this._hide();
                        __classPrivateFieldGet(this, _button).classList.remove('op-controls__captions--on');
                        __classPrivateFieldGet(this, _button).setAttribute('data-active-captions', 'off');
                    }
                    else {
                        this._show();
                        __classPrivateFieldGet(this, _button).classList.add('op-controls__captions--on');
                        __classPrivateFieldGet(this, _button).setAttribute('data-active-captions', language);
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
                    __classPrivateFieldGet(this, _menu).setAttribute('aria-hidden', 'false');
                }
                else {
                    this._show();
                    __classPrivateFieldGet(this, _button).setAttribute('data-active-captions', language);
                }
                const event = addEvent('captionschanged');
                __classPrivateFieldGet(this, _player).getElement().dispatchEvent(event);
            }
        };
        if (__classPrivateFieldGet(this, _detachMenu)) {
            __classPrivateFieldGet(this, _button).addEventListener('mouseover', __classPrivateFieldGet(this, _events).button.mouseover, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _menu).addEventListener('mouseover', __classPrivateFieldGet(this, _events).button.mouseover, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _menu).addEventListener('mouseout', __classPrivateFieldGet(this, _events).button.mouseout, EVENT_OPTIONS);
            __classPrivateFieldGet(this, _player).getElement().addEventListener('controlshidden', __classPrivateFieldGet(this, _events).button.mouseout, EVENT_OPTIONS);
        }
        if (typeof __classPrivateFieldGet(this, _events).global.click !== 'undefined') {
            document.addEventListener('click', __classPrivateFieldGet(this, _events).global.click, EVENT_OPTIONS);
        }
    }
    destroy() {
        if (typeof __classPrivateFieldGet(this, _events).global.click !== 'undefined') {
            document.removeEventListener('click', __classPrivateFieldGet(this, _events).global.click);
        }
        if (__classPrivateFieldGet(this, _hasTracks)) {
            __classPrivateFieldGet(this, _button).removeEventListener('click', __classPrivateFieldGet(this, _events).button.click);
            if (__classPrivateFieldGet(this, _detachMenu)) {
                __classPrivateFieldGet(this, _button).removeEventListener('mouseover', __classPrivateFieldGet(this, _events).button.mouseover);
                __classPrivateFieldGet(this, _menu).removeEventListener('mouseover', __classPrivateFieldGet(this, _events).button.mouseover);
                __classPrivateFieldGet(this, _menu).removeEventListener('mouseout', __classPrivateFieldGet(this, _events).button.mouseout);
                __classPrivateFieldGet(this, _player).getElement().removeEventListener('controlshidden', __classPrivateFieldGet(this, _events).button.mouseout);
                removeElement(__classPrivateFieldGet(this, _menu));
            }
            __classPrivateFieldGet(this, _player).getElement().removeEventListener('timeupdate', __classPrivateFieldGet(this, _events).media.timeupdate);
            removeElement(__classPrivateFieldGet(this, _button));
            removeElement(__classPrivateFieldGet(this, _captions));
        }
    }
    addSettings() {
        if (__classPrivateFieldGet(this, _detachMenu) || __classPrivateFieldGet(this, _trackList).length <= 1) {
            return {};
        }
        const subitems = this._formatMenuItems();
        return subitems.length > 2 ? {
            className: 'op-subtitles__option',
            default: __classPrivateFieldGet(this, _default) || 'off',
            key: 'captions',
            name: __classPrivateFieldGet(this, _labels).captions,
            subitems,
        } : {};
    }
    _getCuesFromText(webvttText) {
        const lines = webvttText.split(/\r?\n/);
        const entries = [];
        const urlRegexp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
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
        if (!__classPrivateFieldGet(this, _captions) || !__classPrivateFieldGet(this, _current) || __classPrivateFieldGet(this, _current).cues === undefined) {
            return;
        }
        const container = __classPrivateFieldGet(this, _captions).querySelector('span');
        if (container) {
            container.innerHTML = '';
        }
        __classPrivateFieldGet(this, _player).getElement().addEventListener('timeupdate', __classPrivateFieldGet(this, _events).media.timeupdate, EVENT_OPTIONS);
    }
    _hide() {
        __classPrivateFieldGet(this, _captions).classList.remove('op-captions--on');
        if (!__classPrivateFieldGet(this, _current)) {
            __classPrivateFieldGet(this, _button).classList.remove('op-controls__captions--on');
            __classPrivateFieldGet(this, _button).setAttribute('data-active-captions', 'off');
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
            else if (start < currentTime) {
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
        __classPrivateFieldGet(this, _trackUrlList)[language] = trackUrl;
        __classPrivateFieldGet(this, _trackList)[index].mode = 'disabled';
        if (showTrack) {
            __classPrivateFieldSet(this, _default, language);
            __classPrivateFieldGet(this, _button).classList.add('op-controls__captions--on');
            __classPrivateFieldGet(this, _button).setAttribute('data-active-captions', language);
            __classPrivateFieldSet(this, _current, Array.from(__classPrivateFieldGet(this, _trackList))
                .filter(item => item.language === __classPrivateFieldGet(this, _default)).pop());
            this._show();
            if (!__classPrivateFieldGet(this, _player).getContainer().classList.contains('op-captions--detected')) {
                __classPrivateFieldGet(this, _player).getContainer().classList.add('op-captions--detected');
            }
        }
    }
    _formatMenuItems() {
        let items = [{ key: 'off', label: __classPrivateFieldGet(this, _labels).off }];
        for (let i = 0, total = __classPrivateFieldGet(this, _trackList).length; i < total; i++) {
            const track = __classPrivateFieldGet(this, _trackList)[i];
            items = items.filter(el => el.key !== track.language);
            items.push({ key: track.language, label: __classPrivateFieldGet(this, _labels).lang[track.language] || __classPrivateFieldGet(this, _trackList)[i].label });
        }
        return items;
    }
}
_player = new WeakMap(), _button = new WeakMap(), _captions = new WeakMap(), _menu = new WeakMap(), _events = new WeakMap(), _tracks = new WeakMap(), _trackList = new WeakMap(), _trackUrlList = new WeakMap(), _hasTracks = new WeakMap(), _current = new WeakMap(), _default = new WeakMap(), _detachMenu = new WeakMap(), _labels = new WeakMap(), _position = new WeakMap(), _layer = new WeakMap();
export default Captions;

import { EVENT_OPTIONS, IS_ANDROID, IS_IOS } from '../utils/constants';
import { addEvent } from '../utils/events';
import { getAbsoluteUrl, hasClass, removeElement, request } from '../utils/general';
import { timeToSeconds } from '../utils/time';
class Captions {
    constructor(player, position, layer) {
        this.events = {
            button: {},
            global: {},
            media: {},
        };
        this.tracks = {};
        this.trackUrlList = {};
        this.default = 'off';
        this.player = player;
        this.labels = player.getOptions().labels;
        this.detachMenu = player.getOptions().detachMenus;
        this.position = position;
        this.layer = layer;
        const trackList = this.player.getElement().textTracks;
        const tracks = [];
        for (let i = 0, total = trackList.length; i < total; i++) {
            const selector = [
                `track[kind="subtitles"][srclang="${trackList[i].language}"][label="${trackList[i].label}"]`,
                `track[kind="captions"][srclang="${trackList[i].language}"][label="${trackList[i].label}"]`,
            ];
            const tag = this.player.getElement().querySelector(selector.join(', '));
            if (tag) {
                tracks.push(trackList[i]);
            }
        }
        if (!tracks.length) {
            for (let i = 0, total = trackList.length; i < total; i++) {
                tracks.push(trackList[i]);
            }
        }
        this.trackList = tracks;
        this.hasTracks = !!this.trackList.length;
        return this;
    }
    create() {
        if (!this.hasTracks) {
            return;
        }
        this.button = document.createElement('button');
        this.button.className = `op-controls__captions op-control__${this.position}`;
        this.button.tabIndex = 0;
        this.button.title = this.labels.toggleCaptions;
        this.button.setAttribute('aria-controls', this.player.id);
        this.button.setAttribute('aria-pressed', 'false');
        this.button.setAttribute('aria-label', this.labels.toggleCaptions);
        this.button.setAttribute('data-active-captions', 'off');
        this.button.innerHTML = `<span class="op-sr">${this.labels.toggleCaptions}</span>`;
        if (this.detachMenu) {
            this.button.classList.add('op-control--no-hover');
            this.menu = document.createElement('div');
            this.menu.className = 'op-settings op-captions__menu';
            this.menu.setAttribute('aria-hidden', 'true');
            this.button.classList.add('op-control--no-hover');
            this.menu = document.createElement('div');
            this.menu.className = 'op-settings op-captions__menu';
            this.menu.setAttribute('aria-hidden', 'true');
            this.menu.innerHTML = `<div class="op-settings__menu" role="menu" id="menu-item-captions">
                <div class="op-settings__submenu-item" tabindex="0" role="menuitemradio" aria-checked="${this.default === 'off' ? 'true' : 'false'}">
                    <div class="op-settings__submenu-label op-subtitles__option" data-value="captions-off">${this.labels.off}</div>
                </div>
            </div>`;
            this.player.getControls().getLayer(this.layer).appendChild(this.menu);
        }
        for (let i = 0, tracks = this.player.getElement().querySelectorAll('track'), total = tracks.length; i < total; i++) {
            const element = tracks[i];
            if (element.kind === 'subtitles' || element.kind === 'captions') {
                if (element.default) {
                    this.default = element.srclang;
                    this.button.setAttribute('data-active-captions', element.srclang);
                }
                const trackUrl = getAbsoluteUrl(element.src);
                const currTrack = this.trackList[i];
                if (currTrack && currTrack.language === element.srclang) {
                    if (currTrack.cues && currTrack.cues.length > 0) {
                        this.tracks[element.srclang] = this._getNativeCues(this.trackList[i]);
                        this._prepareTrack(i, element.srclang, trackUrl, element.default || false);
                    }
                    else {
                        request(trackUrl, 'text', d => {
                            this.tracks[element.srclang] = this._getCuesFromText(d);
                            this._prepareTrack(i, element.srclang, trackUrl, element.default || false);
                            if (this.menu && !this.menu.querySelector(`.op-subtitles__option[data-value="captions-${this.trackList[i].language}"]`)) {
                                const item = document.createElement('div');
                                item.className = 'op-settings__submenu-item';
                                item.tabIndex = 0;
                                item.setAttribute('role', 'menuitemradio');
                                item.setAttribute('aria-checked', this.default === this.trackList[i].language ? 'true' : 'false');
                                item.innerHTML = `<div class="op-settings__submenu-label op-subtitles__option"
                                        data-value="captions-${this.trackList[i].language}">
                                        ${this.labels.lang[this.trackList[i].language] || this.trackList[i].label}
                                    </div>`;
                                this.menu.appendChild(item);
                            }
                        });
                    }
                }
            }
        }
        this.captions = document.createElement('div');
        this.captions.className = 'op-captions';
        this.captions.innerHTML = '<span></span>';
        const container = this.captions.querySelector('span');
        this.events.media.timeupdate = () => {
            if (this.player.isMedia()) {
                if (this.current) {
                    const currentCues = this.tracks[this.current.language];
                    if (container && currentCues !== undefined) {
                        const index = this._search(currentCues, this.player.getMedia().currentTime);
                        container.innerHTML = '';
                        if (index > -1 && hasClass(this.button, 'op-controls__captions--on')) {
                            this.captions.classList.add('op-captions--on');
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
        this.events.button.click = (e) => {
            const button = e.target;
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
            else {
                button.setAttribute('aria-pressed', 'true');
                if (hasClass(button, 'op-controls__captions--on')) {
                    this._hide();
                    button.classList.remove('op-controls__captions--on');
                    button.setAttribute('data-active-captions', 'off');
                }
                else {
                    if (!this.current) {
                        this.current = this.trackList[0];
                    }
                    this._show();
                    button.classList.add('op-controls__captions--on');
                    button.setAttribute('data-active-captions', this.current.language);
                }
            }
        };
        this.events.button.mouseover = () => {
            if (!IS_IOS && !IS_ANDROID && this.detachMenu) {
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
            if (!IS_IOS && !IS_ANDROID && this.detachMenu) {
                const menus = this.player.getContainer().querySelectorAll('.op-settings');
                for (let i = 0, total = menus.length; i < total; ++i) {
                    menus[i].setAttribute('aria-hidden', 'true');
                }
                if (this.menu.getAttribute('aria-hidden') === 'false') {
                    this.menu.setAttribute('aria-hidden', 'true');
                }
            }
        };
        if (this.hasTracks) {
            const target = this.player.getContainer();
            target.insertBefore(this.captions, target.firstChild);
            this.player.getControls().getLayer(this.layer).appendChild(this.button);
            this.button.addEventListener('click', this.events.button.click, EVENT_OPTIONS);
        }
        if ((this.trackList.length <= 1 && !this.detachMenu) || (!this.trackList.length && this.detachMenu)) {
            return;
        }
        this.events.global.click = (e) => {
            const option = e.target;
            if (option.closest(`#${this.player.id}`) && hasClass(option, 'op-subtitles__option')) {
                const langEl = option.getAttribute('data-value');
                const language = langEl ? langEl.replace('captions-', '') : '';
                const currentLang = Array.from(this.trackList).filter(item => item.language === language);
                this.current = currentLang ? currentLang.pop() : undefined;
                if (this.detachMenu) {
                    if (hasClass(this.button, 'op-controls__captions--on')) {
                        this._hide();
                        this.button.classList.remove('op-controls__captions--on');
                        this.button.setAttribute('data-active-captions', 'off');
                    }
                    else {
                        this._show();
                        this.button.classList.add('op-controls__captions--on');
                        this.button.setAttribute('data-active-captions', language);
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
                    this.menu.setAttribute('aria-hidden', 'false');
                }
                else {
                    this._show();
                    this.button.setAttribute('data-active-captions', language);
                }
                const event = addEvent('captionschanged');
                this.player.getElement().dispatchEvent(event);
            }
        };
        if (this.detachMenu) {
            this.button.addEventListener('mouseover', this.events.button.mouseover, EVENT_OPTIONS);
            this.menu.addEventListener('mouseover', this.events.button.mouseover, EVENT_OPTIONS);
            this.menu.addEventListener('mouseout', this.events.button.mouseout, EVENT_OPTIONS);
            this.player.getElement().addEventListener('controlshidden', this.events.button.mouseout, EVENT_OPTIONS);
        }
        if (typeof this.events.global.click !== 'undefined') {
            document.addEventListener('click', this.events.global.click, EVENT_OPTIONS);
        }
    }
    destroy() {
        if (typeof this.events.global.click !== 'undefined') {
            document.removeEventListener('click', this.events.global.click);
        }
        if (this.hasTracks) {
            this.button.removeEventListener('click', this.events.button.click);
            if (this.detachMenu) {
                this.button.removeEventListener('mouseover', this.events.button.mouseover);
                this.menu.removeEventListener('mouseover', this.events.button.mouseover);
                this.menu.removeEventListener('mouseout', this.events.button.mouseout);
                this.player.getElement().removeEventListener('controlshidden', this.events.button.mouseout);
                removeElement(this.menu);
            }
            this.player.getElement().removeEventListener('timeupdate', this.events.media.timeupdate);
            removeElement(this.button);
            removeElement(this.captions);
        }
    }
    addSettings() {
        if (this.detachMenu || this.trackList.length <= 1) {
            return {};
        }
        const subitems = this._formatMenuItems();
        return subitems.length > 2 ? {
            className: 'op-subtitles__option',
            default: this.default || 'off',
            key: 'captions',
            name: this.labels.captions,
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
        if (!this.captions || !this.current || this.current.cues === undefined) {
            return;
        }
        const container = this.captions.querySelector('span');
        if (container) {
            container.innerHTML = '';
        }
        this.player.getElement().addEventListener('timeupdate', this.events.media.timeupdate, EVENT_OPTIONS);
    }
    _hide() {
        this.captions.classList.remove('op-captions--on');
        if (!this.current) {
            this.button.classList.remove('op-controls__captions--on');
            this.button.setAttribute('data-active-captions', 'off');
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
        this.trackUrlList[language] = trackUrl;
        this.trackList[index].mode = 'disabled';
        if (showTrack) {
            this.default = language;
            this.button.classList.add('op-controls__captions--on');
            this.button.setAttribute('data-active-captions', language);
            this.current = Array.from(this.trackList)
                .filter(item => item.language === this.default).pop();
            this._show();
            if (!this.player.getContainer().classList.contains('op-captions--detected')) {
                this.player.getContainer().classList.add('op-captions--detected');
            }
        }
    }
    _formatMenuItems() {
        let items = [{ key: 'off', label: this.labels.off }];
        for (let i = 0, total = this.trackList.length; i < total; i++) {
            const track = this.trackList[i];
            items = items.filter(el => el.key !== track.language);
            items.push({ key: track.language, label: this.labels.lang[track.language] || this.trackList[i].label });
        }
        return items;
    }
}
export default Captions;

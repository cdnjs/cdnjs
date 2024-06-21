/*!
 * version: 1.1.0
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.tgadhub = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */


    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    const idPrefix = 'tg-ads-mediation--ads__';
    const adContainerId = idPrefix + 'ad-';

    function calcScreenDpi() {
        const element = document.createElement('div');
        element.style.width = '1in';
        document.body.appendChild(element);
        const dpi = element.offsetWidth * devicePixelRatio;
        element.remove();
        return dpi;
    }
    function generateStubId() {
        return 1110000000000 + Math.floor(Math.random() * 9000000000) + 1000000000;
    }
    const initDataKey = idPrefix + 'init-data';
    const generatedIdKey = idPrefix + 'generated-id';
    function getUserData() {
        var _a, _b, _c, _d, _e, _f;
        let data = null;
        let generatedId = localStorage.getItem(generatedIdKey);
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if ((_c = (_b = (_a = window.Telegram) === null || _a === void 0 ? void 0 : _a.WebApp) === null || _b === void 0 ? void 0 : _b.initDataUnsafe) === null || _c === void 0 ? void 0 : _c.user) {
            const { user } = window.Telegram.WebApp.initDataUnsafe;
            data = {
                addedToAttachmentMenu: user.added_to_attachment_menu,
                allowsWriteToPm: user.allows_write_to_pm,
                firstName: user.first_name,
                id: user.id,
                isBot: user.is_bot,
                isPremium: user.is_premium,
                lastName: user.last_name,
                languageCode: user.language_code,
                photoUrl: user.photo_url,
                username: user.username,
                timeZone,
                generatedId: Number(generatedId)
            };
        }
        else if ((_f = (_e = (_d = window.tmajsLaunchData) === null || _d === void 0 ? void 0 : _d.launchParams) === null || _e === void 0 ? void 0 : _e.initData) === null || _f === void 0 ? void 0 : _f.user) {
            data = Object.assign(Object.assign({}, window.tmajsLaunchData.launchParams.initData.user), { timeZone, generatedId: Number(generatedId) });
        }
        else {
            const storedData = localStorage.getItem(initDataKey);
            if (storedData != null) {
                data = JSON.parse(storedData);
            }
            else {
                if (generatedId == null) {
                    generatedId = String(generateStubId());
                    localStorage.setItem(generatedIdKey, generatedId);
                }
                data = {
                    firstName: 'Unknown',
                    id: Number(generatedId),
                    languageCode: navigator.language,
                    timeZone
                };
            }
        }
        localStorage.setItem(initDataKey, JSON.stringify(data));
        return data;
    }
    function getThemeParams() {
        var _a, _b, _c, _d;
        if ((_b = (_a = window.Telegram) === null || _a === void 0 ? void 0 : _a.WebApp) === null || _b === void 0 ? void 0 : _b.themeParams) {
            const { themeParams } = window.Telegram.WebApp;
            return {
                accentTextColor: themeParams.accent_text_color,
                backgroundColor: themeParams.bg_color,
                buttonColor: themeParams.button_color,
                buttonTextColor: themeParams.button_text_color,
                destructiveTextColor: themeParams.destructive_text_color,
                headerBackgroundColor: themeParams.header_bg_color,
                hintColor: themeParams.hint_color,
                linkColor: themeParams.link_color,
                secondaryBackgroundColor: themeParams.secondary_bg_color,
                sectionBackgroundColor: themeParams.section_bg_color,
                sectionHeaderTextColor: themeParams.section_header_text_color,
                subtitleTextColor: themeParams.subtitle_text_color,
                textColor: themeParams.text_color
            };
        }
        if ((_d = (_c = window.tmajsLaunchData) === null || _c === void 0 ? void 0 : _c.launchParams) === null || _d === void 0 ? void 0 : _d.themeParams) {
            return window.tmajsLaunchData.launchParams.themeParams;
        }
        return {
            accentTextColor: '#168dcd',
            backgroundColor: '#ffffff',
            buttonColor: '#40a7e3',
            buttonTextColor: '#ffffff',
            destructiveTextColor: '#d14e4e',
            headerBackgroundColor: '#ffffff',
            hintColor: '#999999',
            linkColor: '#168dcd',
            secondaryBackgroundColor: '#f1f1f1',
            sectionBackgroundColor: '#ffffff',
            sectionHeaderTextColor: '#168dcd',
            subtitleTextColor: '#999999',
            textColor: '#000000'
        };
    }

    class Ads {
        constructor(params) {
            this.visibleAds = {};
            this.subscribers = {};
            const { key, test: testParams } = params;
            const test = typeof testParams === 'object' ? testParams.enabled : testParams;
            const user = getUserData();
            const theme = getThemeParams();
            this.publisherKey = key;
            this.device = {
                ua: navigator.userAgent,
                pxratio: window.devicePixelRatio,
                ppi: calcScreenDpi(),
                w: screen.width,
                h: screen.height,
                language: user.languageCode || navigator.language
            };
            this.user = {
                id: String(user.id)
            };
            this.sspUrl = test
                ? test === true
                    ? 'https://ssp-test.tgadhub.com'
                    : test
                : 'https://ssp.tgadhub.com';
            this.apiVersion = 1;
            this.miniAppData = {
                user,
                theme
            };
            this.showAdStubs = test && typeof testParams === 'object' && testParams.stubs ? true : false;
            this.onPostMessage = (event) => {
                this.handlePostMessage(event);
            };
            window.addEventListener('message', this.onPostMessage);
        }
        showRewardedVideo(listeners) {
            return this.show('video', listeners);
        }
        showBottomBanner(listeners) {
            return this.show('banner', listeners);
        }
        closeRewardedVideo() {
            this.close('video');
        }
        closeBottomBanner() {
            this.close('banner');
        }
        closeAll() {
            this.close('video');
            this.close('banner');
        }
        destroy() {
            window.removeEventListener('message', this.onPostMessage);
            this.onPostMessage = () => { };
            this.subscribers = {};
        }
        show(type = 'video', listeners) {
            return __awaiter(this, void 0, void 0, function* () {
                const noop = () => { };
                const { onNotFound = noop, onOpen = noop, onReward = noop, onClose = noop, onError = noop } = listeners || {};
                try {
                    this.close(type);
                    const placement = {
                        width: window.innerWidth,
                        height: type === 'video' ? window.innerHeight : 100
                    };
                    const requestBody = {
                        adType: type,
                        publisherKey: this.publisherKey,
                        device: this.device,
                        user: this.user,
                        placement,
                        miniAppData: this.miniAppData
                    };
                    if (this.showAdStubs) {
                        requestBody.stubAds = true;
                    }
                    const response = yield fetch(`${this.sspUrl}/api/v${this.apiVersion}/ad`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    });
                    if (response.status !== 200) {
                        onNotFound();
                        return false;
                    }
                    const adResponse = yield response.json();
                    const iframe = this.createPlacement(adResponse);
                    iframe.srcdoc = adResponse.ad.markup;
                    document.body.appendChild(iframe);
                    this.visibleAds[type] = adResponse.id;
                    onOpen();
                    this.subscribers[adResponse.id] = { onReward, onClose };
                    return true;
                }
                catch (error) {
                    onError(error);
                    return false;
                }
            });
        }
        close(idOrType) {
            var _a;
            const adId = ['video', 'banner'].includes(idOrType)
                ? this.visibleAds[idOrType]
                : idOrType;
            if (!adId) {
                return;
            }
            const subscriber = this.subscribers[adId];
            if (subscriber == null) {
                return;
            }
            (_a = document.getElementById(adContainerId + adId)) === null || _a === void 0 ? void 0 : _a.remove();
            subscriber.onClose();
            delete this.subscribers[adId];
            if (this.visibleAds.video === adId) {
                delete this.visibleAds.video;
            }
            else if (this.visibleAds.banner === adId) {
                delete this.visibleAds.banner;
            }
        }
        createPlacement(ad) {
            const iframe = document.createElement('iframe');
            iframe.id = adContainerId + ad.id;
            iframe.style.position = 'fixed';
            iframe.style.width = '100%';
            iframe.style.zIndex = '9999';
            iframe.style.backgroundColor = 'white';
            iframe.style.border = 'none';
            if (ad.type === 'video') {
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.height = '100%';
            }
            else {
                iframe.style.bottom = '0';
                iframe.style.left = '0';
                iframe.style.height = '100px';
                if (ad.ad.size && ad.ad.size.width && ad.ad.size.height) {
                    iframe.style.width = `${ad.ad.size.width}px`;
                    iframe.style.height = `${ad.ad.size.height}px`;
                    iframe.style.left = '50%';
                    iframe.style.transform = 'translateX(-50%)';
                }
            }
            return iframe;
        }
        handlePostMessage(event) {
            var _a;
            if (event.origin !== window.location.origin || event.data == null) {
                return;
            }
            const data = event.data;
            const subscriber = this.subscribers[data.adId];
            if (subscriber == null) {
                return;
            }
            if (data.event === 'openAdLink' && data.link) {
                (_a = window.TelegramWebviewProxy) === null || _a === void 0 ? void 0 : _a.postEvent('web_app_open_link', JSON.stringify({
                    url: data.link
                }));
            }
            else if (data.event === 'reward') {
                subscriber.onReward();
            }
            else if (data.event === 'close') {
                this.close(data.adId);
            }
        }
    }

    exports.Ads = Ads;

}));
//# sourceMappingURL=ads.js.map

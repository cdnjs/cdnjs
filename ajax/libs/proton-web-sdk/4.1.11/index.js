/**
 * Proton Web SDK v4.1.11
 * undefined
 *
 * @license
 * MIT License
 * 
 * Copyright (c) 2020 jafri
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import ProtonLinkBrowserTransport from '@proton/browser-transport';
import ProtonLink from '@proton/link';
import { JsonRpc } from '@proton/js';

var getStyleText = (customStyleOptions) => {
    const defaultOptions = {
        modalBackgroundColor: '#ffffff',
        logoBackgroundColor: 'transparent',
        isLogoRound: false,
        optionBackgroundColor: 'transparent',
        optionFontColor: '#000531',
        primaryFontColor: 'black',
        secondaryFontColor: '#a1a5b0',
        linkColor: '#00AAEF',
    };
    const { modalBackgroundColor, logoBackgroundColor, isLogoRound, optionBackgroundColor, optionFontColor, primaryFontColor, secondaryFontColor, linkColor, } = Object.assign(defaultOptions, customStyleOptions);
    return `
    .wallet-selector * {
        box-sizing: border-box;
        line-height: 1;
    }

    .wallet-selector {
        font-family: 'Circular Std Book', -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
            Arial, sans-serif;
        font-size: 13px;
        background: rgba(0, 0, 0, 0.65);
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 2147483647;
        display: none;
        align-items: center;
        justify-content: center;
    }

    .wallet-selector-active {
        display: flex;
        flex-direction: column;
    }

    .wallet-selector-inner {
        background: ${modalBackgroundColor};
        color: white;
        margin: 20px 20px 13px 20px;
        padding-top: 50px;
        border-radius: 10px;
        box-shadow: 0px -10px 50px rgba(0, 0, 0, .5) !important;
        width: 360px;
        transition-property: all;
        transition-duration: .5s;
        transition-timing-function: ease-in-out;
        position: relative;
    }

    .wallet-selector-close {
        display: block;
        position: absolute;
        top: 16px;
        right: 16px;
        width: 28px;
        height: 28px;
        background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.66 10.987L6 7.327l-3.66 3.66A1.035 1.035 0 11.876 9.523l3.66-3.66-3.66-3.66A1.035 1.035 0 012.34.737L6 4.398 9.66.739a1.035 1.035 0 111.464 1.464l-3.66 3.66 3.66 3.661a1.035 1.035 0 11-1.464 1.464z' fill='rgba(161, 165, 176, 0.7)' fill-rule='nonzero'/%3E%3C/svg%3E");
        background-size: 14px;
        background-repeat: no-repeat;
        background-position: 50%;
        cursor: pointer;
        transition: background-image 0.2s ease;
    }

    .wallet-selector-close:hover {
        background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.66 10.987L6 7.327l-3.66 3.66A1.035 1.035 0 11.876 9.523l3.66-3.66-3.66-3.66A1.035 1.035 0 012.34.737L6 4.398 9.66.739a1.035 1.035 0 111.464 1.464l-3.66 3.66 3.66 3.661a1.035 1.035 0 11-1.464 1.464z' fill='rgba(161, 165, 176, 1)' fill-rule='nonzero'/%3E%3C/svg%3E");
        transition: background-image 0.2s ease;
    }

    .wallet-selector-connect {
        padding: 0px 20px;
        border-radius: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        background: ${modalBackgroundColor};
    }

    .wallet-selector-connect-header {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .wallet-selector-logo {
        width: 100px;
        height: 100px;
        background: ${logoBackgroundColor};
        ${isLogoRound && `
        width: 120px;
        height: 120px;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid rgba(161, 165, 176, 0.23);
        border-radius: 50%;
        `}
    }

    .wallet-selector-title {
        font-size: 16px;
        font-family: 'Circular Std Book', sans-serif;
        line-height: 24px;
        color: ${primaryFontColor};
        text-align: center;
    }

    .wallet-selector-subtitle {
        font-size: 16px;
        font-family: 'Circular Std Book', sans-serif;
        line-height: 24px;
        color: ${secondaryFontColor};
        text-align: center;
    }

    .wallet-selector-connect-body {
        margin-top: 55px;
    }

    .wallet-selector-wallet-list {
        margin: 0px;
        padding: 0px;
        list-style: none;
    }

    .wallet-selector-wallet-list li {
        background: ${optionBackgroundColor};
    }

    .wallet-selector-proton-wallet, .wallet-selector-webauth-wallet, .wallet-selector-anchor-wallet {
        display: flex;
        align-items: center;
        padding: 20px 20px 20px 16px;
        border: 1px solid rgba(161, 165, 176, 0.23);
    }

    .wallet-selector-webauth-wallet, .wallet-selector-anchor-wallet {
        margin-top: 8px;
    }

    .wallet-selector-proton-wallet:hover, .wallet-selector-webauth-wallet:hover, .wallet-selector-anchor-wallet:hover {
        cursor: pointer;
    }

    .wallet-selector-proton-logo {
        background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='mobile-android-alt' style='color: %23752EEB;' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='currentColor' d='M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-64 452c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v8zm64-80c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z'%3E%3C/path%3E%3C/svg%3E");    }

    .wallet-selector-webauth-logo {
        background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='browser' style='color: %23752EEB;' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='currentColor' d='M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM48 92c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V92zm416 334c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V168h416v258zm0-310c0 6.6-5.4 12-12 12H172c-6.6 0-12-5.4-12-12V92c0-6.6 5.4-12 12-12h280c6.6 0 12 5.4 12 12v24z'%3E%3C/path%3E%3C/svg%3E");    }

    .wallet-selector-anchor-logo {
        background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='desktop' style='color: %23752EEB;' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='currentColor' d='M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z'%3E%3C/path%3E%3C/svg%3E");
    }

    .wallet-selector-anchor-logo {
        width: 40px;
        height: 40px;
        background-size: 30px;
        background-repeat: no-repeat;
        background-position: 50%;
    }

    .wallet-selector-proton-logo {
        width: 40px;
        height: 40px;
        background-size: 20px;
        background-repeat: no-repeat;
        background-position: 50%;
    }

    .wallet-selector-webauth-logo {
        width: 40px;
        height: 40px;
        background-size: 30px;
        background-repeat: no-repeat;
        background-position: 50%;
    }

    .wallet-selector-wallet-name {
        font-family: 'Circular Std Book', sans-serif;
        font-size: 16px;
        line-height: 24px;
        color: ${optionFontColor};
        margin-left: 20px;
    }

    .wallet-selector-right-arrow {
        background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='rgba(161, 165, 176, 0.7)' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E");
        width: 10px;
        height: 20px;
        background-size: 10px;
        background-repeat: no-repeat;
        background-position: 50%;
        margin-left: auto;
    }

    .wallet-selector-proton-wallet:hover .wallet-selector-right-arrow {
        background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='rgba(161, 165, 176, 1)' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E");
    }

    .wallet-selector-webauth-wallet:hover .wallet-selector-right-arrow {
        background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='rgba(161, 165, 176, 1)' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E");
    }

    .wallet-selector-anchor-wallet:hover .wallet-selector-right-arrow {
        background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='rgba(161, 165, 176, 1)' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E");
    }

    .wallet-selector-tos-agreement {
        font-family: 'Circular Std Book', sans-serif;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        margin-top: 55px;
        margin-bottom: 30px;
        color: ${secondaryFontColor};
    }

    .wallet-selector-tos-link {
        color: ${linkColor};
        text-decoration: none;
    }

    .wallet-selector-footnote {
        font-family: 'Circular Std Book', sans-serif;
        font-size: 16px;
        text-align: center;
        width: 100%;
        bottom: -30px;
        left: 0;
        color: white !important;
    }
    
    .wallet-selector-footnote a {
        color: #ffffff !important;
    }
    `;
};

class WalletTypeSelector {
    constructor(name, logo, customStyleOptions) {
        this.name = name;
        this.appLogo = logo;
        this.appName = name || 'app';
        this.customStyleOptions = customStyleOptions;
    }
    hideSelector() {
        if (this.selectorContainerEl) {
            this.selectorContainerEl.classList.remove(`wallet-selector-active`);
        }
    }
    showSelector() {
        if (this.selectorContainerEl) {
            this.selectorContainerEl.classList.add(`wallet-selector-active`);
        }
    }
    setUpSelectorContainer(reject) {
        this.font = document.createElement('link');
        this.font.href = 'https://fonts.cdnfonts.com/css/circular-std-book';
        this.font.rel = 'stylesheet';
        this.styleEl = document.createElement('style');
        this.styleEl.type = 'text/css';
        const styleText = getStyleText(this.customStyleOptions);
        this.styleEl.appendChild(document.createTextNode(styleText));
        this.styleEl.appendChild(this.font);
        document.head.appendChild(this.styleEl);
        if (!this.selectorContainerEl) {
            this.clearDuplicateContainers();
            this.selectorContainerEl = this.createEl();
            this.selectorContainerEl.className = 'wallet-selector';
            this.selectorContainerEl.onclick = (event) => {
                if (event.target === this.selectorContainerEl) {
                    event.stopPropagation();
                    this.hideSelector();
                    reject('no wallet selected');
                }
            };
            document.body.appendChild(this.selectorContainerEl);
        }
        if (!this.selectorEl) {
            let wrapper = this.createEl({ class: 'inner' });
            let closeButton = this.createEl({ class: 'close' });
            closeButton.onclick = (event) => {
                event.stopPropagation();
                this.hideSelector();
                reject('no wallet selected');
            };
            this.selectorEl = this.createEl({ class: 'connect' });
            wrapper.appendChild(this.selectorEl);
            wrapper.appendChild(closeButton);
            this.selectorContainerEl.appendChild(wrapper);
        }
    }
    clearDuplicateContainers() {
        const elements = document.getElementsByClassName('wallet-selector');
        while (elements.length > 0) {
            elements[0].remove();
        }
    }
    createEl(attrs) {
        if (!attrs)
            attrs = {};
        const el = document.createElement(attrs.tag || 'div');
        if (attrs) {
            for (const attr of Object.keys(attrs)) {
                const value = attrs[attr];
                switch (attr) {
                    case 'src':
                        el.setAttribute(attr, value);
                        break;
                    case 'tag':
                        break;
                    case 'text':
                        el.appendChild(document.createTextNode(value));
                        break;
                    case 'class':
                        el.className = `wallet-selector-${value}`;
                        break;
                    default:
                        el.setAttribute(attr, value);
                }
            }
        }
        return el;
    }
    /**
     * Only Proton and Anchor are available
     */
    displayWalletSelector(enabledWalletTypes) {
        return new Promise((resolve, reject) => {
            this.setUpSelectorContainer(reject);
            const header = this.createEl({ class: 'connect-header' });
            const body = this.createEl({ class: 'connect-body' });
            if (this.appLogo) {
                const logoEl = this.createEl({
                    class: 'logo',
                    tag: 'img',
                    src: this.appLogo,
                    alt: 'app-logo',
                });
                header.appendChild(logoEl);
            }
            const title = 'Connect Wallet';
            const subtitle = `To start using ${this.appName}`;
            const titleEl = this.createEl({ class: 'title', tag: 'span', text: title });
            const subtitleEl = this.createEl({ class: 'subtitle', tag: 'span', text: subtitle });
            const walletList = this.createEl({ class: 'wallet-list', tag: 'ul' });
            const eventGenerator = (walletName) => (event) => {
                event.stopPropagation();
                this.hideSelector();
                resolve(walletName);
            };
            for (const { key, value } of enabledWalletTypes) {
                const wallet = this.createEl({ class: `${key}-wallet`, tag: 'li' });
                wallet.onclick = eventGenerator(key);
                const logo = this.createEl({ class: `${key}-logo` });
                const name = this.createEl({ class: 'wallet-name', tag: 'span', text: value });
                const rightArrow = this.createEl({ class: 'right-arrow' });
                wallet.appendChild(logo);
                wallet.appendChild(name);
                wallet.appendChild(rightArrow);
                walletList.appendChild(wallet);
            }
            const tosLinkEl = this.createEl({
                class: 'tos-link',
                tag: 'a',
                text: `Terms of Service`,
                href: 'https://protonchain.com/terms',
                target: '_blank',
            });
            const tosAgreementEl = this.createEl({
                class: 'tos-agreement',
                tag: 'p',
                text: `By connecting, I accept Proton's `,
            });
            tosAgreementEl.appendChild(tosLinkEl);
            header.appendChild(titleEl);
            header.appendChild(subtitleEl);
            body.appendChild(walletList);
            body.appendChild(tosAgreementEl);
            const footnoteEl = this.createEl({ class: 'footnote', text: `Don't have a wallet? ` });
            const footnoteLink = this.createEl({
                tag: 'a',
                target: '_blank',
                href: 'https://protonchain.com/wallet',
                text: 'Download it here',
            });
            footnoteEl.appendChild(footnoteLink);
            emptyElement(this.selectorEl);
            this.selectorEl.appendChild(header);
            this.selectorEl.appendChild(body);
            this.selectorContainerEl.appendChild(footnoteEl);
            this.showSelector();
        });
    }
}
function emptyElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

const OPEN_SETTINGS = 'menubar=1,resizable=1,width=400,height=600';
class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.reject = reject;
            this.resolve = resolve;
        });
    }
}
class ProtonWebLink {
    constructor(options) {
        this.childWindow = null;
        this.scheme = options.scheme;
        this.storage = options.storage;
        this.testUrl = options.testUrl;
        setInterval(() => this.closeChild(), 500);
        window.addEventListener('message', (event) => this.onEvent(event), false);
    }
    childUrl(path) {
        const base = this.testUrl
            ? this.testUrl
            : this.scheme === 'proton'
                ? 'https://webauth.com'
                : 'https://testnet.webauth.com';
        return `${base}${path}`;
    }
    closeChild(force = false) {
        if (this.childWindow) {
            if (force) {
                this.childWindow.close();
            }
            if (force || this.childWindow.closed) {
                this.childWindow = null;
            }
        }
    }
    createSession(auth) {
        return {
            auth,
            transact: (args, options) => {
                if (this.deferredLogin) {
                    this.closeChild(true);
                    this.deferredLogin.reject('Trying to login');
                    this.deferredLogin = undefined;
                }
                this.deferredTransact = {
                    deferral: new Deferred(),
                    transaction: args.transaction || { actions: args.actions },
                    params: options,
                    waitingForOpen: true
                };
                this.childWindow = window.open(this.childUrl('/auth'), '_blank', OPEN_SETTINGS);
                try {
                    return this.deferredTransact.deferral.promise;
                }
                catch (e) {
                    console.error(e);
                    throw e;
                }
            },
            link: {
                walletType: 'webauth'
            }
        };
    }
    async login() {
        if (this.deferredTransact) {
            this.closeChild(true);
            this.deferredTransact.deferral.reject('Trying to login');
            this.deferredTransact = undefined;
        }
        this.childWindow = window.open(this.childUrl('/login'), '_blank', OPEN_SETTINGS);
        this.deferredLogin = new Deferred();
        try {
            this.storage.write('wallet-type', 'webauth');
            const auth = await this.deferredLogin.promise;
            return {
                session: this.createSession(auth)
            };
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    async restoreSession(/* requestAccount */ _, auth) {
        return this.createSession(auth);
    }
    async removeSession(appIdentifier, auth, chainId) {
        if (!this.storage) {
            throw new Error('Unable to remove session: No storage adapter configured');
        }
        if (await this.storage.read('wallet-type')) {
            this.storage.remove('wallet-type');
        }
        if (await this.storage.read('user-auth')) {
            this.storage.remove('user-auth');
        }
        return {
            appIdentifier,
            auth,
            chainId
        };
    }
    async onEvent(e) {
        if (e.origin.indexOf('https://webauth.com') !== -1 &&
            e.origin.indexOf('https://testnet.webauth.com') !== -1) {
            return;
        }
        let eventData;
        try {
            eventData = JSON.parse(e.data);
        }
        catch (e) {
            return;
        }
        try {
            const { type, data, error } = eventData;
            if (!type) {
                return;
            }
            // Ready to receive transaction
            if (type === 'isReady') {
                if (this.deferredTransact && this.deferredTransact.waitingForOpen) {
                    this.deferredTransact.waitingForOpen = false;
                    this.childWindow.postMessage(JSON.stringify({
                        type: 'transaction',
                        data: {
                            transaction: this.deferredTransact.transaction,
                            params: this.deferredTransact.params
                        }
                    }), '*');
                }
            }
            // Close child
            else if (type === 'close') {
                this.closeChild(true);
                if (this.deferredTransact) {
                    this.deferredTransact.deferral.reject('Closed');
                }
                else if (this.deferredLogin) {
                    this.deferredLogin.reject('Closed');
                }
            }
            // TX Success
            else if (type === 'transactionSuccess') {
                this.closeChild(true);
                if (this.deferredTransact) {
                    if (error) {
                        this.deferredTransact.deferral.reject(error && error.json ? error.json : error);
                    }
                    else {
                        this.deferredTransact.deferral.resolve(data);
                    }
                    this.deferredTransact = undefined;
                }
            }
            // Login success
            else if (type === 'loginSuccess') {
                this.closeChild(true);
                if (this.deferredLogin) {
                    this.deferredLogin.resolve(data);
                    this.deferredLogin = undefined;
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    }
}

class Storage {
    constructor(keyPrefix) {
        this.keyPrefix = keyPrefix;
    }
    async write(key, data) {
        localStorage.setItem(this.storageKey(key), data);
    }
    async read(key) {
        return localStorage.getItem(this.storageKey(key));
    }
    async remove(key) {
        localStorage.removeItem(this.storageKey(key));
    }
    storageKey(key) {
        return `${this.keyPrefix}-${key}`;
    }
}

const WALLET_TYPES = [
    { key: 'proton', value: 'Mobile' },
    { key: 'webauth', value: 'Browser' },
    { key: 'anchor', value: 'Desktop' },
];

const ConnectWallet = async ({ linkOptions, transportOptions = {}, selectorOptions = {} }) => {
    // Add RPC
    const rpc = new JsonRpc(linkOptions.endpoints);
    linkOptions.client = rpc;
    // Add Chain ID
    if (!linkOptions.chainId) {
        const info = await rpc.get_info();
        linkOptions.chainId = info.chain_id;
    }
    // Add storage
    if (!linkOptions.storage) {
        linkOptions.storage = new Storage(linkOptions.storagePrefix || 'proton-storage');
    }
    return login(selectorOptions, linkOptions, transportOptions);
};
const login = async (selectorOptions, linkOptions, transportOptions) => {
    // Initialize link and session
    let session;
    let link;
    let loginResult;
    // Create Modal Class
    const wallets = new WalletTypeSelector(selectorOptions.appName, selectorOptions.appLogo, selectorOptions.customStyleOptions);
    // Determine wallet type from storage or selector modal
    let walletType = selectorOptions.walletType;
    if (!walletType) {
        if (linkOptions.restoreSession) {
            walletType = await linkOptions.storage.read('wallet-type');
        }
        else {
            const enabledWalletTypes = selectorOptions.enabledWalletTypes
                ? WALLET_TYPES.filter(wallet => selectorOptions.enabledWalletTypes && selectorOptions.enabledWalletTypes.includes(wallet.key))
                : WALLET_TYPES;
            try {
                walletType = await wallets.displayWalletSelector(enabledWalletTypes);
            }
            catch (e) {
                return {
                    error: e
                };
            }
        }
    }
    if (!walletType) {
        return {
            error: new Error('Wallet Type Unavailable: No wallet provided')
        };
    }
    // Determine chain
    let chain = 'proton';
    if (linkOptions.chainId === '71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd') {
        chain = 'proton-test';
    }
    // Set scheme
    let scheme = 'proton';
    if (walletType === 'anchor') {
        scheme = 'esr';
    }
    else if (chain === 'proton-test') {
        scheme = 'proton-dev';
    }
    const options = {
        ...linkOptions,
        scheme,
        transport: new ProtonLinkBrowserTransport({
            ...transportOptions,
            walletType
        }),
        walletType,
        chains: []
    };
    // Create link
    if (walletType === 'webauth') {
        link = new ProtonWebLink(options);
    }
    else {
        link = new ProtonLink(options);
    }
    // Session from login
    if (!linkOptions.restoreSession) {
        let backToSelector = false;
        document.addEventListener('backToSelector', () => { backToSelector = true; });
        try {
            loginResult = await link.login(transportOptions.requestAccount || '');
            session = loginResult.session;
            const stringAuth = JSON.stringify({
                actor: loginResult.session.auth.actor.toString(),
                permission: loginResult.session.auth.permission.toString(),
            });
            linkOptions.storage.write('user-auth', stringAuth);
        }
        catch (e) {
            console.error('restoreSession Error:');
            console.error(e);
            if (backToSelector) {
                document.removeEventListener('backToSelector', () => { backToSelector = true; });
                return login(selectorOptions, linkOptions, transportOptions);
            }
            else {
                return {
                    error: e
                };
            }
        }
        // Session from restore
    }
    else {
        const stringifiedUserAuth = await linkOptions.storage.read('user-auth');
        const parsedUserAuth = stringifiedUserAuth ? JSON.parse(stringifiedUserAuth) : {};
        const savedUserAuth = Object.keys(parsedUserAuth).length > 0 ? parsedUserAuth : null;
        if (savedUserAuth) {
            session = await link.restoreSession(transportOptions.requestAccount || '', savedUserAuth);
            // Could not restore
            if (!session) {
                // clean storage to remove unexpected side effects if session restore fails
                linkOptions.storage.remove('wallet-type');
                linkOptions.storage.remove('user-auth');
                return {
                    link: undefined,
                    session: undefined,
                    loginResult: undefined,
                };
            }
        }
    }
    if (session && session.auth) {
        session.auth = {
            actor: session.auth.actor.toString(),
            permission: session.auth.permission.toString(),
        };
        session.publicKey = session.publicKey ? session.publicKey.toString() : undefined;
    }
    return {
        session,
        link,
        loginResult
    };
};

export { ConnectWallet as default };
//# sourceMappingURL=index.js.map

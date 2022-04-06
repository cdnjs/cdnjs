import Mmenu from './../oncanvas/mmenu.oncanvas';
import OPTIONS from './options';
import CONFIGS from './configs';
import * as DOM from '../../_modules/dom';
import { extend, uniqueId, cloneId, originalId, } from '../../_modules/helpers';
export default function () {
    this.opts.offCanvas = this.opts.offCanvas || {};
    this.conf.offCanvas = this.conf.offCanvas || {};
    //	Extend options.
    const options = extend(this.opts.offCanvas, OPTIONS);
    const configs = extend(this.conf.offCanvas, CONFIGS);
    if (!options.use) {
        return;
    }
    const positions = [
        'left',
        'left-front',
        'right',
        'right-front',
        'top',
        'bottom'
    ];
    if (!positions.includes(options.position)) {
        options.position = positions[0];
    }
    //	Add methods to the API.
    this._api.push('open', 'close', 'setPage');
    //  Clone menu and prepend it to the <body>.
    this.bind('initMenu:before', () => {
        //	Clone if needed.
        if (configs.clone) {
            //	Clone the original menu and store it.
            this.node.menu = this.node.menu.cloneNode(true);
            //	Prefix all ID's in the cloned menu.
            if (this.node.menu.id) {
                this.node.menu.id = cloneId(this.node.menu.id);
            }
            DOM.find(this.node.menu, '[id]').forEach((elem) => {
                elem.id = cloneId(elem.id);
            });
        }
        this.node.wrpr = document.querySelector(configs.menu.insertSelector);
        this.node.wrpr.classList.add(`mm-wrapper--position-${options.position}`);
        //	Prepend to the <body>
        this.node.wrpr[configs.menu.insertMethod](this.node.menu);
    });
    //	Setup the UI blocker.
    if (!Mmenu.node.blck) {
        this.bind('initMenu:before', () => {
            /** The UI blocker node. */
            const blocker = DOM.create('a.mm-wrapper__blocker.mm-blocker.mm-slideout');
            blocker.id = uniqueId();
            blocker.title = this.i18n(configs.screenReader.closeMenu);
            //  Make the blocker able to receive focus.
            blocker.tabIndex = 0;
            //	Append the blocker node to the body.
            document.querySelector(configs.menu.insertSelector).append(blocker);
            //	Store the blocker node.
            Mmenu.node.blck = blocker;
        });
    }
    this.bind('initMenu:after', () => {
        //	Setup the page.
        this.setPage(Mmenu.node.page);
        //	Setup the menu.
        this.node.menu.classList.add('mm-menu--offcanvas', `mm-menu--position-${options.position}`);
        //	Open if url hash equals menu id (usefull when user clicks the hamburger icon before the menu is created)
        let hash = window.location.hash;
        if (hash) {
            let id = originalId(this.node.menu.id);
            if (id && id == hash.slice(1)) {
                setTimeout(() => {
                    this.open();
                }, 1000);
            }
        }
    });
    //	Open / close the menu.
    document.addEventListener('click', event => {
        var _a;
        /** THe href attribute for the clicked anchor. */
        const href = (_a = event.target.closest('a')) === null || _a === void 0 ? void 0 : _a.getAttribute('href');
        switch (href) {
            //	Open menu if the clicked anchor links to the menu.
            case `#${originalId(this.node.menu.id)}`:
                event.preventDefault();
                this.open();
                break;
            //	Close menu if the clicked anchor links to the page.
            case `#${originalId(Mmenu.node.page.id)}`:
                event.preventDefault();
                this.close();
                break;
        }
    });
    //	Close the menu with ESC key.
    document.addEventListener('keyup', (event) => {
        if (event.key == 'Escape') {
            this.close();
        }
    });
    // Tabbing
    document.addEventListener('focusin', (event) => {
        var _a, _b;
        // Focus inside the menu -> open the menu
        if (((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.closest(`#${this.node.menu.id}`)) &&
            !this.node.menu.matches('.mm-menu--opened')) {
            this.open();
        }
        // Focus outside the menu -> close menu
        if (!((_b = document.activeElement) === null || _b === void 0 ? void 0 : _b.closest(`#${this.node.menu.id}`)) &&
            !this.node.wrpr.matches('.mm-wrapper--sidebar-expanded') &&
            this.node.menu.matches('.mm-menu--opened')) {
            this.close();
        }
    });
}
/**
 * Open the menu.
 */
Mmenu.prototype.open = function () {
    if (this.node.menu.matches('.mm-menu--opened')) {
        return;
    }
    //	Invoke "before" hook.
    this.trigger('open:before');
    //	Open
    this.node.menu.classList.add('mm-menu--opened');
    this.node.wrpr.classList.add('mm-wrapper--opened');
    Mmenu.node.blck.classList.add('mm-blocker--blocking');
    //  Focus the menu.
    this.node.open = document.activeElement;
    this.node.menu.focus();
    //	Invoke "after" hook.
    this.trigger('open:after');
};
Mmenu.prototype.close = function () {
    var _a;
    if (!this.node.menu.matches('.mm-menu--opened')) {
        return;
    }
    //	Invoke "before" hook.
    this.trigger('close:before');
    this.node.menu.classList.remove('mm-menu--opened');
    this.node.wrpr.classList.remove('mm-wrapper--opened');
    Mmenu.node.blck.classList.remove('mm-blocker--blocking');
    //  Focus opening link or page.
    const focus = this.node.open || document.querySelector(`[href="#${this.node.menu.id}"]`) || Mmenu.node.page || null;
    (_a = focus) === null || _a === void 0 ? void 0 : _a.focus();
    // Prevent html/body from scrolling due to focus.
    document.body.scrollLeft = 0;
    document.documentElement.scrollLeft = 0;
    //	Invoke "after" hook.
    this.trigger('close:after');
};
/**
 * Set the "page" node.
 *
 * @param {HTMLElement} page Element to set as the page.
 */
Mmenu.prototype.setPage = function (page) {
    var configs = this.conf.offCanvas;
    //	If no page was specified, find it.
    if (!page) {
        /** Array of elements that are / could be "the page". */
        let pages = typeof configs.page.selector == 'string'
            ? DOM.find(document.body, configs.page.selector)
            : DOM.children(document.body, configs.page.nodetype);
        //	Filter out elements that are absolutely not "the page".
        pages = pages.filter((page) => !page.matches('.mm-menu, .mm-wrapper__blocker'));
        //	Filter out elements that are configured to not be "the page".
        if (configs.page.noSelector.length) {
            pages = pages.filter((page) => !page.matches(configs.page.noSelector.join(', ')));
        }
        //	Wrap multiple pages in a single element.
        if (pages.length > 1) {
            let wrapper = DOM.create('div');
            pages[0].before(wrapper);
            pages.forEach((page) => {
                wrapper.append(page);
            });
            pages = [wrapper];
        }
        page = pages[0];
    }
    //	Invoke "before" hook.
    this.trigger('setPage:before', [page]);
    //  Make the page able to receive focus.
    page.tabIndex = -1;
    //  Set the classes
    page.classList.add('mm-page', 'mm-slideout');
    //  Set the ID.
    page.id = page.id || uniqueId();
    //	Sync the blocker to target the page.
    Mmenu.node.blck.setAttribute('href', `#${page.id}`);
    //	Store the page node.
    Mmenu.node.page = page;
    //	Invoke "after" hook.
    this.trigger('setPage:after', [page]);
};

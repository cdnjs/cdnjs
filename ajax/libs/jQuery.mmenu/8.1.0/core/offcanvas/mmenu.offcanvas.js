import Mmenu from './../oncanvas/mmenu.oncanvas';
import options from './_options';
import configs from './_configs';
import * as DOM from '../_dom';
import * as events from '../_eventlisteners';
import { extendShorthandOptions } from './_options';
import { extend, transitionend, uniqueId, originalId } from '../../core/_helpers';
//  Add the options and configs.
Mmenu.options.offCanvas = options;
Mmenu.configs.offCanvas = configs;
export default function () {
    if (!this.opts.offCanvas) {
        return;
    }
    var options = extendShorthandOptions(this.opts.offCanvas);
    this.opts.offCanvas = extend(options, Mmenu.options.offCanvas);
    var configs = this.conf.offCanvas;
    //	Add methods to the API.
    this._api.push('open', 'close', 'setPage');
    //	Setup the menu.
    this.vars.opened = false;
    //	Add off-canvas behavior.
    this.bind('initMenu:before', () => {
        //	Clone if needed.
        if (configs.clone) {
            //	Clone the original menu and store it.
            this.node.menu = this.node.menu.cloneNode(true);
            //	Prefix all ID's in the cloned menu.
            if (this.node.menu.id) {
                this.node.menu.id = 'mm-' + this.node.menu.id;
            }
            DOM.find(this.node.menu, '[id]').forEach(elem => {
                elem.id = 'mm-' + elem.id;
            });
        }
        this.node.wrpr = document.documentElement;
        //	Prepend to the <body>
        document
            .querySelector(configs.menu.insertSelector)[configs.menu.insertMethod](this.node.menu);
    });
    this.bind('initMenu:after', () => {
        //	Setup the UI blocker.
        initBlocker.call(this);
        //	Setup the page.
        this.setPage(Mmenu.node.page);
        //	Setup window events.
        initWindow.call(this);
        //	Setup the menu.
        this.node.menu.classList.add('mm-menu_offcanvas');
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
    //	Sync the blocker to target the page.
    this.bind('setPage:after', (page) => {
        if (Mmenu.node.blck) {
            DOM.children(Mmenu.node.blck, 'a').forEach(anchor => {
                anchor.setAttribute('href', '#' + page.id);
            });
        }
    });
    //	Add screenreader / aria support
    this.bind('open:start:sr-aria', () => {
        Mmenu.sr_aria(this.node.menu, 'hidden', false);
    });
    this.bind('close:finish:sr-aria', () => {
        Mmenu.sr_aria(this.node.menu, 'hidden', true);
    });
    this.bind('initMenu:after:sr-aria', () => {
        Mmenu.sr_aria(this.node.menu, 'hidden', true);
    });
    //	Add screenreader / text support
    this.bind('initBlocker:after:sr-text', () => {
        DOM.children(Mmenu.node.blck, 'a').forEach(anchor => {
            anchor.innerHTML = Mmenu.sr_text(this.i18n(this.conf.screenReader.text.closeMenu));
        });
    });
    //	Add click behavior.
    //	Prevents default behavior when clicking an anchor
    this.clck.push((anchor, args) => {
        //	Open menu if the clicked anchor links to the menu
        let id = originalId(this.node.menu.id);
        if (id) {
            if (anchor.matches('[href="#' + id + '"]')) {
                //	Opening this menu from within this menu
                //		-> Open menu
                if (args.inMenu) {
                    this.open();
                    return true;
                }
                //	Opening this menu from within a second menu
                //		-> Close the second menu before opening this menu
                var menu = anchor.closest('.mm-menu');
                if (menu) {
                    var api = menu['mmApi'];
                    if (api && api.close) {
                        api.close();
                        transitionend(menu, () => {
                            this.open();
                        }, this.conf.transitionDuration);
                        return true;
                    }
                }
                //	Opening this menu
                this.open();
                return true;
            }
        }
        //	Close menu
        id = Mmenu.node.page.id;
        if (id) {
            if (anchor.matches('[href="#' + id + '"]')) {
                this.close();
                return true;
            }
        }
        return;
    });
}
/**
 * Open the menu.
 */
Mmenu.prototype.open = function () {
    //	Invoke "before" hook.
    this.trigger('open:before');
    if (this.vars.opened) {
        return;
    }
    this._openSetup();
    //	Without the timeout, the animation won't work because the menu had display: none;
    setTimeout(() => {
        this._openStart();
    }, this.conf.openingInterval);
    //	Invoke "after" hook.
    this.trigger('open:after');
};
Mmenu.prototype._openSetup = function () {
    var options = this.opts.offCanvas;
    //	Close other menus
    this.closeAllOthers();
    //	Store style and position
    Mmenu.node.page['mmStyle'] = Mmenu.node.page.getAttribute('style') || '';
    //	Trigger window-resize to measure height
    events.trigger(window, 'resize.page', { force: true });
    var clsn = ['mm-wrapper_opened'];
    //	Add options
    if (options.blockUI) {
        clsn.push('mm-wrapper_blocking');
    }
    if (options.blockUI == 'modal') {
        clsn.push('mm-wrapper_modal');
    }
    if (options.moveBackground) {
        clsn.push('mm-wrapper_background');
    }
    this.node.wrpr.classList.add(...clsn);
    //	Open
    //	Without the timeout, the animation won't work because the menu had display: none;
    setTimeout(() => {
        this.vars.opened = true;
    }, this.conf.openingInterval);
    this.node.menu.classList.add('mm-menu_opened');
};
/**
 * Finish opening the menu.
 */
Mmenu.prototype._openStart = function () {
    //	Callback when the page finishes opening.
    transitionend(Mmenu.node.page, () => {
        this.trigger('open:finish');
    }, this.conf.transitionDuration);
    //	Opening
    this.trigger('open:start');
    this.node.wrpr.classList.add('mm-wrapper_opening');
};
Mmenu.prototype.close = function () {
    //	Invoke "before" hook.
    this.trigger('close:before');
    if (!this.vars.opened) {
        return;
    }
    //	Callback when the page finishes closing.
    transitionend(Mmenu.node.page, () => {
        this.node.menu.classList.remove('mm-menu_opened');
        var clsn = [
            'mm-wrapper_opened',
            'mm-wrapper_blocking',
            'mm-wrapper_modal',
            'mm-wrapper_background'
        ];
        this.node.wrpr.classList.remove(...clsn);
        //	Restore style and position
        Mmenu.node.page.setAttribute('style', Mmenu.node.page['mmStyle']);
        this.vars.opened = false;
        this.trigger('close:finish');
    }, this.conf.transitionDuration);
    //	Closing
    this.trigger('close:start');
    this.node.wrpr.classList.remove('mm-wrapper_opening');
    //	Invoke "after" hook.
    this.trigger('close:after');
};
/**
 * Close all other menus.
 */
Mmenu.prototype.closeAllOthers = function () {
    DOM.find(document.body, '.mm-menu_offcanvas').forEach(menu => {
        if (menu !== this.node.menu) {
            let api = menu['mmApi'];
            if (api && api.close) {
                api.close();
            }
        }
    });
};
/**
 * Set the "page" node.
 *
 * @param {HTMLElement} page Element to set as the page.
 */
Mmenu.prototype.setPage = function (page) {
    //	Invoke "before" hook.
    this.trigger('setPage:before', [page]);
    var configs = this.conf.offCanvas;
    //	If no page was specified, find it.
    if (!page) {
        /** Array of elements that are / could be "the page". */
        let pages = typeof configs.page.selector == 'string'
            ? DOM.find(document.body, configs.page.selector)
            : DOM.children(document.body, configs.page.nodetype);
        //	Filter out elements that are absolutely not "the page".
        pages = pages.filter(page => !page.matches('.mm-menu, .mm-wrapper__blocker'));
        //	Filter out elements that are configured to not be "the page".
        if (configs.page.noSelector.length) {
            pages = pages.filter(page => !page.matches(configs.page.noSelector.join(', ')));
        }
        //	Wrap multiple pages in a single element.
        if (pages.length > 1) {
            let wrapper = DOM.create('div');
            pages[0].before(wrapper);
            pages.forEach(page => {
                wrapper.append(page);
            });
            pages = [wrapper];
        }
        page = pages[0];
    }
    page.classList.add('mm-page', 'mm-slideout');
    page.id = page.id || uniqueId();
    Mmenu.node.page = page;
    //	Invoke "after" hook.
    this.trigger('setPage:after', [page]);
};
/**
 * Initialize the window.
 */
const initWindow = function () {
    //	Prevent tabbing
    //	Because when tabbing outside the menu, the element that gains focus will be centered on the screen.
    //	In other words: The menu would move out of view.
    events.off(document.body, 'keydown.tabguard');
    events.on(document.body, 'keydown.tabguard', (evnt) => {
        if (evnt.keyCode == 9) {
            if (this.node.wrpr.matches('.mm-wrapper_opened')) {
                evnt.preventDefault();
            }
        }
    });
    //	Set "page" element min-height to window height
    events.off(window, 'resize.page');
    events.on(window, 'resize.page', evnt => {
        if (Mmenu.node.page) {
            if (this.node.wrpr.matches('.mm-wrapper_opening') ||
                evnt.force) {
                Mmenu.node.page.style.minHeight = window.innerHeight + 'px';
            }
        }
    });
};
/**
 * Initialize "blocker" node
 */
const initBlocker = function () {
    //	Invoke "before" hook.
    this.trigger('initBlocker:before');
    var options = this.opts.offCanvas, configs = this.conf.offCanvas;
    if (!options.blockUI) {
        return;
    }
    //	Create the blocker node.
    if (!Mmenu.node.blck) {
        let blck = DOM.create('div.mm-wrapper__blocker.mm-slideout');
        blck.innerHTML = '<a></a>';
        //	Append the blocker node to the body.
        document.querySelector(configs.menu.insertSelector).append(blck);
        //	Store the blocker node.
        Mmenu.node.blck = blck;
    }
    //	Close the menu when
    //		1) clicking,
    //		2) touching or
    //		3) dragging the blocker node.
    var closeMenu = (evnt) => {
        evnt.preventDefault();
        evnt.stopPropagation();
        if (!this.node.wrpr.matches('.mm-wrapper_modal')) {
            this.close();
        }
    };
    Mmenu.node.blck.addEventListener('mousedown', closeMenu); // 1
    Mmenu.node.blck.addEventListener('touchstart', closeMenu); // 2
    Mmenu.node.blck.addEventListener('touchmove', closeMenu); // 3
    //	Invoke "after" hook.
    this.trigger('initBlocker:after');
};

import Mmenu from './../oncanvas/mmenu.oncanvas';
import options from './_options';
import configs from './_configs';
import { extendShorthandOptions } from './_options';
import * as DOM from '../../_modules/dom';
import * as events from '../../_modules/eventlisteners';
import { extend, transitionend, uniqueId, originalId } from '../../_modules/helpers';
//  Add the options and configs.
Mmenu.options.offCanvas = options;
Mmenu.configs.offCanvas = configs;
export default function () {
    var _this = this;
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
    this.bind('initMenu:before', function () {
        //	Clone if needed.
        if (configs.clone) {
            //	Clone the original menu and store it.
            _this.node.menu = _this.node.menu.cloneNode(true);
            //	Prefix all ID's in the cloned menu.
            if (_this.node.menu.id) {
                _this.node.menu.id = 'mm-' + _this.node.menu.id;
            }
            DOM.find(_this.node.menu, '[id]').forEach(function (elem) {
                elem.id = 'mm-' + elem.id;
            });
        }
        _this.node.wrpr = document.body;
        //	Prepend to the <body>
        document
            .querySelector(configs.menu.insertSelector)[configs.menu.insertMethod](_this.node.menu);
    });
    this.bind('initMenu:after', function () {
        //	Setup the UI blocker.
        initBlocker.call(_this);
        //	Setup the page.
        _this.setPage(Mmenu.node.page);
        //	Setup window events.
        initWindow.call(_this);
        //	Setup the menu.
        _this.node.menu.classList.add('mm-menu_offcanvas');
        //	Open if url hash equals menu id (usefull when user clicks the hamburger icon before the menu is created)
        var hash = window.location.hash;
        if (hash) {
            var id = originalId(_this.node.menu.id);
            if (id && id == hash.slice(1)) {
                setTimeout(function () {
                    _this.open();
                }, 1000);
            }
        }
    });
    //	Sync the blocker to target the page.
    this.bind('setPage:after', function (page) {
        if (Mmenu.node.blck) {
            DOM.children(Mmenu.node.blck, 'a').forEach(function (anchor) {
                anchor.setAttribute('href', '#' + page.id);
            });
        }
    });
    //	Add screenreader / aria support
    this.bind('open:start:sr-aria', function () {
        Mmenu.sr_aria(_this.node.menu, 'hidden', false);
    });
    this.bind('close:finish:sr-aria', function () {
        Mmenu.sr_aria(_this.node.menu, 'hidden', true);
    });
    this.bind('initMenu:after:sr-aria', function () {
        Mmenu.sr_aria(_this.node.menu, 'hidden', true);
    });
    //	Add screenreader / text support
    this.bind('initBlocker:after:sr-text', function () {
        DOM.children(Mmenu.node.blck, 'a').forEach(function (anchor) {
            anchor.innerHTML = Mmenu.sr_text(_this.i18n(_this.conf.screenReader.text.closeMenu));
        });
    });
    //	Add click behavior.
    //	Prevents default behavior when clicking an anchor
    this.clck.push(function (anchor, args) {
        //	Open menu if the clicked anchor links to the menu
        var id = originalId(_this.node.menu.id);
        if (id) {
            if (anchor.matches('[href="#' + id + '"]')) {
                //	Opening this menu from within this menu
                //		-> Open menu
                if (args.inMenu) {
                    _this.open();
                    return true;
                }
                //	Opening this menu from within a second menu
                //		-> Close the second menu before opening this menu
                var menu = anchor.closest('.mm-menu');
                if (menu) {
                    var api = menu['mmApi'];
                    if (api && api.close) {
                        api.close();
                        transitionend(menu, function () {
                            _this.open();
                        }, _this.conf.transitionDuration);
                        return true;
                    }
                }
                //	Opening this menu
                _this.open();
                return true;
            }
        }
        //	Close menu
        id = Mmenu.node.page.id;
        if (id) {
            if (anchor.matches('[href="#' + id + '"]')) {
                _this.close();
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
    var _this = this;
    //	Invoke "before" hook.
    this.trigger('open:before');
    if (this.vars.opened) {
        return;
    }
    this._openSetup();
    //	Without the timeout, the animation won't work because the menu had display: none;
    setTimeout(function () {
        _this._openStart();
    }, this.conf.openingInterval);
    //	Invoke "after" hook.
    this.trigger('open:after');
};
Mmenu.prototype._openSetup = function () {
    var _this = this;
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
    //  IE11:
    clsn.forEach(function (classname) {
        _this.node.wrpr.classList.add(classname);
    });
    //  Better browsers:
    // this.node.wrpr.classList.add(...clsn);
    //	Open
    //	Without the timeout, the animation won't work because the menu had display: none;
    setTimeout(function () {
        _this.vars.opened = true;
    }, this.conf.openingInterval);
    this.node.menu.classList.add('mm-menu_opened');
};
/**
 * Finish opening the menu.
 */
Mmenu.prototype._openStart = function () {
    var _this = this;
    //	Callback when the page finishes opening.
    transitionend(Mmenu.node.page, function () {
        _this.trigger('open:finish');
    }, this.conf.transitionDuration);
    //	Opening
    this.trigger('open:start');
    this.node.wrpr.classList.add('mm-wrapper_opening');
};
Mmenu.prototype.close = function () {
    var _this = this;
    //	Invoke "before" hook.
    this.trigger('close:before');
    if (!this.vars.opened) {
        return;
    }
    //	Callback when the page finishes closing.
    transitionend(Mmenu.node.page, function () {
        _this.node.menu.classList.remove('mm-menu_opened');
        var classnames = [
            'mm-wrapper_opened',
            'mm-wrapper_blocking',
            'mm-wrapper_modal',
            'mm-wrapper_background'
        ];
        //  IE11:
        classnames.forEach(function (classname) {
            _this.node.wrpr.classList.remove(classname);
        });
        //  Better browsers:
        // this.node.wrpr.classList.remove(...classnames);
        //	Restore style and position
        Mmenu.node.page.setAttribute('style', Mmenu.node.page['mmStyle']);
        _this.vars.opened = false;
        _this.trigger('close:finish');
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
    var _this = this;
    DOM.find(document.body, '.mm-menu_offcanvas').forEach(function (menu) {
        if (menu !== _this.node.menu) {
            var api = menu['mmApi'];
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
        var pages = typeof configs.page.selector == 'string'
            ? DOM.find(document.body, configs.page.selector)
            : DOM.children(document.body, configs.page.nodetype);
        //	Filter out elements that are absolutely not "the page".
        pages = pages.filter(function (page) { return !page.matches('.mm-menu, .mm-wrapper__blocker'); });
        //	Filter out elements that are configured to not be "the page".
        if (configs.page.noSelector.length) {
            pages = pages.filter(function (page) { return !page.matches(configs.page.noSelector.join(', ')); });
        }
        //	Wrap multiple pages in a single element.
        if (pages.length > 1) {
            var wrapper_1 = DOM.create('div');
            pages[0].before(wrapper_1);
            pages.forEach(function (page) {
                wrapper_1.append(page);
            });
            pages = [wrapper_1];
        }
        page = pages[0];
    }
    page.classList.add('mm-page');
    page.classList.add('mm-slideout');
    page.id = page.id || uniqueId();
    Mmenu.node.page = page;
    //	Invoke "after" hook.
    this.trigger('setPage:after', [page]);
};
/**
 * Initialize the window.
 */
var initWindow = function () {
    var _this = this;
    //	Prevent tabbing
    //	Because when tabbing outside the menu, the element that gains focus will be centered on the screen.
    //	In other words: The menu would move out of view.
    events.off(document.body, 'keydown.tabguard');
    events.on(document.body, 'keydown.tabguard', function (evnt) {
        if (evnt.keyCode == 9) {
            if (_this.node.wrpr.matches('.mm-wrapper_opened')) {
                evnt.preventDefault();
            }
        }
    });
};
/**
 * Initialize "blocker" node
 */
var initBlocker = function () {
    var _this = this;
    //	Invoke "before" hook.
    this.trigger('initBlocker:before');
    var options = this.opts.offCanvas, configs = this.conf.offCanvas;
    if (!options.blockUI) {
        return;
    }
    //	Create the blocker node.
    if (!Mmenu.node.blck) {
        var blck = DOM.create('div.mm-wrapper__blocker.mm-slideout');
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
    var closeMenu = function (evnt) {
        evnt.preventDefault();
        evnt.stopPropagation();
        if (!_this.node.wrpr.matches('.mm-wrapper_modal')) {
            _this.close();
        }
    };
    Mmenu.node.blck.addEventListener('mousedown', closeMenu); // 1
    Mmenu.node.blck.addEventListener('touchstart', closeMenu); // 2
    Mmenu.node.blck.addEventListener('touchmove', closeMenu); // 3
    //	Invoke "after" hook.
    this.trigger('initBlocker:after');
};

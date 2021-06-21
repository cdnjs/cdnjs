import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import { extendShorthandOptions } from './_options';
import * as DOM from '../../_modules/dom';
import * as events from '../../_modules/eventlisteners';
import * as support from '../../_modules/support';
import { extend } from '../../_modules/helpers';
//  Add the options.
Mmenu.options.keyboardNavigation = options;
export default function () {
    var _this = this;
    //	Keyboard navigation on touchscreens opens the virtual keyboard :/
    //	Lets prevent that.
    if (support.touch) {
        return;
    }
    var options = extendShorthandOptions(this.opts.keyboardNavigation);
    this.opts.keyboardNavigation = extend(options, Mmenu.options.keyboardNavigation);
    //	Enable keyboard navigation
    if (options.enable) {
        var menuStart_1 = DOM.create('button.mm-tabstart.mm-sronly'), menuEnd_1 = DOM.create('button.mm-tabend.mm-sronly'), blockerEnd_1 = DOM.create('button.mm-tabend.mm-sronly');
        this.bind('initMenu:after', function () {
            if (options.enhance) {
                _this.node.menu.classList.add('mm-menu_keyboardfocus');
            }
            initWindow.call(_this, options.enhance);
        });
        this.bind('initOpened:before', function () {
            _this.node.menu.prepend(menuStart_1);
            _this.node.menu.append(menuEnd_1);
            DOM.children(_this.node.menu, '.mm-navbars-top, .mm-navbars-bottom').forEach(function (navbars) {
                navbars.querySelectorAll('.mm-navbar__title').forEach(function (title) {
                    title.setAttribute('tabindex', '-1');
                });
            });
        });
        this.bind('initBlocker:after', function () {
            Mmenu.node.blck.append(blockerEnd_1);
            DOM.children(Mmenu.node.blck, 'a')[0].classList.add('mm-tabstart');
        });
        var focusable_1 = 'input, select, textarea, button, label, a[href]';
        var setFocus = function (panel) {
            panel =
                panel || DOM.children(_this.node.pnls, '.mm-panel_opened')[0];
            var focus = null;
            //	Focus already is on an element in a navbar in this menu.
            var navbar = document.activeElement.closest('.mm-navbar');
            if (navbar) {
                if (navbar.closest('.mm-menu') == _this.node.menu) {
                    return;
                }
            }
            //	Set the focus to the first focusable element by default.
            if (options.enable == 'default') {
                //	First visible anchor in a listview in the current panel.
                focus = DOM.find(panel, '.mm-listview a[href]:not(.mm-hidden)')[0];
                //	First focusable and visible element in the current panel.
                if (!focus) {
                    focus = DOM.find(panel, focusable_1 + ':not(.mm-hidden)')[0];
                }
                //	First focusable and visible element in a navbar.
                if (!focus) {
                    var elements_1 = [];
                    DOM.children(_this.node.menu, '.mm-navbars_top, .mm-navbars_bottom').forEach(function (navbar) {
                        elements_1.push.apply(elements_1, DOM.find(navbar, focusable_1 + ':not(.mm-hidden)'));
                    });
                    focus = elements_1[0];
                }
            }
            //	Default.
            if (!focus) {
                focus = DOM.children(_this.node.menu, '.mm-tabstart')[0];
            }
            if (focus) {
                focus.focus();
            }
        };
        this.bind('open:finish', setFocus);
        this.bind('openPanel:finish', setFocus);
        //	Add screenreader / aria support.
        this.bind('initOpened:after:sr-aria', function () {
            [_this.node.menu, Mmenu.node.blck].forEach(function (element) {
                DOM.children(element, '.mm-tabstart, .mm-tabend').forEach(function (tabber) {
                    Mmenu.sr_aria(tabber, 'hidden', true);
                    Mmenu.sr_role(tabber, 'presentation');
                });
            });
        });
    }
}
/**
 * Initialize the window for keyboard navigation.
 * @param {boolean} enhance - Whether or not to also rich enhance the keyboard behavior.
 **/
var initWindow = function (enhance) {
    var _this = this;
    //	Re-enable tabbing in general
    events.off(document.body, 'keydown.tabguard');
    //	Intersept the target when tabbing.
    events.off(document.body, 'focusin.tabguard');
    events.on(document.body, 'focusin.tabguard', function (evnt) {
        if (_this.node.wrpr.matches('.mm-wrapper_opened')) {
            var target = evnt.target;
            if (target.matches('.mm-tabend')) {
                var next = void 0;
                //	Jump from menu to blocker.
                if (target.parentElement.matches('.mm-menu')) {
                    if (Mmenu.node.blck) {
                        next = Mmenu.node.blck;
                    }
                }
                //	Jump to opened menu.
                if (target.parentElement.matches('.mm-wrapper__blocker')) {
                    next = DOM.find(document.body, '.mm-menu_offcanvas.mm-menu_opened')[0];
                }
                //	If no available element found, stay in current element.
                if (!next) {
                    next = target.parentElement;
                }
                if (next) {
                    DOM.children(next, '.mm-tabstart')[0].focus();
                }
            }
        }
    });
    //	Add Additional keyboard behavior.
    events.off(document.body, 'keydown.navigate');
    events.on(document.body, 'keydown.navigate', function (evnt) {
        var target = evnt.target;
        var menu = target.closest('.mm-menu');
        if (menu) {
            var api = menu['mmApi'];
            if (!target.matches('input, textarea')) {
                switch (evnt.keyCode) {
                    //	press enter to toggle and check
                    case 13:
                        if (target.matches('.mm-toggle') ||
                            target.matches('.mm-check')) {
                            target.dispatchEvent(new Event('click'));
                        }
                        break;
                    //	prevent spacebar or arrows from scrolling the page
                    case 32: //	space
                    case 37: //	left
                    case 38: //	top
                    case 39: //	right
                    case 40: //	bottom
                        evnt.preventDefault();
                        break;
                }
            }
            if (enhance) {
                //	special case for input
                if (target.matches('input')) {
                    switch (evnt.keyCode) {
                        //	empty searchfield with esc
                        case 27:
                            target.value = '';
                            break;
                    }
                }
                else {
                    var api_1 = menu['mmApi'];
                    switch (evnt.keyCode) {
                        //	close submenu with backspace
                        case 8:
                            var parent_1 = DOM.find(menu, '.mm-panel_opened')[0]['mmParent'];
                            if (parent_1) {
                                api_1.openPanel(parent_1.closest('.mm-panel'));
                            }
                            break;
                        //	close menu with esc
                        case 27:
                            if (menu.matches('.mm-menu_offcanvas')) {
                                api_1.close();
                            }
                            break;
                    }
                }
            }
        }
    });
};

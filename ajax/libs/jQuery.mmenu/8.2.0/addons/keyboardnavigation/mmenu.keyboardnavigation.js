import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import * as DOM from '../../core/_dom';
import * as events from '../../core/_eventlisteners';
import * as support from '../../core/_support';
import { extendShorthandOptions } from './_options';
import { extend } from '../../core/_helpers';
//  Add the options.
Mmenu.options.keyboardNavigation = options;
export default function () {
    //	Keyboard navigation on touchscreens opens the virtual keyboard :/
    //	Lets prevent that.
    if (support.touch) {
        return;
    }
    var options = extendShorthandOptions(this.opts.keyboardNavigation);
    this.opts.keyboardNavigation = extend(options, Mmenu.options.keyboardNavigation);
    //	Enable keyboard navigation
    if (options.enable) {
        let menuStart = DOM.create('button.mm-tabstart.mm-sronly'), menuEnd = DOM.create('button.mm-tabend.mm-sronly'), blockerEnd = DOM.create('button.mm-tabend.mm-sronly');
        this.bind('initMenu:after', () => {
            if (options.enhance) {
                this.node.menu.classList.add('mm-menu_keyboardfocus');
            }
            initWindow.call(this, options.enhance);
        });
        this.bind('initOpened:before', () => {
            this.node.menu.prepend(menuStart);
            this.node.menu.append(menuEnd);
            DOM.children(this.node.menu, '.mm-navbars-top, .mm-navbars-bottom').forEach(navbars => {
                navbars.querySelectorAll('.mm-navbar__title').forEach(title => {
                    title.setAttribute('tabindex', '-1');
                });
            });
        });
        this.bind('initBlocker:after', () => {
            Mmenu.node.blck.append(blockerEnd);
            DOM.children(Mmenu.node.blck, 'a')[0].classList.add('mm-tabstart');
        });
        let focusable = 'input, select, textarea, button, label, a[href]';
        const setFocus = (panel) => {
            panel =
                panel || DOM.children(this.node.pnls, '.mm-panel_opened')[0];
            var focus = null;
            //	Focus already is on an element in a navbar in this menu.
            var navbar = document.activeElement.closest('.mm-navbar');
            if (navbar) {
                if (navbar.closest('.mm-menu') == this.node.menu) {
                    return;
                }
            }
            //	Set the focus to the first focusable element by default.
            if (options.enable == 'default') {
                //	First visible anchor in a listview in the current panel.
                focus = DOM.find(panel, '.mm-listview a[href]:not(.mm-hidden)')[0];
                //	First focusable and visible element in the current panel.
                if (!focus) {
                    focus = DOM.find(panel, focusable + ':not(.mm-hidden)')[0];
                }
                //	First focusable and visible element in a navbar.
                if (!focus) {
                    let elements = [];
                    DOM.children(this.node.menu, '.mm-navbars_top, .mm-navbars_bottom').forEach(navbar => {
                        elements.push(...DOM.find(navbar, focusable + ':not(.mm-hidden)'));
                    });
                    focus = elements[0];
                }
            }
            //	Default.
            if (!focus) {
                focus = DOM.children(this.node.menu, '.mm-tabstart')[0];
            }
            if (focus) {
                focus.focus();
            }
        };
        this.bind('open:finish', setFocus);
        this.bind('openPanel:finish', setFocus);
        //	Add screenreader / aria support.
        this.bind('initOpened:after:sr-aria', () => {
            [this.node.menu, Mmenu.node.blck].forEach(element => {
                DOM.children(element, '.mm-tabstart, .mm-tabend').forEach(tabber => {
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
const initWindow = function (enhance) {
    //	Re-enable tabbing in general
    events.off(document.body, 'keydown.tabguard');
    //	Intersept the target when tabbing.
    events.off(document.body, 'focusin.tabguard');
    events.on(document.body, 'focusin.tabguard', (evnt) => {
        if (this.node.wrpr.matches('.mm-wrapper_opened')) {
            let target = evnt.target;
            if (target.matches('.mm-tabend')) {
                let next;
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
    events.on(document.body, 'keydown.navigate', (evnt) => {
        var target = evnt.target;
        var menu = target.closest('.mm-menu');
        if (menu) {
            let api = menu['mmApi'];
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
                    let api = menu['mmApi'];
                    switch (evnt.keyCode) {
                        //	close submenu with backspace
                        case 8:
                            let parent = DOM.find(menu, '.mm-panel_opened')[0]['mmParent'];
                            if (parent) {
                                api.openPanel(parent.closest('.mm-panel'));
                            }
                            break;
                        //	close menu with esc
                        case 27:
                            if (menu.matches('.mm-menu_offcanvas')) {
                                api.close();
                            }
                            break;
                    }
                }
            }
        }
    });
};

import Mmenu from './../oncanvas/mmenu.oncanvas';
import options from './_options';
import configs from './_configs';
import translate from './translations/translate';
import * as DOM from '../_dom';
import { extendShorthandOptions } from './_options';
import { extend } from '../../core/_helpers';
//  Add the translations.
translate();
//  Add the options and configs.
Mmenu.options.screenReader = options;
Mmenu.configs.screenReader = configs;
export default function () {
    //	Extend options.
    var options = extendShorthandOptions(this.opts.screenReader);
    this.opts.screenReader = extend(options, Mmenu.options.screenReader);
    //	Extend configs.
    var configs = this.conf.screenReader;
    //	Add Aria-* attributes
    if (options.aria) {
        //	Add screenreader / aria hooks for add-ons
        //	In orde to keep this list short, only extend hooks that are actually used by other add-ons.
        this.bind('initAddons:after', () => {
            this.bind('initMenu:after', function () {
                this.trigger('initMenu:after:sr-aria', [].slice.call(arguments));
            });
            this.bind('initNavbar:after', function () {
                this.trigger('initNavbar:after:sr-aria', [].slice.call(arguments));
            });
            this.bind('openPanel:start', function () {
                this.trigger('openPanel:start:sr-aria', [].slice.call(arguments));
            });
            this.bind('close:start', function () {
                this.trigger('close:start:sr-aria', [].slice.call(arguments));
            });
            this.bind('close:finish', function () {
                this.trigger('close:finish:sr-aria', [].slice.call(arguments));
            });
            this.bind('open:start', function () {
                this.trigger('open:start:sr-aria', [].slice.call(arguments));
            });
            this.bind('initOpened:after', function () {
                this.trigger('initOpened:after:sr-aria', [].slice.call(arguments));
            });
        });
        //	Update aria-hidden for hidden / visible listitems
        this.bind('updateListview', () => {
            this.node.pnls
                .querySelectorAll('.mm-listitem')
                .forEach(listitem => {
                Mmenu.sr_aria(listitem, 'hidden', listitem.matches('.mm-hidden'));
            });
        });
        //	Update aria-hidden for the panels when opening and closing a panel.
        this.bind('openPanel:start', (panel) => {
            /** Panels that should be considered "hidden". */
            var hidden = DOM.find(this.node.pnls, '.mm-panel')
                .filter(hide => hide !== panel)
                .filter(hide => !hide.parentElement.matches('.mm-panel'));
            /** Panels that should be considered "visible". */
            var visible = [panel];
            DOM.find(panel, '.mm-listitem_vertical .mm-listitem_opened').forEach(listitem => {
                visible.push(...DOM.children(listitem, '.mm-panel'));
            });
            //	Set the panels to be considered "hidden" or "visible".
            hidden.forEach(panel => {
                Mmenu.sr_aria(panel, 'hidden', true);
            });
            visible.forEach(panel => {
                Mmenu.sr_aria(panel, 'hidden', false);
            });
        });
        this.bind('closePanel', (panel) => {
            Mmenu.sr_aria(panel, 'hidden', true);
        });
        //	Add aria-haspopup and aria-owns to prev- and next buttons.
        this.bind('initPanel:after', (panel) => {
            DOM.find(panel, '.mm-btn').forEach(button => {
                Mmenu.sr_aria(button, 'haspopup', true);
                let href = button.getAttribute('href');
                if (href) {
                    Mmenu.sr_aria(button, 'owns', href.replace('#', ''));
                }
            });
        });
        //	Add aria-hidden for navbars in panels.
        this.bind('initNavbar:after', (panel) => {
            /** The navbar in the panel. */
            var navbar = DOM.children(panel, '.mm-navbar')[0];
            /** Whether or not the navbar should be considered "hidden". */
            var hidden = navbar.matches('.mm-hidden');
            //	Set the navbar to be considered "hidden" or "visible".
            Mmenu.sr_aria(navbar, 'hidden', hidden);
        });
        //	Text
        if (options.text) {
            //	Add aria-hidden to titles in navbars
            if (this.opts.navbar.titleLink == 'parent') {
                this.bind('initNavbar:after', (panel) => {
                    /** The navbar in the panel. */
                    var navbar = DOM.children(panel, '.mm-navbar')[0];
                    /** Whether or not the navbar should be considered "hidden". */
                    var hidden = navbar.querySelector('.mm-btn_prev')
                        ? true
                        : false;
                    //	Set the navbar-title to be considered "hidden" or "visible".
                    Mmenu.sr_aria(DOM.find(navbar, '.mm-navbar__title')[0], 'hidden', hidden);
                });
            }
        }
    }
    //	Add screenreader text
    if (options.text) {
        //	Add screenreader / text hooks for add-ons
        //	In orde to keep this list short, only extend hooks that are actually used by other add-ons.
        this.bind('initAddons:after', () => {
            this.bind('setPage:after', function () {
                this.trigger('setPage:after:sr-text', [].slice.call(arguments));
            });
            this.bind('initBlocker:after', function () {
                this.trigger('initBlocker:after:sr-text', [].slice.call(arguments));
            });
        });
        //	Add text to the prev-buttons.
        this.bind('initNavbar:after', (panel) => {
            let navbar = DOM.children(panel, '.mm-navbar')[0];
            if (navbar) {
                let button = DOM.children(navbar, '.mm-btn_prev')[0];
                if (button) {
                    button.innerHTML = Mmenu.sr_text(this.i18n(configs.text.closeSubmenu));
                }
            }
        });
        //	Add text to the next-buttons.
        this.bind('initListview:after', (panel) => {
            let parent = panel['mmParent'];
            if (parent) {
                let next = DOM.children(parent, '.mm-btn_next')[0];
                if (next) {
                    let text = this.i18n(configs.text[next.parentElement.matches('.mm-listitem_vertical')
                        ? 'toggleSubmenu'
                        : 'openSubmenu']);
                    next.innerHTML += Mmenu.sr_text(text);
                }
            }
        });
    }
}
//	Methods
(function () {
    var attr = function (element, attr, value) {
        element[attr] = value;
        if (value) {
            element.setAttribute(attr, value.toString());
        }
        else {
            element.removeAttribute(attr);
        }
    };
    /**
     * Add aria (property and) attribute to a HTML element.
     *
     * @param {HTMLElement} 	element	The node to add the attribute to.
     * @param {string}			name	The (non-aria-prefixed) attribute name.
     * @param {string|boolean}	value	The attribute value.
     */
    Mmenu.sr_aria = function (element, name, value) {
        attr(element, 'aria-' + name, value);
    };
    /**
     * Add role attribute to a HTML element.
     *
     * @param {HTMLElement}		element	The node to add the attribute to.
     * @param {string|boolean}	value	The attribute value.
     */
    Mmenu.sr_role = function (element, value) {
        attr(element, 'role', value);
    };
    /**
     * Wrap a text in a screen-reader-only node.
     *
     * @param 	{string} text	The text to wrap.
     * @return	{string}		The wrapped text.
     */
    Mmenu.sr_text = function (text) {
        return '<span class="mm-sronly">' + text + '</span>';
    };
})();

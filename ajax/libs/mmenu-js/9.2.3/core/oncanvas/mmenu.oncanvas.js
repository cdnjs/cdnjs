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
var _panelObserver, _listviewObserver, _listitemObserver;
import OPTIONS from './options';
import CONFIGS from './configs';
import translate from './translations';
import * as DOM from '../../_modules/dom';
import * as i18n from '../../_modules/i18n';
import * as media from '../../_modules/matchmedia';
import { extend, type, uniqueId, } from '../../_modules/helpers';
//  Add the translations.
translate();
/**
 * Class for a mobile menu.
 */
export default class Mmenu {
    /**
     * Create a mobile menu.
     * @param {HTMLElement|string} 	menu		The menu node.
     * @param {object} 				[option]	Options for the menu.
     * @param {object} 				[configs]	Configuration options for the menu.
     */
    constructor(menu, options, configs) {
        /** MutationObserver for adding a listview to a panel. */
        _panelObserver.set(this, void 0);
        /** MutationObserver for adding a listitem to a listview. */
        _listviewObserver.set(this, void 0);
        /** MutationObserver for adding a listview to a listitem. */
        _listitemObserver.set(this, void 0);
        //	Extend options and configuration from defaults.
        this.opts = extend(options, OPTIONS);
        this.conf = extend(configs, CONFIGS);
        //	Methods to expose in the API.
        this._api = [
            'i18n',
            'bind',
            'openPanel',
            'closePanel',
            'setSelected',
        ];
        //	Storage objects for nodes and hooks.
        this.node = {};
        this.hook = {};
        //	Get menu node from string or element.
        this.node.menu =
            typeof menu == 'string' ? document.querySelector(menu) : menu;
        if (typeof this._deprecatedWarnings == 'function') {
            this._deprecatedWarnings();
        }
        this.trigger('init:before');
        this._initObservers();
        this._initAddons();
        this._initHooks();
        this._initAPI();
        this._initMenu();
        this._initPanels();
        this._initOpened();
        media.watch();
        this.trigger('init:after');
        return this;
    }
    /**
     * Open a panel.
     * @param {HTMLElement} panel               Panel to open.
     * @param {boolean}     [animation=true]    Whether or not to use an animation.
     * @param {boolean}     [setfocus=true]     Whether or not to set focus to the panel.
     */
    openPanel(panel, animation = true, setfocus = true) {
        //	Find panel.
        if (!panel) {
            return;
        }
        panel = panel.closest('.mm-panel');
        //	Invoke "before" hook.
        this.trigger('openPanel:before', [panel, {
                animation,
                setfocus
            }]);
        /** Wrapping listitem (for a vertical panel) */
        const listitem = panel.closest('.mm-listitem--vertical');
        //	Open a "vertical" panel.
        if (listitem) {
            listitem.classList.add('mm-listitem--opened');
            /** The parent panel */
            const parent = listitem.closest('.mm-panel');
            this.openPanel(parent);
            //	Open a "horizontal" panel.
        }
        else {
            /** Currently opened panel. */
            const current = DOM.children(this.node.pnls, '.mm-panel--opened')[0];
            //  Ensure current panel stays on top while closing it.
            if (panel.matches('.mm-panel--parent') && current) {
                current.classList.add('mm-panel--highest');
            }
            //  Remove opened, parent, animation and highest classes from all panels.
            const remove = ['mm-panel--opened', 'mm-panel--parent'];
            const add = [];
            if (animation) {
                remove.push('mm-panel--noanimation');
            }
            else {
                add.push('mm-panel--noanimation');
            }
            DOM.children(this.node.pnls, '.mm-panel').forEach(pnl => {
                pnl.classList.add(...add);
                pnl.classList.remove(...remove);
                if (pnl !== current) {
                    pnl.classList.remove('mm-panel--highest');
                }
                // Set inert attribute.
                if (pnl === panel) {
                    pnl.removeAttribute('inert');
                }
                else {
                    pnl.setAttribute('inert', 'true');
                }
            });
            //  Open new panel.
            panel.classList.add('mm-panel--opened');
            /** The parent panel */
            let parent = DOM.find(this.node.pnls, `#${panel.dataset.mmParent}`)[0];
            //	Set parent panels as "parent".
            while (parent) {
                parent = parent.closest('.mm-panel');
                parent.classList.add('mm-panel--parent');
                parent = DOM.find(this.node.pnls, `#${parent.dataset.mmParent}`)[0];
            }
        }
        //	Invoke "after" hook.
        this.trigger('openPanel:after', [panel, {
                animation,
                setfocus
            }]);
    }
    /**
     * Close a panel.
     * @param {HTMLElement} panel               Panel to close.
     * @param {boolean}     [animation=true]    Whether or not to use an animation.
     * @param {boolean}     [setfocus=true]     Whether or not to set focus to the panel.
     */
    closePanel(panel, animation = true, setfocus = true) {
        if (!panel) {
            return;
        }
        if (!panel.matches('.mm-panel--opened') &&
            !panel.parentElement.matches('.mm-listitem--opened')) {
            return;
        }
        //	Invoke "before" hook.
        this.trigger('closePanel:before', [panel]);
        //	Close a "vertical" panel.
        if (panel.parentElement.matches('.mm-listitem--vertical')) {
            panel.parentElement.classList.remove('mm-listitem--opened');
            //  Close a "horizontal" panel...
        }
        else {
            //  ... open its parent...
            if (panel.dataset.mmParent) {
                const parent = DOM.find(this.node.pnls, `#${panel.dataset.mmParent}`)[0];
                this.openPanel(parent, animation, setfocus);
                // ... or the last opened
            }
            else {
                const lastPanel = DOM.children(this.node.pnls, '.mm-panel--parent').pop();
                if (lastPanel && lastPanel !== panel) {
                    this.openPanel(lastPanel, animation, setfocus);
                    // ... or the first panel.
                }
                else {
                    const firstPanel = DOM.children(this.node.pnls, '.mm-panel')[0];
                    if (firstPanel && firstPanel !== panel) {
                        this.openPanel(firstPanel, animation, setfocus);
                    }
                }
            }
        }
        //	Invoke "after" hook.
        this.trigger('closePanel:after', [panel]);
    }
    /**
     * Toggle a panel opened/closed.
     * @param {HTMLElement} panel Panel to open or close.
     */
    togglePanel(panel) {
        const listitem = panel.parentElement;
        /** The function to invoke (open or close). */
        let fn = 'openPanel';
        //	Toggle only works for "vertical" panels.
        if (listitem.matches('.mm-listitem--opened') ||
            panel.matches('.mm-panel--opened')) {
            fn = 'closePanel';
        }
        this[fn](panel);
    }
    /**
     * Display a listitem as being "selected".
     * @param {HTMLElement} listitem Listitem to mark.
     */
    setSelected(listitem) {
        //	Invoke "before" hook.
        this.trigger('setSelected:before', [listitem]);
        //	Remove the selected class from all listitems.
        DOM.find(this.node.menu, '.mm-listitem--selected').forEach((li) => {
            li.classList.remove('mm-listitem--selected');
        });
        //	Add the selected class to the provided listitem.
        listitem.classList.add('mm-listitem--selected');
        //	Invoke "after" hook.
        this.trigger('setSelected:after', [listitem]);
    }
    /**
     * Bind functions to a hook (subscriber).
     * @param {string} 		hook The hook.
     * @param {function} 	func The function.
     */
    bind(hook, func) {
        //	Create an array for the hook if it does not yet excist.
        this.hook[hook] = this.hook[hook] || [];
        //	Push the function to the array.
        this.hook[hook].push(func);
    }
    /**
     * Invoke the functions bound to a hook (publisher).
     * @param {string} 	hook  	The hook.
     * @param {array}	[args] 	Arguments for the function.
     */
    trigger(hook, args) {
        if (this.hook[hook]) {
            for (var h = 0, l = this.hook[hook].length; h < l; h++) {
                this.hook[hook][h].apply(this, args);
            }
        }
    }
    /**
     * Create the observers.
     */
    _initObservers() {
        __classPrivateFieldSet(this, _panelObserver, new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                mutation.addedNodes.forEach((listview) => {
                    if (listview.matches(this.conf.panelNodetype.join(', '))) {
                        this._initListview(listview);
                    }
                });
            });
        }));
        __classPrivateFieldSet(this, _listviewObserver, new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                mutation.addedNodes.forEach((listitem) => {
                    this._initListitem(listitem);
                });
            });
        }));
        __classPrivateFieldSet(this, _listitemObserver, new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                mutation.addedNodes.forEach((subpanel) => {
                    if (subpanel === null || subpanel === void 0 ? void 0 : subpanel.matches(this.conf.panelNodetype.join(', '))) {
                        this._initSubPanel(subpanel);
                    }
                });
            });
        }));
    }
    /**
     * Create the API.
     */
    _initAPI() {
        //	We need this=that because:
        //	1) the "arguments" object can not be referenced in an arrow function in ES3 and ES5.
        const that = this;
        this.API = {};
        this._api.forEach((fn) => {
            this.API[fn] = function () {
                return that[fn].apply(that, arguments); // 1)
            };
        });
        //	Store the API in the HTML node for external usage.
        this.node.menu['mmApi'] = this.API;
    }
    /**
     * Bind the hooks specified in the options (publisher).
     */
    _initHooks() {
        for (let hook in this.opts.hooks) {
            this.bind(hook, this.opts.hooks[hook]);
        }
    }
    /**
     * Initialize all available add-ons.
     */
    _initAddons() {
        //	Invoke "before" hook.
        this.trigger('initAddons:before');
        for (let addon in Mmenu.addons) {
            Mmenu.addons[addon].call(this);
        }
        //	Invoke "after" hook.
        this.trigger('initAddons:after');
    }
    /**
     * Initialize the menu.
     */
    _initMenu() {
        //	Invoke "before" hook.
        this.trigger('initMenu:before');
        //	Add class to the wrapper.
        this.node.wrpr = this.node.wrpr || this.node.menu.parentElement;
        this.node.wrpr.classList.add('mm-wrapper');
        //	Add class to the menu.
        this.node.menu.classList.add('mm-menu');
        //	Add an ID to the menu if it does not yet have one.
        this.node.menu.id = this.node.menu.id || uniqueId();
        this.node.menu.setAttribute('aria-label', this.i18n(this.opts.navbar.title || 'Menu'));
        this.node.menu.setAttribute('aria-modal', 'true');
        this.node.menu.setAttribute('role', 'dialog');
        /** All panel nodes in the menu. */
        const panels = DOM.children(this.node.menu).filter((panel) => panel.matches(this.conf.panelNodetype.join(', ')));
        //	Wrap the panels in a node.
        this.node.pnls = DOM.create('div.mm-panels');
        this.node.menu.append(this.node.pnls);
        //  Initiate all panel like nodes
        panels.forEach((panel) => {
            this._initPanel(panel);
        });
        //	Invoke "after" hook.
        this.trigger('initMenu:after');
    }
    /**
     * Initialize panels.
     */
    _initPanels() {
        //	Invoke "before" hook.
        this.trigger('initPanels:before');
        //	Open / close panels.
        this.node.menu.addEventListener('click', event => {
            var _a, _b;
            /** The href attribute for the clicked anchor. */
            const href = ((_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.closest('a[href]')) === null || _b === void 0 ? void 0 : _b.getAttribute('href')) || '';
            if (href.slice(0, 1) === '#') {
                try {
                    /** The targeted panel */
                    const panel = DOM.find(this.node.menu, href)[0];
                    if (panel) {
                        event.preventDefault();
                        this.togglePanel(panel);
                    }
                }
                catch (err) { }
            }
        }, {
            // useCapture to ensure the logical order.
            capture: true
        });
        //	Invoke "after" hook.
        this.trigger('initPanels:after');
    }
    /**
     * Initialize a single panel.
     * @param  {HTMLElement} 		panel 	Panel to initialize.
     * @return {HTMLElement|null} 			Initialized panel.
     */
    _initPanel(panel) {
        var _a;
        if (panel.matches('.mm-panel')) {
            return;
        }
        //	Refactor panel classnames
        DOM.reClass(panel, this.conf.classNames.panel, 'mm-panel');
        DOM.reClass(panel, this.conf.classNames.nopanel, 'mm-nopanel');
        //	Stop if not supposed to be a panel.
        if (panel.matches('.mm-nopanel')) {
            return;
        }
        //	Invoke "before" hook.
        this.trigger('initPanel:before', [panel]);
        //  Must have an ID
        panel.id = panel.id || uniqueId();
        //	Wrap UL/OL in DIV
        if (panel.matches('ul, ol')) {
            /** The panel. */
            const wrapper = DOM.create('div');
            //  Transport the ID
            wrapper.id = panel.id;
            panel.removeAttribute('id');
            //  Transport "mm-" prefixed classnames.
            [].slice
                .call(panel.classList)
                .filter((classname) => classname.slice(0, 3) === 'mm-')
                .forEach((classname) => {
                wrapper.classList.add(classname);
                panel.classList.remove(classname);
            });
            //  Transport "mm" prefixed data attributes.
            Object.keys(panel.dataset)
                .filter((attr) => attr.slice(0, 2) === 'mm')
                .forEach(attr => {
                wrapper.dataset[attr] = panel.dataset[attr];
                delete panel.dataset[attr];
            });
            //	Wrap the listview in the panel.
            panel.before(wrapper);
            wrapper.append(panel);
            panel = wrapper;
        }
        panel.classList.add('mm-panel');
        //  Append to the panels node if not vertically expanding
        if (!((_a = panel.parentElement) === null || _a === void 0 ? void 0 : _a.matches('.mm-listitem--vertical'))) {
            this.node.pnls.append(panel);
        }
        //  Initialize tha navbar.
        this._initNavbar(panel);
        //  Initialize the listview(s).
        DOM.children(panel, 'ul, ol').forEach((listview) => {
            this._initListview(listview);
        });
        // Observe the panel for added listviews.
        __classPrivateFieldGet(this, _panelObserver).observe(panel, {
            childList: true,
        });
        //	Invoke "after" hook.
        this.trigger('initPanel:after', [panel]);
        return panel;
    }
    /**
     * Initialize a navbar.
     * @param {HTMLElement} panel Panel for the navbar.
     */
    _initNavbar(panel) {
        //	Only one navbar per panel.
        if (DOM.children(panel, '.mm-navbar').length) {
            return;
        }
        /** The parent listitem. */
        let parentListitem = null;
        /** The parent panel. */
        let parentPanel = null;
        //  The parent listitem and parent panel
        if (panel.dataset.mmParent) {
            parentListitem = DOM.find(this.node.pnls, `#${panel.dataset.mmParent}`)[0];
            parentPanel = parentListitem.closest('.mm-panel');
            while (parentPanel.closest('.mm-listitem--vertical')) {
                parentPanel = parentPanel.parentElement.closest('.mm-panel');
            }
        }
        //  No navbar needed for vertical submenus.
        if (parentListitem === null || parentListitem === void 0 ? void 0 : parentListitem.matches('.mm-listitem--vertical')) {
            return;
        }
        //	Invoke "before" hook.
        this.trigger('initNavbar:before', [panel]);
        /** The navbar element. */
        const navbar = DOM.create('div.mm-navbar');
        //  Hide navbar if specified in options.
        if (!this.opts.navbar.add) {
            navbar.classList.add('mm-hidden');
        }
        //  Add the back button.
        if (parentPanel) {
            /** The back button. */
            const prev = DOM.create('a.mm-btn.mm-btn--prev.mm-navbar__btn');
            prev.href = `#${parentPanel.id}`;
            prev.setAttribute('aria-label', this.i18n(this.conf.screenReader.closeSubmenu));
            navbar.append(prev);
        }
        /** The anchor that opens the panel. */
        let opener = null;
        //  The anchor is in a listitem.
        if (parentListitem) {
            opener = DOM.children(parentListitem, '.mm-listitem__text')[0];
        }
        //  The anchor is in a panel.
        else if (parentPanel) {
            opener = DOM.find(parentPanel, 'a[href="#' + panel.id + '"]')[0];
        }
        //  Add the title.
        /** The title */
        const title = DOM.create('a.mm-navbar__title');
        title.tabIndex = -1;
        title.setAttribute('aria-hidden', 'true');
        switch (this.opts.navbar.titleLink) {
            case 'anchor':
                if (opener) {
                    title.href = opener.getAttribute('href');
                }
                break;
            case 'parent':
                if (parentPanel) {
                    title.href = `#${parentPanel.id}`;
                }
                break;
        }
        /** Text in the title */
        const titleText = DOM.create('span');
        titleText.innerHTML =
            panel.dataset.mmTitle ||
                DOM.childText(opener) ||
                this.i18n(this.opts.navbar.title || 'Menu');
        //  Add to DOM
        panel.prepend(navbar);
        navbar.append(title);
        title.append(titleText);
        //	Invoke "after" hook.
        this.trigger('initNavbar:after', [panel]);
    }
    /**
     * Initialize a listview.
     * @param {HTMLElement} listview Listview to initialize.
     */
    _initListview(listview) {
        //  Assert UL
        if (!['htmlulistelement', 'htmlolistelement'].includes(type(listview))) {
            return;
        }
        if (listview.matches('.mm-listview')) {
            return;
        }
        DOM.reClass(listview, this.conf.classNames.nolistview, 'mm-nolistview');
        if (listview.matches('.mm-nolistview')) {
            return;
        }
        //	Invoke "before" hook.
        this.trigger('initListview:before', [listview]);
        listview.classList.add('mm-listview');
        //  Initiate the listitem(s).
        DOM.children(listview).forEach((listitem) => {
            this._initListitem(listitem);
        });
        // Observe the listview for added listitems.
        __classPrivateFieldGet(this, _listviewObserver).observe(listview, {
            childList: true,
        });
        //	Invoke "after" hook.
        this.trigger('initListview:after', [listview]);
    }
    /**
     * Initialte a listitem.
     * @param {HTMLElement} listitem Listitem to initiate.
     */
    _initListitem(listitem) {
        //  Assert LI
        if (!['htmllielement'].includes(type(listitem))) {
            return;
        }
        if (listitem.matches('.mm-listitem')) {
            return;
        }
        DOM.reClass(listitem, this.conf.classNames.divider, 'mm-divider');
        if (listitem.matches('.mm-divider')) {
            return;
        }
        //	Invoke "before" hook.
        this.trigger('initListitem:before', [listitem]);
        listitem.classList.add('mm-listitem');
        DOM.reClass(listitem, this.conf.classNames.selected, 'mm-listitem--selected');
        DOM.children(listitem, 'a, span').forEach((text) => {
            text.classList.add('mm-listitem__text');
        });
        //  Initiate the subpanel.
        DOM.children(listitem, this.conf.panelNodetype.join(', ')).forEach((subpanel) => {
            this._initSubPanel(subpanel);
        });
        // Observe the listitem for added listviews.
        __classPrivateFieldGet(this, _listitemObserver).observe(listitem, {
            childList: true,
        });
        //	Invoke "after" hook.
        this.trigger('initListitem:after', [listitem]);
    }
    /**
     * Initiate a subpanel.
     * @param {HTMLElement} subpanel Subpanel to initiate.
     */
    _initSubPanel(subpanel) {
        if (subpanel.matches('.mm-panel')) {
            return;
        }
        /** The parent element for the panel. */
        const listitem = subpanel.parentElement;
        /** Whether or not the listitem expands vertically */
        const vertical = subpanel.matches('.' + this.conf.classNames.vertical) ||
            !this.opts.slidingSubmenus;
        // Make it expand vertically
        if (vertical) {
            listitem.classList.add('mm-listitem--vertical');
        }
        //  Force an ID
        listitem.id = listitem.id || uniqueId();
        subpanel.id = subpanel.id || uniqueId();
        //  Store parent/child relation
        listitem.dataset.mmChild = subpanel.id;
        subpanel.dataset.mmParent = listitem.id;
        /** The open link. */
        let button = DOM.children(listitem, '.mm-btn')[0];
        //  Init item text
        if (!button) {
            button = DOM.create('a.mm-btn.mm-btn--next.mm-listitem__btn');
            DOM.children(listitem, 'a, span').forEach((text) => {
                //  If the item has no link,
                //      Replace the item with the open link.
                if (text.matches('span')) {
                    button.classList.add('mm-listitem__text');
                    button.innerHTML = text.innerHTML;
                    listitem.insertBefore(button, text.nextElementSibling);
                    text.remove();
                }
                //  Otherwise, insert the button after the text.
                else {
                    listitem.insertBefore(button, text.nextElementSibling);
                }
            });
            button.setAttribute('aria-label', this.i18n(this.conf.screenReader[listitem.matches('.mm-listitem--vertical')
                ? 'toggleSubmenu'
                : 'openSubmenu']));
        }
        button.href = `#${subpanel.id}`;
        this._initPanel(subpanel);
    }
    /**
     * Find and open the correct panel after creating the menu.
     */
    _initOpened() {
        //	Invoke "before" hook.
        this.trigger('initOpened:before');
        /** The selected listitem(s). */
        const listitem = DOM.find(this.node.pnls, '.mm-listitem--selected').pop();
        /**	The current opened panel. */
        let panel = DOM.children(this.node.pnls, '.mm-panel')[0];
        if (listitem) {
            this.setSelected(listitem);
            panel = listitem.closest('.mm-panel');
        }
        //	Open the current opened panel.
        this.openPanel(panel, false, false);
        //	Invoke "after" hook.
        this.trigger('initOpened:after');
    }
    /**
     * Get the translation for a text.
     * @param  {string}     text 	Text to translate.
     * @return {string}		        The translated text.
     */
    i18n(text) {
        return i18n.get(text, this.conf.language);
    }
    /**
     * Get all translations for the given language.
     * @return {object}	The translations.
     */
    static i18n(text = {}, language = '') {
        if (text && language) {
            i18n.add(text, language);
        }
        else {
            return i18n.show();
        }
    }
}
_panelObserver = new WeakMap(), _listviewObserver = new WeakMap(), _listitemObserver = new WeakMap();
/**	Available add-ons for the plugin. */
Mmenu.addons = {};
/**	Globally used HTML elements. */
Mmenu.node = {};
/** Globally used v. */
Mmenu.vars = {};

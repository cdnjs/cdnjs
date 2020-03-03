import version from '../../_version';
import options from './_options';
import configs from './_configs';
import translate from './translations/translate';
import * as DOM from '../../_modules/dom';
import * as i18n from '../../_modules/i18n';
import * as media from '../../_modules/matchmedia';
import { type, extend, transitionend, uniqueId, valueOrFn } from '../../_modules/helpers';
//  Add the translations.
translate();
/**
 * Class for a mobile menu.
 */
var Mmenu = /** @class */ (function () {
    /**
     * Create a mobile menu.
     * @param {HTMLElement|string} 	menu						The menu node.
     * @param {object} 				[options=Mmenu.options]		Options for the menu.
     * @param {object} 				[configs=Mmenu.configs]		Configuration options for the menu.
     */
    function Mmenu(menu, options, configs) {
        //	Extend options and configuration from defaults.
        this.opts = extend(options, Mmenu.options);
        this.conf = extend(configs, Mmenu.configs);
        //	Methods to expose in the API.
        this._api = [
            'bind',
            'initPanel',
            'initListview',
            'openPanel',
            'closePanel',
            'closeAllPanels',
            'setSelected'
        ];
        //	Storage objects for nodes, variables, hooks and click handlers.
        this.node = {};
        this.vars = {};
        this.hook = {};
        this.clck = [];
        //	Get menu node from string or element.
        this.node.menu =
            typeof menu == 'string' ? document.querySelector(menu) : menu;
        if (typeof this._deprecatedWarnings == 'function') {
            this._deprecatedWarnings();
        }
        this._initWrappers();
        this._initAddons();
        this._initExtensions();
        this._initHooks();
        this._initAPI();
        this._initMenu();
        this._initPanels();
        this._initOpened();
        this._initAnchors();
        media.watch();
        return this;
    }
    /**
     * Open a panel.
     * @param {HTMLElement} panel				Panel to open.
     * @param {boolean}		[animation=true]	Whether or not to open the panel with an animation.
     */
    Mmenu.prototype.openPanel = function (panel, animation) {
        var _this = this;
        //	Invoke "before" hook.
        this.trigger('openPanel:before', [panel]);
        //	Find panel.
        if (!panel) {
            return;
        }
        if (!panel.matches('.mm-panel')) {
            panel = panel.closest('.mm-panel');
        }
        if (!panel) {
            return;
        }
        //	/Find panel.
        if (typeof animation != 'boolean') {
            animation = true;
        }
        //	Open a "vertical" panel.
        if (panel.parentElement.matches('.mm-listitem_vertical')) {
            //	Open current and all vertical parent panels.
            DOM.parents(panel, '.mm-listitem_vertical').forEach(function (listitem) {
                listitem.classList.add('mm-listitem_opened');
                DOM.children(listitem, '.mm-panel').forEach(function (panel) {
                    panel.classList.remove('mm-hidden');
                });
            });
            //	Open first non-vertical parent panel.
            var parents = DOM.parents(panel, '.mm-panel').filter(function (panel) { return !panel.parentElement.matches('.mm-listitem_vertical'); });
            this.trigger('openPanel:start', [panel]);
            if (parents.length) {
                this.openPanel(parents[0]);
            }
            this.trigger('openPanel:finish', [panel]);
            //	Open a "horizontal" panel.
        }
        else {
            if (panel.matches('.mm-panel_opened')) {
                return;
            }
            var panels = DOM.children(this.node.pnls, '.mm-panel'), current_1 = DOM.children(this.node.pnls, '.mm-panel_opened')[0];
            //	Close all child panels.
            panels
                .filter(function (parent) { return parent !== panel; })
                .forEach(function (parent) {
                parent.classList.remove('mm-panel_opened-parent');
            });
            //	Open all parent panels.
            var parent_1 = panel['mmParent'];
            while (parent_1) {
                parent_1 = parent_1.closest('.mm-panel');
                if (parent_1) {
                    if (!parent_1.parentElement.matches('.mm-listitem_vertical')) {
                        parent_1.classList.add('mm-panel_opened-parent');
                    }
                    parent_1 = parent_1['mmParent'];
                }
            }
            //	Add classes for animation.
            panels.forEach(function (panel) {
                panel.classList.remove('mm-panel_highest');
            });
            panels
                .filter(function (hidden) { return hidden !== current_1; })
                .filter(function (hidden) { return hidden !== panel; })
                .forEach(function (hidden) {
                hidden.classList.add('mm-hidden');
            });
            panel.classList.remove('mm-hidden');
            /**	Start opening the panel. */
            var openPanelStart_1 = function () {
                if (current_1) {
                    current_1.classList.remove('mm-panel_opened');
                }
                panel.classList.add('mm-panel_opened');
                if (panel.matches('.mm-panel_opened-parent')) {
                    if (current_1) {
                        current_1.classList.add('mm-panel_highest');
                    }
                    panel.classList.remove('mm-panel_opened-parent');
                }
                else {
                    if (current_1) {
                        current_1.classList.add('mm-panel_opened-parent');
                    }
                    panel.classList.add('mm-panel_highest');
                }
                //	Invoke "start" hook.
                _this.trigger('openPanel:start', [panel]);
            };
            /**	Finish opening the panel. */
            var openPanelFinish_1 = function () {
                if (current_1) {
                    current_1.classList.remove('mm-panel_highest');
                    current_1.classList.add('mm-hidden');
                }
                panel.classList.remove('mm-panel_highest');
                //	Invoke "finish" hook.
                _this.trigger('openPanel:finish', [panel]);
            };
            if (animation && !panel.matches('.mm-panel_noanimation')) {
                //	Without the timeout the animation will not work because the element had display: none;
                setTimeout(function () {
                    //	Callback
                    transitionend(panel, function () {
                        openPanelFinish_1();
                    }, _this.conf.transitionDuration);
                    openPanelStart_1();
                }, this.conf.openingInterval);
            }
            else {
                openPanelStart_1();
                openPanelFinish_1();
            }
        }
        //	Invoke "after" hook.
        this.trigger('openPanel:after', [panel]);
    };
    /**
     * Close a panel.
     * @param {HTMLElement} panel Panel to close.
     */
    Mmenu.prototype.closePanel = function (panel) {
        //	Invoke "before" hook.
        this.trigger('closePanel:before', [panel]);
        var li = panel.parentElement;
        //	Only works for "vertical" panels.
        if (li.matches('.mm-listitem_vertical')) {
            li.classList.remove('mm-listitem_opened');
            panel.classList.add('mm-hidden');
            //	Invoke main hook.
            this.trigger('closePanel', [panel]);
        }
        //	Invoke "after" hook.
        this.trigger('closePanel:after', [panel]);
    };
    /**
     * Close all opened panels.
     * @param {HTMLElement} panel Panel to open after closing all other panels.
     */
    Mmenu.prototype.closeAllPanels = function (panel) {
        //	Invoke "before" hook.
        this.trigger('closeAllPanels:before');
        //	Close all "vertical" panels.
        var listitems = this.node.pnls.querySelectorAll('.mm-listitem');
        listitems.forEach(function (listitem) {
            listitem.classList.remove('mm-listitem_selected');
            listitem.classList.remove('mm-listitem_opened');
        });
        //	Close all "horizontal" panels.
        var panels = DOM.children(this.node.pnls, '.mm-panel'), opened = panel ? panel : panels[0];
        DOM.children(this.node.pnls, '.mm-panel').forEach(function (panel) {
            if (panel !== opened) {
                panel.classList.remove('mm-panel_opened');
                panel.classList.remove('mm-panel_opened-parent');
                panel.classList.remove('mm-panel_highest');
                panel.classList.add('mm-hidden');
            }
        });
        //	Open first panel.
        this.openPanel(opened, false);
        //	Invoke "after" hook.
        this.trigger('closeAllPanels:after');
    };
    /**
     * Toggle a panel opened/closed.
     * @param {HTMLElement} panel Panel to open or close.
     */
    Mmenu.prototype.togglePanel = function (panel) {
        var listitem = panel.parentElement;
        //	Only works for "vertical" panels.
        if (listitem.matches('.mm-listitem_vertical')) {
            this[listitem.matches('.mm-listitem_opened')
                ? 'closePanel'
                : 'openPanel'](panel);
        }
    };
    /**
     * Display a listitem as being "selected".
     * @param {HTMLElement} listitem Listitem to mark.
     */
    Mmenu.prototype.setSelected = function (listitem) {
        //	Invoke "before" hook.
        this.trigger('setSelected:before', [listitem]);
        //	First, remove the selected class from all listitems.
        DOM.find(this.node.menu, '.mm-listitem_selected').forEach(function (li) {
            li.classList.remove('mm-listitem_selected');
        });
        //	Next, add the selected class to the provided listitem.
        listitem.classList.add('mm-listitem_selected');
        //	Invoke "after" hook.
        this.trigger('setSelected:after', [listitem]);
    };
    /**
     * Bind functions to a hook (subscriber).
     * @param {string} 		hook The hook.
     * @param {function} 	func The function.
     */
    Mmenu.prototype.bind = function (hook, func) {
        //	Create an array for the hook if it does not yet excist.
        this.hook[hook] = this.hook[hook] || [];
        //	Push the function to the array.
        this.hook[hook].push(func);
    };
    /**
     * Invoke the functions bound to a hook (publisher).
     * @param {string} 	hook  	The hook.
     * @param {array}	[args] 	Arguments for the function.
     */
    Mmenu.prototype.trigger = function (hook, args) {
        if (this.hook[hook]) {
            for (var h = 0, l = this.hook[hook].length; h < l; h++) {
                this.hook[hook][h].apply(this, args);
            }
        }
    };
    /**
     * Create the API.
     */
    Mmenu.prototype._initAPI = function () {
        var _this = this;
        //	We need this=that because:
        //	1) the "arguments" object can not be referenced in an arrow function in ES3 and ES5.
        var that = this;
        this.API = {};
        this._api.forEach(function (fn) {
            _this.API[fn] = function () {
                var re = that[fn].apply(that, arguments); // 1)
                return typeof re == 'undefined' ? that.API : re;
            };
        });
        //	Store the API in the HTML node for external usage.
        this.node.menu['mmApi'] = this.API;
    };
    /**
     * Bind the hooks specified in the options (publisher).
     */
    Mmenu.prototype._initHooks = function () {
        for (var hook in this.opts.hooks) {
            this.bind(hook, this.opts.hooks[hook]);
        }
    };
    /**
     * Initialize the wrappers specified in the options.
     */
    Mmenu.prototype._initWrappers = function () {
        //	Invoke "before" hook.
        this.trigger('initWrappers:before');
        for (var w = 0; w < this.opts.wrappers.length; w++) {
            var wrpr = Mmenu.wrappers[this.opts.wrappers[w]];
            if (typeof wrpr == 'function') {
                wrpr.call(this);
            }
        }
        //	Invoke "after" hook.
        this.trigger('initWrappers:after');
    };
    /**
     * Initialize all available add-ons.
     */
    Mmenu.prototype._initAddons = function () {
        //	Invoke "before" hook.
        this.trigger('initAddons:before');
        for (var addon in Mmenu.addons) {
            Mmenu.addons[addon].call(this);
        }
        //	Invoke "after" hook.
        this.trigger('initAddons:after');
    };
    /**
     * Initialize the extensions specified in the options.
     */
    Mmenu.prototype._initExtensions = function () {
        var _this = this;
        //	Invoke "before" hook.
        this.trigger('initExtensions:before');
        //	Convert array to object with array.
        if (type(this.opts.extensions) == 'array') {
            this.opts.extensions = {
                all: this.opts.extensions
            };
        }
        //	Loop over object.
        Object.keys(this.opts.extensions).forEach(function (query) {
            var classnames = _this.opts.extensions[query].map(function (extension) { return 'mm-menu_' + extension; });
            if (classnames.length) {
                media.add(query, function () {
                    //  IE11:
                    classnames.forEach(function (classname) {
                        _this.node.menu.classList.add(classname);
                    });
                    //  Better browsers:
                    // this.node.menu.classList.add(...classnames);
                }, function () {
                    //  IE11:
                    classnames.forEach(function (classname) {
                        _this.node.menu.classList.remove(classname);
                    });
                    //  Better browsers:
                    // this.node.menu.classList.remove(...classnames);
                });
            }
        });
        //	Invoke "after" hook.
        this.trigger('initExtensions:after');
    };
    /**
     * Initialize the menu.
     */
    Mmenu.prototype._initMenu = function () {
        var _this = this;
        //	Invoke "before" hook.
        this.trigger('initMenu:before');
        //	Add class to the wrapper.
        this.node.wrpr = this.node.wrpr || this.node.menu.parentElement;
        this.node.wrpr.classList.add('mm-wrapper');
        //	Add an ID to the menu if it does not yet have one.
        this.node.menu.id = this.node.menu.id || uniqueId();
        //	Wrap the panels in a node.
        var panels = DOM.create('div.mm-panels');
        DOM.children(this.node.menu).forEach(function (panel) {
            if (_this.conf.panelNodetype.indexOf(panel.nodeName.toLowerCase()) >
                -1) {
                panels.append(panel);
            }
        });
        this.node.menu.append(panels);
        this.node.pnls = panels;
        //	Add class to the menu.
        this.node.menu.classList.add('mm-menu');
        //	Invoke "after" hook.
        this.trigger('initMenu:after');
    };
    /**
     * Initialize panels.
     */
    Mmenu.prototype._initPanels = function () {
        var _this = this;
        //	Invoke "before" hook.
        this.trigger('initPanels:before');
        //	Open / close panels.
        this.clck.push(function (anchor, args) {
            if (args.inMenu) {
                var href = anchor.getAttribute('href');
                if (href && href.length > 1 && href.slice(0, 1) == '#') {
                    try {
                        var panel = DOM.find(_this.node.menu, href)[0];
                        if (panel && panel.matches('.mm-panel')) {
                            if (anchor.parentElement.matches('.mm-listitem_vertical')) {
                                _this.togglePanel(panel);
                            }
                            else {
                                _this.openPanel(panel);
                            }
                            return true;
                        }
                    }
                    catch (err) { }
                }
            }
        });
        /** The panels to initiate */
        var panels = DOM.children(this.node.pnls);
        panels.forEach(function (panel) {
            _this.initPanel(panel);
        });
        //	Invoke "after" hook.
        this.trigger('initPanels:after');
    };
    /**
     * Initialize a single panel and its children.
     * @param {HTMLElement} panel The panel to initialize.
     */
    Mmenu.prototype.initPanel = function (panel) {
        var _this = this;
        /** Query selector for possible node-types for panels. */
        var panelNodetype = this.conf.panelNodetype.join(', ');
        if (panel.matches(panelNodetype)) {
            //  Only once
            if (!panel.matches('.mm-panel')) {
                panel = this._initPanel(panel);
            }
            if (panel) {
                /** The sub panels. */
                var children_1 = [];
                //	Find panel > panel
                children_1.push.apply(children_1, DOM.children(panel, '.' + this.conf.classNames.panel));
                //	Find panel listitem > panel
                DOM.children(panel, '.mm-listview').forEach(function (listview) {
                    DOM.children(listview, '.mm-listitem').forEach(function (listitem) {
                        children_1.push.apply(children_1, DOM.children(listitem, panelNodetype));
                    });
                });
                //  Initiate subpanel(s).
                children_1.forEach(function (child) {
                    _this.initPanel(child);
                });
            }
        }
    };
    /**
     * Initialize a single panel.
     * @param  {HTMLElement} 		panel 	Panel to initialize.
     * @return {HTMLElement|null} 			Initialized panel.
     */
    Mmenu.prototype._initPanel = function (panel) {
        var _this = this;
        //	Invoke "before" hook.
        this.trigger('initPanel:before', [panel]);
        //	Refactor panel classnames
        DOM.reClass(panel, this.conf.classNames.panel, 'mm-panel');
        DOM.reClass(panel, this.conf.classNames.nopanel, 'mm-nopanel');
        DOM.reClass(panel, this.conf.classNames.inset, 'mm-listview_inset');
        if (panel.matches('.mm-listview_inset')) {
            panel.classList.add('mm-nopanel');
        }
        //	Stop if not supposed to be a panel.
        if (panel.matches('.mm-nopanel')) {
            return null;
        }
        /** The original ID on the node. */
        var id = panel.id || uniqueId();
        //  Vertical panel.
        var vertical = panel.matches('.' + this.conf.classNames.vertical) ||
            !this.opts.slidingSubmenus;
        panel.classList.remove(this.conf.classNames.vertical);
        //	Wrap UL/OL in DIV
        if (panel.matches('ul, ol')) {
            panel.removeAttribute('id');
            /** The panel. */
            var wrapper = DOM.create('div');
            //	Wrap the listview in the panel.
            panel.before(wrapper);
            wrapper.append(panel);
            panel = wrapper;
        }
        panel.id = id;
        panel.classList.add('mm-panel');
        panel.classList.add('mm-hidden');
        /** The parent listitem. */
        var parent = [panel.parentElement].filter(function (listitem) {
            return listitem.matches('li');
        })[0];
        if (vertical) {
            if (parent) {
                parent.classList.add('mm-listitem_vertical');
            }
        }
        else {
            this.node.pnls.append(panel);
        }
        if (parent) {
            //	Store parent/child relation.
            parent['mmChild'] = panel;
            panel['mmParent'] = parent;
            //	Add open link to parent listitem
            if (parent && parent.matches('.mm-listitem')) {
                if (!DOM.children(parent, '.mm-btn').length) {
                    /** The text node. */
                    var item = DOM.children(parent, '.mm-listitem__text')[0];
                    if (item) {
                        /** The open link. */
                        var button = DOM.create('a.mm-btn.mm-btn_next.mm-listitem__btn');
                        button.setAttribute('href', '#' + panel.id);
                        //  If the item has no link,
                        //      Replace the item with the open link.
                        if (item.matches('span')) {
                            button.classList.add('mm-listitem__text');
                            button.innerHTML = item.innerHTML;
                            parent.insertBefore(button, item.nextElementSibling);
                            item.remove();
                        }
                        //  Otherwise, insert the button after the text.
                        else {
                            parent.insertBefore(button, DOM.children(parent, '.mm-panel')[0]);
                        }
                    }
                }
            }
        }
        this._initNavbar(panel);
        DOM.children(panel, 'ul, ol').forEach(function (listview) {
            _this.initListview(listview);
        });
        //	Invoke "after" hook.
        this.trigger('initPanel:after', [panel]);
        return panel;
    };
    /**
     * Initialize a navbar.
     * @param {HTMLElement} panel Panel for the navbar.
     */
    Mmenu.prototype._initNavbar = function (panel) {
        //	Invoke "before" hook.
        this.trigger('initNavbar:before', [panel]);
        //	Only one navbar per panel.
        if (DOM.children(panel, '.mm-navbar').length) {
            return;
        }
        /** The parent listitem. */
        var parentListitem = null;
        /** The parent panel. */
        var parentPanel = null;
        //  The parent panel was specified in the data-mm-parent attribute.
        if (panel.getAttribute('data-mm-parent')) {
            parentPanel = DOM.find(this.node.pnls, panel.getAttribute('data-mm-parent'))[0];
        }
        // if (panel.dataset.mmParent) { // IE10 has no dataset
        // parentPanel = DOM.find(this.node.pnls, panel.dataset.mmParent)[0];
        // }
        //  The parent panel from a listitem.
        else {
            parentListitem = panel['mmParent'];
            if (parentListitem) {
                parentPanel = parentListitem.closest('.mm-panel');
            }
        }
        //  No navbar needed for vertical submenus.
        if (parentListitem && parentListitem.matches('.mm-listitem_vertical')) {
            return;
        }
        /** The navbar element. */
        var navbar = DOM.create('div.mm-navbar');
        //  Hide navbar if specified in options.
        if (!this.opts.navbar.add) {
            navbar.classList.add('mm-hidden');
        }
        //  Sticky navbars.
        else if (this.opts.navbar.sticky) {
            navbar.classList.add('mm-navbar_sticky');
        }
        //  Add the back button.
        if (parentPanel) {
            /** The back button. */
            var prev = DOM.create('a.mm-btn.mm-btn_prev.mm-navbar__btn');
            prev.setAttribute('href', '#' + parentPanel.id);
            navbar.append(prev);
        }
        /** The anchor that opens the panel. */
        var opener = null;
        //  The anchor is in a listitem.
        if (parentListitem) {
            opener = DOM.children(parentListitem, '.mm-listitem__text')[0];
        }
        //  The anchor is in a panel.
        else if (parentPanel) {
            opener = DOM.find(parentPanel, 'a[href="#' + panel.id + '"]')[0];
        }
        //  Add the title.
        var title = DOM.create('a.mm-navbar__title');
        var titleText = DOM.create('span');
        title.append(titleText);
        titleText.innerHTML =
            // panel.dataset.mmTitle || // IE10 has no dataset :(
            panel.getAttribute('data-mm-title') ||
                (opener ? opener.textContent : '') ||
                this.i18n(this.opts.navbar.title) ||
                this.i18n('Menu');
        switch (this.opts.navbar.titleLink) {
            case 'anchor':
                if (opener) {
                    title.setAttribute('href', opener.getAttribute('href'));
                }
                break;
            case 'parent':
                if (parentPanel) {
                    title.setAttribute('href', '#' + parentPanel.id);
                }
                break;
        }
        navbar.append(title);
        panel.prepend(navbar);
        //	Invoke "after" hook.
        this.trigger('initNavbar:after', [panel]);
    };
    /**
     * Initialize a listview.
     * @param {HTMLElement} listview Listview to initialize.
     */
    Mmenu.prototype.initListview = function (listview) {
        var _this = this;
        //	Invoke "before" hook.
        this.trigger('initListview:before', [listview]);
        DOM.reClass(listview, this.conf.classNames.nolistview, 'mm-nolistview');
        if (!listview.matches('.mm-nolistview')) {
            listview.classList.add('mm-listview');
            DOM.children(listview).forEach(function (listitem) {
                listitem.classList.add('mm-listitem');
                DOM.reClass(listitem, _this.conf.classNames.selected, 'mm-listitem_selected');
                DOM.children(listitem, 'a, span').forEach(function (item) {
                    if (!item.matches('.mm-btn')) {
                        item.classList.add('mm-listitem__text');
                    }
                });
            });
        }
        //	Invoke "after" hook.
        this.trigger('initListview:after', [listview]);
    };
    /**
     * Find and open the correct panel after creating the menu.
     */
    Mmenu.prototype._initOpened = function () {
        //	Invoke "before" hook.
        this.trigger('initOpened:before');
        /** The selected listitem(s). */
        var listitems = this.node.pnls.querySelectorAll('.mm-listitem_selected');
        /** The last selected listitem. */
        var lastitem = null;
        //	Deselect the listitems.
        listitems.forEach(function (listitem) {
            lastitem = listitem;
            listitem.classList.remove('mm-listitem_selected');
        });
        //	Re-select the last listitem.
        if (lastitem) {
            lastitem.classList.add('mm-listitem_selected');
        }
        /**	The current opened panel. */
        var current = lastitem
            ? lastitem.closest('.mm-panel')
            : DOM.children(this.node.pnls, '.mm-panel')[0];
        //	Open the current opened panel.
        this.openPanel(current, false);
        //	Invoke "after" hook.
        this.trigger('initOpened:after');
    };
    /**
     * Initialize anchors in / for the menu.
     */
    Mmenu.prototype._initAnchors = function () {
        var _this = this;
        //	Invoke "before" hook.
        this.trigger('initAnchors:before');
        document.addEventListener('click', function (evnt) {
            /** The clicked element. */
            var target = evnt.target.closest('a[href]');
            if (!target) {
                return;
            }
            /** Arguments passed to the bound methods. */
            var args = {
                inMenu: target.closest('.mm-menu') === _this.node.menu,
                inListview: target.matches('.mm-listitem > a'),
                toExternal: target.matches('[rel="external"]') ||
                    target.matches('[target="_blank"]')
            };
            var onClick = {
                close: null,
                setSelected: null,
                preventDefault: target.getAttribute('href').slice(0, 1) == '#'
            };
            //	Find hooked behavior.
            for (var c = 0; c < _this.clck.length; c++) {
                var click = _this.clck[c].call(_this, target, args);
                if (click) {
                    if (typeof click == 'boolean') {
                        evnt.preventDefault();
                        return;
                    }
                    if (type(click) == 'object') {
                        onClick = extend(click, onClick);
                    }
                }
            }
            //	Default behavior for anchors in lists.
            if (args.inMenu && args.inListview && !args.toExternal) {
                //	Set selected item, Default: true
                if (valueOrFn(target, _this.opts.onClick.setSelected, onClick.setSelected)) {
                    _this.setSelected(target.parentElement);
                }
                //	Prevent default / don't follow link. Default: false.
                if (valueOrFn(target, _this.opts.onClick.preventDefault, onClick.preventDefault)) {
                    evnt.preventDefault();
                }
                //	Close menu. Default: false
                if (valueOrFn(target, _this.opts.onClick.close, onClick.close)) {
                    if (_this.opts.offCanvas &&
                        typeof _this.close == 'function') {
                        _this.close();
                    }
                }
            }
        }, true);
        //	Invoke "after" hook.
        this.trigger('initAnchors:after');
    };
    /**
     * Get the translation for a text.
     * @param  {string} text 	Text to translate.
     * @return {string}			The translated text.
     */
    Mmenu.prototype.i18n = function (text) {
        return i18n.get(text, this.conf.language);
    };
    /**	Plugin version. */
    Mmenu.version = version;
    /**	Default options for menus. */
    Mmenu.options = options;
    /**	Default configuration for menus. */
    Mmenu.configs = configs;
    /**	Available add-ons for the plugin. */
    Mmenu.addons = {};
    /** Available wrappers for the plugin. */
    Mmenu.wrappers = {};
    /**	Globally used HTML elements. */
    Mmenu.node = {};
    /** Globally used variables. */
    Mmenu.vars = {};
    return Mmenu;
}());
export default Mmenu;

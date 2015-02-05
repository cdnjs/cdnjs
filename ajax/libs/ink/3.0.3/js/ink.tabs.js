/**
 * Display tabbed content
 * @module Ink.UI.Tabs_1
 * @version 1
 */
Ink.createModule('Ink.UI.Tabs', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1'], function(Common, Event, Css, Element, Selector) {
    'use strict';

    /**
     * The Tabs Component offers a simple way to build a tab-separated layout, allowing you to offer multiple content in the same space with intuitive navigation.
     * This component requires your markup to have:
     * - A container element (this is what you call the Ink.UI.Tabs constructor on), containing everything.
     * - An element with the `tabs-nav` class, to contain links.
     * - Your links with `href="#ID_OF_SECTION"`
     * - Your sections with the corresponding `id` attributes and the `tabs-content` class.
     * - The content for each section.
     *
     * When the user clicks in the links inside `tabs-nav`, the tab with the corresponding ID is then activated. The active tab when the tab component is initialized has its hash in the browser URL. If there is no hash, then the `active` option kicks in. Otherwise, Tabs will fall back to showing the tab corresponding to the first link.
     * You can disable some (or all) tabs by passing an array for the `disabled` option.
     *
     * @class Ink.UI.Tabs
     * @constructor
     * @version 1
     * @param {String|DOMElement}   selector
     * @param {Object}              [options]                       Options
     * @param {Boolean}             [options.preventUrlChange]      Flag that determines if follows the link on click or stops the event
     * @param {String}              [options.active]                ID of the tab to activate on creation
     * @param {Array}               [options.disabled]              IDs of the tabs that will be disabled on creation
     * @param {Function}            [options.onBeforeChange]        Callback to be executed before changing tabs
     * @param {Function}            [options.onChange]              Callback to be executed after changing tabs
     * 
     * @param {String}              [options.menuSelector='.tabs-nav'] Selector to find the menu element
     * @param {String}              [options.contentSelector='.tabs-content'] Selector to find the menu element
     * @param {String}              [options.tabSelector='.tabs-tab'] Selector to find the menu element
     *
     * @param {Boolean}             [options.triggerEventsOnLoad]   Trigger the above events when the page is loaded.
     *
     * @sample Ink_UI_Tabs_1.html
     */
    function Tabs() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    Tabs._name = 'Tabs_1';

    Tabs._optionDefinition = {
        preventUrlChange:   ['Boolean', false],
        active:             ['String', undefined],
        disabled:           ['Object', []],
        onBeforeChange:     ['Function', undefined],
        onChange:           ['Function', undefined],
        menuSelector:       ['String', '.tabs-nav'],
        contentSelector:    ['String', '.tabs-content'],
        tabSelector:        ['String', '.tabs-tab'],
        triggerEventsOnLoad:['Boolean', true]
    };

    Tabs.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function() {
            this._handlers = {
                resize: Ink.bindEvent(Event.throttle(this._onResize, 100),this)
            };

            this._menu = Selector.select(this._options.menuSelector, this._element)[0];

            if (!this._menu) {
                Ink.warn('Ink.UI.Tabs: An element selected by ".tabs-nav" needs to exist inside the element!');
                return;
            }

            //initialization of the tabs, hides all content before setting the active tab
            this._initializeDom();

            // subscribe events
            this._observe();

            //sets the first active tab
            this._setFirstActive();

            this._handlers.resize();
        },

        /**
         * Initialization of the tabs, hides all content before setting the active tab
         * 
         * @method _initializeDom
         * @private
         */
        _initializeDom: function(){
            var contentTabs = Selector.select(this._options.contentSelector, this._element);

            for(var i = 0; i < contentTabs.length; i++){
                Css.addClassName(contentTabs[i], 'hide-all');
            }
        },

        /**
         * Subscribe events
         * 
         * @method _observe
         * @private
         */
        _observe: function() {
            Event.on(this._menu, 'click', 'a', Ink.bindMethod(this, '_onTabClickedGeneric'));
            Event.observe(window, 'resize', this._handlers.resize);
        },

        /**
         * Run at instantiation, to determine which is the first active tab
         * fallsback from window.location.href to options.active to the first not disabled tab
         * 
         * @method _setFirstActive
         * @private
         */
        _setFirstActive: function() {
            var hash = window.location.hash;

            var activeMenuLink = this._findLinkByHref(hash) ||
                                 (this._options.active && this._findLinkByHref(this._options.active)) ||
                                 Selector.select('a', this._menu)[0];

            if (activeMenuLink) {
                this._changeTab(activeMenuLink, this._options.triggerEventsOnLoad);
            }
        },

        /**
         * Changes to the desired tab
         * 
         * @method _changeTab
         * @param {DOMElement} link             anchor linking to the content container
         * @param {boolean}    runCallbacks     defines if the callbacks should be run or not
         * @private
         */
        _changeTab: function(link, runCallbacks){
            if(runCallbacks && typeof this._options.onBeforeChange !== 'undefined'){
                this._options.onBeforeChange(this);
            }

            var selector = link.getAttribute('href');
            if (this._activeMenuTab) {
                Css.removeClassName(this._activeMenuTab, 'active');
                Css.removeClassName(this._activeContentTab, 'active');
                Css.addClassName(this._activeContentTab, 'hide-all');
            }

            this._activeMenuLink = link;
            this._activeMenuTab = this._activeMenuLink.parentNode;
            this._activeContentTab = Selector.select(selector.substr(selector.indexOf('#')), this._element)[0];

            if (!this._activeContentTab) {
                this._activeMenuLink = this._activeMenuTab = this._activeContentTab = null;
                return;
            }

            Css.addClassName(this._activeMenuTab, 'active');
            Css.addClassName(this._activeContentTab, 'active');
            Css.removeClassName(this._activeContentTab, 'hide-all');

            if(runCallbacks && typeof(this._options.onChange) !== 'undefined'){
                this._options.onChange(this);
            }
        },

        /**
         * Generic Tab clicked handler.
         * Just calls _onTabClicked or _onDisabledTabClicked
         *
         * @private
         **/
        _onTabClickedGeneric: function (event) {
            event.preventDefault();
            if (!Css.hasClassName(event.currentTarget, 'ink-disabled')) {
                this._onTabClicked(event.currentTarget);
            }
        },

        /**
         * Tab clicked handler
         * 
         * @method _onTabClicked
         * @param {Event} ev
         * @private
         */
        _onTabClicked: function(tabElm) {
            var href = tabElm.getAttribute('href');
            href = href.substr(href.indexOf('#'));

            if (!href || Ink.i(href.replace(/^#/, '')) === null) {
                return;
            }

            if (!this._options.preventUrlChange) {
                window.location.hash = href;
            }

            if (tabElm === this._activeMenuLink) {
                return;
            }
            this.changeTab(tabElm);
        },

        /**
         * Resize handler
         * 
         * @method _onResize
         * @private
         */
        _onResize: function(){
            var currentLayout = Common.currentLayout();
            if(currentLayout === this._lastLayout){
                return;
            }

            // wtf
            var smallLayout =
                currentLayout === Common.Layouts.TINY ||
                currentLayout === Common.Layouts.SMALL ||
                currentLayout === Common.Layouts.MEDIUM;

            if(smallLayout){
                Css.removeClassName(this._menu, 'menu');
                Css.removeClassName(this._menu, 'horizontal');
                // Css.addClassName(this._menu, 'pills');
            } else {
                Css.addClassName(this._menu, 'menu');
                Css.addClassName(this._menu, 'horizontal');
                // Css.removeClassName(this._menu, 'pills');
            }
            this._lastLayout = currentLayout;
        },

        /*****************
         * Aux Functions *
         *****************/

        /**
         * Allows the hash to be passed with or without the cardinal sign
         * 
         * @method _hashify
         * @param {String} hash     the string to be hashified
         * @return {String} Resulting hash
         * @private
         */
        _hashify: function(hash){
            if(!hash){
                return "";
            }
            return hash.indexOf('#') === 0? hash : '#' + hash;
        },

        /**
         * Returns the anchor with the desired href
         * 
         * @method _findLinkBuHref
         * @param {String} href     the href to be found on the returned link
         * @return {String|undefined} [description]
         * @private
         */
        _findLinkByHref: function(href){
            href = this._hashify(href);

            // Find a link which has a href ending with...
            return Selector.select('a[href$="' + href + '"]', this._menu)[0];
        },

        /**************
         * PUBLIC API *
         **************/

        /**
         * Changes the active tab
         *
         * Pass a selector/element identifying what tab you want
         * 
         * @method changeTab
         * @param {String|DOMElement} selector      Selector of the desired tab or the link that links to it
         * @public
         */
        changeTab: function(selector) {
            var element = (selector.nodeType === 1)? selector : this._findLinkByHref(this._hashify(selector));
            if(!element || Css.hasClassName(element, 'ink-disabled')){
                return;
            }
            this._changeTab(element, true);
        },

        /**
         * The enable() and disable() functions do exactly the same thing.
         * one adds the className and the other removes it.
         **/
        _enableOrDisableDRY: function (selector, isEnable) {
            var element = (selector.nodeType === 1)? selector : this._findLinkByHref(this._hashify(selector));
            if(!element){
                return;
            }
            Css.setClassName(element, 'ink-disabled', !isEnable);
        },

        /**
         * Disables the desired tag
         * 
         * @method disable
         * @param {String|DOMElement} selector      the id of the desired tab or the link that links to it
         * @public
         */
        disable: function(selector){
            this._enableOrDisableDRY(selector, false);
        },

        /**
         * Enables the desired tag
         * 
         * @method enable
         * @param {String|DOMElement} selector      The id of the desired tab or the link that links to it
         * @public
         */
        enable: function(selector){
            this._enableOrDisableDRY(selector, true);
        },

        /***********
         * Getters *
         ***********/

        /**
         * Returns the active tab id
         * 
         * @method activeTab
         * @return {String} ID of the active tab.
         * @public
         */
        activeTab: function(){
            return this._activeContentTab.getAttribute('id');
        },

        /**
         *
         * Returns the parent of the currently active menu link.
         *
         * This is useful if you want to have `li` elements wrapping your links
         * and want to access the currently visible one.
         *
         * (This method is deprecated)
         * @method activeMenuTab
         * @deprecated
         * @return {DOMElement|null} Active menu LI, or `null` if there is none.
         * @public
         */
        activeMenuTab: function(){
            // [3.1.0] remove this
            Ink.warn('Ink.UI.Tabs.activeMenuTab() is deprecated');
            return this._activeMenuTab;
        },

        /**
         * Gets the currently active Menu link (the links which the user clicks on to change tabs)
         * 
         * @method activeMenuLink
         * @return {DOMElement|null} Active menu link, or `null` if there is none.
         * @public
         */
        activeMenuLink: function(){
            return this._activeMenuLink;
        },

        /**
         * Gets the currently active section
         *
         * (Each section contains content for a tab, and must have an `id` attribute)
         * 
         * @method activeContentTab
         * @return {DOMElement|null} Active section, or `null` if there is none.
         * @public
         */
        activeContentTab: function(){
            return this._activeContentTab;
        },

        /**
         * Unregisters the component and removes its markup
         * 
         * @method destroy
         * @public
         */
        destroy: Common.destroyComponent
    };

    Common.createUIComponent(Tabs);

    return Tabs;

});

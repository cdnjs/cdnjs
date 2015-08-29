/**
 * Display tabbed content
 * @module Ink.UI.Tabs_1
 * @version 1
 */
Ink.createModule('Ink.UI.Tabs', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1'], function(Common, Event, Css, Element, Selector) {
    'use strict';

    /**
     * The Tabs Component offers a simple way to build a tab-separated layout, allowing you to offer multiple content panes in the same space with intuitive navigation.
     * This component requires your markup to have:
     * - A container element (this is what you call the Ink.UI.Tabs constructor on), containing everything below.
     * - An element with the `tabs-nav` class, to contain links.
     * - Your links with `href="#ID_OF_SECTION"`
     * - Your sections with the corresponding `id` attributes and the `tabs-content` class.
     * - The content for each section.
     *
     * When the user clicks in the links inside `tabs-nav`, the tab with the corresponding ID is then activated. The active tab when the tab component is initialized has its hash in the browser URL. If there is no hash, then the `active` option kicks in. Otherwise, Tabs will fall back to showing the tab corresponding to the first link.
     *
     * You can disable some (or all) tabs by passing an array for the `disabled` option, or by adding the `ink-disabled` class to tab links.
     *
     * @class Ink.UI.Tabs
     * @constructor
     * @version 1
     * @param {String|Element}      selector                        Your container element. You can pass in a pure DOM element or a selector.
     * @param {Object}              [options]                       Options object, containing:
     * @param {Boolean}             [options.preventUrlChange=false] Flag that determines if follows the link on click or stops the event
     * @param {String}              [options.active]                ID of the tab to activate on creation if the window hash is not already a tab ID.
     * @param {Function}            [options.onBeforeChange]        Callback to be executed before changing tabs.
     * @param {Function}            [options.onChange]              Callback to be executed after changing tabs.
     * 
     * @param {String}              [options.menuSelector='.tabs-nav'] Selector to find your tab links.
     * @param {String}              [options.contentSelector='.tabs-content'] Selector to find your tab content panes.
     * @param {Boolean}             [options.triggerEventsOnLoad=true] Call the above callbacks after this component is created.
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
        onBeforeChange:     ['Function', undefined],
        onChange:           ['Function', undefined],
        menuSelector:       ['String', '.tabs-nav'],
        contentSelector:    ['String', '.tabs-content'],
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
            this._menu = Selector.select(this._options.menuSelector, this._element)[0];

            if (!this._menu) {
                Ink.warn('Ink.UI.Tabs: An element selected by "' + this._options.menuSelector + '" needs to exist inside the element!');
                return;
            }

            //initialization of the tabs, hides all content before setting the active tab
            this._initializeDom();

            // subscribe click event
            Event.on(this._menu, 'click', 'a', Ink.bindMethod(this, '_onTabClickedGeneric'));

            //sets the first active tab
            this._setFirstActive();
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
                                 Selector.select('.active a', this._menu)[0] ||
                                 Selector.select('a', this._menu)[0];

            if (activeMenuLink) {
                this._firstTime = true;
                this._changeTab(activeMenuLink, this._options.triggerEventsOnLoad);
                this._firstTime = false;
            }
        },

        /**
         * Changes to the desired tab
         * 
         * @method _changeTab
         * @param {Element}    link             anchor linking to the content container
         * @param {boolean}    runCallbacks     defines if the callbacks should be run or not
         * @private
         */
        _changeTab: function(link, runCallbacks){
            if(runCallbacks && typeof this._options.onBeforeChange !== 'undefined'){
                this._options.onBeforeChange(this);
            }

            var selector = link.getAttribute('href');
            var href = selector.substr(selector.indexOf('#'));

            // Notice that this is done while the content pane is hidden (it's
            // going to be shown below). That is intentional. If the content is
            // shown and location.hash changes, scroll jumps to that pane, and
            // we do not want that.
            if (window.location.hash !== href && !this._options.preventUrlChange && !this._firstTime) {
                window.location.hash = href;
            }

            var activeTabs = Selector.select('> li.active', this._menu);

            for (var i = 0, len = activeTabs.length; i < len; i++) {
                if (activeTabs[i] !== link) {
                    Css.removeClassName(activeTabs[i], 'active');
                }
            }

            if (this._activeMenuTab) {
                Css.removeClassName(this._activeMenuTab, 'active');
                Css.removeClassName(this._activeSection, 'active');
                Css.addClassName(this._activeSection, 'hide-all');
            }

            this._activeMenuLink = link;
            this._activeMenuTab = this._activeMenuLink.parentNode;
            this._activeSection = Selector.select(href, this._element)[0];

            if (!this._activeSection) {
                this._activeMenuLink = this._activeMenuTab = this._activeSection = null;
                return;
            }

            Css.addClassName(this._activeMenuTab, 'active');
            Css.addClassName(this._activeSection, 'active');
            Css.removeClassName(this._activeSection, 'hide-all');

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

            var doChangeTab =
                !Css.hasClassName(event.currentTarget, 'ink-disabled') &&  // Not disabled
                event.currentTarget !== this._activeMenuLink;  // Not the current tab

            if (doChangeTab) {
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
            var href = tabElm.getAttribute('href') || '';
            href = href.substr(href.indexOf('#'));

            if (!href || Ink.i(this._dehashify(href)) === null) {
                return;
            }

            if (tabElm === this._activeMenuLink) {
                return;
            }

            this.changeTab(tabElm);
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
                return '';
            }
            return hash.indexOf('#') === 0? hash : '#' + hash;
        },

        /**
         * Removes the cardinal sign from the beginning of a string
         **/
        _dehashify: function(hash) {
            if (!hash) { return ''; }
            return ('' + hash).replace(/^#/, '');
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
            // If it's null or undefined, the following checks fail.
            if (!href) { return null; }

            // If it's a node, it could be a link or a section.
            if (href.nodeType === 1) {
                if (Element.isAncestorOf(href, this._element)) { return null; }  // Element is outside the tabs element.

                var links = Selector.select('a', this._menu);
                var id = href.getAttribute('id');

                for (var i = 0, len = links.length; i < len; i++) {
                    if (links[i] === href || Element.isAncestorOf(href, links[i])) {
                        return links[i];  // We got a link
                    } else if (id && id === this._dehashify(links[i].hash)) {
                        return links[i];  // We got a section
                    }
                }

                return null;
            }

            // Else, it's a string. It could start with "#" or without it.
            href = this._hashify(href);
            // Find a link which has a href ending with...
            return Selector.select('a[href$="' + href + '"]', this._menu)[0] || null;
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
         * @param {String|Element} selector      Selector of the desired tab or the link that links to it
         * @return {void}
         * @public
         */
        changeTab: function(selector) {
            selector = this._findLinkByHref(selector);

            if(!selector || Css.hasClassName(selector, 'ink-disabled')){
                return;
            }

            this._changeTab(selector, true);
        },

        /**
         * Disables the desired tab
         * 
         * @method disable
         * @param {String|Element} selector      the id of the desired tab or the link that links to it
         * @return {void}
         * @public
         */
        disable: function(selector){
            Css.addClassName(this._findLinkByHref(selector), 'ink-disabled');
        },

        /**
         * Enables the desired tab
         * 
         * @method enable
         * @param {String|Element} selector      The id of the desired tab or the link that links to it
         * @return {void}
         * @public
         */
        enable: function(selector){
            Css.removeClassName(this._findLinkByHref(selector), 'ink-disabled');
        },

        /***********
         * Getters *
         ***********/

        /**
         * Returns the active tab id
         * 
         * @method activeTab
         * @return {String} ID of the active section (use activeSection() instead to get the element).
         * @public
         */
        activeTab: function(){
            return this._activeSection.getAttribute('id');
        },

        /**
         * Gets the currently active Menu link (the links which the user clicks on to change tabs)
         * 
         * @method activeMenuLink
         * @return {Element|null} Active menu link, or `null` if there is none.
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
         * @return {Element|null} Active section, or `null` if there is none.
         * @public
         */
        activeSection: function(){
            return this._activeSection;
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

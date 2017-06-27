/**
 * @module Ink.UI.Tabs_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Tabs', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Common, Event, Css, Element, Selector, InkArray ) {
    'use strict';

    /**
     * Tabs component
     * 
     * @class Ink.UI.Tabs
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *     @param {Boolean}      [options.preventUrlChange]        Flag that determines if follows the link on click or stops the event
     *     @param {String}       [options.active]                  ID of the tab to activate on creation
     *     @param {Array}        [options.disabled]                IDs of the tabs that will be disabled on creation
     *     @param {Function}     [options.onBeforeChange]          Callback to be executed before changing tabs
     *     @param {Function}     [options.onChange]                Callback to be executed after changing tabs
     *     @param {Boolean}      [options.triggerEventsOnLoad]     Trigger the above events when the page is loaded.
     * @example
     *      <div class="ink-tabs top"> <!-- replace 'top' with 'bottom', 'left' or 'right' to place navigation -->
     *          
     *          <!-- put navigation first if using top, left or right positioning -->
     *          <ul class="tabs-nav">
     *              <li><a href="#home">Home</a></li>
     *              <li><a href="#news">News</a></li>
     *              <li><a href="#description">Description</a></li>
     *              <li><a href="#stuff">Stuff</a></li>
     *              <li><a href="#more_stuff">More stuff</a></li>
     *          </ul>
     *          
     *          <!-- Put your content second if using top, left or right navigation -->
     *          <div id="home" class="tabs-content"><p>Content</p></div>
     *          <div id="news" class="tabs-content"><p>Content</p></div>
     *          <div id="description" class="tabs-content"><p>Content</p></div>
     *          <div id="stuff" class="tabs-content"><p>Content</p></div>
     *          <div id="more_stuff" class="tabs-content"><p>Content</p></div>
     *          <!-- If you're using bottom navigation, switch the nav block with the content blocks -->
     *       
     *      </div>
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.Tabs_1'], function( Selector, Tabs ){
     *              var tabsElement = Ink.s('.ink-tabs');
     *              var tabsObj = new Tabs( tabsElement );
     *          });
     *      </script>
     */
    var Tabs = function(selector, options) {
        this._element = Common.elOrSelector(selector, 'Ink.UI.Tabs tab container');

        this._options = Ink.extendObj({
            preventUrlChange: false,
            active: undefined,
            disabled: [],
            onBeforeChange: undefined,
            onChange: undefined,
            triggerEventsOnLoad: true
        }, options || {}, Element.data(this._element));

        this._handlers = {
            tabClicked: Ink.bindEvent(this._onTabClicked,this),
            disabledTabClicked: Ink.bindEvent(this._onDisabledTabClicked,this),
            resize: Ink.bindEvent(Event.throttle(this._onResize, 100),this)
        };

        this._init();
    };

    Tabs.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function() {
            this._menu = Selector.select('.tabs-nav', this._element)[0];
            this._menuTabs = this._menu.children;
            this._contentTabs = Selector.select('.tabs-content', this._element);

            //initialization of the tabs, hides all content before setting the active tab
            this._initializeDom();

            // subscribe events
            this._observe();

            //sets the first active tab
            this._setFirstActive();

            this._handlers.resize();

            Common.registerInstance(this, this._element, 'tabs');
        },

        /**
         * Initialization of the tabs, hides all content before setting the active tab
         * 
         * @method _initializeDom
         * @private
         */
        _initializeDom: function(){
            for(var i = 0; i < this._contentTabs.length; i++){
                Css.addClassName(this._contentTabs[i], 'hide-all');
            }
        },

        /**
         * Subscribe events
         * 
         * @method _observe
         * @private
         */
        _observe: function() {
            InkArray.each(this._menuTabs,Ink.bind(function(elem){
                var link = Selector.select('a', elem)[0];
                if(InkArray.inArray(link.getAttribute('href'), this._options.disabled)){
                    this.disable(link);
                } else {
                    this.enable(link);
                }
            },this));

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

            this._changeTab(activeMenuLink, this._options.triggerEventsOnLoad);
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
         * Tab clicked handler
         * 
         * @method _onTabClicked
         * @param {Event} ev
         * @private
         */
        _onTabClicked: function(ev) {
            Event.stop(ev);

            var target = Event.findElement(ev, 'A');
            if(!target || target.nodeName.toLowerCase() !== 'a') {
                return;
            }

            var href = target.getAttribute('href').substr(target.getAttribute('href').indexOf('#'));

            if (!href || Ink.i(href.replace(/^#/, '')) === null) {
                return;
            }

            if (this._options.preventUrlChange.toString() !== 'true') {
                window.location.hash = href;
            }

            if (target === this._activeMenuLink) {
                return;
            }
            this.changeTab(target);
        },

        /**
         * Disabled tab clicked handler
         * 
         * @method _onDisabledTabClicked
         * @param {Event} ev
         * @private
         */
        _onDisabledTabClicked: function(ev) {
            Event.stop(ev);
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

            if(currentLayout === Common.Layouts.SMALL || currentLayout === Common.Layouts.MEDIUM){
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
         * Changes to the desired tag
         * 
         * @method changeTab
         * @param {String|DOMElement} selector      the id of the desired tab or the link that links to it
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
         * Disables the desired tag
         * 
         * @method disable
         * @param {String|DOMElement} selector      the id of the desired tab or the link that links to it
         * @public
         */
        disable: function(selector){
            var element = (selector.nodeType === 1)? selector : this._findLinkByHref(this._hashify(selector));
            if(!element){
                return;
            }
            Event.stopObserving(element, 'click', this._handlers.tabClicked);
            Event.observe(element, 'click', this._handlers.disabledTabClicked);
            Css.addClassName(element, 'ink-disabled');
        },

         /**
         * Enables the desired tag
         * 
         * @method enable
         * @param {String|DOMElement} selector      the id of the desired tab or the link that links to it
         * @public
         */
        enable: function(selector){
            var element = (selector.nodeType === 1)? selector : this._findLinkByHref(this._hashify(selector));
            if(!element){
                return;
            }
            Event.stopObserving(element, 'click', this._handlers.disabledTabClicked);
            Event.observe(element, 'click', this._handlers.tabClicked);
            Css.removeClassName(element, 'ink-disabled');
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
         * Returns the current active Menu LI
         * 
         * @method activeMenuTab
         * @return {DOMElement} Active menu LI.
         * @public
         */
        activeMenuTab: function(){
            return this._activeMenuTab;
        },

        /**
         * Returns the current active Menu anchorChanges to the desired tag
         * 
         * @method activeMenuLink
         * @return {DOMElement} Active menu link
         * @public
         */
        activeMenuLink: function(){
            return this._activeMenuLink;
        },

        /**
         * Returns the current active Content Tab
         * 
         * @method activeContentTab
         * @return {DOMElement} Active Content Tab
         * @public
         */
        activeContentTab: function(){
            return this._activeContentTab;
        },

        /**
         * Unregisters the component and removes its markup from the DOM
         * 
         * @method destroy
         * @public
         */
        destroy: Common.destroyComponent
    };

    return Tabs;

});

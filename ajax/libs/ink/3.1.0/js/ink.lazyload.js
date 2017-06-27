/**
 * Delays content loading
 * @module Ink.UI.LazyLoad_1
 * @version 1
 */

Ink.createModule('Ink.UI.LazyLoad', '1', ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Element_1'], function(Common, InkEvent, InkElement) {
'use strict';

function LazyLoad() {
    Common.BaseUIComponent.apply(this, arguments);
}

LazyLoad._name = 'LazyLoad_1';

LazyLoad._optionDefinition = {
    item: ['String', '.lazyload-item'],
    placeholder: ['String', null],
    source: ['String', 'data-src'],
    destination: ['String', 'src'],
    delay: ['Number', 100],
    delta: ['Number', 0],
    image: ['Boolean', true],
    scrollElement: ['Element', window],
    touchEvents: ['Boolean', true],
    onInsideViewport: ['Function', false],
    onAfterAttributeChange: ['Function', false],
    autoInit: ['Boolean', true]
};

LazyLoad.prototype = {
    /**
     * Stops the browser from loading a barrage of content at once.
     *
     * This delays the loading of images and other content until the corresponding elements are visible in the browser viewport.
     * This was created to load images later, but can be also used for widgets which are slow to load and are only useful when on screen.
     *
     * This works through copying the `src` attribute into `data-src`, and placing a `placeholder` string in the `src` attribute. Then, when the element is on screen, the `data-src` attribute is copied back to `src` and the content starts loading. You can use the options below to change what attributes are involved in the exchange.
     *
     * You can also provide your `onInsideViewport` callback and use it to start widgets which need javascript, such as an interactive map or an animation.
     *
     * @class Ink.UI.LazyLoad_1
     * @constructor
     *
     * @param rootElement {String|DOMElement} The element which contains the lazily-loaded items.
     * @param {Object}      [options]                           Options object, containing:
     * @param {String}      [options.item]                      Item selector. Defaults to '.lazyload-item'.
     * @param {String}      [options.placeholder]               Placeholder value for items which are not 'visible', in case they don't already have a value set.
     * @param {String}      [options.source]                    Source attribute. When an item is 'visible', use this attribute's value to set its destination attribute. Defaults to 'data-src'.
     * @param {String}      [options.destination]               Destination attribute. Attribute to change when the element is 'visible'. Defaults to 'src'. 
     * @param {Number}      [options.delay]                     Milliseconds to wait before trying to load items. Defaults to 100.
     * @param {Number}      [options.delta]                     Offset distance in pixels. Determines how far the top of an item must be from the viewport be considered 'visible'. Negative values shrink the considered 'visible' viewport while positive values enlarge it. Defaults to 0.
     * @param {Boolean}     [options.image]                     Set to false to make this component do nothing to any elements and just give you the onInsideViewport callback.
     * @param {DOMElement}  [options.scrollElement]             (advanced) What element is to be listened for the scroll event. Defaults to document.window.
     * @param {Boolean}     [options.touchEvents]               Subscribe to touch events in addition to scroll events. Useful in mobile safari because 'scroll' events aren't frequent enough. Defaults to true.
     * @param {Function}    [options.onInsideViewport]          Callback function for when an `item` is 'visible'. Receives an object containing the item's element as an argument.
     * @param {Function}    [options.onAfterAttributeChange]    (advanced) Callback function when an item's attribute changes. Receives an object containing the item's element as an argument.
     * @param {Boolean}     [options.autoInit]                  (advanced) Set to false if you want to start LazyLoad yourself with `reload()`. Defaults to true.
     *
     * @sample Ink_UI_LazyLoad_1.html
     */
    _init: function() {
        this._aData = [];
        this._hasEvents = false;
   
        if(this._options.autoInit) {
            this._activate();
        }
    },

    _activate: function() 
    {
        this._getData();
        if(!this._hasEvents) {
            this._addEvents(); 
        }
        this._onScrollThrottled();
    },

    _getData: function()
    {
        var aElms = Ink.ss(this._options.item, this._element);
        var attr = null;
        for(var i=0, t=aElms.length; i < t; i++) {
            if (this._options.placeholder != null && !InkElement.hasAttribute(aElms[i], this._options.destination)) {
                aElms[i].setAttribute(this._options.destination, this._options.placeholder);
            }
            attr = aElms[i].getAttribute(this._options.source);
            if(attr !== null || !this._options.image) {
                this._aData.push({elm: aElms[i], original: attr});
            }
        }
    },

    _addEvents: function() 
    {
        this._onScrollThrottled = InkEvent.throttle(Ink.bindEvent(this._onScroll, this), this._options.delay);
        if('ontouchmove' in document.documentElement && this._options.touchEvents) {
            InkEvent.observe(document.documentElement, 'touchmove', this._onScrollThrottled);
        }
        InkEvent.observe(this._options.scrollElement, 'scroll', this._onScrollThrottled);
        this._hasEvents = true;
    },

    _removeEvents: function() {
        if('ontouchmove' in document.documentElement && this._options.touchEvents) {
            InkEvent.stopObserving(document.documentElement, 'touchmove', this._onScrollThrottled);
        }
        InkEvent.stopObserving(this._options.scrollElement, 'scroll', this._onScrollThrottled);
        this._hasEvents = false;
    }, 

    _onScroll: function() {
        var curElm;

        for(var i=0; i < this._aData.length; i++) {
            curElm = this._aData[i];

            if(InkElement.inViewport(curElm.elm, { partial: true, margin: this._options.delta })) {
                this._elInViewport(curElm);
                if (this._options.image) {
                    /* [todo] a seemingly unrelated option creates a branch? Some of this belongs in another module. */
                    this._aData.splice(i, 1);
                    i -= 1;
                }
            }
        }

        if (this._aData.length === 0) {
            this._removeEvents();
        }
    },

    /**
     * Called when an element is detected inside the viewport
     *
     * @method _elInViewport
     * @param {LazyLoadInternalElementData} curElm
     * @private
     **/
    _elInViewport: function (curElm) {
        this._userCallback('onInsideViewport', { element: curElm.elm });

        if(this._options.image) {
            curElm.elm.setAttribute(this._options.destination, curElm.original);
            curElm.elm.removeAttribute(this._options.source);
        }

        this._userCallback('onAfterAttributeChange', { element: curElm.elm });
    },

    /**
     * Call a callback if it exists and its `typeof` is `"function"`.
     * @method _userCallback
     * @param name {String} Callback name in this._options.
     * @private
     **/
    _userCallback: function (name) {
        if (typeof this._options[name] === 'function') {
            this._options[name].apply(this, [].slice.call(arguments, 1));
        }
    },

    /**
     * Load or reload the component.
     * Adding the 'scroll' event listener if necessary and checks if anything needs to be loaded now.
     *
     * You can use this to manually invoke the loading logic without user action. 
     *
     * @method reload
     * @public
     */
    reload: function() {
        this._activate(); 
    },

    /**
     * Destroy this component
     * @method destroy
     * @public
     **/
    destroy: function() {
        if(this._hasEvents) {
            this._removeEvents();
        }
        Common.destroyComponent.call(this);
    }
};

Common.createUIComponent(LazyLoad);

return LazyLoad;

});

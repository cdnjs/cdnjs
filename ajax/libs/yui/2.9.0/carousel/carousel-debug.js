/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
 * The Carousel module provides a widget for browsing among a set of like
 * objects represented pictorially.
 *
 * @module carousel
 * @requires yahoo, dom, event, element
 * @optional animation
 * @namespace YAHOO.widget
 * @title Carousel Widget
 */
(function () {

    var WidgetName = "Carousel"; // forward declaration

    /**
     * The Carousel widget.
     *
     * @class Carousel
     * @extends YAHOO.util.Element
     * @constructor
     * @param el {HTMLElement | String} The HTML element that represents the
     * the container that houses the Carousel.
     * @param cfg {Object} (optional) The configuration values
     */
    YAHOO.widget.Carousel = function (el, cfg) {
        YAHOO.log("Component creation", WidgetName);

        YAHOO.widget.Carousel.superclass.constructor.call(this, el, cfg);
    };

    /*
     * Private variables of the Carousel component
     */

    /* Some abbreviations to avoid lengthy typing and lookups. */
    var
    Carousel    = YAHOO.widget.Carousel,
    Dom         = YAHOO.util.Dom,
    Event       = YAHOO.util.Event,
    JS          = YAHOO.lang,

    /**
     * The internal table of Carousel instances.
     * @private
     * @static
     */
    instances = {},
    syncUiOnItemInsert = true,

    /*
     * Custom events of the Carousel component
     */

    /**
     * @event afterScroll
     * @description Fires when the Carousel has scrolled to the previous or
     * next page.  Passes back the index of the first and last visible items in
     * the Carousel.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    afterScrollEvent = "afterScroll",

    /**
     * @event allItemsRemovedEvent
     * @description Fires when all items have been removed from the Carousel.
     * See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    allItemsRemovedEvent = "allItemsRemoved",

    /**
     * @event beforeHide
     * @description Fires before the Carousel is hidden.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    beforeHideEvent = "beforeHide",

    /**
     * @event beforePageChange
     * @description Fires when the Carousel is about to scroll to the previous
     * or next page.  Passes back the page number of the current page.  Note
     * that the first page number is zero.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    beforePageChangeEvent = "beforePageChange",

    /**
     * @event beforeScroll
     * @description Fires when the Carousel is about to scroll to the previous
     * or next page.  Passes back the index of the first and last visible items
     * in the Carousel and the direction (backward/forward) of the scroll.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    beforeScrollEvent = "beforeScroll",

    /**
     * @event beforeShow
     * @description Fires when the Carousel is about to be shown.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    beforeShowEvent = "beforeShow",

    /**
     * @event blur
     * @description Fires when the Carousel loses focus.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    blurEvent = "blur",

    /**
     * @event focus
     * @description Fires when the Carousel gains focus.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    focusEvent = "focus",

    /**
     * @event hide
     * @description Fires when the Carousel is hidden.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    hideEvent = "hide",

    /**
     * @event itemAdded
     * @description Fires when an item has been added to the Carousel.  Passes
     * back the content of the item that would be added, the index at which the
     * item would be added, and the event itself.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    itemAddedEvent = "itemAdded",

    /**
     * @event itemRemoved
     * @description Fires when an item has been removed from the Carousel.
     * Passes back the content of the item that would be removed, the index
     * from which the item would be removed, and the event itself.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    itemRemovedEvent = "itemRemoved",

    /**
     * @event itemReplaced
     * @description Fires when an item has been replaced in the Carousel.
     * Passes back the content of the item that was replaced, the content
     * of the new item, the index where the replacement occurred, and the event
     * itself.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    itemReplacedEvent = "itemReplaced",

    /**
     * @event itemSelected
     * @description Fires when an item has been selected in the Carousel.
     * Passes back the index of the selected item in the Carousel.  Note, that
     * the index begins from zero.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    itemSelectedEvent = "itemSelected",

    /**
     * @event loadItems
     * @description Fires when the Carousel needs more items to be loaded for
     * displaying them.  Passes back the first and last visible items in the
     * Carousel, and the number of items needed to be loaded.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    loadItemsEvent = "loadItems",

    /**
     * @event navigationStateChange
     * @description Fires when the state of either one of the navigation
     * buttons are changed from enabled to disabled or vice versa.  Passes back
     * the state (true/false) of the previous and next buttons.  The value true
     * signifies the button is enabled, false signifies disabled.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    navigationStateChangeEvent = "navigationStateChange",

    /**
     * @event pageChange
     * @description Fires after the Carousel has scrolled to the previous or
     * next page.  Passes back the page number of the current page.  Note
     * that the first page number is zero.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    pageChangeEvent = "pageChange",

    /*
     * Internal event.
     * @event render
     * @description Fires when the Carousel is rendered.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    renderEvent = "render",

    /**
     * @event show
     * @description Fires when the Carousel is shown.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    showEvent = "show",

    /**
     * @event startAutoPlay
     * @description Fires when the auto play has started in the Carousel.  See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    startAutoPlayEvent = "startAutoPlay",

    /**
     * @event stopAutoPlay
     * @description Fires when the auto play has been stopped in the Carousel.
     * See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    stopAutoPlayEvent = "stopAutoPlay",

    /*
     * Internal event.
     * @event uiUpdateEvent
     * @description Fires when the UI has been updated.
     * See
     * <a href="YAHOO.util.Element.html#addListener">Element.addListener</a>
     * for more information on listening for this event.
     * @type YAHOO.util.CustomEvent
     */
    uiUpdateEvent = "uiUpdate";

    /*
     * Private helper functions used by the Carousel component
     */

   /**
     * Set multiple styles on one element.
     * @method setStyles
     * @param el {HTMLElement} The element to set styles on
     * @param style {Object} top:"10px", left:"0px", etc.
     * @private
     */
     function setStyles(el, styles) {
         var which;

         for (which in styles) {
             if (styles.hasOwnProperty(which)) {
                 Dom.setStyle(el, which, styles[which]);
             }
         }
     }

    /**
     * Create an element, set its class name and optionally install the element
     * to its parent.
     * @method createElement
     * @param el {String} The element to be created
     * @param attrs {Object} Configuration of parent, class and id attributes.
     * If the content is specified, it is inserted after creation of the
     * element. The content can also be an HTML element in which case it would
     * be appended as a child node of the created element.
     * @private
     */
    function createElement(el, attrs) {
        var newEl = document.createElement(el);

        attrs = attrs || {};
        if (attrs.className) {
            Dom.addClass(newEl, attrs.className);
        }

        if (attrs.styles) {
            setStyles(newEl, attrs.styles);
        }

        if (attrs.parent) {
            attrs.parent.appendChild(newEl);
        }

        if (attrs.id) {
            newEl.setAttribute("id", attrs.id);
        }

        if (attrs.content) {
            if (attrs.content.nodeName) {
                newEl.appendChild(attrs.content);
            } else {
                newEl.innerHTML = attrs.content;
            }
        }

        return newEl;
    }

    /**
     * Get the computed style of an element.
     *
     * @method getStyle
     * @param el {HTMLElement} The element for which the style needs to be
     * returned.
     * @param style {String} The style attribute
     * @param type {String} "int", "float", etc. (defaults to int)
     * @private
     */
    function getStyle(el, style, type) {
        var value;

        if (!el) {
            return 0;
        }

        function getStyleIntVal(el, style) {
            var val;

            /*
             * XXX: Safari calculates incorrect marginRight for an element
             * which has its parent element style set to overflow: hidden
             * https://bugs.webkit.org/show_bug.cgi?id=13343
             * Let us assume marginLeft == marginRight
             *
             * Seems like IE9 also has this issue!
             */
            if (style == "marginRight" && (YAHOO.env.ua.webkit ||
                    (YAHOO.env.ua.ie && YAHOO.env.ua.ie >= 9))) {
                val = parseInt(Dom.getStyle(el, "marginLeft"), 10);
            } else {
                val = parseInt(Dom.getStyle(el, style), 10);
            }

            return JS.isNumber(val) ? val : 0;
        }

        function getStyleFloatVal(el, style) {
            var val;

            /*
             * XXX: Safari calculates incorrect marginRight for an element
             * which has its parent element style set to overflow: hidden
             * https://bugs.webkit.org/show_bug.cgi?id=13343
             * Let us assume marginLeft == marginRight
             */
            if (style == "marginRight" && YAHOO.env.ua.webkit) {
                val = parseFloat(Dom.getStyle(el, "marginLeft"));
            } else {
                val = parseFloat(Dom.getStyle(el, style));
            }

            return JS.isNumber(val) ? val : 0;
        }

        if (typeof type == "undefined") {
            type = "int";
        }

        switch (style) {
        case "height":
            value = el.offsetHeight;
            if (value > 0) {
                value += getStyleIntVal(el, "marginTop")        +
                        getStyleIntVal(el, "marginBottom");
            } else {
                value = getStyleFloatVal(el, "height")          +
                        getStyleIntVal(el, "marginTop")         +
                        getStyleIntVal(el, "marginBottom")      +
                        getStyleIntVal(el, "borderTopWidth")    +
                        getStyleIntVal(el, "borderBottomWidth") +
                        getStyleIntVal(el, "paddingTop")        +
                        getStyleIntVal(el, "paddingBottom");
            }
            break;
        case "width":
            value = el.offsetWidth;
            if (value > 0) {
                value += getStyleIntVal(el, "marginLeft")       +
                        getStyleIntVal(el, "marginRight");
            } else {
                value = getStyleFloatVal(el, "width")           +
                        getStyleIntVal(el, "marginLeft")        +
                        getStyleIntVal(el, "marginRight")       +
                        getStyleIntVal(el, "borderLeftWidth")   +
                        getStyleIntVal(el, "borderRightWidth")  +
                        getStyleIntVal(el, "paddingLeft")       +
                        getStyleIntVal(el, "paddingRight");
            }
            break;
        default:
            if (type == "int") {
                value = getStyleIntVal(el, style);
            } else if (type == "float") {
                value = getStyleFloatVal(el, style);
            } else {
                value = Dom.getStyle(el, style);
            }
            break;
        }

        return value;
    }

    /**
     * Compute and return the height or width of a single Carousel item
     * depending upon the orientation.
     *
     * @method getCarouselItemSize
     * @param which {String} "height" or "width" to be returned.  If this is
     * passed explicitly, the calculated size is not cached.
     * @private
     */
    function getCarouselItemSize(which) {
        var carousel = this,
            child,
            item,
            size     = 0,
            vertical = false;

        if (carousel._itemAttrCache[which]) {
            return carousel._itemAttrCache[which];
        }

        if (carousel._itemsTable.numItems === 0) {
            return 0;
        }

        // get first loaded item
        item = carousel._findClosestSibling(-1);

        if (JS.isUndefined(item)) {
            return 0;
        }

        child = Dom.get(item.id);

        if (typeof which == "undefined") {
            vertical = carousel.get("isVertical");
        } else {
            vertical = which == "height";
        }

        if (vertical) {
            size = getStyle(child, "height");
        } else {
            size = getStyle(child, "width");
        }

        if (size) {
            carousel._itemAttrCache[which] = size;
        }

        return size;
    }

    /**
     * Return the size of a part of the item (reveal).
     *
     * @method getRevealSize
     * @private
     */
    function getRevealSize() {
        var carousel = this, isVertical, sz;

        isVertical = carousel.get("isVertical");
        sz  = getCarouselItemSize.call(carousel,
                isVertical ? "height" : "width");
        return (sz * carousel.get("revealAmount") / 100);
    }

    /**
     * Compute and return the position of a Carousel item based on its
     * position.
     *
     * @method getCarouselItemPosition
     * @param position {Number} The position of the Carousel item.
     * @private
     */
    function getCarouselItemPosition(pos) {
        var carousel    = this,
            itemsPerRow = carousel._cols,
            itemsPerCol = carousel._rows,
            page,
            sz,
            isVertical,
            itemsCol,
            itemsRow,
            sentinel,
            top,
            left,
            rsz,
            delta,
            styles = {},
            itemsTable = carousel._itemsTable;

        isVertical = carousel.get("isVertical");
        sz  = getCarouselItemSize.call(carousel,
                isVertical ? "height" : "width");
        rsz = getRevealSize.call(carousel);

        if (itemsPerCol) {
            page = this.getPageForItem(pos);
            if (isVertical) {
                itemsRow = Math.floor(pos/itemsPerRow);
                delta = itemsRow;
                top = delta * sz;
                styles.top  = (top + rsz) + "px";

                sz  = getCarouselItemSize.call(carousel, "width");

                itemsCol = pos % itemsPerRow;
                delta = itemsCol;
                left = delta * sz;
                styles.left = left + "px";
            } else {
                itemsCol = pos % itemsPerRow;
                sentinel = (page - 1) * itemsPerRow;
                delta = itemsCol + sentinel;
                left = delta * sz;
                styles.left = (left + rsz) + "px";

                sz  = getCarouselItemSize.call(carousel, "height");

                itemsRow = Math.floor(pos/itemsPerRow);
                sentinel = (page - 1) * itemsPerCol;
                delta = itemsRow - sentinel;
                top = delta * sz;

                styles.top  = top + "px";
            }
        } else {
            if (isVertical) {
                styles.left = 0;
                styles.top  = ((pos * sz) + rsz) + "px";
            } else {
                styles.top  = 0;
                styles.left = ((pos * sz) + rsz) + "px";
            }
        }

        return styles;
    }

    /**
     * Return the index of the first item in the view port for displaying item
     * in "pos".
     *
     * @method getFirstVisibleForPosition
     * @param pos {Number} The position of the item to be displayed
     * @private
     */
    function getFirstVisibleForPosition(pos) {
        var num = this.get("numVisible");
        return Math.floor(pos / num) * num;
    }

    /**
     * Return the scrolling offset size given the number of elements to
     * scroll.
     *
     * @method getScrollOffset
     * @param delta {Number} The delta number of elements to scroll by.
     * @private
     */
    function getScrollOffset(delta) {
        var carousel = this,
            itemSize = 0,
            size     = 0,
            attr     = carousel.get("isVertical") ? "height" : "width";

        itemSize = getCarouselItemSize.call(carousel, attr);

        size = itemSize * delta;

        return size;
    }

    /**
     * Scroll the Carousel by a page backward.
     *
     * @method scrollPageBackward
     * @param {Event} ev The event object
     * @param {Object} obj The context object
     * @private
     */
    function scrollPageBackward(ev, obj) {
        obj.scrollPageBackward();
        Event.preventDefault(ev);
    }

    /**
     * Scroll the Carousel by a page forward.
     *
     * @method scrollPageForward
     * @param {Event} ev The event object
     * @param {Object} obj The context object
     * @private
     */
    function scrollPageForward(ev, obj) {
        obj.scrollPageForward();
        Event.preventDefault(ev);
    }

    /**
     * Set the selected item.
     *
     * @method setItemSelection
     * @param {Number} newpos The index of the new position
     * @param {Number} oldpos The index of the previous position
     * @private
     */
     function setItemSelection(newpos, oldpos) {
        var carousel = this,
            cssClass   = carousel.CLASSES,
            el,
            firstItem  = carousel._firstItem,
            numItems   = carousel.get("numItems"),
            numVisible = carousel.get("numVisible"),
            position   = oldpos,
            sentinel   = firstItem + numVisible - 1;

        if (position >= 0 && position < numItems) {
            if (!JS.isUndefined(carousel._itemsTable.items[position])) {
                el = Dom.get(carousel._itemsTable.items[position].id);
                if (el) {
                    Dom.removeClass(el, cssClass.SELECTED_ITEM);
                }
            }
        }

        if (JS.isNumber(newpos)) {
            newpos = parseInt(newpos, 10);
            newpos = JS.isNumber(newpos) ? newpos : 0;
        } else {
            newpos = firstItem;
        }

        if (JS.isUndefined(carousel._itemsTable.items[newpos])) {
            newpos = getFirstVisibleForPosition.call(carousel, newpos);
            carousel.scrollTo(newpos); // still loading the item
        }

        if (!JS.isUndefined(carousel._itemsTable.items[newpos])) {
            el = Dom.get(carousel._itemsTable.items[newpos].id);
            if (el) {
                Dom.addClass(el, cssClass.SELECTED_ITEM);
            }
        }

        if (newpos < firstItem || newpos > sentinel) { // out of focus
            newpos = getFirstVisibleForPosition.call(carousel, newpos);
            carousel.scrollTo(newpos);
        }
    }

    /**
     * Show or hide navigation.
     *
     * @method showNavigation
     * @private
     */
    function showNavigation(hide) {
        var carousel = this,
            cfg = carousel.get("navigation");

        if (JS.isUndefined(cfg)) {
            return; // can't do anything
        }

        if (JS.isUndefined(hide)) {
            // show the navigation
            if (!JS.isUndefined(cfg.prev) && JS.isArray(cfg.prev) &&
                !JS.isUndefined(cfg.prev[0])) {
                Dom.setStyle(cfg.prev[0], "visibility", "visible");
            }
            if (!JS.isUndefined(cfg.next) && JS.isArray(cfg.next) &&
                !JS.isUndefined(cfg.next[0])) {
                Dom.setStyle(cfg.next[0], "visibility", "visible");
            }
            if (!JS.isUndefined(carousel._pages) &&
                !JS.isUndefined(carousel._pages.el)) {
                Dom.setStyle(carousel._pages.el, "visibility", "visible");
            }
        } else {
            // hide the navigation
            if (!JS.isUndefined(cfg.prev) && JS.isArray(cfg.prev) &&
                !JS.isUndefined(cfg.prev[0])) {
                Dom.setStyle(cfg.prev[0], "visibility", "hidden");
            }
            if (!JS.isUndefined(cfg.next) && JS.isArray(cfg.next) &&
                !JS.isUndefined(cfg.next[0])) {
                Dom.setStyle(cfg.next[0], "visibility", "hidden");
            }
            if (!JS.isUndefined(carousel._pages) &&
                !JS.isUndefined(carousel._pages.el)) {
                Dom.setStyle(carousel._pages.el, "visibility", "hidden");
            }
        }
    }

    /**
     * Fire custom events for enabling/disabling navigation elements.
     *
     * @method syncNavigation
     * @private
     */
    function syncNavigation() {
        var attach   = false,
            carousel = this,
            cssClass = carousel.CLASSES,
            i,
            navigation,
            sentinel;

        // Don't do anything if the Carousel is not rendered
        if (!carousel._hasRendered) {
            return;
        }

        navigation = carousel.get("navigation");
        sentinel   = carousel._firstItem + carousel.get("numVisible");

        if (navigation.prev) {
            if (carousel.get("numItems") === 0 || carousel._firstItem === 0) {
                if (carousel.get("numItems") === 0 ||
                   !carousel.get("isCircular")) {
                    Event.removeListener(navigation.prev, "click",
                            scrollPageBackward);
                    Dom.addClass(navigation.prev, cssClass.FIRST_NAV_DISABLED);
                    for (i = 0; i < carousel._navBtns.prev.length; i++) {
                        carousel._navBtns.prev[i].setAttribute("disabled",
                                "true");
                    }
                    carousel._prevEnabled = false;
                } else {
                    attach = !carousel._prevEnabled;
                }
            } else {
                attach = !carousel._prevEnabled;
            }

            if (attach) {
                Event.on(navigation.prev, "click", scrollPageBackward,
                         carousel);
                Dom.removeClass(navigation.prev, cssClass.FIRST_NAV_DISABLED);
                for (i = 0; i < carousel._navBtns.prev.length; i++) {
                    carousel._navBtns.prev[i].removeAttribute("disabled");
                }
                carousel._prevEnabled = true;
            }
        }

        attach = false;
        if (navigation.next) {
            if (sentinel >= carousel.get("numItems")) {
                if (!carousel.get("isCircular")) {
                    Event.removeListener(navigation.next, "click",
                            scrollPageForward);
                    Dom.addClass(navigation.next, cssClass.DISABLED);
                    for (i = 0; i < carousel._navBtns.next.length; i++) {
                        carousel._navBtns.next[i].setAttribute("disabled",
                                "true");
                    }
                    carousel._nextEnabled = false;
                } else {
                    attach = !carousel._nextEnabled;
                }
            } else {
                attach = !carousel._nextEnabled;
            }

            if (attach) {
                Event.on(navigation.next, "click", scrollPageForward,
                         carousel);
                Dom.removeClass(navigation.next, cssClass.DISABLED);
                for (i = 0; i < carousel._navBtns.next.length; i++) {
                    carousel._navBtns.next[i].removeAttribute("disabled");
                }
                carousel._nextEnabled = true;
            }
        }

        carousel.fireEvent(navigationStateChangeEvent,
                { next: carousel._nextEnabled, prev: carousel._prevEnabled });
    }

    /**
     * Synchronize and redraw the Pager UI if necessary.
     *
     * @method syncPagerUi
     * @private
     */
    function syncPagerUi(page) {
        var carousel = this, numPages, numVisible;

        // Don't do anything if the Carousel is not rendered
        if (!carousel._hasRendered) {
            return;
        }

        numVisible = carousel.get("numVisible");

        if (!JS.isNumber(page)) {
            page = Math.floor(carousel.get("selectedItem") / numVisible);
        }

        numPages = Math.ceil(carousel.get("numItems") / numVisible);

        carousel._pages.num = numPages;
        carousel._pages.cur = page;

        if (numPages > carousel.CONFIG.MAX_PAGER_BUTTONS) {
            carousel._updatePagerMenu();
        } else {
            carousel._updatePagerButtons();
        }
    }

    /**
     * Get full dimensions of an element.
     *
     * @method getDimensions
     * @param {Object} el The element to get the dimensions of
     * @param {String} which Get the height or width of an element
     * @private
     */
    function getDimensions(el, which) {
        switch (which) {
        case 'height':
            return  getStyle(el, "marginTop")        +
                    getStyle(el, "marginBottom")     +
                    getStyle(el, "paddingTop")       +
                    getStyle(el, "paddingBottom")    +
                    getStyle(el, "borderTopWidth")   +
                    getStyle(el, "borderBottomWidth");
        case 'width':
            return   getStyle(el, "marginLeft")      +
                     getStyle(el, "marginRight")     +
                     getStyle(el, "paddingLeft")     +
                     getStyle(el, "paddingRight")    +
                     getStyle(el, "borderLeftWidth") +
                     getStyle(el, "borderRightWidth");
        default:
            break;
        }

        return getStyle(el, which);
    }

    /**
     * Handle UI update.
     * Call the appropriate methods on events fired when an item is added, or
     * removed for synchronizing the DOM.
     *
     * @method syncUi
     * @param {Object} o The item that needs to be added or removed
     * @private
     */
    function syncUi(o) {
        var carousel = this;

        if (!JS.isObject(o)) {
            return;
        }

        switch (o.ev) {
        case itemAddedEvent:
            carousel._syncUiForItemAdd(o);
            break;
        case itemRemovedEvent:
            carousel._syncUiForItemRemove(o);
            break;
        case itemReplacedEvent:
            carousel._syncUiForItemReplace(o);
            break;
        case loadItemsEvent:
            carousel._syncUiForLazyLoading(o);
            break;
        }

        carousel.fireEvent(uiUpdateEvent);
    }

    /**
     * Update the state variables after scrolling the Carousel view port.
     *
     * @method updateStateAfterScroll
     * @param {Integer} item The index to which the Carousel has scrolled to.
     * @param {Integer} sentinel The last element in the view port.
     * @private
     */
    function updateStateAfterScroll(item, sentinel) {
        var carousel   = this,
            page       = carousel.get("currentPage"),
            newPage,
            numPerPage = carousel.get("numVisible");

        newPage = parseInt(carousel._firstItem / numPerPage, 10);
        if (newPage != page) {
            carousel.setAttributeConfig("currentPage", { value: newPage });
            carousel.fireEvent(pageChangeEvent, newPage);
        }

        if (carousel.get("selectOnScroll")) {
            if (carousel.get("selectedItem") != carousel._selectedItem) {
                carousel.set("selectedItem", carousel._selectedItem);
            }
        }

        clearTimeout(carousel._autoPlayTimer);
        delete carousel._autoPlayTimer;
        if (carousel.isAutoPlayOn()) {
            carousel.startAutoPlay();
        }

        carousel.fireEvent(afterScrollEvent,
                           { first: carousel._firstItem,
                             last: sentinel },
                           carousel);
    }

    /*
     * Static members and methods of the Carousel component
     */

    /**
     * Return the appropriate Carousel object based on the id associated with
     * the Carousel element or false if none match.
     * @method getById
     * @public
     * @static
     */
    Carousel.getById = function (id) {
        return instances[id] ? instances[id].object : false;
    };

    YAHOO.extend(Carousel, YAHOO.util.Element, {

        /*
         * Internal variables used within the Carousel component
         */

         /**
         * Number of rows for a multirow carousel.
         *
         * @property _rows
         * @private
         */
        _rows: null,

        /**
         * Number of cols for a multirow carousel.
         *
         * @property _cols
         * @private
         */
        _cols: null,

        /**
         * The Animation object.
         *
         * @property _animObj
         * @private
         */
        _animObj: null,

        /**
         * The Carousel element.
         *
         * @property _carouselEl
         * @private
         */
        _carouselEl: null,

        /**
         * The Carousel clipping container element.
         *
         * @property _clipEl
         * @private
         */
        _clipEl: null,

        /**
         * The current first index of the Carousel.
         *
         * @property _firstItem
         * @private
         */
        _firstItem: 0,

        /**
         * Does the Carousel element have focus?
         *
         * @property _hasFocus
         * @private
         */
        _hasFocus: false,

        /**
         * Is the Carousel rendered already?
         *
         * @property _hasRendered
         * @private
         */
        _hasRendered: false,

        /**
         * Is the animation still in progress?
         *
         * @property _isAnimationInProgress
         * @private
         */
        _isAnimationInProgress: false,

        /**
         * Is the auto-scrolling of Carousel in progress?
         *
         * @property _isAutoPlayInProgress
         * @private
         */
        _isAutoPlayInProgress: false,

        /**
         * The table of items in the Carousel.
         * The numItems is the number of items in the Carousel, items being the
         * array of items in the Carousel.  The size is the size of a single
         * item in the Carousel.  It is cached here for efficiency (to avoid
         * computing the size multiple times).
         *
         * @property _itemsTable
         * @private
         */
        _itemsTable: null,

        /**
         * The Carousel navigation buttons.
         *
         * @property _navBtns
         * @private
         */
        _navBtns: null,

        /**
         * The Carousel navigation.
         *
         * @property _navEl
         * @private
         */
        _navEl: null,

        /**
         * Status of the next navigation item.
         *
         * @property _nextEnabled
         * @private
         */
        _nextEnabled: true,

        /**
         * The Carousel pages structure.
         * This is an object of the total number of pages and the current page.
         *
         * @property _pages
         * @private
         */
        _pages: null,

        /**
         * The Carousel pagination structure.
         *
         * @property _pagination
         * @private
         */
        _pagination: null,

        /**
         * Status of the previous navigation item.
         *
         * @property _prevEnabled
         * @private
         */
        _prevEnabled: true,

        /**
         * Whether the Carousel size needs to be recomputed or not?
         *
         * @property _recomputeSize
         * @private
         */
        _recomputeSize: true,

        /**
         * Cache the Carousel item attributes.
         *
         * @property _itemAttrCache
         * @private
         */
         _itemAttrCache: null,

        /*
         * CSS classes used by the Carousel component
         */

        CLASSES: {

            /**
             * The class name of the Carousel navigation buttons.
             *
             * @property BUTTON
             * @default "yui-carousel-button"
             */
            BUTTON: "yui-carousel-button",

            /**
             * The class name of the Carousel element.
             *
             * @property CAROUSEL
             * @default "yui-carousel"
             */
            CAROUSEL: "yui-carousel",

            /**
             * The class name of the container of the items in the Carousel.
             *
             * @property CAROUSEL_EL
             * @default "yui-carousel-element"
             */
            CAROUSEL_EL: "yui-carousel-element",

            /**
             * The class name of the Carousel's container element.
             *
             * @property CONTAINER
             * @default "yui-carousel-container"
             */
            CONTAINER: "yui-carousel-container",

            /**
             * The class name of the Carousel's container element.
             *
             * @property CONTENT
             * @default "yui-carousel-content"
             */
            CONTENT: "yui-carousel-content",

            /**
             * The class name of a disabled navigation button.
             *
             * @property DISABLED
             * @default "yui-carousel-button-disabled"
             */
            DISABLED: "yui-carousel-button-disabled",

            /**
             * The class name of the first Carousel navigation button.
             *
             * @property FIRST_NAV
             * @default " yui-carousel-first-button"
             */
            FIRST_NAV: " yui-carousel-first-button",

            /**
             * The class name of a first disabled navigation button.
             *
             * @property FIRST_NAV_DISABLED
             * @default "yui-carousel-first-button-disabled"
             */
            FIRST_NAV_DISABLED: "yui-carousel-first-button-disabled",

            /**
             * The class name of a first page element.
             *
             * @property FIRST_PAGE
             * @default "yui-carousel-nav-first-page"
             */
            FIRST_PAGE: "yui-carousel-nav-first-page",

            /**
             * The class name of the Carousel navigation button that has focus.
             *
             * @property FOCUSSED_BUTTON
             * @default "yui-carousel-button-focus"
             */
            FOCUSSED_BUTTON: "yui-carousel-button-focus",

            /**
             * The class name of a horizontally oriented Carousel.
             *
             * @property HORIZONTAL
             * @default "yui-carousel-horizontal"
             */
            HORIZONTAL: "yui-carousel-horizontal",

            /**
             * The element to be used as the progress indicator when the item
             * is still being loaded.
             *
             * @property ITEM_LOADING
             * @default The progress indicator (spinner) image CSS class
             */
            ITEM_LOADING: "yui-carousel-item-loading",

            /**
             * The class name that will be set if the Carousel adjusts itself
             * for a minimum width.
             *
             * @property MIN_WIDTH
             * @default "yui-carousel-min-width"
             */
            MIN_WIDTH: "yui-carousel-min-width",

            /**
             * The navigation element container class name.
             *
             * @property NAVIGATION
             * @default "yui-carousel-nav"
             */
            NAVIGATION: "yui-carousel-nav",

            /**
             * The class name of the next Carousel navigation button.
             *
             * @property NEXT_NAV
             * @default " yui-carousel-next-button"
             */
            NEXT_NAV: " yui-carousel-next-button",

            /**
             * The class name of the next navigation link. This variable is
             * not only used for styling, but also for identifying the link
             * within the Carousel container.
             *
             * @property NEXT_PAGE
             * @default "yui-carousel-next"
             */
            NEXT_PAGE: "yui-carousel-next",

            /**
             * The class name for the navigation container for prev/next.
             *
             * @property NAV_CONTAINER
             * @default "yui-carousel-buttons"
             */
            NAV_CONTAINER: "yui-carousel-buttons",

            /**
              * The class name for an item in the pager UL or dropdown menu.
              *
              * @property PAGER_ITEM
              * @default "yui-carousel-pager-item"
              */
            PAGER_ITEM: "yui-carousel-pager-item",

            /**
             * The class name for the pagination container
             *
             * @property PAGINATION
             * @default "yui-carousel-pagination"
             */
            PAGINATION: "yui-carousel-pagination",

            /**
             * The class name of the focussed page navigation.  This class is
             * specifically used for the ugly focus handling in Opera.
             *
             * @property PAGE_FOCUS
             * @default "yui-carousel-nav-page-focus"
             */
            PAGE_FOCUS: "yui-carousel-nav-page-focus",

            /**
             * The class name of the previous navigation link. This variable
             * is not only used for styling, but also for identifying the link
             * within the Carousel container.
             *
             * @property PREV_PAGE
             * @default "yui-carousel-prev"
             */
            PREV_PAGE: "yui-carousel-prev",

            /**
             * The class name of the item.
             *
             * @property ITEM
             * @default "yui-carousel-item"
             */
            ITEM: "yui-carousel-item",

            /**
             * The class name of the selected item.
             *
             * @property SELECTED_ITEM
             * @default "yui-carousel-item-selected"
             */
            SELECTED_ITEM: "yui-carousel-item-selected",

            /**
             * The class name of the selected paging navigation.
             *
             * @property SELECTED_NAV
             * @default "yui-carousel-nav-page-selected"
             */
            SELECTED_NAV: "yui-carousel-nav-page-selected",

            /**
             * The class name of a vertically oriented Carousel.
             *
             * @property VERTICAL
             * @default "yui-carousel-vertical"
             */
            VERTICAL: "yui-carousel-vertical",

            /**
             * The class name of a multirow Carousel.
             *
             * @property MULTI_ROW
             * @default "yui-carousel-multi-row"
             */
            MULTI_ROW: "yui-carousel-multi-row",

            /**
             * The class name of a row in a multirow Carousel.
             *
             * @property ROW
             * @default "yui-carousel-new-row"
             */
            ROW: "yui-carousel-row",

            /**
             * The class name of a vertical Carousel's container element.
             *
             * @property VERTICAL_CONTAINER
             * @default "yui-carousel-vertical-container"
             */
            VERTICAL_CONTAINER: "yui-carousel-vertical-container",

            /**
             * The class name of a visible Carousel.
             *
             * @property VISIBLE
             * @default "yui-carousel-visible"
             */
            VISIBLE: "yui-carousel-visible"

        },

        /*
         * Configuration attributes for configuring the Carousel component
         */

        CONFIG: {

            /**
             * The offset of the first visible item in the Carousel.
             *
             * @property FIRST_VISIBLE
             * @default 0
             */
            FIRST_VISIBLE: 0,

            /**
             * The minimum width of the horizontal Carousel container to support
             * the navigation buttons.
             *
             * @property HORZ_MIN_WIDTH
             * @default 180
             */
            HORZ_MIN_WIDTH: 180,

            /**
             * The maximum number of pager buttons allowed beyond which the UI
             * of the pager would be a drop-down of pages instead of buttons.
             *
             * @property MAX_PAGER_BUTTONS
             * @default 5
             */
            MAX_PAGER_BUTTONS: 5,

            /**
             * The minimum width of the vertical Carousel container to support
             * the navigation buttons.
             *
             * @property VERT_MIN_WIDTH
             * @default 155
             */
            VERT_MIN_WIDTH: 115,

            /**
             * The number of visible items in the Carousel.
             *
             * @property NUM_VISIBLE
             * @default 3
             */
            NUM_VISIBLE: 3

        },

        /*
         * Internationalizable strings in the Carousel component
         */

        STRINGS: {

            /**
             * The content to be used as the progress indicator when the item
             * is still being loaded. Inserted into DOM with innerHTML.
             *
             * @property ITEM_LOADING_CONTENT
             * @type HTML
             * @default "Loading"
             */
            ITEM_LOADING_CONTENT: "Loading",

            /**
             * The next navigation button name/text. Inserted into DOM with innerHTML.
             *
             * @property NEXT_BUTTON_TEXT
             * @type HTML
             * @default "Next Page"
             */
            NEXT_BUTTON_TEXT: "Next Page",

            /**
             * The prefix text for the pager in case the UI is a drop-down.
             * Inserted into DOM with innerHTML.
             *
             * @property PAGER_PREFIX_TEXT
             * @type HTML
             * @default "Go to page "
             */
            PAGER_PREFIX_TEXT: "Go to page ",

            /**
             * The previous navigation button name/text. Inserted into DOM with innerHTML.
             *
             * @property PREVIOUS_BUTTON_TEXT
             * @type HTML
             * @default "Previous Page"
             */
            PREVIOUS_BUTTON_TEXT: "Previous Page"

        },

        /*
         * Public methods of the Carousel component
         */

        /**
         * Insert or append an item to the Carousel.
         * E.g. if Object: ({content:"Your Content", id:"", className:""}, index)
         *
         * @method addItem
         * @public
         * @param item {HTML | Object | HTMLElement} The item to be appended
         * to the Carousel. If the parameter is a string, it is assumed to be
         * the HTML content of the newly created item. If the parameter is an
         * object, it is assumed to supply the content and an optional class
         * and an optional id of the newly created item.
         * @param index {Number} optional The position to where in the list
         * (starts from zero).
         * @return {Boolean} Return true on success, false otherwise
         */
        addItem: function (item, index) {
            var carousel = this,
                className,
                content,
                elId,
                replaceItems = 0,
                newIndex, // Add newIndex as workaround for undefined pos
                numItems = carousel.get("numItems");

            if (!item) {
                return false;
            }

            if (JS.isString(item) || item.nodeName) {
                content = item.nodeName ? item.innerHTML : item;
            } else if (JS.isObject(item)) {
                content = item.content;
            } else {
                YAHOO.log("Invalid argument to addItem", "error", WidgetName);
                return false;
            }

            className = carousel.CLASSES.ITEM +
                    (item.className ? " " + item.className : "");
            elId = item.id ? item.id : Dom.generateId();

            if (JS.isUndefined(index)) {
                carousel._itemsTable.items.push({
                        item      : content,
                        className : className,
                        id        : elId
                });
                // Add newIndex as workaround for undefined pos
                newIndex = carousel._itemsTable.items.length - 1;
            } else {
                if (index < 0 || index > numItems) {
                    YAHOO.log("Index out of bounds", "error", WidgetName);
                    return false;
                }

                // make sure we splice into the correct position
                if (!carousel._itemsTable.items[index]) {
                    carousel._itemsTable.items[index] = undefined;
                    replaceItems = 1;
                }

                carousel._itemsTable.items.splice(index, replaceItems, {
                        item      : content,
                        className : className,
                        id        : elId
                });
            }
            carousel._itemsTable.numItems++;

            if (numItems < carousel._itemsTable.items.length) {
                carousel.set("numItems", carousel._itemsTable.items.length);
            }

            // Add newPos as workaround for undefined pos
            carousel.fireEvent(itemAddedEvent,
                    { pos: index, ev: itemAddedEvent, newPos: newIndex });

            return true;
        },

        /**
         * Insert or append multiple items to the Carousel.
         *
         * @method addItems
         * @public
         * @param items {Array} An array containing an array of new items each linked to the
         * index where the insertion should take place.
         * E.g. [[{content:'<img/>'}, index1], [{content:'<img/>'}, index2]]
         * NOTE: An item at index must already exist.
         * @return {Boolean} Return true on success, false otherwise
         */
        addItems: function (items) {
            var i, n, rv = true;

            if (!JS.isArray(items)) {
                return false;
            }

            syncUiOnItemInsert = false;
            for (i = 0, n = items.length; i < n; i++) {
                if (this.addItem(items[i][0], items[i][1]) === false) {
                    rv = false;
                }
            }
            syncUiOnItemInsert = true;

            this._syncUiItems();

            return rv;
        },

        /**
         * Remove focus from the Carousel.
         *
         * @method blur
         * @public
         */
        blur: function () {
            this._carouselEl.blur();
            this.fireEvent(blurEvent);
        },

        /**
         * Clears the items from Carousel.
         *
         * @method clearItems
         * @public
         */
        clearItems: function () {
            var carousel = this, n = carousel.get("numItems");

            while (n > 0) {
                if (!carousel.removeItem(0)) {
                    YAHOO.log("Item could not be removed - missing?",
                              "warn", WidgetName);
                }
                /*
                    For dynamic loading, the numItems may be much larger than
                    the actual number of items in the table. So, set the
                    numItems to zero, and break out of the loop if the table
                    is already empty.
                 */
                if (carousel._itemsTable.numItems === 0) {
                    carousel.set("numItems", 0);
                    break;
                }
                n--;
            }

            carousel.fireEvent(allItemsRemovedEvent);
        },

        /**
         * Set focus on the Carousel.
         *
         * @method focus
         * @public
         */
        focus: function () {
            var carousel = this,
                first,
                focusEl,
                isSelectionInvisible,
                itemsTable,
                last,
                numVisible,
                selectOnScroll,
                selected,
                selItem;

            // Don't do anything if the Carousel is not rendered
            if (!carousel._hasRendered) {
                return;
            }

            if (carousel.isAnimating()) {
                // this messes up real bad!
                return;
            }

            selItem              = carousel.get("selectedItem");
            numVisible           = carousel.get("numVisible");
            selectOnScroll       = carousel.get("selectOnScroll");
            selected             = (selItem >= 0) ?
                                   carousel.getItem(selItem) : null;
            first                = carousel.get("firstVisible");
            last                 = first + numVisible - 1;
            isSelectionInvisible = (selItem < first || selItem > last);
            focusEl              = (selected && selected.id) ?
                                   Dom.get(selected.id) : null;
            itemsTable           = carousel._itemsTable;

            if (!selectOnScroll && isSelectionInvisible) {
                focusEl = (itemsTable && itemsTable.items &&
                           itemsTable.items[first]) ?
                        Dom.get(itemsTable.items[first].id) : null;
            }

            if (focusEl) {
                try {
                    focusEl.focus();
                } catch (ex) {
                    // ignore focus errors
                }
            }

            carousel.fireEvent(focusEvent);
        },

        /**
         * Hide the Carousel.
         *
         * @method hide
         * @public
         */
        hide: function () {
            var carousel = this;

            if (carousel.fireEvent(beforeHideEvent) !== false) {
                carousel.removeClass(carousel.CLASSES.VISIBLE);
                showNavigation.call(carousel, false);
                carousel.fireEvent(hideEvent);
            }
        },

        /**
         * Initialize the Carousel.
         *
         * @method init
         * @public
         * @param el {HTMLElement | String} The html element that represents
         * the Carousel container.
         * @param attrs {Object} The set of configuration attributes for
         * creating the Carousel.
         */
        init: function (el, attrs) {
            var carousel = this,
                elId     = el,  // save for a rainy day
                parse    = false,
                selected;

            if (!el) {
                YAHOO.log(el + " is neither an HTML element, nor a string",
                        "error", WidgetName);
                return;
            }

            carousel._hasRendered = false;
            carousel._navBtns     = { prev: [], next: [] };
            carousel._pages       = { el: null, num: 0, cur: 0 };
            carousel._pagination  = {};
            carousel._itemAttrCache = {};

            carousel._itemsTable  = { loading: {}, numItems: 0,
                                      items: [], size: 0 };

            YAHOO.log("Component initialization", WidgetName);

            if (JS.isString(el)) {
                el = Dom.get(el);
            } else if (!el.nodeName) {
                YAHOO.log(el + " is neither an HTML element, nor a string",
                        "error", WidgetName);
                return;
            }

            Carousel.superclass.init.call(carousel, el, attrs);

            // check if we're starting somewhere in the middle
            selected = carousel.get("selectedItem");
            if(selected > 0){
                carousel.set("firstVisible",getFirstVisibleForPosition.call(carousel,selected));
            }

            if (el) {
                if (!el.id) {   // in case the HTML element is passed
                    el.setAttribute("id", Dom.generateId());
                }
                parse = carousel._parseCarousel(el);
                if (!parse) {
                    carousel._createCarousel(elId);
                }
            } else {
                el = carousel._createCarousel(elId);
            }
            elId = el.id;

            carousel.initEvents();

            if (parse) {
                carousel._parseCarouselItems();
            }

            // add the selected class
            if(selected > 0){
                setItemSelection.call(carousel,selected,0);
            }

            if (!attrs || typeof attrs.isVertical == "undefined") {
                carousel.set("isVertical", false);
            }

            carousel._parseCarouselNavigation(el);
            carousel._navEl = carousel._setupCarouselNavigation();

            instances[elId] = { object: carousel };
            carousel._loadItems(Math.min(carousel.get("firstVisible")+carousel.get("numVisible"),carousel.get("numItems"))-1);
        },

        /**
         * Initialize the configuration attributes used to create the Carousel.
         *
         * @method initAttributes
         * @public
         * @param attrs {Object} The set of configuration attributes for
         * creating the Carousel.
         */
        initAttributes: function (attrs) {
            var carousel = this;

            attrs = attrs || {};
            Carousel.superclass.initAttributes.call(carousel, attrs);

            /**
             * @attribute carouselEl
             * @description The type of the Carousel element.
             * @default OL
             * @type Boolean
             */
            carousel.setAttributeConfig("carouselEl", {
                    validator : JS.isString,
                    value     : attrs.carouselEl || "OL"
            });

            /**
             * @attribute carouselItemEl
             * @description The type of the list of items within the Carousel.
             * @default LI
             * @type Boolean
             */
            carousel.setAttributeConfig("carouselItemEl", {
                    validator : JS.isString,
                    value     : attrs.carouselItemEl || "LI"
            });

            /**
             * @attribute currentPage
             * @description The current page number (read-only.)
             * @type Number
             */
            carousel.setAttributeConfig("currentPage", {
                    readOnly : true,
                    value    : 0
            });

            /**
             * @attribute firstVisible
             * @description The index to start the Carousel from (indexes begin
             * from zero)
             * @default 0
             * @type Number
             */
            carousel.setAttributeConfig("firstVisible", {
                    method    : carousel._setFirstVisible,
                    validator : carousel._validateFirstVisible,
                    value     :
                        attrs.firstVisible || carousel.CONFIG.FIRST_VISIBLE
            });

            /**
             * @attribute selectOnScroll
             * @description Set this to true to automatically set focus to
             * follow scrolling in the Carousel.
             * @default true
             * @type Boolean
             */
            carousel.setAttributeConfig("selectOnScroll", {
                    validator : JS.isBoolean,
                    value     : attrs.selectOnScroll || true
            });

            /**
             * @attribute numVisible
             * @description The number of visible items in the Carousel's
             * viewport.
             * @default 3
             * @type Number
             */
            carousel.setAttributeConfig("numVisible", {
                    setter    : carousel._numVisibleSetter,
                    method    : carousel._setNumVisible,
                    validator : carousel._validateNumVisible,
                    value     : attrs.numVisible || carousel.CONFIG.NUM_VISIBLE
            });

            /**
             * @attribute numItems
             * @description The number of items in the Carousel.
             * @type Number
             */
            carousel.setAttributeConfig("numItems", {
                    method    : carousel._setNumItems,
                    validator : carousel._validateNumItems,
                    value     : carousel._itemsTable.numItems
            });

            /**
             * @attribute scrollIncrement
             * @description The number of items to scroll by for arrow keys.
             * @default 1
             * @type Number
             */
            carousel.setAttributeConfig("scrollIncrement", {
                    validator : carousel._validateScrollIncrement,
                    value     : attrs.scrollIncrement || 1
            });

            /**
             * @attribute selectedItem
             * @description The index of the selected item.
             * @type Number
             */
            carousel.setAttributeConfig("selectedItem", {
                    setter    : carousel._selectedItemSetter,
                    method    : carousel._setSelectedItem,
                    validator : JS.isNumber,
                    value     : -1
            });

            /**
             * @attribute revealAmount
             * @description The percentage of the item to be revealed on each
             * side of the Carousel (before and after the first and last item
             * in the Carousel's viewport.)
             * @default 0
             * @type Number
             */
            carousel.setAttributeConfig("revealAmount", {
                    method    : carousel._setRevealAmount,
                    validator : carousel._validateRevealAmount,
                    value     : attrs.revealAmount || 0
            });

            /**
             * @attribute isCircular
             * @description Set this to true to wrap scrolling of the contents
             * in the Carousel.
             * @default false
             * @type Boolean
             */
            carousel.setAttributeConfig("isCircular", {
                    validator : JS.isBoolean,
                    value     : attrs.isCircular || false
            });

            /**
             * @attribute isVertical
             * @description True if the orientation of the Carousel is vertical
             * @default false
             * @type Boolean
             */
            carousel.setAttributeConfig("isVertical", {
                    method    : carousel._setOrientation,
                    validator : JS.isBoolean,
                    value     : attrs.isVertical || false
            });

            /**
             * @attribute navigation
             * @description The set of navigation controls for Carousel
             * @default <br>
             * { prev: null, // the previous navigation element<br>
             *   next: null } // the next navigation element
             * @type Object
             */
            carousel.setAttributeConfig("navigation", {
                    method    : carousel._setNavigation,
                    validator : carousel._validateNavigation,
                    value     :
                        attrs.navigation || {prev: null,next: null,page: null}
            });

            /**
             * @attribute animation
             * @description The optional animation attributes for the Carousel.
             * @default <br>
             * { speed: 0, // the animation speed (in seconds)<br>
             *   effect: null } // the animation effect (like
             *   YAHOO.util.Easing.easeOut)
             * @type Object
             */
            carousel.setAttributeConfig("animation", {
                    validator : carousel._validateAnimation,
                    value     : attrs.animation || { speed: 0, effect: null }
            });

            /**
             * @attribute autoPlay
             * @description Set this to time in milli-seconds to have the
             * Carousel automatically scroll the contents.
             * @type Number
             * @deprecated Use autoPlayInterval instead.
             */
            carousel.setAttributeConfig("autoPlay", {
                    validator : JS.isNumber,
                    value     : attrs.autoPlay || 0
            });

            /**
             * @attribute autoPlayInterval
             * @description The delay in milli-seconds for scrolling the
             * Carousel during auto-play.
             * Note: The startAutoPlay() method needs to be invoked to trigger
             * automatic scrolling of Carousel.
             * @type Number
             */
            carousel.setAttributeConfig("autoPlayInterval", {
                    validator : JS.isNumber,
                    value     : attrs.autoPlayInterval || 0
            });

            /**
             * @attribute numPages
             * @description The number of pages in the carousel.
             * @type Number
             */
            carousel.setAttributeConfig("numPages", {
                    readOnly  : true,
                    getter    : carousel._getNumPages
            });

            /**
             * @attribute lastVisible
             * @description The last item visible in the carousel.
             * @type Number
             */
            carousel.setAttributeConfig("lastVisible", {
                    readOnly  : true,
                    getter    : carousel._getLastVisible
            });
        },

        /**
         * Initialize and bind the event handlers.
         *
         * @method initEvents
         * @public
         */
        initEvents: function () {
            var carousel = this,
                cssClass = carousel.CLASSES,
                focussedLi;

            carousel.on("keydown", carousel._keyboardEventHandler);

            carousel.on(afterScrollEvent, syncNavigation);

            carousel.on(itemAddedEvent, syncUi);

            carousel.on(itemRemovedEvent, syncUi);

            carousel.on(itemReplacedEvent, syncUi);

            carousel.on(itemSelectedEvent, carousel._focusHandler);

            carousel.on(loadItemsEvent, syncUi);

            carousel.on(allItemsRemovedEvent, function (ev) {
                carousel.scrollTo(0);
                syncNavigation.call(carousel);
                syncPagerUi.call(carousel);
            });

            carousel.on(pageChangeEvent, syncPagerUi, carousel);

            carousel.on(renderEvent, function (ev) {
                if (carousel.get("selectedItem") === null ||
                    carousel.get("selectedItem") <= 0) { //in either case
                    carousel.set("selectedItem", carousel.get("firstVisible"));
                }
                syncNavigation.call(carousel, ev);
                syncPagerUi.call(carousel, ev);
                carousel._setClipContainerSize();
                carousel.show();
            });

            carousel.on("selectedItemChange", function (ev) {
                setItemSelection.call(carousel, ev.newValue, ev.prevValue);
                if (ev.newValue >= 0) {
                    carousel._updateTabIndex(
                            carousel.getElementForItem(ev.newValue));
                }
                carousel.fireEvent(itemSelectedEvent, ev.newValue);
            });

            carousel.on(uiUpdateEvent, function (ev) {
                syncNavigation.call(carousel, ev);
                syncPagerUi.call(carousel, ev);
            });

            carousel.on("firstVisibleChange", function (ev) {
                if (!carousel.get("selectOnScroll")) {
                    if (ev.newValue >= 0) {
                        carousel._updateTabIndex(
                                carousel.getElementForItem(ev.newValue));
                    }
                }
            });

            // Handle item selection on mouse click
            carousel.on("click", function (ev) {
                if (carousel.isAutoPlayOn()) {
                    carousel.stopAutoPlay();
                }
                carousel._itemClickHandler(ev);
                carousel._pagerClickHandler(ev);
            });

            // Restore the focus on the navigation buttons

            Event.onFocus(carousel.get("element"), function (ev, obj) {
                var target = Event.getTarget(ev);

                if (target && target.nodeName.toUpperCase() == "A" &&
                    Dom.getAncestorByClassName(target, cssClass.NAVIGATION)) {
                    if (focussedLi) {
                        Dom.removeClass(focussedLi, cssClass.PAGE_FOCUS);
                    }
                    focussedLi = target.parentNode;
                    Dom.addClass(focussedLi, cssClass.PAGE_FOCUS);
                } else {
                    if (focussedLi) {
                        Dom.removeClass(focussedLi, cssClass.PAGE_FOCUS);
                    }
                }

                obj._hasFocus = true;
                obj._updateNavButtons(Event.getTarget(ev), true);
            }, carousel);

            Event.onBlur(carousel.get("element"), function (ev, obj) {
                obj._hasFocus = false;
                obj._updateNavButtons(Event.getTarget(ev), false);
            }, carousel);
        },

        /**
         * Return true if the Carousel is still animating, or false otherwise.
         *
         * @method isAnimating
         * @return {Boolean} Return true if animation is still in progress, or
         * false otherwise.
         * @public
         */
        isAnimating: function () {
            return this._isAnimationInProgress;
        },

        /**
         * Return true if the auto-scrolling of Carousel is "on", or false
         * otherwise.
         *
         * @method isAutoPlayOn
         * @return {Boolean} Return true if autoPlay is "on", or false
         * otherwise.
         * @public
         */
        isAutoPlayOn: function () {
            return this._isAutoPlayInProgress;
        },

        /**
         * Return the carouselItemEl at index or null if the index is not
         * found.
         *
         * @method getElementForItem
         * @param index {Number} The index of the item to be returned
         * @return {Element} Return the item at index or null if not found
         * @public
         */
        getElementForItem: function (index) {
            var carousel = this;

            if (index < 0 || index >= carousel.get("numItems")) {
                YAHOO.log("Index out of bounds", "error", WidgetName);
                return null;
            }

            if (carousel._itemsTable.items[index]) {
                return Dom.get(carousel._itemsTable.items[index].id);
            }

            return null;
        },

        /**
         * Return the carouselItemEl for all items in the Carousel.
         *
         * @method getElementForItems
         * @return {Array} Return all the items
         * @public
         */
        getElementForItems: function () {
            var carousel = this, els = [], i;

            for (i = 0; i < carousel._itemsTable.numItems; i++) {
                els.push(carousel.getElementForItem(i));
            }

            return els;
        },

        /**
         * Return the item at index or null if the index is not found.
         *
         * @method getItem
         * @param index {Number} The index of the item to be returned
         * @return {Object} Return the item at index or null if not found
         * @public
         */
        getItem: function (index) {
            var carousel = this;

            if (index < 0 || index >= carousel.get("numItems")) {
                YAHOO.log("Index out of bounds", "error", WidgetName);
                return null;
            }

            if (carousel._itemsTable.items.length > index) {
                if (!JS.isUndefined(carousel._itemsTable.items[index])) {
                    return carousel._itemsTable.items[index];
                }
            }

            return null;
        },

        /**
         * Return all items as an array.
         *
         * @method getItems
         * @return {Array} Return all items in the Carousel
         * @public
         */
        getItems: function () {
            return this._itemsTable.items;
        },

        /**
         * Return all loading items as an array.
         *
         * @method getLoadingItems
         * @return {Array} Return all items that are loading in the Carousel.
         * @public
         */
        getLoadingItems: function () {
            return this._itemsTable.loading;
        },

        /**
         * For a multirow carousel, return the number of rows specified by user.
         *
         * @method getItems
         * @return {Number} Number of rows
         * @public
         */
        getRows: function () {
            return this._rows;
        },

        /**
         * For a multirow carousel, return the number of cols specified by user.
         *
         * @method getItems
         * @return {Array} Return all items in the Carousel
         * @public
         */
        getCols: function () {
            return this._cols;
        },

        /**
         * Return the position of the Carousel item that has the id "id", or -1
         * if the id is not found.
         *
         * @method getItemPositionById
         * @param index {Number} The index of the item to be returned
         * @public
         */
        getItemPositionById: function (id) {
            var carousel = this,
                n = carousel.get("numItems"),
                i = 0,
                items = carousel._itemsTable.items,
                item;

            while (i < n) {
                item = items[i] || {};
                if(item.id == id) {
                    return i;
                }
                i++;
            }

            return -1;
        },

        /**
         * Return all visible items as an array.
         *
         * @method getVisibleItems
         * @return {Array} The array of visible items
         * @public
         */
        getVisibleItems: function () {
            var carousel = this,
                i        = carousel.get("firstVisible"),
                n        = i + carousel.get("numVisible"),
                r        = [];

            while (i < n) {
                r.push(carousel.getElementForItem(i));
                i++;
            }

            return r;
        },

        /**
         * Remove an item at index from the Carousel.
         *
         * @method removeItem
         * @public
         * @param index {Number} The position to where in the list (starts from
         * zero).
         * @return {Boolean} Return true on success, false otherwise
         */
        removeItem: function (index) {
            var carousel = this,
                itemsTable = carousel._itemsTable,
                item,
                num      = carousel.get("numItems");

            if (index < 0 || index >= num) {
                YAHOO.log("Index out of bounds", "error", WidgetName);
                return false;
            }

            item = itemsTable.items.splice(index, 1);
            if (item && item.length == 1) {
                if(itemsTable.numItems){
                    itemsTable.numItems--;
                }

                carousel.set("numItems", num - 1);

                carousel.fireEvent(itemRemovedEvent,
                        { item: item[0], pos: index, ev: itemRemovedEvent });
                return true;
            }

            return false;
        },

        /**
         * Replace an item at index witin Carousel.
         *
         * @method replaceItem
         * @public
         * @param item {HTML | Object | HTMLElement} The item to be appended
         * to the Carousel. If the parameter is a string, it is assumed to be
         * the HTML content of the newly created item. If the parameter is an
         * object, it is assumed to supply the content and an optional class
         * and an optional id of the newly created item.
         * @param index {Number} The position to where in the list (starts from
         * zero).
         * @return {Boolean} Return true on success, false otherwise
         */
        replaceItem: function (item, index) {
            var carousel = this,
                className,
                content,
                elId,
                numItems = carousel.get("numItems"),
                oel,
                el = item;

            if (!item) {
                return false;
            }

            if (JS.isString(item) || item.nodeName) {
                content = item.nodeName ? item.innerHTML : item;
            } else if (JS.isObject(item)) {
                content = item.content;
            } else {
                YAHOO.log("Invalid argument to replaceItem", "error", WidgetName);
                return false;
            }

            if (JS.isUndefined(index)) {
                YAHOO.log("Index must be defined for replaceItem", "error", WidgetName);
                return false;
            } else {
                if (index < 0 || index >= numItems) {
                    YAHOO.log("Index out of bounds in replaceItem", "error", WidgetName);
                    return false;
                }

                oel = carousel._itemsTable.items[index];
                if(!oel){
                    oel = carousel._itemsTable.loading[index];
                    carousel._itemsTable.items[index] = undefined;
                }

                elId = oel.id || Dom.generateId();
                carousel._itemsTable.items.splice(index, 1, {
                    item      : content,
                    className : carousel.CLASSES.ITEM + (item.className ? " " + item.className : ""),
                    id        : elId
                });

                el = carousel._itemsTable.items[index];
            }
            carousel.fireEvent(itemReplacedEvent,
                    { newItem: el, oldItem: oel, pos: index, ev: itemReplacedEvent });

            return true;
        },

        /**
         * Replace multiple items at specified indexes.
         * NOTE: item at index must already exist.
         *
         * @method replaceItems
         * @public
         * @param items {Array} An array containing an array of replacement items each linked to the
         * index where the substitution should take place.
         * E.g. [[{content:'<img/>'}, index1], [{content:'<img/>'}, index2]]
         * @return {Boolean} Return true on success, false otherwise
         */
         replaceItems: function (items) {
             var i, n, rv = true;

             if (!JS.isArray(items)) {
                 return false;
             }

             syncUiOnItemInsert = false;
             for (i = 0, n = items.length; i < n; i++) {
                 if (this.replaceItem(items[i][0], items[i][1]) === false) {
                     rv = false;
                 }
             }
             syncUiOnItemInsert = true;

             this._syncUiItems();

             return rv;
         },

        /**
         * Render the Carousel.
         *
         * @method render
         * @public
         * @param appendTo {HTMLElement | String} The element to which the
         * Carousel should be appended prior to rendering.
         * @return {Boolean} Status of the operation
         */
        render: function (appendTo) {
            var carousel  = this,
                cssClass  = carousel.CLASSES,
                rows = carousel._rows;

            carousel.addClass(cssClass.CAROUSEL);

            if (!carousel._clipEl) {
                carousel._clipEl = carousel._createCarouselClip();
                carousel._clipEl.appendChild(carousel._carouselEl);
            }

            if (appendTo) {
                carousel.appendChild(carousel._clipEl);
                carousel.appendTo(appendTo);
            } else {
                if (!Dom.inDocument(carousel.get("element"))) {
                    YAHOO.log("Nothing to render. The container should be " +
                            "within the document if appendTo is not "       +
                            "specified", "error", WidgetName);
                    return false;
                }
                carousel.appendChild(carousel._clipEl);
            }

            if (rows) {
                Dom.addClass(carousel._clipEl, cssClass.MULTI_ROW);
            }

            if (carousel.get("isVertical")) {
                carousel.addClass(cssClass.VERTICAL);
            } else {
                carousel.addClass(cssClass.HORIZONTAL);
            }

            if (carousel.get("numItems") < 1) {
                YAHOO.log("No items in the Carousel to render", "warn",
                        WidgetName);
                return false;
            }

            carousel._refreshUi();

            return true;
        },

        /**
         * Scroll the Carousel by an item backward.
         *
         * @method scrollBackward
         * @public
         */
        scrollBackward: function () {
            var carousel = this;
            carousel.scrollTo(carousel._firstItem -
                              carousel.get("scrollIncrement"));
        },

        /**
         * Scroll the Carousel by an item forward.
         *
         * @method scrollForward
         * @public
         */
        scrollForward: function () {
            var carousel = this;
            carousel.scrollTo(carousel._firstItem +
                              carousel.get("scrollIncrement"));
        },

        /**
         * Scroll the Carousel by a page backward.
         *
         * @method scrollPageBackward
         * @public
         */
        scrollPageBackward: function () {
            var carousel     = this,
                isVertical   = carousel.get("isVertical"),
                cols         = carousel._cols,
                firstVisible = carousel.get("firstVisible"),
                item         = firstVisible - carousel.get("numVisible");

            if (item < 0) {
                // Only account for multi-row when scrolling backwards from
                // item 0
                if (cols) {
                    item = firstVisible - cols;
                }
            }

            carousel.scrollTo(item);
        },

        /**
         * Scroll the Carousel by a page forward.
         *
         * @method scrollPageForward
         * @public
         */
        scrollPageForward: function () {
            var carousel = this,
                item     = carousel._firstItem + carousel.get("numVisible");

            if (item > carousel.get("numItems")) {
                item = 0;
            }

            if (carousel.get("selectOnScroll")) {
                carousel._selectedItem = carousel._getSelectedItem(item);
            }

            carousel.scrollTo(item);
        },

        /**
         * Scroll the Carousel to make the item the first visible item.
         *
         * @method scrollTo
         * @public
         * @param item Number The index of the element to position at.
         * @param dontSelect Boolean True if select should be avoided
         */
        scrollTo: function (item, dontSelect) {
            var carousel   = this, animate, animCfg, isCircular, isVertical,
                delta, direction, firstItem, lastItem, itemsPerRow,
                itemsPerCol, numItems, numPerPage, offset, page, rv, sentinel,
                index, stopAutoScroll,
                itemsTable = carousel._itemsTable;

            if (itemsTable.numItems === 0 || item == carousel._firstItem ||
                carousel.isAnimating()) {
                return; // nothing to do!
            }

            animCfg        = carousel.get("animation");
            isCircular     = carousel.get("isCircular");
            isVertical     = carousel.get("isVertical");
            itemsPerRow    = carousel._cols;
            itemsPerCol    = carousel._rows;
            firstItem      = carousel._firstItem;
            numItems       = carousel.get("numItems");
            numPerPage     = carousel.get("numVisible");
            page           = carousel.get("currentPage");

            stopAutoScroll = function () {
                if (carousel.isAutoPlayOn()) {
                    carousel.stopAutoPlay();
                }
            };

            if (item < 0) {
                if (isCircular) {
                    // Normalize the offset so that it doesn't scroll to a
                    // different index when number of items is not a factor of
                    // the number of visible items
                    if (numItems % numPerPage !== 0) {
                        item = numItems + (numItems%numPerPage) - numPerPage-1;
                    } else {
                        item = numItems + item;
                    }
                } else {
                    stopAutoScroll.call(carousel);
                    return;
                }
            } else if (numItems > 0 && item > numItems - 1) {

                if (carousel.get("isCircular")) {
                    item = numItems - item;
                } else {
                    stopAutoScroll.call(carousel);
                    return;
                }
            }

            if (isNaN(item)) {
                return;
            }

            direction = (carousel._firstItem > item) ? "backward" : "forward";

            sentinel  = firstItem + numPerPage;
            sentinel  = (sentinel > numItems - 1) ? numItems - 1 : sentinel;
            rv = carousel.fireEvent(beforeScrollEvent,
                    { dir: direction, first: firstItem, last: sentinel });
            if (rv === false) { // scrolling is prevented
                return;
            }

            carousel.fireEvent(beforePageChangeEvent, { page: page });

            // call loaditems to check if we have all the items to display
            lastItem = item + numPerPage - 1;
            carousel._loadItems(lastItem > numItems-1 ? numItems-1 : lastItem);

            // Calculate the delta relative to the first item, the delta is
            // always negative.
            delta = 0 - item;

            if (itemsPerCol) {
            	// offset calculations for multirow Carousel
                if (isVertical) {
                    delta = parseInt(delta / itemsPerRow, 10);
                } else {
                    delta = parseInt(delta / itemsPerCol, 10);
                }
            }

            carousel._firstItem = item;
            carousel.set("firstVisible", item);

            if (!dontSelect && carousel.get("selectOnScroll")) {
                carousel._selectedItem = item;
            }

            YAHOO.log("Scrolling to " + item + " delta = " + delta, WidgetName);

            sentinel  = item + numPerPage;
            sentinel  = (sentinel > numItems - 1) ? numItems - 1 : sentinel;

            offset    = getScrollOffset.call(carousel, delta);
            YAHOO.log("Scroll offset = " + offset, WidgetName);

            animate   = animCfg.speed > 0;

            if (animate) {
                carousel._animateAndSetCarouselOffset(offset, item, sentinel,
                        dontSelect);
            } else {
                carousel._setCarouselOffset(offset);
                updateStateAfterScroll.call(carousel, item, sentinel);
            }
        },

        /**
         * Get the page an item is on within carousel.
         *
         * @method getPageForItem
         * @public
         * @param index {Number} Index of item
         * @return {Number} Page item is on
         */
        getPageForItem : function(item) {
            return Math.ceil(
                (item+1) / parseInt(this.get("numVisible"),10)
            );
        },

        /**
         * Get the first visible item's index on any given page.
         *
         * @method getFirstVisibleOnpage
         * @public
         * @param page {Number} Page
         * @return {Number} First item's index
         */
        getFirstVisibleOnPage : function(page) {
            return (page - 1) * this.get("numVisible");
        },

        /**
         * Select the previous item in the Carousel.
         *
         * @method selectPreviousItem
         * @public
         */
        selectPreviousItem: function () {
            var carousel = this,
                newpos   = 0,
                selected = carousel.get("selectedItem");

            if (selected == carousel._firstItem) {
                newpos = selected - carousel.get("numVisible");
                carousel._selectedItem = carousel._getSelectedItem(selected-1);
                // since we have selected the item already
                carousel.scrollTo(newpos, true);
            } else {
                newpos = carousel.get("selectedItem") -
                         carousel.get("scrollIncrement");
                carousel.set("selectedItem",carousel._getSelectedItem(newpos));
            }
        },

        /**
         * Select the next item in the Carousel.
         *
         * @method selectNextItem
         * @public
         */
        selectNextItem: function () {
            var carousel = this, newpos = 0;

            newpos = carousel.get("selectedItem") +
                     carousel.get("scrollIncrement");
            carousel.set("selectedItem", carousel._getSelectedItem(newpos));
        },

        /**
         * Display the Carousel.
         *
         * @method show
         * @public
         */
        show: function () {
            var carousel = this,
                cssClass = carousel.CLASSES;

            if (carousel.fireEvent(beforeShowEvent) !== false) {
                carousel.addClass(cssClass.VISIBLE);
                showNavigation.call(carousel);
                carousel.fireEvent(showEvent);
            }
        },

        /**
         * Start auto-playing the Carousel.
         *
         * @method startAutoPlay
         * @public
         */
        startAutoPlay: function () {
            var carousel = this, timer;

            if (JS.isUndefined(carousel._autoPlayTimer)) {
                timer = carousel.get("autoPlayInterval");
                if (timer <= 0) {
                    return;
                }
                carousel._isAutoPlayInProgress = true;
                carousel.fireEvent(startAutoPlayEvent);
                carousel._autoPlayTimer = setTimeout(function () {
                    carousel._autoScroll();
                }, timer);
            }
        },

        /**
         * Stop auto-playing the Carousel.
         *
         * @method stopAutoPlay
         * @public
         */
        stopAutoPlay: function () {
            var carousel = this;

            if (!JS.isUndefined(carousel._autoPlayTimer)) {
                clearTimeout(carousel._autoPlayTimer);
                delete carousel._autoPlayTimer;
                carousel._isAutoPlayInProgress = false;
                carousel.fireEvent(stopAutoPlayEvent);
            }
        },

        /**
         * Update interface's pagination data within a registered template.
         *
         * @method updatePagination
         * @public
         */
        updatePagination: function () {
            var carousel = this,
                pagination = carousel._pagination;
            if(!pagination.el){ return false; }

            var numItems = carousel.get('numItems'),
                numVisible = carousel.get('numVisible'),
                firstVisible = carousel.get('firstVisible')+1,
                currentPage = carousel.get('currentPage')+1,
                numPages = carousel.get('numPages'),
                replacements = {
                    'numVisible' : numVisible,
                    'numPages' : numPages,
                    'numItems' : numItems,
                    'selectedItem' : carousel.get('selectedItem')+1,
                    'currentPage' : currentPage,
                    'firstVisible' : firstVisible,
                    'lastVisible' : carousel.get("lastVisible")+1
                },
                cb = pagination.callback || {},
                scope = cb.scope && cb.obj ? cb.obj : carousel;

            pagination.el.innerHTML = JS.isFunction(cb.fn) ? cb.fn.apply(scope, [pagination.template, replacements]) : YAHOO.lang.substitute(pagination.template, replacements);
        },

        /**
         * Register carousels pagination template, append to interface, and populate.
         *
         * @method registerPagination
         * @param template {String} Pagination template as passed to lang.substitute
         * @public
         */
        registerPagination: function (tpl, pos, cb) {
            var carousel = this;

            carousel._pagination.template = tpl;
            carousel._pagination.callback = cb || {};

            if(!carousel._pagination.el){
                carousel._pagination.el = createElement('DIV', {className:carousel.CLASSES.PAGINATION});

                if(pos == "before"){
                    carousel._navEl.insertBefore(carousel._pagination.el, carousel._navEl.firstChild);
                } else {
                    carousel._navEl.appendChild(carousel._pagination.el);
                }

                carousel.on('itemSelected', carousel.updatePagination);
                carousel.on('pageChange', carousel.updatePagination);
            }

            carousel.updatePagination();
        },

        /**
         * Return the string representation of the Carousel.
         *
         * @method toString
         * @public
         * @return {String}
         */
        toString: function () {
            return WidgetName + (this.get ? " (#" + this.get("id") + ")" : "");
        },

        /*
         * Protected methods of the Carousel component
         */

        /**
         * Set the Carousel offset to the passed offset after animating.
         *
         * @method _animateAndSetCarouselOffset
         * @param {Integer} offset The offset to which the Carousel has to be
         * scrolled to.
         * @param {Integer} item The index to which the Carousel will scroll.
         * @param {Integer} sentinel The last element in the view port.
         * @protected
         */
        _animateAndSetCarouselOffset: function (offset, item, sentinel) {
            var carousel = this,
                animCfg  = carousel.get("animation"),
                animObj  = null;

            if (carousel.get("isVertical")) {
                animObj = new YAHOO.util.Motion(carousel._carouselEl,
                        { top: { to: offset } },
                        animCfg.speed, animCfg.effect);
            } else {
                animObj = new YAHOO.util.Motion(carousel._carouselEl,
                        { left: { to: offset } },
                        animCfg.speed, animCfg.effect);
            }

            carousel._isAnimationInProgress = true;
            animObj.onComplete.subscribe(carousel._animationCompleteHandler,
                                         { scope: carousel, item: item,
                                           last: sentinel });
            animObj.animate();
        },

        /**
         * Handle the animation complete event.
         *
         * @method _animationCompleteHandler
         * @param {Event} ev The event.
         * @param {Array} p The event parameters.
         * @param {Object} o The object that has the state of the Carousel
         * @protected
         */
        _animationCompleteHandler: function (ev, p, o) {
            o.scope._isAnimationInProgress = false;
            updateStateAfterScroll.call(o.scope, o.item, o.last);
        },

        /**
         * Automatically scroll the contents of the Carousel.
         * @method _autoScroll
         * @protected
         */
        _autoScroll: function() {
            var carousel  = this,
                currIndex = carousel._firstItem,
                index;

            if (currIndex >= carousel.get("numItems") - 1) {
                if (carousel.get("isCircular")) {
                    index = 0;
                } else {
                    carousel.stopAutoPlay();
                }
            } else {
                index = currIndex + carousel.get("numVisible");
            }

            carousel._selectedItem = carousel._getSelectedItem(index);
            carousel.scrollTo.call(carousel, index);
        },

        /**
         * Create the Carousel.
         *
         * @method createCarousel
         * @param elId {String} The id of the element to be created
         * @protected
         */
        _createCarousel: function (elId) {
            var carousel = this,
                cssClass = carousel.CLASSES,
                el       = Dom.get(elId);

            if (!el) {
                el = createElement("DIV", {
                        className : cssClass.CAROUSEL,
                        id        : elId
                });
            }

            if (!carousel._carouselEl) {
                carousel._carouselEl=createElement(carousel.get("carouselEl"),
                        { className: cssClass.CAROUSEL_EL });
            }

            return el;
        },

        /**
         * Create the Carousel clip container.
         *
         * @method createCarouselClip
         * @protected
         */
        _createCarouselClip: function () {
            return createElement("DIV", { className: this.CLASSES.CONTENT });
        },

        /**
         * Create the Carousel item.
         *
         * @method createCarouselItem
         * @param obj {Object} The attributes of the element to be created
         * @protected
         */
        _createCarouselItem: function (obj) {
            var attr, carousel = this;

            return createElement(carousel.get("carouselItemEl"), {
                    className : obj.className,
                    styles    : {},
                    content   : obj.content,
                    id        : obj.id
            });
        },

        /**
         * Return a valid item for a possibly out of bounds index considering
         * the isCircular property.
         *
         * @method _getValidIndex
         * @param index {Number} The index of the item to be returned
         * @return {Object} Return a valid item index
         * @protected
         */
        _getValidIndex: function (index) {
            var carousel   = this,
                isCircular = carousel.get("isCircular"),
                numItems   = carousel.get("numItems"),
                numVisible = carousel.get("numVisible"),
                sentinel   = numItems - 1;

            if (index < 0) {
                index = isCircular ?
                        Math.ceil(numItems/numVisible)*numVisible + index : 0;
            } else if (index > sentinel) {
                index = isCircular ? 0 : sentinel;
            }

            return index;
        },

        /**
         * Get the value for the selected item.
         *
         * @method _getSelectedItem
         * @param val {Number} The new value for "selected" item
         * @return {Number} The new value that would be set
         * @protected
         */
        _getSelectedItem: function (val) {
            var carousel   = this,
                isCircular = carousel.get("isCircular"),
                numItems   = carousel.get("numItems"),
                sentinel   = numItems - 1;

            if (val < 0) {
                if (isCircular) {
                    val = numItems + val;
                } else {
                    val = carousel.get("selectedItem");
                }
            } else if (val > sentinel) {
                if (isCircular) {
                    val = val - numItems;
                } else {
                    val = carousel.get("selectedItem");
                }
            }
            return val;
        },

        /**
         * The "focus" handler for a Carousel.
         *
         * @method _focusHandler
         * @param {Event} ev The event object
         * @protected
         */
         _focusHandler: function() {
             var carousel = this;
             if (carousel._hasFocus) {
                 carousel.focus();
             }
         },

        /**
         * The "click" handler for the item.
         *
         * @method _itemClickHandler
         * @param {Event} ev The event object
         * @protected
         */
        _itemClickHandler: function (ev) {
            var carousel     = this,
                carouselItem = carousel.get("carouselItemEl"),
                container    = carousel.get("element"),
                el,
                item,
                target       = Event.getTarget(ev),
                tag          = target.tagName.toUpperCase();

            if(tag === "INPUT" ||
               tag === "SELECT" ||
               tag === "TEXTAREA") {
                return;
            }

            while (target && target != container &&
                   target.id != carousel._carouselEl) {
                el = target.nodeName;
                if (el.toUpperCase() == carouselItem) {
                    break;
                }
                target = target.parentNode;
            }

            if ((item = carousel.getItemPositionById(target.id)) >= 0) {
                YAHOO.log("Setting selection to " + item, WidgetName);
                carousel.set("selectedItem", carousel._getSelectedItem(item));
                carousel.focus();
            }
        },

        /**
         * The keyboard event handler for Carousel.
         *
         * @method _keyboardEventHandler
         * @param ev {Event} The event that is being handled.
         * @protected
         */
        _keyboardEventHandler: function (ev) {
            var carousel = this,
                key      = Event.getCharCode(ev),
                target   = Event.getTarget(ev),
                prevent  = false;

            // do not mess while animation is in progress or naving via select
            if (carousel.isAnimating() || target.tagName.toUpperCase() === "SELECT") {
                return;
            }

            switch (key) {
            case 0x25:          // left arrow
            case 0x26:          // up arrow
                carousel.selectPreviousItem();
                prevent = true;
                break;
            case 0x27:          // right arrow
            case 0x28:          // down arrow
                carousel.selectNextItem();
                prevent = true;
                break;
            case 0x21:          // page-up
                carousel.scrollPageBackward();
                prevent = true;
                break;
            case 0x22:          // page-down
                carousel.scrollPageForward();
                prevent = true;
                break;
            }

            if (prevent) {
                if (carousel.isAutoPlayOn()) {
                    carousel.stopAutoPlay();
                }
                Event.preventDefault(ev);
            }
        },

        /**
         * The load the required set of items that are needed for display.
         *
         * @method _loadItems
         * @protected
         */
        _loadItems: function(last) {
            var carousel    = this,
                numItems    = carousel.get("numItems"),
                numVisible  = carousel.get("numVisible"),
                reveal      = carousel.get("revealAmount"),
                first       = carousel._itemsTable.items.length,
                lastVisible = carousel.get("lastVisible");

            // adjust if going backwards
            if(first > last && last+1 >= numVisible){
                // need to get first a bit differently for the last page
                first = last % numVisible || last == lastVisible ? last - last % numVisible : last - numVisible + 1;
            }

            if(reveal && last < numItems - 1){ last++; }

            if (last >= first && (!carousel.getItem(first) || !carousel.getItem(last))) {
                carousel.fireEvent(loadItemsEvent, {
                        ev: loadItemsEvent, first: first, last: last,
                        num: last - first + 1
                });
            }

        },

        /**
         * The "onchange" handler for select box pagination.
         *
         * @method _pagerChangeHandler
         * @param {Event} ev The event object
         * @protected
         */
         _pagerChangeHandler: function (ev) {
            var carousel = this,
                target = Event.getTarget(ev),
                 page = target.value,
                 item;

             if (page) {
                 item = carousel.getFirstVisibleOnPage(page);
                 carousel._selectedItem = item;
                 carousel.scrollTo(item);
                 carousel.focus();
            }
          },
        /**
         * The "click" handler for anchor pagination.
         *
         * @method _pagerClickHandler
         * @param {Event} ev The event object
         * @protected
         */
         _pagerClickHandler: function (ev) {
             var carousel = this,
                 css = carousel.CLASSES,
                 target = Event.getTarget(ev),
                 elNode = target.nodeName.toUpperCase(),
                 val,
                 stringIndex,
                 page,
                 item;

             if (Dom.hasClass(target, css.PAGER_ITEM) || Dom.hasClass(target.parentNode, css.PAGER_ITEM))  {
                 if (elNode == "EM") {
                     target = target.parentNode;// item is an em and not an anchor (when text is visible)
                 }
                 val = target.href;
                 stringIndex = val.lastIndexOf("#");
                 page =  parseInt(val.substring(stringIndex+1), 10);
                    if (page != -1) {
                     item = carousel.getFirstVisibleOnPage(page);
                     carousel._selectedItem = item;
                     carousel.scrollTo(item);
                            carousel.focus();
                        }
                        Event.preventDefault(ev);
                    }
        },

        /**
         * Find the Carousel within a container. The Carousel is identified by
         * the first element that matches the carousel element tag or the
         * element that has the Carousel class.
         *
         * @method parseCarousel
         * @param parent {HTMLElement} The parent element to look under
         * @return {Boolean} True if Carousel is found, false otherwise
         * @protected
         */
        _parseCarousel: function (parent) {
            var carousel = this, child, cssClass, domEl, found, node;

            cssClass  = carousel.CLASSES;
            domEl     = carousel.get("carouselEl");
            found     = false;

            for (child = parent.firstChild; child; child = child.nextSibling) {
                if (child.nodeType == 1) {
                    node = child.nodeName;
                    if (node.toUpperCase() == domEl) {
                        carousel._carouselEl = child;
                        Dom.addClass(carousel._carouselEl,
                                     carousel.CLASSES.CAROUSEL_EL);
                        YAHOO.log("Found Carousel - " + node +
                                (child.id ? " (#" + child.id + ")" : ""),
                                WidgetName);
                        found = true;
                    }
                }
            }

            return found;
        },

        /**
         * Find the items within the Carousel and add them to the items table.
         * A Carousel item is identified by elements that matches the carousel
         * item element tag.
         *
         * @method parseCarouselItems
         * @protected
         */
        _parseCarouselItems: function () {
            var carousel = this,
                cssClass = carousel.CLASSES,
                i=0,
                rows,
                child,
                domItemEl,
                elId,
                node,
                index = carousel.get("firstVisible"),
                parent   = carousel._carouselEl;

            rows = carousel._rows;
            domItemEl = carousel.get("carouselItemEl");

            for (child = parent.firstChild; child; child = child.nextSibling) {
                if (child.nodeType == 1) {
                    node = child.nodeName;
                    if (node.toUpperCase() == domItemEl) {
                        if (child.id) {
                            elId = child.id;
                        } else {
                            elId = Dom.generateId();
                            child.setAttribute("id", elId);
                            Dom.addClass(child, carousel.CLASSES.ITEM);
                        }
                        carousel.addItem(child,index);
                        index++;
                    }
                }
            }
        },

        /**
         * Find the Carousel navigation within a container. The navigation
         * elements need to match the carousel navigation class names.
         *
         * @method parseCarouselNavigation
         * @param parent {HTMLElement} The parent element to look under
         * @return {Boolean} True if at least one is found, false otherwise
         * @protected
         */
        _parseCarouselNavigation: function (parent) {
            var carousel = this,
                cfg,
                cssClass = carousel.CLASSES,
                el,
                i,
                j,
                nav,
                rv       = false;

            nav = Dom.getElementsByClassName(cssClass.PREV_PAGE, "*", parent);
            if (nav.length > 0) {
                for (i in nav) {
                    if (nav.hasOwnProperty(i)) {
                        el = nav[i];
                        YAHOO.log("Found Carousel previous page navigation - " +
                                el + (el.id ? " (#" + el.id + ")" : ""),
                                WidgetName);
                        if (el.nodeName == "INPUT" ||
                            el.nodeName == "BUTTON" ||
                            el.nodeName == "A") {// Anchor support in Nav (for SEO)
                            carousel._navBtns.prev.push(el);
                        } else {
                            j = el.getElementsByTagName("INPUT");
                            if (JS.isArray(j) && j.length > 0) {
                                carousel._navBtns.prev.push(j[0]);
                            } else {
                                j = el.getElementsByTagName("BUTTON");
                                if (JS.isArray(j) && j.length > 0) {
                                    carousel._navBtns.prev.push(j[0]);
                                }
                            }
                        }
                    }
                }
                cfg = { prev: nav };
            }

            nav = Dom.getElementsByClassName(cssClass.NEXT_PAGE, "*", parent);
            if (nav.length > 0) {
                for (i in nav) {
                    if (nav.hasOwnProperty(i)) {
                        el = nav[i];
                        YAHOO.log("Found Carousel next page navigation - " +
                                el + (el.id ? " (#" + el.id + ")" : ""),
                                WidgetName);
                        if (el.nodeName == "INPUT" ||
                            el.nodeName == "BUTTON" ||
                            el.nodeName == "A") {// Anchor support in Nav (for SEO)
                            carousel._navBtns.next.push(el);
                        } else {
                            j = el.getElementsByTagName("INPUT");
                            if (JS.isArray(j) && j.length > 0) {
                                carousel._navBtns.next.push(j[0]);
                            } else {
                                j = el.getElementsByTagName("BUTTON");
                                if (JS.isArray(j) && j.length > 0) {
                                    carousel._navBtns.next.push(j[0]);
                                }
                            }
                        }
                    }
                }
                if (cfg) {
                    cfg.next = nav;
                } else {
                    cfg = { next: nav };
                }
            }

            if (cfg) {
                carousel.set("navigation", cfg);
                rv = true;
            }

            return rv;
        },

        /**
         * Refresh the widget UI if it is not already rendered, on first item
         * addition.
         *
         * @method _refreshUi
         * @protected
         */
        _refreshUi: function () {
            var carousel = this,
                isVertical = carousel.get("isVertical"),
                firstVisible = carousel.get("firstVisible"),
                i, item, n, rsz, sz;

            if (carousel._itemsTable.numItems < 1) {
                return;
            }

            sz  = getCarouselItemSize.call(carousel,
                    isVertical ? "height" : "width");
            // This fixes the widget to auto-adjust height/width for absolute
            // positioned children.
            item = carousel._itemsTable.items[firstVisible].id;

            sz   = isVertical ? getStyle(item, "width") :
                    getStyle(item, "height");

            Dom.setStyle(carousel._carouselEl,
                         isVertical ? "width" : "height", sz + "px");

            // Set the rendered state appropriately.
            carousel._hasRendered = true;
            carousel.fireEvent(renderEvent);
        },

        /**
         * Set the Carousel offset to the passed offset.
         *
         * @method _setCarouselOffset
         * @protected
         */
        _setCarouselOffset: function (offset) {
            var carousel = this, which;

            which = carousel.get("isVertical") ? "top" : "left";
            Dom.setStyle(carousel._carouselEl, which, offset + "px");
        },

        /**
         * Setup/Create the Carousel navigation element (if needed).
         *
         * @method _setupCarouselNavigation
         * @protected
         */
        _setupCarouselNavigation: function () {
            var carousel = this,
                btn, cfg, cssClass, nav, navContainer, nextButton, prevButton;

            cssClass = carousel.CLASSES;

            // TODO: can the _navBtns be tested against instead?
            navContainer = Dom.getElementsByClassName(cssClass.NAVIGATION,
                    "DIV", carousel.get("element"));

            if (navContainer.length === 0) {
                navContainer = createElement("DIV",
                        { className: cssClass.NAVIGATION });
                carousel.insertBefore(navContainer,
                        Dom.getFirstChild(carousel.get("element")));
            } else {
                navContainer = navContainer[0];
            }

            carousel._pages.el = createElement("UL");
            navContainer.appendChild(carousel._pages.el);

            nav = carousel.get("navigation");
            if (JS.isString(nav.prev) || JS.isArray(nav.prev)) {
                if (JS.isString(nav.prev)) {
                    nav.prev = [nav.prev];
                }
                for (btn in nav.prev) {
                    if (nav.prev.hasOwnProperty(btn)) {
                        carousel._navBtns.prev.push(Dom.get(nav.prev[btn]));
                    }
                }
            } else {
                // TODO: separate method for creating a navigation button
                prevButton = createElement("SPAN",
                        { className: cssClass.BUTTON + cssClass.FIRST_NAV });
                // XXX: for IE 6.x
                Dom.setStyle(prevButton, "visibility", "visible");
                btn = Dom.generateId();
                prevButton.innerHTML = "<button type=\"button\" "      +
                        "id=\"" + btn + "\" name=\""                   +
                        carousel.STRINGS.PREVIOUS_BUTTON_TEXT + "\">"  +
                        carousel.STRINGS.PREVIOUS_BUTTON_TEXT + "</button>";
                navContainer.appendChild(prevButton);
                btn = Dom.get(btn);
                carousel._navBtns.prev = [btn];
                cfg = { prev: [prevButton] };
            }

            if (JS.isString(nav.next) || JS.isArray(nav.next)) {
                if (JS.isString(nav.next)) {
                    nav.next = [nav.next];
                }
                for (btn in nav.next) {
                    if (nav.next.hasOwnProperty(btn)) {
                        carousel._navBtns.next.push(Dom.get(nav.next[btn]));
                    }
                }
            } else {
                // TODO: separate method for creating a navigation button
                nextButton = createElement("SPAN",
                        { className: cssClass.BUTTON + cssClass.NEXT_NAV });
                // XXX: for IE 6.x
                Dom.setStyle(nextButton, "visibility", "visible");
                btn = Dom.generateId();
                nextButton.innerHTML = "<button type=\"button\" "      +
                        "id=\"" + btn + "\" name=\""                   +
                        carousel.STRINGS.NEXT_BUTTON_TEXT + "\">"      +
                        carousel.STRINGS.NEXT_BUTTON_TEXT + "</button>";
                navContainer.appendChild(nextButton);
                btn = Dom.get(btn);
                carousel._navBtns.next = [btn];
                if (cfg) {
                    cfg.next = [nextButton];
                } else {
                    cfg = { next: [nextButton] };
                }
            }

            if (cfg) {
                carousel.set("navigation", cfg);
            }

            return navContainer;
        },

        /**
         * Set the clip container size (based on the new numVisible value).
         *
         * @method _setClipContainerSize
         * @param clip {HTMLElement} The clip container element.
         * @param num {Number} optional The number of items per page.
         * @protected
         */
        _setClipContainerSize: function (clip, num) {
            var carousel   = this,
                isVertical = carousel.get("isVertical"),
                rows       = carousel._rows,
                cols       = carousel._cols,
                reveal     = carousel.get("revealAmount"),
                itemHeight = getCarouselItemSize.call(carousel, "height"),
                itemWidth  = getCarouselItemSize.call(carousel, "width"),
                containerHeight,
                containerWidth;

            carousel._recomputeSize = (containerHeight === 0); // bleh!
            if (carousel._recomputeSize) {
                carousel._hasRendered = false;
                return;             // no use going further, bail out!
            }

            clip = clip || carousel._clipEl;

            if (rows) {
                 containerHeight = itemHeight * rows;
                 containerWidth  = itemWidth  * cols;
            } else {
                num = num || carousel.get("numVisible");
                if (isVertical) {
                    containerHeight = itemHeight * num;
                } else {
                    containerWidth  = itemWidth  * num;
                }
            }

            reveal = getRevealSize.call(carousel);
            if (isVertical) {
                containerHeight += (reveal * 2);
            } else {
                containerWidth  += (reveal * 2);
            }

            if (isVertical) {
                containerHeight += getDimensions(carousel._carouselEl,"height");
                Dom.setStyle(clip, "height", containerHeight + "px");
                // For multi-row Carousel
                if (cols) {
                    containerWidth += getDimensions(carousel._carouselEl,
                            "width");
                    Dom.setStyle(clip, "width", containerWidth + (0) + "px");
                }
            } else {
                containerWidth += getDimensions(carousel._carouselEl, "width");
                Dom.setStyle(clip, "width", containerWidth + "px");
                // For multi-row Carousel
                if (rows) {
                    containerHeight += getDimensions(carousel._carouselEl,
                            "height");
                    Dom.setStyle(clip, "height", containerHeight + "px");
                }
            }

            if (clip) {
                carousel._setContainerSize(clip); // adjust the container size
            }
        },

        /**
         * Set the container size.
         *
         * @method _setContainerSize
         * @param clip {HTMLElement} The clip container element.
         * @param attr {String} Either set the height or width.
         * @protected
         */
        _setContainerSize: function (clip, attr) {
            var carousel = this,
                config   = carousel.CONFIG,
                cssClass = carousel.CLASSES,
                isVertical,
                rows,
                cols,
                size;

            isVertical = carousel.get("isVertical");
            rows       = carousel._rows;
            cols       = carousel._cols;
            clip       = clip || carousel._clipEl;
            attr       = attr || (isVertical ? "height" : "width");
            size       = parseFloat(Dom.getStyle(clip, attr), 10);

            size = JS.isNumber(size) ? size : 0;

            if (isVertical) {
                size += getDimensions(carousel._carouselEl, "height") +
                        getStyle(carousel._navEl, "height");
            } else {
                size += getDimensions(carousel._carouselEl, "width");
            }

            if (!isVertical) {
                if (size < config.HORZ_MIN_WIDTH) {
                    size = config.HORZ_MIN_WIDTH;
                    carousel.addClass(cssClass.MIN_WIDTH);
                }
            }
            carousel.setStyle(attr,  size + "px");

            // Additionally the width of the container should be set for
            // the vertical Carousel
            if (isVertical) {
                size = getCarouselItemSize.call(carousel, "width");
                if(cols) {
                    size = size * cols;
                }
                // Bug fix for vertical carousel (goes in conjunction with
                // .yui-carousel-element {... 3200px removed from styles), and
                // allows for multirows in IEs).
                Dom.setStyle(carousel._carouselEl, "width", size + "px");
                if (size < config.VERT_MIN_WIDTH) {
                    size = config.VERT_MIN_WIDTH;
                    // set a min width on vertical carousel, don't see why this
                    // shouldn't always be set...
                    carousel.addClass(cssClass.MIN_WIDTH);
                }
                carousel.setStyle("width",  size + "px");
            } else {
                /*
                 * Fix for automatically computing the height and width in IE.
                 * Many thanks to ErisDS for the fix.
                 * For more information visit,
                 * http://erisds.co.uk/code/yui2-javascript-carousel-an-update-about-version-2-8
                 */
                size = getCarouselItemSize.call(carousel, "height");
                if (rows) {
                    size = size * rows;
                }
                Dom.setStyle(carousel._carouselEl, "height", size + "px");
            }
        },

        /**
         * Set the value for the Carousel's first visible item.
         *
         * @method _setFirstVisible
         * @param val {Number} The new value for firstVisible
         * @return {Number} The new value that would be set
         * @protected
         */
        _setFirstVisible: function (val) {
            var carousel = this;

            if (val >= 0 && val < carousel.get("numItems")) {
                carousel.scrollTo(val);
            } else {
                val = carousel.get("firstVisible");
            }
            return val;
        },

        /**
         * Set the value for the Carousel's navigation.
         *
         * @method _setNavigation
         * @param cfg {Object} The navigation configuration
         * @return {Object} The new value that would be set
         * @protected
         */
        _setNavigation: function (cfg) {
            var carousel = this;

            if (cfg.prev) {
                Event.on(cfg.prev, "click", scrollPageBackward, carousel);
            }
            if (cfg.next) {
                Event.on(cfg.next, "click", scrollPageForward, carousel);
            }
        },

        /**
         * Clip the container size every time numVisible is set.
         *
         * @method _setNumVisible
         * @param val {Number} The new value for numVisible
         * @return {Number} The new value that would be set
         * @protected
         */
        _setNumVisible: function (val) { // TODO: _setNumVisible should just be reserved for setting numVisible.
            var carousel = this;

            carousel._setClipContainerSize(carousel._clipEl, val);
        },

        /**
         * Set the value for the number of visible items in the Carousel.
         *
         * @method _numVisibleSetter
         * @param val {Number} The new value for numVisible
         * @return {Number} The new value that would be set
         * @protected
         */
        _numVisibleSetter: function (val) {
            var carousel = this,
                numVisible = val;

            if(JS.isArray(val)) {
                carousel._cols = val[0];
                carousel._rows = val[1];
                numVisible = val[0] *  val[1];
            }
            return numVisible;
        },

        /**
         * Set the value for selectedItem.
         *
         * @method _selectedItemSetter
         * @param val {Number} The new value for selectedItem
         * @return {Number} The new value that would be set
         * @protected
         */
        _selectedItemSetter: function (val) {
            var carousel = this;
            return (val < carousel.get("numItems")) ? val : 0;
        },

        /**
         * Set the number of items in the Carousel.
         * Warning: Setting this to a lower number than the current removes
         * items from the end.
         *
         * @method _setNumItems
         * @param val {Number} The new value for numItems
         * @return {Number} The new value that would be set
         * @protected
         */
        _setNumItems: function (val) {
            var carousel = this,
                num      = carousel._itemsTable.numItems;

            if (JS.isArray(carousel._itemsTable.items)) {
                if (carousel._itemsTable.items.length != num) { // out of sync
                    num = carousel._itemsTable.items.length;
                    carousel._itemsTable.numItems = num;
                }
            }

            if (val < num) {
                while (num > val) {
                    carousel.removeItem(num - 1);
                    num--;
                }
            }

            return val;
        },

        /**
         * Set the orientation of the Carousel.
         *
         * @method _setOrientation
         * @param val {Boolean} The new value for isVertical
         * @return {Boolean} The new value that would be set
         * @protected
         */
        _setOrientation: function (val) {
            var carousel = this,
                cssClass = carousel.CLASSES;

            if (val) {
                carousel.replaceClass(cssClass.HORIZONTAL, cssClass.VERTICAL);
            } else {
                carousel.replaceClass(cssClass.VERTICAL, cssClass.HORIZONTAL);
            }
            /*
                The _itemAttrCache need not be emptied since the cache is for
                DOM attributes that do not change; not the Carousel dimensions.
            */

            return val;
        },

        /**
         * Set the value for the reveal amount percentage in the Carousel.
         *
         * @method _setRevealAmount
         * @param val {Number} The new value for revealAmount
         * @return {Number} The new value that would be set
         * @protected
         */
        _setRevealAmount: function (val) {
            var carousel = this;

            if (val >= 0 && val <= 100) {
                val = parseInt(val, 10);
                val = JS.isNumber(val) ? val : 0;
                carousel._setClipContainerSize();
            } else {
                val = carousel.get("revealAmount");
            }
            return val;
        },

        /**
         * Set the value for the selected item.
         *
         * @method _setSelectedItem
         * @param val {Number} The new value for "selected" item
         * @protected
         */
        _setSelectedItem: function (val) {
            this._selectedItem = val;
        },

        /**
         * Get the total number of pages.
         *
         * @method _getNumPages
         * @protected
         */
        _getNumPages: function () {
            return Math.ceil(
                parseInt(this.get("numItems"),10) / parseInt(this.get("numVisible"),10)
            );
        },

        /**
         * Get the last visible item.
         *
         * @method _getLastVisible
         * @protected
         */
        _getLastVisible: function () {
            var carousel = this;
            return carousel.get("currentPage") + 1 == carousel.get("numPages") ?
                   carousel.get("numItems") - 1:
                   carousel.get("firstVisible") + carousel.get("numVisible") - 1;
        },

        /**
         * Synchronize and redraw the UI after an item is added.
         *
         * @method _syncUiForItemAdd
         * @protected
         */
        _syncUiForItemAdd: function (obj) {
            var attr,
                carousel   = this,
                carouselEl = carousel._carouselEl,
                el,
                item,
                itemsTable = carousel._itemsTable,
                oel,
                pos,
                sibling,
                styles;

            pos  = JS.isUndefined(obj.pos) ?
                   obj.newPos || itemsTable.numItems - 1 : obj.pos;

            if (!oel) {
                item = itemsTable.items[pos] || {};
                el = carousel._createCarouselItem({
                        className : item.className,
                        styles    : item.styles,
                        content   : item.item,
                        id        : item.id,
                        pos       : pos
                });
                if (JS.isUndefined(obj.pos)) {
                    if (!JS.isUndefined(itemsTable.loading[pos])) {
                        oel = itemsTable.loading[pos];
                        // if oel is null, it is a problem ...
                    }
                    if (oel) {
                        // replace the node
                        carouselEl.replaceChild(el, oel);
                        // ... and remove the item from the data structure
                        delete itemsTable.loading[pos];
                    } else {
                        carouselEl.appendChild(el);
                    }
                } else {
                    if (!JS.isUndefined(itemsTable.items[obj.pos + 1])) {
                        sibling = Dom.get(itemsTable.items[obj.pos + 1].id);
                    }
                    if (sibling) {
                        carouselEl.insertBefore(el, sibling);
                    } else {
                        YAHOO.log("Unable to find sibling","error",WidgetName);
                    }
                }
            } else {
                if (JS.isUndefined(obj.pos)) {
                    if (!Dom.isAncestor(carousel._carouselEl, oel)) {
                        carouselEl.appendChild(oel);
                    }
                } else {
                    if (!Dom.isAncestor(carouselEl, oel)) {
                        if (!JS.isUndefined(itemsTable.items[obj.pos + 1])) {
                            carouselEl.insertBefore(oel,
                                    Dom.get(itemsTable.items[obj.pos + 1].id));
                        }
                    }
                }
            }

            if (!carousel._hasRendered) {
                carousel._refreshUi();
            }

            if (carousel.get("selectedItem") < 0) {
                carousel.set("selectedItem", carousel.get("firstVisible"));
            }

            carousel._syncUiItems();
        },

        /**
         * Synchronize and redraw the UI after an item is replaced.
         *
         * @method _syncUiForItemReplace
         * @protected
         */
        _syncUiForItemReplace: function (o) {
            var carousel   = this,
                carouselEl = carousel._carouselEl,
                itemsTable = carousel._itemsTable,
                pos        = o.pos,
                item       = o.newItem,
                oel        = o.oldItem,
                el;

            el = carousel._createCarouselItem({
                className : item.className,
                styles    : item.styles,
                content   : item.item,
                id        : oel.id
            });

            // replace the current item's attributes
            if ((oel = Dom.get(oel.id))) { // testing assignment
                oel.className = item.className;
                oel.styles = item.styles;
                oel.innerHTML = item.item;

                itemsTable.items[pos] = el;

                if (itemsTable.loading[pos]) {
                    itemsTable.numItems++;
                    delete itemsTable.loading[pos];
                }
            }
            // TODO: should we add the item if oel is undefined?

            // sync shouldn't be necessary since we're replacing items that are already positioned
            //carousel._syncUiItems();
        },

        /**
         * Synchronize and redraw the UI after an item is removed.
         *
         * @method _syncUiForItemRemove
         * @protected
         */
        _syncUiForItemRemove: function (obj) {
            var carousel   = this,
                carouselEl = carousel._carouselEl,
                el, item, num, pos;

            num  = carousel.get("numItems");
            item = obj.item;
            pos  = obj.pos;

            if (item && (el = Dom.get(item.id))) {
                if (el && Dom.isAncestor(carouselEl, el)) {
                    Event.purgeElement(el, true);
                    carouselEl.removeChild(el);
                }

                // nothing is done w/ pos after this, should we remove it?
                if (carousel.get("selectedItem") == pos) {
                    pos = pos >= num ? num - 1 : pos;
                }
            } else {
                YAHOO.log("Unable to find item", "warn", WidgetName);
            }

            carousel._syncUiItems();
        },

        /**
         * Find the closest sibling to insert before
         *
         * @method _findClosestSibling
         * @protected
         */
        _findClosestSibling: function (pos) {
            var carousel   = this,
                itemsTable = carousel._itemsTable,
                len        = itemsTable.items.length,
                j          = pos,
                sibling;

            // attempt to find the next closest sibling
            while (j<len && !sibling) {
                sibling = itemsTable.items[++j];
            }

            return sibling;
        },

        /**
         * Synchronize the items table for lazy loading.
         *
         * @method _syncUiForLazyLoading
         * @protected
         */
        _syncUiForLazyLoading: function (obj) {
            var carousel   = this,
                carouselEl = carousel._carouselEl,
                itemsTable = carousel._itemsTable,
                len = itemsTable.items.length,
                sibling = carousel._findClosestSibling(obj.last),
                last = obj.last,
                // only add DOM nodes for the currently visible items
                // this eliminates uneccessary performance overhead
                // but still allows loading styles to be applied to the items
                first = last - carousel.get("numVisible") + 1,
                el,
                j;

            for (var i = first; i <= last; i++) {
                if(!itemsTable.loading[i] && !itemsTable.items[i]){
                    el = carousel._createCarouselItem({
                            className : carousel.CLASSES.ITEM + " " + carousel.CLASSES.ITEM_LOADING,
                            content   : carousel.STRINGS.ITEM_LOADING_CONTENT,
                            id        : Dom.generateId()
                    });
                    if (el) {
                        if (sibling) {
                            sibling = Dom.get(sibling.id);
                            if (sibling) {
                                carouselEl.insertBefore(el, sibling);
                            } else {
                                YAHOO.log("Unable to find sibling", "error",
                                        WidgetName);
                            }
                        } else {
                            carouselEl.appendChild(el);
                        }
                    }
                    itemsTable.loading[i] = el;
                }
            }

            carousel._syncUiItems();
        },

        /**
         * Redraw the UI for item positioning.
         *
         * @method _syncUiItems
         * @protected
         */
        _syncUiItems: function () {

            if(!syncUiOnItemInsert) {
                return;
            }

            var attr,
                carousel = this,
                numItems = carousel.get("numItems"),
                i,
                itemsTable = carousel._itemsTable,
                items = itemsTable.items,
                loading = itemsTable.loading,
                item,
                styles,
                updateStyles = false;

            for (i = 0; i < numItems; i++) {
                item = items[i] || loading[i];

                if (item && item.id) {
                    styles = getCarouselItemPosition.call(carousel, i);
                    item.styles = item.styles || {};

                    for (attr in styles) {
                        if(item.styles[attr] !== styles[attr])
                        {
                            updateStyles = true;
                            item.styles[attr] = styles[attr];
                        }
                    }
                    if(updateStyles)
                    {
                        setStyles(Dom.get(item.id), styles);
                    }
                    updateStyles = false;
                }
            }
        },

        /**
         * Set the correct class for the navigation buttons.
         *
         * @method _updateNavButtons
         * @param el {Object} The target button
         * @param setFocus {Boolean} True to set focus ring, false otherwise.
         * @protected
         */
        _updateNavButtons: function (el, setFocus) {
            var children,
                cssClass = this.CLASSES,
                grandParent,
                parent   = el.parentNode;

            if (!parent) {
                return;
            }
            grandParent = parent.parentNode;

            if (el.nodeName.toUpperCase() == "BUTTON" &&
                Dom.hasClass(parent, cssClass.BUTTON)) {
                if (setFocus) {
                    if (grandParent) {
                        children = Dom.getChildren(grandParent);
                        if (children) {
                            Dom.removeClass(children, cssClass.FOCUSSED_BUTTON);
                        }
                    }
                    Dom.addClass(parent, cssClass.FOCUSSED_BUTTON);
                } else {
                    Dom.removeClass(parent, cssClass.FOCUSSED_BUTTON);
                }
            }
        },

        /**
         * Update the UI for the pager buttons based on the current page and
         * the number of pages.
         *
         * @method _updatePagerButtons
         * @protected
         */
         _updatePagerButtons: function () {

             if(!syncUiOnItemInsert) {
                return;
             }

             var carousel = this,
                 css      = carousel.CLASSES,
                 cur      = carousel._pages.cur, // current page
                 el,
                 html,
                 i,
                 item,
                 n        = carousel.get("numVisible"),
                 num      = carousel._pages.num, // total pages
                 pager    = carousel._pages.el;  // the pager container element

             if (num === 0 || !pager) {
                 return;         // don't do anything if number of pages is 0
             }

             // Hide the pager before redrawing it
             Dom.setStyle(pager, "visibility", "hidden");

             // Remove all nodes from the pager
             while (pager.firstChild) {
                 pager.removeChild(pager.firstChild);
             }

             for (i = 0; i < num; i++) {

                 el   = document.createElement("LI");

                 if (i === 0) {
                     Dom.addClass(el, css.FIRST_PAGE);
                 }
                 if (i == cur) {
                     Dom.addClass(el, css.SELECTED_NAV);
                 }

                 html = "<a class=" + css.PAGER_ITEM + " href=\"#" + (i+1) + "\" tabindex=\"0\"><em>"   +
                         carousel.STRINGS.PAGER_PREFIX_TEXT + " " + (i+1) +
                         "</em></a>";
                 el.innerHTML = html;

                 pager.appendChild(el);
             }

             // Show the pager now
             Dom.setStyle(pager, "visibility", "visible");
         },

        /**
         * Update the UI for the pager menu based on the current page and
         * the number of pages.  If the number of pages is greater than
         * MAX_PAGER_BUTTONS, then the selection of pages is provided by a drop
         * down menu instead of a set of buttons.
         *
         * @method _updatePagerMenu
         * @protected
         */
        _updatePagerMenu: function () {
            var carousel = this,
                css      = carousel.CLASSES,
                cur      = carousel._pages.cur, // current page
                el,
                i,
                item,
                n        = carousel.get("numVisible"),
                num      = carousel._pages.num, // total pages
                pager    = carousel._pages.el,  // the pager container element
                sel;

            if (num === 0 || !pager) {
                return;// don't do anything if number of pages is 0
            }

            sel = document.createElement("SELECT");


            if (!sel) {
                YAHOO.log("Unable to create the pager menu", "error",
                          WidgetName);
                return;
            }

            // Hide the pager before redrawing it
            Dom.setStyle(pager, "visibility", "hidden");

            // Remove all nodes from the pager
            while (pager.firstChild) {
                pager.removeChild(pager.firstChild);
            }

            for (i = 0; i < num; i++) {

                el   = document.createElement("OPTION");
                el.value     = i+1;
                el.innerHTML = carousel.STRINGS.PAGER_PREFIX_TEXT+" "+(i+1);

                if (i == cur) {
                    el.setAttribute("selected", "selected");
                }

                sel.appendChild(el);
            }

            el = document.createElement("FORM");
            if (!el) {
                YAHOO.log("Unable to create the pager menu", "error",
                          WidgetName);
            } else {
                el.appendChild(sel);
                pager.appendChild(el);
            }

            // Show the pager now
            Event.addListener(sel, "change", carousel._pagerChangeHandler, this, true);
            Dom.setStyle(pager, "visibility", "visible");
        },

        /**
         * Set the correct tab index for the Carousel items.
         *
         * @method _updateTabIndex
         * @param el {Object} The element to be focussed
         * @protected
         */
        _updateTabIndex: function (el) {
            var carousel = this;

            if (el) {
                if (carousel._focusableItemEl) {
                    carousel._focusableItemEl.tabIndex = -1;
                }
                carousel._focusableItemEl = el;
                el.tabIndex = 0;
            }
        },

        /**
         * Validate animation parameters.
         *
         * @method _validateAnimation
         * @param cfg {Object} The animation configuration
         * @return {Boolean} The status of the validation
         * @protected
         */
        _validateAnimation: function (cfg) {
            var rv = true;

            if (JS.isObject(cfg)) {
                if (cfg.speed) {
                    rv = rv && JS.isNumber(cfg.speed);
                }
                if (cfg.effect) {
                    rv = rv && JS.isFunction(cfg.effect);
                } else if (!JS.isUndefined(YAHOO.util.Easing)) {
                    cfg.effect = YAHOO.util.Easing.easeOut;
                }
            } else {
                rv = false;
            }

            return rv;
        },

        /**
         * Validate the firstVisible value.
         *
         * @method _validateFirstVisible
         * @param val {Number} The first visible value
         * @return {Boolean} The status of the validation
         * @protected
         */
        _validateFirstVisible: function (val) {
            var carousel = this, numItems = carousel.get("numItems");

            if (JS.isNumber(val)) {
                if (numItems === 0 && val == numItems) {
                    return true;
                } else {
                    return (val >= 0 && val < numItems);
                }
            }

            return false;
        },

        /**
         * Validate and navigation parameters.
         *
         * @method _validateNavigation
         * @param cfg {Object} The navigation configuration
         * @return {Boolean} The status of the validation
         * @protected
         */
        _validateNavigation : function (cfg) {
            var i;

            if (!JS.isObject(cfg)) {
                return false;
            }

            if (cfg.prev) {
                if (!JS.isArray(cfg.prev)) {
                    return false;
                }
                for (i in cfg.prev) {
                    if (cfg.prev.hasOwnProperty(i)) {
                        if (!JS.isString(cfg.prev[i].nodeName)) {
                            return false;
                        }
                    }
                }
            }

            if (cfg.next) {
                if (!JS.isArray(cfg.next)) {
                    return false;
                }
                for (i in cfg.next) {
                    if (cfg.next.hasOwnProperty(i)) {
                        if (!JS.isString(cfg.next[i].nodeName)) {
                            return false;
                        }
                    }
                }
            }

            return true;
        },

        /**
         * Validate the numItems value.
         *
         * @method _validateNumItems
         * @param val {Number} The numItems value
         * @return {Boolean} The status of the validation
         * @protected
         */
        _validateNumItems: function (val) {
            return JS.isNumber(val) && (val >= 0);
        },

        /**
         * Validate the numVisible value.
         *
         * @method _validateNumVisible
         * @param val {Number} The numVisible value
         * @return {Boolean} The status of the validation
         * @protected
         */
        _validateNumVisible: function (val) {
            var rv = false;

            if (JS.isNumber(val)) {
                rv = val > 0 && val <= this.get("numItems");
            } else if (JS.isArray(val)) {
                if (JS.isNumber(val[0]) && JS.isNumber(val[1])) {
                    rv = val[0] * val[1] > 0 && val.length == 2;
                }
            }

            return rv;
        },

        /**
         * Validate the revealAmount value.
         *
         * @method _validateRevealAmount
         * @param val {Number} The revealAmount value
         * @return {Boolean} The status of the validation
         * @protected
         */
        _validateRevealAmount: function (val) {
            var rv = false;

            if (JS.isNumber(val)) {
                rv = val >= 0 && val < 100;
            }

            return rv;
        },

        /**
         * Validate the scrollIncrement value.
         *
         * @method _validateScrollIncrement
         * @param val {Number} The scrollIncrement value
         * @return {Boolean} The status of the validation
         * @protected
         */
        _validateScrollIncrement: function (val) {
            var rv = false;

            if (JS.isNumber(val)) {
                rv = (val > 0 && val < this.get("numItems"));
            }

            return rv;
        }

    });

})();
/*
;;  Local variables: **
;;  mode: js2 **
;;  indent-tabs-mode: nil **
;;  End: **
*/
YAHOO.register("carousel", YAHOO.widget.Carousel, {version: "2.9.0", build: "2800"});
YAHOO.register("carousel", YAHOO.widget.Carousel, {version: "2.9.0", build: "2800"});

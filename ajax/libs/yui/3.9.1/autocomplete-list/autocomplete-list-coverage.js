if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/autocomplete-list/autocomplete-list.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/autocomplete-list/autocomplete-list.js",
    code: []
};
_yuitest_coverage["build/autocomplete-list/autocomplete-list.js"].code=["YUI.add('autocomplete-list', function (Y, NAME) {","","/**","Traditional autocomplete dropdown list widget, just like Mom used to make.","","@module autocomplete","@submodule autocomplete-list","**/","","/**","Traditional autocomplete dropdown list widget, just like Mom used to make.","","@class AutoCompleteList","@extends Widget","@uses AutoCompleteBase","@uses WidgetPosition","@uses WidgetPositionAlign","@constructor","@param {Object} config Configuration object.","**/","","var Lang   = Y.Lang,","    Node   = Y.Node,","    YArray = Y.Array,","","    // Whether or not we need an iframe shim.","    useShim = Y.UA.ie && Y.UA.ie < 7,","","    // keyCode constants.","    KEY_TAB = 9,","","    // String shorthand.","    _CLASS_ITEM        = '_CLASS_ITEM',","    _CLASS_ITEM_ACTIVE = '_CLASS_ITEM_ACTIVE',","    _CLASS_ITEM_HOVER  = '_CLASS_ITEM_HOVER',","    _SELECTOR_ITEM     = '_SELECTOR_ITEM',","","    ACTIVE_ITEM      = 'activeItem',","    ALWAYS_SHOW_LIST = 'alwaysShowList',","    CIRCULAR         = 'circular',","    HOVERED_ITEM     = 'hoveredItem',","    ID               = 'id',","    ITEM             = 'item',","    LIST             = 'list',","    RESULT           = 'result',","    RESULTS          = 'results',","    VISIBLE          = 'visible',","    WIDTH            = 'width',","","    // Event names.","    EVT_SELECT = 'select',","","List = Y.Base.create('autocompleteList', Y.Widget, [","    Y.AutoCompleteBase,","    Y.WidgetPosition,","    Y.WidgetPositionAlign","], {","    // -- Prototype Properties -------------------------------------------------","    ARIA_TEMPLATE: '<div/>',","    ITEM_TEMPLATE: '<li/>',","    LIST_TEMPLATE: '<ul/>',","","    // Widget automatically attaches delegated event handlers to everything in","    // Y.Node.DOM_EVENTS, including synthetic events. Since Widget's event","    // delegation won't work for the synthetic valuechange event, and since","    // it creates a name collision between the backcompat \"valueChange\" synth","    // event alias and AutoCompleteList's \"valueChange\" event for the \"value\"","    // attr, this hack is necessary in order to prevent Widget from attaching","    // valuechange handlers.","    UI_EVENTS: (function () {","        var uiEvents = Y.merge(Y.Node.DOM_EVENTS);","","        delete uiEvents.valuechange;","        delete uiEvents.valueChange;","","        return uiEvents;","    }()),","","    // -- Lifecycle Prototype Methods ------------------------------------------","    initializer: function () {","        var inputNode = this.get('inputNode');","","        if (!inputNode) {","            Y.error('No inputNode specified.');","            return;","        }","","        this._inputNode  = inputNode;","        this._listEvents = [];","","        // This ensures that the list is rendered inside the same parent as the","        // input node by default, which is necessary for proper ARIA support.","        this.DEF_PARENT_NODE = inputNode.get('parentNode');","","        // Cache commonly used classnames and selectors for performance.","        this[_CLASS_ITEM]        = this.getClassName(ITEM);","        this[_CLASS_ITEM_ACTIVE] = this.getClassName(ITEM, 'active');","        this[_CLASS_ITEM_HOVER]  = this.getClassName(ITEM, 'hover');","        this[_SELECTOR_ITEM]     = '.' + this[_CLASS_ITEM];","","        /**","        Fires when an autocomplete suggestion is selected from the list,","        typically via a keyboard action or mouse click.","","        @event select","        @param {Node} itemNode List item node that was selected.","        @param {Object} result AutoComplete result object.","        @preventable _defSelectFn","        **/","        this.publish(EVT_SELECT, {","            defaultFn: this._defSelectFn","        });","    },","","    destructor: function () {","        while (this._listEvents.length) {","            this._listEvents.pop().detach();","        }","","        if (this._ariaNode) {","            this._ariaNode.remove().destroy(true);","        }","    },","","    bindUI: function () {","        this._bindInput();","        this._bindList();","    },","","    renderUI: function () {","        var ariaNode    = this._createAriaNode(),","            boundingBox = this.get('boundingBox'),","            contentBox  = this.get('contentBox'),","            inputNode   = this._inputNode,","            listNode    = this._createListNode(),","            parentNode  = inputNode.get('parentNode');","","        inputNode.addClass(this.getClassName('input')).setAttrs({","            'aria-autocomplete': LIST,","            'aria-expanded'    : false,","            'aria-owns'        : listNode.get('id')","        });","","        // ARIA node must be outside the widget or announcements won't be made","        // when the widget is hidden.","        parentNode.append(ariaNode);","","        // Add an iframe shim for IE6.","        if (useShim) {","            boundingBox.plug(Y.Plugin.Shim);","        }","","        this._ariaNode    = ariaNode;","        this._boundingBox = boundingBox;","        this._contentBox  = contentBox;","        this._listNode    = listNode;","        this._parentNode  = parentNode;","    },","","    syncUI: function () {","        // No need to call _syncPosition() here; the other _sync methods will","        // call it when necessary.","        this._syncResults();","        this._syncVisibility();","    },","","    // -- Public Prototype Methods ---------------------------------------------","","    /**","    Hides the list, unless the `alwaysShowList` attribute is `true`.","","    @method hide","    @see show","    @chainable","    **/","    hide: function () {","        return this.get(ALWAYS_SHOW_LIST) ? this : this.set(VISIBLE, false);","    },","","    /**","    Selects the specified _itemNode_, or the current `activeItem` if _itemNode_","    is not specified.","","    @method selectItem","    @param {Node} [itemNode] Item node to select.","    @param {EventFacade} [originEvent] Event that triggered the selection, if","        any.","    @chainable","    **/","    selectItem: function (itemNode, originEvent) {","        if (itemNode) {","            if (!itemNode.hasClass(this[_CLASS_ITEM])) {","                return this;","            }","        } else {","            itemNode = this.get(ACTIVE_ITEM);","","            if (!itemNode) {","                return this;","            }","        }","","        this.fire(EVT_SELECT, {","            itemNode   : itemNode,","            originEvent: originEvent || null,","            result     : itemNode.getData(RESULT)","        });","","        return this;","    },","","    // -- Protected Prototype Methods ------------------------------------------","","    /**","    Activates the next item after the currently active item. If there is no next","    item and the `circular` attribute is `true`, focus will wrap back to the","    input node.","","    @method _activateNextItem","    @chainable","    @protected","    **/","    _activateNextItem: function () {","        var item = this.get(ACTIVE_ITEM),","            nextItem;","","        if (item) {","            nextItem = item.next(this[_SELECTOR_ITEM]) ||","                    (this.get(CIRCULAR) ? null : item);","        } else {","            nextItem = this._getFirstItemNode();","        }","","        this.set(ACTIVE_ITEM, nextItem);","","        return this;","    },","","    /**","    Activates the item previous to the currently active item. If there is no","    previous item and the `circular` attribute is `true`, focus will wrap back","    to the input node.","","    @method _activatePrevItem","    @chainable","    @protected","    **/","    _activatePrevItem: function () {","        var item     = this.get(ACTIVE_ITEM),","            prevItem = item ? item.previous(this[_SELECTOR_ITEM]) :","                    this.get(CIRCULAR) && this._getLastItemNode();","","        this.set(ACTIVE_ITEM, prevItem || null);","","        return this;","    },","","    /**","    Appends the specified result _items_ to the list inside a new item node.","","    @method _add","    @param {Array|Node|HTMLElement|String} items Result item or array of","        result items.","    @return {NodeList} Added nodes.","    @protected","    **/","    _add: function (items) {","        var itemNodes = [];","","        YArray.each(Lang.isArray(items) ? items : [items], function (item) {","            itemNodes.push(this._createItemNode(item).setData(RESULT, item));","        }, this);","","        itemNodes = Y.all(itemNodes);","        this._listNode.append(itemNodes.toFrag());","","        return itemNodes;","    },","","    /**","    Updates the ARIA live region with the specified message.","","    @method _ariaSay","    @param {String} stringId String id (from the `strings` attribute) of the","        message to speak.","    @param {Object} [subs] Substitutions for placeholders in the string.","    @protected","    **/","    _ariaSay: function (stringId, subs) {","        var message = this.get('strings.' + stringId);","        this._ariaNode.set('text', subs ? Lang.sub(message, subs) : message);","    },","","    /**","    Binds `inputNode` events and behavior.","","    @method _bindInput","    @protected","    **/","    _bindInput: function () {","        var inputNode = this._inputNode,","            alignNode, alignWidth, tokenInput;","","        // Null align means we can auto-align. Set align to false to prevent","        // auto-alignment, or a valid alignment config to customize the","        // alignment.","        if (this.get('align') === null) {","            // If this is a tokenInput, align with its bounding box.","            // Otherwise, align with the inputNode. Bit of a cheat.","            tokenInput = this.get('tokenInput');","            alignNode  = (tokenInput && tokenInput.get('boundingBox')) || inputNode;","","            this.set('align', {","                node  : alignNode,","                points: ['tl', 'bl']","            });","","            // If no width config is set, attempt to set the list's width to the","            // width of the alignment node. If the alignment node's width is","            // falsy, do nothing.","            if (!this.get(WIDTH) && (alignWidth = alignNode.get('offsetWidth'))) {","                this.set(WIDTH, alignWidth);","            }","        }","","        // Attach inputNode events.","        this._listEvents = this._listEvents.concat([","            inputNode.after('blur',  this._afterListInputBlur, this),","            inputNode.after('focus', this._afterListInputFocus, this)","        ]);","    },","","    /**","    Binds list events.","","    @method _bindList","    @protected","    **/","    _bindList: function () {","        this._listEvents = this._listEvents.concat([","            Y.one('doc').after('click', this._afterDocClick, this),","            Y.one('win').after('windowresize', this._syncPosition, this),","","            this.after({","                mouseover: this._afterMouseOver,","                mouseout : this._afterMouseOut,","","                activeItemChange    : this._afterActiveItemChange,","                alwaysShowListChange: this._afterAlwaysShowListChange,","                hoveredItemChange   : this._afterHoveredItemChange,","                resultsChange       : this._afterResultsChange,","                visibleChange       : this._afterVisibleChange","            }),","","            this._listNode.delegate('click', this._onItemClick,","                    this[_SELECTOR_ITEM], this)","        ]);","    },","","    /**","    Clears the contents of the tray.","","    @method _clear","    @protected","    **/","    _clear: function () {","        this.set(ACTIVE_ITEM, null);","        this._set(HOVERED_ITEM, null);","","        this._listNode.get('children').remove(true);","    },","","    /**","    Creates and returns an ARIA live region node.","","    @method _createAriaNode","    @return {Node} ARIA node.","    @protected","    **/","    _createAriaNode: function () {","        var ariaNode = Node.create(this.ARIA_TEMPLATE);","","        return ariaNode.addClass(this.getClassName('aria')).setAttrs({","            'aria-live': 'polite',","            role       : 'status'","        });","    },","","    /**","    Creates and returns an item node with the specified _content_.","","    @method _createItemNode","    @param {Object} result Result object.","    @return {Node} Item node.","    @protected","    **/","    _createItemNode: function (result) {","        var itemNode = Node.create(this.ITEM_TEMPLATE);","","        return itemNode.addClass(this[_CLASS_ITEM]).setAttrs({","            id  : Y.stamp(itemNode),","            role: 'option'","        }).setAttribute('data-text', result.text).append(result.display);","    },","","    /**","    Creates and returns a list node. If the `listNode` attribute is already set","    to an existing node, that node will be used.","","    @method _createListNode","    @return {Node} List node.","    @protected","    **/","    _createListNode: function () {","        var listNode = this.get('listNode') || Node.create(this.LIST_TEMPLATE);","","        listNode.addClass(this.getClassName(LIST)).setAttrs({","            id  : Y.stamp(listNode),","            role: 'listbox'","        });","","        this._set('listNode', listNode);","        this.get('contentBox').append(listNode);","","        return listNode;","    },","","    /**","    Gets the first item node in the list, or `null` if the list is empty.","","    @method _getFirstItemNode","    @return {Node|null}","    @protected","    **/","    _getFirstItemNode: function () {","        return this._listNode.one(this[_SELECTOR_ITEM]);","    },","","    /**","    Gets the last item node in the list, or `null` if the list is empty.","","    @method _getLastItemNode","    @return {Node|null}","    @protected","    **/","    _getLastItemNode: function () {","        return this._listNode.one(this[_SELECTOR_ITEM] + ':last-child');","    },","","    /**","    Synchronizes the result list's position and alignment.","","    @method _syncPosition","    @protected","    **/","    _syncPosition: function () {","        // Force WidgetPositionAlign to refresh its alignment.","        this._syncUIPosAlign();","","        // Resize the IE6 iframe shim to match the list's dimensions.","        this._syncShim();","    },","","    /**","    Synchronizes the results displayed in the list with those in the _results_","    argument, or with the `results` attribute if an argument is not provided.","","    @method _syncResults","    @param {Array} [results] Results.","    @protected","    **/","    _syncResults: function (results) {","        if (!results) {","            results = this.get(RESULTS);","        }","","        this._clear();","","        if (results.length) {","            this._add(results);","            this._ariaSay('items_available');","        }","","        this._syncPosition();","","        if (this.get('activateFirstItem') && !this.get(ACTIVE_ITEM)) {","            this.set(ACTIVE_ITEM, this._getFirstItemNode());","        }","    },","","    /**","    Synchronizes the size of the iframe shim used for IE6 and lower. In other","    browsers, this method is a noop.","","    @method _syncShim","    @protected","    **/","    _syncShim: useShim ? function () {","        var shim = this._boundingBox.shim;","","        if (shim) {","            shim.sync();","        }","    } : function () {},","","    /**","    Synchronizes the visibility of the tray with the _visible_ argument, or with","    the `visible` attribute if an argument is not provided.","","    @method _syncVisibility","    @param {Boolean} [visible] Visibility.","    @protected","    **/","    _syncVisibility: function (visible) {","        if (this.get(ALWAYS_SHOW_LIST)) {","            visible = true;","            this.set(VISIBLE, visible);","        }","","        if (typeof visible === 'undefined') {","            visible = this.get(VISIBLE);","        }","","        this._inputNode.set('aria-expanded', visible);","        this._boundingBox.set('aria-hidden', !visible);","","        if (visible) {","            this._syncPosition();","        } else {","            this.set(ACTIVE_ITEM, null);","            this._set(HOVERED_ITEM, null);","","            // Force a reflow to work around a glitch in IE6 and 7 where some of","            // the contents of the list will sometimes remain visible after the","            // container is hidden.","            this._boundingBox.get('offsetWidth');","        }","","        // In some pages, IE7 fails to repaint the contents of the list after it","        // becomes visible. Toggling a bogus class on the body forces a repaint","        // that fixes the issue.","        if (Y.UA.ie === 7) {","            // Note: We don't actually need to use ClassNameManager here. This","            // class isn't applying any actual styles; it's just frobbing the","            // body element to force a repaint. The actual class name doesn't","            // really matter.","            Y.one('body')","                .addClass('yui3-ie7-sucks')","                .removeClass('yui3-ie7-sucks');","        }","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    /**","    Handles `activeItemChange` events.","","    @method _afterActiveItemChange","    @param {EventFacade} e","    @protected","    **/","    _afterActiveItemChange: function (e) {","        var inputNode = this._inputNode,","            newVal    = e.newVal,","            prevVal   = e.prevVal,","            node;","","        // The previous item may have disappeared by the time this handler runs,","        // so we need to be careful.","        if (prevVal && prevVal._node) {","            prevVal.removeClass(this[_CLASS_ITEM_ACTIVE]);","        }","","        if (newVal) {","            newVal.addClass(this[_CLASS_ITEM_ACTIVE]);","            inputNode.set('aria-activedescendant', newVal.get(ID));","        } else {","            inputNode.removeAttribute('aria-activedescendant');","        }","","        if (this.get('scrollIntoView')) {","            node = newVal || inputNode;","","            if (!node.inRegion(Y.DOM.viewportRegion(), true)","                    || !node.inRegion(this._contentBox, true)) {","","                node.scrollIntoView();","            }","        }","    },","","    /**","    Handles `alwaysShowListChange` events.","","    @method _afterAlwaysShowListChange","    @param {EventFacade} e","    @protected","    **/","    _afterAlwaysShowListChange: function (e) {","        this.set(VISIBLE, e.newVal || this.get(RESULTS).length > 0);","    },","","    /**","    Handles click events on the document. If the click is outside both the","    input node and the bounding box, the list will be hidden.","","    @method _afterDocClick","    @param {EventFacade} e","    @protected","    @since 3.5.0","    **/","    _afterDocClick: function (e) {","        var boundingBox = this._boundingBox,","            target      = e.target;","","        if(target !== this._inputNode && target !== boundingBox &&","                target.ancestor('#' + boundingBox.get('id'), true)){","            this.hide();","        }","    },","","    /**","    Handles `hoveredItemChange` events.","","    @method _afterHoveredItemChange","    @param {EventFacade} e","    @protected","    **/","    _afterHoveredItemChange: function (e) {","        var newVal  = e.newVal,","            prevVal = e.prevVal;","","        if (prevVal) {","            prevVal.removeClass(this[_CLASS_ITEM_HOVER]);","        }","","        if (newVal) {","            newVal.addClass(this[_CLASS_ITEM_HOVER]);","        }","    },","","    /**","    Handles `inputNode` blur events.","","    @method _afterListInputBlur","    @protected","    **/","    _afterListInputBlur: function () {","        this._listInputFocused = false;","","        if (this.get(VISIBLE) &&","                !this._mouseOverList &&","                (this._lastInputKey !== KEY_TAB ||","                    !this.get('tabSelect') ||","                    !this.get(ACTIVE_ITEM))) {","            this.hide();","        }","    },","","    /**","    Handles `inputNode` focus events.","","    @method _afterListInputFocus","    @protected","    **/","    _afterListInputFocus: function () {","        this._listInputFocused = true;","    },","","    /**","    Handles `mouseover` events.","","    @method _afterMouseOver","    @param {EventFacade} e","    @protected","    **/","    _afterMouseOver: function (e) {","        var itemNode = e.domEvent.target.ancestor(this[_SELECTOR_ITEM], true);","","        this._mouseOverList = true;","","        if (itemNode) {","            this._set(HOVERED_ITEM, itemNode);","        }","    },","","    /**","    Handles `mouseout` events.","","    @method _afterMouseOut","    @param {EventFacade} e","    @protected","    **/","    _afterMouseOut: function () {","        this._mouseOverList = false;","        this._set(HOVERED_ITEM, null);","    },","","    /**","    Handles `resultsChange` events.","","    @method _afterResultsChange","    @param {EventFacade} e","    @protected","    **/","    _afterResultsChange: function (e) {","        this._syncResults(e.newVal);","","        if (!this.get(ALWAYS_SHOW_LIST)) {","            this.set(VISIBLE, !!e.newVal.length);","        }","    },","","    /**","    Handles `visibleChange` events.","","    @method _afterVisibleChange","    @param {EventFacade} e","    @protected","    **/","    _afterVisibleChange: function (e) {","        this._syncVisibility(!!e.newVal);","    },","","    /**","    Delegated event handler for item `click` events.","","    @method _onItemClick","    @param {EventFacade} e","    @protected","    **/","    _onItemClick: function (e) {","        var itemNode = e.currentTarget;","","        this.set(ACTIVE_ITEM, itemNode);","        this.selectItem(itemNode, e);","    },","","    // -- Protected Default Event Handlers -------------------------------------","","    /**","    Default `select` event handler.","","    @method _defSelectFn","    @param {EventFacade} e","    @protected","    **/","    _defSelectFn: function (e) {","        var text = e.result.text;","","        // TODO: support typeahead completion, etc.","        this._inputNode.focus();","        this._updateValue(text);","        this._ariaSay('item_selected', {item: text});","        this.hide();","    }","}, {","    ATTRS: {","        /**","        If `true`, the first item in the list will be activated by default when","        the list is initially displayed and when results change.","","        @attribute activateFirstItem","        @type Boolean","        @default false","        **/","        activateFirstItem: {","            value: false","        },","","        /**","        Item that's currently active, if any. When the user presses enter, this","        is the item that will be selected.","","        @attribute activeItem","        @type Node","        **/","        activeItem: {","            setter: Y.one,","            value: null","        },","","        /**","        If `true`, the list will remain visible even when there are no results","        to display.","","        @attribute alwaysShowList","        @type Boolean","        @default false","        **/","        alwaysShowList: {","            value: false","        },","","        /**","        If `true`, keyboard navigation will wrap around to the opposite end of","        the list when navigating past the first or last item.","","        @attribute circular","        @type Boolean","        @default true","        **/","        circular: {","            value: true","        },","","        /**","        Item currently being hovered over by the mouse, if any.","","        @attribute hoveredItem","        @type Node|null","        @readOnly","        **/","        hoveredItem: {","            readOnly: true,","            value: null","        },","","        /**","        Node that will contain result items.","","        @attribute listNode","        @type Node|null","        @initOnly","        **/","        listNode: {","            writeOnce: 'initOnly',","            value: null","        },","","        /**","        If `true`, the viewport will be scrolled to ensure that the active list","        item is visible when necessary.","","        @attribute scrollIntoView","        @type Boolean","        @default false","        **/","        scrollIntoView: {","            value: false","        },","","        /**","        Translatable strings used by the AutoCompleteList widget.","","        @attribute strings","        @type Object","        **/","        strings: {","            valueFn: function () {","                return Y.Intl.get('autocomplete-list');","            }","        },","","        /**","        If `true`, pressing the tab key while the list is visible will select","        the active item, if any.","","        @attribute tabSelect","        @type Boolean","        @default true","        **/","        tabSelect: {","            value: true","        },","","        // The \"visible\" attribute is documented in Widget.","        visible: {","            value: false","        }","    },","","    CSS_PREFIX: Y.ClassNameManager.getClassName('aclist')","});","","Y.AutoCompleteList = List;","","/**","Alias for <a href=\"AutoCompleteList.html\">`AutoCompleteList`</a>. See that class","for API docs.","","@class AutoComplete","**/","","Y.AutoComplete = List;","","","}, '@VERSION@', {","    \"lang\": [","        \"en\",","        \"es\"","    ],","    \"requires\": [","        \"autocomplete-base\",","        \"event-resize\",","        \"node-screen\",","        \"selector-css3\",","        \"shim-plugin\",","        \"widget\",","        \"widget-position\",","        \"widget-position-align\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/autocomplete-list/autocomplete-list.js"].lines = {"1":0,"22":0,"71":0,"73":0,"74":0,"76":0,"81":0,"83":0,"84":0,"85":0,"88":0,"89":0,"93":0,"96":0,"97":0,"98":0,"99":0,"110":0,"116":0,"117":0,"120":0,"121":0,"126":0,"127":0,"131":0,"138":0,"146":0,"149":0,"150":0,"153":0,"154":0,"155":0,"156":0,"157":0,"163":0,"164":0,"177":0,"191":0,"192":0,"193":0,"196":0,"198":0,"199":0,"203":0,"209":0,"224":0,"227":0,"228":0,"231":0,"234":0,"236":0,"249":0,"253":0,"255":0,"268":0,"270":0,"271":0,"274":0,"275":0,"277":0,"290":0,"291":0,"301":0,"307":0,"310":0,"311":0,"313":0,"321":0,"322":0,"327":0,"340":0,"367":0,"368":0,"370":0,"381":0,"383":0,"398":0,"400":0,"415":0,"417":0,"422":0,"423":0,"425":0,"436":0,"447":0,"458":0,"461":0,"473":0,"474":0,"477":0,"479":0,"480":0,"481":0,"484":0,"486":0,"487":0,"499":0,"501":0,"502":0,"515":0,"516":0,"517":0,"520":0,"521":0,"524":0,"525":0,"527":0,"528":0,"530":0,"531":0,"536":0,"542":0,"547":0,"563":0,"570":0,"571":0,"574":0,"575":0,"576":0,"578":0,"581":0,"582":0,"584":0,"587":0,"600":0,"613":0,"616":0,"618":0,"630":0,"633":0,"634":0,"637":0,"638":0,"649":0,"651":0,"656":0,"667":0,"678":0,"680":0,"682":0,"683":0,"695":0,"696":0,"707":0,"709":0,"710":0,"722":0,"733":0,"735":0,"736":0,"749":0,"752":0,"753":0,"754":0,"755":0,"851":0,"876":0,"885":0};
_yuitest_coverage["build/autocomplete-list/autocomplete-list.js"].functions = {"(anonymous 2):70":0,"initializer:80":0,"destructor:115":0,"bindUI:125":0,"renderUI:130":0,"syncUI:160":0,"hide:176":0,"selectItem:190":0,"_activateNextItem:223":0,"_activatePrevItem:248":0,"(anonymous 3):270":0,"_add:267":0,"_ariaSay:289":0,"_bindInput:300":0,"_bindList:339":0,"_clear:366":0,"_createAriaNode:380":0,"_createItemNode:397":0,"_createListNode:414":0,"_getFirstItemNode:435":0,"_getLastItemNode:446":0,"_syncPosition:456":0,"_syncResults:472":0,"(anonymous 4):498":0,"_syncVisibility:514":0,"_afterActiveItemChange:562":0,"_afterAlwaysShowListChange:599":0,"_afterDocClick:612":0,"_afterHoveredItemChange:629":0,"_afterListInputBlur:648":0,"_afterListInputFocus:666":0,"_afterMouseOver:677":0,"_afterMouseOut:694":0,"_afterResultsChange:706":0,"_afterVisibleChange:721":0,"_onItemClick:732":0,"_defSelectFn:748":0,"valueFn:850":0,"(anonymous 1):1":0};
_yuitest_coverage["build/autocomplete-list/autocomplete-list.js"].coveredLines = 158;
_yuitest_coverage["build/autocomplete-list/autocomplete-list.js"].coveredFunctions = 39;
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 1);
YUI.add('autocomplete-list', function (Y, NAME) {

/**
Traditional autocomplete dropdown list widget, just like Mom used to make.

@module autocomplete
@submodule autocomplete-list
**/

/**
Traditional autocomplete dropdown list widget, just like Mom used to make.

@class AutoCompleteList
@extends Widget
@uses AutoCompleteBase
@uses WidgetPosition
@uses WidgetPositionAlign
@constructor
@param {Object} config Configuration object.
**/

_yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "(anonymous 1)", 1);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 22);
var Lang   = Y.Lang,
    Node   = Y.Node,
    YArray = Y.Array,

    // Whether or not we need an iframe shim.
    useShim = Y.UA.ie && Y.UA.ie < 7,

    // keyCode constants.
    KEY_TAB = 9,

    // String shorthand.
    _CLASS_ITEM        = '_CLASS_ITEM',
    _CLASS_ITEM_ACTIVE = '_CLASS_ITEM_ACTIVE',
    _CLASS_ITEM_HOVER  = '_CLASS_ITEM_HOVER',
    _SELECTOR_ITEM     = '_SELECTOR_ITEM',

    ACTIVE_ITEM      = 'activeItem',
    ALWAYS_SHOW_LIST = 'alwaysShowList',
    CIRCULAR         = 'circular',
    HOVERED_ITEM     = 'hoveredItem',
    ID               = 'id',
    ITEM             = 'item',
    LIST             = 'list',
    RESULT           = 'result',
    RESULTS          = 'results',
    VISIBLE          = 'visible',
    WIDTH            = 'width',

    // Event names.
    EVT_SELECT = 'select',

List = Y.Base.create('autocompleteList', Y.Widget, [
    Y.AutoCompleteBase,
    Y.WidgetPosition,
    Y.WidgetPositionAlign
], {
    // -- Prototype Properties -------------------------------------------------
    ARIA_TEMPLATE: '<div/>',
    ITEM_TEMPLATE: '<li/>',
    LIST_TEMPLATE: '<ul/>',

    // Widget automatically attaches delegated event handlers to everything in
    // Y.Node.DOM_EVENTS, including synthetic events. Since Widget's event
    // delegation won't work for the synthetic valuechange event, and since
    // it creates a name collision between the backcompat "valueChange" synth
    // event alias and AutoCompleteList's "valueChange" event for the "value"
    // attr, this hack is necessary in order to prevent Widget from attaching
    // valuechange handlers.
    UI_EVENTS: (function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "(anonymous 2)", 70);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 71);
var uiEvents = Y.merge(Y.Node.DOM_EVENTS);

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 73);
delete uiEvents.valuechange;
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 74);
delete uiEvents.valueChange;

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 76);
return uiEvents;
    }()),

    // -- Lifecycle Prototype Methods ------------------------------------------
    initializer: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "initializer", 80);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 81);
var inputNode = this.get('inputNode');

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 83);
if (!inputNode) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 84);
Y.error('No inputNode specified.');
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 85);
return;
        }

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 88);
this._inputNode  = inputNode;
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 89);
this._listEvents = [];

        // This ensures that the list is rendered inside the same parent as the
        // input node by default, which is necessary for proper ARIA support.
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 93);
this.DEF_PARENT_NODE = inputNode.get('parentNode');

        // Cache commonly used classnames and selectors for performance.
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 96);
this[_CLASS_ITEM]        = this.getClassName(ITEM);
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 97);
this[_CLASS_ITEM_ACTIVE] = this.getClassName(ITEM, 'active');
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 98);
this[_CLASS_ITEM_HOVER]  = this.getClassName(ITEM, 'hover');
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 99);
this[_SELECTOR_ITEM]     = '.' + this[_CLASS_ITEM];

        /**
        Fires when an autocomplete suggestion is selected from the list,
        typically via a keyboard action or mouse click.

        @event select
        @param {Node} itemNode List item node that was selected.
        @param {Object} result AutoComplete result object.
        @preventable _defSelectFn
        **/
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 110);
this.publish(EVT_SELECT, {
            defaultFn: this._defSelectFn
        });
    },

    destructor: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "destructor", 115);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 116);
while (this._listEvents.length) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 117);
this._listEvents.pop().detach();
        }

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 120);
if (this._ariaNode) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 121);
this._ariaNode.remove().destroy(true);
        }
    },

    bindUI: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "bindUI", 125);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 126);
this._bindInput();
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 127);
this._bindList();
    },

    renderUI: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "renderUI", 130);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 131);
var ariaNode    = this._createAriaNode(),
            boundingBox = this.get('boundingBox'),
            contentBox  = this.get('contentBox'),
            inputNode   = this._inputNode,
            listNode    = this._createListNode(),
            parentNode  = inputNode.get('parentNode');

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 138);
inputNode.addClass(this.getClassName('input')).setAttrs({
            'aria-autocomplete': LIST,
            'aria-expanded'    : false,
            'aria-owns'        : listNode.get('id')
        });

        // ARIA node must be outside the widget or announcements won't be made
        // when the widget is hidden.
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 146);
parentNode.append(ariaNode);

        // Add an iframe shim for IE6.
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 149);
if (useShim) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 150);
boundingBox.plug(Y.Plugin.Shim);
        }

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 153);
this._ariaNode    = ariaNode;
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 154);
this._boundingBox = boundingBox;
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 155);
this._contentBox  = contentBox;
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 156);
this._listNode    = listNode;
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 157);
this._parentNode  = parentNode;
    },

    syncUI: function () {
        // No need to call _syncPosition() here; the other _sync methods will
        // call it when necessary.
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "syncUI", 160);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 163);
this._syncResults();
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 164);
this._syncVisibility();
    },

    // -- Public Prototype Methods ---------------------------------------------

    /**
    Hides the list, unless the `alwaysShowList` attribute is `true`.

    @method hide
    @see show
    @chainable
    **/
    hide: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "hide", 176);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 177);
return this.get(ALWAYS_SHOW_LIST) ? this : this.set(VISIBLE, false);
    },

    /**
    Selects the specified _itemNode_, or the current `activeItem` if _itemNode_
    is not specified.

    @method selectItem
    @param {Node} [itemNode] Item node to select.
    @param {EventFacade} [originEvent] Event that triggered the selection, if
        any.
    @chainable
    **/
    selectItem: function (itemNode, originEvent) {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "selectItem", 190);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 191);
if (itemNode) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 192);
if (!itemNode.hasClass(this[_CLASS_ITEM])) {
                _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 193);
return this;
            }
        } else {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 196);
itemNode = this.get(ACTIVE_ITEM);

            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 198);
if (!itemNode) {
                _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 199);
return this;
            }
        }

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 203);
this.fire(EVT_SELECT, {
            itemNode   : itemNode,
            originEvent: originEvent || null,
            result     : itemNode.getData(RESULT)
        });

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 209);
return this;
    },

    // -- Protected Prototype Methods ------------------------------------------

    /**
    Activates the next item after the currently active item. If there is no next
    item and the `circular` attribute is `true`, focus will wrap back to the
    input node.

    @method _activateNextItem
    @chainable
    @protected
    **/
    _activateNextItem: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_activateNextItem", 223);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 224);
var item = this.get(ACTIVE_ITEM),
            nextItem;

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 227);
if (item) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 228);
nextItem = item.next(this[_SELECTOR_ITEM]) ||
                    (this.get(CIRCULAR) ? null : item);
        } else {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 231);
nextItem = this._getFirstItemNode();
        }

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 234);
this.set(ACTIVE_ITEM, nextItem);

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 236);
return this;
    },

    /**
    Activates the item previous to the currently active item. If there is no
    previous item and the `circular` attribute is `true`, focus will wrap back
    to the input node.

    @method _activatePrevItem
    @chainable
    @protected
    **/
    _activatePrevItem: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_activatePrevItem", 248);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 249);
var item     = this.get(ACTIVE_ITEM),
            prevItem = item ? item.previous(this[_SELECTOR_ITEM]) :
                    this.get(CIRCULAR) && this._getLastItemNode();

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 253);
this.set(ACTIVE_ITEM, prevItem || null);

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 255);
return this;
    },

    /**
    Appends the specified result _items_ to the list inside a new item node.

    @method _add
    @param {Array|Node|HTMLElement|String} items Result item or array of
        result items.
    @return {NodeList} Added nodes.
    @protected
    **/
    _add: function (items) {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_add", 267);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 268);
var itemNodes = [];

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 270);
YArray.each(Lang.isArray(items) ? items : [items], function (item) {
            _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "(anonymous 3)", 270);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 271);
itemNodes.push(this._createItemNode(item).setData(RESULT, item));
        }, this);

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 274);
itemNodes = Y.all(itemNodes);
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 275);
this._listNode.append(itemNodes.toFrag());

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 277);
return itemNodes;
    },

    /**
    Updates the ARIA live region with the specified message.

    @method _ariaSay
    @param {String} stringId String id (from the `strings` attribute) of the
        message to speak.
    @param {Object} [subs] Substitutions for placeholders in the string.
    @protected
    **/
    _ariaSay: function (stringId, subs) {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_ariaSay", 289);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 290);
var message = this.get('strings.' + stringId);
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 291);
this._ariaNode.set('text', subs ? Lang.sub(message, subs) : message);
    },

    /**
    Binds `inputNode` events and behavior.

    @method _bindInput
    @protected
    **/
    _bindInput: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_bindInput", 300);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 301);
var inputNode = this._inputNode,
            alignNode, alignWidth, tokenInput;

        // Null align means we can auto-align. Set align to false to prevent
        // auto-alignment, or a valid alignment config to customize the
        // alignment.
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 307);
if (this.get('align') === null) {
            // If this is a tokenInput, align with its bounding box.
            // Otherwise, align with the inputNode. Bit of a cheat.
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 310);
tokenInput = this.get('tokenInput');
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 311);
alignNode  = (tokenInput && tokenInput.get('boundingBox')) || inputNode;

            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 313);
this.set('align', {
                node  : alignNode,
                points: ['tl', 'bl']
            });

            // If no width config is set, attempt to set the list's width to the
            // width of the alignment node. If the alignment node's width is
            // falsy, do nothing.
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 321);
if (!this.get(WIDTH) && (alignWidth = alignNode.get('offsetWidth'))) {
                _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 322);
this.set(WIDTH, alignWidth);
            }
        }

        // Attach inputNode events.
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 327);
this._listEvents = this._listEvents.concat([
            inputNode.after('blur',  this._afterListInputBlur, this),
            inputNode.after('focus', this._afterListInputFocus, this)
        ]);
    },

    /**
    Binds list events.

    @method _bindList
    @protected
    **/
    _bindList: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_bindList", 339);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 340);
this._listEvents = this._listEvents.concat([
            Y.one('doc').after('click', this._afterDocClick, this),
            Y.one('win').after('windowresize', this._syncPosition, this),

            this.after({
                mouseover: this._afterMouseOver,
                mouseout : this._afterMouseOut,

                activeItemChange    : this._afterActiveItemChange,
                alwaysShowListChange: this._afterAlwaysShowListChange,
                hoveredItemChange   : this._afterHoveredItemChange,
                resultsChange       : this._afterResultsChange,
                visibleChange       : this._afterVisibleChange
            }),

            this._listNode.delegate('click', this._onItemClick,
                    this[_SELECTOR_ITEM], this)
        ]);
    },

    /**
    Clears the contents of the tray.

    @method _clear
    @protected
    **/
    _clear: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_clear", 366);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 367);
this.set(ACTIVE_ITEM, null);
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 368);
this._set(HOVERED_ITEM, null);

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 370);
this._listNode.get('children').remove(true);
    },

    /**
    Creates and returns an ARIA live region node.

    @method _createAriaNode
    @return {Node} ARIA node.
    @protected
    **/
    _createAriaNode: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_createAriaNode", 380);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 381);
var ariaNode = Node.create(this.ARIA_TEMPLATE);

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 383);
return ariaNode.addClass(this.getClassName('aria')).setAttrs({
            'aria-live': 'polite',
            role       : 'status'
        });
    },

    /**
    Creates and returns an item node with the specified _content_.

    @method _createItemNode
    @param {Object} result Result object.
    @return {Node} Item node.
    @protected
    **/
    _createItemNode: function (result) {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_createItemNode", 397);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 398);
var itemNode = Node.create(this.ITEM_TEMPLATE);

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 400);
return itemNode.addClass(this[_CLASS_ITEM]).setAttrs({
            id  : Y.stamp(itemNode),
            role: 'option'
        }).setAttribute('data-text', result.text).append(result.display);
    },

    /**
    Creates and returns a list node. If the `listNode` attribute is already set
    to an existing node, that node will be used.

    @method _createListNode
    @return {Node} List node.
    @protected
    **/
    _createListNode: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_createListNode", 414);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 415);
var listNode = this.get('listNode') || Node.create(this.LIST_TEMPLATE);

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 417);
listNode.addClass(this.getClassName(LIST)).setAttrs({
            id  : Y.stamp(listNode),
            role: 'listbox'
        });

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 422);
this._set('listNode', listNode);
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 423);
this.get('contentBox').append(listNode);

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 425);
return listNode;
    },

    /**
    Gets the first item node in the list, or `null` if the list is empty.

    @method _getFirstItemNode
    @return {Node|null}
    @protected
    **/
    _getFirstItemNode: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_getFirstItemNode", 435);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 436);
return this._listNode.one(this[_SELECTOR_ITEM]);
    },

    /**
    Gets the last item node in the list, or `null` if the list is empty.

    @method _getLastItemNode
    @return {Node|null}
    @protected
    **/
    _getLastItemNode: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_getLastItemNode", 446);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 447);
return this._listNode.one(this[_SELECTOR_ITEM] + ':last-child');
    },

    /**
    Synchronizes the result list's position and alignment.

    @method _syncPosition
    @protected
    **/
    _syncPosition: function () {
        // Force WidgetPositionAlign to refresh its alignment.
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_syncPosition", 456);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 458);
this._syncUIPosAlign();

        // Resize the IE6 iframe shim to match the list's dimensions.
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 461);
this._syncShim();
    },

    /**
    Synchronizes the results displayed in the list with those in the _results_
    argument, or with the `results` attribute if an argument is not provided.

    @method _syncResults
    @param {Array} [results] Results.
    @protected
    **/
    _syncResults: function (results) {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_syncResults", 472);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 473);
if (!results) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 474);
results = this.get(RESULTS);
        }

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 477);
this._clear();

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 479);
if (results.length) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 480);
this._add(results);
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 481);
this._ariaSay('items_available');
        }

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 484);
this._syncPosition();

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 486);
if (this.get('activateFirstItem') && !this.get(ACTIVE_ITEM)) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 487);
this.set(ACTIVE_ITEM, this._getFirstItemNode());
        }
    },

    /**
    Synchronizes the size of the iframe shim used for IE6 and lower. In other
    browsers, this method is a noop.

    @method _syncShim
    @protected
    **/
    _syncShim: useShim ? function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "(anonymous 4)", 498);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 499);
var shim = this._boundingBox.shim;

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 501);
if (shim) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 502);
shim.sync();
        }
    } : function () {},

    /**
    Synchronizes the visibility of the tray with the _visible_ argument, or with
    the `visible` attribute if an argument is not provided.

    @method _syncVisibility
    @param {Boolean} [visible] Visibility.
    @protected
    **/
    _syncVisibility: function (visible) {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_syncVisibility", 514);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 515);
if (this.get(ALWAYS_SHOW_LIST)) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 516);
visible = true;
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 517);
this.set(VISIBLE, visible);
        }

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 520);
if (typeof visible === 'undefined') {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 521);
visible = this.get(VISIBLE);
        }

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 524);
this._inputNode.set('aria-expanded', visible);
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 525);
this._boundingBox.set('aria-hidden', !visible);

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 527);
if (visible) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 528);
this._syncPosition();
        } else {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 530);
this.set(ACTIVE_ITEM, null);
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 531);
this._set(HOVERED_ITEM, null);

            // Force a reflow to work around a glitch in IE6 and 7 where some of
            // the contents of the list will sometimes remain visible after the
            // container is hidden.
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 536);
this._boundingBox.get('offsetWidth');
        }

        // In some pages, IE7 fails to repaint the contents of the list after it
        // becomes visible. Toggling a bogus class on the body forces a repaint
        // that fixes the issue.
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 542);
if (Y.UA.ie === 7) {
            // Note: We don't actually need to use ClassNameManager here. This
            // class isn't applying any actual styles; it's just frobbing the
            // body element to force a repaint. The actual class name doesn't
            // really matter.
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 547);
Y.one('body')
                .addClass('yui3-ie7-sucks')
                .removeClass('yui3-ie7-sucks');
        }
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
    Handles `activeItemChange` events.

    @method _afterActiveItemChange
    @param {EventFacade} e
    @protected
    **/
    _afterActiveItemChange: function (e) {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_afterActiveItemChange", 562);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 563);
var inputNode = this._inputNode,
            newVal    = e.newVal,
            prevVal   = e.prevVal,
            node;

        // The previous item may have disappeared by the time this handler runs,
        // so we need to be careful.
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 570);
if (prevVal && prevVal._node) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 571);
prevVal.removeClass(this[_CLASS_ITEM_ACTIVE]);
        }

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 574);
if (newVal) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 575);
newVal.addClass(this[_CLASS_ITEM_ACTIVE]);
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 576);
inputNode.set('aria-activedescendant', newVal.get(ID));
        } else {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 578);
inputNode.removeAttribute('aria-activedescendant');
        }

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 581);
if (this.get('scrollIntoView')) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 582);
node = newVal || inputNode;

            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 584);
if (!node.inRegion(Y.DOM.viewportRegion(), true)
                    || !node.inRegion(this._contentBox, true)) {

                _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 587);
node.scrollIntoView();
            }
        }
    },

    /**
    Handles `alwaysShowListChange` events.

    @method _afterAlwaysShowListChange
    @param {EventFacade} e
    @protected
    **/
    _afterAlwaysShowListChange: function (e) {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_afterAlwaysShowListChange", 599);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 600);
this.set(VISIBLE, e.newVal || this.get(RESULTS).length > 0);
    },

    /**
    Handles click events on the document. If the click is outside both the
    input node and the bounding box, the list will be hidden.

    @method _afterDocClick
    @param {EventFacade} e
    @protected
    @since 3.5.0
    **/
    _afterDocClick: function (e) {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_afterDocClick", 612);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 613);
var boundingBox = this._boundingBox,
            target      = e.target;

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 616);
if(target !== this._inputNode && target !== boundingBox &&
                target.ancestor('#' + boundingBox.get('id'), true)){
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 618);
this.hide();
        }
    },

    /**
    Handles `hoveredItemChange` events.

    @method _afterHoveredItemChange
    @param {EventFacade} e
    @protected
    **/
    _afterHoveredItemChange: function (e) {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_afterHoveredItemChange", 629);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 630);
var newVal  = e.newVal,
            prevVal = e.prevVal;

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 633);
if (prevVal) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 634);
prevVal.removeClass(this[_CLASS_ITEM_HOVER]);
        }

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 637);
if (newVal) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 638);
newVal.addClass(this[_CLASS_ITEM_HOVER]);
        }
    },

    /**
    Handles `inputNode` blur events.

    @method _afterListInputBlur
    @protected
    **/
    _afterListInputBlur: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_afterListInputBlur", 648);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 649);
this._listInputFocused = false;

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 651);
if (this.get(VISIBLE) &&
                !this._mouseOverList &&
                (this._lastInputKey !== KEY_TAB ||
                    !this.get('tabSelect') ||
                    !this.get(ACTIVE_ITEM))) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 656);
this.hide();
        }
    },

    /**
    Handles `inputNode` focus events.

    @method _afterListInputFocus
    @protected
    **/
    _afterListInputFocus: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_afterListInputFocus", 666);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 667);
this._listInputFocused = true;
    },

    /**
    Handles `mouseover` events.

    @method _afterMouseOver
    @param {EventFacade} e
    @protected
    **/
    _afterMouseOver: function (e) {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_afterMouseOver", 677);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 678);
var itemNode = e.domEvent.target.ancestor(this[_SELECTOR_ITEM], true);

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 680);
this._mouseOverList = true;

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 682);
if (itemNode) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 683);
this._set(HOVERED_ITEM, itemNode);
        }
    },

    /**
    Handles `mouseout` events.

    @method _afterMouseOut
    @param {EventFacade} e
    @protected
    **/
    _afterMouseOut: function () {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_afterMouseOut", 694);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 695);
this._mouseOverList = false;
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 696);
this._set(HOVERED_ITEM, null);
    },

    /**
    Handles `resultsChange` events.

    @method _afterResultsChange
    @param {EventFacade} e
    @protected
    **/
    _afterResultsChange: function (e) {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_afterResultsChange", 706);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 707);
this._syncResults(e.newVal);

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 709);
if (!this.get(ALWAYS_SHOW_LIST)) {
            _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 710);
this.set(VISIBLE, !!e.newVal.length);
        }
    },

    /**
    Handles `visibleChange` events.

    @method _afterVisibleChange
    @param {EventFacade} e
    @protected
    **/
    _afterVisibleChange: function (e) {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_afterVisibleChange", 721);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 722);
this._syncVisibility(!!e.newVal);
    },

    /**
    Delegated event handler for item `click` events.

    @method _onItemClick
    @param {EventFacade} e
    @protected
    **/
    _onItemClick: function (e) {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_onItemClick", 732);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 733);
var itemNode = e.currentTarget;

        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 735);
this.set(ACTIVE_ITEM, itemNode);
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 736);
this.selectItem(itemNode, e);
    },

    // -- Protected Default Event Handlers -------------------------------------

    /**
    Default `select` event handler.

    @method _defSelectFn
    @param {EventFacade} e
    @protected
    **/
    _defSelectFn: function (e) {
        _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "_defSelectFn", 748);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 749);
var text = e.result.text;

        // TODO: support typeahead completion, etc.
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 752);
this._inputNode.focus();
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 753);
this._updateValue(text);
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 754);
this._ariaSay('item_selected', {item: text});
        _yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 755);
this.hide();
    }
}, {
    ATTRS: {
        /**
        If `true`, the first item in the list will be activated by default when
        the list is initially displayed and when results change.

        @attribute activateFirstItem
        @type Boolean
        @default false
        **/
        activateFirstItem: {
            value: false
        },

        /**
        Item that's currently active, if any. When the user presses enter, this
        is the item that will be selected.

        @attribute activeItem
        @type Node
        **/
        activeItem: {
            setter: Y.one,
            value: null
        },

        /**
        If `true`, the list will remain visible even when there are no results
        to display.

        @attribute alwaysShowList
        @type Boolean
        @default false
        **/
        alwaysShowList: {
            value: false
        },

        /**
        If `true`, keyboard navigation will wrap around to the opposite end of
        the list when navigating past the first or last item.

        @attribute circular
        @type Boolean
        @default true
        **/
        circular: {
            value: true
        },

        /**
        Item currently being hovered over by the mouse, if any.

        @attribute hoveredItem
        @type Node|null
        @readOnly
        **/
        hoveredItem: {
            readOnly: true,
            value: null
        },

        /**
        Node that will contain result items.

        @attribute listNode
        @type Node|null
        @initOnly
        **/
        listNode: {
            writeOnce: 'initOnly',
            value: null
        },

        /**
        If `true`, the viewport will be scrolled to ensure that the active list
        item is visible when necessary.

        @attribute scrollIntoView
        @type Boolean
        @default false
        **/
        scrollIntoView: {
            value: false
        },

        /**
        Translatable strings used by the AutoCompleteList widget.

        @attribute strings
        @type Object
        **/
        strings: {
            valueFn: function () {
                _yuitest_coverfunc("build/autocomplete-list/autocomplete-list.js", "valueFn", 850);
_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 851);
return Y.Intl.get('autocomplete-list');
            }
        },

        /**
        If `true`, pressing the tab key while the list is visible will select
        the active item, if any.

        @attribute tabSelect
        @type Boolean
        @default true
        **/
        tabSelect: {
            value: true
        },

        // The "visible" attribute is documented in Widget.
        visible: {
            value: false
        }
    },

    CSS_PREFIX: Y.ClassNameManager.getClassName('aclist')
});

_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 876);
Y.AutoCompleteList = List;

/**
Alias for <a href="AutoCompleteList.html">`AutoCompleteList`</a>. See that class
for API docs.

@class AutoComplete
**/

_yuitest_coverline("build/autocomplete-list/autocomplete-list.js", 885);
Y.AutoComplete = List;


}, '@VERSION@', {
    "lang": [
        "en",
        "es"
    ],
    "requires": [
        "autocomplete-base",
        "event-resize",
        "node-screen",
        "selector-css3",
        "shim-plugin",
        "widget",
        "widget-position",
        "widget-position-align"
    ],
    "skinnable": true
});

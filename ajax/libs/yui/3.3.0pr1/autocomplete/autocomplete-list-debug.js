YUI.add('autocomplete-list', function(Y) {

/**
 * Traditional autocomplete dropdown list widget, just like Mom used to make.
 *
 * @module autocomplete
 * @submodule autocomplete-list
 * @class AutoCompleteList
 * @extends Widget
 * @uses AutoCompleteBase
 * @uses WidgetPosition
 * @uses WidgetPositionAlign
 * @uses WidgetStack
 * @constructor
 * @param {Object} config Configuration object.
 */

var Lang   = Y.Lang,
    Node   = Y.Node,
    YArray = Y.Array,

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
    Y.WidgetPositionAlign,
    Y.WidgetStack
], {
    // -- Prototype Properties -------------------------------------------------
    ARIA_TEMPLATE: '<div/>',
    ITEM_TEMPLATE: '<li/>',
    LIST_TEMPLATE: '<ul/>',

    // -- Lifecycle Prototype Methods ------------------------------------------
    initializer: function () {
        var inputNode = this.get('inputNode');

        if (!inputNode) {
            Y.error('No inputNode specified.');
            return;
        }

        this._inputNode  = inputNode;
        this._listEvents = [];

        // This ensures that the list is rendered inside the same parent as the
        // input node by default, which is necessary for proper ARIA support.
        this.DEF_PARENT_NODE = inputNode.get('parentNode');

        // Cache commonly used classnames and selectors for performance.
        this[_CLASS_ITEM]        = this.getClassName(ITEM);
        this[_CLASS_ITEM_ACTIVE] = this.getClassName(ITEM, 'active');
        this[_CLASS_ITEM_HOVER]  = this.getClassName(ITEM, 'hover');
        this[_SELECTOR_ITEM]     = '.' + this[_CLASS_ITEM];

        /**
         * Fires when an autocomplete suggestion is selected from the list by
         * a keyboard action or mouse click.
         *
         * @event select
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *
         * <dl>
         *   <dt>itemNode (Node)</dt>
         *   <dd>
         *     List item node that was selected.
         *   </dd>
         *
         *   <dt>result (Object)</dt>
         *   <dd>
         *     AutoComplete result object.
         *   </dd>
         * </dl>
         *
         * @preventable _defResultsFn
         */
        this.publish(EVT_SELECT, {
            defaultFn: this._defSelectFn
        });
    },

    destructor: function () {
        while (this._listEvents.length) {
            this._listEvents.pop().detach();
        }
    },

    bindUI: function () {
        this._bindInput();
        this._bindList();
    },

    renderUI: function () {
        var ariaNode   = this._createAriaNode(),
            contentBox = this.get('contentBox'),
            inputNode  = this._inputNode,
            listNode   = this.get('listNode'),
            parentNode = inputNode.get('parentNode');

        if (!listNode) {
            listNode = this._createListNode();
            contentBox.append(listNode);
        }

        inputNode.addClass(this.getClassName('input')).setAttrs({
            'aria-autocomplete': LIST,
            'aria-expanded'    : false,
            'aria-owns'        : listNode.get('id'),
            role               : 'combobox'
        });

        // ARIA node must be outside the widget or announcements won't be made
        // when the widget is hidden.
        parentNode.append(ariaNode);

        this._ariaNode    = ariaNode;
        this._boundingBox = this.get('boundingBox');
        this._contentBox  = contentBox;
        this._listNode    = listNode;
        this._parentNode  = parentNode;
    },

    syncUI: function () {
        this._syncResults();
        this._syncVisibility();
    },

    // -- Public Prototype Methods ---------------------------------------------

    /**
     * Hides the list, unless the <code>alwaysShowList</code> attribute is
     * <code>true</code>.
     *
     * @method hide
     * @see show
     * @chainable
     */
    hide: function () {
        return this.get(ALWAYS_SHOW_LIST) ? this : this.set(VISIBLE, false);
    },

    /**
     * Selects the specified <i>itemNode</i>, or the current
     * <code>activeItem</code> if <i>itemNode</i> is not specified.
     *
     * @method selectItem
     * @param {Node} itemNode (optional) Item node to select.
     * @chainable
     */
    selectItem: function (itemNode) {
        if (itemNode) {
            if (!itemNode.hasClass(this[_CLASS_ITEM])) {
                return this;
            }
        } else {
            itemNode = this.get(ACTIVE_ITEM);

            if (!itemNode) {
                return this;
            }
        }

        this.fire(EVT_SELECT, {
            itemNode: itemNode,
            result  : itemNode.getData(RESULT)
        });

        return this;
    },

    // -- Protected Prototype Methods ------------------------------------------

    /**
     * Activates the next item after the currently active item. If there is no
     * next item and the <code>circular</code> attribute is <code>true</code>,
     * focus will wrap back to the input node.
     *
     * @method _activateNextItem
     * @chainable
     * @protected
     */
    _activateNextItem: function () {
        var item = this.get(ACTIVE_ITEM),
            nextItem;

        if (item) {
            nextItem = item.next(this[_SELECTOR_ITEM]) ||
                    (this.get(CIRCULAR) ? null : item);
        } else {
            nextItem = this._getFirstItemNode();
        }

        this.set(ACTIVE_ITEM, nextItem);

        return this;
    },

    /**
     * Activates the item previous to the currently active item. If there is no
     * previous item and the <code>circular</code> attribute is
     * <code>true</code>, focus will wrap back to the input node.
     *
     * @method _activatePrevItem
     * @chainable
     * @protected
     */
    _activatePrevItem: function () {
        var item     = this.get(ACTIVE_ITEM),
            prevItem = item ? item.previous(this[_SELECTOR_ITEM]) :
                    this.get(CIRCULAR) && this._getLastItemNode();

        this.set(ACTIVE_ITEM, prevItem || null);

        return this;
    },

    /**
     * Appends the specified result <i>items</i> to the list inside a new item
     * node.
     *
     * @method _add
     * @param {Array|Node|HTMLElement|String} items Result item or array of
     *   result items.
     * @return {NodeList} Added nodes.
     * @protected
     */
    _add: function (items) {
        var itemNodes = [];

        YArray.each(Lang.isArray(items) ? items : [items], function (item) {
            itemNodes.push(this._createItemNode(item).setData(RESULT, item));
        }, this);

        itemNodes = Y.all(itemNodes);
        this._listNode.append(itemNodes.toFrag());

        return itemNodes;
    },

    /**
     * Updates the ARIA live region with the specified message.
     *
     * @method _ariaSay
     * @param {String} stringId String id (from the <code>strings</code>
     *   attribute) of the message to speak.
     * @param {Object} subs (optional) Substitutions for placeholders in the
     *   string.
     * @protected
     */
    _ariaSay: function (stringId, subs) {
        var message = this.get('strings.' + stringId);
        this._ariaNode.setContent(subs ? Lang.sub(message, subs) : message);
    },

    /**
     * Binds <code>inputNode</code> events and behavior.
     *
     * @method _bindInput
     * @protected
     */
    _bindInput: function () {
        var inputNode  = this._inputNode,
            tokenInput = this.get('tokenInput'),
            alignNode  = (tokenInput && tokenInput.get('boundingBox')) ||
                            inputNode;

        // If this is a tokenInput, align with its bounding box. Otherwise,
        // align with the inputNode.
        if (!this.get('align.node')) {
            this.set('align.node', alignNode);
        }

        if (!this.get(WIDTH)) {
            this.set(WIDTH, alignNode.get('offsetWidth'));
        }

        // Attach inputNode events.
        this._listEvents.push(inputNode.on('blur', this._onInputBlur, this));
    },

    /**
     * Binds list events.
     *
     * @method _bindList
     * @protected
     */
    _bindList: function () {
        this._listEvents.concat([
            this.after('mouseover', this._afterMouseOver),
            this.after('mouseout', this._afterMouseOut),

            this.after('activeItemChange', this._afterActiveItemChange),
            this.after('alwaysShowListChange', this._afterAlwaysShowListChange),
            this.after('hoveredItemChange', this._afterHoveredItemChange),
            this.after('resultsChange', this._afterResultsChange),
            this.after('visibleChange', this._afterVisibleChange),

            this._listNode.delegate('click', this._onItemClick, this[_SELECTOR_ITEM], this)
        ]);
    },

    /**
     * Clears the contents of the tray.
     *
     * @method _clear
     * @protected
     */
    _clear: function () {
        this.set(ACTIVE_ITEM, null);
        this._set(HOVERED_ITEM, null);

        this._listNode.get('children').remove(true);
    },

    /**
     * Creates and returns an ARIA live region node.
     *
     * @method _createAriaNode
     * @return {Node} ARIA node.
     * @protected
     */
    _createAriaNode: function () {
        var ariaNode = Node.create(this.ARIA_TEMPLATE);

        return ariaNode.addClass(this.getClassName('aria')).setAttrs({
            'aria-live': 'polite',
            role       : 'status'
        });
    },

    /**
     * Creates and returns an item node with the specified <i>content</i>.
     *
     * @method _createItemNode
     * @param {Object} result Result object.
     * @return {Node} Item node.
     * @protected
     */
    _createItemNode: function (result) {
        var itemNode = Node.create(this.ITEM_TEMPLATE);

        return itemNode.addClass(this[_CLASS_ITEM]).setAttrs({
            id  : Y.stamp(itemNode),
            role: 'option'
        }).setAttribute('data-text', result.text).append(result.display);
    },

    /**
     * Creates and returns a list node.
     *
     * @method _createListNode
     * @return {Node} List node.
     * @protected
     */
    _createListNode: function () {
        var listNode = Node.create(this.LIST_TEMPLATE);

        return listNode.addClass(this.getClassName(LIST)).setAttrs({
            id  : Y.stamp(listNode),
            role: 'listbox'
        });
    },

    /**
     * Gets the first item node in the list, or <code>null</code> if the list is
     * empty.
     *
     * @method _getFirstItemNode
     * @return {Node|null}
     * @protected
     */
    _getFirstItemNode: function () {
        return this._listNode.one(this[_SELECTOR_ITEM]);
    },

    /**
     * Gets the last item node in the list, or <code>null</code> if the list is
     * empty.
     *
     * @method _getLastItemNode
     * @return {Node|null}
     * @protected
     */
    _getLastItemNode: function () {
        return this._listNode.one(this[_SELECTOR_ITEM] + ':last-child');
    },

    /**
     * Synchronizes the results displayed in the list with those in the
     * <i>results</i> argument, or with the <code>results</code> attribute if an
     * argument is not provided.
     *
     * @method _syncResults
     * @param {Array} results (optional) Results.
     * @protected
     */
    _syncResults: function (results) {
        var items;

        if (!results) {
            results = this.get(RESULTS);
        }

        this._clear();

        if (results.length) {
            items = this._add(results);
            this._ariaSay('items_available');
        }

        if (this.get('activateFirstItem') && !this.get(ACTIVE_ITEM)) {
            this.set(ACTIVE_ITEM, this._getFirstItemNode());
        }
    },

    /**
     * Synchronizes the visibility of the tray with the <i>visible</i> argument,
     * or with the <code>visible</code> attribute if an argument is not
     * provided.
     *
     * @method _syncVisibility
     * @param {Boolean} visible (optional) Visibility.
     * @protected
     */
    _syncVisibility: function (visible) {
        if (this.get(ALWAYS_SHOW_LIST)) {
            visible = true;
            this.set(VISIBLE, visible);
        }

        if (typeof visible === 'undefined') {
            visible = this.get(VISIBLE);
        }

        this._inputNode.set('aria-expanded', visible);
        this._boundingBox.set('aria-hidden', !visible);

        if (visible) {
            // Force WidgetPositionAlign to refresh its alignment.
            this._syncUIPosAlign();
        } else {
            this.set(ACTIVE_ITEM, null);
            this._set(HOVERED_ITEM, null);
        }
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * Handles <code>activeItemChange</code> events.
     *
     * @method _afterActiveItemChange
     * @param {EventTarget} e
     * @protected
     */
    _afterActiveItemChange: function (e) {
        var inputNode = this._inputNode,
            newVal    = e.newVal,
            prevVal   = e.prevVal;

        if (prevVal) {
            prevVal.removeClass(this[_CLASS_ITEM_ACTIVE]);
        }

        if (newVal) {
            newVal.addClass(this[_CLASS_ITEM_ACTIVE]).scrollIntoView();
            inputNode.set('aria-activedescendant', newVal.get(ID));
        } else {
            inputNode.scrollIntoView();
        }
    },

    /**
     * Handles <code>alwaysShowListChange</code> events.
     *
     * @method _afterAlwaysShowListChange
     * @param {EventTarget} e
     * @protected
     */
    _afterAlwaysShowListChange: function (e) {
        this.set(VISIBLE, e.newVal || this.get(RESULTS).length > 0);
    },

    /**
     * Handles <code>hoveredItemChange</code> events.
     *
     * @method _afterHoveredItemChange
     * @param {EventTarget} e
     * @protected
     */
    _afterHoveredItemChange: function (e) {
        var newVal  = e.newVal,
            prevVal = e.prevVal;

        if (prevVal) {
            prevVal.removeClass(this[_CLASS_ITEM_HOVER]);
        }

        if (newVal) {
            newVal.addClass(this[_CLASS_ITEM_HOVER]);
        }
    },

    /**
     * Handles <code>mouseover</code> events.
     *
     * @method _afterMouseOver
     * @param {EventTarget} e
     * @protected
     */
    _afterMouseOver: function (e) {
        var itemNode = e.domEvent.target.ancestor(this[_SELECTOR_ITEM], true);

        this._mouseOverList = true;

        if (itemNode) {
            this._set(HOVERED_ITEM, itemNode);
        }
    },

    /**
     * Handles <code>mouseout</code> events.
     *
     * @method _afterMouseOut
     * @param {EventTarget} e
     * @protected
     */
    _afterMouseOut: function () {
        this._mouseOverList = false;
        this._set(HOVERED_ITEM, null);
    },

    /**
     * Handles <code>resultsChange</code> events.
     *
     * @method _afterResultsChange
     * @param {EventFacade} e
     * @protected
     */
    _afterResultsChange: function (e) {
        this._syncResults(e.newVal);

        if (!this.get(ALWAYS_SHOW_LIST)) {
            this.set(VISIBLE, !!e.newVal.length);
        }
    },

    /**
     * Handles <code>visibleChange</code> events.
     *
     * @method _afterVisibleChange
     * @param {EventFacade} e
     * @protected
     */
    _afterVisibleChange: function (e) {
        this._syncVisibility(!!e.newVal);
    },

    /**
     * Handles <code>inputNode</code> <code>blur</code> events.
     *
     * @method _onInputBlur
     * @param {EventTarget} e
     * @protected
     */
    _onInputBlur: function (e) {
        // Hide the list on inputNode blur events, unless the mouse is currently
        // over the list (which indicates that the user is probably interacting
        // with it). The _lastInputKey property comes from the
        // autocomplete-list-keys module.
        if (!this._mouseOverList || this._lastInputKey === KEY_TAB) {
            this.hide();
        }
    },

    /**
     * Delegated event handler for item <code>click</code> events.
     *
     * @method _onItemClick
     * @param {EventTarget} e
     * @protected
     */
    _onItemClick: function (e) {
        var itemNode = e.currentTarget;

        e.preventDefault();

        this.set(ACTIVE_ITEM, itemNode);
        this.selectItem(itemNode);
    },

    // -- Protected Default Event Handlers -------------------------------------

    /**
     * Default <code>select</code> event handler.
     *
     * @method _defSelectFn
     * @param {EventTarget} e
     * @protected
     */
    _defSelectFn: function (e) {
        var text = e.result.text;

        // TODO: support typeahead completion, etc.
        this._inputNode.focus();
        this._updateValue(text);
        this._ariaSay('item_selected', {item: text});
        this.hide();
    }
}, {
    ATTRS: {
        /**
         * If <code>true</code>, the first item in the list will be activated by
         * default when the list is initially displayed and when results change.
         *
         * @attribute activateFirstItem
         * @type Boolean
         * @default false
         */
        activateFirstItem: {
            value: false
        },

        /**
         * Item that's currently active, if any. When the user presses enter,
         * this is the item that will be selected.
         *
         * @attribute activeItem
         * @type Node
         */
        activeItem: {
            setter: Y.one,
            value: null
        },

        // The "align" attribute is documented in WidgetPositionAlign.
        align: {
            value: {
                points: ['tl', 'bl']
            }
        },

        /**
         * If <code>true</code>, the list will remain visible even when there
         * are no results to display.
         *
         * @attribute alwaysShowList
         * @type Boolean
         * @default false
         */
        alwaysShowList: {
            value: false
        },

        /**
         * If <code>true</code>, keyboard navigation will wrap around to the
         * opposite end of the list when navigating past the first or last item.
         *
         * @attribute circular
         * @type Boolean
         * @default true
         */
        circular: {
            value: true
        },

        /**
         * Item currently being hovered over by the mouse, if any.
         *
         * @attribute hoveredItem
         * @type Node|null
         * @readonly
         */
        hoveredItem: {
            readOnly: true,
            value: null
        },

        /**
         * Translatable strings used by the AutoCompleteList widget.
         *
         * @attribute strings
         * @type Object
         */
        strings: {
            valueFn: function () {
                return Y.Intl.get('autocomplete-list');
            }
        },

        /**
         * If <code>true</code>, pressing the tab key while the list is visible
         * will select the active item, if any.
         *
         * @attribute tabSelect
         * @type Boolean
         * @default true
         */
        tabSelect: {
            value: true
        },

        // The "visible" attribute is documented in Widget.
        visible: {
            value: false
        }
    },

    CSS_PREFIX: Y.ClassNameManager.getClassName('aclist'),

    HTML_PARSER: {
        /**
         * Node that will contain result items.
         *
         * @attribute listNode
         * @type Node|null
         * @readonly
         */
        listNode: function () {
            return this.getClassName(LIST);
        }
    }
});

Y.AutoCompleteList = List;

/**
 * Alias for <a href="AutoCompleteList.html"><code>AutoCompleteList</code></a>.
 * See that class for API docs.
 *
 * @class AutoComplete
 */

Y.AutoComplete = List;


}, '@VERSION@' ,{skinnable:true, requires:['autocomplete-base', 'widget', 'widget-position', 'widget-position-align', 'widget-stack'], lang:['en']});

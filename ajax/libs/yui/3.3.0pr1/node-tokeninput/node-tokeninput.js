YUI.add('node-tokeninput', function(Y) {

/**
 * Node plugin that turns a text input field into a tokenized input field
 * similar to Cocoa's NSTokenField control.
 *
 * @module node-tokeninput
 * @since 3.3.0
 * @namespace Plugin
 * @class TokenInput
 * @constructor
 * @param {Object} config Configuration object.
 */

var doc = Y.config.doc,

    Lang   = Y.Lang,
    Node   = Y.Node,
    YArray = Y.Array,

    getClassName = Y.bind(Y.ClassNameManager.getClassName, null, 'tokeninput'),

    // keyCode constants.
    KEY_BACKSPACE = 8,
    KEY_DELETE    = 46,
    KEY_DOWN      = 40,
    KEY_ENTER     = 13,
    KEY_LEFT      = 37,
    KEY_RIGHT     = 39,
    KEY_UP        = 38,

    EMPTY_OBJECT = {},

    // String shorthand.
    DELIMITER = 'delimiter',
    TOKENS    = 'tokens',
    VALUE     = 'value';

function TokenInput() {
    TokenInput.superclass.constructor.apply(this, arguments);
}

Y.extend(TokenInput, Y.Plugin.Base, {
    // -- Prototype Properties -------------------------------------------------
    BOX_TEMPLATE    : '<div/>',
    CONTENT_TEMPLATE: '<div/>',
    INPUT_TEMPLATE  : '<input type="text" autocomplete="off">',
    ITEM_TEMPLATE   : '<li/>',
    LIST_TEMPLATE   : '<ul/>',
    REMOVE_TEMPLATE : '<a href="#" title="Remove"><span role="img">\u00D7</span></a>',

    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        var keys      = {},
            selectors = {},
            initialTokens;

        Y.Object.each(TokenInput.CLASS_NAMES, function (className, name) {
            selectors[name] = '.' + className;
        }, this);

        keys[KEY_BACKSPACE] = this._keyBackspace;
        keys[KEY_DELETE]    = this._keyDelete;
        keys[KEY_DOWN]      = this._keyDown;
        keys[KEY_ENTER]     = this._keyEnter;
        keys[KEY_LEFT]      = this._keyLeft;
        keys[KEY_RIGHT]     = this._keyRight;
        keys[KEY_UP]        = this._keyUp;

        this._host      = this.get('host');
        this._keys      = keys;
        this._selectors = selectors;

        initialTokens = this._tokenizeValue(this._host, null, {
            all     : true,
            updateUI: false
        });

        if (initialTokens) {
            this.set(TOKENS, this.get(TOKENS).concat(initialTokens));
        }

        this._render();
        this._bind();
        this._sync();
    },

    destructor: function () {
        var events = this._events;

        while (events && events.length) {
            events.pop().detach();
        }
    },

    // -- Public Prototype Methods ---------------------------------------------

    /**
     * Adds one or more tokens at the specified index, or at the end of the
     * token list if no index is specified.
     *
     * @method add
     * @param {Array|String} newTokens Token string or array of token strings.
     * @param {Number} index (optional) 0-based index at which to add the token.
     * @chainable
     */
    add: function (newTokens, index) {
        var addTokens = [],
            items     = [],
            tokens    = this.get(TOKENS);

        newTokens = Lang.isArray(newTokens) ? newTokens :
                newTokens.split(this.get(DELIMITER));

        YArray.each(newTokens, function (token, i) {
            token = Lang.trim(token);

            if (token) {
                addTokens.push(token);

                items.push(this._createItem({
                    text : token,
                    token: true
                }));
            }
        }, this);

        if (items.length && addTokens.length) {
            items = Y.all(items).toFrag();

            if ((index || index === 0) && index < tokens.length) {
                tokens = tokens.concat();
                tokens.splice.apply(tokens, [index, 0].concat(addTokens));
                this._tokenNodes.item(index).insert(items, 'before');
            } else {
                tokens = tokens.concat(addTokens);
                this._inputItem.insert(items, 'before');
            }

            this._tokenNodes.refresh();
            this.set(TOKENS, tokens, {atomic: true});
        }

        return this;
    },

    /**
     * Removes all tokens.
     *
     * @method clear
     * @chainable
     */
    clear: function () {
        this._tokenNodes.remove(true);
        this._tokenNodes.refresh();

        return this.set(TOKENS, [], {atomic: true});
    },

    /**
     * Removes the token at the specified index.
     *
     * @method remove
     * @param {Number} index 0-based index of the token to remove.
     * @chainable
     */
    remove: function (index) {
        var tokens = this.get(TOKENS);

        tokens.splice(index, 1);

        this._tokenNodes.item(index).remove(true);
        this._tokenNodes.refresh();

        return this.set(TOKENS, tokens, {atomic: true});
    },

    // -- Protected Prototype Methods ------------------------------------------

    /**
     * Binds token input events.
     *
     * @method _bind
     * @protected
     */
    _bind: function () {
        var list      = this._list,
            selectors = this._selectors;

        if (!this._events) {
            this._events = [];
        }

        this._events.concat([
            this._boundingBox.after({
                blur : this._afterBlur,
                click: this._afterFocus, // for FF4, which is buggy
                focus: this._afterFocus
            }, null, this),

            list.delegate({
                blur     : this._onTokenBlur,
                focus    : this._onTokenFocus,
                mouseover: this._onTokenMouseOver,
                mouseout : this._onTokenMouseOut
            }, selectors.token, this),

            list.delegate(Y.UA.gecko ? 'keypress' : 'keydown', this._onKey,
                    selectors.input + ',' + selectors.token, this),

            list.delegate('click', this._onRemoveClick, selectors.remove, this),

            this.after({
                fauxInputChange   : this._afterFauxInputChange,
                removeButtonChange: this._afterRemoveButtonChange,
                tokensChange      : this._afterTokensChange
            })
        ]);
    },

    /**
     * Removes and purges all items from the list, including the input field.
     *
     * @method _clearItems
     * @protected
     */
    _clearItems: function () {
        this._list.all(this._selectors.item).remove(true);
    },

    /**
     * Creates and returns a new token list item.
     *
     * @method _createItem
     * @param {Object} options (optional) Item options.
     * @return {Node} New item.
     * @protected
     */
    _createItem: function (options) {
        var classNames = TokenInput.CLASS_NAMES,
            item       = Node.create(this.ITEM_TEMPLATE),
            input;

        if (!options) {
            options = EMPTY_OBJECT;
        }

        item.addClass(classNames.item);

        YArray.each(['editable', 'hidden', 'token'], function (option) {
            if (options[option]) {
                item.addClass(classNames[option]);
            }
        });

        if (options.editable) {
            input = Node.create(this.INPUT_TEMPLATE).addClass(classNames.input);

            // Event will be purged when the item is removed.
            input.on('valueChange', this._afterInputValueChange, this);

            item.append(input);
        }

        if (options.token) {
            item.setAttrs({
                tabIndex: 0,
                text    : options.text || ''
            });

            if (this.get('removeButton')) {
                item.addClass(classNames.hasremove).append(
                    Node.create(this.REMOVE_TEMPLATE).addClass(
                        classNames.remove).set('role', 'button')
                );
            }
        }

        return item;
    },

    /**
     * Focuses the token after the specified item node, or the input node if
     * there is no next token.
     *
     * @method _focusNext
     * @param {Node} node
     * @return {Boolean} <code>true</code> if focus was set, <code>false</code>
     *   otherwise.
     * @protected
     */
    _focusNext: function (node) {
        var selectors = this._selectors,
            nextToken;

        node      = node.ancestor(selectors.item, true);
        nextToken = node && node.next(selectors.token);

        if (nextToken) {
            nextToken.focus();
        } else {
            this._inputNode.focus();
        }

        return true;
    },

    /**
     * Focuses the token before the specified item node, if any.
     *
     * @method _focusPrev
     * @param {Node} node
     * @return {Boolean} <code>true</code> if focus was set, <code>false</code>
     *   otherwise.
     * @protected
     */
    _focusPrev: function (node) {
        var selectors = this._selectors,
            prevToken;

        node      = node.ancestor(selectors.item, true);
        prevToken = node && node.previous(selectors.token);

        if (prevToken) {
            prevToken.focus();
        } else {
            return false;
        }

        return true;
    },

    /**
     * Returns an object containing the start and end indexes of selected text
     * within the specified node.
     *
     * @method _getSelection
     * @param {Node} node
     * @return {Object} Object with <code>start</code> and <code>end</code>
     *   properties.
     * @protected
     */
    _getSelection: function (node) {
        // TODO: this should probably be a Node extension named node-selection
        // or something.
        var el        = Node.getDOMNode(node),
            selection = {end: 0, start: 0},
            length, value, range;

        if ('selectionStart' in el) {
            // Good browsers.
            selection.start = el.selectionStart;
            selection.end   = el.selectionEnd;
        } else if (el.createTextRange) {
            // IE.
            value  = el.value;
            length = value.length;
            range  = doc.selection.createRange().duplicate();

            range.moveEnd('character', length);
            selection.start = range.text === '' ? length :
                    value.lastIndexOf(range.text);

            range.moveStart('character', -length);
            selection.end = range.text.length;
        }

        return selection;
    },

    /**
     * Handler for the backspace key.
     *
     * @method _keyBackspace
     * @param {EventFacade} e
     * @return {Boolean} <code>false</code> if the event should not be
     *   prevented.
     * @protected
     */
    _keyBackspace: function (e) {
        var node = e.currentTarget,
            index, selection;

        if (node.hasClass(TokenInput.CLASS_NAMES.input)) {
            selection = this._getSelection(node);

            if (selection.start !== 0 || selection.end !== 0) {
                return false;
            }

            // Focus the previous token.
            return this._focusPrev(node);
        }

        node  = node.ancestor(this._selectors.token, true);
        index = this._tokenNodes.indexOf(node);

        if (!node || index === -1) {
            return false;
        }

        // Delete the current token and focus the preceding token. If there is
        // no preceding token, focus the next token, or the input field if there
        // is no next token.
        (this._focusPrev(node) || this._focusNext(node));
        this.remove(index);

        return true;
    },

    /**
     * Handler for the delete key.
     *
     * @method _keyDelete
     * @param {EventFacade} e
     * @return {Boolean} <code>false</code> if the event should not be
     *   prevented.
     * @protected
     */
    _keyDelete: function (e) {
        var node = e.currentTarget,
            index;

        if (!node.hasClass(TokenInput.CLASS_NAMES.token)) {
            return false;
        }

        index = this._tokenNodes.indexOf(node);

        if (index === -1) {
            return false;
        }

        // Delete the current token and focus the following token (or the input
        // field if there is no following token).
        this._focusNext(node);
        this.remove(index);

        return true;
    },

    /**
     * Handler for the down arrow key.
     *
     * @method _keyDown
     * @param {EventFacade} e
     * @return {Boolean} <code>false</code> if the event should not be
     *   prevented.
     * @protected
     */
    _keyDown: function (e) {
        return this._keyRight(e);
    },

    /**
     * Handler for the enter key.
     *
     * @method _keyEnter
     * @param {EventFacade} e
     * @return {Boolean} <code>false</code> if the event should not be
     *   prevented.
     * @protected
     */
    _keyEnter: function (e) {
        var value = Lang.trim(this._inputNode.get(VALUE));

        if (!this.get('tokenizeOnEnter') || !value) {
            return false;
        }

        this._tokenizeValue(null, null, {all: true});
    },

    /**
     * Handler for the left arrow key.
     *
     * @method _keyLeft
     * @param {EventFacade} e
     * @return {Boolean} <code>false</code> if the event should not be
     *   prevented.
     * @protected
     */
    _keyLeft: function (e) {
        var node = e.currentTarget;

        if (node.hasClass(TokenInput.CLASS_NAMES.input) &&
                this._getSelection(node).start !== 0) {
            return false;
        }

        return this._focusPrev(node);
    },

    /**
     * Handler for the right arrow key.
     *
     * @method _keyRight
     * @param {EventFacade} e
     * @return {Boolean} <code>false</code> if the event should not be
     *   prevented.
     * @protected
     */
    _keyRight: function (e) {
        var node = e.currentTarget;

        if (node.hasClass(TokenInput.CLASS_NAMES.input)) {
            return false;
        }

        return this._focusNext(node);
    },

    /**
     * Handler for the up arrow key.
     *
     * @method _keyUp
     * @param {EventFacade} e
     * @return {Boolean} <code>false</code> if the event should not be
     *   prevented.
     * @protected
     */
    _keyUp: function (e) {
        return this._keyLeft(e);
    },

    /**
     * Refreshes the <code>_tokenNodes</code> NodeList, which is used internally
     * to track token item nodes.
     *
     * @method _refresh
     * @protected
     */
    _refresh: function () {
        if (this._tokenNodes) {
            this._tokenNodes.refresh();
        } else {
            this._tokenNodes = this._list.all(this._selectors.token);
        }
    },

    /**
     * Renders the token input markup.
     *
     * @method _render
     * @protected
     */
    _render: function () {
        var classNames  = TokenInput.CLASS_NAMES,
            boundingBox = Node.create(this.BOX_TEMPLATE),
            contentBox  = Node.create(this.CONTENT_TEMPLATE);

        contentBox.addClass(classNames.content);

        boundingBox.addClass(classNames.box).addClass(classNames.os)
                .set('tabIndex', -1).append(contentBox);

        this._set('boundingBox', boundingBox);
        this._set('contentBox', contentBox);

        this._boundingBox = boundingBox;
        this._contentBox  = contentBox;

        this._renderList();

        this._host.addClass(classNames.host).insert(boundingBox, 'after');
    },

    /**
     * Renders the token list.
     *
     * @method _renderList
     * @protected
     */
    _renderList: function () {
        var list = Node.create(this.LIST_TEMPLATE);

        list.addClass(TokenInput.CLASS_NAMES.list);

        this._list = list;
        this._set('listNode', list);

        this._contentBox.append(list);
    },

    /**
     * Setter for the <code>tokens</code> attribute.
     *
     * @method _setTokens
     * @param {Array} tokens Array of token strings.
     * @return {Array} Array of trimmed token strings, with any empty strings
     *   removed.
     * @protected
     */
    _setTokens: function (tokens) {
        // Filter out empty tokens.
        return YArray.filter(tokens, function (token) {
            return !!Lang.trim(token);
        });
    },

    /**
     * Synchronizes the tokenInput's UI state with the internal state.
     *
     * @method _sync
     * @protected
     */
    _sync: function () {
        var items  = [],
            tokens = this.get(TOKENS);

        this._contentBox[this.get('fauxInput') ? 'addClass' : 'removeClass'](
                TokenInput.CLASS_NAMES.fauxinput);

        YArray.each(tokens, function (token, i) {
            items.push(this._createItem({
                text     : Lang.trim(token),
                token    : true
            }));
        }, this);

        this._inputItem = this._createItem({editable: true});
        this._inputNode = this._inputItem.one(this._selectors.input);

        this._set('inputNode', this._inputNode);

        items.push(this._inputItem);
        items = Y.all(items).toFrag();

        this._clearItems();
        this._list.append(items);
        this._refresh();
        this._syncHost();
    },

    /**
     * Synchronizes the value of the host input field with the current set of
     * tokens in the tokenInput, joined with the configured
     * <code>delimiter</code>.
     *
     * @method _syncHost
     * @protected
     */
    _syncHost: function () {
        this._host.set(VALUE, this.get(TOKENS).join(this.get(DELIMITER)));
    },

    /**
     * Tokenizes the value of the specified node (or the passed value if one is
     * provided) and returns an array of tokens. Optionally also adds the tokens
     * to the tokenInput's UI.
     *
     * @method _tokenizeValue
     * @param {Node} node (optional) Node whose value should be tokenized. If
     *   not provided, the token input node will be used.
     * @param {String} value (optional) Value to be tokenized. If not specified,
     *   the value of the <i>node</i> will be used.
     * @param {Object} options (optional) Options object with zero or more of
     *   the following properties:
     *
     * <dl>
     *   <dt>all (Boolean)</dt>
     *   <dd>
     *      If <code>true</code>, the entire value will be split on the
     *      delimiter string and tokenized. If <code>false</code> (the default),
     *      all but the last token will be tokenized, and the last one will be
     *      left in the value.
     *   </dd>
     *
     *   <dt>updateUI (Boolean)</dt>
     *   <dd>
     *     If <code>true</code> (the default), tokens parsed out of the value
     *     will be added to the tokenInput UI. If <code>false</code>, parsed
     *     tokens will be returned, but the UI and the <code>tokens</code>
     *     attribute will not be updated.
     *   </dd>
     * </dl>
     *
     * @return {Array} Array of parsed tokens.
     * @protected
     */
    _tokenizeValue: function (node, value, options) {
        var tokens;

        options = Y.merge({
            updateUI: true
        }, options || EMPTY_OBJECT);

        if (!node) {
            node = this._inputNode;
        }

        if (!value && value !== '') {
            value = node.get(VALUE);
        }

        tokens = value.split(this.get(DELIMITER));

        if (options.all || tokens.length > 1) {
            if (options.all) {
                value = '';
            } else {
                // New input field value is the last item in the array.
                value = Lang.trim(tokens.pop());
            }

            if (options.updateUI) {
                node.set(VALUE, value);

                if (tokens.length) {
                    // All other items are added as tokens.
                    this.add(tokens);
                }
            }
        }

        if (options.updateUI) {
            // Adjust the width of the input field as necessary to fit its
            // contents.
            node.setStyle('width', Math.max(5, value.length + 3) + 'ex');
        }

        return tokens;
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * Handles blur events on the bounding box.
     *
     * @method _afterBlur
     * @param {EventFacade} e
     * @protected
     */
    _afterBlur: function (e) {
        if (this.get('tokenizeOnBlur')) {
            this._tokenizeValue(null, null, {all: true});
        }
    },

    /**
     * Handles changes to the <code>fauxInput</code> attribute.
     *
     * @method _afterFauxInputChange
     * @param {EventFacade} e
     * @protected
     */
    _afterFauxInputChange: function (e) {
        this._sync();
    },

    /**
     * Handles focus events on the bounding box.
     *
     * @method _afterFocus
     * @param {EventFacade} e
     * @protected
     */
    _afterFocus: function (e) {
        var that = this;

        if (!e.target.ancestor(this._selectors.item, true)) {
            setTimeout(function () {
                // FIXME: this doesn't display the keyboard in iOS.
                that._inputNode.focus();
            }, 1);
        }
    },

    /**
     * Handles <code>valueChange</code> events on the token input node.
     *
     * @method _afterInputValueChange
     * @param {EventFacade} e
     * @protected
     */
    _afterInputValueChange: function (e) {
        this._tokenizeValue(e.currentTarget, e.newVal);
    },

    /**
     * Handles changes to the <code>removeButton</code> attribute.
     *
     * @method _afterRemoveButtonChange
     * @param {EventFacade} e
     * @protected
     */
    _afterRemoveButtonChange: function (e) {
        this._sync();
    },

    /**
     * Handles changes to the <code>tokens</code> attribute.
     *
     * @method _afterTokensChange
     * @param {EventFacade} e
     * @protected
     */
    _afterTokensChange: function (e) {
        // Only do a full sync for non-atomic changes (i.e., changes that are
        // made via some means other than the add()/remove() methods).
        if (e.atomic) {
            this._syncHost();
        } else {
            this._sync();
        }
    },

    /**
     * Handles keydown or keypress events on tokens and the token input field.
     *
     * @method _onKey
     * @param {EventFacade} e
     * @protected
     */
    _onKey: function (e) {
        var handler = this._keys[e.keyCode];

        if (handler) {
            // A handler may return false to indicate that it doesn't wish
            // to prevent the default key behavior.
            if (handler.call(this, e) !== false) {
                e.preventDefault();
            }
        }
    },

    /**
     * Handles click events on token remove buttons.
     *
     * @method _onRemoveClick
     * @param {EventFacade} e
     * @protected
     */
    _onRemoveClick: function (e) {
        var item = e.currentTarget.ancestor(this._selectors.item);
        e.preventDefault();
        this.remove(this._tokenNodes.indexOf(item));
    },

    /**
     * Handles blur events on tokens.
     *
     * @method _onTokenBlur
     * @param {EventFacade} e
     * @protected
     */
    _onTokenBlur: function (e) {
        e.currentTarget.removeClass(TokenInput.CLASS_NAMES.focus);
    },

    /**
     * Handles focus events on tokens.
     *
     * @method _onTokenFocus
     * @param {EventFacade} e
     * @protected
     */
    _onTokenFocus: function (e) {
        e.currentTarget.addClass(TokenInput.CLASS_NAMES.focus);
    },

    /**
     * Handles mouseout events on tokens.
     *
     * @method _onTokenMouseOut
     * @param {EventFacade} e
     * @protected
     */
    _onTokenMouseOut: function (e) {
        e.currentTarget.removeClass(TokenInput.CLASS_NAMES.hover);
    },

    /**
     * Handles mouseover events on tokens.
     *
     * @method _onTokenMouseOver
     * @param {EventFacade} e
     * @protected
     */
    _onTokenMouseOver: function (e) {
        e.currentTarget.addClass(TokenInput.CLASS_NAMES.hover);
    }
}, {
    NAME: 'pluginTokenInput',
    NS  : 'tokenInput',

    ATTRS: {
        /**
         * Reference to the bounding box node.
         *
         * @attribute boundingBox
         * @type Node
         * @readonly
         */
        boundingBox: {
            readOnly: true
        },

        /**
         * Reference to the content box node.
         *
         * @attribute contentBox
         * @type Node
         * @readonly
         */
        contentBox: {
            readOnly: true
        },

        /**
         * Token delimiter string. May be a single character or multiple
         * characters. User input will be split on this string as the user
         * types, and the delimited values will be turned into tokens.
         *
         * @attribute delimiter
         * @type String
         * @default ','
         */
        delimiter: {
            value: ','
        },

        /**
         * <p>
         * If <code>true</code>, the CSS class name
         * <code>yui3-tokeninput-fauxinput</code> will be applied to the
         * bounding box. When using the Sam skin, this will cause the
         * TokenInput's styling to mimic a real input field.
         * </p>
         *
         * <p>
         * Note that this styling may not look entirely faithful to native
         * control styling on all browsers and platforms.
         * </p>
         *
         * @attribute fauxInput
         * @type Boolean
         * @default true
         */
        fauxInput: {
            value: true
        },

        /**
         * Reference to the token input node. This is the visible input node
         * the user can type in to add tokens.
         *
         * @attribute inputNode
         * @type Node
         * @readonly
         */
        inputNode: {
            readOnly: true
        },

        /**
         * Reference to the token list node.
         *
         * @attribute listNode
         * @type Node
         * @readonly
         */
        listNode: {
            readOnly: true
        },

        /**
         * If <code>true</code>, each token will have a remove button (in the
         * form of a small "x") which, when clicked, will remove the token.
         *
         * @attribute removeButton
         * @type Boolean
         * @default <code>true</code> for mobile devices, <code>false</code>
         *   elsewhere.
         */
        removeButton: {
            value: !!Y.UA.mobile
        },

        /**
         * If <code>true</code>, any text the user has entered in the token
         * input field will be tokenized when the input field loses focus.
         *
         * @attribute tokenizeOnBlur
         * @type Boolean
         * @default true
         */
        tokenizeOnBlur: {
            value: true
        },

        /**
         * If <code>true</code>, any text the user has entered in the token
         * input field will be tokenized when the user presses the enter key
         * while the input field has focus.
         *
         * @attribute tokenizeOnEnter
         * @type Boolean
         * @default true
         */
        tokenizeOnEnter: {
            value: true
        },

        /**
         * Current tokens.
         *
         * @attribute tokens
         * @type Array
         * @default []
         */
        tokens: {
            setter: '_setTokens',
            value : []
        }
    },

    CLASS_NAMES: {
        box      : getClassName(),
        content  : getClassName('content'),
        editable : getClassName('editable'),
        fauxinput: getClassName('fauxinput'),
        focus    : getClassName('focus'),
        hasremove: getClassName('hasremove'),
        hidden   : getClassName('hidden'),
        host     : getClassName('host'),
        hover    : getClassName('hover'),
        input    : getClassName('input'),
        item     : getClassName('item'),
        list     : getClassName('list'),
        os       : getClassName(Y.UA.os),
        remove   : getClassName('remove'),
        token    : getClassName('token')
    }
});

Y.Plugin.TokenInput = TokenInput;


}, '@VERSION@' ,{requires:['array-extras', 'classnamemanager', 'event-focus', 'event-valuechange', 'node-event-delegate', 'node-pluginhost', 'node-style', 'plugin']});

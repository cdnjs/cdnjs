YUI.add('dom-base', function(Y) {

(function(Y) {
/** 
 * The DOM utility provides a cross-browser abtraction layer
 * normalizing DOM tasks, and adds extra helper functionality
 * for other common tasks. 
 * @module dom
 * @submodule dom-base
 *
 */

/**
 * Provides DOM helper methods.
 * @class DOM
 *
 */
var NODE_TYPE = 'nodeType',
    OWNER_DOCUMENT = 'ownerDocument',
    DEFAULT_VIEW = 'defaultView',
    PARENT_WINDOW = 'parentWindow',
    TAG_NAME = 'tagName',
    PARENT_NODE = 'parentNode',
    FIRST_CHILD = 'firstChild',
    PREVIOUS_SIBLING = 'previousSibling',
    NEXT_SIBLING = 'nextSibling',
    CONTAINS = 'contains',
    COMPARE_DOCUMENT_POSITION = 'compareDocumentPosition',

    documentElement = document.documentElement,

    re_tag = /<([a-z]+)/i;

Y.DOM = {
    /**
     * Returns the HTMLElement with the given ID (Wrapper for document.getElementById).
     * @method byId         
     * @param {String} id the id attribute 
     * @param {Object} doc optional The document to search. Defaults to current document 
     * @return {HTMLElement | null} The HTMLElement with the id, or null if none found. 
     */
    byId: function(id, doc) {
        doc = doc || Y.config.doc;
        // TODO: IE Name
        return doc.getElementById(id);
    },

    // @deprecated
    children: function(node, tag) {
        var ret = [];
        if (node) {
            tag = tag || '*';
            ret = Y.Selector.query('> ' + tag, node); 
        }
        return ret;
    },

    // @deprecated
    firstByTag: function(tag, root) {
        var ret;
        root = root || Y.config.doc;

        if (tag && root.getElementsByTagName) {
            ret = root.getElementsByTagName(tag)[0];
        }

        return ret || null;
    },

    /**
     * Returns the text content of the HTMLElement. 
     * @method getText         
     * @param {HTMLElement} element The html element. 
     * @return {String} The text content of the element (includes text of any descending elements).
     */
    getText: (documentElement.textContent !== undefined) ?
        function(element) {
            var ret = '';
            if (element) {
                ret = element.textContent;
            }
            return ret || '';
        } : function(element) {
            var ret = '';
            if (element) {
                ret = element.innerText;
            }
            return ret || '';
        },

    /**
     * Sets the text content of the HTMLElement. 
     * @method setText         
     * @param {HTMLElement} element The html element. 
     * @param {String} content The content to add. 
     */
    setText: (documentElement.textContent !== undefined) ?
        function(element, content) {
            if (element) {
                element.textContent = content;
            }
        } : function(element, content) {
            if (element) {
                element.innerText = content;
            }
        },

    /*
     * Finds the previous sibling of the element.
     * @method previous
     * @deprecated Use elementByAxis
     * @param {HTMLElement} element The html element.
     * @param {Function} fn optional An optional boolean test to apply.
     * The optional function is passed the current DOM node being tested as its only argument.
     * If no function is given, the first sibling is returned.
     * @param {Boolean} all optional Whether all node types should be scanned, or just element nodes.
     * @return {HTMLElement | null} The matching DOM node or null if none found. 
     */
    previous: function(element, fn, all) {
        return Y.DOM.elementByAxis(element, PREVIOUS_SIBLING, fn, all);
    },

    /*
     * Finds the next sibling of the element.
     * @method next
     * @deprecated Use elementByAxis
     * @param {HTMLElement} element The html element.
     * @param {Function} fn optional An optional boolean test to apply.
     * The optional function is passed the current DOM node being tested as its only argument.
     * If no function is given, the first sibling is returned.
     * @param {Boolean} all optional Whether all node types should be scanned, or just element nodes.
     * @return {HTMLElement | null} The matching DOM node or null if none found. 
     */
    next: function(element, fn, all) {
        return Y.DOM.elementByAxis(element, NEXT_SIBLING, fn, all);
    },

    /*
     * Finds the ancestor of the element.
     * @method ancestor
     * @deprecated Use elementByAxis
     * @param {HTMLElement} element The html element.
     * @param {Function} fn optional An optional boolean test to apply.
     * The optional function is passed the current DOM node being tested as its only argument.
     * If no function is given, the parentNode is returned.
     * @param {Boolean} all optional Whether all node types should be scanned, or just element nodes.
     * @return {HTMLElement | null} The matching DOM node or null if none found. 
     */
     // TODO: optional stopAt node?
    ancestor: function(element, fn, all) {
        return Y.DOM.elementByAxis(element, PARENT_NODE, fn, all);
    },

    /**
     * Searches the element by the given axis for the first matching element.
     * @method elementByAxis
     * @param {HTMLElement} element The html element.
     * @param {String} axis The axis to search (parentNode, nextSibling, previousSibling).
     * @param {Function} fn optional An optional boolean test to apply.
     * @param {Boolean} all optional Whether all node types should be returned, or just element nodes.
     * The optional function is passed the current HTMLElement being tested as its only argument.
     * If no function is given, the first element is returned.
     * @return {HTMLElement | null} The matching element or null if none found.
     */
    elementByAxis: function(element, axis, fn, all) {
        while (element && (element = element[axis])) { // NOTE: assignment
                if ( (all || element[TAG_NAME]) && (!fn || fn(element)) ) {
                    return element;
                }
        }
        return null;
    },

    /**
     * Determines whether or not one HTMLElement is or contains another HTMLElement.
     * @method contains
     * @param {HTMLElement} element The containing html element.
     * @param {HTMLElement} needle The html element that may be contained.
     * @return {Boolean} Whether or not the element is or contains the needle.
     */
    contains: function(element, needle) {
        var ret = false;

        if ( !needle || !element || !needle[NODE_TYPE] || !element[NODE_TYPE]) {
            ret = false;
        } else if (element[CONTAINS])  {
            if (Y.UA.opera || needle[NODE_TYPE] === 1) { // IE & SAF contains fail if needle not an ELEMENT_NODE
                ret = element[CONTAINS](needle);
            } else {
                ret = Y.DOM._bruteContains(element, needle); 
            }
        } else if (element[COMPARE_DOCUMENT_POSITION]) { // gecko
            if (element === needle || !!(element[COMPARE_DOCUMENT_POSITION](needle) & 16)) { 
                ret = true;
            }
        }

        return ret;
    },

    /**
     * Determines whether or not the HTMLElement is part of the document.
     * @method inDoc
     * @param {HTMLElement} element The containing html element.
     * @param {HTMLElement} doc optional The document to check.
     * @return {Boolean} Whether or not the element is attached to the document. 
     */
    inDoc: function(element, doc) {
        doc = doc || element[OWNER_DOCUMENT];
        var id = element.id;
        if (!id) { // TODO: remove when done?
            id = element.id = Y.guid();
        }

        return !! (doc.getElementById(id));
    },

    /**
     * Creates a new dom node using the provided markup string. 
     * @method create
     * @param {String} html The markup used to create the element
     * @param {HTMLDocument} doc An optional document context 
     */
    create: function(html, doc) {
        if (typeof html === 'string') {
            html = Y.Lang.trim(html); // match IE which trims whitespace from innerHTML
        }

        if (!doc && Y.DOM._cloneCache[html]) {
            return Y.DOM._cloneCache[html].cloneNode(true); // NOTE: return
        }

        doc = doc || Y.config.doc;
        var m = re_tag.exec(html),
            create = Y.DOM._create,
            custom = Y.DOM.creators,
            ret = null,
            tag, nodes;

        if (m && custom[m[1]]) {
            if (typeof custom[m[1]] === 'function') {
                create = custom[m[1]];
            } else {
                tag = custom[m[1]];
            }
        }

        nodes = create(html, doc, tag).childNodes;

        if (nodes.length === 1) { // return single node, breaking parentNode ref from "fragment"
            ret = nodes[0].parentNode.removeChild(nodes[0]);
        } else { // return multiple nodes as a fragment
             ret = Y.DOM._nl2frag(nodes, doc);
        }

        if (ret) {
            Y.DOM._cloneCache[html] = ret.cloneNode(true);
        }
        return ret;
    },

    _nl2frag: function(nodes, doc) {
        var ret = null,
            i, len;

        if (nodes && (nodes.push || nodes.item) && nodes[0]) {
            doc = doc || nodes[0].ownerDocument; 
            ret = doc.createDocumentFragment();

            if (nodes.item) { // convert live list to static array
                nodes = Y.Array(nodes, 0, true);
            }

            for (i = 0, len = nodes.length; i < len; i++) {
                ret.appendChild(nodes[i]); 
            }
        } // else inline with log for minification
        else { Y.log('unable to convert ' + nodes + ' to fragment', 'warn', 'dom'); }
        return ret;
    },


    CUSTOM_ATTRIBUTES: (!documentElement.hasAttribute) ? { // IE < 8
        'for': 'htmlFor',
        'class': 'className'
    } : { // w3c
        'htmlFor': 'for',
        'className': 'class'
    },

    /**
     * Provides a normalized attribute interface. 
     * @method setAttibute
     * @param {String | HTMLElement} el The target element for the attribute.
     * @param {String} attr The attribute to set.
     * @param {String} val The value of the attribute.
     */
    setAttribute: function(el, attr, val, ieAttr) {
        if (el && el.setAttribute) {
            attr = Y.DOM.CUSTOM_ATTRIBUTES[attr] || attr;
            el.setAttribute(attr, val, ieAttr);
        }
    },


    /**
     * Provides a normalized attribute interface. 
     * @method getAttibute
     * @param {String | HTMLElement} el The target element for the attribute.
     * @param {String} attr The attribute to get.
     * @return {String} The current value of the attribute. 
     */
    getAttribute: function(el, attr, ieAttr) {
        ieAttr = (ieAttr !== undefined) ? ieAttr : 2;
        var ret = '';
        if (el && el.getAttribute) {
            attr = Y.DOM.CUSTOM_ATTRIBUTES[attr] || attr;
            ret = el.getAttribute(attr, ieAttr);

            if (ret === null) {
                ret = ''; // per DOM spec
            }
        }
        return ret;
    },

    isWindow: function(obj) {
        return obj.alert && obj.document;
    },

    _fragClones: {
        div: document.createElement('div')
    },

    _create: function(html, doc, tag) {
        tag = tag || 'div';

        var frag = Y.DOM._fragClones[tag];
        if (frag) {
            frag = frag.cloneNode(false);
        } else {
            frag = Y.DOM._fragClones[tag] = doc.createElement(tag);
        }
        frag.innerHTML = html;
        return frag;
    },

    _removeChildNodes: function(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    },

    _cloneCache: {},

    /**
     * Inserts content in a node at the given location 
     * @method addHTML
     * @param {HTMLElement} node The node to insert into
     * @param {String} content The content to be inserted 
     * @param {String} where Where to insert the content; default is after lastChild 
     */
    addHTML: function(node, content, where) {
        if (typeof content === 'string') {
            content = Y.Lang.trim(content); // match IE which trims whitespace from innerHTML
        }

        var newNode = Y.DOM._cloneCache[content],
            nodeParent = node.parentNode;
            
        if (newNode) {
            newNode = newNode.cloneNode(true);
        } else {
            if (content.nodeType) { // domNode
                newNode = content;
            } else { // create from string and cache
                newNode = Y.DOM.create(content);
            }
        }

        if (where) {
            if (where.nodeType) { // insert regardless of relationship to node
                // TODO: check if node.contains(where)?
                where.parentNode.insertBefore(newNode, where);
            } else {
                switch (where) {
                    case 'replace':
                        while (node.firstChild) {
                            node.removeChild(node.firstChild);
                        }
                        node.appendChild(newNode);
                        break;
                    case 'before':
                        nodeParent.insertBefore(newNode, node);
                        break;
                    case 'after':
                        if (node.nextSibling) { // IE errors if refNode is null
                            nodeParent.insertBefore(newNode, node.nextSibling);
                        } else {
                            nodeParent.appendChild(newNode);
                        }
                        break;
                    default:
                        node.appendChild(newNode);
                }
            }
        } else {
            node.appendChild(newNode);
        }

        return newNode;
    },

    VALUE_SETTERS: {},

    VALUE_GETTERS: {},

    getValue: function(node) {
        var ret = '', // TODO: return null?
            getter;

        if (node && node[TAG_NAME]) {
            getter = Y.DOM.VALUE_GETTERS[node[TAG_NAME].toLowerCase()];

            if (getter) {
                ret = getter(node);
            } else {
                ret = node.value;
            }
        }

        return (typeof ret === 'string') ? ret : '';
    },

    setValue: function(node, val) {
        var setter;

        if (node && node[TAG_NAME]) {
            setter = Y.DOM.VALUE_SETTERS[node[TAG_NAME].toLowerCase()];

            if (setter) {
                setter(node, val);
            } else {
                node.value = val;
            }
        }
    },

    /**
     * Brute force version of contains.
     * Used for browsers without contains support for non-HTMLElement Nodes (textNodes, etc).
     * @method _bruteContains
     * @private
     * @param {HTMLElement} element The containing html element.
     * @param {HTMLElement} needle The html element that may be contained.
     * @return {Boolean} Whether or not the element is or contains the needle.
     */
    _bruteContains: function(element, needle) {
        while (needle) {
            if (element === needle) {
                return true;
            }
            needle = needle.parentNode;
        }
        return false;
    },

// TODO: move to Lang?
    /**
     * Memoizes dynamic regular expressions to boost runtime performance. 
     * @method _getRegExp
     * @private
     * @param {String} str The string to convert to a regular expression.
     * @param {String} flags optional An optinal string of flags.
     * @return {RegExp} An instance of RegExp
     */
    _getRegExp: function(str, flags) {
        flags = flags || '';
        Y.DOM._regexCache = Y.DOM._regexCache || {};
        if (!Y.DOM._regexCache[str + flags]) {
            Y.DOM._regexCache[str + flags] = new RegExp(str, flags);
        }
        return Y.DOM._regexCache[str + flags];
    },

// TODO: make getDoc/Win true privates?
    /**
     * returns the appropriate document.
     * @method _getDoc
     * @private
     * @param {HTMLElement} element optional Target element.
     * @return {Object} The document for the given element or the default document. 
     */
    _getDoc: function(element) {
        element = element || {};

        return (element[NODE_TYPE] === 9) ? element : // element === document
                element[OWNER_DOCUMENT] || // element === DOM node
                element.document || // element === window
                Y.config.doc; // default
    },

    /**
     * returns the appropriate window.
     * @method _getWin
     * @private
     * @param {HTMLElement} element optional Target element.
     * @return {Object} The window for the given element or the default window. 
     */
    _getWin: function(element) {
        var doc = Y.DOM._getDoc(element);
        return doc[DEFAULT_VIEW] || doc[PARENT_WINDOW] || Y.config.win;
    },

    _batch: function(nodes, fn, arg1, arg2, arg3, etc) {
        fn = (typeof name === 'string') ? Y.DOM[fn] : fn;
        var result,
            ret = [];

        if (fn && nodes) {
            Y.each(nodes, function(node) {
                if ((result = fn.call(Y.DOM, node, arg1, arg2, arg3, etc)) !== undefined) {
                    ret[ret.length] = result;
                }
            });
        }

        return ret.length ? ret : nodes;
    },

    _testElement: function(element, tag, fn) {
        tag = (tag && tag !== '*') ? tag.toUpperCase() : null;
        return (element && element[TAG_NAME] &&
                (!tag || element[TAG_NAME].toUpperCase() === tag) &&
                (!fn || fn(element)));
    },

    creators: {},

    _IESimpleCreate: function(html, doc) {
        doc = doc || Y.config.doc;
        return doc.createElement(html);
    }
};


(function(Y) {
    var creators = Y.DOM.creators,
        create = Y.DOM.create,
        re_tbody = /(?:\/(?:thead|tfoot|tbody|caption|col|colgroup)>)+\s*<tbody/,

        TABLE_OPEN = '<table>',
        TABLE_CLOSE = '</table>';

    if (Y.UA.ie) {
        Y.mix(creators, {
        // TODO: thead/tfoot with nested tbody
            // IE adds TBODY when creating TABLE elements (which may share this impl)
            tbody: function(html, doc) {
                var frag = create(TABLE_OPEN + html + TABLE_CLOSE, doc),
                    tb = frag.children.tags('tbody')[0];

                if (frag.children.length > 1 && tb && !re_tbody.test(html)) {
                    tb[PARENT_NODE].removeChild(tb); // strip extraneous tbody
                }
                return frag;
            },

            script: function(html, doc) {
                var frag = doc.createElement('div');

                frag.innerHTML = '-' + html;
                frag.removeChild(frag[FIRST_CHILD]);
                return frag;
            }

        }, true);

        Y.mix(Y.DOM.VALUE_GETTERS, {
            button: function(node) {
                return (node.attributes && node.attributes.value) ? node.attributes.value.value : '';
            }
        });

        Y.mix(Y.DOM.VALUE_SETTERS, {
            // IE: node.value changes the button text, which should be handled via innerHTML
            button: function(node, val) {
                var attr = node.attributes.value;
                if (!attr) {
                    attr = node[OWNER_DOCUMENT].createAttribute('value');
                    node.setAttributeNode(attr);
                }

                attr.value = val;
            }
        });
    }

    if (Y.UA.gecko || Y.UA.ie) {
        Y.mix(creators, {
            option: function(html, doc) {
                return create('<select>' + html + '</select>', doc);
            },

            tr: function(html, doc) {
                return create('<tbody>' + html + '</tbody>', doc);
            },

            td: function(html, doc) {
                return create('<tr>' + html + '</tr>', doc);
            }, 

            tbody: function(html, doc) {
                return create(TABLE_OPEN + html + TABLE_CLOSE, doc);
            }
        });

        Y.mix(creators, {
            legend: 'fieldset',
            th: creators.td,
            thead: creators.tbody,
            tfoot: creators.tbody,
            caption: creators.tbody,
            colgroup: creators.tbody,
            col: creators.tbody,
            optgroup: creators.option
        });
    }

    Y.mix(Y.DOM.VALUE_GETTERS, {
        option: function(node) {
            var attrs = node.attributes;
            return (attrs.value && attrs.value.specified) ? node.value : node.text;
        },

        select: function(node) {
            var val = node.value,
                options = node.options;

            if (options && val === '') {
                if (node.multiple) {
                    Y.log('multiple select normalization not implemented', 'warn', 'DOM');
                } else {
                    val = Y.DOM.getValue(options[node.selectedIndex], 'value');
                }
            }

            return val;
        }
    });
})(Y);

})(Y);
var addClass, hasClass, removeClass;

Y.mix(Y.DOM, {
    /**
     * Determines whether a DOM element has the given className.
     * @method hasClass
     * @param {HTMLElement} element The DOM element. 
     * @param {String} className the class name to search for
     * @return {Boolean} Whether or not the element has the given class. 
     */
    hasClass: function(node, className) {
        var re = Y.DOM._getRegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
        return re.test(node.className);
    },

    /**
     * Adds a class name to a given DOM element.
     * @method addClass         
     * @param {HTMLElement} element The DOM element. 
     * @param {String} className the class name to add to the class attribute
     */
    addClass: function(node, className) {
        if (!Y.DOM.hasClass(node, className)) { // skip if already present 
            node.className = Y.Lang.trim([node.className, className].join(' '));
        }
    },

    /**
     * Removes a class name from a given element.
     * @method removeClass         
     * @param {HTMLElement} element The DOM element. 
     * @param {String} className the class name to remove from the class attribute
     */
    removeClass: function(node, className) {
        if (className && hasClass(node, className)) {
            node.className = Y.Lang.trim(node.className.replace(Y.DOM._getRegExp('(?:^|\\s+)' +
                            className + '(?:\\s+|$)'), ' '));

            if ( hasClass(node, className) ) { // in case of multiple adjacent
                removeClass(node, className);
            }
        }                 
    },

    /**
     * Replace a class with another class for a given element.
     * If no oldClassName is present, the newClassName is simply added.
     * @method replaceClass  
     * @param {HTMLElement} element The DOM element. 
     * @param {String} oldClassName the class name to be replaced
     * @param {String} newClassName the class name that will be replacing the old class name
     */
    replaceClass: function(node, oldC, newC) {
        //Y.log('replaceClass replacing ' + oldC + ' with ' + newC, 'info', 'Node');
        addClass(node, newC);
        removeClass(node, oldC);
    },

    /**
     * If the className exists on the node it is removed, if it doesn't exist it is added.
     * @method toggleClass  
     * @param {HTMLElement} element The DOM element. 
     * @param {String} className the class name to be toggled
     */
    toggleClass: function(node, className) {
        if (hasClass(node, className)) {
            removeClass(node, className);
        } else {
            addClass(node, className);
        }
    }
});

hasClass = Y.DOM.hasClass;
removeClass = Y.DOM.removeClass;
addClass = Y.DOM.addClass;



}, '@VERSION@' ,{requires:['oop']});
YUI.add('dom-style', function(Y) {

(function(Y) {
/** 
 * Add style management functionality to DOM.
 * @module dom
 * @submodule dom-style
 * @for DOM
 */

var DOCUMENT_ELEMENT = 'documentElement',
    DEFAULT_VIEW = 'defaultView',
    OWNER_DOCUMENT = 'ownerDocument',
    STYLE = 'style',
    FLOAT = 'float',
    CSS_FLOAT = 'cssFloat',
    STYLE_FLOAT = 'styleFloat',
    TRANSPARENT = 'transparent',
    GET_COMPUTED_STYLE = 'getComputedStyle',

    DOCUMENT = Y.config.doc,
    UNDEFINED = undefined,

    re_color = /color$/i;


Y.mix(Y.DOM, {
    CUSTOM_STYLES: {
    },


    /**
     * Sets a style property for a given element.
     * @method setStyle
     * @param {HTMLElement} An HTMLElement to apply the style to.
     * @param {String} att The style property to set. 
     * @param {String|Number} val The value. 
     */
    setStyle: function(node, att, val, style) {
        style = style || node.style;
        var CUSTOM_STYLES = Y.DOM.CUSTOM_STYLES;

        if (style) {
            if (val === null) {
                val = ''; // normalize for unsetting
            }
            if (att in CUSTOM_STYLES) {
                if (CUSTOM_STYLES[att].set) {
                    CUSTOM_STYLES[att].set(node, val, style);
                    return; // NOTE: return
                } else if (typeof CUSTOM_STYLES[att] === 'string') {
                    att = CUSTOM_STYLES[att];
                }
            }
            style[att] = val; 
        }
    },

    /**
     * Returns the current style value for the given property.
     * @method getStyle
     * @param {HTMLElement} An HTMLElement to get the style from.
     * @param {String} att The style property to get. 
     */
    getStyle: function(node, att) {
        var style = node[STYLE],
            CUSTOM_STYLES = Y.DOM.CUSTOM_STYLES,
            val = '';

        if (style) {
            if (att in CUSTOM_STYLES) {
                if (CUSTOM_STYLES[att].get) {
                    return CUSTOM_STYLES[att].get(node, att, style); // NOTE: return
                } else if (typeof CUSTOM_STYLES[att] === 'string') {
                    att = CUSTOM_STYLES[att];
                }
            }
            val = style[att];
            if (val === '') { // TODO: is empty string sufficient?
                val = Y.DOM[GET_COMPUTED_STYLE](node, att);
            }
        }

        return val;
    },

    /**
     * Sets multiple style properties.
     * @method setStyles
     * @param {HTMLElement} node An HTMLElement to apply the styles to. 
     * @param {Object} hash An object literal of property:value pairs. 
     */
    setStyles: function(node, hash) {
        var style = node.style;
        Y.each(hash, function(v, n) {
            Y.DOM.setStyle(node, n, v, style);
        }, Y.DOM);
    },

    /**
     * Returns the computed style for the given node.
     * @method getComputedStyle
     * @param {HTMLElement} An HTMLElement to get the style from.
     * @param {String} att The style property to get. 
     * @return {String} The computed value of the style property. 
     */
    getComputedStyle: function(node, att) {
        var val = '',
            doc = node[OWNER_DOCUMENT];

        if (node[STYLE]) {
            val = doc[DEFAULT_VIEW][GET_COMPUTED_STYLE](node, null)[att];
        }
        return val;
    }
});

// normalize reserved word float alternatives ("cssFloat" or "styleFloat")
if (DOCUMENT[DOCUMENT_ELEMENT][STYLE][CSS_FLOAT] !== UNDEFINED) {
    Y.DOM.CUSTOM_STYLES[FLOAT] = CSS_FLOAT;
} else if (DOCUMENT[DOCUMENT_ELEMENT][STYLE][STYLE_FLOAT] !== UNDEFINED) {
    Y.DOM.CUSTOM_STYLES[FLOAT] = STYLE_FLOAT;
}

// fix opera computedStyle default color unit (convert to rgb)
if (Y.UA.opera) {
    Y.DOM[GET_COMPUTED_STYLE] = function(node, att) {
        var view = node[OWNER_DOCUMENT][DEFAULT_VIEW],
            val = view[GET_COMPUTED_STYLE](node, '')[att];

        if (re_color.test(att)) {
            val = Y.Color.toRGB(val);
        }

        return val;
    };

}

// safari converts transparent to rgba(), others use "transparent"
if (Y.UA.webkit) {
    Y.DOM[GET_COMPUTED_STYLE] = function(node, att) {
        var view = node[OWNER_DOCUMENT][DEFAULT_VIEW],
            val = view[GET_COMPUTED_STYLE](node, '')[att];

        if (val === 'rgba(0, 0, 0, 0)') {
            val = TRANSPARENT; 
        }

        return val;
    };

}
})(Y);
(function(Y) {
var PARSE_INT = parseInt,
    RE = RegExp;

Y.Color = {
    KEYWORDS: {
        black: '000',
        silver: 'c0c0c0',
        gray: '808080',
        white: 'fff',
        maroon: '800000',
        red: 'f00',
        purple: '800080',
        fuchsia: 'f0f',
        green: '008000',
        lime: '0f0',
        olive: '808000',
        yellow: 'ff0',
        navy: '000080',
        blue: '00f',
        teal: '008080',
        aqua: '0ff'
    },

    re_RGB: /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
    re_hex: /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
    re_hex3: /([0-9A-F])/gi,

    toRGB: function(val) {
        if (!Y.Color.re_RGB.test(val)) {
            val = Y.Color.toHex(val);
        }

        if(Y.Color.re_hex.exec(val)) {
            val = 'rgb(' + [
                PARSE_INT(RE.$1, 16),
                PARSE_INT(RE.$2, 16),
                PARSE_INT(RE.$3, 16)
            ].join(', ') + ')';
        }
        return val;
    },

    toHex: function(val) {
        val = Y.Color.KEYWORDS[val] || val;
        if (Y.Color.re_RGB.exec(val)) {
            val = [
                Number(RE.$1).toString(16),
                Number(RE.$2).toString(16),
                Number(RE.$3).toString(16)
            ];

            for (var i = 0; i < val.length; i++) {
                if (val[i].length < 2) {
                    val[i] = val[i].replace(Y.Color.re_hex3, '$1$1');
                }
            }

            val = '#' + val.join('');
        }

        if (val.length < 6) {
            val = val.replace(Y.Color.re_hex3, '$1$1');
        }

        if (val !== 'transparent' && val.indexOf('#') < 0) {
            val = '#' + val;
        }

        return val.toLowerCase();
    }
};
})(Y);

(function(Y) {
var HAS_LAYOUT = 'hasLayout',
    PX = 'px',
    FILTER = 'filter',
    FILTERS = 'filters',
    OPACITY = 'opacity',
    AUTO = 'auto',

    BORDER_WIDTH = 'borderWidth',
    BORDER_TOP_WIDTH = 'borderTopWidth',
    BORDER_RIGHT_WIDTH = 'borderRightWidth',
    BORDER_BOTTOM_WIDTH = 'borderBottomWidth',
    BORDER_LEFT_WIDTH = 'borderLeftWidth',
    WIDTH = 'width',
    HEIGHT = 'height',
    TRANSPARENT = 'transparent',
    VISIBLE = 'visible',
    GET_COMPUTED_STYLE = 'getComputedStyle',
    UNDEFINED = undefined,
    documentElement = document.documentElement,

    // TODO: unit-less lineHeight (e.g. 1.22)
    re_unit = /^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,

    _getStyleObj = function(node) {
        return node.currentStyle || node.style;
    },

    ComputedStyle = {
        CUSTOM_STYLES: {},

        get: function(el, property) {
            var value = '',
                current;

            if (el) {
                    current = _getStyleObj(el)[property];

                if (property === OPACITY && Y.DOM.CUSTOM_STYLES[OPACITY]) {
                    value = Y.DOM.CUSTOM_STYLES[OPACITY].get(el);        
                } else if (!current || (current.indexOf && current.indexOf(PX) > -1)) { // no need to convert
                    value = current;
                } else if (Y.DOM.IE.COMPUTED[property]) { // use compute function
                    value = Y.DOM.IE.COMPUTED[property](el, property);
                } else if (re_unit.test(current)) { // convert to pixel
                    value = ComputedStyle.getPixel(el, property) + PX;
                } else {
                    value = current;
                }
            }

            return value;
        },

        sizeOffsets: {
            width: ['Left', 'Right'],
            height: ['Top', 'Bottom'],
            top: ['Top'],
            bottom: ['Bottom']
        },

        getOffset: function(el, prop) {
            var current = _getStyleObj(el)[prop],                     // value of "width", "top", etc.
                capped = prop.charAt(0).toUpperCase() + prop.substr(1), // "Width", "Top", etc.
                offset = 'offset' + capped,                             // "offsetWidth", "offsetTop", etc.
                pixel = 'pixel' + capped,                               // "pixelWidth", "pixelTop", etc.
                sizeOffsets = ComputedStyle.sizeOffsets[prop], 
                value = '';

            // IE pixelWidth incorrect for percent
            // manually compute by subtracting padding and border from offset size
            // NOTE: clientWidth/Height (size minus border) is 0 when current === AUTO so offsetHeight is used
            // reverting to auto from auto causes position stacking issues (old impl)
            if (current === AUTO || current.indexOf('%') > -1) {
                value = el['offset' + capped];

                if (sizeOffsets[0]) {
                    value -= ComputedStyle.getPixel(el, 'padding' + sizeOffsets[0]);
                    value -= ComputedStyle.getBorderWidth(el, 'border' + sizeOffsets[0] + 'Width', 1);
                }

                if (sizeOffsets[1]) {
                    value -= ComputedStyle.getPixel(el, 'padding' + sizeOffsets[1]);
                    value -= ComputedStyle.getBorderWidth(el, 'border' + sizeOffsets[1] + 'Width', 1);
                }

            } else { // use style.pixelWidth, etc. to convert to pixels
                // need to map style.width to currentStyle (no currentStyle.pixelWidth)
                if (!el.style[pixel] && !el.style[prop]) {
                    el.style[prop] = current;
                }
                value = el.style[pixel];
                
            }
            return value + PX;
        },

        borderMap: {
            thin: '2px', 
            medium: '4px', 
            thick: '6px'
        },

        getBorderWidth: function(el, property, omitUnit) {
            var unit = omitUnit ? '' : PX,
                current = el.currentStyle[property];

            if (current.indexOf(PX) < 0) { // look up keywords
                if (ComputedStyle.borderMap[current]) {
                    current = ComputedStyle.borderMap[current];
                } else {
                    Y.log('borderWidth computing not implemented', 'warn', 'dom-ie-style');
                }
            }
            return (omitUnit) ? parseFloat(current) : current;
        },

        getPixel: function(node, att) {
            // use pixelRight to convert to px
            var val = null,
                style = _getStyleObj(node),
                styleRight = style.right,
                current = style[att];

            node.style.right = current;
            val = node.style.pixelRight;
            node.style.right = styleRight; // revert

            return val;
        },

        getMargin: function(node, att) {
            var val,
                style = _getStyleObj(node);

            if (style[att] == AUTO) {
                val = 0;
            } else {
                val = ComputedStyle.getPixel(node, att);
            }
            return val + PX;
        },

        getVisibility: function(node, att) {
            var current;
            while ( (current = node.currentStyle) && current[att] == 'inherit') { // NOTE: assignment in test
                node = node.parentNode;
            }
            return (current) ? current[att] : VISIBLE;
        },

        getColor: function(node, att) {
            var current = _getStyleObj(node)[att];

            if (!current || current === TRANSPARENT) {
                Y.DOM.elementByAxis(node, 'parentNode', null, function(parent) {
                    current = _getStyleObj(parent)[att];
                    if (current && current !== TRANSPARENT) {
                        node = parent;
                        return true;
                    }
                });
            }

            return Y.Color.toRGB(current);
        },

        getBorderColor: function(node, att) {
            var current = _getStyleObj(node),
                val = current[att] || current.color;
            return Y.Color.toRGB(Y.Color.toHex(val));
        }
    },

    //fontSize: getPixelFont,
    IEComputed = {};

// use alpha filter for IE opacity
try {
    if (documentElement.style[OPACITY] === UNDEFINED &&
            documentElement[FILTERS]) {
        Y.DOM.CUSTOM_STYLES[OPACITY] = {
            get: function(node) {
                var val = 100;
                try { // will error if no DXImageTransform
                    val = node[FILTERS]['DXImageTransform.Microsoft.Alpha'][OPACITY];

                } catch(e) {
                    try { // make sure its in the document
                        val = node[FILTERS]('alpha')[OPACITY];
                    } catch(err) {
                        Y.log('getStyle: IE opacity filter not found; returning 1', 'warn', 'dom-style');
                    }
                }
                return val / 100;
            },

            set: function(node, val, style) {
                var current,
                    styleObj;

                if (val === '') { // normalize inline style behavior
                    styleObj = _getStyleObj(node);
                    current = (OPACITY in styleObj) ? styleObj[OPACITY] : 1; // revert to original opacity
                    val = current;
                }

                if (typeof style[FILTER] == 'string') { // in case not appended
                    style[FILTER] = 'alpha(' + OPACITY + '=' + val * 100 + ')';
                    
                    if (!node.currentStyle || !node.currentStyle[HAS_LAYOUT]) {
                        style.zoom = 1; // needs layout 
                    }
                }
            }
        };
    }
} catch(e) {
    Y.log('document.documentElement.filters error (activeX disabled)', 'warn', 'dom-style');
}

try {
    document.createElement('div').style.height = '-1px';
} catch(e) { // IE throws error on invalid style set; trap common cases
    Y.DOM.CUSTOM_STYLES.height = {
        set: function(node, val, style) {
            var floatVal = parseFloat(val);
            if (isNaN(floatVal) || floatVal >= 0) {
                style.height = val;
            } else {
                Y.log('invalid style value for height: ' + val, 'warn', 'dom-style');
            }
        }
    };

    Y.DOM.CUSTOM_STYLES.width = {
        set: function(node, val, style) {
            var floatVal = parseFloat(val);
            if (isNaN(floatVal) || floatVal >= 0) {
                style.width = val;
            } else {
                Y.log('invalid style value for width: ' + val, 'warn', 'dom-style');
            }
        }
    };
}

// TODO: top, right, bottom, left
IEComputed[WIDTH] = IEComputed[HEIGHT] = ComputedStyle.getOffset;

IEComputed.color = IEComputed.backgroundColor = ComputedStyle.getColor;

IEComputed[BORDER_WIDTH] = IEComputed[BORDER_TOP_WIDTH] = IEComputed[BORDER_RIGHT_WIDTH] =
        IEComputed[BORDER_BOTTOM_WIDTH] = IEComputed[BORDER_LEFT_WIDTH] =
        ComputedStyle.getBorderWidth;

IEComputed.marginTop = IEComputed.marginRight = IEComputed.marginBottom =
        IEComputed.marginLeft = ComputedStyle.getMargin;

IEComputed.visibility = ComputedStyle.getVisibility;
IEComputed.borderColor = IEComputed.borderTopColor =
        IEComputed.borderRightColor = IEComputed.borderBottomColor =
        IEComputed.borderLeftColor = ComputedStyle.getBorderColor;

if (!Y.config.win[GET_COMPUTED_STYLE]) {
    Y.DOM[GET_COMPUTED_STYLE] = ComputedStyle.get; 
}

Y.namespace('DOM.IE');
Y.DOM.IE.COMPUTED = IEComputed;
Y.DOM.IE.ComputedStyle = ComputedStyle;

})(Y);


}, '@VERSION@' ,{requires:['dom-base']});
YUI.add('dom-screen', function(Y) {

(function(Y) {

/**
 * Adds position and region management functionality to DOM.
 * @module dom
 * @submodule dom-screen
 * @for DOM
 */

var DOCUMENT_ELEMENT = 'documentElement',
    COMPAT_MODE = 'compatMode',
    POSITION = 'position',
    FIXED = 'fixed',
    RELATIVE = 'relative',
    LEFT = 'left',
    TOP = 'top',
    _BACK_COMPAT = 'BackCompat',
    MEDIUM = 'medium',
    BORDER_LEFT_WIDTH = 'borderLeftWidth',
    BORDER_TOP_WIDTH = 'borderTopWidth',
    GET_BOUNDING_CLIENT_RECT = 'getBoundingClientRect',
    GET_COMPUTED_STYLE = 'getComputedStyle',

    // TODO: how about thead/tbody/tfoot/tr?
    // TODO: does caption matter?
    RE_TABLE = /^t(?:able|d|h)$/i;

Y.mix(Y.DOM, {
    /**
     * Returns the inner height of the viewport (exludes scrollbar). 
     * @method winHeight
     * @return {Number} The current height of the viewport.
     */
    winHeight: function(node) {
        var h = Y.DOM._getWinSize(node).height;
        Y.log('winHeight returning ' + h, 'info', 'dom-screen');
        return h;
    },

    /**
     * Returns the inner width of the viewport (exludes scrollbar). 
     * @method winWidth
     * @return {Number} The current width of the viewport.
     */
    winWidth: function(node) {
        var w = Y.DOM._getWinSize(node).width;
        Y.log('winWidth returning ' + w, 'info', 'dom-screen');
        return w;
    },

    /**
     * Document height 
     * @method docHeight
     * @return {Number} The current height of the document.
     */
    docHeight:  function(node) {
        var h = Y.DOM._getDocSize(node).height;
        Y.log('docHeight returning ' + h, 'info', 'dom-screen');
        return Math.max(h, Y.DOM._getWinSize(node).height);
    },

    /**
     * Document width 
     * @method docWidth
     * @return {Number} The current width of the document.
     */
    docWidth:  function(node) {
        var w = Y.DOM._getDocSize(node).width;
        Y.log('docWidth returning ' + w, 'info', 'dom-screen');
        return Math.max(w, Y.DOM._getWinSize(node).width);
    },

    /**
     * Amount page has been scroll horizontally 
     * @method docScrollX
     * @return {Number} The current amount the screen is scrolled horizontally.
     */
    docScrollX: function(node) {
        var doc = Y.DOM._getDoc(node);
        return Math.max(doc[DOCUMENT_ELEMENT].scrollLeft, doc.body.scrollLeft);
    },

    /**
     * Amount page has been scroll vertically 
     * @method docScrollY
     * @return {Number} The current amount the screen is scrolled vertically.
     */
    docScrollY:  function(node) {
        var doc = Y.DOM._getDoc(node);
        return Math.max(doc[DOCUMENT_ELEMENT].scrollTop, doc.body.scrollTop);
    },

    /**
     * Gets the current position of an element based on page coordinates. 
     * Element must be part of the DOM tree to have page coordinates
     * (display:none or elements not appended return false).
     * @method getXY
     * @param element The target element
     * @return {Array} The XY position of the element

     TODO: test inDocument/display?
     */
    getXY: function() {
        if (document[DOCUMENT_ELEMENT][GET_BOUNDING_CLIENT_RECT]) {
            return function(node) {
                var xy = null,
                    scrollLeft,
                    scrollTop,
                    box,
                    off1, off2,
                    bLeft, bTop,
                    mode,
                    doc;

                if (node) {
                    if (Y.DOM.inDoc(node)) {
                        scrollLeft = Y.DOM.docScrollX(node);
                        scrollTop = Y.DOM.docScrollY(node);
                        box = node[GET_BOUNDING_CLIENT_RECT]();
                        doc = Y.DOM._getDoc(node);
                        xy = [box.left, box.top];

                            if (Y.UA.ie) {
                                off1 = 2;
                                off2 = 2;
                                mode = doc[COMPAT_MODE];
                                bLeft = Y.DOM[GET_COMPUTED_STYLE](doc[DOCUMENT_ELEMENT], BORDER_LEFT_WIDTH);
                                bTop = Y.DOM[GET_COMPUTED_STYLE](doc[DOCUMENT_ELEMENT], BORDER_TOP_WIDTH);

                                if (Y.UA.ie === 6) {
                                    if (mode !== _BACK_COMPAT) {
                                        off1 = 0;
                                        off2 = 0;
                                    }
                                }
                                
                                if ((mode == _BACK_COMPAT)) {
                                    if (bLeft !== MEDIUM) {
                                        off1 = parseInt(bLeft, 10);
                                    }
                                    if (bTop !== MEDIUM) {
                                        off2 = parseInt(bTop, 10);
                                    }
                                }
                                
                                xy[0] -= off1;
                                xy[1] -= off2;

                            }

                        if ((scrollTop || scrollLeft)) {
                            xy[0] += scrollLeft;
                            xy[1] += scrollTop;
                        }
                    } else { // default to current offsets
                        xy = Y.DOM._getOffset(node);
                    }
                }
                return xy;                   
            };
        } else {
            return function(node) { // manually calculate by crawling up offsetParents
                //Calculate the Top and Left border sizes (assumes pixels)
                var xy = null,
                    parentNode,
                    bCheck,
                    scrollTop,
                    scrollLeft;

                if (node) {
                    if (Y.DOM.inDoc(node)) {
                        xy = [node.offsetLeft, node.offsetTop];
                        parentNode = node;
                        // TODO: refactor with !! or just falsey
                        bCheck = ((Y.UA.gecko || Y.UA.webkit > 519) ? true : false);

                        // TODO: worth refactoring for TOP/LEFT only?
                        while ((parentNode = parentNode.offsetParent)) {
                            xy[0] += parentNode.offsetLeft;
                            xy[1] += parentNode.offsetTop;
                            if (bCheck) {
                                xy = Y.DOM._calcBorders(parentNode, xy);
                            }
                        }

                        // account for any scrolled ancestors
                        if (Y.DOM.getStyle(node, POSITION) != FIXED) {
                            parentNode = node;

                            while ((parentNode = parentNode.parentNode)) {
                                scrollTop = parentNode.scrollTop;
                                scrollLeft = parentNode.scrollLeft;

                                //Firefox does something funky with borders when overflow is not visible.
                                if (Y.UA.gecko && (Y.DOM.getStyle(parentNode, 'overflow') !== 'visible')) {
                                        xy = Y.DOM._calcBorders(parentNode, xy);
                                }
                                

                                if (scrollTop || scrollLeft) {
                                    xy[0] -= scrollLeft;
                                    xy[1] -= scrollTop;
                                }
                            }
                            xy[0] += Y.DOM.docScrollX(node);
                            xy[1] += Y.DOM.docScrollY(node);

                        } else {
                            //Fix FIXED position -- add scrollbars
                            xy[0] += Y.DOM.docScrollX(node);
                            xy[1] += Y.DOM.docScrollY(node);
                        }
                    } else {
                        xy = Y.DOM._getOffset(node);
                    }
                }

                return xy;                
            };
        }
    }(),// NOTE: Executing for loadtime branching

    _getOffset: function(node) {
        var pos,
            xy = null;

        if (node) {
            pos = Y.DOM.getStyle(node, POSITION);
            xy = [
                parseInt(Y.DOM[GET_COMPUTED_STYLE](node, LEFT), 10),
                parseInt(Y.DOM[GET_COMPUTED_STYLE](node, TOP), 10)
            ];

            if ( isNaN(xy[0]) ) { // in case of 'auto'
                xy[0] = parseInt(Y.DOM.getStyle(node, LEFT), 10); // try inline
                if ( isNaN(xy[0]) ) { // default to offset value
                    xy[0] = (pos === RELATIVE) ? 0 : node.offsetLeft || 0;
                }
            } 

            if ( isNaN(xy[1]) ) { // in case of 'auto'
                xy[1] = parseInt(Y.DOM.getStyle(node, TOP), 10); // try inline
                if ( isNaN(xy[1]) ) { // default to offset value
                    xy[1] = (pos === RELATIVE) ? 0 : node.offsetTop || 0;
                }
            } 
        }

        return xy;

    },

    /**
     * Gets the current X position of an element based on page coordinates. 
     * Element must be part of the DOM tree to have page coordinates
     * (display:none or elements not appended return false).
     * @method getX
     * @param element The target element
     * @return {Int} The X position of the element
     */

    getX: function(node) {
        return Y.DOM.getXY(node)[0];
    },

    /**
     * Gets the current Y position of an element based on page coordinates. 
     * Element must be part of the DOM tree to have page coordinates
     * (display:none or elements not appended return false).
     * @method getY
     * @param element The target element
     * @return {Int} The Y position of the element
     */

    getY: function(node) {
        return Y.DOM.getXY(node)[1];
    },

    /**
     * Set the position of an html element in page coordinates.
     * The element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @method setXY
     * @param element The target element
     * @param {Array} xy Contains X & Y values for new position (coordinates are page-based)
     * @param {Boolean} noRetry By default we try and set the position a second time if the first fails
     */
    setXY: function(node, xy, noRetry) {
        var setStyle = Y.DOM.setStyle,
            pos,
            delta,
            newXY,
            currentXY;

        if (node && xy) {
            pos = Y.DOM.getStyle(node, POSITION);

            delta = Y.DOM._getOffset(node);       

            if (pos == 'static') { // default to relative
                pos = RELATIVE;
                setStyle(node, POSITION, pos);
            }

            currentXY = Y.DOM.getXY(node);

            if (xy[0] !== null) {
                setStyle(node, LEFT, xy[0] - currentXY[0] + delta[0] + 'px');
            }

            if (xy[1] !== null) {
                setStyle(node, TOP, xy[1] - currentXY[1] + delta[1] + 'px');
            }

            if (!noRetry) {
                newXY = Y.DOM.getXY(node);
                if (newXY[0] !== xy[0] || newXY[1] !== xy[1]) {
                    Y.DOM.setXY(node, xy, true); 
                }
            }
          
            Y.log('setXY setting position to ' + xy, 'info', 'dom-screen');
        } else {
            Y.log('setXY failed to set ' + node + ' to ' + xy, 'info', 'dom-screen');
        }
    },

    /**
     * Set the X position of an html element in page coordinates, regardless of how the element is positioned.
     * The element(s) must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @method setX
     * @param element The target element
     * @param {Int} x The X values for new position (coordinates are page-based)
     */
    setX: function(node, x) {
        return Y.DOM.setXY(node, [x, null]);
    },

    /**
     * Set the Y position of an html element in page coordinates, regardless of how the element is positioned.
     * The element(s) must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @method setY
     * @param element The target element
     * @param {Int} y The Y values for new position (coordinates are page-based)
     */
    setY: function(node, y) {
        return Y.DOM.setXY(node, [null, y]);
    },

    _calcBorders: function(node, xy2) {
        var t = parseInt(Y.DOM[GET_COMPUTED_STYLE](node, BORDER_TOP_WIDTH), 10) || 0,
            l = parseInt(Y.DOM[GET_COMPUTED_STYLE](node, BORDER_LEFT_WIDTH), 10) || 0;
        if (Y.UA.gecko) {
            if (RE_TABLE.test(node.tagName)) {
                t = 0;
                l = 0;
            }
        }
        xy2[0] += l;
        xy2[1] += t;
        return xy2;
    },

    _getWinSize: function(node) {
        var doc = Y.DOM._getDoc(),
            win = doc.defaultView || doc.parentWindow,
            mode = doc[COMPAT_MODE],
            h = win.innerHeight,
            w = win.innerWidth,
            root = doc[DOCUMENT_ELEMENT];

        if ( mode && !Y.UA.opera ) { // IE, Gecko
            if (mode != 'CSS1Compat') { // Quirks
                root = doc.body; 
            }
            h = root.clientHeight;
            w = root.clientWidth;
        }
        return { height: h, width: w }; 
    },

    _getDocSize: function(node) {
        var doc = Y.DOM._getDoc(),
            root = doc[DOCUMENT_ELEMENT];

        if (doc[COMPAT_MODE] != 'CSS1Compat') {
            root = doc.body;
        }

        return { height: root.scrollHeight, width: root.scrollWidth };
    }
});
})(Y);
(function(Y) {
var TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',

    getOffsets = function(r1, r2) {
        var t = Math.max(r1[TOP], r2[TOP]),
            r = Math.min(r1[RIGHT], r2[RIGHT]),
            b = Math.min(r1[BOTTOM], r2[BOTTOM]),
            l = Math.max(r1[LEFT], r2[LEFT]),
            ret = {};
        
        ret[TOP] = t;
        ret[RIGHT] = r;
        ret[BOTTOM] = b;
        ret[LEFT] = l;
        return ret;
    },

    DOM = Y.DOM;

Y.mix(DOM, {
    /**
     * Returns an Object literal containing the following about this element: (top, right, bottom, left)
     * @method region
     * @param {HTMLElement} element The DOM element. 
     @return {Object} Object literal containing the following about this element: (top, right, bottom, left)
     */
    region: function(node) {
        var xy = DOM.getXY(node),
            ret = false;
        
        if (node && xy) {
            ret = DOM._getRegion(
                xy[1], // top
                xy[0] + node.offsetWidth, // right
                xy[1] + node.offsetHeight, // bottom
                xy[0] // left
            );
        }

        return ret;
    },

    /**
     * Find the intersect information for the passes nodes.
     * @method intersect
     * @param {HTMLElement} element The first element 
     * @param {HTMLElement | Object} element2 The element or region to check the interect with
     * @param {Object} altRegion An object literal containing the region for the first element if we already have the data (for performance i.e. DragDrop)
     @return {Object} Object literal containing the following intersection data: (top, right, bottom, left, area, yoff, xoff, inRegion)
     */
    intersect: function(node, node2, altRegion) {
        var r = altRegion || DOM.region(node), region = {},
            n = node2,
            off;

        if (n.tagName) {
            region = DOM.region(n);
        } else if (Y.Lang.isObject(node2)) {
            region = node2;
        } else {
            return false;
        }
        
        off = getOffsets(region, r);
        return {
            top: off[TOP],
            right: off[RIGHT],
            bottom: off[BOTTOM],
            left: off[LEFT],
            area: ((off[BOTTOM] - off[TOP]) * (off[RIGHT] - off[LEFT])),
            yoff: ((off[BOTTOM] - off[TOP])),
            xoff: (off[RIGHT] - off[LEFT]),
            inRegion: DOM.inRegion(node, node2, false, altRegion)
        };
        
    },
    /**
     * Check if any part of this node is in the passed region
     * @method inRegion
     * @param {Object} node2 The node to get the region from or an Object literal of the region
     * $param {Boolean} all Should all of the node be inside the region
     * @param {Object} altRegion An object literal containing the region for this node if we already have the data (for performance i.e. DragDrop)
     * @return {Boolean} True if in region, false if not.
     */
    inRegion: function(node, node2, all, altRegion) {
        var region = {},
            r = altRegion || DOM.region(node),
            n = node2,
            off;

        if (n.tagName) {
            region = DOM.region(n);
        } else if (Y.Lang.isObject(node2)) {
            region = node2;
        } else {
            return false;
        }
            
        if (all) {
            return (
                r[LEFT]   >= region[LEFT]   &&
                r[RIGHT]  <= region[RIGHT]  && 
                r[TOP]    >= region[TOP]    && 
                r[BOTTOM] <= region[BOTTOM]  );
        } else {
            off = getOffsets(region, r);
            if (off[BOTTOM] >= off[TOP] && off[RIGHT] >= off[LEFT]) {
                return true;
            } else {
                return false;
            }
            
        }
    },

    /**
     * Check if any part of this element is in the viewport
     * @method inViewportRegion
     * @param {HTMLElement} element The DOM element. 
     * @param {Boolean} all Should all of the node be inside the region
     * @param {Object} altRegion An object literal containing the region for this node if we already have the data (for performance i.e. DragDrop)
     * @return {Boolean} True if in region, false if not.
     */
    inViewportRegion: function(node, all, altRegion) {
        return DOM.inRegion(node, DOM.viewportRegion(node), all, altRegion);
            
    },

    _getRegion: function(t, r, b, l) {
        var region = {};

        region[TOP] = region[1] = t;
        region[LEFT] = region[0] = l;
        region[BOTTOM] = b;
        region[RIGHT] = r;
        region.width = region[RIGHT] - region[LEFT];
        region.height = region[BOTTOM] - region[TOP];

        return region;
    },

    /**
     * Returns an Object literal containing the following about the visible region of viewport: (top, right, bottom, left)
     * @method viewportRegion
     @return {Object} Object literal containing the following about the visible region of the viewport: (top, right, bottom, left)
     */
    viewportRegion: function(node) {
        node = node || Y.config.doc.documentElement;
        var ret = false,
            scrollX,
            scrollY;

        if (node) {
            scrollX = DOM.docScrollX(node);
            scrollY = DOM.docScrollY(node);

            ret = DOM._getRegion(scrollY, // top
                DOM.winWidth(node) + scrollX, // right
                scrollY + DOM.winHeight(node), // bottom
                scrollX); // left
        }

        return ret;
    }
});
})(Y);


}, '@VERSION@' ,{requires:['dom-base', 'dom-style']});
YUI.add('selector-native', function(Y) {

(function(Y) {
/**
 * The selector-native module provides support for native querySelector
 * @module dom
 * @submodule selector-native
 * @for Selector
 */

/**
 * Provides support for using CSS selectors to query the DOM 
 * @class Selector 
 * @static
 * @for Selector
 */

Y.namespace('Selector'); // allow native module to standalone

var COMPARE_DOCUMENT_POSITION = 'compareDocumentPosition',
    OWNER_DOCUMENT = 'ownerDocument',
    TMP_PREFIX = 'yui-tmp-',
    g_counter = 0;

var Selector = {
    _foundCache: [],

    useNative: true,

    _compare: ('sourceIndex' in document.documentElement) ?
        function(nodeA, nodeB) {
            var a = nodeA.sourceIndex,
                b = nodeB.sourceIndex;

            if (a === b) {
                return 0;
            } else if (a > b) {
                return 1;
            }

            return -1;

        } : (document.documentElement[COMPARE_DOCUMENT_POSITION] ?
        function(nodeA, nodeB) {
            if (nodeA[COMPARE_DOCUMENT_POSITION](nodeB) & 4) {
                return -1;
            } else {
                return 1;
            }
        } :
        function(nodeA, nodeB) {
            var rangeA, rangeB, compare;
            if (nodeA && nodeB) {
                rangeA = nodeA[OWNER_DOCUMENT].createRange();
                rangeA.setStart(nodeA, 0);
                rangeB = nodeB[OWNER_DOCUMENT].createRange();
                rangeB.setStart(nodeB, 0);
                compare = rangeA.compareBoundaryPoints(1, rangeB); // 1 === Range.START_TO_END
            }

            return compare;
        
    }),

    _sort: function(nodes) {
        if (nodes) {
            nodes = Y.Array(nodes, 0, true);
            if (nodes.sort) {
                nodes.sort(Selector._compare);
            }
        }

        return nodes;
    },

    _deDupe: function(nodes) {
        var ret = [],
            i, node;

        for (i = 0; (node = nodes[i++]);) {
            if (!node._found) {
                ret[ret.length] = node;
                node._found = true;
            }
        }

        for (i = 0; (node = ret[i++]);) {
            node._found = null;
            node.removeAttribute('_found');
        }

        return ret;
    },

    /**
     * Retrieves a set of nodes based on a given CSS selector. 
     * @method query
     *
     * @param {string} selector The CSS Selector to test the node against.
     * @param {HTMLElement} root optional An HTMLElement to start the query from. Defaults to Y.config.doc
     * @param {Boolean} firstOnly optional Whether or not to return only the first match.
     * @return {Array} An array of nodes that match the given selector.
     * @static
     */
    query: function(selector, root, firstOnly, skipNative) {
        root = root || Y.config.doc;
        var ret = [],
            useNative = (Y.Selector.useNative && document.querySelector && !skipNative),
            queries = [[selector, root]],
            query,
            result,
            i,
            fn = (useNative) ? Y.Selector._nativeQuery : Y.Selector._bruteQuery;

        if (selector && fn) {
            // split group into seperate queries
            if (!skipNative && // already done if skipping
                    (!useNative || root.tagName)) { // split native when element scoping is needed
                queries = Selector._splitQueries(selector, root);
            }

            for (i = 0; (query = queries[i++]);) {
                result = fn(query[0], query[1], firstOnly);
                if (!firstOnly) { // coerce DOM Collection to Array
                    result = Y.Array(result, 0, true);
                }
                if (result) {
                    ret = ret.concat(result);
                }
            }

            if (queries.length > 1) { // remove dupes and sort by doc order 
                ret = Selector._sort(Selector._deDupe(ret));
            }
        }

        Y.log('query: ' + selector + ' returning: ' + ret.length, 'info', 'Selector');
        return (firstOnly) ? (ret[0] || null) : ret;

    },

    // allows element scoped queries to begin with combinator
    // e.g. query('> p', document.body) === query('body > p')
    _splitQueries: function(selector, node) {
        var groups = selector.split(','),
            queries = [],
            prefix = '',
            i, len;

        if (node) {
            // enforce for element scoping
            if (node.tagName) {
                node.id = node.id || Y.guid();
                prefix = '#' + node.id + ' ';
            }

            for (i = 0, len = groups.length; i < len; ++i) {
                selector =  prefix + groups[i];
                queries.push([selector, node]);
            }
        }

        return queries;
    },

    _nativeQuery: function(selector, root, one) {
        try {
            //Y.log('trying native query with: ' + selector, 'info', 'selector-native');
            return root['querySelector' + (one ? '' : 'All')](selector);
        } catch(e) { // fallback to brute if available
            //Y.log('native query error; reverting to brute query with: ' + selector, 'info', 'selector-native');
            return Y.Selector.query(selector, root, one, true); // redo with skipNative true
        }
    },

    filter: function(nodes, selector) {
        var ret = [],
            i, node;

        if (nodes && selector) {
            for (i = 0; (node = nodes[i++]);) {
                if (Y.Selector.test(node, selector)) {
                    ret[ret.length] = node;
                }
            }
        } else {
            Y.log('invalid filter input (nodes: ' + nodes +
                    ', selector: ' + selector + ')', 'warn', 'Selector');
        }

        return ret;
    },

    test: function(node, selector, root) {
        var ret = false,
            groups = selector.split(','),
            item,
            i, group;

        if (node && node.tagName) { // only test HTMLElements
            root = root || node.ownerDocument;

            if (!node.id) {
                node.id = TMP_PREFIX + g_counter++;
            }
            for (i = 0; (group = groups[i++]);) { // TODO: off-dom test
                group += '#' + node.id; // add ID for uniqueness
                item = Y.Selector.query(group, root, true);
                ret = (item === node);
                if (ret) {
                    break;
                }
            }
        }

        return ret;
    }
};

Y.mix(Y.Selector, Selector, true);

})(Y);


}, '@VERSION@' ,{requires:['dom-base']});
YUI.add('selector-css2', function(Y) {

/**
 * The selector module provides helper methods allowing CSS2 Selectors to be used with DOM elements.
 * @module dom
 * @submodule selector-css2
 * @for Selector
 */

/**
 * Provides helper methods for collecting and filtering DOM elements.
 */

var PARENT_NODE = 'parentNode',
    TAG_NAME = 'tagName',
    ATTRIBUTES = 'attributes',
    COMBINATOR = 'combinator',
    PSEUDOS = 'pseudos',

    Selector = Y.Selector,

    SelectorCSS2 = {
        SORT_RESULTS: true,
        _children: function(node, tag) {
            var ret = node.children,
                i,
                children = [],
                childNodes,
                child;

            if (node.children && tag && node.children.tags) {
                children = node.children.tags(tag);
            } else if ((!ret && node[TAG_NAME]) || (ret && tag)) { // only HTMLElements have children
                childNodes = ret || node.childNodes;
                ret = [];
                for (i = 0; (child = childNodes[i++]);) {
                    if (child.tagName) {
                        if (!tag || tag === child.tagName) {
                            ret.push(child);
                        }
                    }
                }
            }

            return ret || [];
        },

        _regexCache: {},

        _re: {
            attr: /(\[.*\])/g,
            pseudos: /:([\-\w]+(?:\(?:['"]?(.+)['"]?\)))*/i
        },

        /**
         * Mapping of shorthand tokens to corresponding attribute selector 
         * @property shorthand
         * @type object
         */
        shorthand: {
            '\\#(-?[_a-z]+[-\\w]*)': '[id=$1]',
            '\\.(-?[_a-z]+[-\\w]*)': '[className~=$1]'
        },

        /**
         * List of operators and corresponding boolean functions. 
         * These functions are passed the attribute and the current node's value of the attribute.
         * @property operators
         * @type object
         */
        operators: {
            '': function(node, attr) { return Y.DOM.getAttribute(node, attr) !== ''; }, // Just test for existence of attribute
            //'': '.+',
            //'=': '^{val}$', // equality
            '~=': '(?:^|\\s+){val}(?:\\s+|$)', // space-delimited
            '|=': '^{val}-?' // optional hyphen-delimited
        },

        pseudos: {
           'first-child': function(node) { 
                return Y.Selector._children(node[PARENT_NODE])[0] === node; 
            } 
        },

        _bruteQuery: function(selector, root, firstOnly) {
            var ret = [],
                nodes = [],
                tokens = Selector._tokenize(selector),
                token = tokens[tokens.length - 1],
                rootDoc = Y.DOM._getDoc(root),
                id,
                className,
                tagName;


            // if we have an initial ID, set to root when in document
            if (tokens[0] && rootDoc === root &&  
                    (id = tokens[0].id) &&
                    rootDoc.getElementById(id)) {
                root = rootDoc.getElementById(id);
            }

            if (token) {
                // prefilter nodes
                id = token.id;
                className = token.className;
                tagName = token.tagName || '*';

                // try ID first
                if (id) {
                    if (rootDoc.getElementById(id)) { // if in document
                    nodes = [rootDoc.getElementById(id)]; // TODO: DOM.byId?
                }
                // try className if supported
                } else if (className) {
                    nodes = root.getElementsByClassName(className);
                } else if (tagName) { // default to tagName
                    nodes = root.getElementsByTagName(tagName || '*');
                }

                if (nodes.length) {
                    ret = Selector._filterNodes(nodes, tokens, firstOnly);
                }
            }

            return ret;
        },
        
        _filterNodes: function(nodes, tokens, firstOnly) {
            var i = 0,
                j,
                len = tokens.length,
                n = len - 1,
                result = [],
                node = nodes[0],
                tmpNode = node,
                getters = Y.Selector.getters,
                operator,
                combinator,
                token,
                path,
                pass,
                //FUNCTION = 'function',
                value,
                tests,
                test;

            //do {
            for (i = 0; (tmpNode = node = nodes[i++]);) {
                n = len - 1;
                path = null;
                
                testLoop:
                while (tmpNode && tmpNode.tagName) {
                    token = tokens[n];
                    tests = token.tests;
                    j = tests.length;
                    if (j && !pass) {
                        while ((test = tests[--j])) {
                            operator = test[1];
                            if (getters[test[0]]) {
                                value = getters[test[0]](tmpNode, test[0]);
                            } else {
                                value = tmpNode[test[0]];
                                // use getAttribute for non-standard attributes
                                if (value === undefined && tmpNode.getAttribute) {
                                    value = tmpNode.getAttribute(test[0]);
                                }
                            }

                            if ((operator === '=' && value !== test[2]) ||  // fast path for equality
                                (operator.test && !operator.test(value)) ||  // regex test
                                (operator.call && !operator(tmpNode, test[0]))) { // function test

                                // skip non element nodes or non-matching tags
                                if ((tmpNode = tmpNode[path])) {
                                    while (tmpNode &&
                                        (!tmpNode.tagName ||
                                            (token.tagName && token.tagName !== tmpNode.tagName))
                                    ) {
                                        tmpNode = tmpNode[path]; 
                                    }
                                }
                                continue testLoop;
                            }
                        }
                    }

                    n--; // move to next token
                    // now that we've passed the test, move up the tree by combinator
                    if (!pass && (combinator = token.combinator)) {
                        path = combinator.axis;
                        tmpNode = tmpNode[path];

                        // skip non element nodes
                        while (tmpNode && !tmpNode.tagName) {
                            tmpNode = tmpNode[path]; 
                        }

                        if (combinator.direct) { // one pass only
                            path = null; 
                        }

                    } else { // success if we made it this far
                        result.push(node);
                        if (firstOnly) {
                            return result;
                        }
                        break;
                    }
                }
            }// while (tmpNode = node = nodes[++i]);
            node = tmpNode = null;
            return result;
        },

        _getRegExp: function(str, flags) {
            var regexCache = Selector._regexCache;
            flags = flags || '';
            if (!regexCache[str + flags]) {
                regexCache[str + flags] = new RegExp(str, flags);
            }
            return regexCache[str + flags];
        },

        combinators: {
            ' ': {
                axis: 'parentNode'
            },

            '>': {
                axis: 'parentNode',
                direct: true
            },


            '+': {
                axis: 'previousSibling',
                direct: true
            }
        },

        _parsers: [
            {
                name: ATTRIBUTES,
                re: /^\[([a-z]+\w*)+([~\|\^\$\*!=]=?)?['"]?([^\]]*?)['"]?\]/i,
                fn: function(match, token) {
                    var operator = match[2] || '',
                        operators = Y.Selector.operators,
                        test;

                    // add prefiltering for ID and CLASS
                    if ((match[1] === 'id' && operator === '=') ||
                            (match[1] === 'className' &&
                            document.getElementsByClassName &&
                            (operator === '~=' || operator === '='))) {
                        token.prefilter = match[1];
                        token[match[1]] = match[3];
                    }

                    // add tests
                    if (operator in operators) {
                        test = operators[operator];
                        if (typeof test === 'string') {
                            test = Y.Selector._getRegExp(test.replace('{val}', match[3]));
                        }
                        match[2] = test;
                    }
                    if (!token.last || token.prefilter !== match[1]) {
                        return match.slice(1);
                    }
                }

            },
            {
                name: TAG_NAME,
                re: /^((?:-?[_a-z]+[\w-]*)|\*)/i,
                fn: function(match, token) {
                    var tag = match[1].toUpperCase();
                    token.tagName = tag;

                    if (tag !== '*' && (!token.last || token.prefilter)) {
                        return [TAG_NAME, '=', tag];
                    }
                    if (!token.prefilter) {
                        token.prefilter = 'tagName';
                    }
                }
            },
            {
                name: COMBINATOR,
                re: /^\s*([>+~]|\s)\s*/,
                fn: function(match, token) {
                }
            },
            {
                name: PSEUDOS,
                re: /^:([\-\w]+)(?:\(['"]?(.+)['"]?\))*/i,
                fn: function(match, token) {
                    var test = Selector[PSEUDOS][match[1]];
                    if (test) { // reorder match array
                        return [match[2], test];
                    } else { // selector token not supported (possibly missing CSS3 module)
                        return false;
                    }
                }
            }
            ],

        _getToken: function(token) {
            return {
                tagName: null,
                id: null,
                className: null,
                attributes: {},
                combinator: null,
                tests: []
            };
        },

        /**
            Break selector into token units per simple selector.
            Combinator is attached to the previous token.
         */
        _tokenize: function(selector) {
            selector = selector || '';
            selector = Selector._replaceShorthand(Y.Lang.trim(selector)); 
            var token = Selector._getToken(),     // one token per simple selector (left selector holds combinator)
                query = selector, // original query for debug report
                tokens = [],    // array of tokens
                found = false,  // whether or not any matches were found this pass
                match,         // the regex match
                test,
                i, parser;

            /*
                Search for selector patterns, store, and strip them from the selector string
                until no patterns match (invalid selector) or we run out of chars.

                Multiple attributes and pseudos are allowed, in any order.
                for example:
                    'form:first-child[type=button]:not(button)[lang|=en]'
            */
            outer:
            do {
                found = false; // reset after full pass
                for (i = 0; (parser = Selector._parsers[i++]);) {
                    if ( (match = parser.re.exec(selector)) ) { // note assignment
                        if (parser !== COMBINATOR ) {
                            token.selector = selector;
                        }
                        selector = selector.replace(match[0], ''); // strip current match from selector
                        if (!selector.length) {
                            token.last = true;
                        }

                        if (Selector._attrFilters[match[1]]) { // convert class to className, etc.
                            match[1] = Selector._attrFilters[match[1]];
                        }

                        test = parser.fn(match, token);
                        if (test === false) { // selector not supported
                            found = false;
                            break outer;
                        } else if (test) {
                            token.tests.push(test);
                        }

                        if (!selector.length || parser.name === COMBINATOR) {
                            tokens.push(token);
                            token = Selector._getToken(token);
                            if (parser.name === COMBINATOR) {
                                token.combinator = Y.Selector.combinators[match[1]];
                            }
                        }
                        found = true;
                    }
                }
            } while (found && selector.length);

            if (!found || selector.length) { // not fully parsed
                Y.log('query: ' + query + ' contains unsupported token in: ' + selector, 'warn', 'Selector');
                tokens = [];
            }
            return tokens;
        },

        _replaceShorthand: function(selector) {
            var shorthand = Selector.shorthand,
                attrs = selector.match(Selector._re.attr), // pull attributes to avoid false pos on "." and "#"
                pseudos = selector.match(Selector._re.pseudos), // pull attributes to avoid false pos on "." and "#"
                re, i, len;

            if (pseudos) {
                selector = selector.replace(Selector._re.pseudos, '!!REPLACED_PSEUDO!!');
            }

            if (attrs) {
                selector = selector.replace(Selector._re.attr, '!!REPLACED_ATTRIBUTE!!');
            }

            for (re in shorthand) {
                if (shorthand.hasOwnProperty(re)) {
                    selector = selector.replace(Selector._getRegExp(re, 'gi'), shorthand[re]);
                }
            }

            if (attrs) {
                for (i = 0, len = attrs.length; i < len; ++i) {
                    selector = selector.replace('!!REPLACED_ATTRIBUTE!!', attrs[i]);
                }
            }
            if (pseudos) {
                for (i = 0, len = pseudos.length; i < len; ++i) {
                    selector = selector.replace('!!REPLACED_PSEUDO!!', pseudos[i]);
                }
            }
            return selector;
        },

        _attrFilters: {
            'class': 'className',
            'for': 'htmlFor'
        },

        getters: {
            href: function(node, attr) {
                return Y.DOM.getAttribute(node, attr);
            }
        }
    };

Y.mix(Y.Selector, SelectorCSS2, true);
Y.Selector.getters.src = Y.Selector.getters.rel = Y.Selector.getters.href;

// IE wants class with native queries
if (Y.Selector.useNative && document.querySelector) {
    Y.Selector.shorthand['\\.(-?[_a-z]+[-\\w]*)'] = '[class~=$1]';
}



}, '@VERSION@' ,{requires:['selector-native']});


YUI.add('selector', function(Y){}, '@VERSION@' ,{use:['selector-native', 'selector-css2']});



YUI.add('dom', function(Y){}, '@VERSION@' ,{use:['dom-base', 'dom-style', 'dom-screen', 'selector']});


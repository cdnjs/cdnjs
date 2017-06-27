YUI.add('selector', function(Y) {

/**
 * Provides helper methods for collecting and filtering DOM elements.
 * @module dom
 * @submodule selector
 */

/**
 * Provides helper methods for collecting and filtering DOM elements.
 * @class Selector
 * @static
 */

var TAG = 'tag',
    PARENT_NODE = 'parentNode',
    PREVIOUS_SIBLING = 'previousSibling',
    LENGTH = 'length',
    NODE_TYPE = 'nodeType',
    TAG_NAME = 'tagName',
    ATTRIBUTES = 'attributes',
    PSEUDOS = 'pseudos',
    COMBINATOR = 'combinator';

var reNth = /^(?:([\-]?\d*)(n){1}|(odd|even)$)*([\-+]?\d*)$/;

var patterns = {
    tag: /^((?:-?[_a-z]+[\w\-]*)|\*)/i,
    attributes: /^\[([a-z]+\w*)+([~\|\^\$\*!=]=?)?['"]?([^\]]*?)['"]?\]/i,
    pseudos: /^:([\-\w]+)(?:\(['"]?(.+)['"]?\))*/i,
    combinator: /^\s*([>+~]|\s)\s*/
};

var Selector = {
    /**
     * Default document for use queries 
     * @property document
     * @type object
     * @default window.document
     */
    document: Y.config.doc,
    /**
     * Mapping of attributes to aliases, normally to work around HTMLAttributes
     * that conflict with JS reserved words.
     * @property attrAliases
     * @type object
     */
    attrAliases: {},

    /**
     * Mapping of shorthand tokens to corresponding attribute selector 
     * @property shorthand
     * @type object
     */
    shorthand: {
        '\\#(-?[_a-z]+[-\\w]*)': '[id=$1]',
        '\\.(-?[_a-z]+[-\\w]*)': '[class~=$1]'
    },

    /**
     * List of operators and corresponding boolean functions. 
     * These functions are passed the attribute and the current node's value of the attribute.
     * @property operators
     * @type object
     */
    operators: {
        '=': function(attr, val) { return attr === val; }, // Equality
        '!=': function(attr, val) { return attr !== val; }, // Inequality
        '~=': function(attr, val) { // Match one of space seperated words 
            var s = ' ';
            return (s + attr + s).indexOf((s + val + s)) > -1;
        },
        '|=': function(attr, val) { return Y.DOM._getRegExp('^' + val + '[-]?').test(attr); }, // Match start with value followed by optional hyphen
        '^=': function(attr, val) { return attr.indexOf(val) === 0; }, // Match starts with value
        '$=': function(attr, val) { return attr.lastIndexOf(val) === attr[LENGTH] - val[LENGTH]; }, // Match ends with value
        '*=': function(attr, val) { return attr.indexOf(val) > -1; }, // Match contains value as substring 
        '': function(attr, val) { return attr; } // Just test for existence of attribute
    },

    /**
     * List of pseudo-classes and corresponding boolean functions. 
     * These functions are called with the current node, and any value that was parsed with the pseudo regex.
     * @property pseudos
     * @type object
     */
    pseudos: {
        'root': function(node) {
            return node === node.ownerDocument.documentElement;
        },

        'nth-child': function(node, val) {
            return Selector.getNth(node, val);
        },

        'nth-last-child': function(node, val) {
            return Selector.getNth(node, val, null, true);
        },

        'nth-of-type': function(node, val) {
            return Selector.getNth(node, val, node[TAG_NAME]);
        },
         
        'nth-last-of-type': function(node, val) {
            return Selector.getNth(node, val, node[TAG_NAME], true);
        },
         
        'first-child': function(node) {
            return Y.DOM.firstChild(node[PARENT_NODE]) === node;
        },

        'last-child': function(node) {
            return Y.DOM.lastChild(node[PARENT_NODE]) === node;
        },

        'first-of-type': function(node, val) {
            return Y.DOM.firstChildByTag(node[PARENT_NODE], node[TAG_NAME]) === node;
        },
         
        'last-of-type': function(node, val) {
            return Y.DOM.lastChildByTag(node[PARENT_NODE], node[TAG_NAME]) === node;
        },
         
        'only-child': function(node) {
            var children = Y.DOM.children(node[PARENT_NODE]);
            return children[LENGTH] === 1 && children[0] === node;
        },

        'only-of-type': function(node) {
            return Y.DOM.childrenByTag(node[PARENT_NODE], node[TAG_NAME])[LENGTH] === 1;
        },

        'empty': function(node) {
            return node.childNodes[LENGTH] === 0;
        },

        'not': function(node, simple) {
            return !Selector.test(node, simple);
        },

        'contains': function(node, str) {
            var text = node.innerText || node.textContent || '';
            return text.indexOf(str) > -1;
        },
        'checked': function(node) {
            return node.checked === true;
        }
    },

    /**
     * Test if the supplied node matches the supplied selector.
     * @method test
     *
     * @param {HTMLElement | String} node An id or node reference to the HTMLElement being tested.
     * @param {string} selector The CSS Selector to test the node against.
     * @return{boolean} Whether or not the node matches the selector.
     * @static
    
     */
    test: function(node, selector) {
        if (!node) {
            return false;
        }

        var groups = selector ? selector.split(',') : [];
        if (groups[LENGTH]) {
            for (var i = 0, len = groups[LENGTH]; i < len; ++i) {
                if ( Selector._testNode(node, groups[i]) ) { // passes if ANY group matches
                    return true;
                }
            }
            return false;
        }
        return Selector._testNode(node, selector);
    },

    /**
     * Filters a set of nodes based on a given CSS selector. 
     * @method filter
     *
     * @param {array} nodes A set of nodes/ids to filter. 
     * @param {string} selector The selector used to test each node.
     * @return{array} An array of nodes from the supplied array that match the given selector.
     * @static
     */
    filter: function(nodes, selector) {
        nodes = nodes || [];

        var result = Selector._filter(nodes, Selector._tokenize(selector)[0]);
        return result;
    },

    /**
     * Retrieves a set of nodes based on a given CSS selector. 
     * @method query
     *
     * @param {string} selector The CSS Selector to test the node against.
     * @param {HTMLElement | String} root optional An id or HTMLElement to start the query from. Defaults to Selector.document.
     * @param {Boolean} firstOnly optional Whether or not to return only the first match.
     * @return {Array} An array of nodes that match the given selector.
     * @static
     */
    query: function(selector, root, firstOnly) {
        var result = Selector._query(selector, root, firstOnly);
        return result;
    },

    _query: function(selector, root, firstOnly, deDupe) {
        var result =  (firstOnly) ? null : [];
        if (!selector) {
            return result;
        }

        root = root || Selector.document;
        var groups = selector.split(','); // TODO: handle comma in attribute/pseudo

        if (groups[LENGTH] > 1) {
            var found;
            for (var i = 0, len = groups[LENGTH]; i < len; ++i) {
                found = arguments.callee(groups[i], root, firstOnly, true);
                result = firstOnly ? found : result.concat(found); 
            }
            Selector._clearFoundCache();
            return result;
        }

        var tokens = Selector._tokenize(selector);
        var idToken = tokens[Selector._getIdTokenIndex(tokens)],
            nodes = [],
            node,
            id,
            token = tokens.pop() || {};
            
        if (idToken) {
            id = Selector._getId(idToken[ATTRIBUTES]);
        }

        // use id shortcut when possible
        if (id) {
            node = Selector.document.getElementById(id);

            if (node && (root[NODE_TYPE] === 9 || Y.DOM.contains(root, node))) {
                if ( Selector._testNode(node, null, idToken) ) {
                    if (idToken === token) {
                        nodes = [node]; // simple selector
                    } else {
                        root = node; // start from here
                    }
                }
            } else {
                return result;
            }
        }

        if (root && !nodes[LENGTH]) {
            nodes = root.getElementsByTagName(token[TAG]);
        }

        if (nodes[LENGTH]) {
            result = Selector._filter(nodes, token, firstOnly, deDupe); 
        }
        return result;
    },

    _filter: function(nodes, token, firstOnly, deDupe) {
        var result = firstOnly ? null : [];

        result = Y.DOM.filterElementsBy(nodes, function(node) {
            if (! Selector._testNode(node, '', token, deDupe)) {
                return false;
            }

            if (deDupe) {
                if (node._found) {
                    return false;
                }
                node._found = true;
                Selector._foundCache[Selector._foundCache[LENGTH]] = node;
            }
            return true;
        }, firstOnly);

        return result;
    },

    _testNode: function(node, selector, token, deDupe) {
        token = token || Selector._tokenize(selector).pop() || {};
        var ops = Selector.operators,
            pseudos = Selector.pseudos,
            prev = token.previous,
            i, len;

        if (!node[TAG_NAME] ||
            (token[TAG] !== '*' && node[TAG_NAME].toUpperCase() !== token[TAG]) ||
            (deDupe && node._found) ) {
            return false;
        }

        if (token[ATTRIBUTES][LENGTH]) {
            var attribute;
            for (i = 0, len = token[ATTRIBUTES][LENGTH]; i < len; ++i) {
                attribute = node.getAttribute(token[ATTRIBUTES][i][0], 2);
                if (attribute === undefined) {
                    return false;
                }
                if ( ops[token[ATTRIBUTES][i][1]] &&
                        !ops[token[ATTRIBUTES][i][1]](attribute, token[ATTRIBUTES][i][2])) {
                    return false;
                }
            }
        }

        if (token[PSEUDOS][LENGTH]) {
            for (i = 0, len = token[PSEUDOS][LENGTH]; i < len; ++i) {
                if (pseudos[token[PSEUDOS][i][0]] &&
                        !pseudos[token[PSEUDOS][i][0]](node, token[PSEUDOS][i][1])) {
                    return false;
                }
            }
        }
        return (prev && prev[COMBINATOR] !== ',') ?
                Selector.combinators[prev[COMBINATOR]](node, token) :
                true;
    },


    _foundCache: [],
    _regexCache: {},

    _clearFoundCache: function() {
        for (var i = 0, len = Selector._foundCache[LENGTH]; i < len; ++i) {
            try { // IE no like delete
                delete Selector._foundCache[i]._found;
            } catch(e) {
                Selector._foundCache[i].removeAttribute('_found');
            }
        }
        Selector._foundCache = [];
    },

    combinators: {
        ' ': function(node, token) {
            while ((node = node[PARENT_NODE])) {
                if (Selector._testNode(node, '', token.previous)) {
                    return true;
                }
            }  
            return false;
        },

        '>': function(node, token) {
            return Selector._testNode(node[PARENT_NODE], null, token.previous);
        },
        '+': function(node, token) {
            var sib = node[PREVIOUS_SIBLING];
            while (sib && sib[NODE_TYPE] !== 1) {
                sib = sib[PREVIOUS_SIBLING];
            }

            if (sib && Selector._testNode(sib, null, token.previous)) {
                return true; 
            }
            return false;
        },

        '~': function(node, token) {
            var sib = node[PREVIOUS_SIBLING];
            while (sib) {
                if (sib[NODE_TYPE] === 1 && Selector._testNode(sib, null, token.previous)) {
                    return true;
                }
                sib = sib[PREVIOUS_SIBLING];
            }

            return false;
        }
    },


    /*
        an+b = get every _a_th node starting at the _b_th
        0n+b = no repeat ("0" and "n" may both be omitted (together) , e.g. "0n+1" or "1", not "0+1"), return only the _b_th element
        1n+b =  get every element starting from b ("1" may may be omitted, e.g. "1n+0" or "n+0" or "n")
        an+0 = get every _a_th element, "0" may be omitted 
    */
    getNth: function(node, expr, tag, reverse) {
        reNth.test(expr);

        var a = parseInt(RegExp.$1, 10), // include every _a_ elements (zero means no repeat, just first _a_)
            n = RegExp.$2, // "n"
            oddeven = RegExp.$3, // "odd" or "even"
            b = parseInt(RegExp.$4, 10) || 0, // start scan from element _b_
            op, i, len, siblings;

        if (tag) {
            siblings = Y.DOM.childrenByTag(node[PARENT_NODE], tag);
        } else {
            siblings = Y.DOM.children(node[PARENT_NODE]);
        }

        if (oddeven) {
            a = 2; // always every other
            op = '+';
            n = 'n';
            b = (oddeven === 'odd') ? 1 : 0;
        } else if ( isNaN(a) ) {
            a = (n) ? 1 : 0; // start from the first or no repeat
        }

        if (a === 0) { // just the first
            if (reverse) {
                b = siblings[LENGTH] - b + 1; 
            }

            if (siblings[b - 1] === node) {
                return true;
            } else {
                return false;
            }

        } else if (a < 0) {
            reverse = !!reverse;
            a = Math.abs(a);
        }

        if (!reverse) {
            for (i = b - 1, len = siblings[LENGTH]; i < len; i += a) {
                if ( i >= 0 && siblings[i] === node ) {
                    return true;
                }
            }
        } else {
            for (i = siblings[LENGTH] - b, len = siblings[LENGTH]; i >= 0; i -= a) {
                if ( i < len && siblings[i] === node ) {
                    return true;
                }
            }
        }
        return false;
    },

    _getId: function(attr) {
        for (var i = 0, len = attr[LENGTH]; i < len; ++i) {
            if (attr[i][0] == 'id' && attr[i][1] === '=') {
                return attr[i][2];
            }
        }
    },

    _getIdTokenIndex: function(tokens) {
        for (var i = 0, len = tokens[LENGTH]; i < len; ++i) {
            if (Selector._getId(tokens[i][ATTRIBUTES])) {
                return i;
            }
        }
        return -1;
    },

    /**
        Break selector into token units per simple selector.
        Combinator is attached to left-hand selector.
     */
    _tokenize: function(selector) {
        var token = {},     // one token per simple selector (left selector holds combinator)
            tokens = [],    // array of tokens
            found = false,  // whether or not any matches were found this pass
            match;          // the regex match

        selector = Selector._replaceShorthand(selector); // convert ID and CLASS shortcuts to attributes

        /*
            Search for selector patterns, store, and strip them from the selector string
            until no patterns match (invalid selector) or we run out of chars.

            Multiple attributes and pseudos are allowed, in any order.
            for example:
                'form:first-child[type=button]:not(button)[lang|=en]'
        */
        do {
            found = false; // reset after full pass
            for (var re in patterns) {
                if (patterns.hasOwnProperty(re)) {
                    if (re != TAG && re != COMBINATOR) { // only one allowed
                        token[re] = token[re] || [];
                    }
                    if ((match = patterns[re].exec(selector))) { // note assignment
                        found = true;
                        if (re != TAG && re != COMBINATOR) { // only one allowed
                            //token[re] = token[re] || [];

                            // capture ID for fast path to element
                            if (re === ATTRIBUTES && match[1] === 'id') {
                                token.id = match[3];
                            }

                            token[re].push(match.slice(1));
                        } else { // single selector (tag, combinator)
                            token[re] = match[1];
                        }
                        selector = selector.replace(match[0], ''); // strip current match from selector
                        if (re === COMBINATOR || !selector[LENGTH]) { // next token or done
                            token[ATTRIBUTES] = Selector._fixAttributes(token[ATTRIBUTES]);
                            token[PSEUDOS] = token[PSEUDOS] || [];
                            token[TAG] = token[TAG] ? token[TAG].toUpperCase() : '*';
                            tokens.push(token);

                            token = { // prep next token
                                previous: token
                            };
                        }
                    }
                }
            }
        } while (found);

        return tokens;
    },

    _fixAttributes: function(attr) {
        var aliases = Selector.attrAliases;
        attr = attr || [];
        for (var i = 0, len = attr[LENGTH]; i < len; ++i) {
            if (aliases[attr[i][0]]) { // convert reserved words, etc
                attr[i][0] = aliases[attr[i][0]];
            }
            if (!attr[i][1]) { // use exists operator
                attr[i][1] = '';
            }
        }
        return attr;
    },

    _replaceShorthand: function(selector) {
        var shorthand = Selector.shorthand;
        var attrs = selector.match(patterns[ATTRIBUTES]); // pull attributes to avoid false pos on "." and "#"
        if (attrs) {
            selector = selector.replace(patterns[ATTRIBUTES], 'REPLACED_ATTRIBUTE');
        }
        for (var re in shorthand) {
            if (shorthand.hasOwnProperty(re)) {
                selector = selector.replace(Y.DOM._getRegExp(re, 'gi'), shorthand[re]);
            }
        }

        if (attrs) {
            for (var i = 0, len = attrs[LENGTH]; i < len; ++i) {
                selector = selector.replace('REPLACED_ATTRIBUTE', attrs[i]);
            }
        }
        return selector;
    }

};

if (Y.UA.ie && Y.UA.ie < 8) { // rewrite class for IE (others use getAttribute('class')
    Selector.attrAliases['class'] = 'className';
    Selector.attrAliases['for'] = 'htmlFor';
}

Y.Selector = Selector;
Y.Selector.patterns = patterns;




}, '@VERSION@' ,{skinnable:false, requires:['dom-base']});

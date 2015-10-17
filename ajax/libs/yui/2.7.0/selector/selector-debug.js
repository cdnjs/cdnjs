/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0r2
*/
/**
 * The selector module provides helper methods allowing CSS3 Selectors to be used with DOM elements.
 * @module selector
 * @title Selector Utility
 * @namespace YAHOO.util
 * @requires yahoo, dom
 */

(function() {
var Y = YAHOO.util;

/**
 * Provides helper methods for collecting and filtering DOM elements.
 * @namespace YAHOO.util
 * @class Selector
 * @static
 */

Y.Selector = {
    _foundCache: [],
    _regexCache: {},

    _re: {
        nth: /^(?:([-]?\d*)(n){1}|(odd|even)$)*([-+]?\d*)$/,
        attr: /(\[.*\])/g,
        urls: /^(?:href|src)/
    },

    /**
     * Default document for use queries 
     * @property document
     * @type object
     * @default window.document
     */
    document: window.document,
    /**
     * Mapping of attributes to aliases, normally to work around HTMLAttributes
     * that conflict with JS reserved words.
     * @property attrAliases
     * @type object
     */
    attrAliases: {
    },

    /**
     * Mapping of shorthand tokens to corresponding attribute selector 
     * @property shorthand
     * @type object
     */
    shorthand: {
        //'(?:(?:[^\\)\\]\\s*>+~,]+)(?:-?[_a-z]+[-\\w]))+#(-?[_a-z]+[-\\w]*)': '[id=$1]',
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
        '|=': function(attr, val) { return attr === val || attr.slice(0, val.length + 1) === val + '-'; }, // Matches value followed by optional hyphen
        '^=': function(attr, val) { return attr.indexOf(val) === 0; }, // Match starts with value
        '$=': function(attr, val) { return attr.slice(-val.length) === val; }, // Match ends with value
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
            return Y.Selector._getNth(node, val);
        },

        'nth-last-child': function(node, val) {
            return Y.Selector._getNth(node, val, null, true);
        },

        'nth-of-type': function(node, val) {
            return Y.Selector._getNth(node, val, node.tagName);
        },
         
        'nth-last-of-type': function(node, val) {
            return Y.Selector._getNth(node, val, node.tagName, true);
        },
         
        'first-child': function(node) {
            return Y.Selector._getChildren(node.parentNode)[0] === node;
        },

        'last-child': function(node) {
            var children = Y.Selector._getChildren(node.parentNode);
            return children[children.length - 1] === node;
        },

        'first-of-type': function(node, val) {
            return Y.Selector._getChildren(node.parentNode, node.tagName)[0];
        },
         
        'last-of-type': function(node, val) {
            var children = Y.Selector._getChildren(node.parentNode, node.tagName);
            return children[children.length - 1];
        },
         
        'only-child': function(node) {
            var children = Y.Selector._getChildren(node.parentNode);
            return children.length === 1 && children[0] === node;
        },

        'only-of-type': function(node) {
            return Y.Selector._getChildren(node.parentNode, node.tagName).length === 1;
        },

        'empty': function(node) {
            return node.childNodes.length === 0;
        },

        'not': function(node, simple) {
            return !Y.Selector.test(node, simple);
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
        node = Y.Selector.document.getElementById(node) || node;

        if (!node) {
            return false;
        }

        var groups = selector ? selector.split(',') : [];
        if (groups.length) {
            for (var i = 0, len = groups.length; i < len; ++i) {
                if ( Y.Selector._test(node, groups[i]) ) { // passes if ANY group matches
                    return true;
                }
            }
            return false;
        }
        return Y.Selector._test(node, selector);
    },

    _test: function(node, selector, token, deDupe) {
        token = token || Y.Selector._tokenize(selector).pop() || {};

        if (!node.tagName ||
            (token.tag !== '*' && node.tagName !== token.tag) ||
            (deDupe && node._found) ) {
            return false;
        }

        if (token.attributes.length) {
            var val,
                ieFlag,
                re_urls = Y.Selector._re.urls;

            if (!node.attributes || !node.attributes.length) {
                return false;
            }
            for (var i = 0, attr; attr = token.attributes[i++];) {
                ieFlag = (re_urls.test(attr[0])) ? 2 : 0;
                val = node.getAttribute(attr[0], ieFlag);
                if (val === null || val === undefined) {
                    return false;
                }
                if ( Y.Selector.operators[attr[1]] &&
                        !Y.Selector.operators[attr[1]](val, attr[2])) {
                    return false;
                }
            }
        }

        if (token.pseudos.length) {
            for (var i = 0, len = token.pseudos.length; i < len; ++i) {
                if (Y.Selector.pseudos[token.pseudos[i][0]] &&
                        !Y.Selector.pseudos[token.pseudos[i][0]](node, token.pseudos[i][1])) {
                    return false;
                }
            }
        }

        return (token.previous && token.previous.combinator !== ',') ?
                Y.Selector._combinators[token.previous.combinator](node, token) :
                true;
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

        var node,
            result = [],
            tokens = Y.Selector._tokenize(selector);

        if (!nodes.item) { // if not HTMLCollection, handle arrays of ids and/or nodes
            YAHOO.log('filter: scanning input for HTMLElements/IDs', 'info', 'Selector');
            for (var i = 0, len = nodes.length; i < len; ++i) {
                if (!nodes[i].tagName) { // tagName limits to HTMLElements 
                    node = Y.Selector.document.getElementById(nodes[i]);
                    if (node) { // skip IDs that return null 
                        nodes[i] = node;
                    } else {
                        YAHOO.log('filter: skipping invalid node', 'warn', 'Selector');
                    }
                }
            }
        }
        result = Y.Selector._filter(nodes, Y.Selector._tokenize(selector)[0]);
        YAHOO.log('filter: returning:' + result.length, 'info', 'Selector');
        return result;
    },

    _filter: function(nodes, token, firstOnly, deDupe) {
        var result = firstOnly ? null : [],
            foundCache = Y.Selector._foundCache;

        for (var i = 0, len = nodes.length; i < len; i++) {
            if (! Y.Selector._test(nodes[i], '', token, deDupe)) {
                continue;
            }

            if (firstOnly) {
                return nodes[i];
            }
            if (deDupe) {
                if (nodes[i]._found) {
                    continue;
                }
                nodes[i]._found = true;
                foundCache[foundCache.length] = nodes[i];
            }

            result[result.length] = nodes[i];
        }

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
        var result = Y.Selector._query(selector, root, firstOnly);
        YAHOO.log('query: returning ' + result, 'info', 'Selector');
        return result;
    },


    _query: function(selector, root, firstOnly, deDupe) {
        var result =  (firstOnly) ? null : [],
            node;

        if (!selector) {
            return result;
        }

        var groups = selector.split(','); // TODO: handle comma in attribute/pseudo

        if (groups.length > 1) {
            var found;
            for (var i = 0, len = groups.length; i < len; ++i) {
                found = arguments.callee(groups[i], root, firstOnly, true);
                result = firstOnly ? found : result.concat(found); 
            }
            Y.Selector._clearFoundCache();
            return result;
        }

        if (root && !root.nodeName) { // assume ID
            root = Y.Selector.document.getElementById(root);
            if (!root) {
                YAHOO.log('invalid root node provided', 'warn', 'Selector');
                return result;
            }
        }

        root = root || Y.Selector.document;

        if (root.nodeName !== '#document') { // prepend with root selector
            Y.Dom.generateId(root); // TODO: cleanup after?
            selector = root.tagName + '#' + root.id + ' ' + selector;
            node = root;
            root = root.ownerDocument;
        }

        var tokens = Y.Selector._tokenize(selector);
        var idToken = tokens[Y.Selector._getIdTokenIndex(tokens)],
            nodes = [],
            id,
            token = tokens.pop() || {};
            
        if (idToken) {
            id = Y.Selector._getId(idToken.attributes);
        }

        // use id shortcut when possible
        if (id) {
            node = node || Y.Selector.document.getElementById(id);

            if (node && (root.nodeName === '#document' || Y.Dom.isAncestor(root, node))) {
                if ( Y.Selector._test(node, null, idToken) ) {
                    if (idToken === token) {
                        nodes = [node]; // simple selector
                    } else if (idToken.combinator === ' ' || idToken.combinator === '>') {
                        root = node; // start from here
                    }
                }
            } else {
                return result;
            }
        }

        if (root && !nodes.length) {
            nodes = root.getElementsByTagName(token.tag);
        }

        if (nodes.length) {
            result = Y.Selector._filter(nodes, token, firstOnly, deDupe); 
        }

        return result;
    },


    _clearFoundCache: function() {
        var foundCache = Y.Selector._foundCache;
        YAHOO.log('getBySelector: clearing found cache of ' + foundCache.length + ' elements');
        for (var i = 0, len = foundCache.length; i < len; ++i) {
            try { // IE no like delete
                delete foundCache[i]._found;
            } catch(e) {
                foundCache[i].removeAttribute('_found');
            }
        }
        foundCache = [];
        YAHOO.log('getBySelector: done clearing foundCache');
    },


    _getRegExp: function(str, flags) {
        var regexCache = Y.Selector._regexCache;
        flags = flags || '';
        if (!regexCache[str + flags]) {
            regexCache[str + flags] = new RegExp(str, flags);
        }
        return regexCache[str + flags];
    },

    _getChildren: function() {
        if (document.documentElement.children) { // document for capability test
            return function(node, tag) {
                return (tag) ? node.children.tags(tag) : node.children || [];
            };
        } else {
            return function(node, tag) {
                if (node._children) {
                    return node._children;
                }
                var children = [],
                    childNodes = node.childNodes;

                for (var i = 0, len = childNodes.length; i < len; ++i) {
                    if (childNodes[i].tagName) {
                        if (!tag || childNodes[i].tagName === tag) {
                            children[children.length] = childNodes[i];
                        }
                    }
                }
                node._children = children;
                return children;
            };
        }
    }(),

    _combinators: {
        ' ': function(node, token) {
            while ( (node = node.parentNode) ) {
                if (Y.Selector._test(node, '', token.previous)) {
                    return true;
                }
            }  
            return false;
        },

        '>': function(node, token) {
            return Y.Selector._test(node.parentNode, null, token.previous);
        },

        '+': function(node, token) {
            var sib = node.previousSibling;
            while (sib && sib.nodeType !== 1) {
                sib = sib.previousSibling;
            }

            if (sib && Y.Selector._test(sib, null, token.previous)) {
                return true; 
            }
            return false;
        },

        '~': function(node, token) {
            var sib = node.previousSibling;
            while (sib) {
                if (sib.nodeType === 1 && Y.Selector._test(sib, null, token.previous)) {
                    return true;
                }
                sib = sib.previousSibling;
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
    _getNth: function(node, expr, tag, reverse) {
        Y.Selector._re.nth.test(expr);
        var a = parseInt(RegExp.$1, 10), // include every _a_ elements (zero means no repeat, just first _a_)
            n = RegExp.$2, // "n"
            oddeven = RegExp.$3, // "odd" or "even"
            b = parseInt(RegExp.$4, 10) || 0, // start scan from element _b_
            result = [],
            op;

        var siblings = Y.Selector._getChildren(node.parentNode, tag);

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
                b = siblings.length - b + 1; 
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
            for (var i = b - 1, len = siblings.length; i < len; i += a) {
                if ( i >= 0 && siblings[i] === node ) {
                    return true;
                }
            }
        } else {
            for (var i = siblings.length - b, len = siblings.length; i >= 0; i -= a) {
                if ( i < len && siblings[i] === node ) {
                    return true;
                }
            }
        }
        return false;
    },

    _getId: function(attr) {
        for (var i = 0, len = attr.length; i < len; ++i) {
            if (attr[i][0] == 'id' && attr[i][1] === '=') {
                return attr[i][2];
            }
        }
    },

    _getIdTokenIndex: function(tokens) {
        for (var i = 0, len = tokens.length; i < len; ++i) {
            if (Y.Selector._getId(tokens[i].attributes)) {
                return i;
            }
        }
        return -1;
    },

    _patterns: {
        tag: /^((?:-?[_a-z]+[\w-]*)|\*)/i,
        attributes: /^\[([a-z]+\w*)+([~\|\^\$\*!=]=?)?['"]?([^\]]*?)['"]?\]/i,
        pseudos: /^:([-\w]+)(?:\(['"]?(.+)['"]?\))*/i,
        combinator: /^\s*([>+~]|\s)\s*/
    },

    /**
        Break selector into token units per simple selector.
        Combinator is attached to left-hand selector.
     */
    _tokenize: function(selector) {
        var token = {},     // one token per simple selector (left selector holds combinator)
            tokens = [],    // array of tokens
            id,             // unique id for the simple selector (if found)
            found = false,  // whether or not any matches were found this pass
            patterns = Y.Selector._patterns,
            match;          // the regex match

        selector = Y.Selector._replaceShorthand(selector); // convert ID and CLASS shortcuts to attributes

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
                if (YAHOO.lang.hasOwnProperty(patterns, re)) {
                    if (re != 'tag' && re != 'combinator') { // only one allowed
                        token[re] = token[re] || [];
                    }
                    if ( (match = patterns[re].exec(selector)) ) { // note assignment
                        found = true;
                        if (re != 'tag' && re != 'combinator') { // only one allowed
                            // capture ID for fast path to element
                            if (re === 'attributes' && match[1] === 'id') {
                                token.id = match[3];
                            }

                            token[re].push(match.slice(1));
                        } else { // single selector (tag, combinator)
                            token[re] = match[1];
                        }
                        selector = selector.replace(match[0], ''); // strip current match from selector
                        if (re === 'combinator' || !selector.length) { // next token or done
                            token.attributes = Y.Selector._fixAttributes(token.attributes);
                            token.pseudos = token.pseudos || [];
                            token.tag = token.tag ? token.tag.toUpperCase() : '*';
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
        var aliases = Y.Selector.attrAliases;
        attr = attr || [];
        for (var i = 0, len = attr.length; i < len; ++i) {
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
        var shorthand = Y.Selector.shorthand;

        //var attrs = selector.match(Y.Selector._patterns.attributes); // pull attributes to avoid false pos on "." and "#"
        var attrs = selector.match(Y.Selector._re.attr); // pull attributes to avoid false pos on "." and "#"
        if (attrs) {
            selector = selector.replace(Y.Selector._re.attr, 'REPLACED_ATTRIBUTE');
        }
        for (var re in shorthand) {
            if (YAHOO.lang.hasOwnProperty(shorthand, re)) {
                selector = selector.replace(Y.Selector._getRegExp(re, 'gi'), shorthand[re]);
            }
        }

        if (attrs) {
            for (var i = 0, len = attrs.length; i < len; ++i) {
                selector = selector.replace('REPLACED_ATTRIBUTE', attrs[i]);
            }
        }
        return selector;
    }
};

if (YAHOO.env.ua.ie && YAHOO.env.ua.ie < 8) { // rewrite class for IE < 8
    Y.Selector.attrAliases['class'] = 'className';
    Y.Selector.attrAliases['for'] = 'htmlFor';
}

})();
YAHOO.register("selector", YAHOO.util.Selector, {version: "2.7.0r2", build: "1799"});

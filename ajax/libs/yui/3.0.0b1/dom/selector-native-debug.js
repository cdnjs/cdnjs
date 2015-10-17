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

var NativeSelector = {
    _reLead: /^\s*([>+~]|:self)/,
    _reUnSupported: /!./,

    _foundCache: [],

    _supportsNative: function() {
        // whitelist and feature detection to manage
        // future implementations manually
        return ( (Y.UA.ie >= 8 || Y.UA.webkit > 525) &&
            document.querySelectorAll);
    },

    _toArray: function(nodes) { // TODO: move to Y.Array
        var ret = nodes,
            i, len;

        if (!nodes.slice) {
            try {
                ret = Array.prototype.slice.call(nodes);
            } catch(e) { // IE: requires manual copy
                ret = [];
                for (i = 0, len = nodes.length; i < len; ++i) {
                    ret[i] = nodes[i];
                }
            }
        }
        return ret;
    },

    _clearFoundCache: function() {
        var foundCache = NativeSelector._foundCache,
            i, len;

        for (i = 0, len = foundCache.length; i < len; ++i) {
            try { // IE no like delete
                delete foundCache[i]._found;
            } catch(e) {
                foundCache[i].removeAttribute('_found');
            }
        }
        foundCache = [];
    },

    _sort: function(nodes) {
        if (nodes) {
            nodes = NativeSelector._toArray(nodes);
            if (nodes.sort) {
                nodes.sort(function(a, b) {
                    return Y.DOM.srcIndex(a) - Y.DOM.srcIndex(b);
                });
            }
        }

        return nodes;
    },

    _deDupe: function(nodes) {
        var ret = [],
            cache = NativeSelector._foundCache,
            i, node;

        for (i = 0, node; node = nodes[i++];) {
            if (!node._found) {
                ret[ret.length] = cache[cache.length] = node;
                node._found = true;
            }
        }
        NativeSelector._clearFoundCache();
        return ret;
    },

    // allows element scoped queries to begin with combinator
    // e.g. query('> p', document.body) === query('body > p')
    _prepQuery: function(root, selector) {
        var groups = selector.split(','),
            queries = [],
            isDocRoot = (root && root.nodeType === 9),
            i, len;

        if (root) {
            if (!isDocRoot) {
                root.id = root.id || Y.guid();
                // break into separate queries for element scoping
                for (i = 0, len = groups.length; i < len; ++i) {
                    selector = '#' + root.id + ' ' + groups[i]; // prepend with root ID
                    queries.push({root: root.ownerDocument, selector: selector});
                }
            } else {
                queries.push({root: root, selector: selector});
            }
        }

        return queries;
    },

    _query: function(selector, root, firstOnly) {
        if (NativeSelector._reUnSupported.test(selector)) {
            return Y.Selector._brute.query(selector, root, firstOnly);
        }

        var ret = firstOnly ? null : [],
            queryName = firstOnly ? 'querySelector' : 'querySelectorAll',
            result,
            queries,
            i, query;

        root = root || Y.config.doc;

        if (selector) {
            queries = NativeSelector._prepQuery(root, selector);
            ret = [];

            for (i = 0, query; query = queries[i++];) {
                try {
                    result = query.root[queryName](query.selector);
                    if (queryName === 'querySelectorAll') { // convert NodeList to Array
                        result = NativeSelector._toArray(result);
                    }
                    ret = ret.concat(result);
                } catch(e) {
                    Y.log('native selector error: ' + e, 'error', 'Selector');
                }
            }

            if (queries.length > 1) { // remove dupes and sort by doc order 
                ret = NativeSelector._sort(NativeSelector._deDupe(ret));
            }
            ret = (!firstOnly) ? ret : ret[0] || null;
        }
        return ret;
    },

    _filter: function(nodes, selector) {
        var ret = [],
            i, node;

        if (nodes && selector) {
            for (i = 0, node; (node = nodes[i++]);) {
                if (Y.Selector._test(node, selector)) {
                    ret[ret.length] = node;
                }
            }
        } else {
            Y.log('invalid filter input (nodes: ' + nodes +
                    ', selector: ' + selector + ')', 'warn', 'Selector');
        }

        return ret;
    },

    _test: function(node, selector) {
        var ret = false,
            groups = selector.split(','),
            item,
            i, group;

        if (node && node.tagName) { // only test HTMLElements
            node.id = node.id || Y.guid();
            for (i = 0, group; group = groups[i++];) {
                group += '#' + node.id; // add ID for uniqueness
                item = Y.Selector.query(group, null, true);
                ret = (item === node);
                if (ret) {
                    break;
                }
            }
        }

        return ret;
    }
};

if (Y.UA.ie && Y.UA.ie <= 8) {
    NativeSelector._reUnSupported = /:(?:nth|not|root|only|checked|first|last|empty)/;
}



Y.mix(Y.Selector, NativeSelector, true);

// allow standalone selector-native module
if (NativeSelector._supportsNative()) {
    Y.Selector.query = NativeSelector._query;
    //Y.Selector.filter = NativeSelector._filter;
    //Y.Selector.test = NativeSelector._test;
}
Y.Selector.test = NativeSelector._test;
Y.Selector.filter = NativeSelector._filter;

})(Y);


}, '@VERSION@' ,{requires:['dom-base'], skinnable:false});

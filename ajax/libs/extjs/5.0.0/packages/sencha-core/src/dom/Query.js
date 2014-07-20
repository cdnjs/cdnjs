/**
 * @class Ext.dom.Query
 * @alternateClassName Ext.DomQuery
 * @alternateClassName Ext.core.DomQuery
 * @singleton
 *
 * Provides high performance selector/xpath processing by compiling queries into reusable functions. New pseudo classes
 * and matchers can be plugged. It works on HTML and XML documents (if a content node is passed in).
 *
 * DomQuery supports most of the [CSS3 selectors spec][1], along with some custom selectors and basic XPath.
 *
 * All selectors, attribute filters and pseudos below can be combined infinitely in any order. For example
 * `div.foo:nth-child(odd)[@foo=bar].bar:first` would be a perfectly valid selector. Node filters are processed
 * in the order in which they appear, which allows you to optimize your queries for your document structure.
 * 
 * ## Simple Selectors
 * 
 * For performance reasons, some query methods accept selectors that are termed as **simple selectors**. A simple
 * selector is a selector that does not include contextual information about any parent/sibling elements.
 * 
 * Some examples of valid simple selectors:
 * 
 *     var simple = '.foo'; // Only asking for the class name on the element
 *     var simple = 'div.bar'; // Only asking for the tag/class name on the element
 *     var simple = '[href];' // Asking for an attribute on the element.
 *     var simple = ':not(.foo)'; // Only asking for the non-matches against the class name
 *     var simple = 'span:first-child'; // Doesn't require any contextual information about the parent node
 * 
 * Simple examples of invalid simple selectors:
 * 
 *     var notSimple = 'div.foo div.bar'; // Requires matching a parent node by class name
 *     var notSimple = 'span + div'; //  Requires matching a sibling by tag name
 *
 * ## Element Selectors:
 *
 *   - **`*`** any element
 *   - **`E`** an element with the tag E
 *   - **`E F`** All descendent elements of E that have the tag F
 *   - **`E > F`** or **E/F** all direct children elements of E that have the tag F
 *   - **`E + F`** all elements with the tag F that are immediately preceded by an element with the tag E
 *   - **`E ~ F`** all elements with the tag F that are preceded by a sibling element with the tag E
 *
 * ## Attribute Selectors:
 *
 * The use of `@` and quotes are optional. For example, `div[@foo='bar']` is also a valid attribute selector.
 *
 *   - **`E[foo]`** has an attribute "foo"
 *   - **`E[foo=bar]`** has an attribute "foo" that equals "bar"
 *   - **`E[foo^=bar]`** has an attribute "foo" that starts with "bar"
 *   - **`E[foo$=bar]`** has an attribute "foo" that ends with "bar"
 *   - **`E[foo*=bar]`** has an attribute "foo" that contains the substring "bar"
 *   - **`E[foo%=2]`** has an attribute "foo" that is evenly divisible by 2
 *   - **`E[foo!=bar]`** attribute "foo" does not equal "bar"
 *
 * ## Pseudo Classes:
 *
 *   - **`E:first-child`** E is the first child of its parent
 *   - **`E:last-child`** E is the last child of its parent
 *   - **`E:nth-child(_n_)`** E is the _n_th child of its parent (1 based as per the spec)
 *   - **`E:nth-child(odd)`** E is an odd child of its parent
 *   - **`E:nth-child(even)`** E is an even child of its parent
 *   - **`E:only-child`** E is the only child of its parent
 *   - **`E:checked`** E is an element that is has a checked attribute that is true (e.g. a radio or checkbox)
 *   - **`E:first`** the first E in the resultset
 *   - **`E:last`** the last E in the resultset
 *   - **`E:nth(_n_)`** the _n_th E in the resultset (1 based)
 *   - **`E:odd`** shortcut for :nth-child(odd)
 *   - **`E:even`** shortcut for :nth-child(even)
 *   - **`E:contains(foo)`** E's innerHTML contains the substring "foo"
 *   - **`E:nodeValue(foo)`** E contains a textNode with a nodeValue that equals "foo"
 *   - **`E:not(S)`** an E element that does not match simple selector S
 *   - **`E:has(S)`** an E element that has a descendent that matches simple selector S
 *   - **`E:next(S)`** an E element whose next sibling matches simple selector S
 *   - **`E:prev(S)`** an E element whose previous sibling matches simple selector S
 *   - **`E:any(S1|S2|S2)`** an E element which matches any of the simple selectors S1, S2 or S3
 *   - **`E:visible(true)`** an E element which is deeply visible according to {@link Ext.dom.Element#isVisible}
 *
 * ## CSS Value Selectors:
 *
 *   - **`E{display=none}`** css value "display" that equals "none"
 *   - **`E{display^=none}`** css value "display" that starts with "none"
 *   - **`E{display$=none}`** css value "display" that ends with "none"
 *   - **`E{display*=none}`** css value "display" that contains the substring "none"
 *   - **`E{display%=2}`** css value "display" that is evenly divisible by 2
 *   - **`E{display!=none}`** css value "display" that does not equal "none"
 * 
 * ## XML Namespaces:
 *   - **`ns|E`** an element with tag E and namespace prefix ns
 *
 * [1]: http://www.w3.org/TR/2005/WD-css3-selectors-20051215/#selectors
 */
Ext.define('Ext.dom.Query', function() {
    var DQ,
        doc = document,
        cache, simpleCache, valueCache,
        useClassList = !!doc.documentElement.classList,
        useElementPointer = !!doc.documentElement.firstElementChild,
        useChildrenCollection = (function() {
            var d = doc.createElement('div');
            d.innerHTML = '<!-- -->text<!-- -->';
            return d.children && (d.children.length === 0);
        })(),
        nonSpace = /\S/,
        trimRe = /^\s+|\s+$/g,
        tplRe = /\{(\d+)\}/g,
        modeRe = /^(\s?[\/>+~]\s?|\s|$)/,
        tagTokenRe = /^(#)?([\w\-\*\|\\]+)/,
        nthRe = /(\d*)n\+?(\d*)/,
        nthRe2 = /\D/,
        startIdRe = /^\s*#/,
        // This is for IE MSXML which does not support expandos.
        // IE runs the same speed using setAttribute, however FF slows way down
        // and Safari completely fails so they need to continue to use expandos.
        isIE = window.ActiveXObject ? true : false,
        key = 30803,
        longHex = /\\([0-9a-fA-F]{6})/g,
        shortHex = /\\([0-9a-fA-F]{1,6})\s{0,1}/g,
        nonHex = /\\([^0-9a-fA-F]{1})/g,
        escapes = /\\/g,
        num, hasEscapes,
        // True if the browser supports the following syntax:
        // document.getElementsByTagName('namespacePrefix:tagName')
        supportsColonNsSeparator = (function () {
            var xmlDoc,
                xmlString = '<r><a:b xmlns:a="n"></a:b></r>';

            if (window.DOMParser) {
                xmlDoc = (new DOMParser()).parseFromString(xmlString, "application/xml");
            } else {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.loadXML(xmlString);
            }

            return !!xmlDoc.getElementsByTagName('a:b').length;
        })(),

        // replaces a long hex regex match group with the appropriate ascii value
        // $args indicate regex match pos
        longHexToChar = function($0, $1) {
            return String.fromCharCode(parseInt($1, 16));
        },

        // converts a shortHex regex match to the long form
        shortToLongHex = function($0, $1) {
            while ($1.length < 6) {
                $1 = '0' + $1;
            }
            return '\\' + $1;
        },

        // converts a single char escape to long escape form
        charToLongHex = function($0, $1) {
            num = $1.charCodeAt(0).toString(16);
            if (num.length === 1) {
                num = '0' + num;
            }
            return '\\0000' + num;
        },

        // Un-escapes an input selector string.  Assumes all escape sequences have been
        // normalized to the css '\\0000##' 6-hex-digit style escape sequence :
        // will not handle any other escape formats
        unescapeCssSelector = function(selector) {
            return (hasEscapes) ? selector.replace(longHex, longHexToChar) : selector;
        },

        // checks if the path has escaping & does any appropriate replacements
        setupEscapes = function(path) {
            hasEscapes = (path.indexOf('\\') > -1);
            if (hasEscapes) {
                path = path
                    .replace(shortHex, shortToLongHex)
                    .replace(nonHex, charToLongHex)
                    .replace(escapes, '\\\\');  // double the '\' for js compilation
            }
            return path;
        };

    // this eval is stop the compressor from
    // renaming the variable to something shorter
    eval("var batch = 30803, child, next, prev, byClassName;");

    // Retrieve the child node from a particular
    // parent at the specified index.
    child = useChildrenCollection ?
        function child(parent, index) {
            return parent.children[index];
        } :
        function child(parent, index) {
            var i = 0,
                n = parent.firstChild;
            while (n) {
                if (n.nodeType == 1) {
                    if (++i == index) {
                        return n;
                    }
                }
                n = n.nextSibling;
            }
            return null;
        };

    // retrieve the next element node
    next = useElementPointer ?
        function(n) {
            return n.nextElementSibling;
        } :
        function(n) {
            while ((n = n.nextSibling) && n.nodeType != 1);
            return n;
        };

    // retrieve the previous element node
    prev = useElementPointer ?
        function(n) {
            return n.previousElementSibling;
        } :
        function(n) {
            while ((n = n.previousSibling) && n.nodeType != 1);
            return n;
        };

    // Mark each child node with a nodeIndex skipping and
    // removing empty text nodes.
    function children(parent) {
        var n = parent.firstChild,
            nodeIndex = -1,
            nextNode;

        while (n) {
            nextNode = n.nextSibling;
            // clean worthless empty nodes.
            if (n.nodeType == 3 && !nonSpace.test(n.nodeValue)) {
                parent.removeChild(n);
            } else {
                // add an expando nodeIndex
                n.nodeIndex = ++nodeIndex;
            }
            n = nextNode;
        }
        return this;
    }

    // nodeSet - array of nodes
    // cls - CSS Class
    byClassName = useClassList ? // Use classList API where available: http://jsperf.com/classlist-vs-old-school-check/
        function (nodeSet, cls) {
            cls = unescapeCssSelector(cls);
            if (!cls) {
                return nodeSet;
            }
            var result = [], ri = -1,
                i, ci, classList;

            for (i = 0; ci = nodeSet[i]; i++) {
                classList = ci.classList;
                if (classList) {
                    if (classList.contains(cls)) {
                        result[++ri] = ci;
                    }
                } else if ((' ' + ci.className + ' ').indexOf(cls) !== -1) {
                    // Some elements types (SVG) may not always have a classList
                    // in some browsers, so fallback to the old style here
                    result[++ri] = ci;
                }
            }
            return result;
        } :
        function (nodeSet, cls) {
            cls = unescapeCssSelector(cls);
            if (!cls) {
                return nodeSet;
            }
            var result = [], ri = -1,
                i, ci;

            for (i = 0; ci = nodeSet[i]; i++) {
                if ((' ' + ci.className + ' ').indexOf(cls) !== -1) {
                    result[++ri] = ci;
                }
            }
            return result;
        };

    function attrValue(n, attr) {
        // if its an array, use the first node.
        if (!n.tagName && typeof n.length != "undefined") {
            n = n[0];
        }
        if (!n) {
            return null;
        }

        if (attr == "for") {
            return n.htmlFor;
        }
        if (attr == "class" || attr == "className") {
            return n.className;
        }
        return n.getAttribute(attr) || n[attr];

    }

    // ns - nodes
    // mode - false, /, >, +, ~
    // tagName - defaults to "*"
    function getNodes(ns, mode, tagName) {
        var result = [], ri = -1, cs,
            i, ni, j, ci, cn, utag, n, cj;
        if (!ns) {
            return result;
        }
        tagName = tagName.replace('|', ':') || "*";
        // convert to array
        if (typeof ns.getElementsByTagName != "undefined") {
            ns = [ns];
        }

        // no mode specified, grab all elements by tagName
        // at any depth
        if (!mode) {
            tagName = unescapeCssSelector(tagName);
            if (!supportsColonNsSeparator && DQ.isXml(ns[0]) &&
                tagName.indexOf(':') !== -1) {
                // Some browsers (e.g. WebKit and Opera do not support the following syntax
                // in xml documents: getElementsByTagName('ns:tagName'). To work around
                // this, we remove the namespace prefix from the tagName, get the elements
                // by tag name only, and then compare each element's tagName property to
                // the tagName with namespace prefix attached to ensure that the tag is in
                // the proper namespace.
                for (i = 0; ni = ns[i]; i++) {
                    cs = ni.getElementsByTagName(tagName.split(':').pop());
                    for (j = 0; ci = cs[j]; j++) {
                        if (ci.tagName === tagName) {
                            result[++ri] = ci;
                        }
                    }
                }
            } else {
                for (i = 0; ni = ns[i]; i++) {
                    cs = ni.getElementsByTagName(tagName);
                    for (j = 0; ci = cs[j]; j++) {
                        result[++ri] = ci;
                    }
                }
            }
            // Direct Child mode (/ or >)
            // E > F or E/F all direct children elements of E that have the tag
        } else if (mode == "/" || mode == ">") {
            utag = tagName.toUpperCase();
            for (i = 0; ni = ns[i]; i++) {
                cn = ni.childNodes;
                for (j = 0; cj = cn[j]; j++) {
                    if (cj.nodeName == utag || cj.nodeName == tagName || tagName == '*') {
                        result[++ri] = cj;
                    }
                }
            }
            // Immediately Preceding mode (+)
            // E + F all elements with the tag F that are immediately preceded by an element with the tag E
        } else if (mode == "+") {
            utag = tagName.toUpperCase();
            for (i = 0; n = ns[i]; i++) {
                while ((n = n.nextSibling) && n.nodeType != 1);
                if (n && (n.nodeName == utag || n.nodeName == tagName || tagName == '*')) {
                    result[++ri] = n;
                }
            }
            // Sibling mode (~)
            // E ~ F all elements with the tag F that are preceded by a sibling element with the tag E
        } else if (mode == "~") {
            utag = tagName.toUpperCase();
            for (i = 0; n = ns[i]; i++) {
                while ((n = n.nextSibling)) {
                    if (n.nodeName == utag || n.nodeName == tagName || tagName == '*') {
                        result[++ri] = n;
                    }
                }
            }
        }
        return result;
    }

    function concat(a, b) {
        a.push.apply(a, b);
        return a;
    }

    function byTag(cs, tagName) {
        if (cs.tagName || cs === doc) {
            cs = [cs];
        }
        if (!tagName) {
            return cs;
        }
        var result = [], ri = -1,
            i, ci;
        tagName = tagName.toLowerCase();
        for (i = 0; ci = cs[i]; i++) {
            if (ci.nodeType == 1 && ci.tagName.toLowerCase() == tagName) {
                result[++ri] = ci;
            }
        }
        return result;
    }

    function byId(cs, id) {
        id = unescapeCssSelector(id);
        if (cs.tagName || cs === doc) {
            cs = [cs];
        }
        if (!id) {
            return cs;
        }
        var result = [], ri = -1,
            i, ci;
        for (i = 0; ci = cs[i]; i++) {
            if (ci && ci.id == id) {
                result[++ri] = ci;
                return result;
            }
        }
        return result;
    }

    // operators are =, !=, ^=, $=, *=, %=, |= and ~=
    // custom can be "{"
    function byAttribute(cs, attr, value, op, custom) {
        var result = [],
            ri = -1,
            useGetStyle = custom == "{",
            fn = DQ.operators[op],
            a,
            xml,
            hasXml,
            i, ci;

        value = unescapeCssSelector(value);

        for (i = 0; ci = cs[i]; i++) {
            // skip non-element nodes.
            if (ci.nodeType === 1) {
                // only need to do this for the first node
                if (!hasXml) {
                    xml = DQ.isXml(ci);
                    hasXml = true;
                }

                // we only need to change the property names if we're dealing with html nodes, not XML
                if (!xml) {
                    if (useGetStyle) {
                        a = DQ.getStyle(ci, attr);
                    } else if (attr == "class" || attr == "className") {
                        a = ci.className;
                    } else if (attr == "for") {
                        a = ci.htmlFor;
                    } else if (attr == "href") {
                        // getAttribute href bug
                        // http://www.glennjones.net/Post/809/getAttributehrefbug.htm
                        a = ci.getAttribute("href", 2);
                    } else {
                        a = ci.getAttribute(attr);
                    }
                } else {
                    a = ci.getAttribute(attr);
                }
                if ((fn && fn(a, value)) || (!fn && a)) {
                    result[++ri] = ci;
                }
            }
        }
        return result;
    }

    function byPseudo(cs, name, value) {
        value = unescapeCssSelector(value);
        return DQ.pseudos[name](cs, value);
    }

    function nodupIEXml(cs) {
        var d = ++key,
            r,
            i, len, c;
        cs[0].setAttribute("_nodup", d);
        r = [cs[0]];
        for (i = 1, len = cs.length; i < len; i++) {
            c = cs[i];
            if (!c.getAttribute("_nodup") != d) {
                c.setAttribute("_nodup", d);
                r[r.length] = c;
            }
        }
        for (i = 0, len = cs.length; i < len; i++) {
            cs[i].removeAttribute("_nodup");
        }
        return r;
    }

    function nodup(cs) {
        if (!cs) {
            return [];
        }
        var len = cs.length, c, i, r = cs, cj, ri = -1, d, j;
        if (!len || typeof cs.nodeType != "undefined" || len == 1) {
            return cs;
        }
        if (isIE && typeof cs[0].selectSingleNode != "undefined") {
            return nodupIEXml(cs);
        }
        d = ++key;
        cs[0]._nodup = d;
        for (i = 1; c = cs[i]; i++) {
            if (c._nodup != d) {
                c._nodup = d;
            } else {
                r = [];
                for (j = 0; j < i; j++) {
                    r[++ri] = cs[j];
                }
                for (j = i + 1; cj = cs[j]; j++) {
                    if (cj._nodup != d) {
                        cj._nodup = d;
                        r[++ri] = cj;
                    }
                }
                return r;
            }
        }
        return r;
    }

    function quickDiffIEXml(c1, c2) {
        var d = ++key,
            r = [],
            i, len;
        for (i = 0, len = c1.length; i < len; i++) {
            c1[i].setAttribute("_qdiff", d);
        }
        for (i = 0, len = c2.length; i < len; i++) {
            if (c2[i].getAttribute("_qdiff") != d) {
                r[r.length] = c2[i];
            }
        }
        for (i = 0, len = c1.length; i < len; i++) {
            c1[i].removeAttribute("_qdiff");
        }
        return r;
    }

    function quickDiff(c1, c2) {
        var len1 = c1.length,
            d = ++key,
            r = [],
            i, len;
        if (!len1) {
            return c2;
        }
        if (isIE && typeof c1[0].selectSingleNode != "undefined") {
            return quickDiffIEXml(c1, c2);
        }
        for (i = 0; i < len1; i++) {
            c1[i]._qdiff = d;
        }
        for (i = 0, len = c2.length; i < len; i++) {
            if (c2[i]._qdiff != d) {
                r[r.length] = c2[i];
            }
        }
        return r;
    }

    function quickId(ns, mode, root, id) {
        if (ns == root) {
            id = unescapeCssSelector(id);
            var d = root.ownerDocument || root;
            return d.getElementById(id);
        }
        ns = getNodes(ns, mode, "*");
        return byId(ns, id);
    }

    return {
        singleton: true,

        alternateClassName: [
            'Ext.core.DomQuery',
            'Ext.DomQuery'
        ],

        requires: [
            'Ext.dom.Helper',
            'Ext.util.Operators'
        ],

        _init: function() {
            DQ = this;
            DQ.operators = Ext.Object.chain(Ext.util.Operators);  // can capture now
            DQ._cache = cache = new Ext.util.LruCache({
                maxSize: 200
            });
            DQ._valueCache = valueCache = new Ext.util.LruCache({
                maxSize: 200
            });
            DQ._simpleCache = simpleCache = new Ext.util.LruCache({
                maxSize: 200
            });
        },

        clearCache: function () {
            cache.clear();
            valueCache.clear();
            simpleCache.clear();
        },

        getStyle: function(el, name) {
            return Ext.fly(el, '_DomQuery').getStyle(name);
        },

        /**
         * Compiles a selector/xpath query into a reusable function. The returned function
         * takes one parameter "root" (optional), which is the context node from where the query should start.
         * @param {String} selector The selector/xpath query
         * @param {String} [type="select"] Either "select" or "simple" for a simple selector match
         * @return {Function}
         */
        compile: function(path, type) {
            type = type || "select";

            // setup fn preamble
            var fn = ["var f = function(root) {\n var mode; ++batch; var n = root || document;\n"],
                lastPath,
                matchers = DQ.matchers,
                matchersLn = matchers.length,
                modeMatch,
                // accept leading mode switch
                lmode = path.match(modeRe),
                tokenMatch, matched, j, t, m;

            path = setupEscapes(path);

            if (lmode && lmode[1]) {
                fn[fn.length] = 'mode="' + lmode[1].replace(trimRe, "") + '";';
                path = path.replace(lmode[1], "");
            }

            // strip leading slashes
            while (path.substr(0, 1) == "/") {
                path = path.substr(1);
            }

            while (path && lastPath != path) {
                lastPath = path;
                tokenMatch = path.match(tagTokenRe);
                if (type == "select") {
                    if (tokenMatch) {
                        // ID Selector
                        if (tokenMatch[1] == "#") {
                            fn[fn.length] = 'n = quickId(n, mode, root, "' + tokenMatch[2] + '");';
                        } else {
                            fn[fn.length] = 'n = getNodes(n, mode, "' + tokenMatch[2] + '");';
                        }
                        path = path.replace(tokenMatch[0], "");
                    } else if (path.substr(0, 1) != '@') {
                        fn[fn.length] = 'n = getNodes(n, mode, "*");';
                    }
                    // type of "simple"
                } else {
                    if (tokenMatch) {
                        if (tokenMatch[1] == "#") {
                            fn[fn.length] = 'n = byId(n, "' + tokenMatch[2] + '");';
                        } else {
                            fn[fn.length] = 'n = byTag(n, "' + tokenMatch[2] + '");';
                        }
                        path = path.replace(tokenMatch[0], "");
                    }
                }
                while (!(modeMatch = path.match(modeRe))) {
                    matched = false;
                    for (j = 0; j < matchersLn; j++) {
                        t = matchers[j];
                        m = path.match(t.re);
                        if (m) {
                            fn[fn.length] = t.select.replace(tplRe, function(x, i) {
                                return m[i];
                            });
                            path = path.replace(m[0], "");
                            matched = true;
                            break;
                        }
                    }
                    // prevent infinite loop on bad selector
                    if (!matched) {
                        Ext.Error.raise({
                            sourceClass:'Ext.DomQuery',
                            sourceMethod:'compile',
                            msg:'Error parsing selector. Parsing failed at "' + path + '"'
                        });
                    }
                }
                if (modeMatch[1]) {
                    fn[fn.length] = 'mode="' + modeMatch[1].replace(trimRe, "") + '";';
                    path = path.replace(modeMatch[1], "");
                }
            }
            // close fn out
            fn[fn.length] = "return nodup(n);\n}";

            // eval fn and return it
            eval(fn.join(""));
            return f;
        },

        /**
         * Selects an array of DOM nodes using JavaScript-only implementation.
         *
         * Use {@link #select} to take advantage of browsers built-in support for CSS selectors.
         * @param {String} selector The selector/xpath query (can be a comma separated list of selectors)
         * @param {HTMLElement/String} [root=document] The start of the query.
         * @return {HTMLElement[]} An Array of DOM elements which match the selector. If there are
         * no matches, and empty Array is returned.
         */
        jsSelect: function(path, root, type) {
            // set root to doc if not specified.
            root = root || doc;

            if (typeof root == "string") {
                root = doc.getElementById(root);
            }
            var paths = Ext.splitAndUnescape(path, ","),
                results = [],
                query, i, len, subPath, result;

            // loop over each selector
            for (i = 0, len = paths.length; i < len; i++) {
                subPath = paths[i].replace(trimRe, "");
                // compile and place in cache
                query = cache.get(subPath);
                if (!query) {
                    // When we compile, escaping is handled inside the compile method
                    query = DQ.compile(subPath, type);
                    if (!query) {
                        Ext.Error.raise({
                            sourceClass:'Ext.DomQuery',
                            sourceMethod:'jsSelect',
                            msg:subPath + ' is not a valid selector'
                        });
                    }
                    cache.add(subPath, query);
                } else {
                    // If we've already compiled, we still need to check if the
                    // selector has escaping and setup the appropriate flags
                    setupEscapes(subPath);
                }
                result = query(root);
                if (result && result !== doc) {
                    results = results.concat(result);
                }
            }

            // if there were multiple selectors, make sure dups
            // are eliminated
            if (paths.length > 1) {
                return nodup(results);
            }
            return results;
        },

        isXml: function(el) {
            var docEl = (el ? el.ownerDocument || el : 0).documentElement;
            return docEl ? docEl.nodeName !== "HTML" : false;
        },

        /**
         * Selects an array of DOM nodes by CSS/XPath selector.
         *
         * Uses [document.querySelectorAll][0] if browser supports that, otherwise falls back to
         * {@link Ext.dom.Query#jsSelect} to do the work.
         *
         * Aliased as {@link Ext#query}.
         *
         * [0]: https://developer.mozilla.org/en/DOM/document.querySelectorAll
         *
         * @param {String} path The selector/xpath query
         * @param {HTMLElement} [root=document] The start of the query.
         * @return {HTMLElement[]} An array of DOM elements (not a NodeList as returned by `querySelectorAll`).
         * @param {String} [type="select"] Either "select" or "simple" for a simple selector match (only valid when
         * used when the call is deferred to the jsSelect method)
         * @param {Boolean} [single] Pass `true` to select only the first matching node using `document.querySelector` (where available)
         * @method
         */
        select: doc.querySelectorAll ? function(path, root, type, single) {
            root = root || doc;
            if (!DQ.isXml(root)) {
                try {
                    /*
                     * This checking here is to "fix" the behaviour of querySelectorAll
                     * for non root document queries. The way qsa works is intentional,
                     * however it's definitely not the expected way it should work.
                     * When descendant selectors are used, only the lowest selector must be inside the root!
                     * More info: http://ejohn.org/blog/thoughts-on-queryselectorall/
                     * So we create a descendant selector by prepending the root's ID, and query the parent node.
                     * UNLESS the root has no parent in which qsa will work perfectly.
                     *
                     * We only modify the path for single selectors (ie, no multiples),
                     * without a full parser it makes it difficult to do this correctly.
                     */
                    if (root.parentNode && (root.nodeType !== 9) && path.indexOf(',') === -1 && !startIdRe.test(path)) {
                        path = Ext.makeIdSelector(Ext.id(root)) + ' ' + path;
                        root = root.parentNode;
                    }
                    return single ? [ root.querySelector(path) ]
                        : Ext.Array.toArray(root.querySelectorAll(path));
                }
                catch (e) {
                }
            }
            return DQ.jsSelect.call(this, path, root, type);
        } : function(path, root, type) {
            return DQ.jsSelect.call(this, path, root, type);
        },

        /**
         * Selects a single element.
         * @param {String} selector The selector/xpath query
         * @param {HTMLElement} [root=document] The start of the query.
         * @return {HTMLElement} The DOM element which matched the selector.
         */
        selectNode: function(path, root){
            return Ext.DomQuery.select(path, root, null, true)[0];
        },

        /**
         * Selects the value of a node, optionally replacing null with the defaultValue.
         * @param {String} selector The selector/xpath query
         * @param {HTMLElement} [root=document] The start of the query.
         * @param {String} [defaultValue] When specified, this is return as empty value.
         * @return {String}
         */
        selectValue: function(path, root, defaultValue) {
            path = path.replace(trimRe, "");
            var query = valueCache.get(path),
                n, v;

            if (!query) {
                query = DQ.compile(path, "select");
                valueCache.add(path, query);
            } else {
                setupEscapes(path);
            }

            n = query(root);
            return DQ.getNodeValue(n[0] ? n[0] : n);
        },

        /**
         * Get the text value for a node, optionally replacing null with the defaultValue.
         * @param {Object} The node
         * @param {String} [defaultValue] When specified, this is return as empty value.
         * @return {String} The value
         */
        getNodeValue: function(node, defaultValue) {
            // overcome a limitation of maximum textnode size
            // Rumored to potentially crash IE6 but has not been confirmed.
            // http://reference.sitepoint.com/javascript/Node/normalize
            // https://developer.mozilla.org/En/DOM/Node.normalize
            if (typeof node.normalize == 'function') {
                node.normalize();
            }

            var v = (node && node.firstChild ? node.firstChild.nodeValue : null);
            return ((v === null || v === undefined || v === '') ? defaultValue : v);
        },

        /**
         * Selects the value of a node, parsing integers and floats.
         * Returns the defaultValue, or 0 if none is specified.
         * @param {String} selector The selector/xpath query
         * @param {HTMLElement} [root=document] The start of the query.
         * @param {Number} [defaultValue] When specified, this is return as empty value.
         * @return {Number}
         */
        selectNumber: function(path, root, defaultValue) {
            var v = DQ.selectValue(path, root, defaultValue || 0);
            return parseFloat(v);
        },

        /**
         * Returns true if the passed element(s) match the passed simple selector
         * @param {String/HTMLElement/HTMLElement[]} el An element id, element or array of elements
         * @param {String} selector The simple selector to test
         * @return {Boolean}
         */
        is: function(el, ss) {
            if (typeof el == "string") {
                el = doc.getElementById(el);
            }
            var isArray = Ext.isArray(el),
                result = DQ.filter(isArray ? el : [el], ss);
            return isArray ? (result.length == el.length) : (result.length > 0);
        },

        /**
         * Filters an array of elements to only include matches of a simple selector
         * @param {HTMLElement[]} el An array of elements to filter
         * @param {String} selector The simple selector to test
         * @param {Boolean} nonMatches If true, it returns the elements that DON'T match the selector instead of the
         * ones that match
         * @return {HTMLElement[]} An Array of DOM elements which match the selector. If there are no matches, and empty
         * Array is returned.
         */
        filter: function(els, ss, nonMatches) {
            ss = ss.replace(trimRe, "");
            var query = simpleCache.get(ss),
                result;

            if (!query) {
                query = DQ.compile(ss, "simple");
                simpleCache.add(ss, query);
            } else {
                setupEscapes(ss);
            }

            result = query(els);
            return nonMatches ? quickDiff(result, els) : result;
        },

        /**
         * Collection of matching regular expressions and code snippets.
         * Each capture group within `()` will be replace the `{}` in the select
         * statement as specified by their index.
         */
        matchers: [{
            re: /^\.([\w\-\\]+)/,
            select: useClassList ? 'n = byClassName(n, "{1}");' : 'n = byClassName(n, " {1} ");'
        }, {
            re: /^\:([\w\-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
            select: 'n = byPseudo(n, "{1}", "{2}");'
        },  {
            re: /^(?:([\[\{])(?:@)?([\w\-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
            select: 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
        }, {
            re: /^#([\w\-\\]+)/,
            select: 'n = byId(n, "{1}");'
        }, {
            re: /^@([\w\-\.]+)/,
            select: 'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'
        }],

        /**
         * Collection of operator comparison functions.
         * The default operators are `=`, `!=`, `^=`, `$=`, `*=`, `%=`, `|=` and `~=`.
         *
         * New operators can be added as long as the match the format *c*`=` where *c*
         * is any character other than space, `>`, or `<`.
         *
         * Operator functions are passed the following parameters:
         *
         * * `propValue` : The property value to test.
         * * `compareTo` : The value to compare to.
         *
         * @property {Object} operators
         */

        /**
         * Object hash of "pseudo class" filter functions which are used when filtering selections.
         * Each function is passed two parameters:
         *
         * - **c** : Array
         *     An Array of DOM elements to filter.
         *
         * - **v** : String
         *     The argument (if any) supplied in the selector.
         *
         * A filter function returns an Array of DOM elements which conform to the pseudo class.
         * In addition to the provided pseudo classes listed above such as `first-child` and `nth-child`,
         * developers may add additional, custom psuedo class filters to select elements according to application-specific requirements.
         *
         * For example, to filter `a` elements to only return links to __external__ resources:
         *
         *     Ext.DomQuery.pseudos.external = function(c, v) {
         *         var r = [], ri = -1;
         *         for(var i = 0, ci; ci = c[i]; i++) {
         *             // Include in result set only if it's a link to an external resource
         *             if (ci.hostname != location.hostname) {
         *                 r[++ri] = ci;
         *             }
         *         }
         *         return r;
         *     };
         *
         * Then external links could be gathered with the following statement:
         *
         *     var externalLinks = Ext.select("a:external");
         */
        pseudos: {
            "first-child": function(c) {
                var r = [], ri = -1, n,
                    i, ci;
                for (i = 0; (ci = n = c[i]); i++) {
                    while ((n = n.previousSibling) && n.nodeType != 1);
                    if (!n) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "last-child": function(c) {
                var r = [], ri = -1, n,
                    i, ci;
                for (i = 0; (ci = n = c[i]); i++) {
                    while ((n = n.nextSibling) && n.nodeType != 1);
                    if (!n) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "nth-child": function(c, a) {
                var r = [], ri = -1,
                    m = nthRe.exec(a == "even" && "2n" || a == "odd" && "2n+1" || !nthRe2.test(a) && "n+" + a || a),
                    f = (m[1] || 1) - 0, l = m[2] - 0,
                    i, n, j, cn, pn;
                for (i = 0; n = c[i]; i++) {
                    pn = n.parentNode;
                    if (batch != pn._batch) {
                        j = 0;
                        for (cn = pn.firstChild; cn; cn = cn.nextSibling) {
                            if (cn.nodeType == 1) {
                                cn.nodeIndex = ++j;
                            }
                        }
                        pn._batch = batch;
                    }
                    if (f == 1) {
                        if (l === 0 || n.nodeIndex == l) {
                            r[++ri] = n;
                        }
                    } else if ((n.nodeIndex + l) % f === 0) {
                        r[++ri] = n;
                    }
                }

                return r;
            },

            "only-child": function(c) {
                var r = [], ri = -1,
                    i, ci;
                for (i = 0; ci = c[i]; i++) {
                    if (!prev(ci) && !next(ci)) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "empty": function(c) {
                var r = [], ri = -1,
                    i, ci, cns, j, cn, empty;
                for (i = 0; ci = c[i]; i++) {
                    cns = ci.childNodes;
                    j = 0;
                    empty = true;
                    while (cn = cns[j]) {
                        ++j;
                        if (cn.nodeType == 1 || cn.nodeType == 3) {
                            empty = false;
                            break;
                        }
                    }
                    if (empty) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "contains": function(c, v) {
                var r = [], ri = -1,
                    i, ci;
                for (i = 0; ci = c[i]; i++) {
                    if ((ci.textContent || ci.innerText || ci.text || '').indexOf(v) != -1) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "nodeValue": function(c, v) {
                var r = [], ri = -1,
                    i, ci;
                for (i = 0; ci = c[i]; i++) {
                    if (ci.firstChild && ci.firstChild.nodeValue == v) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "checked": function(c) {
                var r = [], ri = -1,
                    i, ci;
                for (i = 0; ci = c[i]; i++) {
                    if (ci.checked === true) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "not": function(c, ss) {
                return DQ.filter(c, ss, true);
            },

            "any": function(c, selectors) {
                var ss = selectors.split('|'),
                    r = [], ri = -1, s,
                    i, ci, j;
                for (i = 0; ci = c[i]; i++) {
                    for (j = 0; s = ss[j]; j++) {
                        if (DQ.is(ci, s)) {
                            r[++ri] = ci;
                            break;
                        }
                    }
                }
                return r;
            },

            "odd": function(c) {
                return this["nth-child"](c, "odd");
            },

            "even": function(c) {
                return this["nth-child"](c, "even");
            },

            "nth": function(c, a) {
                return c[a - 1] || [];
            },

            "first": function(c) {
                return c[0] || [];
            },

            "last": function(c) {
                return c[c.length - 1] || [];
            },

            "has": function(c, ss) {
                var s = DQ.select,
                    r = [], ri = -1,
                    i, ci;
                for (i = 0; ci = c[i]; i++) {
                    if (s(ss, ci).length > 0) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "next": function(c, ss) {
                var is = DQ.is,
                    r = [], ri = -1,
                    i, ci, n;
                for (i = 0; ci = c[i]; i++) {
                    n = next(ci);
                    if (n && is(n, ss)) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "prev": function(c, ss) {
                var is = DQ.is,
                    r = [], ri = -1,
                    i, ci, n;
                for (i = 0; ci = c[i]; i++) {
                    n = prev(ci);
                    if (n && is(n, ss)) {
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            focusable: function(candidates) {
                var len = candidates.length,
                    results = [],
                    i = 0,
                    c;

                for (; i < len; i++) {
                    c = candidates[i];
                    if (Ext.fly(c, '_DomQuery').isFocusable()) {
                        results.push(c);
                    }
                }

                return results;
            },
            
            visible: function(candidates, deep) {
                var len = candidates.length,
                    results = [],
                    i = 0,
                    c;

                for (; i < len; i++) {
                    c = candidates[i];
                    if (Ext.fly(c, '_DomQuery').isVisible(deep)) {
                        results.push(c);
                    }
                }

                return results;
            },

            isScrolled: function(c) {
                var r = [], ri = -1,
                    i, ci, s;
                for (i = 0; ci = c[i]; i++) {
                    s = Ext.fly(ci, '_DomQuery').getScroll();
                    if (s.top > 0 || s.left > 0) {
                        r[++ri] = ci;
                    }
                }
                return r;
            }
        }
    };
}, function() {
    this._init();
});

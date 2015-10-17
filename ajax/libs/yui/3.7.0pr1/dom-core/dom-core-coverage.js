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
_yuitest_coverage["/build/dom-core/dom-core.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/dom-core/dom-core.js",
    code: []
};
_yuitest_coverage["/build/dom-core/dom-core.js"].code=["YUI.add('dom-core', function(Y) {","","var NODE_TYPE = 'nodeType',","    OWNER_DOCUMENT = 'ownerDocument',","    DOCUMENT_ELEMENT = 'documentElement',","    DEFAULT_VIEW = 'defaultView',","    PARENT_WINDOW = 'parentWindow',","    TAG_NAME = 'tagName',","    PARENT_NODE = 'parentNode',","    PREVIOUS_SIBLING = 'previousSibling',","    NEXT_SIBLING = 'nextSibling',","    CONTAINS = 'contains',","    COMPARE_DOCUMENT_POSITION = 'compareDocumentPosition',","    EMPTY_ARRAY = [],","","/** "," * The DOM utility provides a cross-browser abtraction layer"," * normalizing DOM tasks, and adds extra helper functionality"," * for other common tasks. "," * @module dom"," * @main dom"," * @submodule dom-base"," * @for DOM"," *"," */","","/**"," * Provides DOM helper methods."," * @class DOM"," *"," */","    ","Y_DOM = {","    /**","     * Returns the HTMLElement with the given ID (Wrapper for document.getElementById).","     * @method byId         ","     * @param {String} id the id attribute ","     * @param {Object} doc optional The document to search. Defaults to current document ","     * @return {HTMLElement | null} The HTMLElement with the id, or null if none found. ","     */","    byId: function(id, doc) {","        // handle dupe IDs and IE name collision","        return Y_DOM.allById(id, doc)[0] || null;","    },","","    getId: function(node) {","        var id;","        // HTMLElement returned from FORM when INPUT name === \"id\"","        // IE < 8: HTMLCollection returned when INPUT id === \"id\"","        // via both getAttribute and form.id ","        if (node.id && !node.id.tagName && !node.id.item) {","            id = node.id;","        } else if (node.attributes && node.attributes.id) {","            id = node.attributes.id.value;","        }","","        return id;","    },","","    setId: function(node, id) {","        if (node.setAttribute) {","            node.setAttribute('id', id);","        } else {","            node.id = id;","        }","    },","","    /*","     * Finds the ancestor of the element.","     * @method ancestor","     * @param {HTMLElement} element The html element.","     * @param {Function} fn optional An optional boolean test to apply.","     * The optional function is passed the current DOM node being tested as its only argument.","     * If no function is given, the parentNode is returned.","     * @param {Boolean} testSelf optional Whether or not to include the element in the scan ","     * @return {HTMLElement | null} The matching DOM node or null if none found. ","     */","    ancestor: function(element, fn, testSelf, stopFn) {","        var ret = null;","        if (testSelf) {","            ret = (!fn || fn(element)) ? element : null;","","        }","        return ret || Y_DOM.elementByAxis(element, PARENT_NODE, fn, null, stopFn);","    },","","    /*","     * Finds the ancestors of the element.","     * @method ancestors","     * @param {HTMLElement} element The html element.","     * @param {Function} fn optional An optional boolean test to apply.","     * The optional function is passed the current DOM node being tested as its only argument.","     * If no function is given, all ancestors are returned.","     * @param {Boolean} testSelf optional Whether or not to include the element in the scan ","     * @return {Array} An array containing all matching DOM nodes.","     */","    ancestors: function(element, fn, testSelf, stopFn) {","        var ancestor = element,","            ret = [];","","        while ((ancestor = Y_DOM.ancestor(ancestor, fn, testSelf, stopFn))) {","            testSelf = false;","            if (ancestor) {","                ret.unshift(ancestor);","","                if (stopFn && stopFn(ancestor)) {","                    return ret;","                }","            }","        }","","        return ret;","    },","","    /**","     * Searches the element by the given axis for the first matching element.","     * @method elementByAxis","     * @param {HTMLElement} element The html element.","     * @param {String} axis The axis to search (parentNode, nextSibling, previousSibling).","     * @param {Function} fn optional An optional boolean test to apply.","     * @param {Boolean} all optional Whether all node types should be returned, or just element nodes.","     * The optional function is passed the current HTMLElement being tested as its only argument.","     * If no function is given, the first element is returned.","     * @return {HTMLElement | null} The matching element or null if none found.","     */","    elementByAxis: function(element, axis, fn, all, stopAt) {","        while (element && (element = element[axis])) { // NOTE: assignment","                if ( (all || element[TAG_NAME]) && (!fn || fn(element)) ) {","                    return element;","                }","","                if (stopAt && stopAt(element)) {","                    return null;","                }","        }","        return null;","    },","","    /**","     * Determines whether or not one HTMLElement is or contains another HTMLElement.","     * @method contains","     * @param {HTMLElement} element The containing html element.","     * @param {HTMLElement} needle The html element that may be contained.","     * @return {Boolean} Whether or not the element is or contains the needle.","     */","    contains: function(element, needle) {","        var ret = false;","","        if ( !needle || !element || !needle[NODE_TYPE] || !element[NODE_TYPE]) {","            ret = false;","        } else if (element[CONTAINS])  {","            if (Y.UA.opera || needle[NODE_TYPE] === 1) { // IE & SAF contains fail if needle not an ELEMENT_NODE","                ret = element[CONTAINS](needle);","            } else {","                ret = Y_DOM._bruteContains(element, needle); ","            }","        } else if (element[COMPARE_DOCUMENT_POSITION]) { // gecko","            if (element === needle || !!(element[COMPARE_DOCUMENT_POSITION](needle) & 16)) { ","                ret = true;","            }","        }","","        return ret;","    },","","    /**","     * Determines whether or not the HTMLElement is part of the document.","     * @method inDoc","     * @param {HTMLElement} element The containing html element.","     * @param {HTMLElement} doc optional The document to check.","     * @return {Boolean} Whether or not the element is attached to the document. ","     */","    inDoc: function(element, doc) {","        var ret = false,","            rootNode;","","        if (element && element.nodeType) {","            (doc) || (doc = element[OWNER_DOCUMENT]);","","            rootNode = doc[DOCUMENT_ELEMENT];","","            // contains only works with HTML_ELEMENT","            if (rootNode && rootNode.contains && element.tagName) {","                ret = rootNode.contains(element);","            } else {","                ret = Y_DOM.contains(rootNode, element);","            }","        }","","        return ret;","","    },","","   allById: function(id, root) {","        root = root || Y.config.doc;","        var nodes = [],","            ret = [],","            i,","            node;","","        if (root.querySelectorAll) {","            ret = root.querySelectorAll('[id=\"' + id + '\"]');","        } else if (root.all) {","            nodes = root.all(id);","","            if (nodes) {","                // root.all may return HTMLElement or HTMLCollection.","                // some elements are also HTMLCollection (FORM, SELECT).","                if (nodes.nodeName) {","                    if (nodes.id === id) { // avoid false positive on name","                        ret.push(nodes);","                        nodes = EMPTY_ARRAY; // done, no need to filter","                    } else { //  prep for filtering","                        nodes = [nodes];","                    }","                }","","                if (nodes.length) {","                    // filter out matches on node.name","                    // and element.id as reference to element with id === 'id'","                    for (i = 0; node = nodes[i++];) {","                        if (node.id === id  || ","                                (node.attributes && node.attributes.id &&","                                node.attributes.id.value === id)) { ","                            ret.push(node);","                        }","                    }","                }","            }","        } else {","            ret = [Y_DOM._getDoc(root).getElementById(id)];","        }","    ","        return ret;","   },","","","    isWindow: function(obj) {","        return !!(obj && obj.alert && obj.document);","    },","","    _removeChildNodes: function(node) {","        while (node.firstChild) {","            node.removeChild(node.firstChild);","        }","    },","","    siblings: function(node, fn) {","        var nodes = [],","            sibling = node;","","        while ((sibling = sibling[PREVIOUS_SIBLING])) {","            if (sibling[TAG_NAME] && (!fn || fn(sibling))) {","                nodes.unshift(sibling);","            }","        }","","        sibling = node;","        while ((sibling = sibling[NEXT_SIBLING])) {","            if (sibling[TAG_NAME] && (!fn || fn(sibling))) {","                nodes.push(sibling);","            }","        }","","        return nodes;","    },","","    /**","     * Brute force version of contains.","     * Used for browsers without contains support for non-HTMLElement Nodes (textNodes, etc).","     * @method _bruteContains","     * @private","     * @param {HTMLElement} element The containing html element.","     * @param {HTMLElement} needle The html element that may be contained.","     * @return {Boolean} Whether or not the element is or contains the needle.","     */","    _bruteContains: function(element, needle) {","        while (needle) {","            if (element === needle) {","                return true;","            }","            needle = needle.parentNode;","        }","        return false;","    },","","// TODO: move to Lang?","    /**","     * Memoizes dynamic regular expressions to boost runtime performance. ","     * @method _getRegExp","     * @private","     * @param {String} str The string to convert to a regular expression.","     * @param {String} flags optional An optinal string of flags.","     * @return {RegExp} An instance of RegExp","     */","    _getRegExp: function(str, flags) {","        flags = flags || '';","        Y_DOM._regexCache = Y_DOM._regexCache || {};","        if (!Y_DOM._regexCache[str + flags]) {","            Y_DOM._regexCache[str + flags] = new RegExp(str, flags);","        }","        return Y_DOM._regexCache[str + flags];","    },","","// TODO: make getDoc/Win true privates?","    /**","     * returns the appropriate document.","     * @method _getDoc","     * @private","     * @param {HTMLElement} element optional Target element.","     * @return {Object} The document for the given element or the default document. ","     */","    _getDoc: function(element) {","        var doc = Y.config.doc;","        if (element) {","            doc = (element[NODE_TYPE] === 9) ? element : // element === document","                element[OWNER_DOCUMENT] || // element === DOM node","                element.document || // element === window","                Y.config.doc; // default","        }","","        return doc;","    },","","    /**","     * returns the appropriate window.","     * @method _getWin","     * @private","     * @param {HTMLElement} element optional Target element.","     * @return {Object} The window for the given element or the default window. ","     */","    _getWin: function(element) {","        var doc = Y_DOM._getDoc(element);","        return doc[DEFAULT_VIEW] || doc[PARENT_WINDOW] || Y.config.win;","    },","","    _batch: function(nodes, fn, arg1, arg2, arg3, etc) {","        fn = (typeof fn === 'string') ? Y_DOM[fn] : fn;","        var result,","            i = 0,","            node,","            ret;","","        if (fn && nodes) {","            while ((node = nodes[i++])) {","                result = result = fn.call(Y_DOM, node, arg1, arg2, arg3, etc);","                if (typeof result !== 'undefined') {","                    (ret) || (ret = []);","                    ret.push(result);","                }","            }","        }","","        return (typeof ret !== 'undefined') ? ret : nodes;","    },","","    generateID: function(el) {","        var id = el.id;","","        if (!id) {","            id = Y.stamp(el);","            el.id = id; ","        }   ","","        return id; ","    }","};","","","Y.DOM = Y_DOM;","","","}, '@VERSION@' ,{requires:['oop','features']});"];
_yuitest_coverage["/build/dom-core/dom-core.js"].lines = {"1":0,"3":0,"43":0,"47":0,"51":0,"52":0,"53":0,"54":0,"57":0,"61":0,"62":0,"64":0,"79":0,"80":0,"81":0,"84":0,"98":0,"101":0,"102":0,"103":0,"104":0,"106":0,"107":0,"112":0,"127":0,"128":0,"129":0,"132":0,"133":0,"136":0,"147":0,"149":0,"150":0,"151":0,"152":0,"153":0,"155":0,"157":0,"158":0,"159":0,"163":0,"174":0,"177":0,"178":0,"180":0,"183":0,"184":0,"186":0,"190":0,"195":0,"196":0,"201":0,"202":0,"203":0,"204":0,"206":0,"209":0,"210":0,"211":0,"212":0,"214":0,"218":0,"221":0,"222":0,"225":0,"231":0,"234":0,"239":0,"243":0,"244":0,"249":0,"252":0,"253":0,"254":0,"258":0,"259":0,"260":0,"261":0,"265":0,"278":0,"279":0,"280":0,"282":0,"284":0,"297":0,"298":0,"299":0,"300":0,"302":0,"314":0,"315":0,"316":0,"322":0,"333":0,"334":0,"338":0,"339":0,"344":0,"345":0,"346":0,"347":0,"348":0,"349":0,"354":0,"358":0,"360":0,"361":0,"362":0,"365":0,"370":0};
_yuitest_coverage["/build/dom-core/dom-core.js"].functions = {"byId:41":0,"getId:46":0,"setId:60":0,"ancestor:78":0,"ancestors:97":0,"elementByAxis:126":0,"contains:146":0,"inDoc:173":0,"allById:194":0,"isWindow:238":0,"_removeChildNodes:242":0,"siblings:248":0,"_bruteContains:277":0,"_getRegExp:296":0,"_getDoc:313":0,"_getWin:332":0,"_batch:337":0,"generateID:357":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/dom-core/dom-core.js"].coveredLines = 110;
_yuitest_coverage["/build/dom-core/dom-core.js"].coveredFunctions = 19;
_yuitest_coverline("/build/dom-core/dom-core.js", 1);
YUI.add('dom-core', function(Y) {

_yuitest_coverfunc("/build/dom-core/dom-core.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/dom-core/dom-core.js", 3);
var NODE_TYPE = 'nodeType',
    OWNER_DOCUMENT = 'ownerDocument',
    DOCUMENT_ELEMENT = 'documentElement',
    DEFAULT_VIEW = 'defaultView',
    PARENT_WINDOW = 'parentWindow',
    TAG_NAME = 'tagName',
    PARENT_NODE = 'parentNode',
    PREVIOUS_SIBLING = 'previousSibling',
    NEXT_SIBLING = 'nextSibling',
    CONTAINS = 'contains',
    COMPARE_DOCUMENT_POSITION = 'compareDocumentPosition',
    EMPTY_ARRAY = [],

/** 
 * The DOM utility provides a cross-browser abtraction layer
 * normalizing DOM tasks, and adds extra helper functionality
 * for other common tasks. 
 * @module dom
 * @main dom
 * @submodule dom-base
 * @for DOM
 *
 */

/**
 * Provides DOM helper methods.
 * @class DOM
 *
 */
    
Y_DOM = {
    /**
     * Returns the HTMLElement with the given ID (Wrapper for document.getElementById).
     * @method byId         
     * @param {String} id the id attribute 
     * @param {Object} doc optional The document to search. Defaults to current document 
     * @return {HTMLElement | null} The HTMLElement with the id, or null if none found. 
     */
    byId: function(id, doc) {
        // handle dupe IDs and IE name collision
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "byId", 41);
_yuitest_coverline("/build/dom-core/dom-core.js", 43);
return Y_DOM.allById(id, doc)[0] || null;
    },

    getId: function(node) {
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "getId", 46);
_yuitest_coverline("/build/dom-core/dom-core.js", 47);
var id;
        // HTMLElement returned from FORM when INPUT name === "id"
        // IE < 8: HTMLCollection returned when INPUT id === "id"
        // via both getAttribute and form.id 
        _yuitest_coverline("/build/dom-core/dom-core.js", 51);
if (node.id && !node.id.tagName && !node.id.item) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 52);
id = node.id;
        } else {_yuitest_coverline("/build/dom-core/dom-core.js", 53);
if (node.attributes && node.attributes.id) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 54);
id = node.attributes.id.value;
        }}

        _yuitest_coverline("/build/dom-core/dom-core.js", 57);
return id;
    },

    setId: function(node, id) {
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "setId", 60);
_yuitest_coverline("/build/dom-core/dom-core.js", 61);
if (node.setAttribute) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 62);
node.setAttribute('id', id);
        } else {
            _yuitest_coverline("/build/dom-core/dom-core.js", 64);
node.id = id;
        }
    },

    /*
     * Finds the ancestor of the element.
     * @method ancestor
     * @param {HTMLElement} element The html element.
     * @param {Function} fn optional An optional boolean test to apply.
     * The optional function is passed the current DOM node being tested as its only argument.
     * If no function is given, the parentNode is returned.
     * @param {Boolean} testSelf optional Whether or not to include the element in the scan 
     * @return {HTMLElement | null} The matching DOM node or null if none found. 
     */
    ancestor: function(element, fn, testSelf, stopFn) {
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "ancestor", 78);
_yuitest_coverline("/build/dom-core/dom-core.js", 79);
var ret = null;
        _yuitest_coverline("/build/dom-core/dom-core.js", 80);
if (testSelf) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 81);
ret = (!fn || fn(element)) ? element : null;

        }
        _yuitest_coverline("/build/dom-core/dom-core.js", 84);
return ret || Y_DOM.elementByAxis(element, PARENT_NODE, fn, null, stopFn);
    },

    /*
     * Finds the ancestors of the element.
     * @method ancestors
     * @param {HTMLElement} element The html element.
     * @param {Function} fn optional An optional boolean test to apply.
     * The optional function is passed the current DOM node being tested as its only argument.
     * If no function is given, all ancestors are returned.
     * @param {Boolean} testSelf optional Whether or not to include the element in the scan 
     * @return {Array} An array containing all matching DOM nodes.
     */
    ancestors: function(element, fn, testSelf, stopFn) {
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "ancestors", 97);
_yuitest_coverline("/build/dom-core/dom-core.js", 98);
var ancestor = element,
            ret = [];

        _yuitest_coverline("/build/dom-core/dom-core.js", 101);
while ((ancestor = Y_DOM.ancestor(ancestor, fn, testSelf, stopFn))) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 102);
testSelf = false;
            _yuitest_coverline("/build/dom-core/dom-core.js", 103);
if (ancestor) {
                _yuitest_coverline("/build/dom-core/dom-core.js", 104);
ret.unshift(ancestor);

                _yuitest_coverline("/build/dom-core/dom-core.js", 106);
if (stopFn && stopFn(ancestor)) {
                    _yuitest_coverline("/build/dom-core/dom-core.js", 107);
return ret;
                }
            }
        }

        _yuitest_coverline("/build/dom-core/dom-core.js", 112);
return ret;
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
    elementByAxis: function(element, axis, fn, all, stopAt) {
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "elementByAxis", 126);
_yuitest_coverline("/build/dom-core/dom-core.js", 127);
while (element && (element = element[axis])) { // NOTE: assignment
                _yuitest_coverline("/build/dom-core/dom-core.js", 128);
if ( (all || element[TAG_NAME]) && (!fn || fn(element)) ) {
                    _yuitest_coverline("/build/dom-core/dom-core.js", 129);
return element;
                }

                _yuitest_coverline("/build/dom-core/dom-core.js", 132);
if (stopAt && stopAt(element)) {
                    _yuitest_coverline("/build/dom-core/dom-core.js", 133);
return null;
                }
        }
        _yuitest_coverline("/build/dom-core/dom-core.js", 136);
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
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "contains", 146);
_yuitest_coverline("/build/dom-core/dom-core.js", 147);
var ret = false;

        _yuitest_coverline("/build/dom-core/dom-core.js", 149);
if ( !needle || !element || !needle[NODE_TYPE] || !element[NODE_TYPE]) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 150);
ret = false;
        } else {_yuitest_coverline("/build/dom-core/dom-core.js", 151);
if (element[CONTAINS])  {
            _yuitest_coverline("/build/dom-core/dom-core.js", 152);
if (Y.UA.opera || needle[NODE_TYPE] === 1) { // IE & SAF contains fail if needle not an ELEMENT_NODE
                _yuitest_coverline("/build/dom-core/dom-core.js", 153);
ret = element[CONTAINS](needle);
            } else {
                _yuitest_coverline("/build/dom-core/dom-core.js", 155);
ret = Y_DOM._bruteContains(element, needle); 
            }
        } else {_yuitest_coverline("/build/dom-core/dom-core.js", 157);
if (element[COMPARE_DOCUMENT_POSITION]) { // gecko
            _yuitest_coverline("/build/dom-core/dom-core.js", 158);
if (element === needle || !!(element[COMPARE_DOCUMENT_POSITION](needle) & 16)) { 
                _yuitest_coverline("/build/dom-core/dom-core.js", 159);
ret = true;
            }
        }}}

        _yuitest_coverline("/build/dom-core/dom-core.js", 163);
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
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "inDoc", 173);
_yuitest_coverline("/build/dom-core/dom-core.js", 174);
var ret = false,
            rootNode;

        _yuitest_coverline("/build/dom-core/dom-core.js", 177);
if (element && element.nodeType) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 178);
(doc) || (doc = element[OWNER_DOCUMENT]);

            _yuitest_coverline("/build/dom-core/dom-core.js", 180);
rootNode = doc[DOCUMENT_ELEMENT];

            // contains only works with HTML_ELEMENT
            _yuitest_coverline("/build/dom-core/dom-core.js", 183);
if (rootNode && rootNode.contains && element.tagName) {
                _yuitest_coverline("/build/dom-core/dom-core.js", 184);
ret = rootNode.contains(element);
            } else {
                _yuitest_coverline("/build/dom-core/dom-core.js", 186);
ret = Y_DOM.contains(rootNode, element);
            }
        }

        _yuitest_coverline("/build/dom-core/dom-core.js", 190);
return ret;

    },

   allById: function(id, root) {
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "allById", 194);
_yuitest_coverline("/build/dom-core/dom-core.js", 195);
root = root || Y.config.doc;
        _yuitest_coverline("/build/dom-core/dom-core.js", 196);
var nodes = [],
            ret = [],
            i,
            node;

        _yuitest_coverline("/build/dom-core/dom-core.js", 201);
if (root.querySelectorAll) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 202);
ret = root.querySelectorAll('[id="' + id + '"]');
        } else {_yuitest_coverline("/build/dom-core/dom-core.js", 203);
if (root.all) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 204);
nodes = root.all(id);

            _yuitest_coverline("/build/dom-core/dom-core.js", 206);
if (nodes) {
                // root.all may return HTMLElement or HTMLCollection.
                // some elements are also HTMLCollection (FORM, SELECT).
                _yuitest_coverline("/build/dom-core/dom-core.js", 209);
if (nodes.nodeName) {
                    _yuitest_coverline("/build/dom-core/dom-core.js", 210);
if (nodes.id === id) { // avoid false positive on name
                        _yuitest_coverline("/build/dom-core/dom-core.js", 211);
ret.push(nodes);
                        _yuitest_coverline("/build/dom-core/dom-core.js", 212);
nodes = EMPTY_ARRAY; // done, no need to filter
                    } else { //  prep for filtering
                        _yuitest_coverline("/build/dom-core/dom-core.js", 214);
nodes = [nodes];
                    }
                }

                _yuitest_coverline("/build/dom-core/dom-core.js", 218);
if (nodes.length) {
                    // filter out matches on node.name
                    // and element.id as reference to element with id === 'id'
                    _yuitest_coverline("/build/dom-core/dom-core.js", 221);
for (i = 0; node = nodes[i++];) {
                        _yuitest_coverline("/build/dom-core/dom-core.js", 222);
if (node.id === id  || 
                                (node.attributes && node.attributes.id &&
                                node.attributes.id.value === id)) { 
                            _yuitest_coverline("/build/dom-core/dom-core.js", 225);
ret.push(node);
                        }
                    }
                }
            }
        } else {
            _yuitest_coverline("/build/dom-core/dom-core.js", 231);
ret = [Y_DOM._getDoc(root).getElementById(id)];
        }}
    
        _yuitest_coverline("/build/dom-core/dom-core.js", 234);
return ret;
   },


    isWindow: function(obj) {
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "isWindow", 238);
_yuitest_coverline("/build/dom-core/dom-core.js", 239);
return !!(obj && obj.alert && obj.document);
    },

    _removeChildNodes: function(node) {
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "_removeChildNodes", 242);
_yuitest_coverline("/build/dom-core/dom-core.js", 243);
while (node.firstChild) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 244);
node.removeChild(node.firstChild);
        }
    },

    siblings: function(node, fn) {
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "siblings", 248);
_yuitest_coverline("/build/dom-core/dom-core.js", 249);
var nodes = [],
            sibling = node;

        _yuitest_coverline("/build/dom-core/dom-core.js", 252);
while ((sibling = sibling[PREVIOUS_SIBLING])) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 253);
if (sibling[TAG_NAME] && (!fn || fn(sibling))) {
                _yuitest_coverline("/build/dom-core/dom-core.js", 254);
nodes.unshift(sibling);
            }
        }

        _yuitest_coverline("/build/dom-core/dom-core.js", 258);
sibling = node;
        _yuitest_coverline("/build/dom-core/dom-core.js", 259);
while ((sibling = sibling[NEXT_SIBLING])) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 260);
if (sibling[TAG_NAME] && (!fn || fn(sibling))) {
                _yuitest_coverline("/build/dom-core/dom-core.js", 261);
nodes.push(sibling);
            }
        }

        _yuitest_coverline("/build/dom-core/dom-core.js", 265);
return nodes;
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
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "_bruteContains", 277);
_yuitest_coverline("/build/dom-core/dom-core.js", 278);
while (needle) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 279);
if (element === needle) {
                _yuitest_coverline("/build/dom-core/dom-core.js", 280);
return true;
            }
            _yuitest_coverline("/build/dom-core/dom-core.js", 282);
needle = needle.parentNode;
        }
        _yuitest_coverline("/build/dom-core/dom-core.js", 284);
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
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "_getRegExp", 296);
_yuitest_coverline("/build/dom-core/dom-core.js", 297);
flags = flags || '';
        _yuitest_coverline("/build/dom-core/dom-core.js", 298);
Y_DOM._regexCache = Y_DOM._regexCache || {};
        _yuitest_coverline("/build/dom-core/dom-core.js", 299);
if (!Y_DOM._regexCache[str + flags]) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 300);
Y_DOM._regexCache[str + flags] = new RegExp(str, flags);
        }
        _yuitest_coverline("/build/dom-core/dom-core.js", 302);
return Y_DOM._regexCache[str + flags];
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
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "_getDoc", 313);
_yuitest_coverline("/build/dom-core/dom-core.js", 314);
var doc = Y.config.doc;
        _yuitest_coverline("/build/dom-core/dom-core.js", 315);
if (element) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 316);
doc = (element[NODE_TYPE] === 9) ? element : // element === document
                element[OWNER_DOCUMENT] || // element === DOM node
                element.document || // element === window
                Y.config.doc; // default
        }

        _yuitest_coverline("/build/dom-core/dom-core.js", 322);
return doc;
    },

    /**
     * returns the appropriate window.
     * @method _getWin
     * @private
     * @param {HTMLElement} element optional Target element.
     * @return {Object} The window for the given element or the default window. 
     */
    _getWin: function(element) {
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "_getWin", 332);
_yuitest_coverline("/build/dom-core/dom-core.js", 333);
var doc = Y_DOM._getDoc(element);
        _yuitest_coverline("/build/dom-core/dom-core.js", 334);
return doc[DEFAULT_VIEW] || doc[PARENT_WINDOW] || Y.config.win;
    },

    _batch: function(nodes, fn, arg1, arg2, arg3, etc) {
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "_batch", 337);
_yuitest_coverline("/build/dom-core/dom-core.js", 338);
fn = (typeof fn === 'string') ? Y_DOM[fn] : fn;
        _yuitest_coverline("/build/dom-core/dom-core.js", 339);
var result,
            i = 0,
            node,
            ret;

        _yuitest_coverline("/build/dom-core/dom-core.js", 344);
if (fn && nodes) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 345);
while ((node = nodes[i++])) {
                _yuitest_coverline("/build/dom-core/dom-core.js", 346);
result = result = fn.call(Y_DOM, node, arg1, arg2, arg3, etc);
                _yuitest_coverline("/build/dom-core/dom-core.js", 347);
if (typeof result !== 'undefined') {
                    _yuitest_coverline("/build/dom-core/dom-core.js", 348);
(ret) || (ret = []);
                    _yuitest_coverline("/build/dom-core/dom-core.js", 349);
ret.push(result);
                }
            }
        }

        _yuitest_coverline("/build/dom-core/dom-core.js", 354);
return (typeof ret !== 'undefined') ? ret : nodes;
    },

    generateID: function(el) {
        _yuitest_coverfunc("/build/dom-core/dom-core.js", "generateID", 357);
_yuitest_coverline("/build/dom-core/dom-core.js", 358);
var id = el.id;

        _yuitest_coverline("/build/dom-core/dom-core.js", 360);
if (!id) {
            _yuitest_coverline("/build/dom-core/dom-core.js", 361);
id = Y.stamp(el);
            _yuitest_coverline("/build/dom-core/dom-core.js", 362);
el.id = id; 
        }   

        _yuitest_coverline("/build/dom-core/dom-core.js", 365);
return id; 
    }
};


_yuitest_coverline("/build/dom-core/dom-core.js", 370);
Y.DOM = Y_DOM;


}, '@VERSION@' ,{requires:['oop','features']});

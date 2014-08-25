/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
// @tag dom,core
/**
 */
Ext.define('Ext.dom.AbstractElement_traversal', {
    override: 'Ext.dom.AbstractElement',

    /**
     * Looks at this node and then at parent nodes for a match of the passed simple selector (e.g. div.some-class or span:first-child)
     * @param {String} selector The simple selector to test
     * @param {Number/String/HTMLElement/Ext.Element} [limit]
     * The max depth to search as a number or an element which causes the upward traversal to stop
     * and is <b>not</b> considered for inclusion as the result. (defaults to 50 || document.documentElement)
     * @param {Boolean} [returnEl=false] True to return a Ext.Element object instead of DOM node
     * @return {HTMLElement} The matching DOM node (or null if no match was found)
     */
    findParent: function(simpleSelector, limit, returnEl) {
        var target = this.dom,
            topmost = document.documentElement,
            depth = 0,
            stopEl;

        limit = limit || 50;
        if (isNaN(limit)) {
            stopEl = Ext.getDom(limit);
            limit = Number.MAX_VALUE;
        }
        while (target && target.nodeType == 1 && depth < limit && target != topmost && target != stopEl) {
            if (Ext.DomQuery.is(target, simpleSelector)) {
                return returnEl ? Ext.get(target) : target;
            }
            depth++;
            target = target.parentNode;
        }
        return null;
    },

    /**
     * Looks at parent nodes for a match of the passed simple selector (e.g. div.some-class or span:first-child)
     * @param {String} selector The simple selector to test
     * @param {Number/String/HTMLElement/Ext.Element} [limit]
     * The max depth to search as a number or an element which causes the upward traversal to stop
     * and is <b>not</b> considered for inclusion as the result. (defaults to 50 || document.documentElement)
     * @param {Boolean} [returnEl=false] True to return a Ext.Element object instead of DOM node
     * @return {HTMLElement} The matching DOM node (or null if no match was found)
     */
    findParentNode: function(simpleSelector, limit, returnEl) {
        var p = Ext.fly(this.dom.parentNode, '_internal');
        return p ? p.findParent(simpleSelector, limit, returnEl) : null;
    },

    /**
     * Walks up the DOM looking for a parent node that matches the passed simple selector (e.g. div.some-class or span:first-child).
     * This is a shortcut for findParentNode() that always returns an Ext.dom.Element.
     * @param {String} selector The simple selector to test
     * @param {Number/String/HTMLElement/Ext.Element} [limit]
     * The max depth to search as a number or an element which causes the upward traversal to stop
     * and is <b>not</b> considered for inclusion as the result. (defaults to 50 || document.documentElement)
     * @param {Boolean} [returnDom=false] True to return the DOM node instead of Ext.dom.Element
     * @return {Ext.Element} The matching DOM node (or null if no match was found)
     */
    up: function(simpleSelector, limit, returnDom) {
        return this.findParentNode(simpleSelector, limit, !returnDom);
    },

    /**
     * Creates a {@link Ext.CompositeElement} for child nodes based on the passed CSS selector (the selector should not contain an id).
     * @param {String} selector The CSS selector
     * @param {Boolean} [unique] True to create a unique Ext.Element for each element. Defaults to a shared flyweight object.
     * @return {Ext.CompositeElement} The composite element
     */
    select: function(selector, composite) {
        return Ext.dom.Element.select(selector, this.dom, composite);
    },

    /**
     * Selects child nodes based on the passed CSS selector (the selector should not contain an id).
     * @param {String} selector The CSS selector
     * @return {HTMLElement[]} An array of the matched nodes
     */
    query: function(selector) {
        return Ext.DomQuery.select(selector, this.dom);
    },

    /**
     * Selects a single child at any depth below this element based on the passed CSS selector (the selector should not contain an id).
     * @param {String} selector The CSS selector
     * @param {Boolean} [returnDom=false] True to return the DOM node instead of Ext.dom.Element
     * @return {HTMLElement/Ext.dom.Element} The child Ext.dom.Element (or DOM node if returnDom = true)
     */
    down: function(selector, returnDom) {
        var n = Ext.DomQuery.selectNode(selector, this.dom);
        return returnDom ? n : Ext.get(n);
    },

    /**
     * Selects a single *direct* child based on the passed CSS selector (the selector should not contain an id).
     * @param {String} selector The CSS selector
     * @param {Boolean} [returnDom=false] True to return the DOM node instead of Ext.dom.Element.
     * @return {HTMLElement/Ext.dom.Element} The child Ext.dom.Element (or DOM node if returnDom = true)
     */
    child: function(selector, returnDom) {
        var node,
            me = this,
            id;

        // Pull the ID from the DOM (Ext.id also ensures that there *is* an ID).
        // If this object is a Flyweight, it will not have an ID
        id = Ext.id(me.dom);
        // Escape "invalid" chars
        id = Ext.escapeId(id);
        node = Ext.DomQuery.selectNode('#' + id + " > " + selector, me.dom);
        return returnDom ? node : Ext.get(node);
    },

     /**
     * Gets the parent node for this element, optionally chaining up trying to match a selector
     * @param {String} [selector] Find a parent node that matches the passed simple selector
     * @param {Boolean} [returnDom=false] True to return a raw dom node instead of an Ext.dom.Element
     * @return {Ext.dom.Element/HTMLElement} The parent node or null
     */
    parent: function(selector, returnDom) {
        return this.matchNode('parentNode', 'parentNode', selector, returnDom);
    },

     /**
     * Gets the next sibling, skipping text nodes
     * @param {String} [selector] Find the next sibling that matches the passed simple selector
     * @param {Boolean} [returnDom=false] True to return a raw dom node instead of an Ext.dom.Element
     * @return {Ext.dom.Element/HTMLElement} The next sibling or null
     */
    next: function(selector, returnDom) {
        return this.matchNode('nextSibling', 'nextSibling', selector, returnDom);
    },

    /**
     * Gets the previous sibling, skipping text nodes
     * @param {String} [selector] Find the previous sibling that matches the passed simple selector
     * @param {Boolean} [returnDom=false] True to return a raw dom node instead of an Ext.dom.Element
     * @return {Ext.dom.Element/HTMLElement} The previous sibling or null
     */
    prev: function(selector, returnDom) {
        return this.matchNode('previousSibling', 'previousSibling', selector, returnDom);
    },


    /**
     * Gets the first child, skipping text nodes
     * @param {String} [selector] Find the next sibling that matches the passed simple selector
     * @param {Boolean} [returnDom=false] True to return a raw dom node instead of an Ext.dom.Element
     * @return {Ext.dom.Element/HTMLElement} The first child or null
     */
    first: function(selector, returnDom) {
        return this.matchNode('nextSibling', 'firstChild', selector, returnDom);
    },

    /**
     * Gets the last child, skipping text nodes
     * @param {String} [selector] Find the previous sibling that matches the passed simple selector
     * @param {Boolean} [returnDom=false] True to return a raw dom node instead of an Ext.dom.Element
     * @return {Ext.dom.Element/HTMLElement} The last child or null
     */
    last: function(selector, returnDom) {
        return this.matchNode('previousSibling', 'lastChild', selector, returnDom);
    },

    matchNode: function(dir, start, selector, returnDom) {
        if (!this.dom) {
            return null;
        }

        var n = this.dom[start];
        while (n) {
            if (n.nodeType == 1 && (!selector || Ext.DomQuery.is(n, selector))) {
                return !returnDom ? Ext.get(n) : n;
            }
            n = n[dir];
        }
        return null;
    },

    isAncestor: function(element) {
        return this.self.isAncestor.call(this.self, this.dom, element);
    }
});

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
// @define Ext.DomHelper

// @define Ext.core.DomHelper

/**
 * @class Ext.DomHelper
 * @extends Ext.dom.Helper
 * @alternateClassName Ext.core.DomHelper
 * @singleton
 *
 * The DomHelper class provides a layer of abstraction from DOM and transparently supports creating elements via DOM or
 * using HTML fragments. It also has the ability to create HTML fragment templates from your DOM building code.
 *
 * # DomHelper element specification object
 *
 * A specification object is used when creating elements. Attributes of this object are assumed to be element
 * attributes, except for 4 special attributes:
 *
 * - **tag** - The tag name of the element.
 * - **children** or **cn** - An array of the same kind of element definition objects to be created and appended.
 *   These can be nested as deep as you want.
 * - **cls** - The class attribute of the element. This will end up being either the "class" attribute on a HTML
 *   fragment or className for a DOM node, depending on whether DomHelper is using fragments or DOM.
 * - **html** - The innerHTML for the element.
 *
 * **NOTE:** For other arbitrary attributes, the value will currently **not** be automatically HTML-escaped prior to
 * building the element's HTML string. This means that if your attribute value contains special characters that would
 * not normally be allowed in a double-quoted attribute value, you **must** manually HTML-encode it beforehand (see
 * {@link Ext.String#htmlEncode}) or risk malformed HTML being created. This behavior may change in a future release.
 *
 * # Insertion methods
 *
 * Commonly used insertion methods:
 *
 * - **{@link #append}**
 * - **{@link #insertBefore}**
 * - **{@link #insertAfter}**
 * - **{@link #overwrite}**
 * - **{@link #createTemplate}**
 * - **{@link #insertHtml}**
 *
 * # Example
 *
 * This is an example, where an unordered list with 3 children items is appended to an existing element with
 * id 'my-div':
 *
 *     var dh = Ext.DomHelper; // create shorthand alias
 *     // specification object
 *     var spec = {
 *         id: 'my-ul',
 *         tag: 'ul',
 *         cls: 'my-list',
 *         // append children after creating
 *         children: [     // may also specify 'cn' instead of 'children'
 *             {tag: 'li', id: 'item0', html: 'List Item 0'},
 *             {tag: 'li', id: 'item1', html: 'List Item 1'},
 *             {tag: 'li', id: 'item2', html: 'List Item 2'}
 *         ]
 *     };
 *     var list = dh.append(
 *         'my-div', // the context element 'my-div' can either be the id or the actual node
 *         spec      // the specification object
 *     );
 *
 * Element creation specification parameters in this class may also be passed as an Array of specification objects. This
 * can be used to insert multiple sibling nodes into an existing container very efficiently. For example, to add more
 * list items to the example above:
 *
 *     dh.append('my-ul', [
 *         {tag: 'li', id: 'item3', html: 'List Item 3'},
 *         {tag: 'li', id: 'item4', html: 'List Item 4'}
 *     ]);
 *
 * # Templating
 *
 * The real power is in the built-in templating. Instead of creating or appending any elements, {@link #createTemplate}
 * returns a Template object which can be used over and over to insert new elements. Revisiting the example above, we
 * could utilize templating this time:
 *
 *     // create the node
 *     var list = dh.append('my-div', {tag: 'ul', cls: 'my-list'});
 *     // get template
 *     var tpl = dh.createTemplate({tag: 'li', id: 'item{0}', html: 'List Item {0}'});
 *
 *     for(var i = 0; i < 5, i++){
 *         tpl.append(list, [i]); // use template to append to the actual node
 *     }
 *
 * An example using a template:
 *
 *     var html = '<a id="{0}" href="{1}" class="nav">{2}</a>';
 *
 *     var tpl = new Ext.DomHelper.createTemplate(html);
 *     tpl.append('blog-roll', ['link1', 'http://www.edspencer.net/', "Ed's Site"]);
 *     tpl.append('blog-roll', ['link2', 'http://www.dustindiaz.com/', "Dustin's Site"]);
 *
 * The same example using named parameters:
 *
 *     var html = '<a id="{id}" href="{url}" class="nav">{text}</a>';
 *
 *     var tpl = new Ext.DomHelper.createTemplate(html);
 *     tpl.append('blog-roll', {
 *         id: 'link1',
 *         url: 'http://www.edspencer.net/',
 *         text: "Ed's Site"
 *     });
 *     tpl.append('blog-roll', {
 *         id: 'link2',
 *         url: 'http://www.dustindiaz.com/',
 *         text: "Dustin's Site"
 *     });
 *
 * # Compiling Templates
 *
 * Templates are applied using regular expressions. The performance is great, but if you are adding a bunch of DOM
 * elements using the same template, you can increase performance even further by {@link Ext.Template#compile
 * "compiling"} the template. The way "{@link Ext.Template#compile compile()}" works is the template is parsed and
 * broken up at the different variable points and a dynamic function is created and eval'ed. The generated function
 * performs string concatenation of these parts and the passed variables instead of using regular expressions.
 *
 *     var html = '<a id="{id}" href="{url}" class="nav">{text}</a>';
 *
 *     var tpl = new Ext.DomHelper.createTemplate(html);
 *     tpl.compile();
 *
 *     //... use template like normal
 *
 * # Performance Boost
 *
 * DomHelper will transparently create HTML fragments when it can. Using HTML fragments instead of DOM can significantly
 * boost performance.
 *
 * Element creation specification parameters may also be strings. If {@link #useDom} is false, then the string is used
 * as innerHTML. If {@link #useDom} is true, a string specification results in the creation of a text node. Usage:
 *
 *     Ext.DomHelper.useDom = true; // force it to use DOM; reduces performance
 *
 */
Ext.define('Ext.dom.Helper', (function() {

// kill repeat to save bytes
var afterbegin = 'afterbegin',
    afterend = 'afterend',
    beforebegin = 'beforebegin',
    beforeend = 'beforeend',
    ts = '<table>',
    te = '</table>',
    tbs = ts+'<tbody>',
    tbe = '</tbody>'+te,
    trs = tbs + '<tr>',
    tre = '</tr>'+tbe,
    detachedDiv = document.createElement('div'),
    bbValues = ['BeforeBegin', 'previousSibling'],
    aeValues = ['AfterEnd', 'nextSibling'],
    bb_ae_PositionHash = {
        beforebegin: bbValues,
        afterend: aeValues
    },
    fullPositionHash = {
        beforebegin: bbValues,
        afterend: aeValues,
        afterbegin: ['AfterBegin', 'firstChild'],
        beforeend: ['BeforeEnd', 'lastChild']
    };

/**
 * @class Ext.dom.Helper
 * @extends Ext.dom.AbstractHelper
 * @requires Ext.dom.AbstractElement
 * 
 * The actual class of which {@link Ext.DomHelper} is instance of.
 * 
 * Use singleton {@link Ext.DomHelper} instead.
 * 
 * @private
 */
return {
    extend: 'Ext.dom.AbstractHelper',
    requires:['Ext.dom.AbstractElement'],

    tableRe: /^(?:table|thead|tbody|tr|td)$/i,

    tableElRe: /td|tr|tbody|thead/i,

    /**
     * @property {Boolean} useDom
     * True to force the use of DOM instead of html fragments.
     */
    useDom : false,

    /**
     * Creates new DOM element(s) without inserting them to the document.
     * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
     * @return {HTMLElement} The new uninserted node
     */
    createDom: function(o, parentNode){
        var el,
            doc = document,
            useSet,
            attr,
            val,
            cn,
            i, l;

        if (Ext.isArray(o)) {                       // Allow Arrays of siblings to be inserted
            el = doc.createDocumentFragment(); // in one shot using a DocumentFragment
            for (i = 0, l = o.length; i < l; i++) {
                this.createDom(o[i], el);
            }
        } else if (typeof o == 'string') {         // Allow a string as a child spec.
            el = doc.createTextNode(o);
        } else {
            el = doc.createElement(o.tag || 'div');
            useSet = !!el.setAttribute; // In IE some elements don't have setAttribute
            for (attr in o) {
                if (!this.confRe.test(attr)) {
                    val = o[attr];
                    if (attr == 'cls') {
                        el.className = val;
                    } else {
                        if (useSet) {
                            el.setAttribute(attr, val);
                        } else {
                            el[attr] = val;
                        }
                    }
                }
            }
            Ext.DomHelper.applyStyles(el, o.style);

            if ((cn = o.children || o.cn)) {
                this.createDom(cn, el);
            } else if (o.html) {
                el.innerHTML = o.html;
            }
        }
        if (parentNode) {
            parentNode.appendChild(el);
        }
        return el;
    },

    ieTable: function(depth, openingTags, htmlContent, closingTags){
        detachedDiv.innerHTML = [openingTags, htmlContent, closingTags].join('');

        var i = -1,
            el = detachedDiv,
            ns;

        while (++i < depth) {
            el = el.firstChild;
        }
        // If the result is multiple siblings, then encapsulate them into one fragment.
        ns = el.nextSibling;

        if (ns) {
            ns = el;
            el = document.createDocumentFragment();
            
            while (ns) {
                 nx = ns.nextSibling;
                 el.appendChild(ns);
                 ns = nx;
            }
        }
        return el;
    },

    /**
     * @private
     * Nasty code for IE's broken table implementation
     */
    insertIntoTable: function(tag, where, destinationEl, html) {
        var node,
            before,
            bb = where == beforebegin,
            ab = where == afterbegin,
            be = where == beforeend,
            ae = where == afterend;

        if (tag == 'td' && (ab || be) || !this.tableElRe.test(tag) && (bb || ae)) {
            return null;
        }
        before = bb ? destinationEl :
                 ae ? destinationEl.nextSibling :
                 ab ? destinationEl.firstChild : null;

        if (bb || ae) {
            destinationEl = destinationEl.parentNode;
        }

        if (tag == 'td' || (tag == 'tr' && (be || ab))) {
            node = this.ieTable(4, trs, html, tre);
        } else if (((tag == 'tbody' || tag == 'thead') && (be || ab)) ||
                (tag == 'tr' && (bb || ae))) {
            node = this.ieTable(3, tbs, html, tbe);
        } else {
            node = this.ieTable(2, ts, html, te);
        }
        destinationEl.insertBefore(node, before);
        return node;
    },

    /**
     * @private
     * Fix for IE9 createContextualFragment missing method
     */
    createContextualFragment: function(html) {
        var fragment = document.createDocumentFragment(),
            length, childNodes;

        detachedDiv.innerHTML = html;
        childNodes = detachedDiv.childNodes;
        length = childNodes.length;

        // Move nodes into fragment, don't clone: http://jsperf.com/create-fragment
        while (length--) {
            fragment.appendChild(childNodes[0]);
        }
        return fragment;
    },

    applyStyles: function(el, styles) {
        if (styles) {
            if (typeof styles == "function") {
                styles = styles.call();
            }
            if (typeof styles == "string") {
                styles = Ext.dom.Element.parseStyles(styles);
            }
            if (typeof styles == "object") {
                Ext.fly(el, '_applyStyles').setStyle(styles);
            }
        }
    },

    /**
     * Alias for {@link #markup}.
     * @inheritdoc Ext.dom.AbstractHelper#markup
     */
    createHtml: function(spec) {
        return this.markup(spec);
    },

    doInsert: function(el, o, returnElement, pos, sibling, append) {
        
        el = el.dom || Ext.getDom(el);

        var newNode;

        if (this.useDom) {
            newNode = this.createDom(o, null);

            if (append) {
                el.appendChild(newNode);
            }
            else {
                (sibling == 'firstChild' ? el : el.parentNode).insertBefore(newNode, el[sibling] || el);
            }

        } else {
            newNode = this.insertHtml(pos, el, this.markup(o));
        }
        return returnElement ? Ext.get(newNode, true) : newNode;
    },

    /**
     * Creates new DOM element(s) and overwrites the contents of el with them.
     * @param {String/HTMLElement/Ext.Element} el The context element
     * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
     * @param {Boolean} [returnElement] true to return an Ext.Element
     * @return {HTMLElement/Ext.Element} The new node
     */
    overwrite: function(el, html, returnElement) {
        var newNode;

        el = Ext.getDom(el);
        html = this.markup(html);

        // IE Inserting HTML into a table/tbody/tr requires extra processing: http://www.ericvasilik.com/2006/07/code-karma.html
        if (Ext.isIE && this.tableRe.test(el.tagName)) {
            // Clearing table elements requires removal of all elements.
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
            if (html) {
                newNode = this.insertHtml('afterbegin', el, html);
                return returnElement ? Ext.get(newNode) : newNode;
            }
            return null;
        }
        el.innerHTML = html;
        return returnElement ? Ext.get(el.firstChild) : el.firstChild;
    },

    insertHtml: function(where, el, html) {
        var hashVal,
            range,
            rangeEl,
            setStart,
            frag;

        where = where.toLowerCase();

        // Has fast HTML insertion into existing DOM: http://www.w3.org/TR/html5/apis-in-html-documents.html#insertadjacenthtml
        if (el.insertAdjacentHTML) {

            // IE's incomplete table implementation: http://www.ericvasilik.com/2006/07/code-karma.html
            if (Ext.isIE && this.tableRe.test(el.tagName) && (frag = this.insertIntoTable(el.tagName.toLowerCase(), where, el, html))) {
                return frag;
            }

            if ((hashVal = fullPositionHash[where])) {

                if (Ext.global.MSApp && Ext.global.MSApp.execUnsafeLocalFunction) {
                    //ALLOW MS TO EXECUTE THIS CODE FOR NATIVE WINDOWS 8 DESKTOP APPS
                    MSApp.execUnsafeLocalFunction(function () {
                        el.insertAdjacentHTML(hashVal[0], html);
                    });
                } else {
                    el.insertAdjacentHTML(hashVal[0], html);
                }

                return el[hashVal[1]];
            }
            // if (not IE and context element is an HTMLElement) or TextNode
        } else {
            // we cannot insert anything inside a textnode so...
            if (el.nodeType === 3) {
                where = where === 'afterbegin' ? 'beforebegin' : where;
                where = where === 'beforeend' ? 'afterend' : where;
            }
            range = Ext.supports.CreateContextualFragment ? el.ownerDocument.createRange() : undefined;
            setStart = 'setStart' + (this.endRe.test(where) ? 'After' : 'Before');
            if (bb_ae_PositionHash[where]) {
                if (range) {
                    range[setStart](el);
                    frag = range.createContextualFragment(html);
                } else {
                    frag = this.createContextualFragment(html);
                }
                el.parentNode.insertBefore(frag, where == beforebegin ? el : el.nextSibling);
                return el[(where == beforebegin ? 'previous' : 'next') + 'Sibling'];
            } else {
                rangeEl = (where == afterbegin ? 'first' : 'last') + 'Child';
                if (el.firstChild) {
                    if (range) {
                        range[setStart](el[rangeEl]);
                        frag = range.createContextualFragment(html);
                    } else {
                        frag = this.createContextualFragment(html);
                    }

                    if (where == afterbegin) {
                        el.insertBefore(frag, el.firstChild);
                    } else {
                        el.appendChild(frag);
                    }
                } else {
                    el.innerHTML = html;
                }
                return el[rangeEl];
            }
        }
        //<debug>
        Ext.Error.raise({
            sourceClass: 'Ext.DomHelper',
            sourceMethod: 'insertHtml',
            htmlToInsert: html,
            targetElement: el,
            msg: 'Illegal insertion point reached: "' + where + '"'
        });
        //</debug>
    },

    /**
     * Creates a new Ext.Template from the DOM object spec.
     * @param {Object} o The DOM object spec (and children)
     * @return {Ext.Template} The new template
     */
    createTemplate: function(o) {
        var html = this.markup(o);
        return new Ext.Template(html);
    }

};
})(), function() {
    Ext.ns('Ext.core');
    Ext.DomHelper = Ext.core.DomHelper = new this;
});

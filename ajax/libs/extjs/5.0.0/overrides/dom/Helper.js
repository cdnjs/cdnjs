Ext.define('Ext.overrides.dom.Helper', (function() {
    var tableRe = /^(?:table|thead|tbody|tr|td)$/i,
        tableElRe = /td|tr|tbody|thead/i,
        ts = '<table>',
        te = '</table>',
        tbs = ts+'<tbody>',
        tbe = '</tbody>'+te,
        trs = tbs + '<tr>',
        tre = '</tr>'+tbe;

    return {
        override: 'Ext.dom.Helper',

        ieInsertHtml: function(where, el, html) {
            var frag = null;

            // IE's incomplete table implementation: http://www.ericvasilik.com/2006/07/code-karma.html
            if (Ext.isIE9m && tableRe.test(el.tagName)) {
                frag = this.insertIntoTable(el.tagName.toLowerCase(), where, el, html);
            }
            return frag;
        },

        ieOverwrite: function(el, html) {
            // IE Inserting HTML into a table/tbody/tr requires extra processing:
            // http://www.ericvasilik.com/2006/07/code-karma.html
            if (Ext.isIE9m && tableRe.test(el.tagName)) {
                // Clearing table elements requires removal of all elements.
                while (el.firstChild) {
                    el.removeChild(el.firstChild);
                }
                if (html) {
                    return this.insertHtml('afterbegin', el, html);
                }
            } 
        },

        ieTable: function(depth, openingTags, htmlContent, closingTags){
            var i = -1,
                el = this.detachedDiv,
                ns, nx;

            el.innerHTML = [openingTags, htmlContent, closingTags].join('');

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
         * @method insertIntoTable
         * @member Ext.dom.Helper
         * workaround for broken table implementation in IE9m
         * http://www.ericvasilik.com/2006/07/code-karma.html
         */
        insertIntoTable: function(tag, where, destinationEl, html) {
            var node,
                before,
                bb = where === 'beforebegin',
                ab = where === 'afterbegin',
                be = where === 'beforeend',
                ae = where === 'afterend';

            if (tag === 'td' && (ab || be) || !tableElRe.test(tag) && (bb || ae)) {
                return null;
            }
            before = bb ? destinationEl :
                     ae ? destinationEl.nextSibling :
                     ab ? destinationEl.firstChild : null;

            if (bb || ae) {
                destinationEl = destinationEl.parentNode;
            }

            if (tag === 'td' || (tag === 'tr' && (be || ab))) {
                node = this.ieTable(4, trs, html, tre);
            } else if (((tag === 'tbody' || tag === 'thead') && (be || ab)) ||
                    (tag === 'tr' && (bb || ae))) {
                node = this.ieTable(3, tbs, html, tbe);
            } else {
                node = this.ieTable(2, ts, html, te);
            }
            destinationEl.insertBefore(node, before);
            return node;
        }
    };
})());
/* ===========================================================
 * trumbowyg.preformatted.js v1.0
 * Preformatted plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Casella Edoardo (Civile)
 */


(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                preformatted: 'Code sample <pre>'
            },
            fr: {
                preformatted: 'Exemple de code'
            },
            it: {
                preformatted: 'Codice <pre>'
            }
        },
        opts: {
            btnsDef: {
                preformatted: {
                    func: function (params, tbw) {
                        var text = String(tbw.doc.getSelection());
                        if (text.replace(/\s/g, '') !== '') {
                            try {
                                var curtag = getSelectionParentElement().tagName.toLowerCase();
                                if (curtag == 'code' || curtag == 'pre') {
                                    return unwrapCode();
                                }
                                else {
                                    tbw.execCmd('insertHTML', '<pre><code>' + strip(text) + '</code></pre>');
                                }
                            } catch (e) {
                            }
                        }
                    },
                    ico: 'insertCode'
                }
            }
        },
    });

    /*
     * GetSelectionParentElement
     */
    function getSelectionParentElement() {
        var parentEl = null,
            sel;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                parentEl = sel.getRangeAt(0).commonAncestorContainer;
                if (parentEl.nodeType != 1) {
                    parentEl = parentEl.parentNode;
                }
            }
        } else if ((sel = document.selection) && sel.type != 'Control') {
            parentEl = sel.createRange().parentElement();
        }
        return parentEl;
    }

    /*
     * Strip
     * returns a text without HTML tags
     */
    function strip(html) {
        var tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    /*
     * UnwrapCode
     * ADD/FIX: to improve, works but can be better
     * "paranoic" solution
     */
    function unwrapCode() {
        var container = null;
        if (document.selection) //for IE
            container = document.selection.createRange().parentElement();
        else {
            var select = window.getSelection();
            if (select.rangeCount > 0)
                container = select.getRangeAt(0).startContainer.parentNode;
        }
        //'paranoic' unwrap
        var ispre = $(container).contents().closest('pre').length;
        var iscode = $(container).contents().closest('code').length;
        if (ispre && iscode) {
            $(container).contents().unwrap('code').unwrap('pre');
        } else if (ispre) {
            $(container).contents().unwrap('pre');
        } else if (iscode) {
            $(container).contents().unwrap('code');
        }
    }


})(jQuery);
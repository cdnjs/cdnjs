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
            // jshint camelcase:false
            en: {
                preformatted: 'Code sample <pre>'
            },
            fr: {
                preformatted: 'Exemple de code'
            },
            it: {
                preformatted: 'Codice <pre>'
            },
            zh_cn: {
                preformatted: '代码示例 <pre>'
            },
            ja: {
                preformatted: 'コードサンプル <pre>'
            }
        },
        // jshint camelcase:true

        plugins: {
            preformatted: {
                init: function (trumbowyg) {
                    var btnDef = {
                        fn: function () {
                            trumbowyg.saveRange();
                            var text = trumbowyg.getRangeText();
                            if (text.replace(/\s/g, '') !== '') {
                                try {
                                    var curtag = getSelectionParentElement().tagName.toLowerCase();
                                    if (curtag === 'code' || curtag === 'pre') {
                                        return unwrapCode();
                                    }
                                    else {
                                        trumbowyg.execCmd('insertHTML', '<pre><code>' + strip(text) + '</code></pre>');
                                    }
                                } catch (e) {
                                }
                            }
                        },
                        tag: 'pre'
                    };

                    trumbowyg.addBtnDef('preformatted', btnDef);
                }
            }
        }
    });

    /*
     * GetSelectionParentElement
     */
    function getSelectionParentElement() {
        var parentEl = null,
            selection;
        if (window.getSelection) {
            selection = window.getSelection();
            if (selection.rangeCount) {
                parentEl = selection.getRangeAt(0).commonAncestorContainer;
                if (parentEl.nodeType !== 1) {
                    parentEl = parentEl.parentNode;
                }
            }
        } else if ((selection = document.selection) && selection.type !== 'Control') {
            parentEl = selection.createRange().parentElement();
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
        if (document.selection) { //for IE
            container = document.selection.createRange().parentElement();
        } else {
            var select = window.getSelection();
            if (select.rangeCount > 0) {
                container = select.getRangeAt(0).startContainer.parentNode;
            }
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

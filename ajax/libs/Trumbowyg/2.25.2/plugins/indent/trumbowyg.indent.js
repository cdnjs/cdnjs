
/* ===========================================================
 * trumbowyg.indent.js v1.0
 * Indent or Outdent plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Fabacks
 *          Website : https://github.com/Fabacks
 */

 (function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                indent: 'Indent',
                outdent: 'Outdent'
            },
            by: {
                indent: 'Водступ',
                outdent: 'Выступ'
            },
            et: {
                indent: 'Taande suurendamine',
                outdent: 'Taande vähendamine'
            },
            fr: {
                indent: 'Augmenter le retrait',
                outdent: 'Diminuer le retrait'
            },
            pt_br: {
                indent: 'Aumentar Recuo',
                outdent: 'Diminuir Recuo'
            },
            ru: {
                indent: 'Отступ',
                outdent: 'Выступ'
            },
            tr: {
                indent: 'Girinti',
                outdent: 'Çıkıntı'
            },
            // jshint camelcase:true
        }
    });

    // Adds the extra button definition
    $.extend(true, $.trumbowyg, {
        plugins: {
            paragraph: {
                init: function (trumbowyg) {
                    var indentBtnDef = {
                        fn: 'indent',
                        title: trumbowyg.lang.indent,
                        isSupported: function () {
                            return !!document.queryCommandSupported && !!document.queryCommandSupported('indent');
                        },
                        ico: 'indent'
                    };

                    var outdentBtnDef = {
                        fn: 'outdent',
                        title: trumbowyg.lang.outdent,
                        isSupported: function () {
                            return !!document.queryCommandSupported && !!document.queryCommandSupported('outdent');
                        },
                        ico: 'outdent'
                    };

                    trumbowyg.addBtnDef('indent', indentBtnDef);
                    trumbowyg.addBtnDef('outdent', outdentBtnDef);
                }
            }
        }
    });
})(jQuery);

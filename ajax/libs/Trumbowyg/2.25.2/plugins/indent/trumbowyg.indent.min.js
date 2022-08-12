/* ===========================================================
 * trumbowyg.indent.js v1.0
 * Indent or Outdent plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Fabacks
 *          Website : https://github.com/Fabacks
 */
!function(n){"use strict";n.extend(!0,n.trumbowyg,{langs:{en:{indent:"Indent",outdent:"Outdent"},by:{indent:"Водступ",outdent:"Выступ"},et:{indent:"Taande suurendamine",outdent:"Taande vähendamine"},fr:{indent:"Augmenter le retrait",outdent:"Diminuer le retrait"},pt_br:{indent:"Aumentar Recuo",outdent:"Diminuir Recuo"},ru:{indent:"Отступ",outdent:"Выступ"},tr:{indent:"Girinti",outdent:"Çıkıntı"}}}),n.extend(!0,n.trumbowyg,{plugins:{paragraph:{init:function(n){var t={fn:"indent",title:n.lang.indent,isSupported:function(){return!!document.queryCommandSupported&&!!document.queryCommandSupported("indent")},ico:"indent"},e={fn:"outdent",title:n.lang.outdent,isSupported:function(){return!!document.queryCommandSupported&&!!document.queryCommandSupported("outdent")},ico:"outdent"};n.addBtnDef("indent",t),n.addBtnDef("outdent",e)}}}})}(jQuery);
/*! Highlight JS Loader v6.1 | MIT Licensed (C) 2015 Ali.Dbg | http://goo.gl/IRlJuI */
;(function(doc, replace, innerHTML) {
    "use strict";
    doc.head.appendChild(doc.createElement("style"))[innerHTML] = 
        ".hljs,.hljs *{line-height:1.45;font-family:Consolas,Menlo,Liberation Mono}"+
        ".hljs{border-radius:.2em;max-height:40em;margin:.5em auto;white-space:pre}"+
        ".hljs *{vertical-align:top;top:0;left:0;margin:0;padding:0;border:0 none;outline:none;float:none;display:inline;position:relative;word-wrap:normal;direction:ltr}"+
        ".hjln{counter-reset:l;text-align:right;float:left;margin:0 1em 0 -1em;border-right:.1em solid;cursor:default;-webkit-user-select:none;-moz-user-select:none}"+
        ".hjln span{counter-increment:l;display:block;padding:0 .5em 0 1em}.hjln span:before{content:counter(l)}";
    doc.addEventListener("DOMContentLoaded", function() {
        var code = doc.getElementsByTagName("code");
        for (var i = 0; i < code.length; i++) {
            var cod = code[i];
            if (cod.className.search(/(hljs|nohighlight)/) == -1) {
                cod.addEventListener("click", function() {
                    if (confirm("Select All?")) {
                        var r = doc.createRange(),
                            s = window.getSelection();
                        s.removeAllRanges();
                        r.setStart(this, 1);
                        r.setEnd(this, this.childNodes.length);
                        s.addRange(r)
                    }
                });
                cod[innerHTML] = cod[innerHTML][replace](/<br[^>]*>$/mgi, "")[replace](/</g, "&lt;")[replace](/>/g, "&gt;")[replace](/"/g, "&quot;");
                hljs.highlightBlock(cod);
                var lines = new Array(cod[innerHTML].split(/\n/).length + 1).join('<span></span>');
                cod[innerHTML] = '<span class="hjln">' + lines + '</span>' + cod[innerHTML];
            }
        }
        if (typeof jQuery != "undefined" && jQuery.fn.niceScroll) jQuery(".hljs").niceScroll()
    })
})(document, "replace", "innerHTML");

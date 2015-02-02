/*! Highlight JS Loader v5.0 | MIT Licensed (C) 2015 Ali.Dbg | http://goo.gl/IRlJuI */
;(function(doc, replace, innerHTML, addEventListener, getElementsByTagName) {
    "use strict";
    doc.head.appendChild(doc.createElement("style"))[innerHTML] = 
        ".hljs,.hljs span{font-family:Consolas,Menlo,Liberation Mono;word-wrap:normal;position:relative;float:none;direction:ltr}"+
        ".hljs{border-radius:.2em;max-height:40em;margin:.5em auto;white-space:pre;overflow:auto}"+
        ".hljs .hjln{text-align:right;float:left;margin:0 1em 0 -1em;border-right:.1em solid;"+
        "cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}"+
        ".hljs .hjln span{padding:0 .5em 0 1em;display:block}";
    doc[addEventListener]("DOMContentLoaded", function() {
        var code = doc[getElementsByTagName]("code");
        for (var i = 0; i < code.length; i++) {
            var cod = code[i];
            if ("object" == typeof hljs && cod.className.indexOf("hljs") == -1 && cod.className.indexOf("nohighlight") == -1) {
                cod[addEventListener]("click", function() {
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
                cod[innerHTML] = '<span class="hjln"></span>' + cod[innerHTML];
                var g = cod[innerHTML].split(/\n/).length;
                for (var a = 1; a <= g; a++)(cod[getElementsByTagName]("span")[0])[innerHTML] += "<span>" + a + "</span>"
            }
        }
        if (typeof jQuery != "undefined" && jQuery.fn.niceScroll) jQuery("code").niceScroll()
    })
})(document, "replace", "innerHTML", "addEventListener", "getElementsByTagName");

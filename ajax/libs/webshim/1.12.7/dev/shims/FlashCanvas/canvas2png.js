/*
 * canvas2png.js
 *
 * Copyright (c) 2010-2013 Shinya Muramatsu
 * Released under the MIT License
 * http://flashcanvas.net/
 */

(function(doc) {

var scripts = doc.getElementsByTagName("script");
var script  = scripts[scripts.length - 1];
var url     = script.getAttribute("src").replace(/[^\/]+$/, "save.php");

window.canvas2png = function(canvas, filename) {
    var tagName = canvas.tagName.toLowerCase();
    if (tagName !== "canvas") {
        return;
    }

    if (typeof FlashCanvas !== "undefined") {
        FlashCanvas.saveImage(canvas, filename);
    } else {
        var action = url;
        if (filename) {
            action += "?filename=" + filename;
        }

        var form  = doc.createElement("form");
        var input = doc.createElement("input");

        form.setAttribute("action", action);
        form.setAttribute("method", "post");

        input.setAttribute("type",  "hidden");
        input.setAttribute("name",  "dataurl");
        input.setAttribute("value", canvas.toDataURL());

        doc.body.appendChild(form);
        form.appendChild(input);
        form.submit();
        form.removeChild(input);
        doc.body.removeChild(form);
    }
}

})(document);

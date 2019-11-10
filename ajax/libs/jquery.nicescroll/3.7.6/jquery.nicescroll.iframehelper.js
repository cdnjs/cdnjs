/* iframe script helper for jquery.nicescroll
-- version 0.9.0
-- copyright 2017-06-18 InuYaksa*2017
-- licensed under the MIT
--
-- https://nicescroll.areaaperta.com/
-- https://github.com/inuyaksa/jquery.nicescroll
--
*/

(function (document,window) {

    var body = document.body;
    var parent = window.parent;

    if (parent && ("createEvent" in document)) {

        var isoldie = ("documentMode" in document);  // 11-
        var ismsedge = ("msCredentials" in window);  // MS Edge 14+

        function onwheel(e) {

            var evt = document.createEvent("MouseEvents");
            evt.initEvent('wheel', true, true);
            evt.deltaMode = e.deltaMode;
            evt.deltaX = e.deltaX;
            evt.deltaY = e.deltaY;
            evt.deltaZ = e.deltaZ;
            evt.wheelDelta = e.wheelDelta;
            evt.wheelDeltaX = e.wheelDeltaX;
            evt.wheelDeltaY = e.wheelDeltaY;

            parent.dispatchEvent(evt);
        }

        body.addEventListener("wheel", onwheel);

    }

    if (window.addEventListener) {

        // https://davidwalsh.name/add-rules-stylesheets
        var sheet = (function () {
            var style = document.createElement("style");
            style.appendChild(document.createTextNode(""));
            document.head.appendChild(style);
            return style.sheet;
        })();

        var tmrscroll = false;
        var lastiframe = null;
        var lastiframeviewport = null;
        var lastscroll = [];

        window.addEventListener("scroll", function (e) {
            if (lastiframeviewport) {
                //            var df = [ window.scrollX - lastscroll[0], window.scrollY - lastscroll[1] ];
                window.scrollTo(lastscroll[0], lastscroll[1]);
                //            lastiframeviewport.scrollBy(df[0],df[1]);
                //            console.log(df);
            }
        });

        function findNiceParent(t) {
            do {
                if ($.data(t, '__nicescroll') !== undefined) return t;
                t = t.parentNode || false;
            } while (t);
            return false;
        }

        window.addEventListener("load", function () {

            var hasstyle = false;

            $.nicescroll.each(function () {
                var nice = this;
                nice.scrollstart(function () {
                    if (!hasstyle) sheet.insertRule("iframe { pointer-events: none !important; }", 0);
                    hasstyle = true;
                });
                nice.scrollend(function () {
                    if (hasstyle) sheet.deleteRule(0);
                    hasstyle = false;
                });
            });

            $("iframe").each(function () {
                this.addEventListener("mouseenter", function (e) {
                    lastiframe = e.target;
                    var chk = findNiceParent(lastiframe);
                    lastiframeviewport = chk;
                    //if (chk) lastiframeviewport = $(chk).getNiceScroll();                
                    lastscroll = [window.scrollX, window.scrollY];
                });
                this.addEventListener("mouseleave", function (e) {
                    lastiframe = lastiframeviewport = null;
                });
            });

        });

    }

})(document,window);
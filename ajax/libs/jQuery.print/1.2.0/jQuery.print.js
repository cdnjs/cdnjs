/*  jQuery.print, version 1.0.3
 *  (c) Sathvik Ponangi, Doers' Guild
 * Licence: CC-By (http://creativecommons.org/licenses/by/3.0/)
 *--------------------------------------------------------------------------*/

(function($) {"use strict";
    // A nice closure for our definitions

    function getjQueryObject(string) {
        // Make string a vaild jQuery thing
        var jqObj = $("");
        try {
            jqObj = $(string).clone();
        } catch(e) {
            jqObj = $("<span />").html(string);
        }
        return jqObj;
    }

    function isNode(o) {
        /* http://stackoverflow.com/a/384380/937891 */
        return !!( typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
    }


    $.print = $.fn.print = function() {
        // Print a given set of elements

        var options, $this, self = this;

        // console.log("Printing", this, arguments);

        if ( self instanceof $) {
            // Get the node if it is a jQuery object
            self = self.get(0);
        }

        if (isNode(self)) {
            // If `this` is a HTML element, i.e. for
            // $(selector).print()
            $this = $(self);
            if (arguments.length > 0) {
                options = arguments[0];
            }
        } else {
            if (arguments.length > 0) {
                // $.print(selector,options)
                $this = $(arguments[0]);
                if (isNode($this[0])) {
                    if (arguments.length > 1) {
                        options = arguments[1];
                    }
                } else {
                    // $.print(options)
                    options = arguments[0];
                    $this = $("html");
                }
            } else {
                // $.print()
                $this = $("html");
            }
        }

        // Default options
        var defaults = {
            globalStyles : true,
            mediaPrint : false,
            stylesheet : null,
            noPrintSelector : ".no-print",
            iframe : true,
            append : null,
            prepend : null
        };
        // Merge with user-options
        options = $.extend({}, defaults, (options || {}));

        var $styles = $("");
        if (options.globalStyles) {
            // Apply the stlyes from the current sheet to the printed page
            $styles = $("style, link, meta, title");
        } else if (options.mediaPrint) {
            // Apply the media-print stylesheet
            $styles = $("link[media=print]");
        }
        if (options.stylesheet) {
            // Add a custom stylesheet if given
            $styles = $.merge($styles, $('<link rel="stylesheet" href="' + options.stylesheet + '">'));
        }

        // Create a copy of the element to print
        var copy = $this.clone();
        // Wrap it in a span to get the HTML markup string
        copy = $("<span/>").append(copy);
        // Remove unwanted elements
        copy.find(options.noPrintSelector).remove();
        // Add in the styles
        copy.append($styles.clone());
        // Appedned content
        copy.append(getjQueryObject(options.append));
        // Prepended content
        copy.prepend(getjQueryObject(options.prepend));
        // Get the HTML markup string
        var content = copy.html();
        // Destroy the copy
        copy.remove();

        var w, wdoc;
        if (options.iframe) {
            // Use an iframe for printing
            try {
                var $iframe = $(options.iframe + "");
                var iframeCount = $iframe.length;
                if (iframeCount === 0) {
                    // Create a new iFrame if none is given
                    $iframe = $('<iframe height="0" width="0" border="0" wmode="Opaque"/>').prependTo('body').css({
                        "position" : "absolute",
                        "top" : -999,
                        "left" : -999
                    });
                }
                w = $iframe.get(0);
                w = w.contentWindow || w.contentDocument || w;
                wdoc = w.document || w.contentDocument || w;
                wdoc.open();
                wdoc.write(content);
                wdoc.close();
                setTimeout(function() {
                    // Fix for IE : Allow it to render the iframe
                    w.focus();
                    w.print();
                    setTimeout(function() {
                        // Fix for IE
                        if (iframeCount === 0) {
                            // Destroy the iframe if created here
                            $iframe.remove();
                        }
                    }, 100);
                }, 250);
            } catch (e) {
                // Use the pop-up method if iframe fails for some reason
                console.error("Failed to print from iframe", e.stack, e.message);
                w = window.open();
                w.document.write(content);
                w.document.close();
                w.focus();
                w.print();
                w.close();
            }
        } else {
            // Use a new window for printing
            w = window.open();
            w.document.write(content);
            w.document.close();
            w.focus();
            w.print();
            w.close();
        }
        return this;
    };

})(jQuery);

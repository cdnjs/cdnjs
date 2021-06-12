/* @license 
 * jQuery.print, version 1.6.2
 * Licence: CC-By (http://creativecommons.org/licenses/by/3.0/)
 *--------------------------------------------------------------------------*/
(function ($) {
    "use strict";
    // A nice closure for our definitions

    function jQueryCloneWithSelectAndTextAreaValues(elmToClone, withDataAndEvents, deepWithDataAndEvents) {
        // Replacement jQuery clone that also clones the values in selects and textareas as jQuery doesn't for performance reasons - https://stackoverflow.com/questions/742810/clone-isnt-cloning-select-values
        // Based on https://github.com/spencertipping/jquery.fix.clone
        var $elmToClone = $(elmToClone),
            $result           = $elmToClone.clone(withDataAndEvents, deepWithDataAndEvents),
            $myTextareas     = $elmToClone.find('textarea').add($elmToClone.filter('textarea')),
            $resultTextareas = $result.find('textarea').add($result.filter('textarea')),
            $mySelects       = $elmToClone.find('select').add($elmToClone.filter('select')),
            $resultSelects   = $result.find('select').add($result.filter('select')),
            $myCanvas       = $elmToClone.find('canvas').add($elmToClone.filter('canvas')),
            $resultCanvas   = $result.find('canvas').add($result.filter('canvas')),
            i, l, j, m, myCanvasContext;

        for (i = 0, l = $myTextareas.length; i < l; ++i) {
            $($resultTextareas[i]).val($($myTextareas[i]).val());
        }
        for (i = 0, l = $mySelects.length;   i < l; ++i) {
            for (j = 0, m = $mySelects[i].options.length; j < m; ++j) {
                if ($mySelects[i].options[j].selected === true) {
                    $resultSelects[i].options[j].selected = true;
                }
            }
        }
        for (i = 0, l = $myCanvas.length; i < l; ++i) {
            // https://stackoverflow.com/a/41242597
            myCanvasContext = $myCanvas[i].getContext('2d');
            if(myCanvasContext) {
                $resultCanvas[i].getContext('2d').drawImage($myCanvas[i], 0,0);
                $($resultCanvas[i]).attr("data-jquery-print", myCanvasContext.canvas.toDataURL());
            }
        }
        return $result;
    }

    function getjQueryObject(string) {
        // Make string a vaild jQuery thing
        var jqObj = $("");
        try {
            jqObj = jQueryCloneWithSelectAndTextAreaValues(string);
        } catch (e) {
            jqObj = $("<span />")
                .html(string);
        }
        return jqObj;
    }

    function printFrame(frameWindow, content, options) {
        // Print the selected window/iframe
        var def = $.Deferred();
        try {
            frameWindow = frameWindow.contentWindow || frameWindow.contentDocument || frameWindow;
            try {
                frameWindow.resizeTo(window.innerWidth, window.innerHeight);
            } catch (err) {
                console.warn(err);
            }
            var wdoc = frameWindow.document || frameWindow.contentDocument || frameWindow;
            if(options.doctype) {
                wdoc.write(options.doctype);
            }
            wdoc.write(content);
            try {
                var canvas = wdoc.querySelectorAll('canvas');
                for(var i = 0; i < canvas.length; i++) {
                    var ctx = canvas[i].getContext("2d");
                    var image = new Image();
                    image.onload = function() {
                        ctx.drawImage(image, 0, 0);
                    };
                    image.src = canvas[i].getAttribute("data-jquery-print");
                }
            } catch (err) {
                console.warn(err);
            }
            wdoc.close();
            var printed = false,
                callPrint = function () {
                    if(printed) {
                        return;
                    }
                    // Fix for IE : Allow it to render the iframe
                    frameWindow.focus();
                    try {
                        // Fix for IE11 - printng the whole page instead of the iframe content
                        if (!frameWindow.document.execCommand('print', false, null)) {
                            // document.execCommand returns false if it failed -http://stackoverflow.com/a/21336448/937891
                            frameWindow.print();
                        }
                        // focus body as it is losing focus in iPad and content not getting printed
                        $('body').focus();
                    } catch (e) {
                        frameWindow.print();
                    }
                    frameWindow.close();
                    printed = true;
                    def.resolve();
                };
            // Print once the frame window loads - seems to work for the new-window option but unreliable for the iframe
            $(frameWindow).on("load", callPrint);
            // Fallback to printing directly if the frame doesn't fire the load event for whatever reason
            setTimeout(callPrint, options.timeout);
        } catch (err) {
            def.reject(err);
        }
        return def;
    }

    function printContentInIFrame(content, options) {
        var $iframe = $(options.iframe + "");
        var iframeCount = $iframe.length;
        if (iframeCount === 0) {
            // Create a new iFrame if none is given
            $iframe = $('<iframe height="0" width="0" border="0" wmode="Opaque"/>')
                .prependTo('body')
                .css({
                    "position": "absolute",
                    "top": -999,
                    "left": -999
                });
        }
        var frameWindow = $iframe.get(0);
        return printFrame(frameWindow, content, options)
            .done(function () {
                // Success
                setTimeout(function () {
                    // Wait for IE
                    if (iframeCount === 0) {
                        // Destroy the iframe if created here
                        $iframe.remove();
                    }
                }, 1000);
            })
            .fail(function (err) {
                // Use the pop-up method if iframe fails for some reason
                console.error("Failed to print from iframe", err);
                printContentInNewWindow(content, options);
            })
            .always(function () {
                try {
                    options.deferred.resolve();
                } catch (err) {
                    console.warn('Error notifying deferred', err);
                }
            });
    }

    function printContentInNewWindow(content, options) {
        // Open a new window and print selected content
        var frameWindow = window.open();
        return printFrame(frameWindow, content, options)
            .always(function () {
                try {
                    options.deferred.resolve();
                } catch (err) {
                    console.warn('Error notifying deferred', err);
                }
            });
    }

    function isNode(o) {
        /* http://stackoverflow.com/a/384380/937891 */
        return !!(typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
    }
    $.print = $.fn.print = function () {
        // Print a given set of elements
        var options, $this, self = this;
        // console.log("Printing", this, arguments);
        if (self instanceof $) {
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
            globalStyles: true,
            mediaPrint: false,
            stylesheet: null,
            noPrintSelector: ".no-print",
            iframe: true,
            append: null,
            prepend: null,
            manuallyCopyFormValues: true,
            deferred: $.Deferred(),
            timeout: 750,
            title: null,
            doctype: '<!doctype html>'
        };
        // Merge with user-options
        options = $.extend({}, defaults, (options || {}));
        var $styles = $("");
        if (options.globalStyles) {
            // Apply the stlyes from the current sheet to the printed page
            $styles = $("style, link, meta, base, title");
        } else if (options.mediaPrint) {
            // Apply the media-print stylesheet
            $styles = $("link[media=print]");
        }
        if (options.stylesheet) {
            // Add a custom stylesheet(s) if given
            if (!(($.isArray ? $.isArray : Array.isArray)(options.stylesheet))) {
                options.stylesheet = [options.stylesheet]
            }
            for(var i = 0; i < options.stylesheet.length; i++) {
                $styles = $.merge($styles, $('<link rel="stylesheet" href="' + options.stylesheet[i] + '">'));
            }
        }
        // Create a copy of the element to print
        var copy = jQueryCloneWithSelectAndTextAreaValues($this, true, true);
        // Wrap it in a span to get the HTML markup string
        copy = $("<span/>")
            .append(copy);
        // Remove unwanted elements
        copy.find(options.noPrintSelector)
            .remove();
        // Add in the styles
        copy.append(jQueryCloneWithSelectAndTextAreaValues($styles));
        // Update title
        if (options.title) {
            var title = $("title", copy);
            if (title.length === 0) {
                title = $("<title />");
                copy.append(title);                
            }
            title.text(options.title);            
        }
        // Appedned content
        copy.append(getjQueryObject(options.append));
        // Prepended content
        copy.prepend(getjQueryObject(options.prepend));
        if (options.manuallyCopyFormValues) {
            // Manually copy form values into the HTML for printing user-modified input fields
            // http://stackoverflow.com/a/26707753
            copy.find("input")
                .each(function () {
                    var $field = $(this);
                    if ($field.is("[type='radio']") || $field.is("[type='checkbox']")) {
                        if ($field.prop("checked")) {
                            $field.attr("checked", "checked");
                        }
                    } else {
                        $field.attr("value", $field.val());
                    }
                });
            copy.find("select").each(function () {
                var $field = $(this);
                $field.find(":selected").attr("selected", "selected");
            });
            copy.find("textarea").each(function () {
                // Fix for https://github.com/DoersGuild/jQuery.print/issues/18#issuecomment-96451589
                var $field = $(this);
                $field.text($field.val());
            });
        }
        // Get the HTML markup string
        var content = copy.html();
        // Notify with generated markup & cloned elements - useful for logging, etc
        try {
            options.deferred.notify('generated_markup', content, copy);
        } catch (err) {
            console.warn('Error notifying deferred', err);
        }
        // Destroy the copy
        copy.remove();
        if (options.iframe) {
            // Use an iframe for printing
            try {
                printContentInIFrame(content, options);
            } catch (e) {
                // Use the pop-up method if iframe fails for some reason
                console.error("Failed to print from iframe", e.stack, e.message);
                printContentInNewWindow(content, options);
            }
        } else {
            // Use a new window for printing
            printContentInNewWindow(content, options);
        }
        return this;
    };
})(jQuery);

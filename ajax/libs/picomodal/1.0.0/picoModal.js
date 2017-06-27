/**
 * Copyright (c) 2012 James Frasca
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * A self-contained modal library
 */
window.picoModal = (function(window, document) {
    "use strict";

    // Generates observable objects that can be watched and triggered
    var observable = function() {
        var callbacks = [];
        return {
            watch: function(callback) {
                callbacks.push(callback);
            },
            trigger: function() {
                for (var i = 0; i < callbacks.length; i++) {
                    window.setTimeout(callbacks[i], 1);
                }
            }
        };
    };

    // A small interface for creating and managing a dom element
    var make = function( parent ) {

        var elem = document.createElement('div');
        (parent || document.body).appendChild(elem);

        var iface = {

            elem: elem,

            // Creates a child of this node
            child: function () {
                return make(elem);
            },

            // Applies a set of styles to an element
            stylize: function(styles) {
                styles = styles || {};

                if ( typeof styles.opacity !== "undefined" ) {
                    styles.filter =
                        "alpha(opacity=" + (styles.opacity * 100) + ")";
                }

                for (var prop in styles) {
                    if (styles.hasOwnProperty(prop)) {
                        elem.style[prop] = styles[prop];
                    }
                }

                return iface;
            },

            // Adds a class name
            clazz: function (clazz) {
                elem.className += clazz;
                return iface;
            },

            // Sets the HTML
            html: function (content) {
                elem.innerHTML = content;
                return iface;
            },

            // Returns the width of this element
            getWidth: function () {
                return elem.clientWidth;
            },

            // Adds a click handler to this element
            onClick: function(callback) {
                if (elem.attachEvent) {
                    elem.attachEvent('onclick', callback);
                }
                else {
                    elem.addEventListener('click', callback);
                }

                return iface;
            },

            // Removes this element from the DOM
            destroy: function() {
                document.body.removeChild(elem);
                return iface;
            }

        };

        return iface;
    };

    // An interface for generating the grey-out effect
    var overlay = function( getOption ) {

        // The registered on click events
        var clickCallbacks = observable();

        // The overlay element
        var elem = make()
            .clazz("pico-overlay")
            .stylize({
                display: "block",
                position: "fixed",
                top: "0px",
                left: "0px",
                height: "100%",
                width: "100%",
                zIndex: 10000
            })
            .stylize( getOption('overlayStyles', {
                opacity: 0.5,
                background: "#000"
            }) )
            .onClick(clickCallbacks.trigger);

        return {
            elem: elem.elem,
            destroy: elem.destroy,
            onClick: clickCallbacks.watch
        };
    };

    // A function for easily displaying a modal with the given content
    return function(options) {

        if ( typeof options === "string" ) {
            options = { content: options };
        }

        // Returns a named option if it has been explicitly defined. Otherwise,
        // it returns the given default value
        function getOption ( opt, defaultValue ) {
            return options[opt] === void(0) ? defaultValue : options[opt];
        }

        var shadow = overlay( getOption );

        var closeCallbacks = observable();

        var elem = make()
            .clazz("pico-content")
            .stylize({
                display: 'block',
                position: 'fixed',
                zIndex: 10001,
                left: "50%",
                top: "50px"
            })
            .html(options.content);

        var width = getOption('width', elem.getWidth());

        elem
            .stylize({
                width: width + "px",
                margin: "0 0 0 " + (-(width / 2) + "px")
            })
            .stylize( getOption('modalStyles', {
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "5px"
            }) );

        var close = function () {
            closeCallbacks.trigger();
            shadow.destroy();
            elem.destroy();
        };

        if ( getOption('overlayClose', true) ) {
            shadow.onClick(close);
        }

        var closeButton;
        if ( getOption('closeButton', true) ) {
            closeButton = elem.child()
                .html( getOption('closeHtml', "&#xD7;") )
                .clazz("pico-close")
                .stylize( getOption('closeStyles', {
                    borderRadius: "2px",
                    cursor: "pointer",
                    height: "15px",
                    width: "15px",
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    fontSize: "16px",
                    textAlign: "center",
                    lineHeight: "15px",
                    background: "#CCC"
                }) )
                .onClick(close);
        }

        return {
            modalElem: elem.elem,
            closeElem: closeButton ? closeButton.elem : null,
            overlayElem: shadow.elem,
            close: close,
            onClose: closeCallbacks.watch
        };
    };

}(window, document));


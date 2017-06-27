/**
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

(function (root, factory) {
    "use strict";

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
    else {
        root.picoModal = factory();
    }
}(this, function () {

    /**
     * A self-contained modal library
     */
    "use strict";

    /** Returns whether a value is a dom node */
    function isNode(value) {
        if ( typeof Node === "object" ) {
            return value instanceof Node;
        }
        else {
            return value && typeof value === "object" && typeof value.nodeType === "number";
        }
    }

    /** Returns whether a value is a string */
    function isString(value) {
        return typeof value === "string";
    }

    /**
     * Generates observable objects that can be watched and triggered
     */
    function observable() {
        var callbacks = [];
        return {
            watch: callbacks.push.bind(callbacks),
            trigger: function(context, detail) {

                var unprevented = true;
                var event = {
                    detail: detail,
                    preventDefault: function preventDefault () {
                        unprevented = false;
                    }
                };

                for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i](context, event);
                }

                return unprevented;
            }
        };
    }


    /** Whether an element is hidden */
    function isHidden ( elem ) {
        // @see http://stackoverflow.com/questions/19669786
        return window.getComputedStyle(elem).display === 'none';
    }


    /**
     * A small interface for creating and managing a dom element
     */
    function Elem( elem ) {
        this.elem = elem;
    }

    /** Creates a new div */
    Elem.make = function ( parent, tag ) {
        if ( typeof parent === "string" ) {
            parent = document.querySelector(parent);
        }
        var elem = document.createElement(tag || 'div');
        (parent || document.body).appendChild(elem);
        return new Elem(elem);
    };

    Elem.prototype = {

        /** Creates a child of this node */
        child: function (tag) {
            return Elem.make(this.elem, tag);
        },

        /** Applies a set of styles to an element */
        stylize: function(styles) {
            styles = styles || {};

            if ( typeof styles.opacity !== "undefined" ) {
                styles.filter = "alpha(opacity=" + (styles.opacity * 100) + ")";
            }

            for (var prop in styles) {
                if (styles.hasOwnProperty(prop)) {
                    this.elem.style[prop] = styles[prop];
                }
            }

            return this;
        },

        /** Adds a class name */
        clazz: function (clazz) {
            this.elem.className += " " + clazz;
            return this;
        },

        /** Sets the HTML */
        html: function (content) {
            if ( isNode(content) ) {
                this.elem.appendChild( content );
            }
            else {
                this.elem.innerHTML = content;
            }
            return this;
        },

        /** Adds a click handler to this element */
        onClick: function(callback) {
            this.elem.addEventListener('click', callback);
            return this;
        },

        /** Removes this element from the DOM */
        destroy: function() {
            this.elem.parentNode.removeChild(this.elem);
        },

        /** Hides this element */
        hide: function() {
            this.elem.style.display = "none";
        },

        /** Shows this element */
        show: function() {
            this.elem.style.display = "block";
        },

        /** Sets an attribute on this element */
        attr: function ( name, value ) {
            if (value !== undefined) {
                this.elem.setAttribute(name, value);
            }
            return this;
        },

        /** Executes a callback on all the ancestors of an element */
        anyAncestor: function ( predicate ) {
            var elem = this.elem;
            while ( elem ) {
                if ( predicate( new Elem(elem) ) ) {
                    return true;
                }
                else {
                    elem = elem.parentNode;
                }
            }
            return false;
        },

        /** Whether this element is visible */
        isVisible: function () {
            return !isHidden(this.elem);
        }
    };


    /** Generates the grey-out effect */
    function buildOverlay( getOption, close ) {
        return Elem.make( getOption("parent") )
            .clazz("pico-overlay")
            .clazz( getOption("overlayClass", "") )
            .stylize({
                display: "none",
                position: "fixed",
                top: "0px",
                left: "0px",
                height: "100%",
                width: "100%",
                zIndex: 10000
            })
            .stylize(getOption('overlayStyles', {
                opacity: 0.5,
                background: "#000"
            }))
            .onClick(function () {
                if ( getOption('overlayClose', true) ) {
                    close();
                }
            });
    }

    // An auto incrementing ID assigned to each modal
    var autoinc = 1;

    /** Builds the content of a modal */
    function buildModal( getOption, close ) {
        var width = getOption('width', 'auto');
        if ( typeof width === "number" ) {
            width = "" + width + "px";
        }

        var id = getOption("modalId", "pico-" + autoinc++);

        var elem = Elem.make( getOption("parent") )
            .clazz("pico-content")
            .clazz( getOption("modalClass", "") )
            .stylize({
                display: 'none',
                position: 'fixed',
                zIndex: 10001,
                left: "50%",
                top: "38.1966%",
                maxHeight: '90%',
                boxSizing: 'border-box',
                width: width,
                '-ms-transform': 'translate(-50%,-38.1966%)',
                '-moz-transform': 'translate(-50%,-38.1966%)',
                '-webkit-transform': 'translate(-50%,-38.1966%)',
                '-o-transform': 'translate(-50%,-38.1966%)',
                transform: 'translate(-50%,-38.1966%)'
            })
            .stylize(getOption('modalStyles', {
                overflow: 'auto',
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "5px"
            }))
            .html( getOption('content') )
            .attr("id", id)
            .attr("role", "dialog")
            .attr("aria-labelledby", getOption("ariaLabelledBy"))
            .attr("aria-describedby", getOption("ariaDescribedBy", id))
            .onClick(function (event) {
                var isCloseClick = new Elem(event.target).anyAncestor(function (elem) {
                    return /\bpico-close\b/.test(elem.elem.className);
                });
                if ( isCloseClick ) {
                    close();
                }
            });

        return elem;
    }

    /** Builds the close button */
    function buildClose ( elem, getOption ) {
        if ( getOption('closeButton', true) ) {
            return elem.child('button')
                .html( getOption('closeHtml', "&#xD7;") )
                .clazz("pico-close")
                .clazz( getOption("closeClass", "") )
                .stylize( getOption('closeStyles', {
                    borderRadius: "2px",
                    border: 0,
                    padding: 0,
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
                .attr("aria-label", getOption("close-label", "Close"));
        }
    }

    /** Builds a method that calls a method and returns an element */
    function buildElemAccessor( builder ) {
        return function () {
            return builder().elem;
        };
    }


    // An observable that is triggered whenever the escape key is pressed
    var escapeKey = observable();

    // An observable that is triggered when the user hits the tab key
    var tabKey = observable();

    /** A global event handler to detect the escape key being pressed */
    document.documentElement.addEventListener('keydown', function onKeyPress (event) {
        var keycode = event.which || event.keyCode;

        // If this is the escape key
        if ( keycode === 27 ) {
            escapeKey.trigger();
        }

        // If this is the tab key
        else if ( keycode === 9 ) {
            tabKey.trigger(event);
        }
    });


    /** Attaches focus management events */
    function manageFocus ( iface, isEnabled ) {

        /** Whether an element matches a selector */
        function matches ( elem, selector ) {
            var fn = elem.msMatchesSelector || elem.webkitMatchesSelector || elem.matches;
            return fn.call(elem, selector);
        }

        /**
         * Returns whether an element is focusable
         * @see http://stackoverflow.com/questions/18261595
         */
        function canFocus( elem ) {
            if (
                isHidden(elem) ||
                matches(elem, ":disabled") ||
                elem.hasAttribute("contenteditable")
            ) {
                return false;
            }
            else {
                return elem.hasAttribute("tabindex") ||
                    matches(elem, "input,select,textarea,button,a[href],area[href],iframe");
            }
        }

        /** Returns the first descendant that can be focused */
        function firstFocusable ( elem ) {
            var items = elem.getElementsByTagName("*");
            for (var i = 0; i < items.length; i++) {
                if ( canFocus(items[i]) ) {
                    return items[i];
                }
            }
        }

        /** Returns the last descendant that can be focused */
        function lastFocusable ( elem ) {
            var items = elem.getElementsByTagName("*");
            for (var i = items.length; i--;) {
                if ( canFocus(items[i]) ) {
                    return items[i];
                }
            }
        }

        // The element focused before the modal opens
        var focused;

        // Records the currently focused element so state can be returned
        // after the modal closes
        iface.beforeShow(function getActiveFocus() {
            focused = document.activeElement;
        });

        // Shift focus into the modal
        iface.afterShow(function focusModal() {
            if ( isEnabled() ) {
                var focusable = firstFocusable(iface.modalElem());
                if ( focusable ) {
                    focusable.focus();
                }
            }
        });

        // Restore the previously focused element when the modal closes
        iface.afterClose(function returnFocus() {
            if ( isEnabled() && focused ) {
                focused.focus();
            }
            focused = null;
        });

        // Capture tab key presses and loop them within the modal
        tabKey.watch(function tabKeyPress (event) {
            if ( isEnabled() && iface.isVisible() ) {
                var first = firstFocusable(iface.modalElem());
                var last = lastFocusable(iface.modalElem());

                var from = event.shiftKey ? first : last;
                if ( from === document.activeElement ) {
                    (event.shiftKey ? last : first).focus();
                    event.preventDefault();
                }
            }
        });
    }

    /** Manages setting the 'overflow: hidden' on the body tag */
    function manageBodyOverflow(iface, isEnabled) {
        var origOverflow;
        var body = new Elem(document.body);

        iface.beforeShow(function () {
            // Capture the current values so they can be restored
            origOverflow = body.elem.style.overflow;

            if (isEnabled()) {
                body.stylize({ overflow: "hidden" });
            }
        });

        iface.afterClose(function () {
            body.stylize({ overflow: origOverflow });
        });
    }

    /**
     * Displays a modal
     */
    return function picoModal(options) {

        if ( isString(options) || isNode(options) ) {
            options = { content: options };
        }

        var afterCreateEvent = observable();
        var beforeShowEvent = observable();
        var afterShowEvent = observable();
        var beforeCloseEvent = observable();
        var afterCloseEvent = observable();

        /**
         * Returns a named option if it has been explicitly defined. Otherwise,
         * it returns the given default value
         */
        function getOption ( opt, defaultValue ) {
            var value = options[opt];
            if ( typeof value === "function" ) {
                value = value( defaultValue );
            }
            return value === undefined ? defaultValue : value;
        }


        // The various DOM elements that constitute the modal
        var modalElem = build.bind(window, 'modal');
        var shadowElem = build.bind(window, 'overlay');
        var closeElem = build.bind(window, 'close');

        // This will eventually contain the modal API returned to the user
        var iface;


        /** Hides this modal */
        function forceClose (detail) {
            shadowElem().hide();
            modalElem().hide();
            afterCloseEvent.trigger(iface, detail);
        }

        /** Gracefully hides this modal */
        function close (detail) {
            if ( beforeCloseEvent.trigger(iface, detail) ) {
                forceClose(detail);
            }
        }

        /** Wraps a method so it returns the modal interface */
        function returnIface ( callback ) {
            return function () {
                callback.apply(this, arguments);
                return iface;
            };
        }


        // The constructed dom nodes
        var built;

        /** Builds a method that calls a method and returns an element */
        function build (name, detail) {
            if ( !built ) {
                var modal = buildModal(getOption, close);
                built = {
                    modal: modal,
                    overlay: buildOverlay(getOption, close),
                    close: buildClose(modal, getOption)
                };
                afterCreateEvent.trigger(iface, detail);
            }
            return built[name];
        }

        iface = {

            /** Returns the wrapping modal element */
            modalElem: buildElemAccessor(modalElem),

            /** Returns the close button element */
            closeElem: buildElemAccessor(closeElem),

            /** Returns the overlay element */
            overlayElem: buildElemAccessor(shadowElem),

            /** Builds the dom without showing the modal */
            buildDom: returnIface(build.bind(null, null)),

            /** Returns whether this modal is currently being shown */
            isVisible: function () {
                return !!(built && modalElem && modalElem().isVisible());
            },

            /** Shows this modal */
            show: function (detail) {
                if ( beforeShowEvent.trigger(iface, detail) ) {
                    shadowElem().show();
                    closeElem();
                    modalElem().show();
                    afterShowEvent.trigger(iface, detail);
                }
                return this;
            },

            /** Hides this modal */
            close: returnIface(close),

            /**
             * Force closes this modal. This will not call beforeClose
             * events and will just immediately hide the modal
             */
            forceClose: returnIface(forceClose),

            /** Destroys this modal */
            destroy: function () {
                modalElem().destroy();
                shadowElem().destroy();
                shadowElem = modalElem = closeElem = undefined;
            },

            /**
             * Updates the options for this modal. This will only let you
             * change options that are re-evaluted regularly, such as
             * `overlayClose`.
             */
            options: function ( opts ) {
                Object.keys(opts).map(function (key) {
                    options[key] = opts[key];
                });
            },

            /** Executes after the DOM nodes are created */
            afterCreate: returnIface(afterCreateEvent.watch),

            /** Executes a callback before this modal is closed */
            beforeShow: returnIface(beforeShowEvent.watch),

            /** Executes a callback after this modal is shown */
            afterShow: returnIface(afterShowEvent.watch),

            /** Executes a callback before this modal is closed */
            beforeClose: returnIface(beforeCloseEvent.watch),

            /** Executes a callback after this modal is closed */
            afterClose: returnIface(afterCloseEvent.watch)
        };

        manageFocus(iface, getOption.bind(null, "focus", true));

        manageBodyOverflow(iface, getOption.bind(null, "bodyOverflow", true));

        // If a user presses the 'escape' key, close the modal.
        escapeKey.watch(function escapeKeyPress () {
            if ( getOption("escCloses", true) && iface.isVisible() ) {
                iface.close();
            }
        });

        return iface;
    };

}));

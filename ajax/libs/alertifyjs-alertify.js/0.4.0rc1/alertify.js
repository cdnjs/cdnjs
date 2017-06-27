/*!
 * alertify.js
 * browser dialogs never looked so good
 *
 * @author Fabien Doiron <fabien.doiron@gmail.com>
 * @copyright Fabien Doiron 2013
 * @license MIT <http://opensource.org/licenses/mit-license.php>
 * @link http://fabien-d.github.com/alertify.js/
 * @module alertify
 * @version 0.4.0rc1
 */
(function (global, document, undefined) {
var AlertifyProto = (function () {
    

    var AlertifyProto,
        add,
        attach;

    /**
     * Add
     * Update bind and unbind method for browser
     * that support add/removeEventListener
     *
     * @return {undefined}
     */
    add = function () {
        this.on = function (el, event, fn) {
            el.addEventListener(event, fn, false);
        };
        this.off = function (el, event, fn) {
            el.removeEventListener(event, fn, false);
        };
    };

    /**
     * Attach
     * Update bind and unbind method for browser
     * that support attach/detachEvent
     *
     * @return {undefined}
     */
    attach = function () {
        this.on = function (el, event, fn) {
            el.attachEvent("on" + event, fn);
        };
        this.off = function (el, event, fn) {
            el.detachEvent("on" + event, fn);
        };
    };

    /**
     * Alertify Prototype API
     *
     * @type {Object}
     */
    AlertifyProto = {
        _version : "0.4.0",
        _prefix  : "alertify",
        get: function (id) {
            return document.getElementById(id);
        },
        on: function (el, event, fn) {
            if (typeof el.addEventListener === "function") {
                el.addEventListener(event, fn, false);
                add.call(this);
            } else if (el.attachEvent) {
                el.attachEvent("on" + event, fn);
                attach.call(this);
            }
        },
        off: function (el, event, fn) {
            if (typeof el.removeEventListener === "function") {
                el.removeEventListener(event, fn, false);
                add.call(this);
            } else if (el.detachEvent) {
                el.detachEvent("on" + event, fn);
                attach.call(this);
            }
        }
    };

    return AlertifyProto;
}());
var Alertify = (function () {
    

    var Alertify = function () {};
    Alertify.prototype = AlertifyProto;
    Alertify = new Alertify();

    return Alertify;
}());
var validate = (function () {
    

    var _checkValidation,
        validate;

    /**
     * Validate Parameters
     * The validation checks parameter against specified type.
     * If the parameter is set to optional, is will be valid unless
     * a parameter is specified and does not pass the test
     *
     * @param  {String}  type     Type to check parameter against
     * @param  {Mixed}   param    Parameter to check
     * @param  {Boolean} optional [Optional] Whether the parameter is optional
     * @return {Boolean}
     */
    _checkValidation = function (type, param, optional) {
        var valid = false;
        if (optional && typeof param === "undefined") {
            valid = true;
        } else {
            if (type === "object") {
                valid = (typeof param === "object" && !(param instanceof Array));
            } else {
                valid = (typeof param === type);
            }
        }
        return valid;
    };

    /**
     * Validate API
     *
     * @type {Object}
     */
    validate = {
        messages: {
            invalidArguments: "Invalid arguments"
        },
        isFunction: function (param, optional) {
            return _checkValidation("function", param, optional);
        },
        isNumber: function (param, optional) {
            return _checkValidation("number", param, optional);
        },
        isObject: function (param, optional) {
            return _checkValidation("object", param, optional);
        },
        isString: function (param, optional) {
            return _checkValidation("string", param, optional);
        },
    };

    return validate;
}());
var element = (function () {
    

    var element = {},
        setAttributes;

    /**
     * Set Attributes
     * Add attributes to a created element
     *
     * @param {Object} el     Created DOM element
     * @param {Object} params [Optional] Attributes object
     * @return {Object}
     */
    setAttributes = function (el, params) {
        var k;
        if (!validate.isObject(el) ||
            !validate.isObject(params, true)) {
            throw new Error(validate.messages.invalidArguments);
        }
        if (typeof params !== "undefined") {
            if (params.attributes) {
                for (k in params.attributes) {
                    if (params.attributes.hasOwnProperty(k)) {
                        el.setAttribute(k, params.attributes[k]);
                    }
                }
            }
            if (params.classes) {
                el.className = params.classes;
            }
        }
        return el;
    };

    /**
     * element API
     *
     * @type {Object}
     */
    element = {
        create: function (type, params) {
            var el;
            if (!validate.isString(type) ||
                !validate.isObject(params, true)) {
                throw new Error(validate.messages.invalidArguments);
            }

            el = document.createElement(type);
            el = setAttributes(el, params);
            return el;
        },
        ready: function (el) {
            if (!validate.isObject(el)) {
                throw new Error(validate.messages.invalidArguments);
            }
            if (el && el.scrollTop !== null) {
                return;
            } else {
                this.ready();
            }
        }
    };

    return element;
}());
var transition = (function () {
    

    var transition;

    /**
     * Transition
     * Determines if current browser supports CSS transitions
     * And if so, assigns the proper transition event
     *
     * @return {Object}
     */
    transition = function () {
        var t,
            type,
            supported   = false,
            el          = element.create("fakeelement"),
            transitions = {
                "WebkitTransition" : "webkitTransitionEnd",
                "MozTransition"    : "transitionend",
                "OTransition"      : "otransitionend",
                "transition"       : "transitionend"
            };

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                type      = transitions[t];
                supported = true;
                break;
            }
        }

        return {
            type      : type,
            supported : supported
        };
    };

    return transition();
}());
var keys = (function () {
    

    var keys = {
        ENTER : 13,
        ESC   : 27,
        SPACE : 32
    };

    return keys;
}());
var Dialog = (function () {
    

    var dialog,
        _dialog = {};

    var Dialog = function () {
        var controls     = {},
            dialog       = {},
            isOpen       = false,
            queue        = [],
            tpl          = {},
            prefixEl     = Alertify._prefix + "-dialog",
            prefixCover  = Alertify._prefix + "-cover",
            clsElShow    = prefixEl + " is-" + prefixEl + "-showing",
            clsElHide    = prefixEl + " is-" + prefixEl + "-hidden",
            clsCoverShow = prefixCover + " is-" + prefixCover + "-showing",
            clsCoverHide = prefixCover + " is-" + prefixCover + "-hidden",
            elCallee,
            $,
            appendBtns,
            addListeners,
            build,
            hide,
            init,
            onBtnCancel,
            onBtnOK,
            onBtnResetFocus,
            onFormSubmit,
            onKeyUp,
            open,
            removeListeners,
            setFocus,
            setup;

        tpl = {
            buttons : {
                holder : "<nav class=\"alertify-buttons\">{{buttons}}</nav>",
                submit : "<button role=\"button\" type=\"submit\" class=\"alertify-button alertify-button-ok\" id=\"alertify-ok\">{{ok}}</button>",
                ok     : "<button role=\"button\" type=\"button\" class=\"alertify-button alertify-button-ok\" id=\"alertify-ok\">{{ok}}</button>",
                cancel : "<button role=\"button\" type=\"button\" class=\"alertify-button alertify-button-cancel\" id=\"alertify-cancel\">{{cancel}}</button>"
            },
            input   : "<div class=\"alertify-text-wrapper\"><input type=\"text\" class=\"alertify-text\" id=\"alertify-text\"></div>",
            message : "<p class=\"alertify-message\">{{message}}</p>",
            log     : "<article class=\"alertify-log{{class}}\">{{message}}</article>"
        };

        addListeners = function (item) {
            // ok event handler
            onBtnOK = function (event) {
                var val = "";
                if (typeof event.preventDefault !== "undefined") {
                    event.preventDefault();
                }
                removeListeners();
                hide();

                if (controls.input) {
                    val = controls.input.value;
                }
                if (typeof item.accept === "function") {
                    if (controls.input) {
                        item.accept(val);
                    } else {
                        item.accept();
                    }
                }
                return false;
            };

            // cancel event handler
            onBtnCancel = function (event) {
                if (typeof event.preventDefault !== "undefined") {
                    event.preventDefault();
                }
                removeListeners();
                hide();
                if (typeof item.deny === "function") {
                    item.deny();
                }
                return false;
            };

            // keyup handler
            onKeyUp = function (event) {
                var keyCode = event.keyCode;
                if (keyCode === keys.SPACE && !controls.input) {
                    onBtnOK(event);
                }
                if (keyCode === keys.ESC && controls.cancel) {
                    onBtnCancel(event);
                }
            };

            // reset focus to first item in the dialog
            onBtnResetFocus = function (event) {
                if (controls.input) {
                    controls.input.focus();
                } else if (controls.cancel) {
                    controls.cancel.focus();
                } else {
                    controls.ok.focus();
                }
            };

            // handle reset focus link
            // this ensures that the keyboard focus does not
            // ever leave the dialog box until an action has
            // been taken
            Alertify.on(controls.reset, "focus", onBtnResetFocus);
            // handle OK click
            if (controls.ok) {
                Alertify.on(controls.ok, "click", onBtnOK);
            }
            // handle Cancel click
            if (controls.cancel) {
                Alertify.on(controls.cancel, "click", onBtnCancel);
            }
            // listen for keys, Cancel => ESC
            Alertify.on(document.body, "keyup", onKeyUp);
            // bind form submit
            if (controls.form) {
                Alertify.on(controls.form, "submit", onBtnOK);
            }
            if (!transition.supported) {
                setFocus();
            }
        };

        /**
         * Append Buttons
         * Insert the buttons in the proper order
         *
         * @param  {String} secondary Cancel button string
         * @param  {String} primary   OK button string
         * @return {String}
         */
        appendBtns = function (secondary, primary) {
            return dialog.buttonReverse ? primary + secondary : secondary + primary;
        };

        build = function (item) {
            var html    = "",
                type    = item.type,
                message = item.message;

            html += "<div class=\"alertify-dialog-inner\">";

            if (dialog.buttonFocus === "none") {
                html += "<a href=\"#\" id=\"alertify-noneFocus\" class=\"alertify-hidden\"></a>";
            }

            if (type === "prompt") {
                html += "<form id=\"alertify-form\">";
            }

            html += "<article class=\"alertify-inner\">";
            html += tpl.message.replace("{{message}}", message);

            if (type === "prompt") {
                html += tpl.input;
            }

            html += tpl.buttons.holder;
            html += "</article>";

            if (type === "prompt") {
                html += "</form>";
            }

            html += "<a id=\"alertify-resetFocus\" class=\"alertify-resetFocus\" href=\"#\">Reset Focus</a>";
            html += "</div>";

            switch (type) {
            case "confirm":
                html = html.replace("{{buttons}}", appendBtns(tpl.buttons.cancel, tpl.buttons.ok));
                html = html.replace("{{ok}}", dialog.labels.ok).replace("{{cancel}}", dialog.labels.cancel);
                break;
            case "prompt":
                html = html.replace("{{buttons}}", appendBtns(tpl.buttons.cancel, tpl.buttons.submit));
                html = html.replace("{{ok}}", dialog.labels.ok).replace("{{cancel}}", dialog.labels.cancel);
                break;
            case "alert":
                html = html.replace("{{buttons}}", tpl.buttons.ok);
                html = html.replace("{{ok}}", dialog.labels.ok);
                break;
            }

            return html;
        };

        hide = function () {
            var transitionDone;
            queue.splice(0,1);
            if (queue.length > 0) {
                open(true);
            } else {
                isOpen = false;
                transitionDone = function (event) {
                    event.stopPropagation();
                    //this.className += " alertify-isHidden";
                    Alertify.off(this, transition.type, transitionDone);
                };
                if (transition.supported) {
                    Alertify.on(dialog.el, transition.type, transitionDone);
                    dialog.el.className = clsElHide;
                } else {
                    dialog.el.className = clsElHide;
                }
                dialog.cover.className  = clsCoverHide;
                elCallee.focus();
            }
        };

        /**
         * Initialize Dialog
         * Create the dialog and cover elements
         *
         * @return {Object}
         */
        init = function () {
            var cover = element.create("div", { classes: clsCoverHide }),
                el    = element.create("section", { classes: clsElHide });

            document.body.appendChild(cover);
            document.body.appendChild(el);
            element.ready(cover);
            element.ready(el);
            dialog.cover = cover;
            return el;
        };

        open = function (fromQueue) {
            var item = queue[0],
                onTransitionEnd;

            isOpen = true;

            onTransitionEnd = function (event) {
                event.stopPropagation();
                setFocus();
                Alertify.off(this, transition.type, onTransitionEnd);
            };

            if (transition.supported && !fromQueue) {
                Alertify.on(dialog.el, transition.type, onTransitionEnd);
            }
            dialog.el.innerHTML    = build(item);
            dialog.cover.className = clsCoverShow;
            dialog.el.className    = clsElShow;

            controls.reset  = Alertify.get("alertify-resetFocus");
            controls.ok     = Alertify.get("alertify-ok")     || undefined;
            controls.cancel = Alertify.get("alertify-cancel") || undefined;
            controls.focus  = (dialog.buttonFocus === "cancel" && controls.cancel) ? controls.cancel : ((dialog.buttonFocus === "none") ? Alertify.get("alertify-noneFocus") : controls.ok),
            controls.input  = Alertify.get("alertify-text")   || undefined;
            controls.form   = Alertify.get("alertify-form")   || undefined;

            if (typeof item.placeholder === "string" && item.placeholder !== "") {
                controls.input.value = item.placeholder;
            }

            if (fromQueue) {
                setFocus();
            }
            addListeners(item);
        };

        /**
         * Remove Event Listeners
         *
         * @return {undefined}
         */
        removeListeners = function () {
            Alertify.off(document.body, "keyup", onKeyUp);
            Alertify.off(controls.reset, "focus", onBtnResetFocus);
            if (controls.input) {
                Alertify.off(controls.form, "submit", onFormSubmit);
            }
            if (controls.ok) {
                Alertify.off(controls.ok, "click", onBtnOK);
            }
            if (controls.cancel) {
                Alertify.off(controls.cancel, "click", onBtnCancel);
            }
        };

        /**
         * Set Focus
         * Set focus to proper element
         *
         * @return {undefined}
         */
        setFocus = function () {
            if (controls.input) {
                controls.input.focus();
                controls.input.select();
            } else {
                controls.focus.focus();
            }
        };

        /**
         * Setup Dialog
         *
         * @param  {String} type        Dialog type
         * @param  {String} msg         Dialog message
         * @param  {Function} accept    [Optional] Accept callback
         * @param  {Function} deny      [Optional] Deny callback
         * @param  {String} placeholder [Optional] Input placeholder text
         * @return {undefined}
         */
        setup = function (type, msg, accept, deny, placeholder) {
            if (!validate.isString(type)          ||
                !validate.isString(msg)           ||
                !validate.isFunction(accept,true) ||
                !validate.isFunction(deny,true)   ||
                !validate.isString(placeholder, true)) {
                throw new Error(validate.messages.invalidArguments);
            }
            dialog.el = dialog.el || init();
            elCallee = document.activeElement;

            queue.push({
                type        : type,
                message     : msg,
                accept      : accept,
                deny        : deny,
                placeholder : placeholder
            });

            if (!isOpen) {
                open();
            }
        };

        return {
            buttonFocus   : "ok",
            buttonReverse : false,
            cover         : undefined,
            el            : undefined,
            labels: {
                ok: "OK",
                cancel: "Cancel"
            },
            alert: function (msg, accept) {
                dialog = this;
                setup("alert", msg, accept);
                return this;
            },
            confirm: function (msg, accept, deny) {
                dialog = this;
                setup("confirm", msg, accept, deny);
                return this;
            },
            prompt: function (msg, accept, deny, placeholder) {
                dialog = this;
                setup("prompt", msg, accept, deny, placeholder);
                return this;
            }
        };
    };

    return new Dialog();
}());
var Log = (function () {
    

    var Log,
        onTransitionEnd,
        remove,
        startTimer,
        prefix  = Alertify._prefix + "-log",
        clsShow = prefix + " is-" + prefix + "-showing",
        clsHide = prefix + " is-" + prefix + "-hidden";

    /**
     * Log Method
     *
     * @param {Object} parent HTML DOM to insert log message into
     * @param {String} type   Log type
     * @param {String} msg    Log message
     * @param {Number} delay  [Optional] Delay in ms
     */
    Log = function (parent, type, msg, delay) {
        if (!validate.isObject(parent) ||
            !validate.isString(type) ||
            !validate.isString(msg) ||
            !validate.isNumber(delay, true)) {
            throw new Error(validate.messages.invalidArguments);
        }

        this.delay  = (typeof delay !== "undefined") ? delay : 5000;
        this.msg    = msg;
        this.parent = parent;
        this.type   = type;
        this.create();
        this.show();
    };

    /**
     * Transition End
     * Handle CSS transition end
     *
     * @param  {Event} event Event
     * @return {undefined}
     */
    onTransitionEnd = function (event) {
        event.stopPropagation();
        if (typeof this.el !== "undefined") {
            Alertify.off(this.el, transition.type, this.fn);
            remove.call(this);
        }
    };

    /**
     * Remove
     * Remove the element from the DOM
     *
     * @return {undefined}
     */
    remove = function () {
        this.parent.removeChild(this.el);
        delete this.el;
    };

    /**
     * StartTimer
     *
     * @return {undefined}
     */
    startTimer = function () {
        var that = this;
        if (this.delay !== 0) {
            setTimeout(function () {
                that.close();
            }, this.delay);
        }
    };

    /**
     * Close
     * Prepare the log element to be removed.
     * Set an event listener for transition complete
     * or call the remove directly
     *
     * @return {undefined}
     */
    Log.prototype.close = function () {
        var that = this;
        if (typeof this.el !== "undefined" && this.el.parentNode === this.parent) {
            if (transition.supported) {
                this.fn = function (event) {
                    onTransitionEnd.call(that, event);
                };
                Alertify.on(this.el, transition.type, this.fn);
                this.el.className = clsHide + " " + prefix + "-" + this.type;
            } else {
                remove.call(this);
            }
        }
    };

    /**
     * Create
     * Create a new log element and
     * append it to the parent
     *
     * @return {undefined}
     */
    Log.prototype.create = function () {
        if (typeof this.el === "undefined") {
            var el = element.create("article", {
                classes: clsHide + " " + prefix + "-" + this.type
            });
            el.innerHTML = this.msg;
            this.parent.appendChild(el);
            element.ready(el);
            this.el = el;
        }
    };

    /**
     * Show
     * Show new log element and bind click listener
     *
     * @return {undefined}
     */
    Log.prototype.show = function () {
        var that = this;
        if (typeof this.el === "undefined") {
            return;
        }
        Alertify.on(this.el, "click", function () {
            that.close();
        });
        this.el.className = clsShow + " " + prefix + "-" + this.type;
        startTimer.call(this);
    };

    return Log;
}());
var logs = (function () {
    

    var init,
        createLog,
        validateParams,
        logs;

    /**
     * Init Method
     * Create the log holder element
     *
     * @return {Object} Log holder element
     */
    init = function () {
        var el = element.create("section", { classes: Alertify._prefix + "-logs" });
        document.body.appendChild(el);
        element.ready(el);
        return el;
    };

    /**
     * Create Log
     *
     * @param  {String} type  Log type
     * @param  {String} msg   Log message
     * @param  {Number} delay [Optional] Delay in ms
     * @return {Object}
     */
    createLog = function (type, msg, delay) {
        validateParams(type, msg, delay);
        this.el = this.el || init();
        return new Log(this.el, type, msg, delay);
    };

    /**
     * Validate Parameters
     *
     * @param  {String} type  Log type
     * @param  {String} msg   Log message
     * @param  {Number} delay [Optional] Delay in ms
     * @return {undefined}
     */
    validateParams = function (type, msg, delay) {
        if (!validate.isString(type) ||
            !validate.isString(msg) ||
            !validate.isNumber(delay, true)) {
            throw new Error(validate.messages.invalidArguments);
        }
    };

    /**
     * Logs API
     *
     * @type {Object}
     */
    logs = {
        delay : 5000,
        el    : undefined,
        create: function (type, msg, delay) {
            return createLog.call(this, type, msg, delay);
        },
        error: function (msg, delay) {
            return createLog.call(this, "error", msg, delay);
        },
        info: function (msg, delay) {
            return createLog.call(this, "info", msg, delay);
        },
        success: function (msg, delay) {
            return createLog.call(this, "success", msg, delay);
        }
    };

    return logs;
}());

    Alertify.dialog = Dialog;
    Alertify.log    = logs;
    window.Alertify = Alertify;


})(this, document);
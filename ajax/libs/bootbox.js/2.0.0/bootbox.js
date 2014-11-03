var bootbox = window.bootbox || (function() {

    var _locale = _defaultLocale = 'en',
        _animate = true,
        that = {};

    /**
     * standard locales. Please add more according to ISO 639-1 standard. Multiple language variants are
     * unlikely to be required. If this gets too large it can be split out into separate JS files.
     */
    var _locales = {
        'en' : {
            OK      : 'OK',
            CANCEL  : 'Cancel',
            CONFIRM : 'OK'
        },
        'fr' : {
            OK      : 'OK',
            CANCEL  : 'Annuler',
            CONFIRM : 'D\'accord'
        },
        'de' : {
            OK      : 'OK',
            CANCEL  : 'Abbrechen',
            CONFIRM : 'Akzeptieren'
        },
        'es' : {
            OK      : 'OK',
            CANCEL  : 'Cancelar',
            CONFIRM : 'Aceptar'
        },
        'br' : {
            OK      : 'OK',
            CANCEL  : 'Cancelar',
            CONFIRM : 'Sim'
        }
    };

    function _translate(str, locale) {
        // we assume if no target locale is probided then we should take it from current setting
        if (locale == null) {
            locale = _locale;
        }
        if (typeof _locales[locale][str] == 'string') {
            return _locales[locale][str];
        }

        // if we couldn't find a lookup then try and fallback to a default translation

        if (locale != _defaultLocale) {
            return _translate(str, _defaultLocale);
        }

        // if we can't do anything then bail out with whatever string was passed in - last resort
        return str;
    }

    that.setLocale = function(locale) {
        for (var i in _locales) {
            if (i == locale) {
                _locale = locale;
                return;
            }
        }
        throw new Error('Invalid locale: '+locale);
    }

    that.addLocale = function(locale, translations) {
        if (typeof _locales[locale] == 'undefined') {
            _locales[locale] = {};
        }
        for (var str in translations) {
            _locales[locale][str] = translations[str];
        }
    }

    that.alert = function(/*str, label, cb*/) {
        var str = "";
        var label = _translate('OK');
        var cb = null;

        switch (arguments.length) {
            case 1:
                str = arguments[0];
                break;
            case 2:
                str = arguments[0];
                if (typeof arguments[1] == 'function') {
                    cb = arguments[1];
                } else {
                    label = arguments[1];
                }
                break;
            case 3:
                str = arguments[0];
                label = arguments[1];
                cb = arguments[2];
                break;
            default:
                throw new Error("Incorrect number of arguments: expected 1-3");
                break;
        }

        return that.dialog(str, {
            "label": label,
            "callback": cb
        }, {
            "onEscape": cb
        });
    }

    that.confirm = function(/*str, labelCancel, labelOk, cb*/) {
        var str = "";
        var labelCancel = _translate('CANCEL');
        var labelOk = _translate('CONFIRM');
        var cb = null;

        switch (arguments.length) {
            case 1:
                str = arguments[0];
                break;
            case 2:
                str = arguments[0];
                if (typeof arguments[1] == 'function') {
                    cb = arguments[1];
                } else {
                    labelCancel = arguments[1];
                }
                break;
            case 3:
                str = arguments[0];
                labelCancel = arguments[1];
                if (typeof arguments[2] == 'function') {
                    cb = arguments[2];
                } else {
                    labelOk = arguments[2];
                }
                break;
            case 4:
                str = arguments[0];
                labelCancel = arguments[1];
                labelOk = arguments[2];
                cb = arguments[3];
                break;
            default:
                throw new Error("Incorrect number of arguments: expected 1-4");
                break;
        }

        return that.dialog(str, [{
            "label": labelCancel,
            "callback": function() {
                if (typeof cb == 'function') {
                    cb(false);
                }
            }
        }, {
            "label": labelOk,
            "callback": function() {
                if (typeof cb == 'function') {
                    cb(true);
                }
            }
        }]);
    }

    that.modal = function(/*str, label, options*/) {
        var str;
        var label;
        var options;

        var defaultOptions = {
            "onEscape": null,
            "keyboard": true,
            "backdrop": true
        };

        switch (arguments.length) {
            case 1:
                str = arguments[0];
                break;
            case 2:
                str = arguments[0];
                if (typeof arguments[1] == 'object') {
                    options = arguments[1];
                } else {
                    label = arguments[1];
                }
                break;
            case 3:
                str = arguments[0];
                label = arguments[1];
                options = arguments[2];
                break;
            default:
                throw new Error("Incorrect number of arguments: expected 1-3");
                break;
        }

        defaultOptions['header'] = label;

        if (typeof options == 'object') {
            options = $.extend(defaultOptions, options);
        } else {
            options = defaultOptions;
        }

        return that.dialog(str, [], options);
    }

    that.dialog = function(str, handlers, options) {
        var hideSource = null;
        var buttons = "";
        var callbacks = [];
        var options = options || {};

        // check for single object and convert to array if necessary
        if (handlers == null) {
            handlers = [];
        } else if (typeof handlers.length == 'undefined') {
            handlers = [handlers];
        }

        var i = handlers.length;
        while (i--) {
            var label = null;
            var _class = null;
            var callback = null;

            if (typeof handlers[i]['label']    == 'undefined' &&
                typeof handlers[i]['class']    == 'undefined' &&
                typeof handlers[i]['callback'] == 'undefined') {
                // if we've got nothing we expect, check for condensed format
                var propCount = 0;      // condensed will only match if this == 1
                var property = null;    // save the last property we found
                for (var j in handlers[i]) {
                    property = j;
                    propCount ++;
                    if (propCount > 1) {
                        // forget it, too many properties
                        break;
                    }
                }

                if (propCount == 1 && typeof handlers[i][j] == 'function') {
                    // matches condensed format of label -> function
                    handlers[i]['label']    = property;
                    handlers[i]['callback'] = handlers[i][j];
                }
            }

            if (typeof handlers[i]['callback']== 'function') {
                callback = handlers[i]['callback'];
            }

            if (handlers[i]['class']) {
                _class = handlers[i]['class'];
            } else if (i == handlers.length -1 && handlers.length <= 2) {
                // always add a primary to the main option in a two-button dialog
                _class = 'btn-primary';
            }

            if (handlers[i]['label']) {
                label = handlers[i]['label'];
            } else {
                label = "Option "+(i+1);
            }

            buttons += "<a data-handler='"+i+"' class='btn "+_class+"' href='#'>"+label+"</a>";

            callbacks[i] = callback;
        }

        var parts = ["<div class='bootbox modal'>"];

        if (options['header']) {
            var closeButton = '';
            if (typeof options['headerCloseButton'] == 'undefined' || options['headerCloseButton']) {
                closeButton = "<a href='#' class='close'>&times;</a>";
            }

            parts.push("<div class='modal-header'>"+closeButton+"<h3>"+options['header']+"</h3></div>");
        }

        // push an empty body into which we'll inject the proper content later
        parts.push("<div class='modal-body'></div>");

        if (buttons) {
            parts.push("<div class='modal-footer'>"+buttons+"</div>")
        }

        parts.push("</div>");

        var div = $(parts.join("\n"));

        // check whether we should fade in/out
        var shouldFade = (typeof options.animate === 'undefined') ? _animate : options.animate;

        if (shouldFade) {
            div.addClass("fade");
        }

        // now we've built up the div properly we can inject the content whether it was a string or a jQuery object
        $(".modal-body", div).html(str);

        div.bind('hidden', function() {
            div.remove();
        });

        div.bind('hide', function() {
            if (hideSource == 'escape' &&
                typeof options.onEscape == 'function') {
                options.onEscape();
            }
        });

        // hook into the modal's keyup trigger to check for the escape key
        $(document).bind('keyup.modal', function ( e ) {
            if (e.which == 27) {
                hideSource = 'escape';
            }
        });

        // well, *if* we have a primary - give the last dom element (first displayed) focus
        div.bind('shown', function() {
            $("a.btn-primary:last", div).focus();
        });

        $("a", div).click(function(e) {
            e.preventDefault();
            hideSource = 'button';
            div.modal("hide");
            var handler = $(this).data("handler");
            var cb = callbacks[handler];
            if (typeof cb == 'function') {
                cb();
            }
        });

        if (options.keyboard == null) {
            options.keyboard = (typeof options.onEscape == 'function');
        }
        $("body").append(div);

        div.modal({
            "backdrop" : options.backdrop || true,
            "keyboard" : options.keyboard
        });

        return div;
    }

    that.hideAll = function() {
        $(".bootbox").modal("hide");
    }

    that.animate = function(animate) {
        _animate = animate;
    }

    return that;
})();

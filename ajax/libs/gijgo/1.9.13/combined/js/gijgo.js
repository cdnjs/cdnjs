/*
 * Gijgo JavaScript Library v1.9.13
 * http://gijgo.com/
 *
 * Copyright 2014, 2019 gijgo.com
 * Released under the MIT license
 */
var gj = {};

gj.widget = function () {
    var self = this;

    self.xhr = null;

    self.generateGUID = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    self.mouseX = function (e) {
        if (e) {
            if (e.pageX) {
                return e.pageX;
            } else if (e.clientX) {
                return e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            } else if (e.touches && e.touches.length) {
                return e.touches[0].pageX;
            } else if (e.changedTouches && e.changedTouches.length) {
                return e.changedTouches[0].pageX;
            } else if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length) {
                return e.originalEvent.touches[0].pageX;
            } else if (e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                return e.originalEvent.touches[0].pageX;
            }
        }
        return null;
    };

    self.mouseY = function (e) {
        if (e) {
            if (e.pageY) {
                return e.pageY;
            } else if (e.clientY) {
                return e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
            } else if (e.touches && e.touches.length) {
                return e.touches[0].pageY;
            } else if (e.changedTouches && e.changedTouches.length) {
                return e.changedTouches[0].pageY;
            } else if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length) {
                return e.originalEvent.touches[0].pageY;
            } else if (e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                return e.originalEvent.touches[0].pageY;
            }
        }
        return null;
    };
};

gj.widget.prototype.init = function (jsConfig, type) {
    var option, clientConfig, fullConfig;

    this.attr('data-type', type);
    clientConfig = $.extend(true, {}, this.getHTMLConfig() || {});
    $.extend(true, clientConfig, jsConfig || {});
    fullConfig = this.getConfig(clientConfig, type);
    this.attr('data-guid', fullConfig.guid);
    this.data(fullConfig);

    // Initialize events configured as options
    for (option in fullConfig) {
        if (gj[type].events.hasOwnProperty(option)) {
            this.on(option, fullConfig[option]);
            delete fullConfig[option];
        }
    }

    // Initialize all plugins
    for (plugin in gj[type].plugins) {
        if (gj[type].plugins.hasOwnProperty(plugin)) {
            gj[type].plugins[plugin].configure(this, fullConfig, clientConfig);
        }
    }

    return this;
};

gj.widget.prototype.getConfig = function (clientConfig, type) {
    var config, uiLibrary, iconsLibrary, plugin;

    config = $.extend(true, {}, gj[type].config.base);

    uiLibrary = clientConfig.hasOwnProperty('uiLibrary') ? clientConfig.uiLibrary : config.uiLibrary;
    if (gj[type].config[uiLibrary]) {
        $.extend(true, config, gj[type].config[uiLibrary]);
    }

    iconsLibrary = clientConfig.hasOwnProperty('iconsLibrary') ? clientConfig.iconsLibrary : config.iconsLibrary;
    if (gj[type].config[iconsLibrary]) {
        $.extend(true, config, gj[type].config[iconsLibrary]);
    }

    for (plugin in gj[type].plugins) {
        if (gj[type].plugins.hasOwnProperty(plugin)) {
            $.extend(true, config, gj[type].plugins[plugin].config.base);
            if (gj[type].plugins[plugin].config[uiLibrary]) {
                $.extend(true, config, gj[type].plugins[plugin].config[uiLibrary]);
            }
            if (gj[type].plugins[plugin].config[iconsLibrary]) {
                $.extend(true, config, gj[type].plugins[plugin].config[iconsLibrary]);
            }
        }
    }

    $.extend(true, config, clientConfig);

    if (!config.guid) {
        config.guid = this.generateGUID();
    }

    return config;
}

gj.widget.prototype.getHTMLConfig = function () {
    var result = this.data(),
        attrs = this[0].attributes;
    if (attrs['width']) {
        result.width = attrs['width'].value;
    }
    if (attrs['height']) {
        result.height = attrs['height'].value;
    }
    if (attrs['value']) {
        result.value = attrs['value'].value;
    }
    if (attrs['align']) {
        result.align = attrs['align'].value;
    }
    if (result && result.source) {
        result.dataSource = result.source;
        delete result.source;
    }
    return result;
};

gj.widget.prototype.createDoneHandler = function () {
    var $widget = this;
    return function (response) {
        if (typeof (response) === 'string' && JSON) {
            response = JSON.parse(response);
        }
        gj[$widget.data('type')].methods.render($widget, response);
    };
};

gj.widget.prototype.createErrorHandler = function () {
    var $widget = this;
    return function (response) {
        if (response && response.statusText && response.statusText !== 'abort') {
            alert(response.statusText);
        }
    };
};

gj.widget.prototype.reload = function (params) {
    var ajaxOptions, result, data = this.data(), type = this.data('type');
    if (data.dataSource === undefined) {
        gj[type].methods.useHtmlDataSource(this, data);
    }
    $.extend(data.params, params);
    if ($.isArray(data.dataSource)) {
        result = gj[type].methods.filter(this);
        gj[type].methods.render(this, result);
    } else if (typeof(data.dataSource) === 'string') {
        ajaxOptions = { url: data.dataSource, data: data.params };
        if (this.xhr) {
            this.xhr.abort();
        }
        this.xhr = $.ajax(ajaxOptions).done(this.createDoneHandler()).fail(this.createErrorHandler());
    } else if (typeof (data.dataSource) === 'object') {
        if (!data.dataSource.data) {
            data.dataSource.data = {};
        }
        $.extend(data.dataSource.data, data.params);
        ajaxOptions = $.extend(true, {}, data.dataSource); //clone dataSource object
        if (ajaxOptions.dataType === 'json' && typeof(ajaxOptions.data) === 'object') {
            ajaxOptions.data = JSON.stringify(ajaxOptions.data);
        }
        if (!ajaxOptions.success) {
            ajaxOptions.success = this.createDoneHandler();
        }
        if (!ajaxOptions.error) {
            ajaxOptions.error = this.createErrorHandler();
        }
        if (this.xhr) {
            this.xhr.abort();
        }
        this.xhr = $.ajax(ajaxOptions);
    }
    return this;
}

gj.documentManager = {
    events: {},

    subscribeForEvent: function (eventName, widgetId, callback) {
        if (!gj.documentManager.events[eventName] || gj.documentManager.events[eventName].length === 0) {
            gj.documentManager.events[eventName] = [{ widgetId: widgetId, callback: callback }];
            $(document).on(eventName, gj.documentManager.executeCallbacks);
        } else if (!gj.documentManager.events[eventName][widgetId]) {
            gj.documentManager.events[eventName].push({ widgetId: widgetId, callback: callback });
        } else {
            throw 'Event ' + eventName + ' for widget with guid="' + widgetId + '" is already attached.';
        }
    },

    executeCallbacks: function (e) {
        var callbacks = gj.documentManager.events[e.type];
        if (callbacks) {
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i].callback(e);
            }
        }
    },

    unsubscribeForEvent: function (eventName, widgetId) {
        var success = false,
            events = gj.documentManager.events[eventName];
        if (events) {
            for (var i = 0; i < events.length; i++) {
                if (events[i].widgetId === widgetId) {
                    events.splice(i, 1);
                    success = true;
                    if (events.length === 0) {
                        $(document).off(eventName);
                        delete gj.documentManager.events[eventName];
                    }
                }
            }
        }
        if (!success) {
            throw 'The "' + eventName + '" for widget with guid="' + widgetId + '" can\'t be removed.';
        }
    }
};

/**
  * @widget Core
  * @plugin Base
  */
gj.core = {
    messages: {
        'en-us': {
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthShortNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],            
            weekDaysMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            weekDaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            weekDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            am: 'AM',
            pm: 'PM',
            ok: 'Ok',
            cancel: 'Cancel',
            titleFormat: 'mmmm yyyy'
        }
    },

    /** 
     * @method
     * @example String.1
     * <div id="date"></div>
     * <script>
     *     $('#date').text(gj.core.parseDate('02/03/17', 'mm/dd/yy'));
     * </script>
     * @example String.2
     * <div id="date"></div>
     * <script>
     *     $('#date').text(gj.core.parseDate('2017 2.3', 'yyyy m.d'));
     * </script>
     * @example String.dd.mmm.yyyy
     * <div id="date"></div>
     * <script>
     *     $('#date').text(gj.core.parseDate('05 Feb 2017', 'dd mmm yyyy'));
     * </script>
     * @example String.dd.mmmm.yyyy
     * <div id="date"></div>
     * <script>
     *     $('#date').text(gj.core.parseDate('05 February 2017', 'dd mmmm yyyy'));
     * </script>
     * @example String.HH:MM
     * <div id="date"></div>
     * <script>
     *     $('#date').text(gj.core.parseDate('10:57', 'HH:MM'));
     * </script>
     * @example ASP.NET.JSON.Date
     * <div id="date"></div>
     * <script>
     *     $('#date').text(gj.core.parseDate("\/Date(349653600000)\/"));
     * </script>
     * @example UNIX.Timestamp
     * <div id="date"></div>
     * <script>
     *     $('#date').text(gj.core.parseDate(349653600000));
     * </script>
     */
    parseDate: function (value, format, locale) {
        var i, year = 0, month = 0, date = 1, hour = 0, minute = 0, dateParts, formatParts, result;

        if (value && typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                result = new Date(value);
            } else if (value.indexOf('/Date(') > -1) {
                result = new Date(parseInt(value.substr(6), 10));
            } else if (value) {
                formatParts = format.split(/[\s,-\.//\:]+/);
                // Split only by spaces
                dateParts = value.split(/[\s]+/);
                // Split by other chars if the split by spaces doesn't work
                if (dateParts.length != formatParts.length) {
                    dateParts = value.split(/[\s,-\.//\:]+/);
                }
                for (i = 0; i < formatParts.length; i++) {
                    if (['d', 'dd'].indexOf(formatParts[i]) > -1) {
                        date = parseInt(dateParts[i], 10);
                    } else if (['m', 'mm'].indexOf(formatParts[i]) > -1) {
                        month = parseInt(dateParts[i], 10) - 1;
                    } else if ('mmm' === formatParts[i]) {
                        month = gj.core.messages[locale || 'en-us'].monthShortNames.indexOf(dateParts[i]);
                    } else if ('mmmm' === formatParts[i]) {
                        month = gj.core.messages[locale || 'en-us'].monthNames.indexOf(dateParts[i]);
                    } else if (['yy', 'yyyy'].indexOf(formatParts[i]) > -1) {
                        year = parseInt(dateParts[i], 10);
                        if (formatParts[i] === 'yy') {
                            year += 2000;
                        }
                    } else if (['h', 'hh', 'H', 'HH'].indexOf(formatParts[i]) > -1) {
                        hour = parseInt(dateParts[i], 10);
                    } else if (['M', 'MM'].indexOf(formatParts[i]) > -1) {
                        minute = parseInt(dateParts[i], 10);
                    }
                }
                result = new Date(year, month, date, hour, minute);
            }
        } else if (typeof value === 'number') {
            result = new Date(value);
        } else if (value instanceof Date) {
            result = value;
        }

        return result;
    },

    /** 
     * @method
     * @example Sample.1
     * <div id="date"></div>
     * <script>
     *     $('#date').text(gj.core.formatDate(new Date(2017, 1, 3), 'mm/dd/yy'));
     * </script>
     * @example Sample.2
     * <div id="date"></div>
     * <script>
     *     $('#date').text(gj.core.formatDate(new Date(2017, 1, 3), 'yyyy m.d'));
     * </script>
     * @example Sample.dd.mmm.yyyy
     * <div id="date"></div>
     * <script>
     *     $('#date').text(gj.core.formatDate(new Date(2017, 1, 3), 'dd mmm yyyy'));
     * </script>
     * @example Sample.dd.mmmm.yyyy
     * <div id="date"></div>
     * <script>
     *     $('#date').text(gj.core.formatDate(new Date(2017, 1, 3), 'dd mmmm yyyy'));
     * </script>
     * @example Sample.5
     * <div id="date"></div>
     * <script>
     *     $('#date').text(gj.core.formatDate(new Date(2017, 1, 3, 20, 43, 53), 'hh:MM:ss tt mm/dd/yyyy'));
     * </script>
     * @example Sample.6
     * <div id="date"></div>
     * <script>
     *     $('#date').text(gj.core.formatDate(new Date(2017, 1, 3, 20, 43, 53), 'hh:MM TT'));
     * </script>
     * @example Short.WeekDay
     * <div id="date"></div>
     * <script>
     *     $('#date').text(gj.core.formatDate(new Date(2017, 1, 3), 'ddd, mmm dd'));
     * </script>
     * @example Full.WeekDay
     * <div id="date"></div>
     * <script>
     *     $('#date').text(gj.core.formatDate(new Date(2017, 1, 3), 'dddd, mmm dd'));
     * </script>
     */
    formatDate: function (date, format, locale) {
        var result = '', separator, tmp,
            formatParts = format.split(/[\s,-\.//\:]+/),
            separators = format.split(/s+|M+|H+|h+|t+|T+|d+|m+|y+/);

        separators = separators.splice(1, separators.length - 2);

        for (i = 0; i < formatParts.length; i++) {
            separator = (separators[i] || '');
            switch (formatParts[i]) {
                case 's':
                    result += date.getSeconds() + separator;
                    break;
                case 'ss':
                    result += gj.core.pad(date.getSeconds()) + separator;
                    break;
                case 'M':
                    result += date.getMinutes() + separator;
                    break;
                case 'MM':
                    result += gj.core.pad(date.getMinutes()) + separator;
                    break;
                case 'H':
                    result += date.getHours() + separator;
                    break;
                case 'HH':
                    result += gj.core.pad(date.getHours()) + separator;
                    break;
                case 'h':
                    tmp = date.getHours() > 12 ? date.getHours() % 12 : date.getHours();
                    result += tmp + separator;
                    break;
                case 'hh':
                    tmp = date.getHours() > 12 ? date.getHours() % 12 : date.getHours();
                    result += gj.core.pad(tmp) + separator;
                    break;
                case 'tt':
                    result += (date.getHours() >= 12 ? 'pm' : 'am') + separator;
                    break;
                case 'TT':
                    result += (date.getHours() >= 12 ? 'PM' : 'AM') + separator;
                    break;
                case 'd':
                    result += date.getDate() + separator;
                    break;
                case 'dd':
                    result += gj.core.pad(date.getDate()) + separator;
                    break;
                case 'ddd':
                    result += gj.core.messages[locale || 'en-us'].weekDaysShort[date.getDay()] + separator;
                    break;
                case 'dddd':
                    result += gj.core.messages[locale || 'en-us'].weekDays[date.getDay()] + separator;
                    break;
                case 'm' :
                    result += (date.getMonth() + 1) + separator;
                    break;
                case 'mm':
                    result += gj.core.pad(date.getMonth() + 1) + separator;
                    break;
                case 'mmm':
                    result += gj.core.messages[locale || 'en-us'].monthShortNames[date.getMonth()] + separator;
                    break;
                case 'mmmm':
                    result += gj.core.messages[locale || 'en-us'].monthNames[date.getMonth()] + separator;
                    break;
                case 'yy' :
                    result += date.getFullYear().toString().substr(2) + separator;
                    break;
                case 'yyyy':
                    result += date.getFullYear() + separator;
                    break;
            }
        }

        return result;
    },

    pad: function (val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) {
            val = '0' + val;
        }
        return val;
    },

    center: function ($dialog) {
        var left = ($(window).width() / 2) - ($dialog.width() / 2),
            top = ($(window).height() / 2) - ($dialog.height() / 2);
        $dialog.css('position', 'absolute');
        $dialog.css('left', left > 0 ? left : 0);
        $dialog.css('top', top > 0 ? top : 0);
    },

    isIE: function () {
        return !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
    },

    setChildPosition: function (mainEl, childEl) {
        var mainElRect = mainEl.getBoundingClientRect(),
            mainElHeight = gj.core.height(mainEl, true),
            childElHeight = gj.core.height(childEl, true),
            mainElWidth = gj.core.width(mainEl, true),
            childElWidth = gj.core.width(childEl, true),
            scrollY = window.scrollY || window.pageYOffset || 0,
            scrollX = window.scrollX || window.pageXOffset || 0;

        if ((mainElRect.top + mainElHeight + childElHeight) > window.innerHeight && mainElRect.top > childElHeight) {
            childEl.style.top = Math.round(mainElRect.top + scrollY - childElHeight - 3) + 'px';
        } else {
            childEl.style.top = Math.round(mainElRect.top + scrollY + mainElHeight + 3) + 'px';
        }

        if (mainElRect.left + childElWidth > document.body.clientWidth) {
            childEl.style.left = Math.round(mainElRect.left + scrollX + mainElWidth - childElWidth) + 'px';
        } else {
            childEl.style.left = Math.round(mainElRect.left + scrollX) + 'px';
        }
    },

    height: function (el, margin) {
        var result, style = window.getComputedStyle(el);

        if (style.boxSizing === 'border-box') { // border-box include padding and border within the height
            result = parseInt(style.height, 10);
            if (gj.core.isIE()) {
                result += parseInt(style.paddingTop || 0, 10) + parseInt(style.paddingBottom || 0, 10);
                result += parseInt(style.borderTopWidth || 0, 10) + parseInt(style.borderBottomWidth || 0, 10);
            }
        } else {
            result = parseInt(style.height, 10);
            result += parseInt(style.paddingTop || 0, 10) + parseInt(style.paddingBottom || 0, 10);
            result += parseInt(style.borderTopWidth || 0, 10) + parseInt(style.borderBottomWidth || 0, 10);
        }

        if (margin) {
            result += parseInt(style.marginTop || 0, 10) + parseInt(style.marginBottom || 0, 10);
        }

        return result;
    },

    width: function (el, margin) {
        var result, style = window.getComputedStyle(el);

        if (style.boxSizing === 'border-box') { // border-box include padding and border within the width
            result = parseInt(style.width, 10);
        } else {
            result = parseInt(style.width, 10);
            result += parseInt(style.paddingLeft || 0, 10) + parseInt(style.paddingRight || 0, 10);
            result += parseInt(style.borderLeftWidth || 0, 10) + parseInt(style.borderRightWidth || 0, 10);
        }

        if (margin) {
            result += parseInt(style.marginLeft || 0, 10) + parseInt(style.marginRight || 0, 10);
        }

        return result;
    },

    addClasses: function (el, classes) {
        var i, arr;
        if (classes) {
            arr = classes.split(' ');
            for (i = 0; i < arr.length; i++) {
                el.classList.add(arr[i]);
            }
        }
    },

    position: function (el) {
        var xScroll, yScroll, left = 0, top = 0,
            height = gj.core.height(el),
            width = gj.core.width(el);

        while (el) {
            if (el.tagName == "BODY") {
                xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                yScroll = el.scrollTop || document.documentElement.scrollTop;
                left += el.offsetLeft - xScroll; // + el.clientLeft);
                top += el.offsetTop - yScroll; // + el.clientTop);
            } else {
                left += el.offsetLeft - el.scrollLeft; // + el.clientLeft;
                top += el.offsetTop - el.scrollTop; // + el.clientTop;
            }

            el = el.offsetParent;
        }

        return { top: top, left: left, bottom: top + height, right: left + width };
    },

    setCaretAtEnd: function (elem) {
        var elemLen;
        if (elem) {
            elemLen = elem.value.length;
            if (document.selection) { // For IE Only
                elem.focus();
                var oSel = document.selection.createRange();
                oSel.moveStart('character', -elemLen);
                oSel.moveStart('character', elemLen);
                oSel.moveEnd('character', 0);
                oSel.select();
            } else if (elem.selectionStart || elem.selectionStart == '0') { // Firefox/Chrome                
                elem.selectionStart = elemLen;
                elem.selectionEnd = elemLen;
                elem.focus();
            }
        }
    },
    getScrollParent: function (node) {
        if (node == null) {
            return null;
        } else if (node.scrollHeight > node.clientHeight) {
            return node;
        } else {
            return gj.core.getScrollParent(node.parentNode);
        }
    }
};
gj.picker = {
    messages: {
        'en-us': {
        }
    }
};

gj.picker.methods = {

    initialize: function ($input, data, methods) {
        var $calendar, $rightIcon,
            $picker = methods.createPicker($input, data),
            $wrapper = $input.parent('div[role="wrapper"]');

        if (data.uiLibrary === 'bootstrap') {
            $rightIcon = $('<span class="input-group-addon">' + data.icons.rightIcon + '</span>');
        } else if (data.uiLibrary === 'bootstrap4') {
            $rightIcon = $('<span class="input-group-append"><button class="btn btn-outline-secondary border-left-0" type="button">' + data.icons.rightIcon + '</button></span>');
        } else {
            $rightIcon = $(data.icons.rightIcon);
        }
        $rightIcon.attr('role', 'right-icon');

        if ($wrapper.length === 0) {
            $wrapper = $('<div role="wrapper" />').addClass(data.style.wrapper); // The css class needs to be added before the wrapping, otherwise doesn't work.
            $input.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }
        $wrapper = $input.parent('div[role="wrapper"]');

        data.width && $wrapper.css('width', data.width);

        $input.val(data.value).addClass(data.style.input).attr('role', 'input');

        data.fontSize && $input.css('font-size', data.fontSize);

        if (data.uiLibrary === 'bootstrap' || data.uiLibrary === 'bootstrap4') {
            if (data.size === 'small') {
                $wrapper.addClass('input-group-sm');
                $input.addClass('form-control-sm');
            } else if (data.size === 'large') {
                $wrapper.addClass('input-group-lg');
                $input.addClass('form-control-lg');
            }
        } else {
            if (data.size === 'small') {
                $wrapper.addClass('small');
            } else if (data.size === 'large') {
                $wrapper.addClass('large');
            }
        }

        $rightIcon.on('click', function (e) {
            if ($picker.is(':visible')) {
                $input.close();
            } else {
                $input.open();
            }
        });
        $wrapper.append($rightIcon);

        if (data.footer !== true) {
            $input.on('blur', function () {
                $input.timeout = setTimeout(function () {
                    $input.close();
                }, 500);
            });
            $picker.mousedown(function () {
                clearTimeout($input.timeout);
                $input.focus();
                return false;
            });
            $picker.on('click', function () {
                clearTimeout($input.timeout);
                $input.focus();
            });
        }
    }
};


gj.picker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.picker.methods;

    self.destroy = function () {
        return methods.destroy(this);
    };

    return $element;
};

gj.picker.widget.prototype = new gj.widget();
gj.picker.widget.constructor = gj.picker.widget;

gj.picker.widget.prototype.init = function (jsConfig, type, methods) {
    gj.widget.prototype.init.call(this, jsConfig, type);
    this.attr('data-' + type, 'true');
    gj.picker.methods.initialize(this, this.data(), gj[type].methods);
    return this;
};

gj.picker.widget.prototype.open = function (type) {
    var data = this.data(),
        $picker = $('body').find('[role="picker"][guid="' + this.attr('data-guid') + '"]');

    $picker.show();
    $picker.closest('div[role="modal"]').show();
    if (data.modal) {
        gj.core.center($picker);
    } else {
        gj.core.setChildPosition(this[0], $picker[0]);
        this.focus();
    }
    clearTimeout(this.timeout);

    gj[type].events.open(this);

    return this;
};

gj.picker.widget.prototype.close = function (type) {
    var $picker = $('body').find('[role="picker"][guid="' + this.attr('data-guid') + '"]');
    $picker.hide();
    $picker.closest('div[role="modal"]').hide();
    gj[type].events.close(this);
    return this;
};

gj.picker.widget.prototype.destroy = function (type) {
    var data = this.data(),
        $parent = this.parent(),
        $picker = $('body').find('[role="picker"][guid="' + this.attr('data-guid') + '"]');
    if (data) {
        this.off();
        if ($picker.parent('[role="modal"]').length > 0) {
            $picker.unwrap();
        }
        $picker.remove();
        this.removeData();
        this.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-' + type);
        this.removeClass();
        $parent.children('[role="right-icon"]').remove();
        this.unwrap();
    }
    return this;
};
/* global window alert jQuery */
/** 
 * @widget Dialog 
 * @plugin Base
 */
gj.dialog = {
    plugins: {},
    messages: {}
};

gj.dialog.config = {
    base: {
        /** If set to true, the dialog will automatically open upon initialization.
         * If false, the dialog will stay hidden until the open() method is called.
         * @type boolean
         * @default true
         * @example True <!-- dialog.base, draggable -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         autoOpen: true
         *     });
         * </script>
         * @example False <!-- dialog.base, bootstrap -->
         * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <button onclick="dialog.open()" class="btn btn-default">Open Dialog</button>
         * <script>
         *     var dialog = $("#dialog").dialog({
         *         uiLibrary: 'bootstrap',
         *         autoOpen: false
         *     });
         * </script>
         */
        autoOpen: true,

        /** Specifies whether the dialog should have a close button in right part of dialog header.
         * @type boolean
         * @default true
         * @example True <!-- dialog.base, draggable -->
         * <div id="dialog">
         *     <div data-role="header"><h4 data-role="title">Dialog</h4></div>
         *     <div data-role="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         *     <div data-role="footer">
         *         <button onclick="dialog.close()" class="gj-button-md">Ok</button>
         *         <button onclick="dialog.close()" class="gj-button-md">Cancel</button>
         *     </div>
         * </div>
         * <script>
         *     var dialog = $("#dialog").dialog({
         *         closeButtonInHeader: true,
         *         height: 200
         *     });
         * </script>
         * @example False <!-- dialog.base, draggable -->
         * <div id="dialog">
         *     <div data-role="header"><h4 data-role="title">Dialog</h4></div>
         *     <div data-role="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         *     <div data-role="footer">
         *         <button onclick="dialog.close()" class="gj-button-md">Ok</button>
         *         <button onclick="dialog.close()" class="gj-button-md">Cancel</button>
         *     </div>
         * </div>
         * <script>
         *     var dialog = $("#dialog").dialog({
         *         closeButtonInHeader: false
         *     });
         * </script>
         */
        closeButtonInHeader: true,

        /** Specifies whether the dialog should close when it has focus and the user presses the escape (ESC) key.
         * @type boolean
         * @default true
         * @example True <!-- dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         closeOnEscape: true
         *     });
         * </script>
         * @example False <!-- dialog.base, draggable -->
         * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         closeOnEscape: false
         *     });
         * </script>
         */
        closeOnEscape: true,

        /** If set to true, the dialog will be draggable by the title bar.
         * @type boolean
         * @default true
         * @example True <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         draggable: true
         *     });
         * </script>
         * @example False <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         draggable: false
         *     });
         * </script>
         */
        draggable: true,

        /** The height of the dialog.
         * @additionalinfo Support string and number values. The number value sets the height in pixels.
         * The only supported string value is "auto" which will allow the dialog height to adjust based on its content.
         * @type (number|string)
         * @default "auto"
         * @example Short.Text <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         height: 200
         *     });
         * </script>
         * @example Long.Text.Material.Design <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor quam in magna vulputate, vitae laoreet odio ultrices. Phasellus at efficitur magna. Mauris purus dolor, egestas quis leo et, vulputate dictum mauris. Vivamus maximus lectus sollicitudin lorem blandit tempor. Maecenas eget posuere mi. Suspendisse id hendrerit nibh. Morbi eu odio euismod, venenatis ipsum in, egestas nunc. Mauris dignissim metus ac risus porta eleifend. Aliquam tempus libero orci, id placerat odio vehicula eu. Donec tincidunt justo dolor, sit amet tempus turpis varius sit amet. Suspendisse ut ex blandit, hendrerit enim tristique, iaculis ipsum. Vivamus venenatis dolor justo, eget scelerisque lacus dignissim quis. Duis imperdiet ex at aliquet cursus. Proin non ultricies leo. Fusce quam diam, laoreet quis fringilla vitae, viverra id magna. Nam laoreet sem in volutpat rhoncus.</div>
         * <script>
         *     $("#dialog").dialog({
         *         height: 350
         *     });
         * </script>
         * @example Long.Text.Bootstrap3 <!-- bootstrap, draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor quam in magna vulputate, vitae laoreet odio ultrices. Phasellus at efficitur magna. Mauris purus dolor, egestas quis leo et, vulputate dictum mauris. Vivamus maximus lectus sollicitudin lorem blandit tempor. Maecenas eget posuere mi. Suspendisse id hendrerit nibh. Morbi eu odio euismod, venenatis ipsum in, egestas nunc. Mauris dignissim metus ac risus porta eleifend. Aliquam tempus libero orci, id placerat odio vehicula eu. Donec tincidunt justo dolor, sit amet tempus turpis varius sit amet. Suspendisse ut ex blandit, hendrerit enim tristique, iaculis ipsum. Vivamus venenatis dolor justo, eget scelerisque lacus dignissim quis. Duis imperdiet ex at aliquet cursus. Proin non ultricies leo. Fusce quam diam, laoreet quis fringilla vitae, viverra id magna. Nam laoreet sem in volutpat rhoncus.</div>
         * <script>
         *     $("#dialog").dialog({
         *         height: 350,
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Long.Text.Bootstrap4 <!-- bootstrap4, draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor quam in magna vulputate, vitae laoreet odio ultrices. Phasellus at efficitur magna. Mauris purus dolor, egestas quis leo et, vulputate dictum mauris. Vivamus maximus lectus sollicitudin lorem blandit tempor. Maecenas eget posuere mi. Suspendisse id hendrerit nibh. Morbi eu odio euismod, venenatis ipsum in, egestas nunc. Mauris dignissim metus ac risus porta eleifend. Aliquam tempus libero orci, id placerat odio vehicula eu. Donec tincidunt justo dolor, sit amet tempus turpis varius sit amet. Suspendisse ut ex blandit, hendrerit enim tristique, iaculis ipsum. Vivamus venenatis dolor justo, eget scelerisque lacus dignissim quis. Duis imperdiet ex at aliquet cursus. Proin non ultricies leo. Fusce quam diam, laoreet quis fringilla vitae, viverra id magna. Nam laoreet sem in volutpat rhoncus.</div>
         * <script>
         *     $("#dialog").dialog({
         *         height: 350,
         *         uiLibrary: 'bootstrap4'
         *     });
         * </script>
         */
        height: 'auto',

        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example French.Default <!-- draggable, dialog.base-->
         * <script src="../../dist/modular/dialog/js/messages/messages.fr-fr.js"></script>
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         resizable: true,
         *         locale: 'fr-fr'
         *     });
         * </script>
         * @example French.Custom <!-- draggable, dialog.base -->
         * <script src="../../dist/modular/dialog/js/messages/messages.fr-fr.js"></script>
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     gj.dialog.messages['fr-fr'].DefaultTitle = 'Titre de la boîte de dialogue';
         *     $("#dialog").dialog({
         *         resizable: true,
         *         locale: 'fr-fr',
         *         width: 700
         *     });
         * </script>
         */
        locale: 'en-us',

        /** The maximum height in pixels to which the dialog can be resized.
         * @type number
         * @default undefined
         * @example sample <!-- draggable, dialog.base -->
         * <div id="dialog">The maximum height of this dialog is set to 300 px. Try to resize it for testing.</div>
         * <script>
         *     $("#dialog").dialog({
         *         resizable: true,
         *         height: 200,
         *         maxHeight: 300
         *     });
         * </script>
         */
        maxHeight: undefined,

        /** The maximum width in pixels to which the dialog can be resized.
         * @type number
         * @default undefined
         * @example sample <!-- draggable, dialog.base -->
         * <div id="dialog">The maximum width of this dialog is set to 400 px. Try to resize it for testing.</div>
         * <script>
         *     $("#dialog").dialog({
         *         resizable: true,
         *         maxWidth: 400
         *     });
         * </script>
         */
        maxWidth: undefined,

        /** The minimum height in pixels to which the dialog can be resized.
         * @type number
         * @default undefined
         * @example sample <!-- draggable, dialog.base -->
         * <div id="dialog">The minimum height of this dialog is set to 200 px. Try to resize it for testing.</div>
         * <script>
         *     $("#dialog").dialog({
         *         resizable: true,
         *         height: 300,
         *         minHeight: 200
         *     });
         * </script>
         */
        minHeight: undefined,

        /** The minimum width in pixels to which the dialog can be resized.
         * @type number
         * @default undefined
         * @example sample <!-- draggable, dialog.base -->
         * <div id="dialog">The minimum width of this dialog is set to 200 px. Try to resize it for testing.</div>
         * <script>
         *     $("#dialog").dialog({
         *         resizable: true,
         *         minWidth: 200
         *     });
         * </script>
         */
        minWidth: undefined,

        /** If set to true, the dialog will have modal behavior.
         * Modal dialogs create an overlay below the dialog, but above other page elements and you can't interact with them.
         * @type boolean
         * @default false
         * @example True.Material.Design <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         modal: true
         *     });
         * </script>
         * @example True.Bootstrap.4 <!-- bootstrap4, draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         modal: true,
         *         uiLibrary: 'bootstrap4'
         *     });
         * </script>
         * @example False <!-- draggable, dialog.base, bootstrap -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         modal: false
         *     });
         * </script>
         */
        modal: false,

        /** If set to true, the dialog will be resizable.
         * @type boolean
         * @default false
         * @example True <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         resizable: true
         *     });
         * </script>
         * @example False <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         resizable: false
         *     });
         * </script>
         */
        resizable: false,

        /** If set to true, add vertical scroller to the dialog body.
         * @type Boolean
         * @default false
         * @example Bootstrap.3 <!-- bootstrap, draggable, dialog.base -->
         * <div id="dialog">
         *     <div data-role="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor quam in magna vulputate, vitae laoreet odio ultrices. Phasellus at efficitur magna. Mauris purus dolor, egestas quis leo et, vulputate dictum mauris. Vivamus maximus lectus sollicitudin lorem blandit tempor. Maecenas eget posuere mi. Suspendisse id hendrerit nibh. Morbi eu odio euismod, venenatis ipsum in, egestas nunc. Mauris dignissim metus ac risus porta eleifend. Aliquam tempus libero orci, id placerat odio vehicula eu. Donec tincidunt justo dolor, sit amet tempus turpis varius sit amet. Suspendisse ut ex blandit, hendrerit enim tristique, iaculis ipsum. Vivamus venenatis dolor justo, eget scelerisque lacus dignissim quis. Duis imperdiet ex at aliquet cursus. Proin non ultricies leo. Fusce quam diam, laoreet quis fringilla vitae, viverra id magna. Nam laoreet sem in volutpat rhoncus.</div>
         *     <div data-role="footer">
         *         <button class="btn btn-default" data-role="close">Cancel</button>
         *         <button class="btn btn-default" onclick="dialog.close()">OK</button>
         *     </div>
         * </div>
         * <script>
         *     var dialog = $("#dialog").dialog({
         *         scrollable: true,
         *         height: 300,
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor quam in magna vulputate, vitae laoreet odio ultrices. Phasellus at efficitur magna. Mauris purus dolor, egestas quis leo et, vulputate dictum mauris. Vivamus maximus lectus sollicitudin lorem blandit tempor. Maecenas eget posuere mi. Suspendisse id hendrerit nibh. Morbi eu odio euismod, venenatis ipsum in, egestas nunc. Mauris dignissim metus ac risus porta eleifend. Aliquam tempus libero orci, id placerat odio vehicula eu. Donec tincidunt justo dolor, sit amet tempus turpis varius sit amet. Suspendisse ut ex blandit, hendrerit enim tristique, iaculis ipsum. Vivamus venenatis dolor justo, eget scelerisque lacus dignissim quis. Duis imperdiet ex at aliquet cursus. Proin non ultricies leo. Fusce quam diam, laoreet quis fringilla vitae, viverra id magna. Nam laoreet sem in volutpat rhoncus.</div>
         * <script>
         *     $("#dialog").dialog({
         *         scrollable: true,
         *         height: 300,
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Material.Design <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor quam in magna vulputate, vitae laoreet odio ultrices. Phasellus at efficitur magna. Mauris purus dolor, egestas quis leo et, vulputate dictum mauris. Vivamus maximus lectus sollicitudin lorem blandit tempor. Maecenas eget posuere mi. Suspendisse id hendrerit nibh. Morbi eu odio euismod, venenatis ipsum in, egestas nunc. Mauris dignissim metus ac risus porta eleifend. Aliquam tempus libero orci, id placerat odio vehicula eu. Donec tincidunt justo dolor, sit amet tempus turpis varius sit amet. Suspendisse ut ex blandit, hendrerit enim tristique, iaculis ipsum. Vivamus venenatis dolor justo, eget scelerisque lacus dignissim quis. Duis imperdiet ex at aliquet cursus. Proin non ultricies leo. Fusce quam diam, laoreet quis fringilla vitae, viverra id magna. Nam laoreet sem in volutpat rhoncus.</div>
         * <script>
         *     $("#dialog").dialog({
         *         scrollable: true,
         *         height: 300,
         *         uiLibrary: 'materialdesign'
         *     });
         * </script>
         */
        scrollable: false,

        /** The title of the dialog. Can be also set through the title attribute of the html element.
         * @type String
         * @default "Dialog"
         * @example Js.Config <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         title: 'My Custom Title',
         *         width: 400
         *     });
         * </script>
         * @example Html.Config <!-- draggable, dialog.base -->
         * <div id="dialog" title="My Custom Title" width="400">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog();
         * </script>
         */
        title: undefined,

        /** The name of the UI library that is going to be in use. Currently we support Material Design and Bootstrap.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type string (bootstrap|materialdesign)
         * @default undefined
         * @example Bootstrap.3 <!-- draggable, dialog.base, bootstrap -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Bootstrap.4 <!-- draggable, dialog.base, bootstrap4 -->
         * <div id="dialog">
         *     <div data-role="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         *     <div data-role="footer">
         *         <button class="btn btn-default" data-role="close">Cancel</button>
         *         <button class="btn btn-default" onclick="dialog.close()">OK</button>
         *     </div>
         * </div>
         * <script>
         *     var dialog = $("#dialog").dialog({
         *         uiLibrary: 'bootstrap4'
         *     });
         * </script>
         * @example Material.Design <!-- draggable, dialog.base  -->
         * <div id="dialog">
         *   <div data-role="body">
         *     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
         *     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
         *   </div>
         *   <div data-role="footer">
         *     <button class="gj-button-md" onclick="dialog.close()">OK</button>
         *     <button class="gj-button-md" data-role="close">Cancel</button>
         *   </div>
         * </div>
         * <script>
         *     var dialog = $("#dialog").dialog({
         *         uiLibrary: 'materialdesign',
         *         resizable: true
         *     });
         * </script>
         */
        uiLibrary: undefined,

        /** The width of the dialog.
         * @type number
         * @default 300
         * @example Fixed.Width <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         width: 400
         *     });
         * </script>
         * @example Auto.Width <!-- draggable, dialog.base -->
         * <div id="dialog" title="Wikipedia">
         *   <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1122px-Wikipedia-logo-v2.svg.png" width="420"/>
         * </div>
         * <script>
         *     $("#dialog").dialog({
         *         width: 'auto'
         *     });
         * </script>
         */
        width: 300,

        style: {
            modal: 'gj-modal',
            content: 'gj-dialog-md',
            header: 'gj-dialog-md-header gj-unselectable',
            headerTitle: 'gj-dialog-md-title',
            headerCloseButton: 'gj-dialog-md-close',
            body: 'gj-dialog-md-body',
            footer: 'gj-dialog-footer gj-dialog-md-footer'
        }
    },

    bootstrap: {
        style: {
            modal: 'modal',
            content: 'modal-content gj-dialog-bootstrap',
            header: 'modal-header',
            headerTitle: 'modal-title',
            headerCloseButton: 'close',
            body: 'modal-body',
            footer: 'gj-dialog-footer modal-footer'
        }
    },

    bootstrap4: {
        style: {
            modal: 'modal',
            content: 'modal-content gj-dialog-bootstrap4',
            header: 'modal-header',
            headerTitle: 'modal-title',
            headerCloseButton: 'close',
            body: 'modal-body',
            footer: 'gj-dialog-footer modal-footer'
        }
    }
};
/** 
  * @widget Dialog 
  * @plugin Base
  */
gj.dialog.events = {
    /**
     * Triggered when the dialog is initialized.
     *
     * @event initialized
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = $("#dialog").dialog({
     *         autoOpen: false,
     *         initialized: function (e) {
     *             alert('The initialized event is fired.');
     *         }
     *     });
     * </script>
     */
    initialized: function ($dialog) {
        $dialog.trigger("initialized");
    },

    /**
     * Triggered before the dialog is opened.
     * @event opening
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = $("#dialog").dialog({
     *         autoOpen: false,
     *         opening: function (e) {
     *             alert('The opening event is fired.');
     *         },
     *         opened: function (e) {
     *             alert('The opened event is fired.');
     *         }
     *     });
     * </script>
     */
    opening: function ($dialog) {
        $dialog.trigger("opening");
    },

    /**
     * Triggered when the dialog is opened.
     * @event opened
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = $("#dialog").dialog({
     *         autoOpen: false,
     *         opening: function (e) {
     *             alert('The opening event is fired.');
     *         },
     *         opened: function (e) {
     *             alert('The opened event is fired.');
     *         }
     *     });
     * </script>
     */
    opened: function ($dialog) {
        $dialog.trigger("opened");
    },

    /**
     * Triggered before the dialog is closed.
     * @event closing
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Close the dialog in order to fire closing event.</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = $("#dialog").dialog({
     *         autoOpen: false,
     *         closing: function (e) {
     *             alert('The closing event is fired.');
     *         },
     *         closed: function (e) {
     *             alert('The closed event is fired.');
     *         }
     *     });
     * </script>
     */
    closing: function ($dialog) {
        $dialog.trigger("closing");
    },

    /**
     * Triggered when the dialog is closed.
     * @event closed
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Close the dialog in order to fire closed event.</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = $("#dialog").dialog({
     *         autoOpen: false,
     *         closing: function (e) {
     *             alert('The closing event is fired.');
     *         },
     *         closed: function (e) {
     *             alert('The closed event is fired.');
     *         }
     *     });
     * </script>
     */
    closed: function ($dialog) {
        $dialog.trigger("closed");
    },

    /**
     * Triggered while the dialog is being dragged.
     * @event drag
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = $('#logPanel');
     *     $("#dialog").dialog({
     *         drag: function (e) {
     *             log.append('<div class="row">The drag event is fired.</div>');
     *         },
     *         dragStart: function (e) {
     *             log.append('<div class="row">The dragStart event is fired.</div>');
     *         },
     *         dragStop: function (e) {
     *             log.append('<div class="row">The dragStop event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    drag: function ($dialog) {
        $dialog.trigger("drag");
    },

    /**
     * Triggered when the user starts dragging the dialog.
     * @event dragStart
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = $('#logPanel');
     *     $("#dialog").dialog({
     *         drag: function (e) {
     *             log.append('<div class="row">The drag event is fired.</div>');
     *         },
     *         dragStart: function (e) {
     *             log.append('<div class="row">The dragStart event is fired.</div>');
     *         },
     *         dragStop: function (e) {
     *             log.append('<div class="row">The dragStop event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    dragStart: function ($dialog) {
        $dialog.trigger("dragStart");
    },

    /**
     * Triggered after the dialog has been dragged.
     * @event dragStop
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = $('#logPanel');
     *     $("#dialog").dialog({
     *         drag: function (e) {
     *             log.append('<div class="row">The drag event is fired.</div>');
     *         },
     *         dragStart: function (e) {
     *             log.append('<div class="row">The dragStart event is fired.</div>');
     *         },
     *         dragStop: function (e) {
     *             log.append('<div class="row">The dragStop event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    dragStop: function ($dialog) {
        $dialog.trigger("dragStop");
    },

    /**
     * Triggered while the dialog is being resized.
     * @event resize
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = $('#logPanel');
     *     $("#dialog").dialog({
     *         resizable: true,
     *         resize: function (e) {
     *             log.append('<div class="row">The resize event is fired.</div>');
     *         },
     *         resizeStart: function (e) {
     *             log.append('<div class="row">The resizeStart event is fired.</div>');
     *         },
     *         resizeStop: function (e) {
     *             log.append('<div class="row">The resizeStop event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    resize: function ($dialog) {
        $dialog.trigger("resize");
    },

    /**
     * Triggered when the user starts resizing the dialog.
     * @event resizeStart
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = $('#logPanel');
     *     $("#dialog").dialog({
     *         resizable: true,
     *         resize: function (e) {
     *             log.append('<div class="row">The resize event is fired.</div>');
     *         },
     *         resizeStart: function (e) {
     *             log.append('<div class="row">The resizeStart event is fired.</div>');
     *         },
     *         resizeStop: function (e) {
     *             log.append('<div class="row">The resizeStop event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    resizeStart: function ($dialog) {
        $dialog.trigger("resizeStart");
    },

    /**
     * Triggered after the dialog has been resized.
     * @event resizeStop
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = $('#logPanel');
     *     $("#dialog").dialog({
     *         resizable: true,
     *         resize: function (e) {
     *             log.append('<div class="row">The resize event is fired.</div>');
     *         },
     *         resizeStart: function (e) {
     *             log.append('<div class="row">The resizeStart event is fired.</div>');
     *         },
     *         resizeStop: function (e) {
     *             log.append('<div class="row">The resizeStop event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    resizeStop: function ($dialog) {
        $dialog.trigger("resizeStop");
    }
};

gj.dialog.methods = {

    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'dialog');

        gj.dialog.methods.localization(this);
        gj.dialog.methods.initialize(this);
        gj.dialog.events.initialized(this);
        return this;
    },

    localization: function($dialog) {
        var data = $dialog.data();
        if (typeof (data.title) === 'undefined') {
            data.title = gj.dialog.messages[data.locale].DefaultTitle;
        }
    },

    getHTMLConfig: function () {
        var result = gj.widget.prototype.getHTMLConfig.call(this),
            attrs = this[0].attributes;
        if (attrs['title']) {
            result.title = attrs['title'].value;
        }
        return result;
    },

    initialize: function ($dialog) {
        var data = $dialog.data(),
            $header, $body, $footer;

        $dialog.addClass(data.style.content);

        gj.dialog.methods.setSize($dialog);

        if (data.closeOnEscape) {
            $(document).keyup(function (e) {
                if (e.keyCode === 27) {
                    $dialog.close();
                }
            });
        }

        $body = $dialog.children('div[data-role="body"]');
        if ($body.length === 0) {
            $body = $('<div data-role="body"/>').addClass(data.style.body);
            $dialog.wrapInner($body);
        } else {
            $body.addClass(data.style.body);
        }

        $header = gj.dialog.methods.renderHeader($dialog);

        $footer = $dialog.children('div[data-role="footer"]').addClass(data.style.footer);

        $dialog.find('[data-role="close"]').on('click', function () {
            $dialog.close();
        });

        if (gj.draggable) {
            if (data.draggable) {
                gj.dialog.methods.draggable($dialog, $header);
            }
            if (data.resizable) {
                gj.dialog.methods.resizable($dialog);
            }
        }

        if (data.scrollable && data.height) {
            $dialog.addClass('gj-dialog-scrollable');
            $dialog.on('opened', function () {
                var $body = $dialog.children('div[data-role="body"]');
                $body.css('height', data.height - $header.outerHeight() - ($footer.length ? $footer.outerHeight() : 0));
            });            
        }

        gj.core.center($dialog);

        if (data.modal) {
            $dialog.wrapAll('<div data-role="modal" class="' + data.style.modal + '"/>');
        }

        if (data.autoOpen) {
            $dialog.open();
        }
    },

    setSize: function ($dialog) {
        var data = $dialog.data();
        if (data.width) {
            $dialog.css("width", data.width);
        }
        if (data.height) {
            $dialog.css("height", data.height);
        }
    },

    renderHeader: function ($dialog) {
        var $header, $title, $closeButton, data = $dialog.data();
        $header = $dialog.children('div[data-role="header"]');
        if ($header.length === 0) {
            $header = $('<div data-role="header" />');
            $dialog.prepend($header);
        }
        $header.addClass(data.style.header);

        $title = $header.find('[data-role="title"]');
        if ($title.length === 0) {
            $title = $('<h4 data-role="title">' + data.title + '</h4>');
            $header.append($title);
        }
        $title.addClass(data.style.headerTitle);

        $closeButton = $header.find('[data-role="close"]');
        if ($closeButton.length === 0 && data.closeButtonInHeader) {
            $closeButton = $('<button type="button" data-role="close" title="' + gj.dialog.messages[data.locale].Close + '"><span>×</span></button>');
            $closeButton.addClass(data.style.headerCloseButton);
            $header.append($closeButton);
        } else if ($closeButton.length > 0 && data.closeButtonInHeader === false) {
            $closeButton.hide();
        } else {
            $closeButton.addClass(data.style.headerCloseButton);
        }

        return $header;
    },

    draggable: function ($dialog, $header) {
        $dialog.appendTo('body');
        $header.addClass('gj-draggable');
        $dialog.draggable({
            handle: $header,
            start: function () {
                $dialog.addClass('gj-unselectable');
                gj.dialog.events.dragStart($dialog);
            },
            stop: function () {
                $dialog.removeClass('gj-unselectable');
                gj.dialog.events.dragStop($dialog);
            }
        });
    },

    resizable: function ($dialog) {
        var config = {
            'drag': gj.dialog.methods.resize,
            'start': function () {
                $dialog.addClass('gj-unselectable');
                gj.dialog.events.resizeStart($dialog);
            },
            'stop': function () {
                this.removeAttribute('style');
                $dialog.removeClass('gj-unselectable');
                gj.dialog.events.resizeStop($dialog);
            }
        };
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-n"></div>').draggable($.extend(true, { horizontal: false }, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-e"></div>').draggable($.extend(true, { vertical: false }, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-s"></div>').draggable($.extend(true, { horizontal: false }, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-w"></div>').draggable($.extend(true, { vertical: false }, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-ne"></div>').draggable($.extend(true, {}, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-nw"></div>').draggable($.extend(true, {}, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-sw"></div>').draggable($.extend(true, {}, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-se"></div>').draggable($.extend(true, {}, config)));
    },

    resize: function (e, newPosition) {
        var $el, $dialog, position, data, height, width, top, left, result = false;

        $el = $(this);
        $dialog = $el.parent();
        position = gj.core.position(this);
        offset = { top: newPosition.top - position.top, left: newPosition.left - position.left };
        data = $dialog.data();

        // TODO: Include margins in the calculations
        if ($el.hasClass('gj-resizable-n')) {
            height = $dialog.height() - offset.top;
            top = $dialog.offset().top + offset.top;
        } else if ($el.hasClass('gj-resizable-e')) {
            width = $dialog.width() + offset.left;
        } else if ($el.hasClass('gj-resizable-s')) {
            height = $dialog.height() + offset.top;
        } else if ($el.hasClass('gj-resizable-w')) {
            width = $dialog.width() - offset.left;
            left = $dialog.offset().left + offset.left;
        } else if ($el.hasClass('gj-resizable-ne')) {
            height = $dialog.height() - offset.top;
            top = $dialog.offset().top + offset.top;
            width = $dialog.width() + offset.left;
        } else if ($el.hasClass('gj-resizable-nw')) {
            height = $dialog.height() - offset.top;
            top = $dialog.offset().top + offset.top;
            width = $dialog.width() - offset.left;
            left = $dialog.offset().left + offset.left;
        } else if ($el.hasClass('gj-resizable-se')) {
            height = $dialog.height() + offset.top;
            width = $dialog.width() + offset.left;
        } else if ($el.hasClass('gj-resizable-sw')) {
            height = $dialog.height() + offset.top;
            width = $dialog.width() - offset.left;
            left = $dialog.offset().left + offset.left;
        }

        if (height && (!data.minHeight || height >= data.minHeight) && (!data.maxHeight || height <= data.maxHeight)) {
            $dialog.height(height);
            if (top) {
                $dialog.css('top', top);
            }
            result = true;
        }

        if (width && (!data.minWidth || width >= data.minWidth) && (!data.maxWidth || width <= data.maxWidth)) {
            $dialog.width(width);
            if (left) {
                $dialog.css('left', left);
            }
            result = true;
        }

        if (result) {
            gj.dialog.events.resize($dialog);
        }
        
        return result;
    },

    open: function ($dialog, title) {
        var $footer;
        gj.dialog.events.opening($dialog);
        $dialog.css('display', 'block');
        $dialog.closest('div[data-role="modal"]').css('display', 'block');
        $footer = $dialog.children('div[data-role="footer"]');
        if ($footer.length && $footer.outerHeight()) {
            $dialog.children('div[data-role="body"]').css('margin-bottom', $footer.outerHeight());
        }
        if (title !== undefined) {
            $dialog.find('[data-role="title"]').html(title);
        }
        gj.dialog.events.opened($dialog);
        return $dialog;
    },

    close: function ($dialog) {
        if ($dialog.is(':visible')) {
            gj.dialog.events.closing($dialog);
            $dialog.css('display', 'none');
            $dialog.closest('div[data-role="modal"]').css('display', 'none');
            gj.dialog.events.closed($dialog);
        }
        return $dialog;
    },

    isOpen: function ($dialog) {
        return $dialog.is(':visible');
    },

    content: function ($dialog, html) {
        var $body = $dialog.children('div[data-role="body"]');
        if (typeof (html) === "undefined") {
            return $body.html();
        } else {
            return $body.html(html);
        }
    },

    destroy: function ($dialog, keepHtml) {
        var data = $dialog.data();
        if (data) {
            if (keepHtml === false) {
                $dialog.remove();
            } else {
                $dialog.close();
                $dialog.off();
                $dialog.removeData();
                $dialog.removeAttr('data-type');
                $dialog.removeClass(data.style.content);
                $dialog.find('[data-role="header"]').removeClass(data.style.header);
                $dialog.find('[data-role="title"]').removeClass(data.style.headerTitle);
                $dialog.find('[data-role="close"]').remove();
                $dialog.find('[data-role="body"]').removeClass(data.style.body);
                $dialog.find('[data-role="footer"]').removeClass(data.style.footer);
            }
            
        }
        return $dialog;
    }
};
/** 
  * @widget Dialog 
  * @plugin Base
  */
gj.dialog.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.dialog.methods;

    /**
     * Opens the dialog.
     * @method
     * @param {String} title - The dialog title.
     * @fires opening, opened
     * @return dialog
     * @example Sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = $('#dialog').dialog({
     *         autoOpen: false
     *     });
     * </script>
     * @example Title <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open('Custom Text')" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = $('#dialog').dialog({
     *         autoOpen: false
     *     });
     * </script>
     */
    self.open = function (title) {
        return methods.open(this, title);
    }

    /**
     * Close the dialog.
     * @method
     * @fires closing, closed
     * @return dialog
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <button onclick="dialog.close()" class="gj-button-md">Close Dialog</button>
     * <script>
     *     var dialog = $('#dialog').dialog();
     * </script>
     */
    self.close = function () {
        return methods.close(this);
    }

    /**
     * Check if the dialog is currently open.
     * @method
     * @return boolean
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <button onclick="dialog.close()" class="gj-button-md">Close Dialog</button>
     * <button onclick="alert($('#dialog').dialog('isOpen'))" class="gj-button-md">isOpen</button>
     * <script>
     *     var dialog = $('#dialog').dialog();
     * </script>
     */
    self.isOpen = function () {
        return methods.isOpen(this);
    }

    /**
     * Gets or set the content of a dialog. Supports chaining when used as a setter.
     * @method
     * @param {String} content - The content of the Dialog.
     * @return String|Dialog
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="alert(dialog.content())" class="btn btn-default">Get Content</button>
     * <button onclick="dialog.content('New Test Content Value')" class="btn btn-default">Set Content</button>
     * <script>
     *     var dialog = $('#dialog').dialog({ uiLibrary: 'bootstrap' });
     * </script>
     */
    self.content = function (content) {
        return methods.content(this, content);
    }

    /**
     * Destroy the dialog.
     * @method
     * @param {boolean} keepHtml - If this flag is set to false, the dialog html markup will be removed from the HTML dom tree.
     * @return void
     * @example Keep.HTML.Markup <!-- draggable, dialog.base -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="create()" class="gj-button-md">Create</button>
     * <button onclick="dialog.destroy()" class="gj-button-md">Destroy</button>
     * <script>
     *     var dialog;
     *     function create() { 
     *         dialog = $('#dialog').dialog();
     *     }
     * </script>
     * @example Remove.HTML.Markup <!-- draggable, dialog.base -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="create()" class="gj-button-md">Create</button>
     * <button onclick="dialog.destroy(false)" class="gj-button-md">Destroy</button>
     * <script>
     *     var dialog;
     *     function create() {
     *         if ($('#dialog').length === 0) {
     *             alert('The dialog can not be created.');
     *         } else {
     *             dialog = $('#dialog').dialog();
     *         }
     *     }
     * </script>
     */
    self.destroy = function (keepHtml) {
        return methods.destroy(this, keepHtml);
    }

    $.extend($element, self);
    if ('dialog' !== $element.attr('data-type')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.dialog.widget.prototype = new gj.widget();
gj.dialog.widget.constructor = gj.dialog.widget;

gj.dialog.widget.prototype.getHTMLConfig = gj.dialog.methods.getHTMLConfig;

(function ($) {
    $.fn.dialog = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.dialog.widget(this, method);
            } else {
                $widget = new gj.dialog.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
gj.dialog.messages['en-us'] = {
    Close: 'Close',
    DefaultTitle: 'Dialog'
};
/* global window alert jQuery */
/** 
 * @widget Draggable 
 * @plugin Base
 */
gj.draggable = {
    plugins: {}
};

gj.draggable.config = {
    base: {
        /** If specified, restricts dragging from starting unless the mousedown occurs on the specified element.
         * Only elements that descend from the draggable element are permitted.
         * @type jquery element
         * @default undefined
         * @example sample <!-- draggable -->
         * <style>
         * .element { border: 1px solid #999; width: 300px; height: 200px; }
         * .handle { background-color: #DDD; cursor: move; width: 200px; margin: 5px auto 0px auto; text-align: center; padding: 5px; }
         * </style>
         * <div id="element" class="element">
         *   <div id="handle" class="handle">Handle for dragging</div>
         * </div>
         * <script>
         *     $('#element').draggable({
         *         handle: $('#handle')
         *     });
         * </script>
         */
        handle: undefined,

        /** If set to false, restricts dragging on vertical direction.
         * @type Boolean
         * @default true
         * @example sample <!-- draggable -->
         * <style>
         * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
         * </style>
         * <div id="element" class="element">
         *     drag me<br/>
         *     <i>(dragging on vertical direction is disabled)</i>
         * </div>
         * <script>
         *     $('#element').draggable({
         *         vertical: false
         *     });
         * </script>
         */
        vertical: true,

        /** If set to false, restricts dragging on horizontal direction.
         * @type Boolean
         * @default true
         * @example sample <!-- draggable -->
         * <style>
         * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
         * </style>
         * <div id="element" class="element">
         *     drag me<br/>
         *     <i>(dragging on horizontal direction is disabled)</i>
         * </div>
         * <script>
         *     $('#element').draggable({
         *         horizontal: false
         *     });
         * </script>
         */
        horizontal: true,

        /** Constrains dragging to within the bounds of the specified element.
         * @type Element
         * @default undefined
         * @example sample <!-- draggable -->
         * <style>
         * .container { border: 1px solid #999; width: 600px; height: 600px; }
         * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
         * </style>
         * <div id="container" class="container">
         *     <div id="element" class="element">drag me</div>
         * </div>
         * <script>
         *     $('#element').draggable({
         *         containment: document.getElementById('container')
         *     });
         * </script>
         */
        containment: undefined
    }
};

gj.draggable.methods = {
    init: function (jsConfig) {
        var $handleEl, data, $dragEl = this;

        gj.widget.prototype.init.call(this, jsConfig, 'draggable');
        data = this.data();
        $dragEl.attr('data-draggable', 'true');

        $handleEl = gj.draggable.methods.getHandleElement($dragEl);

        $handleEl.on('touchstart mousedown', function (e) {
            var position = gj.core.position($dragEl[0]);
            $dragEl[0].style.top = position.top + 'px';
            $dragEl[0].style.left = position.left + 'px';
            $dragEl[0].style.position = 'fixed';

            $dragEl.attr('draggable-dragging', true);
            $dragEl.removeAttr('draggable-x').removeAttr('draggable-y');
            gj.documentManager.subscribeForEvent('touchmove', $dragEl.data('guid'), gj.draggable.methods.createMoveHandler($dragEl, $handleEl, data));
            gj.documentManager.subscribeForEvent('mousemove', $dragEl.data('guid'), gj.draggable.methods.createMoveHandler($dragEl, $handleEl, data));
        });

        gj.documentManager.subscribeForEvent('mouseup', $dragEl.data('guid'), gj.draggable.methods.createUpHandler($dragEl));
        gj.documentManager.subscribeForEvent('touchend', $dragEl.data('guid'), gj.draggable.methods.createUpHandler($dragEl));
        gj.documentManager.subscribeForEvent('touchcancel', $dragEl.data('guid'), gj.draggable.methods.createUpHandler($dragEl));

        return $dragEl;
    },

    getHandleElement: function ($dragEl) {
        var $handle = $dragEl.data('handle');
        return ($handle && $handle.length) ? $handle : $dragEl;
    },

    createUpHandler: function ($dragEl) {
        return function (e) {
            if ($dragEl.attr('draggable-dragging') === 'true') {
                $dragEl.attr('draggable-dragging', false);
                gj.documentManager.unsubscribeForEvent('mousemove', $dragEl.data('guid'));
                gj.documentManager.unsubscribeForEvent('touchmove', $dragEl.data('guid'));
                gj.draggable.events.stop($dragEl, { x: $dragEl.mouseX(e), y: $dragEl.mouseY(e) });
            }
        };
    },

    createMoveHandler: function ($dragEl, $handleEl, data) {
        return function (e) {
            var mouseX, mouseY, offsetX, offsetY, prevX, prevY;
            if ($dragEl.attr('draggable-dragging') === 'true') {
                mouseX = Math.round($dragEl.mouseX(e));
                mouseY = Math.round($dragEl.mouseY(e));
                prevX = $dragEl.attr('draggable-x');
                prevY = $dragEl.attr('draggable-y');
                if (prevX && prevY) {
                    offsetX = data.horizontal ? mouseX - parseInt(prevX, 10) : 0;
                    offsetY = data.vertical ? mouseY - parseInt(prevY, 10) : 0;
                    gj.draggable.methods.move($dragEl[0], data, offsetX, offsetY, mouseX, mouseY);
                } else {
                    gj.draggable.events.start($dragEl, mouseX, mouseY);
                }
                $dragEl.attr('draggable-x', mouseX);
                $dragEl.attr('draggable-y', mouseY);
            }
        }
    },

    move: function (dragEl, data, offsetX, offsetY, mouseX, mouseY) {
        var contPosition, maxTop, maxLeft,
            position = gj.core.position(dragEl),
            newTop = position.top + offsetY,
            newLeft = position.left + offsetX;

        if (data.containment) {
            contPosition = gj.core.position(data.containment);
            maxTop = contPosition.top + gj.core.height(data.containment) - gj.core.height(dragEl);
            maxLeft = contPosition.left + gj.core.width(data.containment) - gj.core.width(dragEl);
            if (newTop > contPosition.top && newTop < maxTop) {
                if (contPosition.top >= mouseY || contPosition.bottom <= mouseY) {
                    newTop = position.top;
                }
            } else {
                if (newTop <= contPosition.top) {
                    newTop = contPosition.top + 1;
                } else {
                    newTop = maxTop - 1;
                }
            }
            if (newLeft > contPosition.left && newLeft < maxLeft) {
                if (contPosition.left >= mouseX || contPosition.right <= mouseX) {
                    newLeft = position.left;
                }
            } else {
                if (newLeft <= contPosition.left) {
                    newLeft = contPosition.left + 1;
                } else {
                    newLeft = maxLeft - 1;
                }
            }
        }

        if (false !== gj.draggable.events.drag($(dragEl), newLeft, newTop, mouseX, mouseY)) {
            dragEl.style.top = newTop + 'px';
            dragEl.style.left = newLeft + 'px';
        }
    },

    destroy: function ($dragEl) {
        if ($dragEl.attr('data-draggable') === 'true') {
            gj.documentManager.unsubscribeForEvent('mouseup', $dragEl.data('guid'));
            $dragEl.removeData();
            $dragEl.removeAttr('data-guid').removeAttr('data-type').removeAttr('data-draggable');
            $dragEl.removeAttr('draggable-x').removeAttr('draggable-y').removeAttr('draggable-dragging');
            $dragEl[0].style.top = '';
            $dragEl[0].style.left = '';
            $dragEl[0].style.position = '';
            $dragEl.off('drag').off('start').off('stop');
            gj.draggable.methods.getHandleElement($dragEl).off('mousedown');
        }
        return $dragEl;
    }
};

gj.draggable.events = {
    /**
     * Triggered while the mouse is moved during the dragging, immediately before the current move happens.
     *
     * @event drag
     * @param {object} e - event data
     * @param {object} newPosition - New position of the draggable element as { top, left } object.
     * @param {object} mousePosition - Current mouse position as { x, y } object.
     * @example sample <!-- draggable -->
     * <style>
     * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
     * </style>
     * <div id="element" class="element gj-unselectable">drag me</div>
     * <script>
     *     $('#element').draggable({
     *         drag: function (e, newPosition, mousePosition) {
     *             $('body').append('<div>The drag event is fired. New Element Position = { top:' + newPosition.top + ', left: ' + newPosition.left + '}.</div>');
     *         }
     *     });
     * </script>
     */
    drag: function ($dragEl, newLeft, newTop, mouseX, mouseY) {
        return $dragEl.triggerHandler('drag', [{ left: newLeft, top: newTop }, { x: mouseX, y: mouseY }]);
    },

    /**
     * Triggered when dragging starts.
     *
     * @event start
     * @param {object} e - event data
     * @param {object} mousePosition - Current mouse position as { x, y } object.
     * @example sample <!-- draggable -->
     * <style>
     * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
     * </style>
     * <div id="element" class="element gj-unselectable">
     *   drag me
     * </div>
     * <script>
     *     $('#element').draggable({
     *         start: function (e, mousePosition) {
     *             $('body').append('<div>The start event is fired. mousePosition { x:' + mousePosition.x + ', y: ' + mousePosition.y + '}.</div>');
     *         }
     *     });
     * </script>
     */
    start: function ($dragEl, mouseX, mouseY) {
        $dragEl.triggerHandler('start', [{ x: mouseX, y: mouseY }]);
    },

    /**
     * Triggered when dragging stops.
     *
     * @event stop
     * @param {object} e - event data
     * @param {object} mousePosition - Current mouse position as { x, y } object.
     * @example sample <!-- draggable -->
     * <style>
     * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
     * </style>
     * <div id="element" class="element gj-unselectable">
     *   drag me
     * </div>
     * <script>
     *     $('#element').draggable({
     *         stop: function (e, offset) {
     *             $('body').append('<div>The stop event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    stop: function ($dragEl, mousePosition) {
        $dragEl.triggerHandler('stop', [mousePosition]);
    }
};

gj.draggable.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.draggable.methods;

    if (!$element.destroy) {
        /** Remove draggable functionality from the element.
         * @method
         * @return jquery element
         * @example sample <!-- draggable -->
         * <style>
         * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
         * </style>
         * <button onclick="dragEl.destroy()" class="gj-button-md">Destroy</button>
         * <div id="element" class="element">Drag Me</div>
         * <script>
         *     var dragEl = $('#element').draggable();
         * </script>
         */
        self.destroy = function () {
            return methods.destroy(this);
        };
    }

    $.extend($element, self);
    if ('true' !== $element.attr('data-draggable')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.draggable.widget.prototype = new gj.widget();
gj.draggable.widget.constructor = gj.draggable.widget;

(function ($) {
    $.fn.draggable = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.draggable.widget(this, method);
            } else {
                $widget = new gj.draggable.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
/* global window alert jQuery */
/** 
 * @widget Droppable 
 * @plugin Base
 */
gj.droppable = {
    plugins: {}
};

gj.droppable.config = {
    /** If specified, the class will be added to the droppable while draggable is being hovered over the droppable.
     * @type string
     * @default undefined
     * @example sample <!-- droppable, draggable -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .hover { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     $('#draggable').draggable();
     *     $('#droppable').droppable({ hoverClass: 'hover' });
     * </script>
     */
    hoverClass: undefined
};

gj.droppable.methods = {
    init: function (jsConfig) {
        var $dropEl = this;

        gj.widget.prototype.init.call(this, jsConfig, 'droppable');
        $dropEl.attr('data-droppable', 'true');
        
        gj.documentManager.subscribeForEvent('mousedown', $dropEl.data('guid'), gj.droppable.methods.createMouseDownHandler($dropEl));
        gj.documentManager.subscribeForEvent('mousemove', $dropEl.data('guid'), gj.droppable.methods.createMouseMoveHandler($dropEl));
        gj.documentManager.subscribeForEvent('mouseup', $dropEl.data('guid'), gj.droppable.methods.createMouseUpHandler($dropEl));
        
        return $dropEl;
    },

    createMouseDownHandler: function ($dropEl) {
        return function (e) {
            $dropEl.isDragging = true;
        }
    },

    createMouseMoveHandler: function ($dropEl) {
        return function (e) {
            if ($dropEl.isDragging) {
                var hoverClass = $dropEl.data('hoverClass'),
                    mousePosition = {
                        x: $dropEl.mouseX(e),
                        y: $dropEl.mouseY(e)
                    },
                    newIsOver = gj.droppable.methods.isOver($dropEl, mousePosition);
                if (newIsOver != $dropEl.isOver) {
                    if (newIsOver) {
                        if (hoverClass) {
                            $dropEl.addClass(hoverClass);
                        }
                        gj.droppable.events.over($dropEl, mousePosition);
                    } else {
                        if (hoverClass) {
                            $dropEl.removeClass(hoverClass);
                        }
                        gj.droppable.events.out($dropEl);
                    }
                }
                $dropEl.isOver = newIsOver;
            }
        }
    },

    createMouseUpHandler: function ($dropEl) {
        return function (e) {
            var mousePosition = {
                left: $dropEl.mouseX(e),
                top: $dropEl.mouseY(e)
            };
            $dropEl.isDragging = false;
            if (gj.droppable.methods.isOver($dropEl, mousePosition)) {
                gj.droppable.events.drop($dropEl);
            }
        }
    },

    isOver: function ($dropEl, mousePosition) {
        var offsetTop = $dropEl.offset().top,
            offsetLeft = $dropEl.offset().left;
        return mousePosition.x > offsetLeft && mousePosition.x < (offsetLeft + $dropEl.outerWidth(true))
            && mousePosition.y > offsetTop && mousePosition.y < (offsetTop + $dropEl.outerHeight(true));
    },

    destroy: function ($dropEl) {
        if ($dropEl.attr('data-droppable') === 'true') {
            gj.documentManager.unsubscribeForEvent('mousedown', $dropEl.data('guid'));
            gj.documentManager.unsubscribeForEvent('mousemove', $dropEl.data('guid'));
            gj.documentManager.unsubscribeForEvent('mouseup', $dropEl.data('guid'));
            $dropEl.removeData();
            $dropEl.removeAttr('data-guid');
            $dropEl.removeAttr('data-droppable');
            $dropEl.off('drop').off('over').off('out');
        }
        return $dropEl;
    }
};

gj.droppable.events = {
    /** Triggered when a draggable element is dropped.
     * @event drop
     * @param {object} e - event data
     * @example sample <!-- droppable, draggable -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .drop { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     $('#draggable').draggable();
     *     $('#droppable').droppable({ drop: function() { $(this).addClass('drop') } });
     * </script>
     */
    drop: function ($dropEl, offsetX, offsetY) {
        $dropEl.trigger('drop', [{ top: offsetY, left: offsetX }]);
    },

    /** Triggered when a draggable element is dragged over the droppable.
     * @event over
     * @param {object} e - event data
     * @param {object} mousePosition - Current mouse position as { top, left } object.
     * @example sample <!-- droppable, draggable -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .hover { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     $('#draggable').draggable();
     *     $('#droppable').droppable({
     *         over: function() { 
     *             $(this).addClass('hover')
     *         },
     *         out: function() {
     *             $(this).removeClass('hover')
     *         }
     *     });
     * </script>
     */
    over: function ($dropEl, mousePosition) {
        $dropEl.trigger('over', [mousePosition]);
    },

    /** Triggered when a draggable element is dragged out of the droppable.
     * @event out
     * @param {object} e - event data
     * @example sample <!-- droppable, draggable -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .hover { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     $('#draggable').draggable();
     *     $('#droppable').droppable({
     *         over: function() { $(this).addClass('hover') },
     *         out: function() { $(this).removeClass('hover') }
     *     });
     * </script>
     */
    out: function ($dropEl) {
        $dropEl.trigger('out');
    }
};

gj.droppable.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.droppable.methods;

    self.isOver = false;
    self.isDragging = false;

    /** Removes the droppable functionality.
     * @method
     * @return jquery element
     * @example sample <!-- draggable, droppable -->
     * <button onclick="create()" class="gj-button-md">Create</button>
     * <button onclick="dropEl.destroy()" class="gj-button-md">Destroy</button>
     * <br/><br/>
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .hover { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     var dropEl;
     *     $('#draggable').draggable();
     *     function create() {
     *         dropEl = $('#droppable').droppable({
     *             hoverClass: 'hover'
     *         });
     *     }
     *     create();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    }

    self.isOver = function (mousePosition) {
        return methods.isOver(this, mousePosition);
    }

    $.extend($element, self);
    if ('true' !== $element.attr('data-droppable')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.droppable.widget.prototype = new gj.widget();
gj.droppable.widget.constructor = gj.droppable.widget;

(function ($) {
    $.fn.droppable = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.droppable.widget(this, method);
            } else {
                $widget = new gj.droppable.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
/* global window alert jQuery gj */
/**
  * @widget Grid
  * @plugin Base
  */
gj.grid = {
    plugins: {},
    messages: {}
};

gj.grid.config = {
    base: {
        /** The data source for the grid.
         * @additionalinfo If set to string, then the grid is going to use this string as a url for ajax requests to the server.<br />
         * If set to object, then the grid is going to use this object as settings for the <a href="http://api.jquery.com/jquery.ajax/" target="_new">jquery ajax</a> function.<br />
         * If set to array, then the grid is going to use the array as data for rows.
         * @type (string|object|array)
         * @default undefined
         * @example Remote.JS.Configuration <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         columns: [ { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Remote.Html.Configuration <!-- grid -->
         * <table id="grid" data-source="/Players/Get">
         *     <thead>
         *         <tr>
         *             <th width="56" data-field="ID">#</th>
         *             <th>Name</th>
         *             <th>PlaceOfBirth</th>
         *         </tr>
         *     </thead>
         * </table>
         * <script>
         *     $('#grid').grid();
         * </script>
         * @example Local.DataSource <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var data = [
         *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     $('#grid').grid({
         *         dataSource: data,
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Html.DataSource <!-- grid, dropdown -->
         * <table id="grid">
         *     <thead>
         *         <tr>
         *             <th width="56" data-field="ID">#</th>
         *             <th data-sortable="true">Name</th>
         *             <th data-field="PlaceOfBirth" data-sortable="true">Place Of Birth</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td>1</td>
         *             <td>Hristo Stoichkov</td>
         *             <td>Plovdiv, Bulgaria</td>
         *         </tr>
         *         <tr>
         *             <td>2</td>
         *             <td>Ronaldo Luis Nazario de Lima</td>
         *             <td>Rio de Janeiro, Brazil</td>
         *         </tr>
         *         <tr>
         *             <td>3</td>
         *             <td>David Platt</td>
         *             <td>Chadderton, Lancashire, England</td>
         *         </tr>
         *     </tbody>
         * </table>
         * <script>
         *     $('#grid').grid({ pager: { limit: 2, sizes: [2, 5, 10, 20] }});
         * </script>
         * @example Remote.Custom.Render <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var grid, onSuccessFunc = function (response) {
         *         alert('The result contains ' + response.records.length + ' records.');
         *         grid.render(response);
         *     };
         *     grid = $('#grid').grid({
         *         dataSource: { url: '/Players/Get', data: {}, success: onSuccessFunc },
         *         columns: [ { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Remote.Custom.Error <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var grid, onErrorFunc = function (response) {
         *         alert('Server error.');
         *     };
         *     grid = $('#grid').grid({
         *         dataSource: { url: '/DataSources/InvalidUrl', error: onErrorFunc },
         *         columns: [ { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        dataSource: undefined,

        /** An array that holds the configurations of each column from the grid.
         * @type array
         * @example JS.Configuration <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth', name: 'Birth Place' } ]
         *     });
         * </script>
         */
        columns: [],

        /** Auto generate column for each field in the datasource when set to true.
         * @type array
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         autoGenerateColumns: true
         *     });
         * </script>
         */
        autoGenerateColumns: false,

        /** An object that holds the default configuration settings of each column from the grid.
         * @type object
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         defaultColumnSettings: { align: 'right' },
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth', name: 'Birth Place' } ]
         *     });
         * </script>
         */
        defaultColumnSettings: {

            /** If set to true the column will not be displayed in the grid. By default all columns are displayed.
             * @alias column.hidden
             * @type boolean
             * @default false
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         columns: [
             *            { field: 'ID', width: 56 },
             *            { field: 'Name' },
             *            { field: 'PlaceOfBirth', hidden: true }
             *        ]
             *     });
             * </script>
             */
            hidden: false,

            /** The width of the column. Numeric values are treated as pixels.
             * If the width is undefined the width of the column is not set and depends on the with of the table(grid).
             * @alias column.width
             * @type number|string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', width: 120 },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             * </script>
             */
            width: undefined,

            /** Indicates if the column is sortable.
             * If set to true the user can click the column header and sort the grid by the column source field.
             * @alias column.sortable
             * @type boolean|object
             * @default false
             * @example Remote <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', sortable: true },
             *             { field: 'PlaceOfBirth', sortable: false }
             *         ]
             *     });
             * </script>
             * @example Local.Custom <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     var data = [
             *         { 'ID': 1, 'Value1': 'Foo', 'Value2': 'Foo' },
             *         { 'ID': 2, 'Value1': 'bar', 'Value2': 'bar' },
             *         { 'ID': 3, 'Value1': 'moo', 'Value2': 'moo' },
             *         { 'ID': 4, 'Value1': null, 'Value2': undefined }
             *     ];
             *     var caseSensitiveSort = function (direction, column) { 
             *         return function (recordA, recordB) {
             *             var a = recordA[column.field] || '',
             *                 b = recordB[column.field] || '';
             *             return (direction === 'asc') ? a < b : b < a;
             *         };
             *     };
             *     $('#grid').grid({
             *         dataSource: data,
             *         columns: [
             *             { field: 'ID' },
             *             { field: 'Value1', sortable: true },
             *             { field: 'Value2', sortable: { sorter: caseSensitiveSort } }
             *         ]
             *     });
             * </script>
             * @example Remote.Bootstrap.3 <!-- bootstrap, grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         uiLibrary: 'bootstrap',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', sortable: true },
             *             { field: 'PlaceOfBirth', sortable: false }
             *         ]
             *     });
             * </script>
             * @example Remote.Bootstrap.4.Material.Icons <!-- bootstrap4, grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         uiLibrary: 'bootstrap4',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', sortable: true },
             *             { field: 'PlaceOfBirth', sortable: false }
             *         ]
             *     });
             * </script>
             * @example Remote.Bootstrap.4.FontAwesome <!-- bootstrap4, fontawesome, grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         uiLibrary: 'bootstrap4',
             *         iconsLibrary: 'fontawesome',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', sortable: true },
             *             { field: 'PlaceOfBirth', sortable: false }
             *         ]
             *     });
             * </script>
             */
            sortable: false,

            /** Indicates the type of the column.
             * @alias column.type
             * @type text|checkbox|icon|date|time|datetime
             * @default 'text'
             * @example Bootstrap.3.Icon <!-- grid, bootstrap -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' },
             *             {
             *               title: '', field: 'Info', width: 32, type: 'icon', icon: 'glyphicon-info-sign',
             *               events: {
             *                 'click': function (e) {
             *                     alert('record with id=' + e.data.id + ' is clicked.');
             *                 }
             *               }
             *             }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.4.Icon <!-- grid, bootstrap4, fontawesome -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap4',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' },
             *             {
             *               title: '', field: 'Info', width: 42, type: 'icon', icon: 'fa fa-pencil',
             *               events: {
             *                 'click': function (e) {
             *                     alert('record with id=' + e.data.id + ' is clicked.');
             *                 }
             *               }
             *             }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.3.Checkbox <!-- grid, checkbox, bootstrap -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' },
             *             { title: 'Active?', field: 'IsActive', width: 80, type: 'checkbox', align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.4.Checkbox <!-- grid, checkbox, bootstrap4 -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap4',
             *         columns: [
             *             { field: 'ID', width: 46 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' },
             *             { title: 'Active?', field: 'IsActive', width: 80, type: 'checkbox', align: 'center' }
             *         ]
             *     });
             * </script>
             */
            type: 'text',

            /** The caption that is going to be displayed in the header of the grid.
             * @alias column.title
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' }
             *         ]
             *     });
             * </script>
             */
            title: undefined,

            /** The field name to which the column is bound.
             * If the column.title is not defined this value is used as column.title.
             * @alias column.field
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' }
             *         ]
             *     });
             * </script>
             */
            field: undefined,

            /** This setting control the alignment of the text in the cell.
             * @alias column.align
             * @type left|right|center|justify|initial|inherit
             * @default undefined
             * @example Material.Design <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 100, align: 'center' },
             *             { field: 'Name', align: 'right' },
             *             { field: 'PlaceOfBirth', align: 'left' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.4 <!-- grid, bootstrap4 -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap4',
             *         columns: [
             *             { field: 'ID', width: 56, align: 'center' },
             *             { field: 'Name', align: 'right' },
             *             { field: 'PlaceOfBirth', align: 'left' }
             *         ]
             *     });
             * </script>
             */
            align: undefined,

            /** The name(s) of css class(es) that are going to be applied to all cells inside that column, except the header cell.
             * @alias column.cssClass
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <style>
             * .nowrap { white-space: nowrap }
             * .bold { font-weight: bold }
             * </style>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', width: 100, cssClass: 'nowrap bold' },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             * </script>
             */
            cssClass: undefined,

            /** The name(s) of css class(es) that are going to be applied to the header cell of that column.
             * @alias column.headerCssClass
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <style>
             * .italic { font-style: italic }
             * </style>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', headerCssClass: 'italic' },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             * </script>
             */
            headerCssClass: undefined,

            /** The text for the cell tooltip.
             * @alias column.tooltip
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56, tooltip: 'This is my tooltip 1.' },
             *             { field: 'Name', tooltip: 'This is my tooltip 2.' },
             *             { field: 'PlaceOfBirth', tooltip: 'This is my tooltip 3.' }
             *         ]
             *     });
             * </script>
             */
            tooltip: undefined,

            /** Css class for icon that is going to be in use for the cell.
             * This setting can be in use only with combination of type icon.
             * @alias column.icon
             * @type string
             * @default undefined
             * @example sample <!-- bootstrap, grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth' },
             *             { title: '', field: 'Edit', width: 32, type: 'icon', icon: 'glyphicon-pencil', events: { 'click': function (e) { alert('name=' + e.data.record.Name); } } }
             *         ]
             *     });
             * </script>
             */
            icon: undefined,

            /** Configuration object with event names as keys and functions as values that are going to be bind to each cell from the column.
             * Each function is going to receive event information as a parameter with info in the 'data' field for id, field name and record data.
             * @alias column.events
             * @type object
             * @default undefined
             * @example javascript.configuration <!-- bootstrap, grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             {
             *               field: 'Name',
             *               events: {
             *                 'mouseenter': function (e) {
             *                     e.stopPropagation();
             *                     $(e.currentTarget).css('background-color', 'red');
             *                 },
             *                 'mouseleave': function (e) {
             *                     e.stopPropagation();
             *                     $(e.currentTarget).css('background-color', '');
             *                 }
             *               }
             *             },
             *             { field: 'PlaceOfBirth' },
             *             {
             *               title: '', field: 'Info', width: 34, type: 'icon', icon: 'glyphicon-info-sign',
             *               events: {
             *                 'click': function (e) {
             *                     alert('record with id=' + e.data.id + ' is clicked.'); }
             *                 }
             *             }
             *         ]
             *     });
             * </script>
             * @example html.configuration <!-- bootstrap, grid -->
             * <table id="grid" data-source="/Players/Get" data-ui-library="bootstrap">
             *     <thead>
             *         <tr>
             *             <th data-field="ID" width="34">ID</th>
             *             <th data-events="mouseenter: onMouseEnter, mouseleave: onMouseLeave">Name</th>
             *             <th data-field="PlaceOfBirth">Place Of Birth</th>
             *             <th data-events="click: onClick" data-type="icon" data-icon="glyphicon-info-sign" width="32"></th>
             *         </tr>
             *     </thead>
             * </table>
             * <script>
             *     function onMouseEnter (e) {
             *         $(e.currentTarget).css('background-color', 'red');
             *     }
             *     function onMouseLeave (e) {
             *         $(e.currentTarget).css('background-color', '');
             *     }
             *     function onClick(e) {
             *         alert('record with id=' + e.data.id + ' is clicked.');
             *     }
             *     $('#grid').grid();
             * </script>
             */
            events: undefined,

            /** Format the date when the type of the column is date.
             * @additionalinfo <b>d</b> - Day of the month as digits; no leading zero for single-digit days.<br/>
             * <b>dd</b> - Day of the month as digits; leading zero for single-digit days.<br/>
             * <b>m</b> - Month as digits; no leading zero for single-digit months.<br/>
             * <b>mm</b> - Month as digits; leading zero for single-digit months.<br/>
             * <b>yy</b> - Year as last two digits; leading zero for years less than 10.<br/>
             * <b>yyyy</b> - Year represented by four digits.<br/>
             * <b>s</b> - Seconds; no leading zero for single-digit seconds.<br/>
             * <b>ss</b> - Seconds; leading zero for single-digit seconds.<br/>
             * <b>M</b> - Minutes; no leading zero for single-digit minutes. Uppercase MM to avoid conflict with months.<br/>
             * <b>MM</b> - Minutes; leading zero for single-digit minutes. Uppercase MM to avoid conflict with months.<br/>
             * <b>H</b> - Hours; no leading zero for single-digit hours (24-hour clock).<br/>
             * <b>HH</b> - Hours; leading zero for single-digit hours (24-hour clock).<br/>
             * <b>h</b> - Hours; no leading zero for single-digit hours (12-hour clock).<br/>
             * <b>hh</b> - Hours; leading zero for single-digit hours (12-hour clock).<br/>
             * <b>tt</b> - Lowercase, two-character time marker string: am or pm.<br/>
             * <b>TT</b> - Uppercase, two-character time marker string: AM or PM.<br/>
             * @alias column.format
             * @type string
             * @default 'mm/dd/yyyy'
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name' },
             *             { field: 'DateOfBirth', title: 'Date 1', type: 'date', format: 'HH:MM:ss mm/dd/yyyy' },
             *             { field: 'DateOfBirth', title: 'Date 2', type: 'date' }
             *         ]
             *     });
             * </script>
             */
            format: 'mm/dd/yyyy',

            /** Number of decimal digits after the decimal point.
             * @alias column.decimalDigits
             * @type number
             * @default undefined
             */
            decimalDigits: undefined,

            /** Template for the content in the column.
             * Use curly brackets '{}' to wrap the names of data source columns from server response.
             * @alias column.tmpl
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name' },
             *             { title: 'Info', tmpl: '{Name} is born in {PlaceOfBirth}.' }
             *         ]
             *     });
             * </script>
             */
            tmpl: undefined,

            /** If set to true stop event propagation when event occur.
             * @alias column.stopPropagation
             * @type boolean
             * @default false
             * @example sample <!-- bootstrap, grid -->
             * <table id="grid" data-source="/Players/Get"></table>
             * <script>
             *     $('#grid').grid({
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', events: { 'click': function (e) { alert('name=' + e.data.record.Name); } }  },
             *             { field: 'PlaceOfBirth', stopPropagation: true, events: { 'click': function (e) { alert('name=' + e.data.record.Name); } }   },
             *             { title: '', field: 'Edit', width: 32, type: 'icon', icon: 'glyphicon-pencil', events: { 'click': function (e) { alert('name=' + e.data.record.Name); } } }
             *         ]
             *     });
             * </script>
             */
            stopPropagation: false,

            /** A renderer is an 'interceptor' function which can be used to transform data (value, appearance, etc.) before it is rendered.
             * @additionalinfo If the renderer function return a value, then this value is going to be automatically set as value of the cell.<br/>
             * If the renderer function doesn't return a value, then you have to set the content of the cell manually.
             * @alias column.renderer
             * @type function
             * @default undefined
             * @param {string} value - the record field value
             * @param {object} record - the data of the row record
             * @param {object} $cell - the current table cell presented as jquery object
             * @param {object} $displayEl - inner div element for display of the cell value presented as jquery object
             * @param {string} id - the id of the record
             * @example sample <!-- grid -->
             * <table id="grid" data-source="/Players/Get"></table>
             * <script>
             *     var nameRenderer = function (value, record, $cell, $displayEl) { 
             *         $cell.css('font-style', 'italic'); 
             *         $displayEl.css('background-color', '#EEE');
             *         $displayEl.text(value);
             *     };
             *     $('#grid').grid({
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', renderer: nameRenderer },
             *             { field: 'PlaceOfBirth', renderer: function (value, record) { return record.ID % 2 ? '<b>' + value + '</b>' : '<i>' + value + '</i>'; }  }
             *         ]
             *     });
             * </script>
             */
            renderer: undefined,

            /** Function which can be used to customize filtering with local data (javascript sourced data).
             * @additionalinfo The default filtering is not case sensitive. The filtering with remote data sources needs to be handled on the server.
             * @alias column.filter
             * @type function
             * @default undefined
             * @param {string} value - the record field value
             * @param {string} searchStr - the search string
             * @example example <!-- grid -->
             * <input type="text" id="txtValue1" placeholder="Value 1" /> &nbsp;
             * <input type="text" id="txtValue2" placeholder="Value 2" /> &nbsp;
             * <button id="btnSearch">Search</button> <br/><br/>
             * <table id="grid"></table>
             * <script>
             *     var grid, data = [
             *             { 'ID': 1, 'Value1': 'Foo', 'Value2': 'Foo' },
             *             { 'ID': 2, 'Value1': 'bar', 'Value2': 'bar' },
             *             { 'ID': 3, 'Value1': 'moo', 'Value2': 'moo' },
             *             { 'ID': 4, 'Value1': null, 'Value2': undefined }
             *         ],
             *         caseSensitiveFilter = function (value, searchStr) { 
             *             return value.indexOf(searchStr) > -1;
             *         };
             *     grid = $('#grid').grid({
             *         dataSource: data,
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Value1' },
             *             { field: 'Value2', filter: caseSensitiveFilter }
             *         ]
             *     });
             *     $('#btnSearch').on('click', function () {
             *         grid.reload({ Value1: $('#txtValue1').val(), Value2: $('#txtValue2').val() });
             *     });
             * </script>
             */
            filter: undefined
        },

        mapping: {
            /** The name of the object in the server response, that contains array with records, that needs to be display in the grid.
             * @alias mapping.dataField
             * @type string
             * @default "records"
             */
            dataField: 'records',

            /** The name of the object in the server response, that contains the number of all records on the server.
             * @alias mapping.totalRecordsField
             * @type string
             * @default "total"
             */
            totalRecordsField: 'total'
        },

        params: {},

        paramNames: {

            /** The name of the parameter that is going to send the name of the column for sorting.
             * The "sortable" setting for at least one column should be enabled in order this parameter to be in use.
             * @alias paramNames.sortBy
             * @type string
             * @default "sortBy"
             */
            sortBy: 'sortBy',

            /** The name of the parameter that is going to send the direction for sorting.
             * The "sortable" setting for at least one column should be enabled in order this parameter to be in use.
             * @alias paramNames.direction
             * @type string
             * @default "direction"
             */
            direction: 'direction'
        },

        /** The name of the UI library that is going to be in use. Currently we support Bootstrap 3, Bootstrap 4 and Material Design.
         * @additionalinfo The css files for Bootstrap or Material Design should be manually included to the page where the grid is in use.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default 'materialdesign'
         * @example Material.Design.With.Icons <!-- dropdown, grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Material.Design.Without.Icons <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'materialdesign',
         *         iconsLibrary: '',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Bootstrap.3 <!-- grid, dropdown, bootstrap -->
         * <div class="container"><table id="grid"></table></div>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap',
         *         columns: [
         *             { field: 'ID' },
         *             { field: 'Name', sortable: true },
         *             { field: 'PlaceOfBirth' }
         *         ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, dropdown, grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome',
         *         columns: [ { field: 'ID', width: 38 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.
         * @additionalinfo If you use Bootstrap 3 as uiLibrary, then the iconsLibrary is set to Glyphicons by default.<br/>
         * If you use Material Design as uiLibrary, then the iconsLibrary is set to Material Icons by default.<br/>
         * The css files for Material Icons, Font Awesome or Glyphicons should be manually included to the page where the grid is in use.
         * @type (materialicons|fontawesome|glyphicons)
         * @default 'materialicons'
         * @example Font.Awesome <!-- fontawesome, grid, dropdown -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         iconsLibrary: 'fontawesome',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 5 }
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        /** The type of the row selection.<br/>
         * If the type is set to multiple the user will be able to select more then one row from the grid.
         * @type (single|multiple)
         * @default 'single'
         * @example Multiple.Material.Design.Checkbox <!-- checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         selectionType: 'multiple',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Multiple.Bootstrap.3.Checkbox <!-- bootstrap, checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         primaryKey: 'ID',
         *         uiLibrary: 'bootstrap',
         *         dataSource: '/Players/Get',
         *         selectionType: 'multiple',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID', width: 32 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Multiple.Bootstrap.4.Checkbox <!-- bootstrap4, checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         uiLibrary: 'bootstrap4',
         *         dataSource: '/Players/Get',
         *         selectionType: 'multiple',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Single.Checkbox <!-- checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         selectionType: 'single',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        selectionType: 'single',

        /** The type of the row selection mechanism.
         * @additionalinfo If this setting is set to "basic" when the user select a row, then this row will be highlighted.<br/>
         * If this setting is set to "checkbox" a column with checkboxes will appear as first row of the grid and when the user select a row, then this row will be highlighted and the checkbox selected.
         * @type (basic|checkbox)
         * @default "basic"
         * @example sample <!-- checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         selectionType: 'single',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        selectionMethod: 'basic',

        /** When this setting is enabled the content of the grid will be loaded automatically after the creation of the grid.
         * @type boolean
         * @default true
         * @example disabled <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         autoLoad: false,
         *         columns: [ { field: 'ID' }, { field: 'Name' } ]
         *     });
         *     grid.reload(); //call .reload() explicitly in order to load the data in the grid
         * </script>
         * @example enabled <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         autoLoad: true,
         *         columns: [ { field: 'ID' }, { field: 'Name' } ]
         *     });
         * </script>
         */
        autoLoad: true,

        /** The text that is going to be displayed if the grid is empty.
         * @type string
         * @default "No records found."
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: { url: '/Players/Get', data: { name: 'not existing name' } },
         *         notFoundText: 'No records found custom message',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example localization <!-- grid -->
         * <table id="grid"></table>
         * <script src="../../dist/modular/grid/js/messages/messages.de-de.js"></script>
         * <script>
         *     $('#grid').grid({
         *         dataSource: { url: '/Players/Get', data: { name: 'not existing name' } },
         *         locale: 'de-de',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        notFoundText: undefined,

        /** Width of the grid.
         * @type number
         * @default undefined
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         width: 400,
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        width: undefined,

        /** Minimum width of the grid.
         * @type number
         * @default undefined
         */
        minWidth: undefined,

        /** This configuration option manage the behaviour of the header row height.
         * Auto scale if set to to 'autogrow'. All body rows are with the same height if set to 'fixed'.
         * @type ('autogrow'|'fixed')
         * @default "fixed"
         * @example AutoGrow <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var data = [
         *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         width: 500,
         *         headerRowHeight: 'autogrow',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth', title: 'Very very very very long column title', width: 200 } ]
         *     });
         * </script>
         * @example Fixed <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var data = [
         *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         width: 500,
         *         headerRowHeight: 'fixed',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth', title: 'Very very very very long column title', width: 200 } ]
         *     });
         * </script>
         */
        headerRowHeight: 'fixed',

        /** This configuration option manage the behaviour of the body row height.
         * Auto scale if set to to 'autogrow'. All body rows are with the same height if set to 'fixed'.
         * @type ('autogrow'|'fixed')
         * @default "autogrow"
         * @example AutoGrow <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var data = [
         *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         width: 500,
         *         bodyRowHeight: 'autogrow',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth', title: 'Very very very very long column title', width: 200 } ]
         *     });
         * </script>
         * @example Fixed <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var data = [
         *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         width: 500,
         *         bodyRowHeight: 'fixed',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth', title: 'Very very very very long column title', width: 200 } ]
         *     });
         * </script>
         */
        bodyRowHeight: 'autogrow',

        /** The size of the font in the grid.
         * @type string
         * @default undefined
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         fontSize: '16px',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        fontSize: undefined,

        /** Name of column that contains the record id. 
         * @additionalinfo If you set primary key, we assume that this number is unique for each records presented in the grid.<br/>
         * For example this should contains the column with primary key from your relation db table.<br/>
         * If the primaryKey is undefined, we autogenerate id for each record in the table by starting from 1.
         * @type string
         * @default undefined
         * @example defined <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var data = [
         *         { 'ID': 101, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 102, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 103, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     $('#grid').grid({
         *         dataSource: data,
         *         primaryKey: 'ID',
         *         columns: [ 
         *             { field: 'ID', width: 70 },
         *             { field: 'Name' },
         *             { field: 'PlaceOfBirth' } ,
         *             { tmpl: '<a href="#">click me</a>', events: { click: function(e) { alert('Your id is ' + e.data.id); } }, width: 100, stopPropagation: true } 
         *         ]
         *     });
         * </script>
         * @example undefined <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var data = [
         *         { 'ID': 101, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 102, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 103, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     $('#grid').grid({
         *         dataSource: data,
         *         columns: [ 
         *             { field: 'ID', width: 70 },
         *             { field: 'Name' },
         *             { field: 'PlaceOfBirth' } ,
         *             { tmpl: '<a href="#">click me</a>', events: { click: function(e) { alert('Your id is ' + e.data.id); } }, width: 100, stopPropagation: true } 
         *         ]
         *     });
         * </script>
         */
        primaryKey: undefined,

        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German.Bootstrap.Default <!-- bootstrap, grid, dropdown -->
         * <table id="grid"></table>
         * <script>
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap',
         *         locale: 'de-de',
         *         columns: [ 
         *             { field: 'ID', width: 34 },
         *             { field: 'Name', title: 'Name' },
         *             { field: 'PlaceOfBirth', title: 'Geburtsort' }
         *         ],
         *         pager: { limit: 5 }
         *     });
         * </script>
         * @example French.MaterialDesign.Custom <!-- grid, dropdown -->
         * <table id="grid"></table>
         * <script>
         *     gj.grid.messages['fr-fr'].DisplayingRecords = 'Mes résultats';
         *     $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'materialdesign',
         *         locale: 'fr-fr',
         *         columns: [ 
         *             { field: 'ID', width: 56 },
         *             { field: 'Name', title: 'Prénom' },
         *             { field: 'PlaceOfBirth', title: 'Lieu de naissance' }
         *         ],
         *         pager: { limit: 5 }
         *     });
         * </script>
         */
        locale: 'en-us',

        defaultIconColumnWidth: 70,
        defaultCheckBoxColumnWidth: 70,

        style: {
            wrapper: 'gj-grid-wrapper',
            table: 'gj-grid gj-grid-md',
            loadingCover: 'gj-grid-loading-cover',
            loadingText: 'gj-grid-loading-text',
            header: {
                cell: undefined,
                sortable: 'gj-cursor-pointer gj-unselectable'
            },
            content: {
                rowSelected: 'gj-grid-md-select'
            }
        },

        icons: {
            asc: '▲',
            desc: '▼'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-grid-wrapper',
            table: 'gj-grid gj-grid-bootstrap gj-grid-bootstrap-3 table table-bordered table-hover',
            content: {
                rowSelected: 'active'
            }
        },

        iconsLibrary: 'glyphicons',

        defaultIconColumnWidth: 34,
        defaultCheckBoxColumnWidth: 36
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-grid-wrapper',
            table: 'gj-grid gj-grid-bootstrap gj-grid-bootstrap-4 table table-bordered table-hover',
            content: {
                rowSelected: 'active'
            }
        },

        defaultIconColumnWidth: 42,
        defaultCheckBoxColumnWidth: 44
    },

    materialicons: {
        icons: {
            asc: '<i class="gj-icon arrow-upward" />',
            desc: '<i class="gj-icon arrow-downward" />'
        }
    },

    fontawesome: {
        icons: {
            asc: '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>',
            desc: '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        icons: {
            asc: '<span class="glyphicon glyphicon-sort-by-alphabet" />',
            desc: '<span class="glyphicon glyphicon-sort-by-alphabet-alt" />'
        }
    }
};

/**
  * @widget Grid
  * @plugin Base
  */
gj.grid.events = {
    /**
     * Event fires before addition of an empty row to the grid.
     * @event beforeEmptyRowInsert
     * @param {object} e - event data
     * @param {object} $row - The empty row as jquery object
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: {
     *             url: '/Players/Get',
     *             data: { name: 'not existing data' } //search for not existing data in order to fire the event
     *         },
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('beforeEmptyRowInsert', function (e, $row) {
     *         alert('beforeEmptyRowInsert is fired.');
     *     });
     * </script>
     */
    beforeEmptyRowInsert: function ($grid, $row) {
        return $grid.triggerHandler('beforeEmptyRowInsert', [$row]);
    },

    /**
     * Event fired before data binding takes place.
     *
     * @event dataBinding
     * @param {object} e - event data
     * @param {array} records - the list of records
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('dataBinding', function (e, records) {
     *         alert('dataBinding is fired. ' + records.length + ' records will be loaded in the grid.');
     *     });
     * </script>
     */
    dataBinding: function ($grid, records) {
        return $grid.triggerHandler('dataBinding', [records]);
    },

    /**
     * Event fires after the loading of the data in the grid.
     *
     * @event dataBound
     * @param {object} e - event data
     * @param {array} records - the list of records
     * @param {number} totalRecords - the number of the all records that can be presented in the grid
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('dataBound', function (e, records, totalRecords) {
     *         alert('dataBound is fired. ' + records.length + ' records are bound to the grid.');
     *     });
     * </script>
     */
    dataBound: function ($grid, records, totalRecords) {
        return $grid.triggerHandler('dataBound', [records, totalRecords]);
    },

    /**
     * Event fires after insert of a row in the grid during the loading of the data.
     * @event rowDataBound
     * @param {object} e - event data
     * @param {object} $row - the row presented as jquery object
     * @param {string} id - the id of the record
     * @param {object} record - the data of the row record
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('rowDataBound', function (e, $row, id, record) {
     *         alert('rowDataBound is fired for row with id=' + id + '.');
     *     });
     * </script>
     */
    rowDataBound: function ($grid, $row, id, record) {
        return $grid.triggerHandler('rowDataBound', [$row, id, record]);
    },

    /**
     * Event fires after insert of a cell in the grid during the loading of the data
     *
     * @event cellDataBound
     * @param {object} e - event data
     * @param {object} $displayEl - inner div element for display of the cell value presented as jquery object
     * @param {string} id - the id of the record
     * @param {object} column - the column configuration data
     * @param {object} record - the data of the row record
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' }, { field: 'Bulgarian', title: 'Is Bulgarian?' } ]
     *     });
     *     grid.on('cellDataBound', function (e, $displayEl, id, column, record) {
     *         if ('Bulgarian' === column.field) {
     *             $displayEl.text(record.PlaceOfBirth.indexOf('Bulgaria') > -1 ? 'Yes' : 'No');
     *         }
     *     });
     * </script>
     */
    cellDataBound: function ($grid, $displayEl, id, column, record) {
        return $grid.triggerHandler('cellDataBound', [$displayEl, id, column, record]);
    },

    /**
     * Event fires on selection of row
     *
     * @event rowSelect
     * @param {object} e - event data
     * @param {object} $row - the row presented as jquery object
     * @param {string} id - the id of the record
     * @param {object} record - the data of the row record
     * @example sample <!-- checkbox, grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox'
     *     });
     *     grid.on('rowSelect', function (e, $row, id, record) {
     *         alert('Row with id=' + id + ' is selected.');
     *     });
     * </script>
     */
    rowSelect: function ($grid, $row, id, record) {
        return $grid.triggerHandler('rowSelect', [$row, id, record]);
    },

    /**
     * Event fires on un selection of row
     *
     * @event rowUnselect
     * @param {object} e - event data
     * @param {object} $row - the row presented as jquery object
     * @param {string} id - the id of the record
     * @param {object} record - the data of the row record
     * @example sample <!-- checkbox, grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox'
     *     });
     *     grid.on('rowUnselect', function (e, $row, id, record) {
     *         alert('Row with id=' + id + ' is unselected.');
     *     });
     * </script>
     */
    rowUnselect: function ($grid, $row, id, record) {
        return $grid.triggerHandler('rowUnselect', [$row, id, record]);
    },

    /**
     * Event fires before deletion of row in the grid.
     * @event rowRemoving
     * @param {object} e - event data
     * @param {object} $row - the row presented as jquery object
     * @param {string} id - the id of the record
     * @param {object} record - the data of the row record
     * @example sample <!-- grid -->
     * <button onclick="grid.removeRow('1')" class="gj-button-md">Remove Row</button><br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         primaryKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('rowRemoving', function (e, $row, id, record) {
     *         alert('rowRemoving is fired for row with id=' + id + '.');
     *     });
     * </script>
     */
    rowRemoving: function ($grid, $row, id, record) {
        return $grid.triggerHandler('rowRemoving', [$row, id, record]);
    },

    /**
     * Event fires when the grid.destroy method is called.
     *
     * @event destroying
     * @param {object} e - event data
     * @example sample <!-- grid -->
     * <button id="btnDestroy" class="gj-button-md">Destroy</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('destroying', function (e) {
     *         alert('destroying is fired.');
     *     });
     *     $('#btnDestroy').on('click', function() {
     *         grid.destroy();
     *     });
     * </script>
     */
    destroying: function ($grid) {
        return $grid.triggerHandler('destroying');
    },

    /**
     * Event fires when column is hidding
     *
     * @event columnHide
     * @param {object} e - event data
     * @param {object} column - The data about the column that is hidding
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('columnHide', function (e, column) {
     *         alert('The ' + column.field + ' column is hidden.');
     *     });
     *     grid.hideColumn('PlaceOfBirth');
     * </script>
     */
    columnHide: function ($grid, column) {
        return $grid.triggerHandler('columnHide', [column]);
    },

    /**
     * Event fires when column is showing
     *
     * @event columnShow
     * @param {object} e - event data
     * @param {object} column - The data about the column that is showing
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth', hidden: true } ]
     *     });
     *     grid.on('columnShow', function (e, column) {
     *         alert('The ' + column.field + ' column is shown.');
     *     });
     *     grid.showColumn('PlaceOfBirth');
     * </script>
     */
    columnShow: function ($grid, column) {
        return $grid.triggerHandler('columnShow', [column]);
    },

    /**
     * Event fires when grid is initialized.
     *
     * @event initialized
     * @param {object} e - event data
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth', hidden: true } ],
     *         initialized: function (e) {
     *             alert('The grid is initialized.');
     *         }
     *     });
     * </script>
     */
    initialized: function ($grid) {
        return $grid.triggerHandler('initialized');
    },

    /**
     * Event fires when the grid data is filtered.
     *
     * @additionalinfo This event is firing only when you use local dataSource, because the filtering with remote dataSource needs to be done on the server side.
     * @event dataFiltered
     * @param {object} e - event data
     * @param {object} records - The records after the filtering.
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid, data = [
     *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria', CountryName: 'Bulgaria' },
     *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil', CountryName: 'Brazil' },
     *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England', CountryName: 'England' },
     *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany', CountryName: 'Germany' },
     *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia', CountryName: 'Colombia' },
     *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria', CountryName: 'Bulgaria' }
     *     ];
     *     grid = $('#grid').grid({
     *         dataSource: data,
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         dataFiltered: function (e, records) {
     *             records.reverse(); // reverse the data
     *             records.splice(3, 2); // remove 2 elements after the 3rd record
     *         }
     *     });
     * </script>
     */
    dataFiltered: function ($grid, records) {
        return $grid.triggerHandler('dataFiltered', [records]);
    }
};

/*global gj $*/
gj.grid.methods = {

    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'grid');

        gj.grid.methods.initialize(this);

        if (this.data('autoLoad')) {
            this.reload();
        }
        return this;
    },

    getConfig: function (jsConfig, type) {
        var config = gj.widget.prototype.getConfig.call(this, jsConfig, type);
        gj.grid.methods.setDefaultColumnConfig(config.columns, config.defaultColumnSettings);
        return config;
    },

    setDefaultColumnConfig: function (columns, defaultColumnSettings) {
        var column, i;
        if (columns && columns.length) {
            for (i = 0; i < columns.length; i++) {
                column = $.extend(true, {}, defaultColumnSettings);
                $.extend(true, column, columns[i]);
                columns[i] = column;
            }
        }
    },

    getHTMLConfig: function () {
        var result = gj.widget.prototype.getHTMLConfig.call(this);
        result.columns = [];
        this.find('thead > tr > th').each(function () {
            var $el = $(this),
                title = $el.text(),
                config = gj.widget.prototype.getHTMLConfig.call($el);
            config.title = title;
            if (!config.field) {
                config.field = title;
            }
            if (config.events) {
                config.events = gj.grid.methods.eventsParser(config.events);
            }
            result.columns.push(config);
        });
        return result;
    },

    eventsParser: function (events) {
        var result = {}, list, i, key, func, position;
        list = events.split(',');
        for (i = 0; i < list.length; i++) {
            position = list[i].indexOf(':');
            if (position > 0) {
                key = $.trim(list[i].substr(0, position));
                func = $.trim(list[i].substr(position + 1, list[i].length));
                result[key] = eval('window.' + func); //window[func]; //TODO: eveluate functions from string
            }
        }
        return result;
    },
    
    initialize: function ($grid) {
        var data = $grid.data(),
            $wrapper = $grid.parent('div[data-role="wrapper"]');

        gj.grid.methods.localization(data);

        if ($wrapper.length === 0) {
            $wrapper = $('<div data-role="wrapper" />').addClass(data.style.wrapper); //The css class needs to be added before the wrapping, otherwise doesn't work.
            $grid.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }

        if (data.width) {
            $grid.parent().css('width', data.width);
        }
        if (data.minWidth) {
            $grid.css('min-width', data.minWidth);
        }
        if (data.fontSize) {
            $grid.css('font-size', data.fontSize);
        }
        if (data.headerRowHeight === 'autogrow') {
            $grid.addClass('autogrow-header-row');
        }
        if (data.bodyRowHeight === 'fixed') {
            $grid.addClass('fixed-body-rows');
        }
        $grid.addClass(data.style.table);
        if ('checkbox' === data.selectionMethod) {
            data.columns.splice(gj.grid.methods.getColumnPositionNotInRole($grid), 0, {
                title: '',
                width: data.defaultCheckBoxColumnWidth,
                align: 'center',
                type: 'checkbox',
                role: 'selectRow',
                events: {
                    click: function (e) {
                        gj.grid.methods.setSelected($grid, e.data.id, $(this).closest('tr'));
                    }
                },
                headerCssClass: 'gj-grid-select-all',
                stopPropagation: true
            });
        }
        
        if ($grid.children('tbody').length === 0) {
            $grid.append($('<tbody/>'));
        }

        gj.grid.methods.renderHeader($grid);
        gj.grid.methods.appendEmptyRow($grid, '&nbsp;');
        gj.grid.events.initialized($grid);
    },

    localization: function (data) {
        if (!data.notFoundText) {
            data.notFoundText = gj.grid.messages[data.locale].NoRecordsFound;
        }
    },

    renderHeader: function ($grid) {
        var data, columns, style, $thead, $row, $cell, $title, i, $checkAllBoxes;

        data = $grid.data();
        columns = data.columns;
        style = data.style.header;

        $thead = $grid.children('thead');
        if ($thead.length === 0) {
            $thead = $('<thead />');
            $grid.prepend($thead);
        }

        $row = $('<tr data-role="caption" />');
        for (i = 0; i < columns.length; i += 1) {
            $cell = $('<th data-field="' + (columns[i].field || '') + '" />');
            if (columns[i].width) {
                $cell.attr('width', columns[i].width);
            } else if (columns[i].type === 'checkbox') {
                $cell.attr('width', data.defaultIconColumnWidth);
            }
            $cell.addClass(style.cell);
            if (columns[i].headerCssClass) {
                $cell.addClass(columns[i].headerCssClass);
            }
            $cell.css('text-align', columns[i].align || 'left');
            if ('checkbox' === data.selectionMethod && 'multiple' === data.selectionType &&
                'checkbox' === columns[i].type && 'selectRow' === columns[i].role) {
                $checkAllBoxes = $cell.find('input[data-role="selectAll"]');
                if ($checkAllBoxes.length === 0) {
                    $checkAllBoxes = $('<input type="checkbox" data-role="selectAll" />');
                    $cell.append($checkAllBoxes);
                    $checkAllBoxes.checkbox({ uiLibrary: data.uiLibrary });
                }
                $checkAllBoxes.off('click').on('click', function () {
                    if (this.checked) {
                        $grid.selectAll();
                    } else {
                        $grid.unSelectAll();
                    }
                });
            } else {
                $title = $('<div data-role="title"/>').html(typeof (columns[i].title) === 'undefined' ? columns[i].field : columns[i].title);
                $cell.append($title);
                if (columns[i].sortable) {
                    $title.addClass(style.sortable);
                    $title.on('click', gj.grid.methods.createSortHandler($grid, columns[i]));
                }
            }
            if (columns[i].hidden) {
                $cell.hide();
            }
            $row.append($cell);
        }

        $thead.empty().append($row);
    },

    createSortHandler: function ($grid, column) {
        return function () {
            var data, params = {};
            if ($grid.count() > 0) {
                data = $grid.data();
                params[data.paramNames.sortBy] = column.field;
                column.direction = (column.direction === 'asc' ? 'desc' : 'asc');
                params[data.paramNames.direction] = column.direction;
                $grid.reload(params);
            }
        };
    },

    updateHeader: function ($grid) {
        var $sortIcon, $cellTitle,
            data = $grid.data(),
            sortBy = data.params[data.paramNames.sortBy],
            direction = data.params[data.paramNames.direction];

        $grid.find('thead tr th [data-role="sorticon"]').remove();

        if (sortBy) {
            position = gj.grid.methods.getColumnPosition($grid.data('columns'), sortBy);
            if (position > -1) {
                $cellTitle = $grid.find('thead tr th:eq(' + position + ') div[data-role="title"]');
                $sortIcon = $('<div data-role="sorticon" class="gj-unselectable" />').append(('desc' === direction) ? data.icons.desc : data.icons.asc);
                $cellTitle.after($sortIcon);
            }
        }
    },

    useHtmlDataSource: function ($grid, data) {
        var dataSource = [], i, j, $cells, record,
            $rows = $grid.find('tbody tr[data-role != "empty"]');
        for (i = 0; i < $rows.length; i++) {
            $cells = $($rows[i]).find('td');
            record = {};
            for (j = 0; j < $cells.length; j++) {
                record[data.columns[j].field] = $($cells[j]).html();
            }
            dataSource.push(record);
        }
        data.dataSource = dataSource;
    },

    startLoading: function ($grid) {
        var $tbody, $cover, $loading, width, height, top, data;
        gj.grid.methods.stopLoading($grid);
        data = $grid.data();
        if (0 === $grid.outerHeight()) {
            return;
        }
        $tbody = $grid.children('tbody');
        width = $tbody.outerWidth(false);
        height = $tbody.outerHeight(false);
        top = Math.abs($grid.parent().offset().top - $tbody.offset().top);
        $cover = $('<div data-role="loading-cover" />').addClass(data.style.loadingCover).css({
            width: width,
            height: height,
            top: top
        });
        $loading = $('<div data-role="loading-text">' + gj.grid.messages[data.locale].Loading + '</div>').addClass(data.style.loadingText);
        $loading.insertAfter($grid);
        $cover.insertAfter($grid);
        $loading.css({
            top: top + (height / 2) - ($loading.outerHeight(false) / 2),
            left: (width / 2) - ($loading.outerWidth(false) / 2)
        });
    },

    stopLoading: function ($grid) {
        $grid.parent().find('div[data-role="loading-cover"]').remove();
        $grid.parent().find('div[data-role="loading-text"]').remove();
    },

    appendEmptyRow: function ($grid, caption) {
        var data, $row, $cell, $wrapper;
        data = $grid.data();
        $row = $('<tr data-role="empty"/>');
        $cell = $('<td/>').css({ width: '100%', 'text-align': 'center' });
        $cell.attr('colspan', gj.grid.methods.countVisibleColumns($grid));
        $wrapper = $('<div />').html(caption || data.notFoundText);
        $cell.append($wrapper);
        $row.append($cell);

        gj.grid.events.beforeEmptyRowInsert($grid, $row);

        $grid.append($row);
    },

    autoGenerateColumns: function ($grid, records) {
        var names, value, type, i, data = $grid.data();
        data.columns = [];
        if (records.length > 0) {
            names = Object.getOwnPropertyNames(records[0]);
            for (i = 0; i < names.length; i++) {
                value = records[0][names[i]];
                type = 'text';
                if (value) {
                    if (typeof value === 'number') {
                        type = 'number';
                    } else if (value.indexOf('/Date(') > -1) {
                        type = 'date';
                    }
                }
                data.columns.push({ field: names[i], type: type });
            }
            gj.grid.methods.setDefaultColumnConfig(data.columns, data.defaultColumnSettings);
        }
        gj.grid.methods.renderHeader($grid);
    },

    loadData: function ($grid) {
        var data, records, i, recLen, rowCount, $tbody, $rows, $row;

        data = $grid.data();
        records = $grid.getAll();
        gj.grid.events.dataBinding($grid, records);
        recLen = records.length;
        gj.grid.methods.stopLoading($grid);

        if (data.autoGenerateColumns) {
            gj.grid.methods.autoGenerateColumns($grid, records);
        }

        $tbody = $grid.children('tbody');
        if ('checkbox' === data.selectionMethod && 'multiple' === data.selectionType) {
            $grid.find('thead input[data-role="selectAll"]').prop('checked', false);
        }
        $tbody.children('tr').not('[data-role="row"]').remove();
        if (0 === recLen) {
            $tbody.empty();
            gj.grid.methods.appendEmptyRow($grid);
        }

        $rows = $tbody.children('tr');

        rowCount = $rows.length;

        for (i = 0; i < rowCount; i++) {
            if (i < recLen) {
                $row = $rows.eq(i);
                gj.grid.methods.renderRow($grid, $row, records[i], i);
            } else {
                $tbody.find('tr[data-role="row"]:gt(' + (i - 1) + ')').remove();
                break;
            }
        }

        for (i = rowCount; i < recLen; i++) {
            gj.grid.methods.renderRow($grid, null, records[i], i);
        }
        gj.grid.events.dataBound($grid, records, data.totalRecords);
    },

    getId: function (record, primaryKey, position) {
        return (primaryKey && record[primaryKey]) ? record[primaryKey] : position;
    },

    renderRow: function ($grid, $row, record, position) {
        var id, $cell, i, data, mode;
        data = $grid.data();
        if (!$row || $row.length === 0) {
            mode = 'create';
            $row = $('<tr data-role="row"/>');
            $grid.children('tbody').append($row);
        } else {
            mode = 'update';
            $row.removeClass(data.style.content.rowSelected).removeAttr('data-selected').off('click');
        }
        id = gj.grid.methods.getId(record, data.primaryKey, (position + 1));
        $row.attr('data-position', position + 1);
        if (data.selectionMethod !== 'checkbox') {
            $row.on('click', gj.grid.methods.createRowClickHandler($grid, id));
        }
        for (i = 0; i < data.columns.length; i++) {
            if (mode === 'update') {
                $cell = $row.find('td:eq(' + i + ')');
                gj.grid.methods.renderCell($grid, $cell, data.columns[i], record, id);
            } else {
                $cell = gj.grid.methods.renderCell($grid, null, data.columns[i], record, id);
                $row.append($cell);
            }
        }
        gj.grid.events.rowDataBound($grid, $row, id, record);
    },

    renderCell: function ($grid, $cell, column, record, id, mode) {
        var $displayEl, key;

        if (!$cell || $cell.length === 0) {
            $cell = $('<td/>');
            $displayEl = $('<div data-role="display" />');
            column.align && $cell.css('text-align', column.align);
            column.cssClass && $cell.addClass(column.cssClass);
            $cell.append($displayEl);
            mode = 'create';
        } else {
            $displayEl = $cell.find('div[data-role="display"]');
            mode = 'update';
        }

        gj.grid.methods.renderDisplayElement($grid, $displayEl, column, record, id, mode);

        //remove all event handlers
        if ('update' === mode) {
            $cell.off();
            $displayEl.off();
        }
        if (column.events) {
            for (key in column.events) {
                if (column.events.hasOwnProperty(key)) {
                    $cell.on(key, { id: id, field: column.field, record: record }, gj.grid.methods.createCellEventHandler(column, column.events[key]));
                }
            }
        }
        if (column.hidden) {
            $cell.hide();
        }

        gj.grid.events.cellDataBound($grid, $displayEl, id, column, record);

        return $cell;
    },

    createCellEventHandler: function (column, func) {
        return function (e) {
            if (column.stopPropagation) {
                e.stopPropagation();
            }
            func.call(this, e);
        };
    },

    renderDisplayElement: function ($grid, $displayEl, column, record, id, mode) {
        var text, $checkbox;

        if ('checkbox' === column.type && gj.checkbox) {
            if ('create' === mode) {
                $checkbox = $('<input type="checkbox" />').val(id).prop('checked', (record[column.field] ? true : false));
                column.role && $checkbox.attr('data-role', column.role);
                $displayEl.append($checkbox);
                $checkbox.checkbox({ uiLibrary: $grid.data('uiLibrary') });
                if (column.role === 'selectRow') {
                    $checkbox.on('click', function () { return false; });
                } else {
                    $checkbox.prop('disabled', true);
                }
            } else {
                $displayEl.find('input[type="checkbox"]').val(id).prop('checked', (record[column.field] ? true : false));
            }
        } else if ('icon' === column.type) {
            if ('create' === mode) {
                $displayEl.append($('<span/>').addClass(column.icon).css({ cursor: 'pointer' }));
                $grid.data().uiLibrary === 'bootstrap' && $displayEl.children('span').addClass('glyphicon');
                column.stopPropagation = true;
            }
        } else if (column.tmpl) {
            text = column.tmpl;
            column.tmpl.replace(/\{(.+?)\}/g, function ($0, $1) {
                text = text.replace($0, gj.grid.methods.formatText(record[$1], column));
            });
            $displayEl.html(text);
        } else if (column.renderer && typeof (column.renderer) === 'function') {
            text = column.renderer(record[column.field], record, $displayEl.parent(), $displayEl, id, $grid);
            if (text) {
                $displayEl.html(text);
            }
        } else {
            record[column.field] = gj.grid.methods.formatText(record[column.field], column);
            if (!column.tooltip && record[column.field]) {
                $displayEl.attr('title', record[column.field]);
            }
            $displayEl.html(record[column.field]);
        }
        if (column.tooltip && 'create' === mode) {
            $displayEl.attr('title', column.tooltip);
        }
    },

    formatText: function (text, column) {
        if (text && ['date', 'time', 'datetime'].indexOf(column.type) > -1) {
            text = gj.core.formatDate(gj.core.parseDate(text, column.format), column.format);
        } else {
            text = (typeof (text) === 'undefined' || text === null) ? '' : text.toString();
        }
        if (column.decimalDigits && text) {
            text = parseFloat(text).toFixed(column.decimalDigits);
        }
        return text;
    },

    setRecordsData: function ($grid, response) {
        var records = [],
            totalRecords = 0,
            data = $grid.data();
        if ($.isArray(response)) {
            records = response;
            totalRecords = response.length;
        } else if (data && data.mapping && $.isArray(response[data.mapping.dataField])) {
            records = response[data.mapping.dataField];
            totalRecords = response[data.mapping.totalRecordsField];
            if (!totalRecords || isNaN(totalRecords)) {
                totalRecords = 0;
            }
        }
        $grid.data('records', records);
        $grid.data('totalRecords', totalRecords);
        return records;
    },

    createRowClickHandler: function ($grid, id) {
        return function () {
            gj.grid.methods.setSelected($grid, id, $(this));
        };
    },

    selectRow: function ($grid, data, $row, id) {
        var $checkbox;
        $row.addClass(data.style.content.rowSelected);
        $row.attr('data-selected', 'true');
        if ('checkbox' === data.selectionMethod) {
            $checkbox = $row.find('input[type="checkbox"][data-role="selectRow"]');
            $checkbox.length && !$checkbox.prop('checked') && $checkbox.prop('checked', true);
            if ('multiple' === data.selectionType && $grid.getSelections().length === $grid.count(false)) {
                $grid.find('thead input[data-role="selectAll"]').prop('checked', true);
            }
        }
        return gj.grid.events.rowSelect($grid, $row, id, $grid.getById(id));
    },

    unselectRow: function ($grid, data, $row, id) {
        var $checkbox;
        if ($row.attr('data-selected') === 'true') {
            $row.removeClass(data.style.content.rowSelected);
            if ('checkbox' === data.selectionMethod) {
                $checkbox = $row.find('td input[type="checkbox"][data-role="selectRow"]');
                $checkbox.length && $checkbox.prop('checked') && $checkbox.prop('checked', false);
                if ('multiple' === data.selectionType) {
                    $grid.find('thead input[data-role="selectAll"]').prop('checked', false);
                }
            }
            $row.removeAttr('data-selected');
            return gj.grid.events.rowUnselect($grid, $row, id, $grid.getById(id));
        }
    },

    setSelected: function ($grid, id, $row) {
        var data = $grid.data();
        if (!$row || !$row.length) {
            $row = gj.grid.methods.getRowById($grid, id);
        }
        if ($row) {
            if ($row.attr('data-selected') === 'true') {
                gj.grid.methods.unselectRow($grid, data, $row, id);
            } else {
                if ('single' === data.selectionType) {
                    $row.siblings('[data-selected="true"]').each(function () {
                        var $row = $(this),
                            id = gj.grid.methods.getId($row, data.primaryKey, $row.data('position'));
                        gj.grid.methods.unselectRow($grid, data, $row, id);
                    });
                }
                gj.grid.methods.selectRow($grid, data, $row, id);
            }
        }
        return $grid;
    },

    selectAll: function ($grid) {
        var data = $grid.data();
        $grid.find('tbody tr[data-role="row"]').each(function () {
            var $row = $(this),
                position = $row.data('position'),
                record = $grid.get(position),
                id = gj.grid.methods.getId(record, data.primaryKey, position);
            gj.grid.methods.selectRow($grid, data, $row, id);
        });
        $grid.find('thead input[data-role="selectAll"]').prop('checked', true);
        return $grid;
    },

    unSelectAll: function ($grid) {
        var data = $grid.data();
        $grid.find('tbody tr').each(function () {
            var $row = $(this),
                position = $row.data('position'),
                record = $grid.get(position),
                id = gj.grid.methods.getId(record, data.primaryKey, position);
            gj.grid.methods.unselectRow($grid, data, $row, id);
            $row.find('input[type="checkbox"][data-role="selectRow"]').prop('checked', false);
        });
        $grid.find('thead input[data-role="selectAll"]').prop('checked', false);
        return $grid;
    },

    getSelected: function ($grid) {
        var result = null, selections, record, position;
        selections = $grid.find('tbody>tr[data-selected="true"]');
        if (selections.length > 0) {
            position = $(selections[0]).data('position');
            record = $grid.get(position);
            result = gj.grid.methods.getId(record, $grid.data().primaryKey, position);
        }
        return result;
    },

    getSelectedRows: function ($grid) {
        var data = $grid.data();
        return $grid.find('tbody>tr[data-selected="true"]');
    },

    getSelections: function ($grid) {
        var result = [], position, record,
            data = $grid.data(),
            $selections = gj.grid.methods.getSelectedRows($grid);
        if (0 < $selections.length) {
            $selections.each(function () {
                position = $(this).data('position');
                record = $grid.get(position);
                result.push(gj.grid.methods.getId(record, data.primaryKey, position));
            });
        }
        return result;
    },

    getById: function ($grid, id) {
        var result = null, i, primaryKey = $grid.data('primaryKey'), records = $grid.data('records');
        if (primaryKey) {
            for (i = 0; i < records.length; i++) {
                if (records[i][primaryKey] == id) {
                    result = records[i];
                    break;
                }
            }
        } else {
            result = $grid.get(id);
        }
        return result;
    },

    getRecVPosById: function ($grid, id) {
        var result = id, i, data = $grid.data();
        if (data.primaryKey) {
            for (i = 0; i < data.dataSource.length; i++) {
                if (data.dataSource[i][data.primaryKey] == id) {
                    result = i;
                    break;
                }
            }
        }
        return result;
    },

    getRowById: function ($grid, id) {
        var records = $grid.getAll(false),
            primaryKey = $grid.data('primaryKey'),
            $result = undefined,
            position,
            i;
        if (primaryKey) {
            for (i = 0; i < records.length; i++) {
                if (records[i][primaryKey] == id) {
                    position = i + 1;
                    break;
                }
            }
        } else {
            position = id;
        }
        if (position) {
            $result = $grid.children('tbody').children('tr[data-position="' + position + '"]');
        }
        return $result;
    },

    getByPosition: function ($grid, position) {
        return $grid.getAll(false)[position - 1];
    },

    getColumnPosition: function (columns, field) {
        var position = -1, i;
        for (i = 0; i < columns.length; i++) {
            if (columns[i].field === field) {
                position = i;
                break;
            }
        }
        return position;
    },

    getColumnInfo: function ($grid, field) {
        var i, result = {}, data = $grid.data();
        for (i = 0; i < data.columns.length; i += 1) {
            if (data.columns[i].field === field) {
                result = data.columns[i];
                break;
            }
        }
        return result;
    },

    getCell: function ($grid, id, field) {
        var position, $row, $result = null;
        position = gj.grid.methods.getColumnPosition($grid.data('columns'), field);
        if (position > -1) {
            $row = gj.grid.methods.getRowById($grid, id);
            $result = $row.find('td:eq(' + position + ') div[data-role="display"]');
        }
        return $result;
    },

    setCellContent: function ($grid, id, field, value) {
        var column, $displayEl = gj.grid.methods.getCell($grid, id, field);
        if ($displayEl) {
            $displayEl.empty();
            if (typeof (value) === 'object') {
                $displayEl.append(value);
            } else {
                column = gj.grid.methods.getColumnInfo($grid, field);
                gj.grid.methods.renderDisplayElement($grid, $displayEl, column, $grid.getById(id), id, 'update');
            }
        }
    },

    clone: function (source) {
        var target = [];
        $.each(source, function () {
            target.push(this.clone());
        });
        return target;
    },

    getAll: function ($grid) {
        return $grid.data('records');
    },

    countVisibleColumns: function ($grid) {
        var columns, count, i;
        columns = $grid.data().columns;
        count = 0;
        for (i = 0; i < columns.length; i++) {
            if (columns[i].hidden !== true) {
                count++;
            }
        }
        return count;
    },

    clear: function ($grid, showNotFoundText) {
        var data = $grid.data();
        $grid.xhr && $grid.xhr.abort();
        $grid.children('tbody').empty();
        data.records = [];
        gj.grid.methods.stopLoading($grid);
        gj.grid.methods.appendEmptyRow($grid, showNotFoundText ? data.notFoundText : '&nbsp;');
        gj.grid.events.dataBound($grid, [], 0);
        return $grid;
    },

    render: function ($grid, response) {
        if (response) {
            gj.grid.methods.setRecordsData($grid, response);
            gj.grid.methods.updateHeader($grid);
            gj.grid.methods.loadData($grid);
        }
        return $grid;
    },

    filter: function ($grid) {
        var field, column,
            data = $grid.data(),
            records = data.dataSource.slice();

        if (data.params[data.paramNames.sortBy]) {
            column = gj.grid.methods.getColumnInfo($grid, data.params[data.paramNames.sortBy]);
            records.sort(column.sortable.sorter ? column.sortable.sorter(column.direction, column) : gj.grid.methods.createDefaultSorter(column.direction, column.field));
        }

        for (field in data.params) {
            if (data.params[field] && !data.paramNames[field]) {
                column = gj.grid.methods.getColumnInfo($grid, field);
                records = $.grep(records, function (record) {
                    var value = record[field] || '',
                        searchStr = data.params[field] || '';
                    return column && typeof (column.filter) === 'function' ? column.filter(value, searchStr) : (value.toUpperCase().indexOf(searchStr.toUpperCase()) > -1);
                });
            }
        }

        gj.grid.events.dataFiltered($grid, records);

        return records;
    },

    createDefaultSorter: function (direction, field) {
        return function (recordA, recordB) {
            var a = (recordA[field] || '').toString(),
                b = (recordB[field] || '').toString();
            return (direction === 'asc') ? a.localeCompare(b) : b.localeCompare(a);
        };
    },

    destroy: function ($grid, keepTableTag, keepWrapperTag) {
        var data = $grid.data();
        if (data) {
            gj.grid.events.destroying($grid);
            gj.grid.methods.stopLoading($grid);
            $grid.xhr && $grid.xhr.abort();
            $grid.off();
            if (keepWrapperTag === false && $grid.parent('div[data-role="wrapper"]').length > 0) {
                $grid.unwrap();
            }
            $grid.removeData();
            if (keepTableTag === false) {
                $grid.remove();
            } else {
                $grid.removeClass().empty();
            }
            $grid.removeAttr('data-type');
        }
        return $grid;
    },

    showColumn: function ($grid, field) {
        var data = $grid.data(),
            position = gj.grid.methods.getColumnPosition(data.columns, field),
            $cells;

        if (position > -1) {
            $grid.find('thead>tr').each(function() {
                $(this).children('th').eq(position).show();
            });
            $.each($grid.find('tbody>tr'), function () {
                $(this).children('td').eq(position).show();
            });
            data.columns[position].hidden = false;

            $cells = $grid.find('tbody > tr[data-role="empty"] > td');
            if ($cells && $cells.length) {
                $cells.attr('colspan', gj.grid.methods.countVisibleColumns($grid));
            }

            gj.grid.events.columnShow($grid, data.columns[position]);
        }

        return $grid;
    },

    hideColumn: function ($grid, field) {
        var data = $grid.data(),
            position = gj.grid.methods.getColumnPosition(data.columns, field),
            $cells;

        if (position > -1) {
            $grid.find('thead>tr').each(function () {
                $(this).children('th').eq(position).hide();
            });
            $.each($grid.find('tbody>tr'), function () {
                $(this).children('td').eq(position).hide();
            });
            data.columns[position].hidden = true;

            $cells = $grid.find('tbody > tr[data-role="empty"] > td');
            if ($cells && $cells.length) {
                $cells.attr('colspan', gj.grid.methods.countVisibleColumns($grid));
            }

            gj.grid.events.columnHide($grid, data.columns[position]);
        }

        return $grid;
    },

    isLastRecordVisible: function () {
        return true;
    },

    addRow: function ($grid, record) {
        var data = $grid.data();
        data.totalRecords = $grid.data('totalRecords') + 1;
        gj.grid.events.dataBinding($grid, [record]);
        data.records.push(record);
        if ($.isArray(data.dataSource)) {
            data.dataSource.push(record);
        }
        if (data.totalRecords === 1) {
            $grid.children('tbody').empty();
        }
        if (gj.grid.methods.isLastRecordVisible($grid)) {
            gj.grid.methods.renderRow($grid, null, record, $grid.count() - 1);
        }
        gj.grid.events.dataBound($grid, [record], data.totalRecords);
        return $grid;
    },

    updateRow: function ($grid, id, record) {
        var $row = gj.grid.methods.getRowById($grid, id),
            data = $grid.data(), position;
        data.records[$row.data('position') - 1] = record;
        if ($.isArray(data.dataSource)) {
            position = gj.grid.methods.getRecVPosById($grid, id);
            data.dataSource[position] = record;
        }
        gj.grid.methods.renderRow($grid, $row, record, $row.index());
        return $grid;
    },

    removeRow: function ($grid, id) {
        var position,
            data = $grid.data(),
            $row = gj.grid.methods.getRowById($grid, id);

        gj.grid.events.rowRemoving($grid, $row, id, $grid.getById(id));
        if ($.isArray(data.dataSource)) {
            position = gj.grid.methods.getRecVPosById($grid, id);
            data.dataSource.splice(position, 1);
        }
        $grid.reload();
        return $grid;
    },

    count: function ($grid, includeAllRecords) {
        return includeAllRecords ? $grid.data().totalRecords : $grid.getAll().length;
    },

    getColumnPositionByRole: function ($grid, role) {
        var i, result, columns = $grid.data('columns');
        for (i = 0; i < columns.length; i++) {
            if (columns[i].role === role) {
                result = i;
                break;
            }
        }
        return result;
    },

    getColumnPositionNotInRole: function ($grid) {
        var i, result = 0, columns = $grid.data('columns');
        for (i = 0; i < columns.length; i++) {
            if (!columns[i].role) {
                result = i;
                break;
            }
        }
        return result;
    }
};

/**
  * @widget Grid
  * @plugin Base
  */
gj.grid.widget = function ($grid, jsConfig) {
    var self = this,
        methods = gj.grid.methods;

    /**
     * Reload the data in the grid from a data source.
     * @method
     * @param {object} params - An object that contains a list with parameters that are going to be send to the server.
     * @fires beforeEmptyRowInsert, dataBinding, dataBound, cellDataBound
     * @return grid
     * @example sample <!-- grid -->
     * <input type="text" id="txtSearch">
     * <button id="btnSearch">Search</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     $('#btnSearch').on('click', function () {
     *         grid.reload({ name: $('#txtSearch').val() });
     *     });
     * </script>
     */
    self.reload = function (params) {
        methods.startLoading(this);
        return gj.widget.prototype.reload.call(this, params);
    };

    /**
     * Clear the content in the grid.
     * @method
     * @param {boolean} showNotFoundText - Indicates if the "Not Found" text is going to show after the clearing of the grid.
     * @return grid
     * @example sample <!-- grid, dropdown -->
     * <button id="btnClear" class="gj-button-md">Clear</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         pager: { limit: 5 }
     *     });
     *     $('#btnClear').on('click', function () {
     *         grid.clear();
     *     });
     * </script>
     */
    self.clear = function (showNotFoundText) {
        return methods.clear(this, showNotFoundText);
    };

    /**
     * Return the number of records in the grid. By default return only the records that are visible in the grid.
     * @method
     * @param {boolean} includeAllRecords - include records that are not visible when you are using local dataSource.
     * @return number
     * @example Local.DataSource <!-- bootstrap, grid, grid.pagination -->
     * <button class="btn btn-default" onclick="alert(grid.count())">Count Visible Records</button>
     * <button class="btn btn-default" onclick="alert(grid.count(true))">Count All Records</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var data, grid;
     *     data = [
     *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *     ];
     *     grid = $('#grid').grid({
     *         dataSource: data,
     *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         uiLibrary: 'bootstrap',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     * @example Remote.DataSource <!-- bootstrap, grid, grid.pagination -->
     * <button onclick="alert(grid.count())">Count Visible Records</button>
     * <button onclick="alert(grid.count(true))">Count All Records</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         uiLibrary: 'bootstrap',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     */
    self.count = function (includeAllRecords) {
        return methods.count(this, includeAllRecords);
    };

    /**
     * Render data in the grid
     * @method
     * @param {object} response - An object that contains the data that needs to be loaded in the grid.
     * @fires beforeEmptyRowInsert, dataBinding, dataBound, cellDataBound
     * @return grid
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid, onSuccessFunc;
     *     onSuccessFunc = function (response) {
     *         //you can modify the response here if needed
     *         grid.render(response);
     *     };
     *     grid = $('#grid').grid({
     *         dataSource: { url: '/Players/Get', success: onSuccessFunc },
     *         columns: [ { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     * </script>
     */
    self.render = function (response) {
        return methods.render($grid, response);
    };

    /**
     * Destroy the grid. This method remove all data from the grid and all events attached to the grid.
     * @additionalinfo The grid table tag and wrapper tag are kept by default after the execution of destroy method,
     * but you can remove them if you pass false to the keepTableTag and keepWrapperTag parameters.
     * @method
     * @param {boolean} keepTableTag - If this flag is set to false, the table tag will be removed from the HTML dom tree.
     * @param {boolean} keepWrapperTag - If this flag is set to false, the table wrapper tag will be removed from the HTML dom tree.
     * @fires destroying
     * @return void
     * @example keep.wrapper.and.table <!-- grid -->
     * <button class="gj-button-md" id="btnDestroy">Destroy</button>
     * <button class="gj-button-md" id="btnCreate">Create</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var createFunc = function() {
     *         $('#grid').grid({
     *             dataSource: '/Players/Get',
     *             columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *         });
     *     };
     *     createFunc();
     *     $('#btnDestroy').on('click', function () {
     *         $('#grid').grid('destroy', true, true);
     *     });
     *     $('#btnCreate').on('click', function () {
     *         createFunc();
     *     });
     * </script>
     * @example remove.wrapper.and.table <!-- grid -->
     * <button class="gj-button-md" id="btnRemove">Remove</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     $('#btnRemove').on('click', function () {
     *         grid.destroy();
     *     });
     * </script>
     */
    self.destroy = function (keepTableTag, keepWrapperTag) {
        return methods.destroy(this, keepTableTag, keepWrapperTag);
    };

    /**
     * Select a row from the grid based on id parameter.
     * @method
     * @param {string} id - The id of the row that needs to be selected
     * @return grid
     * @example sample <!-- checkbox, grid -->
     * <input type="text" id="txtNumber" value="1" />
     * <button id="btnSelect" class="gj-button-md">Select</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox'
     *     });
     *     $('#btnSelect').on('click', function () {
     *         grid.setSelected(parseInt($('#txtNumber').val(), 10));
     *     });
     * </script>
     */
    self.setSelected = function (id) {
        return methods.setSelected(this, id);
    };

    /**
     * Return the id of the selected record.
     * If the multiple selection method is one this method is going to return only the id of the first selected record.
     * @method
     * @return string
     * @example sample <!-- checkbox, grid -->
     * <button id="btnShowSelection" class="gj-button-md">Show Selection</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox'
     *     });
     *     $('#btnShowSelection').on('click', function () {
     *         alert(grid.getSelected());
     *     });
     * </script>
     */
    self.getSelected = function () {
        return methods.getSelected(this);
    };

    /**
     * Return an array with the ids of the selected record.
     * @additionalinfo Specify primaryKey if you want to use field from the dataSource as identificator for selection.
     * @method
     * @return array
     * @example With.Primary.Ket <!-- checkbox, grid, dropdown -->
     * <button id="btnShowSelection" class="gj-button-md">Show Selections</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid, data = [
     *         { 'ID': 101, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *         { 'ID': 102, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *         { 'ID': 103, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
     *         { 'ID': 104, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' }
     *     ];
     *     grid = $('#grid').grid({
     *         dataSource: data,
     *         primaryKey: 'ID',
     *         columns: [ { field: 'ID', width: 70 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox',
     *         selectionType: 'multiple',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     *     $('#btnShowSelection').on('click', function () {
     *         var selections = grid.getSelections();
     *         alert(selections.join());
     *     });
     * </script>
     * @example Without.Primary.Ket <!-- checkbox, grid, dropdown -->
     * <button id="btnShowSelection" class="gj-button-md">Show Selections</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid, data = [
     *         { 'ID': 101, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *         { 'ID': 102, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *         { 'ID': 103, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
     *         { 'ID': 104, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' }
     *     ];
     *     grid = $('#grid').grid({
     *         dataSource: data,
     *         columns: [ { field: 'ID', width: 70 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox',
     *         selectionType: 'multiple',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     *     $('#btnShowSelection').on('click', function () {
     *         var selections = grid.getSelections();
     *         alert(selections.join());
     *     });
     * </script>
     */
    self.getSelections = function () {
        return methods.getSelections(this);
    };

    /**
     * Select all records from the grid.
     * @method
     * @return grid
     * @example sample <!-- checkbox, grid -->
     * <button id="btnSelectAll" class="gj-button-md">Select All</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox',
     *         selectionType: 'multiple'
     *     });
     *     $('#btnSelectAll').on('click', function () {
     *         grid.selectAll();
     *     });
     * </script>
     */
    self.selectAll = function () {
        return methods.selectAll(this);
    };

    /**
     * Unselect all records from the grid.
     * @method
     * @return void
     * @example sample <!-- checkbox, grid -->
     * <button id="btnSelectAll" class="gj-button-md">Select All</button>
     * <button id="btnUnSelectAll" class="gj-button-md">UnSelect All</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox',
     *         selectionType: 'multiple'
     *     });
     *     $('#btnSelectAll').on('click', function () {
     *         grid.selectAll();
     *     });
     *     $('#btnUnSelectAll').on('click', function () {
     *         grid.unSelectAll();
     *     });
     * </script>
     */
    self.unSelectAll = function () {
        return methods.unSelectAll(this);
    };

    /**
     * Return record by id of the record.
     * @method
     * @param {string} id - The id of the row that needs to be returned.
     * @return object
     * @example sample <!-- grid -->
     * <button id="btnGetData" class="gj-button-md">Get Data</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         primaryKey: 'ID' //define the name of the column that you want to use as ID here.
     *     });
     *     $('#btnGetData').on('click', function () {
     *         var data = grid.getById('2');
     *         alert(data.Name + ' born in ' + data.PlaceOfBirth);
     *     });
     * </script>
     */
    self.getById = function (id) {
        return methods.getById(this, id);
    };

    /**
     * Return record from the grid based on position.
     * @method
     * @param {number} position - The position of the row that needs to be return.
     * @return object
     * @example sample <!-- grid -->
     * <button id="btnGetData" class="gj-button-md">Get Data</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     $('#btnGetData').on('click', function () {
     *         var data = grid.get(3);
     *         alert(data.Name + ' born in ' + data.PlaceOfBirth);
     *     });
     * </script>
     */
    self.get = function (position) {
        return methods.getByPosition(this, position);
    };

    /**
     * Return an array with all records presented in the grid.
     * @method
     * @param {boolean} includeAllRecords - include records that are not visible when you are using local dataSource.
     * @return number
     * @example Local.DataSource <!-- bootstrap, grid, grid.pagination -->
     * <button onclick="alert(JSON.stringify(grid.getAll()))" class="btn btn-default">Get All Visible Records</button>
     * <button onclick="alert(JSON.stringify(grid.getAll(true)))" class="btn btn-default">Get All Records</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var data, grid;
     *     data = [
     *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *     ];
     *     grid = $('#grid').grid({
     *         dataSource: data,
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         uiLibrary: 'bootstrap',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     * @example Remote.DataSource <!-- bootstrap, grid, grid.pagination -->
     * <button onclick="alert(JSON.stringify(grid.getAll()))" class="btn btn-default">Get All Visible Records</button>
     * <button onclick="alert(JSON.stringify(grid.getAll(true)))" class="btn btn-default">Get All Records</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         uiLibrary: 'bootstrap',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     */
    self.getAll = function (includeAllRecords) {
        return methods.getAll(this, includeAllRecords);
    };

    /**
     * Show hidden column.
     * @method
     * @param {string} field - The name of the field bound to the column.
     * @return grid
     * @example sample <!-- grid -->
     * <button id="btnShowColumn" class="gj-button-md">Show Column</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth', hidden: true } ]
     *     });
     *     $('#btnShowColumn').on('click', function () {
     *         grid.showColumn('PlaceOfBirth');
     *     });
     * </script>
     */
    self.showColumn = function (field) {
        return methods.showColumn(this, field);
    };

    /**
     * Hide column from the grid.
     * @method
     * @param {string} field - The name of the field bound to the column.
     * @return grid
     * @example sample <!-- grid -->
     * <button id="btnHideColumn" class="gj-button-md">Hide Column</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     $('#btnHideColumn').on('click', function () {
     *         grid.hideColumn('PlaceOfBirth');
     *     });
     * </script>
     */
    self.hideColumn = function (field) {
        return methods.hideColumn(this, field);
    };

    /**
     * Add new row to the grid.
     * @method
     * @param {object} record - Object with data for the new record.
     * @return grid
     * @example without.pagination <!-- grid -->
     * <button id="btnAdd" class="gj-button-md">Add Row</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     $('#btnAdd').on('click', function () {
     *         grid.addRow({ 'ID': grid.count(true) + 1, 'Name': 'Test Player', 'PlaceOfBirth': 'Test City, Test Country' });
     *     });
     * </script>
     * @example with.pagination <!-- grid, dropdown -->
     * <button id="btnAdd" class="gj-button-md">Add Row</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         primaryKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [ 
     *             { field: 'ID', width: 56 },
     *             { field: 'Name' },
     *             { field: 'PlaceOfBirth' },
     *             { width: 100, align: 'center', tmpl: '<i class="material-icons">delete</i>', events: { 'click': function(e) { grid.removeRow(e.data.id); } } }
     *         ],
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     *     $('#btnAdd').on('click', function () {
     *         grid.addRow({ 'ID': grid.count(true) + 1, 'Name': 'Test Player', 'PlaceOfBirth': 'Test City, Test Country' });
     *     });
     * </script>
     */
    self.addRow = function (record) {
        return methods.addRow(this, record);
    };

    /**
     * Update row data.
     * @method
     * @param {string} id - The id of the row that needs to be updated
     * @param {object} record - Object with data for the new record.
     * @return grid
     * @example sample <!-- grid, dropdown -->
     * <table id="grid"></table>
     * <script>
     *     var grid;
     *     grid = $('#grid').grid({
     *         primaryKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [
     *             { field: 'ID', width: 56 },
     *             { field: 'Name' },
     *             { field: 'PlaceOfBirth' },
     *             { title: '', width: 90, align: 'center', tmpl: '<u>Edit</u>', events: { 'click': Edit } }
     *         ],
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     *     function Edit(e) {
     *         grid.updateRow(e.data.id, { 'ID': e.data.id, 'Name': 'Ronaldo', 'PlaceOfBirth': 'Rio, Brazil' });
     *     }
     * </script>
     */
    self.updateRow = function (id, record) {
        return methods.updateRow(this, id, record);
    };

    //TODO: needs to be removed
    self.setCellContent = function (id, index, value) {
        methods.setCellContent(this, id, index, value);
    };

    /**
     * Remove row from the grid
     * @additionalinfo This method is design to work only with local datasources. If you use remote datasource, you need to send a request to the server to remove the row and then reload the data in the grid.
     * @method
     * @param {string} id - Id of the record that needs to be removed.
     * @return grid
     * @example Without.Pagination <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid;
     *     function Delete(e) {
     *         if (confirm('Are you sure?')) {
     *             grid.removeRow(e.data.id);
     *         }
     *     }
     *     grid = $('#grid').grid({
     *         primaryKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [
     *             { field: 'ID', width: 56 },
     *             { field: 'Name' },
     *             { field: 'PlaceOfBirth' },
     *             { width: 100, align: 'center', tmpl: '<u class="gj-cursor-pointer">Delete</u>', events: { 'click': Delete } }
     *         ]
     *     });
     * </script>
     * @example With.Pagination <!-- grid, dropdown -->
     * <table id="grid"></table>
     * <script>
     *     var grid;
     *     function Delete(e) {
     *         if (confirm('Are you sure?')) {
     *             grid.removeRow(e.data.id);
     *         }
     *     }
     *     grid = $('#grid').grid({
     *         primaryKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [
     *             { field: 'ID', width: 56 },
     *             { field: 'Name' },
     *             { field: 'PlaceOfBirth' },
     *             { width: 100, align: 'center', tmpl: '<u class="gj-cursor-pointer">Delete</u>', events: { 'click': Delete } }
     *         ],
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     */
    self.removeRow = function (id) {
        return methods.removeRow(this, id);
    };

    $.extend($grid, self);
    if ('grid' !== $grid.attr('data-type')) {
        methods.init.call($grid, jsConfig);
    }

    return $grid;
}

gj.grid.widget.prototype = new gj.widget();
gj.grid.widget.constructor = gj.grid.widget;

gj.grid.widget.prototype.getConfig = gj.grid.methods.getConfig;
gj.grid.widget.prototype.getHTMLConfig = gj.grid.methods.getHTMLConfig;

(function ($) {
    $.fn.grid = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.grid.widget(this, method);
            } else {
                $widget = new gj.grid.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);

/**
 * @widget Grid
 * @plugin Fixed Header
 */
gj.grid.plugins.fixedHeader = {
    config: {
        base: {

            /** If set to true, add scroll to the table body
             * @type boolean
             * @default object
             * @example Material.Design.Without.Pager <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Material.Design.With.Pager <!-- grid, dropdown -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             * @example Bootstrap.3.Without.Pager <!-- bootstrap, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     $('#grid').grid({
             *         uiLibrary: 'bootstrap',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         height: 200,
             *         columns: [ 
             *             { field: 'ID', width: 34 },
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.3.With.Pager <!-- bootstrap, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     $('#grid').grid({
             *         uiLibrary: 'bootstrap',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         height: 200,
             *         columns: [ 
             *             { field: 'ID', width: 34 }, 
             *             { field: 'Name' }, 
             *             { field: 'PlaceOfBirth' } 
             *         ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     $('#grid').grid({
             *         uiLibrary: 'bootstrap4',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ 
             *             { field: 'ID', width: 42 }, 
             *             { field: 'Name' }, 
             *             { field: 'PlaceOfBirth' } 
             *         ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             */
            fixedHeader: false,

            height: 300
        }
    },

    private: {
        init: function ($grid) {
            var data = $grid.data(),
                $tbody = $grid.children('tbody'),
                $thead = $grid.children('thead'),
                bodyHeight = data.height - $thead.outerHeight() - ($grid.children('tfoot').outerHeight() || 0);
            $grid.addClass('gj-grid-scrollable');
            $tbody.css('width', $thead.outerWidth());
            $tbody.height(bodyHeight);
        },

        refresh: function ($grid) {
            var i, width,
                data = $grid.data(),
                $tbody = $grid.children('tbody'),
                $thead = $grid.children('thead'),
                $tbodyCells = $grid.find('tbody tr[data-role="row"] td'),
                $theadCells = $grid.find('thead tr[data-role="caption"] th');

            if ($grid.children('tbody').height() < gj.grid.plugins.fixedHeader.private.getRowsHeight($grid)) {
                $tbody.css('width', $thead.outerWidth() + gj.grid.plugins.fixedHeader.private.getScrollBarWidth() + (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 1 : 0));
            } else {
                $tbody.css('width', $thead.outerWidth());
            }

            for (i = 0; i < $theadCells.length; i++) {
                width = $($theadCells[i]).outerWidth();
                if (i === 0 && gj.core.isIE()) {
                    width = width - 1;
                }
                $($tbodyCells[i]).attr('width', width);
            }
        },

        getRowsHeight: function ($grid) {
            var total = 0;
            $grid.find('tbody tr').each(function () {
                total += $(this).height();
            });
            return total;
        },

        getScrollBarWidth: function () {
            var inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";

            var outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild(inner);

            document.body.appendChild(outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
            if (w1 == w2) w2 = outer.clientWidth;

            document.body.removeChild(outer);

            return (w1 - w2);
        }
    },

    public: {
    },

    events: {
    },

    configure: function ($grid, fullConfig, clientConfig) {
        $.extend(true, $grid, gj.grid.plugins.fixedHeader.public);
        var data = $grid.data();
        if (clientConfig.fixedHeader) {
            $grid.on('initialized', function () {
                gj.grid.plugins.fixedHeader.private.init($grid);
            });
            $grid.on('dataBound', function () {
                gj.grid.plugins.fixedHeader.private.refresh($grid);
            });
            $grid.on('resize', function () {
                gj.grid.plugins.fixedHeader.private.refresh($grid);
            });
        }
    }
};

/** 
 * @widget Grid 
 * @plugin Expand Collapse Rows
 */
gj.grid.plugins.expandCollapseRows = {
    config: {
        base: {
            /** Template for the content in the detail section of the row.
             * Automatically add expand collapse column as a first column in the grid during initialization.
             * @type string
             * @default undefined
             * @example Material.Design <!-- grid, grid.expandCollapseRows -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'materialdesign',
             *         detailTemplate: '<div style="text-align: left"><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
             *     });
             * </script>
             * @example Bootstrap.3 <!-- bootstrap, grid, grid.expandCollapseRows -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
             *     });
             * </script>
             * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, grid, grid.expandCollapseRows -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap4',
             *         iconsLibrary: 'fontawesome',
             *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
             *     });
             * </script>
             */
            detailTemplate: undefined,

            /** If set try to persist the state of expanded rows.
             * You need to specify primaryKey on the initialization of the grid in order to enable this feature.
             * @default true
             * @example True <!-- bootstrap, grid  -->
             * <div class="container">
             *     <div class="row">
             *         <div class="col-xs-12">
             *             <p>Expand row, then change the page and return back to the page with expanded row in order to see that the expansion is kept.</p>
             *             <table id="grid"></table>
             *         </div>
             *     </div>
             * </div>
             * <script>
             *     var grid = $('#grid').grid({
             *         uiLibrary: 'bootstrap',
             *         primaryKey: 'ID',
             *         dataSource: '/Players/Get',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' } ],
             *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         keepExpandedRows: true,
             *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
             *     });
             * </script>
             */
            keepExpandedRows: true,

            expandedRows: [],

            icons: {
                /** Expand row icon definition.
                 * @alias icons.expandRow
                 * @type String
                 * @default '<i class="gj-icon chevron-right" />'
                 * @example Plus.Minus.Icons <!-- materialicons, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     $('#grid').grid({
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' } ],
                 *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
                 *         icons: {
                 *             expandRow: '<i class="material-icons">add</i>',
                 *             collapseRow: '<i class="material-icons">remove</i>'
                 *         }
                 *     });
                 * </script>
                 */
                expandRow: '<i class="gj-icon chevron-right" />',

                /** Collapse row icon definition.
                 * @alias icons.collapseRow
                 * @type String
                 * @default '<i class="gj-icon chevron-down" />'
                 * @example Plus.Minus.Icons <!-- materialicons, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     $('#grid').grid({
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' } ],
                 *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
                 *         icons: {
                 *             expandRow: '<i class="material-icons">add</i>',
                 *             collapseRow: '<i class="material-icons">remove</i>'
                 *         }
                 *     });
                 * </script>
                 */
                collapseRow: '<i class="gj-icon chevron-down" />'
            }
        },

        fontawesome: {
            icons: {
                expandRow: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
                collapseRow: '<i class="fa fa-angle-down" aria-hidden="true"></i>'
            }
        },

        glyphicons: {
            icons: {
                expandRow: '<span class="glyphicon glyphicon-chevron-right" />',
                collapseRow: '<span class="glyphicon glyphicon-chevron-down" />'
            }
        }
    },

    'private': {
        expandDetail: function ($grid, $cell, id) {
            var $contentRow = $cell.closest('tr'),
                $detailsRow = $('<tr data-role="details" />'),
                $detailsCell = $('<td colspan="' + gj.grid.methods.countVisibleColumns($grid) + '" />'),
                $detailsWrapper = $('<div data-role="display" />'),
                data = $grid.data(),
                position = $contentRow.data('position'),
                record = $grid.get(position),
                plugin = gj.grid.plugins.expandCollapseRows;

            if (typeof (id) === undefined) {
                id = gj.grid.methods.getId(record, data.primaryKey, record);
            }
            $detailsRow.append($detailsCell.append($detailsWrapper.append($contentRow.data('details'))));
            $detailsRow.insertAfter($contentRow);
            $cell.children('div[data-role="display"]').empty().append(data.icons.collapseRow);
            $grid.updateDetails($contentRow);
            plugin.private.keepSelection($grid, id);
            plugin.events.detailExpand($grid, $detailsRow.find('td>div'), id);
        },

        collapseDetail: function ($grid, $cell, id) {
            var $contentRow = $cell.closest('tr'),
                $detailsRow = $contentRow.next('tr[data-role="details"]'),
                data = $grid.data(),
                plugin = gj.grid.plugins.expandCollapseRows;

            if (typeof (id) === undefined) {
                id = gj.grid.methods.getId(record, data.primaryKey, record);
            }
            $detailsRow.remove();
            $cell.children('div[data-role="display"]').empty().append(data.icons.expandRow);
            plugin.private.removeSelection($grid, id);
            plugin.events.detailCollapse($grid, $detailsRow.find('td>div'), id);
        },

        keepSelection: function($grid, id) {
            var data = $grid.data();
            if (data.keepExpandedRows) {
                if ($.isArray(data.expandedRows)) {
                    if (data.expandedRows.indexOf(id) == -1) {
                        data.expandedRows.push(id);
                    }
                } else {
                    data.expandedRows = [id];
                }
            }
        },

        removeSelection: function ($grid, id) {
            var data = $grid.data();
            if (data.keepExpandedRows && $.isArray(data.expandedRows) && data.expandedRows.indexOf(id) > -1) {
                data.expandedRows.splice(data.expandedRows.indexOf(id), 1);
            }
        },

        updateDetailsColSpan: function ($grid) {
            var $cells = $grid.find('tbody > tr[data-role="details"] > td');
            if ($cells && $cells.length) {
                $cells.attr('colspan', gj.grid.methods.countVisibleColumns($grid));
            }
        }        
    },

    'public': {

        /**
         * Collapse all grid rows.
         * @method
         * @return jQuery object
         * @example Sample <!-- grid -->
         * <button onclick="grid.expandAll()" class="gj-button-md">Expand All</button>
         * <button onclick="grid.collapseAll()" class="gj-button-md">Collapse All</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         detailTemplate: '<div style="text-align: left"><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ],
         *         grouping: { groupBy: 'CountryName' },
         *     });
         * </script>
         */
        collapseAll: function () {
            var $grid = this, data = $grid.data(), position;
                

            if (typeof (data.detailTemplate) !== 'undefined') {
                position = gj.grid.methods.getColumnPositionByRole($grid, 'expander');
                $grid.find('tbody tr[data-role="row"]').each(function () {
                    gj.grid.plugins.expandCollapseRows.private.collapseDetail($grid, $(this).find('td:eq(' + position + ')'));
                });
            }

            if (typeof (data.grouping) !== 'undefined') {
                $grid.find('tbody tr[role="group"]').each(function () {
                    gj.grid.plugins.grouping.private.collapseGroup(data, $(this).find('td:eq(0)'));
                });
            }
            return $grid;
        },

        /**
         * Expand all grid rows.
         * @method
         * @return jQuery object
         * @example Sample <!-- grid -->
         * <button onclick="grid.expandAll()" class="gj-button-md">Expand All</button>
         * <button onclick="grid.collapseAll()" class="gj-button-md">Collapse All</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         detailTemplate: '<div style="text-align: left"><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ],
         *         grouping: { groupBy: 'CountryName' },
         *     });
         * </script>
         */
        expandAll: function () {
            var $grid = this, data = $grid.data(), position;

            if (typeof (data.detailTemplate) !== 'undefined') {
                position = gj.grid.methods.getColumnPositionByRole($grid, 'expander');
                $grid.find('tbody tr[data-role="row"]').each(function () {
                    gj.grid.plugins.expandCollapseRows.private.expandDetail($grid, $(this).find('td:eq(' + position + ')'));
                });
            }

            if (typeof (data.grouping) !== 'undefined') {
                $grid.find('tbody tr[role="group"]').each(function () {
                    gj.grid.plugins.grouping.private.expandGroup(data, $(this).find('td:eq(0)'));
                });
            }
            return $grid;
        },

        //TODO: add documentation
        updateDetails: function ($contentRow) {
            var $grid = this,
                $detailWrapper = $contentRow.data('details'),
                content = $detailWrapper.html(),
                record = $grid.get($contentRow.data('position'));

            if (record && content) {
                $detailWrapper.html().replace(/\{(.+?)\}/g, function ($0, $1) {
                    var column = gj.grid.methods.getColumnInfo($grid, $1);
                    content = content.replace($0, gj.grid.methods.formatText(record[$1], column));
                });
                $detailWrapper.html(content);
            }
            return $grid;
        }
    },

    'events': {
        /**
         * Event fires when detail row is showing
         *
         * @event detailExpand
         * @param {object} e - event data
         * @param {object} detailWrapper - the detail wrapper as jQuery object 
         * @param {string} id - the id of the record
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         primaryKey: 'ID',
         *         dataSource: '/Players/Get',
         *         detailTemplate: '<div></div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
         *     });
         *     grid.on('detailExpand', function (e, $detailWrapper, id) {
         *         var record = grid.getById(id);
         *         $detailWrapper.empty().append('<b>Place Of Birth:</b> ' + record.PlaceOfBirth);
         *     });
         * </script>
         */
        detailExpand: function ($grid, $detailWrapper, id) {
            $grid.triggerHandler('detailExpand', [$detailWrapper, id]);
        },

        /**
         * Event fires when detail row is hiding
         *
         * @event detailCollapse
         * @param {object} e - event data
         * @param {object} detailWrapper - the detail wrapper as jQuery object 
         * @param {string} id - the id of the record
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         primaryKey: 'ID',
         *         dataSource: '/Players/Get',
         *         detailTemplate: '<div></div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
         *     });
         *     grid.on('detailExpand', function (e, $detailWrapper, id) {
         *         var record = grid.getById(id);
         *         $detailWrapper.append('<b>Place Of Birth:</b>' + record.PlaceOfBirth);
         *     });
         *     grid.on('detailCollapse', function (e, $detailWrapper, id) {
         *         $detailWrapper.empty();
         *         alert('detailCollapse is fired.');
         *     });
         * </script>
         */
        detailCollapse: function ($grid, $detailWrapper, id) {
            $grid.triggerHandler('detailCollapse', [$detailWrapper, id]);
        }
    },

    'configure': function ($grid) {
        var column, data = $grid.data();

        $.extend(true, $grid, gj.grid.plugins.expandCollapseRows.public);

        if (typeof (data.detailTemplate) !== 'undefined') {
            column = {
                title: '',
                width: data.defaultIconColumnWidth,
                align: 'center',
                stopPropagation: true,
                cssClass: 'gj-cursor-pointer gj-unselectable',
                tmpl: data.icons.expandRow,
                role: 'expander',
                events: {
                    'click': function (e) {
                        var $cell = $(this), methods = gj.grid.plugins.expandCollapseRows.private;
                        if ($cell.closest('tr').next().attr('data-role') === 'details') {
                            methods.collapseDetail($grid, $cell, e.data.id);
                        } else {
                            methods.expandDetail($grid, $(this), e.data.id);
                        }
                    }
                }
            };
            data.columns = [column].concat(data.columns);

            $grid.on('rowDataBound', function (e, $row, id, record) {
                $row.data('details', $(data.detailTemplate));
            });
            $grid.on('columnShow', function (e, column) {
                gj.grid.plugins.expandCollapseRows.private.updateDetailsColSpan($grid);
            });
            $grid.on('columnHide', function (e, column) {
                gj.grid.plugins.expandCollapseRows.private.updateDetailsColSpan($grid);
            });
            $grid.on('rowRemoving', function (e, $row, id, record) {
                gj.grid.plugins.expandCollapseRows.private.collapseDetail($grid, $row.children('td').first(), id);
            });
            $grid.on('dataBinding', function () {
                $grid.collapseAll();
            });
            $grid.on('pageChanging', function () {
                $grid.collapseAll();
            });
            $grid.on('dataBound', function () {
                var i, $cell, $row, position, data = $grid.data();
                if (data.keepExpandedRows && $.isArray(data.expandedRows)) {
                    for (i = 0; i < data.expandedRows.length; i++) {
                        $row = gj.grid.methods.getRowById($grid, data.expandedRows[i]);
                        if ($row && $row.length) {
                            position = gj.grid.methods.getColumnPositionByRole($grid, 'expander');
                            $cell = $row.children('td:eq(' + position + ')');
                            if ($cell && $cell.length) {
                                gj.grid.plugins.expandCollapseRows.private.expandDetail($grid, $cell);
                            }
                        }
                    }
                }
            });
        }
    }
};
/** 
 * @widget Grid 
 * @plugin Inline Editing
 */
gj.grid.plugins.inlineEditing = {
    renderers: {
        editManager: function (value, record, $cell, $displayEl, id, $grid) {
            var data = $grid.data(),
                $edit = $(data.inlineEditing.editButton).attr('key', id),
                $delete = $(data.inlineEditing.deleteButton).attr('key', id),
                $update = $(data.inlineEditing.updateButton).attr('key', id).hide(),
                $cancel = $(data.inlineEditing.cancelButton).attr('key', id).hide();
            $edit.on('click', function (e) {
                $grid.edit($(this).attr('key'));
            });
            $delete.on('click', function (e) {
                $grid.removeRow($(this).attr('key'));
            });
            $update.on('click', function (e) {
                $grid.update($(this).attr('key'));
            });
            $cancel.on('click', function (e) {
                $grid.cancel($(this).attr('key'));
            });
            $displayEl.empty().append($edit).append($delete).append($update).append($cancel);
        }
    }
};

gj.grid.plugins.inlineEditing.config = {
    base: {
        defaultColumnSettings: {
            /** Provides a way to set an editing UI for the column.
             * @alias column.editor
             * @type function|boolean
             * @default undefined
             * @example Material.Design <!-- grid, datepicker, dropdown, checkbox -->
             * <table id="grid"></table>
             * <script>
             *     var countries = [ 'Bulgaria', 'Brazil', 'England', 'Germany', 'Colombia', 'Poland' ];
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: { dataSource: countries } },
             *             { field: 'DateOfBirth', type: 'date', editor: true, format: 'dd.mm.yyyy' },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Custom.With.Select2 <!-- grid, datepicker, checkbox -->
             * <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
             * <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
             * <table id="grid"></table>
             * <script>
             *     function select2editor($editorContainer, value, record) {
             *         var select = $('<select><option value="Bulgaria">Bulgaria</option><option value="Brazil">Brazil</option><option value="England">England</option><option value="Germany">Germany</option><option value="Colombia">Colombia</option><option value="Poland">Poland</option></select>');
             *         $editorContainer.append(select);
             *         select.select2();
             *     }
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: select2editor },
             *             { field: 'DateOfBirth', type: 'date', editor: true, format: 'dd.mm.yyyy' },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.3 <!-- bootstrap, grid, datepicker, dropdown, checkbox -->
             * <table id="grid"></table>
             * <script>
             *     var countries = [ 'Bulgaria', 'Brazil', 'England', 'Germany', 'Colombia', 'Poland' ];
             *     $('#grid').grid({
             *         uiLibrary: 'bootstrap',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: { dataSource: countries } },
             *             { field: 'DateOfBirth', type: 'date', editor: true },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, datepicker, dropdown, checkbox -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         uiLibrary: 'bootstrap4',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: { dataSource: '/Locations/GetCountries', valueField: 'id' }, editField: 'CountryID'  },
             *             { field: 'DateOfBirth', type: 'date', editor: true },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             */
            editor: undefined,

            /** The name of the field in the grid data where the grid is going to set the new value.
             * @additionalinfo This is usable when the editor is interface with key/value pairs like dropdowns where the key needs to be updated in a different field..
             * @alias column.editField
             * @type String
             * @default undefined
             * @example Bootstrap.4 <!-- bootstrap4, grid, datepicker, dropdown, checkbox -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         uiLibrary: 'bootstrap4',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: { dataSource: '/Locations/GetCountries', valueField: 'id' }, editField: 'CountryID' },
             *             { field: 'DateOfBirth', type: 'date', editor: true },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             */
            editField: undefined,

            /** Provides a way to specify a display mode for the column.
             * @alias column.mode
             * @type readEdit|editOnly|readOnly
             * @default readEdit
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', editor: true, mode: 'editOnly' },
             *             { field: 'PlaceOfBirth', editor: true, mode: 'readOnly' }
             *         ]
             *     });
             * </script>
             */
            mode: 'readEdit'
        },
        inlineEditing: {

            /** Inline editing mode.
             * @alias inlineEditing.mode
             * @type click|dblclick|command
             * @default 'click'
             * @example Double.Click <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'dblclick' },
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ]
             *     });
             * </script>
             * @example Command <!-- dropdown, grid -->
             * <table id="grid"></table>
             * <script>
             *     var grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     grid = $('#grid').grid({
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ],
             *         pager: { limit: 3 }
             *     });
             * </script>
             * @example DateTime <!-- datetimepicker, grid -->
             * <table id="grid"></table>
             * <script>
             *     var grid, data = [
             *         { 'ID': 1, 'Date': '05/15/2018', 'Time': '21:12', 'DateTime': '21:12 05/15/2018' },
             *         { 'ID': 2, 'Date': '05/16/2018', 'Time': '22:12', 'DateTime': '22:12 05/16/2018' },
             *         { 'ID': 3, 'Date': '05/17/2018', 'Time': '23:12', 'DateTime': '23:12 05/17/2018' }
             *     ];
             *     grid = $('#grid').grid({
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Date', type: 'date', format: 'mm/dd/yyyy', editor: true },
             *             { field: 'Time', type: 'time', format: 'HH:MM', editor: true },
             *             { field: 'DateTime', type: 'datetime', format: 'HH:MM mm/dd/yyyy', editor: true }
             *         ]
             *     });
             * </script>
             */
            mode: 'click',
                
            /** If set to true, add column with buttons for edit, delete, update and cancel at the end of the grid.
             * @alias inlineEditing.managementColumn
             * @type Boolean
             * @default true
             * @example True <!-- grid, checkbox, datepicker -->
             * <table id="grid"></table>
             * <script>
             *     var grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria', 'DateOfBirth': '\/Date(-122954400000)\/', IsActive: false },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil', 'DateOfBirth': '\/Date(211842000000)\/', IsActive: false },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England', 'DateOfBirth': '\/Date(-112417200000)\/', IsActive: false },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany', 'DateOfBirth': '\/Date(512258400000)\/', IsActive: true },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia', 'DateOfBirth': '\/Date(679266000000)\/', IsActive: true },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria', 'DateOfBirth': '\/Date(349653600000)\/', IsActive: false }
             *     ];
             *     grid = $('#grid').grid({
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command', managementColumn: true },
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true },
             *             { field: 'DateOfBirth', type: 'date', editor: true },
             *             { field: 'IsActive', title: 'Active?', type: 'checkbox', editor: true, width: 100, align: 'center' }
             *         ]
             *     });
             * </script>
             * @example False <!-- materialicons, grid -->
             * <table id="grid"></table>
             * <script>
             *     var grid, editManager, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     editManager = function (value, record, $cell, $displayEl, id, $grid) {
             *         var data = $grid.data(),
             *             $edit = $('<button class="gj-button-md"><i class="material-icons">mode_edit</i> Edit</button>').attr('data-key', id),
             *             $delete = $('<button class="gj-button-md"><i class="material-icons">delete</i> Delete</button>').attr('data-key', id),
             *             $update = $('<button class="gj-button-md"><i class="material-icons">check_circle</i> Update</button>').attr('data-key', id).hide(),
             *             $cancel = $('<button class="gj-button-md"><i class="material-icons">cancel</i> Cancel</button>').attr('data-key', id).hide();
             *         $edit.on('click', function (e) {
             *             $grid.edit($(this).data('key'));
             *             $edit.hide();
             *             $delete.hide();
             *             $update.show();
             *             $cancel.show();
             *         });
             *         $delete.on('click', function (e) {
             *             $grid.removeRow($(this).data('key'));
             *         });
             *         $update.on('click', function (e) {
             *             $grid.update($(this).data('key'));
             *             $edit.show();
             *             $delete.show();
             *             $update.hide();
             *             $cancel.hide();
             *         });
             *         $cancel.on('click', function (e) {
             *             $grid.cancel($(this).data('key'));
             *             $edit.show();
             *             $delete.show();
             *             $update.hide();
             *             $cancel.hide();
             *         });
             *         $displayEl.empty().append($edit).append($delete).append($update).append($cancel);
             *     }
             *     grid = $('#grid').grid({
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command', managementColumn: false },
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true },
             *             { width: 300, align: 'center', renderer: editManager }
             *         ]
             *     });
             * </script>
             * @example Bootstrap <!-- bootstrap, grid, dropdown -->
             * <table id="grid"></table>
             * <script>
             *     var grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     grid = $('#grid').grid({
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ],
             *         pager: { limit: 3, sizes: [3, 5, 10, 20] }
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, dropdown -->
             * <table id="grid"></table>
             * <script>
             *     var grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     grid = $('#grid').grid({
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         uiLibrary: 'bootstrap4',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ],
             *         pager: { limit: 3, sizes: [3, 5, 10, 20] }
             *     });
             * </script>
            */
            managementColumn: true,

            managementColumnConfig: { width: 300, role: 'managementColumn', align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager, cssClass: 'gj-grid-management-column' }
        }
    },

    bootstrap: {
        inlineEditing: {
            managementColumnConfig: { width: 200, role: 'managementColumn', align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager, cssClass: 'gj-grid-management-column' }
        }
    },

    bootstrap4: {
        inlineEditing: {
            managementColumnConfig: { width: 280, role: 'managementColumn', align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager, cssClass: 'gj-grid-management-column' }
        }
    }
};

gj.grid.plugins.inlineEditing.private = {
    localization: function (data) {
        if (data.uiLibrary === 'bootstrap') {
            data.inlineEditing.editButton = '<button role="edit" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> ' + gj.grid.messages[data.locale].Edit + '</button>';
            data.inlineEditing.deleteButton = '<button role="delete" class="btn btn-default btn-sm gj-margin-left-10"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> ' + gj.grid.messages[data.locale].Delete + '</button>';
            data.inlineEditing.updateButton = '<button role="update" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> ' + gj.grid.messages[data.locale].Update + '</button>';
            data.inlineEditing.cancelButton = '<button role="cancel" class="btn btn-default btn-sm gj-margin-left-10"><span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> ' + gj.grid.messages[data.locale].Cancel + '</button>';
        } else {
            data.inlineEditing.editButton = '<button role="edit" class="gj-button-md"><i class="gj-icon pencil" /> ' + gj.grid.messages[data.locale].Edit.toUpperCase() + '</button>';
            data.inlineEditing.deleteButton = '<button role="delete" class="gj-button-md"><i class="gj-icon delete" /> ' + gj.grid.messages[data.locale].Delete.toUpperCase() + '</button>';
            data.inlineEditing.updateButton = '<button role="update" class="gj-button-md"><i class="gj-icon check-circle" /> ' + gj.grid.messages[data.locale].Update.toUpperCase() + '</button>';
            data.inlineEditing.cancelButton = '<button role="cancel" class="gj-button-md"><i class="gj-icon cancel" /> ' +gj.grid.messages[data.locale].Cancel.toUpperCase() + '</button>';
        }
    },

    editMode: function ($grid, $cell, column, record) {
        var $displayContainer, $editorContainer, $editorField, value, config, data = $grid.data();
        if ($cell.attr('data-mode') !== 'edit') {
            if (column.editor) {
                gj.grid.plugins.inlineEditing.private.updateOtherCells($grid, column.mode);
                $displayContainer = $cell.find('div[data-role="display"]').hide();
                $editorContainer = $cell.find('div[data-role="edit"]').show();
                if ($editorContainer.length === 0) {
                    $editorContainer = $('<div data-role="edit" />');
                    $cell.append($editorContainer);
                }
                value = record[column.editField || column.field];
                $editorField = $editorContainer.find('input, select, textarea').first();
                if ($editorField.length) {
                    switch (column.type) {
                        case 'checkbox':
                            $editorField.prop('checked', value);
                            break;
                        case 'dropdown':
                            $editorField = $editorField.dropdown('value', value);
                            break;
                        default:
                            $editorField.val(value);
                    }
                } else {
                    if (typeof (column.editor) === 'function') {
                        column.editor($editorContainer, value, record);
                        $editorField = $editorContainer.find('input, select, textarea').first();
                    } else {
                        config = typeof column.editor === "object" ? column.editor : {};
                        config.uiLibrary = data.uiLibrary;
                        config.iconsLibrary = data.iconsLibrary;
                        config.fontSize = $grid.css('font-size');
                        config.showOnFocus = false;
                        if ('checkbox' === column.type && gj.checkbox) {
                            $editorField = $('<input type="checkbox" />').prop('checked', value);
                            $editorContainer.append($editorField);
                            $editorField.checkbox(config);
                        } else if (('date' === column.type && gj.datepicker) || ('time' === column.type && gj.timepicker) || ('datetime' === column.type && gj.datetimepicker)) {
                            $editorField = $('<input type="text" width="100%"/>');
                            $editorContainer.append($editorField);
                            if (column.format) {
                                config.format = column.format;
                            }
                            switch (column.type) {
                                case 'date':
                                    $editorField = $editorField.datepicker(config);
                                    break;
                                case 'time':
                                    $editorField = $editorField.timepicker(config);
                                    break;
                                case 'datetime':
                                    $editorField = $editorField.datetimepicker(config);
                                    break;
                            }
                            if ($editorField.value) {
                                $editorField.value($displayContainer.html());
                            }
                        } else if ('dropdown' === column.type && gj.dropdown) {
                            $editorField = $('<select type="text" width="100%"/>');
                            $editorContainer.append($editorField);
                            config.dataBound = function (e) {
                                var $dropdown = $(this).dropdown();
                                if (column.editField) {
                                    $dropdown.value(record[column.editField]);
                                } else {
                                    $dropdown.value(record[column.field]);
                                }
                            };
                            $editorField = $editorField.dropdown(config);
                        } else {
                            $editorField = $('<input type="text" value="' + value + '" class="gj-width-full"/>');
                            if (data.uiLibrary === 'materialdesign') {
                                $editorField.addClass('gj-textbox-md').css('font-size', $grid.css('font-size'));
                            }
                            $editorContainer.append($editorField);
                        }
                    }
                    if (data.inlineEditing.mode !== 'command' && column.mode !== 'editOnly') {
                        $editorField = $editorContainer.find('input, select, textarea').first();
                        $editorField.on('keyup', function (e) {
                            if (e.keyCode === 13 || e.keyCode === 27) {
                                gj.grid.plugins.inlineEditing.private.displayMode($grid, $cell, column);
                            }
                        });
                    }
                }
                if ($editorField.prop('tagName').toUpperCase() === "INPUT" && $editorField.prop('type').toUpperCase() === 'TEXT') {
                    gj.core.setCaretAtEnd($editorField[0]);
                } else {
                    $editorField.focus();
                }
                $cell.attr('data-mode', 'edit');
            } else if (column.role === 'managementColumn') {
                $cell.find('[role="edit"]').hide();
                $cell.find('[role="delete"]').hide();
                $cell.find('[role="update"]').show();
                $cell.find('[role="cancel"]').show();
            }
        }
    },

    displayMode: function ($grid, $cell, column, cancel) {
        var $editorContainer, $displayContainer, $ele, newValue, newEditFieldValue, record, position, style = '';
        if (column.mode !== 'editOnly') {
            if ($cell.attr('data-mode') === 'edit') {
                $editorContainer = $cell.find('div[data-role="edit"]');
                $displayContainer = $cell.find('div[data-role="display"]');
                $ele = $editorContainer.find('input, select, textarea').first();
                if ($ele[0].tagName.toUpperCase() === "SELECT" && $ele[0].selectedIndex > -1) {
                    newValue = $ele[0].options[$ele[0].selectedIndex].innerHTML;
                    newEditFieldValue = $ele[0].value;
                } else if ($ele[0].tagName.toUpperCase() === "INPUT" && $ele[0].type.toUpperCase() === "CHECKBOX") {
                    newValue = $ele[0].checked;
                } else {
                    newValue = $ele.val();
                }
                position = $cell.parent().data('position');
                record = $grid.get(position);
                if (cancel !== true && newValue !== record[column.field]) {
                    record[column.field] = column.type === 'date' ? gj.core.parseDate(newValue, column.format) : newValue;
                    if (column.editField) {
                        record[column.editField] = newEditFieldValue || newValue;
                    }
                    if (column.mode !== 'editOnly') {
                        gj.grid.methods.renderDisplayElement($grid, $displayContainer, column, record, gj.grid.methods.getId(record, $grid.data('primaryKey'), position), 'update');
                        if ($cell.find('span.gj-dirty').length === 0) {
                            $cell.prepend($('<span class="gj-dirty" />'));
                        }
                    }
                    gj.grid.plugins.inlineEditing.events.cellDataChanged($grid, $cell, column, record, newValue);
                    gj.grid.plugins.inlineEditing.private.updateChanges($grid, column, record, newValue);
                }
                $editorContainer.hide();
                $displayContainer.show();
                $cell.attr('data-mode', 'display');
            }
            if (column.role === 'managementColumn') {
                $cell.find('[role="update"]').hide();
                $cell.find('[role="cancel"]').hide();
                $cell.find('[role="edit"]').show();
                $cell.find('[role="delete"]').show();
            }
        }
    },

    updateOtherCells: function($grid, mode) {
        var data = $grid.data();
        if (data.inlineEditing.mode !== 'command' && mode !== 'editOnly') {
            $grid.find('div[data-role="edit"]:visible').parent('td').each(function () {
                var $cell = $(this),
                    column = data.columns[$cell.index()];
                gj.grid.plugins.inlineEditing.private.displayMode($grid, $cell, column);
            });
        }
    },

    updateChanges: function ($grid, column, sourceRecord, newValue) {
        var targetRecords, filterResult, newRecord, data = $grid.data();
        if (!data.guid) {
            data.guid = gj.grid.plugins.inlineEditing.private.generateGUID();
        }
        if (data.primaryKey) {
            targetRecords = JSON.parse(sessionStorage.getItem('gj.grid.' + data.guid));
            if (targetRecords) {
                filterResult = targetRecords.filter(function (record) {
                    return record[data.primaryKey] === sourceRecord[data.primaryKey];
                });
            } else {
                targetRecords = [];
            }
            if (filterResult && filterResult.length === 1) {
                filterResult[0][column.field] = newValue;
            } else {
                newRecord = {};
                newRecord[data.primaryKey] = sourceRecord[data.primaryKey];
                if (data.primaryKey !== column.field) {
                    newRecord[column.field] = newValue;
                }
                targetRecords.push(newRecord);
            }
            sessionStorage.setItem('gj.grid.' + data.guid, JSON.stringify(targetRecords));
        }
    },

    generateGUID: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
};

gj.grid.plugins.inlineEditing.public = {
    /**
     * Return array with all changes
     * @method
     * @return array
     * @example sample <!-- grid, grid.inlineEditing -->
     * <button id="btnGetChanges" class="gj-button-md">Get Changes</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         primaryKey: 'ID',
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID' }, { field: 'Name', editor: true }, { field: 'PlaceOfBirth', editor: true } ]
     *     });
     *     $('#btnGetChanges').on('click', function () {
     *         alert(JSON.stringify(grid.getChanges()));
     *     });
     * </script>
     */
    getChanges: function () {
        return JSON.parse(sessionStorage.getItem('gj.grid.' + this.data().guid));
    },

    /**
     * Enable edit mode for all editable cells within a row.
     * @method
     * @param {string} id - The id of the row that needs to be edited
     * @return grid
     * @example Edit.Row <!-- grid -->
     * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
     * <table id="grid"></table>
     * <script>
     *     var grid, renderer;
     *     renderer = function (value, record, $cell, $displayEl, id) {
     *         var $editBtn = $('<i class="fa fa-pencil gj-cursor-pointer" data-key="' + id + '"></i>'),
     *             $updateBtn = $('<i class="fa fa-save gj-cursor-pointer" data-key="' + id + '"></i>').hide();
     *         $editBtn.on('click', function (e) {
     *             grid.edit($(this).data('key'));
     *             $editBtn.hide();
     *             $updateBtn.show();
     *         });
     *         $updateBtn.on('click', function (e) {
     *             grid.update($(this).data('key'));
     *             $editBtn.show();
     *             $updateBtn.hide();
     *         });
     *         $displayEl.append($editBtn).append($updateBtn);
     *     }
     *     grid = $('#grid').grid({
     *         primaryKey: 'ID',
     *         dataSource: '/Players/Get',
     *         inlineEditing: { mode: 'command', managementColumn: false },
     *         columns: [ 
     *             { field: 'ID', width: 56 },
     *             { field: 'Name', editor: true }, 
     *             { field: 'PlaceOfBirth', editor: true },
     *             { width: 56, align: 'center', renderer: renderer }
     *         ]
     *     });
     * </script>
     */
    edit: function (id) {
        var i, record = this.getById(id),
            $cells = gj.grid.methods.getRowById(this, id).children('td'),
            columns = this.data('columns');

        for (i = 0; i < $cells.length; i++) {
            gj.grid.plugins.inlineEditing.private.editMode(this, $($cells[i]), columns[i], record);
        }
            
        return this;
    },

    /**
     * Update all editable cells within a row, when the row is in edit mode.
     * @method
     * @param {string} id - The id of the row that needs to be updated
     * @return grid
     * @fires rowDataChanged
     * @example Update.Row <!-- grid -->
     * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
     * <table id="grid"></table>
     * <script>
     *     var grid, renderer;
     *     renderer = function (value, record, $cell, $displayEl, id) {
     *         var $editBtn = $('<i class="fa fa-pencil gj-cursor-pointer" data-key="' + id + '"></i>'),
     *             $updateBtn = $('<i class="fa fa-save gj-cursor-pointer" data-key="' + id + '"></i>').hide();
     *         $editBtn.on('click', function (e) {
     *             grid.edit($(this).data('key'));
     *             $editBtn.hide();
     *             $updateBtn.show();
     *         });
     *         $updateBtn.on('click', function (e) {
     *             grid.update($(this).data('key'));
     *             $editBtn.show();
     *             $updateBtn.hide();
     *         });
     *         $displayEl.append($editBtn).append($updateBtn);
     *     }
     *     grid = $('#grid').grid({
     *         primaryKey: 'ID',
     *         dataSource: '/Players/Get',
     *         inlineEditing: { mode: 'command', managementColumn: false },
     *         columns: [ 
     *             { field: 'ID', width: 56 },
     *             { field: 'Name', editor: true }, 
     *             { field: 'PlaceOfBirth', editor: true },
     *             { width: 56, align: 'center', renderer: renderer }
     *         ]
     *     });
     * </script>
     */
    update: function (id) {
        var i, record = this.getById(id),
            $cells = gj.grid.methods.getRowById(this, id).children('td'),
            columns = this.data('columns');

        for (i = 0; i < $cells.length; i++) {
            gj.grid.plugins.inlineEditing.private.displayMode(this, $($cells[i]), columns[i], false);
        }

        gj.grid.plugins.inlineEditing.events.rowDataChanged(this, id, record);

        return this;
    },

    /**
     * Cancel the edition of all editable cells, when the row is in edit mode.
     * @method
     * @param {string} id - The id of the row where you need to undo all changes
     * @return grid
     * @example Cancel.Row <!-- grid -->
     * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
     * <table id="grid"></table>
     * <script>
     *     var grid, renderer;
     *     renderer = function (value, record, $cell, $displayEl, id) {
     *         var $editBtn = $('<i class="fa fa-pencil gj-cursor-pointer" data-key="' + id + '"></i>'),
     *             $cancelBtn = $('<i class="fa fa-undo gj-cursor-pointer" data-key="' + id + '"></i>').hide();
     *         $editBtn.on('click', function (e) {
     *             grid.edit($(this).data('key'));
     *             $editBtn.hide();
     *             $cancelBtn.show();
     *         });
     *         $cancelBtn.on('click', function (e) {
     *             grid.cancel($(this).data('key'));
     *             $editBtn.show();
     *             $cancelBtn.hide();
     *         });
     *         $displayEl.append($editBtn).append($cancelBtn);
     *     }
     *     grid = $('#grid').grid({
     *         primaryKey: 'ID',
     *         dataSource: '/Players/Get',
     *         inlineEditing: { mode: 'command', managementColumn: false },
     *         columns: [ 
     *             { field: 'ID', width: 56 },
     *             { field: 'Name', editor: true }, 
     *             { field: 'PlaceOfBirth', editor: true },
     *             { width: 56, align: 'center', renderer: renderer }
     *         ]
     *     });
     * </script>
     */
    cancel: function (id) {
        var i, record = this.getById(id),
            $cells = gj.grid.methods.getRowById(this, id).children('td'),
            columns = this.data('columns');

        for (i = 0; i < $cells.length; i++) {
            gj.grid.plugins.inlineEditing.private.displayMode(this, $($cells[i]), columns[i], true);
        }

        return this;
    }
};

gj.grid.plugins.inlineEditing.events = {
    /**
     * Event fires after inline edit of a cell in the grid.
     *
     * @event cellDataChanged
     * @param {object} e - event data
     * @param {object} $cell - the cell presented as jquery object 
     * @param {object} column - the column configuration data
     * @param {object} record - the data of the row record
     * @param {object} newValue - the new cell value
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', editor: true }, { field: 'PlaceOfBirth', editor: true } ]
     *     });
     *     grid.on('cellDataChanged', function (e, $cell, column, record, newValue) {
     *         alert('The value for "' + column.field + '" is changed to "' + newValue + '"');
     *     });
     * </script>
     */
    cellDataChanged: function ($grid, $cell, column, record, oldValue, newValue) {
        $grid.triggerHandler('cellDataChanged', [$cell, column, record, oldValue, newValue]);
    },

    /**
     * Event fires after inline edit of a row in the grid.
     *
     * @event rowDataChanged
     * @param {object} e - event data
     * @param {object} id - the id of the record
     * @param {object} record - the data of the row record
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         primaryKey: 'ID',
     *         dataSource: '/Players/Get',
     *         inlineEditing: { mode: 'command' },
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', editor: true }, { field: 'PlaceOfBirth', editor: true } ]
     *     });
     *     grid.on('rowDataChanged', function (e, id, record) {
     *         alert('Record with id="' + id + '" is changed to "' + JSON.stringify(record) + '"');
     *     });
     * </script>
     */
    rowDataChanged: function ($grid, id, record) {
        $grid.triggerHandler('rowDataChanged', [id, record]);
    }
};

gj.grid.plugins.inlineEditing.configure = function ($grid, fullConfig, clientConfig) {
    var data = $grid.data();
    $.extend(true, $grid, gj.grid.plugins.inlineEditing.public);
    if (clientConfig.inlineEditing) {
        $grid.on('dataBound', function () {
            $grid.find('span.gj-dirty').remove();
        });
        $grid.on('rowDataBound', function (e, $row, id, record) {
            $grid.cancel(id);
        });
    }
    if (data.inlineEditing.mode === 'command') {
        gj.grid.plugins.inlineEditing.private.localization(data);
        if (fullConfig.inlineEditing.managementColumn) {
            data.columns.push(fullConfig.inlineEditing.managementColumnConfig);
        }
    } else {
        $grid.on('cellDataBound', function (e, $displayEl, id, column, record) {
            if (column.editor) {
                if (column.mode === 'editOnly') {
                    gj.grid.plugins.inlineEditing.private.editMode($grid, $displayEl.parent(), column, record);
                } else {
                    $displayEl.parent('td').on(data.inlineEditing.mode === 'dblclick' ? 'dblclick' : 'click', function () {
                        gj.grid.plugins.inlineEditing.private.editMode($grid, $displayEl.parent(), column, record);
                    });
                }
            }
        });
    }
};

/** 
 * @widget Grid 
 * @plugin Optimistic Persistence
 */
gj.grid.plugins.optimisticPersistence = {

    config: {
        base: {
            optimisticPersistence: {
                /** Array that contains a list with param names that needs to be saved in the localStorage. You need to specify guid on the initialization of the grid in order to enable this feature.
                 * @additionalinfo This feature is using <a href="https://developer.mozilla.org/en/docs/Web/API/Window/localStorage" target="_blank">HTML5 localStorage</a> to store params and values.
                 * You can clear the data saved in localStorage when you clear your browser cache.
                 * @alias optimisticPersistence.localStorage
                 * @type array
                 * @default undefined
                 * @example sample <!-- bootstrap, grid  -->
                 * <p>Change the page and/or page size and then refresh the grid.</p>
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         guid: '58d47231-ac7b-e6d2-ddba-5e0195b31f2e',
                 *         uiLibrary: 'bootstrap',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         optimisticPersistence: { localStorage: ["page", "limit"] },
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 */
                localStorage: undefined,

                /** Array that contains a list with param names that needs to be saved in the sessionStorage. You need to specify guid on the initialization of the grid in order to enable this feature.
                 * @additionalinfo This feature is using <a href="https://developer.mozilla.org/en/docs/Web/API/Window/sessionStorage" target="_blank">HTML5 sessionStorage</a> to store params and values.
                 * You can clear the data saved in sessionStorage when you open and close the browser.
                 * @alias optimisticPersistence.sessionStorage
                 * @type array
                 * @default undefined
                 * @example sample <!-- bootstrap, grid  -->
                 * <p>Change the page and/or page size and then refresh the grid. </p>
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         guid: '58d47231-ac7b-e6d2-ddba-5e0195b31f2f',
                 *         uiLibrary: 'bootstrap',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         optimisticPersistence: { sessionStorage: ["page", "limit"] },
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 */
                sessionStorage: undefined
            }
        }
    },

    private: {
        applyParams: function ($grid) {
            var data = $grid.data(),
                params = {}, storage;
            storage = JSON.parse(sessionStorage.getItem('gj.grid.' + data.guid));
            if (storage && storage.optimisticPersistence) {
                $.extend(params, storage.optimisticPersistence);
            }
            storage = JSON.parse(localStorage.getItem('gj.grid.' + data.guid));
            if (storage && storage.optimisticPersistence) {
                $.extend(params, storage.optimisticPersistence);
            }
            $.extend(data.params, params);
        },

        saveParams: function ($grid) {
            var i, param,
                data = $grid.data(),
                storage = { optimisticPersistence: {} };

            if (data.optimisticPersistence.sessionStorage) {
                for (i = 0; i < data.optimisticPersistence.sessionStorage.length; i++) {
                    param = data.optimisticPersistence.sessionStorage[i];
                    storage.optimisticPersistence[param] = data.params[param];
                }
                storage = $.extend(true, JSON.parse(sessionStorage.getItem('gj.grid.' + data.guid)), storage);
                sessionStorage.setItem('gj.grid.' + data.guid, JSON.stringify(storage));
            }

            if (data.optimisticPersistence.localStorage) {
                storage = { optimisticPersistence: {} };
                for (i = 0; i < data.optimisticPersistence.localStorage.length; i++) {
                    param = data.optimisticPersistence.localStorage[i];
                    storage.optimisticPersistence[param] = data.params[param];
                }
                storage = $.extend(true, JSON.parse(localStorage.getItem('gj.grid.' + data.guid)), storage);
                localStorage.setItem('gj.grid.' + data.guid, JSON.stringify(storage));
            }
        }
    },

    configure: function ($grid, fullConfig, clientConfig) {
        if (fullConfig.guid) {
            if (fullConfig.optimisticPersistence.localStorage || fullConfig.optimisticPersistence.sessionStorage) {
                gj.grid.plugins.optimisticPersistence.private.applyParams($grid);
                $grid.on('dataBound', function (e) {
                    gj.grid.plugins.optimisticPersistence.private.saveParams($grid);
                });
            }
        }
    }
};
/**
 * @widget Grid
 * @plugin Pagination
 */
gj.grid.plugins.pagination = {
    config: {
        base: {
            style: {
                pager: {
                    panel: '',
                    stateDisabled: '',
                    activeButton: ''
                }
            },

            paramNames: {
                /** The name of the parameter that is going to send the number of the page.
                 * The pager should be enabled in order this parameter to be in use.
                 * @alias paramNames.page
                 * @type string
                 * @default "page"
                 */
                page: 'page',

                /** The name of the parameter that is going to send the maximum number of records per page.
                 * The pager should be enabled in order this parameter to be in use.
                 * @alias paramNames.limit
                 * @type string
                 * @default "limit"
                 */
                limit: 'limit'
            },

            pager: {
                /** The maximum number of records that can be show by page.
                 * @alias pager.limit
                 * @type number
                 * @default 10
                 * @example local.data <!-- grid, dropdown -->
                 * <table id="grid"></table>
                 * <script>
                 *     var data, grid;
                 *     data = [
                 *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
                 *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
                 *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
                 *     ];
                 *     grid = $('#grid').grid({
                 *         dataSource: data,
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 100] }
                 *     });
                 * </script>
                 * @example remote.data <!-- grid, dropdown -->
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 100] }
                 *     });
                 * </script>
                 */
                limit: 10,

                /** Array that contains the possible page sizes of the grid.
                 * When this setting is set, then a drop down with the options for each page size is visualized in the pager.
                 * @alias pager.sizes
                 * @type array
                 * @default [5, 10, 20, 100]
                 * @example Bootstrap.3 <!-- bootstrap, grid, grid.pagination, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'bootstrap',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 * @example Bootstrap.4.FontAwesome <!-- bootstrap4, fontawesome, grid, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'bootstrap4',
                 *         iconsLibrary: 'fontawesome',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 * @example Bootstrap.4.Material.Icons <!-- bootstrap4, grid, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'bootstrap4',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 * @example Material.Design <!-- grid, grid.pagination, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'materialdesign',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 */
                sizes: [5, 10, 20, 100],

                /** Array that contains a list with jquery objects that are going to be used on the left side of the pager.
                 * @alias pager.leftControls
                 * @type array
                 * @default array
                 * @example Font.Awesome <!-- fontawesome, grid  -->
                 * <style>
                 * .icon-disabled { color: #ccc; }
                 * table.gj-grid div[data-role="display"] div.custom-item { display: table; margin-right: 5px; }
                 * </style>
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         style: {
                 *             pager: {
                 *                 stateDisabled: 'icon-disabled'
                 *             }
                 *         },
                 *         pager: { 
                 *             limit: 2, 
                 *             sizes: [2, 5, 10, 20],
                 *             leftControls: [
                 *                 $('<div title="First" data-role="page-first" class="custom-item"><i class="fa fa-fast-backward" aria-hidden="true" /></div>'),
                 *                 $('<div title="Previous" data-role="page-previous" class="custom-item"><i class="fa fa-backward" aria-hidden="true" /></div>'),
                 *                 $('<div> Page </div>'),
                 *                 $('<div class="custom-item"></div>').append($('<input type="text" data-role="page-number" style="margin: 0 5px; width: 34px; height: 16px; text-align: right;" value="0">')),
                 *                 $('<div>of&nbsp;</div>'),
                 *                 $('<div data-role="page-label-last" style="margin-right: 5px;">0</div>'),
                 *                 $('<div title="Next" data-role="page-next" class="custom-item"><i class="fa fa-forward" aria-hidden="true" /></div>'),
                 *                 $('<div title="Last" data-role="page-last" class="custom-item"><i class="fa fa-fast-forward" aria-hidden="true" /></div>'),
                 *                 $('<div title="Reload" data-role="page-refresh" class="custom-item"><i class="fa fa-refresh" aria-hidden="true" /></div>'),
                 *                 $('<div class="custom-item"></div>').append($('<select data-role="page-size" style="margin: 0 5px; width: 50px;"></select>'))
                 *             ],
                 *             rightControls: [
                 *                 $('<div>Displaying records&nbsp;</div>'),
                 *                 $('<div data-role="record-first">0</div>'),
                 *                 $('<div>&nbsp;-&nbsp;</div>'),
                 *                 $('<div data-role="record-last">0</div>'),
                 *                 $('<div>&nbsp;of&nbsp;</div>'),
                 *                 $('<div data-role="record-total">0</div>').css({ "margin-right": "5px" })
                 *             ]
                 *         }
                 *     });
                 * </script>
                 */
                leftControls: undefined,

                /** Array that contains a list with jquery objects that are going to be used on the right side of the pager.
                 * @alias pager.rightControls
                 * @type array
                 * @default array
                 */
                rightControls: undefined
            }
        },

        bootstrap: {
            style: {
                pager: {
                    panel: '',
                    stateDisabled: ''
                }
            }
        },

        bootstrap4: {
            style: {
                pager: {
                    panel: 'btn-toolbar',
                    stateDisabled: ''
                }
            }
        },

        glyphicons: {
            icons: {
                first: '<span class="glyphicon glyphicon-step-backward"></span>',
                previous: '<span class="glyphicon glyphicon-backward"></span>',
                next: '<span class="glyphicon glyphicon-forward"></span>',
                last: '<span class="glyphicon glyphicon-step-forward"></span>',
                refresh: '<span class="glyphicon glyphicon-refresh"></span>'
            }
        },

        materialicons: {
            icons: {
                first: '<i class="gj-icon first-page" />',
                previous: '<i class="gj-icon chevron-left" />',
                next: '<i class="gj-icon chevron-right" />',
                last: '<i class="gj-icon last-page" />',
                refresh: '<i class="gj-icon refresh" />'
            }
        },

        fontawesome: {
            icons: {
                first: '<i class="fa fa-fast-backward" aria-hidden="true"></i>',
                previous: '<i class="fa fa-backward" aria-hidden="true"></i>',
                next: '<i class="fa fa-forward" aria-hidden="true"></i>',
                last: '<i class="fa fa-fast-forward" aria-hidden="true"></i>',
                refresh: '<i class="fa fa-refresh" aria-hidden="true"></i>'
            }
        }
    },

    private: {
        init: function ($grid) {
            var $row, $cell, data, controls, $leftPanel, $rightPanel, $tfoot, leftControls, rightControls, i;

            data = $grid.data();

            if (data.pager) {
                if (!data.params[data.paramNames.page]) {
                    data.params[data.paramNames.page] = 1;
                }
                if (!data.params[data.paramNames.limit]) {
                    data.params[data.paramNames.limit] = data.pager.limit;
                }

                gj.grid.plugins.pagination.private.localization(data);

                $row = $('<tr data-role="pager"/>');
                $cell = $('<th/>');
                $row.append($cell);

                $leftPanel = $('<div data-role="display" />').addClass(data.style.pager.panel).css({ 'float': 'left' });
                $rightPanel = $('<div data-role="display" />').addClass(data.style.pager.panel).css({ 'float': 'right' });

                $cell.append($leftPanel).append($rightPanel);

                $tfoot = $('<tfoot />').append($row);
                $grid.append($tfoot);
                gj.grid.plugins.pagination.private.updatePagerColSpan($grid);

                leftControls = gj.grid.methods.clone(data.pager.leftControls); //clone array
                $.each(leftControls, function () {
                    $leftPanel.append(this);
                });

                rightControls = gj.grid.methods.clone(data.pager.rightControls); //clone array
                $.each(rightControls, function () {
                    $rightPanel.append(this);
                });

                controls = $grid.find('tfoot [data-role]');
                for (i = 0; i < controls.length; i++) {
                    gj.grid.plugins.pagination.private.initPagerControl($(controls[i]), $grid);
                }
            }
        },

        localization: function (data) {
            if (data.uiLibrary === 'bootstrap') {
                gj.grid.plugins.pagination.private.localizationBootstrap(data);
            } else if (data.uiLibrary === 'bootstrap4') {
                gj.grid.plugins.pagination.private.localizationBootstrap4(data);
            } else {
                gj.grid.plugins.pagination.private.localizationMaterialDesign(data);
            }
        },

        localizationBootstrap: function (data) {
            var msg = gj.grid.messages[data.locale];
            if (typeof (data.pager.leftControls) === 'undefined') {
                data.pager.leftControls = [
                    $('<button type="button" class="btn btn-default btn-sm">' + (data.icons.first || msg.First) + '</button>').attr('title', msg.FirstPageTooltip).attr('data-role', 'page-first'),
                    $('<button type="button" class="btn btn-default btn-sm">' + (data.icons.previous || msg.Previous) + '</button>').attr('title', msg.PreviousPageTooltip).attr('data-role', 'page-previous'),
                    $('<div>' + msg.Page + '</div>'),
                    $('<input data-role="page-number" class="form-control input-sm" type="text" value="0">'),
                    $('<div>' + msg.Of + '</div>'),
                    $('<div data-role="page-label-last">0</div>'),
                    $('<button type="button" class="btn btn-default btn-sm">' + (data.icons.next || msg.Next) + '</button>').attr('title', msg.NextPageTooltip).attr('data-role', 'page-next'),
                    $('<button type="button" class="btn btn-default btn-sm">' + (data.icons.last || msg.Last) + '</button>').attr('title', msg.LastPageTooltip).attr('data-role', 'page-last'),
                    $('<button type="button" class="btn btn-default btn-sm">' + (data.icons.refresh || msg.Refresh) + '</button>').attr('title', msg.Refresh).attr('data-role', 'page-refresh'),
                    $('<select data-role="page-size" class="form-control input-sm" width="60"></select>')
                ];
            }
            if (typeof (data.pager.rightControls) === 'undefined') {
                data.pager.rightControls = [
                    $('<div>' + msg.DisplayingRecords + '</div>'),
                    $('<div data-role="record-first">0</div>'),
                    $('<div>-</div>'),
                    $('<div data-role="record-last">0</div>'),
                    $('<div>' + msg.Of + '</div>'),
                    $('<div data-role="record-total">0</div>')
                ];
            }
        },

        localizationBootstrap4: function (data) {
            var msg = gj.grid.messages[data.locale];
            if (typeof (data.pager.leftControls) === 'undefined') {
                data.pager.leftControls = [
                    $('<button class="btn btn-default btn-sm gj-cursor-pointer">' + (data.icons.first || msg.First) + '</button>').attr('title', msg.FirstPageTooltip).attr('data-role', 'page-first'),
                    $('<button class="btn btn-default btn-sm gj-cursor-pointer">' + (data.icons.previous || msg.Previous) + '</button>').attr('title', msg.PreviousPageTooltip).attr('data-role', 'page-previous'),
                    $('<div>' + msg.Page + '</div>'),
                    $('<div class="input-group"><input data-role="page-number" class="form-control form-control-sm" type="text" value="0"></div>'),
                    $('<div>' + msg.Of + '</div>'),
                    $('<div data-role="page-label-last">0</div>'),
                    $('<button class="btn btn-default btn-sm gj-cursor-pointer">' + (data.icons.next || msg.Next) + '</button>').attr('title', msg.NextPageTooltip).attr('data-role', 'page-next'),
                    $('<button class="btn btn-default btn-sm gj-cursor-pointer">' + (data.icons.last || msg.Last) + '</button>').attr('title', msg.LastPageTooltip).attr('data-role', 'page-last'),
                    $('<button class="btn btn-default btn-sm gj-cursor-pointer">' + (data.icons.refresh || msg.Refresh) + '</button>').attr('title', msg.Refresh).attr('data-role', 'page-refresh'),
                    $('<select data-role="page-size" class="form-control input-sm" width="60"></select>')
                ];
            }
            if (typeof (data.pager.rightControls) === 'undefined') {
                data.pager.rightControls = [
                    $('<div>' + msg.DisplayingRecords + '&nbsp;</div>'),
                    $('<div data-role="record-first">0</div>'),
                    $('<div>-</div>'),
                    $('<div data-role="record-last">0</div>'),
                    $('<div>' + msg.Of + '</div>'),
                    $('<div data-role="record-total">0</div>')
                ];
            }
        },

        localizationMaterialDesign: function (data) {
            var msg = gj.grid.messages[data.locale];
            if (typeof (data.pager.leftControls) === 'undefined') {
                data.pager.leftControls = [];
            }
            if (typeof (data.pager.rightControls) === 'undefined') {
                data.pager.rightControls = [
                    $('<span class="">' + msg.RowsPerPage + '</span>'),
                    $('<select data-role="page-size" class="gj-grid-md-limit-select" width="52"></select></div>'),
                    $('<span class="gj-md-spacer-32">&nbsp;</span>'),
                    $('<span data-role="record-first" class="">0</span>'),
                    $('<span class="">-</span>'),
                    $('<span data-role="record-last" class="">0</span>'),
                    $('<span class="gj-grid-mdl-pager-label">' + msg.Of + '</span>'),
                    $('<span data-role="record-total" class="">0</span>'),
                    $('<span class="gj-md-spacer-32">&nbsp;</span>'),
                    $('<button class="gj-button-md">' + (data.icons.previous || msg.Previous) + '</button>').attr('title', msg.PreviousPageTooltip).attr('data-role', 'page-previous').addClass(data.icons.first ? 'gj-button-md-icon' : ''),
                    $('<span class="gj-md-spacer-24">&nbsp;</span>'),
                    $('<button class="gj-button-md">' + (data.icons.next || msg.Next) + '</button>').attr('title', msg.NextPageTooltip).attr('data-role', 'page-next').addClass(data.icons.first ? 'gj-button-md-icon' : '')
                ];
            }
        },

        initPagerControl: function ($control, $grid) {
            var data = $grid.data();
            switch ($control.data('role')) {
                case 'page-size':
                    if (data.pager.sizes && 0 < data.pager.sizes.length) {
                        $control.show();
                        $.each(data.pager.sizes, function () {
                            $control.append($('<option/>').attr('value', this.toString()).text(this.toString()));
                        });
                        $control.change(function () {
                            var newSize = parseInt(this.value, 10);
                            data.params[data.paramNames.limit] = newSize;
                            gj.grid.plugins.pagination.private.changePage($grid, 1);
                            gj.grid.plugins.pagination.events.pageSizeChange($grid, newSize);
                        });
                        $control.val(data.params[data.paramNames.limit]);
                        if (gj.dropdown) {
                            $control.dropdown({
                                uiLibrary: data.uiLibrary,
                                iconsLibrary: data.iconsLibrary,
                                fontSize: $control.css('font-size'),
                                style: {
                                    presenter: 'btn btn-default btn-sm'
                                }
                            });
                        }
                    } else {
                        $control.hide();
                    }
                    break;
                case 'page-refresh':
                    $control.on('click', function () { $grid.reload(); });
                    break;
            }

        },

        reloadPager: function ($grid, totalRecords) {
            var page, limit, lastPage, firstRecord, lastRecord, data, controls, i;

            data = $grid.data();

            if (data.pager) {
                page = (0 === totalRecords) ? 0 : parseInt(data.params[data.paramNames.page], 10);
                limit = parseInt(data.params[data.paramNames.limit], 10);
                lastPage = Math.ceil(totalRecords / limit);
                firstRecord = (0 === page) ? 0 : (limit * (page - 1)) + 1;
                lastRecord = (firstRecord + limit) > totalRecords ? totalRecords : (firstRecord + limit) - 1;

                controls = $grid.find('TFOOT [data-role]');
                for (i = 0; i < controls.length; i++) {
                    gj.grid.plugins.pagination.private.reloadPagerControl($(controls[i]), $grid, page, lastPage, firstRecord, lastRecord, totalRecords);
                }

                gj.grid.plugins.pagination.private.updatePagerColSpan($grid);
            }
        },

        reloadPagerControl: function ($control, $grid, page, lastPage, firstRecord, lastRecord, totalRecords) {
            var newPage;
            switch ($control.data('role')) {
                case 'page-first':
                    gj.grid.plugins.pagination.private.assignPageHandler($grid, $control, 1, page < 2);
                    break;
                case 'page-previous':
                    gj.grid.plugins.pagination.private.assignPageHandler($grid, $control, page - 1, page < 2);
                    break;
                case 'page-number':
                    $control.val(page).off('change').on('change', gj.grid.plugins.pagination.private.createChangePageHandler($grid, page));
                    break;
                case 'page-label-last':
                    $control.text(lastPage);
                    break;
                case 'page-next':
                    gj.grid.plugins.pagination.private.assignPageHandler($grid, $control, page + 1, lastPage === page);
                    break;
                case 'page-last':
                    gj.grid.plugins.pagination.private.assignPageHandler($grid, $control, lastPage, lastPage === page);
                    break;
                case 'page-button-one':
                    newPage = (page === 1) ? 1 : ((page == lastPage) ? (page - 2) : (page - 1));
                    gj.grid.plugins.pagination.private.assignButtonHandler($grid, $control, page, newPage, lastPage);
                    break;
                case 'page-button-two':
                    newPage = (page === 1) ? 2 : ((page == lastPage) ? lastPage - 1 : page);
                    gj.grid.plugins.pagination.private.assignButtonHandler($grid, $control, page, newPage, lastPage);
                    break;
                case 'page-button-three':
                    newPage = (page === 1) ? page + 2 : ((page == lastPage) ? page : (page + 1));
                    gj.grid.plugins.pagination.private.assignButtonHandler($grid, $control, page, newPage, lastPage);
                    break;
                case 'record-first':
                    $control.text(firstRecord);
                    break;
                case 'record-last':
                    $control.text(lastRecord);
                    break;
                case 'record-total':
                    $control.text(totalRecords);
                    break;
            }
        },

        assignPageHandler: function ($grid, $control, newPage, disabled) {
            var style = $grid.data().style.pager;
            if (disabled) {
                $control.addClass(style.stateDisabled).prop('disabled', true).off('click');
            } else {
                $control.removeClass(style.stateDisabled).prop('disabled', false).off('click').on('click', function () {
                    gj.grid.plugins.pagination.private.changePage($grid, newPage);
                });
            }
        },

        assignButtonHandler: function ($grid, $control, page, newPage, lastPage) {
            var style = $grid.data().style.pager;
            if (newPage < 1 || newPage > lastPage) {
                $control.hide();
            } else {
                $control.show().off('click').text(newPage);
                if (newPage === page) {
                    $control.addClass(style.activeButton);
                } else {
                    $control.removeClass(style.activeButton).on('click', function () {
                        gj.grid.plugins.pagination.private.changePage($grid, newPage);
                    });
                }
            }
        },

        createChangePageHandler: function ($grid, currentPage) {
            return function () {
                var data = $grid.data(),
                    newPage = parseInt(this.value, 10);
                gj.grid.plugins.pagination.private.changePage($grid, newPage);
            };
        },

        changePage: function ($grid, newPage) {
            var data = $grid.data();
            if (gj.grid.plugins.pagination.events.pageChanging($grid, newPage) !== false && !isNaN(newPage)) {
                $grid.find('TFOOT [data-role="page-number"]').val(newPage);
                data.params[data.paramNames.page] = newPage;
            }
            $grid.reload();
        },

        updatePagerColSpan: function ($grid) {
            var $cell = $grid.find('tfoot > tr[data-role="pager"] > th');
            if ($cell && $cell.length) {
                $cell.attr('colspan', gj.grid.methods.countVisibleColumns($grid));
            }
        },
        
        isLastRecordVisible: function ($grid) {
            var result = true,
                data = $grid.data(),
                limit = parseInt(data.params[data.paramNames.limit], 10),
                page = parseInt(data.params[data.paramNames.page], 10),
                count = $grid.count();
            if (limit && page) {
                result = ((page - 1) * limit) + count === data.totalRecords;
            }
            return result;
        }
    },

    public: {
        getAll: function (includeAllRecords) {
            var limit, page, start, data = this.data();
            if ($.isArray(data.dataSource)) {
                if (includeAllRecords) {
                    return data.dataSource;
                } else if (data.params[data.paramNames.limit] && data.params[data.paramNames.page]) {                    
                    limit = parseInt(data.params[data.paramNames.limit], 10);
                    page = parseInt(data.params[data.paramNames.page], 10);
                    start = (page - 1) * limit;
                    return data.records.slice(start, start + limit);
                } else {
                    return data.records;
                }
            } else {
                return data.records;
            }
        }
    },

    events: {
        /**
         * Triggered when the page size is changed.
         *
         * @event pageSizeChange
         * @param {object} e - event data
         * @param {number} newSize - The new page size
         * @example sample <!-- bootstrap, grid, grid.pagination -->
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap',
         *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         *     grid.on('pageSizeChange', function (e, newSize) {
         *         alert('The new page size is ' + newSize + '.');
         *     });
         * </script>
         */
        pageSizeChange: function ($grid, newSize) {
            $grid.triggerHandler('pageSizeChange', [newSize]);
        },

        /**
         * Triggered before the change of the page.
         *
         * @event pageChanging
         * @param {object} e - event data
         * @param {number} newPage - The new page
         * @example sample <!-- bootstrap4, fontawesome, dropdown, grid, grid.pagination -->
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         *     grid.on('pageChanging', function (e, newPage) {
         *         if (isNaN(newPage)) {
         *             alert('Invalid page number');
         *             return false;
         *         } else {
         *             alert(newPage + ' is valid page number.');
         *         }
         *     });
         * </script>
         */
        pageChanging: function ($grid, newSize) {
            $grid.triggerHandler('pageChanging', [newSize]);
        }
    },

    configure: function ($grid, fullConfig, clientConfig) {
        $.extend(true, $grid, gj.grid.plugins.pagination.public);
        var data = $grid.data();
        if (clientConfig.pager) {
            gj.grid.methods.isLastRecordVisible = gj.grid.plugins.pagination.private.isLastRecordVisible;

            $grid.on('initialized', function () {
                gj.grid.plugins.pagination.private.init($grid);
            });
            $grid.on('dataBound', function (e, records, totalRecords) {
                gj.grid.plugins.pagination.private.reloadPager($grid, totalRecords);
            });
            $grid.on('columnShow', function () {
                gj.grid.plugins.pagination.private.updatePagerColSpan($grid);
            });
            $grid.on('columnHide', function () {
                gj.grid.plugins.pagination.private.updatePagerColSpan($grid);
            });
        }
    }
};

/** 
 * @widget Grid 
 * @plugin Responsive Design
 */
gj.grid.plugins.responsiveDesign = {
    config: {
        base: {
            /** The interval in milliseconds for checking if the grid is resizing.
             * This setting is in use only if the resizeMonitoring setting is set to true.
             * @type number
             * @default 500
             * @example sample <!-- grid, grid.responsiveDesign -->
             * <p>Change browser window size in order to fire resize event.</p>
             * <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         responsive: true,
             *         resizeCheckInterval: 2000, //check if the grid is resized on each 2 second
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             *     grid.on('resize', function () {
             *         alert('resize is fired.');
             *     });
             * </script>
             */
            resizeCheckInterval: 500,

            /** This setting enables responsive behaviour of the grid where some column are invisible when there is not enough space on the screen for them.
             * The visibility of the columns in this mode is driven by the column minWidth and priority settings.
             * The columns without priority setting are always visible and can't hide in small screen resolutions.
             * @type boolean
             * @default false
             * @example sample <!-- grid, grid.responsiveDesign -->
             * <p>Resize browser window in order to see his responsive behaviour.</p>
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         responsive: true,
             *         columns: [
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth', minWidth: 340, priority: 1 },
             *             { field: 'DateOfBirth', minWidth: 360, priority: 2, type: 'date' }
             *         ]
             *     });
             * </script>
             */
            responsive: false,

            /** Automatically adds hidden columns to the details section of the row.
             * This setting works only if the responsive setting is set to true and the detailTemplate is set.
             * You need to set priority and minWidth on the colums, that needs to be hidden in smaller screens.
             * @type boolean
             * @default false
             * @example Remote.Data.Source <!-- bootstrap, grid, grid.expandCollapseRows, grid.responsiveDesign -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         detailTemplate: '<div class="row"></div>',
             *         responsive: true,
             *         showHiddenColumnsAsDetails: true,
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', minWidth: 320, priority: 1 },
             *             { field: 'PlaceOfBirth', minWidth: 320, priority: 2 }
             *         ]
             *     });
             * </script>
             * @example Local.Data.Source <!-- bootstrap, grid, grid.expandCollapseRows, grid.responsiveDesign -->
             * <table id="grid"></table>
             * <script>             
             *     var data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
             *     ];
             *     $('#grid').grid({
             *         dataSource: data,
             *         detailTemplate: '<div class="row"></div>',
             *         responsive: true,
             *         showHiddenColumnsAsDetails: true,
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', minWidth: 320, priority: 1 },
             *             { field: 'PlaceOfBirth', minWidth: 320, priority: 2 }
             *         ],
             *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
             *     });
             * </script>
             */
            showHiddenColumnsAsDetails: false,

            defaultColumn: {
                /** The priority of the column compared to other columns in the grid.
                 * The columns are hiding based on the priorities.
                 * This setting is working only when the responsive setting is set to true.
                 * @alias column.priority
                 * @type number
                 * @default undefined
                 * @example sample <!-- grid, grid.responsiveDesign -->
                 * <table id="grid"></table>
                 * <script>
                 *     $('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         responsive: true,
                 *         columns: [
                 *             { field: 'Name' },
                 *             { field: 'PlaceOfBirth', priority: 1 },
                 *             { field: 'DateOfBirth', priority: 2, type: 'date' }
                 *         ]
                 *     });
                 * </script>
                 */
                priority: undefined,

                /** The minimum width of the column.
                 * The column is getting invisible when there is not enough space in the grid for this minimum width.
                 * This setting is working only when the responsive setting is set to true and the column priority setting is set.
                 * @alias column.minWidth
                 * @type number
                 * @default 250
                 * @example sample <!-- grid, grid.responsiveDesign -->
                 * <table id="grid"></table>
                 * <script>
                 *     $('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         responsive: true,
                 *         columns: [
                 *             { field: 'Name' },
                 *             { field: 'PlaceOfBirth', minWidth: 240, priority: 1 },
                 *             { field: 'DateOfBirth', minWidth: 260, priority: 2, type: 'date' }
                 *         ]
                 *     });
                 * </script>
                 */
                minWidth: 250
            },
            style: {
                rowDetailItem: ''
            }
        },

        bootstrap: {
            style: {
                rowDetailItem: 'col-lg-4'
            }
        }
    },

    'private': {

        orderColumns: function (config) {
            var result = [];
            if (config.columns && config.columns.length) {
                for (i = 0; i < config.columns.length; i++) {
                    result.push({
                        position: i,
                        field: config.columns[i].field,
                        minWidth: config.columns[i].width || config.columns[i].minWidth || config.defaultColumn.minWidth,
                        priority: config.columns[i].priority || 0
                    });
                }
                result.sort(function (a, b) {
                    var result = 0;
                    if (a.priority < b.priority) {
                        result = -1;
                    } else if (a.priority > b.priority) {
                        result = 1;
                    }
                    return result;
                });
            }
            return result;
        },
        
        updateDetails: function ($grid) {      
            var rows, data, i, j, $row, details, $placeholder, column, tmp;
            rows = $grid.find('tbody > tr[data-role="row"]');
            data = $grid.data();
            for (i = 0; i < rows.length; i++) {
                $row = $(rows[i]);
                details = $row.data('details');
                for (j = 0; j < data.columns.length; j++) {
                    column = data.columns[j];
                    $placeholder = details && details.find('div[data-id="' + column.field + '"]');
                    if (data.columns[j].hidden) {
                        tmp = '<b>' + (column.title || column.field) + '</b>: {' + column.field + '}';
                        if (!$placeholder || !$placeholder.length) {
                            $placeholder = $('<div data-id="' + column.field + '"/>').html(tmp);
                            $placeholder.addClass(data.style.rowDetailItem);
                            if (!details || !details.length) {
                                details = $('<div class="row"/>');
                            }
                            details.append($placeholder);
                        } else {
                            $placeholder.empty().html(tmp);
                        }
                    } else if ($placeholder && $placeholder.length) {
                        $placeholder.remove();
                    }
                }
                $grid.updateDetails($row);
            }
        }
    },

    'public': {

        oldWidth: undefined,

        resizeCheckIntervalId: undefined,

        /**
         * Make the grid responsive based on the available space.
         * Show column if the space for the grid is expanding and hide columns when the space for the grid is decreasing.
         * @method
         * @return grid object
         * @example sample <!-- grid -->
         * <button onclick="grid.makeResponsive()" class="gj-button-md">Make Responsive</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         responsive: false,
         *         columns: [
         *             { field: 'ID', width: 56 },
         *             { field: 'Name', minWidth: 320, priority: 1 },
         *             { field: 'PlaceOfBirth', minWidth: 320, priority: 2 }
         *         ]
         *     });
         * </script>
         */
        makeResponsive: function () {
            var i, $column,
                extraWidth = 0,
                config = this.data(),
                columns = gj.grid.plugins.responsiveDesign.private.orderColumns(config);
            //calculate extra width
            for (i = 0; i < columns.length; i++) {
                $column = this.find('thead>tr>th:eq(' + columns[i].position + ')');
                if ($column.is(':visible') && columns[i].minWidth < $column.width()) {
                    extraWidth += $column.width() - columns[i].minWidth;
                }
            }
            //show columns
            if (extraWidth) {
                for (i = 0; i < columns.length; i++) {
                    $column = this.find('thead>tr>th:eq(' + columns[i].position + ')');
                    if (!$column.is(':visible') && columns[i].minWidth <= extraWidth) {
                        this.showColumn(columns[i].field);
                        extraWidth -= $column.width();
                    }
                }
            }
            //hide columns
            for (i = (columns.length - 1); i >= 0; i--) {
                $column = this.find('thead>tr>th:eq(' + columns[i].position + ')');
                if ($column.is(':visible') && columns[i].priority && columns[i].minWidth > $column.outerWidth()) {
                    this.hideColumn(columns[i].field);
                }
            }

            return this;
        },
    },

    'events': {
        /**
         * Event fires when the grid width is changed. The "responsive" configuration setting should be set to true in order this event to fire.
         *
         * @event resize
         * @param {object} e - event data
         * @param {number} newWidth - The new width
         * @param {number} oldWidth - The old width
         * @example sample <!-- grid, grid.responsiveDesign -->
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         responsive: true,
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         *     grid.on('resize', function (e, newWidth, oldWidth) {
         *         alert('resize is fired.');
         *     });
         * </script>
         */
        resize: function ($grid, newWidth, oldWidth) {
            $grid.triggerHandler('resize', [newWidth, oldWidth]);
        }
    },

    'configure': function ($grid, fullConfig, clientConfig) {
        $.extend(true, $grid, gj.grid.plugins.responsiveDesign.public);
        if (fullConfig.responsive) {
            $grid.on('initialized', function () {
                $grid.makeResponsive();
                $grid.oldWidth = $grid.width();
                $grid.resizeCheckIntervalId = setInterval(function () {
                    var newWidth = $grid.width();
                    if (newWidth !== $grid.oldWidth) {
                        gj.grid.plugins.responsiveDesign.events.resize($grid, newWidth, $grid.oldWidth);
                    }
                    $grid.oldWidth = newWidth;
                }, fullConfig.resizeCheckInterval);
            });
            $grid.on('destroy', function () {
                if ($grid.resizeCheckIntervalId) {
                    clearInterval($grid.resizeCheckIntervalId);
                }
            });
            $grid.on('resize', function () {
                $grid.makeResponsive();
            });
        }
        if (fullConfig.showHiddenColumnsAsDetails && gj.grid.plugins.expandCollapseRows) {
            $grid.on('dataBound', function () {
                gj.grid.plugins.responsiveDesign.private.updateDetails($grid);
            });
            $grid.on('columnHide', function () {
                gj.grid.plugins.responsiveDesign.private.updateDetails($grid);
            });
            $grid.on('columnShow', function () {
                gj.grid.plugins.responsiveDesign.private.updateDetails($grid);
            });
            $grid.on('rowDataBound', function () {
                gj.grid.plugins.responsiveDesign.private.updateDetails($grid);
            });
        }
    }
};

/** 
 * @widget Grid 
 * @plugin Toolbar
 */
gj.grid.plugins.toolbar = {
    config: {
        base: {
            /** Template for the content in the toolbar. Appears in a separate row on top of the grid.
              * @type string
              * @default undefined
              * @example sample <!-- bootstrap, grid, grid.toolbar, grid.pagination -->
              * <table id="grid"></table>
              * <script>
              *     var grid = $('#grid').grid({
              *         dataSource: '/Players/Get',
              *         uiLibrary: 'bootstrap',
              *         toolbarTemplate: '<div class="row"><div class="col-xs-8" style="line-height:34px"><span data-role="title">Grid Title</span></div><div class="col-xs-4 text-right"><button onclick="grid.reload()" class="btn btn-default">click here to refresh</button></div></div>',
              *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
              *         pager: { limit: 5 }
              *     });
              * </script>
              */
            toolbarTemplate: undefined,

            /** The title of the grid. Appears in a separate row on top of the grid.
              * @type string
              * @default undefined
              * @example Material.Design <!-- grid, grid.toolbar -->
              * <table id="grid"></table>
              * <script>
              *     $('#grid').grid({
              *         dataSource: '/Players/Get',
              *         title: 'Players',
              *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
              *     });
              * </script>
              * @example Bootstrap.3 <!-- bootstrap, grid, grid.toolbar -->
              * <table id="grid"></table>
              * <script>
              *     $('#grid').grid({
              *         dataSource: '/Players/Get',
              *         uiLibrary: 'bootstrap',
              *         title: 'Players',
              *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
              *     });
              * </script>
              * @example Bootstrap.4 <!-- bootstrap4, grid, grid.toolbar -->
              * <table id="grid"></table>
              * <script>
              *     $('#grid').grid({
              *         dataSource: '/Players/Get',
              *         uiLibrary: 'bootstrap4',
              *         title: 'Players',
              *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
              *     });
              * </script>
              */
            title: undefined,

            style: {
                toolbar: 'gj-grid-md-toolbar'
            }
        },

        bootstrap: {
            style: {
                toolbar: 'gj-grid-bootstrap-toolbar'
            }
        },

        bootstrap4: {
            style: {
                toolbar: 'gj-grid-bootstrap-4-toolbar'
            }
        }
    },

    private: {
        init: function ($grid) {
            var data, $toolbar, $title;
            data = $grid.data();
            $toolbar = $grid.prev('div[data-role="toolbar"]');
            if (typeof (data.toolbarTemplate) !== 'undefined' || typeof (data.title) !== 'undefined' || $toolbar.length > 0) {
                if ($toolbar.length === 0) {
                    $toolbar = $('<div data-role="toolbar"></div>');
                    $grid.before($toolbar);
                }
                $toolbar.addClass(data.style.toolbar);

                if ($toolbar.children().length === 0 && data.toolbarTemplate) {
                    $toolbar.append(data.toolbarTemplate);
                }

                $title = $toolbar.find('[data-role="title"]');
                if ($title.length === 0) {
                    $title = $('<div data-role="title"/>');
                    $toolbar.prepend($title);
                }
                if (data.title) {
                    $title.text(data.title);
                }

                if (data.minWidth) {
                    $toolbar.css('min-width', data.minWidth);
                }
            }
        }
    },

    public: {        
        /**
         * Get or set grid title.
         * @additionalinfo When you pass value in the text parameter this value with be in use for the new title of the grid and the method will return grid object.<br/>
         * When you don't pass value in the text parameter, then the method will return the text of the current grid title.<br/>
         * You can use this method in a combination with toolbarTemplate only if the title is wrapped in element with data-role attribute that equals to "title".<br/>
         * @method
         * @param {object} text - The text of the new grid title.
         * @return string or grid object
         * @example text <!-- grid, grid.toolbar -->
         * <button onclick="grid.title('New Title')" class="gj-button-md">Set New Title</button>
         * <button onclick="alert(grid.title())" class="gj-button-md">Get Title</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         title: 'Initial Grid Title',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example html.template <!-- grid, grid.toolbar -->
         * <button onclick="grid.title('New Title')" class="gj-button-md">Set New Title</button>
         * <button onclick="alert(grid.title())" class="gj-button-md">Get Title</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         toolbarTemplate: '<div data-role="title">Initial Grid Title</div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        title: function (text) {
            var $titleEl = this.parent().find('div[data-role="toolbar"] [data-role="title"]');
            if (typeof (text) !== 'undefined') {
                $titleEl.text(text);
                return this;
            } else {
                return $titleEl.text();
            }
        }
    },

    configure: function ($grid) {
        $.extend(true, $grid, gj.grid.plugins.toolbar.public);
        $grid.on('initialized', function () {
            gj.grid.plugins.toolbar.private.init($grid);
        });
        $grid.on('destroying', function () {
            $grid.prev('[data-role="toolbar"]').remove();
        });
    }
};

/** 
 * @widget Grid 
 * @plugin Resizable Columns
 */
gj.grid.plugins.resizableColumns = {
    config: {
        base: {
            /** If set to true, users can resize columns by dragging the edges (resize handles) of their header cells.
             * @type boolean
             * @default false
             * @example Material.Design <!-- grid, draggable -->
             * <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap <!-- bootstrap, grid, draggable -->
             * <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         uiLibrary: 'bootstrap',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, draggable -->
             * <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         uiLibrary: 'bootstrap4',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.4.FixedHeader <!-- bootstrap4, grid, draggable -->
             * <table id="grid" width="900"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         fixedHeader: true,
             *         uiLibrary: 'bootstrap4',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            resizableColumns: false
        }
    },

    private: {
        init: function ($grid, config) {
            var $columns, $column, i, $wrapper, $resizer, marginRight;
            $columns = $grid.find('thead tr[data-role="caption"] th');
            if ($columns.length) {
                for (i = 0; i < $columns.length - 1; i++) {
                    $column = $($columns[i]);
                    $wrapper = $('<div class="gj-grid-column-resizer-wrapper" />');
                    marginRight = parseInt($column.css('padding-right'), 10) + 3;
                    $resizer = $('<span class="gj-grid-column-resizer" />').css('margin-right', '-' + marginRight + 'px');
                    $resizer.draggable({
                        start: function () {
                            $grid.addClass('gj-unselectable');
                            $grid.addClass('gj-grid-resize-cursor');
                        },
                        stop: function () {
                            $grid.removeClass('gj-unselectable');
                            $grid.removeClass('gj-grid-resize-cursor');
                            this.style.removeProperty('top');
                            this.style.removeProperty('left');
                            this.style.removeProperty('position');
                        },
                        drag: gj.grid.plugins.resizableColumns.private.createResizeHandle($grid, $column, config.columns[i])
                    });
                    $column.append($wrapper.append($resizer));
                }
                for (i = 0; i < $columns.length; i++) {
                    $column = $($columns[i]);
                    if (!$column.attr('width')) {
                        $column.attr('width', $column.outerWidth());
                    }
                }
            }
        },

        createResizeHandle: function ($grid, $column, column) {
            var data = $grid.data();
            return function (e, newPosition) {
                var i, index, rows, cell, newWidth, nextWidth,
                    currentWidth = parseInt($column.attr('width'), 10),
                    position = gj.core.position(this),
                    offset = { top: newPosition.top - position.top, left: newPosition.left - position.left };
                if (!currentWidth) {
                    currentWidth = $column.outerWidth();
                }
                if (offset.left) {
                    newWidth = currentWidth + offset.left;
                    column.width = newWidth;
                    $column.attr('width', newWidth);
                    index = $column[0].cellIndex;
                    cell = $column[0].parentElement.children[index + 1];
                    nextWidth = parseInt($(cell).attr('width'), 10) - offset.left;
                    cell.setAttribute('width', nextWidth);
                    if (data.resizableColumns) {
                        rows = $grid[0].tBodies[0].children;
                        for (i = 0; i < rows.length; i++) {
                            rows[i].cells[index].setAttribute('width', newWidth);
                            cell = rows[i].cells[index + 1];
                            cell.setAttribute('width', nextWidth);
                        }
                    }
                }
            };
        }
    },

    public: {
    },

    configure: function ($grid, fullConfig, clientConfig) {
        $.extend(true, $grid, gj.grid.plugins.resizableColumns.public);
        if (fullConfig.resizableColumns && gj.draggable) {
            $grid.on('initialized', function () {
                gj.grid.plugins.resizableColumns.private.init($grid, fullConfig);
            });
        }
    }
};

/** 
 * @widget Grid 
 * @plugin Row Reorder
 */
gj.grid.plugins.rowReorder = {
    config: {
        base: {
            /** If set to true, enable row reordering with drag and drop.
             * @type boolean
             * @default false
             * @example Material.Design <!-- grid, grid.rowReorder, draggable, droppable -->
             * <p>Drag and Drop rows in order to reorder them.</p>
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.3 <!-- bootstrap, grid, grid.rowReorder, draggable, droppable -->
             * <p>Drag and Drop rows in order to reorder them.</p>
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         uiLibrary: 'bootstrap',
             *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, grid.rowReorder, draggable, droppable -->
             * <p>Drag and Drop rows in order to reorder them.</p>
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         uiLibrary: 'bootstrap4',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            rowReorder: false,

            /** If set, enable row reordering only when you try to drag cell from the configured column.
             * Accept only field names of columns.
             * @type string
             * @default undefined
             * @example sample <!-- grid, grid.rowReorder, draggable, droppable -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         rowReorderColumn: 'ID',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            rowReorderColumn: undefined,

            /** If set, update the value in the field for all records. Accept only field names of columns.
             * @type string
             * @default undefined
             * @example Visible.OrderNumber <!-- grid, grid.rowReorder, draggable, droppable -->
             * <table id="grid"></table>
             * <script>
             *     var data = [
             *         { 'ID': 1, 'OrderNumber': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'OrderNumber': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'OrderNumber': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
             *     ];
             *     $('#grid').grid({
             *         dataSource: data,
             *         rowReorder: true,
             *         orderNumberField: 'OrderNumber',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'OrderNumber', width:120 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Hidden.OrderNumber <!-- grid, grid.rowReorder, draggable, droppable -->
             * <button onclick="alert(JSON.stringify(grid.getAll()))" class="gj-button-md">Show Data</button><br/><br/>
             * <table id="grid"></table>
             * <script>
             *     var data = [
             *         { 'ID': 1, 'OrderNumber': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'OrderNumber': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'OrderNumber': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
             *     ],
             *     grid = $('#grid').grid({
             *         dataSource: data,
             *         rowReorder: true,
             *         orderNumberField: 'OrderNumber',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            orderNumberField: undefined,

            style: {
                targetRowIndicatorTop: 'gj-grid-row-reorder-indicator-top',
                targetRowIndicatorBottom: 'gj-grid-row-reorder-indicator-bottom'
            }
        }
    },

    private: {
        init: function ($grid) {
            var i, columnPosition, $row,
                $rows = $grid.find('tbody tr[data-role="row"]');
            if ($grid.data('rowReorderColumn')) {
                columnPosition = gj.grid.methods.getColumnPosition($grid.data('columns'), $grid.data('rowReorderColumn'));
            }
            for (i = 0; i < $rows.length; i++) {
                $row = $($rows[i]);
                if (typeof (columnPosition) !== 'undefined') {
                    $row.find('td:eq(' + columnPosition + ')').on('mousedown', gj.grid.plugins.rowReorder.private.createRowMouseDownHandler($grid, $row));
                } else {
                    $row.on('mousedown', gj.grid.plugins.rowReorder.private.createRowMouseDownHandler($grid, $row));
                }
            }
        },

        createRowMouseDownHandler: function ($grid, $trSource) {
            return function (e) {
                var $dragEl = $grid.clone(),
                    columns = $grid.data('columns'),
                    i, $cells;
                $grid.addClass('gj-unselectable');
                $('body').append($dragEl);
                $dragEl.attr('data-role', 'draggable-clone').css('cursor', 'move');
                $dragEl.children('thead').remove().children('tfoot').remove();
                $dragEl.find('tbody tr:not([data-position="' + $trSource.data('position') + '"])').remove();
                $cells = $dragEl.find('tbody tr td');
                for (i = 0; i < $cells.length; i++) {
                    if (columns[i].width) {
                        $cells[i].setAttribute('width', columns[i].width);
                    }
                }
                $dragEl.draggable({
                    stop: gj.grid.plugins.rowReorder.private.createDragStopHandler($grid, $trSource)
                });
                $dragEl.css({ 
                    position: 'absolute', top: $trSource.offset().top, left: $trSource.offset().left, width: $trSource.width(), zIndex: 1
                });
                if ($trSource.attr('data-droppable') === 'true') {
                    $trSource.droppable('destroy');
                }
                $trSource.siblings('tr[data-role="row"]').each(function () {
                    var $dropEl = $(this);
                    if ($dropEl.attr('data-droppable') === 'true') {
                        $dropEl.droppable('destroy');
                    }
                    $dropEl.droppable({
                        over: gj.grid.plugins.rowReorder.private.createDroppableOverHandler($trSource),
                        out: gj.grid.plugins.rowReorder.private.droppableOut
                    });
                });
                $dragEl.trigger('mousedown');
            };
        },

        createDragStopHandler: function ($grid, $trSource) {
            return function (e, mousePosition) {
                $('table[data-role="draggable-clone"]').draggable('destroy').remove();
                $grid.removeClass('gj-unselectable');
                $trSource.siblings('tr[data-role="row"]').each(function () {
                    var $trTarget = $(this),
                        targetPosition = $trTarget.data('position'),
                        sourcePosition = $trSource.data('position'),
                        data = $grid.data(),
                        $rows, $row, i, record, id;
                        
                    if ($trTarget.droppable('isOver', mousePosition)) {
                        if (targetPosition < sourcePosition) {
                            $trTarget.before($trSource);
                        } else {
                            $trTarget.after($trSource);
                        }
                        data.records.splice(targetPosition - 1, 0, data.records.splice(sourcePosition - 1, 1)[0]);
                        $rows = $trTarget.parent().find('tr[data-role="row"]');
                        for (i = 0; i < $rows.length; i++) {
                            $($rows[i]).attr('data-position', i + 1);
                        }
                        if (data.orderNumberField) {
                            for (i = 0; i < data.records.length; i++) {
                                data.records[i][data.orderNumberField] = i + 1;
                            }
                            for (i = 0; i < $rows.length; i++) {
                                $row = $($rows[i]);
                                id = gj.grid.methods.getId($row, data.primaryKey, $row.attr('data-position'));
                                record = gj.grid.methods.getByPosition($grid, $row.attr('data-position'));
                                $grid.setCellContent(id, data.orderNumberField, record[data.orderNumberField]);
                            }
                        }
                    }
                    $trTarget.removeClass('gj-grid-top-border');
                    $trTarget.removeClass('gj-grid-bottom-border');
                    $trTarget.droppable('destroy');
                });
            }
        },

        createDroppableOverHandler: function ($trSource) {
            return function (e) {
                var $trTarget = $(this),
                    targetPosition = $trTarget.data('position'),
                    sourcePosition = $trSource.data('position');
                if (targetPosition < sourcePosition) {
                    $trTarget.addClass('gj-grid-top-border');
                } else {
                    $trTarget.addClass('gj-grid-bottom-border');
                }
            };
        },

        droppableOut: function () {
            $(this).removeClass('gj-grid-top-border');
            $(this).removeClass('gj-grid-bottom-border');
        }
    },

    public: {
    },

    configure: function ($grid, fullConfig, clientConfig) {
        $.extend(true, $grid, gj.grid.plugins.rowReorder.public);
        if (fullConfig.rowReorder && gj.draggable && gj.droppable) {
            $grid.on('dataBound', function () {
                gj.grid.plugins.rowReorder.private.init($grid);
            });
        }
    }
};

/** 
 * @widget Grid 
 * @plugin Export
 */
gj.grid.plugins.export = {
    config: { base: {} },

    public: {
        /**
         * Get grid data in Comma Separated Values (CSV) format.
         * @method
         * @param {boolean} includeAllRecords - include records that are not visible when you are using local dataSource.
         * @return string
         * @example Local.Data <!-- grid, dropdown -->
         * <button onclick="alert(grid.getCSV(true))" class="gj-button-md">Get All</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var data, grid;
         *     data = [
         *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     grid = $('#grid').grid({
         *         dataSource: data,
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Remote.Data <!-- grid, dropdown -->
         * <button onclick="alert(grid.getCSV())" class="gj-button-md">Get CSV</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 5 }
         *     });
         * </script>
         */
        getCSV: function (includeAllRecords) {
            var i, j, line = '', str = '',
                columns = this.data().columns,
                records = this.getAll(includeAllRecords);

            if (records.length) {

                for (i = 0; i < columns.length; i++) {
                    if (gj.grid.plugins.export.public.isColumnApplicable(columns[i])) {
                        line += '"' + (columns[i].title || columns[i].field).replace(/<[^>]+>/g, ' ') + '",';
                    }
                }
                str += line.slice(0, line.length - 1) + '\r\n';

                for (i = 0; i < records.length; i++) {
                    line = '';

                    for (j = 0; j < columns.length; j++) {
                        if (gj.grid.plugins.export.public.isColumnApplicable(columns[j])) {
                            line += '"' + records[i][columns[j].field] + '",';
                        }
                    }                    
                    str += line.slice(0, line.length - 1) + '\r\n';
                }
            }

            return str;
        },

        /**
         * Download grid data in Comma Separated Values (CSV) format.
         * @method
         * @param {string} filename - name of the generated file.
         * @param {boolean} includeAllRecords - include records that are not visible when you are using local dataSource.
         * @return grid object
         * @example Local.Data <!-- grid, dropdown -->
         * <button onclick="grid.downloadCSV()" class="gj-button-md">Download Only First Page</button>
         * <button onclick="grid.downloadCSV('myfilename.csv', true)" class="gj-button-md">Download All Data</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var data, grid;
         *     data = [
         *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     grid = $('#grid').grid({
         *         dataSource: data,
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Remote.Data <!-- grid, dropdown -->
         * <button onclick="grid.downloadCSV('myfilename.csv')" class="gj-button-md">Download CSV</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/Players/Get',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 5 }
         *     });
         * </script>
         */
        downloadCSV: function (filename, includeAllRecords) {
            var link = document.createElement('a');
            document.body.appendChild(link);
            link.download = filename || 'griddata.csv'; 
            if (window.navigator.userAgent.indexOf("Edge") > -1) {
                link.href = URL.createObjectURL(new Blob([this.getCSV(includeAllRecords)], { type: 'text/csv;charset=utf-8;' }));
            } else {
                link.href = 'data:text/csv;charset=utf-8,' + escape(this.getCSV(includeAllRecords));
            }
            link.click();
            document.body.removeChild(link);
            return this;
        },

        isColumnApplicable: function (column) {
            return column.hidden !== true && !column.role;
        }
    },

    configure: function ($grid) {
        $.extend(true, $grid, gj.grid.plugins.export.public);
    }
};

/** 
 * @widget Grid 
 * @plugin Column Reorder
 */
gj.grid.plugins.columnReorder = {
    config: {
        base: {
            /** If set to true, enable column reordering with drag and drop.
             * @type boolean
             * @default false
             * @example Material.Design <!-- grid, draggable, droppable -->
             * <p>Drag and Drop column headers in order to reorder the columns.</p>
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         columnReorder: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap <!-- bootstrap, grid, draggable, droppable -->
             * <p>Drag and Drop column headers in order to reorder the columns.</p>
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         columnReorder: true,
             *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, draggable, droppable -->
             * <p>Drag and Drop column headers in order to reorder the columns.</p>
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap4',
             *         columnReorder: true,
             *         columns: [ { field: 'ID', width: 48 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth', sortable: true } ]
             *     });
             * </script>
             */
            columnReorder: false,

            dragReady: false,

            style: {
                targetRowIndicatorTop: 'gj-grid-row-reorder-indicator-top',
                targetRowIndicatorBottom: 'gj-grid-row-reorder-indicator-bottom'
            }
        }
    },

    private: {
        init: function ($grid) {
            var i, $cell,
                $cells = $grid.find('thead tr th');
            for (i = 0; i < $cells.length; i++) {
                $cell = $($cells[i]);
                $cell.on('mousedown', gj.grid.plugins.columnReorder.private.createMouseDownHandler($grid, $cell));
                $cell.on('mousemove', gj.grid.plugins.columnReorder.private.createMouseMoveHandler($grid, $cell));
                $cell.on('mouseup', gj.grid.plugins.columnReorder.private.createMouseUpHandler($grid, $cell));
            }
        },

        createMouseDownHandler: function ($grid) {
            return function (e) {
                $grid.timeout = setTimeout(function () {
                    $grid.data('dragReady', true);
                }, 100);
            }
        },

        createMouseUpHandler: function ($grid) {
            return function (e) {
                clearTimeout($grid.timeout);
                $grid.data('dragReady', false);
            }
        },

        createMouseMoveHandler: function ($grid, $thSource) {
            return function (e) {
                var $dragEl, srcIndex;
                if ($grid.data('dragReady')) {
                    $grid.data('dragReady', false);
                    $dragEl = $grid.clone();
                    srcIndex = $thSource.index();
                    $grid.addClass('gj-unselectable');
                    $('body').append($dragEl);
                    $dragEl.attr('data-role', 'draggable-clone').css('cursor', 'move');
                    $dragEl.find('thead tr th:eq(' + srcIndex + ')').siblings().remove();
                    $dragEl.find('tbody tr[data-role != "row"]').remove();
                    $dragEl.find('tbody tr td:nth-child(' + (srcIndex + 1) + ')').siblings().remove();
                    $dragEl.find('tfoot').remove();
                    $dragEl.draggable({
                        stop: gj.grid.plugins.columnReorder.private.createDragStopHandler($grid, $thSource)
                    });
                    $dragEl.css({
                        position: 'absolute', top: $thSource.offset().top, left: $thSource.offset().left, width: $thSource.width(), zIndex: 1
                    });
                    if ($thSource.attr('data-droppable') === 'true') {
                        $thSource.droppable('destroy');
                    }
                    $thSource.siblings('th').each(function () {
                        var $dropEl = $(this);
                        if ($dropEl.attr('data-droppable') === 'true') {
                            $dropEl.droppable('destroy');
                        }
                        $dropEl.droppable({
                            over: gj.grid.plugins.columnReorder.private.createDroppableOverHandler($grid, $thSource),
                            out: gj.grid.plugins.columnReorder.private.droppableOut
                        });
                    });
                    $dragEl.trigger('mousedown');
                }
            };
        },

        createDragStopHandler: function ($grid, $thSource) {
            return function (e, mousePosition) {
                $('table[data-role="draggable-clone"]').draggable('destroy').remove();
                $grid.removeClass('gj-unselectable');
                $thSource.siblings('th').each(function () {
                    var $thTarget = $(this),
                        data = $grid.data(),
                        targetPosition = gj.grid.methods.getColumnPosition(data.columns, $thTarget.data('field')),
                        sourcePosition = gj.grid.methods.getColumnPosition(data.columns, $thSource.data('field'));

                    $thTarget.removeClass('gj-grid-left-border').removeClass('gj-grid-right-border');
                    $thTarget.closest('table').find('tbody tr[data-role="row"] td:nth-child(' + ($thTarget.index() + 1) + ')').removeClass('gj-grid-left-border').removeClass('gj-grid-right-border');
                    if ($thTarget.droppable('isOver', mousePosition)) {
                        if (targetPosition < sourcePosition) {
                            $thTarget.before($thSource);
                        } else {
                            $thTarget.after($thSource);
                        }
                        gj.grid.plugins.columnReorder.private.moveRowCells($grid, sourcePosition, targetPosition);
                        data.columns.splice(targetPosition, 0, data.columns.splice(sourcePosition, 1)[0]);
                    }
                    $thTarget.droppable('destroy');
                });
            }
        },

        moveRowCells: function ($grid, sourcePosition, targetPosition) {
            var i, $row, $rows = $grid.find('tbody tr[data-role="row"]');
            for (i = 0; i < $rows.length; i++) {
                $row = $($rows[i]);
                if (targetPosition < sourcePosition) {
                    $row.find('td:eq(' + targetPosition + ')').before($row.find('td:eq(' + sourcePosition + ')'));
                } else {
                    $row.find('td:eq(' + targetPosition + ')').after($row.find('td:eq(' + sourcePosition + ')'));
                }                
            }
        },

        createDroppableOverHandler: function ($grid, $thSource) {
            return function (e) {
                var $thTarget = $(this),
                    data = $grid.data(),
                    targetPosition = gj.grid.methods.getColumnPosition(data.columns, $thTarget.data('field')),
                    sourcePosition = gj.grid.methods.getColumnPosition(data.columns, $thSource.data('field'));
                if (targetPosition < sourcePosition) {
                    $thTarget.addClass('gj-grid-left-border');
                    $grid.find('tbody tr[data-role="row"] td:nth-child(' + ($thTarget.index() + 1) + ')').addClass('gj-grid-left-border');
                } else {
                    $thTarget.addClass('gj-grid-right-border');
                    $grid.find('tbody tr[data-role="row"] td:nth-child(' + ($thTarget.index() + 1) + ')').addClass('gj-grid-right-border');
                }
            };
        },

        droppableOut: function () {
            var $thTarget = $(this);
            $thTarget.removeClass('gj-grid-left-border').removeClass('gj-grid-right-border');
            $thTarget.closest('table').find('tbody tr[data-role="row"] td:nth-child(' + ($thTarget.index() + 1) + ')').removeClass('gj-grid-left-border').removeClass('gj-grid-right-border');
        }
    },

    public: {
    },

    configure: function ($grid, fullConfig, clientConfig) {
        $.extend(true, $grid, gj.grid.plugins.columnReorder.public);
        if (fullConfig.columnReorder) {
            $grid.on('initialized', function () {
                gj.grid.plugins.columnReorder.private.init($grid);
            });
        }
    }
};

/**
 * @widget Grid
 * @plugin Header Filter
 */
gj.grid.plugins.headerFilter = {
    config: {
        base: {
            defaultColumnSettings: {
                /** Indicates if the column is sortable. If set to false the header filter is hidden.
                 * @alias column.filterable
                 * @type boolean
                 * @default true
                 * @example Material.Design <!-- grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     $('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         headerFilter: true,
                 *         columns: [
                 *             { field: 'ID', width: 56, filterable: false },
                 *             { field: 'Name', filterable: true },
                 *             { field: 'PlaceOfBirth' }
                 *         ]
                 *     });
                 * </script>
                 * @example Bootstrap.3 <!-- bootstrap, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     $('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         headerFilter: true,
                 *         uiLibrary: 'bootstrap',
                 *         columns: [
                 *             { field: 'ID', width: 56, filterable: false },
                 *             { field: 'Name', filterable: true },
                 *             { field: 'PlaceOfBirth' }
                 *         ]
                 *     });
                 * </script>
                 */
                filterable: true
            },

            /** If set to true, add filters for each column
             * @type boolean
             * @default object
             * @example Remote.DataSource <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         headerFilter: true,
             *         columns: [ { field: 'ID', width: 56, filterable: false }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Local.DataSource <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     var data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     $('#grid').grid({
             *         dataSource: data,
             *         headerFilter: true,
             *         columns: [ 
             *             { field: 'ID', width: 56, filterable: false }, 
             *             { field: 'Name' }, 
             *             { field: 'PlaceOfBirth' } 
             *         ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             */
            headerFilter: {
                /** Type of the header filter
                 * @alias headerFilter.type
                 * @type (onenterkeypress|onchange)
                 * @default 'onenterkeypress'
                 * @example OnEnterKeyPress <!-- grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     $('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         headerFilter: {
                 *             type: 'onenterkeypress'
                 *         },
                 *         columns: [ { field: 'ID', width: 56, filterable: false }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
                 *     });
                 * </script>
                 * @example OnChange <!-- grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     $('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         headerFilter: {
                 *             type: 'onchange'
                 *         },
                 *         columns: [ { field: 'ID', width: 56, filterable: false }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
                 *     });
                 * </script>
                 */
                type: 'onenterkeypress'
            }
        }
    },

    private: {
        init: function ($grid) {
            var i, $th, $ctrl, data = $grid.data(),
                $filterTr = $('<tr data-role="filter"/>');

            for (i = 0; i < data.columns.length; i++) {
                $th = $('<th/>');
                if (data.columns[i].filterable) {
                    $ctrl = $('<input data-field="' + data.columns[i].field + '" class="gj-width-full" />');
                    if ('onchange' === data.headerFilter.type) {
                        $ctrl.on('input propertychange', function (e) {
                            gj.grid.plugins.headerFilter.private.reload($grid, $(this));
                        });
                    } else {
                        $ctrl.on('keypress', function (e) {
                            if (e.which == 13) {
                                gj.grid.plugins.headerFilter.private.reload($grid, $(this));
                            }
                        });
                        $ctrl.on('blur', function (e) {
                            gj.grid.plugins.headerFilter.private.reload($grid, $(this));
                        });
                    }
                    $th.append($ctrl);
                }
                if (data.columns[i].hidden) {
                    $th.hide();
                }
                $filterTr.append($th);
            }

            $grid.children('thead').append($filterTr);
        },

        reload: function ($grid, $ctrl) {
            var params = {};
            params[$ctrl.data('field')] = $ctrl.val();
            $grid.reload(params);
        }
    },

    public: {
    },

    events: {
    },

    configure: function ($grid, fullConfig, clientConfig) {
        $.extend(true, $grid, gj.grid.plugins.headerFilter.public);
        var data = $grid.data();
        if (clientConfig.headerFilter) {
            $grid.on('initialized', function () {
                gj.grid.plugins.headerFilter.private.init($grid);
            });
        }
    }
};

/** 
 * @widget Grid 
 * @plugin Grouping
 */
gj.grid.plugins.grouping = {
    config: {
        base: {
            paramNames: {
                /** The name of the parameter that is going to send the name of the column for grouping.
                 * The grouping should be enabled in order this parameter to be in use.
                 * @alias paramNames.groupBy
                 * @type string
                 * @default "groupBy"
                 */
                groupBy: 'groupBy',

                /** The name of the parameter that is going to send the direction for grouping.
                 * The grouping should be enabled in order this parameter to be in use.
                 * @alias paramNames.groupByDirection
                 * @type string
                 * @default "groupByDirection"
                 */
                groupByDirection: 'groupByDirection'
            },

            grouping: {
                /** The name of the field that needs to be in use for grouping.
                  * @type string
                  * @alias grouping.groupBy
                  * @default undefined
                  * @example Local.Data <!-- grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     var grid, data = [
                  *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria', CountryName: 'Bulgaria' },
                  *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil', CountryName: 'Brazil' },
                  *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England', CountryName: 'England' },
                  *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany', CountryName: 'Germany' },
                  *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia', CountryName: 'Colombia' },
                  *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria', CountryName: 'Bulgaria' }
                  *     ];
                  *     $('#grid').grid({
                  *         dataSource: data,
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  * @example Remote.Data <!-- grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     $('#grid').grid({
                  *         dataSource: '/Players/Get',
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  * @example Bootstrap.3 <!-- bootstrap, grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     $('#grid').grid({
                  *         dataSource: '/Players/Get',
                  *         uiLibrary: 'bootstrap',
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'DateOfBirth', type: 'date' } ]
                  *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>'
                  *     });
                  * </script>
                  * @example Bootstrap.4 <!-- bootstrap4, fontawesome, grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     $('#grid').grid({
                  *         dataSource: '/Players/Get',
                  *         uiLibrary: 'bootstrap4',
                  *         iconsLibrary: 'fontawesome',
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  */
                groupBy: undefined,

                direction: 'asc'
            },

            icons: {
                /** Expand row icon definition.
                 * @alias icons.expandGroup
                 * @type String
                 * @default '<i class="gj-icon plus" />'
                 * @example Right.Down.Icons <!-- materialicons, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     $('#grid').grid({
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
                 *         grouping: { groupBy: 'CountryName' },
                 *         icons: {
                 *             expandGroup: '<i class="material-icons">keyboard_arrow_right</i>',
                 *             collapseGroup: '<i class="material-icons">keyboard_arrow_down</i>'
                 *         }
                 *     });
                 * </script>
                 */
                expandGroup: '<i class="gj-icon plus" />',

                /** Collapse row icon definition.
                 * @alias icons.collapseGroup
                 * @type String
                 * @default '<i class="gj-icon minus" />'
                 * @example Right.Down.Icons <!-- materialicons, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     $('#grid').grid({
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
                 *         grouping: { groupBy: 'CountryName' },
                 *         icons: {
                 *             expandGroup: '<i class="material-icons">keyboard_arrow_right</i>',
                 *             collapseGroup: '<i class="material-icons">keyboard_arrow_down</i>'
                 *         }
                 *     });
                 * </script>
                 */
                collapseGroup: '<i class="gj-icon minus" />'
            }
        },

        fontawesome: {
            icons: {
                expandGroup: '<i class="fa fa-plus" aria-hidden="true"></i>',
                collapseGroup: '<i class="fa fa-minus" aria-hidden="true"></i>'
            }
        },

        glyphicons: {
            icons: {
                expandGroup: '<span class="glyphicon glyphicon-plus" />',
                collapseGroup: '<span class="glyphicon glyphicon-minus" />'
            }
        }
    },

    private: {
        init: function ($grid) {
            var previousValue, data = $grid.data();

            previousValue = undefined;
            $grid.on('rowDataBound', function (e, $row, id, record) {
                if (previousValue !== record[data.grouping.groupBy] || $row[0].rowIndex === 1) {
                    var colspan = gj.grid.methods.countVisibleColumns($grid) - 1,
                        $groupRow = $('<tr role="group" />'),
                        $expandCollapseCell = $('<td class="gj-text-align-center gj-unselectable gj-cursor-pointer" />');

                    $expandCollapseCell.append('<div data-role="display">' + data.icons.collapseGroup + '</div>');
                    $expandCollapseCell.on('click', gj.grid.plugins.grouping.private.createExpandCollapseHandler(data));
                    $groupRow.append($expandCollapseCell);
                    $groupRow.append('<td colspan="' + colspan + '"><div data-role="display">' + data.grouping.groupBy + ': ' + record[data.grouping.groupBy] + '</div></td>');
                    $groupRow.insertBefore($row);
                    previousValue = record[data.grouping.groupBy];
                }
                $row.show();
            });

            data.params[data.paramNames.groupBy] = data.grouping.groupBy;
            data.params[data.paramNames.groupByDirection] = data.grouping.direction;
        },

        grouping: function ($grid, records) {
            var data = $grid.data();
            records.sort(gj.grid.methods.createDefaultSorter(data.grouping.direction, data.grouping.groupBy));
        },

        createExpandCollapseHandler: function (data) {
            return function (e) {
                var $cell = $(this),
                    methods = gj.grid.plugins.grouping.private;
                if ($cell.closest('tr').next(':visible').data('role') === 'row') {
                    methods.collapseGroup(data, $cell);
                } else {
                    methods.expandGroup(data, $cell);
                }
            };
        },

        collapseGroup: function (data, $cell) {
            var $display = $cell.children('div[data-role="display"]'),
                $groupRow = $cell.closest('tr');

            $groupRow.nextUntil('[role="group"]').hide();
            $display.empty().append(data.icons.expandGroup);
        },

        expandGroup: function (data, $cell) {
            var $display = $cell.children('div[data-role="display"]'),
                $groupRow = $cell.closest('tr');

            $groupRow.nextUntil('[role="group"]').show();
            $display.empty().append(data.icons.collapseGroup);
        }
    },

    public: { },

    configure: function ($grid) {
        var column, data = $grid.data();
        $.extend(true, $grid, gj.grid.plugins.grouping.public);
        if (data.grouping && data.grouping.groupBy) {
            column = {
                title: '',
                width: data.defaultIconColumnWidth,
                align: 'center',
                stopPropagation: true,
                cssClass: 'gj-cursor-pointer gj-unselectable'
            };
            data.columns = [column].concat(data.columns);

            $grid.on('initialized', function () {
                gj.grid.plugins.grouping.private.init($grid);
            });

            $grid.on('dataFiltered', function (e, records) {
                gj.grid.plugins.grouping.private.grouping($grid, records);
            });
        }
    }
};

gj.grid.messages['en-us'] = {
    First: 'First',
    Previous: 'Previous',
    Next: 'Next',
    Last: 'Last',
    Page: 'Page',
    FirstPageTooltip: 'First Page',
    PreviousPageTooltip: 'Previous Page',
    NextPageTooltip: 'Next Page',
    LastPageTooltip: 'Last Page',
    Refresh: 'Refresh',
    Of: 'of',
    DisplayingRecords: 'Displaying records',
    RowsPerPage: 'Rows per page:',
    Edit: 'Edit',
    Delete: 'Delete',
    Update: 'Update',
    Cancel: 'Cancel',
    NoRecordsFound: 'No records found.',
    Loading: 'Loading...'
};
/* global window alert jQuery gj */
/**
  * @widget Tree
  * @plugin Base
  */
gj.tree = {
    plugins: {}
};

gj.tree.config = {
    base: {

        params: {},

        /** When this setting is enabled the content of the tree will be loaded automatically after the creation of the tree.
         * @type boolean
         * @default true
         * @example disabled <!-- tree -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         autoLoad: false
         *     });
         *     tree.reload(); //call .reload() explicitly in order to load the data in the tree
         * </script>
         * @example enabled <!-- tree -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         autoLoad: true
         *     });
         * </script>
         */
        autoLoad: true,

        /** The type of the node selection.<br/>
         * If the type is set to multiple the user will be able to select more then one node in the tree.
         * @type (single|multiple)
         * @default single
         * @example Single.Selection <!-- tree -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         selectionType: 'single'
         *     });
         * </script>
         * @example Multiple.Selection <!-- tree -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         selectionType: 'multiple'
         *     });
         * </script>
         */
        selectionType: 'single',

        /** This setting enable cascade selection and unselection of children
         * @type boolean
         * @default false
         * @example Sample <!-- tree -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         cascadeSelection: true
         *     });
         * </script>
         */
        cascadeSelection: false,

        /** The data source of tree.
         * @additionalinfo If set to string, then the tree is going to use this string as a url for ajax requests to the server.<br />
         * If set to object, then the tree is going to use this object as settings for the <a href="http://api.jquery.com/jquery.ajax/" target="_new">jquery ajax</a> function.<br />
         * If set to array, then the tree is going to use the array as data for tree nodes.
         * @type (string|object|array)
         * @default undefined
         * @example Local.DataSource <!-- tree -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: [ { text: 'foo', children: [ { text: 'bar' } ] } ]
         *     });
         * </script>
         * @example Remote.DataSource <!-- tree -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: '/Locations/Get'
         *     });
         * </script>
         */
        dataSource: undefined,

        /** Primary key field name.
         * @type string
         * @default undefined
         * @example defined <!-- tree -->
         * <p>Select a node to see the key.</p>
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         primaryKey: 'id',
         *         dataSource: [ { id: 101, text: 'foo', children: [ { id: 202, text: 'bar' } ] } ],
         *         select: function (e, node, id) {
         *             alert('Your key is ' + id);
         *         }
         *     });
         * </script>
         * @example undefined <!-- tree -->
         * <p>Select a node to see the key.</p>
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: [ { id: 101, text: 'foo', children: [ { id: 202, text: 'bar' } ] } ],
         *         select: function (e, node, id) {
         *             alert('Your key is ' + id);
         *         }
         *     });
         * </script>
         */
        primaryKey: undefined,

        /** Text field name.
         * @type string
         * @default 'text'
         * @example sample <!-- tree -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         textField: 'newTextName',
         *         dataSource: [ { newTextName: 'foo', children: [ { newTextName: 'bar' } ] } ]
         *     });
         * </script>
         */
        textField: 'text',

        /** Children field name.
         * @type string
         * @default 'children'
         * @example Custom.FieldName <!-- tree -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         childrenField: 'myChildrenNode',
         *         dataSource: [ { text: 'foo', myChildrenNode: [ { text: 'bar' } ] } ]
         *     });
         * </script>
         */
        childrenField: 'children',

        /** The name of the field that indicates if the node has children. Shows expand icon if the node has children.
         * @type string
         * @default 'hasChildren'
         * @example Custom.FieldName <!-- tree -->
         * <div id="tree"></div>
         * <script>
         *     var continents, countries, states, tree;
         *     continents = [
         *         { id: 1, anyChildren: true, text: 'Asia', type: 'continent' },
         *         { id: 2, anyChildren: true, text: 'North America', type: 'continent' },
         *         { id: 3, anyChildren: false, text: 'South America', type: 'continent' }
         *     ];
         *     countries = [
         *         { id: 1, anyChildren: false, continent: 'Asia', text: 'China', type: 'country' },
         *         { id: 2, anyChildren: false, continent: 'Asia', text: 'Japan', type: 'country' },
         *         { id: 3, anyChildren: true, continent: 'North America', text: 'USA', type: 'country' },
         *         { id: 4, anyChildren: false, continent: 'North America', text: 'Canada', type: 'country' }
         *     ];
         *     states = [
         *         { id: 1, country: 'USA', text: 'California', type: 'state' },
         *         { id: 2, country: 'USA', text: 'Florida', type: 'state' }
         *     ];
         *     tree = $('#tree').tree({
         *         hasChildrenField: 'anyChildren',
         *         dataSource: continents
         *     });
         *     tree.on('expand', function (e, $node, id) {
         *         var i, children, record = tree.getDataById(id);
         *         if (tree.getChildren($node).length === 0) {
         *             if (record.type === 'continent') {
         *                 children = $.grep(countries, function (i) { return i.continent === record.text; });
         *                 for (i = 0; i < children.length; i++) {
         *                     tree.addNode(children[i], $node);
         *                 }
         *             } else if (record.type === 'country') {
         *                 children = $.grep(states, function (i) { return i.country === record.text; });
         *                 for (i = 0; i < children.length; i++) {
         *                     tree.addNode(children[i], $node);
         *                 }
         *             }
         *         }
         *     });
         * </script>
         */
        hasChildrenField: 'hasChildren',

        /** Image css class field name.
         * @type string
         * @default 'imageCssClass'
         * @example Default.Name <!-- bootstrap, tree -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         uiLibrary: 'bootstrap',
         *         dataSource: [ { text: 'folder', imageCssClass: 'glyphicon glyphicon-folder-close', children: [ { text: 'file', imageCssClass: 'glyphicon glyphicon-file' } ] } ]
         *     });
         * </script>
         * @example Custom.Name <!-- tree  -->
         * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         imageCssClassField: 'faCssClass',
         *         dataSource: [ { text: 'folder', faCssClass: 'fa fa-folder', children: [ { text: 'file', faCssClass: 'fa fa-file' } ] } ]
         *     });
         * </script>
         */
        imageCssClassField: 'imageCssClass',

        /** Image url field name.
         * @type string
         * @default 'imageUrl'
         * @example Default.HTML.Field.Name <!-- tree -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: [ { text: 'World', imageUrl: 'http://gijgo.com/content/icons/world-icon.png', children: [ { text: 'USA', imageUrl: 'http://gijgo.com/content/icons/usa-oval-icon.png' } ] } ]
         *     });
         * </script>
         * @example Custom.HTML.Field.Name <!-- tree -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         imageUrlField: 'icon',
         *         dataSource: [ { text: 'World', icon: 'http://gijgo.com/content/icons/world-icon.png', children: [ { text: 'USA', icon: 'http://gijgo.com/content/icons/usa-oval-icon.png' } ] } ]
         *     });
         * </script>
         */
        imageUrlField: 'imageUrl',

        /** Image html field name.
         * @type string
         * @default 'imageHtml'
         * @example Default.HTML.Field.Name <!-- materialicons, tree -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: [ { text: 'folder', imageHtml: '<i class="material-icons">folder</i>', children: [ { text: 'file', imageHtml: '<i class="material-icons">insert_drive_file</i>' } ] } ]
         *     });
         * </script>
         * @example Custom.HTML.Field.Name <!-- materialicons, tree -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         imageHtmlField: 'icon',
         *         dataSource: [ { text: 'folder', icon: '<i class="material-icons">folder</i>', children: [ { text: 'file', icon: '<i class="material-icons">insert_drive_file</i>' } ] } ]
         *     });
         * </script>
         */
        imageHtmlField: 'imageHtml',

        /** Disabled field name. Assume that the item is not disabled if not set.
         * @type string
         * @default 'disabled'
         * @example Default.Value <!-- checkbox, tree -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         checkboxes: true,
         *         dataSource: [ { text: 'foo', children: [
         *                 { text: 'bar', disabled: true, children: [ { text: 'sub-bar' } ] },
         *                 { text: 'bar2', disabled: false }
         *             ] }
         *         ]
         *     });
         * </script>
         * @example Custom.Value <!-- checkbox, tree -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         checkboxes: true,
         *         disabledField: 'disabledState',
         *         dataSource: [ { text: 'foo', children: [
         *                 { text: 'bar', disabledState: true, children: [ { text: 'sub-bar' } ] },
         *                 { text: 'bar2', disabledState: false }
         *             ] }
         *         ]
         *     });
         * </script>
         * @example Bootstrap <!-- bootstrap, checkbox, tree -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         uiLibrary: 'bootstrap',
         *         checkboxes: true,
         *         dataSource: [ { text: 'foo', children: [
         *                 { text: 'bar', disabled: true, children: [ { text: 'sub-bar' } ] },
         *                 { text: 'bar2', disabled: false }
         *             ] }
         *         ]
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, checkbox, tree -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         uiLibrary: 'bootstrap4',
         *         checkboxes: true,
         *         dataSource: [ { text: 'foo', children: [
         *                 { text: 'bar', disabled: true, children: [ { text: 'sub-bar' } ] },
         *                 { text: 'bar2', disabled: false }
         *             ] }
         *         ]
         *     });
         * </script>
         */
        disabledField: 'disabled',

        /** Width of the tree.
         * @type number
         * @default undefined
         * @example JS.Config <!-- bootstrap, tree -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap',
         *         border: true
         *     });
         * </script>
         * @example HTML.Config <!-- bootstrap, tree -->
         * <div id="tree" width="500" data-source="/Locations/Get" data-ui-library="bootstrap" data-border="true"></div>
         * <script>
         *     $('#tree').tree();
         * </script>
         */
        width: undefined,

        /** When this setting is enabled the content of the tree will be wrapped by borders.
         * @type boolean
         * @default false
         * @example Material.Design.True <!-- checkbox, tree -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         border: true,
         *         checkboxes: true
         *     });
         * </script>
         * @example Material.Design.False <!-- tree -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         border: false
         *     });
         * </script>
         * @example Bootstrap.3.True <!-- bootstrap, tree -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap',
         *         border: true
         *     });
         * </script>
         * @example Bootstrap.3.False <!-- bootstrap, tree -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap',
         *         border: false
         *     });
         * </script>
         * @example Bootstrap.4.True <!-- bootstrap4, tree -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap4',
         *         border: true
         *     });
         * </script>
         * @example Bootstrap.4.False <!-- bootstrap4, tree -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap4',
         *         border: false
         *     });
         * </script>
         */
        border: false,

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- tree, checkbox -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'materialdesign',
         *         checkboxes: true
         *     });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, tree, checkbox -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap',
         *         checkboxes: true
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, tree, checkbox -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap4',
         *         checkboxes: true
         *     });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.
         * @additionalinfo If you use Bootstrap 3 as uiLibrary, then the iconsLibrary is set to Glyphicons by default.<br/>
         * If you use Material Design as uiLibrary, then the iconsLibrary is set to Material Icons by default.<br/>
         * The css files for Material Icons, Font Awesome or Glyphicons should be manually included to the page where the grid is in use.
         * @type (materialicons|fontawesome|glyphicons)
         * @default 'materialicons'
         * @example Base.Theme.Material.Icons <!-- tree -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         iconsLibrary: 'materialicons'
         *     });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, tree, checkbox -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome',
         *         checkboxes: true
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        autoGenId: 1,

        autoGenFieldName: 'autoId_b5497cc5-7ef3-49f5-a7dc-4a932e1aee4a',

        indentation: 24,

        style: {
            wrapper: 'gj-unselectable',
            list: 'gj-list gj-list-md',
            item: undefined,
            active: 'gj-list-md-active',
            leafIcon: undefined,
            border: 'gj-tree-md-border'
        },

        icons: {
            /** Expand icon definition.
             * @alias icons.expand
             * @type String
             * @default '<i class="gj-icon chevron-right" />'
             * @example Plus.Minus.Icons <!-- materialicons, tree -->
             * <div id="tree"></div>
             * <script>
             *     var tree = $('#tree').tree({
             *         dataSource: '/Locations/Get',
             *         icons: { 
             *             expand: '<i class="material-icons">add</i>',
             *             collapse: '<i class="material-icons">remove</i>'
             *         }
             *     });
             * </script>
             */
            expand: '<i class="gj-icon chevron-right" />',

            /** Collapse icon definition.
             * @alias icons.collapse
             * @type String
             * @default '<i class="gj-icon chevron-down" />'
             * @example Plus.Minus.Icons <!-- materialicons, tree -->
             * <div id="tree"></div>
             * <script>
             *     var tree = $('#tree').tree({
             *         dataSource: '/Locations/Get',
             *         icons: { 
             *             expand: '<i class="material-icons">add</i>',
             *             collapse: '<i class="material-icons">remove</i>'
             *         }
             *     });
             * </script>
             */
            collapse: '<i class="gj-icon chevron-down" />'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-unselectable gj-tree-bootstrap-3',
            list: 'gj-list gj-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active',
            border: 'gj-tree-bootstrap-border'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-unselectable gj-tree-bootstrap-4',
            list: 'gj-list gj-list-bootstrap',
            item: 'list-group-item',
            active: 'active',
            border: 'gj-tree-bootstrap-border'
        },
        icons: {
            expand: '<i class="gj-icon plus" />',
            collapse: '<i class="gj-icon minus" />'
        }
    },

    materialicons: {
        style: {
            expander: 'gj-tree-material-icons-expander'
        }
    },

    fontawesome: {
        style: {
            expander: 'gj-tree-font-awesome-expander'
        },
        icons: {
            expand: '<i class="fa fa-plus" aria-hidden="true"></i>',
            collapse: '<i class="fa fa-minus" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        style: {
            expander: 'gj-tree-glyphicons-expander'
        },
        icons: {
            expand: '<span class="glyphicon glyphicon-plus" />',
            collapse: '<span class="glyphicon glyphicon-minus" />'
        }
    }
};
/**
  * @widget Tree
  * @plugin Base
  */
gj.tree.events = {

    /**
     * Event fires when the tree is initialized
     * @event initialized
     * @param {object} e - event data
     * @example Event.Sample <!-- tree -->
     * <button id="reload" class="gj-button-md">Reload</button>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get',
     *         initialized: function (e) {
     *             alert('initialized is fired.');
     *         }
     *     });
     *     $('#reload').on('click', function() { 
     *         tree.reload(); 
     *     });
     * </script>
     */
    initialized: function ($tree) {
        $tree.triggerHandler('initialized');
    },

    /**
     * Event fired before data binding takes place.
     * @event dataBinding
     * @param {object} e - event data
     * @example Event.Sample <!-- tree -->
     * <div id="tree"></div>
     * <script>
     *     $('#tree').tree({
     *         dataSource: '/Locations/Get',
     *         dataBinding: function (e) {
     *             alert('dataBinding is fired.');
     *         }
     *     });
     * </script>
     */
    dataBinding: function ($tree) {
        $tree.triggerHandler('dataBinding');
    },

    /**
     * Event fires after the loading of the data in the tree.
     * @event dataBound
     * @param {object} e - event data
     * @example Event.Sample <!-- tree -->
     * <div id="tree"></div>
     * <script>
     *     $('#tree').tree({
     *         dataSource: '/Locations/Get',
     *         dataBound: function (e) {
     *             alert('dataBound is fired.');
     *         }
     *     });
     * </script>
     */
    dataBound: function ($tree) {
        $tree.triggerHandler('dataBound');
    },

    /**
     * Event fires after selection of tree node.
     * @event select
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <p>Select tree node in order to fire the event.</p>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('select', function (e, node, id) {
     *         alert('select is fired for node with id=' + id);
     *     });
     * </script>
     */
    select: function ($tree, $node, id) {
        return $tree.triggerHandler('select', [$node, id]);
    },

    /**
     * Event fires on un selection of tree node
     * @event unselect
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <p>Select/Unselect tree node in order to fire the event.</p>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('unselect', function (e, node, id) {
     *         alert('unselect is fired for node with id=' + id);
     *     });
     * </script>
     */
    unselect: function ($tree, $node, id) {
        return $tree.triggerHandler('unselect', [$node, id]);
    },

    /**
     * Event fires before node expand.
     * @event expand
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('expand', function (e, node, id) {
     *         alert('expand is fired.');
     *     });
     * </script>
     */
    expand: function ($tree, $node, id) {
        return $tree.triggerHandler('expand', [$node, id]);
    },

    /**
     * Event fires before node collapse.
     * @event collapse
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('collapse', function (e, node, id) {
     *         alert('collapse is fired.');
     *     });
     * </script>
     */
    collapse: function ($tree, $node, id) {
        return $tree.triggerHandler('collapse', [$node, id]);
    },

    /**
     * Event fires on enable of tree node.
     * @event enable
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @example Event.Sample <!-- tree -->
     * <button onclick="tree.enable(northAmerica, false)" class="gj-button-md">Enable North America</button>
     * <button onclick="tree.disable(northAmerica, false)" class="gj-button-md">Disable North America</button>
     * <br/><br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree, northAmerica;
     *     tree = $('#tree').tree({
     *         primaryKey: 'ID',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     *     tree.on('enable', function (e, node) {
     *         alert(node.text() + ' is enabled.');
     *     });
     * </script>
     */
    enable: function ($tree, $node) {
        return $tree.triggerHandler('enable', [$node]);
    },

    /**
     * Event fires on disable of tree node.
     * @event disable
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @example Event.Sample <!-- tree -->
     * <button onclick="tree.enable(northAmerica, false)" class="gj-button-md">Enable North America</button>
     * <button onclick="tree.disable(northAmerica, false)" class="gj-button-md">Disable North America</button>
     * <br/><br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree, northAmerica;
     *     tree = $('#tree').tree({
     *         primaryKey: 'ID',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     *     tree.on('disable', function (e, node) {
     *         alert(node.text() + ' is disabled.');
     *     });
     * </script>
     */
    disable: function ($tree, $node) {
        return $tree.triggerHandler('disable', [$node]);
    },

    /**
     * Event fires before tree destroy
     * @event destroying
     * @param {object} e - event data
     * @example Event.Sample <!-- tree -->
     * <button onclick="tree.destroy()" class="gj-button-md">Destroy</button>
     * <br/><br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('destroying', function (e) {
     *         alert('destroying is fired.');
     *     });
     * </script>
     */
    destroying: function ($tree) {
        return $tree.triggerHandler('destroying');
    },

    /**
     * Event fires when the data is bound to node.
     * @event nodeDataBound
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @param {string} id - the id of the record
     * @param {object} record - the data of the node record
     * @example Event.Sample <!-- tree -->
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('nodeDataBound', function (e, node, id, record) {
     *         if ((parseInt(id, 10) % 2) === 0) {
     *             node.css('background-color', 'red');
     *         }
     *     });
     * </script>
     */
    nodeDataBound: function ($tree, $node, id, record) {
        return $tree.triggerHandler('nodeDataBound', [$node, id, record]);
    }
}
/*global gj $*/
gj.tree.methods = {

    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'tree');

        gj.tree.methods.initialize.call(this);

        if (this.data('autoLoad')) {
            this.reload();
        }
        return this;
    },

    initialize: function () {
        var data = this.data(),
            $root = $('<ul class="' + data.style.list + '"/>');
        this.empty().addClass(data.style.wrapper).append($root);
        if (data.width) {
            this.width(data.width);
        }
        if (data.border) {
            this.addClass(data.style.border);
        }
        gj.tree.events.initialized(this);
    },

    useHtmlDataSource: function ($tree, data) {
        data.dataSource = [];
    },

    render: function ($tree, response) {
        var data;
        if (response) {
            if (typeof (response) === 'string' && JSON) {
                response = JSON.parse(response);
            }
            data = $tree.data();
            data.records = response;
            if (!data.primaryKey) {
                gj.tree.methods.genAutoId(data, data.records);
            }
            gj.tree.methods.loadData($tree);
        }
        return $tree;
    },

    filter: function ($tree) {
        return $tree.data().dataSource;
    },

    genAutoId: function (data, records) {
        var i;
        for (i = 0; i < records.length; i++) {
            records[i][data.autoGenFieldName] = data.autoGenId++;
            if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                gj.tree.methods.genAutoId(data, records[i][data.childrenField]);
            }
        }
    },

    loadData: function ($tree) {
        var i,
            records = $tree.data('records'),
            $root = $tree.children('ul');

        gj.tree.events.dataBinding($tree);
        $root.off().empty();
        for (i = 0; i < records.length; i++) {
            gj.tree.methods.appendNode($tree, $root, records[i], 1);
        }
        gj.tree.events.dataBound($tree);
    },

    appendNode: function ($tree, $parent, nodeData, level, position) {
        var i, $node, $newParent, $span, $img,
            data = $tree.data(),
            id = data.primaryKey ? nodeData[data.primaryKey] : nodeData[data.autoGenFieldName];
            $node = $('<li data-id="' + id + '" data-role="node" />').addClass(data.style.item),
            $wrapper = $('<div data-role="wrapper" />'),
            $expander = $('<span data-role="expander" data-mode="close"></span>').addClass(data.style.expander),
            $display = $('<span data-role="display">' + nodeData[data.textField] + '</span>'),
            hasChildren = typeof (nodeData[data.hasChildrenField]) !== 'undefined' && nodeData[data.hasChildrenField].toString().toLowerCase() === 'true',
            disabled = typeof (nodeData[data.disabledField]) !== 'undefined' && nodeData[data.disabledField].toString().toLowerCase() === 'true';

        if (data.indentation) {
            $wrapper.append('<span data-role="spacer" style="width: ' + (data.indentation * (level - 1)) + 'px;"></span>');
        }

        if (disabled) {
            gj.tree.methods.disableNode($tree, $node);
        } else {
            $expander.on('click', gj.tree.methods.expanderClickHandler($tree));
            $display.on('click', gj.tree.methods.displayClickHandler($tree));
        }
        $wrapper.append($expander);
        $wrapper.append($display);
        $node.append($wrapper);

        if (position) {
            $parent.find('li:eq(' + (position - 1) + ')').before($node);
        } else {
            $parent.append($node);
        }

        if (data.imageCssClassField && nodeData[data.imageCssClassField]) {
            $span = $('<span data-role="image"><span class="' + nodeData[data.imageCssClassField] + '"></span></span>');
            $span.insertBefore($display);
        } else if (data.imageUrlField && nodeData[data.imageUrlField]) {
            $span = $('<span data-role="image"></span>');
            $span.insertBefore($display);
            $img = $('<img src="' + nodeData[data.imageUrlField] + '"></img>');
            $img.attr('width', $span.width()).attr('height', $span.height());
            $span.append($img);
        } else if (data.imageHtmlField && nodeData[data.imageHtmlField]) {
            $span = $('<span data-role="image">' + nodeData[data.imageHtmlField] + '</span>');
            $span.insertBefore($display);
        }

        if ((nodeData[data.childrenField] && nodeData[data.childrenField].length) || hasChildren) {
            $expander.empty().append(data.icons.expand);
            $newParent = $('<ul />').addClass(data.style.list).addClass('gj-hidden');
            $node.append($newParent);

            if (nodeData[data.childrenField] && nodeData[data.childrenField].length) {
                for (i = 0; i < nodeData[data.childrenField].length; i++) {
                    gj.tree.methods.appendNode($tree, $newParent, nodeData[data.childrenField][i], level + 1);
                }
            }
        } else {
            data.style.leafIcon ? $expander.addClass(data.style.leafIcon) : $expander.html('&nbsp;');
        }

        gj.tree.events.nodeDataBound($tree, $node, nodeData.id, nodeData);
    },

    expanderClickHandler: function ($tree) {
        return function (e) {
            var $expander = $(this),
                $node = $expander.closest('li');
            if ($expander.attr('data-mode') === 'close') {
                $tree.expand($node);
            } else {
                $tree.collapse($node);
            }
        }
    },

    expand: function ($tree, $node, cascade) {
        var $children, i,
            $expander = $node.find('>[data-role="wrapper"]>[data-role="expander"]'),
            data = $tree.data(),
            id = $node.attr('data-id'),
            $list = $node.children('ul');
        if (gj.tree.events.expand($tree, $node, id) !== false && $list && $list.length) {
            $list.show();
            $expander.attr('data-mode', 'open');
            $expander.empty().append(data.icons.collapse);
            if (cascade) {
                $children = $node.find('ul>li');
                for (i = 0; i < $children.length; i++) {
                    gj.tree.methods.expand($tree, $($children[i]), cascade);
                }
            }
        }
        return $tree;
    },

    collapse: function ($tree, $node, cascade) {
        var $children, i,
            $expander = $node.find('>[data-role="wrapper"]>[data-role="expander"]'),
            data = $tree.data(),
            id = $node.attr('data-id'),
            $list = $node.children('ul');
        if (gj.tree.events.collapse($tree, $node, id) !== false && $list && $list.length) {
            $list.hide();
            $expander.attr('data-mode', 'close');
            $expander.empty().append(data.icons.expand);
            if (cascade) {
                $children = $node.find('ul>li');
                for (i = 0; i < $children.length; i++) {
                    gj.tree.methods.collapse($tree, $($children[i]), cascade);
                }
            }
        }
        return $tree;
    },

    expandAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.expand($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    collapseAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.collapse($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    displayClickHandler: function ($tree) {
        return function (e) {
            var $display = $(this),
                $node = $display.closest('li'),
                cascade = $tree.data().cascadeSelection;
            if ($node.attr('data-selected') === 'true') {
                gj.tree.methods.unselect($tree, $node, cascade);
            } else {
                if ($tree.data('selectionType') === 'single') {
                    gj.tree.methods.unselectAll($tree);
                }
                gj.tree.methods.select($tree, $node, cascade);
            }
        }
    },

    selectAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.select($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    select: function ($tree, $node, cascade) {
        var i, $children, data = $tree.data();
        if ($node.attr('data-selected') !== 'true' && gj.tree.events.select($tree, $node, $node.attr('data-id')) !== false) {
            $node.addClass(data.style.active).attr('data-selected', 'true');
            if (cascade) {
                $children = $node.find('ul>li');
                for (i = 0; i < $children.length; i++) {
                    gj.tree.methods.select($tree, $($children[i]), cascade);
                }
            }
        }
    },
    
    unselectAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.unselect($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    unselect: function ($tree, $node, cascade) {
        var i, $children, data = $tree.data();
        if ($node.attr('data-selected') === 'true' && gj.tree.events.unselect($tree, $node, $node.attr('data-id')) !== false) {
            $node.removeClass($tree.data().style.active).removeAttr('data-selected');
            if (cascade) {
                $children = $node.find('ul>li');
                for (i = 0; i < $children.length; i++) {
                    gj.tree.methods.unselect($tree, $($children[i]), cascade);
                }
            }
        }
    },

    getSelections: function ($list) {
        var i, $node, children,
            result = [],
            $nodes = $list.children('li');
        if ($nodes && $nodes.length) {
            for (i = 0; i < $nodes.length; i++) {
                $node = $($nodes[i]);
                if ($node.attr('data-selected') === 'true') {
                    result.push($node.attr('data-id'));
                } else if ($node.has('ul')) {
                    children = gj.tree.methods.getSelections($node.children('ul'));
                    if (children.length) {
                        result = result.concat(children);
                    }
                }
            }
        }

        return result;
    },

    getDataById: function ($tree, id, records) {
        var i, data = $tree.data(), result = undefined;
        for (i = 0; i < records.length; i++) {
            if (data.primaryKey && records[i][data.primaryKey] == id) {
                result = records[i];
                break;
            } else if (records[i][data.autoGenFieldName] == id) {
                result = records[i];
                break;
            } else if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                result = gj.tree.methods.getDataById($tree, id, records[i][data.childrenField]);
                if (result) {
                    break;
                }
            }
        }
        return result;
    },

    getDataByText: function ($tree, text, records) {
        var i, id,
            result = undefined,
            data = $tree.data();
        for (i = 0; i < records.length; i++) {
            if (text === records[i][data.textField]) {
                result = records[i];
                break;
            } else if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                result = gj.tree.methods.getDataByText($tree, text, records[i][data.childrenField]);
                if (result) {
                    break;
                }
            }
        }
        return result;
    },

    getNodeById: function ($list, id) {
        var i, $node,
            $result = undefined,
            $nodes = $list.children('li');
        if ($nodes && $nodes.length) {
            for (i = 0; i < $nodes.length; i++) {
                $node = $($nodes[i]);
                if (id == $node.attr('data-id')) {
                    $result = $node;
                    break;
                } else if ($node.has('ul')) {
                    $result = gj.tree.methods.getNodeById($node.children('ul'), id);
                    if ($result) {
                        break;
                    }
                }
            }
        }
        return $result;
    },

    getNodeByText: function ($list, text) {
        var i, $node,
            $result = undefined,
            $nodes = $list.children('li');
        if ($nodes && $nodes.length) {
            for (i = 0; i < $nodes.length; i++) {
                $node = $($nodes[i]);
                if (text === $node.find('>[data-role="wrapper"]>[data-role="display"]').text()) {
                    $result = $node;
                    break;
                } else if ($node.has('ul')) {
                    $result = gj.tree.methods.getNodeByText($node.children('ul'), text);
                    if ($result) {
                        break;
                    }
                }
            }
        }
        return $result;
    },

    addNode: function ($tree, nodeData, $parent, position) {
        var level, record, data = $tree.data();

        if (!$parent || !$parent.length) {
            $parent = $tree.children('ul');
            $tree.data('records').push(nodeData);
        } else {
            if ($parent[0].tagName.toLowerCase() === 'li') {
                if ($parent.children('ul').length === 0) {
                    $parent.find('[data-role="expander"]').empty().append(data.icons.collapse);
                    $parent.append($('<ul />').addClass(data.style.list));
                }
                $parent = $parent.children('ul');
            }
            record = $tree.getDataById($parent.parent().data('id'));
            if (!record[data.childrenField]) {
                record[data.childrenField] = [];
            }
            record[data.childrenField].push(nodeData);
        }
        level = $parent.parentsUntil('[data-type="tree"]', 'ul').length + 1;
        if (!data.primaryKey) {
            gj.tree.methods.genAutoId(data, [nodeData]);
        }

        gj.tree.methods.appendNode($tree, $parent, nodeData, level, position);

        return $tree;
    },

    remove: function ($tree, $node) {
        gj.tree.methods.removeDataById($tree, $node.attr('data-id'), $tree.data('records'));
        $node.remove();
        return $tree;
    },

    removeDataById: function ($tree, id, records) {
        var i, data = $tree.data();
        for (i = 0; i < records.length; i++) {
            if (data.primaryKey && records[i][data.primaryKey] == id) {
                records.splice(i, 1);
                break;
            } else if (records[i][data.autoGenFieldName] == id) {
                records.splice(i, 1);
                break;
            } else if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                gj.tree.methods.removeDataById($tree, id, records[i][data.childrenField]);
            }
        }
    },

    update: function ($tree, id, newRecord) {
        var data = $tree.data(),
            $node = $tree.getNodeById(id),
            oldRecord = $tree.getDataById(id);
        oldRecord = newRecord;
        $node.find('>[data-role="wrapper"]>[data-role="display"]').html(newRecord[data.textField]);
        gj.tree.events.nodeDataBound($tree, $node, id, newRecord);
        return $tree;
    },

    getChildren: function ($tree, $node, cascade) {
        var result = [], i, $children,
            cascade = typeof (cascade) === 'undefined' ? true : cascade;

        if (cascade) {
            $children = $node.find('ul li');
        } else {
            $children = $node.find('>ul>li');
        }

        for (i = 0; i < $children.length; i++) {
            result.push($($children[i]).data('id'));
        }

        return result;
    },

    enableAll: function ($tree) {
        var i, $children = $tree.find('ul>li');
        for (i = 0; i < $children.length; i++) {
            gj.tree.methods.enableNode($tree, $($children[i]), true);
        }
        return $tree;
    },

    enableNode: function ($tree, $node, cascade) {
        var i, $children,
            $expander = $node.find('>[data-role="wrapper"]>[data-role="expander"]'),
            $display = $node.find('>[data-role="wrapper"]>[data-role="display"]'),
            cascade = typeof (cascade) === 'undefined' ? true : cascade;

        $node.removeClass('disabled');
        $expander.on('click', gj.tree.methods.expanderClickHandler($tree));
        $display.on('click', gj.tree.methods.displayClickHandler($tree));
        gj.tree.events.enable($tree, $node);
        if (cascade) {
            $children = $node.find('ul>li');
            for (i = 0; i < $children.length; i++) {
                gj.tree.methods.enableNode($tree, $($children[i]), cascade);
            }
        }
    },

    disableAll: function ($tree) {
        var i, $children = $tree.find('ul>li');
        for (i = 0; i < $children.length; i++) {
            gj.tree.methods.disableNode($tree, $($children[i]), true);
        }
        return $tree;
    },

    disableNode: function ($tree, $node, cascade) {
        var i, $children,
            $expander = $node.find('>[data-role="wrapper"]>[data-role="expander"]'),
            $display = $node.find('>[data-role="wrapper"]>[data-role="display"]'),
            cascade = typeof (cascade) === 'undefined' ? true : cascade;

        $node.addClass('disabled');
        $expander.off('click');
        $display.off('click');
        gj.tree.events.disable($tree, $node);
        if (cascade) {
            $children = $node.find('ul>li');
            for (i = 0; i < $children.length; i++) {
                gj.tree.methods.disableNode($tree, $($children[i]), cascade);
            }
        }
    },

    destroy: function ($tree) {
        var data = $tree.data();
        if (data) {
            gj.tree.events.destroying($tree);
            $tree.xhr && $tree.xhr.abort();
            $tree.off();
            $tree.removeData();
            $tree.removeAttr('data-type');
            $tree.removeClass().empty();
        }
        return $tree;
    },

    pathFinder: function (data, list, id, parents) {
        var i, result = false;

        for (i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                result = true;
                break;
            } else if (gj.tree.methods.pathFinder(data, list[i][data.childrenField], id, parents)) {
                parents.push(list[i].data[data.textField]);
                result = true;
                break;
            }
        }

        return result;
    }
}
/**
  * @widget Tree
  * @plugin Base
  */
gj.tree.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.tree.methods;

    /**
     * Reload the tree.
     * @method
     * @param {object} params - Params that needs to be send to the server. Only in use for remote data sources.
     * @return jQuery object
     * @example Method.Sample <!-- tree -->
     * <button onclick="tree.reload()" class="gj-button-md">Click to load</button>
     * <br/><br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get',
     *         autoLoad: false
     *     });
     * </script>
     * @example Search <!-- tree -->
     * <input type="text" id="query" /> <button onclick="Search()">Search</button>
     * <br/><br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get'
     *     });
     *     function Search() {
     *         tree.reload({ query: $('#query').val() });
     *     }
     * </script>
     */
    self.reload = function (params) {
        return gj.widget.prototype.reload.call(this, params);
    };

    /**
     * Render data in the tree
     * @method
     * @param {object} response - An object that contains the data that needs to be loaded in the tree.
     * @fires dataBinding, dataBound
     * @return tree
     * @example sample <!-- tree -->
     * <div id="tree"></div>
     * <script>
     *     var tree, onSuccessFunc;
     *     onSuccessFunc = function (response) {
     *         //you can modify the response here if needed
     *         tree.render(response);
     *     };
     *     tree = $('#tree').tree({
     *         dataSource: { url: '/Locations/Get', success: onSuccessFunc }
     *     });
     * </script>
     */
    self.render = function (response) {
        return methods.render(this, response);
    };

    /**
     * Add node to the tree.
     * @method
     * @param {object} data - The node data.
     * @param {object} parentNode - Parent node as jquery object.
     * @param {Number} position - Position where the new node need to be added. 
     * @return jQuery object
     * @example Append.ToRoot <!-- tree -->
     * <button onclick="append()" class="gj-button-md">Append To Root</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     function append() {
     *         tree.addNode({ text: 'New Node' });
     *     }
     * </script>
     * @example Append.Parent <!-- tree -->
     * <button onclick="append()" class="gj-button-md">Append To Asia</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var parent, tree = $('#tree').tree();
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent);
     *     }
     * </script>
     * @example Bootstrap <!-- bootstrap, tree -->
     * <button onclick="append()" class="btn btn-default">Append To Asia</button>
     * <br/><br/>
     * <div id="tree" data-source="/Locations/Get" data-ui-library="bootstrap"></div>
     * <script>
     *     var parent, tree = $('#tree').tree();
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent);
     *     }
     * </script>
     * @example Prepend <!-- tree -->
     * <button onclick="append()" class="gj-button-md">Prepend in Asia</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var parent, tree = $('#tree').tree();
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent, 1);
     *     }
     * </script>
     * @example Position <!-- tree -->
     * <button onclick="append()" class="gj-button-md">Append to Asia as second</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var parent, tree = $('#tree').tree();
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent, 2);
     *     }
     * </script>
     */
    self.addNode = function (data, $parentNode, position) {
        return methods.addNode(this, data, $parentNode, position);
    };

    /**
     * Remove node from the tree.
     * @method
     * @param {object} node - The node as jQuery object
     * @return jQuery object
     * @example Method.Sample <!-- tree -->
     * <button onclick="remove()" class="gj-button-md">Remove USA</button>
     * <br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get'
     *     });
     *     function remove() {
     *         var node = tree.getNodeByText('USA');
     *         tree.removeNode(node);
     *     }
     * </script>
     */
    self.removeNode = function ($node) {
        return methods.remove(this, $node);
    };

    /**
     * Update node from the tree.
     * @method
     * @param {string} id - The id of the node that needs to be updated
     * @param {object} record - The node as jQuery object
     * @return jQuery object
     * @example Method.Sample <!-- tree -->
     * <input type="text" id="nodeName" />
     * <button onclick="save()" class="gj-button-md">Save</button>
     * <br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         primaryKey: 'id',
     *         dataSource: '/Locations/Get'
     *     });
     *     tree.on('select', function (e, node, id) {
     *         $('#nodeName').val(tree.getDataById(id).text);
     *     });
     *     function save() {
     *         var id = tree.getSelections()[0],
     *             record = tree.getDataById(id);
     *         record.text = $('#nodeName').val();
     *         tree.updateNode(id, record);
     *     }
     * </script>
     */
    self.updateNode = function (id, record) {
        return methods.update(this, id, record);
    };

    /**
     * Destroy the tree.
     * @method
     * @return jQuery object
     * @example Method.Sample <!-- tree -->
     * <button onclick="tree.destroy()" class="gj-button-md">Destroy</button>
     * <br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get'
     *     });
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    /**
     * Expand node from the tree.
     * @method
     * @param {object} node - The node as jQuery object
     * @param {boolean} cascade - Expand all children
     * @return jQuery object
     * @example Method.Sample <!-- tree -->
     * <button onclick="expand()" class="gj-button-md">Expand Asia</button>
     * <button onclick="collapse()" class="gj-button-md">Collapse Asia</button>
     * <br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get'
     *     });
     *     function expand() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.expand(node);
     *     }
     *     function collapse() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.collapse(node);
     *     }
     * </script>
     * @example Cascade <!-- tree -->
     * <button onclick="expand()" class="gj-button-md">Expand North America</button>
     * <br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get'
     *     });
     *     function expand() {
     *         var node = tree.getNodeByText('North America');
     *         tree.expand(node, true);
     *     }
     * </script>
     */
    self.expand = function ($node, cascade) {
        return methods.expand(this, $node, cascade);
    };

    /**
     * Collapse node from the tree.
     * @method
     * @param {object} node - The node as jQuery object
     * @param {boolean} cascade - Collapse all children
     * @return jQuery object
     * @example Method.Sample <!-- tree -->
     * <button onclick="expand()" class="gj-button-md">Expand Asia</button>
     * <button onclick="collapse()" class="gj-button-md">Collapse Asia</button>
     * <br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get'
     *     });
     *     function expand() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.expand(node);
     *     }
     *     function collapse() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.collapse(node);
     *     }
     * </script>
     * @example Cascade <!-- tree -->
     * <button onclick="collapse()" class="gj-button-md">Collapse North America</button>
     * <br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get'
     *     });
     *     function collapse() {
     *         var node = tree.getNodeByText('North America');
     *         tree.collapse(node, true);
     *     }
     * </script>
     */
    self.collapse = function ($node, cascade) {
        return methods.collapse(this, $node, cascade);
    };

    /**
     * Expand all tree nodes
     * @method
     * @return jQuery object
     * @example Sample <!-- tree -->
     * <button onclick="tree.expandAll()" class="gj-button-md">Expand All</button>
     * <button onclick="tree.collapseAll()" class="gj-button-md">Collapse All</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree();
     * </script>
     */
    self.expandAll = function () {
        return methods.expandAll(this);
    };

    /**
     * Collapse all tree nodes
     * @method
     * @return jQuery object
     * @example Sample <!-- tree -->
     * <button onclick="tree.expandAll()" class="gj-button-md">Expand All</button>
     * <button onclick="tree.collapseAll()" class="gj-button-md">Collapse All</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree();
     * </script>
     */
    self.collapseAll = function () {
        return methods.collapseAll(this);
    };

    /**
     * Return node data by id of the record.
     * @method
     * @param {string|number} id - The id of the record that needs to be returned
     * @return object
     * @example sample <!-- tree -->
     * <button id="btnGetData" class="gj-button-md">Get Data</button>
     * <br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get',
     *         primaryKey: 'id' //define the name of the column that you want to use as ID here.
     *     });
     *     $('#btnGetData').on('click', function () {
     *         var data = tree.getDataById(9);
     *         alert('The population of ' + data.text + ' is ' + data.population);
     *     });
     * </script>
     */
    self.getDataById = function (id) {
        return methods.getDataById(this, id, this.data('records'));
    };

    /**
     * Return node data by text.
     * @method
     * @param {string} text - The text of the record that needs to be returned
     * @return object
     * @example sample <!-- tree -->
     * <button id="btnGetData" class="gj-button-md">Get Data</button>
     * <br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get',
     *     });
     *     $('#btnGetData').on('click', function () {
     *         var data = tree.getDataByText('California');
     *         alert('The population of California is ' + data.population);
     *     });
     * </script>
     */
    self.getDataByText = function (text) {
        return methods.getDataByText(this, text, this.data('records'));
    };

    /**
     * Return node by id of the record.
     * @method
     * @param {string} id - The id of the node that needs to be returned
     * @return jQuery object
     * @example sample <!-- tree -->
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get',
     *         primaryKey: 'id' //define the name of the column that you want to use as ID here.
     *     });
     *     tree.on('dataBound', function() {
     *         var node = tree.getNodeById('1');
     *         node.css('background-color', 'red');
     *     });
     * </script>
     */
    self.getNodeById = function (id) {
        return methods.getNodeById(this.children('ul'), id);
    };

    /**
     * Return node by text.
     * @method
     * @param {string} text - The text in the node that needs to be returned
     * @return jQuery object
     * @example sample <!-- tree -->
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get'
     *     });
     *     tree.on('dataBound', function() {
     *         var node = tree.getNodeByText('Asia');
     *         node.css('background-color', 'red');
     *     });
     * </script>
     */
    self.getNodeByText = function (text) {
        return methods.getNodeByText(this.children('ul'), text);
    };

    /**
     * Return an array with all records presented in the tree.
     * @method
     * @return Array
     * @example sample <!-- tree -->
     * <button onclick="alert(JSON.stringify(tree.getAll()))" class="gj-button-md">Get All Data</button>
     * <button onclick="tree.addNode({ text: 'New Node' });" class="gj-button-md">Add New Node</button>
     * <br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: [ { text: 'foo', children: [ { text: 'bar' } ] } ]
     *     });
     * </script>
     */
    self.getAll = function () {
        return this.data('records');
    };

    /**
     * Select node from the tree.
     * @method
     * @param {Object} node - The node as jquery object.
     * @return jQuery Object
     * @example Select.Method <!-- tree -->
     * <button onclick="tree.select(northAmerica)" class="gj-button-md">Select North America</button>
     * <button onclick="tree.unselect(northAmerica)" class="gj-button-md">Unselect North America</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree, northAmerica;
     *     tree = $('#tree').tree({
     *         primaryKey: 'id',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         },
     *         select: function (e, node, id) {
     *             alert('select is fired for node with id=' + id);
     *         }
     *     });
     * </script>
     */
    self.select = function ($node) {
        return methods.select(this, $node);
    };

    /**
     * Unselect node from the tree.
     * @method
     * @param {Object} node - The node as jquery object.
     * @return jQuery Object
     * @example UnSelect.Method <!-- tree -->
     * <button onclick="tree.select(northAmerica)" class="gj-button-md">Select North America</button>
     * <button onclick="tree.unselect(northAmerica)" class="gj-button-md">Unselect North America</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree, northAmerica;
     *     tree = $('#tree').tree({
     *         primaryKey: 'id',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');  
     *         },
     *         unselect: function (e, node, id) {
     *             alert('unselect is fired for node with id=' + id);
     *         }
     *     });
     * </script>
     */
    self.unselect = function ($node) {
        return methods.unselect(this, $node);
    };

    /**
     * Select all tree nodes
     * @method
     * @return jQuery object
     * @example Sample <!-- tree -->
     * <button onclick="tree.selectAll()" class="gj-button-md">Select All</button>
     * <button onclick="tree.unselectAll()" class="gj-button-md">Unselect All</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         selectionType: 'multiple'
     *     });
     *     tree.on('dataBound', function() {
     *         tree.expandAll();
     *     });
     * </script>
     */
    self.selectAll = function () {
        return methods.selectAll(this);
    };

    /**
     * Unselect all tree nodes
     * @method
     * @return jQuery object
     * @example Sample <!-- tree -->
     * <button onclick="tree.selectAll()" class="gj-button-md">Select All</button>
     * <button onclick="tree.unselectAll()" class="gj-button-md">Unselect All</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         selectionType: 'multiple'
     *     });
     *     tree.on('dataBound', function() {
     *         tree.expandAll();
     *     });
     * </script>
     */
    self.unselectAll = function () {
        return methods.unselectAll(this);
    };

    /**
     * Return an array with the ids of the selected nodes.
     * @method
     * @return array
     * @example Sample <!-- tree -->
     * <button id="btnShowSelection" class="gj-button-md">Show Selections</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         selectionType: 'multiple'
     *     });
     *     $('#btnShowSelection').on('click', function () {
     *         var selections = tree.getSelections();
     *         selections && selections.length && alert(selections.join());
     *     });
     * </script>
     */
    self.getSelections = function () {
        return methods.getSelections(this.children('ul'));
    };

    /**
     * Return an array with the ids of all children.
     * @method
     * @param {Object} node - The node as jquery object.
     * @param {Boolean} cascade - Include all nested children. Set to true by default.
     * @return array
     * @example Cascade.True <!-- tree -->
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get',
     *         dataBound: function () {
     *             var node = tree.getNodeByText('North America'),
     *                 children = tree.getChildren(node);
     *             alert(children.join());
     *         }
     *     });
     * </script>
     * @example Cascade.False <!-- tree -->
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get',
     *         dataBound: function () {
     *             var node = tree.getNodeByText('North America'),
     *                 children = tree.getChildren(node, false);
     *             alert(children.join());
     *         }
     *     });
     * </script>
     */
    self.getChildren = function ($node, cascade) {
        return methods.getChildren(this, $node, cascade);
    };

    /**
     * Return an array with the names of all parents.
     * @method
     * @param {String} id - The id of the target node
     * @return array
     * @example sample <!-- tree -->
     * Location: <div id="location" style="display: inline-block;"></div>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get',
     *         select: function (e, node, id) {
     *             var parents = tree.parents(id);
     *             $('#location').text(parents.join(' / ') + ' / ' + tree.getDataById(id).text);
     *         }
     *     });
     * </script>
     */
    self.parents = function (id) {
        var parents = [], data = this.data();
        methods.pathFinder(data, data.records, id, parents);
        return parents.reverse();
    };

    /**
     * Enable node from the tree.
     * @method
     * @param {Object} node - The node as jquery object.
     * @param {Boolean} cascade - Enable all children. Set to true by default.
     * @return jQuery Object
     * @example Material.Design <!-- checkbox, tree -->
     * <button onclick="tree.enable(northAmerica)" class="gj-button-md">Enable North America (Cascade)</button>
     * <button onclick="tree.disable(northAmerica)" class="gj-button-md">Disable North America (Cascade)</button>
     * <button onclick="tree.enable(northAmerica, false)" class="gj-button-md">Enable North America (Non-Cascade)</button>
     * <button onclick="tree.disable(northAmerica, false)" class="gj-button-md">Disable North America (Non-Cascade)</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree, northAmerica;
     *     tree = $('#tree').tree({
     *         checkboxes: true,
     *         primaryKey: 'ID',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     * </script>
     * @example Bootstrap <!-- bootstrap, checkbox, tree -->
     * <button onclick="tree.enable(northAmerica)" class="btn btn-default">Enable North America (Cascade)</button>
     * <button onclick="tree.disable(northAmerica)" class="btn btn-default">Disable North America (Cascade)</button>
     * <button onclick="tree.enable(northAmerica, false)" class="btn btn-default">Enable North America (Non-Cascade)</button>
     * <button onclick="tree.disable(northAmerica, false)" class="btn btn-default">Disable North America (Non-Cascade)</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree, northAmerica;
     *     tree = $('#tree').tree({
     *         checkboxes: true,
     *         primaryKey: 'ID',
     *         uiLibrary: 'bootstrap',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     * </script>
     * @example Bootstrap.4 <!-- bootstrap4, fontawesome, checkbox, tree -->
     * <button onclick="tree.enable(northAmerica)" class="btn btn-default">Enable North America (Cascade)</button>
     * <button onclick="tree.disable(northAmerica)" class="btn btn-default">Disable North America (Cascade)</button>
     * <button onclick="tree.enable(northAmerica, false)" class="btn btn-default">Enable North America (Non-Cascade)</button>
     * <button onclick="tree.disable(northAmerica, false)" class="btn btn-default">Disable North America (Non-Cascade)</button>
     * <br/><br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree, northAmerica;
     *     tree = $('#tree').tree({
     *         checkboxes: true,
     *         primaryKey: 'ID',
     *         uiLibrary: 'bootstrap4',
     *         iconsLibrary: 'fontawesome',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     * </script>
     */
    self.enable = function ($node, cascade) {
        return methods.enableNode(this, $node, cascade);
    };

    /**
     * Enable all nodes from the tree.
     * @method
     * @return jQuery Object
     * @example Sample <!-- checkbox, tree -->
     * <button onclick="tree.enableAll()" class="gj-button-md">Enable All</button>
     * <button onclick="tree.disableAll()" class="gj-button-md">Disable All</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         checkboxes: true
     *     });
     * </script>
     */
    self.enableAll = function () {
        return methods.enableAll(this);
    };

    /**
     * Disable node from the tree.
     * @method
     * @param {Object} node - The node as jquery object.
     * @param {Boolean} cascade - Disable all children. Set to true by default.
     * @return jQuery Object
     * @example Sample <!-- checkbox, tree -->
     * <button onclick="tree.enable(northAmerica)" class="gj-button-md">Enable North America (Cascade)</button>
     * <button onclick="tree.disable(northAmerica)" class="gj-button-md">Disable North America (Cascade)</button>
     * <button onclick="tree.enable(northAmerica, false)" class="gj-button-md">Enable North America (Non-Cascade)</button>
     * <button onclick="tree.disable(northAmerica, false)" class="gj-button-md">Disable North America (Non-Cascade)</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree, northAmerica;
     *     tree = $('#tree').tree({
     *         checkboxes: true,
     *         primaryKey: 'ID',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     * </script>
     */
    self.disable = function ($node, cascade) {
        return methods.disableNode(this, $node, cascade);
    };

    /**
     * Disable all nodes from the tree.
     * @method
     * @return jQuery Object
     * @example Sample <!-- checkbox, tree -->
     * <button onclick="tree.enableAll()" class="gj-button-md">Enable All</button>
     * <button onclick="tree.disableAll()" class="gj-button-md">Disable All</button>
     * <br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         checkboxes: true
     *     });
     * </script>
     */
    self.disableAll = function () {
        return methods.disableAll(this);
    };

    $.extend($element, self);
    if ('tree' !== $element.attr('data-type')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.tree.widget.prototype = new gj.widget();
gj.tree.widget.constructor = gj.tree.widget;

(function ($) {
    $.fn.tree = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.tree.widget(this, method);
            } else {
                $widget = new gj.tree.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
/** 
 * @widget Tree 
 * @plugin Checkboxes
 */
gj.tree.plugins.checkboxes = {
    config: {
        base: {
            /** Add checkbox for each node, if set to true.
              * @type Boolean
              * @default undefined
              * @example Material.Design <!-- checkbox, tree -->
              * <div id="tree"></div>
              * <script>
              *     var tree = $('#tree').tree({
              *         dataSource: '/Locations/Get',
              *         checkboxes: true
              *     });
              * </script>
              * @example Bootstrap.3 <!-- bootstrap, checkbox, tree -->
              * <div id="tree"></div>
              * <script>
              *     var tree = $('#tree').tree({
              *         dataSource: '/Locations/Get',
              *         checkboxes: true,
              *         uiLibrary: 'bootstrap'
              *     });
              * </script>
              * @example Bootstrap.4 <!-- bootstrap4, checkbox, tree -->
              * <div id="tree"></div>
              * <script>
              *     var tree = $('#tree').tree({
              *         dataSource: '/Locations/Get',
              *         checkboxes: true,
              *         uiLibrary: 'bootstrap4'
              *     });
              * </script>
              */
            checkboxes: undefined,

            /** Name of the source field, that indicates if the checkbox is checked.
             * @type string
             * @default 'checked'
             * @example Custom.Name <!-- checkbox, tree -->
             * <div id="tree"></div>
             * <script>
             *     var tree = $('#tree').tree({
             *         checkboxes: true,
             *         checkedField: 'checkedFieldName',
             *         dataSource: [ { text: 'foo', checkedFieldName: false, children: [ { text: 'bar', checkedFieldName: true }, { text: 'bar2', checkedFieldName: false } ] }, { text: 'foo2', children: [ { text: 'bar2' } ] } ]
             *     });
             * </script>
             */
            checkedField: 'checked',

            /** This setting enable cascade check and uncheck of children
             * @type boolean
             * @default true
             * @example False.Remote.DataSource <!-- checkbox, tree -->
             * <div id="tree"></div>
             * <script>
             *     var tree = $('#tree').tree({
             *         checkboxes: true,
             *         dataSource: '/Locations/Get',
             *         cascadeCheck: false
             *     });
             *     tree.on('dataBound', function() {
             *         tree.expandAll();
             *     });
             * </script>
             * @example False.Local.DataSource <!-- checkbox, tree -->
             * <div id="tree"></div>
             * <script>
             *     var tree = $('#tree').tree({
             *         checkboxes: true,
             *         dataSource: [ { text: 'foo', checked: true, children: [ { text: 'bar', checked: true }, { text: 'bar2', checked: false } ] }, { text: 'foo2', checked: true, children: [ { text: 'bar2', checked: false } ] } ],
             *         cascadeCheck: false
             *     });
             * </script>
             * @example True <!-- checkbox, tree -->
             * <div id="tree"></div>
             * <script>
             *     var tree = $('#tree').tree({
             *         checkboxes: true,
             *         dataSource: '/Locations/Get',
             *         cascadeCheck: true
             *     });
             *     tree.on('dataBound', function() {
             *         tree.expandAll();
             *     });
             * </script>
             */
            cascadeCheck: true,
        }
    },

    private: {
        dataBound: function ($tree) {
            var $nodes;
            if ($tree.data('cascadeCheck')) {
                $nodes = $tree.find('li[data-role="node"]');
                $.each($nodes, function () {
                    var $node = $(this),
                        state = $node.find('[data-role="checkbox"] input[type="checkbox"]').checkbox('state');
                    if (state === 'checked') {
                        gj.tree.plugins.checkboxes.private.updateChildrenState($node, state);
                        gj.tree.plugins.checkboxes.private.updateParentState($node, state);
                    }
                });
            }
        },

        nodeDataBound: function ($tree, $node, id, record) {
            var data, $expander, $checkbox, $wrapper, disabled;

            if ($node.find('> [data-role="wrapper"] > [data-role="checkbox"]').length === 0) {
                data = $tree.data();
                $expander = $node.find('> [data-role="wrapper"] > [data-role="expander"]');
                $checkbox = $('<input type="checkbox"/>');
                $wrapper = $('<span data-role="checkbox"></span>').append($checkbox);
                disabled = typeof (record[data.disabledField]) !== 'undefined' && record[data.disabledField].toString().toLowerCase() === 'true';

                $checkbox = $checkbox.checkbox({
                    uiLibrary: data.uiLibrary,
                    iconsLibrary: data.iconsLibrary,
                    change: function (e, state) {
                        gj.tree.plugins.checkboxes.events.checkboxChange($tree, $node, record, $checkbox.state());
                    }
                });
                disabled && $checkbox.prop('disabled', true);
                record[data.checkedField] && $checkbox.state('checked');
                $checkbox.on('click', function (e) {
                    var $node = $checkbox.closest('li'),
                        state = $checkbox.state();
                    if (data.cascadeCheck) {
                        gj.tree.plugins.checkboxes.private.updateChildrenState($node, state);
                        gj.tree.plugins.checkboxes.private.updateParentState($node, state);
                    }
                });
                $expander.after($wrapper);
            }
        },

        updateParentState: function ($node, state) {
            var $parentNode, $parentCheckbox, $siblingCheckboxes, allChecked, allUnchecked, parentState;

            $parentNode = $node.parent('ul').parent('li');
            if ($parentNode.length === 1) {
                $parentCheckbox = $node.parent('ul').parent('li').find('> [data-role="wrapper"] > [data-role="checkbox"] input[type="checkbox"]');
                $siblingCheckboxes = $node.siblings().find('> [data-role="wrapper"] > span[data-role="checkbox"] input[type="checkbox"]');
                allChecked = (state === 'checked');
                allUnchecked = (state === 'unchecked');
                parentState = 'indeterminate';
                $.each($siblingCheckboxes, function () {
                    var state = $(this).checkbox('state');
                    if (allChecked && state !== 'checked') {
                        allChecked = false;
                    }
                    if (allUnchecked && state !== 'unchecked') {
                        allUnchecked = false;
                    }
                });
                if (allChecked && !allUnchecked) {
                    parentState = 'checked';
                }
                if (!allChecked && allUnchecked) {
                    parentState = 'unchecked';
                }
                $parentCheckbox.checkbox('state', parentState);
                gj.tree.plugins.checkboxes.private.updateParentState($parentNode, $parentCheckbox.checkbox('state'));
            }
        },

        updateChildrenState: function ($node, state) {
            var $childrenCheckboxes = $node.find('ul li [data-role="wrapper"] [data-role="checkbox"] input[type="checkbox"]');
            if ($childrenCheckboxes.length > 0) {
                $.each($childrenCheckboxes, function () {
                    $(this).checkbox('state', state);
                });
            }
        },

        update: function ($tree, $node, state) {
            var checkbox = $node.find('[data-role="checkbox"] input[type="checkbox"]').first();
            $(checkbox).checkbox('state', state);
            if ($tree.data().cascadeCheck) {
                gj.tree.plugins.checkboxes.private.updateChildrenState($node, state);
                gj.tree.plugins.checkboxes.private.updateParentState($node, state);
            }
        }
    },

    public: {

        /** Get ids of all checked nodes
         * @method
         * @return Array
         * @example Base.Theme <!-- checkbox, tree -->
         * <button id="btnGet" class="gj-button-md">Get Checked Nodes</button>
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         checkboxes: true
         *     });
         *     $('#btnGet').on('click', function() {
         *         var result = tree.getCheckedNodes();
         *         alert(result.join());
         *     });
         * </script>
         */
        getCheckedNodes: function () {
            var result = [],
                checkboxes = this.find('li [data-role="checkbox"] input[type="checkbox"]');
            $.each(checkboxes, function () {
                var checkbox = $(this);
                if (checkbox.checkbox('state') === 'checked') {
                    result.push(checkbox.closest('li').data('id'));
                }
            });
            return result;
        },

        /**
         * Check all tree nodes
         * @method
         * @return tree as jQuery object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.checkAll()" class="gj-button-md">Check All</button>
         * <button onclick="tree.uncheckAll()" class="gj-button-md">Uncheck All</button>
         * <br/><br/>
         * <div id="tree" data-source="/Locations/Get"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *     });
         * </script>
         */
        checkAll: function () {
            var $checkboxes = this.find('li [data-role="checkbox"] input[type="checkbox"]');
            $.each($checkboxes, function () {
                $(this).checkbox('state', 'checked');
            });
            return this;
        },

        /**
         * Uncheck all tree nodes
         * @method
         * @return tree as jQuery object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.checkAll()" class="gj-button-md">Check All</button>
         * <button onclick="tree.uncheckAll()" class="gj-button-md">Uncheck All</button>
         * <br/><br/>
         * <div id="tree" data-source="/Locations/Get"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *     });
         * </script>
         */
        uncheckAll: function () {
            var $checkboxes = this.find('li [data-role="checkbox"] input[type="checkbox"]');
            $.each($checkboxes, function () {
                $(this).checkbox('state', 'unchecked');
            });
            return this;
        },

        /**
         * Check tree node.
         * @method
         * @param {object} node - The node as jQuery object
         * @return tree as jQuery object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.check(tree.getNodeByText('China'))" class="gj-button-md">Check China</button>
         * <br/>
         * <div id="tree" data-source="/Locations/Get"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *     });
         * </script>
         */
        check: function ($node) {
            gj.tree.plugins.checkboxes.private.update(this, $node, 'checked');
            return this;
        },

        /**
         * Uncheck tree node.
         * @method
         * @param {object} node - The node as jQuery object
         * @return tree as jQuery object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.uncheck(tree.getNodeByText('China'))" class="gj-button-md">UnCheck China</button>
         * <br/>
         * <div id="tree" data-source="/Locations/Get"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *         tree.check(tree.getNodeByText('China'));
         *     });
         * </script>
         */
        uncheck: function ($node) {
            gj.tree.plugins.checkboxes.private.update(this, $node, 'unchecked');
            return this;
        }
    },

    events: {
        /**
         * Event fires when the checkbox state is changed.
         * @event checkboxChange
         * @param {object} e - event data
         * @param {object} $node - the node object as jQuery element
         * @param {object} record - the record data
         * @param {string} state - the new state of the checkbox
         * @example Event.Sample <!-- checkbox, tree -->
         * <div id="tree" data-source="/Locations/Get" data-checkboxes="true"></div>
         * <script>
         *     var tree = $('#tree').tree();
         *     tree.on('checkboxChange', function (e, $node, record, state) {
         *         alert('The new state of record ' + record.text + ' is ' + state);
         *     });
         * </script>
         */
        checkboxChange: function ($tree, $node, record, state) {
            return $tree.triggerHandler('checkboxChange', [$node, record, state]);
        }
    },

    configure: function ($tree) {
        if ($tree.data('checkboxes') && gj.checkbox) {
            $.extend(true, $tree, gj.tree.plugins.checkboxes.public);
            $tree.on('nodeDataBound', function (e, $node, id, record) {
                gj.tree.plugins.checkboxes.private.nodeDataBound($tree, $node, id, record);
            });
            $tree.on('dataBound', function () {
                gj.tree.plugins.checkboxes.private.dataBound($tree);
            });
            $tree.on('enable', function (e, $node) {
                $node.find('>[data-role="wrapper"]>[data-role="checkbox"] input[type="checkbox"]').prop('disabled', false);
            });
            $tree.on('disable', function (e, $node) {
                $node.find('>[data-role="wrapper"]>[data-role="checkbox"] input[type="checkbox"]').prop('disabled', true);
            });
        }
    }
};

/**
 * @widget Tree
 * @plugin DragAndDrop
 */
gj.tree.plugins.dragAndDrop = {
	config: {
		base: {
			/** Enables drag and drop functionality for each node.
              * @type Boolean
              * @default undefined
              * @example Material.Design <!-- draggable, droppable, tree -->
              * <h3>Drag and Drop Tree Nodes</h3>
              * <div id="tree"></div>
              * <script>
              *     $('#tree').tree({
              *         dataSource: '/Locations/Get',
              *         dragAndDrop: true
              *     });
              * </script>
              * @example Bootstrap.3 <!-- bootstrap, draggable, droppable, tree -->
              * <div class="container">
              *     <h3>Drag and Drop Tree Nodes</h3>
              *     <div id="tree"></div>
              * </div>
              * <script>
              *     $('#tree').tree({
              *         dataSource: '/Locations/Get',
              *         dragAndDrop: true,
              *         uiLibrary: 'bootstrap'
              *     });
              * </script>
              * @example Bootstrap.4 <!-- bootstrap4, draggable, droppable, tree -->
              * <div class="container">
              *     <h3>Drag and Drop Tree Nodes</h3>
              *     <div id="tree"></div>
              * </div>
              * <script>
              *     $('#tree').tree({
              *         dataSource: '/Locations/Get',
              *         dragAndDrop: true,
              *         uiLibrary: 'bootstrap4'
              *     });
              * </script>
              */
			dragAndDrop: undefined,

			style: {
			    dragEl: 'gj-tree-drag-el gj-tree-md-drag-el',
                dropAsChildIcon: 'gj-cursor-pointer gj-icon plus',
			    dropAbove: 'gj-tree-drop-above',
			    dropBelow: 'gj-tree-drop-below'
			}
        },

        bootstrap: {
            style: {
                dragEl: 'gj-tree-drag-el gj-tree-bootstrap-drag-el',
                dropAsChildIcon: 'glyphicon glyphicon-plus',
                dropAbove: 'drop-above',
                dropBelow: 'drop-below'
            }
        },

        bootstrap4: {
            style: {
                dragEl: 'gj-tree-drag-el gj-tree-bootstrap-drag-el',
                dropAsChildIcon: 'gj-cursor-pointer gj-icon plus',
                dropAbove: 'drop-above',
                dropBelow: 'drop-below'
            }
        }
	},

	private: {
	    nodeDataBound: function ($tree, $node) {
	        var $wrapper = $node.children('[data-role="wrapper"]'),
    	        $display = $node.find('>[data-role="wrapper"]>[data-role="display"]');
            if ($wrapper.length && $display.length) {
                $display.on('mousedown', gj.tree.plugins.dragAndDrop.private.createNodeMouseDownHandler($tree));
                $display.on('mousemove', gj.tree.plugins.dragAndDrop.private.createNodeMouseMoveHandler($tree, $node, $display));
                $display.on('mouseup', gj.tree.plugins.dragAndDrop.private.createNodeMouseUpHandler($tree));
		    }
        },

        createNodeMouseDownHandler: function ($tree) {
            return function (e) {
                $tree.data('dragReady', true);
            }
        },

        createNodeMouseUpHandler: function ($tree) {
            return function (e) {
                $tree.data('dragReady', false);
            }
        },

	    createNodeMouseMoveHandler: function ($tree, $node, $display) {
            return function (e) {
                if ($tree.data('dragReady')) {
                    var data = $tree.data(), $dragEl, $wrapper, offsetTop, offsetLeft;

                    $tree.data('dragReady', false);
                    $dragEl = $display.clone().wrap('<div data-role="wrapper"/>').closest('div')
                        .wrap('<li class="' + data.style.item + '" />').closest('li')
                        .wrap('<ul class="' + data.style.list + '" />').closest('ul');
                    $('body').append($dragEl);
                    $dragEl.attr('data-role', 'draggable-clone').addClass('gj-unselectable').addClass(data.style.dragEl);
                    $dragEl.find('[data-role="wrapper"]').prepend('<span data-role="indicator" />');
                    $dragEl.draggable({
                        drag: gj.tree.plugins.dragAndDrop.private.createDragHandler($tree, $node, $display),
                        stop: gj.tree.plugins.dragAndDrop.private.createDragStopHandler($tree, $node, $display)
                    });
                    $wrapper = $display.parent();
                    offsetTop = $display.offset().top;
                    offsetTop -= parseInt($wrapper.css("border-top-width")) + parseInt($wrapper.css("margin-top")) + parseInt($wrapper.css("padding-top"));
                    offsetLeft = $display.offset().left;
                    offsetLeft -= parseInt($wrapper.css("border-left-width")) + parseInt($wrapper.css("margin-left")) + parseInt($wrapper.css("padding-left"));
                    offsetLeft -= $dragEl.find('[data-role="indicator"]').outerWidth(true);
                    $dragEl.css({
                        position: 'absolute', top: offsetTop, left: offsetLeft, width: $display.outerWidth(true)
                    });
                    if ($display.attr('data-droppable') === 'true') {
                        $display.droppable('destroy');
                    }
                    gj.tree.plugins.dragAndDrop.private.getTargetDisplays($tree, $node, $display).each(function () {
                        var $dropEl = $(this);
                        if ($dropEl.attr('data-droppable') === 'true') {
                            $dropEl.droppable('destroy');
                        }
                        $dropEl.droppable();
                    });
                    gj.tree.plugins.dragAndDrop.private.getTargetDisplays($tree, $node).each(function () {
                        var $dropEl = $(this);
                        if ($dropEl.attr('data-droppable') === 'true') {
                            $dropEl.droppable('destroy');
                        }
                        $dropEl.droppable();
                    });
                    $dragEl.trigger('mousedown');
                }
		    };
	    },

	    getTargetDisplays: function ($tree, $node, $display) {
	        return $tree.find('[data-role="display"]').not($display).not($node.find('[data-role="display"]'));
	    },

	    getTargetWrappers: function ($tree, $node) {
	        return $tree.find('[data-role="wrapper"]').not($node.find('[data-role="wrapper"]'));
	    },

	    createDragHandler: function ($tree, $node, $display) {
	        var $displays = gj.tree.plugins.dragAndDrop.private.getTargetDisplays($tree, $node, $display),
                $wrappers = gj.tree.plugins.dragAndDrop.private.getTargetWrappers($tree, $node),
	            data = $tree.data();
	        return function (e, offset, mousePosition) {
	            var $dragEl = $(this), success = false;
	            $displays.each(function () {
	                var $targetDisplay = $(this),
	                    $indicator;
	                if ($targetDisplay.droppable('isOver', mousePosition)) {
	                    $indicator = $dragEl.find('[data-role="indicator"]');
	                    data.style.dropAsChildIcon ? $indicator.addClass(data.style.dropAsChildIcon) : $indicator.text('+');
	                    success = true;
	                    return false;
	                } else {
	                    $dragEl.find('[data-role="indicator"]').removeClass(data.style.dropAsChildIcon).empty();
                    }
	            });
	            $wrappers.each(function () {
	                var $wrapper = $(this),
                        $indicator, middle;
	                if (!success && $wrapper.droppable('isOver', mousePosition)) {
	                    middle = $wrapper.position().top + ($wrapper.outerHeight() / 2);
	                    if (mousePosition.y < middle) {
	                        $wrapper.addClass(data.style.dropAbove).removeClass(data.style.dropBelow);
	                    } else {
	                        $wrapper.addClass(data.style.dropBelow).removeClass(data.style.dropAbove);
	                    }
	                } else {
	                    $wrapper.removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);
	                }
	            });
	        };
        },

	    createDragStopHandler: function ($tree, $sourceNode, $sourceDisplay) {
	        var $displays = gj.tree.plugins.dragAndDrop.private.getTargetDisplays($tree, $sourceNode, $sourceDisplay),
                $wrappers = gj.tree.plugins.dragAndDrop.private.getTargetWrappers($tree, $sourceNode),
	            data = $tree.data();
	        return function (e, mousePosition) {
                var success = false, record, $targetNode, $sourceParentNode, parent;
	            $(this).draggable('destroy').remove();
	            $displays.each(function () {
	                var $targetDisplay = $(this), $ul;
	                if ($targetDisplay.droppable('isOver', mousePosition)) {
	                    $targetNode = $targetDisplay.closest('li');
	                    $sourceParentNode = $sourceNode.parent('ul').parent('li');
	                    $ul = $targetNode.children('ul');
	                    if ($ul.length === 0) {
	                        $ul = $('<ul />').addClass(data.style.list);
	                        $targetNode.append($ul);
	                    }
	                    if (gj.tree.plugins.dragAndDrop.events.nodeDrop($tree, $sourceNode.data('id'), $targetNode.data('id'), $ul.children('li').length + 1) !== false) {
                            $ul.append($sourceNode);

                            //BEGIN: Change node position inside the backend data
                            record = $tree.getDataById($sourceNode.data('id'));
                            gj.tree.methods.removeDataById($tree, $sourceNode.data('id'), data.records);
                            parent = $tree.getDataById($ul.parent().data('id'));
                            if (parent[data.childrenField] === undefined) {
                                parent[data.childrenField] = [];
                            }
                            parent[data.childrenField].push(record);
                            //END

	                        gj.tree.plugins.dragAndDrop.private.refresh($tree, $sourceNode, $targetNode, $sourceParentNode);
	                    }
	                    success = true;
	                    return false;
	                }
	                $targetDisplay.droppable('destroy');
	            });
	            if (!success) {
	                $wrappers.each(function () {
	                    var $targetWrapper = $(this), prepend, orderNumber, sourceNodeId;
	                    if ($targetWrapper.droppable('isOver', mousePosition)) {
	                        $targetNode = $targetWrapper.closest('li');
	                        $sourceParentNode = $sourceNode.parent('ul').parent('li');
	                        prepend = mousePosition.y < ($targetWrapper.position().top + ($targetWrapper.outerHeight() / 2));
	                        sourceNodeId = $sourceNode.data('id');
	                        orderNumber = $targetNode.prevAll('li:not([data-id="' + sourceNodeId + '"])').length + (prepend ? 1 : 2);
                            if (gj.tree.plugins.dragAndDrop.events.nodeDrop($tree, sourceNodeId, $targetNode.parent('ul').parent('li').data('id'), orderNumber) !== false) {
                                //BEGIN: Change node position inside the backend data
                                record = $tree.getDataById($sourceNode.data('id'));
                                gj.tree.methods.removeDataById($tree, $sourceNode.data('id'), data.records);
                                $tree.getDataById($targetNode.parent().data('id'))[data.childrenField].splice($targetNode.index() + (prepend ? 0 : 1), 0, record);
                                //END

	                            if (prepend) {
                                    $sourceNode.insertBefore($targetNode);
	                            } else {
	                                $sourceNode.insertAfter($targetNode);
                                }

                                gj.tree.plugins.dragAndDrop.private.refresh($tree, $sourceNode, $targetNode, $sourceParentNode);
	                        }
	                        return false;
	                    }
	                    $targetWrapper.droppable('destroy');
	                });
                }
	        }
	    },

	    refresh: function ($tree, $sourceNode, $targetNode, $sourceParentNode) {
	        var data = $tree.data();
	        gj.tree.plugins.dragAndDrop.private.refreshNode($tree, $targetNode);
	        gj.tree.plugins.dragAndDrop.private.refreshNode($tree, $sourceParentNode);
	        gj.tree.plugins.dragAndDrop.private.refreshNode($tree, $sourceNode);
	        $sourceNode.find('li[data-role="node"]').each(function () {
	            gj.tree.plugins.dragAndDrop.private.refreshNode($tree, $(this));
	        });
	        $targetNode.children('[data-role="wrapper"]').removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);
        },

	    refreshNode: function ($tree, $node) {
	        var $wrapper = $node.children('[data-role="wrapper"]'),
	            $expander = $wrapper.children('[data-role="expander"]'),
	            $spacer = $wrapper.children('[data-role="spacer"]'),
	            $list = $node.children('ul'),
                data = $tree.data(),
	            level = $node.parentsUntil('[data-type="tree"]', 'ul').length;

	        if ($list.length && $list.children().length) {
	            if ($list.is(':visible')) {
	                $expander.empty().append(data.icons.collapse);
	            } else {
	                $expander.empty().append(data.icons.expand);
	            }
	        } else {
	            $expander.empty();
	        }
	        $wrapper.removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);

	        $spacer.css('width', (data.indentation * (level - 1)));
	    }
	},

	public: {
	},

	events: {
	    /**
         * Event fires when the node is dropped.
         * @event nodeDrop
         * @param {object} e - event data
         * @param {string} id - the id of the record
         * @param {object} parentId - the id of the new parend node
         * @param {object} orderNumber - the new order number
         * @example Event.Sample <!-- draggable, droppable, tree -->
         * <div id="tree" data-source="/Locations/Get" data-drag-and-drop="true"></div>
         * <script>
         *     var tree = $('#tree').tree();
         *     tree.on('nodeDrop', function (e, id, parentId, orderNumber) {
         *         var node = tree.getDataById(id),
         *             parent = parentId ? tree.getDataById(parentId) : {};
         *         if (parent.text === 'North America') {
         *             alert('Can\'t add children to North America.');
         *             return false;
         *         } else {
         *             alert(node.text + ' is added to ' + parent.text + ' as ' + orderNumber);
         *             return true;
         *         }
         *     });
         * </script>
         */
	    nodeDrop: function ($tree, id, parentId, orderNumber) {
	        return $tree.triggerHandler('nodeDrop', [id, parentId, orderNumber]);
        }
    },

	configure: function ($tree) {
		$.extend(true, $tree, gj.tree.plugins.dragAndDrop.public);
		if ($tree.data('dragAndDrop') && gj.draggable && gj.droppable) {
			$tree.on('nodeDataBound', function (e, $node) {
				gj.tree.plugins.dragAndDrop.private.nodeDataBound($tree, $node);
			});
		}
	}
};

/** 
 * @widget Tree 
 * @plugin Lazy Loading
 */
gj.tree.plugins.lazyLoading = {
    config: {
        base: {

            paramNames: {

                /** The name of the parameter that is going to send the parent identificator.
                 * Lazy Loading needs to be enabled in order this parameter to be in use.
                 * @alias paramNames.parentId
                 * @type string
                 * @default "parentId"
                 */
                parentId: 'parentId'
            },

            /** Enables lazy loading
              * @type Boolean
              * @default false
              * @example Material.Design <!-- tree -->
              * <div id="tree"></div>
              * <script>
              *     $('#tree').tree({
              *         dataSource: '/Locations/LazyGet',
              *         primaryKey: 'id',
              *         lazyLoading: true
              *     });
              * </script>
              */
            lazyLoading: false
        }
    },

    private: {
        nodeDataBound: function ($tree, $node, id, record) {
            var data = $tree.data(),
                $expander = $node.find('> [data-role="wrapper"] > [data-role="expander"]');

            if (record.hasChildren) {
                $expander.empty().append(data.icons.expand);
            }
        },

        createDoneHandler: function ($tree, $node) {
            return function (response) {
                var i, $expander, $list, data = $tree.data();
                if (typeof (response) === 'string' && JSON) {
                    response = JSON.parse(response);
                }
                if (response && response.length) {
                    $list = $node.children('ul');
                    if ($list.length === 0) {
                        $list = $('<ul />').addClass(data.style.list);
                        $node.append($list);
                    }
                    for (i = 0; i < response.length; i++) {
                        $tree.addNode(response[i], $list);
                    }
                    $expander = $node.find('>[data-role="wrapper"]>[data-role="expander"]'),
                    $expander.attr('data-mode', 'open');
                    $expander.empty().append(data.icons.collapse);
                    gj.tree.events.dataBound($tree);
                }
            };
        },

        expand: function ($tree, $node, id) {
            var ajaxOptions, data = $tree.data(), params = {},
                $children = $node.find('>ul>li');

            if (!$children || !$children.length) {
                if (typeof (data.dataSource) === 'string') {
                    params[data.paramNames.parentId] = id;
                    ajaxOptions = { url: data.dataSource, data: params };
                    if ($tree.xhr) {
                        $tree.xhr.abort();
                    }
                    $tree.xhr = $.ajax(ajaxOptions).done(gj.tree.plugins.lazyLoading.private.createDoneHandler($tree, $node)).fail($tree.createErrorHandler());
                }
            }
        }
    },

    public: {},

    events: {},

    configure: function ($tree, fullConfig, clientConfig) {
        if (clientConfig.lazyLoading) {
            $tree.on('nodeDataBound', function (e, $node, id, record) {
                gj.tree.plugins.lazyLoading.private.nodeDataBound($tree, $node, id, record);
            });
            $tree.on('expand', function (e, $node, id) {
                gj.tree.plugins.lazyLoading.private.expand($tree, $node, id);
            });
        }
    }
};

/* global window alert jQuery */
/** 
 * @widget Checkbox 
 * @plugin Base
 */
gj.checkbox = {
    plugins: {}
};

gj.checkbox.config = {
    base: {
        /** The name of the UI library that is going to be in use. Currently we support only Material Design and Bootstrap. 
         * @additionalinfo The css files for Bootstrap should be manually included to the page if you use bootstrap as uiLibrary.
         * @type string (materialdesign|bootstrap|bootstrap4)
         * @default 'materialdesign'
         * @example Material.Design <!-- checkbox  -->
         * <input type="checkbox" id="checkbox"/><br/><br/>
         * <button onclick="$chkb.state('checked')" class="gj-button-md">Checked</button>
         * <button onclick="$chkb.state('unchecked')" class="gj-button-md">Unchecked</button>
         * <button onclick="$chkb.state('indeterminate')" class="gj-button-md">Indeterminate</button>
         * <button onclick="$chkb.prop('disabled', false)" class="gj-button-md">Enable</button>
         * <button onclick="$chkb.prop('disabled', true)" class="gj-button-md">Disable</button>
         * <script>
         *     var $chkb = $('#checkbox').checkbox({
         *         uiLibrary: 'materialdesign'
         *     });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, checkbox -->
         * <div class="container-fluid" style="margin-top:10px">
         *     <input type="checkbox" id="checkbox"/><br/><br/>
         *     <button onclick="$chkb.state('checked')" class="btn btn-default">Checked</button>
         *     <button onclick="$chkb.state('unchecked')" class="btn btn-default">Unchecked</button>
         *     <button onclick="$chkb.state('indeterminate')" class="btn btn-default">Indeterminate</button>
         *     <button onclick="$chkb.prop('disabled', false)" class="btn btn-default">Enable</button>
         *     <button onclick="$chkb.prop('disabled', true)" class="btn btn-default">Disable</button>
         * </div>
         * <script>
         *     var $chkb = $('#checkbox').checkbox({
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, checkbox -->
         * <div class="container-fluid" style="margin-top:10px">
         *     <input type="checkbox" id="checkbox"/><br/><br/>
         *     <button onclick="$chkb.state('checked')" class="btn btn-default">Checked</button>
         *     <button onclick="$chkb.state('unchecked')" class="btn btn-default">Unchecked</button>
         *     <button onclick="$chkb.state('indeterminate')" class="btn btn-default">Indeterminate</button>
         *     <button onclick="$chkb.prop('disabled', false)" class="btn btn-default">Enable</button>
         *     <button onclick="$chkb.prop('disabled', true)" class="btn btn-default">Disable</button>
         * </div>
         * <script>
         *     var $chkb = $('#checkbox').checkbox({
         *         uiLibrary: 'bootstrap4'
         *     });
         * </script>
         */
        uiLibrary: 'materialdesign',
        
        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.
         * @additionalinfo If you use Bootstrap 3 as uiLibrary, then the iconsLibrary is set to Glyphicons by default.<br/>
         * If you use Material Design as uiLibrary, then the iconsLibrary is set to Material Icons by default.<br/>
         * The css files for Material Icons, Font Awesome or Glyphicons should be manually included to the page where the grid is in use.
         * @type (materialicons|fontawesome|glyphicons)
         * @default 'materialicons'
         * @example Bootstrap.4.FontAwesome <!-- bootstrap4, checkbox, fontawesome -->
         * <div class="container-fluid" style="margin-top:10px">
         *     <input type="checkbox" id="checkbox"/><br/><br/>
         *     <button onclick="$chkb.state('checked')" class="btn btn-default">Checked</button>
         *     <button onclick="$chkb.state('unchecked')" class="btn btn-default">Unchecked</button>
         *     <button onclick="$chkb.state('indeterminate')" class="btn btn-default">Indeterminate</button>
         *     <button onclick="$chkb.prop('disabled', false)" class="btn btn-default">Enable</button>
         *     <button onclick="$chkb.prop('disabled', true)" class="btn btn-default">Disable</button>
         * </div>
         * <script>
         *     var $chkb = $('#checkbox').checkbox({
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome'
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        style: {
            wrapperCssClass: 'gj-checkbox-md',
            spanCssClass: undefined
        }
        
    },

    bootstrap: {
        style: {
            wrapperCssClass: 'gj-checkbox-bootstrap'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapperCssClass: 'gj-checkbox-bootstrap gj-checkbox-bootstrap-4'
        },
        iconsLibrary: 'materialicons'
    },

    materialicons: {
        style: {
            iconsCssClass: 'gj-checkbox-material-icons',
            spanCssClass: 'gj-icon'
        }
    },

    glyphicons: {
        style: {
            iconsCssClass: 'gj-checkbox-glyphicons',
            spanCssClass: ''
        }
    },

    fontawesome: {
        style: {
            iconsCssClass: 'gj-checkbox-fontawesome',
            spanCssClass: 'fa'
        }
    }
};

gj.checkbox.methods = {
    init: function (jsConfig) {
        var $chkb = this;

        gj.widget.prototype.init.call(this, jsConfig, 'checkbox');
        $chkb.attr('data-checkbox', 'true');

        gj.checkbox.methods.initialize($chkb);

        return $chkb;
    },

    initialize: function ($chkb) {
        var data = $chkb.data(), $wrapper, $span;

        if (data.style.wrapperCssClass) {
            $wrapper = $('<label class="' + data.style.wrapperCssClass + ' ' + data.style.iconsCssClass + '"></label>');
            if ($chkb.attr('id')) {
                $wrapper.attr('for', $chkb.attr('id'));
            }
            $chkb.wrap($wrapper);
            $span = $('<span />');
            if (data.style.spanCssClass) {
                $span.addClass(data.style.spanCssClass);
            }
            $chkb.parent().append($span);
        }
    },

    state: function ($chkb, value) {
        if (value) {
            if ('checked' === value) {
                $chkb.prop('indeterminate', false);
                $chkb.prop('checked', true);
            } else if ('unchecked' === value) {
                $chkb.prop('indeterminate', false);
                $chkb.prop('checked', false);
            } else if ('indeterminate' === value) {
                $chkb.prop('checked', true);
                $chkb.prop('indeterminate', true);
            }
            gj.checkbox.events.change($chkb, value);
            return $chkb;
        } else {
            if ($chkb.prop('indeterminate')) {
                value = 'indeterminate';
            } else if ($chkb.prop('checked')) {
                value = 'checked';
            } else {
                value = 'unchecked';
            }
            return value;
        }
    },

    toggle: function ($chkb) {
        if ($chkb.state() == 'checked') {
            $chkb.state('unchecked');
        } else {
            $chkb.state('checked');
        }
        return $chkb;
    },

    destroy: function ($chkb) {
        if ($chkb.attr('data-checkbox') === 'true') {
            $chkb.removeData();
            $chkb.removeAttr('data-guid');
            $chkb.removeAttr('data-checkbox');
            $chkb.off();
            $chkb.next('span').remove();
            $chkb.unwrap();
        }
        return $chkb;
    }
};

gj.checkbox.events = {
    /**
     * Triggered when the state of the checkbox is changed
     *
     * @event change
     * @param {object} e - event data
     * @param {string} state - the data of the checkbox
     * @example sample <!-- checkbox -->
     * <input type="checkbox" id="checkbox"/>
     * <script>
     *     var chkb = $('#checkbox').checkbox({
     *         change: function (e) {
     *             alert('State: ' + chkb.state());
     *         }
     *     });
     * </script>
     */
    change: function ($chkb, state) {
        return $chkb.triggerHandler('change', [state]);
    }
};


gj.checkbox.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.checkbox.methods;

    /** Toogle the state of the checkbox.
     * @method
     * @fires change
     * @return checkbox as jquery object
     * @example sample <!-- checkbox -->
     * <button onclick="$chkb.toggle()" class="gj-button-md">toggle</button>
     * <hr/>
     * <input type="checkbox" id="checkbox"/>
     * <script>
     *     var $chkb = $('#checkbox').checkbox();
     * </script>
     */
    self.toggle = function () {
        return methods.toggle(this);
    };

    /** Return state or set state if you pass parameter.
     * @method
     * @fires change
     * @param {string} value - State of the checkbox. Accept only checked, unchecked or indeterminate as values.
     * @return checked|unchecked|indeterminate|checkbox as jquery object
     * @example sample <!-- checkbox -->
     * <button onclick="$chkb.state('checked')" class="gj-button-md">Set to checked</button>
     * <button onclick="$chkb.state('unchecked')" class="gj-button-md">Set to unchecked</button>
     * <button onclick="$chkb.state('indeterminate')" class="gj-button-md">Set to indeterminate</button>
     * <button onclick="alert($chkb.state())" class="gj-button-md">Get state</button>
     * <hr/>
     * <input type="checkbox" id="checkbox"/>
     * <script>
     *     var $chkb = $('#checkbox').checkbox();
     * </script>
     */
    self.state = function (value) {
        return methods.state(this, value);
    };

    /** Remove checkbox functionality from the element.
     * @method
     * @return checkbox as jquery object
     * @example sample <!-- checkbox -->
     * <button onclick="$chkb.destroy()" class="gj-button-md">Destroy</button>
     * <input type="checkbox" id="checkbox"/>
     * <script>
     *     var $chkb = $('#checkbox').checkbox();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-checkbox')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.checkbox.widget.prototype = new gj.widget();
gj.checkbox.widget.constructor = gj.checkbox.widget;

(function ($) {
    $.fn.checkbox = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.checkbox.widget(this, method);
            } else {
                $widget = new gj.checkbox.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
/* global window alert jQuery */
/** 
 * @widget Editor
 * @plugin Base
 */
gj.editor = {
    plugins: {},
    messages: {}
};

gj.editor.config = {
    base: {

        /** The height of the editor. Numeric values are treated as pixels.
         * @type number|string
         * @default 300
         * @example sample <!-- editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     $('#editor').editor({ height: 400 });
         * </script>
         */
        height: 300,

        /** The width of the editor. Numeric values are treated as pixels.
         * @type number|string
         * @default undefined
         * @example JS <!-- editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     $('#editor').editor({ width: 900 });
         * </script>
         * @example HTML <!-- editor -->
         * <div id="editor" width="900"></div>
         * <script>
         *     $('#editor').editor();
         * </script>
         */
        width: undefined,

        /** The name of the UI library that is going to be in use. Currently we support only Material Design and Bootstrap. 
         * @additionalinfo The css files for Bootstrap should be manually included to the page if you use bootstrap as uiLibrary.
         * @type string (materialdesign|bootstrap|bootstrap4)
         * @default 'materialdesign'
         * @example Material.Design <!-- editor, materialicons  -->
         * <textarea id="editor"></textarea>
         * <script>
         *     $('#editor').editor({ uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     $('#editor').editor({
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     $('#editor').editor({
         *         uiLibrary: 'bootstrap4'
         *     });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons and Font Awesome.
         * @additionalinfo If you use Bootstrap as uiLibrary, then the iconsLibrary is set to font awesome by default.<br/>
         * If you use Material Design as uiLibrary, then the iconsLibrary is set to Material Icons by default.<br/>
         * The css files for Material Icons or Font Awesome should be manually included to the page where the grid is in use.
         * @type (materialicons|fontawesome)
         * @default 'materialicons'
         * @example Bootstrap.4.FontAwesome <!-- bootstrap4, fontawesome, editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     $('#editor').editor({
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome'
         *     });
         * </script>
         * @example Bootstrap.3.FontAwesome <!-- bootstrap, fontawesome, editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     $('#editor').editor({
         *         uiLibrary: 'bootstrap',
         *         iconsLibrary: 'fontawesome'
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example French <!-- editor -->
         * <script src="../../dist/modular/editor/js/messages/messages.fr-fr.js"></script>
         * <div id="editor">Hover buttons in the toolbar in order to see localized tooltips</div>
         * <script>
         *     $("#editor").editor({
         *         locale: 'fr-fr'
         *     });
         * </script>
         * @example German <!-- editor -->
         * <script src="../../dist/modular/editor/js/messages/messages.de-de.js"></script>
         * <div id="editor">Hover <b><u>buttons</u></b> in the toolbar in order to see localized tooltips</div>
         * <script>
         *     $("#editor").editor({
         *         locale: 'de-de'
         *     });
         * </script>
         */
        locale: 'en-us',

        buttons: undefined,

        style: {
            wrapper: 'gj-editor gj-editor-md',
            buttonsGroup: 'gj-button-md-group',
            button: 'gj-button-md',
            buttonActive: 'active'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-editor gj-editor-bootstrap',
            buttonsGroup: 'btn-group',
            button: 'btn btn-default gj-cursor-pointer',
            buttonActive: 'active'
        }
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-editor gj-editor-bootstrap',
            buttonsGroup: 'btn-group',
            button: 'btn btn-outline-secondary gj-cursor-pointer',
            buttonActive: 'active'
        }
    },

    materialicons: {
        icons: {
            bold: '<i class="gj-icon bold" />',
            italic: '<i class="gj-icon italic" />',
            strikethrough: '<i class="gj-icon strikethrough" />',
            underline: '<i class="gj-icon underlined" />',

            listBulleted: '<i class="gj-icon list-bulleted" />',
            listNumbered: '<i class="gj-icon list-numbered" />',
            indentDecrease: '<i class="gj-icon indent-decrease" />',
            indentIncrease: '<i class="gj-icon indent-increase" />',

            alignLeft: '<i class="gj-icon align-left" />',
            alignCenter: '<i class="gj-icon align-center" />',
            alignRight: '<i class="gj-icon align-right" />',
            alignJustify: '<i class="gj-icon align-justify" />',

            undo: '<i class="gj-icon undo" />',
            redo: '<i class="gj-icon redo" />'
        }
    },

    fontawesome: {
        icons: {
            bold: '<i class="fa fa-bold" aria-hidden="true"></i>',
            italic: '<i class="fa fa-italic" aria-hidden="true"></i>',
            strikethrough: '<i class="fa fa-strikethrough" aria-hidden="true"></i>',
            underline: '<i class="fa fa-underline" aria-hidden="true"></i>',

            listBulleted: '<i class="fa fa-list-ul" aria-hidden="true"></i>',
            listNumbered: '<i class="fa fa-list-ol" aria-hidden="true"></i>',
            indentDecrease: '<i class="fa fa-indent" aria-hidden="true"></i>',
            indentIncrease: '<i class="fa fa-outdent" aria-hidden="true"></i>',

            alignLeft: '<i class="fa fa-align-left" aria-hidden="true"></i>',
            alignCenter: '<i class="fa fa-align-center" aria-hidden="true"></i>',
            alignRight: '<i class="fa fa-align-right" aria-hidden="true"></i>',
            alignJustify: '<i class="fa fa-align-justify" aria-hidden="true"></i>',

            undo: '<i class="fa fa-undo" aria-hidden="true"></i>',
            redo: '<i class="fa fa-repeat" aria-hidden="true"></i>'
        }
    }
};

gj.editor.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'editor');
        this.attr('data-editor', 'true');
        gj.editor.methods.initialize(this);
        return this;
    },

    initialize: function ($editor) {
        var self = this, data = $editor.data(),
            $group, $btn, wrapper, $body, $toolbar;

        $editor.hide();

        if ($editor[0].parentElement.attributes.role !== 'wrapper') {
            wrapper = document.createElement('div');
            wrapper.setAttribute('role', 'wrapper');
            $editor[0].parentNode.insertBefore(wrapper, $editor[0]);
            wrapper.appendChild($editor[0]);
        }

        gj.editor.methods.localization(data);
        $(wrapper).addClass(data.style.wrapper);
        if (data.width) {
            $(wrapper).width(data.width);
        }

        $body = $(wrapper).children('div[role="body"]');
        if ($body.length === 0) {
            $body = $('<div role="body"></div>');
            $(wrapper).append($body);
            if ($editor[0].innerText) {
                $body[0].innerHTML = $editor[0].innerText;
            }
        }
        $body.attr('contenteditable', true);
        $body.on('keydown', function (e) {
            var key = event.keyCode || event.charCode;
            if (gj.editor.events.changing($editor) === false && key !== 8 && key !== 46) {
                e.preventDefault();
            }
        });
        $body.on('mouseup keyup mouseout cut paste', function (e) {
            self.updateToolbar($editor, $toolbar);
            gj.editor.events.changed($editor);
            $editor.html($body.html());
        });

        $toolbar = $(wrapper).children('div[role="toolbar"]');
        if ($toolbar.length === 0) {
            $toolbar = $('<div role="toolbar"></div>');
            $body.before($toolbar);

            for (var group in data.buttons) {
                $group = $('<div />').addClass(data.style.buttonsGroup);
                for (var btn in data.buttons[group]) {
                    $btn = $(data.buttons[group][btn]);
                    $btn.on('click', function () {
                        gj.editor.methods.executeCmd($editor, $body, $toolbar, $(this));
                    });
                    $group.append($btn);
                }
                $toolbar.append($group);
            }
        }

        $body.height(data.height - gj.core.height($toolbar[0], true));
    },

    localization: function (data) {
        var msg = gj.editor.messages[data.locale];
        if (typeof (data.buttons) === 'undefined') {
            data.buttons = [
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.bold + '" role="bold">' + data.icons.bold + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.italic + '" role="italic">' + data.icons.italic + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.strikethrough + '" role="strikethrough">' + data.icons.strikethrough + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.underline + '" role="underline">' + data.icons.underline + '</button>'
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.listBulleted + '" role="insertunorderedlist">' + data.icons.listBulleted + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.listNumbered + '" role="insertorderedlist">' + data.icons.listNumbered + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.indentDecrease + '" role="outdent">' + data.icons.indentDecrease + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.indentIncrease + '" role="indent">' + data.icons.indentIncrease + '</button>'
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignLeft + '" role="justifyleft">' + data.icons.alignLeft + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignCenter + '" role="justifycenter">' + data.icons.alignCenter + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignRight + '" role="justifyright">' + data.icons.alignRight + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignJustify + '" role="justifyfull">' + data.icons.alignJustify + '</button>'
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.undo + '" role="undo">' + data.icons.undo + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.redo + '" role="redo">' + data.icons.redo + '</button>'
                ]
            ];
        }
    },

    updateToolbar: function ($editor, $toolbar) {
        var data = $editor.data();
        $buttons = $toolbar.find('[role]').each(function() {
            var $btn = $(this),
                cmd = $btn.attr('role');

            if (cmd && document.queryCommandEnabled(cmd) && document.queryCommandValue(cmd) === "true") {
                $btn.addClass(data.style.buttonActive);
            } else {
                $btn.removeClass(data.style.buttonActive);
            }
        });
    },

    executeCmd: function ($editor, $body, $toolbar, $btn) {
        $body.focus();
        document.execCommand($btn.attr('role'), false);
        gj.editor.methods.updateToolbar($editor, $toolbar);
    },

    content: function ($editor, html) {
        var $body = $editor.parent().children('div[role="body"]');
        if (typeof (html) === "undefined") {
            return $body.html();
        } else {
            return $body.html(html);
        }
    },

    destroy: function ($editor) {
        var $wrapper;
        if ($editor.attr('data-editor') === 'true') {
            $wrapper = $editor.parent();
            $wrapper.children('div[role="body"]').remove();
            $wrapper.children('div[role="toolbar"]').remove();
            $editor.unwrap();
            $editor.removeData();
            $editor.removeAttr('data-guid');
            $editor.removeAttr('data-editor');
            $editor.off();
            $editor.show();
        }
        return $editor;
    }
};

gj.editor.events = {

    /**
     * Event fires before change of text in the editor.
     *
     * @event changing
     * @param {object} e - event data
     * @example MaxLength <!-- editor -->
     * <textarea id="editor"></textarea>
     * <script>
     *     var editor = $('#editor').editor();
     *     editor.on('changing', function (e) {
     *         return $(e.target).text().length < 3;
     *     });
     * </script>
     */
    changing: function ($editor) {
        return $editor.triggerHandler('changing');
    },

    /**
     * Event fires after change of text in the editor.
     *
     * @event changed
     * @param {object} e - event data
     * @example sample <!-- editor -->
     * <textarea id="editor"></textarea>
     * <script>
     *     $('#editor').editor({
     *         changed: function (e) {
     *             alert('changed is fired');
     *         }
     *     });
     * </script>
     */
    changed: function ($editor) {
        return $editor.triggerHandler('changed');
    }
};

gj.editor.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.editor.methods;

    /** Get or set html content in the body.
     * @method
     * @param {string} html - The html content that needs to be set.
     * @return string | editor
     * @example Get <!-- editor, materialicons -->
     * <button class="gj-button-md" onclick="alert($editor.content())">Get Content</button>
     * <hr/>
     * <div id="editor">My <b>content</b>.</div>
     * <script>
     *     var $editor = $('#editor').editor();
     * </script>
     * @example Set <!-- editor, materialicons -->
     * <button class="gj-button-md" onclick="$editor.content('<h1>new value</h1>')">Set Content</button>
     * <hr/>
     * <textarea id="editor"></textarea>
     * <script>
     *     var $editor = $('#editor').editor();
     * </script>
     */
    self.content = function (html) {
        return methods.content(this, html);
    };

    /** Remove editor functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- editor, materialicons -->
     * <button class="gj-button-md" onclick="editor.destroy()">Destroy</button><br/>
     * <textarea id="editor"></textarea>
     * <script>
     *     var editor = $('#editor').editor();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-editor')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.editor.widget.prototype = new gj.widget();
gj.editor.widget.constructor = gj.editor.widget;

(function ($) {
    $.fn.editor = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.editor.widget(this, method);
            } else {
                $widget = new gj.editor.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
gj.editor.messages['en-us'] = {
    bold: 'Bold',
    italic: 'Italic',
    strikethrough: 'Strikethrough',
    underline: 'Underline',
    listBulleted: 'List Bulleted',
    listNumbered: 'List Numbered',
    indentDecrease: 'Indent Decrease',
    indentIncrease: 'Indent Increase',
    alignLeft: 'Align Left',
    alignCenter: 'Align Center',
    alignRight: 'Align Right',
    alignJustify: 'Align Justify',
    undo: 'Undo',
    redo: 'Redo'
};
/* global window alert jQuery gj */
/**
  * @widget DropDown
  * @plugin Base
  */
gj.dropdown = {
    plugins: {}
};

gj.dropdown.config = {
    base: {

        /** The data source of dropdown.
         * @additionalinfo If set to string, then the dropdown is going to use this string as a url for ajax requests to the server.<br />
         * If set to object, then the dropdown is going to use this object as settings for the <a href="http://api.jquery.com/jquery.ajax/" target="_new">jquery ajax</a> function.<br />
         * If set to array, then the dropdown is going to use the array as data for dropdown nodes.
         * @type (string|object|array)
         * @default undefined
         * @example Local.DataSource <!-- dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     $('#dropdown').dropdown({
         *         dataSource: [ { value: 1, text: 'One' }, { value: 2, text: 'Two' }, { value: 3, text: 'Three' } ]
         *     });
         * </script>
         * @example Remote.DataSource <!-- dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     $('#dropdown').dropdown({
         *         dataSource: '/Locations/Get',
         *         valueField: 'id'
         *     });
         * </script>
         */
        dataSource: undefined,

        /** Text field name.
         * @type string
         * @default 'text'
         * @example sample <!-- dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     $('#dropdown').dropdown({
         *         textField: 'newTextField',
         *         dataSource: [ { value: 1, newTextField: 'One' }, { value: 2, newTextField: 'Two' }, { value: 3, newTextField: 'Three' } ]
         *     });
         * </script>
         */
        textField: 'text',

        /** Value field name.
         * @type string
         * @default 'value'
         * @example sample <!-- dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     $('#dropdown').dropdown({
         *         valueField: 'newValueField',
         *         dataSource: [ { newValueField: 1, text: 'One' }, { newValueField: 2, text: 'Two' }, { newValueField: 3, text: 'Three' } ]
         *     });
         * </script>
         */
        valueField: 'value',

        /** Selected field name.
         * @type string
         * @default 'selected'
         * @example sample <!-- dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     $('#dropdown').dropdown({
         *         selectedField: 'newSelectedField',
         *         dataSource: [ { value: 1, text: 'One' }, { value: 2, text: 'Two', newSelectedField: true }, { value: 3, text: 'Three' } ]
         *     });
         * </script>
         */
        selectedField: 'selected',

        /** The width of the dropdown.
         * @type number
         * @default undefined
         * @example JS.Config <!-- dropdown -->
         * <select id="dropdown">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     $('#dropdown').dropdown({ width: 200 });
         * </script>
         * @example HTML.Config <!-- dropdown -->
         * <select id="dropdown" width="200">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     $('#dropdown').dropdown();
         * </script>
         * @example 100.Percent <!-- dropdown -->
         * <select id="dropdown" width="100%">
         *     <option value=""></option>
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     $('#dropdown').dropdown();
         * </script>
         */
        width: undefined,

        /** The maximum height of the dropdown list. When set to auto adjust to the screen height.
         * @type Number|'auto'
         * @default 'auto'
         * @example Auto <!-- dropdown -->
         * <p>Note: Minimize the window in order to enable scrolling for the drop down list.</p>
         * <select id="dropdown" width="200"></select>
         * <script>
         *     $('#dropdown').dropdown({ maxHeight: 'auto', dataSource: '/Locations/GetCountries', valueField: 'id' });
         * </script>
         * @example Fixed <!-- dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     $('#dropdown').dropdown({ maxHeight: 200, dataSource: '/Locations/GetCountries', valueField: 'id' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     $('#dropdown').dropdown({ maxHeight: 200, dataSource: '/Locations/GetCountries', valueField: 'id', uiLibrary: 'bootstrap4' });
         * </script>
         */
        maxHeight: 'auto',

        /** Placeholder. This label appear only if the value is not set yet.
         * @type string
         * @default undefined
         * @example JS.Config <!-- dropdown -->
         * <select id="dropdown"></select>
         * <script>
         *     $('#dropdown').dropdown({ placeholder: 'Select One...', width: 200, dataSource: '/Locations/GetCountries', valueField: 'id' });
         * </script>
         * @example HTML.Config <!-- dropdown -->
         * <input type="text" class="gj-textbox-md" placeholder="Select One..." style="width: 200px" /><br/>
         * <select id="dropdown" placeholder="Select One..." width="200" data-source="/Locations/GetCountries" data-value-field="id"></select>
         * <script>
         *     $('#dropdown').dropdown();
         * </script>
         * @example Bootstrap <!-- bootstrap, dropdown -->
         * <input type="text" class="form-control" placeholder="Select One..." style="width: 200px" /><br/>
         * <select id="dropdown" placeholder="Select One..." width="200" data-source="/Locations/GetCountries" data-value-field="id"></select>
         * <script>
         *     $('#dropdown').dropdown({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, dropdown -->
         * <input type="text" class="form-control" placeholder="Select One..." style="width: 200px" /><br/>
         * <select id="dropdown" placeholder="Select One..." width="200" data-source="/Locations/GetCountries" data-value-field="id"></select>
         * <script>
         *     $('#dropdown').dropdown({ uiLibrary: 'bootstrap4' });
         * </script>
         */
        placeholder: undefined,

        fontSize: undefined,

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- dropdown -->
         * <select id="dropdown" width="200">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     var dropdown = $('#dropdown').dropdown({
         *         uiLibrary: 'materialdesign'
         *     });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, dropdown -->
         * <select id="dropdown" width="200">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     $('#dropdown').dropdown({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, dropdown -->
         * <select id="dropdown" width="200">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     $('#dropdown').dropdown({ uiLibrary: 'bootstrap4', width: 300 });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.
         * @additionalinfo If you use Bootstrap 3 as uiLibrary, then the iconsLibrary is set to Glyphicons by default.<br/>
         * If you use Material Design as uiLibrary, then the iconsLibrary is set to Material Icons by default.<br/>
         * The css files for Material Icons, Font Awesome or Glyphicons should be manually included to the page where the grid is in use.
         * @type (materialicons|fontawesome|glyphicons)
         * @default 'materialicons'
         * @example Bootstrap.Material.Icons <!-- bootstrap, dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     var dropdown = $('#dropdown').dropdown({
         *         dataSource: '/Locations/Get',
         *         uiLibrary: 'bootstrap',
         *         iconsLibrary: 'materialicons',
         *         valueField: 'id'
         *     });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     var dropdown = $('#dropdown').dropdown({
         *         dataSource: '/Locations/Get',
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome',
         *         valueField: 'id'
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        icons: {
            /** DropDown icon definition.
             * @alias icons.dropdown
             * @type String
             * @default '<i class="gj-icon arrow-dropdown" />'
             * @example Custom.Material.Icon <!-- materialicons, dropdown -->
             * <select id="dropdown"></select>
             * <script>
             *     var dropdown = $('#dropdown').dropdown({
             *         dataSource: '/Locations/Get',
             *         valueField: 'id',
             *         width: 200,
             *         icons: { 
             *             dropdown: '<i class="material-icons">keyboard_arrow_down</i>'
             *         }
             *     });
             * </script>
             * @example Custom.Glyphicon.Icon <!-- bootstrap, dropdown -->
             * <select id="dropdown"></select>
             * <script>
             *     var dropdown = $('#dropdown').dropdown({
             *         dataSource: '/Locations/Get',
             *         valueField: 'id',
             *         uiLibrary: 'bootstrap',
             *         width: 200,
             *         icons: { 
             *             dropdown: '<span class="glyphicon glyphicon-triangle-bottom" />'
             *         }
             *     });
             * </script>
             */
            dropdown: '<i class="gj-icon arrow-dropdown" />',

            dropup: '<i class="gj-icon arrow-dropup" />'
        },

        style: {
            wrapper: 'gj-dropdown gj-dropdown-md gj-unselectable',
            list: 'gj-list gj-list-md gj-dropdown-list-md',
            active: 'gj-list-md-active'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-3 gj-unselectable',
            presenter: 'btn btn-default',
            list: 'gj-list gj-list-bootstrap gj-dropdown-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-4 gj-unselectable',
            presenter: 'btn btn-outline-secondary',
            list: 'gj-list gj-list-bootstrap gj-dropdown-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active'
        }
    },

    materialicons: {
        style: {
            expander: 'gj-dropdown-expander-mi'
        }
    },

    fontawesome: {
        icons: {
            dropdown: '<i class="fa fa-caret-down" aria-hidden="true"></i>',
            dropup: '<i class="fa fa-caret-up" aria-hidden="true"></i>'
        },
        style: {
            expander: 'gj-dropdown-expander-fa'
        }
    },

    glyphicons: {
        icons: {
            dropdown: '<span class="caret"></span>',
            dropup: '<span class="dropup"><span class="caret" ></span></span>'
        },
        style: {
            expander: 'gj-dropdown-expander-glyphicons'
        }
    }
};

gj.dropdown.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'dropdown');
        this.attr('data-dropdown', 'true');
        gj.dropdown.methods.initialize(this);
        return this;
    },

    getHTMLConfig: function () {
        var result = gj.widget.prototype.getHTMLConfig.call(this),
            attrs = this[0].attributes;
        if (attrs['placeholder']) {
            result.placeholder = attrs['placeholder'].value;
        }
        return result;
    },

    initialize: function ($dropdown) {
        var $item,
            data = $dropdown.data(),
            $wrapper = $dropdown.parent('div[role="wrapper"]'),
            $display = $('<span role="display"></span>'),
            $expander = $('<span role="expander">' + data.icons.dropdown + '</span>').addClass(data.style.expander),
            $presenter = $('<button role="presenter" type="button"></button>').addClass(data.style.presenter),
            $list = $('<ul role="list" class="' + data.style.list + '"></ul>').attr('guid', $dropdown.attr('data-guid'));

        if ($wrapper.length === 0) {
            $wrapper = $('<div role="wrapper" />').addClass(data.style.wrapper); // The css class needs to be added before the wrapping, otherwise doesn't work.
            $dropdown.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }

        if (data.fontSize) {
            $presenter.css('font-size', data.fontSize);
        }

        $presenter.on('click', function (e) {
            if ($list.is(':visible')) {
                gj.dropdown.methods.close($dropdown, $list);
            } else {
                gj.dropdown.methods.open($dropdown, $list);
            }
        });
        $presenter.on('blur', function (e) {
            setTimeout(function () {
                gj.dropdown.methods.close($dropdown, $list);
            }, 500);
        });
        $presenter.append($display).append($expander);

        $dropdown.hide();
        $dropdown.after($presenter);
        $('body').append($list);
        $list.hide();

        $dropdown.reload();
    },

    setListPosition: function (presenter, list, data) {
        var top, listHeight, presenterHeight, newHeight, listElRect,
            mainElRect = presenter.getBoundingClientRect(),
            scrollY = window.scrollY || window.pageYOffset || 0,
            scrollX = window.scrollX || window.pageXOffset || 0;

        // Reset list size
        list.style.overflow = '';
        list.style.overflowX = '';
        list.style.height = '';

        gj.core.setChildPosition(presenter, list);

        listHeight = gj.core.height(list, true);
        listElRect = list.getBoundingClientRect();
        presenterHeight = gj.core.height(presenter, true);
        if (data.maxHeight === 'auto') {
            if (mainElRect.top < listElRect.top) { // The list is located below the main element
                if (mainElRect.top + listHeight + presenterHeight > window.innerHeight) {
                    newHeight = window.innerHeight - mainElRect.top - presenterHeight - 3;
                }
            } else { // The list is located above the main element                
                if (mainElRect.top - listHeight - 3 > 0) {
                    list.style.top = Math.round(mainElRect.top + scrollY - listHeight - 3) + 'px';
                } else {
                    list.style.top = scrollY + 'px';
                    newHeight = mainElRect.top - 3;
                }
            }
        } else if (!isNaN(data.maxHeight) && data.maxHeight < listHeight) {
            newHeight = data.maxHeight;
        }

        if (newHeight) {
            list.style.overflow = 'scroll';
            list.style.overflowX = 'hidden';
            list.style.height = newHeight + 'px';
        }
    },

    useHtmlDataSource: function ($dropdown, data) {
        var dataSource = [], i, record,
            $options = $dropdown.find('option');
        for (i = 0; i < $options.length; i++) {
            record = {};
            record[data.valueField] = $options[i].value;
            record[data.textField] = $options[i].innerHTML;
            record[data.selectedField] = $dropdown[0].value === $options[i].value;
            dataSource.push(record);
        }
        data.dataSource = dataSource;
    },

    filter: function ($dropdown) {
        var i, record, data = $dropdown.data();
        if (!data.dataSource)
        {
            data.dataSource = [];
        } else if (typeof data.dataSource[0] === 'string') {
            for (i = 0; i < data.dataSource.length; i++) {
                record = {};
                record[data.valueField] = data.dataSource[i];
                record[data.textField] = data.dataSource[i];
                data.dataSource[i] = record;
            }
        }
        return data.dataSource;
    },

    render: function ($dropdown, response) {
        var selections = [],
            data = $dropdown.data(),
            $parent = $dropdown.parent(),
            $list = $('body').children('[role="list"][guid="' + $dropdown.attr('data-guid') + '"]'),
            $presenter = $parent.children('[role="presenter"]'),
            $expander = $presenter.children('[role="expander"]'),
            $display = $presenter.children('[role="display"]');

        $dropdown.data('records', response);
        $dropdown.empty();
        $list.empty();

        if (response && response.length) {
            $.each(response, function () {
                var value = this[data.valueField],
                    text = this[data.textField],
                    selected = this[data.selectedField] && this[data.selectedField].toString().toLowerCase() === 'true',
                    i, $item;

                $item = $('<li value="' + value + '"><div data-role="wrapper"><span data-role="display">' + text + '</span></div></li>');
                $item.addClass(data.style.item);
                $item.on('click', function (e) {
                    gj.dropdown.methods.select($dropdown, value);
                });
                $list.append($item);
                
                $dropdown.append('<option value="' + value + '">' + text + '</option>');

                if (selected) {
                    selections.push(value);
                }
            });
            if (selections.length === 0) {
                $dropdown.prepend('<option value=""></option>');
                $dropdown[0].selectedIndex = 0;
                if (data.placeholder) {
                    $display[0].innerHTML = '<span class="placeholder">' + data.placeholder + '</span>';
                }
            } else {
                for (i = 0; i < selections.length; i++) {
                    gj.dropdown.methods.select($dropdown, selections[i]);
                }
            }
        }

        if (data.width) {
            $parent.css('width', data.width);
            $presenter.css('width', data.width);
        }

        if (data.fontSize) {
            $list.children('li').css('font-size', data.fontSize);
        }

        gj.dropdown.events.dataBound($dropdown);

        return $dropdown;
    },

    open: function ($dropdown, $list) {
        var data = $dropdown.data(),
            $expander = $dropdown.parent().find('[role="expander"]'),
            $presenter = $dropdown.parent().find('[role="presenter"]'),
            scrollParentEl = gj.core.getScrollParent($dropdown[0]);
        $list.css('width', gj.core.width($presenter[0]));
        $list.show();
        gj.dropdown.methods.setListPosition($presenter[0], $list[0], data);
        $expander.html(data.icons.dropup);
        if (scrollParentEl) {
            data.parentScrollHandler = function () {
                gj.dropdown.methods.setListPosition($presenter[0], $list[0], data);
            };
            gj.dropdown.methods.addParentsScrollListener(scrollParentEl, data.parentScrollHandler);
        }
    },

    close: function ($dropdown, $list) {
        var data = $dropdown.data(),
            $expander = $dropdown.parent().find('[role="expander"]'),
            scrollParentEl = gj.core.getScrollParent($dropdown[0]);
        $expander.html(data.icons.dropdown);
        if (scrollParentEl && data.parentScrollHandler) {
            gj.dropdown.methods.removeParentsScrollListener(scrollParentEl, data.parentScrollHandler);
        }
        $list.hide();
    },

    addParentsScrollListener: function (el, handler) {
        var scrollParentEl = gj.core.getScrollParent(el.parentNode);
        el.addEventListener('scroll', handler);
        if (scrollParentEl) {
            gj.dropdown.methods.addParentsScrollListener(scrollParentEl, handler);
        }
    },

    removeParentsScrollListener: function (el, handler) {
        var scrollParentEl = gj.core.getScrollParent(el.parentNode);
        el.removeEventListener('scroll', handler);
        if (scrollParentEl) {
            gj.dropdown.methods.removeParentsScrollListener(scrollParentEl, handler);
        }
    },

    select: function ($dropdown, value) {
        var data = $dropdown.data(),
            $list = $('body').children('[role="list"][guid="' + $dropdown.attr('data-guid') + '"]'),
            $item = $list.children('li[value="' + value + '"]'),
            $display = $dropdown.next('[role="presenter"]').find('[role="display"]'),
            record = gj.dropdown.methods.getRecordByValue($dropdown, value);

        $list.children('li').removeClass(data.style.active);
        if (record) {
            $item.addClass(data.style.active);
            $dropdown[0].value = value;
            $display[0].innerHTML = record[data.textField];
        } else {
            if (data.placeholder) {
                $display[0].innerHTML = '<span class="placeholder">' + data.placeholder + '</span>';
            }
            $dropdown[0].value = '';
        }
        gj.dropdown.events.change($dropdown);
        gj.dropdown.methods.close($dropdown, $list);
        return $dropdown;
    },

    getRecordByValue: function ($dropdown, value) {
        var data = $dropdown.data(),
            i, result = undefined;

        for (i = 0; i < data.records.length; i++) {
            if (data.records[i][data.valueField] === value) {
                result = data.records[i];
                break;
            }
        }

        return result;
    },

    value: function ($dropdown, value) {
        if (typeof (value) === "undefined") {
            return $dropdown.val();
        } else {
            gj.dropdown.methods.select($dropdown, value);
            return $dropdown;
        }
    },

    destroy: function ($dropdown) {
        var data = $dropdown.data(),
            $parent = $dropdown.parent('div[role="wrapper"]');
        if (data) {
            $dropdown.xhr && $dropdown.xhr.abort();
            $dropdown.off();
            $dropdown.removeData();
            $dropdown.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-dropdown');
            $dropdown.removeClass();
            if ($parent.length > 0) {
                $parent.children('[role="presenter"]').remove();
                $parent.children('[role="list"]').remove();
                $dropdown.unwrap();
            }
            $dropdown.show();
        }
        return $dropdown;
    }
};

gj.dropdown.events = {
    /**
     * Triggered when the dropdown value is changed.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- dropdown, materialicons -->
     * <select id="dropdown" width="200">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     $('#dropdown').dropdown({
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function ($dropdown) {
        return $dropdown.triggerHandler('change');
    },

    /**
     * Event fires after the loading of the data in the dropdown.
     * @event dataBound
     * @param {object} e - event data
     * @example sample <!-- dropdown, materialicons -->
     * <select id="dropdown" width="200">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     $('#dropdown').dropdown({
     *         dataBound: function (e) {
     *             alert('dataBound is fired.');
     *         }
     *     });
     * </script>
     */
    dataBound: function ($dropdown) {
        return $dropdown.triggerHandler('dataBound');
    }
};

gj.dropdown.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.dropdown.methods;

    /** Gets or sets the value of the DropDown.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- dropdown, materialicons -->
     * <button class="gj-button-md" onclick="alert($dropdown.value())">Get Value</button>
     * <hr/>
     * <select id="dropdown" width="200">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     var $dropdown = $('#dropdown').dropdown();
     * </script>
     * @example Set <!-- dropdown, materialicons -->
     * <button class="gj-button-md" onclick="$dropdown.value('3')">Set Value</button>
     * <hr/>
     * <select id="dropdown" width="200">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     var $dropdown = $('#dropdown').dropdown();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    self.enable = function () {
        return methods.enable(this);
    };

    self.disable = function () {
        return methods.disable(this);
    };

    /** Remove dropdown functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- dropdown, materialicons -->
     * <button class="gj-button-md" onclick="dropdown.destroy()">Destroy</button>
     * <select id="dropdown" width="200">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     var dropdown = $('#dropdown').dropdown();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-dropdown')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.dropdown.widget.prototype = new gj.widget();
gj.dropdown.widget.constructor = gj.dropdown.widget;

gj.dropdown.widget.prototype.getHTMLConfig = gj.dropdown.methods.getHTMLConfig;

(function ($) {
    $.fn.dropdown = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.dropdown.widget(this, method);
            } else {
                $widget = new gj.dropdown.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
/* global window alert jQuery gj */
/**
  * @widget DatePicker
  * @plugin Base
  */
gj.datepicker = {
    plugins: {}
};

gj.datepicker.config = {
    base: {
        /** Whether to display dates in other months at the start or end of the current month.
         * @additionalinfo Set to true by default for Bootstrap.
         * @type Boolean
         * @default false
         * @example True <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    var datepicker = $('#datepicker').datepicker({ 
         *        showOtherMonths: true
         *    });
         * </script>
         * @example False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     $('#datepicker').datepicker({
         *         showOtherMonths: false
         *     });
         * </script>
         */
        showOtherMonths: false,

        /** Whether days in other months shown before or after the current month are selectable.
         * This only applies if the showOtherMonths option is set to true.
         * @type Boolean
         * @default true
         * @example True <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        showOtherMonths: true,
         *        selectOtherMonths: true
         *    });
         * </script>
         * @example False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     $('#datepicker').datepicker({ 
         *        showOtherMonths: true,
         *        selectOtherMonths: false
         *     });
         * </script>
         */
        selectOtherMonths: true,

        /** The width of the datepicker.
         * @type number
         * @default undefined
         * @example JS.Config <!-- datepicker -->
         * <input id="datepicker" />
         * <script>
         *    $('#datepicker').datepicker({ width: 312 });
         * </script>
         * @example HTML.Config <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker();
         * </script>
         */
        width: undefined,

        /** The minimum selectable date. When not set, there is no minimum.
         * @additionalinfo If the minDate is set by string, then the date in the string needs to follow the format specified by the 'format' configuration option.
         * @type Date|String|Function
         * @default undefined
         * @example Today <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    var today, datepicker;
         *    today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
         *    datepicker = $('#datepicker').datepicker({
         *        minDate: today
         *    });
         * </script>
         * @example Yesterday <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     $('#datepicker').datepicker({
         *        minDate: function() {
         *            var date = new Date();
         *            date.setDate(date.getDate()-1);
         *            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
         *        }
         *     });
         * </script>
         * @example Bootstrap <!-- bootstrap, datepicker -->
         * <input id="datepicker" width="220" />
         * <script>
         *     $('#datepicker').datepicker({
         *        format: 'yyyy-mm-dd',
         *        value: '2017-12-15',
         *        minDate: '2017-12-12',
         *        uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     $('#datepicker').datepicker({
         *        value: '12/15/2017',
         *        minDate: '12/12/2017',
         *        uiLibrary: 'bootstrap4'
         *     });
         * </script>
         */
        minDate: undefined,

        /** The maximum selectable date. When not set, there is no maximum
         * @type Date|String|Function
         * @default undefined
         * @example Today <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    var today, datepicker;
         *    today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
         *    datepicker = $('#datepicker').datepicker({
         *        maxDate: today
         *    });
         * </script>
         * @example Tomorrow <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     $('#datepicker').datepicker({ 
         *        maxDate: function() {
         *            var date = new Date();
         *            date.setDate(date.getDate()+1);
         *            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
         *        }
         *     });
         * </script>
         */
        maxDate: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.
         * @additionalinfo <b>d</b> - Day of the month as digits; no leading zero for single-digit days.<br/>
         * <b>dd</b> - Day of the month as digits; leading zero for single-digit days.<br/>
         * <b>ddd</b> - Day of the week as a three-letter abbreviation.<br/>
         * <b>dddd</b> - Day of the week as its full name.<br/>
         * <b>m</b> - Month as digits; no leading zero for single-digit months.<br/>
         * <b>mm</b> - Month as digits; leading zero for single-digit months.<br/>
         * <b>mmm</b> - Month as a three-letter abbreviation.<br/>
         * <b>mmmm</b> - Month as its full name.<br/>
         * <b>yy</b> - Year as last two digits; leading zero for years less than 10.<br/>
         * <b>yyyy</b> - Year represented by four digits.<br/>
         * @type String
         * @default 'mm/dd/yyyy'
         * @example Sample <!-- datepicker -->
         * <input id="datepicker" value="2017-25-07" width="312" />
         * <script>
         *     $('#datepicker').datepicker({ format: 'yyyy-dd-mm' });
         * </script>
         * @example Short.Month.Format <!-- datepicker -->
         * <input id="datepicker" value="10 Oct 2017" width="312" />
         * <script>
         *     $('#datepicker').datepicker({ format: 'dd mmm yyyy' });
         * </script>
         * @example Long.Month.Format <!-- datepicker -->
         * <input id="datepicker" value="10 October 2017" width="312" />
         * <script>
         *     $('#datepicker').datepicker({ format: 'dd mmmm yyyy' });
         * </script>
         */
        format: 'mm/dd/yyyy',

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    var datepicker = $('#datepicker').datepicker({ uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, datepicker -->
         * <input id="datepicker" width="220" />
         * <script>
         *     $('#datepicker').datepicker({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4.Material.Icons <!-- bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     $('#datepicker').datepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'materialicons' });
         * </script>
         * @example Bootstrap.4.FontAwesome <!-- fontawesome, bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     $('#datepicker').datepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.
         * @additionalinfo If you use Bootstrap 3 as uiLibrary, then the iconsLibrary is set to Glyphicons by default.<br/>
         * If you use Material Design as uiLibrary, then the iconsLibrary is set to Material Icons by default.<br/>
         * The css files for Material Icons, Font Awesome or Glyphicons should be manually included to the page where the grid is in use.
         * @type (materialicons|fontawesome|glyphicons)
         * @default 'materialicons'
         * @example Bootstrap.Font.Awesome <!-- bootstrap, fontawesome, datepicker -->
         * <input id="datepicker" width="220" />
         * <script>
         *     $('#datepicker').datepicker({
         *         uiLibrary: 'bootstrap',
         *         iconsLibrary: 'fontawesome'
         *     });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     $('#datepicker').datepicker({
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome'
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        /** The initial datepicker value.
         * @type String
         * @default undefined
         * @example Javascript <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        value: '01/01/2018'
         *    });
         * </script>
         * @example HTML <!-- datepicker -->
         * <input id="datepicker" width="312" value="01/01/2018" />
         * <script>
         *     $('#datepicker').datepicker();
         * </script>
         */
        value: undefined,

        /** Day of the week start. 0 (Sunday) to 6 (Saturday)
         * @type Number
         * @default 0
         * @example Monday <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        weekStartDay: 1
         *    });
         * </script>
         * @example Saturday <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        weekStartDay: 6
         *    });
         * </script>
         */
        weekStartDay: 0,

        /** An array or function that will be used to determine which dates to be disabled for selection by the widget.
         * @type Array|Function
         * @default undefined
         * @example Array <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        value: '11/10/2017',
         *        disableDates: [new Date(2017,10,11), '11/12/2017']
         *    });
         * </script>
         * @example Function <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        value: '11/11/2017',
         *        disableDates:  function (date) {
         *            var disabled = [10,15,20,25];
         *            if (disabled.indexOf(date.getDate()) == -1 ) {
         *                return true;
         *            } else {
         *                return false;
         *            }
         *        }
         *    });
         * </script>
         */
        disableDates: undefined,

        /** An array that will be used to determine which days of week to be disabled for selection by the widget.
         * The array needs to contains only numbers where 0 is Sunday, 1 is Monday and etc.
         * @type Array
         * @default undefined
         * @example Saturday.Sunday <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        disableDaysOfWeek: [0, 6]
         *    });
         * </script>
         */
        disableDaysOfWeek: undefined,

        /** Whether to display week number in year on the left side of the calendar.
         * @type Boolean
         * @default false
         * @example Material.Design <!-- datepicker -->
         * <input id="datepicker" width="356" />
         * <script>
         *    $('#datepicker').datepicker({ calendarWeeks: true, modal: true, footer: true });
         * </script>
         * @example Bootstrap <!-- datepicker, bootstrap -->
         * <input id="datepicker" width="220" />
         * <script>
         *    $('#datepicker').datepicker({ calendarWeeks: true, uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *    $('#datepicker').datepicker({ calendarWeeks: true, uiLibrary: 'bootstrap4' });
         * </script>
         */
        calendarWeeks: false,

        /** Whether to enable keyboard navigation.
         * @type Boolean
         * @default true
         * @example Material.Design <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        keyboardNavigation: true
         *    });
         * </script>
         * @example Material.Design.Modal <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ keyboardNavigation: true, modal: true, header: true, footer: true });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *    $('#datepicker').datepicker({
         *        uiLibrary: 'bootstrap4',
         *        keyboardNavigation: true,
         *        showOtherMonths: true
         *    });
         * </script>
         */
        keyboardNavigation: true,

        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'de-de',
         *        format: 'dd mmm yyyy'
         *    });
         * </script>
         * @example Bulgarian <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'bg-bg',
         *        format: 'dd mmm yyyy',
         *        weekStartDay: 1
         *    });
         * </script>
         * @example French <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'fr-fr',
         *        format: 'dd mmm yyyy'
         *    });
         * </script>
         * @example Brazil <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'pt-br',
         *        format: 'dd mmm yyyy'
         *    });
         * </script>
         * @example Russian <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'ru-ru',
         *        format: 'dd mmm yyyy'
         *    });
         * </script>
         * @example Spanish <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'es-es',
         *        format: 'dd/mm/yyyy'
         *    });
         * </script>
         * @example Italian <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'it-it',
         *        format: 'dd/mm/yyyy'
         *    });
         * </script>
         * @example Japanise <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'ja-jp',
         *        format: 'dd mmmm yyyy'
         *    });
         * </script>
         * @example Chinise_Simplified <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'zh-cn',
         *        format: 'dd mmmm yyyy'
         *    });
         * </script>
         * @example Chinise_Traditional <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'zh-tw',
         *        format: 'dd mmmm yyyy'
         *    });
         * </script>
         */
        locale: 'en-us',

        icons: {
            /** datepicker icon definition.
             * @alias icons.rightIcon
             * @type String
             * @default '<i class="gj-icon event" />'
             * @example Custom.Material.Icon <!-- materialicons, datepicker -->
             * <input id="datepicker" width="312" />
             * <script>
             *     $('#datepicker').datepicker({
             *         icons: { 
             *             rightIcon: '<i class="material-icons">date_range</i>'
             *         }
             *     });
             * </script>
             * @example Custom.Glyphicon.Icon <!-- bootstrap, datepicker -->
             * <input id="datepicker" width="220" />
             * <script>
             *     $('#datepicker').datepicker({
             *         uiLibrary: 'bootstrap',
             *         icons: {
             *             rightIcon: '<span class="glyphicon glyphicon-chevron-down"></span>'
             *         }
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, materialicons, datepicker -->
             * <input id="datepicker" width="234" />
             * <script>
             *     $('#datepicker').datepicker({
             *         uiLibrary: 'bootstrap4',
             *         icons: {
             *             rightIcon: '<i class="material-icons">date_range</i>'
             *         }
             *     });
             * </script>
             */
            rightIcon: '<i class="gj-icon">event</i>',

            previousMonth: '<i class="gj-icon chevron-left"></i>',
            nextMonth: '<i class="gj-icon chevron-right"></i>'
        },

        fontSize: undefined,

        /** The size of the datepicker input.
         * @type 'small'|'default'|'large'
         * @default 'default'
         * @example Bootstrap.4 <!-- bootstrap4, datepicker -->
         * <p><label for="datepicker-small">Small Size:</label> <input id="datepicker-small" width="234" value="03/20/2018" /></p>
         * <p><label for="datepicker-default">Default Size:</label> <input id="datepicker-default" width="234" value="03/20/2018" /></p>
         * <p><label for="datepicker-large">Large Size:</label> <input id="datepicker-large" width="234" value="03/20/2018" /></p>
         * <script>
         *     $('#datepicker-small').datepicker({ uiLibrary: 'bootstrap4', size: 'small' });
         *     $('#datepicker-default').datepicker({ uiLibrary: 'bootstrap4', size: 'default' });
         *     $('#datepicker-large').datepicker({ uiLibrary: 'bootstrap4', size: 'large' });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, datepicker -->
         * <p><label for="datepicker-small">Small Size:</label> <input id="datepicker-small" width="234" value="03/20/2018" /></p>
         * <p><label for="datepicker-default">Default Size:</label> <input id="datepicker-default" width="234" value="03/20/2018" /></p>
         * <p><label for="datepicker-large">Large Size:</label> <input id="datepicker-large" width="234" value="03/20/2018" /></p>
         * <script>
         *     $('#datepicker-small').datepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'small' });
         *     $('#datepicker-default').datepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'default' });
         *     $('#datepicker-large').datepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'large' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, datepicker -->
         * <p><label for="datepicker-small">Small Size:</label> <input id="datepicker-small" width="220" value="03/20/2018" /></p>
         * <p><label for="datepicker-default">Default Size:</label> <input id="datepicker-default" width="220" value="03/20/2018" /></p>
         * <p><label for="datepicker-large">Large Size:</label> <input id="datepicker-large" width="220" value="03/20/2018" /></p>
         * <script>
         *     $('#datepicker-small').datepicker({ uiLibrary: 'bootstrap', size: 'small' });
         *     $('#datepicker-default').datepicker({ uiLibrary: 'bootstrap', size: 'default' });
         *     $('#datepicker-large').datepicker({ uiLibrary: 'bootstrap', size: 'large' });
         * </script>
         * @example Material.Design <!-- datepicker -->
         * <p><label for="datepicker-small">Small Size:</label> <input id="datepicker-small" width="276" value="03/20/2018" /></p>
         * <p><label for="datepicker-default">Default Size:</label> <input id="datepicker-default" width="276" value="03/20/2018" /></p>
         * <p><label for="datepicker-large">Large Size:</label> <input id="datepicker-large" width="276" value="03/20/2018" /></p>
         * <script>
         *     $('#datepicker-small').datepicker({ size: 'small' });
         *     $('#datepicker-default').datepicker({ size: 'default' });
         *     $('#datepicker-large').datepicker({ size: 'large' });
         * </script>
         */
        size: 'default',

        /** If set to true, the datepicker will have modal behavior.
         * @type Boolean
         * @default false
         * @example Material.Design <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ modal: true });
         * </script>
         * @example Bootstrap <!-- bootstrap, datepicker -->
         * <input id="datepicker" width="220" />
         * <script>
         *    $('#datepicker').datepicker({ uiLibrary: 'bootstrap', modal: true, header: true, footer: true });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *    $('#datepicker').datepicker({ uiLibrary: 'bootstrap4', modal: true, header: true, footer: true });
         * </script>
         */
        modal: false,

        /** If set to true, add header to the datepicker.
         * @type Boolean
         * @default false
         * @example True <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ header: true, modal: true, footer: true });
         * </script>
         * @example False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ header: false });
         * </script>
         */
        header: false,

        /** If set to true, add footer with ok and cancel buttons to the datepicker.
         * @type Boolean
         * @default false
         * @example True <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ footer: true, modal: true, header: true });
         * </script>
         * @example False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ footer: false });
         * </script>
         */
        footer: false,

        /** If set to true, show datepicker on input focus.
         * @type Boolean
         * @default true
         * @example True <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ showOnFocus: true, showRightIcon: false });
         * </script>
         * @example False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ showOnFocus: false });
         * </script>
         */
        showOnFocus: true,

        /** If set to true, show datepicker icon on the right side of the input.
         * @type Boolean
         * @default true
         * @example False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ showOnFocus: true, showRightIcon: false });
         * </script>
         * @example True <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ showRightIcon: true });
         * </script>
         */
        showRightIcon: true,

        style: {
            modal: 'gj-modal',
            wrapper: 'gj-datepicker gj-datepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            calendar: 'gj-picker gj-picker-md datepicker gj-unselectable',
            footer: '',
            button: 'gj-button-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-picker gj-picker-bootstrap datepicker gj-unselectable',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        iconsLibrary: 'glyphicons',
        showOtherMonths: true
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-picker gj-picker-bootstrap datepicker gj-unselectable',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        showOtherMonths: true
    },

    fontawesome: {
        icons: {
            rightIcon: '<i class="fa fa-calendar" aria-hidden="true"></i>',
            previousMonth: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
            nextMonth: '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        icons: {
            rightIcon: '<span class="glyphicon glyphicon-calendar"></span>',
            previousMonth: '<span class="glyphicon glyphicon-chevron-left"></span>',
            nextMonth: '<span class="glyphicon glyphicon-chevron-right"></span>'
        }
    }
};

gj.datepicker.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'datepicker');
        this.attr('data-datepicker', 'true');
        gj.datepicker.methods.initialize(this, this.data());
        return this;
    },

    initialize: function ($datepicker, data) {
        var $calendar, $rightIcon,
            $wrapper = $datepicker.parent('div[role="wrapper"]');

        if ($wrapper.length === 0) {
            $wrapper = $('<div role="wrapper" />').addClass(data.style.wrapper); // The css class needs to be added before the wrapping, otherwise doesn't work.
            $datepicker.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }
        $wrapper = $datepicker.parent('div[role="wrapper"]');

        data.width && $wrapper.css('width', data.width);

        $datepicker.val(data.value).addClass(data.style.input).attr('role', 'input');

        data.fontSize && $datepicker.css('font-size', data.fontSize);
        
        if (data.uiLibrary === 'bootstrap' || data.uiLibrary === 'bootstrap4') {
            if (data.size === 'small') {
                $wrapper.addClass('input-group-sm');
                $datepicker.addClass('form-control-sm');
            } else if (data.size === 'large') {
                $wrapper.addClass('input-group-lg');
                $datepicker.addClass('form-control-lg');
            }
        } else {
            if (data.size === 'small') {
                $wrapper.addClass('small');
            } else if (data.size === 'large') {
                $wrapper.addClass('large');
            }
        }

        if (data.showRightIcon) {
            if (data.uiLibrary === 'bootstrap') {
                $rightIcon = $('<span class="input-group-addon">' + data.icons.rightIcon + '</span>');
            } else if (data.uiLibrary === 'bootstrap4') {
                $rightIcon = $('<span class="input-group-append"><button class="btn btn-outline-secondary border-left-0" type="button">' + data.icons.rightIcon + '</button></span>');
            } else {
                $rightIcon = $(data.icons.rightIcon);
            }
            $rightIcon.attr('role', 'right-icon');
            $rightIcon.on('click', function (e) {
                var $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
                if ($calendar.is(':visible')) {
                    gj.datepicker.methods.close($datepicker);
                } else {
                    gj.datepicker.methods.open($datepicker, data);
                }
            });
            $wrapper.append($rightIcon);
        }

        if (data.showOnFocus) {
            $datepicker.on('focus', function () {
                gj.datepicker.methods.open($datepicker, data);
            });
        }

        $calendar = gj.datepicker.methods.createCalendar($datepicker, data);

        if (data.footer !== true) {
            $datepicker.on('blur', function () {
                $datepicker.timeout = setTimeout(function () {
                    gj.datepicker.methods.close($datepicker);
                }, 500);
            });
            $calendar.mousedown(function () {
                clearTimeout($datepicker.timeout);
                document.activeElement !== $datepicker[0] && $datepicker.focus();
                return false;
            });
            $calendar.on('click', function () {
                clearTimeout($datepicker.timeout);
                document.activeElement !== $datepicker[0] && $datepicker.focus();
            });
        }

        if (data.keyboardNavigation) {
            $(document).on('keydown', gj.datepicker.methods.createKeyDownHandler($datepicker, $calendar, data));
        }
    },

    createCalendar: function ($datepicker, data) {
        var date, $body, $footer, $btnCancel, $btnOk,
            $calendar = $('<div role="calendar" type="month"/>').addClass(data.style.calendar).attr('guid', $datepicker.attr('data-guid'));
        
        data.fontSize && $calendar.css('font-size', data.fontSize);

        date = gj.core.parseDate(data.value, data.format, data.locale);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            $datepicker.attr('day', date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());
        }

        $calendar.attr('month', date.getMonth());
        $calendar.attr('year', date.getFullYear());

        gj.datepicker.methods.renderHeader($datepicker, $calendar, data, date);

        $body = $('<div role="body" />');
        $calendar.append($body);

        if (data.footer) {
            $footer = $('<div role="footer" class="' + data.style.footer + '" />');

            $btnCancel = $('<button class="' + data.style.button + '">' + gj.core.messages[data.locale].cancel + '</button>');
            $btnCancel.on('click', function () { $datepicker.close(); });
            $footer.append($btnCancel);

            $btnOk = $('<button class="' + data.style.button + '">' + gj.core.messages[data.locale].ok + '</button>');
            $btnOk.on('click', function () {
                var date, dayArr, dayStr = $calendar.attr('selectedDay');
                if (dayStr) {
                    dayArr = dayStr.split('-');
                    date = new Date(dayArr[0], dayArr[1], dayArr[2], $calendar.attr('hour') || 0, $calendar.attr('minute') || 0);
                    gj.datepicker.methods.change($datepicker, $calendar, data, date);
                } else {
                    $datepicker.close();
                }
            });
            $footer.append($btnOk);

            $calendar.append($footer);
        }

        $calendar.hide();
        $('body').append($calendar);

        if (data.modal) {
            $calendar.wrapAll('<div role="modal" class="' + data.style.modal + '"/>');
            gj.core.center($calendar);
        }

        return $calendar;
    },

    renderHeader: function ($datepicker, $calendar, data, date) {
        var $header, $date, $year;

        if (data.header) {
            $header = $('<div role="header" />');
            $year = $('<div role="year" />').on('click', function () {
                gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
                $year.addClass('selected');
                $date.removeClass('selected');
            });
            $year.html(gj.core.formatDate(date, 'yyyy', data.locale));
            $header.append($year);
            $date = $('<div role="date" class="selected" />').on('click', function () {
                gj.datepicker.methods.renderMonth($datepicker, $calendar, data);
                $date.addClass('selected');
                $year.removeClass('selected');
            });
            $date.html(gj.core.formatDate(date, 'ddd, mmm dd', data.locale));
            $header.append($date);
            $calendar.append($header);
        }
    },

    updateHeader: function ($calendar, data, date) {
        $calendar.find('[role="header"] [role="year"]').removeClass('selected').html(gj.core.formatDate(date, 'yyyy', data.locale));
        $calendar.find('[role="header"] [role="date"]').addClass('selected').html(gj.core.formatDate(date, 'ddd, mmm dd', data.locale));
        $calendar.find('[role="header"] [role="hour"]').removeClass('selected').html(gj.core.formatDate(date, 'HH', data.locale));
        $calendar.find('[role="header"] [role="minute"]').removeClass('selected').html(gj.core.formatDate(date, 'MM', data.locale));
    },

    createNavigation: function ($datepicker, $body, $table, data) {
        var $row, $navigator, $thead = $('<thead/>');

        $navigator = $('<div role="navigator" />');
        $navigator.append($('<div>' + data.icons.previousMonth + '</div>').on('click', gj.datepicker.methods.prev($datepicker, data)));
        $navigator.append($('<div role="period"></div>').on('click', gj.datepicker.methods.changePeriod($datepicker, data)));
        $navigator.append($('<div>' + data.icons.nextMonth + '</div>').on('click', gj.datepicker.methods.next($datepicker, data)));
        $body.append($navigator);
        
        $row = $('<tr role="week-days" />');
        if (data.calendarWeeks) {
            $row.append('<th><div>&nbsp;</div></th>');
        }
        for (i = data.weekStartDay; i < gj.core.messages[data.locale].weekDaysMin.length; i++) {
            $row.append('<th><div>' + gj.core.messages[data.locale].weekDaysMin[i] + '</div></th>');
        }
        for (i = 0; i < data.weekStartDay; i++) {
            $row.append('<th><div>' + gj.core.messages[data.locale].weekDaysMin[i] + '</div></th>');
        }
        $thead.append($row);

        $table.append($thead);
    },

    renderMonth: function ($datepicker, $calendar, data) {
        var weekDay, selectedDay, day, month, year, daysInMonth, total, firstDayPosition, i, now, prevMonth, nextMonth, $cell, $day, date,
            $body = $calendar.children('[role="body"]'),
            $table = $('<table/>'),
            $tbody = $('<tbody/>'),
            period = gj.core.messages[data.locale].titleFormat;
        
        $body.off().empty();
        gj.datepicker.methods.createNavigation($datepicker, $body, $table, data);
        
        month = parseInt($calendar.attr('month'), 10);
        year = parseInt($calendar.attr('year'), 10);

        $calendar.attr('type', 'month');
        period = period.replace('mmmm', gj.core.messages[data.locale].monthNames[month]).replace('yyyy', year);
        $calendar.find('div[role="period"]').text(period);
        daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        if (year % 4 == 0 && year != 1900) {
            daysInMonth[1] = 29;
        }
        total = daysInMonth[month];

        firstDayPosition = (new Date(year, month, 1).getDay() + 7 - data.weekStartDay) % 7;

        weekDay = 0;
        $row = $('<tr />');
        prevMonth = gj.datepicker.methods.getPrevMonth(month, year);
        for (i = 1; i <= firstDayPosition; i++) {
            day = (daysInMonth[prevMonth.month] - firstDayPosition + i);
            date = new Date(prevMonth.year, prevMonth.month, day);
            if (data.calendarWeeks && i === 1) {
                $row.append('<td class="calendar-week"><div>' + gj.datepicker.methods.getWeekNumber(date) + '</div></td>');
            }
            $cell = $('<td class="other-month" />');
            if (data.showOtherMonths) {
                $day = $('<div>' + day + '</div>');
                $cell.append($day);
                if (data.selectOtherMonths && gj.datepicker.methods.isSelectable(data, date)) {
                    $cell.addClass('gj-cursor-pointer').attr('day', day).attr('month', prevMonth.month).attr('year', prevMonth.year);
                    $day.on('click', gj.datepicker.methods.dayClickHandler($datepicker, $calendar, data, date));
                    $day.on('mousedown', function (e) { e.stopPropagation() });
                } else {
                    $cell.addClass('disabled');
                }
            }
            $row.append($cell);
            weekDay++;
        }
        if (i > 1) {
            $tbody.append($row);
        }

        now = new Date();
        for (i = 1; i <= total; i++) {
            date = new Date(year, month, i);
            if (weekDay == 0) {
                $row = $('<tr>');
                if (data.calendarWeeks) {
                    $row.append('<td class="calendar-week"><div>' + gj.datepicker.methods.getWeekNumber(date) + '</div></td>');
                }
            }
            $cell = $('<td day="' + i + '" month="' + month + '" year="' + year + '" />');
            if (year === now.getFullYear() && month === now.getMonth() && i === now.getDate()) {
                $cell.addClass('today');
            } else {
                $cell.addClass('current-month');
            }
            $day = $('<div>' + i + '</div>');
            if (gj.datepicker.methods.isSelectable(data, date)) {
                $cell.addClass('gj-cursor-pointer');
                $day.on('click', gj.datepicker.methods.dayClickHandler($datepicker, $calendar, data, date));
                $day.on('mousedown', function (e) { e.stopPropagation() });
            } else {
                $cell.addClass('disabled');
            }
            $cell.append($day);
            $row.append($cell);
            weekDay++;
            if (weekDay == 7) {
                $tbody.append($row);
                weekDay = 0;
            }
        }

        nextMonth = gj.datepicker.methods.getNextMonth(month, year);
        for (i = 1; weekDay != 0; i++) {
            date = new Date(nextMonth.year, nextMonth.month, i);
            $cell = $('<td class="other-month" />');
            if (data.showOtherMonths) {
                $day = $('<div>' + i + '</div>');
                if (data.selectOtherMonths && gj.datepicker.methods.isSelectable(data, date)) {
                    $cell.addClass('gj-cursor-pointer').attr('day', i).attr('month', nextMonth.month).attr('year', nextMonth.year);
                    $day.on('click', gj.datepicker.methods.dayClickHandler($datepicker, $calendar, data, date));
                    $day.on('mousedown', function (e) { e.stopPropagation() });
                } else {
                    $cell.addClass('disabled');
                }
                $cell.append($day);
            }
            $row.append($cell);
            weekDay++;
            if (weekDay == 7) {
                $tbody.append($row);
                weekDay = 0;
            }
        }

        $table.append($tbody);
        $body.append($table);

        if ($calendar.attr('selectedDay')) {
            selectedDay = $calendar.attr('selectedDay').split('-');
            date = new Date(selectedDay[0], selectedDay[1], selectedDay[2], $calendar.attr('hour') || 0, $calendar.attr('minute') || 0);
            $calendar.find('tbody td[day="' + selectedDay[2] + '"][month="' + selectedDay[1] + '"]').addClass('selected');
            gj.datepicker.methods.updateHeader($calendar, data, date);
        }
    },

    renderYear: function ($datepicker, $calendar, data) {
        var year, i, m, $month,
            $table = $calendar.find('>[role="body"]>table'),
            $tbody = $table.children('tbody');
        
        $table.children('thead').hide();

        year = parseInt($calendar.attr('year'), 10);

        $calendar.attr('type', 'year');
        $calendar.find('div[role="period"]').text(year);

        $tbody.empty();

        for (i = 0; i < 3; i++) {
            $row = $('<tr />');
            for (m = (i * 4); m <= (i * 4) + 3; m++) {
                $month = $('<div>' + gj.core.messages[data.locale].monthShortNames[m] + '</div>');
                $month.on('click', gj.datepicker.methods.selectMonth($datepicker, $calendar, data, m));
                $cell = $('<td></td>').append($month);
                $row.append($cell);
            }
            $tbody.append($row);
        }
    },

    renderDecade: function ($datepicker, $calendar, data) {
        var year, decade, i, y, $year,
            $table = $calendar.find('>[role="body"]>table'),
            $tbody = $table.children('tbody');
        
        $table.children('thead').hide();

        year = parseInt($calendar.attr('year'), 10);
        decade = year - (year % 10);

        $calendar.attr('type', 'decade');
        $calendar.find('div[role="period"]').text(decade + ' - ' + (decade + 9));

        $tbody.empty();

        for (i = decade - 1; i <= decade + 10 ; i += 4) {
            $row = $('<tr />');
            for (y = i; y <= i + 3; y++) {
                $year = $('<div>' + y + '</div>');
                $year.on('click', gj.datepicker.methods.selectYear($datepicker, $calendar, data, y));
                $cell = $('<td></td>').append($year);
                $row.append($cell);
            }
            $tbody.append($row);
        }
    },

    renderCentury: function ($datepicker, $calendar, data) {
        var year, century, i, d, $decade,
            $table = $calendar.find('>[role="body"]>table'),
            $tbody = $table.children('tbody');
        
        $table.children('thead').hide();

        year = parseInt($calendar.attr('year'), 10);
        century = year - (year % 100);

        $calendar.attr('type', 'century');
        $calendar.find('div[role="period"]').text(century + ' - ' + (century + 99));

        $tbody.empty();

        for (i = (century - 10); i < century + 100; i += 40) {
            $row = $('<tr />');
            for (d = i; d <= i + 30; d += 10) {
                $decade = $('<div>' + d + '</div>');
                $decade.on('click', gj.datepicker.methods.selectDecade($datepicker, $calendar, data, d));
                $cell = $('<td></td>').append($decade);
                $row.append($cell);
            }
            $tbody.append($row);
        }
    },

    getWeekNumber: function (date) {
        var d = new Date(date.valueOf());
        d.setDate(d.getDate() + 6);
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return weekNo;
    },

    getMinDate: function (data) {
        var minDate;
        if (data.minDate) {
            if (typeof (data.minDate) === 'string') {
                minDate = gj.core.parseDate(data.minDate, data.format, data.locale);
            } else if (typeof (data.minDate) === 'function') {
                minDate = data.minDate();
                if (typeof minDate === 'string') {
                    minDate = gj.core.parseDate(minDate, data.format, data.locale);
                }
            } else if (typeof data.minDate.getMonth === 'function') {
                minDate = data.minDate;
            }
        }
        return minDate;
    },

    getMaxDate: function (data) {
        var maxDate;
        if (data.maxDate) {
            if (typeof data.maxDate === 'string') {
                maxDate = gj.core.parseDate(data.maxDate, data.format, data.locale);
            } else if (typeof data.maxDate === 'function') {
                maxDate = data.maxDate();
                if (typeof maxDate === 'string') {
                    maxDate = gj.core.parseDate(maxDate, data.format, data.locale);
                }
            } else if (typeof data.maxDate.getMonth === 'function') {
                maxDate = data.maxDate;
            }
        }
        return maxDate;
    },

    isSelectable: function (data, date) {
        var result = true,
            minDate = gj.datepicker.methods.getMinDate(data),
            maxDate = gj.datepicker.methods.getMaxDate(data),
            i;

        if (minDate && date < minDate) {
            result = false;
        } else if (maxDate && date > maxDate) {
            result = false;
        }

        if (result) {
            if (data.disableDates) {
                if ($.isArray(data.disableDates)) {
                    for (i = 0; i < data.disableDates.length; i++) {
                        if (data.disableDates[i] instanceof Date && data.disableDates[i].getTime() === date.getTime()) {
                            result = false;
                        } else if (typeof data.disableDates[i] === 'string' && gj.core.parseDate(data.disableDates[i], data.format, data.locale).getTime() === date.getTime()) {
                            result = false;
                        }
                    }
                } else if (data.disableDates instanceof Function) {
                    result = data.disableDates(date);
                }
            }
            if ($.isArray(data.disableDaysOfWeek) && data.disableDaysOfWeek.indexOf(date.getDay()) > -1) {
                result = false;
            }
        }
        return result;
    },

    getPrevMonth: function (month, year) {
        date = new Date(year, month, 1);
        date.setMonth(date.getMonth() - 1);
        return { month: date.getMonth(), year: date.getFullYear() };
    },

    getNextMonth: function (month, year) {
        date = new Date(year, month, 1);
        date.setMonth(date.getMonth() + 1);
        return { month: date.getMonth(), year: date.getFullYear() };
    },

    prev: function ($datepicker, data) {
        return function () {
            var date, month, year, decade, century,
                $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

            year = parseInt($calendar.attr('year'), 10);
            switch ($calendar.attr('type')) {
                case 'month':
                    month = parseInt($calendar.attr('month'), 10);
                    date = gj.datepicker.methods.getPrevMonth(month, year);
                    $calendar.attr('month', date.month);
                    $calendar.attr('year', date.year);
                    gj.datepicker.methods.renderMonth($datepicker, $calendar, data);
                    break;
                case 'year':
                    $calendar.attr('year', year - 1);
                    gj.datepicker.methods.renderYear($datepicker, $calendar, data);
                    break;
                case 'decade':
                    decade = year - (year % 10);
                    $calendar.attr('year', decade - 10);
                    gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
                    break;
                case 'century':
                    century = year - (year % 100);
                    $calendar.attr('year', century - 100);
                    gj.datepicker.methods.renderCentury($datepicker, $calendar, data);
                    break;
            }
        }
    },

    next: function ($datepicker, data) {
        return function () {
            var date, month, year, decade, century,
                $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

            year = parseInt($calendar.attr('year'), 10);
            switch ($calendar.attr('type')) {
                case 'month':
                    month = parseInt($calendar.attr('month'), 10);
                    date = gj.datepicker.methods.getNextMonth(month, year);
                    $calendar.attr('month', date.month);
                    $calendar.attr('year', date.year);
                    gj.datepicker.methods.renderMonth($datepicker, $calendar, data);
                    break;
                case 'year':
                    $calendar.attr('year', year + 1);
                    gj.datepicker.methods.renderYear($datepicker, $calendar, data);
                    break;
                case 'decade':
                    decade = year - (year % 10);
                    $calendar.attr('year', decade + 10);
                    gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
                    break;
                case 'century':
                    century = year - (year % 100);
                    $calendar.attr('year', century + 100);
                    gj.datepicker.methods.renderCentury($datepicker, $calendar, data);
                    break;
            }
        }
    },

    changePeriod: function ($datepicker, data) {
        return function (e) {
            var $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

            switch ($calendar.attr('type')) {
                case 'month':
                    gj.datepicker.methods.renderYear($datepicker, $calendar, data);
                    break;
                case 'year':
                    gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
                    break;
                case 'decade':
                    gj.datepicker.methods.renderCentury($datepicker, $calendar, data);
                    break;
            }
        }
    },

    dayClickHandler: function ($datepicker, $calendar, data, date) {
        return function (e) {
            e && e.stopPropagation();
            gj.datepicker.methods.selectDay($datepicker, $calendar, data, date);
            if (data.footer !== true && data.autoClose !== false) {
                gj.datepicker.methods.change($datepicker, $calendar, data, date);
            }
            return $datepicker;
        };
    },

    change: function ($datepicker, $calendar, data, date) {
        var day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear(),
            value = gj.core.formatDate(date, data.format, data.locale);
        $calendar.attr('month', month);
        $calendar.attr('year', year);
        $datepicker.val(value);
        gj.datepicker.events.change($datepicker);
        if (window.getComputedStyle($calendar[0]).display !== 'none') {
            gj.datepicker.methods.close($datepicker);
        }
    },

    selectDay: function ($datepicker, $calendar, data, date) {
        var day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear();
        $calendar.attr('selectedDay', year + '-' + month + '-' + day);
        $calendar.find('tbody td').removeClass('selected');
        $calendar.find('tbody td[day="' + day + '"][month="' + month + '"]').addClass('selected');
        gj.datepicker.methods.updateHeader($calendar, data, date);
        gj.datepicker.events.select($datepicker, 'day');
    },

    selectMonth: function ($datepicker, $calendar, data, month) {
        return function (e) {
            $calendar.attr('month', month);
            gj.datepicker.methods.renderMonth($datepicker, $calendar, data);
            gj.datepicker.events.select($datepicker, 'month');
        };
    },

    selectYear: function ($datepicker, $calendar, data, year) {
        return function (e) {
            $calendar.attr('year', year);
            gj.datepicker.methods.renderYear($datepicker, $calendar, data);
            gj.datepicker.events.select($datepicker, 'year');
        };
    },

    selectDecade: function ($datepicker, $calendar, data, year) {
        return function (e) {
            $calendar.attr('year', year);
            gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
            gj.datepicker.events.select($datepicker, 'decade');
        };
    },

    open: function ($datepicker, data) {
        var date, $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

        if ($datepicker.val()) {
            $datepicker.value($datepicker.val());
        } else {
            date = new Date();
            $calendar.attr("month", date.getMonth());
            $calendar.attr("year", date.getFullYear());
        }

        switch ($calendar.attr('type')) {
            case 'month':
                gj.datepicker.methods.renderMonth($datepicker, $calendar, data);
                break;
            case 'year':
                gj.datepicker.methods.renderYear($datepicker, $calendar, data);
                break;
            case 'decade':
                gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
                break;
            case 'century':
                gj.datepicker.methods.renderCentury($datepicker, $calendar, data);
                break;
        }

        $calendar.show();
        $calendar.closest('div[role="modal"]').show();
        if (data.modal) {
            gj.core.center($calendar);
        } else {
            gj.core.setChildPosition($datepicker[0], $calendar[0]);
            document.activeElement !== $datepicker[0] && $datepicker.focus();
        }
        clearTimeout($datepicker.timeout);
        gj.datepicker.events.open($datepicker);
    },

    close: function ($datepicker) {
        var $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
        $calendar.hide();
        $calendar.closest('div[role="modal"]').hide();
        gj.datepicker.events.close($datepicker);
    },

    createKeyDownHandler: function ($datepicker, $calendar, data) {
        return function (e) {
            var month, year, day, index, $new, $active, e = e || window.event;

            if (window.getComputedStyle($calendar[0]).display !== 'none')
            {
                $active = gj.datepicker.methods.getActiveCell($calendar);
                if (e.keyCode == '38') { // up
                    index = $active.index();
                    $new = $active.closest('tr').prev('tr').find('td:eq(' + index + ')');
                    if (!$new.is('[day]')) {
                        gj.datepicker.methods.prev($datepicker, data)();
                        $new = $calendar.find('tbody tr').last().find('td:eq(' + index + ')');
                        if ($new.is(':empty')) {
                            $new = $calendar.find('tbody tr').last().prev().find('td:eq(' + index + ')');
                        }
                    }
                    if ($new.is('[day]')) {
                        $new.addClass('focused');
                        $active.removeClass('focused');
                    }
                } else if (e.keyCode == '40') { // down
                    index = $active.index();
                    $new = $active.closest('tr').next('tr').find('td:eq(' + index + ')');
                    if (!$new.is('[day]')) {
                        gj.datepicker.methods.next($datepicker, data)();
                        $new = $calendar.find('tbody tr').first().find('td:eq(' + index + ')');
                        if (!$new.is('[day]')) {
                            $new = $calendar.find('tbody tr:eq(1)').find('td:eq(' + index + ')');
                        }
                    }
                    if ($new.is('[day]')) {
                        $new.addClass('focused');
                        $active.removeClass('focused');
                    }
                } else if (e.keyCode == '37') { // left
                    $new = $active.prev('td[day]:not(.disabled)');
                    if ($new.length === 0) {
                        $new = $active.closest('tr').prev('tr').find('td[day]').last();
                    }
                    if ($new.length === 0) {
                        gj.datepicker.methods.prev($datepicker, data)();
                        $new = $calendar.find('tbody tr').last().find('td[day]').last();
                    }
                    if ($new.length > 0) {
                        $new.addClass('focused');
                        $active.removeClass('focused');
                    }
                } else if (e.keyCode == '39') { // right
                    $new = $active.next('[day]:not(.disabled)');
                    if ($new.length === 0) {
                        $new = $active.closest('tr').next('tr').find('td[day]').first();
                    }
                    if ($new.length === 0) {
                        gj.datepicker.methods.next($datepicker, data)();
                        $new = $calendar.find('tbody tr').first().find('td[day]').first();
                    }
                    if ($new.length > 0) {
                        $new.addClass('focused');
                        $active.removeClass('focused');
                    }
                } else if (e.keyCode == '13') { // enter
                    day = parseInt($active.attr('day'), 10);
                    month = parseInt($active.attr('month'), 10);
                    year = parseInt($active.attr('year'), 10);
                    gj.datepicker.methods.dayClickHandler($datepicker, $calendar, data, new Date(year, month, day))();
                } else if (e.keyCode == '27') { // esc
                    $datepicker.close();
                }
            }
        }
    },

    getActiveCell: function ($calendar) {
        var $cell = $calendar.find('td[day].focused');
        if ($cell.length === 0) {
            $cell = $calendar.find('td[day].selected');
            if ($cell.length === 0) {
                $cell = $calendar.find('td[day].today');
                if ($cell.length === 0) {
                    $cell = $calendar.find('td[day]:not(.disabled)').first();
                }
            }
        }
        return $cell;
    },

    value: function ($datepicker, value) {
        var $calendar, date, data = $datepicker.data();
        if (typeof (value) === "undefined") {
            return $datepicker.val();
        } else {
            date = gj.core.parseDate(value, data.format, data.locale);
            if (date && date.getTime()) {
                $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
                gj.datepicker.methods.dayClickHandler($datepicker, $calendar, data, date)();
            } else {
                $datepicker.val('');
            }
            return $datepicker;
        }
    },

    destroy: function ($datepicker) {
        var data = $datepicker.data(),
            $parent = $datepicker.parent(),
            $picker = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
        if (data) {
            $datepicker.off();
            if ($picker.parent('[role="modal"]').length > 0) {
                $picker.unwrap();
            }
            $picker.remove();
            $datepicker.removeData();
            $datepicker.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-datepicker');
            $datepicker.removeClass();
            $parent.children('[role="right-icon"]').remove();
            $datepicker.unwrap();
        }
        return $datepicker;
    }
};

gj.datepicker.events = {
    /**
     * Triggered when the datepicker value is changed.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- datepicker -->
     * <input id="datepicker" width="312" />
     * <script>
     *     $('#datepicker').datepicker({
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function ($datepicker) {
        return $datepicker.triggerHandler('change');
    },

    /**
     * Triggered when new value is selected inside the picker.
     *
     * @event select
     * @param {object} e - event data
     * @param {string} type - The type of the selection. The options are day, month, year or decade.
     * @example sample <!-- datepicker -->
     * <input id="datepicker" width="312" />
     * <p>Click on the month name in order to select another month.</p>
     * <script>
     *     $('#datepicker').datepicker({
     *         modal: true,
     *         header: true,
     *         footer: true,
     *         change: function (e) {
     *             alert('Change is fired');
     *         },
     *         select: function (e, type) {
     *             alert('Select from type of "' + type + '" is fired');
     *         }
     *     });
     * </script>
     */
    select: function ($datepicker, type) {
        return $datepicker.triggerHandler('select', [type]);
    },

    /**
     * Event fires when the calendar is opened.
     * @event open
     * @param {object} e - event data
     * @example sample <!-- datepicker -->
     * <input id="datepicker" width="312" />
     * <script>
     *     $('#datepicker').datepicker({
     *         modal: true,
     *         open: function (e) {
     *             alert('open is fired.');
     *         }
     *     });
     * </script>
     */
    open: function ($datepicker) {
        return $datepicker.triggerHandler('open');
    },

    /**
     * Event fires when the calendar is closed.
     * @event close
     * @param {object} e - event data
     * @example sample <!-- datepicker -->
     * <input id="datepicker" width="312" />
     * <script>
     *     $('#datepicker').datepicker({
     *         modal: true,
     *         close: function (e) {
     *             alert('Close is fired.');
     *         }
     *     });
     * </script>
     */
    close: function ($datepicker) {
        return $datepicker.triggerHandler('close');
    }
};

gj.datepicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.datepicker.methods;

    /** Gets or sets the value of the datepicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string | datepicker object
     * @example Get <!-- datepicker -->
     * <button class="gj-button-md" onclick="alert($datepicker.value())">Get Value</button>
     * <hr/>
     * <input id="datepicker" width="312" />
     * <script>
     *     var $datepicker = $('#datepicker').datepicker();
     * </script>
     * @example Set <!-- datepicker -->
     * <button class="gj-button-md" onclick="$datepicker.value('08/01/2017')">Set Value</button>
     * <hr/>
     * <input id="datepicker" width="312" />
     * <script>
     *     var $datepicker = $('#datepicker').datepicker();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove datepicker functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- datepicker -->
     * <button class="gj-button-md" onclick="datepicker.destroy()">Destroy</button>
     * <input id="datepicker" width="312" />
     * <script>
     *     var datepicker = $('#datepicker').datepicker();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    /** Open the calendar.
     * @method
     * @return datepicker
     * @example Open.Close <!-- datepicker -->
     * <button class="gj-button-md" onclick="$datepicker.open()">Open</button>
     * <button class="gj-button-md" onclick="$datepicker.close()">Close</button>
     * <hr/>
     * <input id="datepicker" width="312" />
     * <script>
     *     var $datepicker = $('#datepicker').datepicker();
     * </script>
     */
    self.open = function () {
        return methods.open(this, this.data());
    };

    /** Close the calendar.
     * @method
     * @return datepicker
     * @example Open.Close <!-- datepicker -->
     * <button class="gj-button-md" onclick="$datepicker.open()">Open</button>
     * <button class="gj-button-md" onclick="$datepicker.close()">Close</button>
     * <hr/>
     * <input id="datepicker" width="312" />
     * <script>
     *     var $datepicker = $('#datepicker').datepicker();
     * </script>
     */
    self.close = function () {
        return methods.close(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-datepicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.datepicker.widget.prototype = new gj.widget();
gj.datepicker.widget.constructor = gj.datepicker.widget;

(function ($) {
    $.fn.datepicker = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.datepicker.widget(this, method);
            } else {
                $widget = new gj.datepicker.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
/* global window alert jQuery gj */
/**
  * @widget TimePicker
  * @plugin Base
  */
gj.timepicker = {
    plugins: {}
};

gj.timepicker.config = {
    base: {

        /** The width of the timepicker.
         * @type number
         * @default undefined
         * @example JS.Config <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    $('#timepicker').timepicker({ width: 280 });
         * </script>
         * @example HTML.Config <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    $('#timepicker').timepicker();
         * </script>
         */
        width: undefined,

        /** If set to true, the timepicker will have modal behavior.
         * @type Boolean
         * @default true
         * @example True <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    $('#timepicker').timepicker({ modal: true });
         * </script>
         * @example False <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    $('#timepicker').timepicker({ modal: false, header: false, footer: false });
         * </script>
         */
        modal: true,

        /** If set to true, add header to the timepicker.
         * @type Boolean
         * @default true
         * @example True <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    $('#timepicker').timepicker({ header: true });
         * </script>
         * @example False <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    $('#timepicker').timepicker({ header: false, mode: '24hr' });
         * </script>
         */
        header: true,

        /** If set to true, add footer with ok and cancel buttons to the timepicker.
         * @type Boolean
         * @default true
         * @example True <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    $('#timepicker').timepicker({ footer: true });
         * </script>
         * @example False <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    $('#timepicker').timepicker({ footer: false });
         * </script>
         */
        footer: true,

        /** Specifies the format, which is used to format the value of the timepicker displayed in the input.
         * @additionalinfo <b>M</b> - Minutes; no leading zero for single-digit minutes.<br/>
         * <b>MM</b> - Minutes; leading zero for single-digit minutes.<br/>
         * <b>H</b> - The hour, using a 24-hour clock from 0 to 23; no leading zero for single-digit hours.<br/>
         * <b>HH</b> - The hour, using a 24-hour clock from 0 to 23; leading zero for single-digit hours.<br/>
         * <b>h</b> - The hour, using a 12-hour clock from 1 to 12; no leading zero for single-digit hours.<br/>
         * <b>hh</b> - The hour, using a 12-hour clock from 1 to 12; leading zero for single-digit hours<br/>
         * <b>tt</b> - The AM/PM designator; lowercase.<br/>
         * <b>TT</b> - The AM/PM designator; upercase.<br/>
         * @type String
         * @default 'MM:HH'
         * @example Sample <!-- timepicker -->
         * <input id="timepicker" width="312" value="13.42" />
         * <script>
         *     var timepicker = $('#timepicker').timepicker({
         *         format: 'HH.MM'
         *     });
         * </script>
         */
        format: 'HH:MM',

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    $('#timepicker').timepicker({ uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, timepicker -->
         * <input id="timepicker" width="270" />
         * <script>
         *     $('#timepicker').timepicker({ uiLibrary: 'bootstrap', modal: false, footer: false });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *     $('#timepicker').timepicker({ uiLibrary: 'bootstrap4' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial timepicker value.
         * @type String
         * @default undefined
         * @example Javascript <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    $('#timepicker').timepicker({
         *        value: '13:42'
         *    });
         * </script>
         * @example HTML <!-- timepicker -->
         * <input id="timepicker" width="312" value="13:42" />
         * <script>
         *     $('#timepicker').timepicker();
         * </script>
         */
        value: undefined,

        /** The timepicker mode. Tells the component to display the picker in ampm (12hr) format or 24hr format.
         * @type ampm|24hr
         * @default 'ampm'
         * @example ampm <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    $('#timepicker').timepicker({ mode: 'ampm' });
         * </script>
         * @example 24hr <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *     $('#timepicker').timepicker({ mode: '24hr' });
         * </script>
         */
        mode: 'ampm',

        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    $('#timepicker').timepicker({
         *        locale: 'de-de'
         *    });
         * </script>
         * @example Bulgarian <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    $('#timepicker').timepicker({
         *        locale: 'bg-bg'
         *    });
         * </script>
         * @example French <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    $('#timepicker').timepicker({
         *        locale: 'fr-fr'
         *    });
         * </script>
         * @example Brazil <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    $('#timepicker').timepicker({
         *        locale: 'pt-br'
         *    });
         * </script>
         * @example Russian <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    $('#timepicker').timepicker({
         *        locale: 'ru-ru'
         *    });
         * </script>
         */
        locale: 'en-us',

        /** The size of the timepicker input.
         * @type 'small'|'default'|'large'
         * @default 'default'
         * @example Bootstrap.4 <!-- bootstrap4, timepicker -->
         * <p><label for="timepicker-small">Small Size:</label> <input id="timepicker-small" width="220" value="15:20" /></p>
         * <p><label for="timepicker-default">Default Size:</label> <input id="timepicker-default" width="220" value="15:20" /></p>
         * <p><label for="timepicker-large">Large Size:</label> <input id="timepicker-large" width="220" value="15:20" /></p>
         * <script>
         *     $('#timepicker-small').timepicker({ uiLibrary: 'bootstrap4', size: 'small' });
         *     $('#timepicker-default').timepicker({ uiLibrary: 'bootstrap4', size: 'default' });
         *     $('#timepicker-large').timepicker({ uiLibrary: 'bootstrap4', size: 'large' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, timepicker -->
         * <p><label for="timepicker-small">Small Size:</label> <input id="timepicker-small" width="220" value="15:20" /></p>
         * <p><label for="timepicker-default">Default Size:</label> <input id="timepicker-default" width="220" value="15:20" /></p>
         * <p><label for="timepicker-large">Large Size:</label> <input id="timepicker-large" width="220" value="15:20" /></p>
         * <script>
         *     $('#timepicker-small').timepicker({ uiLibrary: 'bootstrap', size: 'small' });
         *     $('#timepicker-default').timepicker({ uiLibrary: 'bootstrap', size: 'default' });
         *     $('#timepicker-large').timepicker({ uiLibrary: 'bootstrap', size: 'large' });
         * </script>
         * @example Material.Design <!-- timepicker -->
         * <p><label for="timepicker-small">Small Size:</label> <input id="timepicker-small" width="220" value="15:20" /></p>
         * <p><label for="timepicker-default">Default Size:</label> <input id="timepicker-default" width="220" value="15:20" /></p>
         * <p><label for="timepicker-large">Large Size:</label> <input id="timepicker-large" width="220" value="15:20" /></p>
         * <script>
         *     $('#timepicker-small').timepicker({ size: 'small' });
         *     $('#timepicker-default').timepicker({ size: 'default' });
         *     $('#timepicker-large').timepicker({ size: 'large' });
         * </script>
         */
        size: 'default',

        icons: {
            rightIcon: '<i class="gj-icon clock" />'
        },

        style: {
            modal: 'gj-modal',
            wrapper: 'gj-timepicker gj-timepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            clock: 'gj-picker gj-picker-md timepicker',
            footer: '',
            button: 'gj-button-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            clock: 'gj-picker gj-picker-bootstrap timepicker',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control border',
            clock: 'gj-picker gj-picker-bootstrap timepicker',
            footer: 'modal-footer',
            button: 'btn btn-default'
        }
    }
};

gj.timepicker.methods = {
    init: function (jsConfig) {
        gj.picker.widget.prototype.init.call(this, jsConfig, 'timepicker');
        return this;
    },

    initialize: function () {

    },

    initMouse: function ($body, $input, $picker, data) {
        $body.off();
        $body.on('mousedown', gj.timepicker.methods.mouseDownHandler($input, $picker));
        $body.on('mousemove', gj.timepicker.methods.mouseMoveHandler($input, $picker, data));
        $body.on('mouseup', gj.timepicker.methods.mouseUpHandler($input, $picker, data));
    },

    createPicker: function ($timepicker) {
        var date, data = $timepicker.data(),
            $clock = $('<div role="picker" />').addClass(data.style.clock).attr('guid', $timepicker.attr('data-guid')),
            $hour = $('<div role="hour" />'),
            $minute = $('<div role="minute" />'),
            $header = $('<div role="header" />'),
            $mode = $('<div role="mode" />'),
            $body = $('<div role="body" />'),
            $btnOk = $('<button class="' + data.style.button + '">' + gj.core.messages[data.locale].ok + '</button>'),
            $btnCancel = $('<button class="' + data.style.button + '">' + gj.core.messages[data.locale].cancel + '</button>'),
            $footer = $('<div role="footer" class="' + data.style.footer + '" />');

        date = gj.core.parseDate(data.value, data.format, data.locale);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            $timepicker.attr('hours', date.getHours());
        }

        gj.timepicker.methods.initMouse($body, $timepicker, $clock, data);

        if (data.header) {
            $hour.on('click', function () {
                gj.timepicker.methods.renderHours($timepicker, $clock, data);
            });
            $minute.on('click', function () {
                gj.timepicker.methods.renderMinutes($timepicker, $clock, data);
            });
            $header.append($hour).append(':').append($minute);
            if (data.mode === 'ampm') {
                $mode.append($('<span role="am">' + gj.core.messages[data.locale].am + '</span>').on('click', function () {
                    var hour = gj.timepicker.methods.getHour($clock);
                    $clock.attr('mode', 'am');
                    $(this).addClass('selected');
                    $(this).parent().children('[role="pm"]').removeClass('selected');
                    if (hour >= 12) {
                        $clock.attr('hour', hour - 12);
                    }
                    if (!data.modal) {
                        clearTimeout($timepicker.timeout);
                        $timepicker.focus();
                    }
                }));
                $mode.append('<br />');
                $mode.append($('<span role="pm">' + gj.core.messages[data.locale].pm + '</span>').on('click', function () {
                    var hour = gj.timepicker.methods.getHour($clock);
                    $clock.attr('mode', 'pm');
                    $(this).addClass('selected');
                    $(this).parent().children('[role="am"]').removeClass('selected');
                    if (hour < 12) {
                        $clock.attr('hour', hour + 12);
                    }
                    if (!data.modal) {
                        clearTimeout($timepicker.timeout);
                        $timepicker.focus();
                    }
                }));
                $header.append($mode);
            }
            $clock.append($header);
        }
        
        $clock.append($body);

        if (data.footer) {
            $btnCancel.on('click', function () { $timepicker.close(); });
            $footer.append($btnCancel);
            $btnOk.on('click', gj.timepicker.methods.setTime($timepicker, $clock));
            $footer.append($btnOk);
            $clock.append($footer);
        }

        $clock.hide();

        $('body').append($clock);

        if (data.modal) {
            $clock.wrapAll('<div role="modal" class="' + data.style.modal + '"/>');
            gj.core.center($clock);
        }
        return $clock;
    },

    getHour: function ($clock) {
        return parseInt($clock.attr('hour'), 10) || 0;
    },

    getMinute: function ($clock) {
        return parseInt($clock.attr('minute'), 10) || 0;
    },

    setTime: function ($timepicker, $clock) {
        return function () {
            var hour = gj.timepicker.methods.getHour($clock),
                minute = gj.timepicker.methods.getMinute($clock),
                mode = $clock.attr('mode'),
                date = new Date(0, 0, 0, (hour === 12 && mode === 'am' ? 0 : hour), minute),
                data = $timepicker.data(),
                value = gj.core.formatDate(date, data.format, data.locale);
            $timepicker.value(value);
            $timepicker.close();
        }
    },

    getPointerValue: function (x, y, mode) {
        var value, radius, size = 256,
            angle = Math.atan2(size / 2 - x, size / 2 - y) / Math.PI * 180;

        if (angle < 0) {
            angle = 360 + angle;
        }

        switch (mode) {
            case 'ampm': {
                value = 12 - Math.round(angle * 12 / 360);
                return value === 0 ? 12 : value;
            }
            case '24hr': {
                radius = Math.sqrt(Math.pow(size / 2 - x, 2) + Math.pow(size / 2 - y, 2));
                value = 12 - Math.round(angle * 12 / 360);
                if (value === 0) {
                    value = 12;
                }
                if (radius < size / 2 - 32) {
                    value = value === 12 ? 0 : value + 12;
                }
                return value;
            }
            case 'minutes': {
                value = Math.round(60 - 60 * angle / 360);
                return value === 60 ? 0 : value;
            }
        }
    },

    updateArrow: function(e, $timepicker, $clock, data) {
        var rect, value,
            mouseX = $timepicker.mouseX(e),
            mouseY = $timepicker.mouseY(e),
            scrollY = window.scrollY || window.pageYOffset || 0,
            scrollX = window.scrollX || window.pageXOffset || 0;

        rect = e.target.getBoundingClientRect();
        if (data.dialMode == 'hours') {
            value = gj.timepicker.methods.getPointerValue(mouseX - scrollX - rect.left, mouseY - scrollY - rect.top, data.mode);
            $clock.attr('hour', data.mode === 'ampm' && $clock.attr('mode') === 'pm' && value < 12 ? value + 12 : value);
        } else if (data.dialMode == 'minutes') {
            value = gj.timepicker.methods.getPointerValue(mouseX - scrollX - rect.left, mouseY - scrollY - rect.top, 'minutes');
            $clock.attr('minute', value);
        }

        gj.timepicker.methods.update($timepicker, $clock, data);
    },

    update: function ($timepicker, $clock, data) {
        var hour, minute, $arrow, visualHour, $header, $numbers;

        // update the arrow
        hour = gj.timepicker.methods.getHour($clock);
        minute = gj.timepicker.methods.getMinute($clock);
        $arrow = $clock.find('[role="arrow"]');
        if (data.dialMode == 'hours' && (hour == 0 || hour > 12) && data.mode === '24hr') {
            $arrow.css('width', 'calc(50% - 52px)');
        } else {
            $arrow.css('width', 'calc(50% - 20px)');
        }

        if (data.dialMode == 'hours') {
            $arrow.css('transform', 'rotate(' + ((hour * 30) - 90).toString() + 'deg)');
        } else {
            $arrow.css('transform', 'rotate(' + ((minute * 6) - 90).toString() + 'deg)');
        }
        $arrow.show();

        // update the numbers
        visualHour = (data.mode === 'ampm' && hour > 12 ? hour - 12 : (hour == 0 ? 12 : hour));
        $numbers = $clock.find('[role="body"] span');
        $numbers.removeClass('selected');
        $numbers.filter(function (e) {
            if (data.dialMode == 'hours') {
                return parseInt($(this).text(), 10) == visualHour;
            } else {
                return parseInt($(this).text(), 10) == minute;
            }
        }).addClass('selected');

        // update the header
        if (data.header) {
            $header = $clock.find('[role="header"]');
            $header.find('[role="hour"]').text(visualHour);
            $header.find('[role="minute"]').text(gj.core.pad(minute));
            if (data.mode === 'ampm') {
                if (hour >= 12) {
                    $header.find('[role="pm"]').addClass('selected');
                    $header.find('[role="am"]').removeClass('selected');
                } else {
                    $header.find('[role="am"]').addClass('selected');
                    $header.find('[role="pm"]').removeClass('selected');
                }
            }
        }
    },

    mouseDownHandler: function ($timepicker, $clock) {
        return function (e) {
            $timepicker.mouseMove = true;
        }
    },

    mouseMoveHandler: function ($timepicker, $clock, data) {
        return function (e) {
            if ($timepicker.mouseMove) {
                gj.timepicker.methods.updateArrow(e, $timepicker, $clock, data);
            }
        }
    },

    mouseUpHandler: function ($timepicker, $clock, data) {
        return function (e) {
            gj.timepicker.methods.updateArrow(e, $timepicker, $clock, data);
            $timepicker.mouseMove = false;
            if (!data.modal) {
                clearTimeout($timepicker.timeout);
                $timepicker.focus();
            }
            if (data.dialMode == 'hours') {
                setTimeout(function () {
                    gj.timepicker.events.select($timepicker, 'hour');
                    gj.timepicker.methods.renderMinutes($timepicker, $clock, data);
                }, 1000);
            } else if (data.dialMode == 'minutes') {
                if (data.footer !== true && data.autoClose !== false) {
                    gj.timepicker.methods.setTime($timepicker, $clock)();
                }
                gj.timepicker.events.select($timepicker, 'minute');
            }
        }
    },

    renderHours: function ($timepicker, $clock, data) {
        var $dial, $body = $clock.find('[role="body"]');

        clearTimeout($timepicker.timeout);
        $body.empty();
        $dial = $('<div role="dial"></div>');

        $dial.append('<div role="arrow" style="transform: rotate(-90deg); display: none;"><div class="arrow-begin"></div><div class="arrow-end"></div></div>');

        $dial.append('<span role="hour" style="transform: translate(54px, -93.5307px);">1</span>');
        $dial.append('<span role="hour" style="transform: translate(93.5307px, -54px);">2</span>');
        $dial.append('<span role="hour" style="transform: translate(108px, 0px);">3</span>');
        $dial.append('<span role="hour" style="transform: translate(93.5307px, 54px);">4</span>');
        $dial.append('<span role="hour" style="transform: translate(54px, 93.5307px);">5</span>');
        $dial.append('<span role="hour" style="transform: translate(6.61309e-15px, 108px);">6</span>');
        $dial.append('<span role="hour" style="transform: translate(-54px, 93.5307px);">7</span>');
        $dial.append('<span role="hour" style="transform: translate(-93.5307px, 54px);">8</span>');
        $dial.append('<span role="hour" style="transform: translate(-108px, 1.32262e-14px);">9</span>');
        $dial.append('<span role="hour" style="transform: translate(-93.5307px, -54px);">10</span>');
        $dial.append('<span role="hour" style="transform: translate(-54px, -93.5307px);">11</span>');
        $dial.append('<span role="hour" style="transform: translate(-1.98393e-14px, -108px);">12</span>');
        if (data.mode === '24hr') {
            $dial.append('<span role="hour" style="transform: translate(38px, -65.8179px);">13</span>');
            $dial.append('<span role="hour" style="transform: translate(65.8179px, -38px);">14</span>');
            $dial.append('<span role="hour" style="transform: translate(76px, 0px);">15</span>');
            $dial.append('<span role="hour" style="transform: translate(65.8179px, 38px);">16</span>');
            $dial.append('<span role="hour" style="transform: translate(38px, 65.8179px);">17</span>');
            $dial.append('<span role="hour" style="transform: translate(4.65366e-15px, 76px);">18</span>');
            $dial.append('<span role="hour" style="transform: translate(-38px, 65.8179px);">19</span>');
            $dial.append('<span role="hour" style="transform: translate(-65.8179px, 38px);">20</span>');
            $dial.append('<span role="hour" style="transform: translate(-76px, 9.30732e-15px);">21</span>');
            $dial.append('<span role="hour" style="transform: translate(-65.8179px, -38px);">22</span>');
            $dial.append('<span role="hour" style="transform: translate(-38px, -65.8179px);">23</span>');
            $dial.append('<span role="hour" style="transform: translate(-1.3961e-14px, -76px);">00</span>');
        }
        $body.append($dial);

        $clock.find('[role="header"] [role="hour"]').addClass('selected');
        $clock.find('[role="header"] [role="minute"]').removeClass('selected');

        data.dialMode = 'hours';

        gj.timepicker.methods.update($timepicker, $clock, data);
    },

    renderMinutes: function ($timepicker, $clock, data) {
        var $body = $clock.find('[role="body"]');

        clearTimeout($timepicker.timeout);
        $body.empty();
        $dial = $('<div role="dial"></div>');

        $dial.append('<div role="arrow" style="transform: rotate(-90deg); display: none;"><div class="arrow-begin"></div><div class="arrow-end"></div></div>');

        $dial.append('<span role="hour" style="transform: translate(54px, -93.5307px);">5</span>');
        $dial.append('<span role="hour" style="transform: translate(93.5307px, -54px);">10</span>');
        $dial.append('<span role="hour" style="transform: translate(108px, 0px);">15</span>');
        $dial.append('<span role="hour" style="transform: translate(93.5307px, 54px);">20</span>');
        $dial.append('<span role="hour" style="transform: translate(54px, 93.5307px);">25</span>');
        $dial.append('<span role="hour" style="transform: translate(6.61309e-15px, 108px);">30</span>');
        $dial.append('<span role="hour" style="transform: translate(-54px, 93.5307px);">35</span>');
        $dial.append('<span role="hour" style="transform: translate(-93.5307px, 54px);">40</span>');
        $dial.append('<span role="hour" style="transform: translate(-108px, 1.32262e-14px);">45</span>');
        $dial.append('<span role="hour" style="transform: translate(-93.5307px, -54px);">50</span>');
        $dial.append('<span role="hour" style="transform: translate(-54px, -93.5307px);">55</span>');
        $dial.append('<span role="hour" style="transform: translate(-1.98393e-14px, -108px);">00</span>');
        $body.append($dial);

        $clock.find('[role="header"] [role="hour"]').removeClass('selected');
        $clock.find('[role="header"] [role="minute"]').addClass('selected');
        
        data.dialMode = 'minutes';

        gj.timepicker.methods.update($timepicker, $clock, data);
    },

    open: function ($timepicker) {
        var time, hour, data = $timepicker.data(),
            $clock = $('body').find('[role="picker"][guid="' + $timepicker.attr('data-guid') + '"]');

        if ($timepicker.value()) {
            time = gj.core.parseDate($timepicker.value(), data.format, data.locale);
        } else {
            time = new Date();
        }
        hour = time.getHours();
        if (data.mode === 'ampm') {
            $clock.attr('mode', hour > 12 ? 'pm' : 'am');
        }
        $clock.attr('hour', hour);
        $clock.attr('minute', time.getMinutes());

        gj.timepicker.methods.renderHours($timepicker, $clock, data);

        gj.picker.widget.prototype.open.call($timepicker, 'timepicker');
        return $timepicker;
    },

    value: function ($timepicker, value) {
        var $clock, time, data = $timepicker.data();
        if (typeof (value) === "undefined") {
            return $timepicker.val();
        } else {
            $timepicker.val(value);
            gj.timepicker.events.change($timepicker);
            return $timepicker;
        }
    }
};

gj.timepicker.events = {
    /**
     * Triggered when the timepicker value is changed.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- timepicker -->
     * <input id="timepicker" width="312" />
     * <script>
     *     $('#timepicker').timepicker({
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function ($timepicker) {
        return $timepicker.triggerHandler('change');
    },

    /**
     * Triggered when new value is selected inside the picker.
     *
     * @event select
     * @param {object} e - event data
     * @param {string} type - The type of the selection. The options are hour and minute.
     * @example sample <!-- datepicker -->
     * <input id="timepicker" width="312" />
     * <script>
     *     $('#timepicker').timepicker({
     *         modal: true,
     *         header: true,
     *         footer: true,
     *         change: function (e) {
     *             alert('Change is fired');
     *         },
     *         select: function (e, type) {
     *             alert('Select from type of "' + type + '" is fired');
     *         }
     *     });
     * </script>
     */
    select: function ($timepicker, type) {
        return $timepicker.triggerHandler('select', [type]);
    },

    /**
     * Event fires when the timepicker is opened.
     * @event open
     * @param {object} e - event data
     * @example sample <!-- timepicker -->
     * <input id="timepicker" width="312" />
     * <script>
     *     $('#timepicker').timepicker({
     *         open: function (e) {
     *             alert('open is fired.');
     *         }
     *     });
     * </script>
     */
    open: function ($timepicker) {
        return $timepicker.triggerHandler('open');
    },

    /**
     * Event fires when the timepicker is closed.
     * @event close
     * @param {object} e - event data
     * @example sample <!-- timepicker -->
     * <input id="timepicker" width="312" />
     * <script>
     *     $('#timepicker').timepicker({
     *         close: function (e) {
     *             alert('close is fired.');
     *         }
     *     });
     * </script>
     */
    close: function ($timepicker) {
        return $timepicker.triggerHandler('close');
    }
};

gj.timepicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.timepicker.methods;

    self.mouseMove = false;

    /** Gets or sets the value of the timepicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- timepicker -->
     * <button class="gj-button-md" onclick="alert($timepicker.value())">Get Value</button>
     * <hr/>
     * <input id="timepicker" width="312" />
     * <script>
     *     var $timepicker = $('#timepicker').timepicker();
     * </script>
     * @example Set <!-- timepicker -->
     * <button class="gj-button-md" onclick="$timepicker.value('11:00')">Set Value</button>
     * <hr/>
     * <input id="timepicker" width="312" />
     * <script>
     *     var $timepicker = $('#timepicker').timepicker();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove timepicker functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- timepicker -->
     * <button class="gj-button-md" onclick="timepicker.destroy()">Destroy</button>
     * <input id="timepicker" width="312" />
     * <script>
     *     var timepicker = $('#timepicker').timepicker();
     * </script>
     */
    self.destroy = function () {
        return gj.picker.widget.prototype.destroy.call(this, 'timepicker');
    };

    /** Open the clock.
     * @method
     * @return timepicker
     * @example Open.Close <!-- timepicker -->
     * <button class="gj-button-md" onclick="$timepicker.open()">Open</button>
     * <button class="gj-button-md" onclick="$timepicker.close()">Close</button>
     * <hr/>
     * <input id="timepicker" width="312" />
     * <script>
     *     var $timepicker = $('#timepicker').timepicker({ modal: false, header: false, footer: false, mode: '24hr' });
     * </script>
     */
    self.open = function () {
        return gj.timepicker.methods.open(this);
    };

    /** Close the clock.
     * @method
     * @return timepicker
     * @example Open.Close <!-- timepicker -->
     * <button class="gj-button-md" onclick="$timepicker.open()">Open</button>
     * <button class="gj-button-md" onclick="$timepicker.close()">Close</button>
     * <hr/>
     * <input id="timepicker" width="312" />
     * <script>
     *     var $timepicker = $('#timepicker').timepicker({ modal: false, header: false, footer: false, mode: '24hr' });
     * </script>
     */
    self.close = function () {
        return gj.picker.widget.prototype.close.call(this, 'timepicker');
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-timepicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.timepicker.widget.prototype = new gj.picker.widget();
gj.timepicker.widget.constructor = gj.timepicker.widget;

(function ($) {
    $.fn.timepicker = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.timepicker.widget(this, method);
            } else {
                $widget = new gj.timepicker.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
/* global window alert jQuery gj */
/**
  * @widget DateTimePicker
  * @plugin Base
  */
gj.datetimepicker = {
    plugins: {},
    messages: {
        'en-us': {
        }
    }
};

gj.datetimepicker.config = {
    base: {

        /** The datepicker configuration options. Valid only for datepicker specific configuration options.
         * @additionalinfo All configuration options that exists on the datetimepicker level are going to override the options at datepicker level.
         * @type object
         * @default undefined
         * @example Sample <!-- datetimepicker -->
         * <input id="datetimepicker" width="312" />
         * <script>
         *    $('#datetimepicker').datetimepicker({
         *        datepicker: { showOtherMonths: true, calendarWeeks: true }
         *    });
         * </script>
         */
        datepicker: gj.datepicker.config.base,

        timepicker: gj.timepicker.config.base,

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- datetimepicker -->
         * <input id="datetimepicker" width="312" />
         * <script>
         *    $('#datetimepicker').datetimepicker({ uiLibrary: 'materialdesign' });
         * </script>
         * @example MaterialDesign.Modal <!-- datetimepicker -->
         * <input id="datetimepicker" width="312" />
         * <script>
         *    $('#datetimepicker').datetimepicker({ uiLibrary: 'materialdesign', modal: true, footer: true });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, datetimepicker -->
         * <input id="datetimepicker" width="220" />
         * <script>
         *     $('#datetimepicker').datetimepicker({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datetimepicker -->
         * <input id="datetimepicker" width="234" />
         * <script>
         *     $('#datetimepicker').datetimepicker({ uiLibrary: 'bootstrap4', modal: true, footer: true });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial datetimepicker value.
         * @type number
         * @default undefined
         * @example Javascript <!-- datetimepicker -->
         * <input id="datetimepicker" width="300" />
         * <script>
         *    $('#datetimepicker').datetimepicker({ value: '22:10 03/27/2018' });
         * </script>
         * @example HTML <!-- datetimepicker -->
         * <input id="datetimepicker" width="300" value="22:10 03/27/2018" />
         * <script>
         *     $('#datetimepicker').datetimepicker();
         * </script>
         */
        value: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.
         * @additionalinfo <b>M</b> - Minutes; no leading zero for single-digit minutes.<br/>
         * <b>MM</b> - Minutes; leading zero for single-digit minutes.<br/>
         * <b>H</b> - The hour, using a 24-hour clock from 0 to 23; no leading zero for single-digit hours.<br/>
         * <b>HH</b> - The hour, using a 24-hour clock from 0 to 23; leading zero for single-digit hours.<br/>
         * <b>h</b> - The hour, using a 12-hour clock from 1 to 12; no leading zero for single-digit hours.<br/>
         * <b>hh</b> - The hour, using a 12-hour clock from 1 to 12; leading zero for single-digit hours<br/>
         * <b>tt</b> - The AM/PM designator; lowercase.<br/>
         * <b>TT</b> - The AM/PM designator; upercase.<br/>
         * <b>d</b> - Day of the month as digits; no leading zero for single-digit days.<br/>
         * <b>dd</b> - Day of the month as digits; leading zero for single-digit days.<br/>
         * <b>ddd</b> - Day of the week as a three-letter abbreviation.<br/>
         * <b>dddd</b> - Day of the week as its full name.<br/>
         * <b>m</b> - Month as digits; no leading zero for single-digit months.<br/>
         * <b>mm</b> - Month as digits; leading zero for single-digit months.<br/>
         * <b>mmm</b> - Month as a three-letter abbreviation.<br/>
         * <b>mmmm</b> - Month as its full name.<br/>
         * <b>yy</b> - Year as last two digits; leading zero for years less than 10.<br/>
         * <b>yyyy</b> - Year represented by four digits.<br/>
         * @type String
         * @default 'HH:MM mm/dd/yyyy'
         * @example Sample <!-- datetimepicker -->
         * <input id="input" value="05:50 2018-27-03" width="312" />
         * <script>
         *     $('#input').datetimepicker({ format: 'HH:MM yyyy-dd-mm' });
         * </script>
         * @example Long.Month.Format <!-- datetimepicker -->
         * <input id="input" value="10 October 2017 05:50" width="312" />
         * <script>
         *     $('#input').datetimepicker({ format: 'dd mmmm yyyy HH:MM' });
         * </script>
         */
        format: 'HH:MM mm/dd/yyyy',

        /** The width of the datetimepicker.
         * @type number
         * @default undefined
         * @example JS.Config <!-- datetimepicker -->
         * <input id="input" />
         * <script>
         *    $('#input').datetimepicker({ width: 312 });
         * </script>
         * @example HTML.Config <!-- datetimepicker -->
         * <input id="input" width="312" />
         * <script>
         *    $('#input').datetimepicker();
         * </script>
         */
        width: undefined,

        /** If set to true, the datetimepicker will have modal behavior.
         * @type Boolean
         * @default false
         * @example Material.Design <!-- datetimepicker -->
         * <input id="input" width="312" />
         * <script>
         *    $('#input').datetimepicker({ modal: true });
         * </script>
         * @example Bootstrap <!-- bootstrap, datetimepicker -->
         * <input id="input" width="220" />
         * <script>
         *    $('#input').datetimepicker({ uiLibrary: 'bootstrap', modal: true, footer: true });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datetimepicker -->
         * <input id="input" width="234" />
         * <script>
         *    $('#input').datetimepicker({ uiLibrary: 'bootstrap4', modal: true, footer: true });
         * </script>
         */
        modal: false,

        /** If set to true, add footer with ok and cancel buttons to the datetimepicker.
         * @type Boolean
         * @default false
         * @example True <!-- datetimepicker -->
         * <input id="input" width="312" />
         * <script>
         *    $('#input').datetimepicker({ footer: true, modal: true, header: true });
         * </script>
         * @example False <!-- datetimepicker -->
         * <input id="input" width="312" />
         * <script>
         *    $('#input').datetimepicker({ footer: false });
         * </script>
         */
        footer: false,

        /** The size of the datetimepicker input.
         * @type 'small'|'default'|'large'
         * @default 'default'
         * @example Bootstrap.4 <!-- bootstrap4, datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="234" value="10:20 03/20/2018" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="234" value="10:20 03/20/2018" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="234" value="10:20 03/20/2018" /></p>
         * <script>
         *     $('#small').datetimepicker({ uiLibrary: 'bootstrap4', size: 'small' });
         *     $('#default').datetimepicker({ uiLibrary: 'bootstrap4', size: 'default' });
         *     $('#large').datetimepicker({ uiLibrary: 'bootstrap4', size: 'large' });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="234" value="10:20 03/20/2018" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="234" value="10:20 03/20/2018" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="234" value="10:20 03/20/2018" /></p>
         * <script>
         *     $('#small').datetimepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'small' });
         *     $('#default').datetimepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'default' });
         *     $('#large').datetimepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'large' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="220" value="10:20 03/20/2018" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="220" value="10:20 03/20/2018" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="220" value="10:20 03/20/2018" /></p>
         * <script>
         *     $('#small').datetimepicker({ uiLibrary: 'bootstrap', size: 'small' });
         *     $('#default').datetimepicker({ uiLibrary: 'bootstrap', size: 'default' });
         *     $('#large').datetimepicker({ uiLibrary: 'bootstrap', size: 'large' });
         * </script>
         * @example Material.Design <!-- datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="276" value="10:20 03/20/2018" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="276" value="10:20 03/20/2018" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="276" value="10:20 03/20/2018" /></p>
         * <script>
         *     $('#small').datetimepicker({ size: 'small' });
         *     $('#default').datetimepicker({ size: 'default' });
         *     $('#large').datetimepicker({ size: 'large' });
         * </script>
         */
        size: 'default',
        
        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German <!-- datetimepicker -->
         * <input id="input" width="276" />
         * <script>
         *    $('#input').datetimepicker({
         *        locale: 'de-de',
         *        format: 'HH:MM dd mmm yyyy'
         *    });
         * </script>
         * @example Bulgarian <!-- datetimepicker -->
         * <input id="input" width="276" />
         * <script>
         *    $('#input').datetimepicker({
         *        locale: 'bg-bg',
         *        format: 'HH:MM dd mmm yyyy',
         *        datepicker: { weekStartDay: 1 }
         *    });
         * </script>
         */
        locale: 'en-us',

        icons: {},

        style: {
            calendar: 'gj-picker gj-picker-md datetimepicker gj-unselectable'
        }
    },

    bootstrap: {
        style: {
            calendar: 'gj-picker gj-picker-bootstrap datetimepicker gj-unselectable'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            calendar: 'gj-picker gj-picker-bootstrap datetimepicker gj-unselectable'
        }
    }
};

gj.datetimepicker.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'datetimepicker');
        this.attr('data-datetimepicker', 'true');
        gj.datetimepicker.methods.initialize(this);
        return this;
    },

    getConfig: function (clientConfig, type) {
        var config = gj.widget.prototype.getConfig.call(this, clientConfig, type);

        uiLibrary = clientConfig.hasOwnProperty('uiLibrary') ? clientConfig.uiLibrary : config.uiLibrary;
        if (gj.datepicker.config[uiLibrary]) {
            $.extend(true, config.datepicker, gj.datepicker.config[uiLibrary]);
        }
        if (gj.timepicker.config[uiLibrary]) {
            $.extend(true, config.timepicker, gj.timepicker.config[uiLibrary]);
        }

        iconsLibrary = clientConfig.hasOwnProperty('iconsLibrary') ? clientConfig.iconsLibrary : config.iconsLibrary;
        if (gj.datepicker.config[iconsLibrary]) {
            $.extend(true, config.datepicker, gj.datepicker.config[iconsLibrary]);
        }
        if (gj.timepicker.config[iconsLibrary]) {
            $.extend(true, config.timepicker, gj.timepicker.config[iconsLibrary]);
        }

        return config;
    },

    initialize: function ($datetimepicker) {
        var $picker, $header, $date, $time, date,
            $switch, $calendarMode, $clockMode,
            data = $datetimepicker.data();

        // Init datepicker
        data.datepicker.uiLibrary = data.uiLibrary;
        data.datepicker.iconsLibrary = data.iconsLibrary;
        data.datepicker.width = data.width;
        data.datepicker.format = data.format;
        data.datepicker.locale = data.locale;
        data.datepicker.modal = data.modal;
        data.datepicker.footer = data.footer;
        data.datepicker.style.calendar = data.style.calendar;
        data.datepicker.value = data.value;
        data.datepicker.size = data.size;
        data.datepicker.autoClose = false;
        gj.datepicker.methods.initialize($datetimepicker, data.datepicker);
        $datetimepicker.on('select', function (e, type) {
            var date, value;
            if (type === 'day') {
                gj.datetimepicker.methods.createShowHourHandler($datetimepicker, $picker, data)();
            } else if (type === 'minute') {
                if ($picker.attr('selectedDay') && data.footer !== true) {
                    selectedDay = $picker.attr('selectedDay').split('-');
                    date = new Date(selectedDay[0], selectedDay[1], selectedDay[2], $picker.attr('hour') || 0, $picker.attr('minute') || 0);
                    value = gj.core.formatDate(date, data.format, data.locale);
                    $datetimepicker.val(value);
                    gj.datetimepicker.events.change($datetimepicker);
                    gj.datetimepicker.methods.close($datetimepicker);
                }
            }
        });
        $datetimepicker.on('open', function () {
            var $header = $picker.children('[role="header"]');
            $header.find('[role="calendarMode"]').addClass("selected");
            $header.find('[role="clockMode"]').removeClass("selected");
        });

        $picker = $('body').find('[role="calendar"][guid="' + $datetimepicker.attr('data-guid') + '"]');
        date = data.value ? gj.core.parseDate(data.value, data.format, data.locale) : new Date();
        $picker.attr('hour', date.getHours());
        $picker.attr('minute', date.getMinutes());

        // Init timepicker
        data.timepicker.uiLibrary = data.uiLibrary;
        data.timepicker.iconsLibrary = data.iconsLibrary;
        data.timepicker.format = data.format;
        data.timepicker.locale = data.locale;
        data.timepicker.header = true;
        data.timepicker.footer = data.footer;
        data.timepicker.size = data.size;
        data.timepicker.mode = '24hr';
        data.timepicker.autoClose = false;

        // Init header        
        $header = $('<div role="header" />');
        $date = $('<div role="date" class="selected" />');
        $date.on('click', gj.datetimepicker.methods.createShowDateHandler($datetimepicker, $picker, data));
        $date.html(gj.core.formatDate(new Date(), 'ddd, mmm dd', data.locale));
        $header.append($date);

        $switch = $('<div role="switch"></div>');

        $calendarMode = $('<i class="gj-icon selected" role="calendarMode">event</i>');
        $calendarMode.on('click', gj.datetimepicker.methods.createShowDateHandler($datetimepicker, $picker, data));
        $switch.append($calendarMode);

        $time = $('<div role="time" />');
        $time.append($('<div role="hour" />').on('click', gj.datetimepicker.methods.createShowHourHandler($datetimepicker, $picker, data)).html(gj.core.formatDate(new Date(), 'HH', data.locale)));
        $time.append(':');
        $time.append($('<div role="minute" />').on('click', gj.datetimepicker.methods.createShowMinuteHandler($datetimepicker, $picker, data)).html(gj.core.formatDate(new Date(), 'MM', data.locale)));
        $switch.append($time);

        $clockMode = $('<i class="gj-icon" role="clockMode">clock</i>');
        $clockMode.on('click', gj.datetimepicker.methods.createShowHourHandler($datetimepicker, $picker, data));
        $switch.append($clockMode);
        $header.append($switch);

        $picker.prepend($header);
    },

    createShowDateHandler: function ($datetimepicker, $picker, data) {
        return function (e) {
            var $header = $picker.children('[role="header"]');
            $header.find('[role="calendarMode"]').addClass("selected");
            $header.find('[role="date"]').addClass("selected");
            $header.find('[role="clockMode"]').removeClass("selected");
            $header.find('[role="hour"]').removeClass("selected");
            $header.find('[role="minute"]').removeClass("selected");
            gj.datepicker.methods.renderMonth($datetimepicker, $picker, data.datepicker);
        };
    },

    createShowHourHandler: function ($datetimepicker, $picker, data) {
        return function () {
            var $header = $picker.children('[role="header"]');
            $header.find('[role="calendarMode"]').removeClass("selected");
            $header.find('[role="date"]').removeClass("selected");
            $header.find('[role="clockMode"]').addClass("selected");
            $header.find('[role="hour"]').addClass("selected");
            $header.find('[role="minute"]').removeClass("selected");

            gj.timepicker.methods.initMouse($picker.children('[role="body"]'), $datetimepicker, $picker, data.timepicker);
            gj.timepicker.methods.renderHours($datetimepicker, $picker, data.timepicker);
        };
    },

    createShowMinuteHandler: function ($datetimepicker, $picker, data) {
        return function () {
            var $header = $picker.children('[role="header"]');
            $header.find('[role="calendarMode"]').removeClass("selected");
            $header.find('[role="date"]').removeClass("selected");
            $header.find('[role="clockMode"]').addClass("selected");
            $header.find('[role="hour"]').removeClass("selected");
            $header.find('[role="minute"]').addClass("selected");
            gj.timepicker.methods.initMouse($picker.children('[role="body"]'), $datetimepicker, $picker, data.timepicker);
            gj.timepicker.methods.renderMinutes($datetimepicker, $picker, data.timepicker);
        };
    },

    close: function ($datetimepicker) {
        var $calendar = $('body').find('[role="calendar"][guid="' + $datetimepicker.attr('data-guid') + '"]');
        $calendar.hide();
        $calendar.closest('div[role="modal"]').hide();
        //gj.datepicker.events.close($datepicker);
    },

    value: function ($datetimepicker, value) {
        var $calendar, date, hour, data = $datetimepicker.data();
        if (typeof (value) === "undefined") {
            return $datetimepicker.val();
        } else {
            date = gj.core.parseDate(value, data.format, data.locale);
            if (date) {
                $calendar = $('body').find('[role="calendar"][guid="' + $datetimepicker.attr('data-guid') + '"]');
                gj.datepicker.methods.dayClickHandler($datetimepicker, $calendar, data, date)();
                // Set Time
                hour = date.getHours();
                if (data.mode === 'ampm') {
                    $calendar.attr('mode', hour > 12 ? 'pm' : 'am');
                }
                $calendar.attr('hour', hour);
                $calendar.attr('minute', date.getMinutes());
                $datetimepicker.val(value);
            } else {
                $datetimepicker.val('');
            }
            return $datetimepicker;
        }
    },

    destroy: function ($datetimepicker) {
        var data = $datetimepicker.data(),
            $parent = $datetimepicker.parent(),
            $picker = $('body').find('[role="calendar"][guid="' + $datetimepicker.attr('data-guid') + '"]');
        if (data) {
            $datetimepicker.off();
            if ($picker.parent('[role="modal"]').length > 0) {
                $picker.unwrap();
            }
            $picker.remove();
            $datetimepicker.removeData();
            $datetimepicker.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-datetimepicker');
            $datetimepicker.removeClass();
            $parent.children('[role="right-icon"]').remove();
            $datetimepicker.unwrap();
        }
        return $datetimepicker;
    }
};

gj.datetimepicker.events = {
    /**
     * Fires when the datetimepicker value changes as a result of selecting a new value.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- datetimepicker -->
     * <input id="input" width="312" />
     * <script>
     *     $('#input').datetimepicker({
     *         footer: true,
     *         modal: true,
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function ($datetimepicker) {
        return $datetimepicker.triggerHandler('change');
    }
};

gj.datetimepicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.datetimepicker.methods;

    self.mouseMove = false;

    /** Gets or sets the value of the datetimepicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="alert($datetimepicker.value())">Get Value</button>
     * <hr/>
     * <input id="datetimepicker" width="312" value="17:50 03/27/2018" />
     * <script>
     *     var $datetimepicker = $('#datetimepicker').datetimepicker();
     * </script>
     * @example Set <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="$datetimepicker.value('13:40 08/01/2017')">Set Value</button>
     * <hr/>
     * <input id="datetimepicker" width="312" />
     * <script>
     *     var $datetimepicker = $('#datetimepicker').datetimepicker();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Open the calendar.
     * @method
     * @return datetimepicker
     * @example Open.Close <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="$picker.open()">Open</button>
     * <button class="gj-button-md" onclick="$picker.close()">Close</button>
     * <hr/>
     * <input id="input" width="312" />
     * <script>
     *     var $picker = $('#input').datetimepicker();
     * </script>
     */
    self.open = function () {
        gj.datepicker.methods.open(this, this.data().datepicker);
    };

    /** Close the calendar.
     * @method
     * @return datetimepicker
     * @example Open.Close <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="$picker.open()">Open</button>
     * <button class="gj-button-md" onclick="$picker.close()">Close</button>
     * <hr/>
     * <input id="input" width="312" />
     * <script>
     *     var $picker = $('#input').datetimepicker();
     * </script>
     */
    self.close = function () {
        gj.datepicker.methods.close(this);
    };

    /** Remove datetimepicker functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="datetimepicker.destroy()">Destroy</button>
     * <input id="datetimepicker" width="312" />
     * <script>
     *     var datetimepicker = $('#datetimepicker').datetimepicker();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-datetimepicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.datetimepicker.widget.prototype = new gj.widget();
gj.datetimepicker.widget.constructor = gj.datetimepicker.widget;

gj.datetimepicker.widget.prototype.getConfig = gj.datetimepicker.methods.getConfig;

(function ($) {
    $.fn.datetimepicker = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.datetimepicker.widget(this, method);
            } else {
                $widget = new gj.datetimepicker.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
/* global window alert jQuery gj */
/**
  * @widget Slider
  * @plugin Base
  */
gj.slider = {
    plugins: {},
    messages: {
        'en-us': {
        }
    }
};

gj.slider.config = {
    base: {

        /** The minimum value of the Slider.
         * @type number
         * @default 0
         * @example JS.Config <!-- slider -->
         * <input id="slider" width="300" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        min: 5,
         *        max: 15,
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         */
        min: 0,

        /** The maximum value of the Slider.
         * @type number
         * @default 10
         * @example JS.Config <!-- slider -->
         * <input id="slider" width="300" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        max: 20,
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         */
        max: 100,

        /** The width of the slider.
         * @type number
         * @default undefined
         * @example JS.Config <!-- slider -->
         * <input id="slider" />
         * <script>
         *    $('#slider').slider({ width: 400 });
         * </script>
         * @example HTML.Config <!-- slider -->
         * <input id="slider" width="400" />
         * <script>
         *    $('#slider').slider();
         * </script>
         */
        width: undefined,

        /** The orientation of a Slider: "horizontal" or "vertical".
         * @type (horizontal|vertical)
         * @default horizontal
         */
        // TODO orientation

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- slider -->
         * <input id="slider" width="300" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        uiLibrary: 'materialdesign',
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, slider -->
         * <input id="slider" width="300" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        uiLibrary: 'bootstrap',
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, slider -->
         * <div class="container" />
         *     <input id="slider" width="300" />
         *     Value: <span id="value"></span>
         * </div>
         * <script>
         *    $('#slider').slider({
         *        uiLibrary: 'bootstrap4',
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial slider value.
         * @type number
         * @default undefined
         * @example Javascript <!-- slider -->
         * <input id="slider" width="300" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        value: 30,
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         * @example HTML <!-- slider -->
         * <input id="slider" width="300" value="44" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         */
        value: undefined,

        icons: {},

        style: {
            wrapper: 'gj-slider gj-slider-md',
            progress: undefined,
            track: undefined
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-slider gj-slider-bootstrap gj-slider-bootstrap-3',
            progress: 'progress-bar',
            track: 'progress'
        }
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-slider gj-slider-bootstrap gj-slider-bootstrap-4',
            progress: 'progress-bar',
            track: 'progress'
        }
    }
};

gj.slider.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'slider');
        this.attr('data-slider', 'true');
        gj.slider.methods.initialize(this, this.data());
        return this;
    },

    initialize: function ($slider, data) {
        var wrapper, track, handle, progress;

        $slider[0].style.display = 'none';

        if ($slider[0].parentElement.attributes.role !== 'wrapper') {
            wrapper = document.createElement('div');
            wrapper.setAttribute('role', 'wrapper');
            $slider[0].parentNode.insertBefore(wrapper, $slider[0]);
            wrapper.appendChild($slider[0]);
        } else {
            wrapper = $slider[0].parentElement;
        }

        if (data.width) {
            wrapper.style.width = data.width + 'px';
        }
        
        gj.core.addClasses(wrapper, data.style.wrapper);

        track = $slider[0].querySelector('[role="track"]');
        if (track == null) {
            track = document.createElement('div');
            track.setAttribute('role', 'track');
            wrapper.appendChild(track);
        }
        gj.core.addClasses(track, data.style.track);

        handle = $slider[0].querySelector('[role="handle"]');
        if (handle == null) {
            handle = document.createElement('div');
            handle.setAttribute('role', 'handle');
            wrapper.appendChild(handle);
        }

        progress = $slider[0].querySelector('[role="progress"]');
        if (progress == null) {
            progress = document.createElement('div');
            progress.setAttribute('role', 'progress');
            wrapper.appendChild(progress);
        }
        gj.core.addClasses(progress, data.style.progress);

        if (!data.value) {
            data.value = data.min;
        }
        gj.slider.methods.value($slider, data, data.value);
        
        gj.documentManager.subscribeForEvent('mouseup', $slider.data('guid'), gj.slider.methods.createMouseUpHandler($slider, handle, data));
        handle.addEventListener('mousedown', gj.slider.methods.createMouseDownHandler(handle, data));
        gj.documentManager.subscribeForEvent('mousemove', $slider.data('guid'), gj.slider.methods.createMouseMoveHandler($slider, track, handle, progress, data));

        handle.addEventListener('click', function (e) { e.stopPropagation(); });
        wrapper.addEventListener('click', gj.slider.methods.createClickHandler($slider, track, handle, data));
    },

    createClickHandler: function ($slider, track, handle, data) {
        return function (e) {
            var sliderPos, x, offset, stepSize, newValue;
            if (handle.getAttribute('drag') !== 'true') {
                sliderPos = gj.core.position($slider[0].parentElement);
                x = new gj.widget().mouseX(e) - sliderPos.left;
                offset = gj.core.width(handle) / 2;
                stepSize = gj.core.width(track) / (data.max - data.min);
                newValue = Math.round((x - offset) / stepSize) + data.min;
                gj.slider.methods.value($slider, data, newValue);
            }
        };
    },

    createMouseUpHandler: function ($slider, handle, data) {
        return function (e) {
            if (handle.getAttribute('drag') === 'true') {
                handle.setAttribute('drag', 'false');
                gj.slider.events.change($slider);
            }
        }
    },

    createMouseDownHandler: function (handle, data) {
        return function (e) {
            handle.setAttribute('drag', 'true');
        }
    },

    createMouseMoveHandler: function ($slider, track, handle, progress, data) {
        return function (e) {
            var sliderPos, x, trackWidth, offset, stepSize, valuePos, newValue;
            if (handle.getAttribute('drag') === 'true') {
                sliderPos = gj.core.position($slider[0].parentElement);
                x = new gj.widget().mouseX(e) - sliderPos.left;

                trackWidth = gj.core.width(track);
                offset = gj.core.width(handle) / 2;
                stepSize = trackWidth / (data.max - data.min);
                valuePos = (data.value - data.min) * stepSize;

                if (x >= offset && x <= (trackWidth + offset)) {
                    if (x > valuePos + (stepSize / 2) || x < valuePos - (stepSize / 2)) {
                        newValue = Math.round((x - offset) / stepSize) + data.min;
                        gj.slider.methods.value($slider, data, newValue);
                    }
                }
            }
        }
    },

    value: function ($slider, data, value) {
        var stepSize, track, handle, progress;
        if (typeof (value) === "undefined") {
            return $slider[0].value;
        } else {
            $slider[0].setAttribute('value', value);
            data.value = value;
            track = $slider.parent().children('[role="track"]')[0]
            stepSize = gj.core.width(track) / (data.max - data.min);
            handle = $slider.parent().children('[role="handle"]')[0];
            handle.style.left = ((value - data.min) * stepSize) + 'px';
            progress = $slider.parent().children('[role="progress"]')[0];
            progress.style.width = ((value - data.min) * stepSize) + 'px';
            gj.slider.events.slide($slider, value);
            return $slider;
        }
    },

    destroy: function ($slider) {
        var data = $slider.data(),
            $wrapper = $slider.parent();
        if (data) {
            $wrapper.children('[role="track"]').remove();
            $wrapper.children('[role="handle"]').remove();
            $wrapper.children('[role="progress"]').remove();
            $slider.unwrap();
            $slider.off();
            $slider.removeData();
            $slider.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-slider');
            $slider.removeClass();
            $slider.show();
        }
        return $slider;
    }
};

gj.slider.events = {
    /**
     * Fires when the slider value changes as a result of selecting a new value with the drag handle, buttons or keyboard.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- slider -->
     * <input id="slider" width="300" />
     * <script>
     *     var slider = $('#slider').slider({
     *         change: function (e) {
     *             alert('Change is fired. The new value is ' + slider.value());
     *         }
     *     });
     * </script>
     */
    change: function ($slider) {
        return $slider.triggerHandler('change');
    },

    /**
     * Fires when the user drags the drag handle to a new position.
     * @event slide
     * @param {object} e - event data
     * @param {object} value - The value of the slider.
     * @example sample <!-- slider -->
     * <input id="slider" width="300" />
     * Value: <span id="value"></span>
     * <script>
     *    $('#slider').slider({
     *        value: 30,
     *        slide: function (e, value) {
     *            document.getElementById('value').innerText = value;
     *        }
     *    });
     * </script>
     */
    slide: function ($slider, value) {
        return $slider.triggerHandler('slide', [value]);
    }
};

gj.slider.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.slider.methods;

    /** Gets or sets the value of the slider.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- slider -->
     * <button class="gj-button-md" onclick="alert($slider.value())">Get Value</button>
     * <hr/>
     * <input id="slider" width="300" />
     * <script>
     *     var $slider = $('#slider').slider();
     * </script>
     * @example Set <!-- slider -->
     * <button class="gj-button-md" onclick="$slider.value(77)">Set Value</button>
     * <hr/>
     * <input id="slider" width="300"  />
     * <script>
     *     var $slider = $('#slider').slider();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, this.data(), value);
    };

    /** Remove slider functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- slider -->
     * <button class="gj-button-md" onclick="slider.destroy()">Destroy</button>
     * <input id="slider" width="300" />
     * <script>
     *     var slider = $('#slider').slider();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-slider')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.slider.widget.prototype = new gj.widget();
gj.slider.widget.constructor = gj.slider.widget;

(function ($) {
    $.fn.slider = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.slider.widget(this, method);
            } else {
                $widget = new gj.slider.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
/* global window alert jQuery gj */
/**
  * @widget ColorPicker
  * @plugin Base
  */
gj.colorpicker = {
    plugins: {},
    messages: {
        'en-us': {
        }
    }
};

gj.colorpicker.config = {
    base: {

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- colorpicker -->
         * <input id="colorpicker" width="300" />
         * <script>
         *    $('#colorpicker').colorpicker({ uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, colorpicker -->
         * <input id="colorpicker" width="300" />
         * <script>
         *     $('#colorpicker').colorpicker({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, colorpicker -->
         * <input id="colorpicker" width="300" />
         * <script>
         *     $('#colorpicker').colorpicker({ uiLibrary: 'bootstrap4' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial colorpicker value.
         * @type number
         * @default undefined
         * @example Javascript <!-- colorpicker -->
         * <input id="colorpicker" width="300" />
         * <script>
         *    $('#colorpicker').colorpicker({ value: '#FF0000' });
         * </script>
         * @example HTML <!-- colorpicker -->
         * <input id="colorpicker" width="300" value="#FF0000" />
         * <script>
         *     $('#colorpicker').colorpicker();
         * </script>
         */
        value: undefined,

        icons: {
            rightIcon: '<i class="gj-icon">event</i>'
        },

        style: {
            modal: 'gj-modal',
            wrapper: 'gj-colorpicker gj-colorpicker-md gj-unselectable',
            input: 'gj-textbox-md',
            picker: 'gj-picker gj-picker-md colorpicker gj-unselectable',
            footer: '',
            button: 'gj-button-md'
        }
    },

    bootstrap: {
        style: {}
    },

    bootstrap4: {
        style: {}
    }
};

gj.colorpicker.methods = {
    init: function (jsConfig) {
        gj.picker.widget.prototype.init.call(this, jsConfig, 'colorpicker');
        gj.colorpicker.methods.initialize(this);
        return this;
    },

    initialize: function ($colorpicker) {
    },

    createPicker: function ($input, data) {
        var $picker = $('<div role="picker" />').addClass(data.style.picker).attr('guid', $input.attr('data-guid'));

        $picker.html('test');

        $picker.hide();
        $('body').append($picker);

        return $picker;
    },

    open: function ($input) {
        if ($input.val()) {
            $input.value($input.val());
        }
        return gj.picker.widget.prototype.open.call($input, 'colorpicker');
    }
};

gj.colorpicker.events = {
    /**
     * Fires when the colorpicker value changes as a result of selecting a new value with the drag handle, buttons or keyboard.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- colorpicker -->
     * <input id="colorpicker" />
     * <script>
     *     $('#colorpicker').colorpicker({
     *         change: function (e) {
     *             console.log('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function ($colorpicker) {
        return $colorpicker.triggerHandler('change');
    },

    /**
     * Fires as a new color is displayed in the drop-down picker.
     * @additionalinfo This is not necessarily the "final" value; for example this event triggers when the sliders in the HSV selector are dragged, but then pressing ESC would cancel the selection and the color will revert to the original value.
     * @event select
     * @param {object} e - event data
     * @example sample <!-- colorpicker -->
     * <input id="colorpicker" />
     * <script>
     *     $('#colorpicker').colorpicker({
     *         select: function (e) {
     *             console.log('select is fired');
     *         }
     *     });
     * </script>
     */
    select: function ($colorpicker) {
        return $colorpicker.triggerHandler('select');
    },

    /**
     * Fires when the picker popup is opening.
     * @event open
     * @param {object} e - event data
     * @example sample <!-- colorpicker -->
     * <input id="colorpicker" />
     * <script>
     *     $('#colorpicker').colorpicker({
     *         open: function (e) {
     *             console.log('open is fired');
     *         }
     *     });
     * </script>
     */
    open: function ($colorpicker) {
        return $colorpicker.triggerHandler('open');
    },

    /**
     * Fires when the picker popup is closing.
     * @event close
     * @param {object} e - event data
     * @example sample <!-- colorpicker -->
     * <input id="colorpicker" />
     * <script>
     *     $('#colorpicker').colorpicker({
     *         close: function (e) {
     *             console.log('close is fired');
     *         }
     *     });
     * </script>
     */
    close: function ($colorpicker) {
        return $colorpicker.triggerHandler('close');
    }
};

gj.colorpicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.colorpicker.methods;

    /** Gets or sets the value of the colorpicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- colorpicker -->
     * <button class="gj-button-md" onclick="alert($colorpicker.value())">Get Value</button>
     * <hr/>
     * <input id="colorpicker" />
     * <script>
     *     var $colorpicker = $('#colorpicker').colorpicker();
     * </script>
     * @example Set <!-- colorpicker -->
     * <button class="gj-button-md" onclick="$colorpicker.value('#FF0000')">Set Value</button>
     * <hr/>
     * <input id="colorpicker" />
     * <script>
     *     var $colorpicker = $('#colorpicker').colorpicker();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove colorpicker functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- colorpicker -->
     * <button class="gj-button-md" onclick="colorpicker.destroy()">Destroy</button>
     * <input id="colorpicker" />
     * <script>
     *     var colorpicker = $('#colorpicker').colorpicker();
     * </script>
     */
    self.destroy = function () {
        return gj.picker.widget.prototype.destroy.call(this, 'colorpicker');
    };

    /** Opens the popup element with the color selector.
     * @method
     * @return jquery element
     * @example sample <!-- colorpicker -->
     * <button class="gj-button-md" onclick="colorpicker.open()">Open</button>
     * <input id="colorpicker" />
     * <script>
     *     var colorpicker = $('#colorpicker').colorpicker();
     * </script>
     */
    self.open = function () {
        return methods.open(this);
    };

    /** Close the popup element with the color selector.
     * @method
     * @return jquery element
     * @example sample <!-- colorpicker -->
     * <button class="gj-button-md" onclick="colorpicker.close()">Close</button>
     * <input id="colorpicker" />
     * <script>
     *     var colorpicker = $('#colorpicker').colorpicker();
     * </script>
     */
    self.close = function () {
        return gj.picker.widget.prototype.close.call(this, 'colorpicker');
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-colorpicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.colorpicker.widget.prototype = new gj.picker.widget();
gj.colorpicker.widget.constructor = gj.colorpicker.widget;

(function ($) {
    $.fn.colorpicker = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.colorpicker.widget(this, method);
            } else {
                $widget = new gj.colorpicker.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
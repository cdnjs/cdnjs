(function ($) {
    "use strict";
    var templates = {},
        queue = {},
        formatters = {},
        isArray;

    function loadTemplate(template, data, options) {
        var $that = this,
            $template,
            isFile,
            settings;

        data = data || {};

        settings = $.extend(true, {
            // These are the defaults.
            async: true,
            overwriteCache: false,
            complete: null,
            success: null,
            error: function () {
                $(this).each(function () {
                    $(this).html(settings.errorMessage);
                });
            },
            errorMessage: "There was an error loading the template.",
            paged: false,
            pageNo: 1,
            elemPerPage: 10,
            append: false,
            prepend: false,
            beforeInsert: null,
            afterInsert: null,
            bindingOptions: {
                ignoreUndefined: false,
                ignoreNull: false,
                ignoreEmptyString: false
            }
        }, options);

        if ($.type(data) === "array") {
            isArray = true;
            return processArray.call(this, template, data, settings);
        }

        if (!containsSlashes(template)) {
            $template = $(template);
            if (typeof template === 'string' && template.indexOf('#') === 0) {
                settings.isFile = false;
            }
        }

        isFile = settings.isFile || (typeof settings.isFile === "undefined" && (typeof $template === "undefined" || $template.length === 0));

        if (isFile && !settings.overwriteCache && templates[template]) {
            prepareTemplateFromCache(template, $that, data, settings);
        } else if (isFile && !settings.overwriteCache && templates.hasOwnProperty(template)) {
            addToQueue(template, $that, data, settings);
        } else if (isFile) {
            loadAndPrepareTemplate(template, $that, data, settings);
        } else {
            loadTemplateFromDocument($template, $that, data, settings);
        }
        return this;
    }

    function addTemplateFormatter(key, formatter) {
        if (formatter) {
            formatters[key] = formatter;
        } else {
            formatters = $.extend(formatters, key);
        }
    }

    function containsSlashes(str) {
        return typeof str === "string" && str.indexOf("/") > -1;
    }

    function processArray(template, data, settings) {
        settings = settings || {};
        var $that = this,
            todo = data.length,
            doPrepend = settings.prepend && !settings.append,
            done = 0,
            success = 0,
            errored = false,
            errorObjects = [],
            newOptions;

        if (settings.paged) {
            var startNo = (settings.pageNo - 1) * settings.elemPerPage;
            data = data.slice(startNo, startNo + settings.elemPerPage);
            todo = data.length;
        }

        newOptions = $.extend(
            {},
            settings,
            {
                async: false,
                complete: function (data) {
                    if (this.html) {
                        var insertedElement;
                        if (doPrepend) {
                            insertedElement = $(this.html()).prependTo($that);
                        } else {
                            insertedElement = $(this.html()).appendTo($that);
                        }
                        if (settings.afterInsert && data) {
                            settings.afterInsert(insertedElement, data);
                        }
                    }
                    done++;
                    if (done === todo || errored) {
                        if (errored && settings && typeof settings.error === "function") {
                            settings.error.call($that, errorObjects);
                        }
                        if (settings && typeof settings.complete === "function") {
                            settings.complete();
                        }
                    }
                },
                success: function () {
                    success++;
                    if (success === todo) {
                        if (settings && typeof settings.success === "function") {
                            settings.success();
                        }
                    }
                },
                error: function (e) {
                    errored = true;
                    errorObjects.push(e);
                }
            }
        );

        if (!settings.append && !settings.prepend) {
            $that.html("");
        }

        if (doPrepend) data.reverse();
        $(data).each(function () {
            var $div = $("<div/>");
            loadTemplate.call($div, template, this, newOptions);
            if (errored) {
                return false;
            }
        });

        return this;
    }

    function addToQueue(template, selection, data, settings) {
        if (queue[template]) {
            queue[template].push({ data: data, selection: selection, settings: settings });
        } else {
            queue[template] = [{ data: data, selection: selection, settings: settings}];
        }
    }

    function prepareTemplateFromCache(template, selection, data, settings) {
        var $templateContainer = templates[template].clone();

        prepareTemplate.call(selection, $templateContainer, data, settings);
        if (typeof settings.success === "function") {
            settings.success();
        }
    }

    function uniqueId() {
        return new Date().getTime();
    }

    function urlAvoidCache(url) {
        if (url.indexOf('?') !== -1) {
            return url + "&_=" + uniqueId();
        }
        else {
            return url + "?_=" + uniqueId();
        }
    }

    function loadAndPrepareTemplate(template, selection, data, settings) {
        var $templateContainer = $("<div/>");

        templates[template] = null;
        var templateUrl = template;
        if (settings.overwriteCache) {
            templateUrl = urlAvoidCache(templateUrl);
        }
        $.ajax({
            url: templateUrl,
            async: settings.async,
            success: function (templateContent) {
                $templateContainer.html(templateContent);
                handleTemplateLoadingSuccess($templateContainer, template, selection, data, settings);
            },
            error: function (e) {
                handleTemplateLoadingError(template, selection, data, settings, e);
            }
        });
    }

    function loadTemplateFromDocument($template, selection, data, settings) {
        var $templateContainer = $("<div/>");

        if ($template.is("script") || $template.is("template")) {
            $template = $.parseHTML($.trim($template.html()));
        }

        $templateContainer.html($template);
        prepareTemplate.call(selection, $templateContainer, data, settings);

        if (typeof settings.success === "function") {
            settings.success();
        }
    }

    function prepareTemplate(template, data, settings) {
        bindData(template, data, settings);

        $(this).each(function () {
            var $templateHtml = $(template.html());
            if (settings.beforeInsert) {
                settings.beforeInsert($templateHtml, data);
            }
            if (settings.append) {

                $(this).append($templateHtml);
            } else if (settings.prepend) {
                $(this).prepend($templateHtml);
            } else {
                $(this).html($templateHtml);
            }
            if (settings.afterInsert && !isArray) {
                settings.afterInsert($templateHtml, data);
            }
        });

        if (typeof settings.complete === "function") {
            settings.complete.call($(this), data);
        }
    }

    function handleTemplateLoadingError(template, selection, data, settings, error) {
        var value;

        if (typeof settings.error === "function") {
            settings.error.call(selection, error);
        }

        $(queue[template]).each(function (key, value) {
            if (typeof value.settings.error === "function") {
                value.settings.error.call(value.selection, error);
            }
        });

        if (typeof settings.complete === "function") {
            settings.complete.call(selection);
        }

        while (queue[template] && (value = queue[template].shift())) {
            if (typeof value.settings.complete === "function") {
                value.settings.complete.call(value.selection);
            }
        }

        if (typeof queue[template] !== 'undefined' && queue[template].length > 0) {
            queue[template] = [];
        }
    }

    function handleTemplateLoadingSuccess($templateContainer, template, selection, data, settings) {
        var value;

        templates[template] = $templateContainer.clone();
        prepareTemplate.call(selection, $templateContainer, data, settings);

        if (typeof settings.success === "function") {
            settings.success.call(selection);
        }

        while (queue[template] && (value = queue[template].shift())) {
            prepareTemplate.call(value.selection, templates[template].clone(), value.data, value.settings);
            if (typeof value.settings.success === "function") {
                value.settings.success.call(value.selection);
            }
        }
    }

    function bindData(template, data, settings) {
        data = data || {};

        processElements("data-content", template, data, settings, function ($elem, value) {
            $elem.html(applyFormatters($elem, value, "content", settings));
        });

        processElements("data-content-append", template, data, settings, function ($elem, value) {
            $elem.append(applyFormatters($elem, value, "content", settings));
        });

        processElements("data-content-prepend", template, data, settings, function ($elem, value) {
            $elem.prepend(applyFormatters($elem, value, "content", settings));
        });

        processElements("data-content-text", template, data, settings, function ($elem, value) {
            $elem.text(applyFormatters($elem, value, "content", settings));
        });

        processElements("data-innerHTML", template, data, settings, function ($elem, value) {
            $elem.html(applyFormatters($elem, value, "content", settings));
        });

        processElements("data-src", template, data, settings, function ($elem, value) {
            $elem.attr("src", applyFormatters($elem, value, "src", settings));
        }, function ($elem) {
            $elem.remove();
        });

        processElements("data-href", template, data, settings, function ($elem, value) {
            $elem.attr("href", applyFormatters($elem, value, "href", settings));
        }, function ($elem) {
            $elem.remove();
        });

        processElements("data-alt", template, data, settings, function ($elem, value) {
            $elem.attr("alt", applyFormatters($elem, value, "alt", settings));
        });

        processElements("data-id", template, data, settings, function ($elem, value) {
            $elem.attr("id", applyFormatters($elem, value, "id", settings));
        });

        processElements("data-value", template, data, settings, function ($elem, value) {
            $elem.attr("value", applyFormatters($elem, value, "value", settings));
        });

        processElements("data-class", template, data, settings, function ($elem, value) {
            $elem.addClass(applyFormatters($elem, value, "class", settings));
        });

        processElements("data-link", template, data, settings, function ($elem, value) {
            var $linkElem = $("<a/>");
            $linkElem.attr("href", applyFormatters($elem, value, "link", settings));
            $linkElem.html($elem.html());
            $elem.html($linkElem);
        });

        processElements("data-link-wrap", template, data, settings, function ($elem, value) {
            var $linkElem = $("<a/>");
            $linkElem.attr("href", applyFormatters($elem, value, "link-wrap", settings));
            $elem.wrap($linkElem);
        });

        processElements("data-options", template, data, settings, function ($elem, value) {
            $(value).each(function () {
                var $option = $("<option/>");
                $option.attr('value', this).text(this).appendTo($elem);
            });
        });

        processAllElements(template, data, settings);
    }

    function processElements(attribute, template, data, settings, dataBindFunction, noDataFunction) {
        $("[" + attribute + "]", template).each(function () {
            var $this = $(this),
                param = $this.attr(attribute),
                value = getValue(data, param);

            if (!valueIsAllowedByBindingOptions($this, value, settings)) {
                $this.remove();
                return;
            }

            $this.removeAttr(attribute);

            if (typeof value !== 'undefined' && dataBindFunction) {
                dataBindFunction($this, value);
            } else if (noDataFunction) {
                noDataFunction($this);
            }
        });
        return;
    }

    function valueIsAllowedByBindingOptions(bindingOptionsContainer, value, settings) {

        var bindingOptions = getBindingOptions(bindingOptionsContainer, settings);

        if (bindingOptions.ignoreUndefined && typeof value === "undefined") {
            return false;

        } else if (bindingOptions.ignoreNull && value === null) {
            return false;

        } else if (bindingOptions.ignoreEmptyString && value === "") {
            return false;

        } else {
            return true;
        }
    }

    function getBindingOptions(bindingOptionsContainer, settings) {

        var bindingOptions = {};

        // binding options passed as template attribute, i.e. 'data-binding-options'
        if (bindingOptionsContainer instanceof jQuery && bindingOptionsContainer.attr("data-binding-options")) {

            bindingOptions = $.parseJSON(bindingOptionsContainer.attr("data-binding-options"));
            bindingOptionsContainer.removeAttr("data-binding-options");

            // binding options defined in a "data-template-bind" attribute
        } else if (typeof bindingOptionsContainer === "object" && bindingOptionsContainer.hasOwnProperty('bindingOptions')) {
            bindingOptions = bindingOptionsContainer.bindingOptions;
        }

        // extend general bindingOptions with specific settings
        return $.extend({}, settings.bindingOptions, bindingOptions);
    }

    function processAllElements(template, data, settings) {
        $("[data-template-bind]", template).each(function () {
            var $this = $(this),
                param = $.parseJSON($this.attr("data-template-bind"));

            $this.removeAttr("data-template-bind");

            $(param).each(function () {
                var value;

                if (typeof (this.value) === 'object') {
                    value = getValue(data, this.value.data);
                } else {
                    value = getValue(data, this.value);
                }
                if (this.attribute) {

                    if (!valueIsAllowedByBindingOptions(this, value, settings)) {
                        $this.remove();
                        return;
                    }

                    switch (this.attribute) {
                        case "content":
                        case "innerHTML":
                            $this.html(applyDataBindFormatters($this, value, this));
                            break;
                        case "contentAppend":
                            $this.append(applyDataBindFormatters($this, value, this));
                            break;
                        case "contentPrepend":
                            $this.prepend(applyDataBindFormatters($this, value, this));
                            break;
                        case "contentText":
                            $this.text(applyDataBindFormatters($this, value, this));
                            break;
                        case "options":
                            var optionsData = this;
                            $(value).each(function () {
                                var $option = $("<option/>");
                                $option
                                    .attr('value', this[optionsData.value.value])
                                    .text(applyDataBindFormatters($this, this[optionsData.value.content], optionsData))
                                    .attr('selected', typeof this[optionsData.value.selected] == undefined ? false : this[optionsData.value.selected])
                                    .appendTo($this);
                            });
                            break;
                        default:
                            $this.attr(this.attribute, applyDataBindFormatters($this, value, this));
                    }
                }
            });
        });
    }

    function applyDataBindFormatters($elem, value, data, settings) {
        if (data.formatter && formatters[data.formatter]) {
            return (function (formatterSettings) {
                return formatters[data.formatter].call($elem, value, data.formatOptions, formatterSettings);
            })(settings);
        }
        return value;
    }

    function getValue(data, param) {
        if (param === "this") {
            return data;
        }
        var paramParts = param.split('.'),
            part,
            value = data;

        while ((part = paramParts.shift()) && typeof value !== "undefined" && value != null) {
            value = value[part];
        }

        return value;
    }

    function applyFormatters($elem, value, attr, settings) {
        var formatterTarget = $elem.attr("data-format-target"),
            formatter;

        if (formatterTarget === attr || (!formatterTarget && attr === "content")) {
            formatter = $elem.attr("data-format");
            if (formatter && typeof formatters[formatter] === "function") {
                var formatOptions = $elem.attr("data-format-options");
                return (function (formatterSettings) {
                    return formatters[formatter].call($elem[0], value, formatOptions, $.extend({}, formatterSettings));
                })(settings);
            }
        }

        return value;
    }
    addTemplateFormatter("nestedTemplateFormatter", function (value, options, internalSettings) {
        if (!options) {
            return;
        }

        if (typeof options === "string" && options[0] === "{") {
            options = $.parseJSON(options);
        }

        var parentElement = options.parentElement || "div";
        var template = options.template || options;

        //If a parent is specified, return it; otherwise only return the generated children.
        if (options.parentElement)
            return $("<" + parentElement + "/>").loadTemplate(template, value, internalSettings);
        else
            return $("<" + parentElement + "/>").loadTemplate(template, value, internalSettings).children();
    });
    $.fn.loadTemplate = loadTemplate;
    $.addTemplateFormatter = addTemplateFormatter;

})(jQuery);

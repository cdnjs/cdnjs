(function ($) {
    "use strict";
    var templates = {},
        queue = {},
        formatters = {};

    function loadTemplate(template, data, options) {
        var $that = this,
            $template,
            settings,
            isFile;

        data = data || {};

        settings = $.extend({
            // These are the defaults.
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
            elemPerPage: 10
        }, options);

        if ($.type(data) === "array") {
            return processArray.call(this, template, data, settings);
        }

        if (!containsSlashes(template)) {
            $template = $(template);
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

    function processArray(template, data, options) {
        var $that = this,
            todo = data.length,
            done = 0,
            newOptions;

        options = options || {};

        if (options.paged) {
            var startNo = (options.pageNo - 1) * options.elemPerPage;
            data = data.slice(startNo, startNo + options.elemPerPage);
        }

        newOptions = $.extend(
            {},
            options,
            {
                complete: function () {
                    $that.append(this.html());
                    done++;
                    if (done === todo) {
                        if (options && typeof options.complete === "function") {
                            options.complete();
                        }
                    }
                }
            }
        );

        $that.html("");

        $(data).each(function () {
            var $div = $("<div/>");
            loadTemplate.call($div, template, this, newOptions);
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

        prepareTemplate.call(selection, $templateContainer, data, settings.complete);
        if (typeof settings.success === "function") {
            settings.success();
        }
    }

    function loadAndPrepareTemplate(template, selection, data, settings) {
        var $templateContainer = $("<div/>");

        templates[template] = null;
        $templateContainer.load(template, function (responseText, textStatus) {
            if (textStatus === "error") {
                handleTemplateLoadingError(template, selection, data, settings);
            } else {
                handleTemplateLoadingSuccess($templateContainer, template, selection, data, settings);
            }
        });
    }

    function loadTemplateFromDocument($template, selection, data, settings) {
        var $templateContainer = $("<div/>");

        if ($template.is("script")) {
            $template = $.parseHTML($.trim($template.html()));
        }

        $templateContainer.html($template);
        prepareTemplate.call(selection, $templateContainer, data, settings.complete);

        if (typeof settings.success === "function") {
            settings.success();
        }
    }

    function prepareTemplate(template, data, complete) {
        bindData(template, data);

        $(this).each(function () {
            $(this).html(template.html());
        });

        if (typeof complete === "function") {
            complete.call($(this));
        }
    }

    function handleTemplateLoadingError(template, selection, data, settings) {
        var value;

        if (typeof settings.error === "function") {
            settings.error.call(selection);
        }

        $(queue[template]).each(function (key, value) {
            if (typeof value.settings.error === "function") {
                value.settings.error.call(value.selection);
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
        prepareTemplate.call(selection, $templateContainer, data, settings.complete);

        if (typeof settings.success === "function") {
            settings.success.call(selection);
        }

        while (queue[template] && (value = queue[template].shift())) {
            prepareTemplate.call(value.selection, templates[template].clone(), value.data, value.settings.complete);
            if (typeof value.settings.success === "function") {
                value.settings.success.call(value.selection);
            }
        }
    }

    function bindData(template, data) {
        data = data || {};

        processElements("data-content", template, data, function ($elem, value) {
            $elem.html(applyFormatters($elem, value, "content"));
        });

        processElements("data-content-append", template, data, function ($elem, value) {
            $elem.append(applyFormatters($elem, value, "content"));
        });

        processElements("data-content-prepend", template, data, function ($elem, value) {
            $elem.prepend(applyFormatters($elem, value, "content"));
        });

        processElements("data-src", template, data, function ($elem, value) {
            $elem.attr("src", applyFormatters($elem, value, "src"));
        }, function ($elem) {
            $elem.remove();
        });

        processElements("data-alt", template, data, function ($elem, value) {
            $elem.attr("alt", applyFormatters($elem, value, "alt"));
        });

        processElements("data-link", template, data, function ($elem, value) {
            var $linkElem = $("<a/>");
            $linkElem.attr("href", applyFormatters($elem, value, "link"));
            $linkElem.html($elem.html());
            $elem.html($linkElem);
        });

        processElements("data-link-wrap", template, data, function ($elem, value) {
            var $linkElem = $("<a/>");
            $linkElem.attr("href", applyFormatters($elem, value, "link-wrap"));
            $elem.wrap($linkElem);
        });

        processElements("data-options", template, data, function ($elem, value) {
            $(value).each(function () {
                var $option = $("<option/>");
                $option.attr('value', this).text(this).appendTo($elem);
            });
        });

        processAllElements(template, data);
    }

    function processElements(attribute, template, data, dataBindFunction, noDataFunction) {
        $("[" + attribute + "]", template).each(function () {
            var $this = $(this),
                param = $this.attr(attribute),
                value = getValue(data, param);

            $this.removeAttr(attribute);

            if (value && dataBindFunction) {
                dataBindFunction($this, value);
            } else if (noDataFunction) {
                noDataFunction($this);
            }
        });
        return;
    }

    function processAllElements(template, data) {
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
                if (typeof value !== "undefined" && this.attribute) {
                    switch (this.attribute) {
                        case "content":
                            $this.html(applyDataBindFormatters(value, this));
                            break;
                        case "contentAppend":
                            $this.append(applyDataBindFormatters(value, this));
                            break;
                        case "contentPrepend":
                            $this.prepend(applyDataBindFormatters(value, this));
                            break;
                        case "options":
                            var optionsData = this;
                            $(value).each(function () {
                                var $option = $("<option/>");
                                $option.attr('value', this[optionsData.value.value]).text(applyDataBindFormatters(this[optionsData.value.content], optionsData)).appendTo($this);
                            });
                            break;
                        default:
                            $this.attr(this.attribute, applyDataBindFormatters(value, this));
                    }
                }
            });
        });
    }

    function applyDataBindFormatters(value, data) {
        if (data.formatter && formatters[data.formatter]) {
            return formatters[data.formatter](value, data.formatOptions);
        }
        return value;
    }

    function getValue(data, param) {
        var paramParts = param.split('.'),
            part,
            value = data;

        while ((part = paramParts.shift()) && typeof value !== "undefined") {
            value = value[part];
        }

        return value;
    }

    function applyFormatters($elem, value, attr) {
        var formatterTarget = $elem.attr("data-format-target"),
            formatter;

        if (formatterTarget === attr || (!formatterTarget && attr === "content")) {
            formatter = $elem.attr("data-format");
            if (formatter && typeof formatters[formatter] === "function") {
                var formatOptions = $elem.attr("data-format-options");
                return formatters[formatter](value, formatOptions);
            }
        }

        return value;
    }

    $.fn.loadTemplate = loadTemplate;
    $.addTemplateFormatter = addTemplateFormatter;

})(jQuery);
(function ($, undefined) {
    var templates = {};

    var formatters = {
        getFormattedDateString: function (dateString, template) {
            template = template || "MMMM yyyy";
            var date = new Date(dateString);
            return date.toLocaleDateString(template);
        }
    };

    function loadTemplate(template, data, options) {
        var $that = this;
        var settings = $.extend({
            // These are the defaults.
            overwriteCache: false,
            complete: null,
            success: null,
            error: function () {
                $that.each(function () {
                    $(this).html(settings.errorMessage);
                });
            },
            errorMessage: "There was an error loading the template."
        }, options);

        function containsSlashes(str) {
            return typeof str == "string" && str.indexOf("/") > -1;
        }

        if (!containsSlashes(template)) {
            var $template = $(template);
        }

        var isFile = settings.isFile || (typeof settings.isFile === "undefined" && (!$template || $template.length == 0));

        if (isFile && !settings.overwriteCache && templates[template]) {
            $templateContainer = templates[template];
            prepareTemplate($templateContainer, data);
            if (typeof settings.success == "function") {
                settings.success();
            }
        } else if (isFile) {
            var $templateContainer = $("<div/>");
            $templateContainer.load(template, function (responseText, textStatus, XMLHttpRequest) {
                if (textStatus == "error") {
                    if (typeof settings.error == "function") {
                        settings.error()
                    }
                    if (typeof settings.complete === "function") {
                        settings.complete();
                    }
                } else {
                    templates[template] = $templateContainer;
                    prepareTemplate($templateContainer, data);
                    if (textStatus == "success" && typeof settings.success == "function") {
                        settings.success();
                    }
                }
            });
        } else {
            var $templateContainer = $("<div/>");
            if ($template.is("script")) {
                $template = $.parseHTML($template.html().trim());
            }
            $templateContainer.html($template);
            prepareTemplate($templateContainer, data);
            if (typeof settings.success == "function") {
                settings.success();
            }
        }
        return this;

        function prepareTemplate(template, data) {
            bindData(template, data);
            $that.each(function () {
                $(this).html(template.html());
            });
            if (typeof settings.complete === "function") {
                settings.complete();
            }
        }

        function bindData(template, data) {
            var data = data || {};

            processElements("data-content", data, function ($elem, value) {
                var formatter = $elem.attr("data-format");
                if (formatter && typeof formatters[formatter] === "function") {
                    var formatTemplate = $elem.attr("data-format-template");
                    $elem.html(formatters[formatter](value, formatTemplate));
                } else {
                    $elem.html(value);
                }
            });

            processElements("data-src", data, function ($elem, value) {
                $elem.attr("src", value);
            }, function ($elem) {
                $elem.remove();
            });

            processElements("data-alt", data, function ($elem, value) {
                $elem.attr("alt", value);
            });

            processElements("data-link", data, function ($elem, value) {
                var $linkElem = $("<a/>");
                $linkElem.attr("href", value);
                $linkElem.html($elem.html());
                $elem.html($linkElem);
            });

            processElements("data-link-wrap", data, function ($elem, value) {
                var $linkElem = $("<a/>");
                $linkElem.attr("href", value);
                $elem.wrap($linkElem);
            });

            function processElements(attribute, data, dataBindFunction, noDataFunction) {
                $("[" + attribute + "]", template).each(function (key, val) {
                    var param = $(val).attr(attribute);
                    $(val).removeAttr(attribute);

                    if (data[param] && dataBindFunction) {
                        dataBindFunction($(val), data[param]);
                    } else if (noDataFunction) {
                        noDataFunction($(val));
                    }
                });
                return;
            }
        }
    };

    function addTemplateFormatter(key, formatter) {
        if (formatter) {
            formatters[key] = formatter;
        } else {
            formatters = $.extend(formatters, key);
        }
    }

    $.fn.loadTemplate = loadTemplate;
    $.addTemplateFormatter = addTemplateFormatter;

})(jQuery);
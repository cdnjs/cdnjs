(function ($, undefined) {
    var templates = {};
    var queue = {};
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
                $(this).each(function () {
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
            prepareTemplate.call($that, $templateContainer, data);
            if (typeof settings.success == "function") {
                settings.success();
            }
        } else if (isFile && !settings.overwriteCache && templates.hasOwnProperty(template)) {
            if (queue[template]) {
                queue[template].push(data);
            } else {
                queue[template] = [{ data: data, selection: $that}];
            }
        } else if (isFile) {
            var $templateContainer = $("<div/>");
            templates[template] = null;
            $templateContainer.load(template, function (responseText, textStatus, XMLHttpRequest) {
                if (textStatus == "error") {
                    if (typeof settings.error == "function") {
                        settings.error.call($that);
                        $(queue[template]).each(function (key, value) {
                            settings.error.call(value.selection);
                        });
                    }
                    if (typeof settings.complete === "function") {
                        settings.complete.call($that);
                        var value;
                        while(value = queue[template].pop()) {
                            settings.complete.call(value.selection);
                        }
                    }
                    if(queue[template].length > 0) {
                        queue[template] = [];
                    }
                } else {
                    templates[template] = $templateContainer;
                    prepareTemplate.call($that, $templateContainer, data);
                    if (textStatus == "success" && typeof settings.success == "function") {
                        settings.success.call($that);
                    }
                    var value;
                    while(value = queue[template].pop()) {
                        prepareTemplate.call(value.selection, $templateContainer, value.data)
                        if (textStatus == "success" && typeof settings.success == "function") {
                            settings.success.call(value.selection);
                        }
                    }
                }
            });
        } else {
            var $templateContainer = $("<div/>");
            if ($template.is("script")) {
                $template = $.parseHTML($.trim($template.html()));
            }
            $templateContainer.html($template);
            prepareTemplate.call($that, $templateContainer, data);
            if (typeof settings.success == "function") {
                settings.success();
            }
        }
        return this;

        function prepareTemplate(template, data) {
            bindData(template, data);
            $(this).each(function () {
                $(this).html(template.html());
            });
            if (typeof settings.complete === "function") {
                settings.complete();
            }
        }

        function bindData(template, data) {
            var data = data || {};

            processElements("data-content", data, function ($elem, value) {
                $elem.html(applyFormatters($elem, value, "content"));
            });

            processElements("data-src", data, function ($elem, value) {
                $elem.attr("src", applyFormatters($elem, value, "src"));
            }, function ($elem) {
                $elem.remove();
            });

            processElements("data-alt", data, function ($elem, value) {
                $elem.attr("alt", applyFormatters($elem, value, "alt"));
            });

            processElements("data-link", data, function ($elem, value) {
                var $linkElem = $("<a/>");
                $linkElem.attr("href", applyFormatters($elem, value, "link"));
                $linkElem.html($elem.html());
                $elem.html($linkElem);
            });

            processElements("data-link-wrap", data, function ($elem, value) {
                var $linkElem = $("<a/>");
                $linkElem.attr("href", applyFormatters($elem, value, "link-wrap"));
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

            function applyFormatters($elem, value, attr) {
                var formatterTarget = $elem.attr("data-format-target");
                if (formatterTarget == attr || (!formatterTarget && attr == "content")) {
                    var formatter = $elem.attr("data-format");
                    if (formatter && typeof formatters[formatter] === "function") {
                        var formatTemplate = $elem.attr("data-format-template");
                        return formatters[formatter](value, formatTemplate);
                    }
                }
                return value;
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
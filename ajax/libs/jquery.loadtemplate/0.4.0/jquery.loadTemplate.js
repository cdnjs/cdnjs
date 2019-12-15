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
        if($.type(data) === "array") {
            this.html("");
            var todo = data.length;
            var done = 0;
            options = options || {};
            var newOptions = $.extend(
                {},
                options,
                {
                    complete: function() {
                        $that.append(this.html());
                        done++;
                        if(done == todo) {
                            if(options && typeof options.complete == "function") {
                                options.complete();
                            }
                        }
                    }
                }
            );
            $(data).each(function(){
                var $div = $("<div/>");
                
                loadTemplate.call($div, template, this, newOptions);
            });
            return this;
        }
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
            $templateContainer = templates[template].clone();
            prepareTemplate.call($that, $templateContainer, data, settings.complete);
            if (typeof settings.success == "function") {
                settings.success();
            }
        } else if (isFile && !settings.overwriteCache && templates.hasOwnProperty(template)) {
            if (queue[template]) {
                queue[template].push({ data: data, selection: $that, settings: settings});
            } else {
                queue[template] = [{ data: data, selection: $that, settings: settings}];
            }
        } else if (isFile) {
            var $templateContainer = $("<div/>");
            templates[template] = null;
            $templateContainer.load(template, function (responseText, textStatus, XMLHttpRequest) {
                if (textStatus == "error") {
                    if (typeof settings.error == "function") {
                        settings.error.call($that);
                    }
                    $(queue[template]).each(function (key, value) {
                        if(typeof value.settings.error == "function") {
                            value.settings.error.call(value.selection);
                        }
                    });
                    if (typeof settings.complete === "function") {
                        settings.complete.call($that);
                        var value;
                    }
                    while(value = queue[template].shift()) {
                        if(typeof value.settings.complete === "function") {
                            value.settings.complete.call(value.selection);
                        }
                    }
                    if(queue[template].length > 0) {
                        queue[template] = [];
                    }
                } else {

                    templates[template] = $templateContainer.clone();
                    prepareTemplate.call($that, $templateContainer, data, settings.complete);
                    if (textStatus == "success" && typeof settings.success == "function") {
                        settings.success.call($that);
                    }
                    var value;
                    while(value = queue[template].shift()) {
                        prepareTemplate.call(value.selection, templates[template].clone(), value.data, value.settings.complete)
                        if (textStatus == "success" && typeof value.settings.success == "function") {
                            value.settings.success.call(value.selection);
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
            prepareTemplate.call($that, $templateContainer, data, settings.complete);
            if (typeof settings.success == "function") {
                settings.success();
            }
        }
        return this;

        function prepareTemplate(template, data, complete) {
            bindData(template, data);
            $(this).each(function () {
                $(this).html(template.html());
            });
            if (typeof complete === "function") {
                complete.call($(this));
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

            processAllElements(data);

            function processElements(attribute, data, dataBindFunction, noDataFunction) {
                $("[" + attribute + "]", template).each(function (key, val) {
                    var param = $(val).attr(attribute);
                    $(val).removeAttr(attribute);
                    var value = getValue(data, param);
                    if (value && dataBindFunction) {
                        dataBindFunction($(val), value);
                    } else if (noDataFunction) {
                        noDataFunction($(val));
                    }
                });
                return;
            }

            function getValue(data, param) {
                var paramParts = param.split('.');
                var part;
                var value = data;
                while((part = paramParts.shift()) && value) {
                    var value = value[part];
                }
                return value;
            }

            function processAllElements(data) {
                $("[data-template-bind]", template).each(function (key, val) {
                    var param = $.parseJSON($(val).attr("data-template-bind"));
                    $(val).removeAttr("data-template-bind");
                    
                    $(param).each(function(){
                       var value = getValue(data, this.value);
                       if(value && this.attribute) {
                           if(this.formatter && formatters[this.formatter])
                           {
                               value = formatters[this.formatter](value, this.formatTemplate);
                           }
                           if(this.attribute === "content") {
                               $(val).html(value);
                           } else {
                               $(val).attr(this.attribute, value);
                           }
                       }
                    });
                    
                });
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
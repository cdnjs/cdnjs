(function ($, undefined) {
    var templates = {};
    var queue = {};
    var formatters = {};

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
            errorMessage: "There was an error loading the template.",
            paged: false,
            pageNo: 1,
            elemPerPage: 10
        }, options);
        
        if($.type(data) === "array") {
            return processArray.call(this, template, data, settings);
        }        

        if (!containsSlashes(template)) {
            var $template = $(template);
        }

        var isFile = settings.isFile || (typeof settings.isFile === "undefined" && (!$template || $template.length == 0));

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
    };

    function addTemplateFormatter(key, formatter) {
        if (formatter) {
            formatters[key] = formatter;
        } else {
            formatters = $.extend(formatters, key);
        }
    }

    function containsSlashes(str) {
        return typeof str == "string" && str.indexOf("/") > -1;
    }

    function processArray(template, data, options) {
        var $that = this;
        $that.html("");
        var todo = data.length;
        var done = 0;
        options = options || {};

        if(options.paged) {
            var startNo = (options.pageNo - 1) * options.elemPerPage;
            data = data.slice(startNo, startNo + options.elemPerPage);
        }

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

    function addToQueue(template, selection, data, settings) {
        if (queue[template]) {
            queue[template].push({ data: data, selection: selection, settings: settings});
        } else {
            queue[template] = [{ data: data, selection: selection, settings: settings}];
        }
    }

    function prepareTemplateFromCache(template, selection, data, settings) {
        $templateContainer = templates[template].clone();
        prepareTemplate.call(selection, $templateContainer, data, settings.complete);
        if (typeof settings.success == "function") {
            settings.success();
        }
    }

    function loadAndPrepareTemplate(template, selection, data, settings) {
        var $templateContainer = $("<div/>");
        templates[template] = null;
        $templateContainer.load(template, function (responseText, textStatus, XMLHttpRequest) {
            if (textStatus == "error") {
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
        if (typeof settings.success == "function") {
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
        if (typeof settings.error == "function") {
            settings.error.call(selection);
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
        while(queue[template] && (value = queue[template].shift())) {
            if(typeof value.settings.complete === "function") {
                value.settings.complete.call(value.selection);
            }
        }
        if(queue[template].length > 0) {
            queue[template] = [];
        }
    }

    function handleTemplateLoadingSuccess($templateContainer, template, selection, data, settings) {
        templates[template] = $templateContainer.clone();
        prepareTemplate.call(selection, $templateContainer, data, settings.complete);
        if (typeof settings.success == "function") {
            settings.success.call($that);
        }
        var value;
        while(queue[template] && (value = queue[template].shift())) {
            prepareTemplate.call(value.selection, templates[template].clone(), value.data, value.settings.complete)
            if (typeof value.settings.success == "function") {
                value.settings.success.call(value.selection);
            }
        }
    }

    function bindData(template, data) {
        var data = data || {};

        processElements("data-content", template, data, function ($elem, value) {
            $elem.html(applyFormatters($elem, value, "content"));
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

        processAllElements(template, data);
    }

    function processElements(attribute, template, data, dataBindFunction, noDataFunction) {
        $("[" + attribute + "]", template).each(function() {
            $this = $(this);
            var param = $this.attr(attribute);
            $this.removeAttr(attribute);
            var value = getValue(data, param);
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
            $this = $(this);
            var param = $.parseJSON($this.attr("data-template-bind"));
            $this.removeAttr("data-template-bind");
                    
            $(param).each(function(){
                var value = getValue(data, this.value);
                if(value && this.attribute) {
                    if(this.formatter && formatters[this.formatter])
                    {
                        value = formatters[this.formatter](value, this.formatTemplate);
                    }
                    if(this.attribute === "content") {
                        $this.html(value);
                    } else {
                        $this.attr(this.attribute, value);
                    }
                }
            });
        });
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

    $.fn.loadTemplate = loadTemplate;
    $.addTemplateFormatter = addTemplateFormatter;

})(jQuery);
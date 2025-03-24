/*!
* DevExtreme (dx.aspnet.mvc.js)
* Version: 24.1.7
* Build date: Wed Oct 30 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
! function(factory) {
    if ("function" === typeof define && define.amd) {
        define((function(require, exports, module) {
            module.exports = factory(require("jquery"), require("./core/templates/template_engine_registry").setTemplateEngine, require("./core/templates/template_base").renderedCallbacks, require("./core/guid"), require("./ui/validation_engine"), require("./core/utils/iterator"), require("./core/utils/dom").extractTemplateMarkup, require("./core/utils/string").encodeHtml, require("./core/utils/ajax"))
        }))
    } else {
        DevExpress.aspnet = factory(window.jQuery, DevExpress.setTemplateEngine, DevExpress.templateRendered, DevExpress.data.Guid, DevExpress.validationEngine, DevExpress.utils.iterator, DevExpress.utils.dom.extractTemplateMarkup, DevExpress.utils.string.encodeHtml, DevExpress.utils.ajax)
    }
}((function($, setTemplateEngine, templateRendered, Guid, validationEngine, iteratorUtils, extractTemplateMarkup, encodeHtml, ajax) {
    var templateCompiler = function() {
        var EXTENDED_OPEN_TAG = /[<[]%/g,
            EXTENDED_CLOSE_TAG = /%[>\]]/g;

        function acceptText(bag, text) {
            if (text) {
                bag.push("_.push(", JSON.stringify(text), ");")
            }
        }

        function acceptCode(bag, code) {
            var encode = "-" === code.charAt(0),
                value = code.substr(1),
                interpolate = "=" === code.charAt(0);
            if (encode || interpolate) {
                bag.push("_.push(");
                var expression = value;
                if (encode) {
                    expression = "encodeHtml((" + value + " !== null && " + value + " !== undefined) ? " + value + ' : "")';
                    if (/^\s*$/.test(value)) {
                        expression = "encodeHtml(" + value + ")"
                    }
                }
                bag.push(expression);
                bag.push(");")
            } else {
                bag.push(code + "\n")
            }
        }
        return function(element) {
            var text = extractTemplateMarkup(element);
            var bag = ["var _ = [];", "with(obj||{}) {"],
                chunks = text.split(EXTENDED_OPEN_TAG);
            acceptText(bag, chunks.shift());
            for (var i = 0; i < chunks.length; i++) {
                var tmp = chunks[i].split(EXTENDED_CLOSE_TAG);
                if (2 !== tmp.length) {
                    throw "Template syntax error"
                }
                acceptCode(bag, tmp[0]);
                acceptText(bag, tmp[1])
            }
            bag.push("}", "return _.join('')");
            var code = bag.join("");
            try {
                return new Function("obj", "encodeHtml", code)
            } catch (e) {
                var src = element[0];
                if ("SCRIPT" === src.tagName) {
                    var funcName = src.id.replaceAll("-", "");
                    var func = "function " + funcName + "(obj,encodeHtml){\n" + code + "\n}";
                    $.globalEval(func, src, window.document);
                    return funcName
                } else {
                    return text
                }
            }
        }
    }();
    var pendingCreateComponentRoutines = [];

    function createComponent(name, options, id, validatorOptions) {
        var selector = "#" + String(id).replace(/[^\w-]/g, "\\$&");
        pendingCreateComponentRoutines.push((function() {
            var $element = $(selector);
            if ($element.length) {
                var $component = $(selector)[name](options);
                if ($.isPlainObject(validatorOptions)) {
                    $component.dxValidator(validatorOptions)
                }
                return true
            }
            return false
        }))
    }
    templateRendered.add((function() {
        var snapshot = pendingCreateComponentRoutines.slice();
        var leftover = [];
        pendingCreateComponentRoutines = [];
        snapshot.forEach((function(func) {
            if (!func()) {
                leftover.push(func)
            }
        }));
        pendingCreateComponentRoutines = pendingCreateComponentRoutines.concat(leftover)
    }));
    return {
        createComponent: createComponent,
        renderComponent: function(name, options, id, validatorOptions) {
            id = id || "dx-" + new Guid;
            createComponent(name, options, id, validatorOptions);
            return '<div id="' + id + '"></div>'
        },
        getEditorValue: function(inputName) {
            var $widget = $("input[name='" + inputName + "']").closest(".dx-widget");
            if ($widget.length) {
                var dxComponents = $widget.data("dxComponents"),
                    widget = $widget.data(dxComponents[0]);
                if (widget) {
                    return widget.option("value")
                }
            }
        },
        setTemplateEngine: function() {
            if (setTemplateEngine) {
                setTemplateEngine({
                    compile: function(element) {
                        return templateCompiler(element)
                    },
                    render: function(template, data) {
                        if (template instanceof Function) {
                            var html = template(data, encodeHtml);
                            var dxMvcExtensionsObj = window.MVCx;
                            if (dxMvcExtensionsObj && !dxMvcExtensionsObj.isDXScriptInitializedOnLoad) {
                                html = html.replace(/(<script[^>]+)id="dxss_.+?"/g, "$1")
                            }
                            return html
                        } else if (window[template] instanceof Function) {
                            return window[template](data, encodeHtml)
                        } else if ("string" === typeof template) {
                            return template
                        } else {
                            throw "Unknown template type"
                        }
                    }
                })
            }
        },
        createValidationSummaryItems: function(validationGroup, editorNames) {
            var groupConfig, items, summary = function(validationGroup) {
                var result;
                $(".dx-validationsummary").each((function(_, element) {
                    var summary = $(element).data("dxValidationSummary");
                    if (summary && summary.option("validationGroup") === validationGroup) {
                        result = summary;
                        return false
                    }
                }));
                return result
            }(validationGroup);
            if (summary) {
                groupConfig = validationEngine.getGroupConfig(validationGroup);
                if (groupConfig) {
                    items = function(validators, editorNames) {
                        var items = [];
                        iteratorUtils.each(validators, (function(_, validator) {
                            var widget = validator.$element().data("dx-validation-target");
                            if (widget && $.inArray(widget.option("name"), editorNames) > -1) {
                                items.push({
                                    text: widget.option("validationError.message"),
                                    validator: validator
                                })
                            }
                        }));
                        return items
                    }(groupConfig.validators, editorNames);
                    items.length && summary.option("items", items)
                }
            }
        },
        sendValidationRequest: function(propertyName, params, url, method, additionalFields) {
            var d = $.Deferred();
            var data = {};
            data[propertyName] = params.value;
            if (additionalFields.length && params.data) {
                additionalFields.forEach((function(field) {
                    data[field] = params.data[field]
                }))
            }
            ajax.sendRequest({
                url: url,
                dataType: "json",
                method: method || "GET",
                data: data
            }).then((function(response) {
                if ("string" === typeof response) {
                    d.resolve({
                        isValid: false,
                        message: response
                    })
                } else {
                    d.resolve(response)
                }
            }), (function(xhr) {
                d.reject({
                    isValid: false,
                    message: xhr.responseText
                })
            }));
            return d.promise()
        }
    }
}));

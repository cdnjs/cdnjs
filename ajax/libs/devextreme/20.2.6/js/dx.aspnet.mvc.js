/*!
* DevExtreme (dx.aspnet.mvc.js)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
! function(factory) {
    if ("function" === typeof define && define.amd) {
        define(function(require, exports, module) {
            module.exports = factory(require("jquery"), require("./core/templates/template_engine_registry").setTemplateEngine, require("./core/templates/template_base").renderedCallbacks, require("./core/guid"), require("./ui/validation_engine"), require("./core/utils/iterator"), require("./core/utils/dom").extractTemplateMarkup, require("./core/utils/string").encodeHtml, require("./core/utils/ajax"), require("./core/utils/console"))
        })
    } else {
        DevExpress.aspnet = factory(window.jQuery, DevExpress.setTemplateEngine, DevExpress.templateRendered, DevExpress.data.Guid, DevExpress.validationEngine, DevExpress.utils.iterator, DevExpress.utils.dom.extractTemplateMarkup, DevExpress.utils.string.encodeHtml, DevExpress.utils.ajax, DevExpress.utils.console)
    }
}(function($, setTemplateEngine, templateRendered, Guid, validationEngine, iteratorUtils, extractTemplateMarkup, encodeHtml, ajax, console) {
    var templateCompiler = createTemplateCompiler();
    var pendingCreateComponentRoutines = [];
    var enableAlternativeTemplateTags = true;
    var warnBug17028 = false;

    function createTemplateCompiler() {
        var OPEN_TAG = "<%",
            CLOSE_TAG = "%>",
            ENCODE_QUALIFIER = "-",
            INTERPOLATE_QUALIFIER = "=";
        var EXTENDED_OPEN_TAG = /[<[]%/g,
            EXTENDED_CLOSE_TAG = /%[>\]]/g;

        function acceptText(bag, text) {
            if (text) {
                bag.push("_.push(", JSON.stringify(text), ");")
            }
        }

        function acceptCode(bag, code) {
            var encode = code.charAt(0) === ENCODE_QUALIFIER,
                value = code.substr(1),
                interpolate = code.charAt(0) === INTERPOLATE_QUALIFIER;
            if (encode || interpolate) {
                bag.push("_.push(");
                var expression = value;
                if (encode) {
                    expression = "arguments[1]((" + value + " !== null && " + value + " !== undefined) ? " + value + ' : "")';
                    if (/^\s*$/.test(value)) {
                        expression = "arguments[1](" + value + ")"
                    }
                }
                bag.push(expression);
                bag.push(");")
            } else {
                bag.push(code + "\n")
            }
        }
        return function(text) {
            var bag = ["var _ = [];", "with(obj||{}) {"],
                chunks = text.split(enableAlternativeTemplateTags ? EXTENDED_OPEN_TAG : OPEN_TAG);
            if (warnBug17028 && chunks.length > 1) {
                if (text.indexOf(OPEN_TAG) > -1) {
                    console.logger.warn("Please use an alternative template syntax: https://community.devexpress.com/blogs/aspnet/archive/2020/01/29/asp-net-core-new-syntax-to-fix-razor-issue.aspx");
                    warnBug17028 = false
                }
            }
            acceptText(bag, chunks.shift());
            for (var i = 0; i < chunks.length; i++) {
                var tmp = chunks[i].split(enableAlternativeTemplateTags ? EXTENDED_CLOSE_TAG : CLOSE_TAG);
                if (2 !== tmp.length) {
                    throw "Template syntax error"
                }
                acceptCode(bag, tmp[0]);
                acceptText(bag, tmp[1])
            }
            bag.push("}", "return _.join('')");
            return new Function("obj", bag.join(""))
        }
    }

    function createTemplateEngine() {
        return {
            compile: function(element) {
                return templateCompiler(extractTemplateMarkup(element))
            },
            render: function(template, data) {
                var html = template(data, encodeHtml);
                var dxMvcExtensionsObj = window.MVCx;
                if (dxMvcExtensionsObj && !dxMvcExtensionsObj.isDXScriptInitializedOnLoad) {
                    html = html.replace(/(<script[^>]+)id="dxss_.+?"/g, "$1")
                }
                return html
            }
        }
    }

    function getValidationSummary(validationGroup) {
        var result;
        $(".dx-validationsummary").each(function(_, element) {
            var summary = $(element).data("dxValidationSummary");
            if (summary && summary.option("validationGroup") === validationGroup) {
                result = summary;
                return false
            }
        });
        return result
    }

    function createValidationSummaryItemsFromValidators(validators, editorNames) {
        var items = [];
        iteratorUtils.each(validators, function(_, validator) {
            var widget = validator.$element().data("dx-validation-target");
            if (widget && $.inArray(widget.option("name"), editorNames) > -1) {
                items.push({
                    text: widget.option("validationError.message"),
                    validator: validator
                })
            }
        });
        return items
    }

    function createComponent(name, options, id, validatorOptions) {
        var selector = "#" + String(id).replace(/[^\w-]/g, "\\$&");
        pendingCreateComponentRoutines.push(function() {
            var $element = $(selector);
            if ($element.length) {
                var $component = $(selector)[name](options);
                if ($.isPlainObject(validatorOptions)) {
                    $component.dxValidator(validatorOptions)
                }
                return true
            }
            return false
        })
    }
    templateRendered.add(function() {
        var snapshot = pendingCreateComponentRoutines.slice();
        var leftover = [];
        pendingCreateComponentRoutines = [];
        snapshot.forEach(function(func) {
            if (!func()) {
                leftover.push(func)
            }
        });
        pendingCreateComponentRoutines = pendingCreateComponentRoutines.concat(leftover)
    });
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
                setTemplateEngine(createTemplateEngine())
            }
        },
        enableAlternativeTemplateTags: function(value) {
            enableAlternativeTemplateTags = value
        },
        warnBug17028: function() {
            warnBug17028 = true
        },
        createValidationSummaryItems: function(validationGroup, editorNames) {
            var groupConfig, items, summary = getValidationSummary(validationGroup);
            if (summary) {
                groupConfig = validationEngine.getGroupConfig(validationGroup);
                if (groupConfig) {
                    items = createValidationSummaryItemsFromValidators(groupConfig.validators, editorNames);
                    items.length && summary.option("items", items)
                }
            }
        },
        sendValidationRequest: function(propertyName, propertyValue, url, method) {
            var d = $.Deferred();
            var data = {};
            data[propertyName] = propertyValue;
            ajax.sendRequest({
                url: url,
                dataType: "json",
                method: method || "GET",
                data: data
            }).then(function(response) {
                if ("string" === typeof response) {
                    d.resolve({
                        isValid: false,
                        message: response
                    })
                } else {
                    d.resolve(response)
                }
            }, function(xhr) {
                d.reject({
                    isValid: false,
                    message: xhr.responseText
                })
            });
            return d.promise()
        }
    }
});

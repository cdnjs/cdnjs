/*
 * Copyright 2015 brutusin.org
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * @author Ignacio del Valle Alles idelvall@brutusin.org
 */
if ("undefined" === typeof brutusin || "undefined" === typeof brutusin["json-forms"]) {
    throw new Error("brutusin-json-forms-bootstrap.js requires brutusin-json-forms.js");
}
if ("undefined" === typeof markdown && window.console) {
    console.warn("Include markdown.js (https://github.com/evilstreak/markdown-js) to add markdown support in property description popups");
}

if (("undefined" === typeof $ || "undefined" === typeof $.fn || "undefined" === typeof $.fn.selectpicker) && window.console) {
    console.warn("Include bootstrap-select.js (https://github.com/silviomoreto/bootstrap-select) to turn native selects into bootstrap components");
}

(function () {
    var BrutusinForms = brutusin["json-forms"];

// Basic bootstrap css
    BrutusinForms.addDecorator(function (element, schema) {
        if (element.tagName) {
            var tagName = element.tagName.toLowerCase();
            if (tagName === "input" && element.type !== "checkbox" || tagName === "textarea") {
                element.className += " form-control";
            } else if (tagName === "select") {
                element.className += " chosen-select form-control";
            } else if (tagName === "button") {
                if (element.className === "remove") {
                    element.className += " glyphicon glyphicon-remove";
                    while (element.firstChild) {
                        element.removeChild(element.firstChild);
                    }
                }
                element.className += " btn btn-primary  btn-xs";
            } else if (tagName === "form") {
                element.className += " form-inline";
            }
        }
    });
    

// Description help icon
    BrutusinForms.addDecorator(function (element, schema) {
        if (element.tagName) {
            var tagName = element.tagName.toLowerCase();
            if (tagName === "label" || tagName === "button") {
                if (element.title) {
                    var helpLink = document.createElement("a");
                    helpLink.setAttribute("style", "outline: 0; text-decoration: none; margin-left: 2px;");
                    helpLink.setAttribute("tabIndex", -1);
                    helpLink.className = "glyphicon glyphicon-info-sign"
                    helpLink.setAttribute("data-toggle", "popover");
                    helpLink.setAttribute("data-trigger", "focus");
                    if ("undefined" === typeof markdown) {
                        helpLink.setAttribute("data-content", element.title);
                    } else {
                        helpLink.setAttribute("data-content", markdown.toHTML(element.title));
                    }
                    if (schema.title) {
                        helpLink.title = schema.title;
                    } else {
                        helpLink.title = "Help";
                    }
                    $(helpLink).popover({
                        placement: 'top',
                        container: 'body',
                        html: !("undefined" === typeof markdown)
                    });
                    element.parentNode.appendChild(helpLink);
                }
            }
        }
    });

// Popover over inputs
//BrutusinForms.addDecorator(function (element, schema) {
//if (element.tagName) {
//        if (element.title && (tagName === "input" || tagName === "textarea" || tagName === "select")) {
//            element.setAttribute("data-toggle", "tooltip");
//            element.setAttribute("data-trigger", "focus");
//            if ("undefined" === typeof markdown) {
//                element.setAttribute("data-content", element.title);
//            } else {
//                element.setAttribute("data-content", markdown.toHTML(element.title));
//            }
//            if (schema.title) {
//                element.title = schema.title;
//            } else {
//                element.title = "Help";
//            }
//            $(element).popover({
//                placement: 'top',
//                container: 'body',
//                html: !("undefined" === typeof markdown)
//            });
//        }input
//    }
//});
// Bootstrap select
    BrutusinForms.addDecorator(function (element, schema) {
        if (element.tagName) {
            var tagName = element.tagName.toLowerCase();
            // https://github.com/silviomoreto/bootstrap-select
            if (!("undefined" === typeof $ || "undefined" === typeof $.fn || "undefined" === typeof $.fn.selectpicker) && tagName === "select") {
                element.title = "";
                element.className += " selectpicker";
                element.setAttribute("data-live-search", true);
                $(element).selectpicker();
            }
        }
    });
    BrutusinForms.bootstrap = new Object();
// helper button for string (with format) fields
    BrutusinForms.bootstrap.addFormatDecorator = function (format, inputType, glyphicon, cb) {
        BrutusinForms.addDecorator(function (element, schema) {
            if (element.tagName) {
                var tagName = element.tagName.toLowerCase();
                if (tagName === "input" && schema.type === "string" && schema.format === format) {
                    if (inputType) {
                        element.type = inputType;
                    }
                    if (glyphicon) {
                        var parent = element.parentNode;
                        var table = document.createElement("table");
                        table.setAttribute("style", "border:none;margin:0");
                        var tr = document.createElement("tr");
                        var td1 = document.createElement("td");
                        td1.setAttribute("style", "width:100%; padding:0;padding-right:4px");
                        table.appendChild(tr);
                        tr.appendChild(td1);
                        parent.removeChild(element);
                        td1.appendChild(element);
                        parent.appendChild(table);
                        var td = document.createElement("td");
                        tr.appendChild(td);
                        td.setAttribute("style", "padding:0");
                        var searchButton = document.createElement("button");
                        searchButton.className = "btn btn-default glyphicon " + glyphicon;
                        searchButton.onclick = function () {
                            cb(element);
                        };
                        td.appendChild(searchButton);
                    }
                }
            }
        });
    };
    BrutusinForms.bootstrap.showLoading = function (element) {
        if (element && element.parentNode) {
            var loadingId = element.id + "_loading";
            var loadingLayerId = element.id + "_loading-layer";
            var loading = document.getElementById(loadingId);
            var loadingLayer = document.getElementById(loadingLayerId);
            if (!loading) {
                var tagName = element.tagName.toLowerCase();
                element.parentNode.style.position = "relative";
                loading = document.createElement("span");
                loading.id = loadingId;
                loading.className = "glyphicon glyphicon-refresh glyphicon-refresh-animate";
                if (tagName === "select") {
                    loading.className += " loading-icon-select";
                } else if (element.type === "checkbox") {
                    loading.className += " loading-icon-checkbox";
                } else {
                    loading.className += " loading-icon";
                }
                element.parentNode.appendChild(loading);
                loadingLayer = document.createElement("div");
                loadingLayer.className = "loading-layer";
                loadingLayer.appendChild(document.createTextNode(""));
                loadingLayer.id = loadingLayerId;
                element.parentNode.appendChild(loadingLayer);
            }
            loading.style.visibility = "visible";
            loadingLayer.style.visibility = "visible";
        }
    }
    BrutusinForms.bootstrap.hideLoading = function (element) {
        if (element) {
            var loadingId = element.id + "_loading";
            var loadingLayerId = element.id + "_loading-layer";
            var loading = document.getElementById(loadingId);
            var loadingLayer = document.getElementById(loadingLayerId);
            if (loading) {
                loading.style.visibility = "hidden";
            }
            if (loadingLayer) {
                loadingLayer.style.visibility = "hidden";
            }
        }
    }

    BrutusinForms.onResolutionStarted = BrutusinForms.bootstrap.showLoading;
    BrutusinForms.onResolutionFinished = BrutusinForms.bootstrap.hideLoading;

    BrutusinForms.onValidationSuccess = function (element) {
        element.parentNode.className = element.parentNode.className.replace(" has-error", "");
    }
    BrutusinForms.onValidationError = function (element, message) {

        setTimeout(function () {
            var dataToggle = element.getAttribute("data-toggle");
            var dataTrigger = element.getAttribute("data-trigger");
            var dataContent = element.getAttribute("data-content");
            var title = element.title;
            element.setAttribute("data-toggle", "popover");
            element.setAttribute("data-trigger", "manual");
            if ("undefined" === typeof markdown) {
                element.setAttribute("data-content", message);
            } else {
                element.setAttribute("data-content", markdown.toHTML(message));
            }

            element.title = BrutusinForms.messages["validationError"];
            if (!element.parentNode.className.includes("has-error")) {
                element.parentNode.className += " has-error";
            }
            element.focus();
            $(element).popover({
                placement: 'top',
                container: 'body',
                html: true
            });
            $(element).popover("show");
            var onblur = element.onblur;
            element.onblur = function (e) {
                if (dataToggle) {
                    $(element).popover('hide');
                    element.setAttribute("data-toggle", dataToggle);
                    element.setAttribute("data-trigger", dataTrigger);
                    element.setAttribute("data-content", dataContent);
                } else {
                    $(element).popover('destroy');
                    element.removeAttribute("data-toggle");
                    element.removeAttribute("data-trigger");
                    element.removeAttribute("data-content");
                }

                element.onblur = onblur;
                element.title = title;
                if (onblur) {
                    onblur();
                }
            }
        },
                200);
    }
}());
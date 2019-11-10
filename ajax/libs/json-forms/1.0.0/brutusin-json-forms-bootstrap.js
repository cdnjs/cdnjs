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
if ("undefined" === typeof BrutusinForms) {
    throw new Error("brutusin-json-forms-bootstrap.js requires brutusin-json-forms.js");
}
if ("undefined" === typeof markdown && window.console) {
    console.warn("Include markdown.js (https://github.com/evilstreak/markdown-js) to add markdown support in property description popups");
}

if (("undefined" === typeof $ || "undefined" === typeof $.fn || "undefined" === typeof $.fn.selectpicker) && window.console) {
    console.warn("Include bootstrap-select.js (https://github.com/silviomoreto/bootstrap-select) to turn native selects into bootstrap components");
}

BrutusinForms.addDecorator(function (element, schema) {
    if (element.tagName) {
        var tagName = element.tagName.toLowerCase();
        if (tagName === "input" && element.type !== "checkbox" || tagName === "textarea") {
            element.className += " form-control";
        } else if (tagName === "select") {
            element.className += " chosen-select form-control";
        } else if (tagName === "button") {
            element.className += "btn btn-primary  btn-xs";
        } else if (tagName === "form") {
            element.className += " form-inline";
        } 
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
//        }
        // https://github.com/silviomoreto/bootstrap-select
        if (!("undefined" === typeof $ || "undefined" === typeof $.fn || "undefined" === typeof $.fn.selectpicker) && tagName === "select") {
            element.title = "";
            element.className += " selectpicker";
            element.setAttribute("data-live-search", true);
            $(element).selectpicker();
        }
    }
});
/*
 * custom-elements-builder 0.0.0 http://tmorin.github.io/custom-elements-builder
 * Custom Elements Builder (ceb) is ... a builder for Custom Elements.
 * Buil date: 2015-01-30
 * Copyright 2015-2015 Thibault Morin
 * Available under MIT license
 */
// # ceb-feature-template.js
// ## Light DOM
//
// The template can contains a node having the attribute `ceb-content`.
// The marked node is intend to host the light DOM of the current element at the end of the templating process.
//
// If the template doesn't contain this node, the light DOM will be lost.
//
// ## DOM nodes references
//
// The template can contains nodes having the attribute `ceb-ref`.
// The marked nodes will be available at the end of the templating process from the feature function (`feature(el)`).
//
// That means, if a node has the attribute `ceb-ref="header"`.
// It will be available via `feature(el).header`.
(function(g, factory) {
    "use strict";
    /* istanbul ignore next */
    if (typeof exports === "object") {
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        define("ceb-feature-template", [], factory);
    } else {
        g.cebFeatureTemplate = factory();
    }
})(this, function() {
    "use strict";
    // ## feature function
    // The template feature's function returns the nodes' reference of the template.
    function feature(el) {
        if (!el.__cebTemplateScope) {
            el.__cebTemplateScope = {};
        }
        return el.__cebTemplateScope;
    }
    // ## Templating stuff
    // The counter is used to generate unique DOM's id.
    var counter = 0;
    // Regex to detect the *ceb-ref* attributes
    var nodesRegEx = /ceb\-ref=\W*(\w*)/gim;
    // Regex to detect the *ceb-content* attribute
    var contentRegEx = /ceb\-content/im;
    // Apply a template to an element.
    function apply(tpl, el, isHandleLightDOM, isNodeReferences) {
        var lightChildren = [], refrencedNodes = [], oldCebContentId, newCebContentId, template = tpl;
        if (isNodeReferences) {
            // Update the template to detect the DOM nodes references.
            var result;
            while ((result = nodesRegEx.exec(template)) !== null) {
                var property = result[1];
                // build an id of the reference
                var newAtt = "ceb-" + counter++ + "-ref";
                // replace the original attribute name by the idenitifer
                template = template.replace(" ceb-ref", " " + newAtt);
                // push the entry
                refrencedNodes.push({
                    attribute: newAtt,
                    property: property
                });
            }
        }
        if (isHandleLightDOM) {
            // When a node is cloned the light DOM of the cloned has to be retrived.
            oldCebContentId = el.getAttribute("ceb-old-content-id");
            // Generate the new content's id value.
            newCebContentId = "ceb-" + counter++ + "-content";
            // Replace the original attribute name by the id.
            template = template.replace(" ceb-content", " " + newCebContentId);
            // Keep a value of the content's id value if the node is cloned.
            el.setAttribute("ceb-old-content-id", newCebContentId);
            // Get the current root of light DOM nodes,
            // if the node has been cloned the root is the element binding the old content id
            // else it's the current element.
            var lightDomNode = oldCebContentId && el.querySelector("[" + oldCebContentId + "]") || el;
            // Iterate over the light DOM nodes in order to removed them from the DOM.
            // They will re-added into the DOM when the content node of the elementn will be ready.
            while (lightDomNode.childNodes.length > 0) {
                // The following line works only with webcomponent.js
                // lightChildren.push(lightDomNode.removeChild(lightDomNode.childNodes[0]));
                // The following line works with both webcomponent.js and document-register-element.
                // But each node have to be cloned :(
                lightChildren.push(lightDomNode.removeChild(lightDomNode.childNodes[0]).cloneNode(true));
            }
        }
        // Transform the template string into alive DOM nodes.
        el.innerHTML = template;
        // Add the light DOM nodes removed above into the new content node.
        el.applyLigthDOM(lightChildren);
        if (isNodeReferences) {
            // Get the reference nodes and attach them to the element templating scope.
            refrencedNodes.forEach(function(entry) {
                feature(el)[entry.property] = el.querySelector("[" + entry.attribute + "]");
            });
        }
    }
    // ## Setup function
    // The templeting process is done before the call of the `createdCallback` method defined in the structure.
    function setup(struct, builder, options) {
        var tpl = options.template || "";
        var isHandleLightDOM = tpl.search(contentRegEx) !== -1;
        var isNodeReferences = tpl.search(nodesRegEx) !== -1;
        // Register a method to handle the light DOM nodes
        builder.methods({
            applyLigthDOM: function(el, lightChildren) {
                setTimeout(function() {
                    var contentNode = el.querySelector("[" + el.getAttribute("ceb-old-content-id") + "]");
                    if (contentNode) {
                        if (typeof contentNode.applyLigthDOM === "function") {
                            contentNode.applyLigthDOM(lightChildren);
                        } else {
                            lightChildren.forEach(function(child) {
                                contentNode.appendChild(child);
                            });
                        }
                    }
                }, 0);
            }
        });
        // Register a wrapper to the createdCallback callback in order to
        // apply the template before the original call.
        builder.wrap("createdCallback", function(next, el) {
            apply(tpl, el, isHandleLightDOM, isNodeReferences);
            next(arguments);
        });
    }
    feature.setup = setup;
    return feature;
});
//
//     custom-elements-builder 0.2.0 http://tmorin.github.io/custom-elements-builder
//     Custom Elements Builder (ceb) is ... a builder for Custom Elements.
//     Buil date: 2015-02-02
//     Copyright 2015-2015 Thibault Morin
//     Available under MIT license
//
(function (g, factory) {
    'use strict';

    /* istanbul ignore next */
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define('ceb-feature-template', [], factory);
    } else {
        g.cebFeatureTemplate = factory();
    }

}(this, function () {
    'use strict';

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
    var nodesRegEx = /ceb\-ref=\W*(\w*)/igm;

    // Regex to detect the *ceb-content* attribute
    var contentRegEx = /ceb\-content/im;

    // Find recursively the content's node of the current element.
    function findContentNode(el) {
        var oldCebContentId = el.getAttribute('ceb-old-content-id');
        if (oldCebContentId) {
            return findContentNode(el.querySelector('[' + oldCebContentId + ']'));
        }
        return el;
    }

    // Apply a template to an element.
    function apply(tpl, el, isHandleLightDOM, isNodeReferences) {
        var lightChildren = [],
            refrencedNodes = [],
            template = tpl;

        if (isNodeReferences) {
            // Update the template to detect the DOM nodes references.
            var result;
            while ((result = nodesRegEx.exec(template)) !== null) {
                var property = result[1];
                // build an id of the reference
                var newAtt = 'ceb-' + (counter++) + '-ref';
                // replace the original attribute name by the idenitifer
                template = template.replace(' ceb-ref', ' ' + newAtt);
                // push the entry
                refrencedNodes.push({
                    attribute: newAtt,
                    property: property
                });
            }
        }

        if (isHandleLightDOM) {
            // Get the current content node having the light DOM nodes,
            // When the node is freshly created, the content node is the element.
            // When the node has been created by clonning, the content node is not anymore the element,
            // but a sub content node linked to one of its descents.

            var oldContentNode = findContentNode(el);

            // Remove the light DOM to keep it.
            while (oldContentNode.childNodes.length > 0) {
                lightChildren.push(oldContentNode.removeChild(oldContentNode.childNodes[0]));
            }
            // lightChildren = Array.prototype.slice.call(oldContentNode.childNodes);

            // Generate the new content's id value.
            var newCebContentId = 'ceb-' + (counter++) + '-content';

            // Replace the original attribute name by the id.
            template = template.replace(' ceb-content', ' ' + newCebContentId);

            // Keep a value of the content's id value if the node is cloned.
            el.setAttribute('ceb-old-content-id', newCebContentId);
        }

        // Transform the template string into an alive DOM nodes.
        el.innerHTML = template;

        if (isHandleLightDOM) {
            // Get the content node to add him the in pending light DOM.
            var newContentNode = findContentNode(el);
            lightChildren.forEach(function (child) {
                newContentNode.appendChild(child);
                // newContentNode.appendChild(child);
            });
        }

        if (isNodeReferences) {
            // Get the reference nodes and attach them to the element templating scope.
            refrencedNodes.forEach(function (entry) {
                feature(el)[entry.property] = el.querySelector('[' + entry.attribute + ']');
            });
        }

    }

    // ## Setup function

    // The templeting process is done before the call of the `createdCallback` method defined in the structure.
    function setup(struct, builder, options) {
        var tpl = options.template || '';
        var isHandleLightDOM = tpl.search(contentRegEx) !== -1;
        var isNodeReferences = tpl.search(nodesRegEx) !== -1;
        // Register a wrapper to the createdCallback callback in order to
        // apply the template before the original call.
        builder.wrap('createdCallback', function (next, el) {
            apply(tpl, el, isHandleLightDOM, isNodeReferences);
            next(arguments);
        });
        if (isHandleLightDOM) {
            builder.properties({
                contentNode: {
                    get: function (el) {
                        return findContentNode(el);
                    }
                }
            });
        }
    }
    feature.setup = setup;

    return feature;
}));

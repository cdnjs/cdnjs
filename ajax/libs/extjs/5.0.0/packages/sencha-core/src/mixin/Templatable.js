/**
 *
 */
Ext.define('Ext.mixin.Templatable', {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'templatable'
    },

    referenceAttributeName: 'reference',

    referenceSelector: '[reference]',

    getElementConfig: function() {
        return {
            reference: 'element'
        };
    },

    getElementTemplate: function() {
        var elementTemplate = document.createDocumentFragment();
        elementTemplate.appendChild(Ext.Element.create(this.getElementConfig(), true));
        return elementTemplate;
    },

    initElement: function() {
        var prototype = this.self.prototype;

        prototype.elementTemplate = this.getElementTemplate();
        prototype.initElement = prototype.doInitElement;

        this.initElement.apply(this, arguments);
    },

    linkElement: function(reference, node) {
        this.link(reference, node);
    },

    doInitElement: function() {
        var referenceAttributeName = this.referenceAttributeName,
            renderElement, referenceNodes, i, ln, referenceNode, reference;

        renderElement = this.elementTemplate.cloneNode(true);
        referenceNodes = renderElement.querySelectorAll(this.referenceSelector);

        for (i = 0,ln = referenceNodes.length; i < ln; i++) {
            referenceNode = referenceNodes[i];
            reference = referenceNode.getAttribute(referenceAttributeName);
            referenceNode.removeAttribute(referenceAttributeName);
            this.linkElement(reference, referenceNode);
        }
    }
});

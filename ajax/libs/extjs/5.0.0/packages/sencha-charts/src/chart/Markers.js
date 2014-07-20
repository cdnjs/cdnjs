/**
 * @class Ext.chart.Markers
 * @extends Ext.draw.sprite.Instancing
 * 
 * Marker sprite. A specialized version of instancing sprite that groups instances.
 * Putting a marker is grouped by its category id. Clearing removes that category.
 */
Ext.define('Ext.chart.Markers', {
    extend: 'Ext.draw.sprite.Instancing',

    defaultCategory: 'default',

    constructor: function () {
        this.callParent(arguments);
        // 'categories' maps category names to a map that maps instance index in category to its global index:
        // categoryName: {instanceIndexInCategory: globalInstanceIndex}
        this.categories = {};
        this.revisions = {};
    },

    /**
     * Clears the markers in the category.
     * @param {String} category
     */
    clear: function (category) {
        category = category || this.defaultCategory;
        if (!(category in this.revisions)) {
            this.revisions[category] = 1;
        } else {
            this.revisions[category]++;
        }
    },

    /**
     * Puts a marker in the category with additional attributes.
     * @param {String} category
     * @param {Object} attr
     * @param {String|Number} index
     * @param {Boolean} [canonical]
     * @param {Boolean} [keepRevision]
     */
    putMarkerFor: function (category, attr, index, canonical, keepRevision) {
        category = category || this.defaultCategory;

        var me = this,
            categoryInstances = me.categories[category] || (me.categories[category] = {});
        if (index in categoryInstances) {
            me.setAttributesFor(categoryInstances[index], attr, canonical);
        } else {
            categoryInstances[index] = me.instances.length; // the newly created instance will go into me.instances
            me.createInstance(attr, null, canonical);
        }
        me.instances[categoryInstances[index]].category = category;
        if (!keepRevision) {
            me.instances[categoryInstances[index]].revision = me.revisions[category] || (me.revisions[category] = 1);
        }
    },

    /**
     *
     * @param {String} category
     * @param {Mixed} index
     * @param {Boolean} [isWithoutTransform]
     */
    getMarkerBBoxFor: function (category, index, isWithoutTransform) {
        if (category in this.categories) {
            var categoryInstances = this.categories[category];
            if (index in categoryInstances) {
                return this.getBBoxFor(categoryInstances[index], isWithoutTransform);
            }
        }
        return {
            x: Infinity,
            y: Infinity,
            width: -Infinity,
            height: -Infinity
        };
    },

    getBBox: function () { return null; },

    render: function (surface, ctx, clipRect) {
        var me = this,
            revisions = me.revisions,
            mat = me.attr.matrix,
            template = me.getTemplate(),
            originalAttr = template.attr,
            instances = me.instances,
            i, ln = me.instances.length;
        mat.toContext(ctx);
        template.preRender(surface, ctx, clipRect);
        template.useAttributes(ctx);
        for (i = 0; i < ln; i++) {
            if (instances[i].hidden || instances[i].revision !== revisions[instances[i].category]) {
                continue;
            }
            ctx.save();
            template.attr = instances[i];
            template.applyTransformations();
            template.useAttributes(ctx);
            template.render(surface, ctx, clipRect);
            ctx.restore();
        }
        template.attr = originalAttr;
    }
});
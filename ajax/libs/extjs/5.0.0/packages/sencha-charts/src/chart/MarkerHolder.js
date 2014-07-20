/**
 * Mixin that provides the functionality to place markers.
 */
Ext.define('Ext.chart.MarkerHolder', {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'markerHolder',
        after: {
            constructor: 'constructor',
            preRender: 'preRender'
        }
    },

    isMarkerHolder: true,

    constructor: function () {
        this.boundMarkers = {};
        this.cleanRedraw = false;
    },

    /**
     *
     * @param {String} name
     * @param {Ext.chart.Markers} marker
     */
    bindMarker: function (name, marker) {
        if (marker) {
            if (!this.boundMarkers[name]) {
                this.boundMarkers[name] = [];
            }
            Ext.Array.include(this.boundMarkers[name], marker);
        }
    },

    getBoundMarker: function (name) {
        return this.boundMarkers[name];
    },

    preRender: function () {
        var boundMarkers = this.boundMarkers, boundMarkersItem,
            name, i, ln, id = this.getId(),
            parent = this.getParent(),
            matrix = this.surfaceMatrix ? this.surfaceMatrix.set(1, 0, 0, 1, 0, 0) : (this.surfaceMatrix = new Ext.draw.Matrix());

        this.cleanRedraw = !this.attr.dirty;
        if (!this.cleanRedraw) {
            for (name in this.boundMarkers) {
                if (boundMarkers[name]) {
                    for (boundMarkersItem = boundMarkers[name], i = 0, ln = boundMarkersItem.length; i < ln; i++) {
                        boundMarkersItem[i].clear(id);
                    }
                }
            }
        }

        while (parent && parent.attr && parent.attr.matrix) {
            matrix.prependMatrix(parent.attr.matrix);
            parent = parent.getParent();
        }
        matrix.prependMatrix(parent.matrix);
        this.surfaceMatrix = matrix;
        this.inverseSurfaceMatrix = matrix.inverse(this.inverseSurfaceMatrix);
    },

    putMarker: function (name, attr, index, canonical, keepRevision) {
        var boundMarkersItem, i, ln, id = this.getId();
        if (this.boundMarkers[name]) {
            for (boundMarkersItem = this.boundMarkers[name], i = 0, ln = boundMarkersItem.length; i < ln; i++) {
                boundMarkersItem[i].putMarkerFor(id, attr, index, canonical, keepRevision);
            }
        }
    },

    getMarkerBBox: function (name, index, isWithoutTransform) {
        var boundMarker = this.boundMarkers[name],
            id = this.getId();
        if (boundMarker) {
            return boundMarker[0].getMarkerBBoxFor(id, index, isWithoutTransform);
        }
    }

});

/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = StyleReader
 *  base_link = `Ext.data.JsonReader <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.JsonReader>`_
 */
Ext.namespace("GeoExt.data");

/** api: constructor
 *  .. class:: StyleReader
 *
 *  A smart reader that creates records for client-side rendered legends. If
 *  its store is configured with an ``OpenLayers.Style2`` instance as ``data``,
 *  each record will represent a Rule of the Style, and the store will be
 *  configured with ``symbolizers`` (Array of ``OpenLayers.Symbolizer``),
 *  ``filter`` (``OpenLayers.Filter``), ``label`` (String, the rule's title),
 *  ``name`` (String), ``description`` (String), ``elseFilter`` (Boolean),
 *  ``minScaleDenominator`` (Number) and ``maxScaleDenominator`` (Number)
 *  fields. If the store's ``data`` is an ``OpenLayers.Symbolizer.Raster``
 *  instance, records will represent its ColorMap entries, and the available
 *  fields will only be ``symbolizers`` (object literal with ``color`` and
 *  ``opacity`` properties from the ColorMapEntry, and stroke set to false),
 *  ``filter`` (String, the ColorMapEntry's quantity) and ``label`` (String).
 *
 *  The store populated by this reader is synchronized with the underlying data
 *  object. To write back changes to the Style or Symbolizer object, call
 *  ``commitChanges`` on the store.
 *
 *  .. note::
 *
 *      Calling ``commitChanges`` on the store that is populated with
 *      this reader will fail with OpenLayers 2.11 - it requires at least
 *      revision
 *      https://github.com/openlayers/openlayers/commit/1db5ac3cbe874317968f78832901d6ef887ecca6
 *      from 2011-11-28 of OpenLayers.
 */

/** api: example
 *  Sample code to create a store that reads from an ``OpenLayers.Style2``
 *  object:
 *  
 *  .. code-block:: javascript
 *
 *      var store = new Ext.data.Store({
 *          reader: new GeoExt.data.StyleReader(),
 *          data: myStyle // OpenLayers.Style2 or OpenLayers.Symbolizer.Raster
 *      });
 */
GeoExt.data.StyleReader = Ext.extend(Ext.data.JsonReader, {
    
    /** private: property[raw]
     *  ``Object`` The ``data`` object that the store was configured with. Will
     *  be updated with changes when ``commitChanges`` is called on the store.
     */
    
    /** private: method[onMetaChange]
     *  Override to intercept the commit method of the record prototype used
     *  by the reader, so it triggers the ``storeToData`` method that writes
     *  changes back to the underlying raw data.
     */
    onMetaChange: function() {
        GeoExt.data.StyleReader.superclass.onMetaChange.apply(this, arguments);
        this.recordType.prototype.commit = Ext.createInterceptor(this.recordType.prototype.commit, function() {
            var reader = this.store.reader;
            reader.raw[reader.meta.root] = reader.meta.storeToData(this.store);
        });
    },
    
    /** private: method[readRecords]
     */
    readRecords: function(o) {
        var type, rows;
        if (o instanceof OpenLayers.Symbolizer.Raster) {
            type = "colorMap";
        } else {
            type = "rules";
        }
        this.raw = o;
        Ext.applyIf(this.meta, GeoExt.data.StyleReader.metaData[type]);
        var data = {metaData: this.meta};
        data[type] = o[type];
        return GeoExt.data.StyleReader.superclass.readRecords.call(this, data);
    }
});

/** private: constant[metaData]
 *  ``Object`` MetaData configurations for raster and vector styles.
 */
GeoExt.data.StyleReader.metaData = {
    colorMap: {
        root: "colorMap",
        idProperty: "filter",
        fields: [
            {name: "symbolizers", mapping: function(v) {
                return {
                    fillColor: v.color,
                    fillOpacity: v.opacity,
                    stroke: false
                };
            }},
            {name: "filter", mapping: "quantity", type: "float"},
            {name: "label", mapping: function(v) {
                // fill label with quantity if empty
                return v.label || v.quantity;
            }}
        ],
        storeToData: function(store) {
            // ColorMap entries always need to be sorted in ascending order
            store.sort("filter", "ASC");
            var colorMap = [];
            store.each(function(rec) {
                var symbolizer = rec.get("symbolizers"),
                    label = rec.get("label"),
                    labelModified = rec.isModified("label");

                // make sure we convert to number, so users can have a grid
                // with a textfield editor instead of a numberfield. This adds
                // convenience because a column definition with a textfield
                // editor can also be used for editing a rule filter (CQL).
                var quantity = Number(rec.get("filter"));
                rec.data.filter = quantity;

                if ((!rec.json.label && !labelModified && rec.isModified("filter")) || (labelModified && !label)) {
                    // fill label with quantity if empty
                    rec.data.label = quantity;
                }
                colorMap.push(Ext.apply(rec.json, {
                    color: symbolizer.fillColor,
                    label: typeof label == "string" ? label : undefined,
                    opacity: symbolizer.opacity,
                    quantity: quantity
                }));
            });
            return colorMap;
        }
    },
    rules: {
        root: "rules",
        fields: [
            "symbolizers",
            "filter",
            {name: "label", mapping: "title"},
            "name", "description", "elseFilter",
            "minScaleDenominator", "maxScaleDenominator"
        ],
        storeToData: function(store) {
            var rules = [];
            store.each(function(rec) {
                var filter = rec.get("filter");
                if (typeof filter === "string") {
                    filter = filter ? OpenLayers.Format.CQL.prototype.read(filter) : null;
                }
                rules.push(Ext.apply(rec.json, {
                    symbolizers: rec.get("symbolizers"),
                    filter: filter,
                    title: rec.get("label"),
                    name: rec.get("name"),
                    description: rec.get("description"),
                    elseFilter: rec.get("elseFilter"),
                    minScaleDenominator: rec.get("minScaleDenominator"),
                    maxScaleDenominator: rec.get("maxScaleDenominator")
                }));
            });
            return rules;
        }
    }
};
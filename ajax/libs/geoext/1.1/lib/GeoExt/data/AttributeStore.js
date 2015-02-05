/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/data/AttributeReader.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = AttributeStore
 *  base_link = `Ext.data.Store <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.Store>`_
 */
Ext.namespace("GeoExt.data");

/**
 * Function: GeoExt.data.AttributeStoreMixin
 *
 * This function generates a mixin object to be used when extending an Ext.data.Store
 * to create an attribute store.
 *
 * (start code)
 * var AttrStore = Ext.extend(Ext.data.Store, GeoExt.data.AttributeStoreMixin);
 * var store = new AttrStore();
 * (end)
 *
 * For convenience, a GeoExt.data.AttributeStore class is available as a
 * shortcut to the Ext.extend sequence in the above code snippet. The above
 * is equivalent to:
 * (start code)
 * var store = new GeoExt.data.AttributeStore();
 * (end)
 */
GeoExt.data.AttributeStoreMixin = function() {
    return {
        /** private */
        constructor: function(c) {
            c = c || {};
            arguments.callee.superclass.constructor.call(
                this,
                Ext.apply(c, {
                    proxy: c.proxy || (!c.data ?
                        new Ext.data.HttpProxy({url: c.url, disableCaching: false, method: "GET"}) :
                        undefined
                    ),
                    reader: new GeoExt.data.AttributeReader(
                        c, c.fields || ["name", "type", "restriction", {
                            name: "nillable", type: "boolean"
                        }]
                    )
                })
            );
            if(this.feature) {
                this.bind();
            }
        },

        /** private: method[bind]
         */
        bind: function() {
            this.on({
                "update": this.onUpdate,
                "load": this.onLoad,
                "add": this.onAdd,
                scope: this
            });
            var records = [];
            this.each(function(record) {
                records.push(record);
            });
            this.updateFeature(records);
        },

        /** private: method[onUpdate]
         *  :param store: ``Ext.data.Store``
         *  :param record: ``Ext.data.Record``
         *  :param operation: ``String``
         *
         *  Handler for store update event.
         */
        onUpdate: function(store, record, operation) {
            this.updateFeature([record]);
        },

        /** private: method[onLoad]
         *  :param store: ``Ext.data.Store``
         *  :param records: ``Array(Ext.data.Record)``
         *  :param options: ``Object``
         *
         *  Handler for store load event
         */
        onLoad: function(store, records, options) {
            // if options.add is true an "add" event was already
            // triggered, and onAdd already did the work of
            // adding the features to the layer.
            if(!options || options.add !== true) {
                this.updateFeature(records);
            }
        },

        /** private: method[onAdd]
         *  :param store: ``Ext.data.Store``
         *  :param records: ``Array(Ext.data.Record)``
         *  :param index: ``Number``
         *
         *  Handler for store add event
         */
        onAdd: function(store, records, index) {
            this.updateFeature(records);
        },

        /** private: method[updateFeature]
         *  :param records: ``Array(Ext.data.Record)``
         *
         *  Update feature from records.
         */
        updateFeature: function(records) {
            var feature = this.feature, layer = feature.layer;
            var i, len, record, name, value, oldValue, dirty;
            for(i=0,len=records.length; i<len; i++) {
                record = records[i];
                name = record.get("name");
                value = record.get("value");
                oldValue = feature.attributes[name];
                if(oldValue !== value) {
                    dirty = true;
                }
            }
            if(dirty && layer && layer.events &&
                        layer.events.triggerEvent("beforefeaturemodified",
                            {feature: feature}) !== false) {
                for(i=0,len=records.length; i<len; i++) {
                    record = records[i];
                    name = record.get("name");
                    value = record.get("value");
                    feature.attributes[name] = value;
                }
                layer.events.triggerEvent(
                    "featuremodified", {feature: feature});
                layer.drawFeature(feature);
            }
        }

    };
};

/** api: constructor
 *  .. class:: AttributeStore(config)
 *
 *      Small helper class to make creating stores for remotely-loaded attributes
 *      data easier. AttributeStore is pre-configured with a built-in
 *      ``Ext.data.HttpProxy`` and :class:`GeoExt.data.AttributeReader`.  The
 *      HttpProxy is configured to allow caching (disableCaching: false) and
 *      uses GET. If you require some other proxy/reader combination then you'll
 *      have to configure this with your own proxy or create a basic
 *      ``Ext.data.Store`` and configure as needed.
 */

/** api: config[format]
 *  ``OpenLayers.Format``
 *  A parser for transforming the XHR response into an array of objects
 *  representing attributes.  Defaults to an
 *  ``OpenLayers.Format.WFSDescribeFeatureType`` parser.
 */

/** api: config[fields]
 *  ``Array or Function``
 *  Either an array of field definition objects as passed to
 *  ``Ext.data.Record.create``, or a record constructor created using
 *  ``Ext.data.Record.create``.  Defaults to ``["name", "type", "restriction"]``.
 */

/** api: config[feature]
 *  ``OpenLayers.Feature.Vector``
 *  A vector feature. If provided, and if the reader is a
 *  :class:`GeoExt.data.AttributeReader` (the default), then records
 *  of this store will include a field named "value" referencing the
 *  corresponding attribute value in the feature. And if the "value"
 *  field of a record is updated the update will propagate to the
 *  corresponding feature attribute. Optional.
 */
GeoExt.data.AttributeStore = Ext.extend(
    Ext.data.Store,
    GeoExt.data.AttributeStoreMixin()
);

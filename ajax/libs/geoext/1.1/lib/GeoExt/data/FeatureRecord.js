/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = FeatureRecord
 *  base_link = `Ext.data.Record <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.Record>`_
 */
Ext.namespace("GeoExt.data");

/** api: constructor
 *  .. class:: FeatureRecord
 *  
 *      A record that represents an ``OpenLayers.Feature.Vector``. This record
 *      will always have at least the following fields:
 *
 *      * state ``String``
 *      * fid ``String``
 *
 */
GeoExt.data.FeatureRecord = Ext.data.Record.create([
    {name: "feature"}, {name: "state"}, {name: "fid"}
]);

/** api: method[getFeature]
 *  :return: ``OpenLayers.Feature.Vector``
 *
 *  Gets the feature for this record.
 */
GeoExt.data.FeatureRecord.prototype.getFeature = function() {
    return this.get("feature");
};

/** api: method[setFeature]
 *  :param feature: ``OpenLayers.Feature.Vector``
 *
 *  Sets the feature for this record.
 */
GeoExt.data.FeatureRecord.prototype.setFeature = function(feature) {
    if (feature !== this.data.feature) {
        this.dirty = true;
        if (!this.modified) {
            this.modified = {};
        }
        if (this.modified.feature === undefined) {
            this.modified.feature = this.data.feature;
        }
        this.data.feature = feature;
        if (!this.editing){
            this.afterEdit();
        }
    }
};

/** api: classmethod[create]
 *  :param o: ``Array`` Field definition as in ``Ext.data.Record.create``. Can
 *      be omitted if no additional fields are required.
 *  :return: ``Function`` A specialized :class:`GeoExt.data.FeatureRecord`
 *      constructor.
 *  
 *  Creates a constructor for a :class:`GeoExt.data.FeatureRecord`, optionally
 *  with additional fields.
 */
GeoExt.data.FeatureRecord.create = function(o) {
    var f = Ext.extend(GeoExt.data.FeatureRecord, {});
    var p = f.prototype;

    p.fields = new Ext.util.MixedCollection(false, function(field) {
        return field.name;
    });

    GeoExt.data.FeatureRecord.prototype.fields.each(function(f) {
        p.fields.add(f);
    });

    if(o) {
        for(var i = 0, len = o.length; i < len; i++){
            p.fields.add(new Ext.data.Field(o[i]));
        }
    }

    f.getField = function(name) {
        return p.fields.get(name);
    };

    return f;
};

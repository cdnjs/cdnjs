/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/data/FeatureRecord.js
 * @require OpenLayers/Feature/Vector.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = FeatureReader
 *  base_link = `Ext.data.DataReader <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.DataReader>`_
 */
Ext.namespace('GeoExt', 'GeoExt.data');

/** api: example
 *  Typical usage in a store:
 * 
 *  .. code-block:: javascript
 *     
 *      var store = new Ext.data.Store({
 *          reader: new GeoExt.data.FeatureReader({}, [
 *              {name: 'name', type: 'string'},
 *              {name: 'elevation', type: 'float'}
 *          ])
 *      });
 *      
 */

/** api: constructor
 *  .. class:: FeatureReader(meta, recordType)
 *   
 *      Data reader class to create an array of
 *      :class:`GeoExt.data.FeatureRecord` objects from an
 *      ``OpenLayers.Protocol.Response`` object for use in a
 *      :class:`GeoExt.data.FeatureStore` object.
 */
GeoExt.data.FeatureReader = function(meta, recordType) {
    meta = meta || {};
    if(!(recordType instanceof Function)) {
        recordType = GeoExt.data.FeatureRecord.create(
            recordType || meta.fields || {});
    }
    GeoExt.data.FeatureReader.superclass.constructor.call(
        this, meta, recordType);
};

Ext.extend(GeoExt.data.FeatureReader, Ext.data.DataReader, {

    /**
     * APIProperty: totalRecords
     * {Integer}
     */
    totalRecords: null,

    /** private: method[read]
     *  :param response: ``OpenLayers.Protocol.Response``
     *  :return: ``Object`` An object with two properties. The value of the
     *      ``records`` property is the array of records corresponding to
     *      the features. The value of the ``totalRecords" property is the
     *      number of records in the array.
     *      
     *  This method is only used by a DataProxy which has retrieved data.
     */
    read: function(response) {
        return this.readRecords(response.features);
    },

    /** api: method[readRecords]
     *  :param features: ``Array(OpenLayers.Feature.Vector)`` List of
     *      features for creating records
     *  :return: ``Object``  An object with ``records`` and ``totalRecords``
     *      properties.
     *  
     *  Create a data block containing :class:`GeoExt.data.FeatureRecord`
     *  objects from an array of features.
     */
    readRecords : function(features) {
        var records = [];

        if (features) {
            var recordType = this.recordType, fields = recordType.prototype.fields;
            var i, lenI, j, lenJ, feature, values, field, v;
            for (i = 0, lenI = features.length; i < lenI; i++) {
                feature = features[i];
                values = {};
                if (feature.attributes) {
                    for (j = 0, lenJ = fields.length; j < lenJ; j++){
                        field = fields.items[j];
                        if (/[\[\.]/.test(field.mapping)) {
                            try {
                                v = new Function("obj", "return obj." + field.mapping)(feature.attributes);
                            } catch(e){
                                v = field.defaultValue;
                            }
                        }
                        else {
                            v = feature.attributes[field.mapping || field.name] || field.defaultValue;
                        }
                        if (field.convert) {
                            v = field.convert(v);
                        }
                        values[field.name] = v;
                    }
                }
                values.feature = feature;
                values.state = feature.state;
                values.fid = feature.fid;

                // newly inserted features need to be made into phantom records
                var id = (feature.state === OpenLayers.State.INSERT) ? undefined : feature.id;
                records[records.length] = new recordType(values, id);
            }
        }

        return {
            records: records,
            totalRecords: this.totalRecords != null ? this.totalRecords : records.length
        };
    }
});

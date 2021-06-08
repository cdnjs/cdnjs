/* esri-leaflet-related - v3.0.0 - Mon Jun 07 2021 12:19:48 GMT-0700 (Pacific Daylight Time)
 * Copyright (c) 2021 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('esri-leaflet')) :
  typeof define === 'function' && define.amd ? define(['exports', 'esri-leaflet'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Related = {}), global.L.esri));
}(this, (function (exports, esriLeaflet) { 'use strict';

  /* eslint-disable no-alert, no-var */

  var VERSION = '3.0.0';

  var Query = esriLeaflet.Task.extend({
    setters: {
      offset: 'offset',
      limit: 'limit',
      outFields: 'fields',
      objectIds: 'objectIds',
      relationshipId: 'relationshipId',
      definitionExpression: 'definitionExpression',
      precision: 'geometryPrecision',
      featureIds: 'objectIds',
      returnGeometry: 'returnGeometry',
      returnZ: 'returnZ',
      returnM: 'returnM',
      token: 'token'
    },

    path: 'queryRelatedRecords',

    params: {
      returnGeometry: true,
      outSr: 4326,
      outFields: '*',
      returnZ: true,
      returnM: false
    },

    // http://resources.arcgis.com/en/help/arcgis-rest-api/#/Query_Related_Records/02r300000115000000/

    initialize: function (endpoint) {
      // don't replace parent initialize, either pass FeatureLayer._service or the raw options object
      if (endpoint.service) {
        esriLeaflet.Task.prototype.initialize.call(this, endpoint.service);
      } else {
        esriLeaflet.Task.prototype.initialize.call(this, endpoint);
      }
    },

    simplify: function (map, factor) {
      // not sure if there's a better way to port L.esri.Tasks.Query.simplify() than just copy/pasting the function
      var mapWidth = Math.abs(map.getBounds().getWest() - map.getBounds().getEast());
      this.params.maxAllowableOffset = (mapWidth / map.getSize().y) * factor;
      return this;
    },

    run: function (callback, context) {
      return this.request(function (error, response) {
        // if more than one objectId is specified, we loop through the features and pass a single collection to the utility method which converts to geoJson
        var result = {
          features: []
        };
        for (var i = 0; i < response.relatedRecordGroups.length; i++) {
          for (var k = 0; k < response.relatedRecordGroups[i].relatedRecords.length; k++) {
            result.features.push(response.relatedRecordGroups[i].relatedRecords[k]);
          }
        }
        callback.call(context, error, (response && esriLeaflet.Util.responseToFeatureCollection(result)), response);
      }, context);
    }
  });

  function query (options) {
    return new Query(options);
  }

  exports.Query = Query;
  exports.VERSION = VERSION;
  exports.default = query;
  exports.query = query;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=esri-leaflet-related-debug.js.map

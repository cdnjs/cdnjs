/*! esri-leaflet - v0.0.1-beta.7 - 2014-10-13
*   Copyright (c) 2014 Environmental Systems Research Institute, Inc.
*   Apache License*/
(function (factory) {
  //define an AMD module that relies on 'leaflet'
  if (typeof define === 'function' && define.amd) {
    define(['leaflet', 'esri-leaflet'], function (L, Esri) {
      return (exports = factory(L, Esri));
    });
  //define a common js module that relies on 'leaflet'
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('leaflet'), require('esri-leaflet'));
  }
}(function (L, Esri) {
L.esri.Layers.HeatmapFeatureLayer = L.esri.Layers.FeatureManager.extend({

  /**
   * Constructor
   */

  initialize: function (url, options) {
    L.esri.Layers.FeatureManager.prototype.initialize.call(this, url, options);

    options = L.setOptions(this, options);

    this._cache = {};
    this._active = {};

    this.heat = new window.L.heatLayer([], options);
  },

  /**
   * Layer Interface
   */

  onAdd: function(map){
    L.esri.Layers.FeatureManager.prototype.onAdd.call(this, map);
    this._map.addLayer(this.heat);
  },

  onRemove: function(map){
    L.esri.Layers.FeatureManager.prototype.onRemove.call(this, map);
    this._map.removeLayer(this.heat);
  },

  /**
   * Feature Managment Methods
   */

  createLayers: function(features){
    for (var i = features.length - 1; i >= 0; i--) {
      var geojson = features[i];
      var id = geojson.id;
      var latlng = new L.LatLng(geojson.geometry.coordinates[1], geojson.geometry.coordinates[0]);
      this._cache[id] = latlng;

      // add the layer if it is within the time bounds or our layer is not time enabled
      if(!this._active[id] && (!this.options.timeField || (this.options.timeField && this._featureWithinTimeRange(geojson)))){
        this._active[id] = latlng;
        this.heat._latlngs.push(latlng);
      }
    }

    this.heat.redraw();
  },

  addLayers: function(ids){
    for (var i = ids.length - 1; i >= 0; i--) {
      var id = ids[i];
      if(!this._active[id]){
        var latlng = this._cache[id];
        this.heat._latlngs.push(latlng);
        this._active[id] = latlng;
      }
    }
    this.heat.redraw();
  },

  removeLayers: function(ids, permanent){
    var newLatLngs = [];
    for (var i = ids.length - 1; i >= 0; i--) {
      var id = ids[i];
      if(this._active[id]){
        delete this._active[id];
      }
      if(this._cache[id] && permanent){
        delete this._cache[id];
      }
    }

    for (var latlng in this._active){
      newLatLngs.push(this._active[latlng]);
    }

    this.heat.setLatLngs(newLatLngs);
  }

});

L.esri.HeatmapFeatureLayer = L.esri.Layers.HeatmapFeatureLayer;

L.esri.Layers.heatmapFeatureLayer = function(url, options){
  return new L.esri.Layers.HeatmapFeatureLayer(url, options);
};

L.esri.heatmapFeatureLayer = function(url, options){
  return new L.esri.Layers.heatmapFeatureLayer(url, options);
};


  return EsriLeaflet;
}));
//# sourceMappingURL=esri-leaflet-heatmap-feature-layer-src.js.map
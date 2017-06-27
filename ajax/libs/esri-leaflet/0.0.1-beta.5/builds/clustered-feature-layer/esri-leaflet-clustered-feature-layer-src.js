/*! Esri-Leaflet - v0.0.1-beta.5 - 2014-06-17
*   Copyright (c) 2014 Environmental Systems Research Institute, Inc.
*   Apache License*/
L.esri.Layers.ClusteredFeatureLayer = L.esri.Layers.FeatureManager.extend({

  statics: {
    EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose',
    CLUSTEREVENTS: 'clusterclick clusterdblclick clustermouseover clustermouseout clustermousemove clustercontextmenu'
  },

  /**
   * Constructor
   */

  initialize: function (url, options) {
    L.esri.Layers.FeatureManager.prototype.initialize.call(this, url, options);

    options = L.setOptions(this, options);

    this._layers = {};
    this._leafletIds = {};

    this.cluster = new L.MarkerClusterGroup(options);
    this._key = 'c'+(Math.random() * 1e9).toString(36).replace('.', '_');

    // @TODO enable at Leaflet 0.8
    // this.cluster.addEventParent(this);

    // @TODO remove from Leaflet 0.8
    this.cluster.on(L.esri.ClusteredFeatureLayer.EVENTS, this._propagateEvent, this);
    this.cluster.on(L.esri.ClusteredFeatureLayer.CLUSTEREVENTS, this._propagateClusterEvent, this);
  },

  /**
   * Layer Interface
   */

  onAdd: function(map){
    L.esri.Layers.FeatureManager.prototype.onAdd.call(this, map);
    this._map.addLayer(this.cluster);
  },

  onRemove: function(map){
    L.esri.Layers.FeatureManager.prototype.onRemove.call(this, map);
    this._map.removeLayer(this.cluster);
  },

  /**
   * Feature Managment Methods
   */

  createLayers: function(features){
    var markers = [];

    for (var i = features.length - 1; i >= 0; i--) {
      var geojson = features[i];
      var layer = this._layers[geojson.id];

      if(!layer){
        // @TODO Leaflet 0.8
        //newLayer = L.GeoJSON.geometryToLayer(geojson, this.options);

        var newLayer = L.GeoJSON.geometryToLayer(geojson, this.options.pointToLayer, L.GeoJSON.coordsToLatLng, this.options);
        newLayer.feature = L.GeoJSON.asFeature(geojson);
        newLayer.defaultOptions = newLayer.options;
        newLayer._leaflet_id = this._key + '_' + geojson.id;

        this.resetStyle(newLayer.feature.id);

        // bind a popup if we have one
        if(this._popup && newLayer.bindPopup){
          newLayer.bindPopup(this._popup(newLayer.feature, newLayer));
        }

        // cache the layer
        this._layers[newLayer.feature.id] = newLayer;

        this._leafletIds[newLayer._leaflet_id] = geojson.id;

        if(this.options.onEachFeature){
          this.options.onEachFeature(newLayer.feature, newLayer);
        }

        // add the layer if it is within the time bounds or our layer is not time enabled
        if(!this.options.timeField || (this.options.timeField && this._featureWithinTimeRange(geojson)) ){
          markers.push(newLayer);
        }
      }
    }

    if(markers.length){
      this.cluster.addLayers(markers);
    }
  },

  addLayers: function(ids){
    var layersToAdd = [];
    for (var i = ids.length - 1; i >= 0; i--) {
      var layer = this._layers[ids[i]];
      layersToAdd.push(layer);
    }
    this.cluster.addLayers(layersToAdd);
  },

  removeLayers: function(ids){
    var layersToRemove = [];
    for (var i = ids.length - 1; i >= 0; i--) {
      var layer = this._layers[ids[i]];
      layersToRemove.push(layer);
    }
    this.cluster.removeLayers(layersToRemove);
  },

  /**
   * Styling Methods
   */

  resetStyle: function (id) {
    var layer = this._layers[id];

    if(layer){
      layer.options = layer.defaultOptions;
      this.setFeatureStyle(layer.feature.id, this.options.style);
    }

    return this;
  },

  setStyle: function (style) {
    this.eachFeature(function (layer) {
      this.setFeatureStyle(layer.feature.id, style);
    }, this);
    return this;
  },

  setFeatureStyle: function (id, style) {
    var layer = this._layers[id];

    if (typeof style === 'function') {
      style = style(layer.feature);
    }
    if (layer.setStyle) {
      layer.setStyle(style);
    }
  },

  /**
   * Popup Methods
   */

  bindPopup: function (fn, options) {
    this._popup = fn;
    for (var i in this._layers) {
      var layer = this._layers[i];
      var popupContent = this._popup(layer.feature, layer);
      layer.bindPopup(popupContent, options);
    }
  },

  unbindPopup: function () {
    this._popup =  false;
    for (var i in this._layers) {
      this._layers[i].unbindPopup();
    }
  },

  /**
   * Utility Methods
   */

  eachFeature: function (fn, context) {
    for (var i in this._layers) {
      fn.call(context, this._layers[i]);
    }
    return this;
  },

  getFeature: function (id) {
    return this._layers[id];
  },

  // from https://github.com/Leaflet/Leaflet/blob/v0.7.2/src/layer/FeatureGroup.js
  //  @TODO remove at Leaflet 0.8
  _propagateEvent: function (e) {
    e = L.extend({
      layer: this._layers[this._leafletIds[e.target._leaflet_id]],
      target: this
    }, e);
    this.fire(e.type, e);
  },

  _propagateClusterEvent: function (e) {
    e = L.extend({
      layer: e.target,
      target: this
    }, e);
    this.fire(e.type, e);
  }


});

L.esri.ClusteredFeatureLayer = L.esri.Layers.ClusteredFeatureLayer;

L.esri.Layers.clusteredFeatureLayer = function(key, options){
  return new L.esri.Layers.ClusteredFeatureLayer(key, options);
};

L.esri.clusteredFeatureLayer = function(key, options){
  return new L.esri.Layers.ClusteredFeatureLayer(key, options);
};
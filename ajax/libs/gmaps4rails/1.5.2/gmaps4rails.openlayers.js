(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  this.Gmaps4RailsOpenlayers = (function(_super) {

    __extends(Gmaps4RailsOpenlayers, _super);

    function Gmaps4RailsOpenlayers() {
      Gmaps4RailsOpenlayers.__super__.constructor.apply(this, arguments);
      this.map_options = {};
      this.mergeWithDefault("map_options");
      this.markers_conf = {};
      this.mergeWithDefault("markers_conf");
      this.openMarkers = null;
      this.markersLayer = null;
      this.markersControl = null;
    }

    Gmaps4RailsOpenlayers.prototype.createPoint = function(lat, lng) {};

    Gmaps4RailsOpenlayers.prototype.createLatLng = function(lat, lng) {
      return new OpenLayers.LonLat(lng, lat).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
    };

    Gmaps4RailsOpenlayers.prototype.createAnchor = function(offset) {
      if (offset === null) return null;
      return new OpenLayers.Pixel(offset[0], offset[1]);
    };

    Gmaps4RailsOpenlayers.prototype.createSize = function(width, height) {
      return new OpenLayers.Size(width, height);
    };

    Gmaps4RailsOpenlayers.prototype.createLatLngBounds = function() {
      return new OpenLayers.Bounds();
    };

    Gmaps4RailsOpenlayers.prototype.createMap = function() {
      var map;
      map = new OpenLayers.Map(this.map_options.id);
      map.addLayer(new OpenLayers.Layer.OSM());
      map.setCenter(this.createLatLng(this.map_options.center_latitude, this.map_options.center_longitude), this.map_options.zoom);
      return map;
    };

    Gmaps4RailsOpenlayers.prototype.createMarker = function(args) {
      var marker, style_mark;
      style_mark = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
      style_mark.fillOpacity = 1;
      if (this.markersLayer === null) {
        this.markersLayer = new OpenLayers.Layer.Vector("Markers", null);
        this.serviceObject.addLayer(this.markersLayer);
        this.markersLayer.events.register("featureselected", this.markersLayer, this.onFeatureSelect);
        this.markersLayer.events.register("featureunselected", this.markersLayer, this.onFeatureUnselect);
        this.markersControl = new OpenLayers.Control.SelectFeature(this.markersLayer);
        this.serviceObject.addControl(this.markersControl);
        this.markersControl.activate();
      }
      if (args.marker_picture === "") {
        style_mark.graphicHeight = 30;
        style_mark.externalGraphic = "http://openlayers.org/dev/img/marker-blue.png";
      } else {
        style_mark.graphicWidth = args.marker_width;
        style_mark.graphicHeight = args.marker_height;
        style_mark.externalGraphic = args.marker_picture;
        if (args.marker_anchor !== null) {
          style_mark.graphicXOffset = args.marker_anchor[0];
          style_mark.graphicYOffset = args.marker_anchor[1];
        }
        if (args.shadow_picture !== "") {
          style_mark.backgroundGraphic = args.shadow_picture;
          style_mark.backgroundWidth = args.shadow_width;
          style_mark.backgroundHeight = args.shadow_height;
          if (args.shadow_anchor !== null) {
            style_mark.backgroundXOffset = args.shadow_anchor[0];
            style_mark.backgroundYOffset = args.shadow_anchor[1];
          }
        }
      }
      style_mark.graphicTitle = args.title;
      marker = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(args.Lng, args.Lat), null, style_mark);
      marker.geometry.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
      this.markersLayer.addFeatures([marker]);
      return marker;
    };

    Gmaps4RailsOpenlayers.prototype.clearMarkers = function() {
      this.clearMarkersLayerIfExists();
      this.markersLayer = null;
      return this.boundsObject = new OpenLayers.Bounds();
    };

    Gmaps4RailsOpenlayers.prototype.clearMarkersLayerIfExists = function() {
      if (this.markersLayer !== null && this.serviceObject.getLayer(this.markersLayer.id) !== null) {
        return this.serviceObject.removeLayer(this.markersLayer);
      }
    };

    Gmaps4RailsOpenlayers.prototype.extendBoundsWithMarkers = function() {
      var marker, _i, _len, _ref, _results;
      _ref = this.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        _results.push(this.boundsObject.extend(this.createLatLng(marker.lat, marker.lng)));
      }
      return _results;
    };

    Gmaps4RailsOpenlayers.prototype.createClusterer = function(markers_array) {
      var clusters, funcs, options, strategy, style;
      options = {
        pointRadius: "${radius}",
        fillColor: "#ffcc66",
        fillOpacity: 0.8,
        strokeColor: "#cc6633",
        strokeWidth: "${width}",
        strokeOpacity: 0.8
      };
      funcs = {
        context: {
          width: function(feature) {
            var _ref;
            return (_ref = feature.cluster) != null ? _ref : {
              2: 1
            };
          },
          radius: function(feature) {
            var pix;
            pix = 2;
            if (feature.cluster) pix = Math.min(feature.attributes.count, 7) + 2;
            return pix;
          }
        }
      };
      style = new OpenLayers.Style(options, funcs);
      strategy = new OpenLayers.Strategy.Cluster();
      clusters = new OpenLayers.Layer.Vector("Clusters", {
        strategies: [strategy],
        styleMap: new OpenLayers.StyleMap({
          "default": style,
          "select": {
            fillColor: "#8aeeef",
            strokeColor: "#32a8a9"
          }
        })
      });
      this.clearMarkersLayerIfExists();
      this.serviceObject.addLayer(clusters);
      clusters.addFeatures(markers_array);
      return clusters;
    };

    Gmaps4RailsOpenlayers.prototype.clusterize = function() {
      var marker, markers_array, _i, _len, _ref;
      if (this.markers_conf.do_clustering === true) {
        if (this.markerClusterer !== null) this.clearClusterer();
        markers_array = new Array;
        _ref = this.markers;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          marker = _ref[_i];
          markers_array.push(marker.serviceObject);
        }
        return this.markerClusterer = this.createClusterer(markers_array);
      }
    };

    Gmaps4RailsOpenlayers.prototype.clearClusterer = function() {
      return this.serviceObject.removeLayer(this.markerClusterer);
    };

    Gmaps4RailsOpenlayers.prototype.createInfoWindow = function(marker_container) {
      if (marker_container.description != null) {
        return marker_container.serviceObject.infoWindow = marker_container.description;
      }
    };

    Gmaps4RailsOpenlayers.prototype.onPopupClose = function(evt) {
      return this.markersControl.unselect(this.feature);
    };

    Gmaps4RailsOpenlayers.prototype.onFeatureSelect = function(evt) {
      var feature, popup;
      feature = evt.feature;
      popup = new OpenLayers.Popup.FramedCloud("featurePopup", feature.geometry.getBounds().getCenterLonLat(), new OpenLayers.Size(300, 200), feature.infoWindow, null, true, this.onPopupClose);
      feature.popup = popup;
      popup.feature = feature;
      return this.serviceObject.addPopup(popup);
    };

    Gmaps4RailsOpenlayers.prototype.onFeatureUnselect = function(evt) {
      var feature;
      feature = evt.feature;
      if (feature.popup) {
        this.serviceObject.removePopup(feature.popup);
        feature.popup.destroy();
        return feature.popup = null;
      }
    };

    Gmaps4RailsOpenlayers.prototype.fitBounds = function() {
      return this.serviceObject.zoomToExtent(this.boundsObject, true);
    };

    Gmaps4RailsOpenlayers.prototype.centerMapOnUser = function() {
      return this.serviceObject.setCenter(this.userLocation);
    };

    return Gmaps4RailsOpenlayers;

  })(Gmaps4Rails);

}).call(this);

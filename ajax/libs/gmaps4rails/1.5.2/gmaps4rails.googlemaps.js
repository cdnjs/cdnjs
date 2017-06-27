(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  this.Gmaps4RailsGoogle = (function(_super) {

    __extends(Gmaps4RailsGoogle, _super);

    function Gmaps4RailsGoogle() {
      Gmaps4RailsGoogle.__super__.constructor.apply(this, arguments);
      this.map_options = {
        disableDefaultUI: false,
        disableDoubleClickZoom: false,
        type: "ROADMAP"
      };
      this.markers_conf = {
        clusterer_gridSize: 50,
        clusterer_maxZoom: 5,
        custom_cluster_pictures: null,
        custom_infowindow_class: null
      };
      this.mergeWithDefault("map_options");
      this.mergeWithDefault("markers_conf");
      this.kml_options = {
        clickable: true,
        preserveViewport: false,
        suppressInfoWindows: false
      };
      this.polygons_conf = {
        strokeColor: "#FFAA00",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#000000",
        fillOpacity: 0.35,
        clickable: false
      };
      this.polylines_conf = {
        strokeColor: "#FF0000",
        strokeOpacity: 1,
        strokeWeight: 2,
        clickable: false,
        zIndex: null
      };
      this.circles_conf = {
        fillColor: "#00AAFF",
        fillOpacity: 0.35,
        strokeColor: "#FFAA00",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        clickable: false,
        zIndex: null
      };
      this.direction_conf = {
        panel_id: null,
        display_panel: false,
        origin: null,
        destination: null,
        waypoints: [],
        optimizeWaypoints: false,
        unitSystem: "METRIC",
        avoidHighways: false,
        avoidTolls: false,
        region: null,
        travelMode: "DRIVING"
      };
    }

    Gmaps4RailsGoogle.prototype.createPoint = function(lat, lng) {
      return new google.maps.Point(lat, lng);
    };

    Gmaps4RailsGoogle.prototype.createLatLng = function(lat, lng) {
      return new google.maps.LatLng(lat, lng);
    };

    Gmaps4RailsGoogle.prototype.createLatLngBounds = function() {
      return new google.maps.LatLngBounds();
    };

    Gmaps4RailsGoogle.prototype.createMap = function() {
      var defaultOptions, mergedOptions;
      defaultOptions = {
        maxZoom: this.map_options.maxZoom,
        minZoom: this.map_options.minZoom,
        zoom: this.map_options.zoom,
        center: this.createLatLng(this.map_options.center_latitude, this.map_options.center_longitude),
        mapTypeId: google.maps.MapTypeId[this.map_options.type],
        mapTypeControl: this.map_options.mapTypeControl,
        disableDefaultUI: this.map_options.disableDefaultUI,
        disableDoubleClickZoom: this.map_options.disableDoubleClickZoom,
        draggable: this.map_options.draggable
      };
      mergedOptions = this.mergeObjectWithDefault(this.map_options.raw, defaultOptions);
      return new google.maps.Map(document.getElementById(this.map_options.id), mergedOptions);
    };

    Gmaps4RailsGoogle.prototype.createMarkerImage = function(markerPicture, markerSize, origin, anchor, scaledSize) {
      return new google.maps.MarkerImage(markerPicture, markerSize, origin, anchor, scaledSize);
    };

    Gmaps4RailsGoogle.prototype.createSize = function(width, height) {
      return new google.maps.Size(width, height);
    };

    Gmaps4RailsGoogle.prototype.createMarker = function(args) {
      var defaultOptions, imageAnchorPosition, markerImage, markerLatLng, mergedOptions, shadowAnchorPosition, shadowImage;
      markerLatLng = this.createLatLng(args.Lat, args.Lng);
      if (args.marker_picture === "" && args.rich_marker === null) {
        defaultOptions = {
          position: markerLatLng,
          map: this.serviceObject,
          title: args.marker_title,
          draggable: args.marker_draggable,
          zIndex: args.zindex
        };
        mergedOptions = this.mergeObjectWithDefault(this.markers_conf.raw, defaultOptions);
        return new google.maps.Marker(mergedOptions);
      }
      if (args.rich_marker !== null) {
        return new RichMarker({
          position: markerLatLng,
          map: this.serviceObject,
          draggable: args.marker_draggable,
          content: args.rich_marker,
          flat: args.marker_anchor === null ? false : args.marker_anchor[1],
          anchor: args.marker_anchor === null ? 0 : args.marker_anchor[0],
          zIndex: args.zindex
        });
      }
      imageAnchorPosition = this.createImageAnchorPosition(args.marker_anchor);
      shadowAnchorPosition = this.createImageAnchorPosition(args.shadow_anchor);
      markerImage = this.createOrRetrieveImage(args.marker_picture, args.marker_width, args.marker_height, imageAnchorPosition);
      shadowImage = this.createOrRetrieveImage(args.shadow_picture, args.shadow_width, args.shadow_height, shadowAnchorPosition);
      defaultOptions = {
        position: markerLatLng,
        map: this.serviceObject,
        icon: markerImage,
        title: args.marker_title,
        draggable: args.marker_draggable,
        shadow: shadowImage,
        zIndex: args.zindex
      };
      mergedOptions = this.mergeObjectWithDefault(this.markers_conf.raw, defaultOptions);
      return new google.maps.Marker(mergedOptions);
    };

    Gmaps4RailsGoogle.prototype.includeMarkerImage = function(arr, obj) {
      var index, object, _len;
      for (index = 0, _len = arr.length; index < _len; index++) {
        object = arr[index];
        if (object.url === obj) return index;
      }
      return false;
    };

    Gmaps4RailsGoogle.prototype.createOrRetrieveImage = function(currentMarkerPicture, markerWidth, markerHeight, imageAnchorPosition) {
      var markerImage, test_image_index;
      if (currentMarkerPicture === "" || currentMarkerPicture === null) {
        return null;
      }
      test_image_index = this.includeMarkerImage(this.markerImages, currentMarkerPicture);
      switch (test_image_index) {
        case false:
          markerImage = this.createMarkerImage(currentMarkerPicture, this.createSize(markerWidth, markerHeight), null, imageAnchorPosition, null);
          this.markerImages.push(markerImage);
          return markerImage;
          break;
        default:
          if (typeof test_image_index === 'number') {
            return this.markerImages[test_image_index];
          }
          return false;
      }
    };

    Gmaps4RailsGoogle.prototype.clearMarkers = function() {
      var marker, _i, _len, _ref, _results;
      _ref = this.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        _results.push(this.clearMarker(marker));
      }
      return _results;
    };

    Gmaps4RailsGoogle.prototype.showMarkers = function() {
      var marker, _i, _len, _ref, _results;
      _ref = this.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        _results.push(this.showMarker(marker));
      }
      return _results;
    };

    Gmaps4RailsGoogle.prototype.hideMarkers = function() {
      var marker, _i, _len, _ref, _results;
      _ref = this.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        _results.push(this.hideMarker(marker));
      }
      return _results;
    };

    Gmaps4RailsGoogle.prototype.clearMarker = function(marker) {
      return marker.serviceObject.setMap(null);
    };

    Gmaps4RailsGoogle.prototype.showMarker = function(marker) {
      return marker.serviceObject.setVisible(true);
    };

    Gmaps4RailsGoogle.prototype.hideMarker = function(marker) {
      return marker.serviceObject.setVisible(false);
    };

    Gmaps4RailsGoogle.prototype.extendBoundsWithMarkers = function() {
      var marker, _i, _len, _ref, _results;
      _ref = this.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        _results.push(this.boundsObject.extend(marker.serviceObject.position));
      }
      return _results;
    };

    Gmaps4RailsGoogle.prototype.createClusterer = function(markers_array) {
      return new MarkerClusterer(this.serviceObject, markers_array, {
        maxZoom: this.markers_conf.clusterer_maxZoom,
        gridSize: this.markers_conf.clusterer_gridSize,
        styles: this.customClusterer()
      });
    };

    Gmaps4RailsGoogle.prototype.clearClusterer = function() {
      return this.markerClusterer.clearMarkers();
    };

    Gmaps4RailsGoogle.prototype.clusterize = function() {
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

    Gmaps4RailsGoogle.prototype.createInfoWindow = function(marker_container) {
      var boxText, currentMap;
      if (typeof this.jsTemplate === "function" || (marker_container.description != null)) {
        if (typeof this.jsTemplate === "function") {
          marker_container.description = this.jsTemplate(marker_container);
        }
        if (this.markers_conf.custom_infowindow_class !== null) {
          boxText = document.createElement("div");
          boxText.setAttribute("class", this.markers_conf.custom_infowindow_class);
          boxText.innerHTML = marker_container.description;
          marker_container.infowindow = new InfoBox(this.infobox(boxText));
          currentMap = this;
          return google.maps.event.addListener(marker_container.serviceObject, 'click', this.openInfoWindow(currentMap, marker_container.infowindow, marker_container.serviceObject));
        } else {
          marker_container.infowindow = new google.maps.InfoWindow({
            content: marker_container.description
          });
          currentMap = this;
          return google.maps.event.addListener(marker_container.serviceObject, 'click', this.openInfoWindow(currentMap, marker_container.infowindow, marker_container.serviceObject));
        }
      }
    };

    Gmaps4RailsGoogle.prototype.openInfoWindow = function(currentMap, infoWindow, marker) {
      return function() {
        if (currentMap.visibleInfoWindow !== null) {
          currentMap.visibleInfoWindow.close();
        }
        infoWindow.open(currentMap.serviceObject, marker);
        return currentMap.visibleInfoWindow = infoWindow;
      };
    };

    Gmaps4RailsGoogle.prototype.createKmlLayer = function(kml) {
      var kml_options;
      kml_options = kml.options || {};
      kml_options = this.mergeObjectWithDefault(kml_options, this.kml_options);
      kml = new google.maps.KmlLayer(kml.url, kml_options);
      kml.setMap(this.serviceObject);
      return kml;
    };

    Gmaps4RailsGoogle.prototype.fitBounds = function() {
      if (!this.boundsObject.isEmpty()) {
        return this.serviceObject.fitBounds(this.boundsObject);
      }
    };

    Gmaps4RailsGoogle.prototype.centerMapOnUser = function() {
      return this.serviceObject.setCenter(this.userLocation);
    };

    return Gmaps4RailsGoogle;

  })(Gmaps4Rails);

}).call(this);

(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  this.Gmaps4RailsBing = (function(_super) {

    __extends(Gmaps4RailsBing, _super);

    function Gmaps4RailsBing() {
      Gmaps4RailsBing.__super__.constructor.apply(this, arguments);
      this.map_options = {
        type: "road"
      };
      this.markers_conf = {
        infobox: "description"
      };
      this.mergeWithDefault("map_options");
      this.mergeWithDefault("markers_conf");
    }

    Gmaps4RailsBing.prototype.getMapType = function() {
      switch (this.map_options.type) {
        case "road":
          return Microsoft.Maps.MapTypeId.road;
        case "aerial":
          return Microsoft.Maps.MapTypeId.aerial;
        case "auto":
          return Microsoft.Maps.MapTypeId.auto;
        case "birdseye":
          return Microsoft.Maps.MapTypeId.birdseye;
        case "collinsBart":
          return Microsoft.Maps.MapTypeId.collinsBart;
        case "mercator":
          return Microsoft.Maps.MapTypeId.mercator;
        case "ordnanceSurvey":
          return Microsoft.Maps.MapTypeId.ordnanceSurvey;
        default:
          return Microsoft.Maps.MapTypeId.auto;
      }
    };

    Gmaps4RailsBing.prototype.createPoint = function(lat, lng) {
      return new Microsoft.Maps.Point(lat, lng);
    };

    Gmaps4RailsBing.prototype.createLatLng = function(lat, lng) {
      return new Microsoft.Maps.Location(lat, lng);
    };

    Gmaps4RailsBing.prototype.createLatLngBounds = function() {};

    Gmaps4RailsBing.prototype.createMap = function() {
      return new Microsoft.Maps.Map(document.getElementById(this.map_options.id), {
        credentials: this.map_options.provider_key,
        mapTypeId: this.getMapType(),
        center: this.createLatLng(this.map_options.center_latitude, this.map_options.center_longitude),
        zoom: this.map_options.zoom
      });
    };

    Gmaps4RailsBing.prototype.createSize = function(width, height) {
      return new google.maps.Size(width, height);
    };

    Gmaps4RailsBing.prototype.createMarker = function(args) {
      var marker, markerLatLng;
      markerLatLng = this.createLatLng(args.Lat, args.Lng);
      marker;
      if (args.marker_picture === "") {
        marker = new Microsoft.Maps.Pushpin(this.createLatLng(args.Lat, args.Lng), {
          draggable: args.marker_draggable,
          anchor: this.createImageAnchorPosition(args.Lat, args.Lng),
          text: args.marker_title
        });
      } else {
        marker = new Microsoft.Maps.Pushpin(this.createLatLng(args.Lat, args.Lng), {
          draggable: args.marker_draggable,
          anchor: this.createImageAnchorPosition(args.Lat, args.Lng),
          icon: args.marker_picture,
          height: args.marker_height,
          text: args.marker_title,
          width: args.marker_width
        });
      }
      this.addToMap(marker);
      return marker;
    };

    Gmaps4RailsBing.prototype.clearMarkers = function() {
      var marker, _i, _len, _ref, _results;
      _ref = this.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        _results.push(this.clearMarker(marker));
      }
      return _results;
    };

    Gmaps4RailsBing.prototype.clearMarker = function(marker) {
      return this.removeFromMap(marker.serviceObject);
    };

    Gmaps4RailsBing.prototype.showMarkers = function() {
      var marker, _i, _len, _ref, _results;
      _ref = this.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        _results.push(this.showMarker(marker));
      }
      return _results;
    };

    Gmaps4RailsBing.prototype.showMarker = function(marker) {
      return marker.serviceObject.setOptions({
        visible: true
      });
    };

    Gmaps4RailsBing.prototype.hideMarkers = function() {
      var marker, _i, _len, _ref, _results;
      _ref = this.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        _results.push(this.hideMarker(marker));
      }
      return _results;
    };

    Gmaps4RailsBing.prototype.hideMarker = function(marker) {
      return marker.serviceObject.setOptions({
        visible: false
      });
    };

    Gmaps4RailsBing.prototype.extendBoundsWithMarkers = function() {
      var locationsArray, marker, _i, _len, _ref;
      locationsArray = [];
      _ref = this.markers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        locationsArray.push(marker.serviceObject.getLocation());
      }
      return this.boundsObject = Microsoft.Maps.LocationRect.fromLocations(locationsArray);
    };

    Gmaps4RailsBing.prototype.createClusterer = function(markers_array) {};

    Gmaps4RailsBing.prototype.clearClusterer = function() {};

    Gmaps4RailsBing.prototype.clusterize = function() {};

    Gmaps4RailsBing.prototype.createInfoWindow = function(marker_container) {
      var currentMap;
      if (marker_container.description != null) {
        if (this.markers_conf.infobox === "description") {
          marker_container.info_window = new Microsoft.Maps.Infobox(marker_container.serviceObject.getLocation(), {
            description: marker_container.description,
            visible: false,
            showCloseButton: true
          });
        } else {
          marker_container.info_window = new Microsoft.Maps.Infobox(marker_container.serviceObject.getLocation(), {
            htmlContent: marker_container.description,
            visible: false
          });
        }
        currentMap = this;
        Microsoft.Maps.Events.addHandler(marker_container.serviceObject, 'click', this.openInfoWindow(currentMap, marker_container.info_window));
        return this.addToMap(marker_container.info_window);
      }
    };

    Gmaps4RailsBing.prototype.openInfoWindow = function(currentMap, infoWindow) {
      return function() {
        if (currentMap.visibleInfoWindow) {
          currentMap.visibleInfoWindow.setOptions({
            visible: false
          });
        }
        infoWindow.setOptions({
          visible: true
        });
        return currentMap.visibleInfoWindow = infoWindow;
      };
    };

    Gmaps4RailsBing.prototype.fitBounds = function() {
      return this.serviceObject.setView({
        bounds: this.boundsObject
      });
    };

    Gmaps4RailsBing.prototype.addToMap = function(object) {
      return this.serviceObject.entities.push(object);
    };

    Gmaps4RailsBing.prototype.removeFromMap = function(object) {
      return this.serviceObject.entities.remove(object);
    };

    Gmaps4RailsBing.prototype.centerMapOnUser = function() {
      return this.serviceObject.setView({
        center: this.userLocation
      });
    };

    return Gmaps4RailsBing;

  })(Gmaps4Rails);

}).call(this);

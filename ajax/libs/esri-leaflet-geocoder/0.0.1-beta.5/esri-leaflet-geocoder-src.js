/*! esri-leaflet-geocoder - v0.0.1-beta.5 - 2014-06-20
*   Copyright (c) 2014 Environmental Systems Research Institute, Inc.
*   Apache 2.0 License */

(function(L){

  L.esri.Services.Geocoding = L.esri.Services.Service.extend({
    statics: {
      WorldGeocodingService: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/"
    },
    includes: L.Mixin.Events,
    initialize: function (url, options) {
      url = (typeof url === 'string') ? url : L.esri.Services.Geocoding.WorldGeocodingService;
      options = (typeof url === 'object') ? url : options;
      this.url = L.esri.Util.cleanUrl(url);
      L.Util.setOptions(this, options);
      L.esri.Services.Service.prototype.initialize.call(this, url, options);
    },
    geocode: function(text, opts, callback, context){
      var defaults = {
        outFields: 'Subregion, Region, PlaceName, Match_addr, Country, Addr_type, City, Place_addr'
      };
      var params = L.extend(defaults, opts);
      params.text = text;
      this.get("find", params, function(error, response){
        if(error) {
          callback.call(context, error);
        } else {
          var results = [];
          for (var i = response.locations.length - 1; i >= 0; i--) {
            var result = response.locations[i];
            results.push(this._processResult(text, result));
          }
          callback.call(context, error, results, response);
        }
      }, this);
    },
    reverse: function(latlng, opts, callback, context){
      var params = opts || {};
      params.location = [latlng.lng, latlng.lat].join(',');
      this.get('reverseGeocode', params, function(error, response){
        if(error) {
          callback.call(context, error);
        } else {
          var address = response.address;
          var result = {
            latlng: new L.LatLng(response.location.y, response.location.x),
            address: address.Address,
            neighborhood: address.Neighborhood,
            city: address.City,
            subregion: address.Subregion,
            region: address.Region,
            postal: address.Postal,
            postalExt: address.PostalExt,
            countryCode: address.CountryCode
          };
          callback.call(context, error, result, response);
        }
      }, this);
    },
    suggest: function(text, opts, callback, context){
      var params = opts || {};
      params.text = text;
      this.get("suggest", params, callback, context);
    },
    _processResult: function(text, result){
      var attributes = result.feature.attributes;
      var bounds = L.esri.Util.extentToBounds(result.extent);

      return {
        text: text,
        bounds: bounds,
        latlng: new L.LatLng(result.feature.geometry.y, result.feature.geometry.x),
        name: attributes.PlaceName,
        match: attributes.Addr_type,
        country: attributes.Country,
        region: attributes.Region,
        subregion: attributes.Subregion,
        city: attributes.City,
        address: attributes.Place_addr ? attributes.Place_addr : attributes.Match_addr
      };
    }
  });

  L.esri.Services.geocoding = function(options){
    return new L.esri.Services.Geocoding(options);
  };

  L.esri.Controls.Geosearch = L.Control.extend({
    includes: L.Mixin.Events,
    options: {
      position: 'topleft',
      zoomToResult: true,
      useMapBounds: 12,
      collapseAfterResult: true,
      expanded: false,
      maxResults: 25,
      forStorage: false,
      allowMultipleResults: true
    },
    initialize: function (options) {
      L.Util.setOptions(this, options);
      this._service = new L.esri.Services.Geocoding(options);
      this._service.on('authenticationrequired requeststart requestend requesterror requestsuccess', function (e) {
        e = L.extend({
          target: this
        }, e);
        this.fire(e.type, e);
      }, this);
    },
    _geocode: function(text, key){
      var options = {};

      if(key){
        options.magicKey = key;
      } else {
        options.maxLocations = this.options.maxResults;
        if(this.options.useMapBounds === true || (this.options.useMapBounds <= this._map.getZoom())){
          var mapBounds = this._map.getBounds();
          var center = mapBounds.getCenter();
          var ne = mapBounds.getNorthWest();
          options.bbox = mapBounds.toBBoxString();
          options.location = center.lng + "," + center.lat;
          options.distance = Math.min(Math.max(center.distanceTo(ne), 2000), 50000);
        }
      }

      if(this.options.forStorage){
        options.forStorage = true;
      }

      L.DomUtil.addClass(this._input, "geocoder-control-loading");

      this.fire('loading');

      this._service.geocode(text, options, function(error, results, response){
        if(results && results.length) {
          var bounds = new L.LatLngBounds();
          var i;

          for (i = results.length - 1; i >= 0; i--) {
            bounds.extend(results[i].bounds);
          }

          this.fire('results', {
            results: results,
            bounds: bounds,
            latlng: bounds.getCenter()
          });

          if(this.options.zoomToResult){
            this._map.fitBounds(bounds);
          }
        } else {
          this.fire('results', {
            results: [],
            bounds: null,
            latlng: null,
            text: text
          });
        }

        L.DomUtil.removeClass(this._input, "geocoder-control-loading");

        this.fire('load');

        this.clear();

        this._input.blur();
      }, this);
    },
    _suggest: function(text){
      L.DomUtil.addClass(this._input, "geocoder-control-loading");

      var options = {};

      if(this.options.useMapBounds === true || (this.options.useMapBounds <= this._map.getZoom())){
        var mapBounds = this._map.getBounds();
        var center = mapBounds.getCenter();
        var ne = mapBounds.getNorthWest();
        options.location = center.lng + "," + center.lat;
        options.distance = Math.min(Math.max(center.distanceTo(ne), 2000), 50000);
      }

      this._service.suggest(text, options, function(error, response){
        // make sure something is still in the input field before putting in suggestions.
        if(this._input.value){
          this._suggestions.innerHTML = "";
          this._suggestions.style.display = "none";

          if(response && response.suggestions){
            this._suggestions.style.display = "block";
            for (var i = 0; i < response.suggestions.length; i++) {
              var suggestion = L.DomUtil.create('li', 'geocoder-control-suggestion', this._suggestions);
              suggestion.innerHTML = response.suggestions[i].text;
              suggestion["data-magic-key"] = response.suggestions[i].magicKey;
            }
          }

          L.DomUtil.removeClass(this._input, "geocoder-control-loading");
        }
      }, this);
    },
    clear: function(blur){
      this._suggestions.innerHTML = "";
      this._suggestions.style.display = "none";
      this._input.value = "";

      if(this.options.collapseAfterResult){
        L.DomUtil.removeClass(this._container, "geocoder-control-expanded");
      }
    },
    onAdd: function (map) {
      this._map = map;

      if (map.attributionControl) {
        map.attributionControl.addAttribution('Geocoding by Esri');
      }

      this._container = L.DomUtil.create('div', "geocoder-control" + ((this.options.expanded) ? " " + "geocoder-control-expanded"  : ""));

      this._input = L.DomUtil.create('input', "geocoder-control-input leaflet-bar", this._container);

      this._suggestions = L.DomUtil.create('ul', "geocoder-control-suggestions leaflet-bar", this._container);

      L.DomEvent.addListener(this._input, "focus", function(e){
        L.DomUtil.addClass(this._container, "geocoder-control-expanded");
      }, this);

      L.DomEvent.addListener(this._container, "click", function(e){
        L.DomUtil.addClass(this._container, "geocoder-control-expanded");
        this._input.focus();
      }, this);

      L.DomEvent.addListener(this._suggestions, "mousedown", function(e){
        var suggestionItem = e.target || e.srcElement;
        this._geocode(suggestionItem.innerHTML, suggestionItem["data-magic-key"]);
        this.clear();
      }, this);

      L.DomEvent.addListener(this._input, "blur", function(e){
        this.clear();
      }, this);

      L.DomEvent.addListener(this._input, "keydown", function(e){
        L.DomUtil.addClass(this._container, "geocoder-control-expanded");

        var selected = this._suggestions.querySelectorAll('.' + "geocoder-control-selected")[0];
        switch(e.keyCode){
        case 13:
          if(selected){
            this._geocode(selected.innerHTML, selected["data-magic-key"]);
            this.clear();
          } else if(this.options.allowMultipleResults){
            this._geocode(this._input.value);
            this.clear();
          } else {
            L.DomUtil.addClass(this._suggestions.childNodes[0], "geocoder-control-selected");
          }
          L.DomEvent.preventDefault(e);
          break;
        case 38:
          if(selected){
            L.DomUtil.removeClass(selected, "geocoder-control-selected");
          }
          if(selected && selected.previousSibling) {
            L.DomUtil.addClass(selected.previousSibling, "geocoder-control-selected");
          } else {
            L.DomUtil.addClass(this._suggestions.childNodes[this._suggestions.childNodes.length-1], "geocoder-control-selected");
          }
          L.DomEvent.preventDefault(e);
          break;
        case 40:
          if(selected){
            L.DomUtil.removeClass(selected, "geocoder-control-selected");
          }
          if(selected && selected.nextSibling) {
            L.DomUtil.addClass(selected.nextSibling, "geocoder-control-selected");
          } else {
            L.DomUtil.addClass(this._suggestions.childNodes[0], "geocoder-control-selected");
          }
          L.DomEvent.preventDefault(e);
          break;
        }
      }, this);

      L.DomEvent.addListener(this._input, "keyup", function(e){
        var key = e.which || e.keyCode;
        var text = (e.target || e.srcElement).value;

        // require at least 2 characters for suggestions
        if(text.length < 2) {
          return;
        }

        // if this is the escape key it will clear the input so clear suggestions
        if(key === 27){
          this._suggestions.innerHTML = "";
          this._suggestions.style.display = "none";
          return;
        }

        // if this is NOT the up/down arrows or enter make a suggestion
        if(key !== 13 && key !== 38 && key !== 40){
          this._suggest(text);
        }
      }, this);

      L.DomEvent.disableClickPropagation(this._container);

      return this._container;
    },
    onRemove: function (map) {
      map.attributionControl.removeAttribution('Geocoding by Esri');
    }
  });

  L.esri.Controls.geosearch = function(url, options){
    return new L.esri.Controls.Geosearch(url, options);
  };

})(L);
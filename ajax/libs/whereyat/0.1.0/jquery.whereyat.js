/*! Where Y'at - v0.1.0 - 2014-12-24
* https://github.com/zshannon/whereyat
* Copyright (c) 2014 Zane Shannon; Licensed MIT */
(function($) {
  var WhereYat;
  WhereYat = function(options, completionCallback) {
    this.error = false;
    this.options = $.extend({}, options);
    this.completion = completionCallback;
    this.nodes = [];
    this.parse();
    this.render();
  };
  WhereYat.prototype.locate = function() {
    $.ajax({
      method: 'GET',
      url: 'https://ip.wherey.at/',
      success: (function(_this) {
        return function(data, status, jqXHR) {
          if (data.status === 'ok') {
            _this.location = {
              lat: data.latitude,
              lng: data.longitude
            };
            _this.render();
          } else if (data.status === 'not_found') {
            _this.render({
              error: true
            });
          } else {
            _this.render({
              error: true
            });
          }
        };
      })(this),
      error: (function(_this) {
        return function(jqXHR, textStatus, errorThrown) {
          _this.render({
            error: true
          });
        };
      })(this)
    });
  };
  WhereYat.prototype.parse = function() {
    $(this.options.className).each((function(_this) {
      return function(index, element) {
        return _this.nodes.push(element);
      };
    })(this));
  };
  WhereYat.prototype.render = function(options) {
    if (options == null) {
      options = {};
    }
    if (!((this.location != null) || options.error)) {
      this.locate();
      $(this.nodes).each((function(_this) {
        return function(index, element) {
          var $el;
          $el = $(element);
          return $el.addClass("" + _this.options.classPrefix + "locating");
        };
      })(this));
      return;
    }
    $(this.nodes).each((function(_this) {
      return function(index, element) {
        var $el, distance, distanceClass, klass, location, userDistance, _ref;
        $el = $(element);
        $el.removeClass("" + _this.options.classPrefix + "locating");
        if (options.error) {
          return $el.addClass("" + _this.options.classPrefix + "error");
        } else {
          location = {
            lat: $el.data(_this.options.latitudeData),
            lng: $el.data(_this.options.longitudeData)
          };
          userDistance = _this.distance(location, _this.location);
          distanceClass = _this.options.maxDistance;
          _ref = _this.options.distances;
          for (klass in _ref) {
            distance = _ref[klass];
            if (distance >= userDistance) {
              distanceClass = klass;
              break;
            }
          }
          return $el.addClass("" + _this.options.classPrefix + distanceClass);
        }
      };
    })(this));
    if (this.completion != null) {
      this.completion();
    }
  };
  WhereYat.prototype.distance = function(from, to, unit) {
    var dist, lat1, lat2, lon1, lon2, radlat1, radlat2, radlon1, radlon2, radtheta, theta;
    lat1 = from.lat;
    lat2 = to.lat;
    lon1 = from.lng;
    lon2 = to.lng;
    radlat1 = Math.PI * lat1 / 180;
    radlat2 = Math.PI * lat2 / 180;
    radlon1 = Math.PI * lon1 / 180;
    radlon2 = Math.PI * lon2 / 180;
    theta = lon1 - lon2;
    radtheta = Math.PI * theta / 180;
    dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") {
      dist = dist * 1.609344;
    }
    if (unit === "N") {
      dist = dist * 0.8684;
    }
    return dist;
  };
  $.whereyat = function(options, completionCallback) {
    options = $.extend({}, $.whereyat.options, options);
    return new WhereYat(options, completionCallback);
  };
  $.whereyat.options = {
    className: '.whereyat',
    classPrefix: 'yat-',
    latitudeData: 'yatLat',
    longitudeData: 'yatLong',
    maxDistance: 'xl',
    distances: {
      'xs': 75,
      'sm': 200,
      'md': 750,
      'lg': 1250
    }
  };
})(jQuery);

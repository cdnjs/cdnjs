/*!
 *  GMAP3 Plugin for jQuery
 *  Version  : 7.2
 *  Date     : 2016/12/03
 *  Author   : DEMONTE Jean-Baptiste
 *  Contact  : jbdemonte@gmail.com
 *  Web site : http://gmap3.net
 *  Licence  : GPL-3.0+
 */
(function ($, window, document) {
  "use strict";

  var gm, services = {}, loadOptions,

  // Proxify functions to get shorter minimized code
    when = $.when,
    extend = $.extend,
    isArray = $.isArray,
    isFunction = $.isFunction,
    deferred = $.Deferred;

  /**
   * Duplicate option to never modify original object
   * @param {Object} options
   * @returns {Object}
   */
  function dupOpts(options) {
    return extend(true, {}, options || {});
  }

  /**
   * Slice an array like
   * @params {Array|Object}
   * @params {Number} [start]
   * @params {Number} [end]
   * @returns {Array}
   */
  function slice() {
    var fn = Array.prototype.slice,
      args = fn.call(arguments, 1);
    return fn.apply(arguments[0], args);
  }

  /**
   * Return true if value is undefined
   * @param {*} value
   * @returns {Boolean}
   */
  function isUndefined(value) {
    return typeof value === 'undefined';
  }

  /**
   * Equivalent to Promise.all
   * @param {Deferred[]} deferreds
   * @returns {Deferred}
   */
  function all(deferreds) {
    return when.apply($, deferreds);
  }

  /**
   * Equivalent to Promise.resolve
   * @param {*} value
   * @returns {Deferred}
   */
  function resolved(value) {
    return when().then(function () {
      return value;
    });
  }

  /**
   * return the distance between 2 latLng in meters
   * @param {LatLng} origin
   * @param {LatLng} destination
   * @returns {Number}
   **/
  function distanceInMeter(origin, destination) {
    var m = Math,
      pi = m.PI,
      e = pi * origin.lat() / 180,
      f = pi * origin.lng() / 180,
      g = pi * destination.lat() / 180,
      h = pi * destination.lng() / 180,
      cos = m.cos,
      sin = m.sin;
    return 1000 * 6371 * m.acos(m.min(cos(e) * cos(g) * cos(f) * cos(h) + cos(e) * sin(f) * cos(g) * sin(h) + sin(e) * sin(g), 1));
  }

  function ready(fn) {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  function serialize(obj) {
    return objectKeys(obj).map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    }).join("&");
  }

  // Auto-load google maps library if needed
  when(function () {
    var dfd = deferred(),
      cbName = '__gmap3',
      script;

    $.holdReady(true);

    ready(function () {
      if (window.google && window.google.maps || loadOptions === false) {
        dfd.resolve();
      } else {
        // callback function - resolving promise after maps successfully loaded
        window[cbName] = function () {
          delete window[cbName];
          dfd.resolve();
        };
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?callback=' + cbName + (loadOptions ? '&' + (typeof loadOptions === 'string' ? loadOptions : serialize(loadOptions)) : '');
        $("head").append(script);
      }
    });

    return dfd;
  }()).then(function () {
    $.holdReady(false);
  });

  /**
   * Instantiate only once a google service
   * @param {String} name
   * @returns {Object}
   */
  function service(name) {
    if (!services[name]) {
      services[name] = gmElement(name);
    }
    return services[name];
  }

  /**
   * Return GoogleMap Class (or overwritten by user) instance
   * @param {String} name
   * @returns {Object}
   */
  function gmElement(name) {
    var cls = gm[name];

    function F(args) {
      return cls.apply(this, args);
    }
    F.prototype = cls.prototype;

    return new F(slice(arguments, 1));
  }

  /**
   * Resolve a GeocodeRequest
   * https://developers.google.com/maps/documentation/javascript/geocoding
   * @param {String|Object} request
   * @returns {Deferred}
   */
  function geocode(request) {
    var dfd = deferred();
    if (typeof request === 'string') {
      request = {
        address: request
      };
    }
    service('Geocoder').geocode(request, function (results, status) {
      if (status === gm.GeocoderStatus.OK) {
        dfd.resolve(results[0].geometry.location);
      } else {
        dfd.reject(status);
      }
    });
    return dfd;
  }

  /**
   * Callable function taking a parameter as string
   * @callback StringCallback
   * @param {String}
   */

  /**
   * Split a string and execute a function on each item
   * @param {String} str - Space separated list of items
   * @param {StringCallback} fn - Callback function
   */
  function foreachStr(str, fn) {
    foreach(str.split(' '), fn);
  }

  /**
   * Execute a function on each items if items is an array and on items as a single element if it is not an array
   * @param {Array|*} items - Items to execute foreach callback on
   * @param {Function} fn - Callback function
   */
  function foreach(items, fn) {
    (isArray(items) ? items : [items]).forEach(fn);
  }

  /**
   * Return Object keys
   * @param {Object} obj
   * @returns {String[]}
   */
  function objectKeys(obj) {
    return Object.keys(obj);
  }

  /**
   * Return Object values
   * @param {Object} obj
   * @returns {*[]}
   */
  function objectValues(obj) {
    return objectKeys(obj).map(function (key) {
      return obj[key];
    });
  }

  /**
   * Resolution function
   * @callback OptionCallback
   * @param {Object} options
   * @returns {Deferred|*}
   */

  /**
   * Convert bounds from array [ n, e, s, w ] to google.maps.LatLngBounds
   * @param {Object} options - Container of options.bounds
   * @param {OptionCallback} fn
   * @returns {Deferred}
   */
  function resolveLatLngBounds(options, fn) {
    options = dupOpts(options);
    if (options.bounds) {
      options.bounds = toLatLngBound(options.bounds);
    }
    return resolved(fn(options));
  }

  /**
   * Resolve an address location / convert a LatLng array to google.maps.LatLng object
   * @param {Object} options
   * @param {String} key - LatLng key name in options object
   * @param {OptionCallback} fn
   * @returns {Deferred}
   */
  function resolveLatLng(options, key, fn) {
    var dfd = deferred();
    options = dupOpts(options);
    when()
      .then(function () {
        var address = options.address;
        if (address) {
          delete options.address;
          return geocode(address).then(function (latLng) {
              options[key] = latLng;
            });
        }
        options[key] = toLatLng(options[key]);
      })
      .then(function () {
        dfd.resolve(fn(options));
      })
      .fail(function (reason) {
        dfd.reject(reason);
      });
    return dfd;
  }

  /**
   * Convert an array of mixed LatLng to google.maps.LatLng object
   * No address resolution here
   * @param {Object} options
   * @param {String} key - Array key name in options object
   * @param {OptionCallback} fn
   * @returns {Deferred}
   */
  function resolveArrayOfLatLng(options, key, fn) {
    options = dupOpts(options);
    options[key] = (options[key] || []).map(toLatLng);
    return resolved(fn(options));
  }

  /**
   * Convert a LatLng array to google.maps.LatLng
   * @param {Array|*} mixed
   * @param {Boolean} [convertLiteral]
   * @returns {LatLng}
   */
  function toLatLng(mixed, convertLiteral) {
    return isArray(mixed) ? new gm.LatLng(mixed[0], mixed[1]) : (convertLiteral && mixed && !(mixed instanceof gm.LatLng) ? new gm.LatLng(mixed.lat, mixed.lng) : mixed);
  }

  /**
   * Convert a LatLngBound array to google.maps.LatLngBound
   * @param {Array|*} mixed
   * @param {Boolean} [convertLiteral]
   * @returns {LatLngBounds}
   */
  function toLatLngBound(mixed, convertLiteral) {
    if (isArray(mixed)) {
      return new gm.LatLngBounds({lat: mixed[2], lng: mixed[3]}, {lat: mixed[0], lng: mixed[1]});
    } else if (convertLiteral && !mixed.getCenter){
      return new gm.LatLngBounds({lat: mixed.south, lng: mixed.west}, {lat: mixed.north, lng: mixed.east});
    }
    return mixed;
  }

  /**
   * Create a custom overlay view
   * @param {Map} map
   * @param {Object} options
   * @returns {OverlayView}
   */
  function createOverlayView(map, options) {

    var GMOverlayView = gm.OverlayView;

    var $div = $(document.createElement("div"))
      .css({
        border: "none",
        borderWidth: 0,
        position: "absolute"
      })
      .append(options.content);

    options = extend({x: 0, y: 0}, options);

    if (options.position) {
      options.position = toLatLng(options.position, true);
    } else if (options.bounds) {
      options.bounds = toLatLngBound(options.bounds, true);
    }

    /**
     * Class OverlayView
     * @constructor
     */
    function OverlayView() {
      var self = this,
        listeners = [];

      GMOverlayView.call(self);
      self.setMap(map);

      function fromLatLngToDivPixel(latlng) {
        return self.getProjection().fromLatLngToDivPixel(latlng);
      }

      self.onAdd = function () {
        var panes = self.getPanes();
        panes.overlayMouseTarget.appendChild($div[0]);
      };

      if (options.position) {
        self.getPosition = function () {
          return options.position;
        };

        self.setPosition = function (latlng) {
          options.position = latlng;
          self.draw();
        };

        self.draw = function () {
          var ps = fromLatLngToDivPixel(options.position);
          $div.css({
            left: (ps.x + options.x) + 'px',
            top: (ps.y + options.y) + 'px'
          });
        };
      } else {
        self.getBounds = function () {
          return options.bounds;
        };

        self.setBounds = function (bounds) {
          options.bounds = bounds;
          self.draw();
        };

        self.draw = function () {
          var sw = fromLatLngToDivPixel(options.bounds.getSouthWest());
          var ne = fromLatLngToDivPixel(options.bounds.getNorthEast());

          $div.css({
            left: (sw.x + options.x) + 'px',
            top: (ne.y + options.y) + 'px',
            width: (ne.x - sw.x + options.x) + 'px',
            height: (sw.y - ne.y + options.y) + 'px'
          });
        };
      }

      self.onRemove = function () {
        listeners.map(function (handler) {
          gm.event.removeListener(handler);
        });
        $div.remove();
        self.$ = $div = null; // mem leaks
      };

      self.$ = $div;
    }

    OverlayView.prototype = new GMOverlayView();

    return new OverlayView();
  }

  /**
   * Return a map projection
   * @param {Map} map
   * @returns {*}
   */
  function getProjection(map) {
    function Overlay() {
      var self = this;
      self.onAdd = self.onRemove = self.draw = function () {};
      return gm.OverlayView.call(self);
    }
    Overlay.prototype = new gm.OverlayView();
    var overlay = new Overlay();
    overlay.setMap(map);
    return overlay.getProjection();
  }

  /**
   * Class used as event first parameter on clustering overlays
   * @param {Cluster} cluster
   * @param {Marker[]} markers
   * @param {OverlayView} overlay
   * @param {LatLngBounds} bounds
   * @constructor
   */
  function ClusterOverlay(cluster, markers, overlay, bounds) {
    var self = this;
    self.cluster = cluster;
    self.markers = markers;
    self.$ = overlay.$;
    self.overlay = overlay;

    overlay.getBounds = function () {
      return gmElement('LatLngBounds', bounds.getSouthWest(), bounds.getNorthEast());
    };
  }

  /**
   * Cluster Group definition.
   * @typedef {Object} ClusterGroupDef
   * @property {String|jQuery} content
   * @property {Number} [x] Offset
   * @property {Number} [y] Offset
   */

  /**
   * Cluster evaluation function
   * @callback clusterCallback
   * @param {Marker[]} markers
   * @return {ClusterGroupDef|undefined}
   */

  /**
   * Class used to handle clustering
   * @param {Map} map
   * @param {Object} options
   * @param {Integer} [options.size]
   * @param {Object[]} [options.markers] markers definition
   * @param {clusterCallback} [options.cb] callback used to evaluate clustering elements
   * @constructor
   */
  function Cluster(map, options) {
    var timer, igniter, previousViewHash, projection, filter,
      self = this,
      markers = [],
      radius = (options.size || 200) >> 1,
      enabled = true,
      overlays = {},
      handlers = [];

    options = options || {};
    options.markers = options.markers || [];

    /**
     * Cluster evaluation function
     * @callback bindCallback
     * @param {ClusterOverlay[]} instances
     */

    /**
     * Bind a function to each current or future overlays
     * @param {bindCallback} fn
     */
    self._b = function (fn) {
      fn(objectValues(overlays));
      handlers.push(fn);
    };

    /**
     * Get the marker list
     * @returns {Marker[]}
     */
    self.markers = function () {
      return slice(markers);
    };

    /**
     * Get the current groups
     * @returns {ClusterOverlay[]}
     */
    self.groups = function () {
      return objectValues(overlays);
    };

    /**
     * Enable the clustering feature
     */
    self.enable = function () {
      if (!enabled) {
        enabled = true;
        previousViewHash = '';
        delayRedraw();
      }
    };


    /**
     * Disable the clustering feature
     */
    self.disable = function () {
      if (enabled) {
        enabled = false;
        previousViewHash = '';
        delayRedraw();
      }
    };

    /**
     * Add a marker
     * @param {Marker} marker
     */
    self.add = function (marker) {
      markers.push(marker);
      previousViewHash = '';
      delayRedraw();
    };

    /**
     * Remove a marker
     * @param {Marker} marker
     */
    self.remove = function (marker) {
      markers = markers.filter(function (item) {
        return item !== marker;
      });
      previousViewHash = '';
      delayRedraw();
    };

    /**
     * Filtering function, Cluster only handle those who return true
     * @callback filterCallback
     * @param {Marker} marker
     * @returns {Boolean}
     */

    /**
     * Set a filter function
     * @param {filterCallback} fn
     */
    self.filter = function (fn) {
      if (filter !== fn) {
        filter = fn;
        previousViewHash = '';
        delayRedraw();
      }
    };

    /**
     * Generate extended visible bounds
     * @returns {LatLngBounds}
     */
    function extendsMapBounds() {
      var circle = gmElement('Circle', {
        center: map.getCenter(),
        radius: 1.15 * distanceInMeter(map.getCenter(), map.getBounds().getNorthEast()) // + 15%
      });
      return circle.getBounds();
    }

    /**
     * Generate bounds extended by radius
     * @param {LatLng} latLng
     * @returns {LatLngBounds}
     */
    function extendsBounds(latLng) {
      var p = projection.fromLatLngToDivPixel(latLng);
      return gmElement('LatLngBounds',
        projection.fromDivPixelToLatLng(gmElement('Point', p.x - radius, p.y + radius)),
        projection.fromDivPixelToLatLng(gmElement('Point', p.x + radius, p.y - radius))
      );
    }

    options.markers.map(function (opts) {
      opts.position = toLatLng(opts.position);
      markers.push(gmElement('Marker', opts));
    });

    /**
     * Redraw clusters
     */
    function redraw() {
      var keys, bounds, overlayOptions, hash, currentMarkers, viewHash,
        zoom = map.getZoom(),
        currentHashes = {},
        newOverlays = [],
        ignore = {};

      viewHash = '' + zoom;

      if (zoom > 3) {
        bounds = extendsMapBounds();
        foreach(markers, function (marker, index) {
          if (!bounds.contains(marker.getPosition())) {
            viewHash += '-' + index;
            ignore[index] = true;
            if (marker.getMap()) {
              marker.setMap(null);
            }
          }
        });
      }
      if (filter) {
        foreach(markers, function (marker, index) {
          if (!ignore[index] && !filter(marker)) {
            viewHash += '-' + index;
            ignore[index] = true;
            if (marker.getMap()) {
              marker.setMap(null);
            }
          }
        });
      }

      if (viewHash === previousViewHash) {
        return;
      }
      previousViewHash = viewHash;

      foreach(markers, function (marker, index) {
        if (ignore[index]) {
          return;
        }

        keys = [index];
        bounds = extendsBounds(marker.getPosition());

        if (enabled) {
          foreach(slice(markers, index + 1), function (marker, idx) {
            idx += index + 1;
            if (!ignore[idx] && bounds.contains(marker.getPosition())) {
              keys.push(idx);
              ignore[idx] = true;
            }
          });
        }

        hash = keys.join('-');
        currentHashes[hash] = true;

        if (overlays[hash]) { // hash is already set
          return;
        }

        currentMarkers = keys.map(function (key) {
          return markers[key];
        });

        // ask the user callback on this subset (may be composed by only one marker)
        overlayOptions = options.cb(slice(currentMarkers));

        // create an overlay if cb returns its properties
        if (overlayOptions) {
          bounds = gmElement('LatLngBounds');
          foreach(currentMarkers, function (marker) {
            bounds.extend(marker.getPosition());
            if (marker.getMap()) {
              marker.setMap(null);
            }
          });

          overlayOptions = dupOpts(overlayOptions);
          overlayOptions.position = bounds.getCenter();
          overlays[hash] = new ClusterOverlay(self, slice(currentMarkers), createOverlayView(map, overlayOptions), bounds);
          newOverlays.push(overlays[hash]);

        } else {
          foreach(currentMarkers, function (marker) {
            if (!marker.getMap()) { // to avoid marker blinking
              marker.setMap(map);
            }
          });
        }

      });

      // remove previous overlays
      foreach(objectKeys(overlays), function (key) {
        if (!currentHashes[key]) {
          overlays[key].overlay.setMap(null);
          delete overlays[key];
        }
      });

      if (newOverlays.length) {
        foreach(handlers, function (fn) {
          fn(newOverlays);
        });
      }
    }

    /**
     * Restart redraw timer
     */
    function delayRedraw() {
      clearTimeout(timer);
      timer = setTimeout(redraw, 100);
    }

    /**
     * Init clustering
     */
    function init() {
      gm.event.addListener(map, "zoom_changed", delayRedraw);
      gm.event.addListener(map, "bounds_changed", delayRedraw);
      redraw();
    }

    igniter = setInterval(function () {
      projection = getProjection(map);
      if (projection) {
        clearInterval(igniter);
        init();
      }
    }, 10);
  }

  /**
   * Configure google maps loading library
   * @param {string|object} options
   */
  $.gmap3 = function (options) {
    loadOptions = options;
  };

  /**
   * jQuery Plugin
   */
  $.fn.gmap3 = function (options) {
    var items = [];
    gm = window.google.maps; // once gmap3 is loaded, google.maps library should be loaded
    this.each(function () {
      var $this = $(this), gmap3 = $this.data("gmap3");
      if (!gmap3) {
        gmap3 = new Gmap3($this, options);
        $this.data("gmap3", gmap3);
      }
      items.push(gmap3);
    });

    return new Handler(this, items);
  };

  /**
   * Class Handler
   * Chainable objet which handle all Gmap3 items associated to all jQuery elements in the current command set
   * @param {jQuery} chain - "this" to return to maintain the jQuery chain
   * @param {Gmap3[]} items
   * @constructor
   */
  function Handler(chain, items) {
    var self = this;

    // Map all functions from Gmap3 class
    objectKeys(items[0]).forEach(function (name) {
      self[name] = function () {
        var results = [],
          args = slice(arguments);
        items.forEach(function (item) {
          results.push(item[name].apply(item, args));
        });
        return name === 'get' ? (results.length > 1 ? results : results[0]) : self;
      };
    });

    self.$ = chain;
  }

  /**
   * Class Gmap3
   * Handle a Google.maps.Map instance
   * @param {jQuery} $container - Element to display the map in
   * @param {Object} options - MapOptions
   * @constructor
   */
  function Gmap3($container, options) {
    var map,
      previousResults = [],
      promise = when(),
      self = this;

    function context() {
      return {
        $: $container,
        get: self.get
      };
    }

    /**
     * Attach events to instances
     * @param {Object } events
     * @param {Array|Object} instances
     * @param {array} [args] arguments to add
     * @param {Boolean} once
     */
    function attachEvents(events, instances, args, once) {
      var hasArgs = arguments.length > 3;
      if (!hasArgs) {
        once = args;
      }
      $.each(events, function (eventName, handlers) {
        foreach(instances, function (instance) {
          var isClusterOverlay = instance instanceof ClusterOverlay;
          var isDom = isClusterOverlay || (instance instanceof gm.OverlayView);
          var eventListener = isDom ? instance.$.get(0) : instance;
          gm.event['add' + (isDom ? 'Dom' : '') + 'Listener' + (once ? 'Once' : '')](eventListener, eventName, function (event) {
            foreach(handlers, function (handler) {
              if (isFunction(handler)) {
                if (isClusterOverlay) {
                  handler.call(context(), undefined /* marker */, instance, instance.cluster, event);
                } else if (hasArgs) {
                  var buffer = slice(args);
                  buffer.unshift(instance);
                  buffer.push(event);
                  handler.apply(context(), buffer);
                } else {
                  handler.call(context(), instance, event);
                }
              }
            });
          });
        });
      });
    }

    /**
     * Decorator to handle multiple call based on array of options
     * @param {Function} fn
     * @returns {Deferred}
     */
    function multiple(fn) {
      return function (options) {
        if (isArray(options)) {
          var instances = [];
          var promises = options.map(function (opts) {
            return fn.call(self, opts).then(function (instance) {
              instances.push(instance);
            });
          });
          return all(promises).then(function () {
            previousResults.push(instances);
            return instances;
          });
        } else {
          return fn.apply(self, arguments).then(function (instance) {
            previousResults.push(instance);
            return instance;
          });
        }
      };
    }

    /**
     * Decorator to chain promise result onto the main promise chain
     * @param {Function} fn
     * @returns {Function}
     */
    function chainToPromise(fn) {
      return function () {
        var args = slice(arguments);
        promise = promise.then(function (instance) {
          if (isFunction(args[0])) {
            // handle return as a deferred / promise to support both sync & async result
            return when(args[0].call(context(), instance)).then(function (value) {
              args[0] = value;
              return fn.apply(self, args);
            });
          }

          return when(fn.apply(self, args));
        });
        return promise;
      };
    }

    self.map = chainToPromise(function (options) {
      return map || resolveLatLng(options, 'center', function (opts) {
          map = gmElement('Map', $container.get(0), opts);
          previousResults.push(map);
          return map;
        });
    });

    // Space separated string of : separated element
    // (google.maps class name) : (latLng property name) : (add map - 0|1 - default = 1)
    foreachStr('Marker:position Circle:center InfoWindow:position:0 Polyline:path Polygon:paths', function (item) {
      item = item.split(':');
      var property = item[1] || '';
      self[item[0].toLowerCase()] = chainToPromise(multiple(function (options) {
        return (property.match(/^path/) ? resolveArrayOfLatLng : resolveLatLng)(options, property, function (opts) {
          if (item[2] !== '0') {
            opts.map = map;
          }
          return gmElement(item[0], opts);
        });
      }));
    });

    foreachStr('TrafficLayer TransitLayer BicyclingLayer', function (item) {
      self[item.toLowerCase()] = chainToPromise(function () {
        var instance = gmElement(item);
        previousResults.push(instance);
        instance.setMap(map);
        return instance;
      });
    });

    self.kmllayer = chainToPromise(multiple(function (options) {
      options = dupOpts(options);
      options.map = map;
      return when(gmElement('KmlLayer', options));
    }));

    self.rectangle = chainToPromise(multiple(function (options) {
      return resolveLatLngBounds(options, function (opts) {
        opts.map = map;
        return gmElement('Rectangle', opts);
      });
    }));

    self.overlay = chainToPromise(multiple(function (options) {
      function fn(opts) {
        return createOverlayView(map, opts);
      }

      options = dupOpts(options);
      return options.bounds ? resolveLatLngBounds(options, fn) : resolveLatLng(options, 'position', fn);
    }));

    self.groundoverlay = chainToPromise(function (url, bounds, options) {
      return resolveLatLngBounds({bounds: bounds}, function (opts) {
        options = dupOpts(options);
        options.map = map;
        var instance = gmElement('GroundOverlay', url, opts.bounds, options);
        previousResults.push(instance);
        return instance;
      });
    });

    self.styledmaptype = chainToPromise(function (styleId, styles, options) {
      var instance = gmElement('StyledMapType', styles, options);
      previousResults.push(instance);
      map.mapTypes.set(styleId, instance);
      return instance;
    });

    self.streetviewpanorama = chainToPromise(function (container, options) {
      return resolveLatLng(options, 'position', function (opts) {
        var instance = gmElement('StreetViewPanorama', $(container).get(0), opts);
        map.setStreetView(instance);
        previousResults.push(instance);
        return instance;
      });
    });

    self.route = chainToPromise(function (options) {
      var dfd = deferred();
      options = dupOpts(options);
      options.origin = toLatLng(options.origin);
      options.destination = toLatLng(options.destination);
      service('DirectionsService').route(options, function (results, status) {
        previousResults.push(results);
        dfd.resolve(status === gm.DirectionsStatus.OK ? results : false);
      });
      return dfd;
    });

    self.cluster = chainToPromise(function (options) {
      var cluster = new Cluster(map, dupOpts(options));
      previousResults.push(cluster);
      return resolved(cluster);
    });

    self.directionsrenderer = chainToPromise(function (options) {
      var instance;
      if (options) {
        options = dupOpts(options);
        options.map = map;
        if (options.panel) {
          options.panel = $(options.panel).get(0);
        }
        instance = gmElement('DirectionsRenderer', options);
      }
      previousResults.push(instance);
      return instance;
    });

    self.latlng = chainToPromise(multiple(function (options) {
      return resolveLatLng(options, 'latlng', function (opts) {
        previousResults.push(opts.latlng);
        return opts.latlng;
      });
    }));

    self.fit = chainToPromise(function () {
      var bounds = gmElement('LatLngBounds');
      foreach(previousResults, function (instances) {
        if (instances !== map) {
          foreach(instances, function (instance) {
            if (instance) {
              if (instance.getPosition && instance.getPosition()) {
                bounds.extend(instance.getPosition());
              } else if (instance.getBounds && instance.getBounds()) {
                bounds.extend(instance.getBounds().getNorthEast());
                bounds.extend(instance.getBounds().getSouthWest());
              } else if (instance.getPaths && instance.getPaths()) {
                foreach(instance.getPaths().getArray(), function (path) {
                  foreach(path.getArray(), function (latLng) {
                    bounds.extend(latLng);
                  });
                });
              } else if (instance.getPath && instance.getPath()) {
                foreach(instance.getPath().getArray(), function (latLng) {
                  bounds.extend(latLng);
                });
              } else if (instance.getCenter && instance.getCenter()) {
                bounds.extend(instance.getCenter());
              }
            }
          });
        }
      });
      if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
      }
      return true;
    });

    self.wait = function (duration) {
      promise = promise.then(function (instance) {
        var dfd = deferred();
        setTimeout(function () {
          dfd.resolve(instance);
        }, duration);
        return dfd;
      });
    };

    self.then = function (fn) {
      if (isFunction(fn)) {
        promise = promise.then(function (instance) {
          return when(fn.call(context(), instance)).then(function (newInstance) {
            return isUndefined(newInstance) ? instance : newInstance;
          });
        });
      }
    };

    self.catch = function (fn) {
      if (isFunction(fn)) {
        promise = promise
          .then(null, function (reason) {
            return when(fn.call(context(), reason));
          });
      }
    };

    foreachStr('on once', function (name, once) {
      self[name] = function () {
        var events = arguments[0];
        if (events) {
          if (typeof events === 'string') { // cast call on('click', handler) to on({click: handler})
            events = {};
            events[arguments[0]] = slice(arguments, 1);
          }
          promise.then(function (instances) {
            if (instances) {
              if (instances instanceof Cluster) {
                instances._b(function (items) {
                  if (items && items.length) {
                    attachEvents(events, items, once);
                  }
                });
                return attachEvents(events, instances.markers(), [undefined, instances], once);
              }
              attachEvents(events, instances, once);
            }
          });
        }
      };
    });

    self.get = function (index) {
      if (isUndefined(index)) {
        return previousResults.map(function (instance) {
          return isArray(instance) ? instance.slice() : instance;
        });
      } else {
        if (index < 0) {
          index = previousResults.length + index;
        }
        return isArray(previousResults[index]) ? previousResults[index].slice() : previousResults[index];
      }
    };

    if (options) {
      self.map(options);
    }
  }

})(jQuery, window, document);
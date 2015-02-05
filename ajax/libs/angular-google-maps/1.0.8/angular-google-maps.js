/*
    Author Nick McCready
    Intersection of Objects if the arrays have something in common each intersecting object will be returned
    in an new array.
*/


(function() {
  _.intersectionObjects = function(array1, array2, comparison) {
    var res,
      _this = this;
    if (comparison == null) {
      comparison = void 0;
    }
    res = _.map(array1, function(obj1) {
      return _.find(array2, function(obj2) {
        if (comparison != null) {
          return comparison(obj1, obj2);
        } else {
          return _.isEqual(obj1, obj2);
        }
      });
    });
    return _.filter(res, function(o) {
      return o != null;
    });
  };

}).call(this);

/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
*/


(function() {
  (function() {
    var app;
    app = angular.module("google-maps", []);
    return app.factory("debounce", [
      "$timeout", function($timeout) {
        return function(fn) {
          var nthCall;
          nthCall = 0;
          return function() {
            var argz, later, that;
            that = this;
            argz = arguments;
            nthCall++;
            later = (function(version) {
              return function() {
                if (version === nthCall) {
                  return fn.apply(that, argz);
                }
              };
            })(nthCall);
            return $timeout(later, 0, true);
          };
        };
      }
    ]);
  })();

}).call(this);

(function() {
  this.ngGmapModule = function(names, fn) {
    var space, _name;
    if (fn == null) {
      fn = function() {};
    }
    if (typeof names === 'string') {
      names = names.split('.');
    }
    space = this[_name = names.shift()] || (this[_name] = {});
    space.ngGmapModule || (space.ngGmapModule = this.ngGmapModule);
    if (names.length) {
      return space.ngGmapModule(names, fn);
    } else {
      return fn.call(space);
    }
  };

}).call(this);

(function() {
  angular.module("google-maps").factory("array-sync", [
    "add-events", function(mapEvents) {
      var LatLngArraySync;
      return LatLngArraySync = function(mapArray, scope, pathEval) {
        var mapArrayListener, scopeArray, watchListener;
        scopeArray = scope.$eval(pathEval);
        mapArrayListener = mapEvents(mapArray, {
          set_at: function(index) {
            var value;
            value = mapArray.getAt(index);
            if (!value) {
              return;
            }
            if (!value.lng || !value.lat) {
              return;
            }
            scopeArray[index].latitude = value.lat();
            return scopeArray[index].longitude = value.lng();
          },
          insert_at: function(index) {
            var value;
            value = mapArray.getAt(index);
            if (!value) {
              return;
            }
            if (!value.lng || !value.lat) {
              return;
            }
            return scopeArray.splice(index, 0, {
              latitude: value.lat(),
              longitude: value.lng()
            });
          },
          remove_at: function(index) {
            return scopeArray.splice(index, 1);
          }
        });
        watchListener = scope.$watch(pathEval, function(newArray) {
          var i, l, newLength, newValue, oldArray, oldLength, oldValue, _results;
          oldArray = mapArray;
          if (newArray) {
            i = 0;
            oldLength = oldArray.getLength();
            newLength = newArray.length;
            l = Math.min(oldLength, newLength);
            newValue = void 0;
            while (i < l) {
              oldValue = oldArray.getAt(i);
              newValue = newArray[i];
              if ((oldValue.lat() !== newValue.latitude) || (oldValue.lng() !== newValue.longitude)) {
                oldArray.setAt(i, new google.maps.LatLng(newValue.latitude, newValue.longitude));
              }
              i++;
            }
            while (i < newLength) {
              newValue = newArray[i];
              oldArray.push(new google.maps.LatLng(newValue.latitude, newValue.longitude));
              i++;
            }
            _results = [];
            while (i < oldLength) {
              oldArray.pop();
              _results.push(i++);
            }
            return _results;
          }
        }, true);
        return function() {
          if (mapArrayListener) {
            mapArrayListener();
            mapArrayListener = null;
          }
          if (watchListener) {
            watchListener();
            return watchListener = null;
          }
        };
      };
    }
  ]);

}).call(this);

(function() {
  angular.module("google-maps").factory("add-events", [
    "$timeout", function($timeout) {
      var addEvent, addEvents;
      addEvent = function(target, eventName, handler) {
        return google.maps.event.addListener(target, eventName, function() {
          handler.apply(this, arguments);
          return $timeout((function() {}), true);
        });
      };
      addEvents = function(target, eventName, handler) {
        var remove;
        if (handler) {
          return addEvent(target, eventName, handler);
        }
        remove = [];
        angular.forEach(eventName, function(_handler, key) {
          return remove.push(addEvent(target, key, _handler));
        });
        return function() {
          angular.forEach(remove, function(fn) {
            if (_.isFunction(fn)) {
              fn();
            }
            if (fn.e !== null && _.isFunction(fn.e)) {
              return fn.e();
            }
          });
          return remove = null;
        };
      };
      return addEvents;
    }
  ]);

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.ngGmapModule("oo", function() {
    var baseObjectKeywords;
    baseObjectKeywords = ['extended', 'included'];
    return this.BaseObject = (function() {
      function BaseObject() {}

      BaseObject.extend = function(obj) {
        var key, value, _ref;
        for (key in obj) {
          value = obj[key];
          if (__indexOf.call(baseObjectKeywords, key) < 0) {
            this[key] = value;
          }
        }
        if ((_ref = obj.extended) != null) {
          _ref.apply(0);
        }
        return this;
      };

      BaseObject.include = function(obj) {
        var key, value, _ref;
        for (key in obj) {
          value = obj[key];
          if (__indexOf.call(baseObjectKeywords, key) < 0) {
            this.prototype[key] = value;
          }
        }
        if ((_ref = obj.included) != null) {
          _ref.apply(0);
        }
        return this;
      };

      return BaseObject;

    })();
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api.managers", function() {
    return this.ClustererMarkerManager = (function(_super) {
      __extends(ClustererMarkerManager, _super);

      function ClustererMarkerManager(gMap, opt_markers, opt_options) {
        this.clear = __bind(this.clear, this);
        this.draw = __bind(this.draw, this);
        this.removeMany = __bind(this.removeMany, this);
        this.remove = __bind(this.remove, this);
        this.addMany = __bind(this.addMany, this);
        this.add = __bind(this.add, this);
        var self;
        ClustererMarkerManager.__super__.constructor.call(this);
        self = this;
        this.opt_options = opt_options;
        if ((opt_options != null) && opt_markers === void 0) {
          this.clusterer = new MarkerClusterer(gMap, void 0, opt_options);
        } else if ((opt_options != null) && (opt_markers != null)) {
          this.clusterer = new MarkerClusterer(gMap, opt_markers, opt_options);
        } else {
          this.clusterer = new MarkerClusterer(gMap);
        }
        this.clusterer.setIgnoreHidden(true);
        this.$log = directives.api.utils.Logger;
        this.noDrawOnSingleAddRemoves = true;
        this.$log.info(this);
      }

      ClustererMarkerManager.prototype.add = function(gMarker) {
        return this.clusterer.addMarker(gMarker, this.noDrawOnSingleAddRemoves);
      };

      ClustererMarkerManager.prototype.addMany = function(gMarkers) {
        return this.clusterer.addMarkers(gMarkers);
      };

      ClustererMarkerManager.prototype.remove = function(gMarker) {
        return this.clusterer.removeMarker(gMarker, this.noDrawOnSingleAddRemoves);
      };

      ClustererMarkerManager.prototype.removeMany = function(gMarkers) {
        return this.clusterer.addMarkers(gMarkers);
      };

      ClustererMarkerManager.prototype.draw = function() {
        return this.clusterer.repaint();
      };

      ClustererMarkerManager.prototype.clear = function() {
        this.clusterer.clearMarkers();
        return this.clusterer.repaint();
      };

      return ClustererMarkerManager;

    })(oo.BaseObject);
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api.managers", function() {
    return this.MarkerManager = (function(_super) {
      __extends(MarkerManager, _super);

      function MarkerManager(gMap, opt_markers, opt_options) {
        this.handleOptDraw = __bind(this.handleOptDraw, this);
        this.clear = __bind(this.clear, this);
        this.draw = __bind(this.draw, this);
        this.removeMany = __bind(this.removeMany, this);
        this.remove = __bind(this.remove, this);
        this.addMany = __bind(this.addMany, this);
        this.add = __bind(this.add, this);
        var self;
        MarkerManager.__super__.constructor.call(this);
        self = this;
        this.gMap = gMap;
        this.gMarkers = [];
        this.$log = directives.api.utils.Logger;
        this.$log.info(this);
      }

      MarkerManager.prototype.add = function(gMarker, optDraw) {
        this.handleOptDraw(gMarker, optDraw, true);
        return this.gMarkers.push(gMarker);
      };

      MarkerManager.prototype.addMany = function(gMarkers) {
        var gMarker, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = gMarkers.length; _i < _len; _i++) {
          gMarker = gMarkers[_i];
          _results.push(this.add(gMarker));
        }
        return _results;
      };

      MarkerManager.prototype.remove = function(gMarker, optDraw) {
        var index, tempIndex;
        this.handleOptDraw(gMarker, optDraw, false);
        if (!optDraw) {
          return;
        }
        index = void 0;
        if (this.gMarkers.indexOf != null) {
          index = this.gMarkers.indexOf(gMarker);
        } else {
          tempIndex = 0;
          _.find(this.gMarkers, function(marker) {
            tempIndex += 1;
            if (marker === gMarker) {
              index = tempIndex;
            }
          });
        }
        if (index != null) {
          return this.gMarkers.splice(index, 1);
        }
      };

      MarkerManager.prototype.removeMany = function(gMarkers) {
        var marker, _i, _len, _ref, _results;
        _ref = this.gMarkers;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          marker = _ref[_i];
          _results.push(this.remove(marker));
        }
        return _results;
      };

      MarkerManager.prototype.draw = function() {
        var deletes, gMarker, _fn, _i, _j, _len, _len1, _ref, _results,
          _this = this;
        deletes = [];
        _ref = this.gMarkers;
        _fn = function(gMarker) {
          if (!gMarker.isDrawn) {
            if (gMarker.doAdd) {
              return gMarker.setMap(_this.gMap);
            } else {
              return deletes.push(gMarker);
            }
          }
        };
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          gMarker = _ref[_i];
          _fn(gMarker);
        }
        _results = [];
        for (_j = 0, _len1 = deletes.length; _j < _len1; _j++) {
          gMarker = deletes[_j];
          _results.push(this.remove(gMarker, true));
        }
        return _results;
      };

      MarkerManager.prototype.clear = function() {
        var gMarker, _i, _len, _ref;
        _ref = this.gMarkers;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          gMarker = _ref[_i];
          gMarker.setMap(null);
        }
        delete this.gMarkers;
        return this.gMarkers = [];
      };

      MarkerManager.prototype.handleOptDraw = function(gMarker, optDraw, doAdd) {
        if (optDraw === true) {
          if (doAdd) {
            gMarker.setMap(this.gMap);
          } else {
            gMarker.setMap(null);
          }
          return gMarker.isDrawn = true;
        } else {
          gMarker.isDrawn = false;
          return gMarker.doAdd = doAdd;
        }
      };

      return MarkerManager;

    })(oo.BaseObject);
  });

}).call(this);

/*
    Author: Nicholas McCready & jfriend00
    AsyncProcessor handles things asynchronous-like :), to allow the UI to be free'd to do other things
    Code taken from http://stackoverflow.com/questions/10344498/best-way-to-iterate-over-an-array-without-blocking-the-ui
*/


(function() {
  this.ngGmapModule("directives.api.utils", function() {
    return this.AsyncProcessor = {
      handleLargeArray: function(array, callback, pausedCallBack, doneCallBack, chunk, index) {
        var doChunk;
        if (chunk == null) {
          chunk = 100;
        }
        if (index == null) {
          index = 0;
        }
        if (array === void 0 || array.length <= 0) {
          doneCallBack();
          return;
        }
        doChunk = function() {
          var cnt, i;
          cnt = chunk;
          i = index;
          while (cnt-- && i < array.length) {
            callback(array[i]);
            ++i;
          }
          if (i < array.length) {
            index = i;
            if (pausedCallBack != null) {
              pausedCallBack();
            }
            return setTimeout(doChunk, 1);
          } else {
            return doneCallBack();
          }
        };
        return doChunk();
      }
    };
  });

}).call(this);

/*
    Useful function callbacks that should be defined at later time.
    Mainly to be used for specs to verify creation / linking.

    This is to lead a common design in notifying child stuff.
*/


(function() {
  this.ngGmapModule("directives.api.utils", function() {
    return this.ChildEvents = {
      onChildCreation: function(child) {}
    };
  });

}).call(this);

(function() {
  this.ngGmapModule("directives.api.utils", function() {
    return this.GmapUtil = {
      getLabelPositionPoint: function(anchor) {
        var xPos, yPos;
        if (anchor === void 0) {
          return void 0;
        }
        anchor = /^([\d\.]+)\s([\d\.]+)$/.exec(anchor);
        xPos = anchor[1];
        yPos = anchor[2];
        if (xPos && yPos) {
          return new google.maps.Point(xPos, yPos);
        }
      },
      createMarkerOptions: function(coords, icon, defaults, map) {
        var opts;
        if (map == null) {
          map = void 0;
        }
        if (defaults == null) {
          defaults = {};
        }
        opts = angular.extend({}, defaults, {
          position: defaults.position != null ? defaults.position : new google.maps.LatLng(coords.latitude, coords.longitude),
          icon: defaults.icon != null ? defaults.icon : icon,
          visible: defaults.visible != null ? defaults.visible : (coords.latitude != null) && (coords.longitude != null)
        });
        if (map != null) {
          opts.map = map;
        }
        return opts;
      },
      createWindowOptions: function(gMarker, scope, content, defaults) {
        if ((content != null) && (defaults != null)) {
          return angular.extend({}, defaults, {
            content: defaults.content != null ? defaults.content : content,
            position: defaults.position != null ? defaults.position : angular.isObject(gMarker) ? gMarker.getPosition() : new google.maps.LatLng(scope.coords.latitude, scope.coords.longitude)
          });
        }
      },
      defaultDelay: 50
    };
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api.utils", function() {
    return this.Linked = (function(_super) {
      __extends(Linked, _super);

      function Linked(scope, element, attrs, ctrls) {
        this.scope = scope;
        this.element = element;
        this.attrs = attrs;
        this.ctrls = ctrls;
      }

      return Linked;

    })(oo.BaseObject);
  });

}).call(this);

(function() {
  this.ngGmapModule("directives.api.utils", function() {
    var logger;
    this.Logger = {
      logger: void 0,
      doLog: false,
      info: function(msg) {
        if (logger.doLog) {
          if (logger.logger != null) {
            return logger.logger.info(msg);
          } else {
            return console.info(msg);
          }
        }
      },
      error: function(msg) {
        if (logger.doLog) {
          if (logger.logger != null) {
            return logger.logger.error(msg);
          } else {
            return console.error(msg);
          }
        }
      }
    };
    return logger = this.Logger;
  });

}).call(this);

(function() {
  this.ngGmapModule("directives.api.utils", function() {
    return this.ModelsWatcher = {
      didModelsChange: function(newValue, oldValue) {
        var didModelsChange, hasIntersectionDiff;
        if (!_.isArray(newValue)) {
          directives.api.utils.Logger.error("models property must be an array newValue of: " + (newValue.toString()) + " is not!!");
          return false;
        }
        if (newValue === oldValue) {
          return false;
        }
        hasIntersectionDiff = _.intersectionObjects(newValue, oldValue).length !== oldValue.length;
        didModelsChange = true;
        if (!hasIntersectionDiff) {
          didModelsChange = newValue.length !== oldValue.length;
        }
        return didModelsChange;
      }
    };
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api.models.child", function() {
    return this.MarkerLabelChildModel = (function(_super) {
      __extends(MarkerLabelChildModel, _super);

      MarkerLabelChildModel.include(directives.api.utils.GmapUtil);

      function MarkerLabelChildModel(gMarker, opt_options) {
        this.destroy = __bind(this.destroy, this);
        this.draw = __bind(this.draw, this);
        this.setPosition = __bind(this.setPosition, this);
        this.setZIndex = __bind(this.setZIndex, this);
        this.setVisible = __bind(this.setVisible, this);
        this.setAnchor = __bind(this.setAnchor, this);
        this.setMandatoryStyles = __bind(this.setMandatoryStyles, this);
        this.setStyles = __bind(this.setStyles, this);
        this.setContent = __bind(this.setContent, this);
        this.setTitle = __bind(this.setTitle, this);
        this.getSharedCross = __bind(this.getSharedCross, this);
        var self, _ref, _ref1;
        MarkerLabelChildModel.__super__.constructor.call(this);
        self = this;
        this.marker = gMarker;
        this.marker.set("labelContent", opt_options.labelContent);
        this.marker.set("labelAnchor", this.getLabelPositionPoint(opt_options.labelAnchor));
        this.marker.set("labelClass", opt_options.labelClass || 'labels');
        this.marker.set("labelStyle", opt_options.labelStyle || {
          opacity: 100
        });
        this.marker.set("labelInBackground", opt_options.labelInBackground || false);
        if (!opt_options.labelVisible) {
          this.marker.set("labelVisible", true);
        }
        if (!opt_options.raiseOnDrag) {
          this.marker.set("raiseOnDrag", true);
        }
        if (!opt_options.clickable) {
          this.marker.set("clickable", true);
        }
        if (!opt_options.draggable) {
          this.marker.set("draggable", false);
        }
        if (!opt_options.optimized) {
          this.marker.set("optimized", false);
        }
        opt_options.crossImage = (_ref = opt_options.crossImage) != null ? _ref : document.location.protocol + "//maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png";
        opt_options.handCursor = (_ref1 = opt_options.handCursor) != null ? _ref1 : document.location.protocol + "//maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur";
        this.markerLabel = new MarkerLabel_(this.marker, opt_options.crossImage, opt_options.handCursor);
        this.marker.set("setMap", function(theMap) {
          google.maps.Marker.prototype.setMap.apply(this, arguments);
          return self.markerLabel.setMap(theMap);
        });
        this.marker.setMap(this.marker.getMap());
      }

      MarkerLabelChildModel.prototype.getSharedCross = function(crossUrl) {
        return this.markerLabel.getSharedCross(crossUrl);
      };

      MarkerLabelChildModel.prototype.setTitle = function() {
        return this.markerLabel.setTitle();
      };

      MarkerLabelChildModel.prototype.setContent = function() {
        return this.markerLabel.setContent();
      };

      MarkerLabelChildModel.prototype.setStyles = function() {
        return this.markerLabel.setStyles();
      };

      MarkerLabelChildModel.prototype.setMandatoryStyles = function() {
        return this.markerLabel.setMandatoryStyles();
      };

      MarkerLabelChildModel.prototype.setAnchor = function() {
        return this.markerLabel.setAnchor();
      };

      MarkerLabelChildModel.prototype.setVisible = function() {
        return this.markerLabel.setVisible();
      };

      MarkerLabelChildModel.prototype.setZIndex = function() {
        return this.markerLabel.setZIndex();
      };

      MarkerLabelChildModel.prototype.setPosition = function() {
        return this.markerLabel.setPosition();
      };

      MarkerLabelChildModel.prototype.draw = function() {
        return this.markerLabel.draw();
      };

      MarkerLabelChildModel.prototype.destroy = function() {
        if ((this.markerLabel.labelDiv_.parentNode != null) && (this.markerLabel.eventDiv_.parentNode != null)) {
          return this.markerLabel.onRemove();
        }
      };

      return MarkerLabelChildModel;

    })(oo.BaseObject);
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api.models.child", function() {
    return this.MarkerChildModel = (function(_super) {
      __extends(MarkerChildModel, _super);

      MarkerChildModel.include(directives.api.utils.GmapUtil);

      function MarkerChildModel(index, model, parentScope, gMap, $timeout, defaults, doClick, gMarkerManager) {
        var self,
          _this = this;
        this.index = index;
        this.model = model;
        this.parentScope = parentScope;
        this.gMap = gMap;
        this.defaults = defaults;
        this.doClick = doClick;
        this.gMarkerManager = gMarkerManager;
        this.watchDestroy = __bind(this.watchDestroy, this);
        this.setLabelOptions = __bind(this.setLabelOptions, this);
        this.isLabelDefined = __bind(this.isLabelDefined, this);
        this.setOptions = __bind(this.setOptions, this);
        this.setIcon = __bind(this.setIcon, this);
        this.setCoords = __bind(this.setCoords, this);
        this.destroy = __bind(this.destroy, this);
        this.maybeSetScopeValue = __bind(this.maybeSetScopeValue, this);
        this.createMarker = __bind(this.createMarker, this);
        this.setMyScope = __bind(this.setMyScope, this);
        self = this;
        this.iconKey = this.parentScope.icon;
        this.coordsKey = this.parentScope.coords;
        this.clickKey = this.parentScope.click();
        this.labelContentKey = this.parentScope.labelContent;
        this.optionsKey = this.parentScope.options;
        this.labelOptionsKey = this.parentScope.labelOptions;
        this.myScope = this.parentScope.$new(false);
        this.myScope.model = this.model;
        this.setMyScope(this.model, void 0, true);
        this.createMarker(this.model);
        this.myScope.$watch('model', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            return _this.setMyScope(newValue, oldValue);
          }
        }, true);
        this.$log = directives.api.utils.Logger;
        this.$log.info(self);
        this.watchDestroy(this.myScope);
      }

      MarkerChildModel.prototype.setMyScope = function(model, oldModel, isInit) {
        if (oldModel == null) {
          oldModel = void 0;
        }
        if (isInit == null) {
          isInit = false;
        }
        this.maybeSetScopeValue('icon', model, oldModel, this.iconKey, this.evalModelHandle, isInit, this.setIcon);
        this.maybeSetScopeValue('coords', model, oldModel, this.coordsKey, this.evalModelHandle, isInit, this.setCoords);
        this.maybeSetScopeValue('labelContent', model, oldModel, this.labelContentKey, this.evalModelHandle, isInit);
        this.maybeSetScopeValue('click', model, oldModel, this.clickKey, this.evalModelHandle, isInit);
        return this.createMarker(model, oldModel, isInit);
      };

      MarkerChildModel.prototype.createMarker = function(model, oldModel, isInit) {
        var _this = this;
        if (oldModel == null) {
          oldModel = void 0;
        }
        if (isInit == null) {
          isInit = false;
        }
        return this.maybeSetScopeValue('options', model, oldModel, this.optionsKey, function(lModel, lModelKey) {
          var value;
          if (lModel === void 0) {
            return void 0;
          }
          value = lModelKey === 'self' ? lModel : lModel[lModelKey];
          if (value === void 0) {
            return value = lModelKey === void 0 ? _this.defaults : _this.myScope.options;
          } else {
            return value;
          }
        }, isInit, this.setOptions);
      };

      MarkerChildModel.prototype.evalModelHandle = function(model, modelKey) {
        if (model === void 0) {
          return void 0;
        }
        if (modelKey === 'self') {
          return model;
        } else {
          return model[modelKey];
        }
      };

      MarkerChildModel.prototype.maybeSetScopeValue = function(scopePropName, model, oldModel, modelKey, evaluate, isInit, gSetter) {
        var newValue, oldVal;
        if (gSetter == null) {
          gSetter = void 0;
        }
        if (oldModel === void 0) {
          this.myScope[scopePropName] = evaluate(model, modelKey);
          if (!isInit) {
            if (gSetter != null) {
              gSetter(this.myScope);
            }
          }
          return;
        }
        oldVal = evaluate(oldModel, modelKey);
        newValue = evaluate(model, modelKey);
        if (newValue !== oldVal && this.myScope[scopePropName] !== newValue) {
          this.myScope[scopePropName] = newValue;
          if (!isInit) {
            if (gSetter != null) {
              gSetter(this.myScope);
            }
            return this.gMarkerManager.draw();
          }
        }
      };

      MarkerChildModel.prototype.destroy = function() {
        return this.myScope.$destroy();
      };

      MarkerChildModel.prototype.setCoords = function(scope) {
        if (scope.$id !== this.myScope.$id || this.gMarker === void 0) {
          return;
        }
        if ((scope.coords != null)) {
          if ((this.scope.coords.latitude == null) || (this.scope.coords.longitude == null)) {
            this.$log.error("MarkerChildMarker cannot render marker as scope.coords as no position on marker: " + (JSON.stringify(this.model)));
            return;
          }
          this.gMarker.setPosition(new google.maps.LatLng(scope.coords.latitude, scope.coords.longitude));
          this.gMarker.setVisible((scope.coords.latitude != null) && (scope.coords.longitude != null));
          this.gMarkerManager.remove(this.gMarker);
          return this.gMarkerManager.add(this.gMarker);
        } else {
          return this.gMarkerManager.remove(this.gMarker);
        }
      };

      MarkerChildModel.prototype.setIcon = function(scope) {
        if (scope.$id !== this.myScope.$id || this.gMarker === void 0) {
          return;
        }
        this.gMarkerManager.remove(this.gMarker);
        this.gMarker.setIcon(scope.icon);
        this.gMarkerManager.add(this.gMarker);
        this.gMarker.setPosition(new google.maps.LatLng(scope.coords.latitude, scope.coords.longitude));
        return this.gMarker.setVisible(scope.coords.latitude && (scope.coords.longitude != null));
      };

      MarkerChildModel.prototype.setOptions = function(scope) {
        var _ref,
          _this = this;
        if (scope.$id !== this.myScope.$id) {
          return;
        }
        if (this.gMarker != null) {
          this.gMarkerManager.remove(this.gMarker);
          delete this.gMarker;
        }
        if (!((_ref = scope.coords) != null ? _ref : typeof scope.icon === "function" ? scope.icon(scope.options != null) : void 0)) {
          return;
        }
        this.opts = this.createMarkerOptions(scope.coords, scope.icon, scope.options);
        delete this.gMarker;
        if (this.isLabelDefined(scope)) {
          this.gMarker = new MarkerWithLabel(this.setLabelOptions(this.opts, scope));
        } else {
          this.gMarker = new google.maps.Marker(this.opts);
        }
        this.gMarkerManager.add(this.gMarker);
        return google.maps.event.addListener(this.gMarker, 'click', function() {
          if (_this.doClick && (_this.myScope.click != null)) {
            return _this.myScope.click();
          }
        });
      };

      MarkerChildModel.prototype.isLabelDefined = function(scope) {
        return scope.labelContent != null;
      };

      MarkerChildModel.prototype.setLabelOptions = function(opts, scope) {
        opts.labelAnchor = this.getLabelPositionPoint(scope.labelAnchor);
        opts.labelClass = scope.labelClass;
        opts.labelContent = scope.labelContent;
        return opts;
      };

      MarkerChildModel.prototype.watchDestroy = function(scope) {
        var _this = this;
        return scope.$on("$destroy", function() {
          var self;
          if (_this.gMarker != null) {
            _this.gMarkerManager.remove(_this.gMarker);
            delete _this.gMarker;
          }
          return self = void 0;
        });
      };

      return MarkerChildModel;

    })(oo.BaseObject);
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api.models.child", function() {
    return this.WindowChildModel = (function(_super) {
      __extends(WindowChildModel, _super);

      WindowChildModel.include(directives.api.utils.GmapUtil);

      function WindowChildModel(scope, opts, isIconVisibleOnClick, mapCtrl, markerCtrl, $http, $templateCache, $compile, element, needToManualDestroy) {
        this.element = element;
        if (needToManualDestroy == null) {
          needToManualDestroy = false;
        }
        this.destroy = __bind(this.destroy, this);
        this.hideWindow = __bind(this.hideWindow, this);
        this.getLatestPosition = __bind(this.getLatestPosition, this);
        this.showWindow = __bind(this.showWindow, this);
        this.handleClick = __bind(this.handleClick, this);
        this.watchCoords = __bind(this.watchCoords, this);
        this.watchShow = __bind(this.watchShow, this);
        this.createGWin = __bind(this.createGWin, this);
        this.scope = scope;
        this.opts = opts;
        this.mapCtrl = mapCtrl;
        this.markerCtrl = markerCtrl;
        this.isIconVisibleOnClick = isIconVisibleOnClick;
        this.initialMarkerVisibility = this.markerCtrl != null ? this.markerCtrl.getVisible() : false;
        this.$log = directives.api.utils.Logger;
        this.$http = $http;
        this.$templateCache = $templateCache;
        this.$compile = $compile;
        this.createGWin();
        if (this.markerCtrl != null) {
          this.markerCtrl.setClickable(true);
        }
        this.handleClick();
        this.watchShow();
        this.watchCoords();
        this.needToManualDestroy = needToManualDestroy;
        this.$log.info(this);
      }

      WindowChildModel.prototype.createGWin = function(createOpts) {
        var _this = this;
        if (createOpts == null) {
          createOpts = false;
        }
        if ((this.gWin == null) && createOpts) {
          this.opts = this.markerCtrl != null ? this.createWindowOptions(this.markerCtrl, this.scope, this.element.html(), {}) : {};
        }
        if ((this.opts != null) && this.gWin === void 0) {
          this.gWin = new google.maps.InfoWindow(this.opts);
          return google.maps.event.addListener(this.gWin, 'closeclick', function() {
            if (_this.markerCtrl != null) {
              _this.markerCtrl.setVisible(_this.initialMarkerVisibility);
            }
            if (_this.scope.closeClick != null) {
              return _this.scope.closeClick();
            }
          });
        }
      };

      WindowChildModel.prototype.watchShow = function() {
        var _this = this;
        return this.scope.$watch('show', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            if (newValue) {
              return _this.showWindow();
            } else {
              return _this.hideWindow();
            }
          } else {
            if (_this.gWin != null) {
              if (newValue && !_this.gWin.getMap()) {
                return _this.showWindow();
              }
            }
          }
        }, true);
      };

      WindowChildModel.prototype.watchCoords = function() {
        var scope,
          _this = this;
        scope = this.markerCtrl != null ? this.scope.$parent : this.scope;
        return scope.$watch('coords', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            if (newValue == null) {
              return _this.hideWindow();
            } else {
              if ((newValue.latitude == null) || (newValue.longitude == null)) {
                _this.$log.error("WindowChildMarker cannot render marker as scope.coords as no position on marker: " + (JSON.stringify(_this.model)));
                return;
              }
              return _this.gWin.setPosition(new google.maps.LatLng(newValue.latitude, newValue.longitude));
            }
          }
        }, true);
      };

      WindowChildModel.prototype.handleClick = function() {
        var _this = this;
        if (this.markerCtrl != null) {
          return google.maps.event.addListener(this.markerCtrl, 'click', function() {
            var pos;
            if (_this.gWin == null) {
              _this.createGWin(true);
            }
            pos = _this.markerCtrl.getPosition();
            if (_this.gWin != null) {
              _this.gWin.setPosition(pos);
              _this.gWin.open(_this.mapCtrl);
            }
            _this.initialMarkerVisibility = _this.markerCtrl.getVisible();
            return _this.markerCtrl.setVisible(_this.isIconVisibleOnClick);
          });
        }
      };

      WindowChildModel.prototype.showWindow = function() {
        var _this = this;
        if (this.scope.templateUrl) {
          if (this.gWin) {
            return this.$http.get(this.scope.templateUrl, {
              cache: this.$templateCache
            }).then(function(content) {
              var compiled, templateScope;
              templateScope = _this.scope.$new();
              if (angular.isDefined(_this.scope.templateParameter)) {
                templateScope.parameter = _this.scope.templateParameter;
              }
              compiled = _this.$compile(content.data)(templateScope);
              _this.gWin.setContent(compiled.get(0));
              return _this.gWin.open(_this.mapCtrl);
            });
          }
        } else {
          if (this.gWin != null) {
            return this.gWin.open(this.mapCtrl);
          }
        }
      };

      WindowChildModel.prototype.getLatestPosition = function() {
        if ((this.gWin != null) && (this.markerCtrl != null)) {
          return this.gWin.setPosition(this.markerCtrl.getPosition());
        }
      };

      WindowChildModel.prototype.hideWindow = function() {
        if (this.gWin != null) {
          return this.gWin.close();
        }
      };

      WindowChildModel.prototype.destroy = function() {
        var self;
        this.hideWindow(this.gWin);
        if ((this.scope != null) && this.needToManualDestroy) {
          this.scope.$destroy();
        }
        delete this.gWin;
        return self = void 0;
      };

      return WindowChildModel;

    })(oo.BaseObject);
  });

}).call(this);

/*
	- interface for all markers to derrive from
 	- to enforce a minimum set of requirements
 		- attributes
 			- coords
 			- icon
		- implementation needed on watches
*/


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api.models.parent", function() {
    return this.IMarkerParentModel = (function(_super) {
      __extends(IMarkerParentModel, _super);

      IMarkerParentModel.prototype.DEFAULTS = {};

      IMarkerParentModel.prototype.isFalse = function(value) {
        return ['false', 'FALSE', 0, 'n', 'N', 'no', 'NO'].indexOf(value) !== -1;
      };

      function IMarkerParentModel(scope, element, attrs, mapCtrl, $timeout) {
        var self,
          _this = this;
        this.scope = scope;
        this.element = element;
        this.attrs = attrs;
        this.mapCtrl = mapCtrl;
        this.$timeout = $timeout;
        this.linkInit = __bind(this.linkInit, this);
        this.onDestroy = __bind(this.onDestroy, this);
        this.onWatch = __bind(this.onWatch, this);
        this.watch = __bind(this.watch, this);
        this.validateScope = __bind(this.validateScope, this);
        this.onTimeOut = __bind(this.onTimeOut, this);
        self = this;
        this.$log = directives.api.utils.Logger;
        if (!this.validateScope(scope)) {
          return;
        }
        this.doClick = angular.isDefined(attrs.click);
        if (scope.options != null) {
          this.DEFAULTS = scope.options;
        }
        this.$timeout(function() {
          _this.watch('coords', scope);
          _this.watch('icon', scope);
          _this.watch('options', scope);
          _this.onTimeOut(scope);
          return scope.$on("$destroy", function() {
            return _this.onDestroy(scope);
          });
        });
      }

      IMarkerParentModel.prototype.onTimeOut = function(scope) {};

      IMarkerParentModel.prototype.validateScope = function(scope) {
        var ret;
        if (scope == null) {
          return false;
        }
        ret = scope.coords != null;
        if (!ret) {
          this.$log.error(this.constructor.name + ": no valid coords attribute found");
        }
        return ret;
      };

      IMarkerParentModel.prototype.watch = function(propNameToWatch, scope) {
        var _this = this;
        return scope.$watch(propNameToWatch, function(newValue, oldValue) {
          if (newValue !== oldValue) {
            return _this.onWatch(propNameToWatch, scope, newValue, oldValue);
          }
        }, true);
      };

      IMarkerParentModel.prototype.onWatch = function(propNameToWatch, scope, newValue, oldValue) {
        throw new Exception("Not Implemented!!");
      };

      IMarkerParentModel.prototype.onDestroy = function(scope) {
        throw new Exception("Not Implemented!!");
      };

      IMarkerParentModel.prototype.linkInit = function(element, mapCtrl, scope, animate) {
        throw new Exception("Not Implemented!!");
      };

      return IMarkerParentModel;

    })(oo.BaseObject);
  });

}).call(this);

/*
	- interface directive for all window(s) to derrive from
*/


(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api.models.parent", function() {
    return this.IWindowParentModel = (function(_super) {
      __extends(IWindowParentModel, _super);

      IWindowParentModel.include(directives.api.utils.GmapUtil);

      IWindowParentModel.prototype.DEFAULTS = {};

      function IWindowParentModel(scope, element, attrs, ctrls, $timeout, $compile, $http, $templateCache) {
        var self;
        self = this;
        this.$log = directives.api.utils.Logger;
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.$http = $http;
        this.$templateCache = $templateCache;
        if (scope.options != null) {
          this.DEFAULTS = scope.options;
        }
      }

      return IWindowParentModel;

    })(oo.BaseObject);
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api.models.parent", function() {
    return this.LayerParentModel = (function(_super) {
      __extends(LayerParentModel, _super);

      function LayerParentModel(scope, element, attrs, mapCtrl, $timeout, onLayerCreated, $log) {
        var _this = this;
        this.scope = scope;
        this.element = element;
        this.attrs = attrs;
        this.mapCtrl = mapCtrl;
        this.$timeout = $timeout;
        this.onLayerCreated = onLayerCreated != null ? onLayerCreated : void 0;
        this.$log = $log != null ? $log : directives.api.utils.Logger;
        this.createGoogleLayer = __bind(this.createGoogleLayer, this);
        if (this.attrs.type == null) {
          this.$log.info("type attribute for the layer directive is mandatory. Layer creation aborted!!");
          return;
        }
        this.createGoogleLayer();
        this.gMap = void 0;
        this.doShow = true;
        this.$timeout(function() {
          _this.gMap = mapCtrl.getMap();
          if (angular.isDefined(_this.attrs.show)) {
            _this.doShow = _this.scope.show;
          }
          if (_this.doShow !== null && _this.doShow && _this.Map !== null) {
            _this.layer.setMap(_this.gMap);
          }
          _this.scope.$watch("show", function(newValue, oldValue) {
            if (newValue !== oldValue) {
              _this.doShow = newValue;
              if (newValue) {
                return _this.layer.setMap(_this.gMap);
              } else {
                return _this.layer.setMap(null);
              }
            }
          }, true);
          _this.scope.$watch("options", function(newValue, oldValue) {
            if (newValue !== oldValue) {
              _this.layer.setMap(null);
              _this.layer = null;
              return _this.createGoogleLayer();
            }
          }, true);
          return _this.scope.$on("$destroy", function() {
            return this.layer.setMap(null);
          });
        });
      }

      LayerParentModel.prototype.createGoogleLayer = function() {
        var _this = this;
        if (this.attrs.options != null) {
          this.layer = this.attrs.namespace === void 0 ? new google.maps[this.attrs.type]() : new google.maps[this.attrs.namespace][this.attrs.type]();
        } else {
          this.layer = this.attrs.namespace === void 0 ? new google.maps[this.attrs.type](this.scope.options) : new google.maps[this.attrs.namespace][this.attrs.type](this.scope.options);
        }
        return this.$timeout(function() {
          var fn;
          if ((_this.layer != null) && (_this.onLayerCreated != null)) {
            fn = _this.onLayerCreated(_this.scope, _this.layer);
            if (fn) {
              return fn(_this.layer);
            }
          }
        });
      };

      return LayerParentModel;

    })(oo.BaseObject);
  });

}).call(this);

/*
	Basic Directive api for a marker. Basic in the sense that this directive contains 1:1 on scope and model. 
	Thus there will be one html element per marker within the directive.
*/


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api.models.parent", function() {
    return this.MarkerParentModel = (function(_super) {
      __extends(MarkerParentModel, _super);

      MarkerParentModel.include(directives.api.utils.GmapUtil);

      function MarkerParentModel(scope, element, attrs, mapCtrl, $timeout) {
        this.onDestroy = __bind(this.onDestroy, this);
        this.onWatch = __bind(this.onWatch, this);
        this.onTimeOut = __bind(this.onTimeOut, this);
        var self;
        MarkerParentModel.__super__.constructor.call(this, scope, element, attrs, mapCtrl, $timeout);
        self = this;
      }

      MarkerParentModel.prototype.onTimeOut = function(scope) {
        var opts,
          _this = this;
        opts = this.createMarkerOptions(scope.coords, scope.icon, scope.options, this.mapCtrl.getMap());
        this.scope.gMarker = new google.maps.Marker(opts);
        google.maps.event.addListener(this.scope.gMarker, 'click', function() {
          if (_this.doClick && (scope.click != null)) {
            return _this.$timeout(function() {
              return _this.scope.click();
            });
          }
        });
        this.setEvents(this.scope.gMarker, scope);
        return this.$log.info(this);
      };

      MarkerParentModel.prototype.onWatch = function(propNameToWatch, scope) {
        switch (propNameToWatch) {
          case 'coords':
            if ((scope.coords != null) && (this.scope.gMarker != null)) {
              this.scope.gMarker.setMap(this.mapCtrl.getMap());
              this.scope.gMarker.setPosition(new google.maps.LatLng(scope.coords.latitude, scope.coords.longitude));
              this.scope.gMarker.setVisible((scope.coords.latitude != null) && (scope.coords.longitude != null));
              return this.scope.gMarker.setOptions(scope.options);
            } else {
              return this.scope.gMarker.setMap(null);
            }
            break;
          case 'icon':
            if ((scope.icon != null) && (scope.coords != null) && (this.scope.gMarker != null)) {
              this.scope.gMarker.setOptions(scope.options);
              this.scope.gMarker.setIcon(scope.icon);
              this.scope.gMarker.setMap(null);
              this.scope.gMarker.setMap(this.mapCtrl.getMap());
              this.scope.gMarker.setPosition(new google.maps.LatLng(scope.coords.latitude, scope.coords.longitude));
              return this.scope.gMarker.setVisible(scope.coords.latitude && (scope.coords.longitude != null));
            }
            break;
          case 'options':
            if ((scope.coords != null) && (scope.icon != null) && scope.options) {
              if (this.scope.gMarker != null) {
                this.scope.gMarker.setMap(null);
              }
              delete this.scope.gMarker;
              return this.scope.gMarker = new google.maps.Marker(this.createMarkerOptions(scope.coords, scope.icon, scope.options, this.mapCtrl.getMap()));
            }
        }
      };

      MarkerParentModel.prototype.onDestroy = function(scope) {
        var self;
        if (this.scope.gMarker === void 0) {
          self = void 0;
          return;
        }
        this.scope.gMarker.setMap(null);
        delete this.scope.gMarker;
        return self = void 0;
      };

      MarkerParentModel.prototype.setEvents = function(marker, scope) {
        var eventHandler, eventName, _ref, _results;
        if (angular.isDefined(scope.events) && (scope.events != null) && angular.isObject(scope.events)) {
          _ref = scope.events;
          _results = [];
          for (eventName in _ref) {
            eventHandler = _ref[eventName];
            if (scope.events.hasOwnProperty(eventName) && angular.isFunction(scope.events[eventName])) {
              _results.push(google.maps.event.addListener(marker, eventName, function() {
                return eventHandler.apply(scope, [marker, eventName, arguments]);
              }));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }
      };

      return MarkerParentModel;

    })(directives.api.models.parent.IMarkerParentModel);
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api.models.parent", function() {
    return this.MarkersParentModel = (function(_super) {
      __extends(MarkersParentModel, _super);

      MarkersParentModel.include(directives.api.utils.ModelsWatcher);

      function MarkersParentModel(scope, element, attrs, mapCtrl, $timeout) {
        this.fit = __bind(this.fit, this);
        this.onDestroy = __bind(this.onDestroy, this);
        this.onWatch = __bind(this.onWatch, this);
        this.reBuildMarkers = __bind(this.reBuildMarkers, this);
        this.createMarkers = __bind(this.createMarkers, this);
        this.validateScope = __bind(this.validateScope, this);
        this.onTimeOut = __bind(this.onTimeOut, this);
        var self;
        MarkersParentModel.__super__.constructor.call(this, scope, element, attrs, mapCtrl, $timeout);
        self = this;
        this.markersIndex = 0;
        this.gMarkerManager = void 0;
        this.scope = scope;
        this.bigGulp = directives.api.utils.AsyncProcessor;
        this.$timeout = $timeout;
        this.$log.info(this);
      }

      MarkersParentModel.prototype.onTimeOut = function(scope) {
        this.watch('models', scope);
        this.watch('doCluster', scope);
        this.watch('clusterOptions', scope);
        this.watch('fit', scope);
        return this.createMarkers(scope);
      };

      MarkersParentModel.prototype.validateScope = function(scope) {
        var modelsNotDefined;
        modelsNotDefined = angular.isUndefined(scope.models) || scope.models === void 0;
        if (modelsNotDefined) {
          this.$log.error(this.constructor.name + ": no valid models attribute found");
        }
        return MarkersParentModel.__super__.validateScope.call(this, scope) || modelsNotDefined;
      };

      MarkersParentModel.prototype.createMarkers = function(scope) {
        var markers,
          _this = this;
        if ((scope.doCluster != null) && scope.doCluster === true) {
          if (scope.clusterOptions != null) {
            if (this.gMarkerManager === void 0) {
              this.gMarkerManager = new directives.api.managers.ClustererMarkerManager(this.mapCtrl.getMap(), void 0, scope.clusterOptions);
            } else {
              if (this.gMarkerManager.opt_options !== scope.clusterOptions) {
                this.gMarkerManager = new directives.api.managers.ClustererMarkerManager(this.mapCtrl.getMap(), void 0, scope.clusterOptions);
              }
            }
          } else {
            this.gMarkerManager = new directives.api.managers.ClustererMarkerManager(this.mapCtrl.getMap());
          }
        } else {
          this.gMarkerManager = new directives.api.managers.MarkerManager(this.mapCtrl.getMap());
        }
        markers = [];
        return this.bigGulp.handleLargeArray(scope.models, function(model) {
          var child;
          scope.doRebuild = true;
          child = new directives.api.models.child.MarkerChildModel(_this.markersIndex, model, scope, _this.mapCtrl, _this.$timeout, _this.DEFAULTS, _this.doClick, _this.gMarkerManager);
          _this.$log.info('child', child, 'markers', markers);
          markers.push(child);
          return _this.markersIndex++;
        }, (function() {}), function() {
          _this.gMarkerManager.draw();
          scope.markerModels = markers;
          if (angular.isDefined(_this.attrs.fit) && (scope.fit != null) && scope.fit) {
            return _this.fit();
          }
        });
      };

      MarkersParentModel.prototype.reBuildMarkers = function(scope) {
        var _this = this;
        if (!scope.doRebuild && scope.doRebuild !== void 0) {
          return;
        }
        _.each(scope.markerModels, function(oldM) {
          return oldM.destroy();
        });
        delete scope.markerModels;
        scope.markerModels = [];
        this.markersIndex = 0;
        if (this.gMarkerManager != null) {
          this.gMarkerManager.clear();
        }
        return this.createMarkers(scope);
      };

      MarkersParentModel.prototype.onWatch = function(propNameToWatch, scope, newValue, oldValue) {
        if (propNameToWatch === 'models') {
          if (!this.didModelsChange(newValue, oldValue)) {
            return;
          }
        }
        if (propNameToWatch === 'options' && (newValue != null)) {
          this.DEFAULTS = newValue;
          return;
        }
        return this.reBuildMarkers(scope);
      };

      MarkersParentModel.prototype.onDestroy = function(scope) {
        var model, _i, _len, _ref;
        _ref = scope.markerModels;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          model = _ref[_i];
          model.destroy();
        }
        if (this.gMarkerManager != null) {
          return this.gMarkerManager.clear();
        }
      };

      MarkersParentModel.prototype.fit = function() {
        var bounds, everSet,
          _this = this;
        if (this.mapCtrl && (this.scope.markerModels != null) && this.scope.markerModels.length > 0) {
          bounds = new google.maps.LatLngBounds();
          everSet = false;
          _.each(this.scope.markerModels, function(childModelMarker) {
            if (childModelMarker.gMarker != null) {
              if (!everSet) {
                everSet = true;
              }
              return bounds.extend(childModelMarker.gMarker.getPosition());
            }
          });
          if (everSet) {
            return this.mapCtrl.getMap().fitBounds(bounds);
          }
        }
      };

      return MarkersParentModel;

    })(directives.api.models.parent.IMarkerParentModel);
  });

}).call(this);

/*
	Windows directive where many windows map to the models property
*/


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api.models.parent", function() {
    return this.WindowsParentModel = (function(_super) {
      __extends(WindowsParentModel, _super);

      WindowsParentModel.include(directives.api.utils.ModelsWatcher);

      function WindowsParentModel(scope, element, attrs, ctrls, $timeout, $compile, $http, $templateCache, $interpolate) {
        this.interpolateContent = __bind(this.interpolateContent, this);
        this.setChildScope = __bind(this.setChildScope, this);
        this.createWindow = __bind(this.createWindow, this);
        this.setContentKeys = __bind(this.setContentKeys, this);
        this.createChildScopesWindows = __bind(this.createChildScopesWindows, this);
        this.watchOurScope = __bind(this.watchOurScope, this);
        this.watchDestroy = __bind(this.watchDestroy, this);
        this.watchModels = __bind(this.watchModels, this);
        this.watch = __bind(this.watch, this);
        var name, self, _i, _len, _ref,
          _this = this;
        WindowsParentModel.__super__.constructor.call(this, scope, element, attrs, ctrls, $timeout, $compile, $http, $templateCache, $interpolate);
        self = this;
        this.$interpolate = $interpolate;
        this.windows = [];
        this.windwsIndex = 0;
        this.scopePropNames = ['show', 'coords', 'templateUrl', 'templateParameter', 'isIconVisibleOnClick', 'closeClick'];
        _ref = this.scopePropNames;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          name = _ref[_i];
          this[name + 'Key'] = void 0;
        }
        this.linked = new directives.api.utils.Linked(scope, element, attrs, ctrls);
        this.models = void 0;
        this.contentKeys = void 0;
        this.isIconVisibleOnClick = void 0;
        this.firstTime = true;
        this.bigGulp = directives.api.utils.AsyncProcessor;
        this.$log.info(self);
        this.$timeout(function() {
          _this.watchOurScope(scope);
          return _this.createChildScopesWindows();
        }, 50);
      }

      WindowsParentModel.prototype.watch = function(scope, name, nameKey) {
        var _this = this;
        return scope.$watch(name, function(newValue, oldValue) {
          var model, _i, _len, _ref, _results;
          if (newValue !== oldValue) {
            _this[nameKey] = typeof newValue === 'function' ? newValue() : newValue;
            _ref = _this.windows;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              model = _ref[_i];
              _results.push((function(model) {
                return model.scope[name] = _this[nameKey] === 'self' ? model : model[_this[nameKey]];
              })(model));
            }
            return _results;
          }
        }, true);
      };

      WindowsParentModel.prototype.watchModels = function(scope) {
        var _this = this;
        return scope.$watch('models', function(newValue, oldValue) {
          if (_this.didModelsChange(newValue, oldValue)) {
            return _this.bigGulp.handleLargeArray(_this.windows, function(model) {
              return model.destroy();
            }, (function() {}), function() {
              _this.windows = [];
              _this.windowsIndex = 0;
              return _this.createChildScopesWindows();
            });
          }
        }, true);
      };

      WindowsParentModel.prototype.watchDestroy = function(scope) {
        var _this = this;
        return scope.$on("$destroy", function() {
          return _this.bigGulp.handleLargeArray(_this.windows, function(model) {
            return model.destroy();
          }, (function() {}), function() {
            delete _this.windows;
            _this.windows = [];
            return _this.windowsIndex = 0;
          });
        });
      };

      WindowsParentModel.prototype.watchOurScope = function(scope) {
        var name, _i, _len, _ref, _results,
          _this = this;
        _ref = this.scopePropNames;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          name = _ref[_i];
          _results.push((function(name) {
            var nameKey;
            nameKey = name + 'Key';
            _this[nameKey] = typeof scope[name] === 'function' ? scope[name]() : scope[name];
            return _this.watch(scope, name, nameKey);
          })(name));
        }
        return _results;
      };

      WindowsParentModel.prototype.createChildScopesWindows = function() {
        /*
        being that we cannot tell the difference in Key String vs. a normal value string (TemplateUrl)
        we will assume that all scope values are string expressions either pointing to a key (propName) or using
        'self' to point the model as container/object of interest.
        
        This may force redundant information into the model, but this appears to be the most flexible approach.
        */

        var gMap, markersScope, modelsNotDefined,
          _this = this;
        this.isIconVisibleOnClick = true;
        if (angular.isDefined(this.linked.attrs.isiconvisibleonclick)) {
          this.isIconVisibleOnClick = this.linked.scope.isIconVisibleOnClick;
        }
        gMap = this.linked.ctrls[0].getMap();
        markersScope = this.linked.ctrls.length > 1 && (this.linked.ctrls[1] != null) ? this.linked.ctrls[1].getMarkersScope() : void 0;
        modelsNotDefined = angular.isUndefined(this.linked.scope.models);
        if (modelsNotDefined && (markersScope === void 0 || (markersScope.markerModels === void 0 && markersScope.models === void 0))) {
          this.$log.info("No models to create windows from! Need direct models or models derrived from markers!");
          return;
        }
        if (gMap != null) {
          if (this.linked.scope.models != null) {
            this.models = this.linked.scope.models;
            if (this.firstTime) {
              this.watchModels(this.linked.scope);
              this.watchDestroy(this.linked.scope);
            }
            this.setContentKeys(this.linked.scope.models);
            return this.bigGulp.handleLargeArray(this.linked.scope.models, function(model) {
              return _this.createWindow(model, void 0, gMap);
            }, (function() {}), function() {
              return _this.firstTime = false;
            });
          } else {
            this.models = markersScope.models;
            if (this.firstTime) {
              this.watchModels(markersScope);
              this.watchDestroy(markersScope);
            }
            this.setContentKeys(markersScope.models);
            return this.bigGulp.handleLargeArray(markersScope.markerModels, function(mm) {
              return _this.createWindow(mm.model, mm.gMarker, gMap);
            }, (function() {}), function() {
              return _this.firstTime = false;
            });
          }
        }
      };

      WindowsParentModel.prototype.setContentKeys = function(models) {
        if (models.length > 0) {
          return this.contentKeys = Object.keys(models[0]);
        }
      };

      WindowsParentModel.prototype.createWindow = function(model, gMarker, gMap) {
        /*
        Create ChildScope to Mimmick an ng-repeat created scope, must define the below scope
              scope= {
                coords: '=coords',
                show: '&show',
                templateUrl: '=templateurl',
                templateParameter: '=templateparameter',
                isIconVisibleOnClick: '=isiconvisibleonclick',
                closeClick: '&closeclick'
            }
        */

        var childScope, opts, parsedContent,
          _this = this;
        childScope = this.linked.scope.$new(false);
        this.setChildScope(childScope, model);
        childScope.$watch('model', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            return _this.setChildScope(childScope, newValue);
          }
        }, true);
        parsedContent = this.interpolateContent(this.linked.element.html(), model);
        opts = this.createWindowOptions(gMarker, childScope, parsedContent, this.DEFAULTS);
        return this.windows.push(new directives.api.models.child.WindowChildModel(childScope, opts, this.isIconVisibleOnClick, gMap, gMarker, this.$http, this.$templateCache, this.$compile, true));
      };

      WindowsParentModel.prototype.setChildScope = function(childScope, model) {
        var name, _fn, _i, _len, _ref,
          _this = this;
        _ref = this.scopePropNames;
        _fn = function(name) {
          var nameKey, newValue;
          nameKey = name + 'Key';
          newValue = _this[nameKey] === 'self' ? model : model[_this[nameKey]];
          if (newValue !== childScope[name]) {
            return childScope[name] = newValue;
          }
        };
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          name = _ref[_i];
          _fn(name);
        }
        return childScope.model = model;
      };

      WindowsParentModel.prototype.interpolateContent = function(content, model) {
        var exp, interpModel, key, _i, _len, _ref;
        if (this.contentKeys === void 0 || this.contentKeys.length === 0) {
          return;
        }
        exp = this.$interpolate(content);
        interpModel = {};
        _ref = this.contentKeys;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          interpModel[key] = model[key];
        }
        return exp(interpModel);
      };

      return WindowsParentModel;

    })(directives.api.models.parent.IWindowParentModel);
  });

}).call(this);

/*
	- interface for all labels to derrive from
 	- to enforce a minimum set of requirements
 		- attributes
 			- content
 			- anchor
		- implementation needed on watches
*/


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api", function() {
    return this.ILabel = (function(_super) {
      __extends(ILabel, _super);

      function ILabel($timeout) {
        this.link = __bind(this.link, this);
        var self;
        self = this;
        this.restrict = 'ECMA';
        this.replace = true;
        this.template = void 0;
        this.require = void 0;
        this.transclude = true;
        this.priority = -100;
        this.scope = {
          labelContent: '=content',
          labelAnchor: '@anchor',
          labelClass: '@class',
          labelStyle: '=style'
        };
        this.$log = directives.api.utils.Logger;
        this.$timeout = $timeout;
      }

      ILabel.prototype.link = function(scope, element, attrs, ctrl) {
        throw new Exception("Not Implemented!!");
      };

      return ILabel;

    })(oo.BaseObject);
  });

}).call(this);

/*
	- interface for all markers to derrive from
 	- to enforce a minimum set of requirements
 		- attributes
 			- coords
 			- icon
		- implementation needed on watches
*/


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api", function() {
    return this.IMarker = (function(_super) {
      __extends(IMarker, _super);

      function IMarker($timeout) {
        this.link = __bind(this.link, this);
        var self;
        self = this;
        this.$log = directives.api.utils.Logger;
        this.$timeout = $timeout;
        this.restrict = 'ECMA';
        this.require = '^googleMap';
        this.priority = -1;
        this.transclude = true;
        this.replace = true;
        this.scope = {
          coords: '=coords',
          icon: '=icon',
          click: '&click',
          options: '=options',
          events: '=events'
        };
      }

      IMarker.prototype.controller = [
        '$scope', '$element', function($scope, $element) {
          throw new Exception("Not Implemented!!");
        }
      ];

      IMarker.prototype.link = function(scope, element, attrs, ctrl) {
        throw new Exception("Not implemented!!");
      };

      return IMarker;

    })(oo.BaseObject);
  });

}).call(this);

/*
	- interface directive for all window(s) to derrive from
*/


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api", function() {
    return this.IWindow = (function(_super) {
      __extends(IWindow, _super);

      IWindow.include(directives.api.utils.ChildEvents);

      function IWindow($timeout, $compile, $http, $templateCache) {
        var self;
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.$http = $http;
        this.$templateCache = $templateCache;
        this.link = __bind(this.link, this);
        self = this;
        this.restrict = 'ECMA';
        this.template = void 0;
        this.transclude = true;
        this.priority = -100;
        this.require = void 0;
        this.replace = true;
        this.scope = {
          coords: '=coords',
          show: '=show',
          templateUrl: '=templateurl',
          templateParameter: '=templateparameter',
          isIconVisibleOnClick: '=isiconvisibleonclick',
          closeClick: '&closeclick',
          options: '=options'
        };
        this.$log = directives.api.utils.Logger;
      }

      IWindow.prototype.link = function(scope, element, attrs, ctrls) {
        throw new Exception("Not Implemented!!");
      };

      return IWindow;

    })(oo.BaseObject);
  });

}).call(this);

/*
	Basic Directive api for a label. Basic in the sense that this directive contains 1:1 on scope and model. 
	Thus there will be one html element per marker within the directive.
*/


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api", function() {
    return this.Label = (function(_super) {
      __extends(Label, _super);

      function Label($timeout) {
        this.link = __bind(this.link, this);
        var self;
        Label.__super__.constructor.call(this, $timeout);
        self = this;
        this.require = '^marker';
        this.template = '<span class="angular-google-maps-marker-label" ng-transclude></span>';
        this.$log.info(this);
      }

      Label.prototype.link = function(scope, element, attrs, ctrl) {
        var _this = this;
        return this.$timeout(function() {
          var label, markerCtrl;
          markerCtrl = ctrl.getMarkerScope().gMarker;
          if (markerCtrl != null) {
            label = new directives.api.models.child.MarkerLabelChildModel(markerCtrl, scope);
          }
          return scope.$on("$destroy", function() {
            return label.destroy();
          });
        }, directives.api.utils.GmapUtil.defaultDelay + 25);
      };

      return Label;

    })(directives.api.ILabel);
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api", function() {
    return this.Layer = (function(_super) {
      __extends(Layer, _super);

      function Layer($timeout) {
        this.$timeout = $timeout;
        this.link = __bind(this.link, this);
        this.$log = directives.api.utils.Logger;
        this.restrict = "ECMA";
        this.require = "^googleMap";
        this.priority = -1;
        this.transclude = true;
        this.template = '<span class=\"angular-google-map-layer\" ng-transclude></span>';
        this.replace = true;
        this.scope = {
          show: "=show",
          type: "=type",
          namespace: "=namespace",
          options: '=options',
          onCreated: '&oncreated'
        };
      }

      Layer.prototype.link = function(scope, element, attrs, mapCtrl) {
        if (attrs.oncreated != null) {
          return new directives.api.models.parent.LayerParentModel(scope, element, attrs, mapCtrl, this.$timeout, scope.onCreated);
        } else {
          return new directives.api.models.parent.LayerParentModel(scope, element, attrs, mapCtrl, this.$timeout);
        }
      };

      return Layer;

    })(oo.BaseObject);
  });

}).call(this);

/*
	Basic Directive api for a marker. Basic in the sense that this directive contains 1:1 on scope and model. 
	Thus there will be one html element per marker within the directive.
*/


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api", function() {
    return this.Marker = (function(_super) {
      __extends(Marker, _super);

      function Marker($timeout) {
        this.link = __bind(this.link, this);
        var self;
        Marker.__super__.constructor.call(this, $timeout);
        self = this;
        this.template = '<span class="angular-google-map-marker" ng-transclude></span>';
        this.$log.info(this);
      }

      Marker.prototype.controller = [
        '$scope', '$element', function($scope, $element) {
          return {
            getMarkerScope: function() {
              return $scope;
            }
          };
        }
      ];

      Marker.prototype.link = function(scope, element, attrs, ctrl) {
        return new directives.api.models.parent.MarkerParentModel(scope, element, attrs, ctrl, this.$timeout);
      };

      return Marker;

    })(directives.api.IMarker);
  });

}).call(this);

/*
Markers will map icon and coords differently than directibes.api.Marker. This is because Scope and the model marker are
not 1:1 in this setting.
	
	- icon - will be the iconKey to the marker value ie: to get the icon marker[iconKey]
	- coords - will be the coordsKey to the marker value ie: to get the icon marker[coordsKey]

    - watches from IMarker reflect that the look up key for a value has changed and not the actual icon or coords itself
    - actual changes to a model are tracked inside directives.api.model.MarkerModel
*/


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api", function() {
    return this.Markers = (function(_super) {
      __extends(Markers, _super);

      function Markers($timeout) {
        this.link = __bind(this.link, this);
        var self;
        Markers.__super__.constructor.call(this, $timeout);
        self = this;
        this.template = '<span class="angular-google-map-markers" ng-transclude></span>';
        this.scope.models = '=models';
        this.scope.doCluster = '=docluster';
        this.scope.clusterOptions = '=clusteroptions';
        this.scope.fit = '=fit';
        this.scope.labelContent = '=labelcontent';
        this.scope.labelAnchor = '@labelanchor';
        this.scope.labelClass = '@labelclass';
        this.$timeout = $timeout;
        this.$log.info(this);
      }

      Markers.prototype.controller = [
        '$scope', '$element', function($scope, $element) {
          return {
            getMarkersScope: function() {
              return $scope;
            }
          };
        }
      ];

      Markers.prototype.link = function(scope, element, attrs, ctrl) {
        return new directives.api.models.parent.MarkersParentModel(scope, element, attrs, ctrl, this.$timeout);
      };

      return Markers;

    })(directives.api.IMarker);
  });

}).call(this);

/*
	Window directive for GoogleMap Info Windows, where ng-repeat is being used....
	Where Html DOM element is 1:1 on Scope and a Model
*/


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api", function() {
    return this.Window = (function(_super) {
      __extends(Window, _super);

      Window.include(directives.api.utils.GmapUtil);

      function Window($timeout, $compile, $http, $templateCache) {
        this.link = __bind(this.link, this);
        var self;
        Window.__super__.constructor.call(this, $timeout, $compile, $http, $templateCache);
        self = this;
        this.require = ['^googleMap', '^?marker'];
        this.template = '<span class="angular-google-maps-window" ng-transclude></span>';
        this.$log.info(self);
      }

      Window.prototype.link = function(scope, element, attrs, ctrls) {
        var _this = this;
        return this.$timeout(function() {
          var defaults, hasScopeCoords, isIconVisibleOnClick, mapCtrl, markerCtrl, markerScope, opts, window;
          isIconVisibleOnClick = true;
          if (angular.isDefined(attrs.isiconvisibleonclick)) {
            isIconVisibleOnClick = scope.isIconVisibleOnClick;
          }
          mapCtrl = ctrls[0].getMap();
          markerCtrl = ctrls.length > 1 && (ctrls[1] != null) ? ctrls[1].getMarkerScope().gMarker : void 0;
          defaults = scope.options != null ? scope.options : {};
          hasScopeCoords = (scope != null) && (scope.coords != null) && (scope.coords.latitude != null) && (scope.coords.longitude != null);
          opts = hasScopeCoords ? _this.createWindowOptions(markerCtrl, scope, element.html(), defaults) : void 0;
          if (mapCtrl != null) {
            window = new directives.api.models.child.WindowChildModel(scope, opts, isIconVisibleOnClick, mapCtrl, markerCtrl, _this.$http, _this.$templateCache, _this.$compile, element);
          }
          scope.$on("$destroy", function() {
            return window.destroy();
          });
          if (ctrls[1] != null) {
            markerScope = ctrls[1].getMarkerScope();
            markerScope.$watch('coords', function(newValue, oldValue) {
              if (newValue == null) {
                return window.hideWindow();
              }
            });
            markerScope.$watch('coords.latitude', function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return window.getLatestPosition();
              }
            });
          }
          if ((_this.onChildCreation != null) && (window != null)) {
            return _this.onChildCreation(window);
          }
        }, directives.api.utils.GmapUtil.defaultDelay + 25);
      };

      return Window;

    })(directives.api.IWindow);
  });

}).call(this);

/*
	Windows directive where many windows map to the models property
*/


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ngGmapModule("directives.api", function() {
    return this.Windows = (function(_super) {
      __extends(Windows, _super);

      function Windows($timeout, $compile, $http, $templateCache, $interpolate) {
        this.link = __bind(this.link, this);
        var self;
        Windows.__super__.constructor.call(this, $timeout, $compile, $http, $templateCache);
        self = this;
        this.$interpolate = $interpolate;
        this.require = ['^googleMap', '^?markers'];
        this.template = '<span class="angular-google-maps-windows" ng-transclude></span>';
        this.scope.models = '=models';
        this.$log.info(self);
      }

      Windows.prototype.link = function(scope, element, attrs, ctrls) {
        return new directives.api.models.parent.WindowsParentModel(scope, element, attrs, ctrls, this.$timeout, this.$compile, this.$http, this.$templateCache, this.$interpolate);
      };

      return Windows;

    })(directives.api.IWindow);
  });

}).call(this);

/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
Nick Baugh - https://github.com/niftylettuce
*/


(function() {
  angular.module("google-maps").directive("googleMap", [
    "$log", "$timeout", function($log, $timeout) {
      "use strict";
      var DEFAULTS, isTrue;
      isTrue = function(val) {
        return angular.isDefined(val) && val !== null && val === true || val === "1" || val === "y" || val === "true";
      };
      directives.api.utils.Logger.logger = $log;
      DEFAULTS = {
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      return {
        self: this,
        restrict: "ECMA",
        transclude: true,
        replace: false,
        template: "<div class=\"angular-google-map\"><div class=\"angular-google-map-container\"></div><div ng-transclude style=\"display: none\"></div></div>",
        scope: {
          center: "=center",
          zoom: "=zoom",
          dragging: "=dragging",
          refresh: "&refresh",
          windows: "=windows",
          options: "=options",
          events: "=events",
          styles: "=styles",
          bounds: "=bounds"
        },
        controller: [
          "$scope", function($scope) {
            return {
              getMap: function() {
                return $scope.map;
              }
            };
          }
        ],
        /*
        @param scope
        @param element
        @param attrs
        */

        link: function(scope, element, attrs) {
          var dragging, el, eventName, getEventHandler, opts, settingCenterFromScope, type, _m,
            _this = this;
          if (!angular.isDefined(scope.center) || (!angular.isDefined(scope.center.latitude) || !angular.isDefined(scope.center.longitude))) {
            $log.error("angular-google-maps: could not find a valid center property");
            return;
          }
          if (!angular.isDefined(scope.zoom)) {
            $log.error("angular-google-maps: map zoom property not set");
            return;
          }
          el = angular.element(element);
          el.addClass("angular-google-map");
          opts = {
            options: {}
          };
          if (attrs.options) {
            opts.options = scope.options;
          }
          if (attrs.styles) {
            opts.styles = scope.styles;
          }
          if (attrs.type) {
            type = attrs.type.toUpperCase();
            if (google.maps.MapTypeId.hasOwnProperty(type)) {
              opts.mapTypeId = google.maps.MapTypeId[attrs.type.toUpperCase()];
            } else {
              $log.error("angular-google-maps: invalid map type \"" + attrs.type + "\"");
            }
          }
          _m = new google.maps.Map(el.find("div")[1], angular.extend({}, DEFAULTS, opts, {
            center: new google.maps.LatLng(scope.center.latitude, scope.center.longitude),
            draggable: isTrue(attrs.draggable),
            zoom: scope.zoom,
            bounds: scope.bounds
          }));
          dragging = false;
          google.maps.event.addListener(_m, "dragstart", function() {
            dragging = true;
            return _.defer(function() {
              return scope.$apply(function(s) {
                if (s.dragging != null) {
                  return s.dragging = dragging;
                }
              });
            });
          });
          google.maps.event.addListener(_m, "dragend", function() {
            dragging = false;
            return _.defer(function() {
              return scope.$apply(function(s) {
                if (s.dragging != null) {
                  return s.dragging = dragging;
                }
              });
            });
          });
          google.maps.event.addListener(_m, "drag", function() {
            var c;
            c = _m.center;
            return _.defer(function() {
              return scope.$apply(function(s) {
                s.center.latitude = c.lat();
                return s.center.longitude = c.lng();
              });
            });
          });
          google.maps.event.addListener(_m, "zoom_changed", function() {
            if (scope.zoom !== _m.zoom) {
              return _.defer(function() {
                return scope.$apply(function(s) {
                  return s.zoom = _m.zoom;
                });
              });
            }
          });
          settingCenterFromScope = false;
          google.maps.event.addListener(_m, "center_changed", function() {
            var c;
            c = _m.center;
            if (settingCenterFromScope) {
              return;
            }
            return _.defer(function() {
              return scope.$apply(function(s) {
                if (!_m.dragging) {
                  if (s.center.latitude !== c.lat()) {
                    s.center.latitude = c.lat();
                  }
                  if (s.center.longitude !== c.lng()) {
                    return s.center.longitude = c.lng();
                  }
                }
              });
            });
          });
          google.maps.event.addListener(_m, "idle", function() {
            var b, ne, sw;
            b = _m.getBounds();
            ne = b.getNorthEast();
            sw = b.getSouthWest();
            return _.defer(function() {
              return scope.$apply(function(s) {
                if (s.bounds !== null && s.bounds !== undefined && s.bounds !== void 0) {
                  s.bounds.northeast = {
                    latitude: ne.lat(),
                    longitude: ne.lng()
                  };
                  return s.bounds.southwest = {
                    latitude: sw.lat(),
                    longitude: sw.lng()
                  };
                }
              });
            });
          });
          if (angular.isDefined(scope.events) && scope.events !== null && angular.isObject(scope.events)) {
            getEventHandler = function(eventName) {
              return function() {
                return scope.events[eventName].apply(scope, [_m, eventName, arguments]);
              };
            };
            for (eventName in scope.events) {
              if (scope.events.hasOwnProperty(eventName) && angular.isFunction(scope.events[eventName])) {
                google.maps.event.addListener(_m, eventName, getEventHandler(eventName));
              }
            }
          }
          scope.map = _m;
          google.maps.event.trigger(_m, "resize");
          if (!angular.isUndefined(scope.refresh())) {
            scope.$watch("refresh()", function(newValue, oldValue) {
              var coords;
              if (newValue && !oldValue) {
                coords = new google.maps.LatLng(newValue.latitude, newValue.longitude);
                if (isTrue(attrs.pan)) {
                  return _m.panTo(coords);
                } else {
                  return _m.setCenter(coords);
                }
              }
            });
          }
          scope.$watch("center", (function(newValue, oldValue) {
            var coords;
            if (newValue === oldValue) {
              return;
            }
            settingCenterFromScope = true;
            if (!dragging) {
              if ((newValue.latitude == null) || (newValue.longitude == null)) {
                $log.error("Invalid center for newVa;ue: " + (JSON.stringify(newValue)));
              }
              coords = new google.maps.LatLng(newValue.latitude, newValue.longitude);
              if (isTrue(attrs.pan)) {
                _m.panTo(coords);
              } else {
                _m.setCenter(coords);
              }
            }
            return settingCenterFromScope = false;
          }), true);
          scope.$watch("zoom", function(newValue, oldValue) {
            if (newValue === oldValue) {
              return;
            }
            return _m.setZoom(newValue);
          });
          scope.$watch("bounds", function(newValue, oldValue) {
            var bounds, ne, sw;
            if (newValue === oldValue) {
              return;
            }
            if ((newValue.northeast.latitude == null) || (newValue.northeast.longitude == null) || (newValue.southwest.latitude == null) || (newValue.southwest.longitude == null)) {
              $log.error("Invalid map bounds for new value: " + (JSON.stringify(newValue)));
              return;
            }
            ne = new google.maps.LatLng(newValue.northeast.latitude, newValue.northeast.longitude);
            sw = new google.maps.LatLng(newValue.southwest.latitude, newValue.southwest.longitude);
            bounds = new google.maps.LatLngBounds(sw, ne);
            return _m.fitBounds(bounds);
          });
          scope.$watch("options", function(newValue, oldValue) {
            if (!_.isEqual(newValue, oldValue)) {
              opts.options = newValue;
              if (_m != null) {
                return _m.setOptions(opts);
              }
            }
          }, true);
          return scope.$watch("styles", function(newValue, oldValue) {
            if (!_.isEqual(newValue, oldValue)) {
              opts.styles = newValue;
              if (_m != null) {
                return _m.setOptions(opts);
              }
            }
          }, true);
        }
      };
    }
  ]);

}).call(this);

/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
*/


/*
Map marker directive

This directive is used to create a marker on an existing map.
This directive creates a new scope.

{attribute coords required}  object containing latitude and longitude properties
{attribute icon optional}    string url to image used for marker icon
{attribute animate optional} if set to false, the marker won't be animated (on by default)
*/


(function() {
  angular.module("google-maps").directive("marker", [
    "$timeout", function($timeout) {
      return new directives.api.Marker($timeout);
    }
  ]);

}).call(this);

/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
*/


/*
Map marker directive

This directive is used to create a marker on an existing map.
This directive creates a new scope.

{attribute coords required}  object containing latitude and longitude properties
{attribute icon optional}    string url to image used for marker icon
{attribute animate optional} if set to false, the marker won't be animated (on by default)
*/


(function() {
  angular.module("google-maps").directive("markers", [
    "$timeout", function($timeout) {
      return new directives.api.Markers($timeout);
    }
  ]);

}).call(this);

/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors Bruno Queiroz, creativelikeadog@gmail.com
*/


/*
Marker label directive

This directive is used to create a marker label on an existing map.

{attribute content required}  content of the label
{attribute anchor required}    string that contains the x and y point position of the label
{attribute class optional} class to DOM object
{attribute style optional} style for the label
*/


(function() {
  angular.module("google-maps").directive("markerLabel", [
    "$log", "$timeout", function($log, $timeout) {
      return new directives.api.Label($timeout);
    }
  ]);

}).call(this);

/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
*/


(function() {
  angular.module("google-maps").directive("polygon", [
    "$log", "$timeout", function($log, $timeout) {
      var DEFAULTS, convertPathPoints, extendMapBounds, isTrue, validatePathPoints;
      validatePathPoints = function(path) {
        var i;
        i = 0;
        while (i < path.length) {
          if (angular.isUndefined(path[i].latitude) || angular.isUndefined(path[i].longitude)) {
            return false;
          }
          i++;
        }
        return true;
      };
      convertPathPoints = function(path) {
        var i, result;
        result = new google.maps.MVCArray();
        i = 0;
        while (i < path.length) {
          result.push(new google.maps.LatLng(path[i].latitude, path[i].longitude));
          i++;
        }
        return result;
      };
      extendMapBounds = function(map, points) {
        var bounds, i;
        bounds = new google.maps.LatLngBounds();
        i = 0;
        while (i < points.length) {
          bounds.extend(points.getAt(i));
          i++;
        }
        return map.fitBounds(bounds);
      };
      /*
      Check if a value is true
      */

      isTrue = function(val) {
        return angular.isDefined(val) && val !== null && val === true || val === "1" || val === "y" || val === "true";
      };
      "use strict";
      DEFAULTS = {};
      return {
        restrict: "ECA",
        require: "^googleMap",
        replace: true,
        scope: {
          path: "=path",
          stroke: "=stroke",
          clickable: "=",
          draggable: "=",
          editable: "=",
          geodesic: "=",
          icons: "=icons",
          visible: "="
        },
        link: function(scope, element, attrs, mapCtrl) {
          if (angular.isUndefined(scope.path) || scope.path === null || scope.path.length < 2 || !validatePathPoints(scope.path)) {
            $log.error("polyline: no valid path attribute found");
            return;
          }
          return $timeout(function() {
            var map, opts, pathInsertAtListener, pathPoints, pathRemoveAtListener, pathSetAtListener, polyPath, polyline;
            map = mapCtrl.getMap();
            pathPoints = convertPathPoints(scope.path);
            opts = angular.extend({}, DEFAULTS, {
              map: map,
              path: pathPoints,
              strokeColor: scope.stroke && scope.stroke.color,
              strokeOpacity: scope.stroke && scope.stroke.opacity,
              strokeWeight: scope.stroke && scope.stroke.weight
            });
            angular.forEach({
              clickable: true,
              draggable: false,
              editable: false,
              geodesic: false,
              visible: true
            }, function(defaultValue, key) {
              if (angular.isUndefined(scope[key]) || scope[key] === null) {
                return opts[key] = defaultValue;
              } else {
                return opts[key] = scope[key];
              }
            });
            polyline = new google.maps.Polyline(opts);
            if (isTrue(attrs.fit)) {
              extendMapBounds(map, pathPoints);
            }
            if (angular.isDefined(scope.editable)) {
              scope.$watch("editable", function(newValue, oldValue) {
                return polyline.setEditable(newValue);
              });
            }
            if (angular.isDefined(scope.draggable)) {
              scope.$watch("draggable", function(newValue, oldValue) {
                return polyline.setDraggable(newValue);
              });
            }
            if (angular.isDefined(scope.visible)) {
              scope.$watch("visible", function(newValue, oldValue) {
                return polyline.setVisible(newValue);
              });
            }
            pathSetAtListener = void 0;
            pathInsertAtListener = void 0;
            pathRemoveAtListener = void 0;
            polyPath = polyline.getPath();
            pathSetAtListener = google.maps.event.addListener(polyPath, "set_at", function(index) {
              var value;
              value = polyPath.getAt(index);
              if (!value) {
                return;
              }
              if (!value.lng || !value.lat) {
                return;
              }
              scope.path[index].latitude = value.lat();
              scope.path[index].longitude = value.lng();
              return scope.$apply();
            });
            pathInsertAtListener = google.maps.event.addListener(polyPath, "insert_at", function(index) {
              var value;
              value = polyPath.getAt(index);
              if (!value) {
                return;
              }
              if (!value.lng || !value.lat) {
                return;
              }
              scope.path.splice(index, 0, {
                latitude: value.lat(),
                longitude: value.lng()
              });
              return scope.$apply();
            });
            pathRemoveAtListener = google.maps.event.addListener(polyPath, "remove_at", function(index) {
              scope.path.splice(index, 1);
              return scope.$apply();
            });
            scope.$watch("path", (function(newArray) {
              var i, l, newLength, newValue, oldArray, oldLength, oldValue;
              oldArray = polyline.getPath();
              if (newArray !== oldArray) {
                if (newArray) {
                  polyline.setMap(map);
                  i = 0;
                  oldLength = oldArray.getLength();
                  newLength = newArray.length;
                  l = Math.min(oldLength, newLength);
                  while (i < l) {
                    oldValue = oldArray.getAt(i);
                    newValue = newArray[i];
                    if ((oldValue.lat() !== newValue.latitude) || (oldValue.lng() !== newValue.longitude)) {
                      oldArray.setAt(i, new google.maps.LatLng(newValue.latitude, newValue.longitude));
                    }
                    i++;
                  }
                  while (i < newLength) {
                    newValue = newArray[i];
                    oldArray.push(new google.maps.LatLng(newValue.latitude, newValue.longitude));
                    i++;
                  }
                  while (i < oldLength) {
                    oldArray.pop();
                    i++;
                  }
                  if (isTrue(attrs.fit)) {
                    return extendMapBounds(map, oldArray);
                  }
                } else {
                  return polyline.setMap(null);
                }
              }
            }), true);
            return scope.$on("$destroy", function() {
              polyline.setMap(null);
              pathSetAtListener();
              pathSetAtListener = null;
              pathInsertAtListener();
              pathInsertAtListener = null;
              pathRemoveAtListener();
              return pathRemoveAtListener = null;
            });
          });
        }
      };
    }
  ]);

}).call(this);

/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
*/


(function() {
  angular.module("google-maps").directive("polyline", [
    "$log", "$timeout", "array-sync", function($log, $timeout, arraySync) {
      var DEFAULTS, convertPathPoints, extendMapBounds, isTrue, validatePathPoints;
      validatePathPoints = function(path) {
        var i;
        i = 0;
        while (i < path.length) {
          if (angular.isUndefined(path[i].latitude) || angular.isUndefined(path[i].longitude)) {
            return false;
          }
          i++;
        }
        return true;
      };
      convertPathPoints = function(path) {
        var i, result;
        result = new google.maps.MVCArray();
        i = 0;
        while (i < path.length) {
          result.push(new google.maps.LatLng(path[i].latitude, path[i].longitude));
          i++;
        }
        return result;
      };
      extendMapBounds = function(map, points) {
        var bounds, i;
        bounds = new google.maps.LatLngBounds();
        i = 0;
        while (i < points.length) {
          bounds.extend(points.getAt(i));
          i++;
        }
        return map.fitBounds(bounds);
      };
      /*
      Check if a value is true
      */

      isTrue = function(val) {
        return angular.isDefined(val) && val !== null && val === true || val === "1" || val === "y" || val === "true";
      };
      "use strict";
      DEFAULTS = {};
      return {
        restrict: "ECA",
        replace: true,
        require: "^googleMap",
        scope: {
          path: "=path",
          stroke: "=stroke",
          clickable: "=",
          draggable: "=",
          editable: "=",
          geodesic: "=",
          icons: "=icons",
          visible: "="
        },
        link: function(scope, element, attrs, mapCtrl) {
          if (angular.isUndefined(scope.path) || scope.path === null || scope.path.length < 2 || !validatePathPoints(scope.path)) {
            $log.error("polyline: no valid path attribute found");
            return;
          }
          return $timeout(function() {
            var arraySyncer, buildOpts, map, polyline;
            buildOpts = function(pathPoints) {
              var opts;
              opts = angular.extend({}, DEFAULTS, {
                map: map,
                path: pathPoints,
                strokeColor: scope.stroke && scope.stroke.color,
                strokeOpacity: scope.stroke && scope.stroke.opacity,
                strokeWeight: scope.stroke && scope.stroke.weight
              });
              angular.forEach({
                clickable: true,
                draggable: false,
                editable: false,
                geodesic: false,
                visible: true
              }, function(defaultValue, key) {
                if (angular.isUndefined(scope[key]) || scope[key] === null) {
                  return opts[key] = defaultValue;
                } else {
                  return opts[key] = scope[key];
                }
              });
              return opts;
            };
            map = mapCtrl.getMap();
            polyline = new google.maps.Polyline(buildOpts(convertPathPoints(scope.path)));
            if (isTrue(attrs.fit)) {
              extendMapBounds(map, pathPoints);
            }
            if (angular.isDefined(scope.editable)) {
              scope.$watch("editable", function(newValue, oldValue) {
                return polyline.setEditable(newValue);
              });
            }
            if (angular.isDefined(scope.draggable)) {
              scope.$watch("draggable", function(newValue, oldValue) {
                return polyline.setDraggable(newValue);
              });
            }
            if (angular.isDefined(scope.visible)) {
              scope.$watch("visible", function(newValue, oldValue) {
                return polyline.setVisible(newValue);
              });
            }
            if (angular.isDefined(scope.geodesic)) {
              scope.$watch("geodesic", function(newValue, oldValue) {
                return polyline.setOptions(buildOpts(polyline.getPath()));
              });
            }
            if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.weight)) {
              scope.$watch("stroke.weight", function(newValue, oldValue) {
                return polyline.setOptions(buildOpts(polyline.getPath()));
              });
            }
            if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.color)) {
              scope.$watch("stroke.color", function(newValue, oldValue) {
                return polyline.setOptions(buildOpts(polyline.getPath()));
              });
            }
            arraySyncer = arraySync(polyline.getPath(), scope, "path");
            return scope.$on("$destroy", function() {
              polyline.setMap(null);
              if (arraySyncer) {
                arraySyncer();
                return arraySyncer = null;
              }
            });
          });
        }
      };
    }
  ]);

}).call(this);

/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
*/


/*
Map info window directive

This directive is used to create an info window on an existing map.
This directive creates a new scope.

{attribute coords required}  object containing latitude and longitude properties
{attribute show optional}    map will show when this expression returns true
*/


(function() {
  angular.module("google-maps").directive("window", [
    "$timeout", "$compile", "$http", "$templateCache", function($timeout, $compile, $http, $templateCache) {
      return new directives.api.Window($timeout, $compile, $http, $templateCache);
    }
  ]);

}).call(this);

/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
*/


/*
Map info window directive

This directive is used to create an info window on an existing map.
This directive creates a new scope.

{attribute coords required}  object containing latitude and longitude properties
{attribute show optional}    map will show when this expression returns true
*/


(function() {
  angular.module("google-maps").directive("windows", [
    "$timeout", "$compile", "$http", "$templateCache", "$interpolate", function($timeout, $compile, $http, $templateCache, $interpolate) {
      return new directives.api.Windows($timeout, $compile, $http, $templateCache, $interpolate);
    }
  ]);

}).call(this);

/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors:
- Nicolas Laplante https://plus.google.com/108189012221374960701
- Nicholas McCready - https://twitter.com/nmccready
*/


/*
Map Layer directive

This directive is used to create any type of Layer from the google maps sdk.
This directive creates a new scope.

{attribute show optional}  true (default) shows the trafficlayer otherwise it is hidden
*/


(function() {
  angular.module("google-maps").directive("layer", [
    "$timeout", function($timeout) {
      return new directives.api.Layer($timeout);
    }
  ]);

}).call(this);
;/**
 * @name MarkerClustererPlus for Google Maps V3
 * @version 2.1.1 [November 4, 2013]
 * @author Gary Little
 * @fileoverview
 * The library creates and manages per-zoom-level clusters for large amounts of markers.
 * <p>
 * This is an enhanced V3 implementation of the
 * <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/"
 * >V2 MarkerClusterer</a> by Xiaoxi Wu. It is based on the
 * <a href="http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/"
 * >V3 MarkerClusterer</a> port by Luke Mahe. MarkerClustererPlus was created by Gary Little.
 * <p>
 * v2.0 release: MarkerClustererPlus v2.0 is backward compatible with MarkerClusterer v1.0. It
 *  adds support for the <code>ignoreHidden</code>, <code>title</code>, <code>batchSizeIE</code>,
 *  and <code>calculator</code> properties as well as support for four more events. It also allows
 *  greater control over the styling of the text that appears on the cluster marker. The
 *  documentation has been significantly improved and the overall code has been simplified and
 *  polished. Very large numbers of markers can now be managed without causing Javascript timeout
 *  errors on Internet Explorer. Note that the name of the <code>clusterclick</code> event has been
 *  deprecated. The new name is <code>click</code>, so please change your application code now.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * @name ClusterIconStyle
 * @class This class represents the object for values in the <code>styles</code> array passed
 *  to the {@link MarkerClusterer} constructor. The element in this array that is used to
 *  style the cluster icon is determined by calling the <code>calculator</code> function.
 *
 * @property {string} url The URL of the cluster icon image file. Required.
 * @property {number} height The display height (in pixels) of the cluster icon. Required.
 * @property {number} width The display width (in pixels) of the cluster icon. Required.
 * @property {Array} [anchorText] The position (in pixels) from the center of the cluster icon to
 *  where the text label is to be centered and drawn. The format is <code>[yoffset, xoffset]</code>
 *  where <code>yoffset</code> increases as you go down from center and <code>xoffset</code>
 *  increases to the right of center. The default is <code>[0, 0]</code>.
 * @property {Array} [anchorIcon] The anchor position (in pixels) of the cluster icon. This is the
 *  spot on the cluster icon that is to be aligned with the cluster position. The format is
 *  <code>[yoffset, xoffset]</code> where <code>yoffset</code> increases as you go down and
 *  <code>xoffset</code> increases to the right of the top-left corner of the icon. The default
 *  anchor position is the center of the cluster icon.
 * @property {string} [textColor="black"] The color of the label text shown on the
 *  cluster icon.
 * @property {number} [textSize=11] The size (in pixels) of the label text shown on the
 *  cluster icon.
 * @property {string} [textDecoration="none"] The value of the CSS <code>text-decoration</code>
 *  property for the label text shown on the cluster icon.
 * @property {string} [fontWeight="bold"] The value of the CSS <code>font-weight</code>
 *  property for the label text shown on the cluster icon.
 * @property {string} [fontStyle="normal"] The value of the CSS <code>font-style</code>
 *  property for the label text shown on the cluster icon.
 * @property {string} [fontFamily="Arial,sans-serif"] The value of the CSS <code>font-family</code>
 *  property for the label text shown on the cluster icon.
 * @property {string} [backgroundPosition="0 0"] The position of the cluster icon image
 *  within the image defined by <code>url</code>. The format is <code>"xpos ypos"</code>
 *  (the same format as for the CSS <code>background-position</code> property). You must set
 *  this property appropriately when the image defined by <code>url</code> represents a sprite
 *  containing multiple images. Note that the position <i>must</i> be specified in px units.
 */
/**
 * @name ClusterIconInfo
 * @class This class is an object containing general information about a cluster icon. This is
 *  the object that a <code>calculator</code> function returns.
 *
 * @property {string} text The text of the label to be shown on the cluster icon.
 * @property {number} index The index plus 1 of the element in the <code>styles</code>
 *  array to be used to style the cluster icon.
 * @property {string} title The tooltip to display when the mouse moves over the cluster icon.
 *  If this value is <code>undefined</code> or <code>""</code>, <code>title</code> is set to the
 *  value of the <code>title</code> property passed to the MarkerClusterer.
 */
/**
 * A cluster icon.
 *
 * @constructor
 * @extends google.maps.OverlayView
 * @param {Cluster} cluster The cluster with which the icon is to be associated.
 * @param {Array} [styles] An array of {@link ClusterIconStyle} defining the cluster icons
 *  to use for various cluster sizes.
 * @private
 */
function ClusterIcon(cluster, styles) {
    cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);

    this.cluster_ = cluster;
    this.className_ = cluster.getMarkerClusterer().getClusterClass();
    this.styles_ = styles;
    this.center_ = null;
    this.div_ = null;
    this.sums_ = null;
    this.visible_ = false;

    this.setMap(cluster.getMap()); // Note: this causes onAdd to be called
}


/**
 * Adds the icon to the DOM.
 */
ClusterIcon.prototype.onAdd = function () {
    var cClusterIcon = this;
    var cMouseDownInCluster;
    var cDraggingMapByCluster;

    this.div_ = document.createElement("div");
    this.div_.className = this.className_;
    if (this.visible_) {
        this.show();
    }

    this.getPanes().overlayMouseTarget.appendChild(this.div_);

    // Fix for Issue 157
    this.boundsChangedListener_ = google.maps.event.addListener(this.getMap(), "bounds_changed", function () {
        cDraggingMapByCluster = cMouseDownInCluster;
    });

    google.maps.event.addDomListener(this.div_, "mousedown", function () {
        cMouseDownInCluster = true;
        cDraggingMapByCluster = false;
    });

    google.maps.event.addDomListener(this.div_, "click", function (e) {
        cMouseDownInCluster = false;
        if (!cDraggingMapByCluster) {
            var theBounds;
            var mz;
            var mc = cClusterIcon.cluster_.getMarkerClusterer();
            /**
             * This event is fired when a cluster marker is clicked.
             * @name MarkerClusterer#click
             * @param {Cluster} c The cluster that was clicked.
             * @event
             */
            google.maps.event.trigger(mc, "click", cClusterIcon.cluster_);
            google.maps.event.trigger(mc, "clusterclick", cClusterIcon.cluster_); // deprecated name

            // The default click handler follows. Disable it by setting
            // the zoomOnClick property to false.
            if (mc.getZoomOnClick()) {
                // Zoom into the cluster.
                mz = mc.getMaxZoom();
                theBounds = cClusterIcon.cluster_.getBounds();
                mc.getMap().fitBounds(theBounds);
                // There is a fix for Issue 170 here:
                setTimeout(function () {
                    mc.getMap().fitBounds(theBounds);
                    // Don't zoom beyond the max zoom level
                    if (mz !== null && (mc.getMap().getZoom() > mz)) {
                        mc.getMap().setZoom(mz + 1);
                    }
                }, 100);
            }

            // Prevent event propagation to the map:
            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            }
        }
    });

    google.maps.event.addDomListener(this.div_, "mouseover", function () {
        var mc = cClusterIcon.cluster_.getMarkerClusterer();
        /**
         * This event is fired when the mouse moves over a cluster marker.
         * @name MarkerClusterer#mouseover
         * @param {Cluster} c The cluster that the mouse moved over.
         * @event
         */
        google.maps.event.trigger(mc, "mouseover", cClusterIcon.cluster_);
    });

    google.maps.event.addDomListener(this.div_, "mouseout", function () {
        var mc = cClusterIcon.cluster_.getMarkerClusterer();
        /**
         * This event is fired when the mouse moves out of a cluster marker.
         * @name MarkerClusterer#mouseout
         * @param {Cluster} c The cluster that the mouse moved out of.
         * @event
         */
        google.maps.event.trigger(mc, "mouseout", cClusterIcon.cluster_);
    });
};


/**
 * Removes the icon from the DOM.
 */
ClusterIcon.prototype.onRemove = function () {
    if (this.div_ && this.div_.parentNode) {
        this.hide();
        google.maps.event.removeListener(this.boundsChangedListener_);
        google.maps.event.clearInstanceListeners(this.div_);
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};


/**
 * Draws the icon.
 */
ClusterIcon.prototype.draw = function () {
    if (this.visible_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.top = pos.y + "px";
        this.div_.style.left = pos.x + "px";
    }
};


/**
 * Hides the icon.
 */
ClusterIcon.prototype.hide = function () {
    if (this.div_) {
        this.div_.style.display = "none";
    }
    this.visible_ = false;
};


/**
 * Positions and shows the icon.
 */
ClusterIcon.prototype.show = function () {
    if (this.div_) {
        var img = "";
        // NOTE: values must be specified in px units
        var bp = this.backgroundPosition_.split(" ");
        var spriteH = parseInt(bp[0].trim(), 10);
        var spriteV = parseInt(bp[1].trim(), 10);
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(pos);
        img = "<img src='" + this.url_ + "' style='position: absolute; top: " + spriteV + "px; left: " + spriteH + "px; ";
        if (!this.cluster_.getMarkerClusterer().enableRetinaIcons_) {
            img += "clip: rect(" + (-1 * spriteV) + "px, " + ((-1 * spriteH) + this.width_) + "px, " +
                    ((-1 * spriteV) + this.height_) + "px, " + (-1 * spriteH) + "px);";
        }
        img += "'>";
        this.div_.innerHTML = img + "<div style='" +
                "position: absolute;" +
                "top: " + this.anchorText_[0] + "px;" +
                "left: " + this.anchorText_[1] + "px;" +
                "color: " + this.textColor_ + ";" +
                "font-size: " + this.textSize_ + "px;" +
                "font-family: " + this.fontFamily_ + ";" +
                "font-weight: " + this.fontWeight_ + ";" +
                "font-style: " + this.fontStyle_ + ";" +
                "text-decoration: " + this.textDecoration_ + ";" +
                "text-align: center;" +
                "width: " + this.width_ + "px;" +
                "line-height:" + this.height_ + "px;" +
                "'>" + this.sums_.text + "</div>";
        if (typeof this.sums_.title === "undefined" || this.sums_.title === "") {
            this.div_.title = this.cluster_.getMarkerClusterer().getTitle();
        } else {
            this.div_.title = this.sums_.title;
        }
        this.div_.style.display = "";
    }
    this.visible_ = true;
};


/**
 * Sets the icon styles to the appropriate element in the styles array.
 *
 * @param {ClusterIconInfo} sums The icon label text and styles index.
 */
ClusterIcon.prototype.useStyle = function (sums) {
    this.sums_ = sums;
    var index = Math.max(0, sums.index - 1);
    index = Math.min(this.styles_.length - 1, index);
    var style = this.styles_[index];
    this.url_ = style.url;
    this.height_ = style.height;
    this.width_ = style.width;
    this.anchorText_ = style.anchorText || [0, 0];
    this.anchorIcon_ = style.anchorIcon || [parseInt(this.height_ / 2, 10), parseInt(this.width_ / 2, 10)];
    this.textColor_ = style.textColor || "black";
    this.textSize_ = style.textSize || 11;
    this.textDecoration_ = style.textDecoration || "none";
    this.fontWeight_ = style.fontWeight || "bold";
    this.fontStyle_ = style.fontStyle || "normal";
    this.fontFamily_ = style.fontFamily || "Arial,sans-serif";
    this.backgroundPosition_ = style.backgroundPosition || "0 0";
};


/**
 * Sets the position at which to center the icon.
 *
 * @param {google.maps.LatLng} center The latlng to set as the center.
 */
ClusterIcon.prototype.setCenter = function (center) {
    this.center_ = center;
};


/**
 * Creates the cssText style parameter based on the position of the icon.
 *
 * @param {google.maps.Point} pos The position of the icon.
 * @return {string} The CSS style text.
 */
ClusterIcon.prototype.createCss = function (pos) {
    var style = [];
    style.push("cursor: pointer;");
    style.push("position: absolute; top: " + pos.y + "px; left: " + pos.x + "px;");
    style.push("width: " + this.width_ + "px; height: " + this.height_ + "px;");
    return style.join("");
};


/**
 * Returns the position at which to place the DIV depending on the latlng.
 *
 * @param {google.maps.LatLng} latlng The position in latlng.
 * @return {google.maps.Point} The position in pixels.
 */
ClusterIcon.prototype.getPosFromLatLng_ = function (latlng) {
    var pos = this.getProjection().fromLatLngToDivPixel(latlng);
    pos.x -= this.anchorIcon_[1];
    pos.y -= this.anchorIcon_[0];
    pos.x = parseInt(pos.x, 10);
    pos.y = parseInt(pos.y, 10);
    return pos;
};


/**
 * Creates a single cluster that manages a group of proximate markers.
 *  Used internally, do not call this constructor directly.
 * @constructor
 * @param {MarkerClusterer} mc The <code>MarkerClusterer</code> object with which this
 *  cluster is associated.
 */
function Cluster(mc) {
    this.markerClusterer_ = mc;
    this.map_ = mc.getMap();
    this.gridSize_ = mc.getGridSize();
    this.minClusterSize_ = mc.getMinimumClusterSize();
    this.averageCenter_ = mc.getAverageCenter();
    this.markers_ = [];
    this.center_ = null;
    this.bounds_ = null;
    this.clusterIcon_ = new ClusterIcon(this, mc.getStyles());
}


/**
 * Returns the number of markers managed by the cluster. You can call this from
 * a <code>click</code>, <code>mouseover</code>, or <code>mouseout</code> event handler
 * for the <code>MarkerClusterer</code> object.
 *
 * @return {number} The number of markers in the cluster.
 */
Cluster.prototype.getSize = function () {
    return this.markers_.length;
};


/**
 * Returns the array of markers managed by the cluster. You can call this from
 * a <code>click</code>, <code>mouseover</code>, or <code>mouseout</code> event handler
 * for the <code>MarkerClusterer</code> object.
 *
 * @return {Array} The array of markers in the cluster.
 */
Cluster.prototype.getMarkers = function () {
    return this.markers_;
};


/**
 * Returns the center of the cluster. You can call this from
 * a <code>click</code>, <code>mouseover</code>, or <code>mouseout</code> event handler
 * for the <code>MarkerClusterer</code> object.
 *
 * @return {google.maps.LatLng} The center of the cluster.
 */
Cluster.prototype.getCenter = function () {
    return this.center_;
};


/**
 * Returns the map with which the cluster is associated.
 *
 * @return {google.maps.Map} The map.
 * @ignore
 */
Cluster.prototype.getMap = function () {
    return this.map_;
};


/**
 * Returns the <code>MarkerClusterer</code> object with which the cluster is associated.
 *
 * @return {MarkerClusterer} The associated marker clusterer.
 * @ignore
 */
Cluster.prototype.getMarkerClusterer = function () {
    return this.markerClusterer_;
};


/**
 * Returns the bounds of the cluster.
 *
 * @return {google.maps.LatLngBounds} the cluster bounds.
 * @ignore
 */
Cluster.prototype.getBounds = function () {
    var i;
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    var markers = this.getMarkers();
    for (i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].getPosition());
    }
    return bounds;
};


/**
 * Removes the cluster from the map.
 *
 * @ignore
 */
Cluster.prototype.remove = function () {
    this.clusterIcon_.setMap(null);
    this.markers_ = [];
    delete this.markers_;
};


/**
 * Adds a marker to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to be added.
 * @return {boolean} True if the marker was added.
 * @ignore
 */
Cluster.prototype.addMarker = function (marker) {
    var i;
    var mCount;
    var mz;

    if (this.isMarkerAlreadyAdded_(marker)) {
        return false;
    }

    if (!this.center_) {
        this.center_ = marker.getPosition();
        this.calculateBounds_();
    } else {
        if (this.averageCenter_) {
            var l = this.markers_.length + 1;
            var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
            var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
            this.center_ = new google.maps.LatLng(lat, lng);
            this.calculateBounds_();
        }
    }

    marker.isAdded = true;
    this.markers_.push(marker);

    mCount = this.markers_.length;
    mz = this.markerClusterer_.getMaxZoom();
    if (mz !== null && this.map_.getZoom() > mz) {
        // Zoomed in past max zoom, so show the marker.
        if (marker.getMap() !== this.map_) {
            marker.setMap(this.map_);
        }
    } else if (mCount < this.minClusterSize_) {
        // Min cluster size not reached so show the marker.
        if (marker.getMap() !== this.map_) {
            marker.setMap(this.map_);
        }
    } else if (mCount === this.minClusterSize_) {
        // Hide the markers that were showing.
        for (i = 0; i < mCount; i++) {
            this.markers_[i].setMap(null);
        }
    } else {
        marker.setMap(null);
    }

    this.updateIcon_();
    return true;
};


/**
 * Determines if a marker lies within the cluster's bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker lies in the bounds.
 * @ignore
 */
Cluster.prototype.isMarkerInClusterBounds = function (marker) {
    return this.bounds_.contains(marker.getPosition());
};


/**
 * Calculates the extended bounds of the cluster with the grid.
 */
Cluster.prototype.calculateBounds_ = function () {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
};


/**
 * Updates the cluster icon.
 */
Cluster.prototype.updateIcon_ = function () {
    var mCount = this.markers_.length;
    var mz = this.markerClusterer_.getMaxZoom();

    if (mz !== null && this.map_.getZoom() > mz) {
        this.clusterIcon_.hide();
        return;
    }

    if (mCount < this.minClusterSize_) {
        // Min cluster size not yet reached.
        this.clusterIcon_.hide();
        return;
    }

    var numStyles = this.markerClusterer_.getStyles().length;
    var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
    this.clusterIcon_.setCenter(this.center_);
    this.clusterIcon_.useStyle(sums);
    this.clusterIcon_.show();
};


/**
 * Determines if a marker has already been added to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker has already been added.
 */
Cluster.prototype.isMarkerAlreadyAdded_ = function (marker) {
    var i;
    if (this.markers_.indexOf) {
        return this.markers_.indexOf(marker) !== -1;
    } else {
        for (i = 0; i < this.markers_.length; i++) {
            if (marker === this.markers_[i]) {
                return true;
            }
        }
    }
    return false;
};


/**
 * @name MarkerClustererOptions
 * @class This class represents the optional parameter passed to
 *  the {@link MarkerClusterer} constructor.
 * @property {number} [gridSize=60] The grid size of a cluster in pixels. The grid is a square.
 * @property {number} [maxZoom=null] The maximum zoom level at which clustering is enabled or
 *  <code>null</code> if clustering is to be enabled at all zoom levels.
 * @property {boolean} [zoomOnClick=true] Whether to zoom the map when a cluster marker is
 *  clicked. You may want to set this to <code>false</code> if you have installed a handler
 *  for the <code>click</code> event and it deals with zooming on its own.
 * @property {boolean} [averageCenter=false] Whether the position of a cluster marker should be
 *  the average position of all markers in the cluster. If set to <code>false</code>, the
 *  cluster marker is positioned at the location of the first marker added to the cluster.
 * @property {number} [minimumClusterSize=2] The minimum number of markers needed in a cluster
 *  before the markers are hidden and a cluster marker appears.
 * @property {boolean} [ignoreHidden=false] Whether to ignore hidden markers in clusters. You
 *  may want to set this to <code>true</code> to ensure that hidden markers are not included
 *  in the marker count that appears on a cluster marker (this count is the value of the
 *  <code>text</code> property of the result returned by the default <code>calculator</code>).
 *  If set to <code>true</code> and you change the visibility of a marker being clustered, be
 *  sure to also call <code>MarkerClusterer.repaint()</code>.
 * @property {string} [title=""] The tooltip to display when the mouse moves over a cluster
 *  marker. (Alternatively, you can use a custom <code>calculator</code> function to specify a
 *  different tooltip for each cluster marker.)
 * @property {function} [calculator=MarkerClusterer.CALCULATOR] The function used to determine
 *  the text to be displayed on a cluster marker and the index indicating which style to use
 *  for the cluster marker. The input parameters for the function are (1) the array of markers
 *  represented by a cluster marker and (2) the number of cluster icon styles. It returns a
 *  {@link ClusterIconInfo} object. The default <code>calculator</code> returns a
 *  <code>text</code> property which is the number of markers in the cluster and an
 *  <code>index</code> property which is one higher than the lowest integer such that
 *  <code>10^i</code> exceeds the number of markers in the cluster, or the size of the styles
 *  array, whichever is less. The <code>styles</code> array element used has an index of
 *  <code>index</code> minus 1. For example, the default <code>calculator</code> returns a
 *  <code>text</code> value of <code>"125"</code> and an <code>index</code> of <code>3</code>
 *  for a cluster icon representing 125 markers so the element used in the <code>styles</code>
 *  array is <code>2</code>. A <code>calculator</code> may also return a <code>title</code>
 *  property that contains the text of the tooltip to be used for the cluster marker. If
 *   <code>title</code> is not defined, the tooltip is set to the value of the <code>title</code>
 *   property for the MarkerClusterer.
 * @property {string} [clusterClass="cluster"] The name of the CSS class defining general styles
 *  for the cluster markers. Use this class to define CSS styles that are not set up by the code
 *  that processes the <code>styles</code> array.
 * @property {Array} [styles] An array of {@link ClusterIconStyle} elements defining the styles
 *  of the cluster markers to be used. The element to be used to style a given cluster marker
 *  is determined by the function defined by the <code>calculator</code> property.
 *  The default is an array of {@link ClusterIconStyle} elements whose properties are derived
 *  from the values for <code>imagePath</code>, <code>imageExtension</code>, and
 *  <code>imageSizes</code>.
 * @property {boolean} [enableRetinaIcons=false] Whether to allow the use of cluster icons that
 * have sizes that are some multiple (typically double) of their actual display size. Icons such
 * as these look better when viewed on high-resolution monitors such as Apple's Retina displays.
 * Note: if this property is <code>true</code>, sprites cannot be used as cluster icons.
 * @property {number} [batchSize=MarkerClusterer.BATCH_SIZE] Set this property to the
 *  number of markers to be processed in a single batch when using a browser other than
 *  Internet Explorer (for Internet Explorer, use the batchSizeIE property instead).
 * @property {number} [batchSizeIE=MarkerClusterer.BATCH_SIZE_IE] When Internet Explorer is
 *  being used, markers are processed in several batches with a small delay inserted between
 *  each batch in an attempt to avoid Javascript timeout errors. Set this property to the
 *  number of markers to be processed in a single batch; select as high a number as you can
 *  without causing a timeout error in the browser. This number might need to be as low as 100
 *  if 15,000 markers are being managed, for example.
 * @property {string} [imagePath=MarkerClusterer.IMAGE_PATH]
 *  The full URL of the root name of the group of image files to use for cluster icons.
 *  The complete file name is of the form <code>imagePath</code>n.<code>imageExtension</code>
 *  where n is the image file number (1, 2, etc.).
 * @property {string} [imageExtension=MarkerClusterer.IMAGE_EXTENSION]
 *  The extension name for the cluster icon image files (e.g., <code>"png"</code> or
 *  <code>"jpg"</code>).
 * @property {Array} [imageSizes=MarkerClusterer.IMAGE_SIZES]
 *  An array of numbers containing the widths of the group of
 *  <code>imagePath</code>n.<code>imageExtension</code> image files.
 *  (The images are assumed to be square.)
 */
/**
 * Creates a MarkerClusterer object with the options specified in {@link MarkerClustererOptions}.
 * @constructor
 * @extends google.maps.OverlayView
 * @param {google.maps.Map} map The Google map to attach to.
 * @param {Array.<google.maps.Marker>} [opt_markers] The markers to be added to the cluster.
 * @param {MarkerClustererOptions} [opt_options] The optional parameters.
 */
function MarkerClusterer(map, opt_markers, opt_options) {
    // MarkerClusterer implements google.maps.OverlayView interface. We use the
    // extend function to extend MarkerClusterer with google.maps.OverlayView
    // because it might not always be available when the code is defined so we
    // look for it at the last possible moment. If it doesn't exist now then
    // there is no point going ahead :)
    this.extend(MarkerClusterer, google.maps.OverlayView);

    opt_markers = opt_markers || [];
    opt_options = opt_options || {};

    this.markers_ = [];
    this.clusters_ = [];
    this.listeners_ = [];
    this.activeMap_ = null;
    this.ready_ = false;

    this.gridSize_ = opt_options.gridSize || 60;
    this.minClusterSize_ = opt_options.minimumClusterSize || 2;
    this.maxZoom_ = opt_options.maxZoom || null;
    this.styles_ = opt_options.styles || [];
    this.title_ = opt_options.title || "";
    this.zoomOnClick_ = true;
    if (opt_options.zoomOnClick !== undefined) {
        this.zoomOnClick_ = opt_options.zoomOnClick;
    }
    this.averageCenter_ = false;
    if (opt_options.averageCenter !== undefined) {
        this.averageCenter_ = opt_options.averageCenter;
    }
    this.ignoreHidden_ = false;
    if (opt_options.ignoreHidden !== undefined) {
        this.ignoreHidden_ = opt_options.ignoreHidden;
    }
    this.enableRetinaIcons_ = false;
    if (opt_options.enableRetinaIcons !== undefined) {
        this.enableRetinaIcons_ = opt_options.enableRetinaIcons;
    }
    this.imagePath_ = opt_options.imagePath || MarkerClusterer.IMAGE_PATH;
    this.imageExtension_ = opt_options.imageExtension || MarkerClusterer.IMAGE_EXTENSION;
    this.imageSizes_ = opt_options.imageSizes || MarkerClusterer.IMAGE_SIZES;
    this.calculator_ = opt_options.calculator || MarkerClusterer.CALCULATOR;
    this.batchSize_ = opt_options.batchSize || MarkerClusterer.BATCH_SIZE;
    this.batchSizeIE_ = opt_options.batchSizeIE || MarkerClusterer.BATCH_SIZE_IE;
    this.clusterClass_ = opt_options.clusterClass || "cluster";

    if (navigator.userAgent.toLowerCase().indexOf("msie") !== -1) {
        // Try to avoid IE timeout when processing a huge number of markers:
        this.batchSize_ = this.batchSizeIE_;
    }

    this.setupStyles_();

    this.addMarkers(opt_markers, true);
    this.setMap(map); // Note: this causes onAdd to be called
}


/**
 * Implementation of the onAdd interface method.
 * @ignore
 */
MarkerClusterer.prototype.onAdd = function () {
    var cMarkerClusterer = this;

    this.activeMap_ = this.getMap();
    this.ready_ = true;

    this.repaint();

    // Add the map event listeners
    this.listeners_ = [
        google.maps.event.addListener(this.getMap(), "zoom_changed", function () {
            cMarkerClusterer.resetViewport_(false);
            // Workaround for this Google bug: when map is at level 0 and "-" of
            // zoom slider is clicked, a "zoom_changed" event is fired even though
            // the map doesn't zoom out any further. In this situation, no "idle"
            // event is triggered so the cluster markers that have been removed
            // do not get redrawn. Same goes for a zoom in at maxZoom.
            if (this.getZoom() === (this.get("minZoom") || 0) || this.getZoom() === this.get("maxZoom")) {
                google.maps.event.trigger(this, "idle");
            }
        }),
        google.maps.event.addListener(this.getMap(), "idle", function () {
            cMarkerClusterer.redraw_();
        })
    ];
};


/**
 * Implementation of the onRemove interface method.
 * Removes map event listeners and all cluster icons from the DOM.
 * All managed markers are also put back on the map.
 * @ignore
 */
MarkerClusterer.prototype.onRemove = function () {
    var i;

    // Put all the managed markers back on the map:
    for (i = 0; i < this.markers_.length; i++) {
        if (this.markers_[i].getMap() !== this.activeMap_) {
            this.markers_[i].setMap(this.activeMap_);
        }
    }

    // Remove all clusters:
    for (i = 0; i < this.clusters_.length; i++) {
        this.clusters_[i].remove();
    }
    this.clusters_ = [];

    // Remove map event listeners:
    for (i = 0; i < this.listeners_.length; i++) {
        google.maps.event.removeListener(this.listeners_[i]);
    }
    this.listeners_ = [];

    this.activeMap_ = null;
    this.ready_ = false;
};


/**
 * Implementation of the draw interface method.
 * @ignore
 */
MarkerClusterer.prototype.draw = function () {};


/**
 * Sets up the styles object.
 */
MarkerClusterer.prototype.setupStyles_ = function () {
    var i, size;
    if (this.styles_.length > 0) {
        return;
    }

    for (i = 0; i < this.imageSizes_.length; i++) {
        size = this.imageSizes_[i];
        this.styles_.push({
            url: this.imagePath_ + (i + 1) + "." + this.imageExtension_,
            height: size,
            width: size
        });
    }
};


/**
 *  Fits the map to the bounds of the markers managed by the clusterer.
 */
MarkerClusterer.prototype.fitMapToMarkers = function () {
    var i;
    var markers = this.getMarkers();
    var bounds = new google.maps.LatLngBounds();
    for (i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].getPosition());
    }

    this.getMap().fitBounds(bounds);
};


/**
 * Returns the value of the <code>gridSize</code> property.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getGridSize = function () {
    return this.gridSize_;
};


/**
 * Sets the value of the <code>gridSize</code> property.
 *
 * @param {number} gridSize The grid size.
 */
MarkerClusterer.prototype.setGridSize = function (gridSize) {
    this.gridSize_ = gridSize;
};


/**
 * Returns the value of the <code>minimumClusterSize</code> property.
 *
 * @return {number} The minimum cluster size.
 */
MarkerClusterer.prototype.getMinimumClusterSize = function () {
    return this.minClusterSize_;
};

/**
 * Sets the value of the <code>minimumClusterSize</code> property.
 *
 * @param {number} minimumClusterSize The minimum cluster size.
 */
MarkerClusterer.prototype.setMinimumClusterSize = function (minimumClusterSize) {
    this.minClusterSize_ = minimumClusterSize;
};


/**
 *  Returns the value of the <code>maxZoom</code> property.
 *
 *  @return {number} The maximum zoom level.
 */
MarkerClusterer.prototype.getMaxZoom = function () {
    return this.maxZoom_;
};


/**
 *  Sets the value of the <code>maxZoom</code> property.
 *
 *  @param {number} maxZoom The maximum zoom level.
 */
MarkerClusterer.prototype.setMaxZoom = function (maxZoom) {
    this.maxZoom_ = maxZoom;
};


/**
 *  Returns the value of the <code>styles</code> property.
 *
 *  @return {Array} The array of styles defining the cluster markers to be used.
 */
MarkerClusterer.prototype.getStyles = function () {
    return this.styles_;
};


/**
 *  Sets the value of the <code>styles</code> property.
 *
 *  @param {Array.<ClusterIconStyle>} styles The array of styles to use.
 */
MarkerClusterer.prototype.setStyles = function (styles) {
    this.styles_ = styles;
};


/**
 * Returns the value of the <code>title</code> property.
 *
 * @return {string} The content of the title text.
 */
MarkerClusterer.prototype.getTitle = function () {
    return this.title_;
};


/**
 *  Sets the value of the <code>title</code> property.
 *
 *  @param {string} title The value of the title property.
 */
MarkerClusterer.prototype.setTitle = function (title) {
    this.title_ = title;
};


/**
 * Returns the value of the <code>zoomOnClick</code> property.
 *
 * @return {boolean} True if zoomOnClick property is set.
 */
MarkerClusterer.prototype.getZoomOnClick = function () {
    return this.zoomOnClick_;
};


/**
 *  Sets the value of the <code>zoomOnClick</code> property.
 *
 *  @param {boolean} zoomOnClick The value of the zoomOnClick property.
 */
MarkerClusterer.prototype.setZoomOnClick = function (zoomOnClick) {
    this.zoomOnClick_ = zoomOnClick;
};


/**
 * Returns the value of the <code>averageCenter</code> property.
 *
 * @return {boolean} True if averageCenter property is set.
 */
MarkerClusterer.prototype.getAverageCenter = function () {
    return this.averageCenter_;
};


/**
 *  Sets the value of the <code>averageCenter</code> property.
 *
 *  @param {boolean} averageCenter The value of the averageCenter property.
 */
MarkerClusterer.prototype.setAverageCenter = function (averageCenter) {
    this.averageCenter_ = averageCenter;
};


/**
 * Returns the value of the <code>ignoreHidden</code> property.
 *
 * @return {boolean} True if ignoreHidden property is set.
 */
MarkerClusterer.prototype.getIgnoreHidden = function () {
    return this.ignoreHidden_;
};


/**
 *  Sets the value of the <code>ignoreHidden</code> property.
 *
 *  @param {boolean} ignoreHidden The value of the ignoreHidden property.
 */
MarkerClusterer.prototype.setIgnoreHidden = function (ignoreHidden) {
    this.ignoreHidden_ = ignoreHidden;
};


/**
 * Returns the value of the <code>enableRetinaIcons</code> property.
 *
 * @return {boolean} True if enableRetinaIcons property is set.
 */
MarkerClusterer.prototype.getEnableRetinaIcons = function () {
    return this.enableRetinaIcons_;
};


/**
 *  Sets the value of the <code>enableRetinaIcons</code> property.
 *
 *  @param {boolean} enableRetinaIcons The value of the enableRetinaIcons property.
 */
MarkerClusterer.prototype.setEnableRetinaIcons = function (enableRetinaIcons) {
    this.enableRetinaIcons_ = enableRetinaIcons;
};


/**
 * Returns the value of the <code>imageExtension</code> property.
 *
 * @return {string} The value of the imageExtension property.
 */
MarkerClusterer.prototype.getImageExtension = function () {
    return this.imageExtension_;
};


/**
 *  Sets the value of the <code>imageExtension</code> property.
 *
 *  @param {string} imageExtension The value of the imageExtension property.
 */
MarkerClusterer.prototype.setImageExtension = function (imageExtension) {
    this.imageExtension_ = imageExtension;
};


/**
 * Returns the value of the <code>imagePath</code> property.
 *
 * @return {string} The value of the imagePath property.
 */
MarkerClusterer.prototype.getImagePath = function () {
    return this.imagePath_;
};


/**
 *  Sets the value of the <code>imagePath</code> property.
 *
 *  @param {string} imagePath The value of the imagePath property.
 */
MarkerClusterer.prototype.setImagePath = function (imagePath) {
    this.imagePath_ = imagePath;
};


/**
 * Returns the value of the <code>imageSizes</code> property.
 *
 * @return {Array} The value of the imageSizes property.
 */
MarkerClusterer.prototype.getImageSizes = function () {
    return this.imageSizes_;
};


/**
 *  Sets the value of the <code>imageSizes</code> property.
 *
 *  @param {Array} imageSizes The value of the imageSizes property.
 */
MarkerClusterer.prototype.setImageSizes = function (imageSizes) {
    this.imageSizes_ = imageSizes;
};


/**
 * Returns the value of the <code>calculator</code> property.
 *
 * @return {function} the value of the calculator property.
 */
MarkerClusterer.prototype.getCalculator = function () {
    return this.calculator_;
};


/**
 * Sets the value of the <code>calculator</code> property.
 *
 * @param {function(Array.<google.maps.Marker>, number)} calculator The value
 *  of the calculator property.
 */
MarkerClusterer.prototype.setCalculator = function (calculator) {
    this.calculator_ = calculator;
};


/**
 * Returns the value of the <code>batchSizeIE</code> property.
 *
 * @return {number} the value of the batchSizeIE property.
 */
MarkerClusterer.prototype.getBatchSizeIE = function () {
    return this.batchSizeIE_;
};


/**
 * Sets the value of the <code>batchSizeIE</code> property.
 *
 *  @param {number} batchSizeIE The value of the batchSizeIE property.
 */
MarkerClusterer.prototype.setBatchSizeIE = function (batchSizeIE) {
    this.batchSizeIE_ = batchSizeIE;
};


/**
 * Returns the value of the <code>clusterClass</code> property.
 *
 * @return {string} the value of the clusterClass property.
 */
MarkerClusterer.prototype.getClusterClass = function () {
    return this.clusterClass_;
};


/**
 * Sets the value of the <code>clusterClass</code> property.
 *
 *  @param {string} clusterClass The value of the clusterClass property.
 */
MarkerClusterer.prototype.setClusterClass = function (clusterClass) {
    this.clusterClass_ = clusterClass;
};


/**
 *  Returns the array of markers managed by the clusterer.
 *
 *  @return {Array} The array of markers managed by the clusterer.
 */
MarkerClusterer.prototype.getMarkers = function () {
    return this.markers_;
};


/**
 *  Returns the number of markers managed by the clusterer.
 *
 *  @return {number} The number of markers.
 */
MarkerClusterer.prototype.getTotalMarkers = function () {
    return this.markers_.length;
};


/**
 * Returns the current array of clusters formed by the clusterer.
 *
 * @return {Array} The array of clusters formed by the clusterer.
 */
MarkerClusterer.prototype.getClusters = function () {
    return this.clusters_;
};


/**
 * Returns the number of clusters formed by the clusterer.
 *
 * @return {number} The number of clusters formed by the clusterer.
 */
MarkerClusterer.prototype.getTotalClusters = function () {
    return this.clusters_.length;
};


/**
 * Adds a marker to the clusterer. The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 */
MarkerClusterer.prototype.addMarker = function (marker, opt_nodraw) {
    this.pushMarkerTo_(marker);
    if (!opt_nodraw) {
        this.redraw_();
    }
};


/**
 * Adds an array of markers to the clusterer. The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to add.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 */
MarkerClusterer.prototype.addMarkers = function (markers, opt_nodraw) {
    var key;
    for (key in markers) {
        if (markers.hasOwnProperty(key)) {
            this.pushMarkerTo_(markers[key]);
        }
    }
    if (!opt_nodraw) {
        this.redraw_();
    }
};


/**
 * Pushes a marker to the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to add.
 */
MarkerClusterer.prototype.pushMarkerTo_ = function (marker) {
    // If the marker is draggable add a listener so we can update the clusters on the dragend:
    if (marker.getDraggable()) {
        var cMarkerClusterer = this;
        google.maps.event.addListener(marker, "dragend", function () {
            if (cMarkerClusterer.ready_) {
                this.isAdded = false;
                cMarkerClusterer.repaint();
            }
        });
    }
    marker.isAdded = false;
    this.markers_.push(marker);
};


/**
 * Removes a marker from the cluster.  The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>. Returns <code>true</code> if the
 *  marker was removed from the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to remove.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 * @return {boolean} True if the marker was removed from the clusterer.
 */
MarkerClusterer.prototype.removeMarker = function (marker, opt_nodraw) {
    var removed = this.removeMarker_(marker);

    if (!opt_nodraw && removed) {
        this.repaint();
    }

    return removed;
};


/**
 * Removes an array of markers from the cluster. The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>. Returns <code>true</code> if markers
 *  were removed from the clusterer.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to remove.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 * @return {boolean} True if markers were removed from the clusterer.
 */
MarkerClusterer.prototype.removeMarkers = function (markers, opt_nodraw) {
    var i, r;
    var removed = false;

    for (i = 0; i < markers.length; i++) {
        r = this.removeMarker_(markers[i]);
        removed = removed || r;
    }

    if (!opt_nodraw && removed) {
        this.repaint();
    }

    return removed;
};


/**
 * Removes a marker and returns true if removed, false if not.
 *
 * @param {google.maps.Marker} marker The marker to remove
 * @return {boolean} Whether the marker was removed or not
 */
MarkerClusterer.prototype.removeMarker_ = function (marker) {
    var i;
    var index = -1;
    if (this.markers_.indexOf) {
        index = this.markers_.indexOf(marker);
    } else {
        for (i = 0; i < this.markers_.length; i++) {
            if (marker === this.markers_[i]) {
                index = i;
                break;
            }
        }
    }

    if (index === -1) {
        // Marker is not in our list of markers, so do nothing:
        return false;
    }

    marker.setMap(null);
    this.markers_.splice(index, 1); // Remove the marker from the list of managed markers
    return true;
};


/**
 * Removes all clusters and markers from the map and also removes all markers
 *  managed by the clusterer.
 */
MarkerClusterer.prototype.clearMarkers = function () {
    this.resetViewport_(true);
    this.markers_ = [];
};


/**
 * Recalculates and redraws all the marker clusters from scratch.
 *  Call this after changing any properties.
 */
MarkerClusterer.prototype.repaint = function () {
    var oldClusters = this.clusters_.slice();
    this.clusters_ = [];
    this.resetViewport_(false);
    this.redraw_();

    // Remove the old clusters.
    // Do it in a timeout to prevent blinking effect.
    setTimeout(function () {
        var i;
        for (i = 0; i < oldClusters.length; i++) {
            oldClusters[i].remove();
        }
    }, 0);
};


/**
 * Returns the current bounds extended by the grid size.
 *
 * @param {google.maps.LatLngBounds} bounds The bounds to extend.
 * @return {google.maps.LatLngBounds} The extended bounds.
 * @ignore
 */
MarkerClusterer.prototype.getExtendedBounds = function (bounds) {
    var projection = this.getProjection();

    // Turn the bounds into latlng.
    var tr = new google.maps.LatLng(bounds.getNorthEast().lat(),
            bounds.getNorthEast().lng());
    var bl = new google.maps.LatLng(bounds.getSouthWest().lat(),
            bounds.getSouthWest().lng());

    // Convert the points to pixels and the extend out by the grid size.
    var trPix = projection.fromLatLngToDivPixel(tr);
    trPix.x += this.gridSize_;
    trPix.y -= this.gridSize_;

    var blPix = projection.fromLatLngToDivPixel(bl);
    blPix.x -= this.gridSize_;
    blPix.y += this.gridSize_;

    // Convert the pixel points back to LatLng
    var ne = projection.fromDivPixelToLatLng(trPix);
    var sw = projection.fromDivPixelToLatLng(blPix);

    // Extend the bounds to contain the new bounds.
    bounds.extend(ne);
    bounds.extend(sw);

    return bounds;
};


/**
 * Redraws all the clusters.
 */
MarkerClusterer.prototype.redraw_ = function () {
    this.createClusters_(0);
};


/**
 * Removes all clusters from the map. The markers are also removed from the map
 *  if <code>opt_hide</code> is set to <code>true</code>.
 *
 * @param {boolean} [opt_hide] Set to <code>true</code> to also remove the markers
 *  from the map.
 */
MarkerClusterer.prototype.resetViewport_ = function (opt_hide) {
    var i, marker;
    // Remove all the clusters
    for (i = 0; i < this.clusters_.length; i++) {
        this.clusters_[i].remove();
    }
    this.clusters_ = [];

    // Reset the markers to not be added and to be removed from the map.
    for (i = 0; i < this.markers_.length; i++) {
        marker = this.markers_[i];
        marker.isAdded = false;
        if (opt_hide) {
            marker.setMap(null);
        }
    }
};


/**
 * Calculates the distance between two latlng locations in km.
 *
 * @param {google.maps.LatLng} p1 The first lat lng point.
 * @param {google.maps.LatLng} p2 The second lat lng point.
 * @return {number} The distance between the two points in km.
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 */
MarkerClusterer.prototype.distanceBetweenPoints_ = function (p1, p2) {
    var R = 6371; // Radius of the Earth in km
    var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
    var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};


/**
 * Determines if a marker is contained in a bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @param {google.maps.LatLngBounds} bounds The bounds to check against.
 * @return {boolean} True if the marker is in the bounds.
 */
MarkerClusterer.prototype.isMarkerInBounds_ = function (marker, bounds) {
    return bounds.contains(marker.getPosition());
};


/**
 * Adds a marker to a cluster, or creates a new cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 */
MarkerClusterer.prototype.addToClosestCluster_ = function (marker) {
    var i, d, cluster, center;
    var distance = 40000; // Some large number
    var clusterToAddTo = null;
    for (i = 0; i < this.clusters_.length; i++) {
        cluster = this.clusters_[i];
        center = cluster.getCenter();
        if (center) {
            d = this.distanceBetweenPoints_(center, marker.getPosition());
            if (d < distance) {
                distance = d;
                clusterToAddTo = cluster;
            }
        }
    }

    if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
        clusterToAddTo.addMarker(marker);
    } else {
        cluster = new Cluster(this);
        cluster.addMarker(marker);
        this.clusters_.push(cluster);
    }
};


/**
 * Creates the clusters. This is done in batches to avoid timeout errors
 *  in some browsers when there is a huge number of markers.
 *
 * @param {number} iFirst The index of the first marker in the batch of
 *  markers to be added to clusters.
 */
MarkerClusterer.prototype.createClusters_ = function (iFirst) {
    var i, marker;
    var mapBounds;
    var cMarkerClusterer = this;
    if (!this.ready_) {
        return;
    }

    // Cancel previous batch processing if we're working on the first batch:
    if (iFirst === 0) {
        /**
         * This event is fired when the <code>MarkerClusterer</code> begins
         *  clustering markers.
         * @name MarkerClusterer#clusteringbegin
         * @param {MarkerClusterer} mc The MarkerClusterer whose markers are being clustered.
         * @event
         */
        google.maps.event.trigger(this, "clusteringbegin", this);

        if (typeof this.timerRefStatic !== "undefined") {
            clearTimeout(this.timerRefStatic);
            delete this.timerRefStatic;
        }
    }

    // Get our current map view bounds.
    // Create a new bounds object so we don't affect the map.
    //
    // See Comments 9 & 11 on Issue 3651 relating to this workaround for a Google Maps bug:
    if (this.getMap().getZoom() > 3) {
        mapBounds = new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(),
                this.getMap().getBounds().getNorthEast());
    } else {
        mapBounds = new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
    }
    var bounds = this.getExtendedBounds(mapBounds);

    var iLast = Math.min(iFirst + this.batchSize_, this.markers_.length);

    for (i = iFirst; i < iLast; i++) {
        marker = this.markers_[i];
        if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
            if (!this.ignoreHidden_ || (this.ignoreHidden_ && marker.getVisible())) {
                this.addToClosestCluster_(marker);
            }
        }
    }

    if (iLast < this.markers_.length) {
        this.timerRefStatic = setTimeout(function () {
            cMarkerClusterer.createClusters_(iLast);
        }, 0);
    } else {
        delete this.timerRefStatic;

        /**
         * This event is fired when the <code>MarkerClusterer</code> stops
         *  clustering markers.
         * @name MarkerClusterer#clusteringend
         * @param {MarkerClusterer} mc The MarkerClusterer whose markers are being clustered.
         * @event
         */
        google.maps.event.trigger(this, "clusteringend", this);
    }
};


/**
 * Extends an object's prototype by another's.
 *
 * @param {Object} obj1 The object to be extended.
 * @param {Object} obj2 The object to extend with.
 * @return {Object} The new extended object.
 * @ignore
 */
MarkerClusterer.prototype.extend = function (obj1, obj2) {
    return (function (object) {
        var property;
        for (property in object.prototype) {
            this.prototype[property] = object.prototype[property];
        }
        return this;
    }).apply(obj1, [obj2]);
};


/**
 * The default function for determining the label text and style
 * for a cluster icon.
 *
 * @param {Array.<google.maps.Marker>} markers The array of markers represented by the cluster.
 * @param {number} numStyles The number of marker styles available.
 * @return {ClusterIconInfo} The information resource for the cluster.
 * @constant
 * @ignore
 */
MarkerClusterer.CALCULATOR = function (markers, numStyles) {
    var index = 0;
    var title = "";
    var count = markers.length.toString();

    var dv = count;
    while (dv !== 0) {
        dv = parseInt(dv / 10, 10);
        index++;
    }

    index = Math.min(index, numStyles);
    return {
        text: count,
        index: index,
        title: title
    };
};


/**
 * The number of markers to process in one batch.
 *
 * @type {number}
 * @constant
 */
MarkerClusterer.BATCH_SIZE = 2000;


/**
 * The number of markers to process in one batch (IE only).
 *
 * @type {number}
 * @constant
 */
MarkerClusterer.BATCH_SIZE_IE = 500;


/**
 * The default root name for the marker cluster images.
 *
 * @type {string}
 * @constant
 */
MarkerClusterer.IMAGE_PATH = "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclustererplus/images/m";


/**
 * The default extension name for the marker cluster images.
 *
 * @type {string}
 * @constant
 */
MarkerClusterer.IMAGE_EXTENSION = "png";


/**
 * The default array of sizes for the marker cluster images.
 *
 * @type {Array.<number>}
 * @constant
 */
MarkerClusterer.IMAGE_SIZES = [53, 56, 66, 78, 90];

if (typeof String.prototype.trim !== 'function') {
    /**
     * IE hack since trim() doesn't exist in all browsers
     * @return {string} The string with removed whitespace
     */
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

;/**
 * 1.1.9-patched
 * @name MarkerWithLabel for V3
 * @version 1.1.8 [February 26, 2013]
 * @author Gary Little (inspired by code from Marc Ridey of Google).
 * @copyright Copyright 2012 Gary Little [gary at luxcentral.com]
 * @fileoverview MarkerWithLabel extends the Google Maps JavaScript API V3
 *  <code>google.maps.Marker</code> class.
 *  <p>
 *  MarkerWithLabel allows you to define markers with associated labels. As you would expect,
 *  if the marker is draggable, so too will be the label. In addition, a marker with a label
 *  responds to all mouse events in the same manner as a regular marker. It also fires mouse
 *  events and "property changed" events just as a regular marker would. Version 1.1 adds
 *  support for the raiseOnDrag feature introduced in API V3.3.
 *  <p>
 *  If you drag a marker by its label, you can cancel the drag and return the marker to its
 *  original position by pressing the <code>Esc</code> key. This doesn't work if you drag the marker
 *  itself because this feature is not (yet) supported in the <code>google.maps.Marker</code> class.
 */

/*!
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*jslint browser:true */
/*global document,google */

/**
 * @param {Function} childCtor Child class.
 * @param {Function} parentCtor Parent class.
 */
function inherits(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {}
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
  childCtor.prototype.constructor = childCtor;
}

/**
 * This constructor creates a label and associates it with a marker.
 * It is for the private use of the MarkerWithLabel class.
 * @constructor
 * @param {Marker} marker The marker with which the label is to be associated.
 * @param {string} crossURL The URL of the cross image =.
 * @param {string} handCursor The URL of the hand cursor.
 * @private
 */
function MarkerLabel_(marker, crossURL, handCursorURL) {
  this.marker_ = marker;
  this.handCursorURL_ = marker.handCursorURL;

  this.labelDiv_ = document.createElement("div");
  this.labelDiv_.style.cssText = "position: absolute; overflow: hidden;";

  // Set up the DIV for handling mouse events in the label. This DIV forms a transparent veil
  // in the "overlayMouseTarget" pane, a veil that covers just the label. This is done so that
  // events can be captured even if the label is in the shadow of a google.maps.InfoWindow.
  // Code is included here to ensure the veil is always exactly the same size as the label.
  this.eventDiv_ = document.createElement("div");
  this.eventDiv_.style.cssText = this.labelDiv_.style.cssText;

  // This is needed for proper behavior on MSIE:
  this.eventDiv_.setAttribute("onselectstart", "return false;");
  this.eventDiv_.setAttribute("ondragstart", "return false;");

  // Get the DIV for the "X" to be displayed when the marker is raised.
  this.crossDiv_ = MarkerLabel_.getSharedCross(crossURL);
}
inherits(MarkerLabel_, google.maps.OverlayView);

/**
 * Returns the DIV for the cross used when dragging a marker when the
 * raiseOnDrag parameter set to true. One cross is shared with all markers.
 * @param {string} crossURL The URL of the cross image =.
 * @private
 */
MarkerLabel_.getSharedCross = function (crossURL) {
  var div;
  if (typeof MarkerLabel_.getSharedCross.crossDiv === "undefined") {
    div = document.createElement("img");
    div.style.cssText = "position: absolute; z-index: 1000002; display: none;";
    // Hopefully Google never changes the standard "X" attributes:
    div.style.marginLeft = "-8px";
    div.style.marginTop = "-9px";
    div.src = crossURL;
    MarkerLabel_.getSharedCross.crossDiv = div;
  }
  return MarkerLabel_.getSharedCross.crossDiv;
};

/**
 * Adds the DIV representing the label to the DOM. This method is called
 * automatically when the marker's <code>setMap</code> method is called.
 * @private
 */
MarkerLabel_.prototype.onAdd = function () {
  var me = this;
  var cMouseIsDown = false;
  var cDraggingLabel = false;
  var cSavedZIndex;
  var cLatOffset, cLngOffset;
  var cIgnoreClick;
  var cRaiseEnabled;
  var cStartPosition;
  var cStartCenter;
  // Constants:
  var cRaiseOffset = 20;
  var cDraggingCursor = "url(" + this.handCursorURL_ + ")";

  // Stops all processing of an event.
  //
  var cAbortEvent = function (e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.cancelBubble = true;
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  var cStopBounce = function () {
    me.marker_.setAnimation(null);
  };

  this.getPanes().overlayImage.appendChild(this.labelDiv_);
  this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_);
  // One cross is shared with all markers, so only add it once:
  if (typeof MarkerLabel_.getSharedCross.processed === "undefined") {
    this.getPanes().overlayImage.appendChild(this.crossDiv_);
    MarkerLabel_.getSharedCross.processed = true;
  }

  this.listeners_ = [
    google.maps.event.addDomListener(this.eventDiv_, "mouseover", function (e) {
      if (me.marker_.getDraggable() || me.marker_.getClickable()) {
        this.style.cursor = "pointer";
        google.maps.event.trigger(me.marker_, "mouseover", e);
      }
    }),
    google.maps.event.addDomListener(this.eventDiv_, "mouseout", function (e) {
      if ((me.marker_.getDraggable() || me.marker_.getClickable()) && !cDraggingLabel) {
        this.style.cursor = me.marker_.getCursor();
        google.maps.event.trigger(me.marker_, "mouseout", e);
      }
    }),
    google.maps.event.addDomListener(this.eventDiv_, "mousedown", function (e) {
      cDraggingLabel = false;
      if (me.marker_.getDraggable()) {
        cMouseIsDown = true;
        this.style.cursor = cDraggingCursor;
      }
      if (me.marker_.getDraggable() || me.marker_.getClickable()) {
        google.maps.event.trigger(me.marker_, "mousedown", e);
        cAbortEvent(e); // Prevent map pan when starting a drag on a label
      }
    }),
    google.maps.event.addDomListener(document, "mouseup", function (mEvent) {
      var position;
      if (cMouseIsDown) {
        cMouseIsDown = false;
        me.eventDiv_.style.cursor = "pointer";
        google.maps.event.trigger(me.marker_, "mouseup", mEvent);
      }
      if (cDraggingLabel) {
        if (cRaiseEnabled) { // Lower the marker & label
          position = me.getProjection().fromLatLngToDivPixel(me.marker_.getPosition());
          position.y += cRaiseOffset;
          me.marker_.setPosition(me.getProjection().fromDivPixelToLatLng(position));
          // This is not the same bouncing style as when the marker portion is dragged,
          // but it will have to do:
          try { // Will fail if running Google Maps API earlier than V3.3
            me.marker_.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(cStopBounce, 1406);
          } catch (e) {}
        }
        me.crossDiv_.style.display = "none";
        me.marker_.setZIndex(cSavedZIndex);
        cIgnoreClick = true; // Set flag to ignore the click event reported after a label drag
        cDraggingLabel = false;
        mEvent.latLng = me.marker_.getPosition();
        google.maps.event.trigger(me.marker_, "dragend", mEvent);
      }
    }),
    google.maps.event.addListener(me.marker_.getMap(), "mousemove", function (mEvent) {
      var position;
      if (cMouseIsDown) {
        if (cDraggingLabel) {
          // Change the reported location from the mouse position to the marker position:
          mEvent.latLng = new google.maps.LatLng(mEvent.latLng.lat() - cLatOffset, mEvent.latLng.lng() - cLngOffset);
          position = me.getProjection().fromLatLngToDivPixel(mEvent.latLng);
          if (cRaiseEnabled) {
            me.crossDiv_.style.left = position.x + "px";
            me.crossDiv_.style.top = position.y + "px";
            me.crossDiv_.style.display = "";
            position.y -= cRaiseOffset;
          }
          me.marker_.setPosition(me.getProjection().fromDivPixelToLatLng(position));
          if (cRaiseEnabled) { // Don't raise the veil; this hack needed to make MSIE act properly
            me.eventDiv_.style.top = (position.y + cRaiseOffset) + "px";
          }
          google.maps.event.trigger(me.marker_, "drag", mEvent);
        } else {
          // Calculate offsets from the click point to the marker position:
          cLatOffset = mEvent.latLng.lat() - me.marker_.getPosition().lat();
          cLngOffset = mEvent.latLng.lng() - me.marker_.getPosition().lng();
          cSavedZIndex = me.marker_.getZIndex();
          cStartPosition = me.marker_.getPosition();
          cStartCenter = me.marker_.getMap().getCenter();
          cRaiseEnabled = me.marker_.get("raiseOnDrag");
          cDraggingLabel = true;
          me.marker_.setZIndex(1000000); // Moves the marker & label to the foreground during a drag
          mEvent.latLng = me.marker_.getPosition();
          google.maps.event.trigger(me.marker_, "dragstart", mEvent);
        }
      }
    }),
    google.maps.event.addDomListener(document, "keydown", function (e) {
      if (cDraggingLabel) {
        if (e.keyCode === 27) { // Esc key
          cRaiseEnabled = false;
          me.marker_.setPosition(cStartPosition);
          me.marker_.getMap().setCenter(cStartCenter);
          google.maps.event.trigger(document, "mouseup", e);
        }
      }
    }),
    google.maps.event.addDomListener(this.eventDiv_, "click", function (e) {
      if (me.marker_.getDraggable() || me.marker_.getClickable()) {
        if (cIgnoreClick) { // Ignore the click reported when a label drag ends
          cIgnoreClick = false;
        } else {
          google.maps.event.trigger(me.marker_, "click", e);
          cAbortEvent(e); // Prevent click from being passed on to map
        }
      }
    }),
    google.maps.event.addDomListener(this.eventDiv_, "dblclick", function (e) {
      if (me.marker_.getDraggable() || me.marker_.getClickable()) {
        google.maps.event.trigger(me.marker_, "dblclick", e);
        cAbortEvent(e); // Prevent map zoom when double-clicking on a label
      }
    }),
    google.maps.event.addListener(this.marker_, "dragstart", function (mEvent) {
      if (!cDraggingLabel) {
        cRaiseEnabled = this.get("raiseOnDrag");
      }
    }),
    google.maps.event.addListener(this.marker_, "drag", function (mEvent) {
      if (!cDraggingLabel) {
        if (cRaiseEnabled) {
          me.setPosition(cRaiseOffset);
          // During a drag, the marker's z-index is temporarily set to 1000000 to
          // ensure it appears above all other markers. Also set the label's z-index
          // to 1000000 (plus or minus 1 depending on whether the label is supposed
          // to be above or below the marker).
          me.labelDiv_.style.zIndex = 1000000 + (this.get("labelInBackground") ? -1 : +1);
        }
      }
    }),
    google.maps.event.addListener(this.marker_, "dragend", function (mEvent) {
      if (!cDraggingLabel) {
        if (cRaiseEnabled) {
          me.setPosition(0); // Also restores z-index of label
        }
      }
    }),
    google.maps.event.addListener(this.marker_, "position_changed", function () {
      me.setPosition();
    }),
    google.maps.event.addListener(this.marker_, "zindex_changed", function () {
      me.setZIndex();
    }),
    google.maps.event.addListener(this.marker_, "visible_changed", function () {
      me.setVisible();
    }),
    google.maps.event.addListener(this.marker_, "labelvisible_changed", function () {
      me.setVisible();
    }),
    google.maps.event.addListener(this.marker_, "title_changed", function () {
      me.setTitle();
    }),
    google.maps.event.addListener(this.marker_, "labelcontent_changed", function () {
      me.setContent();
    }),
    google.maps.event.addListener(this.marker_, "labelanchor_changed", function () {
      me.setAnchor();
    }),
    google.maps.event.addListener(this.marker_, "labelclass_changed", function () {
      me.setStyles();
    }),
    google.maps.event.addListener(this.marker_, "labelstyle_changed", function () {
      me.setStyles();
    })
  ];
};

/**
 * Removes the DIV for the label from the DOM. It also removes all event handlers.
 * This method is called automatically when the marker's <code>setMap(null)</code>
 * method is called.
 * @private
 */
MarkerLabel_.prototype.onRemove = function () {
  var i;
  if (this.labelDiv_.parentNode !== null)
    this.labelDiv_.parentNode.removeChild(this.labelDiv_);
  if (this.eventDiv_.parentNode !== null)
    this.eventDiv_.parentNode.removeChild(this.eventDiv_);

  // Remove event listeners:
  for (i = 0; i < this.listeners_.length; i++) {
    google.maps.event.removeListener(this.listeners_[i]);
  }
};

/**
 * Draws the label on the map.
 * @private
 */
MarkerLabel_.prototype.draw = function () {
  this.setContent();
  this.setTitle();
  this.setStyles();
};

/**
 * Sets the content of the label.
 * The content can be plain text or an HTML DOM node.
 * @private
 */
MarkerLabel_.prototype.setContent = function () {
  var content = this.marker_.get("labelContent");
  if (typeof content.nodeType === "undefined") {
    this.labelDiv_.innerHTML = content;
    this.eventDiv_.innerHTML = this.labelDiv_.innerHTML;
  } else {
    this.labelDiv_.innerHTML = ""; // Remove current content
    this.labelDiv_.appendChild(content);
    content = content.cloneNode(true);
    this.eventDiv_.appendChild(content);
  }
};

/**
 * Sets the content of the tool tip for the label. It is
 * always set to be the same as for the marker itself.
 * @private
 */
MarkerLabel_.prototype.setTitle = function () {
  this.eventDiv_.title = this.marker_.getTitle() || "";
};

/**
 * Sets the style of the label by setting the style sheet and applying
 * other specific styles requested.
 * @private
 */
MarkerLabel_.prototype.setStyles = function () {
  var i, labelStyle;

  // Apply style values from the style sheet defined in the labelClass parameter:
  this.labelDiv_.className = this.marker_.get("labelClass");
  this.eventDiv_.className = this.labelDiv_.className;

  // Clear existing inline style values:
  this.labelDiv_.style.cssText = "";
  this.eventDiv_.style.cssText = "";
  // Apply style values defined in the labelStyle parameter:
  labelStyle = this.marker_.get("labelStyle");
  for (i in labelStyle) {
    if (labelStyle.hasOwnProperty(i)) {
      this.labelDiv_.style[i] = labelStyle[i];
      this.eventDiv_.style[i] = labelStyle[i];
    }
  }
  this.setMandatoryStyles();
};

/**
 * Sets the mandatory styles to the DIV representing the label as well as to the
 * associated event DIV. This includes setting the DIV position, z-index, and visibility.
 * @private
 */
MarkerLabel_.prototype.setMandatoryStyles = function () {
  this.labelDiv_.style.position = "absolute";
  this.labelDiv_.style.overflow = "hidden";
  // Make sure the opacity setting causes the desired effect on MSIE:
  if (typeof this.labelDiv_.style.opacity !== "undefined" && this.labelDiv_.style.opacity !== "") {
    this.labelDiv_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(opacity=" + (this.labelDiv_.style.opacity * 100) + ")\"";
    this.labelDiv_.style.filter = "alpha(opacity=" + (this.labelDiv_.style.opacity * 100) + ")";
  }

  this.eventDiv_.style.position = this.labelDiv_.style.position;
  this.eventDiv_.style.overflow = this.labelDiv_.style.overflow;
  this.eventDiv_.style.opacity = 0.01; // Don't use 0; DIV won't be clickable on MSIE
  this.eventDiv_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(opacity=1)\"";
  this.eventDiv_.style.filter = "alpha(opacity=1)"; // For MSIE

  this.setAnchor();
  this.setPosition(); // This also updates z-index, if necessary.
  this.setVisible();
};

/**
 * Sets the anchor point of the label.
 * @private
 */
MarkerLabel_.prototype.setAnchor = function () {
  var anchor = this.marker_.get("labelAnchor");
  this.labelDiv_.style.marginLeft = -anchor.x + "px";
  this.labelDiv_.style.marginTop = -anchor.y + "px";
  this.eventDiv_.style.marginLeft = -anchor.x + "px";
  this.eventDiv_.style.marginTop = -anchor.y + "px";
};

/**
 * Sets the position of the label. The z-index is also updated, if necessary.
 * @private
 */
MarkerLabel_.prototype.setPosition = function (yOffset) {
  var position = this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());
  if (typeof yOffset === "undefined") {
    yOffset = 0;
  }
  this.labelDiv_.style.left = Math.round(position.x) + "px";
  this.labelDiv_.style.top = Math.round(position.y - yOffset) + "px";
  this.eventDiv_.style.left = this.labelDiv_.style.left;
  this.eventDiv_.style.top = this.labelDiv_.style.top;

  this.setZIndex();
};

/**
 * Sets the z-index of the label. If the marker's z-index property has not been defined, the z-index
 * of the label is set to the vertical coordinate of the label. This is in keeping with the default
 * stacking order for Google Maps: markers to the south are in front of markers to the north.
 * @private
 */
MarkerLabel_.prototype.setZIndex = function () {
  var zAdjust = (this.marker_.get("labelInBackground") ? -1 : +1);
  if (typeof this.marker_.getZIndex() === "undefined") {
    this.labelDiv_.style.zIndex = parseInt(this.labelDiv_.style.top, 10) + zAdjust;
    this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex;
  } else {
    this.labelDiv_.style.zIndex = this.marker_.getZIndex() + zAdjust;
    this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex;
  }
};

/**
 * Sets the visibility of the label. The label is visible only if the marker itself is
 * visible (i.e., its visible property is true) and the labelVisible property is true.
 * @private
 */
MarkerLabel_.prototype.setVisible = function () {
  if (this.marker_.get("labelVisible")) {
    this.labelDiv_.style.display = this.marker_.getVisible() ? "block" : "none";
  } else {
    this.labelDiv_.style.display = "none";
  }
  this.eventDiv_.style.display = this.labelDiv_.style.display;
};

/**
 * @name MarkerWithLabelOptions
 * @class This class represents the optional parameter passed to the {@link MarkerWithLabel} constructor.
 *  The properties available are the same as for <code>google.maps.Marker</code> with the addition
 *  of the properties listed below. To change any of these additional properties after the labeled
 *  marker has been created, call <code>google.maps.Marker.set(propertyName, propertyValue)</code>.
 *  <p>
 *  When any of these properties changes, a property changed event is fired. The names of these
 *  events are derived from the name of the property and are of the form <code>propertyname_changed</code>.
 *  For example, if the content of the label changes, a <code>labelcontent_changed</code> event
 *  is fired.
 *  <p>
 * @property {string|Node} [labelContent] The content of the label (plain text or an HTML DOM node).
 * @property {Point} [labelAnchor] By default, a label is drawn with its anchor point at (0,0) so
 *  that its top left corner is positioned at the anchor point of the associated marker. Use this
 *  property to change the anchor point of the label. For example, to center a 50px-wide label
 *  beneath a marker, specify a <code>labelAnchor</code> of <code>google.maps.Point(25, 0)</code>.
 *  (Note: x-values increase to the right and y-values increase to the top.)
 * @property {string} [labelClass] The name of the CSS class defining the styles for the label.
 *  Note that style values for <code>position</code>, <code>overflow</code>, <code>top</code>,
 *  <code>left</code>, <code>zIndex</code>, <code>display</code>, <code>marginLeft</code>, and
 *  <code>marginTop</code> are ignored; these styles are for internal use only.
 * @property {Object} [labelStyle] An object literal whose properties define specific CSS
 *  style values to be applied to the label. Style values defined here override those that may
 *  be defined in the <code>labelClass</code> style sheet. If this property is changed after the
 *  label has been created, all previously set styles (except those defined in the style sheet)
 *  are removed from the label before the new style values are applied.
 *  Note that style values for <code>position</code>, <code>overflow</code>, <code>top</code>,
 *  <code>left</code>, <code>zIndex</code>, <code>display</code>, <code>marginLeft</code>, and
 *  <code>marginTop</code> are ignored; these styles are for internal use only.
 * @property {boolean} [labelInBackground] A flag indicating whether a label that overlaps its
 *  associated marker should appear in the background (i.e., in a plane below the marker).
 *  The default is <code>false</code>, which causes the label to appear in the foreground.
 * @property {boolean} [labelVisible] A flag indicating whether the label is to be visible.
 *  The default is <code>true</code>. Note that even if <code>labelVisible</code> is
 *  <code>true</code>, the label will <i>not</i> be visible unless the associated marker is also
 *  visible (i.e., unless the marker's <code>visible</code> property is <code>true</code>).
 * @property {boolean} [raiseOnDrag] A flag indicating whether the label and marker are to be
 *  raised when the marker is dragged. The default is <code>true</code>. If a draggable marker is
 *  being created and a version of Google Maps API earlier than V3.3 is being used, this property
 *  must be set to <code>false</code>.
 * @property {boolean} [optimized] A flag indicating whether rendering is to be optimized for the
 *  marker. <b>Important: The optimized rendering technique is not supported by MarkerWithLabel,
 *  so the value of this parameter is always forced to <code>false</code>.
 * @property {string} [crossImage="http://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png"]
 *  The URL of the cross image to be displayed while dragging a marker.
 * @property {string} [handCursor="http://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur"]
 *  The URL of the cursor to be displayed while dragging a marker.
 */
/**
 * Creates a MarkerWithLabel with the options specified in {@link MarkerWithLabelOptions}.
 * @constructor
 * @param {MarkerWithLabelOptions} [opt_options] The optional parameters.
 */
function MarkerWithLabel(opt_options) {
  opt_options = opt_options || {};
  opt_options.labelContent = opt_options.labelContent || "";
  opt_options.labelAnchor = opt_options.labelAnchor || new google.maps.Point(0, 0);
  opt_options.labelClass = opt_options.labelClass || "markerLabels";
  opt_options.labelStyle = opt_options.labelStyle || {};
  opt_options.labelInBackground = opt_options.labelInBackground || false;
  if (typeof opt_options.labelVisible === "undefined") {
    opt_options.labelVisible = true;
  }
  if (typeof opt_options.raiseOnDrag === "undefined") {
    opt_options.raiseOnDrag = true;
  }
  if (typeof opt_options.clickable === "undefined") {
    opt_options.clickable = true;
  }
  if (typeof opt_options.draggable === "undefined") {
    opt_options.draggable = false;
  }
  if (typeof opt_options.optimized === "undefined") {
    opt_options.optimized = false;
  }
  opt_options.crossImage = opt_options.crossImage || "http" + (document.location.protocol === "https:" ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png";
  opt_options.handCursor = opt_options.handCursor || "http" + (document.location.protocol === "https:" ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur";
  opt_options.optimized = false; // Optimized rendering is not supported

  this.label = new MarkerLabel_(this, opt_options.crossImage, opt_options.handCursor); // Bind the label to the marker

  // Call the parent constructor. It calls Marker.setValues to initialize, so all
  // the new parameters are conveniently saved and can be accessed with get/set.
  // Marker.set triggers a property changed event (called "propertyname_changed")
  // that the marker label listens for in order to react to state changes.
  google.maps.Marker.apply(this, arguments);
}
inherits(MarkerWithLabel, google.maps.Marker);

/**
 * Overrides the standard Marker setMap function.
 * @param {Map} theMap The map to which the marker is to be added.
 * @private
 */
MarkerWithLabel.prototype.setMap = function (theMap) {

  // Call the inherited function...
  google.maps.Marker.prototype.setMap.apply(this, arguments);

  // ... then deal with the label:
  this.label.setMap(theMap);
};
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.L || (g.L = {})).Realtime = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

L.Realtime = L.Layer.extend({
    options: {
        start: true,
        interval: 60 * 1000,
        getFeatureId: function(f) {
            return f.properties.id;
        },
        updateFeature: function(feature, oldLayer) {
            if (!oldLayer) { return; }

            var type = feature.geometry && feature.geometry.type
            var coordinates = feature.geometry && feature.geometry.coordinates
            switch (type) {
                case 'Point':
                    oldLayer.setLatLng(L.GeoJSON.coordsToLatLng(coordinates));
                    break;
                case 'LineString':
                case 'MultiLineString':
                    oldLayer.setLatLngs(L.GeoJSON.coordsToLatLngs(coordinates, type === 'LineString' ? 0 : 1));
                    break;
                case 'Polygon':
                case 'MultiPolygon':
                    oldLayer.setLatLngs(L.GeoJSON.coordsToLatLngs(coordinates, type === 'Polygon' ? 1 : 2));
                    break;
                default:
                    return null;
            }
            return oldLayer;
          },
        logErrors: true,
        cache: false,
        removeMissing: true,
        onlyRunWhenAdded: false
    },

    initialize: function(src, options) {
        L.setOptions(this, options);
        this._container = options.container || L.geoJson(null, options);

        if (typeof(src) === 'function') {
            this._src = src;
        } else {
            this._fetchOptions = src && src.url ? src : {url: src};
            this._src = L.bind(this._defaultSource, this);
        }

        this._features = {};
        this._featureLayers = {};
        this._requestCount = 0;

        if (this.options.start && !this.options.onlyRunWhenAdded) {
            this.start();
        }
    },

    start: function() {
        if (!this._timer) {
            this._timer = setInterval(L.bind(this.update, this),
                this.options.interval);
            this.update();
        }

        return this;
    },

    stop: function() {
        if (this._timer) {
            clearTimeout(this._timer);
            delete this._timer;
        }

        return this;
    },

    isRunning: function() {
        return this._timer;
    },
    
    setUrl: function (url) {
        if (this._fetchOptions) {
            this._fetchOptions.url = url;
            this.update();
        } else {
            throw new Error('Custom sources does not support setting URL.');
        }
    },    

    update: function(geojson) {
        var requestCount = ++this._requestCount,
            checkRequestCount = L.bind(function(cb) {
                return L.bind(function() {
                    if (requestCount === this._requestCount) {
                        return cb.apply(this, arguments);
                    }
                }, this);
            }, this),
            responseHandler,
            errorHandler;

        if (geojson) {
            this._onNewData(false, geojson);
        } else {
            responseHandler = L.bind(function(data) { this._onNewData(this.options.removeMissing, data); }, this);
            errorHandler = L.bind(this._onError, this);

            this._src(checkRequestCount(responseHandler), checkRequestCount(errorHandler));
        }

        return this;
    },

    remove: function(geojson) {
        var features = L.Util.isArray(geojson) ? geojson : geojson.features ? geojson.features : [geojson],
            exit = {},
            i,
            len,
            fId;

        for (i = 0, len = features.length; i < len; i++) {
            fId = this.options.getFeatureId(features[i]);
            this._container.removeLayer(this._featureLayers[fId]);
            exit[fId] = this._features[fId];
            delete this._features[fId];
            delete this._featureLayers[fId];
        }

        this.fire('update', {
            features: this._features,
            enter: {},
            update: {},
            exit: exit
        });

        return this;
    },

    getLayer: function(featureId) {
        return this._featureLayers[featureId];
    },

    getFeature: function(featureId) {
        return this._features[featureId];
    },

    getBounds: function() {
        var container = this._container;
        if (container.getBounds) {
            return container.getBounds();
        }

        throw new Error('Container has no getBounds method');
    },

    onAdd: function(map) {
        map.addLayer(this._container);
        if (this.options.start) {
            this.start();
        }
    },

    onRemove: function(map) {
        if (this.options.onlyRunWhenAdded) {
            this.stop();
        }
        
        map.removeLayer(this._container);
    },

    _onNewData: function(removeMissing, geojson) {
        var layersToRemove = [],
            enter = {},
            update = {},
            exit = {},
            seenFeatures = {},
            i, len, feature;

        var handleData = L.bind(function(geojson) {
            var features = L.Util.isArray(geojson) ? geojson : geojson.features;
            if (features) {
                for (i = 0, len = features.length; i < len; i++) {
                    // only add this if geometry or geometries are set and not null
                    feature = features[i];
                    if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
                        handleData(feature);
                    }
                }
                return;
            }

            var container = this._container;
            var options = this.options;

            if (options.filter && !options.filter(geojson)) { return; }

            var f = L.GeoJSON.asFeature(geojson);
            var fId = options.getFeatureId(f);
            var oldLayer = this._featureLayers[fId];

            var layer = this.options.updateFeature(f, oldLayer);
            if (!layer) {
                layer = L.GeoJSON.geometryToLayer(geojson, options);
                if (!layer) {
                    return;
                }
                layer.defaultOptions = layer.options;
                layer.feature = f;

                if (options.onEachFeature) {
                    options.onEachFeature(geojson, layer);
                }

                if (options.style && layer.setStyle) {
                    layer.setStyle(options.style(geojson));
                }

            }

            layer.feature = f;
            if (container.resetStyle) {
                container.resetStyle(layer);
            }

            if (oldLayer) {
                update[fId] = geojson;
                if (oldLayer != layer) {
                    layersToRemove.push(oldLayer);
                    container.addLayer(layer);
                }
            } else {
                enter[fId] = geojson;
                container.addLayer(layer);
            }

            this._featureLayers[fId] = layer;
            this._features[fId] = seenFeatures[fId] = f;
        }, this);

        handleData(geojson);

        if (removeMissing) {
            exit = this._removeUnknown(seenFeatures);
        }
        for (i = 0; i < layersToRemove.length; i++) {
            this._container.removeLayer(layersToRemove[i]);
        }

        this.fire('update', {
            features: this._features,
            enter: enter,
            update: update,
            exit: exit
        });
    },

    _onError: function(err, msg) {
        if (this.options.logErrors) {
            console.warn(err, msg);
        }

        this.fire('error', {
            error: err,
            message: msg
        });
    },

    _removeUnknown: function(known) {
        var fId,
            removed = {};
        for (fId in this._featureLayers) {
            if (!known[fId]) {
                this._container.removeLayer(this._featureLayers[fId]);
                removed[fId] = this._features[fId];
                delete this._featureLayers[fId];
                delete this._features[fId];
            }
        }

        return removed;
    },

    _bustCache: function(url) {
        return url + L.Util.getParamString({'_': new Date().getTime()}, url);
    },

    _defaultSource: function(responseHandler, errorHandler) {
        var fetchOptions = this._fetchOptions,
            url = fetchOptions.url;
        
        url = this.options.cache ? url : this._bustCache(url);

        fetch(url, fetchOptions)
        .then(function(response) {
            return response.json();
        })
        .then(responseHandler)
        .catch(errorHandler);
    }
});

L.realtime = function(src, options) {
    return new L.Realtime(src, options);
};

module.exports = L.Realtime;

},{}]},{},[1])(1)
});

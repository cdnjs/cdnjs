!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.omnivore=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var xhr = _dereq_('corslite'),
    csv2geojson = _dereq_('csv2geojson'),
    wellknown = _dereq_('wellknown'),
    topojson = _dereq_('topojson'),
    toGeoJSON = _dereq_('togeojson');

module.exports.geojson = geojsonLoad;

module.exports.topojson = topojsonLoad;
module.exports.topojson.parse = topojsonParse;

module.exports.csv = csvLoad;
module.exports.csv.parse = csvParse;

module.exports.gpx = gpxLoad;
module.exports.gpx.parse = gpxParse;

module.exports.kml = kmlLoad;
module.exports.kml.parse = kmlParse;

module.exports.wkt = wktLoad;
module.exports.wkt.parse = wktParse;

function addData(l, d) {
    if ('addData' in l) l.addData(d);
    if ('setGeoJSON' in l) l.setGeoJSON(d);
}

/**
 * Load a [GeoJSON](http://geojson.org/) document into a layer and return the layer.
 *
 * @param {string} url
 * @param {object} options
 * @param {object} customLayer
 * @returns {object}
 */
function geojsonLoad(url, options, customLayer) {
    var layer = customLayer || L.geoJson();
    xhr(url, function(err, response) {
        if (err) return layer.fire('error', { error: err });
        addData(layer, JSON.parse(response.responseText));
        layer.fire('ready');
    });
    return layer;
}

/**
 * Load a [TopoJSON](https://github.com/mbostock/topojson) document into a layer and return the layer.
 *
 * @param {string} url
 * @param {object} options
 * @param {object} customLayer
 * @returns {object}
 */
function topojsonLoad(url, options, customLayer) {
    var layer = customLayer || L.geoJson();
    xhr(url, onload);
    function onload(err, response) {
        if (err) return layer.fire('error', { error: err });
        addData(layer, topojsonParse(response.responseText));
        layer.fire('ready');
    }
    return layer;
}

/**
 * Load a CSV document into a layer and return the layer.
 *
 * @param {string} url
 * @param {object} options
 * @param {object} customLayer
 * @returns {object}
 */
function csvLoad(url, options, customLayer) {
    var layer = customLayer || L.geoJson();
    xhr(url, onload);
    function onload(err, response) {
        var error;
        if (err) return layer.fire('error', { error: err });
        function avoidReady() {
            error = true;
        }
        layer.on('error', avoidReady);
        csvParse(response.responseText, options, layer);
        layer.off('error', avoidReady);
        if (!error) layer.fire('ready');
    }
    return layer;
}

/**
 * Load a GPX document into a layer and return the layer.
 *
 * @param {string} url
 * @param {object} options
 * @param {object} customLayer
 * @returns {object}
 */
function gpxLoad(url, options, customLayer) {
    var layer = customLayer || L.geoJson();
    xhr(url, onload);
    function onload(err, response) {
        var error;
        if (err) return layer.fire('error', { error: err });
        function avoidReady() {
            error = true;
        }
        layer.on('error', avoidReady);
        gpxParse(response.responseXML || response.responseText, options, layer);
        layer.off('error', avoidReady);
        if (!error) layer.fire('ready');
    }
    return layer;
}

/**
 * Load a [KML](https://developers.google.com/kml/documentation/) document into a layer and return the layer.
 *
 * @param {string} url
 * @param {object} options
 * @param {object} customLayer
 * @returns {object}
 */
function kmlLoad(url, options, customLayer) {
    var layer = customLayer || L.geoJson();
    xhr(url, onload);
    function onload(err, response) {
        var error;
        if (err) return layer.fire('error', { error: err });
        function avoidReady() {
            error = true;
        }
        layer.on('error', avoidReady);
        kmlParse(response.responseXML || response.responseText, options, layer);
        layer.off('error', avoidReady);
        if (!error) layer.fire('ready');
    }
    return layer;
}

/**
 * Load a WKT (Well Known Text) string into a layer and return the layer
 *
 * @param {string} url
 * @param {object} options
 * @param {object} customLayer
 * @returns {object}
 */
function wktLoad(url, options, customLayer) {
    var layer = customLayer || L.geoJson();
    xhr(url, onload);
    function onload(err, response) {
        if (err) return layer.fire('error', { error: err });
        wktParse(response.responseText, options, layer);
        layer.fire('ready');
    }
    return layer;
}

function topojsonParse(data) {
    var o = typeof data === 'string' ?
        JSON.parse(data) : data;
    var features = [];
    for (var i in o.objects) {
        var ft = topojson.feature(o, o.objects[i]);
        if (ft.features) features = features.concat(ft.features);
        else features = features.concat([ft]);
    }
    return features;
}

function csvParse(csv, options, layer) {
    layer = layer || L.geoJson();
    options = options || {};
    csv2geojson.csv2geojson(csv, options, onparse);
    function onparse(err, geojson) {
        if (err) return layer.fire('error', { error: err });
        addData(layer, geojson);
    }
    return layer;
}

function gpxParse(gpx, options, layer) {
    var xml = parseXML(gpx);
    if (!xml) return layer.fire('error', {
        error: 'Could not parse GPX'
    });
    layer = layer || L.geoJson();
    var geojson = toGeoJSON.gpx(xml);
    addData(layer, geojson);
    return layer;
}


function kmlParse(gpx, options, layer) {
    var xml = parseXML(gpx);
    if (!xml) return layer.fire('error', {
        error: 'Could not parse GPX'
    });
    layer = layer || L.geoJson();
    var geojson = toGeoJSON.kml(xml);
    addData(layer, geojson);
    return layer;
}

function wktParse(wkt, options, layer) {
    layer = layer || L.geoJson();
    var geojson = wellknown(wkt);
    addData(layer, geojson);
    return layer;
}

function parseXML(str) {
    if (typeof str === 'string') {
        return (new DOMParser()).parseFromString(str, 'text/xml');
    } else {
        return str;
    }
}

},{"corslite":5,"csv2geojson":6,"togeojson":9,"topojson":10,"wellknown":41}],2:[function(_dereq_,module,exports){

},{}],3:[function(_dereq_,module,exports){
module.exports=_dereq_(2)
},{}],4:[function(_dereq_,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],5:[function(_dereq_,module,exports){
function xhr(url, callback, cors) {
    var sent = false;

    if (typeof window.XMLHttpRequest === 'undefined') {
        return callback(Error('Browser not supported'));
    }

    if (typeof cors === 'undefined') {
        var m = url.match(/^\s*https?:\/\/[^\/]*/);
        cors = m && (m[0] !== location.protocol + '//' + location.domain +
                (location.port ? ':' + location.port : ''));
    }

    var x;

    function isSuccessful(status) {
        return status >= 200 && status < 300 || status === 304;
    }

    if (cors && (
        // IE7-9 Quirks & Compatibility
        typeof window.XDomainRequest === 'object' ||
        // IE9 Standards mode
        typeof window.XDomainRequest === 'function'
    )) {
        // IE8-10
        x = new window.XDomainRequest();

        // Ensure callback is never called synchronously, i.e., before
        // x.send() returns (this has been observed in the wild).
        // See https://github.com/mapbox/mapbox.js/issues/472
        var original = callback;
        callback = function() {
            if (sent) {
                original.apply(this, arguments);
            } else {
                var that = this, args = arguments;
                setTimeout(function() {
                    original.apply(that, args);
                }, 0);
            }
        }
    } else {
        x = new window.XMLHttpRequest();
    }

    function loaded() {
        if (
            // XDomainRequest
            x.status === undefined ||
            // modern browsers
            isSuccessful(x.status)) callback.call(x, null, x);
        else callback.call(x, x, null);
    }

    // Both `onreadystatechange` and `onload` can fire. `onreadystatechange`
    // has [been supported for longer](http://stackoverflow.com/a/9181508/229001).
    if ('onload' in x) {
        x.onload = loaded;
    } else {
        x.onreadystatechange = function readystate() {
            if (x.readyState === 4) {
                loaded();
            }
        };
    }

    // Call the callback with the XMLHttpRequest object as an error and prevent
    // it from ever being called again by reassigning it to `noop`
    x.onerror = function error(evt) {
        // XDomainRequest provides no evt parameter
        callback.call(this, evt || true, null);
        callback = function() { };
    };

    // IE9 must have onprogress be set to a unique function.
    x.onprogress = function() { };

    x.ontimeout = function(evt) {
        callback.call(this, evt, null);
        callback = function() { };
    };

    x.onabort = function(evt) {
        callback.call(this, evt, null);
        callback = function() { };
    };

    // GET is the only supported HTTP Verb by XDomainRequest and is the
    // only one supported here.
    x.open('GET', url, true);

    // Send the request. Sending data is not supported.
    x.send(null);
    sent = true;

    return x;
}

if (typeof module !== 'undefined') module.exports = xhr;

},{}],6:[function(_dereq_,module,exports){
var dsv = _dereq_('dsv'),
    sexagesimal = _dereq_('sexagesimal');

function isLat(f) { return !!f.match(/(Lat)(itude)?/gi); }
function isLon(f) { return !!f.match(/(L)(on|ng)(gitude)?/i); }

function keyCount(o) {
    return (typeof o == 'object') ? Object.keys(o).length : 0;
}

function autoDelimiter(x) {
    var delimiters = [',', ';', '\t', '|'];
    var results = [];

    delimiters.forEach(function(delimiter) {
        var res = dsv(delimiter).parse(x);
        if (res.length >= 1) {
            var count = keyCount(res[0]);
            for (var i = 0; i < res.length; i++) {
                if (keyCount(res[i]) !== count) return;
            }
            results.push({
                delimiter: delimiter,
                arity: Object.keys(res[0]).length,
            });
        }
    });

    if (results.length) {
        return results.sort(function(a, b) {
            return b.arity - a.arity;
        })[0].delimiter;
    } else {
        return null;
    }
}

function auto(x) {
    var delimiter = autoDelimiter(x);
    if (!delimiter) return null;
    return dsv(delimiter).parse(x);
}

function csv2geojson(x, options, callback) {

    if (!callback) {
        callback = options;
        options = {};
    }

    options.delimiter = options.delimiter || ',';

    var latfield = options.latfield || '',
        lonfield = options.lonfield || '';

    var features = [],
        featurecollection = { type: 'FeatureCollection', features: features };

    if (options.delimiter === 'auto' && typeof x == 'string') {
        options.delimiter = autoDelimiter(x);
        if (!options.delimiter) return callback({
            type: 'Error',
            message: 'Could not autodetect delimiter'
        });
    }

    var parsed = (typeof x == 'string') ? dsv(options.delimiter).parse(x) : x;

    if (!parsed.length) return callback(null, featurecollection);

    if (!latfield || !lonfield) {
        for (var f in parsed[0]) {
            if (!latfield && isLat(f)) latfield = f;
            if (!lonfield && isLon(f)) lonfield = f;
        }
        if (!latfield || !lonfield) {
            var fields = [];
            for (var k in parsed[0]) fields.push(k);
            return callback({
                type: 'Error',
                message: 'Latitude and longitude fields not present',
                data: parsed,
                fields: fields
            });
        }
    }

    var errors = [];

    for (var i = 0; i < parsed.length; i++) {
        if (parsed[i][lonfield] !== undefined &&
            parsed[i][lonfield] !== undefined) {

            var lonk = parsed[i][lonfield],
                latk = parsed[i][latfield],
                lonf, latf,
                a;

            a = sexagesimal(lonk, 'EW');
            if (a) lonk = a;
            a = sexagesimal(latk, 'NS');
            if (a) latk = a;

            lonf = parseFloat(lonk);
            latf = parseFloat(latk);

            if (isNaN(lonf) ||
                isNaN(latf)) {
                errors.push({
                    message: 'A row contained an invalid value for latitude or longitude',
                    row: parsed[i]
                });
            } else {
                if (!options.includeLatLon) {
                    delete parsed[i][lonfield];
                    delete parsed[i][latfield];
                }

                features.push({
                    type: 'Feature',
                    properties: parsed[i],
                    geometry: {
                        type: 'Point',
                        coordinates: [
                            parseFloat(lonf),
                            parseFloat(latf)
                        ]
                    }
                });
            }
        }
    }

    callback(errors.length ? errors: null, featurecollection);
}

function toLine(gj) {
    var features = gj.features;
    var line = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: []
        }
    };
    for (var i = 0; i < features.length; i++) {
        line.geometry.coordinates.push(features[i].geometry.coordinates);
    }
    line.properties = features[0].properties;
    return {
        type: 'FeatureCollection',
        features: [line]
    };
}

function toPolygon(gj) {
    var features = gj.features;
    var poly = {
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [[]]
        }
    };
    for (var i = 0; i < features.length; i++) {
        poly.geometry.coordinates[0].push(features[i].geometry.coordinates);
    }
    poly.properties = features[0].properties;
    return {
        type: 'FeatureCollection',
        features: [poly]
    };
}

module.exports = {
    isLon: isLon,
    isLat: isLat,
    csv: dsv.csv.parse,
    tsv: dsv.tsv.parse,
    dsv: dsv,
    auto: auto,
    csv2geojson: csv2geojson,
    toLine: toLine,
    toPolygon: toPolygon
};

},{"dsv":7,"sexagesimal":8}],7:[function(_dereq_,module,exports){
var fs = _dereq_("fs");

module.exports = new Function("dsv.version = \"0.0.3\";\n\ndsv.tsv = dsv(\"\\t\");\ndsv.csv = dsv(\",\");\n\nfunction dsv(delimiter) {\n  var dsv = {},\n      reFormat = new RegExp(\"[\\\"\" + delimiter + \"\\n]\"),\n      delimiterCode = delimiter.charCodeAt(0);\n\n  dsv.parse = function(text, f) {\n    var o;\n    return dsv.parseRows(text, function(row, i) {\n      if (o) return o(row, i - 1);\n      var a = new Function(\"d\", \"return {\" + row.map(function(name, i) {\n        return JSON.stringify(name) + \": d[\" + i + \"]\";\n      }).join(\",\") + \"}\");\n      o = f ? function(row, i) { return f(a(row), i); } : a;\n    });\n  };\n\n  dsv.parseRows = function(text, f) {\n    var EOL = {}, // sentinel value for end-of-line\n        EOF = {}, // sentinel value for end-of-file\n        rows = [], // output rows\n        N = text.length,\n        I = 0, // current character index\n        n = 0, // the current line number\n        t, // the current token\n        eol; // is the current token followed by EOL?\n\n    function token() {\n      if (I >= N) return EOF; // special case: end of file\n      if (eol) return eol = false, EOL; // special case: end of line\n\n      // special case: quotes\n      var j = I;\n      if (text.charCodeAt(j) === 34) {\n        var i = j;\n        while (i++ < N) {\n          if (text.charCodeAt(i) === 34) {\n            if (text.charCodeAt(i + 1) !== 34) break;\n            ++i;\n          }\n        }\n        I = i + 2;\n        var c = text.charCodeAt(i + 1);\n        if (c === 13) {\n          eol = true;\n          if (text.charCodeAt(i + 2) === 10) ++I;\n        } else if (c === 10) {\n          eol = true;\n        }\n        return text.substring(j + 1, i).replace(/\"\"/g, \"\\\"\");\n      }\n\n      // common case: find next delimiter or newline\n      while (I < N) {\n        var c = text.charCodeAt(I++), k = 1;\n        if (c === 10) eol = true; // \\n\n        else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \\r|\\r\\n\n        else if (c !== delimiterCode) continue;\n        return text.substring(j, I - k);\n      }\n\n      // special case: last token before EOF\n      return text.substring(j);\n    }\n\n    while ((t = token()) !== EOF) {\n      var a = [];\n      while (t !== EOL && t !== EOF) {\n        a.push(t);\n        t = token();\n      }\n      if (f && !(a = f(a, n++))) continue;\n      rows.push(a);\n    }\n\n    return rows;\n  };\n\n  dsv.format = function(rows) {\n    if (Array.isArray(rows[0])) return dsv.formatRows(rows); // deprecated; use formatRows\n    var fieldSet = {}, fields = [];\n\n    // Compute unique fields in order of discovery.\n    rows.forEach(function(row) {\n      for (var field in row) {\n        if (!(field in fieldSet)) {\n          fields.push(fieldSet[field] = field);\n        }\n      }\n    });\n\n    return [fields.map(formatValue).join(delimiter)].concat(rows.map(function(row) {\n      return fields.map(function(field) {\n        return formatValue(row[field]);\n      }).join(delimiter);\n    })).join(\"\\n\");\n  };\n\n  dsv.formatRows = function(rows) {\n    return rows.map(formatRow).join(\"\\n\");\n  };\n\n  function formatRow(row) {\n    return row.map(formatValue).join(delimiter);\n  }\n\n  function formatValue(text) {\n    return reFormat.test(text) ? \"\\\"\" + text.replace(/\\\"/g, \"\\\"\\\"\") + \"\\\"\" : text;\n  }\n\n  return dsv;\n}\n" + ";return dsv")();

},{"fs":2}],8:[function(_dereq_,module,exports){
module.exports = function(x, dims) {
    if (!dims) dims = 'NSEW';
    if (typeof x !== 'string') return null;
    var r = /^([0-9.]+)°? *(?:([0-9.]+)['’′‘] *)?(?:([0-9.]+)(?:''|"|”|″) *)?([NSEW])?/,
        m = x.match(r);
    if (!m) return null;
    else if (m[4] && dims.indexOf(m[4]) === -1) return null;
    else return (((m[1]) ? parseFloat(m[1]) : 0) +
        ((m[2] ? parseFloat(m[2]) / 60 : 0)) +
        ((m[3] ? parseFloat(m[3]) / 3600 : 0))) *
        ((m[4] && m[4] === 'S' || m[4] === 'W') ? -1 : 1);
};

},{}],9:[function(_dereq_,module,exports){
(function (process){
toGeoJSON = (function() {
    'use strict';

    var removeSpace = (/\s*/g),
        trimSpace = (/^\s*|\s*$/g),
        splitSpace = (/\s+/);
    // generate a short, numeric hash of a string
    function okhash(x) {
        if (!x || !x.length) return 0;
        for (var i = 0, h = 0; i < x.length; i++) {
            h = ((h << 5) - h) + x.charCodeAt(i) | 0;
        } return h;
    }
    // all Y children of X
    function get(x, y) { return x.getElementsByTagName(y); }
    function attr(x, y) { return x.getAttribute(y); }
    function attrf(x, y) { return parseFloat(attr(x, y)); }
    // one Y child of X, if any, otherwise null
    function get1(x, y) { var n = get(x, y); return n.length ? n[0] : null; }
    // https://developer.mozilla.org/en-US/docs/Web/API/Node.normalize
    function norm(el) { if (el.normalize) { el.normalize(); } return el; }
    // cast array x into numbers
    function numarray(x) {
        for (var j = 0, o = []; j < x.length; j++) o[j] = parseFloat(x[j]);
        return o;
    }
    function clean(x) {
        var o = {};
        for (var i in x) if (x[i]) o[i] = x[i];
        return o;
    }
    // get the content of a text node, if any
    function nodeVal(x) { if (x) {norm(x);} return x && x.firstChild && x.firstChild.nodeValue; }
    // get one coordinate from a coordinate array, if any
    function coord1(v) { return numarray(v.replace(removeSpace, '').split(',')); }
    // get all coordinates from a coordinate array as [[],[]]
    function coord(v) {
        var coords = v.replace(trimSpace, '').split(splitSpace),
            o = [];
        for (var i = 0; i < coords.length; i++) {
            o.push(coord1(coords[i]));
        }
        return o;
    }
    function coordPair(x) {
        var ll = [attrf(x, 'lon'), attrf(x, 'lat')],
            ele = get1(x, 'ele');
        if (ele) ll.push(parseFloat(nodeVal(ele)));
        return ll;
    }

    // create a new feature collection parent object
    function fc() {
        return {
            type: 'FeatureCollection',
            features: []
        };
    }

    var serializer;
    if (typeof XMLSerializer !== 'undefined') {
        serializer = new XMLSerializer();
    // only require xmldom in a node environment
    } else if (typeof exports === 'object' && typeof process === 'object' && !process.browser) {
        serializer = new (_dereq_('xmldom').XMLSerializer)();
    }
    function xml2str(str) { return serializer.serializeToString(str); }

    var t = {
        kml: function(doc, o) {
            o = o || {};

            var gj = fc(),
                // styleindex keeps track of hashed styles in order to match features
                styleIndex = {},
                // atomic geospatial types supported by KML - MultiGeometry is
                // handled separately
                geotypes = ['Polygon', 'LineString', 'Point', 'Track'],
                // all root placemarks in the file
                placemarks = get(doc, 'Placemark'),
                styles = get(doc, 'Style');

            for (var k = 0; k < styles.length; k++) {
                styleIndex['#' + attr(styles[k], 'id')] = okhash(xml2str(styles[k])).toString(16);
            }
            for (var j = 0; j < placemarks.length; j++) {
                gj.features = gj.features.concat(getPlacemark(placemarks[j]));
            }
            function gxCoord(v) { return numarray(v.split(' ')); }
            function gxCoords(root) {
                var elems = get(root, 'coord', 'gx'), coords = [];
                for (var i = 0; i < elems.length; i++) coords.push(gxCoord(nodeVal(elems[i])));
                return coords;
            }
            function getGeometry(root) {
                var geomNode, geomNodes, i, j, k, geoms = [];
                if (get1(root, 'MultiGeometry')) return getGeometry(get1(root, 'MultiGeometry'));
                if (get1(root, 'MultiTrack')) return getGeometry(get1(root, 'MultiTrack'));
                for (i = 0; i < geotypes.length; i++) {
                    geomNodes = get(root, geotypes[i]);
                    if (geomNodes) {
                        for (j = 0; j < geomNodes.length; j++) {
                            geomNode = geomNodes[j];
                            if (geotypes[i] == 'Point') {
                                geoms.push({
                                    type: 'Point',
                                    coordinates: coord1(nodeVal(get1(geomNode, 'coordinates')))
                                });
                            } else if (geotypes[i] == 'LineString') {
                                geoms.push({
                                    type: 'LineString',
                                    coordinates: coord(nodeVal(get1(geomNode, 'coordinates')))
                                });
                            } else if (geotypes[i] == 'Polygon') {
                                var rings = get(geomNode, 'LinearRing'),
                                    coords = [];
                                for (k = 0; k < rings.length; k++) {
                                    coords.push(coord(nodeVal(get1(rings[k], 'coordinates'))));
                                }
                                geoms.push({
                                    type: 'Polygon',
                                    coordinates: coords
                                });
                            } else if (geotypes[i] == 'Track') {
                                geoms.push({
                                    type: 'LineString',
                                    coordinates: gxCoords(geomNode)
                                });
                            }
                        }
                    }
                }
                return geoms;
            }
            function getPlacemark(root) {
                var geoms = getGeometry(root), i, properties = {},
                    name = nodeVal(get1(root, 'name')),
                    styleUrl = nodeVal(get1(root, 'styleUrl')),
                    description = nodeVal(get1(root, 'description')),
                    timeSpan = get1(root, 'TimeSpan'),
                    extendedData = get1(root, 'ExtendedData');

                if (!geoms.length) return [];
                if (name) properties.name = name;
                if (styleUrl && styleIndex[styleUrl]) {
                    properties.styleUrl = styleUrl;
                    properties.styleHash = styleIndex[styleUrl];
                }
                if (description) properties.description = description;
                if (timeSpan) {
                    var begin = nodeVal(get1(timeSpan, 'begin'));
                    var end = nodeVal(get1(timeSpan, 'end'));
                    properties.timespan = { begin: begin, end: end };
                }
                if (extendedData) {
                    var datas = get(extendedData, 'Data'),
                        simpleDatas = get(extendedData, 'SimpleData');

                    for (i = 0; i < datas.length; i++) {
                        properties[datas[i].getAttribute('name')] = nodeVal(get1(datas[i], 'value'));
                    }
                    for (i = 0; i < simpleDatas.length; i++) {
                        properties[simpleDatas[i].getAttribute('name')] = nodeVal(simpleDatas[i]);
                    }
                }
                return [{
                    type: 'Feature',
                    geometry: (geoms.length === 1) ? geoms[0] : {
                        type: 'GeometryCollection',
                        geometries: geoms
                    },
                    properties: properties
                }];
            }
            return gj;
        },
        gpx: function(doc, o) {
            var i,
                tracks = get(doc, 'trk'),
                routes = get(doc, 'rte'),
                waypoints = get(doc, 'wpt'),
                // a feature collection
                gj = fc();
            for (i = 0; i < tracks.length; i++) {
                gj.features.push(getLinestring(tracks[i], 'trkpt'));
            }
            for (i = 0; i < routes.length; i++) {
                gj.features.push(getLinestring(routes[i], 'rtept'));
            }
            for (i = 0; i < waypoints.length; i++) {
                gj.features.push(getPoint(waypoints[i]));
            }
            function getLinestring(node, pointname) {
                var j, pts = get(node, pointname), line = [];
                for (j = 0; j < pts.length; j++) {
                    line.push(coordPair(pts[j]));
                }
                return {
                    type: 'Feature',
                    properties: getProperties(node),
                    geometry: {
                        type: 'LineString',
                        coordinates: line
                    }
                };
            }
            function getPoint(node) {
                var prop = getProperties(node);
                prop.sym = nodeVal(get1(node, 'sym'));
                return {
                    type: 'Feature',
                    properties: prop,
                    geometry: {
                        type: 'Point',
                        coordinates: coordPair(node)
                    }
                };
            }
            function getProperties(node) {
                var meta = ['name', 'desc', 'author', 'copyright', 'link',
                            'time', 'keywords'],
                    prop = {},
                    k;
                for (k = 0; k < meta.length; k++) {
                    prop[meta[k]] = nodeVal(get1(node, meta[k]));
                }
                return clean(prop);
            }
            return gj;
        }
    };
    return t;
})();

if (typeof module !== 'undefined') module.exports = toGeoJSON;

}).call(this,_dereq_("/Users/tmcw/src/leaflet-omnivore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/tmcw/src/leaflet-omnivore/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":4,"xmldom":3}],10:[function(_dereq_,module,exports){
var topojson = module.exports = _dereq_("./topojson");
topojson.topology = _dereq_("./lib/topojson/topology");
topojson.simplify = _dereq_("./lib/topojson/simplify");
topojson.clockwise = _dereq_("./lib/topojson/clockwise");
topojson.filter = _dereq_("./lib/topojson/filter");
topojson.prune = _dereq_("./lib/topojson/prune");
topojson.bind = _dereq_("./lib/topojson/bind");
topojson.stitch = _dereq_("./lib/topojson/stitch");
topojson.scale = _dereq_("./lib/topojson/scale");

},{"./lib/topojson/bind":11,"./lib/topojson/clockwise":14,"./lib/topojson/filter":18,"./lib/topojson/prune":22,"./lib/topojson/scale":24,"./lib/topojson/simplify":25,"./lib/topojson/stitch":27,"./lib/topojson/topology":28,"./topojson":40}],11:[function(_dereq_,module,exports){
var type = _dereq_("./type"),
    topojson = _dereq_("../../");

module.exports = function(topology, propertiesById) {
  var bind = type({
    geometry: function(geometry) {
      var properties0 = geometry.properties,
          properties1 = propertiesById[geometry.id];
      if (properties1) {
        if (properties0) for (var k in properties1) properties0[k] = properties1[k];
        else for (var k in properties1) { geometry.properties = properties1; break; }
      }
      this.defaults.geometry.call(this, geometry);
    },
    LineString: noop,
    MultiLineString: noop,
    Point: noop,
    MultiPoint: noop,
    Polygon: noop,
    MultiPolygon: noop
  });

  for (var key in topology.objects) {
    bind.object(topology.objects[key]);
  }
};

function noop() {}

},{"../../":10,"./type":39}],12:[function(_dereq_,module,exports){

// Computes the bounding box of the specified hash of GeoJSON objects.
module.exports = function(objects) {
  var x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;

  function boundGeometry(geometry) {
    if (geometry && boundGeometryType.hasOwnProperty(geometry.type)) boundGeometryType[geometry.type](geometry);
  }

  var boundGeometryType = {
    GeometryCollection: function(o) { o.geometries.forEach(boundGeometry); },
    Point: function(o) { boundPoint(o.coordinates); },
    MultiPoint: function(o) { o.coordinates.forEach(boundPoint); },
    LineString: function(o) { boundLine(o.coordinates); },
    MultiLineString: function(o) { o.coordinates.forEach(boundLine); },
    Polygon: function(o) { o.coordinates.forEach(boundLine); },
    MultiPolygon: function(o) { o.coordinates.forEach(boundMultiLine); }
  };

  function boundPoint(coordinates) {
    var x = coordinates[0],
        y = coordinates[1];
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }

  function boundLine(coordinates) {
    coordinates.forEach(boundPoint);
  }

  function boundMultiLine(coordinates) {
    coordinates.forEach(boundLine);
  }

  for (var key in objects) {
    boundGeometry(objects[key]);
  }

  return [x0, y0, x1, y1];
};

},{}],13:[function(_dereq_,module,exports){
exports.name = "cartesian";
exports.formatDistance = formatDistance;
exports.ringArea = ringArea;
exports.absoluteArea = Math.abs;
exports.triangleArea = triangleArea;
exports.distance = distance;

function formatDistance(d) {
  return d.toString();
}

function ringArea(ring) {
  var i = -1,
      n = ring.length,
      a,
      b = ring[n - 1],
      area = 0;

  while (++i < n) {
    a = b;
    b = ring[i];
    area += a[0] * b[1] - a[1] * b[0];
  }

  return area * .5;
}

function triangleArea(triangle) {
  return Math.abs(
    (triangle[0][0] - triangle[2][0]) * (triangle[1][1] - triangle[0][1])
    - (triangle[0][0] - triangle[1][0]) * (triangle[2][1] - triangle[0][1])
  );
}

function distance(x0, y0, x1, y1) {
  var dx = x0 - x1, dy = y0 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

},{}],14:[function(_dereq_,module,exports){
var type = _dereq_("./type"),
    systems = _dereq_("./coordinate-systems"),
    topojson = _dereq_("../../");

module.exports = function(object, options) {
  if (object.type === "Topology") clockwiseTopology(object, options);
  else clockwiseGeometry(object, options);
};

function clockwiseGeometry(object, options) {
  var system = null;

  if (options)
    "coordinate-system" in options && (system = systems[options["coordinate-system"]]);

  var clockwisePolygon = clockwisePolygonSystem(system.ringArea, reverse);

  type({
    LineString: noop,
    MultiLineString: noop,
    Point: noop,
    MultiPoint: noop,
    Polygon: function(polygon) { clockwisePolygon(polygon.coordinates); },
    MultiPolygon: function(multiPolygon) { multiPolygon.coordinates.forEach(clockwisePolygon); }
  }).object(object);

  function reverse(array) { array.reverse(); }
}

function clockwiseTopology(topology, options) {
  var system = null;

  if (options)
    "coordinate-system" in options && (system = systems[options["coordinate-system"]]);

  var clockwisePolygon = clockwisePolygonSystem(ringArea, reverse);

  var clockwise = type({
    LineString: noop,
    MultiLineString: noop,
    Point: noop,
    MultiPoint: noop,
    Polygon: function(polygon) { clockwisePolygon(polygon.arcs); },
    MultiPolygon: function(multiPolygon) { multiPolygon.arcs.forEach(clockwisePolygon); }
  });

  for (var key in topology.objects) {
    clockwise.object(topology.objects[key]);
  }

  function ringArea(ring) {
    return system.ringArea(topojson.feature(topology, {type: "Polygon", arcs: [ring]}).geometry.coordinates[0]);
  }

  // TODO It might be slightly more compact to reverse the arc.
  function reverse(ring) {
    var i = -1, n = ring.length;
    ring.reverse();
    while (++i < n) ring[i] = ~ring[i];
  }
};

function clockwisePolygonSystem(ringArea, reverse) {
  return function(rings) {
    if (!(n = rings.length)) return;
    var n,
        areas = new Array(n),
        max = -Infinity,
        best,
        area,
        t;
    // Find the largest absolute ring area; this should be the exterior ring.
    for (var i = 0; i < n; ++i) {
      var area = Math.abs(areas[i] = ringArea(rings[i]));
      if (area > max) max = area, best = i;
    }
    // Ensure the largest ring appears first.
    if (best) {
      t = rings[best], rings[best] = rings[0], rings[0] = t;
      t = areas[best], areas[best] = areas[0], areas[0] = t;
    }
    if (areas[0] < 0) reverse(rings[0]);
    for (var i = 1; i < n; ++i) {
      if (areas[i] > 0) reverse(rings[i]);
    }
  };
}

function noop() {}

},{"../../":10,"./coordinate-systems":16,"./type":39}],15:[function(_dereq_,module,exports){
// Given a hash of GeoJSON objects and an id function, invokes the id function
// to compute a new id for each object that is a feature. The function is passed
// the feature and is expected to return the new feature id, or null if the
// feature should not have an id.
module.exports = function(objects, id) {
  if (arguments.length < 2) id = function(d) { return d.id; };

  function idObject(object) {
    if (object && idObjectType.hasOwnProperty(object.type)) idObjectType[object.type](object);
  }

  function idFeature(feature) {
    var i = id(feature);
    if (i == null) delete feature.id;
    else feature.id = i;
  }

  var idObjectType = {
    Feature: idFeature,
    FeatureCollection: function(collection) { collection.features.forEach(idFeature); }
  };

  for (var key in objects) {
    idObject(objects[key]);
  }

  return objects;
};

},{}],16:[function(_dereq_,module,exports){
module.exports = {
  cartesian: _dereq_("./cartesian"),
  spherical: _dereq_("./spherical")
};

},{"./cartesian":13,"./spherical":26}],17:[function(_dereq_,module,exports){
// Given a TopoJSON topology in absolute (quantized) coordinates,
// converts to fixed-point delta encoding.
// This is a destructive operation that modifies the given topology!
module.exports = function(topology) {
  var arcs = topology.arcs,
      i = -1,
      n = arcs.length;

  while (++i < n) {
    var arc = arcs[i],
        j = 0,
        m = arc.length,
        point = arc[0],
        x0 = point[0],
        y0 = point[1],
        x1,
        y1;
    while (++j < m) {
      point = arc[j];
      x1 = point[0];
      y1 = point[1];
      arc[j] = [x1 - x0, y1 - y0];
      x0 = x1;
      y0 = y1;
    }
  }

  return topology;
};

},{}],18:[function(_dereq_,module,exports){
var type = _dereq_("./type"),
    prune = _dereq_("./prune"),
    clockwise = _dereq_("./clockwise"),
    systems = _dereq_("./coordinate-systems"),
    topojson = _dereq_("../../");

module.exports = function(topology, options) {
  var system = null,
      forceClockwise = true, // force exterior rings to be clockwise?
      preserveAttached = true, // e.g., remove islands but not small counties
      preserveRing = preserveNone,
      minimumArea;

  if (options)
    "coordinate-system" in options && (system = systems[options["coordinate-system"]]),
    "minimum-area" in options && (minimumArea = +options["minimum-area"]),
    "preserve-attached" in options && (preserveAttached = !!options["preserve-attached"]),
    "force-clockwise" in options && (forceClockwise = !!options["force-clockwise"]);

  if (forceClockwise) clockwise(topology, options); // deprecated; for backwards-compatibility

  if (!(minimumArea > 0)) minimumArea = Number.MIN_VALUE;

  if (preserveAttached) {
    var uniqueRingByArc = {}, // arc index -> index of unique associated ring, or -1 if used by multiple rings
        ringIndex = 0;

    var checkAttachment = type({
      LineString: noop,
      MultiLineString: noop,
      Point: noop,
      MultiPoint: noop,
      MultiPolygon: function(multiPolygon) {
        var arcs = multiPolygon.arcs, i = -1, n = arcs.length;
        while (++i < n) this.polygon(arcs[i]);
      },
      Polygon: function(polygon) {
        this.polygon(polygon.arcs);
      },
      polygon: function(arcs) {
        for (var i = 0, n = arcs.length; i < n; ++i, ++ringIndex) {
          for (var ring = arcs[i], j = 0, m = ring.length; j < m; ++j) {
            var arc = ring[j];
            if (arc < 0) arc = ~arc;
            var uniqueRing = uniqueRingByArc[arc];
            if (uniqueRing >= 0 && uniqueRing !== ringIndex) uniqueRingByArc[arc] = -1;
            else uniqueRingByArc[arc] = ringIndex;
          }
        }
      }
    });

    preserveRing = function(ring) {
      for (var j = 0, m = ring.length; j < m; ++j) {
        var arc = ring[j];
        if (uniqueRingByArc[arc < 0 ? ~arc : arc] < 0) {
          return true;
        }
      }
    };

    for (var key in topology.objects) {
      checkAttachment.object(topology.objects[key]);
    }
  }

  var filter = type({
    LineString: noop, // TODO remove empty lines
    MultiLineString: noop,
    Point: noop,
    MultiPoint: noop,
    Polygon: function(polygon) {
      polygon.arcs = filterPolygon(polygon.arcs);
      if (!polygon.arcs || !polygon.arcs.length) {
        polygon.type = null;
        delete polygon.arcs;
      }
    },
    MultiPolygon: function(multiPolygon) {
      multiPolygon.arcs = multiPolygon.arcs
          .map(filterPolygon)
          .filter(function(polygon) { return polygon && polygon.length; });
      if (!multiPolygon.arcs.length) {
        multiPolygon.type = null;
        delete multiPolygon.arcs;
      }
    },
    GeometryCollection: function(collection) {
      this.defaults.GeometryCollection.call(this, collection);
      collection.geometries = collection.geometries.filter(function(geometry) { return geometry.type != null; });
      if (!collection.geometries.length) {
        collection.type = null;
        delete collection.geometries;
      }
    }
  });

  for (var key in topology.objects) {
    filter.object(topology.objects[key]);
  }

  prune(topology, options);

  function filterPolygon(arcs) {
    return arcs.length && filterExteriorRing(arcs[0]) // if the exterior is small, ignore any holes
        ? [arcs.shift()].concat(arcs.filter(filterInteriorRing))
        : null;
  }

  function filterExteriorRing(ring) {
    return preserveRing(ring) || system.absoluteArea(ringArea(ring)) >= minimumArea;
  }

  function filterInteriorRing(ring) {
    return preserveRing(ring) || system.absoluteArea(-ringArea(ring)) >= minimumArea;
  }

  function ringArea(ring) {
    return system.ringArea(topojson.feature(topology, {type: "Polygon", arcs: [ring]}).geometry.coordinates[0]);
  }
};

function noop() {}

function preserveNone() {
  return false;
}

},{"../../":10,"./clockwise":14,"./coordinate-systems":16,"./prune":22,"./type":39}],19:[function(_dereq_,module,exports){
// Given a hash of GeoJSON objects, replaces Features with geometry objects.
// This is a destructive operation that modifies the input objects!
module.exports = function(objects) {

  function geomifyObject(object) {
    return (object && geomifyObjectType.hasOwnProperty(object.type)
        ? geomifyObjectType[object.type]
        : geomifyGeometry)(object);
  }

  function geomifyFeature(feature) {
    var geometry = feature.geometry;
    if (geometry == null) {
      feature.type = null;
    } else {
      geomifyGeometry(geometry);
      feature.type = geometry.type;
      if (geometry.geometries) feature.geometries = geometry.geometries;
      else if (geometry.coordinates) feature.coordinates = geometry.coordinates;
    }
    delete feature.geometry;
    return feature;
  }

  function geomifyGeometry(geometry) {
    if (!geometry) return {type: null};
    if (geomifyGeometryType.hasOwnProperty(geometry.type)) geomifyGeometryType[geometry.type](geometry);
    return geometry;
  }

  var geomifyObjectType = {
    Feature: geomifyFeature,
    FeatureCollection: function(collection) {
      collection.type = "GeometryCollection";
      collection.geometries = collection.features;
      collection.features.forEach(geomifyFeature);
      delete collection.features;
      return collection;
    }
  };

  var geomifyGeometryType = {
    GeometryCollection: function(o) {
      var geometries = o.geometries, i = -1, n = geometries.length;
      while (++i < n) geometries[i] = geomifyGeometry(geometries[i]);
    },
    MultiPoint: function(o) {
      if (!o.coordinates.length) {
        o.type = null;
        delete o.coordinates;
      } else if (o.coordinates.length < 2) {
        o.type = "Point";
        o.coordinates = o.coordinates[0];
      }
    },
    LineString: function(o) {
      if (!o.coordinates.length) {
        o.type = null;
        delete o.coordinates;
      }
    },
    MultiLineString: function(o) {
      for (var lines = o.coordinates, i = 0, N = 0, n = lines.length; i < n; ++i) {
        var line = lines[i];
        if (line.length) lines[N++] = line;
      }
      if (!N) {
        o.type = null;
        delete o.coordinates;
      } else if (N < 2) {
        o.type = "LineString";
        o.coordinates = lines[0];
      } else {
        o.coordinates.length = N;
      }
    },
    Polygon: function(o) {
      for (var rings = o.coordinates, i = 0, N = 0, n = rings.length; i < n; ++i) {
        var ring = rings[i];
        if (ring.length) rings[N++] = ring;
      }
      if (!N) {
        o.type = null;
        delete o.coordinates;
      } else {
        o.coordinates.length = N;
      }
    },
    MultiPolygon: function(o) {
      for (var polygons = o.coordinates, j = 0, M = 0, m = polygons.length; j < m; ++j) {
        for (var rings = polygons[j], i = 0, N = 0, n = rings.length; i < n; ++i) {
          var ring = rings[i];
          if (ring.length) rings[N++] = ring;
        }
        if (N) {
          rings.length = N;
          polygons[M++] = rings;
        }
      }
      if (!M) {
        o.type = null;
        delete o.coordinates;
      } else if (M < 2) {
        o.type = "Polygon";
        o.coordinates = polygons[0];
      } else {
        polygons.length = M;
      }
    }
  };

  for (var key in objects) {
    objects[key] = geomifyObject(objects[key]);
  }

  return objects;
};

},{}],20:[function(_dereq_,module,exports){
var quantize = _dereq_("./quantize");

module.exports = function(topology, Q0, Q1) {
  if (Q0) {
    if (Q1 === Q0 || !topology.bbox.every(isFinite)) return topology;
    var k = Q1 / Q0,
        q = quantize(0, 0, k, k);

    topology.transform.scale[0] /= k;
    topology.transform.scale[1] /= k;
  } else {
    var bbox = topology.bbox,
        x0 = isFinite(bbox[0]) ? bbox[0] : 0,
        y0 = isFinite(bbox[1]) ? bbox[1] : 0,
        x1 = isFinite(bbox[2]) ? bbox[2] : 0,
        y1 = isFinite(bbox[3]) ? bbox[3] : 0,
        kx = x1 - x0 ? (Q1 - 1) / (x1 - x0) : 1,
        ky = y1 - y0 ? (Q1 - 1) / (y1 - y0) : 1,
        q = quantize(-x0, -y0, kx, ky);

    topology.transform = q.transform;
  }

  function quantizeGeometry(geometry) {
    if (geometry && quantizeGeometryType.hasOwnProperty(geometry.type)) quantizeGeometryType[geometry.type](geometry);
  }

  var quantizeGeometryType = {
    GeometryCollection: function(o) { o.geometries.forEach(quantizeGeometry); },
    Point: function(o) { q.point(o.coordinates); },
    MultiPoint: function(o) { o.coordinates.forEach(q.point); }
  };

  for (var key in topology.objects) {
    quantizeGeometry(topology.objects[key]);
  }

  // XXX shared points are bad mmkay
  topology.arcs = topology.arcs.map(function(arc) {
    q.line(arc = arc.map(function(point) { return point.slice(); }));
    if (arc.length < 2) arc.push(arc[0]); // arcs must have at least two points
    return arc;
  });

  return topology;
};

},{"./quantize":23}],21:[function(_dereq_,module,exports){
var quantize = _dereq_("./quantize");

module.exports = function(objects, bbox, Q0, Q1) {
  if (arguments.length < 4) Q1 = Q0;

  var x0 = isFinite(bbox[0]) ? bbox[0] : 0,
      y0 = isFinite(bbox[1]) ? bbox[1] : 0,
      x1 = isFinite(bbox[2]) ? bbox[2] : 0,
      y1 = isFinite(bbox[3]) ? bbox[3] : 0,
      kx = x1 - x0 ? (Q1 - 1) / (x1 - x0) * Q0 / Q1 : 1,
      ky = y1 - y0 ? (Q1 - 1) / (y1 - y0) * Q0 / Q1 : 1,
      q = quantize(-x0, -y0, kx, ky);

  function quantizeGeometry(geometry) {
    if (geometry && quantizeGeometryType.hasOwnProperty(geometry.type)) quantizeGeometryType[geometry.type](geometry);
  }

  var quantizeGeometryType = {
    GeometryCollection: function(o) { o.geometries.forEach(quantizeGeometry); },
    Point: function(o) { q.point(o.coordinates); },
    MultiPoint: function(o) { o.coordinates.forEach(q.point); },
    LineString: function(o) {
      var line = o.coordinates;
      q.line(line);
      if (line.length < 2) line[1] = line[0]; // must have 2+
    },
    MultiLineString: function(o) {
      for (var lines = o.coordinates, i = 0, n = lines.length; i < n; ++i) {
        var line = lines[i];
        q.line(line);
        if (line.length < 2) line[1] = line[0]; // must have 2+
      }
    },
    Polygon: function(o) {
      for (var rings = o.coordinates, i = 0, n = rings.length; i < n; ++i) {
        var ring = rings[i];
        q.line(ring);
        while (ring.length < 4) ring.push(ring[0]); // must have 4+
      }
    },
    MultiPolygon: function(o) {
      for (var polygons = o.coordinates, i = 0, n = polygons.length; i < n; ++i) {
        for (var rings = polygons[i], j = 0, m = rings.length; j < m; ++j) {
          var ring = rings[j];
          q.line(ring);
          while (ring.length < 4) ring.push(ring[0]); // must have 4+
        }
      }
    }
  };

  for (var key in objects) {
    quantizeGeometry(objects[key]);
  }

  return q.transform;
};

},{"./quantize":23}],22:[function(_dereq_,module,exports){
module.exports = function(topology, options) {
  var verbose = false,
      objects = topology.objects,
      oldArcs = topology.arcs,
      oldArcCount = oldArcs.length,
      newArcs = topology.arcs = [],
      newArcCount = 0,
      newIndexByOldIndex = new Array(oldArcs.length);

  if (options)
    "verbose" in options && (verbose = !!options["verbose"]);

  function pruneGeometry(geometry) {
    if (geometry && pruneGeometryType.hasOwnProperty(geometry.type)) pruneGeometryType[geometry.type](geometry);
  }

  var pruneGeometryType = {
    GeometryCollection: function(o) { o.geometries.forEach(pruneGeometry); },
    LineString: function(o) { pruneArcs(o.arcs); },
    MultiLineString: function(o) { o.arcs.forEach(pruneArcs); },
    Polygon: function(o) { o.arcs.forEach(pruneArcs); },
    MultiPolygon: function(o) { o.arcs.forEach(pruneMultiArcs); }
  };

  function pruneArcs(arcs) {
    for (var i = 0, n = arcs.length; i < n; ++i) {
      var oldIndex = arcs[i],
          oldReverse = oldIndex < 0 && (oldIndex = ~oldIndex, true),
          newIndex;

      // If this is the first instance of this arc,
      // record it under its new index.
      if ((newIndex = newIndexByOldIndex[oldIndex]) == null) {
        newIndexByOldIndex[oldIndex] = newIndex = newArcCount++;
        newArcs[newIndex] = oldArcs[oldIndex];
      }

      arcs[i] = oldReverse ? ~newIndex : newIndex;
    }
  }

  function pruneMultiArcs(arcs) {
    arcs.forEach(pruneArcs);
  }

  for (var key in objects) {
    pruneGeometry(objects[key]);
  }

  if (verbose) console.warn("prune: retained " + newArcCount + " / " + oldArcCount + " arcs (" + Math.round(newArcCount / oldArcCount * 100) + "%)");

  return topology;
};

function noop() {}

},{}],23:[function(_dereq_,module,exports){
module.exports = function(dx, dy, kx, ky) {

  function quantizePoint(coordinates) {
    coordinates[0] = Math.round((coordinates[0] + dx) * kx);
    coordinates[1] = Math.round((coordinates[1] + dy) * ky);
    return coordinates;
  }

  function quantizeLine(coordinates) {
    var i = 0,
        j = 1,
        n = coordinates.length,
        pi = quantizePoint(coordinates[0]),
        pj,
        px = pi[0],
        py = pi[1],
        x,
        y;

    while (++i < n) {
      pi = quantizePoint(coordinates[i]);
      x = pi[0];
      y = pi[1];
      if (x !== px || y !== py) { // skip coincident points
        pj = coordinates[j++];
        pj[0] = px = x;
        pj[1] = py = y;
      }
    }

    coordinates.length = j;
  }

  return {
    point: quantizePoint,
    line: quantizeLine,
    transform: {
      scale: [1 / kx, 1 / ky],
      translate: [-dx, -dy]
    }
  };
};

},{}],24:[function(_dereq_,module,exports){
var type = _dereq_("./type");

module.exports = function(topology, options) {
  var width,
      height,
      margin = 0,
      invert = true;

  if (options)
    "width" in options && (width = +options["width"]),
    "height" in options && (height = +options["height"]),
    "margin" in options && (margin = +options["margin"]),
    "invert" in options && (invert = !!options["invert"]);

  var bx = topology.bbox,
      dx = bx[2] - bx[0],
      dy = bx[3] - bx[1],
      cx = (bx[2] + bx[0]) / 2,
      cy = (bx[3] + bx[1]) / 2,
      kx;

  width = Math.max(0, width - margin * 2);
  height = Math.max(0, height - margin * 2);

  if (width && height) {
    kx = Math.min(width / dx, height / dy);
  } else if (width) {
    kx = width / dx;
    height = kx * dy;
  } else {
    kx = height / dy;
    width = kx * dx;
  }

  var ky = invert ? -kx : kx,
      lt = scalePoint([bx[0], bx[1]]),
      rb = scalePoint([bx[2], bx[3]]),
      tx;

  topology.bbox = invert
      ? [lt[0], rb[1], rb[0], lt[1]]
      : [lt[0], lt[1], rb[0], rb[1]];

  function scalePoint(point) {
    return [
      point[0] * kx + (width / 2 - cx * kx) + margin,
      point[1] * ky + (height / 2 - cy * ky) + margin
    ];
  }

  if (tx = topology.transform) {
    tx.scale[0] *= kx;
    tx.scale[1] *= ky;
    tx.translate[0] = width / 2 + margin - (cx - tx.translate[0]) * kx;
    tx.translate[1] = height / 2 + margin - (cy - tx.translate[1]) * ky;
  } else {
    var scale = type({
      LineString: noop,
      MultiLineString: noop,
      Point: function(point) { point.coordinates = scalePoint(point.coordinates); },
      MultiPoint: function(multipoint) { multipoint.coordinates = multipoint.coordinates.map(scalePoint); },
      Polygon: noop,
      MultiPolygon: noop
    });

    for (var key in topology.objects) {
      scale.object(topology.objects[key]);
    }

    topology.arcs = topology.arcs.map(function(arc) {
      return arc.map(scalePoint);
    });
  }

  return topology;
};

function noop() {}

},{"./type":39}],25:[function(_dereq_,module,exports){
var topojson = _dereq_("../../"),
    systems = _dereq_("./coordinate-systems");

module.exports = function(topology, options) {
  var minimumArea = 0,
      retainProportion,
      verbose = false,
      system = null,
      N = topology.arcs.reduce(function(p, v) { return p + v.length; }, 0),
      M = 0;

  if (options)
    "minimum-area" in options && (minimumArea = +options["minimum-area"]),
    "coordinate-system" in options && (system = systems[options["coordinate-system"]]),
    "retain-proportion" in options && (retainProportion = +options["retain-proportion"]),
    "verbose" in options && (verbose = !!options["verbose"]);

  topojson.presimplify(topology, system.triangleArea);

  if (retainProportion) {
    var areas = [];
    topology.arcs.forEach(function(arc) {
      arc.forEach(function(point) {
        if (isFinite(point[2])) areas.push(point[2]); // ignore endpoints
      });
    });
    options["minimum-area"] = minimumArea = N ? areas.sort(function(a, b) { return b - a; })[Math.ceil((N - 1) * retainProportion)] : 0;
    if (verbose) console.warn("simplification: effective minimum area " + minimumArea.toPrecision(3));
  }

  topology.arcs.forEach(topology.transform ? function(arc) {
    var dx = 0,
        dy = 0, // accumulate removed points
        i = -1,
        j = -1,
        n = arc.length,
        source,
        target;

    while (++i < n) {
      source = arc[i];
      if (source[2] >= minimumArea) {
        target = arc[++j];
        target[0] = source[0] + dx;
        target[1] = source[1] + dy;
        dx = dy = 0;
      } else {
        dx += source[0];
        dy += source[1];
      }
    }

    arc.length = ++j;
  } : function(arc) {
    var i = -1,
        j = -1,
        n = arc.length,
        point;

    while (++i < n) {
      point = arc[i];
      if (point[2] >= minimumArea) {
        arc[++j] = point;
      }
    }

    arc.length = ++j;
  });

  // Remove computed area (z) for each point, and remove coincident points.
  // This is done as a separate pass because some coordinates may be shared
  // between arcs (such as the last point and first point of a cut line).
  // If the entire arc is empty, retain at least two points (per spec).
  topology.arcs.forEach(topology.transform ? function(arc) {
    var i = 0,
        j = 0,
        n = arc.length,
        p = arc[0];
    p.length = 2;
    while (++i < n) {
      p = arc[i];
      p.length = 2;
      if (p[0] || p[1]) arc[++j] = p;
    }
    M += arc.length = (j || 1) + 1;
  } : function(arc) {
    var i = 0,
        j = 0,
        n = arc.length,
        p = arc[0],
        x0 = p[0],
        y0 = p[1],
        x1,
        y1;
    p.length = 2;
    while (++i < n) {
      p = arc[i], x1 = p[0], y1 = p[1];
      p.length = 2;
      if (x0 !== x1 || y0 !== y1) arc[++j] = p, x0 = x1, y0 = y1;
    }
    M += arc.length = (j || 1) + 1;
  });

  if (verbose) console.warn("simplification: retained " + M + " / " + N + " points (" + Math.round((M / N) * 100) + "%)");

  return topology;
};

},{"../../":10,"./coordinate-systems":16}],26:[function(_dereq_,module,exports){
var π = Math.PI,
    π_4 = π / 4,
    radians = π / 180;

exports.name = "spherical";
exports.formatDistance = formatDistance;
exports.ringArea = ringArea;
exports.absoluteArea = absoluteArea;
exports.triangleArea = triangleArea;
exports.distance = haversinDistance; // XXX why two implementations?

function formatDistance(k) {
  var km = k * radians * 6371;
  return (km > 1 ? km.toFixed(3) + "km" : (km * 1000).toPrecision(3) + "m") + " (" + k.toPrecision(3) + "°)";
}

function ringArea(ring) {
  if (!ring.length) return 0;
  var area = 0,
      p = ring[0],
      λ = p[0] * radians,
      φ = p[1] * radians / 2 + π_4,
      λ0 = λ,
      cosφ0 = Math.cos(φ),
      sinφ0 = Math.sin(φ);

  for (var i = 1, n = ring.length; i < n; ++i) {
    p = ring[i], λ = p[0] * radians, φ = p[1] * radians / 2 + π_4;

    // Spherical excess E for a spherical triangle with vertices: south pole,
    // previous point, current point.  Uses a formula derived from Cagnoli’s
    // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
    var dλ = λ - λ0,
        cosφ = Math.cos(φ),
        sinφ = Math.sin(φ),
        k = sinφ0 * sinφ,
        u = cosφ0 * cosφ + k * Math.cos(dλ),
        v = k * Math.sin(dλ);
    area += Math.atan2(v, u);

    // Advance the previous point.
    λ0 = λ, cosφ0 = cosφ, sinφ0 = sinφ;
  }

  return 2 * (area > π ? area - 2 * π : area < -π ? area + 2 * π : area);
}

function absoluteArea(a) {
  return a < 0 ? a + 4 * π : a;
}

function triangleArea(t) {
  var a = distance(t[0], t[1]),
      b = distance(t[1], t[2]),
      c = distance(t[2], t[0]),
      s = (a + b + c) / 2;
  return 4 * Math.atan(Math.sqrt(Math.max(0, Math.tan(s / 2) * Math.tan((s - a) / 2) * Math.tan((s - b) / 2) * Math.tan((s - c) / 2))));
}

function distance(a, b) {
  var Δλ = (b[0] - a[0]) * radians,
      sinΔλ = Math.sin(Δλ),
      cosΔλ = Math.cos(Δλ),
      sinφ0 = Math.sin(a[1] * radians),
      cosφ0 = Math.cos(a[1] * radians),
      sinφ1 = Math.sin(b[1] * radians),
      cosφ1 = Math.cos(b[1] * radians),
      _;
  return Math.atan2(Math.sqrt((_ = cosφ1 * sinΔλ) * _ + (_ = cosφ0 * sinφ1 - sinφ0 * cosφ1 * cosΔλ) * _), sinφ0 * sinφ1 + cosφ0 * cosφ1 * cosΔλ);
}

function haversinDistance(x0, y0, x1, y1) {
  x0 *= radians, y0 *= radians, x1 *= radians, y1 *= radians;
  return 2 * Math.asin(Math.sqrt(haversin(y1 - y0) + Math.cos(y0) * Math.cos(y1) * haversin(x1 - x0)));
}

function haversin(x) {
  return (x = Math.sin(x / 2)) * x;
}

},{}],27:[function(_dereq_,module,exports){
var type = _dereq_("./type");

module.exports = function(objects, transform) {
  var ε = 1e-2,
      x0 = -180, x0e = x0 + ε,
      x1 = 180, x1e = x1 - ε,
      y0 = -90, y0e = y0 + ε,
      y1 = 90, y1e = y1 - ε;

  if (transform) {
    var kx = transform.scale[0],
        ky = transform.scale[1],
        dx = transform.translate[0],
        dy = transform.translate[1];

    x0 = Math.round((x0 - dx) / kx);
    x1 = Math.round((x1 - dx) / kx);
    y0 = Math.round((y0 - dy) / ky);
    y1 = Math.round((y1 - dy) / ky);
    x0e = Math.round((x0e - dx) / kx);
    x1e = Math.round((x1e - dx) / kx);
    y0e = Math.round((y0e - dy) / ky);
    y1e = Math.round((y1e - dy) / ky);
  }

  function normalizePoint(y) {
    return y <= y0e ? [0, y0] // south pole
        : y >= y1e ? [0, y1] // north pole
        : [x0, y]; // antimeridian
  }

  function stitchPolygons(polygons) {
    var fragments = [];

    for (var p = 0, np = polygons.length; p < np; ++p) {
      var polygon = polygons[p];

      // For each ring, detect where it crosses the antimeridian or pole.
      for (var j = 0, m = polygon.length; j < m; ++j) {
        var ring = polygon[j];
        ring.polygon = polygon;

        // By default, assume that this ring doesn’t need any stitching.
        fragments.push(ring);

        for (var i = 0, n = ring.length; i < n; ++i) {
          var point = ring[i],
              x = point[0],
              y = point[1];

          // If this is an antimeridian or polar point…
          if (x <= x0e || x >= x1e || y <= y0e || y >= y1e) {

            // Advance through any antimeridian or polar points…
            for (var k = i + 1; k < n; ++k) {
              var pointk = ring[k],
                  xk = pointk[0],
                  yk = pointk[1];
              if (xk > x0e && xk < x1e && yk > y0e && yk < y1e) break;
            }

            // If this was just a single antimeridian or polar point,
            // we don’t need to cut this ring into a fragment;
            // we can just leave it as-is.
            if (k === i + 1) continue;

            // Otherwise, if this is not the first point in the ring,
            // cut the current fragment so that it ends at the current point.
            // The current point is also normalized for later joining.
            if (i) {
              var fragmentBefore = ring.slice(0, i + 1);
              fragmentBefore.polygon = polygon;
              fragmentBefore[fragmentBefore.length - 1] = normalizePoint(y);
              fragments[fragments.length - 1] = fragmentBefore;
            }

            // If the ring started with an antimeridian fragment,
            // we can ignore that fragment entirely.
            else {
              fragments.pop();
            }

            // If the remainder of the ring is an antimeridian fragment,
            // move on to the next ring.
            if (k >= n) break;

            // Otherwise, add the remaining ring fragment and continue.
            fragments.push(ring = ring.slice(k - 1));
            ring[0] = normalizePoint(ring[0][1]);
            ring.polygon = polygon;
            i = -1;
            n = ring.length;
          }
        }
      }
      polygon.length = 0;
    }

    // Now stitch the fragments back together into rings.
    // To connect the fragments start-to-end, create a simple index by end.
    var fragmentByStart = {},
        fragmentByEnd = {};

    // For each fragment…
    for (var i = 0, n = fragments.length; i < n; ++i) {
      var fragment = fragments[i],
          start = fragment[0],
          end = fragment[fragment.length - 1];

      // If this fragment is closed, add it as a standalone ring.
      if (start[0] === end[0] && start[1] === end[1]) {
        fragment.polygon.push(fragment);
        fragments[i] = null;
        continue;
      }

      fragment.index = i;
      fragmentByStart[start] = fragmentByEnd[end] = fragment;
    }

    // For each open fragment…
    for (var i = 0; i < n; ++i) {
      var fragment = fragments[i];
      if (fragment) {

        var start = fragment[0],
            end = fragment[fragment.length - 1],
            startFragment = fragmentByEnd[start],
            endFragment = fragmentByStart[end];

        delete fragmentByStart[start];
        delete fragmentByEnd[end];

        // If this fragment is closed, add it as a standalone ring.
        if (start[0] === end[0] && start[1] === end[1]) {
          fragment.polygon.push(fragment);
          continue;
        }

        if (startFragment) {
          delete fragmentByEnd[start];
          delete fragmentByStart[startFragment[0]];
          startFragment.pop(); // drop the shared coordinate
          fragments[startFragment.index] = null;
          fragment = startFragment.concat(fragment);
          fragment.polygon = startFragment.polygon;

          if (startFragment === endFragment) {
            // Connect both ends to this single fragment to create a ring.
            fragment.polygon.push(fragment);
          } else {
            fragment.index = n++;
            fragments.push(fragmentByStart[fragment[0]] = fragmentByEnd[fragment[fragment.length - 1]] = fragment);
          }
        } else if (endFragment) {
          delete fragmentByStart[end];
          delete fragmentByEnd[endFragment[endFragment.length - 1]];
          fragment.pop(); // drop the shared coordinate
          fragment = fragment.concat(endFragment);
          fragment.polygon = endFragment.polygon;
          fragment.index = n++;
          fragments[endFragment.index] = null;
          fragments.push(fragmentByStart[fragment[0]] = fragmentByEnd[fragment[fragment.length - 1]] = fragment);
        } else {
          fragment.push(fragment[0]); // close ring
          fragment.polygon.push(fragment);
        }
      }
    }
    // TODO remove empty polygons.
  }

  var stitch = type({
    Polygon: function(polygon) { stitchPolygons([polygon.coordinates]); },
    MultiPolygon: function(multiPolygon) { stitchPolygons(multiPolygon.coordinates); }
  });

  for (var key in objects) {
    stitch.object(objects[key]);
  }
};

},{"./type":39}],28:[function(_dereq_,module,exports){
var type = _dereq_("./type"),
    stitch = _dereq_("./stitch"),
    systems = _dereq_("./coordinate-systems"),
    topologize = _dereq_("./topology/index"),
    delta = _dereq_("./delta"),
    geomify = _dereq_("./geomify"),
    prequantize = _dereq_("./pre-quantize"),
    postquantize = _dereq_("./post-quantize"),
    bounds = _dereq_("./bounds"),
    computeId = _dereq_("./compute-id"),
    transformProperties = _dereq_("./transform-properties");

var ε = 1e-6;

module.exports = function(objects, options) {
  var Q0 = 1e4, // precision of pre-quantization
      Q1 = 1e4, // precision of post-quantization (must be divisor of Q0)
      id = function(d) { return d.id; }, // function to compute object id
      propertyTransform = function() {}, // function to transform properties
      transform,
      minimumArea = 0,
      stitchPoles = true,
      verbose = false,
      system = null;

  if (options)
    "verbose" in options && (verbose = !!options["verbose"]),
    "stitch-poles" in options && (stitchPoles = !!options["stitch-poles"]),
    "coordinate-system" in options && (system = systems[options["coordinate-system"]]),
    "minimum-area" in options && (minimumArea = +options["minimum-area"]),
    "quantization" in options && (Q0 = Q1 = +options["quantization"]),
    "pre-quantization" in options && (Q0 = +options["pre-quantization"]),
    "post-quantization" in options && (Q1 = +options["post-quantization"]),
    "id" in options && (id = options["id"]),
    "property-transform" in options && (propertyTransform = options["property-transform"]);

  if (Q0 / Q1 % 1) throw new Error("post-quantization is not a divisor of pre-quantization");
  if (Q0 && !Q1) throw new Error("post-quantization is required when input is already quantized");

  // Compute the new feature id and transform properties.
  computeId(objects, id);
  transformProperties(objects, propertyTransform);

  // Convert to geometry objects.
  geomify(objects);

  // Compute initial bounding box.
  var bbox = bounds(objects);

  // For automatic coordinate system determination, consider the bounding box.
  var oversize = bbox[0] < -180 - ε
      || bbox[1] < -90 - ε
      || bbox[2] > 180 + ε
      || bbox[3] > 90 + ε;
  if (!system) {
    system = systems[oversize ? "cartesian" : "spherical"];
    if (options) options["coordinate-system"] = system.name;
  }

  if (system === systems.spherical) {
    if (oversize) throw new Error("spherical coordinates outside of [±180°, ±90°]");

    // When near the spherical coordinate limits, clamp to nice round values.
    // This avoids quantized coordinates that are slightly outside the limits.
    if (bbox[0] < -180 + ε) bbox[0] = -180;
    if (bbox[1] < -90 + ε) bbox[1] = -90;
    if (bbox[2] > 180 - ε) bbox[2] = 180;
    if (bbox[3] > 90 - ε) bbox[3] = 90;
  }

  if (verbose) {
    console.warn("bounds: " + bbox.join(" ") + " (" + system.name + ")");
  }

  // Pre-topology quantization.
  if (Q0) {
    transform = prequantize(objects, bbox, Q0, Q1);
    if (verbose) {
      console.warn("pre-quantization: " + transform.scale.map(function(k) { return system.formatDistance(k); }).join(" "));
    }
  }

  // Remove any antimeridian cuts and restitch.
  if (system === systems.spherical && stitchPoles) {
    stitch(objects, transform);
  }

  // Compute the topology.
  var topology = topologize(objects);
  if (Q0) topology.transform = transform;
  topology.bbox = bbox;
  if (verbose) {
    console.warn("topology: " + topology.arcs.length + " arcs, " + topology.arcs.reduce(function(p, v) { return p + v.length; }, 0) + " points");
  }

  // Post-topology quantization.
  if (Q1 && Q1 !== Q0) {
    postquantize(topology, Q0, Q1);
    transform = topology.transform;
    if (verbose) {
      console.warn("post-quantization: " + transform.scale.map(function(k) { return system.formatDistance(k); }).join(" "));
    }
  }

  // Convert to delta-encoding.
  if (Q1) {
    delta(topology);
  }

  return topology;
};

},{"./bounds":12,"./compute-id":15,"./coordinate-systems":16,"./delta":17,"./geomify":19,"./post-quantize":20,"./pre-quantize":21,"./stitch":27,"./topology/index":34,"./transform-properties":38,"./type":39}],29:[function(_dereq_,module,exports){
var join = _dereq_("./join");

// Given an extracted (pre-)topology, cuts (or rotates) arcs so that all shared
// point sequences are identified. The topology can then be subsequently deduped
// to remove exact duplicate arcs.
module.exports = function(topology) {
  var junctions = join(topology),
      coordinates = topology.coordinates,
      lines = topology.lines,
      rings = topology.rings;

  for (var i = 0, n = lines.length; i < n; ++i) {
    var line = lines[i],
        lineMid = line[0],
        lineEnd = line[1];
    while (++lineMid < lineEnd) {
      if (junctions.has(coordinates[lineMid])) {
        var next = {0: lineMid, 1: line[1]};
        line[1] = lineMid;
        line = line.next = next;
      }
    }
  }

  for (var i = 0, n = rings.length; i < n; ++i) {
    var ring = rings[i],
        ringStart = ring[0],
        ringMid = ringStart,
        ringEnd = ring[1],
        ringFixed = junctions.has(coordinates[ringStart]);
    while (++ringMid < ringEnd) {
      if (junctions.has(coordinates[ringMid])) {
        if (ringFixed) {
          var next = {0: ringMid, 1: ring[1]};
          ring[1] = ringMid;
          ring = ring.next = next;
        } else { // For the first junction, we can rotate rather than cut.
          rotateArray(coordinates, ringStart, ringEnd, ringEnd - ringMid);
          coordinates[ringEnd] = coordinates[ringStart];
          ringFixed = true;
          ringMid = ringStart; // restart; we may have skipped junctions
        }
      }
    }
  }

  return topology;
};

function rotateArray(array, start, end, offset) {
  reverse(array, start, end);
  reverse(array, start, start + offset);
  reverse(array, start + offset, end);
}

function reverse(array, start, end) {
  for (var mid = start + ((end-- - start) >> 1), t; start < mid; ++start, --end) {
    t = array[start], array[start] = array[end], array[end] = t;
  }
}

},{"./join":35}],30:[function(_dereq_,module,exports){
var join = _dereq_("./join"),
    hashmap = _dereq_("./hashmap"),
    hashPoint = _dereq_("./point-hash"),
    equalPoint = _dereq_("./point-equal");

// Given a cut topology, combines duplicate arcs.
module.exports = function(topology) {
  var coordinates = topology.coordinates,
      lines = topology.lines,
      rings = topology.rings,
      arcCount = lines.length + rings.length;

  delete topology.lines;
  delete topology.rings;

  // Count the number of (non-unique) arcs to initialize the hashmap safely.
  for (var i = 0, n = lines.length; i < n; ++i) {
    var line = lines[i]; while (line = line.next) ++arcCount;
  }
  for (var i = 0, n = rings.length; i < n; ++i) {
    var ring = rings[i]; while (ring = ring.next) ++arcCount;
  }

  var arcsByEnd = hashmap(arcCount * 2 * 1.4, hashPoint, equalPoint),
      arcs = topology.arcs = [];

  for (var i = 0, n = lines.length; i < n; ++i) {
    var line = lines[i];
    do {
      dedupLine(line);
    } while (line = line.next);
  }

  for (var i = 0, n = rings.length; i < n; ++i) {
    var ring = rings[i];
    if (ring.next) { // arc is no longer closed
      do {
        dedupLine(ring);
      } while (ring = ring.next);
    } else {
      dedupRing(ring);
    }
  }

  function dedupLine(arc) {
    var startPoint,
        endPoint,
        startArcs,
        endArcs;

    // Does this arc match an existing arc in order?
    if (startArcs = arcsByEnd.get(startPoint = coordinates[arc[0]])) {
      for (var i = 0, n = startArcs.length; i < n; ++i) {
        var startArc = startArcs[i];
        if (equalLine(startArc, arc)) {
          arc[0] = startArc[0];
          arc[1] = startArc[1];
          return;
        }
      }
    }

    // Does this arc match an existing arc in reverse order?
    if (endArcs = arcsByEnd.get(endPoint = coordinates[arc[1]])) {
      for (var i = 0, n = endArcs.length; i < n; ++i) {
        var endArc = endArcs[i];
        if (reverseEqualLine(endArc, arc)) {
          arc[1] = endArc[0];
          arc[0] = endArc[1];
          return;
        }
      }
    }

    if (startArcs) startArcs.push(arc); else arcsByEnd.set(startPoint, [arc]);
    if (endArcs) endArcs.push(arc); else arcsByEnd.set(endPoint, [arc]);
    arcs.push(arc);
  }

  function dedupRing(arc) {
    var endPoint,
        endArcs;

    // Does this arc match an existing line in order, or reverse order?
    // Rings are closed, so their start point and end point is the same.
    if (endArcs = arcsByEnd.get(endPoint = coordinates[arc[0]])) {
      for (var i = 0, n = endArcs.length; i < n; ++i) {
        var endArc = endArcs[i];
        if (equalRing(endArc, arc)) {
          arc[0] = endArc[0];
          arc[1] = endArc[1];
          return;
        }
        if (reverseEqualRing(endArc, arc)) {
          arc[0] = endArc[1];
          arc[1] = endArc[0];
          return;
        }
      }
    }

    // Otherwise, does this arc match an existing ring in order, or reverse order?
    if (endArcs = arcsByEnd.get(endPoint = coordinates[arc[0] + findMinimumOffset(arc)])) {
      for (var i = 0, n = endArcs.length; i < n; ++i) {
        var endArc = endArcs[i];
        if (equalRing(endArc, arc)) {
          arc[0] = endArc[0];
          arc[1] = endArc[1];
          return;
        }
        if (reverseEqualRing(endArc, arc)) {
          arc[0] = endArc[1];
          arc[1] = endArc[0];
          return;
        }
      }
    }

    if (endArcs) endArcs.push(arc); else arcsByEnd.set(endPoint, [arc]);
    arcs.push(arc);
  }

  function equalLine(arcA, arcB) {
    var ia = arcA[0], ib = arcB[0],
        ja = arcA[1], jb = arcB[1];
    if (ia - ja !== ib - jb) return false;
    for (; ia <= ja; ++ia, ++ib) if (!equalPoint(coordinates[ia], coordinates[ib])) return false;
    return true;
  }

  function reverseEqualLine(arcA, arcB) {
    var ia = arcA[0], ib = arcB[0],
        ja = arcA[1], jb = arcB[1];
    if (ia - ja !== ib - jb) return false;
    for (; ia <= ja; ++ia, --jb) if (!equalPoint(coordinates[ia], coordinates[jb])) return false;
    return true;
  }

  function equalRing(arcA, arcB) {
    var ia = arcA[0], ib = arcB[0],
        ja = arcA[1], jb = arcB[1],
        n = ja - ia;
    if (n !== jb - ib) return false;
    var ka = findMinimumOffset(arcA),
        kb = findMinimumOffset(arcB);
    for (var i = 0; i < n; ++i) {
      if (!equalPoint(coordinates[ia + (i + ka) % n], coordinates[ib + (i + kb) % n])) return false;
    }
    return true;
  }

  function reverseEqualRing(arcA, arcB) {
    var ia = arcA[0], ib = arcB[0],
        ja = arcA[1], jb = arcB[1],
        n = ja - ia;
    if (n !== jb - ib) return false;
    var ka = findMinimumOffset(arcA),
        kb = n - findMinimumOffset(arcB);
    for (var i = 0; i < n; ++i) {
      if (!equalPoint(coordinates[ia + (i + ka) % n], coordinates[jb - (i + kb) % n])) return false;
    }
    return true;
  }

  // Rings are rotated to a consistent, but arbitrary, start point.
  // This is necessary to detect when a ring and a rotated copy are dupes.
  function findMinimumOffset(arc) {
    var start = arc[0],
        end = arc[1],
        mid = start,
        minimum = mid,
        minimumPoint = coordinates[mid];
    while (++mid < end) {
      var point = coordinates[mid];
      if (point[0] < minimumPoint[0] || point[0] === minimumPoint[0] && point[1] < minimumPoint[1]) {
        minimum = mid;
        minimumPoint = point;
      }
    }
    return minimum - start;
  }

  return topology;
};

},{"./hashmap":32,"./join":35,"./point-equal":36,"./point-hash":37}],31:[function(_dereq_,module,exports){
// Extracts the lines and rings from the specified hash of geometry objects.
//
// Returns an object with three properties:
//
// * coordinates - shared buffer of [x, y] coordinates
// * lines - lines extracted from the hash, of the form [start, end]
// * rings - rings extracted from the hash, of the form [start, end]
//
// For each ring or line, start and end represent inclusive indexes into the
// coordinates buffer. For rings (and closed lines), coordinates[start] equals
// coordinates[end].
//
// For each line or polygon geometry in the input hash, including nested
// geometries as in geometry collections, the `coordinates` array is replaced
// with an equivalent `arcs` array that, for each line (for line string
// geometries) or ring (for polygon geometries), points to one of the above
// lines or rings.
module.exports = function(objects) {
  var index = -1,
      lines = [],
      rings = [],
      coordinates = [];

  function extractGeometry(geometry) {
    if (geometry && extractGeometryType.hasOwnProperty(geometry.type)) extractGeometryType[geometry.type](geometry);
  }

  var extractGeometryType = {
    GeometryCollection: function(o) { o.geometries.forEach(extractGeometry); },
    LineString: function(o) { o.arcs = extractLine(o.coordinates); delete o.coordinates; },
    MultiLineString: function(o) { o.arcs = o.coordinates.map(extractLine); delete o.coordinates; },
    Polygon: function(o) { o.arcs = o.coordinates.map(extractRing); delete o.coordinates; },
    MultiPolygon: function(o) { o.arcs = o.coordinates.map(extractMultiRing); delete o.coordinates; }
  };

  function extractLine(line) {
    for (var i = 0, n = line.length; i < n; ++i) coordinates[++index] = line[i];
    var arc = {0: index - n + 1, 1: index};
    lines.push(arc);
    return arc;
  }

  function extractRing(ring) {
    for (var i = 0, n = ring.length; i < n; ++i) coordinates[++index] = ring[i];
    var arc = {0: index - n + 1, 1: index};
    rings.push(arc);
    return arc;
  }

  function extractMultiRing(rings) {
    return rings.map(extractRing);
  }

  for (var key in objects) {
    extractGeometry(objects[key]);
  }

  return {
    type: "Topology",
    coordinates: coordinates,
    lines: lines,
    rings: rings,
    objects: objects
  };
};

},{}],32:[function(_dereq_,module,exports){
module.exports = function(size, hash, equal, keyType, keyEmpty, valueType) {
  if (arguments.length === 3) {
    keyType = valueType = Array;
    keyEmpty = null;
  }

  var keystore = new keyType(size = 1 << Math.max(4, Math.ceil(Math.log(size) / Math.LN2))),
      valstore = new valueType(size),
      mask = size - 1,
      free = size;

  for (var i = 0; i < size; ++i) {
    keystore[i] = keyEmpty;
  }

  function set(key, value) {
    var index = hash(key) & mask,
        matchKey = keystore[index],
        collisions = 0;
    while (matchKey != keyEmpty) {
      if (equal(matchKey, key)) return valstore[index] = value;
      if (++collisions >= size) throw new Error("full hashmap");
      matchKey = keystore[index = (index + 1) & mask];
    }
    keystore[index] = key;
    valstore[index] = value;
    --free;
    return value;
  }

  function maybeSet(key, value) {
    var index = hash(key) & mask,
        matchKey = keystore[index],
        collisions = 0;
    while (matchKey != keyEmpty) {
      if (equal(matchKey, key)) return valstore[index];
      if (++collisions >= size) throw new Error("full hashmap");
      matchKey = keystore[index = (index + 1) & mask];
    }
    keystore[index] = key;
    valstore[index] = value;
    --free;
    return value;
  }

  function get(key, missingValue) {
    var index = hash(key) & mask,
        matchKey = keystore[index],
        collisions = 0;
    while (matchKey != keyEmpty) {
      if (equal(matchKey, key)) return valstore[index];
      if (++collisions >= size) break;
      matchKey = keystore[index = (index + 1) & mask];
    }
    return missingValue;
  }

  function keys() {
    var keys = [];
    for (var i = 0, n = keystore.length; i < n; ++i) {
      var matchKey = keystore[i];
      if (matchKey != keyEmpty) keys.push(matchKey);
    }
    return keys;
  }

  return {
    set: set,
    maybeSet: maybeSet, // set if unset
    get: get,
    keys: keys
  };
};

},{}],33:[function(_dereq_,module,exports){
module.exports = function(size, hash, equal, type, empty) {
  if (arguments.length === 3) {
    type = Array;
    empty = null;
  }

  var store = new type(size = 1 << Math.max(4, Math.ceil(Math.log(size) / Math.LN2))),
      mask = size - 1,
      free = size;

  for (var i = 0; i < size; ++i) {
    store[i] = empty;
  }

  function add(value) {
    var index = hash(value) & mask,
        match = store[index],
        collisions = 0;
    while (match != empty) {
      if (equal(match, value)) return true;
      if (++collisions >= size) throw new Error("full hashset");
      match = store[index = (index + 1) & mask];
    }
    store[index] = value;
    --free;
    return true;
  }

  function has(value) {
    var index = hash(value) & mask,
        match = store[index],
        collisions = 0;
    while (match != empty) {
      if (equal(match, value)) return true;
      if (++collisions >= size) break;
      match = store[index = (index + 1) & mask];
    }
    return false;
  }

  function values() {
    var values = [];
    for (var i = 0, n = store.length; i < n; ++i) {
      var match = store[i];
      if (match != empty) values.push(match);
    }
    return values;
  }

  return {
    add: add,
    has: has,
    values: values
  };
};

},{}],34:[function(_dereq_,module,exports){
var hashmap = _dereq_("./hashmap"),
    extract = _dereq_("./extract"),
    cut = _dereq_("./cut"),
    dedup = _dereq_("./dedup");

// Constructs the TopoJSON Topology for the specified hash of geometries.
// Each object in the specified hash must be a GeoJSON object,
// meaning FeatureCollection, a Feature or a geometry object.
module.exports = function(objects) {
  var topology = dedup(cut(extract(objects))),
      coordinates = topology.coordinates,
      indexByArc = hashmap(topology.arcs.length * 1.4, hashArc, equalArc);

  objects = topology.objects; // for garbage collection

  topology.arcs = topology.arcs.map(function(arc, i) {
    indexByArc.set(arc, i);
    return coordinates.slice(arc[0], arc[1] + 1);
  });

  delete topology.coordinates;
  coordinates = null;

  function indexGeometry(geometry) {
    if (geometry && indexGeometryType.hasOwnProperty(geometry.type)) indexGeometryType[geometry.type](geometry);
  }

  var indexGeometryType = {
    GeometryCollection: function(o) { o.geometries.forEach(indexGeometry); },
    LineString: function(o) { o.arcs = indexArcs(o.arcs); },
    MultiLineString: function(o) { o.arcs = o.arcs.map(indexArcs); },
    Polygon: function(o) { o.arcs = o.arcs.map(indexArcs); },
    MultiPolygon: function(o) { o.arcs = o.arcs.map(indexMultiArcs); }
  };

  function indexArcs(arc) {
    var indexes = [];
    do {
      var index = indexByArc.get(arc);
      indexes.push(arc[0] < arc[1] ? index : ~index);
    } while (arc = arc.next);
    return indexes;
  }

  function indexMultiArcs(arcs) {
    return arcs.map(indexArcs);
  }

  for (var key in objects) {
    indexGeometry(objects[key]);
  }

  return topology;
};

function hashArc(arc) {
  var i = arc[0], j = arc[1], t;
  if (j < i) t = i, i = j, j = t;
  return i + 31 * j;
}

function equalArc(arcA, arcB) {
  var ia = arcA[0], ja = arcA[1],
      ib = arcB[0], jb = arcB[1], t;
  if (ja < ia) t = ia, ia = ja, ja = t;
  if (jb < ib) t = ib, ib = jb, jb = t;
  return ia === ib && ja === jb;
}

},{"./cut":29,"./dedup":30,"./extract":31,"./hashmap":32}],35:[function(_dereq_,module,exports){
var hashset = _dereq_("./hashset"),
    hashmap = _dereq_("./hashmap"),
    hashPoint = _dereq_("./point-hash"),
    equalPoint = _dereq_("./point-equal");

// Given an extracted (pre-)topology, identifies all of the junctions. These are
// the points at which arcs (lines or rings) will need to be cut so that each
// arc is represented uniquely.
//
// A junction is a point where at least one arc deviates from another arc going
// through the same point. For example, consider the point B. If there is a arc
// through ABC and another arc through CBA, then B is not a junction because in
// both cases the adjacent point pairs are {A,C}. However, if there is an
// additional arc ABD, then {A,D} != {A,C}, and thus B becomes a junction.
//
// For a closed ring ABCA, the first point A’s adjacent points are the second
// and last point {B,C}. For a line, the first and last point are always
// considered junctions, even if the line is closed; this ensures that a closed
// line is never rotated.
module.exports = function(topology) {
  var coordinates = topology.coordinates,
      lines = topology.lines,
      rings = topology.rings,
      indexes = index(),
      visitedByIndex = new Int32Array(coordinates.length),
      leftByIndex = new Int32Array(coordinates.length),
      rightByIndex = new Int32Array(coordinates.length),
      junctionByIndex = new Int8Array(coordinates.length),
      junctionCount = 0; // upper bound on number of junctions

  for (var i = 0, n = coordinates.length; i < n; ++i) {
    visitedByIndex[i] = leftByIndex[i] = rightByIndex[i] = -1;
  }

  for (var i = 0, n = lines.length; i < n; ++i) {
    var line = lines[i],
        lineStart = line[0],
        lineEnd = line[1],
        previousIndex,
        currentIndex = indexes[lineStart],
        nextIndex = indexes[++lineStart];
    ++junctionCount, junctionByIndex[currentIndex] = 1; // start
    while (++lineStart <= lineEnd) {
      sequence(i, previousIndex = currentIndex, currentIndex = nextIndex, nextIndex = indexes[lineStart]);
    }
    ++junctionCount, junctionByIndex[nextIndex] = 1; // end
  }

  for (var i = 0, n = coordinates.length; i < n; ++i) {
    visitedByIndex[i] = -1;
  }

  for (var i = 0, n = rings.length; i < n; ++i) {
    var ring = rings[i],
        ringStart = ring[0] + 1,
        ringEnd = ring[1],
        previousIndex = indexes[ringEnd - 1],
        currentIndex = indexes[ringStart - 1],
        nextIndex = indexes[ringStart];
    sequence(i, previousIndex, currentIndex, nextIndex);
    while (++ringStart <= ringEnd) {
      sequence(i, previousIndex = currentIndex, currentIndex = nextIndex, nextIndex = indexes[ringStart]);
    }
  }

  function sequence(i, previousIndex, currentIndex, nextIndex) {
    if (visitedByIndex[currentIndex] === i) return; // ignore self-intersection
    visitedByIndex[currentIndex] = i;
    var leftIndex = leftByIndex[currentIndex];
    if (leftIndex >= 0) {
      var rightIndex = rightByIndex[currentIndex];
      if ((leftIndex !== previousIndex || rightIndex !== nextIndex)
        && (leftIndex !== nextIndex || rightIndex !== previousIndex)) {
        ++junctionCount, junctionByIndex[currentIndex] = 1;
      }
    } else {
      leftByIndex[currentIndex] = previousIndex;
      rightByIndex[currentIndex] = nextIndex;
    }
  }

  function index() {
    var indexByPoint = hashmap(coordinates.length * 1.4, hashIndex, equalIndex, Int32Array, -1, Int32Array),
        indexes = new Int32Array(coordinates.length);

    for (var i = 0, n = coordinates.length; i < n; ++i) {
      indexes[i] = indexByPoint.maybeSet(i, i);
    }

    return indexes;
  }

  function hashIndex(i) {
    return hashPoint(coordinates[i]);
  }

  function equalIndex(i, j) {
    return equalPoint(coordinates[i], coordinates[j]);
  }

  visitedByIndex = leftByIndex = rightByIndex = null;

  var junctionByPoint = hashset(junctionCount * 1.4, hashPoint, equalPoint);

  // Convert back to a standard hashset by point for caller convenience.
  for (var i = 0, n = coordinates.length, j; i < n; ++i) {
    if (junctionByIndex[j = indexes[i]]) {
      junctionByPoint.add(coordinates[j]);
    }
  }

  return junctionByPoint;
};

},{"./hashmap":32,"./hashset":33,"./point-equal":36,"./point-hash":37}],36:[function(_dereq_,module,exports){
module.exports = function(pointA, pointB) {
  return pointA[0] === pointB[0] && pointA[1] === pointB[1];
};

},{}],37:[function(_dereq_,module,exports){
// TODO if quantized, use simpler Int32 hashing?

var buffer = new ArrayBuffer(16),
    floats = new Float64Array(buffer),
    uints = new Uint32Array(buffer);

module.exports = function(point) {
  floats[0] = point[0];
  floats[1] = point[1];
  var hash = uints[0] ^ uints[1];
  hash = hash << 5 ^ hash >> 7 ^ uints[2] ^ uints[3];
  return hash & 0x7fffffff;
};

},{}],38:[function(_dereq_,module,exports){
// Given a hash of GeoJSON objects, transforms any properties on features using
// the specified transform function. The function is invoked for each existing
// property on the current feature, being passed the new properties hash, the
// property name, and the property value. The function is then expected to
// assign a new value to the given property hash if the feature is to be
// retained and return true. Or, to skip the property, do nothing and return
// false. If no properties are propagated to the new properties hash, the
// properties hash will be deleted from the current feature.
module.exports = function(objects, propertyTransform) {
  if (arguments.length < 2) propertyTransform = function() {};

  function transformObject(object) {
    if (object && transformObjectType.hasOwnProperty(object.type)) transformObjectType[object.type](object);
  }

  function transformFeature(feature) {
    if (feature.properties) {
      var properties0 = feature.properties,
          properties1 = {},
          empty = true;

      for (var key0 in properties0) {
        if (propertyTransform(properties1, key0, properties0[key0])) {
          empty = false;
        }
      }

      if (empty) delete feature.properties;
      else feature.properties = properties1;
    }
  }

  var transformObjectType = {
    Feature: transformFeature,
    FeatureCollection: function(collection) { collection.features.forEach(transformFeature); }
  };

  for (var key in objects) {
    transformObject(objects[key]);
  }

  return objects;
};

},{}],39:[function(_dereq_,module,exports){
module.exports = function(types) {
  for (var type in typeDefaults) {
    if (!(type in types)) {
      types[type] = typeDefaults[type];
    }
  }
  types.defaults = typeDefaults;
  return types;
};

var typeDefaults = {

  Feature: function(feature) {
    if (feature.geometry) this.geometry(feature.geometry);
  },

  FeatureCollection: function(collection) {
    var features = collection.features, i = -1, n = features.length;
    while (++i < n) this.Feature(features[i]);
  },

  GeometryCollection: function(collection) {
    var geometries = collection.geometries, i = -1, n = geometries.length;
    while (++i < n) this.geometry(geometries[i]);
  },

  LineString: function(lineString) {
    this.line(lineString.coordinates);
  },

  MultiLineString: function(multiLineString) {
    var coordinates = multiLineString.coordinates, i = -1, n = coordinates.length;
    while (++i < n) this.line(coordinates[i]);
  },

  MultiPoint: function(multiPoint) {
    var coordinates = multiPoint.coordinates, i = -1, n = coordinates.length;
    while (++i < n) this.point(coordinates[i]);
  },

  MultiPolygon: function(multiPolygon) {
    var coordinates = multiPolygon.coordinates, i = -1, n = coordinates.length;
    while (++i < n) this.polygon(coordinates[i]);
  },

  Point: function(point) {
    this.point(point.coordinates);
  },

  Polygon: function(polygon) {
    this.polygon(polygon.coordinates);
  },

  object: function(object) {
    return object == null ? null
        : typeObjects.hasOwnProperty(object.type) ? this[object.type](object)
        : this.geometry(object);
  },

  geometry: function(geometry) {
    return geometry == null ? null
        : typeGeometries.hasOwnProperty(geometry.type) ? this[geometry.type](geometry)
        : null;
  },

  point: function() {},

  line: function(coordinates) {
    var i = -1, n = coordinates.length;
    while (++i < n) this.point(coordinates[i]);
  },

  polygon: function(coordinates) {
    var i = -1, n = coordinates.length;
    while (++i < n) this.line(coordinates[i]);
  }
};

var typeGeometries = {
  LineString: 1,
  MultiLineString: 1,
  MultiPoint: 1,
  MultiPolygon: 1,
  Point: 1,
  Polygon: 1,
  GeometryCollection: 1
};

var typeObjects = {
  Feature: 1,
  FeatureCollection: 1
};

},{}],40:[function(_dereq_,module,exports){
!function() {
  var topojson = {
    version: "1.6.8",
    mesh: function(topology) { return object(topology, meshArcs.apply(this, arguments)); },
    meshArcs: meshArcs,
    merge: function(topology) { return object(topology, mergeArcs.apply(this, arguments)); },
    mergeArcs: mergeArcs,
    feature: featureOrCollection,
    neighbors: neighbors,
    presimplify: presimplify
  };

  function stitchArcs(topology, arcs) {
    var stitchedArcs = {},
        fragmentByStart = {},
        fragmentByEnd = {},
        fragments = [],
        emptyIndex = -1;

    // Stitch empty arcs first, since they may be subsumed by other arcs.
    arcs.forEach(function(i, j) {
      var arc = topology.arcs[i < 0 ? ~i : i], t;
      if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
        t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;
      }
    });

    arcs.forEach(function(i) {
      var e = ends(i),
          start = e[0],
          end = e[1],
          f, g;

      if (f = fragmentByEnd[start]) {
        delete fragmentByEnd[f.end];
        f.push(i);
        f.end = end;
        if (g = fragmentByStart[end]) {
          delete fragmentByStart[g.start];
          var fg = g === f ? f : f.concat(g);
          fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
        } else {
          fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
        }
      } else if (f = fragmentByStart[end]) {
        delete fragmentByStart[f.start];
        f.unshift(i);
        f.start = start;
        if (g = fragmentByEnd[start]) {
          delete fragmentByEnd[g.end];
          var gf = g === f ? f : g.concat(f);
          fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
        } else {
          fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
        }
      } else {
        f = [i];
        fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
      }
    });

    function ends(i) {
      var arc = topology.arcs[i < 0 ? ~i : i], p0 = arc[0], p1;
      if (topology.transform) p1 = [0, 0], arc.forEach(function(dp) { p1[0] += dp[0], p1[1] += dp[1]; });
      else p1 = arc[arc.length - 1];
      return i < 0 ? [p1, p0] : [p0, p1];
    }

    function flush(fragmentByEnd, fragmentByStart) {
      for (var k in fragmentByEnd) {
        var f = fragmentByEnd[k];
        delete fragmentByStart[f.start];
        delete f.start;
        delete f.end;
        f.forEach(function(i) { stitchedArcs[i < 0 ? ~i : i] = 1; });
        fragments.push(f);
      }
    }

    flush(fragmentByEnd, fragmentByStart);
    flush(fragmentByStart, fragmentByEnd);
    arcs.forEach(function(i) { if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]); });

    return fragments;
  }

  function meshArcs(topology, o, filter) {
    var arcs = [];

    if (arguments.length > 1) {
      var geomsByArc = [],
          geom;

      function arc(i) {
        var j = i < 0 ? ~i : i;
        (geomsByArc[j] || (geomsByArc[j] = [])).push({i: i, g: geom});
      }

      function line(arcs) {
        arcs.forEach(arc);
      }

      function polygon(arcs) {
        arcs.forEach(line);
      }

      function geometry(o) {
        if (o.type === "GeometryCollection") o.geometries.forEach(geometry);
        else if (o.type in geometryType) geom = o, geometryType[o.type](o.arcs);
      }

      var geometryType = {
        LineString: line,
        MultiLineString: polygon,
        Polygon: polygon,
        MultiPolygon: function(arcs) { arcs.forEach(polygon); }
      };

      geometry(o);

      geomsByArc.forEach(arguments.length < 3
          ? function(geoms) { arcs.push(geoms[0].i); }
          : function(geoms) { if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i); });
    } else {
      for (var i = 0, n = topology.arcs.length; i < n; ++i) arcs.push(i);
    }

    return {type: "MultiLineString", arcs: stitchArcs(topology, arcs)};
  }

  function mergeArcs(topology, objects) {
    var polygonsByArc = {},
        polygons = [],
        components = [];

    objects.forEach(function(o) {
      if (o.type === "Polygon") register(o.arcs);
      else if (o.type === "MultiPolygon") o.arcs.forEach(register);
    });

    function register(polygon) {
      polygon.forEach(function(ring) {
        ring.forEach(function(arc) {
          (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);
        });
      });
      polygons.push(polygon);
    }

    function exterior(ring) {
      return cartesianRingArea(object(topology, {type: "Polygon", arcs: [ring]}).coordinates[0]) > 0; // TODO allow spherical?
    }

    polygons.forEach(function(polygon) {
      if (!polygon._) {
        var component = [],
            neighbors = [polygon];
        polygon._ = 1;
        components.push(component);
        while (polygon = neighbors.pop()) {
          component.push(polygon);
          polygon.forEach(function(ring) {
            ring.forEach(function(arc) {
              polygonsByArc[arc < 0 ? ~arc : arc].forEach(function(polygon) {
                if (!polygon._) {
                  polygon._ = 1;
                  neighbors.push(polygon);
                }
              });
            });
          });
        }
      }
    });

    polygons.forEach(function(polygon) {
      delete polygon._;
    });

    return {
      type: "MultiPolygon",
      arcs: components.map(function(polygons) {
        var arcs = [];

        // Extract the exterior (unique) arcs.
        polygons.forEach(function(polygon) {
          polygon.forEach(function(ring) {
            ring.forEach(function(arc) {
              if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {
                arcs.push(arc);
              }
            });
          });
        });

        // Stitch the arcs into one or more rings.
        arcs = stitchArcs(topology, arcs);

        // If more than one ring is returned,
        // at most one of these rings can be the exterior;
        // this exterior ring has the same winding order
        // as any exterior ring in the original polygons.
        if ((n = arcs.length) > 1) {
          var sgn = exterior(polygons[0][0]);
          for (var i = 0, t; i < n; ++i) {
            if (sgn === exterior(arcs[i])) {
              t = arcs[0], arcs[0] = arcs[i], arcs[i] = t;
              break;
            }
          }
        }

        return arcs;
      })
    };
  }

  function featureOrCollection(topology, o) {
    return o.type === "GeometryCollection" ? {
      type: "FeatureCollection",
      features: o.geometries.map(function(o) { return feature(topology, o); })
    } : feature(topology, o);
  }

  function feature(topology, o) {
    var f = {
      type: "Feature",
      id: o.id,
      properties: o.properties || {},
      geometry: object(topology, o)
    };
    if (o.id == null) delete f.id;
    return f;
  }

  function object(topology, o) {
    var absolute = transformAbsolute(topology.transform),
        arcs = topology.arcs;

    function arc(i, points) {
      if (points.length) points.pop();
      for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length, p; k < n; ++k) {
        points.push(p = a[k].slice());
        absolute(p, k);
      }
      if (i < 0) reverse(points, n);
    }

    function point(p) {
      p = p.slice();
      absolute(p, 0);
      return p;
    }

    function line(arcs) {
      var points = [];
      for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
      if (points.length < 2) points.push(points[0].slice());
      return points;
    }

    function ring(arcs) {
      var points = line(arcs);
      while (points.length < 4) points.push(points[0].slice());
      return points;
    }

    function polygon(arcs) {
      return arcs.map(ring);
    }

    function geometry(o) {
      var t = o.type;
      return t === "GeometryCollection" ? {type: t, geometries: o.geometries.map(geometry)}
          : t in geometryType ? {type: t, coordinates: geometryType[t](o)}
          : null;
    }

    var geometryType = {
      Point: function(o) { return point(o.coordinates); },
      MultiPoint: function(o) { return o.coordinates.map(point); },
      LineString: function(o) { return line(o.arcs); },
      MultiLineString: function(o) { return o.arcs.map(line); },
      Polygon: function(o) { return polygon(o.arcs); },
      MultiPolygon: function(o) { return o.arcs.map(polygon); }
    };

    return geometry(o);
  }

  function reverse(array, n) {
    var t, j = array.length, i = j - n; while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
  }

  function bisect(a, x) {
    var lo = 0, hi = a.length;
    while (lo < hi) {
      var mid = lo + hi >>> 1;
      if (a[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  function neighbors(objects) {
    var indexesByArc = {}, // arc index -> array of object indexes
        neighbors = objects.map(function() { return []; });

    function line(arcs, i) {
      arcs.forEach(function(a) {
        if (a < 0) a = ~a;
        var o = indexesByArc[a];
        if (o) o.push(i);
        else indexesByArc[a] = [i];
      });
    }

    function polygon(arcs, i) {
      arcs.forEach(function(arc) { line(arc, i); });
    }

    function geometry(o, i) {
      if (o.type === "GeometryCollection") o.geometries.forEach(function(o) { geometry(o, i); });
      else if (o.type in geometryType) geometryType[o.type](o.arcs, i);
    }

    var geometryType = {
      LineString: line,
      MultiLineString: polygon,
      Polygon: polygon,
      MultiPolygon: function(arcs, i) { arcs.forEach(function(arc) { polygon(arc, i); }); }
    };

    objects.forEach(geometry);

    for (var i in indexesByArc) {
      for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
        for (var k = j + 1; k < m; ++k) {
          var ij = indexes[j], ik = indexes[k], n;
          if ((n = neighbors[ij])[i = bisect(n, ik)] !== ik) n.splice(i, 0, ik);
          if ((n = neighbors[ik])[i = bisect(n, ij)] !== ij) n.splice(i, 0, ij);
        }
      }
    }

    return neighbors;
  }

  function presimplify(topology, triangleArea) {
    var absolute = transformAbsolute(topology.transform),
        relative = transformRelative(topology.transform),
        heap = minAreaHeap(),
        maxArea = 0,
        triangle;

    if (!triangleArea) triangleArea = cartesianTriangleArea;

    topology.arcs.forEach(function(arc) {
      var triangles = [];

      arc.forEach(absolute);

      for (var i = 1, n = arc.length - 1; i < n; ++i) {
        triangle = arc.slice(i - 1, i + 2);
        triangle[1][2] = triangleArea(triangle);
        triangles.push(triangle);
        heap.push(triangle);
      }

      // Always keep the arc endpoints!
      arc[0][2] = arc[n][2] = Infinity;

      for (var i = 0, n = triangles.length; i < n; ++i) {
        triangle = triangles[i];
        triangle.previous = triangles[i - 1];
        triangle.next = triangles[i + 1];
      }
    });

    while (triangle = heap.pop()) {
      var previous = triangle.previous,
          next = triangle.next;

      // If the area of the current point is less than that of the previous point
      // to be eliminated, use the latter's area instead. This ensures that the
      // current point cannot be eliminated without eliminating previously-
      // eliminated points.
      if (triangle[1][2] < maxArea) triangle[1][2] = maxArea;
      else maxArea = triangle[1][2];

      if (previous) {
        previous.next = next;
        previous[2] = triangle[2];
        update(previous);
      }

      if (next) {
        next.previous = previous;
        next[0] = triangle[0];
        update(next);
      }
    }

    topology.arcs.forEach(function(arc) {
      arc.forEach(relative);
    });

    function update(triangle) {
      heap.remove(triangle);
      triangle[1][2] = triangleArea(triangle);
      heap.push(triangle);
    }

    return topology;
  };

  function cartesianRingArea(ring) {
    var i = -1,
        n = ring.length,
        a,
        b = ring[n - 1],
        area = 0;

    while (++i < n) {
      a = b;
      b = ring[i];
      area += a[0] * b[1] - a[1] * b[0];
    }

    return area * .5;
  }

  function cartesianTriangleArea(triangle) {
    var a = triangle[0], b = triangle[1], c = triangle[2];
    return Math.abs((a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]));
  }

  function compareArea(a, b) {
    return a[1][2] - b[1][2];
  }

  function minAreaHeap() {
    var heap = {},
        array = [],
        size = 0;

    heap.push = function(object) {
      up(array[object._ = size] = object, size++);
      return size;
    };

    heap.pop = function() {
      if (size <= 0) return;
      var removed = array[0], object;
      if (--size > 0) object = array[size], down(array[object._ = 0] = object, 0);
      return removed;
    };

    heap.remove = function(removed) {
      var i = removed._, object;
      if (array[i] !== removed) return; // invalid request
      if (i !== --size) object = array[size], (compareArea(object, removed) < 0 ? up : down)(array[object._ = i] = object, i);
      return i;
    };

    function up(object, i) {
      while (i > 0) {
        var j = ((i + 1) >> 1) - 1,
            parent = array[j];
        if (compareArea(object, parent) >= 0) break;
        array[parent._ = i] = parent;
        array[object._ = i = j] = object;
      }
    }

    function down(object, i) {
      while (true) {
        var r = (i + 1) << 1,
            l = r - 1,
            j = i,
            child = array[j];
        if (l < size && compareArea(array[l], child) < 0) child = array[j = l];
        if (r < size && compareArea(array[r], child) < 0) child = array[j = r];
        if (j === i) break;
        array[child._ = i] = child;
        array[object._ = i = j] = object;
      }
    }

    return heap;
  }

  function transformAbsolute(transform) {
    if (!transform) return noop;
    var x0,
        y0,
        kx = transform.scale[0],
        ky = transform.scale[1],
        dx = transform.translate[0],
        dy = transform.translate[1];
    return function(point, i) {
      if (!i) x0 = y0 = 0;
      point[0] = (x0 += point[0]) * kx + dx;
      point[1] = (y0 += point[1]) * ky + dy;
    };
  }

  function transformRelative(transform) {
    if (!transform) return noop;
    var x0,
        y0,
        kx = transform.scale[0],
        ky = transform.scale[1],
        dx = transform.translate[0],
        dy = transform.translate[1];
    return function(point, i) {
      if (!i) x0 = y0 = 0;
      var x1 = (point[0] - dx) / kx | 0,
          y1 = (point[1] - dy) / ky | 0;
      point[0] = x1 - x0;
      point[1] = y1 - y0;
      x0 = x1;
      y0 = y1;
    };
  }

  function noop() {}

  if (typeof define === "function" && define.amd) define(topojson);
  else if (typeof module === "object" && module.exports) module.exports = topojson;
  else this.topojson = topojson;
}();

},{}],41:[function(_dereq_,module,exports){
module.exports = parse;
module.exports.parse = parse;
module.exports.stringify = stringify;

 /*
 * Parse WKT and return GeoJSON.
 *
 * @param {string} _ A WKT geometry
 * @return {?Object} A GeoJSON geometry object
 */
function parse(_) {
    var parts = _.split(";"),
        _ = parts.pop(),
        srid = (parts.shift() || "").split("=").pop();

    var i = 0;

    function $(re) {
        var match = _.substring(i).match(re);
        if (!match) return null;
        else {
            i += match[0].length;
            return match[0];
        }
    }

    function crs(obj) {
        if (obj && srid.match(/\d+/)) {
            obj.crs = {
                type: 'name',
                properties: {
                    name: 'urn:ogc:def:crs:EPSG::' + srid
                }
            };
        }

        return obj;
    }

    function white() { $(/^\s*/); }

    function multicoords() {
        white();
        var depth = 0, rings = [], stack = [rings],
            pointer = rings, elem;

        while (elem =
            $(/^(\()/) ||
            $(/^(\))/) ||
            $(/^(\,)/) ||
            $(/^[-+]?([0-9]*\.[0-9]+|[0-9]+)/)) {
            if (elem == '(') {
                stack.push(pointer);
                pointer = [];
                stack[stack.length - 1].push(pointer);
                depth++;
            } else if (elem == ')') {
                pointer = stack.pop();
                // the stack was empty, input was malformed
                if (!pointer) return;
                depth--;
                if (depth === 0) break;
            } else if (elem === ',') {
                pointer = [];
                stack[stack.length - 1].push(pointer);
            } else if (!isNaN(parseFloat(elem))) {
                pointer.push(parseFloat(elem));
            } else {
                return null;
            }
            white();
        }

        if (depth !== 0) return null;
        return rings;
    }

    function coords() {
        var list = [], item, pt;
        while (pt =
            $(/^[-+]?([0-9]*\.[0-9]+|[0-9]+)/) ||
            $(/^(\,)/)) {
            if (pt == ',') {
                list.push(item);
                item = [];
            } else {
                if (!item) item = [];
                item.push(parseFloat(pt));
            }
            white();
        }
        if (item) list.push(item);
        return list.length ? list : null;
    }

    function point() {
        if (!$(/^(point)/i)) return null;
        white();
        if (!$(/^(\()/)) return null;
        var c = coords();
        if (!c) return null;
        white();
        if (!$(/^(\))/)) return null;
        return {
            type: 'Point',
            coordinates: c[0]
        };
    }

    function multipoint() {
        if (!$(/^(multipoint)/i)) return null;
        white();
        var c = multicoords();
        if (!c) return null;
        white();
        return {
            type: 'MultiPoint',
            coordinates: c
        };
    }

    function multilinestring() {
        if (!$(/^(multilinestring)/i)) return null;
        white();
        var c = multicoords();
        if (!c) return null;
        white();
        return {
            type: 'MultiLineString',
            coordinates: c
        };
    }

    function linestring() {
        if (!$(/^(linestring)/i)) return null;
        white();
        if (!$(/^(\()/)) return null;
        var c = coords();
        if (!c) return null;
        if (!$(/^(\))/)) return null;
        return {
            type: 'LineString',
            coordinates: c
        };
    }

    function polygon() {
        if (!$(/^(polygon)/i)) return null;
        white();
        return {
            type: 'Polygon',
            coordinates: multicoords()
        };
    }

    function multipolygon() {
        if (!$(/^(multipolygon)/i)) return null;
        white();
        return {
            type: 'MultiPolygon',
            coordinates: multicoords()
        };
    }

    function geometrycollection() {
        var geometries = [], geometry;

        if (!$(/^(geometrycollection)/i)) return null;
        white();

        if (!$(/^(\()/)) return null;
        while (geometry = root()) {
            geometries.push(geometry);
            white();
            $(/^(\,)/);
            white();
        }
        if (!$(/^(\))/)) return null;

        return {
            type: 'GeometryCollection',
            geometries: geometries
        };
    }

    function root() {
        return point() ||
            linestring() ||
            polygon() ||
            multipoint() ||
            multilinestring() ||
            multipolygon() ||
            geometrycollection();
    }

    return crs(root());
}

/**
 * Stringifies a GeoJSON object into WKT
 */
function stringify(gj) {
    if (gj.type === 'Feature') {
        gj = gj.geometry;
    }

    function pairWKT(c) {
        if (c.length === 2) {
            return c[0] + ' ' + c[1];
        } else if (c.length === 3) {
            return c[0] + ' ' + c[1] + ' ' + c[2];
        }
    }

    function ringWKT(r) {
        return r.map(pairWKT).join(', ');
    }

    function ringsWKT(r) {
        return r.map(ringWKT).map(wrapParens).join(', ');
    }

    function multiRingsWKT(r) {
        return r.map(ringsWKT).map(wrapParens).join(', ');
    }

    function wrapParens(s) { return '(' + s + ')'; }

    switch (gj.type) {
        case 'Point':
            return 'POINT (' + pairWKT(gj.coordinates) + ')';
        case 'LineString':
            return 'LINESTRING (' + ringWKT(gj.coordinates) + ')';
        case 'Polygon':
            return 'POLYGON (' + ringsWKT(gj.coordinates) + ')';
        case 'MultiPoint':
            return 'MULTIPOINT (' + ringWKT(gj.coordinates) + ')';
        case 'MultiPolygon':
            return 'MULTIPOLYGON (' + multiRingsWKT(gj.coordinates) + ')';
        case 'MultiLineString':
            return 'MULTILINESTRING (' + ringsWKT(gj.coordinates) + ')';
        case 'GeometryCollection':
            return 'GEOMETRYCOLLECTION (' + gj.geometries.map(stringify).join(', ') + ')';
        default:
            throw new Error('stringify requires a valid GeoJSON Feature or geometry object as input');
    }
}

},{}]},{},[1])
(1)
});
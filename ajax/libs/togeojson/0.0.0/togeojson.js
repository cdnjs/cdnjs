toGeoJSON = {
    kml: function(doc) {
        function get(x, y) { return x.getElementsByTagName(y); }
        var gj = { type: 'FeatureCollection', features: [] },
            geotypes = ['Polygon', 'LineString', 'Point'],
            removeSpace = (/\s*/g),
            trimSpace = (/^\s*|\s*$/g), splitSpace = (/\s+/),
            placemarks = get(doc, 'Placemark');

        for (var j = 0; j < placemarks.length; j++) {
            gj.features = gj.features.concat(getPlacemark(placemarks[j]));
        }

        function get1(x, y) { var n = get(x, y); return n.length ? n[0] : null; }
        function numarray(x) {
            for (var j = 0, o = []; j < x.length; j++) o[j] = parseFloat(x[j]);
            return o;
        }
        function nodeVal(x) { return x && x.firstChild.nodeValue; }
        function coord1(v) { return numarray(v.replace(removeSpace, '').split(',')); }
        function coord(v) {
            var coords = v.replace(trimSpace, '').split(splitSpace), o = [];
            for (var i = 0; i < coords.length; i++) o.push(coord1(coords[i]));
            return o;
        }

        function getGeometry(root) {
            var geomNode, i;
            for (i = 0; i < geotypes.length; i++) {
                if (geomNode = get1(root, geotypes[i])) {
                    if (geotypes[i] == 'Point') {
                        return { type: 'Point',
                            coordinates: coord1(nodeVal(get1(geomNode, 'coordinates')))
                        };
                    } else if (geotypes[i] == 'LineString') {
                        return { type: 'LineString',
                            coordinates: coord(nodeVal(get1(geomNode, 'coordinates')))
                        };
                    } else if (geotypes[i] == 'Polygon') {
                        var rings = get(geomNode, 'LinearRing'), coords = [];
                        for (var k = 0; k < rings.length; k++) {
                            coords.push(coord(nodeVal(get1(rings[k], 'coordinates'))));
                        }
                        return { type: 'Polygon', coordinates: coords };
                    }
                }
            }
        }

        function getPlacemark(root, georoot) {
            var geometry = getGeometry(georoot || root),
                i, properties = {},
                name = nodeVal(get1(root, 'name')),
                description = nodeVal(get1(root, 'description')),
                extendedData = get1(root, 'ExtendedData');
            if (!georoot && !geometry) return false;
            if (name) properties.name = name;
            if (description) properties.description = description;
            if (extendedData) {
                var datas = get(extendedData, 'Data');
                for (i = 0; i < datas.length; i++)
                    properties[datas[i].getAttribute('name')] = nodeVal(get1(datas[i], 'value'));
            }
            return { geometry: geometry, properties: properties };
        }

        return gj;
    }
};

if (typeof module !== 'undefined') module.exports = toGeoJSON;

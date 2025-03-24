/*!
 * DevExtreme (dx.vectormaputils.debug.js)
 * Version: 24.1.7
 * Build date: Wed Oct 30 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
! function(root, factory) {
    if ("function" === typeof define && define.amd) {
        define((function(require, exports, module) {
            factory(exports)
        }))
    } else if ("object" === typeof module && module.exports) {
        factory(exports)
    } else {
        var exports = root.DevExpress = root.DevExpress || {};
        exports = exports.viz = exports.viz || {};
        exports = exports.vectormaputils = {};
        factory(exports)
    }
}(this, (function(exports) {
    function noop() {}

    function eigen(x) {
        return x
    }

    function isFunction(target) {
        return "function" === typeof target
    }

    function wrapSource(source) {
        var buffer = (arrayBuffer = source, new DataView(arrayBuffer));
        var arrayBuffer;
        var position = 0;
        var stream = {
            pos: function() {
                return position
            },
            skip: function(count) {
                position += count;
                return stream
            },
            ui8arr: function(length) {
                var i = 0;
                var list = [];
                list.length = length;
                for (; i < length; ++i) {
                    list[i] = stream.ui8()
                }
                return list
            },
            ui8: function() {
                var val = function(stream, position) {
                    return stream.getUint8(position)
                }(buffer, position);
                position += 1;
                return val
            },
            ui16LE: function() {
                var val = function(stream, position) {
                    return stream.getUint16(position, true)
                }(buffer, position);
                position += 2;
                return val
            },
            ui32LE: function() {
                var val = function(stream, position) {
                    return stream.getUint32(position, true)
                }(buffer, position);
                position += 4;
                return val
            },
            ui32BE: function() {
                var val = function(stream, position) {
                    return stream.getUint32(position, false)
                }(buffer, position);
                position += 4;
                return val
            },
            f64LE: function() {
                var val = function(stream, position) {
                    return stream.getFloat64(position, true)
                }(buffer, position);
                position += 8;
                return val
            }
        };
        return stream
    }

    function parseCore(source, roundCoordinates, errors) {
        var shapeData = source[0] ? function(stream, errors) {
            var timeStart;
            var timeEnd;
            var header;
            var records = [];
            var record;
            try {
                timeStart = new Date;
                header = function(stream) {
                    var header = {};
                    header.fileCode = stream.ui32BE();
                    stream.skip(20);
                    header.fileLength = stream.ui32BE() << 1;
                    header.version = stream.ui32LE();
                    header.type_number = stream.ui32LE();
                    header.type = SHP_TYPES[header.type_number];
                    header.bBox_XY = readBBox(stream);
                    header.bBox_ZM = readPointArray(stream, 2);
                    return header
                }(stream)
            } catch (e) {
                errors.push("shp: header parsing error: " + e.message + " / " + e.description);
                return
            }
            if (9994 !== header.fileCode) {
                errors.push("shp: file code: " + header.fileCode + " / expected: 9994")
            }
            if (1e3 !== header.version) {
                errors.push("shp: file version: " + header.version + " / expected: 1000")
            }
            try {
                while (stream.pos() < header.fileLength) {
                    record = parseShapeRecord(stream, header.type, errors);
                    if (record) {
                        records.push(record)
                    } else {
                        break
                    }
                }
                if (stream.pos() !== header.fileLength) {
                    errors.push("shp: file length: " + header.fileLength + " / actual: " + stream.pos())
                }
                timeEnd = new Date
            } catch (e) {
                errors.push("shp: records parsing error: " + e.message + " / " + e.description)
            }
            return {
                bBox: header.bBox_XY,
                type: header.shapeType,
                shapes: records,
                errors: errors,
                time: timeEnd - timeStart
            }
        }(wrapSource(source[0]), errors) : {};
        var dataBaseFileData = source[1] ? function(stream, errors) {
            var timeStart;
            var timeEnd;
            var header;
            var parseData;
            var records;
            try {
                timeStart = new Date;
                header = function(stream, errors) {
                    var i;
                    var header = {
                        versionNumber: stream.ui8(),
                        lastUpdate: new Date(1900 + stream.ui8(), stream.ui8() - 1, stream.ui8()),
                        numberOfRecords: stream.ui32LE(),
                        headerLength: stream.ui16LE(),
                        recordLength: stream.ui16LE(),
                        fields: []
                    };
                    var term;
                    stream.skip(20);
                    for (i = (header.headerLength - stream.pos() - 1) / 32; i > 0; --i) {
                        header.fields.push(parseFieldDescriptor(stream))
                    }
                    term = stream.ui8();
                    if (13 !== term) {
                        errors.push("dbf: header terminator: " + term + " / expected: 13")
                    }
                    return header
                }(stream, errors);
                parseData = function(header, errors) {
                    var list = [];
                    var i = 0;
                    var ii = header.fields.length;
                    var item;
                    var field;
                    var totalLength = 0;
                    for (i = 0; i < ii; ++i) {
                        field = header.fields[i];
                        item = {
                            name: field.name,
                            parser: DBF_FIELD_PARSERS[field.type],
                            length: field.length
                        };
                        if (!item.parser) {
                            item.parser = DBF_FIELD_PARSER_DEFAULT;
                            errors.push("dbf: field " + field.name + " type: " + field.type + " / unknown")
                        }
                        totalLength += field.length;
                        list.push(item)
                    }
                    if (totalLength + 1 !== header.recordLength) {
                        errors.push("dbf: record length: " + header.recordLength + " / actual: " + (totalLength + 1))
                    }
                    return list
                }(header, errors);
                records = function(stream, recordCount, recordLength, parseData, errors) {
                    var i;
                    var j;
                    var jj = parseData.length;
                    var pos;
                    var records = [];
                    var record;
                    var pd;
                    for (i = 0; i < recordCount; ++i) {
                        record = {};
                        pos = stream.pos();
                        stream.skip(1);
                        for (j = 0; j < jj; ++j) {
                            pd = parseData[j];
                            record[pd.name] = pd.parser(stream, pd.length)
                        }
                        pos = stream.pos() - pos;
                        if (pos !== recordLength) {
                            errors.push("dbf: record #" + (i + 1) + " length: " + recordLength + " / actual: " + pos)
                        }
                        records.push(record)
                    }
                    return records
                }(stream, header.numberOfRecords, header.recordLength, parseData, errors);
                timeEnd = new Date
            } catch (e) {
                errors.push("dbf: parsing error: " + e.message + " / " + e.description)
            }
            return {
                records: records,
                errors: errors,
                time: timeEnd - timeStart
            }
        }(wrapSource(source[1]), errors) : {};
        var features = function(shapeData, dataBaseFileData, roundCoordinates) {
            var features = [];
            var i;
            var ii = features.length = Math.max(shapeData.length, dataBaseFileData.length);
            var shape;
            for (i = 0; i < ii; ++i) {
                shape = shapeData[i] || {};
                features[i] = {
                    type: "Feature",
                    geometry: {
                        type: shape.geoJSON_type || null,
                        coordinates: shape.coordinates ? roundCoordinates(shape.coordinates) : []
                    },
                    properties: dataBaseFileData[i] || null
                }
            }
            return features
        }(shapeData.shapes || [], dataBaseFileData.records || [], roundCoordinates);
        var result;
        if (features.length) {
            result = {
                type: "FeatureCollection",
                features: features
            };
            result.bbox = shapeData.bBox
        } else {
            result = null
        }
        return result
    }

    function buildParseArgs(source) {
        source = source || {};
        return ["shp", "dbf"].map((function(key) {
            return function(done) {
                if (source.substr) {
                    key = "." + key;
                    ! function(url, callback) {
                        var request = new XMLHttpRequest;
                        request.addEventListener("load", (function() {
                            callback(this.response ? null : this.statusText, this.response)
                        }));
                        request.open("GET", url);
                        request.responseType = "arraybuffer";
                        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                        request.send(null)
                    }(source + (source.substr(-key.length).toLowerCase() === key ? "" : key), (function(e, response) {
                        done(e, response)
                    }))
                } else {
                    done(null, source[key] || null)
                }
            }
        }))
    }
    exports.parse = function(source, parameters, callback) {
        var result;
        ! function(actions, callback) {
            var errorArray = [];
            var dataArray = [];
            var counter = 1;
            var lock = true;
            actions.forEach((function(action, i) {
                ++counter;
                action((function(e, data) {
                    errorArray[i] = e;
                    dataArray[i] = data;
                    massDone()
                }))
            }));
            lock = false;
            massDone();

            function massDone() {
                --counter;
                if (0 === counter && !lock) {
                    callback(errorArray, dataArray)
                }
            }
        }(buildParseArgs(source), (function(errorArray, dataArray) {
            callback = isFunction(parameters) && parameters || isFunction(callback) && callback || noop;
            parameters = !isFunction(parameters) && parameters || {};
            var errors = [];
            errorArray.forEach((function(e) {
                e && errors.push(e)
            }));
            result = parseCore(dataArray, parameters.precision >= 0 ? function(precision) {
                var factor = Number("1E" + precision);

                function round(x) {
                    return Math.round(x * factor) / factor
                }
                return function process(values) {
                    return values.map(values[0].length ? process : round)
                }
            }(parameters.precision) : eigen, errors);
            callback(result, errors.length ? errors : null)
        }));
        return result
    };

    function readPolyLineShape(stream, record) {
        var bBox = readBBox(stream);
        var numParts = readInteger(stream);
        var numPoints = readInteger(stream);
        var parts = readIntegerArray(stream, numParts);
        var points = readPointArray(stream, numPoints);
        var rings = [];
        var i;
        rings.length = numParts;
        for (i = 0; i < numParts; ++i) {
            rings[i] = points.slice(parts[i], parts[i + 1] || numPoints)
        }
        record.bBox = bBox;
        record.coordinates = rings
    }

    function readPolyLineMShape(stream, record) {
        var bBox = readBBox(stream);
        var numParts = readInteger(stream);
        var numPoints = readInteger(stream);
        var parts = readIntegerArray(stream, numParts);
        var points = readPointArray(stream, numPoints);
        var mBox = readPair(stream);
        var mValues = readDoubleArray(stream, numPoints);
        var rings = [];
        var i;
        var from;
        var to;
        rings.length = numParts;
        for (i = 0; i < numParts; ++i) {
            from = parts[i];
            to = parts[i + 1] || numPoints;
            rings[i] = merge_XYM(points.slice(from, to), mValues.slice(from, to), to - from)
        }
        record.bBox = bBox;
        record.mBox = mBox;
        record.coordinates = rings
    }

    function readPolyLineZShape(stream, record) {
        var bBox = readBBox(stream);
        var numParts = readInteger(stream);
        var numPoints = readInteger(stream);
        var parts = readIntegerArray(stream, numParts);
        var points = readPointArray(stream, numPoints);
        var zBox = readPair(stream);
        var zValues = readDoubleArray(stream, numPoints);
        var mBox = readPair(stream);
        var mValues = readDoubleArray(stream, numPoints);
        var rings = [];
        var i;
        var from;
        var to;
        rings.length = numParts;
        for (i = 0; i < numParts; ++i) {
            from = parts[i];
            to = parts[i + 1] || numPoints;
            rings[i] = merge_XYZM(points.slice(from, to), zValues.slice(from, to), mValues.slice(from, to), to - from)
        }
        record.bBox = bBox;
        record.zBox = zBox;
        record.mBox = mBox;
        record.coordinates = rings
    }
    var SHP_TYPES = {
        0: "Null",
        1: "Point",
        3: "PolyLine",
        5: "Polygon",
        8: "MultiPoint",
        11: "PointZ",
        13: "PolyLineZ",
        15: "PolygonZ",
        18: "MultiPointZ",
        21: "PointM",
        23: "PolyLineM",
        25: "PolygonM",
        28: "MultiPointM",
        31: "MultiPatch"
    };
    var SHP_RECORD_PARSERS = {
        0: noop,
        1: function(stream, record) {
            record.coordinates = readPointArray(stream, 1)[0]
        },
        3: readPolyLineShape,
        5: readPolyLineShape,
        8: function(stream, record) {
            record.bBox = readBBox(stream);
            record.coordinates = readPointArray(stream, readInteger(stream))
        },
        11: function(stream, record) {
            record.coordinates = readPointArray(stream, 1)[0];
            record.push(readDoubleArray(stream, 1)[0], readDoubleArray(stream, 1)[0])
        },
        13: readPolyLineZShape,
        15: readPolyLineZShape,
        18: function(stream, record) {
            var bBox = readBBox(stream);
            var numPoints = readInteger(stream);
            var points = readPointArray(stream, numPoints);
            var zBox = readPair(stream);
            var zValues = readDoubleArray(stream, numPoints);
            var mBox = readPair(stream);
            var mValue = readDoubleArray(stream, numPoints);
            record.bBox = bBox;
            record.zBox = zBox;
            record.mBox = mBox;
            record.coordinates = merge_XYZM(points, zValues, mValue, numPoints)
        },
        21: function(stream, record) {
            record.coordinates = readPointArray(stream, 1)[0];
            record.coordinates.push(readDoubleArray(stream, 1)[0])
        },
        23: readPolyLineMShape,
        25: readPolyLineMShape,
        28: function(stream, record) {
            var bBox = readBBox(stream);
            var numPoints = readInteger(stream);
            var points = readPointArray(stream, numPoints);
            var mBox = readPair(stream);
            var mValues = readDoubleArray(stream, numPoints);
            record.bBox = bBox;
            record.mBox = mBox;
            record.coordinates = merge_XYM(points, mValues, numPoints)
        },
        31: function(stream, record) {
            var bBox = readBBox(stream);
            var numParts = readInteger(stream);
            var numPoints = readInteger(stream);
            var parts = readIntegerArray(stream, numParts);
            var partTypes = readIntegerArray(stream, numParts);
            var points = readPointArray(stream, numPoints);
            var zBox = readPair(stream);
            var zValues = readDoubleArray(stream, numPoints);
            var mBox = readPair(stream);
            var rings = [];
            var i;
            var from;
            var to;
            rings.length = numParts;
            for (i = 0; i < numParts; ++i) {
                from = parts[i];
                to = parts[i + 1] || numPoints;
                rings[i] = merge_XYZM(points.slice(from, to), zValues.slice(from, to), mValues.slice(from, to), to - from)
            }
            record.bBox = bBox;
            record.zBox = zBox;
            record.mBox = mBox;
            record.types = partTypes;
            record.coordinates = rings
        }
    };
    var SHP_TYPE_TO_GEOJSON_TYPE_MAP = {
        Null: "Null",
        Point: "Point",
        PolyLine: "MultiLineString",
        Polygon: "Polygon",
        MultiPoint: "MultiPoint",
        PointZ: "Point",
        PolyLineZ: "MultiLineString",
        PolygonZ: "Polygon",
        MultiPointZ: "MultiPoint",
        PointM: "Point",
        PolyLineM: "MultiLineString",
        PolygonM: "Polygon",
        MultiPointM: "MultiPoint",
        MultiPatch: "MultiPatch"
    };

    function readInteger(stream) {
        return stream.ui32LE()
    }

    function readIntegerArray(stream, length) {
        var array = [];
        var i;
        array.length = length;
        for (i = 0; i < length; ++i) {
            array[i] = readInteger(stream)
        }
        return array
    }

    function readDoubleArray(stream, length) {
        var array = [];
        var i;
        array.length = length;
        for (i = 0; i < length; ++i) {
            array[i] = stream.f64LE()
        }
        return array
    }

    function readBBox(stream) {
        return readDoubleArray(stream, 4)
    }

    function readPair(stream) {
        return [stream.f64LE(), stream.f64LE()]
    }

    function readPointArray(stream, count) {
        var points = [];
        var i;
        points.length = count;
        for (i = 0; i < count; ++i) {
            points[i] = readPair(stream)
        }
        return points
    }

    function merge_XYM(xy, m, length) {
        var array = [];
        var i;
        array.length = length;
        for (i = 0; i < length; ++i) {
            array[i] = [xy[i][0], xy[i][1], m[i]]
        }
        return array
    }

    function merge_XYZM(xy, z, m, length) {
        var array = [];
        var i;
        array.length = length;
        for (i = 0; i < length; ++i) {
            array[i] = [xy[i][0], xy[i][1], z[i], m[i]]
        }
        return array
    }

    function parseShapeRecord(stream, generalType, errors) {
        var record = {
            number: stream.ui32BE()
        };
        var length = stream.ui32BE() << 1;
        var pos = stream.pos();
        var type = stream.ui32LE();
        record.type_number = type;
        record.type = SHP_TYPES[type];
        record.geoJSON_type = SHP_TYPE_TO_GEOJSON_TYPE_MAP[record.type];
        if (record.type) {
            if (record.type !== generalType) {
                errors.push("shp: shape #" + record.number + " type: " + record.type + " / expected: " + generalType)
            }
            SHP_RECORD_PARSERS[type](stream, record);
            pos = stream.pos() - pos;
            if (pos !== length) {
                errors.push("shp: shape #" + record.number + " length: " + length + " / actual: " + pos)
            }
        } else {
            errors.push("shp: shape #" + record.number + " type: " + type + " / unknown");
            record = null
        }
        return record
    }
    var _fromCharCode = String.fromCharCode;

    function getAsciiString(stream, length) {
        return _fromCharCode.apply(null, stream.ui8arr(length))
    }

    function parseFieldDescriptor(stream) {
        var desc = {
            name: getAsciiString(stream, 11).replace(/\0*$/gi, ""),
            type: _fromCharCode(stream.ui8()),
            length: stream.skip(4).ui8(),
            count: stream.ui8()
        };
        stream.skip(14);
        return desc
    }
    var DBF_FIELD_PARSERS = {
        C: function(stream, length) {
            var str = getAsciiString(stream, length);
            try {
                str = decodeURIComponent(escape(str))
            } catch (e) {}
            return str.trim()
        },
        N: function(stream, length) {
            var str = getAsciiString(stream, length);
            return parseFloat(str)
        },
        D: function(stream, length) {
            var str = getAsciiString(stream, length);
            return new Date(str.substring(0, 4), str.substring(4, 6) - 1, str.substring(6, 8))
        }
    };

    function DBF_FIELD_PARSER_DEFAULT(stream, length) {
        stream.skip(length);
        return null
    }
}));

/*!
 * DevExtreme (dx.vectormaputils.node.js)
 * Version: 24.1.7
 * Build date: Wed Oct 30 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

function noop() {}

function eigen(x) {
    return x
}

function isFunction(target) {
    return "function" === typeof target
}

function wrapSource(source) {
    var buffer = wrapBuffer(source);
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
            var val = ui8(buffer, position);
            position += 1;
            return val
        },
        ui16LE: function() {
            var val = ui16LE(buffer, position);
            position += 2;
            return val
        },
        ui32LE: function() {
            var val = ui32LE(buffer, position);
            position += 4;
            return val
        },
        ui32BE: function() {
            var val = ui32BE(buffer, position);
            position += 4;
            return val
        },
        f64LE: function() {
            var val = f64LE(buffer, position);
            position += 8;
            return val
        }
    };
    return stream
}

function parseCore(source, roundCoordinates, errors) {
    var shapeData = source[0] ? parseShape(wrapSource(source[0]), errors) : {};
    var dataBaseFileData = source[1] ? parseDBF(wrapSource(source[1]), errors) : {};
    var features = buildFeatures(shapeData.shapes || [], dataBaseFileData.records || [], roundCoordinates);
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

function buildFeatures(shapeData, dataBaseFileData, roundCoordinates) {
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
}

function createCoordinatesRounder(precision) {
    var factor = Number("1E" + precision);

    function round(x) {
        return Math.round(x * factor) / factor
    }
    return function process(values) {
        return values.map(values[0].length ? process : round)
    }
}

function buildParseArgs(source) {
    source = source || {};
    return ["shp", "dbf"].map((function(key) {
        return function(done) {
            if (source.substr) {
                key = "." + key;
                sendRequest(source + (source.substr(-key.length).toLowerCase() === key ? "" : key), (function(e, response) {
                    done(e, response)
                }))
            } else {
                done(null, source[key] || null)
            }
        }
    }))
}

function parse(source, parameters, callback) {
    var result;
    when(buildParseArgs(source), (function(errorArray, dataArray) {
        callback = isFunction(parameters) && parameters || isFunction(callback) && callback || noop;
        parameters = !isFunction(parameters) && parameters || {};
        var errors = [];
        errorArray.forEach((function(e) {
            e && errors.push(e)
        }));
        result = parseCore(dataArray, parameters.precision >= 0 ? createCoordinatesRounder(parameters.precision) : eigen, errors);
        callback(result, errors.length ? errors : null)
    }));
    return result
}
exports.parse = parse;

function when(actions, callback) {
    var errorArray = [];
    var dataArray = [];
    var counter = 1;
    actions.forEach((function(action, i) {
        ++counter;
        action((function(e, data) {
            errorArray[i] = e;
            dataArray[i] = data;
            massDone()
        }))
    }));
    false;
    massDone();

    function massDone() {
        --counter;
        if (0 === counter && true) {
            callback(errorArray, dataArray)
        }
    }
}

function parseShape(stream, errors) {
    var timeStart;
    var timeEnd;
    var header;
    var records = [];
    var record;
    try {
        timeStart = new Date;
        header = parseShapeHeader(stream)
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
}

function readPointShape(stream, record) {
    record.coordinates = readPointArray(stream, 1)[0]
}

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

function readMultiPointShape(stream, record) {
    record.bBox = readBBox(stream);
    record.coordinates = readPointArray(stream, readInteger(stream))
}

function readPointMShape(stream, record) {
    record.coordinates = readPointArray(stream, 1)[0];
    record.coordinates.push(readDoubleArray(stream, 1)[0])
}

function readMultiPointMShape(stream, record) {
    var bBox = readBBox(stream);
    var numPoints = readInteger(stream);
    var points = readPointArray(stream, numPoints);
    var mBox = readPair(stream);
    var mValues = readDoubleArray(stream, numPoints);
    record.bBox = bBox;
    record.mBox = mBox;
    record.coordinates = merge_XYM(points, mValues, numPoints)
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

function readPointZShape(stream, record) {
    record.coordinates = readPointArray(stream, 1)[0];
    record.push(readDoubleArray(stream, 1)[0], readDoubleArray(stream, 1)[0])
}

function readMultiPointZShape(stream, record) {
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

function readMultiPatchShape(stream, record) {
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
    1: readPointShape,
    3: readPolyLineShape,
    5: readPolyLineShape,
    8: readMultiPointShape,
    11: readPointZShape,
    13: readPolyLineZShape,
    15: readPolyLineZShape,
    18: readMultiPointZShape,
    21: readPointMShape,
    23: readPolyLineMShape,
    25: readPolyLineMShape,
    28: readMultiPointMShape,
    31: readMultiPatchShape
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

function parseShapeHeader(stream) {
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
}

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

function parseDBF(stream, errors) {
    var timeStart;
    var timeEnd;
    var header;
    var parseData;
    var records;
    try {
        timeStart = new Date;
        header = parseDataBaseFileHeader(stream, errors);
        parseData = prepareDataBaseFileRecordParseData(header, errors);
        records = parseDataBaseFileRecords(stream, header.numberOfRecords, header.recordLength, parseData, errors);
        timeEnd = new Date
    } catch (e) {
        errors.push("dbf: parsing error: " + e.message + " / " + e.description)
    }
    return {
        records: records,
        errors: errors,
        time: timeEnd - timeStart
    }
}

function parseDataBaseFileHeader(stream, errors) {
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

function prepareDataBaseFileRecordParseData(header, errors) {
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
}

function parseDataBaseFileRecords(stream, recordCount, recordLength, parseData, errors) {
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
}

function wrapBuffer(buffer) {
    return buffer
}

function ui8(stream, position) {
    return stream[position]
}

function ui16LE(stream, position) {
    return stream.readUInt16LE(position)
}

function ui32LE(stream, position) {
    return stream.readUInt32LE(position)
}

function ui32BE(stream, position) {
    return stream.readUInt32BE(position)
}

function f64LE(stream, position) {
    return stream.readDoubleLE(position)
}
var fs = require("fs");

function sendRequest(path, callback) {
    fs.readFile(path, callback)
}
var path = require("path");

function normalizeJsName(value) {
    return value.trim().replace("-", "_").replace(" ", "_")
}

function processFile(file, options, callback) {
    var name = path.basename(file, path.extname(file));
    options.info("%s: started", name);
    parse(file, {
        precision: options.precision
    }, (function(shapeData, errors) {
        var content;
        options.info("%s: finished", name);
        errors && errors.forEach((function(e) {
            options.error("  " + e)
        }));
        if (shapeData) {
            content = JSON.stringify(options.processData(shapeData), null, options.isDebug && 4);
            if (!options.isJSON) {
                content = options.processFileContent(content, normalizeJsName(name))
            }
            fs.writeFile(path.resolve(options.output || path.dirname(file), options.processFileName(name + (options.isJSON ? ".json" : ".js"))), content, (function(e) {
                e && options.error("  " + e.message);
                callback()
            }))
        } else {
            callback()
        }
    }))
}

function collectFiles(dir, done) {
    var input = path.resolve(dir || "");
    fs.stat(input, (function(e, stat) {
        if (e) {
            done(e, [])
        } else if (stat.isFile()) {
            done(null, checkFile(input) ? [path.resolve(path.dirname(input), normalizeFile(input))] : [])
        } else if (stat.isDirectory()) {
            fs.readdir(input, (function(e, dirItems) {
                var list = [];
                dirItems.forEach((function(dirItem) {
                    if (checkFile(dirItem)) {
                        list.push(path.resolve(input, normalizeFile(dirItem)))
                    }
                }));
                done(null, list)
            }))
        } else {
            done(null, [])
        }
    }));

    function checkFile(name) {
        return ".shp" === path.extname(name).toLowerCase()
    }

    function normalizeFile(name) {
        return path.basename(name, ".shp")
    }
}

function importFile(file) {
    var content;
    try {
        content = require(path.resolve(String(file)))
    } catch (_) {}
    return content
}

function pickFunctionOption(value) {
    return isFunction(value) && value || value && importFile(String(value)) || null
}

function processFileContentByDefault(content, name) {
    return name + " = " + content + ";"
}

function prepareSettings(source, options) {
    options = Object.assign({}, options);
    if (options.settings) {
        options = Object.assign(importFile(options.settings) || {}, options)
    }
    return Object.assign(options, {
        input: source ? String(source) : null,
        output: options.output ? String(options.output) : null,
        precision: options.precision >= 0 ? Math.round(options.precision) : 4,
        processData: pickFunctionOption(options.processData) || eigen,
        processFileName: pickFunctionOption(options.processFileName) || eigen,
        processFileContent: pickFunctionOption(options.processFileContent) || processFileContentByDefault,
        info: options.isQuiet ? noop : console.info.bind(console),
        error: options.isQuiet ? noop : console.error.bind(console)
    })
}

function processFiles(source, options, callback) {
    var settings = prepareSettings(source, options && options.trim ? importFile(options) : options);
    settings.info("Started");
    collectFiles(settings.input, (function(e, files) {
        e && settings.error(e.message);
        settings.info(files.map((function(file) {
            return "  " + path.basename(file)
        })).join("\n"));
        when(files.map((function(file) {
            return function(done) {
                processFile(file, settings, done)
            }
        })), (function() {
            settings.info("Finished");
            (isFunction(callback) ? callback : noop)()
        }))
    }))
}
exports.processFiles = processFiles;
var COMMAND_LINE_ARG_KEYS = [{
    key: "--output",
    name: "output",
    arg: true,
    desc: "Destination directory"
}, {
    key: "--process-data",
    name: "processData",
    arg: true,
    desc: "Process parsed data"
}, {
    key: "--process-file-name",
    name: "processFileName",
    arg: true,
    desc: "Process output file name"
}, {
    key: "--process-file-content",
    name: "processFileContent",
    arg: true,
    desc: "Process output file content"
}, {
    key: "--precision",
    name: "precision",
    arg: true,
    desc: "Precision of shape coordinates"
}, {
    key: "--json",
    name: "isJSON",
    desc: "Generate as a .json file"
}, {
    key: "--debug",
    name: "isDebug",
    desc: "Generate non minified file"
}, {
    key: "--quiet",
    name: "isQuiet",
    desc: "Suppress console output"
}, {
    key: "--settings",
    name: "settings",
    arg: true,
    desc: "Path to settings file"
}, {
    key: "--help",
    name: "isHelp",
    desc: "Print help"
}];

function parseCommandLineArgs() {
    var args = process.argv.slice(2);
    var options = {
        isEmpty: !args.length
    };
    var map = {};
    args.forEach((function(arg, i) {
        map[arg] = args[i + 1] || true
    }));
    COMMAND_LINE_ARG_KEYS.forEach((function(info) {
        var val = map[info.key];
        if (val) {
            options[info.name] = info.arg ? val : true
        }
    }));
    if (options.isHelp || options.isEmpty) {
        options = null;
        printCommandLineHelp()
    }
    return options
}

function printCommandLineHelp() {
    var parts = ["node ", path.basename(process.argv[1]), " Source "];
    var lines = [];
    var maxLength = Math.max.apply(null, COMMAND_LINE_ARG_KEYS.map((function(info) {
        return info.key.length
    }))) + 2;
    var message;
    COMMAND_LINE_ARG_KEYS.forEach((function(info) {
        var key = info.key;
        parts.push(key, " ");
        if (info.arg) {
            parts.push("<", key.slice(2), ">", " ")
        }
        lines.push(["  ", key, Array(maxLength - key.length).join(" "), info.desc].join(""))
    }));
    message = ["Generates dxVectorMap-compatible files from shapefiles.", "\n", parts.join("")].concat(lines).join("\n");
    console.log(message)
}

function runFromConsole() {
    var args = parseCommandLineArgs();
    if (args) {
        processFiles(process.argv[2] || "", args)
    }
}
if (require.main === module) {
    runFromConsole()
}

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/format/WMSCapabilities
 */
import XML from './XML.js';
import { makeArrayPusher, makeObjectPropertyPusher, makeObjectPropertySetter, makeStructureNS, pushParseAndPop, } from '../xml.js';
import { readBooleanString, readDecimal, readDecimalString, readNonNegativeInteger, readNonNegativeIntegerString, readString, } from './xsd.js';
import { readHref } from './XLink.js';
/**
 * @const
 * @type {Array<null|string>}
 */
var NAMESPACE_URIS = [null, 'http://www.opengis.net/wms'];
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Service': makeObjectPropertySetter(readService),
    'Capability': makeObjectPropertySetter(readCapability),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var CAPABILITY_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Request': makeObjectPropertySetter(readRequest),
    'Exception': makeObjectPropertySetter(readException),
    'Layer': makeObjectPropertySetter(readCapabilityLayer),
});
/**
 * @classdesc
 * Format for reading WMS capabilities data
 *
 * @api
 */
var WMSCapabilities = /** @class */ (function (_super) {
    __extends(WMSCapabilities, _super);
    function WMSCapabilities() {
        var _this = _super.call(this) || this;
        /**
         * @type {string|undefined}
         */
        _this.version = undefined;
        return _this;
    }
    /**
     * @param {Element} node Node.
     * @return {Object} Object
     */
    WMSCapabilities.prototype.readFromNode = function (node) {
        this.version = node.getAttribute('version').trim();
        var wmsCapabilityObject = pushParseAndPop({
            'version': this.version,
        }, PARSERS, node, []);
        return wmsCapabilityObject ? wmsCapabilityObject : null;
    };
    return WMSCapabilities;
}(XML));
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var SERVICE_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Name': makeObjectPropertySetter(readString),
    'Title': makeObjectPropertySetter(readString),
    'Abstract': makeObjectPropertySetter(readString),
    'KeywordList': makeObjectPropertySetter(readKeywordList),
    'OnlineResource': makeObjectPropertySetter(readHref),
    'ContactInformation': makeObjectPropertySetter(readContactInformation),
    'Fees': makeObjectPropertySetter(readString),
    'AccessConstraints': makeObjectPropertySetter(readString),
    'LayerLimit': makeObjectPropertySetter(readNonNegativeInteger),
    'MaxWidth': makeObjectPropertySetter(readNonNegativeInteger),
    'MaxHeight': makeObjectPropertySetter(readNonNegativeInteger),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var CONTACT_INFORMATION_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'ContactPersonPrimary': makeObjectPropertySetter(readContactPersonPrimary),
    'ContactPosition': makeObjectPropertySetter(readString),
    'ContactAddress': makeObjectPropertySetter(readContactAddress),
    'ContactVoiceTelephone': makeObjectPropertySetter(readString),
    'ContactFacsimileTelephone': makeObjectPropertySetter(readString),
    'ContactElectronicMailAddress': makeObjectPropertySetter(readString),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var CONTACT_PERSON_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'ContactPerson': makeObjectPropertySetter(readString),
    'ContactOrganization': makeObjectPropertySetter(readString),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var CONTACT_ADDRESS_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'AddressType': makeObjectPropertySetter(readString),
    'Address': makeObjectPropertySetter(readString),
    'City': makeObjectPropertySetter(readString),
    'StateOrProvince': makeObjectPropertySetter(readString),
    'PostCode': makeObjectPropertySetter(readString),
    'Country': makeObjectPropertySetter(readString),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var EXCEPTION_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Format': makeArrayPusher(readString),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var LAYER_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Name': makeObjectPropertySetter(readString),
    'Title': makeObjectPropertySetter(readString),
    'Abstract': makeObjectPropertySetter(readString),
    'KeywordList': makeObjectPropertySetter(readKeywordList),
    'CRS': makeObjectPropertyPusher(readString),
    'EX_GeographicBoundingBox': makeObjectPropertySetter(readEXGeographicBoundingBox),
    'BoundingBox': makeObjectPropertyPusher(readBoundingBox),
    'Dimension': makeObjectPropertyPusher(readDimension),
    'Attribution': makeObjectPropertySetter(readAttribution),
    'AuthorityURL': makeObjectPropertyPusher(readAuthorityURL),
    'Identifier': makeObjectPropertyPusher(readString),
    'MetadataURL': makeObjectPropertyPusher(readMetadataURL),
    'DataURL': makeObjectPropertyPusher(readFormatOnlineresource),
    'FeatureListURL': makeObjectPropertyPusher(readFormatOnlineresource),
    'Style': makeObjectPropertyPusher(readStyle),
    'MinScaleDenominator': makeObjectPropertySetter(readDecimal),
    'MaxScaleDenominator': makeObjectPropertySetter(readDecimal),
    'Layer': makeObjectPropertyPusher(readLayer),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var ATTRIBUTION_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Title': makeObjectPropertySetter(readString),
    'OnlineResource': makeObjectPropertySetter(readHref),
    'LogoURL': makeObjectPropertySetter(readSizedFormatOnlineresource),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var EX_GEOGRAPHIC_BOUNDING_BOX_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'westBoundLongitude': makeObjectPropertySetter(readDecimal),
    'eastBoundLongitude': makeObjectPropertySetter(readDecimal),
    'southBoundLatitude': makeObjectPropertySetter(readDecimal),
    'northBoundLatitude': makeObjectPropertySetter(readDecimal),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var REQUEST_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'GetCapabilities': makeObjectPropertySetter(readOperationType),
    'GetMap': makeObjectPropertySetter(readOperationType),
    'GetFeatureInfo': makeObjectPropertySetter(readOperationType),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var OPERATIONTYPE_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Format': makeObjectPropertyPusher(readString),
    'DCPType': makeObjectPropertyPusher(readDCPType),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var DCPTYPE_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'HTTP': makeObjectPropertySetter(readHTTP),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var HTTP_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Get': makeObjectPropertySetter(readFormatOnlineresource),
    'Post': makeObjectPropertySetter(readFormatOnlineresource),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var STYLE_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Name': makeObjectPropertySetter(readString),
    'Title': makeObjectPropertySetter(readString),
    'Abstract': makeObjectPropertySetter(readString),
    'LegendURL': makeObjectPropertyPusher(readSizedFormatOnlineresource),
    'StyleSheetURL': makeObjectPropertySetter(readFormatOnlineresource),
    'StyleURL': makeObjectPropertySetter(readFormatOnlineresource),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var FORMAT_ONLINERESOURCE_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Format': makeObjectPropertySetter(readString),
    'OnlineResource': makeObjectPropertySetter(readHref),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var KEYWORDLIST_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Keyword': makeArrayPusher(readString),
});
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Attribution object.
 */
function readAttribution(node, objectStack) {
    return pushParseAndPop({}, ATTRIBUTION_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object} Bounding box object.
 */
function readBoundingBox(node, objectStack) {
    var extent = [
        readDecimalString(node.getAttribute('minx')),
        readDecimalString(node.getAttribute('miny')),
        readDecimalString(node.getAttribute('maxx')),
        readDecimalString(node.getAttribute('maxy')),
    ];
    var resolutions = [
        readDecimalString(node.getAttribute('resx')),
        readDecimalString(node.getAttribute('resy')),
    ];
    return {
        'crs': node.getAttribute('CRS'),
        'extent': extent,
        'res': resolutions,
    };
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {import("../extent.js").Extent|undefined} Bounding box object.
 */
function readEXGeographicBoundingBox(node, objectStack) {
    var geographicBoundingBox = pushParseAndPop({}, EX_GEOGRAPHIC_BOUNDING_BOX_PARSERS, node, objectStack);
    if (!geographicBoundingBox) {
        return undefined;
    }
    var westBoundLongitude = 
    /** @type {number|undefined} */
    (geographicBoundingBox['westBoundLongitude']);
    var southBoundLatitude = 
    /** @type {number|undefined} */
    (geographicBoundingBox['southBoundLatitude']);
    var eastBoundLongitude = 
    /** @type {number|undefined} */
    (geographicBoundingBox['eastBoundLongitude']);
    var northBoundLatitude = 
    /** @type {number|undefined} */
    (geographicBoundingBox['northBoundLatitude']);
    if (westBoundLongitude === undefined ||
        southBoundLatitude === undefined ||
        eastBoundLongitude === undefined ||
        northBoundLatitude === undefined) {
        return undefined;
    }
    return [
        westBoundLongitude,
        southBoundLatitude,
        eastBoundLongitude,
        northBoundLatitude,
    ];
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Capability object.
 */
function readCapability(node, objectStack) {
    return pushParseAndPop({}, CAPABILITY_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Service object.
 */
function readService(node, objectStack) {
    return pushParseAndPop({}, SERVICE_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Contact information object.
 */
function readContactInformation(node, objectStack) {
    return pushParseAndPop({}, CONTACT_INFORMATION_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Contact person object.
 */
function readContactPersonPrimary(node, objectStack) {
    return pushParseAndPop({}, CONTACT_PERSON_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Contact address object.
 */
function readContactAddress(node, objectStack) {
    return pushParseAndPop({}, CONTACT_ADDRESS_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Array<string>|undefined} Format array.
 */
function readException(node, objectStack) {
    return pushParseAndPop([], EXCEPTION_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Layer object.
 */
function readCapabilityLayer(node, objectStack) {
    var layerObject = pushParseAndPop({}, LAYER_PARSERS, node, objectStack);
    if (layerObject['Layer'] === undefined) {
        return Object.assign(layerObject, readLayer(node, objectStack));
    }
    return layerObject;
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Layer object.
 */
function readLayer(node, objectStack) {
    var parentLayerObject = /**  @type {!Object<string,*>} */ (objectStack[objectStack.length - 1]);
    var layerObject = pushParseAndPop({}, LAYER_PARSERS, node, objectStack);
    if (!layerObject) {
        return undefined;
    }
    var queryable = readBooleanString(node.getAttribute('queryable'));
    if (queryable === undefined) {
        queryable = parentLayerObject['queryable'];
    }
    layerObject['queryable'] = queryable !== undefined ? queryable : false;
    var cascaded = readNonNegativeIntegerString(node.getAttribute('cascaded'));
    if (cascaded === undefined) {
        cascaded = parentLayerObject['cascaded'];
    }
    layerObject['cascaded'] = cascaded;
    var opaque = readBooleanString(node.getAttribute('opaque'));
    if (opaque === undefined) {
        opaque = parentLayerObject['opaque'];
    }
    layerObject['opaque'] = opaque !== undefined ? opaque : false;
    var noSubsets = readBooleanString(node.getAttribute('noSubsets'));
    if (noSubsets === undefined) {
        noSubsets = parentLayerObject['noSubsets'];
    }
    layerObject['noSubsets'] = noSubsets !== undefined ? noSubsets : false;
    var fixedWidth = readDecimalString(node.getAttribute('fixedWidth'));
    if (!fixedWidth) {
        fixedWidth = parentLayerObject['fixedWidth'];
    }
    layerObject['fixedWidth'] = fixedWidth;
    var fixedHeight = readDecimalString(node.getAttribute('fixedHeight'));
    if (!fixedHeight) {
        fixedHeight = parentLayerObject['fixedHeight'];
    }
    layerObject['fixedHeight'] = fixedHeight;
    // See 7.2.4.8
    var addKeys = ['Style', 'CRS', 'AuthorityURL'];
    addKeys.forEach(function (key) {
        if (key in parentLayerObject) {
            var childValue = layerObject[key] || [];
            layerObject[key] = childValue.concat(parentLayerObject[key]);
        }
    });
    var replaceKeys = [
        'EX_GeographicBoundingBox',
        'BoundingBox',
        'Dimension',
        'Attribution',
        'MinScaleDenominator',
        'MaxScaleDenominator',
    ];
    replaceKeys.forEach(function (key) {
        if (!(key in layerObject)) {
            var parentValue = parentLayerObject[key];
            layerObject[key] = parentValue;
        }
    });
    return layerObject;
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object} Dimension object.
 */
function readDimension(node, objectStack) {
    var dimensionObject = {
        'name': node.getAttribute('name'),
        'units': node.getAttribute('units'),
        'unitSymbol': node.getAttribute('unitSymbol'),
        'default': node.getAttribute('default'),
        'multipleValues': readBooleanString(node.getAttribute('multipleValues')),
        'nearestValue': readBooleanString(node.getAttribute('nearestValue')),
        'current': readBooleanString(node.getAttribute('current')),
        'values': readString(node),
    };
    return dimensionObject;
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Online resource object.
 */
function readFormatOnlineresource(node, objectStack) {
    return pushParseAndPop({}, FORMAT_ONLINERESOURCE_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Request object.
 */
function readRequest(node, objectStack) {
    return pushParseAndPop({}, REQUEST_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} DCP type object.
 */
function readDCPType(node, objectStack) {
    return pushParseAndPop({}, DCPTYPE_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} HTTP object.
 */
function readHTTP(node, objectStack) {
    return pushParseAndPop({}, HTTP_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Operation type object.
 */
function readOperationType(node, objectStack) {
    return pushParseAndPop({}, OPERATIONTYPE_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Online resource object.
 */
function readSizedFormatOnlineresource(node, objectStack) {
    var formatOnlineresource = readFormatOnlineresource(node, objectStack);
    if (formatOnlineresource) {
        var size = [
            readNonNegativeIntegerString(node.getAttribute('width')),
            readNonNegativeIntegerString(node.getAttribute('height')),
        ];
        formatOnlineresource['size'] = size;
        return formatOnlineresource;
    }
    return undefined;
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Authority URL object.
 */
function readAuthorityURL(node, objectStack) {
    var authorityObject = readFormatOnlineresource(node, objectStack);
    if (authorityObject) {
        authorityObject['name'] = node.getAttribute('name');
        return authorityObject;
    }
    return undefined;
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Metadata URL object.
 */
function readMetadataURL(node, objectStack) {
    var metadataObject = readFormatOnlineresource(node, objectStack);
    if (metadataObject) {
        metadataObject['type'] = node.getAttribute('type');
        return metadataObject;
    }
    return undefined;
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Style object.
 */
function readStyle(node, objectStack) {
    return pushParseAndPop({}, STYLE_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Array<string>|undefined} Keyword list.
 */
function readKeywordList(node, objectStack) {
    return pushParseAndPop([], KEYWORDLIST_PARSERS, node, objectStack);
}
export default WMSCapabilities;
//# sourceMappingURL=WMSCapabilities.js.map
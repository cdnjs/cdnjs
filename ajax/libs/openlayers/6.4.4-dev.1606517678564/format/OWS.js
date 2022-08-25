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
 * @module ol/format/OWS
 */
import XML from './XML.js';
import { makeObjectPropertyPusher, makeObjectPropertySetter, makeStructureNS, pushParseAndPop, } from '../xml.js';
import { readHref } from './XLink.js';
import { readString } from './xsd.js';
/**
 * @const
 * @type {Array<null|string>}
 */
var NAMESPACE_URIS = [null, 'http://www.opengis.net/ows/1.1'];
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'ServiceIdentification': makeObjectPropertySetter(readServiceIdentification),
    'ServiceProvider': makeObjectPropertySetter(readServiceProvider),
    'OperationsMetadata': makeObjectPropertySetter(readOperationsMetadata),
});
var OWS = /** @class */ (function (_super) {
    __extends(OWS, _super);
    function OWS() {
        return _super.call(this) || this;
    }
    /**
     * @param {Element} node Node.
     * @return {Object} Object
     */
    OWS.prototype.readFromNode = function (node) {
        var owsObject = pushParseAndPop({}, PARSERS, node, []);
        return owsObject ? owsObject : null;
    };
    return OWS;
}(XML));
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var ADDRESS_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'DeliveryPoint': makeObjectPropertySetter(readString),
    'City': makeObjectPropertySetter(readString),
    'AdministrativeArea': makeObjectPropertySetter(readString),
    'PostalCode': makeObjectPropertySetter(readString),
    'Country': makeObjectPropertySetter(readString),
    'ElectronicMailAddress': makeObjectPropertySetter(readString),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var ALLOWED_VALUES_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Value': makeObjectPropertyPusher(readValue),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var CONSTRAINT_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'AllowedValues': makeObjectPropertySetter(readAllowedValues),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var CONTACT_INFO_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Phone': makeObjectPropertySetter(readPhone),
    'Address': makeObjectPropertySetter(readAddress),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var DCP_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'HTTP': makeObjectPropertySetter(readHttp),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var HTTP_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Get': makeObjectPropertyPusher(readGet),
    'Post': undefined,
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var OPERATION_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'DCP': makeObjectPropertySetter(readDcp),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var OPERATIONS_METADATA_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Operation': readOperation,
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var PHONE_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Voice': makeObjectPropertySetter(readString),
    'Facsimile': makeObjectPropertySetter(readString),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var REQUEST_METHOD_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Constraint': makeObjectPropertyPusher(readConstraint),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var SERVICE_CONTACT_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'IndividualName': makeObjectPropertySetter(readString),
    'PositionName': makeObjectPropertySetter(readString),
    'ContactInfo': makeObjectPropertySetter(readContactInfo),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var SERVICE_IDENTIFICATION_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'Abstract': makeObjectPropertySetter(readString),
    'AccessConstraints': makeObjectPropertySetter(readString),
    'Fees': makeObjectPropertySetter(readString),
    'Title': makeObjectPropertySetter(readString),
    'ServiceTypeVersion': makeObjectPropertySetter(readString),
    'ServiceType': makeObjectPropertySetter(readString),
});
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
// @ts-ignore
var SERVICE_PROVIDER_PARSERS = makeStructureNS(NAMESPACE_URIS, {
    'ProviderName': makeObjectPropertySetter(readString),
    'ProviderSite': makeObjectPropertySetter(readHref),
    'ServiceContact': makeObjectPropertySetter(readServiceContact),
});
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} The address.
 */
function readAddress(node, objectStack) {
    return pushParseAndPop({}, ADDRESS_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} The values.
 */
function readAllowedValues(node, objectStack) {
    return pushParseAndPop({}, ALLOWED_VALUES_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} The constraint.
 */
function readConstraint(node, objectStack) {
    var name = node.getAttribute('name');
    if (!name) {
        return undefined;
    }
    return pushParseAndPop({ 'name': name }, CONSTRAINT_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} The contact info.
 */
function readContactInfo(node, objectStack) {
    return pushParseAndPop({}, CONTACT_INFO_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} The DCP.
 */
function readDcp(node, objectStack) {
    return pushParseAndPop({}, DCP_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} The GET object.
 */
function readGet(node, objectStack) {
    var href = readHref(node);
    if (!href) {
        return undefined;
    }
    return pushParseAndPop({ 'href': href }, REQUEST_METHOD_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} The HTTP object.
 */
function readHttp(node, objectStack) {
    return pushParseAndPop({}, HTTP_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} The operation.
 */
function readOperation(node, objectStack) {
    var name = node.getAttribute('name');
    var value = pushParseAndPop({}, OPERATION_PARSERS, node, objectStack);
    if (!value) {
        return undefined;
    }
    var object = /** @type {Object} */ (objectStack[objectStack.length - 1]);
    object[name] = value;
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} The operations metadata.
 */
function readOperationsMetadata(node, objectStack) {
    return pushParseAndPop({}, OPERATIONS_METADATA_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} The phone.
 */
function readPhone(node, objectStack) {
    return pushParseAndPop({}, PHONE_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} The service identification.
 */
function readServiceIdentification(node, objectStack) {
    return pushParseAndPop({}, SERVICE_IDENTIFICATION_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} The service contact.
 */
function readServiceContact(node, objectStack) {
    return pushParseAndPop({}, SERVICE_CONTACT_PARSERS, node, objectStack);
}
/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} The service provider.
 */
function readServiceProvider(node, objectStack) {
    return pushParseAndPop({}, SERVICE_PROVIDER_PARSERS, node, objectStack);
}
/**
 * @param {Node} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {string|undefined} The value.
 */
function readValue(node, objectStack) {
    return readString(node);
}
export default OWS;
//# sourceMappingURL=OWS.js.map
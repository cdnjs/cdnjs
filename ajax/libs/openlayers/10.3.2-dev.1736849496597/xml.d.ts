/**
 * @param {string} namespaceURI Namespace URI.
 * @param {string} qualifiedName Qualified name.
 * @return {Element} Node.
 */
export function createElementNS(namespaceURI: string, qualifiedName: string): Element;
/**
 * Recursively grab all text content of child nodes into a single string.
 * @param {Node} node Node.
 * @param {boolean} normalizeWhitespace Normalize whitespace: remove all line
 * breaks.
 * @return {string} All text content.
 * @api
 */
export function getAllTextContent(node: Node, normalizeWhitespace: boolean): string;
/**
 * Recursively grab all text content of child nodes into a single string.
 * @param {Node} node Node.
 * @param {boolean} normalizeWhitespace Normalize whitespace: remove all line
 * breaks.
 * @param {Array<string>} accumulator Accumulator.
 * @private
 * @return {Array<string>} Accumulator.
 */
export function getAllTextContent_(node: Node, normalizeWhitespace: boolean, accumulator: Array<string>): Array<string>;
/**
 * @param {Object} object Object.
 * @return {boolean} Is a document.
 */
export function isDocument(object: any): boolean;
/**
 * @param {Element} node Node.
 * @param {?string} namespaceURI Namespace URI.
 * @param {string} name Attribute name.
 * @return {string} Value
 */
export function getAttributeNS(node: Element, namespaceURI: string | null, name: string): string;
/**
 * Parse an XML string to an XML Document.
 * @param {string} xml XML.
 * @return {Document} Document.
 * @api
 */
export function parse(xml: string): Document;
/**
 * Make an array extender function for extending the array at the top of the
 * object stack.
 * @param {function(this: T, Node, Array<*>): (Array<*>|undefined)} valueReader Value reader.
 * @param {T} [thisArg] The object to use as `this` in `valueReader`.
 * @return {Parser} Parser.
 * @template T
 */
export function makeArrayExtender<T>(valueReader: (this: T, arg1: Node, arg2: Array<any>) => (Array<any> | undefined), thisArg?: T): Parser;
/**
 * Make an array pusher function for pushing to the array at the top of the
 * object stack.
 * @param {function(this: T, Element, Array<*>): *} valueReader Value reader.
 * @param {T} [thisArg] The object to use as `this` in `valueReader`.
 * @return {Parser} Parser.
 * @template T
 */
export function makeArrayPusher<T>(valueReader: (this: T, arg1: Element, arg2: Array<any>) => any, thisArg?: T): Parser;
/**
 * Make an object stack replacer function for replacing the object at the
 * top of the stack.
 * @param {function(this: T, Node, Array<*>): *} valueReader Value reader.
 * @param {T} [thisArg] The object to use as `this` in `valueReader`.
 * @return {Parser} Parser.
 * @template T
 */
export function makeReplacer<T>(valueReader: (this: T, arg1: Node, arg2: Array<any>) => any, thisArg?: T): Parser;
/**
 * Make an object property pusher function for adding a property to the
 * object at the top of the stack.
 * @param {function(this: T, Element, Array<*>): *} valueReader Value reader.
 * @param {string} [property] Property.
 * @param {T} [thisArg] The object to use as `this` in `valueReader`.
 * @return {Parser} Parser.
 * @template T
 */
export function makeObjectPropertyPusher<T>(valueReader: (this: T, arg1: Element, arg2: Array<any>) => any, property?: string, thisArg?: T): Parser;
/**
 * Make an object property setter function.
 * @param {function(this: T, Element, Array<*>): *} valueReader Value reader.
 * @param {string} [property] Property.
 * @param {T} [thisArg] The object to use as `this` in `valueReader`.
 * @return {Parser} Parser.
 * @template T
 */
export function makeObjectPropertySetter<T>(valueReader: (this: T, arg1: Element, arg2: Array<any>) => any, property?: string, thisArg?: T): Parser;
/**
 * Create a serializer that appends nodes written by its `nodeWriter` to its
 * designated parent. The parent is the `node` of the
 * {@link module:ol/xml~NodeStackItem} at the top of the `objectStack`.
 * @param {function(this: T, Node, V, Array<*>): void} nodeWriter Node writer.
 * @param {T} [thisArg] The object to use as `this` in `nodeWriter`.
 * @return {Serializer} Serializer.
 * @template T, V
 */
export function makeChildAppender<T, V>(nodeWriter: (this: T, arg1: Node, arg2: V, arg3: Array<any>) => void, thisArg?: T): Serializer;
/**
 * Create a serializer that calls the provided `nodeWriter` from
 * {@link module:ol/xml.serialize}. This can be used by the parent writer to have the
 * `nodeWriter` called with an array of values when the `nodeWriter` was
 * designed to serialize a single item. An example would be a LineString
 * geometry writer, which could be reused for writing MultiLineString
 * geometries.
 * @param {function(this: T, Element, V, Array<*>): void} nodeWriter Node writer.
 * @param {T} [thisArg] The object to use as `this` in `nodeWriter`.
 * @return {Serializer} Serializer.
 * @template T, V
 */
export function makeArraySerializer<T, V>(nodeWriter: (this: T, arg1: Element, arg2: V, arg3: Array<any>) => void, thisArg?: T): Serializer;
/**
 * Create a node factory which can use the `keys` passed to
 * {@link module:ol/xml.serialize} or {@link module:ol/xml.pushSerializeAndPop} as node names,
 * or a fixed node name. The namespace of the created nodes can either be fixed,
 * or the parent namespace will be used.
 * @param {string} [fixedNodeName] Fixed node name which will be used for all
 *     created nodes. If not provided, the 3rd argument to the resulting node
 *     factory needs to be provided and will be the nodeName.
 * @param {string} [fixedNamespaceURI] Fixed namespace URI which will be used for
 *     all created nodes. If not provided, the namespace of the parent node will
 *     be used.
 * @return {function(*, Array<*>, string=): (Node|undefined)} Node factory.
 */
export function makeSimpleNodeFactory(fixedNodeName?: string, fixedNamespaceURI?: string): (arg0: any, arg1: Array<any>, arg2: string | undefined) => (Node | undefined);
/**
 * Create an array of `values` to be used with {@link module:ol/xml.serialize} or
 * {@link module:ol/xml.pushSerializeAndPop}, where `orderedKeys` has to be provided as
 * `key` argument.
 * @param {Object<string, *>} object Key-value pairs for the sequence. Keys can
 *     be a subset of the `orderedKeys`.
 * @param {Array<string>} orderedKeys Keys in the order of the sequence.
 * @return {Array<*>} Values in the order of the sequence. The resulting array
 *     has the same length as the `orderedKeys` array. Values that are not
 *     present in `object` will be `undefined` in the resulting array.
 */
export function makeSequence(object: {
    [x: string]: any;
}, orderedKeys: Array<string>): Array<any>;
/**
 * Create a namespaced structure, using the same values for each namespace.
 * This can be used as a starting point for versioned parsers, when only a few
 * values are version specific.
 * @param {Array<string>} namespaceURIs Namespace URIs.
 * @param {T} structure Structure.
 * @param {Object<string, T>} [structureNS] Namespaced structure to add to.
 * @return {Object<string, T>} Namespaced structure.
 * @template T
 */
export function makeStructureNS<T>(namespaceURIs: Array<string>, structure: T, structureNS?: {
    [x: string]: T;
}): {
    [x: string]: T;
};
/**
 * Parse a node using the parsers and object stack.
 * @param {Object<string, Object<string, Parser>>} parsersNS
 *     Parsers by namespace.
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @param {*} [thisArg] The object to use as `this`.
 */
export function parseNode(parsersNS: {
    [x: string]: {
        [x: string]: Parser;
    };
}, node: Element, objectStack: Array<any>, thisArg?: any): void;
/**
 * Push an object on top of the stack, parse and return the popped object.
 * @param {T} object Object.
 * @param {Object<string, Object<string, Parser>>} parsersNS
 *     Parsers by namespace.
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @param {*} [thisArg] The object to use as `this`.
 * @return {T} Object.
 * @template T
 */
export function pushParseAndPop<T>(object: T, parsersNS: {
    [x: string]: {
        [x: string]: Parser;
    };
}, node: Element, objectStack: Array<any>, thisArg?: any): T;
/**
 * Walk through an array of `values` and call a serializer for each value.
 * @param {Object<string, Object<string, Serializer>>} serializersNS
 *     Namespaced serializers.
 * @param {function(this: T, *, Array<*>, (string|undefined)): (Node|undefined)} nodeFactory
 *     Node factory. The `nodeFactory` creates the node whose namespace and name
 *     will be used to choose a node writer from `serializersNS`. This
 *     separation allows us to decide what kind of node to create, depending on
 *     the value we want to serialize. An example for this would be different
 *     geometry writers based on the geometry type.
 * @param {Array<*>} values Values to serialize. An example would be an array
 *     of {@link module:ol/Feature~Feature} instances.
 * @param {Array<*>} objectStack Node stack.
 * @param {Array<string>} [keys] Keys of the `values`. Will be passed to the
 *     `nodeFactory`. This is used for serializing object literals where the
 *     node name relates to the property key. The array length of `keys` has
 *     to match the length of `values`. For serializing a sequence, `keys`
 *     determines the order of the sequence.
 * @param {T} [thisArg] The object to use as `this` for the node factory and
 *     serializers.
 * @template T
 */
export function serialize<T>(serializersNS: {
    [x: string]: {
        [x: string]: Serializer;
    };
}, nodeFactory: (this: T, arg1: any, arg2: Array<any>, arg3: (string | undefined)) => (Node | undefined), values: Array<any>, objectStack: Array<any>, keys?: Array<string>, thisArg?: T): void;
/**
 * @param {O} object Object.
 * @param {Object<string, Object<string, Serializer>>} serializersNS
 *     Namespaced serializers.
 * @param {function(this: T, *, Array<*>, (string|undefined)): (Node|undefined)} nodeFactory
 *     Node factory. The `nodeFactory` creates the node whose namespace and name
 *     will be used to choose a node writer from `serializersNS`. This
 *     separation allows us to decide what kind of node to create, depending on
 *     the value we want to serialize. An example for this would be different
 *     geometry writers based on the geometry type.
 * @param {Array<*>} values Values to serialize. An example would be an array
 *     of {@link module:ol/Feature~Feature} instances.
 * @param {Array<*>} objectStack Node stack.
 * @param {Array<string>} [keys] Keys of the `values`. Will be passed to the
 *     `nodeFactory`. This is used for serializing object literals where the
 *     node name relates to the property key. The array length of `keys` has
 *     to match the length of `values`. For serializing a sequence, `keys`
 *     determines the order of the sequence.
 * @param {T} [thisArg] The object to use as `this` for the node factory and
 *     serializers.
 * @return {O|undefined} Object.
 * @template O, T
 */
export function pushSerializeAndPop<O, T>(object: O, serializersNS: {
    [x: string]: {
        [x: string]: Serializer;
    };
}, nodeFactory: (this: T, arg1: any, arg2: Array<any>, arg3: (string | undefined)) => (Node | undefined), values: Array<any>, objectStack: Array<any>, keys?: Array<string>, thisArg?: T): O | undefined;
/**
 * Register a XMLSerializer. Can be used  to inject a XMLSerializer
 * where there is no globally available implementation.
 *
 * @param {XMLSerializer} xmlSerializer A XMLSerializer.
 * @api
 */
export function registerXMLSerializer(xmlSerializer: XMLSerializer): void;
/**
 * @return {XMLSerializer} The XMLSerializer.
 */
export function getXMLSerializer(): XMLSerializer;
/**
 * Register a Document to use when creating nodes for XML serializations. Can be used
 * to inject a Document where there is no globally available implementation.
 *
 * @param {Document} document A Document.
 * @api
 */
export function registerDocument(document: Document): void;
/**
 * Get a document that should be used when creating nodes for XML serializations.
 * @return {Document} The document.
 */
export function getDocument(): Document;
/**
 * When using {@link module:ol/xml.makeChildAppender} or
 * {@link module:ol/xml.makeSimpleNodeFactory}, the top `objectStack` item needs
 * to have this structure.
 * @typedef {Object} NodeStackItem
 * @property {Element} node Node.
 */
/**
 * @typedef {function(Element, Array<*>): void} Parser
 */
/**
 * @typedef {function(Element, *, Array<*>): void} Serializer
 */
/**
 * @type {string}
 */
export const XML_SCHEMA_INSTANCE_URI: string;
/**
 * A node factory that creates a node using the parent's `namespaceURI` and the
 * `nodeName` passed by {@link module:ol/xml.serialize} or
 * {@link module:ol/xml.pushSerializeAndPop} to the node factory.
 * @const
 * @type {function(*, Array<*>, string=): (Node|undefined)}
 */
export const OBJECT_PROPERTY_NODE_FACTORY: (arg0: any, arg1: Array<any>, arg2: string | undefined) => (Node | undefined);
/**
 * When using {@link module :ol/xml.makeChildAppender} or
 * {@link module :ol/xml.makeSimpleNodeFactory}, the top `objectStack` item needs
 * to have this structure.
 */
export type NodeStackItem = {
    /**
     * Node.
     */
    node: Element;
};
export type Parser = (arg0: Element, arg1: Array<any>) => void;
export type Serializer = (arg0: Element, arg1: any, arg2: Array<any>) => void;
//# sourceMappingURL=xml.d.ts.map
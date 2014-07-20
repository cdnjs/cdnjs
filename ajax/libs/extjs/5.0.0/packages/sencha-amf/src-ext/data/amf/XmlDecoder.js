// @tag enterprise
/**
 * @class Ext.data.amf.XmlDecoder
 * This class parses an XML-based AMFX message and returns the deserialized
 * objects. You should not need to use this class directly. It's mostly used by
 * the AMFX Direct implementation.
 * To decode a message, first construct a Decoder:
 *
 *      decoder = Ext.create('Ext.data.amf.XmlDecoder');
 *
 * Then ask it to read in the message :
 *
 *     resp = decoder.readAmfxMessage(str);
 *
 * For more information on working with AMF data please refer to the
 * [AMF Guide](#/guide/amf).
 */
Ext.define('Ext.data.amf.XmlDecoder', {

    alias: 'data.amf.xmldecoder',

    statics: {

        /**
         * Parses an xml string and returns an xml document
         * @private
         * @param {String} xml
         */
        readXml: function(xml) {
            var doc;

            if (window.DOMParser) {
                doc = (new DOMParser()).parseFromString(xml, "text/xml");
            } else {
                doc = new ActiveXObject("Microsoft.XMLDOM");
                doc.loadXML(xml);
            }

            return doc;
        },

        /**
         * parses a node containing a byte array in hexadecimal format, returning the reconstructed array.
         * @param {HTMLElement/XMLElement} node the node
         * @return {Array} a byte array
         */
        readByteArray: function(node) {
            var bytes = [],
                c, i, str;
            str = node.firstChild.nodeValue;
            for (i = 0; i < str.length; i = i + 2) {
                c = str.substr(i, 2);
                bytes.push(parseInt(c, 16));
            }
            return bytes;
        },

        /**
         * Deserializes an AMF3 binary object from a byte array
         * @param {Array} bytes the byte array containing one AMF3-encoded value
         * @return {Object} the decoded value
         */
        readAMF3Value: function(bytes) {
            var packet;
            packet = Ext.create('Ext.data.amf.Packet');
            return packet.decodeValue(bytes);
        },

        /**
         * Accepts Flex-style UID and decodes the number in the first four bytes (8 hex digits) of data.
         * @param {String} messageId the message ID
         * @return {Number} the transaction ID
         */
        decodeTidFromFlexUID: function(messageId) {
            var str;
            str = messageId.substr(0,8);
            return parseInt(str, 16);
        }

    },

    /**
     * Creates new encoder.
     * @param {Object} config Configuration options
     */
    constructor: function(config) {
        this.initConfig(config);
        this.clear();
    },

    /**
     * Clears the accumulated data and reference tables
     */
    clear: function() {
        // reset reference counters
        this.objectReferences=[];
        this.traitsReferences=[];
        this.stringReferences=[];
    },

    /**
     * Reads and returns a decoded AMFX packet.
     * @param {String} xml the xml of the message
     * @return {Object} the response object containing the message
     */
    readAmfxMessage: function(xml) {
        var doc, amfx, body,
            i, resp={};
        this.clear(); // reset counters
        doc = Ext.data.amf.XmlDecoder.readXml(xml);
        amfx = doc.getElementsByTagName('amfx')[0];
        //<debug>
        if (!amfx) {
            Ext.warn.log("No AMFX tag in message");
        }
        if (amfx.getAttribute('ver') != "3") {
            Ext.Error.raise("Unsupported AMFX version: " + amfx.getAttribute('ver'));
        }
        //</debug>
        body = amfx.getElementsByTagName('body')[0];
        resp.targetURI = body.getAttribute('targetURI');
        resp.responseURI = body.getAttribute('responseURI'); // most likely empty string
        for (i = 0; i < body.childNodes.length; i++) {
            if (body.childNodes.item(i).nodeType != 1) {
                // only process element nodes, ignore white space and text nodes
                continue;
            }
            resp.message = this.readValue(body.childNodes.item(i));
            break; // no need to keep iterating
        }
        return resp;
    },

    /**
     * Parses an HTML element returning the appropriate JavaScript value from the AMFX data.
     * @param {HTMLElement} node the node to parse
     * @return {Object} a JavaScript object or value
     */
    readValue: function(node) {
        var val;
        if (typeof node.normalize === 'function') {
            node.normalize();
        }
        // 2DO: handle references!
        if (node.tagName == "null") {
            return null;
        } else if (node.tagName == "true") {
            return true;
        } else if (node.tagName == "false") {
            return false;
        } else if (node.tagName == "string") {
            return this.readString(node);
        } else if (node.tagName == "int") {
            return parseInt(node.firstChild.nodeValue);
        } else if (node.tagName == "double") {
            return parseFloat(node.firstChild.nodeValue);
        } else if (node.tagName == "date") {
            val = new Date(parseFloat(node.firstChild.nodeValue));
            // record in object reference table
            this.objectReferences.push(val);
            return val;
        } else if (node.tagName == "dictionary") {
            return this.readDictionary(node);
        } else if (node.tagName == "array") {
            return this.readArray(node);
        } else if (node.tagName == "ref") {
            return this.readObjectRef(node);
        } else if (node.tagName == "object") {
            return this.readObject(node);
        } else if (node.tagName == "xml") {
            // the CDATA content of the node is a parseable XML document. parse it.
            return Ext.data.amf.XmlDecoder.readXml(node.firstChild.nodeValue);
        } else if (node.tagName == "bytearray") {
            // a byte array is usually an AMF stream. Parse it to a byte array, then pass through the AMF decoder to get the objects inside
            return Ext.data.amf.XmlDecoder.readAMF3Value(Ext.data.amf.XmlDecoder.readByteArray(node));
        }
        //<debug>
        Ext.Error.raise("Unknown tag type: " + node.tagName);
        //</debug>
        return null;
    },

    /**
     * Reads a string or string reference and return the value
     * @param {HTMLElement/XMLElement} node the node containing a string object
     * @return {String} the parsed string
     */
    readString: function(node) {
        var val;
        if (node.getAttributeNode('id')) {
            return this.stringReferences[parseInt(node.getAttribute('id'))];
        }
        val = (node.firstChild ? node.firstChild.nodeValue : "") || "";
        this.stringReferences.push(val);
        return val;
    },

    /**
     * Parses and returns an ordered list of trait names
     * @param {HTMLElement/XMLElement} node the traits node from the XML doc
     * @return {Array} an array of ordered trait names or null if it's an externalizable object
     */
    readTraits: function(node) {
        var traits = [], i, rawtraits;
        if (node === null) {
            return null;
        }
        if (node.getAttribute('externalizable') == "true") {
            // no traits since it's an externalizable or a null object.
            return null;
        }
        if (node.getAttributeNode('id')) {
            // return traits reference
            return this.traitsReferences[parseInt(node.getAttributeNode('id').value)];
        }
        /* // empty anonymous objects still seem to get their empty traits in the reference table
         if (!node.hasChildNodes()) {
         var className = node.parentNode.getElementsByTagName('type');
         if (className.length == 0) {
         return traits; // special case of an anonymous object with no traits. Does not get reference counted
         }
         }
         */
        rawtraits = node.childNodes;
        for (i = 0; i < rawtraits.length; i++) {
            if (rawtraits.item(i).nodeType != 1) {
                // only process element nodes, ignore white space and text nodes
                continue;
            }
            // this will be a string, but let the readValue function handle it nonetheless
            traits.push(this.readValue(rawtraits.item(i)));
        }

        // register traits in ref table:
        this.traitsReferences.push(traits);
        return traits;
    },

    /**
     * Parses and return an object / array / dictionary / date from reference
     * @param {HTMLElement/XMLElement} node the ref node
     * @return {Object} the previously instantiated object referred to by the ref node
     */
    readObjectRef: function(node) {
        var id;
        id = parseInt(node.getAttribute('id'));
        return this.objectReferences[id];
    },

    /**
     * Parses and returns an AMFX object.
     * @param {HTMLElement/XMLElement} the `<object>` node to parse
     * @return {Object} the deserialized object
     */
    readObject: function(node) {
        var obj,
            traits = [],
            traitsNode,
            i, j, n,
            key, val,
            klass = null, className;

        className = node.getAttribute('type');
        if (className) {
            klass = Ext.ClassManager.getByAlias('amfx.' + className); // check if special case for class
        }
        obj = klass ? new klass() : (className ? {$className: className} : {}); // if there is no klass, mark the classname for easier parsing of returned results

        // check if we need special handling for this class
        if ((!klass) && this.converters[className]) {
            obj = this.converters[className](this,node);
            return obj; // we're done
        }

        traitsNode = node.getElementsByTagName('traits')[0];
        traits = this.readTraits(traitsNode);
        //<debug>
        if (traits === null) {
            Ext.Error.raise("No support for externalizable object: " + className);
        }
        //</debug>
        // Register object if ref table, in case there's a cyclical reference coming
        this.objectReferences.push(obj);


        // Now we expect an item for each trait name we have. We assume it's an ordered list. We'll skip the first (traits) tag
        j = 0;
        for (i = 0; i < node.childNodes.length; i++) {
            n = node.childNodes.item(i);
            if (n.nodeType != 1) {
                // Ignore text nodes and non-element nodes
                continue;
            }
            if (n.tagName == "traits") {
                // ignore the traits node. We've already covered it.
                continue;
            }
            key = traits[j];
            val = this.readValue(n);
            j = j + 1;
            obj[key] = val;
            //<debug>
            if (j > traits.length) {
                Ext.Error.raise("Too many items for object, not enough traits: " + className);
            }
            //</debug>
        }
        return obj;
    },

    /**
     * Parses and returns an AMFX array.
     * @param {HTMLElement/XMLElement} node the array node
     * @return {Array} the deserialized array
     */
    readArray: function(node) {
        var arr=[],
            n,i,j,l,name, val, len, childnodes, cn;

        // register array in object references table before we parse, in case of circular references
        this.objectReferences.push(arr);

        len = parseInt(node.getAttributeNode('length').value);
        i = 0;
        // the length only accounts for the ordinal values. For the rest, we'll read them as ECMA key-value pairs
        for (l = 0; l < node.childNodes.length; l++) {
            n = node.childNodes.item(l);
            if (n.nodeType != 1) {
                // Ignore text nodes and non-element nodes
                continue;
            }
            if (n.tagName == "item") {
                // parse item node
                name = n.getAttributeNode('name').value;
                childnodes = n.childNodes;
                for (j = 0; j < childnodes.length; j++) {
                    cn = childnodes.item(j);
                    if (cn.nodeType != 1) {
                        // Ignore text nodes and non-element nodes
                        continue;
                    }
                    val = this.readValue(cn);
                    break; // out of loop. We've found our value
                }
                arr[name] = val;
            } else {
                // ordinal node
                arr[i] = this.readValue(n);
                i++;
                //<debug>
                if (i > len) {
                    Ext.Error.raise("Array has more items than declared length: " + i + " > " + len);
                }
                //</debug>
            }
        }
        //<debug>
        if (i < len) {
            Ext.Error.raise("Array has less items than declared length: " + i + " < " + len);
        }
        //</debug>
        return arr;
    },

    /**
     * Parses and returns an AMFX dictionary.
     * @param {HTMLElement/XMLElement} node the `<dictionary>` node
     * @return {Object} a javascript object with the dictionary value-pair elements
     */
    readDictionary: function(node) {
        // For now, handle regular objects
        var dict = {},
            key, val,
            i, j, n, len;

        len = parseInt(node.getAttribute('length'));
        // Register dictionary in the ref table, in case there's a cyclical reference coming
        this.objectReferences.push(dict);


        // now find pairs of keys and values
        key = null;
        val = null;
        j = 0;
        for (i = 0; i < node.childNodes.length; i++) {
            n = node.childNodes.item(i);
            if (n.nodeType != 1) {
                // Ignore text nodes and non-element nodes
                continue;
            }
            if (!key) {
                key = this.readValue(n);
                continue; // next element is the value
            }
            val = this.readValue(n);
            j = j + 1;
            dict[key] = val;
            key = null;
            val = null;
        }
        //<debug>
        if (j != len) {
            Ext.Error.raise("Incorrect number of dictionary values: " + j + " != " + len);
        }
        //</debug>
        return dict;
    },


    /**
     * Converts externalizable flex objects with a source array to a regular array.
     * @private
     */
    convertObjectWithSourceField: function(node) {
        var i, n, val;
        for (i = 0; i < node.childNodes.length; i++) {
            n = node.childNodes.item(i);
            if (n.tagName == "bytearray") {
                val = this.readValue(n);
                this.objectReferences.push(val);
                return val;
            }
        }
        return null; // we shouldn't reach here, but just in case
    },

    /**
     * Converters used in converting specific typed Flex classes to JavaScript usable form.
     * @private
     */

    converters: {
        'flex.messaging.io.ArrayCollection': function(decoder,node) {
            return decoder.convertObjectWithSourceField(node);
        },
        'mx.collections.ArrayList':  function(decoder,node) {
            return decoder.convertObjectWithSourceField(node);
        },
        'mx.collections.ArrayCollection':  function(decoder,node) {
            return decoder.convertObjectWithSourceField(node);
        }
    }
});

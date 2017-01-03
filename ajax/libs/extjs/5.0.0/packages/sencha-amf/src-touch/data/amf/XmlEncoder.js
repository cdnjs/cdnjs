//<feature amf>
/**
 * @class Ext.data.amf.XmlEncoder
 * This class serializes data in the Action Message Format XML (AMFX) format.
 * It can write simple and complex objects, to be used in conjunction with an
 * AMFX-compliant server.
 * To create an encoded XMl, first construct an Encoder:
 *
 *     var encoder = Ext.create('Ext.data.amf.XmlEncoder');
 *
 * Then use the writer methods to out data to the :
 *
 *     encoder.writeObject(1);
 *     encoder.writeObject({a: "b"});
 *
 * And access the data through the #bytes property:
 *     encoder.getBody();
 *
 * You can also reset the class to start a new body:
 *
 *     encoder.clear();
 *
 * Current limitations:
 * AMF3 format (format:3)
 * - Each object is written out explicitly, not using the reference tables
 *   supported by the AMFX format. This means the function does NOT support
 *   circular reference objects.
 * - Objects that aren't Arrays, Dates, Strings, Document (XML) or primitive
 *   values will be written out as anonymous objects with dynamic data.
 * - If the object has a $flexType field, that field will be used in signifying
 *   the object-type as an attribute, instead of being passed as data.
 * - There's no JavaScript equivalent to the ByteArray type in ActionScript,
 *   hence data will never be searialized as ByteArrays by the writeObject
 *   function. A writeByteArray method is provided for writing out ByteArray objects.
 *
 * For more information on working with AMF data please refer to the
 * [AMF Guide](#/guide/amf).
 */

Ext.define('Ext.data.amf.XmlEncoder', {

    alias: 'data.amf.xmlencoder',
    
    config: {
        /**
         * @property {String} body - The output string
         */
        body: ""
    },

    statics: {
        /**
         * Utility function to generate a flex-friendly UID
         * @param {Number} id used in the first 8 chars of the id. If not provided, a random number will be used.
         * @return {String} a string-encoded opaque UID
         */
        generateFlexUID: function(id) {
            var uid = "",
                i, j, t;
            if (id === undefined) {
                id = this.randomInt(0, 0xffffffff);
            }
            // The format of a UID is XXXXXXXX-XXXX-XXXX-XXXX-YYYYYYYYXXXX
            // where each X is a random hex digit and each Y is a hex digit from the least significant part of a time stamp.
            t =  (id + 0x100000000).toString(16).toUpperCase(); // padded
            uid = t.substr(t.length - 8, 8); // last 8 chars

            for (j = 0; j < 3; j++) {
                // 3 -XXXX segments
                uid += "-";
                for (i = 0; i < 4; i++) {
                    uid += this.randomInt(0, 15).toString(16).toUpperCase();
                }
            }
            uid += "-";
            // add timestamp
            t = new Number(new Date()).valueOf().toString(16).toUpperCase(); // get the String representation of milliseconds in hex format
            j = 0;
            if (t.length < 8) { // pad with "0" if needed
                for (i = 0; i < t.length - 8; i++) {
                    j++;
                    uid += "0";
                }
            }
            // actual timestamp:
            uid += t.substr(-(8-j)); // last few chars
            // and last 4 random digits
            for (i = 0; i < 4; i++) {
                uid += this.randomInt(0, 15).toString(16).toUpperCase();
            }
            return uid;
        },
        /**
         * Returns a random integer between the specified range (inclusive)
         * @param {Number} from Lowest value to return.
         * @param {Number} to Highst value to return.
         * @return {Number} A random integer within the specified range.
         */
        randomInt: function (from, to) {
           return Math.floor(Math.random() * (to - from + 1) + from);
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
     * Clears the accumulated data, starting with an empty string
     */
    clear: function() {
        this.setBody("");
    },

    /**
     * Returns the encoding for undefined (which is the same as the encoding for null)
     */
    encodeUndefined: function() {
        return this.encodeNull();
    },

    /**
     * Writes the undefined value to the string
     */
    writeUndefined: function() {
        this.write(this.encodeUndefined());
    },

    /**
     * Returns the encoding for null
     */
    encodeNull: function() {
        return "<null />";
    },

    /**
     * Writes the null value to the string
     */
    writeNull: function() {
        this.write(this.encodeNull());
    },

    /**
     * Returns an encoded boolean
     * @param {Boolean} val a boolean value
     */
    encodeBoolean: function(val) {
        var str;
        if (val) {
            str = "<true />";
        } else {
            str = "<false />";
        }
        return str;
    },

    /**
     * Writes a boolean value to the string
     * @param {Boolean} val a boolean value
     */
    writeBoolean: function(val) {
        this.write(this.encodeBoolean(val));
    },


    /**
     * Returns an encoded string
     * @param {String} str the string to encode
     */
    encodeString: function(str) {
        var ret;
        if (str === "") {
            ret = "<string />";
        } else {
            ret ="<string>"+str+"</string>";
        }
        return ret;
    },

    /**
     * Writes a string tag with the string content.
     * @param {String} str the string to encode
     */
    writeString: function(str) {
        this.write(this.encodeString(str));
    },

    /**
     * Returns an encoded int
     * @param {Number} num the integer to encode
     */
    encodeInt: function(num) {
        return "<int>" + num.toString() + "</int>";
    },

    /**
     * Writes a int tag with the content.
     * @param {Number} num the integer to encode
     */
    writeInt: function(num) {
        this.write(this.encodeInt(num));
    },

    /**
     * Returns an encoded double
     * @param {Number} num the double to encode
     */
    encodeDouble: function(num) {
        return "<double>" + num.toString() + "</double>";
    },

    /**
     * Writes a double tag with the content.
     * @param {Number} num the double to encode
     */
    writeDouble: function(num) {
        this.write(this.encodeDouble(num));
    },

    /**
     * Returns an encoded number. Decides wheter to use int or double encoding.
     * @param {Number} num the number to encode
     */
    encodeNumber: function(num) {
        var maxInt = 0x1fffffff,
            minSignedInt = -0xfffffff;
        //<debug>
        if (typeof(num) !== "number" && !(num instanceof Number)) {
            Ext.log.warn("Encoder: writeNumber argument is not numeric. Can't coerce.");
        }
        // </debug>

        // switch to the primitive value for handling:
        if (num instanceof Number) {
            num = num.valueOf();
        }
        // Determine if this is an integer or a float.
        if (num % 1 === 0 && num >= minSignedInt && num <= maxInt) {
            // The number has no decimal point and is within bounds. Let's encode it.
            return this.encodeInt(num);
        } else {
            return this.encodeDouble(num);
        }
    },

    /**
     * Writes a number, deciding if to use int or double as the tag
     * @param {Number} num the number to encode
     */
    writeNumber: function(num) {
        this.write(this.encodeNumber(num));
    },

    /**
     * Encode a date
     * @param {Date} date the date to encode
     */
    encodeDate: function(date) {
        return "<date>" + (new Number(date)).toString() + "</date>";
    },

    /**
     * Write a date to the string
     * @param {Date} date the date to encode
     */
    writeDate: function(date) {
        this.write(this.encodeDate(date));
    },

    /**
     * @private
     * Encodes one ECMA array element
     * @param {String} key the name of the element
     * @param {Object} value the value of the element
     * @return {String} the encoded key-value pair
     */
    encodeEcmaElement: function(key, value) {
        var str = '<item name="' + key.toString() + '">' + this.encodeObject(value) + '</item>';
        return str;
    },

    /**
     * Encodes an array, marking it as an ECMA array if it has associative (non-ordinal) indices
     * @param {Array} array the array to encode
     */
    encodeArray: function(array) {
        var ordinals=[],
            firstNonOrdinal,
            ecmaElements=[],
            length = array.length, // length is of ordinal section only
            i, str;
        for (i in array) {
            if (Ext.isNumeric(i) && (i % 1 == 0)) {
                //this is an integer. Add to ordinals array
                ordinals[i] = this.encodeObject(array[i]);
            } else {
                ecmaElements.push(this.encodeEcmaElement(i, array[i]));
            }
        }
        firstNonOrdinal=ordinals.length;
        // now, check if we have consecutive numbers in the ordinals array
        for (i = 0; i < ordinals.length; i++) {
            if (ordinals[i] === undefined) {
                //  we have a gap in the array. Mark it - the rest of the items become ECMA elements
                firstNonOrdinal = i;
                break;
            }
        }
        if (firstNonOrdinal < ordinals.length) {
            // transfer some of the elements to the ecma array
            for (i = firstNonOrdinals; i < ordinals.length; i++) {
                if (ordinals[i] !== undefined) {
                    ecmaElements.push(this.encodeEcmaElement(i, ordinals[i]));
                }
            }
            ordinals = ordinals.slice(0, firstNonOrdinal);
        }

        // finally start constructing the string
        str = '<array length="' + ordinals.length + '"';
        if (ecmaElements.length > 0) {
            str += ' ecma="true"';
        }
        str += '>';

        // first add the oridnals in consecutive order:
        for (i = 0; i < ordinals.length; i++) { // iterate by counting since we need to guarantee the order
            str += ordinals[i];
        }
        // Now add ECMA items
        for (i in ecmaElements) {
            str += ecmaElements[i];
        }
        // And close the array:
        str += '</array>';
        return str;
    },

    /**
     * Writes an array to the string, marking it as an ECMA array if it has associative (non-ordinal) indices
     * @param {Array} array the array to encode
     */
    writeArray: function(array) {
        this.write(this.encodeArray(array));
    },

    /**
     * Encodes an xml document into a CDATA section
     * @param {XMLElement/HTMLElement} xml an XML document or element (Document type in some browsers)
     */
    encodeXml: function(xml) {
        var str = this.convertXmlToString(xml);
        return "<xml><![CDATA[" + str + "]]></xml>";
    },

    /**
     * Write an XML document to the string
     * @param {XMLElement/HTMLElement} xml an XML document or element (Document type in some browsers)
     */
    writeXml: function(xml) {
        this.write(this.encodeXml(xml));
    },

    /**
     * Encodes a generic object into AMFX format. If a <tt>$flexType</tt> member is defined, list that as the object type.
     * @param {Object} obj the object to encode
     * @return {String} the encoded text
     */
    encodeGenericObject: function(obj) {
        var traits = [],
            values = [],
            flexType = null,
            i, str;
        for (i in obj) {
            if (i == "$flexType") {
                flexType = obj[i];
            } else {
                traits.push(this.encodeString(new String(i)));
                values.push(this.encodeObject(obj[i]));
            }
        }
        if (flexType) {
            str = '<object type="' +flexType + '">';
        } else {
            str="<object>";
        }
        if (traits.length > 0) {
            str += "<traits>";
            str += traits.join("");
            str += "</traits>";
        } else {
            str += "<traits />";
        }
        str += values.join("");
        str += "</object>";
        return str;
    },

    /**
     * Writes a generic object to the string. If a <tt>$flexType</tt> member is defined, list that as the object type.
     * @param {Object} obj the object to encode
     */
    writeGenericObject: function(obj) {
        this.write(this.encodeGenericObject(obj));
    },

    /**
     * Encodes a byte arrat in AMFX format
     * @param {Array} array the byte array to encode
     */
    encodeByteArray: function(array) {
        var str, i, h;
        if (array.length > 0) {
            str = "<bytearray>";
            for (i = 0; i < array.length; i++) {
                //<debug>
                if (!Ext.isNumber(array[i])) {
                    Ext.Error.raise("Byte array contains a non-number: " + array[i]  + " in index: " + i);
                }
                if (array[i] < 0 || array[i] > 255) {
                    Ext.Error.raise("Byte array value out of bounds: " + array[i]);
                }
                //</debug>
                h = array[i].toString(16).toUpperCase();
                if (array[i] < 0x10) {
                    h = "0" + h;
                }
                str += h;
            }
            str += "</bytearray>";
        } else {
            str = "<bytearray />";
        }
        return str;
    },

    /**
     * Writes an AMFX byte array to the string. This is for convenience only and is not called automatically by writeObject.
     * @param {Array} array the byte array to encode
     */
    writeByteArray: function(array) {
        this.write(this.encodeByteArray(array));
    },

    /**
     * encode the appropriate data item. Supported types:
     * - undefined
     * - null
     * - boolean
     * - integer
     * - double
     * - UTF-8 string
     * - XML Document (identified by being instaneof Document. Can be generated with: new DOMParser()).parseFromString(xml, "text/xml");
     * - Date
     * - Array
     * - Generic object
     * @param {Object} item A primitive or object to write to the stream
     * @return {String} the encoded object in AMFX format
     */
    encodeObject: function(item) {
        var t = typeof(item);
        //Ext.log("Writing " + item + " of type " + t);
        if (t === "undefined") {
            return this.encodeUndefined();
        } else if (item === null) { // can't check type since typeof(null) returns "object"
            return this.encodeNull();
        } else if (Ext.isBoolean(item)) {
            return this.encodeBoolean(item);
        } else if (Ext.isString(item)) {
            return this.encodeString(item);
        } else if (t === "number" || item instanceof Number) { // Can't use Ext.isNumeric since it accepts strings as well
            return this.encodeNumber(item);
        } else if (t === "object") {
            // Figure out which object this is
            if (item instanceof Date) {
                return this.encodeDate(item);
            } else if (Ext.isArray(item)) {
                return this.encodeArray(item);
            } else if (this.isXmlDocument(item)) {
                return this.encodeXml(item);
            } else {
                // Treat this as a generic object with name/value pairs of data.
                return this.encodeGenericObject(item);
            }
        } else {
            //<debug>
            Ext.log.warn("AMFX Encoder: Unknown item type " + t + " can't be written to stream: " + item);
            //</debug>
        }
        return null; // if we reached here, return null
    },

    /**
     * Writes the appropriate data item to the string. Supported types:
     * - undefined
     * - null
     * - boolean
     * - integer
     * - double
     * - UTF-8 string
     * - XML Document (identified by being instaneof Document. Can be generated with: new DOMParser()).parseFromString(xml, "text/xml");
     * - Date
     * - Array
     * - Generic object
     * @param {Object} item A primitive or object to write to the stream
     */
    writeObject: function(item) {
        this.write(this.encodeObject(item));
    },

    /**
     * Encodes an AMFX remoting message with the AMFX envelope.
     * @param {Ext.data.amf.RemotingMessage} message the message to pass on to serialize.
     */
    encodeAmfxRemotingPacket: function(message) {
        var msg, str;
        str = '<amfx ver="3" xmlns="http://www.macromedia.com/2005/amfx"><body>';
        str += message.encodeMessage();
        str += '</body></amfx>';
        return str;
    },

    /**
     * Writes an AMFX remoting message with the AMFX envelope to the string.
     * @param {Ext.data.amf.RemotingMessage} message the message to pass on to serialize.
     */
    writeAmfxRemotingPacket: function(params) {
        this.write(this.encodeAmfxRemotingPacket(params));
    },

    /**
     * Converts an XML Document object to a string.
     * @param {Object} xml XML document to convert (typically Document object)
     * @return {String} A string representing the document
     * @private
     */
    convertXmlToString: function(xml) {
        var str;
        if (window.XMLSerializer) {
            // this is not IE, so:
            str = new window.XMLSerializer().serializeToString(xml);
        } else {
            //no XMLSerializer, might be an old version of IE
            str = xml.xml;
        }
        return str;
    },
    
    /**
     * Tries to determine if an object is an XML document
     * @param {Object} item to identify
     * @return {Boolean} true if it's an XML document, false otherwise
     */
    isXmlDocument: function(item) {
        // We can't test if Document is defined since IE just throws an exception. Instead rely on the DOMParser object
        if (window.DOMParser) {
            if (Ext.isDefined(item.doctype)) {
                return true;
            }
        }
        // Otherwise, check if it has an XML field
        if (Ext.isString(item.xml)) {
            // and we can get the xml
            return true;
        }
        return false;
    },

    /**
     * Appends a string to the body of the message
     * @param {String} str the string to append
     * @private
     */
    write: function(str) {
        this.setBody(this.getBody() + str);
    }
});
//</feature>
// @tag enterprise
/**
 * @class Ext.data.amf.Encoder
 * This class serializes data in the Action Message Format (AMF) format.
 * It can write simple and complex objects, to be used in conjunction with an
 * AMF-compliant server.
 * To encode a byte array, first construct an Encoder, optionally setting the format:
 *
 *     var encoder = Ext.create('Ext.data.amf.Encoder', {
 *       format: 3
 *     });
 *
 * Then use the writer methods to out data to the :
 *
 *     encoder.writeObject(1);
 *
 * And access the data through the #bytes property:
 *     encoder.bytes;
 *
 * You can also reset the class to start a new byte array:
 *
 *     encoder.clear();
 *
 * Current limitations:
 * AMF3 format (format:3)
 * - writeObject will write out XML object, not legacy XMLDocument objects. A
 *   writeXmlDocument method is provided for explicitly writing XMLDocument
 *   objects.
 * - Each object is written out explicitly, not using the reference tables
 *   supported by the AMF format. This means the function does NOT support
 *   circular reference objects.
 * - Array objects: only the numbered indices and data will be written out.
 *   Associative values will be ignored.
 * - Objects that aren't Arrays, Dates, Strings, Document (XML) or primitive
 *   values will be written out as anonymous objects with dynamic data.
 * - There's no JavaScript equivalent to the ByteArray type in ActionScript,
 *   hence data will never be searialized as ByteArrays by the writeObject
 *   function. A writeByteArray method is provided for writing out ByteArray objects.
 *
 * AMF0 format (format:0)
 * - Each object is written out explicitly, not using the reference tables
 *   supported by the AMF format. This means the function does NOT support
 *   circular reference objects.
 * - Array objects: the function always writes an associative array (following
 *   the behavior of flex).
 * - Objects that aren't Arrays, Dates, Strings, Document (XML) or primitive
 *   values will be written out as anonymous objects.
 *
 * For more information on working with AMF data please refer to the
 * [AMF Guide](#/guide/amf).
 */
Ext.define('Ext.data.amf.Encoder', {
    alias: 'data.amf.Encoder',
    config: {
        format: 3
    },
    /**
     * @property {Array} bytes
     * @readonly
     * The constructed byte array.
     */
    bytes: [],
    /**
     * Creates new Encoder.
     * @param {Object} config Configuration options
     */
    constructor: function(config) {
        this.initConfig(config);
        this.clear();
    },
    /**
     * Reset all class states and starts a new empty array for encoding data.
     * The method generates a new array for encoding, so it's safe to keep a
     * reference to the old one.
     */
    clear: function() {
        this.bytes = [];
    },
    /**
     * Sets the functions that will correctly serialize for the relevant
     * protocol version.
     * @param {Number} protocol_version the protocol version to support
     */
    applyFormat: function(protocol_version) {
        var funcs = {
                0: {
                    writeUndefined: this.write0Undefined,
                    writeNull: this.write0Null,
                    writeBoolean: this.write0Boolean,
                    writeNumber: this.write0Number,
                    writeString: this.write0String,
                    writeXml: this.write0Xml,
                    writeDate: this.write0Date,
                    writeArray: this.write0Array,
                    writeGenericObject: this.write0GenericObject
                },
                3: {
                    writeUndefined: this.write3Undefined,
                    writeNull: this.write3Null,
                    writeBoolean: this.write3Boolean,
                    writeNumber: this.write3Number,
                    writeString: this.write3String,
                    writeXml: this.write3Xml,
                    writeDate: this.write3Date,
                    writeArray: this.write3Array,
                    writeGenericObject: this.write3GenericObject
                }
            }[protocol_version];
        if (funcs) {
            Ext.apply(this, funcs);
            return protocol_version;
        } else {
            //<debug>
            Ext.raise("Unsupported AMF format: " + protocol_version + ". Only '3' (AMF3) is supported at this point.");
            //</debug>
            return;
        }
    },
    // return nothing
    /**
     * Write the appropriate data items to the byte array. Supported types:
     * - undefined
     * - null
     * - boolean
     * - integer (if AMF3 - limited by 29-bit int, otherwise passed as double)
     * - double
     * - UTF-8 string
     * - XML Document (identified by being instaneof Document. Can be generated with: new DOMParser()).parseFromString(xml, "text/xml");
     * @param {Object} item A primitive or object to write to the stream
     */
    writeObject: function(item) {
        var t = typeof (item);
        //Ext.log("Writing " + item + " of type " + t);
        if (t === "undefined") {
            this.writeUndefined();
        } else if (item === null) {
            // can't check type since typeof(null) returns "object"
            this.writeNull();
        } else if (Ext.isBoolean(item)) {
            this.writeBoolean(item);
        } else if (Ext.isString(item)) {
            this.writeString(item);
        } else if (t === "number" || item instanceof Number) {
            // Can't use Ext.isNumeric since it accepts strings as well
            this.writeNumber(item);
        } else if (t === "object") {
            // Figure out which object this is
            if (item instanceof Date) {
                this.writeDate(item);
            } else if (Ext.isArray(item)) {
                // this won't catch associative arrays deserialized by the Packet class!
                this.writeArray(item);
            } else if (this.isXmlDocument(item)) {
                this.writeXml(item);
            } else {
                // Treat this as a generic object with name/value pairs of data.
                this.writeGenericObject(item);
            }
        } else {
            //<debug>
            Ext.log.warn("AMF Encoder: Unknown item type " + t + " can't be written to stream: " + item);
        }
    },
    //</debug>
    /**
     * Writes the AMF3 undefined value to the byte array.
     * @private
     */
    write3Undefined: function() {
        this.writeByte(0);
    },
    // AMF3 undefined
    /**
     * Writes the AMF0 undefined value to the byte array.
     * @private
     */
    write0Undefined: function() {
        this.writeByte(6);
    },
    // AMF0 undefined
    /**
     * Writes the AMF3 null value to the byte array.
     * @private
     */
    write3Null: function() {
        this.writeByte(1);
    },
    // AMF3 null
    /**
     * Writes the AMF0 null value to the byte array.
     * @private
     */
    write0Null: function() {
        this.writeByte(5);
    },
    // AMF0 null
    /**
     * Writes the appropriate AMF3 boolean value to the byte array.
     * @param {boolean} item The value to write
     * @private
     */
    write3Boolean: function(item) {
        //<debug>
        if (typeof (item) !== "boolean") {
            Ext.log.warn("Encoder: writeBoolean argument is not a boolean. Coercing.");
        }
        // </debug>
        if (item) {
            this.writeByte(3);
        } else // AMF3 true
        {
            this.writeByte(2);
        }
    },
    // AMF3 false
    /**
     * Writes the appropriate AMF0 boolean value to the byte array.
     * @param {boolean} item The value to write
     * @private
     */
    write0Boolean: function(item) {
        //<debug>
        if (typeof (item) !== "boolean") {
            Ext.log.warn("Encoder: writeBoolean argument is not a boolean. Coercing.");
        }
        // </debug>
        this.writeByte(1);
        // AMF0 boolean marker
        if (item) {
            this.writeByte(1);
        } else // AMF0 true
        {
            this.writeByte(0);
        }
    },
    // AMF0 false
    /**
     * Encodes a U29 int, returning a byte array with the encoded number.
     * @param item - unsigned int value
     * @private
     */
    encode29Int: function(item) {
        var data = [],
            // prepare the bytes, then send them to the array
            num = item,
            nibble, i;
        if (num == 0) {
            return [
                0
            ];
        }
        // no other data
        // we have a special case if the number is 4-nibbles in U29 encoding
        if (num > 2097151) {
            // last nibble is an 8-bit value
            nibble = num & 255;
            data.unshift(nibble);
            num = num >> 8;
        }
        // get all the 7-bit parts ready
        while (num > 0) {
            nibble = num & 127;
            // 7 bits
            data.unshift(nibble);
            num = num >> 7;
        }
        // now we need to mark each MSb of a 7-bit byte with a 1, except the absolute last one which has a 0.
        // If there's an 8-bit byte, the 7-bit byte before it is marked with 1 as well.
        for (i = 0; i < data.length - 1; i++) {
            data[i] = data[i] | 128;
        }
        return data;
    },
    /**
     * Writes a numberic value to the byte array in AMF3 format
     * @param item A native numeric value, Number instance or one of Infinity, -Infinity or NaN
     * @private
     */
    write3Number: function(item) {
        var data;
        var maxInt = 536870911,
            minSignedInt = -268435455;
        //<debug>
        if (typeof (item) !== "number" && !(item instanceof Number)) {
            Ext.log.warn("Encoder: writeNumber argument is not numeric. Can't coerce.");
        }
        // </debug>
        // switch to the primitive value for handling:
        if (item instanceof Number) {
            item = item.valueOf();
        }
        // First we need to determine if this is an integer or a float.
        // AMF3 allows integers between -2^28 < item < 2^29, else they need to be passed as doubles.
        if (item % 1 === 0 && item >= minSignedInt && item <= maxInt) {
            // The number has no decimal point and is within bounds. Let's encode it.
            item = item & maxInt;
            // get an unsigned value to work with - we only care about 29 bits.
            data = this.encode29Int(item);
            // And , mark it as an integer
            data.unshift(4);
            // AMF3 integer marker
            // write it!
            this.writeBytes(data);
        } else {
            data = this.encodeDouble(item);
            data.unshift(5);
            // AMF3 double marker
            this.writeBytes(data);
        }
    },
    /**
     * Writes a numberic value to the byte array in AMF0 format
     * @param item A native numeric value, Number instance or one of Infinity, -Infinity or NaN
     * @private
     */
    write0Number: function(item) {
        var data;
        //<debug>
        if (typeof (item) !== "number" && !(item instanceof Number)) {
            Ext.log.warn("Encoder: writeNumber argument is not numeric. Can't coerce.");
        }
        // </debug>
        // switch to the primitive value for handling:
        if (item instanceof Number) {
            item = item.valueOf();
        }
        //In AMF0 numbers are always serialized as double-float values.
        data = this.encodeDouble(item);
        data.unshift(0);
        // AMF0 double marker
        this.writeBytes(data);
    },
    /**
     * Convert a UTF 16 char to a UTF 8 char
     * @param {Number} c char 16-bit code to convert
     * @return {Array} byte array with the UTF 8 values
     */
    encodeUtf8Char: function(c) {
        var data = [],
            val, b, i, marker;
        //<debug>
        if (c > 1114111) {
            //<debug>
            Ext.raise("UTF 8 char out of bounds");
        }
        //</debug>
        //</debug>
        if (c <= 127) {
            // One byte UTF8
            data.push(c);
        } else {
            // Multi-byte UTF8. Figure out how many bytes:
            if (c <= 2047) {
                b = 2;
            } else if (c <= 65535) {
                b = 3;
            } else {
                b = 4;
            }
            // encode LSBs of value
            marker = 128;
            // MSB marker
            for (i = 1; i < b; i++) {
                val = (c & 63) | 128;
                // lowest 6 bits of number, plus a flag to mark the byte
                data.unshift(val);
                c = c >> 6;
                // drop 6 LSbs
                marker = (marker >> 1) | 128;
            }
            // add one more bit for every byte
            // the final byte is now ready, but we need to mark it to show how many other bytes follow
            val = c | marker;
            data.unshift(val);
        }
        return data;
    },
    /**
     * Accepts a string and returns a byte array encoded in UTF-8
     * @param {String} str String to encode
     * @return {Array} byte array with string encoded in UTF-8 format
     * @private
     */
    encodeUtf8String: function(str) {
        var i,
            utf8Data = [];
        for (i = 0; i < str.length; i++) {
            var data = this.encodeUtf8Char(str.charCodeAt(i));
            Ext.Array.push(utf8Data, data);
        }
        return utf8Data;
    },
    // quicker conversion, doesn't work in IE:
    //          utf8String = unescape(encodeURIComponent(str)),
    //          utf8Data = [];
    /**
     * Encode the length of a UTF-8 string in AMF3 format.
     * @param {Array} utf8Data byte array with the encoded data
     * @return {Array} byte array encoding of length
     *
     * @private
     */
    encode3Utf8StringLen: function(utf8Data) {
        var len = utf8Data.length,
            data = [];
        if (len <= 268435455) {
            // String is under max allowed length in AMF3
            // AMF3 strings use the LSb to mark whether it's a string reference or a string value. For now we only pass values:
            len = len << 1;
            len = len | 1;
            // mark as value
            // push length value to the array
            data = this.encode29Int(len);
        } else {
            //<debug>
            Ext.raise("UTF8 encoded string too long to serialize to AMF: " + len);
        }
        //</debug>
        return data;
    },
    /**
     * Write an AMF3 UTF-8 string to the byte array
     * @param {String} item The string to write
     * @private
     */
    write3String: function(item) {
        //<debug>
        if (!Ext.isString(item)) {
            Ext.log.warn("Encoder: writString argument is not a string.");
        }
        // </debug>
        if (item == "") {
            // special case for the empty string
            this.writeByte(6);
            // AMF3 string marker
            this.writeByte(1);
        } else // zero length string
        {
            // first encode string to UTF-8.
            var utf8Data = this.encodeUtf8String(item);
            var lenData = this.encode3Utf8StringLen(utf8Data);
            // only write encoding once we got here, i.e. length of string is legal
            this.writeByte(6);
            // AMF3 string marker, only if we can actually write a string
            this.writeBytes(lenData);
            this.writeBytes(utf8Data);
        }
    },
    /**
     * Encode 16- or 32-bit integers into big-endian (network order) bytes
     * @param {Number} value the number to encode.
     * @param {Number} byte_count 2 or 4 byte encoding
     * @return {Array} byte array with encoded number
     */
    encodeXInt: function(value, byte_count) {
        var data = [],
            i;
        for (i = 0; i < byte_count; i++) {
            data.unshift(value & 255);
            value = value >> 8;
        }
        return data;
    },
    /**
     * Write an AMF0 UTF-8 string to the byte array
     * @param {String} item The string to write
     * @private
     */
    write0String: function(item) {
        //<debug>
        if (!Ext.isString(item)) {
            Ext.log.warn("Encoder: writString argument is not a string.");
        }
        // </debug>
        if (item == "") {
            // special case for the empty string
            this.writeByte(2);
            // AMF0 short string marker
            this.writeBytes([
                0,
                0
            ]);
        } else // zero length string
        {
            // first encode string to UTF-8.
            var utf8Data = this.encodeUtf8String(item);
            var encoding;
            var lenData;
            if (utf8Data.length <= 65535) {
                // short string
                encoding = 2;
                // short string
                lenData = this.encodeXInt(utf8Data.length, 2);
            } else {
                // long string
                encoding = 12;
                // long string
                lenData = this.encodeXInt(utf8Data.length, 4);
            }
            this.writeByte(encoding);
            // Approperiate AMF0 string marker
            this.writeBytes(lenData);
            this.writeBytes(utf8Data);
        }
    },
    /**
     * Writes an XML document in AMF3 format.
     * @param {Object} xml XML document (type Document typically)
     * @param {number} amfType Either 0x07 or 0x0B - the AMF3 object type to use
     * @private
     */
    write3XmlWithType: function(xml, amfType) {
        //<debug>
        // We accept XML Documents, or strings
        if (amfType !== 7 && amfType !== 11) {
            Ext.raise("write XML with unknown AMF3 code: " + amfType);
        }
        if (!this.isXmlDocument(xml)) {
            Ext.log.warn("Encoder: write3XmlWithType argument is not an xml document.");
        }
        // </debug>
        var xmlStr = this.convertXmlToString(xml);
        if (xmlStr == "") {
            // special case for the empty string
            this.writeByte(amfType);
            // AMF3 XML marker
            this.writeByte(1);
        } else // zero length string
        {
            // first encode string to UTF-8.
            var utf8Data = this.encodeUtf8String(xmlStr);
            var lenData = this.encode3Utf8StringLen(utf8Data);
            // only write encoding once we got here, i.e. length of string is legal
            this.writeByte(amfType);
            // AMF3 XML marker, only if we can actually write the string
            this.writeBytes(lenData);
            this.writeBytes(utf8Data);
        }
    },
    /**
     * Writes an Legacy XMLDocument (ActionScript Legacy XML object) in AMF3
     * format. Must be called explicitly.
     * The writeObject method will call writeXml and not writeXmlDocument.
     * @param {Object} xml XML document (type Document typically) to write
     */
    write3XmlDocument: function(xml) {
        this.write3XmlWithType(xml, 7);
    },
    /**
     * Writes an XML object (ActionScript 3 new XML object) in AMF3 format.
     * @param {Object} xml XML document (type Document typically) to write
     * @private
     */
    write3Xml: function(xml) {
        this.write3XmlWithType(xml, 11);
    },
    /**
     * Writes an XMLDocument in AMF0 format.
     * @param {Object} xml XML document (type Document typically) to write
     * @private
     */
    write0Xml: function(xml) {
        //<debug>
        // We accept XML Documents, or strings
        if (!this.isXmlDocument(xml)) {
            Ext.log.warn("Encoder: write0Xml argument is not an xml document.");
        }
        // </debug>
        var xmlStr = this.convertXmlToString(xml);
        this.writeByte(15);
        // AMF0 XML marker
        // Always encoded as a long string
        var utf8Data = this.encodeUtf8String(xmlStr);
        var lenData = this.encodeXInt(utf8Data.length, 4);
        this.writeBytes(lenData);
        this.writeBytes(utf8Data);
    },
    /**
     * Writes a date in AMF3 format.
     * @param {Date} date the date object
     * @private
     */
    write3Date: function(date) {
        //<debug>
        if (!(date instanceof Date)) {
            Ext.raise("Serializing a non-date object as date: " + date);
        }
        //</debug>
        // For now, we don't use object references to just encode the date.
        this.writeByte(8);
        // AMF3 date marker
        this.writeBytes(this.encode29Int(1));
        // mark this as a date value - we don't support references yet
        this.writeBytes(this.encodeDouble(new Number(date)));
    },
    /**
     * Writes a date in AMF0 format.
     * @param {Date} date the date object
     * @private
     */
    write0Date: function(date) {
        //<debug>
        if (!(date instanceof Date)) {
            Ext.raise("Serializing a non-date object as date: " + date);
        }
        //</debug>
        // For now, we don't use object references to just encode the date.
        this.writeByte(11);
        // AMF0 date marker
        this.writeBytes(this.encodeDouble(new Number(date)));
        this.writeBytes([
            0,
            0
        ]);
    },
    // placeholder for timezone, standard says to keep 0, flash actually writes data here
    /**
     * Writes an array in AMF3 format. Only the ordered part of the array use handled.
     * Unordered parts are ignored (e.g. a["hello"] will not be encoded).
     * @param {Array} arr the array to serialize.
     * @private
     */
    write3Array: function(arr) {
        //<debug>
        if (!Ext.isArray(arr)) {
            Ext.raise("Serializing a non-array object as array: " + arr);
        }
        if (arr.length > 268435455) {
            Ext.raise("Array size too long to encode in AMF3: " + arr.length);
        }
        //</debug>
        // For now, we don't use object references to just encode the array.
        this.writeByte(9);
        // AMF3 array marker
        // encode ordered part of array's length
        var len = arr.length;
        len = len << 1;
        // right-most bit marks this as size
        len = len | 1;
        // mark it a size
        this.writeBytes(this.encode29Int(len));
        // The associative part of the array is ignored, so mark it as empty
        this.writeByte(1);
        // equivalent to an empty UTF-8 string
        // now iterate over the array, writing each element
        Ext.each(arr, function(x) {
            this.writeObject(x);
        }, this);
    },
    /**
     * Writes a key-value pair in AMF0 format.
     * @param {String} key the name of the property
     * @param {Object} value to write in AMF0 format
     */
    write0ObjectProperty: function(key, value) {
        if (!(key instanceof String) && (typeof (key) !== "string")) {
            // coerce to a string
            key = key + "";
        }
        // first encode the key to a short UTF-8.
        var utf8Data = this.encodeUtf8String(key);
        var lenData;
        lenData = this.encodeXInt(utf8Data.length, 2);
        this.writeBytes(lenData);
        this.writeBytes(utf8Data);
        // and now write out the object
        this.writeObject(value);
    },
    /**
     * Writes an associative array in AMF0 format.
     * @param {Array} arr the array to serialize.
     * @private
     */
    write0Array: function(arr) {
        var key;
        //<debug>
        if (!Ext.isArray(arr)) {
            Ext.raise("Serializing a non-array object as array: " + arr);
        }
        //</debug>
        /* This writes a strict array, but it seems Flex always writes out associative arrays, so mimic behavior

         // For now, we don't use object references to just encode the array.
         this.writeByte(0x0A); // AMF0 strict array marker

         // encode ordered part of array's length
         var len = arr.length;
         this.writeBytes(this.encodeXInt(len, 4));

         // now iterate over the array, writing each element
         Ext.each(arr, function(x) {this.writeObject(x);}, this);
         */
        // Use ECMA (associative) array type
        this.writeByte(8);
        // AMF0 ECMA-array marker
        // we need to know the length of the array before we write the serialized data
        // to the array. Better to traverse it twice than to copy all the byte data afterwards
        var total = 0;
        for (key in arr) {
            total++;
        }
        // Now write out the length of the array
        this.writeBytes(this.encodeXInt(total, 4));
        // then write out the data
        for (key in arr) {
            Ext.Array.push(this.write0ObjectProperty(key, arr[key]));
        }
        // And finally the object end marker
        this.writeBytes([
            0,
            0,
            9
        ]);
    },
    /**
     * Writes a strict-array in AMF0 format. Unordered parts are ignored (e.g.
     * a["hello"] will not be encoded). This function is included for
     * completeness and will never be called by writeObject.
     * @param {Array} arr the array to serialize.
     */
    write0StrictArray: function(arr) {
        //<debug>
        if (!Ext.isArray(arr)) {
            Ext.raise("Serializing a non-array object as array: " + arr);
        }
        //</debug>
        // For now, we don't use object references to just encode the array.
        this.writeByte(10);
        // AMF0 strict array marker
        // encode ordered part of array's length
        var len = arr.length;
        this.writeBytes(this.encodeXInt(len, 4));
        // now iterate over the array, writing each element
        Ext.each(arr, function(x) {
            this.writeObject(x);
        }, this);
    },
    /**
     * Write a byte array in AMF3 format. This function is never called directly
     * by writeObject since there's no way to distinguish a regular array from a
     * byte array.
     * @param {Array} arr the object to serialize.
     */
    write3ByteArray: function(arr) {
        //<debug>
        if (!Ext.isArray(arr)) {
            Ext.raise("Serializing a non-array object as array: " + arr);
        }
        if (arr.length > 268435455) {
            Ext.raise("Array size too long to encode in AMF3: " + arr.length);
        }
        //</debug>
        this.writeByte(12);
        // Byte array marker
        // for now no support for references, so just dump the length and data
        // encode array's length
        var len = arr.length;
        len = len << 1;
        // right-most bit marks this as size
        len = len | 1;
        // mark it a size
        this.writeBytes(this.encode29Int(len));
        // and finally, dump the byte data
        this.writeBytes(arr);
    },
    /**
     * Write an object to the byte array in AMF3 format.
     * Since we don't have the class information form Flex, the object
     * is written as an anonymous object.
     * @param {Array} obj the object to serialize.
     * @private
     */
    write3GenericObject: function(obj) {
        var name;
        //<debug>
        if (!Ext.isObject(obj)) {
            Ext.raise("Serializing a non-object object: " + obj);
        }
        //</debug>
        // For now, we don't use object references so just encode the object.
        this.writeByte(10);
        // AMF3 object marker
        // The following 29-int is marked as follows (LSb to MSb) to signify a
        // "U29O-traits":
        // 1 - LSb marks an object value (1) or an object reference (0) which
        //     is not yet supported.
        // 1 - trait values (1) or trait references (0) which are not supported
        //     yet.
        // 0 - AMF3 format (0) or externalizable, i.e. object handles own
        //     serialization (1) which is not supported.
        // 1 - dynamic (1) or not dynamic (0) object which is not relevant since
        //     we pass all data as dynamic fields.
        // The reset of the bits signify how many sealed traits the object has.
        //     we pass 0 since all data is passed as dynamic fields
        var oType = 11;
        // binary 1011
        this.writeByte(oType);
        // Next we pass the class name, which is the empty string for anonymous
        // objects
        this.writeByte(1);
        // Next are the sealed traits (of which we have none)
        // And now the name / value pairs of dynamic fields
        for (name in obj) {
            // Ensure that name is actually a string
            var newName = new String(name).valueOf();
            if (newName == "") {
                //<debug>
                Ext.raise("Can't encode non-string field name: " + name);
            }
            //</debug>
            var nameData = (this.encodeUtf8String(name));
            this.writeBytes(this.encode3Utf8StringLen(name));
            this.writeBytes(nameData);
            this.writeObject(obj[name]);
        }
        // And mark the end of the dynamic field section with the empty string
        this.writeByte(1);
    },
    /**
     * Write an object to the byte array in AMF0 format.
     * Since we don't have the class information form Flex, the object
     * is written as an anonymous object.
     * @param {Array} obj the object to serialize.
     * @private
     */
    write0GenericObject: function(obj) {
        var typed, amfType, key;
        //<debug>
        if (!Ext.isObject(obj)) {
            Ext.raise("Serializing a non-object object: " + obj);
        }
        //</debug>
        // For now, we don't use object references so just encode the object.
        // if the object is typed, the ID changes and we need to send the type ahead of the data
        typed = !!obj.$flexType;
        amfType = typed ? 16 : 3;
        // typed vs. untyped object
        this.writeByte(amfType);
        // AMF0 object marker
        // if typed, send object type
        if (typed) {
            this.write0ShortUtf8String(obj.$flexType);
        }
        // then write out the data. There's no counter, but other than that it's the same as an ECMA array
        for (key in obj) {
            if (key != "$flexType") {
                Ext.Array.push(this.write0ObjectProperty(key, obj[key]));
            }
        }
        // And finally the object end marker
        this.writeBytes([
            0,
            0,
            9
        ]);
    },
    /**
     * Writes a byte to the byte array
     * @param {number} b Byte to write to the array
     * @private
     */
    writeByte: function(b) {
        //<debug>
        if (b < 0 || b > 255) {
            Ex.Error.raise('ERROR: Value being written outside byte range: ' + b);
        }
        //</debug>
        Ext.Array.push(this.bytes, b);
    },
    /**
     * Writes a byte array to the byte array
     * @param {number} b Byte array to append to the array
     * @private
     */
    writeBytes: function(b) {
        var i;
        //<debug>
        if (!Ext.isArray(b)) {
            Ext.raise("Decoder: writeBytes parameter is not an array: " + b);
        }
        for (i = 0; i < b.length; i++) {
            if (b[i] < 0 || b[i] > 255 || !Ext.isNumber(b[i])) {
                Ext.raise("ERROR: Value " + i + " being written outside byte range: " + b[i]);
            }
        }
        //</debug>
        Ext.Array.push(this.bytes, b);
    },
    /**
     * Converts an XML Document object to a string.
     * @param {Object} xml XML document (type Document typically) to convert
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
    /*
     * The encodeDouble function is derived from code from the typedarray.js library by Linden Research, Inc.
     *

     Copyright (c) 2010, Linden Research, Inc.

     Permission is hereby granted, free of charge, to any person obtaining a copy
     of this software and associated documentation files (the "Software"), to deal
     in the Software without restriction, including without limitation the rights
     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the Software is
     furnished to do so, subject to the following conditions:

     The above copyright notice and this permission notice shall be included in
     all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     THE SOFTWARE.
     */
    /**
     * Encodes an IEEE-754 double-precision number.
     * @param {Number} num the number to encode
     * @return {Array} byte array containing the encoded number
     * @private
     */
    encodeDouble: function(v) {
        var ebits = 11,
            fbits = 52;
        // double
        var bias = (1 << (ebits - 1)) - 1,
            s, e, f, ln, i, bits, str,
            data = [];
        // Precalculated values
        var K_INFINITY = [
                127,
                240,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            K_NINFINITY = [
                255,
                240,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            K_NAN = [
                255,
                248,
                0,
                0,
                0,
                0,
                0,
                0
            ];
        // Compute sign, exponent, fraction
        if (isNaN(v)) {
            data = K_NAN;
        } else if (v === Infinity) {
            data = K_INFINITY;
        } else if (v == -Infinity) {
            data = K_NINFINITY;
        } else {
            // not a special case, so encode
            if (v === 0) {
                e = 0;
                f = 0;
                s = (1 / v === -Infinity) ? 1 : 0;
            } else {
                s = v < 0;
                v = Math.abs(v);
                if (v >= Math.pow(2, 1 - bias)) {
                    // Normalized
                    ln = Math.min(Math.floor(Math.log(v) / Math.LN2), bias);
                    e = ln + bias;
                    f = Math.round(v * Math.pow(2, fbits - ln) - Math.pow(2, fbits));
                } else {
                    // Denormalized
                    e = 0;
                    f = Math.round(v / Math.pow(2, 1 - bias - fbits));
                }
            }
            // Pack sign, exponent, fraction
            bits = [];
            for (i = fbits; i; i -= 1) {
                bits.push(f % 2 ? 1 : 0);
                f = Math.floor(f / 2);
            }
            for (i = ebits; i; i -= 1) {
                bits.push(e % 2 ? 1 : 0);
                e = Math.floor(e / 2);
            }
            bits.push(s ? 1 : 0);
            bits.reverse();
            str = bits.join('');
            // Bits to bytes
            data = [];
            while (str.length) {
                data.push(parseInt(str.substring(0, 8), 2));
                str = str.substring(8);
            }
        }
        return data;
    },
    /**
     * Writes a short UTF8 string preceded with a 16-bit length.
     * @param {String} str the string to write
     */
    write0ShortUtf8String: function(str) {
        var utf8Data = this.encodeUtf8String(str),
            lenData;
        lenData = this.encodeXInt(utf8Data.length, 2);
        this.writeBytes(lenData);
        this.writeBytes(utf8Data);
    },
    /**
     * Writes an AMF packet to the byte array
     * @param {Array} headers the headers to serialize. Each item in the array
     *                should be an object with three fields:
     *                name, mustUnderstand, value
     * @param {Array} messages the messages to serialize. Each item in the array
     *                should be an object with three fields:
     *                targetUri, responseUri, body
     */
    writeAmfPacket: function(headers, messages) {
        var i;
        //<debug>
        if (this.config.format != 0) {
            Ext.raise("Trying to write a packet on an AMF3 Encoder. Only AMF0 is supported!");
        }
        if (!Ext.isArray(headers)) {
            Ext.raise("headers is not an array: " + headers);
        }
        if (!Ext.isArray(messages)) {
            Ext.raise("messages is not an array: " + messages);
        }
        //</debug>
        // Write Packet marker
        this.writeBytes([
            0,
            0
        ]);
        // AMF 0 version for this packet.
        // Write header count
        this.writeBytes(this.encodeXInt(headers.length, 2));
        // And actual headers
        for (i in headers) {
            this.writeAmfHeader(headers[i].name, headers[i].mustUnderstand, headers[i].value);
        }
        // Write message count
        this.writeBytes(this.encodeXInt(messages.length, 2));
        // And actual messages
        for (i in messages) {
            this.writeAmfMessage(messages[i].targetUri, messages[i].responseUri, messages[i].body);
        }
    },
    /**
     * Write an AMF header to the byte array. AMF headers are always encoded in AMF0.
     * @param {String} headerName the header name
     * @param {Boolean} mustUnderstand true if the receiver must understand this header or else reject it, false otherwise
     * @param {Object} value the value to serialize. Must be an object that can be serialized by AMF
     * @private
     */
    writeAmfHeader: function(headerName, mustUnderstand, value) {
        //<debug>
        if (this.config.format != 0) {
            Ext.raise("Trying to write a header on an AMF3 Encoder. Only AMF0 is supported!");
        }
        if (!Ext.isString(headerName)) {
            Ext.raise("targetURI is not a string: " + targetUri);
        }
        if ((typeof (mustUnderstand) !== "boolean") && !Ext.isBoolean(mustUnderstand)) {
            Ext.raise("mustUnderstand is not a boolean value: " + mustUnderstand);
        }
        //</debug>
        // write header name
        this.write0ShortUtf8String(headerName);
        // write must understand byte
        var mu = mustUnderstand ? 1 : 0;
        this.writeByte(mu);
        // next write the header length of -1 (undetermined) to the stream
        this.writeBytes(this.encodeXInt(-1, 4));
        // write value
        this.writeObject(value);
    },
    /**
     * Writes an AMF message to the byte array. AMF messages are always encoded in AMF0.
     * @param {String} targetUri the class / method to call
     * @param {String} responseUri the response should call here
     * @param {Array} body the parameters to pass to the called method, wrapped in an array
     * @private
     */
    writeAmfMessage: function(targetUri, responseUri, body) {
        //<debug>
        if (this.config.format != 0) {
            Ext.raise("Trying to write a message on an AMF3 Encoder. Only AMF0 is supported!");
        }
        if (!Ext.isString(targetUri)) {
            Ext.raise("targetURI is not a string: " + targetUri);
        }
        if (!Ext.isString(responseUri)) {
            Ext.raise("targetURI is not a string: " + responseUri);
        }
        if (!Ext.isArray(body)) {
            Ext.raise("body is not an array: " + typeof (body));
        }
        //</debug>
        // write target URI
        this.write0ShortUtf8String(targetUri);
        // write response URI
        this.write0ShortUtf8String(responseUri);
        // next write the message length of -1 (undetermined) to the stream
        this.writeBytes(this.encodeXInt(-1, 4));
        // write the paramters
        this.write0StrictArray(body);
    }
});

// @tag enterprise
/**
 * @class Ext.data.amf.Packet
 * This class represents an Action Message Format (AMF) Packet.  It contains all
 * the logic required to decode an AMF Packet from a byte array.
 * To decode a Packet, first construct a Packet:
 *
 *     var packet = Ext.create('Ext.data.amf.Packet');
 *
 * Then use the decode method to decode an AMF byte array:
 *
 *     packet.decode(bytes);
 *
 * where "bytes" is a Uint8Array or an array of numbers representing the binary
 * AMF data.
 *
 * To access the decoded data use the #version, #headers, and #messages properties:
 *
 *     console.log(packet.version, packet.headers, packet.messages);
 *
 * For more information on working with AMF data please refer to the
 * [AMF Guide](#/guide/amf).
 */
Ext.define('Ext.data.amf.Packet', function() {
    var twoPowN52 = Math.pow(2, -52),
        twoPow8 = Math.pow(2, 8),
        pos = 0,
        bytes, strings, objects, traits;
    return {
        /**
         * @property {Array} headers
         * @readonly
         * The decoded headers. Each header has the following properties:
         *
         * - `name`: String
         * The header name. Typically identifies a remote operation or method to
         * be invoked by this context header.
         * - `mustUnderstand`: Boolean
         * If `true` this flag instructs the endpoint to abort and generate an
         * error if the header is not understood.
         * - `byteLength`: Number
         * If the byte-length of a header is known it can be specified to optimize
         * memory allocation at the remote endpoint.
         * - `value`: Mixed
         * The header value
         */
        /**
         * @property {Array} messages
         * @readonly
         * The decoded messages. Each message has the following properties:
         *
         * - `targetURI`: String
         * Describes which operation, function, or method is to be remotely
         * invoked.
         * - `responseURI`: String
         * A unique operation name
         * - `byteLength`: Number
         * Optional byte-length of the message body
         * - `body`: Mixed
         * The message body
         */
        /**
         * @property {Number} version
         * @readonly
         * The AMF version number (0 or 3)
         */
        /**
         * Mapping of AMF data types to the names of the methods responsible for
         * reading them.
         * @private
         */
        typeMap: {
            // AMF0 mapping
            0: {
                0: 'readDouble',
                1: 'readBoolean',
                2: 'readAmf0String',
                3: 'readAmf0Object',
                5: 'readNull',
                6: 'readUndefined',
                7: 'readReference',
                8: 'readEcmaArray',
                10: 'readStrictArray',
                11: 'readAmf0Date',
                12: 'readLongString',
                13: 'readUnsupported',
                15: 'readAmf0Xml',
                16: 'readTypedObject'
            },
            // AMF3 mapping
            3: {
                0: 'readUndefined',
                1: 'readNull',
                2: 'readFalse',
                3: 'readTrue',
                4: 'readUInt29',
                5: 'readDouble',
                6: 'readAmf3String',
                7: 'readAmf3Xml',
                8: 'readAmf3Date',
                9: 'readAmf3Array',
                10: 'readAmf3Object',
                11: 'readAmf3Xml',
                12: 'readByteArray'
            }
        },
        /**
         * Decodes an AMF btye array and sets the decoded data as the
         * Packet's #version, #headers, and #messages properties
         * @param {Array} byteArray A byte array containing the encoded AMF data.
         * @return {Ext.data.amf.Packet} this AMF Packet
         */
        decode: function(byteArray) {
            var me = this,
                headers = me.headers = [],
                messages = me.messages = [],
                headerCount, messageCount;
            pos = 0;
            bytes = me.bytes = byteArray;
            // The strings array holds references to all of the deserialized
            // AMF3 strings for a given header value or message body so that
            // repeat instances of the same string can be deserialized by
            // reference
            strings = me.strings = [];
            // The objects array holds references to deserialized objects so
            // that repeat occurrences of the same object instance in the byte
            // array can be deserialized by reference.
            // If version is AMF0 this array holds anonymous objects, typed
            // objects, arrays, and ecma-arrays.
            // If version is AMF3 this array holds instances of Object, Array, XML,
            // XMLDocument, ByteArray, Date, and instances of user defined Classes
            objects = me.objects = [];
            // The traits array holds references to the "traits" (the
            // characteristics of objects that define a strong type such as the
            // class name and public member names) of deserialized AMF3 objects
            // so that if they are repeated they can be deserialized by reference.
            traits = me.traits = [];
            // The first two bytes of an AMF packet contain the AMF version
            // as an unsigned 16 bit integer.
            me.version = me.readUInt(2);
            // the next 2 bytes contain the header count
            for (headerCount = me.readUInt(2); headerCount--; ) {
                headers.push({
                    name: me.readAmf0String(),
                    mustUnderstand: me.readBoolean(),
                    byteLength: me.readUInt(4),
                    value: me.readValue()
                });
                // reset references (reference indices are local to each header)
                strings = me.strings = [];
                objects = me.objects = [];
                traits = me.traits = [];
            }
            // The 2 bytes immediately after the header contain the message count.
            for (messageCount = me.readUInt(2); messageCount--; ) {
                messages.push({
                    targetURI: me.readAmf0String(),
                    responseURI: me.readAmf0String(),
                    byteLength: me.readUInt(4),
                    body: me.readValue()
                });
                // reset references (reference indices are local to each message)
                strings = me.strings = [];
                objects = me.objects = [];
                traits = me.traits = [];
            }
            // reset the pointer
            pos = 0;
            // null the bytes array and reference arrays to free up memory.
            bytes = strings = objects = traits = me.bytes = me.strings = me.objects = me.traits = null;
            return me;
        },
        /**
         * Decodes an AMF3 byte array and that has one value and returns it.
         * Note: Destroys previously stored data in this Packet.
         * @param {Array} byteArray A byte array containing the encoded AMF data.
         * @return {Object} the decoded object
         */
        decodeValue: function(byteArray) {
            var me = this;
            bytes = me.bytes = byteArray;
            // reset the pointer
            pos = 0;
            // The first two bytes of an AMF packet contain the AMF version
            // as an unsigned 16 bit integer.
            me.version = 3;
            // The strings array holds references to all of the deserialized
            // AMF3 strings for a given header value or message body so that
            // repeat instances of the same string can be deserialized by
            // reference
            strings = me.strings = [];
            // The objects array holds references to deserialized objects so
            // that repeat occurrences of the same object instance in the byte
            // array can be deserialized by reference.
            // If version is AMF0 this array holds anonymous objects, typed
            // objects, arrays, and ecma-arrays.
            // If version is AMF3 this array holds instances of Object, Array, XML,
            // XMLDocument, ByteArray, Date, and instances of user defined Classes
            objects = me.objects = [];
            // The traits array holds references to the "traits" (the
            // characteristics of objects that define a strong type such as the
            // class name and public member names) of deserialized AMF3 objects
            // so that if they are repeated they can be deserialized by reference.
            traits = me.traits = [];
            // read one value and return it
            return me.readValue();
        },
        /**
         * Parses an xml string and returns an xml document
         * @private
         * @param {String} xml
         */
        parseXml: function(xml) {
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
         * Reads an AMF0 date from the byte array
         * @private
         */
        readAmf0Date: function() {
            var date = new Date(this.readDouble());
            // An AMF0 date type ends with a 16 bit integer time-zone, but
            // according to the spec time-zone is "reserved, not supported,
            // should be set to 0x000".
            pos += 2;
            // discard the time zone
            return date;
        },
        /**
         * Reads an AMF0 Object from the byte array
         * @private
         */
        readAmf0Object: function(obj) {
            var me = this,
                key;
            obj = obj || {};
            // add the object to the objects array so that the AMF0 reference
            // type decoder can refer to it by index if needed.
            objects.push(obj);
            // An AMF0 object consists of a series of string keys and variable-
            // type values.  The end of the series is marked by an empty string
            // followed by the object-end marker (9).
            while ((key = me.readAmf0String()) || bytes[pos] !== 9) {
                obj[key] = me.readValue();
            }
            // move the pointer past the object-end marker
            pos++;
            return obj;
        },
        /**
         * Reads an AMF0 string from the byte array
         * @private
         */
        readAmf0String: function() {
            // AMF0 strings begin with a 16 bit byte-length header.
            return this.readUtf8(this.readUInt(2));
        },
        readAmf0Xml: function() {
            return this.parseXml(this.readLongString());
        },
        readAmf3Array: function() {
            var me = this,
                header = me.readUInt29(),
                count, key, array, i;
            // AMF considers Arrays in two parts, the dense portion and the
            // associative portion. The binary representation of the associative
            // portion consists of name/value pairs (potentially none) terminated
            // by an empty string. The binary representation of the dense portion
            // is the size of the dense portion (potentially zero) followed by an
            // ordered list of values (potentially none).
            if (header & 1) {
                // If the first (low) bit is a 1 read an array instance.  The
                // remaining 1-28 bits are used to encode the length of the
                // dense portion of the array.
                count = (header >> 1);
                // First read the associative portion of the array (if any).  If
                // there is an associative portion, the array will be read as a
                // javascript object, otherwise it will be a javascript array.
                key = me.readAmf3String();
                if (key) {
                    // First key is not an empty string - this is an associative
                    // array.  Read keys and values from the byte array until
                    // we get to an empty string key
                    array = {};
                    objects.push(array);
                    do {
                        array[key] = me.readValue();
                    } while ((key = me.readAmf3String()));
                    // The dense portion of the array is then read into the
                    // associative object, keyed by ordinal index.
                    for (i = 0; i < count; i++) {
                        array[i] = me.readValue();
                    }
                } else {
                    // First key is an empty string - this is an array with
                    // ordinal indices.
                    array = [];
                    objects.push(array);
                    for (i = 0; i < count; i++) {
                        array.push(me.readValue());
                    }
                }
            } else {
                // If the first (low) bit is a 0 read an array reference. The
                // remaining 1-28 bits are used to encode the reference index
                array = objects[header >> 1];
            }
            return array;
        },
        /**
         * Reads an AMF3 date from the byte array
         * @private
         */
        readAmf3Date: function() {
            var me = this,
                header = me.readUInt29(),
                date;
            if (header & 1) {
                // If the first (low) bit is a 1, this is a date instance.
                date = new Date(me.readDouble());
                objects.push(date);
            } else {
                // If the first (low) bit is a 0, this is a date reference.
                // The remaining 1-28 bits encode the reference index
                date = objects[header >> 1];
            }
            return date;
        },
        /**
         * Reads an AMF3 object from the byte array
         * @private
         */
        readAmf3Object: function() {
            var me = this,
                header = me.readUInt29(),
                members = [],
                headerLast3Bits, memberCount, className, dynamic, objectTraits, obj, key, klass, i;
            // There are 3 different types of object headers, distinguishable
            // by the 1-3 least significant bits.  All object instances have
            // a 1 in the low bit position, while references have a 0:
            //
            // 0    : object reference
            // 011  : traits
            // 01   : traits-ref
            // 111  : traits-ext
            if (header & 1) {
                // first (low) bit of 1, denotes an encoded object instance
                // The next string is the class name.
                headerLast3Bits = (header & 7);
                if (headerLast3Bits === 3) {
                    // If the 3 least significant bits of the header are "011"
                    // then trait information follows.
                    className = me.readAmf3String();
                    // A 1 in the header's 4th least significant byte position
                    // indicates that dynamic members may follow the sealed
                    // members.
                    dynamic = !!(header & 8);
                    // Shift off the 4 least significant bits, and the remaining
                    // 1-25 bits encode the number of sealed member names. Read
                    // as many strings from the byte array as member names.
                    memberCount = (header >> 4);
                    for (i = 0; i < memberCount; i++) {
                        members.push(me.readAmf3String());
                    }
                    objectTraits = {
                        className: className,
                        dynamic: dynamic,
                        members: members
                    };
                    // An objects traits are cached in the traits array enabling
                    // the traits for a given class to only be encoded once for
                    // a series of instances.
                    traits.push(objectTraits);
                } else if ((header & 3) === 1) {
                    // If the 2 least significant bits are "01", then a traits
                    // reference follows.  The remaining 1-27 bits are used
                    // to encode the trait reference index.
                    objectTraits = traits[header >> 2];
                    className = objectTraits.className;
                    dynamic = objectTraits.dynamic;
                    members = objectTraits.members;
                    memberCount = members.length;
                } else if (headerLast3Bits === 7) {}
                // if the 3 lease significant bits are "111" then
                // externalizable trait data follows
                // TODO: implement externalizable traits
                if (className) {
                    klass = Ext.ClassManager.getByAlias('amf.' + className);
                    obj = klass ? new klass() : {
                        $className: className
                    };
                } else {
                    obj = {};
                }
                objects.push(obj);
                // read the sealed member values
                for (i = 0; i < memberCount; i++) {
                    obj[members[i]] = me.readValue();
                }
                if (dynamic) {
                    // If the dynamic flag is set, dynamic members may follow
                    // the sealed members. Read key/value pairs until we
                    // encounter an empty string key signifying the end of the
                    // dynamic members.
                    while ((key = me.readAmf3String())) {
                        obj[key] = me.readValue();
                    }
                }
                // finally, check if we need to convert this class
                if ((!klass) && this.converters[className]) {
                    obj = this.converters[className](obj);
                }
            } else {
                // If the first (low) bit of the header is a 0, this is an
                // object reference. The remaining 1-28 significant bits are
                // used to encode an object reference index.
                obj = objects[header >> 1];
            }
            return obj;
        },
        /**
         * Reads an AMF3 string from the byte array
         * @private
         */
        readAmf3String: function() {
            var me = this,
                header = me.readUInt29(),
                value;
            if (header & 1) {
                // If the first (low) bit is a 1, this is a string literal.
                // Discard the low bit.  The remaining 1-28 bits are used to
                // encode the string's byte-length.
                value = me.readUtf8(header >> 1);
                if (value) {
                    // the emtpy string is never encoded by reference
                    strings.push(value);
                }
                return value;
            } else {
                // If the first (low) bit is a 0, this is a string reference.
                // Discard the low bit, then look up and return the reference
                // from the strings array using the remaining 1-28 bits as the
                // index.
                return strings[header >> 1];
            }
        },
        /**
         * Reads an AMF3 XMLDocument type or XML type from the byte array
         * @private
         */
        readAmf3Xml: function() {
            var me = this,
                header = me.readUInt29(),
                doc;
            if (header & 1) {
                // If the first (low) bit is a 1, this is an xml instance. The
                // remaining 1-28 bits encode the byte-length of the xml string.
                doc = me.parseXml(me.readUtf8(header >> 1));
                objects.push(doc);
            } else {
                // if the first (low) bit is a 1, this is an xml reference. The
                // remaining 1-28 bits encode the reference index.
                doc = objects[header >> 1];
            }
            return doc;
        },
        /**
         * Reads an AMF0 boolean from the byte array
         * @private
         */
        readBoolean: function() {
            return !!bytes[pos++];
        },
        /**
         * Reads an AMF3 ByteArray type from the byte array
         * @private
         */
        readByteArray: function() {
            var header = this.readUInt29(),
                byteArray, end;
            if (header & 1) {
                // If the first (low) bit is a 1, this is a ByteArray instance.
                // The remaining 1-28 bits encode the ByteArray's byte-length.
                end = pos + (header >> 1);
                // Depending on the browser, "bytes" may be either a Uint8Array
                // or an Array.  Uint8Arrays don't have Array methods, so
                // we have to use Array.prototype.slice to get the byteArray
                byteArray = Array.prototype.slice.call(bytes, pos, end);
                objects.push(byteArray);
                // move the pointer to the first byte after the byteArray that
                // was just read
                pos = end;
            } else {
                // if the first (low) bit is a 1, this is a ByteArray reference.
                // The remaining 1-28 bits encode the reference index.
                byteArray = objects[header >> 1];
            }
            return byteArray;
        },
        /**
         * Reads a IEEE 754 double-precision binary floating-point number
         * @private
         */
        readDouble: function() {
            var byte1 = bytes[pos++],
                byte2 = bytes[pos++],
                // the first bit of byte1 is the sign (0 = positive, 1 = negative.
                // We read this bit by shifting the 7 least significant bits of
                // byte1 off to the right.
                sign = (byte1 >> 7) ? -1 : 1,
                // the exponent takes up the next 11 bits.
                exponent = // extract the 7 least significant bits from byte1 and then
                // shift them left by 4 bits to make room for the 4 remaining
                // bits from byte 2
                (((byte1 & 127) << 4) | // add the 4 most significant bits from byte 2 to complete
                // the exponent
                (byte2 >> 4)),
                // the remaining 52 bits make up the significand. read the 4
                // least significant bytes of byte 2 to begin the significand
                significand = (byte2 & 15),
                // The most significant bit of the significand is always 1 for
                // a normalized number, therefore it is not stored. This bit is
                // referred to as the "hidden bit". The true bit width of the
                // significand is 53 if you include the hidden bit. An exponent
                // of 0 indicates that this is a subnormal number, and subnormal
                // numbers always have a 0 hidden bit.
                hiddenBit = exponent ? 1 : 0,
                i = 6;
            // The operands of all bitwise operators in javascript are converted
            // to signed 32 bit integers.  It is therefore impossible to construct
            // the 52 bit significand by repeatedly shifting its bits and then
            // bitwise OR-ing the result with the the next byte. To work around
            // this issue, we repeatedly multiply the significand by 2^8 which
            // produces the same result as (significand << 8), then we add the
            // next byte, which has the same result as a bitwise OR.
            while (i--) {
                significand = (significand * twoPow8) + bytes[pos++];
            }
            if (!exponent) {
                if (!significand) {
                    // if both exponent and significand are 0, the number is 0
                    return 0;
                }
                // If the exponent is 0, but the significand is not 0, this
                // is a subnormal number. Subnormal numbers are encoded with a
                // biased exponent of 0, but are interpreted with the value of
                // the smallest allowed exponent, which is one greater.
                exponent = 1;
            }
            // 0x7FF (2047) is a special exponent value that represents infinity
            // if the significand is 0, and NaN if the significand is not 0
            if (exponent === 2047) {
                return significand ? NaN : (Infinity * sign);
            }
            return sign * // The exponent is encoded using an offset binary
            // representation with the zero offset being 0x3FF (1023),
            // so we have to subtract 0x3FF to get the true exponent
            Math.pow(2, exponent - 1023) * // convert the significand to its decimal value by multiplying
            // it by 2^52 and then add the hidden bit
            (hiddenBit + twoPowN52 * significand);
        },
        /**
         * Reads an AMF0 ECMA Array from the byte array
         * @private
         */
        readEcmaArray: function() {
            // An ecma array type is encoded exactly like an anonymous object
            // with the exception that it has a 32 bit "count" at the beginning.
            // We handle emca arrays by just throwing away the count and then
            // letting the object decoder handle the rest.
            pos += 4;
            return this.readAmf0Object();
        },
        /**
         * Returns false.  Used for reading the false type
         * @private
         */
        readFalse: function() {
            return false;
        },
        /**
         * Reads a long string (longer than 65535 bytes) from the byte array
         * @private
         */
        readLongString: function() {
            // long strings begin with a 32 bit byte-length header.
            return this.readUtf8(this.readUInt(4));
        },
        /**
         * Returns null.  Used for reading the null type
         * @private
         */
        readNull: function() {
            return null;
        },
        /**
         * Reads a reference from the byte array.  Reference types are used to
         * avoid duplicating data if the same instance of a complex object (which
         * is defined in AMF0 as an anonymous object, typed object, array, or
         * ecma-array) is included in the data more than once.
         * @private
         */
        readReference: function() {
            // a reference type contains a single 16 bit integer that represents
            // the index of an already deserialized object in the objects array
            return objects[this.readUInt(2)];
        },
        /**
         * Reads an AMF0 strict array (an array with ordinal indices)
         * @private
         */
        readStrictArray: function() {
            var me = this,
                len = me.readUInt(4),
                arr = [];
            objects.push(arr);
            while (len--) {
                arr.push(me.readValue());
            }
            return arr;
        },
        /**
         * Returns true.  Used for reading the true type
         * @private
         */
        readTrue: Ext.returnTrue,
        /**
         * Reads an AMF0 typed object from the byte array
         * @private
         */
        readTypedObject: function() {
            var me = this,
                className = me.readAmf0String(),
                klass, instance, modified;
            klass = Ext.ClassManager.getByAlias('amf.' + className);
            instance = klass ? new klass() : {
                $className: className
            };
            // if there is no klass, mark the classname for easier parsing of returned results
            modified = me.readAmf0Object(instance);
            // check if we need to convert this class
            if ((!klass) && this.converters[className]) {
                modified = this.converters[className](instance);
            }
            return modified;
        },
        /**
         * Reads an unsigned integer from the byte array
         * @private
         * @param {Number} byteCount the number of bytes to read, e.g. 2 to read
         * a 16 bit integer, 4 to read a 32 bit integer, etc.
         * @return {Number}
         */
        readUInt: function(byteCount) {
            var i = 1,
                result;
            // read the first byte
            result = bytes[pos++];
            // if this is a multi-byte int, loop over the remaining bytes
            for (; i < byteCount; ++i) {
                // shift the result 8 bits to the left and add the next byte.
                result = (result << 8) | bytes[pos++];
            }
            return result;
        },
        /**
         * Reads an unsigned 29-bit integer from the byte array.
         * AMF 3 makes use of a special compact format for writing integers to
         * reduce the number of bytes required for encoding. As with a normal
         * 32-bit integer, up to 4 bytes are required to hold the value however
         * the high bit of the first 3 bytes are used as flags to determine
         * whether the next byte is part of the integer. With up to 3 bits of
         * the 32 bits being used as flags, only 29 significant bits remain for
         * encoding an integer. This means the largest unsigned integer value
         * that can be represented is 2^29-1.
         *
         *           (hex)         :                (binary)
         * 0x00000000 - 0x0000007F :  0xxxxxxx
         * 0x00000080 - 0x00003FFF :  1xxxxxxx 0xxxxxxx
         * 0x00004000 - 0x001FFFFF :  1xxxxxxx 1xxxxxxx 0xxxxxxx
         * 0x00200000 - 0x3FFFFFFF :  1xxxxxxx 1xxxxxxx 1xxxxxxx xxxxxxxx
         * @private
         * @return {Number}
         */
        readUInt29: function() {
            var value = bytes[pos++],
                nextByte;
            if (value & 128) {
                // if the high order bit of the first byte is a 1, the next byte
                // is also part of this integer.
                nextByte = bytes[pos++];
                // remove the high order bit from both bytes before combining them
                value = ((value & 127) << 7) | (nextByte & 127);
                if (nextByte & 128) {
                    // if the high order byte of the 2nd byte is a 1, then
                    // there is a 3rd byte
                    nextByte = bytes[pos++];
                    // remove the high order bit from the 3rd byte before
                    // adding it to the value
                    value = (value << 7) | (nextByte & 127);
                    if (nextByte & 128) {
                        // 4th byte is also part of the integer
                        nextByte = bytes[pos++];
                        // use all 8 bits of the 4th byte
                        value = (value << 8) | nextByte;
                    }
                }
            }
            return value;
        },
        /**
         * Returns undefined.  Used for reading the undefined type
         * @private
         */
        readUndefined: Ext.emptyFn,
        /**
         * Returns undefined.  Used for reading the unsupported type
         * @private
         */
        readUnsupported: Ext.emptyFn,
        /**
         * Reads a UTF-8 string from the byte array
         * @private
         * @param {Number} byteLength The number of bytes to read
         * @return {String}
         */
        readUtf8: function(byteLength) {
            var end = pos + byteLength,
                // the string's end position
                chars = [],
                charCount = 0,
                maxCharCount = 65535,
                charArrayCount = 1,
                result = [],
                i = 0,
                charArrays, byteCount, charCode;
            charArrays = [
                chars
            ];
            // UTF-8 characters may be encoded using 1-4 bytes. The number of
            // bytes that a character consumes is determined by reading the
            // leading byte.  Values 0-127 in the leading byte indicate a single-
            // byte ASCII-compatible character. Values 192-223 (bytes with "110"
            // in the high-order position) indicate a 2-byte character, values
            // 224-239 (bytes with "1110" in the high-order position) indicate a
            // 3-byte character, and values 240-247 (bytes with "11110" in the
            // high-order position) indicate a 4-byte character. The remaining
            // bits of the leading byte hold bits of the encoded character, with
            // leading zeros if necessary.
            //
            // The continuation bytes all have "10" in the high-order position,
            // which means only the 6 least significant bits of continuation
            // bytes are available to hold the bits of the encoded character.
            //
            // The following table illustrates the binary format of UTF-8
            // characters:
            //
            // Bits     Byte 1      Byte 2      Byte 3      Byte 4
            // -----------------------------------------------------
            //  7       0xxxxxxx
            // 11       110xxxxx    10xxxxxx
            // 16       1110xxxx    10xxxxxx    10xxxxxx
            // 21       11110xxx    10xxxxxx    10xxxxxx    10xxxxxx
            while (pos < end) {
                // read a byte from the byte array - if the byte's value is less
                // than 128 we are dealing with a single byte character
                charCode = bytes[pos++];
                if (charCode > 127) {
                    // if the byte's value is greater than 127 we are dealing
                    // with a multi-byte character.
                    if (charCode > 239) {
                        // a leading-byte value greater than 239 means this is a
                        // 4-byte character
                        byteCount = 4;
                        // Use only the 3 least-significant bits of the leading
                        // byte of a 4-byte character. This is achieved by
                        // applying the following bit mask:
                        // (charCode & 0x07)
                        // which is equivalent to:
                        //     11110xxx (the byte)
                        // AND 00000111 (the mask)
                        charCode = (charCode & 7);
                    } else if (charCode > 223) {
                        // a leading-byte value greater than 223 but less than
                        // 240 means this is a 3-byte character
                        byteCount = 3;
                        // Use only the 4 least-significant bits of the leading
                        // byte of a 3-byte character. This is achieved by
                        // applying the following bit mask:
                        // (charCode & 0x0F)
                        // which is equivalent to:
                        //     1110xxxx (the byte)
                        // AND 00001111 (the mask)
                        charCode = (charCode & 15);
                    } else {
                        // a leading-byte value less than 224 but (implicitly)
                        // greater than 191 means this is a 2-byte character
                        byteCount = 2;
                        // Use only the 5 least-significant bits of the first
                        // byte of a 2-byte character. This is achieved by
                        // applying the following bit mask:
                        // (charCode & 0x1F)
                        // which is equivalent to:
                        //     110xxxxx (the byte)
                        // AND 00011111 (the mask)
                        charCode = (charCode & 31);
                    }
                    while (--byteCount) {
                        // get one continuation byte. then strip off the leading
                        // "10" by applying the following bit mask:
                        // (b & 0x3F)
                        // which is equialent to:
                        //     10xxxxxx (the byte)
                        // AND 00111111 (the mask)
                        // That leaves 6 remaining bits on the continuation byte
                        // which are concatenated onto the character's bits
                        charCode = ((charCode << 6) | (bytes[pos++] & 63));
                    }
                }
                chars.push(charCode);
                if (++charCount === maxCharCount) {
                    charArrays.push(chars = []);
                    charCount = 0;
                    charArrayCount++;
                }
            }
            // At this point we end up with an array of char arrays, each char
            // array being no longer than 65,535 characters, the fastest way to
            // turn these char arrays into strings is to pass them as the
            // arguments to fromCharCode (fortunately all currently supported
            // browsers can handle at least 65,535 function arguments).
            for (; i < charArrayCount; i++) {
                // create a result array containing the strings converted from
                // the individual character arrays.
                result.push(String.fromCharCode.apply(String, charArrays[i]));
            }
            return result.join('');
        },
        /**
         * Reads an AMF "value-type" from the byte array.  Automatically detects
         * the data type by reading the "type marker" from the first byte after
         * the pointer.
         * @private
         */
        readValue: function() {
            var me = this,
                marker = bytes[pos++];
            // With the introduction of AMF3, a special type marker was added to
            // AMF0 to signal a switch to AMF3 serialization. This allows a packet
            // to start out in AMF 0 and switch to AMF 3 on the first complex type
            // to take advantage of the more the efficient encoding of AMF 3.
            if (marker === 17) {
                // change the version to AMF3 when we see a 17 marker
                me.version = 3;
                marker = bytes[pos++];
            }
            return me[me.typeMap[me.version][marker]]();
        },
        /**
         * Converters used in converting specific typed Flex classes to JavaScript usable form.
         * @private
         */
        converters: {
            'flex.messaging.io.ArrayCollection': function(obj) {
                return obj.source || [];
            }
        }
    };
});
// array collections have a source var that contains the actual data

// @tag enterprise
/**
 * The AMF Reader is used by an {@link Ext.data.amf.Proxy AMF Proxy} to read 
 * records from a server response that contains binary data in either AMF0 or
 * AMF3 format. AMF Reader constructs an {@link Ext.data.amf.Packet AMF Packet}
 * and uses it to decode the binary data into javascript objects, then simply
 * allows its superclass ({@link Ext.data.reader.Json}) to handle converting the
 * raw javascript objects into {@link Ext.data.Model} instances.
 * 
 * For a more detailed tutorial see the [AMF Guide](#/guide/amf).
 */
Ext.define('Ext.data.amf.Reader', {
    extend: 'Ext.data.reader.Json',
    alias: 'reader.amf',
    requires: [
        'Ext.data.amf.Packet'
    ],
    /**
     * @cfg {Number} messageIndex
     * AMF Packets can contain multiple messages. This config specifies the
     * 0-based index of the message that contains the record data.
     */
    messageIndex: 0,
    /**
     * Reads records from a XMLHttpRequest response object containing a binary
     * AMF Packet and returns a ResultSet.
     * @param {Object} response The XMLHttpRequest response object
     * @return {Ext.data.ResultSet}
     */
    read: function(response) {
        var me = this,
            bytes = response.responseBytes,
            packet, messages, resultSet;
        if (!bytes) {
            throw "AMF Reader cannot process the response because it does not contain binary data. Make sure the Proxy's 'binary' config is true.";
        }
        packet = new Ext.data.amf.Packet();
        packet.decode(bytes);
        messages = packet.messages;
        if (messages.length) {
            resultSet = me.readRecords(messages[me.messageIndex].body);
        } else {
            // no messages, return null result set
            resultSet = me.nullResultSet;
            if (packet.invalid) {
                // packet contains invalid data
                resultSet.success = false;
            }
        }
        return resultSet;
    }
});

// @tag enterprise
/**
 * The AMF Proxy is an {@link Ext.data.proxy.Ajax Ajax Proxy} that requests
 * binary data from a remote server and parses it into records using an
 * {@link Ext.data.amf.Reader AMF Reader} for use in a
 * {@link Ext.data.Store Store}.
 *
 *     Ext.create('Ext.data.Store', {
 *         model: 'Foo',
 *         proxy: {
 *             type: 'amf',
 *             url: 'some/url'
 *         }
 *     });
 *     
 * For a detailed tutorial on using AMF data see the [AMF Guide](#/guide/amf).
 *
 * **Note: **  _This functionality is only available with the purchase of 
 * Sencha Complete.  For more information about using this class, please visit 
 * our [Sencha Complete](https://www.sencha.com/products/complete/) product page._
 *
 */
Ext.define('Ext.data.amf.Proxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.amf',
    requires: [
        'Ext.data.amf.Reader'
    ],
    /**
     * @cfg
     * @inheritdoc
     */
    binary: true,
    /**
     * @cfg
     * @inheritdoc
     */
    reader: 'amf'
});

// @tag enterprise
/**
 * @class Ext.data.amf.RemotingMessage
 * Represents a remote call to be sent to the server.
 */
Ext.define('Ext.data.amf.RemotingMessage', {
    alias: 'data.amf.remotingmessage',
    config: {
        $flexType: 'flex.messaging.messages.RemotingMessage',
        /**
         * @property {Array} body - typically an array of parameters to pass to a method call
         */
        body: [],
        /**
         * @property {String} clientID - identifies the calling client.
         */
        clientId: "",
        /**
         * @property {String} destination - the service destination on the server
         */
        destination: "",
        /**
         * @property {Object} headers - the headers to attach to the message.
         * Would typically contain the DSEndpoint and DSId fields.
         */
        headers: [],
        /**
         * @property {String} messageId - message identifier
         */
        messageId: "",
        /**
         * @property {String} operation - the method name to call
         */
        operation: "",
        /**
         * @property {Array} source - should be empty for security purposes
         */
        source: "",
        /**
         * @property {Number} timestamp - when the message was created
         */
        timestamp: [],
        /**
         * @property {Number} timeToLive - how long the message is still valid for passing
         */
        timeToLive: []
    },
    /**
     * Creates new message.
     * @param {Object} config Configuration options
     */
    constructor: function(config) {
        this.initConfig(config);
    },
    /**
     * Returns an AMFX encoded version of the message.
     */
    encodeMessage: function() {
        var encoder = Ext.create('Ext.data.amf.XmlEncoder'),
            cleanObj;
        cleanObj = Ext.copyTo({}, this, "$flexType,body,clientId,destination,headers,messageId,operation,source,timestamp,timeToLive", true);
        encoder.writeObject(cleanObj);
        return encoder.body;
    }
});

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
            str = messageId.substr(0, 8);
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
        this.objectReferences = [];
        this.traitsReferences = [];
        this.stringReferences = [];
    },
    /**
     * Reads and returns a decoded AMFX packet.
     * @param {String} xml the xml of the message
     * @return {Object} the response object containing the message
     */
    readAmfxMessage: function(xml) {
        var doc, amfx, body, i,
            resp = {};
        this.clear();
        // reset counters
        doc = Ext.data.amf.XmlDecoder.readXml(xml);
        amfx = doc.getElementsByTagName('amfx')[0];
        //<debug>
        if (!amfx) {
            Ext.warn.log("No AMFX tag in message");
        }
        if (amfx.getAttribute('ver') != "3") {
            Ext.raise("Unsupported AMFX version: " + amfx.getAttribute('ver'));
        }
        //</debug>
        body = amfx.getElementsByTagName('body')[0];
        resp.targetURI = body.getAttribute('targetURI');
        resp.responseURI = body.getAttribute('responseURI');
        // most likely empty string
        for (i = 0; i < body.childNodes.length; i++) {
            if (body.childNodes.item(i).nodeType != 1) {
                // only process element nodes, ignore white space and text nodes
                
                continue;
            }
            resp.message = this.readValue(body.childNodes.item(i));
            break;
        }
        // no need to keep iterating
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
        Ext.raise("Unknown tag type: " + node.tagName);
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
        var traits = [],
            i, rawtraits;
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
            traitsNode, i, j, n, key, val,
            klass = null,
            className;
        className = node.getAttribute('type');
        if (className) {
            klass = Ext.ClassManager.getByAlias('amfx.' + className);
        }
        // check if special case for class
        obj = klass ? new klass() : (className ? {
            $className: className
        } : {});
        // if there is no klass, mark the classname for easier parsing of returned results
        // check if we need special handling for this class
        if ((!klass) && this.converters[className]) {
            obj = this.converters[className](this, node);
            return obj;
        }
        // we're done
        traitsNode = node.getElementsByTagName('traits')[0];
        traits = this.readTraits(traitsNode);
        //<debug>
        if (traits === null) {
            Ext.raise("No support for externalizable object: " + className);
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
                Ext.raise("Too many items for object, not enough traits: " + className);
            }
        }
        //</debug>
        return obj;
    },
    /**
     * Parses and returns an AMFX array.
     * @param {HTMLElement/XMLElement} node the array node
     * @return {Array} the deserialized array
     */
    readArray: function(node) {
        var arr = [],
            n, i, j, l, name, val, len, childnodes, cn;
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
                    break;
                }
                // out of loop. We've found our value
                arr[name] = val;
            } else {
                // ordinal node
                arr[i] = this.readValue(n);
                i++;
                //<debug>
                if (i > len) {
                    Ext.raise("Array has more items than declared length: " + i + " > " + len);
                }
            }
        }
        //</debug>
        //<debug>
        if (i < len) {
            Ext.raise("Array has less items than declared length: " + i + " < " + len);
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
            key, val, i, j, n, len;
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
                
                continue;
            }
            // next element is the value
            val = this.readValue(n);
            j = j + 1;
            dict[key] = val;
            key = null;
            val = null;
        }
        //<debug>
        if (j != len) {
            Ext.raise("Incorrect number of dictionary values: " + j + " != " + len);
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
        return null;
    },
    // we shouldn't reach here, but just in case
    /**
     * Converters used in converting specific typed Flex classes to JavaScript usable form.
     * @private
     */
    converters: {
        'flex.messaging.io.ArrayCollection': function(decoder, node) {
            return decoder.convertObjectWithSourceField(node);
        },
        'mx.collections.ArrayList': function(decoder, node) {
            return decoder.convertObjectWithSourceField(node);
        },
        'mx.collections.ArrayCollection': function(decoder, node) {
            return decoder.convertObjectWithSourceField(node);
        }
    }
});

// @tag enterprise
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
 *     encoder.body;
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
    /**
     * @property {String} body - The output string
     */
    body: "",
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
                id = Ext.Number.randomInt(0, 4.294967295E9);
            }
            // The format of a UID is XXXXXXXX-XXXX-XXXX-XXXX-YYYYYYYYXXXX
            // where each X is a random hex digit and each Y is a hex digit from the least significant part of a time stamp.
            t = (id + 4.294967296E9).toString(16).toUpperCase();
            // padded
            uid = t.substr(t.length - 8, 8);
            // last 8 chars
            for (j = 0; j < 3; j++) {
                // 3 -XXXX segments
                uid += "-";
                for (i = 0; i < 4; i++) {
                    uid += Ext.Number.randomInt(0, 15).toString(16).toUpperCase();
                }
            }
            uid += "-";
            // add timestamp
            t = new Number(new Date()).valueOf().toString(16).toUpperCase();
            // get the String representation of milliseconds in hex format
            j = 0;
            if (t.length < 8) {
                // pad with "0" if needed
                for (i = 0; i < t.length - 8; i++) {
                    j++;
                    uid += "0";
                }
            }
            // actual timestamp:
            uid += t.substr(-(8 - j));
            // last few chars
            // and last 4 random digits
            for (i = 0; i < 4; i++) {
                uid += Ext.Number.randomInt(0, 15).toString(16).toUpperCase();
            }
            return uid;
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
        this.body = "";
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
            ret = "<string>" + str + "</string>";
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
        var maxInt = 536870911,
            minSignedInt = -268435455;
        //<debug>
        if (typeof (num) !== "number" && !(num instanceof Number)) {
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
        var ordinals = [],
            firstNonOrdinal,
            ecmaElements = [],
            length = array.length,
            // length is of ordinal section only
            i, str;
        for (i in array) {
            if (Ext.isNumeric(i) && (i % 1 == 0)) {
                //this is an integer. Add to ordinals array
                ordinals[i] = this.encodeObject(array[i]);
            } else {
                ecmaElements.push(this.encodeEcmaElement(i, array[i]));
            }
        }
        firstNonOrdinal = ordinals.length;
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
        for (i = 0; i < ordinals.length; i++) {
            // iterate by counting since we need to guarantee the order
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
            str = '<object type="' + flexType + '">';
        } else {
            str = "<object>";
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
                    Ext.raise("Byte array contains a non-number: " + array[i] + " in index: " + i);
                }
                if (array[i] < 0 || array[i] > 255) {
                    Ext.raise("Byte array value out of bounds: " + array[i]);
                }
                //</debug>
                h = array[i].toString(16).toUpperCase();
                if (array[i] < 16) {
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
        var t = typeof (item);
        //Ext.log("Writing " + item + " of type " + t);
        if (t === "undefined") {
            return this.encodeUndefined();
        } else if (item === null) {
            // can't check type since typeof(null) returns "object"
            return this.encodeNull();
        } else if (Ext.isBoolean(item)) {
            return this.encodeBoolean(item);
        } else if (Ext.isString(item)) {
            return this.encodeString(item);
        } else if (t === "number" || item instanceof Number) {
            // Can't use Ext.isNumeric since it accepts strings as well
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
        }
        //</debug>
        return null;
    },
    // if we reached here, return null
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
        this.body += str;
    }
});

// @tag enterprise
/**
 * @class Ext.direct.AmfRemotingProvider
 * 
 * <p>The {@link Ext.direct.AmfRemotingProvider AmfRemotingProvider}
 * allows making RPC calls to a Java object on a BlazeDS or ColdFusion using either the AMFX or the AMF protocols.</p>
 * 
 * <p>The default protocol is AMFX which works on all browsers. If you choose AMF, a flash plugin might be loaded in certain browsers that do not support posting binary data to the server, e.g. Internet Explorer version 9 or less. To choose AMF, set the {@link Ext.direct.AmfRemotingProvider#binary binary} property to true.</p>
 * <p>For AMFX, the server must be configured to expose the desired services via an HTTPEndpoint. For example, the following configuration snippet adds an HTTPEndpoint (AMFX endpoint) to the BlazeDS services-config.xml file:</p>
 * <pre><code>
&lt;channel-definition id="my-http" class="mx.messaging.channels.HTTPChannel"&gt;
 &lt;endpoint url="http://{server.name}:{server.port}/{context.root}/messagebroker/http" class="flex.messaging.endpoints.HTTPEndpoint"/&gt;
&lt;/channel-definition&gt;
 </code></pre>
 *
 * <p>Once the HTTPEndpoint is configured, make sure the service is exposed via the channel by adding the channel (e.g. my-http) to your remoting-services.xml file.
 * For example this allows services to be accessed remotely by both AMF and AMFX:</p>
 * <pre><code>
&lt;default-channels&gt;
 &lt;channel ref="my-amf"/&gt;
 &lt;channel ref="my-http"/&gt;
&lt;/default-channels&gt;
 * </code></pre>
 * 
 * <p>In order to make a call, you first need to declare the API to Ext direct. The following example defines local methods to the services provided by the sample Products application provided by Adobe as part of the BlazeDS 4.x binary turnkey distribution's testdrive (Sample 5: Updating Data):</p>
 * <pre><code>
    Ext.direct.Manager.addProvider({
        "url":"/samples/messagebroker/http", // URL for the HTTPEndpoint
        "type":"amfremoting",
        "endpoint": "my-http", // the name of the HTTPEndpoint channel as defined in the server's services-config.xml
        "actions":{
        "product":[{ // name of the destination as defined in remoting-config.xml on the server
            "name":"getProducts", // method name of the method to call
            "len":0 // number of parameters
        },{
            "name":"add",
            "len":1
        },{
            "name":"bad",
            "len":0
        }]
        }
    });

 * </code></pre>
 * <p>You can now call the service as follows:</p>
 <pre><code>
product.getProducts((function(provider, response) {
    // do something with the response
    console.log("Got " + response.data.length + " objects");
});
</code></pre>
 * 
 * Note that in case server methods require parameters of a specific class (e.g. flex.samples.product.Product), you should make sure the passed parameter has a field called $flexType set to the class name (in this case flex.Samples.product.Product). This is similar to the remote class alias definition in ActionScript.
 * 
 * 
 * <p>The following example shows how to define a binary AMF-based call:</p>
 * <pre><code>
    Ext.direct.Manager.addProvider({
        "url":"/samples/messagebroker/amf", // URL for the AMFEndpoint
        "type":"amfremoting",
        "endpoint": "my-amf", // the name of the AMFEndpoint channel as defined in the server's services-config.xml
        "binary": true, // chooses AMF encoding
        "actions":{
        "product":[{ // name of the destination as defined in remoting-config.xml on the server
            "name":"getProducts", // method name of the method to call
            "len":0 // number of parameters
        },{
            "name":"add",
            "len":1
        },{
            "name":"bad",
            "len":0
        }]
        }
    });

 * </code></pre>
 * <p>Calling the server is done the same way as for the AMFX-based definition.</p>

 */
Ext.define('Ext.direct.AmfRemotingProvider', {
    /* Begin Definitions */
    alias: 'direct.amfremotingprovider',
    extend: 'Ext.direct.Provider',
    requires: [
        'Ext.util.MixedCollection',
        'Ext.util.DelayedTask',
        'Ext.direct.Transaction',
        'Ext.direct.RemotingMethod',
        'Ext.data.amf.XmlEncoder',
        'Ext.data.amf.XmlDecoder',
        'Ext.data.amf.Encoder',
        'Ext.data.amf.Packet',
        'Ext.data.amf.RemotingMessage',
        'Ext.direct.ExceptionEvent'
    ],
    /* End Definitions */
    /**
     * @cfg {Object} actions
     * Object literal defining the server side actions and methods. For example, if
     * the Provider is configured with:
     * <pre><code>
"actions":{ // each property within the 'actions' object represents a server side Class 
    "TestAction":[ // array of methods within each server side Class to be   
    {              // stubbed out on client
        "name":"doEcho", 
        "len":1            
    },{
        "name":"multiply",// name of method
        "len":2           // The number of parameters that will be used to create an
                          // array of data to send to the server side function.
                          // Ensure the server sends back a Number, not a String. 
    },{
        "name":"doForm",
        "formHandler":true, // direct the client to use specialized form handling method 
        "len":1
    }]
}
     * </code></pre>
     * <p>Note that a Store is not required, a server method can be called at any time.
     * In the following example a <b>client side</b> handler is used to call the
     * server side method "multiply" in the server-side "TestAction" Class:</p>
     * <pre><code>
TestAction.multiply(
    2, 4, // pass two arguments to server, so specify len=2
    // callback function after the server is called
    // result: the result returned by the server
    //      e: Ext.direct.RemotingEvent object
    function(result, e) {
        var t = e.getTransaction();
        var action = t.action; // server side Class called
        var method = t.method; // server side method called
        if(e.status) {
            var answer = Ext.encode(result); // 8
    
        } else {
            var msg = e.message; // failure message
        }
    }
);
     * </code></pre>
     * In the example above, the server side "multiply" function will be passed two
     * arguments (2 and 4).  The "multiply" method should return the value 8 which will be
     * available as the <tt>result</tt> in the example above. 
     */
    /**
     * @cfg {String/Object} namespace
     * Namespace for the Remoting Provider (defaults to the browser global scope of <i>window</i>).
     * Explicitly specify the namespace Object, or specify a String to have a
     * {@link Ext#namespace namespace created} implicitly.
     */
    /**
     * @cfg {String} url
     * <b>Required</b>. The URL to connect to the Flex remoting server (LCDS, BlazeDS, etc).
     * This should include the /messagebroker/amf suffix as defined in the services-config.xml and remoting-config.xml files.
     */
    /**
     * @cfg {String} endpoint
     * <b>Requred</b>. This is the channel id defined in services-config.xml on the server (e.g. my-amf or my-http).
     */
    /**
     * @cfg {String} enableUrlEncode
     * Specify which param will hold the arguments for the method.
     * Defaults to <tt>'data'</tt>.
     */
    /**
     * @cfg {String} binary
     * If true, use AMF binary encoding instead of AMFX XML-based encoding. Note that on some browsers, this will load a flash plugin to handle binary communication with the server. Important: If using binary encoding with older browsers, see notes in {@link Ext.data.flash.BinaryXhr BinaryXhr} regarding packaging the Flash plugin for use in older browsers.
     */
    binary: false,
    /**
     * @cfg {Number} maxRetries
     * Number of times to re-attempt delivery on failure of a call.
     */
    maxRetries: 1,
    /**
     * @cfg {Number} timeout
     * The timeout to use for each request.
     */
    timeout: undefined,
    /**
     * @event beforecall
     * Fires immediately before the client-side sends off the RPC call.
     * By returning false from an event handler you can prevent the call from
     * executing.
     * @param {Ext.direct.AmfRemotingProvider} provider
     * @param {Ext.direct.Transaction} transaction
     * @param {Object} meta The meta data
     */
    /**
     * @event call
     * Fires immediately after the request to the server-side is sent. This does
     * NOT fire after the response has come back from the call.
     * @param {Ext.direct.AmfRemotingProvider} provider
     * @param {Ext.direct.Transaction} transaction
     * @param {Object} meta The meta data
     */
    constructor: function(config) {
        var me = this;
        me.callParent(arguments);
        me.namespace = (Ext.isString(me.namespace)) ? Ext.ns(me.namespace) : me.namespace || window;
        me.transactions = new Ext.util.MixedCollection();
        me.callBuffer = [];
    },
    /**
     * Initialize the API
     * @private
     */
    initAPI: function() {
        var actions = this.actions,
            namespace = this.namespace,
            action, cls, methods, i, len, method;
        for (action in actions) {
            if (actions.hasOwnProperty(action)) {
                cls = namespace[action];
                if (!cls) {
                    cls = namespace[action] = {};
                }
                methods = actions[action];
                for (i = 0 , len = methods.length; i < len; ++i) {
                    method = new Ext.direct.RemotingMethod(methods[i]);
                    cls[method.name] = this.createHandler(action, method);
                }
            }
        }
    },
    /**
     * Create a handler function for a direct call.
     * @private
     * @param {String} action The action the call is for
     * @param {Object} method The details of the method
     * @return {Function} A JS function that will kick off the call
     */
    createHandler: function(action, method) {
        var me = this,
            handler;
        if (!method.formHandler) {
            handler = function() {
                me.configureRequest(action, method, Array.prototype.slice.call(arguments, 0));
            };
        } else {
            handler = function(form, callback, scope) {
                me.configureFormRequest(action, method, form, callback, scope);
            };
        }
        handler.directCfg = {
            action: action,
            method: method
        };
        return handler;
    },
    isConnected: function() {
        return !!this.connected;
    },
    connect: function() {
        var me = this;
        if (me.url) {
            // Generate a unique ID for this client
            me.clientId = Ext.data.amf.XmlEncoder.generateFlexUID();
            me.initAPI();
            me.connected = true;
            me.fireEvent('connect', me);
            me.DSId = null;
        } else if (!me.url) {
            //<debug>
            Ext.raise('Error initializing RemotingProvider, no url configured.');
        }
    },
    //</debug>
    disconnect: function() {
        var me = this;
        if (me.connected) {
            me.connected = false;
            me.fireEvent('disconnect', me);
        }
    },
    /**
     * Run any callbacks related to the transaction.
     * @private
     * @param {Ext.direct.Transaction} transaction The transaction
     * @param {Ext.direct.Event} event The event
     */
    runCallback: function(transaction, event) {
        var success = !!event.status,
            funcName = success ? 'success' : 'failure',
            callback, result;
        if (transaction && transaction.callback) {
            callback = transaction.callback;
            result = Ext.isDefined(event.result) ? event.result : event.data;
            if (Ext.isFunction(callback)) {
                callback(result, event, success);
            } else {
                Ext.callback(callback[funcName], callback.scope, [
                    result,
                    event,
                    success
                ]);
                Ext.callback(callback.callback, callback.scope, [
                    result,
                    event,
                    success
                ]);
            }
        }
    },
    /**
     * React to the ajax request being completed
     * @private
     */
    onData: function(options, success, response) {
        var me = this,
            i = 0,
            len, events, event, transaction, transactions;
        if (success) {
            events = me.createEvents(response);
            for (len = events.length; i < len; ++i) {
                event = events[i];
                transaction = me.getTransaction(event);
                me.fireEvent('data', me, event);
                if (transaction) {
                    me.runCallback(transaction, event, true);
                    Ext.direct.Manager.removeTransaction(transaction);
                }
            }
        } else {
            transactions = [].concat(options.transaction);
            for (len = transactions.length; i < len; ++i) {
                transaction = me.getTransaction(transactions[i]);
                if (transaction && transaction.retryCount < me.maxRetries) {
                    transaction.retry();
                } else {
                    event = new Ext.direct.ExceptionEvent({
                        data: null,
                        transaction: transaction,
                        code: Ext.direct.Manager.exceptions.TRANSPORT,
                        message: 'Unable to connect to the server.',
                        xhr: response
                    });
                    me.fireEvent('data', me, event);
                    if (transaction) {
                        me.runCallback(transaction, event, false);
                        Ext.direct.Manager.removeTransaction(transaction);
                    }
                }
            }
        }
    },
    /**
     * Get transaction from XHR options
     * @private
     * @param {Object} options The options sent to the Ajax request
     * @return {Ext.direct.Transaction} The transaction, null if not found
     */
    getTransaction: function(options) {
        return options && options.tid ? Ext.direct.Manager.getTransaction(options.tid) : null;
    },
    /**
     * Configure a direct request
     * @private
     * @param {String} action The action being executed
     * @param {Object} method The method being executed
     */
    configureRequest: function(action, method, args) {
        var me = this,
            callData = method.getCallData(args),
            data = callData.data,
            callback = callData.callback,
            scope = callData.scope,
            transaction;
        transaction = new Ext.direct.Transaction({
            provider: me,
            args: args,
            action: action,
            method: method.name,
            data: data,
            callback: scope && Ext.isFunction(callback) ? Ext.Function.bind(callback, scope) : callback
        });
        if (me.fireEvent('beforecall', me, transaction, method) !== false) {
            Ext.direct.Manager.addTransaction(transaction);
            me.queueTransaction(transaction);
            me.fireEvent('call', me, transaction, method);
        }
    },
    /**
     * Gets the Flex remoting message info for a transaction
     * @private
     * @param {Ext.direct.Transaction} transaction The transaction
     * @return {Object} The Flex remoting message structure ready to encode in an AMFX RemoteMessage
     */
    getCallData: function(transaction) {
        if (this.binary) {
            return {
                targetUri: transaction.action + "." + transaction.method,
                responseUri: '/' + transaction.id,
                body: transaction.data || []
            };
        } else {
            return new Ext.data.amf.RemotingMessage({
                body: transaction.data || [],
                clientId: this.clientId,
                destination: transaction.action,
                headers: {
                    DSEndpoint: this.endpoint,
                    DSId: this.DSId || "nil"
                },
                // if unknown yet, use "nil"
                messageId: Ext.data.amf.XmlEncoder.generateFlexUID(transaction.id),
                // encode as first 4 bytes of UID
                operation: transaction.method,
                timestamp: 0,
                timeToLive: 0
            });
        }
    },
    /*
         return {
         action: transaction.action,
         method: transaction.method,
         data: transaction.data,
         type: 'rpc',
         tid: transaction.id
         };
         */
    /**
     * Sends a request to the server
     * @private
     * @param {Object/Array} data The data to send
     */
    sendRequest: function(data) {
        var me = this,
            request = {
                url: me.url,
                callback: me.onData,
                scope: me,
                transaction: data,
                timeout: me.timeout
            },
            callData,
            i = 0,
            len, params, encoder,
            amfMessages = [],
            amfHeaders = [];
        // prepare AMFX messages
        if (Ext.isArray(data)) {
            //<debug>
            if (!me.binary) {
                Ext.raise("Mutltiple messages in the same call are not supported in AMFX");
            }
            //</debug>
            for (len = data.length; i < len; ++i) {
                amfMessages.push(me.getCallData(data[i]));
            }
        } else {
            amfMessages.push(me.getCallData(data));
        }
        if (me.binary) {
            encoder = new Ext.data.amf.Encoder({
                format: 0
            });
            // AMF message sending always uses AMF0
            // encode packet
            encoder.writeAmfPacket(amfHeaders, amfMessages);
            request.binaryData = encoder.bytes;
            request.binary = true;
            // Binary response
            request.headers = {
                'Content-Type': 'application/x-amf'
            };
        } else {
            encoder = new Ext.data.amf.XmlEncoder();
            // encode packet
            encoder.writeAmfxRemotingPacket(amfMessages[0]);
            request.xmlData = encoder.body;
        }
        // prepare Ajax request
        Ext.Ajax.request(request);
    },
    /**
     * Add a new transaction to the queue
     * @private
     * @param {Ext.direct.Transaction} transaction The transaction
     */
    queueTransaction: function(transaction) {
        var me = this,
            enableBuffer = false;
        // no queueing for AMFX
        if (transaction.form) {
            me.sendFormRequest(transaction);
            return;
        }
        me.callBuffer.push(transaction);
        if (enableBuffer) {
            if (!me.callTask) {
                me.callTask = new Ext.util.DelayedTask(me.combineAndSend, me);
            }
            me.callTask.delay(Ext.isNumber(enableBuffer) ? enableBuffer : 10);
        } else {
            me.combineAndSend();
        }
    },
    /**
     * Combine any buffered requests and send them off
     * @private
     */
    combineAndSend: function() {
        var buffer = this.callBuffer,
            len = buffer.length;
        if (len > 0) {
            this.sendRequest(len == 1 ? buffer[0] : buffer);
            this.callBuffer = [];
        }
    },
    /**
     * Configure a form submission request
     * @private
     * @param {String} action The action being executed
     * @param {Object} method The method being executed
     * @param {HTMLElement} form The form being submitted
     * @param {Function} callback (optional) A callback to run after the form submits
     * @param {Object} scope (optional) A scope to execute the callback in
     */
    configureFormRequest: function(action, method, form, callback, scope) {
        //<debug>
        Ext.raise("Form requests are not supported for AmfRemoting");
    },
    //</debug>
    /*
         var me = this,
         transaction = new Ext.direct.Transaction({
         provider: me,
         action: action,
         method: method.name,
         args: [form, callback, scope],
         callback: scope && Ext.isFunction(callback) ? Ext.Function.bind(callback, scope) : callback,
         isForm: true
         }),
         isUpload,
         params;

         if (me.fireEvent('beforecall', me, transaction, method) !== false) {
         Ext.direct.Manager.addTransaction(transaction);
         isUpload = String(form.getAttribute("enctype")).toLowerCase() == 'multipart/form-data';
         
         params = {
         extTID: transaction.id,
         extAction: action,
         extMethod: method.name,
         extType: 'rpc',
         extUpload: String(isUpload)
         };
         
         // change made from typeof callback check to callback.params
         // to support addl param passing in DirectSubmit EAC 6/2
         Ext.apply(transaction, {
         form: Ext.getDom(form),
         isUpload: isUpload,
         params: callback && Ext.isObject(callback.params) ? Ext.apply(params, callback.params) : params
         });
         me.fireEvent('call', me, transaction, method);
         me.sendFormRequest(transaction);
         }
         */
    /**
     * Sends a form request
     * @private
     * @param {Ext.direct.Transaction} transaction The transaction to send
     */
    sendFormRequest: function(transaction) {
        //<debug>
        Ext.raise("Form requests are not supported for AmfRemoting");
    },
    //</debug>
    /*
         Ext.Ajax.request({
         url: this.url,
         params: transaction.params,
         callback: this.onData,
         scope: this,
         form: transaction.form,
         isUpload: transaction.isUpload,
         transaction: transaction
         });
         */
    /**
     * Creates a set of events based on the XHR response
     * @private
     * @param {Object} response The XHR response
     * @return {Ext.direct.Event[]} An array of Ext.direct.Event
     */
    createEvents: function(response) {
        var data = null,
            rawBytes = [],
            events = [],
            event,
            i = 0,
            len, decoder;
        try {
            if (this.binary) {
                decoder = new Ext.data.amf.Packet();
                data = decoder.decode(response.responseBytes);
            } else {
                decoder = new Ext.data.amf.XmlDecoder();
                data = decoder.readAmfxMessage(response.responseText);
            }
        } /*
             // This won't be sent back unless we use a ping message, so ignore for now
             // if we don't have the server ID yet, check for it here
             if (!this.DSId) {
             if (data.message.headers && data.message.headers.DSId) {
             this.DSId = data.message.headers.DSId;
             }
             }
             */
        catch (e) {
            event = new Ext.direct.ExceptionEvent({
                data: e,
                xhr: response,
                code: Ext.direct.Manager.exceptions.PARSE,
                message: 'Error parsing AMF response: \n\n ' + data
            });
            return [
                event
            ];
        }
        if (this.binary) {
            for (i = 0; i < data.messages.length; i++) {
                events.push(this.createEvent(data.messages[i]));
            }
        } else {
            // AMFX messages have one response per message
            events.push(this.createEvent(data));
        }
        return events;
    },
    /**
     * Create an event from an AMFX response object
     * @param {Object} response The AMFX response object
     * @return {Ext.direct.Event} The event
     */
    createEvent: function(response) {
        // Check targetUri to identify transaction ID and status
        var status = response.targetURI.split("/"),
            tid, event, data, statusIndex,
            me = this;
        if (me.binary) {
            tid = status[1];
            statusIndex = 2;
        } else {
            tid = Ext.data.amf.XmlDecoder.decodeTidFromFlexUID(response.message.correlationId);
            statusIndex = 1;
        }
        // construct data structure
        if (status[statusIndex] == "onStatus") {
            // The call failed
            data = {
                tid: tid,
                data: (me.binary ? response.body : response.message)
            };
            event = Ext.create('direct.exception', data);
        } else if (status[statusIndex] == "onResult") {
            // Call succeeded
            data = {
                tid: tid,
                data: (me.binary ? response.body : response.message.body)
            };
            event = Ext.create('direct.rpc', data);
        } else {
            //<debug>
            Ext.raise("Unknown AMF return status: " + status[statusIndex]);
        }
        //</debug>
        return event;
    }
});


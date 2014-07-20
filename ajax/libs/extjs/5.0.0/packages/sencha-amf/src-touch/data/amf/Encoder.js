//<feature amf>
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
 * Then use the writer methods to output data:
 *
 *     encoder.writeObject(1);
 *
 * And access the data through the #bytes property:
 *     encoder.getBytes();
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
        format: 3,
        
        /**
     * @property {Array} bytes
     * @readonly
     * The constructed byte array.
     */
        bytes: []
    },


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
        this.setBytes([]);
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
            Ext.Error.raise("Unsupported AMF format: " + protocol_version + ". Only '3' (AMF3) or '0' (AMF0) are supported at this point.");
            //</debug>
            return; // return nothing
        }
    },

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
        var t = typeof(item);
        //Ext.log("Writing " + item + " of type " + t);
        if (t === "undefined") {
            this.writeUndefined();
        } else if (item === null) { // can't check type since typeof(null) returns "object"
            this.writeNull();
        } else if (Ext.isBoolean(item)) {
            this.writeBoolean(item);
        } else if (Ext.isString(item)) {
            this.writeString(item);
        } else if (t === "number" || item instanceof Number) { // Can't use Ext.isNumeric since it accepts strings as well
            this.writeNumber(item);
        } else if (t === "object") {
            // Figure out which object this is
            if (item instanceof Date) {
                this.writeDate(item);
            } else if (Ext.isArray(item)) { // this won't catch associative arrays deserialized by the Packet class!
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
            //</debug>
        }
    },

    /**
     * Writes the AMF3 undefined value to the byte array.
     * @private
     */
    write3Undefined: function() {
        this.writeByte(0x00); // AMF3 undefined
    },

    /**
     * Writes the AMF0 undefined value to the byte array.
     * @private
     */
    write0Undefined: function() {
        this.writeByte(0x06); // AMF0 undefined
    },

    /**
     * Writes the AMF3 null value to the byte array.
     * @private
     */
    write3Null: function() {
        this.writeByte(0x01); // AMF3 null
    },

    /**
     * Writes the AMF0 null value to the byte array.
     * @private
     */
    write0Null: function() {
        this.writeByte(0x05); // AMF0 null
    },

    /**
     * Writes the appropriate AMF3 boolean value to the byte array.
     * @param {boolean} item The value to write
     * @private
     */
    write3Boolean: function(item) {
        //<debug>
        if (typeof(item) !== "boolean") {
            Ext.log.warn("Encoder: writeBoolean argument is not a boolean. Coercing.");
        }
        // </debug>
        if (item) {
            this.writeByte(0x03); // AMF3 true
        } else {
            this.writeByte(0x02); // AMF3 false
        }
    },

    /**
     * Writes the appropriate AMF0 boolean value to the byte array.
     * @param {boolean} item The value to write
     * @private
     */
    write0Boolean: function(item) {
        //<debug>
        if (typeof(item) !== "boolean") {
            Ext.log.warn("Encoder: writeBoolean argument is not a boolean. Coercing.");
        }
        // </debug>
        this.writeByte(0x01); // AMF0 boolean marker
        if (item) {
            this.writeByte(0x01); // AMF0 true
        } else {
            this.writeByte(0x00); // AMF0 false
        }
    },

    /**
     * Encodes a U29 int, returning a byte array with the encoded number.
     * @param item - unsigned int value
     * @private
     */
    encode29Int: function(item) {
        var data = [], // prepare the bytes, then send them to the array
            num = item,
            nibble,
            i;
        if (num == 0) {
            return [0]; // no other data
        }
        // we have a special case if the number is 4-nibbles in U29 encoding
        if (num > 0x001fffff) {
            // last nibble is an 8-bit value
            nibble = num & 0xff;
            data.unshift(nibble);
            num = num >> 8;
        }
        // get all the 7-bit parts ready
        while (num > 0) {
            nibble = num & 0x7f; // 7 bits
            data.unshift(nibble);
            num = num >> 7;
        }
        // now we need to mark each MSb of a 7-bit byte with a 1, except the absolute last one which has a 0.
        // If there's an 8-bit byte, the 7-bit byte before it is marked with 1 as well.
        for (i = 0; i < data.length - 1; i++) {
            data[i] = data[i] | 0x80;
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
        var maxInt = 0x1fffffff,
            minSignedInt = -0xfffffff;
        //<debug>
        if (typeof(item) !== "number" && !(item instanceof Number)) {
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
            item = item & maxInt; // get an unsigned value to work with - we only care about 29 bits.
            data = this.encode29Int(item);
            // And , mark it as an integer
            data.unshift(0x04); // AMF3 integer marker
            // write it!
            this.writeBytes(data);

        } else {
            data = this.encodeDouble(item);
            data.unshift(0x05); // AMF3 double marker
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
        if (typeof(item) !== "number" && !(item instanceof Number)) {
            Ext.log.warn("Encoder: writeNumber argument is not numeric. Can't coerce.");
        }
        // </debug>

        // switch to the primitive value for handling:
        if (item instanceof Number) {
            item = item.valueOf();
        }
        //In AMF0 numbers are always serialized as double-float values.
        data = this.encodeDouble(item);
        data.unshift(0x00); // AMF0 double marker
        this.writeBytes(data);
    },

    /**
     * Convert a UTF 16 char to a UTF 8 char
     * @param {Number} c char 16-bit code to convert
     * @return {Array} byte array with the UTF 8 values
     */
    encodeUtf8Char: function(c) {
        var data = [],
            val, b, i,
            marker;
        //<debug>
        if (c > 0x10FFFF) {
            //<debug>
            Ext.Error.raise("UTF 8 char out of bounds");
            //</debug>
        }
        //</debug>
        if (c <= 0x7F) {
            // One byte UTF8
            data.push(c);
        } else {
            // Multi-byte UTF8. Figure out how many bytes:
            if (c <= 0x7ff) {
                b = 2;
            } else if (c <= 0xffff) {
                b = 3;
            } else {
                b = 4;
            }
            // encode LSBs of value
            marker = 0x80; // MSB marker
            for (i = 1; i < b; i++) {
                val = (c & 0x3F) | 0x80; // lowest 6 bits of number, plus a flag to mark the byte
                data.unshift(val);
                c = c >> 6; // drop 6 LSbs
                marker = (marker >> 1) | 0x80; // add one more bit for every byte
            }
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
            utf8Data.push.apply(utf8Data, data);
        }
        return utf8Data;

        // quicker conversion, doesn't work in IE:
        //          utf8String = unescape(encodeURIComponent(str)),
        //          utf8Data = [];


    },

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
        if (len <= 0xFFFFFFF) {
            // String is under max allowed length in AMF3
            // AMF3 strings use the LSb to mark whether it's a string reference or a string value. For now we only pass values:
            len = len << 1;
            len = len | 1; // mark as value
            // push length value to the array
            data =this.encode29Int(len);
        } else {
            //<debug>
            Ext.Error.raise("UTF8 encoded string too long to serialize to AMF: " + len);
            //</debug>
        }
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
        if (item == "") { // special case for the empty string
            this.writeByte(0x06); // AMF3 string marker
            this.writeByte(0x01); // zero length string
        } else {
            // first encode string to UTF-8.
            var utf8Data = this.encodeUtf8String(item);
            var lenData = this.encode3Utf8StringLen(utf8Data);
            // only write encoding once we got here, i.e. length of string is legal
            this.writeByte(0x06); // AMF3 string marker, only if we can actually write a string
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
            data.unshift(value & 0xff);
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
        if (item == "") { // special case for the empty string
            this.writeByte(0x02); // AMF0 short string marker
            this.writeBytes([0x00, 0x00]); // zero length string
        } else {
            // first encode string to UTF-8.
            var utf8Data = this.encodeUtf8String(item);
            var encoding;
            var lenData;
            if (utf8Data.length <= 0xffff) {
                // short string
                encoding = 0x02; // short string
                lenData = this.encodeXInt(utf8Data.length, 2);
            } else {
                // long string
                encoding = 0x0C; // long string
                lenData = this.encodeXInt(utf8Data.length, 4);
            }
            this.writeByte(encoding); // Approperiate AMF0 string marker
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
        if (amfType !== 0x07 && amfType !== 0x0B) {
            Ext.Error.raise("write XML with unknown AMF3 code: " + amfType);
        }
        if (!this.isXmlDocument(xml)) {
            Ext.log.warn("Encoder: write3XmlWithType argument is not an xml document.");
        }
        // </debug>
        var xmlStr = this.convertXmlToString(xml);
        if (xmlStr == "") { // special case for the empty string
            this.writeByte(amfType); // AMF3 XML marker
            this.writeByte(0x01); // zero length string
        } else {
            // first encode string to UTF-8.
            var utf8Data = this.encodeUtf8String(xmlStr);
            var lenData = this.encode3Utf8StringLen(utf8Data);
            // only write encoding once we got here, i.e. length of string is legal
            this.writeByte(amfType); // AMF3 XML marker, only if we can actually write the string
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
        this.write3XmlWithType(xml, 0x07);
    },

    /**
     * Writes an XML object (ActionScript 3 new XML object) in AMF3 format.
     * @param {Object} xml XML document (type Document typically) to write
     * @private
     */
    write3Xml: function(xml) {
        this.write3XmlWithType(xml, 0x0B);
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
        this.writeByte(0x0F); // AMF0 XML marker

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
            Ext.Error.raise("Serializing a non-date object as date: " + date);
        }
        //</debug>
        // For now, we don't use object references to just encode the date.
        this.writeByte(0x08); // AMF3 date marker
        this.writeBytes(this.encode29Int(0x1)); // mark this as a date value - we don't support references yet
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
            Ext.Error.raise("Serializing a non-date object as date: " + date);
        }
        //</debug>
        // For now, we don't use object references to just encode the date.
        this.writeByte(0x0B); // AMF0 date marker
        this.writeBytes(this.encodeDouble(new Number(date)));
        this.writeBytes([0x00, 0x00]); // placeholder for timezone, standard says to keep 0, flash actually writes data here
    },

    /**
     * Writes an array in AMF3 format. Only the ordered part of the array use handled.
     * Unordered parts are ignored (e.g. a["hello"] will not be encoded).
     * @param {Array} arr the array to serialize.
     * @private
     */
    write3Array: function(arr) {

        //<debug>
        if (!Ext.isArray(arr)) {
            Ext.Error.raise("Serializing a non-array object as array: " + arr);
        }
        if (arr.length > 0xFFFFFFF) {
            Ext.Error.raise("Array size too long to encode in AMF3: " + arr.length);
        }
        //</debug>
        // For now, we don't use object references to just encode the array.
        this.writeByte(0x09); // AMF3 array marker

        // encode ordered part of array's length
        var len = arr.length;
        len = len << 1; // right-most bit marks this as size
        len = len | 0x1; // mark it a size
        this.writeBytes(this.encode29Int(len));

        // The associative part of the array is ignored, so mark it as empty
        this.writeByte(0x01); // equivalent to an empty UTF-8 string

        // now iterate over the array, writing each element
        Ext.each(arr, function(x) {this.writeObject(x);}, this);
    },

    /**
     * Writes a key-value pair in AMF0 format.
     * @param {String} key the name of the property
     * @param {Object} value to write in AMF0 format
     */
    write0ObjectProperty: function(key, value) {
        if (!(key instanceof String) && (typeof(key) !== "string")) {
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
            Ext.Error.raise("Serializing a non-array object as array: " + arr);
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
        this.writeByte(0x08); // AMF0 ECMA-array marker
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
            this.write0ObjectProperty(key, arr[key]);
        }
        // And finally the object end marker
        this.writeBytes([0x00, 0x00, 0x09]);
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
            Ext.Error.raise("Serializing a non-array object as array: " + arr);
        }
        //</debug>

        // For now, we don't use object references to just encode the array.
        this.writeByte(0x0A); // AMF0 strict array marker

        // encode ordered part of array's length
        var len = arr.length;
        this.writeBytes(this.encodeXInt(len, 4));

        // now iterate over the array, writing each element
        Ext.each(arr, function(x) {this.writeObject(x);}, this);
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
            Ext.Error.raise("Serializing a non-array object as array: " + arr);
        }
        if (arr.length > 0xFFFFFFF) {
            Ext.Error.raise("Array size too long to encode in AMF3: " + arr.length);
        }
        //</debug>
        this.writeByte(0x0c); // Byte array marker

        // for now no support for references, so just dump the length and data

        // encode array's length
        var len = arr.length;
        len = len << 1; // right-most bit marks this as size
        len = len | 0x1; // mark it a size
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
            Ext.Error.raise("Serializing a non-object object: " + obj);
        }
        //</debug>
        // For now, we don't use object references so just encode the object.
        this.writeByte(0x0A); // AMF3 object marker
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
        var oType = 0x0b; // binary 1011
        this.writeByte(oType);
        // Next we pass the class name, which is the empty string for anonymous
        // objects
        this.writeByte(0x01);
        // Next are the sealed traits (of which we have none)
        // And now the name / value pairs of dynamic fields
        for (name in obj) {
            // Ensure that name is actually a string
            var newName = new String(name).valueOf();
            if (newName == "") {
                //<debug>
                Ext.Error.raise("Can't encode non-string field name: " + name);
                //</debug>
            }
            var nameData = (this.encodeUtf8String(name));
            this.writeBytes(this.encode3Utf8StringLen(name));
            this.writeBytes(nameData);
            this.writeObject(obj[name]);
        }
        // And mark the end of the dynamic field section with the empty string
        this.writeByte(0x01);
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
            Ext.Error.raise("Serializing a non-object object: " + obj);
        }
        //</debug>
        // For now, we don't use object references so just encode the object.
        // if the object is typed, the ID changes and we need to send the type ahead of the data
        typed = !!obj.$flexType;
        amfType = typed ? 0x10 : 0x03; // typed vs. untyped object
        this.writeByte(amfType); // AMF0 object marker
        // if typed, send object type
        if (typed) {
            this.write0ShortUtf8String(obj.$flexType);
        }
        // then write out the data. There's no counter, but other than that it's the same as an ECMA array
        for (key in obj) {
            if (key != "$flexType") {
                this.write0ObjectProperty(key, obj[key]);
            }
        }
        // And finally the object end marker
        this.writeBytes([0x00, 0x00, 0x09]);
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
        this.getBytes().push(b);
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
            Ext.Error.raise("Decoder: writeBytes parameter is not an array: " + b);
        }
        for (i = 0; i < b.length; i++) {
            if (b[i] < 0 || b[i] > 255 || !Ext.isNumber(b[i])) {
                Ext.Error.raise("ERROR: Value " + i + " being written outside byte range: " + b[i]);
            }
        }
        //</debug>
        this.getBytes().push.apply(this.getBytes(), b);
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
        var ebits = 11, fbits = 52; // double
        var bias = (1 << (ebits - 1)) - 1,
            s, e, f, ln,
            i, bits, str, data = [];

        // Precalculated values
        var K_INFINITY=[127,240,0,0,0,0,0,0],
            K_NINFINITY=[255,240,0,0,0,0,0,0],
            K_NAN=[255,248,0,0,0,0,0,0];


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
                e = 0; f = 0; s = (1 / v === -Infinity) ? 1 : 0;
            }
            else {
                s = v < 0;
                v = Math.abs(v);

                if (v >= Math.pow(2, 1 - bias)) {
                    // Normalized
                    ln = Math.min(Math.floor(Math.log(v) / Math.LN2), bias);
                    e = ln + bias;
                    f = Math.round(v * Math.pow(2, fbits - ln) - Math.pow(2, fbits));
                }
                else {
                    // Denormalized
                    e = 0;
                    f = Math.round(v / Math.pow(2, 1 - bias - fbits));
                }
            }

            // Pack sign, exponent, fraction
            bits = [];
            for (i = fbits; i; i -= 1) { bits.push(f % 2 ? 1 : 0); f = Math.floor(f / 2); }
            for (i = ebits; i; i -= 1) { bits.push(e % 2 ? 1 : 0); e = Math.floor(e / 2); }
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
            Ext.Error.raise ("Trying to write a packet on an AMF3 Encoder. Only AMF0 is supported!");
        }
        if (!Ext.isArray(headers)) {
            Ext.Error.raise("headers is not an array: " + headers);
        }
        if (!Ext.isArray(messages)) {
            Ext.Error.raise("messages is not an array: " + messages);
        }
        //</debug>
        // Write Packet marker
        this.writeBytes([0x00, 0x00]); // AMF 0 version for this packet.
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
            Ext.Error.raise ("Trying to write a header on an AMF3 Encoder. Only AMF0 is supported!");
        }
        if (!Ext.isString(headerName)) {
            Ext.Error.raise("targetURI is not a string: " + targetUri);
        }
        if ((typeof(mustUnderstand) !== "boolean") && !Ext.isBoolean(mustUnderstand)) {
            Ext.Error.raise("mustUnderstand is not a boolean value: " + mustUnderstand);
        }
        //</debug>
        // write header name
        this.write0ShortUtf8String(headerName);
        // write must understand byte
        var mu = mustUnderstand ? 0x01 : 0x00;
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
            Ext.Error.raise ("Trying to write a message on an AMF3 Encoder. Only AMF0 is supported!");
        }
        if (!Ext.isString(targetUri)) {
            Ext.Error.raise("targetURI is not a string: " + targetUri);
        }
        if (!Ext.isString(responseUri)) {
            Ext.Error.raise("targetURI is not a string: " + responseUri);
        }
        if (!Ext.isArray(body)) {
            Ext.Error.raise("body is not an array: " + typeof(body));
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
//</feature>
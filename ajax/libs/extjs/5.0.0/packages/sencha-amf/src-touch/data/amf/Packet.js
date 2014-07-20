//<feature amf>
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
 *     console.log(packet.getVersion(), packet.getHeaders(), packet.getMessages());
 *
 * For more information on working with AMF data please refer to the
 * [AMF Guide](#/guide/amf).
 */
Ext.define('Ext.data.amf.Packet', {

    
    config: {
        
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
        headers: [],
        
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
        messages:[],
        
        /**
         * @property {Number} version
         * @readonly
         * The AMF version number (0 or 3)
         */
        version: 0
        

    },
    
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
                headers = [],
                messages =  [],
                headerCount, messageCount;
            
            me.twoPowN52 = Math.pow(2, -52);
            me.twoPow8 = Math.pow(2, 8);

            
            me.setHeaders(headers);
            me.setMessages(messages);
            me.pos = 0;
            
            if (byteArray instanceof ArrayBuffer) {
                // convert to byte array form so that we can read the data
                byteArray = new Uint8Array(byteArray);
            }
            me.bytes = byteArray;

            // The strings array holds references to all of the deserialized
            // AMF3 strings for a given header value or message body so that
            // repeat instances of the same string can be deserialized by
            // reference
            me.strings = [];

            // The objects array holds references to deserialized objects so
            // that repeat occurrences of the same object instance in the byte
            // array can be deserialized by reference.
            // If version is AMF0 this array holds anonymous objects, typed
            // objects, arrays, and ecma-arrays.
            // If version is AMF3 this array holds instances of Object, Array, XML,
            // XMLDocument, ByteArray, Date, and instances of user defined Classes
            me.objects = [];

            // The traits array holds references to the "traits" (the
            // characteristics of objects that define a strong type such as the
            // class name and public member names) of deserialized AMF3 objects
            // so that if they are repeated they can be deserialized by reference.
            me.traits = [];
            // The first two bytes of an AMF packet contain the AMF version
            // as an unsigned 16 bit integer.
            me.setVersion(me.readUInt(2));

            // the next 2 bytes contain the header count
            for (headerCount = me.readUInt(2); headerCount--;) {
                me.getHeaders().push({
                    name: me.readAmf0String(),
                    mustUnderstand: me.readBoolean(),
                    byteLength: me.readUInt(4),
                    value: me.readValue()
                });
                // reset references (reference indices are local to each header)
                me.strings = [];
                me.objects = [];
                me.traits = [];
            }

            // The 2 bytes immediately after the header contain the message count.
            for (messageCount = me.readUInt(2); messageCount--;) {
                me.getMessages().push({
                    targetURI: me.readAmf0String(),
                    responseURI: me.readAmf0String(),
                    byteLength: me.readUInt(4),
                    body: me.readValue()
                });
                // reset references (reference indices are local to each message)
                me.strings = [];
                me.objects = [];
                me.traits = [];
            }

            // reset the pointer
            me.pos = 0;
            // null the bytes array and reference arrays to free up memory.
            me.bytes = me.strings = me.objects = me.traits = null;

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

            me.bytes = byteArray;

            // reset the pointer
            me.pos = 0;

            // The first two bytes of an AMF packet contain the AMF version
            // as an unsigned 16 bit integer.
            me.setVersion(3);

            // The strings array holds references to all of the deserialized
            // AMF3 strings for a given header value or message body so that
            // repeat instances of the same string can be deserialized by
            // reference
            me.strings = [];

            // The objects array holds references to deserialized objects so
            // that repeat occurrences of the same object instance in the byte
            // array can be deserialized by reference.
            // If version is AMF0 this array holds anonymous objects, typed
            // objects, arrays, and ecma-arrays.
            // If version is AMF3 this array holds instances of Object, Array, XML,
            // XMLDocument, ByteArray, Date, and instances of user defined Classes
            me.objects = [];

            // The traits array holds references to the "traits" (the
            // characteristics of objects that define a strong type such as the
            // class name and public member names) of deserialized AMF3 objects
            // so that if they are repeated they can be deserialized by reference.
            me.traits = [];

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
            this.pos += 2; // discard the time zone
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
            me.objects.push(obj);

            // An AMF0 object consists of a series of string keys and variable-
            // type values.  The end of the series is marked by an empty string
            // followed by the object-end marker (9).
            while ((key = me.readAmf0String()) || me.bytes[me.pos] !== 9) {
                obj[key] = me.readValue();
            }

            // move the pointer past the object-end marker
            me.pos++;

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
                    me.objects.push(array);
                    do {
                        array[key] = me.readValue();
                    } while((key = me.readAmf3String()));
                    // The dense portion of the array is then read into the
                    // associative object, keyed by ordinal index.
                    for (i = 0; i < count; i++) {
                        array[i] = me.readValue();
                    }
                } else {
                    // First key is an empty string - this is an array with
                    // ordinal indices.
                    array = [];
                    me.objects.push(array);
                    for (i = 0; i < count; i++) {
                        array.push(me.readValue());
                    }
                }
            } else {
                // If the first (low) bit is a 0 read an array reference. The
                // remaining 1-28 bits are used to encode the reference index
                array = me.objects[header >> 1];
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
                me.objects.push(date);
            } else {
                // If the first (low) bit is a 0, this is a date reference.
                // The remaining 1-28 bits encode the reference index
                date = me.objects[header >> 1];
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
                headerLast3Bits, memberCount, className,
                dynamic, objectTraits, obj, key, klass, i;

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
                headerLast3Bits = (header & 0x07);
                if (headerLast3Bits === 3) {
                    // If the 3 least significant bits of the header are "011"
                    // then trait information follows.
                    className = me.readAmf3String();
                    // A 1 in the header's 4th least significant byte position
                    // indicates that dynamic members may follow the sealed
                    // members.
                    dynamic = !!(header & 0x08);
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
                    me.traits.push(objectTraits);
                } else if ((header & 0x03) === 1) {
                    // If the 2 least significant bits are "01", then a traits
                    // reference follows.  The remaining 1-27 bits are used
                    // to encode the trait reference index.
                    objectTraits = me.traits[header >> 2];
                    className = objectTraits.className;
                    dynamic = objectTraits.dynamic;
                    members = objectTraits.members;
                    memberCount = members.length;
                } else if (headerLast3Bits === 7) {
                    // if the 3 lease significant bits are "111" then
                    // externalizable trait data follows

                    // TODO: implement externalizable traits
                }

                if (className) {
                    klass = Ext.ClassManager.getByAlias('amf.' + className);
                    obj = klass ? new klass() : {$className: className};
                } else {
                    obj = {};
                }
                me.objects.push(obj);

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
                obj = me.objects[header >> 1];
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
                    me.strings.push(value);
                }
                return value;
            } else {
                // If the first (low) bit is a 0, this is a string reference.
                // Discard the low bit, then look up and return the reference
                // from the strings array using the remaining 1-28 bits as the
                // index.
                return me.strings[header >> 1];
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
                me.objects.push(doc);
            } else {
                // if the first (low) bit is a 1, this is an xml reference. The
                // remaining 1-28 bits encode the reference index.
                doc = me.objects[header >> 1];
            }

            return doc;
        },

        /**
         * Reads an AMF0 boolean from the byte array
         * @private
         */
        readBoolean: function() {
            return !!this.bytes[this.pos++];
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
                end = this.pos + (header >> 1);
                // Depending on the browser, "bytes" may be either a Uint8Array
                // or an Array.  Uint8Arrays don't have Array methods, so
                // we have to use Array.prototype.slice to get the byteArray
                byteArray = Array.prototype.slice.call(this.bytes, this.pos, end);
                this.objects.push(byteArray);
                // move the pointer to the first byte after the byteArray that
                // was just read
                this.pos = end;
            } else {
                // if the first (low) bit is a 1, this is a ByteArray reference.
                // The remaining 1-28 bits encode the reference index.
                byteArray = this.objects[header >> 1];
            }

            return byteArray;
        },

        /**
         * Reads a IEEE 754 double-precision binary floating-point number
         * @private
         */
        readDouble: function() {
            var byte1 = this.bytes[this.pos++],
                byte2 = this.bytes[this.pos++],
                // the first bit of byte1 is the sign (0 = positive, 1 = negative.
                // We read this bit by shifting the 7 least significant bits of
                // byte1 off to the right.
                sign = (byte1 >> 7) ? -1 : 1,
                // the exponent takes up the next 11 bits.
                exponent =
                    // extract the 7 least significant bits from byte1 and then
                    // shift them left by 4 bits to make room for the 4 remaining
                    // bits from byte 2
                    (((byte1 & 0x7F) << 4)
                     // add the 4 most significant bits from byte 2 to complete
                     // the exponent
                     | (byte2 >> 4)),
                // the remaining 52 bits make up the significand. read the 4
                // least significant bytes of byte 2 to begin the significand
                significand = (byte2 & 0x0F),
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
                significand = (significand * this.twoPow8) + this.bytes[this.pos++];
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
            if (exponent === 0x7FF) {
                return significand ? NaN : (Infinity * sign);
            }

            return sign *
                // The exponent is encoded using an offset binary
                // representation with the zero offset being 0x3FF (1023),
                // so we have to subtract 0x3FF to get the true exponent
                Math.pow(2, exponent - 0x3FF) *
                // convert the significand to its decimal value by multiplying
                // it by 2^52 and then add the hidden bit
                (hiddenBit + this.twoPowN52 * significand);
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
            this.pos += 4;
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
            return this.objects[this.readUInt(2)];
        },

        /**
         * Reads an AMF0 strict array (an array with ordinal indices)
         * @private
         */
        readStrictArray: function() {
            var me = this,
                len = me.readUInt(4),
                arr = [];

            me.objects.push(arr);

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
            instance = klass ? new klass() : {$className: className}; // if there is no klass, mark the classname for easier parsing of returned results

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
            result = this.bytes[this.pos++];
            // if this is a multi-byte int, loop over the remaining bytes
            for (; i < byteCount; ++i) {
                // shift the result 8 bits to the left and add the next byte.
                result = (result << 8) | this.bytes[this.pos++];
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
            var value = this.bytes[this.pos++],
                nextByte;

            if (value & 0x80) {
                // if the high order bit of the first byte is a 1, the next byte
                // is also part of this integer.
                nextByte = this.bytes[this.pos++];
                // remove the high order bit from both bytes before combining them
                value = ((value & 0x7F) << 7) | (nextByte & 0x7F);
                if (nextByte & 0x80) {
                    // if the high order byte of the 2nd byte is a 1, then
                    // there is a 3rd byte
                    nextByte = this.bytes[this.pos++];
                    // remove the high order bit from the 3rd byte before
                    // adding it to the value
                    value = (value << 7) | (nextByte & 0x7F);
                    if (nextByte & 0x80) {
                        // 4th byte is also part of the integer
                        nextByte = this.bytes[this.pos++];
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
            var end = this.pos + byteLength, // the string's end position
                chars = [],
                charCount = 0,
                maxCharCount = 65535,
                charArrayCount = 1,
                result = [],
                i = 0,
                charArrays, byteCount, charCode;

            charArrays = [chars];

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
            while (this.pos < end) {
                // read a byte from the byte array - if the byte's value is less
                // than 128 we are dealing with a single byte character
                charCode = this.bytes[this.pos++];
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
                        charCode = (charCode & 0x07);
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
                        charCode = (charCode & 0x0F);
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
                        charCode = (charCode & 0x1F);
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
                        charCode = ((charCode << 6) | (this.bytes[this.pos++] & 0x3F));
                    }
                }

                chars.push(charCode);

                if (++charCount === maxCharCount) {
                    charArrays.push(chars = []);
                    charCount = 0;
                    charArrayCount ++;
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
                marker = me.bytes[me.pos++];

            // With the introduction of AMF3, a special type marker was added to
            // AMF0 to signal a switch to AMF3 serialization. This allows a packet
            // to start out in AMF 0 and switch to AMF 3 on the first complex type
            // to take advantage of the more the efficient encoding of AMF 3.
            if (marker === 17) {
                // change the version to AMF3 when we see a 17 marker
                me.setVersion(3);
                marker = me.bytes[me.pos++];
            }

            return me[me.typeMap[me.getVersion()][marker]]();
        },

        /**
         * Converters used in converting specific typed Flex classes to JavaScript usable form.
         * @private
         */

        converters: {
            'flex.messaging.io.ArrayCollection': function(obj) {
                return obj.source || []; // array collections have a source var that contains the actual data
            }
        }

    }
          );
//</feature>

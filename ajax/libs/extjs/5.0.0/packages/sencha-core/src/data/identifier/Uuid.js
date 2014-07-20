/**
 * This class generates UUID's according to RFC 4122. This class has a default id property.
 * This means that a single instance is shared unless the id property is overridden. Thus,
 * two {@link Ext.data.Model} instances configured like the following share one generator:
 *
 *     Ext.define('MyApp.data.MyModelX', {
 *         extend: 'Ext.data.Model',
 *         identifier: 'uuid'
 *     });
 *
 *     Ext.define('MyApp.data.MyModelY', {
 *         extend: 'Ext.data.Model',
 *         identifier: 'uuid'
 *     });
 *
 * This allows all models using this class to share a commonly configured instance.
 *
 * # Using Version 1 ("Sequential") UUID's
 *
 * If a server can provide a proper timestamp and a "cryptographic quality random number"
 * (as described in RFC 4122), the shared instance can be configured as follows:
 *
 *     Ext.data.identifier.Uuid.Global.reconfigure({
 *         version: 1,
 *         clockSeq: clock, // 14 random bits
 *         salt: salt,      // 48 secure random bits (the Node field)
 *         timestamp: ts    // timestamp per Section 4.1.4
 *     });
 *
 *     // or these values can be split into 32-bit chunks:
 *
 *     Ext.data.identifier.Uuid.Global.reconfigure({
 *         version: 1,
 *         clockSeq: clock,
 *         salt: { lo: saltLow32, hi: saltHigh32 },
 *         timestamp: { lo: timestampLow32, hi: timestamptHigh32 }
 *     });
 *
 * This approach improves the generator's uniqueness by providing a valid timestamp and
 * higher quality random data. Version 1 UUID's should not be used unless this information
 * can be provided by a server and care should be taken to avoid caching of this data.
 *
 * See [http://www.ietf.org/rfc/rfc4122.txt](http://www.ietf.org/rfc/rfc4122.txt) for details.
 */
Ext.define('Ext.data.identifier.Uuid', {
    extend: 'Ext.data.identifier.Generator',
    alias: 'data.identifier.uuid',

    /**
     * Provides a way to determine if this identifier supports creating unique IDs. Proxies like {@link Ext.data.proxy.LocalStorage}
     * need the identifier to create unique IDs and will check this property.
     * @property isUnique
     * @type Boolean
     * @private
     */
    isUnique: true,

    config: {
        /**
         * The id for this generator instance. By default all model instances share the same
         * UUID generator instance. By specifying an id other then 'uuid', a unique generator instance
         * will be created for the Model.
         */
        id: null
    },

    /**
     * @cfg {Number} [version=4]
     * The Version of UUID. Supported values are:
     *
     *  * 1 : Time-based, "sequential" UUID. To use this type of generator, you must also
     *  specify the `salt`, `timestamp` and `clock` properties. For details on the values
     *  and how a server should produce them, see RFC 4122. Use of this type of generator
     *  produces values that are easier to read since they are sequential, but requires
     *  some care to initialize properly and still ensure their uniqueness.
     *
     *  * 4 : Pseudo-random UUID. This is the simplest form and requires no configuration
     *  and hence is the default type.
     */

    /**
     * @cfg {Number/Object} [salt]
     * This value is a 48-bit number. This can be a number or an object with `hi` and `lo`
     * properties where `lo` is the low 32-bits and `hi` is the upper 16 bits.
     *
     * Only applicable when `version` is set to `1`.
     */

    /**
     * @cfg {Number/Object} [timestamp]
     * When created, this value is a 60-bit number. This can be a number or an object with
     * `hi` and `lo` properties where `lo` is the low 32-bits and `hi` is the upper 28 bits.
     *
     * Only applicable when `version` is set to `1`.
     */

    /**
     * @cfg {Number} [clockSeq]
     * A clock value to help avoid duplicates.
     *
     * Only applicable when `version` is set to `1`.
     */

    constructor: function (config) {
        this.callParent([ config ]);

        this.reconfigure(config);
    },

    /**
     * Reconfigures this generator given new config properties. The only values that this
     * changes are `version` and, if `version` is 1, its related config properties.
     */
    reconfigure: function (config) {
        var cls = this.self;

        this.generate = (config && config.version === 1) ?
            cls.createSequential(config.salt, config.timestamp, config.clockSeq) :
            cls.createRandom();
    },

    clone: null,

    statics: {
        createRandom: function () {
            var pattern = 'xxxxxxxx-xxxx-4xxx-Rxxx-xMxxxxxxxxxx'.split(''),
                hex = '0123456789abcdef'.split(''),
                length = pattern.length,
                parts = [];

            return function () {
                for (var r, c, i = 0; i < length; ++i) {
                    c = pattern[i];

                    if (c !== '-' && c !== '4') {
                        r = Math.random() * 16;
                        r = (c === 'R') ? (r & 3 | 8) : (r | ((c === 'M') ? 1 : 0));
                        c = hex[r]; // above floors r so always 0-15
                    }

                    parts[i] = c;
                }

                return parts.join('');
            };
        },

        createSequential: function (salt, time, clockSeq) {
            var parts = [],
                twoPow32 = Math.pow(2, 32),
                saltLo = salt.lo, saltHi = salt.hi, timeLo = time.lo, timeHi = time.hi,
                toHex = function (value, length) {
                    var ret = value.toString(16).toLowerCase();
                    if (ret.length > length) {
                        ret = ret.substring(ret.length - length); // right-most digits
                    } else if (ret.length < length) {
                        ret = Ext.String.leftPad(ret, length, '0');
                    }
                    return ret;
                };

            if (typeof salt === 'number') {
                saltHi = Math.floor(salt / twoPow32);
                saltLo = Math.floor(salt - saltHi * twoPow32);
            }
            if (typeof time === 'number') {
                timeHi = Math.floor(time / twoPow32);
                timeLo = Math.floor(time - timeHi * twoPow32);
            }

            // Set multicast bit: "the least significant bit of the first octet of the
            // node ID" (nodeId = salt for this implementation):
            saltHi |= 0x100;

            parts[3] = toHex(0x80 | ((clockSeq >>> 8) & 0x3F), 2) +
                       toHex(clockSeq & 0xFF, 2);
            parts[4] = toHex(saltHi, 4) + toHex(saltLo, 8);

            /*
               The magic decoder ring (derived from RFC 4122 Section 4.2.2):

               +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
               |                          time_low                             |
               +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
               |           time_mid            |  ver  |        time_hi        |
               +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
               |res|  clock_hi |   clock_low   |    salt 0   |M|     salt 1    |
               +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
               |                         salt (2-5)                            |
               +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

                         time_mid      clock_hi (low 6 bits)
                time_low     | time_hi |clock_lo
                    |        |     |   || salt[0]
                    |        |     |   ||   | salt[1..5]
                    v        v     v   vv   v v
                    0badf00d-aced-1def-b123-dfad0badbeef
                                  ^    ^     ^
                            version    |     multicast (low bit)
                                       |
                                    reserved (upper 2 bits)
            */
            return function () {
                parts[0] = toHex(timeLo, 8);
                parts[1] = toHex(timeHi & 0xFFFF, 4);
                parts[2] = toHex(((timeHi >>> 16) & 0xFFF) | (1 << 12), 4);

                // sequentially increment the timestamp...
                ++timeLo;
                if (timeLo >= twoPow32) { // if (overflow)
                    timeLo = 0;
                    ++timeHi;
                }

                return parts.join('-');
            };
        }
    }
},
function() {
    this.Global = new this({
        id: 'uuid'
    });
});

//  Chance.js 0.1
//  http://chancejs.com
//  (c) 2013 Victor Quinn
//  Chance may be freely distributed or modified under the MIT license.

(function () {

    // Constructor
    var Chance = function (seed) {
        if (seed !== undefined) {
            this.seed = seed;
        }
        this.mt = new MersenneTwister(seed);
    };

    // Wrap the MersenneTwister
    Chance.prototype.random = function () {
        return this.mt.random(this.seed);
    };

    // Building Blocks/Basics
    Chance.prototype.bool = function () {
        return this.random() * 100 < 50;
    };

    // NOTE the max and min are INCLUDED in the range. So:
    //
    // chance.natural({min: 1, max: 3});
    //
    // would return either 1, 2, or 3.

    Chance.prototype.natural = function (options) {
        options = options || {};
        options.min = options.min || 0;
        // 9007199254740992 (2^53) is the max integer number in JavaScript
        // See: http://vq.io/132sa2j
        options.max = options.max || 9007199254740992;

        return Math.floor(this.random() * (options.max - options.min + 1) + options.min);
    };

    Chance.prototype.integer = function (options) {
        var num, range;

        options = options || {};
        options.min = options.min || -9007199254740992;
        options.max = options.max || 9007199254740992;

        // Greatest of absolute value of either max or min so we know we're
        // including the entire search domain.
        range = Math.max(Math.abs(options.min), Math.abs(options.min));

        // Probably a better way to do this...
        do {
            num = this.natural({min: 0, max: range});
            num = this.bool() ? num : num * -1;
        } while (num < options.min || num > options.max);

        return num;
    };

    // Address
    // Note: only returning US zip codes, internationalization will be a whole
    // other beast to tackle at some point.
    Chance.prototype.zip = function (options) {
        var zip = "";

        for (var i = 0; i < 5; i++) {
            zip += this.natural({min: 0, max: 9}).toString();
        }

        if (options && options.plusfour === true) {
            zip += '-';
            for (i = 0; i < 4; i++) {
                zip += this.natural({min: 0, max: 9}).toString();
            }
        }

        return zip;
    };

    // Street Suffix
    Chance.prototype.street_suffixes = function (options) {
        var suffixes = [];
        if (options && options.full) {
            suffixes = ['Avenue', 'Boulevard', 'Center', 'Circle', 'Court', 'Drive',
                        'Extension', 'Glen', 'Grove', 'Heights', 'Highway', 'Junction',
                        'Key', 'Lane', 'Loop', 'Manor', 'Mill', 'Park', 'Parkway', 'Pass',
                        'Path', 'Pike', 'Place', 'Plaza', 'Point', 'Ridge', 'River', 'Road',
                        'Square', 'Street', 'Terrace', 'Trail', 'Turnpike', 'View', 'Way'];
        } else {
            suffixes = ['Ave', 'Blvd', 'Ctr', 'Cir', 'Ct', 'Dr', 'Ext', 'Gln', 'Grv',
                        'Hts', 'Hwy', 'Jct', 'Key', 'Ln', 'Loop', 'Mnr', 'Mill', 'Park',
                        'Pkwy', 'Pass', 'Path', 'Pike', 'Pl', 'Plz', 'Pt', 'Rdg', 'Riv',
                        'Rd', 'Sq', 'St', 'Ter', 'Trl', 'Tpke', 'Vw', 'Way'];
        }
        return suffixes;
    };

    Chance.prototype.street_suffix = function (options) {
        // These are the most common suffixes.
        var suffixes = this.street_suffixes(options),
            suffix = suffixes[this.natural({max: suffixes.length - 1})];
        return suffix;
    };

    Chance.prototype.states = function () {
        return [
            { name: "Alabama", abbreviation: "AL" },
            { name: "Alaska", abbreviation: "AK" },
            { name: "American Samoa", abbreviation: "AS" },
            { name: "Arizona", abbreviation: "AZ" },
            { name: "Arkansas", abbreviation: "AR" },
            { name: "Armed Forces Europe", abbreviation: "AE" },
            { name: "Armed Forces Pacific", abbreviation: "AP" },
            { name: "Armed Forces the Americas", abbreviation: "AA" },
            { name: "California", abbreviation: "CA" },
            { name: "Colorado", abbreviation: "CO" },
            { name: "Connecticut", abbreviation: "CT" },
            { name: "Delaware", abbreviation: "DE" },
            { name: "District of Columbia", abbreviation: "DC" },
            { name: "Federated States of Micronesia", abbreviation: "FM" },
            { name: "Florida", abbreviation: "FL" },
            { name: "Georgia", abbreviation: "GA" },
            { name: "Guam", abbreviation: "GU" },
            { name: "Hawaii", abbreviation: "HI" },
            { name: "Idaho", abbreviation: "ID" },
            { name: "Illinois", abbreviation: "IL" },
            { name: "Indiana", abbreviation: "IN" },
            { name: "Iowa", abbreviation: "IA" },
            { name: "Kansas", abbreviation: "KS" },
            { name: "Kentucky", abbreviation: "KY" },
            { name: "Louisiana", abbreviation: "LA" },
            { name: "Maine", abbreviation: "ME" },
            { name: "Marshall Islands", abbreviation: "MH" },
            { name: "Maryland", abbreviation: "MD" },
            { name: "Massachusetts", abbreviation: "MA" },
            { name: "Michigan", abbreviation: "MI" },
            { name: "Minnesota", abbreviation: "MN" },
            { name: "Mississippi", abbreviation: "MS" },
            { name: "Missouri", abbreviation: "MO" },
            { name: "Montana", abbreviation: "MT" },
            { name: "Nebraska", abbreviation: "NE" },
            { name: "Nevada", abbreviation: "NV" },
            { name: "New Hampshire", abbreviation: "NH" },
            { name: "New Jersey", abbreviation: "NJ" },
            { name: "New Mexico", abbreviation: "NM" },
            { name: "New York", abbreviation: "NY" },
            { name: "North Carolina", abbreviation: "NC" },
            { name: "North Dakota", abbreviation: "ND" },
            { name: "Northern Mariana Islands", abbreviation: "MP" },
            { name: "Ohio", abbreviation: "OH" },
            { name: "Oklahoma", abbreviation: "OK" },
            { name: "Oregon", abbreviation: "OR" },
            { name: "Pennsylvania", abbreviation: "PA" },
            { name: "Puerto Rico", abbreviation: "PR" },
            { name: "Rhode Island", abbreviation: "RI" },
            { name: "South Carolina", abbreviation: "SC" },
            { name: "South Dakota", abbreviation: "SD" },
            { name: "Tennessee", abbreviation: "TN" },
            { name: "Texas", abbreviation: "TX" },
            { name: "Utah", abbreviation: "UT" },
            { name: "Vermont", abbreviation: "VT" },
            { name: "Virgin Islands, U.S.", abbreviation: "VI" },
            { name: "Virginia", abbreviation: "VA" },
            { name: "Washington", abbreviation: "WA" },
            { name: "West Virginia", abbreviation: "WV" },
            { name: "Wisconsin", abbreviation: "WI" },
            { name: "Wyoming", abbreviation: "WY" }
        ];
    };

    Chance.prototype.state = function (options) {
        var states = this.states(),
            state = (options && options.full) ?
              states[this.natural({max: states.length - 1})].name :
              states[this.natural({max: states.length - 1})].abbreviation;

        return state;
    };

    // Dice - For all the board game geeks out there, myself included ;)
    Chance.prototype.d4 = function () { return this.natural({min: 1, max: 4}); };
    Chance.prototype.d6 = function () { return this.natural({min: 1, max: 6}); };
    Chance.prototype.d8 = function () { return this.natural({min: 1, max: 8}); };
    Chance.prototype.d10 = function () { return this.natural({min: 1, max: 10}); };
    Chance.prototype.d12 = function () { return this.natural({min: 1, max: 12}); };
    Chance.prototype.d20 = function () { return this.natural({min: 1, max: 20}); };


    Chance.prototype.str = function (length) {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(this.random() * possible.length));
        }

        return text;
    };

    Chance.prototype.VERSION = 0.1;

    // Mersenne Twister from https://gist.github.com/banksean/300494
    var MersenneTwister = function (seed) {
        if (seed === undefined) {
            seed = new Date().getTime();
        }
        /* Period parameters */
        this.N = 624;
        this.M = 397;
        this.MATRIX_A = 0x9908b0df;   /* constant vector a */
        this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
        this.LOWER_MASK = 0x7fffffff; /* least significant r bits */
        
        this.mt = new Array(this.N); /* the array for the state vector */
        this.mti = this.N + 1; /* mti==N + 1 means mt[N] is not initialized */

        this.init_genrand(seed);
    };

    /* initializes mt[N] with a seed */
    MersenneTwister.prototype.init_genrand = function (s) {
        this.mt[0] = s >>> 0;
        for (this.mti = 1; this.mti < this.N; this.mti++) {
            s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
            this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + this.mti;
            /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
            /* In the previous versions, MSBs of the seed affect   */
            /* only MSBs of the array mt[].                        */
            /* 2002/01/09 modified by Makoto Matsumoto             */
            this.mt[this.mti] >>>= 0;
            /* for >32 bit machines */
        }
    };

    /* initialize by an array with array-length */
    /* init_key is the array for initializing keys */
    /* key_length is its length */
    /* slight change for C++, 2004/2/26 */
    MersenneTwister.prototype.init_by_array = function (init_key, key_length) {
        var i = 1, j = 0, k, s;
        this.init_genrand(19650218);
        k = (this.N > key_length ? this.N : key_length);
        for (; k; k--) {
            s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
            this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525))) + init_key[j] + j; /* non linear */
            this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
            i++;
            j++;
            if (i >= this.N) { this.mt[0] = this.mt[this.N - 1]; i = 1; }
            if (j >= key_length) { j = 0; }
        }
        for (k = this.N - 1; k; k--) {
            s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
            this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941)) - i; /* non linear */
            this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
            i++;
            if (i >= this.N) { this.mt[0] = this.mt[this.N - 1]; i = 1; }
        }

        this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
    };

    /* generates a random number on [0,0xffffffff]-interval */
    MersenneTwister.prototype.genrand_int32 = function () {
        var y;
        var mag01 = new Array(0x0, this.MATRIX_A);
        /* mag01[x] = x * MATRIX_A  for x=0,1 */

        if (this.mti >= this.N) { /* generate N words at one time */
            var kk;

            if (this.mti === this.N + 1) {   /* if init_genrand() has not been called, */
                this.init_genrand(5489); /* a default initial seed is used */
            }
            for (kk = 0; kk < this.N - this.M; kk++) {
                y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk + 1]&this.LOWER_MASK);
                this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            for (;kk < this.N - 1; kk++) {
                y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk + 1]&this.LOWER_MASK);
                this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            y = (this.mt[this.N - 1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
            this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

            this.mti = 0;
        }

        y = this.mt[this.mti++];

        /* Tempering */
        y ^= (y >>> 11);
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= (y >>> 18);

        return y >>> 0;
    };

    /* generates a random number on [0,0x7fffffff]-interval */
    MersenneTwister.prototype.genrand_int31 = function () {
        return (this.genrand_int32() >>> 1);
    };

    /* generates a random number on [0,1]-real-interval */
    MersenneTwister.prototype.genrand_real1 = function () {
        return this.genrand_int32() * (1.0 / 4294967295.0);
        /* divided by 2^32-1 */
    };

    /* generates a random number on [0,1)-real-interval */
    MersenneTwister.prototype.random = function () {
        return this.genrand_int32() * (1.0 / 4294967296.0);
        /* divided by 2^32 */
    };

    /* generates a random number on (0,1)-real-interval */
    MersenneTwister.prototype.genrand_real3 = function () {
        return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
        /* divided by 2^32 */
    };

    /* generates a random number on [0,1) with 53-bit resolution*/
    MersenneTwister.prototype.genrand_res53 = function () {
        var a = this.genrand_int32()>>>5, b = this.genrand_int32()>>>6;
        return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
    };


    // CommonJS module
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Chance;
        }
        exports.Chance = Chance;
    }

    // Register as a named AMD module
    if (typeof define === 'function' && define.amd) {
        define('Chance', [], function () {
            return Chance;
        });
    }

    // If there is a window object, that at least has a document property,
    // instantiate and define chance on the window
    if (typeof window === "object" && typeof window.document === "object") {
        window.Chance = Chance;
        window.chance = new Chance();
    }

})();

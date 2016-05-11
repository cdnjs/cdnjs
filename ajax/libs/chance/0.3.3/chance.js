//  Chance.js 0.3.3
//  http://chancejs.com
//  (c) 2013 Victor Quinn
//  Chance may be freely distributed or modified under the MIT license.

(function () {

    // Constructor
    var Chance = function (seed) {
        if (seed !== undefined) {
            this.seed = seed;
        }
        this.mt = this.mersenne_twister(seed);
    };

    // Wrap the MersenneTwister
    Chance.prototype.random = function () {
        return this.mt.random(this.seed);
    };

    // -- Basics --

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
        options.min = (typeof options.min !== "undefined") ? options.min : 0;
        // 9007199254740992 (2^53) is the max integer number in JavaScript
        // See: http://vq.io/132sa2j
        options.max = (typeof options.max !== "undefined") ? options.max : 9007199254740992;

        if (options.min > options.max) {
            throw new RangeError("Chance: Min cannot be greater than Max.");
        }

        return Math.floor(this.random() * (options.max - options.min + 1) + options.min);
    };

    Chance.prototype.integer = function (options) {
        var num, range;

        options = options || {};
        options.min = (typeof options.min !== "undefined") ? options.min : -9007199254740992;
        options.max = (typeof options.max !== "undefined") ? options.max : 9007199254740992;

        // Greatest of absolute value of either max or min so we know we're
        // including the entire search domain.
        range = Math.max(Math.abs(options.min), Math.abs(options.max));

        // Probably a better way to do this...
        do {
            num = this.natural({min: 0, max: range});
            num = this.bool() ? num : num * -1;
        } while (num < options.min || num > options.max);

        return num;
    };

    Chance.prototype.character = function (options) {
        options = options || {};

        var lower = "abcdefghijklmnopqrstuvwxyz",
            upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            numbers = "0123456789",
            symbols = "!@#$%^&*()[]",
            letters, pool;

        if (options.alpha && options.symbols) {
            throw new RangeError("Chance: Cannot specify both alpha and symbols.");
        }


        if (options.casing === 'lower') {
            letters = lower;
        } else if (options.casing === 'upper') {
            letters = upper;
        } else {
            letters = lower + upper;
        }

        if (options.pool) {
            pool = options.pool;
        } else if (options.alpha) {
            pool = letters;
        } else if (options.symbols) {
            pool = symbols;
        } else {
            pool = letters + numbers + symbols;
        }

        return pool.charAt(this.natural({max: (pool.length - 1)}));
    };

    Chance.prototype.string = function (options) {
        options = options || {};

        var length = options.length || this.natural({min: 5, max: 20}),
            text = '',
            pool = options.pool;

        for (var i = 0; i < length; i++) {
            text += this.character({pool: pool});
        }
        return text;
    };

    // -- End Basics --

    // -- Helpers --

    Chance.prototype.capitalize = function (word) {
        return word.charAt(0).toUpperCase() + word.substr(1);
    };

    Chance.prototype.pick = function (arr) {
        return arr[this.natural({max: arr.length - 1})];
    };

    // -- End Helpers --

    // -- Text --

    Chance.prototype.paragraph = function (options) {
        options = options || {};

        var sentences = options.sentences || this.natural({min: 3, max: 7}),
            sentence_array = [];

        for (var i = 0; i < sentences; i++) {
            sentence_array.push(this.sentence());
        }

        return sentence_array.join(' ');
    };

    // Could get smarter about this than generating random words and
    // chaining them together. Such as: http://vq.io/1a5ceOh
    Chance.prototype.sentence = function (options) {
        options = options || {};

        var words = options.words || this.natural({min: 12, max: 18}),
            text = '', word_array = [];

        for (var i = 0; i < words; i++) {
            word_array.push(this.word());
        }

        text = word_array.join(' ');

        // Capitalize first letter of sentence, add period at end
        text = this.capitalize(text) + '.';

        return text;
    };

    Chance.prototype.syllable = function (options) {
        options = options || {};

        var length = options.length || this.natural({min: 2, max: 3}),
            consanants = 'bcdfghjklmnprstvwz', // consonants except hard to speak ones
            vowels = 'aeiou', // vowels
            all = consanants + vowels, // all
            text = '',
            chr, pool;

        // I'm sure there's a more elegant way to do this, but this works
        // decently well.
        for (var i = 0; i < length; i++) {
            if (i === 0) {
                // First character can be anything
                chr = this.character({pool: all});
            } else if (consanants.indexOf(chr) === -1) {
                // Last charcter was a vowel, now we want a consanant
                chr = this.character({pool: consanants});
            } else {
                // Last charcter was a consanant, now we want a vowel
                chr = this.character({pool: vowels});
            }

            text += chr;
        }

        return text;
    };

    Chance.prototype.word = function (options) {
        options = options || {};

        if (options.syllables && options.length) {
            throw new RangeError("Chance: Cannot specify both syllables AND length.");
        }

        var syllables = options.syllables || this.natural({min: 1, max: 3}),
            text = '';

        if (options.length) {
            // Either bound word by length
            do {
                text += this.syllable();
            } while (text.length < options.length);
            text = text.substring(0, options.length);
        } else {
            // Or by number of syllables
            for (var i = 0; i < syllables; i++) {
                text += this.syllable();
            }
        }
        return text;
    };

    // -- End Text --

    // -- Name --

    // Perhaps make this more intelligent at some point
    Chance.prototype.first = function (options) {
        return this.capitalize(this.word());
    };

    Chance.prototype.last = function (options) {
        return this.capitalize(this.word());
    };

    Chance.prototype.name = function (options) {
        options = options || {};

        var first = this.first(),
            last = this.last(),
            name;

        if (options.middle) {
            name = first + ' ' + this.capitalize(this.word()) + ' ' + last;
        } else if (options.middle_initial) {
            name = first + ' ' + this.character({alpha: true, casing: 'upper'}) + '. ' + last;
        } else {
            name = first + ' ' + last;
        }

        if (options.prefix) {
            name = this.prefix() + ' ' + name;
        }

        return name;
    };

    Chance.prototype.name_prefixes = function () {
        return [
            {name: 'Doctor', abbreviation: 'Dr.'},
            {name: 'Miss', abbreviation: 'Miss'},
            {name: 'Misses', abbreviation: 'Mrs.'},
            {name: 'Mister', abbreviation: 'Mr.'}
        ];
    };

    // Alias for name_prefix
    Chance.prototype.prefix = function (options) {
        return this.name_prefix(options);
    };

    Chance.prototype.name_prefix = function (options) {
        options = options || {};
        return options.full ?
            this.pick(this.name_prefixes()).name :
            this.pick(this.name_prefixes()).abbreviation;
    };

    // -- End Name --

    // -- Web --

    Chance.prototype.domain = function (options) {
        options = options || {};
        return this.word() + '.' + (options.tld || this.tld());
    };

    Chance.prototype.email = function (options) {
        options = options || {};
        return this.word() + '@' + (options.domain || this.domain());
    };

    Chance.prototype.ip = function () {
        // Todo: This could return some reserved IPs. See http://vq.io/137dgYy
        // this should probably be updated to account for that rare as it may be
        return this.natural({max: 255}) + '.' +
               this.natural({max: 255}) + '.' +
               this.natural({max: 255}) + '.' +
               this.natural({max: 255});
    };

    Chance.prototype.tlds = function () {
        return ['com', 'org', 'edu', 'gov', 'co.uk', 'net', 'io'];
    };

    Chance.prototype.tld = function () {
        return this.pick(this.tlds());
    };

    // -- End Web --

    // -- Address --

    Chance.prototype.address = function (options) {
        options = options || {};
        return this.natural({min: 5, max: 2000}) + ' ' + this.street(options);
    };

    Chance.prototype.city = function (options) {
        options = options || {};
        return this.capitalize(this.word({syllables: 3}));
    };

    Chance.prototype.phone = function (options) {
        options = options || {};
        return this.areacode() + ' ' + this.natural({min: 200, max: 999}) + '-' + this.natural({min: 1000, max: 9999});
    };

    Chance.prototype.areacode = function (options) {
        options = options || {};
        options.parens = (typeof options.parens !== "undefined") ? options.parens : true;
        // Don't want area codes to start with 1
        var areacode = this.natural({min: 2, max: 9}).toString() + this.natural({min: 10, max: 98}).toString();
        return options.parens ? '(' + areacode + ')' : areacode;
    };

    Chance.prototype.street = function (options) {
        options = options || {};

        var street = this.word({syllables: 2});
        street = this.capitalize(street);
        street += ' ';
        street += options.short_suffix ?
            this.street_suffix().abbreviation :
            this.street_suffix().name;
        return street;
    };

    Chance.prototype.street_suffixes = function () {
        // These are the most common suffixes.
        return [
            {name: 'Avenue', abbreviation: 'Ave'},
            {name: 'Boulevard', abbreviation: 'Blvd'},
            {name: 'Center', abbreviation: 'Ctr'},
            {name: 'Circle', abbreviation: 'Cir'},
            {name: 'Court', abbreviation: 'Ct'},
            {name: 'Drive', abbreviation: 'Dr'},
            {name: 'Extension', abbreviation: 'Ext'},
            {name: 'Glen', abbreviation: 'Gln'},
            {name: 'Grove', abbreviation: 'Grv'},
            {name: 'Heights', abbreviation: 'Hts'},
            {name: 'Highway', abbreviation: 'Hwy'},
            {name: 'Junction', abbreviation: 'Jct'},
            {name: 'Key', abbreviation: 'Key'},
            {name: 'Lane', abbreviation: 'Ln'},
            {name: 'Loop', abbreviation: 'Loop'},
            {name: 'Manor', abbreviation: 'Mnr'},
            {name: 'Mill', abbreviation: 'Mill'},
            {name: 'Park', abbreviation: 'Park'},
            {name: 'Parkway', abbreviation: 'Pkwy'},
            {name: 'Pass', abbreviation: 'Pass'},
            {name: 'Path', abbreviation: 'Path'},
            {name: 'Pike', abbreviation: 'Pike'},
            {name: 'Place', abbreviation: 'Pl'},
            {name: 'Plaza', abbreviation: 'Plz'},
            {name: 'Point', abbreviation: 'Pt'},
            {name: 'Ridge', abbreviation: 'Rdg'},
            {name: 'River', abbreviation: 'Riv'},
            {name: 'Road', abbreviation: 'Rd'},
            {name: 'Square', abbreviation: 'Sq'},
            {name: 'Street', abbreviation: 'St'},
            {name: 'Terrace', abbreviation: 'Ter'},
            {name: 'Trail', abbreviation: 'Trl'},
            {name: 'Turnpike', abbreviation: 'Tpke'},
            {name: 'View', abbreviation: 'Vw'},
            {name: 'Way', abbreviation: 'Way'}
        ];
    };

    Chance.prototype.street_suffix = function (options) {
        return this.pick(this.street_suffixes(options));
    };

    Chance.prototype.states = function () {
        return [
            {name: 'Alabama', abbreviation: 'AL'},
            {name: 'Alaska', abbreviation: 'AK'},
            {name: 'American Samoa', abbreviation: 'AS'},
            {name: 'Arizona', abbreviation: 'AZ'},
            {name: 'Arkansas', abbreviation: 'AR'},
            {name: 'Armed Forces Europe', abbreviation: 'AE'},
            {name: 'Armed Forces Pacific', abbreviation: 'AP'},
            {name: 'Armed Forces the Americas', abbreviation: 'AA'},
            {name: 'California', abbreviation: 'CA'},
            {name: 'Colorado', abbreviation: 'CO'},
            {name: 'Connecticut', abbreviation: 'CT'},
            {name: 'Delaware', abbreviation: 'DE'},
            {name: 'District of Columbia', abbreviation: 'DC'},
            {name: 'Federated States of Micronesia', abbreviation: 'FM'},
            {name: 'Florida', abbreviation: 'FL'},
            {name: 'Georgia', abbreviation: 'GA'},
            {name: 'Guam', abbreviation: 'GU'},
            {name: 'Hawaii', abbreviation: 'HI'},
            {name: 'Idaho', abbreviation: 'ID'},
            {name: 'Illinois', abbreviation: 'IL'},
            {name: 'Indiana', abbreviation: 'IN'},
            {name: 'Iowa', abbreviation: 'IA'},
            {name: 'Kansas', abbreviation: 'KS'},
            {name: 'Kentucky', abbreviation: 'KY'},
            {name: 'Louisiana', abbreviation: 'LA'},
            {name: 'Maine', abbreviation: 'ME'},
            {name: 'Marshall Islands', abbreviation: 'MH'},
            {name: 'Maryland', abbreviation: 'MD'},
            {name: 'Massachusetts', abbreviation: 'MA'},
            {name: 'Michigan', abbreviation: 'MI'},
            {name: 'Minnesota', abbreviation: 'MN'},
            {name: 'Mississippi', abbreviation: 'MS'},
            {name: 'Missouri', abbreviation: 'MO'},
            {name: 'Montana', abbreviation: 'MT'},
            {name: 'Nebraska', abbreviation: 'NE'},
            {name: 'Nevada', abbreviation: 'NV'},
            {name: 'New Hampshire', abbreviation: 'NH'},
            {name: 'New Jersey', abbreviation: 'NJ'},
            {name: 'New Mexico', abbreviation: 'NM'},
            {name: 'New York', abbreviation: 'NY'},
            {name: 'North Carolina', abbreviation: 'NC'},
            {name: 'North Dakota', abbreviation: 'ND'},
            {name: 'Northern Mariana Islands', abbreviation: 'MP'},
            {name: 'Ohio', abbreviation: 'OH'},
            {name: 'Oklahoma', abbreviation: 'OK'},
            {name: 'Oregon', abbreviation: 'OR'},
            {name: 'Pennsylvania', abbreviation: 'PA'},
            {name: 'Puerto Rico', abbreviation: 'PR'},
            {name: 'Rhode Island', abbreviation: 'RI'},
            {name: 'South Carolina', abbreviation: 'SC'},
            {name: 'South Dakota', abbreviation: 'SD'},
            {name: 'Tennessee', abbreviation: 'TN'},
            {name: 'Texas', abbreviation: 'TX'},
            {name: 'Utah', abbreviation: 'UT'},
            {name: 'Vermont', abbreviation: 'VT'},
            {name: 'Virgin Islands, U.S.', abbreviation: 'VI'},
            {name: 'Virginia', abbreviation: 'VA'},
            {name: 'Washington', abbreviation: 'WA'},
            {name: 'West Virginia', abbreviation: 'WV'},
            {name: 'Wisconsin', abbreviation: 'WI'},
            {name: 'Wyoming', abbreviation: 'WY'}
        ];
    };

    Chance.prototype.state = function (options) {
        return (options && options.full) ?
            this.pick(this.states()).name :
            this.pick(this.states()).abbreviation;
    };

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

    // -- End Address --

    // -- Time

    Chance.prototype.month = function (options) {
        options = options || {};
        var month = this.pick(this.months());
        return options.raw ? month : month.name;
    };

    Chance.prototype.months = function () {
        return [
            {name: 'January', short_name: 'Jan', numeric: '01'},
            {name: 'February', short_name: 'Feb', numeric: '02'},
            {name: 'March', short_name: 'Mar', numeric: '03'},
            {name: 'April', short_name: 'Apr', numeric: '04'},
            {name: 'May', short_name: 'May', numeric: '05'},
            {name: 'June', short_name: 'Jun', numeric: '06'},
            {name: 'July', short_name: 'Jul', numeric: '07'},
            {name: 'August', short_name: 'Aug', numeric: '08'},
            {name: 'September', short_name: 'Sep', numeric: '09'},
            {name: 'October', short_name: 'Oct', numeric: '10'},
            {name: 'November', short_name: 'Nov', numeric: '11'},
            {name: 'December', short_name: 'Dec', numeric: '12'}
        ];
    };

    Chance.prototype.year = function (options) {
        options = options || {};

        // Default to current year as min if none specified
        options.min = (typeof options.min !== "undefined") ? options.min : new Date().getFullYear();
        // Default to one century after current year as max if none specified
        options.max = (typeof options.max !== "undefined") ? options.max : options.min + 100;

        return this.natural({min: options.min, max: options.max}).toString();
    };

    // -- End Time

    // -- Finance --

    Chance.prototype.cc = function (options) {
        options = options || {};

        var type, number, to_generate, type_name,
            last = null,
            digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        type = (options.type) ?
                    this.cc_type({ name: options.type, raw: true }) :
                    this.cc_type({ raw: true });
        number = type.prefix;
        to_generate = type.length - type.prefix.length - 1;

        // Generates n - 1 digits
        for (var i = 0; i < to_generate; i++) {
            number = number + this.integer({min: 0, max: 9}).toString();
        }

        // Generates the last digit according to Luhn algorithm
        do {
            last = digits.splice(0, 1);
        } while (!this.luhn_check(number + last));

        return number + last;
    };

    Chance.prototype.cc_types = function () {
        // http://en.wikipedia.org/wiki/Bank_card_number#Issuer_identification_number_.28IIN.29
        return [
            {name: "American Express", short_name: 'amex', prefix: '34', length: 15},
            {name: "Bankcard", short_name: 'bankcard', prefix: '5610', length: 16},
            {name: "China UnionPay", short_name: 'chinaunion', prefix: '62', length: 16},
            {name: "Diners Club Carte Blanche", short_name: 'dccarte', prefix: '300', length: 14},
            {name: "Diners Club enRoute", short_name: 'dcenroute', prefix: '2014', length: 15},
            {name: "Diners Club International", short_name: 'dcintl', prefix: '36', length: 14},
            {name: "Diners Club United States & Canada", short_name: 'dcusc', prefix: '54', length: 16},
            {name: "Discover Card", short_name: 'discover', prefix: '6011', length: 16},
            {name: "InstaPayment", short_name: 'instapay', prefix: '637', length: 16},
            {name: "JCB", short_name: 'jcb', prefix: '3528', length: 16},
            {name: "Laser", short_name: 'laser', prefix: '6304', length: 16},
            {name: "Maestro", short_name: 'maestro', prefix: '5018', length: 16},
            {name: "Mastercard", short_name: 'mc', prefix: '51', length: 16},
            {name: "Solo", short_name: 'solo', prefix: '6334', length: 16},
            {name: "Switch", short_name: 'switch', prefix: '4903', length: 16},
            {name: "Visa", short_name: 'visa', prefix: '4', length: 16},
            {name: "Visa Electron", short_name: 'electron', prefix: '4026', length: 16}
        ];
    };

    Chance.prototype.cc_type = function (options) {
        options = options || {};
        var types = this.cc_types(),
            type = null;

        if (options.name) {
            for (var i = 0; i < types.length; i++) {
                // Accept either name or short_name to specify card type
                if (types[i].name === options.name || types[i].short_name === options.name) {
                    type = types[i];
                    break;
                }
            }
            if (type === null) {
                throw new Error("Credit card type '" + options.name + "'' is not suppoted");
            }
        } else {
            type = this.pick(types);
        }

        return options.raw ? type : type.name;
    };

    Chance.prototype.exp = function (options) {
        options = options || {};
        var exp = {};

        exp.year = this.exp_year();

        // If the year is this year, need to ensure month is greater than the
        // current month or this expiration will not be valid
        if (exp.year === (new Date().getFullYear())) {
            exp.month = this.exp_month({future: true});
        } else {
            exp.month = this.exp_month();
        }

        return options.raw ? exp : exp.month + '/' + exp.year;
    };

    Chance.prototype.exp_month = function (options) {
        options = options || {};
        var month, month_int;

        if (options.future) {
            do {
                month = this.month({raw: true}).numeric;
                month_int = parseInt(month, 10);
            } while (month_int < new Date().getMonth());
        } else {
            month = this.month({raw: true}).numeric;
        }

        return month;
    };

    Chance.prototype.exp_year = function (options) {
        return this.year({max: new Date().getFullYear() + 10});
    };

    // -- End Finance

    // -- Miscellaneous --

    // Dice - For all the board game geeks out there, myself included ;)
    Chance.prototype.d4 = function () { return this.natural({min: 1, max: 4}); };
    Chance.prototype.d6 = function () { return this.natural({min: 1, max: 6}); };
    Chance.prototype.d8 = function () { return this.natural({min: 1, max: 8}); };
    Chance.prototype.d10 = function () { return this.natural({min: 1, max: 10}); };
    Chance.prototype.d12 = function () { return this.natural({min: 1, max: 12}); };
    Chance.prototype.d20 = function () { return this.natural({min: 1, max: 20}); };
    Chance.prototype.d100 = function () { return this.natural({min: 1, max: 100}); };

    // Guid
    Chance.prototype.guid = function () {
        var guid_pool = "ABCDEF1234567890",
            guid = this.string({pool: guid_pool, length: 8}) + '-' +
                   this.string({pool: guid_pool, length: 4}) + '-' +
                   this.string({pool: guid_pool, length: 4}) + '-' +
                   this.string({pool: guid_pool, length: 4}) + '-' +
                   this.string({pool: guid_pool, length: 12});
        return guid;
    };

    Chance.prototype.mersenne_twister = function (seed) {
        return new MersenneTwister(seed);
    };

    Chance.prototype.luhn_check = function (num) {
        var luhnArr = [[0, 2, 4, 6, 8, 1, 3, 5, 7, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]], sum = 0;
        num.toString().replace(/\D+/g, "").replace(/[\d]/g, function (c, p, o) {
            sum += luhnArr[(o.length - p) & 1][parseInt(c, 10)];
        });
        return (sum % 10 === 0) && (sum > 0);
    };

    // -- End Miscellaneous --

    Chance.prototype.VERSION = "0.3.3";

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

/**
 * PersianJs v0.4.0
 * https://github.com/usablica/persian.js
 * MIT licensed
 *
 * Copyright (C) 2012 usabli.ca and other contributors
 */
(function () {

    // Default config/variables
    var VERSION = "0.4.0",
        // Check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports);
	
	// Declare Number Arrays in different locales
	var arabicNumbers  = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"],
		persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"], 
		englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
       
    /**
     * PersianJs main class
     *
     * @class PersianJs
     */
    function PersianJs(str) {
        this._str = str;
    }

    /**
     * Used for convert Arabic characters to Persian
     *
     * @api private
     * @method _arabicChar
     * @param {String} value
     * @return {Object} PersianJs Object
     */
    function _arabicChar(value) {
        if (!value) {
            return;
        }
        var arabicChars = ["ي", "ك", "‍", "دِ", "بِ", "زِ", "ذِ", "ِشِ", "ِسِ", "ى"],
            persianChars = ["ی", "ک", "", "د", "ب", "ز", "ذ", "ش", "س", "ی"];

        for (var i = 0, charsLen = arabicChars.length; i < charsLen; i++) {
            value = value.replace(new RegExp(arabicChars[i], "g"), persianChars[i]);
        }
        this._str = value;
        return this;
    }

    /**
     * Used for convert Persian numbers to English
     * 
     * @api private
     * @method _persianNumber
     * @param {String} value
     * @return {Object} PersianJs Object
     */
    function _persianNumber(value) {
        if (!value) {
            return;
        }
    
        for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
            value = value.replace(new RegExp(persianNumbers[i], "g"), englishNumbers[i]);
        }
    
        this._str = value;
        return this;
    }

    /**
     * Used for convert Arabic numbers to Persian
     *
     * @api private
     * @method _arabicNumber
     * @param {String} value
     * @return {Object} PersianJs Object
     */
    function _arabicNumber(value) {
        if (!value) {
            return;
        }
        value=value.toString();

        for (var i = 0, numbersLen = arabicNumbers.length; i < numbersLen; i++) {
            value = value.replace(new RegExp(arabicNumbers[i], "g"), persianNumbers[i]);
        }
        this._str = value;
        return this;
    }

    /**
     * Used for convert English numbers to Persian
     *
     * @api private
     * @method _englishNumber
     * @param {String} value
     * @return {Object} PersianJs Object
     */
    function _englishNumber(value) {
        if (!value) {
            return;
        }
        value=value.toString();
        var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
            persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];

        for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
            value = value.replace(new RegExp(englishNumbers[i], "g"), persianNumbers[i]);
        }
        this._str = value;
        return this;
    }
    
	/**
     * Used for convert Persian and Arabic numbers to English string
     *
     * @api private
     * @method _toEnglishNumber
     * @param {String} value 
     * @return {Object} PersianJs Object
     */
    function _toEnglishNumber(value) {
        if (!value) {
            return;
        }
        for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
            value = value.replace(new RegExp(persianNumbers[i], "g"), englishNumbers[i])
						 .replace(new RegExp(arabicNumbers[i], "g"), englishNumbers[i]);
        }
        this._str = value;
        return this;
    }

    /**
     * Used for decode Persian Charachters in URL
     * https://fa.wikipedia.org/wiki/مدیاویکی:Gadget-Extra-Editbuttons-Functions.js
     *
     * @api private
     * @method _decodeURL
     * @param {String} value
     * @return {Object} PersianJs Object
     */
    function _decodeURL(value) {
        if (!value) {
            return;
        }
        // Replace every %20 with _ to protect them from decodeURI
        var old = "";
        while (old != value) {
            old = value;
            value = value.replace(/(http\S+?)\%20/g, '$1\u200c\u200c\u200c_\u200c\u200c\u200c');
        }
        // Decode URIs
        // NOTE: This would convert all %20's to _'s which could break some links
        // but we will undo that later on
        value = value.replace(/(http\S+)/g, function (s, p) {
            return decodeURI(p);
        });
        // Revive all instances of %20 to make sure no links is broken
        value = value.replace(/\u200c\u200c\u200c_\u200c\u200c\u200c/g, '%20');
        this._str = value;
        return this;
    }

    /**
     * Used for Change keyboard layout
     *
     * @api private
     * @method _switchKey
     * @param {String} value
     * @return {Object} PersianJs Object
     */
    function _switchKey(value) {
        if (!value) {
            return;
        }
        var persianChar = [ "ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "چ", "ش", "س", "ی", "ب", "ل", "ا", "ت", "ن", "م", "ک", "گ", "ظ", "ط", "ز", "ر", "ذ", "د", "پ", "و","؟" ],
            englishChar = [ "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",","?" ];

        for (var i = 0, charsLen = persianChar.length; i < charsLen; i++) {
            value = value.replace(new RegExp(persianChar[i], "g"), englishChar[i]);
        }
        this._str = value;
        return this;
    }

    /**
     * Used for get persian words representation of a number
     *
     * @api private
     * @method _digitsToWords
     * @param {String} value
     * @return {Object} PersianJs Object
     */
    function _digitsToWords(value) {
        var delimiter, digit, i, iThree, numbers, parts, result, resultThree, three;

        if (!isFinite(value)) {
            return '';
        }

        if (typeof value !== "string") {
            value = value.toString();
        }

        parts = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون', 'کوادریلیون', 'کویینتیلیون', 'سکستیلیون'];
        numbers = {
            0: ['', 'صد', 'دویصت', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'],
            1: ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
            2: ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
            two: ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'],
            zero: 'صفر'
        };
        delimiter = ' و ';

        valueParts = value.split('').reverse().join('').replace(/\d{3}(?=\d)/g, "$&,").split('').reverse().join('').split(',').map(function(str) {
            return Array(4 - str.length).join('0') + str;
        });

        result = (function() {
            var _results;
            _results = [];
            for (iThree in valueParts) {
                three = valueParts[iThree];

                resultThree = (function() {
                    var _i, _len, _results1;
                    _results1 = [];

                    for (i = _i = 0, _len = three.length; _i < _len; i = ++_i) {
                        digit = three[i];
                        if (i === 1 && digit === '1') {
                            _results1.push(numbers.two[three[2]]);
                        } else if ((i !== 2 || three[1] !== '1') && numbers[i][digit] !== '') {
                            _results1.push(numbers[i][digit]);
                        } else {
                            continue;
                        }
                    }

                    return _results1;
                })();

                resultThree = resultThree.join(delimiter);
                _results.push(resultThree + ' ' + parts[valueParts.length - iThree - 1]);
            }
            return _results;
        })();

        result = result.filter(function(x) {
            return x.trim() !== '';
        });

        result = result.join(delimiter).trim();
        if (result === '') {
            result = numbers.zero;
        }

        this._str = result;
        return this;
    }

    /**
     * Used for Zero-width non-joiner correction
     *
     * @api private
     * @method _halfSpace
     * @param {string} value
     * @return {object} PersianJs object
     */
    function _halfSpace(value){
        if(!value){
            return;
        }

        var pattern;

        // Replace Zero-width non-joiner between persian MI.
        pattern = /((\s\u0645\u06CC)+( )+([\u0600-\u06EF]{1,}){1,})/g;
        value = value.replace( new RegExp(pattern), "$2\u200C$4" );

        // Replace Zero-width non-joiner between perisan De-Yii.
        pattern = /(([\u0600-\u06EF]{1,})+( )+(ای|ایی|اند|ایم|اید|ام){1})/g;
        value = value.replace( new RegExp(pattern), "$2\u200C$4" );

        this._str = value;
        return this;
    }

    var persianJs = function(inputStr) {
        if (!inputStr || inputStr === "") {
            throw new Error("Input is null or empty.");
        }
        return new PersianJs(inputStr);
    };

    /**
     * Current PersianJs version
     *
     * @property version
     * @type String
     */
    persianJs.version = VERSION;

    //Prototype
    persianJs.fn = PersianJs.prototype = {
        clone: function () {
            return persianJs(this);
        },
        value: function () {
            return this._str;
        },
        toString: function () {
            return this._str.toString();
        },
        set : function (value) {
            this._str = String(value);
            return this;
        },
        arabicChar: function() {
            return _arabicChar.call(this, this._str);
        },
        persianNumber: function () {
            return _persianNumber.call(this, this._str);
        },
        arabicNumber: function() {
            return _arabicNumber.call(this, this._str);
        },
        englishNumber: function() {
            return _englishNumber.call(this, this._str);
        },
        toEnglishNumber: function() {
            return _toEnglishNumber.call(this, this._str);
        },
        fixURL: function() {
            return _decodeURL.call(this, this._str);
        },
        decodeURL: function() {
            return _decodeURL.call(this, this._str);
        },
        switchKey: function() {
            return _switchKey.call(this, this._str);
        },
        digitsToWords: function() {
            return _digitsToWords.call(this, this._str);
        },
        halfSpace: function(){
            return _halfSpace.call(this, this._str);
        }
    };

    //Expose PersianJs
    //CommonJS module is defined
    if (hasModule) {
        module.exports = persianJs;
    }
    //global ender:false
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `persianJs` as a global object via a string identifier,
        // for Closure Compiler "advanced" mode
        this['persianJs'] = persianJs;
    }
    //global define:false
    if (typeof define === 'function' && define.amd) {
        define('persianJs', [], function () {
            return persianJs;
        });
    }
})();

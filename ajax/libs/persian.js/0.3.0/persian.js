/**
* PersianJs v0.3.0
* https://github.com/usablica/persian.js
* MIT licensed
*
* Copyright (C) 2012 usabli.ca and other contributors
*/
(function () {

    //Default config/variables
    var VERSION = "0.3.0",
        //Check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports);

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
        var arabicChars = ["ي", "ك", "‍", "دِ", "بِ", "زِ", "ذِ", "ِشِ", "ِسِ", "‌", "ى"],
            persianChars = ["ی", "ک", "", "د", "ب", "ز", "ذ", "ش", "س", "", "ی"];

        for (var i = 0, charsLen = arabicChars.length; i < charsLen; i++) {
            value = value.replace(new RegExp(arabicChars[i], "g"), persianChars[i]);
        }
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
        var arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"],
            persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];

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
        var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
            persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];

        for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
            value = value.replace(new RegExp(englishNumbers[i], "g"), persianNumbers[i]);
        }
        this._str = value;
        return this;
    }

    /**
    * Used for fix Persian Charachters in URL
    * https://fa.wikipedia.org/wiki/مدیاویکی:Gadget-Extra-Editbuttons-Functions.js
    *
    * @api private
    * @method _fixURL
    * @param {String} value 
    * @return {Object} PersianJs Object
    */
    function _fixURL(value) {
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
        arabicNumber: function() {
            return _arabicNumber.call(this, this._str);
        },
        fixURL: function() {
            return _fixURL.call(this, this._str);
        },
        englishNumber: function() {
            return _englishNumber.call(this, this._str);
        },
        switchKey: function() {
            return _switchKey.call(this, this._str);
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

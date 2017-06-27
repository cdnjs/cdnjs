/**
 * https://typeis.github.io/
 * https://github.com/typeis/typeisjs
 * typeis.js
 * Typeis. it's the smart and simple javaScript type checker
 *
 * @author Salih Sağdilek
 * @version 1.1.0
 */

;(function () {
    var OP = Object.prototype;
    if (Object.defineProperty && !OP.typeis) {
        var toString, Regex;
        toString = OP.toString;
        Regex = /^\[object |]$/gi;
        Object.defineProperty(OP, 'typeis', {value: function (is) {return typeis(this, is)}});
        function whatTheType(something){
            return toString.call(something).replace(Regex, '');
        }
        function typeis(something, is) {
            var type = whatTheType(something, is);
            if(whatTheType(is) == 'Array'){
                is = is.join('|');
            }
            return is ? new RegExp('^(' + is + ')$', 'i').test(type) : type;
        }
    }
})();
/*!
* inputmask.phone.extensions.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2015 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.2.2
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery", "inputmask" ], factory) : "object" == typeof exports ? module.exports = factory(require("jquery"), require("./inputmask")) : factory(jQuery, window.Inputmask);
}(function($, Inputmask) {
    return Inputmask.extendAliases({
        phone: {
            url: "phone-codes/phone-codes.js",
            countrycode: "",
            mask: function(opts) {
                opts.definitions["#"] = opts.definitions[9];
                var maskList = [];
                return $.ajax({
                    url: opts.url,
                    async: !1,
                    dataType: "json",
                    success: function(response) {
                        maskList = response;
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        alert(thrownError + " - " + opts.url);
                    }
                }), maskList = maskList.sort(function(a, b) {
                    return (a.mask || a) < (b.mask || b) ? -1 : 1;
                });
            },
            keepStatic: !1,
            nojumps: !0,
            nojumpsThreshold: 1,
            onBeforeMask: function(value, opts) {
                var processedValue = value.replace(/^0/g, "");
                return (processedValue.indexOf(opts.countrycode) > 1 || -1 === processedValue.indexOf(opts.countrycode)) && (processedValue = "+" + opts.countrycode + processedValue), 
                processedValue;
            }
        },
        phonebe: {
            alias: "phone",
            url: "phone-codes/phone-be.js",
            countrycode: "32",
            nojumpsThreshold: 4
        }
    }), Inputmask;
});
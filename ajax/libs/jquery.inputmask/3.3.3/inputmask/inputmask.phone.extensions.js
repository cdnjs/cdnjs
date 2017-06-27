/*!
* inputmask.phone.extensions.js
* https://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2016 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.3
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "inputmask.dependencyLib", "inputmask" ], factory) : "object" == typeof exports ? module.exports = factory(require("./inputmask.dependencyLib.jquery"), require("./inputmask")) : factory(window.dependencyLib || jQuery, window.Inputmask);
}(function($, Inputmask) {
    return Inputmask.extendAliases({
        abstractphone: {
            countrycode: "",
            phoneCodes: [],
            mask: function(opts) {
                opts.definitions = {
                    "#": opts.definitions[9]
                };
                var masks = opts.phoneCodes.sort(function(a, b) {
                    var maska = (a.mask || a).replace(/#/g, "9").replace(/[\+\(\)#-]/g, ""), maskb = (b.mask || b).replace(/#/g, "9").replace(/[\+\(\)#-]/g, ""), maskas = (a.mask || a).split("#")[0], maskbs = (b.mask || b).split("#")[0];
                    return 0 === maskbs.indexOf(maskas) ? -1 : 0 === maskas.indexOf(maskbs) ? 1 : maska.localeCompare(maskb);
                });
                return masks;
            },
            keepStatic: !0,
            onBeforeMask: function(value, opts) {
                var processedValue = value.replace(/^0{1,2}/, "").replace(/[\s]/g, "");
                return (processedValue.indexOf(opts.countrycode) > 1 || processedValue.indexOf(opts.countrycode) === -1) && (processedValue = "+" + opts.countrycode + processedValue), 
                processedValue;
            },
            onUnMask: function(maskedValue, unmaskedValue, opts) {
                return unmaskedValue;
            }
        }
    }), Inputmask;
});
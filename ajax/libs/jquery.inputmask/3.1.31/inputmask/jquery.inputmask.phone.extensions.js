/*!
* jquery.inputmask.phone.extensions.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2014 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.1.31
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery", "./jquery.inputmask" ], factory) : factory(jQuery);
}(function($) {
    return $.extend($.inputmask.defaults.aliases, {
        phone: {
            url: "phone-codes/phone-codes.js",
            maskInit: "+pp(pp)pppppppp",
            mask: function(opts) {
                opts.definitions = {
                    p: {
                        validator: function() {
                            return !1;
                        },
                        cardinality: 1
                    },
                    "#": {
                        validator: "[0-9]",
                        cardinality: 1
                    }
                };
                var maskList = [];
                return $.ajax({
                    url: opts.url,
                    async: !1,
                    dataType: "json",
                    success: function(response) {
                        maskList = response;
                    }
                }), maskList = maskList.sort(function(a, b) {
                    return (a.mask || a) < (b.mask || b) ? -1 : 1;
                }), maskList.splice(0, 0, opts.maskInit), maskList;
            },
            nojumps: !0,
            nojumpsThreshold: 1
        },
        phonebe: {
            alias: "phone",
            url: "phone-codes/phone-be.js",
            maskInit: "+32(pp)pppppppp",
            nojumpsThreshold: 4,
            onBeforeMask: function(value) {
                var processedValue = value.replace(/^0/g, "");
                return (processedValue.indexOf("32") > 1 || -1 == processedValue.indexOf("32")) && (processedValue = "32" + processedValue), 
                processedValue;
            }
        }
    }), $.fn.inputmask;
});
/*
* jquery.inputmask.phone.extensions.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2014 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.1.26
*/
(function (factory) {if (typeof define === 'function' && define.amd) {define(["jquery","./jquery.inputmask"], factory);} else {factory(jQuery);}}/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.0.0

Phone extension.
When using this extension make sure you specify the correct url to get the masks

 $(selector).inputmask("phone", {
                url: "Scripts/jquery.inputmask/phone-codes/phone-codes.json", 
                onKeyValidation: function () { //show some metadata in the console
                    console.log($(this).inputmask("getmetadata")["cd"]);
                } 
  });


*/
(function ($) {
    $.extend($.inputmask.defaults.aliases, {
        'phone': {
            url: "phone-codes/phone-codes.js",
            maskInit: "+pp(pp)pppppppp",
            mask: function (opts) {
                opts.definitions = {
                    'p': {
                        validator: function () { return false; },
                        cardinality: 1
                    },
                    '#': {
                        validator: "[0-9]",
                        cardinality: 1
                    }
                };
                var maskList = [];
                $.ajax({
                    url: opts.url,
                    async: false,
                    dataType: 'json',
                    success: function (response) {
                        maskList = response;
                    }
                });

                maskList.splice(0, 0, opts.maskInit);
                maskList.sort(function (a, b) { return a.length - b.length; });
                return maskList;
            },
            nojumps: true,
            nojumpsThreshold: 1
        },
        'phonebe': {
            alias: "phone",
            url: "phone-codes/phone-be.js",
            maskInit: "+32(pp)pppppppp",
            nojumpsThreshold: 4
        }
    });
    return $.fn.inputmask;
}));
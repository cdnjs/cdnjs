/**
 * jQuery Allowed Chars simple plugin version: 0.1.3, date: 11/05/2014
 *
 * jQuery plugin to restrict users for typing only allowed chars for specified element
 *
 * Copyright (c) 2014 Pavlo Voznenko (p.voznenko@gmail.com)
 * https://github.com/fosco-maestro/jquery-allowed-chars-simple-plugin
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Library require jQuery been loaded.
 *
 * Usage Example:
 *
 * In our HTML code we have 2 inputs:
 *
 *      Only int: <input type='text' id="int"/><br/>
 *      Custom chars[a, b, 1, {space}, _]: <input type='text' id="custom"/>
 *
 * So, to strict input valuables to use only integer for input with id 'int' use following:
 *
 *      $('#int').allowedChars(); // by default plugin allows only int chars: 0123456789
 *
 * For customized allowed char list, pass string with chars as parameter:
 *
 *      $('#custom').allowedChars('ab1 _');
 *
 * Demo available on: http://jsfiddle.net/fosco/55XLd/
 *
 */
(function($) {
    "use strict";

    /**
     * By default plugin allow only int chars: 0123456789
     * You can change chars by passing string with chars as parameter
     *
     * @param {String} options string of allowed chars. Default chars: 0123456789
     */
    $.fn.allowedChars = function(options) {
        var settings = {
                allowedCharsList : "0123456789"
            },
            $this = $(this);

        var methods = {
            /**
             * @param {String} options string of allowed chars
             * @returns {boolean}
             */
            'init' : function ( options )
            {
                if (options !== undefined) {
                    switch (typeof options) {
                        case "string":
                            settings.allowedCharsList = options.toLowerCase();
                            break;
                        default:
                            return false;
                        }
                }
                return true;
            }
        };

        if (methods.init(options)) {
            $this.keypress(function(event) {
                var key = window.event ? window.event.keyCode : (event.keyCode || (event.charCode || undefined)),
                    keychar;

                if (key === undefined) {
                    return true;
                }

                keychar = String.fromCharCode(key).toLowerCase();

                if (settings.allowedCharsList.indexOf(keychar) !== -1) {
                    return true;
                }

                return [null, 0, 8, 9, 13, 27 ].indexOf(key) !== -1;
            });
        }
    };
}(jQuery));
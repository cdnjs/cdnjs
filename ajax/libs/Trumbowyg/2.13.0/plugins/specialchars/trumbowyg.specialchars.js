/* ===========================================================
 * trumbowyg.specialchars.js v0.99
 * Unicode characters picker plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Renaud Hoyoux (geektortoise)
*/

(function ($) {
    'use strict';

    var defaultOptions = {
        symbolList: [
            // currencies
            '0024','20AC','00A3','00A2','00A5','00A4','2030', null,
            // legal signs
            '00A9','00AE', '2122', null,
            // textual sign
            '00A7','00B6','00C6','00E6','0152','0153', null,
            '2022','25CF','2023','25B6','2B29','25C6',null,
            //maths
            '00B1','00D7','00F7','21D2','21D4','220F','2211','2243','2264','2265'
 		    ]
    };

    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                specialChars: 'Special characters'
            },
            fr: {
                specialChars: 'Caractères spéciaux'
            }
        },
        plugins: {
            specialchars: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.specialchars = trumbowyg.o.plugins.specialchars || defaultOptions;
                    var specialCharsBtnDef = {
                        dropdown: buildDropdown(trumbowyg)
                    };

                    trumbowyg.addBtnDef('specialChars', specialCharsBtnDef);
                }
            }
        }
    });
    function buildDropdown(trumbowyg) {
        var dropdown = [];
        var isNull = false;
        $.each(trumbowyg.o.plugins.specialchars.symbolList, function (i, symbol) {
            if(symbol === null){
                symbol = '&nbsp';
            } else {
                symbol = '&#x' + symbol;
            }
            var btn = symbol.replace(/:/g, ''),
                defaultSymbolBtnName = 'symbol-' + btn,
                defaultSymbolBtnDef = {
                    text: symbol,
                    fn: function () {
                        var encodedSymbol = String.fromCodePoint(symbol.replace("&#", "0"));
                        trumbowyg.execCmd('insertText', encodedSymbol);
                        return true;
                    }
                };

            trumbowyg.addBtnDef(defaultSymbolBtnName, defaultSymbolBtnDef);
            dropdown.push(defaultSymbolBtnName);
        });

        return dropdown;
    }
})(jQuery);

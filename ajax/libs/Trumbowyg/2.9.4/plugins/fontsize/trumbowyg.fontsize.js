(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                fontsize: 'Font size',
                fontsizes: {
                    'x-small': 'Extra Small',
                    'small': 'Small',
                    'medium': 'Regular',
                    'large': 'Large',
                    'x-large': 'Extra Large'
                }
            },
            nl: {
                fontsize: 'Lettergrootte',
                fontsizes: {
                    'x-small': 'Extra Klein',
                    'small': 'Klein',
                    'medium': 'Normaal',
                    'large': 'Groot',
                    'x-large': 'Extra Groot'
                }
            }
        }
    });
    // jshint camelcase:true

    // Add dropdown with font sizes
    $.extend(true, $.trumbowyg, {
        plugins: {
            fontsize: {
                init: function (trumbowyg) {
                    trumbowyg.addBtnDef('fontsize', {
                        dropdown: buildDropdown(trumbowyg)
                    });
                }
            }
        }
    });
    function buildDropdown(trumbowyg) {
        var dropdown = [];
        var sizes = ['x-small', 'small', 'medium', 'large', 'x-large'];

        $.each(sizes, function(index, size) {
            trumbowyg.addBtnDef('fontsize_' + size, {
                text: '<span style="font-size: ' + size + ';">' + trumbowyg.lang.fontsizes[size] + '</span>',
                hasIcon: false,
                fn: function(){
                    trumbowyg.execCmd('fontSize', index+1, true);
                }
            });
            dropdown.push('fontsize_' + size);
        });

        return dropdown;
    }
})(jQuery);

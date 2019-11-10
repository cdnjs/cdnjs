(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                fontsize: 'Font size',
                fontsizes: {
                    'x-small': 'Extra small',
                    'small': 'Small',
                    'medium': 'Regular',
                    'large': 'Large',
                    'x-large': 'Extra large',
                    'custom': 'Custom'
                }
            },
            fr: {
                fontsize: 'Taille de la police',
                fontsizes: {
                    'x-small': 'Très petit',
                    'small': 'Petit',
                    'medium': 'Normal',
                    'large': 'Grand',
                    'x-large': 'Très grand',
                    'custom': 'Douane'
                }
            },
            nl: {
                fontsize: 'Lettergrootte',
                fontsizes: {
                    'x-small': 'Extra klein',
                    'small': 'Klein',
                    'medium': 'Normaal',
                    'large': 'Groot',
                    'x-large': 'Extra groot',
                    'custom': 'Tilpasset'
                }
            },
            tr: {
                fontsize: 'Yazı Boyutu',
                fontsizes: {
                    'x-small': 'Çok Küçük',
                    'small': 'Küçük',
                    'medium': 'Normal',
                    'large': 'Büyük',
                    'x-large': 'Çok Büyük',
                    'custom': 'Görenek'
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

        $.each(sizes, function (index, size) {
            trumbowyg.addBtnDef('fontsize_' + size, {
                text: '<span style="font-size: ' + size + ';">' + trumbowyg.lang.fontsizes[size] + '</span>',
                hasIcon: false,
                fn: function () {
                    trumbowyg.execCmd('fontSize', index + 1, true);
                }
            });
            dropdown.push('fontsize_' + size);
        });

        var freeSizeButtonName = 'fontsize_custom',
            freeSizeBtnDef = {
                fn: function () {
                    trumbowyg.openModalInsert('Custom Font Size',
                        {
                            size: {
                                label: 'Font Size',
                                value: '48px'
                            }
                        },
                        function (values) {
                            var text = trumbowyg.range.startContainer.parentElement;
                            var selectedText = trumbowyg.getRangeText();
                            if ($(text).html() === selectedText) {
                                $(text).css('font-size', values.size);
                            } else {
                                trumbowyg.range.deleteContents();
                                var html = '<span style="font-size: ' + values.size + ';">' + selectedText + '</span>';
                                var node = $(html)[0];
                                trumbowyg.range.insertNode(node);
                            }
                            trumbowyg.saveRange();
                            return true;
                        }
                    );
                },
                text: '<span style="font-size: medium;">' + trumbowyg.lang.fontsizes.custom + '</span>',
                hasIcon: false
            };
        trumbowyg.addBtnDef(freeSizeButtonName, freeSizeBtnDef);
        dropdown.push(freeSizeButtonName);

        return dropdown;
    }
})(jQuery);

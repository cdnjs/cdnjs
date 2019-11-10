(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                lineheight: 'Line height',
                lineheights: {
                    '0.9':    'Small',
                    'normal': 'Regular',
                    '1.5':    'Large',
                    '2.0':    'Extra large'
                }
            },
            fr: {
                lineheight: 'Hauteur de ligne',
                lineheights: {
                    '0.9':    'Petit',
                    'normal': 'Regular',
                    '1.5':    'Grand',
                    '2.0':    'Très grand'
                }
            },
            nl: {
                lineheight: 'Regelhoogte',
                lineheights: {
                    '0.9':    'Klein',
                    'normal': 'Normaal',
                    '1.5':    'Groot',
                    '2.0':    'Extra groot'
                }
            },
            tr: {
                lineheight: 'Satır yüksekliği',
                lineheights: {
                    '0.9':    'Küçük',
                    'normal': 'Normal',
                    '1.5':    'Büyük',
                    '2.0':    'Çok Büyük'
                }
            }
        }
    });
    // jshint camelcase:true

    // Add dropdown with font sizes
    $.extend(true, $.trumbowyg, {
        plugins: {
            lineheight: {
                init: function (trumbowyg) {
                    trumbowyg.addBtnDef('lineheight', {
                        dropdown: buildDropdown(trumbowyg)
                    });
                }
            }
        }
    });

    // Build the dropdown
    function buildDropdown(trumbowyg) {
        var dropdown = [];
        var sizes = ['0.9', 'normal', '1.5', '2.0'];

        $.each(sizes, function(index, size) {
            trumbowyg.addBtnDef('lineheight_' + size, {
                text: '<span style="line-height: ' + size + ';">' + trumbowyg.lang.lineheights[size] + '</span>',
                hasIcon: false,
                fn: function(){
                    trumbowyg.saveRange();
                    var text = trumbowyg.getRangeText();
                    if (text.replace(/\s/g, '') !== '') {
                        try {
                            var parent = getSelectionParentElement();
                            $(parent).css('lineHeight', size);
                        } catch (e) {
                        }
                    }
                }
            });
            dropdown.push('lineheight_' + size);
        });

        return dropdown;
    }

    // Get the selection's parent
    function getSelectionParentElement() {
        var parentEl = null,
            selection;
        if (window.getSelection) {
            selection = window.getSelection();
            if (selection.rangeCount) {
                parentEl = selection.getRangeAt(0).commonAncestorContainer;
                if (parentEl.nodeType !== 1) {
                    parentEl = parentEl.parentNode;
                }
            }
        } else if ((selection = document.selection) && selection.type !== 'Control') {
            parentEl = selection.createRange().parentElement();
        }
        return parentEl;
    }
})(jQuery);

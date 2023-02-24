(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                lineheight: 'Line height',
                lineheights: {
                    '0.9': 'Small',
                    'normal': 'Regular',
                    '1.5': 'Large',
                    '2.0': 'Extra large'
                }
            },
            az: {
                lineheight: 'Sətir yüksəkliyi',
                lineheights: {
                    '0.9': 'Kiçik',
                    'normal': 'Normal',
                    '1.5': 'Böyük',
                    '2.0': 'Daha böyük'
                }
            },
            by: {
                lineheight: 'Міжрадковы інтэрвал',
                lineheights: {
                    '0.9': 'Маленькі',
                    'normal': 'Звычайны',
                    '1.5': 'Вялікі',
                    '2.0': 'Вельмі вялікі'
                }
            },
            da: {
                lineheight: 'Linjehøjde',
                lineheights: {
                    '0.9': 'Lille',
                    'normal': 'Normal',
                    '1.5': 'Stor',
                    '2.0': 'Ekstra stor'
                }
            },
            et: {
                lineheight: 'Reavahe',
                lineheights: {
                    '0.9': 'Väike',
                    'normal': 'Tavaline',
                    '1.5': 'Suur',
                    '2.0': 'Väga suur'
                }
            },
            fr: {
                lineheight: 'Hauteur de ligne',
                lineheights: {
                    '0.9': 'Petite',
                    'normal': 'Normale',
                    '1.5': 'Grande',
                    '2.0': 'Très grande'
                }
            },
            hu: {
                lineheight: 'Line height',
                lineheights: {
                    '0.9': 'Small',
                    'normal': 'Regular',
                    '1.5': 'Large',
                    '2.0': 'Extra large'
                }
            },
            it: {
                lineheight: 'Altezza linea',
                lineheights: {
                    '0.9': 'Bassa',
                    'normal': 'Normale',
                    '1.5': 'Alta',
                    '2.0': 'Molto alta'
                }
            },
            ko: {
                lineheight: '줄 간격',
                lineheights: {
                    '0.9': '좁게',
                    'normal': '보통',
                    '1.5': '넓게',
                    '2.0': '아주 넓게'
                }
            },
            nl: {
                lineheight: 'Regelhoogte',
                lineheights: {
                    '0.9': 'Klein',
                    'normal': 'Normaal',
                    '1.5': 'Groot',
                    '2.0': 'Extra groot'
                }
            },
            pt_br: {
                lineheight: 'Altura de linha',
                lineheights: {
                    '0.9': 'Pequena',
                    'normal': 'Regular',
                    '1.5': 'Grande',
                    '2.0': 'Extra grande'
                }
            },
            ru: {
                lineheight: 'Межстрочный интервал',
                lineheights: {
                    '0.9': 'Маленький',
                    'normal': 'Обычный',
                    '1.5': 'Большой',
                    '2.0': 'Очень большой'
                }
            },
            sl: {
                lineheight: 'Višina vrstice',
                lineheights: {
                    '0.9': 'Majhna',
                    'normal': 'Navadna',
                    '1.5': 'Velika',
                    '2.0': 'Ekstra velika'
                }
            },
            tr: {
                lineheight: 'Satır yüksekliği',
                lineheights: {
                    '0.9': 'Küçük',
                    'normal': 'Normal',
                    '1.5': 'Büyük',
                    '2.0': 'Çok Büyük'
                }
            },
            zh_tw: {
                lineheight: '文字間距',
                lineheights: {
                    '0.9': '小',
                    'normal': '正常',
                    '1.5': '大',
                    '2.0': '特大'
                }
            },
        }
    });
    // jshint camelcase:true

    var defaultOptions = {
        sizeList: [
            '0.9',
            'normal',
            '1.5',
            '2.0'
        ]
    };

    // Add dropdown with font sizes
    $.extend(true, $.trumbowyg, {
        plugins: {
            lineheight: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.lineheight = $.extend({},
                      defaultOptions,
                      trumbowyg.o.plugins.lineheight || {}
                    );

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

        $.each(trumbowyg.o.plugins.lineheight.sizeList, function(index, size) {
            trumbowyg.addBtnDef('lineheight_' + size, {
                text: trumbowyg.lang.lineheights[size] || size,
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

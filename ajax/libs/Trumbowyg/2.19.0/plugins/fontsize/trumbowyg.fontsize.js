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
                },
                fontCustomSize: {
                    title: 'Custom Font Size',
                    label: 'Font Size',
                    value: '48px'
                }
            },
            es: {
                fontsize: 'Tamaño de Fuente',
                fontsizes: {
                    'x-small': 'Extra pequeña',
                    'small': 'Pegueña',
                    'medium': 'Regular',
                    'large': 'Grande',
                    'x-large': 'Extra Grande',
                    'custom': 'Customizada'
                },
                fontCustomSize: {
                    title: 'Tamaño de Fuente Customizada',
                    label: 'Tamaño de Fuente',
                    value: '48px'
                }
            },
            da: {
                fontsize: 'Skriftstørrelse',
                fontsizes: {
                    'x-small': 'Ekstra lille',
                    'small': 'Lille',
                    'medium': 'Normal',
                    'large': 'Stor',
                    'x-large': 'Ekstra stor',
                    'custom': 'Brugerdefineret'
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
                    'custom': 'Taille personnalisée'
                },
                fontCustomSize: {
                    title: 'Taille de police personnalisée',
                    label: 'Taille de la police',
                    value: '48px'
                }
            },
            de: {
                fontsize: 'Schriftgröße',
                fontsizes: {
                    'x-small': 'Sehr klein',
                    'small': 'Klein',
                    'medium': 'Normal',
                    'large': 'Groß',
                    'x-large': 'Sehr groß',
                    'custom': 'Benutzerdefiniert'
                },
                fontCustomSize: {
                    title: 'Benutzerdefinierte Schriftgröße',
                    label: 'Schriftgröße',
                    value: '48px'
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
            },
            zh_tw: {
                fontsize: '字體大小',
                fontsizes: {
                    'x-small': '最小',
                    'small': '小',
                    'medium': '中',
                    'large': '大',
                    'x-large': '最大',
                    'custom': '自訂大小',
                },
                fontCustomSize: {
                    title: '自訂義字體大小',
                    label: '字體大小',
                    value: '48px'
                }
            },
            pt_br: {
                fontsize: 'Tamanho da fonte',
                fontsizes: {
                    'x-small': 'Extra pequeno',
                    'small': 'Pequeno',
                    'regular': 'Médio',
                    'large': 'Grande',
                    'x-large': 'Extra grande',
                    'custom': 'Personalizado'
                },
                fontCustomSize: {
                    title: 'Tamanho de Fonte Personalizado',
                    label: 'Tamanho de Fonte',
                    value: '48px'
                }
            },
            it: {
                fontsize: 'Dimensioni del testo',
                fontsizes: {
                    'x-small': 'Molto piccolo',
                    'small': 'piccolo',
                    'regular': 'normale',
                    'large': 'grande',
                    'x-large': 'Molto grande',
                    'custom': 'Personalizzato'
                },
                fontCustomSize: {
                    title: 'Dimensioni del testo personalizzato',
                    label: 'Dimensioni del testo',
                    value: '48px'
                }
            },
            ko: {
                fontsize: '글꼴 크기',
                fontsizes: {
                    'x-small': '아주 작게',
                    'small': '작게',
                    'medium': '보통',
                    'large': '크게',
                    'x-large': '아주 크게',
                    'custom': '사용자 지정'
                },
                fontCustomSize: {
                    title: '사용자 지정 글꼴 크기',
                    label: '글꼴 크기',
                    value: '48px'
                }
            },
        }
    });
    // jshint camelcase:true

    var defaultOptions = {
        sizeList: [
            'x-small',
            'small',
            'medium',
            'large',
            'x-large'
        ],
        allowCustomSize: true
    };

    // Add dropdown with font sizes
    $.extend(true, $.trumbowyg, {
        plugins: {
            fontsize: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.fontsize = $.extend({},
                      defaultOptions,
                      trumbowyg.o.plugins.fontsize || {}
                    );

                    trumbowyg.addBtnDef('fontsize', {
                        dropdown: buildDropdown(trumbowyg)
                    });
                }
            }
        }
    });

    function buildDropdown(trumbowyg) {
        var dropdown = [];

        $.each(trumbowyg.o.plugins.fontsize.sizeList, function (index, size) {
            trumbowyg.addBtnDef('fontsize_' + size, {
                text: '<span style="font-size: ' + size + ';">' + (trumbowyg.lang.fontsizes[size] || size) + '</span>',
                hasIcon: false,
                fn: function () {
                    trumbowyg.execCmd('fontSize', index + 1, true);
                }
            });
            dropdown.push('fontsize_' + size);
        });

        if (trumbowyg.o.plugins.fontsize.allowCustomSize) {
            var customSizeButtonName = 'fontsize_custom';
            var customSizeBtnDef = {
                fn: function () {
                    trumbowyg.openModalInsert(trumbowyg.lang.fontCustomSize.title,
                        {
                            size: {
                                label: trumbowyg.lang.fontCustomSize.label,
                                value: trumbowyg.lang.fontCustomSize.value
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
            trumbowyg.addBtnDef(customSizeButtonName, customSizeBtnDef);
            dropdown.push(customSizeButtonName);
        }

        return dropdown;
    }
})(jQuery);

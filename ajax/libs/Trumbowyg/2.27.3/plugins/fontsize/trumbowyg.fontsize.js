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
            az: {
                fontsize: 'Şrift həcmi',
                fontsizes: {
                    'x-small': 'Daha kiçik',
                    'small': 'Kiçik',
                    'medium': 'Normal',
                    'large': 'Böyük',
                    'x-large': 'Daha böyük',
                    'custom': 'Fərdi həcm'
                },
                fontCustomSize: {
                    title: 'Fərdi şrift həcmi',
                    label: 'Şrift həcmi',
                    value: '48px'
                }
            },
            by: {
                fontsize: 'Памер шрыфта',
                fontsizes: {
                    'x-small': 'Вельмі маленькі',
                    'small': 'Маленькі',
                    'medium': 'Звычайны',
                    'large': 'Вялікі',
                    'x-large': 'Вельмі вялікі',
                    'custom': 'Карыстальніцкі'
                },
                fontCustomSize: {
                    title: 'Карыстальніцкі Памер Шрыфта',
                    label: 'Памер Шрыфта',
                    value: '48px'
                }
            },
            ca: {
                fontsize: 'Mida de la lletra',
                fontsizes: {
                    'x-small': 'Molt petita',
                    'small': 'Petita',
                    'medium': 'Normal',
                    'large': 'Gran',
                    'x-large': 'Molt Gran',
                    'custom': 'Personalitzada'
                },
                fontCustomSize: {
                    title: 'Mida de lletra personalitzada',
                    label: 'Mida de lletra',
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
            et: {
                fontsize: 'Teksti suurus',
                fontsizes: {
                    'x-small': 'Väga väike',
                    'small': 'Väike',
                    'medium': 'Tavaline',
                    'large': 'Suur',
                    'x-large': 'Väga suur',
                    'custom': 'Määra ise'
                },
                fontCustomSize: {
                    title: 'Kohandatud teksti suurus',
                    label: 'Teksti suurus',
                    value: '48px'
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
            hu: {
                fontsize: 'Betű méret',
                fontsizes: {
                    'x-small': 'Extra kicsi',
                    'small': 'Kicsi',
                    'medium': 'Normális',
                    'large': 'Nagy',
                    'x-large': 'Extra nagy',
                    'custom': 'Egyedi'
                },
                fontCustomSize: {
                    title: 'Egyedi betű méret',
                    label: 'Betű méret',
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
            nl: {
                fontsize: 'Lettergrootte',
                fontsizes: {
                    'x-small': 'Extra klein',
                    'small': 'Klein',
                    'medium': 'Normaal',
                    'large': 'Groot',
                    'x-large': 'Extra groot',
                    'custom': 'Handmatig'
                },
                fontCustomSize: {
                    title: 'Handmatige lettergrootte',
                    label: 'Lettergrootte',
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
            ru: {
                fontsize: 'Размер шрифта',
                fontsizes: {
                    'x-small': 'Очень маленький',
                    'small': 'Маленький',
                    'medium': 'Обычный',
                    'large': 'Большой',
                    'x-large': 'Очень большой',
                    'custom': 'Пользовательский'
                },
                fontCustomSize: {
                    title: 'Пользовательский Размер Шрифта',
                    label: 'Размер Шрифта',
                    value: '48px'
                }
            },
            sl: {
                fontsize: 'Velikost pisave',
                fontsizes: {
                    'x-small': 'Ekstra majhna',
                    'small': 'Majhna',
                    'medium': 'Navadno',
                    'large': 'Velika',
                    'x-large': 'Ekstra velika',
                    'custom': 'Poljubna'
                },
                fontCustomSize: {
                    title: 'Poljubna velikost pisave',
                    label: 'Velikost pisave',
                    value: '48px'
                }
            },
            tr: {
                fontsize: 'Yazı boyutu',
                fontsizes: {
                    'x-small': 'Çok küçük',
                    'small': 'Küçük',
                    'medium': 'Normal',
                    'large': 'Büyük',
                    'x-large': 'Çok büyük',
                    'custom': 'Özel'
                },
                fontCustomSize: {
                    title: 'Özel Yazı Boyutu',
                    label: 'Yazı Boyutu',
                    value: '48px'
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

    function setFontSize(trumbowyg, size) {
        trumbowyg.$ed.focus();
        trumbowyg.saveRange();

        // Temporary size
        trumbowyg.execCmd('fontSize', '1');

        var fontElements = trumbowyg.$ed.find('font[size="1"]');

        // Remove previous font-size span tags. Needed to prevent Firefox from
        // nesting multiple spans on font-size changes.
        // (see https://github.com/Alex-D/Trumbowyg/issues/1252)
        fontElements.find('span[style*="font-size"]').contents().unwrap();

        // Find <font> elements that were added and change to <span> with chosen size
        fontElements.replaceWith(function() {
            return $('<span/>', {
                css: { 'font-size': size },
                html: this.innerHTML,
            });
        });

        // Remove and leftover <span> elements
        $(trumbowyg.range.startContainer.parentElement).find('span[style=""]').contents().unwrap();

        trumbowyg.restoreRange();
        trumbowyg.syncCode();
        trumbowyg.$c.trigger('tbwchange');
    }

    function buildDropdown(trumbowyg) {
        var dropdown = [];

        $.each(trumbowyg.o.plugins.fontsize.sizeList, function (index, size) {
            trumbowyg.addBtnDef('fontsize_' + size, {
                text: '<span style="font-size: ' + size + ';">' + (trumbowyg.lang.fontsizes[size] || size) + '</span>',
                hasIcon: false,
                fn: function () {
                    setFontSize(trumbowyg, size);
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
                        function (form) {
                            setFontSize(trumbowyg, form.size);
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

/* ===========================================================
 * trumbowyg.colors.js v1.2
 * Colors picker plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Alexandre Demode (Alex-D)
 *          Twitter : @AlexandreDemode
 *          Website : alex-d.fr
 */

(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                foreColor: 'Text color',
                backColor: 'Background color',
                foreColorRemove: 'Remove text color',
                backColorRemove: 'Remove background color'
            },
            by: {
                foreColor: 'Колер тэксту',
                backColor: 'Колер фону тэксту',
                foreColorRemove: 'Выдаліць колер тэксту',
                backColorRemove: 'Выдаліць колер фону тэксту'
            },
            cs: {
                foreColor: 'Barva textu',
                backColor: 'Barva pozadí'
            },
            da: {
                foreColor: 'Tekstfarve',
                backColor: 'Baggrundsfarve'
            },
            de: {
                foreColor: 'Textfarbe',
                backColor: 'Hintergrundfarbe'
            },
            et: {
                foreColor: 'Teksti värv',
                backColor: 'Taustavärv',
                foreColorRemove: 'Eemalda teksti värv',
                backColorRemove: 'Eemalda taustavärv'
            },
            fr: {
                foreColor: 'Couleur du texte',
                backColor: 'Couleur de fond',
                foreColorRemove: 'Supprimer la couleur du texte',
                backColorRemove: 'Supprimer la couleur de fond'
            },
            hu: {
                foreColor: 'Betű szín',
                backColor: 'Háttér szín',
                foreColorRemove: 'Betű szín eltávolítása',
                backColorRemove: 'Háttér szín eltávolítása'
            },
            ja: {
                foreColor: '文字色',
                backColor: '背景色'
            },
            ko: {
                foreColor: '글자색',
                backColor: '배경색',
                foreColorRemove: '글자색 지우기',
                backColorRemove: '배경색 지우기'
            },
            nl: {
                foreColor: 'Tekstkleur',
                backColor: 'Achtergrondkleur'
            },
            pt_br: {
                foreColor: 'Cor de fonte',
                backColor: 'Cor de fundo'
            },
            ru: {
                foreColor: 'Цвет текста',
                backColor: 'Цвет выделения текста',
                foreColorRemove: 'Очистить цвет текста',
                backColorRemove: 'Очистить цвет выделения текста'
            },
            sk: {
                foreColor: 'Farba textu',
                backColor: 'Farba pozadia'
            },
            tr: {
                foreColor: 'Yazı rengi',
                backColor: 'Arka plan rengi',
                foreColorRemove: 'Yazı rengini kaldır',
                backColorRemove: 'Arka plan rengini kaldır'
            },
            zh_cn: {
                foreColor: '文字颜色',
                backColor: '背景颜色'
            },
            zh_tw: {
                foreColor: '文字顏色',
                backColor: '背景顏色'
            },
        }
    });

    // jshint camelcase:true


    function hex(x) {
        return ('0' + parseInt(x).toString(16)).slice(-2);
    }

    function colorToHex(rgb) {
        if (rgb.search('rgb') === -1) {
            return rgb.replace('#', '');
        } else if (rgb === 'rgba(0, 0, 0, 0)') {
            return 'transparent';
        } else {
            rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d?(.\d+)))?\)$/);
            if (rgb == null) {
                return 'transparent'; // No match, return transparent as unkown color
            }
            return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }
    }

    function colorTagHandler(element, trumbowyg) {
        var tags = [];

        if (!element.style) {
            return tags;
        }

        // background color
        if (element.style.backgroundColor !== '') {
            var backColor = colorToHex(element.style.backgroundColor);
            if (trumbowyg.o.plugins.colors.colorList.indexOf(backColor) >= 0) {
                tags.push('backColor' + backColor);
            } else {
                tags.push('backColorFree');
            }
        }

        // text color
        var foreColor;
        if (element.style.color !== '') {
            foreColor = colorToHex(element.style.color);
        } else if (element.hasAttribute('color')) {
            foreColor = colorToHex(element.getAttribute('color'));
        }
        if (foreColor) {
            if (trumbowyg.o.plugins.colors.colorList.indexOf(foreColor) >= 0) {
                tags.push('foreColor' + foreColor);
            } else {
                tags.push('foreColorFree');
            }
        }

        return tags;
    }

    var defaultOptions = {
        colorList: [
            'ffffff', '000000', 'eeece1', '1f497d', '4f81bd', 'c0504d', '9bbb59', '8064a2', '4bacc6', 'f79646', 'ffff00',
            'f2f2f2', '7f7f7f', 'ddd9c3', 'c6d9f0', 'dbe5f1', 'f2dcdb', 'ebf1dd', 'e5e0ec', 'dbeef3', 'fdeada', 'fff2ca',
            'd8d8d8', '595959', 'c4bd97', '8db3e2', 'b8cce4', 'e5b9b7', 'd7e3bc', 'ccc1d9', 'b7dde8', 'fbd5b5', 'ffe694',
            'bfbfbf', '3f3f3f', '938953', '548dd4', '95b3d7', 'd99694', 'c3d69b', 'b2a2c7', 'b7dde8', 'fac08f', 'f2c314',
            'a5a5a5', '262626', '494429', '17365d', '366092', '953734', '76923c', '5f497a', '92cddc', 'e36c09', 'c09100',
            '7f7f7f', '0c0c0c', '1d1b10', '0f243e', '244061', '632423', '4f6128', '3f3151', '31859b', '974806', '7f6000'
        ],
        foreColorList: null, // fallbacks on colorList
        backColorList: null, // fallbacks on colorList
        allowCustomForeColor: true,
        allowCustomBackColor: true,
        displayAsList: false,
    };

    // Add all colors in two dropdowns
    $.extend(true, $.trumbowyg, {
        plugins: {
            color: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.colors = trumbowyg.o.plugins.colors || defaultOptions;
                    var dropdownClass = trumbowyg.o.plugins.colors.displayAsList ? trumbowyg.o.prefix + 'dropdown--color-list' : '';

                    var foreColorBtnDef = {
                        dropdown: buildDropdown('foreColor', trumbowyg),
                        dropdownClass: dropdownClass,
                    },
                    backColorBtnDef = {
                        dropdown: buildDropdown('backColor', trumbowyg),
                        dropdownClass: dropdownClass,
                    };

                    trumbowyg.addBtnDef('foreColor', foreColorBtnDef);
                    trumbowyg.addBtnDef('backColor', backColorBtnDef);
                },
                tagHandler: colorTagHandler
            }
        }
    });

    function buildDropdown(fn, trumbowyg) {
        var dropdown = [],
            trumbowygColorOptions = trumbowyg.o.plugins.colors,
            colorList = trumbowygColorOptions[fn + 'List'] || trumbowygColorOptions.colorList;

        $.each(colorList, function (i, color) {
            var btn = fn + color,
                btnDef = {
                    fn: fn,
                    forceCss: true,
                    hasIcon: false,
                    text: trumbowyg.lang['#' + color] || ('#' + color),
                    param: '#' + color,
                    style: 'background-color: #' + color + ';'
                };

            if (trumbowygColorOptions.displayAsList && fn === 'foreColor') {
                btnDef.style = 'color: #' + color + ' !important;';
            }

            trumbowyg.addBtnDef(btn, btnDef);
            dropdown.push(btn);
        });

        // Remove color
        var removeColorButtonName = fn + 'Remove',
            removeColorBtnDef = {
                fn: 'removeFormat',
                hasIcon: false,
                param: fn,
                style: 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAG0lEQVQIW2NkQAAfEJMRmwBYhoGBYQtMBYoAADziAp0jtJTgAAAAAElFTkSuQmCC);'
            };

        if (trumbowygColorOptions.displayAsList) {
            removeColorBtnDef.style = '';
        }

        trumbowyg.addBtnDef(removeColorButtonName, removeColorBtnDef);
        dropdown.push(removeColorButtonName);

        // Custom color
        if (trumbowygColorOptions['allowCustom' + fn.charAt(0).toUpperCase() + fn.substr(1)]) {
            // add free color btn
            var freeColorButtonName = fn + 'Free',
                freeColorBtnDef = {
                    fn: function () {
                        trumbowyg.openModalInsert(trumbowyg.lang[fn],
                            {
                                color: {
                                    label: fn,
                                    forceCss: true,
                                    type: 'color',
                                    value: '#FFFFFF'
                                }
                            },
                            // callback
                            function (values) {
                                trumbowyg.execCmd(fn, values.color);
                                return true;
                            }
                        );
                    },
                    hasIcon: false,
                    text: '#',
                    // style adjust for displaying the text
                    style: 'text-indent: 0; line-height: 20px; padding: 0 5px;'
                };

            trumbowyg.addBtnDef(freeColorButtonName, freeColorBtnDef);
            dropdown.push(freeColorButtonName);
        }

        return dropdown;
    }
})(jQuery);

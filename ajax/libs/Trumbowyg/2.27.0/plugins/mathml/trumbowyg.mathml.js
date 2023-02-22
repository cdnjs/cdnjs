/* ===========================================================
 * trumbowyg.mathMl.js v1.0
 * MathML plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : loclamor
 */

/* globals MathJax */
(function ($) {
    'use strict';
    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                mathml: 'Insert Formulas',
                formulas: 'Formulas',
                inline: 'Inline'
            },
            az: {
                mathml: 'Düstur əlavə et',
                formulas: 'Düsturlar',
                inline: 'Sətir içi'
            },
            sl: {
                mathml: 'Vstavi matematični izraz',
                formulas: 'Formula',
                inline: 'V vrstici'
            },
            by: {
                mathml: 'Уставіць формулу',
                formulas: 'Формула',
                inline: 'Inline-элемент'
            },
            da: {
                mathml: 'Indsæt formler',
                formulas: 'Formler',
                inline: 'Inline'
            },
            et: {
                mathml: 'Sisesta valem',
                formulas: 'Valemid',
                inline: 'Teksti sees'
            },
            fr: {
                mathml: 'Inserer une formule',
                formulas: 'Formule',
                inline: 'En ligne'
            },
            hu: {
                mathml: 'Formulák beszúrás',
                formulas: 'Formulák',
                inline: 'Inline'
            },
            ko: {
                mathml: '수식 넣기',
                formulas: '수식',
                inline: '글 안에 넣기'
            },
            pt_br: {
                mathml: 'Inserir fórmulas',
                formulas: 'Fórmulas',
                inline: 'Em linha'
            },
            ru: {
                mathml: 'Вставить формулу',
                formulas: 'Формула',
                inline: 'Строчный элемент'
            },
            tr: {
                mathml: 'Formül Ekle',
                formulas: 'Formüller',
                inline: 'Satır içi'
            },
            zh_tw: {
                mathml: '插入方程式',
                formulas: '方程式',
                inline: '內嵌'
            },
        },
        // jshint camelcase:true

        plugins: {
            mathml: {
                init: function (trumbowyg) {
                    var mathMlOptions = {
                        formulas: {
                            label: trumbowyg.lang.formulas,
                            required: true,
                            value: ''
                        },
                        inline: {
                            label: trumbowyg.lang.inline,
                            attributes: {
                                checked: true
                            },
                            type: 'checkbox',
                            required: false,
                        }
                    };

                    var mathmlCallback = function (v) {
                        var delimiter = v.inline ? '$' : '$$';
                        if (trumbowyg.currentMathNode) {
                            $(trumbowyg.currentMathNode)
                                .html(delimiter + ' ' + v.formulas + ' ' + delimiter)
                                .attr('formulas', v.formulas)
                                .attr('inline', (v.inline ? 'true' : 'false'));
                        } else {
                            var html = '<span contenteditable="false" formulas="' + v.formulas + '" inline="' + (v.inline ? 'true' : 'false') + '" >' + delimiter + ' ' + v.formulas + ' ' + delimiter + '</span>';
                            var node = $(html)[0];
                            node.onclick = openModal;

                            trumbowyg.range.deleteContents();
                            trumbowyg.range.insertNode(node);
                        }

                        trumbowyg.currentMathNode = false;
                        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
                        return true;
                    };

                    var openModal = function () {
                        trumbowyg.currentMathNode = this;
                        mathMlOptions.formulas.value = $(this).attr('formulas');

                        if ($(this).attr('inline') === 'true') {
                            mathMlOptions.inline.attributes.checked = true;
                        } else {
                            delete mathMlOptions.inline.attributes.checked;
                        }

                        trumbowyg.openModalInsert(trumbowyg.lang.mathml, mathMlOptions, mathmlCallback);
                    };

                    var btnDef = {
                        fn: function () {
                            trumbowyg.saveRange();

                            mathMlOptions.formulas.value = trumbowyg.getRangeText();
                            mathMlOptions.inline.attributes.checked = true;
                            trumbowyg.openModalInsert(trumbowyg.lang.mathml, mathMlOptions, mathmlCallback);
                        }
                    };

                    trumbowyg.$ta.on('tbwinit', function () {
                        var nodes = trumbowyg.$ed.find('[formulas]');

                        nodes.each(function (i, elem) {
                            elem.onclick = openModal;
                        });
                    });

                    trumbowyg.addBtnDef('mathml', btnDef);
                }
            }
        }
    });
})(jQuery);

/* ===========================================================
 * trumbowyg.noembed.js v1.0
 * noEmbed plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Jake Johns (jakejohns)
 */

(function ($) {
    'use strict';

    var defaultOptions = {
        proxy: 'https://noembed.com/embed?nowrap=on',
        urlFiled: 'url',
        data: [],
        success: undefined,
        error: undefined
    };

    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                noembed: 'Noembed',
                noembedError: 'Error'
            },
            sk: {
                noembedError: 'Chyba'
            },
            fr: {
                noembedError: 'Erreur'
            },
            cs: {
                noembedError: 'Chyba'
            },
            ru: {
                noembedError: 'Ошибка'
            },
            ja: {
                noembedError: 'エラー'
            }
        },

        plugins: {
            noembed: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.noembed = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.noembed || {});

                    var btnDef = {
                        fn: function () {
                            var $modal = trumbowyg.openModalInsert(
                                // Title
                                trumbowyg.lang.noembed,

                                // Fields
                                {
                                    url: {
                                        label: 'URL',
                                        required: true
                                    }
                                },

                                // Callback
                                function (data) {
                                    $.ajax({
                                        url: trumbowyg.o.plugins.noembed.proxy,
                                        type: 'GET',
                                        data: data,
                                        cache: false,
                                        dataType: 'json',

                                        success: trumbowyg.o.plugins.noembed.success || function (data) {
                                            if (data.html) {
                                                trumbowyg.execCmd('insertHTML', data.html);
                                                setTimeout(function () {
                                                    trumbowyg.closeModal();
                                                }, 250);
                                            } else {
                                                trumbowyg.addErrorOnModalField(
                                                    $('input[type=text]', $modal),
                                                    data.error
                                                );
                                            }
                                        },
                                        error: trumbowyg.o.plugins.noembed.error || function () {
                                            trumbowyg.addErrorOnModalField(
                                                $('input[type=text]', $modal),
                                                trumbowyg.lang.noembedError
                                            );
                                        }
                                    });
                                }
                            );
                        }
                    };

                    trumbowyg.addBtnDef('noembed', btnDef);
                }
            }
        }
    });
})(jQuery);

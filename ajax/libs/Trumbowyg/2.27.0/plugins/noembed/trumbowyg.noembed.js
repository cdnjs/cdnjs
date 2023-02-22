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
            // jshint camelcase:false
            en: {
                noembed: 'Noembed',
                noembedError: 'Error'
            },
            az: {
                noembed: 'Noembed',
                noembedError: 'Xəta'
            },
            sl: {
                noembed: 'Noembed',
                noembedError: 'Napaka'
            },
            by: {
                noembedError: 'Памылка'
            },
            cs: {
                noembedError: 'Chyba'
            },
            da: {
                noembedError: 'Fejl'
            },
            et: {
                noembed: 'Noembed',
                noembedError: 'Viga'
            },
            fr: {
                noembedError: 'Erreur'
            },
            hu: {
                noembed: 'Noembed',
                noembedError: 'Hiba'
            },
            ja: {
                noembedError: 'エラー'
            },
            ko: {
                noembed: 'oEmbed 넣기',
                noembedError: '에러'
            },
            pt_br: {
                noembed: 'Incorporar',
                noembedError: 'Erro'
            },
            ru: {
                noembedError: 'Ошибка'
            },
            sk: {
                noembedError: 'Chyba'
            },
            tr: {
                noembedError: 'Hata'
            },
            zh_tw: {
                noembed: '插入影片',
                noembedError: '錯誤'
            },
            // jshint camelcase:true
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

                                        success: function (data) {
                                            if (trumbowyg.o.plugins.noembed.success) {
                                                trumbowyg.o.plugins.noembed.success(data, trumbowyg, $modal);
                                                return;
                                            }

                                            if (!data.html) {
                                                trumbowyg.addErrorOnModalField(
                                                    $('input[type=text]', $modal),
                                                    data.error
                                                );
                                                return;
                                            }

                                            trumbowyg.execCmd('insertHTML', data.html);
                                            setTimeout(function () {
                                                trumbowyg.closeModal();
                                            }, 250);
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

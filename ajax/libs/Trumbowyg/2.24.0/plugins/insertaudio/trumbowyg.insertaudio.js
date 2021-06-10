/*/* ===========================================================
 * trumbowyg.insertaudio.js v1.0
 * InsertAudio plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Adam Hess (AdamHess)
 */

(function ($) {
    'use strict';

    var insertAudioOptions = {
        src: {
            label: 'URL',
            required: true
        },
        autoplay: {
            label: 'AutoPlay',
            required: false,
            type: 'checkbox'
        },
        muted: {
            label: 'Muted',
            required: false,
            type: 'checkbox'
        },
        preload: {
            label: 'preload options',
            required: false
        }
    };


    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                insertAudio: 'Insert Audio'
            },
            da: {
                insertAudio: 'Indsæt lyd'
            },
            et: {
                insertAudio: 'Lisa helifail'
            },
            fr: {
                insertAudio: 'Insérer un son'
            },
            hu: {
                insertAudio: 'Audio beszúrás'
            },
            ja: {
                insertAudio: '音声の挿入'
            },
            ko: {
                insertAudio: '소리 넣기'
            },
            pt_br: {
                insertAudio: 'Inserir áudio'
            },
            ru: {
                insertAudio: 'Вставить аудио'
            },
            tr: {
                insertAudio: 'Ses Ekle'
            },
            // jshint camelcase:true
        },
        plugins: {
            insertAudio: {
                init: function (trumbowyg) {
                    var btnDef = {
                        fn: function () {
                            var insertAudioCallback = function (v) {
                                // controls should always be show otherwise the audio will
                                // be invisible defeating the point of a wysiwyg
                                var html = '<audio controls';
                                if (v.src) {
                                    html += ' src=\'' + v.src + '\'';
                                }
                                if (v.autoplay) {
                                    html += ' autoplay';
                                }
                                if (v.muted) {
                                    html += ' muted';
                                }
                                if (v.preload) {
                                    html += ' preload=\'' + v + '\'';
                                }
                                html += '></audio>';
                                var node = $(html)[0];
                                trumbowyg.range.deleteContents();
                                trumbowyg.range.insertNode(node);
                                return true;
                            };

                            trumbowyg.openModalInsert(trumbowyg.lang.insertAudio, insertAudioOptions, insertAudioCallback);
                        }
                    };

                    trumbowyg.addBtnDef('insertAudio', btnDef);
                }
            }
        }
    });
})(jQuery);

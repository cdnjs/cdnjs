/* ===========================================================
 * trumbowyg.base64.js v1.0
 * Base64 plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Cyril Biencourt (lizardK)
 */

(function ($) {
    'use strict';

    var isSupported = function () {
        return typeof FileReader !== 'undefined';
    };

    var isValidImage = function (type) {
        return /^data:image\/[a-z]?/i.test(type);
    };

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                base64: 'Image as base64',
                file: 'File',
                errFileReaderNotSupported: 'FileReader is not supported by your browser.',
                errInvalidImage: 'Invalid image file.'
            },
            fr: {
                base64: 'Image en base64',
                file: 'Fichier'
            },
            cs: {
                base64: 'Vložit obrázek',
                file: 'Soubor'
            },
            zh_cn: {
                base64: '图片（Base64编码）',
                file: '文件'
            },
            nl: {
                errFileReaderNotSupported: 'Uw browser ondersteunt deze functionaliteit niet.',
                errInvalidImage: 'De gekozen afbeelding is ongeldig.'
            },
            ja: {
                base64: '画像 (Base64形式)',
                file: 'ファイル',
                errFileReaderNotSupported: 'あなたのブラウザーはFileReaderをサポートしていません',
                errInvalidImage: '画像形式が正しくありません'
            }
        },
        // jshint camelcase:true

        plugins: {
            base64: {
                shouldInit: isSupported,
                init: function (trumbowyg) {
                    var btnDef = {
                        isSupported: isSupported,
                        fn: function () {
                            trumbowyg.saveRange();

                            var file;
                            var $modal = trumbowyg.openModalInsert(
                                // Title
                                trumbowyg.lang.base64,

                                // Fields
                                {
                                    file: {
                                        type: 'file',
                                        required: true,
                                        attributes: {
                                            accept: 'image/*'
                                        }
                                    },
                                    alt: {
                                        label: 'description',
                                        value: trumbowyg.getRangeText()
                                    }
                                },

                                // Callback
                                function (values) {
                                    var fReader = new FileReader();

                                    fReader.onloadend = function (e) {
                                        if (isValidImage(e.target.result)) {
                                            trumbowyg.execCmd('insertImage', fReader.result);
                                            $(['img[src="', fReader.result, '"]:not([alt])'].join(''), trumbowyg.$box).attr('alt', values.alt);
                                            trumbowyg.closeModal();
                                        } else {
                                            trumbowyg.addErrorOnModalField(
                                                $('input[type=file]', $modal),
                                                trumbowyg.lang.errInvalidImage
                                            );
                                        }
                                    };

                                    fReader.readAsDataURL(file);
                                }
                            );

                            $('input[type=file]').on('change', function (e) {
                                file = e.target.files[0];
                            });
                        }
                    };

                    trumbowyg.addBtnDef('base64', btnDef);
                }
            }
        }
    });
})(jQuery);

/* ===========================================================
 * trumbowyg.upload.js v1.2
 * Upload plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Alexandre Demode (Alex-D)
 *          Twitter : @AlexandreDemode
 *          Website : alex-d.fr
 * Mod by : Aleksandr-ru
 *          Twitter : @Aleksandr_ru
 *          Website : aleksandr.ru
 */

(function ($) {
    'use strict';

    var defaultOptions = {
        serverPath: '',
        fileFieldName: 'fileToUpload',
        data: [],                       // Additional data for ajax [{name: 'key', value: 'value'}]
        headers: {},                    // Additional headers
        xhrFields: {},                  // Additional fields
        urlPropertyName: 'file',        // How to get url from the json response (for instance 'url' for {url: ....})
        statusPropertyName: 'success',  // How to get status from the json response
        success: undefined,             // Success callback: function (data, trumbowyg, $modal, values) {}
        error: undefined,               // Error callback: function () {}
        imageWidthModalEdit: false      // Add ability to edit image width
    };

    function getDeep(object, propertyParts) {
        var mainProperty = propertyParts.shift(),
            otherProperties = propertyParts;

        if (object !== null) {
            if (otherProperties.length === 0) {
                return object[mainProperty];
            }

            if (typeof object === 'object') {
                return getDeep(object[mainProperty], otherProperties);
            }
        }
        return object;
    }

    addXhrProgressEvent();

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                upload: 'Upload',
                file: 'File',
                uploadError: 'Error'
            },
            az: {
                upload: 'Yüklə',
                file: 'Fayl',
                uploadError: 'Xəta'
            },
            by: {
                upload: 'Загрузка',
                file: 'Файл',
                uploadError: 'Памылка'
            },
            ca: {
                upload: 'Pujar fitxer',
                file: 'Fitxer',
                uploadError: 'Error'
            },
            cs: {
                upload: 'Nahrát obrázek',
                file: 'Soubor',
                uploadError: 'Chyba'
            },
            da: {
                upload: 'Upload',
                file: 'Fil',
                uploadError: 'Fejl'
            },
            de: {
                upload: 'Hochladen',
                file: 'Datei',
                uploadError: 'Fehler'
            },
            es: {
                upload: 'Subir archivo',
                file: 'Archivo',
                uploadError: 'Error'
            },
            et: {
                upload: 'Lae üles',
                file: 'Fail',
                uploadError: 'Viga'
            },
            fr: {
                upload: 'Envoi',
                file: 'Fichier',
                uploadError: 'Erreur'
            },
            hu: {
                upload: 'Feltöltés',
                file: 'Fájl',
                uploadError: 'Hiba'
            },
            ja: {
                upload: 'アップロード',
                file: 'ファイル',
                uploadError: 'エラー'
            },
            ko: {
                upload: '그림 올리기',
                file: '파일',
                uploadError: '에러'
            },
            pt_br: {
                upload: 'Enviar do local',
                file: 'Arquivo',
                uploadError: 'Erro'
            },
            ru: {
                upload: 'Загрузка',
                file: 'Файл',
                uploadError: 'Ошибка'
            },
            sl: {
                upload: 'Naloži datoteko',
                file: 'Datoteka',
                uploadError: 'Napaka'
            },
            sk: {
                upload: 'Nahrať',
                file: 'Súbor',
                uploadError: 'Chyba'
            },
            tr: {
                upload: 'Yükle',
                file: 'Dosya',
                uploadError: 'Hata'
            },
            zh_cn: {
                upload: '上传',
                file: '文件',
                uploadError: '错误'
            },
            zh_tw: {
                upload: '上傳',
                file: '文件',
                uploadError: '錯誤'
            },
        },
        // jshint camelcase:true

        plugins: {
            upload: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.upload = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.upload || {});
                    var btnDef = {
                        fn: function () {
                            trumbowyg.saveRange();

                            var file,
                                prefix = trumbowyg.o.prefix;

                            var fields = {
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
                            };

                            if (trumbowyg.o.plugins.upload.imageWidthModalEdit) {
                                fields.width = {
                                    value: ''
                                };
                            }

                            // Prevent multiple submissions while uploading
                            var isUploading = false;

                            var $modal = trumbowyg.openModalInsert(
                                // Title
                                trumbowyg.lang.upload,

                                // Fields
                                fields,

                                // Callback
                                function (values) {
                                    if (isUploading) {
                                        return;
                                    }
                                    isUploading = true;

                                    var data = new FormData();
                                    data.append(trumbowyg.o.plugins.upload.fileFieldName, file);

                                    trumbowyg.o.plugins.upload.data.map(function (cur) {
                                        data.append(cur.name, cur.value);
                                    });

                                    $.map(values, function (curr, key) {
                                        if (key !== 'file') {
                                            data.append(key, curr);
                                        }
                                    });

                                    if ($('.' + prefix + 'progress', $modal).length === 0) {
                                        $('.' + prefix + 'modal-title', $modal)
                                            .after(
                                                $('<div/>', {
                                                    'class': prefix + 'progress'
                                                }).append(
                                                    $('<div/>', {
                                                        'class': prefix + 'progress-bar'
                                                    })
                                                )
                                            );
                                    }

                                    $.ajax({
                                        url: trumbowyg.o.plugins.upload.serverPath,
                                        headers: trumbowyg.o.plugins.upload.headers,
                                        xhrFields: trumbowyg.o.plugins.upload.xhrFields,
                                        type: 'POST',
                                        data: data,
                                        cache: false,
                                        dataType: 'json',
                                        processData: false,
                                        contentType: false,

                                        progressUpload: function (e) {
                                            $('.' + prefix + 'progress-bar').css('width', Math.round(e.loaded * 100 / e.total) + '%');
                                        },

                                        success: function (data) {
                                            if (trumbowyg.o.plugins.upload.success) {
                                                trumbowyg.o.plugins.upload.success(data, trumbowyg, $modal, values);
                                            } else {
                                                if (!!getDeep(data, trumbowyg.o.plugins.upload.statusPropertyName.split('.'))) {
                                                    var url = getDeep(data, trumbowyg.o.plugins.upload.urlPropertyName.split('.'));
                                                    trumbowyg.execCmd('insertImage', url, false, true);
                                                    var $img = $('img[src="' + url + '"]:not([alt])', trumbowyg.$box);
                                                    $img.attr('alt', values.alt);
                                                    if (trumbowyg.o.plugins.upload.imageWidthModalEdit && parseInt(values.width) > 0) {
                                                        $img.attr({
                                                            width: values.width
                                                        });
                                                    }
                                                    setTimeout(function () {
                                                        trumbowyg.closeModal();
                                                    }, 250);
                                                    trumbowyg.$c.trigger('tbwuploadsuccess', [trumbowyg, data, url]);
                                                } else {
                                                    trumbowyg.addErrorOnModalField(
                                                        $('input[type=file]', $modal),
                                                        trumbowyg.lang[data.message]
                                                    );
                                                    trumbowyg.$c.trigger('tbwuploaderror', [trumbowyg, data]);
                                                }
                                            }

                                            isUploading = false;
                                        },

                                        error: trumbowyg.o.plugins.upload.error || function () {
                                            trumbowyg.addErrorOnModalField(
                                                $('input[type=file]', $modal),
                                                trumbowyg.lang.uploadError
                                            );
                                            trumbowyg.$c.trigger('tbwuploaderror', [trumbowyg]);

                                            isUploading = false;
                                        }
                                    });
                                }
                            );

                            $('input[type=file]').on('change', function (e) {
                                try {
                                    // If multiple files allowed, we just get the first.
                                    file = e.target.files[0];
                                } catch (err) {
                                    // In IE8, multiple files not allowed
                                    file = e.target.value;
                                }
                            });
                        }
                    };

                    trumbowyg.addBtnDef('upload', btnDef);
                }
            }
        }
    });

    function addXhrProgressEvent() {
        if (!$.trumbowyg.addedXhrProgressEvent) {   // Avoid adding progress event multiple times
            var originalXhr = $.ajaxSettings.xhr;
            $.ajaxSetup({
                xhr: function () {
                    var that = this,
                        req = originalXhr();

                    if (req && typeof req.upload === 'object' && that.progressUpload !== undefined) {
                        req.upload.addEventListener('progress', function (e) {
                            that.progressUpload(e);
                        }, false);
                    }

                    return req;
                }
            });
            $.trumbowyg.addedXhrProgressEvent = true;
        }
    }
})(jQuery);

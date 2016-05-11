/* ===========================================================
 * trumbowyg.upload.js v1.1
 * Upload plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Alexandre Demode (Alex-D)
 *          Twitter : @AlexandreDemode
 *          Website : alex-d.fr
 */

(function ($) {
    'use strict';

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
            en: {
                upload: 'Upload',
                file: 'File',
                uploadError: 'Error'
            },
            sk: {
                upload: 'Nahrať',
                file: 'Súbor',
                uploadError: 'Chyba'
            },
            fr: {
                upload: 'Envoi',
                file: 'Fichier',
                uploadError: 'Erreur'
            },
            cs: {
                upload: 'Nahrát obrázek',
                file: 'Soubor',
                uploadError: 'Chyba'
            }
        },

        upload: {
            serverPath: './src/plugins/upload/trumbowyg.upload.php',
            fileFieldName: 'fileToUpload',
            data: [],
            headers: {},
            urlPropertyName: 'file',
            statusPropertyName: 'success',
            success: undefined,
            error: undefined
        },

        opts: {
            btnsDef: {
                upload: {
                    func: function (params, tbw) {
                        var file,
                            prefix = tbw.o.prefix;

                        var $modal = tbw.openModalInsert(
                            // Title
                            tbw.lang.upload,

                            // Fields
                            {
                                file: {
                                    type: 'file',
                                    required: true
                                },
                                alt: {
                                    label: 'description'
                                }
                            },

                            // Callback
                            function (values) {
                                var data = new FormData();
                                data.append($.trumbowyg.upload.fileFieldName, file);

                                $.trumbowyg.upload.data.map(function (cur) {
                                    data.append(cur.name, cur.value);
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
                                    url: $.trumbowyg.upload.serverPath,
                                    headers: $.trumbowyg.upload.headers,
                                    type: 'POST',
                                    data: data,
                                    cache: false,
                                    dataType: 'json',
                                    processData: false,
                                    contentType: false,

                                    progressUpload: function (e) {
                                        $('.' + prefix + 'progress-bar').stop().animate({
                                            width: Math.round(e.loaded * 100 / e.total) + '%'
                                        }, 200);
                                    },

                                    success: $.trumbowyg.upload.success || function (data) {
                                        if (!!getDeep(data, $.trumbowyg.upload.statusPropertyName.split('.'))) {
                                            var url = getDeep(data, $.trumbowyg.upload.urlPropertyName.split('.'));
                                            tbw.execCmd('insertImage', url);
                                            $('img[src="' + url + '"]:not([alt])', tbw.$box).attr('alt', values.alt);
                                            setTimeout(function () {
                                                tbw.closeModal();
                                            }, 250);
                                        } else {
                                            tbw.addErrorOnModalField(
                                                $('input[type=file]', $modal),
                                                tbw.lang[data.message]
                                            );
                                        }
                                    },
                                    error: $.trumbowyg.upload.error || function () {
                                        tbw.addErrorOnModalField(
                                            $('input[type=file]', $modal),
                                            tbw.lang.uploadError
                                        );
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
                    },
                    ico: 'insertImage'
                }
            }
        }
    });


    function addXhrProgressEvent() {
        if (!$.trumbowyg && !$.trumbowyg.addedXhrProgressEvent) {   // Avoid adding progress event multiple times
            var originalXhr = $.ajaxSettings.xhr;
            $.ajaxSetup({
                xhr: function () {
                    var req = originalXhr(),
                        that = this;
                    if (req && typeof req.upload == 'object' && that.progressUpload !== undefined)
                        req.upload.addEventListener('progress', function (e) {
                            that.progressUpload(e);
                        }, false);

                    return req;
                }
            });
            $.trumbowyg.addedXhrProgressEvent = true;
        }
    }
})(jQuery);

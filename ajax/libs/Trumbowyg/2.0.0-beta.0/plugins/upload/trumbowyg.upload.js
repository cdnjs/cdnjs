/* ===========================================================
 * trumbowyg.upload.js v1.0
 * Upload plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Alexandre Demode (Alex-D)
 *          Twitter : @AlexandreDemode
 *          Website : alex-d.fr
 */

(function($){
    'use strict';

    addXhrProgressEvent();

    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                upload: "Upload",
                file:   "File",
                uploadError: "Error"
            },
            sk: {
                upload: "Nahrať",
                file:   "Súbor",
                uploadError: "Chyba"
            },
            fr: {
                upload: "Envoi",
                file:   "Fichier",
                uploadError: "Erreur"
            }
        },

        upload: {
            serverPath: './src/plugins/upload/trumbowyg.upload.php'
        },

        opts: {
            btnsDef: {
                upload: {
                    func: function(params, tbw){
                        var file,
                            pfx = tbw.o.prefix;

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
                            function(){
                                var data = new FormData();
                                data.append('fileToUpload', file);

                                if($('.' + pfx +'progress', $modal).length === 0)
                                    $('.' + pfx + 'modal-title', $modal)
                                    .after(
                                        $('<div/>', {
                                            'class': pfx +'progress'
                                        })
                                        .append(
                                            $('<div/>', {
                                                'class': pfx +'progress-bar'
                                            })
                                        )
                                    );

                                $.ajax({
                                    url:            $.trumbowyg.upload.serverPath,
                                    type:           'POST',
                                    data:           data,
                                    cache:          false,
                                    dataType:       'json',
                                    processData:    false,
                                    contentType:    false,

                                    progressUpload: function(e){
                                        $('.' + pfx + 'progress-bar').stop().animate({
                                            width: Math.round(e.loaded * 100 / e.total) + '%'
                                        }, 200);
                                    },

                                    success: function(data){
                                        if(data.message == "uploadSuccess") {
                                            tbw.execCmd('insertImage', data.file);
                                            setTimeout(function(){
                                                tbw.closeModal();
                                            }, 250);
                                        } else {
                                            tbw.addErrorOnModalField(
                                                $('input[type=file]', $modal),
                                                tbw.lang[data.message]
                                            );
                                        }
                                    },
                                    error: function(){
                                        tbw.addErrorOnModalField(
                                            $('input[type=file]', $modal),
                                            tbw.lang.uploadError
                                        );
                                    }
                                });
                            }
                        );

                        $('input[type=file]').on('change', function(e){
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


    function addXhrProgressEvent(){
        if (!$.trumbowyg && !$.trumbowyg.addedXhrProgressEvent) {   // Avoid adding progress event multiple times
            var originalXhr = $.ajaxSettings.xhr;
            $.ajaxSetup({
                xhr: function() {
                    var req  = originalXhr(),
                        that = this;
                    if(req && typeof req.upload == "object" && that.progressUpload !== undefined)
                        req.upload.addEventListener("progress", function(e){
                            that.progressUpload(e);
                        }, false);

                    return req;
                }
            });
            $.trumbowyg.addedXhrProgressEvent = true;
        }
    }
})(jQuery);

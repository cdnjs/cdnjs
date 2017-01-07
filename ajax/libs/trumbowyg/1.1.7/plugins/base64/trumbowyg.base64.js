/* ===========================================================
 * trumbowyg.base64.js v1.0
 * Base64 plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Cyril Biencourt (lizardK)
 */

(function($){
    'use strict';
    
    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                base64: "Image as base64",
                file:   "File",
                errFileReaderNotSupported: "FileReader is not supported by your browser."
            },
            fr: {
                base64: "Image en base64",
                file:   "Fichier"
            }
        },

        opts: {
            btnsDef: {
                base64: {
                    isSupported: function(){
                        if(typeof FileReader === "undefined"){
                            console.err('[Trumbowyg - Plugin base64] FileReader is not supported by your browser.');
                            return false;
                        }
                        return true;
                    },
                    func: function(params, tbw){
                        var file;
                        tbw.openModalInsert(
                            // Title
                            tbw.lang.base64,

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
                            function(values){
                                var fReader = new FileReader();

                                fReader.onloadend = function(){
                                    tbw.execCmd('insertImage', fReader.result);
                                    $(['img[src="', fReader.result, '"]:not([alt])'].join(''), tbw.$box).attr('alt', values.alt);
                                    tbw.closeModal();
                                };

                                fReader.readAsDataURL(file);
                            }
                        );

                        $('input[type=file]').on('change', function(e){
                            file = e.target.files[0];
                        });
                    }
                }
            }
        }
    });
})(jQuery);
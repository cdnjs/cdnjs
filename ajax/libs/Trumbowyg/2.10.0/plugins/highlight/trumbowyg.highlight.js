/* globals Prism */
(function ($, Prism) {
    'use strict';

    // My plugin default options
    var defaultOptions = {};

    function highlightIt(text, language) {
        return [
            '<pre class="language-' + language + '">',
            '<code class="language-' + language + '">' + Prism.highlight(text, Prism.languages[language]) + '</code>',
            '</pre>',
        ].join('');
    }

    // If my plugin is a button
    function buildButtonDef(trumbowyg) {
        return {
            fn: function () {
                var $modal = trumbowyg.openModal('Code', [
                    '<div class="' + trumbowyg.o.prefix + 'highlight-form-group">',
                    '   <select class="' + trumbowyg.o.prefix + 'highlight-form-control language">',
                    (function () {
                        var options = '';

                        for (var lang in Prism.languages) {
                            if (Prism.languages[lang].comment) {
                                options += '<option value="' + lang + '">' + lang + '</option>';
                            }
                        }

                        return options;
                    })(),
                    '   </select>',
                    '</div>',
                    '<div class="' + trumbowyg.o.prefix + 'highlight-form-group">',
                    '   <textarea class="' + trumbowyg.o.prefix + 'highlight-form-control code"></textarea>',
                    '</div>',
                ].join('\n')),
                $language = $modal.find('.language'),
                $code = $modal.find('.code');

                // Listen clicks on modal box buttons
                $modal.on('tbwconfirm', function () {
                    trumbowyg.restoreRange();
                    trumbowyg.execCmd('insertHTML', highlightIt($code.val(), $language.val()));
                    trumbowyg.execCmd('insertHTML', '<p><br></p>');

                    trumbowyg.closeModal();
                });

                $modal.on('tbwcancel', function () {
                    trumbowyg.closeModal();
                });
            }
        };
    }

    $.extend(true, $.trumbowyg, {
        // Add some translations
        langs: {
            en: {
                highlight: 'Code syntax highlight'
            }
        },
        // Add our plugin to Trumbowyg registred plugins
        plugins: {
            highlight: {
                init: function (trumbowyg) {
                    // Fill current Trumbowyg instance with my plugin default options
                    trumbowyg.o.plugins.highlight = $.extend(true, {},
                        defaultOptions,
                        trumbowyg.o.plugins.highlight || {}
                    );

                    // If my plugin is a button
                    trumbowyg.addBtnDef('highlight', buildButtonDef(trumbowyg));
                }
            }
        }
    });
})(jQuery, Prism);

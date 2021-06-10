/* globals Prism */
(function ($, Prism) {
    'use strict';

    // My plugin default options
    var defaultOptions = {};

    function highlightIt(text, language, lineHighlight) {
        return [
            '<pre class="language-' + language + '" ' + (lineHighlight ? 'data-line="' + lineHighlight + '"' : '') + '>',
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
                            if (Prism.languages.hasOwnProperty(lang)) {
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
                    '<div class="' + trumbowyg.o.prefix + 'highlight-form-group">',
                    '   <input title="'+ trumbowyg.lang.prismHighlightPluginAlert +
                            '" placeholder="' + trumbowyg.lang.highlightLine +
                            '" class="' + trumbowyg.o.prefix + 'highlight-form-control trumbowyg-line-highlight"/>',
                    '</div>'
                ].join('\n')),
                $language = $modal.find('.language'),
                $code = $modal.find('.code'),
                $lineHighlight = $modal.find('.trumbowyg-line-highlight');

                // Listen clicks on modal box buttons
                $modal.on('tbwconfirm', function () {
                    trumbowyg.restoreRange();
                    trumbowyg.execCmd('insertHTML', highlightIt($code.val(), $language.val(), $lineHighlight.val()));
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
            // jshint camelcase:false
            en: {
                highlight: 'Code syntax highlight',
                highlightLine: 'Highlight lines, e.g.: 1,3-5',
                prismHighlightPluginAlert: 'You must have Prism Line Highlight plugin installed'
            },
            es: {
                highlight: 'Resaltado de sintaxis de código',
                highlightLine: 'Resaltar lineas, ej: 1,3-5',
                prismHighlightPluginAlert: 'Debes de tener el plugin Prism Line Highlight instalado'
            },
            et: {
                highlight: 'Koodi esiletoomine',
                highlightLine: 'Koodiread, näiteks: 1,3-5',
                prismHighlightPluginAlert: 'Teil peab olema paigaldatud plugin nimega Prism Line Highlight'
            },
            hu: {
                highlight: 'Kód kiemelés'
            },
            ko: {
                highlight: '코드 문법 하이라이트'
            },
            pt_br: {
                highlight: 'Realçar sintaxe de código'
            },
            // jshint camelcase:true
        },
        // Add our plugin to Trumbowyg registered plugins
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

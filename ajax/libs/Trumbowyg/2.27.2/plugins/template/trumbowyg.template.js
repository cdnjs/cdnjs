(function ($) {
    'use strict';

    // Adds the language variables
    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                template: 'Template'
            },
            az: {
                template: 'Şablon'
            },
            by: {
                template: 'Шаблон'
            },
            da: {
                template: 'Skabelon'
            },
            de: {
                template: 'Vorlage'
            },
            et: {
                template: 'Mall'
            },
            fr: {
                template: 'Patron'
            },
            hu: {
                template: 'Sablon'
            },
            ja: {
                template: 'テンプレート'
            },
            ko: {
                template: '서식'
            },
            nl: {
                template: 'Sjabloon'
            },
            pt_br: {
                template: 'Modelo'
            },
            ru: {
                template: 'Шаблон'
            },
            sl: {
                template: 'Predloga'
            },
            tr: {
                template: 'Şablon'
            },
            zh_tw: {
                template: '模板',
            },
            // jshint camelcase:true
        }
    });

    // Adds the extra button definition
    $.extend(true, $.trumbowyg, {
        plugins: {
            template: {
                shouldInit: function (trumbowyg) {
                    return trumbowyg.o.plugins.hasOwnProperty('templates');
                },
                init: function (trumbowyg) {
                    trumbowyg.addBtnDef('template', {
                        dropdown: templateSelector(trumbowyg),
                        hasIcon: false,
                        text: trumbowyg.lang.template
                    });
                }
            }
        }
    });

    // Creates the template-selector dropdown.
    function templateSelector(trumbowyg) {
        var available = trumbowyg.o.plugins.templates;
        var templates = [];

        $.each(available, function (index, template) {
            trumbowyg.addBtnDef('template_' + index, {
                fn: function () {
                    trumbowyg.html(template.html);
                },
                hasIcon: false,
                title: template.name
            });
            templates.push('template_' + index);
        });

        return templates;
    }
})(jQuery);

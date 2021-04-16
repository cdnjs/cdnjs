/**
 * @file checkbox plugin for jquery-jeditable
 * @author Mika Tuupola, Nicolas CARPi
 * @home https://github.com/NicolasCARPi/jquery_jeditable
 * @licence MIT (see LICENCE file)
 * @name PluginCheckbox
 */
'use strict';
(function ($) {
    $.editable.addInputType('checkbox', {
        element : function(settings, original) {
            var input = $('<input type="checkbox">');
            $(this).append(input);

            $(input).bind('click', function() {
                if ($(input).val() === 'on') {
                    $(input).val('off');
                    $(input).removeAttr('checked');
                } else {
                    $(input).val('on');
                    $(input).attr('checked', 'checked');
                }
            });

        return(input);
        },

        content : function(string, settings, original) {

            var checked = (string === 'yes') ? 'on' : 'off';
            var input = $(':input:first', this);

            if (checked === 'on') {
                $(input).attr('checked', checked);
            } else {
                $(input).removeAttr('checked');
            }

            var value = $(input).is(':checked') ? 'on' : 'off';
            $(input).val(value);
        },

        submit: function (settings, original) {
            var value;
            var input = $(':input:first', this);
            if (input.is(':checked')) {
                value = '1';
            } else {
                value = '0';
            }
            $('input', this).val(value);
        }
    });
})(jQuery);

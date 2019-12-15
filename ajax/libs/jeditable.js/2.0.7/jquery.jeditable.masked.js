/**
 * Depends on Masked Input jQuery plugin by Josh Bush:
 *   http://digitalbush.com/projects/masked-input-plugin
 *
 * @file masked input plugin for jquery-jeditable
 * @author Mika Tuupola, Nicolas CARPi
 * @home https://github.com/NicolasCARPi/jquery_jeditable
 * @licence MIT (see LICENCE file)
 * @copyright © 2007 Mika Tuupola, Nicolas CARPi
 * @name PluginMaskedInput
 */
'use strict';
$.editable.addInputType('masked', {
	element : function(settings, original) {
        var input = $('<input />').attr({
            autocomplete: 'off',
            list: settings.list,
            maxlength: settings.maxlength,
            pattern: settings.pattern,
            placeholder: settings.placeholder,
            tooltip: settings.tooltip,
            type: 'text'
        }).mask(settings.mask);

        if (settings.width  !== 'none') {
            input.css('width', settings.width);
        }

        if (settings.height !== 'none') {
            input.css('height', settings.height);
        }

        if (settings.size) {
            input.attr('size', settings.size);
        }

        if (settings.maxlength) {
            input.attr('maxlength', settings.maxlength);
        }

        $(this).append(input);
        return(input);
    }
});

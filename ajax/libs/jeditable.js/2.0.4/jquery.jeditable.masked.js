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
        /* Create an input. Mask it using masked input plugin. Settings  */
        /* for mask can be passed with Jeditable settings hash.          */
        var input = $('<input />').mask(settings.mask);
        $(this).append(input);
        return(input);
    }
});

/*
 * Masked input for Jeditable
 *
 * Copyright (c) 2007-2008 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 * 
 * Depends on Masked Input jQuery plugin by Josh Bush:
 *   http://digitalbush.com/projects/masked-input-plugin
 *
 * Project home:
 *   http://www.appelsiini.net/projects/jeditable
 *
 * Revision: $Id$
 *
 */
 
$.editable.addInputType('masked', {
    element : function(settings, original) {
        /* Create an input. Mask it using masked input plugin. Settings  */
        /* for mask can be passed with Jeditable settings hash.          */
        var input = $('<input />').mask(settings.mask);
        $(this).append(input);
        return(input);
    }
});

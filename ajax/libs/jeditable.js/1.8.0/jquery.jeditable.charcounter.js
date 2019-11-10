/*
 * Charcounter textarea for Jeditable
 *
 * Copyright (c) 2008 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 * 
 * Depends on Charcounter jQuery plugin by Tom Deater
 *   http://www.tomdeater.com/jquery/character_counter/
 *
 * Project home:
 *   http://www.appelsiini.net/projects/jeditable
 *
 * Revision: $Id: jquery.jeditable.autogrow.js 344 2008-03-24 16:02:11Z tuupola $
 *
 */
 
$.editable.addInputType('charcounter', {
    element : function(settings, original) {
        var textarea = $('<textarea />');
        if (settings.rows) {
            textarea.attr('rows', settings.rows);
        } else {
            textarea.height(settings.height);
        }
        if (settings.cols) {
            textarea.attr('cols', settings.cols);
        } else {
            textarea.width(settings.width);
        }
        $(this).append(textarea);
        return(textarea);
    },
    plugin : function(settings, original) {
        $('textarea', this).charCounter(settings.charcounter.characters, settings.charcounter);
    }
});

/*
 * Timepicker for Jeditable
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/jeditable
 *
 * Revision: $Id$
 *
 */
$.editable.addInputType('time', {
    /* Create input element. */
    element : function(settings, original) {
        /* Create and pulldowns for hours and minutes. Append them to */
        /* form which is accessible as variable this.                 */
        var hourselect = $('<select id="hour_" />');
        var minselect  = $('<select id="min_" />');

        for (var hour=0; hour <= 23; hour++) {
            if (hour < 10) {
                hour = '0' + hour;
            }
            var option = $('<option />').val(hour).append(hour);
            hourselect.append(option);
        }
        $(this).append(hourselect);

        for (var min=0; min <= 45; min = parseInt(min, 10) + 15) {
            if (min < 10) {
                min = '0' + min;
            }
            var option = $('<option />').val(min).append(min);
            minselect.append(option);
        }
        $(this).append(minselect);

        /* Last create an hidden input. This is returned to plugin. It will */
        /* later hold the actual value which will be submitted to server.   */
        var hidden = $('<input type="hidden" />');
        $(this).append(hidden);
        return(hidden);
    },
    /* Set content / value of previously created input element. */
    content : function(string, settings, original) {
        /* Select correct hour and minute in pulldowns. */
        var hour = parseInt(string.substr(0,2), 10);
        var min  = parseInt(string.substr(3,2), 10);

        $('#hour_', this).children().each(function() {
            if (hour == $(this).val()) {
                $(this).attr('selected', 'selected');
            }
        });
        $('#min_', this).children().each(function() {
            if (min == $(this).val()) {
                $(this).attr('selected', 'selected');
            }
        });

    },
    /* Call before submit hook. */
    submit: function (settings, original) {
        /* Take values from hour and minute pulldowns. Create string such as    */
        /* 13:45 from them. Set value of the hidden input field to this string. */
        var value = $('#hour_').val() + ':' + $('#min_').val();
        $('input', this).val(value);
    }
});

/**
 * (c) 2013 Jcalendar Plugin v1.0.0 > Bossanova UI
 * http://www.github.com/paulhodel/jcalendar
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Create light embedded calendar
 */

(function( $ ){

    var methods = {

    /**
     * Create a calendar picker element based on existing input. If calendar already exists open the calendar picker.
     * @param {Object} options : calendar default options
     * @return void
     */

    init : function( options ) { 

        // Default options
        // format: calendar format
        // readonly: input text is a readonly [0/1]
        // time: show the hour and minutes picker [0/1]
        // months: array of string so can be translated
        // weekdays: array of string so can be translated

        var defaults = {    format:'DD/MM/YYYY',
                            readonly:0,
                            today:0,
                            time:0,
                            clear:1,
                            mask:1,
                            months:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            weekdays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                            weekdays_short:['S', 'M', 'T', 'W', 'T', 'F', 'S']
                        };

        // Default container
        if (! $.fn.jcalendar.defaults) {
            $.fn.jcalendar.defaults = []
        }

        // Save the options binded to the correct element
        var options =  $.extend(defaults, options);

        // Make sure use upper case in the format
        options.format = options.format.toUpperCase();

        // Calendar table container
        if (! $('.jcalendar').length) {
            var div = document.createElement('div');
            $(div).addClass('jcalendar bossanova-ui');
            $(div).css('display','');

            // Month and year options
            var modal = document.createElement('div');
            $(modal).addClass('jcalendar_container');

            var calendar = document.createElement('table');
            $(calendar).attr('cellpadding', '0');
            $(calendar).attr('cellspacing', '0');
            $(modal).append(calendar);

            var calendar_header = document.createElement('thead');
            $(calendar).append(calendar_header);

            var calendar_content = document.createElement('tbody');
            $(calendar).append(calendar_content);

            // Calendar
            var data = new Date();
            month = parseInt(data.getMonth()) + 1;

            // Month and year html
            $(calendar_header).html('<tr align="center"><td></td><td align="right" class="jcalendar_prev"><div class="jcalendar_left"></div></td><td colspan="3"><input type="hidden" class="jcalendar_day" value="'+data.getDate()+'"> <span class="jcalendar_month_label">' + options.months[ data.getMonth() ] +'</span><input type="hidden" class="jcalendar_month" value="' + month +'"> <span class="jcalendar_year_label"> ' + data.getFullYear() + '</span> <input type="hidden" class="jcalendar_year" value="' + data.getFullYear() + '"></td><td align="left" class="jcalendar_next"><div class="jcalendar_right"></div></td><td class="jcalendar_close">x</td></tr>');

            // Create calendar table picker
            $(div).html("");
            $(div).append($(modal));

            $(this).before(div);
        }

        // Assembly the calendar
        $.each ($(this), function (k, v) {
            if (! $(this).hasClass('jcalendar_input')) {
                $(this).jcalendar('create', v, options);

                // Current input
                $.fn.jcalendar.current = $(v);
            }
        });

        // Click handle must be defined only once
        if (! $.fn.jcalendar.onclick) {
            $.fn.jcalendar.onclick = function (e) {
                if ($(e.target).is('.jcalendar_input')) {
                    $(e.target).jcalendar('open');
                } else {
                    if ($.fn.jcalendar.current) {
                        if ($(e.target).closest('.jcalendar').length > 0) {
                            var action = $(e.target).prop('class');
                            // Object id
                            if (action == 'jcalendar_prev' || action == 'jcalendar_left') {
                                $($.fn.jcalendar.current).jcalendar('prev');
                            } else if (action == 'jcalendar_next' || action == 'jcalendar_right') {
                                $($.fn.jcalendar.current).jcalendar('next');
                            } else if (action == 'jcalendar_month_label') {
                                $($.fn.jcalendar.current).jcalendar('months');
                            } else if (action == 'jcalendar_year_label') {
                                $($.fn.jcalendar.current).jcalendar('years');
                            } else if (action == 'setYear') {
                                $('.jcalendar').find('.jcalendar_year').val($(e.target).text());
                                $('.jcalendar').find('.jcalendar_year_label').html($(e.target).text());
                                $($.fn.jcalendar.current).jcalendar('days');
                            } else if (action == 'setMonth') {
                                $('.jcalendar').find('.jcalendar_month').val($(e.target).find('input').val());
                                $('.jcalendar').find('.jcalendar_month_label').html($(e.target).text());
                                $($.fn.jcalendar.current).jcalendar('days');
                            } else if (action == 'setDay') {
                                if ($(e.target).text()) {
                                    $('.jcalendar').find('.jcalendar_day').val($(e.target).text());
                                    if (! options.time) {
                                        $($.fn.jcalendar.current).jcalendar('close', 1);
                                    } else {
                                        $($.fn.jcalendar.current).jcalendar('days');
                                    }
                                }
                            } else if (action == 'jcalendar_confirm') {
                                $($.fn.jcalendar.current).jcalendar('close', 1);
                            } else if (action == 'jcalendar_reset') {
                                $($.fn.jcalendar.current).jcalendar('reset');
                            } else if (action == 'jcalendar_close') {
                                $($.fn.jcalendar.current).jcalendar('close', 0);
                            }
                        } else {
                            $($.fn.jcalendar.current).jcalendar('close', 0);
                        }
                    }
                }
            }

            // Click handling
            $(document).on('mousedown', function (e) {
                $.fn.jcalendar.onclick(e);
            });

            // Click handling
            $(document).on('keydown', function (e) {
                if (e.which == 27) {
                    // Scape pressed, close any calendar
                    if ($.fn.jcalendar.current) {
                        $($.fn.jcalendar.current).jcalendar('close', 0);
                    }
                }
            });
        }
    },

    /**
     * Create the elements for every object in the selector
     * @param {Object} obj : object selected in the selector
     * @param {Object} options : options
     * @return void
     */

    create : function( obj, options ) {
        // Object id
        var id = $(obj).attr('id');

        // Keep non id elements to be instantiate without any problems
        if (! id) {
            id = 'calendar_' + Math.floor(Math.random() * 1000) + 9999;
            $(this).prop('id', id);
        }

        // Default class
        $(obj).addClass('jcalendar_input');

        // Save options
        $.fn.jcalendar.defaults[id] = options;

        // Months
        var months = options.months;

        // Check for read only or create a mask to the visual input
        if (options.readonly == 1) {
            $(obj).prop('readonly', 'readonly');
        } else {
            if (options.mask == 1 && $.fn.masked) {
                var mask = options.format.replace('24', '').replace(/\w{1}/g, '0');
                var placeHolder = options.format.replace('24', '').replace(/\w{1}/g, '_');
                $(obj).mask(mask, { placeholder:placeHolder });

                // Copy the visual data to the calendar element in the final format
                $(obj).keyup(function () {
                    var v1 = $(this).val();
                    var v2 = options.format.replace(/[0-9]/g,'');

                    var test = 1;
                    // Get year
                    var y = v2.search("YYYY");
                    y = v1.substr(y,4).replace('_', '');
                    if (y.length != 4) test = 0;
                    // Get month
                    var m = v2.search("MM");
                    m = v1.substr(m,2).replace('_', '');
                    if (m.length != 2 || m == 0 || m > 12) test = 0;
                    // Get day
                    var d = v2.search("DD");
                    d = v1.substr(d,2).replace('_', '');
                    if (d.length != 2 || d == 0 || d > 31) test = 0;

                    // Get hour
                    var h = v2.search("HH");
                    if (h > 0) {
                        h = v1.substr(h,2).replace('_', '');
                        if (h.length != 2 || h > 23) test = 0;
                    } else {
                        h = '00';
                    }
                    // Get minutes
                    var i = v2.search("MI");
                    if (i > 0) {
                        i = v1.substr(i,2).replace('_', '');
                        if (i.length != 2 || i > 60) test = 0;
                    } else {
                        i = '00';
                    }
                    // Get seconds
                    var s = v2.search("SS");
                    if (s > 0) {
                        s = v1.substr(s,2).replace('_', '');
                        if (s.length != 2 || s > 60) test = 0;
                    } else {
                        s = '00';
                    }

                    if (test == 1) {
                        // Update source
                        var data = y + '-' + m + '-' + d + ' ' + h + ':' +  i + ':' + s;
                        $(options.source).val(data);
                        // Update
                        $(this).jcalendar('open');
                        // Onchange
                        if (typeof(options.onchange) == 'function') {
                            options.onchange($(obj), data);
                        }
                    }
                });
            }
        }

        // Container
        if (! options.source) {
            options.source = document.createElement('input');
            $(options.source).prop('type', 'hidden');
            $(obj).before(options.source);
        }
        $(options.source).prop('class', 'jcalendar_value');

        // Setting todays object date to today
        if ($(options.source).val() == '' && options.today == 1) {
            var data = new Date();
            dia = ''+ data.getDate();
            if (dia.length == 1) dia = '0' + dia;
            mes = ''+(data.getMonth() + 1);
            if (mes.length == 1) mes = '0' + mes;
            ano = data.getFullYear();
            hora = ''+data.getHours();
            if (hora.length == 1) hora = '0' + hora;
            min = ''+data.getMinutes();
            if (min.length == 1) min = '0' + min;
            $(options.source).val(ano + '-' + mes + '-' + dia + ' ' + hora + ':' + min + ':00');
        }

        // Update labels
        if ($(options.source).val().replace(/\D/g,'').length == 14) {
            var val = $.fn.jcalendar('label', $(options.source).val(), options.format);
            $(obj).val(val);
        }
    },

    /**
     * Open the calendar picker
     * @return void
     */

    open : function ( value ) {
        // Object id
        var id = $(this).attr('id');

        // Current input
        $.fn.jcalendar.current = $(this);

        // Loading options
        var format = $.fn.jcalendar.defaults[id].format;

        // Get main input object
        if (! value) {
            value = $($.fn.jcalendar.defaults[id].source).val();
        } else {
            $($.fn.jcalendar.defaults[id].source).val(value);
        }

        // Get calendar table
        var table = $('.jcalendar');

        // Get the position of the corner helper
        var t = parseInt($(this).offset().top) + parseInt($(this).height()) + 15;
        var l = parseInt($(this).offset().left);

        // Place the corner in the correct place
        $(table).css('display', 'block');
        $(table).css('top', t);
        $(table).css('left', l);

        // Setting values in the table based on the current date in the main object

        if (value) {
            value = value.split(' ');
            v1 = value[0].split('-');
            if (! value[1]) {
                value[1] = '00:00:00';
            }
            v2 = value[1].split(':');

            v1[0] = parseInt(v1[0]);
            v1[1] = parseInt(v1[1]);
            v1[2] = parseInt(v1[2]);

            $(table).find('.jcalendar_day').val(v1[2]);
            $(table).find('.jcalendar_month').val(v1[1]);
            $(table).find('.jcalendar_year').val(v1[0]);

            if (value[1]) v2 = value[1].split(':');

            if (v2[0] != '') $(table).find('.jcalendar_hour').val(v2[0]);
            if (v2[1] != '') $(table).find('.jcalendar_min').val(v2[1]);

            // Update datepicker headers
            var months = $.fn.jcalendar.defaults[id].months;
            $(table).find('.jcalendar_month_label').html(months[v1[1]-1]);
            $(table).find('.jcalendar_year_label').html(v1[0]);
        }

        $(this).jcalendar('days');
    },

    /**
     * Open the calendar picker
     * @param udpate {boolean} update the input values and label based on the new calendar picker
     * @return void
     */

    close : function ( update ) {
        // Object id
        var id = $($.fn.jcalendar.current).attr('id');

        // Loading options
        var options = $.fn.jcalendar.defaults[id];

        // Update the date string in the object
        if (update == 1) {
            var calendar = $('.jcalendar');
            var d = $(calendar).find(".jcalendar_day").val();
            var m = $(calendar).find(".jcalendar_month").val();
            var y = $(calendar).find(".jcalendar_year").val();

            if (m.length == 1) m = '0' + m;
            if (d.length == 1) d = '0' + d;

            if (options.time) {
                var h = $(calendar).find(".jcalendar_hour").val();
                var i = $(calendar).find(".jcalendar_min").val();
                if (h.length == 1) h = '0' + h;
                if (i.length == 1) i = '0' + i;
            } else {
                h = '00';
                i = '00';
            }

            // Update the input object
            $(options.source).val(y + '-' + m + '-' + d + ' ' + h + ':' + i + ':00');

            // Update the label to the user
            val = $.fn.jcalendar('label', y + '-' + m + '-' + d + ' ' + h + ':' + i + ':00', options.format);
            $($.fn.jcalendar.current).val(val);

            // On change
            if (typeof(options.onchange) ==  'function') {
                options.onchange($($.fn.jcalendar.current), y + '-' + m + '-' + d + ' ' + h + ':' + i + ':00');
            }
        }

        // Hide the calendar table
        //$('.jcalendar').css('display', 'none');
        $('.jcalendar').fadeOut('fast');

        // On close
        if (typeof(options.onclose) == 'function') {
            options.onclose($.fn.jcalendar.current);
        }

        // Reference
        $.fn.jcalendar.current = null;
    },

    /**
     * Go to the previous month
     * @return void
     */

    prev : function () {
        // Object id
        var id = $($.fn.jcalendar.current).attr('id');

        // Loading month labels
        var months = $.fn.jcalendar.defaults[id].months;

        // Find the calendar table
        var table = $('.jcalendar');

        // Check if the visualization is the days picker or years picker
        if ($(table).find('.jcalendar_years').length > 0) {
            var year = $(table).find(".jcalendar_year");
            $(year).val($(year).val() - 12);

            // Update labels in the calendar table headers
            $(table).find(".jcalendar_year_label").html($(year).val());

            // Update picker table of days
            $($.fn.jcalendar.current).jcalendar('years');
        } else {
            // Get the current values from table
            var month = $(table).find(".jcalendar_month");
            var year = $(table).find(".jcalendar_year");

            // Go to the previous month
            if ($(month).val() < 2) {
                $(month).val(12);
                $(year).val($(year).val() - 1);
            } else {
                $(month).val($(month).val() - 1);
            }

            // Update labels in the calendar table headers
            $(table).find(".jcalendar_month_label").html(months[$(month).val()-1]);
            $(table).find(".jcalendar_year_label").html($(year).val());

            // Update picker table of days
            $($.fn.jcalendar.current).jcalendar('days');
        }
    },

    /**
     * Go to the next month
     * @return void
     */

    next : function () {
        // Object id
        var id = $($.fn.jcalendar.current).attr('id');

        // Loading month labels
        var months = $.fn.jcalendar.defaults[id].months;

        // Find the calendar table
        var table = $('.jcalendar');

        // Check if the visualization is the days picker or years picker
        if ($(table).find('.jcalendar_years').length > 0) {
            var year = $(table).find(".jcalendar_year");
            $(year).val(parseInt($(year).val()) + 12);

            // Update labels in the calendar table headers
            $(table).find(".jcalendar_year_label").html($(year).val());

            // Update picker table of days
            $($.fn.jcalendar.current).jcalendar('years');
        } else {
            // Get the current values from table
            var month = $(table).find(".jcalendar_month");
            var year = $(table).find(".jcalendar_year");

            // Go to the next month
            if ($(month).val() > 11) {
                $(month).val(1);
                $(year).val(parseInt($(year).val()) + 1);
            } else {
                $(month).val(parseInt($(month).val()) + 1);
            }

            // Update labels in the calendar table headers
            $(table).find(".jcalendar_month_label").html(months[$(month).val()-1]);
            $(table).find(".jcalendar_year_label").html($(year).val());

            // Update picker table of days
            $($.fn.jcalendar.current).jcalendar('days');
        }
    },

    /**
     * Set the value
     * @return void
     */

    set : function( val ) {
        // Object id
        var id = $(this).attr('id');

        // Loading options
        var options = $.fn.jcalendar.defaults[id];

        // Set value
        $(options.source).val(val);

        // Set label
        val = $(this).calendar('label', val, options.format);
        $(this).val(val);
    },

    /**
     * Set the label in the user friendly format
     * @return void
     */

    label : function( value, format ) {
        // Default calendar
        if (! format) {
            format = 'DD/MM/YYYY';
        }

        if (value) {
            d = value;
            d = d.split(' ');

            var m = '';
            var h = '';

            if (d[1]) {
                h = d[1].split(':');
                m = h[1];
                h = h[0];
            }

            d = d[0].split('-');

            var calendar = new Date(d[0], d[1]-1, d[2]);
            var weekday = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');

            value = format;
            value = value.replace('WD', weekday[calendar.getDay()]);
            value = value.replace('DD', d[2]);
            value = value.replace('MM', d[1]);
            value = value.replace('YYYY', d[0]);
            //value = value.replace('YY', d[2].substring(2,4));

            if (h) {
                value = value.replace('HH24', h);
            }

            if ($(this).find(".calendar_hour").val() > 12) {
                value = value.replace('HH12', h - 12);
            } else {
                value = value.replace('HH12', h);
            }
    
            value = value.replace('MI', m);
            value = value.replace('SS', 0);
        }

        return value;
    },

    /**
     * Reset calendar data in the element
     * @return void
     */

    reset : function( ) {
        var id = $($.fn.jcalendar.current).prop('id');
        $($.fn.jcalendar.current).val('');
        $($.fn.jcalendar.defaults[id].source).val('');
        $($.fn.jcalendar.current).jcalendar('close', 0)
    },

    /**
     * Update calendar configuration
     * @param {Object} obj : object selected in the selector
     * @param {Object} options : options
     * @return void
     */

    config : function( options ) {
        // Object id
        var id = $(this).attr('id');

        // Default options
        // format: calendar format
        // readonly: input text is a readonly [0/1]
        // time: show the hour and minutes picker [0/1]
        // months: array of string so can be translated
        // weekdays: array of string so can be translated

        var defaults = {    format:'DD/MM/YYYY',
                            readonly:1,
                            today:0,
                            time:0,
                            clear:1,
                            mask:1,
                            months:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            weekdays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                            weekdays_short:['S', 'M', 'T', 'W', 'T', 'F', 'S']
                        };

        // Save the options binded to the correct element
        var options =  $.extend(defaults, options);

        // Make sure use upper case in the format
        options.format = options.format.toUpperCase();

        // Save options
        if (id && $.fn.jcalendar.defaults[id]) {
            $.fn.jcalendar.defaults[id] = options;
        }
    },

    /**
     * Internal method to assembly the HTML day picker interface
     * @return void
     */

    days : function( data ) {
        // Object id
        var id = $($.fn.jcalendar.current).prop('id');

        // Clear
        var clear = $.fn.jcalendar.defaults[id].clear;

        // Loading month labels
        var weekdays = $.fn.jcalendar.defaults[id].weekdays_short;

        // Loading time option
        var time = $.fn.jcalendar.defaults[id].time;

        // Variables
        var i = 0;
        var d = 0;
        var calendar;
        var calendar_day;
        var calendar_day_style;
        var today = 0;
        var today_d = 0;

        // Loading calendar current date
        var day = $('.jcalendar').find(".jcalendar_day").val();
        var month = $('.jcalendar').find(".jcalendar_month").val();
        var year = $('.jcalendar').find(".jcalendar_year").val();
        var hour = $('.jcalendar').find(".jcalendar_hour").val();
        var min = $('.jcalendar').find(".jcalendar_min").val();

        // Setting current values in case of NULLs
        calendar = new Date();
        if (!year) year = calendar.getFullYear();
        if (!month) month = parseInt(calendar.getMonth()) + 1;
        if (!hour) hour = calendar.getHours();
        if (!min) min = calendar.getMinutes();

        // Flag if this is the current month and year
        if ((calendar.getMonth() == month-1) && (calendar.getFullYear() == year)) {
            today = 1;
            today_d = calendar.getDate();
        }

        calendar = new Date(year, month, 0, 0, 0);
        nd = calendar.getDate();

        calendar = new Date(year, month-1, 0, hour, min);
        fd = calendar.getDay() + 1;

        // HTML elements for hour and minutes
        var hora = '';
        var horas = '';
        var hour_selected = '';

        for (i = 0; i < 24; i++) {
            hour_selected = '';
            if (i == parseInt(calendar.getHours())) hour_selected = ' selected';
            hora = '' + i;
            if (hora.length == 1) hora = '0' + hora;
            horas += '<option value="'+hora+'" ' + hour_selected + '>' + hora + '</option>';
        }

        var min = '';
        var mins = '';

        for (i = 0; i < 60; i++) {
            min_selected = '';
            if (i == parseInt(calendar.getMinutes())) {
                min_selected = ' selected';
            }
            min = '' + i;
            if (min.length == 1) {
                min = '0' + min;
            }
            mins += '<option value="'+min+'" ' + min_selected + '>' + min + '</option>';
        }

        // HTML headers
        var calendar_table = '<tr align="center" id="jcalendar_weekdays">';

        for (i = 0; i < 7; i++) {
            calendar_table += '<td width="30">'+weekdays[i]+'</td>';
        }

        calendar_table += '</tr><tr align="center">';

        // Avoid a blank line
        if (fd == 7) {
            var j = 7;
        } else {
            var j = 0;
        }

        // Mouting the table
        for (i = j; i < (Math.ceil((nd + fd) / 7) * 7); i++) {
            if ((i >= fd) && (i < nd + fd)) {
                d += 1;
            } else {
                d = 0;
            }

            calendar_day_style = '';

            if (d == 0) {
                // Do nothing
                calendar_day = '';
            } else {
                calendar_day = d;
                if (d < 10) {
                    calendar_day = '0' + d;
                }

                calendar_day = d;

                // Sundays
                if (!(i % 7)) {
                    calendar_day_style += 'color:red;'
                }

                // Today
                if ((today == 1) && (today_d == d)) {
                    calendar_day_style += 'font-weight:bold;';
                }

                // Selected day
                if (calendar_day == day) {
                    calendar_day_style+= 'background-color:#eee;';
                }
            }

            if ((i > 0) && (!(i % 7))) {
                calendar_table += '</tr><tr align="center">';
            }

            calendar_table += '<td style="'+calendar_day_style+'" class="setDay">'+calendar_day+'</td>';
        }

        // Table footer
        calendar_table += '<tr><td colspan="7" style="padding:6px;"> ';

        // Showing the timepicker
        if (time == 1) {
            calendar_table += '<select class="jcalendar_hour">'+horas+'</select> <select class="jcalendar_min">'+mins+'</select> ';
        } else {
            calendar_table += '<select class="jcalendar_hour" style="display:none">'+horas+'</select> <select class="jcalendar_min" style="display:none">'+mins+'</select> ';
        }

        // Button OK
        calendar_table += '<div class="jcalendar_confirm">Ok</div>';

        // Show clear button
        if (clear) {
            calendar_table += '<div class="jcalendar_reset">clear</div>';
        }

        // Close table
        calendar_table += '</td></tr>';

        // Appeding HTML to the element table
        $('.jcalendar').find('tbody').html(calendar_table);
    },

    /**
     * Internal method to assembly the HTML of month picker interface
     * @return void
     */

    months : function( ) { 
        // Object id
        var id = $($.fn.jcalendar.current).prop('id');

        // Loading month labels
        var months = $.fn.jcalendar.defaults[id].months;

        // Create months table
        var calendar_table = '<td colspan="7"><table class="jcalendar_months" width="100%"><tr align="center">';

        for (i = 0; i < 12; i++) {
            if ((i > 0) && (!(i % 3))) {
                calendar_table += '</tr><tr align="center">';
            }
            month = parseInt(i) + 1;
            calendar_table += '<td class="setMonth"><input type="hidden" value="'+ month +'">'+ months[i] +'</td>';
        }

        calendar_table += '</tr></table></td>';

        $('.jcalendar').find('tbody').html(calendar_table);
    },

    /**
     * Internal method to assembly the HTML of year picker interface
     * @return void
     */

    years : function( ) { 
        // Get current selected year
        var year = $('.jcalendar').find('.jcalendar_year').val();

        // Array of years
        var y = [];
        for (i = 0; i < 25; i++) {
            y[i] = parseInt(year) + (i - 12);
        }

        // Bold the current selected year
        y[12] = '<b>' + y[12] + '</b>';

        // Assembling the year tables
        var calendar_table = '<td colspan="7"><table class="jquery_calendar_years" width="100%"><tr align="center">';

        for (i = 0; i < 25; i++) {
            if ((i > 0) && (!(i % 5))) {
                calendar_table += '</tr><tr align="center">';
            }
            calendar_table += '<td class="setYear">'+ y[i] +'</td>';
        }

        calendar_table += '</tr></table></td>';

        $('.jcalendar').find('tbody').html(calendar_table);
    }
};

$.fn.jcalendar = function( method ) {
    if ( methods[method] ) {
        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
    } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }  
};

})( jQuery );

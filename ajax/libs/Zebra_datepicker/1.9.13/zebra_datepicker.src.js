/**
 *  Zebra_DatePicker
 *
 *  Zebra_DatePicker is a small, compact and highly configurable date picker / time picker jQuery plugin
 *
 *  Read more {@link https://github.com/stefangabos/Zebra_Datepicker/ here}
 *
 *  @author     Stefan Gabos <contact@stefangabos.ro>
 *  @version    1.9.13 (last revision: September 26, 2019)
 *  @copyright  (c) 2011 - 2019 Stefan Gabos
 *  @license    http://www.gnu.org/licenses/lgpl-3.0.txt GNU LESSER GENERAL PUBLIC LICENSE
 *  @package    Zebra_DatePicker
 */
(function(factory) {

    'use strict';

    // AMD
    if (typeof define === 'function' && define.amd) define(['jquery'], factory);    // jshint ignore:line

    // CommonJS
    else if (typeof exports === 'object') factory(require('jquery'));   // jshint ignore:line

    // browser globals
    else factory(jQuery);

}(function($) {

    'use strict';

    $.Zebra_DatePicker = function(element, options) {

        // so you can tell the version number even if all you have is the minified source
        this.version = '1.9.13';

        var defaults = {

                //  setting this property to a jQuery element, will result in the date picker being always visible, the indicated
                //  element being the date picker's container;
                //
                //  setting this to boolean TRUE will keep will result in the date picker not closing when selecting a
                //  date but only when the user clicks outside the date picker.
                //
                //  note that when a date format is used that also involves time, this property will be automatically
                //  set to TRUE!
                //
                //  default is FALSE
                always_visible: false,

                //  by default, the date picker is injected into the <body>; use this property to tell the library to inject
                //  the date picker into a custom element - useful when you want the date picker to open at a specific position
                //
                //  must be a jQuery element
                //
                //  default is $('body')
                container: $('body'),

                //  by default, the current date (the value of *Today*) is taken from the system where the date picker is run on.
                //  set this to a date in the format of 'YYYY-MM-DD' to use a different date.
                //
                //  default is FALSE which means "the current system's date"
                current_date: false,

                //  dates that should have custom classes applied to them
                //  an object in the form of
                //  {
                //      'myclass1': [dates_to_apply_the_custom_class_to],
                //      'myclass2': [dates_to_apply_the_custom_class_to]
                //  }
                //  where "dates_to_apply_the_custom_class_to" is an array of dates in the same format as required for
                //  "disabled_dates" property.
                //
                //  custom classes will be applied *only* in the day picker view and not on month/year views!
                //  also note that the class name will have the "_disabled" suffix added if the day the class is applied to
                //  is disabled
                //
                //  in order for the styles in your custom classes to be applied, make sure you are using the following syntax:
                //
                //  .Zebra_DatePicker .dp_daypicker td.myclass1 { .. }
                //  .Zebra_DatePicker .dp_daypicker td.myclass1_disabled { .. }
                //
                //  default is FALSE, no custom classes
                custom_classes: false,

                //  days of the week; Sunday to Saturday
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

                //  by default, the abbreviated name of a day consists of the first 2 letters from the day's full name;
                //  while this is common for most languages, there are also exceptions for languages like Thai, Loa, Myanmar,
                //  etc. where this is not correct; for these cases, specify an array with the abbreviations to be used for
                //  the 7 days of the week; leave it FALSE to use the first 2 letters of a day's name as the abbreviation.
                //
                //  default is FALSE
                days_abbr: false,

                //  the position of the date picker relative to the element it is attached to. note that, regardless of this
                //  setting, the date picker's position will be automatically adjusted to fit in the viewport, if needed.
                //
                //  possible values are "above" and "below"
                //
                //  default is "above"
                default_position: 'above',

                //  direction of the calendar
                //
                //  a positive or negative integer: n (a positive integer) creates a future-only calendar beginning at n days
                //  after today; -n (a negative integer); if n is 0, the calendar has no restrictions. use boolean true for
                //  a future-only calendar starting with today and use boolean false for a past-only calendar ending today.
                //
                //  you may also set this property to an array with two elements in the following combinations:
                //
                //  -   first item is boolean TRUE (calendar starts today), an integer > 0 (calendar starts n days after
                //      today), or a valid date given in the format defined by the "format" attribute, using English for
                //      month names (calendar starts at the specified date), and the second item is boolean FALSE (the calendar
                //      has no ending date), an integer > 0 (calendar ends n days after the starting date), or a valid date
                //      given in the format defined by the "format" attribute, using English for month names, and which occurs
                //      after the starting date (calendar ends at the specified date)
                //
                //  -   first item is boolean FALSE (calendar ends today), an integer < 0 (calendar ends n days before today),
                //      or a valid date given in the format defined by the "format" attribute, using English for month names
                //      (calendar ends at the specified date), and the second item is an integer > 0 (calendar ends n days
                //      before the ending date), or a valid date given in the format defined by the "format" attribute, using
                //      English for month names  and which occurs before the starting date (calendar starts at the specified
                //      date)
                //
                //  [1, 7] - calendar starts tomorrow and ends seven days after that
                //  [true, 7] - calendar starts today and ends seven days after that
                //  ['2013-01-01', false] - calendar starts on January 1st 2013 and has no ending date ("format" is YYYY-MM-DD)
                //  [false, '2012-01-01'] - calendar ends today and starts on January 1st 2012 ("format" is YYYY-MM-DD)
                //
                //  note that "disabled_dates" property will still apply!
                //
                //  default is 0 (no restrictions)
                direction: 0,

                //  by default, setting a format that also involves time (h, H, g, G, i, s, a, A) will automatically enable
                //  the time picker. if you want to use a format that involves time but you don't want the time picker, set
                //  this property to TRUE.
                //
                //  default is FALSE
                disable_time_picker: false,

                //  an array of disabled dates in the following format: 'day month year weekday' where "weekday" is optional
                //  and can be 0-6 (Saturday to Sunday); the syntax is similar to cron's syntax: the values are separated by
                //  spaces and may contain * (asterisk) - (dash) and , (comma) delimiters:
                //
                //  ['1 1 2012'] would disable January 1, 2012;
                //  ['* 1 2012'] would disable all days in January 2012;
                //  ['1-10 1 2012'] would disable January 1 through 10 in 2012;
                //  ['1,10 1 2012'] would disable January 1 and 10 in 2012;
                //  ['1-10,20,22,24 1-3 *'] would disable 1 through 10, plus the 22nd and 24th of January through March for every year;
                //  ['* * * 0,6'] would disable all Saturdays and Sundays;
                //  ['01 07 2012', '02 07 2012', '* 08 2012'] would disable 1st and 2nd of July 2012, and all of August of 2012
                //
                //  default is FALSE, no disabled dates
                //
                //  DISABLING ALL DATES AND NOT SPECIFYING AT LEAST ONE ENABLED DATE WILL SEND THE SCRIPT INTO AN INFINITE
                //  LOOP SEARCHING FOR AN ENABLED DATE TO DISPLAY!
                disabled_dates: false,

                //  an array of enabled dates in the same format as required for "disabled_dates" property.
                //  to be used together with the "disabled_dates" property by first setting the "disabled_dates" property to
                //  something like "[* * * *]" (which will disable everything) and the setting the "enabled_dates" property to,
                //  say, "[* * * 0,6]" to enable just weekends.
                enabled_dates: false,

                //  an array of selectable hours.
                //  default is FALSE, all hours are selectable.
                enabled_hours: false,

                //  an array of selectable minutes.
                //  default is FALSE, all minutes are selectable.
                enabled_minutes: false,

                //  an array of selectable seconds.
                //  default is FALSE, all seconds are selectable.
                enabled_seconds: false,

                //  allows the users to quickly navigate through months and years by clicking on the date picker's top label.
                //  default is TRUE.
                fast_navigation: true,

                //  week's starting day
                //
                //  valid values are 0 to 6, Sunday to Saturday
                //
                //  default is 1, Monday
                first_day_of_week: 1,

                //  format of the returned date
                //
                //  accepts the following characters for date formatting: d, D, j, l, N, w, S, F, m, M, n, Y, y, h, H,
                //  g, G, i, s, a, A borrowing the syntax from PHP's "date" function.
                //
                //  note that when setting a date format without days ('d', 'j'), the users will be able to select only years
                //  and months, and when setting a format without months and days ('F', 'm', 'M', 'n', 'd', 'j'), the
                //  users will be able to select only years; likewise, when setting a date format with just months ('F', 'm',
                //  'M', 'n') or just years ('Y', 'y'), users will be able to select only months and years, respectively.
                //
                //  setting a format that also involves time (h, H, g, G, i, s, a, A) will automatically enable the time
                //  picker. if you want to use a format that involves time but you don't want the time picker, set the
                //  "disable_time_picker" property to TRUE.
                //
                //  setting a time format containing "a" or "A" (12-hour format) but using "H" or "G" as the hour's format
                //  will result in the hour's format being changed to "h" or "g", respectively.
                //
                //  also note that the value of the "view" property (see below) may be overridden if it is the case: a value of
                //  "days" for the "view" property makes no sense if the date format doesn't allow the selection of days.
                //
                //  default is Y-m-d
                format: 'Y-m-d',

                //  captions in the datepicker's header, for the 3 possible views: days, months, years
                //
                //  for each of the 3 views the following special characters may be used borrowing from PHP's "date" function's
                //  syntax: m, n, F, M, y and Y; any of these will be replaced at runtime with the appropriate date fragment,
                //  depending on the currently viewed date. two more special characters are also available Y1 and Y2 (upper
                //  case representing years with 4 digits, lowercase representing years with 2 digits) which represent
                //  "currently selected year - 7" and "currently selected year + 4" and which only make sense used in the
                //  "years" view.
                //
                //  even though any of these special characters may be used in any of the 3 views, you should use m, n, F, M
                //  for the "days" view and y, Y, Y1, Y2, y1, y2 for the "months" and "years" view or you may get unexpected
                //  results!
                //
                //  Text and HTML can also be used, and will be rendered as it is, as in the example below (the library is
                //  smart enough to not replace special characters when used in words or HTML tags):
                //
                //  header_captions: {
                //      'days':     'Departure:<br>F, Y',
                //      'months':   'Departure:<br>Y',
                //      'years':    'Departure:<br>Y1 - Y2'
                //  }
                //
                //  Default is
                //
                //  header_captions: {
                //      'days':     'F, Y',
                //      'months':   'Y',
                //      'years':    'Y1 - Y2'
                //  }
                header_captions: {
                    days:   'F, Y',
                    months: 'Y',
                    years:  'Y1 - Y2'
                },

                //  the left and right white-space around the icon
                //  if the "inside" property is set to TRUE then the target element's padding will be altered so that
                //  the element's left or right padding (depending on the value of "icon_position") will be 2 x icon_margin
                //  plus the icon's width
                //  if the "inside" property is set to FALSE, then this will be the distance between the element and the icon.
                //  leave it to FALSE to use the element's existing padding
                //
                //  default is FALSE
                icon_margin: false,

                //  icon's position
                //  accepted values are "left" and "right"
                //  if the "inside" property is set to TRUE, this will always be "right"
                //
                //  default is "right"
                icon_position: 'right',

                //  should the icon for opening the datepicker be inside the element?
                //  if set to FALSE, the icon will be placed to the right of the parent element, while if set to TRUE it will
                //  be placed to the right of the parent element, but *inside* the element itself
                //
                //  default is TRUE
                inside: true,

                //  the caption for the "Clear" button
                lang_clear_date: 'Clear date',

                //  months names
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

                //  by default, the abbreviated name of a month consists of the first 3 letters from the month's full name;
                //  while this is common for most languages, there are also exceptions for languages like Thai, Loa, Myanmar,
                //  etc. where this is not correct; for these cases, specify an array with the abbreviations to be used for
                //  the months of the year; leave it FALSE to use the first 3 letters of a month's name as the abbreviation.
                //
                //  default is FALSE
                months_abbr: false,

                //  HTML to be used for previous/next and up/down buttons, in that order
                //
                //  default is ['&#9664;', '&#9654;', '&#9650;', '&#9660;']
                navigation: ['&#9664;', '&#9654;', '&#9650;', '&#9660;'],

                //  the offset, in pixels (x, y), to shift the date picker's position relative to the top-right of the icon
                //  that toggles the date picker or, if the icon is disabled, relative to the top-right corner of the element
                //  the plugin is attached to.
                //
                //  note that this only applies if the position of element relative to the browser's viewport doesn't require
                //  the date picker to be placed automatically so that it is visible!
                //
                //  default is [5, -5]
                offset: [5, -5],

                //  set whether the date picker should be shown *only* when interacting with the icon
                //  note that if you also set the "show_icon" property to FALSE, you will not be able to show the date picker anymore!
                //
                //  default is FALSE
                open_icon_only: false,

                //  set this property to TRUE if you want the date picker to be shown when the parent element (if
                //  "open_icon_only" is not set to FALSE) or the associated calendar icon (if "show_icon" is set to TRUE)
                //  receive focus.
                //
                //  default is FALSE
                open_on_focus: false,

                //  if set as a jQuery element with a Zebra_DatePicker attached, that particular date picker will use the
                //  current date picker's value as starting date
                //  note that the rules set in the "direction" property will still apply, only that the reference date will
                //  not be the current system date but the value selected in the current date picker
                //  default is FALSE (not paired with another date picker)
                pair: false,

                //  should the element the calendar is attached to, be read-only?
                //  if set to TRUE, a date can be set only through the date picker and cannot be entered manually
                //
                //  default is TRUE
                readonly_element: true,

                //  enables rtl text.
                //
                //  default is FALSE
                rtl: false,

                //  should days from previous and/or next month be selectable when visible?
                //  note that if the value of this property is set to TRUE, the value of "show_other_months" will be considered
                //  TRUE regardless of the actual value!
                //
                //  default is FALSE
                select_other_months: false,

                //  should the "Clear date" button be visible?
                //
                //  accepted values are:
                //
                //  - 0 (zero) - the button for clearing a previously selected date is shown only if a previously selected date
                //  already exists; this means that if the input the date picker is attached to is empty, and the user selects
                //  a date for the first time, this button will not be visible; once the user picked a date and opens the date
                //  picker again, this time the button will be visible.
                //
                //  - TRUE will make the button visible all the time
                //
                //  - FALSE will disable the button
                //
                //  default is "0" (without quotes)
                show_clear_date: 0,

                //  should a calendar icon be added to the elements the plugin is attached to?
                //
                //  default is TRUE
                show_icon: true,

                //  should days from previous and/or next month be visible?
                //
                //  default is TRUE
                show_other_months: true,

                //  should the "Today" button be visible?
                //  setting it to anything but boolean FALSE will enable the button and will use the property's value as
                //  caption for the button; setting it to FALSE will disable the button
                //
                //  default is "Today"
                show_select_today: 'Today',

                //  should an extra column be shown, showing the number of each week?
                //  anything other than FALSE will enable this feature, and use the given value as column title
                //  i.e. show_week_number: 'Wk' would enable this feature and have "Wk" as the column's title
                //
                //  default is FALSE
                show_week_number: false,

                //  a default date to start the date picker with
                //  must be specified in the format defined by the "format" property, or as a JavaScript Date object
                //  note that this value is used only if there is no value in the field the date picker is attached to!
                //
                //  default is FALSE
                start_date: false,

                //  should default values, in the input field the date picker is attached to, be deleted if they are not valid
                //  according to "direction" and/or "disabled_dates"?
                //
                //  default is FALSE
                strict: false,

                //  how should the date picker start; valid values are "days", "months" and "years"
                //  note that the date picker is always cycling days-months-years when clicking in the date picker's header,
                //  and years-months-days when selecting dates (unless one or more of the views are missing due to the date's
                //  format)
                //
                //  also note that the value of the "view" property may be overridden if the date's format requires so! (i.e.
                //  "days" for the "view" property makes no sense if the date format doesn't allow the selection of days)
                //
                //  default is "days"
                view: 'days',

                //  days of the week that are considered "weekend days"
                //  valid values are 0 to 6, Sunday to Saturday
                //
                //  default values are 0 and 6 (Saturday and Sunday)
                weekend_days: [0, 6],

                //  when set to TRUE, day numbers < 10 will be prefixed with 0; set to FALSE if you don't want that
                //
                //  default is TRUE
                zero_pad: false,

                //  callback function to be executed whenever the user changes the view (days/months/years/time), as well
                //  as when the user navigates by clicking on the "next"/"previous" icons in any of the views (except for
                //  the "time" view)
                //
                //  the callback function takes 2 arguments - the first argument represents the current view (can be "days",
                //  "months", "years" or "time"), the second argument represents an array containing the "active" elements
                //  (not disabled) from the view, as jQuery elements, allowing for easy customization and interaction
                //  with particular cells in the date picker's view
                //
                //  the "this" keyword inside the callback function refers to the element the date picker is attached to,
                //  as a jQuery object
                //
                //  for simplifying searching for particular dates, each element in the second argument will also have a
                //  "date" data attribute whose format depends on the value of the "view" argument:
                //  - YYYY-MM-DD for elements in the "days" view
                //  - YYYY-MM for elements in the "months" view
                //  - YYYY for elements in the "years" view
                //
                //  note that this data attribute is not set for elements in the "time" view
                //
                //  the "this" keyword inside the callback function refers to the element the date picker is attached to!
                onChange: null,

                //  callback function to be executed when the user clicks the "Clear" button
                //
                //  the callback function takes no arguments; the "this" keyword inside the callback function refers to
                //  the element the date picker is attached to, as a jQuery object
                onClear: null,

                //  callback function to be executed when the date picker is shown
                //
                //  the callback function takes no arguments; the "this" keyword inside the callback function refers to
                //  the element the date picker is attached to, as a jQuery object
                onOpen: null,

                //  callback function to be executed when the date picker is closed, but only when the "always_visible"
                //  property is set to FALSE
                //
                //  the callback function takes no arguments; the "this" keyword inside the callback function refers to
                //  the element the date picker is attached to, as a jQuery object
                onClose: null,

                //  callback function to be executed when a date is selected
                //  the callback function takes 3 arguments:
                //  -   the date in the format specified by the "format" attribute;
                //  -   the date in YYYY-MM-DD format
                //  -   the date as a JavaScript Date object
                //
                //  the "this" keyword inside the callback function refers to the element the date picker is attached to,
                //  as a jQuery object
                onSelect: null

            },

            // private properties
            cleardate, clickables, confirm_selection, current_system_day, current_system_month, current_system_year,
            custom_class_names, custom_classes = {}, datepicker, daypicker, daypicker_cells, default_day,
            default_month, default_year, disabled_dates, enabled_dates, end_date, first_selectable_day,
            first_selectable_month, first_selectable_year, footer, header, icon, last_selectable_day, last_selectable_month,
            last_selectable_year, monthpicker, monthpicker_cells, original_attributes = {}, selected_hour, selected_minute,
            selected_second, selected_ampm, view_toggler, selected_month, selected_year, selecttoday, shim,
            show_select_today, start_date, timeout, timepicker, timepicker_config, touchmove = false, uniqueid = '', yearpicker,
            yearpicker_cells, view, views, is_touch = false, timer_interval,

            // are we running on an iOS powered device?
            is_iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),

            // to avoid confusions, we use "plugin" to reference the current instance of the object
            plugin = this,

            // the jQuery version of the element
            // "element" (without the $) will point to the DOM element
            $element = $(element),

            /**
             *  Constructor method. Initializes the date picker.
             *
             *  @return void
             */
            init = function(update) {

                var

                    // the characters that may be present in the date format and that represent days, months, years, hours,
                    // minutes and seconds
                    date_chars = {
                        days:       ['d', 'j', 'D'],
                        months:     ['F', 'm', 'M', 'n', 't'],
                        years:      ['o', 'Y', 'y'],
                        hours:      ['G', 'g', 'H', 'h'],
                        minutes:    ['i'],
                        seconds:    ['s'],
                        ampm:       ['A', 'a']
                    },

                    // some defaults
                    type = null, data, dates, k, l, format_is_valid = false;

                // generate a random ID for each date picker (we'll use this if later a certain date picker is destroyed to
                // remove related events)
                // the code is taken from http://stackoverflow.com/a/105074
                for (k = 0; k < 3; k++) uniqueid += Math.floor((1 + Math.random()) * 0x10000).toString(16);

                // start by assuming there are no enabled/disabled dates
                disabled_dates = [];
                enabled_dates = [];

                // unless we're not just updating settings
                if (!update) {

                    // merge default settings with user-settings (
                    plugin.settings = $.extend({}, defaults, $.fn.Zebra_DatePicker.defaults, options);

                    // preserve some of element's original attributes
                    original_attributes.readonly = $element.attr('readonly');
                    original_attributes.style = $element.attr('style');
                    original_attributes.padding_left = parseInt($element.css('paddingLeft'), 10) || 0;
                    original_attributes.padding_right = parseInt($element.css('paddingRight'), 10) || 0;

                    // iterate through the element's data attributes (if any)
                    for (data in $element.data())

                        // if data attribute's name starts with "zdp_"
                        if (data.indexOf('zdp_') === 0) {

                            // remove the "zdp_" prefix
                            data = data.replace(/^zdp\_/, '');

                            // if such a property exists
                            if (undefined !== defaults[data])

                                // update the property's value
                                // (note that for the "pair" property we need to convert the property to an element)
                                plugin.settings[data] = (data === 'pair' ? $($element.data('zdp_' + data)) : $element.data('zdp_' + data));

                        }

                }

                // if the element should be read-only, set the "readonly" attribute
                if (plugin.settings.readonly_element) $element.attr('readonly', 'readonly');

                // otherwise remove it (in case it is present)
                else $element.removeAttr('readonly');

                // assume there's no timepicker
                timepicker_config = false;

                // the views the user can cycle through
                views = [];

                // as long as the format is invalid
                while (!format_is_valid) {

                    // determine the views the user can cycle through, depending on the format
                    // that is, if the format doesn't contain the day, the user will be able to cycle only through years and months,
                    // whereas if the format doesn't contain months nor days, the user will only be able to select years

                    // iterate through all the character blocks
                    for (type in date_chars)

                        // iterate through the characters of each block
                        $.each(date_chars[type], function(index, character) {

                            var i, max;

                            // if current character exists in the "format" property
                            if (plugin.settings.format.indexOf(character) > -1)

                                // if user can cycle through the "days" view
                                if (type === 'days') views.push('days');

                                // if user can cycle through the "months" view
                                else if (type === 'months') views.push('months');

                                // if user can cycle through the "years" view
                                else if (type === 'years') views.push('years');

                                // if time is available in the date's format and time picker is not explicitly disabled
                                else if ((type === 'hours' || type === 'minutes' || type === 'seconds' || type === 'ampm') && !plugin.settings.disable_time_picker) {

                                    // if variable is not yet initialized
                                    if (!timepicker_config) {

                                        // initialize the variable now
                                        timepicker_config = {is12hour: false};

                                        // users may access the "time" view
                                        views.push('time');

                                    }

                                    // if hours are available in the date's format
                                    if (type === 'hours') {

                                        // store the hour's format
                                        timepicker_config.hour_format = character;

                                        // selectable hours (12 or 24) depending on the format
                                        if (character === 'g' || character === 'h') {

                                            max = 12;

                                            // set a flag telling that the hour is 12 hour format
                                            timepicker_config.is12hour = true;

                                        } else max = 24;

                                        timepicker_config.hours = [];

                                        // make sure we treat values as integers
                                        // (or this won't work when doing $.inArray(): enabled_hours: ['11', '12', '13'])
                                        if ($.isArray(plugin.settings.enabled_hours)) plugin.settings.enabled_hour = plugin.settings.enabled_hours.map(function(value) { return parseInt(value, 10); })

                                        // iterate through valid hours
                                        for (i = (max === 12 ? 1 : 0); i < (max === 12 ? 13 : max); i++)

                                            // and add them to the lookup array if a user-defined list of values doesn't exist, or if the value is in that list
                                            if (!$.isArray(plugin.settings.enabled_hours) || $.inArray(i, plugin.settings.enabled_hours) > -1) timepicker_config.hours.push(i);

                                    // if minutes are available in the date's format
                                    } else if (type === 'minutes') {

                                        timepicker_config.minutes = [];

                                        // make sure we treat values as integers
                                        // (or this won't work when doing $.inArray(): enabled_minutes: ['11', '12', '13'])
                                        if ($.isArray(plugin.settings.enabled_minutes)) plugin.settings.enabled_minutes = plugin.settings.enabled_minutes.map(function(value) { return parseInt(value, 10); })

                                        // iterate through valid minutes
                                        for (i = 0; i < 60; i++)

                                            // and add them to the lookup array if a user-defined list of values doesn't exist, or if the value is in that list
                                            if (!$.isArray(plugin.settings.enabled_minutes) || $.inArray(i, plugin.settings.enabled_minutes) > -1) timepicker_config.minutes.push(i);

                                    // if seconds are available in the date's format
                                    } else if (type === 'seconds') {

                                        timepicker_config.seconds = [];

                                        // make sure we treat values as integers
                                        // (or this won't work when doing $.inArray(): enabled_seconds: ['11', '12', '13'])
                                        if ($.isArray(plugin.settings.enabled_seconds)) plugin.settings.enabled_seconds = plugin.settings.enabled_seconds.map(function(value) { return parseInt(value, 10); })

                                        // iterate through valid minutes
                                        for (i = 0; i < 60; i++)

                                            // and add them to the lookup array if a user-defined list of values doesn't exist, or if the value is in that list
                                            if (!$.isArray(plugin.settings.enabled_seconds) || $.inArray(i, plugin.settings.enabled_seconds) > -1) timepicker_config.seconds.push(i);

                                    // if am/pm is available in the date's format
                                    } else

                                        // pre-fill the array of selectable seconds
                                        timepicker_config.ampm = ['am', 'pm'];

                                }

                        });

                    // if time format contains hours, am/pm needs to be shown but the hours are in 24-hour format
                    if (timepicker_config.hour_format && timepicker_config.ampm && timepicker_config.is12hour === false)

                        // replace the hour's format from a 24-hour format to a 12-hour format
                        plugin.settings.format = plugin.settings.format.replace(timepicker_config.hour_format, timepicker_config.hour_format.toLowerCase());

                    // otherwise, consider the format as valid
                    else format_is_valid = true;

                }

                // if invalid format (no days, no months, no years) use the default where the user is able to cycle through
                // all the views, except time
                if (views.length === 0) views = ['years', 'months', 'days'];

                // if the starting view is not amongst the views the user can cycle through, set the correct starting view
                if ($.inArray(plugin.settings.view, views) === -1) plugin.settings.view = views[views.length - 1];

                // parse the rules for disabling dates and turn them into arrays of arrays

                custom_class_names = [];
                for (k in plugin.settings.custom_classes) if (plugin.settings.custom_classes.hasOwnProperty(k) && custom_class_names.indexOf(k) === -1) custom_class_names.push(k);

                // it's the same logic for preparing the enabled/disable dates, as well as dates that have custom classes
                for (l = 0; l < 2 + custom_class_names.length; l++) {

                    // first time we're doing disabled dates,
                    if (l === 0) dates = plugin.settings.disabled_dates;

                    // second time we're doing enabled_dates
                    else if (l === 1) dates = plugin.settings.enabled_dates;

                    // otherwise, we're doing dates that will have custom classes
                    else dates = plugin.settings.custom_classes[custom_class_names[l - 2]];

                    // if we have a non-empty array
                    if ($.isArray(dates) && dates.length > 0)

                        // iterate through the rules
                        $.each(dates, function() {

                            // split the values in rule by white space
                            var rules = this.split(' '), i, j, k, limits;

                            // there can be a maximum of 4 rules (days, months, years and, optionally, day of the week)
                            for (i = 0; i < 4; i++) {

                                // if one of the values is not available
                                // replace it with a * (wildcard)
                                if (!rules[i]) rules[i] = '*';

                                // if rule contains a comma, create a new array by splitting the rule by commas
                                // if there are no commas create an array containing the rule's string
                                rules[i] = (rules[i].indexOf(',') > -1 ? rules[i].split(',') : new Array(rules[i]));

                                // iterate through the items in the rule
                                for (j = 0; j < rules[i].length; j++)

                                    // if item contains a dash (defining a range)
                                    if (rules[i][j].indexOf('-') > -1) {

                                        // get the lower and upper limits of the range
                                        limits = rules[i][j].match(/^([0-9]+)\-([0-9]+)/);

                                        // if range is valid
                                        if (null !== limits) {

                                            // iterate through the range
                                            for (k = to_int(limits[1]); k <= to_int(limits[2]); k++)

                                                // if value is not already among the values of the rule
                                                // add it to the rule
                                                if ($.inArray(k, rules[i]) === -1) rules[i].push(k + '');

                                            // remove the range indicator
                                            rules[i].splice(j, 1);

                                        }

                                    }

                                // iterate through the items in the rule
                                // and make sure that numbers are numbers
                                for (j = 0; j < rules[i].length; j++) rules[i][j] = (isNaN(to_int(rules[i][j])) ? rules[i][j] : to_int(rules[i][j]));

                            }

                            // add to the correct list of processed rules
                            // first time we're doing disabled dates,
                            if (l === 0) disabled_dates.push(rules);

                            // second time we're doing enabled_dates
                            else if (l === 1) enabled_dates.push(rules);

                            // otherwise, we're doing the dates to which custom classes need to be applied
                            else {

                                if (undefined === custom_classes[custom_class_names[l - 2]]) custom_classes[custom_class_names[l - 2]] = [];
                                custom_classes[custom_class_names[l - 2]].push(rules);

                            }

                        });

                }

                var

                    // cache the current date (which is either the system's date or a custom one, if given)
                    date = plugin.settings.current_date !== false ? new Date(plugin.settings.current_date) : new Date(),

                    // when the date picker's starting date depends on the value of another date picker, this value will be
                    // set by the other date picker
                    // this value will be used as base for all calculations (if not set, will be the same as the current
                    // system date)
                    reference_date = (!plugin.settings.reference_date ? ($element.data('zdp_reference_date') && undefined !== $element.data('zdp_reference_date') ? $element.data('zdp_reference_date') : date) : plugin.settings.reference_date),

                    tmp_start_date, tmp_end_date;

                // reset these values here as this method might be called more than once during a date picker's lifetime
                // (when the selectable dates depend on the values from another date picker)
                start_date = undefined; end_date = undefined;

                // extract the date parts
                // also, save the current system month/day/year - we'll use them to highlight the current system date
                first_selectable_month = reference_date.getMonth();
                current_system_month = date.getMonth();
                first_selectable_year = reference_date.getFullYear();
                current_system_year = date.getFullYear();
                first_selectable_day = reference_date.getDate();
                current_system_day = date.getDate();

                // check if the calendar has any restrictions

                // calendar is future-only, starting today
                // it means we have a starting date (the current system date), but no ending date
                if (plugin.settings.direction === true) start_date = reference_date;

                // calendar is past only, ending today
                else if (plugin.settings.direction === false) {

                    // it means we have an ending date (the reference date), but no starting date
                    end_date = reference_date;

                    // extract the date parts
                    last_selectable_month = end_date.getMonth();
                    last_selectable_year = end_date.getFullYear();
                    last_selectable_day = end_date.getDate();

                } else if (

                    // if direction is not given as an array and the value is an integer > 0
                    (!$.isArray(plugin.settings.direction) && is_integer(plugin.settings.direction) && to_int(plugin.settings.direction) > 0) ||

                    // or direction is given as an array
                    ($.isArray(plugin.settings.direction) && (

                        // and first entry is a valid date
                        (tmp_start_date = check_date(plugin.settings.direction[0])) ||
                        // or a boolean TRUE
                        plugin.settings.direction[0] === true ||
                        // or an integer > 0
                        (is_integer(plugin.settings.direction[0]) && plugin.settings.direction[0] > 0)

                    ) && (

                        // and second entry is a valid date
                        (tmp_end_date = check_date(plugin.settings.direction[1])) ||
                        // or a boolean FALSE
                        plugin.settings.direction[1] === false ||
                        // or integer >= 0
                        (is_integer(plugin.settings.direction[1]) && plugin.settings.direction[1] >= 0)

                    ))

                ) {

                    // if an exact starting date was given, use that as a starting date
                    if (tmp_start_date) start_date = tmp_start_date;

                    // otherwise
                    else

                        // figure out the starting date
                        // use the Date object to normalize the date
                        // for example, 2011 05 33 will be transformed to 2011 06 02
                        start_date = new Date(
                            first_selectable_year,
                            first_selectable_month,
                            first_selectable_day + (!$.isArray(plugin.settings.direction) ? to_int(plugin.settings.direction) : to_int(plugin.settings.direction[0] === true ? 0 : plugin.settings.direction[0]))
                        );

                    // re-extract the date parts
                    first_selectable_month = start_date.getMonth();
                    first_selectable_year = start_date.getFullYear();
                    first_selectable_day = start_date.getDate();

                    // if an exact ending date was given and the date is after the starting date, use that as a ending date
                    if (tmp_end_date && +tmp_end_date >= +start_date) end_date = tmp_end_date;

                    // if have information about the ending date
                    else if (!tmp_end_date && plugin.settings.direction[1] !== false && $.isArray(plugin.settings.direction))

                        // figure out the ending date
                        // use the Date object to normalize the date
                        // for example, 2011 05 33 will be transformed to 2011 06 02
                        end_date = new Date(
                            first_selectable_year,
                            first_selectable_month,
                            first_selectable_day + to_int(plugin.settings.direction[1])
                        );

                    // if a valid ending date exists
                    if (end_date) {

                        // extract the date parts
                        last_selectable_month = end_date.getMonth();
                        last_selectable_year = end_date.getFullYear();
                        last_selectable_day = end_date.getDate();

                    }

                } else if (

                    // if direction is not given as an array and the value is an integer < 0
                    (!$.isArray(plugin.settings.direction) && is_integer(plugin.settings.direction) && to_int(plugin.settings.direction) < 0) ||

                    // or direction is given as an array
                    ($.isArray(plugin.settings.direction) && (

                        // and first entry is boolean FALSE
                        plugin.settings.direction[0] === false ||
                        // or an integer < 0
                        (is_integer(plugin.settings.direction[0]) && plugin.settings.direction[0] < 0)

                    ) && (

                        // and second entry is a valid date
                        (tmp_start_date = check_date(plugin.settings.direction[1])) ||
                        // or an integer >= 0
                        (is_integer(plugin.settings.direction[1]) && plugin.settings.direction[1] >= 0)

                    ))

                ) {

                    // figure out the ending date
                    // use the Date object to normalize the date
                    // for example, 2011 05 33 will be transformed to 2011 06 02
                    end_date = new Date(
                        first_selectable_year,
                        first_selectable_month,
                        first_selectable_day + (!$.isArray(plugin.settings.direction) ? to_int(plugin.settings.direction) : to_int(plugin.settings.direction[0] === false ? 0 : plugin.settings.direction[0]))
                    );

                    // re-extract the date parts
                    last_selectable_month = end_date.getMonth();
                    last_selectable_year = end_date.getFullYear();
                    last_selectable_day = end_date.getDate();

                    // if an exact starting date was given, and the date is before the ending date, use that as a starting date
                    if (tmp_start_date && +tmp_start_date < +end_date) start_date = tmp_start_date;

                    // if have information about the starting date
                    else if (!tmp_start_date && $.isArray(plugin.settings.direction))

                        // figure out the staring date
                        // use the Date object to normalize the date
                        // for example, 2011 05 33 will be transformed to 2011 06 02
                        start_date = new Date(
                            last_selectable_year,
                            last_selectable_month,
                            last_selectable_day - to_int(plugin.settings.direction[1])
                        );

                    // if a valid starting date exists
                    if (start_date) {

                        // extract the date parts
                        first_selectable_month = start_date.getMonth();
                        first_selectable_year = start_date.getFullYear();
                        first_selectable_day = start_date.getDate();

                    }

                // if there are disabled dates
                } else if ($.isArray(plugin.settings.disabled_dates) && plugin.settings.disabled_dates.length > 0)

                    // iterate through the rules for disabling dates
                    for (var interval in disabled_dates)

                        // only if there is a rule that disables *everything*
                        if ($.inArray('*', disabled_dates[interval][0]) > -1 && $.inArray('*', disabled_dates[interval][1]) > -1 && $.inArray('*', disabled_dates[interval][2]) > -1 && $.inArray('*', disabled_dates[interval][3]) > -1) {

                            var tmpDates = [];

                            // iterate through the rules for enabling dates
                            // looking for the minimum/maximum selectable date (if it's the case)
                            $.each(enabled_dates, function() {

                                var rule = this;

                                // if the rule doesn't apply to all years
                                if (rule[2][0] !== '*')

                                    // format date and store it in our stack
                                    tmpDates.push(parseInt(
                                        rule[2][0] +
                                        (rule[1][0] === '*' ? '12' : str_pad(rule[1][0], 2)) +
                                        (rule[0][0] === '*' ? (rule[1][0] === '*' ? '31' : new Date(rule[2][0], rule[1][0], 0).getDate()) : str_pad(rule[0][0], 2)), 10));

                            });

                            // sort dates ascending
                            tmpDates.sort();

                            // if we have any rules
                            if (tmpDates.length > 0) {

                                // get date parts
                                var matches = (tmpDates[0] + '').match(/([0-9]{4})([0-9]{2})([0-9]{2})/);

                                // assign the date parts to the appropriate variables
                                first_selectable_year = parseInt(matches[1], 10);
                                first_selectable_month = parseInt(matches[2], 10) - 1;
                                first_selectable_day = parseInt(matches[3], 10);

                            }

                            // don't look further
                            break;

                        }

                // if first selectable date exists but is disabled, find the actual first selectable date
                if (is_disabled(first_selectable_year, first_selectable_month, first_selectable_day)) {

                    // loop until we find the first selectable year
                    while (is_disabled(first_selectable_year))

                        // if calendar is past-only,
                        if (!start_date) {

                            // decrement the year
                            first_selectable_year--;

                            // because we've changed years, reset the month to December
                            first_selectable_month = 11;

                        // otherwise
                        } else {

                            // increment the year
                            first_selectable_year++;

                            // because we've changed years, reset the month to January
                            first_selectable_month = 0;

                        }

                    // loop until we find the first selectable month
                    while (is_disabled(first_selectable_year, first_selectable_month)) {

                        // if calendar is past-only
                        if (!start_date) {

                            // decrement the month
                            first_selectable_month--;

                            // because we've changed months, reset the day to the last day of the month
                            first_selectable_day = new Date(first_selectable_year, first_selectable_month + 1, 0).getDate();

                        // otherwise
                        } else {

                            // increment the month
                            first_selectable_month++;

                            // because we've changed months, reset the day to the first day of the month
                            first_selectable_day = 1;

                        }

                        // if we moved to a following year
                        if (first_selectable_month > 11) {

                            // increment the year
                            first_selectable_year++;

                            // reset the month to January
                            first_selectable_month = 0;

                            // because we've changed months, reset the day to the first day of the month
                            first_selectable_day = 1;

                        // if we moved to a previous year
                        } else if (first_selectable_month < 0) {

                            // decrement the year
                            first_selectable_year--;

                            // reset the month to December
                            first_selectable_month = 11;

                            // because we've changed months, reset the day to the last day of the month
                            first_selectable_day = new Date(first_selectable_year, first_selectable_month + 1, 0).getDate();

                        }

                    }

                    // loop until we find the first selectable day
                    while (is_disabled(first_selectable_year, first_selectable_month, first_selectable_day)) {

                        // if calendar is past-only, decrement the day
                        if (!start_date) first_selectable_day--;

                        // otherwise, increment the day
                        else first_selectable_day++;

                        // use the Date object to normalize the date
                        // for example, 2011 05 33 will be transformed to 2011 06 02
                        date = new Date(first_selectable_year, first_selectable_month, first_selectable_day);

                        // re-extract date parts from the normalized date
                        // as we use them in the current loop
                        first_selectable_year = date.getFullYear();
                        first_selectable_month = date.getMonth();
                        first_selectable_day = date.getDate();

                    }

                    // use the Date object to normalize the date
                    // for example, 2011 05 33 will be transformed to 2011 06 02
                    date = new Date(first_selectable_year, first_selectable_month, first_selectable_day);

                    // re-extract date parts from the normalized date
                    // as we use them in the current loop
                    first_selectable_year = date.getFullYear();
                    first_selectable_month = date.getMonth();
                    first_selectable_day = date.getDate();

                }

                // if "start_date" is given as JavaScript Date object...
                if (plugin.settings.start_date && typeof plugin.settings.start_date === 'object' && plugin.settings.start_date instanceof Date)

                    // ...convert it the a properly formatted string
                    plugin.settings.start_date = format(plugin.settings.start_date);

                // get the default date, from the element, and check if it represents a valid date, according to the required format
                var default_date = check_date($element.val() || (plugin.settings.start_date ? plugin.settings.start_date : ''));

                // if there is a default date, date picker is in "strict" mode, and the default date is disabled
                if (default_date && plugin.settings.strict && is_disabled(default_date.getFullYear(), default_date.getMonth(), default_date.getDate()))

                    // clear the value of the parent element
                    $element.val('');

                // updates value for the date picker whose starting date depends on the selected date (if any)
                if (!update && (undefined !== start_date || undefined !== default_date))
                    update_dependent(undefined !== default_date ? default_date : start_date);

                // if date picker is not always visible in a container
                if (!(plugin.settings.always_visible instanceof jQuery)) {

                    // if we're just creating the date picker
                    if (!update) {

                        // if a calendar icon should be added to the element the plugin is attached to, create the icon now
                        if (plugin.settings.show_icon) {

                            // strangely, in Firefox 21+ (or maybe even earlier) input elements have their "display" property
                            // set to "inline" instead of "inline-block" as do all the other browsers.
                            // because this behavior brakes the positioning of the icon, we'll set the "display" property to
                            // "inline-block" before anything else;
                            if (browser.name === 'firefox' && $element.is('input[type="text"]') && $element.css('display') === 'inline') $element.css('display', 'inline-block');

                            // we create a wrapper for the parent element so that we can later position the icon
                            // also, make sure the wrapper inherits positioning properties of the target element
                            var marginTop = parseInt($element.css('marginTop'), 10) || 0,
                                marginRight = parseInt($element.css('marginRight'), 10) || 0,
                                marginBottom = parseInt($element.css('marginBottom'), 10) || 0,
                                marginLeft = parseInt($element.css('marginLeft'), 10) || 0,
                                icon_wrapper = $('<span class="Zebra_DatePicker_Icon_Wrapper"></span>').css({
                                    display:        $element.css('display'),
                                    position:       $element.css('position') === 'static' ? 'relative' : $element.css('position'),
                                    float:          $element.css('float'),
                                    top:            $element.css('top'),
                                    right:          $element.css('right'),
                                    bottom:         $element.css('bottom'),
                                    left:           $element.css('left'),
                                    marginTop:      marginTop < 0 ? marginTop : 0,
                                    marginRight:    marginRight < 0 ? marginRight : 0,
                                    marginBottom:   marginBottom < 0 ? marginBottom : 0,
                                    marginLeft:     marginLeft < 0 ? marginLeft : 0,
                                    paddingTop:     marginTop,
                                    paddingRight:   marginRight,
                                    paddingBottom:  marginBottom,
                                    paddingLeft:    marginLeft
                                });

                            // if parent element has its "display" property set to "block"
                            // the wrapper has to have its "width" set
                            if ($element.css('display') === 'block') icon_wrapper.css('width', $element.outerWidth(true));

                            // put wrapper around the element
                            // also, reset the target element's positioning properties
                            $element.wrap(icon_wrapper).css({
                                position:       'relative',
                                float:          'none',
                                top:            'auto',
                                right:          'auto',
                                bottom:         'auto',
                                left:           'auto',
                                marginTop:      0,
                                marginRight:    0,
                                marginBottom:   0,
                                marginLeft:     0
                            });

                            // create the actual calendar icon (show a disabled icon if the element is disabled)
                            icon = $('<button type="button" class="Zebra_DatePicker_Icon' + ($element.attr('disabled') === 'disabled' ? ' Zebra_DatePicker_Icon_Disabled' : '') + '">Pick a date</button>');

                            // a reference to the icon, as a global property
                            plugin.icon = icon;

                            // the date picker will open when clicking both the icon and the element the plugin is attached to
                            // (or the icon only, if set so)
                            clickables = plugin.settings.open_icon_only ? icon : icon.add($element);

                        // if calendar icon is not visible, the date picker will open when clicking the element
                        } else clickables = $element;

                        // attach the "click" and, if required, the "focus" event to the clickable elements (icon and/or element)
                        clickables.on('click.Zebra_DatePicker_' + uniqueid + (plugin.settings.open_on_focus ? ' focus.Zebra_DatePicker_' + uniqueid : ''), function() {

                            // if date picker is not visible and element is not disabled
                            if (datepicker.hasClass('dp_hidden') && !$element.attr('disabled'))

                                // if not a touch-enabled device or the element is read-only, show the date picker right away
                                if (!(is_touch && !plugin.settings.readonly_element)) plugin.show();

                                // if touch-enabled device and the element is not read-only
                                else {

                                    // stop a previously started timeout, if any
                                    clearTimeout(timeout);

                                    // wait for 600 milliseconds for the virtual keyboard to appear and show the date picker afterwards
                                    timeout = setTimeout(function() {
                                        plugin.show()
                                    }, 600);

                                }

                        });

                        // attach a keydown event to the clickable elements (icon and/or element)
                        clickables.on('keydown.Zebra_DatePicker_' + uniqueid, function(e) {

                            // if "Tab" key was pressed and the date picker is visible
                            if (e.keyCode === 9 && !datepicker.hasClass('dp_hidden'))

                                // hide the date picker
                                plugin.hide();

                        });

                        // if users can manually enter dates and a pair date element exists
                        if (!plugin.settings.readonly_element && plugin.settings.pair)

                            // whenever the element looses focus
                            $element.on('blur.Zebra_DatePicker_' + uniqueid, function() {

                                var date;

                                // if a valid date was entered, update the paired date picker
                                if ((date = check_date($(this).val())) && !is_disabled(date.getFullYear(), date.getMonth(), date.getDate())) update_dependent(date);

                            });

                        // if icon exists, inject it into the DOM, right after the parent element (and inside the wrapper)
                        if (undefined !== icon) icon.insertAfter($element);

                    }

                    // if calendar icon exists
                    if (undefined !== icon) {

                        // needed when updating: remove any inline style set previously by library,
                        // so we get the right values below
                        icon.attr('style', '');

                        var

                            // get element's width and height (including margins)
                            element_width = $element.outerWidth(),
                            element_height = $element.outerHeight(),

                            // get icon's width, height and margins
                            icon_width = icon.outerWidth(),
                            icon_height = icon.outerHeight();

                        // set icon's vertical position
                        icon.css('top', (element_height - icon_height) / 2);

                        // if icon is to be placed *inside* the element
                        // position the icon accordingly
                        if (plugin.settings.inside)

                            // if icon is to be placed on the right
                            if (plugin.settings.icon_position === 'right') {

                                // place the icon to the right, respecting the element's right padding
                                icon.css('right', plugin.settings.icon_margin !== false ? plugin.settings.icon_margin : original_attributes.padding_right);

                                // also, adjust the element's right padding
                                $element.css('paddingRight', ((plugin.settings.icon_margin !== false ? plugin.settings.icon_margin : original_attributes.padding_right) * 2) + icon_width);

                            // if icon is to be placed on the left
                            } else {

                                // place the icon to the left, respecting the element's left padding
                                icon.css('left', plugin.settings.icon_margin !== false ? plugin.settings.icon_margin : original_attributes.padding_left);

                                // also, adjust the element's left padding
                                $element.css('paddingLeft', ((plugin.settings.icon_margin !== false ? plugin.settings.icon_margin : original_attributes.padding_left) * 2) + icon_width);

                            }

                        // if icon is to be placed to the right of the element
                        // position the icon accordingly
                        else icon.css('left', element_width + (plugin.settings.icon_margin !== false ? plugin.settings.icon_margin : original_attributes.padding_left));

                        // assume the datepicker is not disabled
                        icon.removeClass('Zebra_DatePicker_Icon_Disabled');

                        // if element the datepicker is attached to became disabled, disable the calendar icon, too
                        if ($element.attr('disabled') === 'disabled') icon.addClass('Zebra_DatePicker_Icon_Disabled');

                    }

                }

                // if the "Today" button is to be shown and it makes sense to be shown
                // (the "days" view is available and "today" is not a disabled date)
                show_select_today = (plugin.settings.show_select_today !== false && $.inArray('days', views) > -1 && !is_disabled(current_system_year, current_system_month, current_system_day) ? plugin.settings.show_select_today : false);

                // if we just needed to recompute the things above
                if (update) {

                    // make sure we update these strings, in case they've changed
                    $('.dp_previous', datepicker).html(plugin.settings.navigation[0]);
                    $('.dp_next', datepicker).html(plugin.settings.navigation[1]);
                    $('.dp_time_controls_increase .dp_time_control', datepicker).html(plugin.settings.navigation[2]);
                    $('.dp_time_controls_decrease .dp_time_control', datepicker).html(plugin.settings.navigation[3]);
                    $('.dp_clear', datepicker).html(plugin.settings.lang_clear_date);
                    $('.dp_today', datepicker).html(plugin.settings.show_select_today);

                    // if the date picker is visible at this time
                    if (datepicker.is(':visible')) {

                        // store the default view when opening the date picker
                        k = plugin.settings.view;

                        // make the current view the default view
                        plugin.settings.view = view;

                        // repaint the date picker
                        // (the "FALSE" argument tells the script to not fire the onOpen and onChange events when doing this)
                        plugin.show(false);

                        // if we had to handle the view
                        // restore the default view
                        plugin.settings.view = k;

                    }

                    // don't go further
                    return;

                }

                // update icon/date picker position on resize and/or changing orientation
                $(window).on('resize.Zebra_DatePicker_' + uniqueid + ', orientationchange.Zebra_DatePicker_' + uniqueid, function() {

                    // hide the date picker
                    plugin.hide();

                });

                // generate the container that will hold everything
                var html = '' +
                    '<div class="Zebra_DatePicker">' +
                        '<table class="dp_header dp_actions">' +
                            '<tr>' +
                                '<td class="dp_previous">' + plugin.settings.navigation[0] + (is_iOS ? '&#xFE0E;' : '') + '</td>' +
                                '<td class="dp_caption"></td>' +
                                '<td class="dp_next">' + plugin.settings.navigation[1] + (is_iOS ? '&#xFE0E;' : '') + '</td>' +
                            '</tr>' +
                        '</table>' +
                        '<table class="dp_daypicker' + (plugin.settings.show_week_number ? ' dp_week_numbers' : '') + ' dp_body"></table>' +
                        '<table class="dp_monthpicker dp_body"></table>' +
                        '<table class="dp_yearpicker dp_body"></table>' +
                        '<table class="dp_timepicker dp_body"></table>' +
                        '<table class="dp_footer dp_actions"><tr>' +
                            '<td class="dp_today">' + show_select_today + '</td>' +
                            '<td class="dp_clear">' + plugin.settings.lang_clear_date + '</td>' +
                            '<td class="dp_view_toggler dp_icon">&nbsp;&nbsp;&nbsp;&nbsp;</td>' +
                            '<td class="dp_confirm dp_icon"></td>' +
                        '</tr></table>' +
                    '</div>';

                // create a jQuery object out of the HTML above and create a reference to it
                datepicker = $(html);

                // create references to the different parts of the date picker
                header = $('table.dp_header', datepicker);
                daypicker = $('table.dp_daypicker', datepicker);
                monthpicker = $('table.dp_monthpicker', datepicker);
                yearpicker = $('table.dp_yearpicker', datepicker);
                timepicker = $('table.dp_timepicker', datepicker);
                footer = $('table.dp_footer', datepicker);
                selecttoday = $('td.dp_today', footer);
                cleardate = $('td.dp_clear', footer);
                view_toggler = $('td.dp_view_toggler', footer);
                confirm_selection = $('td.dp_confirm', footer);

                // if date picker is not always visible in a container
                if (!(plugin.settings.always_visible instanceof jQuery))

                    // inject the container into the DOM
                    plugin.settings.container.append(datepicker);

                // otherwise, if element is not disabled
                else if (!$element.attr('disabled')) {

                    // inject the date picker into the designated container element
                    plugin.settings.always_visible.append(datepicker);

                    // and make it visible right away
                    plugin.show();

                }

                // add the mouseover/mousevents to all to the date picker's cells
                // except those that are not selectable
                datepicker
                    .on('mouseover', 'td:not(.dp_disabled)', function() {
                        $(this).addClass('dp_hover');
                    })
                    .on('mouseout', 'td:not(.dp_disabled)', function() {
                        $(this).removeClass('dp_hover');
                    });

                // prevent text selection (prevent accidental select when user clicks too fast)
                disable_text_select(datepicker);

                // event for when clicking the "previous" button
                // (directions are inverted when in RTL mode)
                $(plugin.settings.rtl ? '.dp_next' : '.dp_previous', header).on('click', function() {

                    // if view is "months"
                    // decrement year by one
                    if (view === 'months') selected_year--;

                    // if view is "years"
                    // decrement years by 12
                    else if (view === 'years') selected_year -= 12;

                    // if view is "days"
                    // decrement the month and
                    // if month is out of range
                    else if (--selected_month < 0) {

                        // go to the last month of the previous year
                        selected_month = 11;
                        selected_year--;

                    }

                    // generate the appropriate view
                    manage_views();

                });

                // if "fast_navigation" is enabled, allow clicking the upper label for quickly navigating through months and years
                if (plugin.settings.fast_navigation)

                    // attach a click event to the caption in header
                    $('.dp_caption', header).on('click', function() {

                        // if current view is "days", take the user to the next view, depending on the format
                        if (view === 'days') view = ($.inArray('months', views) > -1 ? 'months' : ($.inArray('years', views) > -1 ? 'years' : 'days'));

                        // if current view is "months", take the user to the next view, depending on the format
                        else if (view === 'months') view = ($.inArray('years', views) > -1 ? 'years' : ($.inArray('days', views) > -1 ? 'days' : 'months'));

                        // if current view is "years", take the user to the next view, depending on the format
                        else view = ($.inArray('days', views) > -1 ? 'days' : ($.inArray('months', views) > -1 ? 'months' : 'years'));

                        // generate the appropriate view
                        manage_views();

                    });

                // event for when clicking the "next" button
                // (directions are inverted when in RTL mode)
                $(plugin.settings.rtl ? '.dp_previous' : '.dp_next', header).on('click', function() {

                    // if view is "months"
                    // increment year by 1
                    if (view === 'months') selected_year++;

                    // if view is "years"
                    // increment years by 12
                    else if (view === 'years') selected_year += 12;

                    // if view is "days"
                    // increment the month and
                    // if month is out of range
                    else if (++selected_month === 12) {

                        // go to the first month of the next year
                        selected_month = 0;
                        selected_year++;

                    }

                    // generate the appropriate view
                    manage_views();

                });

                // attach a click event for the cells in the day picker
                daypicker.on('click', 'td:not(.dp_disabled)', function() {

                    var matches;

                    // if other months are selectable and currently clicked cell contains a class with the cell's date
                    if (plugin.settings.select_other_months && $(this).attr('class') && null !== (matches = $(this).attr('class').match(/date\_([0-9]{4})(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])/)))

                        // use the stored date
                        select_date(matches[1], matches[2] - 1, matches[3], 'days', $(this));

                    // put selected date in the element the plugin is attached to, and hide the date picker
                    else select_date(selected_year, selected_month, to_int($(this).html()), 'days', $(this));

                });

                // attach a click event for the cells in the month picker
                monthpicker.on('click', 'td:not(.dp_disabled)', function() {

                    // get the month we've clicked on
                    var matches = $(this).attr('class').match(/dp\_month\_([0-9]+)/);

                    // set the selected month
                    selected_month = to_int(matches[1]);

                    // if user can select only years and months
                    if ($.inArray('days', views) === -1)

                        // put selected date in the element the plugin is attached to, and hide the date picker
                        select_date(selected_year, selected_month, 1, 'months', $(this));

                    else {

                        // direct the user to the "days" view
                        view = 'days';

                        // if date picker is always visible
                        // empty the value in the text box the date picker is attached to
                        if (plugin.settings.always_visible) $element.val('');

                        // generate the appropriate view
                        manage_views();

                    }

                });

                // attach a click event for the cells in the year picker
                yearpicker.on('click', 'td:not(.dp_disabled)', function() {

                    // set the selected year
                    selected_year = to_int($(this).html());

                    // if user can select only years
                    if ($.inArray('months', views) === -1)

                        // put selected date in the element the plugin is attached to, and hide the date picker
                        select_date(selected_year, 0, 1, 'years', $(this));

                    else {

                        // direct the user to the "months" view
                        view = 'months';

                        // if date picker is always visible
                        // empty the value in the text box the date picker is attached to
                        if (plugin.settings.always_visible) $element.val('');

                        // generate the appropriate view
                        manage_views();

                    }

                });

                // function to execute when the "Today" button is clicked
                selecttoday.on('click', function(e) {

                    // date might have changed since we opened the date picker, so always use the current date
                    var date = plugin.settings.current_date !== false ? new Date(plugin.settings.current_date) : new Date();

                    e.preventDefault();

                    // select the current date
                    select_date(date.getFullYear(), date.getMonth(), date.getDate(), 'days', $('.dp_current', daypicker));

                });

                // function to execute when the "Clear" button is clicked
                cleardate.on('click', function(e) {

                    e.preventDefault();

                    // clear the element's value
                    $element.val('');

                    // reset these values
                    default_day = null; default_month = null; default_year = null;

                    // if date picker is not always visible
                    if (!plugin.settings.always_visible) {

                        // reset these values
                        selected_month = null; selected_year = null;

                    // if date picker is always visible
                    } else

                        // remove the "selected" class from all cells that have it
                        $('td.dp_selected', datepicker).removeClass('dp_selected');

                    // give the focus back to the parent element
                    $element.focus();

                    // hide the date picker
                    plugin.hide();

                    // if a callback function exists for when clearing a date
                    if (plugin.settings.onClear && typeof plugin.settings.onClear === 'function')

                        // execute the callback function and pass as argument the element the plugin is attached to
                        plugin.settings.onClear.call($element);

                });

                // function to execute when the clock/calendar button is clicked in the footer
                view_toggler.on('click', function() {

                    // if we're not in the time picker mode
                    if (view !== 'time') {

                        // switch to time picker mode
                        view = 'time';
                        manage_views();

                    // if we are already in the time picker mode,
                    // switch back to the standard view
                    // (let the click on the header's caption handle things)
                    } else $('.dp_caption', header).trigger('click');

                });

                // when the "confirm selection" button is clicked, hide the date picker
                // (visible only when in the "time" view)
                confirm_selection.on('click', function() {

                    // as users may click this before making any adjustments to time, simulate time adjustment so that
                    // a value is selected
                    $('.dp_time_controls_increase td', timepicker).trigger('click');
                    $('.dp_time_controls_decrease td', timepicker).trigger('click');

                    // if a callback function exists for when selecting a date
                    if (plugin.settings.onSelect && typeof plugin.settings.onSelect === 'function') {

                        var js_date = new Date(selected_year, selected_month, default_day,
                            (timepicker_config && timepicker_config.hours ? selected_hour + (timepicker_config.ampm && ((selected_ampm === 'pm' && selected_hour < 12) || (selected_ampm === 'am' && selected_hour === 12)) ? 12 : 0) : 0),
                            (timepicker_config && timepicker_config.minutes ? selected_minute : 0),
                            (timepicker_config && timepicker_config.seconds ? selected_second : 0)
                        );

                        // execute the callback function
                        // make "this" inside the callback function refer to the element the date picker is attached to, as a jQuery object
                        plugin.settings.onSelect.call($element, format(js_date), selected_year + '-' + str_pad(selected_month + 1, 2) + '-' + str_pad(default_day, 2) + (timepicker_config ? ' ' + str_pad(js_date.getHours(), 2) + ':' + str_pad(js_date.getMinutes(), 2) + ':' + str_pad(js_date.getSeconds(), 2) : ''), js_date);

                    }

                    plugin.hide();

                });

                // handle value increases/decreases on the time picker
                datepicker.on('mousedown', '.dp_time_controls_increase td, .dp_time_controls_decrease td', function(e) {

                    e.stopPropagation();

                    var element = this,
                        count = 0;

                    // trigger once
                    manage_timer_controls(element);

                    // as long as the mouse button is pressed
                    timer_interval = setInterval(function() {

                        // update value
                        manage_timer_controls(element);

                        // if we updated 5 times
                        if (++count > 5) {

                            // increase speed
                            clearInterval(timer_interval);
                            timer_interval = setInterval(function() {

                                // update value
                                manage_timer_controls(element);

                                // if we updated more times
                                if (++count > 10) {

                                    // increase speed
                                    clearInterval(timer_interval);
                                    timer_interval = setInterval(function() {

                                        // update value
                                        manage_timer_controls(element);

                                    }, 100, element);

                                }

                            }, 200, element);

                        }

                    }, 400, element);

                });

                // clear timers
                datepicker.on('mouseup mouseleave', '.dp_time_controls_increase td, .dp_time_controls_decrease td', function() {
                    clearInterval(timer_interval);
                });

                // if date picker is not always visible in a container
                if (!(plugin.settings.always_visible instanceof jQuery)) {

                    // if we dragged the screen
                    $(document).on('touchmove.Zebra_DatePicker_' + uniqueid, function() {

                        // set this flag to TRUE
                        touchmove = true;

                    });

                    // whenever anything is clicked on the page
                    $(document).on('mousedown.Zebra_DatePicker_' + uniqueid + ' touchend.Zebra_DatePicker_' + uniqueid, function(e) {

                        // if this happened on a touch-enabled device and it represents the end of finger movement instead of a tap
                        // set the "touchmove" flag to FALSE and don't go further
                        if (e.type === 'touchend' && touchmove) {

                            // we now know that this is a touch enabled device
                            is_touch = true;

                            return (touchmove = false);

                        }

                        // always set this to FALSE here
                        touchmove = false;

                        // if
                        if (

                            // date picker is visible
                            !datepicker.hasClass('dp_hidden') &&

                            (
                                // date picker opens only on interacting with the icon, icon exists, but it is not the clicked element
                                (plugin.settings.open_icon_only && plugin.icon && $(e.target).get(0) !== plugin.icon.get(0)) ||

                                // date picker doesn't open only on interacting with the icon but the clicked element it's not the icon nor the parent element
                                (!plugin.settings.open_icon_only && $(e.target).get(0) !== $element.get(0) && (!plugin.icon || $(e.target).get(0) !== plugin.icon.get(0)))

                            ) &&

                            // and the click is not inside the calendar
                            $(e.target).closest('.Zebra_DatePicker').length === 0

                        // hide the date picker
                        ) plugin.hide(true);

                    });

                    // whenever a key is pressed on the page
                    $(document).on('keyup.Zebra_DatePicker_' + uniqueid, function(e) {

                        // if the date picker is visible
                        // and the pressed key is ESC
                        // hide the date picker
                        if (!datepicker.hasClass('dp_hidden') && e.which === 27) plugin.hide();

                    });

                }

                // last thing is to pre-render some of the date picker right away
                manage_views();

            },

            /**
             *  Checks if a string represents a valid date according to the format defined by the "format" property.
             *
             *  @param  string  str_date    A string representing a date, formatted accordingly to the "format" property.
             *                              For example, if "format" is "Y-m-d" the string should look like "2011-06-01"
             *
             *  @return mixed               Returns a JavaScript Date object if string represents a valid date according
             *                              formatted according to the "format" property, or FALSE otherwise.
             *
             *  @access private
             */
            check_date = function(str_date) {

                // treat argument as a string
                str_date += '';

                // if value is given
                if ($.trim(str_date) !== '') {

                    var

                        // prepare the format by removing white space from it
                        // and also escape characters that could have special meaning in a regular expression
                        format = escape_regexp(plugin.settings.format),

                        // allowed characters in date's format
                        format_chars = ['d', 'D', 'j', 'l', 'N', 'S', 'w', 'F', 'm', 'M', 'n', 'Y', 'y', 'G', 'g', 'H', 'h', 'i', 's', 'a', 'A'],

                        // "matches" will contain the characters defining the date's format
                        matches = [],

                        // "regexp" will contain the regular expression built for each of the characters used in the date's format
                        regexp = [],

                        // "position" will contain the position of the character found in the date's format
                        position = null,

                        // "segments" will contain the matches of the regular expression
                        segments = null,

                        date, i;

                    // iterate through the allowed characters in date's format
                    for (i = 0; i < format_chars.length; i++)

                        // if character is found in the date's format
                        if ((position = format.indexOf(format_chars[i])) > -1)

                            // save it, alongside the character's position
                            matches.push({
                                character: format_chars[i],
                                position: position
                            });

                    // sort characters defining the date's format based on their position, ascending
                    matches.sort(function(a, b) { return a.position - b.position; });

                    // iterate through the characters defining the date's format
                    $.each(matches, function(index, match) {

                        // add to the array of regular expressions, based on the character
                        switch (match.character) {

                            case 'd': regexp.push('0[1-9]|[12][0-9]|3[01]'); break;
                            case 'D': regexp.push('[a-z]{3}'); break;
                            case 'j': regexp.push('[1-9]|[12][0-9]|3[01]'); break;
                            case 'l': regexp.push('[a-z\u00C0-\u024F]+'); break;
                            case 'N': regexp.push('[1-7]'); break;
                            case 'S': regexp.push('st|nd|rd|th'); break;
                            case 'w': regexp.push('[0-6]'); break;
                            case 'F': regexp.push('[a-z]+'); break;
                            case 'm': regexp.push('0[1-9]|1[012]'); break;
                            case 'M': regexp.push('[a-z]{3}'); break;
                            case 'n': regexp.push('[1-9]|1[012]'); break;
                            case 'Y': regexp.push('[0-9]{4}'); break;
                            case 'y': regexp.push('[0-9]{2}'); break;
                            case 'G': regexp.push('[1-9]|1[0-9]|2[0123]'); break;
                            case 'g': regexp.push('[0-9]|1[012]'); break;
                            case 'H': regexp.push('0[0-9]|1[0-9]|2[0123]'); break;
                            case 'h': regexp.push('0[0-9]|1[012]'); break;
                            case 'i': regexp.push('0[0-9]|[12345][0-9]'); break;
                            case 's': regexp.push('0[0-9]|[12345][0-9]'); break;
                            case 'a': regexp.push('am|pm'); break;
                            case 'A': regexp.push('AM|PM'); break;

                        }

                    });

                    // if we have an array of regular expressions
                    if (regexp.length) {

                        // we will replace characters in the date's format in reversed order
                        matches.reverse();

                        // iterate through the characters in date's format
                        $.each(matches, function(index, match) {

                            // replace each character with the appropriate regular expression
                            format = format.replace(match.character, '(' + regexp[regexp.length - index - 1] + ')');

                        });

                        // the final regular expression
                        regexp = new RegExp('^' + format + '$', 'ig');

                        // if regular expression was matched
                        if ((segments = regexp.exec(str_date))) {

                            // check if date is a valid date (i.e. there's no February 31)

                            var tmpdate = new Date(),
                                original_day = 1,
                                original_month = tmpdate.getMonth() + 1,
                                original_year = tmpdate.getFullYear(),
                                original_hours = tmpdate.getHours(),
                                original_minutes = tmpdate.getMinutes(),
                                original_seconds = tmpdate.getSeconds(),
                                original_ampm,
                                english_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                                english_months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                iterable,

                                // by default, we assume the date is valid
                                valid = true;

                            // reverse back the characters in the date's format
                            matches.reverse();

                            // iterate through the characters in the date's format
                            $.each(matches, function(index, match) {

                                // if the date is not valid, don't look further
                                if (!valid) return true;

                                // based on the character
                                switch (match.character) {

                                    case 'm':
                                    case 'n':

                                        // extract the month from the value entered by the user
                                        original_month = to_int(segments[index + 1]);

                                        break;

                                    case 'd':
                                    case 'j':

                                        // extract the day from the value entered by the user
                                        original_day = to_int(segments[index + 1]);

                                        break;

                                    case 'D':
                                    case 'l':
                                    case 'F':
                                    case 'M':

                                        // if day is given as day name, we'll check against the names in the used language
                                        if (match.character === 'D' || match.character === 'l') iterable = plugin.settings.days;

                                        // if month is given as month name, we'll check against the names in the used language
                                        else iterable = plugin.settings.months;

                                        // by default, we assume the day or month was not entered correctly
                                        valid = false;

                                        // iterate through the month/days in the used language
                                        $.each(iterable, function(key, value) {

                                            // if month/day was entered correctly, don't look further
                                            if (valid) return true;

                                            // if month/day was entered correctly
                                            if (segments[index + 1].toLowerCase() === value.substring(0, (match.character === 'D' || match.character === 'M' ? 3 : value.length)).toLowerCase()) {

                                                // extract the day/month from the value entered by the user
                                                switch (match.character) {

                                                    case 'D': segments[index + 1] = english_days[key].substring(0, 3); break;
                                                    case 'l': segments[index + 1] = english_days[key]; break;
                                                    case 'F': segments[index + 1] = english_months[key]; original_month = key + 1; break;
                                                    case 'M': segments[index + 1] = english_months[key].substring(0, 3); original_month = key + 1; break;

                                                }

                                                // day/month value is valid
                                                valid = true;

                                            }

                                        });

                                        break;

                                    case 'Y':

                                        // extract the year from the value entered by the user
                                        original_year = to_int(segments[index + 1]);

                                        break;

                                    case 'y':

                                        // extract the year from the value entered by the user
                                        original_year = to_int('20' + to_int(segments[index + 1]));

                                        break;

                                    case 'G':
                                    case 'H':
                                    case 'g':
                                    case 'h':

                                        // extract the hours from the value entered by the user
                                        original_hours = to_int(segments[index + 1]);
                                        break;

                                    case 'i':

                                        // extract the minutes from the value entered by the user
                                        original_minutes = to_int(segments[index + 1]);
                                        break;

                                    case 's':

                                        // extract the seconds from the value entered by the user
                                        original_seconds = to_int(segments[index + 1]);
                                        break;

                                    case 'a':
                                    case 'A':

                                        // extract the seconds from the value entered by the user
                                        original_ampm = segments[index + 1].toLowerCase();
                                        break;

                                }

                            });

                            // if everything is ok so far
                            if (valid) {

                                // generate a Date object using the values entered by the user
                                // (handle also the case when original_month and/or original_day are undefined - i.e date format is "Y-m" or "Y")
                                date = new Date(original_year, (original_month || 1) - 1, original_day || 1, original_hours + (original_ampm === 'pm' && original_hours !== 12 ? 12 : (original_ampm === 'am' && original_hours === 12 ? -12 : 0)), original_minutes, original_seconds);

                                // if, after that, the date is the same as the date entered by the user
                                if (date.getFullYear() === original_year && date.getDate() === (original_day || 1) && date.getMonth() === ((original_month || 1) - 1))

                                    // return the date as JavaScript date object
                                    return date;

                            }

                        }

                    }

                    // if script gets this far, return false as something must've went wrong
                    return false;

                }

            },

            /**
             *  Prevents the possibility of selecting text on a given element. Used on the "previous" and "next" buttons
             *  where text might get accidentally selected when user quickly clicks on the buttons.
             *
             *  Code by http://chris-barr.com/index.php/entry/disable_text_selection_with_jquery/
             *
             *  @param  jQuery Element  el  A jQuery element on which to prevents text selection.
             *
             *  @return void
             *
             *  @access private
             */
            disable_text_select = function(el) {

                // if browser is Firefox
                if (browser.name === 'firefox') el.css('MozUserSelect', 'none');

                // if browser is Internet Explorer
                else if (browser.name === 'explorer') $(document).on('selectstart', el, function() { return false; });

                // for the other browsers
                else el.mousedown(function() { return false; });

            },

            /**
             *  Escapes special characters in a string, preparing it for use in a regular expression.
             *
             *  @param  string  str     The string in which special characters should be escaped.
             *
             *  @return string          Returns the string with escaped special characters.
             *
             *  @access private
             */
            escape_regexp = function(str) {

                // return string with special characters escaped
                return str.replace(/([-.,*+?^${}()|[\]\/\\])/g, '\\$1');

            },

            /**
             *  Formats a JavaScript date object to the format specified by the "format" property.
             *  Code taken from http://electricprism.com/aeron/calendar/
             *
             *  @param  date    date    A valid JavaScript date object
             *
             *  @return string          Returns a string containing the formatted date
             *
             *  @access private
             */
            format = function(date) {

                var result = '',

                    // extract parts of the date:
                    // day number, 1 - 31
                    j = date.getDate(),

                    // day of the week, 0 - 6, Sunday - Saturday
                    w = date.getDay(),

                    // the name of the day of the week Sunday - Saturday
                    l = plugin.settings.days[w],

                    // the month number, 1 - 12
                    n = date.getMonth() + 1,

                    // the month name, January - December
                    f = plugin.settings.months[n - 1],

                    // the year (as a string)
                    y = date.getFullYear() + '',

                    // the hour, 0-23
                    h = date.getHours(),

                    // the hour in 12 hours format
                    h12 = h % 12 === 0 ? 12 : h % 12,

                    // the minute, 0-59
                    m = date.getMinutes(),

                    // the second, 0-59
                    s = date.getSeconds(),

                    // am/pm
                    a = (h >= 12 ? 'pm' : 'am'),

                    i, chr;

                // iterate through the characters in the format
                for (i = 0; i < plugin.settings.format.length; i++) {

                    // extract the current character
                    chr = plugin.settings.format.charAt(i);

                    // see what character it is
                    switch (chr) {

                        // year as two digits
                        case 'y': y = y.substr(2);  // jshint ignore:line

                        // year as four digits
                        // falls through
                        case 'Y': result += y; break;

                        // month number, prefixed with 0
                        case 'm': n = str_pad(n, 2);    // jshint ignore:line

                        // month number, not prefixed with 0
                        // falls through
                        case 'n': result += n; break;

                        // month name, three letters
                        case 'M': f = ($.isArray(plugin.settings.months_abbr) && undefined !== plugin.settings.months_abbr[n - 1] ? plugin.settings.months_abbr[n - 1] : plugin.settings.months[n - 1].substr(0, 3));   // jshint ignore:line

                        // full month name
                        // falls through
                        case 'F': result += f; break;

                        // day number, prefixed with 0
                        case 'd': j = str_pad(j, 2);    // jshint ignore:line

                        // day number not prefixed with 0
                        // falls through
                        case 'j': result += j; break;

                        // day name, three letters
                        case 'D': l = ($.isArray(plugin.settings.days_abbr) && undefined !== plugin.settings.days_abbr[w] ? plugin.settings.days_abbr[w] : plugin.settings.days[w].substr(0, 3));   // jshint ignore:line

                        // full day name
                        // falls through
                        case 'l': result += l; break;

                        // ISO-8601 numeric representation of the day of the week, 1 - 7
                        case 'N': w++;  // jshint ignore:line

                        // day of the week, 0 - 6
                        // falls through
                        case 'w': result += w; break;

                        // English ordinal suffix for the day of the month, 2 characters
                        // (st, nd, rd or th (works well with j))
                        case 'S':

                            if (j % 10 === 1 && j !== 11) result += 'st';

                            else if (j % 10 === 2 && j !== 12) result += 'nd';

                            else if (j % 10 === 3 && j !== 13) result += 'rd';

                            else result += 'th';

                            break;

                        // hour in 12 hours format, without leading zeros
                        case 'g': result += h12; break;

                        // hour in 12 hours format, with leading zeros
                        case 'h': result += str_pad(h12, 2); break;

                        // hour in 24 hours format, without leading zeros
                        case 'G': result += h; break;

                        // hour in 24 hours format, with leading zeros
                        case 'H': result += str_pad(h, 2); break;

                        // minutes, with leading zeros
                        case 'i': result += str_pad(m, 2); break;

                        // seconds, with leading zeros
                        case 's': result += str_pad(s, 2); break;

                        // am/pm, lowercase
                        case 'a': result += a; break;

                        // am/pm, uppercase
                        case 'A': result += a.toUpperCase(); break;

                        // this is probably the separator
                        default: result += chr;

                    }

                }

                // return formated date
                return result;

            },

            /**
             *  Generates the day picker view, and displays it
             *
             *  @return void
             *
             *  @access private
             */
            generate_daypicker = function() {

                var

                    // get the number of days in the selected month
                    days_in_month = new Date(selected_year, selected_month + 1, 0).getDate(),

                    // get the selected month's starting day (from 0 to 6)
                    first_day = new Date(selected_year, selected_month, 1).getDay(),

                    // how many days are there in the previous month
                    days_in_previous_month = new Date(selected_year, selected_month, 0).getDate(),

                    // how many days are there to be shown from the previous month
                    days_from_previous_month = first_day - plugin.settings.first_day_of_week,

                    i, html, day, real_date, real_year, real_month, real_day, weekday, class_name, custom_class_name, is_weekend, rtl_offset;

                // the final value of how many days are there to be shown from the previous month
                days_from_previous_month = days_from_previous_month < 0 ? 7 + days_from_previous_month : days_from_previous_month;

                // manage header caption and enable/disable navigation buttons if necessary
                manage_header(plugin.settings.header_captions.days);

                // start generating the HTML
                html = '<tr>';

                // if a column featuring the number of the week is to be shown
                if (plugin.settings.show_week_number)

                    // column title
                    html += '<th>' + plugin.settings.show_week_number + '</th>';

                // name of week days
                // show the abbreviated day names (or only the first two letters of the full name if no abbreviations are specified)
                // and also, take in account the value of the "first_day_of_week" property
                for (i = 0; i < 7; i++) {

                    // the week day's number; account for RTL
                    day = (plugin.settings.first_day_of_week + (plugin.settings.rtl ? 6 - i : i)) % 7;

                    html += '<th>' + ($.isArray(plugin.settings.days_abbr) && undefined !== plugin.settings.days_abbr[day] ? plugin.settings.days_abbr[day] : plugin.settings.days[day].substr(0, 2)) + '</th>';

                }

                html += '</tr><tr>';

                // the calendar shows a total of 42 days
                for (i = 0; i < 42; i++) {

                    // we need some additional math when showing an RTL calendar
                    rtl_offset = (plugin.settings.rtl ? 6 - ((i % 7) * 2) : 0);

                    // seven days per row
                    if (i > 0 && i % 7 === 0) html += '</tr><tr>';

                    // if week number is to be shown
                    if (i % 7 === 0 && plugin.settings.show_week_number)

                        // show ISO 8601 week number
                        html += '<th>' + get_week_number(new Date(selected_year, selected_month, (i - days_from_previous_month + 1))) + '</th>';

                    // the number of the day in month
                    day = rtl_offset + (i - days_from_previous_month + 1);

                    // if dates in previous/next month can be selected, and this is one of those days
                    if (plugin.settings.select_other_months && (i < days_from_previous_month || day > days_in_month)) {

                        // use the Date object to normalize the date
                        // for example, 2011 05 33 will be transformed to 2011 06 02
                        real_date = new Date(selected_year, selected_month, day);
                        real_year = real_date.getFullYear();
                        real_month = real_date.getMonth();
                        real_day = real_date.getDate();

                        // extract normalized date parts and merge them
                        real_date = real_year + str_pad(real_month + 1, 2) + str_pad(real_day, 2);

                    }

                    // get the week day (0 to 6, Sunday to Saturday)
                    weekday = (plugin.settings.first_day_of_week + i) % 7;

                    // is day on a weekend?
                    is_weekend = ($.inArray(weekday, plugin.settings.weekend_days) > -1);

                    // if this is a day from the previous month
                    if ((plugin.settings.rtl && day < 1) || (!plugin.settings.rtl && i < days_from_previous_month))

                        html += '<td class="dp_not_in_month ' + (is_weekend ? 'dp_weekend ' : '') + (plugin.settings.select_other_months && !is_disabled(real_year, real_month, real_day) ? 'date_' + real_date : 'dp_disabled') + '">' + (plugin.settings.select_other_months || plugin.settings.show_other_months ? str_pad(rtl_offset + days_in_previous_month - days_from_previous_month + i + 1, plugin.settings.zero_pad ? 2 : 0) : '&nbsp;') + '</td>';

                    // if this is a day from the next month
                    else if (day > days_in_month)

                        html += '<td class="dp_not_in_month ' + (is_weekend ? 'dp_weekend ' : '') + (plugin.settings.select_other_months && !is_disabled(real_year, real_month, real_day) ? 'date_' + real_date : 'dp_disabled') + '">' + (plugin.settings.select_other_months || plugin.settings.show_other_months ? str_pad(day - days_in_month, plugin.settings.zero_pad ? 2 : 0) : '&nbsp;') + '</td>';

                    // if this is a day from the current month
                    else {

                        class_name = '';

                        // custom class, if any
                        custom_class_name = get_custom_class(selected_year, selected_month, day);

                        // if day is in weekend
                        if (is_weekend) class_name = ' dp_weekend';

                        // highlight the current system date
                        if (selected_month === current_system_month && selected_year === current_system_year && current_system_day === day) class_name += ' dp_current';

                        // apply custom class, if a custom class exists
                        if (custom_class_name !== '') class_name += ' ' + custom_class_name;

                        // highlight the currently selected date
                        if (selected_month === default_month && selected_year === default_year && default_day === day) class_name += ' dp_selected';

                        // if date needs to be disabled
                        if (is_disabled(selected_year, selected_month, day)) class_name += ' dp_disabled';

                        // print the day of the month (if "day" is NaN, use an empty string instead)
                        html += '<td' + (class_name !== '' ? ' class="' + $.trim(class_name) + '"' : '') + '>' + ((plugin.settings.zero_pad ? str_pad(day, 2) : day) || '&nbsp;') + '</td>';

                    }

                }

                // wrap up generating the day picker
                html += '</tr>';

                // inject the day picker into the DOM
                daypicker.html($(html));

                // if date picker is always visible
                if (plugin.settings.always_visible)

                    // cache all the cells
                    // (we need them so that we can easily remove the "dp_selected" class from all of them when user selects a date)
                    daypicker_cells = $('td:not(.dp_disabled)', daypicker);

                // make the day picker visible
                daypicker.show();

            },

            /**
             *  Generates the month picker view, and displays it
             *
             *  @return void
             *
             *  @access private
             */
            generate_monthpicker = function() {

                // manage header caption and enable/disable navigation buttons if necessary
                manage_header(plugin.settings.header_captions.months);

                // start generating the HTML
                var html = '<tr>', i, class_name, month;

                // iterate through all the months
                for (i = 0; i < 12; i++) {

                    // three month per row
                    if (i > 0 && i % 3 === 0) html += '</tr><tr>';

                    // the month, taking RTL into account
                    month = plugin.settings.rtl ? 2 + i - (2 * (i % 3)) : i;

                    class_name = 'dp_month_' + month;

                    // if month needs to be disabled
                    if (is_disabled(selected_year, month)) class_name += ' dp_disabled';

                    // else, if a date is already selected and this is that particular month, highlight it
                    else if (default_month !== false && default_month === month && selected_year === default_year) class_name += ' dp_selected';

                    // else, if this the current system month, highlight it
                    else if (current_system_month === month && current_system_year === selected_year) class_name += ' dp_current';

                    // first three letters of the month's name
                    html += '<td class="' + $.trim(class_name) + '">' + ($.isArray(plugin.settings.months_abbr) && undefined !== plugin.settings.months_abbr[month] ? plugin.settings.months_abbr[month] : plugin.settings.months[month].substr(0, 3)) + '</td>';

                }

                // wrap up
                html += '</tr>';

                // inject into the DOM
                monthpicker.html($(html));

                // if date picker is always visible
                if (plugin.settings.always_visible)

                    // cache all the cells
                    // (we need them so that we can easily remove the "dp_selected" class from all of them when user selects a month)
                    monthpicker_cells = $('td:not(.dp_disabled)', monthpicker);

                // make the month picker visible
                monthpicker.show();

            },

            /**
             *  Generates the time picker view, and displays it
             *
             *  @return void
             *
             *  @access private
             */
            generate_timepicker = function() {

                var html, condensed = (timepicker_config.hours && timepicker_config.minutes && timepicker_config.seconds && timepicker_config.ampm);

                // the HTML
                html = '<tr class="dp_time_controls_increase' + (condensed ? ' dp_time_controls_condensed' : '') + '">' +
                    (plugin.settings.rtl && timepicker_config.ampm ? '<td class="dp_time_ampm dp_time_control">' + plugin.settings.navigation[2] + '</td>' : '') +
                    (timepicker_config.hours ? '<td class="dp_time_hour dp_time_control">' + plugin.settings.navigation[2] + '</td>' : '') +
                    (timepicker_config.minutes ? '<td class="dp_time_minute dp_time_control">' + plugin.settings.navigation[2] + '</td>' : '') +
                    (timepicker_config.seconds ? '<td class="dp_time_second dp_time_control">' + plugin.settings.navigation[2] + '</td>' : '') +
                    (!plugin.settings.rtl && timepicker_config.ampm ? '<td class="dp_time_ampm dp_time_control">' + plugin.settings.navigation[2] + '</td>' : '') +
                    '</tr>';

                html += '<tr class="dp_time_segments' + (condensed ? ' dp_time_controls_condensed' : '') + '">';

                if (plugin.settings.rtl && timepicker_config.ampm) html += '<td class="dp_time_ampm dp_disabled' + (timepicker_config.hours || timepicker_config.minutes || timepicker_config.seconds ? ' dp_time_separator' : '') + '"><div>' + selected_ampm.toUpperCase() + '</div></td>';
                if (timepicker_config.hours) html += '<td class="dp_time_hours dp_disabled' + (timepicker_config.minutes || timepicker_config.seconds || (!plugin.settings.rtl && timepicker_config.ampm) ? ' dp_time_separator' : '') + '"><div>' + (timepicker_config.hour_format === 'h' || timepicker_config.hour_format === 'H' ? str_pad(selected_hour, 2) : selected_hour) + '</div></td>';
                if (timepicker_config.minutes) html += '<td class="dp_time_minutes dp_disabled' + (timepicker_config.seconds || (!plugin.settings.rtl && timepicker_config.ampm) ? ' dp_time_separator' : '') + '"><div>' + str_pad(selected_minute, 2) + '</div></td>';
                if (timepicker_config.seconds) html += '<td class="dp_time_seconds dp_disabled' + (!plugin.settings.rtl && timepicker_config.ampm ? ' dp_time_separator' : '') + '"><div>' + str_pad(selected_second, 2) + '</div></td>';
                if (!plugin.settings.rtl && timepicker_config.ampm) html += '<td class="dp_time_ampm dp_disabled">' + selected_ampm.toUpperCase() + '</td>';

                html += '</tr>';

                html += '<tr class="dp_time_controls_decrease' + (condensed ? ' dp_time_controls_condensed' : '') + '">' +
                    (plugin.settings.rtl && timepicker_config.ampm ? '<td class="dp_time_ampm dp_time_control">' + plugin.settings.navigation[3] + '</td>' : '') +
                    (timepicker_config.hours ? '<td class="dp_time_hour dp_time_control">' + plugin.settings.navigation[3] + '</td>' : '') +
                    (timepicker_config.minutes ? '<td class="dp_time_minute dp_time_control">' + plugin.settings.navigation[3] + '</td>' : '') +
                    (timepicker_config.seconds ? '<td class="dp_time_second dp_time_control">' + plugin.settings.navigation[3] + '</td>' : '') +
                    (!plugin.settings.rtl && timepicker_config.ampm ? '<td class="dp_time_ampm dp_time_control">' + plugin.settings.navigation[3] + '</td>' : '') +
                    '</tr>';

                // inject into the DOM
                timepicker.html($(html));

                // make the time picker visible
                timepicker.show();

            },

            /**
             *  Generates the year picker view, and displays it
             *
             *  @return void
             *
             *  @access private
             */
            generate_yearpicker = function() {

                // manage header caption and enable/disable navigation buttons if necessary
                manage_header(plugin.settings.header_captions.years);

                // start generating the HTML
                var html = '<tr>', i, class_name, year;

                // we're showing 12 years at a time, current year in the middle
                for (i = 0; i < 12; i++) {

                    // three years per row
                    if (i > 0 && i % 3 === 0) html += '</tr><tr>';

                    // the year, taking RTL into account
                    year = plugin.settings.rtl ? 2 + i - (2 * (i % 3)) : i;

                    class_name = '';

                    // if year needs to be disabled
                    if (is_disabled(selected_year - 7 + year)) class_name += ' dp_disabled';

                    // else, if a date is already selected and this is that particular year, highlight it
                    else if (default_year && default_year === selected_year - 7 + year) class_name += ' dp_selected';

                    // else, if this is the current system year, highlight it
                    else if (current_system_year === (selected_year - 7 + year)) class_name += ' dp_current';

                    // first three letters of the month's name
                    html += '<td' + ($.trim(class_name) !== '' ? ' class="' + $.trim(class_name) + '"' : '') + '>' + (selected_year - 7 + year) + '</td>';

                }

                // wrap up
                html += '</tr>';

                // inject into the DOM
                yearpicker.html($(html));

                // if date picker is always visible
                if (plugin.settings.always_visible)

                    // cache all the cells
                    // (we need them so that we can easily remove the "dp_selected" class from all of them when user selects a year)
                    yearpicker_cells = $('td:not(.dp_disabled)', yearpicker);

                // make the year picker visible
                yearpicker.show();

            },

            /**
             *  Return the name of a custom class to be applied to the given date.
             *
             *  @return string  The name of a custom class to be applied to the given date, or an empty string if no custom
             *                  class needs to be applied.
             *
             *  @param  integer     year    The year to check
             *  @param  integer     month   The month to check
             *  @param  integer     day     The day to check
             *
             *  @access private
             */
            get_custom_class = function(year, month, day) {

                var class_name, i, found;

                // if month is given as argument, increment it (as JavaScript uses 0 for January, 1 for February...)
                if (typeof month !== 'undefined') month = month + 1;

                // iterate through the custom classes
                for (i in custom_class_names) {

                    // the class name we're currently checking
                    class_name = custom_class_names[i]; found = false;

                    // if there are any custom classes defined
                    if ($.isArray(custom_classes[class_name]))

                        // iterate through the rules for which the custom class to be applied
                        $.each(custom_classes[class_name], function() {

                            // if a custom class needs to be applied to the date we're checking, don't look further
                            if (found) return;

                            var rule = this, weekday;

                            // if the rules apply for the current year
                            if ($.inArray(year, rule[2]) > -1 || $.inArray('*', rule[2]) > -1)

                                // if the rules apply for the current month
                                if ((typeof month !== 'undefined' && $.inArray(month, rule[1]) > -1) || $.inArray('*', rule[1]) > -1)

                                    // if the rules apply for the current day
                                    if ((typeof day !== 'undefined' && $.inArray(day, rule[0]) > -1) || $.inArray('*', rule[0]) > -1) {

                                        // if custom class is to be applied whatever the day
                                        // don't look any further
                                        if ($.inArray('*', rule[3]) > -1) return (found = class_name);

                                        // get the weekday
                                        weekday = new Date(year, month - 1, day).getDay();

                                        // if custom class is to be applied to weekday
                                        // don't look any further
                                        if ($.inArray(weekday, rule[3]) > -1) return (found = class_name);

                                    }

                        });

                    // if a custom class needs to be applied to the date we're checking, don't look further
                    if (found) return found;

                }

                // return what we've found
                return found || '';

            },

            /**
             *  Calculate the ISO 8601 week number for a given date.
             *
             *  Code is based on the algorithm at http://www.tondering.dk/claus/cal/week.php#calcweekno
             */
            get_week_number = function(date) {

                var y = date.getFullYear(),
                    m = date.getMonth() + 1,
                    d = date.getDate(),
                    a, b, c, s, e, f, g, n, w;

                /* jshint ignore:start */

                // if month jan. or feb.
                if (m < 3) {

                    a = y - 1;
                    b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
                    c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
                    s = b - c;
                    e = 0;
                    f = d - 1 + 31 * (m - 1);

                // if month mar. through dec.
                } else {

                    a = y;
                    b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
                    c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
                    s = b - c;
                    e = s + 1;
                    f = d + ((153 * (m - 3) + 2) / 5 | 0) + 58 + s;

                }

                g = (a + b) % 7;
                // ISO Weekday (0 is monday, 1 is tuesday etc.)
                d = (f + g - e) % 7;
                n = f + 3 - d;

                if (n < 0) w = 53 - ((g - s) / 5 | 0);

                else if (n > 364 + s) w = 1;

                else w = (n / 7 | 0) + 1;

                /* jshint ignore:end */

                return w;

            },

            /**
             *  Generates an iFrame shim in Internet Explorer 6 so that the date picker appears above select boxes.
             *
             *  @return void
             *
             *  @access private
             */
            iframeShim = function(action) {

                var zIndex, offset;

                // this is necessary only if browser is Internet Explorer 6
                if (browser.name === 'explorer' && browser.version === 6) {

                    // if the iFrame was not yet created
                    // "undefined" evaluates as FALSE
                    if (!shim) {

                        // the iFrame has to have the element's zIndex minus 1
                        zIndex = to_int(datepicker.css('zIndex')) - 1;

                        // create the iFrame
                        shim = $('<iframe>', {
                            src:            'javascript:document.write("")',
                            scrolling:      'no',
                            frameborder:    0,
                            css: {
                                zIndex:     zIndex,
                                position:   'absolute',
                                top:        -1000,
                                left:       -1000,
                                width:      datepicker.outerWidth(),
                                height:     datepicker.outerHeight(),
                                filter:     'progid:DXImageTransform.Microsoft.Alpha(opacity=0)',
                                display:    'none'
                            }
                        });

                        // inject iFrame into DOM
                        $('body').append(shim);

                    }

                    // what do we need to do
                    switch (action) {

                        // hide the iFrame?
                        case 'hide':

                            // set the iFrame's display property to "none"
                            shim.hide();

                            break;

                        // show the iFrame?
                        default:

                            // get date picker top and left position
                            offset = datepicker.offset();

                            // position the iFrame shim right underneath the date picker
                            // and set its display to "block"
                            shim.css({
                                top:        offset.top,
                                left:       offset.left,
                                display:    'block'
                            });

                    }

                }

            },

            /**
             *  Checks if, according to the restrictions of the calendar and/or the values defined by the "disabled_dates"
             *  property, a day, a month or a year needs to be disabled.
             *
             *  @param  integer     year    The year to check
             *  @param  integer     month   The month to check
             *  @param  integer     day     The day to check
             *
             *  @return boolean         Returns TRUE if the given value is not disabled or FALSE otherwise
             *
             *  @access private
             */
            is_disabled = function(year, month, day) {

                var now, len, disabled, enabled;

                // don't check bogus values
                if ((undefined === year || isNaN(year)) && (undefined === month || isNaN(month)) && (undefined === day || isNaN(day))) return false;

                // this date picker cannot handle years before 1000, so we return false in this case
                else if (year < 1000) return true;

                // if calendar has direction restrictions
                if (!(!$.isArray(plugin.settings.direction) && to_int(plugin.settings.direction) === 0)) {

                    // normalize and merge arguments then transform the result to an integer
                    now = to_int(str_concat(year, (typeof month !== 'undefined' ? str_pad(month, 2) : ''), (typeof day !== 'undefined' ? str_pad(day, 2) : '')));

                    // get the length of the argument
                    len = (now + '').length;

                    // if we're checking days
                    if (len === 8 && (

                        // day is before the first selectable date
                        (typeof start_date !== 'undefined' && now < to_int(str_concat(first_selectable_year, str_pad(first_selectable_month, 2), str_pad(first_selectable_day, 2)))) ||

                        // or day is after the last selectable date
                        (typeof end_date !== 'undefined' && now > to_int(str_concat(last_selectable_year, str_pad(last_selectable_month, 2), str_pad(last_selectable_day, 2))))

                    // day needs to be disabled
                    )) return true;

                    // if we're checking months
                    else if (len === 6 && (

                        // month is before the first selectable month
                        (typeof start_date !== 'undefined' && now < to_int(str_concat(first_selectable_year, str_pad(first_selectable_month, 2)))) ||

                        // or day is after the last selectable date
                        (typeof end_date !== 'undefined' && now > to_int(str_concat(last_selectable_year, str_pad(last_selectable_month, 2))))

                    // month needs to be disabled
                    )) return true;

                    // if we're checking years
                    else if (len === 4 && (

                        // year is before the first selectable year
                        (typeof start_date !== 'undefined' && now < first_selectable_year) ||

                        // or day is after the last selectable date
                        (typeof end_date !== 'undefined' && now > last_selectable_year)

                    // year needs to be disabled
                    )) return true;

                }

                // if month is given as argument, increment it (as JavaScript uses 0 for January, 1 for February...)
                if (typeof month !== 'undefined') month = month + 1;

                // by default, we assume the day/month/year is not enabled nor disabled
                disabled = false; enabled = false;

                // if there are rules for disabling dates
                if ($.isArray(disabled_dates) && disabled_dates.length)

                    // iterate through the rules for disabling dates
                    $.each(disabled_dates, function() {

                        // if the date is to be disabled, don't look any further
                        if (disabled) return;

                        var rule = this, weekday;

                        // if the rules apply for the current year
                        if ($.inArray(year, rule[2]) > -1 || $.inArray('*', rule[2]) > -1)

                            // if the rules apply for the current month
                            if ((typeof month !== 'undefined' && $.inArray(month, rule[1]) > -1) || $.inArray('*', rule[1]) > -1)

                                // if the rules apply for the current day
                                if ((typeof day !== 'undefined' && $.inArray(day, rule[0]) > -1) || $.inArray('*', rule[0]) > -1) {

                                    // if day is to be disabled whatever the day
                                    // don't look any further
                                    if ($.inArray('*', rule[3]) > -1) return (disabled = true);

                                    // get the weekday
                                    weekday = new Date(year, month - 1, day).getDay();

                                    // if weekday is to be disabled
                                    // don't look any further
                                    if ($.inArray(weekday, rule[3]) > -1) return (disabled = true);

                                }

                    });

                // if there are rules that explicitly enable dates
                if (enabled_dates)

                    // iterate through the rules for enabling dates
                    $.each(enabled_dates, function() {

                        // if the date is to be enabled, don't look any further
                        if (enabled) return;

                        var rule = this, weekday;

                        // if the rules apply for the current year
                        if ($.inArray(year, rule[2]) > -1 || $.inArray('*', rule[2]) > -1) {

                            // the year is enabled
                            enabled = true;

                            // if we're also checking months
                            if (typeof month !== 'undefined') {

                                // we assume the month is enabled
                                enabled = true;

                                // if the rules apply for the current month
                                if ($.inArray(month, rule[1]) > -1 || $.inArray('*', rule[1]) > -1) {

                                    // if we're also checking days
                                    if (typeof day !== 'undefined') {

                                        // we assume the day is enabled
                                        enabled = true;

                                        // if the rules apply for the current day
                                        if ($.inArray(day, rule[0]) > -1 || $.inArray('*', rule[0]) > -1) {

                                            // if day is to be enabled whatever the day
                                            // don't look any further
                                            if ($.inArray('*', rule[3]) > -1) return (enabled = true);

                                            // get the weekday
                                            weekday = new Date(year, month - 1, day).getDay();

                                            // if weekday is to be enabled
                                            // don't look any further
                                            if ($.inArray(weekday, rule[3]) > -1) return (enabled = true);

                                            // if we get this far, it means the day is not enabled
                                            enabled = false;

                                        // if day is not enabled
                                        } else enabled = false;

                                    }

                                // if month is not enabled
                                } else enabled = false;

                            }

                        }

                    });

                // if checked date is enabled, return false
                if (enabled_dates && enabled) return false;

                // if checked date is disabled return false
                else if (disabled_dates && disabled) return true;

                // if script gets this far it means that the day/month/year doesn't need to be disabled
                return false;

            },

            /**
             *  Checks whether a value is an integer number.
             *
             *  @param  mixed   value   Value to check
             *
             *  @return                 Returns TRUE if the value represents an integer number, or FALSE otherwise
             *
             *  @access private
             */
            is_integer = function(value) {

                // return TRUE if value represents an integer number, or FALSE otherwise
                return (value + '').match(/^\-?[0-9]+$/);

            },

            /**
             *  Sets the caption in the header of the date picker and enables or disables navigation buttons when necessary.
             *
             *  @param  string  caption     String that needs to be displayed in the header
             *
             *  @return void
             *
             *  @access private
             */
            manage_header = function(caption) {

                // if "selected_month" has a value
                // $.isNumeric is available only from jQuery 1.7 - thanks to birla for the fix!
                if (!isNaN(parseFloat(selected_month)) && isFinite(selected_month))

                    caption = caption.replace(/\bm\b|\bn\b|\bF\b|\bM\b/, function(match) {

                        switch (match) {

                            // month number, prefixed with 0
                            case 'm':
                                return str_pad(selected_month + 1, 2);

                            // month number, not prefixed with 0
                            case 'n':
                                return selected_month + 1;

                            // full month name
                            case 'F':
                                return plugin.settings.months[selected_month];

                            // month name, three letters
                            case 'M':
                                return ($.isArray(plugin.settings.months_abbr) && undefined !== plugin.settings.months_abbr[selected_month] ? plugin.settings.months_abbr[selected_month] : plugin.settings.months[selected_month].substr(0, 3));

                            // unknown replace
                            default:
                                return match;

                        }

                    });

                // if "selected_year" has a value
                // $.isNumeric is available only from jQuery 1.7 - thanks to birla for the fix!
                if (!isNaN(parseFloat(selected_year)) && isFinite(selected_year))

                    // replace year-related patterns
                    caption = caption

                        // year as four digits
                        .replace(/\bY\b/, selected_year)

                        // year as two digits
                        .replace(/\by\b/, (selected_year + '').substr(2))

                        // lower limit of year as two or four digits
                        .replace(/\bY1\b/i, selected_year - 7)

                        // upper limit of year as two or four digits
                        .replace(/\bY2\b/i, selected_year + 4);

                // update the caption in the header
                $('.dp_caption', header).html(caption);

            },

            /**
             *  Shows the appropriate view (days, months, years or time) according to the current value of the "view" property.
             *
             *  @return void
             *
             *  @access private
             */
            manage_views = function(fire_events) {

                var height, elements;

                // if the day picker was not yet generated
                if (daypicker.text() === '' || view === 'days') {

                    // if the day picker was not yet generated
                    if (daypicker.text() === '') {

                        // if date picker is not always visible in a container
                        if (!(plugin.settings.always_visible instanceof jQuery))

                            // temporarily set the date picker's left outside of view
                            // so that we can later grab its width and height
                            datepicker.css('left', -1000);

                        // temporarily make the date picker visible
                        // so that we can later grab its width and height
                        datepicker.removeClass('hidden');

                        // generate the day picker
                        generate_daypicker();

                        // jQuery rounds values returned by outerWidth and outerHeight
                        // therefore, if we can get the un-rounded values, get those
                        // get the day picker's width and height
                        // (we need the second check for old Internet Explorers...)
                        if (typeof daypicker[0].getBoundingClientRect !== 'undefined' && typeof daypicker[0].getBoundingClientRect().height !== 'undefined') height = daypicker[0].getBoundingClientRect().height;

                        // if "getBoundingClientRect" is not available
                        // get the day picker's height
                        else height = daypicker.outerHeight(true);

                        // make the month picker have the same size as the day picker
                        monthpicker.css('height', height);

                        // make the year picker have the same size as the day picker
                        yearpicker.css('height', height);

                        // make the time picker have the same size as the day picker
                        timepicker.css('height', height + header.outerHeight(true));

                        // set the container's width so all the views have 100% width
                        datepicker.css('width', datepicker.outerWidth());

                        // // we have to set this now or Chrome will make the datepicker extend to the full width of the screen...
                        // $('.dp_caption', header).css('width', '100%');

                        // hide the date picker again
                        datepicker.addClass('dp_hidden');

                    // if the day picker was previously generated at least once
                    // generate the day picker
                    } else generate_daypicker();

                    // show header
                    header.show();

                    // hide the year and the month pickers
                    monthpicker.hide();
                    yearpicker.hide();

                    // hide time-picker related elements
                    timepicker.hide();
                    view_toggler.hide();
                    confirm_selection.hide();

                    // if the time picker is enabled, show the clock icon
                    if (timepicker_config) view_toggler.show().removeClass('dp_calendar');

                // if the view is "months"
                } else if (view === 'months') {

                    // generate the month picker
                    generate_monthpicker();

                    // hide the day and the year pickers
                    daypicker.hide();
                    yearpicker.hide();

                    // hide time-picker related elements
                    timepicker.hide();
                    view_toggler.hide();
                    confirm_selection.hide();

                // if the view is "years"
                } else if (view === 'years') {

                    // generate the year picker
                    generate_yearpicker();

                    // hide the day and the month pickers
                    daypicker.hide();
                    monthpicker.hide();

                    // hide time-picker related elements
                    timepicker.hide();
                    view_toggler.hide();
                    confirm_selection.hide();

                // if the view is "time"
                } else if (view === 'time') {

                    // generate the time picker
                    generate_timepicker();

                    // if the "time" view is the only available view
                    if (views.length === 1) {

                        // hide the time picker toggler button
                        view_toggler.hide();

                        // show the confirmation button
                        confirm_selection.show();

                    // if the "time" view is not the only available view
                    } else {

                        // time picker toggler button, but change the icon
                        view_toggler.show().addClass('dp_calendar');

                        // if no date is selected
                        // hide the confirmation button
                        if ($element.val() === '') confirm_selection.hide();

                        // show the confirmation button
                        else confirm_selection.show();

                    }

                    // hide the header, day, month and year pickers
                    header.hide();
                    daypicker.hide();
                    monthpicker.hide();
                    yearpicker.hide();

                }

                // if a callback function exists for when navigating through days/months/years/time
                // ("fire_events" is FALSE when the method was called by the "update" method)
                if (fire_events !== false && plugin.settings.onChange && typeof plugin.settings.onChange === 'function' && undefined !== view) {

                    // get the "active" elements in the view (ignoring the disabled ones)
                    elements = (view === 'days' ?
                        daypicker.find('td:not(.dp_disabled)') :
                        (view === 'months' ?
                            monthpicker.find('td:not(.dp_disabled)') :
                            (view === 'years' ?
                                yearpicker.find('td:not(.dp_disabled)') :
                                timepicker.find('.dp_time_segments td'))));

                    // iterate through the active elements
                    // and attach a "date" data attribute to each element in the form of
                    // YYYY-MM-DD if the view is "days"
                    // YYYY-MM if the view is "months"
                    // YYYY if the view is "years"
                    // so it's easy to identify elements in the list
                    elements.each(function() {

                        var matches;

                        // if view is "days"
                        if (view === 'days')

                            // if date is from a next/previous month and is selectable
                            if ($(this).hasClass('dp_not_in_month') && !$(this).hasClass('dp_disabled')) {

                                // extract date from the attached class
                                matches = $(this).attr('class').match(/date\_([0-9]{4})(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])/);

                                // attach a "date" data attribute to each element in the form of of YYYY-MM-DD for easily identifying sought elements
                                $(this).data('date', matches[1] + '-' + matches[2] + '-' + matches[3]);

                            // if date is from the currently selected month
                            } else

                                // attach a "date" data attribute to each element in the form of of YYYY-MM-DD for easily identifying sought elements
                                $(this).data('date', selected_year + '-' + str_pad(selected_month + 1, 2) + '-' + str_pad(to_int($(this).text()), 2));

                        // if view is "months"
                        else if (view === 'months') {

                            // get the month's number for the element's class
                            matches = $(this).attr('class').match(/dp\_month\_([0-9]+)/);

                            // attach a "date" data attribute to each element in the form of of YYYY-MM for easily identifying sought elements
                            $(this).data('date', selected_year + '-' + str_pad(to_int(matches[1]) + 1, 2));

                        // if view is "years"
                        } else if (view === 'years')

                            // attach a "date" data attribute to each element in the form of of YYYY for easily identifying sought elements
                            $(this).data('date', to_int($(this).text()));

                    });

                    // execute the callback function and send as arguments the current view, the elements in the view, and
                    // the element the plugin is attached to
                    plugin.settings.onChange.call($element, view, elements);

                }

                // assume the footer is visible
                footer.show();

                // if we are in the "time" view and there are more views available
                if (view === 'time' && views.length > 1) {

                    // hide the "Today" and the "Clear" buttons
                    selecttoday.hide();
                    cleardate.hide();

                    // set the view toggler width
                    view_toggler.css('width', $element.val() === '' ? '100%' : '50%');

                // for the other cases
                } else {

                    // assume both the "Today" and "Clear" buttons are visible
                    selecttoday.show();
                    cleardate.show();

                    // if the button for clearing a previously selected date needs to be visible all the time,
                    // or the "Clear" button needs to be shown only when a date was previously selected, and now it's the case,
                    // or the date picker is always visible and the "Clear" button was not explicitly disabled
                    if (
                        plugin.settings.show_clear_date === true ||
                        (plugin.settings.show_clear_date === 0 && $element.val() !== '') ||
                        (plugin.settings.always_visible && plugin.settings.show_clear_date !== false)
                    )

                        // if the "Today" button is visible
                        if (show_select_today) {

                            // show it, and set it's width to 50% of the available space
                            selecttoday.css('width', '50%');

                            // the "Clear date" button only takes up 50% of the available space
                            cleardate.css('width', '50%');

                        // if the "Today" button is not visible
                        } else {

                            // hide the "Today" button
                            selecttoday.hide();

                            // the "Clear date" button takes up 100% of the available space
                            // unless the time picker is available, in which case take up 50% of the available space
                            cleardate.css('width', $.inArray(views, 'time') > -1 ? '50%' : '100%');

                        }

                    // otherwise
                    else {

                        // hide the "Clear" button
                        cleardate.hide();

                        // if the "Today" button is visible, it will now take up all the available space
                        if (show_select_today) selecttoday.css('width', '100%');

                        // if the "Today" button should not be visible
                        else {

                            // hide the "Today" button
                            selecttoday.hide();

                            // if there's also no timepicker view, hide the footer entirely
                            if (!timepicker_config || (view !== 'time' && view !== 'days')) footer.hide();

                        }

                    }

                }

            },

            /**
             *  Handles time increase / decrease
             *
             *  @return void
             *
             *  @access private
             */
            manage_timer_controls = function(element) {

                var

                    // are we increasing or decreasing values?
                    increase = $(element).parent('.dp_time_controls_increase').length > 0,

                    // figure out what we're increasing (hour, minutes, seconds, ampm)
                    matches = $(element).attr('class').match(/dp\_time\_([^\s]+)/i),
                    value_container = $('.dp_time_segments .dp_time_' + matches[1] + (matches[1] !== 'ampm' ? 's' : ''), timepicker),

                    // the current value (strip the zeros in front)
                    value = value_container.text().toLowerCase(),

                    // the array with allowed values
                    lookup = timepicker_config[matches[1] + (matches[1] !== 'ampm' ? 's' : '')],

                    // the current value's position in the array of allowed values
                    current_value_position = $.inArray(matches[1] !== 'ampm' ? parseInt(value, 10) : value, lookup),

                    // the next value's position in the lookup array
                    next_value_position = current_value_position === -1 ? 0 : (increase ? (current_value_position + 1 >= lookup.length ? 0 : current_value_position + 1) : (current_value_position - 1 < 0 ? lookup.length - 1 : current_value_position - 1)),

                    default_date;

                // increase/decrease the required value according to the values in the lookup array
                if (matches[1] === 'hour') selected_hour = lookup[next_value_position];
                else if (matches[1] === 'minute') selected_minute = lookup[next_value_position];
                else if (matches[1] === 'second') selected_second = lookup[next_value_position];
                else selected_ampm = lookup[next_value_position];

                // if a default day is not available and the "start_date" property is set
                if (!default_day && plugin.settings.start_date) {

                    // check if "start_date" is valid according to the format
                    default_date = check_date(plugin.settings.start_date);

                    // ...and if it is, extract the day from there
                    if (default_date) default_day = default_date.getDate();

                }

                // if still no value, use the first selectable day
                if (!default_day) default_day = first_selectable_day;

                // set the new value
                value_container.text(str_pad(lookup[next_value_position], 2).toUpperCase());

                // update the value in the element
                select_date(selected_year, selected_month, default_day);

            },

            /**
             *  Puts the specified date in the element the plugin is attached to, and hides the date picker.
             *
             *  @param  integer     year    The year
             *
             *  @param  integer     month   The month
             *
             *  @param  integer     day     The day
             *
             *  @param  string      rview   The view from where the method was called (the referrer view)
             *
             *  @param  object      cell    The element that was clicked
             *
             *  @return void
             *
             *  @access private
             */
            select_date = function(year, month, day, rview, cell) {

                var

                    // construct a new date object from the arguments
                    default_date = new Date(year, month, day,
                        (timepicker_config && timepicker_config.hours ? selected_hour + (timepicker_config.ampm ? (selected_ampm === 'pm' && selected_hour !== 12 ? 12 : (selected_ampm === 'am' && selected_hour === 12 ? -12 : 0)) : 0) : 12),
                        (timepicker_config && timepicker_config.minutes ? selected_minute : 0),
                        (timepicker_config && timepicker_config.seconds ? selected_second : 0)
                    ),

                    // pointer to the cells in the current view
                    view_cells = (rview === 'days' ? daypicker_cells : (rview === 'months' ? monthpicker_cells : yearpicker_cells)),

                    // the selected date, formatted correctly
                    selected_value = format(default_date);

                // set the currently selected and formated date as the value of the element the plugin is attached to
                $element.val(selected_value);

                // if date picker is always visible or time picker is available
                if (plugin.settings.always_visible || timepicker_config) {

                    // extract the date parts and reassign values to these variables
                    // so that everything will be correctly highlighted
                    default_month = default_date.getMonth();
                    selected_month = default_date.getMonth();
                    default_year = default_date.getFullYear();
                    selected_year = default_date.getFullYear();
                    default_day = default_date.getDate();

                    // if "cell" is available (it isn't when called from increasing/decreasing values the time picker)
                    if (cell && view_cells) {

                        // remove the "selected" class from all cells in the current view
                        view_cells.removeClass('dp_selected');

                        // add the "selected" class to the currently selected cell
                        cell.addClass('dp_selected');

                        // if we're on the "days" view and days from other months are selectable and one of those days was
                        // selected, repaint the datepicker so it will take us to the selected month
                        if (rview === 'days' && cell.hasClass('dp_not_in_month') && !cell.hasClass('dp_disabled')) plugin.show();

                    }

                }

                // if format contains time, switch to the time picker view
                if (timepicker_config) {

                    view = 'time';
                    manage_views();

                // if format doesn't contain time
                } else {

                    // move focus to the element the plugin is attached to
                    $element.focus();

                    // hide the date picker
                    plugin.hide();

                }

                // updates value for the date picker whose starting date depends on the selected date (if any)
                update_dependent(default_date);

                // if a callback function exists for when selecting a date
                // (if time picker is enabled, we'll run the callback when the user clicks on the confirmation button)
                if (!timepicker_config && plugin.settings.onSelect && typeof plugin.settings.onSelect === 'function')

                    // execute the callback function
                    // make "this" inside the callback function refer to the element the date picker is attached to
                    plugin.settings.onSelect.call($element, selected_value, year + '-' + str_pad(month + 1, 2) + '-' + str_pad(day, 2), default_date);

            },

            /**
             *  Concatenates any number of arguments and returns them as string.
             *
             *  @return string  Returns the concatenated values.
             *
             *  @access private
             */
            str_concat = function() {

                var str = '', i;

                // concatenate as string
                for (i = 0; i < arguments.length; i++) str += (arguments[i] + '');

                // return the concatenated values
                return str;

            },

            /**
             *  Left-pad a string to a certain length with zeroes.
             *
             *  @param  string  str     The string to be padded.
             *
             *  @param  integer len     The length to which the string must be padded
             *
             *  @return string          Returns the string left-padded with leading zeroes
             *
             *  @access private
             */
            str_pad = function(str, len) {

                // make sure argument is a string
                str += '';

                // pad with leading zeroes until we get to the desired length
                while (str.length < len) str = '0' + str;

                // return padded string
                return str;

            },

            /**
             *  Returns the integer representation of a string
             *
             *  @return int     Returns the integer representation of the string given as argument
             *
             *  @access private
             */
            to_int = function(str) {

                // return the integer representation of the string given as argument
                return parseInt(str, 10);

            },

            /**
             *  Updates the paired date picker (whose starting date depends on the value of the current date picker)
             *
             *  @param  date    date    A JavaScript date object representing the currently selected date
             *
             *  @return void
             *
             *  @access private
             */
            update_dependent = function(date) {

                // if the pair element exists
                if (plugin.settings.pair)

                    // iterate through the pair elements (as there may be more than just one)
                    $.each(plugin.settings.pair, function() {

                        var $pair = $(this), dp;

                        // chances are that in the beginning the pair element doesn't have the Zebra_DatePicker attached to it yet
                        // (as the "start" element is usually created before the "end" element)
                        // so we'll have to rely on "data" to send the starting date to the pair element

                        // therefore, if Zebra_DatePicker is not yet attached
                        if (!($pair.data && $pair.data('Zebra_DatePicker')))

                            // set the starting date like this
                            $pair.data('zdp_reference_date', date);

                        // if Zebra_DatePicker is attached to the pair element
                        else {

                            // reference the date picker object attached to the other element
                            dp = $pair.data('Zebra_DatePicker');

                            // update the other date picker's starting date
                            // the value depends on the original value of the "direction" attribute
                            // (also, if the pair date picker does not have a direction, set it to 1)
                            dp.update({
                                reference_date: date,
                                direction:      dp.settings.direction === 0 ? 1 : dp.settings.direction
                            });

                            // if the other date picker is always visible, update the visuals now
                            if (dp.settings.always_visible) dp.show();

                        }

                    });

            },

            // since with jQuery 1.9.0 the $.browser object was removed, we rely on this piece of code from
            // http://www.quirksmode.org/js/detect.html to detect the browser
            browser = {
                init: function() {
                    this.name = this.searchString(this.dataBrowser) || '';
                    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || '';
                },
                searchString: function(data) {
                    var i, dataString, dataProp;

                    for (i = 0; i < data.length; i++) {
                        dataString = data[i].string;
                        dataProp = data[i].prop;
                        this.versionSearchString = data[i].versionSearch || data[i].identity;
                        if (dataString) {
                            if (dataString.indexOf(data[i].subString) !== -1)
                                return data[i].identity;
                        } else if (dataProp)
                            return data[i].identity;
                    }
                },
                searchVersion: function(dataString) {
                    var index = dataString.indexOf(this.versionSearchString);

                    if (index === -1) return;

                    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
                },
                dataBrowser: [
                    {
                        string: navigator.userAgent,
                        subString: 'Firefox',
                        identity: 'firefox'
                    },
                    {
                        string: navigator.userAgent,
                        subString: 'MSIE',
                        identity: 'explorer',
                        versionSearch: 'MSIE'
                    }
                ]
            };

        plugin.settings = {};

        /**
         *  Clears the selected date.
         *
         *  @return void
         */
        plugin.clear_date = function() {

            $(cleardate).trigger('click');

        };

        /**
         *  Destroys the date picker.
         *
         *  @return void
         */
        plugin.destroy = function() {

            // if the calendar icon exists
            if (undefined !== plugin.icon) {

                // remove associated event handlers
                plugin.icon.off('click.Zebra_DatePicker_' + uniqueid);
                plugin.icon.off('focus.Zebra_DatePicker_' + uniqueid);
                plugin.icon.off('keydown.Zebra_DatePicker_' + uniqueid);

                // remove the icon itself
                plugin.icon.remove();

            }

            // remove all events attached to the datepicker
            // (these are the ones for increasing/decreasing values in the time picker)
            datepicker.off();

            // remove the calendar
            datepicker.remove();

            // if calendar icon was shown and the date picker was not always visible in a container,
            // also remove the wrapper used for positioning it
            if (plugin.settings.show_icon && !(plugin.settings.always_visible instanceof jQuery)) $element.unwrap();

            // remove associated event handlers from the element
            $element.off('blur.Zebra_DatePicker_' + uniqueid);
            $element.off('click.Zebra_DatePicker_' + uniqueid);
            $element.off('focus.Zebra_DatePicker_' + uniqueid);
            $element.off('keydown.Zebra_DatePicker_' + uniqueid);
            $element.off('mousedown.Zebra_DatePicker_' + uniqueid);

            // remove associated event handlers from the document
            $(document).off('keyup.Zebra_DatePicker_' + uniqueid);
            $(document).off('mousedown.Zebra_DatePicker_' + uniqueid);
            $(document).off('touchend.Zebra_DatePicker_' + uniqueid);
            $(window).off('resize.Zebra_DatePicker_' + uniqueid);
            $(window).off('orientationchange.Zebra_DatePicker_' + uniqueid);

            // remove association with the element
            $element.removeData('Zebra_DatePicker');

            // restore element's modified attributes
            $element.attr('readonly', original_attributes.readonly);
            $element.attr('style', original_attributes.style ? original_attributes.style : '');
            $element.css('paddingLeft', original_attributes.padding_left);
            $element.css('paddingRight', original_attributes.padding_right);

        };

        /**
         *  Hides the date picker.
         *
         *  @return void
         */
        plugin.hide = function(outside) {

            // unless the date picker is not already hidden AND
            // the date picker is not always visible or we clicked outside the date picker
            // (the "outside" argument is TRUE when clicking outside the date picker and the "always_visible" is set to boolean TRUE)
            if (!datepicker.hasClass('dp_hidden') && (!plugin.settings.always_visible || outside)) {

                // hide the iFrameShim in Internet Explorer 6
                iframeShim('hide');

                // hide the date picker
                datepicker.addClass('dp_hidden');

                // if a callback function exists for when hiding the date picker
                if (plugin.settings.onClose && typeof plugin.settings.onClose === 'function')

                    // execute the callback function and pass as argument the element the plugin is attached to
                    plugin.settings.onClose.call($element);

            }

        };

        /**
         *  Set the date picker's value
         *
         *  Must be a string representing a date in the format set by the "format" property, or a JavaScript date object.
         *
         *  @return void
         */
        plugin.set_date = function(date) {

            var dateObj;

            // if "date" is given as a valid Date object, convert it to the required format
            if (typeof date === 'object' && date instanceof Date) date = format(date);

            // if a valid date was entered, and date is not disabled
            if ((dateObj = check_date(date)) && !is_disabled(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate())) {

                // set the element's value
                $element.val(date);

                // update the paired date picker (if any)
                update_dependent(dateObj);

            }

        };

        /**
         *  Shows the date picker.
         *
         *  @return void
         */
        plugin.show = function(fire_events) {

            // always show the view defined in settings
            view = plugin.settings.view;

            // get the default date, from the element, and check if it represents a valid date, according to the required format
            var default_date = check_date($element.val() || (plugin.settings.start_date ? plugin.settings.start_date : '')),
                current_date;

            // if the value represents a valid date
            if (default_date) {

                // extract the date parts
                // we'll use these to highlight the default date in the date picker and as starting point to
                // what year and month to start the date picker with
                // why separate values? because selected_* will change as user navigates within the date picker
                default_month = default_date.getMonth();
                selected_month = default_date.getMonth();
                default_year = default_date.getFullYear();
                selected_year = default_date.getFullYear();
                default_day = default_date.getDate();

                // if the default date represents a disabled date
                if (is_disabled(default_year, default_month, default_day)) {

                    // if date picker is in "strict" mode, clear the value of the parent element
                    if (plugin.settings.strict) $element.val('');

                    // the calendar will start with the first selectable year/month
                    selected_month = first_selectable_month;
                    selected_year = first_selectable_year;

                }

            // if a default value is not available, or value does not represent a valid date
            } else {

                // the calendar will start with the first selectable year/month
                selected_month = first_selectable_month;
                selected_year = first_selectable_year;

            }

            // whatever the case, if time picker is enabled
            if (timepicker_config) {

                // if a default date is available, use the time from there
                if (default_date) current_date = default_date;

                // use current system time otherwise
                else current_date = new Date();

                // extract time parts from it
                selected_hour = current_date.getHours();
                selected_minute = current_date.getMinutes();
                selected_second = current_date.getSeconds();
                selected_ampm = (selected_hour >= 12 ? 'pm' : 'am');

                // if hour is in 12 hour format
                if (timepicker_config.is12hour)

                    // convert it to the correct value
                    selected_hour = (selected_hour % 12 === 0 ? 12 : selected_hour % 12);

                // make sure that the default values are withing the allowed range, if a range is defined
                if ($.isArray(plugin.settings.enabled_hours) && $.inArray(selected_hour, plugin.settings.enabled_hours) === -1) selected_hour = plugin.settings.enabled_hours[0];
                if ($.isArray(plugin.settings.enabled_minutes) && $.inArray(selected_minute, plugin.settings.enabled_minutes) === -1) selected_minute = plugin.settings.enabled_minutes[0];
                if ($.isArray(plugin.settings.enabled_seconds) && $.inArray(selected_second, plugin.settings.enabled_seconds) === -1) selected_second = plugin.settings.enabled_seconds[0];

            }

            // generate the appropriate view
            manage_views(fire_events);

            // if date picker is not always visible in a container, and the calendar icon is visible
            if (!(plugin.settings.always_visible instanceof jQuery)) {

                // if date picker is to be injected into the <body>
                if (plugin.settings.container.is('body')) {

                    var

                        // get the date picker width and height
                        datepicker_width = datepicker.outerWidth(),
                        datepicker_height = datepicker.outerHeight(),

                        // compute the date picker's default left and top
                        // this will be computed relative to the icon's top-right corner (if the calendar icon exists), or
                        // relative to the element's top-right corner otherwise, to which the offsets given at initialization
                        // are added/subtracted
                        left = (undefined !== icon ? icon.offset().left + icon.outerWidth(true) : $element.offset().left + $element.outerWidth(true)) + plugin.settings.offset[0],
                        top = (undefined !== icon ? icon.offset().top : $element.offset().top) - datepicker_height + plugin.settings.offset[1],

                        // get browser window's width and height
                        window_width = $(window).width(),
                        window_height = $(window).height(),

                        // get browser window's horizontal and vertical scroll offsets
                        window_scroll_top = $(window).scrollTop(),
                        window_scroll_left = $(window).scrollLeft();

                    if (plugin.settings.default_position === 'below')
                        top = (undefined !== icon ? icon.offset().top : $element.offset().top) + plugin.settings.offset[1];

                    // if date picker is outside the viewport, adjust its position so that it is visible
                    if (left + datepicker_width > window_scroll_left + window_width) left = window_scroll_left + window_width - datepicker_width;
                    if (left < window_scroll_left) left = window_scroll_left;

                    if (top + datepicker_height > window_scroll_top + window_height) top = window_scroll_top + window_height - datepicker_height;
                    if (top < window_scroll_top) top = window_scroll_top;

                    // make the date picker visible
                    datepicker.css({
                        left:   left,
                        top:    top
                    });

                // if date picker is to be injected into a custom container element
                } else

                    datepicker.css({
                        left:   0,
                        top:    0
                    });

                // fade-in the date picker
                // for Internet Explorer < 9 show the date picker instantly or fading alters the font's weight
                datepicker.removeClass('dp_hidden');

                // show the iFrameShim in Internet Explorer 6
                iframeShim();

            // if date picker is always visible, show it
            } else datepicker.removeClass('dp_hidden');

            // if a callback function exists for when showing the date picker
            // ("fire_events" is FALSE when the method was called by the "update" method)
            if (fire_events !== false && plugin.settings.onOpen && typeof plugin.settings.onOpen === 'function')

                // execute the callback function and pass as argument the element the plugin is attached to
                plugin.settings.onOpen.call($element);

        };

        /**
         *  Updates the configuration options given as argument
         *
         *  @param  object  values  An object containing any number of configuration options to be updated
         *
         *  @return void
         */
        plugin.update = function(values) {

            // if original direction not saved, save it now
            if (plugin.original_direction) plugin.original_direction = plugin.direction;

            // update configuration options
            plugin.settings = $.extend(plugin.settings, values);

            // reinitialize the object with the new options
            init(true);

        };

        browser.init();

        // initialize the plugin
        init();

    };

    $.fn.Zebra_DatePicker = function(options) {

        // iterate through all the elements to which we need to attach the date picker to
        return this.each(function() {

            // if element has a date picker already attached
            if (undefined !== $(this).data('Zebra_DatePicker'))

                // remove the attached date picker
                $(this).data('Zebra_DatePicker').destroy();

            // create an instance of the plugin
            var plugin = new $.Zebra_DatePicker(this, options);

            // save a reference to the newly created object
            $(this).data('Zebra_DatePicker', plugin);

        });

    };

    // this is used for setting global defaults, that will be applied to all date pickers
    $.fn.Zebra_DatePicker.defaults = {};

}));

/**
 * amCharts 4 locale
 *
 * Locale: fi_FI
 * Language: Finnish
 * Author: Bjorn Svensson
 *
 * Follow instructions in [on this page](https://www.amcharts.com/docs/v4/tutorials/creating-translations/) to make corrections or add new translations.
 *
 * ---
 * Edit but leave the header section above this line. You can remove any
 * subsequent comment sections.
 * ---
 *
 * Use this file as a template to create translations. Leave the key part in
 * English intact. Fill the value with a translation.
 *
 * Empty string means no translation, so default "International English"
 * will be used.
 *
 * If you need the translation to literally be an empty string, use `null`
 * instead.
 *
 * IMPORTANT:
 * When translating make good effort to keep the translation length
 * at least the same chartcount as the English, especially for short prompts.
 *
 * Having significantly longer prompts may distort the actual charts.
 *
 * NOTE:
 * Some prompts - like months or weekdays - come in two versions: full and
 * shortened.
 *
 * If there's no official shortened version of these in your language, and it
 * would not be possible to invent such short versions that don't seem weird
 * to native speakers of that language, fill those with the same as full
 * version.
 *
 * PLACEHOLDERS:
 * Some prompts have placeholders like "%1". Those will be replaced by actual
 * values during translation and should be retained in the translated prompts.
 *
 * Placeholder positions may be changed to better suit structure of the
 * sentence.
 *
 * For example "From %1 to %2", when actually used will replace "%1" with an
 * actual value representing range start, and "%2" will be replaced by end
 * value.
 *
 * E.g. in a Scrollbar for Value axis "From %1 to %2" will become
 * "From 100 to 200". You may translate "From" and "to", as well as re-arrange
 * the order of the prompt itself, but make sure the "%1" and "%2" remain, in
 * places where they will make sense.
 *
 * Save the file as language_LOCALE, i.e. `en_GB.ts`, `fr_FR.ts`, etc.
 */
export default {
    // Number formatting options.
    //
    // Please check with the local standards which separator is accepted to be
    // used for separating decimals, and which for thousands.
    "_decimalSeparator": ",",
    "_thousandSeparator": " ",
    // Position of the percent sign in numbers
    "_percentPrefix": null,
    "_percentSuffix": "%",
    // Suffixes for numbers
    // When formatting numbers, big or small numers might be reformatted to
    // shorter version, by applying a suffix.
    //
    // For example, 1000000 might become "1m".
    // Or 1024 might become "1KB" if we're formatting byte numbers.
    //
    // This section defines such suffixes for all such cases.
    "_big_number_suffix_3": "k",
    "_big_number_suffix_6": "M",
    "_big_number_suffix_9": "G",
    "_big_number_suffix_12": "T",
    "_big_number_suffix_15": "P",
    "_big_number_suffix_18": "E",
    "_big_number_suffix_21": "Z",
    "_big_number_suffix_24": "Y",
    "_small_number_suffix_3": "m",
    "_small_number_suffix_6": "μ",
    "_small_number_suffix_9": "n",
    "_small_number_suffix_12": "p",
    "_small_number_suffix_15": "f",
    "_small_number_suffix_18": "a",
    "_small_number_suffix_21": "z",
    "_small_number_suffix_24": "y",
    "_byte_suffix_B": "B",
    "_byte_suffix_KB": "KB",
    "_byte_suffix_MB": "MB",
    "_byte_suffix_GB": "GB",
    "_byte_suffix_TB": "TB",
    "_byte_suffix_PB": "PB",
    // Default date formats for various periods.
    //
    // This should reflect official or de facto formatting universally accepted
    // in the country translation is being made for
    // Available format codes here:
    // https://www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/#Format_codes
    //
    // This will be used when formatting date/time for particular granularity,
    // e.g. "_date_hour" will be shown whenever we need to show time as hours.
    "_date_millisecond": "mm:ss SSS",
    "_date_second": "HH:mm:ss",
    "_date_minute": "HH:mm",
    "_date_hour": "HH:mm",
    "_date_day": "MMM dd",
    "_date_week": "ww",
    "_date_month": "MMM",
    "_date_year": "yyyy",
    // Default duration formats for various base units.
    //
    // This will be used by DurationFormatter to format numeric values into
    // duration.
    //
    // Notice how each duration unit comes in several versions. This is to ensure
    // that each base unit is shown correctly.
    //
    // For example, if we have baseUnit set to "second", meaning our duration is
    // in seconds.
    //
    // If we pass in `50` to formatter, it will know that we have just 50 seconds
    // (less than a minute) so it will use format in `"_duration_second"` ("ss"),
    // and the formatted result will be in like `"50"`.
    //
    // If we pass in `70`, which is more than a minute, the formatter will switch
    // to `"_duration_second_minute"` ("mm:ss"), resulting in "01:10" formatted
    // text.
    //
    // Available codes here:
    // https://www.amcharts.com/docs/v4/concepts/formatters/formatting-duration/#Available_Codes
    "_duration_millisecond": "SSS",
    "_duration_millisecond_second": "ss.SSS",
    "_duration_millisecond_minute": "mm:ss SSS",
    "_duration_millisecond_hour": "hh:mm:ss SSS",
    "_duration_millisecond_day": "d'd' mm:ss SSS",
    "_duration_millisecond_week": "d'd' mm:ss SSS",
    "_duration_millisecond_month": "M'm' dd'd' mm:ss SSS",
    "_duration_millisecond_year": "y'y' MM'm' dd'd' mm:ss SSS",
    "_duration_second": "ss",
    "_duration_second_minute": "mm:ss",
    "_duration_second_hour": "hh:mm:ss",
    "_duration_second_day": "d'd' hh:mm:ss",
    "_duration_second_week": "d'd' hh:mm:ss",
    "_duration_second_month": "M'm' dd'd' hh:mm:ss",
    "_duration_second_year": "y'y' MM'm' dd'd' hh:mm:ss",
    "_duration_minute": "mm",
    "_duration_minute_hour": "hh:mm",
    "_duration_minute_day": "d'd' hh:mm",
    "_duration_minute_week": "d'd' hh:mm",
    "_duration_minute_month": "M'm' dd'd' hh:mm",
    "_duration_minute_year": "y'y' MM'm' dd'd' hh:mm",
    "_duration_hour": "hh'h'",
    "_duration_hour_day": "d'd' hh'h'",
    "_duration_hour_week": "d'd' hh'h'",
    "_duration_hour_month": "M'm' dd'd' hh'h'",
    "_duration_hour_year": "y'y' MM'm' dd'd' hh'h'",
    "_duration_day": "d'd'",
    "_duration_day_week": "d'd'",
    "_duration_day_month": "M'm' dd'd'",
    "_duration_day_year": "y'y' MM'm' dd'd'",
    "_duration_week": "w'w'",
    "_duration_week_month": "w'w'",
    "_duration_week_year": "w'w'",
    "_duration_month": "M'm'",
    "_duration_month_year": "y'y' MM'm'",
    "_duration_year": "y'y'",
    // Era translations
    "_era_ad": "jKr.",
    "_era_bc": "eKr.",
    // Day part, used in 12-hour formats, e.g. 5 P.M.
    // Please note that these come in 3 variants:
    // * one letter (e.g. "A")
    // * two letters (e.g. "AM")
    // * two letters with dots (e.g. "A.M.")
    //
    // All three need to to be translated even if they are all the same. Some
    // users might use one, some the other.
    "A": "ap.",
    "P": "ip.",
    "AM": "ap.",
    "PM": "ip.",
    "A.M.": "ap.",
    "P.M.": "ip.",
    // Date-related stuff.
    //
    // When translating months, if there's a difference, use the form which is
    // best for a full date, e.g. as you would use it in "2018 January 1".
    //
    // Note that May is listed twice. This is because in English May is the same
    // in both long and short forms, while in other languages it may not be the
    // case. Translate "May" to full word, while "May(short)" to shortened
    // version.
    //
    // Should month names and weekdays be capitalized or not?
    //
    // Rule of thumb is this: if the names should always be capitalized,
    // regardless of name position within date ("January", "21st January 2018",
    // etc.) use capitalized names. Otherwise enter all lowercase.
    //
    // The date formatter will automatically capitalize names if they are the
    // first (or only) word in resulting date.
    "January": "tammikuuta",
    "February": "helmikuuta",
    "March": "maaliskuuta",
    "April": "huhtikuuta",
    "May": "toukokuuta",
    "June": "kesäkuuta",
    "July": "heinäkuuta",
    "August": "elokuuta",
    "September": "syyskuuta",
    "October": "lokakuuta",
    "November": "marraskuuta",
    "December": "joulukuuta",
    "Jan": "tammik.",
    "Feb": "helmik.",
    "Mar": "maalisk.",
    "Apr": "huhtik.",
    "May(short)": "toukok.",
    "Jun": "kesäk.",
    "Jul": "heinäk.",
    "Aug": "elok.",
    "Sep": "syysk.",
    "Oct": "lokak.",
    "Nov": "marrask.",
    "Dec": "jouluk.",
    // Weekdays.
    "Sunday": "sunnuntaina",
    "Monday": "maanantaina",
    "Tuesday": "tiistaina",
    "Wednesday": "keskiviikkona",
    "Thursday": "torstaina",
    "Friday": "perjantaina",
    "Saturday": "lauantaina",
    "Sun": "su",
    "Mon": "ma",
    "Tue": "ti",
    "Wed": "ke",
    "Thu": "to",
    "Fri": "pe",
    "Sat": "la",
    // Date ordinal function.
    //
    // This is used when adding number ordinal when formatting days in dates.
    //
    // E.g. "January 1st", "February 2nd".
    //
    // The function accepts day number, and returns a string to be added to the
    // day, like in default English translation, if we pass in 2, we will receive
    // "nd" back.
    "_dateOrd": function (day) {
        var res = "th";
        if ((day < 11) || (day > 13)) {
            switch (day % 10) {
                case 1:
                    res = "st";
                    break;
                case 2:
                    res = "nd";
                    break;
                case 3:
                    res = "rd";
                    break;
            }
        }
        return res;
    },
    // Various chart controls.
    // Shown as a tooltip on zoom out button.
    "Zoom Out": "Tarkennus",
    // Timeline buttons
    "Play": "Toista",
    "Stop": "Lopeta",
    // Chart's Legend screen reader title.
    "Legend": "Selite",
    // Legend's item screen reader indicator.
    "Click, tap or press ENTER to toggle": "",
    // Shown when the chart is busy loading something.
    "Loading": "Ladataan",
    // Shown as the first button in the breadcrumb navigation, e.g.:
    // Home > First level > ...
    "Home": "Aloitussivu",
    // Chart types.
    // Those are used as default screen reader titles for the main chart element
    // unless developer has set some more descriptive title.
    "Chart": "",
    "Serial chart": "",
    "X/Y chart": "",
    "Pie chart": "",
    "Gauge chart": "",
    "Radar chart": "",
    "Sankey diagram": "",
    "Flow diagram": "",
    "Chord diagram": "",
    "TreeMap chart": "",
    "Sliced chart": "",
    // Series types.
    // Used to name series by type for screen readers if they do not have their
    // name set.
    "Series": "",
    "Candlestick Series": "",
    "OHLC Series": "",
    "Column Series": "",
    "Line Series": "",
    "Pie Slice Series": "",
    "Funnel Series": "",
    "Pyramid Series": "",
    "X/Y Series": "",
    // Map-related stuff.
    "Map": "",
    "Press ENTER to zoom in": "",
    "Press ENTER to zoom out": "",
    "Use arrow keys to zoom in and out": "",
    "Use plus and minus keys on your keyboard to zoom in and out": "",
    // Export-related stuff.
    // These prompts are used in Export menu labels.
    //
    // "Export" is the top-level menu item.
    //
    // "Image", "Data", "Print" as second-level indicating type of export
    // operation.
    //
    // Leave actual format untranslated, unless you absolutely know that they
    // would convey more meaning in some other way.
    "Export": "Tulosta",
    "Image": "kuva",
    "Data": "Data",
    "Print": "Tulosta",
    "Click, tap or press ENTER to open": "",
    "Click, tap or press ENTER to print.": "",
    "Click, tap or press ENTER to export as %1.": "",
    'To save the image, right-click this link and choose "Save picture as..."': "",
    'To save the image, right-click thumbnail on the left and choose "Save picture as..."': "",
    "(Press ESC to close this message)": "",
    "Image Export Complete": "",
    "Export operation took longer than expected. Something might have gone wrong.": "",
    "Saved from": "",
    "PNG": "",
    "JPG": "",
    "GIF": "",
    "SVG": "",
    "PDF": "",
    "JSON": "",
    "CSV": "",
    "XLSX": "",
    // Scrollbar-related stuff.
    //
    // Scrollbar is a control which can zoom and pan the axes on the chart.
    //
    // Each scrollbar has two grips: left or right (for horizontal scrollbar) or
    // upper and lower (for vertical one).
    //
    // Prompts change in relation to whether Scrollbar is vertical or horizontal.
    //
    // The final section is used to indicate the current range of selection.
    "Use TAB to select grip buttons or left and right arrows to change selection": "",
    "Use left and right arrows to move selection": "",
    "Use left and right arrows to move left selection": "",
    "Use left and right arrows to move right selection": "",
    "Use TAB select grip buttons or up and down arrows to change selection": "",
    "Use up and down arrows to move selection": "",
    "Use up and down arrows to move lower selection": "",
    "Use up and down arrows to move upper selection": "",
    "From %1 to %2": "Mistä %1 mihin %2",
    "From %1": "Mistä %1",
    "To %1": "Mihin %1",
    // Data loader-related.
    "No parser available for file: %1": "",
    "Error parsing file: %1": "",
    "Unable to load file: %1": "",
    "Invalid date": "",
};
//# sourceMappingURL=fi_FI.js.map
/**
 * amCharts 4 locale
 *
 * Locale: sl-SI
 * Language: Slovenian
 * Author: Miha Kurent
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
    "_thousandSeparator": ".",
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
    "_era_ad": "n. št.",
    "_era_bc": "pr. n. št.",
    // Day part, used in 12-hour formats, e.g. 5 P.M.
    // Please note that these come in 3 variants:
    // * one letter (e.g. "A")
    // * two letters (e.g. "AM")
    // * two letters with dots (e.g. "A.M.")
    // 
    // All three need to to be translated even if they are all the same. Some
    // users might use one, some the other.
    "A": "A",
    "P": "P",
    "AM": "AM",
    "PM": "PM",
    "A.M.": "A.M.",
    "P.M.": "P.M.",
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
    "January": "Januar",
    "February": "Februar",
    "March": "Marec",
    "April": "April",
    "May": "Maj",
    "June": "Junij",
    "July": "Julij",
    "August": "Avgust",
    "September": "September",
    "October": "Oktober",
    "November": "November",
    "December": "December",
    "Jan": "Jan",
    "Feb": "Feb",
    "Mar": "Mar",
    "Apr": "Apr",
    "May(short)": "Maj",
    "Jun": "Jun",
    "Jul": "Jul",
    "Aug": "Avg",
    "Sep": "Sep",
    "Oct": "Okt",
    "Nov": "Nov",
    "Dec": "Dec",
    // Weekdays.
    "Sunday": "Nedelja",
    "Monday": "Ponedeljek",
    "Tuesday": "Torek",
    "Wednesday": "Sreda",
    "Thursday": "Četrtek",
    "Friday": "Petek",
    "Saturday": "Sobota",
    "Sun": "Ned",
    "Mon": "Pon",
    "Tue": "Tor",
    "Wed": "Sre",
    "Thu": "Čet",
    "Fri": "Pet",
    "Sat": "Sob",
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
        return ".";
    },
    // Various chart controls.
    // Shown as a tooltip on zoom out button.
    "Zoom Out": "Oddalji pogled",
    // Timeline buttons
    "Play": "Zaženi",
    "Stop": "Ustavi",
    // Chart's Legend screen reader title.
    "Legend": "Legenda",
    // Legend's item screen reader indicator.
    "Click, tap or press ENTER to toggle": "Klikni, tapni ali pritisni ENTER za preklop",
    // Shown when the chart is busy loading something.
    "Loading": "Nalagam",
    // Shown as the first button in the breadcrumb navigation, e.g.:
    // Home > First level > ...
    "Home": "Domov",
    // Chart types.
    // Those are used as default screen reader titles for the main chart element
    // unless developer has set some more descriptive title.
    "Chart": "Graf",
    "Serial chart": "Serijski graf",
    "X/Y chart": "X/Y graf",
    "Pie chart": "Tortni graf",
    "Gauge chart": "Stevčni graf",
    "Radar chart": "Radar graf",
    "Sankey diagram": "Sankey diagram",
    "Flow diagram": "Prikaz poteka",
    "Chord diagram": "Kolobarni diagram",
    "TreeMap chart": "Drevesi graf",
    "Sliced chart": "Sliced graf",
    // Series types.
    // Used to name series by type for screen readers if they do not have their
    // name set.
    "Series": "Serija",
    "Candlestick Series": "Svečna serija",
    "OHLC Series": "OHLC serija",
    "Column Series": "Stolpičasta serija",
    "Line Series": "Črtna serija",
    "Pie Slice Series": "Tortna serija",
    "Funnel Series": "Lijak serija",
    "Pyramid Series": "Piramidna serija",
    "X/Y Series": "X/Y serija",
    // Map-related stuff.
    "Map": "Mapa",
    "Press ENTER to zoom in": "Pritisni ENTER za približevanje",
    "Press ENTER to zoom out": "Pritisni ENTER za oddaljevanje",
    "Use arrow keys to zoom in and out": "Uporabi smerne tiple za približevanje in oddaljevanje",
    "Use plus and minus keys on your keyboard to zoom in and out": "Uporabi plus in minus tipke na tipkovnici za približevanje in oddaljevanje",
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
    "Export": "Izvozi",
    "Image": "Slika",
    "Data": "Podatki",
    "Print": "Natisni",
    "Click, tap or press ENTER to open": "Klikni, tapni ali pritisni ENTER da odpreš.",
    "Click, tap or press ENTER to print.": "Klikni, tapni ali pritisni ENTER za tiskanje.",
    "Click, tap or press ENTER to export as %1.": "Klikni, tapni ali pritisni ENTER da izvoziš kot %1.",
    'To save the image, right-click this link and choose "Save picture as..."': 'Da shraniš sliko, z desnim gumbom miške klikni to povezavo in izberi "Shrani sliko kot..."',
    'To save the image, right-click thumbnail on the left and choose "Save picture as..."': 'Da shraniš sliko, z desnim gumbom miške klikni sličico na levi in izberi "Shrani sliko kot..."',
    "(Press ESC to close this message)": "(Pritisni ESC da zapreš to sporočilo)",
    "Image Export Complete": "Izvoz slike končan",
    "Export operation took longer than expected. Something might have gone wrong.": "Operacija izvoza je trajala dlje kot pričakovano. Nekaj je šlo narobe.",
    "Saved from": "Shranjeno od",
    "PNG": "PNG",
    "JPG": "JPG",
    "GIF": "GIF",
    "SVG": "SVG",
    "PDF": "PDF",
    "JSON": "JSON",
    "CSV": "CSV",
    "XLSX": "XLSX",
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
    "Use TAB to select grip buttons or left and right arrows to change selection": "Uporabi TAB za izbiro drsnih gumbov ali levo in desno smerno tipko da spremeniš izbiro",
    "Use left and right arrows to move selection": "Uporabi levo in desno smerno tipko za premik izbranega",
    "Use left and right arrows to move left selection": "Uporabi levo in desno smerno tipko za premik leve izbire",
    "Use left and right arrows to move right selection": "Uporabi levo in desno smerno tipko za premik desne izbire",
    "Use TAB select grip buttons or up and down arrows to change selection": "Uporabi TAB za izbiro drsnih gumbov ali gor in dol smerno tipko da spremeniš izbiro",
    "Use up and down arrows to move selection": "Uporabi gor in dol smerne tipke za premik izbire",
    "Use up and down arrows to move lower selection": "Uporabi gor in dol smerne tipke za premik spodnje izbire",
    "Use up and down arrows to move upper selection": "Uporabi gor in dol smerne tipke za premik zgornje izbire",
    "From %1 to %2": "Od %1 do %2",
    "From %1": "Od %1",
    "To %1": "Do %1",
    // Data loader-related.
    "No parser available for file: %1": "Nobenega parserja ni na voljo za datoteko: %1",
    "Error parsing file: %1": "Napaka pri parsanju datoteke: %1",
    "Unable to load file: %1": "Ni mogoče naložiti datoteke: %1",
    "Invalid date": "Neveljaven datum",
};
//# sourceMappingURL=sl_SL.js.map
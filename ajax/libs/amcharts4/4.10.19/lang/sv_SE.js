/**
 * amCharts 4 locale
 *
 * Locale: sv
 * Language: Swedish
 * Author: Bjorn Svensson
 *
 * Follow instructions in [on this page](https://www.amcharts.com/docs/v4/tutorials/creating-translations/) to make corrections or add new translations.
 *
 * ---
 * Empty string means no translation, so default "International English"
 * will be used.
 *
 * If you need the translation to literally be an empty string, use `null`
 * instead.
 *
 * IMPORTANT:
 * When translating make good effort to keep the translation length
 * at least the same chartcount as the English, especially for short prompts.
 */
export default {
    // Number formatting options.
    // 
    // Please check with the local standards which separator is accepted to be
    // used for separating decimals, and which for thousands.
    "_decimalSeparator": ",",
    "_thousandSeparator": " ",
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
    "_date_day": "yyyy-MM-dd",
    "_date_week": "ww",
    "_date_month": "MMM",
    "_date_year": "yyyy",
    // Default duration formats for various base units.
    // 
    // This will be used by DurationFormatter to format numeric values into
    // duration.
    // 
    // Available codes here:
    // https://www.amcharts.com/docs/v4/concepts/formatters/formatting-duration/#Available_Codes
    "_duration_millisecond": "SSS",
    "_duration_second": "ss",
    "_duration_minute": "mm",
    "_duration_hour": "hh",
    "_duration_day": "dd",
    "_duration_week": "ww",
    "_duration_month": "MM",
    "_duration_year": "yyyy",
    // Era translations
    "_era_ad": "e.Kr.",
    "_era_bc": "f.Kr.",
    // Day part, used in 12-hour formats, e.g. 5 P.M.
    // Please note that these come in 3 variants:
    // * one letter (e.g. "A")
    // * two letters (e.g. "AM")
    // * two letters with dots (e.g. "A.M.")
    // 
    // All three need to to be translated even if they are all the same. Some
    // users might use one, some the other.
    "A": "fm",
    "P": "em",
    "AM": "fm",
    "PM": "em",
    "A.M.": "f.m.",
    "P.M.": "e.m.",
    // Date-related stuff.
    // 
    // When translating months, if there's a difference, use the form which is
    // best for a full date, e.g. as you would use it in "2018 January 1".
    // 
    // Note that May is listed twice. This is because in English May is the same
    // in both long and short forms, while in other languages it may not be the
    // case. Translate "May" to full word, while "May(short)" to shortened
    // version.
    "January": "januari",
    "February": "februari",
    "March": "mars",
    "April": "april",
    "May": "maj",
    "June": "juni",
    "July": "juli",
    "August": "augusti",
    "September": "september",
    "October": "oktober",
    "November": "november",
    "December": "december",
    "Jan": "jan.",
    "Feb": "feb.",
    "Mar": "mars",
    "Apr": "apr.",
    "May(short)": "maj",
    "Jun": "juni",
    "Jul": "juli",
    "Aug": "aug.",
    "Sep": "sep.",
    "Oct": "okt.",
    "Nov": "nov.",
    "Dec": "dec.",
    // Weekdays.
    "Sunday": "söndag",
    "Monday": "måndag",
    "Tuesday": "tisdag",
    "Wednesday": "onsdag",
    "Thursday": "torsdag",
    "Friday": "fredag",
    "Saturday": "lördag",
    "Sun": "sön",
    "Mon": "mån",
    "Tue": "tis",
    "Wed": "ons",
    "Thu": "tor",
    "Fri": "fre",
    "Sat": "lör",
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
        // When indicating dates, suffixes are never used in Swedish.
        return "";
    },
    // Various chart controls.
    // Shown as a tooltip on zoom out button.
    "Zoom Out": "Zooma ut",
    // Timeline buttons
    "Play": "Spela",
    "Stop": "Stoppa",
    // Chart's Legend screen reader title.
    "Legend": "Teckenförklaring",
    // Legend's item screen reader indicator.
    "Click, tap or press ENTER to toggle": "Klicka eller tryck ENTER för att ändra",
    // Shown when the chart is busy loading something.
    "Loading": "Läser in",
    // Shown as the first button in the breadcrumb navigation, e.g.:
    // Home > First level > ...
    "Home": "Hem",
    // Chart types.
    // Those are used as default screen reader titles for the main chart element
    // unless developer has set some more descriptive title.
    "Chart": "Diagram",
    "Serial chart": "Seriediagram",
    "X/Y chart": "XY-diagram",
    "Pie chart": "Tårtdiagram",
    "Gauge chart": "Instrumentdiagram",
    "Radar chart": "Radardiagram",
    "Sankey diagram": "Sankeydiagram",
    "Chord diagram": "Strängdiagram",
    "Flow diagram": "Flödesschema",
    "TreeMap chart": "Träddiagram ",
    // Series types.
    // Used to name series by type for screen readers if they do not have their
    // name set.
    "Series": "Serier",
    "Candlestick Series": "Candlestick-serier",
    "Column Series": "Kolumnserier",
    "Line Series": "Linjeserier",
    "Pie Slice Series": "Tårtserier",
    "X/Y Series": "X/Y-serier",
    // Map-related stuff.
    "Map": "Karta",
    "Press ENTER to zoom in": "Tryck RETUR för att zooma in",
    "Press ENTER to zoom out": "Tryck RETUR för att zooma ut",
    "Use arrow keys to zoom in and out": "Använd pil-knapparna för att zooma in och ut",
    "Use plus and minus keys on your keyboard to zoom in and out": "Använd plus- och minus-knapparna för att zooma in och ut",
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
    "Export": "Exportera",
    "Image": "Bild",
    "Data": "Data",
    "Print": "Skriv ut",
    "Click, tap or press ENTER to open": "Klicka eller tryck ENTER för att öppna",
    "Click, tap or press ENTER to print.": "Klicka eller tryck ENTER för att skriva ut.",
    "Click, tap or press ENTER to export as %1.": "Klicka eller tryck ENTER för att exportera till %1.",
    'To save the image, right-click this link and choose "Save picture as..."': 'För att spara bilden, höger-klicka länken och välj "Spara bild som..."',
    'To save the image, right-click thumbnail on the left and choose "Save picture as..."': 'För att spara bilden, höger-klicka miniatyrbilden till vänster och välj "Spara bild som..."',
    "(Press ESC to close this message)": "(Tryck ESC för att stänga)",
    "Image Export Complete": "Bildexport klar",
    "Export operation took longer than expected. Something might have gone wrong.": "",
    "Saved from": "Sparad från",
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
    "Use left and right arrows to move selection": "Använd vänster och höger pilknappar för att flytta urvalet",
    "Use left and right arrows to move left selection": "Använd vänster och höger pilknappar för att flytta vänsterurval",
    "Use left and right arrows to move right selection": "Använd vänster och höger pilknappar för att flytta högerurval",
    "Use TAB select grip buttons or up and down arrows to change selection": "",
    "Use up and down arrows to move selection": "Använd upp och ner pilknappar för att flytta urvalet",
    "Use up and down arrows to move lower selection": "Använd upp och ner pilknappar för att flytta nedre urvalet",
    "Use up and down arrows to move upper selection": "Använd upp och ner pilknappar för att flytta övre urvalet",
    "From %1 to %2": "Från %1 till %2",
    "From %1": "Från %1",
    "To %1": "Till %1",
    // Data loader-related.
    "No parser available for file: %1": "",
    "Error parsing file: %1": "",
    "Unable to load file: %1": "",
    "Invalid date": "Ogiltigt datum",
};
//# sourceMappingURL=sv_SE.js.map
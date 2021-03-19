/**
 * amCharts 4 locale
 *
 * Locale: de
 * Language: German
 * Author: Igor Lückel
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
    "_big_number_suffix_3": "K",
    "_big_number_suffix_6": "Mio",
    "_big_number_suffix_9": "Mrd",
    "_big_number_suffix_12": "Bio",
    "_big_number_suffix_15": "Brd",
    "_big_number_suffix_18": "Trill",
    "_big_number_suffix_21": "Trd",
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
    "_date_day": "dd. MMM",
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
    "_era_ad": "v. Chr.",
    "_era_bc": "n. Chr.",
    // Day part, used in 12-hour formats, e.g. 5 P.M.
    // Please note that these come in 3 variants:
    // * one letter (e.g. "A")
    // * two letters (e.g. "AM")
    // * two letters with dots (e.g. "A.M.")
    //
    // All three need to to be translated even if they are all the same. Some
    // users might use one, some the other.
    "A": "",
    "P": "",
    "AM": "",
    "PM": "",
    "A.M.": "",
    "P.M.": "",
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
    // Short versions follow the guidelines of the the german "Duden" (https://de.wikipedia.org/wiki/Monat#Kurzformen)
    "January": "Januar",
    "February": "Februar",
    "March": "März",
    "April": "April",
    "May": "Mai",
    "June": "Juni",
    "July": "Juli",
    "August": "August",
    "September": "September",
    "October": "Oktober",
    "November": "November",
    "December": "Dezember",
    "Jan": "Jan.",
    "Feb": "Febr.",
    "Mar": "März",
    "Apr": "Apr.",
    "May(short)": "Mai",
    "Jun": "Juni",
    "Jul": "Juli",
    "Aug": "Aug.",
    "Sep": "Sept.",
    "Oct": "Okt.",
    "Nov": "Nov.",
    "Dec": "Dez.",
    // Weekdays.
    // Short versions follow the guidelines of the the german "Duden"
    "Sunday": "Sonntag",
    "Monday": "Montag",
    "Tuesday": "Dienstag",
    "Wednesday": "Mittwoch",
    "Thursday": "Donnerstag",
    "Friday": "Freitag",
    "Saturday": "Samstag",
    "Sun": "So.",
    "Mon": "Mo.",
    "Tue": "Di.",
    "Wed": "Mi.",
    "Thu": "Do.",
    "Fri": "Fr.",
    "Sat": "Sa.",
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
        return day + '.';
    },
    // Various chart controls.
    // Shown as a tooltip on zoom out button.
    "Zoom Out": "Herauszoomen",
    // Timeline buttons
    "Play": "Abspielen",
    "Stop": "Stop",
    // Chart's Legend screen reader title.
    "Legend": "Legende",
    // Legend's item screen reader indicator.
    "Click, tap or press ENTER to toggle": "Klicken, tippen oder ENTER drücken zum Umschalten",
    // Shown when the chart is busy loading something.
    "Loading": "Wird geladen",
    // Shown as the first button in the breadcrumb navigation, e.g.:
    // Home > First level > ...
    "Home": "Home",
    // Chart types.
    // Those are used as default screen reader titles for the main chart element
    // unless developer has set some more descriptive title.
    "Chart": "Diagramm",
    "Serial chart": "Seriendiagramm",
    "X/Y chart": "X-Y-Diagramm",
    "Pie chart": "Kreisdiagramm",
    "Gauge chart": "Messdiagramm",
    "Radar chart": "Netzdiagramm",
    "Sankey diagram": "Sankey-Diagramm",
    "Chord diagram": "",
    "Flow diagram": "Flussdiagramm",
    "TreeMap chart": "Baumdiagramm",
    // Series types.
    // Used to name series by type for screen readers if they do not have their
    // name set.
    "Series": "Serie",
    "Candlestick Series": "Kerzendiagramm",
    "Column Series": "Balkendiagramm",
    "Line Series": "Liniendiagramm",
    "Pie Slice Series": "Kreisdiagramm",
    "X/Y Series": "Punktdiagramm",
    // Map-related stuff.
    "Map": "Karte",
    "Press ENTER to zoom in": "Drücke ENTER zum Hereinzoomen",
    "Press ENTER to zoom out": "Drücke ENTER zum Herauszoomen",
    "Use arrow keys to zoom in and out": "Benutze die Pfeiltasten zum Zoomen",
    "Use plus and minus keys on your keyboard to zoom in and out": "Benutze Plus- und Minustasten zum Zoomen",
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
    "Export": "Export",
    "Image": "Bild",
    "Data": "Daten",
    "Print": "Drucken",
    "Click, tap or press ENTER to open": "Zum Öffnen klicken, tippen oder ENTER drücken",
    "Click, tap or press ENTER to print.": "Zum Drucken klicken, tippen oder ENTER drücken.",
    "Click, tap or press ENTER to export as %1.": "Klicken, tippen oder ENTER drücken um als %1 zu exportieren",
    'To save the image, right-click this link and choose "Save picture as..."': 'Um das Bild zu speichern, Rechtsklicken und "Bild speichern unter ..." auswählen',
    'To save the image, right-click thumbnail on the left and choose "Save picture as..."': 'Um das Bild zu speichern, Rechtsklick auf das Vorschaubild links und "Bild speichern unter ..." auswählen',
    "(Press ESC to close this message)": "ESC drücken um diese Nachricht zu schließen",
    "Image Export Complete": "Bildexport komplett",
    "Export operation took longer than expected. Something might have gone wrong.": "Der Export dauert länger als geplant. Vielleicht ist etwas schiefgelaufen.",
    "Saved from": "Gespeichert von",
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
    "Use TAB to select grip buttons or left and right arrows to change selection": "TAB nutzen, um Ankerpunkte auszuwählen oder linke und rechte Pfeiltaste um die Auswahl zu ändern",
    "Use left and right arrows to move selection": "Linke und rechte Pfeiltaste nutzen um die Auswahl zu verschieben",
    "Use left and right arrows to move left selection": "Linke und rechte Pfeiltaste nutzen um die linke Auswahl zu verschieben",
    "Use left and right arrows to move right selection": "Linke und rechte Pfeiltaste nutzen um die rechte Auswahl zu verschieben",
    "Use TAB select grip buttons or up and down arrows to change selection": "TAB nutzen, um Ankerpunkte auszuwählen oder Pfeiltaste nach oben und unten drücken, um die Auswahl zu ändern",
    "Use up and down arrows to move selection": "Pfeiltaste nach oben und unten drücken, um die Auswahl zu verschieben",
    "Use up and down arrows to move lower selection": "Pfeiltaste nach oben und unten drücken, um die untere Auswahl zu verschieben",
    "Use up and down arrows to move upper selection": "Pfeiltaste nach oben und unten drücken, um die obere Auswahl zu verschieben",
    "From %1 to %2": "Von %1 bis %2",
    "From %1": "Von %1",
    "To %1": "Bis %1",
    // Data loader-related.
    "No parser available for file: %1": "Kein Parser für Datei %1 verfügbar",
    "Error parsing file: %1": "Fehler beim Parsen von Datei %1",
    "Unable to load file: %1": "Datei %1 konnte nicht geladen werden",
    "Invalid date": "Kein Datum",
};
//# sourceMappingURL=de_DE.js.map
/**
 * amCharts 4 locale
 *
 * Locale: it_IT
 * Language: Italian
 * Author: Francesco Sorbello
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
    "_date_day": "dd MMM",
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
    "_duration_millisecond_hour": "HH:mm:ss SSS",
    "_duration_millisecond_day": "d'g' mm:ss SSS",
    "_duration_millisecond_week": "d'g' mm:ss SSS",
    "_duration_millisecond_month": "M'm' dd'g' mm:ss SSS",
    "_duration_millisecond_year": "y'a' MM'm' dd'g' mm:ss SSS",
    "_duration_second": "ss",
    "_duration_second_minute": "mm:ss",
    "_duration_second_hour": "hh:mm:ss",
    "_duration_second_day": "d'g' hh:mm:ss",
    "_duration_second_week": "d'g' hh:mm:ss",
    "_duration_second_month": "M'm' dd'g' hh:mm:ss",
    "_duration_second_year": "y'a' MM'm' dd'g' hh:mm:ss",
    "_duration_minute": "mm",
    "_duration_minute_hour": "hh:mm",
    "_duration_minute_day": "d'g' hh:mm",
    "_duration_minute_week": "d'g' hh:mm",
    "_duration_minute_month": "M'm' dd'g' hh:mm",
    "_duration_minute_year": "y'a' MM'm' dd'g' hh:mm",
    "_duration_hour": "hh'o'",
    "_duration_hour_day": "d'g' hh'o'",
    "_duration_hour_week": "d'g' hh'o'",
    "_duration_hour_month": "M'm' dd'g' hh'o'",
    "_duration_hour_year": "y'a' MM'm' dd'g' hh'o'",
    "_duration_day": "d'g'",
    "_duration_day_week": "d'g'",
    "_duration_day_month": "M'm' dd'g'",
    "_duration_day_year": "y'a' MM'm' dd'g'",
    "_duration_week": "w's'",
    "_duration_week_month": "w's'",
    "_duration_week_year": "w's'",
    "_duration_month": "M'm'",
    "_duration_month_year": "y'a' MM'm'",
    "_duration_year": "y'a'",
    // Era translations
    "_era_ad": "A.C.",
    "_era_bc": "D.C.",
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
    // Should month names and weekdays be capitalized or not?
    // 
    // Rule of thumb is this: if the names should always be capitalized,
    // regardless of name position within date ("January", "21st January 2018",
    // etc.) use capitalized names. Otherwise enter all lowercase.
    // 
    // The date formatter will automatically capitalize names if they are the
    // first (or only) word in resulting date.
    "January": "Gennaio",
    "February": "Febbraio",
    "March": "Marzo",
    "April": "Aprile",
    "May": "Maggio",
    "June": "Giugno",
    "July": "Luglio",
    "August": "Agosto",
    "September": "Settembre",
    "October": "Ottobre",
    "November": "Novembre",
    "December": "Dicembre",
    "Jan": "Gen",
    "Feb": "Feb",
    "Mar": "Mar",
    "Apr": "Apr",
    "May(short)": "Mag",
    "Jun": "Giu",
    "Jul": "Lug",
    "Aug": "Ago",
    "Sep": "Set",
    "Oct": "Ott",
    "Nov": "Nov",
    "Dec": "Dic",
    // Weekdays.
    "Sunday": "Domenica",
    "Monday": "Lunedì",
    "Tuesday": "Martedì",
    "Wednesday": "Mercoledì",
    "Thursday": "Giovedì",
    "Friday": "Venerdì",
    "Saturday": "Sabato",
    "Sun": "Dom",
    "Mon": "Lun",
    "Tue": "Mar",
    "Wed": "Mer",
    "Thu": "Gio",
    "Fri": "Ven",
    "Sat": "Sab",
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
        return day + '°';
    },
    // Various chart controls.
    // Shown as a tooltip on zoom out button.
    "Zoom Out": "Riduci zoom",
    // Timeline buttons
    "Play": "Avvia",
    "Stop": "Ferma",
    // Chart's Legend screen reader title.
    "Legend": "Legenda",
    // Legend's item screen reader indicator.
    "Click, tap or press ENTER to toggle": "Clicca, tappa o premi ENTER per attivare",
    // Shown when the chart is busy loading something.
    "Loading": "Caricamento",
    // Shown as the first button in the breadcrumb navigation, e.g.:
    // Home > First level > ...
    "Home": "Home",
    // Chart types.
    // Those are used as default screen reader titles for the main chart element
    // unless developer has set some more descriptive title.
    "Chart": "Grafico",
    "Serial chart": "Grafico combinato",
    "X/Y chart": "Grafico X/Y",
    "Pie chart": "Grafico a torta",
    "Gauge chart": "Diagramma di livello",
    "Radar chart": "Grafico radar",
    "Sankey diagram": "Diagramma di Sankey",
    "Flow diagram": "Diagramma di flusso",
    "Chord diagram": "Diagramma a corda",
    "TreeMap chart": "Mappa ad albero",
    "Sliced chart": "Grafico a fette",
    // Series types.
    // Used to name series by type for screen readers if they do not have their
    // name set.
    "Series": "Serie",
    "Candlestick Series": "Serie a candele",
    "OHLC Series": "Serie OHLC",
    "Column Series": "Serie a colonne",
    "Line Series": "Serie a linee",
    "Pie Slice Series": "Serie a fetta di torta",
    "Funnel Series": "Serie ad imbuto",
    "Pyramid Series": "Serie a piramide",
    "X/Y Series": "Serie X/Y",
    // Map-related stuff.
    "Map": "Mappa",
    "Press ENTER to zoom in": "Premi ENTER per ingrandire",
    "Press ENTER to zoom out": "Premi ENTER per ridurre",
    "Use arrow keys to zoom in and out": "Usa le frecce per ingrandire e ridurre",
    "Use plus and minus keys on your keyboard to zoom in and out": "Utilizza i tasti più e meno sulla tastiera per ingrandire e ridurre",
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
    "Export": "Esporta",
    "Image": "Immagine",
    "Data": "Dati",
    "Print": "Stampa",
    "Click, tap or press ENTER to open": "Clicca, tappa o premi ENTER per aprire",
    "Click, tap or press ENTER to print.": "Clicca, tappa o premi ENTER per stampare.",
    "Click, tap or press ENTER to export as %1.": "Clicca, tappa o premi ENTER per esportare come %1.",
    'To save the image, right-click this link and choose "Save picture as..."': 'Per salvare l\'immagine, fai clic con il pulsante destro del mouse su questo link e seleziona "Salva immagine come ..."',
    'To save the image, right-click thumbnail on the left and choose "Save picture as..."': 'Per salvare l\'immagine, fare clic con il tasto destro del mouse sulla miniatura e selezionare "Salva immagine come ..."',
    "(Press ESC to close this message)": "(Premere ESC per chiudere questo messaggio)",
    "Image Export Complete": "Esportazione immagine completata",
    "Export operation took longer than expected. Something might have gone wrong.": "L'operazione di esportazione ha richiesto più tempo del previsto. Potrebbe esserci qualche problema.",
    "Saved from": "Salvato da",
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
    "Use TAB to select grip buttons or left and right arrows to change selection": "Utilizzare TAB per selezionare i punti di ancoraggio o i tasti freccia sinistra e destra per modificare la selezione",
    "Use left and right arrows to move selection": "Utilizzare le frecce sinistra e destra per spostare la selezione",
    "Use left and right arrows to move left selection": "Utilizzare frecce destra e sinistra per spostare la selezione sinistra",
    "Use left and right arrows to move right selection": "Utilizzare frecce destra e sinistra per spostare la selezione destra",
    "Use TAB select grip buttons or up and down arrows to change selection": "Utilizzare TAB per selezionare i punti di ancoraggio o premere le frecce su e giù per modificare la selezione",
    "Use up and down arrows to move selection": "Utilizzare le frecce su e giù per spostare la selezione",
    "Use up and down arrows to move lower selection": "Utilizzare le frecce su e giù per spostare la selezione inferiore",
    "Use up and down arrows to move upper selection": "Utilizzare le frecce su e giù per spostare la selezione superiore",
    "From %1 to %2": "Da %1 a %2",
    "From %1": "Da %1",
    "To %1": "a %1",
    // Data loader-related.
    "No parser available for file: %1": "Nessun parser disponibile per il file: %1",
    "Error parsing file: %1": "Errore durante l'analisi del file: %1",
    "Unable to load file: %1": "Impossibile caricare il file: %1",
    "Invalid date": "Data non valida",
};
//# sourceMappingURL=it_IT.js.map
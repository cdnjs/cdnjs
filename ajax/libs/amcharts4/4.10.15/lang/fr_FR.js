/**
 * amCharts 4 locale
 *
 * Locale: fr_FR
 * Language: French
 * Author: Willem Serruys
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
    "_thousandSeparator": " ",
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
    "_era_ad": "AD",
    "_era_bc": "BC",
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
    "January": "Janvier",
    "February": "Février",
    "March": "Mars",
    "April": "Avril",
    "May": "Mai",
    "June": "Juin",
    "July": "Juillet",
    "August": "Août",
    "September": "Septembre",
    "October": "Octobre",
    "November": "Novembre",
    "December": "Décembre",
    "Jan": "Jan",
    "Feb": "Fév",
    "Mar": "Mar",
    "Apr": "Avr",
    "May(short)": "Mai",
    "Jun": "Jui",
    "Jul": "Jul",
    "Aug": "Aoû",
    "Sep": "Sep",
    "Oct": "Oct",
    "Nov": "Nov",
    "Dec": "Déc",
    // Weekdays.
    "Sunday": "Dimanche",
    "Monday": "Lundi",
    "Tuesday": "Mardi",
    "Wednesday": "Mercredi",
    "Thursday": "Jeudi",
    "Friday": "Vendredi",
    "Saturday": "Samedi",
    "Sun": "Dim",
    "Mon": "Lun",
    "Tue": "Mar",
    "Wed": "Mer",
    "Thu": "Jeu",
    "Fri": "Ven",
    "Sat": "Sam",
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
        var res = "e";
        if ((day < 11) || (day > 13)) {
            switch (day % 10) {
                case 1:
                    res = "er";
                    break;
            }
        }
        return res;
    },
    // Various chart controls.
    // Shown as a tooltip on zoom out button.
    "Zoom Out": "Zoom Arrière",
    // Timeline buttons
    "Play": "Joue",
    "Stop": "Arrête",
    // Chart's Legend screen reader title.
    "Legend": "Légende",
    // Legend's item screen reader indicator.
    "Click, tap or press ENTER to toggle": "cliquez, appuyez ou appuyez sur entrée pour basculer",
    // Shown when the chart is busy loading something.
    "Loading": "Charger",
    // Shown as the first button in the breadcrumb navigation, e.g.:
    // Home > First level > ...
    "Home": "Accueil",
    // Chart types.
    // Those are used as default screen reader titles for the main chart element
    // unless developer has set some more descriptive title.
    "Chart": "Graphique",
    "Serial chart": "Graphique sérial",
    "X/Y chart": "Graphique X/Y",
    "Pie chart": "Camembert",
    "Gauge chart": "Jauge graphique",
    "Radar chart": "Carte radar",
    "Sankey diagram": "Graphique Sankey",
    "Flow diagram": "représentation schématique",
    "Chord diagram": "diagramme d'accord",
    "TreeMap chart": "carte de l'arbre",
    "Sliced chart": "graphique en tranches",
    // Series types.
    // Used to name series by type for screen readers if they do not have their
    // name set.
    "Series": "Séries",
    "Candlestick Series": "Séries chandelier",
    "OHLC Series": "Séries OHLC",
    "Column Series": "Séries de colonnes",
    "Line Series": "Série de lignes",
    "Pie Slice Series": "Tarte tranche Séries",
    "Funnel Series": "Séries d'entonnoir",
    "Pyramid Series": "Séries pyramidale",
    "X/Y Series": "Séries X/Y",
    // Map-related stuff.
    "Map": "Mappe",
    "Press ENTER to zoom in": "Appuyez sur ENTER pour zoomer",
    "Press ENTER to zoom out": "Appuyez sur ENTER pour effectuer un zoom arrière",
    "Use arrow keys to zoom in and out": "Utilisez les touches fléchées pour zoomer et dézoomer",
    "Use plus and minus keys on your keyboard to zoom in and out": "Utilisez les touches plus et moins de votre clavier pour effectuer un zoom avant ou arrière",
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
    "Export": "Exporter",
    "Image": "Image",
    "Data": "Data",
    "Print": "Imprimer",
    "Click, tap or press ENTER to open": "Cliquez, appuyez ou appuyez sur ENTER pour ouvrir",
    "Click, tap or press ENTER to print.": "Cliquez, appuyez ou appuyez sur ENTER pour imprimer",
    "Click, tap or press ENTER to export as %1.": "Cliquez, appuyez ou appuyez sur ENTER pour exporter comme %1",
    'To save the image, right-click this link and choose "Save picture as..."': "Pour enregistrer l'image, cliquez avec le bouton droit sur ce lien et choisissez 'Enregistrer l'image sous ...'",
    'To save the image, right-click thumbnail on the left and choose "Save picture as..."': "'Pour enregistrer l'image, cliquez sur la vignette à gauche avec le bouton droit de la souris et choisissez 'Enregistrer l'image sous ...'",
    "(Press ESC to close this message)": "(Appuyez sur ESC pour fermer ce message)",
    "Image Export Complete": "Exportation d'image terminée",
    "Export operation took longer than expected. Something might have gone wrong.": "L'exportation a pris plus de temps que prévu. Quelque chose aurait mal tourné.",
    "Saved from": "Enregistré de",
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
    "Use TAB to select grip buttons or left and right arrows to change selection": "Utilisez la touche TAB pour sélectionner les boutons des poignées ou les flèches gauche et droite pour modifier la sélection.",
    "Use left and right arrows to move selection": "Utilisez les flèches gauche et droite pour déplacer la sélection",
    "Use left and right arrows to move left selection": "Utilisez les flèches gauche et droite pour déplacer la sélection gauche",
    "Use left and right arrows to move right selection": "Utilisez les flèches gauche et droite pour déplacer la sélection droite",
    "Use TAB select grip buttons or up and down arrows to change selection": "Utilisez les boutons de sélection TAB ou les flèches vers le haut et le bas pour modifier la sélection.",
    "Use up and down arrows to move selection": "Utilisez les flèches haut et bas pour déplacer la sélection",
    "Use up and down arrows to move lower selection": "Utilisez les flèches haut et bas pour déplacer la sélection inférieure",
    "Use up and down arrows to move upper selection": "Utilisez les flèches haut et bas pour déplacer la sélection supérieure",
    "From %1 to %2": "De %1 à %2",
    "From %1": "De %1",
    "To %1": "à %1",
    // Data loader-related.
    "No parser available for file: %1": "Aucun analyseur disponible pour le fichier: %1",
    "Error parsing file: %1": "Erreur d'analyse du fichier: %1",
    "Unable to load file: %1": "Impossible de charger le fichier: %1",
    "Invalid date": "Date invalide",
};
//# sourceMappingURL=fr_FR.js.map
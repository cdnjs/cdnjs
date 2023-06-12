/**
 * amCharts 4 locale
 *
 * Locale: pt_PT
 * Language: Portuguese
 *
 * Follow instructions in [on this page](https://www.amcharts.com/docs/v4/tutorials/creating-translations/) to make corrections or add new translations.
 */
export default {
    // Number formatting options.
    // 
    // Please check with the local standards which separator is accepted to be
    // used for separating decimals, and which for thousands.
    "_decimalSeparator": ",",
    "_thousandSeparator": ".",
    // Position of the percent sign in numbers
    "_percentPrefix": null,
    "_percentSuffix": "%",
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
    "_era_ad": "DC",
    "_era_bc": "AC",
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
    "January": "Janeiro",
    "February": "Fevereiro",
    "March": "Março",
    "April": "Abril",
    "May": "Maio",
    "June": "Junho",
    "July": "Julho",
    "August": "Agosto",
    "September": "Setembro",
    "October": "Outubro",
    "November": "Novembro",
    "December": "Dezembro",
    "Jan": "Jan",
    "Feb": "Fev",
    "Mar": "Mar",
    "Apr": "Abr",
    "May(short)": "Mai",
    "Jun": "Jun",
    "Jul": "Jul",
    "Aug": "Ago",
    "Sep": "Set",
    "Oct": "Out",
    "Nov": "Nov",
    "Dec": "Dez",
    // Weekdays.
    "Sunday": "Domingo",
    "Monday": "Segunda-feira",
    "Tuesday": "Terça-feira",
    "Wednesday": "Quarta-feira",
    "Thursday": "Quinta-feira",
    "Friday": "Sexta-feira",
    "Saturday": "Sábado",
    "Sun": "Dom",
    "Mon": "Seg",
    "Tue": "Ter",
    "Wed": "Qua",
    "Thu": "Qui",
    "Fri": "Sex",
    "Sat": "Sáb",
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
        return "º";
    },
    // Various chart controls.
    // Shown as a tooltip on zoom out button.
    "Zoom Out": "Reduzir Zoom",
    // Timeline buttons
    "Play": "Play",
    "Stop": "Parar",
    // Chart's Legend screen reader title.
    "Legend": "Legenda",
    // Legend's item screen reader indicator.
    "Click, tap or press ENTER to toggle": "Clique, toque ou pressione ENTER para alternar",
    // Shown when the chart is busy loading something.
    "Loading": "Carregando",
    // Shown as the first button in the breadcrumb navigation, e.g.:
    // Home > First level > ...
    "Home": "Início",
    // Chart types.
    // Those are used as default screen reader titles for the main chart element
    // unless developer has set some more descriptive title.
    "Chart": "Gráfico",
    "Serial chart": "Gráfico Serial",
    "X/Y chart": "Gráfico XY",
    "Pie chart": "Gráfico de Pizza",
    "Gauge chart": "Gráfico Indicador",
    "Radar chart": "Gráfico de Radar",
    "Sankey diagram": "Diagrama Sankey",
    "Chord diagram": "Diagram Chord",
    "Flow diagram": "Diagrama Flow",
    "TreeMap chart": "Gráfico de Mapa de Árvore",
    // Series types.
    // Used to name series by type for screen readers if they do not have their
    // name set.
    "Series": "Séries",
    "Candlestick Series": "Séries do Candlestick",
    "Column Series": "Séries de Colunas",
    "Line Series": "Séries de Linhas",
    "Pie Slice Series": "Séries de Fatias de Pizza",
    "X/Y Series": "Séries de XY",
    // Map-related stuff.
    "Map": "Mapa",
    "Press ENTER to zoom in": "Pressione ENTER para aumentar o zoom",
    "Press ENTER to zoom out": "Pressione ENTER para diminuir o zoom",
    "Use arrow keys to zoom in and out": "Use as setas para diminuir ou aumentar o zoom",
    "Use plus and minus keys on your keyboard to zoom in and out": "Use as teclas mais ou menos no seu teclado para diminuir ou aumentar o zoom",
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
    "Export": "Exportar",
    "Image": "Imagem",
    "Data": "Dados",
    "Print": "Imprimir",
    "Click, tap or press ENTER to open": "Clique, toque ou pressione ENTER para abrir",
    "Click, tap or press ENTER to print.": "Clique, toque ou pressione ENTER para imprimir",
    "Click, tap or press ENTER to export as %1.": "Clique, toque ou pressione ENTER para exportar como %1.",
    'To save the image, right-click this link and choose "Save picture as..."': "Para salvar a imagem, clique no link com o botão da direira e escolha \"Salvar imagem como...\"",
    'To save the image, right-click thumbnail on the left and choose "Save picture as..."': "Para salvar, clique na imagem à esquerda com o botão direito e escolha \"Salvar imagem como...\"",
    "(Press ESC to close this message)": "(Pressione ESC para fechar esta mensagem)",
    "Image Export Complete": "A exportação da imagem foi completada",
    "Export operation took longer than expected. Something might have gone wrong.": "A exportação da imagem demorou mais do que o experado. Algo deve ter dado errado.",
    "Saved from": "Salvo de",
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
    "Use TAB to select grip buttons or left and right arrows to change selection": "Use TAB para selecionar os botões ou setas para a direita ou esquerda para mudar a seleção",
    "Use left and right arrows to move selection": "Use as setas para a esquerda ou direita para mover a seleção",
    "Use left and right arrows to move left selection": "Use as setas para a esquerda ou direita para mover a seleção da esquerda",
    "Use left and right arrows to move right selection": "Use as setas para a esquerda ou direita para mover a seleção da direita",
    "Use TAB select grip buttons or up and down arrows to change selection": "Use TAB para selecionar os botões ou setas para cima ou para baixo para mudar a seleção",
    "Use up and down arrows to move selection": "Use as setas para cima ou para baixo para mover a seleção",
    "Use up and down arrows to move lower selection": "Use as setas para cima ou para baixo para mover a seleção de baixo",
    "Use up and down arrows to move upper selection": "Use as setas para cima ou para baixo para mover a seleção de cima",
    "From %1 to %2": "De %1 até %2",
    "From %1": "De %1",
    "To %1": "Até %1",
    // Data loader-related.
    "No parser available for file: %1": "Nenhum interpretador está disponível para este arquivo: %1",
    "Error parsing file: %1": "Erro ao analizar o arquivo: %1",
    "Unable to load file: %1": "O arquivo não pôde ser carregado: %1",
    "Invalid date": "Data inválida",
};
//# sourceMappingURL=pt_PT.js.map
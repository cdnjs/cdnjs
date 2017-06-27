Ext.define("Ext.locale.it.LoadMask", {
    override: "Ext.LoadMask",

    msg: "Caricamento..." 
});
Ext.define("Ext.locale.it.data.validator.Bound", {
    override: "Ext.data.validator.Bound",

    emptyMessage: "Obbligatorio"
});
Ext.define("Ext.locale.it.data.validator.Email", {
    override: "Ext.data.validator.Email",

    message: "Non \u00E8 un indirizzo email valido"
});
Ext.define("Ext.locale.it.data.validator.Exclusion", {
    override: "Ext.data.validator.Exclusion",

    message: "E' un valore che \u00E8 stato escluso"
});
Ext.define("Ext.locale.it.data.validator.Format", {
    override: "Ext.data.validator.Format",

    message: "E' nel formato errato" 
});
Ext.define("Ext.locale.it.data.validator.Inclusion", {
    override: "Ext.data.validator.Inclusion",

    message: "Non \u00E8 nell'elenco dei valori consentiti"
});
Ext.define("Ext.locale.it.data.validator.Length", {
    override: "Ext.data.validator.Length",

    minOnlyMessage: "Lunghezza minima {0}", 
    maxOnlyMessage: "Lunghezza massima {0}",
    bothMessage: "Lunghezza compresa tra {0} e {1}" 
});
Ext.define("Ext.locale.it.data.validator.Presence", {
    override: "Ext.data.validator.Presence",

    message: "Obbligatorio" 
});
Ext.define("Ext.locale.it.data.validator.Range", {
    override: "Ext.data.validator.Range",

    minOnlyMessage: "Deve essere minimo {0}",
    maxOnlyMessage: "Deve essere massimo {0}",
    bothMessage: "Deve essere compreso tra {0} e {1}",
    nanMessage: "Deve essere un valore numerico" 
});
/**
 * Italian translation
 * 2016-06-28 updated by Fabio De Paolis (update to ExtJs 6.0.2)
 * 2012-05-28 updated by Fabio De Paolis (many changes, update to 4.1.0)
 * 2007-12-21 updated by Federico Grilli
 * 2007-10-04 updated by eric_void
 */
Ext.onReady(function() {
    if (Ext.Date) {
        Ext.Date.monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            Gen: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            Mag: 4,
            Giu: 5,
            Lug: 6,
            Ago: 7,
            Set: 8,
            Ott: 9,
            Nov: 10,
            Dic: 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u20ac', // Euro
            dateFormat: 'd/m/Y'
        });
    }
});
Ext.define("Ext.locale.it.form.Basic", {
    override: "Ext.form.Basic",

    waitTitle: "Attendere..."
});
Ext.define("Ext.locale.it.form.CheckboxGroup", {
    override: "Ext.form.CheckboxGroup",

    blankText: "Selezionare almeno un elemento nel gruppo"
});
Ext.define("Ext.locale.it.form.FieldSet", {
    override: "Ext.form.FieldSet",

    descriptionText: "{0} Gruppo", 
    expandText: "Espandi il Gruppo" 
});
Ext.define("Ext.locale.it.form.RadioGroup", {
    override: "Ext.form.RadioGroup",

    blankText: "Selezionare un elemento nel gruppo"
});
Ext.define("Ext.locale.it.form.field.Base", {
    override: "Ext.form.field.Base",

    invalidText: "Valore non valido" 
});
Ext.define("Ext.locale.it.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",

    valueNotFoundText: undefined
},
function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Caricamento..."
    });
});
Ext.define("Ext.locale.it.form.field.Date", {
    override: "Ext.form.field.Date",

    format: "d/m/Y", 
    ariaFormat: 'M j Y',
    altFormats: "d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d",
    disabledDaysText: "Disabilitato", 
    ariaDisabledDaysText: "Questo giorno \u00E8 disabilitato",
    disabledDatesText: "Disabilitato", 
    ariaDisabledDatesText: "Questa data non pu\u00F2 essere selezionata",
    minText: "La data deve essere maggiore o uguale a {0}",
    ariaMinText: "La data deve essere maggiore o uguale a {0}",
    maxText: "La data deve essere minore o uguale a {0}",
    ariaMaxText: "La data deve essere minore o uguale a {0}",
    invalidText: "{0} non \u00E8 una data valida, deve essere nel formato {1}",
    formatText: "Il formato richiesto \u00E8 {1}"
});
Ext.define("Ext.locale.it.form.field.File", {
    override: "Ext.form.field.File",

    buttonText: 'Scegli...'
});
Ext.define("Ext.locale.it.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",

    createLinkText: 'Inserire un URL per il link:'
},
function() {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Grassetto (Ctrl+B)',
                text: 'Testo selezionato in Grassetto.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Corsivo (Ctrl+I)',
                text: 'Testo selezionato in Corsivo.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Sottolinea (Ctrl+U)',
                text: 'Sottolinea il testo selezionato.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Ingrandisci testo', 
                text: 'Aumenta la dimensione del carattere.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Riduci testo',
                text: 'Diminuisce la dimensione del carattere.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Colore evidenziazione testo',
                text: 'Modifica il colore di sfondo del testo selezionato.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Colore carattere', 
                text: 'Modifica il colore del testo selezionato.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Allinea a sinistra', 
                text: 'Allinea il testo a sinistra.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Centra', 
                text: 'Centra il testo.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Allinea a destra',
                text: 'Allinea il testo a destra.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Elenco puntato', 
                text: 'Inserisci un elenco puntato.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Elenco numerato',
                text: 'Inserisci un elenco numerato.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Collegamento',
                text: 'Trasforma il testo selezionato in un collegamanto.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Sorgente',
                text: 'Passa alla modalit\u00E0 modifica del sorgente.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});
Ext.define("Ext.locale.it.form.field.Number", {
    override: "Ext.form.field.Number",

    minText: "Il valore minimo \u00E8 {0}", 
    maxText: "Il valore massimo \u00E8 {0}", 
    nanText: "{0} non \u00E8 un valore numerico valido",
    negativeText: "Il valore non pu\u00F2 essere negativo"
});
Ext.define("Ext.locale.it.form.field.Text", {
    override: "Ext.form.field.Text",

    minLengthText: "La lunghezza minima \u00E8 {0}",
    maxLengthText: "La lunghezza massima \u00E8 {0}",
    blankText: "Campo obbligatorio"
});
Ext.define("Ext.locale.it.form.field.Time", {
    override: "Ext.form.field.Time",

    minText: "L'Ora deve essere maggiore o uguale a {0}",
    maxText: "L'Ora deve essere minore o uguale a {0}",
    invalidText: "{0} non \u00E8 un Orario valido", 
    format: "H:i",
    formatText: "Il formato richiesto \u00E8 HH:MM" 
});
Ext.define("Ext.locale.it.form.field.VTypes", {
    override: "Ext.form.field.VTypes",

    emailText: 'Il campo deve essere un indirizzo e-mail nel formato "nome@esempio.it"', 
    urlText: 'Il campo deve essere un indirizzo URL nel formato "http:/' + '/www.esempio.it"', 
    alphaText: 'Il campo deve contenere solo lettere e _', 
    alphanumText: 'Il campo deve contenere solo lettere, numeri e _'
});
Ext.define("Ext.locale.it.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",

    nameText: "Nome",
    valueText: "Value",
    dateFormat: "j/m/Y",
    trueText: "vero",
    falseText: "falso"
});
Ext.define("Ext.locale.it.grid.RowEditor", {
    override: "Ext.grid.RowEditor",

    saveBtnText: 'Invia', 
    cancelBtnText: 'Annulla',
    errorsText: 'Errori', 
    dirtyText: 'Confermare o annullare i cambiamenti'
});
Ext.define("Ext.locale.it.grid.column.Boolean", {
    override: "Ext.grid.column.Boolean",

    trueText: "vero",
    falseText: "falso"
});
Ext.define("Ext.locale.it.grid.column.Number", {
    override: "Ext.grid.column.Number",

    format: '0.000,00' 
});
Ext.define("Ext.locale.it.grid.feature.Grouping", {
    override: "Ext.grid.feature.Grouping",

    groupByText: 'Raggruppa per questo campo',
    showGroupsText: 'Mostra nei gruppi', 
    expandTip: 'Clicca per espandere. Con il tasto CTRL riduce tutti gli altri',
    collapseTip: 'Clicca per ridurre. Con il tasto CTRL espande tutti gli altri'
});
Ext.define("Ext.locale.it.grid.filters.Filters", {
    override: "Ext.grid.filters.Filters",

    menuFilterText: 'Filtri' 
});
Ext.define("Ext.locale.it.grid.filters.filter.Boolean", {
    override: "Ext.grid.filters.filter.Boolean",

    yesText: 'Si',
    noText: 'No'
});
Ext.define("Ext.locale.it.grid.filters.filter.Date", {
    override: "Ext.grid.filters.filter.Date",

    getFields: function () {
        return {
            lt: { text: 'Prima del' },
            gt: { text: 'Dopo il' },
            eq: { text: 'Il giorno' }
        };
    }
});
Ext.define("Ext.locale.it.grid.filters.filter.List", {
    override: "Ext.grid.filters.filter.List",

    loadingText: 'Caricamento...'
});
Ext.define("Ext.locale.it.grid.filters.filter.Number", {
    override: "Ext.grid.filters.filter.Number",

    emptyText: 'Inserisci il Numero...'
});
Ext.define("Ext.locale.it.grid.filters.filter.String", {
    override: "Ext.grid.filters.filter.String",

    emptyText: 'Inserisci il Valore...'
});
Ext.define("Ext.locale.it.grid.header.Container", {
    override: "Ext.grid.header.Container",

    sortAscText: "Ordinamento Crescente", 
    sortDescText: "Ordinamento Decrescente",
    sortClearText: "Senza Ordinamento naturale",
    columnsText: "Colonne" 
});
Ext.define("Ext.locale.it.grid.locking.Lockable", {
    override: "Ext.grid.Lockable",

    lockText: "Blocca colonna", 
    unlockText: "Sblocca colonna" 
});
Ext.define("Ext.locale.it.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",

    dragText: "{0} Righe selezionate"
});
Ext.define("Ext.locale.it.menu.CheckItem", {
    override: 'Ext.menu.CheckItem',

    submenuText: '{0} sottomenu'
});
Ext.define("Ext.locale.it.menu.DatePicker", {
    override: 'Ext.menu.DatePicker',

    ariaLabel: 'Scegli Data'
});
Ext.define("Ext.locale.it.panel.Panel", {
    override: 'Ext.panel.Panel',

    closeToolText: 'Chiudi', 
    collapseToolText: 'Riduci',
    expandToolText: 'Espandi' 
});
Ext.define("Ext.locale.it.picker.Date", {
    override: 'Ext.picker.Date',

    todayText: 'Oggi',
    ariaTitle: 'Scegli Data: {0}',
    ariaTitleDateFormat: 'F d',
    todayTip: '{0} (Barra spaziatrice)',
    minText: 'Data precedente alla data minima',
    ariaMinText: 'La data \u00E8 minore di quella minima consentita',
    maxText: 'Data successiva alla data massima',
    ariaMaxText: 'La data \u00E8 maggiore di quella massima consentita',
    disabledDaysText: 'Disabilitato',
    ariaDisabledDaysText: 'Questo giorno \u00E8 disabilitato',
    disabledDatesText: 'Disabilitato',
    ariaDisabledDatesText: 'Questa data \u00E8 disabilitata',
    nextText: 'Mese successivo (CTRL+Destra)', 
    prevText: 'Mese precedente (CTRL+Sinistra)', 
    monthYearText: 'Scegli un Mese (CTRL+Sopra/Sotto per cambiare anno)', 
    monthYearFormat: 'F Y', 
    startDay: 0,
    longDayFormat: 'd F Y'
});
Ext.define("Ext.locale.it.picker.Month", {
    override: "Ext.picker.Month",

    okText: 'OK',
    cancelText: 'Annulla'
});
Ext.define("Ext.locale.it.picker.Time", {
    override: "Ext.picker.Time",

    format: "H:i"
});
Ext.define("Ext.locale.it.tab.Tab", {
    override: "Ext.tab.Tab",

    closeText: 'Rimuovibile'
});
Ext.define("Ext.locale.it.toolbar.Paging", {
    override: 'Ext.toolbar.Paging',

    displayMsg: 'Mostrati {0} - {1} di {2}',
    emptyMsg: 'Non ci sono dati da mostrare',
    beforePageText: 'Pagina',
    afterPageText: 'di {0}',
    firstText: 'Prima pagina',
    prevText: 'Pagina precedente',
    nextText: 'Pagina successiva',
    lastText: 'Ultima pagina',
    refreshText: 'Aggiorna' 
});
Ext.define("Ext.locale.it.tree.plugin.TreeViewDragDrop", {
    override: 'Ext.tree.plugin.TreeViewDragDrop',

    dragText: '{0} nodi selezionati' // '{0} selected node{1}',
});
Ext.define("Ext.locale.it.view.AbstractView", {
    override: "Ext.view.AbstractView",

    loadingText: "Caricamento..."
});
Ext.define("Ext.locale.it.window.MessageBox", {
    override: "Ext.window.MessageBox",

    buttonText: {
        ok: "OK", 
        cancel: "Annulla",
        yes: "Si",
        no: "No" 
    },

    titleText: {
        confirm: 'Conferma', 
        prompt: 'Richiesta', 
        wait: 'Attesa...', 
        alert: 'Attenzione' 
    }
});

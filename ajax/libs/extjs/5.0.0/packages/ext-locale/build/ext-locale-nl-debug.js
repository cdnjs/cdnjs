/**
 * List compiled by mystix on the extjs.com forums.
 * Thank you Mystix!
 *
 * Dutch Translations
 * by Ido Sebastiaan Bas van Oostveen (12 Oct 2007)
 * updated to 2.2 by Condor (8 Aug 2008)
 */
Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

        Ext.Date.getShortMonthName = function(month) {
            if (month == 2) {
                return 'mrt';
            }
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            jan: 0,
            feb: 1,
            mrt: 2,
            apr: 3,
            mei: 4,
            jun: 5,
            jul: 6,
            aug: 7,
            sep: 8,
            okt: 9,
            nov: 10,
            dec: 11
        };

        Ext.Date.getMonthNumber = function(name) {
            var sname = name.substring(0, 3).toLowerCase();
            if (sname == 'maa') {
                return 2;
            }
            return Ext.Date.monthNumbers[sname];
        };

        Ext.Date.dayNames = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };

        Ext.Date.parseCodes.S.s = "(?:ste|e)";
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u20ac',
            // Dutch Euro
            dateFormat: 'j-m-Y'
        });
    }
});

Ext.define("Ext.locale.nl.view.View", {
    override: "Ext.view.View",
    emptyText: ''
});

Ext.define("Ext.locale.nl.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: '{0} geselecteerde rij(en)'
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.nl.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: 'Bezig met laden...'
});

Ext.define("Ext.locale.nl.picker.Date", {
    override: "Ext.picker.Date",
    todayText: 'Vandaag',
    minText: 'Deze datum is eerder dan de minimale datum',
    maxText: 'Deze datum is later dan de maximale datum',
    disabledDaysText: '',
    disabledDatesText: '',
    nextText: 'Volgende maand (Ctrl+rechts)',
    prevText: 'Vorige maand (Ctrl+links)',
    monthYearText: 'Kies een maand (Ctrl+omhoog/omlaag volgend/vorig jaar)',
    todayTip: '{0} (spatie)',
    format: 'j-m-y',
    startDay: 1
});

Ext.define("Ext.locale.nl.picker.Month", {
    override: "Ext.picker.Month",
    okText: '&#160;OK&#160;',
    cancelText: 'Annuleren'
});

Ext.define("Ext.locale.nl.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: 'Pagina',
    afterPageText: 'van {0}',
    firstText: 'Eerste pagina',
    prevText: 'Vorige pagina',
    nextText: 'Volgende pagina',
    lastText: 'Laatste pagina',
    refreshText: 'Ververs',
    displayMsg: 'Getoond {0} - {1} van {2}',
    emptyMsg: 'Geen gegevens om weer te geven'
});

Ext.define("Ext.locale.nl.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: 'De waarde van dit veld is ongeldig'
});

Ext.define("Ext.locale.nl.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: 'De minimale lengte van dit veld is {0}',
    maxLengthText: 'De maximale lengte van dit veld is {0}',
    blankText: 'Dit veld is verplicht',
    regexText: '',
    emptyText: null
});

Ext.define("Ext.locale.nl.form.field.Number", {
    override: "Ext.form.field.Number",
    decimalPrecision: 2,
    minText: 'De minimale waarde van dit veld is {0}',
    maxText: 'De maximale waarde van dit veld is {0}',
    nanText: '{0} is geen geldig getal'
});

Ext.define("Ext.locale.nl.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: 'Uitgeschakeld',
    disabledDatesText: 'Uitgeschakeld',
    minText: 'De datum in dit veld moet na {0} liggen',
    maxText: 'De datum in dit veld moet voor {0} liggen',
    invalidText: '{0} is geen geldige datum - formaat voor datum is {1}',
    format: 'j-m-y',
    altFormats: 'd/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d'
});

Ext.define("Ext.locale.nl.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: 'Bezig met laden...'
    });
});

Ext.define("Ext.locale.nl.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'Dit veld moet een e-mail adres bevatten in het formaat "gebruiker@domein.nl"',
    urlText: 'Dit veld moet een URL bevatten in het formaat "http:/' + '/www.domein.nl"',
    alphaText: 'Dit veld mag alleen letters en _ bevatten',
    alphanumText: 'Dit veld mag alleen letters, cijfers en _ bevatten'
});

Ext.define("Ext.locale.nl.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Vul hier de URL voor de hyperlink in:'
}, function() {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Vet (Ctrl+B)',
                text: 'Maak de geselecteerde tekst vet.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Cursief (Ctrl+I)',
                text: 'Maak de geselecteerde tekst cursief.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Onderstrepen (Ctrl+U)',
                text: 'Onderstreep de geselecteerde tekst.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Tekst vergroten',
                text: 'Vergroot het lettertype.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Tekst verkleinen',
                text: 'Verklein het lettertype.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Tekst achtergrondkleur',
                text: 'Verander de achtergrondkleur van de geselecteerde tekst.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Tekst kleur',
                text: 'Verander de kleur van de geselecteerde tekst.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Tekst links uitlijnen',
                text: 'Lijn de tekst links uit.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Tekst centreren',
                text: 'Centreer de tekst.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Tekst rechts uitlijnen',
                text: 'Lijn de tekst rechts uit.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Opsommingstekens',
                text: 'Begin een ongenummerde lijst.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Genummerde lijst',
                text: 'Begin een genummerde lijst.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Hyperlink',
                text: 'Maak van de geselecteerde tekst een hyperlink.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Bron aanpassen',
                text: 'Schakel modus over naar bron aanpassen.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

Ext.define("Ext.locale.nl.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: 'Sorteer oplopend',
    sortDescText: 'Sorteer aflopend',
    columnsText: 'Kolommen'
});

Ext.define("Ext.locale.nl.grid.GroupingFeature", {
    override: "Ext.grid.feature.Grouping",
    emptyGroupText: '(Geen)',
    groupByText: 'Dit veld groeperen',
    showGroupsText: 'Toon in groepen'
});

Ext.define("Ext.locale.nl.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: 'Naam',
    valueText: 'Waarde',
    dateFormat: 'j-m-Y'
});

Ext.define("Ext.locale.nl.form.field.Time", {
    override: "Ext.form.field.Time",
    minText: 'De tijd in dit veld moet op of na {0} liggen',
    maxText: 'De tijd in dit veld moet op of voor {0} liggen',
    invalidText: '{0} is geen geldig tijdstip',
    format: 'G:i',
    altFormats: 'g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H'
});

Ext.define("Ext.locale.nl.form.CheckboxGroup", {
    override: "Ext.form.CheckboxGroup",
    blankText: 'Selecteer minimaal een element in deze groep'
});

Ext.define("Ext.locale.nl.form.RadioGroup", {
    override: "Ext.form.RadioGroup",
    blankText: 'Selecteer een element in deze groep'
});

Ext.define("Ext.locale.nl.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: 'OK',
        cancel: 'Annuleren',
        yes: 'Ja',
        no: 'Nee'
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.nl.Component", {	
    override: "Ext.Component"
});


/**
 *
 * Norwegian translation (Nynorsk: no-NN)
 * By Tore Kjørsvik 21-January-2008
 *
 */
Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            Mai: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Okt: 9,
            Nov: 10,
            Des: 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Søndag", "Måndag", "Tysdag", "Onsdag", "Torsdag", "Fredag", "Laurdag"];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: 'kr',
            // Norwegian Krone
            dateFormat: 'd.m.Y'
        });
    }
});

Ext.define("Ext.locale.no_NN.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.no_NN.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} markert(e) rad(er)"
});

Ext.define("Ext.locale.no_NN.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Lukk denne fana"
});

Ext.define("Ext.locale.no_NN.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "Verdien i dette feltet er ugyldig"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.no_NN.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Lastar..."
});

Ext.define("Ext.locale.no_NN.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "I dag",
    minText: "Denne datoen er før tidlegaste tillatne dato",
    maxText: "Denne datoen er etter seinaste tillatne dato",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: 'Neste månad (Control+Pil Høgre)',
    prevText: 'Førre månad (Control+Pil Venstre)',
    monthYearText: 'Velj ein månad (Control+Pil Opp/Ned for å skifte år)',
    todayTip: "{0} (Mellomrom)",
    format: "d.m.y",
    startDay: 1
});

Ext.define("Ext.locale.no_NN.picker.Month", {
    override: "Ext.picker.Month",
    okText: "&#160;OK&#160;",
    cancelText: "Avbryt"
});

Ext.define("Ext.locale.no_NN.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Side",
    afterPageText: "av {0}",
    firstText: "Første sida",
    prevText: "Førre sida",
    nextText: "Neste sida",
    lastText: "Siste sida",
    refreshText: "Oppdater",
    displayMsg: "Viser {0} - {1} av {2}",
    emptyMsg: 'Ingen data å vise'
});

Ext.define("Ext.locale.no_NN.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "Den minste lengda for dette feltet er {0}",
    maxLengthText: "Den største lengda for dette feltet er {0}",
    blankText: "Dette feltet er påkravd",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.no_NN.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "Den minste verdien for dette feltet er {0}",
    maxText: "Den største verdien for dette feltet er {0}",
    nanText: "{0} er ikkje eit gyldig nummer"
});

Ext.define("Ext.locale.no_NN.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Deaktivert",
    disabledDatesText: "Deaktivert",
    minText: "Datoen i dette feltet må vere etter {0}",
    maxText: "Datoen i dette feltet må vere før {0}",
    invalidText: "{0} er ikkje ein gyldig dato - han må vere på formatet {1}",
    format: "d.m.y",
    altFormats: "d.m.Y|d/m/y|d/m/Y|d-m-y|d-m-Y|d.m|d/m|d-m|dm|dmy|dmY|Y-m-d|d"
});

Ext.define("Ext.locale.no_NN.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Lastar..."
    });
});

Ext.define("Ext.locale.no_NN.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'Dette feltet skal vere ei epost adresse på formatet "bruker@domene.no"',
    urlText: 'Dette feltet skal vere ein link (URL) på formatet "http:/' + '/www.domene.no"',
    alphaText: 'Dette feltet skal berre innehalde bokstavar og _',
    alphanumText: 'Dette feltet skal berre innehalde bokstavar, tal og _'
});

Ext.define("Ext.locale.no_NN.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Ver venleg og skriv inn URL for lenken:'
}, function() {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Feit (Ctrl+B)',
                text: 'Gjer den valde teksten feit.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Kursiv (Ctrl+I)',
                text: 'Gjer den valde teksten kursiv.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Understrek (Ctrl+U)',
                text: 'Understrek den valde teksten.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Forstørr tekst',
                text: 'Gjer fontstorleik større.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Forminsk tekst',
                text: 'Gjer fontstorleik mindre.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Tekst markeringsfarge',
                text: 'Endre bakgrunnsfarge til den valde teksten.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Font farge',
                text: 'Endre farge på den valde teksten.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Venstrejuster tekst',
                text: 'Venstrejuster teksten.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Sentrer tekst',
                text: 'Sentrer teksten.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Høgrejuster tekst',
                text: 'Høgrejuster teksten.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Punktliste',
                text: 'Start ei punktliste.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Nummerert liste',
                text: 'Start ei nummerert liste.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Lenke',
                text: 'Gjer den valde teksten til ei lenke.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Rediger kjelde',
                text: 'Bytt til kjelderedigeringsvising.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

Ext.define("Ext.locale.no_NN.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Sorter stigande",
    sortDescText: "Sorter fallande",
    lockText: "Lås kolonne",
    unlockText: "Lås opp kolonne",
    columnsText: "Kolonner"
});

Ext.define("Ext.locale.no_NN.grid.GroupingFeature", {
    override: "Ext.grid.feature.Grouping",
    emptyGroupText: '(Ingen)',
    groupByText: 'Grupper etter dette feltet',
    showGroupsText: 'Vis i grupper'
});

Ext.define("Ext.locale.no_NN.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Namn",
    valueText: "Verdi",
    dateFormat: "d.m.Y"
});

Ext.define("Ext.locale.no_NN.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "OK",
        cancel: "Avbryt",
        yes: "Ja",
        no: "Nei"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.no_NN.Component", {	
    override: "Ext.Component"
});


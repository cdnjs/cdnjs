/**
 * Danish translation
 * By JohnF
 * 04-09-2007, 05:28 AM
 *
 * Extended and modified by Karl Krukow,
 * December, 2007.
 */
Ext.onReady(function() {
    
    if (Ext.Date) {
        Ext.Date.monthNames = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            jan: 0,
            feb: 1,
            mar: 2,
            apr: 3,
            maj: 4,
            jun: 5,
            jul: 6,
            aug: 7,
            sep: 8,
            okt: 9,
            nov: 10,
            dec: 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: 'kr',
            // Danish Krone
            dateFormat: 'd/m/Y'
        });
    }
});

Ext.define("Ext.locale.da.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.da.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} markerede rækker"
});

Ext.define("Ext.locale.da.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Luk denne fane"
});

Ext.define("Ext.locale.da.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "Værdien i dette felt er ugyldig"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.da.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Henter..."
});

Ext.define("Ext.locale.da.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "I dag",
    minText: "Denne dato er før den tidligst tilladte",
    maxText: "Denne dato er senere end den senest tilladte",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: 'Næste måned (Ctrl + højre piltast)',
    prevText: 'Forrige måned (Ctrl + venstre piltast)',
    monthYearText: 'Vælg en måned (Ctrl + op/ned pil for at ændre årstal)',
    todayTip: "{0} (mellemrum)",
    format: "d/m/y",
    startDay: 1
});

Ext.define("Ext.locale.da.picker.Month", {
    override: "Ext.picker.Month",
    okText: "&#160;OK&#160;",
    cancelText: "Cancel"
});

Ext.define("Ext.locale.da.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Side",
    afterPageText: "af {0}",
    firstText: "Første side",
    prevText: "Forrige side",
    nextText: "Næste side",
    lastText: "Sidste side",
    refreshText: "Opfrisk",
    displayMsg: "Viser {0} - {1} af {2}",
    emptyMsg: 'Der er ingen data at vise'
});

Ext.define("Ext.locale.da.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "Minimum længden for dette felt er {0}",
    maxLengthText: "Maksimum længden for dette felt er {0}",
    blankText: "Dette felt skal udfyldes",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.da.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "Mindste-værdien for dette felt er {0}",
    maxText: "Maksimum-værdien for dette felt er {0}",
    nanText: "{0} er ikke et tilladt nummer"
});

Ext.define("Ext.locale.da.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Inaktiveret",
    disabledDatesText: "Inaktiveret",
    minText: "Datoen i dette felt skal være efter {0}",
    maxText: "Datoen i dette felt skal være før {0}",
    invalidText: "{0} er ikke en tilladt dato - datoer skal angives i formatet {1}",
    format: "d/m/y",
    altFormats: "d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
});

Ext.define("Ext.locale.da.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Henter..."
    });
});

Ext.define("Ext.locale.da.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'Dette felt skal være en email adresse i formatet "xxx@yyy.zzz"',
    urlText: 'Dette felt skal være en URL i formatet "http:/' + '/xxx.yyy"',
    alphaText: 'Dette felt kan kun indeholde bogstaver og "_" (understregning)',
    alphanumText: 'Dette felt kan kun indeholde bogstaver, tal og "_" (understregning)'
});

Ext.define("Ext.locale.da.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Indtast URL:'
}, function() {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Fed (Ctrl+B)',
                //Can I change this to Ctrl+F?
                text: 'Formater det markerede tekst med fed.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Kursiv (Ctrl+I)',
                //Ctrl+K
                text: 'Formater det markerede tekst med kursiv.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Understreg (Ctrl+U)',
                text: 'Understreg det markerede tekst.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Forstør tekst',
                text: 'Forøg fontstørrelsen.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Formindsk tekst',
                text: 'Formindsk fontstørrelsen.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Farve for tekstfremhævelse',
                text: 'Skift baggrundsfarve for det markerede tekst.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Skriftfarve',
                text: 'Skift skriftfarve for det markerede tekst.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Juster venstre',
                text: 'Venstrestil tekst.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Centreret',
                text: 'Centrer tekst.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Juster højre',
                text: 'Højrestil tekst.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Punktopstilling',
                text: 'Påbegynd punktopstilling.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Nummereret opstilling',
                text: 'Påbegynd nummereret opstilling.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Hyperlink',
                text: 'Lav det markerede test til et hyperlink.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Kildetekstredigering',
                text: 'Skift til redigering af kildetekst.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

Ext.define("Ext.locale.da.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Sortér stigende",
    sortDescText: "Sortér faldende",
    lockText: "Lås kolonne",
    unlockText: "Fjern lås fra kolonne",
    columnsText: "Kolonner"
});

Ext.define("Ext.locale.da.grid.GroupingFeature", {
    override: "Ext.grid.feature.Grouping",
    emptyGroupText: '(Ingen)',
    groupByText: 'Gruppér efter dette felt',
    showGroupsText: 'Vis i grupper' //should this be sort in groups?
});

Ext.define("Ext.locale.da.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Navn",
    valueText: "Værdi",
    dateFormat: "j/m/Y"
});

Ext.define("Ext.locale.da.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "OK",
        cancel: "Fortryd",
        yes: "Ja",
        no: "Nej"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.da.Component", {	
    override: "Ext.Component"
});

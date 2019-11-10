/**
 * Slovenian translation by Matjaž (UTF-8 encoding)
 * 25 April 2007
 */
Ext.onReady(function() {
    if (Ext.Date) {
        Ext.Date.monthNames = ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"];

        Ext.Date.dayNames = ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"];
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u20ac',
            // Slovenian Euro
            dateFormat: 'd.m.Y'
        });
    }
});

Ext.define("Ext.locale.sl.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.sl.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} izbranih vrstic"
});

Ext.define("Ext.locale.sl.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Zapri zavihek"
});

Ext.define("Ext.locale.sl.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "Neveljavna vrednost"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.sl.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Nalagam..."
});

Ext.define("Ext.locale.sl.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Danes",
    minText: "Navedeni datum je pred spodnjim datumom",
    maxText: "Navedeni datum je za zgornjim datumom",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: 'Naslednji mesec (Control+Desno)',
    prevText: 'Prejšnji mesec (Control+Levo)',
    monthYearText: 'Izberite mesec (Control+Gor/Dol za premik let)',
    todayTip: "{0} (Preslednica)",
    format: "d.m.y",
    startDay: 1
});

Ext.define("Ext.locale.sl.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Stran",
    afterPageText: "od {0}",
    firstText: "Prva stran",
    prevText: "Prejšnja stran",
    nextText: "Naslednja stran",
    lastText: "Zadnja stran",
    refreshText: "Osveži",
    displayMsg: "Prikazujem {0} - {1} od {2}",
    emptyMsg: 'Ni podatkov za prikaz'
});

Ext.define("Ext.locale.sl.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "Minimalna dolžina tega polja je {0}",
    maxLengthText: "Maksimalna dolžina tega polja je {0}",
    blankText: "To polje je obvezno",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.sl.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "Minimalna vrednost tega polja je {0}",
    maxText: "Maksimalna vrednost tega polja je {0}",
    nanText: "{0} ni veljavna številka"
});

Ext.define("Ext.locale.sl.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Onemogočen",
    disabledDatesText: "Onemogočen",
    minText: "Datum mora biti po {0}",
    maxText: "Datum mora biti pred {0}",
    invalidText: "{0} ni veljaven datum - mora biti v tem formatu {1}",
    format: "d.m.y"
});

Ext.define("Ext.locale.sl.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Nalagam..."
    });
});

Ext.define("Ext.locale.sl.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'To polje je e-mail naslov formata "ime@domena.si"',
    urlText: 'To polje je URL naslov formata "http:/' + '/www.domena.si"',
    alphaText: 'To polje lahko vsebuje samo črke in _',
    alphanumText: 'To polje lahko vsebuje samo črke, številke in _'
});

Ext.define("Ext.locale.sl.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Sortiraj naraščajoče",
    sortDescText: "Sortiraj padajoče",
    lockText: "Zakleni stolpec",
    unlockText: "Odkleni stolpec",
    columnsText: "Stolpci"
});

Ext.define("Ext.locale.sl.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Ime",
    valueText: "Vrednost",
    dateFormat: "j.m.Y"
});

Ext.define("Ext.locale.sl.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "V redu",
        cancel: "Prekliči",
        yes: "Da",
        no: "Ne"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.sl.Component", {	
    override: "Ext.Component"
});

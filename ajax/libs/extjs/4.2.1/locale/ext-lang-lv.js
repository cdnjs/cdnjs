/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * Latvian Translations
 * By salix 17 April 2007
 */
Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames = ["Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"];

        Ext.Date.dayNames = ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"];
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: 'Ls',
            // Latvian Lati
            dateFormat: 'd.m.Y'
        });
    }
});

Ext.define("Ext.locale.lv.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.lv.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} iezīmētu rindu"
});

Ext.define("Ext.locale.lv.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Aizver šo zīmni"
});

Ext.define("Ext.locale.lv.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "Vērtība šajā laukā nav pareiza"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.lv.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Ielādē..."
});

Ext.define("Ext.locale.lv.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Šodiena",
    minText: "Norādītais datums ir mazāks par minimālo datumu",
    maxText: "Norādītais datums ir lielāks par maksimālo datumu",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: 'Nākamais mēnesis (Control+pa labi)',
    prevText: 'Iepriekšējais mēnesis (Control+pa kreisi)',
    monthYearText: 'Mēneša izvēle (Control+uz augšu/uz leju lai pārslēgtu gadus)',
    todayTip: "{0} (Tukšumzīme)",
    format: "d.m.Y",
    startDay: 1
});

Ext.define("Ext.locale.lv.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Lapa",
    afterPageText: "no {0}",
    firstText: "Pirmā lapa",
    prevText: "iepriekšējā lapa",
    nextText: "Nākamā lapa",
    lastText: "Pēdējā lapa",
    refreshText: "Atsvaidzināt",
    displayMsg: "Rāda no {0} līdz {1} ierakstiem, kopā {2}",
    emptyMsg: 'Nav datu, ko parādīt'
});

Ext.define("Ext.locale.lv.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "Minimālais garums šim laukam ir {0}",
    maxLengthText: "Maksimālais garums šim laukam ir {0}",
    blankText: "Šis ir obligāts lauks",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.lv.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "Minimālais garums šim laukam ir  {0}",
    maxText: "Maksimālais garums šim laukam ir  {0}",
    nanText: "{0} nav pareizs skaitlis"
});

Ext.define("Ext.locale.lv.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Atspējots",
    disabledDatesText: "Atspējots",
    minText: "Datumam šajā laukā jābūt lielākam kā {0}",
    maxText: "Datumam šajā laukā jābūt mazākam kā {0}",
    invalidText: "{0} nav pareizs datums - tam jābūt šādā formātā: {1}",
    format: "d.m.Y"
});

Ext.define("Ext.locale.lv.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Ielādē..."
    });
});

Ext.define("Ext.locale.lv.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'Šajā laukā jāieraksta e-pasta adrese formātā "lietotās@domēns.lv"',
    urlText: 'Šajā laukā jāieraksta URL formātā "http:/' + '/www.domēns.lv"',
    alphaText: 'Šis lauks drīkst saturēt tikai burtus un _ zīmi',
    alphanumText: 'Šis lauks drīkst saturēt tikai burtus, ciparus un _ zīmi'
});

Ext.define("Ext.locale.lv.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Kārtot pieaugošā secībā",
    sortDescText: "Kārtot dilstošā secībā",
    lockText: "Noslēgt kolonnu",
    unlockText: "Atslēgt kolonnu",
    columnsText: "Kolonnas"
});

Ext.define("Ext.locale.lv.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Nosaukums",
    valueText: "Vērtība",
    dateFormat: "j.m.Y"
});

Ext.define("Ext.locale.lv.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "Labi",
        cancel: "Atcelt",
        yes: "Jā",
        no: "Nē"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.lv.Component", {	
    override: "Ext.Component"
});


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
 * Greek (Old Version) Translations by Vagelis
 * 03-June-2007
 */
Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames = ["ÉáíïõÜñéïò", "ÖåâñïõÜñéïò", "ÌÜñôéïò", "Áðñßëéïò", "ÌÜéïò", "Éïýíéïò", "Éïýëéïò", "Áýãïõóôïò", "ÓåðôÝìâñéïò", "Ïêôþâñéïò", "ÍïÝìâñéïò", "ÄåêÝìâñéïò"];

        Ext.Date.dayNames = ["ÊõñéáêÞ", "ÄåõôÝñá", "Ôñßôç", "ÔåôÜñôç", "ÐÝìðôç", "ÐáñáóêåõÞ", "ÓÜââáôï"];
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u20ac',
            // Greek Euro
            dateFormat: 'ì/ç/Å'
        });
    }
});

Ext.define("Ext.locale.gr.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.gr.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} åðéëåãìÝíç(åò) ãñáììÞ(Ýò)"
});

Ext.define("Ext.locale.gr.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Êëåßóôå áõôÞ ôçí êáñôÝëá"
});

Ext.define("Ext.locale.gr.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "Ç ôéìÞ óôï ðåäßï äåí åßíáé Ýãêõñç"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.gr.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Öüñôùóç..."
});

Ext.define("Ext.locale.gr.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "ÓÞìåñá",
    minText: "Ç çìåñïìçíßá áõôÞ åßíáé ðñéí ôçí ìéêñüôåñç çìåñïìçíßá",
    maxText: "Ç çìåñïìçíßá áõôÞ åßíáé ìåôÜ ôçí ìåãáëýôåñç çìåñïìçíßá",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: 'Åðüìåíïò ÌÞíáò (Control+Right)',
    prevText: 'Ðñïçãïýìåíïò ÌÞíáò (Control+Left)',
    monthYearText: 'ÅðéëÝîôå ÌÞíá (Control+Up/Down ãéá ìåôáêßíçóç óôá Ýôç)',
    todayTip: "{0} (Spacebar)",
    format: "ì/ç/Å"
});

Ext.define("Ext.locale.gr.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Óåëßäá",
    afterPageText: "áðü {0}",
    firstText: "Ðñþôç óåëßäá",
    prevText: "Ðñïçãïýìåíç óåëßäá",
    nextText: "Åðüìåíç óåëßäá",
    lastText: "Ôåëåõôáßá óåëßäá",
    refreshText: "ÁíáíÝùóç",
    displayMsg: "ÅìöÜíéóç {0} - {1} áðü {2}",
    emptyMsg: 'Äåí âñÝèçêáí åããñáöÝò ãéá åìöÜíéóç'
});

Ext.define("Ext.locale.gr.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "Ôï åëÜ÷éóôï ìÝãåèïò ãéá áõôü ôï ðåäßï åßíáé {0}",
    maxLengthText: "Ôï ìÝãéóôï ìÝãåèïò ãéá áõôü ôï ðåäßï åßíáé {0}",
    blankText: "Ôï ðåäßï áõôü åßíáé õðï÷ñåùôïêü",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.gr.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "Ç åëÜ÷éóôç ôéìÞ ãéá áõôü ôï ðåäßï åßíáé {0}",
    maxText: "Ç ìÝãéóôç ôéìÞ ãéá áõôü ôï ðåäßï åßíáé {0}",
    nanText: "{0} äåí åßíáé Ýãêõñïò áñéèìüò"
});

Ext.define("Ext.locale.gr.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "ÁðåíåñãïðïéçìÝíï",
    disabledDatesText: "ÁðåíåñãïðïéçìÝíï",
    minText: "Ç çìåñïìçíßá ó' áõôü ôï ðåäßï ðñÝðåé íá åßíáé ìåôÜ áðü {0}",
    maxText: "Ç çìåñïìçíßá ó' áõôü ôï ðåäßï ðñÝðåé íá åßíáé ðñéí áðü {0}",
    invalidText: "{0} äåí åßíáé Ýãêõñç çìåñïìçíßá - ðñÝðåé íá åßíáé ôçò ìïñöÞò {1}",
    format: "ì/ç/Å"
});

Ext.define("Ext.locale.gr.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Öüñôùóç..."
    });
});

Ext.define("Ext.locale.gr.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'Áõôü ôï ðåäßï ðñÝðåé íá åßíáé e-mail address ôçò ìïñöÞò "user@example.com"',
    urlText: 'Áõôü ôï ðåäßï ðñÝðåé íá åßíáé ìéá äéåýèõíóç URL ôçò ìïñöÞò "http:/' + '/www.example.com"',
    alphaText: 'Áõôü ôï ðåäßï ðñÝðåé íá ðåñéÝ÷åé ãñÜììáôá êáé _',
    alphanumText: 'Áõôü ôï ðåäßï ðñÝðåé íá ðåñéÝ÷åé ãñÜììáôá, áñéèìïýò êáé _'
});

Ext.define("Ext.locale.gr.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Áýîïõóá Ôáîéíüìçóç",
    sortDescText: "Öèßíïõóá Ôáîéíüìçóç",
    lockText: "Êëåßäùìá óôÞëçò",
    unlockText: "Îåêëåßäùìá óôÞëçò",
    columnsText: "ÓôÞëåò"
});

Ext.define("Ext.locale.gr.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "¼íïìá",
    valueText: "ÔéìÞ",
    dateFormat: "ì/ç/Å"
});

Ext.define("Ext.locale.gr.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "ÅíôÜîåé",
        cancel: "Áêýñùóç",
        yes: "Íáé",
        no: "¼÷é"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.gr.Component", {	
    override: "Ext.Component"
});


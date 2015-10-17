/**
 * Serbian Cyrillic Translation
 * by Čolovic Vladan (cyrillic, utf8 encoding)
 * sr_RS (ex: sr_CS, sr_YU)
 * 12 May 2007
 */
Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames = ["Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"];

        Ext.Date.dayNames = ["Недеља", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"];
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u0414\u0438\u043d\u002e',
            // Serbian Dinar
            dateFormat: 'd.m.Y'
        });
    }
});

Ext.define("Ext.locale.sr_RS.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.sr_RS.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} изабраних редова"
});

Ext.define("Ext.locale.sr_RS.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Затвори ову »картицу«"
});

Ext.define("Ext.locale.sr_RS.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "Унешена вредност није правилна"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.sr_RS.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Учитавам..."
});

Ext.define("Ext.locale.sr_RS.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Данас",
    minText: "Датум је испред најмањег дозвољеног датума",
    maxText: "Датум је након највећег дозвољеног датума",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: 'Следећи месец (Control+Десно)',
    prevText: 'Претходни месец (Control+Лево)',
    monthYearText: 'Изаберите месец (Control+Горе/Доле за избор године)',
    todayTip: "{0} (Размакница)",
    format: "d.m.y",
    startDay: 1
});

Ext.define("Ext.locale.sr_RS.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Страна",
    afterPageText: "од {0}",
    firstText: "Прва страна",
    prevText: "Претходна страна",
    nextText: "Следећа страна",
    lastText: "Последња страна",
    refreshText: "Освежи",
    displayMsg: "Приказана {0} - {1} од {2}",
    emptyMsg: 'Немам шта приказати'
});

Ext.define("Ext.locale.sr_RS.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "Минимална дужина овог поља је {0}",
    maxLengthText: "Максимална дужина овог поља је {0}",
    blankText: "Поље је обавезно",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.sr_RS.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "Минимална вредност у пољу је {0}",
    maxText: "Максимална вредност у пољу је {0}",
    nanText: "{0} није правилан број"
});

Ext.define("Ext.locale.sr_RS.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Пасивно",
    disabledDatesText: "Пасивно",
    minText: "Датум у овом пољу мора бити након {0}",
    maxText: "Датум у овом пољу мора бити пре {0}",
    invalidText: "{0} није правилан датум - захтевани облик је {1}",
    format: "d.m.y"
});

Ext.define("Ext.locale.sr_RS.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Учитавам..."
    });
});

Ext.define("Ext.locale.sr_RS.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'Ово поље прихвата e-mail адресу искључиво у облику "korisnik@domen.com"',
    urlText: 'Ово поље прихвата URL адресу искључиво у облику "http:/' + '/www.domen.com"',
    alphaText: 'Ово поље може садржати искључиво слова и знак _',
    alphanumText: 'Ово поље може садржати само слова, бројеве и знак _'
});

Ext.define("Ext.locale.sr_RS.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Растући редослед",
    sortDescText: "Опадајући редослед",
    lockText: "Закључај колону",
    unlockText: "Откључај колону",
    columnsText: "Колоне"
});

Ext.define("Ext.locale.sr_RS.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Назив",
    valueText: "Вредност",
    dateFormat: "d.m.Y"
});

Ext.define("Ext.locale.sr_RS.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "У реду",
        cancel: "Одустани",
        yes: "Да",
        no: "Не"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.sr_RS.Component", {	
    override: "Ext.Component"
});

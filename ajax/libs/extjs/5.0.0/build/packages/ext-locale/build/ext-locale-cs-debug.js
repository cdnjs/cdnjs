/**
 * Czech Translations
 * Translated by Tomáš Korčák (72)
 * 2008/02/08 18:02, Ext-2.0.1
 */
Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];

        Ext.Date.shortMonthNames = {
            "Leden": "Led",
            "Únor": "Úno",
            "Březen": "Bře",
            "Duben": "Dub",
            "Květen": "Kvě",
            "Červen": "Čer",
            "Červenec": "Čvc",
            "Srpen": "Srp",
            "Září": "Zář",
            "Říjen": "Říj",
            "Listopad": "Lis",
            "Prosinec": "Pro"
        };

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.shortMonthNames[Ext.Date.monthNames[month]];
        };

        Ext.Date.monthNumbers = {
            "Leden": 0,
            "Únor": 1,
            "Březen": 2,
            "Duben": 3,
            "Květen": 4,
            "Červen": 5,
            "Červenec": 6,
            "Srpen": 7,
            "Září": 8,
            "Říjen": 9,
            "Listopad": 10,
            "Prosinec": 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase()];
        };

        Ext.Date.dayNames = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u004b\u010d',
            // Czech Koruny
            dateFormat: 'd.m.Y'
        });
    }
});

Ext.define("Ext.locale.cs.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.cs.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} vybraných řádků"
});

Ext.define("Ext.locale.cs.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Zavřít záložku"
});

Ext.define("Ext.locale.cs.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "Hodnota v tomto poli je neplatná"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.cs.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Prosím čekejte..."
});

Ext.define("Ext.locale.cs.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Dnes",
    minText: "Datum nesmí být starší než je minimální",
    maxText: "Datum nesmí být dřívější než je maximální",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: 'Následující měsíc (Control+Right)',
    prevText: 'Předcházející měsíc (Control+Left)',
    monthYearText: 'Zvolte měsíc (ke změně let použijte Control+Up/Down)',
    todayTip: "{0} (Spacebar)",
    format: "d.m.Y",
    startDay: 1
});

Ext.define("Ext.locale.cs.picker.Month", {
    override: "Ext.picker.Month",
    okText: "&#160;OK&#160;",
    cancelText: "Storno"
});

Ext.define("Ext.locale.cs.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Strana",
    afterPageText: "z {0}",
    firstText: "První strana",
    prevText: "Přecházející strana",
    nextText: "Následující strana",
    lastText: "Poslední strana",
    refreshText: "Aktualizovat",
    displayMsg: "Zobrazeno {0} - {1} z celkových {2}",
    emptyMsg: 'Žádné záznamy nebyly nalezeny'
});

Ext.define("Ext.locale.cs.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "Pole nesmí mít méně {0} znaků",
    maxLengthText: "Pole nesmí být delší než {0} znaků",
    blankText: "Povinné pole",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.cs.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "Hodnota v tomto poli nesmí být menší než {0}",
    maxText: "Hodnota v tomto poli nesmí být větší než {0}",
    nanText: "{0} není platné číslo"
});

Ext.define("Ext.locale.cs.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Neaktivní",
    disabledDatesText: "Neaktivní",
    minText: "Datum v tomto poli nesmí být starší než {0}",
    maxText: "Datum v tomto poli nesmí být novější než {0}",
    invalidText: "{0} není platným datem - zkontrolujte zda-li je ve formátu {1}",
    format: "d.m.Y",
    altFormats: "d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
});

Ext.define("Ext.locale.cs.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Prosím čekejte..."
    });
});

Ext.define("Ext.locale.cs.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'V tomto poli může být vyplněna pouze emailová adresa ve formátu "uživatel@doména.cz"',
    urlText: 'V tomto poli může být vyplněna pouze URL (adresa internetové stránky) ve formátu "http:/' + '/www.doména.cz"',
    alphaText: 'Toto pole může obsahovat pouze písmena abecedy a znak _',
    alphanumText: 'Toto pole může obsahovat pouze písmena abecedy, čísla a znak _'
});

Ext.define("Ext.locale.cs.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Zadejte URL adresu odkazu:'
}, function() {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Tučné (Ctrl+B)',
                text: 'Označí vybraný text tučně.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Kurzíva (Ctrl+I)',
                text: 'Označí vybraný text kurzívou.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Podtržení (Ctrl+U)',
                text: 'Podtrhne vybraný text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Zvětšit písmo',
                text: 'Zvětší velikost písma.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Zúžit písmo',
                text: 'Zmenší velikost písma.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Barva zvýraznění textu',
                text: 'Označí vybraný text tak, aby vypadal jako označený zvýrazňovačem.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Barva písma',
                text: 'Změní barvu textu.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Zarovnat text vlevo',
                text: 'Zarovná text doleva.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Zarovnat na střed',
                text: 'Zarovná text na střed.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Zarovnat text vpravo',
                text: 'Zarovná text doprava.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Odrážky',
                text: 'Začne seznam s odrážkami.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Číslování',
                text: 'Začne číslovaný seznam.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Internetový odkaz',
                text: 'Z vybraného textu vytvoří internetový odkaz.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Zdrojový kód',
                text: 'Přepne do módu úpravy zdrojového kódu.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

Ext.define("Ext.locale.cs.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Řadit vzestupně",
    sortDescText: "Řadit sestupně",
    lockText: "Ukotvit sloupec",
    unlockText: "Uvolnit sloupec",
    columnsText: "Sloupce"
});

Ext.define("Ext.locale.cs.grid.GroupingFeature", {
    override: "Ext.grid.feature.Grouping",
    emptyGroupText: '(Žádná data)',
    groupByText: 'Seskupit dle tohoto pole',
    showGroupsText: 'Zobrazit ve skupině'
});

Ext.define("Ext.locale.cs.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Název",
    valueText: "Hodnota",
    dateFormat: "j.m.Y"
});

Ext.define("Ext.locale.cs.form.field.File", {
    override: "Ext.form.field.File",
    buttonText: "Procházet..."
});

Ext.define("Ext.locale.cs.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "OK",
        cancel: "Storno",
        yes: "Ano",
        no: "Ne"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.cs.Component", {	
    override: "Ext.Component"
});


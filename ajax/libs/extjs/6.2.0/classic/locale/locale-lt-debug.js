/**
 * Lithuanian Translations (UTF-8)
 * Vladas Saulis (vladas at prodata dot lt),  03-29-2009
 * Vladas Saulis (vladas at prodata dot lt),  10-18-2007
 */
Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames = ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"];

        Ext.Date.getShortMonthName = function(month) {
            // Uncommons
            if (month == 7) return "Rgp";
            if (month == 8) return "Rgs";
            if (month == 11) return "Grd";
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            Sau: 0,
            Vas: 1,
            Kov: 2,
            Bal: 3,
            Geg: 4,
            Bir: 5,
            Lie: 6,
            Rgp: 7,
            Rgs: 8,
            Spa: 9,
            Lap: 10,
            Grd: 11
        };

        Ext.Date.getMonthNumber = function(name) {

            // Some uncommons
            if (name == "Rugpjūtis") return 7;
            if (name == "Rugsėjis") return 8;
            if (name == "Gruodis") return 11;
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"];

        Ext.Date.parseCodes.S.s = "(?:as|as|as|as)";

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: 'Lt',
            // Lithuanian Litai
            dateFormat: 'Y-m-d'
        });
    }
});

Ext.define("Ext.locale.lt.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.lt.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.lt.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} pažymėtų eilučių"
});

Ext.define("Ext.locale.lt.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Uždaryti šią užsklandą"
});

Ext.define("Ext.locale.lt.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "Šio lauko reikšmė neteisinga"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.lt.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Kraunasi..."
});

Ext.define("Ext.locale.lt.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Šiandien",
    minText: "Ši data yra mažesnė už leistiną",
    maxText: "Ši data yra didesnė už leistiną",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: 'Kitas mėnuo (Control+Right)',
    prevText: 'Ankstesnis mėnuo (Control+Left)',
    monthYearText: 'Pasirinkti mėnesį (Control+Up/Down perėjimui tarp metų)',
    todayTip: "{0} (Tarpas)",
    format: "Y-m-d",
    startDay: 1
});

Ext.define("Ext.locale.lt.picker.Month", {
    override: "Ext.picker.Month",
    okText: "&#160;Gerai&#160;",
    cancelText: "Atsisaktyi"
});

Ext.define("Ext.locale.lt.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Puslapis",
    afterPageText: "iš {0}",
    firstText: "Pirmas puslapis",
    prevText: "Ankstesnis pusl.",
    nextText: "Kitas puslapis",
    lastText: "Pakutinis pusl.",
    refreshText: "Atnaujinti",
    displayMsg: "Rodomi įrašai {0} - {1} iš {2}",
    emptyMsg: 'Nėra duomenų'
});

Ext.define("Ext.locale.lt.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "Minimalus šio lauko ilgis yra {0}",
    maxLengthText: "Maksimalus šio lauko ilgis yra {0}",
    blankText: "Šis laukas yra privalomas",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.lt.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "Minimalus šio lauko ilgis yra {0}",
    maxText: "Maksimalus šio lauko ilgis yra {0}",
    nanText: "{0} yra neleistina reikšmė"
});

Ext.define("Ext.locale.lt.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Neprieinama",
    disabledDatesText: "Neprieinama",
    minText: "Šiame lauke data turi būti didesnė už {0}",
    maxText: "Šiame lauke data turi būti mažesnėė už {0}",
    invalidText: "{0} yra neteisinga data - ji turi būti įvesta formatu {1}",
    format: "Y-m-d",
    altFormats: "y-m-d|y/m/d|Y-m-d|m/d|m-d|md|ymd|Ymd|d|Y-m-d"
});

Ext.define("Ext.locale.lt.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Kraunasi..."
    });
});

Ext.define("Ext.locale.lt.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'Šiame lauke turi būti el.pašto adresas formatu "user@example.com"',
    urlText: 'Šiame lauke turi būti nuoroda (URL) formatu "http:/' + '/www.example.com"',
    alphaText: 'Šiame lauke gali būti tik raidės ir ženklas "_"',
    alphanumText: 'Šiame lauke gali būti tik raidės, skaičiai ir ženklas "_"'
});

Ext.define("Ext.locale.lt.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Įveskite URL šiai nuorodai:'
}, function() {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Bold (Ctrl+B)',
                text: 'Teksto paryškinimas.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Italic (Ctrl+I)',
                text: 'Kursyvinis tekstas.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Underline (Ctrl+U)',
                text: 'Teksto pabraukimas.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Padidinti šriftą',
                text: 'Padidinti šrifto dydį.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Sumažinti šriftą',
                text: 'Sumažinti šrifto dydį.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Nuspalvinti teksto foną',
                text: 'Pakeisti teksto fono spalvą.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Teksto spalva',
                text: 'Pakeisti pažymėto teksto spalvą.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Išlyginti kairen',
                text: 'Išlyginti tekstą į kairę.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Centruoti tekstą',
                text: 'Centruoti tektą redaktoriaus lange.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Išlyginti dešinėn',
                text: 'Išlyginti tekstą į dešinę.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Paprastas sąrašas',
                text: 'Pradėti neorganizuotą sąrašą.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Numeruotas sąrašas',
                text: 'Pradėti numeruotą sąrašą.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Nuoroda',
                text: 'Padaryti pažymėta tekstą nuoroda.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Išeities tekstas',
                text: 'Persijungti į išeities teksto koregavimo režimą.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

Ext.define("Ext.locale.lt.form.Basic", {
    override: "Ext.form.Basic",
    waitTitle: "Palaukite..."
});

Ext.define("Ext.locale.lt.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Rūšiuoti didėjančia tvarka",
    sortDescText: "Rūšiuoti mažėjančia tvarka",
    lockText: "Užfiksuoti stulpelį",
    unlockText: "Atlaisvinti stulpelį",
    columnsText: "Stulpeliai"
});

Ext.define("Ext.locale.lt.grid.GroupingFeature", {
    override: "Ext.grid.feature.Grouping",
    emptyGroupText: '(Nėra)',
    groupByText: 'Grupuoti pagal šį lauką',
    showGroupsText: 'Rodyti grupėse'
});

Ext.define("Ext.locale.lt.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Pavadinimas",
    valueText: "Reikšmė",
    dateFormat: "Y-m-d"
});

Ext.define("Ext.locale.lt.form.field.Time", {
    override: "Ext.form.field.Time",
    minText: "Laikas turi buti lygus arba vėlesnis už {0}",
    maxText: "Laikas turi būti lygus arba ankstesnis už {0}",
    invalidText: "{0} yra neteisingas laikas",
    format: "H:i",
    altFormats: "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"
});

Ext.define("Ext.locale.lt.form.CheckboxGroup", {
    override: "Ext.form.CheckboxGroup",
    blankText: "Jūs turite padaryti bent vieną pasirinkimą šioje grupėje"
});

Ext.define("Ext.locale.lt.form.RadioGroup", {
    override: "Ext.form.RadioGroup",
    blankText: "Jūs turite padaryti bent vieną pasirinkimą šioje grupėje"
});

Ext.define("Ext.locale.lt.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "Gerai",
        cancel: "Atsisakyti",
        yes: "Taip",
        no: "Ne"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.lt.Component", {	
    override: "Ext.Component"
});

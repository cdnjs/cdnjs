/**
 * Bulgarian Translation
 *
 * By Георги Костадинов, Калгари, Канада
 * 10 October 2007
 * By Nedko Penev
 * 26 October 2007
 *
 * (utf-8 encoding)
 */
Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"];

        Ext.Date.monthNumbers = {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11
        };

        Ext.Date.dayNames = ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"];
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u043b\u0432',
            // Bulgarian Leva
            dateFormat: 'd.m.Y'
        });
    }
});

Ext.define("Ext.locale.bg.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.bg.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} избрани колони"
});

Ext.define("Ext.locale.bg.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Затвори таб"
});

Ext.define("Ext.locale.bg.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "Невалидна стойност на полето"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.bg.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Зареждане..."
});

Ext.define("Ext.locale.bg.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Днес",
    minText: "Тази дата е преди минималната",
    maxText: "Тази дата е след максималната",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: 'Следващ месец (Control+Right)',
    prevText: 'Предишен месец (Control+Left)',
    monthYearText: 'Избери месец (Control+Up/Down за преместване по години)',
    todayTip: "{0} (Spacebar)",
    format: "d.m.y",
    startDay: 1
});

Ext.define("Ext.locale.bg.picker.Month", {
    override: "Ext.picker.Month",
    okText: "&#160;OK&#160;",
    cancelText: "Отмени"
});

Ext.define("Ext.locale.bg.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Страница",
    afterPageText: "от {0}",
    firstText: "Първа страница",
    prevText: "Предишна страница",
    nextText: "Следваща страница",
    lastText: "Последна страница",
    refreshText: "Презареди",
    displayMsg: "Показвайки {0} - {1} от {2}",
    emptyMsg: 'Няма данни за показване'
});

Ext.define("Ext.locale.bg.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "Минималната дължина на това поле е {0}",
    maxLengthText: "Максималната дължина на това поле е {0}",
    blankText: "Това поле е задължително",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.bg.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "Минималната стойност за това поле е {0}",
    maxText: "Максималната стойност за това поле е {0}",
    nanText: "{0} не е валидно число"
});

Ext.define("Ext.locale.bg.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Недостъпен",
    disabledDatesText: "Недостъпен",
    minText: "Датата в това поле трябва да е след {0}",
    maxText: "Датата в това поле трябва да е преди {0}",
    invalidText: "{0} не е валидна дата - трябва да бъде във формат {1}",
    format: "d.m.y",
    altFormats: "d.m.y|d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
});

Ext.define("Ext.locale.bg.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Зареждане..."
    });
});

Ext.define("Ext.locale.bg.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'Това поле трябва да бъде емейл във формат "user@example.com"',
    urlText: 'Това поле трябва да бъде URL във формат "http:/' + '/www.example.com"',
    alphaText: 'Това поле трябва да съдържа само букви и _',
    alphanumText: 'Това поле трябва да съдържа само букви, цифри и _'
});

Ext.define("Ext.locale.bg.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Моля, въведете URL за връзката:'
}, function() {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Bold (Ctrl+B)',
                text: 'Удебелява избрания текст.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Italic (Ctrl+I)',
                text: 'Прави избрания текст курсив.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Underline (Ctrl+U)',
                text: 'Подчертава избрания текст.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Уголеми текста',
                text: 'Уголемява размера на шрифта.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Намали текста',
                text: 'Намалява размера на шрифта.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Цвят на маркирания текст',
                text: 'Променя фоновия цвят на избрания текст.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Цвят на шрифта',
                text: 'Променя цвета на избрания текст.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Ляво подравняване',
                text: 'Подравнява текста на ляво.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Центриране',
                text: 'Центрира текста.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Дясно подравняване',
                text: 'Подравнява текста на дясно.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Неномериран списък',
                text: 'Започва неномериран списък.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Номериран списък',
                text: 'Започва номериран списък.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Хипервръзка',
                text: 'Превръща избрания текст в хипервръзка.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Редактиране на кода',
                text: 'Преминаване в режим на редактиране на кода.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

Ext.define("Ext.locale.bg.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Подреди в нарастващ ред",
    sortDescText: "Подреди в намаляващ ред",
    lockText: "Заключи колона",
    unlockText: "Отключи колона",
    columnsText: "Колони"
});

Ext.define("Ext.locale.bg.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Име",
    valueText: "Стойност",
    dateFormat: "d.m.Y"
});

Ext.define("Ext.locale.bg.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "OK",
        cancel: "Отмени",
        yes: "Да",
        no: "Не"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.bg.Component", {	
    override: "Ext.Component"
});

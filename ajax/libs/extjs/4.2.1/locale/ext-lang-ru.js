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
 * Russian translation
 * By ZooKeeper (utf-8 encoding)
 * 6 November 2007
 */
Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

        Ext.Date.shortMonthNames = ["Янв", "Февр", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"];

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.shortMonthNames[month];
        };

        Ext.Date.monthNumbers = {
            'Янв': 0,
            'Фев': 1,
            'Мар': 2,
            'Апр': 3,
            'Май': 4,
            'Июн': 5,
            'Июл': 6,
            'Авг': 7,
            'Сен': 8,
            'Окт': 9,
            'Ноя': 10,
            'Дек': 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u0440\u0443\u0431',
            // Russian Ruble
            dateFormat: 'd.m.Y'
        });
    }
});

Ext.define("Ext.locale.ru.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.ru.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} выбранных строк"
});

Ext.define("Ext.locale.ru.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Закрыть эту вкладку"
});

Ext.define("Ext.locale.ru.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "Значение в этом поле неверное"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.ru.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Загрузка..."
});

Ext.define("Ext.locale.ru.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Сегодня",
    minText: "Эта дата раньше минимальной даты",
    maxText: "Эта дата позже максимальной даты",
    disabledDaysText: "Недоступно",
    disabledDatesText: "Недоступно",
    nextText: 'Следующий месяц (Control+Вправо)',
    prevText: 'Предыдущий месяц (Control+Влево)',
    monthYearText: 'Выбор месяца (Control+Вверх/Вниз для выбора года)',
    todayTip: "{0} (Пробел)",
    format: "d.m.y",
    startDay: 1
});

Ext.define("Ext.locale.ru.picker.Month", {
    override: "Ext.picker.Month",
    okText: "&#160;OK&#160;",
    cancelText: "Отмена"
});

Ext.define("Ext.locale.ru.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Страница",
    afterPageText: "из {0}",
    firstText: "Первая страница",
    prevText: "Предыдущая страница",
    nextText: "Следующая страница",
    lastText: "Последняя страница",
    refreshText: "Обновить",
    displayMsg: "Отображаются записи с {0} по {1}, всего {2}",
    emptyMsg: 'Нет данных для отображения'
});

Ext.define("Ext.locale.ru.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "Минимальная длина этого поля {0}",
    maxLengthText: "Максимальная длина этого поля {0}",
    blankText: "Это поле обязательно для заполнения",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.ru.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "Значение этого поля не может быть меньше {0}",
    maxText: "Значение этого поля не может быть больше {0}",
    nanText: "{0} не является числом",
    negativeText: "Значение не может быть отрицательным"
});

Ext.define("Ext.locale.ru.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Недоступно",
    disabledDatesText: "Недоступно",
    minText: "Дата в этом поле должна быть позже {0}",
    maxText: "Дата в этом поле должна быть раньше {0}",
    invalidText: "{0} не является правильной датой - дата должна быть указана в формате {1}",
    format: "d.m.y",
    altFormats: "d.m.y|d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
});

Ext.define("Ext.locale.ru.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Загрузка..."
    });
});

Ext.define("Ext.locale.ru.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'Это поле должно содержать адрес электронной почты в формате "user@example.com"',
    urlText: 'Это поле должно содержать URL в формате "http:/' + '/www.example.com"',
    alphaText: 'Это поле должно содержать только латинские буквы и символ подчеркивания "_"',
    alphanumText: 'Это поле должно содержать только латинские буквы, цифры и символ подчеркивания "_"'
});

Ext.define("Ext.locale.ru.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Пожалуйста, введите адрес:'
}, function() {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Полужирный (Ctrl+B)',
                text: 'Применение полужирного начертания к выделенному тексту.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Курсив (Ctrl+I)',
                text: 'Применение курсивного начертания к выделенному тексту.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Подчёркнутый (Ctrl+U)',
                text: 'Подчёркивание выделенного текста.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Увеличить размер',
                text: 'Увеличение размера шрифта.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Уменьшить размер',
                text: 'Уменьшение размера шрифта.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Заливка',
                text: 'Изменение цвета фона для выделенного текста или абзаца.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Цвет текста',
                text: 'Измение цвета текста.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Выровнять текст по левому краю',
                text: 'Вырaвнивание текста по левому краю.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'По центру',
                text: 'Вырaвнивание текста по центру.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Выровнять текст по правому краю',
                text: 'Вырaвнивание текста по правому краю.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Маркеры',
                text: 'Начать маркированный список.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Нумерация',
                text: 'Начать нумернованный список.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Вставить гиперссылку',
                text: 'Создание ссылки из выделенного текста.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Исходный код',
                text: 'Переключиться на исходный код.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

Ext.define("Ext.locale.ru.form.Basic", {
    override: "Ext.form.Basic",
    waitTitle: "Пожалуйста, подождите..."
});

Ext.define("Ext.locale.ru.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Сортировать по возрастанию",
    sortDescText: "Сортировать по убыванию",
    lockText: "Закрепить столбец",
    unlockText: "Снять закрепление столбца",
    columnsText: "Столбцы"
});

Ext.define("Ext.locale.ru.grid.GroupingFeature", {
    override: "Ext.grid.GroupingFeature",
    emptyGroupText: '(Пусто)',
    groupByText: 'Группировать по этому полю',
    showGroupsText: 'Отображать по группам'
});

Ext.define("Ext.locale.ru.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Название",
    valueText: "Значение",
    dateFormat: "d.m.Y"
});

Ext.define("Ext.locale.ru.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "OK",
        cancel: "Отмена",
        yes: "Да",
        no: "Нет"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.ru.Component", {	
    override: "Ext.Component"
});


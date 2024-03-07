(function( factory ) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( [], factory);
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = factory();
	}
	// No browser loader - use JSON, ESM, CJS or AMD
}
(function() {
    return {
    "lengthMenu": "Показати _MENU_ записів",
    "infoFiltered": "(відфільтровано з _MAX_ записів)",
    "search": "Пошук:",
    "paginate": {
        "first": "Перша",
        "previous": "Попередня",
        "next": "Наступна",
        "last": "Остання"
    },
    "aria": {
        "sortAscending": ": активуйте, щоб сортувати колонку за зростанням",
        "sortDescending": ": активуйте, щоб сортувати колонку за спаданням"
    },
    "autoFill": {
        "cancel": "Відміна",
        "fill": "Заповнити всі клітинки з <i>%d<\/i>",
        "fillHorizontal": "Заповнити клітинки горизонтально",
        "fillVertical": "Заповнити клітинки вертикально"
    },
    "buttons": {
        "collection": "Список <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "colvis": "Видимість колонки",
        "colvisRestore": "Відновити видимість",
        "copy": "Копіювати",
        "copyKeys": "Нажміть ctrl або u2318 + C щоб копіювати інформацію з таблиці до вашого буферу обміну.<br \/><br \/>Щоб відмінити нажміть на це повідомлення або Esc",
        "copySuccess": {
            "1": "Скопійовано 1 рядок в буфер обміну",
            "_": "Скопійовано %d рядків в буфер обміну"
        },
        "copyTitle": "Копіювати в буфер обміну",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Показати усі рядки",
            "_": "Показати %d рядки"
        },
        "pdf": "PDF",
        "print": "Друкувати"
    },
    "emptyTable": "Ця таблиця не містить даних",
    "info": "Показано від _START_ по _END_ з _TOTAL_ записів",
    "infoEmpty": "Показано від 0 по 0 з 0 записів",
    "infoThousands": ",",
    "loadingRecords": "Завантаження",
    "processing": "Опрацювання...",
    "searchBuilder": {
        "add": "Додати умову",
        "button": {
            "0": "Розширений пошук",
            "_": "Розширений пошук (%d)"
        },
        "clearAll": "Очистити все",
        "condition": "Умова",
        "conditions": {
            "date": {
                "after": "Після",
                "before": "До",
                "between": "Між",
                "empty": "Пусто",
                "equals": "Дорівнює",
                "not": "Не",
                "notBetween": "Не між",
                "notEmpty": "Не пусто"
            },
            "number": {
                "between": "Між",
                "empty": "Пусто",
                "equals": "Дорівнює",
                "gt": "Більше ніж",
                "gte": "Більше або дорівнює",
                "lt": "Менше ніж",
                "lte": "Менше або дорівнює",
                "not": "Не",
                "notBetween": "Не між",
                "notEmpty": "Не пусто"
            },
            "string": {
                "contains": "Містить",
                "empty": "Пусто",
                "endsWith": "Закінчується з",
                "equals": "Дорівнює",
                "not": "Не",
                "notEmpty": "Не пусто",
                "startsWith": "Починається з",
                "notContains": "Не містить",
                "notStartsWith": "Не починається з",
                "notEndsWith": "Не закінчується на"
            },
            "array": {
                "equals": "Дорівнює",
                "empty": "Пустий",
                "contains": "Містить",
                "not": "Не",
                "notEmpty": "Не пустий",
                "without": "Без"
            }
        },
        "data": "Дата",
        "deleteTitle": "Видалити правило фільтрування",
        "leftTitle": "Відступні критерії",
        "logicAnd": "I",
        "logicOr": "Або",
        "rightTitle": "Відступні критерії",
        "title": {
            "0": "Розширений пошук",
            "_": "Розширений пошук (%d)"
        },
        "value": "Значення"
    },
    "searchPanes": {
        "clearMessage": "Очистити все",
        "collapse": {
            "0": "Пошукові Панелі",
            "_": "Пошукові Панелі (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Немає Пошукових Панелей",
        "loadMessage": "Завантаження Пошукових Панелей",
        "title": "Активній фільтри - %d",
        "showMessage": "Показати всі",
        "collapseMessage": "Приховати всі"
    },
    "select": {
        "cells": {
            "1": "1 клітинку вибрано",
            "_": "%d клітинок вибрано"
        },
        "columns": {
            "1": "1 колонку вибрано",
            "_": "%d колонок вибрано"
        }
    },
    "thousands": ",",
    "zeroRecords": "Не знайдено жодних записів",
    "editor": {
        "close": "Закрити",
        "create": {
            "button": "Cтворити нову",
            "title": "Cтворити новий запис",
            "submit": "Cтворити"
        },
        "edit": {
            "button": "Редагувати",
            "title": "Редагувати запис",
            "submit": "Оновити"
        },
        "remove": {
            "button": "Видалити",
            "title": "Видалити",
            "submit": "Видалити"
        }
    },
    "datetime": {
        "minutes": "Хвилина",
        "months": {
            "0": "Січень",
            "1": "Лютий",
            "10": "Листопад",
            "11": "Грудень",
            "2": "Березень",
            "3": "Квітень",
            "4": "Травень",
            "5": "Червень",
            "6": "Липень",
            "7": "Серпень",
            "8": "Вересень",
            "9": "Жовтень"
        },
        "next": "Наступні",
        "previous": "Попередні",
        "seconds": "Секунда",
        "unknown": "-",
        "weekdays": [
            "Неділя",
            "Понеділок",
            "Вівторок",
            "Середа",
            "Четверг",
            "П'ятниця",
            "Субота"
        ]
    },
    "searchPlaceholder": "Пошук"
};
}));

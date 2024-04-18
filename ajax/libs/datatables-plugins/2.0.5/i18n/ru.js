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
    "processing": "Подождите...",
    "search": "Поиск:",
    "lengthMenu": "Показать _MENU_ записей",
    "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
    "infoEmpty": "Записи с 0 до 0 из 0 записей",
    "infoFiltered": "(отфильтровано из _MAX_ записей)",
    "loadingRecords": "Загрузка записей...",
    "zeroRecords": "Записи отсутствуют.",
    "emptyTable": "В таблице отсутствуют данные",
    "paginate": {
        "first": "Первая",
        "previous": "Предыдущая",
        "next": "Следующая",
        "last": "Последняя"
    },
    "aria": {
        "sortAscending": ": активировать для сортировки столбца по возрастанию",
        "sortDescending": ": активировать для сортировки столбца по убыванию"
    },
    "select": {
        "rows": {
            "_": "Выбрано записей: %d",
            "1": "Выбрана одна запись"
        },
        "cells": {
            "_": "Выбрано %d ячеек",
            "1": "Выбрана 1 ячейка "
        },
        "columns": {
            "1": "Выбран 1 столбец ",
            "_": "Выбрано %d столбцов "
        }
    },
    "searchBuilder": {
        "conditions": {
            "string": {
                "startsWith": "Начинается с",
                "contains": "Содержит",
                "empty": "Пусто",
                "endsWith": "Заканчивается на",
                "equals": "Равно",
                "not": "Не",
                "notEmpty": "Не пусто",
                "notContains": "Не содержит",
                "notStartsWith": "Не начинается на",
                "notEndsWith": "Не заканчивается на"
            },
            "date": {
                "after": "После",
                "before": "До",
                "between": "Между",
                "empty": "Пусто",
                "equals": "Равно",
                "not": "Не",
                "notBetween": "Не между",
                "notEmpty": "Не пусто"
            },
            "number": {
                "empty": "Пусто",
                "equals": "Равно",
                "gt": "Больше чем",
                "gte": "Больше, чем равно",
                "lt": "Меньше чем",
                "lte": "Меньше, чем равно",
                "not": "Не",
                "notEmpty": "Не пусто",
                "between": "Между",
                "notBetween": "Не между ними"
            },
            "array": {
                "equals": "Равно",
                "empty": "Пусто",
                "contains": "Содержит",
                "not": "Не равно",
                "notEmpty": "Не пусто",
                "without": "Без"
            }
        },
        "data": "Данные",
        "deleteTitle": "Удалить условие фильтрации",
        "logicAnd": "И",
        "logicOr": "Или",
        "title": {
            "0": "Конструктор поиска",
            "_": "Конструктор поиска (%d)"
        },
        "value": "Значение",
        "add": "Добавить условие",
        "button": {
            "0": "Конструктор поиска",
            "_": "Конструктор поиска (%d)"
        },
        "clearAll": "Очистить всё",
        "condition": "Условие",
        "leftTitle": "Превосходные критерии",
        "rightTitle": "Критерии отступа"
    },
    "searchPanes": {
        "clearMessage": "Очистить всё",
        "collapse": {
            "0": "Панели поиска",
            "_": "Панели поиска (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Нет панелей поиска",
        "loadMessage": "Загрузка панелей поиска",
        "title": "Фильтры активны - %d",
        "showMessage": "Показать все",
        "collapseMessage": "Скрыть все"
    },
    "buttons": {
        "pdf": "PDF",
        "print": "Печать",
        "collection": "Коллекция <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "colvis": "Видимость столбцов",
        "colvisRestore": "Восстановить видимость",
        "copy": "Копировать",
        "copyTitle": "Скопировать в буфер обмена",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Показать все строки",
            "_": "Показать %d строк",
            "1": "Показать 1 строку"
        },
        "removeState": "Удалить",
        "renameState": "Переименовать",
        "copySuccess": {
            "1": "Строка скопирована в буфер обмена",
            "_": "Скопировано %d строк в буфер обмена"
        },
        "createState": "Создать состояние",
        "removeAllStates": "Удалить все состояния",
        "savedStates": "Сохраненные состояния",
        "stateRestore": "Состояние %d",
        "updateState": "Обновить",
        "copyKeys": "Нажмите ctrl  или u2318 + C, чтобы скопировать данные таблицы в буфер обмена.  Для отмены, щелкните по сообщению или нажмите escape."
    },
    "decimal": ".",
    "infoThousands": ",",
    "autoFill": {
        "cancel": "Отменить",
        "fill": "Заполнить все ячейки <i>%d<i><\/i><\/i>",
        "fillHorizontal": "Заполнить ячейки по горизонтали",
        "fillVertical": "Заполнить ячейки по вертикали",
        "info": "Информация"
    },
    "datetime": {
        "previous": "Предыдущий",
        "next": "Следующий",
        "hours": "Часы",
        "minutes": "Минуты",
        "seconds": "Секунды",
        "unknown": "Неизвестный",
        "amPm": [
            "AM",
            "PM"
        ],
        "months": {
            "0": "Январь",
            "1": "Февраль",
            "10": "Ноябрь",
            "11": "Декабрь",
            "2": "Март",
            "3": "Апрель",
            "4": "Май",
            "5": "Июнь",
            "6": "Июль",
            "7": "Август",
            "8": "Сентябрь",
            "9": "Октябрь"
        },
        "weekdays": [
            "Вс",
            "Пн",
            "Вт",
            "Ср",
            "Чт",
            "Пт",
            "Сб"
        ]
    },
    "editor": {
        "close": "Закрыть",
        "create": {
            "button": "Новый",
            "title": "Создать новую запись",
            "submit": "Создать"
        },
        "edit": {
            "button": "Изменить",
            "title": "Изменить запись",
            "submit": "Изменить"
        },
        "remove": {
            "button": "Удалить",
            "title": "Удалить",
            "submit": "Удалить",
            "confirm": {
                "_": "Вы точно хотите удалить %d строк?",
                "1": "Вы точно хотите удалить 1 строку?"
            }
        },
        "multi": {
            "restore": "Отменить изменения",
            "title": "Несколько значений",
            "info": "Выбранные элементы содержат разные значения для этого входа. Чтобы отредактировать и установить для всех элементов этого ввода одинаковое значение, нажмите или коснитесь здесь, в противном случае они сохранят свои индивидуальные значения.",
            "noMulti": "Это поле должно редактироваться отдельно, а не как часть группы"
        },
        "error": {
            "system": "Возникла системная ошибка (<a target=\"\\\" rel=\"nofollow\" href=\"\\\">Подробнее<\/a>)."
        }
    },
    "searchPlaceholder": "Что ищете?",
    "stateRestore": {
        "creationModal": {
            "button": "Создать",
            "search": "Поиск",
            "columns": {
                "search": "Поиск по столбцам",
                "visible": "Видимость столбцов"
            },
            "name": "Имя:",
            "order": "Сортировка",
            "paging": "Страницы",
            "scroller": "Позиция прокрутки",
            "searchBuilder": "Редактор поиска",
            "select": "Выделение",
            "title": "Создать новое состояние",
            "toggleLabel": "Включает:"
        },
        "removeJoiner": "и",
        "removeSubmit": "Удалить",
        "renameButton": "Переименовать",
        "duplicateError": "Состояние с таким именем уже существует.",
        "emptyError": "Имя не может быть пустым.",
        "emptyStates": "Нет сохраненных состояний",
        "removeConfirm": "Вы уверены, что хотите удалить %s?",
        "removeError": "Не удалось удалить состояние.",
        "removeTitle": "Удалить состояние",
        "renameLabel": "Новое имя для %s:",
        "renameTitle": "Переименовать состояние"
    },
    "thousands": " "
};
}));

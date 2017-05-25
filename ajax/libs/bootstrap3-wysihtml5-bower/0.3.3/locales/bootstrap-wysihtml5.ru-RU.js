/**
 * Russian translation for bootstrap-wysihtml5
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('bootstrap.wysihtml5.ru-RU', ['jquery', 'bootstrap.wysihtml5'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($){
    $.fn.wysihtml5.locale["ru-RU"] = {
        font_styles: {
            normal: "Обычный текст",
            h1: "Заголовок 1",
            h2: "Заголовок 2",
            h3: "Заголовок 3",
            h4: "Заголовок 4",
            h5: "Заголовок 5",
            h6: "Заголовок 6"
        },
        emphasis: {
            bold: "Полужирный",
            italic: "Курсив",
            underline: "Подчёркнутый",
            small: "Уменьшенный"
        },
        lists: {
            unordered: "Маркированный список",
            ordered: "Нумерованный список",
            outdent: "Уменьшить отступ",
            indent: "Увеличить отступ"
        },
        link: {
            insert: "Вставить ссылку",
            cancel: "Отмена"
        },
        image: {
            insert: "Вставить изображение",
            cancel: "Отмена"
        },
        html: {
            edit: "HTML код"
        },
        colours: {
            black: "Чёрный",
            silver: "Серебряный",
            gray: "Серый",
            maroon: "Коричневый",
            red: "Красный",
            purple: "Фиолетовый",
            green: "Зелёный",
            olive: "Оливковый",
            navy: "Тёмно-синий",
            blue: "Синий",
            orange: "Оранжевый"
        }
    };
}));


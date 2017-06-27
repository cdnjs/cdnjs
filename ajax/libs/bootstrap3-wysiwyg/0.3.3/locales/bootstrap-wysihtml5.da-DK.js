/**
* Danish translations
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('bootstrap.wysihtml5.da-DK', ['jquery', 'bootstrap.wysihtml5'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($){
    $.fn.wysihtml5.locale["da-DK"] = {
        font_styles: {
            normal: "Normal tekst",
            h1: "Overskrift 1",
            h2: "Overskrift 2",
            h3: "Overskrift 3",
            h4: "Overskrift 4",
            h5: "Overskrift 5",
            h6: "Overskrift 6"
        },
        emphasis: {
            bold: "Fed",
            italic: "Kursiv",
            underline: "Understreget"
        },
        lists: {
            unordered: "Uordnet liste",
            ordered: "Ordnet liste",
            outdent: "Udryk",
            indent: "Indryk"
        },
        link: {
            insert: "Indsæt Link",
            cancel: "Annuler"
        },
        image: {
            insert: "Indsæt billede",
            cancel: "Annuler"
        },
        html: {
            edit: "Rediger HTML"
        },
        colours: {
            black: "Sort",
            silver: "Sølv",
            gray: "Grå",
            maroon: "Mørkerød",
            red: "Rød",
            purple: "Lilla",
            green: "Grøn",
            olive: "Lysegrøn",
            navy: "Mørkeblå",
            blue: "Blå",
            orange: "Orange"
        }
    };
}));

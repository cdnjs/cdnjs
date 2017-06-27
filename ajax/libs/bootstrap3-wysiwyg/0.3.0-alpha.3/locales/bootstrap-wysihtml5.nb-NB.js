/**
 * Norwegian translation for bootstrap-wysihtml5
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('bootstrap.wysihtml5.nb-NB', ['jquery', 'bootstrap.wysihtml5'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($){
    $.fn.wysihtml5.locale["nb-NB"] = {
        font_styles: {
              normal: "Normal tekst",
              h1: "Tittel 1",
              h2: "Tittel 2",
              h3: "Tittel 3"
        },
        emphasis: {
              bold: "Fet",
              italic: "Kursiv",
              underline: "Understrekning"
        },
        lists: {
              unordered: "Usortert",
              ordered: "Sortert",
              outdent: "Detabuler",
              indent: "Tabuler",
              indered: "Tabuler"
        },
        link: {
              insert: "Sett inn lenke",
              cancel: "Avbryt"
        },
        image: {
              insert: "Sett inn bilde",
              cancel: "Avbryt"
        },
        html: {
            edit: "Rediger HTML"
        },
        colours: {
          black: "Svart",
          silver: "Sølv",
          gray: "Grå",
          maroon: "Brun",
          red: "Rød",
          purple: "Lilla",
          green: "Grønn",
          olive: "Oliven",
          navy: "Marineblå",
          blue: "Blå",
          orange: "Oransj"
        }
    };
}));

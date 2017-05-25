/**
 * Spanish translation for bootstrap-wysihtml5
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('bootstrap.wysihtml5.es-ES', ['jquery', 'bootstrap.wysihtml5'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($){
    $.fn.wysihtml5.locale["es-ES"] = {
        font_styles: {
              normal: "Texto normal",
              h1: "Título 1",
              h2: "Título 2",
              h3: "Título 3",
              h4: "Título 4",
              h5: "Título 5",
              h6: "Título 6"
        },
        emphasis: {
              bold: "Negrita",
              italic: "Itálica",
              underline: "Subrayado",
              small: "Subíndice"
        },
        lists: {
              unordered: "Lista desordenada",
              ordered: "Lista ordenada",
              outdent: "Eliminar sangría",
              indent: "Agregar sangría"
        },
        link: {
              insert: "Insertar enlace",
              cancel: "Cancelar",
              target: "Abrir enlace en una ventana nueva"
        },
        image: {
              insert: "Insertar imagen",
              cancel: "Cancelar"
        },
        html: {
            edit: "Editar HTML"
        },
        colours: {
          black: "Negro",
          silver: "Plata",
          gray: "Gris",
          maroon: "Marrón",
          red: "Rojo",
          purple: "Púrpura",
          green: "Verde",
          olive: "Oliva",
          navy: "Azul Marino",
          blue: "Azul",
          orange: "Naranja"
        }
    };
}));

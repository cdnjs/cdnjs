/**
 * Brazilian portuguese translation for bootstrap-wysihtml5
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('bootstrap.wysihtml5.pt-BR', ['jquery', 'bootstrap.wysihtml5'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($){
    $.fn.wysihtml5.locale["pt-BR"] = {
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
            bold: "Negrito",
            italic: "Itálico",
            underline: "Sublinhado",
            small: "Pequeno"
        },
        lists: {
            unordered: "Lista",
            ordered: "Lista numerada",
            outdent: "Remover indentação",
            indent: "Indentar"
        },
        link: {
            insert: "Inserir link",
            cancel: "Cancelar",
            target: "Abrir link em um nova janela"
        },
        image: {
            insert: "Inserir imagem",
            cancel: "Cancelar"
        },
        html: {
            edit: "Editar HTML"
        },
        colours: {
            black: "Preto",
            silver: "Prata",
            gray: "Cinza",
            maroon: "Marrom",
            red: "Vermelho",
            purple: "Roxo",
            green: "Verde",
            olive: "Oliva",
            navy: "Marinho",
            blue: "Azul",
            orange: "Laranja"
        }
    };
}));

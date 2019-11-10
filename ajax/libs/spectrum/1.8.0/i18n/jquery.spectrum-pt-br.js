// Spectrum Colorpicker
// Brazilian (pt-br) localization
// https://github.com/bgrins/spectrum

(function ( $ ) {

    var localization = $.spectrum.localization["pt-br"] = {
        cancelText: "Cancelar",
        chooseText: "Escolher",
        clearText: "Limpar cor selecionada",
        noColorSelectedText: "Nenhuma cor selecionada",
        togglePaletteMoreText: "Mais",
        togglePaletteLessText: "Menos"
    };

    $.extend($.fn.spectrum.defaults, localization);

})( jQuery );

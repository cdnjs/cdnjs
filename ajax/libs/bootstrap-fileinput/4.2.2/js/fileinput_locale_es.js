/*!
 * FileInput Spanish (Latin American) Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function ($) {
    "use strict";

    $.fn.fileinputLocales['es'] = {
        fileSingle: 'archivo',
        filePlural: 'archivos',
        browseLabel: 'Buscar &hellip;',
        removeLabel: 'Remover',
        removeTitle: 'Limpiar archivos seleccionados',
        cancelLabel: 'Cancelar',
        cancelTitle: 'Abortar el cargue en curso',
        uploadLabel: 'Cargar Archivo',
        uploadTitle: 'Cargar archivos seleccionados',
        msgSizeTooLarge: 'Archivo "{name}" (<b>{size} KB</b>) excede el tamaño máximo permitido de <b>{maxSize} KB</b>. Por favor reintente su cargue!',
        msgFilesTooLess: 'Usted debe seleccionar al menos <b>{n}</b> {files} a cargar. Por favor reintente su cargue!',
        msgFilesTooMany: 'El número de archivos seleccionados a cargar <b>({n})</b> excede el límite máximo permitido de <b>{m}</b>. Por favor reintente su cargue!',
        msgFileNotFound: 'Archivo "{name}" no encontrado!',
        msgFileSecured: 'Restricciones de seguridad previenen la lectura del archivo "{name}".',
        msgFileNotReadable: 'Archivo "{name}" no se puede leer.',
        msgFilePreviewAborted: 'Previsualización del archivo abortada para "{name}".',
        msgFilePreviewError: 'Ocurrió un error mientras se leía el archivo "{name}".',
        msgInvalidFileType: 'Tipo de archivo inválido para el archivo "{name}". Sólo archivos "{types}" son permitidos.',
        msgInvalidFileExtension: 'Extensión de archivo inválido para "{name}". Sólo archivos "{extensions}" son permitidos.',
        msgValidationError: 'Error Cargando Archivo',
        msgLoading: 'Cargando archivo {index} of {files} &hellip;',
        msgProgress: 'Cargando archivo {index} of {files} - {name} - {percent}% completado.',
        msgSelected: '{n} {files} seleccionados',
        msgFoldersNotAllowed: 'Arrastre y suelte únicamente archivos! Se omite {n} carpeta(s).',
        msgImageWidthSmall: 'Ancho de la imagen de archivo "{name}" debe ser al menos {size} px.',
        msgImageHeightSmall: 'Altura de la imagen de archivo "{name}" debe ser al menos {size} px.',
        msgImageWidthLarge: 'Ancho de la imagen de archivo "{name}" no puede exceder de {size} px.',
        msgImageHeightLarge: 'Altura de la imagen de archivo "{name}" no puede exceder de {size} px.',
        dropZoneTitle: 'Arrastre y suelte los archivos aquí &hellip;'
    };
})(window.jQuery);
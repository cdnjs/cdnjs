/*!
 * FileInput Portuguese Translations
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

    $.fn.fileinput.locales.pt= {
        fileSingle: 'ficheiro',
        filePlural: 'ficheiros',
        browseLabel: 'Procurar &hellip;',
        removeLabel: 'Remover',
        removeTitle: 'Remover ficheiros seleccionados',
        cancelLabel: 'Cancelar',
        cancelTitle: 'Abortar carregamento ',
        uploadLabel: 'Carregar',
        uploadTitle: 'Carregar ficheiros seleccionados',
        msgSizeTooLarge: 'Ficheiro "{name}" (<b>{size} KB</b>) excede o tamanho máximo permido de <b>{maxSize} KB</b>. Por favor carregue de novo!',
        msgFilesTooLess: 'Deve seleccionar pelo menos <b>{n}</b> {files} para fazer upload. Por favor carregue de novo!',
        msgFilesTooMany: 'Número máximo de ficheiros seleccionados <b>({n})</b> excede o limite máximo de <b>{m}</b>. Por favor carregue de novo!',
        msgFileNotFound: 'Ficheiro "{name}" não encontrado!',
        msgFileSecured: 'Restrições de segurança preventem a leitura do ficheiro "{name}".',
        msgFileNotReadable: 'Ficheiro "{name}" não pode ser lido.',
        msgFilePreviewAborted: 'Pré-visualização abortado para o ficheiro "{name}".',
        msgFilePreviewError: 'Ocorreu um erro ao ler o ficheiro "{name}".',
        msgInvalidFileType: 'Tipo inválido para o ficheiro "{name}". Apenas ficheiros "{types}" são suportados.',
        msgInvalidFileExtension: 'Extensão inválida para o ficheiro "{name}". Apenas ficheiros "{extensions}" são suportados.',
        msgValidationError: 'Erro de carregamento de ficheiro',
        msgLoading: 'A carregar ficheiro {index} de {files} &hellip;',
        msgProgress: 'A carregar ficheiro {index} de {files} - {name} - {percent}% completo.',
        msgSelected: '{n} {files} seleccionados',
        msgFoldersNotAllowed: 'Arrastar e largar ficheiros apenas! {n} pasta(s) ignoradas.',
        dropZoneTitle: 'Arrastar e largar ficheiros aqui &hellip;'
    };

    $.extend($.fn.fileinput.defaults, $.fn.fileinput.locales.pt);
})(window.jQuery);
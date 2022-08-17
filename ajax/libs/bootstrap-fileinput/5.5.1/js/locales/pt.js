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
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    "use strict";

    $.fn.fileinputLocales['pt'] = {
        sizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], 
        bitRateUnits: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
        fileSingle: 'ficheiro',
        filePlural: 'ficheiros',
        browseLabel: 'Procurar &hellip;',
        removeLabel: 'Remover',
        removeTitle: 'Remover ficheiros selecionados',
        cancelLabel: 'Cancelar',
        cancelTitle: 'Abortar envio',
        pauseLabel: 'Parar',
        pauseTitle: 'Parar envio em curso',
        uploadLabel: 'Enviar',
        uploadTitle: 'Enviar ficheiros selecionados',
        msgNo: 'Não',
        msgNoFilesSelected: 'Nenhum ficheiro selecionado',
        msgPaused: 'Parado',
        msgCancelled: 'Cancelado',
        msgPlaceholder: 'Selecionar {files} ...',
        msgZoomModalHeading: 'Pré-visualização detalhada',
        msgFileRequired: 'É necessário selecionar um ficheiro a enviar.',
        msgSizeTooSmall: 'Ficheiro "{name}" (<b>{size}</b>) é demasiado pequeno, tem ser ser maior que <b>{minSize}</b>.',
        msgSizeTooLarge: 'Ficheiro "{name}" (<b>{size}</b>) excede o tamanho máximo permido de <b>{maxSize}</b>.',
        msgFilesTooLess: 'Deve selecionar pelo menos <b>{n}</b> {files} para enviar.',
        msgFilesTooMany: 'Número máximo de ficheiros selecionados <b>({n})</b> excede o limite máximo de <b>{m}</b>.',
        msgTotalFilesTooMany: 'Pode enviar no máximo <b>{m}</b> ficheiros (<b>{n}</b> ficheiros detetados).',
        msgFileNotFound: 'Ficheiro "{name}" não encontrado.',
        msgFileSecured: 'Restrições de segurança impedem a leitura do ficheiro "{name}".',
        msgFileNotReadable: 'Ficheiro "{name}" não pode ser lido.',
        msgFilePreviewAborted: 'Pré-visualização abortado para o ficheiro "{name}".',
        msgFilePreviewError: 'Ocorreu um erro ao ler o ficheiro "{name}".',
        msgInvalidFileName: 'Caracteres inválidos ou não suportados no nome de ficheiro "{name}".',
        msgInvalidFileType: 'Tipo inválido para o ficheiro "{name}". Apenas ficheiros "{types}" são suportados.',
        msgInvalidFileExtension: 'Extensão inválida para o ficheiro "{name}". Apenas ficheiros "{extensions}" são suportados.',
        msgFileTypes: {
            'image': 'imagem',
            'html': 'HTML',
            'text': 'texto',
            'video': 'vídeo',
            'audio': 'audio',
            'flash': 'flash',
            'pdf': 'PDF',
            'object': 'objeto'
        },
        msgUploadAborted: 'O envio do ficheiro foi abortado',
        msgUploadThreshold: 'A processar &hellip;',
        msgUploadBegin: 'A inicializar &hellip;',
        msgUploadEnd: 'Concluído',
        msgUploadResume: 'A retomar o envio &hellip;',
        msgUploadEmpty: 'Não existem dados válidos disponíveis para o envio.',
        msgUploadError: 'Erro de Envio',
        msgDeleteError: 'Erro de Eliminação',
        msgProgressError: 'Erro',
        msgValidationError: 'Erro de Validação',
        msgLoading: 'A enviar ficheiro {index} de {files} &hellip;',
        msgProgress: 'A enviar ficheiro {index} de {files} - {name} - {percent}% completo.',
        msgSelected: '{n} {files} selecionados',
        msgProcessing: 'Processing ...',
        msgFoldersNotAllowed: 'Arrastar e largar ficheiros apenas. {n} pasta(s) ignoradas.',
        msgImageWidthSmall: 'Largura da imagem "{name}" deve ser pelo menos <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageHeightSmall: 'Altura da imagem "{name}" deve ser pelo menos <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageWidthLarge: 'Largura da imagem "{name}" não pode exceder <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageHeightLarge: 'Altura da imagem "{name}" não pode exceder <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageResizeError: 'Nãofoi possível obter as dimensões da imagem para redimensionar.',
        msgImageResizeException: 'Erro ao redimensionar a imagem.<pre>{errors}</pre>',
        msgAjaxError: 'Ocorreu um erro durante a operação {operation}. Por favor tente de novo mais tarde.',
        msgAjaxProgressError: '{operation} falhou',
        msgDuplicateFile: 'O ficheiro "{name}" com o mesmo tamanho "{size}" já foi anteriormente selecionado. O ficheiro duplicado foi ignorado.',
        msgResumableUploadRetriesExceeded: 'O envio foi abortado após <b>{max}</b> tentativas para o ficheiro <b>{file}</b>. Detalhes do erro: <pre>{error}</pre>',
        msgPendingTime: '{time} restante',
        msgCalculatingTime: 'a calcular o tempo restante',
        ajaxOperations: {
            deleteThumb: 'eliminar ficheiro',
            uploadThumb: 'enviar ficheiro',
            uploadBatch: 'envio de ficheiros em lote',
            uploadExtra: 'envio de ficheiro em formulário'
        },
        dropZoneTitle: 'Arrastar e largar ficheiros aqui &hellip;',
        dropZoneClickTitle: '<br>(ou clique para selecionar {files})',
        fileActionSettings: {
            removeTitle: 'Remover ficheiro',
            uploadTitle: 'Enviar ficheiro',
            uploadRetryTitle: 'Voltar a tentar o envio',
            downloadTitle: 'Transferir ficheiro',
            rotateTitle: 'Rotate 90 deg. clockwise',
            zoomTitle: 'Ver detalhes',
            dragTitle: 'Mover / Reorganizar',
            indicatorNewTitle: 'Ainda Não Enviado',
            indicatorSuccessTitle: 'Enviado',
            indicatorErrorTitle: 'Erro de Envio',
            indicatorPausedTitle: 'Envio Parado',
            indicatorLoadingTitle:  'A enviar &hellip;'
        },
        previewZoomButtonTitles: {
            prev: 'Ver ficheiro anterior',
            next: 'Ver próximo ficheiro',
            rotate: 'Rotate 90 deg. clockwise',
            toggleheader: 'Mostrar/esconder cabeçalho',
            fullscreen: 'Alternar entre ecrã completo',
            borderless: 'Alternar entre modo sem bordas',
            close: 'Fechar pré-visualização detalhada'
        }
    };
}));

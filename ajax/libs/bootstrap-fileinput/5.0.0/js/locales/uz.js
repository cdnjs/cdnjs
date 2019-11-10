/*!
 * FileInput Uzbek Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 * @author CyanoFresh <cyanofresh@gmail.com>
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function ($) {
    "use strict";

    $.fn.fileinputLocales.uz = {
        fileSingle: 'fayl',
        filePlural: 'fayllar',
        browseLabel: 'Tanlash &hellip;',
        removeLabel: 'O\'chirish',
        removeTitle: 'Tanlangan fayllarni tozalash',
        cancelLabel: 'Bekor qilish',
        cancelTitle: 'Joriy yuklab olishni bekor qilish',
        pauseLabel: 'Pause',
        pauseTitle: 'Pause ongoing upload',
        uploadLabel: 'Yuklab olish',
        uploadTitle: 'Tanlangan fayllarni yuklash',
        msgNo: 'No',
        msgNoFilesSelected: 'No files selected',
        msgPaused: 'Paused',
        msgCancelled: 'Cancelled',
        msgPlaceholder: 'Select {files}...',
        msgZoomModalHeading: 'Detailed Preview',
        msgFileRequired: 'You must select a file to upload.',
        msgSizeTooSmall: 'File "{name}" (<b>{size} KB</b>) is too small and must be larger than <b>{minSize} KB</b>.',
        msgSizeTooLarge: '"{name}" fayl (<b>{size} KB</b>) ruxsat etilgan maksimal yuklash hajmidan <b>{maxSize} KB</b> ortiq. Yuklashni qayta urinib ko\'ring!',
        msgFilesTooLess: 'Yuklash uchun kamida <b>{n}</b> {files} tanlashingiz kerak. Yuklashni qayta urinib ko\'ring!',
        msgFilesTooMany: 'Tanlangan fayllar <b>({n})</b>  ruxsat etilgan maksimal yuklash hajmidan <b>{m}</b> ortiq. Yuklashni qayta urinib ko\'ring!',
        msgFileNotFound: '"{name}" fayl topilmaydi!',
        msgFileSecured: 'Security restrictions prevent reading the file "{name}".',
        msgFileNotReadable: '"{name}" fayl o\'qilmaydi.',
        msgFilePreviewAborted: '"{name}" Ffylni oldindan ko\'rish jarayoni to\'xtatildi.',
        msgFilePreviewError: '"{name}" faylni o\'qish paytida xatolik yuz berdi.',
        msgInvalidFileName: 'Invalid or unsupported characters in file name "{name}".',
        msgInvalidFileType: '"{name}" fayl uchun yaroqsiz tur. Faqat "{types}" fayllari qo\'llab-quvvatlanadi.',
        msgInvalidFileExtension: '"{name}" fayl uchun noto\'g\'ri kengaytma. Faqat "{extensions}" fayllari qo\'llab-quvvatlanadi.',
        msgFileTypes: {
            'image': 'image',
            'html': 'HTML',
            'text': 'text',
            'video': 'video',
            'audio': 'audio',
            'flash': 'flash',
            'pdf': 'PDF',
            'object': 'object'
        },
        msgUploadAborted: 'The file upload was aborted',
        msgUploadThreshold: 'Processing...',
        msgUploadBegin: 'Initializing...',
        msgUploadEnd: 'Done',
        msgUploadResume: 'Resuming upload...',
        msgUploadEmpty: 'No valid data available for upload.',
        msgUploadError: 'Error',
        msgValidationError: 'Fayl yuklash xatosi',
        msgLoading: '{Files} dan {index} faylini yuklash &hellip;',
        msgProgress: '{Files} dan {index}{name} faylini yuklashi  - {percent}% tugallandi.',
        msgSelected: '{n} {files} tanlangan',
        msgFoldersNotAllowed: 'Faqat tortib qo\'yiladon fayllar! {n} o\'tirilgan tashlangan papka(lar).',
        msgImageWidthSmall: 'Width of image file "{name}" must be at least {size} px.',
        msgImageHeightSmall: 'Height of image file "{name}" must be at least {size} px.',
        msgImageWidthLarge: 'Width of image file "{name}" cannot exceed {size} px.',
        msgImageHeightLarge: 'Height of image file "{name}" cannot exceed {size} px.',
        msgImageResizeError: 'Could not get the image dimensions to resize.',
        msgImageResizeException: 'Error while resizing the image.<pre>{errors}</pre>',
        msgAjaxError: 'Something went wrong with the {operation} operation. Please try again later!',
        msgAjaxProgressError: '{operation} failed',
        msgDuplicateFile: 'File "{name}" of same size "{size} KB" has already been selected earlier. Skipping duplicate selection.',
        msgResumableUploadRetriesExceeded:  'Upload aborted beyond <b>{max}</b> retries for file <b>{file}</b>! Error Details: <pre>{error}</pre>',
        msgPendingTime: '{time} remaining',
        msgCalculatingTime: 'calculating time remaining',
        ajaxOperations: {
            deleteThumb: 'file delete',
            uploadThumb: 'file upload',
            uploadBatch: 'batch file upload',
            uploadExtra: 'form data upload'
        },
        dropZoneTitle: 'Fayllarni bu yerga tortib qo\'ying &hellip;',
        dropZoneClickTitle: '<br>(or click to select {files})',
        fileActionSettings: {
            removeTitle: 'Remove file',
            uploadTitle: 'Upload file',
            uploadRetryTitle: 'Retry upload',
            downloadTitle: 'Download file',
            zoomTitle: 'View details',
            dragTitle: 'Move / Rearrange',
            indicatorNewTitle: 'Not uploaded yet',
            indicatorSuccessTitle: 'Uploaded',
            indicatorErrorTitle: 'Upload Error',
            indicatorLoadingTitle: 'Uploading ...'
        },
        previewZoomButtonTitles: {
            prev: 'View previous file',
            next: 'View next file',
            toggleheader: 'Toggle header',
            fullscreen: 'Toggle full screen',
            borderless: 'Toggle borderless mode',
            close: 'Close detailed preview'
        }
    };
})(window.jQuery);

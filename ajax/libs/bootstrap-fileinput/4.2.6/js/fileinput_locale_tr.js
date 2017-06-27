/*!
 * FileInput Turkish Translations
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

    $.fn.fileinputLocales['tr'] = {
        fileSingle: 'dosya',
        filePlural: 'dosyalar',
        browseLabel: 'Gözat &hellip;',
        removeLabel: 'Sil',
        removeTitle: 'Seçilen dosyaları sil',
        cancelLabel: 'İptal',
        cancelTitle: 'Devam eden yüklemeyi iptal et',
        uploadLabel: 'Yükle',
        uploadTitle: 'Seçilen dosyaları yükle',
        msgZoomTitle: 'Ayrıntıları görüntüle',
        msgZoomModalHeading: 'Detaylı Önizleme',
        msgSizeTooLarge: '"{name}" dosyasının boyutu (<b>{size} KB</b>) izin verilen azami dosya boyutu olan <b>{maxSize} KB</b>\'tan büyük.',
        msgFilesTooLess: 'Yüklemek için en az <b>{n}</b> {files} dosya seçmelisiniz.',
        msgFilesTooMany: 'Yüklemek için seçtiğiniz dosya sayısı <b>({n})</b> azami limitin <b>{m}</b> altında olmalıdır.',
        msgFileNotFound: '"{name}" dosyası bulunamadı!',
        msgFileSecured: 'Güvenlik kısıtlamaları "{name}" dosyasının okunmasını engelliyor.',
        msgFileNotReadable: '"{name}" dosyası okunabilir değil.',
        msgFilePreviewAborted: '"{name}" dosyası için önizleme iptal edildi.',
        msgFilePreviewError: '"{name}" dosyası okunurken bir hata oluştu.',
        msgInvalidFileType: '"{name}" dosyasının türü geçerli değil. Yalnızca "{types}" türünde dosyalara izin veriliyor.',
        msgInvalidFileExtension: '"{name}" dosyasının uzantısı geçersiz. Yalnızca "{extensions}" uzantılı dosyalara izin veriliyor.',
        msgUploadAborted: 'Dosya yükleme iptal edildi',
        msgValidationError: 'Dosya Yükleme Hatası',
        msgLoading: 'Dosyalar yükleniyor {index} / {files} &hellip;',
        msgProgress: 'Dosya yükleniyor {index} / {files} - {name} - %{percent} tamamlandı.',
        msgSelected: '{n} {files} seçildi',
        msgFoldersNotAllowed: 'Yalnızca dosyaları sürükleyip bırakabilirsiniz! {n} dizin(ler) göz ardı edildi.',
        msgImageWidthSmall: 'Görüntü dosyası "{name}" genişliği en az {size} piksel olmalıdır.',
        msgImageHeightSmall: 'Görüntü dosyası "{name}" yüksekliği en az {size} piksel olmalıdır.',
        msgImageWidthLarge: 'Görüntü dosyası "{name}" genişliği {size} px geçemez.',
        msgImageHeightLarge: 'Resim dosyası "{name}" Yükseklik {size} px geçemez.',
        dropZoneTitle: 'Dosyaları buraya sürükleyip bırakın &hellip;',
        fileActionSettings: {
            removeTitle: 'dosyayı kaldır',
            uploadTitle: 'dosya yükleme',
            indicatorNewTitle: 'Henüz yüklendi',
            indicatorSuccessTitle: 'yüklendi',
            indicatorErrorTitle: 'Yükleme Hatası',
            indicatorLoadingTitle: 'Yükleme ...'
        }
    };
})(window.jQuery);

/*!
 * FileInput Indonesian Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 * @author Bambang Riswanto <bamz3r@gmail.com>
 * @author dheroefic <dheroefic@gmail.com>
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

    $.fn.fileinputLocales['id'] = {
        sizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], 
        bitRateUnits: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
        fileSingle: 'berkas',
        filePlural: 'berkas',
        browseLabel: 'Pilih berkas &hellip;',
        removeLabel: 'Hapus',
        removeTitle: 'Hapus berkas terpilih',
        cancelLabel: 'Batal',
        cancelTitle: 'Batalkan proses pengunggahan',
        pauseLabel: 'Tunda',
        pauseTitle: 'Tunda unggahan yang berlangsung',
        uploadLabel: 'Unggah',
        uploadTitle: 'Unggah berkas terpilih',
        msgNo: 'Tidak',
        msgNoFilesSelected: '',
        msgPaused: 'Ditunda',
        msgCancelled: 'Dibatalkan',
        msgPlaceholder: 'Pilih {files} ...',
        msgZoomModalHeading: 'Pratinjau terperinci',
        msgFileRequired: 'Anda harus memilih berkas untuk diunggah.',
        msgSizeTooSmall: 'Berkas "{name}" (<b>{size}</b>) terlalu kecil dan harus lebih besar dari <b>{minSize}</b>.',
        msgSizeTooLarge: 'Berkas "{name}" (<b>{size}</b>) melebihi ukuran unggah maksimal yaitu <b>{maxSize}</b>.',
        msgMultipleSizeTooLarge: 'Berkas "{name}" (<b>{size}</b>) melebihi ukuran unggah maksimal yaitu <b>{maxSize}</b>.',
        msgFilesTooLess: 'Anda harus memilih setidaknya <b>{n}</b> {files} untuk diunggah.',
        msgFilesTooMany: '<b>({n})</b> berkas yang dipilih untuk diunggah melebihi ukuran unggah maksimal yaitu <b>{m}</b>.',
        msgTotalFilesTooMany: 'Anda dapat mengunggah maksimal <b>{m}</b> berkas (<b>{n}</b> files detected).',
        msgFileNotFound: 'Berkas "{name}" tidak ditemukan!',
        msgFileSecured: 'Sistem keamanan mencegah untuk membaca berkas "{name}".',
        msgFileNotReadable: 'Berkas "{name}" tidak dapat dibaca.',
        msgFilePreviewAborted: 'Pratinjau untuk berkas "{name}" dibatalkan.',
        msgFilePreviewError: 'Kesalahan saat membaca berkas "{name}".',
        msgInvalidFileName: 'Karakter tidak dikenali atau tidak didukung untuk nama berkas "{name}".',
        msgInvalidFileType: 'Jenis berkas "{name}" tidak sah. Hanya berkas "{types}" yang didukung.',
        msgInvalidFileExtension: 'Ekstensi berkas "{name}" tidak sah. Hanya ekstensi "{extensions}" yang didukung.',
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
        msgUploadAborted: 'Proses Unggah berkas dibatalkan',
        msgUploadThreshold: 'Memproses &hellip;',
        msgUploadBegin: 'Menyiapkan &hellip;',
        msgUploadEnd: 'Selesai',
        msgUploadResume: 'Melanjutkan mengunggah &hellip;',
        msgUploadEmpty: 'Tidak ada data valid yang tersedia untuk diunggah.',
        msgUploadError: 'Gagal Mengunggah',
        msgDeleteError: 'Gagal Menghapus',
        msgProgressError: 'Kesalahan',
        msgValidationError: 'Kesalahan saat memvalidasi',
        msgLoading: 'Memuat {index} dari {files} berkas &hellip;',
        msgProgress: 'Memuat {index} dari {files} berkas - {name} - {percent}% selesai.',
        msgSelected: '{n} {files} dipilih',
        msgProcessing: 'Memproses ...',
        msgFoldersNotAllowed: 'Hanya bisa tahan dan lepas file saja! {n} folder diabaikan.',
        msgImageWidthSmall: 'Lebar dari gambar "{name}" harus sekurangnya <b>{size} px</b> (terdeteksi <b>{dimension} px</b>).',
        msgImageHeightSmall: 'Tinggi dari gambar "{name}" harus sekurangnya <b>{size} px</b> (terdeteksi <b>{dimension} px</b>).',
        msgImageWidthLarge: 'Lebar dari gambar "{name}" tidak boleh melebihi <b>{size} px</b> (terdeteksi <b>{dimension} px</b>).',
        msgImageHeightLarge: 'Tinggi dari gambar "{name}" tidak boleh melebihi <b>{size} px</b> (terdeteksi <b>{dimension} px</b>).',
        msgImageResizeError: 'Tidak dapat menentukan dimensi gambar untuk mengubah ukuran.',
        msgImageResizeException: 'Kesalahan saat mengubah ukuran gambar.<pre>{errors}</pre>',
        msgAjaxError: 'Terjadi kesalahan ketika melakukan operasi {operation}. Silahkan coba lagi nanti!',
        msgAjaxProgressError: '{operation} gagal',
        msgDuplicateFile: 'Berkas "{name}" yang mempunyai ukuran "{size}" sebelumnya pernah dipilih. Mengabaikan pilihan yang duplikat.',
        msgResumableUploadRetriesExceeded:  'Unggahan dibatalkan melewati batas <b>{max}</b> kali untuk berkas <b>{file}</b>! Detail Kesalahan: <pre>{error}</pre>',
        msgPendingTime: '{time} tersisa',
        msgCalculatingTime: 'menghitung waktu tersisa',
        ajaxOperations: {
            deleteThumb: 'Hapus berkas',
            uploadThumb: 'Unggah berkas',
            uploadBatch: 'Unggah banyak berkas',
            uploadExtra: 'Unggah form ekstra'
        },
        dropZoneTitle: 'Tarik dan lepaskan berkas disini &hellip;',
        dropZoneClickTitle: '<br>(atau klik untuk memilih {files})',
        fileActionSettings: {
            removeTitle: 'Hapus Berkas',
            uploadTitle: 'Unggah Berkas',
            uploadRetryTitle: 'Unggah Ulang',
            downloadTitle: 'Unduh Berkas',
            rotateTitle: 'Putar 90 derajat. Searah jarum jam',
            zoomTitle: 'Tampilkan Rincian',
            dragTitle: 'Pindah atau Atur Ulang',
            indicatorNewTitle: 'Belum diunggah',
            indicatorSuccessTitle: 'Sudah diunggah',
            indicatorErrorTitle: 'Kesalahan dalam mengungah',
            indicatorPausedTitle: 'Unggah Ditunda',
            indicatorLoadingTitle:  'Mengunggah &hellip;'
        },
        previewZoomButtonTitles: {
            prev: 'Lihat berkas sebelumnya',
            next: 'Lihat berkas selanjutnya',
            rotate: 'Putar 90 derajat. Searah jarum jam',
            toggleheader: 'Beralih ke tajuk',
            fullscreen: 'Beralih ke mode penuh',
            borderless: 'Beralih ke mode tanpa tepi',
            close: 'Tutup pratinjau terperinci'
        }
    };
}));

/*!
 * FileInput Urdu Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 * @author Mubashar Ahmad <mubasharahmad79@hotmail.com>
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

    $.fn.fileinputLocales['ur'] = {
        sizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], 
        bitRateUnits: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
        fileSingle: 'فائل',
        filePlural: 'فائلیں',
        browseLabel: 'براؤز کریں &hellip;',
        removeLabel: 'ہٹاو',
        removeTitle: 'منتخب فائلوں کو صاف کریں',
        cancelLabel: 'منسوخ کریں',
        cancelTitle: 'جاری اپ لوڈ کو منسوخ دیں',
        pauseLabel: 'روک دیں',
        pauseTitle: 'جاری اپ لوڈ کو روک دیں',
        uploadLabel: 'اپ لوڈ',
        uploadTitle: 'منتخب فائلیں اپ لوڈ کریں',
        msgNo: 'نہیں',
        msgNoFilesSelected: 'کوئی فائل منتخب نہیں کی گئی',
        msgPaused: 'روک دیا گیا',
        msgCancelled: 'منسوخ کر دیا گیا',
        msgPlaceholder: '... {files} منتخب کریں',
        msgZoomModalHeading: 'تفصیلی پیش نظارہ',
        msgFileRequired: 'اپ لوڈ کرنے کے لیے آپ کو ایک فائل کا انتخاب کرنا ہوگا۔',

        msgSizeTooSmall: 'فائل "{name}" (<b>{size}</b>) بہت چھوٹی ہے اور <b>{minSize}</b> سے بڑی ہونی چاہیے۔',

        msgSizeTooLarge: 'فائل "{name}" (<b>{size}</b>) زیادہ سے زیادہ اجازت شدہ اپ لوڈ سائز <b>{maxSize}</b> سے زیادہ ہے۔',
        msgMultipleSizeTooLarge: 'فائل "{name}" (<b>{size}</b>) زیادہ سے زیادہ اجازت شدہ اپ لوڈ سائز <b>{maxSize}</b> سے زیادہ ہے۔',
        msgFilesTooLess: 'اپ لوڈ کرنے کے لیے آپ کو کم از کم <b>{n}</b> {files} کا انتخاب کرنا چاہیے۔',
        msgFilesTooMany: 'اپ لوڈ کے لیے منتخب فائلوں کی تعداد <b>({n})</b> <b>{m}</b> کی زیادہ سے زیادہ اجازت شدہ حد سے زیادہ ہے۔',
        msgTotalFilesTooMany: 'آپ زیادہ سے زیادہ <b>{m}</b> فائلیں اپ لوڈ کرسکتے ہیں (<b>{n}</b> فائلوں کا پتہ چلا)۔',
        msgFileNotFound: 'فائل "{name}" نہیں ملی!',
        msgFileSecured: 'سیکیورٹی پابندیاں فائل "{name}" کو پڑھنے سے روکتی ہیں۔',
        msgFileNotReadable: 'فائل "{name}" پڑھنے کے قابل نہیں ہے۔',
        msgFilePreviewAborted: '"{name}" کے لیے فائل کا پیش منظر ختم کر دیا گیا۔',
        msgFilePreviewError: 'فائل "{name}" کو پڑھنے کے دوران ایک خرابی پیش آگئی۔',
        msgInvalidFileName: 'فائل نام "{name}" میں غلط یا غیر تعاون یافتہ حروف ہیں۔',
        msgInvalidFileType: 'فائل "{name}" کی قسم غلط ہے۔ صرف "{types}" فائلوں کی اجازت ہے۔',
        msgInvalidFileExtension: 'فائل "{name}" کے لیے غلط ایکسٹینشن۔ صرف "{extensions}" فائلوں کی اجازت ہے۔',
        msgFileTypes: {
            'image': 'تصویر',
            'html': 'HTML',
            'text': 'ٹیکسٹ',
            'video': 'ویڈیو',
            'audio': 'آڈیو',
            'flash': 'فلیش',
            'pdf': 'PDF',
            'object': 'آبجیکٹ'
        },
        msgUploadAborted: 'فائل اپ لوڈ کو روک دیا گیا تھا۔',
        msgUploadThreshold: '&hellip; پروسیسنگ',
        msgUploadBegin: 'شروع کر رہا ہے۔ &hellip;',
        msgUploadEnd: 'ہو گیا',
        msgUploadResume: 'اپ لوڈ دوبارہ شروع ہو رہا ہے۔ &hellip;',
        msgUploadEmpty: 'اپ لوڈ کے لیے کوئی درست ڈیٹا دستیاب نہیں ہے۔',
        msgUploadError: 'اپ لوڈ میں خرابی',
        msgDeleteError: 'حذف کرنے میں خرابی۔',
        msgProgressError: 'غلط',
        msgValidationError: 'توثیق کی خرابی۔',
        msgLoading: '{files} میں سے فائل {index} لوڈ ہو رہی ہے &hellip;',
        msgProgress: '{files} میں سے فائل {index} لوڈ ہو رہی ہے {name} - {percent}% ہو گئ ہیں ۔',
        msgSelected: '{n} {files} کو منتخب کیا گیا۔',
        msgProcessing: 'Processing ...',
        msgFoldersNotAllowed: 'صرف فائلوں کو گھسیٹیں اور چھوڑیں! {n} فولڈرز چھوڑ دیئے ہیں۔',
        msgImageWidthSmall: 'تصویر "{name}" کی چوڑائی کم از کم <b>{size} px</b> ہونی چاہیے (موجودہ <b>{dimension} px</b>)۔',
        msgImageHeightSmall: 'تصویر "{name}" کی اونچائی کم از کم <b>{size} px</b> ہونی چاہیے (موجودہ <b>{dimension} px</b>)۔',
        msgImageWidthLarge: 'تصویر "{name}" کی چوڑائی <b>{size} px</b> سے زیادہ نہیں ہو سکتی (موجودہ چوڑائی <b>{dimension} px</b>)۔',
        msgImageHeightLarge: 'تصویر"{name}" کی اونچائی <b>{size} px</b> سے زیادہ نہیں ہوسکتی ہے (موجودہ انچائی <b>{dimension} px</b>)۔',
        msgImageResizeError: 'سائز تبدیل کرنے کے لیے تصویر کی پیمائش حاصل نہیں کر سکے۔',
        msgImageResizeException: 'تصویر کا سائز تبدیل کرتے وقت خرابی۔<pre>{errors}</pre>',
        msgAjaxError: '{operation} آپریشن میں کچھ غلط ہو گیا۔ براہ کرم کچھ دیر بعد کوشش کریں!',
        msgAjaxProgressError: 'ناکام ہوگیا {operation}',
        msgDuplicateFile: '"{size}" کے سائز کی فائل "{name}" کو پہلے ہی منتخب کیا جا چکا ہے۔ ڈپلیکیٹ انتخاب کو چھوڑ دیں۔',
        msgResumableUploadRetriesExceeded:  '<b>{file}</b> کے لیے <b>{max}</b> کوششوں کے بعد اپ لوڈ روک دیا گیا! خرابی کی تفصیلات: <pre>{error}</pre>',
        msgPendingTime: '{time} باقی',
        msgCalculatingTime: 'باقی وقت کا حساب لگ رہا ہے',
        ajaxOperations: {
            deleteThumb: 'فائل کو حذف کریں',
            uploadThumb: 'فائل اپ لوڈ کریں',
            uploadBatch: 'فائلیں اپ لوڈ کریں۔',
            uploadExtra: 'فارم ڈیٹا اپ لوڈ کریں'
        },
        dropZoneTitle: 'فائلوں کو یہاں گھسیٹیں اور چھوڑیں۔ &hellip;',
        dropZoneClickTitle: '<br>(یا منتخب کرنے کے لیے کلک کریں {files})',
        fileActionSettings: {
            removeTitle: 'فائل کو ہٹا دیں۔',
            uploadTitle: 'اپ لوڈ فائل',
            uploadRetryTitle: 'دوبارہ اپ لوڈ کریں',
            downloadTitle: 'فائل ڈاؤن لوڈ',
            rotateTitle: '90 ڈگری گھمائیں۔ گھڑی کی سمت',
            zoomTitle: 'تفصیلات دیکھیں',
            dragTitle: 'منتقل کریں / دوبارہ ترتیب دیں۔',
            indicatorNewTitle: 'ابھی تک اپ لوڈ نہیں ہوا',
            indicatorSuccessTitle: 'اپ لوڈ کیا گیا',
            indicatorErrorTitle: 'اپ لوڈ میں خرابی',
            indicatorPausedTitle: 'اپ لوڈ روک دیا گیا',
            indicatorLoadingTitle:  'اپ لوڈ ہو رہا ہے &hellip;'
        },
        previewZoomButtonTitles: {
            prev: 'پچھلی فائل دیکھیں',
            next: 'اگلی فائل دیکھیں',
            rotate: '90 ڈگری گھمائیں۔ گھڑی کی سمت',
            toggleheader: 'ہیڈر تبدیل کریں',
            fullscreen: 'فل سکرین تبدیل کریں',
            borderless: 'بارڈر لیس موڈ تبدیل کریں۔',
            close: 'تفصیلی پیش نظارہ بند کریں'
        }
    };
}));

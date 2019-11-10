/*!
 * FileInput Arabic Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 * @author Yasser Lotfy <y_l@live.com>
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function ($) {
    "use strict";

    $.fn.fileinputLocales['ar'] = {
        fileSingle: 'ملف',
        filePlural: 'ملفات',
        browseLabel: 'تصفح &hellip;',
        removeLabel: 'حذف',
        removeTitle: 'مسح الملفات المختارة',
        cancelLabel: 'إلغاء',
        cancelTitle: 'إنهاء الرفع الحالي',
        uploadLabel: 'رفع',
        uploadTitle: 'رفع الملفات المختارة',
        msgZoomTitle: 'مشاهدة التفاصيل',
        msgZoomModalHeading: 'معاينة تفصيلية',
        msgSizeTooLarge: 'الملف "{name}" (<b>{size} ك.ب</b>) تعدى الحد الأقصى المسموح للرفع <b>{maxSize} ك.ب</b>.',
        msgFilesTooLess: 'يجب عليك إختيار <b>{n}</b> {files} على الأقل للرفع.',
        msgFilesTooMany: 'عدد الملفات المختارة للرفع <b>({n})</b> تعدت الحد الأقصى المسموح به لعدد <b>{m}</b>.',
        msgFileNotFound: 'الملف "{name}" غير موجود!',
        msgFileSecured: 'قيود أمنية تمنع قراءة الملف "{name}".',
        msgFileNotReadable: 'الملف "{name}" غير مقروء.',
        msgFilePreviewAborted: 'فشلت معاينة الملف "{name}".',
        msgFilePreviewError: 'حدث خطأ أثناء قراءة الملف "{name}".',
        msgInvalidFileType: 'نوعية غير صالحة للملف "{name}". فقط هذه النوعيات مدعومة "{types}".',
        msgInvalidFileExtension: 'إمتداد غير صالح للملف "{name}". فقط هذه الملفات مدعومة "{extensions}".',
        msgUploadAborted: 'فشل في رفع الملف',
        msgValidationError: 'خطأ في رفع الملف',
        msgLoading: 'تحميل ملف {index} من {files} &hellip;',
        msgProgress: 'تحميل ملف {index} من {files} - {name} - {percent}% منتهي.',
        msgSelected: '{n} {files} مختار(ة)',
        msgFoldersNotAllowed: 'إسحب وأترك الملفات فقط! تم تخطي {n} مجلد(ات) متروكة.',
        msgImageWidthSmall: 'عرض ملف الصورة "{name}" يجب أن يكون على الأقل {size} px.',
        msgImageHeightSmall: 'طول ملف الصورة "{name}" يجب أن يكون على الأقل {size} px.',
        msgImageWidthLarge: 'عرض ملف الصورة file "{name}" لا يمكن أن يتعدى {size} px.',
        msgImageHeightLarge: 'طول ملف الصورة "{name}" لا يمكن أن يتعدى {size} px.',
        msgImageResizeError: 'لم يتمكن من معرفة أبعاد الصورة لتغيير حجمها.',
        msgImageResizeException: 'خطأ أثناء تغيير حجم الصورة.<pre>{errors}</pre>',
        dropZoneTitle: 'إسحب وأترك الملفات هنا &hellip;',
        fileActionSettings: {
            removeTitle: 'حذف الملف',
            uploadTitle: 'رفع الملف',
            indicatorNewTitle: 'لم يتم الرفع بعد',
            indicatorSuccessTitle: 'تم الرفع',
            indicatorErrorTitle: 'خطأ بالرفع',
            indicatorLoadingTitle: 'جاري الرفع ...'
        }
    };
})(window.jQuery);

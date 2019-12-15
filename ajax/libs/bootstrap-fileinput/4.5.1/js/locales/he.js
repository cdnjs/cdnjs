/*!
 * FileInput Hebrew Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 * @author Daniel Coryat <awq8002@gmail.com>
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function ($) {
    "use strict";

    $.fn.fileinputLocales['he'] = {
        fileSingle: 'קובץ',
        filePlural: 'קבצים',
        browseLabel: 'העלאה &hellip;',
        removeLabel: 'הסרה',
        removeTitle: 'נקה קבצים נבחרים',
        cancelLabel: 'ביטול',
        cancelTitle: 'ביטול העלאה מתמשכת',
        uploadLabel: 'טעינה',
        uploadTitle: 'טעינת קבצים נבחרים',
        msgNo: 'לא',
        msgNoFilesSelected: 'לא נבחרו קבצים',
        msgCancelled: 'מבוטל',
        msgZoomModalHeading: 'תצוגה מקדימה מפורטת',
        msgSizeTooSmall: 'קובץ "{name}" (<b>{size} KB</b>) קטן מדי וחייב להיות גדול מ <b>{minSize} KB</b>.',
        msgSizeTooLarge: 'קובץ "{name}" (<b>{size} KB</b>) חורג מהגודל המרבי המותר להעלאה של <b>{maxSize} KB</b>.',
        msgFilesTooLess: 'עליך לבחור לפחות <b>{n}</b> {files} להעלאה.',
        msgFilesTooMany: 'מספר הקבצים שנבחרו להעלאה <b>({n})</b> חורג מהמגבלה המרבית המותרת של <b>{m}</b>.',
        msgFileNotFound: 'קובץ "{name}" לא נמצא!',
        msgFileSecured: 'הגבלות אבטחה מונעות קריאת הקובץ "{name}".',
        msgFileNotReadable: 'קובץ "{name}" לא קריא.',
        msgFilePreviewAborted: 'תצוגה מקדימה של הקובץ בוטלה עבור "{name}".',
        msgFilePreviewError: 'אירעה שגיאה בעת קריאת הקובץ "{name}".',
        msgInvalidFileName: 'תווים לא חוקיים או לא נתמכים בשם הקובץ "{name}".',
        msgInvalidFileType: 'סוג קובץ לא חוקי "{name}". רק "{types}" קבצים נתמכים.',
        msgInvalidFileExtension: 'תוסף לא חוקי עבור הקובץ "{name}". רק "{extensions}" קבצים נתמכים.',
        msgFileTypes: {
            'image': 'תמונה',
            'html': 'HTML',
            'text': 'טקסט',
            'video': 'וידאו',
            'audio': 'שמע',
            'flash': 'פלאש',
            'pdf': 'PDF',
            'object': 'אובייקט'
        },
        msgUploadAborted: 'העלאת הקובץ בוטלה',
        msgUploadThreshold: 'מעבד...',
        msgUploadBegin: 'מאתחל ...',
        msgUploadEnd: 'בוצע',
        msgUploadEmpty: 'אין נתונים זמינים להעלאה.',
        msgValidationError: 'שגיאת אימות',
        msgLoading: 'טוען קובץ {index} של {files} &hellip;',
        msgProgress: 'טוען קובץ {index} של {files} - {name} - {percent}% הושלמה.',
        msgSelected: '{n} {files} נבחרו',
        msgFoldersNotAllowed: 'גרירת קבצים ושחרורם בלבד! דילוג {n} גרירת תיקיה(s).',
        msgImageWidthSmall: 'רוחב קובץ התמונה "{name}" חייב להיות לפחות {size} px.',
        msgImageHeightSmall: 'גובה קובץ התמונה "{name}" חייב להיות לפחות {size} px.',
        msgImageWidthLarge: 'רוחב קובץ התמונה "{name}" לא יעלה על {size} px.',
        msgImageHeightLarge: 'גובה קובץ התמונה "{name}" לא יעלה על {size} px.',
        msgImageResizeError: 'לא ניתן לשנות את גודל מידות התמונה.',
        msgImageResizeException: 'שגיאה בעת שינוי גודל התמונה.<pre>{errors}</pre>',
        msgAjaxError: 'משהו השתבש עם {operation} המערכת. יש לנסות מאוחר יותר!',
        msgAjaxProgressError: '{operation} נכשל',
        ajaxOperations: {
            deleteThumb: 'קובץ נמחק',
            uploadThumb: 'קובץ הועלה',
            uploadBatch: 'קובץ אצווה הועלה',
            uploadExtra: 'העלאת נתונים בטופס'
        },
        dropZoneTitle: 'גרירת קבצים ושחרורם כאן &hellip;',
        dropZoneClickTitle: '<br>(או לחץ /י כדי לבחור {files})',
        fileActionSettings: {
            removeTitle: 'הסרת קובץ',
            uploadTitle: 'טעינת קובץ',
            zoomTitle: 'הצגת פרטים',
            dragTitle: 'העברה / סידור מחדש',
            indicatorNewTitle: 'עדיין לא הועלה',
            indicatorSuccessTitle: 'הועלה',
            indicatorErrorTitle: 'שגיאת העלאה',
            indicatorLoadingTitle: 'מעלה...'
        },
        previewZoomButtonTitles: {
            prev: 'הצגת את הקובץ הקודם',
            next: 'הצגת את הקובץ הבא',
            toggleheader: 'שינוי כותרת',
            fullscreen: 'מעבר למסך מלא',
            borderless: 'שינוי המודל ללא שוליים',
            close: 'סגירת תצוגה מקדימה מפורטת'
        }
    };
})(window.jQuery);

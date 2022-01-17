/*!
 * FileInput Greek Translations
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

    $.fn.fileinputLocales['el'] = {
        sizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], 
        bitRateUnits: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
        fileSingle: 'αρχείο',
        filePlural: 'αρχεία',
        browseLabel: 'Αναζήτηση &hellip;',
        removeLabel: 'Διαγραφή',
        removeTitle: 'Εκκαθάριση αρχείων',
        cancelLabel: 'Ακύρωση',
        cancelTitle: 'Ακύρωση μεταφόρτωσης',
        pauseLabel: 'Παύση',
        pauseTitle: 'Παύση φόρτωσης σε εξέλιξη',
        uploadLabel: 'Μεταφόρτωση',
        uploadTitle: 'Μεταφόρτωση επιλεγμένων αρχείων',
        msgNo: 'Όχι',
        msgNoFilesSelected: 'Δεν επιλέχθηκαν αρχεία',
        msgPaused: 'Σε παύση',
        msgCancelled: 'Ακυρώθηκε',
        msgPlaceholder: 'Επιλέξτε {files} ...',
        msgZoomModalHeading: 'Λεπτομερής Προεπισκόπηση',
        msgFileRequired: 'Πρέπει να επιλέξετε αρχείο για φόρτωση.',
        msgSizeTooSmall: 'Το "{name}" (<b>{size} KB</b>) είναι πολύ μικρό, πρέπει να είναι μεγαλύτερο από <b>{minSize} KB</b>.',
        msgSizeTooLarge: 'Το αρχείο "{name}" (<b>{size} KB</b>) υπερβαίνει το μέγιστο επιτρεπόμενο μέγεθος μεταφόρτωσης <b>{maxSize} KB</b>.',
        msgFilesTooLess: 'Πρέπει να επιλέξετε τουλάχιστον <b>{n}</b> {files} για να ξεκινήσει η μεταφόρτωση.',
        msgFilesTooMany: 'Ο αριθμός των αρχείων που έχουν επιλεγεί για μεταφόρτωση <b>({n})</b> υπερβαίνει το μέγιστο επιτρεπόμενο αριθμό <b>{m}</b>.',
        msgTotalFilesTooMany: 'Μπορείτε να επιλέξετε το πολύ <b>{m}</b> αρχεία (<b>{n}</b> αρχεία βρέθηκαν).',
        msgFileNotFound: 'Το αρχείο "{name}" δεν βρέθηκε!',
        msgFileSecured: 'Περιορισμοί ασφαλείας εμπόδισαν την ανάγνωση του αρχείου "{name}".',
        msgFileNotReadable: 'Το αρχείο "{name}" δεν είναι αναγνώσιμο.',
        msgFilePreviewAborted: 'Η προεπισκόπηση του αρχείου "{name}" ακυρώθηκε.',
        msgFilePreviewError: 'Παρουσιάστηκε σφάλμα κατά την ανάγνωση του αρχείου "{name}".',
        msgInvalidFileName: 'Μη έγκυροι χαρακτήρες στο όνομα του αρχείου "{name}".',
        msgInvalidFileType: 'Μη έγκυρος τύπος αρχείου "{name}". Οι τύποι αρχείων που υποστηρίζονται είναι: "{types}".',
        msgInvalidFileExtension: 'Μη έγκυρη επέκταση αρχείου "{name}". Οι επεκτάσεις που υποστηρίζονται είναι: "{extensions}".',
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
        msgUploadAborted: 'Η μεταφόρτωση του αρχείου ματαιώθηκε',
        msgUploadThreshold: 'Μεταφόρτωση &hellip;',
        msgUploadBegin: 'Αρχικοποίηση &hellip;',
        msgUploadEnd: 'Έτοιμο',
        msgUploadResume: 'Συνέχιση φόρτωσης &hellip;',
        msgUploadEmpty: 'Δεν βρέθηκαν έγκυρα δεδομένα για φόρτωση.',
        msgUploadError: 'Σφάλμα φόρτωσης',
        msgDeleteError: 'Σφάλμα διαγραφής',
        msgProgressError: 'Σφάλμα',
        msgValidationError: 'Σφάλμα Επικύρωσης',
        msgLoading: 'Φόρτωση αρχείου {index} από {files} &hellip;',
        msgProgress: 'Φόρτωση αρχείου {index} από {files} - {name} - {percent}% ολοκληρώθηκε.',
        msgSelected: '{n} {files} επιλέχθηκαν',
        msgProcessing: 'Processing ...',
        msgFoldersNotAllowed: 'Μπορείτε να σύρετε μόνο αρχεία! Παραβλέφθηκαν {n} φάκελος(-οι).',
        msgImageWidthSmall: 'Το πλάτος του αρχείου εικόνας "{name}" πρέπει να είναι τουλάχιστον {size} px.',
        msgImageHeightSmall: 'Το ύψος του αρχείου εικόνας "{name}" πρέπει να είναι τουλάχιστον {size} px.',
        msgImageWidthLarge: 'Το πλάτος του αρχείου εικόνας "{name}" δεν μπορεί να υπερβαίνει το {size} px.',
        msgImageHeightLarge: 'Το ύψος του αρχείου εικόνας "{name}" δεν μπορεί να υπερβαίνει το {size} px.',
        msgImageResizeError: 'Δεν μπορούν να βρεθούν οι διαστάσεις της εικόνας για την αλλαγή μεγέθους.',
        msgImageResizeException: 'Σφάλμα κατά την αλλαγή μεγέθους της εικόνας. <pre>{errors}</pre>',
        msgAjaxError: 'Συνέβη κάποιο σφάλμα με την διαδικασία {operation}. Παρακαλώ δοκιμάστε ξανά αργότερα!',
        msgAjaxProgressError: 'Αποτυχία {operation}',
        msgDuplicateFile: 'Το αρχείο "{name}" ίδιου μεγέθους "{size} KB" έχει ήδη επιλεγεί προηγουμένως. Παράλειψη της διπλότυπης επιλογής.',
        msgResumableUploadRetriesExceeded:  'Η φόρτωση ακυρώθηκε μετά από <b>{max}</b> δοκιμές για το αρχείο <b>{file}</b>! Λεπτομέρειες σφάλματος: <pre>{error}</pre>',
        msgPendingTime: 'Απομένει {time}',
        msgCalculatingTime: 'υπολογισμός χρόνου που απομένει',
        ajaxOperations: {
            deleteThumb: 'διαγραφή αρχείου',
            uploadThumb: 'φόρτωση αρχείου',
            uploadBatch: 'μαζική φόρτωση αρχείου',
            uploadExtra: 'φόρτωση δεδομένων φόρμας'
        },
        dropZoneTitle: 'Σύρετε τα αρχεία εδώ &hellip;',
        dropZoneClickTitle: '<br>(ή πατήστε για να επιλέξετε {files})',
        fileActionSettings: {
            removeTitle: 'Αφαιρέστε το αρχείο',
            uploadTitle: 'Μεταφορτώστε το αρχείο',
            uploadRetryTitle: 'Δοκιμή της φόρτωσης εκ νέου',
            downloadTitle: 'Μεταφόρτωση αρχείου',
            zoomTitle: 'Δείτε λεπτομέρειες',
            dragTitle: 'Μετακίνηση/Προσαρμογή',
            indicatorNewTitle: 'Δεν μεταφορτώθηκε ακόμα',
            indicatorSuccessTitle: 'Μεταφορτώθηκε',
            indicatorErrorTitle: 'Σφάλμα Μεταφόρτωσης',
            indicatorPausedTitle: 'Η φόρτωση σε παύση',
            indicatorLoadingTitle: 'Μεταφόρτωση &hellip;'
        },
        previewZoomButtonTitles: {
            prev: 'Προηγούμενο αρχείο',
            next: 'Επόμενο αρχείο',
            toggleheader: 'Εμφάνιση/Απόκρυψη τίτλου',
            fullscreen: 'Εναλλαγή πλήρους οθόνης',
            borderless: 'Με ή χωρίς πλαίσιο',
            close: 'Κλείσιμο προβολής'
        }
    };
}));

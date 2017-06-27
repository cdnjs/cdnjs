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
(function ($) {
    "use strict";

    $.fn.fileinputLocales['el'] = {
        fileSingle: 'Αρχείο',
        filePlural: 'Αρχεία',
        browseLabel: 'Αναζήτηση &hellip;',
        removeLabel: 'Ακύρωση',
        removeTitle: 'Εκκαθάριση αρχείων',
        cancelLabel: 'Ακύρωση',
        cancelTitle: 'Ακύρωση μεταφόρτωσης',
        uploadLabel: 'Μεταφόρτωση',
        uploadTitle: 'Μεταφόρτωση επιλεγμένων αρχείων',
        msgSizeTooLarge: 'Το αρχείο "{name}" (<b>{size} KB</b>) υπερβαίνει το μέγιστο επιτρεπόμενο μέγεθος μεταφόρτωσης <b>{maxSize} KB</b>. Παρακαλώ ξαναπροσπαθήστε!',
        msgFilesTooLess: 'Πρέπει να επιλέξετε τουλάχιστον <b>{n}</b> {files} για να ξεκινήσει η μεταφόρτωση. Παρακαλώ ξαναπροσπαθήστε!',
        msgFilesTooMany: 'Ο αριθμός των αρχείων που έχουν επιλεγεί για μεταφόρτωση <b>({n})</b> υπερβαίνει το μέγιστο επιτρεπόμενο αριθμό <b>{m}</b>. Παρακαλώ ξαναπροσπαθήστε!',
        msgFileNotFound: 'Το αρχείο με όνομα "{name}" δεν βρέθηκε!',
        msgFileSecured: 'Περιορισμοί ασφαλείας εμπόδισαν την ανάγνωση του αρχείου"{name}".',
        msgFileNotReadable: 'Το αρχείο με όνομα "{name}" δεν είναι αναγνώσιμο.',
        msgFilePreviewAborted: 'Η προεπισκόπηση του αρχείου ακυρώθηκε για "{name}".',
        msgFilePreviewError: 'Παρουσιάστηκε σφάλμα κατά την ανάγνωση του αρχείου "{name}".',
        msgInvalidFileType: 'Μη έγκυρος τύπος αρχείου "{name}". Οι τύποι αρχείων που υποστηρίζονται είναι : "{types}".',
        msgInvalidFileExtension: 'Μη έγκυρη επέκταση αρχείου "{name}". Οι επεκτάσεις που υποστηρίζονται είναι:  "{extensions}" .',
        msgValidationError: 'Σφάλμα κατά την μεταφόρτωση',
        msgLoading: 'Φόρτωση αρχείου {index} από {files} &hellip;',
        msgProgress: 'Φόρτωση αρχείου {index} απο {files} - {name} - {percent}% ολοκληρώθηκε.',
        msgSelected: '{n} {files} επιλέχθηκαν',
        msgFoldersNotAllowed: 'Μπορείτε να σύρετε μόνο αρχεία! Παραβλέφθηκαν {n} φάκελος(οι).',
        msgImageWidthSmall: 'Πλάτος του αρχείου εικόνας "{name}" πρέπει να είναι τουλάχιστον {size} px.',
        msgImageHeightSmall: 'Ύψος του αρχείου εικόνας "{name}" πρέπει να είναι τουλάχιστον {size} px.',
        msgImageWidthLarge: 'Πλάτος του αρχείου εικόνας "{name}" δεν μπορεί να υπερβαίνει το {size} px.',
        msgImageHeightLarge: 'Ύψος του αρχείου εικόνας "{name}" δεν μπορεί να υπερβαίνει το {size} px.',
        dropZoneTitle: 'Σύρετε τα αρχεία εδώ &hellip;'
    };
})(window.jQuery);
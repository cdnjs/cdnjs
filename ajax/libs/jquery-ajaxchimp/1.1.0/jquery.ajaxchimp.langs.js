(function ($) {
    'use strict';

    // ISO-693-1 Language codes: http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

    // Responses
    // 0: 'We have sent you a confirmation email'
    // 1: 'Please enter a value'
    // 2: 'An email address must contain a single @'
    // 3: 'The domain portion of the email address is invalid (the portion after the @: )'
    // 4: 'The username portion of the email address is invalid (the portion before the @: )'
    // 5: 'This email address looks fake or invalid. Please enter a real email address'

    // The translations below are from google translate, and may not be accurate.
    // Pull requests with translations for other languages as well as corrections are welcome.

    $.ajaxChimp.translations = {
        'de': {
            0: 'Wir haben Ihnen eine Bestätigungs-E-Mail verschickt',
            1: 'Bitte geben Sie einen Wert',
            2: 'Eine E-Mail-Adresse muss ein einzelnes enthalten @',
            3: 'Der Domänenteil der E-Mail-Adresse ist ungültig (der Teil nach dem @:)',
            4: 'Der Benutzername Teil der E-Mail-Adresse ist ungültig (der Teil vor dem @:)',
            5: 'Diese E-Mail-Adresse sieht gefälscht oder ungültig. Bitte geben Sie eine echte E-Mail-Adresse'
        },
        'es': {
            0: 'Te hemos enviado un email de confirmación',
            1: 'Por favor, introduzca un valor',
            2: 'Una dirección de correo electrónico debe contener una sola @',
            3: 'La parte de dominio de la dirección de correo electrónico no es válida (la parte después de la @:)',
            4: 'La parte de usuario de la dirección de correo electrónico no es válida (la parte antes de la @:)',
            5: 'Esta dirección de correo electrónico se ve falso o no válido. Por favor, introduce una dirección de correo electrónico real'
        },
        'fr': {
            0: 'Nous vous avons envoyé un e-mail de confirmation',
            1: 'S\'il vous plaît entrer une valeur',
            2: 'Une adresse e-mail doit contenir un seul @',
            3: 'La partie domaine de l\'adresse e-mail n\'est pas valide (la partie après le @:)',
            4: 'La partie nom d\'utilisateur de l\'adresse email n\'est pas valide (la partie avant le signe @:)',
            5: 'Cette adresse e-mail semble faux ou non valides. S\'il vous plaît entrer une adresse email valide'
        }
    };
})(jQuery);
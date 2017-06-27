(function ($) {
    'use strict';

    // ISO-693-1 Language codes: http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

    // Submit Message
    // 'submit': 'Submitting...'

    // Mailchimp Responses
    // 0: 'We have sent you a confirmation email'
    // 1: 'Please enter a value'
    // 2: 'An email address must contain a single @'
    // 3: 'The domain portion of the email address is invalid (the portion after the @: )'
    // 4: 'The username portion of the email address is invalid (the portion before the @: )'
    // 5: 'This email address looks fake or invalid. Please enter a real email address'

    $.ajaxChimp.translations = {
        // Translation via https://github.com/lifeisfoo
        'it': {
            'submit': 'Registrazione in corso...',
            0: 'Ti abbiamo inviato una mail di conferma',
            1: 'Per favore inserisci una mail',
            2: 'Un indirizzo valido contiene una sola @',
            3: 'Il dominio della tua mail non è valido (la porzione dopo la @: )',
            4: 'Il nome della mail non è valido (la porzione prima della @: )',
            5: 'L\'indirizzo email sembra finto o non valido: per favore inseriscine uno reale'
        },
        // Translation via https://github.com/Cube42
        'de': {
            'submit': 'Senden...',
            0: 'Wir haben Ihnen eine Bestätigungs-E-Mail geschickt',
            1: 'Bitte geben Sie Ihre E-Mail-Adresse ein',
            2: 'Eine E-Mail-Adresse muss ein @ enthalten',
            3: 'Der Domain-Teil der E-Mail-Adresse ist ungültig (der Teil nach dem @)',
            4: 'Der Benutzername der E-Mail-Adresse ist ungültig (der Teil vor dem @)',
            5: 'Diese E-Mail-Adresse scheint gefälscht oder ungültig zu sein. Bitte geben Sie eine echte E-Mail-Adresse an!'
        },

        // The translations below are from google translate, and may not be accurate.
        // Pull requests with translations for other languages as well as corrections are welcome.
        'es': {
            'submit': 'Grabación en curso...',
            0: 'Te hemos enviado un email de confirmación',
            1: 'Por favor, introduzca un valor',
            2: 'Una dirección de correo electrónico debe contener una sola @',
            3: 'La parte de dominio de la dirección de correo electrónico no es válida (la parte después de la @:)',
            4: 'La parte de usuario de la dirección de correo electrónico no es válida (la parte antes de la @:)',
            5: 'Esta dirección de correo electrónico se ve falso o no válido. Por favor, introduce una dirección de correo electrónico real'
        },
        'fr': {
            'submit': 'Enregistrement en cours...',
            0: 'Nous vous avons envoyé un e-mail de confirmation',
            1: 'S\'il vous plaît entrer une valeur',
            2: 'Une adresse e-mail doit contenir un seul @',
            3: 'La partie domaine de l\'adresse e-mail n\'est pas valide (la partie après le @:)',
            4: 'La partie nom d\'utilisateur de l\'adresse email n\'est pas valide (la partie avant le signe @:)',
            5: 'Cette adresse e-mail semble faux ou non valides. S\'il vous plaît entrer une adresse email valide'
        }
    };
})(jQuery);

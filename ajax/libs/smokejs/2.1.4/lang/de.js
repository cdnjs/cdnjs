(function($){
    $.fn.smkValidate.Languaje = {
        de: {
            // Fehlermeldung bei leeren Eingabefeldern
            textEmpty        : 'Hier ist eine Eingabe erforderlich',
            // Fehlermeldung bei falschen Eingaben im Eingabefeld Email
            textEmail        : 'Bitte geben Sie eine gültige Emailadresse ein',
            // Fehlermeldung in einem alphanumerischen Eingabefeld
            textAlphanumeric : 'Hier können Sie nur Zahlen und/oder Buchstaben eingeben',
            // Fehlermeldung beim Eingabefeld Nummern
            textNumber       : 'Hier können Sie nur Zahlen eingeben',
            // Fehlermeldung beim Eingabefeld Nummernbereich
            textNumberRange  : 'Die Zahl muss grösser als <b> {@} </b> und kleiner als <b> {@} </b> sein',
            // Fehlermeldung beim Eingabefeld Dezimalzahlen
            textDecimal      : 'Hier können Sie nur Dezimalzahlen eingeben',
            // Fehlermeldung beim Eingabefeld Währung
            textCurrency     : 'Bitte geben Sie eine gültige Währungsgrösse ein',
            // Fehlermeldung in einem Auswahl/Select-Feld
            textSelect       : 'Hier müssten Sie eine Auswahl treffen',
            // Fehlermeldung für die Eingabefelder Checkbox und Radio
            textCheckbox     : 'Hier müssten Sie eine Auswahl treffen',
            // Fehlermeldung beim Eingabefeld mit einer vorgebenen Anzahl an Zeichen
            textLength       : 'Dieses Feld erfordert eine Eingabe von <b> {@} </b> Zeichen',
            // Fehlermeldung bei der Eingabe eines vorgegebenen Bereiches an Anzahl der Zeichen
            textRange        : 'Die Anzahl der Zeichen muss grösser als <b> {@} </b> und kleiner als <b> {@} </b> sein',
            // Fehlermeldung für Passwortstärke (Voreinstellung)
            textSPassDefault : 'Mindestens 4 Zeichen',
            // Fehlermeldung für Passwortstärke (schwach)
            textSPassWeak    : 'Mindestens 6 Zeichen',
            // Fehlermeldung für Passwortstärke (mittel)
            textSPassMedium  : 'Mindestens 6 Buchstaben und 1 Zahl',
            // Fehlermeldung für Passwortstärke (stark)
            textSPassStrong  : 'Mindestens 6 Buchstaben, eine Zahl und ein Grossbuchstabe'
        }
    };

    $.smkEqualPass.Languaje = {
        de: {
            // Mensaje de error para el input repassword
            textEqualPass    : 'Wachtwoorden komen niet overeen'
        }
    };

    $.smkDate.Languaje = {
        de: {
            shortMonthNames : ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
            monthNames : ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
        }
    };

}(jQuery));
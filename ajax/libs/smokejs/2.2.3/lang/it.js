(function($){
    $.fn.smkValidate.Languaje = {
        it: {
            // Mensaje de error para los input vacíos
            textEmpty        : 'Campo obbligatorio',
            // Mensaje de error para el input email
            textEmail        : 'Inserire una email valida',
            // Mensaje de error para el input alphanumeric
            textAlphanumeric : 'Sono ammessi solo numeri e/o lettere',
            // Mensaje de error para el input number
            textNumber       : 'Sono ammessi solo numeri',
            // Mensaje de error para el input number range
            textNumberRange  : 'Il numero inserito deve essere maggiore di <b> {@} </b> e  minore di <b> {@} </b>',
            // Mensaje de error para el input decimal
            textDecimal      : 'Sono ammessi solo numeri decimali',
            // Mensaje de error para el input currency
            textCurrency     : 'Inserire un importo valido',
            // Mensaje de error para el input select
            textSelect       : 'Selezione obbligatoria',
            // Mensaje de error para el input checkbox y radio
            textCheckbox     : 'Selezione obbligatoria',
            // Mensaje de error para longitud de caracteres
            textLength       : 'Il numero di caratteri è uguale a <b> {@} </b>',
            // Mensaje de error para rango de caracteres
            textRange        : 'Il numero di caratteri deve essere maggiore di <b> {@} </b> e minore di <b> {@} </b>',
            // Mensaje de error para strongPass Default
            textSPassDefault : 'Minimo 4 caratteri',
            // Mensaje de error para strongPass Weak
            textSPassWeak    : 'Minimo 6 caratteri',
            // Mensaje de error para strongPass Madium
            textSPassMedium  : 'Minimo 6 caratteri con un numero',
            // Mensaje de error para strongPass Strong
            textSPassStrong  : 'Minimo 6 caratteri con un numbero ed una maiuscola'
        }
    };

    $.smkEqualPass.Languaje = {
        it: {
            // Mensaje de error para el input repassword
            textEqualPass    : 'I valori inseriti non coincidono'
        }
    };

    $.smkDate.Languaje = {
        it: {
            shortMonthNames : ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
            monthNames : ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]
        }
    };

}(jQuery));
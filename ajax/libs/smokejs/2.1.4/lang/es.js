(function($){
    $.fn.smkValidate.Languaje = {
        es: {
            // Mensaje de error para los input vacíos
            textEmpty        : 'Campo requerido',
            // Mensaje de error para el input email
            textEmail        : 'Ingresa una cuenta de correo válida',
            // Mensaje de error para el input alphanumeric
            textAlphanumeric : 'Solo se admiten números y/o letras',
            // Mensaje de error para el input number
            textNumber       : 'Solo se admiten números',
            // Mensaje de error para el input number range
            textNumberRange  : 'El numero debe ser mayor a <b> {@} </b> y menor a <b> {@} </b>',
            // Mensaje de error para el input decimal
            textDecimal      : 'Solo se admiten números decimales',
            // Mensaje de error para el input currency
            textCurrency     : 'Ingresa una cantidad monetaria válida',
            // Mensaje de error para el input select
            textSelect       : 'Es necesario que selecciones una opción',
            // Mensaje de error para el input checkbox y radio
            textCheckbox     : 'Es necesario que selecciones una opción',
            // Mensaje de error para longitud de caracteres
            textLength       : 'El número de caracteres debe ser igual a <b> {@} </b>',
            // Mensaje de error para rango de caracteres
            textRange        : 'El número de caracteres debe ser mayor a <b> {@} </b> y menor a <b> {@} </b>',
            // Mensaje de error para strongPass Default
            textSPassDefault : 'Mínimo 4 caracteres',
            // Mensaje de error para strongPass Weak
            textSPassWeak    : 'Mínimo 6 caracteres',
            // Mensaje de error para strongPass Madium
            textSPassMedium  : 'Mínimo 6 caracteres y un número',
            // Mensaje de error para strongPass Strong
            textSPassStrong  : 'Mínimo 6 caracteres un número y una mayúscula'
        }
    };

    $.smkEqualPass.Languaje = {
        es: {
            // Mensaje de error para el input repassword
            textEqualPass    : 'Las contraseñas no coinciden'
        }
    };

    $.smkDate.Languaje = {
        es: {
            shortMonthNames : ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            monthNames : ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        }
    };

}(jQuery));
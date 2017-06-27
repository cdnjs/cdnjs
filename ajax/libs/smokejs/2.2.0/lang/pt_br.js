(function($){
    $.fn.smkValidate.Languaje = {
        pt_br: {
            // Mensaje de error para los input vacíos
            textEmpty        : 'Campo requerido',
            // Mensaje de error para el input email
            textEmail        : 'Informe um email válido',
            // Mensaje de error para el input alphanumeric
            textAlphanumeric : 'Apenas números e/ou letras são permitidos',
            // Mensaje de error para el input number
            textNumber       : 'Apenas números são permitidos',
            // Mensaje de error para el input number range
            textNumberRange  : 'O intervalo numérico deve ser maior que <b> {@} </b> e menor que <b> {@}',
            // Mensaje de error para el input decimal
            textDecimal      : 'Apenas números decimais são permitidos',
            // Mensaje de error para el input currency
            textCurrency     : 'Informe uma quantidade monetária válida',
            // Mensaje de error para el input select
            textSelect       : 'É necessário selecionar uma opção',
            // Mensaje de error para el input checkbox y radio
            textCheckbox     : 'É necessário selecionar uma opção',
            // Mensaje de error para longitud de caracteres
            textLength       : 'O número de caracteres deve ser igual a <b> {@} </b>',
            // Mensaje de error para rango de caracteres
            textRange        : 'O número de caracteres deve ser maior que <b> {@} </b> e menor que <b> {@} </b>',
            // Mensaje de error para strongPass Default
            textSPassDefault : 'Mínimo 4 caracteres',
            // Mensaje de error para strongPass Weak
            textSPassWeak    : 'Mínimo 6 caracteres',
            // Mensaje de error para strongPass Madium
            textSPassMedium  : 'Mínimo 6 caracteres e um número',
            // Mensaje de error para strongPass Strong
            textSPassStrong  : 'Mínimo 6 caracteres, um número e uma maiúscula'
        }
    };

    $.smkEqualPass.Languaje = {
        pt_br: {
            // Mensaje de error para el input repassword
            textEqualPass    : 'As senhas não coincidem'
        }
    };

    $.smkDate.Languaje = {
        pt_br: {
            shortMonthNames : ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            monthNames : ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        }
    };

}(jQuery));
/**
* Smoke is the most complete jQuery Plugin and designed for use with Bootstrap 3. *
* @package Smoke
* @version 2.0
* @link https://github.com/alfredobarron/smoke The Smoke GitHub project
* @author Alfredo Barron <alfredobarronc@gmail.com>
* @copyright 2015 Alfredo Barron
* @license https://www.gnu.org/licenses/lgpl.html GNU Lesser General Public License
* @note This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Lesser General Public License for more details.
*/

(function($) {


/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Validate all inputs
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.fn.smkValidate = function(options) {

    var settings = $.extend({
        lang: 'en'
    }, $.fn.smkValidate.Languaje, options);

    var languaje =  {
        en: {
            // Mensaje de error para los input vacíos
            textEmpty        : 'Required field',
            // Mensaje de error para el input email
            textEmail        : 'Enter a valid email',
            // Mensaje de error para el input alphanumeric
            textAlphanumeric : 'Only numbers and/or letters allowed',
            // Mensaje de error para el input number
            textNumber       : 'Only numbers are allowed',
            // Mensaje de error para el input number range
            textNumberRange  : 'The numerical range must be greater than <b> {@} </b> and less than <b> {@} </b>',
            // Mensaje de error para el input decimal
            textDecimal      : 'Only decimal numbers are allowed',
            // Mensaje de error para el input currency
            textCurrency     : 'Please enter a valid monetary amount',
            // Mensaje de error para el input select
            textSelect       : 'It is necessary that you select an option',
            // Mensaje de error para el input checkbox y radio
            textCheckbox     : 'It is necessary that you select an option',
            // Mensaje de error para longitud de caracteres
            textLength       : 'The number of characters is equal to <b> {@} </b>',
            // Mensaje de error para rango de caracteres
            textRange        : 'The number of characters must be greater than <b> {@} </b> and less than <b> {@} </b>',
            // Mensaje de error para strongPass Default
            textSPassDefault : 'Minimum 4 characters',
            // Mensaje de error para strongPass Weak
            textSPassWeak    : 'Minimum 6 characters',
            // Mensaje de error para strongPass Madium
            textSPassMedium  : 'Minimum 6 characters and a number',
            // Mensaje de error para strongPass Strong
            textSPassStrong  : 'Minimum 6 characters a number and a capital'
        }
    };

    if(settings.lang != 'en'){
        languaje = $.fn.smkValidate.Languaje;
    }

    // Se inicializan las variables globales
    var self = '';
    var father = '';
    var result = false;

    // Se recorren todos los inputs del formulario
    $(':input', this).each(function(k,v) {

        if($(v).attr('type') != 'button'){
            // Se obtiene el objeto input
            self = $(v);
            // Se obtiene el elemento padre
            father = $(v).parents('.form-group');
            // Se obtiene el name
            var name = $(v).attr('name');
            // Se obtiene el value
            var value = $(v).val();
            // Se obtiene el type
            var type = $(v).attr('type');
            // Se obtiene el type smk
            var smkType = $(v).attr('smk-type');
            // Se obtiene el tag
            var tag = v.tagName.toLowerCase();
            // Se obtiene el requerido
            var required = $(v).attr('required');
            // Se obtiene el mensaje de error
            //var smkText = $(v).attr('smk-text');
            // Se obtiene el nivel de la fuerza de la contraseña 1, 2, 3
            var smkStrongPass = $(v).attr('smk-strongPass');
            // Se obtiene el valor de longitud menor aceptada
            var minlength = $(v).attr('minlength');
            // Se obtiene el valor de longitud mayor aceptada
            var maxlength = $(v).attr('maxlength');
            // Se obtiene el valor de longitud menor aceptada
            var smkMin = $(v).attr('smk-min');
            // Se obtiene el valor de longitud mayor aceptada
            var smkMax = $(v).attr('smk-max');

            // Se remueve el mensaje de error
            $.smkRemoveError(self);

            // Se validan los INPUTS que son requeridos
            if (required === 'required' && (type === 'text' || tag === 'textarea' || type === 'password' || type === 'email')) {
                // Se valida que el value del input no este vació
                if (value === '') {
                    // Se agrega el mensaje de error
                    result =  $.smkAddError(self, languaje[settings.lang].textEmpty);
                    return false;
                } else {
                    result = true;
                }
            }

            // Se valida el input EMAIL
            if (required === 'required' && type === 'email') {
                //Se crea la expresión regular para el input mail
                var emailRegex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
                // Se valida que el value del input cumpla con la expresión regular
                if (!emailRegex.test(value)) {
                    // Se agrega el mensaje de error
                    result =  $.smkAddError(self, languaje[settings.lang].textEmail);
                    return false;
                } else {
                    result = true;
                }
            }

            // Se valida el input PASSWORD
            if (required === 'required' && type === 'password') {
                var strongPassRegex = '';
                var textPass = '';
                // Se obtiene el nivel de fuerza de la contraseña
                switch (smkStrongPass) {
                    case ('weak'):// Debe contener al menos 4 caracteres
                        strongPassRegex = /^(?=.*[a-z0-9])\w{6,}$/;
                        textPass = languaje[settings.lang].textSPassWeak;
                    break;
                    case ('medium'):// Debe contener al menos 6 caracteres y un numero
                        strongPassRegex = /^(?=.*\d)(?=.*[a-z])\w{6,}$/;
                        textPass = languaje[settings.lang].textSPassMedium;
                    break;
                    case ('strong'):// Debe contener al menos 6 caracteres, un numero y una mayúscula
                        strongPassRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
                        textPass = languaje[settings.lang].textSPassStrong;
                    break;
                    default:// Debe contener al menos 4 caracteres
                        strongPassRegex = /^(?=.*[a-z0-9])\w{4,}$/;
                        textPass = languaje[settings.lang].textSPassDefault;
                }
                // Se valida que el value del input cumpla con la expresión regular
                if (!strongPassRegex.test(value)) {
                    // Se agrega el mensaje de error
                    result = $.smkAddError(self, textPass);
                    return false;
                } else {
                    result = true;
                }
            }

            // Se valida el input SELECT
            if (required === 'required' && tag === 'select') {
                // Se valida que el value del select no este vació
                if (value === '') {
                    // Se agrega el mensaje de error
                    result = $.smkAddError(self, languaje[settings.lang].textSelect);
                    return false;
                } else {
                    result = true;
                }
            }

            // Se validan los input RADIO y/o CHECKBOX
            if (required === 'required' && (type === 'radio' || type === 'checkbox')) {
                var check = $("input[name=" + name + "]:checked").val();
                //var check = self.is(':checked');
                // Se valida que el value del input este ckecked
                if (check === undefined) {
                //if (check === false) {
                    // Se agrega el mensaje de error
                    result = $.smkAddError(self, languaje[settings.lang].textCheckbox);
                    return false;
                } else {
                    result = true;
                }
            }

            // Se valida el input ALPHANUMERIC
            if (smkType === 'alphanumeric') {
                // Se crea la expresión regular para el input alphanumeric
                var alphanumericRegex = /^[a-z0-9]+$/i;
                // Se valida que el value del input cumpla con la expresión regular
                if (!alphanumericRegex.test(value)) {
                    // Se agrega el mensaje de error
                    result = $.smkAddError(self, languaje[settings.lang].textAlphanumeric);
                    return false;
                } else {
                    result = true;
                }
            }

            // Se valida el input NUMBER
            if (smkType === 'number') {
                // Se crea la expresión regular para el input number
                var numberRegex = /^\d+$/;
                // Se valida que el value del input cumpla con la expresión regular
                if (!numberRegex.test(value)) {
                    // Se agrega el mensaje de error
                    result = $.smkAddError(self, languaje[settings.lang].textNumber);
                    return false;
                } else {
                    result = true;
                }
            }

            // Se valida el input DECIMAL
            if (smkType === 'decimal') {
                // Se crea la expresión regular para el input decimal
                var decimalRegex = /^\d+(?:\.\d{1,4})?$/;
                // Se valida que el value del input cumpla con la expresión regular
                if (!decimalRegex.test(value)) {
                    // Se agrega el mensaje de error
                    result = $.smkAddError(self, languaje[settings.lang].textDecimal);
                    return false;
                } else {
                    result = true;
                }
            }

            // Se valida el input CURRENCY
            if (smkType === 'currency') {
                // Se crea la expresión regular para el input currency con $ al inicio
                //var currencyRegex = /^\$?(?:\d+|\d{1,3}(?:,\d{3})*)(?:\.\d{1,2}){0,1}$/;
                // Se crea la expresión regular para el input currency
                var currencyRegex = /^(?:\d+|\d{1,3}(?:,\d{3})*)(?:\.\d{1,4}){0,1}$/;
                // Se valida que el value del input cumpla con la expresión regular
                if (!currencyRegex.test(value)) {
                    // Se agrega el mensaje de error
                    result = $.smkAddError(self, languaje[settings.lang].textCurrency);
                    return false;
                } else {
                    result = true;
                }
            }

            // Se valida el input longitud o rango de caracteres MINLENGTH o MAXLENGTH
            if ((typeof(minlength) !== 'undefined' || typeof(maxlength) !== 'undefined')) {
                // Si contiene ambos y son iguales
                if (minlength === maxlength) {
                    if ((value.length != minlength) && (value.length != maxlength)) {
                        // Se personaliza el mensaje de error
                        var textLength = $.smokeCustomizeText(languaje[settings.lang].textLength, maxlength);
                        // Se agrega el mensaje de error
                        result = $.smkAddError(self, textLength);
                        return false;
                    } else {
                        result = true;
                    }
                // Si contiene ambos y son diferentes
                } else if (minlength !== maxlength) {
                    if ((value.length < minlength) || (value.length > maxlength)) {
                        var arrayTextRange = [];
                        arrayTextRange[0] = parseInt(minlength-1);
                        arrayTextRange[1] = parseInt(maxlength)+1;
                        // Se personaliza el mensaje de error
                        var textRange = $.smokeCustomizeText(languaje[settings.lang].textRange, arrayTextRange);
                        // Se agrega el mensaje de error
                        result = $.smkAddError(self, textRange);
                        return false;
                    } else {
                        result = true;
                    }
                }
            }
            // Se valida el input numero rango
            if ((typeof(smkMin) !== 'undefined' || typeof(smkMax) !== 'undefined')) {
                if((value < smkMin) || (value > smkMax)){
                    var arrayTextNumberRange = [];
                    arrayTextNumberRange[0] = parseInt(smkMin-1);
                    arrayTextNumberRange[1] = parseInt(smkMax)+1;
                    var textNumberRange = $.smokeCustomizeText(languaje[settings.lang].textNumberRange, arrayTextNumberRange);
                    // Se agrega el mensaje de error
                    result = $.smkAddError(self, textNumberRange);
                    return false;
                } else {
                    result = true;
                }
            }
            /*
            |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            |   FALTAN INPUTS POR VALIDAR
            |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            */
        }
    });

    // Si se teclea algo en el input se remueven los mensajes de error
    $(self).keyup(function() {
        // Se valida que el value del input no este vació
        if (self.val() !== '') {
            // Se remueve el mensaje de error
            $.smkRemoveError(self);
        }
    });
    // Si cambia el input select se remueven los mensajes de error
    $(self).change(function() {
        // Se valida que el value del input no este vació
        if (self.val() !== '') {
            // Se remueve el mensaje de error
            $.smkRemoveError(self);
        }
    });
    //Se retorna el resultado
    return result;
};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Usage
|   if($('#form').smkValidate({lang:'es'})){}
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/






/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Validate Equal passwords
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.smkEqualPass = function(password, repassword, lang) {

    // Se crea el mensaje de error para el input repassword
    var languaje = {
        en: {
            textEqualPass: 'Passwords do not match'
        }
    };

    // Si esta lang es undefined
    if(lang === undefined){
        lang = 'en';
    }
    // Si lang es diferente de en
    if(lang != 'en'){
        languaje = $.smkEqualPass.Languaje;
    }

    if($(password).val() !== undefined){
        password = $(password).val();
    }else{
        password = password;
    }

    // Si los password son diferentes se retorna false
    if (password !== $(repassword).val()) {
        // Se agrega el mensaje de error
        return $.smkAddError($(repassword), languaje[lang].textEqualPass);
    // Si los passwords son iguales se retorna true
    } else {
        return true;
    }

    // Si se teclea algo en el input se remueven los mensajes de error
    $(repassword).keyup(function() {
        if ($(this).val() !== '') {
            // Se remueve el mensaje de error
            $.smkRemoveError( $(repassword) );
        }
    });
};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Usage
|   if($.smkEqualPass('#password', '#repassword', 'es')){}
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/






/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Clear form
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.fn.smkClear = function(options) {
    // Variables default
    var settings = $.extend({
        noClear: ''
    }, options);
    // Se eliminan los espacios en blanco de la variable settings.noClear
    var noClearSinEspacios = settings.noClear.replace(/\s/g, '');
    // Se quiebra la variable noClearSinEspacios para obtener sus valores y se agregan en el array noClear
    var noClear = noClearSinEspacios.split(',');
    // Se recorren todos los inputs del form
    return $(':input', this).each(function() {
        //Se obtiene el type y el tag del input
        var type = this.type;
        var tag = this.tagName.toLowerCase();
        //Si el tag trae el valor 'input' se sustituye por el valor type
        if (tag == 'input') {
            tag = type;
        }
        //Si el type o el tag del input no existen en el array noClean se limpia
        if ($.inArray(type, noClear) < 0 && $.inArray(tag, noClear) < 0) {
            //Se compara el type y se limpia
            switch (type) {
            case 'text':
            case 'password':
            case 'email':
            case 'number':
            case 'hidden':
                this.value = '';
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
                break;
            }
            //Se compara el tag y se limpia
            switch (tag) {
            case 'textarea':
                this.value = '';
                break;
            case 'select':
                this.selectedIndex = -1;
                if($(this).hasClass('select2')){
                    $(this).select2('val', '');
                }
                break;
            }
            /*
            |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            |   FALTAN INPUTS POR LIMPIAR
            |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            */      }
    });
    //$(this)[0].reset();
};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Usage
|   $('#form').smkClear({noClear: 'email,radio,...'});
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/






/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Se crea el método que agrega el mensaje de error
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.smkAddError = function (obj, text)
{
    // Se obtiene el elemento form-group
    var formGroup = $(obj).parents('.form-group');
    // Se obtiene el elemento padre
    var parent = $(obj).parent();
    // Se obtiene el type
    var type = $(obj).attr('type');
    // Se obtiene el tag
    var tag = $(obj).prop('tagName').toLowerCase();
    // Se obtiene el mensaje de error
    var smkText = $(obj).attr('smk-text');

    // Si el input no contiene mensaje de error se asigna uno
    if (smkText === '' || smkText === undefined) {
        smkText = text;
    }

    // Si type es indefinido se asigna el nombre del tag
    if(type === undefined){
        type = tag;
    }

    // Se crea el template del mensaje de error
    var icon = '<span class="glyphicon glyphicon-remove-sign form-control-feedback smk-error-icon"></span>';
    var msj = '<span class="smk-error-text">' + smkText + '</span>';

    if(type == 'select'){
        // Se agrega la clase de error
        formGroup.addClass('has-feedback has-error smk-' + type);
        // Se agrega el icono y el mensaje de error
        parent.append(icon + msj);
    }else if(type == 'checkbox' || type == 'radio'){
        // Se agrega la clase de error
        formGroup.addClass('has-feedback has-error smk-' + type);
        // Se agrega el icono y el mensaje de error
        parent.parent().parent().append(msj);
    }else{
        // Se agrega la clase de error
        formGroup.addClass('has-feedback has-error');
        // Se agrega el icono y el mensaje de error
        parent.append(icon + msj);

    }
    // Se posiciona el focus en el input
    obj.focus();
    // Se retorna false
    return false;
};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Se crea el método que remueve el mensaje de error
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.smkRemoveError = function(obj)
{
    // Se obtiene el elemento padre
    var parent = $(obj).parents('.form-group');
    // Se remueven el icono y el mensaje de error
    parent.find('.smk-error-text, .smk-error-icon').remove();
    // Se remueve la clase de error
    parent.removeClass('has-error has-feedback');
    // Se retorna false
    return false;
};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Se crea el método que personaliza los mensaje de error
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.smokeCustomizeText = function(text, arrayText){
    var customText = '';
    if(typeof(arrayText) == 'string'){
        customText = text.replace('{@}', arrayText);
    }else{
        var split = text.split('{@}');
        $.each(arrayText, function(index, val) {
            customText += split[index] + val;
        });
        customText += split[split.length - 1];
    }
    return customText;
};






/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Alerts
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
var smkAlertInizialize = 0;
// Se crea la funcion smkAlert
$.smkAlert = function(options) {

    // Variables default
    var settings = $.extend({
        text: 'Hola Mundo',
        type: 'warning',
        icon: 'glyphicon-exclamation-sign',
        time: 5,
        permanent: false
    }, options);

    smkAlertInizialize++;

    // Se compara el tipo de alerta y se asigna la clase
    switch (settings.type) {
    case 'warning':
        settings.type = 'alert-warning';
        settings.icon = 'glyphicon-exclamation-sign';
        break;
    case 'success':
        settings.type = 'alert-success';
        settings.icon = 'glyphicon-ok-sign';
        break;
    case 'danger':
        settings.type = 'alert-danger';
        settings.icon = 'glyphicon-remove-sign';
        break;
    case 'info':
        settings.type = 'alert-info';
        settings.icon = 'glyphicon-info-sign';
        break;
    }

    // Se agrega el contenedor de las alertas en el body
    if(smkAlertInizialize == 1){
        $('body').append('<div class="smk-alert-content"></div>');
    }
    // Se crea la alerta en el contenedor
    var obj = $('<div class="alert alert-dismissable ' + settings.type + ' smk-alert"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span class="glyphicon ' + settings.icon + '"></span><p>' + settings.text + '</p></div>');

    $('.smk-alert-content').prepend(obj);

    // Se aplica la animación de entrada a la alerta
    obj.animate({
        opacity: '1',
        marginTop:'20px',

    }, 300);

    // Si el mensaje no es permanente
    if(settings.permanent === false){
        var timer = 0;
        // Si se posiciona el cursor en la alerta se restablece el TimeOut
        $(obj).mouseenter(function(){
            clearTimeout(timer);
        // Si sale el cursor de la alerta se ejecuta el método smkAlertHide
        }).mouseleave(function(){
            smkAlertHide();
        });

        smkAlertHide();
    }

    // Se crea el método que elimina la alerta del contenedor
    function smkAlertHide(){
        timer = setTimeout(function() {
            obj.animate({
                opacity: '0',
                marginLeft: '100px',
                marginRight: '-100px'
            }, 300, function() {
                obj.remove();
            });
        }, (settings.time * 1000) );
    }

};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Usage
|   $.smkAlert({ text: 'Hello world', type: 'success', time: 5 });
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/






/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Confirmation
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.smkConfirm = function(options, callback) {
    // Variables default
    var settings = $.extend({
        text: '¿Estas seguro?',
        accept: 'Aceptar',
        cancel: 'Cancelar'
    }, options);
    // Se agrega el panel de confirmacion en el body
    $('body').append('<div class="smk-confirm-back"><div class="panel panel-default smk-confirm"><div class="panel-body"><br>' + settings.text + '<br><br></div><div class="panel-footer text-right"><a class="btn btn-default btn-sm smk-cancel" href="#" >' + settings.cancel + '</a> <a class="btn btn-primary btn-sm smk-accept" href="#">' + settings.accept + '</a></div></div></div>');
    // Se aplica la animacion de entrada del panel de confirmacion
    $('.smk-confirm').animate({
        top: "-5px",
        opacity: '1'
    }, 400);
    // Si se presiona el boton .smk-cancel se retorna false
    $('.smk-cancel').click(function(e) {
        e.preventDefault();
        smkConfirmHide();
        //return false;
        callback(false);
    });
    // Si se presiona el boton .smk-accept se retorna true
    $('.smk-accept').click(function(e) {
        e.preventDefault();
        smkConfirmHide();
        //return true;
        callback(true);
    });
    // Se remueve el panel de confirmacion del body
    function smkConfirmHide(){
        $('.smk-confirm-back').fadeOut(200, function() {
            $('.smk-confirm-back').remove();
        });
        $('.smk-confirm').animate({
            top: "-500px",
            opacity: '0'
        }, 400, function() {
            $('.smk-confirm').remove();
        });
    }
};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Usage
|   $.smkConfirm({text: 'are you sure?', accept: 'Accept', cancel: 'Cancel'}, function(e){if(e){
|     // Code here
|   }});
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/






/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Float
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.smkFloat = function(number) {
    if(typeof number === 'string'){
        number = number.replace(',', '');
    }
    return parseFloat(number);
};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Usage
|   var float = $.smkFloat('1,0000.00');
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/





/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Currency
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.smkCurrency = function(number, prefix) {
    var num = number.replace(',', '');
    if(num !== ''&& !isNaN(num)){
        num = Math.round(parseFloat(num) * Math.pow(10, 2)) / Math.pow(10, 2);
        prefix = prefix || '';
        num += '';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? '.' + splitStr[1] : '.00';
        splitRight = splitRight + '00';
        splitRight = splitRight.substr(0, 3);
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2');
        }
        return prefix + splitLeft + splitRight;
    }else{
        return 0;
    }
};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Usage
|   var currency = $.smkCurrency(10000, '$');
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/






/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   GetURL
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.smkGetURL = function(folder) {
    //Se obtiene el protocolo http o https
    var protocol = $(location).attr('protocol');
    //Se obtiene el nombre del servidor o dominio
    var hostname = $(location).attr('hostname');
    //Se obtiene la o las subcarpetas
    var pathname = $(location).attr('pathname');
    //Se explota el pathname para obtener todos sus elementos separados por /
    pathname = pathname.split('/');
    //Se obtiene el ultimo elemento
    var last = pathname.pop();
    //Si el ultimo elemento no esta vacio
    if (last !== '') {
        //Se explota el ultimo elemento
        file = last.split('.');
        //Si el ultimo elemento no es un archivo
        if (file.length < 2) {
            //Se agrega el ultimo elemento
            pathname.push(last);
        }
    }
    //Se dejan unicamente el numero de folders que se obtienen de la variable folders
    pathname = pathname.slice(0, folder + 1);
    //Se unen los elementos de el pathname separados por /
    pathname = pathname.join('/');
    //Se unen los elementos que forman la url
    var url = protocol + '//' + hostname + pathname;
    //Se retorna la url
    return url;
};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Usage
|   var url = $.smkGetURL(1);
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/





/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   DatePicker
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.smkDatePicker = function(date) {

    if(date !== ''){
        // Se obtiene el dia
        var day   = (date.getDate() < 10 ? '0' : '') + date.getDate();
        // Se obtiene el mes
        var month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        // Se obtiene el año
        var year = date.getFullYear();
        // Se construye la fecha con el formato para BD yyyy-mm-dd
        result = year + '-' + month + '-' + day;
    }else{
        result = '';
    }

    // Se retorna la fecha formateada
    return result;
};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Usage
|   var date = $.smkDatePicker( $('.datepicker').datepicker('getDate') );
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/






/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Date
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.smkDate = function(options) {
    var today = $.smkDatePicker( new Date() );
    var settings = $.extend({
        date: today,
        format: 'yyyy-mm-dd',
        lang: 'en',
    }, $.smkDate.Languaje, options);

    var languaje =  {
        en: {
            shortMonthNames : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            monthNames : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
    };
    //Se obtienen los separadores
    var validDate = /\d+|[a-zA-z]/g;
    var separator = settings.date.replace(validDate, '\0').split('\0');
    // Se obtiene las partes de la fecha
    var splitDate = settings.date.match(validDate);

    if(settings.lang == 'es'){
        languaje = $.smkDate.Languaje;
        // Se formatea la fecha (yyyy,mm,dd) para poder instanciar el método new Date()
        if(splitDate[0].length == 4){
            // Formato yyyy-mm-dd => yyyy,mm,dd
            settings.date = new Date(splitDate[0],(splitDate[1]-1),splitDate[2]);
        }else{
            // Formato dd-mm-yyyy => yyyy,mm,dd
            settings.date = new Date(splitDate[2],(splitDate[1]-1),splitDate[0]);
        }
    }else{
        // Se formatea la fecha (yyyy,mm,dd) para poder instanciar el método new Date()
        if(splitDate[0].length == 4){
            // Formato yyyy-dd-mm => yyyy,mm,dd
            settings.date = new Date(splitDate[0],(splitDate[2]-1),splitDate[1]);
        }else{
            // Formato mm-dd-yyyy => yyyy,mm,dd
            settings.date = new Date(splitDate[2],(splitDate[0]-1),splitDate[1]);
        }
    }

    var result = '';

    if(settings.date != 'Invalid Date'){

        // Se crea el array que contiene el día, mes y año
        var arrayDate = {
            // Se obtiene el dia
            'd'    : settings.date.getDate(),
            'dd'   : (settings.date.getDate() < 10 ? '0' : '') + settings.date.getDate(),
            // Se obtiene el mes
            'm'    : settings.date.getMonth() + 1, //January is 0!
            'mm'   : ((settings.date.getMonth() + 1) < 10 ? '0' : '') + (settings.date.getMonth() + 1),
            'M'    : languaje[settings.lang].shortMonthNames[settings.date.getMonth()],
            'MM'   : languaje[settings.lang].monthNames[settings.date.getMonth()],
            // Se obtiene el año
            'yyyy' : settings.date.getFullYear(),
            // Se obtiene el año 2 digitos
            'yy'   : settings.date.getFullYear().toString().substring(2),
            // Se obtiene la hora
            'hh'   : settings.date.getHours(),
            // Se obtienen los minutos
            'mi'   : settings.date.getMinutes(),
            // Se obtienen los segundos
            'ss'   : settings.date.getSeconds()
        };

        // Se obtienen los separadores
        var validFormat = /dd?|DD?|mm?|MM?|yy(?:yy)?/g;
        var separators = settings.format.replace(validFormat, '\0').split('\0');
        // Se obtienen las partes del formato
        var splitFormat = settings.format.match(validFormat);

        // Se construye la fecha con el formato y los separadores indicados
        $.each(splitFormat, function(key, val) {
            result += separators[key] + arrayDate[val];
        });

    }else{
        result = '';
        console.log('Invalid Date');
    }

    // Se retorna la fecha formateada
    return result;
};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Usage
|   var date = $.smkDate({date:new Date(), format:'yyyy-mm-dd', lang: 'es' });
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/






/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   DateDiff
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.smkDateDiff = function(options) {
    //Variables default
    var settings = $.extend({
        fromDate: new Date(),
        toDate: new Date(),
        interval: 'days'
    }, options);
    var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;
    var fromDate = new Date(settings.fromDate);
    var toDate = new Date(settings.toDate);
    var timediff = toDate - fromDate;
    if (isNaN(timediff)) return NaN;
    switch (settings.interval) {
        case "years":
            return toDate.getFullYear() - fromDate.getFullYear();
        case "months":
            return ((toDate.getFullYear() * 12 + toDate.getMonth()) - (fromDate.getFullYear() * 12 + fromDate.getMonth()));
        case "weeks":
            return Math.floor(timediff / week);
        case "days":
            return Math.floor(timediff / day);
        case "hours":
            return Math.floor(timediff / hour);
        case "minutes":
            return Math.floor(timediff / minute);
        case "seconds":
            return Math.floor(timediff / second);
        default:
            return undefined;
    }
};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Usage
|   var dif = $.smkDateDiff({fromDate:'01/01/2013 12:00:00', toDate:'12/31/2014 12:30:00', interval:'days'});
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/






/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Scrolling
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.smkScrolling = function(options) {
    //Variables default
    var settings = $.extend({
        speed: 1000
    }, options);
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, settings.speed);
                return false;
            }
        }
    });
};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Usage
|   $.smkScrolling({speed:1000});
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/





/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   ProgressBar
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.smkProgressBar = function(options) {
    //Variables default
    var settings = $.extend({
        element: 'body',
        status: 'start'
    }, options);

    // Se crea el template de la progressbar
    var progressbar = '<div class="smk-progressbar">';
        progressbar +='<div class="progress">';
        progressbar +='<div class="progress-bar" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">';
        progressbar +='<span class="sr-only">0% Complete</span>';
        progressbar +='</div></div></div>';

    // Se carga la progressbar al dom
    $(settings.element).prepend($(progressbar).fadeIn('fast'));

    if(settings.element == 'body'){
        $('.smk-progressbar').css('position', 'fixed');
    }else{
        $(settings.element).css('position', 'relative');
        $('.smk-progressbar').css('position', 'absolute');
    }

    if(settings.status == 'start'){
        // Se comienza a simular el progreso de la carga de la pagina
        $(settings.element +' .smk-progressbar .progress .progress-bar').width((50 + Math.random() * 30) + '%');
    }else if(settings.status ==  'end'){
        // Se completa el progreso de carga
        $(settings.element +' .smk-progressbar .progress .progress-bar').width('110%').delay(200, function(){
           // Se remueve la progressbar del dom
           $(settings.element +' .smk-progressbar').fadeOut('slow', function() { $(this).remove(); });
        });
    }

};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Usage
|   $.smkProgressBar({element:'body', status:'start'});
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/






/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Fullscreen
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.fn.smkFullscreen = function() {

    // Se crea el boton fullscreen
    var btnFullscreen = '<a class="btn smk-fullscreen" href="#" data-toggle="tooltip" data-placement="bottom" title="Fullscreen"><span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span></a>';

    // Se agrega el boton fullscreen en el elemento
    $(this).append(btnFullscreen);

    // Evento del boton fullscreen
    $('.smk-fullscreen').click(function(event) {
        event.preventDefault();
        toggleFullScreen();
    });

    // Se crea el metodo que dispara el fullscreen
    function toggleFullScreen() {
      if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    }

    // Se crea el metodo que cambia el icono del boton
    var changeFullscreen = function(){
        $('.smk-fullscreen').children('.glyphicon').toggleClass('glyphicon-fullscreen').toggleClass('glyphicon-resize-small');
    };

    // Se escuchan los cambios del fullscreen
    document.addEventListener("fullscreenchange", changeFullscreen, false);
    document.addEventListener("msfullscreenchange", changeFullscreen, false);
    document.addEventListener("mozfullscreenchange", changeFullscreen, false);
    document.addEventListener("webkitfullscreenchange", changeFullscreen, false);
};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Usage
|   $('div').smkFullscreen();
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/




/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Panel
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
$.fn.smkPanel = function(options) {
    // Variables default
    var settings = $.extend({
        hide: ''
    }, options);
    var thisPanel = $(this);
    // Se eliminan los espacios en blanco de la variable settings.hide
    var hideSinEspacios = settings.hide.replace(/\s/g, '');
    // Se quiebra la variable hideSinEspacios para obtener sus valores y se agregan en el array arrayHide
    var arrayHide = hideSinEspacios.split(',');
    // Se obtiene el .panel-title de cada panel
    var panelHeading = $(this).children('.panel-heading').children('.panel-title');
    var smkBtnGroupPanel = '';
    if(panelHeading.length > 0){
        smkBtnGroupPanel = 'smk-btn-group-panel-title';
    }else{
        smkBtnGroupPanel = 'smk-btn-group-panel';
    }

    // Se crea el btn-group
    var btnGroup = '<div class="btn-group btn-group-sm pull-right ' + smkBtnGroupPanel + '" role="group">';
    // Se valida que no exista en el array el boton min para poder agregarlo dentro de btnGroup
    if($.inArray('min', arrayHide) == -1){
        btnGroup += '<a class="btn smk-min" href="#"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></a>';
    }
    // Se valida que no exista en el array el boton remove para poder agregarlo dentro de btnGroup
    if($.inArray('remove', arrayHide) == -1){
        btnGroup += '<a class="btn smk-remove" href="#"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>';
    }
    // Se valida que no exista en el array el boton full para poder agregarlo dentro de btnGroup
    if($.inArray('full', arrayHide) == -1){
        btnGroup += '<a class="btn smk-full" href="#"><span class="glyphicon glyphicon-resize-full" aria-hidden="true"></span></a>';
    }
    btnGroup += '</div>';

    // Se inserta dentro de .panel-heading
    $(this).children('.panel-heading').append( btnGroup );

    // Evento del boton Min
    thisPanel.find('.smk-min').click(function(event) {
        event.preventDefault();
        var body = $(this).parents('.panel-heading').siblings('.panel-body');
        var footer = $(this).parents('.panel-heading').siblings('.panel-footer');
        var icon = $(this).children('.glyphicon');
        $(footer).slideToggle('fast');
        $(body).slideToggle('fast', function(){
            icon.toggleClass('glyphicon-minus').toggleClass('glyphicon-plus');
        });

    });
    // Evento del boton Remove
    thisPanel.find('.smk-remove').click(function(event) {
        event.preventDefault();
        var panel = $(this).parents('.panel');
        panel.fadeOut(400, function(){
            //this.remove();
        });
    });
    // Evento del boton Full
    thisPanel.find('.smk-full').click(function(event) {
        event.preventDefault();
        var panel = $(this).parents('.panel');
        var body = $(this).parents('.panel-heading').siblings('.panel-body');
        var icon = $(this).children('.glyphicon');
        var iconPlus = $(this).siblings('.btn').children('.glyphicon-plus');

        if(panel.hasClass('panel-full')){
            panel.removeClass('panel-full');
            $(this).siblings('.btn').show();
            if(iconPlus.length == 1){
                body.hide();
            }
            $('body').css({'overflow':'auto'});
            // $('.container-fluid').css({'display':'block'});
            // $('#content').css({'position':'fixed'});
        }else{
            panel.addClass('panel-full');
            $(this).siblings('.btn').hide();
            if(iconPlus.length == 1){
                body.show();
            }
            $('body').css({'overflow':'hidden'});
            // $('.container-fluid').css({'display':'initial'});
            // $('#content').css({'position':'initial'});
        }
        icon.toggleClass('glyphicon-resize-full').toggleClass('glyphicon-resize-small');
    });
};
/*
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   Usage
|   $('.panel').smkPanel({hide: 'min,remove,full', class: 'name-class'});
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/


})(jQuery);
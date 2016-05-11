/**
* Smoke form validation and components for Bootstrap
* @package Smoke
* @version 3.0
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
  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * Validate all inputs
  * if($('#form').smkValidate()){}
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  $.fn.smkValidate = function() {

    var settings = $.extend({}, $.fn.smkValidate.Languaje);

    var languaje = $.fn.smkValidate.Languaje;

    if (languaje === undefined) {

      languaje =  {
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
        textSPassStrong  : 'Minimum 6 characters a number and a capital',
        textUrl          : 'Please enter a valid url',
        textTel          : 'Please enter a valid phone number',
        textColor        : 'Please enter a valid hex color',
        textDate         : 'Please enter a valid date',
        textDatetime     : 'Please enter a valid date and time',
        textMonth        : 'Please enter a valid month',
        textWeek         : 'Please enter a valid week',
        textTime         : 'Please enter a valid time',
        textPattern      : 'Enter a valid string'
      };
    }

    // Se agrega el attr novalidate al form
    if (this.is('form')) {
      this.attr('novalidate', 'novalidate');
    }

    // Se inicializan las variables globales
    var result = true;

    // Se obtienen todos los inputs
    var inputs = (this.is(':input')) ? $(this) : $(':input:not(:button):not(:disabled):not(.novalidate)', this);

    // Se recorren todos los inputs del formulario
    inputs.each(function(k,v) {
      // Se obtiene el objeto input
      var input = $(v);
      // Se obtiene el type
      var type = $(v).attr('type');
      // Se obtiene el type smk
      var smkType = $(v).attr('data-smk-type');
      // Se obtiene el tag
      var tag = v.tagName.toLowerCase();
      // Se obtiene el value
      var value = $(v).val();
      // Se obtiene el name
      var name = $(v).attr('name');
      // Se obtiene el attr requerido
      var required = $(v).attr('required');
      // Se obtiene el valor de longitud menor aceptada
      var minlength = $(v).attr('minlength');
      // Se obtiene el valor de longitud mayor aceptada
      var maxlength = $(v).attr('maxlength');
      // Se obtiene el valor de longitud menor aceptada
      var smkMin = $(v).attr('data-smk-min');
      // Se obtiene el valor de longitud mayor aceptada
      var smkMax = $(v).attr('data-smk-max');
      // Se obtiene el nivel de la fuerza de la contraseña
      var smkStrongPass = $(v).attr('data-smk-strongPass');
      // Se obtiene el pattern de una expresión regular
      var smkPattern = $(v).attr('data-smk-pattern');
      // Se obtiene el valor pestaña centavos
      var smkDecimalSeparator = $(v).attr('data-smk-decimal-separator');
      // Se obtiene el valor pestaña miles
      var smkThousandSeparator = $(v).attr('data-smk-thousand-separator');

      //Obtiene las fichas de los valores por defecto de miles y centavos
      if (typeof(smkDecimalSeparator) === 'undefined'){
        //Valor por defecto
        smkDecimalSeparator = '.'; //Default
      }
      if (typeof(smkThousandSeparator) === 'undefined'){
        //Valor por defecto
        smkThousandSeparator = ','; //Default
      }

      // Se eliminan los mensajes de error
      $.smkRemoveError(input);

      // Se obtiene el value de los input RADIO y/o CHECKBOX
      if (type === 'radio' || type === 'checkbox') {
        // Se obtiene el value del grupo de checks o radios
        //value = $("input[name=" + name + "]:checked").val();
        value = $("input[name='" + name + "']:checked").val();
      }

      // Se validan los INPUTS que son requeridos y estan vacios
      if (required === 'required' && (value === '' || value === undefined)) {
        // Se agrega el mensaje de error
        result =  $.smkAddError(input, languaje.textEmpty);
      }

      // Si el input no esta vacio
      if (value !== '') {

        // Se valida el input EMAIL
        if (type === 'email') {
          //Se crea la expresión regular para el input mail
          var emailRegex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
          // Se valida que el value del input cumpla con la expresión regular
          if (!emailRegex.test(value)) {
            // Se agrega el mensaje de error
            result =  $.smkAddError(input, languaje.textEmail);
          }
        }

        // Se valida el input ALPHANUMERIC
        if (smkType === 'alphanumeric') {
          // Se crea la expresión regular para el input alphanumeric
          var alphanumericRegex = /^[a-z0-9]+$/i;
          // Se valida que el value del input cumpla con la expresión regular
          if (!alphanumericRegex.test(value)) {
            // Se agrega el mensaje de error
            result = $.smkAddError(input, languaje.textAlphanumeric);
          }
        }

        // Se valida el input NUMBER
        if (type === 'number' || smkType === 'number') {
          // Se crea la expresión regular para el input number
          var numberRegex = /^\d+$/;
          // Se valida que el value del input cumpla con la expresión regular
          if (!numberRegex.test(value)) {
            // Se agrega el mensaje de error
            result = $.smkAddError(input, languaje.textNumber);
          } else {

            // Se valida el input NUMBER RANGE
            if ((typeof(smkMin) !== 'undefined' || typeof(smkMax) !== 'undefined')) {
              if((value < smkMin) || (value > smkMax)){
                var arrayTextNumberRange = [];
                arrayTextNumberRange[0] = parseInt(smkMin-1);
                arrayTextNumberRange[1] = parseInt(smkMax)+1;
                var textNumberRange = $.smokeCustomizeMsg(languaje.textNumberRange, arrayTextNumberRange);
                // Se agrega el mensaje de error
                result = $.smkAddError(input, textNumberRange);
              }
            }

          }
        }

        // Se valida el input DECIMAL
        if (smkType === 'decimal') {
          // Se crea la expresión regular para el input decimal
          //var decimalRegex = /^\d+(?:\.\d{1,4})?$/;
          var decimalRegex = (smkDecimalSeparator === ',') ? (/^\d+(?:\,\d{1,4})?$/) :  (/^\d+(?:\.\d{1,4})?$/);
          // Se valida que el value del input cumpla con la expresión regular
          if (!decimalRegex.test(value)) {
            // Se agrega el mensaje de error
            result = $.smkAddError(input, languaje.textDecimal);
          }
        }

        // Se valida el input CURRENCY
        if (smkType === 'currency') {
          // Se crea la expresión regular para el input currency con $ al inicio
          //var currencyRegex = /^\$?(?:\d+|\d{1,3}(?:,\d{3})*)(?:\.\d{1,2}){0,1}$/;
          // Se crea la expresión regular para el input currency
          //var currencyRegex = /^(?:\d+|\d{1,3}(?:,\d{3})*)(?:\.\d{1,4}){0,1}$/;
          var currencyRegex = (smkDecimalSeparator === ',' && smkThousandSeparator === '.') ? (/^(?:\d+|\d{1,3}(?:.\d{3})*)(?:\,\d{1,4}){0,1}$/) : (/^(?:\d+|\d{1,3}(?:,\d{3})*)(?:\.\d{1,4}){0,1}$/) ;
          // Se valida que el value del input cumpla con la expresión regular
          if (!currencyRegex.test(value)) {
            // Se agrega el mensaje de error
            result = $.smkAddError(input, languaje.textCurrency);
          }
        }

        // Se valida el input longitud o rango de caracteres MINLENGTH o MAXLENGTH
        if ((typeof(minlength) !== 'undefined' || typeof(maxlength) !== 'undefined')) {
          // Si contiene ambos y son iguales
          if (minlength === maxlength) {
            if ((value.length != minlength) && (value.length != maxlength)) {
              // Se personaliza el mensaje de error
              var textLength = $.smokeCustomizeMsg(languaje.textLength, maxlength);
              // Se agrega el mensaje de error
              result = $.smkAddError(input, textLength);
            }
            // Si contiene ambos y son diferentes
          } else if (minlength !== maxlength) {
            if ((value.length < minlength) || (value.length > maxlength)) {
              var arrayTextRange = [];
              arrayTextRange[0] = parseInt(minlength-1);
              arrayTextRange[1] = parseInt(maxlength)+1;
              // Se personaliza el mensaje de error
              var textRange = $.smokeCustomizeMsg(languaje.textRange, arrayTextRange);
              // Se agrega el mensaje de error
              result = $.smkAddError(input, textRange);
            }
          }
        }

        // Se valida el input PASSWORD
        if (type === 'password') {
          var strongPassRegex = '';
          var textPass = '';
          // Se obtiene el nivel de fuerza de la contraseña
          switch (smkStrongPass) {
            case ('weak'):// Debe contener al menos 4 caracteres
            strongPassRegex = /^(?=.*[a-z0-9])\w{6,}$/;
            textPass = languaje.textSPassWeak;
            break;
            case ('medium'):// Debe contener al menos 6 caracteres y un numero
            strongPassRegex = /^(?=.*\d)(?=.*[a-z])\w{6,}$/;
            textPass = languaje.textSPassMedium;
            break;
            case ('strong'):// Debe contener al menos 6 caracteres, un numero y una mayúscula
            strongPassRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
            textPass = languaje.textSPassStrong;
            break;
            default:// Debe contener al menos 4 caracteres
            strongPassRegex = /^(?=.*[a-z0-9])\w{4,}$/;
            textPass = languaje.textSPassDefault;
          }
          // Se valida que el value del input cumpla con la expresión regular
          if (!strongPassRegex.test(value)) {
            // Se agrega el mensaje de error
            result = $.smkAddError(input, textPass);
          }
        }

        // Se valida el input URL
        if (type === 'url') {
          //Se crea la expresión regular para el input url
          var urlRegex = /^(http|ftp|https):\/\/[\w-]+(\.[\w-]+)*([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?$/;
          // Se valida que el value del input cumpla con la expresión regular
          if (!urlRegex.test(value)) {
            // Se agrega el mensaje de error
            result =  $.smkAddError(input, languaje.textUrl);
          }
        }

        // Se valida el input TEL
        if (type === 'tel') {
          //Se crea la expresión regular para el input tel
          var telRegex = /^(\+?)\d{10,15}$/;
          // Se valida que el value del input cumpla con la expresión regular
          if (!telRegex.test(value)) {
            // Se agrega el mensaje de error
            result =  $.smkAddError(input, languaje.textTel);
          }
        }

        // Se valida el input COLOR
        if (type === 'color') {
          //Se crea la expresión regular para el input color
          var colorRegex = /^#([0-9a-f]{3}){1,2}$/i;
          // Se valida que el value del input cumpla con la expresión regular
          if (!colorRegex.test(value)) {
            // Se agrega el mensaje de error
            result =  $.smkAddError(input, languaje.textColor);
          }
        }

        // Se valida el input DATE
        if (type === 'date') {
          //Se crea la expresión regular para el input date
          var dateRegex = /^([0-9]{4})-(1[0-2]|0[1-9])-(3[0-1]|0[1-9]|[1-2][0-9])$/;
          // Se valida que el value del input cumpla con la expresión regular
          if (!dateRegex.test(value)) {
            // Se agrega el mensaje de error
            result =  $.smkAddError(input, languaje.textDate);
          }
        }

        // Se valida el input DATETIME
        if (type === 'datetime') {
          //Se crea la expresión regular para el input datetime
          var datetimeRegex = /^([0-9]{4})-(1[0-2]|0[1-9])-(3[0-1]|0[1-9]|[1-2][0-9])T(2[0-3]|[0-1][0-9]):([0-5][0-9]):([0-5][0-9])(Z|[+-](?:2[0-3]|[0-1][0-9]):[0-5][0-9])?$/;
          // Se valida que el value del input cumpla con la expresión regular
          if (!datetimeRegex.test(value)) {
            // Se agrega el mensaje de error
            result =  $.smkAddError(input, languaje.textDatetime);
          }
        }

        // Se valida el input MONTH
        if (type === 'month') {
          //Se crea la expresión regular para el input month
          var monthRegex = /^([0-9]{4})-(1[0-2]|0[1-9])$/;
          // Se valida que el value del input cumpla con la expresión regular
          if (!monthRegex.test(value)) {
            // Se agrega el mensaje de error
            result =  $.smkAddError(input, languaje.textMonth);
          }
        }

        // Se valida el input WEEK
        if (type === 'week') {
          //Se crea la expresión regular para el input week
          var weekRegex = /^([0-9]{4})-?W(5[0-3]|[1-4][0-9]|0[1-9])$/;
          // Se valida que el value del input cumpla con la expresión regular
          if (!weekRegex.test(value)) {
            // Se agrega el mensaje de error
            result =  $.smkAddError(input, languaje.textWeek);
          }
        }

        // Se valida el input TIME
        if (type === 'time') {
          //Se crea la expresión regular para el input time
          var timeRegex = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])(:([0-5]?[0-9]))?$/;
          // Se valida que el value del input cumpla con la expresión regular
          if (!timeRegex.test(value)) {
            // Se agrega el mensaje de error
            result =  $.smkAddError(input, languaje.textTime);
          }
        }

        // Se valida el pattern de una expresión regular
        if (smkPattern !== '' && smkPattern !== undefined) {
          // Se valida que el value del input cumpla con la expresión regular
          var patternRegex = new RegExp('^(' + smkPattern + ')$');
          // Se valida que el value del input cumpla con la expresión regular
          if (!patternRegex.test(value)) {
            // Se agrega el mensaje de error
            result = $.smkAddError(input, languaje.textPattern);
          }
        }

      }

      input
      .off('.validation') // remove all events in namespace validation
      .on('keyup.validation change.validation click.validation', function(e) {
        // Check for validation
        $(this).smkValidate();
      });

    });

    // Se posiciona el focus en el primer input con error
    this.find('.form-group.has-feedback.has-error').first().find(':input:not(:button):not(:disabled):not(.novalidate)').first().focus();

    //Se retorna el resultado
    return result;
  };






  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * Validate Equal passwords
  * if($.smkEqualPass('#password', '#repassword')){}
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  $.smkEqualPass = function(password, repassword) {

    // Se crea el mensaje de error para el input repassword
    var languaje = $.smkEqualPass.Languaje;

    if (languaje === undefined) {
      languaje =  {
        textEqualPass: 'Passwords do not match'
      };
    }

    if($(password).val() !== undefined){
      password = $(password).val();
    }else{
      password = password;
    }

    // Si los password son diferentes se retorna false
    if (password !== $(repassword).val()) {
      // Se agrega el mensaje de error
      return $.smkAddError($(repassword), languaje.textEqualPass);
      // Si los passwords son iguales se retorna true
    } else {
      return true;
    }

  };






  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * Clear form
  * $('#form').smkClear();
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  $.fn.smkClear = function() {

    // Se obtienen todos los inputs
    var inputs = (this.is(':input')) ? $(this) : $(':input:not(:button)', this);

    // Se recorren todos los inputs del formulario
    inputs.each(function(k,v) {

      // Se eliminan los mensajes de error
      $.smkRemoveError(v);

      // Si el input no contiene el attr data-smk-noclear
      if ( $(v).attr('data-smk-noclear') === undefined ) {
        //Se obtiene el type y el tag del input
        var type = this.type;
        var tag = this.tagName.toLowerCase();
        //Si el tag trae el valor 'input' se sustituye por el valor type
        if (tag == 'input') {
          tag = type;
        }
        //Se compara el type y se limpia
        switch (type) {
          case 'text':
          case 'password':
          case 'email':
          case 'number':
          case 'hidden':
          case 'date':
          case 'datetime':
          case 'datetime-local':
          case 'month':
          case 'week':
          case 'time':
          case 'tel':
          case 'url':
          case 'search':
          case 'range':
          case 'color':
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
            this.selectedIndex = 0;
            if($(this).hasClass('select2')){
              //$(this).select2('val', '');
              // new version
              $(this).val('').trigger("change.select2");
            }
          break;
        }
      }
    });
    //$(this)[0].reset();
  };






  /*
  |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  |   Se crea el método que agrega el mensaje de error
  |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  $.smkAddError = function (obj, message)
  {
    // Se obtiene el icono
    var icon = $(obj).parents('form').attr('data-smk-icon');
    // Se obtiene el elemento form-group
    var formGroup = $(obj).parents('.form-group');
    // Se obtiene el elemento padre
    var parent = $(obj).parent();
    // Se obtiene el type
    var type = $(obj).attr('type');
    // Se obtiene el mensaje de error
    var smkMsg = $(obj).attr('data-smk-msg');
    // Se crea el template del icono de error
    var ico = '<span class="glyphicon '+ icon +' form-control-feedback smk-error-icon"></span>';

    // Si type es indefinido se asigna el nombre del tag
    if(type === undefined) type = $(obj).prop('tagName').toLowerCase();

    // Si el form no contiene icono
    if (icon === '' || icon === undefined) ico = '';

    // Si el input no contiene mensaje de error se asigna uno
    if (smkMsg === '' || smkMsg === undefined) smkMsg = message;

    // Se crea el template del mensaje de error
    var msg = '<span class="help-block smk-error-msg">' + smkMsg + '</span>';

    if(type == 'select'){
      // Se agrega la clase de error
      formGroup.addClass('has-feedback has-error smk-' + type);
      // Se agrega el icono y el mensaje de error
      formGroup.append(ico + msg);
    }else if(type == 'checkbox' || type == 'radio'){
      // Se agrega la clase de error
      formGroup.addClass('has-feedback has-error smk-' + type);
      // Se agrega el icono y el mensaje de error
      formGroup.append(msg);
    }else{
      // Se agrega la clase de error
      formGroup.addClass('has-feedback has-error');
      // Si el form tiene la clase form-horizontal
      if (formGroup.parent().hasClass('form-horizontal')) {
        // Se agrega el icono y el mensaje de error
        parent.append(ico + msg);
      } else {
        // Se agrega el icono y el mensaje de error
        formGroup.append(ico + msg);
      }
    }

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
    parent.find('.smk-error-msg, .smk-error-icon').remove();
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
  $.smokeCustomizeMsg = function(msg, arrayMsg){
    var customMsg = '';
    if(typeof(arrayMsg) == 'string'){
      customMsg = msg.replace('{@}', arrayMsg);
    }else{
      var split = msg.split('{@}');
      $.each(arrayMsg, function(index, val) {
        customMsg += split[index] + val;
      });
      customMsg += split[split.length - 1];
    }
    return customMsg;
  };






  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * Alerts
  * $.smkAlert({
  *   text: 'Hello world',
  *   icon: 'glyphicon-time',
  *   position: 'top-right'
  *   type: 'success',
  *   time: 5,
  *   permanent: false
  * });
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  // Se crea la funcion smkAlert
  $.smkAlert = function(options) {

    // Variables default
    var settings = $.extend({
      text: 'Hola Mundo',
      type: 'warning',
      icon: '',
      position: 'top-right',
      time: 5,
      permanent: false
    }, options);

    var smk_alert_content_class = 'smk-alert-content';
    var available_positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];

    if ($.inArray(settings.position, available_positions) >= 0){
      smk_alert_content_class += '-' + settings.position;
    }

    // Se compara el tipo de alerta y se asigna la clase
    switch (settings.type) {
      case 'warning':
      settings.type = 'alert-warning';
      if (settings.icon === '') settings.icon = 'glyphicon-exclamation-sign';
      break;
      case 'success':
      settings.type = 'alert-success';
      if (settings.icon === '') settings.icon = 'glyphicon-ok-sign';
      break;
      case 'danger':
      settings.type = 'alert-danger';
      if (settings.icon === '') settings.icon = 'glyphicon-remove-sign';
      break;
      case 'info':
      settings.type = 'alert-info';
      if (settings.icon === '') settings.icon = 'glyphicon-info-sign';
      break;
    }

    // Se agrega el contenedor de las alertas en el body
    if(!$('body > .' + smk_alert_content_class).length) {
      $('body').append('<div class="smk-alert-content ' + smk_alert_content_class + '"></div>');
    }
    // Se crea la alerta en el contenedor
    var obj = $('<div class="alert alert-dismissable ' + settings.type + ' smk-alert"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span class="glyphicon ' + settings.icon + '"></span><p>' + settings.text + '</p></div>');

    $('.' + smk_alert_content_class).prepend(obj);

    // Se aplica la animación de entrada a la alerta
    obj.animate({
      opacity: '1',
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
        }, 300, function() {
          obj.remove();
        });
      }, (settings.time * 1000) );
    }

  };






  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * Confirmation
  * $.smkConfirm({
  *   text: 'are you sure?',
  *   accept: 'Accept',
  *   cancel: 'Cancel'
  * },function(e){
  *   if(res){
  *     // Code here
  *   }
  * });
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  $.smkConfirm = function(options, callback) {
    // Variables default
    var settings = $.extend({
      text: 'are you sure?',
      accept: 'Accept',
      cancel: 'Cancel'
    }, options);
    // Se agrega el panel de confirmacion en el body
    $('body').append('<div class="smk-confirm-back"><div class="panel panel-default smk-confirm" tabindex="1"><div class="panel-body">' + settings.text + '</div><div class="panel-footer text-right"><a class="btn btn-default btn-sm smk-cancel" href="#" >' + settings.cancel + '</a> <a class="btn btn-primary btn-sm smk-accept" href="#">' + settings.accept + '</a></div></div></div>');
    // Se aplica la animacion de entrada del panel de confirmacion
    $('.smk-confirm').animate({
      top: "-5px",
      opacity: '1'
    }, 400, function(){
      $('.smk-confirm').focus();
    }).on('keydown', function(e) {
      if (e.which === 27) {
        $('.smk-cancel').click();
      } else if (e.which === 13) {
        if (!$('.smk-accept').is(":focus"))
        $('.smk-accept').click();
      }
    });
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





  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * Prompt
  * $.smkPrompt({
  *   text: 'What is your name?',
  *   defaultValue: '',
  *   accept: 'Accept',
  *   cancel: 'Cancel'
  * },function(res){
  *   if(res){
  *     // Code here
  *   } else {
  *    // Code here
  *   }
  * });
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  $.smkPrompt = function(options, callback) {
    // Variables default
    var settings = $.extend({
      text: 'Enter value',
      defaultValue: '',
      accept: 'Accept',
      cancel: 'Cancel'
    }, options);
    // Se agrega el panel de confirmacion en el body
    $('body').append('<div class="smk-confirm-back"><div class="panel panel-default smk-prompt" tabindex="1"><div class="panel-body"><div class="form-group"><label for="smkPromptInput">' + settings.text + '</label><input class="form-control" id="smkPromptInput" autocomplete="off" type="text" value="' + settings.defaultValue + '"></div></div><div class="panel-footer text-right"><a class="btn btn-default btn-sm smk-cancel" href="#" >' + settings.cancel + '</a> <a class="btn btn-primary btn-sm smk-accept" href="#">' + settings.accept + '</a></div></div></div>');
    // Se aplica la animacion de entrada del panel de confirmacion
    $('.smk-prompt').animate({
      top: "-5px",
      opacity: '1'
    }, 400, function(){
      $('.smk-prompt input[type="text"]').focus().select();
    }).on('keydown', function(e) {
      if (e.which === 27) {
        $('.smk-cancel').click();
      } else if (e.which === 13) {
        if (!$('.smk-accept').is(":focus"))
        $('.smk-accept').click();
      }
    });
    // Si se presiona el boton .smk-cancel se retorna false
    $('.smk-cancel').click(function(e) {
      e.preventDefault();
      smkConfirmHide();
      //return false;
      callback(false);
    });
    // Si se presiona el boton .smk-accept se retorna true or false
    $('.smk-accept').click(function(e) {
      e.preventDefault();
      smkConfirmHide();
      //return the value;
      var ret = ($('.smk-prompt input').val() !== '') ? $('.smk-prompt input').val() : false;
      callback(ret);
    });
    // Se remueve el panel de confirmacion del body
    function smkConfirmHide(){
      $('.smk-confirm-back').fadeOut(200, function() {
        $('.smk-confirm-back').remove();
      });
      $('.smk-prompt').animate({
        top: "-500px",
        opacity: '0'
      }, 400, function() {
        $('.smk-prompt').remove();
      });
    }
  };






  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * Float
  * var float = $.smkFloat('1,0000.00');
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  $.smkFloat = function(number) {
    if(typeof number === 'string'){
      number = number.replace(',', '');
    }
    return parseFloat(number);
  };





  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * Currency
  * var currency = $.smkCurrency(10000, '$');
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  $.smkCurrency = function(number, prefix) {
    if (typeof number !== 'string') {
      number = number.toString();
    }
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






  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * GetURL
  * var url = $.smkGetURL(1);
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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





  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * ShowPass
  * $('.panel').smkShowPass();
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  $.fn.smkShowPass = function(options) {

    var self = $(this);
    var parent = self.parent('.form-group');
    var btnShow = '<span class="glyphicon glyphicon-eye-open smk-btn-show-pass" aria-hidden="true"></span>';

    parent.addClass('smk-show-pass');
    parent.append( btnShow );

    // Evento del boton Remove
    parent.find('.smk-btn-show-pass').click(function(event) {
      event.preventDefault();
      if (self.prop('type') == 'password') {
        self.prop('type', 'text');
        $(this).addClass('glyphicon-eye-close');
        $(this).removeClass('glyphicon-eye-open');
      } else {
        self.prop('type', 'password');
        $(this).removeClass('glyphicon-eye-close');
        $(this).addClass('glyphicon-eye-open');
      }
    });

  };




  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * Hide email
  * var email = $.smkHideEmail('alfredobarronc@gmail.com');
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  $.smkHideEmail = function(string) {
    var parts = string.split('@');
    var first = parts[0].charAt(0);
    var last = parts[0].slice(-1);
    var arterisk = '';
    for (var i = 0; i < parts[0].length - 2; i++) {
      arterisk = arterisk + '*';
    }
    var email = first + arterisk + last + '@' + parts[1];
    return email;
  };





  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * DatePicker
  * var date = $.smkDatePicker( $('.datepicker').datepicker('getDate') );
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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






  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * Date
  * var date = $.smkDate({date:new Date(), format:'yyyy-mm-dd' });
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  $.smkDate = function(options) {
    var today = $.smkDatePicker( new Date() );
    var settings = $.extend({
      date: today,
      format: 'yyyy-mm-dd'
    }, $.smkDate.Languaje, options);

    var languaje = $.smkDate.Languaje;

    if (languaje === undefined) {
      languaje =  {
        shortMonthNames : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        monthNames : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      };
    }
    //Se obtienen los separadores
    var validDate = /\d+|[a-zA-z]/g;
    var separator = settings.date.replace(validDate, '\0').split('\0');
    // Se obtiene las partes de la fecha
    var splitDate = settings.date.match(validDate);

    if(settings.lang == 'es'){
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
        'M'    : languaje.shortMonthNames[settings.date.getMonth()],
        'MM'   : languaje.monthNames[settings.date.getMonth()],
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






  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * DateDiff
  * var dif = $.smkDateDiff({fromDate:'01/01/2013 12:00:00', toDate:'12/31/2014 12:30:00', interval:'days'});
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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






  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * Scrolling
  * $.smkScrolling({speed:1000});
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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





  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * ProgressBar
  * $.smkProgressBar({
  *   element:'body',
  *   status:'start',
  *   bgColor:'#fff',
  *   barColor:'#000',
  *   content:'Loading...'
  * });
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  $.smkProgressBar = function(options) {
    //Variables default
    var settings = $.extend({
      element: 'body',
      status: 'start',
      bgColor: '#fff',
      barColor: '',
      content: ''
    }, options);

    if(settings.status == 'start'){
      // Se crea el template de la progressbar
      var progressbar = '<div class="smk-progressbar">';
      progressbar +='<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"><span class="sr-only">0% Complete</span></div></div>';
      progressbar += '<div class="smk-progressbar-content">' + settings.content + '</div>';
      progressbar += '</div>';

      // Se carga la progressbar al dom
      //$(settings.element).prepend($(progressbar).fadeIn('fast'));
      $(settings.element).prepend($(progressbar));

      $('.smk-progressbar').css('background-color', settings.bgColor);

      $('.smk-progressbar .progress-bar').css('background-color', settings.barColor);

      if(settings.element == 'body'){
        $('.smk-progressbar').css('position', 'fixed');
      }else{
        $(settings.element).css('position', 'relative');
        $('.smk-progressbar').css('position', 'absolute');
      }
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






  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * Fullscreen
  * $('div').smkFullscreen();
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  */
  $.fn.smkFullscreen = function() {

    // Se crea el boton fullscreen
    var btnFullscreen = '<a class="btn smk-fullscreen" href="#"><span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span></a>';

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




  /**
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  * Panel
  * $('.panel').smkPanel({hide: 'min,remove,full', class: 'name-class'});
  * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
    var panelHeading = $(this).children('.panel-heading');
    if (!panelHeading.length){
      panelHeading = $("<div>", {class: 'panel-heading'});
      $(this).prepend(panelHeading);
    }
    var panelTitle = panelHeading.children('.panel-title');
    panelHeading.addClass('clearfix');
    if(panelTitle.length){
      panelTitle.addClass('pull-left');
    }

    // Se crea el btn-group
    var btnGroup = '<div class="btn-group btn-group-xs pull-right" role="group">';
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


})(jQuery);

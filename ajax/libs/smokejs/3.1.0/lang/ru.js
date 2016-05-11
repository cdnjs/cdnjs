(function($){
  $.fn.smkValidate.Languaje = {
    // Fehlermeldung bei leeren Eingabefeldern
    textEmpty        : 'Обязательное поле',
    // Fehlermeldung bei falschen Eingaben im Eingabefeld Email
    textEmail        : 'Введите правильный e-mail',
    // Fehlermeldung in einem alphanumerischen Eingabefeld
    textAlphanumeric : 'В это поле можно вводить только буквы и/или цифры',
    // Fehlermeldung beim Eingabefeld Nummern
    textNumber       : 'В это поле можно вводить только цифры',
    // Fehlermeldung beim Eingabefeld Nummernbereich
    textNumberRange  : 'Значение должно быть числом в диапазоне от <b> {@} </b> до <b> {@} </b>',
    // Fehlermeldung beim Eingabefeld Dezimalzahlen
    textDecimal      : 'Значение должно быть дробным числом',
    // Fehlermeldung beim Eingabefeld Währung
    textCurrency     : 'Пожалуйста, введите правильную сумму',
    // Fehlermeldung in einem Auswahl/Select-Feld
    textSelect       : 'Необходимо сделать выбор',
    // Fehlermeldung für die Eingabefelder Checkbox und Radio
    textCheckbox     : 'Необходимо отметить галочку',
    // Fehlermeldung beim Eingabefeld mit einer vorgebenen Anzahl an Zeichen
    textLength       : 'Значение должно быть длиной в <b> {@} </b> символов',
    // Fehlermeldung bei der Eingabe eines vorgegebenen Bereiches an Anzahl der Zeichen
    textRange        : 'Длина значения должна быть в пределах от <b> {@} </b> до <b> {@} </b> символов',
    // Fehlermeldung für Passwortstärke (Voreinstellung)
    textSPassDefault : 'Не менее 4 букв (слабый)',
    // Fehlermeldung für Passwortstärke (schwach)
    textSPassWeak    : 'Не менее 6 букв (средний)',
    // Fehlermeldung für Passwortstärke (mittel)
    textSPassMedium  : 'Не менее 6 символов и 1 цифры (надежный)',
    // Fehlermeldung für Passwortstärke (stark)
    textSPassStrong  : 'Не меннее 6 букв в разном регистре и одной цифры'
  };

  $.smkEqualPass.Languaje = {
    // Mensaje de error para el input repassword
    textEqualPass    : 'Wachtwoorden komen niet overeen'
  };

  $.smkDate.Languaje = {
    shortMonthNames : ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    monthNames : ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
  };
}(jQuery));

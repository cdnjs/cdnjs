(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define('datepicker.es-ES', ['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
})(function ($) {

  'use strict';

  $.fn.datepicker.languages['es-ES'] = {
    format: 'dd/mm/yyyy',
    days: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
    daysShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
    daysMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
    weekStart: 0,
    months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthsShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  };
});

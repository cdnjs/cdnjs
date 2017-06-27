/*!
 * Brazilian Portuguese Localisation by Lucas Araujo
 * https://github.com/LucasNevesAraujo/prettydate
 *
 * Pretty Date v0.0.1
 * https://github.com/fengyuanchen/prettydate
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */

 (function(factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as anonymous module.
        define(["jquery"], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function($) {

    "use strict";
   
    $.fn.prettydate.setDefaults({
        afterSuffix: "depois",
        beforeSuffix: "atrás",
        dateFormat: "DD/MM/YYYY hh:mm:ss",
        messages: {
            second: "Agora",
            seconds: "%s segundos %s",
            minute: "Um minuto %s",
            minutes: "%s minutos %s",
            hour: "Uma hora %s",
            hours: "%s horas %s",
            day: "Um dia %s",
            days: "%s dias %s",
            week: "Uma semana %s",
            weeks: "%s semanas %s",
            month: "Um mês %s",
            months: "%s meses %s",
            year: "Um ano %s",
            years: "%s anos %s",

            // Extra
            yesterday: "Ontem",
            beforeYesterday: "Anteontem",
            tomorrow: "Amanhã",
            afterTomorrow: "Depois de amanhã"
        }
    });
    
}));
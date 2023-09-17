/*
 |  tail.select - The vanilla solution to make your HTML select fields AWESOME!
 |  @file       ./langs/tail.select-it.js
 |  @author     SamBrishes <sam@pytes.net>
 |  @version    0.5.15 - Beta
 |
 |  @website    https://github.com/pytesNET/tail.select
 |  @license    X11 / MIT License
 |  @copyright  Copyright © 2014 - 2019 SamBrishes, pytesNET <info@pytes.net>
 */
/*
 |  Translator:     Sergiu Bugeac - (https://github.com/5ergiu)
 |  GitHub:         https://github.com/wolffe/tail.select.js/issues/10
 */
;(function(factory){
   if(typeof(define) == "function" && define.amd){
       define(function(){
           return function(select){ factory(select); };
       });
   } else {
       if(typeof(window.tail) != "undefined" && window.tail.select){
           factory(window.tail.select);
       }
   }
}(function(select){
    select.strings.register("ro", {
        all: "Toate",
        none: "Nimic",
        empty: "Nu există opțiuni disponibile",
        emptySearch: "Nu s-au găsit opțiuni",
        limit: "Nu puteți selecta mai multe opțiuni",
        placeholder: "Selecteaza o opțiune",
        placeholderMulti: "Selectați până la :limit opțiuni...",
        search: "Tastați pentru a căuta...",
        disabled: "Acest câmp este dezactivat"
    });
    return select;
}));

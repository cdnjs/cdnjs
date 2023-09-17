/*
 |  tail.select - The vanilla solution to make your HTML select fields AWESOME!
 |  @file       ./langs/tail.select-no.js
 |  @author     SamBrishes <sam@pytes.net>
 |  @version    0.5.15 - Beta
 |
 |  @website    https://github.com/pytesNET/tail.select
 |  @license    X11 / MIT License
 |  @copyright  Copyright © 2014 - 2019 SamBrishes, pytesNET <info@pytes.net>
 */
/*
 |  Translator:     WoxVold - (https://github.com/woxvold)
 |  GitHub:         https://github.com/pytesNET/tail.select/issues/45
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
    select.strings.register("no", {
        all: "Alle",
        none: "Ingen",
        empty: "Ingen valg tilgjengelig",
        emptySearch: "Ingen valg funnet",
        limit: "Du kan ikke velge flere",
        placeholder: "Velg...",
        placeholderMulti: "Velg opptil :limit...",
        search: "Søk...",
        disabled: "Dette feltet er deaktivert"
    });
    return select;
}));

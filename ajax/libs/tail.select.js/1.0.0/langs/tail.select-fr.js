/*
 |  tail.select - The vanilla solution to make your HTML select fields AWESOME!
 |  @file       ./langs/tail.select-fr.js
 |  @author     SamBrishes <sam@pytes.net>
 |  @version    0.5.15 - Beta
 |
 |  @website    https://github.com/pytesNET/tail.select
 |  @license    X11 / MIT License
 |  @copyright  Copyright © 2014 - 2019 SamBrishes, pytesNET <info@pytes.net>
 */
/*
 |  Translator:     Anthony Rabine - (https://github.com/arabine)
 |  GitHub:         https://github.com/pytesNET/tail.select/issues/11
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
    select.strings.register("fr", {
        all: "Tous",
        none: "Aucun",
        empty: "Aucune option disponible",
        emptySearch: "Aucune option trouvée",
        limit: "Aucune autre option sélectionnable",
        placeholder: "Choisissez une option...",
        placeholderMulti: "Choisissez jusqu'à :limit option(s)...",
        search: "Rechercher...",
        disabled: "Ce champs est désactivé"
    });
    return select;
}));

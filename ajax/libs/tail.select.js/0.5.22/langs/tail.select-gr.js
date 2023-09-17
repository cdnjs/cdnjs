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
 |  Translator:     achatzi78 - (https://github.com/achatzi78)
 |  GitHub:         https://github.com/wolffe/tail.select.js/issues/8
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
    select.strings.register("gr", {
        all: "Όλα",
        none: "Κανένα",
        empty: "Δεν υπάρχουν διαθέσιμες επιλογές",
        emptySearch: "Δεν βρέθηκαν επιλογές",
        limit: "Δεν μπορείτε να επιλέξετε περισσότερες επιλογές",
        placeholder: "Επιλέξτε μία επιλογή...",
        placeholderMulti: "Επιλέξτε μέχρι :limit επιλογές...",
        search: "Πληκτρολογήστε για αναζήτηση...",
        disabled: "Αυτό το πεδίο είναι απενεργοποιημένο"
    });
    return select;
}));

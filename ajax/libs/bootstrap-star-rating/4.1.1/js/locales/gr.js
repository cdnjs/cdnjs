/*!
 * Star Rating Greek Translations
 *
 * This file must be loaded after 'star-rating.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 *
 * @see http://github.com/kartik-v/bootstrap-star-rating
 * @author Kartik Visweswaran <kartikv2@gmail.com>
 */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'window', 'document'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') { 
        factory(require('jquery'), window, document);
    } else { 
        factory(window.jQuery, window, document);
    }
}(function ($, window, document, undefined) {
  "use strict";
  $.fn.ratingLocales.gr = {
    defaultCaption: '{rating} Αστέρια',
    starCaptions: {
      0.5: 'Μισό Αστέρι',
      1: 'Ένα Αστέρι',
      1.5: 'Ένα Αστέρι και Μισό',
      2: 'Δύο Αστέρια',
      2.5: 'Δύο Αστέρια και Μισό',
      3: 'Τρία Αστέρια',
      3.5: 'Τρία Αστέρια και Μισό',
      4: 'Τέσσερα Αστέρια',
      4.5: 'Τέσσερα Αστέρια και Μισό',
      5: 'Πέντε Αστέρια'
    },
    clearButtonTitle: 'Καθαρισμός',
    clearCaption: 'Χωρίς Βαθμολογία'
  };
}));

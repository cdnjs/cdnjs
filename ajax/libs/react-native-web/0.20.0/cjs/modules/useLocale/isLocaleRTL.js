"use strict";

exports.__esModule = true;
exports.isLocaleRTL = isLocaleRTL;
/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var rtlScripts = new Set(['Arab', 'Syrc', 'Samr', 'Mand', 'Thaa', 'Mend', 'Nkoo', 'Adlm', 'Rohg', 'Hebr']);
var rtlLangs = new Set(['ae',
// Avestan
'ar',
// Arabic
'arc',
// Aramaic
'bcc',
// Southern Balochi
'bqi',
// Bakthiari
'ckb',
// Sorani
'dv',
// Dhivehi
'fa', 'far',
// Persian
'glk',
// Gilaki
'he', 'iw',
// Hebrew
'khw',
// Khowar
'ks',
// Kashmiri
'ku',
// Kurdish
'mzn',
// Mazanderani
'nqo',
// N'Ko
'pnb',
// Western Punjabi
'ps',
// Pashto
'sd',
// Sindhi
'ug',
// Uyghur
'ur',
// Urdu
'yi' // Yiddish
]);
var cache = new Map();

/**
 * Determine the writing direction of a locale
 */
function isLocaleRTL(locale) {
  var cachedRTL = cache.get(locale);
  if (cachedRTL) {
    return cachedRTL;
  }
  var isRTL = false;
  // $FlowFixMe
  if (Intl.Locale) {
    try {
      // $FlowFixMe
      var script = new Intl.Locale(locale).maximize().script;
      isRTL = rtlScripts.has(script);
    } catch (_unused) {
      // RangeError: Incorrect locale information provided
      // Fallback to inferring from language
      var lang = locale.split('-')[0];
      isRTL = rtlLangs.has(lang);
    }
  } else {
    // Fallback to inferring from language
    var _lang = locale.split('-')[0];
    isRTL = rtlLangs.has(_lang);
  }
  cache.set(locale, isRTL);
  return isRTL;
}
'use strict';

var module_prime_react = module.exports = require('./components/api/PrimeReact');
module_prime_react.locale = require('./components/api/Locale').locale;
module_prime_react.addLocale = require('./components/api/Locale').addLocale;
module_prime_react.updateLocaleOption = require('./components/api/Locale').updateLocaleOption;
module_prime_react.updateLocaleOptions = require('./components/api/Locale').updateLocaleOptions;
module_prime_react.localeOption = require('./components/api/Locale').localeOption;
module_prime_react.localeOptions = require('./components/api/Locale').localeOptions;
module_prime_react.PrimeIcons = require('./components/api/PrimeIcons').PrimeIcons;

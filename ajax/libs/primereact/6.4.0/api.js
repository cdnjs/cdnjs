'use strict';

var module_primereact = module.exports = require('./components/api/PrimeReact');
module_primereact.locale = require('./components/api/Locale').locale;
module_primereact.addLocale = require('./components/api/Locale').addLocale;
module_primereact.updateLocaleOption = require('./components/api/Locale').updateLocaleOption;
module_primereact.updateLocaleOptions = require('./components/api/Locale').updateLocaleOptions;
module_primereact.localeOption = require('./components/api/Locale').localeOption;
module_primereact.localeOptions = require('./components/api/Locale').localeOptions;
module_primereact.PrimeIcons = require('./components/api/PrimeIcons').PrimeIcons;
module_primereact.MessageSeverity = require('./components/api/MessageSeverity').MessageSeverity;

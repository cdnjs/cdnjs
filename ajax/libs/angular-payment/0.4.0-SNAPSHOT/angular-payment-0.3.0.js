angular.module("payment", ["payment.service","payment.restrictNumeric","payment.cardCvc","payment.cardExpiry","payment.cardNumber"]);
/*global angular: false */
angular.module('payment.service', [])
    .factory('payment', ['$document', function ($document) {
        'use strict';

        var defaultFormat = /(\d{1,4})/g,
            cards = [
                {
                    type: 'maestro',
                    pattern: /^(5(018|0[23]|[68])|6(39|7))/,
                    format: defaultFormat,
                    length: [12, 13, 14, 15, 16, 17, 18, 19],
                    cvcLength: [3],
                    luhn: true
                }, {
                    type: 'dinersclub',
                    pattern: /^(36|38|30[0-5])/,
                    format: defaultFormat,
                    length: [14],
                    cvcLength: [3],
                    luhn: true
                }, {
                    type: 'laser',
                    pattern: /^(6706|6771|6709)/,
                    format: defaultFormat,
                    length: [16, 17, 18, 19],
                    cvcLength: [3],
                    luhn: true
                }, {
                    type: 'jcb',
                    pattern: /^35/,
                    format: defaultFormat,
                    length: [16],
                    cvcLength: [3],
                    luhn: true
                }, {
                    type: 'unionpay',
                    pattern: /^62/,
                    format: defaultFormat,
                    length: [16, 17, 18, 19],
                    cvcLength: [3],
                    luhn: false
                }, {
                    type: 'discover',
                    pattern: /^(6011|65|64[4-9]|622)/,
                    format: defaultFormat,
                    length: [16],
                    cvcLength: [3],
                    luhn: true
                }, {
                    type: 'mastercard',
                    pattern: /^5[1-5]/,
                    format: defaultFormat,
                    length: [16],
                    cvcLength: [3],
                    luhn: true
                }, {
                    type: 'amex',
                    pattern: /^3[47]/,
                    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
                    length: [15],
                    cvcLength: [3, 4],
                    luhn: true
                }, {
                    type: 'visa',
                    pattern: /^4/,
                    format: defaultFormat,
                    length: [13, 14, 15, 16],
                    cvcLength: [3],
                    luhn: true
                }, {
                    type: 'visaelectron',
                    pattern: /^4(026|17500|405|508|844|91[37])/,
                    format: defaultFormat,
                    length: [16],
                    cvcLength: [3],
                    luhn: true
                }, {
                    type: 'forbrugsforeningen',
                    pattern: /^600/,
                    format: defaultFormat,
                    length: [16],
                    cvcLength: [3],
                    luhn: true
                }, {
                    type: 'dankort',
                    pattern: /^5019/,
                    format: defaultFormat,
                    length: [16],
                    cvcLength: [3],
                    luhn: true
                }
            ],
            trim = function (str) {
                return str.toString().replace(/^\s+|\s+$/g, '');
            },
            hasTextSelected = function (elm) {
                var ref;
                if ((elm.prop('selectionStart') != null) && elm.prop('selectionStart') !== elm.prop('selectionEnd')) { return true; }
                return $document !== undefined && $document !== null ? (ref = $document.selection) != null ? typeof ref.createRange === "function" ? ref.createRange().text : undefined : undefined : undefined;
            },
            cardFromNumber = function (num) {
                var card, i, len;
                if (!num) { return null; }
                num = num.toString().replace(/\D/g, '');
                for (i = 0, len = cards.length; i < len; i++) {
                    card = cards[i];
                    if (card.pattern.test(num)) { return card; }
                }

                return null;
            },
            luhnCheck = function (num) {
                var digit, digits = num.toString().split('').reverse(), sum = 0, i, odd = true;
                for (i = 0; i < digits.length; i++) {
                    digit = digits[i];
                    digit = parseInt(digit, 10);
                    if ((odd = !odd)) { digit *= 2; }
                    if (digit > 9) { digit -= 9; }
                    sum += digit;
                }

                return sum % 10 === 0;
            },
            validateCardNumber = function (num) {
                if (!num) { return false; }

                var card;
                num = num.toString().replace(/\s+|-/g, '');
                if (!/^\d+$/.test(num)) { return false; }
                card = cardFromNumber(num);

                return card ? (card.length.indexOf(num.length) >= 0) && (card.luhn === false || luhnCheck(num)) : false;
            },
            formatCardNumber = function (num) {
                var card = cardFromNumber(num), groups, upperLength, ref, result;
                if (!card) { return num; }
                upperLength = card.length[card.length.length - 1];
                num = num.replace(/\D/g, '');
                num = num.slice(0, +upperLength + 1 || 9e9);
                if (card.format.global) {
                    result = (ref = num.match(card.format)) !== null ? ref.join(' ') : undefined;
                } else {
                    groups = card.format.exec(num);
                    if (groups !== null) { groups.shift(); }
                    result = groups !== null ? groups.join(' ') : undefined;
                }

                return result;
            },
            validateCardExpiry = function (month, year) {
                var currentTime, expiry, prefix;
                if (typeof month === 'object' && month.hasOwnProperty('month')) {
                    year = month.year;
                    month = month.month;
                }

                if (!(month && year)) { return false; }

                month = trim(month);
                year = trim(year);
                if (!/^\d+$/.test(month)) { return false; }
                if (!/^\d+$/.test(year)) { return false; }
                if (!(parseInt(month, 10) <= 12)) { return false; } // jshint ignore:line
                if (year.length === 2) {
                    prefix = (new Date()).getFullYear();
                    prefix = prefix.toString().slice(0, 2);
                    year = prefix + year;
                }

                expiry = new Date(year, month);
                currentTime = new Date();
                expiry.setMonth(expiry.getMonth() - 1);
                expiry.setMonth(expiry.getMonth() + 1, 1);

                return expiry > currentTime;
            },
            cardFromType = function (type) {
                var i;
                for (i = 0; i < cards.length; i++) {
                    if (cards[i].type === type) { return cards[i]; }
                }

                return undefined;
            },
            validateCardCVC = function (cvc, type) {
                var card;
                cvc = trim(cvc);
                if (!/^\d+$/.test(cvc)) { return false; }
                if (type) {
                    card = cardFromType(type);
                    return card ? card.cvcLength.indexOf(cvc.length) >= 0 : false;
                }

                return cvc.length >= 3 && cvc.length <= 4;
            };

        return {
            hasTextSelected: hasTextSelected,
            cardFromNumber: cardFromNumber,
            validateCardNumber: validateCardNumber,
            validateCardExpiry: validateCardExpiry,
            validateCardCvc: validateCardCVC,
            formatCardNumber: formatCardNumber
        };
    }]);
angular.module('payment.restrictNumeric', [])
    .directive('restrictNumeric', function () {
        'use strict';
        var restrictNumeric = function (e) {
                if (e.metaKey || e.ctrlKey || e.which === 0 || e.which < 33) { return; }
                if (e.which === 32 || !!/[\d\s]/.test(String.fromCharCode(e.which)) === false) { e.preventDefault(); } // jshint ignore:line
            };

        return {
            restrict: 'A',
            link: function postLink(scope, element) {
                element.bind('keypress', restrictNumeric);
            }
        };
    });
/*global angular: false */
angular.module('payment.cardCvc', ['payment.service', 'payment.restrictNumeric'])
    .directive('cardCvcInput', function () {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: 'template/cardCvc/cardCvc.html',
            replace: true
        };
    })

    .directive('cardCvcFormatter', function () {
        'use strict';
        var restrictCvc = function (e) {
            var elm = angular.element(e.currentTarget), digit, val;
            digit = String.fromCharCode(e.which);
            if (!/^\d+$/.test(digit)) { return; }

            val = elm.val() + digit;
            if (val.length > 4) { e.preventDefault(); }
        };

        return {
            link: function postLink(scope, element) {
                element.bind('keypress', restrictCvc);
            }
        };
    })

    .directive('cardCvcValidator', ['payment', function (payment) {
        'use strict';
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModelCtrl) {
                function validate(value) {
                    var valid = value ? payment.validateCardCvc(value) : false;
                    ngModelCtrl.$setValidity('cardCvc', valid);
                    return valid;
                }

                ngModelCtrl.$parsers.unshift(function (value) {
                    return validate(value) ? value : undefined;
                });

                ngModelCtrl.$formatters.unshift(function (value) {
                    validate(value);
                });
            }
        };
    }]);
/*global angular: false */
angular.module('payment.cardExpiry', ['payment.service', 'payment.restrictNumeric'])
    .directive('cardExpiryInput', ['payment', function (payment) {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: 'template/cardExpiry/cardExpiry.html',
            replace: true
        };
    }])

    .directive('cardExpiryFormatter', ['payment', function (payment) {
        'use strict';
        var formatExpiry = function (e) {
                var elm, digit, val;

                digit = String.fromCharCode(e.which);
                if (!/^\d+$/.test(digit)) { return; }
                elm = angular.element(e.currentTarget);
                val = elm.val() + digit;
                if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
                    e.preventDefault();
                    elm.val('0' + val + ' / ');
                } else if (/^\d\d$/.test(val)) {
                    e.preventDefault();
                    elm.val(val + ' / ');
                }
            },
            formatForwardExpiry = function (e) {
                var elm, digit, val;

                digit = String.fromCharCode(e.which);
                if (!/^\d+$/.test(digit)) { return; }
                elm = angular.element(e.currentTarget);
                val = elm.val();
                if (/^\d\d$/.test(val)) { elm.val(val + ' / '); }
            },
            formatForwardSlash = function (e) {
                var elm, slash, val;

                slash = String.fromCharCode(e.which);
                if (slash !== '/') { return; }
                elm = angular.element(e.currentTarget);
                val = elm.val();
                if (/^\d$/.test(val) && val !== '0') { elm.val(val + " / "); }
            },
            formatBackExpiry = function (e) {
                var elm, value;

                if (e.meta) { return; }
                elm = angular.element(e.currentTarget);
                value = elm.val();
                if (e.which !== 8) { return; }
                if ((elm.prop('selectionStart') != null) && elm.prop('selectionStart') !== value.length) { return; }
                if (/\d(\s|\/)+$/.test(value)) {
                    e.preventDefault();
                    elm.val(value.replace(/\d(\s|\/)*$/, ''));
                } else if (/\s\/\s?\d?$/.test(value)) {
                    e.preventDefault();
                    elm.val(value.replace(/\s\/\s?\d?$/, ''));
                }
            },
            restrictExpiry = function (e) {
                var elm = angular.element(e.currentTarget), digit, value;

                digit = String.fromCharCode(e.which);
                if (!/^\d+$/.test(digit)) { return; }
                if (payment.hasTextSelected(elm)) { return; }
                value = elm.val() + digit;
                value = value.replace(/\D/g, '');
                if (value.length > 6) { e.preventDefault(); }
            };

        return {
            link: function postLink(scope, element) {
                element.bind('keypress', restrictExpiry);
                element.bind('keypress', formatExpiry);
                element.bind('keypress', formatForwardSlash);
                element.bind('keypress', formatForwardExpiry);
                element.bind('keydown', formatBackExpiry);
            }
        };
    }])

    .directive('cardExpiryValidator', ['payment', function (payment) {
        'use strict';
        var cardExpiryVal = function (value) {
            var month, prefix, year, ref;

            value = value.replace(/\s/g, '');
            ref = value.split('/', 2);
            month = ref[0];
            year = ref[1];

            if ((year ? year.length : undefined) === 2 && /^\d+$/.test(year)) {
                prefix = (new Date()).getFullYear();
                prefix = prefix.toString().slice(0, 2);
                year = prefix + year;
            }

            month = parseInt(month, 10);
            year = parseInt(year, 10);

            return {month: month, year: year};
        };

        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModelCtrl) {
                ngModelCtrl.$parsers.unshift(function (value) {
                    var expiry = cardExpiryVal(value), valid = payment.validateCardExpiry(expiry.month, expiry.year);
                    ngModelCtrl.$setValidity('cardExpiry', valid);
                    return valid ? expiry : undefined;
                });

                ngModelCtrl.$formatters.unshift(function (value) {
                    var valid = (value && value.hasOwnProperty('month') && value.hasOwnProperty('year')) ?
                            payment.validateCardExpiry(value.month, value.year) : false;
                    ngModelCtrl.$setValidity('cardExpiry', valid);
                    return valid ? value.month + ' / ' + value.year : undefined;
                });
            }
        };
    }]);
angular.module('payment.cardNumber', ['payment.service', 'payment.restrictNumeric'])
    .directive('cardNumberInput', function () {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: 'template/cardNumber/cardNumber.html',
            replace: true
        };
    })

    .directive('cardNumberFormatter', ['$timeout', '$parse', 'payment', function ($timeout, $parse, payment) {
        'use strict';
        var restrictCardNumber = function (e) {
                var card, digit = String.fromCharCode(e.which), value, elm = angular.element(e.currentTarget);

                if (!/^\d+$/.test(digit)) { return; }
                if (payment.hasTextSelected(elm)) { return; }

                value = (elm.val() + digit).replace(/\D/g, '');
                card = payment.cardFromNumber(value);

                if (card && value.length > card.length[card.length.length - 1]) {
                    e.preventDefault();
                } else if (value.length > 16) {
                    e.preventDefault();
                }
            },
            formatCardNumber = function (e) {
                var elm, card, digit, length, re, upperLength = 16, value;

                digit = String.fromCharCode(e.which);
                if (!/^\d+$/.test(digit)) { return; }

                elm = angular.element(e.currentTarget);
                value = elm.val();
                card = payment.cardFromNumber(value + digit);
                length = (value.replace(/\D/g, '') + digit).length;

                if (card) { upperLength = card.length[card.length.length - 1]; }
                if (length >= upperLength) { return; }
                if ((elm.prop('selectionStart') !== null) && elm.prop('selectionStart') !== value.length) { return; }
                if (card && card.type === 'amex') {
                    re = /^(\d{4}|\d{4}\s\d{6})$/;
                } else {
                    re = /(?:^|\s)(\d{4})$/;
                }

                if (re.test(value)) {
                    e.preventDefault();
                    elm.val(value + ' ' + digit);
                } else if (re.test(value + digit)) {
                    e.preventDefault();
                    elm.val(value + digit + ' ');
                }
            },
            reFormatCardNumber = function (e) {
                var elm = angular.element(e.currentTarget);
                $timeout(function () {
                    var value = elm.val();
                    value = payment.formatCardNumber(value);
                    elm.val(value);
                });
            };

        return {
            require: 'ngModel',
            link: function postLink(scope, element, attrs, ngModelCtrl) {
                var cardType = $parse(attrs.cardType);

                element.bind('keypress', restrictCardNumber);
                element.bind('keypress', formatCardNumber);
                element.bind('paste', reFormatCardNumber);

                function applyCardType(value) {
                    if (attrs.cardType) {
                        var card = payment.cardFromNumber(value);
                        cardType.assign(scope, (card && cardType !== card.type) ? card.type : null);
                    }
                }

                ngModelCtrl.$formatters.unshift(function (value) {
                    applyCardType(value);
                    return payment.formatCardNumber(value);
                });

                ngModelCtrl.$parsers.unshift(function (value) {
                    applyCardType(value);
                    return value;
                });
            }
        };
    }])

    .directive('cardNumberValidator', ['payment', function (payment) {
        'use strict';
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModelCtrl) {
                function validate(value) {
                    if (!value) { return false; }
                    var valid = payment.validateCardNumber(value);
                    ngModelCtrl.$setValidity('cardNumber', valid);
                    return valid;
                }

                ngModelCtrl.$parsers.push(function (value) {
                    return validate(value) ? value.replace(/ /g, '') : undefined;
                });

                ngModelCtrl.$formatters.unshift(function (value) {
                    validate(value);
                    return value;
                });
            }
        };
    }]);
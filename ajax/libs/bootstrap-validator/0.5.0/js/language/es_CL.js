(function($) {
    /**
     * Chilean Spanish package
     * Translated by @marceloampuerop6
     */
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n, {
        base64: {
            'default': 'Por favor ingrese un valor válido en base 64'
        },
        between: {
            'default': 'Por favor ingrese un valor entre %s y %s',
            notInclusive: 'Por favor ingrese un valor sólo entre %s and %s'
        },
        callback: {
            'default': 'Por favor ingrese un valor válido'
        },
        choice: {
            'default': 'Por favor ingrese un valor válido',
            less: 'Por favor elija %s opciones como mínimo',
            more: 'Por favor elija %s optiones como máximo',
            between: 'Por favor elija de %s a %s opciones'
        },
        creditCard: {
            'default': 'Por favor ingrese un número válido de tarjeta de crédito'
        },
        cusip: {
            'default': 'Por favor ingrese un número CUSIP válido'
        },
        cvv: {
            'default': 'Por favor ingrese un número CVV válido'
        },
        date: {
            'default': 'Por favor ingrese una fecha válida'
        },
        different: {
            'default': 'Por favor ingrese un valor distinto'
        },
        digits: {
             'default': 'Por favor ingrese sólo dígitos'
        },
        ean: {
            'default': 'Por favor ingrese un número EAN válido'
        },
        emailAddress: {
            'default': 'Por favor ingrese un email válido'
        },
        file: {
            'default': 'Por favor elija un archivo válido'
        },
        greaterThan: {
            'default': 'Por favor ingrese un valor mayor o igual a %s',
            notInclusive: 'Por favor ingrese un valor mayor que %s'
        },
        grid: {
            'default': 'Por favor ingrese un número GRId válido'
        },
        hex: {
            'default': 'Por favor ingrese un valor hexadecimal válido'
        },
        hexColor: {
            'default': 'Por favor ingrese un color hexadecimal válido'
        },
        iban: {
            'default': 'Por favor ingrese un número IBAN válido',
            countryNotSupported: 'El código del país %s no está soportado',
            country: 'Por favor ingrese un número IBAN válido en %s',
            countries: {
                AD: 'Andorra',
                AE: 'Emiratos Árabes Unidos',
                AL: 'Albania',
                AO: 'Angola',
                AT: 'Austria',
                AZ: 'Azerbaiyán',
                BA: 'Bosnia-Herzegovina',
                BE: 'Bélgica',
                BF: 'Burkina Faso',
                BG: 'Bulgaria',
                BH: 'Baréin',
                BI: 'Burundi',
                BJ: 'Benín',
                BR: 'Brasil',
                CH: 'Suiza',
                CI: 'Costa de Marfil',
                CM: 'Camerún',
                CR: 'Costa Rica',
                CV: 'Cabo Verde',
                CY: 'Cyprus',
                CZ: 'República Checa',
                DE: 'Alemania',
                DK: 'Dinamarca',
                DO: 'República Dominicana',
                DZ: 'Argelia',
                EE: 'Estonia',
                ES: 'España',
                FI: 'Finlandia',
                FO: 'Islas Feroe',
                FR: 'Francia',
                GB: 'Reino Unido',
                GE: 'Georgia',
                GI: 'Gibraltar',
                GL: 'Groenlandia',
                GR: 'Grecia',
                GT: 'Guatemala',
                HR: 'Croacia',
                HU: 'Hungría',
                IE: 'Irlanda',
                IL: 'Israel',
                IR: 'Iran',
                IS: 'Islandia',
                IT: 'Italia',
                JO: 'Jordania',
                KW: 'Kuwait',
                KZ: 'Kazajistán',
                LB: 'Líbano',
                LI: 'Liechtenstein',
                LT: 'Lituania',
                LU: 'Luxemburgo',
                LV: 'Letonia',
                MC: 'Mónaco',
                MD: 'Moldavia',
                ME: 'Montenegro',
                MG: 'Madagascar',
                MK: 'Macedonia',
                ML: 'Malí',
                MR: 'Mauritania',
                MT: 'Malta',
                MU: 'Mauricio',
                MZ: 'Mozambique',
                NL: 'Países Bajos',
                NO: 'Noruega',
                PK: 'Pakistán',
                PL: 'Poland',
                PS: 'Palestina',
                PT: 'Portugal',
                QA: 'Catar',
                RO: 'Rumania',
                RS: 'Serbia',
                SA: 'Arabia Saudita',
                SE: 'Suecia',
                SI: 'Eslovenia',
                SK: 'Eslovaquia',
                SM: 'San Marino',
                SN: 'Senegal',
                TN: 'Túnez',
                TR: 'Turquía',
                VG: 'Islas Vírgenes Británicas'
            }
        },
        id: {
            'default': 'Por favor ingrese un número de identificación válido',
            countryNotSupported: 'El código del país %s no esta soportado',
            country: 'Por favor ingrese un número de identificación %s válido',
            countries: {
                BA: 'Bosnioherzegovino',
                BG: 'Búlgaro',
                BR: 'Brasileño',
                CH: 'Suizo',
                CL: 'Chileno',
                CZ: 'Checo',
                DK: 'Danés',
                EE: 'Estonio',
                ES: 'Español',
                FI: 'Finlandés',
                HR: 'Croata',
                IE: 'Irlandés',
                IS: 'Islandés',
                LT: 'Lituano',
                LV: 'Letón',
                ME: 'Montenegrino',
                MK: 'Macedonio',
                NL: 'Alemán',
                RO: 'Romano',
                RS: 'Serbio',
                SE: 'Sueco',
                SI: 'Esloveno',
                SK: 'Eslovaco',
                SM: 'Sanmarinense',
                ZA: 'Sudafricano'
            }
        },
        identical: {
            'default': 'Por favor ingrese el mismo valor'
        },
        imei: {
            'default': 'Por favor ingrese un número IMEI válido'
        },
        integer: {
            'default': 'Por favor ingrese un número válido'
        },
        ip: {
            'default': 'Por favor ingrese una dirección IP válida',
            ipv4: 'Por favor ingrese una dirección IPv4 válida',
            ipv6: 'Por favor ingrese una dirección IPv6 válida'
        },
        isbn: {
            'default': 'Por favor ingrese un número ISBN válido'
        },
        isin: {
            'default': 'Por favor ingrese un número ISIN válido'
        },
        ismn: {
            'default': 'Por favor ingrese un número ISMN válido'
        },
        issn: {
            'default': 'Por favor ingrese un número ISSN válido'
        },
        lessThan: {
            'default': 'Por favor ingrese un valor menor o igual a %s',
            notInclusive: 'Por favor ingrese un valor menor que %s'
        },
        mac: {
            'default': 'Por favor ingrese una dirección MAC válida'
        },
        notEmpty: {
            'default': 'Por favor ingrese un valor'
        },
        numeric: {
            'default': 'Por favor ingrese un número decimal válido'
        },
        phone: {
            'default': 'Por favor ingrese un número válido de teléfono',
            countryNotSupported: 'El código del país %s no está soportado',
            country: 'Por favor ingrese un número válido de teléfono en %s',
            countries: {
                GB: 'Reino Unido',
                US: 'EE.UU.'
            }
        },
        regexp: {
            'default': 'Por favor ingrese un valor que coincida con el patrón'
        },
        remote: {
            'default': 'Por favor ingrese un valor válido'
        },
        rtn: {
            'default': 'Por favor ingrese un número RTN válido'
        },
        sedol: {
            'default': 'Por favor ingrese un número SEDOL válido'
        },
        siren: {
            'default': 'Por favor ingrese un número SIREN válido'
        },
        siret: {
            'default': 'Por favor ingrese un número SIRET válido'
        },
        step: {
            'default': 'Por favor ingrese un paso válido de %s'
        },
        stringCase: {
            'default': 'Por favor ingrese sólo caracteres en minúscula',
            upper: 'Por favor ingrese sólo caracteres en mayúscula'
        },
        stringLength: {
            'default': 'Por favor ingrese un valor con una longitud válida',
            less: 'Por favor ingrese menos de %s caracteres',
            more: 'Por favor ingrese más de %s caracteres',
            between: 'Por favor ingrese un valor con una longitud entre %s y %s caracteres'
        },
        uri: {
            'default': 'Por favor ingresese una URI válida'
        },
        uuid: {
            'default': 'Por favor ingrese un número UUID válido',
            version: 'Por favor ingrese una versión UUID válida para %s'
        },
        vat: {
            'default': 'Por favor ingrese un número VAT válido',
            countryNotSupported: 'El código del país %s no está soportado',
            country: 'Por favor ingrese un número VAT %s válido',
            countries: {
                AT: 'Austriaco',
                BE: 'Belga',
                BG: 'Búlgaro',
                CH: 'Suizo',
                CY: 'Chipriota',
                CZ: 'Checo',
                DE: 'Alemán',
                DK: 'Danés',
                EE: 'Estonio',
                ES: 'Español',
                FI: 'Finlandés',
                FR: 'Francés',
                GB: 'Británico',
                GR: 'Griego',
                EL: 'Griego',
                HU: 'Húngaro',
                HR: 'Croata',
                IE: 'Irlandés',
                IT: 'Italiano',
                LT: 'Lituano',
                LU: 'Luxemburgués',
                LV: 'Letón',
                MT: 'Maltés',
                NL: 'Holandés',
                NO: 'Noruego',
                PL: 'Polaco',
                PT: 'Portugués',
                RO: 'Rumano',
                RU: 'Ruso',
                RS: 'Serbio',
                SE: 'Sueco',
                SI: 'Esloveno',
                SK: 'Eslovaco'
            }
        },
        vin: {
            'default': 'Por favor ingrese un número VIN válido'
        },
        zipCode: {
            'default': 'Por favor ingrese un código postal válido',
            countryNotSupported: 'El código del país %s no está soportado',
            country: 'Por favor ingrese un %s válido',
            countries: {
                'CA': 'código postal Canadiense',
                'DK': 'código postal Danés',
                'GB': 'código postal Británico',
                'IT': 'código postal Italiano',
                'NL': 'código postal Holandés',
                'SE': 'código postal Suizo',
                'SG': 'código postal Singapurense',
                'US': 'código postal de EE.UU.'
            }
        }
    });
}(window.jQuery));

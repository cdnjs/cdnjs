(function($) {
    /**
     * Spanish language package
     * Translated by @vadail
     */
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n, {
        base64: {
            'default': 'Por favor introduce un valor válido en base 64'
        },
        between: {
            'default': 'Por favor introduce un valor entre %s y %s',
            notInclusive: 'Por favor introduce un valor sólo entre %s and %s'
        },
        callback: {
            'default': 'Por favor introduce un valor válido'
        },
        choice: {
            'default': 'Por favor introduce un valor válido',
            less: 'Por favor elija %s opciones como mínimo',
            more: 'Por favor elija %s optiones como máximo',
            between: 'Por favor elija de %s a %s opciones'
        },
        creditCard: {
            'default': 'Por favor introduce un número válido de tarjeta de crédito'
        },
        cusip: {
            'default': 'Por favor introduce un número CUSIP válido'
        },
        cvv: {
            'default': 'Por favor introduce un número CVV válido'
        },
        date: {
            'default': 'Por favor introduce una fecha válida'
        },
        different: {
            'default': 'Por favor introduce un valor distinto'
        },
        digits: {
             'default': 'Por favor introduce sólo dígitos'
        },
        ean: {
            'default': 'Por favor introduce un número EAN válido'
        },
        emailAddress: {
            'default': 'Por favor introduce un email válido'
        },
        file: {
            'default': 'Por favor elija un archivo válido'
        },
        greaterThan: {
            'default': 'Por favor introduce un valor mayor o igual a %s',
            notInclusive: 'Por favor introduce un valor mayor que %s'
        },
        grid: {
            'default': 'Por favor introduce un número GRId válido'
        },
        hex: {
            'default': 'Por favor introduce un valor hexadecimal válido'
        },
        hexColor: {
            'default': 'Por favor introduce un color hexadecimal válido'
        },
        iban: {
            'default': 'Por favor introduce un número IBAN válido',
            countryNotSupported: 'El código del país %s no está soportado',
            country: 'Por favor introduce un número IBAN válido en %s',
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
            'default': 'Por favor introduce un número de identificación válido',
            countryNotSupported: 'El código del país %s no esta soportado',
            country: 'Por favor introduce un número de identificación %s válido',
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
            'default': 'Por favor introduce el mismo valor'
        },
        imei: {
            'default': 'Por favor introduce un número IMEI válido'
        },
        imo: {
            'default': 'Por favor introduce un número IMO válido'
        },
        integer: {
            'default': 'Por favor introduce un número válido'
        },
        ip: {
            'default': 'Por favor introduce una dirección IP válida',
            ipv4: 'Por favor introduce una dirección IPv4 válida',
            ipv6: 'Por favor introduce una dirección IPv6 válida'
        },
        isbn: {
            'default': 'Por favor introduce un número ISBN válido'
        },
        isin: {
            'default': 'Por favor introduce un número ISIN válido'
        },
        ismn: {
            'default': 'Por favor introduce un número ISMN válido'
        },
        issn: {
            'default': 'Por favor introduce un número ISSN válido'
        },
        lessThan: {
            'default': 'Por favor introduce un valor menor o igual a %s',
            notInclusive: 'Por favor introduce un valor menor que %s'
        },
        mac: {
            'default': 'Por favor introduce una dirección MAC válida'
        },
        meid: {
            'default': 'Por favor introduce un número MEID válido'
        },
        notEmpty: {
            'default': 'Por favor introduce un valor'
        },
        numeric: {
            'default': 'Por favor introduce un número decimal válido'
        },
        phone: {
            'default': 'Por favor introduce un número válido de teléfono',
            countryNotSupported: 'El código del país %s no está soportado',
            country: 'Por favor introduce un número válido de teléfono en %s',
            countries: {
                BR: 'Brasil',
                ES: 'España',
                FR: 'Francia',
                GB: 'Reino Unido',
                MA: 'Marruecos',
                PK: 'Pakistán',
                US: 'EE.UU.'
            }
        },
        regexp: {
            'default': 'Por favor introduce un valor que coincida con el patrón'
        },
        remote: {
            'default': 'Por favor introduce un valor válido'
        },
        rtn: {
            'default': 'Por favor introduce un número RTN válido'
        },
        sedol: {
            'default': 'Por favor introduce un número SEDOL válido'
        },
        siren: {
            'default': 'Por favor introduce un número SIREN válido'
        },
        siret: {
            'default': 'Por favor introduce un número SIRET válido'
        },
        step: {
            'default': 'Por favor introduce un paso válido de %s'
        },
        stringCase: {
            'default': 'Por favor introduce sólo caracteres en minúscula',
            upper: 'Por favor introduce sólo caracteres en mayúscula'
        },
        stringLength: {
            'default': 'Por favor introduce un valor con una longitud válida',
            less: 'Por favor introduce menos de %s caracteres',
            more: 'Por favor introduce más de %s caracteres',
            between: 'Por favor introduce un valor con una longitud entre %s y %s caracteres'
        },
        uri: {
            'default': 'Por favor introduce una URI válida'
        },
        uuid: {
            'default': 'Por favor introduce un número UUID válido',
            version: 'Por favor introduce una versión UUID válida para %s'
        },
        vat: {
            'default': 'Por favor introduce un número IVA válido',
            countryNotSupported: 'El código del país %s no está soportado',
            country: 'Por favor introduce un número IVA %s válido',
            countries: {
                AT: 'Austriaco',
                BE: 'Belga',
                BG: 'Búlgaro',
                BR: 'Brasileño',
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
                IS: 'Islandia',
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
                SK: 'Eslovaco',
                ZA: 'Sudafricano'
            }
        },
        vin: {
            'default': 'Por favor introduce un número VIN válido'
        },
        zipCode: {
            'default': 'Por favor introduce un código postal válido',
            countryNotSupported: 'El código del país %s no está soportado',
            country: 'Por favor introduce un %s válido',
            countries: {
                BR: 'código postal Brasileño',
                CA: 'código postal Canadiense',
                DK: 'código postal Danés',
                GB: 'código postal Británico',
                IT: 'código postal Italiano',
                MA: 'código postal Marruecos',
                NL: 'código postal Holandés',
                SE: 'código postal Suizo',
                SG: 'código postal Singapurense',
                US: 'código postal de EE.UU.'
            }
        }
    });
}(window.jQuery));

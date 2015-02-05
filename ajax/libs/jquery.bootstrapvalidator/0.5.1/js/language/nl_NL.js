(function($) {
    /**
     * The Dutch language package
     * Translated by @jvanderheide
     */
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n, {
        base64: {
            'default': 'Voer een geldige Base64 geëncodeerde tekst in'
        },
        between: {
            'default': 'Voer een waarde in van %s tot en met %s',
            notInclusive: 'Voer een waarde die tussen %s en %s ligt'
        },
        callback: {
            'default': 'Voer een geldige waarde in'
        },
        choice: {
            'default': 'Voer een geldige waarde in',
            less: 'Kies minimaal %s optie(s)',
            more: 'Kies maximaal %s opties',
            between: 'Kies tussen de %s - %s opties'
        },
        creditCard: {
            'default': 'Voer een geldig creditcardnummer in'
        },
        cusip: {
            'default': 'Voer een geldig CUSIP-nummer in'
        },
        cvv: {
            'default': 'Voer een geldig CVV-nummer in'
        },
        date: {
            'default': 'Voer een geldige datum in'
        },
        different: {
            'default': 'Voer een andere waarde in'
        },
        digits: {
             'default': 'Voer enkel cijfers in'
        },
        ean: {
            'default': 'Voer een geldige EAN-code in'
        },
        emailAddress: {
            'default': 'Voer een geldig e-mailadres in'
        },
        file: {
            'default': 'Kies een geldig bestand'
        },
        greaterThan: {
            'default': 'Voer een waarde in die gelijk is aan of groter is dan %s',
            notInclusive: 'Voer een waarde in die is groter dan %s'
        },
        grid: {
            'default': 'Voer een geldig GRId-nummer in'
        },
        hex: {
            'default': 'Voer een geldig hexadecimaal nummer in'
        },
        hexColor: {
            'default': 'Voer een geldige hexadecimale kleurcode in'
        },
        iban: {
            'default': 'Voer een geldig IBAN nummer in',
            countryNotSupported: 'De land code %s wordt niet ondersteund',
            country: 'Voer een geldig IBAN nummer in uit %s',
            countries: {
                AD: 'Andorra',
                AE: 'de Verenigde Arabische Emiraten',
                AL: 'Albania',
                AO: 'Angola',
                AT: 'Oostenrijk',
                AZ: 'Azerbeidzjan',
                BA: 'Bosnië-Herzegovina',
                BE: 'België',
                BF: 'Burkina Faso',
                BG: 'Bulgarije"',
                BH: 'Bahrein',
                BI: 'Burundi',
                BJ: 'Benin',
                BR: 'Brazilië',
                CH: 'Zwitserland',
                CI: 'Ivoorkust',
                CM: 'Kameroen',
                CR: 'Costa Rica',
                CV: 'Cape Verde',
                CY: 'Cyprus',
                CZ: 'Tsjechië',
                DE: 'Duitsland',
                DK: 'Denemarken',
                DO: 'de Dominicaanse Republiek',
                DZ: 'Algerije',
                EE: 'Estland',
                ES: 'Spanje',
                FI: 'Finland',
                FO: 'de Faeröer',
                FR: 'Frankrijk',
                GB: 'het Verenigd Koninkrijk',
                GE: 'Georgia',
                GI: 'Gibraltar',
                GL: 'Groenland',
                GR: 'Griekenland',
                GT: 'Guatemala',
                HR: 'Kroatië',
                HU: 'Hongarije',
                IE: 'Ierland',
                IL: 'Israël',
                IR: 'Iran',
                IS: 'IJsland',
                IT: 'Italië',
                JO: 'Jordan',
                KW: 'Koeweit',
                KZ: 'Kazachstan',
                LB: 'Libanon',
                LI: 'Liechtenstein',
                LT: 'Litouwen',
                LU: 'Luxemburg',
                LV: 'Letland',
                MC: 'Monaco',
                MD: 'Moldavië',
                ME: 'Montenegro',
                MG: 'Madagascar',
                MK: 'Macedonië',
                ML: 'Mali',
                MR: 'Mauretanië',
                MT: 'Malta',
                MU: 'Mauritius',
                MZ: 'Mozambique',
                NL: 'Nederland',
                NO: 'Noorwegen',
                PK: 'Pakistan',
                PL: 'Polen',
                PS: 'Palestina',
                PT: 'Portugal',
                QA: 'Qatar',
                RO: 'Roemenië',
                RS: 'Servië',
                SA: 'Saudi-Arabië',
                SE: 'Zweden',
                SI: 'Slovenië',
                SK: 'Slowakije',
                SM: 'San Marino',
                SN: 'Senegal',
                TN: 'Tunesië',
                TR: 'Turkije',
                VG: 'de Britse Maagdeneilanden'
            }
        },
        id: {
            'default': 'Voer een geldig identificatie nummer in',
            countryNotSupported: 'De land code %s wordt niet ondersteund',
            country: 'Voer een geldig %s identificatie nummer in',
            countries: {
                BA: 'Bosnisch',
                BG: 'Bulgaars',
                BR: 'Braziliaans',
                CH: 'Zwitsers',
                CL: 'Chileens',
                CZ: 'Tsjechisch',
                DK: 'Deens',
                EE: 'Estisch',
                ES: 'Spaans',
                FI: 'Fins',
                HR: 'Kroatisch',
                IE: 'Iers',
                IS: 'IJslands',
                LT: 'Litouws',
                LV: 'Lets',
                ME: 'Montenegrijns',
                MK: 'Macedonisch',
                NL: 'Nederlands',
                RO: 'Roemeens',
                RS: 'Servisch',
                SE: 'Zweeds',
                SI: 'Sloveens',
                SK: 'Slowaaks',
                SM: 'San Marinees',
                ZA: 'Zuid-Afrikaans'
            }
        },
        identical: {
            'default': 'Voer dezelfde waarde in'
        },
        imei: {
            'default': 'Voer een geldig IMEI-nummer in'
        },
        imo: {
            'default': 'Voer een geldig IMO-nummer in'
        },
        integer: {
            'default': 'Voer een geldig getal in'
        },
        ip: {
            'default': 'Voer een geldig IP adres in',
            ipv4: 'Voer een geldig IPv4 adres in',
            ipv6: 'Voer een geldig IPv6 adres in'
        },
        isbn: {
            'default': 'Voer een geldig ISBN-nummer in'
        },
        isin: {
            'default': 'Voer een geldig ISIN-nummer in'
        },
        ismn: {
            'default': 'Voer een geldig ISMN-nummer in'
        },
        issn: {
            'default': 'Voer een geldig ISSN-nummer in'
        },
        lessThan: {
            'default': 'Voer een waarde in gelijk aan of kleiner dan %s',
            notInclusive: 'Voer een waarde in kleiner dan %s'
        },
        mac: {
            'default': 'Voer een geldig MAC adres in'
        },
        meid: {
            'default': 'Voer een geldig MEID-nummer in'
        },
        notEmpty: {
            'default': 'Voer een waarde in'
        },
        numeric: {
            'default': 'Voer een geldig kommagetal in'
        },
        phone: {
            'default': 'Voer een geldig telefoonnummer in',
            countryNotSupported: 'De land code %s wordt niet ondersteund',
            country: 'Voer een geldig telefoonnummer in uit %s',
            countries: {
                BR: 'Brazilië',
                ES: 'Spanje',
                FR: 'Frankrijk',
                GB: 'het Verenigd Koninkrijk',
                MA: 'Marokko',
                PK: 'Pakistan',
                US: 'de Verenigde Staten'
            }
        },
        regexp: {
            'default': 'Voer een waarde in die overeenkomt met het patroon'
        },
        remote: {
            'default': 'Voer een geldige waarde in'
        },
        rtn: {
            'default': 'Voer een geldig RTN-nummer in'
        },
        sedol: {
            'default': 'Voer een geldig SEDOL-nummer in'
        },
        siren: {
            'default': 'Voer een geldig SIREN-nummer in'
        },
        siret: {
            'default': 'Voer een geldig SIRET-nummer in'
        },
        step: {
            'default': 'Voer een meervoud van %s in'
        },
        stringCase: {
            'default': 'Voer enkel kleine letters in',
            upper: 'Voer enkel hoofdletters in'
        },
        stringLength: {
            'default': 'Voer een waarde met de juiste lengte in',
            less: 'Voer minder dan %s karakters in',
            more: 'Voer meer dan %s karakters in',
            between: 'Voer tussen tussen %s en %s karakters in'
        },
        uri: {
            'default': 'Voer een geldige link in'
        },
        uuid: {
            'default': 'Voer een geldige UUID in',
            version: 'Voer een geldige UUID (versie %s) in'
        },
        vat: {
            'default': 'Voer een geldig BTW-nummer in',
            countryNotSupported: 'De land code %s wordt niet ondersteund',
            country: 'Voer een geldig %s BTW-nummer in',
            countries: {
                AT: 'Oostenrijks',
                BE: 'Belgisch',
                BG: 'Bulgaars',
                BR: 'Braziliaans',
                CH: 'Zwitsers',
                CY: 'Cypriotisch',
                CZ: 'Tsjechisch',
                DE: 'Duits',
                DK: 'Deens',
                EE: 'Estisch',
                ES: 'Spaans',
                FI: 'Fins',
                FR: 'Frans',
                GB: 'Engels',
                GR: 'Grieks',
                EL: 'Grieks',
                HU: 'Hongaars',
                HR: 'Kroatisch',
                IE: 'Iers',
                IS: 'IJslanda',
                IT: 'Italiaans',
                LT: 'Litouws',
                LU: 'Luxemburgs',
                LV: 'Lets',
                MT: 'Maltees',
                NL: 'Nederlands',
                NO: 'Noors',
                PL: 'Pools',
                PT: 'Portugees',
                RO: 'Roemeens',
                RU: 'Russisch',
                RS: 'Servisch',
                SE: 'Zweeds',
                SI: 'Sloveens',
                SK: 'Slovaaks',
                ZA: 'Zuid-Afrikaans'
            }
        },
        vin: {
            'default': 'Voer een geldig VIN-nummer in'
        },
        zipCode: {
            'default': 'Voer een geldige postcode in',
            countryNotSupported: 'De land code %s wordt niet ondersteund',
            country: 'Voer een geldige %s in',
            countries: {
                BR: 'Braziliaanse postcode',
                CA: 'Canadese postcode',
                DK: 'Deense postcode',
                GB: 'Engelse postcode',
                IT: 'Italiaanse postcode',
                MA: 'Marokkaanse postcode',
                NL: 'Nederlandse postcode',
                SE: 'Zwitserse postcode',
                SG: 'Singaporese postcode',
                US: 'Amerikaanse postcode'
            }
        }
    });
}(window.jQuery));

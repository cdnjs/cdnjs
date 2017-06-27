(function($) {
    /**
     * Belgium (Dutch) language package
     * Translated by @dokterpasta
     */
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n, {
        base64: {
            'default': 'Geef een geldige base 64 encoded tekst in'
        },
        between: {
            'default': 'Geef een waarde tussen %s en %s (incl de waarden)',
            notInclusive: 'Geef een waarde strikt tussen %s en %s'
        },
        callback: {
            'default': 'Geef een geldige waarden in'
        },
        choice: {
            'default': 'Geef een geldige waarden in',
            less: 'Kies minimum %s opties',
            more: 'Kies maximum %s opties',
            between: 'Kies %s - %s opties'
        },
        creditCard: {
            'default': 'Geef een geldig creditkaart nummer'
        },
        cusip: {
            'default': 'Geef een geldig CUSIP nummer'
        },
        cvv: {
            'default': 'Geef een geldig CVV nummer'
        },
        date: {
            'default': 'Geef een geldige datum'
        },
        different: {
            'default': 'Geef een andere waarde '
        },
        digits: {
             'default': 'Geef alleen cijfers in'
        },
        ean: {
            'default': 'Geef een geldig EAN nummer'
        },
        emailAddress: {
            'default': 'Geef een geldig email adres op'
        },
        file: {
            'default': 'Kies een geldig bestand'
        },
        greaterThan: {
            'default': 'Geef een waar de gelijk aan of groter dan %s',
            notInclusive: 'Geef een waarde groter dan %s'
        },
        grid: {
            'default': 'Geef een geldig GRId nummer'
        },
        hex: {
            'default': 'Geef een geldig hexadecimaal nummer'
        },
        hexColor: {
            'default': 'Geef een geldige hex kleur'
        },
        iban: {
            'default': 'Geef een geldig IBAN nummer',
            countryNotSupported: 'De land code %s is niet ondersteund',
            country: 'Geef een geldig IBAN nummer van %s',
            countries: {
                AD: 'Andorra',
                AE: 'Verenigde Arabische Emiraten',
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
                DO: 'Dominicaanse Republiek',
                DZ: 'Algerije',
                EE: 'Estland',
                ES: 'Spanje',
                FI: 'Finland',
                FO: 'Faeröer',
                FR: 'Frankrijk',
                GB: 'Verenigd Koninkrijk',
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
                PS: 'Palestijnse',
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
                VG: 'Britse Maagdeneilanden'
            }
        },
        id: {
            'default': 'Geef een geldig identificatie nummer',
            countryNotSupported: 'De land code %s is niet ondersteund',
            country: 'Geef een geldig %s identificatie nummer',
            countries: {
                BA: 'Bosnië-Herzegovina',
                BG: 'Bulgaars',
                BR: 'Braziliaans',
                CH: 'Zwitsers',
                CL: 'Chileens',
                CZ: 'Tsjechisch',
                DK: 'Deens',
                EE: 'Estonian',
                ES: 'Spaans',
                FI: 'Fins',
                HR: 'Kroatisch',
                IE: 'Irish',
                IS: 'IJslands',
                LT: 'Litouwse',
                LV: 'Lets',
                ME: 'Montenegro',
                MK: 'Macedonisch',
                NL: 'Nederlands',
                RO: 'Roemeens',
                RS: 'Servisch',
                SE: 'Zweeds',
                SI: 'Sloveens',
                SK: 'Slowaakse',
                SM: 'San Marino',
                ZA: 'Zuid-Afrikaans'
            }
        },
        identical: {
            'default': 'Geef dezelfde waarde'
        },
        imei: {
            'default': 'Geef een geldig IMEI nummer'
        },
        imo: {
            'default': 'Geef een geldig IMO nummer'
        },
        integer: {
            'default': 'Geef een geldig nummer'
        },
        ip: {
            'default': 'Geef een geldig IP adres',
            ipv4: 'Geef een geldig IPv4 adres',
            ipv6: 'Geef een geldig IPv6 adres'
        },
        isbn: {
            'default': 'Geef een geldig ISBN nummer'
        },
        isin: {
            'default': 'Geef een geldig ISIN nummer'
        },
        ismn: {
            'default': 'Geef een geldig ISMN nummer'
        },
        issn: {
            'default': 'Geef een geldig ISSN nummer'
        },
        lessThan: {
            'default': 'Geef een waar de gelijk aan of kleiner dan %s',
            notInclusive: 'Geef een waarde kleiner dan %s'
        },
        mac: {
            'default': 'Geef een geldig MAC adres'
        },
        meid: {
            'default': 'Geef een geldig MEID nummer'
        },
        notEmpty: {
            'default': 'Geef een waarde'
        },
        numeric: {
            'default': 'Geef een geldig comma getal'
        },
        phone: {
            'default': 'Geef een geldig telefoon nummer',
            countryNotSupported: 'De land code %s is niet ondersteund',
            country: 'Geef een geldig telefoon nummer van %s',
            countries: {
                BR: 'Brazilië',
                ES: 'Spanje',
                FR: 'Frankrijk',
                GB: 'Verenigd Koninkrijk',
                MA: 'Marokko',
                PK: 'Pakistan',
                US: 'VS'
            }
        },
        regexp: {
            'default': 'Geef een waarde die gelijk is aan de regex'
        },
        remote: {
            'default': 'Geef een geldige waarde'
        },
        rtn: {
            'default': 'Geef een geldig RTN nummer'
        },
        sedol: {
            'default': 'Geef een geldig SEDOL nummer'
        },
        siren: {
            'default': 'Geef een geldig SIREN nummer'
        },
        siret: {
            'default': 'Geef een geldig SIRET nummer'
        },
        step: {
            'default': 'Geef een geldig stap van %s'
        },
        stringCase: {
            'default': 'Geef alleen kleine letters',
            upper: 'Geef alleen hoofdletters'
        },
        stringLength: {
            'default': 'Geef een waarde met de juiste lengte',
            less: 'Geef minder dan %s karakters',
            more: 'Geef meer dan %s karakters',
            between: 'Geef een aantal karakters tussen %s en %s'
        },
        uri: {
            'default': 'Geef een geldig URI'
        },
        uuid: {
            'default': 'Geef een geldig UUID nummer',
            version: 'Geef een geldig UUID versie %s nummer'
        },
        vat: {
            'default': 'Geef een geldig BTW nummer',
            countryNotSupported: 'De land code %s is niet ondersteund',
            country: 'Geef een geldig %s BTW nummer',
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
                EE: 'Estonian',
                ES: 'Spaans',
                FI: 'Fins',
                FR: 'Frans',
                GB: 'Engels',
                GR: 'Grieks',
                EL: 'Grieks',
                HU: 'Hongaars',
                HR: 'Kroatisch',
                IE: 'Iers',
                IS: 'IJsland',
                IT: 'Italiaans',
                LT: 'Litouwse',
                LU: 'Luxemburgs',
                LV: 'Lets',
                MT: 'Maltees',
                NL: 'Nederlands',
                NO: 'Noorweegs',
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
            'default': 'Geef een geldig VIN nummer'
        },
        zipCode: {
            'default': 'Geef een geldige postcode',
            countryNotSupported: 'De land code %s is niet ondersteund',
            country: 'Please enter a valid %s',
            countries: {
                BR: 'Braziliaans postcode',
                CA: 'Canadeese postcode',
                DK: 'Deense postcode',
                GB: 'Engelse postcode',
                IT: 'Italiaanse postcode',
                MA: 'Marokko postcode',
                NL: 'Nederlandse postcode',
                SE: 'Zwitserse postcode',
                SG: 'postcode van Signapore',
                US: 'VS postcode'
            }
        }
    });
}(window.jQuery));

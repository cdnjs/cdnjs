(function($) {
    /**
     * Polish language package
     * Translated by @grzesiek
     */
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n, {
        base64: {
            'default': 'Wpisz poprawny ciąg znaków zakodowany w base 64'
        },
        between: {
            'default': 'Wprowadź wartość pomiędzy %s i %s',
            notInclusive: 'Wprowadź wartość pomiędzy %s i %s (zbiór otwarty)'
        },
        callback: {
            'default': 'Wprowadź poprawną wartość'
        },
        choice: {
            'default': 'Wprowadź poprawną wartość',
            less: 'Wybierz przynajmniej %s opcji',
            more: 'Wybierz maksymalnie %s opcji',
            between: 'Wybierz przynajmniej %s i maksymalnie %s opcji'
        },
        creditCard: {
            'default': 'Wprowadź poprawny numer karty kredytowej'
        },
        cusip: {
            'default': 'Wprowadź poprawny numer CUSIP'
        },
        cvv: {
            'default': 'Wprowadź poprawny numer CVV'
        },
        date: {
            'default': 'Wprowadź poprawną datę'
        },
        different: {
            'default': 'Wprowadź inną wartość'
        },
        digits: {
             'default': 'Wprowadź tylko cyfry'
        },
        ean: {
            'default': 'Wprowadź poprawny numer EAN'
        },
        emailAddress: {
            'default': 'Wprowadź poprawny adres e-mail'
        },
        file: {
            'default': 'Wybierz prawidłowy plik'
        },
        greaterThan: {
            'default': 'Wprowadź wartość większą bądź równą %s',
            notInclusive: 'Wprowadź wartość większą niż %s'
        },
        grid: {
            'default': 'Wprowadź poprawny numer GRId'
        },
        hex: {
            'default': 'Wprowadź poprawną liczbę w formacie heksadecymalnym'
        },
        hexColor: {
            'default': 'Wprowadź poprawny kolor w formacie hex'
        },
        iban: {
            'default': 'Wprowadź poprawny numer IBAN',
            countryNotSupported: 'Kod kraju %s nie jest obsługiwany',
            country: 'Wprowadź poprawny numer IBAN w kraju %s',
            countries: {
                AD: 'Andora',
                AE: 'Zjednoczone Emiraty Arabskie',
                AL: 'Albania',
                AO: 'Angola',
                AT: 'Austria',
                AZ: 'Azerbejdżan',
                BA: 'Bośnia i Hercegowina',
                BE: 'Belgia',
                BF: 'Burkina Faso',
                BG: 'Bułgaria',
                BH: 'Bahrajn',
                BI: 'Burundi',
                BJ: 'Benin',
                BR: 'Brazylia',
                CH: 'Szwajcaria',
                CI: 'Wybrzeże Kości Słoniowej',
                CM: 'Kamerun',
                CR: 'Kostaryka',
                CV: 'Republika Zielonego Przylądka',
                CY: 'Cypr',
                CZ: 'Czechy',
                DE: 'Niemcy',
                DK: 'Dania',
                DO: 'Dominikana',
                DZ: 'Algeria',
                EE: 'Estonia',
                ES: 'Hiszpania',
                FI: 'Finlandia',
                FO: 'Wyspy Owcze',
                FR: 'Francja',
                GB: 'Wielka Brytania',
                GE: 'Gruzja',
                GI: 'Gibraltar',
                GL: 'Grenlandia',
                GR: 'Grecja',
                GT: 'Gwatemala',
                HR: 'Chorwacja',
                HU: 'Węgry',
                IE: 'Irlandia',
                IL: 'Izrael',
                IR: 'Iran',
                IS: 'Islandia',
                IT: 'Włochy',
                JO: 'Jordania',
                KW: 'Kuwejt',
                KZ: 'Kazahstan',
                LB: 'Liban',
                LI: 'Liechtenstein',
                LT: 'Litwa',
                LU: 'Luksemburg',
                LV: 'Łotwa',
                MC: 'Monako',
                MD: 'Mołdawia',
                ME: 'Czarnogóra',
                MG: 'Madagaskar',
                MK: 'Macedonia',
                ML: 'Mali',
                MR: 'Mauretania',
                MT: 'Malta',
                MU: 'Mauritius',
                MZ: 'Mozambik',
                NL: 'Holandia',
                NO: 'Norwegia',
                PK: 'Pakistan',
                PL: 'Polska',
                PS: 'Palestyna',
                PT: 'Portugalia',
                QA: 'Katar',
                RO: 'Rumunia',
                RS: 'Serbia',
                SA: 'Arabia Saudyjska',
                SE: 'Szwecja',
                SI: 'Słowenia',
                SK: 'Słowacja',
                SM: 'San Marino',
                SN: 'Senegal',
                TN: 'Tunezja',
                TR: 'Turcja',
                VG: 'Brytyjskie Wyspy Dziewicze'
            }
        },
        id: {
            'default': 'Wprowadź poprawny numer identyfikacyjny',
            countryNotSupported: 'Kod kraju %s nie jest obsługiwany',
            country: 'Wprowadź poprawny %s numer identyfikacyjny',
            countries: {
                BA: 'bośniacki',
                BG: 'bułgarski',
                BR: 'brazylijski',
                CH: 'szwecki',
                CL: 'czilijski',
                CZ: 'czeski',
                DK: 'duński',
                EE: 'estoński',
                ES: 'hiszpański',
                FI: 'fiński',
                HR: 'chorwacki',
                IE: 'irlandzki',
                IS: 'islandski',
                LT: 'litewski',
                LV: 'łotewski',
                ME: 'czarnogórski',
                MK: 'macedoński',
                NL: 'holenderski',
                RO: 'rumuński',
                RS: 'serbski',
                SE: 'szwedźki',
                SI: 'słoweński',
                SK: 'słowacki',
                SM: 'san Marino',
                ZA: 'południowo Afrykański'
            }
        },
        identical: {
            'default': 'Wprowadź taką samą wartość'
        },
        imei: {
            'default': 'Wprowadź poprawny numer IMEI'
        },
        imo: {
            'default': 'Wprowadź poprawny numer IMO'
        },
        integer: {
            'default': 'Wprowadź poprawną liczbę całkowitą'
        },
        ip: {
            'default': 'Wprowadź poprawny adres IP',
            ipv4: 'Wprowadź poprawny adres IPv4',
            ipv6: 'Wprowadź poprawny adres IPv6'
        },
        isbn: {
            'default': 'Wprowadź poprawny numer ISBN'
        },
        isin: {
            'default': 'Wprowadź poprawny numer ISIN'
        },
        ismn: {
            'default': 'Wprowadź poprawny numer ISMN'
        },
        issn: {
            'default': 'Wprowadź poprawny numer ISSN'
        },
        lessThan: {
            'default': 'Wprowadź wartość mniejszą bądź równą %s',
            notInclusive: 'Wprowadź wartość mniejszą niż %s'
        },
        mac: {
            'default': 'Wprowadź poprawny adres MAC'
        },
        meid: {
            'default': 'Wprowadź poprawny numer MEID'
        },
        notEmpty: {
            'default': 'Wprowadź wartość, pole nie może być puste'
        },
        numeric: {
            'default': 'Wprowadź poprawną liczbę zmiennoprzecinkową'
        },
        phone: {
            'default': 'Wprowadź poprawny numer telefonu',
            countryNotSupported: 'Kod kraju %s nie jest wspierany',
            country: 'Wprowadź poprawny numer telefonu w kraju %s',
            countries: {
                BR: 'Brazylia',
                ES: 'Hiszpania',
                FR: 'Francja',
                GB: 'Wielka Brytania',
                MA: 'Maroko',
                PK: 'Pakistan',
                US: 'USA'
            }
        },
        regexp: {
            'default': 'Wprowadź wartość pasującą do wzoru'
        },
        remote: {
            'default': 'Wprowadź poprawną wartość'
        },
        rtn: {
            'default': 'Wprowadź poprawny numer RTN'
        },
        sedol: {
            'default': 'Wprowadź poprawny numer SEDOL'
        },
        siren: {
            'default': 'Wprowadź poprawny numer SIREN'
        },
        siret: {
            'default': 'Wprowadź poprawny numer SIRET'
        },
        step: {
            'default': 'Wprowadź wielokrotność %s'
        },
        stringCase: {
            'default': 'Wprowadź tekst składającą się tylko z małych liter',
            upper: 'Wprowadź tekst składający się tylko z dużych liter'
        },
        stringLength: {
            'default': 'Wprowadź wartość o poprawnej długości',
            less: 'Wprowadź mniej niż %s znaków',
            more: 'Wprowadź więcej niż %s znaków',
            between: 'Wprowadź wartość składająca się z min %s i max %s znaków'
        },
        uri: {
            'default': 'Wprowadź poprawny URI'
        },
        uuid: {
            'default': 'Wprowadź poprawny numer UUID',
            version: 'Wprowadź poprawny numer UUID w wersji %s'
        },
        vat: {
            'default': 'Wprowadź poprawny numer VAT',
            countryNotSupported: 'Kod kraju %s nie jest wsperany',
            country: 'Wprowadź poprawny %s numer VAT',
            countries: {
                AT: 'austryjacki',
                BE: 'belgijski',
                BG: 'bułgarski',
                BR: 'brazylijski',
                CH: 'szwecki',
                CY: 'cypryjski',
                CZ: 'czeski',
                DE: 'niemiecki',
                DK: 'duński',
                EE: 'estoński',
                ES: 'hiszpański',
                FI: 'fiński',
                FR: 'francuski',
                GB: 'brytyjski',
                GR: 'grecki',
                EL: 'grecki',
                HU: 'węgierski',
                HR: 'chorwacki',
                IE: 'irlandzki',
                IS: 'Islandia',
                IT: 'włoski',
                LT: 'litewski',
                LU: 'luksemburski',
                LV: 'łoteweski',
                MT: 'maltejski',
                NL: 'holenderski',
                NO: 'norweski',
                PL: 'polski',
                PT: 'portugalski',
                RO: 'rumuński',
                RU: 'rosyjski',
                RS: 'serbski',
                SE: 'szwedzki',
                SI: 'słoweński',
                SK: 'słowacki',
                ZA: 'południowo Afrykański'
            }
        },
        vin: {
            'default': 'Wprowadź poprawny numer VIN'
        },
        zipCode: {
            'default': 'Wprowadź poprawny kod pocztowy',
            countryNotSupported: 'Kod kraju %s nie jest obsługiwany',
            country: 'Wprowadź poprawny %s kod pocztowy',
            countries: {
                BR: 'brazylijski',
                CA: 'kanadyski',
                DK: 'duński',
                GB: 'brytyjski',
                IT: 'włoski',
                MA: 'Maroko',
                NL: 'holenderski',
                SE: 'szwecki',
                SG: 'singapurski',
                US: 'w USA'
            }
        }
    });
}(window.jQuery));

(function($) {
    /**
     * German language package
     * Translated by @logemann
     */
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n, {
        base64: {
            'default': 'Bitte eine Base64 Kodierung eingeben'
        },
        between: {
            'default': 'Bitte einen Wert zwischen %s und %s eingeben',
            notInclusive: 'Bitte einen Wert zwischen %s und %s (strictly) eingeben'
        },
        callback: {
            'default': 'Bitte einen gültigen Wert eingeben'
        },
        choice: {
            'default': 'Bitte einen gültigen Wert eingeben',
            less: 'Bitte mindestens %s Werte eingeben',
            more: 'Bitte maximal %s Werte eingeben',
            between: 'Zwischen %s - %s Werten wählen'
        },
        creditCard: {
            'default': 'Bitte gültige Kreditkartennr. eingeben'
        },
        cusip: {
            'default': 'Bitte gültige CUSIP Nummer eingeben'
        },
        cvv: {
            'default': 'Bitte gültige CVV Nummer eingeben'
        },
        date: {
            'default': 'Bitte gültiges Datum eingeben'
        },
        different: {
            'default': 'Bitte anderen Wert eingeben'
        },
        digits: {
             'default': 'Bitte Zahlen eingeben'
        },
        ean: {
            'default': 'Bitte gültige EAN Nummer eingeben'
        },
        emailAddress: {
            'default': 'Bitte gültige Emailadresse eingeben'
        },
        file: {
            'default': 'Bitte gültiges File eingeben'
        },
        greaterThan: {
            'default': 'Bitte Wert größer gleich %s eingeben',
            notInclusive: 'Bitte Wert größer als %s eingeben'
        },
        grid: {
            'default': 'Bitte gültige GRId Nummer eingeben'
        },
        hex: {
            'default': 'Bitte gültigen Hexadezimalwert eingeben'
        },
        hexColor: {
            'default': 'Bitte gültige Hex-Farbe eingeben'
        },
        iban: {
            'default': 'Bitte eine gültige IBAN Nummer eingeben',
            countryNotSupported: 'Der Ländercode %s wird nicht unterstützt',
            country: 'Bitte eine gültige IBAN Nummer für %s eingeben',
            countries: {
                AD: 'Andorra',
                AE: 'Vereinigte Arabische Emirate',
                AL: 'Albanien',
                AO: 'Angola',
                AT: 'Österreich',
                AZ: 'Azerbaijan',
                BA: 'Bosnien Herzigovina',
                BE: 'Belgien',
                BF: 'Burkina Faso',
                BG: 'Bulgarien',
                BH: 'Bahrain',
                BI: 'Burundi',
                BJ: 'Benin',
                BR: 'Brasilien',
                CH: 'Schweiz',
                CI: 'Elfenbeinküste',
                CM: 'Kamerun',
                CR: 'Costa Rica',
                CV: 'Cape Verde',
                CY: 'Zypern',
                CZ: 'Tschechische Repuplik',
                DE: 'Deutschland',
                DK: 'Dänemark',
                DO: 'Dominikanische Republik',
                DZ: 'Algerien',
                EE: 'Estland',
                ES: 'Spanien',
                FI: 'Finnland',
                FO: 'Faroer Inseln',
                FR: 'Frankreich',
                GB: 'Großbritanien',
                GE: 'Georgien',
                GI: 'Gibraltar',
                GL: 'Grönland',
                GR: 'Griechenland',
                GT: 'Guatemala',
                HR: 'Kroatien',
                HU: 'Ungarn',
                IE: 'Irland',
                IL: 'Israel',
                IR: 'Iran',
                IS: 'Island',
                IT: 'Italien',
                JO: 'Jordanien',
                KW: 'Kuwait',
                KZ: 'Kazakhstan',
                LB: 'Libanon',
                LI: 'Liechtenstein',
                LT: 'Lithauen',
                LU: 'Luxemburg',
                LV: 'Lettland',
                MC: 'Monaco',
                MD: 'Moldavien',
                ME: 'Montenegro',
                MG: 'Madagascar',
                MK: 'Mazedonien',
                ML: 'Mali',
                MR: 'Mauritanien',
                MT: 'Malta',
                MU: 'Mauritius',
                MZ: 'Mozambique',
                NL: 'Niederlande',
                NO: 'Norwegen',
                PK: 'Pakistan',
                PL: 'Polen',
                PS: 'Palästina',
                PT: 'Portugal',
                QA: 'Qatar',
                RO: 'Rumänien',
                RS: 'Serbien',
                SA: 'Saudi Arabien',
                SE: 'Schweden',
                SI: 'Slovenien',
                SK: 'Slovakai',
                SM: 'San Marino',
                SN: 'Senegal',
                TN: 'Tunesien',
                TR: 'Türkey',
                VG: 'Jungfraueninseln'
            }
        },
        id: {
            'default': 'Bitte gültige Identifikationsnnummer eingeben',
            countryNotSupported: 'Der Ländercode %s wird nicht unterstützt',
            country: 'Bitte für %s gültige Identifikationsnummer eingeben',
            countries: {
                BA: 'Bosnien und Herzegovina',
                BG: 'Bulgarisch',
                BR: 'Brasilianisch',
                CH: 'Schweizerisch',
                CL: 'Chilenisch',
                CZ: 'Tschechisch',
                DK: 'Dänisch',
                EE: 'Estnisch',
                ES: 'Spanisch',
                FI: 'Finnisch',
                HR: 'Kroatisch',
                IE: 'Irisch',
                IS: 'Isländisch',
                LT: 'Lithauisch',
                LV: 'Latvian',
                ME: 'Montenegrien',
                MK: 'Mazedonisch',
                NL: 'Niederländisch',
                RO: 'Rumänisch',
                RS: 'Serbisch',
                SE: 'Schwedisch',
                SI: 'Slowensich',
                SK: 'Slowakisch',
                SM: 'San Marino',
                ZA: 'Süd Afrikanisch'
            }
        },
        identical: {
            'default': 'Bitte gleichen Wert eingeben'
        },
        imei: {
            'default': 'Bitte gültige IMEI Nummer eingeben'
        },
        imo: {
            'default': 'Bitte gültige IMO Nummer eingeben'
        },
        integer: {
            'default': 'Bitte Zahl eingeben'
        },
        ip: {
            'default': 'Bitte  gültige IP-Adresse eingeben',
            ipv4: 'Bitte  gültige IPv4 Adresse eingeben',
            ipv6: 'Bitte  gültige IPv6 Adresse eingeben'
        },
        isbn: {
            'default': 'Bitte gültige ISBN Nummer eingeben'
        },
        isin: {
            'default': 'Bitte gültige ISIN Nummer eingeben'
        },
        ismn: {
            'default': 'Bitte gültige ISMN Nummer eingeben'
        },
        issn: {
            'default': 'Bitte gültige ISSN Nummer eingeben'
        },
        lessThan: {
            'default': 'Bitte Wert kleiner gleich %s eingeben',
            notInclusive: 'Bitte Wert kleiner als %s eingeben'
        },
        mac: {
            'default': 'Bitte gültige MAC Adresse eingeben'
        },
        meid: {
            'default': 'Bitte gültige MEID Nummer eingeben'
        },
        notEmpty: {
            'default': 'Bitte Wert eingeben'
        },
        numeric: {
            'default': 'Bitte Nummer eingeben'
        },
        phone: {
            'default': 'Bitte gültige Telefonnummer eingeben',
            countryNotSupported: 'Der Ländercode %s wird nicht unterstützt',
            country: 'Bitte valide Telefonnummer für %s eingeben',
            countries: {
                BR: 'Brasilien',
                ES: 'Spanien',
                FR: 'Frankreich',
                GB: 'Vereinigtes Königreich',
                MA: 'Marokko',
                PK: 'Pakistan',
                US: 'Vereinigte Staaten'
            }
        },
        regexp: {
            'default': 'Bitte Wert eingeben, der der Maske entspricht'
        },
        remote: {
            'default': 'Bitte einen gültigen Wert eingeben'
        },
        rtn: {
            'default': 'Bitte gültige RTN Nummer eingeben'
        },
        sedol: {
            'default': 'Bitte gültige SEDOL Nummer eingeben'
        },
        siren: {
            'default': 'Bitte gültige SIREN Nummer eingeben'
        },
        siret: {
            'default': 'Bitte gültige SIRET Nummer eingeben'
        },
        step: {
            'default': 'Bitte einen gültigen Schritt von %s eingeben'
        },
        stringCase: {
            'default': 'Bitte nur Kleinbuchstaben eingeben',
            upper: 'Bitte nur Großbuchstaben eingeben'
        },
        stringLength: {
            'default': 'Bitte Wert mit gültiger Länge eingeben',
            less: 'Bitte weniger als %s Zeichen eingeben',
            more: 'Bitte mehr als %s Zeichen eingeben',
            between: 'Bitte Wert zwischen %s und %s Zeichen eingeben'
        },
        uri: {
            'default': 'Bitte gültige URI eingeben'
        },
        uuid: {
            'default': 'Bitte gültige UUID Nummer eingeben',
            version: 'Bitte gültige UUID Version %s eingeben'
        },
        vat: {
            'default': 'Bitte gültige VAT Nummer eingeben',
            countryNotSupported: 'Der Ländercode %s wird nicht unterstützt',
            country: 'Bitte gültige %s VAT Nummer eingeben',
            countries: {
                AT: 'Österreich',
                BE: 'Belgisch',
                BG: 'Bulgarisch',
                BR: 'Brasilianisch',
                CH: 'Schweiz',
                CY: 'Zypriotisch',
                CZ: 'Tschechisch',
                DE: 'Deutsch',
                DK: 'Dänisch',
                EE: 'Estnisch',
                ES: 'Spanisch',
                FI: 'Finnisch',
                FR: 'Französisch',
                GB: 'Englisch (UK)',
                GR: 'Griechisch',
                EL: 'Griechisch',
                HU: 'Ungarisch',
                HR: 'Kroatisch',
                IE: 'Irisch',
                IS: 'Island',
                IT: 'Italienisch',
                LT: 'Lithauisch',
                LU: 'Luxemburgerisch',
                LV: 'Lettisch',
                MT: 'Maltesisch',
                NL: 'Niederländisch',
                NO: 'Norwegisch',
                PL: 'Polnisch',
                PT: 'Portugiesisch',
                RO: 'Rumänisch',
                RU: 'Russisch',
                RS: 'Serbisch',
                SE: 'Schwedisch',
                SI: 'Slowenisch',
                SK: 'Slowakisch',
                ZA: 'Süd Afrikanisch'
            }
        },
        vin: {
            'default': 'Bitte gültige VIN Nummer eingeben'
        },
        zipCode: {
            'default': 'Bitte gültige PLZ eingeben',
            countryNotSupported: 'Der Ländercode %s wird nicht unterstützt',
            country: 'Bitte gültigen Code %s eingeben',
            countries: {
                BR: 'Brasilianisch Postleitzahl',
                CA: 'Kanadische Postleitzahl',
                DK: 'Dänische Postleitzahl',
                GB: 'Englische Postleitzahl',
                IT: 'Italienische Postleitzahl',
                MA: 'Marokkanisch Postleitzahl',
                NL: 'Niederländische Postleitzahl',
                SE: 'Schweizerische Postleitzahl',
                SG: 'Singapurische Postleitzahl',
                US: 'Vereinigte Staaten Postleitzahl'
            }
        }
    });
}(window.jQuery));

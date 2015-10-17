(function($) {
    /**
     * Belgium (Dutch) language package
     * Translated by @dokterpasta. Improved by @jdt
     */
    FormValidation.I18n = $.extend(true, FormValidation.I18n, {
        'be_NL': {
            base64: {
                'default': 'Geef een geldige base 64 geëncodeerde tekst in'
            },
            between: {
                'default': 'Geef een waarde in van %s tot en met %s',
                notInclusive: 'Geef een waarde in van %s tot %s'
            },
            bic: {
                'default': 'Geef een geldig BIC-nummer in'
            },
            callback: {
                'default': 'Geef een geldige waarde in'
            },
            choice: {
                'default': 'Geef een geldige waarde in',
                less: 'Kies minimaal %s opties',
                more: 'Kies maximaal %s opties',
                between: 'Kies tussen de %s en %s opties'
            },
            color: {
                'default': 'Geef een geldige kleurcode in'
            },
            creditCard: {
                'default': 'Geef een geldig kredietkaartnummer in'
            },
            cusip: {
                'default': 'Geef een geldig CUSIP-nummer in'
            },
            cvv: {
                'default': 'Geef een geldig CVV-nummer in'
            },
            date: {
                'default': 'Geef een geldige datum in',
                min: 'Geef een datum in die na %s ligt',
                max: 'Geef een datum in die voor %s ligt',
                range: 'Geef een datum in die tussen %s en %s ligt'
            },
            different: {
                'default': 'Geef een andere waarde in'
            },
            digits: {
                'default': 'Geef alleen cijfers in'
            },
            ean: {
                'default': 'Geef een geldig EAN-nummer in'
            },
            ein: {
                'default': 'Geef een geldig EIN-nummer in'
            },
            emailAddress: {
                'default': 'Geef een geldig emailadres op'
            },
            file: {
                'default': 'Kies een geldig bestand'
            },
            greaterThan: {
                'default': 'Geef een waarde in die gelijk is aan of groter is dan %s',
                notInclusive: 'Geef een waarde in die groter is dan %s'
            },
            grid: {
                'default': 'Geef een geldig GRID-nummer in'
            },
            hex: {
                'default': 'Geef een geldig hexadecimaal nummer in'
            },
            iban: {
                'default': 'Geef een geldig IBAN-nummer in',
                country: 'Geef een geldig IBAN-nummer in uit %s',
                countries: {
                    AD: 'Andorra',
                    AE: 'Verenigde Arabische Emiraten',
                    AL: 'Albania',
                    AO: 'Angola',
                    AT: 'Oostenrijk',
                    AZ: 'Azerbeidzjan',
                    BA: 'Bosnië en Herzegovina',
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
                    CZ: 'Tsjechische',
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
                'default': 'Geef een geldig identificatienummer in',
                country: 'Geef een geldig identificatienummer in uit %s',
                countries: {
                    BA: 'Bosnië en Herzegovina',
                    BG: 'Bulgarije',
                    BR: 'Brazilië',
                    CH: 'Zwitserland',
                    CL: 'Chili',
                    CN: 'China',
                    CZ: 'Tsjechische',
                    DK: 'Denemarken',
                    EE: 'Estland',
                    ES: 'Spanje',
                    FI: 'Finland',
                    HR: 'Kroatië',
                    IE: 'Ierland',
                    IS: 'IJsland',
                    LT: 'Litouwen',
                    LV: 'Letland',
                    ME: 'Montenegro',
                    MK: 'Macedonië',
                    NL: 'Nederland',
                    PL: 'Polen',
                    RO: 'Roemenië',
                    RS: 'Servië',
                    SE: 'Zweden',
                    SI: 'Slovenië',
                    SK: 'Slowakije',
                    SM: 'San Marino',
                    TH: 'Thailand',
                    ZA: 'Zuid-Afrika'
                }
            },
            identical: {
                'default': 'Geef dezelfde waarde in'
            },
            imei: {
                'default': 'Geef een geldig IMEI-nummer in'
            },
            imo: {
                'default': 'Geef een geldig IMO-nummer in'
            },
            integer: {
                'default': 'Geef een geldig nummer in'
            },
            ip: {
                'default': 'Geef een geldig IP-adres in',
                ipv4: 'Geef een geldig IPv4-adres in',
                ipv6: 'Geef een geldig IPv6-adres in'
            },
            isbn: {
                'default': 'Geef een geldig ISBN-nummer in'
            },
            isin: {
                'default': 'Geef een geldig ISIN-nummer in'
            },
            ismn: {
                'default': 'Geef een geldig ISMN-nummer in'
            },
            issn: {
                'default': 'Geef een geldig ISSN-nummer in'
            },
            lessThan: {
                'default': 'Geef een waarde in die gelijk is aan of kleiner is dan %s',
                notInclusive: 'Geef een waarde in die kleiner is dan %s'
            },
            mac: {
                'default': 'Geef een geldig MAC-adres in'
            },
            meid: {
                'default': 'Geef een geldig MEID-nummer in'
            },
            notEmpty: {
                'default': 'Geef een waarde in'
            },
            numeric: {
                'default': 'Geef een geldig kommagetal in'
            },
            phone: {
                'default': 'Geef een geldig telefoonnummer in',
                country: 'Geef een geldig telefoonnummer in uit %s',
                countries: {
                    AE: 'Verenigde Arabische Emiraten',
                    BG: 'Bulgarije',
                    BR: 'Brazilië',
                    CN: 'China',
                    CZ: 'Tsjechische',
                    DE: 'Duitsland',
                    DK: 'Denemarken',
                    ES: 'Spanje',
                    FR: 'Frankrijk',
                    GB: 'Verenigd Koninkrijk',
                    IN: 'Indië',
                    MA: 'Marokko',
                    NL: 'Nederland',
                    PK: 'Pakistan',
                    RO: 'Roemenië',
                    RU: 'Rusland',
                    SK: 'Slowakije',
                    TH: 'Thailand',
                    US: 'VS',
                    VE: 'Venezuela'
                }
            },
            regexp: {
                'default': 'Geef een waarde in die overeenkomt met het patroon'
            },
            remote: {
                'default': 'Geef een geldige waarde in'
            },
            rtn: {
                'default': 'Geef een geldig RTN-nummer in'
            },
            sedol: {
                'default': 'Geef een geldig SEDOL-nummer in'
            },
            siren: {
                'default': 'Geef een geldig SIREN-nummer in'
            },
            siret: {
                'default': 'Geef een geldig SIRET-nummer in'
            },
            step: {
                'default': 'Geef een geldig meervoud in van %s'
            },
            stringCase: {
                'default': 'Geef enkel kleine letters in',
                upper: 'Geef enkel hoofdletters in'
            },
            stringLength: {
                'default': 'Geef een waarde in met de juiste lengte',
                less: 'Geef minder dan %s karakters in',
                more: 'Geef meer dan %s karakters in',
                between: 'Geef tussen %s en %s karakters in'
            },
            uri: {
                'default': 'Geef een geldige URI in'
            },
            uuid: {
                'default': 'Geef een geldig UUID-nummer in',
                version: 'Geef een geldig UUID-nummer (versie %s) in'
            },
            vat: {
                'default': 'Geef een geldig BTW-nummer in',
                country: 'Geef een geldig BTW-nummer in uit %s',
                countries: {
                    AT: 'Oostenrijk',
                    BE: 'België',
                    BG: 'Bulgarije',
                    BR: 'Brazilië',
                    CH: 'Zwitserland',
                    CY: 'Cyprus',
                    CZ: 'Tsjechische',
                    DE: 'Duitsland',
                    DK: 'Denemarken',
                    EE: 'Estland',
                    ES: 'Spanje',
                    FI: 'Finland',
                    FR: 'Frankrijk',
                    GB: 'Verenigd Koninkrijk',
                    GR: 'Griekenland',
                    EL: 'Griekenland',
                    HU: 'Hongarije',
                    HR: 'Kroatië',
                    IE: 'Ierland',
                    IS: 'IJsland',
                    IT: 'Italië',
                    LT: 'Litouwen',
                    LU: 'Luxemburg',
                    LV: 'Letland',
                    MT: 'Malta',
                    NL: 'Nederland',
                    NO: 'Noorwegen',
                    PL: 'Polen',
                    PT: 'Portugal',
                    RO: 'Roemenië',
                    RU: 'Rusland',
                    RS: 'Servië',
                    SE: 'Zweden',
                    SI: 'Slovenië',
                    SK: 'Slowakije',
                    VE: 'Venezuela',
                    ZA: 'Zuid-Afrika'
                }
            },
            vin: {
                'default': 'Geef een geldig VIN-nummer in'
            },
            zipCode: {
                'default': 'Geef een geldige postcode in',
                country: 'Geef een geldige postcode in uit %s',
                countries: {
                    AT: 'Oostenrijk',
                    BG: 'Bulgarije',
                    BR: 'Brazilië',
                    CA: 'Canada',
                    CH: 'Zwitserland',
                    CZ: 'Tsjechische',
                    DE: 'Duitsland',
                    DK: 'Denemarken',
                    ES: 'Spanje',
                    FR: 'Frankrijk',
                    GB: 'Verenigd Koninkrijk',
                    IE: 'Ierland',
                    IN: 'Indië',
                    IT: 'Italië',
                    MA: 'Marokko',
                    NL: 'Nederland',
                    PL: 'Polen',
                    PT: 'Portugal',
                    RO: 'Roemenië',
                    RU: 'Rusland',
                    SE: 'Zweden',
                    SG: 'Singapore',
                    SK: 'Slowakije',
                    US: 'VS'
                }
            }
        }
    });
}(jQuery));

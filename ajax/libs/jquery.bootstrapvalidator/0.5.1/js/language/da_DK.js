(function($) {
    /**
     * Danish language package (No, it ain't cake!)
     * Translated by @Djarnis
     */
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n, {
        base64: {
            'default': 'Udfyld venligst dette felt med en gyldig base64-kodet værdi'
        },
        between: {
            'default': 'Udfyld venligst dette felt med en værdi mellem %s og %s',
            notInclusive: 'Indtast venligst kun en værdi mellem %s og %s'
        },
        callback: {
            'default': 'Udfyld venligst dette felt med en gyldig værdi'
        },
        choice: {
            'default': 'Udfyld venligst dette felt med en gyldig værdi',
            less: 'Vælg venligst mindst %s valgmuligheder',
            more: 'Vælg venligst højst %s valgmuligheder',
            between: 'Vælg venligst %s - %s valgmuligheder'
        },
        creditCard: {
            'default': 'Udfyld venligst dette felt med et gyldigt kreditkort-nummer'
        },
        cusip: {
            'default': 'Udfyld venligst dette felt med et gyldigt CUSIP-nummer'
        },
        cvv: {
            'default': 'Udfyld venligst dette felt med et gyldigt CVV-nummer'
        },
        date: {
            'default': 'Udfyld venligst dette felt med en gyldig dato'
        },
        different: {
            'default': 'Udfyld venligst dette felt med en anden værdi'
        },
        digits: {
             'default': 'Indtast venligst kun cifre'
        },
        ean: {
            'default': 'Udfyld venligst dette felt med et gyldigt EAN-nummer'
        },
        emailAddress: {
            'default': 'Udfyld venligst dette felt med en gyldig e-mail-adresse'
        },
        file: {
            'default': 'Vælg venligst en gyldig fil'
        },
        greaterThan: {
            'default': 'Udfyld venligst dette felt med en værdi større eller lig med %s',
            notInclusive: 'Udfyld venligst dette felt med en værdi større end %s'
        },
        grid: {
            'default': 'Udfyld venligst dette felt med et gyldigt GRId-nummer'
        },
        hex: {
            'default': 'Udfyld venligst dette felt med et gyldigt hexadecimal-nummer'
        },
        hexColor: {
            'default': 'Udfyld venligst dette felt med en gyldig hex-farve'
        },
        iban: {
            'default': 'Udfyld venligst dette felt med et gyldigt IBAN-nummer',
            countryNotSupported: 'Landekoden %s understøttes desværre ikke',
            country: 'Udfyld venligst dette felt med et gyldigt IBAN-nummer i %s',
            countries: {
                AD: 'Andorra',
                AE: 'De Forenede Arabiske Emirater',
                AL: 'Albanien',
                AO: 'Angola',
                AT: 'Østrig',
                AZ: 'Aserbajdsjan',
                BA: 'Bosnien-Hercegovina',
                BE: 'Belgien',
                BF: 'Burkina Faso',
                BG: 'Bulgaria',
                BH: 'Bahrain',
                BI: 'Burundi',
                BJ: 'Benin',
                BR: 'Brasilien',
                CH: 'Schweiz',
                CI: 'Elfenbenskysten',
                CM: 'Cameroun',
                CR: 'Costa Rica',
                CV: 'Kap Verde',
                CY: 'Cypern',
                CZ: 'Tjekkiet',
                DE: 'Tyskland',
                DK: 'Danmark',
                DO: 'Den Dominikanske Republik',
                DZ: 'Algeriet',
                EE: 'Estland',
                ES: 'Spanien',
                FI: 'Finland',
                FO: 'Færøerne',
                FR: 'Frankrig',
                GB: 'Storbritannien',
                GE: 'Georgien',
                GI: 'Gibraltar',
                GL: 'Grønland',
                GR: 'Grækenland',
                GT: 'Guatemala',
                HR: 'Kroatien',
                HU: 'Ungarn',
                IE: 'Irland',
                IL: 'Israel',
                IR: 'Iran',
                IS: 'Island',
                IT: 'Italien',
                JO: 'Jordan',
                KW: 'Kuwait',
                KZ: 'Kasakhstan',
                LB: 'Libanon',
                LI: 'Liechtenstein',
                LT: 'Litauen',
                LU: 'Luxembourg',
                LV: 'Letland',
                MC: 'Monaco',
                MD: 'Moldova',
                ME: 'Montenegro',
                MG: 'Madagaskar',
                MK: 'Makedonien',
                ML: 'Mali',
                MR: 'Mauretanien',
                MT: 'Malta',
                MU: 'Mauritius',
                MZ: 'Mozambique',
                NL: 'Holland',
                NO: 'Norge',
                PK: 'Pakistan',
                PL: 'Polen',
                PS: 'Palæstina',
                PT: 'Portugal',
                QA: 'Qatar',
                RO: 'Rumænien',
                RS: 'Serbien',
                SA: 'Saudi-Arabien',
                SE: 'Sverige',
                SI: 'Slovenien',
                SK: 'Slovakiet',
                SM: 'San Marino',
                SN: 'Senegal',
                TN: 'Tunesien',
                TR: 'Tyrkiet',
                VG: 'Britiske Jomfruøer'
            }
        },
        id: {
            'default': 'Udfyld venligst dette felt med et gyldigt identifikations-nummer',
            countryNotSupported: 'Landekoden %s understøttes desværre ikke',
            country: 'Udfyld venligst dette felt med et gyldigt %s identifikations-nummer',
            countries: {
                BA: 'Bosnien-Hercegovinsk',
                BG: 'bulgarsk',
                BR: 'brasiliansk',
                CH: 'schweizisk',
                CL: 'chilliensk',
                CZ: 'tjekkisk',
                DK: 'dansk',
                EE: 'estisk',
                ES: 'spansk',
                FI: 'finsk',
                HR: 'kroatisk',
                IE: 'irsk',
                IS: 'islandsk',
                LT: 'litauisk',
                LV: 'lettisk',
                ME: 'montenegroiansk',
                MK: 'makedonsk',
                NL: 'hollandsk',
                RO: 'romænsk',
                RS: 'serbisk',
                SE: 'svensk',
                SI: 'slovensk',
                SK: 'slovakisk',
                SM: 'sammarinesisk',
                ZA: 'sydafrikansk'
            }
        },
        identical: {
            'default': 'Udfyld venligst dette felt med den samme værdi'
        },
        imei: {
            'default': 'Udfyld venligst dette felt med et gyldigt IMEI-nummer'
        },
        imo: {
            'default': 'Udfyld venligst dette felt med et gyldigt IMO-nummer'
        },
        integer: {
            'default': 'Udfyld venligst dette felt med et gyldigt tal'
        },
        ip: {
            'default': 'Udfyld venligst dette felt med en gyldig IP adresse',
            ipv4: 'Udfyld venligst dette felt med en gyldig IPv4 adresse',
            ipv6: 'Udfyld venligst dette felt med en gyldig IPv6 adresse'
        },
        isbn: {
            'default': 'Udfyld venligst dette felt med et gyldigt ISBN-nummer'
        },
        isin: {
            'default': 'Udfyld venligst dette felt med et gyldigt ISIN-nummer'
        },
        ismn: {
            'default': 'Udfyld venligst dette felt med et gyldigt ISMN-nummer'
        },
        issn: {
            'default': 'Udfyld venligst dette felt med et gyldigt ISSN-nummer'
        },
        lessThan: {
            'default': 'Udfyld venligst dette felt med en værdi mindre eller lig med %s',
            notInclusive: 'Udfyld venligst dette felt med en værdi mindre end %s'
        },
        mac: {
            'default': 'Udfyld venligst dette felt med en gyldig MAC adresse'
        },
        meid: {
            'default': 'Udfyld venligst dette felt med et gyldigt MEID-nummer'
        },
        notEmpty: {
            'default': 'Udfyld venligst dette felt'
        },
        numeric: {
            'default': 'Udfyld venligst dette felt med et gyldigt flydende decimaltal'
        },
        phone: {
            'default': 'Udfyld venligst dette felt med et gyldigt telefonnummer',
            countryNotSupported: 'Landekoden %s understøttes desværre ikke',
            country: 'Udfyld venligst dette felt med et gyldigt telefonnummer i %s',
            countries: {
                BR: 'Brasilien',
                ES: 'Spanien',
                FR: 'Frankrig',
                GB: 'England',
                MA: 'Marokko',
                PK: 'Pakistan',
                US: 'USA'
            }
        },
        regexp: {
            'default': 'Udfyld venligst dette felt med en værdi der matcher mønsteret'
        },
        remote: {
            'default': 'Udfyld venligst dette felt med en gyldig værdi'
        },
        rtn: {
            'default': 'Udfyld venligst dette felt med et gyldigt RTN-nummer'
        },
        sedol: {
            'default': 'Udfyld venligst dette felt med et gyldigt SEDOL-nummer'
        },
        siren: {
            'default': 'Udfyld venligst dette felt med et gyldigt SIREN-nummer'
        },
        siret: {
            'default': 'Udfyld venligst dette felt med et gyldigt SIRET-nummer'
        },
        step: {
            'default': 'Udfyld venligst dette felt med et gyldigt trin af %s'
        },
        stringCase: {
            'default': 'Udfyld venligst kun dette felt med små bogstaver',
            upper: 'Udfyld venligst kun dette felt med store bogstaver'
        },
        stringLength: {
            'default': 'Udfyld venligst dette felt med en værdi af gyldig længde',
            less: 'Udfyld venligst dette felt med mindre end %s tegn',
            more: 'Udfyld venligst dette felt med mere end %s tegn',
            between: 'Udfyld venligst dette felt med en værdi mellem %s og %s tegn'
        },
        uri: {
            'default': 'Udfyld venligst dette felt med en gyldig URI'
        },
        uuid: {
            'default': 'Udfyld venligst dette felt med et gyldigt UUID-nummer',
            version: 'Udfyld venligst dette felt med en gyldig UUID version %s-nummer'
        },
        vat: {
            'default': 'Udfyld venligst dette felt med et gyldig moms-nummer',
            countryNotSupported: 'Landekoden %s understøttes desværre ikke',
            country: 'Udfyld venligst dette felt med et gyldigt %s moms-nummer',
            countries: {
                AT: 'østrigsk',
                BE: 'belgisk',
                BG: 'bulgarsk',
                BR: 'brasiliansk',
                CH: 'schweizisk',
                CY: 'cypriotisk',
                CZ: 'tjekkisk',
                DE: 'tysk',
                DK: 'dansk',
                EE: 'estisk',
                ES: 'spansk',
                FI: 'finsk',
                FR: 'fransk',
                GB: 'engelsk',
                GR: 'græsk',
                EL: 'græsk',
                HU: 'ungarnsk',
                HR: 'kroatisk',
                IE: 'irsk',
                IS: 'island',
                IT: 'italiensk',
                LT: 'litauisk',
                LU: 'luxembourgsk',
                LV: 'lettisk',
                MT: 'maltesisk',
                NL: 'hollandsk',
                NO: 'norsk',
                PL: 'polsk',
                PT: 'portogisisk',
                RO: 'romænsk',
                RU: 'russisk',
                RS: 'serbisk',
                SE: 'svensk',
                SI: 'slovensk',
                SK: 'slovakisk',
                ZA: 'sydafrikansk'
            }
        },
        vin: {
            'default': 'Udfyld venligst dette felt med et gyldigt VIN-nummer'
        },
        zipCode: {
            'default': 'Udfyld venligst dette felt med et gyldigt postnummer',
            countryNotSupported: 'Landekoden %s understøttes desværre ikke',
            country: 'Udfyld venligst dette felt med et gyldigt %s',
            countries: {
                BR: 'brasiliansk postnummer',
                CA: 'canadisk postnummer',
                DK: 'dansk postnummer',
                GB: 'engelsk postnummer',
                IT: 'italiensk postnummer',
                MA: 'Marokko postnummer',
                NL: 'hollandsk postnummer',
                SE: 'svensk postnummer',
                SG: 'singaporeansk postnummer',
                US: 'amerikansk postnummer'
            }
        }
    });
}(window.jQuery));

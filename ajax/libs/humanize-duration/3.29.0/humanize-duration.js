// HumanizeDuration.js - https://git.io/j0HgmQ

// @ts-check

/**
 * @typedef {string | ((unitCount: number) => string)} Unit
 */

/**
 * @typedef {("y" | "mo" | "w" | "d" | "h" | "m" | "s" | "ms")} UnitName
 */

/**
 * @typedef {Object} UnitMeasures
 * @prop {number} y
 * @prop {number} mo
 * @prop {number} w
 * @prop {number} d
 * @prop {number} h
 * @prop {number} m
 * @prop {number} s
 * @prop {number} ms
 */

/**
 * @typedef {Record<"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9", string>} DigitReplacements
 */

/**
 * @typedef {Object} Language
 * @prop {Unit} y
 * @prop {Unit} mo
 * @prop {Unit} w
 * @prop {Unit} d
 * @prop {Unit} h
 * @prop {Unit} m
 * @prop {Unit} s
 * @prop {Unit} ms
 * @prop {string} [decimal]
 * @prop {string} [delimiter]
 * @prop {DigitReplacements} [_digitReplacements]
 * @prop {boolean} [_numberFirst]
 */

/**
 * @typedef {Object} Options
 * @prop {string} [language]
 * @prop {Record<string, Language>} [languages]
 * @prop {string[]} [fallbacks]
 * @prop {string} [delimiter]
 * @prop {string} [spacer]
 * @prop {boolean} [round]
 * @prop {number} [largest]
 * @prop {UnitName[]} [units]
 * @prop {string} [decimal]
 * @prop {string} [conjunction]
 * @prop {number} [maxDecimalPoints]
 * @prop {UnitMeasures} [unitMeasures]
 * @prop {boolean} [serialComma]
 * @prop {DigitReplacements} [digitReplacements]
 */

/**
 * @typedef {Required<Options>} NormalizedOptions
 */

(function () {
  // This has to be defined separately because of a bug: we want to alias
  // `gr` and `el` for backwards-compatiblity. In a breaking change, we can
  // remove `gr` entirely.
  // See https://github.com/EvanHahn/HumanizeDuration.js/issues/143 for more.
  var GREEK = language(
    function (c) {
      return c === 1 ? "χρόνος" : "χρόνια";
    },
    function (c) {
      return c === 1 ? "μήνας" : "μήνες";
    },
    function (c) {
      return c === 1 ? "εβδομάδα" : "εβδομάδες";
    },
    function (c) {
      return c === 1 ? "μέρα" : "μέρες";
    },
    function (c) {
      return c === 1 ? "ώρα" : "ώρες";
    },
    function (c) {
      return c === 1 ? "λεπτό" : "λεπτά";
    },
    function (c) {
      return c === 1 ? "δευτερόλεπτο" : "δευτερόλεπτα";
    },
    function (c) {
      return (c === 1 ? "χιλιοστό" : "χιλιοστά") + " του δευτερολέπτου";
    },
    ","
  );

  /** @type {Record<string, Language>} */
  var LANGUAGES = {
    af: language(
      "jaar",
      function (c) {
        return "maand" + (c === 1 ? "" : "e");
      },
      function (c) {
        return c === 1 ? "week" : "weke";
      },
      function (c) {
        return c === 1 ? "dag" : "dae";
      },
      function (c) {
        return c === 1 ? "uur" : "ure";
      },
      function (c) {
        return c === 1 ? "minuut" : "minute";
      },
      function (c) {
        return "sekonde" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "millisekonde" + (c === 1 ? "" : "s");
      },
      ","
    ),
    ar: assign(
      language(
        function (c) {
          return ["سنة", "سنتان", "سنوات"][getArabicForm(c)];
        },
        function (c) {
          return ["شهر", "شهران", "أشهر"][getArabicForm(c)];
        },
        function (c) {
          return ["أسبوع", "أسبوعين", "أسابيع"][getArabicForm(c)];
        },
        function (c) {
          return ["يوم", "يومين", "أيام"][getArabicForm(c)];
        },
        function (c) {
          return ["ساعة", "ساعتين", "ساعات"][getArabicForm(c)];
        },
        function (c) {
          return ["دقيقة", "دقيقتان", "دقائق"][getArabicForm(c)];
        },
        function (c) {
          return ["ثانية", "ثانيتان", "ثواني"][getArabicForm(c)];
        },
        function (c) {
          return ["جزء من الثانية", "جزآن من الثانية", "أجزاء من الثانية"][
            getArabicForm(c)
          ];
        },
        ","
      ),
      {
        delimiter: " ﻭ ",
        _digitReplacements: ["۰", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
      }
    ),
    bg: language(
      function (c) {
        return ["години", "година", "години"][getSlavicForm(c)];
      },
      function (c) {
        return ["месеца", "месец", "месеца"][getSlavicForm(c)];
      },
      function (c) {
        return ["седмици", "седмица", "седмици"][getSlavicForm(c)];
      },
      function (c) {
        return ["дни", "ден", "дни"][getSlavicForm(c)];
      },
      function (c) {
        return ["часа", "час", "часа"][getSlavicForm(c)];
      },
      function (c) {
        return ["минути", "минута", "минути"][getSlavicForm(c)];
      },
      function (c) {
        return ["секунди", "секунда", "секунди"][getSlavicForm(c)];
      },
      function (c) {
        return ["милисекунди", "милисекунда", "милисекунди"][getSlavicForm(c)];
      },
      ","
    ),
    bn: language(
      "বছর",
      "মাস",
      "সপ্তাহ",
      "দিন",
      "ঘন্টা",
      "মিনিট",
      "সেকেন্ড",
      "মিলিসেকেন্ড"
    ),
    ca: language(
      function (c) {
        return "any" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "mes" + (c === 1 ? "" : "os");
      },
      function (c) {
        return "setman" + (c === 1 ? "a" : "es");
      },
      function (c) {
        return "di" + (c === 1 ? "a" : "es");
      },
      function (c) {
        return "hor" + (c === 1 ? "a" : "es");
      },
      function (c) {
        return "minut" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "segon" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "milisegon" + (c === 1 ? "" : "s");
      },
      ","
    ),
    cs: language(
      function (c) {
        return ["rok", "roku", "roky", "let"][getCzechOrSlovakForm(c)];
      },
      function (c) {
        return ["měsíc", "měsíce", "měsíce", "měsíců"][getCzechOrSlovakForm(c)];
      },
      function (c) {
        return ["týden", "týdne", "týdny", "týdnů"][getCzechOrSlovakForm(c)];
      },
      function (c) {
        return ["den", "dne", "dny", "dní"][getCzechOrSlovakForm(c)];
      },
      function (c) {
        return ["hodina", "hodiny", "hodiny", "hodin"][getCzechOrSlovakForm(c)];
      },
      function (c) {
        return ["minuta", "minuty", "minuty", "minut"][getCzechOrSlovakForm(c)];
      },
      function (c) {
        return ["sekunda", "sekundy", "sekundy", "sekund"][
          getCzechOrSlovakForm(c)
        ];
      },
      function (c) {
        return ["milisekunda", "milisekundy", "milisekundy", "milisekund"][
          getCzechOrSlovakForm(c)
        ];
      },
      ","
    ),
    cy: language(
      "flwyddyn",
      "mis",
      "wythnos",
      "diwrnod",
      "awr",
      "munud",
      "eiliad",
      "milieiliad"
    ),
    da: language(
      "år",
      function (c) {
        return "måned" + (c === 1 ? "" : "er");
      },
      function (c) {
        return "uge" + (c === 1 ? "" : "r");
      },
      function (c) {
        return "dag" + (c === 1 ? "" : "e");
      },
      function (c) {
        return "time" + (c === 1 ? "" : "r");
      },
      function (c) {
        return "minut" + (c === 1 ? "" : "ter");
      },
      function (c) {
        return "sekund" + (c === 1 ? "" : "er");
      },
      function (c) {
        return "millisekund" + (c === 1 ? "" : "er");
      },
      ","
    ),
    de: language(
      function (c) {
        return "Jahr" + (c === 1 ? "" : "e");
      },
      function (c) {
        return "Monat" + (c === 1 ? "" : "e");
      },
      function (c) {
        return "Woche" + (c === 1 ? "" : "n");
      },
      function (c) {
        return "Tag" + (c === 1 ? "" : "e");
      },
      function (c) {
        return "Stunde" + (c === 1 ? "" : "n");
      },
      function (c) {
        return "Minute" + (c === 1 ? "" : "n");
      },
      function (c) {
        return "Sekunde" + (c === 1 ? "" : "n");
      },
      function (c) {
        return "Millisekunde" + (c === 1 ? "" : "n");
      },
      ","
    ),
    el: GREEK,
    en: language(
      function (c) {
        return "year" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "month" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "week" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "day" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "hour" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "minute" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "second" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "millisecond" + (c === 1 ? "" : "s");
      }
    ),
    eo: language(
      function (c) {
        return "jaro" + (c === 1 ? "" : "j");
      },
      function (c) {
        return "monato" + (c === 1 ? "" : "j");
      },
      function (c) {
        return "semajno" + (c === 1 ? "" : "j");
      },
      function (c) {
        return "tago" + (c === 1 ? "" : "j");
      },
      function (c) {
        return "horo" + (c === 1 ? "" : "j");
      },
      function (c) {
        return "minuto" + (c === 1 ? "" : "j");
      },
      function (c) {
        return "sekundo" + (c === 1 ? "" : "j");
      },
      function (c) {
        return "milisekundo" + (c === 1 ? "" : "j");
      },
      ","
    ),
    es: language(
      function (c) {
        return "año" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "mes" + (c === 1 ? "" : "es");
      },
      function (c) {
        return "semana" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "día" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "hora" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "minuto" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "segundo" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "milisegundo" + (c === 1 ? "" : "s");
      },
      ","
    ),
    et: language(
      function (c) {
        return "aasta" + (c === 1 ? "" : "t");
      },
      function (c) {
        return "kuu" + (c === 1 ? "" : "d");
      },
      function (c) {
        return "nädal" + (c === 1 ? "" : "at");
      },
      function (c) {
        return "päev" + (c === 1 ? "" : "a");
      },
      function (c) {
        return "tund" + (c === 1 ? "" : "i");
      },
      function (c) {
        return "minut" + (c === 1 ? "" : "it");
      },
      function (c) {
        return "sekund" + (c === 1 ? "" : "it");
      },
      function (c) {
        return "millisekund" + (c === 1 ? "" : "it");
      },
      ","
    ),
    eu: language(
      "urte",
      "hilabete",
      "aste",
      "egun",
      "ordu",
      "minutu",
      "segundo",
      "milisegundo",
      ","
    ),
    fa: language(
      "سال",
      "ماه",
      "هفته",
      "روز",
      "ساعت",
      "دقیقه",
      "ثانیه",
      "میلی ثانیه"
    ),
    fi: language(
      function (c) {
        return c === 1 ? "vuosi" : "vuotta";
      },
      function (c) {
        return c === 1 ? "kuukausi" : "kuukautta";
      },
      function (c) {
        return "viikko" + (c === 1 ? "" : "a");
      },
      function (c) {
        return "päivä" + (c === 1 ? "" : "ä");
      },
      function (c) {
        return "tunti" + (c === 1 ? "" : "a");
      },
      function (c) {
        return "minuutti" + (c === 1 ? "" : "a");
      },
      function (c) {
        return "sekunti" + (c === 1 ? "" : "a");
      },
      function (c) {
        return "millisekunti" + (c === 1 ? "" : "a");
      },
      ","
    ),
    fo: language(
      "ár",
      function (c) {
        return c === 1 ? "mánaður" : "mánaðir";
      },
      function (c) {
        return c === 1 ? "vika" : "vikur";
      },
      function (c) {
        return c === 1 ? "dagur" : "dagar";
      },
      function (c) {
        return c === 1 ? "tími" : "tímar";
      },
      function (c) {
        return c === 1 ? "minuttur" : "minuttir";
      },
      "sekund",
      "millisekund",
      ","
    ),
    fr: language(
      function (c) {
        return "an" + (c >= 2 ? "s" : "");
      },
      "mois",
      function (c) {
        return "semaine" + (c >= 2 ? "s" : "");
      },
      function (c) {
        return "jour" + (c >= 2 ? "s" : "");
      },
      function (c) {
        return "heure" + (c >= 2 ? "s" : "");
      },
      function (c) {
        return "minute" + (c >= 2 ? "s" : "");
      },
      function (c) {
        return "seconde" + (c >= 2 ? "s" : "");
      },
      function (c) {
        return "milliseconde" + (c >= 2 ? "s" : "");
      },
      ","
    ),
    gr: GREEK,
    he: language(
      function (c) {
        return c === 1 ? "שנה" : "שנים";
      },
      function (c) {
        return c === 1 ? "חודש" : "חודשים";
      },
      function (c) {
        return c === 1 ? "שבוע" : "שבועות";
      },
      function (c) {
        return c === 1 ? "יום" : "ימים";
      },
      function (c) {
        return c === 1 ? "שעה" : "שעות";
      },
      function (c) {
        return c === 1 ? "דקה" : "דקות";
      },
      function (c) {
        return c === 1 ? "שניה" : "שניות";
      },
      function (c) {
        return c === 1 ? "מילישנייה" : "מילישניות";
      }
    ),
    hr: language(
      function (c) {
        if (c % 10 === 2 || c % 10 === 3 || c % 10 === 4) {
          return "godine";
        }
        return "godina";
      },
      function (c) {
        if (c === 1) {
          return "mjesec";
        } else if (c === 2 || c === 3 || c === 4) {
          return "mjeseca";
        }
        return "mjeseci";
      },
      function (c) {
        if (c % 10 === 1 && c !== 11) {
          return "tjedan";
        }
        return "tjedna";
      },
      function (c) {
        return c === 1 ? "dan" : "dana";
      },
      function (c) {
        if (c === 1) {
          return "sat";
        } else if (c === 2 || c === 3 || c === 4) {
          return "sata";
        }
        return "sati";
      },
      function (c) {
        var mod10 = c % 10;
        if ((mod10 === 2 || mod10 === 3 || mod10 === 4) && (c < 10 || c > 14)) {
          return "minute";
        }
        return "minuta";
      },
      function (c) {
        var mod10 = c % 10;
        if (mod10 === 5 || (Math.floor(c) === c && c >= 10 && c <= 19)) {
          return "sekundi";
        } else if (mod10 === 1) {
          return "sekunda";
        } else if (mod10 === 2 || mod10 === 3 || mod10 === 4) {
          return "sekunde";
        }
        return "sekundi";
      },
      function (c) {
        if (c === 1) {
          return "milisekunda";
        } else if (c % 10 === 2 || c % 10 === 3 || c % 10 === 4) {
          return "milisekunde";
        }
        return "milisekundi";
      },
      ","
    ),
    hi: language(
      "साल",
      function (c) {
        return c === 1 ? "महीना" : "महीने";
      },
      function (c) {
        return c === 1 ? "हफ़्ता" : "हफ्ते";
      },
      "दिन",
      function (c) {
        return c === 1 ? "घंटा" : "घंटे";
      },
      "मिनट",
      "सेकंड",
      "मिलीसेकंड"
    ),
    hu: language(
      "év",
      "hónap",
      "hét",
      "nap",
      "óra",
      "perc",
      "másodperc",
      "ezredmásodperc",
      ","
    ),
    id: language(
      "tahun",
      "bulan",
      "minggu",
      "hari",
      "jam",
      "menit",
      "detik",
      "milidetik"
    ),
    is: language(
      "ár",
      function (c) {
        return "mánuð" + (c === 1 ? "ur" : "ir");
      },
      function (c) {
        return "vik" + (c === 1 ? "a" : "ur");
      },
      function (c) {
        return "dag" + (c === 1 ? "ur" : "ar");
      },
      function (c) {
        return "klukkutím" + (c === 1 ? "i" : "ar");
      },
      function (c) {
        return "mínút" + (c === 1 ? "a" : "ur");
      },
      function (c) {
        return "sekúnd" + (c === 1 ? "a" : "ur");
      },
      function (c) {
        return "millisekúnd" + (c === 1 ? "a" : "ur");
      }
    ),
    it: language(
      function (c) {
        return "ann" + (c === 1 ? "o" : "i");
      },
      function (c) {
        return "mes" + (c === 1 ? "e" : "i");
      },
      function (c) {
        return "settiman" + (c === 1 ? "a" : "e");
      },
      function (c) {
        return "giorn" + (c === 1 ? "o" : "i");
      },
      function (c) {
        return "or" + (c === 1 ? "a" : "e");
      },
      function (c) {
        return "minut" + (c === 1 ? "o" : "i");
      },
      function (c) {
        return "second" + (c === 1 ? "o" : "i");
      },
      function (c) {
        return "millisecond" + (c === 1 ? "o" : "i");
      },
      ","
    ),
    ja: language("年", "ヶ月", "週", "日", "時間", "分", "秒", "ミリ秒"),
    km: language(
      "ឆ្នាំ",
      "ខែ",
      "សប្តាហ៍",
      "ថ្ងៃ",
      "ម៉ោង",
      "នាទី",
      "វិនាទី",
      "មិល្លីវិនាទី"
    ),
    kn: language(
      function (c) {
        return c === 1 ? "ವರ್ಷ" : "ವರ್ಷಗಳು";
      },
      function (c) {
        return c === 1 ? "ತಿಂಗಳು" : "ತಿಂಗಳುಗಳು";
      },
      function (c) {
        return c === 1 ? "ವಾರ" : "ವಾರಗಳು";
      },
      function (c) {
        return c === 1 ? "ದಿನ" : "ದಿನಗಳು";
      },
      function (c) {
        return c === 1 ? "ಗಂಟೆ" : "ಗಂಟೆಗಳು";
      },
      function (c) {
        return c === 1 ? "ನಿಮಿಷ" : "ನಿಮಿಷಗಳು";
      },
      function (c) {
        return c === 1 ? "ಸೆಕೆಂಡ್" : "ಸೆಕೆಂಡುಗಳು";
      },
      function (c) {
        return c === 1 ? "ಮಿಲಿಸೆಕೆಂಡ್" : "ಮಿಲಿಸೆಕೆಂಡುಗಳು";
      }
    ),
    ko: language("년", "개월", "주일", "일", "시간", "분", "초", "밀리 초"),
    ku: language(
      "sal",
      "meh",
      "hefte",
      "roj",
      "seet",
      "deqe",
      "saniye",
      "mîlîçirk",
      ","
    ),
    lo: language(
      "ປີ",
      "ເດືອນ",
      "ອາທິດ",
      "ມື້",
      "ຊົ່ວໂມງ",
      "ນາທີ",
      "ວິນາທີ",
      "ມິນລິວິນາທີ",
      ","
    ),
    lt: language(
      function (c) {
        return c % 10 === 0 || (c % 100 >= 10 && c % 100 <= 20)
          ? "metų"
          : "metai";
      },
      function (c) {
        return ["mėnuo", "mėnesiai", "mėnesių"][getLithuanianForm(c)];
      },
      function (c) {
        return ["savaitė", "savaitės", "savaičių"][getLithuanianForm(c)];
      },
      function (c) {
        return ["diena", "dienos", "dienų"][getLithuanianForm(c)];
      },
      function (c) {
        return ["valanda", "valandos", "valandų"][getLithuanianForm(c)];
      },
      function (c) {
        return ["minutė", "minutės", "minučių"][getLithuanianForm(c)];
      },
      function (c) {
        return ["sekundė", "sekundės", "sekundžių"][getLithuanianForm(c)];
      },
      function (c) {
        return ["milisekundė", "milisekundės", "milisekundžių"][
          getLithuanianForm(c)
        ];
      },
      ","
    ),
    lv: language(
      function (c) {
        return getLatvianForm(c) ? "gads" : "gadi";
      },
      function (c) {
        return getLatvianForm(c) ? "mēnesis" : "mēneši";
      },
      function (c) {
        return getLatvianForm(c) ? "nedēļa" : "nedēļas";
      },
      function (c) {
        return getLatvianForm(c) ? "diena" : "dienas";
      },
      function (c) {
        return getLatvianForm(c) ? "stunda" : "stundas";
      },
      function (c) {
        return getLatvianForm(c) ? "minūte" : "minūtes";
      },
      function (c) {
        return getLatvianForm(c) ? "sekunde" : "sekundes";
      },
      function (c) {
        return getLatvianForm(c) ? "milisekunde" : "milisekundes";
      },
      ","
    ),
    mk: language(
      function (c) {
        return c === 1 ? "година" : "години";
      },
      function (c) {
        return c === 1 ? "месец" : "месеци";
      },
      function (c) {
        return c === 1 ? "недела" : "недели";
      },
      function (c) {
        return c === 1 ? "ден" : "дена";
      },
      function (c) {
        return c === 1 ? "час" : "часа";
      },
      function (c) {
        return c === 1 ? "минута" : "минути";
      },
      function (c) {
        return c === 1 ? "секунда" : "секунди";
      },
      function (c) {
        return c === 1 ? "милисекунда" : "милисекунди";
      },
      ","
    ),
    mn: language(
      "жил",
      "сар",
      "долоо хоног",
      "өдөр",
      "цаг",
      "минут",
      "секунд",
      "миллисекунд"
    ),
    mr: language(
      function (c) {
        return c === 1 ? "वर्ष" : "वर्षे";
      },
      function (c) {
        return c === 1 ? "महिना" : "महिने";
      },
      function (c) {
        return c === 1 ? "आठवडा" : "आठवडे";
      },
      "दिवस",
      "तास",
      function (c) {
        return c === 1 ? "मिनिट" : "मिनिटे";
      },
      "सेकंद",
      "मिलिसेकंद"
    ),
    ms: language(
      "tahun",
      "bulan",
      "minggu",
      "hari",
      "jam",
      "minit",
      "saat",
      "milisaat"
    ),
    nl: language(
      "jaar",
      function (c) {
        return c === 1 ? "maand" : "maanden";
      },
      function (c) {
        return c === 1 ? "week" : "weken";
      },
      function (c) {
        return c === 1 ? "dag" : "dagen";
      },
      "uur",
      function (c) {
        return c === 1 ? "minuut" : "minuten";
      },
      function (c) {
        return c === 1 ? "seconde" : "seconden";
      },
      function (c) {
        return c === 1 ? "milliseconde" : "milliseconden";
      },
      ","
    ),
    no: language(
      "år",
      function (c) {
        return "måned" + (c === 1 ? "" : "er");
      },
      function (c) {
        return "uke" + (c === 1 ? "" : "r");
      },
      function (c) {
        return "dag" + (c === 1 ? "" : "er");
      },
      function (c) {
        return "time" + (c === 1 ? "" : "r");
      },
      function (c) {
        return "minutt" + (c === 1 ? "" : "er");
      },
      function (c) {
        return "sekund" + (c === 1 ? "" : "er");
      },
      function (c) {
        return "millisekund" + (c === 1 ? "" : "er");
      },
      ","
    ),
    pl: language(
      function (c) {
        return ["rok", "roku", "lata", "lat"][getPolishForm(c)];
      },
      function (c) {
        return ["miesiąc", "miesiąca", "miesiące", "miesięcy"][
          getPolishForm(c)
        ];
      },
      function (c) {
        return ["tydzień", "tygodnia", "tygodnie", "tygodni"][getPolishForm(c)];
      },
      function (c) {
        return ["dzień", "dnia", "dni", "dni"][getPolishForm(c)];
      },
      function (c) {
        return ["godzina", "godziny", "godziny", "godzin"][getPolishForm(c)];
      },
      function (c) {
        return ["minuta", "minuty", "minuty", "minut"][getPolishForm(c)];
      },
      function (c) {
        return ["sekunda", "sekundy", "sekundy", "sekund"][getPolishForm(c)];
      },
      function (c) {
        return ["milisekunda", "milisekundy", "milisekundy", "milisekund"][
          getPolishForm(c)
        ];
      },
      ","
    ),
    pt: language(
      function (c) {
        return "ano" + (c === 1 ? "" : "s");
      },
      function (c) {
        return c === 1 ? "mês" : "meses";
      },
      function (c) {
        return "semana" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "dia" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "hora" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "minuto" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "segundo" + (c === 1 ? "" : "s");
      },
      function (c) {
        return "milissegundo" + (c === 1 ? "" : "s");
      },
      ","
    ),
    ro: language(
      function (c) {
        return c === 1 ? "an" : "ani";
      },
      function (c) {
        return c === 1 ? "lună" : "luni";
      },
      function (c) {
        return c === 1 ? "săptămână" : "săptămâni";
      },
      function (c) {
        return c === 1 ? "zi" : "zile";
      },
      function (c) {
        return c === 1 ? "oră" : "ore";
      },
      function (c) {
        return c === 1 ? "minut" : "minute";
      },
      function (c) {
        return c === 1 ? "secundă" : "secunde";
      },
      function (c) {
        return c === 1 ? "milisecundă" : "milisecunde";
      },
      ","
    ),
    ru: language(
      function (c) {
        return ["лет", "год", "года"][getSlavicForm(c)];
      },
      function (c) {
        return ["месяцев", "месяц", "месяца"][getSlavicForm(c)];
      },
      function (c) {
        return ["недель", "неделя", "недели"][getSlavicForm(c)];
      },
      function (c) {
        return ["дней", "день", "дня"][getSlavicForm(c)];
      },
      function (c) {
        return ["часов", "час", "часа"][getSlavicForm(c)];
      },
      function (c) {
        return ["минут", "минута", "минуты"][getSlavicForm(c)];
      },
      function (c) {
        return ["секунд", "секунда", "секунды"][getSlavicForm(c)];
      },
      function (c) {
        return ["миллисекунд", "миллисекунда", "миллисекунды"][
          getSlavicForm(c)
        ];
      },
      ","
    ),
    sq: language(
      function (c) {
        return c === 1 ? "vit" : "vjet";
      },
      "muaj",
      "javë",
      "ditë",
      "orë",
      function (c) {
        return "minut" + (c === 1 ? "ë" : "a");
      },
      function (c) {
        return "sekond" + (c === 1 ? "ë" : "a");
      },
      function (c) {
        return "milisekond" + (c === 1 ? "ë" : "a");
      },
      ","
    ),
    sr: language(
      function (c) {
        return ["години", "година", "године"][getSlavicForm(c)];
      },
      function (c) {
        return ["месеци", "месец", "месеца"][getSlavicForm(c)];
      },
      function (c) {
        return ["недељи", "недеља", "недеље"][getSlavicForm(c)];
      },
      function (c) {
        return ["дани", "дан", "дана"][getSlavicForm(c)];
      },
      function (c) {
        return ["сати", "сат", "сата"][getSlavicForm(c)];
      },
      function (c) {
        return ["минута", "минут", "минута"][getSlavicForm(c)];
      },
      function (c) {
        return ["секунди", "секунда", "секунде"][getSlavicForm(c)];
      },
      function (c) {
        return ["милисекунди", "милисекунда", "милисекунде"][getSlavicForm(c)];
      },
      ","
    ),
    ta: language(
      function (c) {
        return c === 1 ? "வருடம்" : "ஆண்டுகள்";
      },
      function (c) {
        return c === 1 ? "மாதம்" : "மாதங்கள்";
      },
      function (c) {
        return c === 1 ? "வாரம்" : "வாரங்கள்";
      },
      function (c) {
        return c === 1 ? "நாள்" : "நாட்கள்";
      },
      function (c) {
        return c === 1 ? "மணி" : "மணிநேரம்";
      },
      function (c) {
        return "நிமிட" + (c === 1 ? "ம்" : "ங்கள்");
      },
      function (c) {
        return "வினாடி" + (c === 1 ? "" : "கள்");
      },
      function (c) {
        return "மில்லி விநாடி" + (c === 1 ? "" : "கள்");
      }
    ),
    te: language(
      function (c) {
        return "సంవత్స" + (c === 1 ? "రం" : "రాల");
      },
      function (c) {
        return "నెల" + (c === 1 ? "" : "ల");
      },
      function (c) {
        return c === 1 ? "వారం" : "వారాలు";
      },
      function (c) {
        return "రోజు" + (c === 1 ? "" : "లు");
      },
      function (c) {
        return "గంట" + (c === 1 ? "" : "లు");
      },
      function (c) {
        return c === 1 ? "నిమిషం" : "నిమిషాలు";
      },
      function (c) {
        return c === 1 ? "సెకను" : "సెకన్లు";
      },
      function (c) {
        return c === 1 ? "మిల్లీసెకన్" : "మిల్లీసెకన్లు";
      }
    ),
    uk: language(
      function (c) {
        return ["років", "рік", "роки"][getSlavicForm(c)];
      },
      function (c) {
        return ["місяців", "місяць", "місяці"][getSlavicForm(c)];
      },
      function (c) {
        return ["тижнів", "тиждень", "тижні"][getSlavicForm(c)];
      },
      function (c) {
        return ["днів", "день", "дні"][getSlavicForm(c)];
      },
      function (c) {
        return ["годин", "година", "години"][getSlavicForm(c)];
      },
      function (c) {
        return ["хвилин", "хвилина", "хвилини"][getSlavicForm(c)];
      },
      function (c) {
        return ["секунд", "секунда", "секунди"][getSlavicForm(c)];
      },
      function (c) {
        return ["мілісекунд", "мілісекунда", "мілісекунди"][getSlavicForm(c)];
      },
      ","
    ),
    ur: language(
      "سال",
      function (c) {
        return c === 1 ? "مہینہ" : "مہینے";
      },
      function (c) {
        return c === 1 ? "ہفتہ" : "ہفتے";
      },
      "دن",
      function (c) {
        return c === 1 ? "گھنٹہ" : "گھنٹے";
      },
      "منٹ",
      "سیکنڈ",
      "ملی سیکنڈ"
    ),
    sk: language(
      function (c) {
        return ["rok", "roky", "roky", "rokov"][getCzechOrSlovakForm(c)];
      },
      function (c) {
        return ["mesiac", "mesiace", "mesiace", "mesiacov"][
          getCzechOrSlovakForm(c)
        ];
      },
      function (c) {
        return ["týždeň", "týždne", "týždne", "týždňov"][
          getCzechOrSlovakForm(c)
        ];
      },
      function (c) {
        return ["deň", "dni", "dni", "dní"][getCzechOrSlovakForm(c)];
      },
      function (c) {
        return ["hodina", "hodiny", "hodiny", "hodín"][getCzechOrSlovakForm(c)];
      },
      function (c) {
        return ["minúta", "minúty", "minúty", "minút"][getCzechOrSlovakForm(c)];
      },
      function (c) {
        return ["sekunda", "sekundy", "sekundy", "sekúnd"][
          getCzechOrSlovakForm(c)
        ];
      },
      function (c) {
        return ["milisekunda", "milisekundy", "milisekundy", "milisekúnd"][
          getCzechOrSlovakForm(c)
        ];
      },
      ","
    ),
    sl: language(
      function (c) {
        if (c % 10 === 1) {
          return "leto";
        } else if (c % 100 === 2) {
          return "leti";
        } else if (
          c % 100 === 3 ||
          c % 100 === 4 ||
          (Math.floor(c) !== c && c % 100 <= 5)
        ) {
          return "leta";
        } else {
          return "let";
        }
      },
      function (c) {
        if (c % 10 === 1) {
          return "mesec";
        } else if (c % 100 === 2 || (Math.floor(c) !== c && c % 100 <= 5)) {
          return "meseca";
        } else if (c % 10 === 3 || c % 10 === 4) {
          return "mesece";
        } else {
          return "mesecev";
        }
      },
      function (c) {
        if (c % 10 === 1) {
          return "teden";
        } else if (c % 10 === 2 || (Math.floor(c) !== c && c % 100 <= 4)) {
          return "tedna";
        } else if (c % 10 === 3 || c % 10 === 4) {
          return "tedne";
        } else {
          return "tednov";
        }
      },
      function (c) {
        return c % 100 === 1 ? "dan" : "dni";
      },
      function (c) {
        if (c % 10 === 1) {
          return "ura";
        } else if (c % 100 === 2) {
          return "uri";
        } else if (c % 10 === 3 || c % 10 === 4 || Math.floor(c) !== c) {
          return "ure";
        } else {
          return "ur";
        }
      },
      function (c) {
        if (c % 10 === 1) {
          return "minuta";
        } else if (c % 10 === 2) {
          return "minuti";
        } else if (
          c % 10 === 3 ||
          c % 10 === 4 ||
          (Math.floor(c) !== c && c % 100 <= 4)
        ) {
          return "minute";
        } else {
          return "minut";
        }
      },
      function (c) {
        if (c % 10 === 1) {
          return "sekunda";
        } else if (c % 100 === 2) {
          return "sekundi";
        } else if (c % 100 === 3 || c % 100 === 4 || Math.floor(c) !== c) {
          return "sekunde";
        } else {
          return "sekund";
        }
      },
      function (c) {
        if (c % 10 === 1) {
          return "milisekunda";
        } else if (c % 100 === 2) {
          return "milisekundi";
        } else if (c % 100 === 3 || c % 100 === 4 || Math.floor(c) !== c) {
          return "milisekunde";
        } else {
          return "milisekund";
        }
      },
      ","
    ),
    sv: language(
      "år",
      function (c) {
        return "månad" + (c === 1 ? "" : "er");
      },
      function (c) {
        return "veck" + (c === 1 ? "a" : "or");
      },
      function (c) {
        return "dag" + (c === 1 ? "" : "ar");
      },
      function (c) {
        return "timm" + (c === 1 ? "e" : "ar");
      },
      function (c) {
        return "minut" + (c === 1 ? "" : "er");
      },
      function (c) {
        return "sekund" + (c === 1 ? "" : "er");
      },
      function (c) {
        return "millisekund" + (c === 1 ? "" : "er");
      },
      ","
    ),
    sw: assign(
      language(
        function (c) {
          return c === 1 ? "mwaka" : "miaka";
        },
        function (c) {
          return c === 1 ? "mwezi" : "miezi";
        },
        "wiki",
        function (c) {
          return c === 1 ? "siku" : "masiku";
        },
        function (c) {
          return c === 1 ? "saa" : "masaa";
        },
        "dakika",
        "sekunde",
        "milisekunde"
      ),
      { _numberFirst: true }
    ),
    tr: language(
      "yıl",
      "ay",
      "hafta",
      "gün",
      "saat",
      "dakika",
      "saniye",
      "milisaniye",
      ","
    ),
    th: language(
      "ปี",
      "เดือน",
      "สัปดาห์",
      "วัน",
      "ชั่วโมง",
      "นาที",
      "วินาที",
      "มิลลิวินาที"
    ),
    vi: language(
      "năm",
      "tháng",
      "tuần",
      "ngày",
      "giờ",
      "phút",
      "giây",
      "mili giây",
      ","
    ),
    zh_CN: language("年", "个月", "周", "天", "小时", "分钟", "秒", "毫秒"),
    zh_TW: language("年", "個月", "周", "天", "小時", "分鐘", "秒", "毫秒")
  };

  /**
   * Helper function for creating language definitions.
   *
   * @param {Unit} y
   * @param {Unit} mo
   * @param {Unit} w
   * @param {Unit} d
   * @param {Unit} h
   * @param {Unit} m
   * @param {Unit} s
   * @param {Unit} ms
   * @param {string} [decimal]
   * @returns {Language}
   */
  function language(y, mo, w, d, h, m, s, ms, decimal) {
    /** @type {Language} */
    var result = { y: y, mo: mo, w: w, d: d, h: h, m: m, s: s, ms: ms };
    if (typeof decimal !== "undefined") {
      result.decimal = decimal;
    }
    return result;
  }

  /**
   * Helper function for Arabic.
   *
   * @param {number} c
   * @returns {0 | 1 | 2}
   */
  function getArabicForm(c) {
    if (c === 2) {
      return 1;
    }
    if (c > 2 && c < 11) {
      return 2;
    }
    return 0;
  }

  /**
   * Helper function for Polish.
   *
   * @param {number} c
   * @returns {0 | 1 | 2 | 3}
   */
  function getPolishForm(c) {
    if (c === 1) {
      return 0;
    }
    if (Math.floor(c) !== c) {
      return 1;
    }
    if (c % 10 >= 2 && c % 10 <= 4 && !(c % 100 > 10 && c % 100 < 20)) {
      return 2;
    }
    return 3;
  }

  /**
   * Helper function for Slavic languages.
   *
   * @param {number} c
   * @returns {0 | 1 | 2 | 3}
   */
  function getSlavicForm(c) {
    if (Math.floor(c) !== c) {
      return 2;
    }
    if (
      (c % 100 >= 5 && c % 100 <= 20) ||
      (c % 10 >= 5 && c % 10 <= 9) ||
      c % 10 === 0
    ) {
      return 0;
    }
    if (c % 10 === 1) {
      return 1;
    }
    if (c > 1) {
      return 2;
    }
    return 0;
  }

  /**
   * Helper function for Czech or Slovak.
   *
   * @param {number} c
   * @returns {0 | 1 | 2 | 3}
   */
  function getCzechOrSlovakForm(c) {
    if (c === 1) {
      return 0;
    }
    if (Math.floor(c) !== c) {
      return 1;
    }
    if (c % 10 >= 2 && c % 10 <= 4 && c % 100 < 10) {
      return 2;
    }
    return 3;
  }

  /**
   * Helper function for Lithuanian.
   *
   * @param {number} c
   * @returns {0 | 1 | 2}
   */
  function getLithuanianForm(c) {
    if (c === 1 || (c % 10 === 1 && c % 100 > 20)) {
      return 0;
    }
    if (
      Math.floor(c) !== c ||
      (c % 10 >= 2 && c % 100 > 20) ||
      (c % 10 >= 2 && c % 100 < 10)
    ) {
      return 1;
    }
    return 2;
  }

  /**
   * Helper function for Latvian.
   *
   * @param {number} c
   * @returns {boolean}
   */
  function getLatvianForm(c) {
    return c % 10 === 1 && c % 100 !== 11;
  }

  function assign(destination) {
    var source;
    for (var i = 1; i < arguments.length; i++) {
      source = arguments[i];
      for (var prop in source) {
        if (has(source, prop)) {
          destination[prop] = source[prop];
        }
      }
    }
    return destination;
  }

  // We need to make sure we support browsers that don't have
  // `Array.isArray`, so we define a fallback here.
  var isArray =
    Array.isArray ||
    function (arg) {
      return Object.prototype.toString.call(arg) === "[object Array]";
    };

  function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  /**
   * @param {Pick<Required<Options>, "language" | "fallbacks" | "languages">} options
   * @throws {Error} Throws an error if language is not found.
   * @returns {Language}
   */
  function getLanguage(options) {
    var possibleLanguages = [options.language];

    if (has(options, "fallbacks")) {
      if (isArray(options.fallbacks) && options.fallbacks.length) {
        possibleLanguages = possibleLanguages.concat(options.fallbacks);
      } else {
        throw new Error("fallbacks must be an array with at least one element");
      }
    }

    for (var i = 0; i < possibleLanguages.length; i++) {
      var languageToTry = possibleLanguages[i];
      if (has(options.languages, languageToTry)) {
        return options.languages[languageToTry];
      }
      if (has(LANGUAGES, languageToTry)) {
        return LANGUAGES[languageToTry];
      }
    }

    throw new Error("No language found.");
  }

  /**
   * @param {Piece} piece
   * @param {Language} language
   * @param {Pick<Required<Options>, "decimal" | "spacer" | "maxDecimalPoints" | "digitReplacements">} options
   */
  function renderPiece(piece, language, options) {
    var unitName = piece.unitName;
    var unitCount = piece.unitCount;

    var spacer = options.spacer;
    var maxDecimalPoints = options.maxDecimalPoints;

    /** @type {string} */
    var decimal;
    if (has(options, "decimal")) {
      decimal = options.decimal;
    } else if (has(language, "decimal")) {
      decimal = language.decimal;
    } else {
      decimal = ".";
    }

    /** @type {undefined | DigitReplacements} */
    var digitReplacements;
    if ("digitReplacements" in options) {
      digitReplacements = options.digitReplacements;
    } else if ("_digitReplacements" in language) {
      digitReplacements = language._digitReplacements;
    }

    /** @type {string} */
    var formattedCount;
    var normalizedUnitCount =
      maxDecimalPoints === void 0
        ? unitCount
        : Math.floor(unitCount * Math.pow(10, maxDecimalPoints)) /
          Math.pow(10, maxDecimalPoints);
    var countStr = normalizedUnitCount.toString();
    if (digitReplacements) {
      formattedCount = "";
      for (var i = 0; i < countStr.length; i++) {
        var char = countStr[i];
        if (char === ".") {
          formattedCount += decimal;
        } else {
          formattedCount += digitReplacements[char];
        }
      }
    } else {
      formattedCount = countStr.replace(".", decimal);
    }

    var languageWord = language[unitName];
    var word;
    if (typeof languageWord === "function") {
      word = languageWord(unitCount);
    } else {
      word = languageWord;
    }

    if (language._numberFirst) {
      return word + spacer + formattedCount;
    }
    return formattedCount + spacer + word;
  }

  /**
   * @typedef {Object} Piece
   * @prop {UnitName} unitName
   * @prop {number} unitCount
   */

  /**
   * @param {number} ms
   * @param {Pick<Required<Options>, "units" | "unitMeasures" | "largest" | "round">} options
   * @returns {Piece[]}
   */
  function getPieces(ms, options) {
    /** @type {UnitName} */
    var unitName;

    /** @type {number} */
    var i;

    /** @type {number} */
    var unitCount;

    /** @type {number} */
    var msRemaining;

    var units = options.units;
    var unitMeasures = options.unitMeasures;
    var largest = "largest" in options ? options.largest : Infinity;

    if (!units.length) return [];

    // Get the counts for each unit. Doesn't round or truncate anything.
    // For example, might create an object like `{ y: 7, m: 6, w: 0, d: 5, h: 23.99 }`.
    /** @type {Partial<Record<UnitName, number>>} */
    var unitCounts = {};
    msRemaining = ms;
    for (i = 0; i < units.length; i++) {
      unitName = units[i];
      var unitMs = unitMeasures[unitName];

      var isLast = i === units.length - 1;
      unitCount = isLast
        ? msRemaining / unitMs
        : Math.floor(msRemaining / unitMs);
      unitCounts[unitName] = unitCount;

      msRemaining -= unitCount * unitMs;
    }

    if (options.round) {
      // Update counts based on the `largest` option.
      // For example, if `largest === 2` and `unitCount` is `{ y: 7, m: 6, w: 0, d: 5, h: 23.99 }`,
      // updates to something like `{ y: 7, m: 6.2 }`.
      var unitsRemainingBeforeRound = largest;
      for (i = 0; i < units.length; i++) {
        unitName = units[i];
        unitCount = unitCounts[unitName];

        if (unitCount === 0) continue;

        unitsRemainingBeforeRound--;

        // "Take" the rest of the units into this one.
        if (unitsRemainingBeforeRound === 0) {
          for (var j = i + 1; j < units.length; j++) {
            var smallerUnitName = units[j];
            var smallerUnitCount = unitCounts[smallerUnitName];
            unitCounts[unitName] +=
              (smallerUnitCount * unitMeasures[smallerUnitName]) /
              unitMeasures[unitName];
            unitCounts[smallerUnitName] = 0;
          }
          break;
        }
      }

      // Round the last piece (which should be the only non-integer).
      //
      // This can be a little tricky if the last piece "bubbles up" to a larger
      // unit. For example, "3 days, 23.99 hours" should be rounded to "4 days".
      // It can also require multiple passes. For example, "6 days, 23.99 hours"
      // should become "1 week".
      for (i = units.length - 1; i >= 0; i--) {
        unitName = units[i];
        unitCount = unitCounts[unitName];

        if (unitCount === 0) continue;

        var rounded = Math.round(unitCount);
        unitCounts[unitName] = rounded;

        if (i === 0) break;

        var previousUnitName = units[i - 1];
        var previousUnitMs = unitMeasures[previousUnitName];
        var amountOfPreviousUnit = Math.floor(
          (rounded * unitMeasures[unitName]) / previousUnitMs
        );
        if (amountOfPreviousUnit) {
          unitCounts[previousUnitName] += amountOfPreviousUnit;
          unitCounts[unitName] = 0;
        } else {
          break;
        }
      }
    }

    /** @type {Piece[]} */
    var result = [];
    for (i = 0; i < units.length && result.length < largest; i++) {
      unitName = units[i];
      unitCount = unitCounts[unitName];
      if (unitCount) {
        result.push({ unitName: unitName, unitCount: unitCount });
      }
    }
    return result;
  }

  /**
   * @param {Piece[]} pieces
   * @param {Pick<Required<Options>, "units" | "language" | "languages" | "fallbacks" | "delimiter" | "spacer" | "decimal" | "conjunction" | "maxDecimalPoints" | "serialComma" | "digitReplacements">} options
   * @returns {string}
   */
  function formatPieces(pieces, options) {
    var language = getLanguage(options);

    if (!pieces.length) {
      var units = options.units;
      var smallestUnitName = units[units.length - 1];
      return renderPiece(
        { unitName: smallestUnitName, unitCount: 0 },
        language,
        options
      );
    }

    var conjunction = options.conjunction;
    var serialComma = options.serialComma;

    var delimiter;
    if (has(options, "delimiter")) {
      delimiter = options.delimiter;
    } else if (has(language, "delimiter")) {
      delimiter = language.delimiter;
    } else {
      delimiter = ", ";
    }

    /** @type {string[]} */
    var renderedPieces = [];
    for (var i = 0; i < pieces.length; i++) {
      renderedPieces.push(renderPiece(pieces[i], language, options));
    }

    if (!conjunction || pieces.length === 1) {
      return renderedPieces.join(delimiter);
    }

    if (pieces.length === 2) {
      return renderedPieces.join(conjunction);
    }

    return (
      renderedPieces.slice(0, -1).join(delimiter) +
      (serialComma ? "," : "") +
      conjunction +
      renderedPieces.slice(-1)
    );
  }

  /**
   * Create a humanizer, which lets you change the default options.
   */
  function humanizer(passedOptions) {
    var result = function humanizer(ms, humanizerOptions) {
      // Make sure we have a positive number.
      //
      // Has the nice side-effect of converting things to numbers. For example,
      // converts `"123"` and `Number(123)` to `123`.
      ms = Math.abs(ms);

      var options = assign({}, result, humanizerOptions || {});

      var pieces = getPieces(ms, options);

      return formatPieces(pieces, options);
    };

    return assign(
      result,
      {
        language: "en",
        spacer: " ",
        conjunction: "",
        serialComma: true,
        units: ["y", "mo", "w", "d", "h", "m", "s"],
        languages: {},
        round: false,
        unitMeasures: {
          y: 31557600000,
          mo: 2629800000,
          w: 604800000,
          d: 86400000,
          h: 3600000,
          m: 60000,
          s: 1000,
          ms: 1
        }
      },
      passedOptions
    );
  }

  /**
   * Humanize a duration.
   *
   * This is a wrapper around the default humanizer.
   */
  var humanizeDuration = humanizer({});

  humanizeDuration.getSupportedLanguages = function getSupportedLanguages() {
    var result = [];
    for (var language in LANGUAGES) {
      if (has(LANGUAGES, language) && language !== "gr") {
        result.push(language);
      }
    }
    return result;
  };

  humanizeDuration.humanizer = humanizer;

  // @ts-ignore
  if (typeof define === "function" && define.amd) {
    // @ts-ignore
    define(function () {
      return humanizeDuration;
    });
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = humanizeDuration;
  } else {
    this.humanizeDuration = humanizeDuration;
  }
})();

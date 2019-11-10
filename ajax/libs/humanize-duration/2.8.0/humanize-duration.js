// HumanizeDuration.js - http://git.io/j0HgmQ

(function() {

  var UNITS = {
    year: 31557600000,
    month: 2629800000,
    week: 604800000,
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000,
    millisecond: 1
  };

  var languages = {
    ar: {
      year: function(c) { return ((c === 1) ? "سنة" : "سنوات"); },
      month: function(c) { return ((c === 1) ? "شهر" : "أشهر"); },
      week: function(c) { return ((c === 1) ? "أسبوع" : "أسابيع"); },
      day: function(c) { return ((c === 1) ? "يوم" : "أيام"); },
      hour: function(c) { return ((c === 1) ? "ساعة" : "ساعات"); },
      minute: function(c) { return ((c === 1) ? "دقيقة" : "دقائق"); },
      second: function(c) { return ((c === 1) ? "ثانية" : "ثواني"); },
      millisecond: function(c) { return ((c === 1) ? "جزء من الثانية" : "أجزاء من الثانية"); }
    },
    ca: {
      year: function(c) { return "any" + ((c !== 1) ? "s" : ""); },
      month: function(c) { return "mes" + ((c !== 1) ? "os" : ""); },
      week: function(c) { return "setman" + ((c !== 1) ? "es" : "a"); },
      day: function(c) { return "di" + ((c !== 1) ? "es" : "a"); },
      hour: function(c) { return "hor" + ((c !== 1) ? "es" : "a"); },
      minute: function(c) { return "minut" + ((c !== 1) ? "s" : ""); },
      second: function(c) { return "segon" + ((c !== 1) ? "s" : ""); },
      millisecond: function(c) { return "milisegon" + ((c !== 1) ? "s" : "" ); }
    },
    da: {
      year: "år",
      month: function(c) { return "måned" + ((c !== 1) ? "er" : ""); },
      week: function(c) { return "uge" + ((c !== 1) ? "r" : ""); },
      day: function(c) { return "dag" + ((c !== 1) ? "e" : ""); },
      hour: function(c) { return "time" + ((c !== 1) ? "r" : ""); },
      minute: function(c) { return "minut" + ((c !== 1) ? "ter" : ""); },
      second: function(c) { return "sekund" + ((c !== 1) ? "er" : ""); },
      millisecond: function(c) { return "millisekund" + ((c !== 1) ? "er" : ""); }
    },
    de: {
      year: function(c) { return "Jahr" + ((c !== 1) ? "e" : ""); },
      month: function(c) { return "Monat" + ((c !== 1) ? "e" : ""); },
      week: function(c) { return "Woche" + ((c !== 1) ? "n" : ""); },
      day: function(c) { return "Tag" + ((c !== 1) ? "e" : ""); },
      hour: function(c) { return "Stunde" + ((c !== 1) ? "n" : ""); },
      minute: function(c) { return "Minute" + ((c !== 1) ? "n" : ""); },
      second: function(c) { return "Sekunde" + ((c !== 1) ? "n" : ""); },
      millisecond: function(c) { return "Millisekunde" + ((c !== 1) ? "n" : ""); }
    },
    en: {
      year: function(c) { return "year" + ((c !== 1) ? "s" : ""); },
      month: function(c) { return "month" + ((c !== 1) ? "s" : ""); },
      week: function(c) { return "week" + ((c !== 1) ? "s" : ""); },
      day: function(c) { return "day" + ((c !== 1) ? "s" : ""); },
      hour: function(c) { return "hour" + ((c !== 1) ? "s" : ""); },
      minute: function(c) { return "minute" + ((c !== 1) ? "s" : ""); },
      second: function(c) { return "second" + ((c !== 1) ? "s" : ""); },
      millisecond: function(c) { return "millisecond" + ((c !== 1) ? "s" : ""); }
    },
    es: {
      year: function(c) { return "año" + ((c !== 1) ? "s" : ""); },
      month: function(c) { return "mes" + ((c !== 1) ? "es" : ""); },
      week: function(c) { return "semana" + ((c !== 1) ? "s" : ""); },
      day: function(c) { return "día" + ((c !== 1) ? "s" : ""); },
      hour: function(c) { return "hora" + ((c !== 1) ? "s" : ""); },
      minute: function(c) { return "minuto" + ((c !== 1) ? "s" : ""); },
      second: function(c) { return "segundo" + ((c !== 1) ? "s" : ""); },
      millisecond: function(c) { return "milisegundo" + ((c !== 1) ? "s" : "" ); }
    },
    fr: {
      year: function(c) { return "an" + ((c !== 1) ? "s" : ""); },
      month: "mois",
      week: function(c) { return "semaine" + ((c !== 1) ? "s" : ""); },
      day: function(c) { return "jour" + ((c !== 1) ? "s" : ""); },
      hour: function(c) { return "heure" + ((c !== 1) ? "s" : ""); },
      minute: function(c) { return "minute" + ((c !== 1) ? "s" : ""); },
      second: function(c) { return "seconde" + ((c !== 1) ? "s" : ""); },
      millisecond: function(c) { return "milliseconde" + ((c !== 1) ? "s" : ""); }
    },
    hu: {
      year: "év",
      month: "hónap",
      week: "hét",
      day: "nap",
      hour: "óra",
      minute: "perc",
      second: "másodperc",
      millisecond: "ezredmásodperc"
    },
    it: {
      year: function(c) { return "ann" + ((c !== 1) ? "i" : "o"); },
      month: function(c) { return "mes" + ((c !== 1) ? "i" : "e"); },
      week: function(c) { return "settiman" + ((c !== 1) ? "e" : "a"); },
      day: function(c) { return "giorn" + ((c !== 1) ? "i" : "o"); },
      hour: function(c) { return "or" + ((c !== 1) ? "e" : "a"); },
      minute: function(c) { return "minut" + ((c !== 1) ? "i" : "o"); },
      second: function(c) { return "second" + ((c !== 1) ? "i" : "o"); },
      millisecond: function(c) { return "millisecond" + ((c !== 1) ? "i" : "o" ); }
    },
    ja: {
      year: "年",
      month: "月",
      week: "週",
      day: "日",
      hour: "時間",
      minute: "分",
      second: "秒",
      millisecond: "ミリ秒"
    },
    ko: {
      year: "년",
      month: "개월",
      week: "주일",
      day: "일",
      hour: "시간",
      minute: "분",
      second: "초",
      millisecond: "밀리 초"
    },
    nl: {
      year: "jaar",
      month: function(c) { return (c === 1) ? "maand" : "maanden"; },
      week: function(c) { return (c === 1) ? "week" : "weken"; },
      day: function(c) { return (c === 1) ? "dag" : "dagen"; },
      hour: "uur",
      minute: function(c) { return (c === 1) ? "minuut" : "minuten"; },
      second: function(c) { return (c === 1) ? "seconde" : "seconden"; },
      millisecond: function(c) { return (c === 1) ? "milliseconde" : "milliseconden"; }
    },
    nob: {
      year: "år",
      month: function(c) { return "måned" + ((c !== 1) ? "er" : ""); },
      week: function(c) { return "uke" + ((c !== 1) ? "r" : ""); },
      day: function(c) { return "dag" + ((c !== 1) ? "er" : ""); },
      hour: function(c) { return "time" + ((c !== 1) ? "r" : ""); },
      minute: function(c) { return "minutt" + ((c !== 1) ? "er" : ""); },
      second: function(c) { return "sekund" + ((c !== 1) ? "er" : ""); },
      millisecond: function(c) { return "millisekund" + ((c !== 1) ? "er" : ""); }
    },
    pl: {
      year: function(c) { return ["rok", "roku", "lata", "lat"][getPolishForm(c)]; },
      month: function(c) { return ["miesiąc", "miesiąca", "miesiące", "miesięcy"][getPolishForm(c)]; },
      week: function(c) { return ["tydzień", "tygodnia", "tygodnie", "tygodni"][getPolishForm(c)]; },
      day: function(c) { return ["dzień", "dnia", "dni", "dni"][getPolishForm(c)]; },
      hour: function(c) { return ["godzina", "godziny", "godziny", "godzin"][getPolishForm(c)]; },
      minute: function(c) { return ["minuta", "minuty", "minuty", "minut"][getPolishForm(c)]; },
      second: function(c) { return ["sekunda", "sekundy", "sekundy", "sekund"][getPolishForm(c)]; },
      millisecond: function(c) { return ["milisekunda", "milisekundy", "milisekundy", "milisekund"][getPolishForm(c)]; }
    },
    pt: {
      year: function(c) { return "ano" + ((c !== 1) ? "s" : ""); },
      month: function(c) { return (c !== 1) ? "meses" : "mês"; },
      week: function(c) { return "semana" + ((c !== 1) ? "s" : ""); },
      day: function(c) { return "dia" + ((c !== 1) ? "s" : ""); },
      hour: function(c) { return "hora" + ((c !== 1) ? "s" : ""); },
      minute: function(c) { return "minuto" + ((c !== 1) ? "s" : ""); },
      second: function(c) { return "segundo" + ((c !== 1) ? "s" : ""); },
      millisecond: function(c) { return "milissegundo" + ((c !== 1) ? "s" : ""); }
    },
    ru: {
      year: function(c) { return ["лет", "год", "года"][getRussianForm(c)]; },
      month: function(c) { return ["месяцев", "месяц", "месяца"][getRussianForm(c)]; },
      week: function(c) { return ["недель", "неделя", "недели"][getRussianForm(c)]; },
      day: function(c) { return ["дней", "день", "дня"][getRussianForm(c)]; },
      hour: function(c) { return ["часов", "час", "часа"][getRussianForm(c)]; },
      minute: function(c) { return ["минут", "минута", "минуты"][getRussianForm(c)]; },
      second: function(c) { return ["секунд", "секунда", "секунды"][getRussianForm(c)]; },
      millisecond: function(c) { return ["миллисекунд", "миллисекунда", "миллисекунды"][getRussianForm(c)]; }
    },
    sv: {
      year: "år",
      month: function(c) { return "månad" + ((c !== 1) ? "er" : ""); },
      week: function(c) { return "veck" + ((c !== 1) ? "or" : "a"); },
      day: function(c) { return "dag" + ((c !== 1) ? "ar" : ""); },
      hour: function(c) { return "timm" + ((c !== 1) ? "ar" : "e"); },
      minute: function(c) { return "minut" + ((c !== 1) ? "er" : ""); },
      second: function(c) { return "sekund" + ((c !== 1) ? "er" : ""); },
      millisecond: function(c) { return "millisekund" + ((c !== 1) ? "er" : ""); }
    },
    tr: {
      year: "yıl",
      month: "ay",
      week: "hafta",
      day: "gün",
      hour: "saat",
      minute: "dakika",
      second: "saniye",
      millisecond: "milisaniye"
    },
    "zh-CN": {
      year: "年",
      month: "个月",
      week: "周",
      day: "天",
      hour: "小时",
      minute: "分钟",
      second: "秒",
      millisecond: "毫秒"
    },
    "zh-TW": {
      year: "年",
      month: "個月",
      week: "周",
      day: "天",
      hour: "小時",
      minute: "分鐘",
      second: "秒",
      millisecond: "毫秒"
    }
  };

  // You can create a humanizer, which returns a function with defaults
  // parameters.
  function humanizer(passedOptions) {

    var result = function humanizer(ms, humanizerOptions) {
      var options = extend({}, result, humanizerOptions || {});
      return doHumanization(ms, options);
    };

    return extend(result, {
      language: "en",
      delimiter: ", ",
      spacer: " ",
      units: ["year", "month", "week", "day", "hour", "minute", "second"],
      languages: {},
      halfUnit: true,
      round: false
    }, passedOptions);

  }

  // The main function is just a wrapper around a default humanizer.
  var defaultHumanizer = humanizer({});
  function humanizeDuration() {
    return defaultHumanizer.apply(defaultHumanizer, arguments);
  }

  // doHumanization does the bulk of the work.
  function doHumanization(ms, options) {

    // Make sure we have a positive number.
    // Has the nice sideffect of turning Number objects into primitives.
    ms = Math.abs(ms);

    if (ms === 0) {
      return "0";
    }

    var dictionary = options.languages[options.language] || languages[options.language];
    if (!dictionary) {
      throw new Error("No language " + dictionary + ".");
    }

    var result = [];

    // Start at the top and keep removing units, bit by bit.
    var unitName, unitMS, unitCount, mightBeHalfUnit;
    for (var i = 0, len = options.units.length; i < len; i ++) {

      unitName = options.units[i];
      if (unitName[unitName.length - 1] === "s") { // strip plurals
        unitName = unitName.substring(0, unitName.length - 1);
      }
      unitMS = UNITS[unitName];

      // If it's a half-unit interval, we're done.
      if (result.length === 0 && options.halfUnit) {
        mightBeHalfUnit = (ms / unitMS) * 2;
        if (mightBeHalfUnit === Math.floor(mightBeHalfUnit)) {
          return render(mightBeHalfUnit / 2, unitName, dictionary, options.spacer);
        }
      }

      // What's the number of full units we can fit?
      if ((i + 1) === len) {
        unitCount = ms / unitMS;
        if (options.round) {
          unitCount = Math.round(unitCount);
        }
      } else {
        unitCount = Math.floor(ms / unitMS);
      }

      // Add the string.
      if (unitCount) {
        result.push(render(unitCount, unitName, dictionary, options.spacer));
      }

      // Remove what we just figured out.
      ms -= unitCount * unitMS;

    }

    return result.join(options.delimiter);

  }

  function render(count, type, dictionary, spacer) {
    var dictionaryValue = dictionary[type];
    var word;
    if (typeof dictionaryValue === "function") {
      word = dictionaryValue(count);
    } else {
      word = dictionaryValue;
    }
    return count + spacer + word;
  }

  function extend(destination) {
    var source;
    for (var i = 1; i < arguments.length; i ++) {
      source = arguments[i];
      for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
          destination[prop] = source[prop];
        }
      }
    }
    return destination;
  }

  // Internal helper function for Polish language.
  function getPolishForm(c) {
    if (c === 1) {
      return 0;
    } else if (Math.floor(c) !== c) {
      return 1;
    } else if (2 <= c % 10 && c % 10 <= 4 && !(10 < c % 100 && c % 100 < 20)) {
      return 2;
    } else {
      return 3;
    }
  }

  // Internal helper function for Russian language.
  function getRussianForm(c) {
    if (Math.floor(c) !== c) {
      return 2;
    } else if (c === 0 || (c >= 5 && c <= 20) || (c % 10 >= 5 && c % 10 <= 9) || (c % 10 === 0)) {
      return 0;
    } else if (c === 1 || c % 10 === 1) {
      return 1;
    } else if (c > 1) {
      return 2;
    } else {
      return 0;
    }
  }

  function getSupportedLanguages() {
    var result = [];
    for (var language in languages) {
      if (languages.hasOwnProperty(language)) {
        result.push(language);
      }
    }
    return result;
  }

  humanizeDuration.humanizer = humanizer;
  humanizeDuration.getSupportedLanguages = getSupportedLanguages;

  if (typeof define === "function" && define.amd) {
    define(function() {
      return humanizeDuration;
    });
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = humanizeDuration;
  } else {
    this.humanizeDuration = humanizeDuration;
  }

})();

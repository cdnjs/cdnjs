/*

HumanizeDuration.js
http://git.io/j0HgmQ

*/

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
    ca: {
      year: function(c) { return "any" + ((c !== 1) ? "s" : ""); },
      month: function(c) { return "mes" + ((c !== 1) ? "os" : ""); },
      week: function(c) { return "setman" + ((c !== 1) ? "es" :"a"); },
      day: function(c) { return "di" + ((c !== 1) ? "es" :"a"); },
      hour: function(c) { return "hor" + ((c !== 1) ? "es" :"a"); },
      minute: function(c) { return "minut" + ((c !== 1) ? "s" : ""); },
      second: function(c) { return "segon" + ((c !== 1) ? "s" : ""); },
      millisecond: function(c) { return "milisegon" + ((c !== 1) ? "s" : "" ); }
    },
    da: {
      year: function() { return "år"; },
      month: function(c) { return "måned" + ((c !== 1) ? "er" : ""); },
      week: function(c) { return "uge" + ((c !== 1) ? "r" : ""); },
      day: function(c) { return "dag" + ((c !== 1) ? "e" : ""); },
      hour: function(c) { return "time" + ((c !== 1) ? "r" : ""); },
      minute: function(c) { return "minut" + ((c !== 1) ? "ter" : ""); },
      second: function(c) { return "sekund" + ((c !== 1) ? "er" : ""); },
      millisecond: function(c) { return "millisekund" + ((c !== 1) ? "er" : ""); }
    },
    de: {
      year: function(c) { return "jahr" + ((c !== 1) ? "e" : ""); },
      month: function(c) { return "monat" + ((c !== 1) ? "e" : ""); },
      week: function(c) { return "woche" + ((c !== 1) ? "n" : ""); },
      day: function(c) { return "tag" + ((c !== 1) ? "e" : ""); },
      hour: function(c) { return "stunde" + ((c !== 1) ? "n" : ""); },
      minute: function(c) { return "minute" + ((c !== 1) ? "n" : ""); },
      second: function(c) { return "sekunde" + ((c !== 1) ? "n" : ""); },
      millisecond: function(c) { return "millisekunde" + ((c !== 1) ? "n" : ""); }
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
    nl: {
      year: function() { return "jaar"; },
      month: function(c) { return (c === 1) ? "maand" : "maanden"; },
      week: function(c) { return (c === 1) ? "week" : "weken"; },
      day: function(c) { return (c === 1) ? "dag" : "dagen"; },
      hour: function() { return "uur"; },
      minute: function(c) { return (c === 1) ? "minuut" : "minuten"; },
      second: function(c) { return (c === 1) ? "seconde" : "seconden"; },
      millisecond: function(c) { return (c === 1) ? "milliseconde" : "milliseconden"; }
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
      month: function() { return "mois"; },
      week: function(c) { return "semaine" + ((c !== 1) ? "s" : ""); },
      day: function(c) { return "jour" + ((c !== 1) ? "s" : ""); },
      hour: function(c) { return "heure" + ((c !== 1) ? "s" : ""); },
      minute: function(c) { return "minute" + ((c !== 1) ? "s" : ""); },
      second: function(c) { return "seconde" + ((c !== 1) ? "s" : ""); },
      millisecond: function(c) { return "milliseconde" + ((c !== 1) ? "s" : ""); }
    },
    ko: {
      year: function() { return "년"; },
      month: function() { return "개월"; },
      week: function() { return "주일"; },
      day: function() { return "일"; },
      hour: function() { return "시간"; },
      minute: function() { return "분"; },
      second: function() { return "초"; },
      millisecond: function() { return "밀리 초"; }
    },
    nob: {
      year: function() { return "år"; },
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
    "zh-CN": {
      year: function() { return "年"; },
      month: function() { return "个月"; },
      week: function() { return "周"; },
      day: function() { return "天"; },
      hour: function() { return "小时"; },
      minute: function() { return "分钟"; },
      second: function() { return "秒"; },
      millisecond: function() { return "毫秒"; }
    },
    "zh-TW": {
      year: function() { return "年"; },
      month: function() { return "個月"; },
      week: function() { return "周"; },
      day: function() { return "天"; },
      hour: function() { return "小時"; },
      minute: function() { return "分鐘"; },
      second: function() { return "秒"; },
      millisecond: function() { return "毫秒"; }
    }
  };

  // You can create a humanizer, which returns a function with defaults
  // parameters.
  function humanizer(passedOptions) {

    var result = function humanizer(ms, passedOptions) {
      var options = extend({}, result, passedOptions || {});
      return doHumanization(ms, options);
    };

    extend(result, {
      language: "en",
      delimiter: ", ",
      units: [
        "year",
        "month",
        "week",
        "day",
        "hour",
        "minute",
        "second"
      ],
      languages: {}
    }, passedOptions);

    return result;

  }

  // The main function is just a wrapper around a default humanizer.
  var defaultHumanizer = humanizer({});
  function humanizeDuration(ms, passedOptions) {
    return defaultHumanizer(ms, passedOptions);
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
      if (result.length === 0) {
        mightBeHalfUnit = (ms / unitMS) * 2;
        if (mightBeHalfUnit === Math.floor(mightBeHalfUnit)) {
          return render(mightBeHalfUnit / 2, unitName, dictionary);
        }
      }

      // What's the number of full units we can fit?
      if ((i + 1) === len) {
        unitCount = ms / unitMS;
      } else {
        unitCount = Math.floor(ms / unitMS);
      }

      // Add the string.
      if (unitCount) {
        result.push(render(unitCount, unitName, dictionary));
      }

      // Remove what we just figured out.
      ms -= unitCount * unitMS;

    }

    return result.join(options.delimiter);

  }

  humanizeDuration.humanizer = humanizer;
  if ((typeof module !== "undefined") && (module.exports)) {
    module.exports = humanizeDuration;
  } else {
    this.humanizeDuration = humanizeDuration;
  }

  function render(count, word, dictionary) {
    return count + " " + dictionary[word](count);
  }

  function extend(destination) {
    var source;
    for (var i = 1; i < arguments.length; i ++) {
      source = arguments[i];
      for (var prop in source) {
        destination[prop] = source[prop];
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
    } else if (c === 0 || (c >= 5 && c <= 20) || (c % 10 >= 5 && c % 10 <= 9) || (c % 10 === 0) ) {
      return 0;
    } else if (c === 1 || c % 10 === 1) {
      return 1;
    } else if (c > 1) {
      return 2;
    } else {
      return 0;
    }
  }

})();

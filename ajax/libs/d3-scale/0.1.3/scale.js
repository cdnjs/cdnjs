(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.d3 = {}));
}(this, function (exports) { 'use strict';

  var zhCn$1 = {
    dateTime: "%a %b %e %X %Y",
    date: "%Y/%-m/%-d",
    time: "%H:%M:%S",
    periods: ["上午", "下午"],
    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    shortDays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    shortMonths: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
  };

  var ruRu$1 = {
    dateTime: "%A, %e %B %Y г. %X",
    date: "%d.%m.%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
    shortDays: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
    months: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    shortMonths: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
  };

  var ptBr$1 = {
    dateTime: "%A, %e de %B de %Y. %X",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    shortDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    shortMonths: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  };

  var plPl$1 = {
    dateTime: "%A, %e %B %Y, %X",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"], // unused
    days: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
    shortDays: ["Niedz.", "Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob."],
    months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
    shortMonths: ["Stycz.", "Luty", "Marz.", "Kwie.", "Maj", "Czerw.", "Lipc.", "Sierp.", "Wrz.", "Paźdz.", "Listop.", "Grudz."]/* In Polish language abbraviated months are not commonly used so there is a dispute about the proper abbraviations. */
  };

  var nlNl$1 = {
    dateTime: "%a %e %B %Y %T",
    date: "%d-%m-%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"], // unused
    days: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
    shortDays: ["zo", "ma", "di", "wo", "do", "vr", "za"],
    months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
    shortMonths: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"]
  };

  var mkMk$1 = {
    dateTime: "%A, %e %B %Y г. %X",
    date: "%d.%m.%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["недела", "понеделник", "вторник", "среда", "четврток", "петок", "сабота"],
    shortDays: ["нед", "пон", "вто", "сре", "чет", "пет", "саб"],
    months: ["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"],
    shortMonths: ["јан", "фев", "мар", "апр", "мај", "јун", "јул", "авг", "сеп", "окт", "ное", "дек"]
  };

  var jaJp$1 = {
    dateTime: "%Y %b %e %a %X",
    date: "%Y/%m/%d",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
    shortDays: ["日", "月", "火", "水", "木", "金", "土"],
    months: ["睦月", "如月", "弥生", "卯月", "皐月", "水無月", "文月", "葉月", "長月", "神無月", "霜月", "師走"],
    shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  };

  var itIt$1 = {
    dateTime: "%A %e %B %Y, %X",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"], // unused
    days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
    shortDays: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
    months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
    shortMonths: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]
  };

  var heIl$1 = {
    dateTime: "%A, %e ב%B %Y %X",
    date: "%d.%m.%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
    shortDays: ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"],
    months: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
    shortMonths: ["ינו׳", "פבר׳", "מרץ", "אפר׳", "מאי", "יוני", "יולי", "אוג׳", "ספט׳", "אוק׳", "נוב׳", "דצמ׳"]
  };

  var frFr$1 = {
    dateTime: "%A, le %e %B %Y, %X",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"], // unused
    days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
    shortDays: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
    months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
    shortMonths: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
  };

  var frCa$1 = {
    dateTime: "%a %e %b %Y %X",
    date: "%Y-%m-%d",
    time: "%H:%M:%S",
    periods: ["", ""],
    days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
    shortDays: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
    months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
    shortMonths: ["jan", "fév", "mar", "avr", "mai", "jui", "jul", "aoû", "sep", "oct", "nov", "déc"]
  };

  var fiFi$1 = {
    dateTime: "%A, %-d. %Bta %Y klo %X",
    date: "%-d.%-m.%Y",
    time: "%H:%M:%S",
    periods: ["a.m.", "p.m."],
    days: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"],
    shortDays: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
    months: ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"],
    shortMonths: ["Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kesä", "Heinä", "Elo", "Syys", "Loka", "Marras", "Joulu"]
  };

  var esEs$1 = {
    dateTime: "%A, %e de %B de %Y, %X",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    shortDays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    shortMonths: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
  };

  var locale$2 = {
    dateTime: "%a %b %e %X %Y",
    date: "%m/%d/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  };

  var enGb$1 = {
    dateTime: "%a %e %b %X %Y",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  };

  var enCa$1 = {
    dateTime: "%a %b %e %X %Y",
    date: "%Y-%m-%d",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  };

  var deDe$1 = {
    dateTime: "%A, der %e. %B %Y, %X",
    date: "%d.%m.%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"], // unused
    days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    shortMonths: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
  };

  var caEs$1 = {
    dateTime: "%A, %e de %B de %Y, %X",
    date: "%d/%m/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],
    shortDays: ["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."],
    months: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
    shortMonths: ["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des."]
  };

  var t0$2 = new Date;
  var t1$2 = new Date;
  function newInterval(floori, offseti, count) {

    function interval(date) {
      return floori(date = new Date(+date)), date;
    }

    interval.floor = interval;

    interval.round = function(date) {
      var d0 = new Date(+date),
          d1 = new Date(date - 1);
      floori(d0), floori(d1), offseti(d1, 1);
      return date - d0 < d1 - date ? d0 : d1;
    };

    interval.ceil = function(date) {
      return floori(date = new Date(date - 1)), offseti(date, 1), date;
    };

    interval.offset = function(date, step) {
      return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
    };

    interval.range = function(start, stop, step) {
      var range = [];
      start = new Date(start - 1);
      stop = new Date(+stop);
      step = step == null ? 1 : Math.floor(step);
      if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
      offseti(start, 1), floori(start);
      if (start < stop) range.push(new Date(+start));
      while (offseti(start, step), floori(start), start < stop) range.push(new Date(+start));
      return range;
    };

    interval.filter = function(test) {
      return newInterval(function(date) {
        while (floori(date), !test(date)) date.setTime(date - 1);
      }, function(date, step) {
        while (--step >= 0) while (offseti(date, 1), !test(date));
      });
    };

    if (count) interval.count = function(start, end) {
      t0$2.setTime(+start), t1$2.setTime(+end);
      floori(t0$2), floori(t1$2);
      return Math.floor(count(t0$2, t1$2));
    };

    return interval;
  };

  var second = newInterval(function(date) {
    date.setMilliseconds(0);
  }, function(date, step) {
    date.setTime(+date + step * 1e3);
  }, function(start, end) {
    return (end - start) / 1e3;
  });

  var minute = newInterval(function(date) {
    date.setSeconds(0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 6e4);
  }, function(start, end) {
    return (end - start) / 6e4;
  });

  var hour = newInterval(function(date) {
    date.setMinutes(0, 0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 36e5);
  }, function(start, end) {
    return (end - start) / 36e5;
  });

  var day = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 864e5;
  });

  function weekday(i) {
    return newInterval(function(date) {
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    }, function(date, step) {
      date.setDate(date.getDate() + step * 7);
    }, function(start, end) {
      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 6048e5;
    });
  }

  var sunday = weekday(0);
  var monday = weekday(1);
  var tuesday = weekday(2);
  var wednesday = weekday(3);
  var thursday = weekday(4);
  var friday = weekday(5);
  var saturday = weekday(6);

  var month = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
    date.setDate(1);
  }, function(date, step) {
    date.setMonth(date.getMonth() + step);
  }, function(start, end) {
    return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
  });

  var year = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
    date.setMonth(0, 1);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step);
  }, function(start, end) {
    return end.getFullYear() - start.getFullYear();
  });

  var utcSecond = newInterval(function(date) {
    date.setUTCMilliseconds(0);
  }, function(date, step) {
    date.setTime(+date + step * 1e3);
  }, function(start, end) {
    return (end - start) / 1e3;
  });

  var utcMinute = newInterval(function(date) {
    date.setUTCSeconds(0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 6e4);
  }, function(start, end) {
    return (end - start) / 6e4;
  });

  var utcHour = newInterval(function(date) {
    date.setUTCMinutes(0, 0, 0);
  }, function(date, step) {
    date.setTime(+date + step * 36e5);
  }, function(start, end) {
    return (end - start) / 36e5;
  });

  var utcDay = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step);
  }, function(start, end) {
    return (end - start) / 864e5;
  });

  function utcWeekday(i) {
    return newInterval(function(date) {
      date.setUTCHours(0, 0, 0, 0);
      date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    }, function(date, step) {
      date.setUTCDate(date.getUTCDate() + step * 7);
    }, function(start, end) {
      return (end - start) / 6048e5;
    });
  }

  var utcSunday = utcWeekday(0);
  var utcMonday = utcWeekday(1);
  var utcTuesday = utcWeekday(2);
  var utcWednesday = utcWeekday(3);
  var utcThursday = utcWeekday(4);
  var utcFriday = utcWeekday(5);
  var utcSaturday = utcWeekday(6);

  var utcMonth = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCDate(1);
  }, function(date, step) {
    date.setUTCMonth(date.getUTCMonth() + step);
  }, function(start, end) {
    return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
  });

  var utcYear = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCMonth(0, 1);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step);
  }, function(start, end) {
    return end.getUTCFullYear() - start.getUTCFullYear();
  });

  function localDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
      date.setFullYear(d.y);
      return date;
    }
    return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
  }

  function utcDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
      date.setUTCFullYear(d.y);
      return date;
    }
    return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
  }

  function newYear(y) {
    return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
  }

  function locale$1(locale) {
    var locale_dateTime = locale.dateTime,
        locale_date = locale.date,
        locale_time = locale.time,
        locale_periods = locale.periods,
        locale_weekdays = locale.days,
        locale_shortWeekdays = locale.shortDays,
        locale_months = locale.months,
        locale_shortMonths = locale.shortMonths;

    var periodLookup = formatLookup(locale_periods),
        weekdayRe = formatRe(locale_weekdays),
        weekdayLookup = formatLookup(locale_weekdays),
        shortWeekdayRe = formatRe(locale_shortWeekdays),
        shortWeekdayLookup = formatLookup(locale_shortWeekdays),
        monthRe = formatRe(locale_months),
        monthLookup = formatLookup(locale_months),
        shortMonthRe = formatRe(locale_shortMonths),
        shortMonthLookup = formatLookup(locale_shortMonths);

    var formats = {
      "a": formatShortWeekday,
      "A": formatWeekday,
      "b": formatShortMonth,
      "B": formatMonth,
      "c": null,
      "d": formatDayOfMonth,
      "e": formatDayOfMonth,
      "H": formatHour24,
      "I": formatHour12,
      "j": formatDayOfYear,
      "L": formatMilliseconds,
      "m": formatMonthNumber,
      "M": formatMinutes,
      "p": formatPeriod,
      "S": formatSeconds,
      "U": formatWeekNumberSunday,
      "w": formatWeekdayNumber,
      "W": formatWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatYear$1,
      "Y": formatFullYear,
      "Z": formatZone,
      "%": formatLiteralPercent
    };

    var utcFormats = {
      "a": formatUTCShortWeekday,
      "A": formatUTCWeekday,
      "b": formatUTCShortMonth,
      "B": formatUTCMonth,
      "c": null,
      "d": formatUTCDayOfMonth,
      "e": formatUTCDayOfMonth,
      "H": formatUTCHour24,
      "I": formatUTCHour12,
      "j": formatUTCDayOfYear,
      "L": formatUTCMilliseconds,
      "m": formatUTCMonthNumber,
      "M": formatUTCMinutes,
      "p": formatUTCPeriod,
      "S": formatUTCSeconds,
      "U": formatUTCWeekNumberSunday,
      "w": formatUTCWeekdayNumber,
      "W": formatUTCWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatUTCYear$1,
      "Y": formatUTCFullYear,
      "Z": formatUTCZone,
      "%": formatLiteralPercent
    };

    var parses = {
      "a": parseShortWeekday,
      "A": parseWeekday,
      "b": parseShortMonth,
      "B": parseMonth,
      "c": parseLocaleDateTime,
      "d": parseDayOfMonth,
      "e": parseDayOfMonth,
      "H": parseHour24,
      "I": parseHour24,
      "j": parseDayOfYear,
      "L": parseMilliseconds,
      "m": parseMonthNumber,
      "M": parseMinutes,
      "p": parsePeriod,
      "S": parseSeconds,
      "U": parseWeekNumberSunday,
      "w": parseWeekdayNumber,
      "W": parseWeekNumberMonday,
      "x": parseLocaleDate,
      "X": parseLocaleTime,
      "y": parseYear,
      "Y": parseFullYear,
      "Z": parseZone,
      "%": parseLiteralPercent
    };

    // These recursive directive definitions must be deferred.
    formats.x = newFormat(locale_date, formats);
    formats.X = newFormat(locale_time, formats);
    formats.c = newFormat(locale_dateTime, formats);
    utcFormats.x = newFormat(locale_date, utcFormats);
    utcFormats.X = newFormat(locale_time, utcFormats);
    utcFormats.c = newFormat(locale_dateTime, utcFormats);

    function newFormat(specifier, formats) {
      return function(date) {
        var string = [],
            i = -1,
            j = 0,
            n = specifier.length,
            c,
            pad,
            format;

        while (++i < n) {
          if (specifier.charCodeAt(i) === 37) {
            string.push(specifier.slice(j, i));
            if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
            if (format = formats[c]) c = format(date, pad == null ? (c === "e" ? " " : "0") : pad);
            string.push(c);
            j = i + 1;
          }
        }

        string.push(specifier.slice(j, i));
        return string.join("");
      };
    }

    function newParse(specifier, newDate) {
      return function(string) {
        var d = newYear(1900),
            i = parseSpecifier(d, specifier, string, 0);
        if (i != string.length) return null;

        // The am-pm flag is 0 for AM, and 1 for PM.
        if ("p" in d) d.H = d.H % 12 + d.p * 12;

        // If a time zone is specified, all fields are interpreted as UTC and then
        // offset according to the specified time zone.
        if ("Z" in d) {
          if ("w" in d && ("W" in d || "U" in d)) {
            var day = utcDate(newYear(d.y)).getUTCDay();
            if ("W" in d) d.U = d.W, d.w = (d.w + 6) % 7, --day;
            d.m = 0;
            d.d = d.w + d.U * 7 - (day + 6) % 7;
          }
          d.H += d.Z / 100 | 0;
          d.M += d.Z % 100;
          return utcDate(d);
        }

        // Otherwise, all fields are in local time.
        if ("w" in d && ("W" in d || "U" in d)) {
          var day = newDate(newYear(d.y)).getDay();
          if ("W" in d) d.U = d.W, d.w = (d.w + 6) % 7, --day;
          d.m = 0;
          d.d = d.w + d.U * 7 - (day + 6) % 7;
        }
        return newDate(d);
      };
    }

    function parseSpecifier(d, specifier, string, j) {
      var i = 0,
          n = specifier.length,
          m = string.length,
          c,
          parse;

      while (i < n) {
        if (j >= m) return -1;
        c = specifier.charCodeAt(i++);
        if (c === 37) {
          c = specifier.charAt(i++);
          parse = parses[c in pads ? specifier.charAt(i++) : c];
          if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
        } else if (c != string.charCodeAt(j++)) {
          return -1;
        }
      }

      return j;
    }

    function parseShortWeekday(d, string, i) {
      var n = shortWeekdayRe.exec(string.slice(i));
      return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseWeekday(d, string, i) {
      var n = weekdayRe.exec(string.slice(i));
      return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseShortMonth(d, string, i) {
      var n = shortMonthRe.exec(string.slice(i));
      return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseMonth(d, string, i) {
      var n = monthRe.exec(string.slice(i));
      return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseLocaleDateTime(d, string, i) {
      return parseSpecifier(d, locale_dateTime, string, i);
    }

    function parseLocaleDate(d, string, i) {
      return parseSpecifier(d, locale_date, string, i);
    }

    function parseLocaleTime(d, string, i) {
      return parseSpecifier(d, locale_time, string, i);
    }

    function parsePeriod(d, string, i) {
      var n = periodLookup[string.slice(i, i += 2).toLowerCase()];
      return n == null ? -1 : (d.p = n, i);
    }

    function formatShortWeekday(d) {
      return locale_shortWeekdays[d.getDay()];
    }

    function formatWeekday(d) {
      return locale_weekdays[d.getDay()];
    }

    function formatShortMonth(d) {
      return locale_shortMonths[d.getMonth()];
    }

    function formatMonth(d) {
      return locale_months[d.getMonth()];
    }

    function formatPeriod(d) {
      return locale_periods[+(d.getHours() >= 12)];
    }

    function formatUTCShortWeekday(d) {
      return locale_shortWeekdays[d.getUTCDay()];
    }

    function formatUTCWeekday(d) {
      return locale_weekdays[d.getUTCDay()];
    }

    function formatUTCShortMonth(d) {
      return locale_shortMonths[d.getUTCMonth()];
    }

    function formatUTCMonth(d) {
      return locale_months[d.getUTCMonth()];
    }

    function formatUTCPeriod(d) {
      return locale_periods[+(d.getUTCHours() >= 12)];
    }

    return {
      format: function(specifier) {
        var f = newFormat(specifier += "", formats);
        f.parse = newParse(specifier, localDate);
        f.toString = function() { return specifier; };
        return f;
      },
      utcFormat: function(specifier) {
        var f = newFormat(specifier += "", utcFormats);
        f.parse = newParse(specifier, utcDate);
        f.toString = function() { return specifier; };
        return f;
      }
    };
  };

  var pads = {"-": "", "_": " ", "0": "0"};
  var numberRe = /^\s*\d+/;
  var percentRe = /^%/;
  var requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
  function pad(value, fill, width) {
    var sign = value < 0 ? "-" : "",
        string = (sign ? -value : value) + "",
        length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }

  function requote(s) {
    return s.replace(requoteRe, "\\$&");
  }

  function formatRe(names) {
    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
  }

  function formatLookup(names) {
    var map = {}, i = -1, n = names.length;
    while (++i < n) map[names[i].toLowerCase()] = i;
    return map;
  }

  function parseWeekdayNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.w = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.U = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.W = +n[0], i + n[0].length) : -1;
  }

  function parseFullYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 4));
    return n ? (d.y = +n[0], i + n[0].length) : -1;
  }

  function parseYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
  }

  function parseZone(d, string, i) {
    var n = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(string.slice(i, i + 6));
    if (n) {
      d.Z = n[1] ? 0              // 'Z' for UTC
          : n[3] ? -(n[2] + n[3]) // sign differs from getTimezoneOffset!
                 : -n[2] * 100;
      return i + n[0].length;
    }
    return -1;
  }

  function parseMonthNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
  }

  function parseDayOfMonth(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.d = +n[0], i + n[0].length) : -1;
  }

  function parseDayOfYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
  }

  function parseHour24(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.H = +n[0], i + n[0].length) : -1;
  }

  function parseMinutes(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.M = +n[0], i + n[0].length) : -1;
  }

  function parseSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.S = +n[0], i + n[0].length) : -1;
  }

  function parseMilliseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.L = +n[0], i + n[0].length) : -1;
  }

  function parseLiteralPercent(d, string, i) {
    var n = percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }

  function formatDayOfMonth(d, p) {
    return pad(d.getDate(), p, 2);
  }

  function formatHour24(d, p) {
    return pad(d.getHours(), p, 2);
  }

  function formatHour12(d, p) {
    return pad(d.getHours() % 12 || 12, p, 2);
  }

  function formatDayOfYear(d, p) {
    return pad(1 + day.count(year(d), d), p, 3);
  }

  function formatMilliseconds(d, p) {
    return pad(d.getMilliseconds(), p, 3);
  }

  function formatMonthNumber(d, p) {
    return pad(d.getMonth() + 1, p, 2);
  }

  function formatMinutes(d, p) {
    return pad(d.getMinutes(), p, 2);
  }

  function formatSeconds(d, p) {
    return pad(d.getSeconds(), p, 2);
  }

  function formatWeekNumberSunday(d, p) {
    return pad(sunday.count(year(d), d), p, 2);
  }

  function formatWeekdayNumber(d) {
    return d.getDay();
  }

  function formatWeekNumberMonday(d, p) {
    return pad(monday.count(year(d), d), p, 2);
  }

  function formatYear$1(d, p) {
    return pad(d.getFullYear() % 100, p, 2);
  }

  function formatFullYear(d, p) {
    return pad(d.getFullYear() % 10000, p, 4);
  }

  function formatZone(d) {
    var z = d.getTimezoneOffset();
    return (z > 0 ? "-" : (z *= -1, "+"))
        + pad(z / 60 | 0, "0", 2)
        + pad(z % 60, "0", 2);
  }

  function formatUTCDayOfMonth(d, p) {
    return pad(d.getUTCDate(), p, 2);
  }

  function formatUTCHour24(d, p) {
    return pad(d.getUTCHours(), p, 2);
  }

  function formatUTCHour12(d, p) {
    return pad(d.getUTCHours() % 12 || 12, p, 2);
  }

  function formatUTCDayOfYear(d, p) {
    return pad(1 + utcDay.count(utcYear(d), d), p, 3);
  }

  function formatUTCMilliseconds(d, p) {
    return pad(d.getUTCMilliseconds(), p, 3);
  }

  function formatUTCMonthNumber(d, p) {
    return pad(d.getUTCMonth() + 1, p, 2);
  }

  function formatUTCMinutes(d, p) {
    return pad(d.getUTCMinutes(), p, 2);
  }

  function formatUTCSeconds(d, p) {
    return pad(d.getUTCSeconds(), p, 2);
  }

  function formatUTCWeekNumberSunday(d, p) {
    return pad(utcSunday.count(utcYear(d), d), p, 2);
  }

  function formatUTCWeekdayNumber(d) {
    return d.getUTCDay();
  }

  function formatUTCWeekNumberMonday(d, p) {
    return pad(utcMonday.count(utcYear(d), d), p, 2);
  }

  function formatUTCYear$1(d, p) {
    return pad(d.getUTCFullYear() % 100, p, 2);
  }

  function formatUTCFullYear(d, p) {
    return pad(d.getUTCFullYear() % 10000, p, 4);
  }

  function formatUTCZone() {
    return "+0000";
  }

  function formatLiteralPercent() {
    return "%";
  }

  var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

  function formatIsoNative(date) {
    return date.toISOString();
  }

  formatIsoNative.parse = function(string) {
    var date = new Date(string);
    return isNaN(date) ? null : date;
  };

  formatIsoNative.toString = function() {
    return isoSpecifier;
  };

  var formatIso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z")
      ? formatIsoNative
      : locale$2.utcFormat(isoSpecifier);

  var localeDefinitions$1 = {
    "ca-ES": caEs$1,
    "de-DE": deDe$1,
    "en-CA": enCa$1,
    "en-GB": enGb$1,
    "en-US": locale$2,
    "es-ES": esEs$1,
    "fi-FI": fiFi$1,
    "fr-CA": frCa$1,
    "fr-FR": frFr$1,
    "he-IL": heIl$1,
    "it-IT": itIt$1,
    "ja-JP": jaJp$1,
    "mk-MK": mkMk$1,
    "nl-NL": nlNl$1,
    "pl-PL": plPl$1,
    "pt-BR": ptBr$1,
    "ru-RU": ruRu$1,
    "zh-CN": zhCn$1
  };

  var defaultLocale$1 = locale$1(locale$2);
  var format$2 = defaultLocale$1.format;
  var utcFormat = defaultLocale$1.utcFormat;

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  };

  function bisector(compare) {
    if (compare.length === 1) compare = ascendingComparator(compare);
    return {
      left: function(a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) < 0) lo = mid + 1;
          else hi = mid;
        }
        return lo;
      },
      right: function(a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) > 0) hi = mid;
          else lo = mid + 1;
        }
        return lo;
      }
    };
  };

  function ascendingComparator(f) {
    return function(d, x) {
      return ascending(f(d), x);
    };
  }

  var ascendingBisect = bisector(ascending);
  var bisectRight = ascendingBisect.right;

  var prefix$1 = "$";

  function Map() {}

  Map.prototype = map.prototype = {
    has: function(key) {
      return (prefix$1 + key) in this;
    },
    get: function(key) {
      return this[prefix$1 + key];
    },
    set: function(key, value) {
      return this[prefix$1 + key] = value;
    },
    remove: function(key) {
      var property = prefix$1 + key;
      return property in this && delete this[property];
    },
    keys: function() {
      var keys = [];
      for (var property in this) if (property[0] === prefix$1) keys.push(property.slice(1));
      return keys;
    },
    values: function() {
      var values = [];
      for (var property in this) if (property[0] === prefix$1) values.push(this[property]);
      return values;
    },
    entries: function() {
      var entries = [];
      for (var property in this) if (property[0] === prefix$1) entries.push({key: property.slice(1), value: this[property]});
      return entries;
    },
    size: function() {
      var size = 0;
      for (var property in this) if (property[0] === prefix$1) ++size;
      return size;
    },
    empty: function() {
      for (var property in this) if (property[0] === prefix$1) return false;
      return true;
    },
    forEach: function(f) {
      for (var property in this) if (property[0] === prefix$1) f.call(this, property.slice(1), this[property]);
    }
  };

  function map(object, f) {
    var map = new Map;

    // Copy constructor.
    if (object instanceof Map) object.forEach(function(key, value) { map.set(key, value); });

    // Index array by numeric index or specified key function.
    else if (Array.isArray(object)) {
      var i = -1,
          n = object.length,
          o;

      if (arguments.length === 1) while (++i < n) map.set(i, object[i]);
      else while (++i < n) map.set(f.call(object, o = object[i], i), o);
    }

    // Convert object to map.
    else for (var key in object) map.set(key, object[key]);

    return map;
  }

  // R-7 per <http://en.wikipedia.org/wiki/Quantile>
  function quantile$1(values, p) {
    var H = (values.length - 1) * p + 1,
        h = Math.floor(H),
        v = +values[h - 1],
        e = H - h;
    return e ? v + e * (values[h] - v) : v;
  };

  function range$1(start, stop, step) {
    if ((n = arguments.length) < 3) {
      step = 1;
      if (n < 2) {
        stop = start;
        start = 0;
      }
    }

    var i = -1,
        n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
        k = scale(Math.abs(step)),
        range = new Array(n);

    start *= k;
    step *= k;
    while (++i < n) {
      range[i] = (start + i * step) / k;
    }

    return range;
  };

  function scale(x) {
    var k = 1;
    while (x * k % 1) k *= 10;
    return k;
  }

  var proto = map.prototype;

  function Color() {};

  var reHex3 = /^#([0-9a-f]{3})$/;
  var reHex6 = /^#([0-9a-f]{6})$/;
  var reRgbInteger = /^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/;
  var reRgbPercent = /^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
  var reHslPercent = /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
  color.prototype = Color.prototype = {
    displayable: function() {
      return this.rgb().displayable();
    },
    toString: function() {
      return this.rgb() + "";
    }
  };

  function color(format) {
    var m;
    format = (format + "").trim().toLowerCase();
    return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf))) // #f00
        : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
        : (m = reRgbInteger.exec(format)) ? rgb(m[1], m[2], m[3]) // rgb(255,0,0)
        : (m = reRgbPercent.exec(format)) ? rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100) // rgb(100%,0%,0%)
        : (m = reHslPercent.exec(format)) ? hsl(m[1], m[2] / 100, m[3] / 100) // hsl(120,50%,50%)
        : named.hasOwnProperty(format) ? rgbn(named[format])
        : null;
  };

  function rgbn(n) {
    return rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff);
  }

  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };

  var darker = .7;
  var brighter = 1 / darker;

  function rgb(r, g, b) {
    if (arguments.length === 1) {
      if (!(r instanceof Color)) r = color(r);
      if (r) {
        r = r.rgb();
        b = r.b;
        g = r.g;
        r = r.r;
      } else {
        r = g = b = NaN;
      }
    }
    return new Rgb(r, g, b);
  };

  function Rgb(r, g, b) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
  };

  var prototype = rgb.prototype = Rgb.prototype = new Color;

  prototype.brighter = function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k);
  };

  prototype.darker = function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k);
  };

  prototype.rgb = function() {
    return this;
  };

  prototype.displayable = function() {
    return (0 <= this.r && this.r <= 255)
        && (0 <= this.g && this.g <= 255)
        && (0 <= this.b && this.b <= 255);
  };

  prototype.toString = function() {
    return format$3(this.r, this.g, this.b);
  };

  function format$3(r, g, b) {
    return "#"
        + (isNaN(r) ? "00" : (r = Math.round(r)) < 16 ? "0" + Math.max(0, r).toString(16) : Math.min(255, r).toString(16))
        + (isNaN(g) ? "00" : (g = Math.round(g)) < 16 ? "0" + Math.max(0, g).toString(16) : Math.min(255, g).toString(16))
        + (isNaN(b) ? "00" : (b = Math.round(b)) < 16 ? "0" + Math.max(0, b).toString(16) : Math.min(255, b).toString(16));
  };

  function hsl(h, s, l) {
    if (arguments.length === 1) {
      if (h instanceof Hsl) {
        l = h.l;
        s = h.s;
        h = h.h;
      } else {
        if (!(h instanceof Color)) h = color(h);
        if (h) {
          if (h instanceof Hsl) return h;
          h = h.rgb();
          var r = h.r / 255,
              g = h.g / 255,
              b = h.b / 255,
              min = Math.min(r, g, b),
              max = Math.max(r, g, b),
              range = max - min;
          l = (max + min) / 2;
          if (range) {
            s = l < .5 ? range / (max + min) : range / (2 - max - min);
            if (r === max) h = (g - b) / range + (g < b) * 6;
            else if (g === max) h = (b - r) / range + 2;
            else h = (r - g) / range + 4;
            h *= 60;
          } else {
            h = NaN;
            s = l > 0 && l < 1 ? 0 : h;
          }
        } else {
          h = s = l = NaN;
        }
      }
    }
    return new Hsl(h, s, l);
  };

  function Hsl(h, s, l) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
  };

  var prototype$1 = hsl.prototype = Hsl.prototype = new Color;

  prototype$1.brighter = function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k);
  };

  prototype$1.darker = function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k);
  };

  prototype$1.rgb = function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < .5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2)
    );
  };

  prototype$1.displayable = function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1);
  };

  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60
        : h < 180 ? m2
        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
        : m1) * 255;
  }

  var Kn = 18;

  var Xn = 0.950470;
  var Yn = 1;
  var Zn = 1.088830;
  var t0$1 = 4 / 29;
  var t1$1 = 6 / 29;
  var t2 = 3 * t1$1 * t1$1;
  var t3 = t1$1 * t1$1 * t1$1;
  function lab(l, a, b) {
    if (arguments.length === 1) {
      if (l instanceof Lab) {
        b = l.b;
        a = l.a;
        l = l.l;
      } else if (l instanceof Hcl) {
        var h = l.h * deg2rad;
        b = Math.sin(h) * l.c;
        a = Math.cos(h) * l.c;
        l = l.l;
      } else {
        if (!(l instanceof Rgb)) l = rgb(l);
        var r = rgb2xyz(l.r),
            g = rgb2xyz(l.g),
            b = rgb2xyz(l.b),
            x = xyz2lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / Xn),
            y = xyz2lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / Yn),
            z = xyz2lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / Zn);
        b = 200 * (y - z);
        a = 500 * (x - y);
        l = 116 * y - 16;
      }
    }
    return new Lab(l, a, b);
  };

  function Lab(l, a, b) {
    this.l = +l;
    this.a = +a;
    this.b = +b;
  };

  var prototype$2 = lab.prototype = Lab.prototype = new Color;

  prototype$2.brighter = function(k) {
    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b);
  };

  prototype$2.darker = function(k) {
    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b);
  };

  prototype$2.rgb = function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    y = Yn * lab2xyz(y);
    x = Xn * lab2xyz(x);
    z = Zn * lab2xyz(z);
    return new Rgb(
      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z)
    );
  };

  function xyz2lab(t) {
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0$1;
  }

  function lab2xyz(t) {
    return t > t1$1 ? t * t * t : t2 * (t - t0$1);
  }

  function xyz2rgb(x) {
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
  }

  function rgb2xyz(x) {
    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  }

  var deg2rad = Math.PI / 180;
  var rad2deg = 180 / Math.PI;

  function hcl(h, c, l) {
    if (arguments.length === 1) {
      if (h instanceof Hcl) {
        l = h.l;
        c = h.c;
        h = h.h;
      } else {
        if (!(h instanceof Lab)) h = lab(h);
        l = h.l;
        c = Math.sqrt(h.a * h.a + h.b * h.b);
        h = Math.atan2(h.b, h.a) * rad2deg;
        if (h < 0) h += 360;
      }
    }
    return new Hcl(h, c, l);
  };

  function Hcl(h, c, l) {
    this.h = +h;
    this.c = +c;
    this.l = +l;
  };

  var prototype$3 = hcl.prototype = Hcl.prototype = new Color;

  prototype$3.brighter = function(k) {
    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k));
  };

  prototype$3.darker = function(k) {
    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k));
  };

  prototype$3.rgb = function() {
    return lab(this).rgb();
  };

  var A$1 = -0.14861;
  var B$1 = +1.78277;
  var C = -0.29227;
  var D = -0.90649;
  var E = +1.97294;
  var ED = E * D;
  var EB = E * B$1;
  var BC_DA = B$1 * C - D * A$1;
  function cubehelix$1(h, s, l) {
    if (arguments.length === 1) {
      if (h instanceof Cubehelix) {
        l = h.l;
        s = h.s;
        h = h.h;
      } else {
        if (!(h instanceof Rgb)) h = rgb(h);
        var r = h.r / 255, g = h.g / 255, b = h.b / 255;
        l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB);
        var bl = b - l, k = (E * (g - l) - C * bl) / D;
        s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)); // NaN if l=0 or l=1
        h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
        if (h < 0) h += 360;
      }
    }
    return new Cubehelix(h, s, l);
  };

  function Cubehelix(h, s, l) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
  };

  var prototype$4 = cubehelix$1.prototype = Cubehelix.prototype = new Color;

  prototype$4.brighter = function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k);
  };

  prototype$4.darker = function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k);
  };

  prototype$4.rgb = function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new Rgb(
      255 * (l + a * (A$1 * cosh + B$1 * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh))
    );
  };

  function deltaHue(h1, h0) {
    var delta = h1 - h0;
    return delta > 180 || delta < -180
        ? delta - 360 * Math.round(delta / 360)
        : delta;
  };

  function interpolateCubehelixGamma(gamma) {
    return function(a, b) {
      a = cubehelix$1(a);
      b = cubehelix$1(b);
      var ah = isNaN(a.h) ? b.h : a.h,
          as = isNaN(a.s) ? b.s : a.s,
          al = a.l,
          bh = isNaN(b.h) ? 0 : deltaHue(b.h, ah),
          bs = isNaN(b.s) ? 0 : b.s - as,
          bl = b.l - al;
      return function(t) {
        a.h = ah + bh * t;
        a.s = as + bs * t;
        a.l = al + bl * Math.pow(t, gamma);
        return a + "";
      };
    };
  };

  function interpolateCubehelixGammaLong(gamma) {
    return function(a, b) {
      a = cubehelix$1(a);
      b = cubehelix$1(b);
      var ah = isNaN(a.h) ? b.h : a.h,
          as = isNaN(a.s) ? b.s : a.s,
          al = a.l,
          bh = isNaN(b.h) ? 0 : b.h - ah,
          bs = isNaN(b.s) ? 0 : b.s - as,
          bl = b.l - al;
      return function(t) {
        a.h = ah + bh * t;
        a.s = as + bs * t;
        a.l = al + bl * Math.pow(t, gamma);
        return a + "";
      };
    };
  };

  function interpolateRgb(a, b) {
    a = rgb(a);
    b = rgb(b);
    var ar = a.r,
        ag = a.g,
        ab = a.b,
        br = b.r - ar,
        bg = b.g - ag,
        bb = b.b - ab;
    return function(t) {
      return format$3(Math.round(ar + br * t), Math.round(ag + bg * t), Math.round(ab + bb * t));
    };
  };

  var interpolateCubehelix = interpolateCubehelixGamma(1);
  var interpolateCubehelixLong = interpolateCubehelixGammaLong(1);

  // TODO sparse arrays?
  function interpolateArray(a, b) {
    var x = [],
        c = [],
        na = a.length,
        nb = b.length,
        n0 = Math.min(a.length, b.length),
        i;

    for (i = 0; i < n0; ++i) x.push(interpolate(a[i], b[i]));
    for (; i < na; ++i) c[i] = a[i];
    for (; i < nb; ++i) c[i] = b[i];

    return function(t) {
      for (i = 0; i < n0; ++i) c[i] = x[i](t);
      return c;
    };
  };

  function interpolateNumber(a, b) {
    return a = +a, b -= a, function(t) {
      return a + b * t;
    };
  };

  function interpolateObject(a, b) {
    var i = {},
        c = {},
        k;

    for (k in a) {
      if (k in b) {
        i[k] = interpolate(a[k], b[k]);
      } else {
        c[k] = a[k];
      }
    }

    for (k in b) {
      if (!(k in a)) {
        c[k] = b[k];
      }
    }

    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  };

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
  var reB = new RegExp(reA.source, "g");
  function interpolate0(b) {
    return function() {
      return b;
    };
  }

  function interpolate1(b) {
    return function(t) {
      return b(t) + "";
    };
  }

  function interpolateString(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
        am, // current match in a
        bm, // current match in b
        bs, // string preceding current number in b, if any
        i = -1, // index in s
        s = [], // string constants and placeholders
        q = []; // number interpolators

    // Coerce inputs to strings.
    a = a + "", b = b + "";

    // Interpolate pairs of numbers in a & b.
    while ((am = reA.exec(a))
        && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) { // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else { // interpolate non-matching numbers
        s[++i] = null;
        q.push({i: i, x: interpolateNumber(am, bm)});
      }
      bi = reB.lastIndex;
    }

    // Add remains of b.
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2 ? (q[0]
        ? interpolate1(q[0].x)
        : interpolate0(b))
        : (b = q.length, function(t) {
            for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
            return s.join("");
          });
  };

  var interpolators = [
    function(a, b) {
      var t = typeof b, c;
      return (t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
          : b instanceof color ? interpolateRgb
          : Array.isArray(b) ? interpolateArray
          : t === "object" && isNaN(b) ? interpolateObject
          : interpolateNumber)(a, b);
    }
  ];

  function interpolate(a, b) {
    var i = interpolators.length, f;
    while (--i >= 0 && !(f = interpolators[i](a, b)));
    return f;
  };

  function interpolateRound(a, b) {
    return a = +a, b -= a, function(t) {
      return Math.round(a + b * t);
    };
  };

  function nice(domain, step) {
    domain = domain.slice();
    if (!step) return domain;

    var i0 = 0,
        i1 = domain.length - 1,
        x0 = domain[i0],
        x1 = domain[i1],
        t;

    if (x1 < x0) {
      t = i0, i0 = i1, i1 = t;
      t = x0, x0 = x1, x1 = t;
    }

    domain[i0] = Math.floor(x0 / step) * step;
    domain[i1] = Math.ceil(x1 / step) * step;
    return domain;
  };

  var zhCn = {
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["¥", ""]
  };

  var ruRu = {
    decimal: ",",
    thousands: "\xa0",
    grouping: [3],
    currency: ["", "\xa0руб."]
  };

  var ptBr = {
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["R$", ""]
  };

  var plPl = {
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["", "zł"]
  };

  var nlNl = {
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["€\xa0", ""]
  };

  var mkMk = {
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["", "\xa0ден."]
  };

  var jaJp = {
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["", "円"]
  };

  var itIt = {
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["€", ""]
  };

  var heIl = {
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["₪", ""]
  };

  var frFr = {
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["", "\xa0€"]
  };

  var frCa = {
    decimal: ",",
    thousands: "\xa0",
    grouping: [3],
    currency: ["", "$"]
  };

  var fiFi = {
    decimal: ",",
    thousands: "\xa0",
    grouping: [3],
    currency: ["", "\xa0€"]
  };

  var esEs = {
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["", "\xa0€"]
  };

  var enUs = {
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  };

  var enGb = {
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["£", ""]
  };

  var enCa = {
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  };

  var deDe = {
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["", "\xa0€"]
  };

  var caEs = {
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["", "\xa0€"]
  };

  // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimal(1.23) returns ["123", 0].
  function formatDecimal(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);

    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [
      coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
      +x.slice(i + 1)
    ];
  };

  function exponent$1(x) {
    return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
  };

  function formatGroup(grouping, thousands) {
    return function(value, width) {
      var i = value.length,
          t = [],
          j = 0,
          g = grouping[0],
          length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = grouping[j = (j + 1) % grouping.length];
      }

      return t.reverse().join(thousands);
    };
  };

  var prefixExponent;

  function formatPrefixAuto(x, p) {
    var d = formatDecimal(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1],
        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
        n = coefficient.length;
    return i === n ? coefficient
        : i > n ? coefficient + new Array(i - n + 1).join("0")
        : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
        : "0." + new Array(1 - i).join("0") + formatDecimal(x, p + i - 1)[0]; // less than 1y!
  };

  function formatRounded(x, p) {
    var d = formatDecimal(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
        : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
        : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  };

  function formatDefault(x, p) {
    x = x.toPrecision(p);

    out: for (var n = x.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (x[i]) {
        case ".": i0 = i1 = i; break;
        case "0": if (i0 === 0) i0 = i; i1 = i; break;
        case "e": break out;
        default: if (i0 > 0) i0 = 0; break;
      }
    }

    return i0 > 0 ? x.slice(0, i0) + x.slice(i1 + 1) : x;
  };

  var formatTypes = {
    "": formatDefault,
    "%": function(x, p) { return (x * 100).toFixed(p); },
    "b": function(x) { return Math.round(x).toString(2); },
    "c": function(x) { return x + ""; },
    "d": function(x) { return Math.round(x).toString(10); },
    "e": function(x, p) { return x.toExponential(p); },
    "f": function(x, p) { return x.toFixed(p); },
    "g": function(x, p) { return x.toPrecision(p); },
    "o": function(x) { return Math.round(x).toString(8); },
    "p": function(x, p) { return formatRounded(x * 100, p); },
    "r": formatRounded,
    "s": formatPrefixAuto,
    "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
    "x": function(x) { return Math.round(x).toString(16); }
  };

  // [[fill]align][sign][symbol][0][width][,][.precision][type]
  var re = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;

  function formatSpecifier(specifier) {
    return new FormatSpecifier(specifier);
  };

  function FormatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);

    var match,
        fill = match[1] || " ",
        align = match[2] || ">",
        sign = match[3] || "-",
        symbol = match[4] || "",
        zero = !!match[5],
        width = match[6] && +match[6],
        comma = !!match[7],
        precision = match[8] && +match[8].slice(1),
        type = match[9] || "";

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // Map invalid types to the default format.
    else if (!formatTypes[type]) type = "";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    this.fill = fill;
    this.align = align;
    this.sign = sign;
    this.symbol = symbol;
    this.zero = zero;
    this.width = width;
    this.comma = comma;
    this.precision = precision;
    this.type = type;
  }

  FormatSpecifier.prototype.toString = function() {
    return this.fill
        + this.align
        + this.sign
        + this.symbol
        + (this.zero ? "0" : "")
        + (this.width == null ? "" : Math.max(1, this.width | 0))
        + (this.comma ? "," : "")
        + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
        + this.type;
  };

  var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

  function identity$2(x) {
    return x;
  }

  function locale(locale) {
    var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity$2,
        currency = locale.currency,
        decimal = locale.decimal;

    function format(specifier) {
      specifier = formatSpecifier(specifier);

      var fill = specifier.fill,
          align = specifier.align,
          sign = specifier.sign,
          symbol = specifier.symbol,
          zero = specifier.zero,
          width = specifier.width,
          comma = specifier.comma,
          precision = specifier.precision,
          type = specifier.type;

      // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.
      var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
          suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? "%" : "";

      // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?
      var formatType = formatTypes[type],
          maybeSuffix = !type || /[defgprs%]/.test(type);

      // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].
      precision = precision == null ? (type ? 6 : 12)
          : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
          : Math.max(0, Math.min(20, precision));

      return function(value) {
        var valuePrefix = prefix,
            valueSuffix = suffix;

        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value;

          // Convert negative to positive, and compute the prefix.
          // Note that -0 is not less than 0, but 1 / -0 is!
          var valueNegative = (value < 0 || 1 / value < 0) && (value *= -1, true);

          // Perform the initial formatting.
          value = formatType(value, precision);

          // Compute the prefix and suffix.
          valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = valueSuffix + (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + (valueNegative && sign === "(" ? ")" : "");

          // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.
          if (maybeSuffix) {
            var i = -1, n = value.length, c;
            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        }

        // If the fill character is not "0", grouping is applied before padding.
        if (comma && !zero) value = group(value, Infinity);

        // Compute the padding.
        var length = valuePrefix.length + value.length + valueSuffix.length,
            padding = length < width ? new Array(width - length + 1).join(fill) : "";

        // If the fill character is "0", grouping is applied after padding.
        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

        // Reconstruct the final output based on the desired alignment.
        switch (align) {
          case "<": return valuePrefix + value + valueSuffix + padding;
          case "=": return valuePrefix + padding + value + valueSuffix;
          case "^": return padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
        }
        return padding + valuePrefix + value + valueSuffix;
      };
    }

    function formatPrefix(specifier, value) {
      var f = format((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
          e = Math.max(-8, Math.min(8, Math.floor(exponent$1(value) / 3))) * 3,
          k = Math.pow(10, -e),
          prefix = prefixes[8 + e / 3];
      return function(value) {
        return f(k * value) + prefix;
      };
    }

    return {
      format: format,
      formatPrefix: formatPrefix
    };
  };

  function precisionFixed(step) {
    return Math.max(0, -exponent$1(Math.abs(step)));
  };

  function precisionPrefix(step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent$1(value) / 3))) * 3 - exponent$1(Math.abs(step)));
  };

  function precisionRound(step, max) {
    return Math.max(0, exponent$1(Math.abs(max)) - exponent$1(Math.abs(step))) + 1;
  };

  var localeDefinitions = {
    "ca-ES": caEs,
    "de-DE": deDe,
    "en-CA": enCa,
    "en-GB": enGb,
    "en-US": enUs,
    "es-ES": esEs,
    "fi-FI": fiFi,
    "fr-CA": frCa,
    "fr-FR": frFr,
    "he-IL": heIl,
    "it-IT": itIt,
    "ja-JP": jaJp,
    "mk-MK": mkMk,
    "nl-NL": nlNl,
    "pl-PL": plPl,
    "pt-BR": ptBr,
    "ru-RU": ruRu,
    "zh-CN": zhCn
  };

  var defaultLocale = locale(enUs);
  var format$1 = defaultLocale.format;
  var formatPrefix = defaultLocale.formatPrefix;

  var e10 = Math.sqrt(50);
  var e5 = Math.sqrt(10);
  var e2 = Math.sqrt(2);
  function tickRange(domain, count) {
    if (count == null) count = 10;

    var start = domain[0],
        stop = domain[domain.length - 1];

    if (stop < start) error = stop, stop = start, start = error;

    var span = stop - start,
        step = Math.pow(10, Math.floor(Math.log(span / count) / Math.LN10)),
        error = span / count / step;

    // Filter ticks to get closer to the desired count.
    if (error >= e10) step *= 10;
    else if (error >= e5) step *= 5;
    else if (error >= e2) step *= 2;

    // Round start and stop values to step interval.
    return [
      Math.ceil(start / step) * step,
      Math.floor(stop / step) * step + step / 2, // inclusive
      step
    ];
  };

  function ticks$1(domain, count) {
    return range$1.apply(null, tickRange(domain, count));
  };

  function tickFormat$2(domain, count, specifier) {
    var range = tickRange(domain, count);
    if (specifier == null) {
      specifier = ",." + precisionFixed(range[2]) + "f";
    } else {
      switch (specifier = formatSpecifier(specifier), specifier.type) {
        case "s": {
          var value = Math.max(Math.abs(range[0]), Math.abs(range[1]));
          if (specifier.precision == null) specifier.precision = precisionPrefix(range[2], value);
          return formatPrefix(specifier, value);
        }
        case "":
        case "e":
        case "g":
        case "p":
        case "r": {
          if (specifier.precision == null) specifier.precision = precisionRound(range[2], Math.max(Math.abs(range[0]), Math.abs(range[1]))) - (specifier.type === "e");
          break;
        }
        case "f":
        case "%": {
          if (specifier.precision == null) specifier.precision = precisionFixed(range[2]) - (specifier.type === "%") * 2;
          break;
        }
      }
    }
    return format$1(specifier);
  };

  function uninterpolateClamp(a, b) {
    b = (b -= a = +a) || 1 / b;
    return function(x) {
      return Math.max(0, Math.min(1, (x - a) / b));
    };
  }

  function uninterpolateNumber(a, b) {
    b = (b -= a = +a) || 1 / b;
    return function(x) {
      return (x - a) / b;
    };
  }

  function bilinear(domain, range, uninterpolate, interpolate) {
    var u = uninterpolate(domain[0], domain[1]),
        i = interpolate(range[0], range[1]);
    return function(x) {
      return i(u(x));
    };
  }

  function polylinear(domain, range, uninterpolate, interpolate) {
    var k = Math.min(domain.length, range.length) - 1,
        u = new Array(k),
        i = new Array(k),
        j = -1;

    // Handle descending domains.
    if (domain[k] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }

    while (++j < k) {
      u[j] = uninterpolate(domain[j], domain[j + 1]);
      i[j] = interpolate(range[j], range[j + 1]);
    }

    return function(x) {
      var j = bisectRight(domain, x, 1, k) - 1;
      return i[j](u[j](x));
    };
  }

  function newLinear(domain, range, interpolate, clamp) {
    var output,
        input;

    function rescale() {
      var linear = Math.min(domain.length, range.length) > 2 ? polylinear : bilinear,
          uninterpolate = clamp ? uninterpolateClamp : uninterpolateNumber;
      output = linear(domain, range, uninterpolate, interpolate);
      input = linear(range, domain, uninterpolate, interpolateNumber);
      return scale;
    }

    function scale(x) {
      return output(x);
    }

    scale.invert = function(y) {
      return input(y);
    };

    scale.domain = function(x) {
      if (!arguments.length) return domain.slice();
      domain = x.map(Number);
      return rescale();
    };

    scale.range = function(x) {
      if (!arguments.length) return range.slice();
      range = x.slice();
      return rescale();
    };

    scale.rangeRound = function(x) {
      return scale.range(x).interpolate(interpolateRound);
    };

    scale.clamp = function(x) {
      if (!arguments.length) return clamp;
      clamp = !!x;
      return rescale();
    };

    scale.interpolate = function(x) {
      if (!arguments.length) return interpolate;
      interpolate = x;
      return rescale();
    };

    scale.ticks = function(count) {
      return ticks$1(domain, count);
    };

    scale.tickFormat = function(count, specifier) {
      return tickFormat$2(domain, count, specifier);
    };

    scale.nice = function(count) {
      domain = nice(domain, tickRange(domain, count)[2]);
      return rescale();
    };

    scale.copy = function() {
      return newLinear(domain, range, interpolate, clamp);
    };

    return rescale();
  }

  function rebind(scale, linear) {
    scale.range = function() {
      var x = linear.range.apply(linear, arguments);
      return x === linear ? scale : x;
    };

    scale.rangeRound = function() {
      var x = linear.rangeRound.apply(linear, arguments);
      return x === linear ? scale : x;
    };

    scale.clamp = function() {
      var x = linear.clamp.apply(linear, arguments);
      return x === linear ? scale : x;
    };

    scale.interpolate = function() {
      var x = linear.interpolate.apply(linear, arguments);
      return x === linear ? scale : x;
    };

    return scale;
  };

  function linear() {
    return newLinear([0, 1], [0, 1], interpolate, false);
  };

  function newDate(t) {
    return new Date(t);
  }

  function newTime(linear, timeInterval, tickFormat, format) {

    function scale(x) {
      return linear(x);
    }

    scale.invert = function(x) {
      return newDate(linear.invert(x));
    };

    scale.domain = function(x) {
      if (!arguments.length) return linear.domain().map(newDate);
      linear.domain(x);
      return scale;
    };

    function tickInterval(interval, start, stop, step) {
      if (interval == null) interval = 10;

      // If a desired tick count is specified, pick a reasonable tick interval
      // based on the extent of the domain and a rough estimate of tick size.
      // If a named interval such as "seconds" was specified, convert to the
      // corresponding time interval and optionally filter using the step.
      // Otherwise, assume interval is already a time interval and use it.
      switch (typeof interval) {
        case "number": interval = chooseTickInterval(start, stop, interval), step = interval[1], interval = interval[0]; break;
        case "string": step = step == null ? 1 : Math.floor(step); break;
        default: return interval;
      }

      return isFinite(step) && step > 0 ? timeInterval(interval, step) : null;
    }

    scale.ticks = function(interval, step) {
      var domain = linear.domain(),
          t0 = domain[0],
          t1 = domain[domain.length - 1],
          t;

      if (t1 < t0) t = t0, t0 = t1, t1 = t;

      return (interval = tickInterval(interval, t0, t1, step))
          ? interval.range(t0, t1 + 1) // inclusive stop
          : [];
    };

    scale.tickFormat = function(specifier) {
      return specifier == null ? tickFormat : format(specifier);
    };

    scale.nice = function(interval, step) {
      var domain = linear.domain(),
          i0 = 0,
          i1 = domain.length - 1,
          t0 = domain[i0],
          t1 = domain[i1],
          t;

      if (t1 < t0) {
        t = i0, i0 = i1, i1 = t;
        t = t0, t0 = t1, t1 = t;
      }

      if (interval = tickInterval(interval, t0, t1, step)) {
        domain[i0] = +interval.floor(t0);
        domain[i1] = +interval.ceil(t1);
        linear.domain(domain);
      }

      return scale;
    };

    scale.copy = function() {
      return newTime(linear.copy(), timeInterval, tickFormat, format);
    };

    return rebind(scale, linear);
  };

  var millisecondsPerSecond = 1000;
  var millisecondsPerMinute = millisecondsPerSecond * 60;
  var millisecondsPerHour = millisecondsPerMinute * 60;
  var millisecondsPerDay = millisecondsPerHour * 24;
  var millisecondsPerWeek = millisecondsPerDay * 7;
  var millisecondsPerMonth = millisecondsPerDay * 30;
  var millisecondsPerYear = millisecondsPerDay * 365;
  var tickIntervals = [
    ["seconds",  1,      millisecondsPerSecond],
    ["seconds",  5,  5 * millisecondsPerSecond],
    ["seconds", 15, 15 * millisecondsPerSecond],
    ["seconds", 30, 30 * millisecondsPerSecond],
    ["minutes",  1,      millisecondsPerMinute],
    ["minutes",  5,  5 * millisecondsPerMinute],
    ["minutes", 15, 15 * millisecondsPerMinute],
    ["minutes", 30, 30 * millisecondsPerMinute],
    [  "hours",  1,      millisecondsPerHour  ],
    [  "hours",  3,  3 * millisecondsPerHour  ],
    [  "hours",  6,  6 * millisecondsPerHour  ],
    [  "hours", 12, 12 * millisecondsPerHour  ],
    [   "days",  1,      millisecondsPerDay   ],
    [   "days",  2,  2 * millisecondsPerDay   ],
    [  "weeks",  1,      millisecondsPerWeek  ],
    [ "months",  1,      millisecondsPerMonth ],
    [ "months",  3,  3 * millisecondsPerMonth ],
    [  "years",  1,      millisecondsPerYear  ]
  ];

  var bisectTickIntervals = bisector(function(method) {
    return method[2];
  }).right;

  function chooseTickInterval(start, stop, count) {
    var target = Math.abs(stop - start) / count,
        i = bisectTickIntervals(tickIntervals, target);
    return i === tickIntervals.length ? ["years", tickRange([start / millisecondsPerYear, stop / millisecondsPerYear], count)[2]]
        : i ? tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i]
        : ["milliseconds", tickRange([start, stop], count)[2]];
  }

  var formatMillisecond = format$2(".%L");
  var formatSecond = format$2(":%S");
  var formatMinute = format$2("%I:%M");
  var formatHour = format$2("%I %p");
  var formatDay = format$2("%a %d");
  var formatWeek = format$2("%b %d");
  var formatMonth = format$2("%B");
  var formatYear = format$2("%Y");
  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond
        : minute(date) < date ? formatSecond
        : hour(date) < date ? formatMinute
        : day(date) < date ? formatHour
        : month(date) < date ? (sunday(date) < date ? formatDay : formatWeek)
        : year(date) < date ? formatMonth
        : formatYear)(date);
  }

  function millisecond(step) {
    return {
      range: function(start, stop) { return range$1(Math.ceil(start / step) * step, stop, step).map(newDate); },
      floor: function(date) { return newDate(Math.floor(date / step) * step); },
      ceil: function(date) { return newDate(Math.ceil(date / step) * step); }
    };
  };

  function timeInterval(interval, step) {
    switch (interval) {
      case "milliseconds": return millisecond(step);
      case "seconds": return step > 1 ? second.filter(function(d) { return d.getSeconds() % step === 0; }) : second;
      case "minutes": return step > 1 ? minute.filter(function(d) { return d.getMinutes() % step === 0; }) : minute;
      case "hours": return step > 1 ? hour.filter(function(d) { return d.getHours() % step === 0; }) : hour;
      case "days": return step > 1 ? day.filter(function(d) { return (d.getDate() - 1) % step === 0; }) : day;
      case "weeks": return step > 1 ? sunday.filter(function(d) { return sunday.count(0, d) % step === 0; }) : sunday;
      case "months": return step > 1 ? month.filter(function(d) { return d.getMonth() % step === 0; }) : month;
      case "years": return step > 1 ? year.filter(function(d) { return d.getFullYear() % step === 0; }) : year;
    }
  }

  function time() {
    return newTime(linear(), timeInterval, tickFormat, format$2).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
  };

  var formatUTCMillisecond = utcFormat(".%L");
  var formatUTCSecond = utcFormat(":%S");
  var formatUTCMinute = utcFormat("%I:%M");
  var formatUTCHour = utcFormat("%I %p");
  var formatUTCDay = utcFormat("%a %d");
  var formatUTCWeek = utcFormat("%b %d");
  var formatUTCMonth = utcFormat("%B");
  var formatUTCYear = utcFormat("%Y");
  function tickFormat$1(date) {
    return (utcSecond(date) < date ? formatUTCMillisecond
        : utcMinute(date) < date ? formatUTCSecond
        : utcHour(date) < date ? formatUTCMinute
        : utcDay(date) < date ? formatUTCHour
        : utcMonth(date) < date ? (utcSunday(date) < date ? formatUTCDay : formatUTCWeek)
        : utcYear(date) < date ? formatUTCMonth
        : formatUTCYear)(date);
  }

  function timeInterval$1(interval, step) {
    switch (interval) {
      case "milliseconds": return millisecond(step);
      case "seconds": return step > 1 ? utcSecond.filter(function(d) { return d.getUTCSeconds() % step === 0; }) : utcSecond;
      case "minutes": return step > 1 ? utcMinute.filter(function(d) { return d.getUTCMinutes() % step === 0; }) : utcMinute;
      case "hours": return step > 1 ? utcHour.filter(function(d) { return d.getUTCHours() % step === 0; }) : utcHour;
      case "days": return step > 1 ? utcDay.filter(function(d) { return (d.getUTCDate() - 1) % step === 0; }) : utcDay;
      case "weeks": return step > 1 ? utcSunday.filter(function(d) { return utcSunday.count(0, d) % step === 0; }) : utcSunday;
      case "months": return step > 1 ? utcMonth.filter(function(d) { return d.getUTCMonth() % step === 0; }) : utcMonth;
      case "years": return step > 1 ? utcYear.filter(function(d) { return d.getUTCFullYear() % step === 0; }) : utcYear;
    }
  }

  function utcTime() {
    return newTime(linear(), timeInterval$1, tickFormat$1, utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]);
  };

  function newThreshold(domain, range, n) {

    function scale(x) {
      if (x <= x) return range[bisectRight(domain, x, 0, n)];
    }

    scale.domain = function(x) {
      if (!arguments.length) return domain.slice();
      domain = x.slice(), n = Math.min(domain.length, range.length - 1);
      return scale;
    };

    scale.range = function(x) {
      if (!arguments.length) return range.slice();
      range = x.slice(), n = Math.min(domain.length, range.length - 1);
      return scale;
    };

    scale.invertExtent = function(y) {
      return y = range.indexOf(y), [domain[y - 1], domain[y]];
    };

    scale.copy = function() {
      return newThreshold(domain, range);
    };

    return scale;
  };

  function threshold() {
    return newThreshold([.5], [0, 1], 1);
  };

  function newPow(linear, exponent, domain) {

    function powp(x) {
      return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
    }

    function powb(x) {
      return x < 0 ? -Math.pow(-x, 1 / exponent) : Math.pow(x, 1 / exponent);
    }

    function scale(x) {
      return linear(powp(x));
    }

    scale.invert = function(x) {
      return powb(linear.invert(x));
    };

    scale.exponent = function(x) {
      if (!arguments.length) return exponent;
      exponent = +x;
      return scale.domain(domain);
    };

    scale.domain = function(x) {
      if (!arguments.length) return domain.slice();
      domain = x.map(Number);
      linear.domain(domain.map(powp));
      return scale;
    };

    scale.ticks = function(count) {
      return ticks$1(domain, count);
    };

    scale.tickFormat = function(count, specifier) {
      return tickFormat$2(domain, count, specifier);
    };

    scale.nice = function(count) {
      return scale.domain(nice(domain, tickRange(domain, count)[2]));
    };

    scale.copy = function() {
      return newPow(linear.copy(), exponent, domain);
    };

    return rebind(scale, linear);
  }

  function sqrt() {
    return newPow(linear(), .5, [0, 1]);
  };

  function pow() {
    return newPow(linear(), 1, [0, 1]);
  };

  function rainbow() {
    return linear()
        .interpolate(interpolateCubehelixLong)
        .domain([0, 0.5, 1.0])
        .range([cubehelix$1(-100, 0.75, 0.35), cubehelix$1(80, 1.50, 0.8), cubehelix$1(260, 0.75, 0.35)]);
  };

  function newQuantize(x0, x1, range) {
    var kx, i;

    function scale(x) {
      return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
    }

    function rescale() {
      kx = range.length / (x1 - x0);
      i = range.length - 1;
      return scale;
    }

    scale.domain = function(x) {
      if (!arguments.length) return [x0, x1];
      x0 = +x[0];
      x1 = +x[x.length - 1];
      return rescale();
    };

    scale.range = function(x) {
      if (!arguments.length) return range.slice();
      range = x.slice();
      return rescale();
    };

    scale.invertExtent = function(y) {
      y = range.indexOf(y);
      y = y < 0 ? NaN : y / kx + x0;
      return [y, y + 1 / kx];
    };

    scale.copy = function() {
      return newQuantize(x0, x1, range); // copy on write
    };

    return rescale();
  }

  function quantize() {
    return newQuantize(0, 1, [0, 1]);
  };

  function newQuantile(domain, range) {
    var thresholds;

    function rescale() {
      var k = 0,
          q = range.length;
      thresholds = [];
      while (++k < q) thresholds[k - 1] = quantile$1(domain, k / q);
      return scale;
    }

    function scale(x) {
      if (!isNaN(x = +x)) return range[bisectRight(thresholds, x)];
    }

    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = [];
      for (var i = 0, n = x.length, v; i < n; ++i) if (v = x[i], v != null && !isNaN(v = +v)) domain.push(v);
      domain.sort(ascending);
      return rescale();
    };

    scale.range = function(x) {
      if (!arguments.length) return range.slice();
      range = x.slice();
      return rescale();
    };

    scale.quantiles = function() {
      return thresholds;
    };

    scale.invertExtent = function(y) {
      y = range.indexOf(y);
      return y < 0 ? [NaN, NaN] : [
        y > 0 ? thresholds[y - 1] : domain[0],
        y < thresholds.length ? thresholds[y] : domain[domain.length - 1]
      ];
    };

    scale.copy = function() {
      return newQuantile(domain, range); // copy on write!
    };

    return rescale();
  }

  function quantile() {
    return newQuantile([], []);
  };

  function steps(length, start, step) {
    var steps = new Array(length), i = -1;
    while (++i < length) steps[i] = start + step * i;
    return steps;
  }

  function newOrdinal(domain, ranger) {
    var index,
        range,
        rangeBand;

    function scale(x) {
      var k = x + "", i = index.get(k);
      if (!i) {
        if (ranger.t !== "range") return;
        index.set(k, i = domain.push(x));
      }
      return range[(i - 1) % range.length];
    }

    scale.domain = function(x) {
      if (!arguments.length) return domain.slice();
      domain = [];
      index = map();
      var i = -1, n = x.length, xi, xk;
      while (++i < n) if (!index.has(xk = (xi = x[i]) + "")) index.set(xk, domain.push(xi));
      return scale[ranger.t].apply(scale, ranger.a);
    };

    scale.range = function(x) {
      if (!arguments.length) return range.slice();
      range = x.slice();
      rangeBand = 0;
      ranger = {t: "range", a: arguments};
      return scale;
    };

    scale.rangePoints = function(x, padding) {
      padding = arguments.length < 2 ? 0 : +padding;
      var start = +x[0],
          stop = +x[1],
          step = domain.length < 2 ? (start = (start + stop) / 2, 0) : (stop - start) / (domain.length - 1 + padding);
      range = steps(domain.length, start + step * padding / 2, step);
      rangeBand = 0;
      ranger = {t: "rangePoints", a: arguments};
      return scale;
    };

    scale.rangeRoundPoints = function(x, padding) {
      padding = arguments.length < 2 ? 0 : +padding;
      var start = +x[0],
          stop = +x[1],
          step = domain.length < 2 ? (start = stop = Math.round((start + stop) / 2), 0) : (stop - start) / (domain.length - 1 + padding) | 0; // bitwise floor for symmetry
      range = steps(domain.length, start + Math.round(step * padding / 2 + (stop - start - (domain.length - 1 + padding) * step) / 2), step);
      rangeBand = 0;
      ranger = {t: "rangeRoundPoints", a: arguments};
      return scale;
    };

    scale.rangeBands = function(x, padding, outerPadding) {
      padding = arguments.length < 2 ? 0 : +padding;
      outerPadding = arguments.length < 3 ? padding : +outerPadding;
      var reverse = +x[1] < +x[0],
          start = +x[reverse - 0],
          stop = +x[1 - reverse],
          step = (stop - start) / (domain.length - padding + 2 * outerPadding);
      range = steps(domain.length, start + step * outerPadding, step);
      if (reverse) range.reverse();
      rangeBand = step * (1 - padding);
      ranger = {t: "rangeBands", a: arguments};
      return scale;
    };

    scale.rangeRoundBands = function(x, padding, outerPadding) {
      padding = arguments.length < 2 ? 0 : +padding;
      outerPadding = arguments.length < 3 ? padding : +outerPadding;
      var reverse = +x[1] < +x[0],
          start = +x[reverse - 0],
          stop = +x[1 - reverse],
          step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding));
      range = steps(domain.length, start + Math.round((stop - start - (domain.length - padding) * step) / 2), step);
      if (reverse) range.reverse();
      rangeBand = Math.round(step * (1 - padding));
      ranger = {t: "rangeRoundBands", a: arguments};
      return scale;
    };

    scale.rangeBand = function() {
      return rangeBand;
    };

    scale.rangeExtent = function() {
      var t = ranger.a[0], start = t[0], stop = t[t.length - 1];
      if (stop < start) t = stop, stop = start, start = t;
      return [start, stop];
    };

    scale.copy = function() {
      return newOrdinal(domain, ranger);
    };

    return scale.domain(domain);
  }

  function ordinal() {
    return newOrdinal([], {t: "range", a: [[]]});
  };

  var tickFormat10 = format$1(".0e");
  var tickFormatOther = format$1(",");
  function newLog(linear, base, domain) {

    function log(x) {
      return (domain[0] < 0 ? -Math.log(x > 0 ? 0 : -x) : Math.log(x < 0 ? 0 : x)) / Math.log(base);
    }

    function pow(x) {
      return domain[0] < 0 ? -Math.pow(base, -x) : Math.pow(base, x);
    }

    function scale(x) {
      return linear(log(x));
    }

    scale.invert = function(x) {
      return pow(linear.invert(x));
    };

    scale.base = function(x) {
      if (!arguments.length) return base;
      base = +x;
      return scale.domain(domain);
    };

    scale.domain = function(x) {
      if (!arguments.length) return domain.slice();
      domain = x.map(Number);
      linear.domain(domain.map(log));
      return scale;
    };

    scale.nice = function() {
      var x = nice(linear.domain(), 1);
      linear.domain(x);
      domain = x.map(pow);
      return scale;
    };

    scale.ticks = function() {
      var u = domain[0],
          v = domain[domain.length - 1];
      if (v < u) i = u, u = v, v = i;
      var i = Math.floor(log(u)),
          j = Math.ceil(log(v)),
          k,
          t,
          n = base % 1 ? 2 : base,
          ticks = [];

      if (isFinite(j - i)) {
        if (u > 0) {
          for (--j, k = 1; k < n; ++k) if ((t = pow(i) * k) < u) continue; else ticks.push(t);
          while (++i < j) for (k = 1; k < n; ++k) ticks.push(pow(i) * k);
          for (k = 1; k < n; ++k) if ((t = pow(i) * k) > v) break; else ticks.push(t);
        } else {
          for (++i, k = n - 1; k >= 1; --k) if ((t = pow(i) * k) < u) continue; else ticks.push(t);
          while (++i < j) for (k = n - 1; k >= 1; --k) ticks.push(pow(i) * k);
          for (k = n - 1; k >= 1; --k) if ((t = pow(i) * k) > v) break; else ticks.push(t);
        }
      }

      return ticks;
    };

    scale.tickFormat = function(count, specifier) {
      if (specifier == null) specifier = base === 10 ? tickFormat10 : tickFormatOther;
      else if (typeof specifier !== "function") specifier = format$1(specifier);
      if (count == null) return specifier;
      var k = Math.min(base, scale.ticks().length / count),
          f = domain[0] > 0 ? (e = 1e-12, Math.ceil) : (e = -1e-12, Math.floor),
          e;
      return function(d) {
        return pow(f(log(d) + e)) / d >= k ? specifier(d) : "";
      };
    };

    scale.copy = function() {
      return newLog(linear.copy(), base, domain);
    };

    return rebind(scale, linear);
  }

  function log() {
    return newLog(linear(), 10, [1, 10]);
  };

  function newIdentity(domain) {

    function scale(x) {
      return +x;
    }

    scale.invert = scale;

    scale.domain = scale.range = function(x) {
      if (!arguments.length) return domain.slice();
      domain = x.map(Number);
      return scale;
    };

    scale.ticks = function(count) {
      return ticks$1(domain, count);
    };

    scale.tickFormat = function(count, specifier) {
      return tickFormat$2(domain, count, specifier);
    };

    scale.copy = function() {
      return newIdentity(domain);
    };

    return scale;
  }

  function identity() {
    return newIdentity([0, 1]);
  };

  function cubehelix() {
    return linear()
        .interpolate(interpolateCubehelixLong)
        .range([cubehelix$1(300, 0.5, 0.0), cubehelix$1(-240, 0.5, 1.0)]);
  };

  function category20c() {
    return ordinal().range([
      "#3182bd", "#6baed6", "#9ecae1", "#c6dbef",
      "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2",
      "#31a354", "#74c476", "#a1d99b", "#c7e9c0",
      "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb",
      "#636363", "#969696", "#bdbdbd", "#d9d9d9"
    ]);
  };

  function category20b() {
    return ordinal().range([
      "#393b79", "#5254a3", "#6b6ecf", "#9c9ede",
      "#637939", "#8ca252", "#b5cf6b", "#cedb9c",
      "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94",
      "#843c39", "#ad494a", "#d6616b", "#e7969c",
      "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"
    ]);
  };

  function category20() {
    return ordinal().range([
      "#1f77b4", "#aec7e8",
      "#ff7f0e", "#ffbb78",
      "#2ca02c", "#98df8a",
      "#d62728", "#ff9896",
      "#9467bd", "#c5b0d5",
      "#8c564b", "#c49c94",
      "#e377c2", "#f7b6d2",
      "#7f7f7f", "#c7c7c7",
      "#bcbd22", "#dbdb8d",
      "#17becf", "#9edae5"
    ]);
  };

  function category10() {
    return ordinal().range([
      "#1f77b4",
      "#ff7f0e",
      "#2ca02c",
      "#d62728",
      "#9467bd",
      "#8c564b",
      "#e377c2",
      "#7f7f7f",
      "#bcbd22",
      "#17becf"
    ]);
  };

  exports.category10 = category10;
  exports.category20 = category20;
  exports.category20b = category20b;
  exports.category20c = category20c;
  exports.cubehelix = cubehelix;
  exports.identity = identity;
  exports.linear = linear;
  exports.log = log;
  exports.ordinal = ordinal;
  exports.pow = pow;
  exports.quantile = quantile;
  exports.quantize = quantize;
  exports.rainbow = rainbow;
  exports.sqrt = sqrt;
  exports.threshold = threshold;
  exports.time = time;
  exports.utcTime = utcTime;

}));
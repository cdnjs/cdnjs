// Google Closure Compiler will output a wrapping function here.
(function() {

  // A few optimizations for Google Closure Compiler will save us a couple kb in the release script.
  var regexp = RegExp, object = Object, date = Date, number = Number, Undefined, English;

  function isDefined(o) {
    return o !== Undefined;
  }

  function isUndefined(o) {
    return o === Undefined;
  }


  /***
   * Date module
   *
   ***/

  var TimeFormat = ['hour','minute','second','meridian','utc','offset_sign','offset_hours','offset_minutes']
  var FloatReg = '\\d{1,2}(?:[,.]\\d+)?';
  var RequiredTime = '('+FloatReg+'):?('+FloatReg+')?:?('+FloatReg+')?(am|pm)?(?:(Z)|(?:([+-])(\\d{2})(?::?(\\d{2}))?)?)?';
  var OptionalTime = '\\s*(?:(?:t|at |\\s+)' + RequiredTime + ')?';

  var LowerAsianDigits   = '一二三四五六七八九';
  var UpperAsianDigits   = '十百千万';
  var AsianDigitReg = regexp('[' + LowerAsianDigits + UpperAsianDigits + ']', 'g');
  var DateInputFormats = [];
  var DateArgumentUnits;
  var DateUnitsReversed;

  var StaticInputFormats = [
    // @date_format 2010
    { src: '(\\d{4})', to: ['year'] },
    // @date_format 2010-05
    // @date_format 2010.05
    // @date_format 2010/05
    // @date_format 2010-05-25 (ISO8601)
    // @date_format 2010-05-25T12:30:40.299Z (ISO8601)
    // @date_format 2010-05-25T12:30:40.299+01:00 (ISO8601)
    // @date_format 2010.05.25
    // @date_format 2010/05/25
    { src: '([+-])?(\\d{4})[-.]?({month})[-.]?(\\d{1,2})?', to: ['year_sign','year','month','date'] },
    // @date_format 05-25
    // @date_format 05/25
    // @date_format 05.25
    // @date_format 05-25-2010
    // @date_format 05/25/2010
    // @date_format 05.25.2010
    { src: '(\\d{1,2})[-.\\/]({month})[-.\\/]?(\\d{2,4})?', to: ['month','date','year'], variant: true },
    // @date_format Date(628318530718)
    { src: '\\/Date\\((\\d+(?:\\+\\d{4})?)\\)\\/', to: ['timestamp'], time: false }
  ];

  var DateOutputFormats = [
    {
      token: 'f{1,4}|ms|milliseconds',
      format: function(d) {
        return d.getMilliseconds();
      }
    },
    {
      token: 'ss?|seconds',
      format: function(d, len) {
        return d.getSeconds();
      }
    },
    {
      token: 'mm?|minutes',
      format: function(d, len) {
        return d.getMinutes();
      }
    },
    {
      token: 'hh?|hours|12hr',
      format: function(d) {
        return getShortHour(d);
      }
    },
    {
      token: 'HH?|24hr',
      format: function(d) {
        return d.getHours();
      }
    },
    {
      token: 'dd?|date|day',
      format: function(d) {
        return d.getDate();
      }
    },
    {
      token: 'dow|weekday',
      word: true,
      format: function(d, loc, n, t) {
        return loc['weekdays'][d.getDay() + (n - 1) * 7];
      }
    },
    {
      token: 'MM?',
      format: function(d) {
        return d.getMonth() + 1;
      }
    },
    {
      token: 'mon|month',
      word: true,
      format: function(d, loc, n, len) {
        return loc['months'][d.getMonth() + (n - 1) * 12];
      }
    },
    {
      token: 'y{2,4}|year',
      format: function(d) {
        return d.getFullYear();
      }
    },
    {
      token: '[Tt]{1,2}',
      format: function(d, loc, n, format) {
        var m = getMeridian(d);
        if(format.length === 1) m = m.first();
        if(format.first() === 'T') m = m.toUpperCase();
        return m;
      }
    },
    {
      token: 'z{1,4}|tz|timezone',
      text: true,
      format: function(d, loc, n, format) {
        var tz = d.getUTCOffset();
        if(format == 'z' || format == 'zz') {
          tz = tz.replace(/(\d{2})(\d{2})/, function(f,h,m) {
            return h.toNumber().pad(format.length);
          });
        }
        return tz;
      }
    },
    {
      token: 'iso(tz|timezone)',
      format: function(d) {
        return d.getUTCOffset(true);
      }
    },
    {
      token: 'ord',
      format: function(d) {
        return d.getDate().ordinalize();
      }
    }
  ];

  var DateUnits = [
    {
      unit: 'year',
      method: 'FullYear',
      multiplier: function(d) {
        var adjust = d ? (d.isLeapYear() ? 1 : 0) : 0.25;
        return (365 + adjust) * 24 * 60 * 60 * 1000;
      }
    },
    {
      unit: 'month',
      method: 'Month',
      multiplier: function(d, ms) {
        var days = 30.4375, inMonth;
        if(d) {
          inMonth = d.daysInMonth();
          if(ms <= inMonth.days()) {
            days = inMonth;
          }
        }
        return days * 24 * 60 * 60 * 1000;
      }
    },
    {
      unit: 'week',
      method: 'Week',
      multiplier: function() {
        return 7 * 24 * 60 * 60 * 1000;
      }
    },
    {
      unit: 'day',
      method: 'Date',
      multiplier: function() {
        return 24 * 60 * 60 * 1000;
      }
    },
    {
      unit: 'hour',
      method: 'Hours',
      multiplier: function() {
        return 60 * 60 * 1000;
      }
    },
    {
      unit: 'minute',
      method: 'Minutes',
      multiplier: function() {
        return 60 * 1000;
      }
    },
    {
      unit: 'second',
      method: 'Seconds',
      multiplier: function() {
        return 1000;
      }
    },
    {
      unit: 'millisecond',
      method: 'Milliseconds',
      multiplier: function() {
        return 1;
      }
    }
  ];




  // Date Localization

  var Localizations = {};

  var CommonLocales = {

    'en': '2;;January,February,March,April,May,June,July,August,September,October,November,December;Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday;millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s;one,two,three,four,five,six,seven,eight,nine,ten;a,an,the;the,st|nd|rd|th,of;{num} {unit} {sign},{num} {unit=4-5} {sign} {day},{weekday?} {month} {date}{1} {year?} {time?},{date} {month} {year},{month} {year},{shift?} {weekday} {time?},{shift} week {weekday} {time?},{shift} {unit=5-7},{0} {edge} of {shift?} {unit=4-7?}{month?}{year?},{weekday} {2} {shift} week,{0} {date}{1} of {month},{0}{month?} {date?}{1} of {shift} {unit=6-7},{day} at {time?},{time} {day};{Month} {d}, {yyyy};,yesterday,today,tomorrow;,ago|before,,from now|after|from;,last,the|this,next;last day,end,,first day|beginning',

    'ja': '1;月;;日曜日,月曜日,火曜日,水曜日,木曜日,金曜日,土曜日;ミリ秒,秒,分,時間,日,週間|週,ヶ月|ヵ月|月,年;;;;{num}{unit}{sign},{shift}{unit=5-7}{weekday?},{year}年{month?}月?{date?}日?,{month}月{date?}日?,{date}日;{yyyy}年{M}月{d}日;一昨日,昨日,今日,明日,明後日;,前,,後;,去|先,,来',

    'ko': '1;월;;일요일,월요일,화요일,수요일,목요일,금요일,토요일;밀리초,초,분,시간,일,주,개월|달,년;일|한,이,삼,사,오,육,칠,팔,구,십;;;{num}{unit} {sign},{shift} {unit=5-7},{shift} {unit=5?} {weekday},{year}년{month?}월?{date?}일?,{month}월{date?}일?,{date}일;{yyyy}년{M}월{d}일;그저께,어제,오늘,내일,모레;,전,,후;,지난|작,이번,다음|내',

    'ru': '4;;Январ:я|ь,Феврал:я|ь,Март:а|,Апрел:я|ь,Ма:я|й,Июн:я|ь,Июл:я|ь,Август:а|,Сентябр:я|ь,Октябр:я|ь,Ноябр:я|ь,Декабр:я|ь;Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота;миллисекунд:а|у|ы|,секунд:а|у|ы|,минут:а|у|ы|,час:||а|ов,день|день|дня|дней,недел:я|ю|и|ь|е,месяц:||а|ев|е,год|год|года|лет|году;од:ин|ну,дв:а|е,три,четыре,пять,шесть,семь,восемь,девять,десять;;в|на,года;{num} {unit} {sign},{sign} {num} {unit},{date} {month} {year?} {1},{month} {year},{0} {shift} {unit=5-7};{d} {month} {yyyy} года;позавчера,вчера,сегодня,завтра,послезавтра;,назад,,через;,прошло:й|м,,следующе:й|м',

    'es': '6;;enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre;domingo,lunes,martes,miércoles|miercoles,jueves,viernes,sábado|sabado;milisegundo:|s,segundo:|s,minuto:|s,hora:|s,día|días|dia|dias,semana:|s,mes:|es,año|años|ano|anos;uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez;;el,de;{sign} {num} {unit},{num} {unit} {sign},{date?} {1} {month} {1} {year?},{0} {unit=5-7} {shift},{0} {shift} {unit=5-7};{d} de {month} de {yyyy};anteayer,ayer,hoy,mañana|manana;,hace,,de ahora;,pasad:o|a,,próximo|próxima|proximo|proxima',

    'pt': '6;;janeiro,fevereiro,março,abril,maio,junho,julho,agosto,setembro,outubro,novembro,dezembro;domingo,segunda-feira,terça-feira,quarta-feira,quinta-feira,sexta-feira,sábado|sabado;milisegundo:|s,segundo:|s,minuto:|s,hora:|s,dia:|s,semana:|s,mês|mêses|mes|meses,ano:|s;um,dois,três|tres,quatro,cinco,seis,sete,oito,nove,dez,uma,duas;;a,de;{num} {unit} {sign},{sign} {num} {unit},{date?} {1} {month} {1} {year?},{0} {unit=5-7} {shift},{0} {shift} {unit=5-7};{d} de {month} de {yyyy};anteontem,ontem,hoje,amanh:ã|a;,atrás|atras|há|ha,,daqui a;,passad:o|a,,próximo|próxima|proximo|proxima',

    'fr': '2;;janvier,février|fevrier,mars,avril,mai,juin,juillet,août,septembre,octobre,novembre,décembre|decembre;dimanche,lundi,mardi,mercredi,jeudi,vendredi,samedi;milliseconde:|s,seconde:|s,minute:|s,heure:|s,jour:|s,semaine:|s,mois,an:|s|née|nee;un:|e,deux,trois,quatre,cinq,six,sept,huit,neuf,dix;;l\'|la|le;{sign} {num} {unit},{sign} {num} {unit},{0} {date?} {month} {year?},{0} {unit=5-7} {shift};{d} {month} {yyyy};,hier,aujourd\'hui,demain;,il y a,,dans|d\'ici;,derni:er|ère|ere,,prochain:|e',

    'it': '2;;Gennaio,Febbraio,Marzo,Aprile,Maggio,Giugno,Luglio,Agosto,Settembre,Ottobre,Novembre,Dicembre;Domenica,Luned:ì|i,Marted:ì|i,Mercoled:ì|i,Gioved:ì|i,Venerd:ì|i,Sabato;millisecond:o|i,second:o|i,minut:o|i,or:a|e,giorn:o|i,settiman:a|e,mes:e|i,ann:o|i;un:|\'|a|o,due,tre,quattro,cinque,sei,sette,otto,nove,dieci;;l\'|la|il;{num} {unit} {sign},{weekday?} {date?} {month} {year?},{0} {unit=5-7} {shift},{0} {shift} {unit=5-7};{d} {month} {yyyy};,ieri,oggi,domani,dopodomani;,fa,,da adesso;,scors:o|a,,prossim:o|a',

    'de': '2;;Januar,Februar,März|Marz,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember;Sonntag,Montag,Dienstag,Mittwoch,Donnerstag,Freitag,Samstag;Millisekunde:|n,Sekunde:|n,Minute:|n,Stunde:|n,Tag:|en,Woche:|n,Monat:|en,Jahr:|en;ein:|e|er|em|en,zwei,drei,vier,fuenf,sechs,sieben,acht,neun,zehn;;der;{sign} {num} {unit},{num} {unit} {sign},{num} {unit} {sign},{sign} {num} {unit},{weekday?} {date?} {month} {year?},{shift} {unit=5-7};{d}. {Month} {yyyy};vorgestern,gestern,heute,morgen,übermorgen|ubermorgen|uebermorgen;,vor:|her,,in;,letzte:|r|n|s,,nächste:|r|n|s+naechste:|r|n|s',

    'zh-TW': '1;月;;日,一,二,三,四,五,六;毫秒,秒鐘,分鐘,小時,天,個星期|週,個月,年;;;日|號;{num}{unit}{sign},星期{weekday},{shift}{unit=5-7},{shift}{unit=5}{weekday},{year}年{month?}月?{date?}{0},{month}月{date?}{0},{date}{0};{yyyy}年{M}月{d}日;前天,昨天,今天,明天,後天;,前,,後;,上|去,這,下|明',

    'zh-CN': '1;月;;日,一,二,三,四,五,六;毫秒,秒钟,分钟,小时,天,个星期|周,个月,年;;;日|号;{num}{unit}{sign},星期{weekday},{shift}{unit=5-7},{shift}{unit=5}{weekday},{year}年{month?}月?{date?}{0},{month}月{date?}{0},{date}{0};{yyyy}年{M}月{d}日;前天,昨天,今天,明天,后天;,前,,后;,上|去,这,下|明'

  }

  function checkLocaleFormatsAdded(loc) {
    var code = loc['code'];
    if(loc.formatsAdded) return;
    addDateInputFormat('(' + loc['months'].compact().join('|') + ')', ['month'], code);
    addDateInputFormat('(' + loc['weekdays'].compact().join('|') + ')', ['weekday'], code);
    addDateInputFormat('(' + loc['modifiers'].filter(function(m){ return m.name === 'day'; }).map('src').join('|') + ')', ['day'], code);
    loc['formats'].each(function(src) {
      loc.addFormat(src, code, false);
    });
    loc.formatsAdded = true;
  }

  function addDateInputFormat(format, match, locale, variant, method) {
    method = method || 'push';
    DateInputFormats[method]({
      variant: variant,
      locale: locale,
      reg: regexp('^' + format + '$', 'i'),
      to: match
    });
  }

  function getLocalization(code, fallback, set) {
    if(fallback && (!object.isString(code) || !code)) code = Date['currentLocale'];
    if(code && !Localizations[code] || set) initializeLocalization(code, set);
    return Localizations[code];
  }

  function initializeLocalization(code, set) {
    set = set || getCommonLocalization(code);
    if(!set) {
      throw new Error('Invalid locale.');
    }

    function eachAlternate(str, fn) {
      str = str.split('+').map(function(split) {
        return split.replace(/(.+):(.+)$/, function(full, base, suffixes) {
          return suffixes.split('|').map(function(suffix) {
            return base + suffix;
          }).join('|');
        });
      }).join('|');
      return str.split('|').each(fn);
    }

    function setArray(name, abbreviate, multiple) {
      var arr = [];
      if(!set[name]) return;
      set[name].forEach(function(el, i) {
        eachAlternate(el, function(str, j) {
          arr[j * multiple + i] = str.toLowerCase();
        });
      });
      if(abbreviate) arr = arr.concat(set[name].map(function(str) {
        return str.slice(0,3).toLowerCase();
      }));
      return set[name] = arr;
    }

    function getDigit(start, stop) {
      var str = '[0-9０-９]' + (start ? '{' + start + ',' + stop + '}' : '+');
      if(set['digits']) str += '|[' + set['digits'] + ']+';
      return str;
    }

    function getNum() {
      var arr = [getDigit()].concat(set['articles']);
      if(!set['digits']) arr = arr.concat(set['numbers']);
      return arr.compact().join('|');
    }

    function setModifiers() {
      var arr = [];
      set.modifiersByName = {};
      set['modifiers'].each(function(modifier) {
        eachAlternate(modifier.src, function(t) {
          set.modifiersByName[t] = modifier;
          arr.push({ name: modifier.name, src: t, value: modifier.value });
        });
      });
      arr.groupBy('name', function(name, group) {
        group = group.map('src');
        if(name === 'day') group = group.concat(set['weekdays']);
        set[name] = group.join('|');
      });
      set['modifiers'] = arr;
    }

    setArray('months', true, 12);
    setArray('weekdays', true, 7);
    setArray('units', false, 8);
    setArray('numbers', false, 10);

    set['code'] = code;
    set['date'] = getDigit(1,2);
    set['year'] = getDigit(4,4);
    set['num']  = getNum();

    setModifiers();

    if(set['monthSuffix']) {
      set['month'] = getDigit(1,2);
      set['months'] = (1).upto(12).map(function(n) { return n + set['monthSuffix']; });
    }
    Localizations[code] = new Localization(set);
  }

  function getCommonLocalization(code) {
    if(code.slice(0,3) == 'en-') code = 'en';
    if(!CommonLocales[code]) return null;
    var set = { 'modifiers': [] }, pre = CommonLocales[code].split(';');
    function bool(n) {
      return !!(pre[0] & Math.pow(2,n-1));
    }
    ['months','weekdays','units','numbers','articles','optionals','formats'].each(function(name, i) {
      set[name] = pre[i + 2] ? pre[i + 2].split(',') : [];
    });
    set['outputFormat'] = pre[9];
    ['day','sign','shift','edge'].each(function(name, i) {
      if(!pre[i + 10]) return;
      pre[i + 10].split(',').each(function(t, j) {
        if(t) set['modifiers'].push({ name: name, src: t, value: j - 2 });
      });
    });
    if(bool(1)) {
      set['digits'] = LowerAsianDigits + UpperAsianDigits;
      if(set['numbers'].length > 0) {
        set['digits'] += set['numbers'].join('');
      } else {
        set['numbers'] = LowerAsianDigits.split('');
      }
      set['monthSuffix'] = pre[1];
    }
    set['capitalizeUnit'] = (code == 'de');
    set['hasPlural'] = bool(2);
    set['pastRelativeFormat'] = set['formats'][0];
    set['futureRelativeFormat'] = set['formats'][bool(3) ? 1 : 0];
    set['durationFormat'] = set['formats'][0].replace(/\s*\{sign\}\s*/, '');
    return set;
  }

  function getVariant(locale) {
    if(!locale) locale = Date['currentLocale'];
    return locale != 'en' && locale != 'en-US';
  }

  function Localization(l) {
    object.merge(this, l);
  }

  object.merge(Localization.prototype, {

    getMonth: function(n) {
      if(object.isNumber(n)) {
        return n - 1;
      } else {
        return this['months'].findIndex(regexp(n, 'i')) % 12;
      }
    },

    getWeekday: function(n) {
      return this['weekdays'].findIndex(regexp(n, 'i')) % 7;
    },

    getNumber: function(n) {
      var i;
      if(object.isNumber(n)) {
        return n;
      } else if(n && (i = this['numbers'].indexOf(n)) !== -1) {
        return (i + 1) % 10;
      } else {
        return 1;
      }
    },

    getNumericDate: function(n) {
      var self = this;
      return n.replace(this['numbers'][9], '').each(function(d) {
        return self.getNumber(d);
      }).join('');
    },

    getEnglishUnit: function(n) {
      return English['units'][this['units'].indexOf(n) % 8];
    },

    relative: function(adu) {
      return this.convertAdjustedToFormat(adu, adu[2] > 0 ? 'futureRelativeFormat' : 'pastRelativeFormat');
    },

    duration: function(ms) {
      return this.convertAdjustedToFormat(getAdjustedUnit(ms), 'durationFormat');
    },

    convertAdjustedToFormat: function(adu, format) {
      var num = adu[0], u = adu[1], ms = adu[2], sign, unit, last, mult;
      if(this['code'] == 'ru') {
        last = num.toString().from(-1);
        switch(true) {
          case last == 1: mult = 1; break;
          case last >= 2 && last <= 4: mult = 2; break;
          default: mult = 3;
        }
      } else {
        mult = this['hasPlural'] && num > 1 ? 1 : 0;
      }
      unit = this['units'][mult * 8 + u] || this['units'][u];
      if(this['capitalizeUnit']) unit = unit.capitalize();
      sign = this['modifiers'].find(function(m) { return m.name == 'sign' && m.value == (ms > 0 ? 1 : -1); });
      return this[format].assign({ 'num': num, 'unit': unit, 'sign': sign.src });
    },

    addFormat: function(src, code, add) {
      var to = [], loc = this;
      if(add !== false) loc.formats.push(src);
      src = src.replace(/\s+/g, '[-,. ]*');
      src = src.replace(/\{(.+?)\}/g, function(all, k) {
        var opt = k.match(/\?$/), slice = k.match(/(\d)(?:-(\d))?/), nc = k.match(/^\d+$/), key = k.replace(/[^a-z]+$/, ''), value, arr;
        if(key === 'time') {
          to = to.concat(TimeFormat);
          return opt ? OptionalTime : RequiredTime;
        }
        if(nc) {
          value = loc['optionals'][nc[0]];
        } else if(loc[key]) {
          value = loc[key];
        } else if(loc[key + 's']) {
          value = loc[key + 's'];
          if(slice) {
            // Can't use filter here as Prototype hijacks the method and doesn't
            // pass an index, so use a simple loop instead!
            arr = [];
            value.forEach(function(m, i) {
              var mod = i % (loc['units'] ? 8 : value.length);
              if(mod >= slice[1] && mod <= (slice[2] || slice[1])) {
                arr.push(m);
              }
            });
            value = arr;
          }
          value = value.compact().join('|');
        }
        if(nc) {
          return '(?:' + value + ')?';
        } else {
          to.push(key);
          return '(' + value + ')' + (opt ? '?' : '');
        }
      });
      addDateInputFormat(src, to, code);
    }

  });

  function collectDateArguments(args) {
    var obj, arr;
    if(object.isObject(args[0])) {
      return args;
    } else if (args.length == 1 && object.isNumber(args[0])) {
      return [args[0]];
    }
    obj = {};
    DateArgumentUnits.each(function(u,i) {
      obj[u.unit] = args[i];
    });
    return [obj];
  }

  function convertAsianDigits(str, key) {
    if(key != 'date' && key != 'month' && key != 'year') return str;
    return str.replace(AsianDigitReg, function(d) {
      var index = LowerAsianDigits.indexOf(d);
      return (index + 1) || '';
    });
  }

  function getFormatMatch(match, arr) {
    var obj = {}, value, num;
    arr.each(function(key, i) {
      value = match[i + 1];
      if(isUndefined(value) || value === '') return;
      value = convertAsianDigits(value.hankaku('n'), key);
      if(key === 'year') obj.yearAsString = value;
      num = parseFloat(value.replace(/,/, '.'));
      obj[key] = !isNaN(num) ? num : value.toLowerCase();
    });
    return obj;
  }

  function getExtendedDate(f, locale) {
    var d = new date(), relative = false, loc, variant, format, set, unit, num, tmp;
    if(object.isDate(f)) {
      d = f;
    } else if(object.isNumber(f)) {
      d = new date(f);
    } else if(object.isObject(f)) {
      d = new date().set(f, true);
      set = f;
    } else if(object.isString(f)) {
      // Pre-initialize the localization formats.

      checkLocaleFormatsAdded(getLocalization(locale, true));
      variant = getVariant(locale);
      f = f.trim().replace(/\.+$/,'').replace(/^now$/, '');
      DateInputFormats.each(function(dif) {
        var match = f.match(dif.reg);
        if(match) {
          format = dif;
          set = getFormatMatch(match, format.to);
          loc = getLocalization(format.locale, true);

          if(set.timestamp) {
            d.setTime(0);
            set = { 'milliseconds': set.timestamp };
            return false;
          }

          // If there's a European variant, swap the month and day.
          if(format.variant && !object.isString(set['month']) && (object.isString(set['date']) || variant)) {
            tmp = set['month'];
            set['month'] = set['date'];
            set['date'] = tmp;
          }

          // If the year is 2 digits then get the implied century.
          if(set['year'] && set.yearAsString.length === 2) {
            set['year'] = getYearFromAbbreviation(set['year']);
          }

          // Set the month which may be localized.
          if(set['month']) {
            set['month'] = loc.getMonth(set['month']);
            if(set['shift'] && !set['unit']) set['unit'] = 'year';
          }

          // If there is both a weekday and a date, the date takes precedence.
          if(set['weekday'] && set['date']) {
            delete set['weekday'];
          // Otherwise set a localized weekday.
          } else if(set['weekday']) {
            set['weekday'] = loc.getWeekday(set['weekday']);
            if(set['shift'] && !set['unit']) set['unit'] = 'week';
          }

          // Relative day localizations such as "today" and "tomorrow".
          if(set['day'] && (tmp = loc.modifiersByName[set['day']])) {
            set['day'] = tmp.value;
            d.resetTime();
            relative = true;
          // If the day is a weekday, then set that instead.
          } else if(set['day'] && (tmp = loc.getWeekday(set['day'])) > -1) {
            delete set['day'];
            set['weekday'] = tmp;
          }

          if(set['date'] && !object.isNumber(set['date'])) {
            set['date'] = loc.getNumericDate(set['date']);
          }

          // If the time is 1pm-11pm advance the time by 12 hours.
          if(set['meridian']) {
            if(set['meridian'] === 'pm' && set['hour'] < 12) set['hour'] += 12;
          }

          // Adjust for timezone offset
          if('offset_hours' in set || 'offset_minutes' in set) {
            set['utc'] = true;
            set['offset_minutes'] = set['offset_minutes'] || 0;
            set['offset_minutes'] += set['offset_hours'] * 60;
            if(set['offset_sign'] === '-') {
              set['offset_minutes'] *= -1;
            }
            set['minute'] -= set['offset_minutes'];
          }

          // Date has a unit like "days", "months", etc. are all relative to the current date.
          if(set['unit']) {
            relative = true;
            num = loc.getNumber(set['num']);
            unit = loc.getEnglishUnit(set['unit']);

            // Shift and unit, ie "next month", "last week", etc.
            if(set['shift'] || set['edge']) {
              num *= (tmp = loc.modifiersByName[set['shift']]) ? tmp.value : 0;

              // Relative month and static date: "the 15th of last month"
              if(unit === 'month' && isDefined(set['date'])) {
                d.set({ 'day': set['date'] }, true);
                delete set['date'];
              }

              // Relative year and static month/date: "June 15th of last year"
              if(unit === 'year' && isDefined(set['month'])) {
                d.set({ 'month': set['month'], 'day': set['date'] }, true);
                delete set['month'];
                delete set['date'];
              }
            }

            // Unit and sign, ie "months ago", "weeks from now", etc.
            if(set['sign'] && (tmp = loc.modifiersByName[set['sign']])) {
              num *= tmp.value;
            }

            // Units can be with non-relative dates, set here. ie "the day after monday"
            if(isDefined(set['weekday'])) {
              d.set({'weekday': set['weekday'] }, true);
              delete set['weekday'];
            }

            // Finally shift the unit.
            set[unit] = (set[unit] || 0) + num;
          }

          if(set['year_sign'] === '-') {
            set['year'] *= -1;
          }

          DateUnitsReversed.slice(1,4).each(function(u, i) {
            var value = set[u.unit], fraction = value % 1;
            if(fraction) {
              set[DateUnitsReversed[i].unit] = (fraction * (u.unit === 'second' ? 1000 : 60)).round();
              set[u.unit] = value | 0;
            }
          });
          return false;
        }
      });
      if(!format) {
        // The Date constructor does something tricky like checking the number
        // of arguments so simply passing in undefined won't work.
        d = f ? new date(f) : new date();
      } else if(relative) {
        d.advance(set);
      } else if(set['utc']) {
        // UTC times can traverse into other days or even months,
        // so preemtively reset the time here to prevent this.
        d.resetTime();
        d.setUTC(set, true);
      } else {
        d.set(set, true);
      }

      // If there is an "edge" it needs to be set after the
      // other fields are set. ie "the end of February"
      if(set && set['edge']) {
        tmp = loc.modifiersByName[set['edge']];
        DateUnitsReversed.slice(4).each(function(u) {
          if(isDefined(set[u.unit])) {
            unit = u.unit;
            return false;
          }
        });
        if(unit === 'year') set.specificity = 'month';
        else if(unit === 'month' || unit === 'week') set.specificity = 'day';
        d[(tmp.value < 0 ? 'endOf' : 'beginningOf') + unit.capitalize()]();
        // This value of -2 is arbitrary but it's a nice clean way to hook into this system.
        if(tmp.value === -2) d.resetTime();
      }
    }
    return {
      date: d,
      set: set
    }
  }

  function formatDate(date, f, relative, locale) {
    var adu, loc = getLocalization(locale, true), caps = regexp(/^[A-Z]/), value, l;
    if(!date.isValid()) {
      return 'Invalid Date';
    } else if(Date[f]) {
      f = Date[f];
    } else if(object.isFunction(f)) {
      adu = getAdjustedUnit(date.millisecondsFromNow());
      f = f.apply(date, adu.concat(loc));
    }
    if(!f && !relative) {
      f = loc['outputFormat'];
    } else if(!f && relative) {
      adu = adu || getAdjustedUnit(date.millisecondsFromNow());
      // Adjust up if time is in ms, as this doesn't
      // look very good for a standard relative date.
      if(adu[1] === 0) {
        adu[1] = 1;
        adu[0] = 1;
      }
      return loc.relative(adu);
    }
    DateOutputFormats.each(function(dof) {
      f = f.replace(regexp('\\{('+dof.token+')(\\d)?\\}', dof.word ? 'i' : ''), function(m,t,d) {
        var val = dof.format(date, loc, d || 1, t), l = t.length, one = t.match(/^(.)\1+$/);
        if(dof.word) {
          if(l === 3) val = val.to(3);
          if(one || t.match(caps)) val = val.capitalize();
        } else if(one && !dof.text) {
          val = (object.isNumber(val) ? val.pad(l) : val.toString()).last(l);
        }
        return val;
      });
    });
    return f;
  }

  function compareDate(d, find, buffer) {
    var p = getExtendedDate(find), accuracy = 0, loBuffer = 0, hiBuffer = 0, override;
    if(buffer > 0) {
      loBuffer = hiBuffer = buffer;
      override = true;
    }
    if(!p.date.isValid()) return false;
    if(p.set && p.set.specificity) {
      DateUnits.each(function(u, i) {
        if(u.unit === p.set.specificity) {
          accuracy = u.multiplier(p.date, d - p.date) - 1;
        }
      });
      if(p.set['edge'] || p.set['shift']) {
        p.date['beginningOf' + p.set.specificity.capitalize()]();
      }
      if(!override && p.set['sign'] && p.set.specificity != 'millisecond') {
        // If the time is relative, there can occasionally be an disparity between the relative date
        // and "now", which it is being compared to, so set an extra buffer to account for this.
        loBuffer = 50;
        hiBuffer = -50;
      }
    }
    var t   = d.getTime();
    var min = p.date.getTime();
    var max = min + accuracy;
    if(p.set && p.set.specificity == 'week' && new Date(max + 1).getHours() != 0) {
      max += date['DSTOffset'];
    }
    return t >= (min - loBuffer) && t <= (max + hiBuffer);
  }

  function updateDate(date, params, reset, utc, advance) {
    if(object.isNumber(params) && advance) {
      // If param is a number and we're advancing, the number is presumed to be milliseconds.
      params = { 'milliseconds': params };
    } else if(object.isNumber(params)) {
      // Otherwise just set the timestamp and return.
      date.setTime(params);
      return date;
    }

    // "date" can also be passed for the day
    if(params['date']) params['day'] = params['date'];
    // If a weekday is included in the params, set it ahead of time and set the params
    // to reflect the updated date so that resetting works properly.
    if(!advance && isUndefined(params['day']) && isDefined(params['weekday'])) {
      callDateMethod(date, 'set', utc, 'Weekday', params['weekday'])
      params['day'] = callDateMethod(date, 'get', utc, 'Date');
      delete params['weekday'];
    }
    // Reset any unit lower than the least specific unit set. Do not do this for weeks
    // or for years. This needs to be performed before the acutal setting of the date
    // because the order needs to be reversed in order to get the lowest specificity.
    // The order of the date setting is also fixed because higher order units can be
    // overwritten by lower order units, such as setting hour: 3, minute: 345, etc.
    DateUnitsReversed.each(function(u) {
      if(isDefined(params[u.unit]) || isDefined(params[u.unit + 's'])) {
        params.specificity = u.unit;
        return false;
      } else if(reset && u.unit !== 'week' && u.unit !== 'year') {
        callDateMethod(date, 'set', utc, u.method, (u.unit === 'day') ? 1 : 0);
      }
    });
    // Now actually set or advance the date in order, higher units first.
    DateUnits.each(function(u,i) {
      var unit   = u.unit;
      var method = u.method;
      var value = isDefined(params[unit]) ? params[unit] : params[unit + 's'];
      if(isUndefined(value)) return;
      if(advance) {
        if(unit === 'week') {
          value  = (params['day'] || 0) + (value * 7);
          method = 'Date';
        }
        value = (value * advance) + callDateMethod(date, 'get', '', method);
      }
      callDateMethod(date, 'set', utc, method, value);
      if(unit === 'month') {
        checkMonthTraversal(date, value);
      }
    });
    return date;
  }

  function callDateMethod(d, prefix, utc, method, value) {
    return d[prefix + (utc ? 'UTC' : '') + method](value);
  }

  // If the year is two digits, add the most appropriate century prefix.
  function getYearFromAbbreviation(year) {
    return (new date().getFullYear() / 100).round() * 100 - (year / 100).round() * 100 + year;
  }

  function getShortHour(d, utc) {
    var hours = callDateMethod(d, 'get', utc, 'Hours');
    return hours === 0 ? 12 : hours - ((hours / 13 | 0) * 12);
  }

  function getMeridian(d, utc) {
    var hours = callDateMethod(d, 'get', utc, 'Hours');
    return hours < 12 ? 'am' : 'pm';
  }

  // weeksSince won't work here as the result needs to be floored, not rounded.
  function getWeekNumber(date) {
    var dow = date.getDay() || 7;
    date.addDays(4 - dow).resetTime();
    return 1 + (date.daysSince(date.clone().beginningOfYear()) / 7 | 0);
  }

  function getAdjustedUnit(ms) {
    var next, ams = ms.abs(), value = ams, unit = 0;
    DateUnitsReversed.from(1).each(function(u, i) {
      next = (ams / u.multiplier() * 10).round() / 10 | 0;
      if(next >= 1) {
        value = next;
        unit = i + 1;
      }
    });
    return [value, unit, ms];
  }


  // If the month is being set, then we don't want to accidentally
  // traverse into a new month just because the target month doesn't have enough
  // days. In other words, "5 months ago" from July 30th is still February, even
  // though there is no February 30th, so it will of necessity be February 28th
  // (or 29th in the case of a leap year).

  function checkMonthTraversal(date, targetMonth) {
    if(targetMonth < 0) targetMonth += 12;
    if(targetMonth % 12 != date.getMonth()) {
      date.setDate(0);
    }
  }

  function createDate(args) {
    var f;
    if(object.isNumber(args[1])) {
      // If the second argument is a number, then we have an enumerated constructor type as in "new Date(2003, 2, 12);"
      f = collectDateArguments(args)[0];
    } else {
      f = args[0];
    }
    return getExtendedDate(f, args[1]).date;
  }



   /***
   * @method [units]Since([d], [locale] = currentLocale)
   * @returns Number
   * @short Returns the time since [d] in the appropriate unit.
   * @extra [d] will accept a date object, timestamp, or text format. If not specified, [d] is assumed to be now. [locale] can be passed to specify the locale that the date is in. For more see @date_format.
   * @example
   *
   *   Date.create().millisecondsSince('1 hour ago') -> 3,600,000
   *   Date.create().daysSince('1 week ago')         -> 7
   *   Date.create().yearsSince('15 years ago')      -> 15
   *   Date.create('15 years ago').yearsAgo()        -> 15
   *
   ***
   * @method millisecondsSince()
   * @set unitsSince
   ***
   * @method secondsSince()
   * @set unitsSince
   ***
   * @method minutesSince()
   * @set unitsSince
   ***
   * @method hoursSince()
   * @set unitsSince
   ***
   * @method daysSince()
   * @set unitsSince
   ***
   * @method weeksSince()
   * @set unitsSince
   ***
   * @method monthsSince()
   * @set unitsSince
   ***
   * @method yearsSince()
   * @set unitsSince
   ***
   * @method [units]Ago()
   * @returns Number
   * @short Returns the time ago in the appropriate unit.
   * @example
   *
   *   Date.create('last year').millisecondsAgo() -> 3,600,000
   *   Date.create('last year').daysAgo()         -> 7
   *   Date.create('last year').yearsAgo()        -> 15
   *
   ***
   * @method millisecondsAgo()
   * @set unitsAgo
   ***
   * @method secondsAgo()
   * @set unitsAgo
   ***
   * @method minutesAgo()
   * @set unitsAgo
   ***
   * @method hoursAgo()
   * @set unitsAgo
   ***
   * @method daysAgo()
   * @set unitsAgo
   ***
   * @method weeksAgo()
   * @set unitsAgo
   ***
   * @method monthsAgo()
   * @set unitsAgo
   ***
   * @method yearsAgo()
   * @set unitsAgo
   ***
   * @method [units]Until([d], [locale] = currentLocale)
   * @returns Number
   * @short Returns the time until [d] in the appropriate unit.
   * @extra [d] will accept a date object, timestamp, or text format. If not specified, [d] is assumed to be now. [locale] can be passed to specify the locale that the date is in. %[unit]FromNow% is provided as an alias to make this more readable. For more see @date_format.
   * @example
   *
   *   Date.create().millisecondsUntil('1 hour from now') -> 3,600,000
   *   Date.create().daysUntil('1 week from now')         -> 7
   *   Date.create().yearsUntil('15 years from now')      -> 15
   *   Date.create('15 years from now').yearsFromNow()    -> 15
   *
   ***
   * @method millisecondsUntil()
   * @set unitsUntil
   ***
   * @method secondsUntil()
   * @set unitsUntil
   ***
   * @method minutesUntil()
   * @set unitsUntil
   ***
   * @method hoursUntil()
   * @set unitsUntil
   ***
   * @method daysUntil()
   * @set unitsUntil
   ***
   * @method weeksUntil()
   * @set unitsUntil
   ***
   * @method monthsUntil()
   * @set unitsUntil
   ***
   * @method yearsUntil()
   * @set unitsUntil
   ***
   * @method [units]FromNow()
   * @returns Number
   * @short Returns the time from now in the appropriate unit.
   * @example
   *
   *   Date.create('next year').millisecondsFromNow() -> 3,600,000
   *   Date.create('next year').daysFromNow()         -> 7
   *   Date.create('next year').yearsFromNow()        -> 15
   *
   ***
   * @method millisecondsFromNow()
   * @set unitsFromNow
   ***
   * @method secondsFromNow()
   * @set unitsFromNow
   ***
   * @method minutesFromNow()
   * @set unitsFromNow
   ***
   * @method hoursFromNow()
   * @set unitsFromNow
   ***
   * @method daysFromNow()
   * @set unitsFromNow
   ***
   * @method weeksFromNow()
   * @set unitsFromNow
   ***
   * @method monthsFromNow()
   * @set unitsFromNow
   ***
   * @method yearsFromNow()
   * @set unitsFromNow
   ***
   * @method add[Units](<num>)
   * @returns Date
   * @short Adds <num> of the unit to the date.
   * @extra Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Don't use this method if you need precision.
   * @example
   *
   *   Date.create().addMilliseconds(5) -> current time + 5 milliseconds
   *   Date.create().addDays(5)         -> current time + 5 days
   *   Date.create().addYears(5)        -> current time + 5 years
   *
   ***
   * @method addMilliseconds()
   * @set addUnits
   ***
   * @method addSeconds()
   * @set addUnits
   ***
   * @method addMinutes()
   * @set addUnits
   ***
   * @method addHours()
   * @set addUnits
   ***
   * @method addDays()
   * @set addUnits
   ***
   * @method addWeeks()
   * @set addUnits
   ***
   * @method addMonths()
   * @set addUnits
   ***
   * @method addYears()
   * @set addUnits
   ***
   * @method isLast[Unit]()
   * @returns Boolean
   * @short Returns true if the date is last week/month/year.
   * @example
   *
   *   Date.create('yesterday').isLastWeek()  -> true or false?
   *   Date.create('yesterday').isLastMonth() -> probably not...
   *   Date.create('yesterday').isLastYear()  -> even less likely...
   *
   ***
   * @method isThis[Unit]()
   * @returns Boolean
   * @short Returns true if the date is this week/month/year.
   * @example
   *
   *   Date.create('tomorrow').isThisWeek()  -> true or false?
   *   Date.create('tomorrow').isThisMonth() -> probably...
   *   Date.create('tomorrow').isThisYear()  -> signs point to yes...
   *
   ***
   * @method isNext[Unit]()
   * @returns Boolean
   * @short Returns true if the date is next week/month/year.
   * @example
   *
   *   Date.create('tomorrow').isNextWeek()  -> true or false?
   *   Date.create('tomorrow').isNextMonth() -> probably not...
   *   Date.create('tomorrow').isNextYear()  -> even less likely...
   *
   ***
   * @method isLastWeek()
   * @set isLastUnit
   ***
   * @method isLastMonth()
   * @set isLastUnit
   ***
   * @method isLastYear()
   * @set isLastUnit
   ***
   * @method isThisWeek()
   * @set isThisUnit
   ***
   * @method isThisMonth()
   * @set isThisUnit
   ***
   * @method isThisYear()
   * @set isThisUnit
   ***
   * @method isNextWeek()
   * @set isNextUnit
   ***
   * @method isNextMonth()
   * @set isNextUnit
   ***
   * @method isNextYear()
   * @set isNextUnit
   ***
   * @method beginningOf[Unit]()
   * @returns Date
   * @short Sets the date to the beginning of the appropriate unit.
   * @example
   *
   *   Date.create().beginningOfDay()   -> the beginning of today (resets the time)
   *   Date.create().beginningOfWeek()  -> the beginning of the week
   *   Date.create().beginningOfMonth() -> the beginning of the month
   *   Date.create().beginningOfYear()  -> the beginning of the year
   *
   ***
   * @method endOf[Unit]()
   * @returns Date
   * @short Sets the date to the end of the appropriate unit.
   * @example
   *
   *   Date.create().endOfDay()   -> the end of today (sets the time to 23:59:59.999)
   *   Date.create().endOfWeek()  -> the end of the week
   *   Date.create().endOfMonth() -> the end of the month
   *   Date.create().endOfYear()  -> the end of the year
   *
   ***
   * @method beginningOfDay()
   * @set beginningOfUnit
   ***
   * @method beginningOfWeek()
   * @set beginningOfUnit
   ***
   * @method beginningOfMonth()
   * @set beginningOfUnit
   ***
   * @method beginningOfYear()
   * @set beginningOfUnit
   ***
   * @method endOfDay()
   * @set endOfUnit
   ***
   * @method endOfWeek()
   * @set endOfUnit
   ***
   * @method endOfMonth()
   * @set endOfUnit
   ***
   * @method endOfYear()
   * @set endOfUnit
   ***/
  function buildDateMethods() {
    var methods = {};
    DateUnits.each(function(u, i) {
      var unit = u.unit;
      var caps = unit.capitalize();
      var multiplier = u.multiplier();
      var since = function(f, code) {
        return ((this.getTime() - date.create(f, code).getTime()) / multiplier).round();
      };
      var until = function(f, code) {
        return ((date.create(f, code).getTime() - this.getTime()) / multiplier).round();
      };
      methods[unit+'sAgo']     = until;
      methods[unit+'sUntil']   = until;
      methods[unit+'sSince']   = since;
      methods[unit+'sFromNow'] = since;
      methods['add'+caps+'s'] = function(num) {
        var set = {};
        set[unit] = num;
        return this.advance(set);
      };
      buildNumberToDateAlias(unit, multiplier);
      if(i < 3) {
        ['Last','This','Next'].each(function(shift) {
          methods['is' + shift + caps] = function() {
            return this.is(shift + ' ' + unit);
          };
        });
      }
      if(i < 4) {
        methods['beginningOf' + caps] = function() {
          var set = {};
          switch(unit) {
            case 'year':  set['year'] = this.getFullYear(); break;
            case 'month': set['month'] = this.getMonth(); break;
            case 'day':   set['day'] = this.getDate(); break;
            case 'week':  set['weekday'] = 0; break;
          }
          return this.set(set, true);
        };
        methods['endOf' + caps] = function() {
          var set = { 'hours': 23, 'minutes': 59, 'seconds': 59, 'milliseconds': 999 };
          switch(unit) {
            case 'year':  set['month'] = 11; set['day'] = 31; break;
            case 'month': set['day'] = this.daysInMonth(); break;
            case 'week':  set['weekday'] = 6; break;
          }
          return this.set(set, true);
        };
      }
    });
    date.extend(methods);
  }

  function buildDateInputFormats() {
    DateArgumentUnits = DateUnits.clone().removeAt(2);
    DateUnitsReversed = DateUnits.clone().reverse();
    var monthReg = '\\d{1,2}|' + English['months'].join('|');
    StaticInputFormats.each(function(f) {
      addDateInputFormat(f.src.replace(/\{month\}/, monthReg) + (f.time === false ? '' : OptionalTime), f.to.concat(TimeFormat), 'en', f.variant);
    });
    addDateInputFormat(RequiredTime, TimeFormat);
  }

   /***
   * @method is[Day]()
   * @returns Boolean
   * @short Returns true if the date falls on that day.
   * @extra Also available: %isYesterday%, %isToday%, %isTomorrow%, %isWeekday%, and %isWeekend%.
   * @example
   *
   *   Date.create('tomorrow').isToday() -> false
   *   Date.create('thursday').isTomorrow() -> ?
   *   Date.create('yesterday').isWednesday() -> ?
   *   Date.create('today').isWeekend() -> ?
   *
   ***
   * @method isToday()
   * @set isDay
   ***
   * @method isYesterday()
   * @set isDay
   ***
   * @method isTomorrow()
   * @set isDay
   ***
   * @method isWeekday()
   * @set isDay
   ***
   * @method isWeekend()
   * @set isDay
   ***
   * @method isSunday()
   * @set isDay
   ***
   * @method isMonday()
   * @set isDay
   ***
   * @method isTuesday()
   * @set isDay
   ***
   * @method isWednesday()
   * @set isDay
   ***
   * @method isThursday()
   * @set isDay
   ***
   * @method isFriday()
   * @set isDay
   ***
   * @method isSaturday()
   * @set isDay
   ***
   * @method isFuture()
   * @returns Boolean
   * @short Returns true if the date is in the future.
   * @example
   *
   *   Date.create('next week').isFuture() -> true
   *   Date.create('last week').isFuture() -> false
   *
   ***
   * @method isPast()
   * @returns Boolean
   * @short Returns true if the date is in the past.
   * @example
   *
   *   Date.create('last week').isPast() -> true
   *   Date.create('next week').isPast() -> false
   *
   ***/
  function buildRelativeAliases() {
    var methods = {};
    var weekdays = English['weekdays'].slice(0,7);
    var months = English['months'].slice(0,12);
    ['today','yesterday','tomorrow','weekday','weekend','future','past'].concat(weekdays).concat(months).each(function(s) {
      methods['is'+ s.capitalize()] = function() {
        return this.is(s);
      };
    });
    date.extend(methods);
  }

  /***
   * @method [unit]()
   * @returns Number
   * @short Takes the number as a corresponding unit of time and converts to milliseconds.
   * @extra Method names can be both singular and plural.  Note that as "a month" is ambiguous as a unit of time, %months% will be equivalent to 30.4375 days, the average number in a month. Be careful using %months% if you need exact precision.
   * @example
   *
   *   (5).milliseconds() -> 5
   *   (10).hours()       -> 36000000
   *   (1).day()          -> 86400000
   *
   ***
   * @method millisecond()
   * @set unit
   ***
   * @method milliseconds()
   * @set unit
   ***
   * @method second()
   * @set unit
   ***
   * @method seconds()
   * @set unit
   ***
   * @method minute()
   * @set unit
   ***
   * @method minutes()
   * @set unit
   ***
   * @method hour()
   * @set unit
   ***
   * @method hours()
   * @set unit
   ***
   * @method day()
   * @set unit
   ***
   * @method days()
   * @set unit
   ***
   * @method week()
   * @set unit
   ***
   * @method weeks()
   * @set unit
   ***
   * @method month()
   * @set unit
   ***
   * @method months()
   * @set unit
   ***
   * @method year()
   * @set unit
   ***
   * @method years()
   * @set unit
   ***
   * @method [unit]Before([d], [locale] = currentLocale)
   * @returns Date
   * @short Returns a date that is <n> units before [d], where <n> is the number.
   * @extra [d] will accept a date object, timestamp, or text format. Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsBefore% if you need exact precision. See @date_format for more information.
   * @example
   *
   *   (5).daysBefore('tuesday')          -> 5 days before tuesday of this week
   *   (1).yearBefore('January 23, 1997') -> January 23, 1996
   *
   ***
   * @method millisecondBefore()
   * @set unitBefore
   ***
   * @method millisecondsBefore()
   * @set unitBefore
   ***
   * @method secondBefore()
   * @set unitBefore
   ***
   * @method secondsBefore()
   * @set unitBefore
   ***
   * @method minuteBefore()
   * @set unitBefore
   ***
   * @method minutesBefore()
   * @set unitBefore
   ***
   * @method hourBefore()
   * @set unitBefore
   ***
   * @method hoursBefore()
   * @set unitBefore
   ***
   * @method dayBefore()
   * @set unitBefore
   ***
   * @method daysBefore()
   * @set unitBefore
   ***
   * @method weekBefore()
   * @set unitBefore
   ***
   * @method weeksBefore()
   * @set unitBefore
   ***
   * @method monthBefore()
   * @set unitBefore
   ***
   * @method monthsBefore()
   * @set unitBefore
   ***
   * @method yearBefore()
   * @set unitBefore
   ***
   * @method yearsBefore()
   * @set unitBefore
   ***
   * @method [unit]Ago()
   * @returns Date
   * @short Returns a date that is <n> units ago.
   * @extra Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsAgo% if you need exact precision.
   * @example
   *
   *   (5).weeksAgo() -> 5 weeks ago
   *   (1).yearAgo()  -> January 23, 1996
   *
   ***
   * @method millisecondAgo()
   * @set unitAgo
   ***
   * @method millisecondsAgo()
   * @set unitAgo
   ***
   * @method secondAgo()
   * @set unitAgo
   ***
   * @method secondsAgo()
   * @set unitAgo
   ***
   * @method minuteAgo()
   * @set unitAgo
   ***
   * @method minutesAgo()
   * @set unitAgo
   ***
   * @method hourAgo()
   * @set unitAgo
   ***
   * @method hoursAgo()
   * @set unitAgo
   ***
   * @method dayAgo()
   * @set unitAgo
   ***
   * @method daysAgo()
   * @set unitAgo
   ***
   * @method weekAgo()
   * @set unitAgo
   ***
   * @method weeksAgo()
   * @set unitAgo
   ***
   * @method monthAgo()
   * @set unitAgo
   ***
   * @method monthsAgo()
   * @set unitAgo
   ***
   * @method yearAgo()
   * @set unitAgo
   ***
   * @method yearsAgo()
   * @set unitAgo
   ***
   * @method [unit]After([d], [locale] = currentLocale)
   * @returns Date
   * @short Returns a date <n> units after [d], where <n> is the number.
   * @extra [d] will accept a date object, timestamp, or text format. Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsAfter% if you need exact precision. See @date_format for more information.
   * @example
   *
   *   (5).daysAfter('tuesday')          -> 5 days after tuesday of this week
   *   (1).yearAfter('January 23, 1997') -> January 23, 1998
   *
   ***
   * @method millisecondAfter()
   * @set unitAfter
   ***
   * @method millisecondsAfter()
   * @set unitAfter
   ***
   * @method secondAfter()
   * @set unitAfter
   ***
   * @method secondsAfter()
   * @set unitAfter
   ***
   * @method minuteAfter()
   * @set unitAfter
   ***
   * @method minutesAfter()
   * @set unitAfter
   ***
   * @method hourAfter()
   * @set unitAfter
   ***
   * @method hoursAfter()
   * @set unitAfter
   ***
   * @method dayAfter()
   * @set unitAfter
   ***
   * @method daysAfter()
   * @set unitAfter
   ***
   * @method weekAfter()
   * @set unitAfter
   ***
   * @method weeksAfter()
   * @set unitAfter
   ***
   * @method monthAfter()
   * @set unitAfter
   ***
   * @method monthsAfter()
   * @set unitAfter
   ***
   * @method yearAfter()
   * @set unitAfter
   ***
   * @method yearsAfter()
   * @set unitAfter
   ***
   * @method [unit]FromNow()
   * @returns Date
   * @short Returns a date <n> units from now.
   * @extra Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsFromNow% if you need exact precision.
   * @example
   *
   *   (5).weeksFromNow() -> 5 weeks ago
   *   (1).yearFromNow()  -> January 23, 1998
   *
   ***
   * @method millisecondFromNow()
   * @set unitFromNow
   ***
   * @method millisecondsFromNow()
   * @set unitFromNow
   ***
   * @method secondFromNow()
   * @set unitFromNow
   ***
   * @method secondsFromNow()
   * @set unitFromNow
   ***
   * @method minuteFromNow()
   * @set unitFromNow
   ***
   * @method minutesFromNow()
   * @set unitFromNow
   ***
   * @method hourFromNow()
   * @set unitFromNow
   ***
   * @method hoursFromNow()
   * @set unitFromNow
   ***
   * @method dayFromNow()
   * @set unitFromNow
   ***
   * @method daysFromNow()
   * @set unitFromNow
   ***
   * @method weekFromNow()
   * @set unitFromNow
   ***
   * @method weeksFromNow()
   * @set unitFromNow
   ***
   * @method monthFromNow()
   * @set unitFromNow
   ***
   * @method monthsFromNow()
   * @set unitFromNow
   ***
   * @method yearFromNow()
   * @set unitFromNow
   ***
   * @method yearsFromNow()
   * @set unitFromNow
   ***/
  function buildNumberToDateAlias(unit, multiplier) {
    var add = 'add' + unit.capitalize() + 's', methods = {};
    function base() { return (this * multiplier).round(); }
    function after() { return createDate(arguments)[add](this);  }
    function before() { return createDate(arguments)[add](-this); }
    methods[unit] = base;
    methods[unit + 's'] = base;
    methods[unit + 'Before'] = before;
    methods[unit + 'sBefore'] = before;
    methods[unit + 'Ago'] = before;
    methods[unit + 'sAgo'] = before;
    methods[unit + 'After'] = after;
    methods[unit + 'sAfter'] = after;
    methods[unit + 'FromNow'] = after;
    methods[unit + 'sFromNow'] = after;
    number.extend(methods);
  }

  function setDateProperties() {
    date.extend({
      'DSTOffset': (new date(2000, 6, 1).getTimezoneOffset() - new date(2000, 0, 1).getTimezoneOffset()) * 60 * 1000,
      'INTERNATIONAL_TIME': '{h}:{mm}:{ss}',
      'RFC1123': '{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {tz}',
      'RFC1036': '{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {tz}',
      'ISO8601_DATE': '{yyyy}-{MM}-{dd}',
      'ISO8601_DATETIME': '{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{fff}{isotz}'
    }, false, false);
  }


   /***
   * @method toISOString()
   * @returns String
   * @short Formats the string to ISO8601 format.
   * @extra This will always format as UTC time. Provided for browsers that do not support this method.
   * @example
   *
   *   Date.create().toISOString() -> ex. 2011-07-05 12:24:55.528Z
   *
   ***
   * @method toJSON()
   * @returns String
   * @short Returns a JSON representation of the date.
   * @extra This is effectively an alias for %toISOString%. Will always return the date in UTC time. Implemented for browsers that do not support it.
   * @example
   *
   *   Date.create().toJSON() -> ex. 2011-07-05 12:24:55.528Z
   *
   ***/

  function buildISOString(name) {
    var d = new date(date.UTC(1999, 11, 31)), target = '1999-12-31T00:00:00.000Z', methods = {};
    if(!d[name] || d[name]() !== target) {
      methods[name] = function() { return formatDate(this.toUTC(), date['ISO8601_DATETIME']); }
      date.extend(methods, true);
    }
  }

  function buildDate() {
    English = date.setLocale('en');
    buildDateMethods();
    buildDateInputFormats();
    buildRelativeAliases();
    buildISOString('toISOString');
    buildISOString('toJSON');
    setDateProperties();
  }


  date.extend({

     /***
     * @method Date.create(<d>, [locale] = currentLocale)
     * @returns Date
     * @short Alternate Date constructor which understands various formats.
     * @extra Accepts a multitude of text formats, a timestamp, or another date. If no argument is given, date is assumed to be now. %Date.create% additionally can accept enumerated parameters as with the standard date constructor. [locale] can be passed to specify the locale that the date is in. For more information, see @date_format.
     * @example
     *
     *   Date.create('July')          -> July of this year
     *   Date.create('1776')          -> 1776
     *   Date.create('today')         -> today
     *   Date.create('wednesday')     -> This wednesday
     *   Date.create('next friday')   -> Next friday
     *   Date.create('July 4, 1776')  -> July 4, 1776
     *   Date.create(-446806800000)   -> November 5, 1955
     *   Date.create(1776, 6, 4)      -> July 4, 1776
     *   Date.create('1776年07月04日', 'ja') -> July 4, 1776
     *
     ***/
    'create': function() {
      return createDate(arguments);
    },

     /***
     * @method Date.now()
     * @returns String
     * @short Returns the number of milliseconds since January 1st, 1970 00:00:00 (UTC time).
     * @example
     *
     *   Date.now() -> ex. 1311938296231
     *
     ***/
    'now': function() {
      return new date().getTime();
    },

     /***
     * @method Date.setLocale(<code>, [set])
     * @returns Locale
     * @short Sets the current locale to be used with dates.
     * @extra Predefined locales are: English (en), French (fr), Italian (it), Spanish (es), Portuguese (pt), German (de), Russian (ru), Japanese (ja), Korean (ko), Simplified Chinese (zh-CN), and Traditional Chinese (zh-TW). In addition to available major locales, you can define a new local here by passing an object for [set]. For more see @date_format.
     *
     ***/
    'setLocale': function(code, set) {
      var loc = getLocalization(code, false, set);
      if(loc) {
        Date['currentLocale'] = code;
        checkLocaleFormatsAdded(loc);
        return loc;
      }
    },

     /***
     * @method Date.getLocale([code] = current)
     * @returns Locale
     * @short Gets the locale for the given code, or the current locale.
     * @extra Returns undefined if there is no locale for the given code. Manipulating the locale object can give you more control over date localizations. For more about locales, see @date_format.
     *
     ***/
    'getLocale': function(code) {
      return getLocalization(code, true);
    },

     /***
     * @method Date.addFormat(<format>, <match>, [locale] = null)
     * @returns Nothing
     * @short Manually adds a new date input format.
     * @extra This method allows fine grained control for alternate formats. <format> is a string that can have regex tokens inside. <match> is an array of the tokens that each regex capturing group will map to, for example %year%, %date%, etc. For more, see @date_format.
     *
     ***/
    'addFormat': function(format, match, locale, variant) {
      addDateInputFormat(format, match, locale, variant, 'unshift');
    }

  }, false, false);

  date.extend({

     /***
     * @method set(<set>, [reset] = false)
     * @returns Date
     * @short Sets the date object.
     * @extra This method can accept multiple formats including a single number as a timestamp, an object, or enumerated parameters (as with the Date constructor). If [reset] is %true%, any units more specific than those passed will be reset. %setUTC% will set the date according to universal time.
     * @example
     *
     *   new Date().set({ year: 2011, month: 11, day: 31 }) -> December 31, 2011
     *   new Date().set(2011, 11, 31)                       -> December 31, 2011
     *   new Date().set(86400000)                           -> 1 day after Jan 1, 1970
     *   new Date().set({ year: 2004, month: 6 }, true)     -> June 1, 2004, 00:00:00.000
     *
     ***/
    'set': function() {
      var args = collectDateArguments(arguments);
      return updateDate(this, args[0], args[1])
    },

     /***
     * @method setUTC()
     * @set set
     ***/
    'setUTC': function() {
      var args = collectDateArguments(arguments);
      return updateDate(this, args[0], args[1], true)
    },

     /***
     * @method setWeekday()
     * @returns Nothing
     * @short Sets the weekday of the date.
     * @extra %setUTCWeekday% sets according to universal time.
     * @example
     *
     *   d = new Date(); d.setWeekday(1); d; -> Monday of this week
     *   d = new Date(); d.setWeekday(6); d; -> Saturday of this week
     *
     ***/
    'setWeekday': function(dow) {
      if(isUndefined(dow)) return;
      this.setDate(this.getDate() + dow - this.getDay());
    },

     /***
     * @method setUTCWeekday()
     * @set setWeekday
     ***/
    'setUTCWeekday': function(dow) {
      if(isUndefined(dow)) return;
      this.setDate(this.getUTCDate() + dow - this.getDay());
    },

     /***
     * @method setWeek()
     * @returns Nothing
     * @short Sets the week (of the year).
     * @extra %setUTCWeek% sets according to universal time.
     * @example
     *
     *   d = new Date(); d.setWeek(15); d; -> 15th week of the year
     *
     ***/
    'setWeek': function(week) {
      if(isUndefined(week)) return;
      var date = this.getDate();
      this.setMonth(0);
      this.setDate((week * 7) + 1);
    },

     /***
     * @method setUTCWeek()
     * @set setWeek
     ***/
    'setUTCWeek': function(week) {
      if(isUndefined(week)) return;
      var date = this.getUTCDate();
      this.setMonth(0);
      this.setUTCDate((week * 7) + 1);
    },

     /***
     * @method getWeek()
     * @returns Number
     * @short Gets the date's week (of the year).
     * @extra %getUTCWeek% gets the time according to universal time.
     * @example
     *
     *   new Date().getWeek() -> today's week of the year
     *
     ***/
    'getWeek': function() {
      return getWeekNumber(this);
    },

     /***
     * @method getUTCWeek()
     * @set getWeek
     ***/
    'getUTCWeek': function() {
      return getWeekNumber(this.toUTC());
    },

     /***
     * @method getUTCOffset([iso])
     * @returns String
     * @short Returns a string representation of the offset from UTC time. If [iso] is true the offset will be in ISO8601 format.
     * @example
     *
     *   new Date().getUTCOffset()     -> "+0900"
     *   new Date().getUTCOffset(true) -> "+09:00"
     *
     ***/
    'getUTCOffset': function(iso) {
      var offset = this.utc ? 0 : this.getTimezoneOffset();
      var colon  = iso === true ? ':' : '';
      if(!offset && iso) return 'Z';
      return (-offset / 60).round().pad(2, true) + colon + (offset % 60).pad(2);
    },

     /***
     * @method toUTC()
     * @returns Date
     * @short Converts the date to UTC time, effectively subtracting the timezone offset.
     * @extra Note here that the method %getTimezoneOffset% will still show an offset even after this method is called, as this method effectively just rewinds the date. %format% however, will correctly set the %{tz}% (timezone) token as UTC once this method has been called on the date. Once a date is set to UTC the only way to unset is the %clone% method.
     * @example
     *
     *   new Date().toUTC() -> current time in UTC
     *
     ***/
    'toUTC': function() {
      if(this.utc) return this;
      var d = this.clone().addMinutes(this.getTimezoneOffset());
      d.utc = true;
      return d;
    },

     /***
     * @method isUTC()
     * @returns Boolean
     * @short Returns true if the date has no timezone offset.
     * @example
     *
     *   new Date().isUTC() -> true or false?
     *
     ***/
    'isUTC': function() {
      return this.utc || this.getTimezoneOffset() === 0;
    },

     /***
     * @method advance()
     * @returns Date
     * @short Sets the date forward.
     * @extra This method can accept multiple formats including a single number as a timestamp, an object, or enumerated parameters (as with the Date constructor). For more see @date_format.
     * @example
     *
     *   new Date().advance({ year: 2 }) -> 2 years in the future
     *   new Date().advance(0, 2, 3)     -> 2 months 3 days in the future
     *   new Date().advance(86400000)    -> 1 day in the future
     *
     ***/
    'advance': function(params) {
      var args = collectDateArguments(arguments);
      return updateDate(this, args[0], false, false, 1, true);
    },

     /***
     * @method rewind()
     * @returns Date
     * @short Sets the date back.
     * @extra This method can accept multiple formats including a single number as a timestamp, an object, or enumerated parameters (as with the Date constructor). For more see @date_format.
     * @example
     *
     *   new Date().rewind({ year: 2 }) -> 2 years in the past
     *   new Date().rewind(0, 2, 3)     -> 2 months 3 days in the past
     *   new Date().rewind(86400000)    -> 1 day in the past
     *
     ***/
    'rewind': function(params) {
      var args = collectDateArguments(arguments);
      return updateDate(this, args[0], false, false, -1);
    },

     /***
     * @method isValid()
     * @returns Boolean
     * @short Returns true if the date is valid.
     * @example
     *
     *   new Date().isValid()         -> true
     *   new Date('flexor').isValid() -> false
     *
     ***/
    'isValid': function() {
      return !isNaN(this.getTime());
    },

     /***
     * @method isAfter(<d>, [margin])
     * @returns Boolean
     * @short Returns true if the date is after the <d>.
     * @extra [margin] is to allow extra margin of error (in ms). <d> will accept a date object, timestamp, or text format. If not specified, <d> is assumed to be now. See @date_format for more information.
     * @example
     *
     *   new Date().isAfter('tomorrow')  -> false
     *   new Date().isAfter('yesterday') -> true
     *
     ***/
    'isAfter': function(d, margin) {
      return this.getTime() > date.create(d).getTime() - (margin || 0);
    },

     /***
     * @method isBefore(<d>, [margin])
     * @returns Boolean
     * @short Returns true if the date is before <d>.
     * @extra [margin] is to allow extra margin of error (in ms). <d> will accept a date object, timestamp, or text format. If not specified, <d> is assumed to be now. See @date_format for more information.
     * @example
     *
     *   new Date().isBefore('tomorrow')  -> true
     *   new Date().isBefore('yesterday') -> false
     *
     ***/
    'isBefore': function(d, margin) {
      return this.getTime() < date.create(d).getTime() + (margin || 0);
    },

     /***
     * @method isBetween(<d1>, <d2>, [buffer] = 0)
     * @returns Boolean
     * @short Returns true if the date falls between <d1> and <d2>.
     * @extra [buffer] is to allow extra buffer of error (in ms). <d1> and <d2> will accept a date object, timestamp, or text format. If not specified, they are assumed to be now. See @date_format for more information.
     * @example
     *
     *   new Date().isBetween('yesterday', 'tomorrow')    -> true
     *   new Date().isBetween('last year', '2 years ago') -> false
     *
     ***/
    'isBetween': function(d1, d2, buffer) {
      var t  = this.getTime();
      var t1 = date.create(d1).getTime();
      var t2 = date.create(d2).getTime();
      var lo = Math.min(t1, t2);
      var hi = Math.max(t1, t2);
      buffer = buffer || 0;
      return (lo - buffer < t) && (hi + buffer > t);
    },

     /***
     * @method isLeapYear()
     * @returns Boolean
     * @short Returns true if the date is a leap year.
     * @example
     *
     *   Date.create('2000').isLeapYear() -> true
     *
     ***/
    'isLeapYear': function() {
      var year = this.getFullYear();
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    },

     /***
     * @method daysInMonth()
     * @returns Number
     * @short Returns the number of days in the date's month.
     * @example
     *
     *   Date.create('May').daysInMonth()            -> 31
     *   Date.create('February, 2000').daysInMonth() -> 29
     *
     ***/
    'daysInMonth': function() {
      return 32 - new date(this.getFullYear(), this.getMonth(), 32).getDate();
    },

     /***
     * @method format(<format>, [locale] = currentLocale)
     * @returns String
     * @short Formats the date.
     * @extra <format> will accept a number of tokens as well as pre-determined formats. [locale] specifies a locale code to use (if not specified the current locale is used). If <format> is falsy, a default format for the locale is used. A function may also be passed here to allow more granular control. See @date_format for more details.
     * @example
     *
     *   Date.create().format()                                   -> ex. July 4, 2003
     *   Date.create().format('{Weekday} {d} {Month}, {yyyy}')    -> ex. Monday July 4, 2003
     *   Date.create().format('{hh}:{mm}')                        -> ex. 15:57
     *   Date.create().format('{12hr}:{mm}{tt}')                  -> ex. 3:57pm
     *   Date.create().format(Date.ISO8601_DATETIME)              -> ex. 2011-07-05 12:24:55.528Z
     *   Date.create('last week').format('', 'ja')                -> ex. 先週
     *   Date.create('yesterday').format(function(value,unit,ms,loc) {
     *     // value = 1, unit = 3, ms = -86400000, loc = [current locale object]
     *   });                                                      -> ex. 1 day ago
     *
     ***/
    'format': function(f, locale) {
      return formatDate(this, f, false, locale);
    },

     /***
     * @method relative([fn], [locale] = currentLocale)
     * @returns String
     * @short Returns a relative date string offset to the current time.
     * @extra [fn] can be passed to provide for more granular control over the resulting string. [fn] is passed 4 arguments: the adjusted value, unit, offset in milliseconds, and a localization object. As an alternate syntax, [locale] can also be passed as the first (and only) parameter. For more information, see @date_format.
     * @example
     *
     *   Date.create('90 seconds ago').relative() -> 1 minute ago
     *   Date.create('January').relative()        -> ex. 5 months ago
     *   Date.create('January').relative('ja')    -> 3ヶ月前
     *   Date.create('120 minutes ago').relative(function(val,unit,ms,loc) {
     *     // value = 2, unit = 3, ms = -7200, loc = [current locale object]
     *   });                                      -> ex. 5 months ago
     *
     ***/
    'relative': function(f, locale) {
      if(object.isString(f)) {
        locale = f;
        f = null;
      }
      return formatDate(this, f, true, locale);
    },

     /***
     * @method is(<d>, [margin])
     * @returns Boolean
     * @short Returns true if the date is <d>.
     * @extra <d> will accept a date object, timestamp, or text format. %is% additionally understands more generalized expressions like month/weekday names, 'today', etc, and compares to the precision implied in <d>. [margin] allows an extra margin of error in milliseconds.  For more information, see @date_format.
     * @example
     *
     *   Date.create().is('July')               -> true or false?
     *   Date.create().is('1776')               -> false
     *   Date.create().is('today')              -> true
     *   Date.create().is('weekday')            -> true or false?
     *   Date.create().is('July 4, 1776')       -> false
     *   Date.create().is(-6106093200000)       -> false
     *   Date.create().is(new Date(1776, 6, 4)) -> false
     *
     ***/
    'is': function(d, margin) {
      var tmp;
      if(object.isString(d)) {
        d = d.trim().toLowerCase();
        switch(true) {
          case d === 'future':  return this.getTime() > new date().getTime();
          case d === 'past':    return this.getTime() < new date().getTime();
          case d === 'weekday': return this.getDay() > 0 && this.getDay() < 6;
          case d === 'weekend': return this.getDay() === 0 || this.getDay() === 6;
          case (tmp = English['weekdays'].indexOf(d) % 7) > -1: return this.getDay() === tmp;
          case (tmp = English['months'].indexOf(d) % 12) > -1:  return this.getMonth() === tmp;
        }
      }
      return compareDate(this, d, margin);
    },

     /***
     * @method resetTime()
     * @returns Date
     * @short Resets the time in the date to 00:00:00.000.
     * @example
     *
     *   Date.create().resetTime()  -> Beginning of today
     *
     ***/
    'resetTime': function() {
      return this.set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 });
    },

     /***
     * @method clone()
     * @returns Date
     * @short Clones the date.
     * @example
     *
     *   Date.create().clone() -> Copy of now
     *
     ***/
    'clone': function() {
      return new date(this.getTime());
    }

  });


  // Instance aliases
  date.extend({

     /***
     * @method iso()
     * @alias toISOString
     *
     ***/
    'iso': function() {
      return this.toISOString();
    },

     /***
     * @method getWeekday()
     * @alias getDay
     *
     ***/
    'getWeekday':    date.prototype.getDay,

     /***
     * @method getUTCWeekday()
     * @alias getUTCDay
     *
     ***/
    'getUTCWeekday':    date.prototype.getUTCDay

  });



  /***
   * Number module
   *
   ***/

  number.extend({

     /***
     * @method duration([locale] = currentLocale)
     * @returns String
     * @short Takes the number as milliseconds and returns a unit-adjusted localized string.
     * @extra This method is the same as %Date#relative% without the localized equivalent of "from now" or "ago". [locale] can be passed as the first (and only) parameter. Note that this method is only available when the dates package is included.
     * @example
     *
     *   (500).duration() -> '500 milliseconds'
     *   (1200).duration() -> '1 second'
     *   (75).minutes().duration() -> '1 hour'
     *   (75).minutes().duration('es') -> '1 hora'
     *
     ***/
    'duration': function(code) {
      return Date.getLocale(code).duration(this);
    }

  });

  buildDate();

})();

import { F as FormatterBehavior } from './formatter-8a02518d.js';
import { t as devMode, w as warn } from './index-e74c1c40.js';

const FULL = 'full';
const LONG = 'long';
const MEDIUM = 'medium';
const SHORT = 'short';
const NARROW = 'narrow';
const TWO_DIGIT = '2-digit';
const NUMERIC = 'numeric';
const AUTO = 'auto';

const WEEKDAY_OPTIONS = [LONG, SHORT, NARROW];
const ERA_OPTIONS = [LONG, SHORT, NARROW];
const YEAR_OPTIONS = [NUMERIC, TWO_DIGIT];
const MONTH_OPTIONS = [NUMERIC, TWO_DIGIT, LONG, SHORT, NARROW];
const DAY_OPTIONS = [NUMERIC, TWO_DIGIT];
const HOUR_OPTIONS = [NUMERIC, TWO_DIGIT];
const MINUTE_OPTIONS = [NUMERIC, TWO_DIGIT];
const SECOND_OPTIONS = [NUMERIC, TWO_DIGIT];
const TIMEZONE_OPTIONS = [LONG, SHORT];
const DAY_PERIOD_OPTIONS = [NARROW, SHORT, LONG];
const DATE_STYLE_OPTIONS = [FULL, LONG, MEDIUM, SHORT];
const TIME_STYLE_OPTIONS = [FULL, LONG, MEDIUM, SHORT];
const HOUR_CYCLE_OPTIONS = ['h11', 'h12', 'h23', 'h24', AUTO];
const CALENDAR_OPTIONS = [
  'buddhist', 'chinese', 'coptic', 'ethiopia', 'ethiopic', 'gregory', 'hebrew', 'indian',
  'islamic', 'iso8601', 'japanese', 'persian', 'roc'
];
const SYSTEM_OPTIONS = [
  'arab', 'arabext', 'bali', 'beng', 'deva', 'fullwide', 'gujr',
  'guru', 'hanidec', 'khmr', ' knda', 'laoo', 'latn', 'limb',
  'mlym', 'mong', 'mymr', 'orya', 'tamldec', ' telu', 'thai', 'tibt',
];

const ALIAS_MAP = {
  a: (date, locale) => {
    return (new Intl.DateTimeFormat(locale, { hour: NUMERIC })
      .format(date)
      .split(' ')[1] || '')
      .toLowerCase();
  },
  ss: (date, locale) => {
    return new Intl.DateTimeFormat(locale, { minute: TWO_DIGIT, second: TWO_DIGIT })
      .format(date)
      .split(':')[1]
      .toLowerCase();
  },
  s: { second: NUMERIC },
  mm: (date, locale) => {
    return new Intl.DateTimeFormat(locale, { hour: TWO_DIGIT, minute: TWO_DIGIT })
      .format(date)
      .split(':')[1].split(' ')[0]
      .toLowerCase();
  },
  m: { minute: NUMERIC },
  hh: (date, locale) => {
    return new Intl.DateTimeFormat(locale, { hour: TWO_DIGIT })
      .format(date)
      .split(/\s/)[0]
      .toLowerCase();
  },
  h: (date, locale) => {
    return new Intl.DateTimeFormat(locale, { hour: NUMERIC })
      .format(date)
      .split(/\s/)[0]
      .toLowerCase();
  },
  DD: { day: TWO_DIGIT},
  D: { day: NUMERIC },
  dddd: { weekday: LONG},
  ddd: { weekday: SHORT},
  dd: { weekday: NARROW},
  MMMM: { month: LONG},
  MMM: { month: SHORT},
  MM: { month: TWO_DIGIT},
  M: { month: NUMERIC},
  YYYY: { year: NUMERIC },
  YY: { year: TWO_DIGIT },
};

const OPTIONS_MAP = {
  weekday: [WEEKDAY_OPTIONS, SHORT],
  era: [ERA_OPTIONS, SHORT],
  year: [YEAR_OPTIONS, NUMERIC],
  month: [MONTH_OPTIONS, LONG],
  day: [DAY_OPTIONS, NUMERIC],
  hour: [HOUR_OPTIONS, TWO_DIGIT],
  minute: [MINUTE_OPTIONS, TWO_DIGIT],
  second: [SECOND_OPTIONS, TWO_DIGIT],
  dayperiod: [DAY_PERIOD_OPTIONS, SHORT, 'dayPeriod'],
  calendar: [CALENDAR_OPTIONS],
  system: [SYSTEM_OPTIONS],
  date: [DATE_STYLE_OPTIONS, MEDIUM, 'dateStyle'],
  time: [TIME_STYLE_OPTIONS, MEDIUM, 'timeStyle'],
  zone: [TIMEZONE_OPTIONS, null, 'timeZoneName'],
  hourcycle: [HOUR_CYCLE_OPTIONS, AUTO, 'hourCycle'],
};

function dateTimeFormat(value, locale, data) {
  value = value || new Date();

  const fallback = data.fallback != null ? data.fallback : (devMode ? 'Invalid' : '–');

  if (!(value instanceof Date)) {
    if (value === 'now') {
      value = new Date;
    } else if (value != null) {
      value = new Date(value);
    } else {
      return fallback;
    }
  }

  const timestamp = value.getTime();

  if (timestamp !== timestamp) return fallback;

  if (data.format) {
    let format = data.format;

    format = format.replace(/\w+/ig, (s) => {
      const opts = ALIAS_MAP[s];

      if (!opts) return s;

      if (typeof opts === 'function') {
        return opts(value, locale);
      }

      return dateTimeFormat(value, locale, opts);
    });

    return format.trim();
  }

  const options = Object.entries(OPTIONS_MAP)
    .reduce((opts, [key, map]) => {
      const optKey = map[2] || key;
      const defaultValue = map[1];
      const val = data[key];

      map = map[0];

      if (val === '' && defaultValue) {
        opts[optKey] = defaultValue;
      } else if (val) {
        if (map.includes(val)) {
          opts[optKey] = val;
        } else if (devMode) {
          warn(`datetime: wrong value for "${key}":`, JSON.stringify(val));
        }
      }

      return opts;
    }, {});

  if (data.timezone) {
    options.timeZone = data.timezone;
  }

  if (data.hourcycle && data.hourcycle !== AUTO) {
    options.hourCycle = data.hourcycle;
  }

  const formatter = new Intl.DateTimeFormat(locale, options);

  try {
    return formatter.format(value);
  } catch (e) {
    warn('number format error', e);

    return fallback;
  }
}

class DateTimeBehavior extends FormatterBehavior {
  static get formatter() {
    return dateTimeFormat;
  }

  constructor(host, value) {
    super(host, value);

    this.intervalId = null;
  }

  apply() {
    super.apply();

    clearInterval(this.intervalId);

    if (this.value === 'now') {
      this.intervalId = setInterval(() => {
        this.apply();
      }, 1000);
    }
  }
}

export default DateTimeBehavior;

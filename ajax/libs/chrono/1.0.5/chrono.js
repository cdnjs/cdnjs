(function(){

// CommonJS exports.
var data = (typeof exports !== 'undefined') ? exports : {};

data.tzToOffset = {
  'ACDT': -630,
  'ACST': -570,
  'ACT': -480,
  'ADT': +180,
  'AEDT': -660,
  'AEST': -600,
  'AFT': -270,
  'AKDT': +480,
  'AKST': +540,
  'AMST': -300,
  'AMT': -240,
  'ART': +180,
  'AST': -240, // Arab Standard Time
  'AWDT': -540,
  'AWST': -480,
  'AZOST': +60,
  'AZT': -240,
  'BDT': -480,
  'BIOT': -360,
  'BIT': +720,
  'BOT': +240,
  'BRT': +180,
  'BST': -60, // British Summer Time
  'BTT': -360,
  'CAT': -120,
  'CCT': -390,
  'CDT': +300,
  'CEDT': -120,
  'CEST': -120,
  'CET': -60,
  'CHAST': -765,
  'ChST': -600,
  'CIST': +480,
  'CKT': +600,
  'CLST': +180,
  'CLT': +240,
  'COST': +240,
  'COT': +300,
  'CST': -480,
  'CST': +360,
  'CVT': +60,
  'CXT': -420,
  'DFT': -60,
  'EAST': +360,
  'EAT': -180,
  'ECT': +240,
  'ECT': +300,
  'EDT': +240,
  'EEDT': -180,
  'EEST': -180,
  'EET': -120,
  'EST': +300,
  'FJT': -720,
  'FKST': +240,
  'GALT': +360,
  'GET': -240,
  'GFT': +180,
  'GILT': -720,
  'GIT': +540,
  'GMT': 0,
  'GST': +120,
  'GYT': +240,
  'HADT': +540,
  'HAST': +600,
  'HKT': -480,
  'HMT': -300,
  'HST': +600,
  'IRKT': -480,
  'IRST': -210,
  'IST': -120,
  'IST': -330,
  'IST': -60,
  'JST': -540,
  'KRAT': -420,
  'KST': -540,
  'LHST': -630,
  'LINT': -840,
  'MAGT': -660,
  'MDT': +360,
  'MIT': +570,
  'MSD': -240,
  'MSK': -180,
  'MST': -390,
  'MST': -480,
  'MST': +420,
  'MUT': -240,
  'NDT': +150,
  'NFT': -690,
  'NPT': -345,
  'NST': +210,
  'NT': +210,
  'NZST': -720,
  'NZDT': -780,
  'OMST': -360,
  'PDT': +420,
  'PETT': -720,
  'PHOT': -780,
  'PKT': -300,
  'PST': -480,
  'PST': +480,
  'RET': -240,
  'SAMT': -240,
  'SAST': -120,
  'SBT': -660,
  'SCT': -240,
  'SLT': -330,
  'SST': -480,
  'SST': +660,
  'TAHT': +600,
  'THA': -420,
  'UTC': 0,
  'UYST': +120,
  'UYT': +180,
  'VET': +270,
  'VLAT': -600,
  'WAT': -60,
  'WEDT': -60,
  'WEST': -60,
  'YAKT': -540,
  'YEKT': -300
};

// While indices are strings here, numbers work fine too when retrieving.
data.offsetToTz = {
  '720':  ['BIT'],
  '660':  ['SST'],
  '600':  ['HST', 'CKT', 'HAST', 'TAHT'],
  '570':  ['MIT'],
  '540':  ['AKST', 'GIT', 'HADT'],
  '480':  ['PST', 'AKDT', 'CIST'],
  '420':  ['MST', 'PDT'],
  '360':  ['CST', 'EAST', 'GALT', 'MDT'],
  '300':  ['EST', 'CDT', 'COT', 'ECT'],
  '270':  ['VET'],
  '240':  ['ECT', 'AST', 'BOT', 'CLT', 'COST', 'EDT', 'FKST', 'GYT'],
  '210':  ['NT', 'NST'],
  '180':  ['BRT', 'ADT', 'ART', 'CLST', 'GFT', 'UYT'],
  '150':  ['NDT'],
  '120':  ['GST', 'UYST'],
  '60':   ['AZOST', 'CVT'],
  '0':    ['UTC', 'GMT'],
  '-60':  ['CET', 'BST', 'DFT', 'IST', 'WAT', 'WEDT', 'WEST'],
  '-120': ['EET', 'CAT', 'CEDT', 'CEST', 'IST', 'SAST'],
  '-180': ['MSK', 'AST', 'AST', 'EAT', 'EEDT', 'EEST'],
  '-210': ['IRST'],
  '-240': ['AST', 'AMT', 'AZT', 'GET', 'MSD', 'MUT', 'RET', 'SAMT', 'SCT'],
  '-270': ['AFT'],
  '-300': ['AMST', 'HMT', 'PKT', 'YEKT'],
  '-330': ['IST', 'SLT'],
  '-345': ['NPT'],
  '-360': ['BIOT', 'BST', 'BTT', 'OMST'],
  '-390': ['CCT', 'MST'],
  '-420': ['CXT', 'KRAT', 'THA'],
  '-480': ['ACT', 'AWST', 'BDT', 'CST', 'HKT', 'IRKT', 'MST', 'PST', 'SST'],
  '-540': ['AWDT', 'JST', 'KST', 'YAKT'],
  '-570': ['ACST'],
  '-600': ['AEST', 'ChST', 'VLAT'],
  '-630': ['ACDT', 'LHST'],
  '-660': ['AEDT', 'MAGT', 'SBT'],
  '-690': ['NFT'],
  '-720': ['FJT', 'GILT', 'PETT', 'NZST'],
  '-765': ['CHAST'],
  '-780': ['PHOT', 'NZDT'],
  '-840': ['LINT']
};

data.weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

data.weekdaysShort = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

data.months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

data.monthsShort = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

data.intervals = [
    function(n) { return n !== 1 ? 'years' : 'year'; },
    function(n) { return n !== 1 ? 'months' : 'month'; },
    function(n) { return n !== 1 ? 'weeks' : 'week'; },
    function(n) { return n !== 1 ? 'days' : 'day'; },
    function(n) { return n !== 1 ? 'hours' : 'hour'; },
    function(n) { return n !== 1 ? 'minutes' : 'minute'; },
    function(n) { return n !== 1 ? 'seconds' : 'second'; }
];

data.intervalFormats = {
    'ago': '% ago',
    'in': 'in %'
};

data.ordinals = function(number) {
  switch (number % 10) {
    case 1: return (number % 100 !== 11) ? 'st' : 'th';
    case 2: return (number % 100 !== 12) ? 'nd' : 'th';
    case 3: return (number % 100 !== 13) ? 'rd' : 'th';
    default: return 'th';
  }
};

function pad2(i) {
  return i < 10 ? '0' + i : i;
};

function pad2sign(i) {
  var sgn = i < 0 ? '-' : '+';
  i = Math.abs(i);
  return sgn + (i < 10 ? '0' + i : i);
};

function pad3(i) {
  return i < 10 ? '00' + i : i < 100 ? '0' + i : i;
};

function pad4sign(i) {
  var sgn = i < 0 ? '-' : '+';
  i = Math.abs(i);
  return sgn + (i < 10 ? '000' + i : i < 100 ? '00' + i : i < 1000 ? '0' + i : i);
}

Date.prototype.interval = function(other) {
    var self = this, inverse = self > other;
    if (inverse) {
        self = other;
        other = this;
    }

    var parts = [
        other.getFullYear() - self.getFullYear(),
        other.getMonth() - self.getMonth(),
        0, // weeks
        other.getDate() - self.getDate(),
        other.getHours() - self.getHours(),
        other.getMinutes() - self.getMinutes(),
        other.getSeconds() - self.getSeconds()
    ];
    if (parts[6] < 0) { parts[5]--; parts[6] += 60; }
    if (parts[5] < 0) { parts[4]--; parts[5] += 60; }
    if (parts[4] < 0) { parts[3]--; parts[4] += 24; }
    if (parts[3] < 0) { parts[1]--; parts[3] += self.getUTCDaysOfMonth(); }
    if (parts[1] < 0) { parts[0]--; parts[1] += 12; }
    parts[2] = (parts[3] / 7) | 0;
    parts[3] -= parts[2] * 7;

    var fragments = [];
    for (var i = 0; i < parts.length; i++) {
        if (parts[i]) {
            fragments.push(parts[i] + ' ' + data.intervals[i](parts[i]));
        }
    }
    return fragments;
};

Date.prototype.format = function(format, tz) {
  var time = this.getTime();

  if (tz === undefined) {
    tz = this.getTimezone();
    tzName = this.getTimezoneName();
  }
  else {
    var tzData = parseTimezone(tz);
    tz = tzData[0];
    var tzName = tzData[1];
  }

  // Use correct timezone.
  this.setTime(time - tz * 60000);

  var result = '';
  for (var i = 0; i < format.length; i++) {
    switch (format.charAt(i)) {
      // Day
      case 'd': result += pad2(this.getUTCDate()); break;
      case 'D': result += data.weekdaysShort[this.getUTCDay()]; break;
      case 'j': result += this.getUTCDate(); break;
      case 'l': result += data.weekdays[this.getUTCDay()]; break;
      case 'N': result += this.getUTCDay() || 7; break;
      case 'S': result += data.ordinals(this.getUTCDate()); break;
      case 'w': result += this.getUTCDay(); break;
      case 'z': result += this.getUTCDayOfYear(); break;

      // Week
      case 'W': result += pad2(this.getUTCISOWeek()); break;

      // Month
      case 'F': result += data.months[this.getUTCMonth()]; break;
      case 'm': result += pad2(this.getUTCMonth() + 1); break;
      case 'M': result += data.monthsShort[this.getUTCMonth()]; break;
      case 'n': result += this.getUTCMonth() + 1; break;
      case 't': result += this.getUTCDaysOfMonth(); break;

      // Year
      case 'L': result += this.isLeapYear() ? 1 : 0; break;
      case 'o': result += this.getUTCISOFullYear(); break;
      case 'Y': result += this.getUTCFullYear(); break;
      case 'y': result += pad2(this.getUTCFullYear() % 100); break;

      // Time
      case 'a': result += this.getUTCHours() >= 12 ? 'pm' : 'am'; break;
      case 'A': result += this.getUTCHours() >= 12 ? 'PM' : 'AM'; break;
      case 'g': result += this.getUTCHours() % 12 || 12; break;
      case 'G': result += this.getUTCHours(); break;
      case 'h': result += pad2(this.getUTCHours() % 12 || 12); break;
      case 'H': result += pad2(this.getUTCHours()); break;
      case 'i': result += pad2(this.getUTCMinutes()); break;
      case 's': result += pad2(this.getUTCSeconds()); break;
      case 'u': result += pad3(this.getUTCMilliseconds()); break;

      // Timezone
      case 'O': result += pad4sign((tz < 0 ? 1 : -1) * (Math.floor(Math.abs(tz) / 60) * 100 + Math.abs(tz) % 60)); break;
      case 'P': result += pad2sign((tz < 0 ? 1 : -1) * (Math.floor(Math.abs(tz) / 60))) + ':' + pad2(Math.abs(tz) % 60); break;
      case 'T': result += tzName; break;
      case 'Z': result += -tz * 60; break;

      // Full Date/Time
      case 'c': this.setTime(time); result += this.format('Y-m-d\\TH:i:sP', tz); break;
      case 'r': this.setTime(time); result += this.format('D, d M y H:i:s O', tz); break;
      case 'U': result += Math.floor(this.getTime() / 1000); break;

      case '\\': if (format.charAt(++i) !== undefined) result += format.charAt(i); break;

      default: result += format.charAt(i); break;
    }
  }

  this.setTime(time);

  return result;
};

function parseTimezone(tz) {
  if (typeof tz === 'number') {
    return [tz, tz in data.offsetToTz ? data.offsetToTz[tz][0] : ''];
  }
  var number = parseInt(tz, 10);
  if (isNaN(number)) {
    return [data.tzToOffset[tz], tz];
  }
  else {
    tz = (number < 0 ? 1 : -1) * (Math.floor(Math.abs(number) / 100) * 60 + Math.abs(number) % 100);
    return [tz, tz in data.offsetToTz ? data.offsetToTz[tz][0] : ''];
  }
}

Date.prototype.isLeapYear = function() {
  var y = this.getUTCFullYear();
  return (y % 400 === 0) || (y % 4 === 0 && y % 100 !== 0);
};

Date.prototype.getUTCISOWeek = function() {
  // Go to the week's thursday.
  var d = new Date(this);
  d.setUTCDate(d.getUTCDate() - (d.getUTCDay() || 7) + 4);
  return Math.ceil((d.getTime() - Date.UTC(d.getUTCFullYear(), 0)) / 86400000 / 7);
};

Date.prototype.getUTCISOFullYear = function() {
  // Go to the week's thursday.
  var d = new Date(this);
  d.setUTCDate(d.getUTCDate() - (d.getUTCDay() || 7) + 4);
  return d.getUTCFullYear();
};

Date.prototype.getUTCDaysOfMonth = function() {
  var d = new Date(this);
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + 1);
  d.setUTCDate(0);
  return d.getUTCDate();
};

Date.prototype.getUTCDayOfYear = function() {
  return Math.floor((this.getTime() - Date.UTC(this.getUTCFullYear(), 0)) / 86400000);
};

Date.prototype.getTimezone = function() {
  if (!('_tz' in this)) {
    this.setTimezone(new Date().getTimezoneOffset());
  }
  return this._tz;
};

Date.prototype.getTimezoneName = function() {
  this.getTimezone(); // Make sure the tz data is populated.
  return this._tzName;
};

Date.prototype.setTimezone = function(val) {
  var tzData = parseTimezone(val);
  this._tz = tzData[0];
  this._tzName = tzData[1];
};

})();

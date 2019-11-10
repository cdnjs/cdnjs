/* jshint expr: true */ 
!function (root, factory) {
  if (typeof module === 'object' && module.exports)
    module.exports = factory(root);
  else
    root.timeago = factory(root);
}(typeof window !== 'undefined' ? window : this, function () {

var timeago = function(nowDate) {
  // 已有的local，默认为en
  var defaultLocal = 'en',
  SECONDS = 10,
  MINUTE_SECONDS = 60,
  HOUR_SECONDS = 3600,
  DAY_SECONDS = 86400,
  MONTH_SECONDS = 2592000,
  YEAR_SECONDS = 31536000,

  // 已有的local
  locals = {
    'en': {
      'JUST_NOW': ["just now", "a while"],
      'SECOND_AGO': ["%s seconds ago", "in %s seconds"],
      'A_MINUTE_AGO': ["1 minute ago", "in 1 minute"],
      'MINUTES_AGO': ["%s minutes ago", "in %s minutes"],
      'AN_HOUR_AGO': ["1 hour ago", "in 1 hour"],
      'HOURS_AGO': ["%s hours ago", "in %s hours"],
      'A_DAY_AGO': ["1 day ago", "in 1 day"],
      'DAYS_AGO': ["%s days ago", "in %s days"],
      'A_MONTH_AGO': ["1 month ago", "in 1 month"],
      'MONTHS_AGO': ["%s months ago", "in %s months"],
      'A_YEAR_AGO': ["1 year ago", "in 1 year"],
      'YEARS_AGO': ["%s years ago", "in %s years"]
    },
    'zh_CN': {
      'JUST_NOW': ["刚刚", "片刻后"],
      'SECOND_AGO': ["%s秒前", "%s秒后"],
      'A_MINUTE_AGO': ["1分钟前", "1分钟后"],
      'MINUTES_AGO': ["%s分钟前", "%s分钟后"],
      'AN_HOUR_AGO': ["1小时前", "1小时后"],
      'HOURS_AGO': ["%s小时前", "%s小时后"],
      'A_DAY_AGO': ["1天前", "1天后"],
      'DAYS_AGO': ["%s天前", "%s天后"],
      'A_MONTH_AGO': ["1月前", "1月后"],
      'MONTHS_AGO': ["%s月前", "%s月后"],
      'A_YEAR_AGO': ["1年前", "1年后"],
      'YEARS_AGO': ["%s年前", "%s年后"]
    }
  },
  format = function(date, local) {
    var now = new Date();
    if (! nowDate) {
      now = new Date();
    }
    else {
      now = toDate(nowDate);
    }
    date = toDate(date);

    var diff = (now.getTime() - date.getTime()) / 1000;
    var index = 0;
    if (diff < 0) {
      index = 1;
    }
    diff = Math.abs(diff);

    if (! locals[local]) {
      local = defaultLocal;
    }

    var localTemp = locals[local];

    if (diff < SECONDS)  return localTemp.JUST_NOW[index];

    if (diff < MINUTE_SECONDS) return simpleTemplate(localTemp.SECOND_AGO[index], diff);
    if (diff < MINUTE_SECONDS * 2) return localTemp.A_MINUTE_AGO[index];

    if (diff < HOUR_SECONDS) return simpleTemplate(localTemp.MINUTES_AGO[index], parseInt(diff / MINUTE_SECONDS));
    if (diff < HOUR_SECONDS * 2) return localTemp.AN_HOUR_AGO[index];
    if (diff < HOUR_SECONDS * 24) return simpleTemplate(localTemp.HOURS_AGO[index], parseInt(diff / HOUR_SECONDS));

    if (diff < DAY_SECONDS * 2) return localTemp.A_DAY_AGO[index];
    if (diff < DAY_SECONDS * 30) return simpleTemplate(localTemp.DAYS_AGO[index], parseInt(diff / DAY_SECONDS));

    if (diff < MONTH_SECONDS * 2) return localTemp.A_MONTH_AGO[index];
    if (diff < MONTH_SECONDS * 12) return simpleTemplate(localTemp.MONTHS_AGO[index], parseInt(diff / MONTH_SECONDS));

    if (diff < YEAR_SECONDS * 2) return localTemp.A_YEAR_AGO[index];
    return simpleTemplate(localTemp.YEARS_AGO[index], parseInt(diff / YEAR_SECONDS));
  },
  // register a local language
  register = function(local, dict) {
    locals[local] = dict;
  },
  // 将字符串、时间戳转日期
  toDate = function(input) {
    if (input instanceof Date) {
      return input;
    } else if (!isNaN(input)) {
      return new Date(input);
    } else if (/^\d+$/.test(input)) {
      return new Date(parseInt(input, 10));
    } else {
      var s = (input || '').trim();
      s = s.replace(/\.\d+/, ''); // remove milliseconds
      s = s.replace(/-/, '/').replace(/-/, '/');
      s = s.replace(/T/, ' ').replace(/Z/, ' UTC');
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400
      return new Date(s);
    }
  },
  // 简单的字符串模版
  simpleTemplate = function(str, tmp) {
    if (typeof(tmp) === 'number') {
      tmp = tmp + ""; // 转成字符
    }
    if (typeof(tmp) === 'string') {
      return str.replace("%s", tmp);
    }
    if (typeof(tmp) === 'object') {
      for (var i in tmp) {
        str = str.replace("%s", tmp[i]);
      }
      return str;
    }
    return str;
  };

  return {
    format: format,
    register: register
  };
};

  return timeago;
});
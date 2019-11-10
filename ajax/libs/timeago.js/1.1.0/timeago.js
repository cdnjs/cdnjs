/* jshint expr: true */
!function (root, factory) {
  if (typeof module === 'object' && module.exports)
    module.exports = factory(root);
  else
    root.timeago = factory(root);
}(typeof window !== 'undefined' ? window : this, function () {

  var timeago = function(nowDate, defaultLocale) {
    var timers = {}, // 当前定时器
    cnt = 0;
    // 已有的locale，默认为en
    if (! defaultLocale) {
      defaultLocale = 'en';
    }
    // second, minite, hour, day, week, month, year(365 days)
    SEC_ARRAY = [60, 60, 24, 7, 365/7/12, 12],
    SEC_ARRAY_LEN = 6,
    indexMapEn = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'],
    indexMapZh = ['秒', '分钟', '小时', '天', '周', '月', '年'],
    locales = {
      'en': function(number, index) {
        if (index === 0) return ['just now', 'a while'];
        else {
          var unit = indexMapEn[parseInt(index / 2)];
          if (number > 1) unit += 's';
          return [number + ' ' + unit + ' ago', 'in ' + number + ' ' + unit];
        }
      },
      'zh_CN': function(number, index) {
        if (index === 0) return ['刚刚', '片刻后'];
        else {
          var unit = indexMapZh[parseInt(index / 2)];
          return [number + unit + '前', number + unit + '后'];
        }
      }
    },

    diff_sec = function(date) {
      var now = new Date();
      if (nowDate) now = toDate(nowDate);
      return (now.getTime() - toDate(date).getTime()) / 1000;
    },
    format_diff = function(diff, locale) {
      if (! locales[locale]) locale = defaultLocale;
      var localeTemp = locales[locale],
          agoin = 0, i = 0;

      if (diff < 0) agoin = 1;  // timein
      diff = Math.abs(diff);

      for (; diff >= SEC_ARRAY[i] && i < SEC_ARRAY_LEN; i++) {
        diff /= SEC_ARRAY[i];
      }
      diff = toInt(diff);
      i *= 2;

      if (diff > (i === 0 ? 9 : 1)) i += 1;
      return locales[locale](diff, i)[agoin].replace('%s', diff);
    },
    format = function(date, locale) {
      return format_diff(diff_sec(date), locale);
    },
    // register a language locale
    register = function(locale, localeFunc) {
      locales[locale] = localeFunc;
    },
    // 将字符串、时间戳转日期
    toDate = function(input) {
      if (input instanceof Date) {
        return input;
      } else if (!isNaN(input)) {
        return new Date(toInt(input));
      } else if (/^\d+$/.test(input)) {
        return new Date(toInt(input, 10));
      } else {
        var s = (input || '').trim();
        s = s.replace(/\.\d+/, '') // remove milliseconds
          .replace(/-/, '/').replace(/-/, '/')
          .replace(/T/, ' ').replace(/Z/, ' UTC')
          .replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400
        return new Date(s);
      }
    },
    toInt = function(f) {
      return parseInt(f);
    },
    left_sec = function(diff, unit) {
      diff = diff % unit;
      diff = diff ? unit - diff : unit;
      return Math.ceil(diff);
    },
    // 计算下一次定时时间
    next_interval = function(diff) {
      var rst = 1, i = 0, d = diff;
      for (; diff >= SEC_ARRAY[i] && i < SEC_ARRAY_LEN; i++) {
        diff /= SEC_ARRAY[i];
        rst *= SEC_ARRAY[i];
      }
      return left_sec(d, rst);
    },
    // 定时处理render
    do_render = function(node, date, locale, cnt) {
      var diff = diff_sec(date);
      node.innerHTML = format_diff(diff, locale);
      // 通过diff来判断下一次执行的时间
      timers['k' + cnt] = setTimeout(function() {
        do_render(node, date, locale, cnt);
      }, next_interval(diff) * 1000);
    },
    // 获得属性值，兼容js和jq
    attr = 'data-timeago',
    get_date_attr = function(node) {
      if (node.getAttribute) return node.getAttribute(attr);
      if(node.attr) return node.attr(attr);
    },
    // 开始动态渲染节点
    render = function(nodes, locale) {
      if (nodes.length === undefined) nodes = [nodes];
      for (var i = 0; i < nodes.length; i++) {
        cnt ++;
        do_render(nodes[i], get_date_attr(nodes[i]), locale, cnt); // 立即执行
      }
    },
    // 取消所有的动态渲染，释放资源
    cancel = function() {
      for (var key in timers) {
        clearTimeout(timers[key]);
      }
      timers = {};
    },
    // 设置默认语言
    setLocale = function(locale) {
      defaultLocale = locale;
    };

    return {
      format: format,
      register: register,
      render: render,
      cancel: cancel,
      setLocale: setLocale
      // for dev test
      // next_interval: next_interval
    };
  };

  return timeago;
});
/* jshint expr: true */ 
!function (root, factory) {
  if (typeof module === 'object' && module.exports)
    module.exports = factory(root);
  else
    root.timeago = factory(root);
}(typeof window !== 'undefined' ? window : this, function () {

var timeago = function(nowDate) {
  var timers = {}, // 当前定时器
  cnt = 0,
  // 已有的local，默认为en
  defaultLocal = 'en',
  SECONDS = 10,
  MINUTE_SECONDS = 60,
  HOUR_SECONDS = 3600,
  DAY_SECONDS = 86400,
  MONTH_SECONDS = 2592000,
  YEAR_SECONDS = 31536000,

  _init_local = function(local) {
    var r = {}, t = null;
    for (var i = 0; i < local.length; i++) {
      t = local[i];
      r[t[0]] = [t[1], t[2]];
    }
    return r;
  },
  // for compression
  JUST_NOW = 'JUST_NOW',
  SECOND_AGO = 'SECOND_AGO',
  A_MINUTE_AGO = 'A_MINUTE_AGO',
  MINUTES_AGO = 'MINUTES_AGO',
  AN_HOUR_AGO = 'AN_HOUR_AGO',
  HOURS_AGO = 'HOURS_AGO',
  A_DAY_AGO = 'A_DAY_AGO',
  DAYS_AGO = 'DAYS_AGO',
  A_MONTH_AGO = 'A_MONTH_AGO',
  MONTHS_AGO = 'MONTHS_AGO',
  A_YEAR_AGO = 'A_YEAR_AGO',
  YEARS_AGO = 'YEARS_AGO',
  locals = {
    'en': _init_local([[JUST_NOW, 'just now', 'a while'], [SECOND_AGO, '%s seconds ago', 'in %s seconds'], [A_MINUTE_AGO, '1 minute ago', 'in 1 minute'], [MINUTES_AGO, '%s minutes ago', 'in %s minutes'], [AN_HOUR_AGO, '1 hour ago', 'in 1 hour'], [HOURS_AGO, '%s hours ago', 'in %s hours'], [A_DAY_AGO, '1 day ago', 'in 1 day'], [DAYS_AGO, '%s days ago', 'in %s days'], [A_MONTH_AGO, '1 month ago', 'in 1 month'], [MONTHS_AGO, '%s months ago', 'in %s months'], [A_YEAR_AGO, '1 year ago', 'in 1 year'], [YEARS_AGO, '%s years ago', 'in %s years']]),
    'zh_CN': _init_local([[JUST_NOW, '刚刚', '片刻后'], [SECOND_AGO, '%s秒前', '%s秒后'], [A_MINUTE_AGO, '1分钟前', '1分钟后'], [MINUTES_AGO, '%s分钟前', '%s分钟后'], [AN_HOUR_AGO, '1小时前', '1小时后'], [HOURS_AGO, '%s小时前', '%s小时后'], [A_DAY_AGO, '1天前', '1天后'], [DAYS_AGO, '%s天前', '%s天后'], [A_MONTH_AGO, '1月前', '1月后'], [MONTHS_AGO, '%s月前', '%s月后'], [A_YEAR_AGO, '1年前', '1年后'], [YEARS_AGO, '%s年前', '%s年后']])
  },
  
  diff_sec = function(date) {
    var now = new Date();
    if (nowDate) now = toDate(nowDate);
    return (now.getTime() - toDate(date).getTime()) / 1000;
  },
  format_diff = function(diff, local) {
    if (! locals[local]) local = defaultLocal;
    var localTemp = locals[local],
    index = 0;

    if (diff < 0) index = 1;// 如果是负数，使用xxx后模版
    diff = Math.abs(diff);

    if (diff < SECONDS)  return localTemp[JUST_NOW][index];

    if (diff < MINUTE_SECONDS) return simpleTemplate(localTemp[SECOND_AGO][index], toInt(diff));
    if (diff < MINUTE_SECONDS * 2) return localTemp[A_MINUTE_AGO][index];

    if (diff < HOUR_SECONDS) return simpleTemplate(localTemp[MINUTES_AGO][index], toInt(diff / MINUTE_SECONDS));
    if (diff < HOUR_SECONDS * 2) return localTemp[AN_HOUR_AGO][index];
    if (diff < HOUR_SECONDS * 24) return simpleTemplate(localTemp[HOURS_AGO][index], toInt(diff / HOUR_SECONDS));

    if (diff < DAY_SECONDS * 2) return localTemp.A_DAY_AGO[index];
    if (diff < DAY_SECONDS * 30) return simpleTemplate(localTemp[DAYS_AGO][index], toInt(diff / DAY_SECONDS));

    if (diff < MONTH_SECONDS * 2) return localTemp[A_MONTH_AGO][index];
    if (diff < MONTH_SECONDS * 12) return simpleTemplate(localTemp[MONTHS_AGO][index], toInt(diff / MONTH_SECONDS));

    if (diff < YEAR_SECONDS * 2) return localTemp[A_YEAR_AGO][index];
    return simpleTemplate(localTemp[YEARS_AGO][index], toInt(diff / YEAR_SECONDS));
  },
  format = function(date, local) {
    return format_diff(diff_sec(date), local);
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
      return new Date(toInt(input));
    } else if (/^\d+$/.test(input)) {
      return new Date(toInt(input, 10));
    } else {
      var s = (input || '').trim();
      s = s.replace(/\.\d+/, ''); // remove milliseconds
      s = s.replace(/-/, '/').replace(/-/, '/');
      s = s.replace(/T/, ' ').replace(/Z/, ' UTC');
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400
      return new Date(s);
    }
  },
  toInt = function(f) {
    return parseInt(f);
  },
  // 简单的字符串模版，目前只是将%s替换
  simpleTemplate = function(str, tmp) {
    return str.replace('%s', tmp);
  },
  isArray = function (o) {
    return o.length !== undefined;
  },
  left_sec = function(diff, unit) {
    diff = diff % unit;
    diff = diff ? unit - diff : unit;
    return diff;
  },
  // 计算下一次定时时间
  next_interval = function(diff) {
    if (diff < MINUTE_SECONDS) return 1;
    if (diff < HOUR_SECONDS) return left_sec(diff, MINUTE_SECONDS);
    if (diff < DAY_SECONDS) return left_sec(diff, HOUR_SECONDS);
    if (diff < MONTH_SECONDS) return left_sec(diff, DAY_SECONDS);
    if (diff < YEAR_SECONDS) return left_sec(diff, MONTH_SECONDS);
    return left_sec(diff, YEAR_SECONDS);
  },
  // 定时处理render
  do_render = function(node, date, local, cnt) {
    var diff = diff_sec(date);
    node.innerHTML = format_diff(diff, local);
    // 通过diff来判断下一次执行的时间
    timers['k' + cnt] = setTimeout(function() {
      do_render(node, date, local, cnt);
    }, next_interval(diff) * 1000);
  },
  // 获得属性值，兼容js和jq
  attr = 'data-timeago',
  get_date_attr = function(node) {
    if (node.getAttribute) return node.getAttribute(attr);
    if(node.attr) return node.attr(attr);
  },
  // 开始动态渲染节点
  render = function(nodes, local) {
    if (! isArray(nodes)) nodes = [nodes];
    for (var i = 0; i < nodes.length; i++) {
      cnt ++;
      do_render(nodes[i], get_date_attr(nodes[i]), local, cnt); // 立即执行
    }
  },
  // 取消所有的动态渲染，释放资源
  cancel = function() {
    for (var key in timers) {
      clearTimeout(timers[key]);
    }
    timers = {};
  };

  return {
    format: format,
    register: register,
    render: render,
    cancel: cancel
  };
};

  return timeago;
});
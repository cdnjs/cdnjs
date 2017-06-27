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
    // second, minite, hour, day, week, month, year(365 days)
    SEC_ARRAY = [60, 60, 24, 7, 365/7/12, 12],
    SEC_ARRAY_LEN = 6,

    locals = {
      'en': [
        ['just now', 'a while'], 
        ['%s seconds ago', 'in %s seconds'],
        ['1 minute ago', 'in 1 minute'], 
        ['%s minutes ago', 'in %s minutes'], 
        ['1 hour ago', 'in 1 hour'], 
        ['%s hours ago', 'in %s hours'], 
        ['1 day ago', 'in 1 day'], 
        ['%s days ago', 'in %s days'], 
        ['1 week ago', 'in 1 week'], 
        ['%s weeks ago', 'in %s weeks'], 
        ['1 month ago', 'in 1 month'], 
        ['%s months ago', 'in %s months'], 
        ['1 year ago', 'in 1 year'], 
        ['%s years ago', 'in %s years']
      ],
      'zh_CN': [
        ['刚刚', '片刻后'], 
        ['%s秒前', '%s秒后'], 
        ['1分钟前', '1分钟后'], 
        ['%s分钟前', '%s分钟后'], 
        ['1小时前', '1小时后'], 
        ['%s小时前', '%s小时后'], 
        ['1天前', '1天后'], 
        ['%s天前', '%s天后'], 
        ['1周前', '1周后'], 
        ['%s周前', '%s周后'], 
        ['1月前', '1月后'], 
        ['%s月前', '%s月后'], 
        ['1年前', '1年后'], 
        ['%s年前', '%s年后']
      ]
    },
    
    diff_sec = function(date) {
      var now = new Date();
      if (nowDate) now = toDate(nowDate);
      return (now.getTime() - toDate(date).getTime()) / 1000;
    },
    format_diff = function(diff, local) {
      if (! locals[local]) local = defaultLocal;
      var localTemp = locals[local],
          index = 0, i = 0;

      if (diff < 0) index = 1;  // timein
      diff = Math.abs(diff);

      for (; diff >= SEC_ARRAY[i] && i < SEC_ARRAY_LEN; i++) {
        diff /= SEC_ARRAY[i];
      }
      diff = toInt(diff);
      i *= 2;
      
      if (diff > (i === 0 ? 9 : 1)) i += 1;
      return locals[local][i][index].replace('%s', diff);
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
    left_sec = function(diff, unit) {
      diff = diff % unit;
      diff = diff ? unit - diff : unit;
      return toInt(diff);
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
      if (nodes.length === undefined) nodes = [nodes];
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
      cancel: cancel,
      // for dev test
      // next_interval: next_interval
    };
  };

  return timeago;
});
var Gmail =  function() {

  var api = {
              get : {},
              observe : {},
              check : {},
              tools : {},
              tracker : {},
              dom : {}
            };


  api.version           = "0.2.2";
  api.tracker.globals   = GLOBALS;
  api.tracker.view_data = VIEW_DATA;
  api.tracker.ik        = api.tracker.globals[9];



  api.get.last_active = function() {
    var data = api.tracker.globals[17][15];
    return {
             time : data[1],
             ip : data[3],
             mac_address : data[9],
             time_relative : data[10]
           }
  }


  api.get.loggedin_accounts = function() {
    var data = api.tracker.globals[17][23];
    var users = [];

    for(i in data[1]) {
      users.push({name : data[1][i][4], email : data[1][i][0]})
    }

    return users;
  }


  api.get.user_email = function() {
    return api.tracker.globals[10];
  };


  api.check.is_thread = function() {
    var check_1 = $('.nH .if').children(":eq(1)").children().children(":eq(1)").children();
    var check_2 = api.get.email_ids();

    return check_1.length > 1 || check_2.length > 1;
  };


  api.dom.inbox_content = function() {
    return $('div[role=main]:first');
  }


  api.check.is_preview_pane = function() {
    var dom = api.dom.inbox_content();
    var box = dom.find("[gh=tl]");

    if(box.length > 0) {
      return box[0].getAttribute('class').indexOf('aia') != -1;
    }

    return false;
  }


  api.check.is_horizontal_split = function() {
    var dom = api.dom.inbox_content();
    var box = dom.find("[gh=tl]").find('.nn');

    return box.length == 0; 
  }


  api.check.is_vertical_split = function() {
    return api.check.is_horizontal_split() == false;
  }


  api.check.is_tabbed_inbox = function() {
    return $(".aKh").length == 1;
  }


  api.check.is_right_side_chat = function() {
    return $('.ApVoH')[0].getAttribute('aria-labelledby') == ':wf';
  }


  api.check.is_google_apps_user =function() {
    var email = api.get.user_email();
    return email.indexOf('gmail.com', email.length - 'gmail.com'.length) == -1;
  }


  api.get.storage_info = function() {
    var div = $('.md.mj').find('div')[0];
    var used = $(div).find('span')[0].innerText;
    var total = $(div).find('span')[1].innerText;
    var percent = parseFloat(used.replace(/[^0-9\.]/g, '')) * 100 / parseFloat(total.replace(/[^0-9\.]/g, ''));

    return {used : used, total : total, percent : Math.floor(percent)}
  }


  api.dom.email_subject = function () {
    return $('h1.ha');
  }


  api.get.email_subject = function() {
    var subject_dom = api.dom.email_subject();

    return subject_dom.find('.hP')[0].innerText;
  }


  api.dom.email_body = function() {
    return $('.nH.hx');
  }


  api.check.is_inside_email = function() {
    return api.dom.email_contents().length > 0;
  }


  api.dom.email_contents = function() {
    var items = $('.ii.gt');
    var ids = [];

    for(var i=0; i<items.length; i++) {
      var mail_id = items[i].getAttribute('class').split(' ')[2];
      var is_editable = items[i].getAttribute('contenteditable');
      if(mail_id != 'undefined' && mail_id != undefined) {
        if(is_editable != 'true') {
          ids.push(items[i]);
        }
      }
    }

    return ids;
  }


  api.get.email_ids = function() {
    var items = api.dom.email_contents();
    var ids = [];

    for(var i=0; i<items.length; i++) {
      var mail_id = items[i].getAttribute('class').split(' ')[2];
      var is_editable = items[i].getAttribute('contenteditable');
      if(mail_id != 'undefined' && mail_id != undefined) {
        if(is_editable != 'true') {
          ids.push(mail_id);
        }
      }
    }

    return ids;
  }


  api.get.email_id = function() {
    var hash = null;

    if(api.check.is_inside_email()) {
      if(api.check.is_preview_pane()) {
        var text = api.get.email_ids();
        hash = text[0].substring(1, text[0].length);
      } else {
        hash = window.location.hash.split("/").pop().replace(/#/, '').split('?')[0];
      }

    }

    return hash;
  }


  api.check.is_priority_inbox = function() {
    return $('.qh').length > 0;
  }


  api.check.is_rapportive_installed = function() {
    return $('#rapportive-sidebar').length == 1;
  }


  api.check.is_streak_installed = function() {
    return $("[id^='bentoBox'],[id*=' bentoBox'],[class*=' bentoBox'],[class*='bentoBox']").length > 0;
  }


  api.check.is_anydo_installed = function() {
    return $("[id^='anydo'],[id*=' anydo'],[class*=' anydo'],[class*='anydo']").length > 0;
  }


  api.check.is_boomerang_installed = function() {
    return $("[id^='b4g_'],[id*=' b4g_'],[class*=' b4g_'],[class*='b4g_']").length > 0;
  }


  api.check.is_xobini_installed = function() {
    return $('#xobni_frame').length > 0;
  }


  api.check.is_signal_installed = function() {
    return $("[id^='Signal'],[id*=' Signal'],[class*=' signal'],[class*='signal']").length > 0;
  }


  api.dom.get_left_sidebar_links = function() {
    return $("div[role=navigation] [title]");
  }


  api.dom.search_bar = function() {
    return $("[gh=sb]");
  }


  api.get.search_query = function() {
    var dom = api.dom.search_bar();
    return dom.find('input')[0].value;
  }


  api.get.unread_inbox_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='Inbox']");

    if(dom.length > 0) {
      if(dom[0].innerText.indexOf('(') != -1) {
        return parseInt(dom[0].innerText.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_draft_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='Drafts']");

    if(dom.length > 0) {
      if(dom[0].innerText.indexOf('(') != -1) {
        return parseInt(dom[0].innerText.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_spam_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='Spam']");

    if(dom.length > 0) {
      if(dom[0].innerText.indexOf('(') != -1) {
        return parseInt(dom[0].innerText.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_forum_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='Forums']");

    if(dom.length > 0) {
      if(dom[0].innerText.indexOf('(') != -1) {
        return parseInt(dom[0].innerText.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_notification_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='Notifications']");

    if(dom.length > 0) {
      if(dom[0].innerText.indexOf('(') != -1) {
        return parseInt(dom[0].innerText.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_promotion_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='Promotions']");

    if(dom.length > 0) {
      if(dom[0].innerText.indexOf('(') != -1) {
        return parseInt(dom[0].innerText.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_social_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='Social Updates']");

    if(dom.length > 0) {
      if(dom[0].innerText.indexOf('(') != -1) {
        return parseInt(dom[0].innerText.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.beta = function() {
    var features = {
                    "new_nav_bar" : $('#gbz').length == 0
                   }

    return features;
  }


  api.get.unread_emails = function() {
    return { inbox         : api.get.unread_inbox_emails(),
             drafts        : api.get.unread_draft_emails(),
             spam          : api.get.unread_spam_emails(),
             forum         : api.get.unread_forum_emails(),
             notifications : api.get.unread_notification_emails(),
             promotions    : api.get.unread_promotion_emails(),
             social        : api.get.unread_social_emails() }
  }


  api.tools.parse_url = function(url) {
    var regex = /[?&]([^=#]+)=([^&#]*)/g;
    var params = {};
    var match;

    while (match = regex.exec(url)) {
      params[match[1]] = match[2];
    }

    return params;
  }


  api.tools.deparam = function (params, coerce) {

    var each = function (arr, fnc) {
      var data = [];
      for (i = 0; i < arr.length; i++) {
        data.push(fnc(arr[i]));
      }
      return data;
    };

    var isArray = Array.isArray || function(obj) {
      return Object.prototype.toString.call(obj) == '[object Array]';
    };

    var obj = {},
      coerce_types = {
        'true': !0,
        'false': !1,
        'null': null
      };
    each(params.replace(/\+/g, ' ').split('&'), function (v, j) {
      var param = v.split('='),
        key = decodeURIComponent(param[0]),
        val,
        cur = obj,
        i = 0,
        keys = key.split(']['),
        keys_last = keys.length - 1;
      if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
        keys[keys_last] = keys[keys_last].replace(/\]$/, '');
        keys = keys.shift().split('[').concat(keys);
        keys_last = keys.length - 1;
      } else {
        keys_last = 0;
      }
      if (param.length === 2) {
        val = decodeURIComponent(param[1]);
        if (coerce) {
          val = val && !isNaN(val) ? +val : val === 'undefined' ? undefined : coerce_types[val] !== undefined ? coerce_types[val] : val;
        }
        if (keys_last) {
          for (; i <= keys_last; i++) {
            key = keys[i] === '' ? cur.length : keys[i];
            cur = cur[key] = i < keys_last ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : []) : val;
          }
        } else {
          if (isArray(obj[key])) {
            obj[key].push(val);
          } else if (obj[key] !== undefined) {
            obj[key] = [obj[key], val];
          } else {
            obj[key] = val;
          }
        }
      } else if (key) {
        obj[key] = coerce ? undefined : '';
      }
    });
    return obj;
  }


  api.tools.parse_actions = function(params) {
    if(params.method == 'POST' && typeof params.url.act == 'string') {
      // console.log(params.url, params.body);
    }

    if(params.url.search != undefined) {
      // console.log(params.url, params.body, params.url_raw);
    }

    var action_map = {
                      'add_to_tasks'               : 'tae',
                      'archive'                    : 'rc_^i',
                      'delete'                     : 'tr',
                      'delete_forever'             : 'dl',
                      'delete_label'               : 'dc_',
                      'discard_draft'              : 'dd',
                      'expand_categories'          : 'el',
                      'filter_messages_like_these' : 'cffm',
                      'label'                      : 'arl',
                      'mark_as_important'          : 'mai',
                      'mark_as_not_important'      : 'mani',
                      'mark_as_not_spam'           : 'us',
                      'mark_as_spam'               : 'sp',
                      'move_label'                 : 'mt',
                      'move_to_inbox'              : 'ib',
                      'mute'                       : 'ig',
                      'read'                       : 'rd',
                      'save_draft'                 : 'sd',
                      'send_message'               : 'sm',
                      'show_newly_arrived_message' : 'mo',
                      'star'                       : 'st',
                      'unmute'                     : 'ug',
                      'unread'                     : 'ur',
                      'unstar'                     : 'xst',
                      'new_email'                  : 'new_mail',
                      'poll'                       : 'poll',
                      'refresh'                    : 'refresh',
                      'open_email'                 : 'open_email'
                     }

    if(typeof params.url.ik == 'string') {
      api.tracker.ik = params.url.ik;
    }

    if(typeof params.url.rid == 'string') {
      if(params.url.rid.indexOf("mail") != -1) {
        api.tracker.rid = params.url.rid;
      }
    }

    var action      = action_map[decodeURIComponent(params.url.act)];
    var sent_params = api.tools.deparam(params.body)
    var email_ids   = (typeof sent_params.t == 'string') ? [sent_params.t] : sent_params.t;
    var response    = null;

    switch(action) {
      case "ur" :
        var response = [email_ids, params.url, params.body];
        break;

      case "rd":
        var response = [email_ids, params.url, params.body];
        break;

      case "tr":
        var response = [email_ids, params.url, params.body];
        break;

      case "sp":
        var response = [email_ids, params.url, params.body];
        break;

      case "us":
        var response = [email_ids, params.url, params.body];
        break;

      case "arl":
        var response = [email_ids, params.url, params.body, params.url.acn];
        break;

      case "ib":
        var response = [email_ids, params.url, params.body];
        break;

      case "dl":
        var response = [email_ids, params.url, params.body];
        break;

      case "st":
        var response = [email_ids, params.url, params.body];
        break;

      case "xst":
        var response = [email_ids, params.url, params.body];
        break;

      case "mai":
        var response = [email_ids, params.url, params.body];
        break;

      case "mani":
        var response = [email_ids, params.url, params.body];
        break;

      case "ig":
        var response = [email_ids, params.url, params.body];
        break;

      case "ug":
        var response = [email_ids, params.url, params.body];
        break;

      case "sd":
        var response = [email_ids, params.url, sent_params];
        break;

      case "dd":
        var response = [email_ids, params.url, params.body];
        break;

      case "mt":
        var response = [email_ids, params.url, params.body];
        break;

      case "tae":
        var response = [params.url, params.body, sent_params];
        break;

      case "cffm":
        var response = [email_ids, params.url, params.body];
        break;

      case "rc_^i":
        var response = [email_ids, params.url, params.body];
        break;

      case "sm":
        var response = [params.url, params.body, sent_params];
        break;

      case "el":
        var response = [params.url, params.body, sent_params.ex == '1'];
        break;
    }

    if(typeof params.url._reqid == 'string' && typeof params.url.th == 'string') {
      var response = [params.url.th, params.url, params.body];
      if('new_email' in api.tracker.watchdog) {
        api.tracker.watchdog['new_email'].apply(undefined, response);
      }
    }

    if((params.url.view == 'cv' || params.url.view == 'ad') && typeof params.url.th == 'string' && typeof params.url.search == 'string') {
      var response = [params.url.th, params.url, params.body];
      if('open_email' in api.tracker.watchdog) {
        api.tracker.watchdog['open_email'].apply(undefined, response);
      }
    }

    if(typeof params.url.SID == 'string' && typeof params.url.zx == 'string' && params.body.indexOf('req0_') != -1) {
      api.tracker.SID = params.url.SID;
      var response = [params.url, params.body, sent_params];
      if('poll' in api.tracker.watchdog) {
        api.tracker.watchdog['poll'].apply(undefined, response);
      }
    }

    if(typeof params.url.ik == 'string' && typeof params.url.search == 'string' && params.body.length == 0 && typeof params.url._reqid == 'string') {
      var response = [params.url, params.body, sent_params];
      if('refresh' in api.tracker.watchdog) {
        api.tracker.watchdog['refresh'].apply(undefined, response);
      }
    }

    if(response != null) {
      if(action in api.tracker.watchdog) {
        api.tracker.watchdog[action].apply(undefined, response);
      }
    }

  }

  api.tools.parse_requests = function(params) {
    params.url_raw = params.url;
    params.url = api.tools.parse_url(params.url);

    if(typeof api.tracker.events != 'object' && typeof api.tracker.actions != 'object') {
      api.tracker.events  = [];
      api.tracker.actions = [];
    }

    api.tracker.events.unshift(params);
    api.tools.parse_actions(params);

    if(params.method == 'POST' && typeof params.url.act == 'string') {
      api.tracker.actions.unshift(params);
    }

    if(api.tracker.events.length > 50) {
      api.tracker.events.pop();
    }

    if(api.tracker.actions.length > 10) {
      api.tracker.actions.pop();
    }
  }


  api.tools.xhr_watcher = function () {
    var self = this;

    if (!api.tracker.xhr_init) {
      var win = top.document.getElementById("js_frame").contentDocument.defaultView;

      api.tracker.xhr_init = true;
      api.tracker.xhr_open = win.XMLHttpRequest.prototype.open;
      api.tracker.xhr_send = win.XMLHttpRequest.prototype.send;

      win.XMLHttpRequest.prototype._gjs_open = win.XMLHttpRequest.prototype.open;
      win.XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        var out = this._gjs_open.apply(this, arguments);
        this.xhrParams = {
          method: method.toString(),
          url: url.toString()
        };
        return out;
      };

      win.XMLHttpRequest.prototype._gjs_send = win.XMLHttpRequest.prototype.send;
      win.XMLHttpRequest.prototype.send = function (body) {
        var out = this._gjs_send.apply(this, arguments);
        if (this.xhrParams) {
          this.xhrParams.body = body;
          api.tools.parse_requests(this.xhrParams);
        }

        return out;
      }
    }
  }


  api.observe.http_requests = function() {
    return api.tracker.events;
  }


  api.observe.actions = function() {
    return api.tracker.actions;
  }


  api.observe.on = function(action, callback) {
    if(typeof api.tracker.watchdog != "object") {
      api.tracker.watchdog = {};
    }

    if(!api.tracker.xhr_init) {
      api.tools.xhr_watcher();
    }

    api.tracker.watchdog[action] = callback;
  }


  api.observe.off = function(action) {
    if(action) {
      if(action in self.tracker.watchdog) {
        delete self.tracker.watchdog[action];
      }
    } else {
      var win = top.document.getElementById("js_frame").contentDocument.defaultView;
      win.XMLHttpRequest.prototype.open = api.tracker.xhr_open;
      win.XMLHttpRequest.prototype.send = api.tracker.xhr_send;
      api.tracker.xhr_init = false
    }
  }


  api.tools.make_request = function (link, method) {

    var method  = (typeof method == undefined || typeof method == null) ? 'GET' : method;
    var request = $.ajax({ type: method, url: encodeURI(link), async:false });

    return request.responseText;
  }


  api.tools.parse_view_data = function(view_data) {
    var parsed = [];
    var data = [];

    for(var j=0; j < view_data.length; j++) {
      if(view_data[j][0] == 'tb') {
        for(var k=0; k < view_data[j][2].length; k++) {
          data.push(view_data[j][2][k]);
        }
      }
    }

    for(var i=0; i < data.length; i++) {
      var x = data[i];
      var temp = {};

      parsed.push({
        id: x[0],
        title : x[9],
        excerpt : x[10],
        time : x[15],
        sender : x[28],
        attachment : x[13],
        labels: x[5]
      });
    }

    return parsed;
  }


  api.get.visible_emails = function() {
    var page = api.get.current_page();
    var url = window.location.origin + window.location.pathname + '?ui=2&ik=' + api.tracker.ik+'&rid=' + api.tracker.rid + '&view=tl&start=0&num=120&rt=1';

    if(page.indexOf('label/') == 0) {
      url += '&cat=' + page.split('/')[1] +'&search=cat';
    } else if(page.indexOf('category/') == 0) {
      if(page.indexOf('forums') != -1) {
        cat_label = 'group';
      } else if(page.indexOf('updates') != -1) {
        cat_label = 'notification';
      } else if(page.indexOf('promotion') != -1) {
        cat_label = 'promo';
      } else if(page.indexOf('social') != -1) {
        cat_label = 'social';
      }
      url += '&cat=^smartlabel_' + cat_label +'&search=category';
    } else if(page.indexOf('search/') == 0) {
      url += '&qs=true&q=' + page.split('/')[1] +'&search=query';
    } else {
      url += '&search=' + page;
    }

    var get_data = api.tools.make_request(url);
        get_data = get_data.substring(get_data.indexOf('['), get_data.length);
        get_data = 'api.tracker.view_data = ' + get_data;

    eval(get_data)

    var emails = [];

    for(i in api.tracker.view_data) {
      var cdata = api.tools.parse_view_data(api.tracker.view_data[i]);
      if(cdata.length > 0) {
        $.merge(emails, cdata);
      }
    }

    return emails;
  }


  api.get.current_page = function() {
    var hash  = window.location.hash.split('#').pop();
    var pages = ['sent', 'inbox', 'starred', 'drafts', 'imp', 'chats', 'all', 'spam', 'trash'];

    var page = null;

    if($.inArray(hash, pages) > -1) {
      page = hash;
    }

    if(hash.indexOf('label/') == 0 || hash.indexOf('category/') == 0 || hash.indexOf('search/') == 0) {
      page = hash;
    }

    return page;
  }


  api.tools.parse_email_data = function(email_data) {
    var data = {};
    var threads = {}

    for(i in email_data) {
      var x = email_data[i];
      if(x[0] == 'cs') {
        data.first_email = x[1];
        data.last_email = x[2];
        data.total_emails = x[3];
        data.total_threads = x[8];
        data.people_involved = x[15];
        data.subject = x[23];
      }

      if(x[0] == 'ms') {
        if(data.threads == undefined) {
          data.threads = {};
        }

        data.threads[x[1]] = {};
        data.threads[x[1]].reply_to_id = x[2];
        data.threads[x[1]].from = x[5];
        data.threads[x[1]].from_email = x[6];
        data.threads[x[1]].timestamp = x[7];
        data.threads[x[1]].datetime = x[24];
        data.threads[x[1]].content_plain = x[8];
        data.threads[x[1]].subject = x[12];
        data.threads[x[1]].content_html = (x[13] != undefined) ? x[13][6] : x[8];
      }
    }

    return data;
  }


  api.get.email_data = function() {
    if(api.check.is_inside_email()) {
      var url = window.location.origin + window.location.pathname + '?ui=2&ik=' + api.tracker.ik + '&rid=' + api.tracker.rid + '&view=cv&th=' + api.get.email_id() + '&msgs=&mb=0&rt=1&search=inbox';
      var get_data = api.tools.make_request(url);
          get_data = get_data.substring(get_data.indexOf('['), get_data.length);
          get_data = 'var cdata = ' + get_data;

      eval(get_data);

      api.tracker.email_data = cdata[0];

      return api.tools.parse_email_data(api.tracker.email_data);
    }

    return {};
  }


  return api;
}

///////////////////////////////////////////
// gmail.js
// Kartik Talwar
// https://github.com/KartikTalwar/gmail.js
//

var Gmail = function(localJQuery) {

  /*
    Use the provided 'jQuery' if possible, in order to avoid conflicts with
    other extensions that use $ for other purposes.
  */
  var $;
  if (typeof localJQuery !== "undefined") {
    $ = localJQuery;
  } else if (typeof jQuery !== "undefined") {
    $ = jQuery;
  }
  // else leave $ undefined, which may be fine for some purposes.

  var api = {
              get : {},
              observe : {},
              check : {},
              tools : {},
              tracker : {},
              dom : {},
              chat : {},
              compose : {},
              helper : {get: {}}
            };

  api.version           = "0.4";
  api.tracker.globals   = typeof GLOBALS !== 'undefined' ? GLOBALS : ( typeof window.opener.GLOBALS !== 'undefined' ? window.opener.GLOBALS : [] );
  api.tracker.view_data = typeof VIEW_DATA !== 'undefined' ? VIEW_DATA : ( typeof window.opener != 'undefined' && window.opener != null && typeof window.opener.VIEW_DATA !== 'undefined' ? window.opener.VIEW_DATA : [] );
  api.tracker.ik        = api.tracker.globals[9] || "";
  api.tracker.hangouts  = undefined;


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
    var i, j, data;
    var users = [];

    var globals17 = api.tracker.globals[17];
    for (i in globals17) {
      // at least for the delegated inboxes, the index of the mla is not stable
      // it was observed to be somewhere between 22 and 24, but we should not depend on it
      data = globals17[i];

      if (data[0] === 'mla') {
        for(j in data[1]) {
          users.push({
            name : data[1][j][4],
            email : data[1][j][0],
            index: data[1][j][3]
          });
        }

        return users;
      }
    }

    return users;
  }


  api.get.user_email = function() {
    return api.tracker.globals[10];
  };


  api.get.manager_email = function() {
    if (api.helper.get.is_delegated_inbox()) {
      return api.get.delegated_to_email();
    }

    return api.get.user_email();
  };


  api.get.delegated_to_email = function() {
    if (!api.helper.get.is_delegated_inbox()) {
      return null;
    }

    var i, account;
    var userIndexPrefix = "/u/";
    var pathname = window.location.pathname;
    var delegatedToUserIndex = parseInt(pathname.substring(pathname.indexOf(userIndexPrefix) + userIndexPrefix.length), 10);

    var loggedInAccounts = api.get.loggedin_accounts();
    if (loggedInAccounts && loggedInAccounts.length > 0) {
      for (i in loggedInAccounts) {
        account = loggedInAccounts[i];
        if (account.index === delegatedToUserIndex) {
          return account.email;
        }
      }
    }

    // as a last resort, we query the DOM of the upper right account selection menu
    return $(".gb_rb[href$='" + userIndexPrefix + delegatedToUserIndex + "'] .gb_yb").text().split(" ")[0];
  };


  api.get.localization = function() {
    var isLocale = function(locale) {
      // A locale is a string that begins with 2 letters, lowercase.
      // The 'lowercase' check distinguishes locales from other 2-letter strings like 'US'
      // (the user's location?).
      if (!locale || ((typeof locale) !== 'string') || locale.length < 2) {
        return false;
      }

      var localePrefix = locale.slice(0, 2);
      return localePrefix.toLowerCase() === localePrefix;
    };

    var globals = api.tracker.globals;

    // First candidate.
    var locale = globals[17] && globals[17][8] && globals[17][8][8];
    if (isLocale(locale)) {
      return locale;
    }

    // Second candidate.
    locale = globals[17] && globals[17][9] && globals[17][9][8];
    if (isLocale(locale)) {
      return locale;
    }

    return null;
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
    var boxes = dom.find("[gh=tl]");

    var previewPaneFound = false;
    boxes.each(function() {
      if($(this).hasClass('aia')) {
        previewPaneFound = true;
      }
    });

    return previewPaneFound;
  }

  api.check.is_multiple_inbox = function() {
    var dom = api.dom.inboxes();
    return dom.length > 1;
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

  api.check.should_compose_fullscreen = function(){
    var bx_scfs = [];
    try {
      bx_scfs = api.tracker.globals[17][4][1][32];
    } catch(er) {
      bx_scfs = ['bx_scfs','false'];
    }
     return (bx_scfs[1] == 'true' ) ? true : false;
  }


  api.check.is_google_apps_user =function() {
    var email = api.get.user_email();
    return email.indexOf('gmail.com', email.length - 'gmail.com'.length) == -1;
  }


  api.get.storage_info = function() {
    var div = $('.md.mj').find('div')[0];
    var used = $(div).find('span')[0].text;
    var total = $(div).find('span')[1].text;
    var percent = parseFloat(used.replace(/[^0-9\.]/g, '')) * 100 / parseFloat(total.replace(/[^0-9\.]/g, ''));

    return {used : used, total : total, percent : Math.floor(percent)}
  }


  api.dom.inboxes = function() {
    var dom = api.dom.inbox_content();
    return dom.find("[gh=tl]");
  }

  api.dom.email_subject = function () {
    var e = $(".hP");

    for(var i=0; i<e.length; i++) {
      if($(e[i]).is(':visible')) {
        return $(e[i]);
      }
    };

    return $();
  }


  api.get.email_subject = function() {
    var subject_dom = api.dom.email_subject();

    return subject_dom.text();
  }


  api.dom.email_body = function() {
    return $('.nH.hx');
  }

  api.dom.toolbar = function() {
    var tb = $("[gh='mtb']");

    while($(tb).children().length == 1){
      tb = $(tb).children().first();
    }

    return tb;
}


  api.check.is_inside_email = function() {
    if(api.get.current_page() != 'email' && !api.check.is_preview_pane()) {
      return false;
    }

    var items = $('.ii.gt');
    var ids = [];

    for(var i=0; i<items.length; i++) {
      var mail_id = items[i].getAttribute('class').split(' ')[2];
      if(mail_id != 'undefined' && mail_id != undefined) {
        if($(items[i]).is(':visible')) {
          ids.push(items[i]);
        }
      }
    }

    return ids.length > 0;
  }

  api.check.is_plain_text = function() {
    var settings = GLOBALS[17][4][1];

    for (var i = 0; i < settings.length; i++) {
      var plain_text_setting = settings[i];
      if (plain_text_setting[0] === 'bx_cm') {
        return plain_text_setting[1] === '0';
      }
    }

    // default to rich text mode, which is more common nowadays
    return false;
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
    if(api.check.is_inside_email()) {
      var data = api.get.email_data();
      return Object.keys(data.threads);
    }
    return [];
  }


  api.get.compose_ids = function() {
      var ret = [];
      var dom = $(".AD [name=draft]");
      for(var i = 0; i < dom.length; i++) {
          if(dom[i].value != "undefined"){
              ret.push(dom[i].value);
          }
      };
      return ret;
  }


  api.get.email_id = function() {
    var hash = null;

    if(api.check.is_inside_email()) {
      if(api.check.is_preview_pane()) {
        var items = api.dom.email_contents();
        var text = [];

        for(var i=0; i<items.length; i++) {
          var mail_id = items[i].getAttribute('class').split(' ')[2];
          var is_editable = items[i].getAttribute('contenteditable');
          var is_visible = items[i].offsetWidth > 0 && items[i].offsetHeight > 0;
          if(mail_id != 'undefined' && mail_id != undefined && is_visible) {
            if(is_editable != 'true') {
              text.push(mail_id);
            }
          }
        }

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


  api.check.is_xobni_installed = function() {
    return $('#xobni_frame').length > 0;
  }


  api.check.is_signal_installed = function() {
    return $("[id^='Signal'],[id*=' Signal'],[class*=' signal'],[class*='signal']").length > 0;
  }


  api.check.are_shortcuts_enabled = function() {
    var flag_name = 'bx_hs';
    var flag_value = undefined;

    var check = true; // Flag possibly missing in convo view.

    var array_with_flag = api.tracker.globals[17][4][1];

    for(var i=0; i<array_with_flag.length; i++) {
      var current = array_with_flag[i];

      if(current[0] === flag_name) {
        flag_value = current[1];
        break;
      }
    }

    if(flag_value !== undefined) {
      var values = {
        '0': true,
        '1': false
      }

      check = values[flag_value];
    }

    return check;
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
    var dom = $("div[role=navigation]").find("[title*='" + api.tools.i18n('inbox') + "']");

    if(dom.length > 0) {
      if(dom[0].text.indexOf('(') != -1) {
        return parseInt(dom[0].text.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_draft_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='" + api.tools.i18n('drafts') + "']");

    if(dom.length > 0) {
      if(dom[0].text.indexOf('(') != -1) {
        return parseInt(dom[0].text.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_spam_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='" + api.tools.i18n('spam') + "']");

    if(dom.length > 0) {
      if(dom[0].text.indexOf('(') != -1) {
        return parseInt(dom[0].text.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_forum_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='" + api.tools.i18n('forums') + "']");

    if(dom.length > 0) {
      if(dom[0].text.indexOf('(') != -1) {
        return parseInt(dom[0].text.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_update_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='" + api.tools.i18n('updates') + "']");

    if(dom.length > 0) {
      if(dom[0].text.indexOf('(') != -1) {
        return parseInt(dom[0].text.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_promotion_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='" + api.tools.i18n('promotions') + "']");

    if(dom.length > 0) {
      if(dom[0].text.indexOf('(') != -1) {
        return parseInt(dom[0].text.replace(/[^0-9]/g, ''));
      }
    }

    return 0;
  }


  api.get.unread_social_emails = function() {
    var dom = $("div[role=navigation]").find("[title*='" + api.tools.i18n('social_updates') + "']");

    if(dom.length > 0) {
      if(dom[0].text.indexOf('(') != -1) {
        return parseInt(dom[0].text.replace(/[^0-9]/g, ''));
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
             update        : api.get.unread_update_emails(),
             promotions    : api.get.unread_promotion_emails(),
             social        : api.get.unread_social_emails() }
  }


  api.tools.error = function(str) {
    if (console) {
      console.error(str);
    } else {
      throw(str);
    }
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

  api.tools.sleep = function(milliseconds) {
    var start = new Date().getTime();
    while(true) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }


  api.tools.multitry = function(delay, tries, func, check, counter, retval) {
    if(counter != undefined && counter >= tries) {
      return retval;
    }

    var counter = (counter == undefined) ? 0 : counter;
    var value = func();

    if(check(value)) {
      return value;
    } else {
      api.tools.sleep(delay)
      api.tools.multitry(delay, tries, func, check, counter+1, value)
    }
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

  api.tools.parse_actions = function(params, xhr) {

    // upload_attachment event - if found, don't check other observers. See issue #22
    if(params.url.act == 'fup' || params.url.act == 'fuv' || params.body_is_object) {
      return params.body_is_object && api.observe.bound('upload_attachment') ? { upload_attachment: [ params.body_params ] } : false; // trigger attachment event
    }

    if(params.url.search != undefined) {
      // console.log(params.url, params.body, params.url_raw);
    }

    var triggered = {}; // store an object of event_name: [response_args] for events triggered by parsing the actions
    var action_map = {
                      'tae'         : 'add_to_tasks',
                      'rc_^i'       : 'archive',
                      'tr'          : 'delete',
                      'dm'          : 'delete_message_in_thread',
                      'dl'          : 'delete_forever',
                      'dc_'         : 'delete_label',
                      'dr'          : 'discard_draft',
                      'el'          : 'expand_categories',
                      'cffm'        : 'filter_messages_like_these',
                      'arl'         : 'label',
                      'mai'         : 'mark_as_important',
                      'mani'        : 'mark_as_not_important',
                      'us'          : 'mark_as_not_spam',
                      'sp'          : 'mark_as_spam',
                      'mt'          : 'move_label',
                      'ib'          : 'move_to_inbox',
                      'ig'          : 'mute',
                      'rd'          : 'read',
                      'sd'          : 'save_draft',
                      'sm'          : 'send_message',
                      'mo'          : 'show_newly_arrived_message',
                      'st'          : 'star',
                      'ug'          : 'unmute',
                      'ur'          : 'unread',
                      'xst'         : 'unstar',
                      'new_mail'    : 'new_email',
                      'poll'        : 'poll',
                      'refresh'     : 'refresh',
                      'rtr'         : 'restore_message_in_thread',
                      'open_email'  : 'open_email',
                      'toggle_threads'  : 'toggle_threads'
                     }

    if(typeof params.url.ik == 'string') {
      api.tracker.ik = params.url.ik;
    }

    if(typeof params.url.rid == 'string') {
      if(params.url.rid.indexOf("mail") != -1) {
        api.tracker.rid = params.url.rid;
      }
    }

    var action      = decodeURIComponent(params.url.act);
    var sent_params = params.body_params;
    var email_ids   = (typeof sent_params.t == 'string') ? [sent_params.t] : sent_params.t;
    var response    = null;

    switch(action) {
      case "ur":
      case "rd":
      case "tr":
      case "sp":
      case "us":
      case "ib":
      case "dl":
      case "st":
      case "xst":
      case "mai":
      case "mani":
      case "ig":
      case "ug":
      case "dr":
      case "mt":
      case "cffm":
      case "rc_^i":
        response = [email_ids, params.url, params.body];
        break;

      case "arl":
        response = [email_ids, params.url, params.body, params.url.acn];
        break;

      case "sd":
        response = [email_ids, params.url, sent_params];
        break;

      case "tae":
      case "sm":
        response = [params.url, params.body, sent_params];
        break;

      case "el":
        response = [params.url, params.body, sent_params.ex == '1'];
        break;

      case "dm":
      case "rtr":
      case "mo":
        response = [sent_params.m, params.url, params.body];
        break;

    }

    if(typeof params.url._reqid == 'string' && params.url.view === 'tl' && params.url.auto != undefined) {
      response = [params.url.th, params.url, params.body];
      if(api.observe.bound('new_email')) {
        triggered.new_email = response;
      }
    }

    if((params.url.view == 'cv' || params.url.view == 'ad') && typeof params.url.th == 'string' && typeof params.url.search == 'string' && params.url.rid == undefined) {
      response = [params.url.th, params.url, params.body];
      if(api.observe.bound('open_email')) {
        triggered.open_email = response;
      }
    }

    if((params.url.view == 'cv' || params.url.view == 'ad') && typeof params.url.th == 'object' && typeof params.url.search == 'string' && params.url.rid != undefined) {
      response = [params.url.th, params.url, params.body];
      if(api.observe.bound('toggle_threads')) {
        triggered.toggle_threads = response;
      }
    }

    if((params.url.view == 'cv' || params.url.view == 'ad') && typeof params.url.th == 'string' && typeof params.url.search == 'string' && params.url.rid != undefined) {
      if(params.url.msgs != undefined) {
        response = [params.url.th, params.url, params.body];
        if(api.observe.bound('toggle_threads')) {
          triggered.toggle_threads = response;
        }
      }
    }

    if(typeof params.url.SID == 'string' && typeof params.url.zx == 'string' && params.body.indexOf('req0_') != -1) {
      api.tracker.SID = params.url.SID;
      response = [params.url, params.body, sent_params];
      if(api.observe.bound('poll')) {
        triggered.poll = response;
      }
    }

    if(typeof params.url.ik == 'string' && typeof params.url.search == 'string' && params.body.length == 0 && typeof params.url._reqid == 'string') {
      response = [params.url, params.body, sent_params];
      if(api.observe.bound('refresh')) {
        triggered.refresh = response;
      }
    }

    if(response && action_map[action] && api.observe.bound(action_map[action])) {
      triggered[action_map[action]] = response;
    }

    if(params.method == 'POST' && (typeof params.url.SID == 'string'
                                   || typeof params.url.ik == 'string'
                                   || typeof params.url.act == 'string')) {
      triggered.http_event = [params]; // send every event and all data
    }

    return triggered;
  }

  api.tools.parse_response = function(response) {
      var parsedResponse = [],
          data, dataLength, endIndex, realData;

      try {

        // gmail post response structure
        // )}]'\n<datalength><rawData>\n<dataLength><rawData>...

        // prepare response, remove eval protectors
        response = response.replace(/\n/g, ' ');
        response = response.substring(response.indexOf("'") + 1, response.length);

        while(response.replace(/\s/g, '').length > 1) {

          // how long is the data to get
          dataLength = response.substring(0, response.indexOf('[')).replace(/\s/g, '');
          if (!dataLength) {dataLength = response.length;}

          endIndex = (parseInt(dataLength, 10) - 2) + response.indexOf('[');
          data = response.substring(response.indexOf('['), endIndex);

          var get_data = new Function('"use strict"; return ' + data);
          realData = get_data();

          parsedResponse.push(realData);

          // prepare response for next loop
          response = response.substring(response.indexOf('['), response.length);
          response = response.substring(data.length, response.length);
        }
      } catch (e) {
          console.log('Gmail post response parsing failed.', e);
      }

      return parsedResponse;
  }

  api.tools.parse_requests = function(params, xhr) {
    params.url_raw = params.url;
    params.url = api.tools.parse_url(params.url);
    if(typeof params.body == 'object') {
      params.body_params = params.body;
      params.body_is_object = true;
    } else {
      params.body_params = api.tools.deparam(params.body);
    }

    if(typeof api.tracker.events != 'object' && typeof api.tracker.actions != 'object') {
      api.tracker.events  = [];
      api.tracker.actions = [];
    }

    api.tracker.events.unshift(params);
    var events = api.tools.parse_actions(params, xhr);

    if(params.method == 'POST' && typeof params.url.act == 'string') {
      api.tracker.actions.unshift(params);
    }

    if(api.tracker.events.length > 50) {
      api.tracker.events.pop();
    }

    if(api.tracker.actions.length > 10) {
      api.tracker.actions.pop();
    }
    return events;
  }


  api.tools.xhr_watcher = function () {
    if (!api.tracker.xhr_init) {
      var win = top.document.getElementById("js_frame") ? top.document.getElementById("js_frame").contentDocument.defaultView : window.opener.top.document.getElementById("js_frame").contentDocument.defaultView;

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

        // parse the xhr request to determine if any events should be triggered
        var events = false;
        if (this.xhrParams) {
          this.xhrParams.body = body;
          events = api.tools.parse_requests(this.xhrParams, this);
        }

        // fire before events
        if(api.observe.trigger('before', events, this)) {

          // if before events were fired, rebuild arguments[0]/body strings
          // TODO: recreate the url if we want to support manipulating url args (is there a use case where this would be needed?)
          body = arguments[0] = this.xhrParams.body_is_object ? this.xhrParams.body_params : $.param(this.xhrParams.body_params,true).replace(/\+/g, "%20");
        }

        // if any matching after events, bind onreadystatechange callback
        if(api.observe.bound(events,'after')) {
          var curr_onreadystatechange = this.onreadystatechange;
          var xhr = this;
          this.onreadystatechange = function(progress) {
            if (this.readyState === this.DONE) {
              xhr.xhrResponse = api.tools.parse_response(progress.target.responseText);
              api.observe.trigger('after', events, xhr);
            }
            if (curr_onreadystatechange) {
              curr_onreadystatechange.apply(this, arguments);
            }
          }
        }

        // send the original request
        var out = this._gjs_send.apply(this, arguments);

        // fire on events
        api.observe.trigger('on', events, this);
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

  /**
    Bind a specified callback to an array of callbacks against a specified type & action
   */
  api.observe.bind = function(type, action, callback) {

    // set up watchdog data structure
    if(typeof api.tracker.watchdog != "object") {
      api.tracker.watchdog = {
        before: {},
        on: {},
        after: {},
        dom: {}
      };
      api.tracker.bound = {};
    }
    if(typeof api.tracker.watchdog[type] != "object") {
      api.tools.error('api.observe.bind called with invalid type: ' + type);
    }

    // ensure we are watching xhr requests
    if(type != 'dom' && !api.tracker.xhr_init) {
      api.tools.xhr_watcher();
    }

    // add callback to an array in the watchdog
    if(typeof api.tracker.watchdog[type][action] != 'object') {
      api.tracker.watchdog[type][action] = [];
    }
    api.tracker.watchdog[type][action].push(callback);

    // allow checking for bound events to specific action/type as efficiently as possible (without in looping) - bit dirtier code,
    // but lookups (api.observer.bound) are executed by the hundreds & I think the extra efficiency is worth the tradeoff
    api.tracker.bound[action] = typeof api.tracker.bound[action] == 'undefined' ? 1 : api.tracker.bound[action]+1;
    api.tracker.bound[type] = typeof api.tracker.bound[type] == 'undefined' ? 1 : api.tracker.bound[type]+1;
    //api.tracker.watchdog[action] = callback;
  }

  /**
    an on event is observed just after gmail sends an xhr request
   */
  api.observe.on = function(action, callback, response_callback) {

    // check for DOM observer actions, and if none found, the assume an XHR observer
    if(api.observe.on_dom(action, callback)) return true;

    // bind xhr observers
    api.observe.bind('on', action, callback);
    if (response_callback) {
      api.observe.after(action, callback);
    }
  }

  /**
    an before event is observed just prior to the gmail xhr request being sent
    before events have the ability to modify the xhr request before it is sent
   */
  api.observe.before = function(action, callback) {
    api.observe.bind('before', action, callback);
  }

  /**
    an after event is observed when the gmail xhr request returns from the server
    with the server response
   */
  api.observe.after = function(action, callback) {
    api.observe.bind('after', action, callback);
  }

  /**
    Checks if a specified action & type has anything bound to it
    If type is null, will check for this action bound on any type
    If action is null, will check for any actions bound to a type
   */
  api.observe.bound = function(action, type) {
    if (typeof api.tracker.watchdog != "object") return false;
    if (action) {

      // if an object of actions (triggered events of format { event: [response] }) is passed, check if any of these are bound
      if(typeof action == 'object') {
        var match = false;
        $.each(action,function(key,response){
          if(typeof api.tracker.watchdog[type][key] == "object") match = true;
        });
        return match;
      }
      if(type) return typeof api.tracker.watchdog[type][action] == "object";
      return api.tracker.bound[action] > 0;
    } else {
      if(type) return api.tracker.bound[type] > 0;
      api.tools.error('api.observe.bound called with invalid args');
    }
  }

  /**
    Clear all callbacks for a specific type (before, on, after, dom) and action
    If action is null, all actions will be cleared
    If type is null, all types will be cleared
   */
  api.observe.off = function(action, type) {

    // if watchdog is not set, bind has not yet been called so nothing to turn off
    if(typeof api.tracker.watchdog != "object") return true;

    // if clearing everything, stop watching xhr
    if(!type && !action) {
      var win = top.document.getElementById("js_frame").contentDocument.defaultView;
      win.XMLHttpRequest.prototype.open = api.tracker.xhr_open;
      win.XMLHttpRequest.prototype.send = api.tracker.xhr_send;
      api.tracker.xhr_init = false
    }

    // loop through applicable types
    var types = type ? [ type ] : [ 'before', 'on', 'after', 'dom' ];
    $.each(types, function(idx, type) {
      if(typeof api.tracker.watchdog[type] != 'object') return true; // no callbacks for this type

      // if action specified, remove any callbacks for this action, otherwise remove all callbacks for all actions
      if(action) {
        if(typeof api.tracker.watchdog[type][action] == 'object') {
          api.tracker.bound[action] -= api.tracker.watchdog[type][action].length;
          api.tracker.bound[type] -= api.tracker.watchdog[type][action].length;
          delete api.tracker.watchdog[type][action];
        }
      } else {
        $.each(api.tracker.watchdog[type], function(act,callbacks) {
          if(typeof api.tracker.watchdog[type][act] == 'object') {
            api.tracker.bound[act] -= api.tracker.watchdog[type][act].length;
            api.tracker.bound[type] -= api.tracker.watchdog[type][act].length;
            delete api.tracker.watchdog[type][act];
          }
        });
      }
    });
  }

  /**
    Trigger any specified events bound to the passed type
    Returns true or false depending if any events were fired
   */
  api.observe.trigger = function(type, events, xhr) {
    if(!events) return false;
    var fired = false;
    $.each(events, function(action,response) {

      // we have to do this here each time to keep backwards compatibility with old response_callback implementation
      response = $.extend([], response); // break the reference so it doesn't keep growing each trigger
      if(type == 'after') response.push(xhr.xhrResponse); // backwards compat for after events requires we push onreadystatechange parsed response first
      response.push(xhr);
      if(api.observe.bound(action, type)) {
        fired = true;
        $.each(api.tracker.watchdog[type][action], function(idx, callback) {
          callback.apply(undefined, response);
        });
      }
    });
    return fired;
  }

  /**
    Trigger any specified DOM events passing a specified element & optional handler
   */
  api.observe.trigger_dom = function(observer, element, handler) {

    // if no defined handler, just call the callback
    if (!handler) {
      handler = function(match, callback) {
        callback(match)
      };
    }
    if (!api.tracker.watchdog.dom[observer]) {
      return;
    }
    $.each(api.tracker.watchdog.dom[observer], function(idx, callback) {
      handler(element, callback);
    });
  }

  // pre-configured DOM observers
  // map observers to DOM class names
  // as elements are inserted into the DOM, these classes will be checked for and mapped events triggered,
  // receiving 'e' event object, and a jquery bound inserted DOM element
  // NOTE: supported observers and sub_observers must be registered in the supported_observers array as well as the dom_observers config
  // Config example: event_name: {
  //                   class: 'className', // required - check for this className in the inserted DOM element
  //                   selector: 'div.className#myId', // if you need to match more than just the className of a specific element to indicate a match, you can use this selector for further checking (uses element.is(selector) on matched element). E.g. if there are multiple elements with a class indicating an observer should fire, but you only want it to fire on a specific id, then you would use this
  //                   sub_selector: 'div.className', // if specified, we do a jquery element.find for the passed selector on the inserted element and ensure we can find a match
  //                   handler: function( matchElement, callback ) {}, // if specified this handler is called if a match is found. Otherwise default calls the callback & passes the jQuery matchElement
  //                   sub_observers: { }, // hash of event_name: config_hash's - config hash supports all properties of this config hash. Observer will be bound as DOMNodeInserted to the matching class+sub_selector element.
  //                 },
  // TODO: current limitation allows only 1 action per watched className (i.e. each watched class must be
  //       unique). If this functionality is needed this can be worked around by pushing actions to an array
  //       in api.tracker.dom_observer_map below
  // console.log( 'Observer set for', action, callback);
  api.observe.initialize_dom_observers = function() {
    api.tracker.dom_observer_init = true;
    api.tracker.supported_observers = ['view_thread', 'view_email', 'load_email_menu', 'recipient_change', 'compose'];
    api.tracker.dom_observers = {

      // when a thread is clicked on in a mailbox for viewing - note: this should fire at a similar time (directly after) as the open_email XHR observer
      // which is triggered by the XHR request rather than nodes being inserted into the DOM (and thus returns different information)
      'view_thread': {
        class: ['Bu', 'nH'], // class depends if is_preview_pane - Bu for preview pane, nH for standard view
        sub_selector: 'div.if',
        handler: function(match, callback) {
          match = new api.dom.thread(match);
          callback(match);

          // look for any email elements in this thread that are currently displaying
          // and fire off any view_email sub_observers for each of them
          var email = match.dom('opened_email');
          if (email.length) {
            api.observe.trigger_dom('view_email', email, api.tracker.dom_observers.view_thread.sub_observers.view_email.handler);
          }
        },
        sub_observers: {

          // when an individual email is loaded within a thread (also fires when thread loads displaying the latest email)
          'view_email': {
            class: '',
            sub_selector: 'div.adn',
            handler: function(match, callback) {
              match = new api.dom.email(match);
              callback(match);
            }
          },

          // when the dropdown menu next to the reply button is inserted into the DOM when viewing an email
          'load_email_menu': {
              class: 'J-N',
              selector: 'div[role=menu] div[role=menuitem]:first-child', // use the first menu item in the popoup as the indicator to trigger this observer
              handler: function(match, callback) {
                match = match.closest('div[role=menu]');
                callback(match);
              }
          }
        }
      },

      // a new email address is added to any of the to,cc,bcc fields when composing a new email or replying/forwarding
      'recipient_change': {
        class: 'vR',
        handler: function(match, callback) {
          // console.log('compose:recipient handler called',match,callback);

          // we need to small delay on the execution of the handler as when the recipients field initialises on a reply (or reinstated compose/draft)
          // then multiple DOM elements will be inserted for each recipient causing this handler to execute multiple times
          // in reality we only want a single callback, so give other nodes time to be inserted & then only execute the callback once
          if(typeof api.tracker.recipient_matches != 'object') {
            api.tracker.recipient_matches = [];
          }
          api.tracker.recipient_matches.push(match);
          setTimeout(function(){
            // console.log('recipient timeout handler', api.tracker.recipient_matches.length);
            if(!api.tracker.recipient_matches.length) return;

            // determine an array of all emails specified for To, CC and BCC and extract addresses into an object for the callback
            var compose = new api.dom.compose(api.tracker.recipient_matches[0].closest('div.M9'));
            var recipients = compose.recipients();
            callback(compose, recipients, api.tracker.recipient_matches);

            // reset matches so no future delayed instances of this function execute
            api.tracker.recipient_matches = [];
          },100);
        }
      },

      // this will fire if a new compose, reply or forward is created. it won't fire if a reply changes to a forward & vice versa
      // passes a type of compose, reply, or forward to the callback
      'compose': {
        class: 'An', // M9 would be better but this isn't set at the point of insertion
        handler: function(match, callback) {
          // console.log('reply_forward handler called', match, callback);

          // look back up the DOM tree for M9 (the main reply/forward node)
          match = match.closest('div.M9');
          if (!match.length) return;
          match = new api.dom.compose(match);
          var type;
          if (match.is_inline()) {
            type = match.find('input[name=subject]').val().indexOf('Fw') == 0 ? 'forward' : 'reply';
          } else {
            type = 'compose';
          }
          callback(match,type);
        }
      }
    };

    // support extending with custom observers
    if (api.tracker.custom_supported_observers) {
      $.merge(api.tracker.supported_observers, api.tracker.custom_supported_observers);
      $.extend(true, api.tracker.dom_observers, api.tracker.custom_dom_observers); // deep copy to copy in sub_observers where relevant
    }

    // map observed classNames to actions
    api.tracker.dom_observer_map = {};
    $.each(api.tracker.dom_observers, function(act,config){
      if(!$.isArray(config.class)) config.class = [config.class];
      $.each(config.class, function(idx, className) {
        api.tracker.dom_observer_map[className] = act;
      })
    });
    //console.log( 'observer_config', api.tracker.dom_observers, 'dom_observer_map', api.tracker.dom_observer_map);
  }

  /**
    Allow an application to register a custom DOM observer specific to their app.
    Adds it to the configured DOM observers and is supported by the dom insertion observer
    This method can be called two different ways:
    Args:
      action - the name of the new DOM observer
      className / args - for a simple observer, this arg can simply be the class on an inserted DOM element that identifies this event should be
        triggered. For a more complicated observer, this can be an object containing properties for each of the supported DOM observer config arguments
      parent - optional - if specified, this observer will be registered as a sub_observer for the specified parent
   */
  api.observe.register = function(action, args, parent) {

    // check observers configured
    if (api.tracker.dom_observer_init) {
      api.tools.error('Error: Please register all custom DOM observers before binding handlers using gmail.observe.on etc');
    }
    if (!api.tracker.custom_supported_observers) {
      api.tracker.custom_supported_observers = [];
      api.tracker.custom_dom_observers = {};
    }

    // was an object of arguments passed, or just a className
    var config = {};
    if (typeof args == 'object' && !$.isArray(args)) {

      // copy over supported config
      $.each(['class','selector','sub_selector','handler'], function(idx, arg) {
        if(args[arg]) {
          config[arg] = args[arg];
        }
      });
    } else {
      config['class'] = args;
    }
    api.tracker.custom_supported_observers.push(action);
    if (parent) {
      if (!api.tracker.custom_dom_observers[parent]) {
        api.tracker.custom_dom_observers[parent] = {sub_observers: {}};
      }
      api.tracker.custom_dom_observers[parent].sub_observers[action] = config;
    } else {
      api.tracker.custom_dom_observers[action] = config;
    }
  }

  /**
    Observe DOM nodes being inserted. When a node with a class defined in api.tracker.dom_observers is inserted,
    trigger the related event and fire off any relevant bound callbacks
    This function should return true if a dom observer is found for the specified action
   */
  api.observe.on_dom = function(action, callback) {

    // check observers configured
    if(!api.tracker.dom_observer_init) {
      api.observe.initialize_dom_observers();
    }

    // support for DOM observers
    if($.inArray(action, api.tracker.supported_observers) > -1) {

      //console.log('observer found',api.tracker.dom_observers[action]);

      // if we haven't yet bound the DOM insertion observer, do it now
      if(!api.tracker.observing_dom) {
        api.tracker.observing_dom = true;
        //api.tracker.dom_watchdog = {}; // store passed observer callbacks for different DOM events

        // this listener will check every element inserted into the DOM
        // for specified classes (as defined in api.tracker.dom_observers above) which indicate
        // related actions which need triggering
        $(window.document).bind('DOMNodeInserted', function(e) {
          api.tools.insertion_observer(e.target, api.tracker.dom_observers, api.tracker.dom_observer_map);
        });

        // recipient_change also needs to listen to removals
        var mutationObserver = new MutationObserver(function(mutations) {
          for (var i = 0; i < mutations.length; i++) {
            var mutation = mutations[i];
            var removedNodes = mutation.removedNodes;
            for (var j = 0; j < removedNodes.length; j++) {
              var removedNode = removedNodes[j];
              if (removedNode.className == 'vR') {
                var observer = api.tracker.dom_observer_map['vR'];
                var handler = api.tracker.dom_observers.recipient_change.handler;
                api.observe.trigger_dom(observer, $(mutation.target), handler);
              }
            }
          }
        });
        mutationObserver.observe(document.body, {subtree: true, childList: true});

      }
      api.observe.bind('dom',action,callback);
      // console.log(api.tracker.observing_dom,'dom_watchdog is now:',api.tracker.dom_watchdog);
      return true;

    // support for gmail interface load event
    } else if(action == 'load') {

      // wait until the gmail interface has finished loading and then
      // execute the passed handler. If interface is already loaded,
      // then will just execute callback
      if(api.dom.inbox_content().length) return callback();
      var load_count = 0;
      var delay = 200; // 200ms per check
      var attempts = 50; // try 50 times before giving up & assuming an error
      var timer = setInterval(function() {
        var test = api.dom.inbox_content().length;
        if(test > 0) {
          clearInterval(timer);
          return callback();
        } else if(++load_count > attempts) {
          clearInterval(timer);
          console.log('Failed to detect interface load in ' + (delay*attempts/1000) + ' seconds. Will automatically fire event in 5 further seconds.');
          setTimeout(callback, 5000);
        }
      }, delay);
      return true;
    }
  }

  // observes every element inserted into the DOM by Gmail and looks at the classes on those elements,
  // checking for any configured observers related to those classes
  api.tools.insertion_observer = function(target, dom_observers, dom_observer_map, sub) {
    //console.log('insertion', target, target.className);
    if(!api.tracker.dom_observer_map) return;

    // loop through each of the inserted elements classes & check for a defined observer on that class
    var cn = target.className || '';
    var classes = cn.trim().split(/\s+/);
    if(!classes.length) classes.push(''); // if no class, then check for anything observing nodes with no class
    $.each(classes, function(idx, className) {
      var observer = dom_observer_map[className];

      // check if this is a defined observer, and callbacks are bound to that observer
      if(observer && api.tracker.watchdog.dom[observer]) {
        var element = $(target);
        var config = dom_observers[observer];

        // if a config id specified for this observer, ensure it matches for this element
        if(config.selector && !element.is(config.selector)) {
          return;
        }

        // check for any defined sub_selector match - if not found, then this is not a match for this observer
        // if found, then set the matching element to be the one that matches the sub_selector
        if(config.sub_selector) {
          element = element.find(config.sub_selector);
          // console.log('checking for subselector', config.sub_selector, element);
        }

        // if an element has been found, execute the observer handler (or if none defined, execute the callback)
        if(element.length) {

          var handler = config.handler ? config.handler : function(match, callback) { callback(match) };
          // console.log( 'inserted DOM: class match in watchdog',observer,api.tracker.watchdog.dom[observer] );
          api.observe.trigger_dom(observer, element, handler);

          // if sub_observers are configured for this observer, bind a DOMNodeInsertion listener to this element & to check for specific elements being added to this particular element
          if(config.sub_observers) {

            // create observer_map for the sub_observers
            var observer_map = {};
            $.each(config.sub_observers, function(act,cfg){
              observer_map[cfg.class] = act;
            });

            // this listener will check every element inserted into the DOM below the current element
            // and repeat this method, but specifically below the current element rather than the global DOM
            element.bind('DOMNodeInserted', function(e) {
              api.tools.insertion_observer(e.target, config.sub_observers, observer_map, 'SUB ');
            });
          }
        }
      }
    });
  }


  api.tools.make_request = function (link, method) {
    link = decodeURIComponent(link);
    var method  = (typeof method == undefined || typeof method == null) ? 'GET' : method;
    var request = $.ajax({ type: method, url: encodeURI(link), async:false });

    return request.responseText;
  }


  api.tools.make_request_async = function (link, method, callback) {
    var method  = (typeof method == undefined || typeof method == null) ? 'GET' : method;

    $.ajax({ type: method, url: encodeURI(link), async:true, dataType: 'text' })
      .done(function(data, textStatus, jqxhr) {
        callback(jqxhr.responseText);
      })
      .fail(function(jqxhr, textStatus, errorThrown) {
        console.error('Request Failed', errorThrown);
      });
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


  api.helper.get.is_delegated_inbox = function() {
    return api.tracker.globals[17][5][0] === 'fwd';
  }


  api.helper.get.visible_emails_pre = function() {
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
    } else if(page == 'inbox'){
      url += '&search=' + 'mbox';
    }else {
      url += '&search=' + page;
    }
    return url;
  }


  api.helper.get.visible_emails_post = function(get_data) {
    var emails = [];

    var get_data = get_data.substring(get_data.indexOf('['), get_data.length);
        get_data = '"use strict"; return ' + get_data;
        get_data = new Function(get_data);

    api.tracker.view_data = get_data();

    for(i in api.tracker.view_data) {
      if (typeof(api.tracker.view_data[i]) === 'function') {
        continue;
      }

      var cdata = api.tools.parse_view_data(api.tracker.view_data[i]);
      if(cdata.length > 0) {
        $.merge(emails, cdata);
      }
    }
    return emails;
  }


  api.get.visible_emails = function() {
    var url = api.helper.get.visible_emails_pre();
    var get_data = api.tools.make_request(url);
    var emails = api.helper.get.visible_emails_post(get_data);

    return emails;
  }


  api.get.visible_emails_async = function(callback) {
    var url = api.helper.get.visible_emails_pre();
    api.tools.make_request_async(url, 'GET', function(get_data) {
      var emails = api.helper.get.visible_emails_post(get_data);
      callback(emails);
    });
  }


  api.get.selected_emails_data = function(){
    var selected_emails = [];
    if(!api.check.is_inside_email()){
      if($('[gh="tl"] div[role="checkbox"][aria-checked="true"]').length){
        var email = null;
        var emails = api.get.visible_emails();
        $('[gh="tl"] div[role="checkbox"]').each(function(index){
          if($(this).attr('aria-checked') == "true"){
            email = api.get.email_data(emails[index].id);
            selected_emails.push(email);
          }
        });
      }
    }else {
      selected_emails.push(api.get.email_data());
    }
    return selected_emails;
  }


  api.get.current_page = function() {
    var hash  = window.location.hash.split('#').pop().split('?').shift() || 'inbox';
    var pages = ['sent', 'inbox', 'starred', 'drafts', 'imp', 'chats', 'all', 'spam', 'trash',
                 'settings', 'label', 'category', 'circle', 'search'];

    var page = null;

    if($.inArray(hash, pages) > -1) {
      page = hash;
    }

    if(hash.indexOf('inbox/') !== -1) {
      page = 'email';
    }

    return page || hash;
  }


  api.tools.infobox = function(message, time, html){
    var top = $(".b8.UC");

    // initial Gmail style I noticed on 26 / 05 / 2014 for $(".b8.UC") :
    // style="position: relative; top: -10000px;"
    // Seems that when Gmail shows infobox, the style is simply removed
    // - from what I can see in DevTools Elements Panel

    if(top.length > 0){
      top.stop(false, true); // cancel any existing fade so we can start again
      var info = top.find(".vh");
      if (!html) {
        info.text(message);
      } else {
        info.html(message);
      }
      if(typeof time !== "undefined"){
        var initialInfoboxStyle = top.attr("style");            // backup initial style
        top.removeAttr("style").fadeTo(time, 0, function(){     // simply remove then restore
          $(this).attr("style", initialInfoboxStyle);           // style attribute insteed of playing
        });                             // on visibility property
      }
      else{
        top.removeAttr("style");                    // dito
      }
    }
  }

  /**
   * Re-renders the UI using the available data.
   *
   * This method does _not_ cause Gmail to fetch new data. This method is useful
   * in circumstances where Gmail has data available but does not immediately
   * render it. `observe.after` may be used to detect when Gmail has fetched the
   * relevant data. For instance, to refresh a conversation after Gmail fetches
   * its data:
   *
   *     gmail.observe.after('refresh', function(url, body, data, xhr) {
   *       if (url.view === 'cv') {
   *         gmail.tools.rerender();
   *       }
   *     });
   *
   * If a callback is passed, it will be invoked after re-rendering is complete.
   */
  api.tools.rerender = function(callback) {
    var url = window.location.href;
    var hash = window.location.hash;

    // Get Gmail to re-render by navigating away and then back to the current URL. We keep the
    // UI from changing as we navigate away by visiting an equivalent URL: the current URL with the
    // first parameter of the hash stripped ('#inbox/14a16fab4adc1456' -> '#/14a16fab4adc1456' or
    // '#inbox' -> '#').
    var tempUrl;
    if (hash.indexOf('/') !== -1) {
      tempUrl = url.replace(/#.*?\//, '#/');
    } else {
      tempUrl = url.replace(/#.*/, '#');
    }
    window.location.replace(tempUrl);

    // Return to the original URL after a 0-timeout to force Gmail to navigate to the temp URL.
    setTimeout(function() {
      window.location.replace(url);

      // For some reason, the two replace operations above create a history entry (tested in
      // Chrome 39.0.2171.71). Pop it to hide our URL manipulation.
      window.history.back();

      if (callback) callback();
    }, 0);
  }

  api.tools.get_reply_to = function(ms13) {
    // reply to is an array if exists
    var reply_to = (ms13 != undefined) ? ms13[4] : [];

    // if reply to set get email from it and return it
    if (reply_to.length !== 0) {
      return api.tools.extract_email_address(reply_to[0]);
    }

    // otherwise return null
    return null;
  }

  api.tools.parse_email_data = function(email_data) {
    var data = {};
    var threads = {}

    for(i in email_data) {
      var x = email_data[i];
      if(x[0] == 'cs') {
        data.thread_id = x[1];
        data.first_email= x[8][0];
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
        data.threads[x[1]].is_deleted = x[13] == undefined;
        data.threads[x[1]].reply_to_id = x[2];
        data.threads[x[1]].from = x[5];
        data.threads[x[1]].from_email = x[6];
        data.threads[x[1]].timestamp = x[7];
        data.threads[x[1]].datetime = x[24];
        data.threads[x[1]].attachments = x[21].split(',');
        data.threads[x[1]].subject = x[12];
        data.threads[x[1]].content_html = (x[13] != undefined) ? x[13][6] : x[8];
        data.threads[x[1]].to = (x[13] != undefined) ? x[13][1] : ((x[37] != undefined) ? x[37][1]:[]);
        data.threads[x[1]].cc = (x[13] != undefined) ? x[13][2] : [];
        data.threads[x[1]].bcc = (x[13] != undefined) ? x[13][3] : [];
        data.threads[x[1]].reply_to = api.tools.get_reply_to(x[13]);

        try { // jQuery will sometime fail to parse x[13][6], if so, putting the raw HTML
          data.threads[x[1]].content_plain = (x[13] != undefined) ? $(x[13][6]).text() : x[8];
        }
        catch(e) {
          data.threads[x[1]].content_plain = (x[13] != undefined) ? x[13][6] : x[8];
        }
      }
    }

    return data;
  }


  api.helper.get.email_data_pre = function(email_id) {
    if(api.check.is_inside_email() && email_id == undefined) {
      email_id = api.get.email_id();
    }

    var url = null;
    if(email_id != undefined) {
      url = window.location.origin + window.location.pathname + '?ui=2&ik=' + api.tracker.ik + '&rid=' + api.tracker.rid + '&view=cv&th=' + email_id + '&msgs=&mb=0&rt=1&search=mbox';
    }
    return url;
  }


  api.helper.get.email_data_post = function(get_data) {
    var get_data = get_data.substring(get_data.indexOf('['), get_data.length);
        get_data = '"use strict"; return ' + get_data;
        get_data = new Function(get_data);

    cdata = get_data();

    api.tracker.email_data = cdata[0];
    return api.tools.parse_email_data(api.tracker.email_data);
  }


  api.get.email_data = function(email_id) {
    var url = api.helper.get.email_data_pre(email_id);

    if (url != null) {
      var get_data = api.tools.make_request(url);
      var email_data = api.helper.get.email_data_post(get_data);
      return email_data;
    }

    return {};
  }


  api.get.email_data_async = function(email_id, callback) {
    var url = api.helper.get.email_data_pre(email_id);
    if (url != null) {
      api.tools.make_request_async(url, 'GET', function (get_data) {
        var email_data = api.helper.get.email_data_post(get_data);
        callback(email_data);
      });
    } else {
      callback({});
    }
  }


  api.helper.get.email_source_pre = function(email_id) {
    if(api.check.is_inside_email() && email_id == undefined) {
      email_id = api.get.email_id();
    }

    var url = null;
    if(email_id != undefined) {
      var url = window.location.origin + window.location.pathname + '?ui=2&ik=' + api.tracker.ik + '&view=om&th=' + email_id;
    }

    return url;
  }


  api.get.email_source = function(email_id) {
    var url = api.helper.get.email_source_pre(email_id);
    if (url != null) {
      return api.tools.make_request(url);
    }
    return '';
  }


  api.get.email_source_async = function(email_id, callback) {
    var url = api.helper.get.email_source_pre(email_id);
    if (url != null) {
      api.tools.make_request_async(url, 'GET', callback);
    } else {
      callback('');
    }
  }


  api.get.displayed_email_data = function() {
    var email_data = api.get.email_data();
    var displayed_email_data = {};

    if (api.check.is_conversation_view()) {
      displayed_email_data = email_data;

      var threads = displayed_email_data.threads;
      var total_threads = displayed_email_data.total_threads;

      var hash = window.location.hash.split('#')[1] || '';
      var is_in_trash = (hash.indexOf('trash') === 0);

      for (id in threads) {
        var email = threads[id];
        var keep_email = (is_in_trash) ? email.is_deleted : !email.is_deleted;

        if (!keep_email) {
          delete threads[id];
          total_threads.splice(total_threads.indexOf(id), 1);
          displayed_email_data.total_emails--;
          // TODO: remove people involved only in this email.
        }
      }
    }
    else { // Supposing only one displayed email.
      for (id in email_data.threads) {
        var displayed_email_element = $('.ii.gt[class*="' + id + '"]');

        if (displayed_email_element.length > 0) {
          var email = email_data.threads[id];

          displayed_email_data.first_email = id;
          displayed_email_data.last_email = id;
          displayed_email_data.subject = email_data.subject;

          displayed_email_data.threads = {};
          displayed_email_data.threads[id] = email;
          displayed_email_data.total_emails = 1;
          displayed_email_data.total_threads = [id];

          displayed_email_data.people_involved = [];

          displayed_email_data.people_involved.push(
            [email.from, email.from_email]
          );

          email.to.forEach(function(recipient) {
            var address = api.tools.extract_email_address(recipient);
            var name = api.tools.extract_name(recipient.replace(address, '')) || '';

            displayed_email_data.people_involved.push(
              [name, address]
            );
          });

          break;
        }
      }
    }

    return displayed_email_data;
  }


  api.check.is_conversation_view = function() {
    var flag_name = 'bx_vmb';
    var flag_value = undefined;

    var array_with_flag = api.tracker.globals[17][4][1];

    for (var i = 0; i < array_with_flag.length; i++) {
      var current = array_with_flag[i];

      if (current[0] === flag_name) {
        flag_value = current[1];

        break;
      }
    }

    return flag_value === '0' || flag_value === undefined;
  }


  api.tools.extract_email_address = function(str) {
    var regex = /[\+a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+/gi;
    var matches = (str) ? str.match(regex) : undefined;

    return (matches) ? matches[0] : undefined;
  }


  api.tools.extract_name = function(str) {
    var regex = /[a-z'._-\s]+/gi;
    var matches = (str) ? str.match(regex) : undefined;

    return (matches && matches[0]) ? matches[0].trim() : undefined;
  }


  api.tools.i18n = function(label) {
    var locale = api.get.localization();
    var dictionary;

    switch (locale) {
      case 'fr':
        dictionary = {
          'inbox': 'Boîte de réception',
          'drafts': 'Brouillons',
          'spam': 'Spam',
          'forums': 'Forums',
          'updates': 'Mises à jour',
          'promotions': 'Promotions',
          'social_updates': 'Réseaux sociaux'
        };
        break;

      case 'nl':
        dictionary = {
          'inbox': 'Postvak IN',
          'drafts': 'Concepten',
          'spam': 'Spam',
          'forums': 'Forums',
          'updates': 'Updates',
          'promotions': 'Reclame',
          'social_updates': 'Sociaal'
        };
        break;

      case 'en':
      default:
        dictionary = {
          'inbox': 'Inbox',
          'drafts': 'Drafts',
          'spam': 'Spam',
          'forums': 'Forums',
          'updates': 'Updates',
          'promotions': 'Promotions',
          'social_updates': 'Social Updates'
        };
        break;
    }

    return dictionary[label];
  }

  api.tools.add_toolbar_button = function(content_html, onClickFunction, styleClass) {
    var container = $(document.createElement('div'));
    container.attr('class','G-Ni J-J5-Ji');

    var button = $(document.createElement('div'));
    var buttonClasses = 'T-I J-J5-Ji lS ';
    if(styleClass != undefined &&
      styleClass != null &&
      styleClass != ''){
      buttonClasses += styleClass;
    }else{
      buttonClasses += 'T-I-ax7 ar7';
    }
    button.attr('class', buttonClasses);

    button.html(content_html);
    button.click(onClickFunction);

    var content = $(document.createElement('div'));
    content.attr('class','asa');

    container.html(button);

    api.dom.toolbar().append(container);

    return container;
  }

  api.tools.add_compose_button =  function(composeWindow, content_html, onClickFunction, styleClass) {
    var button = $(document.createElement('div'));
    var buttonClasses = 'T-I J-J5-Ji aoO L3 ';
    if(styleClass != undefined){
      buttonClasses += styleClass;
    }
    button.attr('class', buttonClasses);
    button.html(content_html);
    button.click(onClickFunction);

    composeWindow.find('.gU.Up  > .J-J5-Ji').append(button);

    return button;
  }

  api.tools.remove_modal_window = function() {
    $('#gmailJsModalBackground').remove();
    $('#gmailJsModalWindow').remove();
  }

  api.tools.add_modal_window = function(title, content_html, onClickOk, onClickCancel, onClickClose) {
    // By default, clicking on cancel or close should clean up the modal window
    onClickClose = onClickClose || api.tools.remove_modal_window;
    onClickCancel = onClickCancel || api.tools.remove_modal_window;

    var background = $(document.createElement('div'));
    background.attr('id','gmailJsModalBackground');
    background.attr('class','Kj-JD-Jh');
    background.attr('aria-hidden','true');
    background.attr('style','opacity:0.75;width:100%;height:100%;');

    // Modal window wrapper
    var container = $(document.createElement('div'));
    container.attr('id','gmailJsModalWindow');
    container.attr('class', 'Kj-JD');
    container.attr('tabindex', '0');
    container.attr('role', 'alertdialog');
    container.attr('aria-labelledby', 'gmailJsModalWindowTitle');
    container.attr('style', 'left:50%;top:50%;opacity:1;');

    // Modal window header contents
    var header = $(document.createElement('div'));
    header.attr('class', 'Kj-JD-K7 Kj-JD-K7-GIHV4');

    var heading = $(document.createElement('span'));
    heading.attr('id', 'gmailJsModalWindowTitle');
    heading.attr('class', 'Kj-JD-K7-K0');
    heading.attr('role', 'heading');
    heading.html(title);

    var closeButton = $(document.createElement('span'));
    closeButton.attr('id', 'gmailJsModalWindowClose');
    closeButton.attr('class', 'Kj-JD-K7-Jq');
    closeButton.attr('role', 'button');
    closeButton.attr('tabindex', '0');
    closeButton.attr('aria-label', 'Close');
    closeButton.click(onClickClose);

    header.append(heading);
    header.append(closeButton);

    // Modal window contents
    var contents = $(document.createElement('div'));
    contents.attr('id', 'gmailJsModalWindowContent');
    contents.attr('class', 'Kj-JD-Jz');
    contents.html(content_html);

    // Modal window controls
    var controls = $(document.createElement('div'));
    controls.attr('class', 'Kj-JD-Jl');

    var okButton = $(document.createElement('button'));
    okButton.attr('id', 'gmailJsModalWindowOk');
    okButton.attr('class', 'J-at1-auR J-at1-atl');
    okButton.attr('name', 'ok');
    okButton.text('OK');
    okButton.click(onClickOk);

    var cancelButton = $(document.createElement('button'));
    cancelButton.attr('id', 'gmailJsModalWindowCancel');
    cancelButton.attr('name', 'cancel');
    cancelButton.text('Cancel');
    cancelButton.click(onClickCancel);

    controls.append(okButton);
    controls.append(cancelButton);

    container.append(header);
    container.append(contents);
    container.append(controls);

    $(document.body).append(background);
    $(document.body).append(container);

    var center = function() {
      container.css({
        top: ($(window).height() - container.outerHeight()) / 2,
        left: ($(window).width() - container.outerWidth()) / 2
      });
    };

    center();

    $(window).resize(center);
  }

  api.chat.is_hangouts = function() {
    if(api.tracker.hangouts != undefined) {
      return api.tracker.hangouts;
    }

    // Returns true if the user is using hangouts instead of the classic chat
    var dwClasses = $(".dw");
    if(dwClasses.length > 1) {
      throw "Figuring out is hangouts - more than one dw classes found";
    }
    if(dwClasses.length == 0) {
      throw "Figuring out is hangouts - no dw classes found";
    }

    var dw = dwClasses[0];

    var chatWindows = $('.nH.aJl.nn', dw);
    if(chatWindows.length > 0) {
      // hangouts
      api.tracker.hangouts = true;
      return true;
    }

    var chatWindows = $('.nH.nn', dw);
    if(chatWindows.length > 2) {
      // classic
      api.tracker.hangouts = false;
      return false;
    }
    return undefined;
  }

  // retrieve queue of compose window dom objects
  // latest compose at the start of the queue (index 0)
  api.dom.composes = function() {
    var objs = [];
    $('div.M9').each(function(idx, el) {
      objs.push( new api.dom.compose(el));
    });
    return objs;
  }

  /**
    A compose object. Represents a compose window in the DOM and provides a bunch of methods and properties to access & interact with the window
    Expects a jQuery DOM element for the compose div
   */
  api.dom.compose = function(element) {
    element = $(element);
    if(!element || (!element.hasClass('M9') && !element.hasClass('AD'))) api.tools.error('api.dom.compose called with invalid element');
    this.$el = element;
    return this;
  }
  $.extend(api.dom.compose.prototype, {
    /**
      Retrieve the compose id
     */
    id: function() {
      return this.dom('id').val();
    },

    /**
      Retrieve the draft email id
     */
    email_id: function() {
      return this.dom('draft').val();
    },

    /**
      Is this compose instance inline (as with reply & forwards) or a popup (as with a new compose)
     */
    is_inline: function() {
      return this.$el.closest('td.Bu').length > 0;
    },

    /**
      Retrieves to, cc, bcc and returns them in a hash of arrays
      Parameters:
        options.type  string  to, cc, or bcc to check a specific one
        options.flat  boolean if true will just return an array of all recipients instead of splitting out into to, cc, and bcc
     */
    recipients: function(options) {
      if( typeof options != 'object' ) options = {};
      var name_selector = options.type ? '[name=' + options.type + ']' : '';

      // determine an array of all emails specified for To, CC and BCC and extract addresses into an object for the callback
      var recipients = options.flat ? [] : {};
      this.$el.find('.GS input[type=hidden]'+name_selector).each(function(idx, recipient ){
        if(options.flat) {
          recipients.push(recipient.value);
        } else {
          if(!recipients[recipient.name]) recipients[recipient.name] = [];
          recipients[recipient.name].push(recipient.value);
        }
      });
      return recipients;
    },

    /**
      Retrieve the current 'to' recipients
     */
    to: function(to) {
      return this.dom('to').val(to);
    },

    /**
      Retrieve the current 'cc' recipients
     */
    cc: function(cc) {
      return this.dom('cc').val(cc);
    },

    /**
      Retrieve the current 'bcc' recipients
     */
    bcc: function(bcc) {
      return this.dom('bcc').val(bcc);
    },

    /**
      Get/Set the current subject
      Parameters:
        subject   string  set as new subject
     */
    subject: function(subject) {
      var el = this.dom('subjectbox');
      if(subject) this.dom('all_subjects').val(subject);
      subject = this.dom('subjectbox').val();
      return subject ? subject : this.dom('subject').val();
    },

    /**
      Get the from email
      if user only has one email account they can send from, returns that email address
      */
    from: function() {
      var el = this.dom('from');
      if (el.length) {
        var fromNameAndEmail = el.val();
        if (fromNameAndEmail) {
          return gmail.tools.extract_email_address(fromNameAndEmail);
        }
      }
      return gmail.get.user_email();
    },

    /**
      Get/Set the email body
     */
    body: function(body) {
      var el = this.dom('body');
      if(body) el.html(body);
      return el.html();
    },

    /**
      Map find through to jquery element
     */
    find: function(selector) {
      return this.$el.find(selector);
    },

    /**
      Retrieve preconfigured dom elements for this compose window
     */
    dom: function(lookup) {
      if (!lookup) return this.$el;
      var config = {
        to:'textarea[name=to]',
        cc:'textarea[name=cc]',
        bcc:'textarea[name=bcc]',
        id: 'input[name=composeid]',
        draft: 'input[name=draft]',
        subject: 'input[name=subject]',
        subjectbox: 'input[name=subjectbox]',
        all_subjects: 'input[name=subjectbox], input[name=subject]',
        body: 'div[contenteditable=true]',
        reply: 'M9',
        forward: 'M9',
        from: 'input[name=from]'
      };
      if(!config[lookup]) api.tools.error('Dom lookup failed. Unable to find config for \'' + lookup + '\'',config,lookup,config[lookup]);
      return this.$el.find(config[lookup]);
    }

  });

  /**
    An object for interacting with an email currently present in the DOM. Represents an individual email message within a thread
    Provides a number of methods and properties to access & interact with it
    Expects a jQuery DOM element for the email div (div.adn as returned by the 'view_email' observer), or an email_id
   */
  api.dom.email = function(element) {
    if (typeof element == 'string') {
      this.id = element;
      this.id_element = $('div.ii.gt.m' + this.id);
      element = this.id_element.closest('div.adn');
    } else {
      element = $(element);
    }
    if (!element || (!element.hasClass('adn'))) api.tools.error('api.dom.email called with invalid element/id');

    // if no id specified, extract from the body wrapper class (starts with 'm' followed by the id)
    if (!this.id) {
      this.id_element = element.find('div.ii.gt');
      this.id = this.id_element.attr('class').match(/(^|\s)m([\S]*)/).pop();
    }
    this.$el = element;
    return this;
  }
  $.extend(api.dom.email.prototype, {

    /**
      Get/Set the full email body as it sits in the DOM
      If you want the actual DOM element use .dom('body');
      Note: This gets & sets the body html after it has been parsed & marked up by GMAIL. To retrieve it as it exists in the email message source, use a call to .data();
     */
    body: function(body) {
      var el = this.dom('body');
      if (body) {
        el.html(body);
      }
      return el.html();
    },

    /**
      Get/Set the sender
      Optionally receives email and name properties. If received updates the values in the DOM
      Returns an object containing email & name of the sender and dom element
     */
    from: function(email, name) {
      var el = this.dom('from');
      if (email) {
        el.attr('email',email);
      }
      if (name) {
        el.attr('name',name);
        el.html(name);
      }
      return {
        email: el.attr('email'),
        name: el.attr('name'),
        el: el
      };
    },

    /**
      Get/Set who the email is showing as To
      Optionally receives an object containing email and/or name properties. If received updates the values in the DOM.
      Optionally receives an array of these objects if multiple recipients
      Returns an array of objects containing email & name of who is showing in the DOM as the email is to
     */
    to: function(to_array) {

      // if update data has been passeed, loop through & create a new to_wrapper contents
      if (to_array) {
        if (!$.isArray(to_array)) {
          to_array = [to_array];
        }
        var html = [];
        $.each(to_array, function(index, obj) {
          html.push( $('<span />').attr({
            dir: 'ltr',
            email: obj.email,
            name: obj.name
          }).addClass('g2').html(obj.name).wrap('<p/>').parent().html());
        });
        this.dom('to_wrapper').html('to ' + html.join(', '));
      }


      // loop through any matching to elements & prepare for output
      var out = new Array();
      this.dom('to').each(function(index) {
        el = $(this);
        out.push({
          email:  el.attr('email'),
          name: el.attr('name'),
          el: el
        });
      });
      return out;
    },

    /**
      Retrieve relevant email from the Gmail servers for this email
      Makes use of the gmail.get.email_data() method
      Returns an object
     */
    data: function() {
      if (typeof api.dom.email_cache != 'object') {
        api.dom.email_cache = {};
      }
      if (!api.dom.email_cache[this.id]) {

        // retrieve & cache the data for this whole thread of emails
        var data = api.get.email_data(this.id);
        $.each(data.threads, function(email_id, email_data) {
          api.dom.email_cache[email_id] = email_data;
        });
      }
      return api.dom.email_cache[this.id];
    },

    /**
      Retrieve email source for this email from the Gmail servers
      Makes use of the gmail.get.email_source() method
      Returns string of email raw source
     */
    source: function() {
      return api.get.email_source(this.id);
    },

    /**
      Retrieve preconfigured dom elements for this email
     */
    dom: function(lookup) {
      if (!lookup) return this.$el;
      var config = {
        body: 'div.a3s',
        from: 'span[email].gD',
        to: 'span[email].g2',
        to_wrapper: 'span.hb',
        timestamp: 'span.g3',
        star: 'div.zd',

        // buttons
        reply_button: 'div[role=button].aaq',
        menu_button: 'div[role=button].aap',
        details_button: 'div[role=button].ajz'
      };
      if(!config[lookup]) api.tools.error('Dom lookup failed. Unable to find config for \'' + lookup + '\'');
      return this.$el.find(config[lookup]);
    }

  });

  /**
    An object for interacting with an email currently present in the DOM. Represents a conversation thread
    Provides a number of methods and properties to access & interact with it
    Expects a jQuery DOM element for the thread wrapper div (div.if as returned by the 'view_thread' observer)
   */
  api.dom.thread = function(element) {
    if (!element || (!element.hasClass('if'))) api.tools.error('api.dom.thread called with invalid element/id');
    this.$el = element;
    return this;
  }
  $.extend(api.dom.thread.prototype, {

    /**
      Retrieve preconfigured dom elements for this email
     */
    dom: function(lookup) {
      if (!lookup) return this.$el;
      var config = {
        opened_email: 'div.adn',
        subject: 'h2.hP',
        labels: 'div.hN'
      };
      if(!config[lookup]) api.tools.error('Dom lookup failed. Unable to find config for \'' + lookup + '\'');
      return this.$el.find(config[lookup]);
    }

  });

 /**
  *  Show a compose window
  * @returns {boolean}
  */
  api.compose.start_compose = function() {

    //The compose button
    var composeEl = $('.T-I.J-J5-Ji.T-I-KE.L3')[0];

    if(composeEl) {
      //Trigger mouse down event
      var mouseDown = document.createEvent('MouseEvents');
      mouseDown.initEvent( 'mousedown', true, false );
      composeEl.dispatchEvent(mouseDown)

      //Trigger mouse up event
      var mouseUp = document.createEvent('MouseEvents');
      mouseUp.initEvent( 'mouseup', true, false );
      composeEl.dispatchEvent(mouseUp)

      return true;
    }
    return false;
  }

  return api;
}

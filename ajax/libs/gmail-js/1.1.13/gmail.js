///////////////////////////////////////////
// gmail.js
// Kartik Talwar
// https://github.com/KartikTalwar/gmail.js
//

/*eslint-env es6*/

var Gmail = function(localJQuery) {

    /*
      Use the provided "jQuery" if possible, in order to avoid conflicts with
      other extensions that use $ for other purposes.
    */
    var $;
    if (localJQuery === false) {
        // leave $ undefined, which may be fine for some purposes.
    } else if (typeof localJQuery !== "undefined") {
        $ = localJQuery;
    } else if (typeof jQuery !== "undefined") {
        $ = jQuery;
    } else {
        throw new Error("GmailJS requires jQuery to be present in global scope or provided as a constructor argument.");
    }

    var window_opener = typeof (window) !== "undefined" ? window.opener : null;
    if (window_opener) {
        try {
            // access to window.opener domain will fail in case of cross-origin access
            var opener_domain = window_opener.document.domain;
            if (opener_domain !== window.document.domain) {
                console.warn("GmailJS: window.opener domain differs from window domain.");
                window_opener = null;
            }
        } catch (error) {
            console.warn("GmailJS: Unable to access window.opener!", error);
            window_opener = null;
        }
    }

    /** @type Gmail */
    var api = {
        get : {},
        observe : {},
        check : { data: {}},
        tools : {},
        tracker : {},
        dom : {},
        chat : {},
        compose : {},
        helper : {get: {}}
    };

    api.DISABLE_OLD_GMAIL_API_DEPRECATION_WARNINGS = false;

    function oldGmailApiDeprecated(text = "Migrate to new API compatible with new Gmail to silence this warning!") {
        if (api.DISABLE_OLD_GMAIL_API_DEPRECATION_WARNINGS) {
            return;
        }

        console.warn("GmailJS: using deprecated API for old Gmail.", text);
    }

    api.version           = "0.8.0";
    api.tracker.globals   = typeof GLOBALS !== "undefined"
        ? GLOBALS
        : (
            window_opener && window_opener.GLOBALS || []
        );
    api.tracker.view_data = typeof VIEW_DATA !== "undefined"
        ? VIEW_DATA
        : (
            window_opener && window_opener.VIEW_DATA || []
        );
    api.tracker.ik        = api.tracker.globals[9] || "";
    api.tracker.mla       = undefined;
    api.tracker.hangouts  = undefined;

    // cache-store for passively pre-fetched/intercepted email-data from load_email_data.
    api.cache = {};
    api.cache.debug_xhr_fetch = false;
    api.cache.emailIdCache = {};
    api.cache.emailLegacyIdCache = {};
    api.cache.threadCache = {};

    api.get.last_active = function() {
        var data = api.tracker.globals[17][15];
        return {
            time : data[1],
            ip : data[3],
            mac_address : data[9],
            time_relative : data[10]
        };
    };


    /**
     * Gets list of logged in accounts.
     *
     * @returns {GmailLoggedInAccount[]}
     */
    api.get.loggedin_accounts = function() {
        const data = api.tracker.mla;

        if (!Array.isArray(data)) {
            return [];
        }

        return data[1].map(item => ({
            name: item[4],
            email: item[0],
            index: item[3]
        }));
    };


    api.get.user_email = function() {
        let user_email = api.tracker.globals[10];
        if (user_email) {
            return user_email;
        }

        const elements = document.getElementsByClassName("eYSAde");
        for (const el of elements) {
            if (el.innerHTML.indexOf("@") === -1) {
                return el.innerHTML;
            }
        }

        // give up
        return null;
    };


    api.get.manager_email = function() {
        if (api.helper.get.is_delegated_inbox()) {
            return api.get.delegated_to_email();
        }

        return api.get.user_email();
    };


    /**
     * Gets email of current logged-in user, who views delegated account inbox.
     *
     * @returns {string|null} Returns null when Gmail is opened for a non-delegated account or when there is no
     * information about current logged-in user.
     */
    api.get.delegated_to_email = function() {
        if (!api.helper.get.is_delegated_inbox()) {
            return null;
        }

        const userIndexPrefix = "/u/";
        const pathname = window.location.pathname;
        const delegatedToUserIndex = parseInt(pathname.substring(pathname.indexOf(userIndexPrefix) + userIndexPrefix.length), 10);

        const loggedInAccounts = api.get.loggedin_accounts();
        const loggedInAccount = loggedInAccounts.find(account => account.index === delegatedToUserIndex);

        return loggedInAccount ? loggedInAccount.email : null;
    };

    api.helper.get.is_locale = function(locale) {
        // A locale is a string that begins with 2 letters, either lowercase or uppercase
        // The "lowercase" check distinguishes locales from other 2-letter strings like "US"
        // (the user"s location?).
        if (!locale || ((typeof locale) !== "string") || locale.length < 2) {
            return false;
        }

        if (locale.match(/[0-9]/)) {
            return false;
        }

        var localePrefix = locale.slice(0, 2);
        return localePrefix.toLowerCase() === localePrefix ||
            localePrefix.toUpperCase() === localePrefix;
    };

    api.helper.filter_locale = function(locale) {
        if (!api.helper.get.is_locale(locale)) {
            return null;
        }

        // strip region-denominator
        return locale.substring(0,2).toLowerCase();
    };

    api.helper.array_starts_with = function(list, item) {
        if (list && list.length > 0 && list[0] === item) {
            return true;
        } else {
            return false;
        }
    };

    api.helper.get.array_sublist = function(nestedArray, itemKey) {
        if (nestedArray) {
            for(var i=0; i<nestedArray.length; i++) {
                var list = nestedArray[i];
                if (api.helper.array_starts_with(list, itemKey)) {
                    return list;
                }
            }
        }

        return null;
    };

    api.helper.get.locale_from_url_params = function(value) {
        // check if is URL
        if (value && value.indexOf && (value.indexOf("https://") === 0 || value.indexOf("http://") === 0)) {
            var urlParts = value.split("?");
            if (urlParts.length > 1) {
                var hash = urlParts[1];
                var hashParts = hash.split("&");
                for (var i=0; i < hashParts.length; i++)
                {
                    var kvp = hashParts[i].split("=");
                    if (kvp.length === 2 && kvp[0] === "hl") {
                        return kvp[1];
                    }
                }
            }
        }

        return null;
    };

    api.helper.get.locale_from_globals_item = function(list) {
        if (!list) {
            return null;
        }

        for (var i=0; i<list.length; i++) {
            var item = list[i];
            var locale = api.helper.get.locale_from_url_params(item);
            if (locale) {
                return locale;
            }
        }

        // fallback to user-locale
        return list[8];
    };

    api.get.localization = function() {
        var globals = api.tracker.globals;

        // candidate is globals[17]-subarray which starts with "ui"
        // has historically been observed as [7], [8] and [9]!
        var localeList = api.helper.get.array_sublist(globals[17], "ui");
        if (localeList !== null && localeList.length > 8) {
            let locale = api.helper.get.locale_from_globals_item(localeList);
            locale = api.helper.filter_locale(locale);
            if (locale) {
                return locale;
            }
        }

        // in new gmail, globals[12] may contain a link to an help-article, with a hl= language-code
        if (globals[12] !== null) {
            let locale = api.helper.get.locale_from_url_params(globals[12]);
            locale = api.helper.filter_locale(locale);
            if (locale) {
                return locale;
            }
        }

        // and in even newer gmail this seems to work:
        if (globals[4]) {
            let locale = globals[4].split(".")[1];
            locale = api.helper.filter_locale(locale);
            if (locale) {
                return locale;
            }
        }

        return null;
    };

    api.check.is_new_data_layer = function () {
        return window["GM_SPT_ENABLED"] === "true";
    };

    api.check.is_new_gui = function () {
        return window.GM_RFT_ENABLED === "true";
    };

    api.check.is_thread = function() {
        // There are currently two selectors in use for view_thread: Bu and nH,
        // Which correspond to two different ways a thread may be viewed by the user.
        // There are two different code paths to determine if we are within a thread.

        // This is the nH path:
        // this should match the sub_selector (nH -> if/iY):
        var check_1 = $(".nH .if,.iY").children(":eq(1)").children().children(":eq(1)").children();

        // And this is the Bu path. We don't bother here checking for the sub_selector.
        var check_2 = api.get.email_ids();

        return check_1.length > 1 || check_2.length > 1;
    };

    /**
    * New contact selection UI as announced in
    * https://workspaceupdates.googleblog.com/2021/10/visual-updates-for-composing-email-in-gmail.html
    **/
    api.check.is_peoplekit_compose = function (el) {
        return $(el).find("div[name=to] input[peoplekit-id]").length !== 0;
    };

    api.dom.inbox_content = function() {
        return $("div[role=main]:first");
    };


    api.check.is_preview_pane = function() {
        var dom = api.dom.inbox_content();
        var boxes = dom.find("[gh=tl]");

        var previewPaneFound = false;
        boxes.each(function() {
            if($(this).hasClass("aia")) {
                previewPaneFound = true;
            }
        });

        return previewPaneFound;
    };

    api.check.is_multiple_inbox = function() {
        var dom = api.dom.inboxes();
        return dom.length > 1;
    };


    api.check.is_horizontal_split = function() {
        var dom = api.dom.inbox_content();
        var box = dom.find("[gh=tl]").find(".nn");

        return box.length === 0;
    };


    api.check.is_vertical_split = function() {
        return api.check.is_horizontal_split() === false;
    };


    api.check.is_tabbed_inbox = function() {
        return document.querySelectorAll(".aKh").length === 1;
    };


    api.check.is_right_side_chat = function() {
        var chat = document.querySelectorAll(".ApVoH");
        if(chat.length === 0) {
            return false;
        }

        return chat[0].getAttribute("aria-labelledby") === ":wf";
    };

    api.check.should_compose_fullscreen = function(){
        console.warn("gmail.js: This function is known to be unreliable, and may be deprecated in a future release.");
        var bx_scfs = [];
        try {
            bx_scfs = api.tracker.globals[17][4][1][32];
        } catch(er) {
            bx_scfs = ["bx_scfs","false"];
        }
        return (bx_scfs[1] === "true" ) ? true : false;
    };


    api.check.is_google_apps_user =function() {
        var email = api.get.user_email();
        return email.indexOf("gmail.com", email.length - "gmail.com".length) === -1;
    };


    api.get.storage_info = function() {
        var div = document.querySelector(".md.mj div");
        var used = div.querySelectorAll("span")[0].textContent.replace(/,/g, '.'); //convert to standard decimal
        var total = div.querySelectorAll("span")[1].textContent.replace(/,/g, '.');
        var percent = parseFloat(used.replace(/[^0-9\.]/g, "")) * 100 / parseFloat(total.replace(/[^0-9\.]/g, ""));
        return {used : used, total : total, percent : Math.floor(percent)};
    };


    api.dom.inboxes = function() {
        var dom = api.dom.inbox_content();
        return dom.find("[gh=tl]");
    };

    api.dom.email_subject = function () {
        var e = $(".hP");

        for(var i=0; i<e.length; i++) {
            if($(e[i]).is(":visible")) {
                return $(e[i]);
            }
        }

        return $();
    };


    api.get.email_subject = function() {
        var subject_dom = api.dom.email_subject();

        return subject_dom.text();
    };


    api.dom.email_body = function() {
        return $(".nH.hx");
    };

    api.dom.toolbar = function() {
        var tb = $("[gh='mtb']");

        while($(tb).children().length === 1){
            tb = $(tb).children().first();
        }

        return tb;
    };

    api.dom.right_toolbar = function() {
        return $("[gh='tm'] .Cr.aqJ");
    };

    api.check.is_inside_email = function() {
        if(api.get.current_page() !== "email" && !api.check.is_preview_pane()) {
            return false;
        }

        var items = document.querySelectorAll(".ii.gt .a3s");
        var ids = [];

        for(var i=0; i<items.length; i++) {
            var mail_id = items[i].getAttribute("class").split(" ")[2];
            if(mail_id !== "undefined" && mail_id !== undefined) {
                ids.push(items[i]);
            }
        }

        return ids.length > 0;
    };

    api.check.is_plain_text = function() {
        var settings = api.tracker.globals[17][4][1];

        for (var i = 0; i < settings.length; i++) {
            var plain_text_setting = settings[i];
            if (plain_text_setting[0] === "bx_cm") {
                return plain_text_setting[1] === "0";
            }
        }

        // default to rich text mode, which is more common nowadays
        return false;
    };

    api.dom.email_contents = function() {
        var items = document.querySelectorAll(".ii.gt div.a3s.aXjCH");
        var ids = [];

        for(var i=0; i<items.length; i++) {
            var mail_id = items[i].getAttribute("class").split(" ")[2];
            var is_editable = items[i].getAttribute("contenteditable");
            if(mail_id !== "undefined" && mail_id !== undefined) {
                if(is_editable !== "true") {
                    ids.push(items[i]);
                }
            }
        }

        return ids;
    };


    api.get.email_ids = function() {
        oldGmailApiDeprecated();

        if(api.check.is_inside_email()) {
            var data = api.get.email_data();
            return Object.keys(data.threads);
        }
        return [];
    };


    api.get.compose_ids = function() {
        var ret = [];
        var dom = document.querySelectorAll(".M9 [name=draft]");
        for(var i = 0; i < dom.length; i++) {
            if(dom[i].value !== "undefined"){
                ret.push(dom[i].value);
            }
        }
        return ret;
    };

    api.get.thread_id = function() {
        oldGmailApiDeprecated();

        // multiple elements contains this attribute, but only the visible header of the visible email is a H2!
        const elem = document.querySelector("h2[data-legacy-thread-id]");
        if (elem !== null) {
            return elem.dataset.legacyThreadId;
        }
        else {
            // URL-based analysis is unreliable!
            return undefined;
        }
    };

    api.get.email_id = function() {
        oldGmailApiDeprecated();

        return api.get.thread_id();
    };

    api.check.is_priority_inbox = function() {
        return document.querySelector(".qh") !== null;
    };


    api.check.is_rapportive_installed = function() {
        return document.querySelector("#rapportive-sidebar") !== null;
    };


    api.check.is_streak_installed = function() {
        return document.querySelector("[id^='bentoBox'],[id*=' bentoBox'],[class*=' bentoBox'],[class*='bentoBox']") !== null;
    };


    api.check.is_anydo_installed = function() {
        return document.querySelector("[id^='anydo'],[id*=' anydo'],[class*=' anydo'],[class*='anydo']") !== null;
    };


    api.check.is_boomerang_installed = function() {
        return document.querySelector("[id^='b4g_'],[id*=' b4g_'],[class*=' b4g_'],[class*='b4g_']") !== null;
    };


    api.check.is_xobni_installed = function() {
        return document.querySelector("#xobni_frame") !== null;
    };


    api.check.is_signal_installed = function() {
        return document.querySelector("[id^='Signal'],[id*=' Signal'],[class*=' signal'],[class*='signal']") !== null;
    };


    api.check.are_shortcuts_enabled = function() {
        var flag_name = "bx_hs";
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
                "0": true,
                "1": false
            };

            check = values[flag_value];
        }

        return check;
    };


    api.dom.get_left_sidebar_links = function() {
        return $("div[role=navigation] [title]");
    };

    api.dom.header = function() {
        return $("#gb");
    };

    api.dom.search_bar = function() {
        return $("[gh=sb]");
    };


    api.get.search_query = function() {
        var dom = api.dom.search_bar();
        return dom.find("input")[0].value;
    };


    api.get.unread_inbox_emails = function() {
        return api.helper.get.navigation_count("inbox");
    };


    api.get.unread_draft_emails = function() {
        return api.helper.get.navigation_count("drafts");
    };


    api.get.unread_spam_emails = function() {
        return api.helper.get.navigation_count("spam");
    };


    api.get.unread_forum_emails = function() {
        return api.helper.get.navigation_count("forums");
    };


    api.get.unread_update_emails = function() {
        return api.helper.get.navigation_count("updates");
    };


    api.get.unread_promotion_emails = function() {
        return api.helper.get.navigation_count("promotions");
    };


    api.get.unread_social_emails = function() {
        return api.helper.get.navigation_count("social_updates");
    };

    api.helper.get.navigation_count = function(i18nName) {
        const title = api.tools.i18n(i18nName);
        const dom = document.querySelectorAll("div[role=navigation] [title*='" + title + "']");

        if (dom.length > 0) {
            // this check should implicitly always be true, but better safe than sorry?
            if(dom[0].title.indexOf(title) !== -1) {
                const value = parseInt(dom[0].attributes['aria-label'].value.replace(/[^0-9]/g, ""));
                if (!isNaN(value)) {
                    return value;
                }
            }
        }

        return 0;
    };


    api.get.beta = function() {
        var features = {
            "new_nav_bar" : document.querySelector("#gbz") !== null
        };

        return features;
    };


    api.get.unread_emails = function() {
        return {
            inbox         : api.get.unread_inbox_emails(),
            drafts        : api.get.unread_draft_emails(),
            spam          : api.get.unread_spam_emails(),
            forum         : api.get.unread_forum_emails(),
            update        : api.get.unread_update_emails(),
            promotions    : api.get.unread_promotion_emails(),
            social        : api.get.unread_social_emails()
        };
    };


    api.tools.error = function(str, ...args) {
        console.error(str, ...args);
    };

    api.tools.parse_url = function(url) {
        var regex = /[?&]([^=#]+)=([^&#]*)/g;
        var params = {};
        var match = regex.exec(url);

        while (match) {
            params[match[1]] = match[2];
            match = regex.exec(url);
        }

        return params;
    };

    api.tools.sleep = function(milliseconds) {
        var start = new Date().getTime();
        while(true) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    };


    api.tools.multitry = function(delay, tries, func, check, counter, retval) {
        if(counter !== undefined && counter >= tries) {
            return retval;
        }

        counter = (counter === undefined) ? 0 : counter;

        var value = func();

        if(check(value)) {
            return value;
        } else {
            api.tools.sleep(delay);
            api.tools.multitry(delay, tries, func, check, counter+1, value);
        }
    };


    api.tools.deparam = function (params, coerce) {

        var each = function (arr, fnc) {
            var data = [];
            for (var i = 0; i < arr.length; i++) {
                data.push(fnc(arr[i]));
            }
            return data;
        };

        var isArray = Array.isArray || function(obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
        };

        var obj = {},
            coerce_types = {
                "true": !0,
                "false": !1,
                "null": null
            };
        each(params.replace(/\+/g, " ").split("&"), function (v, j) {
            var param = v.split("="),
                key = decodeURIComponent(param[0]),
                val,
                cur = obj,
                i = 0,
                keys = key.split("]["),
                keys_last = keys.length - 1;
            if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
                keys[keys_last] = keys[keys_last].replace(/\]$/, "");
                keys = keys.shift().split("[").concat(keys);
                keys_last = keys.length - 1;
            } else {
                keys_last = 0;
            }
            if (param.length === 2) {
                val = decodeURIComponent(param[1]);
                if (coerce) {
                    val = val && !isNaN(val) ? +val : val === "undefined" ? undefined : coerce_types[val] !== undefined ? coerce_types[val] : val;
                }
                if (keys_last) {
                    for (; i <= keys_last; i++) {
                        key = keys[i] === "" ? cur.length : keys[i];
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
                obj[key] = coerce ? undefined : "";
            }
        });
        return obj;
    };

    api.tools.get_pathname_from_url = function(url) {
        if (typeof(document) !== "undefined") {
            const a = document.createElement("a");
            a.href = url;
            return a.pathname;
        } else {
            return url;
        }
    };

    api.tools.parse_actions = function(params, xhr) {

        // upload_attachment event - if found, don"t check other observers. See issue #22
        if(params.url.act === "fup" || params.url.act === "fuv" || params.body_is_object) {
            return params.body_is_object && api.observe.bound("upload_attachment") ? { upload_attachment: [ params.body_params ] } : false; // trigger attachment event
        }

        if(params.url.search !== undefined) {
            // console.log(params.url, params.body, params.url_raw);
        }

        var triggered = {}; // store an object of event_name: [response_args] for events triggered by parsing the actions
        var action_map = {
            "tae"         : "add_to_tasks",
            "rc_^i"       : "archive",
            "tr"          : "delete",
            "dm"          : "delete_message_in_thread",
            "dl"          : "delete_forever",
            "dc_"         : "delete_label",
            "dr"          : "discard_draft",
            "el"          : "expand_categories",
            "cffm"        : "filter_messages_like_these",
            "arl"         : "label",
            "mai"         : "mark_as_important",
            "mani"        : "mark_as_not_important",
            "us"          : "mark_as_not_spam",
            "sp"          : "mark_as_spam",
            "mt"          : "move_label",
            "ib"          : "move_to_inbox",
            "ig"          : "mute",
            "rd"          : "read",
            "sd"          : "save_draft",
            "sm"          : "send_message",
            "mo"          : "show_newly_arrived_message",
            "st"          : "star",
            "cs"          : "undo_send",
            "ug"          : "unmute",
            "ur"          : "unread",
            "xst"         : "unstar",
            "new_mail"    : "new_email",
            "poll"        : "poll",
            "refresh"     : "refresh",
            "rtr"         : "restore_message_in_thread",
            "open_email"  : "open_email",
            "toggle_threads"  : "toggle_threads"
        };

        if(typeof params.url.ik === "string") {
            api.tracker.ik = params.url.ik;
        }

        if(typeof params.url.at === "string") {
            api.tracker.at = params.url.at;
        }

        if(typeof params.url.rid === "string") {
            if(params.url.rid.indexOf("mail") !== -1) {
                api.tracker.rid = params.url.rid;
            }
        }

        var action      = decodeURIComponent(params.url.act);
        var sent_params = params.body_params;
        var email_ids   = (typeof sent_params.t === "string") ? [sent_params.t] : sent_params.t;
        var response    = null;

        switch(action) {
        case "cs":
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
        case "dc_":
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
            response = [params.url, params.body, sent_params.ex === "1"];
            break;

        case "dm":
        case "rtr":
        case "mo":
            response = [sent_params.m, params.url, params.body];
            break;

        }

        if(typeof params.url._reqid === "string" && params.url.view === "tl" && params.url.auto !== undefined) {
            response = [params.url.th, params.url, params.body];
            if(api.observe.bound("new_email")) {
                triggered.new_email = response;
            }
        }

        if((params.url.view === "cv" || params.url.view === "ad") && typeof params.url.th === "string" && typeof params.url.search === "string" && params.url.rid === undefined) {
            response = [params.url.th, params.url, params.body];
            if(api.observe.bound("open_email")) {
                triggered.open_email = response;
            }
        }

        if((params.url.view === "cv" || params.url.view === "ad") && typeof params.url.th === "object" && typeof params.url.search === "string" && params.url.rid !== undefined) {
            response = [params.url.th, params.url, params.body];
            if(api.observe.bound("toggle_threads")) {
                triggered.toggle_threads = response;
            }
        }

        if((params.url.view === "cv" || params.url.view === "ad") && typeof params.url.th === "string" && typeof params.url.search === "string" && params.url.rid !== undefined) {
            if(params.url.msgs !== undefined) {
                response = [params.url.th, params.url, params.body];
                if(api.observe.bound("toggle_threads")) {
                    triggered.toggle_threads = response;
                }
            }
        }

        if(typeof params.url.SID === "string" && typeof params.url.zx === "string" && params.body.indexOf("req0_") !== -1) {
            api.tracker.SID = params.url.SID;
            response = [params.url, params.body, sent_params];
            if(api.observe.bound("poll")) {
                triggered.poll = response;
            }
        }

        if(typeof params.url.ik === "string" && typeof params.url.search === "string" && params.body.length === 0 && typeof params.url._reqid === "string") {
            response = [params.url, params.body, sent_params];
            if(api.observe.bound("refresh")) {
                triggered.refresh = response;
            }
        }

        if(response && action_map[action] && api.observe.bound(action_map[action])) {
            triggered[action_map[action]] = response;
        }

        if(params.method === "POST") {
            triggered.http_event = [params]; // send every event and all data
        }

        // handle new data-format introduced with new gmail 2018.
        if (api.check.is_new_data_layer()) {
            api.tools.parse_request_payload(params, triggered);
        }

        return triggered;
    };

    api.check.data.is_thread_id = function(id) {
        return id
            && typeof id === "string"
            && /^thread-[a|f]:/.test(id);
    };

    api.check.data.is_thread = function(obj) {
        return obj
            && typeof obj === "object"
            && obj["0"]
            && api.check.data.is_thread_id(obj["0"]);
    };

    api.check.data.is_email_id = function(id) {
        return id
            && typeof id === "string"
            && id.indexOf('bump-') === -1
            && /^msg-[a|f]:/.test(id);
    };

    api.check.data.is_email = function(obj) {
        return obj
            && typeof obj === "object"
            && obj["0"]
            && api.check.data.is_email_id(obj["0"]);
    };

    /** New payload, see https://github.com/KartikTalwar/gmail.js/issues/722 */
    api.check.data.is_email_new = function(obj) {
        return obj
            && obj[0]
            && api.check.data.is_email_id(obj[0]);
    };

    api.check.data.is_legacy_email_id = function(id) {
        return id
            && typeof id === "string"
            && /^[0-9a-f]{16,}$/.test(id);
    };

    api.check.data.is_action = function(obj) {
        return api.check.data.is_first_type_action(obj)
            || api.check.data.is_second_type_action(obj);
    };

    api.check.data.is_first_type_action = function(obj) {
        return obj
            && obj["1"]
            && Array.isArray(obj["1"])
            && obj["1"].length === 1
            && typeof obj["1"]["0"] === 'string';
    };

    api.check.data.is_second_type_action = function(obj) {
        return obj
            && obj["2"]
            && Array.isArray(obj["2"])
            && obj["2"].length
            && typeof obj["2"]["0"] === 'string';
    };

    api.check.data.is_smartlabels_array = function(obj) {
        const isNotArray = !obj || !Array.isArray(obj) ||obj.length === 0;
        if (isNotArray) {
            return false;
        }

        for (let item of obj) {
            if (typeof item !== "string") {
                return false;
            }

            if (!/^\^[a-z]+/.test(item)) {
                return false;
            }
        }

        return true;
    };

    /**
       A lightweight check to see if a object (most likely) is a JSON-string.
    */
    api.check.data.is_json_string = function(obj) {
        if (!obj || typeof obj !== "string") {
            return false;
        }

        let str = obj.trim();
        return ((str.startsWith("{") && str.endsWith("}"))
            || (str.startsWith("[") && str.endsWith("]")));
    };

    api.tools.get_thread_id = function(obj) {
        return api.check.data.is_thread(obj)
            && obj["1"];
    };

    api.tools.get_thread_data = function(obj) {
        return obj
            && obj["2"]
            && typeof obj["2"] === "object"
            && obj["2"]["7"]
            && typeof obj["2"]["7"] === "object"
            && obj["2"]["7"];
    };

    api.tools.get_action = function(obj) {
        return api.tools.get_first_type_action(obj)
            || api.tools.get_second_type_action(obj);
    };

    api.tools.get_first_type_action = function(obj) {
        return obj
            && obj[1]
            && obj[1].join('');
    };

    api.tools.get_second_type_action = function(obj) {
        return obj
            && obj[2]
            && obj[2].join('');
    };

    api.tools.get_message_ids = function(obj) {
        return obj
            && obj["3"]
            && Array.isArray(obj["3"])
            && obj["3"];
    };

    api.tools.extract_from_graph = function(obj, predicate) {
        const result = [];

        const safePredicate = function(item) {
            try {
                return predicate(item);
            }
            catch (err) {
                return false;
            }
        };

        const forEachGraph = function(obj) {
            // check root-node too!
            if (safePredicate(obj)) {
                result.push(obj);
                return;
            }

            for (let key in obj) {
                let item = obj[key];

                if (safePredicate(item)) {
                    result.push(item);
                    continue;
                }

                // special-case digging for arrays!
                if (Array.isArray(item)) {
                    for (let listItem of item) {
                        forEachGraph(listItem, obj);
                    }
                } else if (typeof item === "object") {
                    // keep on digging.
                    forEachGraph(item);
                }
            }
        };

        forEachGraph(obj);
        return result;
    };

    api.tools.check_event_type = function(threadObj) {
        const apply_label = "^x_";
        const action_map = {
            // ""            : "add_to_tasks",
            "^a": "archive",
            "^k": "delete",
            // ""            : "delete_message_in_thread",
            // ""            : "delete_forever",
            // ""            : "delete_label",
            // ""            : "discard_draft",
            // ""            : "expand_categories",
            // ""            : "filter_messages_like_these",
            "^x_"            : "label",
            // "^io_im^imi": "mark_as_important",
            // "^imn": "mark_as_not_important",
            // ""            : "mark_as_not_spam",
            // ""            : "mark_as_spam",
            // ""            : "move_label",
            // ""            : "move_to_inbox",
            // ""            : "mute",
            "^u^us": "read",
            // ""            : "save_draft",
            // ""            : "send_message",
            // ""            : "show_newly_arrived_message",
            // "^t^ss_sy": "star",
            // ""            : "undo_send",
            // ""            : "unmute",
            "^u"            : "unread",
            // "^t^ss_sy^ss_so^ss_sr^ss_sp^ss_sb^ss_sg^ss_cr^ss_co^ss_cy^ss_cg^ss_cb^ss_cp": "unstar",
            "^us"            : "new_email",
            // ""            : "poll",
            // ""            : "refresh",
            // ""            : "restore_message_in_thread",
            "^o": "open_email",
            // ""            : "toggle_threads"
        };
        const threadData = api.tools.get_thread_data(threadObj);

        if (threadData && api.check.data.is_action(threadData)) {
            const action = api.tools.get_action(threadData);

            //Check if label is applied to email / existing email is moved to an label
            if(action.startsWith(apply_label) && api.check.data.is_first_type_action(threadData)) {
                return action_map[apply_label];
            } else {
                return action_map[action];
            }

        } else {
            return null;
        }
    };

    api.tools.parse_fd_bv_contacts = function(json) {
        if (!json || !Array.isArray(json)) {
            return [];
        }

        const res = [];

        for (let item of json) {
            res.push(api.tools.parse_fd_bv_contact(item));
        }

        return res;
    };

    api.tools.parse_fd_bv_is_draft = function(item) {
        try {
            if (!Array.isArray(item)) return false; // warning: case not seen during testing and value is untrustworthy
            return item.includes('^r') && item.includes('^r_bt');
        }
        catch (e) {
            return false;  // warning: case not seen during testing and value is untrustworthy
        }

    };

    api.tools.parse_fd_bv_contact = function(item) {
        try
        {
            return {
                name: item["2"],
                address: item["1"]
            };
        }
        catch (e) {
            return null;
        }
    };

    api.tools.parse_fd_attachments = function(json) {
        let res = [];

        if (Array.isArray(json)) {
            for (let item of json) {
                let data = item["0"]["3"] || "";

                res.push({
                    attachment_id: item["0"]["1"],
                    name: data["2"],
                    type: data["3"],
                    url: api.tools.check_fd_attachment_url(data["1"]),
                    size: Number.parseInt(data["4"])
                });
            }
        }

        return res;
    };

    api.tools.parse_fd_embedded_json_attachments = function(json) {
        let res = [];

        if (Array.isArray(json)) {
            for (let item of json) {
                res.push({
                    attachment_id: item[3],
                    name: item[1],
                    type: item[0],
                    url: api.tools.check_fd_attachment_url(item[5]),
                    size: item[2]
                });
            }
        }

        return res;
    };

    api.tools.check_fd_attachment_url = function(url) {
        var userAccountUrlPart = api.tracker.globals[7];
        if (url && userAccountUrlPart && url.indexOf(userAccountUrlPart) < 0) {
            url = url.replace('/mail/?', userAccountUrlPart + '?');
        }

        return url;
    };

    api.tools.parse_fd_request_html_payload = function(fd_email) {
        let fd_email_content_html = null;
        try {
            const fd_html_containers = fd_email["1"]["5"]["1"];

            for (let fd_html_container of fd_html_containers) {
                fd_email_content_html = (fd_email_content_html || "") + fd_html_container["2"]["1"];
            }
        }
        catch(e) {
            // don't crash gmail when we cant parse email-contents
        }

        return fd_email_content_html;
    };

    api.tools.parse_fd_embedded_json_content_html = function (fd_email) {
        let fd_email_content_html = null;
        try {
            const fd_html_containers = fd_email["8"]["1"];

            for (let fd_html_container of fd_html_containers) {
                fd_email_content_html = (fd_email_content_html || "") + fd_html_container["2"]["1"];
            }
        } catch (e) {
            // don't crash gmail when we cant parse email-contents
        }

        return fd_email_content_html;
    };

    api.tools.parse_fd_request_payload_get_email2 = function(fd_thread_container, fd_email_id) {
        try {
            const fd_emails2 = fd_thread_container["1"]["1"];
            const fd_email2 = fd_emails2.filter(i => i["0"] === fd_email_id);
            return fd_email2[0];
        }
        catch (e) {
            return {};
        }
    };

    api.tools.parse_fd_embedded_json_get_email = function (fd_thread_container, fd_email_id) {
        try {
            const fd_emails2 = fd_thread_container["1"]["4"];
            const fd_email2 = fd_emails2.filter(i => i["0"] === fd_email_id);
            return fd_email2[0];
        } catch (e) {
            return {};
        }
    };

    api.tools.parse_fd_request_payload = function(json) {
        // ensure JSON-format is known and understood?
        let thread_root = json["1"];
        if (!thread_root || !Array.isArray(thread_root)) {
            return null;
        }

        try
        {
            const res = [];

            const fd_threads = thread_root; // array
            for (let fd_thread_container of fd_threads) {
                const fd_thread_id = fd_thread_container["0"];

                let fd_emails = fd_thread_container["2"]; // array
                for (let fd_email of fd_emails) {
                    //console.log(fd_email)
                    const fd_email_id = fd_email["0"];

                    // detailed to/from-fields must be obtained through the -other- email message node.
                    const fd_email2 = api.tools.parse_fd_request_payload_get_email2(fd_thread_container, fd_email_id);

                    const fd_legacy_email_id = fd_email["1"]["34"];
                    const fd_email_smtp_id = fd_email["1"]["7"];

                    const fd_email_subject = fd_email["1"]["4"];
                    const fd_email_timestamp = Number.parseInt(fd_email["1"]["16"]);
                    const fd_email_date = new Date(fd_email_timestamp);

                    const fd_email_is_draft = api.tools.parse_fd_bv_is_draft(fd_email2["3"]);

                    const fd_email_content_html = api.tools.parse_fd_request_html_payload(fd_email);

                    const fd_attachments = api.tools.parse_fd_attachments(fd_email["1"]["13"]);

                    const fd_email_sender_address = fd_email["1"]["10"]["16"];

                    let fd_from = api.tools.parse_fd_bv_contact(fd_email2["1"]);
                    if (!fd_from) {
                        fd_from = { address: fd_email_sender_address, name: "" };
                    }

                    const fd_to = api.tools.parse_fd_bv_contacts(fd_email["1"]["0"]);
                    const fd_cc = api.tools.parse_fd_bv_contacts(fd_email["1"]["1"]);
                    const fd_bcc = api.tools.parse_fd_bv_contacts(fd_email["1"]["2"]);

                    const email = {
                        id: fd_email_id,
                        is_draft: fd_email_is_draft,
                        legacy_email_id: fd_legacy_email_id,
                        thread_id: fd_thread_id,
                        smtp_id: fd_email_smtp_id,
                        subject: fd_email_subject,
                        timestamp: fd_email_timestamp,
                        content_html: fd_email_content_html,
                        date: fd_email_date,
                        from: fd_from,
                        to: fd_to,
                        cc: fd_cc,
                        bcc: fd_bcc,
                        attachments: fd_attachments
                    };
                    if (api.cache.debug_xhr_fetch) {
                        email["$email_node"] = fd_email;
                        email["$thread_node"] = fd_thread_container;
                    }
                    //console.log(email);
                    res.push(email);
                }
            }

            return res;
        }
        catch (error) {
            console.warn("Gmail.js encountered an error trying to parse email-data on fd request!", error);
            return null;
        }
    };

    api.tools.parse_fd_embedded_json = function (json) {
        // ensure JSON-format is known and understood?
        let thread_root = json["1"];

        if (!thread_root || !Array.isArray(thread_root)) {
            return null;
        }

        try {
            const res = [];

            const fd_threads = thread_root; // array
            for (let fd_thread_container of fd_threads) {
                const fd_thread_id = fd_thread_container["1"]["3"];

                let fd_emails = fd_thread_container["1"]["4"]; // array
                for (let fd_email of fd_emails) {
                    //console.log(fd_email)
                    const fd_email_id = fd_email["0"];



                    // detailed to/from-fields must be obtained through the -other- email message node.
                    //TODO : need a refactoring
                    const fd_email2 = api.tools.parse_fd_embedded_json_get_email(fd_thread_container, fd_email_id);


                    //TODO : to check...
                    const fd_legacy_email_id = fd_email["55"];
                    const fd_email_smtp_id = fd_email["13"];
                    const fd_email_subject = fd_email["7"];

                    const fd_email_is_draft = api.tools.parse_fd_bv_is_draft(fd_email["10"]);

                    //TODO : to check...
                    const fd_email_timestamp = Number.parseInt(fd_email["17"]);
                    const fd_email_date = new Date(fd_email_timestamp);

                    //TODO : need a refactoring
                    const fd_email_content_html = api.tools.parse_fd_embedded_json_content_html(fd_email);

                    const fd_attachments = api.tools.parse_fd_embedded_json_attachments(fd_email["11"]);
                    const fd_email_sender_address = fd_email["18"]["16"];

                    //TODO
                    let fd_from = api.tools.parse_fd_bv_contact(fd_email2["1"]);
                    if (!fd_from) {
                        fd_from = {
                            address: fd_email_sender_address,
                            name: ""
                        };
                    }

                    const fd_to = api.tools.parse_fd_bv_contacts(fd_email["2"]);
                    const fd_cc = api.tools.parse_fd_bv_contacts(fd_email["3"]);
                    const fd_bcc = api.tools.parse_fd_bv_contacts(fd_email["4"]);

                    const email = {
                        id: fd_email_id,
                        is_draft: fd_email_is_draft,
                        legacy_email_id: fd_legacy_email_id,
                        thread_id: fd_thread_id,
                        smtp_id: fd_email_smtp_id,
                        subject: fd_email_subject,
                        timestamp: fd_email_timestamp,
                        content_html: fd_email_content_html,
                        date: fd_email_date,
                        from: fd_from,
                        to: fd_to,
                        cc: fd_cc,
                        bcc: fd_bcc,
                        attachments: fd_attachments
                    };
                    if (api.cache.debug_xhr_fetch) {
                        email["$email_node"] = fd_email;
                        email["$thread_node"] = fd_thread_container;
                    }
                    //console.log(email);
                    res.push(email);
                }
            }

            return res;
        } catch (error) {
            console.warn("Gmail.js encountered an error trying to parse email-data on embedded json!", error);
            return null;
        }
    };

    /**
     * Parse xhr response fom bv request like https://mail.google.com/sync/u/0/i/bv?hl=fr&c=0
     */
    api.tools.parse_bv_request_payload = function (json) {
        // ensure JSON-format is known and understood?
        // JSON-format is not simple to understand, code here is bases on hypothesis
        //let label_root = json["2"];
        let thread_root = json["2"];
        if (!thread_root || !Array.isArray(thread_root)) {
            return null;
        }

        try {
            const res = [];

            const bv_threads = thread_root; // array
            for (let bv_thread_container of bv_threads) {
                const bv_thread_subject = bv_thread_container["0"]["0"];
                const bv_thread_id = bv_thread_container["0"]["3"];

                let bv_emails = bv_thread_container["0"]["4"]; // array
                for (let bv_email of bv_emails) {
                    //console.log(bv_email)
                    const bv_email_id = bv_email["0"];
                    const bv_legacy_email_id = bv_email["55"];
                    const bv_email_smtp_id = ""; //bv_email["16"] is smtp_id of previous email in the conversation
                    //const bv_email["16"] !==undefined ? bv_email["16"] : ""; //present only if user is the sender ?
                    const bv_email_subject = bv_thread_subject; //value present on thread but not on email
                    const bv_email_timestamp = Number.parseInt(bv_email["17"]); //another timestamp with same value present on bv_email["31"]
                    const bv_email_date = new Date(bv_email_timestamp);
                    const bv_email_content_html = ""; //Not present in bv request

                    const bv_email_is_draft = api.tools.parse_fd_bv_is_draft(bv_email["10"]);

                    //TODO
                    const bv_attachments = []; //Present but need a new parser (not urgent, present in fd email)

                    //TODO : check if it's OK
                    const bv_from = {
                        address: bv_email["1"]["1"] !== undefined ? bv_email["1"]["1"] : "",
                        name: bv_email["1"]["2"] !== undefined ? bv_email["1"]["2"] : ""
                    };

                    const bv_to = []; //Not present in bv request
                    const bv_cc = []; //Not present in bv request
                    const bv_bcc = []; //Not present in bv request

                    const email = {
                        id: bv_email_id,
                        is_draft: bv_email_is_draft,
                        legacy_email_id: bv_legacy_email_id,
                        thread_id: bv_thread_id,
                        smtp_id: bv_email_smtp_id,
                        subject: bv_email_subject,
                        timestamp: bv_email_timestamp,
                        content_html: bv_email_content_html,
                        date: bv_email_date,
                        from: bv_from,
                        to: bv_to,
                        cc: bv_cc,
                        bcc: bv_bcc,
                        attachments: bv_attachments
                    };
                    if (api.cache.debug_xhr_fetch) {
                        email["$email_node"] = bv_email;
                        email["$thread_node"] = bv_thread_container;
                    }
                    //console.log(email);
                    res.push(email);
                }
            }

            return res;
        } catch (error) {
            console.warn("Gmail.js encountered an error trying to parse email-data on bv request!", error);
            return null;
        }
    };

    api.tools.parse_bv_embedded_json = function (json) {
        // ensure JSON-format is known and understood?
        // JSON-format is not simple to understand, code here is bases on hypothesis
        let thread_root = json["0"]["0"];
        if (!thread_root || !Array.isArray(thread_root)) {
            return null;
        }

        try {
            const res = [];

            const bv_threads = thread_root; // array
            for (let bv_thread_container of bv_threads) {
                const bv_thread_subject = bv_thread_container["4"]["0"];
                const bv_thread_id = bv_thread_container["4"]["3"];

                let bv_emails = bv_thread_container["4"]["4"]; // array
                for (let bv_email of bv_emails) {
                    //console.log(bv_email)
                    const bv_email_id = bv_email["0"];
                    const bv_legacy_email_id = bv_email["55"];
                    const bv_email_smtp_id = ""; //bv_email["16"] is smtp_id of previous email in the conversation
                    //const bv_email["16"] !==undefined ? bv_email["16"] : ""; //present only if user is the sender ?
                    const bv_email_subject = bv_thread_subject; //value present on thread but not on email
                    const bv_email_timestamp = Number.parseInt(bv_email["17"]); //another timestamp with same value present on bv_email["31"]
                    const bv_email_date = new Date(bv_email_timestamp);
                    const bv_email_content_html = ""; //Not present in bv request

                    const bv_email_is_draft = api.tools.parse_fd_bv_is_draft(bv_email["10"]);

                    //TODO
                    const bv_attachments = []; //Present but need a new parser (not urgent, present in fd email)

                    //TODO : check if it's OK
                    const bv_from = {
                        address: bv_email["1"]["1"] !== undefined ? bv_email["1"]["1"] : "",
                        name: bv_email["1"]["2"] !== undefined ? bv_email["1"]["2"] : ""
                    };

                    const bv_to = []; //Not present in bv request
                    const bv_cc = []; //Not present in bv request
                    const bv_bcc = []; //Not present in bv request

                    const email = {
                        id: bv_email_id,
                        is_draft: bv_email_is_draft,
                        legacy_email_id: bv_legacy_email_id,
                        thread_id: bv_thread_id,
                        smtp_id: bv_email_smtp_id,
                        subject: bv_email_subject,
                        timestamp: bv_email_timestamp,
                        content_html: bv_email_content_html,
                        date: bv_email_date,
                        from: bv_from,
                        to: bv_to,
                        cc: bv_cc,
                        bcc: bv_bcc,
                        attachments: bv_attachments
                    };
                    if (api.cache.debug_xhr_fetch) {
                        email["$email_node"] = bv_email;
                        email["$thread_node"] = bv_thread_container;
                    }
                    //console.log(email);
                    res.push(email);
                }
            }

            return res;
        } catch (error) {
            console.warn("Gmail.js encountered an error trying to parse email-data on bv request!", error);
            return null;
        }


    };


    api.tools.parse_sent_message_html_payload = function(sent_email) {
        let sent_email_content_html = null;
        try {
            const sent_html_containers = sent_email["9"]["2"];

            for (let sent_html_container of sent_html_containers) {
                sent_email_content_html = (sent_email_content_html || "") + sent_html_container["2"];
            }
        }
        catch(e) {
            // don't crash gmail when we cant parse email-contents
        }

        return sent_email_content_html;
    };

    api.tools.parse_sent_message_attachments = function(json) {
        let res = [];

        if (Array.isArray(json)) {
            for (let item of json) {

                res.push({
                    id: item["5"],
                    name: item["2"],
                    type: item["1"],
                    url: item["6"],
                    size: Number.parseInt(item["3"])
                });
            }
        }

        return res;
    };

    api.tools.parse_sent_message_payload = function(json) {
        try
        {
            let sent_email = json;
            //console.log(sent_email);

            const sent_email_id = sent_email["0"];

            const sent_email_subject = sent_email["7"];
            const sent_email_timestamp = Number.parseInt(sent_email["6"]);
            const sent_email_date = new Date(sent_email_timestamp);

            const sent_email_content_html = api.tools.parse_sent_message_html_payload(sent_email);
            const sent_email_ishtml = sent_email["8"]["6"];

            const sent_attachments = api.tools.parse_sent_message_attachments(sent_email["11"]);

            const sent_from = api.tools.parse_fd_bv_contact(sent_email["1"]);
            const sent_to = api.tools.parse_fd_bv_contacts(sent_email["2"]);
            const sent_cc = api.tools.parse_fd_bv_contacts(sent_email["3"]);
            const sent_bcc = api.tools.parse_fd_bv_contacts(sent_email["4"]);

            const email = {
                1: sent_email_id,
                id: sent_email_id,
                subject: sent_email_subject,
                timestamp: sent_email_timestamp,
                content_html: sent_email_content_html,
                ishtml: sent_email_ishtml,
                date: sent_email_date,
                from: sent_from,
                to: sent_to,
                cc: sent_cc,
                bcc: sent_bcc,
                attachments: sent_attachments,
                email_node: json
            };

            return email;
        }
        catch (error) {
            console.warn("Gmail.js encountered an error trying to parse sent message!", error);
            return null;
        }
    };

    api.tools.parse_sent_message_payload_new = function(json) {
        try
        {
            const parse_fd_bv_contact_new = (a) => {
                if (a && a[1]) {
                    return { name: a[2] || "", address: a[1] };
                } else {
                    return undefined;
                }
            };

            const parse_fd_bv_contacts_new = (a) => {
                if (Array.isArray(a)) {
                    return a.map(parse_fd_bv_contact_new).filter(a => a);
                } else {
                    return [];
                }
            };

            const parse_sent_message_attachments_new = (json) => {
                if (Array.isArray(json)) {
                    return json.map(item => ({
                        id: item[4],
                        name: item[1],
                        type: item[0],
                        url: item[5],
                        size: Number.parseInt(item[2])
                    }));
                } else {
                    return [];
                }
            };

            const parse_sent_message_html_payload_new = (sent_email) => {
                let sent_email_content_html = null;
                try {
                    const sent_html_containers = sent_email[8][1];
                    for (let sent_html_container of sent_html_containers) {
                        sent_email_content_html = (sent_email_content_html || "") + sent_html_container[1];
                    }
                } catch(err) {
                    // don't crash gmail when we cant parse email-contents
                    api.tools.error("Failed to parse html", err);
                }

                return sent_email_content_html;
            };

            let sent_email = json;
            //console.log(sent_email);

            const sent_email_id = sent_email[0];

            const sent_email_subject = sent_email[7];
            const sent_email_timestamp = sent_email[6];
            const sent_email_date = new Date(sent_email_timestamp);

            const sent_email_content_html = parse_sent_message_html_payload_new(sent_email);
            const sent_email_ishtml = sent_email[8][6];
            const sent_attachments = parse_sent_message_attachments_new(sent_email[11]);

            const sent_from = parse_fd_bv_contact_new(sent_email[1]);
            const sent_to = parse_fd_bv_contacts_new(sent_email[2]);
            const sent_cc = parse_fd_bv_contacts_new(sent_email[3]);
            const sent_bcc = parse_fd_bv_contacts_new(sent_email[4]);

            const email = {
                1: sent_email_id,
                id: sent_email_id,
                subject: sent_email_subject,
                timestamp: sent_email_timestamp,
                content_html: sent_email_content_html,
                ishtml: sent_email_ishtml,
                date: sent_email_date,
                from: sent_from,
                to: sent_to,
                cc: sent_cc,
                bcc: sent_bcc,
                attachments: sent_attachments,
                email_node: json
            };

            return email;
        }
        catch (error) {
            console.warn("Gmail.js encountered an error trying to parse sent message!", error);
            return null;
        }
    };

    api.tools.parse_request_payload = function(params, events, force) {
        const pathname = api.tools.get_pathname_from_url(params.url_raw);
        if (!force && !pathname) {
            return;
        }

        const isSynch = (pathname || "").endsWith("/i/s");
        const isFetch = (pathname || "").endsWith("/i/fd");
        if (!force && !isFetch && !isSynch) {
            return;
        }

        if (isFetch) {
            // register event, so that after triggers (where we parse response-data) gets triggered.
            events.load_email_data = [null];
        }

        const threads = api.tools.extract_from_graph(params, api.check.data.is_thread);
        // console.log("Threads:");
        // console.log(threads);
        const emails = [
            ...api.tools.extract_from_graph(params.body_params, api.check.data.is_email),
            ...api.tools.extract_from_graph(params.body_params, api.check.data.is_email_new),
        ];
        // console.log("Emails:", emails, "url", params.url_raw, "body", params.body_params);

        for (let email of emails) {
            // console.log("Email:");
            // console.log(email);
            for (let key in email) {
                let prop = email[key];
                if (api.check.data.is_smartlabels_array(prop)) {
                    let sent_email = api.check.data.is_email_new(email) ?
                        api.tools.parse_sent_message_payload_new(email) :
                        api.tools.parse_sent_message_payload(email);
                    if (prop.indexOf("^pfg") !== -1) {
                        events.send_message = [params.url, params.body, sent_email];
                    } else if (prop.indexOf("^scheduled") > -1) {
                        events.send_scheduled_message = [params.url, params.body, sent_email];
                    }
                }
            }
        }

        try {
            if (Array.isArray(threads) && api.check.data.is_thread(threads[0])) {
                const actionType = api.tools.check_event_type(threads[0]);

                if (actionType) {
                    // console.log(threads[0]);
                    const threadsData = threads.map(thread => api.tools.get_thread_data(thread));

                    const new_thread_ids = threads.map(thread => api.tools.get_thread_id(thread));
                    const new_email_ids = threadsData.map(threadData => api.tools.get_message_ids(threadData)).reduce((a, b) => a.concat(b), []);
                    events[actionType] = [null, params.url, params.body, new_email_ids, new_thread_ids];
                }
            }
        } catch (e) {
            console.error('Error: ', e);
        }
    };

    api.tools.parse_response = function(response) {
        // first try parse as pure json!
        if (api.check.data.is_json_string(response)) {
            try {
                let json = JSON.parse(response);
                return json;
            } catch(err) {
                // ignore, and fallback to old implementation!
            }
        }

        // early XHR interception also means we intercept HTML, CSS, JS payloads. etc
        // dont crash on those.
        if (response.startsWith("<!DOCTYPE html")
            || response.indexOf("display:inline-block") !== -1
        ) {
            return [];
        }

        let parsedResponse = [];
        let originalResponse = response;
        try {
            // gmail post response structure
            // )}]"\n<datalength><rawData>\n<dataLength><rawData>...

            // prepare response, remove eval protectors
            response = response.replace(/\n/g, " ");
            response = response.substring(response.indexOf("'") + 1, response.length);

            while(response.replace(/\s/g, "").length > 1) {

                // how long is the data to get
                let dataLength = response.substring(0, response.indexOf("[")).replace(/\s/g, "");
                if (!dataLength) {dataLength = response.length;}

                let endIndex = (parseInt(dataLength, 10) - 2) + response.indexOf("[");
                let data = response.substring(response.indexOf("["), endIndex);

                let json = JSON.parse(data);
                parsedResponse.push(json);

                // prepare response for next loop
                response = response.substring(response.indexOf("["), response.length);
                response = response.substring(data.length, response.length);
            }
        } catch (e) {
            // console.log("GmailJS post response-parsing failed.", e, originalResponse);
        }

        return parsedResponse;
    };

    /**
       parses a download_url attribute from the attachments main span-element.
     */
    api.tools.parse_attachment_url = function(url) {
        var parts = url.split(":");
        return {
            type: parts[0],
            url: parts[2] + ":" + parts[4] + ":" + parts[5]
        };
    };

    /**
       Node-friendly function to extend objects without depending on jQuery
       (which requires a browser-context)
       */
    var extend = function(target, extension) {
        for (var key in extension) {
            target[key] = extension[key];
        }
    };

    /**
       Node-friendly function to merge arrays without depending on jQuery
       (which requires a browser-context).

       All subsequent arrays are merged into the first one, to match
       $.merge's behaviour.
    */
    var merge = function(target, mergee) {

        for (var i=0; i < mergee.length; i++) {
            var value = mergee[i];
            target.push(value);
        }

        return target;
    };

    api.tools.parse_requests = function(params, xhr) {
        params.url_raw = params.url;
        params.url = api.tools.parse_url(params.url);
        if(typeof params.body === "object") {
            params.body_params = params.body;
            params.body_is_object = true;
        } else if (api.check.data.is_json_string(params.body)) {
            params.body_params = JSON.parse(params.body);
        } else if (params.body !== undefined) {
            params.body_params = api.tools.deparam(params.body);
        } else {
            params.body_params = {};
        }

        if(typeof api.tracker.events !== "object" && typeof api.tracker.actions !== "object") {
            api.tracker.events  = [];
            api.tracker.actions = [];
        }

        api.tracker.events.unshift(params);
        var events = api.tools.parse_actions(params, xhr);

        if(params.method === "POST" && typeof params.url.act === "string") {
            api.tracker.actions.unshift(params);
        }

        if(api.tracker.events.length > 50) {
            api.tracker.events.pop();
        }

        if(api.tracker.actions.length > 10) {
            api.tracker.actions.pop();
        }
        return events;
    };

    api.tools.patch = function(patchee, patch) {
        patch(patchee);
    };


    api.tools.cache_email_data = function(email_data, data_source) {
        /**
		 * Data source could be
		 * 	- fd_request_payload
		 * 	- bv_request_payload
		 * 	- fd_embedded_json
		 * 	- bv_embedded_json
		 */
        if (email_data === null) {
            return;
        }

        const c = api.cache;

        let isUpdateAuthorized = false;
        if (data_source === "fd_request_payload" || data_source === "fd_embedded_json") {
            isUpdateAuthorized = true;
        }


        for (let email of email_data) {
            // cache email directly on IDs
            if (c.emailIdCache[email.id] === undefined) {
                //console.log("ADD email cache",data_source,email);
                c.emailIdCache[email.id] = email;
                c.emailLegacyIdCache[email.legacy_email_id] = email;
            }
            else if (isUpdateAuthorized) {
                //console.log("UPDATE email cache",data_source,email);
                c.emailIdCache[email.id] = email;
                c.emailLegacyIdCache[email.legacy_email_id] = email;
            }

            // ensure we have a thread-object before appending emails to it!
            let thread = c.threadCache[email.thread_id];
            if (!thread) {
                thread = {
                    thread_id: email.thread_id,
                    emails: []
                };
                c.threadCache[email.thread_id] = thread;
            }

            // only append email to cache if not already there.
            if (thread.emails.filter(i => i.id === email.id).length === 0) {
                //console.log("append email to thread cache",data_source, email) ;
                thread.emails.push(email);
            }
            // Only update cache with data source fd_request_payload and fd_embedded_json
            else if (isUpdateAuthorized) {
                let index = thread.emails.findIndex(i => i.id === email.id);
                //console.log("update email in thread cache",data_source,email);
                thread.emails[index] = email;
            }
        }
    };

    api.tools.xhr_watcher = function () {
        if (api.tracker.xhr_init) {
            return;
        }

        api.instanceId = Symbol('gmail-js-' + (performance ? performance.now() : Date.now()));
        api.tracker.xhr_init = true;

        const win = api.helper.get_xhr_window();

        api.tools.patch(win.XMLHttpRequest.prototype.open, (orig) => {
            win.XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
                var out = orig.apply(this, arguments);
                this.xhrParams = {
                    method: method.toString(),
                    url: url.toString()
                };
                Object.defineProperty(this, api.instanceId, {
                    value: Object.freeze({
                        method: method.toString(),
                        url: url.toString()
                    })
                });
                return out;
            };
        });

        api.tools.patch(win.XMLHttpRequest.prototype.send, (orig) => {
            win.XMLHttpRequest.prototype.send = function (body) {
                // parse the xhr request to determine if any events should be triggered
                var events = false;
                if (this.xhrParams) {
                    this.xhrParams.body = body;

                    // restore original values of xhrParams, if they were altered by upstream instances of gmail.js
                    if (typeof this.xhrParams.url !== 'string') {
                        if (
                            this[api.instanceId]
                            && this[api.instanceId].url
                        ) {
                            this.xhrParams.url = this[api.instanceId].url;
                            delete this.xhrParams.url_raw;
                            delete this.xhrParams.body_params;
                        }
                    }

                    events = api.tools.parse_requests(this.xhrParams, this);
                }

                // fire before events
                if (api.observe.trigger("before", events, this)) {
                    // if before events were fired, rebuild arguments[0]/body strings
                    // TODO: recreate the url if we want to support manipulating url args (is there a use case where this would be needed?)
                    if (api.check.is_new_data_layer()) {
                        body = arguments[0] = this.xhrParams.body_is_object
                            ? this.xhrParams.body_params
                            : JSON.stringify(this.xhrParams.body_params);
                    } else {
                        body = arguments[0] = this.xhrParams.body_is_object
                            ? this.xhrParams.body_params
                            : $.param(this.xhrParams.body_params,true).replace(/\+/g, "%20");
                    }
                }

                // if any matching after events, bind onreadystatechange callback
                // also: on new gmail we want to intercept email-data from /i/fd or /i/bv request responses.
                if (api.observe.bound(events, "after") || api.check.is_new_data_layer()) {
                    var curr_onreadystatechange = this.onreadystatechange;
                    var xhr = this;
                    this.onreadystatechange = function(progress) {
                        if (this.readyState === this.DONE) {
                            if (progress.target.responseType === "" || progress.target.responseType === "text") {
                                xhr.xhrResponse = api.tools.parse_response(progress.target.responseText);
                            } else {
                                xhr.xhrResponse = progress.target.response;
                            }

                            // intercept email-data passively, instead of actively trying to fetch it later!
                            // (which we won't be able to do once 2019 hits anyway...)
                            if (api.check.is_new_data_layer()) {
                                const pathName = api.tools.get_pathname_from_url(xhr.xhrParams.url_raw);
                                if (pathName.endsWith("/i/fd")) {
                                    let parsed_emails = api.tools.parse_fd_request_payload(xhr.xhrResponse);
                                    if (parsed_emails !== undefined && parsed_emails !== null) {
                                        api.tools.cache_email_data(parsed_emails,"fd_request_payload");
                                        events.load_email_data = [parsed_emails];
                                    }
                                }
                                if (pathName.endsWith("/i/bv")) {
                                    let parsed_emails = api.tools.parse_bv_request_payload(xhr.xhrResponse);
                                    if (parsed_emails !== undefined && parsed_emails !== null) {
                                        api.tools.cache_email_data(parsed_emails,"bv_request_payload");
                                        events.load_email_data = [parsed_emails];
                                    }
                                }
                            }
                            api.observe.trigger("after", events, xhr);
                        }
                        if (curr_onreadystatechange) {
                            curr_onreadystatechange.apply(this, arguments);
                        }
                    };
                }

                // send the original request
                var out = orig.apply(this, arguments);

                // fire on events
                api.observe.trigger("on", events, this);
                return out;
            };
        });
    };

    api.tools.embedded_data_watcher = function() {

        if (api.tracker.embedded_data_init) {
            return;
        }

        api.tracker.embedded_data_init = true;

        var original_GM_setData = window._GM_setData;
        window._GM_setData = function(data) {

            if (data !== undefined && data.Cl6csf !== undefined && data.Cl6csf[0] !== undefined && data.Cl6csf[0][2] !== undefined) {
                //console.log('Cl6csf',JSON.parse(data.Cl6csf[0][2]));
                let parsed_emails = api.tools.parse_fd_embedded_json(JSON.parse(data.Cl6csf[0][2]));
                api.tools.cache_email_data(parsed_emails,"fd_embedded_json");
                //TODO : event is not load yet at this time of workflow, addon is necessary to observe load email event for this case
                //events.load_email_data = [parsed_emails];

            }
            if (data !== undefined && data.a6jdv !== undefined && data.a6jdv[0] !== undefined && data.a6jdv[0][2] !== undefined) {
                //console.log('a6jdv',JSON.parse(data.a6jdv[0][2]));
                let parsed_emails = api.tools.parse_bv_embedded_json(JSON.parse(data.a6jdv[0][2]));
                api.tools.cache_email_data(parsed_emails,"bv_embedded_json");
                //TODO : event is not load yet at this time of workflow, addon is necessary to observe load email event for this case
                //events.load_email_data = [parsed_emails];

            }
            if (data !== undefined && data.sBEv4c !== undefined) {
                for (let item of data.sBEv4c) {
                    // the index of the mla is not confirmed to be stable
                    // it was observed to be at position 3, but we should not depend on it
                    if (item[0] === "mla") {
                        api.tracker.mla = item;
                    }
                }
            }

            original_GM_setData(data);
        };
    };

    api.helper.get_xhr_window = function() {
        // in the new gmail UI, in the case of window_opener as xhr window,
        // some events do not work, for example before_send event
        if (api.check.is_new_gui()) {
            return top;
        }

        var js_frame = null;
        if (top.document.getElementById("js_frame")){
            js_frame = top.document.getElementById("js_frame");
        } else if (window_opener) {
            js_frame = window_opener.top.document.getElementById("js_frame");
        }

        if (!js_frame){
            if (window_opener) {
                js_frame = window_opener.top;
            } else {
                js_frame = top;
            }
        }

        var win;
        if (js_frame.contentDocument) {
            win = js_frame.contentDocument.defaultView;
        } else {
            win = js_frame;
        }

        return win;
    };


    api.observe.http_requests = function() {
        return api.tracker.events;
    };


    api.observe.actions = function() {
        return api.tracker.actions;
    };

    /**
       Bind a specified callback to an array of callbacks against a specified type & action
    */
    api.observe.bind = function(type, action, callback) {

        // set up watchdog data structure
        if(typeof api.tracker.watchdog !== "object") {
            api.tracker.watchdog = {
                before: {},
                on: {},
                after: {},
                dom: {}
            };
            api.tracker.bound = {};
        }
        if(typeof api.tracker.watchdog[type] !== "object") {
            api.tools.error("api.observe.bind called with invalid type: " + type);
        }

        // ensure we are watching xhr requests
        if(type !== "dom") {
            api.tools.xhr_watcher();
        }

        // add callback to an array in the watchdog
        if(typeof api.tracker.watchdog[type][action] !== "object") {
            api.tracker.watchdog[type][action] = [];
        }
        api.tracker.watchdog[type][action].push(callback);

        // allow checking for bound events to specific action/type as efficiently as possible (without in looping) - bit dirtier code,
        // but lookups (api.observer.bound) are executed by the hundreds & I think the extra efficiency is worth the tradeoff
        api.tracker.bound[action] = typeof api.tracker.bound[action] === "undefined" ? 1 : api.tracker.bound[action]+1;
        api.tracker.bound[type] = typeof api.tracker.bound[type] === "undefined" ? 1 : api.tracker.bound[type]+1;
        //api.tracker.watchdog[action] = callback;
    };

    /**
       an on event is observed just after gmail sends an xhr request
    */
    api.observe.on = function(action, callback, response_callback) {

        // check for DOM observer actions, and if none found, the assume an XHR observer
        if(api.observe.on_dom(action, callback)) return true;

        // bind xhr observers
        api.observe.bind("on", action, callback);
        if (response_callback) {
            api.observe.after(action, callback);
        }
    };

    /**
       an before event is observed just prior to the gmail xhr request being sent
       before events have the ability to modify the xhr request before it is sent
    */
    api.observe.before = function(action, callback) {
        api.observe.bind("before", action, callback);
    };

    /**
       an after event is observed when the gmail xhr request returns from the server
       with the server response
    */
    api.observe.after = function(action, callback) {
        api.observe.bind("after", action, callback);
    };

    /**
       Checks if a specified action & type has anything bound to it
       If type is null, will check for this action bound on any type
       If action is null, will check for any actions bound to a type
    */
    api.observe.bound = function(action, type) {
        if (typeof api.tracker.watchdog !== "object") return false;
        if (action) {

            // if an object of actions (triggered events of format { event: [response] }) is passed, check if any of these are bound
            if(typeof action === "object") {
                var match = false;
                for (let key of Object.keys(action)) {
                    if(typeof api.tracker.watchdog[type][key] === "object") match = true;
                }
                return match;
            }
            if(type) return typeof api.tracker.watchdog[type][action] === "object";
            return api.tracker.bound[action] > 0;
        } else {
            if(type) return api.tracker.bound[type] > 0;
            api.tools.error("api.observe.bound called with invalid args");
        }
    };

    /**
       Clear all callbacks for a specific type (before, on, after, dom) and action
       If action is null, all actions will be cleared
       If type is null, all types will be cleared
    */
    api.observe.off = function(action, type) {

        // if watchdog is not set, bind has not yet been called so nothing to turn off
        if(typeof api.tracker.watchdog !== "object") return true;

        // loop through applicable types
        var types = type ? [ type ] : [ "before", "on", "after", "dom" ];
        for (let type of types) {
            if(typeof api.tracker.watchdog[type] !== "object") return true; // no callbacks for this type

            // if action specified, remove any callbacks for this action, otherwise remove all callbacks for all actions
            if(action) {
                if(typeof api.tracker.watchdog[type][action] === "object") {
                    api.tracker.bound[action] -= api.tracker.watchdog[type][action].length;
                    api.tracker.bound[type] -= api.tracker.watchdog[type][action].length;
                    delete api.tracker.watchdog[type][action];
                }
            } else {
                for (let act of Object.keys(api.tracker.watchdog[type])) {
                    if(typeof api.tracker.watchdog[type][act] === "object") {
                        api.tracker.bound[act] -= api.tracker.watchdog[type][act].length;
                        api.tracker.bound[type] -= api.tracker.watchdog[type][act].length;
                        delete api.tracker.watchdog[type][act];
                    }
                }
            }
        }
    };

    /**
       Trigger any specified events bound to the passed type
       Returns true or false depending if any events were fired
    */
    api.observe.trigger = function(type, events, xhr) {
        if(!events) return false;
        var fired = false;
        for (let [action, response] of Object.entries(events)) {

            // we have to do this here each time to keep backwards compatibility with old response_callback implementation
            response = [...response]; // break the reference so it doesn"t keep growing each trigger
            if(type === "after") response.push(xhr.xhrResponse); // backwards compat for after events requires we push onreadystatechange parsed response first
            response.push(xhr);
            if(api.observe.bound(action, type)) {
                fired = true;
                for (let callback of api.tracker.watchdog[type][action]) {
                    callback.apply(undefined, response);
                }
            }
        }
        return fired;
    };

    /**
       Trigger any specified DOM events passing a specified element & optional handler
    */
    api.observe.trigger_dom = function(observer, element, handler) {

        // if no defined handler, just call the callback
        if (!handler) {
            handler = function(match, callback) {
                callback(match);
            };
        }
        if (!api.tracker.watchdog.dom[observer]) {
            return;
        }
        for (let callback of api.tracker.watchdog.dom[observer]) {
            handler(element, callback);
        }
    };

    // pre-configured DOM observers
    // map observers to DOM class names
    // as elements are inserted into the DOM, these classes will be checked for and mapped events triggered,
    // receiving "e" event object, and a jquery bound inserted DOM element
    // NOTE: supported observers must be registered in the supported_observers array as well as the dom_observers config
    // Config example: event_name: {
    //                   class: "className", // required - check for this className in the inserted DOM element
    //                   selector: "div.className#myId", // if you need to match more than just the className of a specific element to indicate a match, you can use this selector for further checking (uses element.is(selector) on matched element). E.g. if there are multiple elements with a class indicating an observer should fire, but you only want it to fire on a specific id, then you would use this
    //                   sub_selector: "div.className", // if specified, we do a jquery element.find for the passed selector on the inserted element and ensure we can find a match
    //                   handler: function( matchElement, callback ) {} // if specified this handler is called if a match is found. Otherwise default calls the callback & passes the jQuery matchElement
    //                 },
    // TODO: current limitation allows only 1 action per watched className (i.e. each watched class must be
    //       unique). If this functionality is needed this can be worked around by pushing actions to an array
    //       in api.tracker.dom_observer_map below
    // console.log( "Observer set for", action, callback);
    api.observe.initialize_dom_observers = function() {
        api.tracker.dom_observer_init = true;
        api.tracker.supported_observers = ["view_thread", "view_email", "load_email_menu", "recipient_change", "compose"];
        api.tracker.dom_observers = {

            // when a thread is clicked on in a mailbox for viewing - note: this should fire at a similar time (directly after) as the open_email XHR observer
            // which is triggered by the XHR request rather than nodes being inserted into the DOM (and thus returns different information)
            "view_thread": {
                class: ["Bu", "nH"], // class depends if is_preview_pane - Bu for preview pane, nH for standard view
                sub_selector: "div.if,div.iY",
                handler: function(match, callback) {
                    match = new api.dom.thread(match);
                    callback(match);
                }
            },

            // when an individual email is loaded within a thread (also fires when thread loads displaying the latest email)
            "view_email": {
                // class depends if is_preview_pane - Bu for preview pane, nH for standard view,
                // FIXME: the empty class ("") is for emails opened after thread is rendered (causes a storm of updates)
                class: ["Bu", "nH", ""],
                handler: function(match, callback) {
                    setTimeout(() => {
                        match = match.find("div.adn.ads");
                        if (match.length) {
                            match = new api.dom.email(match);
                            callback(match);
                        }
                    }, 0);
                }
            },

            // when the dropdown menu next to the reply button is inserted into the DOM when viewing an email
            "load_email_menu": {
                class: "J-N",
                selector: "div[role=menu] div[role=menuitem]:first-child", // use the first menu item in the popoup as the indicator to trigger this observer
                handler: function(match, callback) {
                    match = match.closest("div[role=menu]");
                    callback(match);
                }
            },

            // a new email address is added to any of the to,cc,bcc fields when composing a new email or replying/forwarding
            "recipient_change": {
                class: ["vR", "afV"],
                handler: function(match, callback) {
                    // console.log("compose:recipient handler called",match,callback);

                    // we need to small delay on the execution of the handler as when the recipients field initialises on a reply (or reinstated compose/draft)
                    // then multiple DOM elements will be inserted for each recipient causing this handler to execute multiple times
                    // in reality we only want a single callback, so give other nodes time to be inserted & then only execute the callback once
                    if(typeof api.tracker.recipient_matches !== "object") {
                        api.tracker.recipient_matches = [];
                    }
                    api.tracker.recipient_matches.push(match);
                    setTimeout(function(){
                        // console.log("recipient timeout handler", api.tracker.recipient_matches.length);
                        if(!api.tracker.recipient_matches.length) return;

                        let composeRoot = [];
                        // sometimes (on copy-paste of contact in peoplekit mode) element disappears so iterate for all matches
                        api.tracker.recipient_matches.forEach(match => {
                            if (composeRoot.length === 0) {
                                composeRoot = match.closest("div.M9");
                            }
                        });

                        if (composeRoot.length === 0) {
                            api.tools.error("Can't find composeRoot for " + match);
                        }
                        var compose = new api.dom.compose(composeRoot);
                        // determine an array of all emails specified for To, CC and BCC and extract addresses into an object for the callback
                        var recipients = compose.recipients();
                        callback(compose, recipients, api.tracker.recipient_matches);

                        // reset matches so no future delayed instances of this function execute
                        api.tracker.recipient_matches = [];
                    },100);
                }
            },

            // this will fire if a new compose, reply or forward is created. it won"t fire if a reply changes to a forward & vice versa
            // passes a type of compose, reply, or forward to the callback
            "compose": {
                class: "An", // M9 would be better but this isn"t set at the point of insertion
                handler: function(match, callback) {
                    // console.log("reply_forward handler called", match, callback);

                    var originalMatch = match;
                    // look back up the DOM tree for M9 (the main reply/forward node)
                    match = match.closest("div.M9");
                    if (!match.length) return;
                    match = new api.dom.compose(match);
                    if (!match.is_inline()) {
                        //Find the close button and set an event listener so we can forward the compose_cancelled event.
                        var composeWindow = originalMatch.closest("div.AD");
                        composeWindow.find(".Ha").mouseup(function() {
                            if(api.tracker.composeCancelledCallback) {
                                api.tracker.composeCancelledCallback(match);
                            }
                            return true;
                        });
                    }
                    callback(match, match.type());
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
        for (let [act, config] of Object.entries(api.tracker.dom_observers)) {
            if (!Array.isArray(config.class)) config.class = [config.class];
            for (let className of config.class) {
                if (!api.tracker.dom_observer_map[className]) {
                    api.tracker.dom_observer_map[className] = [];
                }
                api.tracker.dom_observer_map[className].push(act);
            }
        }
        //console.log( "observer_config", api.tracker.dom_observers, "dom_observer_map", api.tracker.dom_observer_map);
    };

    /**
       Allow an application to register a custom DOM observer specific to their app.
       Adds it to the configured DOM observers and is supported by the dom insertion observer
       This method can be called two different ways:
       Args:
       action - the name of the new DOM observer
       className / args - for a simple observer, this arg can simply be the class on an inserted DOM element that identifies this event should be
       triggered. For a more complicated observer, this can be an object containing properties for each of the supported DOM observer config arguments
    */
    api.observe.register = function(action, args) {

        // check observers configured
        if (api.tracker.dom_observer_init) {
            api.tools.error("Error: Please register all custom DOM observers before binding handlers using gmail.observe.on etc");
        }
        if (!api.tracker.custom_supported_observers) {
            api.tracker.custom_supported_observers = [];
            api.tracker.custom_dom_observers = {};
        }

        // was an object of arguments passed, or just a className
        var config = {};
        if (typeof args === "object" && !Array.isArray(args)) {

            // copy over supported config
            for (let arg of ["class", "selector", "sub_selector", "handler"]) {
                if(args[arg]) {
                    config[arg] = args[arg];
                }
            }
        } else {
            config["class"] = args;
        }
        api.tracker.custom_supported_observers.push(action);
        api.tracker.custom_dom_observers[action] = config;
    };

    var getTarget = function(e) {
        // firefox does not support e.path
        if (e.path) {
            return e.path[0];
        } else {
            return e.target;
        }
    };

    // prevent gmail jacking our click-events!
    var preventGmailJacking = function() {
        // install event-handler only once!
        if (!api.tracker.jackPreventionInstalled) {
            window.addEventListener("click", (e) => {
                const target = getTarget(e);
                if (target && target !== document.body) {
                    const gmailJsButton = target.querySelector(":scope > .gmailjs");
                    if (gmailJsButton) {
                        gmailJsButton.click();
                        e.preventDefault();
                    }
                }
            });
            api.tracker.jackPreventionInstalled = true;
        }
    };


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
        if (api.tracker.supported_observers.includes(action)) {

            //console.log("observer found",api.tracker.dom_observers[action]);

            // if we haven"t yet bound the DOM insertion observer, do it now
            if(!api.tracker.observing_dom) {
                api.tracker.observing_dom = true;
                //api.tracker.dom_watchdog = {}; // store passed observer callbacks for different DOM events

                // recipient_change also needs to listen to removals
                var mutationObserver = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                        var mutation = mutations[i];
                        var removedNodes = mutation.removedNodes;
                        for (var j = 0; j < removedNodes.length; j++) {
                            var removedNode = removedNodes[j];
                            if (removedNode.className === "agh" && removedNode.querySelector("div[data-hovercard-id]")) { // contains recipient in peoplekit
                                let observer = api.tracker.dom_observer_map["afV"];
                                let handler = api.tracker.dom_observers.recipient_change.handler;
                                api.observe.trigger_dom(observer, $(mutation.target), handler);
                            } else
                            if (removedNode.className === "vR") {
                                let observer = api.tracker.dom_observer_map["vR"];
                                let handler = api.tracker.dom_observers.recipient_change.handler;
                                api.observe.trigger_dom(observer, $(mutation.target), handler);
                            }
                        }

                        // this listener will check every element inserted into the DOM
                        // for specified classes (as defined in api.tracker.dom_observers above) which indicate
                        // related actions which need triggering
                        var addedNodes = mutation.addedNodes;
                        for (var k = 0; k < addedNodes.length; k++) {
                            var addedNode = addedNodes[k];
                            api.tools.insertion_observer(addedNode, api.tracker.dom_observers, api.tracker.dom_observer_map);
                        }
                    }
                });
                mutationObserver.observe(document.body, {subtree: true, childList: true});

            }
            api.observe.bind("dom",action,callback);
            // console.log(api.tracker.observing_dom,"dom_watchdog is now:",api.tracker.dom_watchdog);
            return true;

            // support for gmail interface load event
        }
        else if(action === "compose_cancelled") {
            //console.log("set compose cancelled callback");
            api.tracker.composeCancelledCallback = callback;
            return true;
        }
        else if(action === "load") {

            // wait until the gmail interface has finished loading and then
            // execute the passed handler. If interface is already loaded,
            // then will just execute callback
            if(api.dom.inbox_content().length) {
                preventGmailJacking();
                return callback();
            }
            var load_count = 0;
            var delay = 200; // 200ms per check
            var attempts = 50; // try 50 times before giving up & assuming an error
            var timer = setInterval(function() {
                var test = api.dom.inbox_content().length;
                if(test > 0) {
                    clearInterval(timer);
                    preventGmailJacking();
                    return callback();
                } else if(++load_count > attempts) {
                    clearInterval(timer);
                    //console.log("Failed to detect interface load in " + (delay*attempts/1000) + " seconds. Will automatically fire event in 5 further seconds.");
                    setTimeout(callback, 5000);
                }
            }, delay);
            return true;
        }
        return false;
    };

    // observes every element inserted into the DOM by Gmail and looks at the classes on those elements,
    // checking for any configured observers related to those classes
    api.tools.insertion_observer = function(target, dom_observers, dom_observer_map, sub) {
        //console.log("insertion", target, target.className);
        if(!dom_observer_map) return;

        // loop through each of the inserted elements classes & check for a defined observer on that class
        var cn = target.className || "";
        var classes = cn.trim ? cn.trim().split(/\s+/) : [];
        if(!classes.length) classes.push(""); // if no class, then check for anything observing nodes with no class
        for (let className of classes) {
            var observers = dom_observer_map[className];
            if (!observers) {
                return;
            }

            for (var observer of observers) {

                // check if this is a defined observer, and callbacks are bound to that observer
                if(observer && api.tracker.watchdog && api.tracker.watchdog.dom[observer]) {
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
                        // console.log("checking for subselector", config.sub_selector, element);
                    }

                    // if an element has been found, execute the observer handler (or if none defined, execute the callback)
                    if(element.length) {

                        var handler = config.handler ? config.handler : function(match, callback) { callback(match); };
                        // console.log( "inserted DOM: class match in watchdog",observer,api.tracker.watchdog.dom[observer] );
                        api.observe.trigger_dom(observer, element, handler);
                    }
                }
            }
        }
    };


    api.tools.make_request = function (_link, method, disable_cache) {
        var link = decodeURIComponent(_link.replace(/%23/g, "#-#-#"));
        method  = method || "GET";

        link = encodeURI(link).replace(/#-#-#/gi, "%23");
        var config = {type: method, url: link, async: false, dataType:"text"};
        if (disable_cache) {
            config.cache = false;
        }
        var request = $.ajax(config);
        return request.responseText;
    };


    api.tools.make_request_async = function (_link, method, callback, error_callback, disable_cache) {
        var link = decodeURIComponent(_link.replace(/%23/g, "#-#-#"));
        method  = method || "GET";

        link = encodeURI(link).replace(/#-#-#/gi, "%23");
        var config = {type: method, url: link, async: true, dataType: "text"};
        if (disable_cache){
            config.cache = false;
        }
        $.ajax(config)
            .done(function(data, textStatus, jqxhr) {
                callback(jqxhr.responseText);
            })
            .fail(function(jqxhr, textStatus, errorThrown) {
                console.error("Request Failed", errorThrown);
                if (typeof error_callback === 'function'){
                    error_callback(jqxhr, textStatus, errorThrown);
                }
            });
    };

    /**
       Creates a request to download user-content from Gmail.
       This can be used to download email_source or attachments.

       Set `preferBinary` to receive data as an Uint8Array which is unaffected
       by string-parsing or resolving of text-encoding.

       This is required in order to correctly download attachments!
    */
    api.tools.make_request_download_promise = function (url, preferBinary) {
        // if we try to download the same email/url several times,
        // something weird happens with our cookies, causing the 302
        // redirect to mail-attachment.googleusercontent.com (MAGUC)
        // to redirect back to mail.google.com.
        //
        // mail.google.com does NOT have CORS-headers for MAGUC, so
        // this redirect (and thus our request) fails.
        //
        // Adding a random variable with a constantly changing value defeats
        // any cache, and seems to solve our problem.
        const timeStamp = Date.now();
        url += "&cacheCounter=" + timeStamp;

        let responseType = "text";
        if (preferBinary) {
            responseType = "arraybuffer";
        }

        // now go download!
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = responseType;

            request.onreadystatechange = () => {
                if (request.readyState !== XMLHttpRequest.DONE) {
                    return;
                }

                if (request.status >= 200 && request.status <= 302) {
                    const result = request.response;
                    if (result) {
                        if (preferBinary) {
                            const byteArray = new Uint8Array(result);
                            resolve(byteArray);
                        } else {
                            // result is regular text!
                            resolve(result);
                        }
                    }
                }
            };
            request.onerror = (ev) => {
                reject(ev);
            };

            request.send();
        });
    };


    api.tools.parse_view_data = function(view_data) {
        var parsed = [];
        var data = [];

        for(var j=0; j < view_data.length; j++) {
            if(view_data[j][0] === "tb") {
                for(var k=0; k < view_data[j][2].length; k++) {
                    data.push(view_data[j][2][k]);
                }
            }
        }

        for(var i=0; i < data.length; i++) {
            var x = data[i];

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
    };


    /**
     * Checks if Gmail is opened for a delegated account.
     *
     * @returns {boolean}
     */
    api.helper.get.is_delegated_inbox = function() {
        return $(".gb_Ba a.gb_f svg").length === 1;
    };


    api.helper.get.visible_emails_pre = function(customInboxQuery) {
        var page = api.get.current_page();
        var url = window.location.origin + window.location.pathname + "?ui=2&ik=" + api.tracker.ik+"&rid=" + api.tracker.rid + "&view=tl&num=120&rt=1";
        var start = $(".aqK:visible .Dj").find("span:first").text().replace(",", "").replace(".", "").split('–')[0];
        if (start) {
            start = parseInt(start - 1);
            url += "&start=" + start +
                "&sstart=" + start;
        } else {
            url += "&start=0";
        }

        var cat_label = "";

        if(page.indexOf("label/") === 0) {
            url += "&cat=" + page.split("/")[1] +"&search=cat";
        } else if(page.indexOf("category/") === 0) {
            if(page.indexOf("forums") !== -1) {
                cat_label = "group";
            } else if(page.indexOf("updates") !== -1) {
                cat_label = "notification";
            } else if(page.indexOf("promotion") !== -1) {
                cat_label = "promo";
            } else if(page.indexOf("social") !== -1) {
                cat_label = "social";
            }
            url += "&cat=^smartlabel_" + cat_label +"&search=category";
        } else if(page.indexOf("search/") === 0) {
            var at = $("input[name=at]").val();
            url += "&qs=true&q=" + page.split("/")[1] +"&at=" + at + "&search=query";
        } else if(page === "inbox"){
            if ($("div[aria-label='Social']").attr("aria-selected") === "true") {
                cat_label = "social";
                url += "&cat=^smartlabel_" + cat_label + "&search=category";
            } else if ($("div[aria-label='Promotions']").attr("aria-selected") === "true") {
                cat_label = "promo";
                url += "&cat=^smartlabel_" + cat_label + "&search=category";
            } else if ($("div[aria-label='Updates']").attr("aria-selected") === "true") {
                cat_label = "notification";
                url += "&cat=^smartlabel_" + cat_label + "&search=category";
            } else if ($("div[aria-label='Forums']").attr("aria-selected") === "true") {
                cat_label = "group";
                url += "&cat=^smartlabel_" + cat_label + "&search=category";
            } else {
                // control the behaviour with a given parameter
                if (customInboxQuery) {
                    url += "&search=" + customInboxQuery;
                }
                // tentative fix for https://github.com/KartikTalwar/gmail.js/issues/417
                else if (api.check.is_google_apps_user()) {
                    url += "&search=" + "inbox";
                } else {
                    url += "&search=" + "mbox";
                }
            }
        }else {
            url += "&search=" + page;
        }
        return url;
    };


    api.helper.get.visible_emails_post = function(get_data) {
        var emails = [];

        if (!get_data) {
            return emails;
        }

        var data = get_data.substring(get_data.indexOf("["), get_data.length);
        var json = JSON.parse(data);
        api.tracker.view_data = json;

        for(var i in api.tracker.view_data) {
            if (typeof(api.tracker.view_data[i]) === "function") {
                continue;
            }

            var cdata = api.tools.parse_view_data(api.tracker.view_data[i]);
            if(cdata.length > 0) {
                merge(emails, cdata);
            }
        }
        return emails;
    };

    api.get.visible_emails = function(customInboxQuery) {
        var url = api.helper.get.visible_emails_pre(customInboxQuery);
        var get_data = api.tools.make_request(url);
        var emails = api.helper.get.visible_emails_post(get_data);

        return emails;
    };


    api.get.visible_emails_async = function(callback, customInboxQuery) {
        var url = api.helper.get.visible_emails_pre(customInboxQuery);
        api.tools.make_request_async(url, "GET", function(get_data) {
            var emails = api.helper.get.visible_emails_post(get_data);
            callback(emails);
        });
    };


    api.get.selected_emails_data = function(customInboxQuery) {
        var selected_emails = [];
        if(!api.check.is_inside_email()){
            if($("[gh='tl'] div[role='checkbox'][aria-checked='true']").length){
                var email = null;
                var emails = api.get.visible_emails(customInboxQuery);
                $("[gh='tl'] div[role='checkbox']").each(function(index){
                    if($(this).attr("aria-checked") === "true"){
                        email = api.get.email_data(emails[index].id);
                        selected_emails.push(email);
                    }
                });
            }
        }else {
            selected_emails.push(api.get.email_data());
        }
        return selected_emails;
    };


    api.get.current_page = function(hash) {
        hash = hash || window.location.hash;

        var hashPart  = hash.split("#").pop().split("?").shift() || "inbox";

        if(hashPart.match(/\/[0-9a-zA-Z]{16,}$/gi)) {
            return "email";
        }

        var isTwopart = (hashPart.indexOf("search/") === 0
                         || hashPart.indexOf("category/") === 0
                         || hashPart.indexOf("label/") === 0);

        var result = null;
        if (!isTwopart) {
            result = hashPart.split("/").shift();
            return result;
        } else {
            var parts = hashPart.split("/");
            result = parts[0] + "/" + parts[1];
            return result;
        }
    };


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
    };

    /**
     * Re-renders the UI using the available data.
     *
     * This method does _not_ cause Gmail to fetch new data. This method is useful
     * in circumstances where Gmail has data available but does not immediately
     * render it. `observe.after` may be used to detect when Gmail has fetched the
     * relevant data. For instance, to refresh a conversation after Gmail fetches
     * its data:
     *
     *     gmail.observe.after("refresh", function(url, body, data, xhr) {
     *       if (url.view === "cv") {
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
        // first parameter of the hash stripped ("#inbox/14a16fab4adc1456" -> "#/14a16fab4adc1456" or
        // "#inbox" -> "#").
        var tempUrl;
        if (hash.indexOf("/") !== -1) {
            tempUrl = url.replace(/#.*?\//, "#/");
        } else {
            tempUrl = url.replace(/#.*/, "#");
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
    };

    api.tools.get_reply_to = function(ms13) {
        // reply to is an array if exists
        var reply_to = ms13 ? ms13[4] : [];

        // if reply to set get email from it and return it
        if (reply_to.length !== 0) {
            return api.tools.extract_email_address(reply_to[0]);
        }

        // otherwise return null
        return null;
    };

    api.tools.parse_attachment_data = function(x) {
        if (!x[7] || ! x[7][0])
        {
            return null;
        }

        var baseUrl = "";
        if (typeof(window) !== "undefined") {
            baseUrl =  window.location.origin + window.location.pathname;
        }

        var ad = x[7][0];
        api.tracker.attachment_data = ad;

        var attachments = [];
        for (var i = 0; i < ad.length; i++)
        {
            var a = ad[i];
            attachments.push({
                attachment_id: a[0],
                name: a[1],
                type: a[2],
                size: a[3],
                url: baseUrl + a[9]
            });
        }
        return attachments;
    };

    api.tools.parse_email_data = function(email_data) {
        var data = {};

        for(var i in email_data) {
            var x = email_data[i];
            if(x[0] === "cs") {
                data.thread_id = x[1];
                data.first_email= x[8][0];
                data.last_email = x[2];
                data.total_emails = x[3];
                data.total_threads = x[8];
                data.people_involved = x[15];
                data.subject = x[23];
            }

            if(x[0] === "ms") {
                if(data.threads === undefined) {
                    data.threads = {};
                }

                data.threads[x[1]] = {};
                data.threads[x[1]].is_deleted = (x[9] && x[9].indexOf("^k") > -1);
                data.threads[x[1]].reply_to_id = x[2];
                data.threads[x[1]].from = x[5];
                data.threads[x[1]].from_email = x[6];
                data.threads[x[1]].timestamp = x[7];
                data.threads[x[1]].datetime = x[24];
                data.threads[x[1]].attachments = x[21].split(",");
                data.threads[x[1]].attachments_details = x[13] ? api.tools.parse_attachment_data(x[13]) : null;
                data.threads[x[1]].subject = x[12];
                data.threads[x[1]].content_html = x[13] ? x[13][6] : x[8];
                data.threads[x[1]].to = x[13] ? x[13][1] : ((x[37] !== undefined) ? x[37][1]:[]);
                data.threads[x[1]].cc = x[13] ? x[13][2] : [];
                data.threads[x[1]].bcc = x[13] ? x[13][3] : [];
                data.threads[x[1]].reply_to = api.tools.get_reply_to(x[13]);
                data.threads[x[1]].labels = x[9];

                try { // jQuery will sometime fail to parse x[13][6], if so, putting the raw HTML
                    data.threads[x[1]].content_plain = x[13] ? $(x[13][6]).text() : x[8];
                }
                catch(e) {
                    data.threads[x[1]].content_plain = x[13] ? x[13][6] : x[8];
                }
            }
        }

        return data;
    };


    api.helper.get.email_data_pre = function(thread_id) {
        oldGmailApiDeprecated("Migrate code to use gmail.new.get.email_data() to fix this problem.");

        if(api.check.is_inside_email() && thread_id === undefined) {
            thread_id = api.get.thread_id();
        }

        var url = null;
        if(thread_id !== undefined) {
            url = window.location.origin + window.location.pathname + "?ui=2&ik=" + api.tracker.ik + "&rid=" + api.tracker.rid + "&view=cv&th=" + thread_id + "&msgs=&mb=0&rt=1&search=inbox";
        }
        return url;
    };


    api.helper.get.email_data_post = function(get_data) {
        if (!get_data) {
            return {};
        }
        var data = get_data.substring(get_data.indexOf("["), get_data.length);
        var json = JSON.parse(data);

        api.tracker.email_data = json[0];
        return api.tools.parse_email_data(api.tracker.email_data);
    };


    api.get.email_data = function(thread_id) {
        var url = api.helper.get.email_data_pre(thread_id);

        if (url !== null) {
            var get_data = api.tools.make_request(url);
            var email_data = api.helper.get.email_data_post(get_data);
            return email_data;
        }

        return {};
    };


    api.get.email_data_async = function(email_id, callback) {
        var url = api.helper.get.email_data_pre(email_id);
        if (url !== null) {
            api.tools.make_request_async(url, "GET", function (get_data) {
                var email_data = api.helper.get.email_data_post(get_data);
                callback(email_data);
            });
        } else {
            callback({});
        }
    };


    api.helper.get.legacy_email_id = function(identifier) {
        if (!identifier) {
            return null;
        } else if (api.check.data.is_legacy_email_id(identifier)) {
            return identifier;
        } else if (identifier.legacy_email_id) {
            return identifier.legacy_email_id;
        } else if (api.check.data.is_email_id(identifier)) {
            console.warn("GmailJS: Warning! Using new-style ID in method expecting legacy-style IDs! Attempting to resolve via cache, but there's no guarantee this will work!");
            const emailData = api.cache.emailIdCache[identifier];
            return emailData && emailData.legacy_email_id;
        }

        // DOMEmail
        if (identifier.$el && identifier.$el[0]) {
            identifier = identifier.$el[0]; // fallback to element-lookup.
        }

        // HTML Element
        if (identifier.dataset && identifier.dataset.legacyMessageId) {
            return identifier.dataset.legacyMessageId;
        }

        return null;
    };

    api.helper.get.new_email_id = function(identifier) {
        if (!identifier) {
            return null;
        } else if (api.check.data.is_email_id(identifier)) {
            return identifier;
        } else if (identifier.id && !identifier.$el) { // ensure to only email_data, not DomEmail!
            return identifier.id;
        } else if (api.check.data.is_legacy_email_id(identifier)) {
            console.warn("GmailJS: Warning! Using legacy-style ID in method expecting new-style IDs! Attempting to resolve via cache, but there's no guarantee this will work!");
            const emailData = api.cache.emailLegacyIdCache[identifier];
            return emailData && emailData.id;
        }

        // DOMEmail
        if (identifier.$el && identifier.$el[0]) {
            identifier = identifier.$el[0]; // fallback to element-lookup.
        }

        // HTML Element
        if (identifier.dataset && identifier.dataset.messageId) {
            let id = identifier.dataset.messageId;
            if (id.indexOf("#") === 0) {
                id = id.substring(1);
            }

            return id;
        }

        return null;
    };

    api.helper.get.thread_id = function(identifier) {
        if (!identifier) {
            return null;
        } else if (api.check.data.is_thread_id(identifier)) {
            return identifier;
        } else if (identifier.thread_id) { // NewEmailData
            return identifier.thread_id;
        } else if (api.check.data.is_email_id(identifier)) {
            console.warn("GmailJS: Warning! Using email-ID in method expecting thread-ID! Attempting to resolve via cache, but there's no guarantee this will work!");
            const emailData = api.cache.emailIdCache[identifier];
            return emailData && emailData.thread_id;
        } else if (api.check.data.is_legacy_email_id(identifier)) {
            console.warn("GmailJS: Warning! Using legacy-style ID in method expecting thread-ID! Attempting to resolve via cache, but there's no guarantee this will work!");
            const emailData = api.cache.emailLegacyIdCache[identifier];
            return emailData && emailData.thread_id;
        }

        // DOMEmail or DOMThread
        if (identifier.$el && identifier.$el[0]) {
            identifier = identifier.$el[0]; // fallback to element-lookup.
        }

        // HTML Element - Thread
        if (identifier.dataset && identifier.dataset.threadPermId) {
            let id = identifier.dataset.threadPermId;
            if (id.indexOf("#") === 0) {
                id = id.substring(1);
            }

            return id;
        }

        // HTML Element - Email
        if (identifier.dataset && identifier.dataset.messageId) {
            let id = identifier.dataset.messageId;
            if (id.indexOf("#") === 0) {
                id = id.substring(1);
            }

            console.warn("GmailJS: Warning! Using DomEmail instance to lookup thread-ID. Attempting to resolve via cache, but there's no guarantee this will work!");
            const emailData = api.cache.emailIdCache[id];
            return emailData && emailData.thread_id;
        }

        return null;
    };

    api.helper.clean_thread_id = function(thread_id) {
        // handle new gmail style email-ids
        if (thread_id.startsWith("#")) {
            thread_id = thread_id.substring(1);
        }

        return thread_id;
    };

    api.helper.get.email_source_pre = function(identifier) {
        if(!identifier && api.check.is_inside_email()) {
            identifier = api.get.email_id();
        }

        // if we have an old-style ID, construct URL based on that
        if (api.check.data.is_legacy_email_id(identifier)) {
            return window.location.origin + window.location.pathname + "?view=att&th=" + identifier + "&attid=0&disp=comp&safe=1&zw";
        }

        // otherwise default to new-style ID interface
        const email_id = api.helper.get.new_email_id(identifier);
        if(email_id) {
            return window.location.origin + window.location.pathname + "?view=att&permmsgid=" + email_id + "&attid=0&disp=comp&safe=1&zw";
        } else {
            return null;
        }
    };


    api.get.email_source = function(identifier) {
        console.warn("Gmail.js: This function has been deprecated and will be removed in an upcoming release! Please migrate to email_source_async or email_source_promise!");
        var url = api.helper.get.email_source_pre(identifier);
        if (url !== null) {
            return api.tools.make_request(url, "GET", true);
        }
        return "";
    };


    api.get.email_source_async = function(identifier, callback, error_callback, preferBinary) {
        api.get.email_source_promise(identifier, preferBinary)
            .then(callback)
            .catch(error_callback);
    };

    api.get.email_source_promise = function(identifier, preferBinary) {
        const url = api.helper.get.email_source_pre(identifier);
        if (url !== null) {
            return api.tools.make_request_download_promise(url, preferBinary);
        } else {
            return new Promise((resolve, reject) => {
                reject("Unable to resolve URL for email source!");
            });
        }
    };

    api.get.displayed_email_data = function() {
        var email_data = api.get.email_data();

        if (api.check.is_conversation_view()) {
            return get_displayed_email_data_for_thread(email_data);
        }
        else { // Supposing only one displayed email.
            return get_displayed_email_data_for_single_email(email_data);
        }
    };

    api.get.displayed_email_data_async = function (callback) {
        api.get.email_data_async(undefined, function (email_data) {
            if (api.check.is_conversation_view()) {
                callback(get_displayed_email_data_for_thread(email_data));
            }
            else { // Supposing only one displayed email.
                callback(get_displayed_email_data_for_single_email(email_data));
            }
        });
    };

    var get_displayed_email_data_for_thread = function(email_data) {
        var displayed_email_data = email_data;

        var threads = displayed_email_data.threads;
        var total_threads = displayed_email_data.total_threads;

        var hash = window.location.hash.split("#")[1] || "";
        var is_in_trash = (hash.indexOf("trash") === 0);

        for (var id in threads) {
            var email = threads[id];
            var keep_email = (is_in_trash) ? email.is_deleted : !email.is_deleted;

            if (!keep_email) {
                delete threads[id];
                total_threads.splice(total_threads.indexOf(id), 1);
                displayed_email_data.total_emails--;
                // TODO: remove people involved only in this email.
            }
        }
        return displayed_email_data;
    };

    var get_displayed_email_data_for_single_email = function(email_data) {
        var displayed_email_data = {};
        for (var id in email_data.threads) {
            var displayed_email_element = document.querySelector("div[data-legacy-message-id='" + id + "']");

            if (displayed_email_element) {
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
                    var name = api.tools.extract_name(recipient.replace(address, "")) || "";

                    displayed_email_data.people_involved.push(
                        [name, address]
                    );
                });

                break;
            }
        }
        return displayed_email_data;
    };


    api.check.is_conversation_view = function() {
        if( api.check.is_new_data_layer() ) {
            var conversation_flag = undefined;
            conversation_flag = api.tracker.globals[24].indexOf(7164);
            return conversation_flag !== -1;
        } else {	//To handle classic gmail UI
            var flag_name = "bx_vmb";
            var flag_value = undefined;
            var array_with_flag = api.tracker.globals[17][4][1];
            for (var i = 0; i < array_with_flag.length; i++) {
                var current = array_with_flag[i];
                if (current[0] === flag_name) {
                    flag_value = current[1];
                    break;
                }
            }
            return flag_value === "0" || flag_value === undefined;
        }
    };

    api.tools.extract_email_address = function(str) {
        var regex = /[\+a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+/gi;
        var matches = (str) ? str.match(regex) : undefined;

        return (matches) ? matches[0] : undefined;
    };


    api.tools.extract_name = function(str) {
        var regex = /[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF"._\s-]+/gi;
        var matches = (str) ? str.match(regex) : undefined;

        return (matches && matches[0]) ? matches[0].trim() : undefined;
    };


    api.tools.i18n = function(label) {
        var locale = api.get.localization();
        var dictionary;

        switch (locale) {
        case "fr":
            dictionary = {
                "inbox": "Boîte de réception",
                "drafts": "Brouillons",
                "spam": "Spam",
                "forums": "Forums",
                "updates": "Mises à jour",
                "promotions": "Promotions",
                "social_updates": "Réseaux sociaux"
            };
            break;

        case "no":
            dictionary = {
                "inbox": "Innboks",
                "drafts": "Utkast",
                "spam": "Søppelpost",
                "forums": "Forumer",
                "updates": "Oppdateringer",
                "promotions": "Reklame",
                "social_updates": "Sosialt"
            };
            break;

        case "nl":
            dictionary = {
                "inbox": "Postvak IN",
                "drafts": "Concepten",
                "spam": "Spam",
                "forums": "Forums",
                "updates": "Updates",
                "promotions": "Reclame",
                "social_updates": "Sociaal"
            };
            break;

        case "it":
            dictionary = {
                "inbox": "Posta in arrivo",
                "drafts": "Bozza",
                "spam": "Spam",
                "forums": "Forum",
                "updates": "Aggiornamenti",
                "promotions": "Promozioni",
                "social_updates": "Social"
            };
            break;

        case "en":
        default:
            dictionary = {
                "inbox": "Inbox",
                "drafts": "Drafts",
                "spam": "Spam",
                "forums": "Forums",
                "updates": "Updates",
                "promotions": "Promotions",
                "social_updates": "Social Updates"
            };
            break;
        }

        return dictionary[label];
    };

    var create_generic_toolbar_button = function(content_html, onClickFunction, basicStyle, defaultStyle, styleClass, selector) {
        var container = $(document.createElement("div"));
        container.attr("class","G-Ni J-J5-Ji");

        var button = $(document.createElement("div"));
        var buttonClasses = "T-I J-J5-Ji gmailjs ";
        if(styleClass !== undefined &&
            styleClass !== null &&
            styleClass !== ""){
            buttonClasses += basicStyle+styleClass;
        }else{
            buttonClasses += basicStyle+defaultStyle;
        }
        button.attr("class", buttonClasses);

        button.html(content_html);
        button.click(onClickFunction);

        var content = $(document.createElement("div"));
        content.attr("class","asa");

        container.html(button);

        selector.append(container);

        return container;
    };

    api.tools.add_toolbar_button = function(content_html, onClickFunction, styleClass) {
        var basicLeftStyle = "lS ";
        var defaultLeftStyle = "T-I-ax7 ar7";

        return create_generic_toolbar_button(content_html, onClickFunction, basicLeftStyle, defaultLeftStyle, styleClass, api.dom.toolbar());
    };

    api.tools.add_right_toolbar_button = function(content_html, onClickFunction, styleClass) {
        var basicRightStyle = "ash ";
        var defaultRightStyle = "T-I-ax7 L3";

        return create_generic_toolbar_button(content_html, onClickFunction, basicRightStyle, defaultRightStyle, styleClass, api.dom.right_toolbar());
    };

    api.tools.add_compose_button = function(composeWindow, content_html, onClickFunction, styleClass) {
        var div = $(document.createElement("div"));
        div.attr("class", "gU Up");
        div.attr("style", "cursor: pointer !important; transform: translateY(1px);");

        var button = $(document.createElement("div"));
        var buttonClasses = "T-I J-J5-Ji aoO T-I-atl L3 gmailjs gmailjscomposebutton ";
        if(styleClass !== undefined){
            buttonClasses += styleClass;
        }
        button.attr("class", buttonClasses);
        button.attr("style", "margin-left: 8px; max-width: 500px;");
        button.html(content_html);
        button.click(onClickFunction);

        div.append(button);

        var sendButton = composeWindow.find(".gU.Up").last();
        div.insertAfter(sendButton);

        return button;
    };

    api.tools.add_more_send_option = function(composeWindow, buttonText, onClickFunction, styleClass, imgClass) {
        var div = $(document.createElement("div"));
        div.attr("class", "J-N yr");
        div.attr("style", "user-select: none;");
        div.attr("role", "menuitem");

        var button = $(document.createElement("div"));
        var buttonClasses = "J-N-Jz ";
        if (styleClass !== undefined) {
            buttonClasses += styleClass;
        }
        button.attr("class", buttonClasses);
        button.attr("style", "user-select: none;");

        var img = $(document.createElement("img"));
        var imgClassFull = "J-N-JX";
        if (imgClass !== undefined){
            imgClassFull = imgClass + " " + imgClassFull;
        }
        img.attr("class", imgClassFull);
        img.attr("style", "user-select: none;");
        img.attr("role", "menuitem");
        img.attr("src", "images/cleardot.gif");
        button.append(img);

        button.append(buttonText);
        button.click(onClickFunction);

        div.append(button);

        var scheduledSend = composeWindow.find(".J-N.yr").last();
        div.insertAfter(scheduledSend);

        return button;
    };

    /**
       adds a button to an email attachment.

       'attachment'-parameter must be the object returned from api.dom.email().attachments().
       'contentHtml' should represent a 21x21 image of some kind. optional.
       'customCssClass' styling used on the buttons central area. optional.
       'tooltip' will be shown on hover.

       return-value is jQuery-instance representing the created button.
       */
    api.tools.add_attachment_button = function(attachment, contentHtml, customCssClass, tooltip, onClickFunction) {
        var button = $(document.createElement("div"));
        button.attr("class", "T-I J-J5-Ji aQv T-I-ax7 L3");
        button.attr("style", "user-select: none;");
        button.attr("aria-label", tooltip);
        button.attr("data-tooltip", tooltip);

        // make hover-state match existing buttons
        var hoverClass = "T-I-JW";
        button.mouseover(function() { this.classList.add(hoverClass); });
        button.mouseout(function() { this.classList.remove(hoverClass); });

        var div = $(document.createElement("div"));
        var divClass = "wtScjd J-J5-Ji aYr";
        if (customCssClass) {
            divClass += " " + customCssClass;
        }
        div.attr("class", divClass);
        if (contentHtml) {
            div.html(contentHtml);
        }

        button.append(div);
        button.click(onClickFunction);
        attachment.$el.find("div.aQw").append(button);

        return button;
    };

    api.tools.remove_modal_window = function() {
        $("#gmailJsModalBackground").remove();
        $("#gmailJsModalWindow").remove();
    };

    api.tools.add_modal_window = function(title, content_html, onClickOk, onClickCancel, onClickClose, okText, cancelText) {
        // By default, clicking on cancel or close should clean up the modal window
        onClickClose = onClickClose || api.tools.remove_modal_window;
        onClickCancel = onClickCancel || api.tools.remove_modal_window;

        okText = okText || "OK";
        cancelText = cancelText || "Cancel";

        var background = $(document.createElement("div"));
        background.attr("id","gmailJsModalBackground");
        background.attr("class","Kj-JD-Jh");
        background.attr("aria-hidden","true");
        background.attr("style","opacity:0.75;width:100%;height:100%;");

        // Modal window wrapper
        var container = $(document.createElement("div"));
        container.attr("id","gmailJsModalWindow");
        container.attr("class", "Kj-JD");
        container.attr("tabindex", "0");
        container.attr("role", "alertdialog");
        container.attr("aria-labelledby", "gmailJsModalWindowTitle");
        container.attr("style", "left:50%;top:50%;opacity:1;");

        // Modal window header contents
        var header = $(document.createElement("div"));
        header.attr("class", "Kj-JD-K7 Kj-JD-K7-GIHV4");

        var heading = $(document.createElement("span"));
        heading.attr("id", "gmailJsModalWindowTitle");
        heading.attr("class", "Kj-JD-K7-K0");
        heading.attr("role", "heading");
        heading.html(title);

        var closeButton = $(document.createElement("span"));
        closeButton.attr("id", "gmailJsModalWindowClose");
        closeButton.attr("class", "Kj-JD-K7-Jq");
        closeButton.attr("role", "button");
        closeButton.attr("tabindex", "0");
        closeButton.attr("aria-label", "Close");
        closeButton.click(onClickClose);

        header.append(heading);
        header.append(closeButton);

        // Modal window contents
        var contents = $(document.createElement("div"));
        contents.attr("id", "gmailJsModalWindowContent");
        contents.attr("class", "Kj-JD-Jz");
        contents.html(content_html);

        // Modal window controls
        var controls = $(document.createElement("div"));
        controls.attr("class", "Kj-JD-Jl");

        var okButton = $(document.createElement("button"));
        okButton.attr("id", "gmailJsModalWindowOk");
        okButton.attr("class", "J-at1-auR J-at1-atl");
        okButton.attr("name", "ok");
        okButton.text(okText);
        okButton.click(onClickOk);

        var cancelButton = $(document.createElement("button"));
        cancelButton.attr("id", "gmailJsModalWindowCancel");
        cancelButton.attr("name", "cancel");
        cancelButton.text(cancelText);
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

        container.on("DOMSubtreeModified", center);
        $(window).resize(center);
    };

    api.tools.toggle_minimize = function (){
        //The minimize button
        var minimizeButton = $("[alt='Minimize']")[0];

        if(minimizeButton) {
            minimizeButton.click();

            return true;
        }
        return false;
    };

    api.chat.is_hangouts = function() {
        if(api.tracker.hangouts !== undefined) {
            return api.tracker.hangouts;
        }

        // Returns true if the user is using hangouts instead of the classic chat
        var dwClasses = $(".dw");
        if(dwClasses.length > 1) {
            throw "Figuring out is hangouts - more than one dw classes found";
        }
        if(dwClasses.length === 0) {
            throw "Figuring out is hangouts - no dw classes found";
        }

        var dw = dwClasses[0];

        var chatWindows = $(".nH.aJl.nn", dw);
        if(chatWindows.length > 0) {
            // hangouts
            api.tracker.hangouts = true;
            return true;
        }

        chatWindows = $(".nH.nn", dw);

        if(chatWindows.length > 2) {
            // classic
            api.tracker.hangouts = false;
            return false;
        }
        return undefined;
    };

    /**
     * Returns data about the currently visible messages available in the DOM:
     * {
     *    from: {
     *      name: string,
     *      email: string,
     *    },
     *    summary: string, // subject and email summary
     *    thread_id: string,
     *    legacy_email_id: string,
     *    $el: HTMLElement,
     * }
     */
    api.dom.visible_messages = function() {
        const ret = [];
        // [draggable="true"] is not always on the rows for some unknown reason
        $('tbody>tr.zA[role="row"]:visible', api.dom.inbox_content())
            .each((index, msgEle) => {
                const nameAndEmail = $('*[email][name]', msgEle);
                const linkAndSubject = $('*[role=link]', msgEle);
                // example value: #thread-f:1638756560099919527|msg-f:1638756560099919527"
                const idNode = msgEle.querySelector("span[data-thread-id]");
                ret.push({
                    from: {
                        name: nameAndEmail.attr('name'),
                        email: nameAndEmail.attr('email'),
                    },
                    summary: linkAndSubject[0].innerText,
                    thread_id: api.helper.clean_thread_id(idNode && idNode.dataset && idNode.dataset.threadId || ""),
                    legacy_email_id: (idNode && idNode.dataset && idNode.dataset.legacyMessageId || ""),
                    $el: $(msgEle),
                });
            });
        return ret;
    };

    // retrieve queue of compose window dom objects
    // latest compose at the start of the queue (index 0)
    api.dom.composes = function() {
        var objs = [];
        $("div.M9").each(function(idx, el) {
            objs.push( new api.dom.compose(el));
        });
        return objs;
    };

    api.dom.helper = {
    };
    /**
      * triggers a keyboard event inside a textarea, to ensure Gmail updates
      * the underlying data-model to use the email injected into the textarea.
      */
    api.dom.helper.trigger_address = function($el) {
        // actual DOM element, no jQuery.
        let el = $el[0];
        let event = new KeyboardEvent("keydown", {
            bubbles : true,
            cancelable : true,
            key : "Tab",
            shiftKey : true,
            keyCode : 9
        });

        el.focus();
        el.dispatchEvent(event);
    };

    /**
       A compose object. Represents a compose window in the DOM and provides a bunch of methods and properties to access & interact with the window
       Expects a jQuery DOM element for the compose div
    */
    api.dom.compose = function(element) {
        if (this.constructor !== api.dom.compose) {
            // if not invoked through new(), nothing works as expected!
            return new api.dom.compose(element);
        }

        element = $(element);
        if(!element || (!element.hasClass("M9") && !element.hasClass("AD"))) api.tools.error("api.dom.compose called with invalid element");
        this.$el = element;
        return this;
    };

    extend(api.dom.compose.prototype, {
        /**
           Retrieve the compose id
        */
        id: function() {
            return this.dom("id").val();
        },

        /**
           Retrieve the draft email id
        */
        email_id: function() {
            let email_id = this.dom("draft").val();
            // handle new gmail style email-ids
            if (email_id && email_id.startsWith("#")) {
                return email_id.substring(1);
            } else {
                return email_id;
            }
        },

        /**
           Retrieve the draft thread id
        */
        thread_id: function() {
            let thread_id = this.dom("thread").val() || "";

            return api.helper.clean_thread_id(thread_id);
        },

        /**
           Is this compose instance inline (as with reply & forwards) or a popup (as with a new compose)
        */
        is_inline: function() {
            return this.$el.closest(".AO").length > 0;
        },

        /**
            Compose type - reply / forward / compose (new)
         */
        type: function() {
            return this.is_inline()
                ? this.find("input[name=subject]").val().indexOf("Fw") === 0
                    ? "forward"
                    : "reply"
                : "compose";
        },

        /**
           Retrieves to, cc, bcc and returns them in a hash of arrays
           Parameters:
           options.type  string  to, cc, or bcc to check a specific one
           options.flat  boolean if true will just return an array of all recipients instead of splitting out into to, cc, and bcc
        */
        recipients: function(options) {
            if (typeof options !== "object") options = {};
            const peopleKit = api.check.is_peoplekit_compose(this.$el);

            const type_selector = options.type ? "[name=" + options.type + "]" : "";

            const found = peopleKit ?
                this.$el.find("tr.bzf " + (type_selector || "div[name]") + " div[data-hovercard-id]").map((_, el) => ({
                    type: options.type || el.closest("div[name]").getAttribute("name"),
                    email: el.getAttribute("data-hovercard-id")
                })) :
                this.$el.find(".GS input[type=hidden]" + type_selector).map((_, el) => ({
                    type: el.name,
                    email: el.value
                }));

            if (options.flat) {
                return found.toArray().map(r => r.email);
            } else {
                let result = { to: [], cc: [], bcc: [] };
                if (options.type) {
                    result[options.type] = found.toArray()
                        .filter(r => r.type === options.type)
                        .map(r => r.email);
                } else {
                    ["to", "cc", "bcc"].forEach(type => {
                        result[type] = found.toArray()
                            .filter(r => r.type === type)
                            .map(r => r.email);
                    });
                }
                return result;
            }
        },

        /**
           Retrieve the typing area for "to" recipients, not recipients.
           Either textarea or input, which can be empty if last recipient are typed and selected (by pressing ENTER)
        */
        to: function(to) {
            const $el = this.dom("to").val(to);
            api.dom.helper.trigger_address($el);
            return $el;
        },

        /**
           Retrieve the typing area for "cc" recipients, not recipients.
           Either textarea or input, which can be empty if last recipient are typed and selected (by pressing ENTER)
        */
        cc: function(cc) {
            // ensure cc is visible before setting!
            if (cc) {
                const showCc = this.dom("show_cc");
                showCc.click();
            }

            const $el = this.dom("cc").val(cc);
            api.dom.helper.trigger_address($el);
            return $el;
        },

        /**
           Retrieve the typing area for "bcc" recipients, not recipients.
           Either textarea or input, which can be empty if last recipient are typed and selected (by pressing ENTER)
        */
        bcc: function(bcc) {
            // ensure bcc is visible before setting!
            if (bcc) {
                const showBcc = this.dom("show_bcc");
                showBcc.click();
            }

            const $el = this.dom("bcc").val(bcc);
            api.dom.helper.trigger_address($el);
            return $el;
        },

        /**
           Get/Set the current subject
           Parameters:
           subject   string  set as new subject
        */
        subject: function(subject) {
            if(subject) this.dom("all_subjects").val(subject);
            subject = this.dom("subjectbox").val();
            return subject ? subject : this.dom("subject").val();
        },

        /**
           Get the from email
           if user only has one email account they can send from, returns that email address
        */
        from: function() {
            var el = this.dom("from");
            if (el.length) {
                var fromNameAndEmail = el.val();
                if (fromNameAndEmail) {
                    return api.tools.extract_email_address(fromNameAndEmail);
                }
            }
            return api.get.user_email();
        },

        /**
           Get/Set the email body
        */
        body: function(body) {
            var el = this.dom("body");
            if(body) el.html(body);
            return el.html();
        },

        /**
            Get the email attachments
        */
        attachments: function() {
            var out = [];
            var failed = false;

            this.dom("attachments").each(function() {
                var el = $(this);

                var result = {};
                result.$el = el;
                result.name = el.find("div.vI").html();
                result.size = el.find("div.vJ").html();
                result.url = el.find("a.dO").attr("href");
                result.type = "https";

                out.push(result);
            });

            if (failed) {
                return undefined;
            } else {
                return out;
            }
        },

        /**
          Triggers the same action as clicking the "send" button would do.
          */
        send: function() {
            return this.dom("send_button").click();
        },

        /**
           Map find through to jquery element
        */
        find: function(selector) {
            return this.$el.find(selector);
        },

        /**
           Close compose window
        */
        close: function() {
            const e = document.createEvent('Events');
            e.initEvent('keydown', true, true);
            e.which = 27;
            e.keyCode = 27;

            var $body = this.dom('body');
            $body.focus();
            $body[0].dispatchEvent(e);
        },

        /**
           Retrieve preconfigured dom elements for this compose window
        */
        dom: function(lookup) {
            if (!lookup) return this.$el;
            var config = {
                to:"textarea[name=to]",
                cc:"textarea[name=cc]",
                bcc:"textarea[name=bcc]",
                id: "input[name=composeid]",
                draft: "input[name=draft]",
                thread: "input[name=rt]",
                subject: "input[name=subject]",
                subjectbox: "input[name=subjectbox]",
                all_subjects: "input[name=subjectbox], input[name=subject]",
                body: "div[contenteditable=true]:not([id=subject])",
                quoted_reply: "input[name=uet]",
                reply: "M9",
                forward: "M9",
                from: "input[name=from]",
                attachments: "div.dL",
                send_button: "div.T-I.T-I-atl:not(.gmailjscomposebutton)",
                show_cc: "span.aB.gQ.pE",
                show_bcc: "span.aB.gQ.pB"
            };

            if (api.check.is_peoplekit_compose(this.$el)) {
                config = Object.assign(config, {
                    to: "div[name=to] input",
                    cc: "div[name=cc] input",
                    bcc: "div[name=bcc] input"
                });
            }

            if(!config[lookup]) api.tools.error("Dom lookup failed. Unable to find config for \"" + lookup + "\"",config,lookup,config[lookup]);
            return this.$el.find(config[lookup]);
        }

    });

    /**
       An object for interacting with an email currently present in the DOM. Represents an individual email message within a thread
       Provides a number of methods and properties to access & interact with it
       Expects a jQuery DOM element for the email div (div.adn as returned by the "view_email" observer), or an email_id
    */
    api.dom.email = function(element) {
        if (this.constructor !== api.dom.email) {
            // if not invoked through new(), nothing works as expected!
            return new api.dom.email(element);
        }

        if (typeof element === "string" && api.check.data.is_legacy_email_id(element)) {
            this.id = element;
            this.$el = $("div.adn[data-legacy-message-id='" + this.id + "']");
        } else if (typeof element === "string" && api.check.data.is_email_id(element)) {
            const elem = document.querySelector("div.adn[data-message-id='" + element.replace("msg-f:", "\\#msg-f\\:") + "']");
            this.id = elem.dataset.legacyMessageId;
            this.$el = $(elem);
        } else if (element &&
                   ((element.classList && element.classList.contains("adn")) // DOM
                    || (element.hasClass && element.hasClass("adn"))))       // jQuery
        {
            this.$el = $(element);
            this.id = this.$el.data("legacyMessageId");
        } else {
            api.tools.error("api.dom.email called with invalid element/id");
        }

        // silence linter!
        return this;
    };

    extend(api.dom.email.prototype, {

        /**
           Get/Set the full email body as it sits in the DOM
           If you want the actual DOM element use .dom("body");
           Note: This gets & sets the body html after it has been parsed & marked up by GMAIL. To retrieve it as it exists in the email message source, use a call to .data();
        */
        body: function(body) {
            var el = this.dom("body");
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
            var el = this.dom("from");
            if (email) {
                el.attr("email",email);
            }
            if (name) {
                el.attr("name",name);
                el.html(name);
            }
            return {
                email: el.attr("email"),
                name: el.attr("name"),
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
                if (!Array.isArray(to_array)) {
                    to_array = [to_array];
                }
                var html = [];
                for (let obj in to_array) {
                    html.push( $("<span />").attr({
                        dir: "ltr",
                        email: obj.email,
                        name: obj.name
                    }).addClass("g2").html(obj.name).wrap("<p/>").parent().html());
                }
                this.dom("to_wrapper").html("to " + html.join(", "));
            }


            // loop through any matching to elements & prepare for output
            var out = [];

            this.dom("to").each(function() {
                var el = $(this);
                out.push({
                    email:  el.attr("email"),
                    name: el.attr("name"),
                    el: el
                });
            });
            return out;
        },

        /**
           Retries the DOM elements which represents the emails attachments.
           Returns undefined if UI-elements are not yet ready for parsing.
        */
        attachments: function() {
            var out = [];
            var failed = false;

            this.dom("attachments").each(function() {
                var el = $(this);

                var result = {};
                result.$el = el;
                result.name = el.find(".aV3").html();
                result.size = el.find(".SaH2Ve").html();

                // Gmail only emits the following attribute for Chrome!
                // use email_data.threads[].attachments_details in other browsers!
                var url = el.attr("download_url");
                if (url) {
                    var url_type = api.tools.parse_attachment_url(url);
                    result.url = url_type.url;
                    result.type = url_type.type;
                }

                out.push(result);
            });

            if (failed) {
                return undefined;
            } else {
                return out;
            }
        },

        /**
           Retrieve relevant email from the Gmail servers for this email
           Makes use of the gmail.get.email_data() method
           Returns an object
        */
        data: function() {
            if (typeof api.dom.email_cache !== "object") {
                api.dom.email_cache = {};
            }
            if (!api.dom.email_cache[this.id]) {

                // retrieve & cache the data for this whole thread of emails
                var data = api.get.email_data(this.id);
                for (let [email_id, email_data] of Object.entries(data.threads)) {
                    api.dom.email_cache[email_id] = email_data;
                }
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
                body: "div.a3s",
                from: "span[email].gD",
                to: "span[email].g2",
                to_wrapper: "span.hb",
                timestamp: "span.g3",
                star: "div.zd",
                attachments: "div.hq.gt div.aQH span.aZo",

                // buttons
                reply_button: "div[role=button].aaq, div[role=button].bsQ",
                menu_button: "div[role=button].aap",
                details_button: "div[role=button].ajz"
            };
            if(!config[lookup]) api.tools.error("Dom lookup failed. Unable to find config for \"" + lookup + "\"");
            return this.$el.find(config[lookup]);
        }

    });

    /**
       An object for interacting with an email currently present in the DOM. Represents a conversation thread
       Provides a number of methods and properties to access & interact with it
       Expects a jQuery DOM element for the thread wrapper div (div.if as returned by the "view_thread" observer)
    */
    api.dom.thread = function(element) {
        if (this.constructor !== api.dom.thread) {
            // if not invoked through new(), nothing works as expected!
            return new api.dom.thread(element);
        }

        // this should match the sub_selector
        if (!element || (!element.hasClass("if") && !element.hasClass("iY"))) api.tools.error("api.dom.thread called with invalid element/id");
        this.$el = element;
        return this;
    };

    extend(api.dom.thread.prototype, {

        /**
           Retrieve preconfigured dom elements for this email
        */
        dom: function(lookup) {
            if (!lookup) return this.$el;
            var config = {
                opened_email: "div.adn",
                subject: "h2.hP",
                labels: "div.hN"
            };
            if(!config[lookup]) api.tools.error("Dom lookup failed. Unable to find config for \"" + lookup + "\"");
            return this.$el.find(config[lookup]);
        }

    });

    /**
     *  Show a compose window
     * @returns {boolean}
     */
    api.compose.start_compose = function() {

        //The compose button
        var composeEl = document.getElementsByClassName("T-I T-I-KE L3")[0];
        if(composeEl) {
            composeEl.click();

            return true;
        }
        return false;
    };

    /**
     * Shadow API commands specifically made to interact with old gmail.
     * (And in the future we can either remove "regular"  api.get or replace it with something else)
     */

    api.old = {};
    api.old.get = api.get;


    /**
     * API commands specifically made to interact with new gmail.
     */
    api.new = {};
    api.new.get = {};

    /**
     * Returns the new-style email_id of the latest email visible in the DOM,
     * or for the provided email-node if provided.
     *
     * @param emailElem: Node to extract email-id from. Optional.
     */
    api.new.get.email_id = function(emailElem) {
        // ensure we have an email-element to work with
        if (!emailElem) {
            const emailElems = document.querySelectorAll(".adn[data-message-id]");
            if (!emailElems || emailElems.length === 0) {
                return null;
            }
            emailElem = emailElems[emailElems.length - 1];
        }

        return api.helper.get.new_email_id(emailElem);
    };

    /**
     * Returns the new-style thread_id of the current thread visible in the DOM.
     */
    api.new.get.thread_id = function() {
        const threadElem = document.querySelector("[data-thread-perm-id]");
        if (!threadElem) {
            return null;
        }

        return threadElem.dataset["threadPermId"];
    };

    /**
     * Returns available information about a specific email.
     *
     * @param email_id: new style email id. Legacy IDs not supported. If empty, default to latest in view.
     */
    api.new.get.email_data = function(identifier) {
        identifier = identifier || api.new.get.email_id();
        const email_id = api.helper.get.new_email_id(identifier);

        if (!email_id) {
            return null;
        } else {
            return api.cache.emailIdCache[email_id];
        }
    };

    /**
     * Returns available information about a specific thread.
     *
     * @param thread_id: new style thread id. Legacy IDs not supported. If empty, default to current.
     */
    api.new.get.thread_data = function(identifier) {
        identifier = identifier || api.new.get.thread_id();
        const thread_id = api.helper.get.thread_id(identifier);

        if (!thread_id) {
            return null;
        } else {
            return api.cache.threadCache[thread_id];
        }
    };

    // setup XHR interception as early as possible, to ensure we get all relevant email-data!
    if (typeof(document) !== "undefined") {
        api.tools.xhr_watcher();
    }

    // set up embedded data watcher as early as possible, to ensure we get all relevant email-data!
    // do not wait for document load event, embedded data are loaded before...
    // content-script must be configured with "run_at": "document_start" to be able to watch embedded data
    if (typeof(document) !== "undefined") {
        api.tools.embedded_data_watcher();
    }

    return api;
};

// make class accessible to require()-users.
if (typeof(exports) !== "undefined") {
    exports.Gmail = Gmail;
}

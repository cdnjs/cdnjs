/* w2ui-fields.js 1.4.x (nightly), part of w2ui (c) http://w2ui.com, vitmalina@gmail.com */
var w2ui  = w2ui  || {};
var w2obj = w2obj || {}; // expose object to be able to overwrite default functions

/************************************************
*  Library: Web 2.0 UI for jQuery
*  - Following objects are defines
*        - w2ui             - object that will contain all widgets
*        - w2obj            - object with widget prototypes
*        - w2utils          - basic utilities
*        - $().w2render     - common render
*        - $().w2destroy    - common destroy
*        - $().w2marker     - marker plugin
*        - $().w2tag        - tag plugin
*        - $().w2overlay    - overlay plugin
*        - $().w2menu       - menu plugin
*        - w2utils.event    - generic event object
*        - w2utils.keyboard - object for keyboard navigation
*  - Dependencies: jQuery
*
* == NICE TO HAVE ==
*   - overlay should be displayed where more space (on top or on bottom)
*   - write and article how to replace certain framework functions
*   - onComplete should pass widget as context (this)
*   - add maxHeight for the w2menu
*   - user localization from another lib (make it generic), https://github.com/jquery/globalize#readme
*   - hidden and disabled in menus
*   - isTime should support seconds
*   - TEST On IOS
*
************************************************/

var w2utils = (function () {
    var tmp = {}; // for some temp variables
    var obj = {
        version  : '1.4.3',
        settings : {
            "locale"            : "en-us",
            "date_format"       : "m/d/yyyy",
            "date_display"      : "Mon d, yyyy",
            "time_format"       : "hh:mi pm",
            "currencyPrefix"    : "$",
            "currencySuffix"    : "",
            "currencyPrecision" : 2,
            "groupSymbol"       : ",",
            "decimalSymbol"     : ".",
            "shortmonths"       : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "fullmonths"        : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "shortdays"         : ["M", "T", "W", "T", "F", "S", "S"],
            "fulldays"          : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "dataType"          : 'HTTP',   // can be HTTP, RESTFULL, JSON (case sensative)
            "phrases"           : {}        // empty object for english phrases
        },
        isInt           : isInt,
        isFloat         : isFloat,
        isMoney         : isMoney,
        isHex           : isHex,
        isAlphaNumeric  : isAlphaNumeric,
        isEmail         : isEmail,
        isDate          : isDate,
        isTime          : isTime,
        age             : age,
        date            : date,
        size            : size,
        formatNumber    : formatNumber,
        formatDate      : formatDate,
        formatTime      : formatTime,
        formatDateTime  : formatDateTime,
        stripTags       : stripTags,
        encodeTags      : encodeTags,
        escapeId        : escapeId,
        base64encode    : base64encode,
        base64decode    : base64decode,
        transition      : transition,
        lock            : lock,
        unlock          : unlock,
        lang            : lang,
        locale          : locale,
        getSize         : getSize,
        scrollBarSize   : scrollBarSize,
        checkName       : checkName,
        checkUniqueId   : checkUniqueId,
        parseRoute      : parseRoute,
        // some internal variables
        isIOS : ((navigator.userAgent.toLowerCase().indexOf('iphone') != -1 ||
                 navigator.userAgent.toLowerCase().indexOf('ipod') != -1 ||
                 navigator.userAgent.toLowerCase().indexOf('ipad') != -1) 
                 ? true : false),
        isIE : ((navigator.userAgent.toLowerCase().indexOf('msie') != -1 ||
                 navigator.userAgent.toLowerCase().indexOf('trident') != -1 )
                 ? true : false)
    };
    return obj;

    function isInt (val) {
        var re = /^[-+]?[0-9]+$/;
        return re.test(val);
    }

    function isFloat (val) {
        if (typeof val == 'string') val = val.replace(w2utils.settings.decimalSymbol, '.');
        return (typeof val === 'number' || (typeof val === 'string' && val !== '')) && !isNaN(Number(val));
    }

    function isMoney (val) {
        var se = w2utils.settings;
        var re = new RegExp('^'+ (se.currencyPrefix ? '\\' + se.currencyPrefix + '?' : '') +'[-+]?[0-9]*[\\'+ w2utils.settings.decimalSymbol +']?[0-9]+'+ (se.currencySuffix ? '\\' + se.currencySuffix + '?' : '') +'$', 'i');
        if (typeof val === 'string') {
            val = val.replace(new RegExp(se.groupSymbol, 'g'), '');
        }
        if (typeof val === 'object' || val === '') return false;
        return re.test(val);
    }

    function isHex (val) {
        var re = /^[a-fA-F0-9]+$/;
        return re.test(val);
    }

    function isAlphaNumeric (val) {
        var re = /^[a-zA-Z0-9_-]+$/;
        return re.test(val);
    }

    function isEmail (val) {
        var email = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return email.test(val);
    }

    function isDate (val, format, retDate) {
        if (!val) return false;

        var dt   = 'Invalid Date';
        var month, day, year;

        if (format == null) format = w2utils.settings.date_format;

        if (typeof val.getUTCFullYear === 'function' && typeof val.getUTCMonth === 'function' && typeof val.getUTCDate === 'function') {
            year = val.getUTCFullYear();
            month = val.getUTCMonth();
            day = val.getUTCDate();
        } else if (typeof val.getFullYear === 'function' && typeof val.getMonth === 'function' && typeof val.getDate === 'function') {
            year = val.getFullYear();
            month = val.getMonth();
            day = val.getDate();
        } else {
            val = String(val);
            // convert month formats
            if (RegExp('mon', 'ig').test(format)) {
                format = format.replace(/month/ig, 'm').replace(/mon/ig, 'm').replace(/dd/ig, 'd').replace(/[, ]/ig, '/').replace(/\/\//g, '/').toLowerCase();
                val    = val.replace(/[, ]/ig, '/').replace(/\/\//g, '/').toLowerCase();
                for (var m = 0, len = w2utils.settings.fullmonths.length; m < len; m++) {
                    var t = w2utils.settings.fullmonths[m];
                    val = val.replace(RegExp(t, 'ig'), (parseInt(m) + 1)).replace(RegExp(t.substr(0, 3), 'ig'), (parseInt(m) + 1));
                }
            }
            // format date
            var tmp  = val.replace(/-/g, '/').replace(/\./g, '/').toLowerCase().split('/');
            var tmp2 = format.replace(/-/g, '/').replace(/\./g, '/').toLowerCase();
            if (tmp2 === 'mm/dd/yyyy') { month = tmp[0]; day = tmp[1]; year = tmp[2]; }
            if (tmp2 === 'm/d/yyyy')   { month = tmp[0]; day = tmp[1]; year = tmp[2]; }
            if (tmp2 === 'dd/mm/yyyy') { month = tmp[1]; day = tmp[0]; year = tmp[2]; }
            if (tmp2 === 'd/m/yyyy')   { month = tmp[1]; day = tmp[0]; year = tmp[2]; }
            if (tmp2 === 'yyyy/dd/mm') { month = tmp[2]; day = tmp[1]; year = tmp[0]; }
            if (tmp2 === 'yyyy/d/m')   { month = tmp[2]; day = tmp[1]; year = tmp[0]; }
            if (tmp2 === 'yyyy/mm/dd') { month = tmp[1]; day = tmp[2]; year = tmp[0]; }
            if (tmp2 === 'yyyy/m/d')   { month = tmp[1]; day = tmp[2]; year = tmp[0]; }
            if (tmp2 === 'mm/dd/yy')   { month = tmp[0]; day = tmp[1]; year = tmp[2]; }
            if (tmp2 === 'm/d/yy')     { month = tmp[0]; day = tmp[1]; year = parseInt(tmp[2]) + 1900; }
            if (tmp2 === 'dd/mm/yy')   { month = tmp[1]; day = tmp[0]; year = parseInt(tmp[2]) + 1900; }
            if (tmp2 === 'd/m/yy')     { month = tmp[1]; day = tmp[0]; year = parseInt(tmp[2]) + 1900; }
            if (tmp2 === 'yy/dd/mm')   { month = tmp[2]; day = tmp[1]; year = parseInt(tmp[0]) + 1900; }
            if (tmp2 === 'yy/d/m')     { month = tmp[2]; day = tmp[1]; year = parseInt(tmp[0]) + 1900; }
            if (tmp2 === 'yy/mm/dd')   { month = tmp[1]; day = tmp[2]; year = parseInt(tmp[0]) + 1900; }
            if (tmp2 === 'yy/m/d')     { month = tmp[1]; day = tmp[2]; year = parseInt(tmp[0]) + 1900; }
        }
        if (!isInt(year)) return false;
        if (!isInt(month)) return false;
        if (!isInt(day)) return false;
        year = +year;
        month = +month;
        day = +day;
        dt = new Date(year, month - 1, day);
        // do checks
        if (month == null) return false;
        if (String(dt) == 'Invalid Date') return false;
        if ((dt.getMonth() + 1 !== month) || (dt.getDate() !== day) || (dt.getFullYear() !== year)) return false;
        if (retDate === true) return dt; else return true;
    }

    function isTime (val, retTime) {
        // Both formats 10:20pm and 22:20
        if (val == null) return false;
        var max, pm;
        // -- process american format
        val = String(val);
        val = val.toUpperCase();
        pm = val.indexOf('PM') >= 0;
        var ampm = (pm || val.indexOf('AM') >= 0);
        if (ampm) max = 12; else max = 24;
        val = val.replace('AM', '').replace('PM', '');
        val = $.trim(val);
        // ---
        var tmp = val.split(':');
        var h = parseInt(tmp[0] || 0), m = parseInt(tmp[1] || 0);
        // accept edge case: 3PM is a good timestamp, but 3 (without AM or PM) is NOT:
        if ((!ampm || tmp.length !== 1) && tmp.length !== 2) { return false; }
        if (tmp[0] === '' || h < 0 || h > max || !this.isInt(tmp[0]) || tmp[0].length > 2) { return false; }
        if (tmp.length === 2 && (tmp[1] === '' || m < 0 || m > 59 || !this.isInt(tmp[1]) || tmp[1].length !== 2)) { return false; }
        // check the edge cases: 12:01AM is ok, as is 12:01PM, but 24:01 is NOT ok while 24:00 is (midnight; equivalent to 00:00).
        // meanwhile, there is 00:00 which is ok, but 0AM nor 0PM are okay, while 0:01AM and 0:00AM are.
        if (!ampm && max === h && m !== 0) { return false; }
        if (ampm && tmp.length === 1 && h === 0) { return false; }

        if (retTime === true) {
            if (pm) h += 12;
            return {
                hours: h,
                minutes: m
            };
        }
        return true;
    }

    function age (dateStr) {
        if (dateStr === '' || dateStr == null) return '';
        var d1 = new Date(dateStr);
        if (w2utils.isInt(dateStr)) d1 = new Date(Number(dateStr)); // for unix timestamps
        if (String(d1) == 'Invalid Date') return '';

        var d2  = new Date();
        var sec = (d2.getTime() - d1.getTime()) / 1000;
        var amount = '';
        var type   = '';
        if (sec < 0) {
            amount = '<span style="color: #aaa">future</span>';
            type   = '';
        } else if (sec < 60) {
            amount = Math.floor(sec);
            type   = 'sec';
            if (sec < 0) { amount = 0; type = 'sec'; }
        } else if (sec < 60*60) {
            amount = Math.floor(sec/60);
            type   = 'min';
        } else if (sec < 24*60*60) {
            amount = Math.floor(sec/60/60);
            type   = 'hour';
        } else if (sec < 30*24*60*60) {
            amount = Math.floor(sec/24/60/60);
            type   = 'day';
        } else if (sec < 365.25*24*60*60) {
            amount = Math.floor(sec/365.25/24/60/60*10)/10;
            type   = 'month';
        } else if (sec >= 365.25*24*60*60) {
            amount = Math.floor(sec/365.25/24/60/60*10)/10;
            type   = 'year';
        }
        return amount + ' ' + type + (amount > 1 ? 's' : '');
    }

    function date (dateStr) {
        if (dateStr === '' || dateStr == null) return '';
        var d1 = new Date(dateStr);
        if (w2utils.isInt(dateStr)) d1 = new Date(Number(dateStr)); // for unix timestamps
        if (String(d1) == 'Invalid Date') return '';

        var months = w2utils.settings.shortmonths;
        var d2   = new Date(); // today
        var d3   = new Date();
        d3.setTime(d3.getTime() - 86400000); // yesterday

        var dd1  = months[d1.getMonth()] + ' ' + d1.getDate() + ', ' + d1.getFullYear();
        var dd2  = months[d2.getMonth()] + ' ' + d2.getDate() + ', ' + d2.getFullYear();
        var dd3  = months[d3.getMonth()] + ' ' + d3.getDate() + ', ' + d3.getFullYear();

        var time = (d1.getHours() - (d1.getHours() > 12 ? 12 :0)) + ':' + (d1.getMinutes() < 10 ? '0' : '') + d1.getMinutes() + ' ' + (d1.getHours() >= 12 ? 'pm' : 'am');
        var time2= (d1.getHours() - (d1.getHours() > 12 ? 12 :0)) + ':' + (d1.getMinutes() < 10 ? '0' : '') + d1.getMinutes() + ':' + (d1.getSeconds() < 10 ? '0' : '') + d1.getSeconds() + ' ' + (d1.getHours() >= 12 ? 'pm' : 'am');
        var dsp = dd1;
        if (dd1 === dd2) dsp = time;
        if (dd1 === dd3) dsp = w2utils.lang('Yesterday');

        return '<span title="'+ dd1 +' ' + time2 +'">'+ dsp +'</span>';
    }

    function size (sizeStr) {
        if (!w2utils.isFloat(sizeStr) || sizeStr === '') return '';
        sizeStr = parseFloat(sizeStr);
        if (sizeStr === 0) return 0;
        var sizes = ['Bt', 'KB', 'MB', 'GB', 'TB'];
        var i = parseInt( Math.floor( Math.log(sizeStr) / Math.log(1024) ) );
        return (Math.floor(sizeStr / Math.pow(1024, i) * 10) / 10).toFixed(i === 0 ? 0 : 1) + ' ' + sizes[i];
    }

    function formatNumber (val, groupSymbol, decimalSymbol) {
        var ret = '';
        if (groupSymbol == null) groupSymbol = w2utils.settings.groupSymbol || ',';
        if (decimalSymbol == null) decimalSymbol = w2utils.settings.decimalSymbol || '.';
        // check if this is a number
        if (w2utils.isFloat(val) || w2utils.isInt(val) || w2utils.isMoney(val)) {
            tmp = String(val).split('.');
            ret = String(tmp[0]).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + groupSymbol);
            if (tmp[1] != null) ret += w2utils.settings.decimalSymbol + tmp[1];
        }
        return ret;
    }

    function formatDate (dateStr, format) { // IMPORTANT dateStr HAS TO BE valid JavaScript Date String
        var months = w2utils.settings.shortmonths;
        var fullMonths = w2utils.settings.fullmonths;
        if (!format) format = this.settings.date_format;
        if (dateStr === '' || dateStr == null || (typeof dateStr == 'object' && !dateStr.getMonth)) return '';

        var dt = new Date(dateStr);
        if (w2utils.isInt(dateStr)) dt = new Date(Number(dateStr)); // for unix timestamps
        if (String(dt) == 'Invalid Date') return '';

        var year  = dt.getFullYear();
        var month = dt.getMonth();
        var date  = dt.getDate();
        return format.toLowerCase()
            .replace('month', w2utils.settings.fullmonths[month])
            .replace('mon', w2utils.settings.shortmonths[month])
            .replace(/yyyy/g, year)
            .replace(/yyy/g, year)
            .replace(/yy/g, year > 2000 ? 100 + parseInt(String(year).substr(2)) : String(year).substr(2))
            .replace(/(^|[^a-z$])y/g, '$1' + year)            // only y's that are not preceeded by a letter
            .replace(/mm/g, (month + 1 < 10 ? '0' : '') + (month + 1))
            .replace(/dd/g, (date < 10 ? '0' : '') + date)
            .replace(/th/g, (date == 1 ? 'st' : 'th'))
            .replace(/th/g, (date == 2 ? 'nd' : 'th'))
            .replace(/th/g, (date == 3 ? 'rd' : 'th'))
            .replace(/(^|[^a-z$])m/g, '$1' + (month + 1))     // only y's that are not preceeded by a letter
            .replace(/(^|[^a-z$])d/g, '$1' + date);           // only y's that are not preceeded by a letter
    }

    function formatTime (dateStr, format) { // IMPORTANT dateStr HAS TO BE valid JavaScript Date String
        var months = w2utils.settings.shortmonths;
        var fullMonths = w2utils.settings.fullmonths;
        if (!format) format = this.settings.time_format;
        if (dateStr === '' || dateStr == null || (typeof dateStr == 'object' && !dateStr.getMonth)) return '';

        var dt = new Date(dateStr);
        if (w2utils.isInt(dateStr)) dt  = new Date(Number(dateStr)); // for unix timestamps
        if (w2utils.isTime(dateStr)) {
            var tmp = w2utils.isTime(dateStr, true);
            dt = new Date();
            dt.setHours(tmp.hours);
            dt.setMinutes(tmp.minutes);
        }
        if (String(dt) == 'Invalid Date') return '';

        var type = 'am';
        var hour = dt.getHours();
        var h24  = dt.getHours();
        var min  = dt.getMinutes();
        var sec  = dt.getSeconds();
        if (min < 10) min = '0' + min;
        if (sec < 10) sec = '0' + sec;
        if (format.indexOf('am') !== -1 || format.indexOf('pm') !== -1) {
            if (hour >= 12) type = 'pm';
            if (hour > 12)  hour = hour - 12;
        }
        return format.toLowerCase()
            .replace('am', type)
            .replace('pm', type)
            .replace('hhh', (hour < 10 ? '0' + hour : hour))
            .replace('hh24', (h24 < 10 ? '0' + h24 : h24))
            .replace('h24', h24)
            .replace('hh', hour)
            .replace('mm', min)
            .replace('mi', min)
            .replace('ss', sec)
            .replace(/(^|[^a-z$])h/g, '$1' + hour)    // only y's that are not preceeded by a letter
            .replace(/(^|[^a-z$])m/g, '$1' + min)     // only y's that are not preceeded by a letter
            .replace(/(^|[^a-z$])s/g, '$1' + sec);    // only y's that are not preceeded by a letter
    }

    function formatDateTime(dateStr, format) {
        var fmt;
        if (dateStr === '' || dateStr == null || (typeof dateStr == 'object' && !dateStr.getMonth)) return '';
        if (typeof format !== 'string') {
            fmt = [this.settings.date_format, this.settings.time_format];
        } else {
            fmt = format.split('|');
        }
        return this.formatDate(dateStr, fmt[0]) + ' ' + this.formatTime(dateStr, fmt[1]);
    }

    function stripTags (html) {
        if (html === null) return html;
        switch (typeof html) {
            case 'number':
                break;
            case 'string':
                html = $.trim(String(html).replace(/(<([^>]+)>)/ig, ""));
                break;
            case 'object':
                for (var a in html) html[a] = this.stripTags(html[a]);
                break;
        }
        return html;
    }

    function encodeTags (html) {
        if (html === null) return html;
        switch (typeof html) {
            case 'number':
                break;
            case 'string':
                html = String(html).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
                break;
            case 'object':
                for (var a in html) html[a] = this.encodeTags(html[a]);
                break;
        }
        return html;
    }

    function escapeId (id) {
        if (id === '' || id == null) return '';
        return String(id).replace(/([;&,\.\+\*\~'`:"\!\^#$%@\[\]\(\)=<>\|\/? {}\\])/g, '\\$1');
    }

    function base64encode (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        input = utf8_encode(input);

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }

        function utf8_encode (string) {
            var string = String(string).replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        }

        return output;
    }

    function base64decode (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = utf8_decode(output);

        function utf8_decode (utftext) {
            var string = "";
            var i = 0;
            var c = 0, c2, c3;

            while ( i < utftext.length ) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }

            return string;
        }

        return output;
    }

    function transition (div_old, div_new, type, callBack) {
        var width  = $(div_old).width();
        var height = $(div_old).height();
        var time   = 0.5;

        if (!div_old || !div_new) {
            console.log('ERROR: Cannot do transition when one of the divs is null');
            return;
        }

        div_old.parentNode.style.cssText += cross('perspective', '700px') +'; overflow: hidden;';
        div_old.style.cssText += '; position: absolute; z-index: 1019; '+ cross('backface-visibility', 'hidden');
        div_new.style.cssText += '; position: absolute; z-index: 1020; '+ cross('backface-visibility', 'hidden');

        switch (type) {
            case 'slide-left':
                // init divs
                div_old.style.cssText += 'overflow: hidden; '+ cross('transform', 'translate3d(0, 0, 0)', 'translate(0, 0)');
                div_new.style.cssText += 'overflow: hidden; '+ cross('transform', 'translate3d('+ width + 'px, 0, 0)', 'translate('+ width +'px, 0)');
                $(div_new).show();
                // -- need a timing function because otherwise not working
                window.setTimeout(function() {
                    div_new.style.cssText += cross('transition', time+'s') +';'+ cross('transform', 'translate3d(0, 0, 0)', 'translate(0, 0)');
                    div_old.style.cssText += cross('transition', time+'s') +';'+ cross('transform', 'translate3d(-'+ width +'px, 0, 0)', 'translate(-'+ width +'px, 0)');
                }, 1);
                break;

            case 'slide-right':
                // init divs
                div_old.style.cssText += 'overflow: hidden; '+ cross('transform', 'translate3d(0, 0, 0)', 'translate(0, 0)');
                div_new.style.cssText += 'overflow: hidden; '+ cross('transform', 'translate3d(-'+ width +'px, 0, 0)', 'translate(-'+ width +'px, 0)');
                $(div_new).show();
                // -- need a timing function because otherwise not working
                window.setTimeout(function() {
                    div_new.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'translate3d(0px, 0, 0)', 'translate(0px, 0)');
                    div_old.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'translate3d('+ width +'px, 0, 0)', 'translate('+ width +'px, 0)');
                }, 1);
                break;

            case 'slide-down':
                // init divs
                div_old.style.cssText += 'overflow: hidden; z-index: 1; '+ cross('transform', 'translate3d(0, 0, 0)', 'translate(0, 0)');
                div_new.style.cssText += 'overflow: hidden; z-index: 0; '+ cross('transform', 'translate3d(0, 0, 0)', 'translate(0, 0)');
                $(div_new).show();
                // -- need a timing function because otherwise not working
                window.setTimeout(function() {
                    div_new.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'translate3d(0, 0, 0)', 'translate(0, 0)');
                    div_old.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'translate3d(0, '+ height +'px, 0)', 'translate(0, '+ height +'px)');
                }, 1);
                break;

            case 'slide-up':
                // init divs
                div_old.style.cssText += 'overflow: hidden; '+ cross('transform', 'translate3d(0, 0, 0)', 'translate(0, 0)');
                div_new.style.cssText += 'overflow: hidden; '+ cross('transform', 'translate3d(0, '+ height +'px, 0)', 'translate(0, '+ height +'px)');
                $(div_new).show();
                // -- need a timing function because otherwise not working
                window.setTimeout(function() {
                    div_new.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'translate3d(0, 0, 0)', 'translate(0, 0)');
                    div_old.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'translate3d(0, 0, 0)', 'translate(0, 0)');
                }, 1);
                break;

            case 'flip-left':
                // init divs
                div_old.style.cssText += 'overflow: hidden; '+ cross('transform', 'rotateY(0deg)');
                div_new.style.cssText += 'overflow: hidden; '+ cross('transform', 'rotateY(-180deg)');
                $(div_new).show();
                // -- need a timing function because otherwise not working
                window.setTimeout(function() {
                    div_new.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'rotateY(0deg)');
                    div_old.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'rotateY(180deg)');
                }, 1);
                break;

            case 'flip-right':
                // init divs
                div_old.style.cssText += 'overflow: hidden; '+ cross('transform', 'rotateY(0deg)');
                div_new.style.cssText += 'overflow: hidden; '+ cross('transform', 'rotateY(180deg)');
                $(div_new).show();
                // -- need a timing function because otherwise not working
                window.setTimeout(function() {
                    div_new.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'rotateY(0deg)');
                    div_old.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'rotateY(-180deg)');
                }, 1);
                break;

            case 'flip-down':
                // init divs
                div_old.style.cssText += 'overflow: hidden; '+ cross('transform', 'rotateX(0deg)');
                div_new.style.cssText += 'overflow: hidden; '+ cross('transform', 'rotateX(180deg)');
                $(div_new).show();
                // -- need a timing function because otherwise not working
                window.setTimeout(function() {
                    div_new.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'rotateX(0deg)');
                    div_old.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'rotateX(-180deg)');
                }, 1);
                break;

            case 'flip-up':
                // init divs
                div_old.style.cssText += 'overflow: hidden; '+ cross('transform', 'rotateX(0deg)');
                div_new.style.cssText += 'overflow: hidden; '+ cross('transform', 'rotateX(-180deg)');
                $(div_new).show();
                // -- need a timing function because otherwise not working
                window.setTimeout(function() {
                    div_new.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'rotateX(0deg)');
                    div_old.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'rotateX(180deg)');
                }, 1);
                break;

            case 'pop-in':
                // init divs
                div_old.style.cssText += 'overflow: hidden; '+ cross('transform', 'translate3d(0, 0, 0)', 'translate(0, 0)');
                div_new.style.cssText += 'overflow: hidden; '+ cross('transform', 'translate3d(0, 0, 0)', 'translate(0, 0)') + '; '+ cross('transform', 'scale(.8)') + '; opacity: 0;';
                $(div_new).show();
                // -- need a timing function because otherwise not working
                window.setTimeout(function() {
                    div_new.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'scale(1)') +'; opacity: 1;';
                    div_old.style.cssText += cross('transition', time+'s') +';';
                }, 1);
                break;

            case 'pop-out':
                // init divs
                div_old.style.cssText += 'overflow: hidden; '+ cross('transform', 'translate3d(0, 0, 0)', 'translate(0, 0)') +'; '+ cross('transform', 'scale(1)') +'; opacity: 1;';
                div_new.style.cssText += 'overflow: hidden; '+ cross('transform', 'translate3d(0, 0, 0)', 'translate(0, 0)') +'; opacity: 0;';
                $(div_new).show();
                // -- need a timing function because otherwise not working
                window.setTimeout(function() {
                    div_new.style.cssText += cross('transition', time+'s') +'; opacity: 1;';
                    div_old.style.cssText += cross('transition', time+'s') +'; '+ cross('transform', 'scale(1.7)') +'; opacity: 0;';
                }, 1);
                break;

            default:
                // init divs
                div_old.style.cssText += 'overflow: hidden; '+ cross('transform', 'translate3d(0, 0, 0)', 'translate(0, 0)');
                div_new.style.cssText += 'overflow: hidden; '+ cross('transform', 'translate3d(0, 0, 0)', 'translate(0, 0)') +'; opacity: 0;';
                $(div_new).show();
                // -- need a timing function because otherwise not working
                window.setTimeout(function() {
                    div_new.style.cssText += cross('transition', time +'s') +'; opacity: 1;';
                    div_old.style.cssText += cross('transition', time +'s');
                }, 1);
                break;
        }

        setTimeout(function () {
            if (type === 'slide-down') {
                $(div_old).css('z-index', '1019');
                $(div_new).css('z-index', '1020');
            }
            if (div_new) {
                $(div_new).css({
                    'opacity': '1',
                    '-webkit-transition': '',
                    '-moz-transition': '',
                    '-ms-transition': '',
                    '-o-transition': '',
                    '-webkit-transform': '',
                    '-moz-transform': '',
                    '-ms-transform': '',
                    '-o-transform': '',
                    '-webkit-backface-visibility': '',
                    '-moz-backface-visibility': '',
                    '-ms-backface-visibility': '',
                    '-o-backface-visibility': ''
                });
            }
            if (div_old) {
                $(div_old).css({
                    'opacity': '1',
                    '-webkit-transition': '',
                    '-moz-transition': '',
                    '-ms-transition': '',
                    '-o-transition': '',
                    '-webkit-transform': '',
                    '-moz-transform': '',
                    '-ms-transform': '',
                    '-o-transform': '',
                    '-webkit-backface-visibility': '',
                    '-moz-backface-visibility': '',
                    '-ms-backface-visibility': '',
                    '-o-backface-visibility': ''
                });
                if (div_old.parentNode) $(div_old.parentNode).css({
                    '-webkit-perspective': '',
                    '-moz-perspective': '',
                    '-ms-perspective': '',
                    '-o-perspective': ''
                });
            }
            if (typeof callBack === 'function') callBack();
        }, time * 1000);

        function cross(property, value, none_webkit_value) {
            var isWebkit=!!window.webkitURL; // jQuery no longer supports $.browser - RR
            if (!isWebkit && typeof none_webkit_value !== 'undefined') value = none_webkit_value;
            return ';'+ property +': '+ value +'; -webkit-'+ property +': '+ value +'; -moz-'+ property +': '+ value +'; '+
                '-ms-'+ property +': '+ value +'; -o-'+ property +': '+ value +';';
        }
    }

    function lock (box, msg, spinner) {
        var options = {};
        if (typeof msg === 'object') {
            options = msg;
        } else {
            options.msg     = msg;
            options.spinner = spinner;
        }
        if (!options.msg && options.msg !== 0) options.msg = '';
        w2utils.unlock(box);
        $(box).prepend(
            '<div class="w2ui-lock"></div>'+
            '<div class="w2ui-lock-msg"></div>'
        );
        var $lock = $(box).find('.w2ui-lock');
        var mess = $(box).find('.w2ui-lock-msg');
        if (!options.msg) mess.css({ 'background-color': 'transparent', 'border': '0px' });
        if (options.spinner === true) options.msg = '<div class="w2ui-spinner" '+ (!options.msg ? 'style="width: 35px; height: 35px"' : '') +'></div>' + options.msg;
        if (options.opacity != null) $lock.css('opacity', options.opacity);
        if (typeof $lock.fadeIn == 'function') {
            $lock.fadeIn(200);
            mess.html(options.msg).fadeIn(200);
        } else {
            $lock.show();
            mess.html(options.msg).show(0);            
        }
        // hide all tags (do not hide overlays as the form can be in overlay)
        $().w2tag();
    }

    function unlock (box) {
        $(box).find('.w2ui-lock').remove();
        $(box).find('.w2ui-lock-msg').remove();
    }

    function getSize (el, type) {
        var $el = $(el);
        var bwidth = {
            left    : parseInt($el.css('border-left-width')) || 0,
            right   : parseInt($el.css('border-right-width')) || 0,
            top     : parseInt($el.css('border-top-width')) || 0,
            bottom  : parseInt($el.css('border-bottom-width')) || 0
        };
        var mwidth = {
            left    : parseInt($el.css('margin-left')) || 0,
            right   : parseInt($el.css('margin-right')) || 0,
            top     : parseInt($el.css('margin-top')) || 0,
            bottom  : parseInt($el.css('margin-bottom')) || 0
        };
        var pwidth = {
            left    : parseInt($el.css('padding-left')) || 0,
            right   : parseInt($el.css('padding-right')) || 0,
            top     : parseInt($el.css('padding-top')) || 0,
            bottom  : parseInt($el.css('padding-bottom')) || 0
        };
        switch (type) {
            case 'top'      : return bwidth.top + mwidth.top + pwidth.top;
            case 'bottom'   : return bwidth.bottom + mwidth.bottom + pwidth.bottom;
            case 'left'     : return bwidth.left + mwidth.left + pwidth.left;
            case 'right'    : return bwidth.right + mwidth.right + pwidth.right;
            case 'width'    : return bwidth.left + bwidth.right + mwidth.left + mwidth.right + pwidth.left + pwidth.right + parseInt($el.width());
            case 'height'   : return bwidth.top + bwidth.bottom + mwidth.top + mwidth.bottom + pwidth.top + pwidth.bottom + parseInt($el.height());
            case '+width'   : return bwidth.left + bwidth.right + mwidth.left + mwidth.right + pwidth.left + pwidth.right;
            case '+height'  : return bwidth.top + bwidth.bottom + mwidth.top + mwidth.bottom + pwidth.top + pwidth.bottom;
        }
        return 0;
    }

    function lang (phrase) {
        var translation = this.settings.phrases[phrase];
        if (translation == null) return phrase; else return translation;
    }

    function locale (locale) {
        if (!locale) locale = 'en-us';
        if (locale.length === 5) locale = 'locale/'+ locale +'.json';
        // load from the file
        $.ajax({
            url      : locale,
            type     : "GET",
            dataType : "JSON",
            async    : false,
            cache    : false,
            success  : function (data, status, xhr) {
                w2utils.settings = $.extend(true, w2utils.settings, data);
                // apply translation to some prototype functions
                var p = w2obj.grid.prototype;
                for (var b in p.buttons) {
                    p.buttons[b].caption = w2utils.lang(p.buttons[b].caption);
                    p.buttons[b].hint    = w2utils.lang(p.buttons[b].hint);
                }
                p.msgDelete  = w2utils.lang(p.msgDelete);
                p.msgNotJSON = w2utils.lang(p.msgNotJSON);
                p.msgRefresh = w2utils.lang(p.msgRefresh);
            },
            error    : function (xhr, status, msg) {
                console.log('ERROR: Cannot load locale '+ locale);
            }
        });
    }

    function scrollBarSize () {
        if (tmp.scrollBarSize) return tmp.scrollBarSize;
        var html =
            '<div id="_scrollbar_width" style="position: absolute; top: -300px; width: 100px; height: 100px; overflow-y: scroll;">'+
            '    <div style="height: 120px">1</div>'+
            '</div>';
        $('body').append(html);
        tmp.scrollBarSize = 100 - $('#_scrollbar_width > div').width();
        $('#_scrollbar_width').remove();
        if (String(navigator.userAgent).indexOf('MSIE') >= 0) tmp.scrollBarSize  = tmp.scrollBarSize / 2; // need this for IE9+
        return tmp.scrollBarSize;
    }


    function checkName (params, component) { // was w2checkNameParam
        if (!params || typeof params.name === 'undefined') {
            console.log('ERROR: The parameter "name" is required but not supplied in $().'+ component +'().');
            return false;
        }
        if (typeof w2ui[params.name] !== 'undefined') {
            console.log('ERROR: The parameter "name" is not unique. There are other objects already created with the same name (obj: '+ params.name +').');
            return false;
        }
        if (!w2utils.isAlphaNumeric(params.name)) {
            console.log('ERROR: The parameter "name" has to be alpha-numeric (a-z, 0-9, dash and underscore). ');
            return false;
        }
        return true;
    }

    function checkUniqueId (id, items, itemsDecription, objName) { // was w2checkUniqueId
        if (!$.isArray(items)) items = [items];
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                console.log('ERROR: The parameter "id='+ id +'" is not unique within the current '+ itemsDecription +'. (obj: '+ objName +')');
                return false;
            }
        }
        return true;
    }

    function parseRoute(route) {
        var keys = [];
        var path = route
            .replace(/\/\(/g, '(?:/')
            .replace(/\+/g, '__plus__')
            .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional) {
                keys.push({ name: key, optional: !! optional });
                slash = slash || '';
                return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
            })
            .replace(/([\/.])/g, '\\$1')
            .replace(/__plus__/g, '(.+)')
            .replace(/\*/g, '(.*)');
        return {
            path  : new RegExp('^' + path + '$', 'i'),
            keys  : keys
        };
    }
})();

/***********************************************************
*  Generic Event Object
*  --- This object is reused across all other
*  --- widgets in w2ui.
*
*********************************************************/

w2utils.event = {

    on: function (eventData, handler) {
        if (!$.isPlainObject(eventData)) eventData = { type: eventData };
        eventData = $.extend({ type: null, execute: 'before', target: null, onComplete: null }, eventData);

        if (!eventData.type) { console.log('ERROR: You must specify event type when calling .on() method of '+ this.name); return; }
        if (!handler) { console.log('ERROR: You must specify event handler function when calling .on() method of '+ this.name); return; }
        if (!$.isArray(this.handlers)) this.handlers = [];
        this.handlers.push({ event: eventData, handler: handler });
    },

    off: function (eventData, handler) {
        if (!$.isPlainObject(eventData)) eventData = { type: eventData };
        eventData = $.extend({}, { type: null, execute: 'before', target: null, onComplete: null }, eventData);

        if (!eventData.type) { console.log('ERROR: You must specify event type when calling .off() method of '+ this.name); return; }
        if (!handler) { handler = null; }
        // remove handlers
        var newHandlers = [];
        for (var h = 0, len = this.handlers.length; h < len; h++) {
            var t = this.handlers[h];
            if ((t.event.type === eventData.type || eventData.type === '*') &&
                (t.event.target === eventData.target || eventData.target === null) &&
                (t.handler === handler || handler === null))
            {
                // match
            } else {
                newHandlers.push(t);
            }
        }
        this.handlers = newHandlers;
    },

    trigger: function (eventData) {
        var eventData = $.extend({ type: null, phase: 'before', target: null }, eventData, {
            isStopped: false, isCancelled: false,
            preventDefault  : function () { this.isCancelled = true; },
            stopPropagation : function () { this.isStopped   = true; }
        });
        if (eventData.phase === 'before') eventData.onComplete = null;
        var args, fun, tmp;
        if (eventData.target == null) eventData.target = null;
        if (!$.isArray(this.handlers)) this.handlers = [];
        // process events in REVERSE order
        for (var h = this.handlers.length-1; h >= 0; h--) {
            var item = this.handlers[h];
            if ((item.event.type === eventData.type || item.event.type === '*') &&
                (item.event.target === eventData.target || item.event.target === null) &&
                (item.event.execute === eventData.phase || item.event.execute === '*' || item.event.phase === '*'))
            {
                eventData = $.extend({}, item.event, eventData);
                // check handler arguments
                args = [];
                tmp  = RegExp(/\((.*?)\)/).exec(item.handler);
                if (tmp) args = tmp[1].split(/\s*,\s*/);
                if (args.length === 2) {
                    item.handler.call(this, eventData.target, eventData); // old way for back compatibility
                } else {
                    item.handler.call(this, eventData); // new way
                }
                if (eventData.isStopped === true || eventData.stop === true) return eventData; // back compatibility eventData.stop === true
            }
        }
        // main object events
        var funName = 'on' + eventData.type.substr(0,1).toUpperCase() + eventData.type.substr(1);
        if (eventData.phase === 'before' && typeof this[funName] === 'function') {
            fun = this[funName];
            // check handler arguments
            args = [];
            tmp  = RegExp(/\((.*?)\)/).exec(fun);
            if (tmp) args = tmp[1].split(/\s*,\s*/);
            if (args.length === 2) {
                fun.call(this, eventData.target, eventData); // old way for back compatibility
            } else {
                fun.call(this, eventData); // new way
            }
            if (eventData.isStopped === true || eventData.stop === true) return eventData; // back compatibility eventData.stop === true
        }
        // item object events
        if (eventData.object != null && eventData.phase === 'before' &&
            typeof eventData.object[funName] === 'function')
        {
            fun = eventData.object[funName];
            // check handler arguments
            args = [];
            tmp  = RegExp(/\((.*?)\)/).exec(fun);
            if (tmp) args = tmp[1].split(/\s*,\s*/);
            if (args.length === 2) {
                fun.call(this, eventData.target, eventData); // old way for back compatibility
            } else {
                fun.call(this, eventData); // new way
            }
            if (eventData.isStopped === true || eventData.stop === true) return eventData;
        }
        // execute onComplete
        if (eventData.phase === 'after' && typeof eventData.onComplete === 'function') eventData.onComplete.call(this, eventData);

        return eventData;
    }
};

/***********************************************************
*  Common Keyboard Handler. Supported in
*  - grid
*  - sidebar
*  - popup
*
*********************************************************/

w2utils.keyboard = (function (obj) {
    // private scope
    var w2ui_name = null;

    obj.active    = active;
    obj.clear     = clear;

    init();
    return obj;

    function init() {
        $(document).on('keydown', keydown);
        $(document).on('mousedown', mousedown);
    }

    function keydown (event) {
        var tag = event.target.tagName;
        if ($.inArray(tag, ['INPUT', 'SELECT', 'TEXTAREA']) !== -1) return;
        if ($(event.target).prop('contenteditable') === 'true') return;
        if (!w2ui_name) return;
        // pass to appropriate widget
        if (w2ui[w2ui_name] && typeof w2ui[w2ui_name].keydown === 'function') {
            w2ui[w2ui_name].keydown.call(w2ui[w2ui_name], event);
        }
    }

    function mousedown (event) {
        var tag = event.target.tagName;
        var obj = $(event.target).parents('.w2ui-reset');
        if (obj.length > 0) {
            var name = obj.attr('name');
            if (w2ui[name] && w2ui[name].keyboard) w2ui_name = name;
        }
    }

    function active (new_w2ui_name) {
        if (typeof new_w2ui_name !== 'undefined') w2ui_name = new_w2ui_name;
        return w2ui_name;
    }

    function clear () {
        w2ui_name = null;
    }

})({});

/***********************************************************
*  Commonly used plugins
*  --- used primarily in grid and form
*
*********************************************************/

(function () {

    $.fn.w2render = function (name) {
        if ($(this).length > 0) {
            if (typeof name === 'string' && w2ui[name]) w2ui[name].render($(this)[0]);
            if (typeof name === 'object') name.render($(this)[0]);
        }
    };

    $.fn.w2destroy = function (name) {
        if (!name && this.length > 0) name = this.attr('name');
        if (typeof name === 'string' && w2ui[name]) w2ui[name].destroy();
        if (typeof name === 'object') name.destroy();
    };

    $.fn.w2marker = function (str) {
        if (str === '' || str == null) { // remove marker
            return $(this).each(function (index, el) {
                el.innerHTML = el.innerHTML.replace(/\<span class=\"w2ui\-marker\"\>(.*)\<\/span\>/ig, '$1'); // unmark
            });
        } else { // add marker
            return $(this).each(function (index, el) {
                if (typeof str === 'string') str = [str];
                el.innerHTML = el.innerHTML.replace(/\<span class=\"w2ui\-marker\"\>(.*)\<\/span\>/ig, '$1'); // unmark
                for (var s in str) {
                    var tmp = str[s];
                    if (typeof tmp !== 'string') tmp = String(tmp);
                    // escape regex special chars
                    tmp = tmp.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&").replace(/&/g, '&amp;').replace(/</g, '&gt;').replace(/>/g, '&lt;');
                    var regex = new RegExp(tmp + '(?!([^<]+)?>)', "gi"); // only outside tags
                    el.innerHTML = el.innerHTML.replace(regex, replaceValue);
                }
                function replaceValue(matched) { // mark new
                    return '<span class="w2ui-marker">' + matched + '</span>';
                }
            });
        }
    };

    // -- w2tag - appears on the right side from element, there can be multiple on screen at a time

    $.fn.w2tag = function (text, options) {
        if (!$.isPlainObject(options)) options = {};
        if (!$.isPlainObject(options.css)) options.css = {};
        if (typeof options['class'] === 'undefined') options['class'] = '';
        // remove all tags
        if ($(this).length === 0) {
            $('.w2ui-tag').each(function (index, elem) {
                var opt = $(elem).data('options');
                if (opt == null) opt = {};
                $($(elem).data('taged-el')).removeClass( opt['class'] );
                clearInterval($(elem).data('timer'));
                $(elem).remove();
            });
            return;
        }
        return $(this).each(function (index, el) {
            // show or hide tag
            var tagOrigID = el.id;
            var tagID = w2utils.escapeId(el.id);
            if (text === '' || text == null) {
                $('#w2ui-tag-'+tagID).css('opacity', 0);
                setTimeout(function () {
                    // remmove element
                    clearInterval($('#w2ui-tag-'+tagID).data('timer'));
                    $('#w2ui-tag-'+tagID).remove();
                }, 300);
            } else {
                // remove elements
                clearInterval($('#w2ui-tag-'+tagID).data('timer'));
                $('#w2ui-tag-'+tagID).remove();
                // insert
                $('body').append(
                    '<div id="w2ui-tag-'+ tagOrigID +'" class="w2ui-tag '+ ($(el).parents('.w2ui-popup').length > 0 ? 'w2ui-tag-popup' : '') +
                    '" style=""></div>');

                var timer = setInterval(function () {
                    // monitor if destroyed
                    if ($(el).length === 0 || ($(el).offset().left === 0 && $(el).offset().top === 0)) {
                        clearInterval($('#w2ui-tag-'+tagID).data('timer'));
                        tmp_hide();
                        return;
                    }
                    // monitor if moved
                    if ($('#w2ui-tag-'+tagID).data('position') !== ($(el).offset().left + el.offsetWidth) + 'x' + $(el).offset().top) {
                        $('#w2ui-tag-'+tagID).css({
                            '-webkit-transition' : '.2s',
                            '-moz-transition'    : '.2s',
                            '-ms-transition'     : '.2s',
                            '-o-transition'      : '.2s',
                            left: ($(el).offset().left + el.offsetWidth) + 'px',
                            top: $(el).offset().top + 'px'
                        }).data('position', ($(el).offset().left + el.offsetWidth) + 'x' + $(el).offset().top);
                    }
                }, 100);
                setTimeout(function () {
                    if (!$(el).offset()) return;
                    $('#w2ui-tag-'+tagID).css({
                        opacity: '1',
                        left: ($(el).offset().left + el.offsetWidth) + 'px',
                        top: $(el).offset().top + 'px'
                    }).html('<div style="margin-top: -2px 0px 0px -2px; white-space: nowrap;"> <div class="w2ui-tag-body">'+ text +'</div> </div>')
                    .data('text', text)
                    .data('taged-el', el)
                    .data('options', options)
                    .data('position', ($(el).offset().left + el.offsetWidth) + 'x' + $(el).offset().top)
                    .data('timer', timer);
                    $(el).off('keypress', tmp_hide).on('keypress', tmp_hide).off('change', tmp_hide).on('change', tmp_hide)
                        .css(options.css).addClass(options['class']);
                    if (typeof options.onShow === 'function') options.onShow();
                }, 1);
                var originalCSS = '';
                if ($(el).length > 0) originalCSS = $(el)[0].style.cssText;
                // bind event to hide it
                function tmp_hide() {
                    $tag = $('#w2ui-tag-'+tagID);
                    if ($tag.length <= 0) return;
                    clearInterval($tag.data('timer'));
                    $tag.remove();
                    $(el).off('keypress', tmp_hide).removeClass(options['class']);
                    if ($(el).length > 0) $(el)[0].style.cssText = originalCSS;
                    if (typeof options.onHide === 'function') options.onHide();
                }
            }
        });
    };

    // w2overlay - appears under the element, there can be only one at a time

    $.fn.w2overlay = function (html, options) {
        var obj  = this;
        var name = '';
        var defaults = {
            name      : null,      // it not null, then allows multiple concurent overlays
            html      : '',        // html text to display
            align     : 'none',    // can be none, left, right, both
            left      : 0,         // offset left
            top       : 0,         // offset top
            tipLeft   : 30,        // tip offset left
            width     : 0,         // fixed width
            height    : 0,         // fixed height
            maxWidth  : null,      // max width if any
            maxHeight : null,      // max height if any
            style     : '',        // additional style for main div
            'class'   : '',        // additional class name for main div
            onShow    : null,      // event on show
            onHide    : null,      // event on hide
            openAbove : false,     // show abover control
            tmp       : {}
        };
        if (arguments.length == 1) {
            if (typeof html == 'object') {
                options = html; 
            } else {
                options = { html: html };
            }
        }
        if (arguments.length == 2) options.html = html;
        if (!$.isPlainObject(options)) options = {};
        options = $.extend({}, defaults, options);
        if (options.name) name = '-' + options.name;
        // if empty then hide
        var tmp_hide;
        if (this.length === 0 || options.html === '' || options.html == null) {
            if ($('#w2ui-overlay'+ name).length > 0) {
                tmp_hide = $('#w2ui-overlay'+ name)[0].hide;
                if (typeof tmp_hide === 'function') tmp_hide();
            } else {
            $('#w2ui-overlay'+ name).remove();
            }
            return $(this);
        }
        if ($('#w2ui-overlay'+ name).length > 0) {
            tmp_hide = $('#w2ui-overlay'+ name)[0].hide;
            $(document).off('click', tmp_hide);
            if (typeof tmp_hide === 'function') tmp_hide();
        }
        $('body').append(
            '<div id="w2ui-overlay'+ name +'" style="display: none"'+
            '        class="w2ui-reset w2ui-overlay '+ ($(this).parents('.w2ui-popup, .w2ui-overlay-popup').length > 0 ? 'w2ui-overlay-popup' : '') +'">'+
            '    <style></style>'+
            '    <div style="'+ options.style +'" class="'+ options['class'] +'"></div>'+
            '</div>'
        );
        // init
        var div1 = $('#w2ui-overlay'+ name);
        var div2 = div1.find(' > div');
        div2.html(options.html);
        // pick bg color of first div
        var bc  = div2.css('background-color');
        if (bc != null && bc !== 'rgba(0, 0, 0, 0)' && bc !== 'transparent') div1.css('background-color', bc);

        div1.data('element', obj.length > 0 ? obj[0] : null)
            .data('options', options)
            .data('position', $(obj).offset().left + 'x' + $(obj).offset().top)
            .fadeIn('fast').on('mousedown', function (event) {
                $('#w2ui-overlay'+ name).data('keepOpen', true);
                if (['INPUT', 'TEXTAREA', 'SELECT'].indexOf(event.target.tagName) === -1) event.preventDefault();
            });
        div1[0].hide    = hide;
        div1[0].resize    = resize;

        // need time to display
        resize();
        setTimeout(function () {
            resize();
            $(document).off('click', hide).on('click', hide);
            if (typeof options.onShow === 'function') options.onShow();
        }, 10);

        monitor();
        return $(this);

        // monitor position
        function monitor() {
            var tmp = $('#w2ui-overlay'+ name);
            if (tmp.data('element') !== obj[0]) return; // it if it different overlay
            if (tmp.length === 0) return;
            var pos = $(obj).offset().left + 'x' + $(obj).offset().top;
            if (tmp.data('position') !== pos) {
                hide();
            } else {
                setTimeout(monitor, 250);
            }
        }

        // click anywhere else hides the drop down
        function hide () {
            var div1 = $('#w2ui-overlay'+ name);
            if (div1.data('keepOpen') === true) {
                div1.removeData('keepOpen');
                return;
            }
            var result;
            if (typeof options.onHide === 'function') result = options.onHide();
            if (result === false) return;
            div1.remove();
            $(document).off('click', hide);
            clearInterval(div1.data('timer'));
        }

        function resize () {
            var div1 = $('#w2ui-overlay'+ name);
            var div2 = div1.find(' > div');
            // if goes over the screen, limit height and width
            if (div1.length > 0) {
                div2.height('auto').width('auto');
                // width/height
                var overflowX = false;
                var overflowY = false;
                var h = div2.height();
                var w = div2.width();
                if (options.width && options.width < w) w = options.width;
                if (w < 30) w = 30;
                // if content of specific height
                if (options.tmp.contentHeight) {
                    h = options.tmp.contentHeight;
                    div2.height(h);
                    setTimeout(function () {
                        if (div2.height() > div2.find('div.menu > table').height()) {
                            div2.find('div.menu').css('overflow-y', 'hidden');
                        }
                    }, 1);
                    setTimeout(function () { div2.find('div.menu').css('overflow-y', 'auto'); }, 10);
                }
                if (options.tmp.contentWidth) {
                    w = options.tmp.contentWidth;
                    div2.width(w);
                    setTimeout(function () {
                        if (div2.width() > div2.find('div.menu > table').width()) {
                            div2.find('div.menu').css('overflow-x', 'hidden');
                        }
                    }, 1);
                    setTimeout(function () { div2.find('div.menu').css('overflow-y', 'auto'); }, 10);
                }
                // alignment
                switch (options.align) {
                    case 'both':
                        options.left = 17;
                        if (options.width === 0) options.width = w2utils.getSize($(obj), 'width');
                        break;
                    case 'left':
                        options.left = 17;
                        break;
                    case 'right':
                        options.tipLeft = w - 45;
                        options.left = w2utils.getSize($(obj), 'width') - w + 10;
                        break;
                }
                // adjust position
                var tmp = (w - 17) / 2;
                var boxLeft  = options.left;
                var boxWidth = options.width;
                var tipLeft  = options.tipLeft;
                if (w === 30 && !boxWidth) boxWidth = 30; else boxWidth = (options.width ? options.width : 'auto');
                if (tmp < 25) {
                    boxLeft = 25 - tmp;
                    tipLeft = Math.floor(tmp);
                }
                // Y coord
                div1.css({
                    top         : (obj.offset().top + w2utils.getSize(obj, 'height') + options.top + 7) + 'px',
                    left        : ((obj.offset().left > 25 ? obj.offset().left : 25) + boxLeft) + 'px',
                    'min-width' : boxWidth,
                    'min-height': (options.height ? options.height : 'auto')
                });
                // $(window).height() - has a problem in FF20
                var maxHeight = window.innerHeight + $(document).scrollTop() - div2.offset().top - 7;
                var maxWidth  = window.innerWidth + $(document).scrollLeft() - div2.offset().left - 7;
                if ((maxHeight > -50 && maxHeight < 210) || options.openAbove === true) {
                    // show on top
                    maxHeight = div2.offset().top - $(document).scrollTop() - 7;
                    if (options.maxHeight && maxHeight > options.maxHeight) maxHeight = options.maxHeight;
                    if (h > maxHeight) {
                        overflowY = true;
                        div2.height(maxHeight).width(w).css({ 'overflow-y': 'auto' });
                        h = maxHeight;
                    }
                    div1.css('top', ($(obj).offset().top - h - 24 + options.top) + 'px');
                    div1.find('>style').html(
                        '#w2ui-overlay'+ name +':before { display: none; margin-left: '+ parseInt(tipLeft) +'px; }'+
                        '#w2ui-overlay'+ name +':after { display: block; margin-left: '+ parseInt(tipLeft) +'px; }'
                    );
                } else {
                    // show under
                    if (options.maxHeight && maxHeight > options.maxHeight) maxHeight = options.maxHeight;
                    if (h > maxHeight) {
                        overflowY = true;
                        div2.height(maxHeight).width(w).css({ 'overflow-y': 'auto' });
                    }
                    div1.find('>style').html(
                        '#w2ui-overlay'+ name +':before { display: block; margin-left: '+ parseInt(tipLeft) +'px; }'+
                        '#w2ui-overlay'+ name +':after { display: none; margin-left: '+ parseInt(tipLeft) +'px; }'
                    );
                }
                // check width
                w = div2.width();
                maxWidth = window.innerWidth + $(document).scrollLeft() - div2.offset().left - 7;
                if (options.maxWidth && maxWidth > options.maxWidth) maxWidth = options.maxWidth;
                if (w > maxWidth && options.align !== 'both') {
                    options.align = 'right';
                    setTimeout(function () { resize(); }, 1);
                }
                // check scroll bar
                if (overflowY && overflowX) div2.width(w + w2utils.scrollBarSize() + 2);
            }
        }
    };

    $.fn.w2menu = function (menu, options) {
        /*
        ITEM STRUCTURE
            item : {
                id       : null,
                text     : '',
                style    : '',
                img      : '',
                icon     : '',
                count    : '',
                hidden   : false,
                disabled : false
                ...
            }
        */
        var defaults = {
            index      : null,        // current selected
            items      : [],
            render     : null,
            msgNoItems : 'No items',
            onSelect   : null,
            tmp        : {}
        };
        var obj  = this;
        var name = '';
        if (menu === 'refresh') {
            // if not show - call blur
            if ($('#w2ui-overlay'+ name).length > 0) {
                options = $.extend($.fn.w2menuOptions, options);
                var scrTop = $('#w2ui-overlay'+ name +' div.menu').scrollTop();
                $('#w2ui-overlay'+ name +' div.menu').html(getMenuHTML());
                $('#w2ui-overlay'+ name +' div.menu').scrollTop(scrTop);
                mresize();
            } else {
                $(this).w2menu(options);
            }
        } else {
            if (arguments.length === 1) options = menu; else options.items = menu;
            if (typeof options !== 'object') options = {};
            options = $.extend({}, defaults, options);
            $.fn.w2menuOptions = options;
            if (options.name) name = '-' + options.name;
            if (typeof options.select === 'function' && typeof options.onSelect !== 'function') options.onSelect = options.select;
            if (typeof options.onRender === 'function' && typeof options.render !== 'function') options.render = options.onRender;
            // since only one overlay can exist at a time
            $.fn.w2menuHandler = function (event, index) {
                if (typeof options.onSelect === 'function') {
                    // need time so that menu first hides
                    setTimeout(function () {
                        options.onSelect({
                            index : index,
                            item  : options.items[index],
                            originalEvent: event
                        });
                    }, 10);
                }
                // do not uncomment (enum in grid search will not work)
                // setTimeout(function () { $(document).click(); }, 50);
            };
            var html = '';
            if (options.search) {
                html +=
                    '<div style="position: absolute; top: 0px; height: 40px; left: 0px; right: 0px; border-bottom: 1px solid silver; background-color: #ECECEC; padding: 8px 5px;">'+
                    '    <div class="w2ui-icon icon-search" style="position: absolute; margin-top: 4px; margin-left: 6px; width: 11px; background-position: left !important;"></div>'+
                    '    <input id="menu-search" type="text" style="width: 100%; outline: none; padding-left: 20px;" onclick="event.stopPropagation();">'+
                    '</div>';
                options.style += ';background-color: #ECECEC';
                options.index = 0;
                for (var i in options.items) options.items[i].hidden = false;
            }
            html += '<div class="menu" style="position: absolute; top: '+ (options.search ? 40 : 0) + 'px; bottom: 0px; width: 100%; overflow: auto;">' +
                        getMenuHTML() +
                    '</div>';
            var ret = $(this).w2overlay(html, options);
            setTimeout(function () {
                $('#w2ui-overlay'+ name +' #menu-search')
                    .on('keyup', change)
                    .on('keydown', function (event) {
                        // cancel tab key
                        if (event.keyCode === 9) { event.stopPropagation(); event.preventDefault(); }
                    });
                if (options.search) {
                    if (['text', 'password'].indexOf($(obj)[0].type) != -1 || $(obj)[0].tagName == 'texarea') return;
                    $('#w2ui-overlay'+ name +' #menu-search').focus();                    
                }
            }, 200);
            mresize();
            return ret;
        }

        function mresize() {
            setTimeout(function () {
                // show selected
                $('#w2ui-overlay'+ name +' tr.w2ui-selected').removeClass('w2ui-selected');
                var cur        = $('#w2ui-overlay'+ name +' tr[index='+ options.index +']');
                var scrTop    = $('#w2ui-overlay'+ name +' div.menu').scrollTop();
                cur.addClass('w2ui-selected');
                if (options.tmp) options.tmp.contentHeight = $('#w2ui-overlay'+ name +' table').height() + (options.search ? 50 : 10);
                if (options.tmp) options.tmp.contentWidth  = $('#w2ui-overlay'+ name +' table').width();
                if ($('#w2ui-overlay'+ name).length > 0) $('#w2ui-overlay'+ name)[0].resize();
                // scroll into view
                if (cur.length > 0) {
                    var top    = cur[0].offsetTop - 5; // 5 is margin top
                    var el     = $('#w2ui-overlay'+ name +' div.menu');
                    var height = el.height();
                    $('#w2ui-overlay'+ name +' div.menu').scrollTop(scrTop);
                    if (top < scrTop || top + cur.height() > scrTop + height) {
                        $('#w2ui-overlay'+ name +' div.menu').animate({ 'scrollTop': top - (height - cur.height() * 2) / 2 }, 200, 'linear');
                    }
                }
            }, 1);
        }

        function change(event) {
            var search  = this.value;
            var key     = event.keyCode;
            var cancel  = false;
            switch (key) {
                case 13: // enter
                    $('#w2ui-overlay'+ name).remove();
                    $.fn.w2menuHandler(event, options.index);
                    break;
                case 9:  // tab
                case 27: // escape
                    $('#w2ui-overlay'+ name).remove();
                    $.fn.w2menuHandler(event, -1);
                    break;
                case 38: // up
                    options.index = w2utils.isInt(options.index) ? parseInt(options.index) : 0;
                    options.index--;
                    while (options.index > 0 && options.items[options.index].hidden) options.index--;
                    if (options.index === 0 && options.items[options.index].hidden) {
                        while (options.items[options.index] && options.items[options.index].hidden) options.index++;
                    }
                    if (options.index < 0) options.index = 0;
                    cancel = true;
                    break;
                case 40: // down
                    options.index = w2utils.isInt(options.index) ? parseInt(options.index) : 0;
                    options.index++;
                    while (options.index < options.items.length-1 && options.items[options.index].hidden) options.index++;
                    if (options.index === options.items.length-1 && options.items[options.index].hidden) {
                        while (options.items[options.index] && options.items[options.index].hidden) options.index--;
                    }
                    if (options.index >= options.items.length) options.index = options.items.length - 1;
                    cancel = true;
                    break;
            }
            // filter
            if (!cancel) {
                var shown  = 0;
                for (var i in options.items) {
                    var item = options.items[i];
                    var prefix = '';
                    var suffix = '';
                    if (['is', 'begins with'].indexOf(options.match) !== -1) prefix = '^';
                    if (['is', 'ends with'].indexOf(options.match) !== -1) suffix = '$';
                    try {
                        var re = new RegExp(prefix + search + suffix, 'i');
                        if (re.test(item.text) || item.text === '...') item.hidden = false; else item.hidden = true;
                    } catch (e) {}
                    // do not show selected items
                    if (obj.type === 'enum' && $.inArray(item.id, ids) !== -1) item.hidden = true;
                    if (item.hidden !== true) shown++;
                }
                options.index = 0;
                while (options.index < options.items.length-1 && options.items[options.index].hidden) options.index++;
                if (shown <= 0) options.index = -1;
            }
            $(obj).w2menu('refresh', options);
            mresize();
        }

        function getMenuHTML () {
            if (options.spinner) {
                return  '<table class="w2ui-drop-menu"><tr><td style="padding: 5px 10px 10px 10px; text-align: center">'+
                        '    <div class="w2ui-spinner" style="width: 18px; height: 18px; position: relative; top: 5px;"></div> '+
                        '    <div style="display: inline-block; padding: 3px; color: #999;">'+ w2utils.lang('Loading...') +'</div>'+
                        '</td></tr></table>';
            }
            var count        = 0;
            var menu_html    = '<table cellspacing="0" cellpadding="0" class="w2ui-drop-menu">';
            var img = null, icon = null;
            for (var f = 0; f < options.items.length; f++) {
                var mitem = options.items[f];
                if (typeof mitem === 'string') {
                    mitem = { id: mitem, text: mitem };
                } else {
                    if (mitem.text != null && mitem.id == null) mitem.id = mitem.text;
                    if (mitem.text == null && mitem.id != null) mitem.text = mitem.id;
                    if (mitem.caption != null) mitem.text = mitem.caption;
                    img  = mitem.img;
                    icon = mitem.icon;
                    if (img  == null) img  = null;
                    if (icon == null) icon = null;
                }
                if (mitem.hidden !== true) {
                    var imgd = '';
                    var txt = mitem.text;
                    if (typeof options.render === 'function') txt = options.render(mitem, options);
                    if (img)  imgd = '<td class="menu-icon"><div class="w2ui-tb-image w2ui-icon '+ img +'"></div></td>';
                    if (icon) imgd = '<td class="menu-icon" align="center"><span class="w2ui-icon '+ icon +'"></span></td>';
                    // render only if non-empty
                    if (typeof txt !== 'undefined' && txt !== '' && !(/^-+$/.test(txt))) {
                        var bg = (count % 2 === 0 ? 'w2ui-item-even' : 'w2ui-item-odd');
                        if (options.altRows !== true) bg = '';
                        var colspan = 1;
                        if (imgd == '') colspan++;
                        if (mitem.count == null) colspan++;
                        menu_html +=
                            '<tr index="'+ f + '" style="'+ (mitem.style ? mitem.style : '') +'" '+
                            '        class="'+ bg +' '+ (options.index === f ? 'w2ui-selected' : '') + ' ' + (mitem.disabled === true ? 'w2ui-disabled' : '') +'"'+
                            '        onmousedown="$(this).parent().find(\'tr\').removeClass(\'w2ui-selected\'); $(this).addClass(\'w2ui-selected\');"'+
                            '        onclick="event.stopPropagation(); '+
                            '               if ('+ (mitem.disabled === true ? 'true' : 'false') + ') return;'+
                            '               $(\'#w2ui-overlay'+ name +'\').remove(); '+
                            '               $.fn.w2menuHandler(event, \''+ f +'\');">'+
                                imgd +
                            '   <td class="menu-text" colspan="'+ colspan +'">'+ txt +'</td>'+
                            '   <td class="menu-count">'+ (mitem.count != null ? '<span>' + mitem.count + '</span>' : '') + '</td>' +
                            '</tr>';
                        count++;
                    } else {
                        // horizontal line
                        menu_html += '<tr><td colspan="2" style="padding: 6px; pointer-events: none"><div style="border-top: 1px solid silver;"></div></td></tr>';
                    }
                }
                options.items[f] = mitem;
            }
            if (count === 0) {
                menu_html += '<tr><td style="padding: 13px; color: #999; text-align: center">'+ options.msgNoItems +'</div></td></tr>';
            }
            menu_html += "</table>";
            return menu_html;
        }
    };
})();


/************************************************************************
*   Library: Web 2.0 UI for jQuery (using prototypical inheritance)
*   - Following objects defined
*        - w2field        - various field controls
*        - $().w2field    - jQuery wrapper
*   - Dependencies: jQuery, w2utils
*
* == NICE TO HAVE ==
*   - upload (regular files)
*   - BUG with prefix/postfix and arrows (test in different contexts)
*   - prefix and suffix are slow (100ms or so)
*   - multiple date selection
*   - month selection, year selections
*   - arrows no longer work (for int)
*   - form to support custom types
*   - bug: if input is hidden and then enum is applied, then when it becomes visible, it will be 110px
*
************************************************************************/

(function ($) {

    var w2field = function (options) {
        // public properties
        this.el          = null
        this.helpers     = {}; // object or helper elements
        this.type        = options.type || 'text';
        this.options     = $.extend(true, {}, options);
        this.onSearch    = options.onSearch    || null;
        this.onRequest   = options.onRequest   || null;
        this.onLoad      = options.onLoad      || null;
        this.onError     = options.onError     || null;
        this.onClick     = options.onClick     || null;
        this.onAdd       = options.onAdd       || null;
        this.onNew       = options.onNew       || null;
        this.onRemove    = options.onRemove    || null;
        this.onMouseOver = options.onMouseOver || null;
        this.onMouseOut  = options.onMouseOut  || null;
        this.onIconClick = options.onIconClick || null;
        this.tmp         = {}; // temp object
        // clean up some options
        delete this.options.type;
        delete this.options.onSearch;
        delete this.options.onRequest;
        delete this.options.onLoad;
        delete this.options.onError;
        delete this.options.onClick;
        delete this.options.onMouseOver;
        delete this.options.onMouseOut;
        delete this.options.onIconClick;
        // extend with defaults
        $.extend(true, this, w2obj.field);
    };

    // ====================================================
    // -- Registers as a jQuery plugin

    $.fn.w2field = function (method, options) {
        // call direct
        if (this.length == 0) {
            var pr = w2field.prototype;
            if (pr[method]) {
                return pr[method].apply(pr, Array.prototype.slice.call(arguments, 1));
            }
        } else {
            // if without arguments - return the object
            if (arguments.length == 0) {
                var obj = $(this).data('w2field');
                return obj;
            }
            if (typeof method == 'string' && typeof options == 'object') {
                method = $.extend(true, {}, options, { type: method });
            }
            if (typeof method == 'string' && typeof options == 'undefined') {
                method = { type: method };
            }
            method.type = String(method.type).toLowerCase();
            return this.each(function (index, el) {
                var obj = $(el).data('w2field');
                // if object is not defined, define it
                if (typeof obj == 'undefined') {
                    var obj = new w2field(method);
                    $.extend(obj, { handlers: [] });
                    if (el) obj.el = $(el)[0];
                    obj.init();
                    $(el).data('w2field', obj);
                    return obj;
                } else { // fully re-init
                    obj.clear();
                    if (method.type == 'clear') return;
                    var obj = new w2field(method);
                    $.extend(obj, { handlers: [] });
                    if (el) obj.el = $(el)[0];
                    obj.init();
                    $(el).data('w2field', obj);
                    return obj;
                }
                return null;
            });
        }
    }

    // ====================================================
    // -- Implementation of core functionality

    /*     To add custom types
        $().w2field('addType', 'myType', function (options) {
            $(this.el).on('keypress', function (event) {
                if (event.metaKey || event.ctrlKey || event.altKey
                    || (event.charCode != event.keyCode && event.keyCode > 0)) return;
                var ch = String.fromCharCode(event.charCode);
                if (ch != 'a' && ch != 'b' && ch != 'c') {
                    if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;
                    return false;
                }
            });
            $(this.el).on('blur', function (event)  { // keyCode & charCode differ in FireFox
                var ch = this.value;
                if (ch != 'a' && ch != 'b' && ch != 'c') {
                    $(this).w2tag(w2utils.lang("Not a single charecter from the set of 'abc'"));
                }
            });
        });
    */

    w2field.prototype = {

        custom: {},  // map of custom types

        pallete: [
            ['000000', '444444', '666666', '999999', 'CCCCCC', 'EEEEEE', 'F3F3F3', 'FFFFFF'],
            ['FF011B', 'FF9838', 'FFFD59', '01FD55', '00FFFE', '0424F3', '9B24F4', 'FF21F5'],
            ['F4CCCC', 'FCE5CD', 'FFF2CC', 'D9EAD3', 'D0E0E3', 'CFE2F3', 'D9D1E9', 'EAD1DC'],
            ['EA9899', 'F9CB9C', 'FEE599', 'B6D7A8', 'A2C4C9', '9FC5E8', 'B4A7D6', 'D5A6BD'],
            ['E06666', 'F6B26B', 'FED966', '93C47D', '76A5AF', '6FA8DC', '8E7CC3', 'C27BA0'],
            ['CC0814', 'E69138', 'F1C232', '6AA84F', '45818E', '3D85C6', '674EA7', 'A54D79'],
            ['99050C', 'B45F17', 'BF901F', '37761D', '124F5C', '0A5394', '351C75', '741B47'],
            ['660205', '783F0B', '7F6011', '274E12', '0C343D', '063762', '20124D', '4C1030']
        ],

        addType: function (type, handler) {
            type = String(type).toLowerCase();
            this.custom[type] = handler;
            return true;
        },

        removeType: function (type) {
            type = String(type).toLowerCase();
            if (!this.custom[type]) return false;
            delete this.custom[type];
            return true
        },

        init: function () {
            var obj     = this;
            var options = this.options;
            var defaults;

            // Custom Types
            if (typeof this.custom[this.type] == 'function') {
                this.custom[this.type].call(this, options);
                return;
            }
            // only for INPUT or TEXTAREA
            if (['INPUT', 'TEXTAREA'].indexOf(this.el.tagName) == -1) {
                console.log('ERROR: w2field could only be applied to INPUT or TEXTAREA.', this.el);
                return;
            }

            switch (this.type) {
                case 'text':
                case 'int':
                case 'float':
                case 'money':
                case 'currency':
                case 'percent':
                case 'alphanumeric':
                case 'hex':
                    defaults = {
                        min                : null,
                        max                : null,
                        step               : 1,
                        placeholder        : '',
                        autoFormat         : true,
                        currencyPrefix     : w2utils.settings.currencyPrefix,
                        currencySuffix     : w2utils.settings.currencySuffix,
                        currencyPrecision  : w2utils.settings.currencyPrecision,
                        decimalSymbol      : w2utils.settings.decimalSymbol,
                        groupSymbol        : w2utils.settings.groupSymbol,
                        arrows             : false,
                        keyboard           : true,
                        precision          : null,
                        silent             : true,
                        prefix             : '',
                        suffix             : ''
                    };
                    this.options = $.extend(true, {}, defaults, options);
                    options = this.options; // since object is re-created, need to re-assign
                    options.numberRE  = new RegExp('['+ options.groupSymbol + ']', 'g');
                    options.moneyRE   = new RegExp('['+ options.currencyPrefix + options.currencySuffix + options.groupSymbol +']', 'g');
                    options.percentRE = new RegExp('['+ options.groupSymbol + '%]', 'g');
                    // no keyboard support needed
                    if (['text', 'alphanumeric', 'hex'].indexOf(this.type) != -1) {
                        options.arrows   = false;
                        options.keyboard = false;
                    }
                    this.addPrefix(); // only will add if needed
                    this.addSuffix();
                    if ($(this.el).attr('placeholder') && options.placeholder == '') options.placeholder = $(this.el).attr('placeholder');
                    $(this.el).attr('placeholder', options.placeholder);
                    break;

                case 'color':
                    defaults = {
                        prefix      : '#',
                        suffix      : '<div style="width: '+ (parseInt($(this.el).css('font-size')) || 12) +'px">&nbsp;</div>',
                        placeholder : '',
                        arrows      : false,
                        keyboard    : false
                    };
                    $.extend(options, defaults);
                    this.addPrefix();    // only will add if needed
                    this.addSuffix();    // only will add if needed
                    // additional checks
                    $(this.el).attr('maxlength', 6);
                    if ($(this.el).val() != '') setTimeout(function () { $(obj.el).change(); }, 1);
                    if ($(this.el).attr('placeholder') && options.placeholder == '') options.placeholder = $(this.el).attr('placeholder');
                    $(this.el).attr('placeholder', options.placeholder);
                    break;

                case 'date':
                    defaults = {
                        format      : w2utils.settings.date_format, // date format
                        placeholder : '',
                        keyboard    : true,
                        silent      : true,
                        start       : '',       // string or jquery object
                        end         : '',       // string or jquery object
                        blocked     : {},       // { '4/11/2011': 'yes' }
                        colored     : {}        // { '4/11/2011': 'red:white' }
                    };
                    this.options = $.extend(true, {}, defaults, options);
                    options = this.options; // since object is re-created, need to re-assign
                    if ($(this.el).attr('placeholder') && options.placeholder == '') options.placeholder = $(this.el).attr('placeholder');
                    $(this.el).attr('placeholder', options.placeholder ? options.placeholder : options.format);
                    break;

                case 'time':
                    defaults = {
                        format      : w2utils.settings.time_format,
                        placeholder : '',
                        keyboard    : true,
                        silent      : true,
                        start       : '',
                        end         : ''
                    };
                    this.options = $.extend(true, {}, defaults, options);
                    options = this.options; // since object is re-created, need to re-assign
                    if ($(this.el).attr('placeholder') && options.placeholder == '') options.placeholder = $(this.el).attr('placeholder');
                    $(this.el).attr('placeholder', options.placeholder ? options.placeholder : (options.format == 'h12' ? 'hh:mi pm' : 'hh:mi'));
                    break;

                case 'datetime':
                    break;

                case 'list':
                case 'combo':
                    defaults = {
                        items           : [],
                        selected        : {},
                        placeholder     : '',
                        url             : null,         // url to pull data from
                        postData        : {},
                        minLength       : 1,
                        cacheMax        : 250,
                        maxDropHeight   : 350,          // max height for drop down menu
                        match           : 'begins',     // ['contains', 'is', 'begins', 'ends']
                        silent          : true,
                        icon            : null,
                        iconStyle       : '',
                        onSearch        : null,         // when search needs to be performed
                        onRequest       : null,         // when request is submitted
                        onLoad          : null,         // when data is received
                        onError         : null,         // when data fails to load due to server error or other failure modes
                        onIconClick     : null,
                        renderDrop      : null,         // render function for drop down item
                        prefix          : '',
                        suffix          : '',
                        openOnFocus     : false,        // if to show overlay onclick or when typing
                        markSearch      : false
                    };
                    options.items = this.normMenu(options.items); // need to be first
                    if (this.type == 'list') {
                        // defaults.search = (options.items && options.items.length >= 10 ? true : false);
                        defaults.openOnFocus = true;
                        defaults.suffix = '<div class="arrow-down" style="margin-top: '+ ((parseInt($(this.el).height()) - 6) / 2) +'px;"></div>';
                        $(this.el).addClass('w2ui-select');
                        // if simple value - look it up
                        if (!$.isPlainObject(options.selected)) {
                            for (var i in options.items) {
                                var item = options.items[i];
                                if (item && item.id == options.selected) {
                                    options.selected = $.extend(true, {}, item);
                                    break;
                                }
                            }
                        }
                    }
                    options = $.extend({}, defaults, options, {
                        align   : 'both',      // same width as control
                        altRows : true         // alternate row color
                    });
                    this.options = options;
                    if (!$.isPlainObject(options.selected)) options.selected = {};
                    $(this.el).data('selected', options.selected);
                    if (options.url) this.request(0);
                    if (this.type == 'list') this.addFocus();
                    this.addPrefix();
                    this.addSuffix();
                    setTimeout(function () { obj.refresh(); }, 10); // need this for icon refresh
                    if ($(this.el).attr('placeholder') && options.placeholder == '') options.placeholder = $(this.el).attr('placeholder');
                    $(this.el).attr('placeholder', options.placeholder).attr('autocomplete', 'off');
                    if (typeof options.selected.text != 'undefined') $(this.el).val(options.selected.text);
                    break;

                case 'enum':
                    defaults = {
                        items           : [],
                        selected        : [],
                        placeholder     : '',
                        max             : 0,             // max number of selected items, 0 - unlim
                        url             : null,          // not implemented
                        postData        : {},
                        minLength       : 1, 
                        cacheMax        : 250,
                        maxWidth        : 250,           // max width for a single item
                        maxHeight       : 350,           // max height for input control to grow
                        maxDropHeight   : 350,           // max height for drop down menu
                        match           : 'contains',    // ['contains', 'is', 'begins', 'ends']
                        silent          : true,
                        openOnFocus     : false,         // if to show overlay onclick or when typing
                        markSearch      : true,
                        renderDrop      : null,          // render function for drop down item
                        renderItem      : null,          // render selected item
                        style           : '',            // style for container div
                        onSearch        : null,          // when search needs to be performed
                        onRequest       : null,          // when request is submitted
                        onLoad          : null,          // when data is received
                        onError         : null,          // when data fails to load due to server error or other failure modes
                        onClick         : null,          // when an item is clicked
                        onAdd           : null,          // when an item is added
                        onNew           : null,          // when new item should be added
                        onRemove        : null,          // when an item is removed
                        onMouseOver     : null,          // when an item is mouse over
                        onMouseOut      : null           // when an item is mouse out
                    };
                    options = $.extend({}, defaults, options, {
                        align    : 'both',    // same width as control
                        suffix   : '',
                        altRows  : true       // alternate row color
                    });
                    options.items      = this.normMenu(options.items);
                    options.selected = this.normMenu(options.selected);
                    this.options = options;
                    if (!$.isArray(options.selected)) options.selected = [];
                    $(this.el).data('selected', options.selected);
                    if (options.url) this.request(0);
                    this.addSuffix();
                    this.addMulti();
                    break;

                case 'file':
                    defaults = {
                        selected      : [],
                        placeholder   : w2utils.lang('Attach files by dragging and dropping or Click to Select'),
                        max           : 0,
                        maxSize       : 0,        // max size of all files, 0 - unlim
                        maxFileSize   : 0,        // max size of a single file, 0 -unlim
                        maxWidth      : 250,      // max width for a single item
                        maxHeight     : 350,      // max height for input control to grow
                        maxDropHeight : 350,      // max height for drop down menu
                        silent        : true,
                        renderItem    : null,     // render selected item
                        style         : '',       // style for container div
                        onClick       : null,     // when an item is clicked
                        onAdd         : null,     // when an item is added
                        onRemove      : null,     // when an item is removed
                        onMouseOver   : null,     // when an item is mouse over
                        onMouseOut    : null      // when an item is mouse out
                    };
                    options = $.extend({}, defaults, options, {
                        align         : 'both',   // same width as control
                        altRows        : true     // alternate row color
                    });
                    this.options = options;
                    if (!$.isArray(options.selected)) options.selected = [];
                    $(this.el).data('selected', options.selected);
                    if ($(this.el).attr('placeholder')) options.placeholder = $(this.el).attr('placeholder');
                    this.addMulti();
                    break;
            }
            // attach events
            this.tmp = {
                onChange    : function (event) { obj.change.call(obj, event) },
                onClick     : function (event) { obj.click.call(obj, event) },
                onFocus     : function (event) { obj.focus.call(obj, event) },
                onBlur      : function (event) { obj.blur.call(obj, event) },
                onKeydown   : function (event) { obj.keyDown.call(obj, event) },
                onKeyup     : function (event) { obj.keyUp.call(obj, event) },
                onKeypress  : function (event) { obj.keyPress.call(obj, event) }
            }
            $(this.el)
                .addClass('w2field')
                .data('w2field', this)
                .on('change',   this.tmp.onChange)
                .on('click',    this.tmp.onClick)         // ignore click because it messes overlays
                .on('focus',    this.tmp.onFocus)
                .on('blur',     this.tmp.onBlur)
                .on('keydown',  this.tmp.onKeydown)
                .on('keyup',    this.tmp.onKeyup)
                .on('keypress', this.tmp.onKeypress)
                .css({
                    'box-sizing'         : 'border-box',
                    '-webkit-box-sizing' : 'border-box',
                    '-moz-box-sizing'    : 'border-box',
                    '-ms-box-sizing'     : 'border-box',
                    '-o-box-sizing'      : 'border-box'
                });
            // format initial value
            this.change($.Event('change'));
        },

        clear: function () {
            var obj        = this;
            var options    = this.options;
            // if money then clear value
            if (['money', 'currency'].indexOf(this.type) != -1) {
                $(this.el).val($(this.el).val().replace(options.moneyRE, ''));
            }
            if (this.type == 'percent') {
                $(this.el).val($(this.el).val().replace(/%/g, ''));
            }
            if (this.type == 'color') {
                $(this.el).removeAttr('maxlength');
            }
            if (this.type == 'list') {
                $(this.el).removeClass('w2ui-select');
            }
            if (['date', 'time'].indexOf(this.type) != -1) {
                if ($(this.el).attr('placeholder') == options.format) $(this.el).attr('placeholder', '');
            }
            this.type = 'clear';
            var tmp = $(this.el).data('tmp');
            if (!this.tmp) return;
            // restore paddings
            if (typeof tmp != 'undefined') {
                if (tmp && tmp['old-padding-left'])  $(this.el).css('padding-left',  tmp['old-padding-left']);
                if (tmp && tmp['old-padding-right']) $(this.el).css('padding-right', tmp['old-padding-right']);
            }
            // remove events and data
            $(this.el)
                .val(this.clean($(this.el).val()))
                .removeClass('w2field')
                .removeData() // removes all attached data
                .off('change',   this.tmp.onChange)
                .off('click',    this.tmp.onClick)
                .off('focus',    this.tmp.onFocus)
                .off('blur',     this.tmp.onBlur)
                .off('keydown',  this.tmp.onKeydown)
                .off('keyup',    this.tmp.onKeyup)
                .off('keypress', this.tmp.onKeypress);
            // remove helpers
            for (var h in this.helpers) $(this.helpers[h]).remove();
            this.helpers = {};
        },

        refresh: function () {
            var obj       = this;
            var options   = this.options;
            var selected  = $(this.el).data('selected');
            var time      = (new Date()).getTime();
            // enum
            if (['list'].indexOf(this.type) != -1) {
                $(obj.el).parent().css('white-space', 'nowrap'); // needs this for arrow alway to appear on the right side
                // hide focus and show text
                if (obj.helpers.prefix) obj.helpers.prefix.hide();
                setTimeout(function () {
                    if (!obj.helpers.focus) return;
                    // if empty show no icon
                    if (!$.isEmptyObject(selected) && options.icon) {
                        options.prefix = '<span class="w2ui-icon '+ options.icon +'"style="cursor: pointer; font-size: 14px;' + 
                                         ' display: inline-block; margin-top: -1px; color: #7F98AD;'+ options.iconStyle +'">'+
                            '</span>';
                        obj.addPrefix();                        
                    } else {
                        options.prefix = '';
                        obj.addPrefix();
                    }
                    // focus helpder
                    var focus = obj.helpers.focus.find('input');
                    if ($(focus).val() == '') {
                        $(focus).css('opacity', 0).prev().css('opacity', 0);
                        $(obj.el).val(selected && selected.text != null ? selected.text : '');
                        $(obj.el).attr('placeholder', options.placeholder || '');
                    } else {
                        $(focus).css('opacity', 1).prev().css('opacity', 1);
                        $(obj.el).val('');
                        $(obj.el).removeAttr('placeholder');
                        setTimeout(function () {
                            if (obj.helpers.prefix) obj.helpers.prefix.hide(); 
                            var tmp = 'position: absolute; opacity: 0; margin: 4px 0px 0px 2px; background-position: left !important;';
                            if (options.icon) {
                                $(focus).css('margin-left', '17px');
                                $(obj.helpers.focus).find('.icon-search').attr('style', tmp + 'width: 11px !important; display: block; opacity: 1');
                            } else {
                                $(focus).css('margin-left', '0px');
                                $(obj.helpers.focus).find('.icon-search').attr('style', tmp + 'width: 0px !important; display: none; opacity: 0');
                            }
                        }, 1);
                    }
                    // if readonly or disabled
                    if ($(obj.el).prop('readonly') || $(obj.el).prop('disabled')) {
                        setTimeout(function () { 
                            $(obj.helpers.prefix).css('opacity', '0.6'); 
                            $(obj.helpers.suffix).css('opacity', '0.6');
                        }, 1);
                    } else {
                        setTimeout(function () { 
                            $(obj.helpers.prefix).css('opacity', '1'); 
                            $(obj.helpers.suffix).css('opacity', '1');
                        }, 1);
                    }
                }, 1);
            }
            if (['enum', 'file'].indexOf(this.type) != -1) {
                var html = '';
                for (var s in selected) {
                    var it  = selected[s];
                    var ren = '';
                    if (typeof options.renderItem == 'function') {
                        ren = options.renderItem(it, s, '<div class="w2ui-list-remove" title="'+ w2utils.lang('Remove') +'" index="'+ s +'">&nbsp;&nbsp;</div>');
                    } else {
                        ren = '<div class="w2ui-list-remove" title="'+ w2utils.lang('Remove') +'" index="'+ s +'">&nbsp;&nbsp;</div>'+
                              (obj.type == 'enum' ? it.text : it.name + '<span class="file-size"> - '+ w2utils.size(it.size) +'</span>');
                    }
                    html += '<li index="'+ s +'" style="max-width: '+ parseInt(options.maxWidth) + 'px; '+ (it.style ? it.style : '') +'">'+
                            ren +'</li>';
                }
                var div = obj.helpers.multi;
                var ul  = div.find('ul');
                div.attr('style', div.attr('style') + ';' + options.style);
                if ($(obj.el).prop('readonly') || $(obj.el).prop('disabled')) {
                    div.addClass('w2ui-readonly'); 
                    div.css('pointer-events', 'none').find('li').css('opacity', '0.6');
                    $(obj.helpers.multi).find('input').prop('readonly', true);                    
                } else {
                    div.removeClass('w2ui-readonly');
                    div.css('pointer-events', 'auto').find('li').css('opacity', '1');
                    $(obj.helpers.multi).find('input').prop('readonly', false);
                }
                // celan
                div.find('.w2ui-enum-placeholder').remove();
                ul.find('li').not('li.nomouse').remove();
                // add new list
                if (html != '') {
                    ul.prepend(html);
                } else if (typeof options.placeholder != 'undefined') {
                    var style =
                        'padding-top: ' + $(this.el).css('padding-top') + ';'+
                        'padding-left: ' + $(this.el).css('padding-left') + '; ' +
                        'box-sizing: ' + $(this.el).css('box-sizing') + '; ' +
                        'line-height: ' + $(this.el).css('line-height') + '; ' +
                        'font-size: ' + $(this.el).css('font-size') + '; ' +
                        'font-family: ' + $(this.el).css('font-family') + '; ';
                    div.prepend('<div class="w2ui-enum-placeholder" style="'+ style +'">'+ options.placeholder + '</div>');
                }
                // ITEMS events
                div.find('li')
                    .data('mouse', 'out')
                    .on('click', function (event) {
                        var item = selected[$(event.target).attr('index')];
                        if ($(event.target).hasClass('nomouse')) return;
                        event.stopPropagation();
                        // trigger event
                        var eventData = obj.trigger({ phase: 'before', type: 'click', target: obj.el, originalEvent: event.originalEvent, item: item });
                        if (eventData.isCancelled === true) return;
                        // default behavior
                        if ($(event.target).hasClass('w2ui-list-remove')) {
                            if ($(obj.el).attr('readonly') || $(obj.el).attr('disabled')) return;
                            // trigger event
                            var eventData = obj.trigger({ phase: 'before', type: 'remove', target: obj.el, originalEvent: event.originalEvent, item: item });
                            if (eventData.isCancelled === true) return;
                            // default behavior
                            $().w2overlay();
                            selected.splice($(event.target).attr('index'), 1);
                            $(obj.el).trigger('change');
                            $(event.target).parent().fadeOut('fast');
                            setTimeout(function () {
                                obj.refresh();
                                // event after
                                obj.trigger($.extend(eventData, { phase: 'after' }));
                            }, 300);
                        }
                        if (obj.type == 'file' && !$(event.target).hasClass('w2ui-list-remove')) {
                            var preview = '';
                            if ((/image/i).test(item.type)) { // image
                                preview = '<div style="padding: 3px;">'+
                                    '    <img src="'+ (item.content ? 'data:'+ item.type +';base64,'+ item.content : '') +'" style="max-width: 300px;" '+
                                    '        onload="var w = $(this).width(); var h = $(this).height(); '+
                                    '            if (w < 300 & h < 300) return; '+
                                    '            if (w >= h && w > 300) $(this).width(300);'+
                                    '            if (w < h && h > 300) $(this).height(300);"'+
                                    '        onerror="this.style.display = \'none\'"'+
                                    '    >'+
                                    '</div>';
                            }
                            var td1 = 'style="padding: 3px; text-align: right; color: #777;"';
                            var td2 = 'style="padding: 3px"';
                            preview += '<div style="padding: 8px;">'+
                                '    <table cellpadding="2">'+
                                '    <tr><td '+ td1 +'>'+ w2utils.lang('Name') +':</td><td '+ td2 +'>'+ item.name +'</td></tr>'+
                                '    <tr><td '+ td1 +'>'+ w2utils.lang('Size') +':</td><td '+ td2 +'>'+ w2utils.size(item.size) +'</td></tr>'+
                                '    <tr><td '+ td1 +'>'+ w2utils.lang('Type') +':</td><td '+ td2 +'>' +
                                '        <span style="width: 200px; display: block-inline; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">'+ item.type +'</span>'+
                                '    </td></tr>'+
                                '    <tr><td '+ td1 +'>'+ w2utils.lang('Modified') +':</td><td '+ td2 +'>'+ w2utils.date(item.modified) +'</td></tr>'+
                                '    </table>'+
                                '</div>';
                                $(event.target).w2overlay(preview);
                        }
                        // event after
                        obj.trigger($.extend(eventData, { phase: 'after' }));
                    })
                    .on('mouseover', function (event) {
                        var tmp = event.target;
                        if (tmp.tagName != 'LI') tmp = tmp.parentNode;
                        if ($(tmp).hasClass('nomouse')) return;
                        if ($(tmp).data('mouse') == 'out') {
                            var item = selected[$(tmp).attr('index')];
                            // trigger event
                            var eventData = obj.trigger({ phase: 'before', type: 'mouseOver', target: obj.el, originalEvent: event.originalEvent, item: item });
                            if (eventData.isCancelled === true) return;
                            // event after
                            obj.trigger($.extend(eventData, { phase: 'after' }));
                        }
                        $(tmp).data('mouse', 'over');
                    })
                    .on('mouseout', function (event) {
                        var tmp = event.target;
                        if (tmp.tagName != 'LI') tmp = tmp.parentNode;
                        if ($(tmp).hasClass('nomouse')) return;
                        $(tmp).data('mouse', 'leaving');
                        setTimeout(function () {
                            if ($(tmp).data('mouse') == 'leaving') {
                                $(tmp).data('mouse', 'out');
                                var item = selected[$(tmp).attr('index')];
                                // trigger event
                                var eventData = obj.trigger({ phase: 'before', type: 'f', target: obj.el, originalEvent: event.originalEvent, item: item });
                                if (eventData.isCancelled === true) return;
                                // event after
                                obj.trigger($.extend(eventData, { phase: 'after' }));
                            }
                        }, 0);
                    });
                // adjust height
                $(this.el).height('auto');
                var cntHeight = $(div).find('> div').height() + w2utils.getSize(div, '+height') * 2;
                if (cntHeight < 26) cntHeight = 26;
                if (cntHeight > options.maxHeight) cntHeight = options.maxHeight;
                if (div.length > 0) div[0].scrollTop = 1000;
                var inpHeight = w2utils.getSize($(this.el), 'height') - 2;
                if (inpHeight > cntHeight) cntHeight = inpHeight
                $(div).css({ 'height': cntHeight + 'px', overflow: (cntHeight == options.maxHeight ? 'auto' : 'hidden') });
                if (cntHeight < options.maxHeight) $(div).prop('scrollTop', 0);
                $(this.el).css({ 'height' : (cntHeight + 2) + 'px' });
            }
            return (new Date()).getTime() - time;
        },

        reset: function () {
            var obj  = this;
            var type = this.type;
            this.clear();
            this.type = type;
            this.init();
        },

        clean: function (val) {
            var options = this.options;
            val = String(val).trim();
            // clean
            if (['int', 'float', 'money', 'currency', 'percent'].indexOf(this.type) != -1) {
                if (typeof val == 'string') val = val.replace(options.decimalSymbol, '.');
                if (options.autoFormat && ['money', 'currency'].indexOf(this.type) != -1) val = String(val).replace(options.moneyRE, '');
                if (options.autoFormat && this.type == 'percent') val = String(val).replace(options.percentRE, '');
                if (options.autoFormat && ['int', 'float'].indexOf(this.type) != -1) val = String(val).replace(options.numberRE, '');
                if (parseFloat(val) == val) {
                    if (options.min !== null && val < options.min) { val = options.min; $(this.el).val(options.min); }
                    if (options.max !== null && val > options.max) { val = options.max; $(this.el).val(options.max); }
                }
                if (val !== '' && w2utils.isFloat(val)) val = Number(val); else val = '';
            }
            return val;
        },

        format: function (val) {
            var options = this.options;
            // autoformat numbers or money
            if (options.autoFormat && val != '') {
                switch (this.type) {
                    case 'money':
                    case 'currency':
                        val = w2utils.formatNumber(Number(val).toFixed(options.currencyPrecision), options.groupSymbol);
                        if (val != '') val = options.currencyPrefix + val + options.currencySuffix;
                        break;
                    case 'percent':
                        val = w2utils.formatNumber(options.precision ? Number(val).toFixed(options.precision) : val, options.groupSymbol);
                        if (val != '') val += '%';
                        break;
                    case 'float':
                        val = w2utils.formatNumber(options.precision ? Number(val).toFixed(options.precision) : val, options.groupSymbol);
                        break;
                    case 'int':
                        val = w2utils.formatNumber(val, options.groupSymbol);
                        break;
                }
            }
            return val;
        },

        change: function (event) {
            var obj     = this;
            var options = obj.options;
            // numeric
            if (['int', 'float', 'money', 'currency', 'percent'].indexOf(this.type) != -1) {
                // check max/min
                var val     =  $(this.el).val();
                var new_val = this.format(this.clean($(this.el).val()));
                // if was modified
                if (val != '' && val != new_val) {
                    $(this.el).val(new_val).change();
                    // cancel event
                    event.stopPropagation();
                    event.preventDefault();
                    return false;
                }
            }
            // color
            if (this.type == 'color') {
                var color = '#' + $(this.el).val();
                if ($(this.el).val().length != 6 && $(this.el).val().length != 3) color = '';
                $(this.el).next().find('div').css('background-color', color);
                if ($(obj.el).is(':focus')) this.updateOverlay();
            }
            // list, enum
            if (['list', 'enum', 'file'].indexOf(this.type) != -1) {
                obj.refresh();
                // need time out to show icon indent properly
                setTimeout(function () { obj.refresh(); }, 5); 
            }
            // date, time
            if (['date', 'time'].indexOf(this.type) != -1) {
                // convert linux timestamps
                var tmp = parseInt(obj.el.value);
                if (w2utils.isInt(obj.el.value) && tmp > 3000) {
                    if (this.type == 'time') $(obj.el).val(w2utils.formatTime(new Date(tmp), options.format)).change();
                    if (this.type == 'date') $(obj.el).val(w2utils.formatDate(new Date(tmp), options.format)).change();
                }
            }
        },

        click: function (event) {
            event.stopPropagation();
            // lists
            if (['list', 'combo', 'enum'].indexOf(this.type) != -1) {
                if (!$(this.el).is(':focus')) this.focus(event);
            }
            // other fields with drops
            if (['date', 'time', 'color'].indexOf(this.type) != -1) {
                this.updateOverlay();
            }
        },

        focus: function (event) {
            var obj     = this;
            var options = this.options;
            // color, date, time
            if (['color', 'date', 'time'].indexOf(obj.type) !== -1) {
                if ($(obj.el).attr('readonly') || $(obj.el).attr('disabled')) return;
                if ($("#w2ui-overlay").length > 0) $('#w2ui-overlay')[0].hide();
                setTimeout(function () { obj.updateOverlay(); }, 150);
            }
            // menu
            if (['list', 'combo', 'enum'].indexOf(obj.type) != -1) {
                if ($(obj.el).attr('readonly') || $(obj.el).attr('disabled')) return;
                if ($("#w2ui-overlay").length > 0) $('#w2ui-overlay')[0].hide();
                setTimeout(function () {
                    if (obj.type == 'list' && $(obj.el).is(':focus')) {
                        $(obj.helpers.focus).find('input').focus();
                        return;
                    }
                    obj.search();
                    setTimeout(function () { obj.updateOverlay(); }, 1);
                }, 1);
            }
            // file
            if (obj.type == 'file') {
                $(obj.helpers.multi).css({ 'outline': 'auto 5px #7DB4F3', 'outline-offset': '-2px' });
            }
        },

        blur: function (event) {
            var obj     = this;
            var options = obj.options;
            var val     = $(obj.el).val().trim();
            // hide overlay
            if (['color', 'date', 'time', 'list', 'combo', 'enum'].indexOf(obj.type) != -1) {
                if ($("#w2ui-overlay").length > 0) $('#w2ui-overlay')[0].hide();
            }
            if (['int', 'float', 'money', 'currency', 'percent'].indexOf(obj.type) != -1) {
                if (val !== '' && !obj.checkType(val)) {
                    $(obj.el).val('').change();
                    if (options.silent === false) {
                        $(obj.el).w2tag('Not a valid number');
                        setTimeout(function () { $(obj.el).w2tag(''); }, 3000);
                    }
                }
            }
            // date or time
            if (['date', 'time'].indexOf(obj.type) != -1) {
                // check if in range
                if (val !== '' && !obj.inRange(obj.el.value)) {
                    $(obj.el).val('').removeData('selected').change();
                    if (options.silent === false) {
                        $(obj.el).w2tag('Not in range');
                        setTimeout(function () { $(obj.el).w2tag(''); }, 3000);
                    }
                } else {
                    if (obj.type == 'date' && val !== '' && !w2utils.isDate(obj.el.value, options.format)) {
                        $(obj.el).val('').removeData('selected').change();
                        if (options.silent === false) {
                            $(obj.el).w2tag('Not a valid date');
                            setTimeout(function () { $(obj.el).w2tag(''); }, 3000);
                        }
                    }
                    if (obj.type == 'time' && val !== '' && !w2utils.isTime(obj.el.value)) {
                        $(obj.el).val('').removeData('selected').change();
                        if (options.silent === false) {
                            $(obj.el).w2tag('Not a valid time');
                            setTimeout(function () { $(obj.el).w2tag(''); }, 3000);
                        }
                    }
                }
            }
            // clear search input
            if (obj.type == 'enum') {
                $(obj.helpers.multi).find('input').val('').width(20);
            }
            // file
            if (obj.type == 'file') {
                $(obj.helpers.multi).css({ 'outline': 'none' });
            }
        },

        keyPress: function (event) {
            var obj     = this;
            var options = obj.options;
            // ignore wrong pressed key
            if (['int', 'float', 'money', 'currency', 'percent', 'hex', 'color', 'alphanumeric'].indexOf(obj.type) != -1) {
                // keyCode & charCode differ in FireFox
                if (event.metaKey || event.ctrlKey || event.altKey || (event.charCode != event.keyCode && event.keyCode > 0)) return;
                var ch = String.fromCharCode(event.charCode);
                if (!obj.checkType(ch, true) && event.keyCode != 13) {
                    event.preventDefault();
                    if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;
                    return false;
                }
            }
            // update date popup
            if (['date', 'time'].indexOf(obj.type) != -1) {
                setTimeout(function () { obj.updateOverlay(); }, 1);
            }
        },

        keyDown: function (event, extra) {
            var obj     = this;
            var options = obj.options;
            var key     = event.keyCode || (extra && extra.keyCode);
            // numeric
            if (['int', 'float', 'money', 'currency', 'percent'].indexOf(obj.type) != -1) {
                if (!options.keyboard || $(obj.el).attr('readonly')) return;
                var cancel = false;
                var val = parseFloat($(obj.el).val().replace(options.moneyRE, '')) || 0;
                var inc = options.step;
                if (event.ctrlKey || event.metaKey) inc = 10;
                switch (key) {
                    case 38: // up
                        if (event.shiftKey) break; // no action if shift key is pressed
                        $(obj.el).val((val + inc <= options.max || options.max === null ? Number((val + inc).toFixed(12)) : options.max)).change();
                        cancel = true;
                        break;
                    case 40: // down
                        if (event.shiftKey) break; // no action if shift key is pressed
                        $(obj.el).val((val - inc >= options.min || options.min === null ? Number((val - inc).toFixed(12)) : options.min)).change();
                        cancel = true;
                        break;
                }
                if (cancel) {
                    event.preventDefault();
                    setTimeout(function () {
                        // set cursor to the end
                        obj.el.setSelectionRange(obj.el.value.length, obj.el.value.length);
                    }, 0);
                }
            }
            // date
            if (obj.type == 'date') {
                if (!options.keyboard || $(obj.el).attr('readonly')) return;
                var cancel  = false;
                var daymil  = 24*60*60*1000;
                var inc        = 1;
                if (event.ctrlKey || event.metaKey) inc = 10;
                var dt = w2utils.isDate($(obj.el).val(), options.format, true);
                if (!dt) { dt = new Date(); daymil = 0; }
                switch (key) {
                    case 38: // up
                        if (event.shiftKey) break; // no action if shift key is pressed
                        var newDT = w2utils.formatDate(dt.getTime() + daymil, options.format);
                        if (inc == 10) newDT = w2utils.formatDate(new Date(dt.getFullYear(), dt.getMonth()+1, dt.getDate()), options.format);
                        $(obj.el).val(newDT).change();
                        cancel = true;
                        break;
                    case 40: // down
                        if (event.shiftKey) break; // no action if shift key is pressed
                        var newDT = w2utils.formatDate(dt.getTime() - daymil, options.format);
                        if (inc == 10) newDT = w2utils.formatDate(new Date(dt.getFullYear(), dt.getMonth()-1, dt.getDate()), options.format);
                        $(obj.el).val(newDT).change();
                        cancel = true;
                        break;
                }
                if (cancel) {
                    event.preventDefault();
                    setTimeout(function () {
                        // set cursor to the end
                        obj.el.setSelectionRange(obj.el.value.length, obj.el.value.length);
                        obj.updateOverlay();
                    }, 0);
                }
            }
            // time
            if (obj.type == 'time') {
                if (!options.keyboard || $(obj.el).attr('readonly')) return;
                var cancel  = false;
                var inc     = (event.ctrlKey || event.metaKey ? 60 : 1);
                var val     = $(obj.el).val();
                var time    = obj.toMin(val) || obj.toMin((new Date()).getHours() + ':' + ((new Date()).getMinutes() - 1));
                switch (key) {
                    case 38: // up
                        if (event.shiftKey) break; // no action if shift key is pressed
                        time += inc;
                        cancel = true;
                        break;
                    case 40: // down
                        if (event.shiftKey) break; // no action if shift key is pressed
                        time -= inc;
                        cancel = true;
                        break;
                }
                if (cancel) {
                    $(obj.el).val(obj.fromMin(time)).change();
                    event.preventDefault();
                    setTimeout(function () {
                        // set cursor to the end
                        obj.el.setSelectionRange(obj.el.value.length, obj.el.value.length);
                    }, 0);
                }
            }
            // color
            if (obj.type == 'color') {
                if ($(obj.el).attr('readonly')) return;
                // paste
                if (event.keyCode == 86 && (event.ctrlKey || event.metaKey)) {
                    $(obj.el).prop('maxlength', 7);
                    setTimeout(function () {
                        var val = $(obj).val();
                        if (val.substr(0, 1) == '#') val = val.substr(1);
                        if (!w2utils.isHex(val)) val = '';
                        $(obj).val(val).prop('maxlength', 6).change();
                    }, 20);
                }
                if ((event.ctrlKey || event.metaKey) && !event.shiftKey) {
                    if (typeof obj.tmp.cind1 == 'undefined') {
                        obj.tmp.cind1 = -1;
                        obj.tmp.cind2 = -1;
                    } else {
                        switch (key) {
                            case 38: // up
                                obj.tmp.cind1--;
                                break;
                            case 40: // down
                                obj.tmp.cind1++;
                                break;
                            case 39: // right
                                obj.tmp.cind2++;
                                break;
                            case 37: // left
                                obj.tmp.cind2--;
                                break;
                        }
                        if (obj.tmp.cind1 < 0) obj.tmp.cind1 = 0;
                        if (obj.tmp.cind1 > this.pallete.length - 1) obj.tmp.cind1 = this.pallete.length - 1;
                        if (obj.tmp.cind2 < 0) obj.tmp.cind2 = 0;
                        if (obj.tmp.cind2 > this.pallete[0].length - 1) obj.tmp.cind2 = this.pallete[0].length - 1;
                    }
                    if ([37, 38, 39, 40].indexOf(key) != -1) {
                        $(obj.el).val(this.pallete[obj.tmp.cind1][obj.tmp.cind2]).change();
                        event.preventDefault();
                    }
                }
            }
            // list/select/combo
            if (['list', 'combo', 'enum'].indexOf(obj.type) != -1) {
                if ($(obj.el).attr('readonly')) return;
                var cancel    = false;
                var selected  = $(obj.el).data('selected');
                var focus     = $(obj.helpers.focus).find('input');
                if (obj.type == 'list') {
                    if ([37, 38, 39, 40].indexOf(key) == -1) obj.refresh(); // arrows
                }
                // apply arrows
                switch (key) {
                    case 27: // escape
                        if (obj.type == 'list') {
                            if ($(focus).val() != '') $(focus).val('');
                            event.stopPropagation(); // escape in field should not close popup
                        }
                        break;
                    case 37: // left
                    case 39: // right
                        // cancel = true;
                        break;
                    case 13: // enter
                        if ($('#w2ui-overlay').length == 0) break; // no action if overlay not open
                        var item  = options.items[options.index];
                        var multi = $(obj.helpers.multi).find('input');
                        if (obj.type == 'enum') {
                            if (item != null) {
                                // trigger event
                                var eventData = obj.trigger({ phase: 'before', type: 'add', target: obj.el, originalEvent: event.originalEvent, item: item });
                                if (eventData.isCancelled === true) return;
                                item = eventData.item; // need to reassign because it could be recreated by user
                                // default behavior
                                if (selected.length >= options.max && options.max > 0) selected.pop();
                                delete item.hidden;
                                delete obj.tmp.force_open;
                                selected.push(item);
                                $(obj.el).change();
                                multi.val('').width(20);
                                obj.refresh();
                                // event after
                                obj.trigger($.extend(eventData, { phase: 'after' }));
                            } else {
                                // trigger event
                                item = { id: multi.val(), text: multi.val() }
                                var eventData = obj.trigger({ phase: 'before', type: 'new', target: obj.el, originalEvent: event.originalEvent, item: item });
                                if (eventData.isCancelled === true) return;
                                item = eventData.item; // need to reassign because it could be recreated by user
                                // default behavior
                                if (typeof obj.onNew == 'function') {
                                    if (selected.length >= options.max && options.max > 0) selected.pop();
                                    delete obj.tmp.force_open;
                                    selected.push(item);
                                    $(obj.el).change();
                                    multi.val('').width(20);
                                    obj.refresh();
                                }
                                // event after
                                obj.trigger($.extend(eventData, { phase: 'after' }));
                            }
                        } else {
                            if (item) $(obj.el).data('selected', item).val(item.text).change();
                            if ($(obj.el).val() == '' && $(obj.el).data('selected')) $(obj.el).removeData('selected').val('').change();
                            if (obj.type == 'list') {
                                focus.val('');
                                obj.refresh();
                            }
                            // hide overlay
                            obj.tmp.force_hide = true;
                        }
                        break;
                    case 8:  // backspace
                    case 46: // delete
                        if (obj.type == 'enum' && key == 8) {
                            if ($(obj.helpers.multi).find('input').val() == '' && selected.length > 0) {
                                var item = selected[selected.length - 1];
                                // trigger event
                                var eventData = obj.trigger({ phase: 'before', type: 'remove', target: obj.el, originalEvent: event.originalEvent, item: item });
                                if (eventData.isCancelled === true) return;
                                // default behavior
                                selected.pop();
                                $(obj.el).trigger('change');
                                obj.refresh();
                                // event after
                                obj.trigger($.extend(eventData, { phase: 'after' }));
                            }
                        }
                        if (obj.type == 'list' && $(focus).val() == '') {
                            $(obj.el).data('selected', {}).change();
                            obj.refresh();
                        }
                        break;
                    case 38: // up
                        options.index = w2utils.isInt(options.index) ? parseInt(options.index) : 0;
                        options.index--;
                        while (options.index > 0 && options.items[options.index].hidden) options.index--;
                        if (options.index == 0 && options.items[options.index].hidden) {
                            while (options.items[options.index] && options.items[options.index].hidden) options.index++;
                        }
                        cancel = true;
                        break;
                    case 40: // down
                        options.index = w2utils.isInt(options.index) ? parseInt(options.index) : -1;
                        options.index++;
                        while (options.index < options.items.length-1 && options.items[options.index].hidden) options.index++;
                        if (options.index == options.items.length-1 && options.items[options.index].hidden) {
                            while (options.items[options.index] && options.items[options.index].hidden) options.index--;
                        }
                        // show overlay if not shown
                        var input = obj.el;
                        if (['enum'].indexOf(obj.type) != -1) input = obj.helpers.multi.find('input');
                        if ($(input).val() == '' && $('#w2ui-overlay').length == 0) {
                            obj.tmp.force_open = true;
                        } else {
                            cancel = true;
                        }
                        break;
                }
                if (cancel) {
                    if (options.index < 0) options.index = 0;
                    if (options.index >= options.items.length) options.index = options.items.length -1;
                    obj.updateOverlay();
                    // cancel event
                    event.preventDefault();
                    setTimeout(function () {
                        // set cursor to the end
                        if (obj.type == 'enum') {
                            var tmp = obj.helpers.multi.find('input').get(0);
                            tmp.setSelectionRange(tmp.value.length, tmp.value.length);
                        } else if (obj.type == 'list') {
                            var tmp = obj.helpers.focus.find('input').get(0);
                            tmp.setSelectionRange(tmp.value.length, tmp.value.length);
                        } else {
                            obj.el.setSelectionRange(obj.el.value.length, obj.el.value.length);
                        }
                    }, 0);
                    return;
                }
                // expand input
                if (obj.type == 'enum') {
                    var input  = obj.helpers.multi.find('input');
                    var search = input.val();
                    input.width(((search.length + 2) * 8) + 'px');
                }
            }
        },

        keyUp: function (event) {
            if (this.type == 'color') {
                if (event.keyCode == 86 && (event.ctrlKey || event.metaKey)) $(this).prop('maxlength', 6);
            }
            if (['list', 'combo', 'enum'].indexOf(this.type) != -1) {
                // need to be here for ipad compatibility
                if ([16, 17, 18, 20, 37, 39, 91].indexOf(event.keyCode) == -1) { // no refreah on crtl, shift, left/right arrows, etc
                    if (!this.tmp.force_hide) this.request();
                    var input = $(this.helpers.focus).find('input');
                    if (input.val().length == 1) this.refresh()
                    this.search();
                }
            }
        },

        clearCache: function () {
            var options          = this.options;
            options.items        = [];
            this.tmp.xhr_loading = false;
            this.tmp.xhr_search  = '';
            this.tmp.xhr_total   = -1;
            this.search();
        },

        request: function (interval) {
            var obj      = this;
            var options  = this.options;
            var search   = $(obj.el).val() || '';
            // if no url - do nothing
            if (!options.url) return;
            // --
            if (obj.type == 'enum') {
                var tmp = $(obj.helpers.multi).find('input');
                if (tmp.length == 0) search = ''; else search = tmp.val();
            }
            if (obj.type == 'list') {
                var tmp = $(obj.helpers.focus).find('input');
                if (tmp.length == 0) search = ''; else search = tmp.val();
            }
            if (options.minLength != 0 && search.length < options.minLength) {
                options.items = []; // need to empty the list
                this.updateOverlay();
                return;
            }
            if (typeof interval == 'undefined') interval = 350;
            if (typeof obj.tmp.xhr_search == 'undefined') obj.tmp.xhr_search = '';
            if (typeof obj.tmp.xhr_total == 'undefined') obj.tmp.xhr_total = -1;
            // check if need to search
            if (options.url && $(obj.el).prop('readonly') != true && (
                    (options.items.length === 0 && obj.tmp.xhr_total !== 0) ||
                    (obj.tmp.xhr_total == options.cacheMax && search.length > obj.tmp.xhr_search.length) ||
                    (search.length >= obj.tmp.xhr_search.length && search.substr(0, obj.tmp.xhr_search.length) != obj.tmp.xhr_search) ||
                    (search.length < obj.tmp.xhr_search.length)
                )) {
                // empty list
                obj.tmp.xhr_loading = true;
                obj.search();
                // timeout
                clearTimeout(obj.tmp.timeout);
                obj.tmp.timeout = setTimeout(function () {
                    // trigger event
                    var url      = options.url;
                    var postData = {
                        search : search,
                        max    : options.cacheMax
                    };
                    $.extend(postData, options.postData);
                    var eventData = obj.trigger({ phase: 'before', type: 'request', target: obj.el, url: url, postData: postData });
                    if (eventData.isCancelled === true) return;
                    url      = eventData.url;
                    postData = eventData.postData;
                    // console.log('REMOTE SEARCH:', search);
                    if (obj.tmp.xhr) obj.tmp.xhr.abort();
                    var ajaxOptions = {
                        type     : 'GET',
                        url      : url,
                        data     : postData,
                        dataType : 'JSON' // expected from server
                    };
                    if (w2utils.settings.dataType == 'JSON') {
                        ajaxOptions.type        = 'POST';
                        ajaxOptions.data        = JSON.stringify(ajaxOptions.data);
                        ajaxOptions.contentType = 'application/json';
                    }
                    obj.tmp.xhr = $.ajax(ajaxOptions)
                        .done(function (data, status, xhr) {
                            // trigger event
                            var eventData2 = obj.trigger({ phase: 'before', type: 'load', target: obj.el, search: postData.search, data: data, xhr: xhr });
                            if (eventData2.isCancelled === true) return;
                            // default behavior
                            data = eventData2.data;
                            if (typeof data == 'string') data = JSON.parse(data);
                            if (data.status != 'success') {
                                console.log('ERROR: server did not return proper structure. It should return', { status: 'success', items: [{ id: 1, text: 'item' }] });
                                return;
                            }
                            // remove all extra items if more then needed for cache
                            if (data.items.length > options.cacheMax) data.items.splice(options.cacheMax, 100000);
                            // remember stats
                            obj.tmp.xhr_loading = false;
                            obj.tmp.xhr_search  = search;
                            obj.tmp.xhr_total   = data.items.length;
                            options.items       = obj.normMenu(data.items);
                            if (search == '' && data.items.length == 0) obj.tmp.emptySet = true; else obj.tmp.emptySet = false;
                            obj.search();
                            // console.log('-->', 'retrieved:', obj.tmp.xhr_total);
                            // event after
                            obj.trigger($.extend(eventData2, { phase: 'after' }));
                        })
                        .fail(function (xhr, status, error) {
                            // trigger event
                            var errorObj = { status: status, error: error, rawResponseText: xhr.responseText };
                            var eventData2 = obj.trigger({ phase: 'before', type: 'error', target: obj.el, search: search, error: errorObj, xhr: xhr });
                            if (eventData2.isCancelled === true) return;
                            // default behavior
                            if (status != 'abort') {
                                var data;
                                try { data = $.parseJSON(xhr.responseText) } catch (e) {}
                                console.log('ERROR: Server communication failed.', 
                                    '\n   EXPECTED:', { status: 'success', items: [{ id: 1, text: 'item' }] }, 
                                    '\n         OR:', { status: 'error', message: 'error message' },
                                    '\n   RECEIVED:', typeof data == 'object' ? data : xhr.responseText);
                            }
                            // reset stats
                            obj.clearCache();
                            // event after
                            obj.trigger($.extend(eventData2, { phase: 'after' }));
                        });
                    // event after
                    obj.trigger($.extend(eventData, { phase: 'after' }));
                }, interval);
            }
        },

        search: function () {
            var obj     = this;
            var options = this.options;
            var search  = $(obj.el).val();
            var target  = obj.el;
            var ids     = [];
            var selected= $(obj.el).data('selected');
            if (obj.type == 'enum') {
                target = $(obj.helpers.multi).find('input');
                search = target.val();
                for (var s in selected) { if (selected[s]) ids.push(selected[s].id); }
            }
            if (obj.type == 'list') {
                target = $(obj.helpers.focus).find('input');
                search = target.val();
                for (var s in selected) { if (selected[s]) ids.push(selected[s].id); }
            }
            // trigger event
            var eventData = obj.trigger({ phase: 'before', type: 'search', target: target, search: search });
            if (eventData.isCancelled === true) return;
            if (obj.tmp.xhr_loading !== true) {
                var shown = 0;
                for (var i in options.items) {
                    var item = options.items[i];
                    var prefix = '';
                    var suffix = '';
                    if (['is', 'begins'].indexOf(options.match) != -1) prefix = '^';
                    if (['is', 'ends'].indexOf(options.match) != -1) suffix = '$';
                    try {
                        var re = new RegExp(prefix + search + suffix, 'i');
                        if (re.test(item.text) || item.text == '...') item.hidden = false; else item.hidden = true;
                    } catch (e) {}
                    // do not show selected items
                    if (obj.type == 'enum' && $.inArray(item.id, ids) != -1) item.hidden = true;
                    if (item.hidden !== true) shown++;
                }
                if (obj.type != 'combo') { // don't preselect first for combo
                    options.index = 0;
                    while (options.items[options.index] && options.items[options.index].hidden) options.index++;
                } else {
                    options.index = -1;
                }
                if (shown <= 0) options.index = -1;
                options.spinner = false;
                obj.updateOverlay();
                setTimeout(function () { 
                    var html = $('#w2ui-overlay').html() || '';
                    if (options.markSearch && html.indexOf('$.fn.w2menuHandler') != -1) { // do not highlight when no items
                        $('#w2ui-overlay').w2marker(search); 
                    }
                }, 1);
            } else {
                options.items.splice(0, options.cacheMax);
                options.spinner = true;
                obj.updateOverlay();
            }
            // event after
            obj.trigger($.extend(eventData, { phase: 'after' }));
        },

        updateOverlay: function () {
            var obj     = this;
            var options = this.options;
            // color
            if (this.type == 'color') {
                if ($(obj.el).attr('readonly')) return;
                if ($('#w2ui-overlay').length == 0) {
                    $(obj.el).w2overlay(obj.getColorHTML());
                } else {
                    $('#w2ui-overlay').html(obj.getColorHTML());
                }
                // bind events
                $('#w2ui-overlay .color')
                    .on('mousedown', function (event) {
                        var color = $(event.originalEvent.target).attr('name');
                        var index = $(event.originalEvent.target).attr('index').split(':');
                        obj.tmp.cind1 = index[0];
                        obj.tmp.cind2 = index[1];
                        $(obj.el).val(color).change();
                        $(this).html('&#149;');
                    })
                    .on('mouseup', function () {
                        setTimeout(function () {
                            if ($("#w2ui-overlay").length > 0) $('#w2ui-overlay').removeData('keepOpen')[0].hide();
                        }, 10);
                    });
            }
            // date
            if (this.type == 'date') {
                if ($(obj.el).attr('readonly')) return;
                if ($('#w2ui-overlay').length == 0) {
                    $(obj.el).w2overlay('<div class="w2ui-reset w2ui-calendar" onclick="event.stopPropagation();"></div>', {
                        css: { "background-color": "#f5f5f5" }
                    });
                }
                var month, year;
                var dt = w2utils.isDate($(obj.el).val(), obj.options.format, true);
                if (dt) { month = dt.getMonth() + 1; year = dt.getFullYear(); }
                (function refreshCalendar(month, year) {
                    $('#w2ui-overlay > div > div').html(obj.getMonthHTML(month, year));
                    $('#w2ui-overlay .w2ui-calendar-title')
                        .on('mousedown', function () {
                            if ($(this).next().hasClass('w2ui-calendar-jump')) {
                                $(this).next().remove();
                            } else {
                                var selYear, selMonth;
                                $(this).after('<div class="w2ui-calendar-jump" style=""></div>');
                                $(this).next().hide().html(obj.getYearHTML()).fadeIn(200);
                                setTimeout(function () {
                                    $('#w2ui-overlay .w2ui-calendar-jump')
                                        .find('.w2ui-jump-month, .w2ui-jump-year')
                                        .on('click', function () {
                                            if ($(this).hasClass('w2ui-jump-month')) {
                                                $(this).parent().find('.w2ui-jump-month').removeClass('selected');
                                                $(this).addClass('selected');
                                                selMonth = $(this).attr('name');
                                            }
                                            if ($(this).hasClass('w2ui-jump-year')) {
                                                $(this).parent().find('.w2ui-jump-year').removeClass('selected');
                                                $(this).addClass('selected');
                                                selYear = $(this).attr('name');
                                            }
                                            if (selYear != null && selMonth != null) {
                                                $('#w2ui-overlay .w2ui-calendar-jump').fadeOut(100);
                                                setTimeout(function () { refreshCalendar(parseInt(selMonth)+1, selYear); }, 100);
                                            }
                                        });
                                    $('#w2ui-overlay .w2ui-calendar-jump >:last-child').prop('scrollTop', 2000);
                                }, 1);
                            }
                        });
                    $('#w2ui-overlay .w2ui-date')
                        .on('mousedown', function () {
                            var day = $(this).attr('date');
                            $(obj.el).val(day).change();
                            $(this).css({ 'background-color': '#B6D5FB', 'border-color': '#aaa' });
                        })
                        .on('mouseup', function () {
                            setTimeout(function () {
                                if ($("#w2ui-overlay").length > 0) $('#w2ui-overlay').removeData('keepOpen')[0].hide();
                            }, 10);
                        });
                    $('#w2ui-overlay .previous').on('mousedown', function () {
                        var tmp = obj.options.current.split('/');
                        tmp[0]  = parseInt(tmp[0]) - 1;
                        refreshCalendar(tmp[0], tmp[1]);
                    });
                    $('#w2ui-overlay .next').on('mousedown', function () {
                        var tmp = obj.options.current.split('/');
                        tmp[0]  = parseInt(tmp[0]) + 1;
                        refreshCalendar(tmp[0], tmp[1]);
                    });
                }) (month, year);
            }
            // date
            if (this.type == 'time') {
                if ($(obj.el).attr('readonly')) return;
                if ($('#w2ui-overlay').length == 0) {
                    $(obj.el).w2overlay('<div class="w2ui-reset w2ui-calendar-time" onclick="event.stopPropagation();"></div>', {
                        css: { "background-color": "#fff" }
                    });
                }
                var h24 = (this.options.format == 'h24' ? true : false);
                $('#w2ui-overlay > div').html(obj.getHourHTML());
                $('#w2ui-overlay .w2ui-time')
                    .on('mousedown', function (event) {
                        $(this).css({ 'background-color': '#B6D5FB', 'border-color': '#aaa' });
                        var hour = $(this).attr('hour');
                        $(obj.el).val((hour > 12 && !h24 ? hour - 12 : hour) + ':00' + (!h24 ? (hour < 12 ? ' am' : ' pm') : '')).change();
                    })
                    .on('mouseup', function () {
                        var hour = $(this).attr('hour');
                        if ($("#w2ui-overlay").length > 0) $('#w2ui-overlay')[0].hide();
                        $(obj.el).w2overlay('<div class="w2ui-reset w2ui-calendar-time"></div>', { css: { "background-color": "#fff" } });
                        $('#w2ui-overlay > div').html(obj.getMinHTML(hour));
                        $('#w2ui-overlay .w2ui-time')
                            .on('mousedown', function () {
                                $(this).css({ 'background-color': '#B6D5FB', 'border-color': '#aaa' });
                                var min = $(this).attr('min');
                                $(obj.el).val((hour > 12 && !h24 ? hour - 12 : hour) + ':' + (min < 10 ? 0 : '') + min + (!h24 ? (hour < 12 ? ' am' : ' pm') : '')).change();
                            })
                            .on('mouseup', function () {
                                setTimeout(function () { if ($("#w2ui-overlay").length > 0) $('#w2ui-overlay').removeData('keepOpen')[0].hide(); }, 10);
                            });
                    });
            }
            // list
            if (['list', 'combo', 'enum'].indexOf(this.type) != -1) {
                var el    = this.el;
                var input = this.el;
                if (this.type == 'enum') {
                    el    = $(this.helpers.multi);
                    input = $(el).find('input');
                }
                if (this.type == 'list') {
                    input = $(this.helpers.focus).find('input');
                }
                if ($(input).is(':focus')) {
                    if (options.openOnFocus === false && $(input).val() == '' && obj.tmp.force_open !== true) {
                        $().w2overlay();
                        return;
                    }
                    if (obj.tmp.force_hide) {
                        $().w2overlay();
                        setTimeout(function () {
                            delete obj.tmp.force_hide;
                        }, 1);                        
                        return;
                    }
                    if ($(input).val() != '') delete obj.tmp.force_open;
                    if ($('#w2ui-overlay').length == 0) options.index = 0;
                    var msgNoItems = w2utils.lang('No matches');
                    if (options.url != null && $(input).val().length < options.minLength && obj.tmp.emptySet !== true) msgNoItems = options.minLength + ' ' + w2utils.lang('letters or more...');
                    if (options.url != null && $(input).val() == '' && obj.tmp.emptySet !== true) msgNoItems = w2utils.lang('Type to search....');
                    $(el).w2menu('refresh', $.extend(true, {}, options, {
                        search     : false,
                        render     : options.renderDrop,
                        maxHeight  : options.maxDropHeight,
                        msgNoItems : msgNoItems,
                        // selected with mouse
                        onSelect: function (event) {
                            if (obj.type == 'enum') {
                                var selected = $(obj.el).data('selected');
                                if (event.item) {
                                    // trigger event
                                    var eventData = obj.trigger({ phase: 'before', type: 'add', target: obj.el, originalEvent: event.originalEvent, item: event.item });
                                    if (eventData.isCancelled === true) return;
                                    // default behavior
                                    if (selected.length >= options.max && options.max > 0) selected.pop();
                                    delete event.item.hidden;
                                    selected.push(event.item);
                                    $(obj.el).data('selected', selected).change();
                                    $(obj.helpers.multi).find('input').val('').width(20);
                                    obj.refresh();
                                    if ($("#w2ui-overlay").length > 0) $('#w2ui-overlay')[0].hide();
                                    // event after
                                    obj.trigger($.extend(eventData, { phase: 'after' }));
                                }
                            } else {
                                $(obj.el).data('selected', event.item).val(event.item.text).change();
                                if (obj.helpers.focus) obj.helpers.focus.find('input').val('');
                            }
                        }
                    }));
                }
            }
        },

        inRange: function (str) {
            var inRange = false;
            if (this.type == 'date') {
                var dt = w2utils.isDate(str, this.options.format, true);
                if (dt) {
                    // enable range
                    if (this.options.start || this.options.end) {
                        var st = (typeof this.options.start == 'string' ? this.options.start : $(this.options.start).val());
                        var en = (typeof this.options.end == 'string' ? this.options.end : $(this.options.end).val());
                        var start   = w2utils.isDate(st, this.options.format, true);
                        var end     = w2utils.isDate(en, this.options.format, true);
                        var current = new Date(dt);
                        if (!start) start = current;
                        if (!end) end = current;
                        if (current >= start && current <= end) inRange = true;
                    } else {
                        inRange = true;
                    }
                    // block predefined dates
                    if (this.options.blocked && $.inArray(str, this.options.blocked) != -1) inRange = false;
                }
            }
            if (this.type == 'time') {
                if (this.options.start || this.options.end) {
                    var tm  = this.toMin(str);
                    var tm1 = this.toMin(this.options.start);
                    var tm2 = this.toMin(this.options.end);
                    if (!tm1) tm1 = tm;
                    if (!tm2) tm2 = tm;
                    if (tm >= tm1 && tm <= tm2) inRange = true;
                } else {
                    inRange = true;
                }
            }
            return inRange;
        },

        /*
        *  INTERNAL FUNCTIONS
        */

        checkType: function (ch, loose) {
            var obj = this;
            switch (obj.type) {
                case 'int':
                    if (loose && ['-', obj.options.groupSymbol].indexOf(ch) != -1) return true;
                    return w2utils.isInt(ch.replace(obj.options.numberRE, ''));
                case 'percent':
                    ch = ch.replace(/%/g, '');
                case 'float':
                    if (loose && ['-', w2utils.settings.decimalSymbol, obj.options.groupSymbol].indexOf(ch) != -1) return true;
                    return w2utils.isFloat(ch.replace(obj.options.numberRE, ''));
                case 'money':
                case 'currency':
                    if (loose && ['-', obj.options.decimalSymbol, obj.options.groupSymbol, obj.options.currencyPrefix, obj.options.currencySuffix].indexOf(ch) != -1) return true;
                    return w2utils.isFloat(ch.replace(obj.options.moneyRE, ''));
                case 'hex':
                case 'color':
                    return w2utils.isHex(ch);
                case 'alphanumeric':
                    return w2utils.isAlphaNumeric(ch);
            }
            return true;
        },

        addPrefix: function () {
            var obj = this;
            setTimeout(function () {
                if (obj.type === 'clear') return;
                var helper;
                var tmp = $(obj.el).data('tmp') || {};
                if (tmp['old-padding-left']) $(obj.el).css('padding-left', tmp['old-padding-left']);
                tmp['old-padding-left'] = $(obj.el).css('padding-left');
                $(obj.el).data('tmp', tmp);
                // remove if already displaed
                if (obj.helpers.prefix) $(obj.helpers.prefix).remove();
                if (obj.options.prefix !== '') {
                    // add fresh
                    $(obj.el).before(
                        '<div class="w2ui-field-helper">'+
                            obj.options.prefix +
                        '</div>'
                    );
                    helper = $(obj.el).prev();
                    helper
                        .css({
                            'color'          : $(obj.el).css('color'),
                            'font-family'    : $(obj.el).css('font-family'),
                            'font-size'      : $(obj.el).css('font-size'),
                            'padding-top'    : $(obj.el).css('padding-top'),
                            'padding-bottom' : $(obj.el).css('padding-bottom'),
                            'padding-left'   : $(obj.el).css('padding-left'),
                            'padding-right'  : 0,
                            'margin-top'     : (parseInt($(obj.el).css('margin-top'), 10) + 2) + 'px',
                            'margin-bottom'  : (parseInt($(obj.el).css('margin-bottom'), 10) + 1) + 'px',
                            'margin-left'    : $(obj.el).css('margin-left'),
                            'margin-right'   : 0
                        })
                        .on('click', function (event) {
                            if (obj.options.icon && typeof obj.onIconClick == 'function') {
                                // event before
                                var eventData = obj.trigger({ phase: 'before', type: 'iconClick', target: obj.el, el: $(this).find('span.w2ui-icon')[0] });
                                if (eventData.isCancelled === true) return;
                                
                                // intentionally empty

                                // event after
                                obj.trigger($.extend(eventData, { phase: 'after' }));                                
                            } else {
                                if (obj.type == 'list') {
                                    $(obj.helpers.focus).find('input').focus();
                                } else {
                                    $(obj.el).focus();
                                }
                            }
                        });
                    $(obj.el).css('padding-left', (helper.width() + parseInt($(obj.el).css('padding-left'), 10)) + 'px');
                    // remember helper
                    obj.helpers.prefix = helper;
                }
            }, 1);
        },

        addSuffix: function () {
            var obj = this;
            var helper, pr;
            setTimeout(function () {
                if (obj.type === 'clear') return;
                var tmp = $(obj.el).data('tmp') || {};
                if (tmp['old-padding-right']) $(obj.el).css('padding-right', tmp['old-padding-right']);
                tmp['old-padding-right'] = $(obj.el).css('padding-right');
                $(obj.el).data('tmp', tmp);
                pr = parseInt($(obj.el).css('padding-right'), 10);
                if (obj.options.arrows) {
                    // remove if already displaed
                    if (obj.helpers.arrows) $(obj.helpers.arrows).remove();
                    // add fresh
                    $(obj.el).after(
                        '<div class="w2ui-field-helper" style="border: 1px solid transparent">&nbsp;'+
                        '    <div class="w2ui-field-up" type="up">'+
                        '        <div class="arrow-up" type="up"></div>'+
                        '    </div>'+
                        '    <div class="w2ui-field-down" type="down">'+
                        '        <div class="arrow-down" type="down"></div>'+
                        '    </div>'+
                        '</div>');
                    var height = w2utils.getSize(obj.el, 'height');
                    helper = $(obj.el).next();
                    helper.css({
                            'color'         : $(obj.el).css('color'),
                            'font-family'   : $(obj.el).css('font-family'),
                            'font-size'     : $(obj.el).css('font-size'),
                            'height'        : ($(obj.el).height() + parseInt($(obj.el).css('padding-top'), 10) + parseInt($(obj.el).css('padding-bottom'), 10) ) + 'px',
                            'padding'       : 0,
                            'margin-top'    : (parseInt($(obj.el).css('margin-top'), 10) + 1) + 'px',
                            'margin-bottom' : 0,
                            'border-left'   : '1px solid silver'
                        })
                        .css('margin-left', '-'+ (helper.width() + parseInt($(obj.el).css('margin-right'), 10) + 12) + 'px')
                        .on('mousedown', function (event) {
                            $('body').on('mouseup', tmp);
                            $('body').data('_field_update_timer', setTimeout(update, 700));
                            update(false);
                            // timer function
                            function tmp() {
                                clearTimeout($('body').data('_field_update_timer'));
                                $('body').off('mouseup', tmp);
                            }
                            // update function
                            function update(notimer) {
                                $(obj.el).focus();
                                obj.keyDown($.Event("keydown"), {
                                    keyCode : ($(event.target).attr('type') == 'up' ? 38 : 40)
                                });
                                if (notimer !== false) $('body').data('_field_update_timer', setTimeout(update, 60));
                            }
                        });
                    pr += helper.width() + 12;
                    $(obj.el).css('padding-right', pr + 'px');
                    // remember helper
                    obj.helpers.arrows = helper;
                }
                if (obj.options.suffix !== '') {
                    // remove if already displaed
                    if (obj.helpers.suffix) $(obj.helpers.suffix).remove();
                    // add fresh
                    $(obj.el).after(
                        '<div class="w2ui-field-helper">'+
                            obj.options.suffix +
                        '</div>');
                    helper = $(obj.el).next();
                    helper
                        .css({
                            'color'          : $(obj.el).css('color'),
                            'font-family'    : $(obj.el).css('font-family'),
                            'font-size'      : $(obj.el).css('font-size'),
                            'padding-top'    : $(obj.el).css('padding-top'),
                            'padding-bottom' : $(obj.el).css('padding-bottom'),
                            'padding-left'   : '3px',
                            'padding-right'  : $(obj.el).css('padding-right'),
                            'margin-top'     : (parseInt($(obj.el).css('margin-top'), 10) + 2) + 'px',
                            'margin-bottom'  : (parseInt($(obj.el).css('margin-bottom'), 10) + 1) + 'px'
                        })
                        .on('click', function (event) {
                            if (obj.type == 'list') {
                                $(obj.helpers.focus).find('input').focus();
                            } else {
                                $(obj.el).focus();
                            }
                        });

                    helper.css('margin-left', '-'+ (w2utils.getSize(helper, 'width') + parseInt($(obj.el).css('margin-right'), 10) + 2) + 'px');
                    pr += helper.width() + 3;
                    $(obj.el).css('padding-right', pr + 'px');
                    // remember helper
                    obj.helpers.suffix = helper;
                }
            }, 1);
        },

        addFocus: function () {
            var obj      = this;
            var options  = this.options;
            var width    = 0; // 11 - show search icon, 0 do not show
            // clean up & init
            $(obj.helpers.focus).remove();
            // remember original tabindex
            var tabIndex = $(obj.el).attr('tabIndex');
            if (tabIndex && tabIndex != -1) obj.el._tabIndex = tabIndex;
            if (obj.el._tabIndex) tabIndex = obj.el._tabIndex;
            // build helper
            var html =
                '<div class="w2ui-field-helper">'+ 
                '    <div class="w2ui-icon icon-search" style="display: none"></div>'+
                '    <input type="text" autocomplete="off" tabindex="'+ tabIndex +'">'+
                '<div>';
            $(obj.el).attr('tabindex', -1).before(html);
            var helper = $(obj.el).prev();
            obj.helpers.focus = helper;
            helper.css({
                    width           : $(obj.el).width(),
                    "margin-top"    : $(obj.el).css('margin-top'),
                    "margin-left"   : (parseInt($(obj.el).css('margin-left')) + parseInt($(obj.el).css('padding-left'))) + 'px',
                    "margin-bottom" : $(obj.el).css('margin-bottom'),
                    "margin-right"  : $(obj.el).css('margin-right')
                })
                .find('input')
                .css({
                    cursor   : 'default',
                    width    : '100%',
                    outline  : 'none',
                    opacity  : 1,
                    margin   : 0,
                    border   : '1px solid transparent',
                    padding  : $(obj.el).css('padding-top'),
                    "padding-left"     : 0,
                    "margin-left"      : (width > 0 ? width + 6 : 0),
                    "background-color" : 'transparent'
                });
            // INPUT events
            helper.find('input')
                .on('click', function (event) {
                    if ($('#w2ui-overlay').length == 0) obj.focus(event);
                    event.stopPropagation();
                })
                .on('focus', function (event) {
                    $(obj.el).css({ 'outline': 'auto 5px #7DB4F3', 'outline-offset': '-2px' });
                    $(this).val('');
                    $(obj.el).triggerHandler('focus');
                    if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;
                })
                .on('blur', function (event) {
                    $(obj.el).css('outline', 'none');
                    $(this).val('');
                    obj.refresh(); 
                    $(obj.el).triggerHandler('blur');
                    if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;
                })
                .on('keyup',    function (event) { obj.keyUp(event) })
                .on('keydown',  function (event) { obj.keyDown(event) })
                .on('keypress', function (event) { obj.keyPress(event); });
            // MAIN div
            helper.on('click', function (event) { $(this).find('input').focus(); });
            obj.refresh();
        },    

        addMulti: function () {
            var obj         = this;
            var options     = this.options;
            // clean up & init
            $(obj.helpers.multi).remove();
            // build helper
            var html   = '';
            var margin =
                'margin-top     : 0px; ' +
                'margin-bottom  : 0px; ' +
                'margin-left    : ' + $(obj.el).css('margin-left') + '; ' +
                'margin-right   : ' + $(obj.el).css('margin-right') + '; '+
                'width          : ' + (w2utils.getSize(obj.el, 'width')
                                    - parseInt($(obj.el).css('margin-left'), 10)
                                    - parseInt($(obj.el).css('margin-right'), 10))
                                    + 'px;';
            if (obj.type == 'enum') {
                html =  '<div class="w2ui-field-helper w2ui-list" style="'+ margin + '; box-sizing: border-box">'+
                        '    <div style="padding: 0px; margin: 0px; margin-right: 20px; display: inline-block">'+
                        '    <ul>'+
                        '        <li style="padding-left: 0px; padding-right: 0px" class="nomouse">'+
                        '            <input type="text" style="width: 20px" autocomplete="off" '+ ($(obj.el).attr('readonly') ? 'readonly': '') + '>'+
                        '        </li>'+
                        '    </ul>'+
                        '    </div>'+
                        '</div>';
            }
            if (obj.type == 'file') {
                html =  '<div class="w2ui-field-helper w2ui-list" style="'+ margin + '; box-sizing: border-box">'+
                        '    <div style="padding: 0px; margin: 0px; margin-right: 20px; display: inline-block">'+
                        '    <ul><li style="padding-left: 0px; padding-right: 0px" class="nomouse"></li></ul>'+
                        '    <input class="file-input" type="file" name="attachment" multiple style="display: none" tabindex="-1">'+
                        '    </div>'+
                        '</div>';
            }
            $(obj.el)
                .before(html)
                .css({
                    'background-color' : 'transparent',
                    'border-color'     : 'transparent'
                });

            var div    = $(obj.el).prev();
            obj.helpers.multi = div;
            if (obj.type == 'enum') {
                $(obj.el).attr('tabindex', -1);
                // INPUT events
                div.find('input')
                    .on('click', function (event) {
                        if ($('#w2ui-overlay').length == 0) obj.focus(event);
                        $(obj.el).triggerHandler('click');
                    })
                    .on('focus', function (event) {
                        $(div).css({ 'outline': 'auto 5px #7DB4F3', 'outline-offset': '-2px' });
                        $(obj.el).triggerHandler('focus');
                        if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;
                    })
                    .on('blur', function (event) {
                        $(div).css('outline', 'none');
                        $(obj.el).triggerHandler('blur');
                        if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;
                    })
                    .on('keyup',    function (event) { obj.keyUp(event) })
                    .on('keydown',  function (event) { obj.keyDown(event) })
                    .on('keypress', function (event) { div.find('.w2ui-enum-placeholder').remove(); obj.keyPress(event); });
                // MAIN div
                div.on('click', function (event) { $(this).find('input').focus(); });
            }
            if (obj.type == 'file') {
                $(obj.el).css('outline', 'none');
                div.on('click', function (event) {
                        $(obj.el).focus();
                        if ($(obj.el).attr('readonly')) return;
                        obj.blur(event);
                        div.find('input').click();
                    })
                    .on('dragenter', function (event) {
                        if ($(obj.el).attr('readonly')) return;
                        $(div).addClass('w2ui-file-dragover');
                    })
                    .on('dragleave', function (event) {
                        if ($(obj.el).attr('readonly')) return;
                        var tmp = $(event.target).parents('.w2ui-field-helper');
                        if (tmp.length == 0) $(div).removeClass('w2ui-file-dragover');
                    })
                    .on('drop', function (event) {
                        if ($(obj.el).attr('readonly')) return;
                        $(div).removeClass('w2ui-file-dragover');
                        var files = event.originalEvent.dataTransfer.files;
                        for (var i=0, l=files.length; i<l; i++) obj.addFile.call(obj, files[i]);
                        // cancel to stop browser behaviour
                        event.preventDefault();
                        event.stopPropagation();
                    })
                    .on('dragover', function (event) {
                        // cancel to stop browser behaviour
                        event.preventDefault();
                        event.stopPropagation();
                    });
                div.find('input')
                    .on('click', function (event) {
                        event.stopPropagation();
                    })
                    .on('change', function () {
                        if (typeof this.files !== "undefined") {
                            for (var i = 0, l = this.files.length; i < l; i++) {
                                obj.addFile.call(obj, this.files[i]);
                            }
                        }
                    });
            }
            obj.refresh();
        },    

        addFile: function (file) {
            var obj      = this;
            var options  = this.options;
            var selected = $(obj.el).data('selected');
            var newItem  = {
                name     : file.name,
                type     : file.type,
                modified : file.lastModifiedDate,
                size     : file.size,
                content  : null
            };
            var size = 0;
            var cnt  = 0;
            var err;
            for (var s in selected) { 
                // check for dups
                if (selected[s].name == file.name && selected[s].size == file.size) return;
                size += selected[s].size; cnt++; 
            }
            // trigger event
            var eventData = obj.trigger({ phase: 'before', type: 'add', target: obj.el, file: newItem, total: cnt, totalSize: size });
            if (eventData.isCancelled === true) return;
            // check params
            if (options.maxFileSize !== 0 && newItem.size > options.maxFileSize) {
                err = 'Maximum file size is '+ w2utils.size(options.maxFileSize);
                if (options.silent === false) $(obj.el).w2tag(err);
                console.log('ERROR: '+ err);
                return;
            }
            if (options.maxSize !== 0 && size + newItem.size > options.maxSize) {
                err = 'Maximum total size is '+ w2utils.size(options.maxSize);
                if (options.silent === false) $(obj.el).w2tag(err);
                console.log('ERROR: '+ err);
                return;
            }
            if (options.max !== 0 && cnt >= options.max) {
                err = 'Maximum number of files is '+ options.max;
                if (options.silent === false) $(obj.el).w2tag(err);
                console.log('ERROR: '+ err);
                return;
            }
            selected.push(newItem);
            // read file as base64
            if (typeof FileReader !== "undefined") {
                var reader = new FileReader();
                // need a closure
                reader.onload = (function () {
                    return function (event) {
                        var fl  = event.target.result;
                        var ind = fl.indexOf(',');
                        newItem.content = fl.substr(ind+1);
                        obj.refresh();
                        $(obj.el).trigger('change');
                        // event after
                        obj.trigger($.extend(eventData, { phase: 'after' }));
                    };
                })();
                reader.readAsDataURL(file);
            } else {
                obj.refresh();
                $(obj.el).trigger('change');
            }
        },

        normMenu: function (menu) {
            if ($.isArray(menu)) {
                for (var m = 0; m < menu.length; m++) {
                    if (typeof menu[m] == 'string') {
                        menu[m] = { id: menu[m], text: menu[m] };
                    } else {
                        if (typeof menu[m].text != 'undefined' && typeof menu[m].id == 'undefined') menu[m].id = menu[m].text;
                        if (typeof menu[m].text == 'undefined' && typeof menu[m].id != 'undefined') menu[m].text = menu[m].id;
                        if (typeof menu[m].caption != 'undefined') menu[m].text = menu[m].caption;
                    }
                }
                return menu;
            } else if (typeof menu == 'object') {
                var tmp = []
                for (var m in menu) tmp.push({ id: m, text: menu[m] });
                return tmp;
            }
        },

        getColorHTML: function () {
            var html =  '<div class="w2ui-color">'+
                        '<table cellspacing="5">';
            for (var i = 0; i < 8; i++) {
                html += '<tr>';
                for (var j = 0; j < 8; j++) {
                    html += '<td>'+
                            '    <div class="color" style="background-color: #'+ this.pallete[i][j] +';" name="'+ this.pallete[i][j] +'" index="'+ i + ':' + j +'">'+
                            '        '+ ($(this.el).val() == this.pallete[i][j] ? '&#149;' : '&nbsp;')+
                            '    </div>'+
                            '</td>';
                }
                html += '</tr>';
                if (i < 2) html += '<tr><td style="height: 8px" colspan="8"></td></tr>';
            }
            html += '</table></div>';
            return html;
        },

        getMonthHTML: function (month, year) {
            var td         = new Date();
            var months     = w2utils.settings.fullmonths;
            var days       = w2utils.settings.fulldays;
            var daysCount  = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];
            var today      = td.getFullYear() + '/' + (Number(td.getMonth()) + 1) + '/' + td.getDate();
            // normalize date
            year  = w2utils.isInt(year)  ? parseInt(year)  : td.getFullYear();
            month = w2utils.isInt(month) ? parseInt(month) : td.getMonth() + 1;
            if (month > 12) { month -= 12; year++; }
            if (month < 1 || month === 0)  { month += 12; year--; }
            if (year/4 == Math.floor(year/4)) { daysCount[1] = '29'; } else { daysCount[1] = '28'; }
            this.options.current = month + '/' + year;

            // start with the required date
            td = new Date(year, month-1, 1);
            var weekDay = td.getDay();
            var tabDays = w2utils.settings.shortdays;
            var dayTitle = '';
            for ( var i = 0, len = tabDays.length; i < len; i++) {
                dayTitle += '<td>' + tabDays[i] + '</td>';
            }
            var html  =
                '<div class="w2ui-calendar-title title">'+
                '    <div class="w2ui-calendar-previous previous"> <div></div> </div>'+
                '    <div class="w2ui-calendar-next next"> <div></div> </div> '+
                        months[month-1] +', '+ year +
                '</div>'+
                '<table class="w2ui-calendar-days" cellspacing="0">'+
                '    <tr class="w2ui-day-title">' + dayTitle + '</tr>'+
                '    <tr>';

            var day = 1;
            for (var ci=1; ci<43; ci++) {
                if (weekDay === 0 && ci == 1) {
                    for (var ti=0; ti<6; ti++) html += '<td class="w2ui-day-empty">&nbsp;</td>';
                    ci += 6;
                } else {
                    if (ci < weekDay || day > daysCount[month-1]) {
                        html += '<td class="w2ui-day-empty">&nbsp;</td>';
                        if ((ci) % 7 === 0) html += '</tr><tr>';
                        continue;
                    }
                }
                var dt  = year + '/' + month + '/' + day;

                var className = '';
                if (ci % 7 == 6)  className  = ' w2ui-saturday';
                if (ci % 7 === 0) className  = ' w2ui-sunday';
                if (dt == today)  className += ' w2ui-today';

                var dspDay  = day;
                var col     = '';
                var bgcol   = '';
                var tmp_dt  = w2utils.formatDate(dt, this.options.format);
                if (this.options.colored && this.options.colored[tmp_dt] !== undefined) { // if there is predefined colors for dates
                    tmp   = this.options.colored[tmp_dt].split(':');
                    bgcol = 'background-color: ' + tmp[0] + ';';
                    col   = 'color: ' + tmp[1] + ';';
                }
                html += '<td class="'+ (this.inRange(tmp_dt) ? 'w2ui-date ' : 'w2ui-blocked') + className + '" style="'+ col + bgcol + '" date="'+ tmp_dt +'">'+
                            dspDay +
                        '</td>';
                if (ci % 7 === 0 || (weekDay === 0 && ci == 1)) html += '</tr><tr>';
                day++;
            }
            html += '</tr></table>';
            return html;
        },

        getYearHTML: function () {
            var months = w2utils.settings.shortmonths;
            var mhtml  = '';
            var yhtml  = '';
            for (var m in months) {
                mhtml += '<div class="w2ui-jump-month" name="'+ m +'">'+ months[m] + '</div>';
            }
            for (var y = 1950; y <= 2020; y++) {
                yhtml += '<div class="w2ui-jump-year" name="'+ y +'">'+ y + '</div>'
            }
            return '<div>'+ mhtml +'</div><div>'+ yhtml +'</div>';
        },

        getHourHTML: function () {
            var tmp = [];
            var h24 = (this.options.format == 'h24' ? true : false);
            for (var a=0; a<24; a++) {
                var time = (a >= 12 && !h24 ? a - 12 : a) + ':00' + (!h24 ? (a < 12 ? ' am' : ' pm') : '');
                if (a == 12 && !h24) time = '12:00 pm';
                if (!tmp[Math.floor(a/8)]) tmp[Math.floor(a/8)] = '';
                var tm1 = this.fromMin(this.toMin(time));
                var tm2 = this.fromMin(this.toMin(time) + 59);
                tmp[Math.floor(a/8)] += '<div class="'+ (this.inRange(tm1) || this.inRange(tm2) ? 'w2ui-time ' : 'w2ui-blocked') + '" hour="'+ a +'">'+ time +'</div>';
            }
            var html =
                '<div class="w2ui-calendar-time"><table><tr>'+
                '    <td>'+ tmp[0] +'</td>' +
                '    <td>'+ tmp[1] +'</td>' +
                '    <td>'+ tmp[2] +'</td>' +
                '</tr></table></div>';
            return html;
        },

        getMinHTML: function (hour) {
            if (typeof hour == 'undefined') hour = 0;
            var h24 = (this.options.format == 'h24' ? true : false);
            var tmp = [];
            for (var a=0; a<60; a+=5) {
                var time = (hour > 12 && !h24 ? hour - 12 : hour) + ':' + (a < 10 ? 0 : '') + a + ' ' + (!h24 ? (hour < 12 ? 'am' : 'pm') : '');
                var ind = a < 20 ? 0 : (a < 40 ? 1 : 2);
                if (!tmp[ind]) tmp[ind] = '';
                tmp[ind] += '<div class="'+ (this.inRange(time) ? 'w2ui-time ' : 'w2ui-blocked') + '" min="'+ a +'">'+ time +'</div>';
            }
            var html =
                '<div class="w2ui-calendar-time"><table><tr>'+
                '    <td>'+ tmp[0] +'</td>' +
                '    <td>'+ tmp[1] +'</td>' +
                '    <td>'+ tmp[2] +'</td>' +
                '</tr></table></div>';
            return html;
        },

        toMin: function (str) {
            if (typeof str != 'string') return null;
            var tmp = str.split(':');
            if (tmp.length == 2) {
                tmp[0] = parseInt(tmp[0]);
                tmp[1] = parseInt(tmp[1]);
                if (str.indexOf('pm') != -1 && tmp[0] != 12) tmp[0] += 12;
            } else {
                return null;
            }
            return tmp[0] * 60 + tmp[1];
        },

        fromMin: function (time) {
            var ret = '';
            if (time >= 24 * 60) time = time % (24 * 60);
            if (time < 0) time = 24 * 60 + time;
            var hour = Math.floor(time/60);
            var min  = ((time % 60) < 10 ? '0' : '') + (time % 60);
            if (this.options.format.indexOf('h24') != -1) {
                ret = hour + ':' + min;
            } else {
                ret = (hour <= 12 ? hour : hour - 12) + ':' + min + ' ' + (hour >= 12 ? 'pm' : 'am');
            }
            return ret;
        }
    }

    $.extend(w2field.prototype, w2utils.event);
    w2obj.field = w2field;

}) (jQuery);

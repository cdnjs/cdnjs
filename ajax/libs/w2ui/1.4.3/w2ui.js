/* w2ui 1.4.x (nightly) (c) http://w2ui.com, vitmalina@gmail.com */
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
*        - w2grid        - grid widget
*        - $().w2grid    - jQuery wrapper
*   - Dependencies: jQuery, w2utils, w2toolbar, w2fields, w2alert, w2confirm
*
* == NICE TO HAVE ==
*   - frozen columns
*   - add colspans
*   - allow this.total to be unknown (-1)
*   - column autosize based on largest content
*   - easy bubbles in the grid
*   - More than 2 layers of header groups
*   - reorder columns/records
*   - hidden searches could not be clearned by the user
*   - problem with .set() and arrays, array get extended too, but should be replaced
*   - move events into prototype
*   - add grid.focus()
*   - add showExtra, KickIn Infinite scroll when so many records
*   - after edit stay on the same record option
*   - allow render: function to be filters
*
************************************************************************/

(function () {
    var w2grid = function(options) {

        // public properties
        this.name         = null;
        this.box          = null;     // HTML element that hold this element
        this.header       = '';
        this.url          = '';
        this.routeData    = {};       // data for dynamic routes
        this.columns      = [];       // { field, caption, size, attr, render, hidden, gridMinWidth, editable }
        this.columnGroups = [];       // { span: int, caption: 'string', master: true/false }
        this.records      = [];       // { recid: int(requied), field1: 'value1', ... fieldN: 'valueN', style: 'string', editable: true/false, summary: true/false, changes: object }
        this.summary      = [];       // arry of summary records, same structure as records array
        this.searches     = [];       // { type, caption, field, inTag, outTag, hidden }
        this.searchData   = [];
        this.sortData     = [];
        this.postData     = {};
        this.toolbar      = {};       // if not empty object; then it is toolbar object

        this.show = {
            header          : false,
            toolbar         : false,
            footer          : false,
            columnHeaders   : true,
            lineNumbers     : false,
            expandColumn    : false,
            selectColumn    : false,
            emptyRecords    : true,
            toolbarReload   : true,
            toolbarColumns  : true,
            toolbarSearch   : true,
            toolbarAdd      : false,
            toolbarEdit     : false,
            toolbarDelete   : false,
            toolbarSave     : false,
            selectionBorder : true,
            recordTitles    : true,
            skipRecords     : true
        };

        this.autoLoad       = true;     // for infinite scroll
        this.fixedBody      = true;     // if false; then grid grows with data
        this.recordHeight   = 24;
        this.keyboard       = true;
        this.selectType     = 'row';    // can be row|cell
        this.multiSearch    = true;
        this.multiSelect    = true;
        this.multiSort      = true;
        this.reorderColumns = false;
        this.reorderRows    = false;
        this.markSearch     = true;

        this.total   = 0;     // server total
        this.limit   = 100;
        this.offset  = 0;     // how many records to skip (for infinite scroll) when pulling from server
        this.style   = '';
        this.ranges  = [];
        this.menu    = [];
        this.method  = null;         // if defined, then overwrited ajax method
        this.recid   = null;
        this.parser  = null;

        // events
        this.onAdd              = null;
        this.onEdit             = null;
        this.onRequest          = null;        // called on any server event
        this.onLoad             = null;
        this.onDelete           = null;
        this.onDeleted          = null;
        this.onSubmit           = null;
        this.onSave             = null;
        this.onSelect           = null;
        this.onUnselect         = null;
        this.onClick            = null;
        this.onDblClick         = null;
        this.onContextMenu      = null;
        this.onMenuClick        = null;        // when context menu item selected
        this.onColumnClick      = null;
        this.onColumnResize     = null;
        this.onSort             = null;
        this.onSearch           = null;
        this.onChange           = null;        // called when editable record is changed
        this.onRestore          = null;        // called when editable record is restored
        this.onExpand           = null;
        this.onCollapse         = null;
        this.onError            = null;
        this.onKeydown          = null;
        this.onToolbar          = null;     // all events from toolbar
        this.onColumnOnOff      = null;
        this.onCopy             = null;
        this.onPaste            = null;
        this.onSelectionExtend  = null;
        this.onEditField        = null;
        this.onRender           = null;
        this.onRefresh          = null;
        this.onReload           = null;
        this.onResize           = null;
        this.onDestroy          = null;
        this.onStateSave        = null;
        this.onStateRestore     = null;

        // internal
        this.last = {
            field     : 'all',
            caption   : w2utils.lang('All Fields'),
            logic     : 'OR',
            search    : '',
            searchIds : [],
            selection : {
                indexes : [],
                columns : {}
            },
            multi       : false,
            scrollTop   : 0,
            scrollLeft  : 0,
            sortData    : null,
            sortCount   : 0,
            xhr         : null,
            range_start : null,
            range_end   : null,
            sel_ind     : null,
            sel_col     : null,
            sel_type    : null,
            edit_col    : null
        };

        $.extend(true, this, w2obj.grid, options);
    };

    // ====================================================
    // -- Registers as a jQuery plugin

    $.fn.w2grid = function(method) {
        if (typeof method === 'object' || !method ) {
            // check name parameter
            if (!w2utils.checkName(method, 'w2grid')) return;
            // remember items
            var columns      = method.columns;
            var columnGroups = method.columnGroups;
            var records      = method.records;
            var searches     = method.searches;
            var searchData   = method.searchData;
            var sortData     = method.sortData;
            var postData     = method.postData;
            var toolbar      = method.toolbar;
            // extend items
            var object = new w2grid(method);
            $.extend(object, { postData: {}, records: [], columns: [], searches: [], toolbar: {}, sortData: [], searchData: [], handlers: [] });
            if (object.onExpand != null) object.show.expandColumn = true;
            $.extend(true, object.toolbar, toolbar);
            // reassign variables
            for (var p in columns)      object.columns[p]       = $.extend(true, {}, columns[p]);
            for (var p in columnGroups) object.columnGroups[p]  = $.extend(true, {}, columnGroups[p]);
            for (var p in searches)     object.searches[p]      = $.extend(true, {}, searches[p]);
            for (var p in searchData)   object.searchData[p]    = $.extend(true, {}, searchData[p]);
            for (var p in sortData)     object.sortData[p]      = $.extend(true, {}, sortData[p]);
            object.postData = $.extend(true, {}, postData);

            // check if there are records without recid
            for (var r in records) {
                if (records[r].recid == null || typeof records[r].recid == 'undefined') {
                    console.log('ERROR: Cannot add records without recid. (obj: '+ object.name +')');
                    return;
                }
                object.records[r] = $.extend(true, {}, records[r]);
            }
            // add searches
            for (var c in object.columns) {
                var col = object.columns[c];
                if (typeof col.searchable == 'undefined' || object.getSearch(col.field) != null) continue;
                var stype = col.searchable;
                var attr  = '';
                if (col.searchable === true) { stype = 'text'; attr = 'size="20"'; }
                object.addSearch({ field: col.field, caption: col.caption, type: stype, attr: attr });
            }
            // init toolbar
            object.initToolbar();
            // render if necessary
            if ($(this).length !== 0) {
                object.render($(this)[0]);
            }
            // register new object
            w2ui[object.name] = object;
            return object;

        } else if (w2ui[$(this).attr('name')]) {
            var obj = w2ui[$(this).attr('name')];
            obj[method].apply(obj, Array.prototype.slice.call(arguments, 1));
            return this;
        } else {
            console.log('ERROR: Method ' +  method + ' does not exist on jQuery.w2grid');
        }
    }

    // ====================================================
    // -- Implementation of core functionality

    w2grid.prototype = {
        // ----
        // properties that need to be in prototype

        msgDelete       : w2utils.lang('Are you sure you want to delete selected records?'),
        msgNotJSON      : w2utils.lang('Returned data is not in valid JSON format.'),
        msgAJAXerror    : w2utils.lang('AJAX error. See console for more details.'),
        msgRefresh      : w2utils.lang('Refreshing...'),

        // for easy button overwrite
        buttons: {
            'reload'   : { type: 'button', id: 'w2ui-reload', icon: 'w2ui-icon-reload', hint: w2utils.lang('Reload data in the list') },
            'columns'  : { type: 'drop', id: 'w2ui-column-on-off', icon: 'w2ui-icon-columns', hint: w2utils.lang('Show/hide columns'), arrow: false, html: '' },
            'search'   : { type: 'html',   id: 'w2ui-search',
                            html: '<div class="w2ui-icon icon-search-down w2ui-search-down" title="'+ 'Select Search Field' +'" '+
                                  'onclick="var obj = w2ui[$(this).parents(\'div.w2ui-grid\').attr(\'name\')]; obj.searchShowFields();"></div>'
                          },
            'search-go': { type: 'check',  id: 'w2ui-search-advanced', caption: w2utils.lang('Search...'), hint: w2utils.lang('Open Search Fields') },
            'add'      : { type: 'button', id: 'w2ui-add', caption: w2utils.lang('Add New'), hint: w2utils.lang('Add new record'), icon: 'w2ui-icon-plus' },
            'edit'     : { type: 'button', id: 'w2ui-edit', caption: w2utils.lang('Edit'), hint: w2utils.lang('Edit selected record'), icon: 'w2ui-icon-pencil', disabled: true },
            'delete'   : { type: 'button', id: 'w2ui-delete', caption: w2utils.lang('Delete'), hint: w2utils.lang('Delete selected records'), icon: 'w2ui-icon-cross', disabled: true },
            'save'     : { type: 'button', id: 'w2ui-save', caption: w2utils.lang('Save'), hint: w2utils.lang('Save changed records'), icon: 'w2ui-icon-check' }
        },

        add: function (record) {
            if (!$.isArray(record)) record = [record];
            var added = 0;
            for (var o in record) {
                if (this.recid && typeof record[o].recid == 'undefined') record[o].recid = record[o][this.recid];
                if (record[o].recid == null || typeof record[o].recid == 'undefined') {
                    console.log('ERROR: Cannot add record without recid. (obj: '+ this.name +')');
                    continue;
                }
                this.records.push(record[o]);
                added++;
            }
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            if (!url) {
                this.total = this.records.length;
                this.localSort();
                this.localSearch();
            }
            this.refresh(); // ??  should it be reload?
            return added;
        },

        find: function (obj, returnIndex) {
            if (typeof obj == 'undefined' || obj == null) obj = {};
            var recs    = [];
            var hasDots    = false;
            // check if property is nested - needed for speed
            for (var o in obj) if (String(o).indexOf('.') != -1) hasDots = true;
            // look for an item
            for (var i = 0; i < this.records.length; i++) {
                var match = true;
                for (var o in obj) {
                    var val = this.records[i][o];
                    if (hasDots && String(o).indexOf('.') != -1) val = this.parseField(this.records[i], o);
                    if (obj[o] !== val) match = false;
                }
                if (match && returnIndex !== true) recs.push(this.records[i].recid);
                if (match && returnIndex === true) recs.push(i);
            }
            return recs;
        },

        set: function (recid, record, noRefresh) { // does not delete existing, but overrides on top of it
            if (typeof recid == 'object') {
                noRefresh = record;
                record    = recid;
                recid     = null;
            }
            // update all records
            if (recid == null) {
                for (var r in this.records) {
                    $.extend(true, this.records[r], record); // recid is the whole record
                }
                if (noRefresh !== true) this.refresh();
            } else { // find record to update
                var ind = this.get(recid, true);
                if (ind == null) return false;
                var isSummary = (this.records[ind] && this.records[ind].recid == recid ? false : true);
                if (isSummary) {
                    $.extend(true, this.summary[ind], record);
                } else {
                    $.extend(true, this.records[ind], record);
                }
                if (noRefresh !== true) this.refreshRow(recid); // refresh only that record
            }
            return true;
        },

        get: function (recid, returnIndex) {
            // search records
            for (var i = 0; i < this.records.length; i++) {
                if (this.records[i].recid == recid) {
                    if (returnIndex === true) return i; else return this.records[i];
                }
            }
            // search summary
            for (var i = 0; i < this.summary.length; i++) {
                if (this.summary[i].recid == recid) {
                    if (returnIndex === true) return i; else return this.summary[i];
                }
            }
            return null;
        },

        remove: function () {
            var removed = 0;
            for (var a = 0; a < arguments.length; a++) {
                for (var r = this.records.length-1; r >= 0; r--) {
                    if (this.records[r].recid == arguments[a]) { this.records.splice(r, 1); removed++; }
                }
            }
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            if (!url) {
                this.localSort();
                this.localSearch();
            }
            this.refresh();
            return removed;
        },

        addColumn: function (before, columns) {
            var added = 0;
            if (arguments.length == 1) {
                columns = before;
                before  = this.columns.length;
            } else {
                if (typeof before == 'string') before = this.getColumn(before, true);
                if (before === null) before = this.columns.length;
            }
            if (!$.isArray(columns)) columns = [columns];
            for (var o in columns) {
                this.columns.splice(before, 0, columns[o]);
                before++;
                added++;
            }
            this.refresh();
            return added;
        },

        removeColumn: function () {
            var removed = 0;
            for (var a = 0; a < arguments.length; a++) {
                for (var r = this.columns.length-1; r >= 0; r--) {
                    if (this.columns[r].field == arguments[a]) { this.columns.splice(r, 1); removed++; }
                }
            }
            this.refresh();
            return removed;
        },

        getColumn: function (field, returnIndex) {
            for (var i = 0; i < this.columns.length; i++) {
                if (this.columns[i].field == field) {
                    if (returnIndex === true) return i; else return this.columns[i];
                }
            }
            return null;
        },

        toggleColumn: function () {
            var effected = 0;
            for (var a = 0; a < arguments.length; a++) {
                for (var r = this.columns.length-1; r >= 0; r--) {
                    var col = this.columns[r];
                    if (col.field == arguments[a]) {
                        col.hidden = !col.hidden;
                        effected++;
                    }
                }
            }
            this.refresh();
            return effected;
        },

        showColumn: function () {
            var shown = 0;
            for (var a = 0; a < arguments.length; a++) {
                for (var r = this.columns.length-1; r >= 0; r--) {
                    var col = this.columns[r];
                    if (col.gridMinWidth) delete col.gridMinWidth;
                    if (col.field == arguments[a] && col.hidden !== false) {
                        col.hidden = false;
                        shown++;
                    }
                }
            }
            this.refresh();
            return shown;
        },

        hideColumn: function () {
            var hidden = 0;
            for (var a = 0; a < arguments.length; a++) {
                for (var r = this.columns.length-1; r >= 0; r--) {
                    var col = this.columns[r];
                    if (col.field == arguments[a] && col.hidden !== true) {
                        col.hidden = true;
                        hidden++;
                    }
                }
            }
            this.refresh();
            return hidden;
        },

        addSearch: function (before, search) {
            var added = 0;
            if (arguments.length == 1) {
                search = before;
                before = this.searches.length;
            } else {
                if (typeof before == 'string') before = this.getSearch(before, true);
                if (before === null) before = this.searches.length;
            }
            if (!$.isArray(search)) search = [search];
            for (var o in search) {
                this.searches.splice(before, 0, search[o]);
                before++;
                added++;
            }
            this.searchClose();
            return added;
        },

        removeSearch: function () {
            var removed = 0;
            for (var a = 0; a < arguments.length; a++) {
                for (var r = this.searches.length-1; r >= 0; r--) {
                    if (this.searches[r].field == arguments[a]) { this.searches.splice(r, 1); removed++; }
                }
            }
            this.searchClose();
            return removed;
        },

        getSearch: function (field, returnIndex) {
            for (var i = 0; i < this.searches.length; i++) {
                if (this.searches[i].field == field) {
                    if (returnIndex === true) return i; else return this.searches[i];
                }
            }
            return null;
        },

        toggleSearch: function () {
            var effected = 0;
            for (var a = 0; a < arguments.length; a++) {
                for (var r = this.searches.length-1; r >= 0; r--) {
                    if (this.searches[r].field == arguments[a]) {
                        this.searches[r].hidden = !this.searches[r].hidden;
                        effected++;
                    }
                }
            }
            this.searchClose();
            return effected;
        },

        showSearch: function () {
            var shown = 0;
            for (var a = 0; a < arguments.length; a++) {
                for (var r = this.searches.length-1; r >= 0; r--) {
                    if (this.searches[r].field == arguments[a] && this.searches[r].hidden !== false) {
                        this.searches[r].hidden = false;
                        shown++;
                    }
                }
            }
            this.searchClose();
            return shown;
        },

        hideSearch: function () {
            var hidden = 0;
            for (var a = 0; a < arguments.length; a++) {
                for (var r = this.searches.length-1; r >= 0; r--) {
                    if (this.searches[r].field == arguments[a] && this.searches[r].hidden !== true) {
                        this.searches[r].hidden = true;
                        hidden++;
                    }
                }
            }
            this.searchClose();
            return hidden;
        },

        getSearchData: function (field) {
            for (var s in this.searchData) {
                if (this.searchData[s].field == field) return this.searchData[s];
            }
            return null;
        },

        localSort: function (silent) {
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            if (url) {
                console.log('ERROR: grid.localSort can only be used on local data source, grid.url should be empty.');
                return;
            }
            if ($.isEmptyObject(this.sortData)) return;
            var time = (new Date()).getTime();
            var obj = this;
            // process date fields
            obj.prepareData();
            // process sortData
            for (var s in this.sortData) {
                var column = this.getColumn(this.sortData[s].field);
                if (!column) return;
                if (typeof column.render == 'string') {
                    if (['date', 'age'].indexOf(column.render.split(':')[0]) != -1) {
                        this.sortData[s]['field_'] = column.field + '_';
                    }
                    if (['time'].indexOf(column.render.split(':')[0]) != -1) {
                        this.sortData[s]['field_'] = column.field + '_';
                    }
                }
            }
            // process sort
            this.records.sort(function (a, b) {
                var ret = 0;
                for (var s in obj.sortData) {
                    var fld = obj.sortData[s].field;
                    if (obj.sortData[s].field_) fld = obj.sortData[s].field_;
                    var aa = a[fld];
                    var bb = b[fld];
                    if (String(fld).indexOf('.') != -1) {
                        aa = obj.parseField(a, fld);
                        bb = obj.parseField(b, fld);
                    }
                    if (typeof aa == 'string') aa = $.trim(aa.toLowerCase());
                    if (typeof bb == 'string') bb = $.trim(bb.toLowerCase());
                    if (aa > bb) ret = (obj.sortData[s].direction == 'asc' ? 1 : -1);
                    if (aa < bb) ret = (obj.sortData[s].direction == 'asc' ? -1 : 1);
                    if (typeof aa != 'object' && typeof bb == 'object') ret = -1;
                    if (typeof bb != 'object' && typeof aa == 'object') ret = 1;
                    if (aa == null && bb != null) ret = 1;    // all nuls and undefined on bottom
                    if (aa != null && bb == null) ret = -1;
                    if (ret != 0) break;
                }
                return ret;
            });
            time = (new Date()).getTime() - time;
            if (silent !== true) setTimeout(function () { obj.status(w2utils.lang('Sorting took') + ' ' + time/1000 + ' ' + w2utils.lang('sec')); }, 10);
            return time;
        },

        localSearch: function (silent) {
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            if (url) {
                console.log('ERROR: grid.localSearch can only be used on local data source, grid.url should be empty.');
                return;
            }
            var time = (new Date()).getTime();
            var obj = this;
            this.total = this.records.length;
            // mark all records as shown
            this.last.searchIds = [];
            // prepare date/time fields
            this.prepareData();
            // hide records that did not match
            if (this.searchData.length > 0 && !url) {
                this.total = 0;
                for (var r in this.records) {
                    var rec = this.records[r];
                    var fl  = 0;
                    for (var s in this.searchData) {
                        var sdata      = this.searchData[s];
                        var search     = this.getSearch(sdata.field);
                        if (sdata  == null) continue;
                        if (search == null) search = { field: sdata.field, type: sdata.type };
                        var val1 = String(obj.parseField(rec, search.field)).toLowerCase();
                        if (typeof sdata.value != 'undefined') {
                            if (!$.isArray(sdata.value)) {
                                var val2 = String(sdata.value).toLowerCase();
                            } else {
                                var val2 = sdata.value[0];
                                var val3 = sdata.value[1];
                            }
                        }
                        switch (sdata.operator) {
                            case 'is':
                                 if (rec[search.field] == sdata.value) fl++; // do not hide record
                                if (search.type == 'date') {
                                    var val1 = w2utils.formatDate(rec[search.field + '_'], 'yyyy-mm-dd');
                                    var val2 = w2utils.formatDate(val2, 'yyyy-mm-dd');
                                    if (val1 == val2) fl++;
                                }
                                if (search.type == 'time') {
                                    var val1 = w2utils.formatTime(rec[search.field + '_'], 'h24:mi');
                                    var val2 = w2utils.formatTime(val2, 'h24:mi');
                                    if (val1 == val2) fl++;
                                }
                                break;
                            case 'between':
                                if (['int', 'float', 'money', 'currency', 'percent'].indexOf(search.type) != -1) {
                                    if (parseFloat(rec[search.field]) >= parseFloat(val2) && parseFloat(rec[search.field]) <= parseFloat(val3)) fl++;
                                }
                                if (search.type == 'date') {
                                    var val1 = rec[search.field + '_'];
                                    var val2 = w2utils.isDate(val2, w2utils.settings.date_format, true);
                                    var val3 = w2utils.isDate(val3, w2utils.settings.date_format, true);
                                    if (val3 != null) val3 = new Date(val3.getTime() + 86400000); // 1 day
                                    if (val1 >= val2 && val1 < val3) fl++;
                                }
                                if (search.type == 'time') {
                                    var val1 = rec[search.field + '_'];
                                    var val2 = w2utils.isTime(val2, true);
                                    var val3 = w2utils.isTime(val3, true);
                                    val2 = (new Date()).setHours(val2.hours, val2.minutes, val2.seconds ? val2.seconds : 0, 0);
                                    val3 = (new Date()).setHours(val3.hours, val3.minutes, val3.seconds ? val3.seconds : 0, 0);
                                    if (val1 >= val2 && val1 < val3) fl++;
                                }
                                break;
                            case 'in':
                                var tmp = sdata.value;
                                if (sdata.svalue) tmp = sdata.svalue;
                                if (tmp.indexOf(val1) !== -1) fl++;
                                break;
                            case 'not in':
                                var tmp = sdata.value;
                                if (sdata.svalue) tmp = sdata.svalue;
                                if (tmp.indexOf(val1) == -1) fl++;
                                break;
                            case 'begins':
                            case 'begins with': // need for back compatib.
                                if (val1.indexOf(val2) == 0) fl++; // do not hide record
                                break;
                            case 'contains':
                                if (val1.indexOf(val2) >= 0) fl++; // do not hide record
                                break;
                            case 'ends':
                            case 'ends with': // need for back compatib.
                                if (val1.indexOf(val2) >= 0 && val1.indexOf(val2) == val1.length - val2.length) fl++; // do not hide record
                                break;
                        }
                    }
                    if ((this.last.logic == 'OR' && fl != 0) || (this.last.logic == 'AND' && fl == this.searchData.length)) this.last.searchIds.push(parseInt(r));
                }
                this.total = this.last.searchIds.length;
            }
            time = (new Date()).getTime() - time;
            if (silent !== true) setTimeout(function () { obj.status(w2utils.lang('Search took') + ' ' + time/1000 + ' ' + w2utils.lang('sec')); }, 10);
            return time;
        },

        getRangeData: function (range, extra) {
            var rec1 = this.get(range[0].recid, true);
            var rec2 = this.get(range[1].recid, true);
            var col1 = range[0].column;
            var col2 = range[1].column;

            var res = [];
            if (col1 == col2) { // one row
                for (var r = rec1; r <= rec2; r++) {
                    var record = this.records[r];
                    var dt = record[this.columns[col1].field] || null;
                    if (extra !== true) {
                        res.push(dt);
                    } else {
                        res.push({ data: dt, column: col1, index: r, record: record });
                    }
                }
            } else if (rec1 == rec2) { // one line
                var record = this.records[rec1];
                for (var i = col1; i <= col2; i++) {
                    var dt = record[this.columns[i].field] || null;
                    if (extra !== true) {
                        res.push(dt);
                    } else {
                        res.push({ data: dt, column: i, index: rec1, record: record });
                    }
                }
            } else {
                for (var r = rec1; r <= rec2; r++) {
                    var record = this.records[r];
                    res.push([]);
                    for (var i = col1; i <= col2; i++) {
                        var dt = record[this.columns[i].field];
                        if (extra !== true) {
                            res[res.length-1].push(dt);
                        } else {
                            res[res.length-1].push({ data: dt, column: i, index: r, record: record });
                        }
                    }
                }
            }
            return res;
        },

        addRange: function (ranges) {
            var added = 0;
            if (this.selectType == 'row') return added;
            if (!$.isArray(ranges)) ranges = [ranges];
            // if it is selection
            for (var r in ranges) {
                if (typeof ranges[r] != 'object') ranges[r] = { name: 'selection' };
                if (ranges[r].name == 'selection') {
                    if (this.show.selectionBorder === false) continue;
                    var sel = this.getSelection();
                    if (sel.length == 0) {
                        this.removeRange(ranges[r].name);
                        continue;
                    } else {
                        var first = sel[0];
                        var last  = sel[sel.length-1];
                        var td1   = $('#grid_'+ this.name +'_rec_'+ first.recid + ' td[col='+ first.column +']');
                        var td2   = $('#grid_'+ this.name +'_rec_'+ last.recid + ' td[col='+ last.column +']');
                    }
                } else { // other range
                    var first = ranges[r].range[0];
                    var last  = ranges[r].range[1];
                    var td1   = $('#grid_'+ this.name +'_rec_'+ first.recid + ' td[col='+ first.column +']');
                    var td2   = $('#grid_'+ this.name +'_rec_'+ last.recid + ' td[col='+ last.column +']');
                }
                if (first) {
                    var rg = {
                        name: ranges[r].name,
                        range: [{ recid: first.recid, column: first.column }, { recid: last.recid, column: last.column }],
                        style: ranges[r].style || ''
                    };
                    // add range
                    var ind = false;
                    for (var t in this.ranges) if (this.ranges[t].name == ranges[r].name) { ind = r; break; }
                    if (ind !== false) {
                        this.ranges[ind] = rg;
                    } else {
                        this.ranges.push(rg);
                    }
                    added++
                }
            }
            this.refreshRanges();
            return added;
        },

        removeRange: function () {
            var removed = 0;
            for (var a = 0; a < arguments.length; a++) {
                var name = arguments[a];
                $('#grid_'+ this.name +'_'+ name).remove();
                for (var r = this.ranges.length-1; r >= 0; r--) {
                    if (this.ranges[r].name == name) {
                        this.ranges.splice(r, 1);
                        removed++;
                    }
                }
            }
            return removed;
        },

        refreshRanges: function () {
            var obj  = this;
            var time = (new Date()).getTime();
            var rec  = $('#grid_'+ this.name +'_records');
            for (var r in this.ranges) {
                var rg    = this.ranges[r];
                var first = rg.range[0];
                var last  = rg.range[1];
                var td1   = $('#grid_'+ this.name +'_rec_'+ first.recid + ' td[col='+ first.column +']');
                var td2   = $('#grid_'+ this.name +'_rec_'+ last.recid + ' td[col='+ last.column +']');
                if ($('#grid_'+ this.name +'_'+ rg.name).length == 0) {
                    rec.append('<div id="grid_'+ this.name +'_' + rg.name +'" class="w2ui-selection" style="'+ rg.style +'">'+
                                    (rg.name == 'selection' ?  '<div id="grid_'+ this.name +'_resizer" class="w2ui-selection-resizer"></div>' : '')+
                                '</div>');
                } else {
                    $('#grid_'+ this.name +'_'+ rg.name).attr('style', rg.style);
                }
                if (td1.length > 0 && td2.length > 0) {
                    $('#grid_'+ this.name +'_'+ rg.name).css({
                        left     : (td1.position().left - 1 + rec.scrollLeft()) + 'px',
                        top     : (td1.position().top - 1 + rec.scrollTop()) + 'px',
                        width     : (td2.position().left - td1.position().left + td2.width() + 3) + 'px',
                        height     : (td2.position().top - td1.position().top + td2.height() + 3) + 'px'
                    });
                }
            }

            // add resizer events
            $(this.box).find('#grid_'+ this.name +'_resizer').off('mousedown').on('mousedown', mouseStart);
            //$(this.box).find('#grid_'+ this.name +'_resizer').off('selectstart').on('selectstart', function () { return false; }); // fixes chrome cursror bug

            var eventData = { phase: 'before', type: 'selectionExtend', target: obj.name, originalRange: null, newRange: null };

            function mouseStart (event) {
                var sel = obj.getSelection();
                obj.last.move = {
                    type   : 'expand',
                    x      : event.screenX,
                    y      : event.screenY,
                    divX   : 0,
                    divY   : 0,
                    recid  : sel[0].recid,
                    column : sel[0].column,
                    originalRange : [{ recid: sel[0].recid, column: sel[0].column }, { recid: sel[sel.length-1].recid, column: sel[sel.length-1].column }],
                    newRange      : [{ recid: sel[0].recid, column: sel[0].column }, { recid: sel[sel.length-1].recid, column: sel[sel.length-1].column }]
                };
                $(document).off('mousemove', mouseMove).on('mousemove', mouseMove);
                $(document).off('mouseup', mouseStop).on('mouseup', mouseStop);
            }

            function mouseMove (event) {
                var mv = obj.last.move;
                if (!mv || mv.type != 'expand') return;
                mv.divX = (event.screenX - mv.x);
                mv.divY = (event.screenY - mv.y);
                // find new cell
                var recid, column;
                var tmp = event.originalEvent.target;
                if (tmp.tagName != 'TD') tmp = $(tmp).parents('td')[0];
                if (typeof $(tmp).attr('col') != 'undefined') column = parseInt($(tmp).attr('col'));
                tmp = $(tmp).parents('tr')[0];
                recid = $(tmp).attr('recid');
                // new range
                if (mv.newRange[1].recid == recid && mv.newRange[1].column == column) return;
                var prevNewRange = $.extend({}, mv.newRange);
                mv.newRange = [{ recid: mv.recid, column: mv.column }, { recid: recid, column: column }];
                // event before
                eventData = obj.trigger($.extend(eventData, { originalRange: mv.originalRange, newRange : mv.newRange }));
                if (eventData.isCancelled === true) {
                    mv.newRange        = prevNewRange;
                    eventData.newRange = prevNewRange;
                    return;
                } else {
                    // default behavior
                    obj.removeRange('grid-selection-expand');
                    obj.addRange({
                        name  : 'grid-selection-expand',
                        range : eventData.newRange,
                        style : 'background-color: rgba(100,100,100,0.1); border: 2px dotted rgba(100,100,100,0.5);'
                    });
                }
            }

            function mouseStop (event) {
                // default behavior
                obj.removeRange('grid-selection-expand');
                delete obj.last.move;
                $(document).off('mousemove', mouseMove);
                $(document).off('mouseup', mouseStop);
                // event after
                obj.trigger($.extend(eventData, { phase: 'after' }));
            }

            return (new Date()).getTime() - time;
        },

        select: function () {
            var selected = 0;
            var sel    = this.last.selection;
            if (!this.multiSelect) this.selectNone();
            for (var a = 0; a < arguments.length; a++) {
                var recid  = typeof arguments[a] == 'object' ? arguments[a].recid : arguments[a];
                var record = this.get(recid);
                if (record == null) continue;
                var index  = this.get(recid, true);
                var recEl  = $('#grid_'+ this.name +'_rec_'+ w2utils.escapeId(recid));
                if (this.selectType == 'row') {
                    if (sel.indexes.indexOf(index) >= 0) continue;
                    // event before
                    var eventData = this.trigger({ phase: 'before', type: 'select', target: this.name, recid: recid, index: index });
                    if (eventData.isCancelled === true) continue;
                    // default action
                    sel.indexes.push(index);
                    sel.indexes.sort(function(a, b) { return a-b });
                    recEl.addClass('w2ui-selected').data('selected', 'yes');
                    recEl.find('.w2ui-grid-select-check').prop("checked", true);
                    selected++;
                } else {
                    var col  = arguments[a].column;
                    if (!w2utils.isInt(col)) { // select all columns
                        var cols = [];
                        for (var c in this.columns) { if (this.columns[c].hidden) continue; cols.push({ recid: recid, column: parseInt(c) }); }
                        if (!this.multiSelect) cols = cols.splice(0, 1);
                        return this.select.apply(this, cols);
                    }
                    var s = sel.columns[index] || [];
                    if ($.isArray(s) && s.indexOf(col) != -1) continue;
                    // event before
                    var eventData = this.trigger({ phase: 'before', type: 'select', target: this.name, recid: recid, index: index, column: col });
                    if (eventData.isCancelled === true) continue;
                    // default action
                    if (sel.indexes.indexOf(index) == -1) {
                        sel.indexes.push(index);
                        sel.indexes.sort(function(a, b) { return a-b });
                    }
                    s.push(col);
                    s.sort(function(a, b) { return a-b }); // sort function must be for numerical sort
                    recEl.find(' > td[col='+ col +']').addClass('w2ui-selected');
                    selected++;
                    recEl.data('selected', 'yes');
                    recEl.find('.w2ui-grid-select-check').prop("checked", true);
                    // save back to selection object
                    sel.columns[index] = s;
                }
                // event after
                this.trigger($.extend(eventData, { phase: 'after' }));
            }
            // all selected?
            if (sel.indexes.length == this.records.length || (this.searchData.length !== 0 && sel.indexes.length == this.last.searchIds.length)) {
                $('#grid_'+ this.name +'_check_all').prop('checked', true);
            } else {
                $('#grid_'+ this.name +'_check_all').prop('checked', false);
            }
            this.status();
            this.addRange('selection');
            return selected;
        },

        unselect: function () {
            var unselected = 0;
            var sel = this.last.selection;
            for (var a = 0; a < arguments.length; a++) {
                var recid  = typeof arguments[a] == 'object' ? arguments[a].recid : arguments[a];
                var record = this.get(recid);
                if (record == null) continue;
                var index  = this.get(record.recid, true);
                var recEl  = $('#grid_'+ this.name +'_rec_'+ w2utils.escapeId(recid));
                if (this.selectType == 'row') {
                    if (sel.indexes.indexOf(index) == -1) continue;
                    // event before
                    var eventData = this.trigger({ phase: 'before', type: 'unselect', target: this.name, recid: recid, index: index });
                    if (eventData.isCancelled === true) continue;
                    // default action
                    sel.indexes.splice(sel.indexes.indexOf(index), 1);
                    recEl.removeClass('w2ui-selected').removeData('selected');
                    if (recEl.length != 0) recEl[0].style.cssText = 'height: '+ this.recordHeight +'px; ' + recEl.attr('custom_style');
                    recEl.find('.w2ui-grid-select-check').prop("checked", false);
                    unselected++;
                } else {
                    var col  = arguments[a].column;
                    if (!w2utils.isInt(col)) { // unselect all columns
                        var cols = [];
                        for (var c in this.columns) { if (this.columns[c].hidden) continue; cols.push({ recid: recid, column: parseInt(c) }); }
                        return this.unselect.apply(this, cols);
                    }
                    var s = sel.columns[index];
                    if (!$.isArray(s) || s.indexOf(col) == -1) continue;
                    // event before
                    var eventData = this.trigger({ phase: 'before', type: 'unselect', target: this.name, recid: recid, column: col });
                    if (eventData.isCancelled === true) continue;
                    // default action
                    s.splice(s.indexOf(col), 1);
                    $('#grid_'+ this.name +'_rec_'+ w2utils.escapeId(recid) + ' > td[col='+ col +']').removeClass('w2ui-selected');
                    unselected++;
                    if (s.length == 0) {
                        delete sel.columns[index];
                        sel.indexes.splice(sel.indexes.indexOf(index), 1);
                        recEl.removeData('selected');
                        recEl.find('.w2ui-grid-select-check').prop("checked", false);
                    }
                }
                // event after
                this.trigger($.extend(eventData, { phase: 'after' }));
            }
            // all selected?
            if (sel.indexes.length == this.records.length || (this.searchData.length !== 0 && sel.indexes.length == this.last.searchIds.length)) {
                $('#grid_'+ this.name +'_check_all').prop('checked', true);
            } else {
                $('#grid_'+ this.name +'_check_all').prop('checked', false);
            }
            // show number of selected
            this.status();
            this.addRange('selection');
            return unselected;
        },

        selectAll: function () {
            if (this.multiSelect === false) return;
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'select', target: this.name, all: true });
            if (eventData.isCancelled === true) return;
            // default action
            var url  = (typeof this.url != 'object' ? this.url : this.url.get);
            var sel  = this.last.selection;
            var cols = [];
            for (var c in this.columns) cols.push(parseInt(c));
            // if local data source and searched
            sel.indexes = [];
            if (!url && this.searchData.length !== 0) {
                // local search applied
                for (var i = 0; i < this.last.searchIds.length; i++) {
                    sel.indexes.push(this.last.searchIds[i]);
                    if (this.selectType != 'row') sel.columns[this.last.searchIds[i]] = cols.slice(); // .slice makes copy of the array
                }
            } else {
                var buffered = this.records.length;
                if (this.searchData.length != 0 && url) buffered = this.last.searchIds.length;
                for (var i = 0; i < buffered; i++) {
                    sel.indexes.push(i);
                    if (this.selectType != 'row') sel.columns[i] = cols.slice(); // .slice makes copy of the array
                }
            }
            this.refresh();
            // enable/disable toolbar buttons
            var sel = this.getSelection();
            if (sel.length == 1) this.toolbar.enable('w2ui-edit'); else this.toolbar.disable('w2ui-edit');
            if (sel.length >= 1) this.toolbar.enable('w2ui-delete'); else this.toolbar.disable('w2ui-delete');
            this.addRange('selection');
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        selectNone: function () {
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'unselect', target: this.name, all: true });
            if (eventData.isCancelled === true) return;
            // default action
            var sel = this.last.selection;
            for (var s in sel.indexes) {
                var index = sel.indexes[s];
                var rec   = this.records[index];
                var recid = rec ? rec.recid : null;
                var recEl = $('#grid_'+ this.name +'_rec_'+ w2utils.escapeId(recid));
                recEl.removeClass('w2ui-selected').removeData('selected');
                recEl.find('.w2ui-grid-select-check').prop("checked", false);
                // for not rows
                if (this.selectType != 'row') {
                    var cols = sel.columns[index];
                    for (var c in cols) recEl.find(' > td[col='+ cols[c] +']').removeClass('w2ui-selected');
                }
            }
            sel.indexes = [];
            sel.columns = {};
            this.toolbar.disable('w2ui-edit', 'w2ui-delete');
            this.removeRange('selection');
            $('#grid_'+ this.name +'_check_all').prop('checked', false);
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        getSelection: function (returnIndex) {
            var ret = [];
            var sel = this.last.selection;
            if (this.selectType == 'row') {
                for (var s in sel.indexes) {
                    if (!this.records[sel.indexes[s]]) continue;
                    if (returnIndex === true) ret.push(sel.indexes[s]); else ret.push(this.records[sel.indexes[s]].recid);
                }
                return ret;
            } else {
                for (var s in sel.indexes) {
                    var cols = sel.columns[sel.indexes[s]];
                    if (!this.records[sel.indexes[s]]) continue;
                    for (var c in cols) {
                        ret.push({ recid: this.records[sel.indexes[s]].recid, index: parseInt(sel.indexes[s]), column: cols[c] });
                    }
                }
                return ret;
            }
        },

        search: function (field, value) {
            var obj         = this;
            var url         = (typeof this.url != 'object' ? this.url : this.url.get);
            var searchData  = [];
            var last_multi  = this.last.multi;
            var last_logic  = this.last.logic;
            var last_field  = this.last.field;
            var last_search = this.last.search;
            // 1: search() - advanced search (reads from popup)
            if (arguments.length == 0) {
                last_search = '';
                // advanced search
                for (var s in this.searches) {
                    var search   = this.searches[s];
                    var operator = $('#grid_'+ this.name + '_operator_'+s).val();
                    var field1   = $('#grid_'+ this.name + '_field_'+s);
                    var field2   = $('#grid_'+ this.name + '_field2_'+s);
                    var value1   = field1.val();
                    var value2   = field2.val();
                    var svalue   = null;
                    if (['int', 'float', 'money', 'currency', 'percent'].indexOf(search.type) != -1) {
                        var fld1 = field1.data('w2field');
                        var fld2 = field2.data('w2field');
                        if (fld1) value1 = fld1.clean(value1);
                        if (fld2) value2 = fld2.clean(value2);
                    }
                    if (['list', 'enum'].indexOf(search.type) != -1) {
                        value1 = field1.data('selected') || {};
                        if ($.isArray(value1)) {
                            svalue = [];
                            for (var v in value1) {
                                svalue.push(w2utils.isFloat(value1[v].id) ? parseFloat(value1[v].id) : String(value1[v].id).toLowerCase());
                                delete value1[v].hidden;
                            }
                        } else {
                            value1 = value1.id || '';
                        }
                    }
                    if ((value1 != '' && value1 != null) || (typeof value2 != 'undefined' && value2 != '')) {
                        var tmp = {
                            field    : search.field,
                            type     : search.type,
                            operator : operator
                        }
                        if (operator == 'between') {
                            $.extend(tmp, { value: [value1, value2] });
                        } else if (operator == 'in' && typeof value1 == 'string') {
                            $.extend(tmp, { value: value1.split(',') });
                        } else if (operator == 'not in' && typeof value1 == 'string') {
                            $.extend(tmp, { value: value1.split(',') });
                        } else {
                            $.extend(tmp, { value: value1 });
                        }
                        if (svalue) $.extend(tmp, { svalue: svalue });
                        // conver date to unix time
                        try {
                            if (search.type == 'date' && operator == 'between') {
                                tmp.value[0] = value1; // w2utils.isDate(value1, w2utils.settings.date_format, true).getTime();
                                tmp.value[1] = value2; // w2utils.isDate(value2, w2utils.settings.date_format, true).getTime();
                            }
                            if (search.type == 'date' && operator == 'is') {
                                tmp.value = value1; // w2utils.isDate(value1, w2utils.settings.date_format, true).getTime();
                            }
                        } catch (e) {

                        }
                        searchData.push(tmp);
                    }
                }
                if (searchData.length > 0 && !url) {
                    last_multi = true;
                    last_logic = 'AND';
                } else {
                    last_multi = true;
                    last_logic = 'AND';
                }
            }
            // 2: search(field, value) - regular search
            if (typeof field == 'string') {
                last_field  = field;
                last_search = value;
                last_multi  = false;
                last_logic  = 'OR';
                // loop through all searches and see if it applies
                if (typeof value != 'undefined') {
                    if (field.toLowerCase() == 'all') {
                        // if there are search fields loop thru them
                        if (this.searches.length > 0) {
                            for (var s in this.searches) {
                                var search = this.searches[s];
                                if (search.type == 'text' || (search.type == 'alphanumeric' && w2utils.isAlphaNumeric(value))
                                        || (search.type == 'int' && w2utils.isInt(value)) || (search.type == 'float' && w2utils.isFloat(value))
                                        || (search.type == 'percent' && w2utils.isFloat(value)) || (search.type == 'hex' && w2utils.isHex(value))
                                        || (search.type == 'currency' && w2utils.isMoney(value)) || (search.type == 'money' && w2utils.isMoney(value))
                                        || (search.type == 'date' && w2utils.isDate(value)) ) {
                                    var tmp = {
                                        field    : search.field,
                                        type     : search.type,
                                        operator : (search.type == 'text' ? 'contains' : 'is'),
                                        value    : value
                                    };
                                    searchData.push(tmp);
                                }
                                // range in global search box
                                if (['int', 'float', 'money', 'currency', 'percent'].indexOf(search.type) != -1 && String(value).indexOf('-') != -1) {
                                    var t = String(value).split('-');
                                    var tmp = {
                                        field    : search.field,
                                        type     : search.type,
                                        operator : 'between',
                                        value    : [t[0], t[1]]
                                    };
                                    searchData.push(tmp);
                                }
                            }
                        } else {
                            // no search fields, loop thru columns
                            for (var c in this.columns) {
                                var tmp = {
                                    field    : this.columns[c].field,
                                    type     : 'text',
                                    operator : 'contains',
                                    value    : value
                                };
                                searchData.push(tmp);
                            }
                        }
                    } else {
                        var el = $('#grid_'+ this.name +'_search_all');
                        var search = this.getSearch(field);
                        if (search == null) search = { field: field, type: 'text' };
                        if (search.field == field) this.last.caption = search.caption;
                        if (search.type == 'list') {
                            var tmp = el.data('selected');
                            if (tmp && !$.isEmptyObject(tmp)) value = tmp.id;
                        }
                        if (value != '') {
                            var op  = 'contains';
                            var val = value;
                            if (['date', 'time', 'list'].indexOf(search.type) != -1) op = 'is';
                            if (search.type == 'int' && value != '') {
                                op = 'is';
                                if (String(value).indexOf('-') != -1) {
                                    var tmp = value.split('-');
                                    if (tmp.length == 2) {
                                        op = 'between';
                                        val = [parseInt(tmp[0]), parseInt(tmp[1])];
                                    }
                                }
                                if (String(value).indexOf(',') != -1) {
                                    var tmp = value.split(',');
                                    op  = 'in';
                                    val = [];
                                    for (var t in tmp) val.push(tmp[t]);
                                }
                            }
                            var tmp = {
                                field    : search.field,
                                type     : search.type,
                                operator : op,
                                value    : val
                            }
                            searchData.push(tmp);
                        }
                    }
                }
            }
            // 3: search([ { field, value, [operator,] [type] }, { field, value, [operator,] [type] } ], logic) - submit whole structure
            if ($.isArray(field)) {
                var logic = 'AND';
                if (typeof value == 'string') {
                    logic = value.toUpperCase();
                    if (logic != 'OR' && logic != 'AND') logic = 'AND';
                }
                last_search = '';
                last_multi  = true;
                last_logic  = logic;
                for (var f in field) {
                    var data   = field[f];
                    var search = this.getSearch(data.field);
                    if (search == null) search = { type: 'text', operator: 'contains' };
                    // merge current field and search if any
                    searchData.push($.extend(true, {}, search, data));
                }
            }
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'search', target: this.name, searchData: searchData,
                    searchField: (field ? field : 'multi'), searchValue: (value ? value : 'multi') });
            if (eventData.isCancelled === true) return;
            // default action
            this.searchData  = eventData.searchData;
            this.last.field  = last_field;
            this.last.search = last_search;
            this.last.multi  = last_multi;
            this.last.logic  = last_logic;
            this.last.scrollTop         = 0;
            this.last.scrollLeft        = 0;
            this.last.selection.indexes = [];
            this.last.selection.columns = {};
            // -- clear all search field
            this.searchClose();
            this.set({ expanded: false }, true);
            // apply search
            if (url) {
                this.last.xhr_offset = 0;
                this.reload();
            } else {
                // local search
                this.localSearch();
                this.refresh();
            }
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        searchOpen: function () {
            if (!this.box) return;
            if (this.searches.length == 0) return;
            var obj = this;
            // show search
            $('#tb_'+ this.name +'_toolbar_item_w2ui-search-advanced').w2overlay(
                this.getSearchesHTML(),    {
                    name    : 'searches-'+ this.name,
                    left    : -10,
                    'class' : 'w2ui-grid-searches',
                    onShow  : function () {
                        if (obj.last.logic == 'OR') obj.searchData = [];
                        obj.initSearches();
                        $('#w2ui-overlay-searches-'+ this.name +' .w2ui-grid-searches').data('grid-name', obj.name);
                        var sfields = $('#w2ui-overlay-searches-'+ this.name +' .w2ui-grid-searches *[rel=search]');
                        if (sfields.length > 0) sfields[0].focus();
                    }
                }
            );
        },

        searchClose: function () {
            if (!this.box) return;
            if (this.searches.length == 0) return;
            if (this.toolbar) this.toolbar.uncheck('w2ui-search-advanced')
            // hide search
            if ($('#w2ui-overlay-searches-'+ this.name +' .w2ui-grid-searches').length > 0) {
                $().w2overlay('', { name: 'searches-'+ this.name });
            }
        },

        searchShowFields: function () {
            var el   = $('#grid_'+ this.name +'_search_all');
            var html = '<div class="w2ui-select-field"><table>';
            for (var s = -1; s < this.searches.length; s++) {
                var search = this.searches[s];
                if (s == -1) {
                    if (!this.multiSearch) continue;
                    search = { field: 'all', caption: w2utils.lang('All Fields') };
                } else {
                    if (this.searches[s].hidden === true) continue;
                }
                html += '<tr '+ (w2utils.isIOS ? 'onTouchStart' : 'onClick') +'="w2ui[\''+ this.name +'\'].initAllField(\''+ search.field +'\')">'+
                        '    <td><input type="radio" tabIndex="-1" '+ (search.field == this.last.field ? 'checked' : '') +'></td>'+
                        '    <td>'+ search.caption +'</td>'+
                        '</tr>';
            }
            html += "</table></div>";
            // need timer otherwise does nto show with list type
            setTimeout(function () {
                $(el).w2overlay(html, { left: -10 });
            }, 1);
        },

        initAllField: function (field, value) {
            var el     = $('#grid_'+ this.name +'_search_all');
            var search = this.getSearch(field);
            if (field == 'all') {
                search = { field: 'all', caption: w2utils.lang('All Fields') };
                el.w2field('clear');
                el.change().focus();
            } else {
                var st = search.type;
                if (['enum', 'select'].indexOf(st) != -1) st = 'list';
                el.w2field(st, $.extend({}, search.options, { suffix: '', autoFormat: false, selected: value }));
                if (['list', 'enum'].indexOf(search.type) != -1) {
                    this.last.search = '';
                    this.last.item   = '';
                    el.val('');
                }
                // set focus
                setTimeout(function () {
                    el.focus(); /* do not do el.change() as it will refresh grid and pull from server */
                }, 1);
            }
            // update field
            if (this.last.search != '') {
                this.search(search.field, this.last.search);
            } else {
                this.last.field   = search.field;
                this.last.caption = search.caption;
            }
            el.attr('placeholder', search.caption);
            $().w2overlay();
        },

        searchReset: function (noRefresh) {
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'search', target: this.name, searchData: [] });
            if (eventData.isCancelled === true) return;
            // default action
            this.searchData  = [];
            this.last.search = '';
            this.last.logic  = 'OR';
            // --- do not reset to All Fields (I think)
            // if (this.last.multi) {
            //     if (!this.multiSearch) {
            //         this.last.field     = this.searches[0].field;
            //         this.last.caption     = this.searches[0].caption;
            //     } else {
            //         this.last.field      = 'all';
            //         this.last.caption     = w2utils.lang('All Fields');
            //     }
            // }
            this.last.multi      = false;
            this.last.xhr_offset = 0;
            // reset scrolling position
            this.last.scrollTop  = 0;
            this.last.scrollLeft = 0;
            this.last.selection.indexes = [];
            this.last.selection.columns = {};
            // -- clear all search field
            this.searchClose();
            $('#grid_'+ this.name +'_search_all').val('');
            // apply search
            if (!noRefresh) this.reload();
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        clear: function (noRefresh) {
            // this.offset              = 0;   // clear should not reset offset
            // this.total               = 0;   // clear should not reset total
            this.records                = [];
            this.summary                = [];
            this.last.scrollTop         = 0;
            this.last.scrollLeft        = 0;
            this.last.selection.indexes = [];
            this.last.selection.columns = {};
            this.last.range_start       = null;
            this.last.range_end         = null;
            this.last.xhr_offset        = 0;
            if (!noRefresh) this.refresh();
        },

        reset: function (noRefresh) {
            // reset last remembered state
            this.offset                 = 0;
            this.total                  = 0;
            this.last.scrollTop         = 0;
            this.last.scrollLeft        = 0;
            this.last.selection.indexes = [];
            this.last.selection.columns = {};
            this.last.range_start       = null;
            this.last.range_end         = null;
            this.last.xhr_offset        = 0;
            this.searchReset(noRefresh);
            // initial sort
            if (this.last.sortData != null ) this.sortData = this.last.sortData;
            // select none without refresh
            this.set({ expanded: false }, true);
            // refresh
            if (!noRefresh) this.refresh();
        },

        skip: function (offset) {
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            if (url) {
                this.offset = parseInt(offset);
                if (this.offset > this.total) this.offset = this.total - this.limit;
                if (this.offset < 0 || !w2utils.isInt(this.offset)) this.offset = 0;
                this.records  = [];
                this.last.xhr_offset = 0;
                this.last.pull_more  = true;
                this.last.scrollTop  = 0;
                this.last.scrollLeft = 0;
                $('#grid_'+ this.name +'_records').prop('scrollTop',  0);
                this.reload();
            } else {
                console.log('ERROR: grid.skip() can only be called when you have remote data source.');
            }
        },

        load: function (url, callBack) {
            if (typeof url == 'undefined') {
                console.log('ERROR: You need to provide url argument when calling .load() method of "'+ this.name +'" object.');
                return;
            }
            // default action
            this.request('get-records', {}, url, callBack);
        },

        reload: function (callBack) {
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            if (url) {
                this.clear(true);
                this.request('get-records', {}, null, callBack);
            } else {
                this.last.scrollTop   = 0;
                this.last.scrollLeft  = 0;
                this.last.range_start = null;
                this.last.range_end   = null;
                this.localSearch();
                this.refresh();
                if (typeof callBack == 'function') callBack({ status: 'success' });
            }
        },

        request: function (cmd, add_params, url, callBack) {
            if (typeof add_params == 'undefined') add_params = {};
            if (url == '' || url == null) url = this.url;
            if (url == '' || url == null) return;
            // build parameters list
            var params = {};
            if (!w2utils.isInt(this.offset)) this.offset = 0;
            if (!w2utils.isInt(this.last.xhr_offset)) this.last.xhr_offset = 0;
            // add list params
            params['cmd']         = cmd;
            params['selected']    = this.getSelection();
            params['limit']       = this.limit;
            params['offset']      = parseInt(this.offset) + this.last.xhr_offset;
            params['search']      = this.searchData;
            params['searchLogic'] = this.last.logic;
            params['sort']        = this.sortData;
            if (this.searchData.length == 0) {
                delete params['search'];
                delete params['searchLogic'];
            }
            if (this.sortData.length == 0) {
                delete params['sort'];
            }
            // append other params
            $.extend(params, this.postData);
            $.extend(params, add_params);
            // event before
            if (cmd == 'get-records') {
                var eventData = this.trigger({ phase: 'before', type: 'request', target: this.name, url: url, postData: params });
                if (eventData.isCancelled === true) { if (typeof callBack == 'function') callBack({ status: 'error', message: 'Request aborted.' }); return; }
            } else {
                var eventData = { url: url, postData: params };
            }
            // call server to get data
            var obj = this;
            if (this.last.xhr_offset == 0) {
                this.lock(this.msgRefresh, true);
            } else {
                var more = $('#grid_'+ this.name +'_rec_more');
                if (this.autoLoad === true) {
                    more.show().find('td').html('<div><div style="width: 20px; height: 20px;" class="w2ui-spinner"></div></div>');
                } else {
                    more.find('td').html('<div>'+ w2utils.lang('Load') + ' ' + obj.limit + ' ' + w2utils.lang('More') + '...</div>');
                }
            }
            if (this.last.xhr) try { this.last.xhr.abort(); } catch (e) {};
            // URL
            url = (typeof eventData.url != 'object' ? eventData.url : eventData.url.get);
            if (params.cmd == 'save-records' && typeof eventData.url == 'object')   url = eventData.url.save;
            if (params.cmd == 'delete-records' && typeof eventData.url == 'object') url = eventData.url.remove;
            // process url with routeData
            if (!$.isEmptyObject(obj.routeData)) {
                var info  = w2utils.parseRoute(url);
                if (info.keys.length > 0) {
                    for (var k = 0; k < info.keys.length; k++) {
                        if (obj.routeData[info.keys[k].name] == null) continue;
                        url = url.replace((new RegExp(':'+ info.keys[k].name, 'g')), obj.routeData[info.keys[k].name]);
                    }
                }
            }
            // ajax ptions
            var ajaxOptions = {
                type     : 'POST',
                url      : url,
                data     : eventData.postData,
                dataType : 'text'  // expected data type from server
            };
            if (w2utils.settings.dataType == 'HTTP') {
                ajaxOptions.data = (typeof ajaxOptions.data == 'object' ? String($.param(ajaxOptions.data, false)).replace(/%5B/g, '[').replace(/%5D/g, ']') : ajaxOptions.data);
            }
            if (w2utils.settings.dataType == 'RESTFULL') {
                ajaxOptions.type = 'GET';
                if (params.cmd == 'save-records')   ajaxOptions.type = 'PUT';  // so far it is always update
                if (params.cmd == 'delete-records') ajaxOptions.type = 'DELETE';
                ajaxOptions.data = (typeof ajaxOptions.data == 'object' ? String($.param(ajaxOptions.data, false)).replace(/%5B/g, '[').replace(/%5D/g, ']') : ajaxOptions.data);
            }
            if (w2utils.settings.dataType == 'JSON') {
                ajaxOptions.type        = 'POST';
                ajaxOptions.data        = JSON.stringify(ajaxOptions.data);
                ajaxOptions.contentType = 'application/json';
            }
            if (this.method) ajaxOptions.type = this.method;

            this.last.xhr_cmd   = params.cmd;
            this.last.xhr_start = (new Date()).getTime();
            this.last.xhr = $.ajax(ajaxOptions)
                .done(function (data, status, xhr) {
                    obj.requestComplete(status, cmd, callBack);
                })
                .fail(function (xhr, status, error) {
                    // trigger event
                    var errorObj = { status: status, error: error, rawResponseText: xhr.responseText };
                    var eventData2 = obj.trigger({ phase: 'before', type: 'error', error: errorObj, xhr: xhr });
                    if (eventData2.isCancelled === true) return;
                    // default behavior
                    if (status != 'abort') {
                        var data;
                        try { data = $.parseJSON(xhr.responseText) } catch (e) {}
                        console.log('ERROR: Server communication failed.',
                            '\n   EXPECTED:', { status: 'success', total: 5, records: [{ recid: 1, field: 'value' }] },
                            '\n         OR:', { status: 'error', message: 'error message' },
                            '\n   RECEIVED:', typeof data == 'object' ? data : xhr.responseText);
                        obj.requestComplete('error', cmd, callBack);
                    }
                    // event after
                    obj.trigger($.extend(eventData2, { phase: 'after' }));
                });
            if (cmd == 'get-records') {
                // event after
                this.trigger($.extend(eventData, { phase: 'after' }));
            }
        },

        requestComplete: function(status, cmd, callBack) {
            var obj = this;
            this.unlock();
            setTimeout(function () { obj.status(w2utils.lang('Server Response') + ' ' + ((new Date()).getTime() - obj.last.xhr_start)/1000 +' ' + w2utils.lang('sec')); }, 10);
            this.last.pull_more    = false;
            this.last.pull_refresh = true;

            // event before
            var event_name = 'load';
            if (this.last.xhr_cmd == 'save-records') event_name   = 'save';
            if (this.last.xhr_cmd == 'delete-records') event_name = 'deleted';
            var eventData = this.trigger({ phase: 'before', target: this.name, type: event_name, xhr: this.last.xhr, status: status });
            if (eventData.isCancelled === true) {
                if (typeof callBack == 'function') callBack({ status: 'error', message: 'Request aborted.' });
                return;
            }
            // parse server response
            var data;
            var responseText = this.last.xhr.responseText;
            if (status != 'error') {
                // default action
                if (typeof responseText != 'undefined' && responseText != '') {
                    // check if the onLoad handler has not already parsed the data
                    if (typeof responseText == "object") {
                        data = responseText;
                    } else {
                        if (typeof obj.parser == 'function') {
                            data = obj.parser(responseText);
                            if (typeof data != 'object') {
                                console.log('ERROR: Your parser did not return proper object');
                            }
                        } else {
                            // $.parseJSON or $.getJSON did not work because those expect perfect JSON data - where everything is in double quotes
                            //
                            // TODO: avoid (potentially malicious) code injection from the response.
                            try { eval('data = '+ responseText); } catch (e) { }
                        }
                    }
                    // convert recids
                    if (obj.recid) {
                        for (var r in data.records) {
                            data.records[r]['recid'] = data.records[r][obj.recid];
                        }
                    }
                    if (typeof data == 'undefined') {
                        data = {
                            status       : 'error',
                            message      : this.msgNotJSON,
                            responseText : responseText
                        };
                    }
                    if (data['status'] == 'error') {
                        obj.error(data['message']);
                    } else {
                        if (cmd == 'get-records') {
                            if (this.last.xhr_offset == 0) {
                                this.records = [];
                                this.summary = [];
                                //data.xhr_status=data.status;
                                delete data.status;
                                $.extend(true, this, data);
                            } else {
                                var records = data.records;
                                delete data.records;
                                //data.xhr_status=data.status;
                                delete data.status;
                                $.extend(true, this, data);
                                for (var r in records) {
                                    this.records.push(records[r]);
                                }
                            }
                        }
                        if (cmd == 'delete-records') {
                            // reset() also triggers reload
                            this.reset(); // unselect old selections
                            return;
                        }
                    }
                }
            } else {
                data = {
                    status       : 'error',
                    message      : this.msgAJAXerror,
                    responseText : responseText
                };
                obj.error(this.msgAJAXerror);
            }
            // event after
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            if (!url) {
                this.localSort();
                this.localSearch();
            }
            this.total = parseInt(this.total);
            this.trigger($.extend(eventData, { phase: 'after' }));
            // do not refresh if loading on infinite scroll
            if (this.last.xhr_offset == 0) this.refresh(); else this.scroll();
            // call back
            if (typeof callBack == 'function') callBack(data);
        },

        error: function (msg) {
            var obj = this;
            // let the management of the error outside of the grid
            var eventData = this.trigger({ target: this.name, type: 'error', message: msg , xhr: this.last.xhr });
            if (eventData.isCancelled === true) {
                if (typeof callBack == 'function') callBack({ status: 'error', message: 'Request aborted.' });
                return;
            }
            w2alert(msg, 'Error');
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        getChanges: function () {
            var changes = [];
            for (var r in this.records) {
                var rec = this.records[r];
                if (typeof rec['changes'] != 'undefined') {
                    changes.push($.extend(true, { recid: rec.recid }, rec.changes));
                }
            }
            return changes;
        },

        mergeChanges: function () {
            var changes = this.getChanges();
            for (var c in changes) {
                var record = this.get(changes[c].recid);
                for (var s in changes[c]) {
                    if (s == 'recid') continue; // do not allow to change recid
                    try { eval('record.' + s + ' = changes[c][s]'); } catch (e) {}
                    delete record.changes;
                }
            }
            this.refresh();
        },

        // ===================================================
        // --  Action Handlers

        save: function () {
            var obj = this;
            var changes = this.getChanges();
            // event before
            var eventData = this.trigger({ phase: 'before', target: this.name, type: 'submit', changes: changes });
            if (eventData.isCancelled === true) return;
            var url = (typeof this.url != 'object' ? this.url : this.url.save);
            if (url) {
                this.request('save-records', { 'changes' : eventData.changes }, null,
                    function (data) {
                        if (data.status !== 'error') {
                            // only merge changes, if save was successful
                            obj.mergeChanges();
                        }
                        // event after
                        obj.trigger($.extend(eventData, { phase: 'after' }));
                    }
                );
            } else {
                this.mergeChanges();
                // event after
                this.trigger($.extend(eventData, { phase: 'after' }));
            }
        },

        editField: function (recid, column, value, event) {
            var obj   = this;
            var index = obj.get(recid, true);
            var rec   = obj.records[index];
            var col   = obj.columns[column];
            var edit  = col ? col.editable : null;
            if (!rec || !col || !edit || rec.editable === false) return;
            if (['enum', 'file'].indexOf(edit.type) != -1) {
                console.log('ERROR: input types "enum" and "file" are not supported in inline editing.');
                return;
            }
            // event before
            var eventData = obj.trigger({ phase: 'before', type: 'editField', target: obj.name, recid: recid, column: column, value: value,
                index: index, originalEvent: event });
            if (eventData.isCancelled === true) return;
            value = eventData.value;
            // default behaviour
            this.selectNone();
            this.select({ recid: recid, column: column });
            this.last.edit_col = column;
            if (['checkbox', 'check'].indexOf(edit.type) != -1) return;
            // create input element
            var tr = $('#grid_'+ obj.name +'_rec_'+ w2utils.escapeId(recid));
            var el = tr.find('[col='+ column +'] > div');
            if (typeof edit.inTag   == 'undefined') edit.inTag   = '';
            if (typeof edit.outTag  == 'undefined') edit.outTag  = '';
            if (typeof edit.style   == 'undefined') edit.style   = '';
            if (typeof edit.items   == 'undefined') edit.items   = [];
            var val = (rec.changes && typeof rec.changes[col.field] != 'undefined' ? w2utils.stripTags(rec.changes[col.field]) : w2utils.stripTags(rec[col.field]));
            if (val == null || typeof val == 'undefined') val = '';
            if (typeof value != 'undefined' && value != null) val = value;
            var addStyle = (typeof col.style != 'undefined' ? col.style + ';' : '');
            if (typeof col.render == 'string' && ['number', 'int', 'float', 'money', 'percent'].indexOf(col.render.split(':')[0]) != -1) {
                addStyle += 'text-align: right;';
            }
            // mormalize items
            if (edit.items.length > 0 && !$.isPlainObject(edit.items[0])) {
                edit.items = w2obj.field.prototype.normMenu(edit.items);
            }
            if (edit.type == 'select') {
                var html = '';
                for (var i in edit.items) {
                    html += '<option value="'+ edit.items[i].id +'" '+ (edit.items[i].id == val ? 'selected' : '') +'>'+ edit.items[i].text +'</option>';
                }
                el.addClass('w2ui-editable')
                    .html('<select id="grid_'+ obj.name +'_edit_'+ recid +'_'+ column +'" column="'+ column +'" '+
                        '    style="width: 100%; '+ addStyle + edit.style +'" field="'+ col.field +'" recid="'+ recid +'" '+
                        '    '+ edit.inTag +
                        '>'+ html +'</select>' + edit.outTag);
                el.find('select').focus()
                    .on('change', function (event) {
                        delete obj.last.move;
                    })
                    .on('blur', function (event) {
                        obj.editChange.call(obj, this, index, column, event);
                    });
            } else {
                el.addClass('w2ui-editable')
                    .html('<input id="grid_'+ obj.name +'_edit_'+ recid +'_'+ column +'" '+
                        '    type="text" style="font-family: inherit; font-size: inherit; outline: none; '+ addStyle + edit.style +'" field="'+ col.field +'" recid="'+ recid +'" '+
                        '    column="'+ column +'" '+ edit.inTag +
                        '>' + edit.outTag);
                if (value == null) el.find('input').val(val != 'object' ? val : '');
                // init w2field
                var input = el.find('input').get(0);
                $(input).w2field(edit.type, $.extend(edit, { selected: val }))
                // add blur listener
                setTimeout(function () {
                    var tmp = input;
                    if (edit.type == 'list') {
                        tmp = $($(input).data('w2field').helpers.focus).find('input');
                        if (typeof val != 'object' && val != '') tmp.val(val).css({ opacity: 1 }).prev().css({ opacity: 1 });
                    }
                    $(tmp).on('blur', function (event) {
                        obj.editChange.call(obj, input, index, column, event);
                    });
                }, 10);
                if (value != null) $(input).val(val != 'object' ? val : '');
            }
            setTimeout(function () {
                el.find('input, select')
                    .on('click', function (event) {
                        event.stopPropagation();
                    })
                    .on('keydown', function (event) {
                        var cancel = false;
                        switch (event.keyCode) {
                            case 9:  // tab
                                cancel = true;
                                var next_rec = recid;
                                var next_col = event.shiftKey ? obj.prevCell(column, true) : obj.nextCell(column, true);
                                // next or prev row
                                if (next_col == null) {
                                    var tmp = event.shiftKey ? obj.prevRow(index) : obj.nextRow(index);
                                    if (tmp != null && tmp != index) {
                                        next_rec = obj.records[tmp].recid;
                                        // find first editable row
                                        for (var c in obj.columns) {
                                            var tmp = obj.columns[c].editable;
                                            if (typeof tmp != 'undefined' && ['checkbox', 'check'].indexOf(tmp.type) == -1) {
                                                next_col = parseInt(c);
                                                if (!event.shiftKey) break;
                                            }
                                        }
                                    }

                                }
                                if (next_rec === false) next_rec = recid;
                                if (next_col == null) next_col = column;
                                // init new or same record
                                this.blur();
                                setTimeout(function () {
                                    if (obj.selectType != 'row') {
                                        obj.selectNone();
                                        obj.select({ recid: next_rec, column: next_col });
                                    } else {
                                        obj.editField(next_rec, next_col, null, event);
                                    }
                                }, 1);
                                break;

                            case 13: // enter
                                this.blur();
                                var next = event.shiftKey ? obj.prevRow(index) : obj.nextRow(index);
                                if (next != null && next != index) {
                                    setTimeout(function () {
                                        if (obj.selectType != 'row') {
                                            obj.selectNone();
                                            obj.select({ recid: obj.records[next].recid, column: column });
                                        } else {
                                            obj.editField(obj.records[next].recid, column, null, event);
                                        }
                                    }, 100);
                                }
                                break;

                            case 38: // up arrow
                                if (!event.shiftKey) break;
                                cancel = true;
                                var next = obj.prevRow(index);
                                if (next != index) {
                                    this.blur();
                                    setTimeout(function () {
                                        if (obj.selectType != 'row') {
                                            obj.selectNone();
                                            obj.select({ recid: obj.records[next].recid, column: column });
                                        } else {
                                            obj.editField(obj.records[next].recid, column, null, event);
                                        }
                                    }, 1);
                                }
                                break;

                            case 40: // down arrow
                                if (!event.shiftKey) break;
                                cancel = true;
                                var next = obj.nextRow(index);
                                if (next != null && next != index) {
                                    this.blur();
                                    setTimeout(function () {
                                        if (obj.selectType != 'row') {
                                            obj.selectNone();
                                            obj.select({ recid: obj.records[next].recid, column: column });
                                        } else {
                                            obj.editField(obj.records[next].recid, column, null, event);
                                        }
                                    }, 1);
                                }
                                break;

                            case 27: // escape
                                var old = obj.parseField(rec, col.field);
                                if (rec.changes && typeof rec.changes[col.field] != 'undefined') old = rec.changes[col.field];
                                this.value = typeof old != 'undefined' ? old : '';
                                this.blur();
                                setTimeout(function () { obj.select({ recid: recid, column: column }) }, 1);
                                break;
                        }
                        if (cancel) if (event.preventDefault) event.preventDefault();
                    });
                // focus and select
                var tmp = el.find('input').focus();
                if (value != null) {
                    // set cursor to the end
                    tmp[0].setSelectionRange(tmp.val().length, tmp.val().length);
                } else {
                    tmp.select();
                }

            }, 1);
            // event after
            obj.trigger($.extend(eventData, { phase: 'after' }));
        },

        editChange: function (el, index, column, event) {
            // all other fields
            var summary = index < 0;
            index = index < 0 ? -index - 1 : index;
            var records = summary ? this.summary : this.records;
            var rec     = records[index];
            var tr      = $('#grid_'+ this.name +'_rec_'+ w2utils.escapeId(rec.recid));
            var col     = this.columns[column];
            var new_val = el.value;
            var old_val = this.parseField(rec, col.field);
            var tmp     = $(el).data('w2field');
            if (tmp) {
                new_val = tmp.clean(new_val);
                if (tmp.type == 'list' && new_val != '') new_val = $(el).data('selected');
            }
            if (el.type == 'checkbox') {
                if (rec.editable === false) el.checked = !el.checked;
                new_val = el.checked;
            }
            // change/restore event
            var eventData = {
                phase: 'before', type: 'change', target: this.name, input_id: el.id, recid: rec.recid, index: index, column: column,
                value_new: new_val, value_previous: (rec.changes && rec.changes.hasOwnProperty(col.field) ? rec.changes[col.field]: old_val), value_original: old_val
            };
            while (true) {
                new_val = eventData.value_new;
                if ((typeof new_val != 'object' && String(old_val) != String(new_val)) ||
                    (typeof new_val == 'object' && (typeof old_val != 'object' || new_val.id != old_val.id))) {
                    // change event
                    eventData = this.trigger($.extend(eventData, { type: 'change', phase: 'before' }));
                    if (eventData.isCancelled !== true) {
                        if (new_val !== eventData.value_new) {
                            // re-evaluate the type of change to be made
                            continue;
                        }
                        // default action
                        rec.changes = rec.changes || {};
                        rec.changes[col.field] = eventData.value_new;
                        // event after
                        this.trigger($.extend(eventData, { phase: 'after' }));
                    }
                } else {
                    // restore event
                    eventData = this.trigger($.extend(eventData, { type: 'restore', phase: 'before' }));
                    if (eventData.isCancelled !== true) {
                        if (new_val !== eventData.value_new) {
                            // re-evaluate the type of change to be made
                            continue;
                        }
                        // default action
                        if (rec.changes) delete rec.changes[col.field];
                        if ($.isEmptyObject(rec.changes)) delete rec.changes;
                        // event after
                        this.trigger($.extend(eventData, { phase: 'after' }));
                    }
                }
                break;
            }
            // refresh cell
            var cell = this.getCellHTML(index, column, summary);
            if (!summary) {
                if (rec.changes && typeof rec.changes[col.field] != 'undefined') {
                    $(tr).find('[col='+ column +']').addClass('w2ui-changed').html(cell);
                } else {
                    $(tr).find('[col='+ column +']').removeClass('w2ui-changed').html(cell);
                }
            }
        },

        "delete": function (force) {
            var obj = this;
            // event before
            var eventData = this.trigger({ phase: 'before', target: this.name, type: 'delete', force: force });
            if (eventData.isCancelled === true) return;
            force = eventData.force;
            // default action
            var recs = this.getSelection();
            if (recs.length == 0) return;
            if (this.msgDelete != '' && !force) {
                w2confirm({
                    title   : w2utils.lang('Delete Confirmation'),
                    msg     : obj.msgDelete,
                    btn_yes : { "class": 'w2ui-btn-red' },
                    callBack: function (result) {
                        if (result == 'Yes') w2ui[obj.name]['delete'](true);
                    }
                });
                return;
            }
            // call delete script
            var url = (typeof this.url != 'object' ? this.url : this.url.remove);
            if (url) {
                this.request('delete-records');
            } else {
                this.selectNone();
                if (typeof recs[0] != 'object') {
                    this.remove.apply(this, recs);
                } else {
                    // clear cells
                    for (var r in recs) {
                        var fld = this.columns[recs[r].column].field;
                        var ind = this.get(recs[r].recid, true);
                        if (ind != null && fld != 'recid') {
                            this.records[ind][fld] = '';
                            if (this.records[ind].changes) delete this.records[ind].changes[fld];
                        }
                    }
                    this.refresh();
                }
            }
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        click: function (recid, event) {
            var time = (new Date()).getTime();
            var column = null;
            if (this.last.cancelClick == true || (event && event.altKey)) return;
            if (typeof recid == 'object') {
                column = recid.column;
                recid  = recid.recid;
            }
            if (typeof event == 'undefined') event = {};
            // check for double click
            if (time - parseInt(this.last.click_time) < 350 && this.last.click_recid == recid && event.type == 'click') {
                this.dblClick(recid, event);
                return;
            }
            this.last.click_time  = time;
            this.last.click_recid = recid;
            // column user clicked on
            if (column == null && event.target) {
                var tmp = event.target;
                if (tmp.tagName != 'TD') tmp = $(tmp).parents('td')[0];
                if (typeof $(tmp).attr('col') != 'undefined') column = parseInt($(tmp).attr('col'));
            }
            // event before
            var eventData = this.trigger({ phase: 'before', target: this.name, type: 'click', recid: recid, column: column, originalEvent: event });
            if (eventData.isCancelled === true) return;
            // if it is subgrid unselect top grid
            var parent = $('#grid_'+ this.name +'_rec_'+ w2utils.escapeId(recid)).parents('tr');
            if (parent.length > 0 && String(parent.attr('id')).indexOf('expanded_row') != -1) {
                var grid  = parent.parents('.w2ui-grid').attr('name');
                w2ui[grid].selectNone();
                // all subgrids
                parent.parents('.w2ui-grid').find('.w2ui-expanded-row .w2ui-grid').each(function (index, el) {
                    var grid = $(el).attr('name');
                    if (w2ui[grid]) w2ui[grid].selectNone();
                });
            }
            // unselect all subgrids
            $(this.box).find('.w2ui-expanded-row .w2ui-grid').each(function (index, el) {
                var grid = $(el).attr('name');
                if (w2ui[grid]) w2ui[grid].selectNone();
            });
            // default action
            var obj = this;
            var sel = this.getSelection();
            $('#grid_'+ this.name +'_check_all').prop("checked", false);
            var ind    = this.get(recid, true);
            var record = this.records[ind];
            var selectColumns  = [];
            obj.last.sel_ind   = ind;
            obj.last.sel_col   = column;
            obj.last.sel_recid = recid;
            obj.last.sel_type  = 'click';
            // multi select with shif key
            if (event.shiftKey && sel.length > 0 && obj.multiSelect) {
                if (sel[0].recid) {
                    var start = this.get(sel[0].recid, true);
                    var end   = this.get(recid, true);
                    if (column > sel[0].column) {
                        var t1 = sel[0].column;
                        var t2 = column;
                    } else {
                        var t1 = column;
                        var t2 = sel[0].column;
                    }
                    for (var c = t1; c <= t2; c++) selectColumns.push(c);
                } else {
                    var start = this.get(sel[0], true);
                    var end   = this.get(recid, true);
                }
                var sel_add = []
                if (start > end) { var tmp = start; start = end; end = tmp; }
                var url = (typeof this.url != 'object' ? this.url : this.url.get);
                for (var i = start; i <= end; i++) {
                    if (this.searchData.length > 0 && !url && $.inArray(i, this.last.searchIds) == -1) continue;
                    if (this.selectType == 'row') {
                        sel_add.push(this.records[i].recid);
                    } else {
                        for (var sc in selectColumns) sel_add.push({ recid: this.records[i].recid, column: selectColumns[sc] });
                    }
                    //sel.push(this.records[i].recid);
                }
                this.select.apply(this, sel_add);
            } else {
                var last = this.last.selection;
                var flag = (last.indexes.indexOf(ind) != -1 ? true : false);
                // clear other if necessary
                if (((!event.ctrlKey && !event.shiftKey && !event.metaKey) || !this.multiSelect) && !this.showSelectColumn) {
                    if (this.selectType != 'row' && $.inArray(column, last.columns[ind]) == -1) flag = false;
                    if (sel.length > 300) this.selectNone(); else this.unselect.apply(this, sel);
                    if (flag === true) {
                        this.unselect({ recid: recid, column: column });
                    } else {
                        this.select({ recid: recid, column: column });
                    }
                } else {
                    if (this.selectType != 'row' && $.inArray(column, last.columns[ind]) == -1) flag = false;
                    if (flag === true) {
                        this.unselect({ recid: recid, column: column });
                    } else {
                        this.select({ recid: recid, column: column });
                    }
                }
            }
            this.status();
            obj.initResize();
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        columnClick: function (field, event) {
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'columnClick', target: this.name, field: field, originalEvent: event });
            if (eventData.isCancelled === true) return;
            // default behaviour
            var column = this.getColumn(field);
            if (column && column.sortable) {
                this.sort(field, null, (event && (event.ctrlKey || event.metaKey) ? true : false) );
            }
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        keydown: function (event) {
            // this method is called from w2utils
            var obj = this;
            if (obj.keyboard !== true) return;
            // trigger event
            var eventData = obj.trigger({ phase: 'before', type: 'keydown', target: obj.name, originalEvent: event });
            if (eventData.isCancelled === true) return;
            // default behavior
            var empty   = false;
            var records = $('#grid_'+ obj.name +'_records');
            var sel     = obj.getSelection();
            if (sel.length == 0) empty = true;
            var recid   = sel[0] || null;
            var columns = [];
            var recid2  = sel[sel.length-1];
            if (typeof recid == 'object' && recid != null) {
                recid   = sel[0].recid;
                columns = [];
                var ii  = 0;
                while (true) {
                    if (!sel[ii] || sel[ii].recid != recid) break;
                    columns.push(sel[ii].column);
                    ii++;
                }
                recid2  = sel[sel.length-1].recid;
            }
            var ind    = obj.get(recid, true);
            var ind2   = obj.get(recid2, true);
            var rec    = obj.get(recid);
            var recEL  = $('#grid_'+ obj.name +'_rec_'+ (ind !== null ? w2utils.escapeId(obj.records[ind].recid) : 'none'));
            var cancel = false;
            var key    = event.keyCode;
            var shiftKey= event.shiftKey;
            if (key == 9) { // tab key
                if (event.shiftKey) key = 37; else key = 39; // replace with arrows
                shiftKey = false;
                cancel   = true;
            }
            switch (key) {
                case 8:  // backspace
                case 46: // delete
                    if (this.show.toolbarDelete) obj["delete"]();
                    cancel = true;
                    event.stopPropagation();
                    break;

                case 27: // escape
                    obj.selectNone();
                    if (sel.length > 0 && typeof sel[0] == 'object') {
                        obj.select({ recid: sel[0].recid, column: sel[0].column });
                    }
                    cancel = true;
                    break;

                case 65: // cmd + A
                    if (!event.metaKey && !event.ctrlKey) break;
                    obj.selectAll();
                    cancel = true;
                    break;

                case 70: // cmd + F
                    if (!event.metaKey && !event.ctrlKey) break;
                    $('#grid_'+ obj.name + '_search_all').focus();
                    cancel = true;
                    break;

                case 13: // enter
                    // if expandable columns - expand it
                    if (this.selectType == 'row' && obj.show.expandColumn === true) {
                        if (recEL.length <= 0) break;
                        obj.toggle(recid, event);
                        cancel = true;
                    } else { // or enter edit
                        for (var c in this.columns) {
                            if (this.columns[c].editable) {
                                columns.push(parseInt(c));
                                break;
                            }
                        }
                        // edit last column that was edited
                        if (this.selectType == 'row' && this.last.edit_col) columns = [this.last.edit_col];
                        if (columns.length > 0) {
                            obj.editField(recid, columns[0], null, event);
                            cancel = true;
                        }
                    }
                    break;

                case 37: // left
                    if (empty) break;
                    // check if this is subgrid
                    var parent = $('#grid_'+ this.name +'_rec_'+ w2utils.escapeId(obj.records[ind].recid)).parents('tr');
                    if (parent.length > 0 && String(parent.attr('id')).indexOf('expanded_row') != -1) {
                        var recid = parent.prev().attr('recid');
                        var grid  = parent.parents('.w2ui-grid').attr('name');
                        obj.selectNone();
                        w2utils.keyboard.active(grid);
                        w2ui[grid].set(recid, { expanded: false });
                        w2ui[grid].collapse(recid);
                        w2ui[grid].click(recid);
                        cancel = true;
                        break;
                    }
                    if (this.selectType == 'row') {
                        if (recEL.length <= 0 || rec.expanded !== true ) break;
                        obj.set(recid, { expanded: false }, true);
                        obj.collapse(recid, event);
                    } else {
                        var prev = obj.prevCell(columns[0]);
                        if (prev != null) {
                            if (shiftKey && obj.multiSelect) {
                                if (tmpUnselect()) return;
                                var tmp    = [];
                                var newSel = [];
                                var unSel  = [];
                                if (columns.indexOf(this.last.sel_col) == 0 && columns.length > 1) {
                                    for (var i in sel) {
                                        if (tmp.indexOf(sel[i].recid) == -1) tmp.push(sel[i].recid);
                                        unSel.push({ recid: sel[i].recid, column: columns[columns.length-1] });
                                    }
                                } else {
                                    for (var i in sel) {
                                        if (tmp.indexOf(sel[i].recid) == -1) tmp.push(sel[i].recid);
                                        newSel.push({ recid: sel[i].recid, column: prev });
                                    }
                                }
                                obj.unselect.apply(obj, unSel);
                                obj.select.apply(obj, newSel);
                            } else {
                                event.shiftKey = false;
                                obj.click({ recid: recid, column: prev }, event);
                            }
                        } else {
                            // if selected more then one, then select first
                            if (!shiftKey) {
                                for (var s=1; s<sel.length; s++) obj.unselect(sel[s]);
                            }
                        }
                    }
                    cancel = true;
                    break;

                case 39: // right
                    if (empty) break;
                    if (this.selectType == 'row') {
                        if (recEL.length <= 0 || rec.expanded === true || obj.show.expandColumn !== true) break;
                        obj.expand(recid, event);
                    } else {
                        var next = obj.nextCell(columns[columns.length-1]);
                        if (next !== null) {
                            if (shiftKey && key == 39 && obj.multiSelect) {
                                if (tmpUnselect()) return;
                                var tmp    = [];
                                var newSel = [];
                                var unSel  = [];
                                if (columns.indexOf(this.last.sel_col) == columns.length-1 && columns.length > 1) {
                                    for (var i in sel) {
                                        if (tmp.indexOf(sel[i].recid) == -1) tmp.push(sel[i].recid);
                                        unSel.push({ recid: sel[i].recid, column: columns[0] });
                                    }
                                } else {
                                    for (var i in sel) {
                                        if (tmp.indexOf(sel[i].recid) == -1) tmp.push(sel[i].recid);
                                        newSel.push({ recid: sel[i].recid, column: next });
                                    }
                                }
                                obj.unselect.apply(obj, unSel);
                                obj.select.apply(obj, newSel);
                            } else {
                                obj.click({ recid: recid, column: next }, event);
                            }
                        } else {
                            // if selected more then one, then select first
                            if (!shiftKey) {
                                for (var s=0; s<sel.length-1; s++) obj.unselect(sel[s]);
                            }
                        }
                    }
                    cancel = true;
                    break;

                case 38: // up
                    if (empty) selectTopRecord();
                    if (recEL.length <= 0) break;
                    // move to the previous record
                    var prev = obj.prevRow(ind);
                    if (prev != null) {
                        // jump into subgrid
                        if (obj.records[prev].expanded) {
                            var subgrid = $('#grid_'+ obj.name +'_rec_'+ w2utils.escapeId(obj.records[prev].recid) +'_expanded_row').find('.w2ui-grid');
                            if (subgrid.length > 0 && w2ui[subgrid.attr('name')]) {
                                obj.selectNone();
                                var grid = subgrid.attr('name');
                                var recs = w2ui[grid].records;
                                w2utils.keyboard.active(grid);
                                w2ui[grid].click(recs[recs.length-1].recid);
                                cancel = true;
                                break;
                            }
                        }
                        if (shiftKey && obj.multiSelect) { // expand selection
                            if (tmpUnselect()) return;
                            if (obj.selectType == 'row') {
                                if (obj.last.sel_ind > prev && obj.last.sel_ind != ind2) {
                                    obj.unselect(obj.records[ind2].recid);
                                } else {
                                    obj.select(obj.records[prev].recid);
                                }
                            } else {
                                if (obj.last.sel_ind > prev && obj.last.sel_ind != ind2) {
                                    prev = ind2;
                                    var tmp = [];
                                    for (var c in columns) tmp.push({ recid: obj.records[prev].recid, column: columns[c] });
                                    obj.unselect.apply(obj, tmp);
                                } else {
                                    var tmp = [];
                                    for (var c in columns) tmp.push({ recid: obj.records[prev].recid, column: columns[c] });
                                    obj.select.apply(obj, tmp);
                                }
                            }
                        } else { // move selected record
                            if (sel.length > 300) this.selectNone(); else this.unselect.apply(this, sel);
                            obj.click({ recid: obj.records[prev].recid, column: columns[0] }, event);
                        }
                        obj.scrollIntoView(prev);
                        if (event.preventDefault) event.preventDefault();
                    } else {
                        // if selected more then one, then select first
                        if (!shiftKey) {
                            for (var s=1; s<sel.length; s++) obj.unselect(sel[s]);
                        }
                        // jump out of subgird (if first record)
                        var parent = $('#grid_'+ obj.name +'_rec_'+ w2utils.escapeId(obj.records[ind].recid)).parents('tr');
                        if (parent.length > 0 && String(parent.attr('id')).indexOf('expanded_row') != -1) {
                            var recid = parent.prev().attr('recid');
                            var grid  = parent.parents('.w2ui-grid').attr('name');
                            obj.selectNone();
                            w2utils.keyboard.active(grid);
                            w2ui[grid].click(recid);
                            cancel = true;
                            break;
                        }
                    }
                    break;

                case 40: // down
                    if (empty) selectTopRecord();
                    if (recEL.length <= 0) break;
                    // jump into subgrid
                    if (obj.records[ind2].expanded) {
                        var subgrid = $('#grid_'+ this.name +'_rec_'+ w2utils.escapeId(obj.records[ind2].recid) +'_expanded_row').find('.w2ui-grid');
                        if (subgrid.length > 0 && w2ui[subgrid.attr('name')]) {
                            obj.selectNone();
                            var grid = subgrid.attr('name');
                            var recs = w2ui[grid].records;
                            w2utils.keyboard.active(grid);
                            w2ui[grid].click(recs[0].recid);
                            cancel = true;
                            break;
                        }
                    }
                    // move to the next record
                    var next = obj.nextRow(ind2);
                    if (next != null) {
                        if (shiftKey && obj.multiSelect) { // expand selection
                            if (tmpUnselect()) return;
                            if (obj.selectType == 'row') {
                                if (this.last.sel_ind < next && this.last.sel_ind != ind) {
                                    obj.unselect(obj.records[ind].recid);
                                } else {
                                    obj.select(obj.records[next].recid);
                                }
                            } else {
                                if (this.last.sel_ind < next && this.last.sel_ind != ind) {
                                    next = ind;
                                    var tmp = [];
                                    for (var c in columns) tmp.push({ recid: obj.records[next].recid, column: columns[c] });
                                    obj.unselect.apply(obj, tmp);
                                } else {
                                    var tmp = [];
                                    for (var c in columns) tmp.push({ recid: obj.records[next].recid, column: columns[c] });
                                    obj.select.apply(obj, tmp);
                                }
                            }
                        } else { // move selected record
                            if (sel.length > 300) this.selectNone(); else this.unselect.apply(this, sel);
                            obj.click({ recid: obj.records[next].recid, column: columns[0] }, event);
                        }
                        obj.scrollIntoView(next);
                        cancel = true;
                    } else {
                        // if selected more then one, then select first
                        if (!shiftKey) {
                            for (var s=0; s<sel.length-1; s++) obj.unselect(sel[s]);
                        }
                        // jump out of subgrid (if last record in subgrid)
                        var parent = $('#grid_'+ this.name +'_rec_'+ w2utils.escapeId(obj.records[ind2].recid)).parents('tr');
                        if (parent.length > 0 && String(parent.attr('id')).indexOf('expanded_row') != -1) {
                            var recid = parent.next().attr('recid');
                            var grid  = parent.parents('.w2ui-grid').attr('name');
                            obj.selectNone();
                            w2utils.keyboard.active(grid);
                            w2ui[grid].click(recid);
                            cancel = true;
                            break;
                        }
                    }
                    break;

                // copy & paste

                case 17: // ctrl key
                case 91: // cmd key
                    if (empty) break;
                    var text = obj.copy();
                    $('body').append('<textarea id="_tmp_copy_data" '+
                        '   onpaste="var obj = this; setTimeout(function () { w2ui[\''+ obj.name + '\'].paste(obj.value); }, 1);" '+
                        '   onkeydown="w2ui[\''+ obj.name +'\'].keydown(event)"'+
                        '   style="position: absolute; top: -100px; height: 1px; width: 1px">'+ text +'</textarea>');
                    $('#_tmp_copy_data').focus().select();
                    // remove _tmp_copy_data textarea
                    $(document).on('keyup', tmp_key_down);
                    function tmp_key_down() {
                        $('#_tmp_copy_data').remove();
                        $(document).off('keyup', tmp_key_down);
                    }
                    break;

                case 88: // x - cut
                    if (empty) break;
                    if (event.ctrlKey || event.metaKey) {
                        setTimeout(function () { obj["delete"](true); }, 100);
                    }
                    break;
            }
            var tmp = [187, 189, 32]; // =-spacebar
            for (var i=48; i<=90; i++) tmp.push(i); // 0-9,a-z,A-Z
            if (tmp.indexOf(key) != -1 && !event.ctrlKey && !event.metaKey && !cancel) {
                if (columns.length == 0) columns.push(0);
                var tmp = String.fromCharCode(key);
                if (key == 187) tmp = '=';
                if (key == 189) tmp = '-';
                if (!shiftKey)  tmp = tmp.toLowerCase();
                obj.editField(recid, columns[0], tmp, event);
                cancel = true;
            }
            if (cancel) { // cancel default behaviour
                if (event.preventDefault) event.preventDefault();
            }
            // event after
            obj.trigger($.extend(eventData, { phase: 'after' }));

            function selectTopRecord() {
                var ind = Math.floor((records[0].scrollTop + (records.height() / 2.1)) / obj.recordHeight);
                if (!obj.records[ind]) ind = 0;
                obj.select({ recid: obj.records[ind].recid, column: 0});
            }

            function tmpUnselect () {
                if (obj.last.sel_type != 'click') return false;
                if (obj.selectType != 'row') {
                    obj.last.sel_type = 'key';
                    if (sel.length > 1) {
                        for (var s in sel) {
                            if (sel[s].recid == obj.last.sel_recid && sel[s].column == obj.last.sel_col) {
                                sel.splice(s, 1);
                                break;
                            }
                        }
                        obj.unselect.apply(obj, sel);
                        return true;
                    }
                    return false;
                } else {
                    obj.last.sel_type = 'key';
                    if (sel.length > 1) {
                        sel.splice(sel.indexOf(obj.records[obj.last.sel_ind].recid), 1);
                        obj.unselect.apply(obj, sel);
                        return true;
                    }
                    return false;
                }
            }
        },

        scrollIntoView: function (ind) {
            var buffered = this.records.length;
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            if (this.searchData.length != 0 && !url) buffered = this.last.searchIds.length;
            if (typeof ind == 'undefined') {
                var sel = this.getSelection();
                if (sel.length == 0) return;
                ind = this.get(sel[0], true);
            }
            var records = $('#grid_'+ this.name +'_records');
            if (buffered == 0) return;
            // if all records in view
            var len = this.last.searchIds.length;
            if (records.height() > this.recordHeight * (len > 0 ? len : buffered)) return;
            if (len > 0) ind = this.last.searchIds.indexOf(ind); // if seach is applied
            // scroll to correct one
            var t1 = Math.floor(records[0].scrollTop / this.recordHeight);
            var t2 = t1 + Math.floor(records.height() / this.recordHeight);
            if (ind == t1) records.animate({ 'scrollTop': records.scrollTop() - records.height() / 1.3 }, 250, 'linear');
            if (ind == t2) records.animate({ 'scrollTop': records.scrollTop() + records.height() / 1.3 }, 250, 'linear');
            if (ind < t1 || ind > t2) records.animate({ 'scrollTop': (ind - 1) * this.recordHeight });
        },

        dblClick: function (recid, event) {
            //if (window.getSelection) window.getSelection().removeAllRanges(); // clear selection
            // find columns
            var column = null;
            if (typeof recid == 'object') {
                column = recid.column;
                recid  = recid.recid;
            }
            if (typeof event == 'undefined') event = {};
            // column user clicked on
            if (column == null && event.target) {
                var tmp = event.target;
                if (tmp.tagName != 'TD') tmp = $(tmp).parents('td')[0];
                column = parseInt($(tmp).attr('col'));
            }
            // event before
            var eventData = this.trigger({ phase: 'before', target: this.name, type: 'dblClick', recid: recid, column: column, originalEvent: event });
            if (eventData.isCancelled === true) return;
            // default action
            this.selectNone();
            var col = this.columns[column];
            if (col && $.isPlainObject(col.editable)) {
                this.editField(recid, column, null, event);
            } else {
                this.select({ recid: recid, column: column });
            }
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        contextMenu: function (recid, event) {
            var obj = this;
            if (obj.last.userSelect == 'text') return;
            if (typeof event == 'undefined') event = { offsetX: 0, offsetY: 0, target: $('#grid_'+ obj.name +'_rec_'+ recid)[0] };
            if (typeof event.offsetX === 'undefined') {
                event.offsetX = event.layerX - event.target.offsetLeft;
                event.offsetY = event.layerY - event.target.offsetTop;
            }
            if (w2utils.isFloat(recid)) recid = parseFloat(recid);
            if (this.getSelection().indexOf(recid) == -1) obj.click(recid);
            // need timeout to allow click to finish first
            setTimeout(function () {
                // event before
                var eventData = obj.trigger({ phase: 'before', type: 'contextMenu', target: obj.name, originalEvent: event, recid: recid });
                if (eventData.isCancelled === true) return;
                // default action
                if (obj.menu.length > 0) {
                    $(obj.box).find(event.target)
                        .w2menu(obj.menu, {
                            left    : event.offsetX,
                            onSelect: function (event) {
                                obj.menuClick(recid, parseInt(event.index), event.originalEvent);
                            }
                        }
                    );
                }
                // event after
                obj.trigger($.extend(eventData, { phase: 'after' }));
            }, 150); // need timer 150 for FF
            // cancel event
            if (event.preventDefault) event.preventDefault();
        },

        menuClick: function (recid, index, event) {
            var obj = this;
            // event before
            var eventData = obj.trigger({ phase: 'before', type: 'menuClick', target: obj.name, originalEvent: event,
                recid: recid, menuIndex: index, menuItem: obj.menu[index] });
            if (eventData.isCancelled === true) return;
            // default action
            // -- empty
            // event after
            obj.trigger($.extend(eventData, { phase: 'after' }));
        },

        toggle: function (recid) {
            var rec = this.get(recid);
            if (rec.expanded === true) return this.collapse(recid); else return this.expand(recid);
        },

        expand: function (recid) {
            var rec = this.get(recid);
            var obj = this;
            var id  = w2utils.escapeId(recid);
            if ($('#grid_'+ this.name +'_rec_'+ id +'_expanded_row').length > 0) return false;
            if (rec.expanded == 'none') return false;
            // insert expand row
            var tmp = 1 + (this.show.selectColumn ? 1 : 0);
            var addClass = ''; // ($('#grid_'+this.name +'_rec_'+ w2utils.escapeId(recid)).hasClass('w2ui-odd') ? 'w2ui-odd' : 'w2ui-even');
            $('#grid_'+ this.name +'_rec_'+ id).after(
                    '<tr id="grid_'+ this.name +'_rec_'+ recid +'_expanded_row" class="w2ui-expanded-row '+ addClass +'">'+
                        (this.show.lineNumbers ? '<td class="w2ui-col-number"></td>' : '') +
                    '    <td class="w2ui-grid-data w2ui-expanded1" colspan="'+ tmp +'"><div style="display: none"></div></td>'+
                    '    <td colspan="100" class="w2ui-expanded2">'+
                    '        <div id="grid_'+ this.name +'_rec_'+ recid +'_expanded" style="opacity: 0"></div>'+
                    '    </td>'+
                    '</tr>');
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'expand', target: this.name, recid: recid,
                box_id: 'grid_'+ this.name +'_rec_'+ recid +'_expanded', ready: ready });
            if (eventData.isCancelled === true) {
                $('#grid_'+ this.name +'_rec_'+ id +'_expanded_row').remove();
                return;
            }
            // default action
            $('#grid_'+ this.name +'_rec_'+ id).attr('expanded', 'yes').addClass('w2ui-expanded');
            $('#grid_'+ this.name +'_rec_'+ id +'_expanded_row').show();
            $('#grid_'+ this.name +'_cell_'+ this.get(recid, true) +'_expand div').html('<div class="w2ui-spinner" style="width: 16px; height: 16px; margin: -2px 2px;"></div>');
            rec.expanded = true;
            // check if height of expanded row > 5 then remove spinner
            setTimeout(ready, 300);
            function ready() {
                var div1 = $('#grid_'+ obj.name +'_rec_'+ id +'_expanded');
                var div2 = $('#grid_'+ obj.name +'_rec_'+ id +'_expanded_row .w2ui-expanded1 > div');
                if (div1.height() < 5) return;
                div1.css('opacity', 1);
                div2.show().css('opacity', 1);
                $('#grid_'+ obj.name +'_cell_'+ obj.get(recid, true) +'_expand div').html('-');
            }
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            this.resizeRecords();
            return true;
        },

        collapse: function (recid) {
            var rec = this.get(recid);
            var obj = this;
            var id  = w2utils.escapeId(recid);
            if ($('#grid_'+ this.name +'_rec_'+ id +'_expanded_row').length == 0) return false;
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'collapse', target: this.name, recid: recid,
                box_id: 'grid_'+ this.name +'_rec_'+ id +'_expanded' });
            if (eventData.isCancelled === true) return;
            // default action
            $('#grid_'+ this.name +'_rec_'+ id).removeAttr('expanded').removeClass('w2ui-expanded');
            $('#grid_'+ this.name +'_rec_'+ id +'_expanded').css('opacity', 0);
            $('#grid_'+ this.name +'_cell_'+ this.get(recid, true) +'_expand div').html('+');
            setTimeout(function () {
                $('#grid_'+ obj.name +'_rec_'+ id +'_expanded').height('0px');
                setTimeout(function () {
                    $('#grid_'+ obj.name +'_rec_'+ id +'_expanded_row').remove();
                    delete rec.expanded;
                    // event after
                    obj.trigger($.extend(eventData, { phase: 'after' }));
                    obj.resizeRecords();
                }, 300);
            }, 200);
            return true;
        },

        sort: function (field, direction, multiField) { // if no params - clears sort
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'sort', target: this.name, field: field, direction: direction, multiField: multiField });
            if (eventData.isCancelled === true) return;
            // check if needed to quit
            if (typeof field != 'undefined') {
                // default action
                var sortIndex = this.sortData.length;
                for (var s in this.sortData) {
                    if (this.sortData[s].field == field) { sortIndex = s; break; }
                }
                if (typeof direction == 'undefined' || direction == null) {
                    if (typeof this.sortData[sortIndex] == 'undefined') {
                        direction = 'asc';
                    } else {
                        switch (String(this.sortData[sortIndex].direction)) {
                            case 'asc'  : direction = 'desc'; break;
                            case 'desc' : direction = 'asc';  break;
                            default     : direction = 'asc';  break;
                        }
                    }
                }
                if (this.multiSort === false) { this.sortData = []; sortIndex = 0; }
                if (multiField != true) { this.sortData = []; sortIndex = 0; }
                // set new sort
                if (typeof this.sortData[sortIndex] == 'undefined') this.sortData[sortIndex] = {};
                this.sortData[sortIndex].field        = field;
                this.sortData[sortIndex].direction = direction;
            } else {
                this.sortData = [];
            }
            this.selectNone();
            // if local
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            if (!url) {
                this.localSort();
                if (this.searchData.length > 0) this.localSearch(true);
                // event after
                this.trigger($.extend(eventData, { phase: 'after' }));
                this.refresh();
            } else {
                // event after
                this.trigger($.extend(eventData, { phase: 'after' }));
                this.last.xhr_offset = 0;
                this.reload();
            }
        },

        copy: function () {
            var sel = this.getSelection();
            if (sel.length == 0) return '';
            var text = '';
            if (typeof sel[0] == 'object') { // cell copy
                // find min/max column
                var minCol = sel[0].column;
                var maxCol = sel[0].column;
                var recs   = [];
                for (var s in sel) {
                    if (sel[s].column < minCol) minCol = sel[s].column;
                    if (sel[s].column > maxCol) maxCol = sel[s].column;
                    if (recs.indexOf(sel[s].index) == -1) recs.push(sel[s].index);
                }
                for (var r in recs) {
                    var ind = recs[r];
                    for (var c = minCol; c <= maxCol; c++) {
                        var col = this.columns[c];
                        if (col.hidden === true) continue;
                        text += w2utils.stripTags(this.getCellHTML(ind, c)) + '\t';
                    }
                    text = text.substr(0, text.length-1); // remove last \t
                    text += '\n';
                }
            } else { // row copy
                // copy headers
                for (var c in this.columns) {
                    var col = this.columns[c];
                    if (col.hidden === true) continue;
                    text += '"' + w2utils.stripTags(col.caption ? col.caption : col.field) + '"\t';
                }
                text = text.substr(0, text.length-1); // remove last \t
                text += '\n';
                // copy selected text
                for (var s in sel) {
                    var ind = this.get(sel[s], true);
                    for (var c in this.columns) {
                        var col = this.columns[c];
                        if (col.hidden === true) continue;
                        text += '"' + w2utils.stripTags(this.getCellHTML(ind, c)) + '"\t';
                    }
                    text = text.substr(0, text.length-1); // remove last \t
                    text += '\n';
                }
            }
            text = text.substr(0, text.length - 1);
            // before event
            var eventData = this.trigger({ phase: 'before', type: 'copy', target: this.name, text: text });
            if (eventData.isCancelled === true) return '';
            text = eventData.text;
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            return text;
        },

        paste: function (text) {
            var sel = this.getSelection();
            var ind = this.get(sel[0].recid, true);
            var col = sel[0].column;
            // before event
            var eventData = this.trigger({ phase: 'before', type: 'paste', target: this.name, text: text, index: ind, column: col });
            if (eventData.isCancelled === true) return;
            text = eventData.text;
            // default action
            if (this.selectType == 'row' || sel.length == 0) {
                console.log('ERROR: You can paste only if grid.selectType = \'cell\' and when at least one cell selected.');
                // event after
                this.trigger($.extend(eventData, { phase: 'after' }));
                return;
            }
            var newSel = [];
            var text   = text.split('\n');
            for (var t in text) {
                var tmp  = text[t].split('\t');
                var cnt  = 0;
                var rec  = this.records[ind];
                var cols = [];
                for (var dt in tmp) {
                    if (!this.columns[col + cnt]) continue;
                    var field = this.columns[col + cnt].field;
                    rec.changes = rec.changes || {};
                    rec.changes[field] = tmp[dt];
                    cols.push(col + cnt);
                    cnt++;
                }
                for (var c in cols) newSel.push({ recid: rec.recid, column: cols[c] });
                ind++;
            }
            this.selectNone();
            this.select.apply(this, newSel);
            this.refresh();
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        // ==================================================
        // --- Common functions

        resize: function () {
            var obj  = this;
            var time = (new Date()).getTime();
            //if (window.getSelection) window.getSelection().removeAllRanges(); // clear selection
            // make sure the box is right
            if (!this.box || $(this.box).attr('name') != this.name) return;
            // determine new width and height
            $(this.box).find('> div')
                .css('width', $(this.box).width())
                .css('height', $(this.box).height());
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'resize', target: this.name });
            if (eventData.isCancelled === true) return;
            // resize
            obj.resizeBoxes();
            obj.resizeRecords();
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            return (new Date()).getTime() - time;
        },

        refreshCell: function (recid, field) {
            var index     = this.get(recid, true);
            var isSummary = (this.records[index] && this.records[index].recid == recid ? false : true);
            var col_ind   = this.getColumn(field, true);
            var rec       = (isSummary ? this.summary[index] : this.records[index]);
            var col       = this.columns[col_ind];
            var cell      = $('#grid_'+ this.name + '_rec_'+ recid +' [col='+ col_ind +']');
            // set cell html and changed flag
            cell.html(this.getCellHTML(index, col_ind, isSummary));
            if (rec.changes && typeof rec.changes[col.field] != 'undefined') {
                cell.addClass('w2ui-changed');
            } else {
                cell.removeClass('w2ui-changed');
            }
        },

        refreshRow: function (recid) {
            var tr = $('#grid_'+ this.name +'_rec_'+ w2utils.escapeId(recid));
            if (tr.length != 0) {
                var ind  = this.get(recid, true);
                var line = tr.attr('line');
                var isSummary = (this.records[ind] && this.records[ind].recid == recid ? false : true);
                // if it is searched, find index in search array
                var url = (typeof this.url != 'object' ? this.url : this.url.get);
                if (this.searchData.length > 0 && !url) for (var s in this.last.searchIds) if (this.last.searchIds[s] == ind) ind = s;
                $(tr).replaceWith(this.getRecordHTML(ind, line, isSummary));
                if (isSummary) this.resize();
            }
        },

        refresh: function () {
            var obj  = this;
            var time = (new Date()).getTime();
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            if (this.total <= 0 && !url && this.searchData.length == 0) {
                this.total = this.records.length;
            }
            //if (window.getSelection) window.getSelection().removeAllRanges(); // clear selection
            this.toolbar.disable('w2ui-edit', 'w2ui-delete');
            if (!this.box) return;
            // event before
            var eventData = this.trigger({ phase: 'before', target: this.name, type: 'refresh' });
            if (eventData.isCancelled === true) return;
            // -- header
            if (this.show.header) {
                $('#grid_'+ this.name +'_header').html(this.header +'&nbsp;').show();
            } else {
                $('#grid_'+ this.name +'_header').hide();
            }
            // -- toolbar
            if (this.show.toolbar) {
                // if select-collumn is checked - no toolbar refresh
                if (this.toolbar && this.toolbar.get('w2ui-column-on-off') && this.toolbar.get('w2ui-column-on-off').checked) {
                    // no action
                } else {
                    $('#grid_'+ this.name +'_toolbar').show();
                    // refresh toolbar all but search field
                    if (typeof this.toolbar == 'object') {
                        var tmp = this.toolbar.items;
                        for (var t in tmp) {
                            if (tmp[t].id == 'w2ui-search' || tmp[t].type == 'break') continue;
                            this.toolbar.refresh(tmp[t].id);
                        }
                    }
                }
            } else {
                $('#grid_'+ this.name +'_toolbar').hide();
            }
            // -- make sure search is closed
            this.searchClose();
            // search placeholder
            var el = $('#grid_'+ obj.name +'_search_all');
            if (!this.multiSearch && this.last.field == 'all' && this.searches.length > 0) {
                this.last.field   = this.searches[0].field;
                this.last.caption = this.searches[0].caption;
            }
            for (var s in this.searches) {
                if (this.searches[s].field == this.last.field) this.last.caption = this.searches[s].caption;
            }
            if (this.last.multi) {
                el.attr('placeholder', '[' + w2utils.lang('Multiple Fields') + ']');
            } else {
                el.attr('placeholder', this.last.caption);
            }
            if (el.val() != this.last.search) {
                var val = this.last.search;
                var tmp = el.data('w2field');
                if (tmp) val = tmp.format(val);
                el.val(val);
            }

            // -- separate summary
            var tmp = this.find({ summary: true }, true);
            if (tmp.length > 0) {
                for (var t in tmp) this.summary.push(this.records[tmp[t]]);
                for (var t=tmp.length-1; t>=0; t--) this.records.splice(tmp[t], 1);
                this.total = this.total - tmp.length;
            }

            // collapse all records
            var rows = obj.find({ expanded: true }, true);
            for (var r in rows) obj.records[rows[r]].expanded = false;

            // -- body
            var bodyHTML = '';
            bodyHTML +=  '<div id="grid_'+ this.name +'_records" class="w2ui-grid-records"'+
                        '    onscroll="var obj = w2ui[\''+ this.name + '\']; '+
                        '        obj.last.scrollTop = this.scrollTop; '+
                        '        obj.last.scrollLeft = this.scrollLeft; '+
                        '        $(\'#grid_'+ this.name +'_columns\')[0].scrollLeft = this.scrollLeft;'+
                        '        $(\'#grid_'+ this.name +'_summary\')[0].scrollLeft = this.scrollLeft;'+
                        '        obj.scroll(event);">'+
                            this.getRecordsHTML() +
                        '</div>'+
                        '<div id="grid_'+ this.name +'_columns" class="w2ui-grid-columns">'+
                        '    <table>'+ this.getColumnsHTML() +'</table>'+
                        '</div>'; // Columns need to be after to be able to overlap
            $('#grid_'+ this.name +'_body').html(bodyHTML);
            // show summary records
            if (this.summary.length > 0) {
                $('#grid_'+ this.name +'_summary').html(this.getSummaryHTML()).show();
            } else {
                $('#grid_'+ this.name +'_summary').hide();
            }
            // -- footer
            if (this.show.footer) {
                $('#grid_'+ this.name +'_footer').html(this.getFooterHTML()).show();
            } else {
                $('#grid_'+ this.name +'_footer').hide();
            }
            // show/hide clear search link
             if (this.searchData.length > 0) {
                $('#grid_'+ this.name +'_searchClear').show();
            } else {
                $('#grid_'+ this.name +'_searchClear').hide();
            }
            // all selected?
            var sel = this.last.selection;
            if (sel.indexes.length == this.records.length || (this.searchData.length !== 0 && sel.indexes.length == this.last.searchIds.length)) {
                $('#grid_'+ this.name +'_check_all').prop('checked', true);
            } else {
                $('#grid_'+ this.name +'_check_all').prop('checked', false);
            }
            // show number of selected
            this.status();
            // mark selection
            setTimeout(function () {
                var str  = $.trim($('#grid_'+ obj.name +'_search_all').val());
                if (str != '') $(obj.box).find('.w2ui-grid-data > div').w2marker(str);
            }, 50);
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            obj.resize();
            obj.addRange('selection');
            setTimeout(function () { obj.resize(); obj.scroll(); }, 1); // allow to render first

            if ( obj.reorderColumns && !obj.last.columnDrag ) {
                obj.last.columnDrag = obj.initColumnDrag();
            } else if ( !obj.reorderColumns && obj.last.columnDrag ) {
                obj.last.columnDrag.remove();
            }

            return (new Date()).getTime() - time;
        },

        render: function (box) {
            var obj  = this;
            var time = (new Date()).getTime();
            //if (window.getSelection) window.getSelection().removeAllRanges(); // clear selection
            if (typeof box != 'undefined' && box != null) {
                if ($(this.box).find('#grid_'+ this.name +'_body').length > 0) {
                    $(this.box)
                        .removeAttr('name')
                        .removeClass('w2ui-reset w2ui-grid')
                        .html('');
                }
                this.box = box;
            }
            if (!this.box) return;
            if (this.last.sortData == null) this.last.sortData = this.sortData;
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            // event before
            var eventData = this.trigger({ phase: 'before', target: this.name, type: 'render', box: box });
            if (eventData.isCancelled === true) return;
            // insert Elements
            $(this.box)
                .attr('name', this.name)
                .addClass('w2ui-reset w2ui-grid')
                .html('<div>'+
                      '    <div id="grid_'+ this.name +'_header" class="w2ui-grid-header"></div>'+
                      '    <div id="grid_'+ this.name +'_toolbar" class="w2ui-grid-toolbar"></div>'+
                      '    <div id="grid_'+ this.name +'_body" class="w2ui-grid-body"></div>'+
                      '    <div id="grid_'+ this.name +'_summary" class="w2ui-grid-body w2ui-grid-summary"></div>'+
                      '    <div id="grid_'+ this.name +'_footer" class="w2ui-grid-footer"></div>'+
                      '</div>');
            if (this.selectType != 'row') $(this.box).addClass('w2ui-ss');
            if ($(this.box).length > 0) $(this.box)[0].style.cssText += this.style;
            // init toolbar
            this.initToolbar();
            if (this.toolbar != null) this.toolbar.render($('#grid_'+ this.name +'_toolbar')[0]);
            // reinit search_all
            if (this.last.field && this.last.field != 'all') {
                var sd = this.searchData;
                this.initAllField(this.last.field, (sd.length == 1 ? sd[0].value : null));
            }
            // init footer
            $('#grid_'+ this.name +'_footer').html(this.getFooterHTML());
            // refresh
            if (!this.last.state) this.last.state = this.stateSave(true); // initial default state
            this.stateRestore();
            if (url) this.refresh(); // show empty grid (need it) - should it be only for remote data source
            this.reload();

            // init mouse events for mouse selection
            $(this.box).on('mousedown', mouseStart);
            $(this.box).on('selectstart', function () { return false; }); // fixes chrome cursor bug

            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            // attach to resize event
            if ($('.w2ui-layout').length == 0) { // if there is layout, it will send a resize event
                this.tmp_resize = function (event) { w2ui[obj.name].resize(); }
                $(window).off('resize', this.tmp_resize).on('resize', this.tmp_resize);
            }
            return (new Date()).getTime() - time;

            function mouseStart (event) {
                if (event.which != 1) return; // if not left mouse button
                // restore css user-select
                if (obj.last.userSelect == 'text') {
                    delete obj.last.userSelect;
                    $(obj.box).find('.w2ui-grid-body')
                        .css('user-select', 'none')
                        .css('-webkit-user-select', 'none')
                        .css('-moz-user-select', 'none')
                        .css('-ms-user-select', 'none');
                    $(this.box).on('selectstart', function () { return false; });
                }
                // regular record select
                if ($(event.target).parents().hasClass('w2ui-head') || $(event.target).hasClass('w2ui-head')) return;
                if (obj.last.move && obj.last.move.type == 'expand') return;
                // if altKey - alow text selection
                if (event.altKey) {
                    $(obj.box).off('selectstart');
                    $(obj.box).find('.w2ui-grid-body')
                        .css('user-select', 'text')
                        .css('-webkit-user-select', 'text')
                        .css('-moz-user-select', 'text')
                        .css('-ms-user-select', 'text');
                    obj.selectNone();
                    obj.last.move       = { type: 'text-select' };
                    obj.last.userSelect = 'text';
                } else {
                    if (!obj.multiSelect) return;
                    obj.last.move = {
                        x      : event.screenX,
                        y      : event.screenY,
                        divX   : 0,
                        divY   : 0,
                        recid  : $(event.target).parents('tr').attr('recid'),
                        column : (event.target.tagName == 'TD' ? $(event.target).attr('col') : $(event.target).parents('td').attr('col')),
                        type   : 'select',
                        ghost  : false,
                        start  : true
                    };
                }
                $(document).on('mousemove', mouseMove);
                $(document).on('mouseup', mouseStop);
            }

            function mouseMove (event) {
                var mv = obj.last.move;
                if (!mv || mv.type != 'select') return;
                mv.divX = (event.screenX - mv.x);
                mv.divY = (event.screenY - mv.y);
                if (Math.abs(mv.divX) <= 1 && Math.abs(mv.divY) <= 1) return; // only if moved more then 1px
                obj.last.cancelClick = true;
                if (obj.reorderRows == true) {
                    if (!mv.ghost) {
                        var row    = $('#grid_'+ obj.name + '_rec_'+ mv.recid);
                        var tmp    = row.parents('table').find('tr:first-child').clone();
                        mv.offsetY = event.offsetY;
                        mv.from    = mv.recid;
                        mv.pos     = row.position();
                        mv.ghost   = $(row).clone(true);
                        mv.ghost.removeAttr('id');
                        row.find('td:first-child').replaceWith('<td colspan="1000" style="height: '+ obj.recordHeight +'px; background-color: #ddd"></td>');
                        var recs = $(obj.box).find('.w2ui-grid-records');
                        recs.append('<table id="grid_'+ obj.name + '_ghost" style="position: absolute; z-index: 999999; opacity: 0.8; border-bottom: 2px dashed #aaa; border-top: 2px dashed #aaa; pointer-events: none;"></table>');
                        $('#grid_'+ obj.name + '_ghost').append(tmp).append(mv.ghost);
                    }
                    var recid = $(event.target).parents('tr').attr('recid');
                    if (recid != mv.from) {
                        var row1 = $('#grid_'+ obj.name + '_rec_'+ mv.recid);
                        var row2 = $('#grid_'+ obj.name + '_rec_'+ recid);
                        if (event.screenY - mv.lastY < 0) row1.after(row2); else row2.after(row1);
                        mv.lastY = event.screenY;
                        mv.to      = recid;
                    }
                    var ghost = $('#grid_'+ obj.name + '_ghost');
                    var recs  = $(obj.box).find('.w2ui-grid-records');
                    ghost.css({
                        top     : mv.pos.top + mv.divY + recs.scrollTop(), // + mv.offsetY - obj.recordHeight / 2,
                        left : mv.pos.left
                    });
                    return;
                }
                if (mv.start && mv.recid) {
                    obj.selectNone();
                    mv.start = false;
                }
                var newSel= [];
                var recid = (event.target.tagName == 'TR' ? $(event.target).attr('recid') : $(event.target).parents('tr').attr('recid'));
                if (typeof recid == 'undefined') return;
                var ind1  = obj.get(mv.recid, true);
                // |:wolfmanx:| this happens when selection is started on summary row
                if (ind1 === null) return;
                var ind2  = obj.get(recid, true);
                // this happens when selection is extended into summary row (a good place to implement scrolling)
                if (ind2 === null) return;
                var col1 = parseInt(mv.column);
                var col2 = parseInt(event.target.tagName == 'TD' ? $(event.target).attr('col') : $(event.target).parents('td').attr('col'));
                if (ind1 > ind2) { var tmp = ind1; ind1 = ind2; ind2 = tmp; }
                // check if need to refresh
                var tmp = 'ind1:'+ ind1 +',ind2;'+ ind2 +',col1:'+ col1 +',col2:'+ col2;
                if (mv.range == tmp) return;
                mv.range = tmp;
                for (var i = ind1; i <= ind2; i++) {
                    if (obj.last.searchIds.length > 0 && obj.last.searchIds.indexOf(i) == -1) continue;
                    if (obj.selectType != 'row') {
                        if (col1 > col2) { var tmp = col1; col1 = col2; col2 = tmp; }
                        var tmp = [];
                        for (var c = col1; c <= col2; c++) {
                            if (obj.columns[c].hidden) continue;
                            newSel.push({ recid: obj.records[i].recid, column: parseInt(c) });
                        }
                    } else {
                        newSel.push(obj.records[i].recid);
                    }
                }
                if (obj.selectType != 'row') {
                    var sel = obj.getSelection();
                    // add more items
                    var tmp = [];
                    for (var ns in newSel) {
                        var flag = false;
                        for (var s in sel) if (newSel[ns].recid == sel[s].recid && newSel[ns].column == sel[s].column) flag = true;
                        if (!flag) tmp.push({ recid: newSel[ns].recid, column: newSel[ns].column });
                    }
                    obj.select.apply(obj, tmp);
                    // remove items
                    var tmp = [];
                    for (var s in sel) {
                        var flag = false;
                        for (var ns in newSel) if (newSel[ns].recid == sel[s].recid && newSel[ns].column == sel[s].column) flag = true;
                        if (!flag) tmp.push({ recid: sel[s].recid, column: sel[s].column });
                    }
                    obj.unselect.apply(obj, tmp);
                } else {
                    if (obj.multiSelect) {
                        var sel = obj.getSelection();
                        for (var ns in newSel) if (sel.indexOf(newSel[ns]) == -1) obj.select(newSel[ns]); // add more items
                        for (var s in sel) if (newSel.indexOf(sel[s]) == -1) obj.unselect(sel[s]); // remove items
                    }
                }
            }

            function mouseStop (event) {
                var mv = obj.last.move;
                setTimeout(function () { delete obj.last.cancelClick; }, 1);
                if ($(event.target).parents().hasClass('.w2ui-head') || $(event.target).hasClass('.w2ui-head')) return;
                if (mv && mv.type == 'select') {
                    if (obj.reorderRows == true) {
                        var ind1 = obj.get(mv.from, true);
                        var tmp  = obj.records[ind1];
                        obj.records.splice(ind1, 1);
                        var ind2 = obj.get(mv.to, true);
                        if (ind1 > ind2) obj.records.splice(ind2, 0, tmp); else obj.records.splice(ind2+1, 0, tmp);
                        $('#grid_'+ obj.name + '_ghost').remove();
                        obj.refresh();
                    }
                }
                delete obj.last.move;
                $(document).off('mousemove', mouseMove);
                $(document).off('mouseup', mouseStop);
            }
        },

        destroy: function () {
            // event before
            var eventData = this.trigger({ phase: 'before', target: this.name, type: 'destroy' });
            if (eventData.isCancelled === true) return;
            // remove events
            $(window).off('resize', this.tmp_resize);
            // clean up
            if (typeof this.toolbar == 'object' && this.toolbar.destroy) this.toolbar.destroy();
            if ($(this.box).find('#grid_'+ this.name +'_body').length > 0) {
                $(this.box)
                    .removeAttr('name')
                    .off('selectstart')
                    .removeClass('w2ui-reset w2ui-grid')
                    .html('');
            }
            delete w2ui[this.name];
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        // ===========================================
        // --- Internal Functions

        initColumnOnOff: function () {
            if (!this.show.toolbarColumns) return;
            var obj = this;
            var col_html =  '<div class="w2ui-col-on-off">'+
                            '<table><tr>'+
                            '<td style="width: 30px">'+
                            '    <input id="grid_'+ this.name +'_column_ln_check" type="checkbox" tabIndex="-1" '+ (obj.show.lineNumbers ? 'checked' : '') +
                            '        onclick="w2ui[\''+ obj.name +'\'].columnOnOff(this, event, \'line-numbers\');">'+
                            '</td>'+
                            '<td onclick="w2ui[\''+ obj.name +'\'].columnOnOff(this, event, \'line-numbers\'); $(\'#w2ui-overlay\')[0].hide();">'+
                            '    <label for="grid_'+ this.name +'_column_ln_check">'+ w2utils.lang('Line #') +'</label>'+
                            '</td></tr>';
            for (var c in this.columns) {
                var col = this.columns[c];
                var tmp = this.columns[c].caption;
                if (col.hideable === false) continue;
                if (!tmp && this.columns[c].hint) tmp = this.columns[c].hint;
                if (!tmp) tmp = '- column '+ (parseInt(c) + 1) +' -';
                col_html += '<tr>'+
                    '<td style="width: 30px">'+
                    '    <input id="grid_'+ this.name +'_column_'+ c +'_check" type="checkbox" tabIndex="-1" '+ (col.hidden ? '' : 'checked') +
                    '        onclick="w2ui[\''+ obj.name +'\'].columnOnOff(this, event, \''+ col.field +'\');">'+
                    '</td>'+
                    '<td>'+
                    '    <label for="grid_'+ this.name +'_column_'+ c +'_check">'+ tmp +    '</label>'+
                    '</td>'+
                    '</tr>';
            }
            col_html += '<tr><td colspan="2"><div style="border-top: 1px solid #ddd;"></div></td></tr>';
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            if (url && obj.show.skipRecords) {
                col_html +=
                        '<tr><td colspan="2" style="padding: 0px">'+
                        '    <div style="cursor: pointer; padding: 2px 8px; cursor: default">'+ w2utils.lang('Skip') +
                        '        <input type="text" style="width: 45px" value="'+ this.offset +'" '+
                        '            onkeypress="if (event.keyCode == 13) { '+
                        '               w2ui[\''+ obj.name +'\'].skip(this.value); '+
                        '               $(\'#w2ui-overlay\')[0].hide(); '+
                        '            }"> '+ w2utils.lang('Records')+
                        '    </div>'+
                        '</td></tr>';
            }
            col_html += '<tr><td colspan="2" onclick="w2ui[\''+ obj.name +'\'].stateSave(); $(\'#w2ui-overlay\')[0].hide();">'+
                        '    <div style="cursor: pointer; padding: 4px 8px; cursor: default">'+ w2utils.lang('Save Grid State') + '</div>'+
                        '</td></tr>'+
                        '<tr><td colspan="2" onclick="w2ui[\''+ obj.name +'\'].stateReset(); $(\'#w2ui-overlay\')[0].hide();">'+
                        '    <div style="cursor: pointer; padding: 4px 8px; cursor: default">'+ w2utils.lang('Restore Default State') + '</div>'+
                        '</td></tr>';
            col_html += "</table></div>";
            this.toolbar.get('w2ui-column-on-off').html = col_html;
        },

        /**
         *
         * @param box, grid object
         * @returns {{remove: Function}} contains a closure around all events to ensure they are removed from the dom
         */
        initColumnDrag: function ( box ) {
            //throw error if using column groups
            if ( this.columnGroups && this.columnGroups.length ) throw 'Draggable columns are not currently supported with column groups.';

            var obj = this,
                _dragData = {};
                _dragData.lastInt = null;
                _dragData.pressed = false;
                _dragData.timeout = null;_dragData.columnHead = null;

            //attach orginal event listener
            $(obj.box).on('mousedown', dragColStart);
            $(obj.box).on('mouseup', catchMouseup);

            function catchMouseup(){
                _dragData.pressed = false;
                clearTimeout( _dragData.timeout );
            }
            /**
             *
             * @param event, mousedown
             * @returns {boolean} false, preventsDefault
             */
            function dragColStart ( event ) {
                if ( _dragData.timeout ) clearTimeout( _dragData.timeout );
                var self = this;
                _dragData.pressed = true;

                _dragData.timeout = setTimeout(function(){
                    if ( !_dragData.pressed ) return;

                    var eventData,
                        columns,
                        selectedCol,
                        origColumn,
                        origColumnNumber,
                        invalidPreColumns = [ 'w2ui-col-number', 'w2ui-col-expand', 'w2ui-col-select' ],
                        invalidPostColumns = [ 'w2ui-head-last' ],
                        invalidColumns = invalidPreColumns.concat( invalidPostColumns ),
                        preColumnsSelector = '.w2ui-col-number, .w2ui-col-expand, .w2ui-col-select',
                        preColHeadersSelector = '.w2ui-head.w2ui-col-number, .w2ui-head.w2ui-col-expand, .w2ui-head.w2ui-col-select';

                    // do nothing if it is not a header
                    if ( !$( event.originalEvent.target ).parents().hasClass( 'w2ui-head' ) ) return;

                    // do nothing if it is an invalid column
                    for ( var i = 0, l = invalidColumns.length; i < l; i++ ){
                        if ( $( event.originalEvent.target ).parents().hasClass( invalidColumns[ i ] ) ) return;
                    }

                    _dragData.numberPreColumnsPresent = $( obj.box ).find( preColHeadersSelector ).length;

                    //start event for drag start
                    _dragData.columnHead = origColumn = $( event.originalEvent.target ).parents( '.w2ui-head' );
                    origColumnNumber = parseInt( origColumn.attr( 'col' ), 10);
                    eventData = obj.trigger({ type: 'columnDragStart', phase: 'before', originalEvent: event, origColumnNumber: origColumnNumber, target: origColumn[0] });
                    if ( eventData.isCancelled === true ) return false;

                    columns = _dragData.columns = $( obj.box ).find( '.w2ui-head:not(.w2ui-head-last)' );

                    //add events
                    $( document ).on( 'mouseup', dragColEnd );
                    $( document ).on( 'mousemove', dragColOver );

                    _dragData.originalPos = parseInt( $( event.originalEvent.target ).parent( '.w2ui-head' ).attr( 'col' ), 10 );
                    //_dragData.columns.css({ overflow: 'visible' }).children( 'div' ).css({ overflow: 'visible' });

                    //configure and style ghost image
                    _dragData.ghost = $( self ).clone( true );

                    //hide other elements on ghost except the grid body
                    $( _dragData.ghost ).find( '[col]:not([col="' + _dragData.originalPos + '"]), .w2ui-toolbar, .w2ui-grid-header' ).remove();
                    $( _dragData.ghost ).find( preColumnsSelector ).remove();
                    $( _dragData.ghost ).find( '.w2ui-grid-body' ).css({ top: 0 });

                    selectedCol = $( _dragData.ghost ).find( '[col="' + _dragData.originalPos + '"]' );
                    $( document.body ).append( _dragData.ghost );

                    $( _dragData.ghost ).css({
                        width: 0,
                        height: 0,
                        margin: 0,
                        position: 'fixed',
                        zIndex: 999999,
                        opacity: 0
                    }).addClass( '.w2ui-grid-ghost' ).animate({
                            width: selectedCol.width(),
                            height: $(obj.box).find('.w2ui-grid-body:first').height(),
                            left : event.pageX,
                            top : event.pageY,
                            opacity: .8
                        }, 0 );

                    //establish current offsets
                    _dragData.offsets = [];
                    for ( var i = 0, l = columns.length; i < l; i++ ) {
                        _dragData.offsets.push( $( columns[ i ] ).offset().left );
                    }

                    //conclude event
                    obj.trigger( $.extend( eventData, { phase: 'after' } ) );
                }, 150 );//end timeout wrapper
            }

            function dragColOver ( event ) {
                if ( !_dragData.pressed ) return;

                var cursorX = event.originalEvent.pageX,
                    cursorY = event.originalEvent.pageY,
                    offsets = _dragData.offsets,
                    lastWidth = $( '.w2ui-head:not(.w2ui-head-last)' ).width();

                _dragData.targetInt = Math.max(_dragData.numberPreColumnsPresent,targetIntersection( cursorX, offsets, lastWidth ));

                markIntersection( _dragData.targetInt );
                trackGhost( cursorX, cursorY );
            }

            function dragColEnd ( event ) {
                _dragData.pressed = false;

                var eventData,
                    target,
                    selected,
                    columnConfig,
                    targetColumn,
                    ghosts = $( '.w2ui-grid-ghost' );

                //start event for drag start
                eventData = obj.trigger({ type: 'columnDragEnd', phase: 'before', originalEvent: event, target: _dragData.columnHead[0] });
                if ( eventData.isCancelled === true ) return false;

                selected = obj.columns[ _dragData.originalPos ];
                columnConfig = obj.columns;
                targetColumn =  $( _dragData.columns[ Math.min(_dragData.lastInt, _dragData.columns.length - 1) ] );
                target = (_dragData.lastInt < _dragData.columns.length) ? parseInt(targetColumn.attr('col')) : columnConfig.length;

                if ( target !== _dragData.originalPos + 1 && target !== _dragData.originalPos && targetColumn && targetColumn.length ) {
                    $( _dragData.ghost ).animate({
                        top: $( obj.box ).offset().top,
                        left: targetColumn.offset().left,
                        width: 0,
                        height: 0,
                        opacity:.2
                    }, 300, function(){
                        $( this ).remove();
                        ghosts.remove();
                    });

                    columnConfig.splice( target, 0, $.extend( {}, selected ) );
                    columnConfig.splice( columnConfig.indexOf( selected ), 1);

                } else {
                    $( _dragData.ghost ).remove();
                    ghosts.remove();
                }

                //_dragData.columns.css({ overflow: '' }).children( 'div' ).css({ overflow: '' });

                $( document ).off( 'mouseup', dragColEnd );
                $( document ).off( 'mousemove', dragColOver );
                if ( _dragData.marker ) _dragData.marker.remove();
                _dragData = {};

                obj.refresh();

                //conclude event
                obj.trigger( $.extend( eventData, { phase: 'after', targetColumnNumber: target - 1 } ) );
            }

            function markIntersection( intersection ){
                if ( !_dragData.marker && !_dragData.markerLeft ) {
                    _dragData.marker = $('<div class="col-intersection-marker">' +
                        '<div class="top-marker"></div>' +
                        '<div class="bottom-marker"></div>' +
                        '</div>');
                    _dragData.markerLeft = $('<div class="col-intersection-marker">' +
                        '<div class="top-marker"></div>' +
                        '<div class="bottom-marker"></div>' +
                        '</div>');
                }

                if ( !_dragData.lastInt || _dragData.lastInt !== intersection ){
                    _dragData.lastInt = intersection;
                    _dragData.marker.remove();
                    _dragData.markerLeft.remove();
                    $('.w2ui-head').removeClass('w2ui-col-intersection');

                    //if the current intersection is greater than the number of columns add the marker to the end of the last column only
                    if ( intersection >= _dragData.columns.length ) {
                        $( _dragData.columns[ _dragData.columns.length - 1 ] ).children( 'div:last' ).append( _dragData.marker.addClass( 'right' ).removeClass( 'left' ) );
                        $( _dragData.columns[ _dragData.columns.length - 1 ] ).addClass('w2ui-col-intersection');
                    } else if ( intersection <= _dragData.numberPreColumnsPresent ) {
                        //if the current intersection is on the column numbers place marker on first available column only
                        $( _dragData.columns[ _dragData.numberPreColumnsPresent ] ).prepend( _dragData.marker.addClass( 'left' ).removeClass( 'right' ) ).css({ position: 'relative' });
                        $( _dragData.columns[ _dragData.numberPreColumnsPresent ] ).prev().addClass('w2ui-col-intersection');
                    } else {
                        //otherwise prepend the marker to the targeted column and append it to the previous column
                        $( _dragData.columns[intersection] ).children( 'div:last' ).prepend( _dragData.marker.addClass( 'left' ).removeClass( 'right' ) );
                        $( _dragData.columns[intersection] ).prev().children( 'div:last' ).append( _dragData.markerLeft.addClass( 'right' ).removeClass( 'left' ) ).css({ position: 'relative' });
                        $( _dragData.columns[intersection - 1] ).addClass('w2ui-col-intersection');
                    }
                }
            }

            function targetIntersection( cursorX, offsets, lastWidth ){
                if ( cursorX <= offsets[0] ) {
                    return 0;
                } else if ( cursorX >= offsets[offsets.length - 1] + lastWidth ) {
                    return offsets.length;
                } else {
                    for ( var i = 0, l = offsets.length; i < l; i++ ) {
                        var thisOffset = offsets[ i ];
                        var nextOffset = offsets[ i + 1 ] || offsets[ i ] + lastWidth;
                        var midpoint = ( nextOffset - offsets[ i ]) / 2 + offsets[ i ];

                        if ( cursorX > thisOffset && cursorX <= midpoint ) {
                            return i;
                        } else if ( cursorX > midpoint && cursorX <= nextOffset ) {
                            return i + 1;
                        }
                    }
                    return intersection;
                }
            }

            function trackGhost( cursorX, cursorY ){
                $( _dragData.ghost ).css({
                    left: cursorX - 10,
                    top: cursorY - 10
                });
            }

            //return an object to remove drag if it has ever been enabled
            return {
                remove: function(){
                    $( obj.box ).off( 'mousedown', dragColStart );
                    $( obj.box ).off( 'mouseup', catchMouseup );
                    $( obj.box ).find( '.w2ui-head' ).removeAttr( 'draggable' );
                    obj.last.columnDrag = false;
                }
            }
        },

        columnOnOff: function (el, event, field) {
            // event before
            var eventData = this.trigger({ phase: 'before', target: this.name, type: 'columnOnOff', checkbox: el, field: field, originalEvent: event });
            if (eventData.isCancelled === true) return;
            // regular processing
            var obj = this;
            // collapse expanded rows
            for (var r in this.records) {
                if (this.records[r].expanded === true) this.records[r].expanded = false
            }
            // show/hide
            var hide = true;
            if (field == 'line-numbers') {
                this.show.lineNumbers = !this.show.lineNumbers;
                this.refresh();
            } else {
                var col = this.getColumn(field);
                if (col.hidden) {
                    $(el).prop('checked', true);
                    this.showColumn(col.field);
                } else {
                    $(el).prop('checked', false);
                    this.hideColumn(col.field);
                }
                hide = false;
            }
            if (hide) {
                setTimeout(function () {
                    $().w2overlay('', { name: 'searches-'+ this.name });
                    obj.toolbar.uncheck('column-on-off');
                }, 100);
            }
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        initToolbar: function () {
            // -- if toolbar is true
            if (typeof this.toolbar['render'] == 'undefined') {
                var tmp_items = this.toolbar.items;
                this.toolbar.items = [];
                this.toolbar = $().w2toolbar($.extend(true, {}, this.toolbar, { name: this.name +'_toolbar', owner: this }));

                // =============================================
                // ------ Toolbar Generic buttons

                if (this.show.toolbarReload) {
                    this.toolbar.items.push($.extend(true, {}, this.buttons['reload']));
                }
                if (this.show.toolbarColumns) {
                    this.toolbar.items.push($.extend(true, {}, this.buttons['columns']));
                }
                if (this.show.toolbarReload || this.show.toolbarColumn) {
                    this.toolbar.items.push({ type: 'break', id: 'w2ui-break0' });
                }
                if (this.show.toolbarSearch) {
                    var html =
                        '<div class="w2ui-toolbar-search">'+
                        '<table cellpadding="0" cellspacing="0"><tr>'+
                        '    <td>'+ this.buttons['search'].html +'</td>'+
                        '    <td>'+
                        '        <input id="grid_'+ this.name +'_search_all" class="w2ui-search-all" '+
                        '            placeholder="'+ this.last.caption +'" value="'+ this.last.search +'"'+
                        '            onkeydown="if (event.keyCode == 13 && w2utils.isIE) this.onchange();"'+
                        '            onchange="'+
                        '                var val = this.value; '+
                        '                var fld = $(this).data(\'w2field\'); '+
                        '                var dat = $(this).data(\'selected\'); '+
                        '                if (fld) val = fld.clean(val);'+
                        '                if (dat != null && $.isPlainObject(dat)) val = dat.id;'+
                        '                w2ui[\''+ this.name +'\'].search(w2ui[\''+ this.name +'\'].last.field, val); '+
                        '            ">'+
                        '    </td>'+
                        '    <td>'+
                        '        <div title="'+ w2utils.lang('Clear Search') +'" class="w2ui-search-clear" id="grid_'+ this.name +'_searchClear"  '+
                        '             onclick="var obj = w2ui[\''+ this.name +'\']; obj.searchReset();" '+
                        '        >&nbsp;&nbsp;</div>'+
                        '    </td>'+
                        '</tr></table>'+
                        '</div>';
                    this.toolbar.items.push({ type: 'html', id: 'w2ui-search', html: html });
                    if (this.multiSearch && this.searches.length > 0) {
                        this.toolbar.items.push($.extend(true, {}, this.buttons['search-go']));
                    }
                }
                if (this.show.toolbarSearch && (this.show.toolbarAdd || this.show.toolbarEdit || this.show.toolbarDelete || this.show.toolbarSave)) {
                    this.toolbar.items.push({ type: 'break', id: 'w2ui-break1' });
                }
                if (this.show.toolbarAdd) {
                    this.toolbar.items.push($.extend(true, {}, this.buttons['add']));
                }
                if (this.show.toolbarEdit) {
                    this.toolbar.items.push($.extend(true, {}, this.buttons['edit']));
                }
                if (this.show.toolbarDelete) {
                    this.toolbar.items.push($.extend(true, {}, this.buttons['delete']));
                }
                if (this.show.toolbarSave) {
                    if (this.show.toolbarAdd || this.show.toolbarDelete || this.show.toolbarEdit) {
                        this.toolbar.items.push({ type: 'break', id: 'w2ui-break2' });
                    }
                    this.toolbar.items.push($.extend(true, {}, this.buttons['save']));
                }
                // add original buttons
                for (var i in tmp_items) this.toolbar.items.push(tmp_items[i]);

                // =============================================
                // ------ Toolbar onClick processing

                var obj = this;
                this.toolbar.on('click', function (event) {
                    var eventData = obj.trigger({ phase: 'before', type: 'toolbar', target: event.target, originalEvent: event });
                    if (eventData.isCancelled === true) return;
                    var id = event.target;
                    switch (id) {
                        case 'w2ui-reload':
                            var eventData2 = obj.trigger({ phase: 'before', type: 'reload', target: obj.name });
                            if (eventData2.isCancelled === true) return false;
                            obj.reload();
                            obj.trigger($.extend(eventData2, { phase: 'after' }));
                            break;
                        case 'w2ui-column-on-off':
                            obj.initColumnOnOff();
                            obj.initResize();
                            obj.resize();
                            break;
                        case 'w2ui-search-advanced':
                            var tb = this;
                            var it = this.get(id);
                            if (it.checked) {
                                obj.searchClose();
                                setTimeout(function () { tb.uncheck(id); }, 1);
                            } else {
                                obj.searchOpen();
                                event.originalEvent.stopPropagation();
                                function tmp_close() {
                                    if ($('#w2ui-overlay-searches-'+ obj.name).data('keepOpen') === true) return;
                                    tb.uncheck(id);
                                    $(document).off('click', 'body', tmp_close);
                                }
                                $(document).on('click', 'body', tmp_close);
                            }
                            break;
                        case 'w2ui-add':
                            // events
                            var eventData = obj.trigger({ phase: 'before', target: obj.name, type: 'add', recid: null });
                            obj.trigger($.extend(eventData, { phase: 'after' }));
                            break;
                        case 'w2ui-edit':
                            var sel     = obj.getSelection();
                            var recid     = null;
                            if (sel.length == 1) recid = sel[0];
                            // events
                            var eventData = obj.trigger({ phase: 'before', target: obj.name, type: 'edit', recid: recid });
                            obj.trigger($.extend(eventData, { phase: 'after' }));
                            break;
                        case 'w2ui-delete':
                            obj["delete"]();
                            break;
                        case 'w2ui-save':
                            obj.save();
                            break;
                    }
                    // no default action
                    obj.trigger($.extend(eventData, { phase: 'after' }));
                });
            }
            return;
        },

        initResize: function () {
            var obj = this;
            //if (obj.resizing === true) return;
            $(this.box).find('.w2ui-resizer')
                .off('click')
                .on('click', function (event) {
                    if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;
                    if (event.preventDefault) event.preventDefault();
                })
                .off('mousedown')
                .on('mousedown', function (event) {
                    if (!event) event = window.event;
                    if (!window.addEventListener) { window.document.attachEvent('onselectstart', function() { return false; } ); }
                    obj.resizing = true;
                    obj.last.tmp = {
                        x   : event.screenX,
                        y   : event.screenY,
                        gx  : event.screenX,
                        gy  : event.screenY,
                        col : parseInt($(this).attr('name'))
                    };
                    if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;
                    if (event.preventDefault) event.preventDefault();
                    // fix sizes
                    for (var c in obj.columns) {
                        if (obj.columns[c].hidden) continue;
                        if (typeof obj.columns[c].sizeOriginal == 'undefined') obj.columns[c].sizeOriginal = obj.columns[c].size;
                        obj.columns[c].size = obj.columns[c].sizeCalculated;
                    }
                    var eventData = { phase: 'before', type: 'columnResize', target: obj.name, column: obj.last.tmp.col, field: obj.columns[obj.last.tmp.col].field };
                    eventData = obj.trigger($.extend(eventData, { resizeBy: 0, originalEvent: event }));
                    // set move event
                    var mouseMove = function (event) {
                        if (obj.resizing != true) return;
                        if (!event) event = window.event;
                        // event before
                        eventData = obj.trigger($.extend(eventData, { resizeBy: (event.screenX - obj.last.tmp.gx), originalEvent: event }));
                        if (eventData.isCancelled === true) { eventData.isCancelled = false; return; }
                        // default action
                        obj.last.tmp.x = (event.screenX - obj.last.tmp.x);
                        obj.last.tmp.y = (event.screenY - obj.last.tmp.y);
                        obj.columns[obj.last.tmp.col].size = (parseInt(obj.columns[obj.last.tmp.col].size) + obj.last.tmp.x) + 'px';
                        obj.resizeRecords();
                        // reset
                        obj.last.tmp.x = event.screenX;
                        obj.last.tmp.y = event.screenY;
                    }
                    var mouseUp = function (event) {
                        delete obj.resizing;
                        $(document).off('mousemove', 'body');
                        $(document).off('mouseup', 'body');
                        obj.resizeRecords();
                        // event before
                        obj.trigger($.extend(eventData, { phase: 'after', originalEvent: event }));
                    }
                    $(document).on('mousemove', 'body', mouseMove);
                    $(document).on('mouseup', 'body', mouseUp);
                })
                .each(function (index, el) {
                    var td  = $(el).parent();
                    $(el).css({
                        "height"         : '25px',
                        "margin-left"     : (td.width() - 3) + 'px'
                    })
                });
        },

        resizeBoxes: function () {
            // elements
            var main     = $(this.box).find('> div');
            var header   = $('#grid_'+ this.name +'_header');
            var toolbar  = $('#grid_'+ this.name +'_toolbar');
            var summary  = $('#grid_'+ this.name +'_summary');
            var footer   = $('#grid_'+ this.name +'_footer');
            var body     = $('#grid_'+ this.name +'_body');
            var columns  = $('#grid_'+ this.name +'_columns');
            var records  = $('#grid_'+ this.name +'_records');

            if (this.show.header) {
                header.css({
                    top:   '0px',
                    left:  '0px',
                    right: '0px'
                });
            }

            if (this.show.toolbar) {
                toolbar.css({
                    top:   ( 0 + (this.show.header ? w2utils.getSize(header, 'height') : 0) ) + 'px',
                    left:  '0px',
                    right: '0px'
                });
            }
            if (this.show.footer) {
                footer.css({
                    bottom: '0px',
                    left:  '0px',
                    right: '0px'
                });
            }
            if (this.summary.length > 0) {
                summary.css({
                    bottom: ( 0 + (this.show.footer ? w2utils.getSize(footer, 'height') : 0) ) + 'px',
                    left:  '0px',
                    right: '0px'
                });
            }
            body.css({
                top: ( 0 + (this.show.header ? w2utils.getSize(header, 'height') : 0) + (this.show.toolbar ? w2utils.getSize(toolbar, 'height') : 0) ) + 'px',
                bottom: ( 0 + (this.show.footer ? w2utils.getSize(footer, 'height') : 0) + (this.summary.length > 0 ? w2utils.getSize(summary, 'height') : 0) ) + 'px',
                left:   '0px',
                right:  '0px'
            });
        },

        resizeRecords: function () {
            var obj = this;
            // remove empty records
            $(this.box).find('.w2ui-empty-record').remove();
            // -- Calculate Column size in PX
            var box     = $(this.box);
            var grid    = $(this.box).find('> div');
            var header  = $('#grid_'+ this.name +'_header');
            var toolbar = $('#grid_'+ this.name +'_toolbar');
            var summary = $('#grid_'+ this.name +'_summary');
            var footer  = $('#grid_'+ this.name +'_footer');
            var body    = $('#grid_'+ this.name +'_body');
            var columns = $('#grid_'+ this.name +'_columns');
            var records = $('#grid_'+ this.name +'_records');

            // body might be expanded by data
            if (!this.fixedBody) {
                // allow it to render records, then resize
                var calculatedHeight = w2utils.getSize(columns, 'height')
                    + w2utils.getSize($('#grid_'+ obj.name +'_records table'), 'height');
                obj.height = calculatedHeight
                    + w2utils.getSize(grid, '+height')
                    + (obj.show.header ? w2utils.getSize(header, 'height') : 0)
                    + (obj.show.toolbar ? w2utils.getSize(toolbar, 'height') : 0)
                    + (summary.css('display') != 'none' ? w2utils.getSize(summary, 'height') : 0)
                    + (obj.show.footer ? w2utils.getSize(footer, 'height') : 0);
                grid.css('height', obj.height);
                body.css('height', calculatedHeight);
                box.css('height', w2utils.getSize(grid, 'height') + w2utils.getSize(box, '+height'));
            } else {
                // fixed body height
                var calculatedHeight =  grid.height()
                    - (this.show.header ? w2utils.getSize(header, 'height') : 0)
                    - (this.show.toolbar ? w2utils.getSize(toolbar, 'height') : 0)
                    - (summary.css('display') != 'none' ? w2utils.getSize(summary, 'height') : 0)
                    - (this.show.footer ? w2utils.getSize(footer, 'height') : 0);
                body.css('height', calculatedHeight);
            }

            var buffered = this.records.length;
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            if (this.searchData.length != 0 && !url) buffered = this.last.searchIds.length;
            // check overflow
            var bodyOverflowX = false;
            var bodyOverflowY = false;
            if (body.width() < $(records).find('>table').width()) bodyOverflowX = true;
            if (body.height() - columns.height() < $(records).find('>table').height() + (bodyOverflowX ? w2utils.scrollBarSize() : 0)) bodyOverflowY = true;
            if (!this.fixedBody) { bodyOverflowY = false; }
            if (bodyOverflowX || bodyOverflowY) {
                columns.find('> table > tbody > tr:nth-child(1) td.w2ui-head-last').css('width', w2utils.scrollBarSize()).show();
                records.css({
                    top: ((this.columnGroups.length > 0 && this.show.columns ? 1 : 0) + w2utils.getSize(columns, 'height')) +'px',
                    "-webkit-overflow-scrolling": "touch",
                    "overflow-x": (bodyOverflowX ? 'auto' : 'hidden'),
                    "overflow-y": (bodyOverflowY ? 'auto' : 'hidden') });
            } else {
                columns.find('> table > tbody > tr:nth-child(1) td.w2ui-head-last').hide();
                records.css({
                    top: ((this.columnGroups.length > 0 && this.show.columns ? 1 : 0) + w2utils.getSize(columns, 'height')) +'px',
                    overflow: 'hidden'
                });
                if (records.length > 0) { this.last.scrollTop  = 0; this.last.scrollLeft = 0; } // if no scrollbars, always show top
            }
            if (this.show.emptyRecords && !bodyOverflowY) {
                var max = Math.floor(records.height() / this.recordHeight) + 1;
                if (this.fixedBody) {
                    for (var di = buffered; di <= max; di++) {
                        var html  = '';
                        html += '<tr class="'+ (di % 2 ? 'w2ui-even' : 'w2ui-odd') + ' w2ui-empty-record" style="height: '+ this.recordHeight +'px">';
                        if (this.show.lineNumbers)  html += '<td class="w2ui-col-number"></td>';
                        if (this.show.selectColumn) html += '<td class="w2ui-grid-data w2ui-col-select"></td>';
                        if (this.show.expandColumn) html += '<td class="w2ui-grid-data w2ui-col-expand"></td>';
                        var j = 0;
                        while (true && this.columns.length > 0) {
                            var col = this.columns[j];
                            if (col.hidden) { j++; if (typeof this.columns[j] == 'undefined') break; else continue; }
                            html += '<td class="w2ui-grid-data" '+ (typeof col.attr != 'undefined' ? col.attr : '') +' col="'+ j +'"></td>';
                            j++;
                            if (typeof this.columns[j] == 'undefined') break;
                        }
                        html += '<td class="w2ui-grid-data-last"></td>';
                        html += '</tr>';
                        $('#grid_'+ this.name +'_records > table').append(html);
                    }
                }
            }
            if (body.length > 0) {
                var width_max = parseInt(body.width())
                    - (bodyOverflowY ? w2utils.scrollBarSize() : 0)
                    - (this.show.lineNumbers ? 34 : 0)
                    - (this.show.selectColumn ? 26 : 0)
                    - (this.show.expandColumn ? 26 : 0);
                var width_box = width_max;
                var percent = 0;
                // gridMinWidth processiong
                var restart = false;
                for (var i = 0; i < this.columns.length; i++) {
                    var col = this.columns[i];
                    if (col.gridMinWidth > 0) {
                        if (col.gridMinWidth > width_box && col.hidden !== true) {
                            col.hidden = true;
                            restart = true;
                        }
                        if (col.gridMinWidth < width_box && col.hidden === true) {
                            col.hidden = false;
                            restart = true;
                        }
                    }
                }
                if (restart === true) {
                    this.refresh();
                    return;
                }
                // assign PX column s
                for (var i = 0; i < this.columns.length; i++) {
                    var col = this.columns[i];
                    if (col.hidden) continue;
                    if (String(col.size).substr(String(col.size).length-2).toLowerCase() == 'px') {
                        width_max -= parseFloat(col.size);
                        this.columns[i].sizeCalculated = col.size;
                        this.columns[i].sizeType = 'px';
                    } else {
                        percent += parseFloat(col.size);
                        this.columns[i].sizeType = '%';
                        delete col.sizeCorrected;
                    }
                }
                // if sum != 100% -- reassign proportionally
                if (percent != 100 && percent > 0) {
                    for (var i = 0; i < this.columns.length; i++) {
                        var col = this.columns[i];
                        if (col.hidden) continue;
                        if (col.sizeType == '%') {
                            col.sizeCorrected = Math.round(parseFloat(col.size) * 100 * 100 / percent) / 100 + '%';
                        }
                    }
                }
                // calculate % columns
                for (var i = 0; i < this.columns.length; i++) {
                    var col = this.columns[i];
                    if (col.hidden) continue;
                    if (col.sizeType == '%') {
                        if (typeof this.columns[i].sizeCorrected != 'undefined') {
                            // make it 1px smaller, so margin of error can be calculated correctly
                            this.columns[i].sizeCalculated = Math.floor(width_max * parseFloat(col.sizeCorrected) / 100) - 1 + 'px';
                        } else {
                            // make it 1px smaller, so margin of error can be calculated correctly
                            this.columns[i].sizeCalculated = Math.floor(width_max * parseFloat(col.size) / 100) - 1 + 'px';
                        }
                    }
                }
            }
            // fix margin of error that is due percentage calculations
            var width_cols = 0;
            for (var i = 0; i < this.columns.length; i++) {
                var col = this.columns[i];
                if (col.hidden) continue;
                if (typeof col.min == 'undefined') col.min = 20;
                if (parseInt(col.sizeCalculated) < parseInt(col.min)) col.sizeCalculated = col.min + 'px';
                if (parseInt(col.sizeCalculated) > parseInt(col.max)) col.sizeCalculated = col.max + 'px';
                width_cols += parseInt(col.sizeCalculated);
            }
            var width_diff = parseInt(width_box) - parseInt(width_cols);
            if (width_diff > 0 && percent > 0) {
                var i = 0;
                while (true) {
                    var col = this.columns[i];
                    if (typeof col == 'undefined') { i = 0; continue; }
                    if (col.hidden || col.sizeType == 'px') { i++; continue; }
                    col.sizeCalculated = (parseInt(col.sizeCalculated) + 1) + 'px';
                    width_diff--;
                    if (width_diff == 0) break;
                    i++;
                }
            } else if (width_diff > 0) {
                columns.find('> table > tbody > tr:nth-child(1) td.w2ui-head-last').css('width', w2utils.scrollBarSize()).show();
            }
            // resize columns
            columns.find('> table > tbody > tr:nth-child(1) td').each(function (index, el) {
                var ind = $(el).attr('col');
                if (typeof ind != 'undefined' && obj.columns[ind]) $(el).css('width', obj.columns[ind].sizeCalculated);
                // last column
                if ($(el).hasClass('w2ui-head-last')) {
                    $(el).css('width', w2utils.scrollBarSize() + (width_diff > 0 && percent == 0 ? width_diff : 0) + 'px');
                }
            });
            // if there are column groups - hide first row (needed for sizing)
            if (columns.find('> table > tbody > tr').length == 3) {
                columns.find('> table > tbody > tr:nth-child(1) td').html('').css({
                    'height' : '0px',
                    'border' : '0px',
                    'padding': '0px',
                    'margin' : '0px'
                });
            }
            // resize records
            records.find('> table > tbody > tr:nth-child(1) td').each(function (index, el) {
                var ind = $(el).attr('col');
                if (typeof ind != 'undefined' && obj.columns[ind]) $(el).css('width', obj.columns[ind].sizeCalculated);
                // last column
                if ($(el).hasClass('w2ui-grid-data-last')) {
                    $(el).css('width', (width_diff > 0 && percent == 0 ? width_diff : 0) + 'px');
                }
            });
            // resize summary
            summary.find('> table > tbody > tr:nth-child(1) td').each(function (index, el) {
                var ind = $(el).attr('col');
                if (typeof ind != 'undefined' && obj.columns[ind]) $(el).css('width', obj.columns[ind].sizeCalculated);
                // last column
                if ($(el).hasClass('w2ui-grid-data-last')) {
                    $(el).css('width', w2utils.scrollBarSize() + (width_diff > 0 && percent == 0 ? width_diff : 0) + 'px');
                }
            });
            this.initResize();
            this.refreshRanges();
            // apply last scroll if any
            if ((this.last.scrollTop || this.last.scrollLeft) && records.length > 0) {
                columns.prop('scrollLeft', this.last.scrollLeft);
                records.prop('scrollTop',  this.last.scrollTop);
                records.prop('scrollLeft', this.last.scrollLeft);
            }
        },

        getSearchesHTML: function () {
            var html = '<table cellspacing="0">';
            var showBtn = false;
            for (var i = 0; i < this.searches.length; i++) {
                var s = this.searches[i];
                s.type = String(s.type).toLowerCase();
                if (s.hidden) continue;
                var btn = '';
                if (showBtn == false) {
                    btn = '<button class="w2ui-btn close-btn" onclick="obj = w2ui[\''+ this.name +'\']; if (obj) { obj.searchClose(); }">X</button';
                    showBtn = true;
                }
                if (typeof s.inTag   == 'undefined') s.inTag     = '';
                if (typeof s.outTag  == 'undefined') s.outTag     = '';
                if (typeof s.type    == 'undefined') s.type     = 'text';
                if (['text', 'alphanumeric', 'combo'].indexOf(s.type) != -1) {
                    var operator =  '<select id="grid_'+ this.name +'_operator_'+ i +'" onclick="event.stopPropagation();">'+
                        '    <option value="is">'+ w2utils.lang('is') +'</option>'+
                        '    <option value="begins">'+ w2utils.lang('begins') +'</option>'+
                        '    <option value="contains">'+ w2utils.lang('contains') +'</option>'+
                        '    <option value="ends">'+ w2utils.lang('ends') +'</option>'+
                        '</select>';
                }
                if (['int', 'float', 'money', 'currency', 'percent', 'date', 'time'].indexOf(s.type) != -1) {
                    var operator =  '<select id="grid_'+ this.name +'_operator_'+ i +'" '+
                        '        onchange="w2ui[\''+ this.name + '\'].initOperator(this, '+ i +');" onclick="event.stopPropagation();">'+
                        '    <option value="is">'+ w2utils.lang('is') +'</option>'+
                        (['int'].indexOf(s.type) != -1 ? '<option value="in">'+ w2utils.lang('in') +'</option>' : '') +
                        (['int'].indexOf(s.type) != -1 ? '<option value="not in">'+ w2utils.lang('not in') +'</option>' : '') +
                        '<option value="between">'+ w2utils.lang('between') +'</option>'+
                        '</select>';
                }
                if (['select', 'list', 'hex'].indexOf(s.type) != -1) {
                    var operator =  '<select id="grid_'+ this.name +'_operator_'+ i +'" onclick="event.stopPropagation();">'+
                        '    <option value="is">'+ w2utils.lang('is') +'</option>'+
                        '</select>';
                }
                if (['enum'].indexOf(s.type) != -1) {
                    var operator =  '<select id="grid_'+ this.name +'_operator_'+ i +'" onclick="event.stopPropagation();">'+
                        '    <option value="in">'+ w2utils.lang('in') +'</option>'+
                        '    <option value="not in">'+ w2utils.lang('not in') +'</option>'+
                        '</select>';
                }
                html += '<tr>'+
                        '    <td class="close-btn">'+ btn +'</td>' +
                        '    <td class="caption">'+ s.caption +'</td>' +
                        '    <td class="operator">'+ operator +'</td>'+
                        '    <td class="value">';

                switch (s.type) {
                    case 'text':
                    case 'alphanumeric':
                    case 'hex':
                    case 'list':
                    case 'combo':
                    case 'enum':
                        html += '<input rel="search" type="text" style="width: 300px;" id="grid_'+ this.name +'_field_'+ i +'" name="'+ s.field +'" '+ s.inTag +'>';
                        break;

                    case 'int':
                    case 'float':
                    case 'money':
                    case 'currency':
                    case 'percent':
                    case 'date':
                    case 'time':
                        html += '<input rel="search" type="text" size="12" id="grid_'+ this.name +'_field_'+ i +'" name="'+ s.field +'" '+ s.inTag +'>'+
                                '<span id="grid_'+ this.name +'_range_'+ i +'" style="display: none">'+
                                '&nbsp;-&nbsp;&nbsp;<input rel="search" type="text" style="width: 90px" id="grid_'+ this.name +'_field2_'+i+'" name="'+ s.field +'" '+ s.inTag +'>'+
                                '</span>';
                        break;

                    case 'select':
                        html += '<select rel="search" id="grid_'+ this.name +'_field_'+ i +'" name="'+ s.field +'" '+ s.inTag +'  onclick="event.stopPropagation();"></select>';
                        break;

                }
                html += s.outTag +
                        '    </td>' +
                        '</tr>';
            }
            html += '<tr>'+
                    '    <td colspan="4" class="actions">'+
                    '        <div>'+
                    '        <button class="w2ui-btn" onclick="obj = w2ui[\''+ this.name +'\']; if (obj) { obj.searchReset(); }">'+ w2utils.lang('Reset') + '</button>'+
                    '        <button class="w2ui-btn w2ui-btn-blue" onclick="obj = w2ui[\''+ this.name +'\']; if (obj) { obj.search(); }">'+ w2utils.lang('Search') + '</button>'+
                    '        </div>'+
                    '    </td>'+
                    '</tr></table>';
            return html;
        },

        initOperator: function (el, search_ind) {
            var obj     = this;
            var search  = obj.searches[search_ind];
            var range   = $('#grid_'+ obj.name + '_range_'+ search_ind);
            var fld1    = $('#grid_'+ obj.name +'_field_'+ search_ind);
            var fld2    = fld1.parent().find('span input');
            if ($(el).val() == 'in' || $(el).val() == 'not in') { fld1.w2field('clear'); } else { fld1.w2field(search.type); }
            if ($(el).val() == 'between') { range.show(); fld2.w2field(search.type); } else { range.hide(); }
        },

        initSearches: function () {
            var obj = this;
            // init searches
            for (var s in this.searches) {
                var search = this.searches[s];
                var sdata  = this.getSearchData(search.field);
                search.type = String(search.type).toLowerCase();
                if (typeof search.options != 'object') search.options = {};
                // init types
                switch (search.type) {
                    case 'text':
                    case 'alphanumeric':
                        $('#grid_'+ this.name +'_operator_'+s).val('begins');
                        if (['alphanumeric', 'hex'].indexOf(search.type) != -1) {
                            $('#grid_'+ this.name +'_field_' + s).w2field(search.type, search.options);
                        }
                        break;

                    case 'int':
                    case 'float':
                    case 'money':
                    case 'currency':
                    case 'percent':
                    case 'date':
                    case 'time':
                        if (sdata && sdata.type == 'int' && ['in', 'not in'].indexOf(sdata.operator) != -1) break;
                        $('#grid_'+ this.name +'_field_'+s).w2field(search.type, search.options);
                        $('#grid_'+ this.name +'_field2_'+s).w2field(search.type, search.options);
                        setTimeout(function () { // convert to date if it is number
                            $('#grid_'+ obj.name +'_field_'+s).keydown();
                            $('#grid_'+ obj.name +'_field2_'+s).keydown();
                        }, 1);
                        break;

                    case 'hex':
                        break;

                    case 'list':
                    case 'combo':
                    case 'enum':
                        var options = search.options;
                        if (search.type == 'list') options.selected = {};
                        if (search.type == 'enum') options.selected = [];
                        if (sdata) options.selected = sdata.value;
                        $('#grid_'+ this.name +'_field_'+s).w2field(search.type, options);
                        if (search.type == 'combo') {
                            $('#grid_'+ this.name +'_operator_'+s).val('begins');
                        }
                        break;

                    case 'select':
                        // build options
                        var options = '<option value="">--</option>';
                        for (var i in search.options.items) {
                            var si = search.options.items[i];
                            if ($.isPlainObject(search.options.items[i])) {
                                var val = si.id;
                                var txt = si.text;
                                if (typeof val == 'undefined' && typeof si.value != 'undefined')   val = si.value;
                                if (typeof txt == 'undefined' && typeof si.caption != 'undefined') txt = si.caption;
                                if (val == null) val = '';
                                options += '<option value="'+ val +'">'+ txt +'</option>';
                            } else {
                                options += '<option value="'+ si +'">'+ si +'</option>';
                            }
                        }
                        $('#grid_'+ this.name +'_field_'+s).html(options);
                        break;
                }
                if (sdata != null) {
                    if (sdata.type == 'int' && ['in', 'not in'].indexOf(sdata.operator) != -1) {
                        $('#grid_'+ this.name +'_field_'+ s).w2field('clear').val(sdata.value);
                    }
                    $('#grid_'+ this.name +'_operator_'+ s).val(sdata.operator).trigger('change');
                    if (!$.isArray(sdata.value)) {
                        if (typeof sdata.value != 'udefined') $('#grid_'+ this.name +'_field_'+ s).val(sdata.value).trigger('change');
                    } else {
                        if (['in', 'not in'].indexOf(sdata.operator) != -1) {
                            $('#grid_'+ this.name +'_field_'+ s).val(sdata.value).trigger('change');
                        } else {
                            $('#grid_'+ this.name +'_field_'+ s).val(sdata.value[0]).trigger('change');
                            $('#grid_'+ this.name +'_field2_'+ s).val(sdata.value[1]).trigger('change');
                        }
                    }
                }
            }
            // add on change event
            $('#w2ui-overlay-searches-'+ this.name +' .w2ui-grid-searches *[rel=search]').on('keypress', function (evnt) {
                if (evnt.keyCode == 13) {
                    obj.search();
                    $().w2overlay();
                }
            });
        },

        getColumnsHTML: function () {
            var obj  = this;
            var html = '';
            if (this.show.columnHeaders) {
                if (this.columnGroups.length > 0) {
                    html = getColumns(true) + getGroups() + getColumns(false);
                } else {
                    html = getColumns(true);
                }
            }
            return html;

            function getGroups () {
                var html = '<tr>';
                // add empty group at the end
                if (obj.columnGroups[obj.columnGroups.length-1].caption != '') obj.columnGroups.push({ caption: '' });

                if (obj.show.lineNumbers) {
                    html += '<td class="w2ui-head w2ui-col-number">'+
                            '    <div>&nbsp;</div>'+
                            '</td>';
                }
                if (obj.show.selectColumn) {
                    html += '<td class="w2ui-head w2ui-col-select">'+
                            '    <div>&nbsp;</div>'+
                            '</td>';
                }
                if (obj.show.expandColumn) {
                    html += '<td class="w2ui-head w2ui-col-expand">'+
                            '    <div>&nbsp;</div>'+
                            '</td>';
                }
                var ii = 0;
                for (var i=0; i<obj.columnGroups.length; i++) {
                    var colg = obj.columnGroups[i];
                    var col  = obj.columns[ii];
                    if (typeof colg.span == 'undefined' || colg.span != parseInt(colg.span)) colg.span = 1;
                    if (typeof colg.colspan != 'undefined') colg.span = colg.colspan;
                    if (colg.master === true) {
                        var sortStyle = '';
                        for (var si in obj.sortData) {
                            if (obj.sortData[si].field == col.field) {
                                if (RegExp('asc', 'i').test(obj.sortData[si].direction))  sortStyle = 'w2ui-sort-up';
                                if (RegExp('desc', 'i').test(obj.sortData[si].direction)) sortStyle = 'w2ui-sort-down';
                            }
                        }
                        var resizer = "";
                        if (col.resizable !== false) {
                            resizer = '<div class="w2ui-resizer" name="'+ ii +'"></div>';
                        }
                        html += '<td class="w2ui-head '+ sortStyle +'" col="'+ ii + '" rowspan="2" colspan="'+ (colg.span + (i == obj.columnGroups.length-1 ? 1 : 0) ) +'" '+
                                '    onclick="w2ui[\''+ obj.name +'\'].columnClick(\''+ col.field +'\', event);">'+
                                    resizer +
                                '    <div class="w2ui-col-group w2ui-col-header '+ (sortStyle ? 'w2ui-col-sorted' : '') +'">'+
                                '        <div class="'+ sortStyle +'"></div>'+
                                        (!col.caption ? '&nbsp;' : col.caption) +
                                '    </div>'+
                                '</td>';
                    } else {
                        html += '<td class="w2ui-head" col="'+ ii + '" '+
                                '        colspan="'+ (colg.span + (i == obj.columnGroups.length-1 ? 1 : 0) ) +'">'+
                                '    <div class="w2ui-col-group">'+
                                    (!colg.caption ? '&nbsp;' : colg.caption) +
                                '    </div>'+
                                '</td>';
                    }
                    ii += colg.span;
                }
                html += '</tr>';
                return html;
            }

            function getColumns (master) {
                var html = '<tr>',
                    reorderCols = (obj.reorderColumns && (!obj.columnGroups || !obj.columnGroups.length)) ? ' w2ui-reorder-cols-head ' : '';
                if (obj.show.lineNumbers) {
                    html += '<td class="w2ui-head w2ui-col-number" onclick="w2ui[\''+ obj.name +'\'].columnClick(\'line-number\', event);">'+
                            '    <div>#</div>'+
                            '</td>';
                }
                if (obj.show.selectColumn) {
                    html += '<td class="w2ui-head w2ui-col-select" '+
                            '        onclick="if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;">'+
                            '    <div>'+
                            '        <input type="checkbox" id="grid_'+ obj.name +'_check_all" tabIndex="-1"'+
                            '            style="' + (obj.multiSelect == false ? 'display: none;' : '') + '"'+
                            '            onclick="if (this.checked) w2ui[\''+ obj.name +'\'].selectAll(); '+
                            '                     else w2ui[\''+ obj.name +'\'].selectNone(); '+
                            '                     if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true; '+
                            '                     this.blur();">'+
                            '    </div>'+
                            '</td>';
                }
                if (obj.show.expandColumn) {
                    html += '<td class="w2ui-head w2ui-col-expand">'+
                            '    <div>&nbsp;</div>'+
                            '</td>';
                }
                var ii = 0;
                var id = 0;
                for (var i=0; i<obj.columns.length; i++) {
                    var col  = obj.columns[i];
                    var colg = {};
                    if (i == id) {
                        id = id + (typeof obj.columnGroups[ii] != 'undefined' ? parseInt(obj.columnGroups[ii].span) : 0);
                        ii++;
                    }
                    if (typeof obj.columnGroups[ii-1] != 'undefined') var colg = obj.columnGroups[ii-1];
                    if (col.hidden) continue;
                    var sortStyle = '';
                    for (var si in obj.sortData) {
                        if (obj.sortData[si].field == col.field) {
                            if (RegExp('asc', 'i').test(obj.sortData[si].direction))  sortStyle = 'w2ui-sort-up';
                            if (RegExp('desc', 'i').test(obj.sortData[si].direction)) sortStyle = 'w2ui-sort-down';
                        }
                    }
                    if (colg['master'] !== true || master) { // grouping of columns
                        var resizer = "";
                        if (col.resizable !== false) {
                            resizer = '<div class="w2ui-resizer" name="'+ i +'"></div>';
                        }
                        html += '<td col="'+ i +'" class="w2ui-head '+ sortStyle + reorderCols + '" ' +
                                '    onclick="w2ui[\''+ obj.name +'\'].columnClick(\''+ col.field +'\', event);">'+
                                    resizer +
                                '    <div class="w2ui-col-header '+ (sortStyle ? 'w2ui-col-sorted' : '') +'">'+
                                '        <div class="'+ sortStyle +'"></div>'+
                                        (!col.caption ? '&nbsp;' : col.caption) +
                                '    </div>'+
                                '</td>';
                    }
                }
                html += '<td class="w2ui-head w2ui-head-last"><div>&nbsp;</div></td>';
                html += '</tr>';
                return html;
            }
        },

        getRecordsHTML: function () {
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            var buffered = this.records.length;
            if (this.searchData.length != 0 && !url) buffered = this.last.searchIds.length;
            // larget number works better with chrome, smaller with FF.
            if (buffered > 300) this.show_extra = 30; else this.show_extra = 300;
            var records  = $('#grid_'+ this.name +'_records');
            var limit    = Math.floor(records.height() / this.recordHeight) + this.show_extra + 1;
            if (!this.fixedBody || limit > buffered) limit = buffered;
            // always need first record for resizing purposes
            var html = '<table>' + this.getRecordHTML(-1, 0);
            // first empty row with height
            html += '<tr id="grid_'+ this.name + '_rec_top" line="top" style="height: '+ 0 +'px">'+
                    '    <td colspan="200"></td>'+
                    '</tr>';
            for (var i = 0; i < limit; i++) {
                html += this.getRecordHTML(i, i+1);
            }
            html += '<tr id="grid_'+ this.name + '_rec_bottom" line="bottom" style="height: '+ ((buffered - limit) * this.recordHeight) +'px">'+
                    '    <td colspan="200"></td>'+
                    '</tr>'+
                    '<tr id="grid_'+ this.name +'_rec_more" style="display: none">'+
                    '    <td colspan="200" class="w2ui-load-more"></td>'+
                    '</tr>'+
                    '</table>';
            this.last.range_start = 0;
            this.last.range_end   = limit;
            return html;
        },

        getSummaryHTML: function () {
            if (this.summary.length == 0) return;
            var html = '<table>';
            for (var i = 0; i < this.summary.length; i++) {
                html += this.getRecordHTML(i, i+1, true);
            }
            html += '</table>';
            return html;
        },

        scroll: function (event) {
            var time = (new Date()).getTime();
            var obj  = this;
            var url  = (typeof this.url != 'object' ? this.url : this.url.get);
            var records  = $('#grid_'+ this.name +'_records');
            var buffered = this.records.length;
            if (this.searchData.length != 0 && !url) buffered = this.last.searchIds.length;
            if (buffered == 0 || records.length == 0 || records.height() == 0) return;
            if (buffered > 300) this.show_extra = 30; else this.show_extra = 300;
            // need this to enable scrolling when this.limit < then a screen can fit
            if (records.height() < buffered * this.recordHeight && records.css('overflow-y') == 'hidden') {
                if (this.total > 0) this.refresh();
                return;
            }
            // update footer
            var t1 = Math.round(records[0].scrollTop / this.recordHeight + 1);
            var t2 = t1 + (Math.round(records.height() / this.recordHeight) - 1);
            if (t1 > buffered) t1 = buffered;
            if (t2 > buffered) t2 = buffered;
            $('#grid_'+ this.name + '_footer .w2ui-footer-right').html(w2utils.formatNumber(this.offset + t1) + '-' + w2utils.formatNumber(this.offset + t2) + ' ' + w2utils.lang('of') + ' ' +    w2utils.formatNumber(this.total) +
                    (url ? ' ('+ w2utils.lang('buffered') + ' '+ w2utils.formatNumber(buffered) + (this.offset > 0 ? ', skip ' + w2utils.formatNumber(this.offset) : '') + ')' : '')
            );
            // only for local data source, else no extra records loaded
            if (!url && (!this.fixedBody || this.total <= 300)) return;
            // regular processing
            var start     = Math.floor(records[0].scrollTop / this.recordHeight) - this.show_extra;
            var end        = start + Math.floor(records.height() / this.recordHeight) + this.show_extra * 2 + 1;
            // var div     = start - this.last.range_start;
            if (start < 1) start = 1;
            if (end > this.total) end = this.total;
            var tr1 = records.find('#grid_'+ this.name +'_rec_top');
            var tr2 = records.find('#grid_'+ this.name +'_rec_bottom');
            // if row is expanded
            if (String(tr1.next().prop('id')).indexOf('_expanded_row') != -1) tr1.next().remove();
            if (this.total > end && String(tr2.prev().prop('id')).indexOf('_expanded_row') != -1) tr2.prev().remove();
            var first = parseInt(tr1.next().attr('line'));
            var last  = parseInt(tr2.prev().attr('line'));
            //$('#log').html('buffer: '+ this.buffered +' start-end: ' + start + '-'+ end + ' ===> first-last: ' + first + '-' + last);
            if (first < start || first == 1 || this.last.pull_refresh) { // scroll down
                // console.log('end', end, 'last', last, 'show_extre', this.show_extra, this.last.pull_refresh);
                if (end <= last + this.show_extra - 2 && end != this.total) return;
                this.last.pull_refresh = false;
                // remove from top
                while (true) {
                    var tmp = records.find('#grid_'+ this.name +'_rec_top').next();
                    if (tmp.attr('line') == 'bottom') break;
                    if (parseInt(tmp.attr('line')) < start) tmp.remove(); else break;
                }
                // add at bottom
                var tmp = records.find('#grid_'+ this.name +'_rec_bottom').prev();
                var rec_start = tmp.attr('line');
                if (rec_start == 'top') rec_start = start;
                for (var i = parseInt(rec_start) + 1; i <= end; i++) {
                    if (!this.records[i-1]) continue;
                    if (this.records[i-1].expanded === true) this.records[i-1].expanded = false;
                    tr2.before(this.getRecordHTML(i-1, i));
                }
                markSearch();
                setTimeout(function() { obj.refreshRanges(); }, 0);
            } else { // scroll up
                if (start >= first - this.show_extra + 2 && start > 1) return;
                // remove from bottom
                while (true) {
                    var tmp = records.find('#grid_'+ this.name +'_rec_bottom').prev();
                    if (tmp.attr('line') == 'top') break;
                    if (parseInt(tmp.attr('line')) > end) tmp.remove(); else break;
                }
                // add at top
                var tmp = records.find('#grid_'+ this.name +'_rec_top').next();
                var rec_start = tmp.attr('line');
                if (rec_start == 'bottom') rec_start = end;
                for (var i = parseInt(rec_start) - 1; i >= start; i--) {
                    if (!this.records[i-1]) continue;
                    if (this.records[i-1].expanded === true) this.records[i-1].expanded = false;
                    tr1.after(this.getRecordHTML(i-1, i));
                }
                markSearch();
                setTimeout(function() { obj.refreshRanges(); }, 0);
            }
            // first/last row size
            var h1 = (start - 1) * obj.recordHeight;
            var h2 = (buffered - end) * obj.recordHeight;
            if (h2 < 0) h2 = 0;
            tr1.css('height', h1 + 'px');
            tr2.css('height', h2 + 'px');
            obj.last.range_start = start;
            obj.last.range_end   = end;
            // load more if needed
            var s = Math.floor(records[0].scrollTop / this.recordHeight);
            var e = s + Math.floor(records.height() / this.recordHeight);
            if (e + 10 > buffered && this.last.pull_more !== true && buffered < this.total - this.offset) {
                if (this.autoLoad === true) {
                    this.last.pull_more = true;
                    this.last.xhr_offset += this.limit;
                    this.request('get-records');
                } else {
                    var more = $('#grid_'+ this.name +'_rec_more');
                    if (more.css('display') == 'none') {
                        more.show()
                            .on('click', function () {
                                obj.last.pull_more = true;
                                obj.last.xhr_offset += obj.limit;
                                obj.request('get-records');
                                // show spinner the last
                                $(this).find('td').html('<div><div style="width: 20px; height: 20px;" class="w2ui-spinner"></div></div>');
                            });
                    }
                    if (more.find('td').text().indexOf('Load') == -1) {
                        more.find('td').html('<div>'+ w2utils.lang('Load') + ' ' + obj.limit + ' ' + w2utils.lang('More') + '...</div>');
                    }
                }
            }
            // check for grid end
            if (buffered >= this.total - this.offset) $('#grid_'+ this.name +'_rec_more').hide();
            return;

            function markSearch() {
                // mark search
                if(obj.markSearch === false) return;
                clearTimeout(obj.last.marker_timer);
                obj.last.marker_timer = setTimeout(function () {
                    // mark all search strings
                    var str = [];
                    for (var s in obj.searchData) {
                        var tmp = obj.searchData[s];
                        if ($.inArray(tmp.value, str) == -1) str.push(tmp.value);
                    }
                    if (str.length > 0) $(obj.box).find('.w2ui-grid-data > div').w2marker(str);
                }, 50);
            }
        },

        getRecordHTML: function (ind, lineNum, summary) {
            var rec_html = '';
            var sel = this.last.selection;
            var record;
            // first record needs for resize purposes
            if (ind == -1) {
                rec_html += '<tr line="0">';
                if (this.show.lineNumbers)  rec_html += '<td class="w2ui-col-number" style="height: 0px;"></td>';
                if (this.show.selectColumn) rec_html += '<td class="w2ui-col-select" style="height: 0px;"></td>';
                if (this.show.expandColumn) rec_html += '<td class="w2ui-col-expand" style="height: 0px;"></td>';
                for (var i in this.columns) {
                    if (this.columns[i].hidden) continue;
                    rec_html += '<td class="w2ui-grid-data" col="'+ i +'" style="height: 0px;"></td>';
                }
                rec_html += '<td class="w2ui-grid-data-last" style="height: 0px;"></td>';
                rec_html += '</tr>';
                return rec_html;
            }
            // regular record
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            if (summary !== true) {
                if (this.searchData.length > 0 && !url) {
                    if (ind >= this.last.searchIds.length) return '';
                    ind = this.last.searchIds[ind];
                    record = this.records[ind];
                } else {
                    if (ind >= this.records.length) return '';
                    record = this.records[ind];
                }
            } else {
                if (ind >= this.summary.length) return '';
                record = this.summary[ind];
            }
            if (!record) return '';
            var id = w2utils.escapeId(record.recid);
            var isRowSelected = false;
            if (sel.indexes.indexOf(ind) != -1) isRowSelected = true;
            // render TR
            rec_html += '<tr id="grid_'+ this.name +'_rec_'+ record.recid +'" recid="'+ record.recid +'" line="'+ lineNum +'" '+
                ' class="'+ (lineNum % 2 == 0 ? 'w2ui-even' : 'w2ui-odd') +
                    (isRowSelected && this.selectType == 'row' ? ' w2ui-selected' : '') +
                    (record.editable === false ? ' w2ui-no-edit' : '') +
                    (record.expanded === true ? ' w2ui-expanded' : '') + '" ' +
                (summary !== true ?
                    (w2utils.isIOS ?
                        '    onclick  = "w2ui[\''+ this.name +'\'].dblClick(\''+ record.recid +'\', event);"'
                        :
                        '    onclick  = "w2ui[\''+ this.name +'\'].click(\''+ record.recid +'\', event);"'+
                        '    oncontextmenu = "w2ui[\''+ this.name +'\'].contextMenu(\''+ record.recid +'\', event);"'
                     )
                    : ''
                ) +
                ' style="height: '+ this.recordHeight +'px; '+ (!isRowSelected && typeof record['style'] == 'string' ? record['style'] : '') +'" '+
                    ( typeof record['style'] == 'string' ? 'custom_style="'+ record['style'] +'"' : '') +
                '>';
            if (this.show.lineNumbers) {
                rec_html += '<td id="grid_'+ this.name +'_cell_'+ ind +'_number' + (summary ? '_s' : '') + '" class="w2ui-col-number">'+
                                (summary !== true ? '<div>'+ lineNum +'</div>' : '') +
                            '</td>';
            }
            if (this.show.selectColumn) {
                rec_html +=
                        '<td id="grid_'+ this.name +'_cell_'+ ind +'_select' + (summary ? '_s' : '') + '" class="w2ui-grid-data w2ui-col-select" '+
                        '        onclick="if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;">'+
                            (summary !== true ?
                            '    <div>'+
                            '        <input class="w2ui-grid-select-check" type="checkbox" tabIndex="-1"'+
                            '            '+ (isRowSelected ? 'checked="checked"' : '') +
                            '            onclick="var obj = w2ui[\''+ this.name +'\']; '+
                            '                if (!obj.multiSelect) { obj.selectNone(); }'+
                            '                if (this.checked) obj.select(\''+ record.recid + '\'); else obj.unselect(\''+ record.recid + '\'); '+
                            '                if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;'+
                            '                this. blur()">'+
                            '    </div>'
                            :
                            '' ) +
                        '</td>';
            }
            if (this.show.expandColumn) {
                var tmp_img = '';
                if (record.expanded === true)  tmp_img = '-'; else tmp_img = '+';
                if (record.expanded == 'none') tmp_img = '';
                if (record.expanded == 'spinner') tmp_img = '<div class="w2ui-spinner" style="width: 16px; margin: -2px 2px;"></div>';
                rec_html +=
                        '<td id="grid_'+ this.name +'_cell_'+ ind +'_expand' + (summary ? '_s' : '') + '" class="w2ui-grid-data w2ui-col-expand">'+
                            (summary !== true ?
                            '    <div ondblclick="if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;" '+
                            '            onclick="w2ui[\''+ this.name +'\'].toggle(\''+ record.recid +'\', event); '+
                            '                if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;">'+
                            '        '+ tmp_img +' </div>'
                            :
                            '' ) +
                        '</td>';
            }
            var col_ind = 0;
            while (true) {
                var col = this.columns[col_ind];
                if (col.hidden) { col_ind++; if (typeof this.columns[col_ind] == 'undefined') break; else continue; }
                var isChanged = !summary && record.changes && typeof record.changes[col.field] != 'undefined';
                var rec_cell  = this.getCellHTML(ind, col_ind, summary);
                var addStyle  = '';
                if (typeof col.render == 'string') {
                    var tmp = col.render.toLowerCase().split(':');
                    if (['number', 'int', 'float', 'money', 'currency', 'percent'].indexOf(tmp[0]) != -1) addStyle += 'text-align: right;';
                }
                if (typeof record.style == 'object' && typeof record.style[col_ind] == 'string') {
                    addStyle += record.style[col_ind] + ';';
                }
                var isCellSelected = false;
                if (isRowSelected && $.inArray(col_ind, sel.columns[ind]) != -1) isCellSelected = true;
                rec_html += '<td class="w2ui-grid-data'+ (isCellSelected ? ' w2ui-selected' : '') + (isChanged ? ' w2ui-changed' : '') +'" col="'+ col_ind +'" '+
                            '    style="'+ addStyle + (typeof col.style != 'undefined' ? col.style : '') +'" '+
                                          (typeof col.attr != 'undefined' ? col.attr : '') +'>'+
                                rec_cell +
                            '</td>';
                col_ind++;
                if (typeof this.columns[col_ind] == 'undefined') break;
            }
            rec_html += '<td class="w2ui-grid-data-last"></td>';
            rec_html += '</tr>';
            return rec_html;
        },

        getCellHTML: function (ind, col_ind, summary) {
            var col    = this.columns[col_ind];
            var record = (summary !== true ? this.records[ind] : this.summary[ind]);
            var data   = this.getCellValue(ind, col_ind, summary);
            var edit   = col.editable;
            // various renderers
            if (col.render != null) {
                if (typeof col.render == 'function') {
                    data = $.trim(col.render.call(this, record, ind, col_ind));
                    if (data.length < 4 || data.substr(0, 4).toLowerCase() != '<div') data = '<div>' + data + '</div>';
                }
                if (typeof col.render == 'object')   data = '<div>' + (col.render[data] || '') + '</div>';
                if (typeof col.render == 'string') {
                    var tmp = col.render.toLowerCase().split(':');
                    var prefix = '';
                    var suffix = '';
                    if (['number', 'int', 'float', 'money', 'currency', 'percent'].indexOf(tmp[0]) != -1) {
                        if (typeof tmp[1] == 'undefined' || !w2utils.isInt(tmp[1])) tmp[1] = 0;
                        if (tmp[1] > 20) tmp[1] = 20;
                        if (tmp[1] < 0)  tmp[1] = 0;
                        if (['money', 'currency'].indexOf(tmp[0]) != -1) { tmp[1] = w2utils.settings.currencyPrecision; prefix = w2utils.settings.currencyPrefix; suffix = w2utils.settings.currencySuffix }
                        if (tmp[0] == 'percent') { suffix = '%'; if (tmp[1] !== '0') tmp[1] = 1; }
                        if (tmp[0] == 'int')     { tmp[1] = 0; }
                        // format
                        data = '<div>' + (data !== '' ? prefix + w2utils.formatNumber(Number(data).toFixed(tmp[1])) + suffix : '') + '</div>';
                    }
                    if (tmp[0] == 'time') {
                        if (typeof tmp[1] == 'undefined' || tmp[1] == '') tmp[1] = w2utils.settings.time_format;
                        data = '<div>' + prefix + w2utils.formatTime(data, tmp[1] == 'h12' ? 'hh:mi pm': 'h24:mi') + suffix + '</div>';
                    }
                    if (tmp[0] == 'date') {
                        if (typeof tmp[1] == 'undefined' || tmp[1] == '') tmp[1] = w2utils.settings.date_display;
                        data = '<div>' + prefix + w2utils.formatDate(data, tmp[1]) + suffix + '</div>';
                    }
                    if (tmp[0] == 'age') {
                        data = '<div>' + prefix + w2utils.age(data) + suffix + '</div>';
                    }
                    if (tmp[0] == 'toggle') {
                        data = '<div>' + prefix + (data ? 'Yes' : '') + suffix + '</div>';
                    }
                }
            } else {
                // if editable checkbox
                var addStyle = '';
                if (edit && ['checkbox', 'check'].indexOf(edit.type) != -1) {
                    var changeInd = summary ? -(ind + 1) : ind;
                    addStyle = 'text-align: center';
                    data = '<input type="checkbox" '+ (data ? 'checked' : '') +' onclick="' +
                           '    var obj = w2ui[\''+ this.name + '\']; '+
                           '    obj.editChange.call(obj, this, '+ changeInd +', '+ col_ind +', event); ' +
                           '">';
                }
                if (!this.show.recordTitles) {
                    var data = '<div style="'+ addStyle +'">'+ data +'</div>';
                } else {
                    // title overwrite
                    var title = String(data).replace(/"/g, "''");
                    if (typeof col.title != 'undefined') {
                        if (typeof col.title == 'function') title = col.title.call(this, record, ind, col_ind);
                        if (typeof col.title == 'string')   title = col.title;
                    }
                    var data = '<div title="'+ w2utils.stripTags(title) +'" style="'+ addStyle +'">'+ data +'</div>';
                }
            }
            if (data == null || typeof data == 'undefined') data = '';
            return data;
        },

        getCellValue: function (ind, col_ind, summary) {
            var col    = this.columns[col_ind];
            var record = (summary !== true ? this.records[ind] : this.summary[ind]);
            var data   = this.parseField(record, col.field);
            if (record.changes && typeof record.changes[col.field] != 'undefined') data = record.changes[col.field];
            if (data == null || typeof data == 'undefined') data = '';
            return data;
        },

        getFooterHTML: function () {
            return '<div>'+
                '    <div class="w2ui-footer-left"></div>'+
                '    <div class="w2ui-footer-right"></div>'+
                '    <div class="w2ui-footer-center"></div>'+
                '</div>';
        },

        status: function (msg) {
            if (typeof msg != 'undefined') {
                $('#grid_'+ this.name +'_footer').find('.w2ui-footer-left').html(msg);
            } else {
                // show number of selected
                var msgLeft = '';
                var sel = this.getSelection();
                if (sel.length > 0) {
                    msgLeft = String(sel.length).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ' ' + w2utils.lang('selected');
                    var tmp = sel[0];
                    if (typeof tmp == 'object') tmp = tmp.recid + ', '+ w2utils.lang('Column') +': '+ tmp.column;
                    if (sel.length == 1) msgLeft = w2utils.lang('Record ID') + ': '+ tmp + ' ';
                }
                $('#grid_'+ this.name +'_footer .w2ui-footer-left').html(msgLeft);
                // toolbar
                if (sel.length == 1) this.toolbar.enable('w2ui-edit'); else this.toolbar.disable('w2ui-edit');
                if (sel.length >= 1) this.toolbar.enable('w2ui-delete'); else this.toolbar.disable('w2ui-delete');
            }
        },

        lock: function (msg, showSpinner) {
            var box  = $(this.box).find('> div:first-child');
            var args = Array.prototype.slice.call(arguments, 0);
            args.unshift(box);
            setTimeout(function () { w2utils.lock.apply(window, args); }, 10);
        },

        unlock: function () {
            var box = this.box;
            setTimeout(function () { w2utils.unlock(box); }, 25); // needed timer so if server fast, it will not flash
        },

        stateSave: function (returnOnly) {
            if (!localStorage) return null;
            var state = {
                columns     : [],
                show        : $.extend({}, this.show),
                last        : {
                    search      : this.last.search,
                    multi       : this.last.multi,
                    logic       : this.last.logic,
                    caption     : this.last.caption,
                    field       : this.last.field,
                    scrollTop   : this.last.scrollTop,
                    scrollLeft  : this.last.scrollLeft
                },
                sortData    : [],
                searchData  : []
            };
            for (var i in this.columns) {
                var col = this.columns[i];
                state.columns.push({
                    field           : col.field,
                    hidden          : col.hidden,
                    size            : col.size,
                    sizeCalculated  : col.sizeCalculated,
                    sizeOriginal    : col.sizeOriginal,
                    sizeType        : col.sizeType
                });
            }
            for (var i in this.sortData) state.sortData.push($.extend({}, this.sortData[i]));
            for (var i in this.searchData) state.searchData.push($.extend({}, this.searchData[i]));
            // save into local storage
            if (returnOnly !== true) {
                // event before
                var eventData = this.trigger({ phase: 'before', type: 'stateSave', target: this.name, state: state });
                if (eventData.isCancelled === true) { if (typeof callBack == 'function') callBack({ status: 'error', message: 'Request aborted.' }); return; }
                try {
                    var savedState = $.parseJSON(localStorage.w2ui || '{}');
                    if (!savedState) savedState = {};
                    if (!savedState.states) savedState.states = {};
                    savedState.states[this.name] = state;
                    localStorage.w2ui = JSON.stringify(savedState);
                } catch (e) {
                    delete localStorage.w2ui;
                    return null;
                }
                // event after
                this.trigger($.extend(eventData, { phase: 'after' }));
            }
            return state;
        },

        stateRestore: function (newState) {
            var obj = this;
            if (!newState) {
                // read it from local storage
                try {
                    if (!localStorage) return false;
                    var tmp = $.parseJSON(localStorage.w2ui || '{}');
                    if (!tmp) tmp = {};
                    if (!tmp.states) tmp.states = {};
                    newState = tmp.states[this.name];
                } catch (e) {
                    delete localStorage.w2ui;
                    return null;
                }
            }
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'stateRestore', target: this.name, state: newState });
            if (eventData.isCancelled === true) { if (typeof callBack == 'function') callBack({ status: 'error', message: 'Request aborted.' }); return; }
            // default behavior
            if ($.isPlainObject(newState)) {
                $.extend(this.show, newState.show);
                $.extend(this.last, newState.last);
                var sTop  = this.last.scrollTop;
                var sLeft = this.last.scrollLeft;
                for (var c in newState.columns) {
                    var tmp = newState.columns[c];
                    var col = this.getColumn(tmp.field);
                    if (col) $.extend(col, tmp);
                }
                this.sortData.splice(0, this.sortData.length);
                for (var c in newState.sortData) this.sortData.push(newState.sortData[c]);
                this.searchData.splice(0, this.searchData.length);
                for (var c in newState.searchData) this.searchData.push(newState.searchData[c]);
                // apply sort and search
                setTimeout(function () {
                    // needs timeout as records need to be populated
                    if (obj.sortData.length > 0) obj.localSort();
                    if (obj.searchData.length > 0) obj.localSearch();
                    obj.last.scrollTop  = sTop;
                    obj.last.scrollLeft = sLeft;
                    obj.refresh();
                }, 1);
            }
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            return true;
        },

        stateReset: function () {
            this.stateRestore(this.last.state);
            // remove from local storage
            if (localStorage) {
                try {
                    var tmp = $.parseJSON(localStorage.w2ui || '{}');
                    if (tmp.states && tmp.states[this.name]) {
                        delete tmp.states[this.name];
                    }
                    localStorage.w2ui = JSON.stringify(tmp);
                } catch (e) {
                    delete localStorage.w2ui;
                    return null;
                }
            }
        },

        parseField: function (obj, field) {
            var val = '';
            try { // need this to make sure no error in fields
                val = obj;
                var tmp = String(field).split('.');
                for (var i in tmp) {
                    val = val[tmp[i]];
                }
            } catch (event) {
                val = '';
            }
            return val;
        },

        prepareData: function () {
            // loops thru records and prepares date and time objects
            for (var r in this.records) {
                var rec = this.records[r];
                for (var c in this.columns) {
                    var column = this.columns[c];
                    if (rec[column.field] == null || typeof column.render != 'string') continue;
                    // number
                    if (['number', 'int', 'float', 'money', 'currency', 'percent'].indexOf(column.render.split(':')[0])  != -1) {
                        if (typeof rec[column.field] != 'number') rec[column.field] = parseFloat(rec[column.field]);
                    }
                    // date
                    if (['date', 'age'].indexOf(column.render.split(':')[0]) != -1) {
                        if (!rec[column.field + '_']) {
                            var dt = rec[column.field];
                            if (w2utils.isInt(dt)) dt = parseInt(dt);
                            rec[column.field + '_'] = new Date(dt);
                        }
                    }
                    // time
                    if (['time'].indexOf(column.render) != -1) {
                        if (w2utils.isTime(rec[column.field])) { // if string
                            var tmp = w2utils.isTime(rec[column.field], true);
                            var dt = new Date();
                            dt.setHours(tmp.hours, tmp.minutes, (tmp.seconds ? tmp.seconds : 0), 0); // sets hours, min, sec, mills
                            if (!rec[column.field + '_']) rec[column.field + '_'] = dt;
                        } else { // if date object
                            var tmp = rec[column.field];
                            if (w2utils.isInt(tmp)) tmp = parseInt(tmp);
                            var tmp = (tmp != null ? new Date(tmp) : new Date());
                            var dt  = new Date();
                            dt.setHours(tmp.getHours(), tmp.getMinutes(), tmp.getSeconds(), 0); // sets hours, min, sec, mills
                            if (!rec[column.field + '_']) rec[column.field + '_'] = dt;
                        }
                    }
                }
            }
        },

        nextCell: function (col_ind, editable) {
            var check = col_ind + 1;
            if (this.columns.length == check) return null;
            if (editable === true) {
                var edit = this.columns[check].editable;
                if (this.columns[check].hidden || typeof edit == 'undefined'
                    || (edit && ['checkbox', 'check'].indexOf(edit.type) != -1)) return this.nextCell(check, editable);
            }
            return check;
        },

        prevCell: function (col_ind, editable) {
            var check = col_ind - 1;
            if (check < 0) return null;
            if (editable === true) {
                var edit = this.columns[check].editable;
                if (this.columns[check].hidden || typeof edit == 'undefined'
                    || (edit && ['checkbox', 'check'].indexOf(edit.type) != -1)) return this.prevCell(check, editable);
            }
            return check;
        },

        nextRow: function (ind) {
            if ((ind + 1 < this.records.length && this.last.searchIds.length == 0) // if there are more records
                    || (this.last.searchIds.length > 0 && ind < this.last.searchIds[this.last.searchIds.length-1])) {
                ind++;
                if (this.last.searchIds.length > 0) {
                    while (true) {
                        if ($.inArray(ind, this.last.searchIds) != -1 || ind > this.records.length) break;
                        ind++;
                    }
                }
                return ind;
            } else {
                return null;
            }
        },

        prevRow: function (ind) {
            if ((ind > 0 && this.last.searchIds.length == 0)  // if there are more records
                    || (this.last.searchIds.length > 0 && ind > this.last.searchIds[0])) {
                ind--;
                if (this.last.searchIds.length > 0) {
                    while (true) {
                        if ($.inArray(ind, this.last.searchIds) != -1 || ind < 0) break;
                        ind--;
                    }
                }
                return ind;
            } else {
                return null;
            }
        }
    };

    $.extend(w2grid.prototype, w2utils.event);
    w2obj.grid = w2grid;
})();

/************************************************************************
*   Library: Web 2.0 UI for jQuery (using prototypical inheritance)
*   - Following objects defined
*        - w2layout        - layout widget
*        - $().w2layout    - jQuery wrapper
*   - Dependencies: jQuery, w2utils, w2toolbar, w2tabs
*
* == NICE TO HAVE ==
*   - onResize for the panel
*   - add more panel title positions (left=rotated, right=rotated, bottom)
*   - bug: resizer is visible (and onHover) when panel is hidden.
*   - bug: when you assign content before previous transition completed.
*
************************************************************************/

(function () {
    var w2layout = function (options) {
        this.box     = null;        // DOM Element that holds the element
        this.name    = null;        // unique name for w2ui
        this.panels  = [];
        this.tmp     = {};

        this.padding = 1;        // panel padding
        this.resizer = 4;        // resizer width or height
        this.style   = '';

        this.onShow         = null;
        this.onHide         = null;
        this.onResizing     = null;
        this.onResizerClick = null;
        this.onRender       = null;
        this.onRefresh      = null;
        this.onResize       = null;
        this.onDestroy      = null;

        $.extend(true, this, w2obj.layout, options);
    };

    /* @const */ var w2layout_panels = ['top', 'left', 'main', 'preview', 'right', 'bottom'];

    // ====================================================
    // -- Registers as a jQuery plugin

    $.fn.w2layout = function(method) {
        if (typeof method === 'object' || !method ) {
            // check name parameter
            if (!w2utils.checkName(method, 'w2layout')) return;
            var panels = method.panels || [];
            var object = new w2layout(method);
            $.extend(object, { handlers: [], panels: [] });
            // add defined panels
            for (var p = 0, len = panels.length; p < len; p++) {
                object.panels[p] = $.extend(true, {}, w2layout.prototype.panel, panels[p]);
                if ($.isPlainObject(object.panels[p].tabs) || $.isArray(object.panels[p].tabs)) initTabs(object, panels[p].type);
                if ($.isPlainObject(object.panels[p].toolbar) || $.isArray(object.panels[p].toolbar)) initToolbar(object, panels[p].type);
            }
            // add all other panels
            for (var p1 in w2layout_panels) {
                p1 = w2layout_panels[p1];
                if (object.get(p1) !== null) continue;
                object.panels.push($.extend(true, {}, w2layout.prototype.panel, { type: p1, hidden: (p1 !== 'main'), size: 50 }));
            }
            if ($(this).length > 0) {
                object.render($(this)[0]);
            }
            w2ui[object.name] = object;
            return object;

        } else if (w2ui[$(this).attr('name')]) {
            var obj = w2ui[$(this).attr('name')];
            obj[method].apply(obj, Array.prototype.slice.call(arguments, 1));
            return this;
        } else {
            console.log('ERROR: Method ' +  method + ' does not exist on jQuery.w2layout' );
        }

        function initTabs(object, panel, tabs) {
            var pan = object.get(panel);
            if (pan !== null && typeof tabs == 'undefined') tabs = pan.tabs;
            if (pan === null || tabs === null) return false;
            // instanciate tabs
            if ($.isArray(tabs)) tabs = { tabs: tabs };
            $().w2destroy(object.name + '_' + panel + '_tabs'); // destroy if existed
            pan.tabs = $().w2tabs($.extend({}, tabs, { owner: object, name: object.name + '_' + panel + '_tabs' }));
            pan.show.tabs = true;
            return true;
        }

        function initToolbar(object, panel, toolbar) {
            var pan = object.get(panel);
            if (pan !== null && typeof toolbar == 'undefined') toolbar = pan.toolbar;
            if (pan === null || toolbar === null) return false;
            // instanciate toolbar
            if ($.isArray(toolbar)) toolbar = { items: toolbar };
            $().w2destroy(object.name + '_' + panel + '_toolbar'); // destroy if existed
            pan.toolbar = $().w2toolbar($.extend({}, toolbar, { owner: object, name: object.name + '_' + panel + '_toolbar' }));
            pan.show.toolbar = true;
            return true;
        }
    };

    // ====================================================
    // -- Implementation of core functionality

    w2layout.prototype = {
        // default setting for a panel
        panel: {
            type      : null,        // left, right, top, bottom
            title     : '',
            size      : 100,        // width or height depending on panel name
            minSize   : 20,
            maxSize   : false,
            hidden    : false,
            resizable : false,
            overflow  : 'auto',
            style     : '',
            content   : '',        // can be String or Object with .render(box) method
            tabs      : null,
            toolbar   : null,
            width     : null,        // read only
            height    : null,        // read only
            show : {
                toolbar : false,
                tabs    : false
            },
            onRefresh : null,
            onShow    : null,
            onHide    : null
        },

        // alias for content
        html: function (panel, data, transition) {
            return this.content(panel, data, transition);
        },

        content: function (panel, data, transition) {
            var obj = this;
            var p = this.get(panel);
            // if it is CSS panel
            if (panel == 'css') {
                $('#layout_'+ obj.name +'_panel_css').html('<style>'+ data +'</style>');
                return true;
            }
            if (p === null) return false;
            if (typeof data == 'undefined' || data === null) {
                return p.content;
            } else {
                if (data instanceof jQuery) {
                    console.log('ERROR: You can not pass jQuery object to w2layout.content() method');
                    return false;
                }
                var pname     = '#layout_'+ this.name + '_panel_'+ p.type;
                var current = $(pname + '> .w2ui-panel-content');
                var panelTop = 0;
                if (current.length > 0) {
                    $(pname).scrollTop(0);
                    panelTop = $(current).position().top;
                }
                if (p.content === '') {
                    p.content = data;
                    this.refresh(panel);
                } else {
                    p.content = data;
                    if (!p.hidden) {
                        if (transition !== null && transition !== '' && typeof transition != 'undefined') {
                            // apply transition
                            var div1 = $(pname + '> .w2ui-panel-content');
                            div1.after('<div class="w2ui-panel-content new-panel" style="'+ div1[0].style.cssText +'"></div>');
                            var div2 = $(pname + '> .w2ui-panel-content.new-panel');
                            div1.css('top', panelTop);
                            div2.css('top', panelTop);
                            if (typeof data == 'object') {
                                data.box = div2[0]; // do not do .render(box);
                                data.render();
                            } else {
                                div2.html(data);
                            }
                            w2utils.transition(div1[0], div2[0], transition, function () {
                                div1.remove();
                                div2.removeClass('new-panel');
                                div2.css('overflow', p.overflow);
                                // IE Hack
                                obj.resize();
                                if (window.navigator.userAgent.indexOf('MSIE') != -1) setTimeout(function () { obj.resize(); }, 100);
                            });
                        }
                    }
                    this.refresh(panel);
                }
            }
            // IE Hack
            obj.resize();
            if (window.navigator.userAgent.indexOf('MSIE') != -1) setTimeout(function () { obj.resize(); }, 100);
            return true;
        },

        load: function (panel, url, transition, onLoad) {
            var obj = this;
            if (panel == 'css') {
                $.get(url, function (data, status, xhr) { // should always be $.get as it is template
                    obj.content(panel, xhr.responseText);
                    if (onLoad) onLoad();
                });
                return true;
            }
            if (this.get(panel) !== null) {
                $.get(url, function (data, status, xhr) { // should always be $.get as it is template
                    obj.content(panel, xhr.responseText, transition);
                    if (onLoad) onLoad();
                    // IE Hack
                    obj.resize();
                    if (window.navigator.userAgent.indexOf('MSIE') != -1) setTimeout(function () { obj.resize(); }, 100);
                });
                return true;
            }
            return false;
        },

        sizeTo: function (panel, size) {
            var obj = this;
            var pan = obj.get(panel);
            if (pan === null) return false;
            // resize
            $(obj.box).find(' > div > .w2ui-panel').css({
                '-webkit-transition' : '.2s',
                '-moz-transition'    : '.2s',
                '-ms-transition'     : '.2s',
                '-o-transition'      : '.2s'
            });
            setTimeout(function () {
                obj.set(panel, { size: size });
            }, 1);
            // clean
            setTimeout(function () {
                $(obj.box).find(' > div > .w2ui-panel').css({
                    '-webkit-transition' : '0s',
                    '-moz-transition'    : '0s',
                    '-ms-transition'     : '0s',
                    '-o-transition'      : '0s'
                });
                obj.resize();
            }, 500);
            return true;
        },

        show: function (panel, immediate) {
            var obj = this;
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'show', target: panel, object: this.get(panel), immediate: immediate });
            if (eventData.isCancelled === true) return;

            var p = obj.get(panel);
            if (p === null) return false;
            p.hidden = false;
            if (immediate === true) {
                $('#layout_'+ obj.name +'_panel_'+panel).css({ 'opacity': '1' });
                if (p.resizable) $('#layout_'+ obj.name +'_resizer_'+panel).show();
                obj.trigger($.extend(eventData, { phase: 'after' }));
                obj.resize();
            } else {
                if (p.resizable) $('#layout_'+ obj.name +'_resizer_'+panel).show();
                // resize
                $('#layout_'+ obj.name +'_panel_'+panel).css({ 'opacity': '0' });
                $(obj.box).find(' > div > .w2ui-panel').css({
                    '-webkit-transition' : '.2s',
                    '-moz-transition'    : '.2s',
                    '-ms-transition'     : '.2s',
                    '-o-transition'      : '.2s'
                });
                setTimeout(function () { obj.resize(); }, 1);
                // show
                setTimeout(function() {
                    $('#layout_'+ obj.name +'_panel_'+ panel).css({ 'opacity': '1' });
                }, 250);
                // clean
                setTimeout(function () {
                    $(obj.box).find(' > div > .w2ui-panel').css({
                        '-webkit-transition' : '0s',
                        '-moz-transition'    : '0s',
                        '-ms-transition'     : '0s',
                        '-o-transition'      : '0s'
                    });
                    obj.trigger($.extend(eventData, { phase: 'after' }));
                    obj.resize();
                }, 500);
            }
            return true;
        },

        hide: function (panel, immediate) {
            var obj = this;
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'hide', target: panel, object: this.get(panel), immediate: immediate });
            if (eventData.isCancelled === true) return;

            var p = obj.get(panel);
            if (p === null) return false;
            p.hidden = true;
            if (immediate === true) {
                $('#layout_'+ obj.name +'_panel_'+panel).css({ 'opacity': '0'    });
                $('#layout_'+ obj.name +'_resizer_'+panel).hide();
                obj.trigger($.extend(eventData, { phase: 'after' }));
                obj.resize();
            } else {
                $('#layout_'+ obj.name +'_resizer_'+panel).hide();
                // hide
                $(obj.box).find(' > div > .w2ui-panel').css({
                    '-webkit-transition' : '.2s',
                    '-moz-transition'    : '.2s',
                    '-ms-transition'     : '.2s',
                    '-o-transition'      : '.2s'
                });
                $('#layout_'+ obj.name +'_panel_'+panel).css({ 'opacity': '0'    });
                setTimeout(function () { obj.resize(); }, 1);
                // clean
                setTimeout(function () {
                    $(obj.box).find(' > div > .w2ui-panel').css({
                        '-webkit-transition' : '0s',
                        '-moz-transition'    : '0s',
                        '-ms-transition'     : '0s',
                        '-o-transition'      : '0s'
                    });
                    obj.trigger($.extend(eventData, { phase: 'after' }));
                    obj.resize();
                }, 500);
            }
            return true;
        },

        toggle: function (panel, immediate) {
            var p = this.get(panel);
            if (p === null) return false;
            if (p.hidden) return this.show(panel, immediate); else return this.hide(panel, immediate);
        },

        set: function (panel, options) {
            var obj = this.get(panel, true);
            if (obj === null) return false;
            $.extend(this.panels[obj], options);
            if (typeof options['content'] != 'undefined') this.refresh(panel); // refresh only when content changed
            this.resize(); // resize is needed when panel size is changed
            return true;
        },

        get: function (panel, returnIndex) {
            for (var p in this.panels) {
                if (this.panels[p].type == panel) {
                    if (returnIndex === true) return p; else return this.panels[p];
                }
            }
            return null;
        },

        el: function (panel) {
            var el = $('#layout_'+ this.name +'_panel_'+ panel +'> .w2ui-panel-content');
            if (el.length != 1) return null;
            return el[0];
        },

        hideToolbar: function (panel) {
            var pan = this.get(panel);
            if (!pan) return;
            pan.show.toolbar = false;
            $('#layout_'+ this.name +'_panel_'+ panel +'> .w2ui-panel-toolbar').hide();
            this.resize();
        },

        showToolbar: function (panel) {
            var pan = this.get(panel);
            if (!pan) return;
            pan.show.toolbar = true;
            $('#layout_'+ this.name +'_panel_'+ panel +'> .w2ui-panel-toolbar').show();
            this.resize();
        },

        toggleToolbar: function (panel) {
            var pan = this.get(panel);
            if (!pan) return;
            if (pan.show.toolbar) this.hideToolbar(panel); else this.showToolbar(panel);
        },

        hideTabs: function (panel) {
            var pan = this.get(panel);
            if (!pan) return;
            pan.show.tabs = false;
            $('#layout_'+ this.name +'_panel_'+ panel +'> .w2ui-panel-tabs').hide();
            this.resize();
        },

        showTabs: function (panel) {
            var pan = this.get(panel);
            if (!pan) return;
            pan.show.tabs = true;
            $('#layout_'+ this.name +'_panel_'+ panel +'> .w2ui-panel-tabs').show();
            this.resize();
        },

        toggleTabs: function (panel) {
            var pan = this.get(panel);
            if (!pan) return;
            if (pan.show.tabs) this.hideTabs(panel); else this.showTabs(panel);
        },

        render: function (box) {
            var obj = this;
            // if (window.getSelection) window.getSelection().removeAllRanges(); // clear selection
            var time = (new Date()).getTime();
            // event before
            var eventData = obj.trigger({ phase: 'before', type: 'render', target: obj.name, box: box });
            if (eventData.isCancelled === true) return;

            if (typeof box != 'undefined' && box !== null) {
                if ($(obj.box).find('#layout_'+ obj.name +'_panel_main').length > 0) {
                    $(obj.box)
                        .removeAttr('name')
                        .removeClass('w2ui-layout')
                        .html('');
                }
                obj.box = box;
            }
            if (!obj.box) return false;
            $(obj.box)
                .attr('name', obj.name)
                .addClass('w2ui-layout')
                .html('<div></div>');
            if ($(obj.box).length > 0) $(obj.box)[0].style.cssText += obj.style;
            // create all panels
            for (var p1 in w2layout_panels) {
                p1 = w2layout_panels[p1];
                var pan  = obj.get(p1);
                var html =  '<div id="layout_'+ obj.name + '_panel_'+ p1 +'" class="w2ui-panel">'+
                            '    <div class="w2ui-panel-title"></div>'+
                            '    <div class="w2ui-panel-tabs"></div>'+
                            '    <div class="w2ui-panel-toolbar"></div>'+
                            '    <div class="w2ui-panel-content"></div>'+
                            '</div>'+
                            '<div id="layout_'+ obj.name + '_resizer_'+ p1 +'" class="w2ui-resizer"></div>';
                $(obj.box).find(' > div').append(html);
                // tabs are rendered in refresh()
            }
            $(obj.box).find(' > div')
                .append('<div id="layout_'+ obj.name + '_panel_css" style="position: absolute; top: 10000px;"></div');
            obj.refresh(); // if refresh is not called here, the layout will not be available right after initialization
            // process event
            obj.trigger($.extend(eventData, { phase: 'after' }));
            // reinit events
            setTimeout(function () { // needed this timeout to allow browser to render first if there are tabs or toolbar
                initEvents();
                obj.resize();
            }, 0);
            return (new Date()).getTime() - time;

            function initEvents() {
                obj.tmp.events = {
                    resize : function (event) {
                        w2ui[obj.name].resize();
                    },
                    resizeStart : resizeStart,
                    mouseMove   : resizeMove,
                    mouseUp     : resizeStop
                };
                $(window).on('resize', obj.tmp.events.resize);
            }

            function resizeStart(type, evnt) {
                if (!obj.box) return;
                if (!evnt) evnt = window.event;
                if (!window.addEventListener) { window.document.attachEvent('onselectstart', function() { return false; } ); }
                $(document).off('mousemove', obj.tmp.events.mouseMove).on('mousemove', obj.tmp.events.mouseMove);
                $(document).off('mouseup', obj.tmp.events.mouseUp).on('mouseup', obj.tmp.events.mouseUp);
                obj.tmp.resize = {
                    type    : type,
                    x       : evnt.screenX,
                    y       : evnt.screenY,
                    diff_x  : 0,
                    diff_y  : 0,
                    value   : 0
                };
                // lock all panels
                for (var p1 in w2layout_panels) {
                    p1 = w2layout_panels[p1];
                    obj.lock(p1, { opacity: 0 });
                }
                if (type == 'left' || type == 'right') {
                    obj.tmp.resize.value = parseInt($('#layout_'+ obj.name +'_resizer_'+ type)[0].style.left);
                }
                if (type == 'top' || type == 'preview' || type == 'bottom') {
                    obj.tmp.resize.value = parseInt($('#layout_'+ obj.name +'_resizer_'+ type)[0].style.top);
                }
            }

            function resizeStop(evnt) {
                if (!obj.box) return;
                if (!evnt) evnt = window.event;
                if (!window.addEventListener) { window.document.attachEvent('onselectstart', function() { return false; } ); }
                $(document).off('mousemove', obj.tmp.events.mouseMove);
                $(document).off('mouseup', obj.tmp.events.mouseUp);
                if (typeof obj.tmp.resize == 'undefined') return;
                // unlock all panels
                for (var p1 in w2layout_panels) {
                    obj.unlock(w2layout_panels[p1]);
                }
                // set new size
                if (obj.tmp.diff_x !== 0 || obj.tmp.resize.diff_y !== 0) { // only recalculate if changed
                    var ptop    = obj.get('top');
                    var pbottom = obj.get('bottom');
                    var panel   = obj.get(obj.tmp.resize.type);
                    var height  = parseInt($(obj.box).height());
                    var width   = parseInt($(obj.box).width());
                    var str     = String(panel.size);
                    var ns, nd;
                    switch (obj.tmp.resize.type) {
                        case 'top':
                            ns = parseInt(panel.sizeCalculated) + obj.tmp.resize.diff_y;
                            nd = 0;
                            break;
                        case 'bottom':
                            ns = parseInt(panel.sizeCalculated) - obj.tmp.resize.diff_y;
                            nd = 0;
                            break;
                        case 'preview':
                            ns = parseInt(panel.sizeCalculated) - obj.tmp.resize.diff_y;
                            nd = (ptop && !ptop.hidden ? ptop.sizeCalculated : 0) +
                                (pbottom && !pbottom.hidden ? pbottom.sizeCalculated : 0);
                            break;
                        case 'left':
                            ns = parseInt(panel.sizeCalculated) + obj.tmp.resize.diff_x;
                            nd = 0;
                            break;
                        case 'right':
                            ns = parseInt(panel.sizeCalculated) - obj.tmp.resize.diff_x;
                            nd = 0;
                            break;
                    }
                    // set size
                    if (str.substr(str.length-1) == '%') {
                        panel.size = Math.floor(ns * 100 /
                            (panel.type == 'left' || panel.type == 'right' ? width : height - nd) * 100) / 100 + '%';
                    } else {
                        panel.size = ns;
                    }
                    obj.resize();
                }
                $('#layout_'+ obj.name + '_resizer_'+ obj.tmp.resize.type).removeClass('active');
                delete obj.tmp.resize;
            }

            function resizeMove(evnt) {
                if (!obj.box) return;
                if (!evnt) evnt = window.event;
                if (typeof obj.tmp.resize == 'undefined') return;
                var panel = obj.get(obj.tmp.resize.type);
                // event before
                var tmp = obj.tmp.resize;
                var eventData = obj.trigger({ phase: 'before', type: 'resizing', target: obj.name, object: panel, originalEvent: evnt,
                    panel: tmp ? tmp.type : 'all', diff_x: tmp ? tmp.diff_x : 0, diff_y: tmp ? tmp.diff_y : 0 });
                if (eventData.isCancelled === true) return;

                var p         = $('#layout_'+ obj.name + '_resizer_'+ tmp.type);
                var resize_x  = (evnt.screenX - tmp.x);
                var resize_y  = (evnt.screenY - tmp.y);
                var mainPanel = obj.get('main');

                if (!p.hasClass('active')) p.addClass('active');

                switch (tmp.type) {
                    case 'left':
                        if (panel.minSize - resize_x > panel.width) {
                            resize_x = panel.minSize - panel.width;
                        }
                        if (panel.maxSize && (panel.width + resize_x > panel.maxSize)) {
                            resize_x = panel.maxSize - panel.width;
                        }
                        if (mainPanel.minSize + resize_x > mainPanel.width) {
                            resize_x = mainPanel.width - mainPanel.minSize;
                        }
                        break;

                    case 'right':
                        if (panel.minSize + resize_x > panel.width) {
                            resize_x = panel.width - panel.minSize;
                        }
                        if (panel.maxSize && (panel.width - resize_x > panel.maxSize)) {
                            resize_x = panel.width - panel.maxSize;
                        }
                        if (mainPanel.minSize - resize_x > mainPanel.width) {
                            resize_x = mainPanel.minSize - mainPanel.width;
                        }
                        break;

                    case 'top':
                        if (panel.minSize - resize_y > panel.height) {
                            resize_y = panel.minSize - panel.height;
                        }
                        if (panel.maxSize && (panel.height + resize_y > panel.maxSize)) {
                            resize_y = panel.maxSize - panel.height;
                        }
                        if (mainPanel.minSize + resize_y > mainPanel.height) {
                            resize_y = mainPanel.height - mainPanel.minSize;
                        }
                        break;

                    case 'preview':
                    case 'bottom':
                        if (panel.minSize + resize_y > panel.height) {
                            resize_y = panel.height - panel.minSize;
                        }
                        if (panel.maxSize && (panel.height - resize_y > panel.maxSize)) {
                            resize_y = panel.height - panel.maxSize;
                        }
                        if (mainPanel.minSize - resize_y > mainPanel.height) {
                            resize_y = mainPanel.minSize - mainPanel.height;
                        }
                        break;
                }
                tmp.diff_x = resize_x;
                tmp.diff_y = resize_y;

                switch (tmp.type) {
                    case 'top':
                    case 'preview':
                    case 'bottom':
                        tmp.diff_x = 0;
                        if (p.length > 0) p[0].style.top = (tmp.value + tmp.diff_y) + 'px';
                        break;

                    case 'left':
                    case 'right':
                        tmp.diff_y = 0;
                        if (p.length > 0) p[0].style.left = (tmp.value + tmp.diff_x) + 'px';
                        break;
                }
                // event after
                obj.trigger($.extend(eventData, { phase: 'after' }));
            }
        },

        refresh: function (panel) {
            var obj = this;
            // if (window.getSelection) window.getSelection().removeAllRanges(); // clear selection
            if (typeof panel == 'undefined') panel = null;
            var time = (new Date()).getTime();
            // event before
            var eventData = obj.trigger({ phase: 'before', type: 'refresh', target: (typeof panel != 'undefined' ? panel : obj.name), object: obj.get(panel) });
            if (eventData.isCancelled === true) return;
            // obj.unlock(panel);
            if (typeof panel == 'string') {
                var p = obj.get(panel);
                if (p === null) return;
                var pname = '#layout_'+ obj.name + '_panel_'+ p.type;
                var rname = '#layout_'+ obj.name +'_resizer_'+ p.type;
                // apply properties to the panel
                $(pname).css({ display: p.hidden ? 'none' : 'block' });
                if (p.resizable) $(rname).show(); else $(rname).hide();
                // insert content
                if (typeof p.content == 'object' && typeof p.content.render === 'function') {
                    p.content.box = $(pname +'> .w2ui-panel-content')[0];
                    setTimeout(function () {
                        // need to remove unnecessary classes
                        if ($(pname +'> .w2ui-panel-content').length > 0) {
                            $(pname +'> .w2ui-panel-content')
                                .removeClass()
                                .removeAttr('name')
                                .off('selectstart') // needed if previous was grid
                                .addClass('w2ui-panel-content')
                                .css('overflow', p.overflow)[0].style.cssText += ';' + p.style;
                        }
                        p.content.render(); // do not do .render(box);
                    }, 1);
                } else {
                    // need to remove unnecessary classes
                    if ($(pname +'> .w2ui-panel-content').length > 0) {
                        $(pname +'> .w2ui-panel-content')
                            .removeClass()
                            .removeAttr('name')
                            .off('selectstart') // needed if previous was grid
                            .addClass('w2ui-panel-content')
                            .html(p.content)
                            .css('overflow', p.overflow)[0].style.cssText += ';' + p.style;
                    }
                }
                // if there are tabs and/or toolbar - render it
                var tmp = $(obj.box).find(pname +'> .w2ui-panel-tabs');
                if (p.show.tabs) {
                    if (tmp.find('[name='+ p.tabs.name +']').length === 0 && p.tabs !== null) tmp.w2render(p.tabs); else p.tabs.refresh();
                } else {
                    tmp.html('').removeClass('w2ui-tabs').hide();
                }
                tmp = $(obj.box).find(pname +'> .w2ui-panel-toolbar');
                if (p.show.toolbar) {
                    if (tmp.find('[name='+ p.toolbar.name +']').length === 0 && p.toolbar !== null) tmp.w2render(p.toolbar); else p.toolbar.refresh();
                } else {
                    tmp.html('').removeClass('w2ui-toolbar').hide();
                }
                // show title
                tmp = $(obj.box).find(pname +'> .w2ui-panel-title');
                if (p.title) {
                    tmp.html(p.title).show();
                } else {
                    tmp.html('').hide();
                }
            } else {
                if ($('#layout_'+ obj.name +'_panel_main').length == 0) {
                    obj.render();
                    return;
                }
                obj.resize();
                // refresh all of them
                for (var p1 in this.panels) { obj.refresh(this.panels[p1].type); }
            }
            obj.trigger($.extend(eventData, { phase: 'after' }));
            return (new Date()).getTime() - time;
        },

        resize: function () {
            // if (window.getSelection) window.getSelection().removeAllRanges();    // clear selection
            if (!this.box) return false;
            var time = (new Date()).getTime();
            // event before
            var tmp = this.tmp.resize;
            var eventData = this.trigger({ phase: 'before', type: 'resize', target: this.name,
                panel: tmp ? tmp.type : 'all', diff_x: tmp ? tmp.diff_x : 0, diff_y: tmp ? tmp.diff_y : 0  });
            if (eventData.isCancelled === true) return;
            if (this.padding < 0) this.padding = 0;

            // layout itself
            var width  = parseInt($(this.box).width());
            var height = parseInt($(this.box).height());
            $(this.box).find(' > div').css({
                width    : width + 'px',
                height    : height + 'px'
            });
            var obj = this;
            // panels
            var pmain   = this.get('main');
            var pprev   = this.get('preview');
            var pleft   = this.get('left');
            var pright  = this.get('right');
            var ptop    = this.get('top');
            var pbottom = this.get('bottom');
            var smain   = true; // main always on
            var sprev   = (pprev !== null && pprev.hidden !== true ? true : false);
            var sleft   = (pleft !== null && pleft.hidden !== true ? true : false);
            var sright  = (pright !== null && pright.hidden !== true ? true : false);
            var stop    = (ptop !== null && ptop.hidden !== true ? true : false);
            var sbottom = (pbottom !== null && pbottom.hidden !== true ? true : false);
            var l, t, w, h, e;
            // calculate %
            for (var p in w2layout_panels) {
                p = w2layout_panels[p];
                if (p === 'main') continue;
                var tmp = this.get(p);
                if (!tmp) continue;
                var str = String(tmp.size || 0);
                if (str.substr(str.length-1) == '%') {
                    var tmph = height;
                    if (tmp.type == 'preview') {
                        tmph = tmph -
                            (ptop && !ptop.hidden ? ptop.sizeCalculated : 0) -
                            (pbottom && !pbottom.hidden ? pbottom.sizeCalculated : 0);
                    }
                    tmp.sizeCalculated = parseInt((tmp.type == 'left' || tmp.type == 'right' ? width : tmph) * parseFloat(tmp.size) / 100);
                } else {
                    tmp.sizeCalculated = parseInt(tmp.size);
                }
                tmp.sizeCalculated = Math.max(tmp.sizeCalculated, parseInt(tmp.minSize));
            }
            // top if any
            if (ptop !== null && ptop.hidden !== true) {
                l = 0;
                t = 0;
                w = width;
                h = ptop.sizeCalculated;
                $('#layout_'+ this.name +'_panel_top').css({
                    'display': 'block',
                    'left': l + 'px',
                    'top': t + 'px',
                    'width': w + 'px',
                    'height': h + 'px'
                }).show();
                ptop.width  = w;
                ptop.height = h;
                // resizer
                if (ptop.resizable) {
                    t = ptop.sizeCalculated - (this.padding === 0 ? this.resizer : 0);
                    h = (this.resizer > this.padding ? this.resizer : this.padding);
                    $('#layout_'+ this.name +'_resizer_top').show().css({
                        'display': 'block',
                        'left': l + 'px',
                        'top': t + 'px',
                        'width': w + 'px',
                        'height': h + 'px',
                        'cursor': 'ns-resize'
                    }).off('mousedown').on('mousedown', function (event) {
                        // event before
                        var eventData = obj.trigger({ phase: 'before', type: 'resizerClick', target: 'top', originalEvent: event });
                        if (eventData.isCancelled === true) return;
                        // default action
                        w2ui[obj.name].tmp.events.resizeStart('top', event);
                        // event after
                        obj.trigger($.extend(eventData, { phase: 'after' }));
                        return false;
                    });
                }
            } else {
                $('#layout_'+ this.name +'_panel_top').hide();
            }
            // left if any
            if (pleft !== null && pleft.hidden !== true) {
                l = 0;
                t = 0 + (stop ? ptop.sizeCalculated + this.padding : 0);
                w = pleft.sizeCalculated;
                h = height - (stop ? ptop.sizeCalculated + this.padding : 0) -
                        (sbottom ? pbottom.sizeCalculated + this.padding : 0);
                e = $('#layout_'+ this.name +'_panel_left');
                if (window.navigator.userAgent.indexOf('MSIE') != -1 && e.length > 0 && e[0].clientHeight < e[0].scrollHeight) w += 17; // IE hack
                e.css({
                    'display': 'block',
                    'left': l + 'px',
                    'top': t + 'px',
                    'width': w + 'px',
                    'height': h + 'px'
                }).show();
                pleft.width  = w;
                pleft.height = h;
                // resizer
                if (pleft.resizable) {
                    l = pleft.sizeCalculated - (this.padding === 0 ? this.resizer : 0);
                    w = (this.resizer > this.padding ? this.resizer : this.padding);
                    $('#layout_'+ this.name +'_resizer_left').show().css({
                        'display': 'block',
                        'left': l + 'px',
                        'top': t + 'px',
                        'width': w + 'px',
                        'height': h + 'px',
                        'cursor': 'ew-resize'
                    }).off('mousedown').on('mousedown', function (event) {
                        // event before
                        var eventData = obj.trigger({ phase: 'before', type: 'resizerClick', target: 'left', originalEvent: event });
                        if (eventData.isCancelled === true) return;
                        // default action
                        w2ui[obj.name].tmp.events.resizeStart('left', event);
                        // event after
                        obj.trigger($.extend(eventData, { phase: 'after' }));
                        return false;
                    });
                }
            } else {
                $('#layout_'+ this.name +'_panel_left').hide();
                $('#layout_'+ this.name +'_resizer_left').hide();
            }
            // right if any
            if (pright !== null && pright.hidden !== true) {
                l = width - pright.sizeCalculated;
                t = 0 + (stop ? ptop.sizeCalculated + this.padding : 0);
                w = pright.sizeCalculated;
                h = height - (stop ? ptop.sizeCalculated + this.padding : 0) -
                    (sbottom ? pbottom.sizeCalculated + this.padding : 0);
                $('#layout_'+ this.name +'_panel_right').css({
                    'display': 'block',
                    'left': l + 'px',
                    'top': t + 'px',
                    'width': w + 'px',
                    'height': h + 'px'
                }).show();
                pright.width  = w;
                pright.height = h;
                // resizer
                if (pright.resizable) {
                    l = l - this.padding;
                    w = (this.resizer > this.padding ? this.resizer : this.padding);
                    $('#layout_'+ this.name +'_resizer_right').show().css({
                        'display': 'block',
                        'left': l + 'px',
                        'top': t + 'px',
                        'width': w + 'px',
                        'height': h + 'px',
                        'cursor': 'ew-resize'
                    }).off('mousedown').on('mousedown', function (event) {
                        // event before
                        var eventData = obj.trigger({ phase: 'before', type: 'resizerClick', target: 'right', originalEvent: event });
                        if (eventData.isCancelled === true) return;
                        // default action
                        w2ui[obj.name].tmp.events.resizeStart('right', event);
                        // event after
                        obj.trigger($.extend(eventData, { phase: 'after' }));
                        return false;
                    });
                }
            } else {
                $('#layout_'+ this.name +'_panel_right').hide();
            }
            // bottom if any
            if (pbottom !== null && pbottom.hidden !== true) {
                l = 0;
                t = height - pbottom.sizeCalculated;
                w = width;
                h = pbottom.sizeCalculated;
                $('#layout_'+ this.name +'_panel_bottom').css({
                    'display': 'block',
                    'left': l + 'px',
                    'top': t + 'px',
                    'width': w + 'px',
                    'height': h + 'px'
                }).show();
                pbottom.width  = w;
                pbottom.height = h;
                // resizer
                if (pbottom.resizable) {
                    t = t - (this.padding === 0 ? 0 : this.padding);
                    h = (this.resizer > this.padding ? this.resizer : this.padding);
                    $('#layout_'+ this.name +'_resizer_bottom').show().css({
                        'display': 'block',
                        'left': l + 'px',
                        'top': t + 'px',
                        'width': w + 'px',
                        'height': h + 'px',
                        'cursor': 'ns-resize'
                    }).off('mousedown').on('mousedown', function (event) {
                        // event before
                        var eventData = obj.trigger({ phase: 'before', type: 'resizerClick', target: 'bottom', originalEvent: event });
                        if (eventData.isCancelled === true) return;
                        // default action
                        w2ui[obj.name].tmp.events.resizeStart('bottom', event);
                        // event after
                        obj.trigger($.extend(eventData, { phase: 'after' }));
                        return false;
                    });
                }
            } else {
                $('#layout_'+ this.name +'_panel_bottom').hide();
            }
            // main - always there
            l = 0 + (sleft ? pleft.sizeCalculated + this.padding : 0);
            t = 0 + (stop ? ptop.sizeCalculated + this.padding : 0);
            w = width  - (sleft ? pleft.sizeCalculated + this.padding : 0) -
                (sright ? pright.sizeCalculated + this.padding: 0);
            h = height - (stop ? ptop.sizeCalculated + this.padding : 0) -
                (sbottom ? pbottom.sizeCalculated + this.padding : 0) -
                (sprev ? pprev.sizeCalculated + this.padding : 0);
            e = $('#layout_'+ this.name +'_panel_main');
            if (window.navigator.userAgent.indexOf('MSIE') != -1 && e.length > 0 && e[0].clientHeight < e[0].scrollHeight) w += 17; // IE hack
            e.css({
                'display': 'block',
                'left': l + 'px',
                'top': t + 'px',
                'width': w + 'px',
                'height': h + 'px'
            });
            pmain.width  = w;
            pmain.height = h;

            // preview if any
            if (pprev !== null && pprev.hidden !== true) {
                l = 0 + (sleft ? pleft.sizeCalculated + this.padding : 0);
                t = height - (sbottom ? pbottom.sizeCalculated + this.padding : 0) - pprev.sizeCalculated;
                w = width  - (sleft ? pleft.sizeCalculated + this.padding : 0) -
                    (sright ? pright.sizeCalculated + this.padding : 0);
                h = pprev.sizeCalculated;
                e = $('#layout_'+ this.name +'_panel_preview');
                if (window.navigator.userAgent.indexOf('MSIE') != -1 && e.length > 0 && e[0].clientHeight < e[0].scrollHeight) w += 17; // IE hack
                e.css({
                    'display': 'block',
                    'left': l + 'px',
                    'top': t + 'px',
                    'width': w + 'px',
                    'height': h + 'px'
                }).show();
                pprev.width  = w;
                pprev.height = h;
                // resizer
                if (pprev.resizable) {
                    t = t - (this.padding === 0 ? 0 : this.padding);
                    h = (this.resizer > this.padding ? this.resizer : this.padding);
                    $('#layout_'+ this.name +'_resizer_preview').show().css({
                        'display': 'block',
                        'left': l + 'px',
                        'top': t + 'px',
                        'width': w + 'px',
                        'height': h + 'px',
                        'cursor': 'ns-resize'
                    }).off('mousedown').on('mousedown', function (event) {
                        // event before
                        var eventData = obj.trigger({ phase: 'before', type: 'resizerClick', target: 'preview', originalEvent: event });
                        if (eventData.isCancelled === true) return;
                        // default action
                        w2ui[obj.name].tmp.events.resizeStart('preview', event);
                        // event after
                        obj.trigger($.extend(eventData, { phase: 'after' }));
                        return false;
                    });
                }
            } else {
                $('#layout_'+ this.name +'_panel_preview').hide();
            }

            // display tabs and toolbar if needed
            for (var p1 in w2layout_panels) {
                p1 = w2layout_panels[p1];
                var pan = this.get(p1);
                var tmp2 = '#layout_'+ this.name +'_panel_'+ p1 +' > .w2ui-panel-';
                var tabHeight = 0;
                if (pan) {
                    if (pan.title) {
                        tabHeight += w2utils.getSize($(tmp2 + 'title').css({ top: tabHeight + 'px', display: 'block' }), 'height');
                    }
                    if (pan.show.tabs) {
                        if (pan.tabs !== null && w2ui[this.name +'_'+ p1 +'_tabs']) w2ui[this.name +'_'+ p1 +'_tabs'].resize();
                        tabHeight += w2utils.getSize($(tmp2 + 'tabs').css({ top: tabHeight + 'px', display: 'block' }), 'height');
                    }
                    if (pan.show.toolbar) {
                        if (pan.toolbar !== null && w2ui[this.name +'_'+ p1 +'_toolbar']) w2ui[this.name +'_'+ p1 +'_toolbar'].resize();
                        tabHeight += w2utils.getSize($(tmp2 + 'toolbar').css({ top: tabHeight + 'px', display: 'block' }), 'height');
                    }
                }
                $(tmp2 + 'content').css({ display: 'block' }).css({ top: tabHeight + 'px' });
            }
            // send resize to all objects
            clearTimeout(this._resize_timer);
            this._resize_timer = setTimeout(function () {
                for (var e in w2ui) {
                    if (typeof w2ui[e].resize == 'function') {
                        // sent to all none-layouts
                        if (w2ui[e].panels == 'undefined') w2ui[e].resize();
                        // only send to nested layouts
                        var parent = $(w2ui[e].box).parents('.w2ui-layout');
                        if (parent.length > 0 && parent.attr('name') == obj.name) w2ui[e].resize();
                    }
                }
            }, 100);
            this.trigger($.extend(eventData, { phase: 'after' }));
            return (new Date()).getTime() - time;
        },

        destroy: function () {
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'destroy', target: this.name });
            if (eventData.isCancelled === true) return;
            if (typeof w2ui[this.name] == 'undefined') return false;
            // clean up
            if ($(this.box).find('#layout_'+ this.name +'_panel_main').length > 0) {
                $(this.box)
                    .removeAttr('name')
                    .removeClass('w2ui-layout')
                    .html('');
            }
            delete w2ui[this.name];
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            if (this.tmp.events && this.tmp.events.resize) $(window).off('resize', this.tmp.events.resize);
            return true;
        },

        lock: function (panel, msg, showSpinner) {
            if (w2layout_panels.indexOf(panel) == -1) {
                console.log('ERROR: First parameter needs to be the a valid panel name.');
                return;
            }
            var args = Array.prototype.slice.call(arguments, 0);
            args[0]  = '#layout_'+ this.name + '_panel_' + panel;
            w2utils.lock.apply(window, args);
        },

        unlock: function (panel) {
            if (w2layout_panels.indexOf(panel) == -1) {
                console.log('ERROR: First parameter needs to be the a valid panel name.');
                return;
            }
            var nm = '#layout_'+ this.name + '_panel_' + panel;
            w2utils.unlock(nm);
        }
    };

    $.extend(w2layout.prototype, w2utils.event);
    w2obj.layout = w2layout;
})();

/************************************************************************
*   Library: Web 2.0 UI for jQuery (using prototypical inheritance)
*   - Following objects defined
*        - w2popup      - popup widget
*        - $().w2popup  - jQuery wrapper
*   - Dependencies: jQuery, w2utils
*
* == NICE TO HAVE ==
*   - transition should include title, body and buttons, not just body
*
************************************************************************/

var w2popup = {};

(function () {

    // ====================================================
    // -- Registers as a jQuery plugin

    $.fn.w2popup = function(method, options) {
        if (typeof method === 'undefined') {
            options = {};
            method  = 'open';
        }
        if ($.isPlainObject(method)) {
            options = method;
            method  = 'open';
        }
        method = method.toLowerCase();
        if (method === 'load' && typeof options === 'string') {
            options = $.extend({ url: options }, arguments.length > 2 ? arguments[2] : {});
        }
        if (method === 'open' && options.url != null) method = 'load';
        options = options || {};
        // load options from markup
        var dlgOptions = {};
        if ($(this).length > 0) {
            if ($(this).find('div[rel=title], div[rel=body], div[rel=buttons]').length > 0) {
                if ($(this).find('div[rel=title]').length > 0) {
                    dlgOptions['title'] = $(this).find('div[rel=title]').html();
                }
                if ($(this).find('div[rel=body]').length > 0) {
                    dlgOptions['body']  = $(this).find('div[rel=body]').html();
                    dlgOptions['style'] = $(this).find('div[rel=body]')[0].style.cssText;
                }
                if ($(this).find('div[rel=buttons]').length > 0) {
                    dlgOptions['buttons'] = $(this).find('div[rel=buttons]').html();
                }
            } else {
                dlgOptions['title'] = '&nbsp;';
                dlgOptions['body']  = $(this).html();
            }
            if (parseInt($(this).css('width')) != 0)  dlgOptions['width']  = parseInt($(this).css('width'));
            if (parseInt($(this).css('height')) != 0) dlgOptions['height'] = parseInt($(this).css('height'));
        }
        // show popup
        return w2popup[method]($.extend({}, dlgOptions, options));
    };

    // ====================================================
    // -- Implementation of core functionality (SINGELTON)

    w2popup = {
        defaults: {
            title     : '',
            body      : '',
            buttons   : '',
            style     : '',
            color     : '#000',
            opacity   : 0.4,
            speed     : 0.3,
            modal     : false,
            maximized : false,
            keyboard  : true,     // will close popup on esc if not modal
            width     : 500,
            height    : 300,
            showClose : true,
            showMax   : false,
            transition: null
        },
        status    : 'closed',     // string that describes current status
        handlers  : [],
        onOpen    : null,
        onClose   : null,
        onMax     : null,
        onMin     : null,
        onToggle  : null,
        onKeydown : null,

        open: function (options) {
            var obj = this;
            if (w2popup.status == 'closing') {
                setTimeout(function () { obj.open.call(obj, options); }, 100);
                return;
            }
            // get old options and merge them
            var old_options = $('#w2ui-popup').data('options');
            var options = $.extend({}, this.defaults, old_options, { title: '', body : '', buttons: '' }, options, { maximized: false });
            // need timer because popup might not be open
            setTimeout(function () { $('#w2ui-popup').data('options', options); }, 100);
            // if new - reset event handlers
            if ($('#w2ui-popup').length == 0) {
                w2popup.handlers  = [];
                w2popup.onMax     = null;
                w2popup.onMin     = null;
                w2popup.onToggle  = null;
                w2popup.onOpen    = null;
                w2popup.onClose   = null;
                w2popup.onKeydown = null;
            }
            if (options.onOpen)    w2popup.onOpen    = options.onOpen;
            if (options.onClose)   w2popup.onClose   = options.onClose;
            if (options.onMax)     w2popup.onMax     = options.onMax;
            if (options.onMin)     w2popup.onMin     = options.onMin;
            if (options.onToggle)  w2popup.onToggle  = options.onToggle;
            if (options.onKeydown) w2popup.onKeydown = options.onKeydown;

            if (window.innerHeight == undefined) {
                var width  = document.documentElement.offsetWidth;
                var height = document.documentElement.offsetHeight;
                if (w2utils.engine === 'IE7') { width += 21; height += 4; }
            } else {
                var width  = window.innerWidth;
                var height = window.innerHeight;
            }
            if (parseInt(width)  - 10 < parseInt(options.width))  options.width  = parseInt(width)  - 10;
            if (parseInt(height) - 10 < parseInt(options.height)) options.height = parseInt(height) - 10;
            var top  = parseInt(((parseInt(height) - parseInt(options.height)) / 2) * 0.6);
            var left = parseInt((parseInt(width) - parseInt(options.width)) / 2);
            // check if message is already displayed
            if ($('#w2ui-popup').length == 0) {
                // trigger event
                var eventData = this.trigger({ phase: 'before', type: 'open', target: 'popup', options: options, present: false });
                if (eventData.isCancelled === true) return;
                w2popup.status = 'opening';
                // output message
                w2popup.lockScreen(options);
                var btn = '';
                if (options.showClose) {
                    btn += '<div class="w2ui-msg-button w2ui-msg-close" onmousedown="event.stopPropagation()" onclick="w2popup.close()">Close</div>';
                }
                if (options.showMax) {
                    btn += '<div class="w2ui-msg-button w2ui-msg-max" onmousedown="event.stopPropagation()" onclick="w2popup.toggle()">Max</div>';
                }
                var msg='<div id="w2ui-popup" class="w2ui-popup" style="opacity: 0; left: '+ left +'px; top: '+ top +'px;'+
                        '     width: ' + parseInt(options.width) + 'px; height: ' + parseInt(options.height) + 'px; '+
                        '    -webkit-transform: scale(0.8); -moz-transform: scale(0.8); -ms-transform: scale(0.8); -o-transform: scale(0.8); "'+
                        '>'+
                        '   <div class="w2ui-msg-title" style="'+ (options.title == '' ? 'display: none' : '') +'">' + btn + options.title + '</div>'+
                        '   <div class="w2ui-box1" style="'+ (options.title == '' ? 'top: 0px !important;' : '') +
                                    (options.buttons == '' ? 'bottom: 0px !important;' : '') + '">'+
                        '       <div class="w2ui-msg-body' + (!options.title != '' ? ' w2ui-msg-no-title' : '') +
                                    (!options.buttons != '' ? ' w2ui-msg-no-buttons' : '') + '" style="' + options.style + '">' + options.body + '</div>'+
                        '   </div>'+
                        '   <div class="w2ui-box2" style="' + (options.title == '' ? 'top: 0px !important;' : '') +
                                    (options.buttons == '' ? 'bottom: 0px !important;' : '') + '">'+
                        '       <div class="w2ui-msg-body' + (!options.title != '' ? ' w2ui-msg-no-title' : '') +
                                    (!options.buttons != '' ? ' w2ui-msg-no-buttons' : '') + '" style="' + options.style + '"></div>'+
                        '       </div>'+
                        '   <div class="w2ui-msg-buttons" style="'+ (options.buttons == '' ? 'display: none' : '') +'">' + options.buttons + '</div>'+
                        '</div>';
                $('body').append(msg);
                // allow element to render
                setTimeout(function () {
                    $('#w2ui-popup .w2ui-box2').hide();
                    $('#w2ui-popup').css({
                        '-webkit-transition': options.speed + 's opacity, ' + options.speed + 's -webkit-transform',
                        '-webkit-transform': 'scale(1)',
                        '-moz-transition': options.speed + 's opacity, ' + options.speed + 's -moz-transform',
                        '-moz-transform': 'scale(1)',
                        '-ms-transition': options.speed + 's opacity, ' + options.speed + 's -ms-transform',
                        '-ms-transform': 'scale(1)',
                        '-o-transition': options.speed + 's opacity, ' + options.speed + 's -o-transform',
                        '-o-transform': 'scale(1)',
                        'opacity': '1'
                    });
                }, 1);
                // clean transform
                setTimeout(function () {
                    $('#w2ui-popup').css({
                        '-webkit-transform': '',
                        '-moz-transform': '',
                        '-ms-transform': '',
                        '-o-transform': ''
                    });
                    // event after
                    w2popup.status = 'open';
                    setTimeout(function () {
                        obj.trigger($.extend(eventData, { phase: 'after' }));
                    }, 100);
                }, options.speed * 1000);
            } else {
                // trigger event
                var eventData = this.trigger({ phase: 'before', type: 'open', target: 'popup', options: options, present: true });
                if (eventData.isCancelled === true) return;
                // check if size changed
                w2popup.status = 'opening';
                if (typeof old_options == 'undefined' || old_options['width'] != options['width'] || old_options['height'] != options['height']) {
                    w2popup.resize(options.width, options.height);
                }
                if (typeof old_options != 'undefined') {
                    options.prevSize  = options.width + ':' + options.height;
                    options.maximized = old_options.maximized;
                }
                // show new items
                var body = $('#w2ui-popup .w2ui-box2 > .w2ui-msg-body').html(options.body);
                if (body.length > 0) body[0].style.cssText = options.style;
                if (options.buttons != '') {
                    $('#w2ui-popup .w2ui-msg-buttons').show().html(options.buttons);
                    $('#w2ui-popup .w2ui-msg-body').removeClass('w2ui-msg-no-buttons');
                    $('#w2ui-popup .w2ui-box1, #w2ui-popup .w2ui-box2').css('bottom', '');
                } else {
                    $('#w2ui-popup .w2ui-msg-buttons').hide().html('');
                    $('#w2ui-popup .w2ui-msg-body').addClass('w2ui-msg-no-buttons');
                    $('#w2ui-popup .w2ui-box1, #w2ui-popup .w2ui-box2').css('bottom', '0px');
                }
                if (options.title != '') {
                    $('#w2ui-popup .w2ui-msg-title').show().html(
                          (options.showClose ? '<div class="w2ui-msg-button w2ui-msg-close" onmousedown="event.stopPropagation()" onclick="w2popup.close()">Close</div>' : '') +
                          (options.showMax ? '<div class="w2ui-msg-button w2ui-msg-max" onmousedown="event.stopPropagation()" onclick="w2popup.toggle()">Max</div>' : '') +
                          options.title);
                    $('#w2ui-popup .w2ui-msg-body').removeClass('w2ui-msg-no-title');
                    $('#w2ui-popup .w2ui-box1, #w2ui-popup .w2ui-box2').css('top', '');
                } else {
                    $('#w2ui-popup .w2ui-msg-title').hide().html('');
                    $('#w2ui-popup .w2ui-msg-body').addClass('w2ui-msg-no-title');
                    $('#w2ui-popup .w2ui-box1, #w2ui-popup .w2ui-box2').css('top', '0px');
                }
                // transition
                var div_old = $('#w2ui-popup .w2ui-box1')[0];
                var div_new = $('#w2ui-popup .w2ui-box2')[0];
                w2utils.transition(div_old, div_new, options.transition);
                div_new.className = 'w2ui-box1';
                div_old.className = 'w2ui-box2';
                $(div_new).addClass('w2ui-current-box');
                // remove max state
                $('#w2ui-popup').data('prev-size', null);
                // call event onChange
                setTimeout(function () {
                    w2popup.status = 'open';
                    obj.trigger($.extend(eventData, { phase: 'after' }));
                }, 100);
            }
            // save new options
            options._last_w2ui_name = w2utils.keyboard.active();
            w2utils.keyboard.active(null);
            // keyboard events
            if (options.keyboard) $(document).on('keydown', this.keydown);

            // initialize move
            var tmp = {
                resizing : false,
                mvMove   : mvMove,
                mvStop   : mvStop
            };
            $('#w2ui-popup .w2ui-msg-title').on('mousedown', function (event) { mvStart(event); })

            // handlers
            function mvStart(evnt) {
                if (!evnt) evnt = window.event;
                if (!window.addEventListener) { window.document.attachEvent('onselectstart', function() { return false; } ); }
                w2popup.status = 'moving';
                tmp.resizing = true;
                tmp.x = evnt.screenX;
                tmp.y = evnt.screenY;
                tmp.pos_x = $('#w2ui-popup').position().left;
                tmp.pos_y = $('#w2ui-popup').position().top;
                w2popup.lock({ opacity: 0 });
                $(document).on('mousemove', tmp.mvMove);
                $(document).on('mouseup', tmp.mvStop);
                if (evnt.stopPropagation) evnt.stopPropagation(); else evnt.cancelBubble = true;
                if (evnt.preventDefault) evnt.preventDefault(); else return false;
            }

            function mvMove(evnt) {
                if (tmp.resizing != true) return;
                if (!evnt) evnt = window.event;
                tmp.div_x = evnt.screenX - tmp.x;
                tmp.div_y = evnt.screenY - tmp.y;
                $('#w2ui-popup').css({
                    '-webkit-transition': 'none',
                    '-webkit-transform': 'translate3d('+ tmp.div_x +'px, '+ tmp.div_y +'px, 0px)',
                    '-moz-transition': 'none',
                    '-moz-transform': 'translate('+ tmp.div_x +'px, '+ tmp.div_y +'px)',
                    '-ms-transition': 'none',
                    '-ms-transform': 'translate('+ tmp.div_x +'px, '+ tmp.div_y +'px)',
                    '-o-transition': 'none',
                    '-o-transform': 'translate('+ tmp.div_x +'px, '+ tmp.div_y +'px)'
                });
            }

            function mvStop(evnt) {
                if (tmp.resizing != true) return;
                if (!evnt) evnt = window.event;
                w2popup.status = 'open';
                tmp.div_x = (evnt.screenX - tmp.x);
                tmp.div_y = (evnt.screenY - tmp.y);
                $('#w2ui-popup').css({
                    'left': (tmp.pos_x + tmp.div_x) + 'px',
                    'top':    (tmp.pos_y  + tmp.div_y) + 'px',
                    '-webkit-transition': 'none',
                    '-webkit-transform': 'translate3d(0px, 0px, 0px)',
                    '-moz-transition': 'none',
                    '-moz-transform': 'translate(0px, 0px)',
                    '-ms-transition': 'none',
                    '-ms-transform': 'translate(0px, 0px)',
                    '-o-transition': 'none',
                    '-o-transform': 'translate(0px, 0px)'
                });
                tmp.resizing = false;
                $(document).off('mousemove', tmp.mvMove);
                $(document).off('mouseup', tmp.mvStop);
                w2popup.unlock();
            }
            return this;
        },

        keydown: function (event) {
            var options = $('#w2ui-popup').data('options');
            if (!options || !options.keyboard) return;
            // trigger event
            var eventData = w2popup.trigger({ phase: 'before', type: 'keydown', target: 'popup', options: options, originalEvent: event });
            if (eventData.isCancelled === true) return;
            // default behavior
            switch (event.keyCode) {
                case 27:
                    event.preventDefault();
                    if ($('#w2ui-popup .w2ui-popup-message').length > 0) w2popup.message(); else w2popup.close();
                    break;
            }
            // event after
            w2popup.trigger($.extend(eventData, { phase: 'after'}));
        },

        close: function (options) {
            var obj = this;
            var options = $.extend({}, $('#w2ui-popup').data('options'), options);
            if ($('#w2ui-popup').length == 0) return;
            // trigger event
            var eventData = this.trigger({ phase: 'before', type: 'close', target: 'popup', options: options });
            if (eventData.isCancelled === true) return;
            // default behavior
            w2popup.status = 'closing';
            $('#w2ui-popup').css({
                '-webkit-transition': options.speed + 's opacity, ' + options.speed + 's -webkit-transform',
                '-webkit-transform': 'scale(0.9)',
                '-moz-transition': options.speed + 's opacity, ' + options.speed + 's -moz-transform',
                '-moz-transform': 'scale(0.9)',
                '-ms-transition': options.speed + 's opacity, ' + options.speed + 's -ms-transform',
                '-ms-transform': 'scale(0.9)',
                '-o-transition': options.speed + 's opacity, ' + options.speed + 's -o-transform',
                '-o-transform': 'scale(0.9)',
                'opacity': '0'
            });
            w2popup.unlockScreen(options);
            setTimeout(function () {
                $('#w2ui-popup').remove();
                w2popup.status = 'closed';
                // event after
                obj.trigger($.extend(eventData, { phase: 'after'}));
            }, options.speed * 1000);
            // restore active
            w2utils.keyboard.active(options._last_w2ui_name);
            // remove keyboard events
            if (options.keyboard) $(document).off('keydown', this.keydown);
        },

        toggle: function () {
            var obj     = this;
            var options = $('#w2ui-popup').data('options');
            // trigger event
            var eventData = this.trigger({ phase: 'before', type: 'toggle', target: 'popup', options: options });
            if (eventData.isCancelled === true) return;
            // defatul action
            if (options.maximized === true) w2popup.min(); else w2popup.max();
            // event after
            setTimeout(function () {
                obj.trigger($.extend(eventData, { phase: 'after'}));
            }, (options.speed * 1000) + 50);
        },

        max: function () {
            var obj = this;
            var options = $('#w2ui-popup').data('options');
            if (options.maximized === true) return;
            // trigger event
            var eventData = this.trigger({ phase: 'before', type: 'max', target: 'popup', options: options });
            if (eventData.isCancelled === true) return;
            // default behavior
            w2popup.status   = 'resizing';
            options.prevSize = $('#w2ui-popup').css('width') + ':' + $('#w2ui-popup').css('height');
            // do resize
            w2popup.resize(10000, 10000, function () {
                w2popup.status    = 'open';
                options.maximized = true;
                obj.trigger($.extend(eventData, { phase: 'after'}));
            });
        },

        min: function () {
            var obj = this;
            var options = $('#w2ui-popup').data('options');
            if (options.maximized !== true) return;
            var size = options.prevSize.split(':');
            // trigger event
            var eventData = this.trigger({ phase: 'before', type: 'min', target: 'popup', options: options });
            if (eventData.isCancelled === true) return;
            // default behavior
            w2popup.status = 'resizing';
            // do resize
            w2popup.resize(size[0], size[1], function () {
                w2popup.status = 'open';
                options.maximized = false;
                options.prevSize  = null;
                obj.trigger($.extend(eventData, { phase: 'after'}));
            });
        },

        get: function () {
            return $('#w2ui-popup').data('options');
        },

        set: function (options) {
            w2popup.open(options);
        },

        clear: function() {
            $('#w2ui-popup .w2ui-msg-title').html('');
            $('#w2ui-popup .w2ui-msg-body').html('');
            $('#w2ui-popup .w2ui-msg-buttons').html('');
        },

        reset: function () {
            w2popup.open(w2popup.defaults);
        },

        load: function (options) {
            w2popup.status = 'loading';
            if (String(options.url) == 'undefined') {
                console.log('ERROR: The url parameter is empty.');
                return;
            }
            var tmp = String(options.url).split('#');
            var url = tmp[0];
            var selector = tmp[1];
            if (String(options) == 'undefined') options = {};
            // load url
            var html = $('#w2ui-popup').data(url);
            if (typeof html != 'undefined' && html != null) {
                popup(html, selector);
            } else {
                $.get(url, function (data, status, obj) { // should always be $.get as it is template
                    popup(obj.responseText, selector);
                    $('#w2ui-popup').data(url, obj.responseText); // remember for possible future purposes
                });
            }
            function popup(html, selector) {
                delete options.url;
                $('body').append('<div id="w2ui-tmp" style="display: none">' + html + '</div>');
                if (typeof selector != 'undefined' && $('#w2ui-tmp #'+selector).length > 0) {
                    $('#w2ui-tmp #' + selector).w2popup(options);
                } else {
                    $('#w2ui-tmp > div').w2popup(options);
                }
                // link styles
                if ($('#w2ui-tmp > style').length > 0) {
                    var style = $('<div>').append($('#w2ui-tmp > style').clone()).html();
                    if ($('#w2ui-popup #div-style').length == 0) {
                        $('#w2ui-popup').append('<div id="div-style" style="position: absolute; left: -100; width: 1px"></div>');
                    }
                    $('#w2ui-popup #div-style').html(style);
                }
                $('#w2ui-tmp').remove();
            }
        },

        message: function (options) {
            $().w2tag(); // hide all tags
            if (!options) options = { width: 200, height: 100 };
            if (parseInt(options.width) < 10)  options.width  = 10;
            if (parseInt(options.height) < 10) options.height = 10;
            if (typeof options.hideOnClick == 'undefined') options.hideOnClick = false;
            var poptions = $('#w2ui-popup').data('options') || {};
            if (typeof options.width == 'undefined' || options.width > poptions.width - 10) options.width = poptions.width - 10;
            if (typeof options.height == 'undefined' || options.height > poptions.height - 40) options.height = poptions.height - 40; // title is 30px or so

            var head     = $('#w2ui-popup .w2ui-msg-title');
            var pwidth   = parseInt($('#w2ui-popup').width());
            var msgCount = $('#w2ui-popup .w2ui-popup-message').length;
            // remove message
            if ($.trim(options.html) == '') {
                $('#w2ui-popup #w2ui-message'+ (msgCount-1)).css('z-Index', 250);
                var options = $('#w2ui-popup #w2ui-message'+ (msgCount-1)).data('options') || {};
                $('#w2ui-popup #w2ui-message'+ (msgCount-1)).remove();
                if (typeof options.onClose == 'function') options.onClose();
                if (msgCount == 1) {
                    w2popup.unlock();
                } else {
                    $('#w2ui-popup #w2ui-message'+ (msgCount-2)).show();
                }
            } else {
                // hide previous messages
                $('#w2ui-popup .w2ui-popup-message').hide();
                // add message
                $('#w2ui-popup .w2ui-box1')
                    .before('<div id="w2ui-message' + msgCount + '" class="w2ui-popup-message" style="display: none; ' +
                                (head.length == 0 ? 'top: 0px;' : 'top: ' + w2utils.getSize(head, 'height') + 'px;') +
                                (typeof options.width  != 'undefined' ? 'width: ' + options.width + 'px; left: ' + ((pwidth - options.width) / 2) + 'px;' : 'left: 10px; right: 10px;') +
                                (typeof options.height != 'undefined' ? 'height: ' + options.height + 'px;' : 'bottom: 6px;') +
                                '-webkit-transition: .3s; -moz-transition: .3s; -ms-transition: .3s; -o-transition: .3s;"' +
                                (options.hideOnClick === true ? 'onclick="w2popup.message();"' : '') + '>' +
                            '</div>');
                $('#w2ui-popup #w2ui-message'+ msgCount).data('options', options);
                var display = $('#w2ui-popup #w2ui-message'+ msgCount).css('display');
                $('#w2ui-popup #w2ui-message'+ msgCount).css({
                    '-webkit-transform': (display == 'none' ? 'translateY(-' + options.height + 'px)' : 'translateY(0px)'),
                    '-moz-transform': (display == 'none' ? 'translateY(-' + options.height + 'px)' : 'translateY(0px)'),
                    '-ms-transform': (display == 'none' ? 'translateY(-' + options.height + 'px)' : 'translateY(0px)'),
                    '-o-transform': (display == 'none' ? 'translateY(-' + options.height + 'px)' : 'translateY(0px)')
                });
                if (display == 'none') {
                    $('#w2ui-popup #w2ui-message'+ msgCount).show().html(options.html);
                    // timer needs to animation
                    setTimeout(function () {
                        $('#w2ui-popup #w2ui-message'+ msgCount).css({
                            '-webkit-transform': (display == 'none' ? 'translateY(0px)' : 'translateY(-' + options.height + 'px)'),
                            '-moz-transform': (display == 'none' ? 'translateY(0px)' : 'translateY(-' + options.height + 'px)'),
                            '-ms-transform': (display == 'none' ? 'translateY(0px)' : 'translateY(-' + options.height + 'px)'),
                            '-o-transform': (display == 'none' ? 'translateY(0px)' : 'translateY(-' + options.height + 'px)')
                        });
                    }, 1);
                    // timer for lock
                    setTimeout(function() {
                        $('#w2ui-popup #w2ui-message'+ msgCount).css({
                            '-webkit-transition': '0s',    '-moz-transition': '0s', '-ms-transition': '0s', '-o-transition': '0s',
                            'z-Index': 1500
                        }); // has to be on top of lock
                        if (msgCount == 0) w2popup.lock();
                        if (typeof options.onOpen == 'function') options.onOpen();
                    }, 300);
                }
            }
        },

        lock: function (msg, showSpinner) {
            var args = Array.prototype.slice.call(arguments, 0);
            args.unshift($('#w2ui-popup'));
            w2utils.lock.apply(window, args);
        },

        unlock: function () {
            w2utils.unlock($('#w2ui-popup'));
        },

        // --- INTERNAL FUNCTIONS

        lockScreen: function (options) {
            if ($('#w2ui-lock').length > 0) return false;
            if (typeof options == 'undefined') options = $('#w2ui-popup').data('options');
            if (typeof options == 'undefined') options = {};
            options = $.extend({}, w2popup.defaults, options);
            // show element
            $('body').append('<div id="w2ui-lock" ' +
                '    onmousewheel="if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true; if (event.preventDefault) event.preventDefault(); else return false;"'+
                '    style="position: ' + (w2utils.engine == 'IE5' ? 'absolute' : 'fixed') + '; z-Index: 1199; left: 0px; top: 0px; ' +
                '           padding: 0px; margin: 0px; background-color: ' + options.color + '; width: 100%; height: 100%; opacity: 0;"></div>');
            // lock screen
            setTimeout(function () {
                $('#w2ui-lock').css({
                    '-webkit-transition': options.speed + 's opacity',
                    '-moz-transition': options.speed + 's opacity',
                    '-ms-transition': options.speed + 's opacity',
                    '-o-transition': options.speed + 's opacity',
                    'opacity': options.opacity
                });
            }, 1);
            // add events
            if (options.modal == true) {
                $('#w2ui-lock').on('mousedown', function () {
                    $('#w2ui-lock').css({
                        '-webkit-transition': '.1s',
                        '-moz-transition': '.1s',
                        '-ms-transition': '.1s',
                        '-o-transition': '.1s',
                        'opacity': '0.6'
                    });
                    // if (window.getSelection) window.getSelection().removeAllRanges();
                });
                $('#w2ui-lock').on('mouseup', function () {
                    setTimeout(function () {
                        $('#w2ui-lock').css({
                            '-webkit-transition': '.1s',
                            '-moz-transition': '.1s',
                            '-ms-transition': '.1s',
                            '-o-transition': '.1s',
                            'opacity': options.opacity
                        });
                    }, 100);
                    // if (window.getSelection) window.getSelection().removeAllRanges();
                });
            } else {
                $('#w2ui-lock').on('mouseup', function () { w2popup.close(); });
            }
            return true;
        },

        unlockScreen: function (options) {
            if ($('#w2ui-lock').length == 0) return false;
            if (typeof options == 'undefined') options = $('#w2ui-popup').data('options');
            if (typeof options == 'undefined') options = {};
            options = $.extend({}, w2popup.defaults, options);
            $('#w2ui-lock').css({
                '-webkit-transition': options.speed + 's opacity',
                '-moz-transition': options.speed + 's opacity',
                '-ms-transition': options.speed + 's opacity',
                '-o-transition': options.speed + 's opacity',
                'opacity': 0
            });
            setTimeout(function () {
                $('#w2ui-lock').remove();
            }, options.speed * 1000);
            return true;
        },

        resize: function (width, height, callBack) {
            var options = $('#w2ui-popup').data('options');
            // calculate new position
            if (parseInt($(window).width())  - 10 < parseInt(width))  width  = parseInt($(window).width())  - 10;
            if (parseInt($(window).height()) - 10 < parseInt(height)) height = parseInt($(window).height()) - 10;
            var top  = ((parseInt($(window).height()) - parseInt(height)) / 2) * 0.8;
            var left = (parseInt($(window).width()) - parseInt(width)) / 2;
            // resize there
            $('#w2ui-popup').css({
                '-webkit-transition': options.speed + 's width, ' + options.speed + 's height, ' + options.speed + 's left, ' + options.speed + 's top',
                '-moz-transition': options.speed + 's width, ' + options.speed + 's height, ' + options.speed + 's left, ' + options.speed + 's top',
                '-ms-transition': options.speed + 's width, ' + options.speed + 's height, ' + options.speed + 's left, ' + options.speed + 's top',
                '-o-transition': options.speed + 's width, ' + options.speed + 's height, ' + options.speed + 's left, ' + options.speed + 's top',
                'top': top,
                'left': left,
                'width': width,
                'height': height
            });
            setTimeout(function () {
                options.width  = width;
                options.height = height;
                if (typeof callBack == 'function') callBack();
            }, (options.speed * 1000) + 50); // give extra 50 ms
        }
    }

    // merge in event handling
    $.extend(w2popup, w2utils.event);

})();

// ============================================
// --- Common dialogs

var w2alert = function (msg, title, callBack) {
    if (title == null) title = w2utils.lang('Notification');
    if ($('#w2ui-popup').length > 0 && w2popup.status != 'closing') {
        w2popup.message({
            width   : 400,
            height  : 170,
            html    : '<div style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 45px; overflow: auto">' +
                      '        <div class="w2ui-centered" style="font-size: 13px;">' + msg + '</div>' +
                      '</div>' +
                      '<div style="position: absolute; bottom: 7px; left: 0px; right: 0px; text-align: center; padding: 5px">' +
                      '        <button onclick="w2popup.message();" class="w2ui-popup-btn w2ui-btn">' + w2utils.lang('Ok') + '</button>' +
                      '</div>',
            onClose : function () {
                if (typeof callBack == 'function') callBack();
            }
        });
    } else {
        w2popup.open({
            width     : 450,
            height    : 220,
            showMax   : false,
            showClose : false,
            title     : title,
            body      : '<div class="w2ui-centered" style="font-size: 13px;">' + msg + '</div>',
            buttons   : '<button onclick="w2popup.close();" class="w2ui-popup-btn w2ui-btn">' + w2utils.lang('Ok') + '</button>',
            onClose   : function () {
                if (typeof callBack == 'function') callBack();
            }
        });
    }
};

var w2confirm = function (msg, title, callBack) {
    var options  = {};
    var defaults = {
        msg         : '',
        title       : w2utils.lang('Confirmation'),
        width       : ($('#w2ui-popup').length > 0 ? 400 : 450),
        height      : ($('#w2ui-popup').length > 0 ? 170 : 220),
        yes_text    : 'Yes',
        yes_class   : '',
        yes_style   : '',
        yes_callBack: null,
        no_text     : 'No',
        no_class    : '',
        no_style    : '',
        no_callBack : null,
        callBack    : null
    };
    if (arguments.length == 1 && typeof msg == 'object') {
        $.extend(options, defaults, msg);
    } else {
        if (typeof title == 'function') {
            $.extend(options, defaults, {
                msg     : msg,
                callBack: title
            })
        } else {
            $.extend(options, defaults, {
                msg     : msg,
                title   : title,
                callBack: callBack
            })
        }
    }
    if ($('#w2ui-popup').length > 0 && w2popup.status != 'closing') {
        if (options.width > w2popup.get().width) options.width = w2popup.get().width;
        if (options.height > (w2popup.get().height - 50)) options.height = w2popup.get().height - 50;
          w2popup.message({
            width   : options.width,
            height  : options.height,
            html    : '<div style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 40px; overflow: auto">' +
                      '        <div class="w2ui-centered" style="font-size: 13px;">' + options.msg + '</div>' +
                      '</div>' +
                      '<div style="position: absolute; bottom: 7px; left: 0px; right: 0px; text-align: center; padding: 5px">' +
                      '        <button id="Yes" class="w2ui-popup-btn w2ui-btn '+ options.yes_class +'" style="'+ options.yes_style +'">' + w2utils.lang(options.yes_text) + '</button>' +
                      '        <button id="No" class="w2ui-popup-btn w2ui-btn '+ options.no_class +'" style="'+ options.no_style +'">' + w2utils.lang(options.no_text) + '</button>' +
                      '</div>',
            onOpen: function () {
                $('#w2ui-popup .w2ui-popup-message .w2ui-btn').on('click', function (event) {
                    w2popup.message();
                    if (typeof options.callBack == 'function') options.callBack(event.target.id);
                    if (event.target.id == 'Yes' && typeof options.yes_callBack == 'function') options.yes_callBack();
                    if (event.target.id == 'No'  && typeof options.no_callBack == 'function') options.no_callBack();
                });
            },
            onKeydown: function (event) {
                switch (event.originalEvent.keyCode) {
                    case 13: // enter
                        if (typeof options.callBack == 'function') options.callBack('Yes');
                        if (typeof options.yes_callBack == 'function') options.yes_callBack();
                        w2popup.message();
                        break
                    case 27: // esc
                        if (typeof options.callBack == 'function') options.callBack('No');
                        if (typeof options.no_callBack == 'function') options.no_callBack();
                        w2popup.message();
                        break
                }
            }
        });

    } else {

        if (!w2utils.isInt(options.height)) options.height = options.height + 50;
        w2popup.open({
            width      : options.width,
            height     : options.height,
            title      : options.title,
            modal      : true,
            showClose  : false,
            body       : '<div class="w2ui-centered" style="font-size: 13px;">' + options.msg + '</div>',
            buttons    : '<button id="Yes" class="w2ui-popup-btn w2ui-btn '+ options.yes_class +'" style="'+ options.yes_style +'">'+ w2utils.lang(options.yes_text) +'</button>'+
                         '<button id="No" class="w2ui-popup-btn w2ui-btn '+ options.no_class +'" style="'+ options.no_style +'">'+ w2utils.lang(options.no_text) +'</button>',
            onOpen: function (event) {
                event.onComplete = function () {
                    $('#w2ui-popup .w2ui-popup-btn').on('click', function (event) {
                        w2popup.close();
                        if (typeof options.callBack == 'function') options.callBack(event.target.id);
                        if (event.target.id == 'Yes' && typeof options.yes_callBack == 'function') options.yes_callBack();
                        if (event.target.id == 'No'  && typeof options.no_callBack == 'function') options.no_callBack();
                    });
                }
            },
            onKeydown: function (event) {
                switch (event.originalEvent.keyCode) {
                    case 13: // enter
                        if (typeof options.callBack == 'function') options.callBack('Yes');
                        if (typeof options.yes_callBack == 'function') options.yes_callBack();
                        w2popup.close();
                        break
                    case 27: // esc
                        if (typeof options.callBack == 'function') options.callBack('No');
                        if (typeof options.no_callBack == 'function') options.no_callBack();
                        w2popup.close();
                        break
                }
            }
        });
    }

    return {
        yes: function (fun) {
            options.yes_callBack = fun;
            return this;
        },
        no: function (fun) {
            options.no_callBack = fun;
            return this;
        }
    };
};
/************************************************************************
*   Library: Web 2.0 UI for jQuery (using prototypical inheritance)
*   - Following objects defined
*        - w2tabs        - tabs widget
*        - $().w2tabs    - jQuery wrapper
*   - Dependencies: jQuery, w2utils
*
* == NICE TO HAVE ==
*   - on overflow display << >>
*
************************************************************************/

(function () {
    var w2tabs = function (options) {
        this.box       = null;      // DOM Element that holds the element
        this.name      = null;      // unique name for w2ui
        this.active    = null;
        this.tabs      = [];
        this.routeData = {};        // data for dynamic routes
        this.right     = '';
        this.style     = '';
        this.onClick   = null;
        this.onClose   = null;
        this.onRender  = null;
        this.onRefresh = null;
        this.onResize  = null;
        this.onDestroy = null;

        $.extend(this, { handlers: [] });
        $.extend(true, this, w2obj.tabs, options);
    };

    // ====================================================
    // -- Registers as a jQuery plugin

    $.fn.w2tabs = function(method) {
        if (typeof method === 'object' || !method ) {
            // check name parameter
            if (!w2utils.checkName(method, 'w2tabs')) return;
            // extend tabs
            var tabs   = method.tabs || [];
            var object = new w2tabs(method);
            for (var i = 0; i < tabs.length; i++) {
                object.tabs[i] = $.extend({}, w2tabs.prototype.tab, tabs[i]);
            }
            if ($(this).length !== 0) {
                object.render($(this)[0]);
            }
            // register new object
            w2ui[object.name] = object;
            return object;
        } else if (w2ui[$(this).attr('name')]) {
            var obj = w2ui[$(this).attr('name')];
            obj[method].apply(obj, Array.prototype.slice.call(arguments, 1));
            return this;
        } else {
            console.log('ERROR: Method ' +  method + ' does not exist on jQuery.w2tabs' );
            return undefined;
        }
    };

    // ====================================================
    // -- Implementation of core functionality

    w2tabs.prototype = {
        tab : {
            id        : null,        // command to be sent to all event handlers
            text      : '',
            route     : null,
            hidden    : false,
            disabled  : false,
            closable  : false,
            hint      : '',
            onClick   : null,
            onRefresh : null,
            onClose   : null
        },

        add: function (tab) {
            return this.insert(null, tab);
        },

        insert: function (id, tab) {
            if (!$.isArray(tab)) tab = [tab];
            // assume it is array
            for (var i = 0; i < tab.length; i++) {
                // checks
                if (typeof tab[i].id === 'undefined') {
                    console.log('ERROR: The parameter "id" is required but not supplied. (obj: '+ this.name +')');
                    return;
                }
                if (!w2utils.checkUniqueId(tab[i].id, this.tabs, 'tabs', this.name)) return;
                // add tab
                var newTab = $.extend({}, w2tabs.prototype.tab, tab[i]);
                if (id === null || typeof id === 'undefined') {
                    this.tabs.push(newTab);
                } else {
                    var middle = this.get(id, true);
                    this.tabs = this.tabs.slice(0, middle).concat([newTab], this.tabs.slice(middle));
                }
                this.refresh(tab[i].id);
            }
        },

        remove: function () {
            var removed = 0;
            for (var a = 0; a < arguments.length; a++) {
                var tab = this.get(arguments[a]);
                if (!tab) return false;
                removed++;
                // remove from array
                this.tabs.splice(this.get(tab.id, true), 1);
                // remove from screen
                $(this.box).find('#tabs_'+ this.name +'_tab_'+ w2utils.escapeId(tab.id)).remove();
            }
            return removed;
        },

        select: function (id) {
            if (this.active == id || this.get(id) === null) return false;
            this.active = id;
            this.refresh();
            return true;
        },

        set: function (id, tab) {
            var index = this.get(id, true);
            if (index === null) return false;
            $.extend(this.tabs[index], tab);
            this.refresh(id);
            return true;
        },

        get: function (id, returnIndex) {
            if (arguments.length === 0) {
                var all = [];
                for (var i1 = 0; i1 < this.tabs.length; i1++) {
                    if (this.tabs[i1].id != null) {
                        all.push(this.tabs[i1].id);
                    }
                }
                return all;
            } else {
                for (var i2 = 0; i2 < this.tabs.length; i2++) {
                    if (this.tabs[i2].id == id) { // need to be == since id can be numeric
                        return (returnIndex === true ? i2 : this.tabs[i2]);
                    }
                }
            }
            return null;
        },

        show: function () {
            var obj   = this;
            var shown = 0;
            var tmp   = [];
            for (var a = 0; a < arguments.length; a++) {
                var tab = this.get(arguments[a]);
                if (!tab || tab.hidden === false) continue;
                shown++;
                tab.hidden = false;
                tmp.push(tab.id);
            }
            setTimeout(function () { for (var t in tmp) obj.refresh(tmp[t]); }, 15); // needs timeout 
            return shown;
        },

        hide: function () {
            var obj   = this;
            var hidden= 0;
            var tmp   = [];
            for (var a = 0; a < arguments.length; a++) {
                var tab = this.get(arguments[a]);
                if (!tab || tab.hidden === true) continue;
                hidden++;
                tab.hidden = true;
                tmp.push(tab.id);
            }
            setTimeout(function () { for (var t in tmp) obj.refresh(tmp[t]); }, 15); // needs timeout 
            return hidden;
        },

        enable: function () {
            var obj   = this;
            var enabled = 0;
            var tmp   = [];
            for (var a = 0; a < arguments.length; a++) {
                var tab = this.get(arguments[a]);
                if (!tab || tab.disabled === false) continue;
                enabled++;
                tab.disabled = false;
                tmp.push(tab.id);
            }
            setTimeout(function () { for (var t in tmp) obj.refresh(tmp[t]); }, 15); // needs timeout 
            return enabled;
        },

        disable: function () {
            var obj   = this;
            var disabled = 0;
            var tmp   = [];
            for (var a = 0; a < arguments.length; a++) {
                var tab = this.get(arguments[a]);
                if (!tab || tab.disabled === true) continue;
                disabled++;
                tab.disabled = true;
                tmp.push(tab.id);
            }
            setTimeout(function () { for (var t in tmp) obj.refresh(tmp[t]); }, 15); // needs timeout 
            return disabled;
        },

        refresh: function (id) {
            var time = (new Date()).getTime();
            // if (window.getSelection) window.getSelection().removeAllRanges(); // clear selection
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'refresh', target: (typeof id !== 'undefined' ? id : this.name), object: this.get(id) });
            if (eventData.isCancelled === true) return;
            if (typeof id === 'undefined') {
                // refresh all
                for (var i = 0; i < this.tabs.length; i++) this.refresh(this.tabs[i].id);
            } else {
                // create or refresh only one item
                var tab = this.get(id);
                if (tab === null) return false;
                if (typeof tab.caption !== 'undefined') tab.text = tab.caption;

                var jq_el   = $(this.box).find('#tabs_'+ this.name +'_tab_'+ w2utils.escapeId(tab.id));
                var tabHTML = (tab.closable ? '<div class="w2ui-tab-close" onclick="w2ui[\''+ this.name +'\'].animateClose(\''+ tab.id +'\', event);"></div>' : '') +
                    '    <div class="w2ui-tab'+ (this.active === tab.id ? ' active' : '') + (tab.closable ? ' closable' : '') +'" '+
                    '        title="'+ (typeof tab.hint !== 'undefined' ? tab.hint : '') +'"'+
                    '        onclick="w2ui[\''+ this.name +'\'].click(\''+ tab.id +'\', event);">' + tab.text + '</div>';
                if (jq_el.length === 0) {
                    // does not exist - create it
                    var addStyle = '';
                    if (tab.hidden) { addStyle += 'display: none;'; }
                    if (tab.disabled) { addStyle += 'opacity: 0.2; -moz-opacity: 0.2; -webkit-opacity: 0.2; -o-opacity: 0.2; filter:alpha(opacity=20);'; }
                    var html = '<td id="tabs_'+ this.name + '_tab_'+ tab.id +'" style="'+ addStyle +'" valign="middle">'+ tabHTML + '</td>';
                    if (this.get(id, true) !== this.tabs.length-1 && $(this.box).find('#tabs_'+ this.name +'_tab_'+ w2utils.escapeId(this.tabs[parseInt(this.get(id, true))+1].id)).length > 0) {
                        $(this.box).find('#tabs_'+ this.name +'_tab_'+ w2utils.escapeId(this.tabs[parseInt(this.get(id, true))+1].id)).before(html);
                    } else {
                        $(this.box).find('#tabs_'+ this.name +'_right').before(html);
                    }
                } else {
                    // refresh
                    jq_el.html(tabHTML);
                    if (tab.hidden) { jq_el.css('display', 'none'); }
                    else { jq_el.css('display', ''); }
                    if (tab.disabled) { jq_el.css({ 'opacity': '0.2', '-moz-opacity': '0.2', '-webkit-opacity': '0.2', '-o-opacity': '0.2', 'filter': 'alpha(opacity=20)' }); }
                    else { jq_el.css({ 'opacity': '1', '-moz-opacity': '1', '-webkit-opacity': '1', '-o-opacity': '1', 'filter': 'alpha(opacity=100)' }); }
                }
            }
            // right html
            $('#tabs_'+ this.name +'_right').html(this.right);
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            return (new Date()).getTime() - time;
        },

        render: function (box) {
            var time = (new Date()).getTime();
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'render', target: this.name, box: box });
            if (eventData.isCancelled === true) return;
            // default action
            // if (window.getSelection) window.getSelection().removeAllRanges(); // clear selection
            if (typeof box !== 'undefined' && box !== null) {
                if ($(this.box).find('> table #tabs_'+ this.name + '_right').length > 0) {
                    $(this.box)
                        .removeAttr('name')
                        .removeClass('w2ui-reset w2ui-tabs')
                        .html('');
                }
                this.box = box;
            }
            if (!this.box) return false;
            // render all buttons
            var html =    '<table cellspacing="0" cellpadding="1" width="100%">'+
                        '    <tr><td width="100%" id="tabs_'+ this.name +'_right" align="right">'+ this.right +'</td></tr>'+
                        '</table>';
            $(this.box)
                .attr('name', this.name)
                .addClass('w2ui-reset w2ui-tabs')
                .html(html);
            if ($(this.box).length > 0) $(this.box)[0].style.cssText += this.style;
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            this.refresh();
            return (new Date()).getTime() - time;
        },

        resize: function () {
            var time = (new Date()).getTime();
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'resize', target: this.name });
            if (eventData.isCancelled === true) return;

            // intentionaly blank

            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            return (new Date()).getTime() - time;
        },

        destroy: function () {
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'destroy', target: this.name });
            if (eventData.isCancelled === true) return;
            // clean up
            if ($(this.box).find('> table #tabs_'+ this.name + '_right').length > 0) {
                $(this.box)
                    .removeAttr('name')
                    .removeClass('w2ui-reset w2ui-tabs')
                    .html('');
            }
            delete w2ui[this.name];
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        // ===================================================
        // -- Internal Event Handlers

        click: function (id, event) {
            var tab = this.get(id);
            if (tab === null || tab.disabled) return false;
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'click', target: id, tab: tab, object: tab, originalEvent: event });
            if (eventData.isCancelled === true) return;
            // default action
            $(this.box).find('#tabs_'+ this.name +'_tab_'+ w2utils.escapeId(this.active) +' .w2ui-tab').removeClass('active');
            this.active = tab.id;
            // route processing
            if (tab.route) {
                var route = String('/'+ tab.route).replace(/\/{2,}/g, '/');
                var info  = w2utils.parseRoute(route);
                if (info.keys.length > 0) {
                    for (var k = 0; k < info.keys.length; k++) {
                        if (this.routeData[info.keys[k].name] == null) continue;
                        route = route.replace((new RegExp(':'+ info.keys[k].name, 'g')), this.routeData[info.keys[k].name]);
                    }
                }
                setTimeout(function () { window.location.hash = route; }, 1);
            }
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            this.refresh(id);
        },

        animateClose: function(id, event) {
            var tab = this.get(id);
            if (tab === null || tab.disabled) return false;
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'close', target: id, object: this.get(id), originalEvent: event });
            if (eventData.isCancelled === true) return;
            // default action
            var obj = this;
            $(this.box).find('#tabs_'+ this.name +'_tab_'+ w2utils.escapeId(tab.id)).css({
                '-webkit-transition': '.2s',
                '-moz-transition': '2s',
                '-ms-transition': '.2s',
                '-o-transition': '.2s',
                opacity: '0' });
            setTimeout(function () {
                var width = $(obj.box).find('#tabs_'+ obj.name +'_tab_'+ w2utils.escapeId(tab.id)).width();
                $(obj.box).find('#tabs_'+ obj.name +'_tab_'+ w2utils.escapeId(tab.id))
                    .html('<div style="width: '+ width +'px; -webkit-transition: .2s; -moz-transition: .2s; -ms-transition: .2s; -o-transition: .2s"></div>');
                setTimeout(function () {
                    $(obj.box).find('#tabs_'+ obj.name +'_tab_'+ w2utils.escapeId(tab.id)).find(':first-child').css({ 'width': '0px' });
                }, 50);
            }, 200);
            setTimeout(function () {
                obj.remove(id);
            }, 450);
            // event before
            this.trigger($.extend(eventData, { phase: 'after' }));
            this.refresh();
        },

        animateInsert: function(id, tab) {
            if (this.get(id) === null) return;
            if (!$.isPlainObject(tab)) return;
            // check for unique
            if (!w2utils.checkUniqueId(tab.id, this.tabs, 'tabs', this.name)) return;
            // insert simple div
            var jq_el   = $(this.box).find('#tabs_'+ this.name +'_tab_'+ w2utils.escapeId(tab.id));
            if (jq_el.length !== 0) return; // already exists
            // measure width
            if (typeof tab.caption !== 'undefined') tab.text = tab.caption;
            var tmp = '<div id="_tmp_tabs" class="w2ui-reset w2ui-tabs" style="position: absolute; top: -1000px;">'+
                '<table cellspacing="0" cellpadding="1" width="100%"><tr>'+
                '<td id="_tmp_simple_tab" style="" valign="middle">'+
                    (tab.closable ? '<div class="w2ui-tab-close"></div>' : '') +
                '    <div class="w2ui-tab '+ (this.active === tab.id ? 'active' : '') +'">'+ tab.text +'</div>'+
                '</td></tr></table>'+
                '</div>';
            $('body').append(tmp);
            // create dummy element
            var tabHTML = '<div style="width: 1px; -webkit-transition: 0.2s; -moz-transition: 0.2s; -ms-transition: 0.2s; -o-transition: 0.2s;">&nbsp;</div>';
            var addStyle = '';
            if (tab.hidden) { addStyle += 'display: none;'; }
            if (tab.disabled) { addStyle += 'opacity: 0.2; -moz-opacity: 0.2; -webkit-opacity: 0.2; -o-opacity: 0.2; filter:alpha(opacity=20);'; }
            var html = '<td id="tabs_'+ this.name +'_tab_'+ tab.id +'" style="'+ addStyle +'" valign="middle">'+ tabHTML +'</td>';
            if (this.get(id, true) !== this.tabs.length && $(this.box).find('#tabs_'+ this.name +'_tab_'+ w2utils.escapeId(this.tabs[parseInt(this.get(id, true))].id)).length > 0) {
                $(this.box).find('#tabs_'+ this.name +'_tab_'+ w2utils.escapeId(this.tabs[parseInt(this.get(id, true))].id)).before(html);
            } else {
                $(this.box).find('#tabs_'+ this.name +'_right').before(html);
            }
            // -- move
            var obj = this;
            setTimeout(function () {
                var width = $('#_tmp_simple_tab').width();
                $('#_tmp_tabs').remove();
                $('#tabs_'+ obj.name +'_tab_'+ w2utils.escapeId(tab.id) +' > div').css('width', width+'px');
            }, 1);
            setTimeout(function () {
                // insert for real
                obj.insert(id, tab);
            }, 200);
        }
    };

    $.extend(w2tabs.prototype, w2utils.event);
    w2obj.tabs = w2tabs;
})();


/************************************************************************
*   Library: Web 2.0 UI for jQuery (using prototypical inheritance)
*   - Following objects defined
*        - w2toolbar        - toolbar widget
*        - $().w2toolbar    - jQuery wrapper
*   - Dependencies: jQuery, w2utils
*
* == NICE TO HAVE ==
*   - on overflow display << >>
*   - verticle toolbar
*
************************************************************************/

(function () {
    var w2toolbar = function (options) {
        this.box       = null;      // DOM Element that holds the element
        this.name      = null;      // unique name for w2ui
        this.routeData = {};        // data for dynamic routes
        this.items     = [];
        this.right     = '';        // HTML text on the right of toolbar
        this.onClick   = null;
        this.onRender  = null;
        this.onRefresh = null;
        this.onResize  = null;
        this.onDestroy = null;

        $.extend(true, this, w2obj.toolbar, options);
    };

    // ====================================================
    // -- Registers as a jQuery plugin

    $.fn.w2toolbar = function(method) {
        if (typeof method === 'object' || !method ) {
            // check name parameter
            if (!w2utils.checkName(method, 'w2toolbar')) return;
            // extend items
            var items = method.items || [];
            var object = new w2toolbar(method);
            $.extend(object, { items: [], handlers: [] });
            for (var i = 0; i < items.length; i++) {
                object.items[i] = $.extend({}, w2toolbar.prototype.item, items[i]);
            }
            if ($(this).length !== 0) {
                object.render($(this)[0]);
            }
            // register new object
            w2ui[object.name] = object;
            return object;

        } else if (w2ui[$(this).attr('name')]) {
            var obj = w2ui[$(this).attr('name')];
            obj[method].apply(obj, Array.prototype.slice.call(arguments, 1));
            return this;
        } else {
            console.log('ERROR: Method ' +  method + ' does not exist on jQuery.w2toolbar' );
        }
    };

    // ====================================================
    // -- Implementation of core functionality

    w2toolbar.prototype = {
        item: {
            id       : null,        // command to be sent to all event handlers
            type     : 'button',    // button, check, radio, drop, menu, break, html, spacer
            text     : '',
            route    : null,        // if not null, it is route to go
            html     : '',
            img      : null,
            icon     : null,
            count    : null,
            hidden   : false,
            disabled : false,
            checked  : false,       // used for radio buttons
            arrow    : true,        // arrow down for drop/menu types
            hint     : '',
            group    : null,        // used for radio buttons
            items    : null,        // for type menu it is an array of items in the menu
            overlay  : {},
            onClick  : null
        },

        add: function (items) {
            this.insert(null, items);
        },

        insert: function (id, items) {
            if (!$.isArray(items)) items = [items];
            for (var o = 0; o < items.length; o++) {
                // checks
                if (typeof items[o].type === 'undefined') {
                    console.log('ERROR: The parameter "type" is required but not supplied in w2toolbar.add() method.');
                    return;
                }
                if ($.inArray(String(items[o].type), ['button', 'check', 'radio', 'drop', 'menu', 'break', 'html', 'spacer']) === -1) {
                    console.log('ERROR: The parameter "type" should be one of the following [button, check, radio, drop, menu, break, html, spacer] '+
                            'in w2toolbar.add() method.');
                    return;
                }
                if (typeof items[o].id === 'undefined') {
                    console.log('ERROR: The parameter "id" is required but not supplied in w2toolbar.add() method.');
                    return;
                }
                if (!w2utils.checkUniqueId(items[o].id, this.items, 'toolbar items', this.name)) return;
                // add item
                var it = $.extend({}, w2toolbar.prototype.item, items[o]);
                if (id == null) {
                    this.items.push(it);
                } else {
                    var middle = this.get(id, true);
                    this.items = this.items.slice(0, middle).concat([it], this.items.slice(middle));
                }
                this.refresh(it.id);
            }
        },

        remove: function () {
            var removed = 0;
            for (var a = 0; a < arguments.length; a++) {
                var it = this.get(arguments[a]);
                if (!it) continue;
                removed++;
                // remove from screen
                $(this.box).find('#tb_'+ this.name +'_item_'+ w2utils.escapeId(it.id)).remove();
                // remove from array
                var ind = this.get(it.id, true);
                if (ind) this.items.splice(ind, 1);
            }
            return removed;
        },

        set: function (id, item) {
            var index = this.get(id, true);
            if (index === null) return false;
            $.extend(this.items[index], item);
            this.refresh(id);
            return true;
        },

        get: function (id, returnIndex) {
            if (arguments.length === 0) {
                var all = [];
                for (var i1 = 0; i1 < this.items.length; i1++) if (this.items[i1].id !== null) all.push(this.items[i1].id);
                return all;
            }
            for (var i2 = 0; i2 < this.items.length; i2++) {
                if (this.items[i2].id === id) {
                    if (returnIndex === true) return i2; else return this.items[i2];
                }
            }
            return null;
        },

        show: function () {
            var obj   = this;
            var items = 0;
            var tmp   = [];
            for (var a = 0; a < arguments.length; a++) {
                var it = this.get(arguments[a]);
                if (!it) continue;
                items++;
                it.hidden = false;
                tmp.push(it.id);
            }
            setTimeout(function () { for (var t in tmp) obj.refresh(tmp[t]); }, 15); // needs timeout 
            return items;
        },

        hide: function () {
            var obj   = this;
            var items = 0;
            var tmp   = [];
            for (var a = 0; a < arguments.length; a++) {
                var it = this.get(arguments[a]);
                if (!it) continue;
                items++;
                it.hidden = true;
                tmp.push(it.id);
            }
            setTimeout(function () { for (var t in tmp) obj.refresh(tmp[t]); }, 15); // needs timeout 
            return items;
        },

        enable: function () {
            var obj   = this;
            var items = 0;
            var tmp   = [];
            for (var a = 0; a < arguments.length; a++) {
                var it = this.get(arguments[a]);
                if (!it) continue;
                items++;
                it.disabled = false;
                tmp.push(it.id);
            }
            setTimeout(function () { for (var t in tmp) obj.refresh(tmp[t]); }, 15); // needs timeout 
            return items;
        },

        disable: function () {
            var obj   = this;
            var items = 0;
            var tmp   = [];
            for (var a = 0; a < arguments.length; a++) {
                var it = this.get(arguments[a]);
                if (!it) continue;
                items++;
                it.disabled = true;
                tmp.push(it.id);
            }
            setTimeout(function () { for (var t in tmp) obj.refresh(tmp[t]); }, 15); // needs timeout 
            return items;
        },

        check: function () {
            var obj   = this;
            var items = 0;
            var tmp   = [];
            for (var a = 0; a < arguments.length; a++) {
                var it = this.get(arguments[a]);
                if (!it) continue;
                items++;
                it.checked = true;
                tmp.push(it.id);
            }
            setTimeout(function () { for (var t in tmp) obj.refresh(tmp[t]); }, 15); // needs timeout 
            return items;
        },

        uncheck: function () {
            var obj   = this;
            var items = 0;
            var tmp   = [];
            for (var a = 0; a < arguments.length; a++) {
                var it = this.get(arguments[a]);
                if (!it) continue;
                items++;
                it.checked = false;
                tmp.push(it.id);
            }
            setTimeout(function () { for (var t in tmp) obj.refresh(tmp[t]); }, 15); // needs timeout 
            return items;
        },

        render: function (box) {
            var time = (new Date()).getTime();
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'render', target: this.name, box: box });
            if (eventData.isCancelled === true) return;

            if (box != null) {
                if ($(this.box).find('> table #tb_'+ this.name + '_right').length > 0) {
                    $(this.box)
                        .removeAttr('name')
                        .removeClass('w2ui-reset w2ui-toolbar')
                        .html('');
                }
                this.box = box;
            }
            if (!this.box) return;
            // render all buttons
            var html = '<table cellspacing="0" cellpadding="0" width="100%">'+
                       '<tr>';
            for (var i = 0; i < this.items.length; i++) {
                var it = this.items[i];
                if (it.id == null) it.id = "item_" + i;
                if (it === null)  continue;
                if (it.type === 'spacer') {
                    html += '<td width="100%" id="tb_'+ this.name +'_item_'+ it.id +'" align="right"></td>';
                } else {
                    html += '<td id="tb_'+ this.name + '_item_'+ it.id +'" style="'+ (it.hidden ? 'display: none' : '') +'" '+
                            '    class="'+ (it.disabled ? 'disabled' : '') +'" valign="middle">'+ this.getItemHTML(it) +
                            '</td>';
                }
            }
            html += '<td width="100%" id="tb_'+ this.name +'_right" align="right">'+ this.right +'</td>';
            html += '</tr>'+
                    '</table>';
            $(this.box)
                .attr('name', this.name)
                .addClass('w2ui-reset w2ui-toolbar')
                .html(html);
            if ($(this.box).length > 0) $(this.box)[0].style.cssText += this.style;
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            return (new Date()).getTime() - time;
        },

        refresh: function (id) {
            var time = (new Date()).getTime();
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'refresh', target: (typeof id !== 'undefined' ? id : this.name), item: this.get(id) });
            if (eventData.isCancelled === true) return;

            if (id == null) {
                // refresh all
                for (var i = 0; i < this.items.length; i++) {
                    var it1 = this.items[i];
                    if (it1.id == null) it1.id = "item_" + i;
                    this.refresh(it1.id);
                }
            }
            // create or refresh only one item
            var it = this.get(id);
            if (it === null) return false;

            var el = $(this.box).find('#tb_'+ this.name +'_item_'+ w2utils.escapeId(it.id));
            var html  = this.getItemHTML(it);
            if (el.length === 0) {
                // does not exist - create it
                if (it.type === 'spacer') {
                    html = '<td width="100%" id="tb_'+ this.name +'_item_'+ it.id +'" align="right"></td>';
                } else {
                    html = '<td id="tb_'+ this.name + '_item_'+ it.id +'" style="'+ (it.hidden ? 'display: none' : '') +'" '+
                        '    class="'+ (it.disabled ? 'disabled' : '') +'" valign="middle">'+ html +
                        '</td>';
                }
                if (this.get(id, true) === this.items.length-1) {
                    $(this.box).find('#tb_'+ this.name +'_right').before(html);
                } else {
                    $(this.box).find('#tb_'+ this.name +'_item_'+ w2utils.escapeId(this.items[parseInt(this.get(id, true))+1].id)).before(html);
                }
            } else {
                // refresh
                el.html(html);
                if (it.hidden) { el.css('display', 'none'); } else { el.css('display', ''); }
                if (it.disabled) { el.addClass('disabled'); } else { el.removeClass('disabled'); }
            }
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            return (new Date()).getTime() - time;
        },

        resize: function () {
            var time = (new Date()).getTime();
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'resize', target: this.name });
            if (eventData.isCancelled === true) return;

            // intentionaly blank

            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            return (new Date()).getTime() - time;
        },

        destroy: function () {
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'destroy', target: this.name });
            if (eventData.isCancelled === true) return;
            // clean up
            if ($(this.box).find('> table #tb_'+ this.name + '_right').length > 0) {
                $(this.box)
                    .removeAttr('name')
                    .removeClass('w2ui-reset w2ui-toolbar')
                    .html('');
            }
            $(this.box).html('');
            delete w2ui[this.name];
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        // ========================================
        // --- Internal Functions

        getItemHTML: function (item) {
            var html = '';

            if (typeof item.caption !== 'undefined') item.text = item.caption;
            if (typeof item.hint === 'undefined') item.hint = '';
            if (typeof item.text === 'undefined') item.text = '';

            switch (item.type) {
                case 'menu':
                case 'button':
                case 'check':
                case 'radio':
                case 'drop':
                    var img = '<td>&nbsp;</td>';
                    if (item.img)  img = '<td><div class="w2ui-tb-image w2ui-icon '+ item.img +'"></div></td>';
                    if (item.icon) img = '<td><div class="w2ui-tb-image"><span class="'+ item.icon +'"></span></div></td>';
                    html += '<table cellpadding="0" cellspacing="0" title="'+ item.hint +'" class="w2ui-button '+ (item.checked ? 'checked' : '') +'" '+
                            '       onclick     = "var el=w2ui[\''+ this.name + '\']; if (el) el.click(\''+ item.id +'\', event);" '+
                            '       onmouseover = "' + (!item.disabled ? "$(this).addClass('over');" : "") + '"'+
                            '       onmouseout  = "' + (!item.disabled ? "$(this).removeClass('over').removeClass('down');" : "") + '"'+
                            '       onmousedown = "' + (!item.disabled ? "$(this).addClass('down');" : "") + '"'+
                            '       onmouseup   = "' + (!item.disabled ? "$(this).removeClass('down');" : "") + '"'+
                            '>'+
                            '<tr><td>'+
                            '  <table cellpadding="1" cellspacing="0">'+
                            '  <tr>' +
                                    img +
                                    (item.text !== '' ? '<td class="w2ui-tb-caption" nowrap>'+ item.text +'</td>' : '') +
                                    (item.count != null ? '<td class="w2ui-tb-count" nowrap><span>'+ item.count +'</span></td>' : '') +
                                    (((item.type === 'drop' || item.type === 'menu') && item.arrow !== false) ?
                                        '<td class="w2ui-tb-down" nowrap><div></div></td>' : '') +
                            '  </tr></table>'+
                            '</td></tr></table>';
                    break;

                case 'break':
                    html +=    '<table cellpadding="0" cellspacing="0"><tr>'+
                            '    <td><div class="w2ui-break">&nbsp;</div></td>'+
                            '</tr></table>';
                    break;

                case 'html':
                    html +=    '<table cellpadding="0" cellspacing="0"><tr>'+
                            '    <td nowrap>' + item.html + '</td>'+
                            '</tr></table>';
                    break;
            }

            var newHTML = '';
            if (typeof item.onRender === 'function') newHTML = item.onRender.call(this, item.id, html);
            if (typeof this.onRender === 'function') newHTML = this.onRender(item.id, html);
            if (newHTML !== '' && newHTML != null) html = newHTML;
            return html;
        },

        menuClick: function (event) {
            var obj = this;
            if (event.item && !event.item.disabled) {
                // event before
                var eventData = this.trigger({ phase: 'before', type: 'click', target: event.item.id + ':' + event.subItem.id, item: event.item,
                    subItem: event.subItem, originalEvent: event.originalEvent });
                if (eventData.isCancelled === true) return;

                // route processing
                var it = event.subItem;
                if (it.route) {
                    var route = String('/'+ it.route).replace(/\/{2,}/g, '/');
                    var info  = w2utils.parseRoute(route);
                    if (info.keys.length > 0) {
                        for (var k = 0; k < info.keys.length; k++) {
                            if (obj.routeData[info.keys[k].name] == null) continue;
                            route = route.replace((new RegExp(':'+ info.keys[k].name, 'g')), this.routeData[info.keys[k].name]);
                        }
                    }
                    setTimeout(function () { window.location.hash = route; }, 1);
                }

                // event after
                this.trigger($.extend(eventData, { phase: 'after' }));
            }
        },

        click: function (id, event) {
            var obj = this;
            var it  = this.get(id);
            if (it && !it.disabled) {
                // event before
                var eventData = this.trigger({ phase: 'before', type: 'click', target: (typeof id !== 'undefined' ? id : this.name),
                    item: it, object: it, originalEvent: event });
                if (eventData.isCancelled === true) return;

                var btn = $('#tb_'+ this.name +'_item_'+ w2utils.escapeId(it.id) +' table.w2ui-button');
                btn.removeClass('down');

                if (it.type === 'radio') {
                    for (var i = 0; i < this.items.length; i++) {
                        var itt = this.items[i];
                        if (itt == null || itt.id === it.id || itt.type !== 'radio') continue;
                        if (itt.group === it.group && itt.checked) {
                            itt.checked = false;
                            this.refresh(itt.id);
                        }
                    }
                    it.checked = true;
                    btn.addClass('checked');
                }

                if (it.type === 'drop' || it.type === 'menu') {
                    if (it.checked) {
                        // if it was already checked, second click will hide it
                        it.checked = false;
                    } else {
                        // show overlay
                        setTimeout(function () {
                            var el = $('#tb_'+ obj.name +'_item_'+ w2utils.escapeId(it.id));
                            if (!$.isPlainObject(it.overlay)) it.overlay = {};
                            var left = (el.width() - 50) / 2;
                            if (left > 19) left = 19;
                            if (it.type === 'drop') {
                                el.w2overlay(it.html, $.extend({ left: left, top: 3 }, it.overlay));
                            }
                            if (it.type === 'menu') {
                                el.w2menu(it.items, $.extend({ left: left, top: 3 }, it.overlay, {
                                    select: function (event) {
                                        obj.menuClick({ item: it, subItem: event.item, originalEvent: event.originalEvent });
                                        hideDrop();
                                    }
                                }));
                            }
                            // window.click to hide it
                            $(document).on('click', hideDrop);
                            function hideDrop() {
                                $(document).off('click', hideDrop);
                                it.checked = false;
                                btn.removeClass('checked');
                            }
                        }, 1);
                    }
                }

                if (it.type === 'check' || it.type === 'drop' || it.type === 'menu') {
                    it.checked = !it.checked;
                    if (it.checked) {
                        btn.addClass('checked');
                    } else {
                        btn.removeClass('checked');
                    }
                }
                // route processing
                if (it.route) {
                    var route = String('/'+ it.route).replace(/\/{2,}/g, '/');
                    var info  = w2utils.parseRoute(route);
                    if (info.keys.length > 0) {
                        for (var k = 0; k < info.keys.length; k++) {
                            route = route.replace((new RegExp(':'+ info.keys[k].name, 'g')), this.routeData[info.keys[k].name]);
                        }
                    }
                    setTimeout(function () { window.location.hash = route; }, 1);
                }
                // event after
                this.trigger($.extend(eventData, { phase: 'after' }));
            }
        }
    };

    $.extend(w2toolbar.prototype, w2utils.event);
    w2obj.toolbar = w2toolbar;
})();


/************************************************************************
*   Library: Web 2.0 UI for jQuery (using prototypical inheritance)
*   - Following objects defined
*        - w2sidebar        - sidebar widget
*        - $().w2sidebar    - jQuery wrapper
*   - Dependencies: jQuery, w2utils
*
* == NICE TO HAVE ==
*   - return ids of all subitems
*   - add find() method to find nodes by a specific criteria (I want all nodes for exampe)
*   - dbl click should be like it is in grid (with timer not HTML dbl click event)
*   - reorder with grag and drop
*   - add route property that would navigate to a #route
*   - node.style is missleading - should be there to apply color for example
*
************************************************************************/

(function () {
    var w2sidebar = function (options) {
        this.name          = null;
        this.box           = null;
        this.sidebar       = null;
        this.parent        = null;
        this.nodes         = [];        // Sidebar child nodes
        this.menu          = [];
        this.routeData     = {};        // data for dynamic routes
        this.selected      = null;      // current selected node (readonly)
        this.img           = null;
        this.icon          = null;
        this.style         = '';
        this.topHTML       = '';
        this.bottomHTML    = '';
        this.keyboard      = true;
        this.onClick       = null;      // Fire when user click on Node Text
        this.onDblClick    = null;      // Fire when user dbl clicks
        this.onContextMenu = null;
        this.onMenuClick   = null;      // when context menu item selected
        this.onExpand      = null;      // Fire when node Expands
        this.onCollapse    = null;      // Fire when node Colapses
        this.onKeydown     = null;
        this.onRender      = null;
        this.onRefresh     = null;
        this.onResize      = null;
        this.onDestroy     = null;

        $.extend(true, this, w2obj.sidebar, options);
    };

    // ====================================================
    // -- Registers as a jQuery plugin

    $.fn.w2sidebar = function(method) {
        if (typeof method === 'object' || !method ) {
            // check name parameter
            if (!w2utils.checkName(method, 'w2sidebar')) return;
            // extend items
            var nodes  = method.nodes;
            var object = new w2sidebar(method);
            $.extend(object, { handlers: [], nodes: [] });
            if (typeof nodes != 'undefined') {
                object.add(object, nodes);
            }
            if ($(this).length !== 0) {
                object.render($(this)[0]);
            }
            object.sidebar = object;
            // register new object
            w2ui[object.name] = object;
            return object;

        } else if (w2ui[$(this).attr('name')]) {
            var obj = w2ui[$(this).attr('name')];
            obj[method].apply(obj, Array.prototype.slice.call(arguments, 1));
            return this;
        } else {
            console.log('ERROR: Method ' +  method + ' does not exist on jQuery.w2sidebar' );
        }
    };

    // ====================================================
    // -- Implementation of core functionality

    w2sidebar.prototype = {

        node: {
            id              : null,
            text            : '',
            count           : null,
            img             : null,
            icon            : null,
            nodes           : [],
            style           : '',            // additional style for subitems
            route           : null,
            selected        : false,
            expanded        : false,
            hidden          : false,
            disabled        : false,
            group           : false,        // if true, it will build as a group
            groupShowHide   : true,
            plus            : false,        // if true, plus will be shown even if there is no sub nodes
            // events
            onClick         : null,
            onDblClick      : null,
            onContextMenu   : null,
            onExpand        : null,
            onCollapse      : null,
            // internal
            parent          : null,    // node object
            sidebar         : null
        },

        add: function (parent, nodes) {
            if (arguments.length == 1) {
                // need to be in reverse order
                nodes  = arguments[0];
                parent = this;
            }
            if (typeof parent == 'string') parent = this.get(parent);
            return this.insert(parent, null, nodes);
        },

        insert: function (parent, before, nodes) {
            var txt, ind, tmp, node, nd;
            if (arguments.length == 2) {
                // need to be in reverse order
                nodes  = arguments[1];
                before = arguments[0];
                ind    = this.get(before);
                if (ind === null) {
                    if (!$.isArray(nodes)) nodes = [nodes];
                    txt = (nodes[0].caption != null ? nodes[0].caption : nodes[0].text);
                    console.log('ERROR: Cannot insert node "'+ txt +'" because cannot find node "'+ before +'" to insert before.');
                    return null;
                }
                parent = this.get(before).parent;
            }
            if (typeof parent == 'string') parent = this.get(parent);
            if (!$.isArray(nodes)) nodes = [nodes];
            for (var o in nodes) {
                node = nodes[o];
                if (typeof node.id == null) {
                    txt = (node.caption != null ? node.caption : node.text);
                    console.log('ERROR: Cannot insert node "'+ txt +'" because it has no id.');
                    continue;
                }
                if (this.get(this, node.id) !== null) {
                    txt = (node.caption != null ? node.caption : node.text);
                    console.log('ERROR: Cannot insert node with id='+ node.id +' (text: '+ txt + ') because another node with the same id already exists.');
                    continue;
                }
                tmp = $.extend({}, w2sidebar.prototype.node, node);
                tmp.sidebar = this;
                tmp.parent  = parent;
                nd = tmp.nodes || [];
                tmp.nodes = []; // very important to re-init empty nodes array
                if (before === null) { // append to the end
                    parent.nodes.push(tmp);
                } else {
                    ind = this.get(parent, before, true);
                    if (ind === null) {
                        txt = (node.caption != null ? node.caption : node.text);
                        console.log('ERROR: Cannot insert node "'+ txt +'" because cannot find node "'+ before +'" to insert before.');
                        return null;
                }
                    parent.nodes.splice(ind, 0, tmp);
                }
                if (nd.length > 0) {
                    this.insert(tmp, null, nd);
                }
            }
            this.refresh(parent.id);
            return tmp;
        },

        remove: function () { // multiple arguments
            var deleted = 0;
            var tmp;
            for (var a = 0; a < arguments.length; a++) {
                tmp = this.get(arguments[a]);
                if (tmp === null) continue;
                if (this.selected !== null && this.selected === tmp.id) {
                    this.selected = null;
                }
                var ind  = this.get(tmp.parent, arguments[a], true);
                if (ind === null) continue;
                if (tmp.parent.nodes[ind].selected)    tmp.sidebar.unselect(tmp.id);
                tmp.parent.nodes.splice(ind, 1);
                deleted++;
            }
            if (deleted > 0 && arguments.length == 1) this.refresh(tmp.parent.id); else this.refresh();
            return deleted;
        },

        set: function (parent, id, node) {
            if (arguments.length == 2) {
                // need to be in reverse order
                node    = id;
                id        = parent;
                parent    = this;
            }
            // searches all nested nodes
            if (typeof parent == 'string') parent = this.get(parent);
            if (parent.nodes == null) return null;
            for (var i = 0; i < parent.nodes.length; i++) {
                if (parent.nodes[i].id === id) {
                    // make sure nodes inserted correctly
                    var nodes = node.nodes;
                    $.extend(parent.nodes[i], node, { nodes: [] });
                    if (nodes != null) {
                        this.add(parent.nodes[i], nodes);
                    }
                    this.refresh(id);
                    return true;
                } else {
                    var rv = this.set(parent.nodes[i], id, node);
                    if (rv) return true;
                }
            }
            return false;
        },

        get: function (parent, id, returnIndex) { // can be just called get(id) or get(id, true)
            if (arguments.length === 0) {
                var all = [];
                var tmp = this.find({});
                for (var t = 0; t < tmp.length; t++) {
                    if (tmp[t].id != null) all.push(tmp[t].id);
                }
                return all;
            } else {
                if (arguments.length == 1 || (arguments.length == 2 && id === true) ) {
                    // need to be in reverse order
                    returnIndex    = id;
                    id            = parent;
                    parent        = this;
                }
                // searches all nested nodes
                if (typeof parent == 'string') parent = this.get(parent);
                if (parent.nodes == null) return null;
                for (var i = 0; i < parent.nodes.length; i++) {
                    if (parent.nodes[i].id == id) {
                        if (returnIndex === true) return i; else return parent.nodes[i];
                    } else {
                        var rv = this.get(parent.nodes[i], id, returnIndex);
                        if (rv || rv === 0) return rv;
                    }
                }
                return null;
            }
        },

        find: function (parent, params, results) { // can be just called find({ selected: true })
            if (arguments.length == 1) {
                // need to be in reverse order
                params = parent;
                parent = this;
            }
            if (!results) results = [];
            // searches all nested nodes
            if (typeof parent == 'string') parent = this.get(parent);
            if (parent.nodes == null) return results;
            for (var i = 0; i < parent.nodes.length; i++) {
                var match = true;
                for (var prop in params) {
                    if (parent.nodes[i][prop] != params[prop]) match = false;
                }
                if (match) results.push(parent.nodes[i]);
                if (parent.nodes[i].nodes.length > 0) results = this.find(parent.nodes[i], params, results);
            }
            return results;
        },

        hide: function () { // multiple arguments
            var hidden = 0;
            for (var a = 0; a < arguments.length; a++) {
                var tmp = this.get(arguments[a]);
                if (tmp === null) continue;
                tmp.hidden = true;
                hidden++;
            }
            if (arguments.length == 1) this.refresh(arguments[0]); else this.refresh();
            return hidden;
        },

        show: function () { // multiple arguments
            var shown = 0;
            for (var a = 0; a < arguments.length; a++) {
                var tmp = this.get(arguments[a]);
                if (tmp === null) continue;
                tmp.hidden = false;
                shown++;
            }
            if (arguments.length == 1) this.refresh(arguments[0]); else this.refresh();
            return shown;
        },

        disable: function () { // multiple arguments
            var disabled = 0;
            for (var a = 0; a < arguments.length; a++) {
                var tmp = this.get(arguments[a]);
                if (tmp === null) continue;
                tmp.disabled = true;
                if (tmp.selected) this.unselect(tmp.id);
                disabled++;
            }
            if (arguments.length == 1) this.refresh(arguments[0]); else this.refresh();
            return disabled;
        },

        enable: function () { // multiple arguments
            var enabled = 0;
            for (var a = 0; a < arguments.length; a++) {
                var tmp = this.get(arguments[a]);
                if (tmp === null) continue;
                tmp.disabled = false;
                enabled++;
            }
            if (arguments.length == 1) this.refresh(arguments[0]); else this.refresh();
            return enabled;
        },

        select: function (id) {
            var new_node = this.get(id);
            if (!new_node) return false;
            if (this.selected == id && new_node.selected) return false;
            this.unselect(this.selected);
            $(this.box).find('#node_'+ w2utils.escapeId(id))
                .addClass('w2ui-selected')
                .find('.w2ui-icon').addClass('w2ui-icon-selected');
            new_node.selected = true;
            this.selected = id;
            return true;
        },

        unselect: function (id) {
            var current = this.get(id);
            if (!current) return false;
            current.selected = false;
            $(this.box).find('#node_'+ w2utils.escapeId(id))
                .removeClass('w2ui-selected')
                .find('.w2ui-icon').removeClass('w2ui-icon-selected');
            if (this.selected == id) this.selected = null;
            return true;
        },

        toggle: function(id) {
            var nd = this.get(id);
            if (nd === null) return false;
            if (nd.plus) {
                this.set(id, { plus: false });
                this.expand(id);
                this.refresh(id);
                return;
            }
            if (nd.nodes.length === 0) return false;
            if (this.get(id).expanded) return this.collapse(id); else return this.expand(id);
        },

        collapse: function (id) {
            var obj = this;
            var nd  = this.get(id);
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'collapse', target: id, object: nd });
            if (eventData.isCancelled === true) return;
            // default action
            $(this.box).find('#node_'+ w2utils.escapeId(id) +'_sub').slideUp(200);
            $(this.box).find('#node_'+ w2utils.escapeId(id) +' .w2ui-node-dots:first-child').html('<div class="w2ui-expand">+</div>');
            nd.expanded = false;
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            setTimeout(function () { obj.refresh(id); }, 200);
            return true;
        },

        collapseAll: function (parent) {
            if (typeof parent == 'undefined') parent = this;
            if (typeof parent == 'string') parent = this.get(parent);
            if (parent.nodes == null) return false;
            for (var i = 0; i < parent.nodes.length; i++) {
                if (parent.nodes[i].expanded === true) parent.nodes[i].expanded = false;
                if (parent.nodes[i].nodes && parent.nodes[i].nodes.length > 0) this.collapseAll(parent.nodes[i]);
            }
            this.refresh(parent.id);
            return true;
        },

        expand: function (id) {
            var obj = this;
            var nd  = this.get(id);
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'expand', target: id, object: nd });
            if (eventData.isCancelled === true) return;
            // default action
            $(this.box).find('#node_'+ w2utils.escapeId(id) +'_sub').slideDown(200);
            $(this.box).find('#node_'+ w2utils.escapeId(id) +' .w2ui-node-dots:first-child').html('<div class="w2ui-expand">-</div>');
            nd.expanded = true;
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            setTimeout(function () { obj.refresh(id); }, 200);
            return true;
        },

        expandAll: function (parent) {
            if (typeof parent == 'undefined') parent = this;
            if (typeof parent == 'string') parent = this.get(parent);
            if (parent.nodes == null) return false;
            for (var i = 0; i < parent.nodes.length; i++) {
                if (parent.nodes[i].expanded === false) parent.nodes[i].expanded = true;
                if (parent.nodes[i].nodes && parent.nodes[i].nodes.length > 0) this.expandAll(parent.nodes[i]);
            }
            this.refresh(parent.id);
        },

        expandParents: function (id) {
            var node = this.get(id);
            if (node === null) return false;
            if (node.parent) {
                node.parent.expanded = true;
                this.expandParents(node.parent.id);
            }
            this.refresh(id);
            return true;
        },

        click: function (id, event) {
            var obj = this;
            var nd  = this.get(id);
            if (nd === null) return;
            if (nd.disabled || nd.group) return; // should click event if already selected
            // unselect all previsously
            $(obj.box).find('.w2ui-node.w2ui-selected').each(function (index, el) {
                var oldID     = $(el).attr('id').replace('node_', '');
                var oldNode = obj.get(oldID);
                if (oldNode != null) oldNode.selected = false;
                $(el).removeClass('w2ui-selected').find('.w2ui-icon').removeClass('w2ui-icon-selected');
            });
            // select new one
            var newNode = $(obj.box).find('#node_'+ w2utils.escapeId(id));
            var oldNode = $(obj.box).find('#node_'+ w2utils.escapeId(obj.selected));
            newNode.addClass('w2ui-selected').find('.w2ui-icon').addClass('w2ui-icon-selected');
            // need timeout to allow rendering
            setTimeout(function () {
                // event before
                var eventData = obj.trigger({ phase: 'before', type: 'click', target: id, originalEvent: event, node: nd, object: nd });
                if (eventData.isCancelled === true) {
                    // restore selection
                    newNode.removeClass('w2ui-selected').find('.w2ui-icon').removeClass('w2ui-icon-selected');
                    oldNode.addClass('w2ui-selected').find('.w2ui-icon').addClass('w2ui-icon-selected');
                    return;
                }
                // default action
                if (oldNode !== null) oldNode.selected = false;
                obj.get(id).selected = true;
                obj.selected = id;
                // route processing
                if (nd.route) {
                    var route = String('/'+ nd.route).replace(/\/{2,}/g, '/');
                    var info  = w2utils.parseRoute(route);
                    if (info.keys.length > 0) {
                        for (var k = 0; k < info.keys.length; k++) {
                            if (obj.routeData[info.keys[k].name] == null) continue;
                            route = route.replace((new RegExp(':'+ info.keys[k].name, 'g')), obj.routeData[info.keys[k].name]);
                        }
                    }
                    setTimeout(function () { window.location.hash = route; }, 1);
                }
                // event after
                obj.trigger($.extend(eventData, { phase: 'after' }));
            }, 1);
        },

        keydown: function (event) {
            var obj = this;
            var nd  = obj.get(obj.selected);
            if (!nd || obj.keyboard !== true) return;
            // trigger event
            var eventData = obj.trigger({ phase: 'before', type: 'keydown', target: obj.name, originalEvent: event });
            if (eventData.isCancelled === true) return;
            // default behaviour
            if (event.keyCode == 13 || event.keyCode == 32) { // enter or space
                if (nd.nodes.length > 0) obj.toggle(obj.selected);
            }
            if (event.keyCode == 37) { // left
                if (nd.nodes.length > 0 && nd.expanded) {
                    obj.collapse(obj.selected);
                } else {
                    selectNode(nd.parent);
                    if (!nd.parent.group) obj.collapse(nd.parent.id);
                }
            }
            if (event.keyCode == 39) { // right
                if ((nd.nodes.length > 0 || nd.plus) && !nd.expanded) obj.expand(obj.selected);
            }
            if (event.keyCode == 38) { // up
                selectNode(neighbor(nd, prev));
            }
            if (event.keyCode == 40) { // down
                selectNode(neighbor(nd, next));
            }
            // cancel event if needed
            if ($.inArray(event.keyCode, [13, 32, 37, 38, 39, 40]) != -1) {
                if (event.preventDefault) event.preventDefault();
                if (event.stopPropagation) event.stopPropagation();
            }
            // event after
            obj.trigger($.extend(eventData, { phase: 'after' }));

            function selectNode (node, event) {
                if (node !== null && !node.hidden && !node.disabled && !node.group) {
                    obj.click(node.id, event);
                    setTimeout(function () { obj.scrollIntoView(); }, 50);
                }
            }

            function neighbor (node, neighborFunc) {
                node = neighborFunc(node);
                while (node !== null && (node.hidden || node.disabled)) {
                    if (node.group) break; else node = neighborFunc(node);
                }
                return node;
            }

            function next (node, noSubs) {
                if (node === null) return null;
                var parent   = node.parent;
                var ind      = obj.get(node.id, true);
                var nextNode = null;
                // jump inside
                if (node.expanded && node.nodes.length > 0 && noSubs !== true) {
                    var t = node.nodes[0];
                    if (t.hidden || t.disabled || t.group) nextNode = next(t); else nextNode = t;
                } else {
                    if (parent && ind + 1 < parent.nodes.length) {
                        nextNode = parent.nodes[ind + 1];
                    } else {
                        nextNode = next(parent, true); // jump to the parent
                    }
                }
                if (nextNode !== null && (nextNode.hidden || nextNode.disabled || nextNode.group)) nextNode = next(nextNode);
                return nextNode;
            }

            function prev (node) {
                if (node === null) return null;
                var parent   = node.parent;
                var ind      = obj.get(node.id, true);
                var prevNode = (ind > 0) ? lastChild(parent.nodes[ind - 1]) : parent;
                if (prevNode !== null && (prevNode.hidden || prevNode.disabled || prevNode.group)) prevNode = prev(prevNode);
                return prevNode;
            }

            function lastChild (node) {
                if (node.expanded && node.nodes.length > 0) {
                    var t = node.nodes[node.nodes.length - 1];
                    if (t.hidden || t.disabled || t.group) return prev(t); else return lastChild(t);
                }
                return node;
            }
        },

        scrollIntoView: function (id) {
            if (typeof id == 'undefined') id = this.selected;
            var nd = this.get(id);
            if (nd === null) return;
            var body   = $(this.box).find('.w2ui-sidebar-div');
            var item   = $(this.box).find('#node_'+ w2utils.escapeId(id));
            var offset = item.offset().top - body.offset().top;
            if (offset + item.height() > body.height()) {
                body.animate({ 'scrollTop': body.scrollTop() + body.height() / 1.3 }, 250, 'linear');
            }
            if (offset <= 0) {
                body.animate({ 'scrollTop': body.scrollTop() - body.height() / 1.3 }, 250, 'linear');
            }
        },

        dblClick: function (id, event) {
            // if (window.getSelection) window.getSelection().removeAllRanges(); // clear selection
            var nd = this.get(id);
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'dblClick', target: id, originalEvent: event, object: nd });
            if (eventData.isCancelled === true) return;
            // default action
            this.toggle(id);
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        contextMenu: function (id, event) {
            var obj = this;
            var nd  = obj.get(id);
            if (id != obj.selected) obj.click(id);
            // need timeout to allow click to finish first
            setTimeout(function () {
                // event before
                var eventData = obj.trigger({ phase: 'before', type: 'contextMenu', target: id, originalEvent: event, object: nd });
                if (eventData.isCancelled === true) return;
                // default action
                if (nd.group || nd.disabled) return;
                if (obj.menu.length > 0) {
                    $(obj.box).find('#node_'+ w2utils.escapeId(id))
                        .w2menu(obj.menu, {
                            left    : (event ? event.offsetX || event.pageX : 50) - 25,
                            onSelect: function (event) { 
                                obj.menuClick(id, parseInt(event.index), event.originalEvent); 
                            }
                        }
                    );
                }
                // event after
                obj.trigger($.extend(eventData, { phase: 'after' }));
            }, 150); // need timer 150 for FF
        },

        menuClick: function (itemId, index, event) {
            var obj = this;
            // event before
            var eventData = obj.trigger({ phase: 'before', type: 'menuClick', target: itemId, originalEvent: event, menuIndex: index, menuItem: obj.menu[index] });
            if (eventData.isCancelled === true) return;
            // default action
            // -- empty
            // event after
            obj.trigger($.extend(eventData, { phase: 'after' }));
        },

        render: function (box) {
            var time = (new Date()).getTime();
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'render', target: this.name, box: box });
            if (eventData.isCancelled === true) return;
            // default action
            if (typeof box != 'undefined' && box !== null) {
                if ($(this.box).find('> div > div.w2ui-sidebar-div').length > 0) {
                    $(this.box)
                        .removeAttr('name')
                        .removeClass('w2ui-reset w2ui-sidebar')
                        .html('');
                }
                this.box = box;
            }
            if (!this.box) return;
            $(this.box)
                .attr('name', this.name)
                .addClass('w2ui-reset w2ui-sidebar')
                .html('<div>'+
                        '<div class="w2ui-sidebar-top"></div>' +
                        '<div class="w2ui-sidebar-div"></div>'+
                        '<div class="w2ui-sidebar-bottom"></div>'+
                    '</div>'
                );
            $(this.box).find('> div').css({
                width    : $(this.box).width() + 'px',
                height: $(this.box).height() + 'px'
            });
            if ($(this.box).length > 0) $(this.box)[0].style.cssText += this.style;
            // adjust top and bottom
            if (this.topHTML !== '') {
                $(this.box).find('.w2ui-sidebar-top').html(this.topHTML);
                $(this.box).find('.w2ui-sidebar-div')
                    .css('top', $(this.box).find('.w2ui-sidebar-top').height() + 'px');
            }
            if (this.bottomHTML !== '') {
                $(this.box).find('.w2ui-sidebar-bottom').html(this.bottomHTML);
                $(this.box).find('.w2ui-sidebar-div')
                    .css('bottom', $(this.box).find('.w2ui-sidebar-bottom').height() + 'px');
            }
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            // ---
            this.refresh();
            return (new Date()).getTime() - time;
        },

        refresh: function (id) {
            var time = (new Date()).getTime();
            // if (window.getSelection) window.getSelection().removeAllRanges(); // clear selection
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'refresh', target: (typeof id != 'undefined' ? id : this.name) });
            if (eventData.isCancelled === true) return;
            // adjust top and bottom
            if (this.topHTML !== '') {
                $(this.box).find('.w2ui-sidebar-top').html(this.topHTML);
                $(this.box).find('.w2ui-sidebar-div')
                    .css('top', $(this.box).find('.w2ui-sidebar-top').height() + 'px');
            }
            if (this.bottomHTML !== '') {
                $(this.box).find('.w2ui-sidebar-bottom').html(this.bottomHTML);
                $(this.box).find('.w2ui-sidebar-div')
                    .css('bottom', $(this.box).find('.w2ui-sidebar-bottom').height() + 'px');
            }
            // default action
            $(this.box).find('> div').css({
                width : $(this.box).width() + 'px',
                height: $(this.box).height() + 'px'
            });
            var obj = this;
            var node, nd;
            var nm;
            if (typeof id == 'undefined') {
                node = this;
                nm   = '.w2ui-sidebar-div';
            } else {
                node = this.get(id);
                if (node === null) return;
                nm   = '#node_'+ w2utils.escapeId(node.id) + '_sub';
            }
            var nodeHTML;
            if (node !== this) {
                var tmp    = '#node_'+ w2utils.escapeId(node.id);
                nodeHTML    = getNodeHTML(node);
                $(this.box).find(tmp).before('<div id="sidebar_'+ this.name + '_tmp"></div>');
                $(this.box).find(tmp).remove();
                $(this.box).find(nm).remove();
                $('#sidebar_'+ this.name + '_tmp').before(nodeHTML);
                $('#sidebar_'+ this.name + '_tmp').remove();
            }
            // refresh sub nodes
            $(this.box).find(nm).html('');
            for (var i = 0; i < node.nodes.length; i++) {
                nd = node.nodes[i];
                nodeHTML = getNodeHTML(nd);
                $(this.box).find(nm).append(nodeHTML);
                if (nd.nodes.length !== 0) { this.refresh(nd.id); }
            }
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            return (new Date()).getTime() - time;

            function getNodeHTML(nd) {
                var html = '';
                var img  = nd.img;
                if (img === null) img = this.img;
                var icon = nd.icon;
                if (icon === null) icon = this.icon;
                // -- find out level
                var tmp   = nd.parent;
                var level = 0;
                while (tmp && tmp.parent !== null) {
                    if (tmp.group) level--;
                    tmp = tmp.parent;
                    level++;
                }
                if (typeof nd.caption != 'undefined') nd.text = nd.caption;
                if (nd.group) {
                    html =
                        '<div class="w2ui-node-group"  id="node_'+ nd.id +'"'+
                        '        onclick="w2ui[\''+ obj.name +'\'].toggle(\''+ nd.id +'\')"'+
                        '        onmouseout="$(this).find(\'span:nth-child(1)\').css(\'color\', \'transparent\')" '+
                        '        onmouseover="$(this).find(\'span:nth-child(1)\').css(\'color\', \'inherit\')">'+
                        (nd.groupShowHide ? '<span>'+ (!nd.hidden && nd.expanded ? w2utils.lang('Hide') : w2utils.lang('Show')) +'</span>' : '<span></span>') +
                        '    <span>'+ nd.text +'</span>'+
                        '</div>'+
                        '<div class="w2ui-node-sub" id="node_'+ nd.id +'_sub" style="'+ nd.style +';'+ (!nd.hidden && nd.expanded ? '' : 'display: none;') +'"></div>';
                } else {
                    if (nd.selected && !nd.disabled) obj.selected = nd.id;
                    tmp = '';
                    if (img) tmp = '<div class="w2ui-node-image w2ui-icon '+ img +    (nd.selected && !nd.disabled ? " w2ui-icon-selected" : "") +'"></div>';
                    if (icon) tmp = '<div class="w2ui-node-image"><span class="'+ icon +'"></span></div>';
                    html =
                    '<div class="w2ui-node '+ (nd.selected ? 'w2ui-selected' : '') +' '+ (nd.disabled ? 'w2ui-disabled' : '') +'" id="node_'+ nd.id +'" style="'+ (nd.hidden ? 'display: none;' : '') +'"'+
                        '    ondblclick="w2ui[\''+ obj.name +'\'].dblClick(\''+ nd.id +'\', event);"'+
                        '    oncontextmenu="w2ui[\''+ obj.name +'\'].contextMenu(\''+ nd.id +'\', event); '+
                        '        if (event.preventDefault) event.preventDefault();"'+
                        '    onClick="w2ui[\''+ obj.name +'\'].click(\''+ nd.id +'\', event); ">'+
                        '<table cellpadding="0" cellspacing="0" style="margin-left:'+ (level*18) +'px; padding-right:'+ (level*18) +'px"><tr>'+
                        '<td class="w2ui-node-dots" nowrap onclick="w2ui[\''+ obj.name +'\'].toggle(\''+ nd.id +'\'); '+
                        '        if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;">'+
                        '    <div class="w2ui-expand">'    + (nd.nodes.length > 0 ? (nd.expanded ? '-' : '+') : (nd.plus ? '+' : '')) + '</div>' +
                        '</td>'+
                        '<td class="w2ui-node-data" nowrap>'+
                            tmp +
                            (nd.count || nd.count === 0 ? '<div class="w2ui-node-count">'+ nd.count +'</div>' : '') +
                            '<div class="w2ui-node-caption">'+ nd.text +'</div>'+
                        '</td>'+
                        '</tr></table>'+
                    '</div>'+
                    '<div class="w2ui-node-sub" id="node_'+ nd.id +'_sub" style="'+ nd.style +';'+ (!nd.hidden && nd.expanded ? '' : 'display: none;') +'"></div>';
                }
                return html;
            }
        },

        resize: function () {
            var time = (new Date()).getTime();
            // if (window.getSelection) window.getSelection().removeAllRanges(); // clear selection
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'resize', target: this.name });
            if (eventData.isCancelled === true) return;
            // default action
            $(this.box).css('overflow', 'hidden');    // container should have no overflow
            //$(this.box).find('.w2ui-sidebar-div').css('overflow', 'hidden');
            $(this.box).find('> div').css({
                width        : $(this.box).width() + 'px',
                height    : $(this.box).height() + 'px'
            });
            //$(this.box).find('.w2ui-sidebar-div').css('overflow', 'auto');
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            return (new Date()).getTime() - time;
        },

        destroy: function () {
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'destroy', target: this.name });
            if (eventData.isCancelled === true) return;
            // clean up
            if ($(this.box).find('> div > div.w2ui-sidebar-div').length > 0) {
                $(this.box)
                    .removeAttr('name')
                    .removeClass('w2ui-reset w2ui-sidebar')
                    .html('');
            }
            delete w2ui[this.name];
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        lock: function (msg, showSpinner) {
            var box = $(this.box).find('> div:first-child');
            var args = Array.prototype.slice.call(arguments, 0);
            args.unshift(box);
            w2utils.lock.apply(window, args);
        },

        unlock: function () {
            w2utils.unlock(this.box);
        }
    };

    $.extend(w2sidebar.prototype, w2utils.event);
    w2obj.sidebar = w2sidebar;
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

/************************************************************************
*   Library: Web 2.0 UI for jQuery (using prototypical inheritance)
*   - Following objects defined
*        - w2form      - form widget
*        - $().w2form  - jQuery wrapper
*   - Dependencies: jQuery, w2utils, w2fields, w2tabs, w2toolbar, w2alert
*
* == NICE TO HAVE ==
*   - refresh(field) - would refresh only one field
*   - include delta on save
*   - create an example how to do cascadic dropdown
*   - form should read <select> <options> into items
*   - two way data bindings
*   - verify validation of fields
*   - when field is blank, set record.field = null
*   - show/hide a field
*   - added getChanges() - not complete
*
************************************************************************/


(function () {
    var w2form = function(options) {
        // public properties
        this.name      = null;
        this.header    = '';
        this.box       = null;     // HTML element that hold this element
        this.url       = '';
        this.routeData = {};       // data for dynamic routes
        this.formURL   = '';       // url where to get form HTML
        this.formHTML  = '';       // form HTML (might be loaded from the url)
        this.page      = 0;        // current page
        this.recid     = 0;        // can be null or 0
        this.fields    = [];
        this.actions   = {};
        this.record    = {};
        this.original  = {};
        this.postData  = {};
        this.toolbar   = {};       // if not empty, then it is toolbar
        this.tabs      = {};       // if not empty, then it is tabs object

        this.style         = '';
        this.focus         = 0;    // focus first or other element
        this.msgNotJSON    = w2utils.lang('Return data is not in JSON format.');
        this.msgAJAXerror  = w2utils.lang('AJAX error. See console for more details.');
        this.msgRefresh    = w2utils.lang('Refreshing...');
        this.msgSaving     = w2utils.lang('Saving...');

        // events
        this.onRequest   = null;
        this.onLoad      = null;
        this.onValidate  = null;
        this.onSubmit    = null;
        this.onSave      = null;
        this.onChange    = null;
        this.onRender    = null;
        this.onRefresh   = null;
        this.onResize    = null;
        this.onDestroy   = null;
        this.onAction    = null;
        this.onToolbar   = null;
        this.onError     = null;

        // internal
        this.isGenerated = false;
        this.last = {
            xhr: null        // jquery xhr requests
        }

        $.extend(true, this, w2obj.form, options);
    };

    // ====================================================
    // -- Registers as a jQuery plugin

    $.fn.w2form = function(method) {
        if (typeof method === 'object' || !method ) {
            var obj = this;
            // check name parameter
            if (!w2utils.checkName(method, 'w2form')) return;
            // remember items
            var record   = method.record;
            var original = method.original;
            var fields   = method.fields;
            var toolbar  = method.toolbar;
            var tabs     = method.tabs;
            // extend items
            var object = new w2form(method);
            $.extend(object, { record: {}, original: {}, fields: [], tabs: {}, toolbar: {}, handlers: [] });
            if ($.isArray(tabs)) {
                $.extend(true, object.tabs, { tabs: [] });
                for (var t in tabs) {
                    var tmp = tabs[t];
                    if (typeof tmp === 'object') object.tabs.tabs.push(tmp); else object.tabs.tabs.push({ id: tmp, caption: tmp });
                }
            } else {
                $.extend(true, object.tabs, tabs);
            }
            $.extend(true, object.toolbar, toolbar);
            // reassign variables
            for (var p in fields) {
                var field = $.extend(true, {}, fields[p]);
                if (typeof field.name == 'undefined' && typeof field.field != 'undefined') field.name = field.field;
                if (typeof field.field == 'undefined' && typeof field.name != 'undefined') field.field = field.name;
                object.fields[p] = field;
            }
            for (var p in record) {
                if ($.isPlainObject(record[p])) {
                    object.record[p] = $.extend(true, {}, record[p]);
                } else {
                    object.record[p] = record[p];
                }
            }
            for (var p in original) {
                if ($.isPlainObject(original[p])) {
                    object.original[p] = $.extend(true, {}, original[p]);
                } else {
                    object.original[p] = original[p];
                }
            }
            if (obj.length > 0) object.box = obj[0];
            // render if necessary
            if (object.formURL != '') {
                $.get(object.formURL, function (data) { // should always be $.get as it is template
                    object.formHTML = data;
                    object.isGenerated = true;
                    if ($(object.box).length != 0 || data.length != 0) {
                        $(object.box).html(data);
                        object.render(object.box);
                    }
                });
            } else if (object.formHTML != '') {
                // it is already loaded into formHTML
            } else if ($(this).length != 0 && $.trim($(this).html()) != '') {
                object.formHTML = $(this).html();
            }  else { // try to generate it
                object.formHTML = object.generateHTML();
            }
            // register new object
            w2ui[object.name] = object;
            // render if not loaded from url
            if (object.formURL == '') {
                if (String(object.formHTML).indexOf('w2ui-page') == -1) {
                    object.formHTML = '<div class="w2ui-page page-0">'+ object.formHTML +'</div>';
                }
                $(object.box).html(object.formHTML);
                object.isGenerated = true;
                object.render(object.box);
            }
            return object;

        } else if (w2ui[$(this).attr('name')]) {
            var obj = w2ui[$(this).attr('name')];
            obj[method].apply(obj, Array.prototype.slice.call(arguments, 1));
            return this;
        } else {
            console.log('ERROR: Method ' +  method + ' does not exist on jQuery.w2form');
        }
    };

    // ====================================================
    // -- Implementation of core functionality

    w2form.prototype = {

        get: function (field, returnIndex) {
            if (arguments.length === 0) {
                var all = [];
                for (var f1 in this.fields) {
                    if (this.fields[f1].name != null) all.push(this.fields[f1].name);
                }
                return all;
            } else {
                for (var f2 in this.fields) {
                    if (this.fields[f2].name == field) {
                        if (returnIndex === true) return f2; else return this.fields[f2];
                    }
                }
                return null;
            }
        },

        set: function (field, obj) {
            for (var f in this.fields) {
                if (this.fields[f].name == field) {
                    $.extend(this.fields[f] , obj);
                    this.refresh();
                    return true;
                }
            }
            return false;
        },

        reload: function (callBack) {
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            if (url && this.recid != 0) {
                // this.clear();
                this.request(callBack);
            } else {
                // this.refresh(); // no need to refresh
                if (typeof callBack == 'function') callBack();
            }
        },

        clear: function () {
            this.recid  = 0;
            this.record = {};
            $().w2tag();
            this.refresh();
        },

        error: function (msg) {
            var obj = this;
            // let the management of the error outside of the grid
            var eventData = this.trigger({ target: this.name, type: 'error', message: msg , xhr: this.last.xhr });
            if (eventData.isCancelled === true) {
                if (typeof callBack == 'function') callBack();
                return;
            }
            // need a time out because message might be already up)
            setTimeout(function () { w2alert(msg, 'Error');    }, 1);
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        validate: function (showErrors) {
            if (typeof showErrors == 'undefined') showErrors = true;
            $().w2tag(); // hide all tags before validating
            // validate before saving
            var errors = [];
            for (var f in this.fields) {
                var field = this.fields[f];
                if (this.record[field.name] == null) this.record[field.name] = '';
                switch (field.type) {
                    case 'int':
                        if (this.record[field.name] && !w2utils.isInt(this.record[field.name])) {
                            errors.push({ field: field, error: w2utils.lang('Not an integer') });
                        }
                        break;
                    case 'float':
                        if (this.record[field.name] && !w2utils.isFloat(this.record[field.name])) {
                            errors.push({ field: field, error: w2utils.lang('Not a float') });
                        }
                        break;
                    case 'money':
                        if (this.record[field.name] && !w2utils.isMoney(this.record[field.name])) {
                            errors.push({ field: field, error: w2utils.lang('Not in money format') });
                        }
                        break;
                    case 'color':
                    case 'hex':
                        if (this.record[field.name] && !w2utils.isHex(this.record[field.name])) {
                            errors.push({ field: field, error: w2utils.lang('Not a hex number') });
                        }
                        break;
                    case 'email':
                        if (this.record[field.name] && !w2utils.isEmail(this.record[field.name])) {
                            errors.push({ field: field, error: w2utils.lang('Not a valid email') });
                        }
                        break;
                    case 'checkbox':
                        // convert true/false
                        if (this.record[field.name] == true) this.record[field.name] = 1; else this.record[field.name] = 0;
                        break;
                    case 'date':
                        // format date before submit
                        if (!field.options.format) field.options.format = w2utils.settings.date_format;
                        if (this.record[field.name] && !w2utils.isDate(this.record[field.name], field.options.format)) {
                            errors.push({ field: field, error: w2utils.lang('Not a valid date') + ': ' + field.options.format });
                        } else {
                        }
                        break;
                    case 'list':
                    case 'combo':
                        break;
                    case 'enum':
                        break;
                }
                // === check required - if field is '0' it should be considered not empty
                var val = this.record[field.name];
                if (field.required && (val === '' || ($.isArray(val) && val.length == 0) || ($.isPlainObject(val) && $.isEmptyObject(val)))) {
                    errors.push({ field: field, error: w2utils.lang('Required field') });
                }
                if (field.equalto && this.record[field.name] != this.record[field.equalto]) {
                    errors.push({ field: field, error: w2utils.lang('Field should be equal to ') + field.equalto });
                }
            }
            // event before
            var eventData = this.trigger({ phase: 'before', target: this.name, type: 'validate', errors: errors });
            if (eventData.isCancelled === true) return;
            // show error
            if (showErrors) for (var e in eventData.errors) {
                var err = eventData.errors[e];
                if (err.field.type == 'radio') { // for radio and checkboxes
                    $($(err.field.el).parents('div')[0]).w2tag(err.error, { "class": 'w2ui-error' });
                } else if (['enum', 'file'].indexOf(err.field.type) != -1) {
                    (function (err) {
                        setTimeout(function () {
                            var fld = $(err.field.el).data('w2field').helpers.multi;
                            $(err.field.el).w2tag(err.error);
                            $(fld).addClass('w2ui-error');
                        }, 1);
                    })(err);
                } else {
                    $(err.field.el).w2tag(err.error, { "class": 'w2ui-error' });
                }
                this.goto(errors[0].field.page);
            }
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            return errors;
        },

        getChanges: function () {
            var differ = function(record, original, result) {
                for (var i in record) {
                    if (typeof record[i] == "object") {
                        result[i] = differ(record[i], original[i] || {}, {});
                        if (!result[i] || $.isEmptyObject(result[i])) delete result[i];
                    } else if (record[i] != original[i]) {
                        result[i] = record[i];
                    }
                }
                return result;
            }
            return differ(this.record, this.original, {});
        },

        request: function (postData, callBack) { // if (1) param then it is call back if (2) then postData and callBack
            var obj = this;
            // check for multiple params
            if (typeof postData == 'function') {
                callBack = postData;
                postData = null;
            }
            if (typeof postData == 'undefined' || postData == null) postData = {};
            if (!this.url || (typeof this.url == 'object' && !this.url.get)) return;
            if (this.recid == null || typeof this.recid == 'undefined') this.recid = 0;
            // build parameters list
            var params = {};
            // add list params
            params['cmd']   = 'get-record';
            params['recid'] = this.recid;
            // append other params
            $.extend(params, this.postData);
            $.extend(params, postData);
            // event before
            var eventData = this.trigger({ phase: 'before', type: 'request', target: this.name, url: this.url, postData: params });
            if (eventData.isCancelled === true) { if (typeof callBack == 'function') callBack({ status: 'error', message: 'Request aborted.' }); return; }
            // default action
            this.record   = {};
            this.original = {};
            // call server to get data
            this.lock(this.msgRefresh);
            var url = eventData.url;
            if (typeof eventData.url == 'object' && eventData.url.get) url = eventData.url.get;
            if (this.last.xhr) try { this.last.xhr.abort(); } catch (e) {};
            // process url with routeData
            if (!$.isEmptyObject(obj.routeData)) {
                var info  = w2utils.parseRoute(url);
                if (info.keys.length > 0) {
                    for (var k = 0; k < info.keys.length; k++) {
                        if (obj.routeData[info.keys[k].name] == null) continue;
                        url = url.replace((new RegExp(':'+ info.keys[k].name, 'g')), obj.routeData[info.keys[k].name]);
                    }
                }
            }
            var ajaxOptions = {
                type     : 'POST',
                url      : url,
                data     : eventData.postData,
                dataType : 'text'   // expected from server
            };
            if (w2utils.settings.dataType == 'HTTP') {
                ajaxOptions.data = String($.param(ajaxOptions.data, false)).replace(/%5B/g, '[').replace(/%5D/g, ']');
            }
            if (w2utils.settings.dataType == 'RESTFULL') {
                ajaxOptions.type = 'GET';
                ajaxOptions.data = String($.param(ajaxOptions.data, false)).replace(/%5B/g, '[').replace(/%5D/g, ']');
            }
            if (w2utils.settings.dataType == 'JSON') {
                ajaxOptions.type        = 'POST';
                ajaxOptions.data        = JSON.stringify(ajaxOptions.data);
                ajaxOptions.contentType = 'application/json';
            }
            this.last.xhr = $.ajax(ajaxOptions)
                .done(function (data, status, xhr) {
                    obj.unlock();
                    // event before
                    var eventData = obj.trigger({ phase: 'before', target: obj.name, type: 'load', xhr: xhr });
                    if (eventData.isCancelled === true) {
                        if (typeof callBack == 'function') callBack({ status: 'error', message: 'Request aborted.' });
                        return;
                    }
                    // parse server response
                    var data;
                    var responseText = obj.last.xhr.responseText;
                    if (status != 'error') {
                        // default action
                        if (typeof responseText != 'undefined' && responseText != '') {
                            // check if the onLoad handler has not already parsed the data
                            if (typeof responseText == "object") {
                                data = responseText;
                            } else {
                                // $.parseJSON or $.getJSON did not work because those expect perfect JSON data - where everything is in double quotes
                                //
                                // TODO: avoid (potentially malicious) code injection from the response.
                                try { eval('data = '+ responseText); } catch (e) { }
                            }
                            if (typeof data == 'undefined') {
                                data = {
                                    status       : 'error',
                                    message      : obj.msgNotJSON,
                                    responseText : responseText
                                }
                            }
                            if (data['status'] == 'error') {
                                obj.error(data['message']);
                            } else {
                                obj.record   = $.extend({}, data.record);
                                obj.original = $.extend({}, data.record);
                            }
                        }
                    } else {
                        obj.error('AJAX Error ' + xhr.status + ': '+ xhr.statusText);
                        data = {
                            status       : 'error',
                            message      : obj.msgAJAXerror,
                            responseText : responseText
                        };
                    }
                    // event after
                    obj.trigger($.extend(eventData, { phase: 'after' }));
                    obj.refresh();
                    // call back
                    if (typeof callBack == 'function') callBack(data);
                })
                .fail(function (xhr, status, error) {
                    // trigger event
                    var errorObj = { status: status, error: error, rawResponseText: xhr.responseText };
                    var eventData2 = obj.trigger({ phase: 'before', type: 'error', error: errorObj, xhr: xhr });
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
                    // event after
                    obj.trigger($.extend(eventData2, { phase: 'after' }));
                });
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        submit: function (postData, callBack) {
            return this.save(postData, callBack);
        },

        save: function (postData, callBack) {
            var obj = this;
            $(this.box).find(':focus').change(); // trigger onchange
            // check for multiple params
            if (typeof postData == 'function') {
                callBack = postData;
                postData = null;
            }
            // validation
            var errors = obj.validate(true);
            if (errors.length !== 0) return;
            // submit save
            if (typeof postData == 'undefined' || postData == null) postData = {};
            if (!obj.url || (typeof obj.url == 'object' && !obj.url.save)) {
                console.log("ERROR: Form cannot be saved because no url is defined.");
                return;
            }
            obj.lock(obj.msgSaving + ' <span id="'+ obj.name +'_progress"></span>');
            // need timer to allow to lock
            setTimeout(function () {
                // build parameters list
                var params = {};
                // add list params
                params['cmd']   = 'save-record';
                params['recid'] = obj.recid;
                // append other params
                $.extend(params, obj.postData);
                $.extend(params, postData);
                params.record = $.extend(true, {}, obj.record);
                // event before
                var eventData = obj.trigger({ phase: 'before', type: 'submit', target: obj.name, url: obj.url, postData: params });
                if (eventData.isCancelled === true) return;
                // default action
                var url = eventData.url;
                if (typeof eventData.url == 'object' && eventData.url.save) url = eventData.url.save;
                if (obj.last.xhr) try { obj.last.xhr.abort(); } catch (e) {};
                // process url with routeData
                if (!$.isEmptyObject(obj.routeData)) {
                    var info  = w2utils.parseRoute(url);
                    if (info.keys.length > 0) {
                        for (var k = 0; k < info.keys.length; k++) {
                            if (obj.routeData[info.keys[k].name] == null) continue;
                            url = url.replace((new RegExp(':'+ info.keys[k].name, 'g')), obj.routeData[info.keys[k].name]);
                        }
                    }
                }
                var ajaxOptions = {
                    type     : 'POST',
                    url      : url,
                    data     : eventData.postData,
                    dataType : 'text',   // expected from server
                    xhr : function() {
                        var xhr = new window.XMLHttpRequest();
                        // upload
                        xhr.upload.addEventListener("progress", function(evt) {
                            if (evt.lengthComputable) {
                                var percent = Math.round(evt.loaded / evt.total * 100);
                                $('#'+ obj.name + '_progress').text(''+ percent + '%');
                            }
                        }, false);
                        return xhr;
                    }
                };
                if (w2utils.settings.dataType == 'HTTP') {
                    ajaxOptions.data = String($.param(ajaxOptions.data, false)).replace(/%5B/g, '[').replace(/%5D/g, ']');
                }
                if (w2utils.settings.dataType == 'RESTFULL') {
                    if (obj.recid != 0) ajaxOptions.type = 'PUT';
                    ajaxOptions.data = String($.param(ajaxOptions.data, false)).replace(/%5B/g, '[').replace(/%5D/g, ']');
                }
                if (w2utils.settings.dataType == 'JSON') {
                    ajaxOptions.type        = 'POST';
                    ajaxOptions.data        = JSON.stringify(ajaxOptions.data);
                    ajaxOptions.contentType = 'application/json';
                }

                obj.last.xhr = $.ajax(ajaxOptions)
                    .done(function (data, status, xhr) {
                        obj.unlock();
                        // event before
                        var eventData = obj.trigger({ phase: 'before', target: obj.name, type: 'save', xhr: xhr, status: status });
                        if (eventData.isCancelled === true) return;
                        // parse server response
                        var data;
                        var responseText = xhr.responseText;
                        if (status != 'error') {
                            // default action
                            if (typeof responseText != 'undefined' && responseText != '') {
                                // check if the onLoad handler has not already parsed the data
                                if (typeof responseText == "object") {
                                    data = responseText;
                                } else {
                                    // $.parseJSON or $.getJSON did not work because those expect perfect JSON data - where everything is in double quotes
                                    //
                                    // TODO: avoid (potentially malicious) code injection from the response.
                                    try { eval('data = '+ responseText); } catch (e) { }
                                }
                                if (typeof data == 'undefined') {
                                    data = {
                                        status       : 'error',
                                        message      : obj.msgNotJSON,
                                        responseText : responseText
                                    }
                                }
                                if (data['status'] == 'error') {
                                    obj.error(data['message']);
                                } else {
                                    obj.original = $.extend({}, obj.record);
                                }
                            }
                        } else {
                            obj.error('AJAX Error ' + xhr.status + ': '+ xhr.statusText);
                            data = {
                                status       : 'error',
                                message      : obj.msgAJAXerror,
                                responseText : responseText
                            };
                        }
                        // event after
                        obj.trigger($.extend(eventData, { phase: 'after' }));
                        obj.refresh();
                        // call back
                        if (data.status == 'success' && typeof callBack == 'function') callBack(data);
                    })
                    .fail(function (xhr, status, error) {
                        // trigger event
                        var errorObj = { status: status, error: error, rawResponseText: xhr.responseText };
                        var eventData2 = obj.trigger({ phase: 'before', type: 'error', error: errorObj, xhr: xhr });
                        if (eventData2.isCancelled === true) return;
                        // default behavior
                        console.log('ERROR: server communication failed. The server should return',
                            { status: 'success' }, 'OR', { status: 'error', message: 'error message' },
                            ', instead the AJAX request produced this: ', errorObj);
                        // event after
                        obj.trigger($.extend(eventData2, { phase: 'after' }));
                    });
                // event after
                obj.trigger($.extend(eventData, { phase: 'after' }));
            }, 50);
        },

        lock: function (msg, showSpinner) {
            var box = $(this.box).find('> div:first-child');
            var args = Array.prototype.slice.call(arguments, 0);
            args.unshift(box);
            w2utils.lock.apply(window, args);
        },

        unlock: function () {
            var obj = this;
            setTimeout(function () { w2utils.unlock(obj.box); }, 25); // needed timer so if server fast, it will not flash
        },

        goto: function (page) {
            if (typeof page != 'undefined') this.page = page;
            // if it was auto size, resize it
            if ($(this.box).data('auto-size') === true) $(this.box).height(0);
            this.refresh();
        },

        generateHTML: function () {
            var pages = []; // array for each page
            var group = '';
            var page;
            for (var f in this.fields) {
                var html = '';
                var field = this.fields[f];
                if (typeof field.html == 'undefined') field.html = {};
                field.html = $.extend(true, { caption: '', span: 6, attr: '', text: '', page: 0 }, field.html);
                if (typeof page == 'undefined') page = field.html.page;
                if (field.html.caption == '') field.html.caption = field.name;
                var input = '<input name="'+ field.name +'" type="text" '+ field.html.attr +'/>';
                if ((field.type === 'pass') || (field.type === 'password')){
                    input = '<input name="' + field.name + '" type = "password" ' + field.html.attr + '/>';
                }
                if (field.type == 'checkbox') input = '<input name="'+ field.name +'" type="checkbox" '+ field.html.attr +'/>';
                if (field.type == 'textarea') input = '<textarea name="'+ field.name +'" '+ field.html.attr +'></textarea>';
                if (field.type == 'toggle')   input = '<input name="'+ field.name +'" type="checkbox" '+ field.html.attr +' class="w2ui-toggle"/><div><div></div></div>';
                if (field.html.group) {
                    if (group != '') html += '\n   </div>';
                    html += '\n   <div class="w2ui-group-title">'+ field.html.group + '</div>\n   <div class="w2ui-group">';
                    group = field.html.group;
                }
                if (field.html.page != page && group != '') {
                    pages[pages.length-1] += '\n   </div>';
                    group = '';
                }
                html += '\n      <div class="w2ui-field '+ (typeof field.html.span != 'undefined' ? 'w2ui-span'+ field.html.span : '') +'">'+
                        '\n         <label>' + w2utils.lang(field.html.caption) +'</label>'+
                        '\n         <div>'+ input + w2utils.lang(field.html.text) + '</div>'+
                        '\n      </div>';
                if (typeof pages[field.html.page] == 'undefined') pages[field.html.page] = '';
                pages[field.html.page] += html;
                page = field.html.page;
            }
            if (group != '') pages[pages.length-1] += '\n   </div>';
            if (this.tabs.tabs) {
                for (var i = 0; i < this.tabs.tabs.length; i++) if (typeof pages[i] == 'undefined') pages[i] = '';
            }
            for (var p in pages) pages[p] = '<div class="w2ui-page page-'+ p +'">' + pages[p] + '\n</div>';
            // buttons if any
            var buttons = '';
            if (!$.isEmptyObject(this.actions)) {
                var addClass = '';
                buttons += '\n<div class="w2ui-buttons">';
                for (var a in this.actions) {
                    if (['save', 'update', 'create'].indexOf(a.toLowerCase()) != -1) addClass = 'w2ui-btn-green'; else addClass = '';
                    buttons += '\n    <button name="'+ a +'" class="w2ui-btn '+ addClass +'">'+ w2utils.lang(a) +'</button>';
                }
                buttons += '\n</div>';
            }
            return pages.join('') + buttons;
        },

        action: function (action, event) {
            // event before
            var eventData = this.trigger({ phase: 'before', target: action, type: 'action', originalEvent: event });
            if (eventData.isCancelled === true) return;
            // default actions
            if (typeof (this.actions[action]) == 'function') {
                this.actions[action].call(this, event);
            }
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
        },

        resize: function () {
            var obj = this;
            // event before
            var eventData = this.trigger({ phase: 'before', target: this.name, type: 'resize' });
            if (eventData.isCancelled === true) return;
            // default behaviour
            var main    = $(this.box).find('> div');
            var header  = $(this.box).find('> div .w2ui-form-header');
            var toolbar = $(this.box).find('> div .w2ui-form-toolbar');
            var tabs    = $(this.box).find('> div .w2ui-form-tabs');
            var page    = $(this.box).find('> div .w2ui-page');
            var cpage   = $(this.box).find('> div .w2ui-page.page-'+ this.page);
            var dpage   = $(this.box).find('> div .w2ui-page.page-'+ this.page + ' > div');
            var buttons = $(this.box).find('> div .w2ui-buttons');
            // if no height, calculate it
            resizeElements();
            if (parseInt($(this.box).height()) == 0 || $(this.box).data('auto-size') === true) {
                $(this.box).height(
                    (header.length > 0 ? w2utils.getSize(header, 'height') : 0) +
                    ((typeof this.tabs === 'object' && $.isArray(this.tabs.tabs) && this.tabs.tabs.length > 0) ? w2utils.getSize(tabs, 'height') : 0) +
                    ((typeof this.toolbar == 'object' && $.isArray(this.toolbar.items) && this.toolbar.items.length > 0) ? w2utils.getSize(toolbar, 'height') : 0) +
                    (page.length > 0 ? w2utils.getSize(dpage, 'height') + w2utils.getSize(cpage, '+height') + 12 : 0) +  // why 12 ???
                    (buttons.length > 0 ? w2utils.getSize(buttons, 'height') : 0)
                );
                $(this.box).data('auto-size', true);
            }
            resizeElements();
            // event after
            obj.trigger($.extend(eventData, { phase: 'after' }));

            function resizeElements() {
                // resize elements
                main.width($(obj.box).width()).height($(obj.box).height());
                toolbar.css('top', (obj.header != '' ? w2utils.getSize(header, 'height') : 0));
                tabs.css('top', (obj.header != '' ? w2utils.getSize(header, 'height') : 0)
                              + ((typeof obj.toolbar == 'object' && $.isArray(obj.toolbar.items) && obj.toolbar.items.length > 0) ? w2utils.getSize(toolbar, 'height') : 0));
                page.css('top', (obj.header != '' ? w2utils.getSize(header, 'height') : 0)
                              + ((typeof obj.toolbar == 'object' && $.isArray(obj.toolbar.items) && obj.toolbar.items.length > 0) ? w2utils.getSize(toolbar, 'height') + 5 : 0)
                              + ((typeof obj.tabs === 'object' && $.isArray(obj.tabs.tabs) && obj.tabs.tabs.length > 0) ? w2utils.getSize(tabs, 'height') + 5 : 0));
                page.css('bottom', (buttons.length > 0 ? w2utils.getSize(buttons, 'height') : 0));
            }
        },

        refresh: function () {
            var time = (new Date()).getTime();
            var obj = this;
            if (!this.box) return;
            if (!this.isGenerated || typeof $(this.box).html() == 'undefined') return;
            // update what page field belongs
            $(this.box).find('input, textarea, select').each(function (index, el) {
                var name  = (typeof $(el).attr('name') != 'undefined' ? $(el).attr('name') : $(el).attr('id'));
                var field = obj.get(name);
                if (field) {
                    // find page
                    var div = $(el).parents('.w2ui-page');
                    if (div.length > 0) {
                        for (var i = 0; i < 100; i++) {
                            if (div.hasClass('page-'+i)) { field.page = i; break; }
                        }
                    }
                }
            });
            // event before
            var eventData = this.trigger({ phase: 'before', target: this.name, type: 'refresh', page: this.page })
            if (eventData.isCancelled === true) return;
            // default action
            $(this.box).find('.w2ui-page').hide();
            $(this.box).find('.w2ui-page.page-' + this.page).show();
            $(this.box).find('.w2ui-form-header').html(this.header);
            // refresh tabs if needed
            if (typeof this.tabs === 'object' && $.isArray(this.tabs.tabs) && this.tabs.tabs.length > 0) {
                $('#form_'+ this.name +'_tabs').show();
                this.tabs.active = this.tabs.tabs[this.page].id;
                this.tabs.refresh();
            } else {
                $('#form_'+ this.name +'_tabs').hide();
            }
            // refresh tabs if needed
            if (typeof this.toolbar == 'object' && $.isArray(this.toolbar.items) && this.toolbar.items.length > 0) {
                $('#form_'+ this.name +'_toolbar').show();
                this.toolbar.refresh();
            } else {
                $('#form_'+ this.name +'_toolbar').hide();
            }
            // refresh values of all fields
            for (var f in this.fields) {
                var field = this.fields[f];
                if (typeof field.name == 'undefined' && typeof field.field != 'undefined') field.name = field.field;
                if (typeof field.field == 'undefined' && typeof field.name != 'undefined') field.field = field.name;
                field.$el = $(this.box).find('[name="'+ String(field.name).replace(/\\/g, '\\\\') +'"]');
                field.el  = field.$el[0];
                if (typeof field.el == 'undefined') {
                    console.log('ERROR: Cannot associate field "'+ field.name + '" with html control. Make sure html control exists with the same name.');
                    //return;
                }
                if (field.el) field.el.id = field.name;
                var tmp = $(field).data('w2field');
                if (tmp) tmp.clear();
                $(field.$el).off('change').on('change', function () {
                    var value_new      = this.value;
                    var value_previous = obj.record[this.name] ? obj.record[this.name] : '';
                    var field          = obj.get(this.name);
                    if (['list', 'enum', 'file'].indexOf(field.type) != -1 && $(this).data('selected')) {
                        var nv = $(this).data('selected');
                        var cv = obj.record[this.name];
                        if ($.isArray(nv)) {
                            value_new = [];
                            for (var i in nv) value_new[i] = $.extend(true, {}, nv[i]); // clone array
                        }
                        if ($.isPlainObject(nv)) {
                            value_new = $.extend(true, {}, nv); // clone object
                        }
                        if ($.isArray(cv)) {
                            value_previous = [];
                            for (var i in cv) value_previous[i] = $.extend(true, {}, cv[i]); // clone array
                        }
                        if ($.isPlainObject(cv)) {
                            value_previous = $.extend(true, {}, cv); // clone object
                        }
                    }
                    if (['toggle', 'checkbox'].indexOf(field.type) != -1) {
                        value_new = ($(this).prop('checked') ? true : false);
                    }
                    // clean extra chars
                    if (['int', 'float', 'percent', 'money', 'currency'].indexOf(field.type) != -1) {
                        value_new = $(this).data('w2field').clean(value_new);
                    }
                    if (value_new === value_previous) return;
                    // event before
                    var eventData = obj.trigger({ phase: 'before', target: this.name, type: 'change', value_new: value_new, value_previous: value_previous });
                    if (eventData.isCancelled === true) {
                        $(this).val(obj.record[this.name]); // return previous value
                        return;
                    }
                    // default action
                    var val = this.value;
                    if (this.type == 'select')   val = this.value;
                    if (this.type == 'checkbox') val = this.checked ? true : false;
                    if (this.type == 'radio') {
                        field.$el.each(function (index, el) {
                            if (el.checked) val = el.value;
                        });
                    }
                    if (['int', 'float', 'percent', 'money', 'currency', 'list', 'combo', 'enum', 'file', 'toggle'].indexOf(field.type) != -1) {
                        val = value_new;
                    }
                    if (['enum', 'file'].indexOf(field.type) != -1) {
                        if (val.length > 0) {
                            var fld = $(field.el).data('w2field').helpers.multi;
                            $(fld).removeClass('w2ui-error');
                        }
                    }
                    obj.record[this.name] = val;
                    // event after
                    obj.trigger($.extend(eventData, { phase: 'after' }));
                });
                if (field.required) {
                    $(field.el).parent().parent().addClass('w2ui-required');
                } else {
                    $(field.el).parent().parent().removeClass('w2ui-required');
                }
            }
            // attach actions on buttons
            $(this.box).find('button, input[type=button]').each(function (index, el) {
                $(el).off('click').on('click', function (event) {
                    var action = this.value;
                    if (this.id)   action = this.id;
                    if (this.name) action = this.name;
                    obj.action(action, event);
                });
            });
            // init controls with record
            for (var f in this.fields) {
                var field = this.fields[f];
                var value = (typeof this.record[field.name] != 'undefined' ? this.record[field.name] : '');
                if (!field.el) continue;
                field.type = String(field.type).toLowerCase();
                if (!field.options) field.options = {};
                switch (field.type) {
                    case 'text':
                    case 'textarea':
                    case 'email':
                    case 'pass':
                    case 'password':
                        field.el.value = value;
                        break;
                    case 'int':
                    case 'float':
                    case 'money':
                    case 'currency':
                    case 'percent':
                    case 'hex':
                    case 'alphanumeric':
                    case 'color':
                    case 'date':
                    case 'time':
                        field.el.value = value;
                        $(field.el).w2field($.extend({}, field.options, { type: field.type }));
                        break;
                    case 'toggle':
                        if (w2utils.isFloat(value)) value = parseFloat(value);
                        $(field.el).prop('checked', (value ? true : false));
                        this.record[field.name] = (value ? 1 : 0);
                        break;
                    // enums
                    case 'list':
                    case 'combo':
                        if (field.type == 'list') {
                            var tmp_value = ($.isPlainObject(value) ? value.id : value);
                            // normalized options
                            var items = field.options.items;
                            if ($.isArray(items) && items.length > 0 && !$.isPlainObject(items[0])) {
                                field.options.items = w2obj.field.prototype.normMenu(items);
                            }
                            // find value from items
                            for (var i in field.options.items) {
                                var item = field.options.items[i];
                                if (item.id == tmp_value) {
                                    value = $.extend(true, {}, item);
                                    obj.record[field.name] = value;
                                    break;
                                }
                            }
                        } else if (field.type == 'combo' && !$.isPlainObject(value)) {
                            field.el.value = value;
                        } else if ($.isPlainObject(value) && typeof value.text != 'undefined') {
                            field.el.value = value.text;
                        } else {
                            field.el.value = '';
                        }
                        if (!$.isPlainObject(value)) value = {};
                        $(field.el).w2field($.extend({}, field.options, { type: field.type, selected: value }));
                        break;
                    case 'enum':
                    case 'file':
                        if (!$.isArray(value)) value = [];
                        $(field.el).w2field($.extend({}, field.options, { type: field.type, selected: value }));
                        break;

                    // standard HTML
                    case 'select':
                        // generate options
                        var items = field.options.items;
                        if (typeof items != 'undefined' && items.length > 0) {
                            items = w2obj.field.prototype.normMenu(items);
                            $(field.el).html('');
                            for (var it in items) {
                                $(field.el).append('<option value="'+ items[it].id +'">' + items[it].text + '</option');
                            }
                        }
                        $(field.el).val(value);
                        break;
                    case 'radio':
                        $(field.$el).prop('checked', false).each(function (index, el) {
                            if ($(el).val() == value) $(el).prop('checked', true);
                        });
                        break;
                    case 'checkbox':
                        $(field.el).prop('checked', value ? true : false);
                        break;
                    default:
                        $(field.el).w2field($.extend({}, field.options, { type: field.type }));
                        break;
                }
            }
            // wrap pages in div
            var tmp = $(this.box).find('.w2ui-page');
            for (var i = 0; i < tmp.length; i++) {
                if ($(tmp[i]).find('> *').length > 1) $(tmp[i]).wrapInner('<div></div>');
            }
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            this.resize();
            return (new Date()).getTime() - time;
        },

        render: function (box) {
            var time = (new Date()).getTime();
            var obj = this;
            if (typeof box == 'object') {
                // remove from previous box
                if ($(this.box).find('#form_'+ this.name +'_tabs').length > 0) {
                    $(this.box).removeAttr('name')
                        .removeClass('w2ui-reset w2ui-form')
                        .html('');
                }
                this.box = box;
            }
            if (!this.isGenerated) return;
            if (!this.box) return;
            // event before
            var eventData = this.trigger({ phase: 'before', target: this.name, type: 'render', box: (typeof box != 'undefined' ? box : this.box) });
            if (eventData.isCancelled === true) return;
            // default actions
            if ($.isEmptyObject(this.original) && !$.isEmptyObject(this.record)) {
                this.original = $.extend(true, {}, this.record);
            }
            var html =  '<div>' +
                        (this.header != '' ? '<div class="w2ui-form-header">' + this.header + '</div>' : '') +
                        '    <div id="form_'+ this.name +'_toolbar" class="w2ui-form-toolbar"></div>' +
                        '    <div id="form_'+ this.name +'_tabs" class="w2ui-form-tabs"></div>' +
                            this.formHTML +
                        '</div>';
            $(this.box).attr('name', this.name)
                .addClass('w2ui-reset w2ui-form')
                .html(html);
            if ($(this.box).length > 0) $(this.box)[0].style.cssText += this.style;

            // init toolbar regardless it is defined or not
            if (typeof this.toolbar.render !== 'function') {
                this.toolbar = $().w2toolbar($.extend({}, this.toolbar, { name: this.name +'_toolbar', owner: this }));
                this.toolbar.on('click', function (event) {
                    var eventData = obj.trigger({ phase: 'before', type: 'toolbar', target: event.target, originalEvent: event });
                    if (eventData.isCancelled === true) return;
                    // no default action
                    obj.trigger($.extend(eventData, { phase: 'after' }));
                });
            }
            if (typeof this.toolbar == 'object' && typeof this.toolbar.render == 'function') {
                this.toolbar.render($('#form_'+ this.name +'_toolbar')[0]);
            }
            // init tabs regardless it is defined or not
            if (typeof this.tabs.render !== 'function') {
                this.tabs = $().w2tabs($.extend({}, this.tabs, { name: this.name +'_tabs', owner: this }));
                this.tabs.on('click', function (event) {
                    obj.goto(this.get(event.target, true));
                });
            }
            if (typeof this.tabs == 'object' && typeof this.tabs.render == 'function') {
                this.tabs.render($('#form_'+ this.name +'_tabs')[0]);
            }
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            // after render actions
            this.resize();
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            if (url && this.recid != 0) {
                this.request();
            } else {
                this.refresh();
            }
            // attach to resize event
            if ($('.w2ui-layout').length == 0) { // if there is layout, it will send a resize event
                this.tmp_resize = function (event) { w2ui[obj.name].resize(); }
                $(window).off('resize', 'body').on('resize', 'body', this.tmp_resize);
            }
            setTimeout(function () { obj.resize(); obj.refresh(); }, 150); // need timer because resize is on timer
            // focus on load
            function focusEl() {
                var inputs = $(obj.box).find('input, select, textarea');
                if (inputs.length > obj.focus) inputs[obj.focus].focus();
            }
            if (this.focus >= 0) setTimeout(focusEl, 500); // need timeout to allow form to render
            return (new Date()).getTime() - time;
        },

        destroy: function () {
            // event before
            var eventData = this.trigger({ phase: 'before', target: this.name, type: 'destroy' });
            if (eventData.isCancelled === true) return;
            // clean up
            if (typeof this.toolbar == 'object' && this.toolbar.destroy) this.toolbar.destroy();
            if (typeof this.tabs == 'object' && this.tabs.destroy) this.tabs.destroy();
            if ($(this.box).find('#form_'+ this.name +'_tabs').length > 0) {
                $(this.box)
                    .removeAttr('name')
                    .removeClass('w2ui-reset w2ui-form')
                    .html('');
            }
            delete w2ui[this.name];
            // event after
            this.trigger($.extend(eventData, { phase: 'after' }));
            $(window).off('resize', 'body')
        }
    };

    $.extend(w2form.prototype, w2utils.event);
    w2obj.form = w2form;
})();

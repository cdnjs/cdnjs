if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["/build/datatype-date-format/datatype-date-format.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/datatype-date-format/datatype-date-format.js",
    code: []
};
_yuitest_coverage["/build/datatype-date-format/datatype-date-format.js"].code=["YUI.add('datatype-date-format', function(Y) {","","/**"," * The DataType Utility provides type-conversion and string-formatting"," * convenience methods for various JavaScript object types."," *"," * @module datatype"," * @main datatype"," */","","/**"," * Date submodule."," *"," * @module datatype"," * @submodule datatype-date"," */","","/**"," * Format date submodule implements strftime formatters for javascript based on the"," * Open Group specification defined at"," * http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html"," * This implementation does not include modified conversion specifiers (i.e., Ex and Ox)"," *"," * @module datatype"," * @submodule datatype-date-format"," */","","/**"," * DataType.Date provides a set of utility functions to operate against Date objects."," *"," * @class DataType.Date"," * @static"," */","","/**"," * Pad a number with leading spaces, zeroes or something else"," * @method xPad"," * @param x {Number}	The number to be padded"," * @param pad {String}  The character to pad the number with"," * @param r {Number}	(optional) The base of the pad, eg, 10 implies to two digits, 100 implies to 3 digits."," * @private"," */","var xPad=function (x, pad, r)","{","	if(typeof r === \"undefined\")","	{","		r=10;","	}","	pad = pad + \"\"; ","	for( ; parseInt(x, 10)<r && r>1; r/=10) {","		x = pad + x;","	}","	return x.toString();","};","","var Dt = {","	formats: {","		a: function (d, l) { return l.a[d.getDay()]; },","		A: function (d, l) { return l.A[d.getDay()]; },","		b: function (d, l) { return l.b[d.getMonth()]; },","		B: function (d, l) { return l.B[d.getMonth()]; },","		C: function (d) { return xPad(parseInt(d.getFullYear()/100, 10), 0); },","		d: [\"getDate\", \"0\"],","		e: [\"getDate\", \" \"],","		g: function (d) { return xPad(parseInt(Dt.formats.G(d)%100, 10), 0); },","		G: function (d) {","				var y = d.getFullYear();","				var V = parseInt(Dt.formats.V(d), 10);","				var W = parseInt(Dt.formats.W(d), 10);","	","				if(W > V) {","					y++;","				} else if(W===0 && V>=52) {","					y--;","				}","	","				return y;","			},","		H: [\"getHours\", \"0\"],","		I: function (d) { var I=d.getHours()%12; return xPad(I===0?12:I, 0); },","		j: function (d) {","				var gmd_1 = new Date(\"\" + d.getFullYear() + \"/1/1 GMT\");","				var gmdate = new Date(\"\" + d.getFullYear() + \"/\" + (d.getMonth()+1) + \"/\" + d.getDate() + \" GMT\");","				var ms = gmdate - gmd_1;","				var doy = parseInt(ms/60000/60/24, 10)+1;","				return xPad(doy, 0, 100);","			},","		k: [\"getHours\", \" \"],","		l: function (d) { var I=d.getHours()%12; return xPad(I===0?12:I, \" \"); },","		m: function (d) { return xPad(d.getMonth()+1, 0); },","		M: [\"getMinutes\", \"0\"],","		p: function (d, l) { return l.p[d.getHours() >= 12 ? 1 : 0 ]; },","		P: function (d, l) { return l.P[d.getHours() >= 12 ? 1 : 0 ]; },","		s: function (d, l) { return parseInt(d.getTime()/1000, 10); },","		S: [\"getSeconds\", \"0\"],","		u: function (d) { var dow = d.getDay(); return dow===0?7:dow; },","		U: function (d) {","				var doy = parseInt(Dt.formats.j(d), 10);","				var rdow = 6-d.getDay();","				var woy = parseInt((doy+rdow)/7, 10);","				return xPad(woy, 0);","			},","		V: function (d) {","				var woy = parseInt(Dt.formats.W(d), 10);","				var dow1_1 = (new Date(\"\" + d.getFullYear() + \"/1/1\")).getDay();","				// First week is 01 and not 00 as in the case of %U and %W,","				// so we add 1 to the final result except if day 1 of the year","				// is a Monday (then %W returns 01).","				// We also need to subtract 1 if the day 1 of the year is ","				// Friday-Sunday, so the resulting equation becomes:","				var idow = woy + (dow1_1 > 4 || dow1_1 <= 1 ? 0 : 1);","				if(idow === 53 && (new Date(\"\" + d.getFullYear() + \"/12/31\")).getDay() < 4)","				{","					idow = 1;","				}","				else if(idow === 0)","				{","					idow = Dt.formats.V(new Date(\"\" + (d.getFullYear()-1) + \"/12/31\"));","				}","	","				return xPad(idow, 0);","			},","		w: \"getDay\",","		W: function (d) {","				var doy = parseInt(Dt.formats.j(d), 10);","				var rdow = 7-Dt.formats.u(d);","				var woy = parseInt((doy+rdow)/7, 10);","				return xPad(woy, 0, 10);","			},","		y: function (d) { return xPad(d.getFullYear()%100, 0); },","		Y: \"getFullYear\",","		z: function (d) {","				var o = d.getTimezoneOffset();","				var H = xPad(parseInt(Math.abs(o/60), 10), 0);","				var M = xPad(Math.abs(o%60), 0);","				return (o>0?\"-\":\"+\") + H + M;","			},","		Z: function (d) {","			var tz = d.toString().replace(/^.*:\\d\\d( GMT[+-]\\d+)? \\(?([A-Za-z ]+)\\)?\\d*$/, \"$2\").replace(/[a-z ]/g, \"\");","			if(tz.length > 4) {","				tz = Dt.formats.z(d);","			}","			return tz;","		},","		\"%\": function (d) { return \"%\"; }","	},","","	aggregates: {","		c: \"locale\",","		D: \"%m/%d/%y\",","		F: \"%Y-%m-%d\",","		h: \"%b\",","		n: \"\\n\",","		r: \"%I:%M:%S %p\",","		R: \"%H:%M\",","		t: \"\\t\",","		T: \"%H:%M:%S\",","		x: \"locale\",","		X: \"locale\"","		//\"+\": \"%a %b %e %T %Z %Y\"","	},","","	 /**","	 * Takes a native JavaScript Date and formats it as a string for display to user.","	 *","	 * @for DataType.Date","	 * @method format","	 * @param oDate {Date} Date.","	 * @param oConfig {Object} (Optional) Object literal of configuration values:","	 *  <dl>","	 *   <dt>format {HTML} (Optional)</dt>","	 *   <dd>","	 *   <p>","	 *   Any strftime string is supported, such as \"%I:%M:%S %p\". strftime has several format specifiers defined by the Open group at ","	 *   <a href=\"http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html\">http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html</a>","	 *   PHP added a few of its own, defined at <a href=\"http://www.php.net/strftime\">http://www.php.net/strftime</a>","	 *   </p>","	 *   <p>","	 *   This javascript implementation supports all the PHP specifiers and a few more.  The full list is below.","	 *   </p>","	 *   <p>","	 *   If not specified, it defaults to the ISO 8601 standard date format: %Y-%m-%d.","     *   This may be overridden by the deprecated Y.config.dateFormat property.","	 *   </p>","	 *   <dl>","	 *	<dt>%a</dt> <dd>abbreviated weekday name according to the current locale</dd>","	 *	<dt>%A</dt> <dd>full weekday name according to the current locale</dd>","	 *	<dt>%b</dt> <dd>abbreviated month name according to the current locale</dd>","	 *	<dt>%B</dt> <dd>full month name according to the current locale</dd>","	 *	<dt>%c</dt> <dd>preferred date and time representation for the current locale</dd>","	 *	<dt>%C</dt> <dd>century number (the year divided by 100 and truncated to an integer, range 00 to 99)</dd>","	 *	<dt>%d</dt> <dd>day of the month as a decimal number (range 01 to 31)</dd>","	 *	<dt>%D</dt> <dd>same as %m/%d/%y</dd>","	 *	<dt>%e</dt> <dd>day of the month as a decimal number, a single digit is preceded by a space (range \" 1\" to \"31\")</dd>","	 *	<dt>%F</dt> <dd>same as %Y-%m-%d (ISO 8601 date format)</dd>","	 *	<dt>%g</dt> <dd>like %G, but without the century</dd>","	 *	<dt>%G</dt> <dd>The 4-digit year corresponding to the ISO week number</dd>","	 *	<dt>%h</dt> <dd>same as %b</dd>","	 *	<dt>%H</dt> <dd>hour as a decimal number using a 24-hour clock (range 00 to 23)</dd>","	 *	<dt>%I</dt> <dd>hour as a decimal number using a 12-hour clock (range 01 to 12)</dd>","	 *	<dt>%j</dt> <dd>day of the year as a decimal number (range 001 to 366)</dd>","	 *	<dt>%k</dt> <dd>hour as a decimal number using a 24-hour clock (range 0 to 23); single digits are preceded by a blank. (See also %H.)</dd>","	 *	<dt>%l</dt> <dd>hour as a decimal number using a 12-hour clock (range 1 to 12); single digits are preceded by a blank. (See also %I.) </dd>","	 *	<dt>%m</dt> <dd>month as a decimal number (range 01 to 12)</dd>","	 *	<dt>%M</dt> <dd>minute as a decimal number</dd>","	 *	<dt>%n</dt> <dd>newline character</dd>","	 *	<dt>%p</dt> <dd>either \"AM\" or \"PM\" according to the given time value, or the corresponding strings for the current locale</dd>","	 *	<dt>%P</dt> <dd>like %p, but lower case</dd>","	 *	<dt>%r</dt> <dd>time in a.m. and p.m. notation equal to %I:%M:%S %p</dd>","	 *	<dt>%R</dt> <dd>time in 24 hour notation equal to %H:%M</dd>","	 *	<dt>%s</dt> <dd>number of seconds since the Epoch, ie, since 1970-01-01 00:00:00 UTC</dd>","	 *	<dt>%S</dt> <dd>second as a decimal number</dd>","	 *	<dt>%t</dt> <dd>tab character</dd>","	 *	<dt>%T</dt> <dd>current time, equal to %H:%M:%S</dd>","	 *	<dt>%u</dt> <dd>weekday as a decimal number [1,7], with 1 representing Monday</dd>","	 *	<dt>%U</dt> <dd>week number of the current year as a decimal number, starting with the","	 *			first Sunday as the first day of the first week</dd>","	 *	<dt>%V</dt> <dd>The ISO 8601:1988 week number of the current year as a decimal number,","	 *			range 01 to 53, where week 1 is the first week that has at least 4 days","	 *			in the current year, and with Monday as the first day of the week.</dd>","	 *	<dt>%w</dt> <dd>day of the week as a decimal, Sunday being 0</dd>","	 *	<dt>%W</dt> <dd>week number of the current year as a decimal number, starting with the","	 *			first Monday as the first day of the first week</dd>","	 *	<dt>%x</dt> <dd>preferred date representation for the current locale without the time</dd>","	 *	<dt>%X</dt> <dd>preferred time representation for the current locale without the date</dd>","	 *	<dt>%y</dt> <dd>year as a decimal number without a century (range 00 to 99)</dd>","	 *	<dt>%Y</dt> <dd>year as a decimal number including the century</dd>","	 *	<dt>%z</dt> <dd>numerical time zone representation</dd>","	 *	<dt>%Z</dt> <dd>time zone name or abbreviation</dd>","	 *	<dt>%%</dt> <dd>a literal \"%\" character</dd>","	 *   </dl>","	 *  </dd>","	 *  <dt>locale {String} (Deprecated, optional)</dt>","	 *  <dd>","     *   <b>Deprecated - use Y.config.lang instead, which provides access to a much larger set of built-in languages.</b>","	 *   The locale to use when displaying days of week, months of the year, and other locale specific","	 *   strings. If not specified, this defaults to \"en\" (though this may be overridden by the deprecated Y.config.locale).","	 *   The following locales are built in:","	 *   <dl>","	 *    <dt>en</dt>","	 *    <dd>English</dd>","	 *    <dt>en-US</dt>","	 *    <dd>US English</dd>","	 *    <dt>en-GB</dt>","	 *    <dd>British English</dd>","	 *    <dt>en-AU</dt>","	 *    <dd>Australian English (identical to British English)</dd>","	 *   </dl>","	 *   More locales may be added by subclassing of the deprecated Y.DataType.Date.Locale[\"en\"].","	 *   See Y.DataType.Date.Locale for more information.","	 *  </dd>","	 * </dl>","	 * @return {HTML} Formatted date for display.","	 */","	format : function (oDate, oConfig) {","		oConfig = oConfig || {};","		","		if(!Y.Lang.isDate(oDate)) {","			return Y.Lang.isValue(oDate) ? oDate : \"\";","		}","","		var format, resources, compatMode, sLocale, LOCALE;","","        // Y.config.dateFormat is deprecated - remove from YUI 3.2","        format = oConfig.format || Y.config.dateFormat  || \"%Y-%m-%d\";","        // compatMode supports deprecated features - remove from YUI 3.2","        compatMode = Y.Lang.isUndefined(Y.config.lang) && (Y.Lang.isValue(oConfig.locale) || Y.Lang.isValue(Y.config.locale));","        if (compatMode) {","			sLocale = oConfig.locale || Y.config.locale;","			LOCALE = Y.DataType.Date.Locale;","            sLocale = sLocale.replace(/_/g, \"-\");","            ","            // Make sure we have a definition for the requested locale, or default to en.","            if(!LOCALE[sLocale]) {","                var tmpLocale = sLocale.replace(/-[a-zA-Z]+$/, \"\");","                if(tmpLocale in LOCALE) {","                    sLocale = tmpLocale;","                } else if(Y.config.locale in LOCALE) {","                    sLocale = Y.config.locale;","                } else {","                    sLocale = \"en\";","                }","            }","    ","            resources = LOCALE[sLocale];","        } else {","            resources = Y.Intl.get('datatype-date-format');","        }","","		var replace_aggs = function (m0, m1) {","			if (compatMode && m1 === \"r\") {","			    return resources[m1];","			}","			var f = Dt.aggregates[m1];","			return (f === \"locale\" ? resources[m1] : f);","		};","","		var replace_formats = function (m0, m1) {","			var f = Dt.formats[m1];","			switch(Y.Lang.type(f)) {","				case \"string\":					// string => built in date function","					return oDate[f]();","				case \"function\":				// function => our own function","					return f.call(oDate, oDate, resources);","				case \"array\":					// built in function with padding","					if(Y.Lang.type(f[0]) === \"string\") {","						return xPad(oDate[f[0]](), f[1]);","					} // no break; (fall through to default:)","				default:","                    // Y.config.dateFormat is deprecated - remove from YUI 3.2","					return m1;","			}","		};","","		// First replace aggregates (run in a loop because an agg may be made up of other aggs)","		while(format.match(/%[cDFhnrRtTxX]/)) {","			format = format.replace(/%([cDFhnrRtTxX])/g, replace_aggs);","		}","","		// Now replace formats (do not run in a loop otherwise %%a will be replace with the value of %a)","		var str = format.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g, replace_formats);","","		replace_aggs = replace_formats = undefined;","","		return str;","	}","};","","Y.mix(Y.namespace(\"DataType.Date\"), Dt);","/**"," * @module datatype","*/","","/**"," * The Date.Locale class is a container for all localised date strings"," * used by Y.DataType.Date. It is used internally, but may be extended"," * to provide new date localisations."," *"," * To create your own Locale, follow these steps:"," * <ol>"," *  <li>Find an existing locale that matches closely with your needs</li>"," *  <li>Use this as your base class.  Use Y.DataType.Date.Locale[\"en\"] if nothing"," *   matches.</li>"," *  <li>Create your own class as an extension of the base class using"," *   Y.merge, and add your own localisations where needed.</li>"," * </ol>"," * See the Y.DataType.Date.Locale[\"en-US\"] and Y.DataType.Date.Locale[\"en-GB\"]"," * classes which extend Y.DataType.Date.Locale[\"en\"]."," *"," * For example, to implement locales for French french and Canadian french,"," * we would do the following:"," * <ol>"," *  <li>For French french, we have no existing similar locale, so use"," *   Y.DataType.Date.Locale[\"en\"] as the base, and extend it:"," *   <pre>"," *      Y.DataType.Date.Locale[\"fr\"] = Y.merge(Y.DataType.Date.Locale[\"en\"], {"," *          a: [\"dim\", \"lun\", \"mar\", \"mer\", \"jeu\", \"ven\", \"sam\"],"," *          A: [\"dimanche\", \"lundi\", \"mardi\", \"mercredi\", \"jeudi\", \"vendredi\", \"samedi\"],"," *          b: [\"jan\", \"f&eacute;v\", \"mar\", \"avr\", \"mai\", \"jun\", \"jui\", \"ao&ucirc;\", \"sep\", \"oct\", \"nov\", \"d&eacute;c\"],"," *          B: [\"janvier\", \"f&eacute;vrier\", \"mars\", \"avril\", \"mai\", \"juin\", \"juillet\", \"ao&ucirc;t\", \"septembre\", \"octobre\", \"novembre\", \"d&eacute;cembre\"],"," *          c: \"%a %d %b %Y %T %Z\","," *          p: [\"\", \"\"],"," *          P: [\"\", \"\"],"," *          x: \"%d.%m.%Y\","," *          X: \"%T\""," *      });"," *   </pre>"," *  </li>"," *  <li>For Canadian french, we start with French french and change the meaning of \\%x:"," *   <pre>"," *      Y.DataType.Date.Locale[\"fr-CA\"] = Y.merge(Y.DataType.Date.Locale[\"fr\"], {"," *          x: \"%Y-%m-%d\""," *      });"," *   </pre>"," *  </li>"," * </ol>"," *"," * With that, you can use your new locales:"," * <pre>"," *    var d = new Date(\"2008/04/22\");"," *    Y.DataType.Date.format(d, { format: \"%A, %d %B == %x\", locale: \"fr\" });"," * </pre>"," * will return:"," * <pre>"," *    mardi, 22 avril == 22.04.2008"," * </pre>"," * And"," * <pre>"," *    Y.DataType.Date.format(d, {format: \"%A, %d %B == %x\", locale: \"fr-CA\" });"," * </pre>"," * Will return:"," * <pre>"," *   mardi, 22 avril == 2008-04-22"," * </pre>"," * @requires oop"," * @class DataType.Date.Locale"," * @static"," * @deprecated - use Y.config.lang to request one of many built-in languages instead."," */","var YDateEn = {","	a: [\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\"],","	A: [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"],","	b: [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"],","	B: [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"],","	c: \"%a %d %b %Y %T %Z\",","	p: [\"AM\", \"PM\"],","	P: [\"am\", \"pm\"],","	r: \"%I:%M:%S %p\",","	x: \"%d/%m/%y\",","	X: \"%T\"","};","","Y.namespace(\"DataType.Date.Locale\");","","Y.DataType.Date.Locale[\"en\"] = YDateEn;","","Y.DataType.Date.Locale[\"en-US\"] = Y.merge(YDateEn, {","	c: \"%a %d %b %Y %I:%M:%S %p %Z\",","	x: \"%m/%d/%Y\",","	X: \"%I:%M:%S %p\"","});","","Y.DataType.Date.Locale[\"en-GB\"] = Y.merge(YDateEn, {","	r: \"%l:%M:%S %P %Z\"","});","Y.DataType.Date.Locale[\"en-AU\"] = Y.merge(YDateEn);","","","","","}, '@VERSION@' ,{lang:['ar','ar-JO','ca','ca-ES','da','da-DK','de','de-AT','de-DE','el','el-GR','en','en-AU','en-CA','en-GB','en-IE','en-IN','en-JO','en-MY','en-NZ','en-PH','en-SG','en-US','es','es-AR','es-BO','es-CL','es-CO','es-EC','es-ES','es-MX','es-PE','es-PY','es-US','es-UY','es-VE','fi','fi-FI','fr','fr-BE','fr-CA','fr-FR','hi','hi-IN','id','id-ID','it','it-IT','ja','ja-JP','ko','ko-KR','ms','ms-MY','nb','nb-NO','nl','nl-BE','nl-NL','pl','pl-PL','pt','pt-BR','ro','ro-RO','ru','ru-RU','sv','sv-SE','th','th-TH','tr','tr-TR','vi','vi-VN','zh-Hans','zh-Hans-CN','zh-Hant','zh-Hant-HK','zh-Hant-TW']});"];
_yuitest_coverage["/build/datatype-date-format/datatype-date-format.js"].lines = {"1":0,"43":0,"45":0,"47":0,"49":0,"50":0,"51":0,"53":0,"56":0,"58":0,"59":0,"60":0,"61":0,"62":0,"65":0,"67":0,"68":0,"69":0,"71":0,"72":0,"73":0,"74":0,"77":0,"80":0,"82":0,"83":0,"84":0,"85":0,"86":0,"89":0,"90":0,"92":0,"93":0,"94":0,"96":0,"98":0,"99":0,"100":0,"101":0,"104":0,"105":0,"111":0,"112":0,"114":0,"116":0,"118":0,"121":0,"125":0,"126":0,"127":0,"128":0,"130":0,"133":0,"134":0,"135":0,"136":0,"139":0,"140":0,"141":0,"143":0,"145":0,"256":0,"258":0,"259":0,"262":0,"265":0,"267":0,"268":0,"269":0,"270":0,"271":0,"274":0,"275":0,"276":0,"277":0,"278":0,"279":0,"281":0,"285":0,"287":0,"290":0,"291":0,"292":0,"294":0,"295":0,"298":0,"299":0,"300":0,"302":0,"304":0,"306":0,"307":0,"311":0,"316":0,"317":0,"321":0,"323":0,"325":0,"329":0,"400":0,"413":0,"415":0,"417":0,"423":0,"426":0};
_yuitest_coverage["/build/datatype-date-format/datatype-date-format.js"].functions = {"xPad:43":0,"a:58":0,"A:59":0,"b:60":0,"B:61":0,"C:62":0,"g:65":0,"G:66":0,"I:80":0,"j:81":0,"l:89":0,"m:90":0,"p:92":0,"P:93":0,"s:94":0,"u:96":0,"U:97":0,"V:103":0,"W:124":0,"y:130":0,"z:132":0,"Z:138":0,"\"%\":145":0,"replace_aggs:290":0,"replace_formats:298":0,"format:255":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/datatype-date-format/datatype-date-format.js"].coveredLines = 105;
_yuitest_coverage["/build/datatype-date-format/datatype-date-format.js"].coveredFunctions = 27;
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 1);
YUI.add('datatype-date-format', function(Y) {

/**
 * The DataType Utility provides type-conversion and string-formatting
 * convenience methods for various JavaScript object types.
 *
 * @module datatype
 * @main datatype
 */

/**
 * Date submodule.
 *
 * @module datatype
 * @submodule datatype-date
 */

/**
 * Format date submodule implements strftime formatters for javascript based on the
 * Open Group specification defined at
 * http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html
 * This implementation does not include modified conversion specifiers (i.e., Ex and Ox)
 *
 * @module datatype
 * @submodule datatype-date-format
 */

/**
 * DataType.Date provides a set of utility functions to operate against Date objects.
 *
 * @class DataType.Date
 * @static
 */

/**
 * Pad a number with leading spaces, zeroes or something else
 * @method xPad
 * @param x {Number}	The number to be padded
 * @param pad {String}  The character to pad the number with
 * @param r {Number}	(optional) The base of the pad, eg, 10 implies to two digits, 100 implies to 3 digits.
 * @private
 */
_yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 43);
var xPad=function (x, pad, r)
{
	_yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "xPad", 43);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 45);
if(typeof r === "undefined")
	{
		_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 47);
r=10;
	}
	_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 49);
pad = pad + ""; 
	_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 50);
for( ; parseInt(x, 10)<r && r>1; r/=10) {
		_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 51);
x = pad + x;
	}
	_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 53);
return x.toString();
};

_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 56);
var Dt = {
	formats: {
		a: function (d, l) { _yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "a", 58);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 58);
return l.a[d.getDay()]; },
		A: function (d, l) { _yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "A", 59);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 59);
return l.A[d.getDay()]; },
		b: function (d, l) { _yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "b", 60);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 60);
return l.b[d.getMonth()]; },
		B: function (d, l) { _yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "B", 61);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 61);
return l.B[d.getMonth()]; },
		C: function (d) { _yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "C", 62);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 62);
return xPad(parseInt(d.getFullYear()/100, 10), 0); },
		d: ["getDate", "0"],
		e: ["getDate", " "],
		g: function (d) { _yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "g", 65);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 65);
return xPad(parseInt(Dt.formats.G(d)%100, 10), 0); },
		G: function (d) {
				_yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "G", 66);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 67);
var y = d.getFullYear();
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 68);
var V = parseInt(Dt.formats.V(d), 10);
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 69);
var W = parseInt(Dt.formats.W(d), 10);
	
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 71);
if(W > V) {
					_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 72);
y++;
				} else {_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 73);
if(W===0 && V>=52) {
					_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 74);
y--;
				}}
	
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 77);
return y;
			},
		H: ["getHours", "0"],
		I: function (d) { _yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "I", 80);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 80);
var I=d.getHours()%12; return xPad(I===0?12:I, 0); },
		j: function (d) {
				_yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "j", 81);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 82);
var gmd_1 = new Date("" + d.getFullYear() + "/1/1 GMT");
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 83);
var gmdate = new Date("" + d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate() + " GMT");
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 84);
var ms = gmdate - gmd_1;
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 85);
var doy = parseInt(ms/60000/60/24, 10)+1;
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 86);
return xPad(doy, 0, 100);
			},
		k: ["getHours", " "],
		l: function (d) { _yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "l", 89);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 89);
var I=d.getHours()%12; return xPad(I===0?12:I, " "); },
		m: function (d) { _yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "m", 90);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 90);
return xPad(d.getMonth()+1, 0); },
		M: ["getMinutes", "0"],
		p: function (d, l) { _yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "p", 92);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 92);
return l.p[d.getHours() >= 12 ? 1 : 0 ]; },
		P: function (d, l) { _yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "P", 93);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 93);
return l.P[d.getHours() >= 12 ? 1 : 0 ]; },
		s: function (d, l) { _yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "s", 94);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 94);
return parseInt(d.getTime()/1000, 10); },
		S: ["getSeconds", "0"],
		u: function (d) { _yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "u", 96);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 96);
var dow = d.getDay(); return dow===0?7:dow; },
		U: function (d) {
				_yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "U", 97);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 98);
var doy = parseInt(Dt.formats.j(d), 10);
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 99);
var rdow = 6-d.getDay();
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 100);
var woy = parseInt((doy+rdow)/7, 10);
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 101);
return xPad(woy, 0);
			},
		V: function (d) {
				_yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "V", 103);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 104);
var woy = parseInt(Dt.formats.W(d), 10);
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 105);
var dow1_1 = (new Date("" + d.getFullYear() + "/1/1")).getDay();
				// First week is 01 and not 00 as in the case of %U and %W,
				// so we add 1 to the final result except if day 1 of the year
				// is a Monday (then %W returns 01).
				// We also need to subtract 1 if the day 1 of the year is 
				// Friday-Sunday, so the resulting equation becomes:
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 111);
var idow = woy + (dow1_1 > 4 || dow1_1 <= 1 ? 0 : 1);
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 112);
if(idow === 53 && (new Date("" + d.getFullYear() + "/12/31")).getDay() < 4)
				{
					_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 114);
idow = 1;
				}
				else {_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 116);
if(idow === 0)
				{
					_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 118);
idow = Dt.formats.V(new Date("" + (d.getFullYear()-1) + "/12/31"));
				}}
	
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 121);
return xPad(idow, 0);
			},
		w: "getDay",
		W: function (d) {
				_yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "W", 124);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 125);
var doy = parseInt(Dt.formats.j(d), 10);
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 126);
var rdow = 7-Dt.formats.u(d);
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 127);
var woy = parseInt((doy+rdow)/7, 10);
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 128);
return xPad(woy, 0, 10);
			},
		y: function (d) { _yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "y", 130);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 130);
return xPad(d.getFullYear()%100, 0); },
		Y: "getFullYear",
		z: function (d) {
				_yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "z", 132);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 133);
var o = d.getTimezoneOffset();
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 134);
var H = xPad(parseInt(Math.abs(o/60), 10), 0);
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 135);
var M = xPad(Math.abs(o%60), 0);
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 136);
return (o>0?"-":"+") + H + M;
			},
		Z: function (d) {
			_yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "Z", 138);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 139);
var tz = d.toString().replace(/^.*:\d\d( GMT[+-]\d+)? \(?([A-Za-z ]+)\)?\d*$/, "$2").replace(/[a-z ]/g, "");
			_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 140);
if(tz.length > 4) {
				_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 141);
tz = Dt.formats.z(d);
			}
			_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 143);
return tz;
		},
		"%": function (d) { _yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "\"%\"", 145);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 145);
return "%"; }
	},

	aggregates: {
		c: "locale",
		D: "%m/%d/%y",
		F: "%Y-%m-%d",
		h: "%b",
		n: "\n",
		r: "%I:%M:%S %p",
		R: "%H:%M",
		t: "\t",
		T: "%H:%M:%S",
		x: "locale",
		X: "locale"
		//"+": "%a %b %e %T %Z %Y"
	},

	 /**
	 * Takes a native JavaScript Date and formats it as a string for display to user.
	 *
	 * @for DataType.Date
	 * @method format
	 * @param oDate {Date} Date.
	 * @param oConfig {Object} (Optional) Object literal of configuration values:
	 *  <dl>
	 *   <dt>format {HTML} (Optional)</dt>
	 *   <dd>
	 *   <p>
	 *   Any strftime string is supported, such as "%I:%M:%S %p". strftime has several format specifiers defined by the Open group at 
	 *   <a href="http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html">http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html</a>
	 *   PHP added a few of its own, defined at <a href="http://www.php.net/strftime">http://www.php.net/strftime</a>
	 *   </p>
	 *   <p>
	 *   This javascript implementation supports all the PHP specifiers and a few more.  The full list is below.
	 *   </p>
	 *   <p>
	 *   If not specified, it defaults to the ISO 8601 standard date format: %Y-%m-%d.
     *   This may be overridden by the deprecated Y.config.dateFormat property.
	 *   </p>
	 *   <dl>
	 *	<dt>%a</dt> <dd>abbreviated weekday name according to the current locale</dd>
	 *	<dt>%A</dt> <dd>full weekday name according to the current locale</dd>
	 *	<dt>%b</dt> <dd>abbreviated month name according to the current locale</dd>
	 *	<dt>%B</dt> <dd>full month name according to the current locale</dd>
	 *	<dt>%c</dt> <dd>preferred date and time representation for the current locale</dd>
	 *	<dt>%C</dt> <dd>century number (the year divided by 100 and truncated to an integer, range 00 to 99)</dd>
	 *	<dt>%d</dt> <dd>day of the month as a decimal number (range 01 to 31)</dd>
	 *	<dt>%D</dt> <dd>same as %m/%d/%y</dd>
	 *	<dt>%e</dt> <dd>day of the month as a decimal number, a single digit is preceded by a space (range " 1" to "31")</dd>
	 *	<dt>%F</dt> <dd>same as %Y-%m-%d (ISO 8601 date format)</dd>
	 *	<dt>%g</dt> <dd>like %G, but without the century</dd>
	 *	<dt>%G</dt> <dd>The 4-digit year corresponding to the ISO week number</dd>
	 *	<dt>%h</dt> <dd>same as %b</dd>
	 *	<dt>%H</dt> <dd>hour as a decimal number using a 24-hour clock (range 00 to 23)</dd>
	 *	<dt>%I</dt> <dd>hour as a decimal number using a 12-hour clock (range 01 to 12)</dd>
	 *	<dt>%j</dt> <dd>day of the year as a decimal number (range 001 to 366)</dd>
	 *	<dt>%k</dt> <dd>hour as a decimal number using a 24-hour clock (range 0 to 23); single digits are preceded by a blank. (See also %H.)</dd>
	 *	<dt>%l</dt> <dd>hour as a decimal number using a 12-hour clock (range 1 to 12); single digits are preceded by a blank. (See also %I.) </dd>
	 *	<dt>%m</dt> <dd>month as a decimal number (range 01 to 12)</dd>
	 *	<dt>%M</dt> <dd>minute as a decimal number</dd>
	 *	<dt>%n</dt> <dd>newline character</dd>
	 *	<dt>%p</dt> <dd>either "AM" or "PM" according to the given time value, or the corresponding strings for the current locale</dd>
	 *	<dt>%P</dt> <dd>like %p, but lower case</dd>
	 *	<dt>%r</dt> <dd>time in a.m. and p.m. notation equal to %I:%M:%S %p</dd>
	 *	<dt>%R</dt> <dd>time in 24 hour notation equal to %H:%M</dd>
	 *	<dt>%s</dt> <dd>number of seconds since the Epoch, ie, since 1970-01-01 00:00:00 UTC</dd>
	 *	<dt>%S</dt> <dd>second as a decimal number</dd>
	 *	<dt>%t</dt> <dd>tab character</dd>
	 *	<dt>%T</dt> <dd>current time, equal to %H:%M:%S</dd>
	 *	<dt>%u</dt> <dd>weekday as a decimal number [1,7], with 1 representing Monday</dd>
	 *	<dt>%U</dt> <dd>week number of the current year as a decimal number, starting with the
	 *			first Sunday as the first day of the first week</dd>
	 *	<dt>%V</dt> <dd>The ISO 8601:1988 week number of the current year as a decimal number,
	 *			range 01 to 53, where week 1 is the first week that has at least 4 days
	 *			in the current year, and with Monday as the first day of the week.</dd>
	 *	<dt>%w</dt> <dd>day of the week as a decimal, Sunday being 0</dd>
	 *	<dt>%W</dt> <dd>week number of the current year as a decimal number, starting with the
	 *			first Monday as the first day of the first week</dd>
	 *	<dt>%x</dt> <dd>preferred date representation for the current locale without the time</dd>
	 *	<dt>%X</dt> <dd>preferred time representation for the current locale without the date</dd>
	 *	<dt>%y</dt> <dd>year as a decimal number without a century (range 00 to 99)</dd>
	 *	<dt>%Y</dt> <dd>year as a decimal number including the century</dd>
	 *	<dt>%z</dt> <dd>numerical time zone representation</dd>
	 *	<dt>%Z</dt> <dd>time zone name or abbreviation</dd>
	 *	<dt>%%</dt> <dd>a literal "%" character</dd>
	 *   </dl>
	 *  </dd>
	 *  <dt>locale {String} (Deprecated, optional)</dt>
	 *  <dd>
     *   <b>Deprecated - use Y.config.lang instead, which provides access to a much larger set of built-in languages.</b>
	 *   The locale to use when displaying days of week, months of the year, and other locale specific
	 *   strings. If not specified, this defaults to "en" (though this may be overridden by the deprecated Y.config.locale).
	 *   The following locales are built in:
	 *   <dl>
	 *    <dt>en</dt>
	 *    <dd>English</dd>
	 *    <dt>en-US</dt>
	 *    <dd>US English</dd>
	 *    <dt>en-GB</dt>
	 *    <dd>British English</dd>
	 *    <dt>en-AU</dt>
	 *    <dd>Australian English (identical to British English)</dd>
	 *   </dl>
	 *   More locales may be added by subclassing of the deprecated Y.DataType.Date.Locale["en"].
	 *   See Y.DataType.Date.Locale for more information.
	 *  </dd>
	 * </dl>
	 * @return {HTML} Formatted date for display.
	 */
	format : function (oDate, oConfig) {
		_yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "format", 255);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 256);
oConfig = oConfig || {};
		
		_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 258);
if(!Y.Lang.isDate(oDate)) {
			_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 259);
return Y.Lang.isValue(oDate) ? oDate : "";
		}

		_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 262);
var format, resources, compatMode, sLocale, LOCALE;

        // Y.config.dateFormat is deprecated - remove from YUI 3.2
        _yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 265);
format = oConfig.format || Y.config.dateFormat  || "%Y-%m-%d";
        // compatMode supports deprecated features - remove from YUI 3.2
        _yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 267);
compatMode = Y.Lang.isUndefined(Y.config.lang) && (Y.Lang.isValue(oConfig.locale) || Y.Lang.isValue(Y.config.locale));
        _yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 268);
if (compatMode) {
			_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 269);
sLocale = oConfig.locale || Y.config.locale;
			_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 270);
LOCALE = Y.DataType.Date.Locale;
            _yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 271);
sLocale = sLocale.replace(/_/g, "-");
            
            // Make sure we have a definition for the requested locale, or default to en.
            _yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 274);
if(!LOCALE[sLocale]) {
                _yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 275);
var tmpLocale = sLocale.replace(/-[a-zA-Z]+$/, "");
                _yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 276);
if(tmpLocale in LOCALE) {
                    _yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 277);
sLocale = tmpLocale;
                } else {_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 278);
if(Y.config.locale in LOCALE) {
                    _yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 279);
sLocale = Y.config.locale;
                } else {
                    _yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 281);
sLocale = "en";
                }}
            }
    
            _yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 285);
resources = LOCALE[sLocale];
        } else {
            _yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 287);
resources = Y.Intl.get('datatype-date-format');
        }

		_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 290);
var replace_aggs = function (m0, m1) {
			_yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "replace_aggs", 290);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 291);
if (compatMode && m1 === "r") {
			    _yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 292);
return resources[m1];
			}
			_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 294);
var f = Dt.aggregates[m1];
			_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 295);
return (f === "locale" ? resources[m1] : f);
		};

		_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 298);
var replace_formats = function (m0, m1) {
			_yuitest_coverfunc("/build/datatype-date-format/datatype-date-format.js", "replace_formats", 298);
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 299);
var f = Dt.formats[m1];
			_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 300);
switch(Y.Lang.type(f)) {
				case "string":					// string => built in date function
					_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 302);
return oDate[f]();
				case "function":				// function => our own function
					_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 304);
return f.call(oDate, oDate, resources);
				case "array":					// built in function with padding
					_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 306);
if(Y.Lang.type(f[0]) === "string") {
						_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 307);
return xPad(oDate[f[0]](), f[1]);
					} // no break; (fall through to default:)
				default:
                    // Y.config.dateFormat is deprecated - remove from YUI 3.2
					_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 311);
return m1;
			}
		};

		// First replace aggregates (run in a loop because an agg may be made up of other aggs)
		_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 316);
while(format.match(/%[cDFhnrRtTxX]/)) {
			_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 317);
format = format.replace(/%([cDFhnrRtTxX])/g, replace_aggs);
		}

		// Now replace formats (do not run in a loop otherwise %%a will be replace with the value of %a)
		_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 321);
var str = format.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g, replace_formats);

		_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 323);
replace_aggs = replace_formats = undefined;

		_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 325);
return str;
	}
};

_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 329);
Y.mix(Y.namespace("DataType.Date"), Dt);
/**
 * @module datatype
*/

/**
 * The Date.Locale class is a container for all localised date strings
 * used by Y.DataType.Date. It is used internally, but may be extended
 * to provide new date localisations.
 *
 * To create your own Locale, follow these steps:
 * <ol>
 *  <li>Find an existing locale that matches closely with your needs</li>
 *  <li>Use this as your base class.  Use Y.DataType.Date.Locale["en"] if nothing
 *   matches.</li>
 *  <li>Create your own class as an extension of the base class using
 *   Y.merge, and add your own localisations where needed.</li>
 * </ol>
 * See the Y.DataType.Date.Locale["en-US"] and Y.DataType.Date.Locale["en-GB"]
 * classes which extend Y.DataType.Date.Locale["en"].
 *
 * For example, to implement locales for French french and Canadian french,
 * we would do the following:
 * <ol>
 *  <li>For French french, we have no existing similar locale, so use
 *   Y.DataType.Date.Locale["en"] as the base, and extend it:
 *   <pre>
 *      Y.DataType.Date.Locale["fr"] = Y.merge(Y.DataType.Date.Locale["en"], {
 *          a: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
 *          A: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
 *          b: ["jan", "f&eacute;v", "mar", "avr", "mai", "jun", "jui", "ao&ucirc;", "sep", "oct", "nov", "d&eacute;c"],
 *          B: ["janvier", "f&eacute;vrier", "mars", "avril", "mai", "juin", "juillet", "ao&ucirc;t", "septembre", "octobre", "novembre", "d&eacute;cembre"],
 *          c: "%a %d %b %Y %T %Z",
 *          p: ["", ""],
 *          P: ["", ""],
 *          x: "%d.%m.%Y",
 *          X: "%T"
 *      });
 *   </pre>
 *  </li>
 *  <li>For Canadian french, we start with French french and change the meaning of \%x:
 *   <pre>
 *      Y.DataType.Date.Locale["fr-CA"] = Y.merge(Y.DataType.Date.Locale["fr"], {
 *          x: "%Y-%m-%d"
 *      });
 *   </pre>
 *  </li>
 * </ol>
 *
 * With that, you can use your new locales:
 * <pre>
 *    var d = new Date("2008/04/22");
 *    Y.DataType.Date.format(d, { format: "%A, %d %B == %x", locale: "fr" });
 * </pre>
 * will return:
 * <pre>
 *    mardi, 22 avril == 22.04.2008
 * </pre>
 * And
 * <pre>
 *    Y.DataType.Date.format(d, {format: "%A, %d %B == %x", locale: "fr-CA" });
 * </pre>
 * Will return:
 * <pre>
 *   mardi, 22 avril == 2008-04-22
 * </pre>
 * @requires oop
 * @class DataType.Date.Locale
 * @static
 * @deprecated - use Y.config.lang to request one of many built-in languages instead.
 */
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 400);
var YDateEn = {
	a: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	A: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	b: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	B: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	c: "%a %d %b %Y %T %Z",
	p: ["AM", "PM"],
	P: ["am", "pm"],
	r: "%I:%M:%S %p",
	x: "%d/%m/%y",
	X: "%T"
};

_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 413);
Y.namespace("DataType.Date.Locale");

_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 415);
Y.DataType.Date.Locale["en"] = YDateEn;

_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 417);
Y.DataType.Date.Locale["en-US"] = Y.merge(YDateEn, {
	c: "%a %d %b %Y %I:%M:%S %p %Z",
	x: "%m/%d/%Y",
	X: "%I:%M:%S %p"
});

_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 423);
Y.DataType.Date.Locale["en-GB"] = Y.merge(YDateEn, {
	r: "%l:%M:%S %P %Z"
});
_yuitest_coverline("/build/datatype-date-format/datatype-date-format.js", 426);
Y.DataType.Date.Locale["en-AU"] = Y.merge(YDateEn);




}, '@VERSION@' ,{lang:['ar','ar-JO','ca','ca-ES','da','da-DK','de','de-AT','de-DE','el','el-GR','en','en-AU','en-CA','en-GB','en-IE','en-IN','en-JO','en-MY','en-NZ','en-PH','en-SG','en-US','es','es-AR','es-BO','es-CL','es-CO','es-EC','es-ES','es-MX','es-PE','es-PY','es-US','es-UY','es-VE','fi','fi-FI','fr','fr-BE','fr-CA','fr-FR','hi','hi-IN','id','id-ID','it','it-IT','ja','ja-JP','ko','ko-KR','ms','ms-MY','nb','nb-NO','nl','nl-BE','nl-NL','pl','pl-PL','pt','pt-BR','ro','ro-RO','ru','ru-RU','sv','sv-SE','th','th-TH','tr','tr-TR','vi','vi-VN','zh-Hans','zh-Hans-CN','zh-Hant','zh-Hant-HK','zh-Hant-TW']});

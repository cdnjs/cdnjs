/*
	conditionizr v2.2.0
	conditionizr.com
	by Todd Motto & Mark Goodyear
	@toddmotto    & @markgdyr
	Latest version: https://github.com/conditionizr/conditionizr

	Conditionizr, the conditional free legacy, retina, touch, script and style loader.
*/
; var conditionizr = function (options) {

	var doc = document;
	var docEl = doc.documentElement;
	
	docEl.id = 'conditionizr';
	
	var settings = {
		debug     : false,
		scriptSrc : 'js/conditionizr/',
		styleSrc  : 'css/conditionizr/',
		ieLessThan: { active: false, version: '9', scripts: false, styles: false, classes: true, customScript: false },
		chrome    : { scripts: false, styles: false, classes: true, customScript: false },
		safari    : { scripts: false, styles: false, classes: true, customScript: false },
		opera     : { scripts: false, styles: false, classes: true, customScript: false },
		firefox   : { scripts: false, styles: false, classes: true, customScript: false },
		ie10      : { scripts: false, styles: false, classes: true, customScript: false },
		ie9       : { scripts: false, styles: false, classes: true, customScript: false },
		ie8       : { scripts: false, styles: false, classes: true, customScript: false },
		ie7       : { scripts: false, styles: false, classes: true, customScript: false },
		ie6       : { scripts: false, styles: false, classes: true, customScript: false },
		retina    : { scripts: false, styles: false, classes: true, customScript: false },
		touch     : { scripts: false, styles: false, classes: true, customScript: false },
		mac       : true,
		win       : true,
		x11       : true,
		linux     : true
	};

	function conditionizrMerge(obj1, obj2) {
		for (var p in obj2) {
			try {
				if (obj2[p].constructor == Object) {
					obj1[p] = conditionizrMerge(obj1[p], obj2[p]);
				} else {
					obj1[p] = obj2[p];
				}
			} catch (e) {
				obj1[p] = obj2[p];
			}
		}
		return obj1;
	}

	if (options) {
		conditionizrMerge(settings, options);
	}

	function conditionizrLoader() {

		for (var resourceType in browserSettings) {
			var val = browserSettings[resourceType];
			var head = doc.getElementsByTagName('head')[0];

			if (resourceType === 'classes' && val) {
				docEl.className += ' ' + theBrowser;
			}

			if (resourceType === 'scripts' && val) {
				var scriptTag = doc.createElement('script');
				scriptTag.src = settings.scriptSrc + theBrowser + '.js';
				head.appendChild(scriptTag);
			}

			if (resourceType === 'styles' && val) {
				var linkTag = doc.createElement('link');
				linkTag.rel = 'stylesheet';
				linkTag.href = settings.styleSrc + theBrowser + '.css';
				head.appendChild(linkTag);
			}

			if (resourceType === 'customScript' && val ) {
				var strip = browserSettings.customScript.replace(/\s/g, '');
				var customSplit = strip.split(',');
				for(var i = 0; i < customSplit.length; i++) {
					var customScriptTag = doc.createElement('script');
					customScriptTag.src = customSplit[i];
					head.appendChild(customScriptTag);
				}
			}
		}
	}

	var actualBrowser = '';

	var browsers = [
		{ 'testWith': 'chrome', 'testSettings': settings.chrome },
		{ 'testWith': 'safari', 'testSettings': settings.safari },
		{ 'testWith': 'firefox', 'testSettings': settings.firefox },
		{ 'testWith': 'opera', 'testSettings': settings.opera }
	];

	for (var i = 0; i < browsers.length; i++) {
		var currentBrowser = browsers[i];

		if (navigator.userAgent.toLowerCase().indexOf(currentBrowser.testWith) > -1) {
			var browserSettings = currentBrowser.testSettings;
			var theBrowser = currentBrowser.testWith;
			conditionizrLoader();
			actualBrowser	= theBrowser;
			break;
		}
	}

	function getIEVersion() {
		var rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');

			if (re.exec(ua) != null) {
				rv = parseFloat(RegExp.$1);
			}
		}
		return rv;
	}

	var version = getIEVersion();

	if (version > -1) {

		if (version < settings.ieLessThan.version + '.0') {
			var theBrowser = 'lt-ie' + settings.ieLessThan.version;
			var browserSettings = settings.ieLessThan;
			conditionizrLoader();
		}

		if (version === 10.0) {
			var browserSettings = settings.ie10;
		}
		else if (version === 9.0) {
			var browserSettings = settings.ie9;
		}
		else if (version === 8.0) {
			var browserSettings = settings.ie8;
		}
		else if (version === 7.0) {
			var browserSettings = settings.ie7;
		}
		else if (version === 6.0) {
			var browserSettings = settings.ie6;
		}

		var theBrowser = 'ie' + version;

		conditionizrLoader();

		actualBrowser	= theBrowser;

	}

	var browserExtras = '';

	if (window.devicePixelRatio >= 2) {

		var browserSettings = settings.retina;
		var theBrowser = 'retina';

		conditionizrLoader();

		browserExtras	+= ' ' + theBrowser;
		theBrowser 		= actualBrowser;

	} else {
		docEl.className += ' no-retina';
	}

	if('ontouchstart' in window) {

		var browserSettings = settings.touch,
			theBrowser = 'touch';

		conditionizrLoader();

		browserExtras	+= ' ' + theBrowser;
		theBrowser 		= actualBrowser;

	} else {
		docEl.className += ' no-touch';
	}

	var oSys = [
		{ 'testWith': 'Win', 'testSettings': settings.win },
		{ 'testWith': 'Mac', 'testSettings': settings.mac },
		{ 'testWith': 'X11', 'testSettings': settings.x11 },
		{ 'testWith': 'Linux', 'testSettings': settings.linux }
	];

	for (var i = 0; i < oSys.length; i++) {

		var currentPlatform = oSys[i];

		if (navigator.appVersion.indexOf(currentPlatform.testWith) > -1) {
			var osSettings = currentPlatform.testSettings;
			var theOS = currentPlatform.testWith;

			if (osSettings) {
				docEl.className += ' ' + currentPlatform.testWith.toLowerCase();
			}
			break;
		}
	}

	if (settings.debug) {
		console.log('Start Conditionizr Debug\n');
		console.log('Script location: ' + settings.scriptSrc);
		console.log('Style location: ' + settings.styleSrc);
		console.log('Browser: ' + theBrowser);
		if(browserExtras) {
			console.log('Browser Extras: ' + browserExtras);
		}
		console.log('OS: ' + theOS);
		console.log('End Conditionizr Debug\n');
	}
};
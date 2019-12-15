/**
 * ngBrowserInfo v0.1.3
 *
 * Copyright 2015 Transferwise Ltd
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function() {
	'use strict';

	angular.module('ngBrowserInfo', []);

	angular.module('ngBrowserInfo').service('browserInfo', [
		'$window', '$document',
		function ($window, $document) {

			$window.navigator = $window.navigator || {userAgent: '', appVersion: ''};

			this.giveMeAllYouGot = function () {
				return {
					screenSize: this.getScreenSize(),
					windowSize: this.getWindowSize(),
					mobile: this.isMobile(),
					cookiesEnabled: this.areCookiesEnabled(),
					language: this.getLanguage(),
					os: this.getOSInfo(),
					browser: this.getBrowserInfo()
				};
			};

			this.getScreenSize = function () {
				return {
					width: screen.width,
					height: screen.height
				};
			};

			this.getWindowSize = function () {
				return {
					width: $window.innerWidth,
					height: $window.innerHeight
				};
			};

			this.isMobile = function () {
				return /Mobile|Android|iP(ad|od|hone)|Fennec|mini/.test($window.navigator.userAgent);
			};

			this.areCookiesEnabled = function () {
				var cookieEnabled = $window.navigator.cookieEnabled;

				if (typeof cookieEnabled === 'undefined') {
					$document.cookie = 'test-cookie';
					return $document.cookie.indexOf('test-cookie') !== -1;
				}
				return cookieEnabled;
			};

			this.getLanguage = function () {
				return $window.navigator.language || $window.navigator.userLanguage;
			};

			this.getOSInfo = function () {
				var osName = getOSName();

				if (/Windows/.test(osName)) {
					return {
						name: 'Windows',
						version: /Windows (.*)/.exec(osName)[1]
					};
				}
				return {
					name: osName,
					version: getOSVersion(osName)
				};
			};

			this.getBrowserInfo = function () {
				var userAgent = $window.navigator.userAgent;
				var browser;

				if (/Opera/.test(userAgent)) {
					browser = getOperaInfo();
				} else if (/MSIE/.test(userAgent)) {
					browser = getIEInfo();
				} else if (/Chrome/.test(userAgent)) {
					browser = getChromeInfo();
				} else if (/Safari/.test(userAgent)) {
					browser = getSafariInfo();
				} else if (/Firefox/.test(userAgent)) {
					browser = getFirefoxInfo();
				} else if (/Trident\//.test(userAgent)) {
					browser = getNewerIEInfo();
				} else {
					browser = getUnknownBrowserInfo();
				}
				browser.version = trimVersion(browser.version);

				return browser;
			};

			var getOSName = function () {
				for (var key in osList) {
					if (osList.hasOwnProperty(key)) {
						var os = osList[key];

						if (os.regex.test($window.navigator.userAgent)) {
							return os.name;
						}
					}
				}
			};

			var getOSVersion = function (osName) {
				switch (osName) {
					case 'Mac OS X':
						return getMacOSVersion();
					case 'Android':
						return getAndroidOSVersion();
					case 'iOS':
						return getIOSVersion();
					case 'Ubuntu':
						return getUbuntuOSVersion();
				}
			};

			var getMacOSVersion = function () {
				var version = /Mac OS X (10[\._\d]+)/.exec($window.navigator.userAgent);

				if (version) {
					return version[1].replace(/_/g, '.');
				}
			};

			var getAndroidOSVersion = function () {
				var version = /Android ([\._\d]+)/.exec($window.navigator.userAgent);

				if (version) {
					return version[1];
				}
			};

			var getIOSVersion = function () {
				var version = /OS (\d+)_(\d+)_?(\d+)?/.exec($window.navigator.appVersion);

				if (version) {
					return version[1] + '.' + version[2];
				}
			};

			var getUbuntuOSVersion = function () {
				var version = /Ubuntu\/([\._\d]+)/.exec($window.navigator.userAgent);

				if (version) {
					return version[1];
				}
			};

			var osList = [
				{name: 'Windows 95', regex: /(Windows 95|Win95|Windows_95)/},
				{name: 'Windows ME', regex: /(Win 9x 4.90|Windows ME)/},
				{name: 'Windows 98', regex: /(Windows 98|Win98)/},
				{name: 'Windows 2000', regex: /(Windows NT 5.0|Windows 2000)/},
				{name: 'Windows XP', regex: /(Windows NT 5.1|Windows XP)/},
				{name: 'Windows Server 2003', regex: /Windows NT 5.2/},
				{name: 'Windows Vista', regex: /Windows NT 6.0/},
				{name: 'Windows 7', regex: /(Windows 7|Windows NT 6.1)/},
				{name: 'Windows 8.1', regex: /(Windows 8.1|Windows NT 6.3)/},
				{name: 'Windows 8', regex: /(Windows 8|Windows NT 6.2)/},
				{name: 'Windows NT 4.0', regex: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
				{name: 'Windows ME', regex: /Windows ME/},
				{name: 'Android', regex: /Android/},
				{name: 'Open BSD', regex: /OpenBSD/},
				{name: 'Free BSD', regex: /FreeBSD/},
				{name: 'Sun OS', regex: /SunOS/},
				{name: 'Ubuntu', regex: /Ubuntu/},
				{name: 'Linux', regex: /(Linux|X11)/},
				{name: 'iOS', regex: /(iPhone|iPad|iPod)/},
				{name: 'Mac OS X', regex: /Mac OS X/},
				{name: 'Mac OS', regex: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
				{name: 'QNX', regex: /QNX/},
				{name: 'UNIX', regex: /UNIX/},
				{name: 'BeOS', regex: /BeOS/},
				{name: 'OS/2', regex: /OS\/2/},
				{name: 'Search Bot', regex: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
			];

			var getOperaInfo = function () {
				return {
					name: 'Opera',
					version: $window.navigator.userAgent.indexOf('Version') !== -1 ? getBrowserVersion('Version', 8)
						: getBrowserVersion('Opera', 6)
				};
			};

			var getIEInfo = function () {
				return {
					name: 'Microsoft Internet Explorer',
					version: getBrowserVersion('MSIE', 5)
				};
			};

			var getChromeInfo = function () {
				return {
					name: 'Chrome',
					version: getBrowserVersion('Chrome', 7)
				};
			};

			var getSafariInfo = function () {
				return {
					name: 'Safari',
					version: $window.navigator.userAgent.indexOf('Version') !== -1 ? getBrowserVersion('Version', 8)
						: getBrowserVersion('Safari', 7)
				};
			};

			var getFirefoxInfo = function () {
				return {
					name: 'Firefox',
					version: getBrowserVersion('Firefox', 8)
				};
			};

			var getNewerIEInfo = function () {
				return {
					name: 'Microsoft Internet Explorer',
					version: $window.navigator.userAgent.substring($window.navigator.userAgent.indexOf('rv:') + 3)
				};
			};

			// TODO maybe there's a way
			var getUnknownBrowserInfo = function () {
				return {
					name: undefined,
					version: undefined
				};
			};

			var getBrowserVersion = function (browser, offset) {
				return $window.navigator.userAgent.substring($window.navigator.userAgent.indexOf(browser) + offset);
			};

			var trimVersion = function (version) {
				var index;

				if ((index = version.indexOf(')')) !== -1) {
					version = version.substring(0, index);
				}
				if ((index = version.indexOf(';')) !== -1) {
					version = version.substring(0, index);
				}
				if ((index = version.indexOf(' ')) !== -1) {
					version = version.substring(0, index);
				}
				return version;
			};
		}
	]);
})();
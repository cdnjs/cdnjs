/*
 * ngDialog - easy modals and popup windows
 * http://github.com/likeastore/ngDialog
 * (c) 2013-2015 MIT License, https://likeastore.com
 */

(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('angular'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(['angular'], factory);
    } else {
        // Global Variables
        factory(root.angular);
    }
}(this, function (angular, undefined) {
	'use strict';

	var m = angular.module('ngDialog', []);

	var $el = angular.element;
	var isDef = angular.isDefined;
	var style = (document.body || document.documentElement).style;
	var animationEndSupport = isDef(style.animation) || isDef(style.WebkitAnimation) || isDef(style.MozAnimation) || isDef(style.MsAnimation) || isDef(style.OAnimation);
	var animationEndEvent = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend';
	var forceBodyReload = false;
	var scope;

	m.provider('ngDialog', function () {
		var defaults = this.defaults = {
			className: 'ngdialog-theme-default',
			plain: false,
			showClose: true,
			closeByDocument: true,
			closeByEscape: true,
			closeByNavigation: false,
			appendTo: false,
			preCloseCallback: false,
			overlay: true,
			cache: true
		};

		this.setForceBodyReload = function (_useIt) {
			forceBodyReload = _useIt || false;
		};

		this.setDefaults = function (newDefaults) {
			angular.extend(defaults, newDefaults);
		};

		var globalID = 0, dialogsCount = 0, closeByDocumentHandler, defers = {};

		this.$get = ['$document', '$templateCache', '$compile', '$q', '$http', '$rootScope', '$timeout', '$window', '$controller',
			function ($document, $templateCache, $compile, $q, $http, $rootScope, $timeout, $window, $controller) {
				var $body = $document.find('body');
				if (forceBodyReload) {
					$rootScope.$on('$locationChangeSuccess', function () {
						$body = $document.find('body');
					});
				}

				var privateMethods = {
					onDocumentKeydown: function (event) {
						if (event.keyCode === 27) {
							publicMethods.close('$escape');
						}
					},

					setBodyPadding: function (width) {
						var originalBodyPadding = parseInt(($body.css('padding-right') || 0), 10);
						$body.css('padding-right', (originalBodyPadding + width) + 'px');
						$body.data('ng-dialog-original-padding', originalBodyPadding);
					},

					resetBodyPadding: function () {
						var originalBodyPadding = $body.data('ng-dialog-original-padding');
						if (originalBodyPadding) {
							$body.css('padding-right', originalBodyPadding + 'px');
						} else {
							$body.css('padding-right', '');
						}
					},

					performCloseDialog: function ($dialog, value) {
						var id = $dialog.attr('id');

						if (typeof $window.Hammer !== 'undefined') {
							var hammerTime = scope.hammerTime;
							hammerTime.off('tap', closeByDocumentHandler);
							hammerTime.destroy && hammerTime.destroy();
							delete scope.hammerTime;
						} else {
							$dialog.unbind('click');
						}

						if (dialogsCount === 1) {
							$body.unbind('keydown');
						}

						if (!$dialog.hasClass("ngdialog-closing")){
							dialogsCount -= 1;
						}

						$rootScope.$broadcast('ngDialog.closing', $dialog);
						dialogsCount = dialogsCount < 0 ? 0: dialogsCount;
						if (animationEndSupport) {
							scope.$destroy();
							$dialog.unbind(animationEndEvent).bind(animationEndEvent, function () {
								$dialog.remove();
								if (dialogsCount === 0) {
									$body.removeClass('ngdialog-open');
									privateMethods.resetBodyPadding();
								}
								$rootScope.$broadcast('ngDialog.closed', $dialog);
							}).addClass('ngdialog-closing');
						} else {
							scope.$destroy();
							$dialog.remove();
							if (dialogsCount === 0) {
								$body.removeClass('ngdialog-open');
								privateMethods.resetBodyPadding();
							}
							$rootScope.$broadcast('ngDialog.closed', $dialog);
						}
						if (defers[id]) {
							defers[id].resolve({
								id: id,
								value: value,
								$dialog: $dialog,
								remainingDialogs: dialogsCount
							});
							delete defers[id];
						}
					},

					closeDialog: function ($dialog, value) {
						var preCloseCallback = $dialog.data('$ngDialogPreCloseCallback');

						if (preCloseCallback && angular.isFunction(preCloseCallback)) {

							var preCloseCallbackResult = preCloseCallback.call($dialog, value);

							if (angular.isObject(preCloseCallbackResult)) {
								if (preCloseCallbackResult.closePromise) {
									preCloseCallbackResult.closePromise.then(function () {
										privateMethods.performCloseDialog($dialog, value);
									});
								} else {
									preCloseCallbackResult.then(function () {
										privateMethods.performCloseDialog($dialog, value);
									}, function () {
										return;
									});
								}
							} else if (preCloseCallbackResult !== false) {
								privateMethods.performCloseDialog($dialog, value);
							}
						} else {
							privateMethods.performCloseDialog($dialog, value);
						}
					}
				};

				var publicMethods = {

					/*
					 * @param {Object} options:
					 * - template {String} - id of ng-template, url for partial, plain string (if enabled)
					 * - plain {Boolean} - enable plain string templates, default false
					 * - scope {Object}
					 * - controller {String}
					 * - className {String} - dialog theme class
					 * - showClose {Boolean} - show close button, default true
					 * - closeByEscape {Boolean} - default true
					 * - closeByDocument {Boolean} - default true
					 * - preCloseCallback {String|Function} - user supplied function name/function called before closing dialog (if set)
					 *
					 * @return {Object} dialog
					 */
					open: function (opts) {
						var self = this;
						var options = angular.copy(defaults);

						opts = opts || {};
						angular.extend(options, opts);

						globalID += 1;

						self.latestID = 'ngdialog' + globalID;

						var defer;
						defers[self.latestID] = defer = $q.defer();

						scope = angular.isObject(options.scope) ? options.scope.$new() : $rootScope.$new();
						var $dialog, $dialogParent;

						$q.when(loadTemplate(options.template || options.templateUrl)).then(function (template) {

							$templateCache.put(options.template || options.templateUrl, template);

							if (options.showClose) {
								template += '<div class="ngdialog-close"></div>';
							}

							self.$result = $dialog = $el('<div id="ngdialog' + globalID + '" class="ngdialog"></div>');
							$dialog.html((options.overlay ?
								'<div class="ngdialog-overlay"></div><div class="ngdialog-content">' + template + '</div>' :
								'<div class="ngdialog-content">' + template + '</div>'));

							if (options.data && angular.isString(options.data)) {
								var firstLetter = options.data.replace(/^\s*/, '')[0];
								scope.ngDialogData = (firstLetter === '{' || firstLetter === '[') ? angular.fromJson(options.data) : options.data;
							} else if (options.data && angular.isObject(options.data)) {
								scope.ngDialogData = options.data;
							}

							if (options.controller && (angular.isString(options.controller) || angular.isArray(options.controller) || angular.isFunction(options.controller))) {
								var controllerInstance = $controller(options.controller, {
									$scope: scope,
									$element: $dialog
								});
								$dialog.data('$ngDialogControllerController', controllerInstance);
							}

							if (options.className) {
								$dialog.addClass(options.className);
							}

							if (options.appendTo && angular.isString(options.appendTo)) {
								$dialogParent = angular.element(document.querySelector(options.appendTo));
							} else {
								$dialogParent = $body;
							}

							if (options.preCloseCallback) {
								var preCloseCallback;

								if (angular.isFunction(options.preCloseCallback)) {
									preCloseCallback = options.preCloseCallback;
								} else if (angular.isString(options.preCloseCallback)) {
									if (scope) {
										if (angular.isFunction(scope[options.preCloseCallback])) {
											preCloseCallback = scope[options.preCloseCallback];
										} else if (scope.$parent && angular.isFunction(scope.$parent[options.preCloseCallback])) {
											preCloseCallback = scope.$parent[options.preCloseCallback];
										} else if ($rootScope && angular.isFunction($rootScope[options.preCloseCallback])) {
											preCloseCallback = $rootScope[options.preCloseCallback];
										}
									}
								}

								if (preCloseCallback) {
									$dialog.data('$ngDialogPreCloseCallback', preCloseCallback);
								}
							}

							scope.closeThisDialog = function (value) {
								privateMethods.closeDialog($dialog, value);
							};

							$timeout(function () {
								$compile($dialog)(scope);
								var widthDiffs = $window.innerWidth - $body.prop('clientWidth');
								$body.addClass('ngdialog-open');
								var scrollBarWidth = widthDiffs - ($window.innerWidth - $body.prop('clientWidth'));
								if (scrollBarWidth > 0) {
									privateMethods.setBodyPadding(scrollBarWidth);
								}
								$dialogParent.append($dialog);

								if (options.name) {
									$rootScope.$broadcast('ngDialog.opened', {dialog: $dialog, name: options.name});
								} else {
									$rootScope.$broadcast('ngDialog.opened', $dialog);
								}
							});

							if (options.closeByEscape) {
								$body.bind('keydown', privateMethods.onDocumentKeydown);
							}

							if (options.closeByNavigation) {
								$rootScope.$on('$locationChangeSuccess', function () {
									privateMethods.closeDialog($dialog);
								});
							}

							closeByDocumentHandler = function (event) {
								var isOverlay = options.closeByDocument ? $el(event.target).hasClass('ngdialog-overlay') : false;
								var isCloseBtn = $el(event.target).hasClass('ngdialog-close');

								if (isOverlay || isCloseBtn) {
									publicMethods.close($dialog.attr('id'), isCloseBtn ? '$closeButton' : '$document');
								}
							};

							if (typeof $window.Hammer !== 'undefined') {
								var hammerTime = scope.hammerTime = $window.Hammer($dialog[0]);
								hammerTime.on('tap', closeByDocumentHandler);
							} else {
								$dialog.bind('click', closeByDocumentHandler);
							}

							dialogsCount += 1;

							return publicMethods;
						});

						return {
							id: 'ngdialog' + globalID,
							closePromise: defer.promise,
							close: function (value) {
								privateMethods.closeDialog($dialog, value);
							}
						};

						function loadTemplateUrl (tmpl, config) {
							return $http.get(tmpl, (config || {})).then(function(res) {
								return res.data || '';
							});
						}

						function loadTemplate (tmpl) {
							if (!tmpl) {
								return 'Empty template';
							}

							if (angular.isString(tmpl) && options.plain) {
								return tmpl;
							}

							if (typeof options.cache === 'boolean' && !options.cache) {
								return loadTemplateUrl(tmpl, {cache: false});
							}

							return $templateCache.get(tmpl) || loadTemplateUrl(tmpl, {cache: true});
						}
					},

					/*
					 * @param {Object} options:
					 * - template {String} - id of ng-template, url for partial, plain string (if enabled)
					 * - plain {Boolean} - enable plain string templates, default false
					 * - name {String}
					 * - scope {Object}
					 * - controller {String}
					 * - className {String} - dialog theme class
					 * - showClose {Boolean} - show close button, default true
					 * - closeByEscape {Boolean} - default false
					 * - closeByDocument {Boolean} - default false
					 * - preCloseCallback {String|Function} - user supplied function name/function called before closing dialog (if set); not called on confirm
					 *
					 * @return {Object} dialog
					 */
					openConfirm: function (opts) {
						var defer = $q.defer();

						var options = {
							closeByEscape: false,
							closeByDocument: false
						};
						angular.extend(options, opts);

						options.scope = angular.isObject(options.scope) ? options.scope.$new() : $rootScope.$new();
						options.scope.confirm = function (value) {
							defer.resolve(value);
							var $dialog = $el(document.getElementById(openResult.id));
							privateMethods.performCloseDialog($dialog, value);
						};

						var openResult = publicMethods.open(options);
						openResult.closePromise.then(function (data) {
							if (data) {
								return defer.reject(data.value);
							}
							return defer.reject();
						});

						return defer.promise;
					},

					/*
					 * @param {String} id
					 * @return {Object} dialog
					 */
					close: function (id, value) {
						var $dialog = $el(document.getElementById(id));

						if ($dialog.length) {
							privateMethods.closeDialog($dialog, value);
						} else {
							publicMethods.closeAll(value);
						}

						return publicMethods;
					},

					closeAll: function (value) {
						var $all = document.querySelectorAll('.ngdialog');

						angular.forEach($all, function (dialog) {
							privateMethods.closeDialog($el(dialog), value);
						});
					},

					getDefaults: function () {
						return defaults;
					}
				};

				return publicMethods;
			}];
	});

	m.directive('ngDialog', ['ngDialog', function (ngDialog) {
		return {
			restrict: 'A',
			scope : {
				ngDialogScope : '='
			},
			link: function (scope, elem, attrs) {
				elem.on('click', function (e) {
					e.preventDefault();

					var ngDialogScope = angular.isDefined(scope.ngDialogScope) ? scope.ngDialogScope : 'noScope';
					angular.isDefined(attrs.ngDialogClosePrevious) && ngDialog.close(attrs.ngDialogClosePrevious);

					var defaults = ngDialog.getDefaults();

					ngDialog.open({
						template: attrs.ngDialog,
						className: attrs.ngDialogClass || defaults.className,
						controller: attrs.ngDialogController,
						scope: ngDialogScope,
						data: attrs.ngDialogData,
						showClose: attrs.ngDialogShowClose === 'false' ? false : (attrs.ngDialogShowClose === 'true' ? true : defaults.showClose),
						closeByDocument: attrs.ngDialogCloseByDocument === 'false' ? false : (attrs.ngDialogCloseByDocument === 'true' ? true : defaults.closeByDocument),
						closeByEscape: attrs.ngDialogCloseByEscape === 'false' ? false : (attrs.ngDialogCloseByEscape === 'true' ? true : defaults.closeByEscape),
						preCloseCallback: attrs.ngDialogPreCloseCallback || defaults.preCloseCallback
					});
				});
			}
		};
	}]);

	return m;
}));

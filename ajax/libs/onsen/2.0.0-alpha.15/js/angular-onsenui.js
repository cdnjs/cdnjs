/*! angular-onsenui.js for onsenui - v2.0.0-alpha.15 - 2015-11-10 */
(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/sliding_menu.tpl',
    '<div class="onsen-sliding-menu__menu ons-sliding-menu-inner"></div>\n' +
    '<div class="onsen-sliding-menu__main ons-sliding-menu-inner"></div>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/split_view.tpl',
    '<div class="onsen-split-view__secondary full-screen ons-split-view-inner"></div>\n' +
    '<div class="onsen-split-view__main full-screen ons-split-view-inner"></div>\n' +
    '');
}]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/**
 * @ngdoc object
 * @name ons
 * @category util
 * @description
 *   [ja]Onsen UIで利用できるグローバルなオブジェクトです。このオブジェクトは、AngularJSのスコープから参照することができます。 [/ja]
 *   [en]A global object that's used in Onsen UI. This object can be reached from the AngularJS scope.[/en]
 */

/**
 * @ngdoc method
 * @signature ready(callback)
 * @description
 *   [ja]アプリの初期化に利用するメソッドです。渡された関数は、Onsen UIの初期化が終了している時点で必ず呼ばれます。[/ja]
 *   [en]Method used to wait for app initialization. The callback will not be executed until Onsen UI has been completely initialized.[/en]
 * @param {Function} callback
 *   [en]Function that executes after Onsen UI has been initialized.[/en]
 *   [ja]Onsen UIが初期化が完了した後に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature bootstrap([moduleName, [dependencies]])
 * @extensionOf angular
 * @description
 *   [ja]Onsen UIの初期化を行います。Angular.jsのng-app属性を利用すること無しにOnsen UIを読み込んで初期化してくれます。[/ja]
 *   [en]Initialize Onsen UI. Can be used to load Onsen UI without using the <code>ng-app</code> attribute from AngularJS.[/en]
 * @param {String} [moduleName]
 *   [en]AngularJS module name.[/en]
 *   [ja]Angular.jsでのモジュール名[/ja]
 * @param {Array} [dependencies]
 *   [en]List of AngularJS module dependencies.[/en]
 *   [ja]依存するAngular.jsのモジュール名の配列[/ja]
 * @return {Object}
 *   [en]An AngularJS module object.[/en]
 *   [ja]AngularJSのModuleオブジェクトを表します。[/ja]
 */

/**
 * @ngdoc method
 * @signature enableAutoStatusBarFill()
 * @description
 *   [en]Enable status bar fill feature on iOS7 and above.[/en]
 *   [ja]iOS7以上で、ステータスバー部分の高さを自動的に埋める処理を有効にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature disableAutoStatusBarFill()
 * @description
 *   [en]Disable status bar fill feature on iOS7 and above.[/en]
 *   [ja]iOS7以上で、ステータスバー部分の高さを自動的に埋める処理を無効にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature disableAnimations()
 * @description
 *   [en]Disable all animations. Could be handy for testing and older devices.[/en]
 *   [ja]アニメーションを全て無効にします。テストの際に便利です。[/ja]
 */

/**
 * @ngdoc method
 * @signature enableAnimations()
 * @description
 *   [en]Enable animations (default).[/en]
 *   [ja]アニメーションを有効にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature findParentComponentUntil(name, [dom])
 * @extensionOf angular
 * @param {String} name
 *   [en]Name of component, i.e. 'ons-page'.[/en]
 *   [ja]コンポーネント名を指定します。例えばons-pageなどを指定します。[/ja]
 * @param {Object|jqLite|HTMLElement} [dom]
 *   [en]$event, jqLite or HTMLElement object.[/en]
 *   [ja]$eventオブジェクト、jqLiteオブジェクト、HTMLElementオブジェクトのいずれかを指定できます。[/ja]
 * @return {Object}
 *   [en]Component object. Will return null if no component was found.[/en]
 *   [ja]コンポーネントのオブジェクトを返します。もしコンポーネントが見つからなかった場合にはnullを返します。[/ja]
 * @description
 *   [en]Find parent component object of <code>dom</code> element.[/en]
 *   [ja]指定されたdom引数の親要素をたどってコンポーネントを検索します。[/ja]
 */

/**
 * @ngdoc method
 * @signature findComponent(selector, [dom])
 * @extensionOf angular
 * @param {String} selector
 *   [en]CSS selector[/en]
 *   [ja]CSSセレクターを指定します。[/ja]
 * @param {HTMLElement} [dom]
 *   [en]DOM element to search from.[/en]
 *   [ja]検索対象とするDOM要素を指定します。[/ja]
 * @return {Object}
 *   [en]Component object. Will return null if no component was found.[/en]
 *   [ja]コンポーネントのオブジェクトを返します。もしコンポーネントが見つからなかった場合にはnullを返します。[/ja]
 * @description
 *   [en]Find component object using CSS selector.[/en]
 *   [ja]CSSセレクタを使ってコンポーネントのオブジェクトを検索します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDefaultDeviceBackButtonListener(listener)
 * @param {Function} listener
 *   [en]Function that executes when device back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時に実行される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Set default handler for device back button.[/en]
 *   [ja]デバイスのバックボタンのためのデフォルトのハンドラを設定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature disableDeviceBackButtonHandler()
 * @description
 * [en]Disable device back button event handler.[/en]
 * [ja]デバイスのバックボタンのイベントを受け付けないようにします。[/ja]
 */

/**
 * @ngdoc method
 * @signature enableDeviceBackButtonHandler()
 * @description
 * [en]Enable device back button event handler.[/en]
 * [ja]デバイスのバックボタンのイベントを受け付けるようにします。[/ja]
 */

/**
 * @ngdoc method
 * @signature isReady()
 * @return {Boolean}
 *   [en]Will be true if Onsen UI is initialized.[/en]
 *   [ja]初期化されているかどうかを返します。[/ja]
 * @description
 *   [en]Returns true if Onsen UI is initialized.[/en]
 *   [ja]Onsen UIがすでに初期化されているかどうかを返すメソッドです。[/ja]
 */

/**
 * @ngdoc method
 * @signature compile(dom)
 * @extensionOf angular
 * @param {HTMLElement} dom
 *   [en]Element to compile.[/en]
 *   [ja]コンパイルする要素を指定します。[/ja]
 * @description
 *   [en]Compile Onsen UI components.[/en]
 *   [ja]通常のHTMLの要素をOnsen UIのコンポーネントにコンパイルします。[/ja]
 */

/**
 * @ngdoc method
 * @signature isWebView()
 * @return {Boolean}
 *   [en]Will be true if the app is running in Cordova.[/en]
 *   [ja]Cordovaで実行されている場合にtrueになります。[/ja]
 * @description
 *   [en]Returns true if running inside Cordova.[/en]
 *   [ja]Cordovaで実行されているかどうかを返すメソッドです。[/ja]
 */

/**
 * @ngdoc method
 * @signature createAlertDialog(page, [options])
 * @param {String} page
 *   [en]Page name. Can be either an HTML file or an <ons-template> containing a <ons-alert-dialog> component.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Object} [options.parentScope]
 *   [en]Parent scope of the dialog. Used to bind models and access scope methods from the dialog.[/en]
 *   [ja]ダイアログ内で利用する親スコープを指定します。ダイアログからモデルやスコープのメソッドにアクセスするのに使います。このパラメータはAngularJSバインディングでのみ利用できます。[/ja]
 * @return {Promise}
 *   [en]Promise object that resolves to the alert dialog component object.[/en]
 *   [ja]ダイアログのコンポーネントオブジェクトを解決するPromiseオブジェクトを返します。[/ja]
 * @description
 *   [en]Create a alert dialog instance from a template.[/en]
 *   [ja]テンプレートからアラートダイアログのインスタンスを生成します。[/ja]
 */

/**
 * @ngdoc method
 * @signature createDialog(page, [options])
 * @param {String} page
 *   [en]Page name. Can be either an HTML file or an <ons-template> containing a <ons-dialog> component.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Object} [options.parentScope]
 *   [en]Parent scope of the dialog. Used to bind models and access scope methods from the dialog.[/en]
 *   [ja]ダイアログ内で利用する親スコープを指定します。ダイアログからモデルやスコープのメソッドにアクセスするのに使います。このパラメータはAngularJSバインディングでのみ利用できます。[/ja]
 * @return {Promise}
 *   [en]Promise object that resolves to the dialog component object.[/en]
 *   [ja]ダイアログのコンポーネントオブジェクトを解決するPromiseオブジェクトを返します。[/ja]
 * @description
 *   [en]Create a dialog instance from a template.[/en]
 *   [ja]テンプレートからダイアログのインスタンスを生成します。[/ja]
 */

/**
 * @ngdoc method
 * @signature createPopover(page, [options])
 * @param {String} page
 *   [en]Page name. Can be either an HTML file or an <ons-template> containing a <ons-dialog> component.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Object} [options.parentScope]
 *   [en]Parent scope of the dialog. Used to bind models and access scope methods from the dialog.[/en]
 *   [ja]ダイアログ内で利用する親スコープを指定します。ダイアログからモデルやスコープのメソッドにアクセスするのに使います。このパラメータはAngularJSバインディングでのみ利用できます。[/ja]
 * @return {Promise}
 *   [en]Promise object that resolves to the popover component object.[/en]
 *   [ja]ポップオーバーのコンポーネントオブジェクトを解決するPromiseオブジェクトを返します。[/ja]
 * @description
 *   [en]Create a popover instance from a template.[/en]
 *   [ja]テンプレートからポップオーバーのインスタンスを生成します。[/ja]
 */

/**
 * @ngdoc method
 * @signature resolveLoadingPlaceholder(page)
 * @param {String} page
 *   [en]Page name. Can be either an HTML file or an <ons-template> element.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @description
 *   [en]If no page is defined for the `ons-loading-placeholder` attribute it will wait for this method being called before loading the page.[/en]
 *   [ja]ons-loading-placeholderの属性値としてページが指定されていない場合は、ページロード前に呼ばれるons.resolveLoadingPlaceholder処理が行われるまで表示されません。[/ja]
 */

(function(ons){
  'use strict';

  var module = angular.module('onsen', ['templates-main']);
  angular.module('onsen.directives', ['onsen']); // for BC

  // JS Global facade for Onsen UI.
  initOnsenFacade();
  waitOnsenUILoad();
  initAngularModule();

  function waitOnsenUILoad() {
    var unlockOnsenUI = ons._readyLock.lock();
    module.run(['$compile', '$rootScope', function($compile, $rootScope) {
      // for initialization hook.
      if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
        window.addEventListener('DOMContentLoaded', function() {
          document.body.appendChild(document.createElement('ons-dummy-for-init'));
        });
      } else if (document.body) {
        document.body.appendChild(document.createElement('ons-dummy-for-init'));
      } else {
        throw new Error('Invalid initialization state.');
      }

      $rootScope.$on('$ons-ready', unlockOnsenUI);
    }]);
  }

  function initAngularModule() {
    module.value('$onsGlobal', ons);
    module.run(['$compile', '$rootScope', '$onsen', '$q', function($compile, $rootScope, $onsen, $q) {
      ons._onsenService = $onsen;
      ons._qService = $q;

      $rootScope.ons = window.ons;
      $rootScope.console = window.console;
      $rootScope.alert = window.alert;

      ons.$compile = $compile;
    }]);
  }

  function initOnsenFacade() {
    ons._onsenService = null;

    // Object to attach component variables to when using the var="..." attribute.
    // Can be set to null to avoid polluting the global scope.
    ons.componentBase = window;

    /**
     * Bootstrap this document as a Onsen UI application.
     *
     * @param {String} [name] optional name
     * @param {Array} [deps] optional dependency modules
     */
    ons.bootstrap = function(name, deps) {
      if (angular.isArray(name)) {
        deps = name;
        name = undefined;
      }

      if (!name) {
        name = 'myOnsenApp';
      }

      deps = ['onsen'].concat(angular.isArray(deps) ? deps : []);
      var module = angular.module(name, deps);

      var doc = window.document;
      if (doc.readyState == 'loading' || doc.readyState == 'uninitialized' || doc.readyState == 'interactive') {
        doc.addEventListener('DOMContentLoaded', function() {
          angular.bootstrap(doc.documentElement, [name]);
        }, false);
      } else if (doc.documentElement) {
        angular.bootstrap(doc.documentElement, [name]);
      } else {
        throw new Error('Invalid state');
      }

      return module;
    };

    /**
     * @param {String} [name]
     * @param {Object/jqLite/HTMLElement} dom $event object or jqLite object or HTMLElement object.
     * @return {Object}
     */
    ons.findParentComponentUntil = function(name, dom) {
      var element;
      if (dom instanceof HTMLElement) {
        element = angular.element(dom);
      } else if (dom instanceof angular.element) {
        element = dom;
      } else if (dom.target) {
        element = angular.element(dom.target);
      }

      return element.inheritedData(name);
    };

    /**
     * Find view object correspond dom element queried by CSS selector.
     *
     * @param {String} selector CSS selector
     * @param {HTMLElement} [dom]
     * @return {Object/void}
     */
    ons.findComponent = function(selector, dom) {
      var target = (dom ? dom : document).querySelector(selector);
      return target ? angular.element(target).data(target.nodeName.toLowerCase()) || null : null;
    };

    /**
     * @param {HTMLElement} dom
     */
    ons.compile = function(dom) {
      if (!ons.$compile) {
        throw new Error('ons.$compile() is not ready. Wait for initialization with ons.ready().');
      }

      if (!(dom instanceof HTMLElement)) {
        throw new Error('First argument must be an instance of HTMLElement.');
      }

      var scope = angular.element(dom).scope();
      if (!scope) {
        throw new Error('AngularJS Scope is null. Argument DOM element must be attached in DOM document.');
      }

      ons.$compile(dom)(scope);
    };

    ons._getOnsenService = function() {
      if (!this._onsenService) {
        throw new Error('$onsen is not loaded, wait for ons.ready().');
      }

      return this._onsenService;
    };

    /**
     * @param {String} elementName
     * @param {Function} lastReady
     * @return {Function}
     */
    ons._waitDiretiveInit = function(elementName, lastReady) {
      return function(element, callback) {
        if (angular.element(element).data(elementName)) {
          lastReady(element, callback);
        } else {
          var listen = function() {
            lastReady(element, callback);
            element.removeEventListener(elementName + ':init', listen, false);
          };
          element.addEventListener(elementName + ':init', listen, false);
        }
      };
    };

    /**
     * @param {String} page
     * @param {Object} [options]
     * @param {Object} [options.parentScope]
     * @return {Promise}
     */
    ons.createAlertDialog = function(page, options) {
      options = options || {};

      options.link = function(element) {
        if (options.parentScope) {
          ons.$compile(angular.element(element))(options.parentScope.$new());
        } else {
          ons.compile(element);
        }
      };

      return ons._createAlertDialogOriginal(page, options).then(function(alertDialog) {
        return angular.element(alertDialog).data('ons-alert-dialog');
      });
    };

    /**
     * @param {String} page
     * @param {Object} [options]
     * @param {Object} [options.parentScope]
     * @return {Promise}
     */
    ons.createDialog = function(page, options) {
      options = options || {};

      options.link = function(element) {
        if (options.parentScope) {
          ons.$compile(angular.element(element))(options.parentScope.$new());
        } else {
          ons.compile(element);
        }
      };

      return ons._createDialogOriginal(page, options).then(function(dialog) {
        return angular.element(dialog).data('ons-dialog');
      });
    };

    /**
     * @param {String} page
     * @param {Object} [options]
     * @param {Object} [options.parentScope]
     * @return {Promise}
     */
    ons.createPopover = function(page, options) {
      options = options || {};

      options.link = function(element) {
        if (options.parentScope) {
          ons.$compile(angular.element(element))(options.parentScope.$new());
        } else {
          ons.compile(element);
        }
      };

      return ons._createPopoverOriginal(page, options).then(function(popover) {
        return angular.element(popover).data('ons-popover');
      });
    };

    /**
     * @param {String} page
     */
    ons.resolveLoadingPlaceholder = function(page) {
      return ons._resolveLoadingPlaceholderOriginal(page, function(element, done) {
        ons.compile(element);
        angular.element(element).scope().$evalAsync(function() {
          setImmediate(done);
        });
      });
    };

    ons._setupLoadingPlaceHolders = function() {
      // Do nothing
    };
  }

})(window.ons = window.ons || {});

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.factory('AlertDialogView', ['$onsen', function($onsen) {

    var AlertDialogView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], [
          'getDeviceBackButtonHandler',
          'show',
          'hide',
          'isShown',
          'destroy',
          'setDisabled',
          'isDisabled',
          'setCancelable',
          'isCancelable'
        ]);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], [
          'preshow',
          'postshow',
          'prehide',
          'posthide',
          'cancel'
        ], function(detail) {
          if (detail.alertDialog) {
            detail.alertDialog = this;
          }
          return detail;
        }.bind(this));

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function() {
        this.emit('destroy');

        this._element.remove();

        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._scope = this._attrs = this._element = null;
      }

    });

    MicroEvent.mixin(AlertDialogView);

    return AlertDialogView;
  }]);
})();


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

angular.module('onsen')
  .value('AlertDialogAnimator', ons._internal.AlertDialogAnimator)
  .value('AndroidAlertDialogAnimator', ons._internal.AndroidAlertDialogAnimator)
  .value('IOSAlertDialogAnimator', ons._internal.IOSAlertDialogAnimator);

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

angular.module('onsen').value('AnimationChooser', ons._internal.AnimatorFactory);

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.factory('CarouselView', ['$onsen', function($onsen) {

    /**
     * @class CarouselView
     */
    var CarouselView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], [
          'setSwipeable',
          'isSwipeable',
          'setAutoScrollRatio',
          'getAutoScrollRatio',
          'setActiveCarouselItemIndex',
          'getActiveCarouselItemIndex',
          'next',
          'prev',
          'setAutoScrollEnabled',
          'isAutoScrollEnabled',
          'setDisabled',
          'isDisabled',
          'setOverscrollable',
          'isOverscrollable',
          'refresh',
          'first',
          'last'
        ]);

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['refresh', 'postchange', 'overscroll'], function(detail) {
          if (detail.carousel) {
            detail.carousel = this;
          }
          return detail;
        }.bind(this));
      },

      _destroy: function() {
        this.emit('destroy');

        this._clearDerivingEvents();
        this._clearDerivingMethods();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(CarouselView);

    return CarouselView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.factory('DialogView', ['$onsen', function($onsen) {

    var DialogView = Class.extend({

      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], [
          'getDeviceBackButtonHandler',
          'show',
          'hide',
          'isShown',
          'destroy'
        ]);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], [
          'preshow',
          'postshow',
          'prehide',
          'posthide',
          'cancel'
        ], function(detail) {
          if (detail.dialog) {
            detail.dialog = this;
          }
          return detail;
        }.bind(this));

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function() {
        this.emit('destroy');

        this._element.remove();
        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._scope = this._attrs = this._element = null;
      }
    });

    DialogView.registerAnimator = function(name, Animator) {
      return window.OnsDialogElement.registerAnimator(name, Animator);
    };

    MicroEvent.mixin(DialogView);

    return DialogView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

angular.module('onsen')
  .value('DialogAnimator', ons._internal.DialogAnimator)
  .value('IOSDialogAnimator', ons._internal.IOSDialogAnimator)
  .value('AndroidDialogAnimator', ons._internal.AndroidDialogAnimator)
  .value('SlideDialogAnimator', ons._internal.SlideDialogAnimator);

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';

  angular.module('onsen').factory('GenericView', ['$onsen', function($onsen) {

    var GenericView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       * @param {Object} [options]
       * @param {Boolean} [options.directiveOnly]
       * @param {Function} [options.onDestroy]
       * @param {String} [options.modifierTemplate]
       */
      init: function(scope, element, attrs, options) {
        var self = this;
        options = {};

        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        if (options.directiveOnly) {
          if (!options.modifierTemplate) {
            throw new Error('options.modifierTemplate is undefined.');
          }
          $onsen.addModifierMethods(this, options.modifierTemplate, element);
        } else {
          $onsen.addModifierMethodsForCustomElements(this, element);
        }

        $onsen.cleaner.onDestroy(scope, function() {
          self._events = undefined;
          $onsen.removeModifierMethods(self);

          if (options.onDestroy) {
            options.onDestroy(self);
          }

          $onsen.clearComponent({
            scope: scope,
            attrs: attrs,
            element: element
          });

          self = element = self._element = self._scope = scope = self._attrs = attrs = options = null;
        });
      }
    });

    /**
     * @param {Object} scope
     * @param {jqLite} element
     * @param {Object} attrs
     * @param {Object} options
     * @param {String} options.viewKey
     * @param {Boolean} [options.directiveOnly]
     * @param {Function} [options.onDestroy]
     * @param {String} [options.modifierTemplate]
     */
    GenericView.register = function(scope, element, attrs, options) {
      var view = new GenericView(scope, element, attrs, options);

      if (!options.viewKey) {
        throw new Error('options.viewKey is required.');
      }

      $onsen.declareVarAttribute(attrs, view);
      element.data(options.viewKey, view);

      var destroy = options.onDestroy || angular.noop;
      options.onDestroy = function(view) {
        destroy(view);
        element.data(options.viewKey, null);
      };

      return view;
    };

    MicroEvent.mixin(GenericView);

    return GenericView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.factory('LazyRepeatView', ['AngularLazyRepeatDelegate', function(AngularLazyRepeatDelegate) {

    var LazyRepeatView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs, linker) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;
        this._linker = linker;

        var userDelegate = this._getDelegate();
        var internalDelegate = new AngularLazyRepeatDelegate(element[0], userDelegate, element.scope());

        this._provider = new ons._internal.LazyRepeatProvider(element[0].parentNode, element[0], internalDelegate);
        element.remove();

        this._injectReloadMethod(userDelegate, this._provider);

        // Render when number of items change.
        this._scope.$watch(internalDelegate.countItems.bind(internalDelegate), this._provider._onChange.bind(this._provider));

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _injectReloadMethod: function(userDelegate, provider) {
        var oldReload = userDelegate.reload;

        if (typeof oldReload === 'function') {
          userDelegate.reload = function() {
            oldReload();
            provider._onChange();
          }.bind(this);
        }
        else {
          userDelegate.reload = function() {
            provider._onChange();
          }.bind(this);
        }
      }.bind(this),

      _getDelegate: function() {
        var delegate = this._scope.$eval(this._attrs.onsLazyRepeat);

        if (typeof delegate === 'undefined') {
          /*jshint evil:true */
          delegate = eval(this._attrs.onsLazyRepeat);
        }

        return delegate;
      },

      _destroy: function() {
        this._element = this._scope = this._attrs = this._linker = null;
      }
    });

    return LazyRepeatView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';

  angular.module('onsen').factory('AngularLazyRepeatDelegate', ['$compile', function($compile) {

    var AngularLazyRepeatDelegate = function() {
      AngularLazyRepeatDelegate.prototype.init.apply(this, arguments);
    };
    AngularLazyRepeatDelegate.prototype = Object.create(ons._internal.LazyRepeatDelegate.prototype);

    angular.extend(AngularLazyRepeatDelegate.prototype, {

      /**
       * @param {Element} templateElement
       * @param {Object} userDelegate
       * @param {Scope} parentScope
       */
      init: function(templateElement, userDelegate, parentScope) {
        this._templateElement = templateElement.cloneNode(true);
        this._userDelegate = userDelegate;
        this._parentScope = parentScope;

        this._removeLazyRepeatDirective();

        this._linker = $compile(this._templateElement.cloneNode(true));
      },

      /**
       * @return {Boolean}
       */
      _usingBinding: function() {
        if (this._userDelegate.configureItemScope) {
          return true;
        }

        if (this._userDelegate.createItemContent) {
          return false;
        }

        throw new Error('`lazy-repeat` delegate object is vague.');
      },

      _removeLazyRepeatDirective: function() {
        this._templateElement.removeAttribute('ons-lazy-repeat');
        this._templateElement.removeAttribute('ons:lazy:repeat');
        this._templateElement.removeAttribute('ons_lazy_repeat');
        this._templateElement.removeAttribute('data-ons-lazy-repeat');
        this._templateElement.removeAttribute('x-ons-lazy-repeat');
      },

      prepareItem: function(index, done) {
        var scope = this._parentScope.$new();
        this._addSpecialProperties(index, scope);

        if (this._usingBinding()) {
          this._userDelegate.configureItemScope(index, scope);
        }

        this._linker(scope, function(cloned) {
          cloned[0].style.display = 'none';

          if (!this._usingBinding()) {
            var contentElement = this._userDelegate.createItemContent(index, null);
            cloned.append(contentElement);
            $compile(cloned[0].firstChild)(scope);
          }

          done({
            element: cloned[0],
            scope: scope
          });

          scope.$evalAsync(function() {
            cloned[0].style.display = 'block';
          });

        }.bind(this));
      },

      /**
       * @param {Number} index
       * @param {Object} scope
       */
      _addSpecialProperties: function(index, scope) {
        scope.$index = index;
        scope.$first = index === 0;
        scope.$last = index === this.countItems() - 1;
        scope.$middle = !scope.$first && !scope.$last;
        scope.$even = index % 2 === 0;
        scope.$odd = !scope.$even;
      },

      countItems: function() {
        return this._userDelegate.countItems();
      },

      updateItem: function(index, item) {
        if (this._usingBinding()) {
          item.scope.$evalAsync(function() {
            this._userDelegate.configureItemScope(index, item.scope);
          }.bind(this));
        }
      },

      /**
       * @param {Number} index
       * @param {Object} item
       * @param {Object} item.scope
       * @param {Element} item.element
       */
      destroyItem: function(index, item) {
        if (this._usingBinding()) {
          if (this._userDelegate.destroyItemScope instanceof Function) {
            this._userDelegate.destroyItemScope(index, item.scope);
          }
        } else {
          if (this._userDelegate.destroyItemContent instanceof Function) {
            this._userDelegate.destroyItemContent(index, item.element);
          }
        }
        item.scope.$destroy();
      },

      destroy: function() {
        this._userDelegate = this._templateElement = this._scope = null;
      },

      calculateItemHeight: function(index) {
        return this._userDelegate.calculateItemHeight(index);
      }
    });

    return AngularLazyRepeatDelegate;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.value('ModalAnimator', ons._internal.ModalAnimator);
  module.value('FadeModalAnimator', ons._internal.FadeModalAnimator);

  module.factory('ModalView', ['$onsen', '$parse', function($onsen, $parse) {

    var ModalView = Class.extend({
      _element: undefined,
      _scope: undefined,

      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._scope.$on('$destroy', this._destroy.bind(this));

        element[0]._animatorFactory.setAnimationOptions($parse(attrs.animationOptions)());
      },

      getDeviceBackButtonHandler: function() {
        return this._element[0].getDeviceBackButtonHandler();
      },

      setDeviceBackButtonHandler: function(callback) {
        this._element[0].setDeviceBackButtonHandler(callback);
      },

      show: function(options) {
        return this._element[0].show(options);
      },

      hide: function(options) {
        return this._element[0].hide(options);
      },

      toggle: function(options) {
        return this._element[0].toggle(options);
      },

      _destroy: function() {
        this.emit('destroy', {page: this});

        this._events = this._element = this._scope = null;
      }
    });

    ModalView.registerAnimator = function(name, Animator) {
      return window.OnsModalElement.registerAnimator(name, Animator);
    };

    MicroEvent.mixin(ModalView);

    return ModalView;
  }]);

})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.factory('NavigatorView', ['$http', '$parse', '$compile', '$onsen', '$timeout', 'AnimationChooser', 'SimpleSlideTransitionAnimator', 'NavigatorTransitionAnimator', 'LiftTransitionAnimator', 'NullTransitionAnimator', 'IOSSlideTransitionAnimator', 'FadeTransitionAnimator', function($http, $parse, $compile, $onsen, $timeout, AnimationChooser,
    SimpleSlideTransitionAnimator, NavigatorTransitionAnimator, LiftTransitionAnimator,
    NullTransitionAnimator, IOSSlideTransitionAnimator, FadeTransitionAnimator) {

    /**
     * Manages the page navigation backed by page stack.
     *
     * @class NavigatorView
     */
    var NavigatorView = Class.extend({

      /**
       * @member {jqLite} Object
       */
      _element: undefined,

      /**
       * @member {Object} Object
       */
      _attrs: undefined,

      /**
       * @member {Object}
       */
      _scope: undefined,

      /**
       * @param {Object} scope
       * @param {jqLite} element jqLite Object to manage with navigator
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {

        this._element = element || angular.element(window.document.body);
        this._scope = scope || this._element.scope();
        this._attrs = attrs;
        this._previousPageScope = null;

        this._boundOnPrepop = this._onPrepop.bind(this);
        this._boundOnPostpop = this._onPostpop.bind(this);
        this._element.on('prepop', this._boundOnPrepop);
        this._element.on('postpop', this._boundOnPostpop);

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], [
          'prepush', 'postpush', 'prepop',
          'postpop', 'init', 'show', 'hide', 'destroy'
        ], function(detail) {
          if (detail.navigator) {
            detail.navigator = this;
          }
          return detail;
        }.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], [
          'insertPage',
          'pushPage',
          'bringPageTop',
          'getDeviceBackButtonHandler',
          'popPage',
          'replacePage',
          'resetToPage',
          'getCurrentPage',
          'canPopPage'
        ]);
      },

      _onPrepop: function(event) {
        var pages = event.detail.navigator.pages;
        angular.element(pages[pages.length - 2].element).scope().$evalAsync();

        this._previousPageScope = angular.element(pages[pages.length - 1].element).scope();
      },

      _onPostpop: function(event) {
        this._previousPageScope.$destroy();
        this._previoousPageScope = null;
      },

      _compileAndLink: function(pageElement, callback) {
        var link = $compile(pageElement);
        var pageScope = this._createPageScope();
        link(pageScope);

        pageScope.$evalAsync(function() {
          callback(pageElement);
        });
      },

      _destroy: function() {
        this.emit('destroy');
        this._clearDerivingEvents();
        this._clearDerivingMethods();
        this._element.off('prepop', this._boundOnPrepop);
        this._element.off('postpop', this._boundOnPostpop);
        this._element = this._scope = this._attrs = null;
      },

      _createPageScope: function() {
         return this._scope.$new();
      },

      /**
       * Retrieve the entire page stages of the navigator.
       *
       * @return {Array}
       */
      getPages: function() {
        return this._element[0].pages;
      }
    });

    MicroEvent.mixin(NavigatorView);

    Object.defineProperty(NavigatorView.prototype, 'pages', {
      get: function () {
        return this.getPages();
      },
      set: function() {
        throw new Error();
      }
    });

    return NavigatorView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

angular.module('onsen')
  .value('NavigatorTransitionAnimator', ons._internal.NavigatorTransitionAnimator)
  .value('FadeTransitionAnimator', ons._internal.FadeNavigatorTransitionAnimator)
  .value('IOSSlideTransitionAnimator', ons._internal.IOSSlideNavigatorTransitionAnimator)
  .value('LiftTransitionAnimator', ons._internal.LiftNavigatorTransitionAnimator)
  .value('NullTransitionAnimator', ons._internal.NavigatorTransitionAnimator)
  .value('SimpleSlideTransitionAnimator', ons._internal.SimpleSlideNavigatorTransitionAnimator);

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.factory('OverlaySlidingMenuAnimator', ['SlidingMenuAnimator', function(SlidingMenuAnimator) {

    var OverlaySlidingMenuAnimator = SlidingMenuAnimator.extend({

      _blackMask: undefined,

      _isRight: false,
      _element: false,
      _menuPage: false,
      _mainPage: false,
      _width: false,

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Object} options
       * @param {String} options.width "width" style value
       * @param {Boolean} options.isRight
       */
      setup: function(element, mainPage, menuPage, options) {
        options = options || {};
        this._width = options.width || '90%';
        this._isRight = !!options.isRight;
        this._element = element;
        this._mainPage = mainPage;
        this._menuPage = menuPage;

        menuPage.css('box-shadow', '0px 0 10px 0px rgba(0, 0, 0, 0.2)');
        menuPage.css({
          width: options.width,
          display: 'none',
          zIndex: 2
        });

        // Fix for transparent menu page on iOS8.
        menuPage.css('-webkit-transform', 'translate3d(0px, 0px, 0px)');

        mainPage.css({zIndex: 1});

        if (this._isRight) {
          menuPage.css({
            right: '-' + options.width,
            left: 'auto'
          });
        } else {
          menuPage.css({
            right: 'auto',
            left: '-' + options.width
          });
        }

        this._blackMask = angular.element('<div></div>').css({
          backgroundColor: 'black',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          position: 'absolute',
          display: 'none',
          zIndex: 0
        });

        element.prepend(this._blackMask);
      },

      /**
       * @param {Object} options
       * @param {String} options.width
       */
      onResized: function(options) {
        this._menuPage.css('width', options.width);

        if (this._isRight) {
          this._menuPage.css({
            right: '-' + options.width,
            left: 'auto'
          });
        } else {
          this._menuPage.css({
            right: 'auto',
            left: '-' + options.width
          });
        }

        if (options.isOpened) {
          var max = this._menuPage[0].clientWidth;
          var menuStyle = this._generateMenuPageStyle(max);
          animit(this._menuPage[0]).queue(menuStyle).play();
        }
      },

      /**
       */
      destroy: function() {
        if (this._blackMask) {
          this._blackMask.remove();
          this._blackMask = null;
        }

        this._mainPage.removeAttr('style');
        this._menuPage.removeAttr('style');

        this._element = this._mainPage = this._menuPage = null;
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      openMenu: function(callback, instant) {
        var duration = instant === true ? 0.0 : this.duration;
        var delay = instant === true ? 0.0 : this.delay;

        this._menuPage.css('display', 'block');
        this._blackMask.css('display', 'block');

        var max = this._menuPage[0].clientWidth;
        var menuStyle = this._generateMenuPageStyle(max);
        var mainPageStyle = this._generateMainPageStyle(max);

        setTimeout(function() {

          animit(this._mainPage[0])
            .wait(delay)
            .queue(mainPageStyle, {
              duration: duration,
              timing: this.timing
            })
            .queue(function(done) {
              callback();
              done();
            })
            .play();

          animit(this._menuPage[0])
            .wait(delay)
            .queue(menuStyle, {
              duration: duration,
              timing: this.timing
            })
            .play();

        }.bind(this), 1000 / 60);
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      closeMenu: function(callback, instant) {
        var duration = instant === true ? 0.0 : this.duration;
        var delay = instant === true ? 0.0 : this.delay;

        this._blackMask.css({display: 'block'});

        var menuPageStyle = this._generateMenuPageStyle(0);
        var mainPageStyle = this._generateMainPageStyle(0);

        setTimeout(function() {

          animit(this._mainPage[0])
            .wait(delay)
            .queue(mainPageStyle, {
              duration: duration,
              timing: this.timing
            })
            .queue(function(done) {
              this._menuPage.css('display', 'none');
              callback();
              done();
            }.bind(this))
            .play();

          animit(this._menuPage[0])
            .wait(delay)
            .queue(menuPageStyle, {
              duration: duration,
              timing: this.timing
            })
            .play();

        }.bind(this), 1000 / 60);
      },

      /**
       * @param {Object} options
       * @param {Number} options.distance
       * @param {Number} options.maxDistance
       */
      translateMenu: function(options) {

        this._menuPage.css('display', 'block');
        this._blackMask.css({display: 'block'});

        var menuPageStyle = this._generateMenuPageStyle(Math.min(options.maxDistance, options.distance));
        var mainPageStyle = this._generateMainPageStyle(Math.min(options.maxDistance, options.distance));
        delete mainPageStyle.opacity;

        animit(this._menuPage[0])
          .queue(menuPageStyle)
          .play();

        if (Object.keys(mainPageStyle).length > 0) {
          animit(this._mainPage[0])
            .queue(mainPageStyle)
            .play();
        }
      },

      _generateMenuPageStyle: function(distance) {
        var x = this._isRight ? -distance : distance;
        var transform = 'translate3d(' + x + 'px, 0, 0)';

        return {
          transform: transform,
          'box-shadow': distance === 0 ? 'none' : '0px 0 10px 0px rgba(0, 0, 0, 0.2)'
        };
      },

      _generateMainPageStyle: function(distance) {
        var max = this._menuPage[0].clientWidth;
        var opacity = 1 - (0.1 * distance / max);

        return {
          opacity: opacity
        };
      },

      copy: function() {
        return new OverlaySlidingMenuAnimator();
      }
    });

    return OverlaySlidingMenuAnimator;
  }]);

})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.factory('PageView', ['$onsen', '$parse', function($onsen, $parse) {

    var PageView = Class.extend({
      _nullElement : window.document.createElement('div'),

      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._clearListener = scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['init', 'show', 'hide', 'destroy']);

        this._userDeviceBackButtonListener = angular.noop;
        if (this._attrs.ngDeviceBackbutton || this._attrs.onDeviceBackbutton) {
          this._element[0].setDeviceBackButtonHandler(this._onDeviceBackButton.bind(this));
        }
      },

      _onDeviceBackButton: function($event) {
        this._userDeviceBackButtonListener($event);

        // ng-device-backbutton
        if (this._attrs.ngDeviceBackbutton) {
          $parse(this._attrs.ngDeviceBackbutton)(this._scope, {$event: $event});
        }

        // on-device-backbutton
        /* jshint ignore:start */
        if (this._attrs.onDeviceBackbutton) {
          var lastEvent = window.$event;
          window.$event = $event;
          new Function(this._attrs.onDeviceBackbutton)();
          window.$event = lastEvent;
        }
        /* jshint ignore:end */
      },

      /**
       * @param {Function} callback
       */
      setDeviceBackButtonHandler: function(callback) {
        this._userDeviceBackButtonListener = callback;
      },

      /**
       * @return {Object/null}
       */
      getDeviceBackButtonHandler: function() {
        return this._element[0].getDeviceBackButtonHandler();
      },

      _destroy: function() {
        this._element[0]._destroy();

        this._clearDerivingEvents();

        this._element = null;
        this._nullElement = null;
        this._scope = null;

        this._clearListener();
      }
    });
    MicroEvent.mixin(PageView);

    return PageView;
  }]);
})();


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';

  angular.module('onsen').factory('PopoverView', ['$onsen', function($onsen) {

    var PopoverView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], [
          'show',
          'hide',
          'isShown',
          'setCancelable',
          'destroy'
        ]);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], [
          'preshow',
          'postshow',
          'prehide',
          'posthide'
        ], function(detail) {
          if (detail.popover) {
            detail.popover = this;
          }
          return detail;
        }.bind(this));
      },

      _destroy: function() {
        this.emit('destroy');

        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._element.remove();

        this._element = this._scope = null;
      }
    });

    MicroEvent.mixin(PopoverView);

    return PopoverView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

angular.module('onsen')
  .value('PopoverAnimator', ons._internal.PopoverAnimator)
  .value('FadePopoverAnimator', ons._internal.FadePopoverAnimator);

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.factory('PullHookView', ['$onsen', '$parse', function($onsen, $parse) {

    var PullHookView = Class.extend({

      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], [
          'getHeight',
          'setHeight',
          'setThresholdHeight',
          'getThresholdHeight',
          'getCurrentState',
          'getPullDistance',
          'isDisabled',
          'setDisabled'
        ]);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], [
          'changestate',
        ], function(detail) {
          if (detail.pullHook) {
            detail.pullHook = this;
          }
          return detail;
        }.bind(this));

        this.on('changestate', function(event) {
          this._scope.$evalAsync();
        }.bind(this));

        this._boundOnAction = this._onAction.bind(this);
        this._element[0].setActionCallback(this._boundOnAction);

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _onAction: function(done) {
        if (this._attrs.ngAction) {
          this._scope.$eval(this._attrs.ngAction, {$done: done});
        } else if (this._attrs.onAction) {
          /*jshint evil:true */
          eval(this._attrs.onAction);
        }
      },

      _destroy: function() {
        this.emit('destroy');

        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(PullHookView);
    return PullHookView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.factory('PushSlidingMenuAnimator', ['SlidingMenuAnimator', function(SlidingMenuAnimator) {

    var PushSlidingMenuAnimator = SlidingMenuAnimator.extend({

      _isRight: false,
      _element: undefined,
      _menuPage: undefined,
      _mainPage: undefined,
      _width: undefined,

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Object} options
       * @param {String} options.width "width" style value
       * @param {Boolean} options.isRight
       */
      setup: function(element, mainPage, menuPage, options) {
        options = options || {};

        this._element = element;
        this._mainPage = mainPage;
        this._menuPage = menuPage;

        this._isRight = !!options.isRight;
        this._width = options.width || '90%';

        menuPage.css({
          width: options.width,
          display: 'none'
        });

        if (this._isRight) {
          menuPage.css({
            right: '-' + options.width,
            left: 'auto'
          });
        } else {
          menuPage.css({
            right: 'auto',
            left: '-' + options.width
          });
        }
      },

      /**
       * @param {Object} options
       * @param {String} options.width
       * @param {Object} options.isRight
       */
      onResized: function(options) {
        this._menuPage.css('width', options.width);

        if (this._isRight) {
          this._menuPage.css({
            right: '-' + options.width,
            left: 'auto'
          });
        } else {
          this._menuPage.css({
            right: 'auto',
            left: '-' + options.width
          });
        }

        if (options.isOpened) {
          var max = this._menuPage[0].clientWidth;
          var mainPageTransform = this._generateAbovePageTransform(max);
          var menuPageStyle = this._generateBehindPageStyle(max);

          animit(this._mainPage[0]).queue({transform: mainPageTransform}).play();
          animit(this._menuPage[0]).queue(menuPageStyle).play();
        }
      },

      /**
       */
      destroy: function() {
        this._mainPage.removeAttr('style');
        this._menuPage.removeAttr('style');

        this._element = this._mainPage = this._menuPage = null;
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      openMenu: function(callback, instant) {
        var duration = instant === true ? 0.0 : this.duration;
        var delay = instant === true ? 0.0 : this.delay;

        this._menuPage.css('display', 'block');

        var max = this._menuPage[0].clientWidth;

        var aboveTransform = this._generateAbovePageTransform(max);
        var behindStyle = this._generateBehindPageStyle(max);

        setTimeout(function() {

          animit(this._mainPage[0])
            .wait(delay)
            .queue({
              transform: aboveTransform
            }, {
              duration: duration,
              timing: this.timing
            })
            .queue(function(done) {
              callback();
              done();
            })
            .play();

          animit(this._menuPage[0])
            .wait(delay)
            .queue(behindStyle, {
              duration: duration,
              timing: this.timing
            })
            .play();

        }.bind(this), 1000 / 60);
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      closeMenu: function(callback, instant) {
        var duration = instant === true ? 0.0 : this.duration;
        var delay = instant === true ? 0.0 : this.delay;

        var aboveTransform = this._generateAbovePageTransform(0);
        var behindStyle = this._generateBehindPageStyle(0);

        setTimeout(function() {

          animit(this._mainPage[0])
            .wait(delay)
            .queue({
              transform: aboveTransform
            }, {
              duration: duration,
              timing: this.timing
            })
            .queue({
              transform: 'translate3d(0, 0, 0)'
            })
            .queue(function(done) {
              this._menuPage.css('display', 'none');
              callback();
              done();
            }.bind(this))
            .play();

          animit(this._menuPage[0])
            .wait(delay)
            .queue(behindStyle, {
              duration: duration,
              timing: this.timing
            })
            .queue(function(done) {
              done();
            })
            .play();

        }.bind(this), 1000 / 60);
      },

      /**
       * @param {Object} options
       * @param {Number} options.distance
       * @param {Number} options.maxDistance
       */
      translateMenu: function(options) {

        this._menuPage.css('display', 'block');

        var aboveTransform = this._generateAbovePageTransform(Math.min(options.maxDistance, options.distance));
        var behindStyle = this._generateBehindPageStyle(Math.min(options.maxDistance, options.distance));

        animit(this._mainPage[0])
          .queue({transform: aboveTransform})
          .play();

        animit(this._menuPage[0])
          .queue(behindStyle)
          .play();
      },

      _generateAbovePageTransform: function(distance) {
        var x = this._isRight ? -distance : distance;
        var aboveTransform = 'translate3d(' + x + 'px, 0, 0)';

        return aboveTransform;
      },

      _generateBehindPageStyle: function(distance) {
        var behindX = this._isRight ? -distance : distance;
        var behindTransform = 'translate3d(' + behindX + 'px, 0, 0)';

        return {
          transform: behindTransform
        };
      },

      copy: function() {
        return new PushSlidingMenuAnimator();
      }
    });

    return PushSlidingMenuAnimator;
  }]);

})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.factory('RevealSlidingMenuAnimator', ['SlidingMenuAnimator', function(SlidingMenuAnimator) {

    var RevealSlidingMenuAnimator = SlidingMenuAnimator.extend({

      _blackMask: undefined,

      _isRight: false,

      _menuPage: undefined,
      _element: undefined,
      _mainPage: undefined,

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Object} options
       * @param {String} options.width "width" style value
       * @param {Boolean} options.isRight
       */
      setup: function(element, mainPage, menuPage, options) {
        this._element = element;
        this._menuPage = menuPage;
        this._mainPage = mainPage;
        this._isRight = !!options.isRight;
        this._width = options.width || '90%';

        mainPage.css({
          boxShadow: '0px 0 10px 0px rgba(0, 0, 0, 0.2)'
        });

        menuPage.css({
          width: options.width,
          opacity: 0.9,
          display: 'none'
        });

        if (this._isRight) {
          menuPage.css({
            right: '0px',
            left: 'auto'
          });
        } else {
          menuPage.css({
            right: 'auto',
            left: '0px'
          });
        }

        this._blackMask = angular.element('<div></div>').css({
          backgroundColor: 'black',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          position: 'absolute',
          display: 'none'
        });

        element.prepend(this._blackMask);

        // Dirty fix for broken rendering bug on android 4.x.
        animit(mainPage[0]).queue({transform: 'translate3d(0, 0, 0)'}).play();
      },

      /**
       * @param {Object} options
       * @param {Boolean} options.isOpened
       * @param {String} options.width
       */
      onResized: function(options) {
        this._width = options.width;
        this._menuPage.css('width', this._width);

        if (options.isOpened) {
          var max = this._menuPage[0].clientWidth;

          var aboveTransform = this._generateAbovePageTransform(max);
          var behindStyle = this._generateBehindPageStyle(max);

          animit(this._mainPage[0]).queue({transform: aboveTransform}).play();
          animit(this._menuPage[0]).queue(behindStyle).play();
        }
      },

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       */
      destroy: function() {
        if (this._blackMask) {
          this._blackMask.remove();
          this._blackMask = null;
        }

        if (this._mainPage) {
          this._mainPage.attr('style', '');
        }

        if (this._menuPage) {
          this._menuPage.attr('style', '');
        }

        this._mainPage = this._menuPage = this._element = undefined;
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      openMenu: function(callback, instant) {
        var duration = instant === true ? 0.0 : this.duration;
        var delay = instant === true ? 0.0 : this.delay;

        this._menuPage.css('display', 'block');
        this._blackMask.css('display', 'block');

        var max = this._menuPage[0].clientWidth;

        var aboveTransform = this._generateAbovePageTransform(max);
        var behindStyle = this._generateBehindPageStyle(max);

        setTimeout(function() {

          animit(this._mainPage[0])
            .wait(delay)
            .queue({
              transform: aboveTransform
            }, {
              duration: duration,
              timing: this.timing
            })
            .queue(function(done) {
              callback();
              done();
            })
            .play();

          animit(this._menuPage[0])
            .wait(delay)
            .queue(behindStyle, {
              duration: duration,
              timing: this.timing
            })
            .play();

        }.bind(this), 1000 / 60);
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      closeMenu: function(callback, instant) {
        var duration = instant === true ? 0.0 : this.duration;
        var delay = instant === true ? 0.0 : this.delay;

        this._blackMask.css('display', 'block');

        var aboveTransform = this._generateAbovePageTransform(0);
        var behindStyle = this._generateBehindPageStyle(0);

        setTimeout(function() {

          animit(this._mainPage[0])
            .wait(delay)
            .queue({
              transform: aboveTransform
            }, {
              duration: duration,
              timing: this.timing
            })
            .queue({
              transform: 'translate3d(0, 0, 0)'
            })
            .queue(function(done) {
              this._menuPage.css('display', 'none');
              callback();
              done();
            }.bind(this))
            .play();

          animit(this._menuPage[0])
            .wait(delay)
            .queue(behindStyle, {
              duration: duration,
              timing: this.timing
            })
            .queue(function(done) {
              done();
            })
            .play();

        }.bind(this), 1000 / 60);
      },

      /**
       * @param {Object} options
       * @param {Number} options.distance
       * @param {Number} options.maxDistance
       */
      translateMenu: function(options) {

        this._menuPage.css('display', 'block');
        this._blackMask.css('display', 'block');

        var aboveTransform = this._generateAbovePageTransform(Math.min(options.maxDistance, options.distance));
        var behindStyle = this._generateBehindPageStyle(Math.min(options.maxDistance, options.distance));
        delete behindStyle.opacity;

        animit(this._mainPage[0])
          .queue({transform: aboveTransform})
          .play();

        animit(this._menuPage[0])
          .queue(behindStyle)
          .play();
      },

      _generateAbovePageTransform: function(distance) {
        var x = this._isRight ? -distance : distance;
        var aboveTransform = 'translate3d(' + x + 'px, 0, 0)';

        return aboveTransform;
      },

      _generateBehindPageStyle: function(distance) {
        var max = this._menuPage[0].getBoundingClientRect().width;

        var behindDistance = (distance - max) / max * 10;
        behindDistance = isNaN(behindDistance) ? 0 : Math.max(Math.min(behindDistance, 0), -10);

        var behindX = this._isRight ? -behindDistance : behindDistance;
        var behindTransform = 'translate3d(' + behindX + '%, 0, 0)';
        var opacity = 1 + behindDistance / 100;

        return {
          transform: behindTransform,
          opacity: opacity
        };
      },

      copy: function() {
        return new RevealSlidingMenuAnimator();
      }
    });

    return RevealSlidingMenuAnimator;
  }]);

})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';
  var module = angular.module('onsen');

  var SlidingMenuViewModel = Class.extend({

    /**
     * @member Number
     */
    _distance: 0,

    /**
     * @member Number
     */
    _maxDistance: undefined,

    /**
     * @param {Object} options
     * @param {Number} maxDistance
     */
    init: function(options) {
      if (!angular.isNumber(options.maxDistance)) {
        throw new Error('options.maxDistance must be number');
      }

      this.setMaxDistance(options.maxDistance);
    },

    /**
     * @param {Number} maxDistance
     */
    setMaxDistance: function(maxDistance) {
      if (maxDistance <= 0) {
        throw new Error('maxDistance must be greater then zero.');
      }

      if (this.isOpened()) {
        this._distance = maxDistance;
      }
      this._maxDistance = maxDistance;
    },

    /**
     * @return {Boolean}
     */
    shouldOpen: function() {
      return !this.isOpened() && this._distance >= this._maxDistance / 2;
    },

    /**
     * @return {Boolean}
     */
    shouldClose: function() {
      return !this.isClosed() && this._distance < this._maxDistance / 2;
    },

    openOrClose: function(options) {
      if (this.shouldOpen()) {
        this.open(options);
      } else if (this.shouldClose()) {
        this.close(options);
      }
    },

    close: function(options) {
      var callback = options.callback || function() {};

      if (!this.isClosed()) {
        this._distance = 0;
        this.emit('close', options);
      } else {
        callback();
      }
    },

    open: function(options) {
      var callback = options.callback || function() {};

      if (!this.isOpened()) {
        this._distance = this._maxDistance;
        this.emit('open', options);
      } else {
        callback();
      }
    },

    /**
     * @return {Boolean}
     */
    isClosed: function() {
      return this._distance === 0;
    },

    /**
     * @return {Boolean}
     */
    isOpened: function() {
      return this._distance === this._maxDistance;
    },

    /**
     * @return {Number}
     */
    getX: function() {
      return this._distance;
    },

    /**
     * @return {Number}
     */
    getMaxDistance: function() {
      return this._maxDistance;
    },

    /**
     * @param {Number} x
     */
    translate: function(x) {
      this._distance = Math.max(1, Math.min(this._maxDistance - 1, x));

      var options = {
        distance: this._distance,
        maxDistance: this._maxDistance
      };

      this.emit('translate', options);
    },

    toggle: function() {
      if (this.isClosed()) {
        this.open();
      } else {
        this.close();
      }
    }
  });
  MicroEvent.mixin(SlidingMenuViewModel);

  module.factory('SlidingMenuView', ['$onsen', '$compile', '$parse', 'AnimationChooser', 'SlidingMenuAnimator', 'RevealSlidingMenuAnimator', 'PushSlidingMenuAnimator', 'OverlaySlidingMenuAnimator', function($onsen, $compile, $parse, AnimationChooser, SlidingMenuAnimator, RevealSlidingMenuAnimator,
                                             PushSlidingMenuAnimator, OverlaySlidingMenuAnimator) {

    var SlidingMenuView = Class.extend({
      _scope: undefined,
      _attrs: undefined,

      _element: undefined,
      _menuPage: undefined,
      _mainPage: undefined,

      _doorLock: undefined,

      _isRightMenu: false,

      init: function(scope, element, attrs) {
        this._scope = scope;
        this._attrs = attrs;
        this._element = element;

        this._menuPage = angular.element(element[0].querySelector('.onsen-sliding-menu__menu'));
        this._mainPage = angular.element(element[0].querySelector('.onsen-sliding-menu__main'));

        this._doorLock = new DoorLock();

        this._isRightMenu = attrs.side === 'right';

        // Close menu on tap event.
        this._mainPageGestureDetector = new ons.GestureDetector(this._mainPage[0]);
        this._boundOnTap = this._onTap.bind(this);

        var maxDistance = this._normalizeMaxSlideDistanceAttr();
        this._logic = new SlidingMenuViewModel({maxDistance: Math.max(maxDistance, 1)});
        this._logic.on('translate', this._translate.bind(this));
        this._logic.on('open', function(options) {
          this._open(options);
        }.bind(this));
        this._logic.on('close', function(options) {
          this._close(options);
        }.bind(this));

        attrs.$observe('maxSlideDistance', this._onMaxSlideDistanceChanged.bind(this));
        attrs.$observe('swipeable', this._onSwipeableChanged.bind(this));

        this._boundOnWindowResize = this._onWindowResize.bind(this);
        window.addEventListener('resize', this._boundOnWindowResize);

        this._boundHandleEvent = this._handleEvent.bind(this);
        this._bindEvents();

        if (attrs.mainPage) {
          this.setMainPage(attrs.mainPage);
        }

        if (attrs.menuPage) {
          this.setMenuPage(attrs.menuPage);
        }

        this._deviceBackButtonHandler = ons._deviceBackButtonDispatcher.createHandler(this._element[0], this._onDeviceBackButton.bind(this));

        var unlock = this._doorLock.lock();

        window.setTimeout(function() {
          var maxDistance = this._normalizeMaxSlideDistanceAttr();
          this._logic.setMaxDistance(maxDistance);

          this._menuPage.css({opacity: 1});

          var animationChooser = new AnimationChooser({
            animators: SlidingMenuView._animatorDict,
            baseClass: SlidingMenuAnimator,
            baseClassName: 'SlidingMenuAnimator',
            defaultAnimation: attrs.type,
            defaultAnimationOptions: $parse(attrs.animationOptions)()
          });
          this._animator = animationChooser.newAnimator();
          this._animator.setup(
            this._element,
            this._mainPage,
            this._menuPage,
            {
              isRight: this._isRightMenu,
              width: this._attrs.maxSlideDistance || '90%'
            }
          );

          unlock();
        }.bind(this), 400);

        scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['init', 'show', 'hide', 'destroy']);

        if (!attrs.swipeable) {
          this.setSwipeable(true);
        }
      },

      getDeviceBackButtonHandler: function() {
        return this._deviceBackButtonHandler;
      },

      _onDeviceBackButton: function(event) {
        if (this.isMenuOpened()) {
          this.closeMenu();
        } else {
          event.callParentHandler();
        }
      },

      _onTap: function() {
        if (this.isMenuOpened()) {
          this.closeMenu();
        }
      },

      _refreshMenuPageWidth: function() {
        var width = ('maxSlideDistance' in this._attrs) ? this._attrs.maxSlideDistance : '90%';

        if (this._animator) {
          this._animator.onResized({
            isOpened: this._logic.isOpened(),
            width: width
          });
        }
      },

      _destroy: function() {
        this.emit('destroy');

        this._clearDerivingEvents();

        this._deviceBackButtonHandler.destroy();
        window.removeEventListener('resize', this._boundOnWindowResize);

        this._mainPageGestureDetector.off('tap', this._boundOnTap);
        this._element = this._scope = this._attrs = null;
      },

      _onSwipeableChanged: function(swipeable) {
        swipeable = swipeable === '' || swipeable === undefined || swipeable == 'true';

        this.setSwipeable(swipeable);
      },

      /**
       * @param {Boolean} enabled
       */
      setSwipeable: function(enabled) {
        if (enabled) {
          this._activateGestureDetector();
        } else {
          this._deactivateGestureDetector();
        }
      },

      _onWindowResize: function() {
        this._recalculateMAX();
        this._refreshMenuPageWidth();
      },

      _onMaxSlideDistanceChanged: function() {
        this._recalculateMAX();
        this._refreshMenuPageWidth();
      },

      /**
       * @return {Number}
       */
      _normalizeMaxSlideDistanceAttr: function() {
        var maxDistance = this._attrs.maxSlideDistance;

        if (!('maxSlideDistance' in this._attrs)) {
          maxDistance = 0.9 * this._mainPage[0].clientWidth;
        } else if (typeof maxDistance == 'string') {
          if (maxDistance.indexOf('px', maxDistance.length - 2) !== -1) {
            maxDistance = parseInt(maxDistance.replace('px', ''), 10);
          } else if (maxDistance.indexOf('%', maxDistance.length - 1) > 0) {
            maxDistance = maxDistance.replace('%', '');
            maxDistance = parseFloat(maxDistance) / 100 * this._mainPage[0].clientWidth;
          }
        } else {
          throw new Error('invalid state');
        }

        return maxDistance;
      },

      _recalculateMAX: function() {
        var maxDistance = this._normalizeMaxSlideDistanceAttr();

        if (maxDistance) {
          this._logic.setMaxDistance(parseInt(maxDistance, 10));
        }
      },

      _activateGestureDetector: function(){
        this._gestureDetector.on('touch dragleft dragright swipeleft swiperight release', this._boundHandleEvent);
      },

      _deactivateGestureDetector: function(){
        this._gestureDetector.off('touch dragleft dragright swipeleft swiperight release', this._boundHandleEvent);
      },

      _bindEvents: function() {
        this._gestureDetector = new ons.GestureDetector(this._element[0], {
          dragMinDistance: 1
        });
      },

      _appendMainPage: function(pageUrl, templateHTML) {
        var pageScope = this._scope.$new();
        var pageContent = angular.element(templateHTML);
        var link = $compile(pageContent);

        this._mainPage.append(pageContent);

        if (this._currentPageElement) {
          this._currentPageElement.remove();
          this._currentPageScope.$destroy();
        }

        link(pageScope);

        this._currentPageElement = pageContent;
        this._currentPageScope = pageScope;
        this._currentPageUrl = pageUrl;
        this._currentPageElement[0]._show();
      },

      /**
       * @param {String}
       */
      _appendMenuPage: function(templateHTML) {
        var pageScope = this._scope.$new();
        var pageContent = angular.element(templateHTML);
        var link = $compile(pageContent);

        this._menuPage.append(pageContent);

        if (this._currentMenuPageScope) {
          this._currentMenuPageScope.$destroy();
          this._currentMenuPageElement.remove();
        }

        link(pageScope);

        this._currentMenuPageElement = pageContent;
        this._currentMenuPageScope = pageScope;
      },

      /**
       * @param {String} page
       * @param {Object} options
       * @param {Boolean} [options.closeMenu]
       * @param {Boolean} [options.callback]
       */
      setMenuPage: function(page, options) {
        if (page) {
          options = options || {};
          options.callback = options.callback || function() {};

          var self = this;
          $onsen.getPageHTMLAsync(page).then(function(html) {
            self._appendMenuPage(angular.element(html));
            if (options.closeMenu) {
              self.close();
            }
            options.callback();
          }, function() {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      /**
       * @param {String} pageUrl
       * @param {Object} options
       * @param {Boolean} [options.closeMenu]
       * @param {Boolean} [options.callback]
       */
      setMainPage: function(pageUrl, options) {
        options = options || {};
        options.callback = options.callback || function() {};

        var done = function() {
          if (options.closeMenu) {
            this.close();
          }
          options.callback();
        }.bind(this);

        if (this.currentPageUrl === pageUrl) {
          done();
          return;
        }

        if (pageUrl) {
          var self = this;
          $onsen.getPageHTMLAsync(pageUrl).then(function(html) {
            self._appendMainPage(pageUrl, html);
            done();
          }, function() {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      _handleEvent: function(event) {

        if (this._doorLock.isLocked()) {
          return;
        }

        if (this._isInsideIgnoredElement(event.target)){
          this._deactivateGestureDetector();
        }

        switch (event.type) {
          case 'dragleft':
          case 'dragright':

            if (this._logic.isClosed() && !this._isInsideSwipeTargetArea(event)) {
              return;
            }

            event.gesture.preventDefault();

            var deltaX = event.gesture.deltaX;
            var deltaDistance = this._isRightMenu ? -deltaX : deltaX;

            var startEvent = event.gesture.startEvent;

            if (!('isOpened' in startEvent)) {
              startEvent.isOpened = this._logic.isOpened();
            }

            if (deltaDistance < 0 && this._logic.isClosed()) {
              break;
            }

            if (deltaDistance > 0 && this._logic.isOpened()) {
              break;
            }

            var distance = startEvent.isOpened ?
              deltaDistance + this._logic.getMaxDistance() : deltaDistance;

            this._logic.translate(distance);

            break;

          case 'swipeleft':
            event.gesture.preventDefault();

            if (this._logic.isClosed() && !this._isInsideSwipeTargetArea(event)) {
              return;
            }

            if (this._isRightMenu) {
              this.open();
            } else {
              this.close();
            }

            event.gesture.stopDetect();
            break;

          case 'swiperight':
            event.gesture.preventDefault();

            if (this._logic.isClosed() && !this._isInsideSwipeTargetArea(event)) {
              return;
            }

            if (this._isRightMenu) {
              this.close();
            } else {
              this.open();
            }

            event.gesture.stopDetect();
            break;

          case 'release':
            this._lastDistance = null;

            if (this._logic.shouldOpen()) {
              this.open();
            } else if (this._logic.shouldClose()) {
              this.close();
            }

            break;
        }
      },

      /**
       * @param {jqLite} element
       * @return {Boolean}
       */
      _isInsideIgnoredElement: function(element) {
        do {
          if (element.getAttribute && element.getAttribute('sliding-menu-ignore')) {
            return true;
          }
          element = element.parentNode;
        } while (element);

        return false;
      },

      _isInsideSwipeTargetArea: function(event) {
        var x = event.gesture.center.pageX;

        if (!('_swipeTargetWidth' in event.gesture.startEvent)) {
          event.gesture.startEvent._swipeTargetWidth = this._getSwipeTargetWidth();
        }

        var targetWidth = event.gesture.startEvent._swipeTargetWidth;
        return this._isRightMenu ? this._mainPage[0].clientWidth - x < targetWidth : x < targetWidth;
      },

      _getSwipeTargetWidth: function() {
        var targetWidth = this._attrs.swipeTargetWidth;

        if (typeof targetWidth == 'string') {
          targetWidth = targetWidth.replace('px', '');
        }

        var width = parseInt(targetWidth, 10);
        if (width < 0 || !targetWidth) {
          return this._mainPage[0].clientWidth;
        } else {
          return width;
        }
      },

      closeMenu: function() {
        return this.close.apply(this, arguments);
      },

      /**
       * Close sliding-menu page.
       *
       * @param {Object} options
       */
      close: function(options) {
        options = options || {};
        options = typeof options == 'function' ? {callback: options} : options;

        if (!this._logic.isClosed()) {
          this.emit('preclose', {
            slidingMenu: this
          });

          this._doorLock.waitUnlock(function() {
            this._logic.close(options);
          }.bind(this));
        }
      },

      _close: function(options) {
        var callback = options.callback || function() {},
            unlock = this._doorLock.lock(),
            instant = options.animation == 'none';

        this._animator.closeMenu(function() {
          unlock();

          this._mainPage.children().css('pointer-events', '');
          this._mainPageGestureDetector.off('tap', this._boundOnTap);

          this.emit('postclose', {
            slidingMenu: this
          });

          callback();
        }.bind(this), instant);
      },

      /**
       * Open sliding-menu page.
       *
       * @param {Object} [options]
       * @param {Function} [options.callback]
       */
      openMenu: function() {
        return this.open.apply(this, arguments);
      },

      /**
       * Open sliding-menu page.
       *
       * @param {Object} [options]
       * @param {Function} [options.callback]
       */
      open: function(options) {
        options = options || {};
        options = typeof options == 'function' ? {callback: options} : options;

        this.emit('preopen', {
          slidingMenu: this
        });

        this._doorLock.waitUnlock(function() {
          this._logic.open(options);
        }.bind(this));
      },

      _open: function(options) {
        var callback = options.callback || function() {},
            unlock = this._doorLock.lock(),
            instant = options.animation == 'none';

        this._animator.openMenu(function() {
          unlock();

          this._mainPage.children().css('pointer-events', 'none');
          this._mainPageGestureDetector.on('tap', this._boundOnTap);

          this.emit('postopen', {
            slidingMenu: this
          });

          callback();
        }.bind(this), instant);
      },

      /**
       * Toggle sliding-menu page.
       * @param {Object} [options]
       * @param {Function} [options.callback]
       */
      toggle: function(options) {
        if (this._logic.isClosed()) {
          this.open(options);
        } else {
          this.close(options);
        }
      },

      /**
       * Toggle sliding-menu page.
       */
      toggleMenu: function() {
        return this.toggle.apply(this, arguments);
      },

      /**
       * @return {Boolean}
       */
      isMenuOpened: function() {
        return this._logic.isOpened();
      },

      /**
       * @param {Object} event
       */
      _translate: function(event) {
        this._animator.translateMenu(event);
      }
    });

    // Preset sliding menu animators.
    SlidingMenuView._animatorDict = {
      'default': RevealSlidingMenuAnimator,
      'overlay': OverlaySlidingMenuAnimator,
      'reveal': RevealSlidingMenuAnimator,
      'push': PushSlidingMenuAnimator
    };

    /**
     * @param {String} name
     * @param {Function} Animator
     */
    SlidingMenuView.registerAnimator = function(name, Animator) {
      if (!(Animator.prototype instanceof SlidingMenuAnimator)) {
        throw new Error('"Animator" param must inherit SlidingMenuAnimator');
      }

      this._animatorDict[name] = Animator;
    };

    MicroEvent.mixin(SlidingMenuView);

    return SlidingMenuView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.factory('SlidingMenuAnimator', function() {
    return Class.extend({

      delay: 0,
      duration: 0.4,
      timing: 'cubic-bezier(.1, .7, .1, 1)',

      /**
       * @param {Object} options
       * @param {String} options.timing
       * @param {Number} options.duration
       * @param {Number} options.delay
       */
      init: function(options) {
        options = options || {};

        this.timing = options.timing || this.timing;
        this.duration = options.duration !== undefined ? options.duration : this.duration;
        this.delay = options.delay !== undefined ? options.delay : this.delay;
      },

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Object} options
       * @param {String} options.width "width" style value
       * @param {Boolean} options.isRight
       */
      setup: function(element, mainPage, menuPage, options) {
      },

      /**
       * @param {Object} options
       * @param {Boolean} options.isRight
       * @param {Boolean} options.isOpened
       * @param {String} options.width
       */
      onResized: function(options) {
      },

      /**
       * @param {Function} callback
       */
      openMenu: function(callback) {
      },

      /**
       * @param {Function} callback
       */
      closeClose: function(callback) {
      },

      /**
       */
      destroy: function() {
      },

      /**
       * @param {Object} options
       * @param {Number} options.distance
       * @param {Number} options.maxDistance
       */
      translateMenu: function(mainPage, menuPage, options) {
      },

      /**
       * @return {SlidingMenuAnimator}
       */
      copy: function() {
        throw new Error('Override copy method.');
      }
    });
  });
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
(function() {
  'use strict';
  var module = angular.module('onsen');

  module.factory('SplitView', ['$compile', 'RevealSlidingMenuAnimator', '$onsen', '$onsGlobal', function($compile, RevealSlidingMenuAnimator, $onsen, $onsGlobal) {
    var SPLIT_MODE = 0;
    var COLLAPSE_MODE = 1;
    var MAIN_PAGE_RATIO = 0.9;

    var SplitView = Class.extend({

      init: function(scope, element, attrs) {
        element.addClass('onsen-sliding-menu');

        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._mainPage = angular.element(element[0].querySelector('.onsen-split-view__main'));
        this._secondaryPage = angular.element(element[0].querySelector('.onsen-split-view__secondary'));

        this._max = this._mainPage[0].clientWidth * MAIN_PAGE_RATIO;
        this._mode = SPLIT_MODE;
        this._doorLock = new DoorLock();

        this._doSplit = false;
        this._doCollapse = false;

        $onsGlobal.orientation.on('change', this._onResize.bind(this));

        this._animator = new RevealSlidingMenuAnimator();

        this._element.css('display', 'none');

        if (attrs.mainPage) {
          this.setMainPage(attrs.mainPage);
        }

        if (attrs.secondaryPage) {
          this.setSecondaryPage(attrs.secondaryPage);
        }

        var unlock = this._doorLock.lock();

        this._considerChangingCollapse();
        this._setSize();

        setTimeout(function() {
          this._element.css('display', 'block');
          unlock();
        }.bind(this), 1000 / 60 * 2);

        scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['init', 'show', 'hide', 'destroy']);
      },

      /**
       * @param {String} templateHTML
       */
      _appendSecondPage: function(templateHTML) {
        var pageScope = this._scope.$new();
        var pageContent = $compile(templateHTML)(pageScope);

        this._secondaryPage.append(pageContent);

        if (this._currentSecondaryPageElement) {
          this._currentSecondaryPageElement.remove();
          this._currentSecondaryPageScope.$destroy();
        }

        this._currentSecondaryPageElement = pageContent;
        this._currentSecondaryPageScope = pageScope;
      },

      /**
       * @param {String} templateHTML
       */
      _appendMainPage: function(templateHTML) {
        var pageScope = this._scope.$new();
        var pageContent = $compile(templateHTML)(pageScope);

        this._mainPage.append(pageContent);

        if (this._currentPage) {
          this._currentPageScope.$destroy();
        }

        this._currentPage = pageContent;
        this._currentPageScope = pageScope;
        this._currentPage[0]._show();
      },

      /**
       * @param {String} page
       */
      setSecondaryPage : function(page) {
        if (page) {
          $onsen.getPageHTMLAsync(page).then(function(html) {
            this._appendSecondPage(angular.element(html.trim()));
          }.bind(this), function() {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      /**
       * @param {String} page
       */
      setMainPage : function(page) {
        if (page) {
          $onsen.getPageHTMLAsync(page).then(function(html) {
            this._appendMainPage(angular.element(html.trim()));
          }.bind(this), function() {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      _onResize: function() {
        var lastMode = this._mode;

        this._considerChangingCollapse();

        if (lastMode === COLLAPSE_MODE && this._mode === COLLAPSE_MODE) {
          this._animator.onResized({
            isOpened: false,
            width: '90%'
          });
        }

        this._max = this._mainPage[0].clientWidth * MAIN_PAGE_RATIO;
      },

      _considerChangingCollapse: function() {
        var should = this._shouldCollapse();

        if (should && this._mode !== COLLAPSE_MODE) {
          this._fireUpdateEvent();
          if (this._doSplit) {
            this._activateSplitMode();
          } else {
            this._activateCollapseMode();
          }
        } else if (!should && this._mode === COLLAPSE_MODE) {
          this._fireUpdateEvent();
          if (this._doCollapse) {
            this._activateCollapseMode();
          } else {
            this._activateSplitMode();
          }
        }

        this._doCollapse = this._doSplit = false;
      },

      update: function() {
        this._fireUpdateEvent();

        var should = this._shouldCollapse();

        if (this._doSplit) {
          this._activateSplitMode(); 
        } else if (this._doCollapse) {
          this._activateCollapseMode(); 
        } else if (should) {
          this._activateCollapseMode();
        } else if (!should) {
          this._activateSplitMode();
        }

        this._doSplit = this._doCollapse = false;
      },

      _getOrientation: function() {
        if ($onsGlobal.orientation.isPortrait()) {
          return 'portrait';
        } else {
          return 'landscape';
        }
      },

      getCurrentMode: function() {
        if (this._mode === COLLAPSE_MODE) {
          return 'collapse';
        } else {
          return 'split';
        }
      },

      _shouldCollapse: function() {
        var c = 'portrait';
        if (typeof this._attrs.collapse === 'string') {
          c = this._attrs.collapse.trim();
        }

        if (c == 'portrait') {
          return $onsGlobal.orientation.isPortrait();
        } else if (c == 'landscape') {
          return $onsGlobal.orientation.isLandscape();
        } else if (c.substr(0,5) == 'width') {
          var num = c.split(' ')[1];
          if (num.indexOf('px') >= 0) {
            num = num.substr(0,num.length-2);
          }

          var width = window.innerWidth;

          return isNumber(num) && width < num;
        } else {
          var mq = window.matchMedia(c);
          return mq.matches;
        }
      },

      _setSize: function() {
        if (this._mode === SPLIT_MODE) {
          if (!this._attrs.mainPageWidth) {
            this._attrs.mainPageWidth = '70';
          }

          var secondarySize = 100 - this._attrs.mainPageWidth.replace('%', '');
          this._secondaryPage.css({
            width: secondarySize + '%',
            opacity: 1
          });

          this._mainPage.css({
            width: this._attrs.mainPageWidth + '%'
          });

          this._mainPage.css('left', secondarySize + '%');
        }
      },

      _fireEvent: function(name) {
        this.emit(name, {
          splitView: this,
          width: window.innerWidth,
          orientation: this._getOrientation() 
        });
      },

      _fireUpdateEvent: function() {
        var that = this;

        this.emit('update', {
          splitView: this,
          shouldCollapse: this._shouldCollapse(),
          currentMode: this.getCurrentMode(),
          split: function() {
            that._doSplit = true;
            that._doCollapse = false;
          },
          collapse: function() {
            that._doSplit = false;
            that._doCollapse = true;
          },
          width: window.innerWidth,
          orientation: this._getOrientation()
        }); 
      },

      _activateCollapseMode: function() {
        if (this._mode !== COLLAPSE_MODE) {
          this._fireEvent('precollapse');
       
          this._secondaryPage.attr('style', '');
          this._mainPage.attr('style', '');

          this._mode = COLLAPSE_MODE;

          this._animator.setup(
            this._element,
            this._mainPage,
            this._secondaryPage,
            {isRight: false, width: '90%'}
          );

          this._fireEvent('postcollapse');
        }
      },

      _activateSplitMode: function() {
        if (this._mode !== SPLIT_MODE) {
          this._fireEvent('presplit');

          this._animator.destroy();

          this._secondaryPage.attr('style', '');
          this._mainPage.attr('style', '');

          this._mode = SPLIT_MODE;
          this._setSize();
       
          this._fireEvent('postsplit');
        }
      },

      _destroy: function() {
        this.emit('destroy');

        this._clearDerivingEvents();

        this._element = null;
        this._scope = null;
      }
    });

    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    MicroEvent.mixin(SplitView);

    return SplitView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
(function() {
  'use strict';

  angular.module('onsen').factory('SplitterContent', ['$onsen', '$compile', function($onsen, $compile) {

    var SplitterContent = Class.extend({

      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], [
          'load'
        ]);

        scope.$on('$destroy', this._destroy.bind(this));
      },

      _link: function(fragment, done) {
        
        var link = $compile(fragment);
        var pageScope = this._createPageScope();
        link(pageScope);

        pageScope.$evalAsync(function() {
          done(fragment);
        });
      },

      _createPageScope: function() {
         return this._scope.$new();
      },

      _destroy: function() {
        this.emit('destroy');

        this._clearDerivingMethods();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(SplitterContent);

    Object.defineProperty(SplitterContent.prototype, 'page', {
      get: function () {
        return this._element[0].page;
      },
      set: function() {
        throw new Error();
      }
    });

    return SplitterContent;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
(function() {
  'use strict';

  angular.module('onsen').factory('SplitterSide', ['$onsen', '$compile', function($onsen, $compile) {

    var SplitterSide = Class.extend({

      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], [
          'isSwipeable',
          'getCurrentMode',
          'isOpened',
          'open',
          'close',
          'toggle',
          'load',
        ]);

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], [
          'modechange', 'preopen', 'preclose', 'postopen', 'postclose'
        ], function(detail) {
          if (detail.side) {
            detail.side = this;
          }
          return detail;
        }.bind(this));

        scope.$on('$destroy', this._destroy.bind(this));
      },

      _link: function(fragment, done) {
        
        var link = $compile(fragment);
        var pageScope = this._createPageScope();
        link(pageScope);

        pageScope.$evalAsync(function() {
          done(fragment);
        });
      },

      _createPageScope: function() {
         return this._scope.$new();
      },

      _destroy: function() {
        this.emit('destroy');

        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(SplitterSide);

    Object.defineProperty(SplitterSide.prototype, 'page', {
      get: function () {
        return this._element[0].page;
      },
      set: function() {
        throw new Error();
      }
    });

    return SplitterSide;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
(function() {
  'use strict';

  angular.module('onsen').factory('Splitter', ['$onsen', function($onsen) {

    var Splitter = Class.extend({

      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], [
          'getDeviceBackButtonHandler',
          'openRight',
          'openLeft',
          'closeRight',
          'closeLeft',
          'toggleRight',
          'toggleLeft',
          'rightIsOpened',
          'leftIsOpened',
          'loadContentPage'
        ]);

        scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function() {
        this.emit('destroy');

        this._clearDerivingMethods();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(Splitter);

    return Splitter;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';

  angular.module('onsen').factory('SwitchView', ['$parse', '$onsen', function($parse, $onsen) {

    var SwitchView = Class.extend({

      /**
       * @param {jqLite} element
       * @param {Object} scope
       * @param {Object} attrs
       */
      init: function(element, scope, attrs) {
        this._element = element;
        this._checkbox = angular.element(element[0].querySelector('input[type=checkbox]'));
        this._scope = scope;

        this._checkbox.on('change', function() {
          this.emit('change', {'switch': this, value: this._checkbox[0].checked, isInteractive: true});
        }.bind(this));

        this._prepareNgModel(element, scope, attrs);

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], [
          'isChecked',
          'setChecked',
          'getCheckboxElement'
        ]);
      },

      _prepareNgModel: function(element, scope, attrs) {
        if (attrs.ngModel) {
          var set = $parse(attrs.ngModel).assign;

          scope.$parent.$watch(attrs.ngModel, function(value) {
            this.setChecked(!!value);
          }.bind(this));

          this._checkbox.on('change', function(e) {
            set(scope.$parent, this.isChecked());

            if (attrs.ngChange) {
              scope.$eval(attrs.ngChange);
            }

            scope.$parent.$evalAsync();
          }.bind(this));
        }
      },

      _destroy: function() {
        this.emit('destroy');
        this._clearDerivingMethods();
        this._element = this._checkbox = this._scope = null;
      }
    });
    MicroEvent.mixin(SwitchView);

    return SwitchView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.value('TabbarNoneAnimator', ons._internal.TabbarNoneAnimator);
  module.value('TabbarFadeAnimator', ons._internal.TabbarFadeAnimator);
  module.value('TabbarSlideAnimator', ons._internal.TabbarSlideAnimator);

  module.factory('TabbarView', ['$onsen', '$compile', '$parse', function($onsen, $compile, $parse) {
    var TabbarView = Class.extend({

      init: function(scope, element, attrs) {
        if (element[0].nodeName.toLowerCase() !== 'ons-tabbar') {
          throw new Error('"element" parameter must be a "ons-tabbar" element.');
        }

        this._scope = scope;
        this._element = element;
        this._attrs = attrs;
        this._lastPageElement = null;
        this._lastPageScope = null;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], [
          'reactive', 'postchange', 'prechange', 'init', 'show', 'hide', 'destroy'
        ]);

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], [
          'setActiveTab',
          'setTabbarVisibility',
          'getActiveTabIndex',
          'loadPage'
        ]);

      },

      _compileAndLink: function(pageElement, callback) {
        var link = $compile(pageElement);
        var pageScope = this._scope.$new();
        link(pageScope);

        pageScope.$evalAsync(function() {
          callback(pageElement);
        });
      },

      _destroy: function() {
        this.emit('destroy');

        this._clearDerivingEvents();
        this._clearDerivingMethods();

        this._element = this._scope = this._attrs = null;
      }
    });
    MicroEvent.mixin(TabbarView);

    TabbarView.registerAnimator = function(name, Animator) {
      return window.OnsTabbarElement.registerAnimator(name, Animator);
    };

    return TabbarView;
  }]);

})();


/**
 * @ngdoc directive
 * @id alert-dialog
 * @name ons-alert-dialog
 * @category dialog
 * @modifier android
 *   [en]Display an Android style alert dialog.[/en]
 *   [ja]Androidライクなスタイルを表示します。[/ja]
 * @description
 *   [en]Alert dialog that is displayed on top of the current screen.[/en]
 *   [ja]現在のスクリーンにアラートダイアログを表示します。[/ja]
 * @codepen Qwwxyp
 * @guide UsingAlert
 *   [en]Learn how to use the alert dialog.[/en]
 *   [ja]アラートダイアログの使い方の解説。[/ja]
 * @seealso ons-dialog
 *   [en]ons-dialog component[/en]
 *   [ja]ons-dialogコンポーネント[/ja]
 * @seealso ons-popover
 *   [en]ons-popover component[/en]
 *   [ja]ons-dialogコンポーネント[/ja]
 * @seealso ons.notification
 *   [en]Using ons.notification utility functions.[/en]
 *   [ja]アラートダイアログを表示するには、ons.notificationオブジェクトのメソッドを使うこともできます。[/ja]
 * @example
 * <script>
 *   ons.ready(function() {
 *     ons.createAlertDialog('alert.html').then(function(alertDialog) {
 *       alertDialog.show();
 *     });
 *   });
 * </script>
 *
 * <script type="text/ons-template" id="alert.html">
 *   <ons-alert-dialog animation="default" cancelable>
 *     <div class="alert-dialog-title">Warning!</div>
 *     <div class="alert-dialog-content">
 *       An error has occurred!
 *     </div>
 *     <div class="alert-dialog-footer">
 *       <button class="alert-dialog-button">OK</button>
 *     </div>
 *   </ons-alert-dialog>
 * </script>
 */

/**
 * @ngdoc event
 * @name preshow
 * @description
 *   [en]Fired just before the alert dialog is displayed.[/en]
 *   [ja]アラートダイアログが表示される直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.alertDialog
 *   [en]Alert dialog object.[/en]
 *   [ja]アラートダイアログのオブジェクト。[/ja]
 * @param {Function} event.cancel
 *   [en]Execute to stop the dialog from showing.[/en]
 *   [ja]この関数を実行すると、アラートダイアログの表示を止めます。[/ja]
 */

/**
 * @ngdoc event
 * @name postshow
 * @description
 *   [en]Fired just after the alert dialog is displayed.[/en]
 *   [ja]アラートダイアログが表示された直後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.alertDialog
 *   [en]Alert dialog object.[/en]
 *   [ja]アラートダイアログのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name prehide
 * @description
 *   [en]Fired just before the alert dialog is hidden.[/en]
 *   [ja]アラートダイアログが隠れる直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.alertDialog
 *   [en]Alert dialog object.[/en]
 *   [ja]アラートダイアログのオブジェクト。[/ja]
 * @param {Function} event.cancel
 *   [en]Execute to stop the dialog from hiding.[/en]
 *   [ja]この関数を実行すると、アラートダイアログが閉じようとするのを止めます。[/ja]
 */

/**
 * @ngdoc event
 * @name posthide
 * @description
 * [en]Fired just after the alert dialog is hidden.[/en]
 * [ja]アラートダイアログが隠れた後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.alertDialog
 *   [en]Alert dialog object.[/en]
 *   [ja]アラートダイアログのオブジェクト。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @extensionOf angular
 * @type {String}
 * @description
 *  [en]Variable name to refer this alert dialog.[/en]
 *  [ja]このアラートダイアログを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *  [en]The appearance of the dialog.[/en]
 *  [ja]ダイアログの見た目を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name cancelable
 * @description
 *  [en]If this attribute is set the dialog can be closed by tapping the background or by pressing the back button.[/en]
 *  [ja]この属性があると、ダイアログが表示された時に、背景やバックボタンをタップした時にダイアログを閉じます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *  [en]If this attribute is set the dialog is disabled.[/en]
 *  [ja]この属性がある時、アラートダイアログはdisabled状態になります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @default default
 * @description
 *  [en]The animation used when showing and hiding the dialog. Can be either "none" or "default".[/en]
 *  [ja]ダイアログを表示する際のアニメーション名を指定します。デフォルトでは"none"か"default"が指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation-options
 * @type {Expression}
 * @description
 *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/en]
 *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/ja]
 */


/**
 * @ngdoc attribute
 * @name mask-color
 * @type {String}
 * @default rgba(0, 0, 0, 0.2)
 * @description
 *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)".[/en]
 *  [ja]背景のマスクの色を指定します。"rgba(0, 0, 0, 0.2)"がデフォルト値です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preshow
 * @initonly
 * @type {Expression}
 * @extensionOf angular
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prehide
 * @initonly
 * @type {Expression}
 * @extensionOf angular
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postshow
 * @initonly
 * @type {Expression}
 * @extensionOf angular
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-posthide
 * @initonly
 * @type {Expression}
 * @extensionOf angular
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @initonly
 * @type {Expression}
 * @extensionOf angular
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature show([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクトです。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "fade", "slide" and "none".[/en]
 *   [ja]アニメーション名を指定します。指定できるのは、"fade", "slide", "none"のいずれかです。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @param {Function} [options.callback]
 *   [en]Function to execute after the dialog has been revealed.[/en]
 *   [ja]ダイアログが表示され終わった時に呼び出されるコールバックを指定します。[/ja]
 * @description
 *   [en]Show the alert dialog.[/en]
 *   [ja]ダイアログを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature hide([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "fade", "slide" and "none".[/en]
 *   [ja]アニメーション名を指定します。"fade", "slide", "none"のいずれかを指定します。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @param {Function} [options.callback]
 *   [en]Function to execute after the dialog has been hidden.[/en]
 *   [ja]このダイアログが閉じた時に呼び出されるコールバックを指定します。[/ja]
 * @description
 *   [en]Hide the alert dialog.[/en]
 *   [ja]ダイアログを閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature isShown()
 * @description
 *   [en]Returns whether the dialog is visible or not.[/en]
 *   [ja]ダイアログが表示されているかどうかを返します。[/ja]
 * @return {Boolean}
 *   [en]true if the dialog is currently visible.[/en]
 *   [ja]ダイアログが表示されていればtrueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature destroy()
 * @description
 *   [en]Destroy the alert dialog and remove it from the DOM tree.[/en]
 *   [ja]ダイアログを破棄して、DOMツリーから取り除きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setCancelable(cancelable)
 * @description
 *   [en]Define whether the dialog can be canceled by the user or not.[/en]
 *   [ja]アラートダイアログを表示した際に、ユーザがそのダイアログをキャンセルできるかどうかを指定します。[/ja]
 * @param {Boolean} cancelable
 *   [en]If true the dialog will be cancelable.[/en]
 *   [ja]キャンセルできるかどうかを真偽値で指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isCancelable()
 * @description
 *   [en]Returns whether the dialog is cancelable or not.[/en]
 *   [ja]このアラートダイアログがキャンセル可能かどうかを返します。[/ja]
 * @return {Boolean}
 *   [en]true if the dialog is cancelable.[/en]
 *   [ja]キャンセル可能であればtrueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @description
 *   [en]Disable or enable the alert dialog.[/en]
 *   [ja]このアラートダイアログをdisabled状態にするかどうかを設定します。[/ja]
 * @param {Boolean} disabled
 *   [en]If true the dialog will be disabled.[/en]
 *   [ja]disabled状態にするかどうかを真偽値で指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @description
 *   [en]Returns whether the dialog is disabled or enabled.[/en]
 *   [ja]このアラートダイアログがdisabled状態かどうかを返します。[/ja]
 * @return {Boolean}
 *   [en]true if the dialog is disabled.[/en]
 *   [ja]disabled状態であればtrueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @extensionOf angular
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火された際に呼び出されるコールバックを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @extensionOf angular
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出されるコールバックを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @extensionOf angular
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしlistenerパラメータが指定されなかった場合、そのイベントのリスナーが全て削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーの関数オブジェクトを渡します。[/ja]
 */

(function() {
  'use strict';

  /**
   * Alert dialog directive.
   */
  angular.module('onsen').directive('onsAlertDialog', ['$onsen', 'AlertDialogView', function($onsen, AlertDialogView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      transclude: false,

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);

        return {
          pre: function(scope, element, attrs) {
            CustomElements.upgrade(element[0]);
            var alertDialog = new AlertDialogView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, alertDialog);
            $onsen.registerEventHandlers(alertDialog, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethodsForCustomElements(alertDialog, element);

            element.data('ons-alert-dialog', alertDialog);

            scope.$on('$destroy', function() {
              alertDialog._events = undefined;
              $onsen.removeModifierMethods(alertDialog);
              element.data('ons-alert-dialog', undefined);
              element = null;
            });
          },
          post: function(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);

})();

/**
 * @ngdoc directive
 * @id back_button
 * @name ons-back-button
 * @category page
 * @description
 *   [en]Back button component for ons-toolbar. Can be used with ons-navigator to provide back button support.[/en]
 *   [ja]ons-toolbarに配置できる「戻るボタン」用コンポーネントです。ons-navigatorと共に使用し、ページを1つ前に戻る動作を行います。[/ja]
 * @codepen aHmGL
 * @seealso ons-toolbar 
 *   [en]ons-toolbar component[/en]
 *   [ja]ons-toolbarコンポーネント[/ja]
 * @seealso ons-navigator
 *   [en]ons-navigator component[/en]
 *   [ja]ons-navigatorコンポーネント[/en]
 * @guide Addingatoolbar 
 *   [en]Adding a toolbar[/en]
 *   [ja]ツールバーの追加[/ja]
 * @guide Returningfromapage 
 *   [en]Returning from a page[/en]
 *   [ja]一つ前のページに戻る[/ja]
 * @example
 * <ons-back-button>
 *   Back
 * </ons-back-button>
 */
(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsBackButton', ['$onsen', '$compile', 'GenericView', 'ComponentCleaner', function($onsen, $compile, GenericView, ComponentCleaner) {
    return {
      restrict: 'E',
      replace: false,

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);

        return {
          pre: function(scope, element, attrs, controller, transclude) {
            CustomElements.upgrade(element[0]);
            var backButton = GenericView.register(scope, element, attrs, {
              viewKey: 'ons-back-button'
            });

            scope.$on('$destroy', function() {
              backButton._events = undefined;
              $onsen.removeModifierMethods(backButton);
              element = null;
            });

            ComponentCleaner.onDestroy(scope, function() {
              ComponentCleaner.destroyScope(scope);
              ComponentCleaner.destroyAttributes(attrs);
              element = scope = attrs = null;
            });
          },
          post: function(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id bottom_toolbar
 * @name ons-bottom-toolbar
 * @category page
 * @description
 *   [en]Toolbar component that is positioned at the bottom of the page.[/en]
 *   [ja]ページ下部に配置されるツールバー用コンポーネントです。[/ja]
 * @modifier transparent
 *   [en]Make the toolbar transparent.[/en]
 *   [ja]ツールバーの背景を透明にして表示します。[/ja]
 * @seealso ons-toolbar [en]ons-toolbar component[/en][ja]ons-toolbarコンポーネント[/ja]
 * @guide Addingatoolbar
 *   [en]Adding a toolbar[/en]
 *   [ja]ツールバーの追加[/ja]
 * @example
 * <ons-bottom-toolbar>
 *   <div style="text-align: center; line-height: 44px">Text</div>
 * </ons-bottom-toolbar>
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]The appearance of the toolbar.[/en]
 *   [ja]ツールバーの見た目の表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name inline
 * @initonly
 * @description
 *   [en]Display the toolbar as an inline element.[/en]
 *   [ja]この属性があると、ツールバーを画面下部ではなくスクロール領域内にそのまま表示します。[/ja]
 */

(function(){
  'use strict';

  angular.module('onsen').directive('onsBottomToolbar', ['$onsen', 'GenericView', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: {
        pre: function(scope, element, attrs) {
          CustomElements.upgrade(element[0]);
          GenericView.register(scope, element, attrs, {
            viewKey: 'ons-bottomToolbar'
          });

          var inline = typeof attrs.inline !== 'undefined';
          var pageView = element.inheritedData('ons-page');

          if (pageView && !inline) {
            pageView._element[0]._registerBottomToolbar(element[0]);
          }
        },

        post: function(scope, element, attrs) {
          $onsen.fireComponentEvent(element[0], 'init');
        }
      }
    };
  }]);

})();


/**
 * @ngdoc directive
 * @id button
 * @name ons-button
 * @category form
 * @modifier outline
 *   [en]Button with outline and transparent background[/en]
 *   [ja]アウトラインを持ったボタンを表示します。[/ja]
 * @modifier light
 *   [en]Button that doesn't stand out.[/en]
 *   [ja]目立たないボタンを表示します。[/ja]
 * @modifier quiet
 *   [en]Button with no outline and or background..[/en]
 *   [ja]枠線や背景が無い文字だけのボタンを表示します。[/ja]
 * @modifier cta
 *   [en]Button that really stands out.[/en]
 *   [ja]目立つボタンを表示します。[/ja]
 * @modifier large
 *   [en]Large button that covers the width of the screen.[/en]
 *   [ja]横いっぱいに広がる大きなボタンを表示します。[/ja]
 * @modifier large--quiet
 *   [en]Large quiet button.[/en]
 *   [ja]横いっぱいに広がるquietボタンを表示します。[/ja]
 * @modifier large--cta
 *   [en]Large call to action button.[/en]
 *   [ja]横いっぱいに広がるctaボタンを表示します。[/ja]
 * @description
 *   [en]Button component. If you want to place a button in a toolbar, use ons-toolbar-button or ons-back-button instead.[/en]
 *   [ja]ボタン用コンポーネント。ツールバーにボタンを設置する場合は、ons-toolbar-buttonもしくはons-back-buttonコンポーネントを使用します。[/ja]
 * @codepen hLayx
 * @guide Button [en]Guide for ons-button[/en][ja]ons-buttonの使い方[/ja]
 * @guide OverridingCSSstyles [en]More details about modifier attribute[/en][ja]modifier属性の使い方[/ja]
 * @example
 * <ons-button modifier="large--cta">
 *   Tap Me
 * </ons-button>
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *  [en]The appearance of the button.[/en]
 *  [ja]ボタンの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]Specify if button should be disabled.[/en]
 *   [ja]ボタンを無効化する場合は指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @description
 *   [en]Disable or enable the button.[/en]
 *   [ja]このボタンをdisabled状態にするかどうかを設定します。[/ja]
 * @param {String} disabled
 *   [en]If true the button will be disabled.[/en]
 *   [ja]disabled状態にするかどうかを真偽値で指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @return {Boolean}
 *   [en]true if the button is disabled.[/en]
 *   [ja]ボタンがdisabled状態になっているかどうかを返します。[/ja]
 * @description
 *   [en]Returns whether the button is disabled or enabled.[/en]
 *   [ja]このボタンがdisabled状態かどうかを返します。[/ja]
 */

(function(){
  'use strict';

  angular.module('onsen').directive('onsButton', ['$onsen', 'GenericView', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        var button = GenericView.register(scope, element, attrs, {
          viewKey: 'ons-button'
        });

        /**
         * Returns whether the button is disabled or not.
         */
        button.isDisabled = function() {
          return this._element[0].hasAttribute('disabled');
        };

        /**
         * Disabled or enable button.
         */
        button.setDisabled = function(disabled) {
          if (disabled) {
            this._element[0].setAttribute('disabled', '');
          } else {
            this._element[0].removeAttribute('disabled');
          }
        };

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);



})();

/**
 * @ngdoc directive
 * @id carousel
 * @name ons-carousel
 * @category carousel
 * @description
 *   [en]Carousel component.[/en]
 *   [ja]カルーセルを表示できるコンポーネント。[/ja]
 * @codepen xbbzOQ
 * @guide UsingCarousel
 *   [en]Learn how to use the carousel component.[/en]
 *   [ja]carouselコンポーネントの使い方[/ja]
 * @example
 * <ons-carousel style="width: 100%; height: 200px">
 *   <ons-carousel-item>
 *    ...
 *   </ons-carousel-item>
 *   <ons-carousel-item>
 *    ...
 *   </ons-carousel-item>
 * </ons-carousel>
 */

/**
 * @ngdoc event
 * @name postchange
 * @description
 *   [en]Fired just after the current carousel item has changed.[/en]
 *   [ja]現在表示しているカルーセルの要素が変わった時に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.carousel
 *   [en]Carousel object.[/en]
 *   [ja]イベントが発火したCarouselオブジェクトです。[/ja]
 * @param {Number} event.activeIndex
 *   [en]Current active index.[/en]
 *   [ja]現在アクティブになっている要素のインデックス。[/ja]
 * @param {Number} event.lastActiveIndex
 *   [en]Previous active index.[/en]
 *   [ja]以前アクティブだった要素のインデックス。[/ja]
 */

/**
 * @ngdoc event
 * @name refresh
 * @description
 *   [en]Fired when the carousel has been refreshed.[/en]
 *   [ja]カルーセルが更新された時に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.carousel
 *   [en]Carousel object.[/en]
 *   [ja]イベントが発火したCarouselオブジェクトです。[/ja]
 */

/**
 * @ngdoc event
 * @name overscroll
 * @description
 *   [en]Fired when the carousel has been overscrolled.[/en]
 *   [ja]カルーセルがオーバースクロールした時に発火します。[/ja]
 * @param {Object} event 
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.carousel
 *   [en]Fired when the carousel has been refreshed.[/en]
 *   [ja]カルーセルが更新された時に発火します。[/ja]
 * @param {Number} event.activeIndex
 *   [en]Current active index.[/en]
 *   [ja]現在アクティブになっている要素のインデックス。[/ja]
 * @param {String} event.direction
 *   [en]Can be one of either "up", "down", "left" or "right".[/en]
 *   [ja]オーバースクロールされた方向が得られます。"up", "down", "left", "right"のいずれかの方向が渡されます。[/ja]
 * @param {Function} event.waitToReturn
 *   [en]Takes a <code>Promise</code> object as an argument. The carousel will not scroll back until the promise has been resolved or rejected.[/en]
 *   [ja]この関数はPromiseオブジェクトを引数として受け取ります。渡したPromiseオブジェクトがresolveされるかrejectされるまで、カルーセルはスクロールバックしません。[/ja]
 */

/**
 * @ngdoc attribute
 * @name direction
 * @type {String}
 * @description
 *   [en]The direction of the carousel. Can be either "horizontal" or "vertical". Default is "horizontal".[/en]
 *   [ja]カルーセルの方向を指定します。"horizontal"か"vertical"を指定できます。"horizontal"がデフォルト値です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name fullscreen
 * @description
 *   [en]If this attribute is set the carousel will cover the whole screen.[/en]
 *   [ja]この属性があると、absoluteポジションを使ってカルーセルが自動的に画面いっぱいに広がります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @type {String}
 * @extensionOf angular
 * @description
 *   [en]Variable name to refer this carousel.[/en]
 *   [ja]このカルーセルを参照するための変数名を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name overscrollable
 * @description
 *   [en]If this attribute is set the carousel will be scrollable over the edge. It will bounce back when released.[/en]
 *   [ja]この属性がある時、タッチやドラッグで端までスクロールした時に、バウンドするような効果が当たります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name item-width
 * @type {String}
 * @description
 *    [en]ons-carousel-item's width. Only works when the direction is set to "horizontal".[/en]
 *    [ja]ons-carousel-itemの幅を指定します。この属性は、direction属性に"horizontal"を指定した時のみ有効になります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name item-height
 * @type {String}
 * @description
 *   [en]ons-carousel-item's height. Only works when the direction is set to "vertical".[/en]
 *   [ja]ons-carousel-itemの高さを指定します。この属性は、direction属性に"vertical"を指定した時のみ有効になります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name auto-scroll
 * @description
 *   [en]If this attribute is set the carousel will be automatically scrolled to the closest item border when released.[/en]
 *   [ja]この属性がある時、一番近いcarousel-itemの境界まで自動的にスクロールするようになります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name auto-scroll-ratio
 * @type {Number}
 * @description
 *    [en]A number between 0.0 and 1.0 that specifies how much the user must drag the carousel in order for it to auto scroll to the next item.[/en]
 *    [ja]0.0から1.0までの値を指定します。カルーセルの要素をどれぐらいの割合までドラッグすると次の要素に自動的にスクロールするかを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name swipeable
 * @description
 *   [en]If this attribute is set the carousel can be scrolled by drag or swipe.[/en]
 *   [ja]この属性がある時、カルーセルをスワイプやドラッグで移動できるようになります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]If this attribute is set the carousel is disabled.[/en]
 *   [ja]この属性がある時、dragやtouchやswipeを受け付けなくなります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name initial-index
 * @initonly
 * @type {Number}
 * @description
 *   [en]Specify the index of the ons-carousel-item to show initially. Default is 0.[/en]
 *   [ja]最初に表示するons-carousel-itemを0始まりのインデックスで指定します。デフォルト値は 0 です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name auto-refresh
 * @description
 *   [en]When this attribute is set the carousel will automatically refresh when the number of child nodes change.[/en]
 *   [ja]この属性がある時、子要素の数が変わるとカルーセルは自動的に更新されるようになります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postchange
 * @initonly
 * @type {Expression}
 * @extensionOf angular
 * @description
 *  [en]Allows you to specify custom behavior when the "postchange" event is fired.[/en]
 *  [ja]"postchange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-refresh
 * @initonly
 * @type {Expression}
 * @extensionOf angular
 * @description
 *  [en]Allows you to specify custom behavior when the "refresh" event is fired.[/en]
 *  [ja]"refresh"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-overscroll
 * @initonly
 * @type {Expression}
 * @extensionOf angular
 * @description
 *  [en]Allows you to specify custom behavior when the "overscroll" event is fired.[/en]
 *  [ja]"overscroll"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @initonly
 * @type {Expression}
 * @extensionOf angular
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature next()
 * @description
 *   [en]Show next ons-carousel item.[/en]
 *   [ja]次のons-carousel-itemを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature prev()
 * @description
 *   [en]Show previous ons-carousel item.[/en]
 *   [ja]前のons-carousel-itemを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature first()
 * @description
 *   [en]Show first ons-carousel item.[/en]
 *   [ja]最初のons-carousel-itemを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature last()
 * @description
 *   [en]Show last ons-carousel item.[/en]
 *   [ja]最後のons-carousel-itemを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setSwipeable(swipeable)
 * @param {Boolean} swipeable
 *   [en]If value is true the carousel will be swipeable.[/en]
 *   [ja]swipeableにする場合にはtrueを指定します。[/ja]
 * @description
 *   [en]Set whether the carousel is swipeable or not.[/en]
 *   [ja]swipeできるかどうかを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isSwipeable()
 * @return {Boolean}
 *   [en]true if the carousel is swipeable.[/en]
 *   [ja]swipeableであればtrueを返します。[/ja]
 * @description
 *   [en]Returns whether the carousel is swipeable or not.[/en]
 *   [ja]swipeable属性があるかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setActiveCarouselItemIndex(index)
 * @param {Number} index
 *   [en]The index that the carousel should be set to.[/en]
 *   [ja]carousel要素のインデックスを指定します。[/ja]
 * @description
 *   [en]Specify the index of the ons-carousel-item to show.[/en]
 *   [ja]表示するons-carousel-itemをindexで指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getActiveCarouselItemIndex()
 * @return {Number}
 *   [en]The current carousel item index.[/en]
 *   [ja]現在表示しているカルーセル要素のインデックスが返されます。[/ja]
 * @description
 *   [en]Returns the index of the currently visible ons-carousel-item.[/en]
 *   [ja]現在表示されているons-carousel-item要素のインデックスを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getCarouselItemCount)
 * @return {Number}
 *   [en]The number of carousel items.[/en]
 *   [ja]カルーセル要素の数です。[/ja]
 * @description
 *   [en]Returns the current number of carousel items..[/en]
 *   [ja]現在のカルーセル要素を数を返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setAutoScrollEnabled(enabled)
 * @param {Boolean} enabled
 *   [en]If true auto scroll will be enabled.[/en]
 *   [ja]オートスクロールを有効にする場合にはtrueを渡します。[/ja]
 * @description
 *   [en]Enable or disable "auto-scroll" attribute.[/en]
 *   [ja]auto-scroll属性があるかどうかを設定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isAutoScrollEnabled()
 * @return {Boolean}
 *   [en]true if auto scroll is enabled.[/en]
 *   [ja]オートスクロールが有効であればtrueを返します。[/ja]
 * @description
 *   [en]Returns whether the "auto-scroll" attribute is set or not.[/en]
 *   [ja]auto-scroll属性があるかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setAutoScrollRatio(ratio)
 * @param {Number} ratio
 *   [en]The desired ratio.[/en]
 *   [ja]オートスクロールするのに必要な0.0から1.0までのratio値を指定します。[/ja]
 * @description
 *   [en]Set the auto scroll ratio. Must be a value between 0.0 and 1.0.[/en]
 *   [ja]オートスクロールするのに必要なratio値を指定します。0.0から1.0を必ず指定しなければならない。[/ja]
 */

/**
 * @ngdoc method
 * @signature getAutoScrollRatio()
 * @return {Number}
 *   [en]The current auto scroll ratio.[/en]
 *   [ja]現在のオートスクロールのratio値。[/ja]
 * @description
 *   [en]Returns the current auto scroll ratio.[/en]
 *   [ja]現在のオートスクロールのratio値を返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setOverscrollable(overscrollable)
 * @param {Boolean} overscrollable
 *   [en]If true the carousel will be overscrollable.[/en]
 *   [ja]overscrollできるかどうかを指定します。[/ja]
 * @description
 *   [en]Set whether the carousel is overscrollable or not.[/en]
 *   [ja]overscroll属性があるかどうかを設定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isOverscrollable()
 * @return {Boolean}
 *   [en]Whether the carousel is overscrollable or not.[/en]
 *   [ja]overscrollできればtrueを返します。[/ja]
 * @description
 *   [en]Returns whether the carousel is overscrollable or not.[/en]
 *   [ja]overscroll属性があるかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature refresh()
 * @description
 *   [en]Update the layout of the carousel. Used when adding ons-carousel-items dynamically or to automatically adjust the size.[/en]
 *   [ja]レイアウトや内部の状態を最新のものに更新します。ons-carousel-itemを動的に増やしたり、ons-carouselの大きさを動的に変える際に利用します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @return {Boolean}
 *   [en]Whether the carousel is disabled or not.[/en]
 *   [ja]disabled状態になっていればtrueを返します。[/ja]
 * @description
 *   [en]Returns whether the dialog is disabled or enabled.[/en]
 *   [ja]disabled属性があるかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @param {Boolean} disabled
 *   [en]If true the carousel will be disabled.[/en]
 *   [ja]disabled状態にする場合にはtrueを指定します。[/ja]
 * @description
 *   [en]Disable or enable the dialog.[/en]
 *   [ja]disabled属性があるかどうかを設定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @extensionOf angular
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @extensionOf angular
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @extensionOf angular
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーが指定されなかった場合には、そのイベントに紐付いているイベントリスナーが全て削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsCarousel', ['$onsen', 'CarouselView', function($onsen, CarouselView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);

        return function(scope, element, attrs) {
          CustomElements.upgrade(element[0]);
          var carousel = new CarouselView(scope, element, attrs);

          element.data('ons-carousel', carousel);

          $onsen.registerEventHandlers(carousel, 'postchange refresh overscroll destroy');
          $onsen.declareVarAttribute(attrs, carousel);

          scope.$on('$destroy', function() {
            carousel._events = undefined;
            element.data('ons-carousel', undefined);
            element = null;
          });

          if (element[0].hasAttribute('auto-refresh')) {
            // Refresh carousel when items are added or removed.
            scope.$watch(
              function () {
                return element[0].childNodes.length;
              },
              function () {
                setImmediate(function() {
                  carousel.refresh();
                });
              }
            );
          }

          setImmediate(function() {
            carousel.refresh();
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      },

    };
  }]);

  module.directive('onsCarouselItem', function() {
    return {
      restrict: 'E',
      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);
        return function(scope, element, attrs) {
          CustomElements.upgrade(element[0]);
        };
      }
    };
  });

})();


/**
 * @ngdoc directive
 * @id col
 * @name ons-col
 * @category grid
 * @description
 *   [en]Represents a column in the grid system. Use with ons-row to layout components.[/en]
 *   [ja]グリッドシステムにて列を定義します。ons-rowとともに使用し、コンポーネントのレイアウトに利用します。[/ja]
 * @note
 *   [en]For Android 4.3 and earlier, and iOS6 and earlier, when using mixed alignment with ons-row and ons-column, they may not be displayed correctly. You can use only one align.[/en]
 *   [ja]Android 4.3以前、もしくはiOS 6以前のOSの場合、ons-rowとons-columnを組み合わせた場合に描画が崩れる場合があります。[/ja]
 * @codepen GgujC {wide}
 * @guide layouting [en]Layouting guide[/en][ja]レイアウト機能[/ja]
 * @seealso ons-row [en]ons-row component[/en][ja]ons-rowコンポーネント[/ja]
 * @example
 * <ons-row>
 *   <ons-col width="50px"><ons-icon icon="fa-twitter"></ons-icon></ons-col>
 *   <ons-col>Text</ons-col>
 * </ons-row>
 */

/**
 * @ngdoc attribute
 * @name vertical-align
 * @type {String}
 * @description
 *   [en]Vertical alignment of the column. Valid values are "top", "center", and "bottom".[/en]
 *   [ja]縦の配置を指定する。"top", "center", "bottom"のいずれかを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name width
 * @type {String}
 * @description
 *   [en]The width of the column. Valid values are css width values ("10%", "50px").[/en]
 *   [ja]カラムの横幅を指定する。パーセントもしくはピクセルで指定します（10%や50px）。[/ja]
 */

/**
 * @ngdoc directive
 * @id dialog
 * @name ons-dialog
 * @category dialog
 * @modifier material
 *   [en]Display a Material Design dialog.[/en]
 *   [ja]マテリアルデザインのダイアログを表示します。[/ja]
 * @description
 *  [en]Dialog that is displayed on top of current screen.[/en]
 *  [ja]現在のスクリーンにダイアログを表示します。[/ja]
 * @codepen zxxaGa
 * @guide UsingDialog
 *   [en]Learn how to use the dialog component.[/en]
 *   [ja]ダイアログコンポーネントの使い方[/ja]
 * @seealso ons-alert-dialog
 *   [en]ons-alert-dialog component[/en]
 *   [ja]ons-alert-dialogコンポーネント[/ja]
 * @seealso ons-popover
 *   [en]ons-popover component[/en]
 *   [ja]ons-popoverコンポーネント[/ja]
 * @example
 * <script>
 *   ons.ready(function() {
 *     ons.createDialog('dialog.html').then(function(dialog) {
 *       dialog.show();
 *     });
 *   });
 * </script>
 *
 * <script type="text/ons-template" id="dialog.html">
 *   <ons-dialog cancelable>
 *     ...
 *   </ons-dialog>
 * </script>
 */

/**
 * @ngdoc event
 * @name preshow
 * @description
 * [en]Fired just before the dialog is displayed.[/en]
 * [ja]ダイアログが表示される直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.dialog
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Function} event.cancel 
 *   [en]Execute this function to stop the dialog from being shown.[/en]
 *   [ja]この関数を実行すると、ダイアログの表示がキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name postshow
 * @description
 * [en]Fired just after the dialog is displayed.[/en]
 * [ja]ダイアログが表示された直後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.dialog
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name prehide
 * @description
 * [en]Fired just before the dialog is hidden.[/en]
 * [ja]ダイアログが隠れる直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.dialog
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Function} event.cancel 
 *   [en]Execute this function to stop the dialog from being hidden.[/en]
 *   [ja]この関数を実行すると、ダイアログの非表示がキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name posthide
 * @description
 * [en]Fired just after the dialog is hidden.[/en]
 * [ja]ダイアログが隠れた後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.dialog
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @type {String}
 * @extensionOf angular
 * @description
 *  [en]Variable name to refer this dialog.[/en]
 *  [ja]このダイアログを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *  [en]The appearance of the dialog.[/en]
 *  [ja]ダイアログの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name cancelable
 * @description
 *  [en]If this attribute is set the dialog can be closed by tapping the background or by pressing the back button.[/en]
 *  [ja]この属性があると、ダイアログが表示された時に、背景やバックボタンをタップした時にダイアログを閉じます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *  [en]If this attribute is set the dialog is disabled.[/en]
 *  [ja]この属性がある時、ダイアログはdisabled状態になります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @default default
 * @description
 *  [en]The animation used when showing and hiding the dialog. Can be either "none" or "default".[/en]
 *  [ja]ダイアログを表示する際のアニメーション名を指定します。"none"もしくは"default"を指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation-options
 * @type {Expression}
 * @description
 *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/en]
 *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/ja]
 */

/**
 * @ngdoc attribute
 * @name mask-color
 * @type {String}
 * @default rgba(0, 0, 0, 0.2)
 * @description
 *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)".[/en]
 *  [ja]背景のマスクの色を指定します。"rgba(0, 0, 0, 0.2)"がデフォルト値です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preshow
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prehide
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postshow
 * @extensionOf angular
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-posthide
 * @extensionOf angular
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @extensionOf angular
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature show([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定します。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @param {Function} [options.callback]
 *   [en]This function is called after the dialog has been revealed.[/en]
 *   [ja]ダイアログが表示され終わった後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *  [en]Show the dialog.[/en]
 *  [ja]ダイアログを開きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature hide([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定できます。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @param {Function} [options.callback]
 *   [en]This functions is called after the dialog has been hidden.[/en]
 *   [ja]ダイアログが隠れた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Hide the dialog.[/en]
 *   [ja]ダイアログを閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature isShown()
 * @description
 *   [en]Returns whether the dialog is visible or not.[/en]
 *   [ja]ダイアログが表示されているかどうかを返します。[/ja]
 * @return {Boolean}
 *   [en]true if the dialog is visible.[/en]
 *   [ja]ダイアログが表示されている場合にtrueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature destroy()
 * @description
 *  [en]Destroy the dialog and remove it from the DOM tree.[/en]
 *  [ja]ダイアログを破棄して、DOMツリーから取り除きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back button handler.[/en]
 *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
 * @description
 *   [en]Retrieve the back button handler for overriding the default behavior.[/en]
 *   [ja]バックボタンハンドラを取得します。デフォルトの挙動を変更することができます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setCancelable(cancelable)
 * @param {Boolean} cancelable
 *   [en]If true the dialog will be cancelable.[/en]
 *   [ja]ダイアログをキャンセル可能にする場合trueを指定します。[/ja]
 * @description
 *   [en]Define whether the dialog can be canceled by the user or not.[/en]
 *   [ja]ダイアログを表示した際に、ユーザがそのダイアログをキャンセルできるかどうかを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isCancelable()
 * @description
 *   [en]Returns whether the dialog is cancelable or not.[/en]
 *   [ja]このダイアログがキャンセル可能かどうかを返します。[/ja]
 * @return {Boolean}
 *   [en]true if the dialog is cancelable.[/en]
 *   [ja]ダイアログがキャンセル可能な場合trueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @description
 *   [en]Disable or enable the dialog.[/en]
 *   [ja]このダイアログをdisabled状態にするかどうかを設定します。[/ja]
 * @param {Boolean} disabled
 *   [en]If true the dialog will be disabled.[/en]
 *   [ja]trueを指定するとダイアログをdisabled状態になります。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @description
 *   [en]Returns whether the dialog is disabled or enabled.[/en]
 *   [ja]このダイアログがdisabled状態かどうかを返します。[/ja]
 * @return {Boolean}
 *   [en]true if the dialog is disabled.[/en]
 *   [ja]ダイアログがdisabled状態の場合trueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @extensionOf angular
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @extensionOf angular
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @extensionOf angular
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーが指定されなかった場合には、そのイベントに紐付いているイベントリスナーが全て削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

(function() {
  'use strict';

  angular.module('onsen').directive('onsDialog', ['$onsen', 'DialogView', function($onsen, DialogView) {
    return {
      restrict: 'E',
      scope: true,
      
      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);

        return {
          pre: function(scope, element, attrs) {
            CustomElements.upgrade(element[0]);

            var dialog = new DialogView(scope, element, attrs);
            $onsen.declareVarAttribute(attrs, dialog);
            $onsen.registerEventHandlers(dialog, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethodsForCustomElements(dialog, element);

            element.data('ons-dialog', dialog);
            scope.$on('$destroy', function() {
              dialog._events = undefined;
              $onsen.removeModifierMethods(dialog);
              element.data('ons-dialog', undefined);
              element = null;
            });
          },

          post: function(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);

})();

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsDummyForInit', ['$rootScope', function($rootScope) {
    var isReady = false;

    return {
      restrict: 'E',
      replace: false,

      link: {
        post: function(scope, element) {
          if (!isReady) {
            isReady = true;
            $rootScope.$broadcast('$ons-ready');
          }
          element.remove();
        }
      }
    };
  }]);

})();

/**
 * @ngdoc directive
 * @id gestureDetector
 * @name ons-gesture-detector
 * @category input
 * @description
 *   [en]Component to detect finger gestures within the wrapped element. See the guide for more details.[/en]
 *   [ja]要素内のジェスチャー操作を検知します。詳しくはガイドを参照してください。[/ja]
 * @guide DetectingFingerGestures
 *   [en]Detecting finger gestures[/en]
 *   [ja]ジェスチャー操作の検知[/ja]
 * @example
 * <ons-gesture-detector>
 *   ...
 * </ons-gesture-detector>
 */
(function() {
  'use strict';

  var EVENTS =
    ('drag dragleft dragright dragup dragdown hold release swipe swipeleft swiperight ' +
      'swipeup swipedown tap doubletap touch transform pinch pinchin pinchout rotate').split(/ +/);

  angular.module('onsen').directive('onsGestureDetector', ['$onsen', function($onsen) {

    var scopeDef = EVENTS.reduce(function(dict, name) {
      dict['ng' + titlize(name)] = '&';
      return dict;
    }, {});

    function titlize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return {
      restrict: 'E',
      scope: scopeDef,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      replace: false,
      transclude: true,

      compile: function(element, attrs) {
        return function link(scope, element, attrs, _, transclude) {

          transclude(scope.$parent, function(cloned) {
            element.append(cloned);
          });

          var handler = function(event) {
            var attr = 'ng' + titlize(event.type);

            if (attr in scopeDef) {
              scope[attr]({$event: event});
            }
          };

          var gestureDetector;

          setImmediate(function() {
            gestureDetector = element[0]._gestureDetector;
            gestureDetector.on(EVENTS.join(' '), handler);
          });

          $onsen.cleaner.onDestroy(scope, function() {
            gestureDetector.off(EVENTS.join(' '), handler);
            $onsen.clearComponent({
              scope: scope,
              element: element,
              attrs: attrs
            });
            gestureDetector.element = scope = element = attrs = null;
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();


/**
 * @ngdoc directive
 * @id icon
 * @name ons-icon
 * @category icon
 * @description
 *   [en]Displays an icon. Font Awesome and Ionicon icons are supported.[/en]
 *   [ja]アイコンを表示するコンポーネントです。Font AwesomeもしくはIoniconsから選択できます。[/ja]
 * @codepen xAhvg
 * @guide UsingIcons [en]Using icons[/en][ja]アイコンを使う[/ja]
 * @example
 * <ons-icon
 *   icon="fa-twitter"
 *   size="20px"
 *   fixed-width="false"
 *   style="color: red">
 * </ons-icon>
 */

/**
 * @ngdoc attribute
 * @name icon
 * @type {String}
 * @description
 *   [en]The icon name. <code>fa-</code> prefix for Font Awesome, <code>ion-</code> prefix for Ionicons icons. See all icons at http://fontawesome.io/icons/ and http://ionicons.com.[/en]
 *   [ja]アイコン名を指定します。<code>fa-</code>で始まるものはFont Awesomeとして、<code>ion-</code>で始まるものはIoniconsとして扱われます。使用できるアイコンはこちら: http://fontawesome.io/icons/　および　http://ionicons.com。[/ja]
 */

/**
 * @ngdoc attribute
 * @name size
 * @type {String}
 * @description
 *   [en]The sizes of the icon. Valid values are lg, 2x, 3x, 4x, 5x, or in pixels.[/en]
 *   [ja]アイコンのサイズを指定します。値は、lg, 2x, 3x, 4x, 5xもしくはピクセル単位で指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name rotate
 * @type {Number}
 * @description
 *   [en]Number of degrees to rotate the icon. Valid values are 90, 180, or 270.[/en]
 *   [ja]アイコンを回転して表示します。90, 180, 270から指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name flip
 * @type {String}
 * @description
 *   [en]Flip the icon. Valid values are "horizontal" and "vertical".[/en]
 *   [ja]アイコンを反転します。horizontalもしくはverticalを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name fixed-width
 * @type {Boolean}
 * @default false
 * @description
 *  [en]When used in the list, you want the icons to have the same width so that they align vertically by setting the value to true. Valid values are true, false. Default is false.[/en]
 *  [ja]等幅にするかどうかを指定します。trueもしくはfalseを指定できます。デフォルトはfalseです。[/ja]
 */

/**
 * @ngdoc attribute
 * @name spin
 * @type {Boolean}
 * @default false
 * @description
 *   [en]Specify whether the icon should be spinning. Valid values are true and false.[/en]
 *   [ja]アイコンを回転するかどうかを指定します。trueもしくはfalseを指定できます。[/ja]
 */


/**
 * @ngdoc directive
 * @id if-orientation
 * @name ons-if-orientation
 * @category util
 * @extensionOf angular
 * @description
 *   [en]Conditionally display content depending on screen orientation. Valid values are portrait and landscape. Different from other components, this component is used as attribute in any element.[/en]
 *   [ja]画面の向きに応じてコンテンツの制御を行います。portraitもしくはlandscapeを指定できます。すべての要素の属性に使用できます。[/ja]
 * @seealso ons-if-platform [en]ons-if-platform component[/en][ja]ons-if-platformコンポーネント[/ja]
 * @guide UtilityAPIs [en]Other utility APIs[/en][ja]他のユーティリティAPI[/ja]
 * @example
 * <div ons-if-orientation="portrait">
 *   <p>This will only be visible in portrait mode.</p>
 * </div>
 */

/**
 * @ngdoc attribute
 * @name ons-if-orientation
 * @initonly
 * @extensionOf angular
 * @type {String}
 * @description
 *   [en]Either "portrait" or "landscape".[/en]
 *   [ja]portraitもしくはlandscapeを指定します。[/ja]
 */

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsIfOrientation', ['$onsen', '$onsGlobal', function($onsen, $onsGlobal) {
    return {
      restrict: 'A',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function(element) {
        element.css('display', 'none');

        return function(scope, element, attrs) {
          element.addClass('ons-if-orientation-inner');

          attrs.$observe('onsIfOrientation', update);
          $onsGlobal.orientation.on('change', update);

          update();

          $onsen.cleaner.onDestroy(scope, function() {
            $onsGlobal.orientation.off('change', update);

            $onsen.clearComponent({
              element: element,
              scope: scope,
              attrs: attrs
            });
            element = scope = attrs = null;
          });

          function update() {
            var userOrientation = ('' + attrs.onsIfOrientation).toLowerCase();
            var orientation = getLandscapeOrPortrait();

            if (userOrientation === 'portrait' || userOrientation === 'landscape') {
              if (userOrientation === orientation) {
                element.css('display', '');
              } else {
                element.css('display', 'none');
              }
            }
          }

          function getLandscapeOrPortrait() {
            return $onsGlobal.orientation.isPortrait() ? 'portrait' : 'landscape';
          }
        };
      }
    };
  }]);
})();


/**
 * @ngdoc directive
 * @id if-platform
 * @name ons-if-platform
 * @category util
 * @extensionOf angular
 * @description
 *    [en]Conditionally display content depending on the platform / browser. Valid values are "opera", "firefox", "safari", "chrome", "ie", "edge", "android", "blackberry", "ios" and "wp".[/en]
 *    [ja]プラットフォームやブラウザーに応じてコンテンツの制御をおこないます。opera, firefox, safari, chrome, ie, edge, android, blackberry, ios, wpのいずれかの値を空白区切りで複数指定できます。[/ja]
 * @seealso ons-if-orientation [en]ons-if-orientation component[/en][ja]ons-if-orientationコンポーネント[/ja]
 * @guide UtilityAPIs [en]Other utility APIs[/en][ja]他のユーティリティAPI[/ja]
 * @example
 * <div ons-if-platform="android">
 *   ...
 * </div>
 */

/**
 * @ngdoc attribute
 * @name ons-if-platform
 * @type {String}
 * @initonly
 * @extensionOf angular
 * @description
 *   [en]One or multiple space separated values: "opera", "firefox", "safari", "chrome", "ie", "edge", "android", "blackberry", "ios" or "wp".[/en]
 *   [ja]"opera", "firefox", "safari", "chrome", "ie", "edge", "android", "blackberry", "ios", "wp"のいずれか空白区切りで複数指定できます。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsIfPlatform', ['$onsen', function($onsen) {
    return {
      restrict: 'A',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function(element) {
        element.addClass('ons-if-platform-inner');
        element.css('display', 'none');

        var platform = getPlatformString();

        return function(scope, element, attrs) {
          attrs.$observe('onsIfPlatform', function(userPlatform) {
            if (userPlatform) {
              update();
            }
          });

          update();

          $onsen.cleaner.onDestroy(scope, function() {
            $onsen.clearComponent({
              element: element,
              scope: scope,
              attrs: attrs
            });
            element = scope = attrs = null;
          });

          function update() {
            var userPlatforms = attrs.onsIfPlatform.toLowerCase().trim().split(/\s+/);
            if (userPlatforms.indexOf(platform.toLowerCase()) >= 0) {
              element.css('display', 'block');
            } else {
              element.css('display', 'none');
            }
          }
        };

        function getPlatformString() {

          if (navigator.userAgent.match(/Android/i)) {
            return 'android';
          }

          if ((navigator.userAgent.match(/BlackBerry/i)) || (navigator.userAgent.match(/RIM Tablet OS/i)) || (navigator.userAgent.match(/BB10/i))) {
            return 'blackberry';
          }

          if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            return 'ios';
          }

          if (navigator.userAgent.match(/Windows Phone|IEMobile|WPDesktop/i)) {
            return 'wp';
          }

          // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
          var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
          if (isOpera) {
            return 'opera';
          }

          var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
          if (isFirefox) {
            return 'firefox';
          }

          var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
          // At least Safari 3+: "[object HTMLElementConstructor]"
          if (isSafari) {
            return 'safari';
          }

          var isEdge = navigator.userAgent.indexOf(' Edge/') >= 0;
          if (isEdge) {
            return 'edge';
          }

          var isChrome = !!window.chrome && !isOpera && !isEdge; // Chrome 1+
          if (isChrome) {
            return 'chrome';
          }

          var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
          if (isIE) {
            return 'ie';
          }

          return 'unknown';
        }
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id ons-keyboard-active
 * @name ons-keyboard-active
 * @category input
 * @extensionOf angular
 * @description
 *   [en]
 *     Conditionally display content depending on if the software keyboard is visible or hidden.
 *     This component requires cordova and that the com.ionic.keyboard plugin is installed.
 *   [/en]
 *   [ja]
 *     ソフトウェアキーボードが表示されているかどうかで、コンテンツを表示するかどうかを切り替えることが出来ます。
 *     このコンポーネントは、Cordovaやcom.ionic.keyboardプラグインを必要とします。
 *   [/ja]
 * @guide UtilityAPIs
 *   [en]Other utility APIs[/en]
 *   [ja]他のユーティリティAPI[/ja]
 * @example
 * <div ons-keyboard-active>
 *   This will only be displayed if the software keyboard is open.
 * </div>
 * <div ons-keyboard-inactive>
 *   There is also a component that does the opposite.
 * </div>
 */

/**
 * @ngdoc attribute
 * @name ons-keyboard-active
 * @description
 *   [en]The content of tags with this attribute will be visible when the software keyboard is open.[/en]
 *   [ja]この属性がついた要素は、ソフトウェアキーボードが表示された時に初めて表示されます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-keyboard-inactive
 * @description
 *   [en]The content of tags with this attribute will be visible when the software keyboard is hidden.[/en]
 *   [ja]この属性がついた要素は、ソフトウェアキーボードが隠れている時のみ表示されます。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  var compileFunction = function(show, $onsen) {
    return function(element) {
      return function(scope, element, attrs) {
        var dispShow = show ? 'block' : 'none',
            dispHide = show ? 'none' : 'block';

        var onShow = function() {
          element.css('display', dispShow);
        };

        var onHide = function() {
          element.css('display', dispHide);
        };

        var onInit = function(e) {
          if (e.visible) {
            onShow();
          } else {
            onHide();
          }
        };

        ons.softwareKeyboard.on('show', onShow);
        ons.softwareKeyboard.on('hide', onHide);
        ons.softwareKeyboard.on('init', onInit);

        if (ons.softwareKeyboard._visible) {
          onShow();
        } else {
          onHide();
        }

        $onsen.cleaner.onDestroy(scope, function() {
          ons.softwareKeyboard.off('show', onShow);
          ons.softwareKeyboard.off('hide', onHide);
          ons.softwareKeyboard.off('init', onInit);

          $onsen.clearComponent({
            element: element,
            scope: scope,
            attrs: attrs
          });
          element = scope = attrs = null;
        });
      };
    };
  };

  module.directive('onsKeyboardActive', ['$onsen', function($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,
      compile: compileFunction(true, $onsen)
    };
  }]);

  module.directive('onsKeyboardInactive', ['$onsen', function($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,
      compile: compileFunction(false, $onsen)
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id lazy-repeat
 * @name ons-lazy-repeat
 * @extensionOf angular
 * @category control
 * @description 
 *   [en]
 *     Using this component a list with millions of items can be rendered without a drop in performance.
 *     It does that by "lazily" loading elements into the DOM when they come into view and
 *     removing items from the DOM when they are not visible.
 *   [/en]
 *   [ja]
 *     このコンポーネント内で描画されるアイテムのDOM要素の読み込みは、画面に見えそうになった時まで自動的に遅延され、
 *     画面から見えなくなった場合にはその要素は動的にアンロードされます。
 *     このコンポーネントを使うことで、パフォーマンスを劣化させること無しに巨大な数の要素を描画できます。
 *   [/ja]
 * @codepen QwrGBm
 * @guide UsingLazyRepeat 
 *   [en]How to use Lazy Repeat[/en]
 *   [ja]レイジーリピートの使い方[/ja]
 * @example
 * <script>
 *   ons.bootstrap()
 *
 *   .controller('MyController', function($scope) {
 *     $scope.MyDelegate = {
 *       countItems: function() {
 *         // Return number of items.
 *         return 1000000;
 *       },
 *
 *       calculateItemHeight: function(index) {
 *         // Return the height of an item in pixels.
 *         return 45;
 *       },
 *
 *       configureItemScope: function(index, itemScope) {
 *         // Initialize scope
 *         itemScope.item = 'Item #' + (index + 1);
 *       },
 *
 *       destroyItemScope: function(index, itemScope) {
 *         // Optional method that is called when an item is unloaded.
 *         console.log('Destroyed item with index: ' + index);
 *       }
 *     };
 *   });
 * </script>
 *
 * <ons-list ng-controller="MyController">
 *   <ons-list-item ons-lazy-repeat="MyDelegate">
 *     {{ item }}
 *   </ons-list-item>
 * </ons-list>
 */

/**
 * @ngdoc attribute
 * @name ons-lazy-repeat
 * @type {Expression}
 * @initonly
 * @extensionOf angular
 * @description
 *  [en]A delegate object, can be either an object attached to the scope (when using AngularJS) or a normal JavaScript variable.[/en]
 *  [ja]要素のロード、アンロードなどの処理を委譲するオブジェクトを指定します。AngularJSのスコープの変数名や、通常のJavaScriptの変数名を指定します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  /**
   * Lazy repeat directive.
   */
  module.directive('onsLazyRepeat', ['$onsen', 'LazyRepeatView', function($onsen, LazyRepeatView) {
    return {
      restrict: 'A',
      replace: false,
      priority: 1000,
      terminal: true,

      compile: function(element, attrs) {
        return function(scope, element, attrs) {
          var lazyRepeat = new LazyRepeatView(scope, element, attrs);

          scope.$on('$destroy', function() {
            scope = element = attrs = lazyRepeat = null;
          });
        };
      }
    };
  }]);

})();

/**
 * @ngdoc directive
 * @id list
 * @name ons-list
 * @category list
 * @modifier inset
 *   [en]Inset list that doesn't cover the whole width of the parent.[/en]
 *   [ja]親要素の画面いっぱいに広がらないリストを表示します。[/ja]
 * @modifier noborder
 *   [en]A list with no borders at the top and bottom.[/en]
 *   [ja]リストの上下のボーダーが無いリストを表示します。[/ja]
 * @description
 *   [en]Component to define a list, and the container for ons-list-item(s).[/en]
 *   [ja]リストを表現するためのコンポーネント。ons-list-itemのコンテナとして使用します。[/ja]
 * @seealso ons-list-item
 *   [en]ons-list-item component[/en]
 *   [ja]ons-list-itemコンポーネント[/ja]
 * @seealso ons-list-header
 *   [en]ons-list-header component[/en]
 *   [ja]ons-list-headerコンポーネント[/ja]
 * @guide UsingList
 *   [en]Using lists[/en]
 *   [ja]リストを使う[/ja]
 * @codepen yxcCt
 * @example
 * <ons-list>
 *   <ons-list-header>Header Text</ons-list-header>
 *   <ons-list-item>Item</ons-list-item>
 *   <ons-list-item>Item</ons-list-item>
 * </ons-list>
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]The appearance of the list.[/en]
 *   [ja]リストの表現を指定します。[/ja]
 */

(function() {
  'use strict';

  angular.module('onsen').directive('onsList', ['$onsen', 'GenericView', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        GenericView.register(scope, element, attrs, {viewKey: 'ons-list'});
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);

})();

/**
 * @ngdoc directive
 * @id list-header
 * @name ons-list-header
 * @category list
 * @description
 *   [en]Header element for list items. Must be put inside ons-list component.[/en]
 *   [ja]リスト要素に使用するヘッダー用コンポーネント。ons-listと共に使用します。[/ja]
 * @seealso ons-list
 *   [en]ons-list component[/en]
 *   [ja]ons-listコンポーネント[/ja]
 * @seealso ons-list-item [en]ons-list-item component[/en][ja]ons-list-itemコンポーネント[/ja]
 * @guide UsingList [en]Using lists[/en][ja]リストを使う[/ja]
 * @codepen yxcCt
 * @example
 * <ons-list>
 *   <ons-list-header>Header Text</ons-list-header>
 *   <ons-list-item>Item</ons-list-item>
 *   <ons-list-item>Item</ons-list-item>
 * </ons-list>
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]The appearance of the list header.[/en]
 *   [ja]ヘッダーの表現を指定します。[/ja]
 */

(function() {
  'use strict';

  angular.module('onsen').directive('onsListHeader', ['$onsen', 'GenericView', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        GenericView.register(scope, element, attrs, {viewKey: 'ons-listHeader'});
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);

})();

/**
 * @ngdoc directive
 * @id list-item
 * @name ons-list-item
 * @category list
 * @modifier tight
 *   [en]Remove the space above and below the item content. This is useful for multi-line content.[/en]
 *   [ja]行間のスペースを取り除きます。複数行の内容をリストで扱う場合に便利です。[/ja]
 * @modifier tappable
 *   [en]Make the list item change appearance when it's tapped.[/en]
 *   [ja]タップやクリックした時に効果が表示されるようになります。[/ja]
 * @modifier chevron
 *   [en]Display a chevron at the right end of the list item and make it change appearance when tapped.[/en]
 *   [ja]要素の右側に右矢印が表示されます。また、タップやクリックした時に効果が表示されるようになります。[/ja]
 * @description
 *   [en]Component that represents each item in the list. Must be put inside the ons-list component.[/en]
 *   [ja]リストの各要素を表現するためのコンポーネントです。ons-listコンポーネントと共に使用します。[/ja]
 * @seealso ons-list
 *   [en]ons-list component[/en]
 *   [ja]ons-listコンポーネント[/ja]
 * @seealso ons-list-header
 *   [en]ons-list-header component[/en]
 *   [ja]ons-list-headerコンポーネント[/ja]
 * @guide UsingList
 *   [en]Using lists[/en]
 *   [ja]リストを使う[/ja]
 * @codepen yxcCt
 * @example
 * <ons-list>
 *   <ons-list-header>Header Text</ons-list-header>
 *   <ons-list-item>Item</ons-list-item>
 *   <ons-list-item>Item</ons-list-item>
 * </ons-list>
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]The appearance of the list item.[/en]
 *   [ja]各要素の表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name lock-on-drag
 * @type {String}
 * @description
 *   [en]Prevent vertical scrolling when the user drags horizontally.[/en]
 *   [ja]この属性があると、ユーザーがこの要素を横方向にドラッグしている時に、縦方向のスクロールが起きないようになります。[/ja]
 */

(function() {
  'use strict';

  angular.module('onsen').directive('onsListItem', ['$onsen', 'GenericView', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        GenericView.register(scope, element, attrs, {viewKey: 'ons-list-item'});
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id loading-placeholder
 * @name ons-loading-placeholder
 * @category util
 * @description
 *   [en]Display a placeholder while the content is loading.[/en]
 *   [ja]Onsen UIが読み込まれるまでに表示するプレースホルダーを表現します。[/ja]
 * @guide UtilityAPIs [en]Other utility APIs[/en][ja]他のユーティリティAPI[/ja]
 * @example
 * <div ons-loading-placeholder="page.html">
 *   Loading...
 * </div>
 */

/**
 * @ngdoc attribute
 * @name ons-loading-placeholder
 * @initonly
 * @type {String}
 * @description
 *   [en]The url of the page to load.[/en]
 *   [ja]読み込むページのURLを指定します。[/ja]
 */

(function(){
  'use strict';

  angular.module('onsen').directive('onsLoadingPlaceholder', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        if (attrs.onsLoadingPlaceholder) {
          ons._resolveLoadingPlaceholder(element[0], attrs.onsLoadingPlaceholder, function(contentElement, done) {
            CustomElements.upgrade(contentElement);
            ons.compile(contentElement);
            scope.$evalAsync(function() {
              setImmediate(done);
            });
          });
        }
      }
    };
  });
})();

/**
 * @ngdoc directive
 * @id material-input
 * @name ons-material-input
 * @category form
 * @description
 *  [en]Material Design input component.[/en]
 *  [ja]Material Designのinputコンポ―ネントです。[/ja]
 * @guide UsingFormComponents
 *   [en]Using form components[/en]
 *   [ja]フォームを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @example
 * <ons-material-input label="Username"></ons-material-input>
 */

/**
 * @ngdoc attribute
 * @name label
 * @type {String}
 * @description
 *   [en]Text for animated floating label.[/en]
 *   [ja]アニメーションさせるフローティングラベルのテキストを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name no-float
 * @description
 *  [en]If this attribute is present, the label will not be animated.[/en]
 *  [ja]この属性が設定された時、ラベルはアニメーションしないようになります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ng-model
 * @extensionOf angular
 * @description
 *   [en]Bind the value to a model. Works just like for normal input elements.[/en]
 *   [ja]この要素の値をモデルに紐付けます。通常のinput要素の様に動作します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ng-change
 * @extensionOf angular
 * @description
 *   [en]Executes an expression when the value changes. Works just like for normal input elements.[/en]
 *   [ja]値が変わった時にこの属性で指定したexpressionが実行されます。通常のinput要素の様に動作します。[/ja]
 */

(function(){
  'use strict';

  angular.module('onsen').directive('onsMaterialInput', ['$parse', function($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,

      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);

        if (attrs.ngModel) {
          var set = $parse(attrs.ngModel).assign;

          scope.$parent.$watch(attrs.ngModel, function(value) {
            element[0].value = value;
          });

          element[0]._input.addEventListener('input', function() {
            set(scope.$parent, element[0].value);

            if (attrs.ngChange) {
              scope.$eval(attrs.ngChange);
            }

            scope.$parent.$evalAsync();
          }.bind(this));
        }
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id modal
 * @name ons-modal
 * @category modal
 * @description 
 *   [en]
 *     Modal component that masks current screen.
 *     Underlying components are not subject to any events while the modal component is shown.
 *   [/en]
 *   [ja]
 *     画面全体をマスクするモーダル用コンポーネントです。下側にあるコンポーネントは、
 *     モーダルが表示されている間はイベント通知が行われません。
 *   [/ja]
 * @guide UsingModal
 *   [en]Using ons-modal component[/en]
 *   [ja]モーダルの使い方[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @codepen devIg
 * @example
 * <ons-modal>
 *   ...
 * </ons-modal>
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @extensionOf angular
 * @initonly
 * @description
 *   [en]Variable name to refer this modal.[/en]
 *   [ja]このモーダルを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @default default
 * @description
 *  [en]The animation used when showing and hiding the modal. Can be either "none" or "fade".[/en]
 *  [ja]モーダルを表示する際のアニメーション名を指定します。"none"もしくは"fade"を指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation-options
 * @type {Expression}
 * @description
 *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/en]
 *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/ja]
 */

/**
 * @ngdoc method
 * @signature toggle([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none" and "fade".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade"のいずれかを指定します。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @description
 *   [en]Toggle modal visibility.[/en]
 *   [ja]モーダルの表示を切り替えます。[/ja]
 */

/**
 * @ngdoc method
 * @signature show([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none" and "fade".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade"のいずれかを指定します。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @description
 *   [en]Show modal.[/en]
 *   [ja]モーダルを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature hide([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none" and "fade".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade"のいずれかを指定します。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @description
 *   [en]Hide modal.[/en]
 *   [ja]モーダルを非表示にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature isShown()
 * @return {Boolean}
 *   [en]true if the modal is visible.[/en]
 *   [ja]モーダルが表示されている場合にtrueとなります。[/ja]
 * @description
 *   [en]Returns whether the modal is visible or not.[/en]
 *   [ja]モーダルが表示されているかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back button handler.[/en]
 *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
 * @description
 *   [en]Retrieve the back button handler.[/en]
 *   [ja]ons-modalに紐付いているバックボタンハンドラを取得します。[/ja]
 */

(function() {
  'use strict';

  /**
   * Modal directive.
   */
  angular.module('onsen').directive('onsModal', ['$onsen', 'ModalView', function($onsen, ModalView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      link: {
        pre: function(scope, element, attrs) {
          CustomElements.upgrade(element[0]);
          var modal = new ModalView(scope, element, attrs);
          $onsen.addModifierMethodsForCustomElements(modal, element);

          $onsen.declareVarAttribute(attrs, modal);
          element.data('ons-modal', modal);

          element[0]._ensureNodePosition();

          scope.$on('$destroy', function() {
            $onsen.removeModifierMethods(modal);
            element.data('ons-modal', undefined);
            modal = element = scope = attrs = null;
          });
        },

        post: function(scope, element) {
          $onsen.fireComponentEvent(element[0], 'init');
        }
      }
    };
  }]);

})();

/**
 * @ngdoc directive
 * @id navigator
 * @name ons-navigator
 * @category navigation
 * @description
 *   [en]A component that provides page stack management and navigation. This component does not have a visible content.[/en]
 *   [ja]ページスタックの管理とナビゲーション機能を提供するコンポーネント。画面上への出力はありません。[/ja]
 * @codepen yrhtv
 * @guide PageNavigation
 *   [en]Guide for page navigation[/en]
 *   [ja]ページナビゲーションの概要[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-toolbar
 *   [en]ons-toolbar component[/en]
 *   [ja]ons-toolbarコンポーネント[/ja]
 * @seealso ons-back-button
 *   [en]ons-back-button component[/en]
 *   [ja]ons-back-buttonコンポーネント[/ja]
 * @example
 * <ons-navigator animation="slide" var="app.navi">
 *   <ons-page>
 *     <ons-toolbar>
 *       <div class="center">Title</div>
 *     </ons-toolbar>
 *
 *     <p style="text-align: center">
 *       <ons-button modifier="light" ng-click="app.navi.pushPage('page.html');">Push</ons-button>
 *     </p>
 *   </ons-page>
 * </ons-navigator>
 *
 * <ons-template id="page.html">
 *   <ons-page>
 *     <ons-toolbar>
 *       <div class="center">Title</div>
 *     </ons-toolbar>
 *
 *     <p style="text-align: center">
 *       <ons-button modifier="light" ng-click="app.navi.popPage();">Pop</ons-button>
 *     </p>
 *   </ons-page>
 * </ons-template>
 */

/**
 * @ngdoc event
 * @name prepush
 * @description
 *   [en]Fired just before a page is pushed.[/en]
 *   [ja]pageがpushされる直前に発火されます。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.navigator
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Object} event.currentPage
 *   [en]Current page object.[/en]
 *   [ja]現在のpageオブジェクト。[/ja]
 * @param {Function} event.cancel
 *   [en]Call this function to cancel the push.[/en]
 *   [ja]この関数を呼び出すと、push処理がキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name prepop
 * @description
 *   [en]Fired just before a page is popped.[/en]
 *   [ja]pageがpopされる直前に発火されます。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.navigator
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Object} event.currentPage
 *   [en]Current page object.[/en]
 *   [ja]現在のpageオブジェクト。[/ja]
 * @param {Function} event.cancel
 *   [en]Call this function to cancel the pop.[/en]
 *   [ja]この関数を呼び出すと、pageのpopがキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name postpush
 * @description
 *   [en]Fired just after a page is pushed.[/en]
 *   [ja]pageがpushされてアニメーションが終了してから発火されます。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.navigator
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Object} event.enterPage
 *   [en]Object of the next page.[/en]
 *   [ja]pushされたpageオブジェクト。[/ja]
 * @param {Object} event.leavePage
 *   [en]Object of the previous page.[/en]
 *   [ja]以前のpageオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name postpop
 * @description
 *   [en]Fired just after a page is popped.[/en]
 *   [ja]pageがpopされてアニメーションが終わった後に発火されます。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.navigator
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Object} event.enterPage
 *   [en]Object of the next page.[/en]
 *   [ja]popされて表示されるページのオブジェクト。[/ja]
 * @param {Object} event.leavePage
 *   [en]Object of the previous page.[/en]
 *   [ja]popされて消えるページのオブジェクト。[/ja]
 */

/**
 * @ngdoc attribute
 * @name page
 * @initonly
 * @type {String}
 * @description
 *   [en]First page to show when navigator is initialized.[/en]
 *   [ja]ナビゲーターが初期化された時に表示するページを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @extensionOf angular
 * @type {String}
 * @description
 *  [en]Variable name to refer this navigator.[/en]
 *  [ja]このナビゲーターを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prepush
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prepush" event is fired.[/en]
 *  [ja]"prepush"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prepop
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prepop" event is fired.[/en]
 *  [ja]"prepop"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postpush
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postpush" event is fired.[/en]
 *  [ja]"postpush"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postpop
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postpop" event is fired.[/en]
 *  [ja]"postpop"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-init
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "init" event is fired.[/en]
 *  [ja]ページの"init"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-show
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "show" event is fired.[/en]
 *  [ja]ページの"show"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-hide
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "hide" event is fired.[/en]
 *  [ja]ページの"hide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "destroy" event is fired.[/en]
 *  [ja]ページの"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @default default
 * @description
 *  [en]Specify the transition animation. Use one of "slide", "simpleslide", "fade", "lift", "none" and "default".[/en]
 *  [ja]画面遷移する際のアニメーションを指定します。"slide", "simpleslide", "fade", "lift", "none", "default"のいずれかを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation-options
 * @type {Expression}
 * @description
 *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/en]
 *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/ja]
 */

/**
 * @ngdoc method
 * @signature pushPage(pageUrl, [options])
 * @param {String} pageUrl
 *   [en]Page URL. Can be either a HTML document or a <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @param {Function} [options.onTransitionEnd]
 *   [en]Function that is called when the transition has ended.[/en]
 *   [ja]pushPage()による画面遷移が終了した時に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Pushes the specified pageUrl into the page stack.[/en]
 *   [ja]指定したpageUrlを新しいページスタックに追加します。新しいページが表示されます。[/ja]
 */

/**
 * @ngdoc method
 * @signature bringPageTop(item, [options])
 * @param {String|Number} item
 *   [en]Page URL or index of an existing page in navigator's stack.[/en]
 *   [ja]ページのURLかもしくはons-navigatorのページスタックのインデックス値を指定します。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @param {Function} [options.onTransitionEnd]
 *   [en]Function that is called when the transition has ended.[/en]
 *   [ja]pushPage()による画面遷移が終了した時に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Brings the given page to the top of the page-stack if already exists or pushes it into the stack if doesn't.[/en]
 *   [ja]指定したページをページスタックの一番上に移動します。もし指定したページが無かった場合新しくpushされます。[/ja]
 */

/**
 * @ngdoc method
 * @signature insertPage(index, pageUrl, [options])
 * @param {Number} index
 *   [en]The index where it should be inserted.[/en]
 *   [ja]スタックに挿入する位置のインデックスを指定します。[/ja]
 * @param {String} pageUrl
 *   [en]Page URL. Can be either a HTML document or a <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @description
 *   [en]Insert the specified pageUrl into the page stack with specified index.[/en]
 *   [ja]指定したpageUrlをページスタックのindexで指定した位置に追加します。[/ja]
 */

/**
 * @ngdoc method
 * @signature popPage([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @param {Boolean} [options.refresh]
 *   [en]The previous page will be refreshed (destroyed and created again) before popPage action.[/en]
 *   [ja]popPageする前に、前にあるページを生成しなおして更新する場合にtrueを指定します。[/ja]
 * @param {Function} [options.onTransitionEnd]
 *   [en]Function that is called when the transition has ended.[/en]
 *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Pops the current page from the page stack. The previous page will be displayed.[/en]
 *   [ja]現在表示中のページをページスタックから取り除きます。一つ前のページに戻ります。[/ja]
 */

/**
 * @ngdoc method
 * @signature replacePage(pageUrl, [options])
 * @param {String} pageUrl
 *   [en]Page URL. Can be either a HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定できます。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @param {Function} [options.onTransitionEnd]
 *   [en]Function that is called when the transition has ended.[/en]
 *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Replaces the current page with the specified one.[/en]
 *   [ja]現在表示中のページをを指定したページに置き換えます。[/ja]
 */

/**
 * @ngdoc method
 * @signature resetToPage(pageUrl, [options])
 * @param {String/undefined} pageUrl
 *   [en]Page URL. Can be either a HTML document or an <code>&lt;ons-template&gt;</code>. If the value is undefined or '', the navigator will be reset to the page that was first displayed.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。undefinedや''を指定すると、ons-navigatorが最初に表示したページを指定したことになります。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定できます。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @param {Function} [options.onTransitionEnd]
 *   [en]Function that is called when the transition has ended.[/en]
 *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Clears page stack and adds the specified pageUrl to the page stack.[/en]
 *   [ja]ページスタックをリセットし、指定したページを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getCurrentPage()
 * @return {Object}
 *   [en]Current page object.[/en]
 *   [ja]現在のpageオブジェクト。[/ja]
 * @description
 *   [en]Get current page's navigator item. Use this method to access options passed by pushPage() or resetToPage() method.[/en]
 *   [ja]現在のページを取得します。pushPage()やresetToPage()メソッドの引数を取得できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getPages()
 * @return {List}
 *   [en]List of page objects.[/en]
 *   [ja]pageオブジェクトの配列。[/ja]
 * @description
 *   [en]Retrieve the entire page stack of the navigator.[/en]
 *   [ja]ナビゲーターの持つページスタックの一覧を取得します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back button handler.[/en]
 *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
 * @description
 *   [en]Retrieve the back button handler for overriding the default behavior.[/en]
 *   [ja]バックボタンハンドラを取得します。デフォルトの挙動を変更することができます。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @extensionOf angular
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @extensionOf angular
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @extensionOf angular
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function() {
  'use strict';

  var lastReady = window.OnsNavigatorElement.rewritables.ready;
  window.OnsNavigatorElement.rewritables.ready = ons._waitDiretiveInit('ons-navigator', lastReady);

  var lastLink = window.OnsNavigatorElement.rewritables.link;
  window.OnsNavigatorElement.rewritables.link = function(navigatorElement, target, callback) {
    var view = angular.element(navigatorElement).data('ons-navigator');
    view._compileAndLink(target, function(target) {
      lastLink(navigatorElement, target, callback);
    });
  };

  angular.module('onsen').directive('onsNavigator', ['NavigatorView', '$onsen', function(NavigatorView, $onsen) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: true,

      compile: function(element) {
        CustomElements.upgrade(element[0]);

        return {
          pre: function(scope, element, attrs, controller) {
            CustomElements.upgrade(element[0]);
            var navigator = new NavigatorView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, navigator);
            $onsen.registerEventHandlers(navigator, 'prepush prepop postpush postpop init show hide destroy');

            element.data('ons-navigator', navigator);

            scope.$on('$destroy', function() {
              navigator._events = undefined;
              element.data('ons-navigator', undefined);
              element = null;
            });

          },
          post: function(scope, element, attrs) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id page
 * @name ons-page
 * @category page
 * @description
 *   [en]Should be used as root component of each page. The content inside page component is scrollable.[/en]
 *   [ja]ページ定義のためのコンポーネントです。このコンポーネントの内容はスクロールが許可されます。[/ja]
 * @guide ManagingMultiplePages
 *   [en]Managing multiple pages[/en]
 *   [ja]複数のページを管理する[/ja]
 * @guide Pagelifecycle
 *   [en]Page life cycle events[/en]
 *   [ja]ページライフサイクルイベント[/ja]
 * @guide HandlingBackButton
 *   [en]Handling back button[/en]
 *   [ja]バックボタンに対応する[/ja]
 * @guide OverridingCSSstyles
 *   [en]Overriding CSS styles[/en]
 *   [ja]CSSスタイルのオーバーライド[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @example
 * <ons-page>
 *   <ons-toolbar>
 *     <div class="center">Title</div>
 *   </ons-toolbar>
 *
 *   ...
 * </ons-page>
 */

/**
 * @ngdoc event
 * @name init
 * @description
 *   [en]Fired right after the page is attached.[/en]
 *   [ja]ページがアタッチされた後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.page
 *   [en]Page object.[/en]
 *   [ja]ページのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name show
 * @description
 *   [en]Fired right after the page is shown.[/en]
 *   [ja]ページが表示された後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.page
 *   [en]Page object.[/en]
 *   [ja]ページのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name hide
 * @description
 *   [en]Fired right after the page is hidden.[/en]
 *   [ja]ページが隠れた後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.page
 *   [en]Page object.[/en]
 *   [ja]ページのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name destroy
 * @description
 *   [en]Fired right before the page is destroyed.[/en]
 *   [ja]ページが破棄される前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.page
 *   [en]Page object.[/en]
 *   [ja]ページのオブジェクト。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @extensionOf angular
 * @type {String}
 * @description
 *   [en]Variable name to refer this page.[/en]
 *   [ja]このページを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]Specify modifier name to specify custom styles.[/en]
 *   [ja]スタイル定義をカスタマイズするための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name on-device-backbutton
 * @type {Expression}
 * @extensionOf angular
 * @description
 *   [en]Allows you to specify custom behavior when the back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時の挙動を設定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ng-device-backbutton
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *   [en]Allows you to specify custom behavior with an AngularJS expression when the back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時の挙動を設定できます。AngularJSのexpressionを指定できます。[/ja]
 */
/**
 * @ngdoc attribute
 * @name ons-init
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "init" event is fired.[/en]
 *  [ja]"init"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-show
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "show" event is fired.[/en]
 *  [ja]"show"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-hide
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "hide" event is fired.[/en]
 *  [ja]"hide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back button handler.[/en]
 *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
 * @description
 *   [en]Get the associated back button handler. This method may return null if no handler is assigned.[/en]
 *   [ja]バックボタンハンドラを取得します。このメソッドはnullを返す場合があります。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsPage', ['$onsen', 'PageView', function($onsen, PageView) {

    function firePageInitEvent(element) {
      // TODO: remove dirty fix
      var i = 0, f = function() {
        if (i++ < 15)  {
          if (isAttached(element)) {
            element._tryToFillStatusBar();
            $onsen.fireComponentEvent(element, 'init');
            fireActualPageInitEvent(element);
          } else {
            if (i > 10) {
              setTimeout(f, 1000 / 60);
            } else {
              setImmediate(f);
            }
          }
        } else {
          throw new Error('Fail to fire "pageinit" event. Attach "ons-page" element to the document after initialization.');
        }
      };

      f();
    }

    function fireActualPageInitEvent(element) {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('pageinit', true, true);
      element.dispatchEvent(event);
    }

    function isAttached(element) {
      if (document.documentElement === element) {
        return true;
      }
      return element.parentNode ? isAttached(element.parentNode) : false;
    }

    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);
        return {
          pre: function(scope, element, attrs) {
            CustomElements.upgrade(element[0]);
            var page = new PageView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, page);
            $onsen.registerEventHandlers(page, 'init show hide destroy');

            element.data('ons-page', page);
            $onsen.addModifierMethodsForCustomElements(page, element);

            element.data('_scope', scope);

            $onsen.cleaner.onDestroy(scope, function() {
              page._events = undefined;
              $onsen.removeModifierMethods(page);
              element.data('ons-page', undefined);
              element.data('_scope', undefined);

              $onsen.clearComponent({
                element: element,
                scope: scope,
                attrs: attrs
              });
              scope = element = attrs = null;
            });
          },

          post: function postLink(scope, element, attrs) {
            firePageInitEvent(element[0]);
          }
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id popover
 * @name ons-popover
 * @category popover
 * @modifier android
 *   [en]Display an Android style popover.[/en]
 *   [ja]Androidライクなポップオーバーを表示します。[/ja]
 * @description
 *  [en]A component that displays a popover next to an element.[/en]
 *  [ja]ある要素を対象とするポップオーバーを表示するコンポーネントです。[/ja]
 * @codepen ZYYRKo
 * @example
 * <script>
 * ons.ready(function() {
 *   ons.createPopover('popover.html').then(function(popover) {
 *     popover.show('#mybutton');   
 *   });
 * });
 * </script>
 *
 * <script type="text/ons-template" id="popover.html">
 *   <ons-popover cancelable>
 *     <p style="text-align: center; opacity: 0.5;">This popover will choose which side it's displayed on automatically.</p>
 *   </ons-popover>
 * </script>
 */

/**
 * @ngdoc event
 * @name preshow
 * @description
 *   [en]Fired just before the popover is displayed.[/en]
 *   [ja]ポップオーバーが表示される直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.popover
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Function} event.cancel 
 *   [en]Call this function to stop the popover from being shown.[/en]
 *   [ja]この関数を呼び出すと、ポップオーバーの表示がキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name postshow
 * @description
 *   [en]Fired just after the popover is displayed.[/en]
 *   [ja]ポップオーバーが表示された直後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.popover
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name prehide
 * @description
 *   [en]Fired just before the popover is hidden.[/en]
 *   [ja]ポップオーバーが隠れる直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.popover
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Function} event.cancel 
 *   [en]Call this function to stop the popover from being hidden.[/en]
 *   [ja]この関数を呼び出すと、ポップオーバーが隠れる処理をキャンセルします。[/ja]
 */

/**
 * @ngdoc event
 * @name posthide
 * @description
 *   [en]Fired just after the popover is hidden.[/en]
 *   [ja]ポップオーバーが隠れた後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.popover
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */


/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @extensionOf angular
 * @type {String}
 * @description
 *  [en]Variable name to refer this popover.[/en]
 *  [ja]このポップオーバーを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *  [en]The appearance of the popover.[/en]
 *  [ja]ポップオーバーの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name direction
 * @type {String}
 * @description
 *  [en]
 *    A space separated list of directions. If more than one direction is specified,
 *    it will be chosen automatically. Valid directions are "up", "down", "left" and "right".
 *  [/en]
 *  [ja]
 *    ポップオーバーを表示する方向を空白区切りで複数指定できます。
 *    指定できる方向は、"up", "down", "left", "right"の4つです。空白区切りで複数指定することもできます。
 *    複数指定された場合、対象とする要素に合わせて指定した値から自動的に選択されます。
 *  [/ja]
 */

/**
 * @ngdoc attribute
 * @name cancelable
 * @description
 *   [en]If this attribute is set the popover can be closed by tapping the background or by pressing the back button.[/en]
 *   [ja]この属性があると、ポップオーバーが表示された時に、背景やバックボタンをタップした時にをポップオーバー閉じます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]If this attribute is set the popover is disabled.[/en]
 *   [ja]この属性がある時、ポップオーバーはdisabled状態になります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @description
 *   [en]The animation used when showing an hiding the popover. Can be either "none" or "fade".[/en]
 *   [ja]ポップオーバーを表示する際のアニメーション名を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation-options
 * @type {Expression}
 * @description
 *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/en]
 *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/ja]
 */

/**
 * @ngdoc attribute
 * @name mask-color
 * @type {Color}
 * @description
 *   [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)".[/en]
 *   [ja]背景のマスクの色を指定します。デフォルトは"rgba(0, 0, 0, 0.2)"です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preshow
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prehide
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postshow
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-posthide
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature show(target, [options])
 * @param {String|Event|HTMLElement} target
 *   [en]Target element. Can be either a CSS selector, an event object or a DOM element.[/en]
 *   [ja]ポップオーバーのターゲットとなる要素を指定します。CSSセレクタかeventオブジェクトかDOM要素のいずれかを渡せます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"fade"もしくは"none"を指定できます。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @description
 *   [en]Open the popover and point it at a target. The target can be either an event, a css selector or a DOM element..[/en]
 *   [ja]対象とする要素にポップオーバーを表示します。target引数には、$eventオブジェクトやDOMエレメントやCSSセレクタを渡すことが出来ます。[/ja]
 */

/**
 * @ngdoc method
 * @signature hide([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"fade"もしくは"none"を指定できます。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @description
 *   [en]Close the popover.[/en]
 *   [ja]ポップオーバーを閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature isShown()
 * @return {Boolean}
 *   [en]true if the popover is visible.[/en]
 *   [ja]ポップオーバーが表示されている場合にtrueとなります。[/ja]
 * @description
 *   [en]Returns whether the popover is visible or not.[/en]
 *   [ja]ポップオーバーが表示されているかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature destroy()
 * @description
 *   [en]Destroy the popover and remove it from the DOM tree.[/en]
 *   [ja]ポップオーバーを破棄して、DOMツリーから取り除きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setCancelable(cancelable)
 * @param {Boolean} cancelable
 *   [en]If true the popover will be cancelable.[/en]
 *   [ja]ポップオーバーがキャンセル可能にしたい場合にtrueを指定します。[/ja]
 * @description
 *   [en]Set whether the popover can be canceled by the user when it is shown.[/en]
 *   [ja]ポップオーバーを表示した際に、ユーザがそのポップオーバーをキャンセルできるかどうかを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isCancelable()
 * @return {Boolean}
 *   [en]true if the popover is cancelable.[/en]
 *   [ja]ポップオーバーがキャンセル可能であればtrueとなります。[/ja]
 * @description
 *   [en]Returns whether the popover is cancelable or not.[/en]
 *   [ja]このポップオーバーがキャンセル可能かどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @param {Boolean} disabled
 *   [en]If true the popover will be disabled.[/en]
 *   [ja]ポップオーバーをdisabled状態にしたい場合にはtrueを指定します。[/ja]
 * @description
 *   [en]Disable or enable the popover.[/en]
 *   [ja]このポップオーバーをdisabled状態にするかどうかを設定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @return {Boolean}
 *   [en]true if the popover is disabled.[/en]
 *   [ja]ポップオーバーがdisabled状態であればtrueとなります。[/ja]
 * @description
 *   [en]Returns whether the popover is disabled or enabled.[/en]
 *   [ja]このポップオーバーがdisabled状態かどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @extensionOf angular
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @extensionOf angular
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @extensionOf angular
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsPopover', ['$onsen', 'PopoverView', function($onsen, PopoverView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);
        return {
          pre: function(scope, element, attrs) {
            CustomElements.upgrade(element[0]);

            var popover = new PopoverView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, popover);
            $onsen.registerEventHandlers(popover, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethodsForCustomElements(popover, element);

            element.data('ons-popover', popover);

            scope.$on('$destroy', function() {
              popover._events = undefined;
              $onsen.removeModifierMethods(popover);
              element.data('ons-popover', undefined);
              element = null;
            });

            if ($onsen.isAndroid()) {
              setImmediate(function() {
                popover.addModifier('android');
              });
            }
          },
          post: function(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();


/**
 * @ngdoc directive
 * @id progress
 * @name ons-progress
 * @category progress
 * @description
 *   [en]A material design progress component. Can be displayed both as a linear or circular progress indicator.[/en]
 *   [ja]マテリアルデザインのprgoressコンポーネントです。linearもしくはcircularなプログレスインジケータを表示できます。[/ja]
 * @example
 * <ons-progress
 *  type="circular"
 *  value="55"
 *  secondary-value="87">
 * </ons-progress>
 */

/**
 * @ngdoc attribute
 * @name type
 * @initonly
 * @type {String}
 * @description
 *   [en]The type of indicator. Can be one of either "bar" or "circular". Defaults to "bar".[/en]
 *   [ja]indicatorのタイプを指定します。"bar"もしくは"circular"を指定できます。デフォルトは"bar"です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]Change the appearance of the progress indicator.[/en]
 *   [ja]プログレスインジケータの見た目を変更します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name value
 * @type {Number}
 * @description
 *   [en]Current progress. Should be a value between 0 and 100.[/en]
 *   [ja]現在の進行状況の値を指定します。0から100の間の値を指定して下さい。[/ja]
 */

/**
 * @ngdoc attribute
 * @name secondary-value
 * @type {Number}
 * @description
 *   [en]Current secondary progress. Should be a value between 0 and 100.[/en]
 *   [ja]現在の２番目の進行状況の値を指定します。0から100の間の値を指定して下さい。[/ja]
 */

/**
 * @ngdoc attribute
 * @name indeterminate 
 * @description
 *   [en]If this attribute is set, an infinite looping animation will be shown.[/en]
 *   [ja]この属性が設定された場合、ループするアニメーションが表示されます。[/ja]
 */

/**
 * @ngdoc directive
 * @id pull-hook
 * @name ons-pull-hook
 * @category control
 * @description
 *   [en]Component that adds "pull-to-refresh" to an <ons-page> element.[/en]
 *   [ja]ons-page要素以下でいわゆるpull to refreshを実装するためのコンポーネントです。[/ja]
 * @codepen WbJogM
 * @guide UsingPullHook
 *   [en]How to use Pull Hook[/en]
 *   [ja]プルフックを使う[/ja]
 * @example
 * <script>
 *   ons.bootstrap()
 *
 *   .controller('MyController', function($scope, $timeout) {
 *     $scope.items = [3, 2 ,1];
 *
 *     $scope.load = function($done) {
 *       $timeout(function() {
 *         $scope.items.unshift($scope.items.length + 1);
 *         $done();
 *       }, 1000);
 *     };
 *   });
 * </script>
 *
 * <ons-page ng-controller="MyController">
 *   <ons-pull-hook var="loader" ng-action="load($done)">
 *     <span ng-switch="loader.getCurrentState()">
 *       <span ng-switch-when="initial">Pull down to refresh</span>
 *       <span ng-switch-when="preaction">Release to refresh</span>
 *       <span ng-switch-when="action">Loading data. Please wait...</span>
 *     </span>
 *   </ons-pull-hook>
 *   <ons-list>
 *     <ons-list-item ng-repeat="item in items">
 *       Item #{{ item }}
 *     </ons-list-item>
 *   </ons-list>
 * </ons-page>
 */

/**
 * @ngdoc event
 * @name changestate
 * @description
 *   [en]Fired when the state is changed. The state can be either "initial", "preaction" or "action".[/en]
 *   [ja]コンポーネントの状態が変わった場合に発火します。状態は、"initial", "preaction", "action"のいずれかです。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.pullHook
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {String} event.state
 *   [en]Current state.[/en]
 *   [ja]現在の状態名を参照できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @extensionOf angular
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this component.[/en]
 *   [ja]このコンポーネントを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]If this attribute is set the "pull-to-refresh" functionality is disabled.[/en]
 *   [ja]この属性がある時、disabled状態になりアクションが実行されなくなります[/ja]
 */

/**
 * @ngdoc attribute
 * @name ng-action
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *   [en]Use to specify custom behavior when the page is pulled down. A <code>$done</code> function is available to tell the component that the action is completed.[/en]
 *   [ja]pull downしたときの振る舞いを指定します。アクションが完了した時には<code>$done</code>関数を呼び出します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name on-action
 * @type {Expression}
 * @description
 *   [en]Same as <code>ng-action</code> but can be used without AngularJS. A function called <code>done</code> is available to call when action is complete.[/en]
 *   [ja]<code>ng-action</code>と同じですが、AngularJS無しで利用する場合に利用できます。アクションが完了した時には<code>done</code>関数を呼び出します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name height
 * @type {String}
 * @description
 *   [en]Specify the height of the component. When pulled down further than this value it will switch to the "preaction" state. The default value is "64px".[/en]
 *   [ja]コンポーネントの高さを指定します。この高さ以上にpull downすると"preaction"状態に移行します。デフォルトの値は"64px"です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name threshold-height
 * @type {String}
 * @description
 *   [en]Specify the threshold height. The component automatically switches to the "action" state when pulled further than this value. The default value is "96px". A negative value or a value less than the height will disable this property.[/en]
 *   [ja]閾値となる高さを指定します。この値で指定した高さよりもpull downすると、このコンポーネントは自動的に"action"状態に移行します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name fixed-content
 * @description
 *   [en]If this attribute is set the content of the page will not move when pulling.[/en]
 *   [ja]この属性がある時、プルフックが引き出されている時にもコンテンツは動きません。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-changestate
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "changestate" event is fired.[/en]
 *  [ja]"changestate"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @param {Boolean} disabled
 *   [en]If true the pull hook will be disabled.[/en]
 *   [ja]trueを指定すると、プルフックがdisabled状態になります。[/ja]
 * @description
 *   [en]Disable or enable the component.[/en]
 *   [ja]disabled状態にするかどうかを設定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @return {Boolean}
 *   [en]true if the pull hook is disabled.[/en]
 *   [ja]プルフックがdisabled状態の場合、trueを返します。[/ja]
 * @description
 *   [en]Returns whether the component is disabled or enabled.[/en]
 *   [ja]disabled状態になっているかを得ることが出来ます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getHeight()
 * @description
 *   [en]Returns the height of the pull hook in pixels.[/en]
 *   [ja]プルフックの高さをピクセル数で返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setHeight(height)
 * @param {Number} height
 *   [en]Desired height.[/en]
 *   [ja]要素の高さを指定します。[/ja]
 * @description
 *   [en]Specify the height.[/en]
 *   [ja]高さを指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getThresholdHeight()
 * @description
 *   [en]Returns the height of the threshold in pixels.[/en]
 *   [ja]閾値、となる高さをピクセル数で返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setThresholdHeight(thresholdHeight)
 * @param {Number} thresholdHeight
 *   [en]Desired threshold height.[/en]
 *   [ja]プルフックのアクションを起こす閾値となる高さを指定します。[/ja]
 * @description
 *   [en]Specify the threshold height.[/en]
 *   [ja]閾値となる高さを指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getPullDistance()
 * @description
 *   [en]Returns the current number of pixels the pull hook has moved.[/en]
 *   [ja]現在のプルフックが引き出された距離をピクセル数で返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getCurrentState()
 * @description
 *   [en]Returns the current state of the element.[/en]
 *   [ja]要素の現在の状態を返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @extensionOf angular
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @extensionOf angular
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @extensionOf angular
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function() {
  'use strict';


  /**
   * Pull hook directive.
   */
  angular.module('onsen').directive('onsPullHook', ['$onsen', 'PullHookView', function($onsen, PullHookView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);
        return {
          pre: function(scope, element, attrs) {
            CustomElements.upgrade(element[0]);
            var pullHook = new PullHookView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, pullHook);
            $onsen.registerEventHandlers(pullHook, 'changestate destroy');
            element.data('ons-pull-hook', pullHook);

            scope.$on('$destroy', function() {
              pullHook._events = undefined;
              element.data('ons-pull-hook', undefined);
              scope = element = attrs = null;
            });
          },
          post: function(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);

})();

/**
 * @ngdoc directive
 * @id ripple
 * @name ons-ripple
 * @category form
 * @description
 *   [en]Adds a Material Design "ripple" effect to an element.[/en]
 *   [ja]マテリアルデザインのリップル効果をDOM要素に追加します。[/ja]
 * @example
 * <ons-list>
 *   <ons-list-item>
 *    <ons-ripple color="rgba(0, 0, 0, 0.3)"></ons-ripple>
 *    Click me!
 *   </ons-list-item>
 * </ons-list>
 *
 * <ons-ripple target="children" color="rgba(0, 0, 0, 0.3)">
 *   <p>Click me!</p>
 * </ons-ripple>
 */

/**
 * @ngdoc attribute
 * @name color
 * @type {String}
 * @description
 *   [en]Color of the ripple effect.[/en]
 *   [ja]リップルエフェクトの色を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name center
 * @description
 *   [en]If this attribute is set, the effect will originate from the center.[/en]
 *   [ja]この属性が設定された場合、その効果は要素の中央から始まります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name target
 * @type {String}
 * @description
 *   [en]If this attribute is set to children, the effect will be applied to the children of the component instead of the parent.[/en]
 *   [ja]この属性に"children"を設定されたとき、リップルエフェクトはこのコンポーネントの子要素に適用されます。そうでなければ、親要素に適用されます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]If this attribute is set, the ripple effect will be disabled.[/en]
 *   [ja]この属性が設定された場合、リップルエフェクトは無効になります。[/ja]
 */

(function() {
  'use strict';

  angular.module('onsen').directive('onsRipple', ['$onsen', 'GenericView', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        GenericView.register(scope, element, attrs, {viewKey: 'ons-ripple'});
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id row
 * @name ons-row
 * @category grid
 * @description
 *   [en]Represents a row in the grid system. Use with ons-col to layout components.[/en]
 *   [ja]グリッドシステムにて行を定義します。ons-colとともに使用し、コンポーネントの配置に使用します。[/ja]
 * @codepen GgujC {wide}
 * @guide Layouting
 *   [en]Layouting guide[/en]
 *   [ja]レイアウト調整[/ja]
 * @seealso ons-col
 *   [en]ons-col component[/en]
 *   [ja]ons-colコンポーネント[/ja]
 * @note
 *   [en]For Android 4.3 and earlier, and iOS6 and earlier, when using mixed alignment with ons-row and ons-col, they may not be displayed correctly. You can use only one vertical-align.[/en]
 *   [ja]Android 4.3以前、もしくはiOS 6以前のOSの場合、ons-rowとons-colを組み合わせてそれぞれのons-col要素のvertical-align属性の値に別々の値を指定すると、描画が崩れる場合があります。vertical-align属性の値には一つの値だけを指定できます。[/ja]
 * @example
 * <ons-row>
 *   <ons-col width="50px"><ons-icon icon="fa-twitter"></ons-icon></ons-col>
 *   <ons-col>Text</ons-col>
 * </ons-row>
 */

/**
 * @ngdoc attribute
 * @name vertical-align
 * @type {String}
 * @description
 *   [en]Short hand attribute for aligning vertically. Valid values are top, bottom, and center.[/en]
 *   [ja]縦に整列するために指定します。top、bottom、centerのいずれかを指定できます。[/ja]
 */

/**
 * @ngdoc directive
 * @id scope
 * @name ons-scope
 * @category util
 * @extensionOf angular
 * @description
 *   [en]All child elements using the "var" attribute will be attached to the scope of this element.[/en]
 *   [ja]"var"属性を使っている全ての子要素のviewオブジェクトは、この要素のAngularJSスコープに追加されます。[/ja]
 * @example
 * <ons-list>
 *   <ons-list-item ons-scope ng-repeat="item in items">
 *     <ons-carousel var="carousel">
 *       <ons-carousel-item ng-click="carousel.next()">
 *         {{ item }}
 *       </ons-carousel-item>
 *       </ons-carousel-item ng-click="carousel.prev()">
 *         ...
 *       </ons-carousel-item>
 *     </ons-carousel>
 *   </ons-list-item>
 * </ons-list>
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsScope', ['$onsen', function($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,

      link: function(scope, element) {
        element.data('_scope', scope);

        scope.$on('$destroy', function() {
          element.data('_scope', undefined);
        });
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id scroller
 * @name ons-scroller
 * @category page
 * @description
 *   [en]Makes the content inside this tag scrollable.[/en]
 *   [ja]要素内をスクロール可能にします。[/ja]
 * @example
 * <ons-scroller style="height: 200px; width: 100%">
 *   ...
 * </ons-scroller>
 */

/**
 * @ngdoc directive
 * @id sliding_menu
 * @name ons-sliding-menu
 * @category navigation
 * @extensionOf angular
 * @description
 *   [en]Component for sliding UI where one page is overlayed over another page. The above page can be slided aside to reveal the page behind.[/en]
 *   [ja]スライディングメニューを表現するためのコンポーネントで、片方のページが別のページの上にオーバーレイで表示されます。above-pageで指定されたページは、横からスライドして表示します。[/ja]
 * @codepen IDvFJ
 * @seealso ons-page
 *   [en]ons-page component[/en]
 *   [ja]ons-pageコンポーネント[/ja]
 * @guide UsingSlidingMenu
 *   [en]Using sliding menu[/en]
 *   [ja]スライディングメニューを使う[/ja]
 * @guide EventHandling
 *   [en]Using events[/en]
 *   [ja]イベントの利用[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @example
 * <ons-sliding-menu var="app.menu" main-page="page.html" menu-page="menu.html" max-slide-distance="200px" type="reveal" side="left">
 * </ons-sliding-menu>
 *
 * <ons-template id="page.html">
 *   <ons-page>
 *    <p style="text-align: center">
 *      <ons-button ng-click="app.menu.toggleMenu()">Toggle</ons-button>
 *    </p>
 *   </ons-page>
 * </ons-template>
 *
 * <ons-template id="menu.html">
 *   <ons-page>
 *     <!-- menu page's contents -->
 *   </ons-page>
 * </ons-template>
 *
 */

/**
 * @ngdoc event
 * @name preopen
 * @description
 *   [en]Fired just before the sliding menu is opened.[/en]
 *   [ja]スライディングメニューが開く前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.slidingMenu
 *   [en]Sliding menu view object.[/en]
 *   [ja]イベントが発火したSlidingMenuオブジェクトです。[/ja]
 */

/**
 * @ngdoc event
 * @name postopen
 * @description
 *   [en]Fired just after the sliding menu is opened.[/en]
 *   [ja]スライディングメニューが開き終わった後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.slidingMenu
 *   [en]Sliding menu view object.[/en]
 *   [ja]イベントが発火したSlidingMenuオブジェクトです。[/ja]
 */

/**
 * @ngdoc event
 * @name preclose
 * @description
 *   [en]Fired just before the sliding menu is closed.[/en]
 *   [ja]スライディングメニューが閉じる前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.slidingMenu
 *   [en]Sliding menu view object.[/en]
 *   [ja]イベントが発火したSlidingMenuオブジェクトです。[/ja]
 */

/**
 * @ngdoc event
 * @name postclose
 * @description
 *   [en]Fired just after the sliding menu is closed.[/en]
 *   [ja]スライディングメニューが閉じ終わった後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.slidingMenu
 *   [en]Sliding menu view object.[/en]
 *   [ja]イベントが発火したSlidingMenuオブジェクトです。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this sliding menu.[/en]
 *  [ja]このスライディングメニューを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name menu-page
 * @initonly
 * @type {String}
 * @description
 *   [en]The url of the menu page.[/en]
 *   [ja]左に位置するメニューページのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name main-page
 * @initonly
 * @type {String}
 * @description
 *   [en]The url of the main page.[/en]
 *   [ja]右に位置するメインページのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name swipeable
 * @initonly
 * @type {Boolean}
 * @description
 *   [en]Whether to enable swipe interaction.[/en]
 *   [ja]スワイプ操作を有効にする場合に指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name swipe-target-width
 * @initonly
 * @type {String}
 * @description
 *   [en]The width of swipeable area calculated from the left (in pixels). Use this to enable swipe only when the finger touch on the screen edge.[/en]
 *   [ja]スワイプの判定領域をピクセル単位で指定します。画面の端から指定した距離に達するとページが表示されます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name max-slide-distance
 * @initonly
 * @type {String}
 * @description
 *   [en]How far the menu page will slide open. Can specify both in px and %. eg. 90%, 200px[/en]
 *   [ja]menu-pageで指定されたページの表示幅を指定します。ピクセルもしくは%の両方で指定できます（例: 90%, 200px）[/ja]
 */

/**
 * @ngdoc attribute
 * @name side
 * @initonly
 * @type {String}
 * @description
 *   [en]Specify which side of the screen the menu page is located on. Possible values are "left" and "right".[/en]
 *   [ja]menu-pageで指定されたページが画面のどちら側から表示されるかを指定します。leftもしくはrightのいずれかを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name type
 * @initonly
 * @type {String}
 * @description
 *   [en]Sliding menu animator. Possible values are reveal (default), push and overlay.[/en]
 *   [ja]スライディングメニューのアニメーションです。"reveal"（デフォルト）、"push"、"overlay"のいずれかを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preopen
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preopen" event is fired.[/en]
 *  [ja]"preopen"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preclose
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preclose" event is fired.[/en]
 *  [ja]"preclose"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postopen
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postopen" event is fired.[/en]
 *  [ja]"postopen"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postclose
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postclose" event is fired.[/en]
 *  [ja]"postclose"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-init
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "init" event is fired.[/en]
 *  [ja]ページの"init"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-show
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "show" event is fired.[/en]
 *  [ja]ページの"show"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-hide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "hide" event is fired.[/en]
 *  [ja]ページの"hide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "destroy" event is fired.[/en]
 *  [ja]ページの"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setMainPage(pageUrl, [options])
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Boolean} [options.closeMenu]
 *   [en]If true the menu will be closed.[/en]
 *   [ja]trueを指定すると、開いているメニューを閉じます。[/ja]
 * @param {Function} [options.callback]
 *   [en]Function that is executed after the page has been set.[/en]
 *   [ja]ページが読み込まれた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the main contents pane.[/en]
 *   [ja]中央部分に表示されるページをpageUrlに指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setMenuPage(pageUrl, [options])
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Boolean} [options.closeMenu]
 *   [en]If true the menu will be closed after the menu page has been set.[/en]
 *   [ja]trueを指定すると、開いているメニューを閉じます。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be executed after the menu page has been set.[/en]
 *   [ja]メニューページが読み込まれた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the side menu pane.[/en]
 *   [ja]メニュー部分に表示されるページをpageUrlに指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature openMenu([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been opened.[/en]
 *   [ja]メニューが開いた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Slide the above layer to reveal the layer behind.[/en]
 *   [ja]メニューページを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature closeMenu([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been closed.[/en]
 *   [ja]メニューが閉じられた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Slide the above layer to hide the layer behind.[/en]
 *   [ja]メニューページを非表示にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature toggleMenu([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been opened or closed.[/en]
 *   [ja]メニューが開き終わった後か、閉じ終わった後に呼び出される関数オブジェクトです。[/ja]
 * @description
 *   [en]Slide the above layer to reveal the layer behind if it is currently hidden, otherwise, hide the layer behind.[/en]
 *   [ja]現在の状況に合わせて、メニューページを表示もしくは非表示にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature isMenuOpened()
 * @return {Boolean}
 *   [en]true if the menu is currently open.[/en]
 *   [ja]メニューが開いていればtrueとなります。[/ja]
 * @description
 *   [en]Returns true if the menu page is open, otherwise false.[/en]
 *   [ja]メニューページが開いている場合はtrue、そうでない場合はfalseを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back button handler.[/en]
 *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
 * @description
 *   [en]Retrieve the back-button handler.[/en]
 *   [ja]ons-sliding-menuに紐付いているバックボタンハンドラを取得します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setSwipeable(swipeable)
 * @param {Boolean} swipeable
 *   [en]If true the menu will be swipeable.[/en]
 *   [ja]スワイプで開閉できるようにする場合にはtrueを指定します。[/ja]
 * @description
 *   [en]Specify if the menu should be swipeable or not.[/en]
 *   [ja]スワイプで開閉するかどうかを設定する。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsSlidingMenu', ['$compile', 'SlidingMenuView', '$onsen', function($compile, SlidingMenuView, $onsen) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: true,

      compile: function(element, attrs) {
        var main = element[0].querySelector('.main'),
            menu = element[0].querySelector('.menu');

        if (main) {
          var mainHtml = angular.element(main).remove().html().trim();
        }

        if (menu) {
          var menuHtml = angular.element(menu).remove().html().trim();
        }

        return function(scope, element, attrs) {
          element.append(angular.element('<div></div>').addClass('onsen-sliding-menu__menu ons-sliding-menu-inner'));
          element.append(angular.element('<div></div>').addClass('onsen-sliding-menu__main ons-sliding-menu-inner'));

          var slidingMenu = new SlidingMenuView(scope, element, attrs);

          $onsen.registerEventHandlers(slidingMenu, 'preopen preclose postopen postclose init show hide destroy');

          if (mainHtml && !attrs.mainPage) {
            slidingMenu._appendMainPage(null, mainHtml);
          }

          if (menuHtml && !attrs.menuPage) {
            slidingMenu._appendMenuPage(menuHtml);
          }

          $onsen.declareVarAttribute(attrs, slidingMenu);
          element.data('ons-sliding-menu', slidingMenu);

          scope.$on('$destroy', function(){
            slidingMenu._events = undefined;
            element.data('ons-sliding-menu', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id speed-dial
 * @name ons-speed-dial
 * @category speeddial
 * @description
 *   [en]Element that displays a Material Design Speed Dialog component.[/en]
 *   [ja]Material DesignのSpeed dialコンポーネントを表現する要素です。[/ja]
 * @seealso ons-speed-dial-item
 *   [en]ons-speed-dial-item component[/en]
 *   [ja]ons-speed-dial-itemコンポーネント[/ja]
 * @example
 * <ons-speed-dial position="left bottom">
 *   <ons-icon
 *     icon="fa-twitter"
 *     size="26px"
 *     fixed-width="false"
 *     style="vertical-align:middle;">
 *   </ons-icon>
 *   <ons-speed-dial-item><ons-ripple></ons-ripple>C</ons-speed-dial-item>
 *   <ons-speed-dial-item><ons-ripple></ons-ripple>B</ons-speed-dial-item>
 *   <ons-speed-dial-item><ons-ripple></ons-ripple>A</ons-speed-dial-item>
 * </ons-speed-dial>
 */

/**
 * @ngdoc attribute
 * @name position
 * @type {String}
 * @description
 *   [en]
 *     Specify the vertical and horizontal position of the component.
 *     I.e. to display it in the top right corner specify "right top".
 *     Choose from "right", "left", "top" and "bottom".
 *   [/en]
 *   [ja]
 *     この要素を表示する左右と上下の位置を指定します。
 *     例えば、右上に表示する場合には"right top"を指定します。
 *     左右と上下の位置の指定には、rightとleft、topとbottomがそれぞれ指定できます。
 *   [/ja]
 */

/**
 * @ngdoc attribute
 * @name direction
 * @type {String}
 * @description
 *   [en]Specify the direction the items are displayed. Possible values are "up", "down", "left" and "right".[/en]
 *   [ja]
 *     要素が表示する方向を指定します。up, down, left, rightが指定できます。
 *   [/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]Specify if button should be disabled.[/en]
 *   [ja]無効化する場合に指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature show()
 * @description
 *   [en]Show the speed dial.[/en]
 *   [ja]Speed dialを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature hide()
 * @description
 *   [en]Hide the speed dial.[/en]
 *   [ja]Speed dialを非表示にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature showItems()
 * @description
 *   [en]Show the speed dial items.[/en]
 *   [ja]Speed dialの子要素を表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature hideItems()
 * @description
 *   [en]Hide the speed dial items.[/en]
 *   [ja]Speed dialの子要素を非表示にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature toggle()
 * @description
 *   [en]Toggle visibility.[/en]
 *   [ja]Speed dialの表示非表示を切り替えます。[/ja]
 */

/**
 * @ngdoc method
 * @signature toggleItems()
 * @description
 *   [en]Toggle item visibility.[/en]
 *   [ja]Speed dialの子要素の表示非表示を切り替えます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @description
 *   [en]Disable or enable the element.[/en]
 *   [ja]disabled状態にするかどうかを設定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @return {Boolean}
 *   [en]true if the element is disabled.[/en]
 *   [ja]disabled状態になっているかどうかを返します。[/ja]
 * @description
 *   [en]Returns whether the component is enabled or not.[/en]
 *   [ja]この要素を無効化するかどうかを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isInline()
 * @description
 *   [en]Returns whether the component is inline or not.[/en]
 *   [ja]この要素がインライン要素かどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isShown()
 * @return {Boolean}
 *   [en]True if the component is visible.[/en]
 *   [ja]表示されているかどうかを返します。[/ja]
 * @description
 *   [en]Return whether the component is visible or not.[/en]
 *   [ja]表示されているかどうかを返します。[/ja]
 */

/**
 * @ngdoc directive
 * @id speed-dial-item
 * @name ons-speed-dial-item
 * @category speeddial
 * @description
 *   [en]This component displays the child elements of the Material Design Speed dial component.[/en]
 *   [ja]Material DesignのSpeed dialの子要素を表現する要素です。[/ja]
 * @seealso ons-speed-dial
 *   [en]ons-speed-dial component[/en]
 *   [ja]ons-speed-dialコンポーネント[/ja]
 * @example
 * <ons-speed-dial position="left bottom">
 *   <ons-icon
 *     icon="fa-twitter"
 *     size="26px"
 *     fixed-width="false"
 *     style="vertical-align:middle;">
 *   </ons-icon>
 *   <ons-speed-dial-item><ons-ripple></ons-ripple>C</ons-speed-dial-item>
 *   <ons-speed-dial-item><ons-ripple></ons-ripple>B</ons-speed-dial-item>
 *   <ons-speed-dial-item><ons-ripple></ons-ripple>A</ons-speed-dial-item>
 * </ons-speed-dial>
 */


/**
 * @ngdoc directive
 * @id split-view
 * @name ons-split-view
 * @extensionOf angular
 * @category control
 * @description
 *  [en]Divides the screen into a left and right section.[/en]
 *  [ja]画面を左右に分割するコンポーネントです。[/ja]
 * @codepen nKqfv {wide}
 * @guide Usingonssplitviewcomponent
 *   [en]Using ons-split-view.[/en]
 *   [ja]ons-split-viewコンポーネントを使う[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @example
 * <ons-split-view
 *   secondary-page="secondary.html"
 *   main-page="main.html"
 *   main-page-width="70%"
 *   collapse="portrait">
 * </ons-split-view>
 */

/**
 * @ngdoc event
 * @name update
 * @description
 *   [en]Fired when the split view is updated.[/en]
 *   [ja]split viewの状態が更新された際に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.splitView
 *   [en]Split view object.[/en]
 *   [ja]イベントが発火したSplitViewオブジェクトです。[/ja]
 * @param {Boolean} event.shouldCollapse
 *   [en]True if the view should collapse.[/en]
 *   [ja]collapse状態の場合にtrueになります。[/ja]
 * @param {String} event.currentMode
 *   [en]Current mode.[/en]
 *   [ja]現在のモード名を返します。"collapse"か"split"かのいずれかです。[/ja]
 * @param {Function} event.split
 *   [en]Call to force split.[/en]
 *   [ja]この関数を呼び出すと強制的にsplitモードにします。[/ja]
 * @param {Function} event.collapse
 *   [en]Call to force collapse.[/en]
 *   [ja]この関数を呼び出すと強制的にcollapseモードにします。[/ja]
 * @param {Number} event.width
 *   [en]Current width.[/en]
 *   [ja]現在のSplitViewの幅を返します。[/ja]
 * @param {String} event.orientation
 *   [en]Current orientation.[/en]
 *   [ja]現在の画面のオリエンテーションを返します。"portrait"かもしくは"landscape"です。 [/ja]
 */

/**
 * @ngdoc event
 * @name presplit
 * @description
 *   [en]Fired just before the view is split.[/en]
 *   [ja]split状態にる前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.splitView
 *   [en]Split view object.[/en]
 *   [ja]イベントが発火したSplitViewオブジェクトです。[/ja]
 * @param {Number} event.width
 *   [en]Current width.[/en]
 *   [ja]現在のSplitViewnの幅です。[/ja]
 * @param {String} event.orientation
 *   [en]Current orientation.[/en]
 *   [ja]現在の画面のオリエンテーションを返します。"portrait"もしくは"landscape"です。[/ja]
 */

/**
 * @ngdoc event
 * @name postsplit
 * @description
 *   [en]Fired just after the view is split.[/en]
 *   [ja]split状態になった後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.splitView
 *   [en]Split view object.[/en]
 *   [ja]イベントが発火したSplitViewオブジェクトです。[/ja]
 * @param {Number} event.width
 *   [en]Current width.[/en]
 *   [ja]現在のSplitViewnの幅です。[/ja]
 * @param {String} event.orientation
 *   [en]Current orientation.[/en]
 *   [ja]現在の画面のオリエンテーションを返します。"portrait"もしくは"landscape"です。[/ja]
 */

/**
 * @ngdoc event
 * @name precollapse
 * @description
 *   [en]Fired just before the view is collapsed.[/en]
 *   [ja]collapse状態になる前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.splitView
 *   [en]Split view object.[/en]
 *   [ja]イベントが発火したSplitViewオブジェクトです。[/ja]
 * @param {Number} event.width
 *   [en]Current width.[/en]
 *   [ja]現在のSplitViewnの幅です。[/ja]
 * @param {String} event.orientation
 *   [en]Current orientation.[/en]
 *   [ja]現在の画面のオリエンテーションを返します。"portrait"もしくは"landscape"です。[/ja]
 */

/**
 * @ngdoc event
 * @name postcollapse
 * @description
 *   [en]Fired just after the view is collapsed.[/en]
 *   [ja]collapse状態になった後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.splitView
 *   [en]Split view object.[/en]
 *   [ja]イベントが発火したSplitViewオブジェクトです。[/ja]
 * @param {Number} event.width
 *   [en]Current width.[/en]
 *   [ja]現在のSplitViewnの幅です。[/ja]
 * @param {String} event.orientation
 *   [en]Current orientation.[/en]
 *   [ja]現在の画面のオリエンテーションを返します。"portrait"もしくは"landscape"です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this split view.[/en]
 *   [ja]このスプリットビューコンポーネントを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @initonly
 * @name main-page
 * @type {String}
 * @description
 *   [en]The url of the page on the right.[/en]
 *   [ja]右側に表示するページのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name main-page-width
 * @initonly
 * @type {Number}
 * @description
 *   [en]Main page width percentage. The secondary page width will be the remaining percentage.[/en]
 *   [ja]右側のページの幅をパーセント単位で指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name secondary-page
 * @initonly
 * @type {String}
 * @description
 *   [en]The url of the page on the left.[/en]
 *   [ja]左側に表示するページのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name collapse
 * @initonly
 * @type {String}
 * @description
 *   [en]
 *     Specify the collapse behavior. Valid values are portrait, landscape, width #px or a media query.
 *     "portrait" or "landscape" means the view will collapse when device is in landscape or portrait orientation.
 *     "width #px" means the view will collapse when the window width is smaller than the specified #px.
 *     If the value is a media query, the view will collapse when the media query is true.
 *   [/en]
 *   [ja]
 *     左側のページを非表示にする条件を指定します。portrait, landscape、width #pxもしくはメディアクエリの指定が可能です。
 *     portraitもしくはlandscapeを指定すると、デバイスの画面が縦向きもしくは横向きになった時に適用されます。
 *     width #pxを指定すると、画面が指定した横幅よりも短い場合に適用されます。
 *     メディアクエリを指定すると、指定したクエリに適合している場合に適用されます。
 *   [/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-update
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "update" event is fired.[/en]
 *  [ja]"update"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-presplit
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "presplit" event is fired.[/en]
 *  [ja]"presplit"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-precollapse
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "precollapse" event is fired.[/en]
 *  [ja]"precollapse"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postsplit
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postsplit" event is fired.[/en]
 *  [ja]"postsplit"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postcollapse
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postcollapse" event is fired.[/en]
 *  [ja]"postcollapse"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-init
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "init" event is fired.[/en]
 *  [ja]ページの"init"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-show
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "show" event is fired.[/en]
 *  [ja]ページの"show"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-hide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "hide" event is fired.[/en]
 *  [ja]ページの"hide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "destroy" event is fired.[/en]
 *  [ja]ページの"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setMainPage(pageUrl)
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <ons-template>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the right section[/en]
 *   [ja]指定したURLをメインページを読み込みます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setSecondaryPage(pageUrl)
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <ons-template>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the left section[/en]
 *   [ja]指定したURLを左のページの読み込みます。[/ja]
 */

/**
 * @ngdoc method
 * @signature update()
 * @description
 *   [en]Trigger an 'update' event and try to determine if the split behavior should be changed.[/en]
 *   [ja]splitモードを変えるべきかどうかを判断するための'update'イベントを発火します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsSplitView', ['$compile', 'SplitView', '$onsen', function($compile, SplitView, $onsen) {

    return {
      restrict: 'E',
      replace: false,
      transclude: false,
      scope: true,

      compile: function(element, attrs) {
        var mainPage = element[0].querySelector('.main-page'),
            secondaryPage = element[0].querySelector('.secondary-page');

        if (mainPage) {
          var mainHtml = angular.element(mainPage).remove().html().trim();
        }

        if (secondaryPage) {
          var secondaryHtml = angular.element(secondaryPage).remove().html().trim();
        }

        return function(scope, element, attrs) {
          element.append(angular.element('<div></div>').addClass('onsen-split-view__secondary full-screen ons-split-view-inner'));
          element.append(angular.element('<div></div>').addClass('onsen-split-view__main full-screen ons-split-view-inner'));

          var splitView = new SplitView(scope, element, attrs);

          if (mainHtml && !attrs.mainPage) {
            splitView._appendMainPage(mainHtml);
          }

          if (secondaryHtml && !attrs.secondaryPage) {
            splitView._appendSecondPage(secondaryHtml);
          }

          $onsen.declareVarAttribute(attrs, splitView);
          $onsen.registerEventHandlers(splitView, 'update presplit precollapse postsplit postcollapse init show hide destroy');

          element.data('ons-split-view', splitView);

          scope.$on('$destroy', function() {
            splitView._events = undefined;
            element.data('ons-split-view', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id splitter
 * @name ons-splitter
 * @category control
 * @description
 *  [en]A component that enables responsive layout by implementing both a two-column layout and a sliding menu layout.[/en]
 *  [ja]sliding-menuとsplit-view両方の機能を持つレイアウトです。[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using components from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @example
 * <ons-splitter>
 *   <ons-splitter-content>
 *     ...
 *   </ons-splitter-content>
 *
 *   <ons-splitter-side side="left" width="80%" collapse>
 *     ...
 *   </ons-splitter-side>
 * </ons-splitter>
 */

/**
 * @ngdoc attribute
 * @name var
 * @extensionOf angular
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this split view.[/en]
 *   [ja]このスプリットビューコンポーネントを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @extensionOf angular
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature openRight([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been opened.[/en]
 *   [ja]メニューが開いた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Open right ons-splitter-side menu on collapse mode.[/en]
 *   [ja]右のcollapseモードになっているons-splitter-side要素を開きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature openLeft([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been opened.[/en]
 *   [ja]メニューが開いた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Open left ons-splitter-side menu on collapse mode.[/en]
 *   [ja]左のcollapseモードになっているons-splitter-side要素を開きます。[/ja]
 */
 
/**
 * @ngdoc method
 * @signature closeRight([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been closed.[/en]
 *   [ja]メニューが閉じた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Close right ons-splitter-side menu on collapse mode.[/en]
 *   [ja]右のcollapseモードになっているons-splitter-side要素を閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature closeLeft([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been closed.[/en]
 *   [ja]メニューが閉じた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Close left ons-splitter-side menu on collapse mode.[/en]
 *   [ja]左のcollapseモードになっているons-splitter-side要素を閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature loadContentPage(pageUrl)
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the ons-splitter-content pane.[/en]
 *   [ja]ons-splitter-content用紙に表示されるページをpageUrlに指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature loadContentPage(pageUrl)
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the ons-splitter-content pane.[/en]
 *   [ja]ons-splitter-content用紙に表示されるページをpageUrlに指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature leftIsOpened()
 * @return {Boolean}
 *   [en]Whether the left ons-splitter-side on collapse mode is opened.[/en]
 *   [ja]左のons-splitter-sideが開いているかどうかを返します。[/ja]
 * @description
 *   [en]Determines whether the left ons-splitter-side on collapse mode is opened.[/en]
 *   [ja]左のons-splitter-side要素が開いているかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature rightIsOpened()
 * @return {Boolean}
 *   [en]Whether the right ons-splitter-side on collapse mode is opened.[/en]
 *   [ja]右のons-splitter-sideが開いているかどうかを返します。[/ja]
 * @description
 *   [en]Determines whether the right ons-splitter-side on collapse mode is opened.[/en]
 *   [ja]右のons-splitter-side要素が開いているかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back-button handler.[/en]
 *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
 * @description
 *   [en]Retrieve the back-button handler.[/en]
 *   [ja]ons-splitter要素に紐付いているバックボタンハンドラを取得します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @extensionOf angular
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @extensionOf angular
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @extensionOf angular
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function() {
  'use strict';

  angular.module('onsen').directive('onsSplitter', ['$compile', 'Splitter', '$onsen', function($compile, Splitter, $onsen) {
    return {
      restrict: 'E',
      scope: true,

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);

        return function(scope, element, attrs) {
          CustomElements.upgrade(element[0]);

          var splitter = new Splitter(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, splitter);
          $onsen.registerEventHandlers(splitter, 'destroy');

          element.data('ons-splitter', splitter);

          scope.$on('$destroy', function() {
            splitter._events = undefined;
            element.data('ons-splitter', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id splitter-content
 * @name ons-splitter-content
 * @category control
 * @description
 *  [en]The "ons-splitter-content" element is used as a child element of "ons-splitter".[/en]
 *  [ja]ons-splitter-content要素は、ons-splitter要素の子要素として利用します。[/ja]
 * @example
 * <ons-splitter>
 *   <ons-splitter-content>
 *     ...
 *   </ons-splitter-content>
 *
 *   <ons-splitter-side side="left" width="80%" collapse>
 *     ...
 *   </ons-splitter-side>
 * </ons-splitter>
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @extensionOf angular
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name page
 * @initonly
 * @type {String}
 * @description
 *   [en]The url of the menu page.[/en]
 *   [ja]ons-splitter-side要素に表示するページのURLを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature load(pageUrl)
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <ons-template>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the right section[/en]
 *   [ja]指定したURLをメインページを読み込みます。[/ja]
 */

(function() {
  'use strict';

  var lastReady = window.OnsSplitterContentElement.rewritables.ready;
  window.OnsSplitterContentElement.rewritables.ready = ons._waitDiretiveInit('ons-splitter-content', lastReady);

  var lastLink = window.OnsSplitterContentElement.rewritables.link;
  window.OnsSplitterContentElement.rewritables.link = function(element, target, callback) {
    var view = angular.element(element).data('ons-splitter-content');
    lastLink(element, target, function(target) {
      view._link(target, callback);
    });
  };

  angular.module('onsen').directive('onsSplitterContent', ['$compile', 'SplitterContent', '$onsen', function($compile, SplitterContent, $onsen) {
    return {
      restrict: 'E',

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);

        return function(scope, element, attrs) {
          CustomElements.upgrade(element[0]);

          var view = new SplitterContent(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, view);
          $onsen.registerEventHandlers(view, 'destroy');

          element.data('ons-splitter-content', view);

          scope.$on('$destroy', function() {
            view._events = undefined;
            element.data('ons-splitter-content', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id splitter-side
 * @name ons-splitter-side
 * @category control
 * @description
 *  [en]The "ons-splitter-side" element is used as a child element of "ons-splitter".[/en]
 *  [ja]ons-splitter-side要素は、ons-splitter要素の子要素として利用します。[/ja]
 * @example
 * <ons-splitter>
 *   <ons-splitter-content>
 *     ...
 *   </ons-splitter-content>
 *
 *   <ons-splitter-side side="left" width="80%" collapse>
 *     ...
 *   </ons-splitter-side>
 * </ons-splitter>
 */

/**
 * @ngdoc event
 * @name modechange
 * @description
 *   [en]Fired just after the component's mode changes.[/en]
 *   [ja]この要素のモードが変化した際に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.side
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {String} event.mode
 *   [en]Returns the current mode. Can be either "collapse" or "split".[/en]
 *   [ja]現在のモードを返します。[/ja]
 */

/**
 * @ngdoc event
 * @name preopen
 * @description
 *   [en]Fired just before the sliding menu is opened.[/en]
 *   [ja]スライディングメニューが開く前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Function} event.cancel
 *   [en]Call to cancel opening sliding menu.[/en]
 *   [ja]スライディングメニューが開くのをキャンセルします。[/ja]
 * @param {Object} event.side
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name postopen
 * @description
 *   [en]Fired just after the sliding menu is opened.[/en]
 *   [ja]スライディングメニューが開いた後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.side
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name preclose
 * @description
 *   [en]Fired just before the sliding menu is closed.[/en]
 *   [ja]スライディングメニューが閉じる前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.side
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Function} event.cancel
 *   [en]Call to cancel opening sliding-menu.[/en]
 *   [ja]スライディングメニューが閉じるのをキャンセルします。[/ja]
 */

/**
 * @ngdoc event
 * @name postclose
 * @description
 *   [en]Fired just after the sliding menu is closed.[/en]
 *   [ja]スライディングメニューが閉じた後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.side
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @initonly
 * @type {String}
 * @description
 *  [en]Specify the animation. Use one of "overlay", and "default".[/en]
 *  [ja]アニメーションを指定します。"overlay", "default"のいずれかを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation-options
 * @type {Expression}
 * @description
 *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/en]
 *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/ja]
 */

/**
 * @ngdoc attribute
 * @name threshold-ratio-should-open
 * @type {Number}
 * @description
 *  [en]Specify how much the menu needs to be swiped before opening. A value between 0 and 1. Default is 0.3.[/en]
 *  [ja]どのくらいスワイプすればスライディングメニューを開くかどうかの割合を指定します。0から1の間の数値を指定します。スワイプの距離がここで指定した数値掛けるこの要素の幅よりも大きければ、スワイプが終わった時にこの要素を開きます。デフォルトは0.3です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preopen
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preopen" event is fired.[/en]
 *  [ja]"preopen"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preclose
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preclose" event is fired.[/en]
 *  [ja]"preclose"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postopen
 * @extensionOf angular
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postopen" event is fired.[/en]
 *  [ja]"postopen"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postclose
 * @extensionOf angular
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postclose" event is fired.[/en]
 *  [ja]"postclose"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name collapse
 * @type {String}
 * @description
 *   [en]
 *     Specify the collapse behavior. Valid values are "portrait", "landscape" or a media query.
 *     "portrait" or "landscape" means the view will collapse when device is in landscape or portrait orientation.
 *     If the value is a media query, the view will collapse when the media query is true.
 *     If the value is not defined, the view always be in "collapse" mode.
 *   [/en]
 *   [ja]
 *     左側のページを非表示にする条件を指定します。portrait, landscape、width #pxもしくはメディアクエリの指定が可能です。
 *     portraitもしくはlandscapeを指定すると、デバイスの画面が縦向きもしくは横向きになった時に適用されます。
 *     メディアクエリを指定すると、指定したクエリに適合している場合に適用されます。
 *     値に何も指定しない場合には、常にcollapseモードになります。
 *   [/ja]
 */

/**
 * @ngdoc attribute
 * @name swipe-target-width
 * @type {String}
 * @description
 *   [en]The width of swipeable area calculated from the edge (in pixels). Use this to enable swipe only when the finger touch on the screen edge.[/en]
 *   [ja]スワイプの判定領域をピクセル単位で指定します。画面の端から指定した距離に達するとページが表示されます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name width
 * @type {String}
 * @description
 *   [en]Can be specified in either pixels or as a percentage, e.g. "90%" or "200px".[/en]
 *   [ja]この要素の横幅を指定します。pxと%での指定が可能です。eg. 90%, 200px[/ja]
 */

/**
 * @ngdoc attribute
 * @name side
 * @type {String}
 * @description
 *   [en]Specify which side of the screen the ons-splitter-side element is located on. Possible values are "left" and "right".[/en]
 *   [ja]この要素が左か右かを指定します。指定できる値は"left"か"right"のみです。[/ja]
 */

/**
 * @ngdoc attribute
 * @name mode
 * @type {String}
 * @description
 *   [en]Current mode. Possible values are "collapse" or "split". This attribute is read only.[/en]
 *   [ja]現在のモードが設定されます。"collapse"もしくは"split"が指定されます。この属性は読み込み専用です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name page
 * @initonly
 * @type {String}
 * @description
 *   [en]The url of the menu page.[/en]
 *   [ja]ons-splitter-side要素に表示するページのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name swipeable
 * @type {Boolean}
 * @description
 *   [en]Whether to enable swipe interaction on collapse mode.[/en]
 *   [ja]collapseモード時にスワイプ操作を有効にする場合に指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature load(page)
 * @param {String} page
 *   [en]Page URL. Can be either an HTML document or an <ons-template>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the right section[/en]
 *   [ja]指定したURLをメインページを読み込みます。[/ja]
 */

/**
 * @ngdoc method
 * @signature open([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been opened.[/en]
 *   [ja]メニューが開いた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Open menu in collapse mode.[/en]
 *   [ja]collapseモードになっているons-splitterside要素を開きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature close([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been closed.[/en]
 *   [ja]メニューが閉じた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Close menu in collapse mode.[/en]
 *   [ja]collapseモードになっているons-splitter-side要素を閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getCurrentMode()
 * @return {String}
 *   [en]Get current mode. Possible values are "collapse" or "split".[/en]
 *   [ja]このons-splitter-side要素の現在のモードを返します。"split"かもしくは"collapse"のどちらかです。[/ja]
 */

(function() {
  'use strict';

  var lastReady = window.OnsSplitterSideElement.rewritables.ready;
  window.OnsSplitterSideElement.rewritables.ready = ons._waitDiretiveInit('ons-splitter-side', lastReady);

  var lastLink = window.OnsSplitterSideElement.rewritables.link;
  window.OnsSplitterSideElement.rewritables.link = function(element, target, callback) {
    var view = angular.element(element).data('ons-splitter-side');
    lastLink(element, target, function(target) {
      view._link(target, callback);
    });
  };

  angular.module('onsen').directive('onsSplitterSide', ['$compile', 'SplitterSide', '$onsen', function($compile, SplitterSide, $onsen) {
    return {
      restrict: 'E',

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);

        return function(scope, element, attrs) {
          CustomElements.upgrade(element[0]);

          var view = new SplitterSide(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, view);
          $onsen.registerEventHandlers(view, 'destroy');

          element.data('ons-splitter-side', view);

          scope.$on('$destroy', function() {
            view._events = undefined;
            element.data('ons-splitter-side', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id switch
 * @name ons-switch
 * @category form
 * @description
 *  [en]Switch component.[/en]
 *  [ja]スイッチを表示するコンポーネントです。[/ja]
 * @guide UsingFormComponents
 *   [en]Using form components[/en]
 *   [ja]フォームを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @seealso ons-button
 *   [en]ons-button component[/en]
 *   [ja]ons-buttonコンポーネント[/ja]
 * @example
 * <ons-switch checked></ons-switch>
 */

/**
 * @ngdoc event
 * @name change
 * @description
 *   [en]Fired when the value is changed.[/en]
 *   [ja]ON/OFFが変わった時に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.switch
 *   [en]Switch object.[/en]
 *   [ja]イベントが発火したSwitchオブジェクトを返します。[/ja]
 * @param {Boolean} event.value
 *   [en]Current value.[/en]
 *   [ja]現在の値を返します。[/ja]
 * @param {Boolean} event.isInteractive
 *   [en]True if the change was triggered by the user clicking on the switch.[/en]
 *   [ja]タップやクリックなどのユーザの操作によって変わった場合にはtrueを返します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @extensionOf angular
 * @type {String}
 * @description
 *   [en]Variable name to refer this switch.[/en]
 *   [ja]JavaScriptから参照するための変数名を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *  [en]The appearance of the switch.[/en]
 *  [ja]スイッチの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]Whether the switch should be disabled.[/en]
 *   [ja]スイッチを無効の状態にする場合に指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name checked
 * @description
 *   [en]Whether the switch is checked.[/en]
 *   [ja]スイッチがONの状態にするときに指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isChecked()
 * @return {Boolean}
 *   [en]true if the switch is on.[/en]
 *   [ja]ONになっている場合にはtrueになります。[/ja]
 * @description
 *   [en]Returns true if the switch is ON.[/en]
 *   [ja]スイッチがONの場合にtrueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setChecked(checked)
 * @param {Boolean} checked
 *   [en]If true the switch will be set to on.[/en]
 *   [ja]ONにしたい場合にはtrueを指定します。[/ja]
 * @description
 *   [en]Set the value of the switch. isChecked can be either true or false.[/en]
 *   [ja]スイッチの値を指定します。isCheckedにはtrueもしくはfalseを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getCheckboxElement()
 * @return {HTMLElement}
 *   [en]The underlying checkbox element.[/en]
 *   [ja]コンポーネント内部のcheckbox要素になります。[/ja]
 * @description
 *   [en]Get inner input[type=checkbox] element.[/en]
 *   [ja]スイッチが内包する、input[type=checkbox]の要素を取得します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @extensionOf angular
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @extensionOf angular
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @extensionOf angular
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function(){
  'use strict';

  angular.module('onsen').directive('onsSwitch', ['$onsen', 'SwitchView', function($onsen, SwitchView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,

      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        var switchView = new SwitchView(element, scope, attrs);
        $onsen.addModifierMethodsForCustomElements(switchView, element);

        $onsen.declareVarAttribute(attrs, switchView);
        element.data('ons-switch', switchView);

        $onsen.cleaner.onDestroy(scope, function() {
          switchView._events = undefined;
          $onsen.removeModifierMethods(switchView);
          element.data('ons-switch', undefined);
          $onsen.clearComponent({
            element : element,
            scope : scope,
            attrs : attrs
          });
          element = attrs = scope = null;
        });

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id tabbar_item
 * @name ons-tab
 * @category navigation
 * @description
 *   [en]Represents a tab inside tabbar. Each ons-tab represents a page.[/en]
 *   [ja]
 *     タブバーに配置される各アイテムのコンポーネントです。それぞれのons-tabはページを表します。
 *     ons-tab要素の中には、タブに表示されるコンテンツを直接記述することが出来ます。
 *   [/ja]
 * @codepen pGuDL
 * @guide UsingTabBar
 *   [en]Using tab bar[/en]
 *   [ja]タブバーを使う[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-tabbar
 *   [en]ons-tabbar component[/en]
 *   [ja]ons-tabbarコンポーネント[/ja]
 * @seealso ons-page
 *   [en]ons-page component[/en]
 *   [ja]ons-pageコンポーネント[/ja]
 * @seealso ons-icon
 *   [en]ons-icon component[/en]
 *   [ja]ons-iconコンポーネント[/ja]
 * @example
 * <ons-tabbar>
 *   <ons-tab page="home.html" active="true">
 *     <ons-icon icon="ion-home"></ons-icon>
 *     <span style="font-size: 14px">Home</span>
 *   </ons-tab>
 *   <ons-tab page="fav.html" active="true">
 *     <ons-icon icon="ion-star"></ons-icon>
 *     <span style="font-size: 14px">Favorites</span>
 *   </ons-tab>
 *   <ons-tab page="settings.html" active="true">
 *     <ons-icon icon="ion-gear-a"></ons-icon>
 *     <span style="font-size: 14px">Settings</span>
 *   </ons-tab>
 * </ons-tabbar>
 *
 * <ons-template id="home.html">
 *   ...
 * </ons-template>
 *
 * <ons-template id="fav.html">
 *   ...
 * </ons-template>
 *
 * <ons-template id="settings.html">
 *   ...
 * </ons-template>
 */

/**
 * @ngdoc attribute
 * @name page
 * @initonly
 * @type {String}
 * @description
 *   [en]The page that this <code>&lt;ons-tab&gt;</code> points to.[/en]
 *   [ja]<code>&lt;ons-tab&gt;</code>が参照するページへのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name icon
 * @type {String}
 * @description
 *   [en]
 *     The icon name for the tab. Can specify the same icon name as <code>&lt;ons-icon&gt;</code>.
 *     If you need to use your own icon, create a css class with background-image or any css properties and specify the name of your css class here.
 *   [/en]
 *   [ja]
 *     アイコン名を指定します。<code>&lt;ons-icon&gt;</code>と同じアイコン名を指定できます。
 *     個別にアイコンをカスタマイズする場合は、background-imageなどのCSSスタイルを用いて指定できます。
 *   [/ja]
 */

/**
 * @ngdoc attribute
 * @name active-icon
 * @type {String}
 * @description
 *   [en]The name of the icon when the tab is active.[/en]
 *   [ja]アクティブの際のアイコン名を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name label
 * @type {String}
 * @description
 *   [en]The label of the tab item.[/en]
 *   [ja]アイコン下に表示されるラベルを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name active
 * @type {Boolean}
 * @default false
 * @description
 *   [en]Set whether this item should be active or not. Valid values are true and false.[/en]
 *   [ja]このタブアイテムをアクティブ状態にするかどうかを指定します。trueもしくはfalseを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name no-reload
 * @description
 *   [en]Set if the page shouldn't be reloaded when clicking on the same tab twice.[/en]
 *   [ja]すでにアクティブになったタブを再びクリックするとページの再読み込みは発生しません。[/ja]
 */

/**
 * @ngdoc attribute
 * @name persistent
 * @description
 *   [en]
 *     Set to make the tab content persistent.
 *     If this attribute it set the DOM will not be destroyed when navigating to another tab.
 *   [/en]
 *   [ja]
 *     このタブで読み込んだページを永続化します。
 *     この属性があるとき、別のタブのページに切り替えても、
 *     読み込んだページのDOM要素は破棄されずに単に非表示になります。
 *   [/ja]
 */

(function() {
  'use strict';

  angular.module('onsen')
    .directive('onsTab', tab)
    .directive('onsTabbarItem', tab); // for BC

  function tab($onsen) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }
  tab.$inject = ['$onsen'];
})();

/**
 * @ngdoc directive
 * @id tabbar
 * @name ons-tabbar
 * @category navigation
 * @description
 *   [en]A component to display a tab bar on the bottom of a page. Used with ons-tab to manage pages using tabs.[/en]
 *   [ja]タブバーをページ下部に表示するためのコンポーネントです。ons-tabと組み合わせて使うことで、ページを管理できます。[/ja]
 * @codepen pGuDL
 * @guide UsingTabBar
 *   [en]Using tab bar[/en]
 *   [ja]タブバーを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-tab
 *   [en]ons-tab component[/en]
 *   [ja]ons-tabコンポーネント[/ja]
 * @seealso ons-page
 *   [en]ons-page component[/en]
 *   [ja]ons-pageコンポーネント[/ja]
 * @example
 * <ons-tabbar>
 *   <ons-tab page="home.html" active="true">
 *     <ons-icon icon="ion-home"></ons-icon>
 *     <span style="font-size: 14px">Home</span>
 *   </ons-tab>
 *   <ons-tab page="fav.html" active="true">
 *     <ons-icon icon="ion-star"></ons-icon>
 *     <span style="font-size: 14px">Favorites</span>
 *   </ons-tab>
 *   <ons-tab page="settings.html" active="true">
 *     <ons-icon icon="ion-gear-a"></ons-icon>
 *     <span style="font-size: 14px">Settings</span>
 *   </ons-tab>
 * </ons-tabbar>
 *
 * <ons-template id="home.html">
 *   ...
 * </ons-template>
 *
 * <ons-template id="fav.html">
 *   ...
 * </ons-template>
 *
 * <ons-template id="settings.html">
 *   ...
 * </ons-template>
 */

/**
 * @ngdoc event
 * @name prechange
 * @description
 *   [en]Fires just before the tab is changed.[/en]
 *   [ja]アクティブなタブが変わる前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Number} event.index
 *   [en]Current index.[/en]
 *   [ja]現在アクティブになっているons-tabのインデックスを返します。[/ja]
 * @param {Object} event.tabItem
 *   [en]Tab item object.[/en]
 *   [ja]tabItemオブジェクト。[/ja]
 * @param {Function} event.cancel
 *   [en]Call this function to cancel the change event.[/en]
 *   [ja]この関数を呼び出すと、アクティブなタブの変更がキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name postchange
 * @description
 *   [en]Fires just after the tab is changed.[/en]
 *   [ja]アクティブなタブが変わった後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Number} event.index
 *   [en]Current index.[/en]
 *   [ja]現在アクティブになっているons-tabのインデックスを返します。[/ja]
 * @param {Object} event.tabItem
 *   [en]Tab item object.[/en]
 *   [ja]tabItemオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name reactive
 * @description
 *   [en]Fires if the already open tab is tapped again.[/en]
 *   [ja]すでにアクティブになっているタブがもう一度タップやクリックされた場合に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Number} event.index
 *   [en]Current index.[/en]
 *   [ja]現在アクティブになっているons-tabのインデックスを返します。[/ja]
 * @param {Object} event.tabItem
 *   [en]Tab item object.[/en]
 *   [ja]tabItemオブジェクト。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @extensionOf angular
 * @type {String}
 * @description
 *   [en]Variable name to refer this tab bar.[/en]
 *   [ja]このタブバーを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name hide-tabs
 * @initonly
 * @extensionOf angular
 * @type {Boolean}
 * @default false
 * @description
 *   [en]Whether to hide the tabs. Valid values are true/false.[/en]
 *   [ja]タブを非表示にする場合に指定します。trueもしくはfalseを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @default none
 * @description
 *   [en]Animation name. Preset values are "none", "slide" and "fade". Default is "none".[/en]
 *   [ja]ページ読み込み時のアニメーションを指定します。"none"、"fade"、"slide"のいずれかを選択できます。デフォルトは"none"です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation-options
 * @type {Expression}
 * @description
 *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/en]
 *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/ja]
 */

/**
 * @ngdoc attribute
 * @name position
 * @initonly
 * @type {String}
 * @default bottom
 * @description
 *   [en]Tabbar's position. Preset values are "bottom" and "top". Default is "bottom".[/en]
 *   [ja]タブバーの位置を指定します。"bottom"もしくは"top"を選択できます。デフォルトは"bottom"です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-reactive
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "reactive" event is fired.[/en]
 *  [ja]"reactive"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prechange
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prechange" event is fired.[/en]
 *  [ja]"prechange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postchange
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postchange" event is fired.[/en]
 *  [ja]"postchange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-init
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "init" event is fired.[/en]
 *  [ja]ページの"init"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-show
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "show" event is fired.[/en]
 *  [ja]ページの"show"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-hide
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "hide" event is fired.[/en]
 *  [ja]ページの"hide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @initonly
 * @extensionOf angular
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "destroy" event is fired.[/en]
 *  [ja]ページの"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setActiveTab(index, [options])
 * @param {Number} index
 *   [en]Tab index.[/en]
 *   [ja]タブのインデックスを指定します。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Boolean} [options.keepPage]
 *   [en]If true the page will not be changed.[/en]
 *   [ja]タブバーが現在表示しているpageを変えない場合にはtrueを指定します。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "fade", "slide" and "none".[/en]
 *   [ja]アニメーション名を指定します。"fade"、"slide"、"none"のいずれかを指定できます。[/ja]
 * @param {String} [options.animationOptions]
 *   [en]Specify the animation's duration, delay and timing. E.g.  <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code>[/en]
 *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. <code>{duration: 0.2, delay: 0.4, timing: 'ease-in'}</code> [/ja]
 * @return {Boolean}
 *   [en]true if the change was successful.[/en]
 *   [ja]変更が成功した場合にtrueを返します。[/ja]
 * @description
 *   [en]Show specified tab page. Animations and other options can be specified by the second parameter.[/en]
 *   [ja]指定したインデックスのタブを表示します。アニメーションなどのオプションを指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getActiveTabIndex()
 * @return {Number}
 *   [en]The index of the currently active tab.[/en]
 *   [ja]現在アクティブになっているタブのインデックスを返します。[/ja]
 * @description
 *   [en]Returns tab index on current active tab. If active tab is not found, returns -1.[/en]
 *   [ja]現在アクティブになっているタブのインデックスを返します。現在アクティブなタブがない場合には-1を返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature loadPage(url)
 * @param {String} url
 *   [en]Page URL. Can be either an HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、もしくは<code>&lt;ons-template&gt;</code>で宣言したid属性の値を利用できます。[/ja]
 * @description
 *   [en]Displays a new page without changing the active index.[/en]
 *   [ja]現在のアクティブなインデックスを変更せずに、新しいページを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @extensionOf angular
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @extensionOf angular
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @extensionOf angular
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function() {
  'use strict';

  var lastReady = window.OnsTabbarElement.rewritables.ready;
  window.OnsTabbarElement.rewritables.ready = ons._waitDiretiveInit('ons-tabbar', lastReady);

  var lastLink = window.OnsTabbarElement.rewritables.link;
  window.OnsTabbarElement.rewritables.link = function(tabbarElement, target, callback) {
    var view = angular.element(tabbarElement).data('ons-tabbar');
    view._compileAndLink(target, function(target) {
      lastLink(tabbarElement, target, callback);
    });
  };

  var lastUnlink = window.OnsTabbarElement.rewritables.unlink;
  window.OnsTabbarElement.rewritables.unlink = function(tabbarElement, target, callback) {
    angular.element(target).data('_scope').$destroy();
    lastUnlink(tabbarElement, target, callback);
  };

  angular.module('onsen').directive('onsTabbar', ['$onsen', '$compile', '$parse', 'TabbarView', function($onsen, $compile, $parse, TabbarView) {

    return {
      restrict: 'E',

      replace: false,
      scope: true,

      link: function(scope, element, attrs, controller) {

        CustomElements.upgrade(element[0]);

        scope.$watch(attrs.hideTabs, function(hide) {
          if (typeof hide === 'string') {
            hide = hide === 'true';
          }
          element[0].setTabbarVisibility(!hide);
        });

        var tabbarView = new TabbarView(scope, element, attrs);
        $onsen.addModifierMethodsForCustomElements(tabbarView, element);

        $onsen.registerEventHandlers(tabbarView, 'reactive prechange postchange init show hide destroy');

        element.data('ons-tabbar', tabbarView);
        $onsen.declareVarAttribute(attrs, tabbarView);

        scope.$on('$destroy', function() {
          tabbarView._events = undefined;
          $onsen.removeModifierMethods(tabbarView);
          element.data('ons-tabbar', undefined);
        });

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id template
 * @name ons-template
 * @category util
 * @description
 *   [en]Define a separate HTML fragment and use as a template.[/en]
 *   [ja]テンプレートとして使用するためのHTMLフラグメントを定義します。この要素でHTMLを宣言すると、id属性に指定した名前をpageのURLとしてons-navigatorなどのコンポーネントから参照できます。[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @example
 * <ons-template id="foobar.html">
 *   ...
 * </ons-template>
 */
(function(){
  'use strict';

  angular.module('onsen').directive('onsTemplate', ['$templateCache', function($templateCache) {
    return {
      restrict: 'E',
      terminal: true,
      compile: function(element) {
        CustomElements.upgrade(element[0]);
        var content = element[0].template || element.html();
        $templateCache.put(element.attr('id'), content);
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id toolbar
 * @name ons-toolbar
 * @category page
 * @modifier transparent
 *   [en]Transparent toolbar[/en]
 *   [ja]透明な背景を持つツールバーを表示します。[/ja]
 * @modifier android
 *   [en]Android style toolbar. Title is left-aligned.[/en]
 *   [ja]Androidライクなツールバーを表示します。タイトルが左に寄ります。[/ja]
 * @description
 *   [en]Toolbar component that can be used with navigation. Left, center and right container can be specified by class names.[/en]
 *   [ja]ナビゲーションで使用するツールバー用コンポーネントです。クラス名により、左、中央、右のコンテナを指定できます。[/ja]
 * @codepen aHmGL
 * @guide Addingatoolbar [en]Adding a toolbar[/en][ja]ツールバーの追加[/ja]
 * @seealso ons-bottom-toolbar
 *   [en]ons-bottom-toolbar component[/en]
 *   [ja]ons-bottom-toolbarコンポーネント[/ja]
 * @seealso ons-back-button
 *   [en]ons-back-button component[/en]
 *   [ja]ons-back-buttonコンポーネント[/ja]
 * @seealso ons-toolbar-button
 *   [en]ons-toolbar-button component[/en]
 *   [ja]ons-toolbar-buttonコンポーネント[/ja]
 * @example
 * <ons-page>
 *   <ons-toolbar>
 *     <div class="left"><ons-back-button>Back</ons-back-button></div>
 *     <div class="center">Title</div>
 *     <div class="right">Label</div>
 *   </ons-toolbar>
 * </ons-page>
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @extensionOf angular
 * @type {String}
 * @description
 *  [en]Variable name to refer this toolbar.[/en]
 *  [ja]このツールバーを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name inline
 * @initonly
 * @description
 *   [en]Display the toolbar as an inline element.[/en]
 *   [ja]ツールバーをインラインに置きます。スクロール領域内にそのまま表示されます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @description
 *   [en]The appearance of the toolbar.[/en]
 *   [ja]ツールバーの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name fixed-style
 * @initonly
 * @description
 *   [en]
 *     By default the center element will be left-aligned on Android and center-aligned on iOS.
 *     Use this attribute to override this behavior so it's always displayed in the center.
 *   [/en]
 *   [ja]
 *     このコンポーネントは、Androidではタイトルを左寄せ、iOSでは中央配置します。
 *     この属性を使用すると、要素はAndroidとiOSともに中央配置となります。
 *   [/ja]
 */

(function() {
  'use strict';

  angular.module('onsen').directive('onsToolbar', ['$onsen', 'GenericView', function($onsen, GenericView) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      compile: function(element) {
        CustomElements.upgrade(element[0]);
        return {
          pre: function(scope, element, attrs) {
            // TODO: Remove this dirty fix!
            if (element[0].nodeName === 'ons-toolbar') {
              CustomElements.upgrade(element[0]);
              GenericView.register(scope, element, attrs, {viewKey: 'ons-toolbar'});
              element[0]._ensureNodePosition();
            }
          },
          post: function(scope, element, attrs) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);

})();

/**
 * @ngdoc directive
 * @id toolbar_button
 * @name ons-toolbar-button
 * @category page
 * @modifier outline
 *   [en]A button with an outline.[/en]
 *   [ja]アウトラインをもったボタンを表示します。[/ja]
 * @description
 *   [en]Button component for ons-toolbar and ons-bottom-toolbar.[/en]
 *   [ja]ons-toolbarあるいはons-bottom-toolbarに設置できるボタン用コンポーネントです。[/ja]
 * @codepen aHmGL
 * @guide Addingatoolbar
 *   [en]Adding a toolbar[/en]
 *   [ja]ツールバーの追加[/ja]
 * @seealso ons-toolbar
 *   [en]ons-toolbar component[/en]
 *   [ja]ons-toolbarコンポーネント[/ja]
 * @seealso ons-back-button
 *   [en]ons-back-button component[/en]
 *   [ja]ons-back-buttonコンポーネント[/ja]
 * @seealso ons-toolbar-button
 *   [en]ons-toolbar-button component[/en]
 *   [ja]ons-toolbar-buttonコンポーネント[/ja]
 * @example
 * <ons-toolbar>
 *   <div class="left"><ons-toolbar-button>Button</ons-toolbar-button></div>
 *   <div class="center">Title</div>
 *   <div class="right"><ons-toolbar-button><ons-icon icon="ion-navicon" size="28px"></ons-icon></ons-toolbar-button></div>
 * </ons-toolbar>
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @extensionOf angular
 * @type {String}
 * @description
 *   [en]Variable name to refer this button.[/en]
 *   [ja]このボタンを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]The appearance of the button.[/en]
 *   [ja]ボタンの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]Specify if button should be disabled.[/en]
 *   [ja]ボタンを無効化する場合は指定してください。[/ja]
 */

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsToolbarButton', ['$onsen', 'GenericView', function($onsen, GenericView) {
    return {
      restrict: 'E',
      scope: false,
      link: {
        pre: function(scope, element, attrs) {
          CustomElements.upgrade(element[0]);
          var toolbarButton = new GenericView(scope, element, attrs);
          element.data('ons-toolbar-button', toolbarButton);
          $onsen.declareVarAttribute(attrs, toolbarButton);

          $onsen.addModifierMethodsForCustomElements(toolbarButton, element);

          $onsen.cleaner.onDestroy(scope, function() {
            toolbarButton._events = undefined;
            $onsen.removeModifierMethods(toolbarButton);
            element.data('ons-toolbar-button', undefined);
            element = null;

            $onsen.clearComponent({
              scope: scope,
              attrs: attrs,
              element: element,
            });
            scope = element = attrs = null;
          });
        },
        post: function(scope, element, attrs) {
          $onsen.fireComponentEvent(element[0], 'init');
        }
      }
    };
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';

  var module = angular.module('onsen');

  var ComponentCleaner = {
    
    /**
     * @param {jqLite} element
     */
    decomposeNode: function(element) {
      var children = element.remove().children();
      for (var i = 0; i < children.length; i++) {
        ComponentCleaner.decomposeNode(angular.element(children[i]));
      }
    },

    /**
     * @param {Attributes} attrs
     */
    destroyAttributes: function(attrs) {
      attrs.$$element = null;
      attrs.$$observers = null;
    },

    /**
     * @param {jqLite} element
     */
    destroyElement: function(element) {
      element.remove();
    },

    /**
     * @param {Scope} scope
     */
    destroyScope: function(scope) {
      scope.$$listeners = {};
      scope.$$watchers = null;
      scope = null;
    },

    /**
     * @param {Scope} scope
     * @param {Function} fn
     */
    onDestroy: function(scope, fn) {
      var clear = scope.$on('$destroy', function() {
        clear();
        fn.apply(null, arguments);
      });
    }
  };

  module.factory('ComponentCleaner', function() {
    return ComponentCleaner;
  });

  // override builtin ng-(eventname) directives
  (function() {
    var ngEventDirectives = {};
    'click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(' ').forEach(
      function(name) {
        var directiveName = directiveNormalize('ng-' + name);
        ngEventDirectives[directiveName] = ['$parse', function($parse) {
          return {
            compile: function($element, attr) {
              var fn = $parse(attr[directiveName]);
              return function(scope, element, attr) {
                var listener = function(event) {
                  scope.$apply(function() {
                    fn(scope, {$event:event});
                  });
                };
                element.on(name, listener);

                ComponentCleaner.onDestroy(scope, function() {
                  element.off(name, listener);
                  element = null;

                  ComponentCleaner.destroyScope(scope);
                  scope = null;

                  ComponentCleaner.destroyAttributes(attr);
                  attr = null;
                });
              };
            }
          };
        }];

        function directiveNormalize(name) {
          return name.replace(/-([a-z])/g, function(matches) {
            return matches[1].toUpperCase();
          });
        }
      }
    );
    module.config(['$provide', function($provide) {
      var shift = function($delegate) {
        $delegate.shift();
        return $delegate;
      };
      Object.keys(ngEventDirectives).forEach(function(directiveName) {
        $provide.decorator(directiveName + 'Directive', ['$delegate', shift]);
      });
    }]);
    Object.keys(ngEventDirectives).forEach(function(directiveName) {
      module.directive(directiveName, ngEventDirectives[directiveName]);
    });
  })();
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';

  var module = angular.module('onsen');

  /**
   * Internal service class for framework implementation.
   */
  module.factory('$onsen', ['$rootScope', '$window', '$cacheFactory', '$document', '$templateCache', '$http', '$q', '$onsGlobal', 'ComponentCleaner', function($rootScope, $window, $cacheFactory, $document, $templateCache, $http, $q, $onsGlobal, ComponentCleaner) {

    var $onsen = createOnsenService();
    var ModifierUtil = $onsGlobal._internal.ModifierUtil;

    return $onsen;

    function createOnsenService() {
      return {

        DIRECTIVE_TEMPLATE_URL: 'templates',

        cleaner: ComponentCleaner,

        DeviceBackButtonHandler: $onsGlobal._deviceBackButtonDispatcher,

        _defaultDeviceBackButtonHandler: $onsGlobal._defaultDeviceBackButtonHandler,

        /**
         * @return {Object}
         */
        getDefaultDeviceBackButtonHandler: function() {
          return this._defaultDeviceBackButtonHandler;
        },

        /**
         * @param {Object} view
         * @param {Element} element
         * @param {Array} methodNames
         * @return {Function} A function that dispose all driving methods.
         */
        deriveMethods: function(view, element, methodNames) {
          methodNames.forEach(function(methodName) {
            view[methodName] = function() {
              return element[methodName].apply(element, arguments);
            };
          });

          return function() {
            methodNames.forEach(function(methodName) {
              view[methodName] = null;
            });
            view = element = null;
          };
        },

        /**
         * @param {Object} view
         * @param {Element} element
         * @param {Array} eventNames
         * @param {Function} [map]
         * @return {Function} A function that clear all event listeners
         */
        deriveEvents: function(view, element, eventNames, map) {
          map = map || function(detail) { return detail; };
          eventNames = [].concat(eventNames);
          var listeners = [];

          eventNames.forEach(function(eventName) {
            var listener = function(event) {
              view.emit(eventName, map(Object.create(event.detail)));
            };
            listeners.push(listener);
            element.addEventListener(eventName, listener, false);
          });

          return function() {
            eventNames.forEach(function(eventName, index) {
              element.removeEventListener(eventName, listeners[index], false);
            });
            view = element = listeners = map = null;
          };
        },

        /**
         * @return {Boolean}
         */
        isEnabledAutoStatusBarFill: function() {
          return !!$onsGlobal._config.autoStatusBarFill;
        },

        /**
         * @param {HTMLElement} element
         * @return {Boolean}
         */
        shouldFillStatusBar: function(element) {
          return $onsGlobal.shouldFillStatusBar(element);
        },

        /**
         * @param {Object} params
         * @param {Scope} [params.scope]
         * @param {jqLite} [params.element]
         * @param {Array} [params.elements]
         * @param {Attributes} [params.attrs]
         */
        clearComponent: function(params) {
          if (params.scope) {
            ComponentCleaner.destroyScope(params.scope);
          }

          if (params.attrs) {
            ComponentCleaner.destroyAttributes(params.attrs);
          }

          if (params.element) {
            ComponentCleaner.destroyElement(params.element);
          }

          if (params.elements) {
            params.elements.forEach(function(element) {
              ComponentCleaner.destroyElement(element);
            });
          }
        },

        /**
         * @param {jqLite} element
         * @param {String} name
         */
        findElementeObject: function(element, name) {
          return element.inheritedData(name);
        },

        /**
         * @param {String} page
         * @return {Promise}
         */
        getPageHTMLAsync: function(page) {
          var cache = $templateCache.get(page);

          if (cache) {
            var deferred = $q.defer();

            var html = typeof cache === 'string' ? cache : cache[1];
            deferred.resolve(this.normalizePageHTML(html));

            return deferred.promise;

          } else {
            return $http({
              url: page,
              method: 'GET'
            }).then(function(response) {
              var html = response.data;

              return this.normalizePageHTML(html);
            }.bind(this));
          }
        },

        /**
         * @param {String} html
         * @return {String}
         */
        normalizePageHTML: function(html) {
          html = ('' + html).trim();

          if (!html.match(/^<ons-page/)) {
            html = '<ons-page _muted>' + html + '</ons-page>';
          }

          return html;
        },

        /**
         * Create modifier templater function. The modifier templater generate css classes bound modifier name.
         *
         * @param {Object} attrs
         * @param {Array} [modifiers] an array of appendix modifier
         * @return {Function}
         */
        generateModifierTemplater: function(attrs, modifiers) {
          var attrModifiers = attrs && typeof attrs.modifier === 'string' ? attrs.modifier.trim().split(/ +/) : [];
          modifiers = angular.isArray(modifiers) ? attrModifiers.concat(modifiers) : attrModifiers;

          /**
           * @return {String} template eg. 'ons-button--*', 'ons-button--*__item'
           * @return {String}
           */
          return function(template) {
            return modifiers.map(function(modifier) {
              return template.replace('*', modifier);
            }).join(' ');
          };
        },

        /**
         * Add modifier methods to view object for custom elements.
         *
         * @param {Object} view object
         * @param {jqLite} element
         */
        addModifierMethodsForCustomElements: function(view, element) {
          var methods = {
            hasModifier: function(needle) {
              var tokens = ModifierUtil.split(element.attr('modifier'));
              needle = typeof needle === 'string' ? needle.trim() : '';

              return ModifierUtil.split(needle).some(function(needle) {
                return tokens.indexOf(needle) != -1;
              });
            },

            removeModifier: function(needle) {
              needle = typeof needle === 'string' ? needle.trim() : '';

              var modifier = ModifierUtil.split(element.attr('modifier')).filter(function(token) {
                return token !== needle;
              }).join(' ');

              element.attr('modifier', modifier);
            },

            addModifier: function(modifier) {
              element.attr('modifier', element.attr('modifier') + ' ' + modifier);
            },

            setModifier: function(modifier) {
              element.attr('modifier', modifier);
            },

            toggleModifier: function(modifier) {
              if (this.hasModifier(modifier)) {
                this.removeModifier(modifier);
              } else {
                this.addModifier(modifier);
              }
            }
          };

          for (var method in methods) {
            if (methods.hasOwnProperty(method)) {
              view[method] = methods[method];
            }
          }
        },

        /**
         * Add modifier methods to view object.
         *
         * @param {Object} view object
         * @param {String} template
         * @param {jqLite} element
         */
        addModifierMethods: function(view, template, element) {
          var _tr = function(modifier) {
            return template.replace('*', modifier);
          };

          var fns = {
            hasModifier: function(modifier) {
              return element.hasClass(_tr(modifier));
            },

            removeModifier: function(modifier) {
              element.removeClass(_tr(modifier));
            },

            addModifier: function(modifier) {
              element.addClass(_tr(modifier));
            },

            setModifier: function(modifier) {
              var classes = element.attr('class').split(/\s+/),
                  patt = template.replace('*', '.');

              for (var i=0; i < classes.length; i++) {
                var cls = classes[i];

                if (cls.match(patt)) {
                  element.removeClass(cls);
                }
              }

              element.addClass(_tr(modifier));
            },

            toggleModifier: function(modifier) {
              var cls = _tr(modifier);
              if (element.hasClass(cls)) {
                element.removeClass(cls);
              } else {
                element.addClass(cls);
              }
            }
          };

          var append = function(oldFn, newFn) {
            if (typeof oldFn !== 'undefined') {
              return function() {
                return oldFn.apply(null, arguments) || newFn.apply(null, arguments);
              };
            } else {
              return newFn;
            }
          };

          view.hasModifier = append(view.hasModifier, fns.hasModifier);
          view.removeModifier = append(view.removeModifier, fns.removeModifier);
          view.addModifier = append(view.addModifier, fns.addModifier);
          view.setModifier = append(view.setModifier, fns.setModifier);
          view.toggleModifier = append(view.toggleModifier, fns.toggleModifier);
        },

        /**
         * Remove modifier methods.
         *
         * @param {Object} view object
         */
        removeModifierMethods: function(view) {
          view.hasModifier = view.removeModifier =
            view.addModifier = view.setModifier =
            view.toggleModifier = undefined;
        },

        /**
         * Define a variable to JavaScript global scope and AngularJS scope as 'var' attribute name.
         *
         * @param {Object} attrs
         * @param object
         */
        declareVarAttribute: function(attrs, object) {
          if (typeof attrs['var'] === 'string') {
            var varName = attrs['var'];

            this._defineVar(varName, object);
          }
        },

        _registerEventHandler: function(component, eventName) {
          var capitalizedEventName = eventName.charAt(0).toUpperCase() + eventName.slice(1);

          component.on(eventName, function(event) {
            $onsen.fireComponentEvent(component._element[0], eventName, event);

            var handler = component._attrs['ons' + capitalizedEventName];
            if (handler) {
              component._scope.$eval(handler, {$event: event});
              component._scope.$evalAsync();
            }
          });
        },

        /**
         * Register event handlers for attributes.
         *
         * @param {Object} component
         * @param {String} eventNames
         */
        registerEventHandlers: function(component, eventNames) {
          eventNames = eventNames.trim().split(/\s+/);

          for (var i = 0, l = eventNames.length; i < l; i ++) {
            var eventName = eventNames[i];
            this._registerEventHandler(component, eventName);
          }
        },

        /**
         * @return {Boolean}
         */
        isAndroid: function() {
          return !!window.navigator.userAgent.match(/android/i);
        },

        /**
         * @return {Boolean}
         */
        isIOS: function() {
          return !!window.navigator.userAgent.match(/(ipad|iphone|ipod touch)/i);
        },

        /**
         * @return {Boolean}
         */
        isWebView: function() {
          return window.ons.isWebView();
        },

        /**
         * @return {Boolean}
         */
        isIOS7above: (function() {
          var ua = window.navigator.userAgent;
          var match = ua.match(/(iPad|iPhone|iPod touch);.*CPU.*OS (\d+)_(\d+)/i);

          var result = match ? parseFloat(match[2] + '.' + match[3]) >= 7 : false;

          return function() {
            return result;
          };
        })(),

        /**
         * Fire a named event for a component. The view object, if it exists, is attached to event.component.
         *
         * @param {HTMLElement} [dom]
         * @param {String} event name
         */
        fireComponentEvent: function(dom, eventName, data) {
          data = data || {};

          var event = document.createEvent('HTMLEvents');

          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              event[key] = data[key];
            }
          }

          event.component = dom ?
            angular.element(dom).data(dom.nodeName.toLowerCase()) || null : null;
          event.initEvent(dom.nodeName.toLowerCase() + ':' + eventName, true, true);

          dom.dispatchEvent(event);
        },

        /**
         * Define a variable to JavaScript global scope and AngularJS scope.
         *
         * Util.defineVar('foo', 'foo-value');
         * // => window.foo and $scope.foo is now 'foo-value'
         *
         * Util.defineVar('foo.bar', 'foo-bar-value');
         * // => window.foo.bar and $scope.foo.bar is now 'foo-bar-value'
         *
         * @param {String} name
         * @param object
         */
        _defineVar: function(name, object) {
          var names = name.split(/\./);

          function set(container, names, object) {
            var name;
            for (var i = 0; i < names.length - 1; i++) {
              name = names[i];
              if (container[name] === undefined || container[name] === null) {
                container[name] = {};
              }
              container = container[name];
            }

            container[names[names.length - 1]] = object;

            if (container[names[names.length -1]] !== object) {
              throw new Error('Cannot set var="' + object._attrs.var + '" because it will overwrite a read-only variable.');
            }
          }

          if (ons.componentBase) {
            set(ons.componentBase, names, object);
          }

          // Attach to ancestor with ons-scope attribute.
          var element = object._element[0];

          while (element.parentNode) {
            if (element.hasAttribute('ons-scope')) {
              set(angular.element(element).data('_scope'), names, object);
              element = null;
              return;
            }

            element = element.parentNode;
          }
          element = null;

          // If no ons-scope element was found, attach to $rootScope.
          set($rootScope, names, object);
        }
      };
    }

  }]);
})();

// confirm to use jqLite
'use strict';

if (window.jQuery && angular.element === window.jQuery) {
  console.warn('Onsen UI require jqLite. Load jQuery after loading AngularJS to fix this error. jQuery may break Onsen UI behavior.');
}
/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/**
 * @ngdoc object
 * @name ons.GestureDetector
 * @category util
 * @description 
 *   [en]Utility class for gesture detection.[/en]
 *   [ja]ジェスチャを検知するためのユーティリティクラスです。[/ja]
 */

/**
 * @ngdoc method
 * @signature constructor(element[, options])
 * @description
 *  [en]Create a new GestureDetector instance.[/en]
 *  [ja]GestureDetectorのインスタンスを生成します。[/ja]
 * @param {Element} element
 *   [en]Name of the event.[/en]
 *   [ja]ジェスチャを検知するDOM要素を指定します。[/ja]
 * @param {Object} [options]
 *   [en]Options object.[/en]
 *   [ja]オプションを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(gestures, handler)
 * @description
 *  [en]Adds an event handler for a gesture. Available gestures are: drag, dragleft, dragright, dragup, dragdown, hold, release, swipe, swipeleft, swiperight, swipeup, swipedown, tap, doubletap, touch, transform, pinch, pinchin, pinchout and rotate. [/en]
 *  [ja]ジェスチャに対するイベントハンドラを追加します。指定できるジェスチャ名は、drag dragleft dragright dragup dragdown hold release swipe swipeleft swiperight swipeup swipedown tap doubletap touch transform pinch pinchin pinchout rotate です。[/ja]
 * @param {String} gestures
 *   [en]A space separated list of gestures.[/en]
 *   [ja]検知するジェスチャ名を指定します。スペースで複数指定することができます。[/ja]
 * @param {Function} handler
 *   [en]An event handling function.[/en]
 *   [ja]イベントハンドラとなる関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(gestures, handler)
 * @description
 *  [en]Remove an event listener.[/en]
 *  [ja]イベントリスナーを削除します。[/ja]
 * @param {String} gestures
 *   [en]A space separated list of gestures.[/en]
 *   [ja]ジェスチャ名を指定します。スペースで複数指定することができます。[/ja]
 * @param {Function} handler
 *   [en]An event handling function.[/en]
 *   [ja]イベントハンドラとなる関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature enable(state)
 * @description
 *  [en]Enable or disable gesture detection.[/en]
 *  [ja]ジェスチャ検知を有効化/無効化します。[/ja]
 * @param {Boolean} state
 *   [en]Specify if it should be enabled or not.[/en]
 *   [ja]有効にするかどうかを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature dispose()
 * @description
 *  [en]Remove and destroy all event handlers for this instance.[/en]
 *  [ja]このインスタンスでのジェスチャの検知や、イベントハンドラを全て解除して廃棄します。[/ja]
 */


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/**
 * @ngdoc object
 * @name ons.notification
 * @category dialog
 * @codepen Qwwxyp
 * @description 
 *   [en]Utility methods to create different kinds of alert dialogs. There are three methods available: alert, confirm and prompt.[/en]
 *   [ja]いくつかの種類のアラートダイアログを作成するためのユーティリティメソッドを収めたオブジェクトです。[/ja]
 * @example
 * <script>
 *   ons.notification.alert({
 *     message: 'Hello, world!'
 *   });
 *
 *   ons.notification.confirm({
 *     message: 'Are you ready?',
 *     callback: function(answer) {
 *       // Do something here.
 *     }
 *   });
 *
 *   ons.notification.prompt({
 *     message: 'How old are you?',
 *     callback: function(age) {
 *       ons.notification.alert({
 *         message: 'You are ' + age + ' years old.'
 *       });
 *     });
 *   });
 * </script>
 */

/**
 * @ngdoc method
 * @signature alert(options)
 * @param {Object} options
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクトです。[/ja]
 * @param {String} [options.message]
 *   [en]Alert message.[/en]
 *   [ja]アラートダイアログに表示する文字列を指定します。[/ja]
 * @param {String} [options.messageHTML]
 *   [en]Alert message in HTML.[/en]
 *   [ja]アラートダイアログに表示するHTMLを指定します。[/ja]
 * @param {String} [options.buttonLabel]
 *   [en]Label for confirmation button. Default is "OK".[/en]
 *   [ja]確認ボタンのラベルを指定します。"OK"がデフォルトです。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アラートダイアログを表示する際のアニメーション名を指定します。"none", "fade", "slide"のいずれかを指定できます。[/ja]
 * @param {String} [options.title]
 *   [en]Dialog title. Default is "Alert".[/en]
 *   [ja]アラートダイアログの上部に表示するタイトルを指定します。"Alert"がデフォルトです。[/ja]
 * @param {String} [options.modifier]
 *   [en]Modifier for the dialog.[/en]
 *   [ja]アラートダイアログのmodifier属性の値を指定します。[/ja]
 * @param {Function} [options.callback]
 *   [en]Function that executes after dialog has been closed.[/en]
 *   [ja]アラートダイアログが閉じられた時に呼び出される関数オブジェクトを指定します。[/ja]
 * @description 
 *   [en]
 *     Display an alert dialog to show the user a message.
 *     The content of the message can be either simple text or HTML.
 *     Must specify either message or messageHTML.
 *   [/en]
 *   [ja]
 *     ユーザーへメッセージを見せるためのアラートダイアログを表示します。
 *     表示するメッセージは、テキストかもしくはHTMLを指定できます。
 *     このメソッドの引数には、options.messageもしくはoptions.messageHTMLのどちらかを必ず指定する必要があります。
 *   [/ja]
 */

/**
 * @ngdoc method
 * @signature confirm(options)
 * @param {Object} options
 *   [en]Parameter object.[/en]
 * @param {String} [options.message]
 *   [en]Confirmation question.[/en]
 *   [ja]確認ダイアログに表示するメッセージを指定します。[/ja]
 * @param {String} [options.messageHTML]
 *   [en]Dialog content in HTML.[/en]
 *   [ja]確認ダイアログに表示するHTMLを指定します。[/ja]
 * @param {Array} [options.buttonLabels]
 *   [en]Labels for the buttons. Default is ["Cancel", "OK"].[/en]
 *   [ja]ボタンのラベルの配列を指定します。["Cancel", "OK"]がデフォルトです。[/ja]
 * @param {Number} [options.primaryButtonIndex]
 *   [en]Index of primary button. Default is 1.[/en]
 *   [ja]プライマリボタンのインデックスを指定します。デフォルトは 1 です。[/ja]
 * @param {Boolean} [options.cancelable]
 *   [en]Whether the dialog is cancelable or not. Default is false.[/en]
 *   [ja]ダイアログがキャンセル可能かどうかを指定します。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定します。[/ja]
 * @param {String} [options.title]
 *   [en]Dialog title. Default is "Confirm".[/en]
 *   [ja]ダイアログのタイトルを指定します。"Confirm"がデフォルトです。[/ja]
 * @param {String} [options.modifier]
 *   [en]Modifier for the dialog.[/en]
 *   [ja]ダイアログのmodifier属性の値を指定します。[/ja]
 * @param {Function} [options.callback]
 *   [en]
 *     Function that executes after the dialog has been closed.
 *     Argument for the function is the index of the button that was pressed or -1 if the dialog was canceled.
 *   [/en]
 *   [ja]
 *     ダイアログが閉じられた後に呼び出される関数オブジェクトを指定します。
 *     この関数の引数として、押されたボタンのインデックス値が渡されます。
 *     もしダイアログがキャンセルされた場合には-1が渡されます。
 *   [/ja]
 * @description 
 *   [en]
 *     Display a dialog to ask the user for confirmation.
 *     The default button labels are "Cancel" and "OK" but they can be customized.
 *     Must specify either message or messageHTML.
 *   [/en]
 *   [ja]
 *     ユーザに確認を促すダイアログを表示します。
 *     デオルとのボタンラベルは、"Cancel"と"OK"ですが、これはこのメソッドの引数でカスタマイズできます。
 *     このメソッドの引数には、options.messageもしくはoptions.messageHTMLのどちらかを必ず指定する必要があります。
 *   [/ja]
 */

/**
 * @ngdoc method
 * @signature prompt(options)
 * @param {Object} options
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクトです。[/ja]
 * @param {String} [options.message]
 *   [en]Prompt question.[/en]
 *   [ja]ダイアログに表示するメッセージを指定します。[/ja]
 * @param {String} [options.messageHTML]
 *   [en]Dialog content in HTML.[/en]
 *   [ja]ダイアログに表示するHTMLを指定します。[/ja]
 * @param {String} [options.buttonLabel]
 *   [en]Label for confirmation button. Default is "OK".[/en]
 *   [ja]確認ボタンのラベルを指定します。"OK"がデフォルトです。[/ja]
 * @param {Number} [options.primaryButtonIndex]
 *   [en]Index of primary button. Default is 1.[/en]
 *   [ja]プライマリボタンのインデックスを指定します。デフォルトは 1 です。[/ja]
 * @param {Boolean} [options.cancelable]
 *   [en]Whether the dialog is cancelable or not. Default is false.[/en]
 *   [ja]ダイアログがキャンセル可能かどうかを指定します。デフォルトは false です。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定します。[/ja]
 * @param {String} [options.title]
 *   [en]Dialog title. Default is "Alert".[/en]
 *   [ja]ダイアログのタイトルを指定します。デフォルトは "Alert" です。[/ja]
 * @param {String} [options.placeholder]
 *   [en]Placeholder for the text input.[/en]
 *   [ja]テキスト欄のプレースホルダに表示するテキストを指定します。[/ja]
 * @param {String} [options.defaultValue]
 *   [en]Default value for the text input.[/en]
 *   [ja]テキスト欄のデフォルトの値を指定します。[/ja]
 * @param {Boolean} [options.autofocus]
 *   [en]Autofocus the input element. Default is true.[/en]
 *   [ja]input要素に自動的にフォーカスするかどうかを指定します。デフォルトはtrueです。[/ja]
 * @param {String} [options.modifier]
 *   [en]Modifier for the dialog.[/en]
 *   [ja]ダイアログのmodifier属性の値を指定します。[/ja]
 * @param {Function} [options.callback]
 *   [en]
 *     Function that executes after the dialog has been closed.
 *     Argument for the function is the value of the input field or null if the dialog was canceled.
 *   [/en]
 *   [ja]
 *     ダイアログが閉じられた後に実行される関数オブジェクトを指定します。
 *     関数の引数として、インプット要素の中の値が渡されます。ダイアログがキャンセルされた場合には、nullが渡されます。
 *   [/ja]
 * @param {Boolean} [options.submitOnEnter]
 *   [en]Submit automatically when enter is pressed. Default is "true".[/en]
 *   [ja]Enterが押された際にそのformをsubmitするかどうかを指定します。デフォルトはtrueです。[/ja]
 * @description 
 *   [en]
 *     Display a dialog with a prompt to ask the user a question. 
 *     Must specify either message or messageHTML.
 *   [/en]
 *   [ja]
 *     ユーザーに入力を促すダイアログを表示します。
 *     このメソッドの引数には、options.messageもしくはoptions.messageHTMLのどちらかを必ず指定する必要があります。
 *   [/ja]
 */

ons.notification.alert = function(options) {
  var originalCompile = options.compile || function(element) {
    return element;
  };

  options.compile = function(element) {
    ons.compile(originalCompile(element));
  };

  return ons.notification._alertOriginal(options);
};

ons.notification.confirm = function(options) {
  var originalCompile = options.compile || function(element) {
    return element;
  };

  options.compile = function(element) {
    ons.compile(originalCompile(element));
  };

  return ons.notification._confirmOriginal(options);
};

ons.notification.prompt = function(options) {
  var originalCompile = options.compile || function(element) {
    return element;
  };

  options.compile = function(element) {
    ons.compile(originalCompile(element));
  };

  return ons.notification._promptOriginal(options);
};

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/**
 * @ngdoc object
 * @name ons.orientation
 * @category util
 * @description 
 *   [en]Utility methods for orientation detection.[/en]
 *   [ja]画面のオリエンテーション検知のためのユーティリティメソッドを収めているオブジェクトです。[/ja]
 */

/**
 * @ngdoc event
 * @name change
 * @description
 *   [en]Fired when the device orientation changes.[/en]
 *   [ja]デバイスのオリエンテーションが変化した際に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Boolean} event.isPortrait
 *   [en]Will be true if the current orientation is portrait mode.[/en]
 *   [ja]現在のオリエンテーションがportraitの場合にtrueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isPortrait()
 * @return {Boolean}
 *   [en]Will be true if the current orientation is portrait mode.[/en]
 *   [ja]オリエンテーションがportraitモードの場合にtrueになります。[/ja]
 * @description 
 *   [en]Returns whether the current screen orientation is portrait or not.[/en]
 *   [ja]オリエンテーションがportraitモードかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isLandscape()
 * @return {Boolean}
 *   [en]Will be true if the current orientation is landscape mode.[/en]
 *   [ja]オリエンテーションがlandscapeモードの場合にtrueになります。[/ja]
 * @description 
 *   [en]Returns whether the current screen orientation is landscape or not.[/en]
 *   [ja]オリエンテーションがlandscapeモードかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/**
 * @ngdoc object
 * @name ons.platform
 * @category util
 * @description 
 *   [en]Utility methods to detect current platform.[/en]
 *   [ja]現在実行されているプラットフォームを検知するためのユーティリティメソッドを収めたオブジェクトです。[/ja]
 */

/**
 * @ngdoc method
 * @signature select(platform)
 * @param  {string} platform Name of the platform.
 *   [en]Possible values are: "opera", "firefox", "safari", "chrome", "ie", "android", "blackberry", "ios" or "wp".[/en]
 *   [ja]"opera", "firefox", "safari", "chrome", "ie", "android", "blackberry", "ios", "wp"のいずれかを指定します。[/ja]
 * @description 
 *   [en]Sets the platform used to render the elements. Useful for testing.[/en]
 *   [ja]要素を描画するために利用するプラットフォーム名を設定します。テストに便利です。[/ja]
 */

/**
 * @ngdoc method
 * @signature isWebView()
 * @description 
 *   [en]Returns whether app is running in Cordova.[/en]
 *   [ja]Cordova内で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isIOS()
 * @description 
 *   [en]Returns whether the OS is iOS.[/en]
 *   [ja]iOS上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isAndroid()
 * @description 
 *   [en]Returns whether the OS is Android.[/en]
 *   [ja]Android上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isAndroidPhone()
 * @description 
 *   [en]Returns whether the device is Android phone.[/en]
 *   [ja]Android携帯上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isAndroidTablet()
 * @description 
 *   [en]Returns whether the device is Android tablet.[/en]
 *   [ja]Androidタブレット上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isIPhone()
 * @description 
 *   [en]Returns whether the device is iPhone.[/en]
 *   [ja]iPhone上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isIPad()
 * @description 
 *   [en]Returns whether the device is iPad.[/en]
 *   [ja]iPad上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isBlackBerry()
 * @description 
 *   [en]Returns whether the device is BlackBerry.[/en]
 *   [ja]BlackBerry上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isOpera()
 * @description 
 *   [en]Returns whether the browser is Opera.[/en]
 *   [ja]Opera上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isFirefox()
 * @description 
 *   [en]Returns whether the browser is Firefox.[/en]
 *   [ja]Firefox上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isSafari()
 * @description 
 *   [en]Returns whether the browser is Safari.[/en]
 *   [ja]Safari上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isChrome()
 * @description 
 *   [en]Returns whether the browser is Chrome.[/en]
 *   [ja]Chrome上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isIE()
 * @description 
 *   [en]Returns whether the browser is Internet Explorer.[/en]
 *   [ja]Internet Explorer上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isEdge()
 * @description 
 *   [en]Returns whether the browser is Edge.[/en]
 *   [ja]Edge上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isIOS7above()
 * @description 
 *   [en]Returns whether the iOS version is 7 or above.[/en]
 *   [ja]iOS7以上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';

  angular.module('onsen').run(['$templateCache', function($templateCache) {
    var templates = window.document.querySelectorAll('script[type="text/ons-template"]');

    for (var i = 0; i < templates.length; i++) {
      var template = angular.element(templates[i]);
      var id = template.attr('id');
      if (typeof id === 'string') {
        $templateCache.put(id, template.text());
      }
    }
  }]);

})();

/*! angular-onsenui.js for onsenui - v2.7.2 - 2017-11-13 */
"use strict";

/* Simple JavaScript Inheritance for ES 5.1
 * based on http://ejohn.org/blog/simple-javascript-inheritance/
 *  (inspired by base2 and Prototype)
 * MIT Licensed.
 */
(function () {
  "use strict";

  var fnTest = /xyz/.test(function () {
    xyz;
  }) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  function BaseClass() {}

  // Create a new Class that inherits from this class
  BaseClass.extend = function (props) {
    var _super = this.prototype;

    // Set up the prototype to inherit from the base class
    // (but without running the init constructor)
    var proto = Object.create(_super);

    // Copy the properties over onto the new prototype
    for (var name in props) {
      // Check if we're overwriting an existing function
      proto[name] = typeof props[name] === "function" && typeof _super[name] == "function" && fnTest.test(props[name]) ? function (name, fn) {
        return function () {
          var tmp = this._super;

          // Add a new ._super() method that is the same method
          // but on the super-class
          this._super = _super[name];

          // The method only need to be bound temporarily, so we
          // remove it when we're done executing
          var ret = fn.apply(this, arguments);
          this._super = tmp;

          return ret;
        };
      }(name, props[name]) : props[name];
    }

    // The new constructor
    var newClass = typeof proto.init === "function" ? proto.hasOwnProperty("init") ? proto.init // All construction is actually done in the init method
    : function SubClass() {
      _super.init.apply(this, arguments);
    } : function EmptyClass() {};

    // Populate our constructed prototype object
    newClass.prototype = proto;

    // Enforce the constructor to be what we expect
    proto.constructor = newClass;

    // And make this class extendable
    newClass.extend = BaseClass.extend;

    return newClass;
  };

  // export
  window.Class = BaseClass;
})();
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
 * @object ons
 * @description
 *   [ja]Onsen UIで利用できるグローバルなオブジェクトです。このオブジェクトは、AngularJSのスコープから参照することができます。 [/ja]
 *   [en]A global object that's used in Onsen UI. This object can be reached from the AngularJS scope.[/en]
 */

(function (ons) {
  'use strict';

  var module = angular.module('onsen', []);
  angular.module('onsen.directives', ['onsen']); // for BC

  // JS Global facade for Onsen UI.
  initOnsenFacade();
  waitOnsenUILoad();
  initAngularModule();
  initTemplateCache();

  function waitOnsenUILoad() {
    var unlockOnsenUI = ons._readyLock.lock();
    module.run(['$compile', '$rootScope', function ($compile, $rootScope) {
      // for initialization hook.
      if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
        window.addEventListener('DOMContentLoaded', function () {
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
    module.run(['$compile', '$rootScope', '$onsen', '$q', function ($compile, $rootScope, $onsen, $q) {
      ons._onsenService = $onsen;
      ons._qService = $q;

      $rootScope.ons = window.ons;
      $rootScope.console = window.console;
      $rootScope.alert = window.alert;

      ons.$compile = $compile;
    }]);
  }

  function initTemplateCache() {
    module.run(['$templateCache', function ($templateCache) {
      var tmp = ons._internal.getTemplateHTMLAsync;

      ons._internal.getTemplateHTMLAsync = function (page) {
        var cache = $templateCache.get(page);

        if (cache) {
          return Promise.resolve(cache);
        } else {
          return tmp(page);
        }
      };
    }]);
  }

  function initOnsenFacade() {
    ons._onsenService = null;

    // Object to attach component variables to when using the var="..." attribute.
    // Can be set to null to avoid polluting the global scope.
    ons.componentBase = window;

    /**
     * @method bootstrap
     * @signature bootstrap([moduleName, [dependencies]])
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
    ons.bootstrap = function (name, deps) {
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
        doc.addEventListener('DOMContentLoaded', function () {
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
     * @method findParentComponentUntil
     * @signature findParentComponentUntil(name, [dom])
     * @param {String} name
     *   [en]Name of component, i.e. 'ons-page'.[/en]
     *   [ja]コンポーネント名を指定します。例えばons-pageなどを指定します。[/ja]
     * @param {Object/jqLite/HTMLElement} [dom]
     *   [en]$event, jqLite or HTMLElement object.[/en]
     *   [ja]$eventオブジェクト、jqLiteオブジェクト、HTMLElementオブジェクトのいずれかを指定できます。[/ja]
     * @return {Object}
     *   [en]Component object. Will return null if no component was found.[/en]
     *   [ja]コンポーネントのオブジェクトを返します。もしコンポーネントが見つからなかった場合にはnullを返します。[/ja]
     * @description
     *   [en]Find parent component object of <code>dom</code> element.[/en]
     *   [ja]指定されたdom引数の親要素をたどってコンポーネントを検索します。[/ja]
     */
    ons.findParentComponentUntil = function (name, dom) {
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
     * @method findComponent
     * @signature findComponent(selector, [dom])
     * @param {String} selector
     *   [en]CSS selector[/en]
     *   [ja]CSSセレクターを指定します。[/ja]
     * @param {HTMLElement} [dom]
     *   [en]DOM element to search from.[/en]
     *   [ja]検索対象とするDOM要素を指定します。[/ja]
     * @return {Object/null}
     *   [en]Component object. Will return null if no component was found.[/en]
     *   [ja]コンポーネントのオブジェクトを返します。もしコンポーネントが見つからなかった場合にはnullを返します。[/ja]
     * @description
     *   [en]Find component object using CSS selector.[/en]
     *   [ja]CSSセレクタを使ってコンポーネントのオブジェクトを検索します。[/ja]
     */
    ons.findComponent = function (selector, dom) {
      var target = (dom ? dom : document).querySelector(selector);
      return target ? angular.element(target).data(target.nodeName.toLowerCase()) || null : null;
    };

    /**
     * @method compile
     * @signature compile(dom)
     * @param {HTMLElement} dom
     *   [en]Element to compile.[/en]
     *   [ja]コンパイルする要素を指定します。[/ja]
     * @description
     *   [en]Compile Onsen UI components.[/en]
     *   [ja]通常のHTMLの要素をOnsen UIのコンポーネントにコンパイルします。[/ja]
     */
    ons.compile = function (dom) {
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

    ons._getOnsenService = function () {
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
    ons._waitDiretiveInit = function (elementName, lastReady) {
      return function (element, callback) {
        if (angular.element(element).data(elementName)) {
          lastReady(element, callback);
        } else {
          var listen = function listen() {
            lastReady(element, callback);
            element.removeEventListener(elementName + ':init', listen, false);
          };
          element.addEventListener(elementName + ':init', listen, false);
        }
      };
    };

    /**
     * @method createElement
     * @signature createElement(template, [options])
     * @param {String} template
     *   [en]Either an HTML file path, an `<ons-template>` id or an HTML string such as `'<div id="foo">hoge</div>'`.[/en]
     *   [ja][/ja]
     * @param {Object} [options]
     *   [en]Parameter object.[/en]
     *   [ja]オプションを指定するオブジェクト。[/ja]
     * @param {Boolean|HTMLElement} [options.append]
     *   [en]Whether or not the element should be automatically appended to the DOM.  Defaults to `false`. If `true` value is given, `document.body` will be used as the target.[/en]
     *   [ja][/ja]
     * @param {HTMLElement} [options.insertBefore]
     *   [en]Reference node that becomes the next sibling of the new node (`options.append` element).[/en]
     *   [ja][/ja]
     * @param {Object} [options.parentScope]
     *   [en]Parent scope of the element. Used to bind models and access scope methods from the element. Requires append option.[/en]
     *   [ja][/ja]
     * @return {HTMLElement|Promise}
     *   [en]If the provided template was an inline HTML string, it returns the new element. Otherwise, it returns a promise that resolves to the new element.[/en]
     *   [ja][/ja]
     * @description
     *   [en]Create a new element from a template. Both inline HTML and external files are supported although the return value differs. If the element is appended it will also be compiled by AngularJS (otherwise, `ons.compile` should be manually used).[/en]
     *   [ja][/ja]
     */
    var createElementOriginal = ons.createElement;
    ons.createElement = function (template) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var link = function link(element) {
        if (options.parentScope) {
          ons.$compile(angular.element(element))(options.parentScope.$new());
          options.parentScope.$evalAsync();
        } else {
          ons.compile(element);
        }
      };

      var getScope = function getScope(e) {
        return angular.element(e).data(e.tagName.toLowerCase()) || e;
      };
      var result = createElementOriginal(template, _extends({ append: !!options.parentScope, link: link }, options));

      return result instanceof Promise ? result.then(getScope) : getScope(result);
    };

    /**
     * @method createAlertDialog
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
     *   [en]Create a alert dialog instance from a template. This method will be deprecated in favor of `ons.createElement`.[/en]
     *   [ja]テンプレートからアラートダイアログのインスタンスを生成します。[/ja]
     */

    /**
     * @method createDialog
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
     *   [en]Create a dialog instance from a template. This method will be deprecated in favor of `ons.createElement`.[/en]
     *   [ja]テンプレートからダイアログのインスタンスを生成します。[/ja]
     */

    /**
     * @method createPopover
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
     *   [en]Create a popover instance from a template. This method will be deprecated in favor of `ons.createElement`.[/en]
     *   [ja]テンプレートからポップオーバーのインスタンスを生成します。[/ja]
     */

    /**
     * @param {String} page
     */
    var resolveLoadingPlaceHolderOriginal = ons.resolveLoadingPlaceHolder;
    ons.resolveLoadingPlaceholder = function (page) {
      return resolveLoadingPlaceholderOriginal(page, function (element, done) {
        ons.compile(element);
        angular.element(element).scope().$evalAsync(function () {
          return setImmediate(done);
        });
      });
    };

    ons._setupLoadingPlaceHolders = function () {
      // Do nothing
    };
  }
})(window.ons = window.ons || {});
'use strict';

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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.factory('ActionSheetView', ['$onsen', function ($onsen) {

    var ActionSheetView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], ['show', 'hide']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['preshow', 'postshow', 'prehide', 'posthide', 'cancel'], function (detail) {
          if (detail.actionSheet) {
            detail.actionSheet = this;
          }
          return detail;
        }.bind(this));

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._element.remove();
        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._scope = this._attrs = this._element = null;
      }

    });

    ActionSheetView.registerAnimator = function (name, Animator) {
      return window.ons.ActionSheetElement.registerAnimator(name, Animator);
    };

    MicroEvent.mixin(ActionSheetView);
    $onsen.derivePropertiesFromElement(ActionSheetView, ['disabled', 'cancelable', 'visible', 'onDeviceBackButton']);

    return ActionSheetView;
  }]);
})();
'use strict';

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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.factory('AlertDialogView', ['$onsen', function ($onsen) {

    var AlertDialogView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], ['show', 'hide']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['preshow', 'postshow', 'prehide', 'posthide', 'cancel'], function (detail) {
          if (detail.alertDialog) {
            detail.alertDialog = this;
          }
          return detail;
        }.bind(this));

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._element.remove();

        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._scope = this._attrs = this._element = null;
      }

    });

    MicroEvent.mixin(AlertDialogView);
    $onsen.derivePropertiesFromElement(AlertDialogView, ['disabled', 'cancelable', 'visible', 'onDeviceBackButton']);

    return AlertDialogView;
  }]);
})();
'use strict';

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

angular.module('onsen').value('AlertDialogAnimator', ons._internal.AlertDialogAnimator).value('AndroidAlertDialogAnimator', ons._internal.AndroidAlertDialogAnimator).value('IOSAlertDialogAnimator', ons._internal.IOSAlertDialogAnimator);
'use strict';

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
'use strict';

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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.factory('CarouselView', ['$onsen', function ($onsen) {

    /**
     * @class CarouselView
     */
    var CarouselView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], ['setActiveIndex', 'getActiveIndex', 'next', 'prev', 'refresh', 'first', 'last']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['refresh', 'postchange', 'overscroll'], function (detail) {
          if (detail.carousel) {
            detail.carousel = this;
          }
          return detail;
        }.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingEvents();
        this._clearDerivingMethods();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(CarouselView);

    $onsen.derivePropertiesFromElement(CarouselView, ['centered', 'overscrollable', 'disabled', 'autoScroll', 'swipeable', 'autoScrollRatio', 'itemCount']);

    return CarouselView;
  }]);
})();
'use strict';

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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.factory('DialogView', ['$onsen', function ($onsen) {

    var DialogView = Class.extend({

      init: function init(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], ['show', 'hide']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['preshow', 'postshow', 'prehide', 'posthide', 'cancel'], function (detail) {
          if (detail.dialog) {
            detail.dialog = this;
          }
          return detail;
        }.bind(this));

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._element.remove();
        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._scope = this._attrs = this._element = null;
      }
    });

    DialogView.registerAnimator = function (name, Animator) {
      return window.ons.DialogElement.registerAnimator(name, Animator);
    };

    MicroEvent.mixin(DialogView);
    $onsen.derivePropertiesFromElement(DialogView, ['disabled', 'cancelable', 'visible', 'onDeviceBackButton']);

    return DialogView;
  }]);
})();
'use strict';

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

angular.module('onsen').value('DialogAnimator', ons._internal.DialogAnimator).value('IOSDialogAnimator', ons._internal.IOSDialogAnimator).value('AndroidDialogAnimator', ons._internal.AndroidDialogAnimator).value('SlideDialogAnimator', ons._internal.SlideDialogAnimator);
'use strict';

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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.factory('FabView', ['$onsen', function ($onsen) {

    /**
     * @class FabView
     */
    var FabView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], ['show', 'hide', 'toggle']);
      },

      _destroy: function _destroy() {
        this.emit('destroy');
        this._clearDerivingMethods();

        this._element = this._scope = this._attrs = null;
      }
    });

    $onsen.derivePropertiesFromElement(FabView, ['disabled', 'visible']);

    MicroEvent.mixin(FabView);

    return FabView;
  }]);
})();
'use strict';

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

(function () {
  'use strict';

  angular.module('onsen').factory('GenericView', ['$onsen', function ($onsen) {

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
      init: function init(scope, element, attrs, options) {
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

        $onsen.cleaner.onDestroy(scope, function () {
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
    GenericView.register = function (scope, element, attrs, options) {
      var view = new GenericView(scope, element, attrs, options);

      if (!options.viewKey) {
        throw new Error('options.viewKey is required.');
      }

      $onsen.declareVarAttribute(attrs, view);
      element.data(options.viewKey, view);

      var destroy = options.onDestroy || angular.noop;
      options.onDestroy = function (view) {
        destroy(view);
        element.data(options.viewKey, null);
      };

      return view;
    };

    MicroEvent.mixin(GenericView);

    return GenericView;
  }]);
})();
'use strict';

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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.factory('LazyRepeatView', ['AngularLazyRepeatDelegate', function (AngularLazyRepeatDelegate) {

    var LazyRepeatView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs, linker) {
        var _this = this;

        this._element = element;
        this._scope = scope;
        this._attrs = attrs;
        this._linker = linker;

        var userDelegate = this._scope.$eval(this._attrs.onsLazyRepeat);

        var internalDelegate = new AngularLazyRepeatDelegate(userDelegate, element[0], element.scope());

        this._provider = new ons._internal.LazyRepeatProvider(element[0].parentNode, internalDelegate);

        // Expose refresh method to user.
        userDelegate.refresh = this._provider.refresh.bind(this._provider);

        element.remove();

        // Render when number of items change.
        this._scope.$watch(internalDelegate.countItems.bind(internalDelegate), this._provider._onChange.bind(this._provider));

        this._scope.$on('$destroy', function () {
          _this._element = _this._scope = _this._attrs = _this._linker = null;
        });
      }
    });

    return LazyRepeatView;
  }]);
})();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

(function () {
  'use strict';

  angular.module('onsen').factory('AngularLazyRepeatDelegate', ['$compile', function ($compile) {

    var directiveAttributes = ['ons-lazy-repeat', 'ons:lazy:repeat', 'ons_lazy_repeat', 'data-ons-lazy-repeat', 'x-ons-lazy-repeat'];

    var AngularLazyRepeatDelegate = function (_ons$_internal$LazyRe) {
      _inherits(AngularLazyRepeatDelegate, _ons$_internal$LazyRe);

      /**
       * @param {Object} userDelegate
       * @param {Element} templateElement
       * @param {Scope} parentScope
       */
      function AngularLazyRepeatDelegate(userDelegate, templateElement, parentScope) {
        _classCallCheck(this, AngularLazyRepeatDelegate);

        var _this = _possibleConstructorReturn(this, (AngularLazyRepeatDelegate.__proto__ || Object.getPrototypeOf(AngularLazyRepeatDelegate)).call(this, userDelegate, templateElement));

        _this._parentScope = parentScope;

        directiveAttributes.forEach(function (attr) {
          return templateElement.removeAttribute(attr);
        });
        _this._linker = $compile(templateElement ? templateElement.cloneNode(true) : null);
        return _this;
      }

      _createClass(AngularLazyRepeatDelegate, [{
        key: 'configureItemScope',
        value: function configureItemScope(item, scope) {
          if (this._userDelegate.configureItemScope instanceof Function) {
            this._userDelegate.configureItemScope(item, scope);
          }
        }
      }, {
        key: 'destroyItemScope',
        value: function destroyItemScope(item, element) {
          if (this._userDelegate.destroyItemScope instanceof Function) {
            this._userDelegate.destroyItemScope(item, element);
          }
        }
      }, {
        key: '_usingBinding',
        value: function _usingBinding() {
          if (this._userDelegate.configureItemScope) {
            return true;
          }

          if (this._userDelegate.createItemContent) {
            return false;
          }

          throw new Error('`lazy-repeat` delegate object is vague.');
        }
      }, {
        key: 'loadItemElement',
        value: function loadItemElement(index, done) {
          this._prepareItemElement(index, function (_ref) {
            var element = _ref.element,
                scope = _ref.scope;

            done({ element: element, scope: scope });
          });
        }
      }, {
        key: '_prepareItemElement',
        value: function _prepareItemElement(index, done) {
          var _this2 = this;

          var scope = this._parentScope.$new();
          this._addSpecialProperties(index, scope);

          if (this._usingBinding()) {
            this.configureItemScope(index, scope);
          }

          this._linker(scope, function (cloned) {
            var element = cloned[0];
            if (!_this2._usingBinding()) {
              element = _this2._userDelegate.createItemContent(index, element);
              $compile(element)(scope);
            }

            done({ element: element, scope: scope });
          });
        }

        /**
         * @param {Number} index
         * @param {Object} scope
         */

      }, {
        key: '_addSpecialProperties',
        value: function _addSpecialProperties(i, scope) {
          var last = this.countItems() - 1;
          angular.extend(scope, {
            $index: i,
            $first: i === 0,
            $last: i === last,
            $middle: i !== 0 && i !== last,
            $even: i % 2 === 0,
            $odd: i % 2 === 1
          });
        }
      }, {
        key: 'updateItem',
        value: function updateItem(index, item) {
          var _this3 = this;

          if (this._usingBinding()) {
            item.scope.$evalAsync(function () {
              return _this3.configureItemScope(index, item.scope);
            });
          } else {
            _get(AngularLazyRepeatDelegate.prototype.__proto__ || Object.getPrototypeOf(AngularLazyRepeatDelegate.prototype), 'updateItem', this).call(this, index, item);
          }
        }

        /**
         * @param {Number} index
         * @param {Object} item
         * @param {Object} item.scope
         * @param {Element} item.element
         */

      }, {
        key: 'destroyItem',
        value: function destroyItem(index, item) {
          if (this._usingBinding()) {
            this.destroyItemScope(index, item.scope);
          } else {
            _get(AngularLazyRepeatDelegate.prototype.__proto__ || Object.getPrototypeOf(AngularLazyRepeatDelegate.prototype), 'destroyItem', this).call(this, index, item.element);
          }
          item.scope.$destroy();
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          _get(AngularLazyRepeatDelegate.prototype.__proto__ || Object.getPrototypeOf(AngularLazyRepeatDelegate.prototype), 'destroy', this).call(this);
          this._scope = null;
        }
      }]);

      return AngularLazyRepeatDelegate;
    }(ons._internal.LazyRepeatDelegate);

    return AngularLazyRepeatDelegate;
  }]);
})();
'use strict';

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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.value('ModalAnimator', ons._internal.ModalAnimator);
  module.value('FadeModalAnimator', ons._internal.FadeModalAnimator);

  module.factory('ModalView', ['$onsen', '$parse', function ($onsen, $parse) {

    var ModalView = Class.extend({
      _element: undefined,
      _scope: undefined,

      init: function init(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      show: function show(options) {
        return this._element[0].show(options);
      },

      hide: function hide(options) {
        return this._element[0].hide(options);
      },

      toggle: function toggle(options) {
        return this._element[0].toggle(options);
      },

      _destroy: function _destroy() {
        this.emit('destroy', { page: this });

        this._events = this._element = this._scope = null;
      }
    });

    ModalView.registerAnimator = function (name, Animator) {
      return window.ons.ModalElement.registerAnimator(name, Animator);
    };

    MicroEvent.mixin(ModalView);
    $onsen.derivePropertiesFromElement(ModalView, ['onDeviceBackButton']);

    return ModalView;
  }]);
})();
'use strict';

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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.factory('NavigatorView', ['$compile', '$onsen', function ($compile, $onsen) {

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
      init: function init(scope, element, attrs) {

        this._element = element || angular.element(window.document.body);
        this._scope = scope || this._element.scope();
        this._attrs = attrs;
        this._previousPageScope = null;

        this._boundOnPrepop = this._onPrepop.bind(this);
        this._element.on('prepop', this._boundOnPrepop);

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['prepush', 'postpush', 'prepop', 'postpop', 'init', 'show', 'hide', 'destroy'], function (detail) {
          if (detail.navigator) {
            detail.navigator = this;
          }
          return detail;
        }.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], ['insertPage', 'removePage', 'pushPage', 'bringPageTop', 'popPage', 'replacePage', 'resetToPage', 'canPopPage']);
      },

      _onPrepop: function _onPrepop(event) {
        var pages = event.detail.navigator.pages;
        angular.element(pages[pages.length - 2]).data('_scope').$evalAsync();
      },

      _destroy: function _destroy() {
        this.emit('destroy');
        this._clearDerivingEvents();
        this._clearDerivingMethods();
        this._element.off('prepop', this._boundOnPrepop);
        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(NavigatorView);
    $onsen.derivePropertiesFromElement(NavigatorView, ['pages', 'topPage']);

    return NavigatorView;
  }]);
})();
'use strict';

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

angular.module('onsen').value('NavigatorTransitionAnimator', ons._internal.NavigatorTransitionAnimator).value('FadeTransitionAnimator', ons._internal.FadeNavigatorTransitionAnimator).value('IOSSlideTransitionAnimator', ons._internal.IOSSlideNavigatorTransitionAnimator).value('LiftTransitionAnimator', ons._internal.LiftNavigatorTransitionAnimator).value('NullTransitionAnimator', ons._internal.NavigatorTransitionAnimator).value('SimpleSlideTransitionAnimator', ons._internal.SimpleSlideNavigatorTransitionAnimator);
'use strict';

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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.factory('PageView', ['$onsen', '$parse', function ($onsen, $parse) {

    var PageView = Class.extend({
      init: function init(scope, element, attrs) {
        var _this = this;

        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._clearListener = scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['init', 'show', 'hide', 'destroy']);

        Object.defineProperty(this, 'onDeviceBackButton', {
          get: function get() {
            return _this._element[0].onDeviceBackButton;
          },
          set: function set(value) {
            if (!_this._userBackButtonHandler) {
              _this._enableBackButtonHandler();
            }
            _this._userBackButtonHandler = value;
          }
        });

        if (this._attrs.ngDeviceBackButton || this._attrs.onDeviceBackButton) {
          this._enableBackButtonHandler();
        }
        if (this._attrs.ngInfiniteScroll) {
          this._element[0].onInfiniteScroll = function (done) {
            $parse(_this._attrs.ngInfiniteScroll)(_this._scope)(done);
          };
        }
      },

      _enableBackButtonHandler: function _enableBackButtonHandler() {
        this._userBackButtonHandler = angular.noop;
        this._element[0].onDeviceBackButton = this._onDeviceBackButton.bind(this);
      },

      _onDeviceBackButton: function _onDeviceBackButton($event) {
        this._userBackButtonHandler($event);

        // ng-device-backbutton
        if (this._attrs.ngDeviceBackButton) {
          $parse(this._attrs.ngDeviceBackButton)(this._scope, { $event: $event });
        }

        // on-device-backbutton
        /* jshint ignore:start */
        if (this._attrs.onDeviceBackButton) {
          var lastEvent = window.$event;
          window.$event = $event;
          new Function(this._attrs.onDeviceBackButton)(); // eslint-disable-line no-new-func
          window.$event = lastEvent;
        }
        /* jshint ignore:end */
      },

      _destroy: function _destroy() {
        this._clearDerivingEvents();

        this._element = null;
        this._scope = null;

        this._clearListener();
      }
    });
    MicroEvent.mixin(PageView);

    return PageView;
  }]);
})();
'use strict';

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

(function () {
  'use strict';

  angular.module('onsen').factory('PopoverView', ['$onsen', function ($onsen) {

    var PopoverView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], ['show', 'hide']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['preshow', 'postshow', 'prehide', 'posthide'], function (detail) {
          if (detail.popover) {
            detail.popover = this;
          }
          return detail;
        }.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._element.remove();

        this._element = this._scope = null;
      }
    });

    MicroEvent.mixin(PopoverView);
    $onsen.derivePropertiesFromElement(PopoverView, ['cancelable', 'disabled', 'onDeviceBackButton']);

    return PopoverView;
  }]);
})();
'use strict';

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

angular.module('onsen').value('PopoverAnimator', ons._internal.PopoverAnimator).value('FadePopoverAnimator', ons._internal.FadePopoverAnimator);
'use strict';

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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.factory('PullHookView', ['$onsen', '$parse', function ($onsen, $parse) {

    var PullHookView = Class.extend({

      init: function init(scope, element, attrs) {
        var _this = this;

        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['changestate'], function (detail) {
          if (detail.pullHook) {
            detail.pullHook = _this;
          }
          return detail;
        });

        this.on('changestate', function () {
          return _this._scope.$evalAsync();
        });

        this._element[0].onAction = function (done) {
          if (_this._attrs.ngAction) {
            _this._scope.$eval(_this._attrs.ngAction, { $done: done });
          } else {
            _this.onAction ? _this.onAction(done) : done();
          }
        };

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingEvents();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(PullHookView);
    $onsen.derivePropertiesFromElement(PullHookView, ['state', 'pullDistance', 'height', 'thresholdHeight', 'disabled']);

    return PullHookView;
  }]);
})();
'use strict';

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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.factory('SpeedDialView', ['$onsen', function ($onsen) {

    /**
     * @class SpeedDialView
     */
    var SpeedDialView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], ['show', 'hide', 'showItems', 'hideItems', 'isOpen', 'toggle', 'toggleItems']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['open', 'close']).bind(this);
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingEvents();
        this._clearDerivingMethods();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(SpeedDialView);

    $onsen.derivePropertiesFromElement(SpeedDialView, ['disabled', 'visible', 'inline']);

    return SpeedDialView;
  }]);
})();
'use strict';

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
(function () {
  'use strict';

  angular.module('onsen').factory('SplitterContent', ['$onsen', '$compile', function ($onsen, $compile) {

    var SplitterContent = Class.extend({

      init: function init(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this.load = this._element[0].load.bind(this._element[0]);
        scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');
        this._element = this._scope = this._attrs = this.load = this._pageScope = null;
      }
    });

    MicroEvent.mixin(SplitterContent);
    $onsen.derivePropertiesFromElement(SplitterContent, ['page']);

    return SplitterContent;
  }]);
})();
'use strict';

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
(function () {
  'use strict';

  angular.module('onsen').factory('SplitterSide', ['$onsen', '$compile', function ($onsen, $compile) {

    var SplitterSide = Class.extend({

      init: function init(scope, element, attrs) {
        var _this = this;

        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], ['open', 'close', 'toggle', 'load']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['modechange', 'preopen', 'preclose', 'postopen', 'postclose'], function (detail) {
          return detail.side ? angular.extend(detail, { side: _this }) : detail;
        });

        scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(SplitterSide);
    $onsen.derivePropertiesFromElement(SplitterSide, ['page', 'mode', 'isOpen']);

    return SplitterSide;
  }]);
})();
'use strict';

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
(function () {
  'use strict';

  angular.module('onsen').factory('Splitter', ['$onsen', function ($onsen) {

    var Splitter = Class.extend({
      init: function init(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;
        scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');
        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(Splitter);
    $onsen.derivePropertiesFromElement(Splitter, ['onDeviceBackButton']);

    ['left', 'right', 'content', 'mask'].forEach(function (prop, i) {
      Object.defineProperty(Splitter.prototype, prop, {
        get: function get() {
          var tagName = 'ons-splitter-' + (i < 2 ? 'side' : prop);
          return angular.element(this._element[0][prop]).data(tagName);
        }
      });
    });

    return Splitter;
  }]);
})();
'use strict';

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

(function () {
  'use strict';

  angular.module('onsen').factory('SwitchView', ['$parse', '$onsen', function ($parse, $onsen) {

    var SwitchView = Class.extend({

      /**
       * @param {jqLite} element
       * @param {Object} scope
       * @param {Object} attrs
       */
      init: function init(element, scope, attrs) {
        var _this = this;

        this._element = element;
        this._checkbox = angular.element(element[0].querySelector('input[type=checkbox]'));
        this._scope = scope;

        this._prepareNgModel(element, scope, attrs);

        this._scope.$on('$destroy', function () {
          _this.emit('destroy');
          _this._element = _this._checkbox = _this._scope = null;
        });
      },

      _prepareNgModel: function _prepareNgModel(element, scope, attrs) {
        var _this2 = this;

        if (attrs.ngModel) {
          var set = $parse(attrs.ngModel).assign;

          scope.$parent.$watch(attrs.ngModel, function (value) {
            _this2.checked = !!value;
          });

          this._element.on('change', function (e) {
            set(scope.$parent, _this2.checked);

            if (attrs.ngChange) {
              scope.$eval(attrs.ngChange);
            }

            scope.$parent.$evalAsync();
          });
        }
      }
    });

    MicroEvent.mixin(SwitchView);
    $onsen.derivePropertiesFromElement(SwitchView, ['disabled', 'checked', 'checkbox']);

    return SwitchView;
  }]);
})();
'use strict';

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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.value('TabbarNoneAnimator', ons._internal.TabbarNoneAnimator);
  module.value('TabbarFadeAnimator', ons._internal.TabbarFadeAnimator);
  module.value('TabbarSlideAnimator', ons._internal.TabbarSlideAnimator);

  module.factory('TabbarView', ['$onsen', function ($onsen) {
    var TabbarView = Class.extend({

      init: function init(scope, element, attrs) {
        if (element[0].nodeName.toLowerCase() !== 'ons-tabbar') {
          throw new Error('"element" parameter must be a "ons-tabbar" element.');
        }

        this._scope = scope;
        this._element = element;
        this._attrs = attrs;
        this._lastPageElement = null;
        this._lastPageScope = null;

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['reactive', 'postchange', 'prechange', 'init', 'show', 'hide', 'destroy']);

        this._clearDerivingMethods = $onsen.deriveMethods(this, element[0], ['setActiveTab', 'setTabbarVisibility', 'getActiveTabIndex', 'loadPage']);
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._clearDerivingEvents();
        this._clearDerivingMethods();

        this._element = this._scope = this._attrs = null;
      }
    });
    MicroEvent.mixin(TabbarView);

    TabbarView.registerAnimator = function (name, Animator) {
      return window.ons.TabbarElement.registerAnimator(name, Animator);
    };

    return TabbarView;
  }]);
})();
'use strict';

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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.factory('ToastView', ['$onsen', function ($onsen) {

    var ToastView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function init(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._clearDerivingMethods = $onsen.deriveMethods(this, this._element[0], ['show', 'hide', 'toggle']);

        this._clearDerivingEvents = $onsen.deriveEvents(this, this._element[0], ['preshow', 'postshow', 'prehide', 'posthide'], function (detail) {
          if (detail.toast) {
            detail.toast = this;
          }
          return detail;
        }.bind(this));

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function _destroy() {
        this.emit('destroy');

        this._element.remove();

        this._clearDerivingMethods();
        this._clearDerivingEvents();

        this._scope = this._attrs = this._element = null;
      }

    });

    MicroEvent.mixin(ToastView);
    $onsen.derivePropertiesFromElement(ToastView, ['visible', 'onDeviceBackButton']);

    return ToastView;
  }]);
})();
'use strict';

/**
 * @element ons-action-sheet
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this action sheet.[/en]
 *  [ja]このアクションシートを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-preshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-prehide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-posthide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
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
 * @method once
 * @signature once(eventName, listener)
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
 * @method off
 * @signature off(eventName, [listener])
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

(function () {
  'use strict';

  /**
   * Action sheet directive.
   */

  angular.module('onsen').directive('onsActionSheet', ['$onsen', 'ActionSheetView', function ($onsen, ActionSheetView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      transclude: false,

      compile: function compile(element, attrs) {

        return {
          pre: function pre(scope, element, attrs) {
            var actionSheet = new ActionSheetView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, actionSheet);
            $onsen.registerEventHandlers(actionSheet, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethodsForCustomElements(actionSheet, element);

            element.data('ons-action-sheet', actionSheet);

            scope.$on('$destroy', function () {
              actionSheet._events = undefined;
              $onsen.removeModifierMethods(actionSheet);
              element.data('ons-action-sheet', undefined);
              element = null;
            });
          },
          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('onsen').directive('onsActionSheetButton', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        GenericView.register(scope, element, attrs, { viewKey: 'ons-action-sheet-button' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-alert-dialog
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this alert dialog.[/en]
 *  [ja]このアラートダイアログを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-preshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-prehide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-posthide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
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
 * @method once
 * @signature once(eventName, listener)
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
 * @method off
 * @signature off(eventName, [listener])
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

(function () {
  'use strict';

  /**
   * Alert dialog directive.
   */

  angular.module('onsen').directive('onsAlertDialog', ['$onsen', 'AlertDialogView', function ($onsen, AlertDialogView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      transclude: false,

      compile: function compile(element, attrs) {

        return {
          pre: function pre(scope, element, attrs) {
            var alertDialog = new AlertDialogView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, alertDialog);
            $onsen.registerEventHandlers(alertDialog, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethodsForCustomElements(alertDialog, element);

            element.data('ons-alert-dialog', alertDialog);
            element.data('_scope', scope);

            scope.$on('$destroy', function () {
              alertDialog._events = undefined;
              $onsen.removeModifierMethods(alertDialog);
              element.data('ons-alert-dialog', undefined);
              element = null;
            });
          },
          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsBackButton', ['$onsen', '$compile', 'GenericView', 'ComponentCleaner', function ($onsen, $compile, GenericView, ComponentCleaner) {
    return {
      restrict: 'E',
      replace: false,

      compile: function compile(element, attrs) {

        return {
          pre: function pre(scope, element, attrs, controller, transclude) {
            var backButton = GenericView.register(scope, element, attrs, {
              viewKey: 'ons-back-button'
            });

            if (attrs.ngClick) {
              element[0].onClick = angular.noop;
            }

            scope.$on('$destroy', function () {
              backButton._events = undefined;
              $onsen.removeModifierMethods(backButton);
              element = null;
            });

            ComponentCleaner.onDestroy(scope, function () {
              ComponentCleaner.destroyScope(scope);
              ComponentCleaner.destroyAttributes(attrs);
              element = scope = attrs = null;
            });
          },
          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('onsen').directive('onsBottomToolbar', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: {
        pre: function pre(scope, element, attrs) {
          GenericView.register(scope, element, attrs, {
            viewKey: 'ons-bottomToolbar'
          });
        },

        post: function post(scope, element, attrs) {
          $onsen.fireComponentEvent(element[0], 'init');
        }
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-button
 */

(function () {
  'use strict';

  angular.module('onsen').directive('onsButton', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        var button = GenericView.register(scope, element, attrs, {
          viewKey: 'ons-button'
        });

        Object.defineProperty(button, 'disabled', {
          get: function get() {
            return this._element[0].disabled;
          },
          set: function set(value) {
            return this._element[0].disabled = value;
          }
        });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('onsen').directive('onsCard', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        GenericView.register(scope, element, attrs, { viewKey: 'ons-card' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-carousel
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
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this carousel.[/en]
 *   [ja]このカルーセルを参照するための変数名を指定します。[/ja]
 */

/**
 * @attribute ons-postchange
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postchange" event is fired.[/en]
 *  [ja]"postchange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-refresh
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "refresh" event is fired.[/en]
 *  [ja]"refresh"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-overscroll
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "overscroll" event is fired.[/en]
 *  [ja]"overscroll"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
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
 * @method off
 * @signature off(eventName, [listener])
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

/**
 * @method on
 * @signature on(eventName, listener)
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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsCarousel', ['$onsen', 'CarouselView', function ($onsen, CarouselView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      compile: function compile(element, attrs) {

        return function (scope, element, attrs) {
          var carousel = new CarouselView(scope, element, attrs);

          element.data('ons-carousel', carousel);

          $onsen.registerEventHandlers(carousel, 'postchange refresh overscroll destroy');
          $onsen.declareVarAttribute(attrs, carousel);

          scope.$on('$destroy', function () {
            carousel._events = undefined;
            element.data('ons-carousel', undefined);
            element = null;
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }

    };
  }]);

  module.directive('onsCarouselItem', ['$onsen', function ($onsen) {
    return {
      restrict: 'E',
      compile: function compile(element, attrs) {
        return function (scope, element, attrs) {
          if (scope.$last) {
            var carousel = $onsen.util.findParent(element[0], 'ons-carousel');
            carousel._swiper.init({
              swipeable: carousel.hasAttribute('swipeable'),
              autoRefresh: carousel.hasAttribute('auto-refresh')
            });
          }
        };
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-checkbox
 */

(function () {
  'use strict';

  angular.module('onsen').directive('onsCheckbox', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function link(scope, element, attrs) {
        var el = element[0];

        var onChange = function onChange() {
          $parse(attrs.ngModel).assign(scope, el.checked);
          attrs.ngChange && scope.$eval(attrs.ngChange);
          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, function (value) {
            return el.checked = value;
          });
          element.on('change', onChange);
        }

        scope.$on('$destroy', function () {
          element.off('change', onChange);
          scope = element = attrs = el = null;
        });
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-dialog
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this dialog.[/en]
 *  [ja]このダイアログを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-preshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-prehide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-posthide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
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
 * @method once
 * @signature once(eventName, listener)
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
 * @method off
 * @signature off(eventName, [listener])
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
(function () {
  'use strict';

  angular.module('onsen').directive('onsDialog', ['$onsen', 'DialogView', function ($onsen, DialogView) {
    return {
      restrict: 'E',
      scope: true,
      compile: function compile(element, attrs) {

        return {
          pre: function pre(scope, element, attrs) {

            var dialog = new DialogView(scope, element, attrs);
            $onsen.declareVarAttribute(attrs, dialog);
            $onsen.registerEventHandlers(dialog, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethodsForCustomElements(dialog, element);

            element.data('ons-dialog', dialog);
            scope.$on('$destroy', function () {
              dialog._events = undefined;
              $onsen.removeModifierMethods(dialog);
              element.data('ons-dialog', undefined);
              element = null;
            });
          },

          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsDummyForInit', ['$rootScope', function ($rootScope) {
    var isReady = false;

    return {
      restrict: 'E',
      replace: false,

      link: {
        post: function post(scope, element) {
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
'use strict';

/**
 * @element ons-fab
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer the floating action button.[/en]
 *   [ja]このフローティングアクションボタンを参照するための変数名をしてします。[/ja]
 */

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsFab', ['$onsen', 'FabView', function ($onsen, FabView) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,
      transclude: false,

      compile: function compile(element, attrs) {

        return function (scope, element, attrs) {
          var fab = new FabView(scope, element, attrs);

          element.data('ons-fab', fab);

          $onsen.declareVarAttribute(attrs, fab);

          scope.$on('$destroy', function () {
            element.data('ons-fab', undefined);
            element = null;
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }

    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  var EVENTS = ('drag dragleft dragright dragup dragdown hold release swipe swipeleft swiperight ' + 'swipeup swipedown tap doubletap touch transform pinch pinchin pinchout rotate').split(/ +/);

  angular.module('onsen').directive('onsGestureDetector', ['$onsen', function ($onsen) {

    var scopeDef = EVENTS.reduce(function (dict, name) {
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

      compile: function compile(element, attrs) {
        return function link(scope, element, attrs, _, transclude) {

          transclude(scope.$parent, function (cloned) {
            element.append(cloned);
          });

          var handler = function handler(event) {
            var attr = 'ng' + titlize(event.type);

            if (attr in scopeDef) {
              scope[attr]({ $event: event });
            }
          };

          var gestureDetector;

          setImmediate(function () {
            gestureDetector = element[0]._gestureDetector;
            gestureDetector.on(EVENTS.join(' '), handler);
          });

          $onsen.cleaner.onDestroy(scope, function () {
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
'use strict';

/**
 * @element ons-icon
 */

(function () {
  'use strict';

  angular.module('onsen').directive('onsIcon', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',

      compile: function compile(element, attrs) {

        if (attrs.icon.indexOf('{{') !== -1) {
          attrs.$observe('icon', function () {
            setImmediate(function () {
              return element[0]._update();
            });
          });
        }

        return function (scope, element, attrs) {
          GenericView.register(scope, element, attrs, {
            viewKey: 'ons-icon'
          });
          // $onsen.fireComponentEvent(element[0], 'init');
        };
      }

    };
  }]);
})();
'use strict';

/**
 * @element ons-if-orientation
 * @category conditional
 * @description
 *   [en]Conditionally display content depending on screen orientation. Valid values are portrait and landscape. Different from other components, this component is used as attribute in any element.[/en]
 *   [ja]画面の向きに応じてコンテンツの制御を行います。portraitもしくはlandscapeを指定できます。すべての要素の属性に使用できます。[/ja]
 * @seealso ons-if-platform [en]ons-if-platform component[/en][ja]ons-if-platformコンポーネント[/ja]
 * @example
 * <div ons-if-orientation="portrait">
 *   <p>This will only be visible in portrait mode.</p>
 * </div>
 */

/**
 * @attribute ons-if-orientation
 * @initonly
 * @type {String}
 * @description
 *   [en]Either "portrait" or "landscape".[/en]
 *   [ja]portraitもしくはlandscapeを指定します。[/ja]
 */

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsIfOrientation', ['$onsen', '$onsGlobal', function ($onsen, $onsGlobal) {
    return {
      restrict: 'A',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function compile(element) {
        element.css('display', 'none');

        return function (scope, element, attrs) {
          attrs.$observe('onsIfOrientation', update);
          $onsGlobal.orientation.on('change', update);

          update();

          $onsen.cleaner.onDestroy(scope, function () {
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
'use strict';

/**
 * @element ons-if-platform
 * @category conditional
 * @description
 *    [en]Conditionally display content depending on the platform / browser. Valid values are "opera", "firefox", "safari", "chrome", "ie", "edge", "android", "blackberry", "ios" and "wp".[/en]
 *    [ja]プラットフォームやブラウザーに応じてコンテンツの制御をおこないます。opera, firefox, safari, chrome, ie, edge, android, blackberry, ios, wpのいずれかの値を空白区切りで複数指定できます。[/ja]
 * @seealso ons-if-orientation [en]ons-if-orientation component[/en][ja]ons-if-orientationコンポーネント[/ja]
 * @example
 * <div ons-if-platform="android">
 *   ...
 * </div>
 */

/**
 * @attribute ons-if-platform
 * @type {String}
 * @initonly
 * @description
 *   [en]One or multiple space separated values: "opera", "firefox", "safari", "chrome", "ie", "edge", "android", "blackberry", "ios" or "wp".[/en]
 *   [ja]"opera", "firefox", "safari", "chrome", "ie", "edge", "android", "blackberry", "ios", "wp"のいずれか空白区切りで複数指定できます。[/ja]
 */

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsIfPlatform', ['$onsen', function ($onsen) {
    return {
      restrict: 'A',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function compile(element) {
        element.css('display', 'none');

        var platform = getPlatformString();

        return function (scope, element, attrs) {
          attrs.$observe('onsIfPlatform', function (userPlatform) {
            if (userPlatform) {
              update();
            }
          });

          update();

          $onsen.cleaner.onDestroy(scope, function () {
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

          if (navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/RIM Tablet OS/i) || navigator.userAgent.match(/BB10/i)) {
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

          var isFirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
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
'use strict';

/**
 * @element ons-input
 */

(function () {
  'use strict';

  angular.module('onsen').directive('onsInput', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function link(scope, element, attrs) {
        var el = element[0];

        var onInput = function onInput() {
          $parse(attrs.ngModel).assign(scope, el.type === 'number' ? Number(el.value) : el.value);
          attrs.ngChange && scope.$eval(attrs.ngChange);
          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, function (value) {
            if (typeof value !== 'undefined' && value !== el.value) {
              el.value = value;
            }
          });

          element.on('input', onInput);
        }

        scope.$on('$destroy', function () {
          element.off('input', onInput);
          scope = element = attrs = el = null;
        });
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-keyboard-active
 * @category form
 * @description
 *   [en]
 *     Conditionally display content depending on if the software keyboard is visible or hidden.
 *     This component requires cordova and that the com.ionic.keyboard plugin is installed.
 *   [/en]
 *   [ja]
 *     ソフトウェアキーボードが表示されているかどうかで、コンテンツを表示するかどうかを切り替えることが出来ます。
 *     このコンポーネントは、Cordovaやcom.ionic.keyboardプラグインを必要とします。
 *   [/ja]
 * @example
 * <div ons-keyboard-active>
 *   This will only be displayed if the software keyboard is open.
 * </div>
 * <div ons-keyboard-inactive>
 *   There is also a component that does the opposite.
 * </div>
 */

/**
 * @attribute ons-keyboard-active
 * @description
 *   [en]The content of tags with this attribute will be visible when the software keyboard is open.[/en]
 *   [ja]この属性がついた要素は、ソフトウェアキーボードが表示された時に初めて表示されます。[/ja]
 */

/**
 * @attribute ons-keyboard-inactive
 * @description
 *   [en]The content of tags with this attribute will be visible when the software keyboard is hidden.[/en]
 *   [ja]この属性がついた要素は、ソフトウェアキーボードが隠れている時のみ表示されます。[/ja]
 */

(function () {
  'use strict';

  var module = angular.module('onsen');

  var compileFunction = function compileFunction(show, $onsen) {
    return function (element) {
      return function (scope, element, attrs) {
        var dispShow = show ? 'block' : 'none',
            dispHide = show ? 'none' : 'block';

        var onShow = function onShow() {
          element.css('display', dispShow);
        };

        var onHide = function onHide() {
          element.css('display', dispHide);
        };

        var onInit = function onInit(e) {
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

        $onsen.cleaner.onDestroy(scope, function () {
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

  module.directive('onsKeyboardActive', ['$onsen', function ($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,
      compile: compileFunction(true, $onsen)
    };
  }]);

  module.directive('onsKeyboardInactive', ['$onsen', function ($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,
      compile: compileFunction(false, $onsen)
    };
  }]);
})();
'use strict';

/**
 * @element ons-lazy-repeat
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
 * @attribute ons-lazy-repeat
 * @type {Expression}
 * @initonly
 * @description
 *  [en]A delegate object, can be either an object attached to the scope (when using AngularJS) or a normal JavaScript variable.[/en]
 *  [ja]要素のロード、アンロードなどの処理を委譲するオブジェクトを指定します。AngularJSのスコープの変数名や、通常のJavaScriptの変数名を指定します。[/ja]
 */

/**
 * @property delegate.configureItemScope
 * @type {Function}
 * @description
 *   [en]Function which recieves an index and the scope for the item. Can be used to configure values in the item scope.[/en]
 *   [ja][/ja]
 */

(function () {
  'use strict';

  var module = angular.module('onsen');

  /**
   * Lazy repeat directive.
   */
  module.directive('onsLazyRepeat', ['$onsen', 'LazyRepeatView', function ($onsen, LazyRepeatView) {
    return {
      restrict: 'A',
      replace: false,
      priority: 1000,
      terminal: true,

      compile: function compile(element, attrs) {
        return function (scope, element, attrs) {
          var lazyRepeat = new LazyRepeatView(scope, element, attrs);

          scope.$on('$destroy', function () {
            scope = element = attrs = lazyRepeat = null;
          });
        };
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('onsen').directive('onsList', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        GenericView.register(scope, element, attrs, { viewKey: 'ons-list' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('onsen').directive('onsListHeader', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        GenericView.register(scope, element, attrs, { viewKey: 'ons-list-header' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('onsen').directive('onsListItem', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        GenericView.register(scope, element, attrs, { viewKey: 'ons-list-item' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('onsen').directive('onsListTitle', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        GenericView.register(scope, element, attrs, { viewKey: 'ons-list-title' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-loading-placeholder
 * @category util
 * @description
 *   [en]Display a placeholder while the content is loading.[/en]
 *   [ja]Onsen UIが読み込まれるまでに表示するプレースホルダーを表現します。[/ja]
 * @example
 * <div ons-loading-placeholder="page.html">
 *   Loading...
 * </div>
 */

/**
 * @attribute ons-loading-placeholder
 * @initonly
 * @type {String}
 * @description
 *   [en]The url of the page to load.[/en]
 *   [ja]読み込むページのURLを指定します。[/ja]
 */

(function () {
  'use strict';

  angular.module('onsen').directive('onsLoadingPlaceholder', function () {
    return {
      restrict: 'A',
      link: function link(scope, element, attrs) {
        if (attrs.onsLoadingPlaceholder) {
          ons._resolveLoadingPlaceholder(element[0], attrs.onsLoadingPlaceholder, function (contentElement, done) {
            ons.compile(contentElement);
            scope.$evalAsync(function () {
              setImmediate(done);
            });
          });
        }
      }
    };
  });
})();
'use strict';

/**
 * @element ons-modal
 */

/**
 * @attribute var
 * @type {String}
 * @initonly
 * @description
 *   [en]Variable name to refer this modal.[/en]
 *   [ja]このモーダルを参照するための名前を指定します。[/ja]
 */

(function () {
  'use strict';

  /**
   * Modal directive.
   */

  angular.module('onsen').directive('onsModal', ['$onsen', 'ModalView', function ($onsen, ModalView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      compile: function compile(element, attrs) {

        return {
          pre: function pre(scope, element, attrs) {
            var modal = new ModalView(scope, element, attrs);
            $onsen.addModifierMethodsForCustomElements(modal, element);

            $onsen.declareVarAttribute(attrs, modal);
            element.data('ons-modal', modal);

            scope.$on('$destroy', function () {
              $onsen.removeModifierMethods(modal);
              element.data('ons-modal', undefined);
              modal = element = scope = attrs = null;
            });
          },

          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-navigator
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
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this navigator.[/en]
 *  [ja]このナビゲーターを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-prepush
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prepush" event is fired.[/en]
 *  [ja]"prepush"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-prepop
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prepop" event is fired.[/en]
 *  [ja]"prepop"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postpush
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postpush" event is fired.[/en]
 *  [ja]"postpush"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postpop
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postpop" event is fired.[/en]
 *  [ja]"postpop"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-init
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "init" event is fired.[/en]
 *  [ja]ページの"init"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-show
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "show" event is fired.[/en]
 *  [ja]ページの"show"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-hide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "hide" event is fired.[/en]
 *  [ja]ページの"hide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "destroy" event is fired.[/en]
 *  [ja]ページの"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
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
 * @method once
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
 * @method off
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

(function () {
  'use strict';

  var lastReady = window.ons.NavigatorElement.rewritables.ready;
  window.ons.NavigatorElement.rewritables.ready = ons._waitDiretiveInit('ons-navigator', lastReady);

  angular.module('onsen').directive('onsNavigator', ['NavigatorView', '$onsen', function (NavigatorView, $onsen) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: true,

      compile: function compile(element) {

        return {
          pre: function pre(scope, element, attrs, controller) {
            var view = new NavigatorView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, view);
            $onsen.registerEventHandlers(view, 'prepush prepop postpush postpop init show hide destroy');

            element.data('ons-navigator', view);

            element[0].pageLoader = $onsen.createPageLoader(view);

            scope.$on('$destroy', function () {
              view._events = undefined;
              element.data('ons-navigator', undefined);
              scope = element = null;
            });
          },
          post: function post(scope, element, attrs) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-page
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this page.[/en]
 *   [ja]このページを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ng-infinite-scroll
 * @initonly
 * @type {String}
 * @description
 *   [en]Path of the function to be executed on infinite scrolling. The path is relative to $scope. The function receives a done callback that must be called when it's finished.[/en]
 *   [ja][/ja]
 */

/**
 * @attribute on-device-back-button
 * @type {Expression}
 * @description
 *   [en]Allows you to specify custom behavior when the back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時の挙動を設定できます。[/ja]
 */

/**
 * @attribute ng-device-back-button
 * @initonly
 * @type {Expression}
 * @description
 *   [en]Allows you to specify custom behavior with an AngularJS expression when the back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時の挙動を設定できます。AngularJSのexpressionを指定できます。[/ja]
 */

/**
 * @attribute ons-init
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "init" event is fired.[/en]
 *  [ja]"init"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-show
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "show" event is fired.[/en]
 *  [ja]"show"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-hide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "hide" event is fired.[/en]
 *  [ja]"hide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsPage', ['$onsen', 'PageView', function ($onsen, PageView) {

    function firePageInitEvent(element) {
      // TODO: remove dirty fix
      var i = 0,
          f = function f() {
        if (i++ < 15) {
          if (isAttached(element)) {
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
      scope: true,

      compile: function compile(element, attrs) {
        return {
          pre: function pre(scope, element, attrs) {
            var page = new PageView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, page);
            $onsen.registerEventHandlers(page, 'init show hide destroy');

            element.data('ons-page', page);
            $onsen.addModifierMethodsForCustomElements(page, element);

            element.data('_scope', scope);

            $onsen.cleaner.onDestroy(scope, function () {
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
'use strict';

/**
 * @element ons-popover
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this popover.[/en]
 *  [ja]このポップオーバーを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-preshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-prehide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-posthide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
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
 * @method once
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
 * @method off
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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsPopover', ['$onsen', 'PopoverView', function ($onsen, PopoverView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      compile: function compile(element, attrs) {
        return {
          pre: function pre(scope, element, attrs) {

            var popover = new PopoverView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, popover);
            $onsen.registerEventHandlers(popover, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethodsForCustomElements(popover, element);

            element.data('ons-popover', popover);

            scope.$on('$destroy', function () {
              popover._events = undefined;
              $onsen.removeModifierMethods(popover);
              element.data('ons-popover', undefined);
              element = null;
            });
          },

          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();
"use strict";
'use strict';

/**
 * @element ons-pull-hook
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
 *     <span ng-switch="loader.state">
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
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this component.[/en]
 *   [ja]このコンポーネントを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ng-action
 * @initonly
 * @type {Expression}
 * @description
 *   [en]Use to specify custom behavior when the page is pulled down. A <code>$done</code> function is available to tell the component that the action is completed.[/en]
 *   [ja]pull downしたときの振る舞いを指定します。アクションが完了した時には<code>$done</code>関数を呼び出します。[/ja]
 */

/**
 * @attribute ons-changestate
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "changestate" event is fired.[/en]
 *  [ja]"changestate"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
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
 * @method once
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
 * @method off
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

(function () {
  'use strict';

  /**
   * Pull hook directive.
   */

  angular.module('onsen').directive('onsPullHook', ['$onsen', 'PullHookView', function ($onsen, PullHookView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,

      compile: function compile(element, attrs) {
        return {
          pre: function pre(scope, element, attrs) {
            var pullHook = new PullHookView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, pullHook);
            $onsen.registerEventHandlers(pullHook, 'changestate destroy');
            element.data('ons-pull-hook', pullHook);

            scope.$on('$destroy', function () {
              pullHook._events = undefined;
              element.data('ons-pull-hook', undefined);
              scope = element = attrs = null;
            });
          },
          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-radio
 */

(function () {
  'use strict';

  angular.module('onsen').directive('onsRadio', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function link(scope, element, attrs) {
        var el = element[0];

        var onChange = function onChange() {
          $parse(attrs.ngModel).assign(scope, el.value);
          attrs.ngChange && scope.$eval(attrs.ngChange);
          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, function (value) {
            return el.checked = value === el.value;
          });
          element.on('change', onChange);
        }

        scope.$on('$destroy', function () {
          element.off('change', onChange);
          scope = element = attrs = el = null;
        });
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('onsen').directive('onsRange', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function link(scope, element, attrs) {

        var onInput = function onInput() {
          var set = $parse(attrs.ngModel).assign;

          set(scope, element[0].value);
          if (attrs.ngChange) {
            scope.$eval(attrs.ngChange);
          }
          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, function (value) {
            element[0].value = value;
          });

          element.on('input', onInput);
        }

        scope.$on('$destroy', function () {
          element.off('input', onInput);
          scope = element = attrs = null;
        });
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('onsen').directive('onsRipple', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        GenericView.register(scope, element, attrs, { viewKey: 'ons-ripple' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-scope
 * @category util
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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsScope', ['$onsen', function ($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,

      link: function link(scope, element) {
        element.data('_scope', scope);

        scope.$on('$destroy', function () {
          element.data('_scope', undefined);
        });
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-search-input
 */

(function () {
  'use strict';

  angular.module('onsen').directive('onsSearchInput', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function link(scope, element, attrs) {
        var el = element[0];

        var onInput = function onInput() {
          $parse(attrs.ngModel).assign(scope, el.type === 'number' ? Number(el.value) : el.value);
          attrs.ngChange && scope.$eval(attrs.ngChange);
          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, function (value) {
            if (typeof value !== 'undefined' && value !== el.value) {
              el.value = value;
            }
          });

          element.on('input', onInput);
        }

        scope.$on('$destroy', function () {
          element.off('input', onInput);
          scope = element = attrs = el = null;
        });
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-segment
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this segment.[/en]
 *   [ja]このタブバーを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-postchange
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postchange" event is fired.[/en]
 *  [ja]"postchange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

(function () {
  'use strict';

  angular.module('onsen').directive('onsSegment', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        var view = GenericView.register(scope, element, attrs, { viewKey: 'ons-segment' });
        $onsen.fireComponentEvent(element[0], 'init');
        $onsen.registerEventHandlers(view, 'postchange');
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-select
 */

/**
 * @method on
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
 * @method once
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
 * @method off
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

(function () {
  'use strict';

  angular.module('onsen').directive('onsSelect', ['$parse', '$onsen', 'GenericView', function ($parse, $onsen, GenericView) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,

      link: function link(scope, element, attrs) {
        var onInput = function onInput() {
          var set = $parse(attrs.ngModel).assign;

          set(scope, element[0].value);
          if (attrs.ngChange) {
            scope.$eval(attrs.ngChange);
          }
          scope.$parent.$evalAsync();
        };

        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, function (value) {
            element[0].value = value;
          });

          element.on('input', onInput);
        }

        scope.$on('$destroy', function () {
          element.off('input', onInput);
          scope = element = attrs = null;
        });

        GenericView.register(scope, element, attrs, { viewKey: 'ons-select' });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-speed-dial
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer the speed dial.[/en]
 *   [ja]このスピードダイアルを参照するための変数名をしてします。[/ja]
 */

/**
 * @attribute ons-open
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "open" event is fired.[/en]
 *  [ja]"open"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-close
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "close" event is fired.[/en]
 *  [ja]"close"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method once
 * @signature once(eventName, listener)
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
 * @method off
 * @signature off(eventName, [listener])
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

/**
 * @method on
 * @signature on(eventName, listener)
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

(function () {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsSpeedDial', ['$onsen', 'SpeedDialView', function ($onsen, SpeedDialView) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,
      transclude: false,

      compile: function compile(element, attrs) {

        return function (scope, element, attrs) {
          var speedDial = new SpeedDialView(scope, element, attrs);

          element.data('ons-speed-dial', speedDial);

          $onsen.registerEventHandlers(speedDial, 'open close');
          $onsen.declareVarAttribute(attrs, speedDial);

          scope.$on('$destroy', function () {
            speedDial._events = undefined;
            element.data('ons-speed-dial', undefined);
            element = null;
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }

    };
  }]);
})();
'use strict';

/**
 * @element ons-splitter
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this split view.[/en]
 *   [ja]このスプリットビューコンポーネントを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
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
 * @method once
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
 * @method off
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

(function () {
  'use strict';

  angular.module('onsen').directive('onsSplitter', ['$compile', 'Splitter', '$onsen', function ($compile, Splitter, $onsen) {
    return {
      restrict: 'E',
      scope: true,

      compile: function compile(element, attrs) {

        return function (scope, element, attrs) {

          var splitter = new Splitter(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, splitter);
          $onsen.registerEventHandlers(splitter, 'destroy');

          element.data('ons-splitter', splitter);

          scope.$on('$destroy', function () {
            splitter._events = undefined;
            element.data('ons-splitter', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-splitter-content
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */
(function () {
  'use strict';

  var lastReady = window.ons.SplitterContentElement.rewritables.ready;
  window.ons.SplitterContentElement.rewritables.ready = ons._waitDiretiveInit('ons-splitter-content', lastReady);

  angular.module('onsen').directive('onsSplitterContent', ['$compile', 'SplitterContent', '$onsen', function ($compile, SplitterContent, $onsen) {
    return {
      restrict: 'E',

      compile: function compile(element, attrs) {

        return function (scope, element, attrs) {

          var view = new SplitterContent(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, view);
          $onsen.registerEventHandlers(view, 'destroy');

          element.data('ons-splitter-content', view);

          element[0].pageLoader = $onsen.createPageLoader(view);

          scope.$on('$destroy', function () {
            view._events = undefined;
            element.data('ons-splitter-content', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-splitter-side
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-preopen
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preopen" event is fired.[/en]
 *  [ja]"preopen"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-preclose
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preclose" event is fired.[/en]
 *  [ja]"preclose"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postopen
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postopen" event is fired.[/en]
 *  [ja]"postopen"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postclose
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postclose" event is fired.[/en]
 *  [ja]"postclose"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-modechange
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "modechange" event is fired.[/en]
 *  [ja]"modechange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */
(function () {
  'use strict';

  var lastReady = window.ons.SplitterSideElement.rewritables.ready;
  window.ons.SplitterSideElement.rewritables.ready = ons._waitDiretiveInit('ons-splitter-side', lastReady);

  angular.module('onsen').directive('onsSplitterSide', ['$compile', 'SplitterSide', '$onsen', function ($compile, SplitterSide, $onsen) {
    return {
      restrict: 'E',

      compile: function compile(element, attrs) {

        return function (scope, element, attrs) {

          var view = new SplitterSide(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, view);
          $onsen.registerEventHandlers(view, 'destroy preopen preclose postopen postclose modechange');

          element.data('ons-splitter-side', view);

          element[0].pageLoader = $onsen.createPageLoader(view);

          scope.$on('$destroy', function () {
            view._events = undefined;
            element.data('ons-splitter-side', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-switch
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this switch.[/en]
 *   [ja]JavaScriptから参照するための変数名を指定します。[/ja]
 */

/**
 * @method on
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
 * @method once
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
 * @method off
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

(function () {
  'use strict';

  angular.module('onsen').directive('onsSwitch', ['$onsen', 'SwitchView', function ($onsen, SwitchView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,

      link: function link(scope, element, attrs) {

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        var switchView = new SwitchView(element, scope, attrs);
        $onsen.addModifierMethodsForCustomElements(switchView, element);

        $onsen.declareVarAttribute(attrs, switchView);
        element.data('ons-switch', switchView);

        $onsen.cleaner.onDestroy(scope, function () {
          switchView._events = undefined;
          $onsen.removeModifierMethods(switchView);
          element.data('ons-switch', undefined);
          $onsen.clearComponent({
            element: element,
            scope: scope,
            attrs: attrs
          });
          element = attrs = scope = null;
        });

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  tab.$inject = ['$onsen', 'GenericView'];
  angular.module('onsen').directive('onsTab', tab).directive('onsTabbarItem', tab); // for BC

  function tab($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {
        var view = GenericView.register(scope, element, attrs, { viewKey: 'ons-tab' });
        element[0].pageLoader = $onsen.createPageLoader(view);

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }
})();
'use strict';

/**
 * @element ons-tabbar
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this tab bar.[/en]
 *   [ja]このタブバーを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-reactive
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "reactive" event is fired.[/en]
 *  [ja]"reactive"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-prechange
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prechange" event is fired.[/en]
 *  [ja]"prechange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postchange
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postchange" event is fired.[/en]
 *  [ja]"postchange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-init
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "init" event is fired.[/en]
 *  [ja]ページの"init"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-show
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "show" event is fired.[/en]
 *  [ja]ページの"show"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-hide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "hide" event is fired.[/en]
 *  [ja]ページの"hide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when a page's "destroy" event is fired.[/en]
 *  [ja]ページの"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
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
 * @method once
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
 * @method off
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

(function () {
  'use strict';

  var lastReady = window.ons.TabbarElement.rewritables.ready;
  window.ons.TabbarElement.rewritables.ready = ons._waitDiretiveInit('ons-tabbar', lastReady);

  angular.module('onsen').directive('onsTabbar', ['$onsen', '$compile', '$parse', 'TabbarView', function ($onsen, $compile, $parse, TabbarView) {

    return {
      restrict: 'E',

      replace: false,
      scope: true,

      link: function link(scope, element, attrs, controller) {
        var tabbarView = new TabbarView(scope, element, attrs);
        $onsen.addModifierMethodsForCustomElements(tabbarView, element);

        $onsen.registerEventHandlers(tabbarView, 'reactive prechange postchange init show hide destroy');

        element.data('ons-tabbar', tabbarView);
        $onsen.declareVarAttribute(attrs, tabbarView);

        scope.$on('$destroy', function () {
          tabbarView._events = undefined;
          $onsen.removeModifierMethods(tabbarView);
          element.data('ons-tabbar', undefined);
        });

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('onsen').directive('onsTemplate', ['$templateCache', function ($templateCache) {
    return {
      restrict: 'E',
      terminal: true,
      compile: function compile(element) {
        var content = element[0].template || element.html();
        $templateCache.put(element.attr('id'), content);
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-toast
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this toast dialog.[/en]
 *  [ja]このトーストを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-preshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-prehide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-postshow
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-posthide
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @method on
 * @signature on(eventName, listener)
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
 * @method once
 * @signature once(eventName, listener)
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
 * @method off
 * @signature off(eventName, [listener])
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

(function () {
  'use strict';

  /**
   * Toast directive.
   */

  angular.module('onsen').directive('onsToast', ['$onsen', 'ToastView', function ($onsen, ToastView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      transclude: false,

      compile: function compile(element, attrs) {

        return {
          pre: function pre(scope, element, attrs) {
            var toast = new ToastView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, toast);
            $onsen.registerEventHandlers(toast, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethodsForCustomElements(toast, element);

            element.data('ons-toast', toast);
            element.data('_scope', scope);

            scope.$on('$destroy', function () {
              toast._events = undefined;
              $onsen.removeModifierMethods(toast);
              element.data('ons-toast', undefined);
              element = null;
            });
          },
          post: function post(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-toolbar
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *  [en]Variable name to refer this toolbar.[/en]
 *  [ja]このツールバーを参照するための名前を指定します。[/ja]
 */
(function () {
  'use strict';

  angular.module('onsen').directive('onsToolbar', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      compile: function compile(element) {
        return {
          pre: function pre(scope, element, attrs) {
            // TODO: Remove this dirty fix!
            if (element[0].nodeName === 'ons-toolbar') {
              GenericView.register(scope, element, attrs, { viewKey: 'ons-toolbar' });
            }
          },
          post: function post(scope, element, attrs) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();
'use strict';

/**
 * @element ons-toolbar-button
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this button.[/en]
 *   [ja]このボタンを参照するための名前を指定します。[/ja]
 */
(function () {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsToolbarButton', ['$onsen', 'GenericView', function ($onsen, GenericView) {
    return {
      restrict: 'E',
      scope: false,
      link: {
        pre: function pre(scope, element, attrs) {
          var toolbarButton = new GenericView(scope, element, attrs);
          element.data('ons-toolbar-button', toolbarButton);
          $onsen.declareVarAttribute(attrs, toolbarButton);

          $onsen.addModifierMethodsForCustomElements(toolbarButton, element);

          $onsen.cleaner.onDestroy(scope, function () {
            toolbarButton._events = undefined;
            $onsen.removeModifierMethods(toolbarButton);
            element.data('ons-toolbar-button', undefined);
            element = null;

            $onsen.clearComponent({
              scope: scope,
              attrs: attrs,
              element: element
            });
            scope = element = attrs = null;
          });
        },
        post: function post(scope, element, attrs) {
          $onsen.fireComponentEvent(element[0], 'init');
        }
      }
    };
  }]);
})();
'use strict';

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

(function () {
  'use strict';

  var module = angular.module('onsen');

  var ComponentCleaner = {
    /**
     * @param {jqLite} element
     */
    decomposeNode: function decomposeNode(element) {
      var children = element.remove().children();
      for (var i = 0; i < children.length; i++) {
        ComponentCleaner.decomposeNode(angular.element(children[i]));
      }
    },

    /**
     * @param {Attributes} attrs
     */
    destroyAttributes: function destroyAttributes(attrs) {
      attrs.$$element = null;
      attrs.$$observers = null;
    },

    /**
     * @param {jqLite} element
     */
    destroyElement: function destroyElement(element) {
      element.remove();
    },

    /**
     * @param {Scope} scope
     */
    destroyScope: function destroyScope(scope) {
      scope.$$listeners = {};
      scope.$$watchers = null;
      scope = null;
    },

    /**
     * @param {Scope} scope
     * @param {Function} fn
     */
    onDestroy: function onDestroy(scope, fn) {
      var clear = scope.$on('$destroy', function () {
        clear();
        fn.apply(null, arguments);
      });
    }
  };

  module.factory('ComponentCleaner', function () {
    return ComponentCleaner;
  });

  // override builtin ng-(eventname) directives
  (function () {
    var ngEventDirectives = {};
    'click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(' ').forEach(function (name) {
      var directiveName = directiveNormalize('ng-' + name);
      ngEventDirectives[directiveName] = ['$parse', function ($parse) {
        return {
          compile: function compile($element, attr) {
            var fn = $parse(attr[directiveName]);
            return function (scope, element, attr) {
              var listener = function listener(event) {
                scope.$apply(function () {
                  fn(scope, { $event: event });
                });
              };
              element.on(name, listener);

              ComponentCleaner.onDestroy(scope, function () {
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
        return name.replace(/-([a-z])/g, function (matches) {
          return matches[1].toUpperCase();
        });
      }
    });
    module.config(['$provide', function ($provide) {
      var shift = function shift($delegate) {
        $delegate.shift();
        return $delegate;
      };
      Object.keys(ngEventDirectives).forEach(function (directiveName) {
        $provide.decorator(directiveName + 'Directive', ['$delegate', shift]);
      });
    }]);
    Object.keys(ngEventDirectives).forEach(function (directiveName) {
      module.directive(directiveName, ngEventDirectives[directiveName]);
    });
  })();
})();
'use strict';

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

(function () {
  'use strict';

  var module = angular.module('onsen');

  /**
   * Internal service class for framework implementation.
   */
  module.factory('$onsen', ['$rootScope', '$window', '$cacheFactory', '$document', '$templateCache', '$http', '$q', '$compile', '$onsGlobal', 'ComponentCleaner', function ($rootScope, $window, $cacheFactory, $document, $templateCache, $http, $q, $compile, $onsGlobal, ComponentCleaner) {

    var $onsen = createOnsenService();
    var ModifierUtil = $onsGlobal._internal.ModifierUtil;

    return $onsen;

    function createOnsenService() {
      return {

        DIRECTIVE_TEMPLATE_URL: 'templates',

        cleaner: ComponentCleaner,

        util: $onsGlobal._util,

        DeviceBackButtonHandler: $onsGlobal._deviceBackButtonDispatcher,

        _defaultDeviceBackButtonHandler: $onsGlobal._defaultDeviceBackButtonHandler,

        /**
         * @return {Object}
         */
        getDefaultDeviceBackButtonHandler: function getDefaultDeviceBackButtonHandler() {
          return this._defaultDeviceBackButtonHandler;
        },

        /**
         * @param {Object} view
         * @param {Element} element
         * @param {Array} methodNames
         * @return {Function} A function that dispose all driving methods.
         */
        deriveMethods: function deriveMethods(view, element, methodNames) {
          methodNames.forEach(function (methodName) {
            view[methodName] = function () {
              return element[methodName].apply(element, arguments);
            };
          });

          return function () {
            methodNames.forEach(function (methodName) {
              view[methodName] = null;
            });
            view = element = null;
          };
        },

        /**
         * @param {Class} klass
         * @param {Array} properties
         */
        derivePropertiesFromElement: function derivePropertiesFromElement(klass, properties) {
          properties.forEach(function (property) {
            Object.defineProperty(klass.prototype, property, {
              get: function get() {
                return this._element[0][property];
              },
              set: function set(value) {
                return this._element[0][property] = value; // eslint-disable-line no-return-assign
              }
            });
          });
        },

        /**
         * @param {Object} view
         * @param {Element} element
         * @param {Array} eventNames
         * @param {Function} [map]
         * @return {Function} A function that clear all event listeners
         */
        deriveEvents: function deriveEvents(view, element, eventNames, map) {
          map = map || function (detail) {
            return detail;
          };
          eventNames = [].concat(eventNames);
          var listeners = [];

          eventNames.forEach(function (eventName) {
            var listener = function listener(event) {
              map(event.detail || {});
              view.emit(eventName, event);
            };
            listeners.push(listener);
            element.addEventListener(eventName, listener, false);
          });

          return function () {
            eventNames.forEach(function (eventName, index) {
              element.removeEventListener(eventName, listeners[index], false);
            });
            view = element = listeners = map = null;
          };
        },

        /**
         * @return {Boolean}
         */
        isEnabledAutoStatusBarFill: function isEnabledAutoStatusBarFill() {
          return !!$onsGlobal._config.autoStatusBarFill;
        },

        /**
         * @return {Boolean}
         */
        shouldFillStatusBar: $onsGlobal.shouldFillStatusBar,

        /**
         * @param {Function} action
         */
        autoStatusBarFill: $onsGlobal.autoStatusBarFill,

        /**
         * @param {Object} directive
         * @param {HTMLElement} pageElement
         * @param {Function} callback
         */
        compileAndLink: function compileAndLink(view, pageElement, callback) {
          var link = $compile(pageElement);
          var pageScope = view._scope.$new();

          /**
           * Overwrite page scope.
           */
          angular.element(pageElement).data('_scope', pageScope);

          pageScope.$evalAsync(function () {
            callback(pageElement); // Attach and prepare
            link(pageScope); // Run the controller
          });
        },

        /**
         * @param {Object} view
         * @return {Object} pageLoader
         */
        createPageLoader: function createPageLoader(view) {
          var _this = this;

          return new $onsGlobal.PageLoader(function (_ref, done) {
            var page = _ref.page,
                parent = _ref.parent;

            $onsGlobal._internal.getPageHTMLAsync(page).then(function (html) {
              _this.compileAndLink(view, $onsGlobal._util.createElement(html), function (element) {
                return done(parent.appendChild(element));
              });
            });
          }, function (element) {
            element._destroy();
            if (angular.element(element).data('_scope')) {
              angular.element(element).data('_scope').$destroy();
            }
          });
        },

        /**
         * @param {Object} params
         * @param {Scope} [params.scope]
         * @param {jqLite} [params.element]
         * @param {Array} [params.elements]
         * @param {Attributes} [params.attrs]
         */
        clearComponent: function clearComponent(params) {
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
            params.elements.forEach(function (element) {
              ComponentCleaner.destroyElement(element);
            });
          }
        },

        /**
         * @param {jqLite} element
         * @param {String} name
         */
        findElementeObject: function findElementeObject(element, name) {
          return element.inheritedData(name);
        },

        /**
         * @param {String} page
         * @return {Promise}
         */
        getPageHTMLAsync: function getPageHTMLAsync(page) {
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
            }).then(function (response) {
              var html = response.data;

              return this.normalizePageHTML(html);
            }.bind(this));
          }
        },

        /**
         * @param {String} html
         * @return {String}
         */
        normalizePageHTML: function normalizePageHTML(html) {
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
        generateModifierTemplater: function generateModifierTemplater(attrs, modifiers) {
          var attrModifiers = attrs && typeof attrs.modifier === 'string' ? attrs.modifier.trim().split(/ +/) : [];
          modifiers = angular.isArray(modifiers) ? attrModifiers.concat(modifiers) : attrModifiers;

          /**
           * @return {String} template eg. 'ons-button--*', 'ons-button--*__item'
           * @return {String}
           */
          return function (template) {
            return modifiers.map(function (modifier) {
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
        addModifierMethodsForCustomElements: function addModifierMethodsForCustomElements(view, element) {
          var methods = {
            hasModifier: function hasModifier(needle) {
              var tokens = ModifierUtil.split(element.attr('modifier'));
              needle = typeof needle === 'string' ? needle.trim() : '';

              return ModifierUtil.split(needle).some(function (needle) {
                return tokens.indexOf(needle) != -1;
              });
            },

            removeModifier: function removeModifier(needle) {
              needle = typeof needle === 'string' ? needle.trim() : '';

              var modifier = ModifierUtil.split(element.attr('modifier')).filter(function (token) {
                return token !== needle;
              }).join(' ');

              element.attr('modifier', modifier);
            },

            addModifier: function addModifier(modifier) {
              element.attr('modifier', element.attr('modifier') + ' ' + modifier);
            },

            setModifier: function setModifier(modifier) {
              element.attr('modifier', modifier);
            },

            toggleModifier: function toggleModifier(modifier) {
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
        addModifierMethods: function addModifierMethods(view, template, element) {
          var _tr = function _tr(modifier) {
            return template.replace('*', modifier);
          };

          var fns = {
            hasModifier: function hasModifier(modifier) {
              return element.hasClass(_tr(modifier));
            },

            removeModifier: function removeModifier(modifier) {
              element.removeClass(_tr(modifier));
            },

            addModifier: function addModifier(modifier) {
              element.addClass(_tr(modifier));
            },

            setModifier: function setModifier(modifier) {
              var classes = element.attr('class').split(/\s+/),
                  patt = template.replace('*', '.');

              for (var i = 0; i < classes.length; i++) {
                var cls = classes[i];

                if (cls.match(patt)) {
                  element.removeClass(cls);
                }
              }

              element.addClass(_tr(modifier));
            },

            toggleModifier: function toggleModifier(modifier) {
              var cls = _tr(modifier);
              if (element.hasClass(cls)) {
                element.removeClass(cls);
              } else {
                element.addClass(cls);
              }
            }
          };

          var append = function append(oldFn, newFn) {
            if (typeof oldFn !== 'undefined') {
              return function () {
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
        removeModifierMethods: function removeModifierMethods(view) {
          view.hasModifier = view.removeModifier = view.addModifier = view.setModifier = view.toggleModifier = undefined;
        },

        /**
         * Define a variable to JavaScript global scope and AngularJS scope as 'var' attribute name.
         *
         * @param {Object} attrs
         * @param object
         */
        declareVarAttribute: function declareVarAttribute(attrs, object) {
          if (typeof attrs.var === 'string') {
            var varName = attrs.var;
            this._defineVar(varName, object);
          }
        },

        _registerEventHandler: function _registerEventHandler(component, eventName) {
          var capitalizedEventName = eventName.charAt(0).toUpperCase() + eventName.slice(1);

          component.on(eventName, function (event) {
            $onsen.fireComponentEvent(component._element[0], eventName, event && event.detail);

            var handler = component._attrs['ons' + capitalizedEventName];
            if (handler) {
              component._scope.$eval(handler, { $event: event });
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
        registerEventHandlers: function registerEventHandlers(component, eventNames) {
          eventNames = eventNames.trim().split(/\s+/);

          for (var i = 0, l = eventNames.length; i < l; i++) {
            var eventName = eventNames[i];
            this._registerEventHandler(component, eventName);
          }
        },

        /**
         * @return {Boolean}
         */
        isAndroid: function isAndroid() {
          return !!$window.navigator.userAgent.match(/android/i);
        },

        /**
         * @return {Boolean}
         */
        isIOS: function isIOS() {
          return !!$window.navigator.userAgent.match(/(ipad|iphone|ipod touch)/i);
        },

        /**
         * @return {Boolean}
         */
        isWebView: function isWebView() {
          return $onsGlobal.isWebView();
        },

        /**
         * @return {Boolean}
         */
        isIOS7above: function () {
          var ua = $window.navigator.userAgent;
          var match = ua.match(/(iPad|iPhone|iPod touch);.*CPU.*OS (\d+)_(\d+)/i);

          var result = match ? parseFloat(match[2] + '.' + match[3]) >= 7 : false;

          return function () {
            return result;
          };
        }(),

        /**
         * Fire a named event for a component. The view object, if it exists, is attached to event.component.
         *
         * @param {HTMLElement} [dom]
         * @param {String} event name
         */
        fireComponentEvent: function fireComponentEvent(dom, eventName, data) {
          data = data || {};

          var event = document.createEvent('HTMLEvents');

          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              event[key] = data[key];
            }
          }

          event.component = dom ? angular.element(dom).data(dom.nodeName.toLowerCase()) || null : null;
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
        _defineVar: function _defineVar(name, object) {
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

            if (container[names[names.length - 1]] !== object) {
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
'use strict';

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

Object.keys(ons.notification).filter(function (name) {
  return !/^_/.test(name);
}).forEach(function (name) {
  var originalNotification = ons.notification[name];

  ons.notification[name] = function (message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    typeof message === 'string' ? options.message = message : options = message;

    var compile = options.compile;
    var $element = void 0;

    options.compile = function (element) {
      $element = angular.element(compile ? compile(element) : element);
      return ons.$compile($element)($element.injector().get('$rootScope'));
    };

    options.destroy = function () {
      $element.data('_scope').$destroy();
      $element = null;
    };

    return originalNotification(options);
  };
});
'use strict';

// confirm to use jqLite
if (window.jQuery && angular.element === window.jQuery) {
  console.warn('Onsen UI require jqLite. Load jQuery after loading AngularJS to fix this error. jQuery may break Onsen UI behavior.'); // eslint-disable-line no-console
}
'use strict';

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

(function () {
  'use strict';

  angular.module('onsen').run(['$templateCache', function ($templateCache) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIiwib25zZW4uanMiLCJhY3Rpb25TaGVldC5qcyIsImFsZXJ0RGlhbG9nLmpzIiwiYWxlcnREaWFsb2dBbmltYXRvci5qcyIsImFuaW1hdGlvbkNob29zZXIuanMiLCJjYXJvdXNlbC5qcyIsImRpYWxvZy5qcyIsImRpYWxvZ0FuaW1hdG9yLmpzIiwiZmFiLmpzIiwiZ2VuZXJpYy5qcyIsImxhenlSZXBlYXQuanMiLCJsYXp5UmVwZWF0RGVsZWdhdGUuanMiLCJtb2RhbC5qcyIsIm5hdmlnYXRvci5qcyIsIm5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvci5qcyIsInBhZ2UuanMiLCJwb3BvdmVyLmpzIiwicG9wb3ZlckFuaW1hdG9yLmpzIiwicHVsbEhvb2suanMiLCJzcGVlZERpYWwuanMiLCJzcGxpdHRlci1jb250ZW50LmpzIiwic3BsaXR0ZXItc2lkZS5qcyIsInNwbGl0dGVyLmpzIiwic3dpdGNoLmpzIiwidGFiYmFyVmlldy5qcyIsInRvYXN0LmpzIiwiYWN0aW9uU2hlZXRCdXR0b24uanMiLCJiYWNrQnV0dG9uLmpzIiwiYm90dG9tVG9vbGJhci5qcyIsImJ1dHRvbi5qcyIsImNhcmQuanMiLCJjaGVja2JveC5qcyIsImR1bW15Rm9ySW5pdC5qcyIsImdlc3R1cmVEZXRlY3Rvci5qcyIsImljb24uanMiLCJpZk9yaWVudGF0aW9uLmpzIiwiaWZQbGF0Zm9ybS5qcyIsImlucHV0LmpzIiwia2V5Ym9hcmQuanMiLCJsaXN0LmpzIiwibGlzdEhlYWRlci5qcyIsImxpc3RJdGVtLmpzIiwibGlzdFRpdGxlLmpzIiwibG9hZGluZ1BsYWNlaG9sZGVyLmpzIiwicHJvZ3Jlc3NCYXIuanMiLCJyYWRpby5qcyIsInJhbmdlLmpzIiwicmlwcGxlLmpzIiwic2NvcGUuanMiLCJzZWFyY2hJbnB1dC5qcyIsInNlZ21lbnQuanMiLCJzZWxlY3QuanMiLCJzcGxpdHRlckNvbnRlbnQuanMiLCJzcGxpdHRlclNpZGUuanMiLCJ0YWIuanMiLCJ0YWJCYXIuanMiLCJ0ZW1wbGF0ZS5qcyIsInRvb2xiYXIuanMiLCJ0b29sYmFyQnV0dG9uLmpzIiwiY29tcG9uZW50Q2xlYW5lci5qcyIsIm5vdGlmaWNhdGlvbi5qcyIsInNldHVwLmpzIiwidGVtcGxhdGVMb2FkZXIuanMiXSwibmFtZXMiOlsiZm5UZXN0IiwidGVzdCIsInh5eiIsIkJhc2VDbGFzcyIsImV4dGVuZCIsInByb3BzIiwiX3N1cGVyIiwicHJvdG90eXBlIiwicHJvdG8iLCJPYmplY3QiLCJjcmVhdGUiLCJuYW1lIiwiZm4iLCJ0bXAiLCJyZXQiLCJhcHBseSIsImFyZ3VtZW50cyIsIm5ld0NsYXNzIiwiaW5pdCIsImhhc093blByb3BlcnR5IiwiU3ViQ2xhc3MiLCJFbXB0eUNsYXNzIiwiY29uc3RydWN0b3IiLCJ3aW5kb3ciLCJDbGFzcyIsIm9ucyIsIm1vZHVsZSIsImFuZ3VsYXIiLCJpbml0T25zZW5GYWNhZGUiLCJ3YWl0T25zZW5VSUxvYWQiLCJpbml0QW5ndWxhck1vZHVsZSIsImluaXRUZW1wbGF0ZUNhY2hlIiwidW5sb2NrT25zZW5VSSIsIl9yZWFkeUxvY2siLCJsb2NrIiwicnVuIiwiJGNvbXBpbGUiLCIkcm9vdFNjb3BlIiwiZG9jdW1lbnQiLCJyZWFkeVN0YXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUVsZW1lbnQiLCJFcnJvciIsIiRvbiIsInZhbHVlIiwiJG9uc2VuIiwiJHEiLCJfb25zZW5TZXJ2aWNlIiwiX3FTZXJ2aWNlIiwiY29uc29sZSIsImFsZXJ0IiwiJHRlbXBsYXRlQ2FjaGUiLCJfaW50ZXJuYWwiLCJnZXRUZW1wbGF0ZUhUTUxBc3luYyIsInBhZ2UiLCJjYWNoZSIsImdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwiY29tcG9uZW50QmFzZSIsImJvb3RzdHJhcCIsImRlcHMiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiY29uY2F0IiwiZG9jIiwiZG9jdW1lbnRFbGVtZW50IiwiZmluZFBhcmVudENvbXBvbmVudFVudGlsIiwiZG9tIiwiZWxlbWVudCIsIkhUTUxFbGVtZW50IiwidGFyZ2V0IiwiaW5oZXJpdGVkRGF0YSIsImZpbmRDb21wb25lbnQiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3IiLCJkYXRhIiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsImNvbXBpbGUiLCJzY29wZSIsIl9nZXRPbnNlblNlcnZpY2UiLCJfd2FpdERpcmV0aXZlSW5pdCIsImVsZW1lbnROYW1lIiwibGFzdFJlYWR5IiwiY2FsbGJhY2siLCJsaXN0ZW4iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY3JlYXRlRWxlbWVudE9yaWdpbmFsIiwidGVtcGxhdGUiLCJvcHRpb25zIiwibGluayIsInBhcmVudFNjb3BlIiwiJG5ldyIsIiRldmFsQXN5bmMiLCJnZXRTY29wZSIsImUiLCJ0YWdOYW1lIiwicmVzdWx0IiwiYXBwZW5kIiwidGhlbiIsInJlc29sdmVMb2FkaW5nUGxhY2VIb2xkZXJPcmlnaW5hbCIsInJlc29sdmVMb2FkaW5nUGxhY2VIb2xkZXIiLCJyZXNvbHZlTG9hZGluZ1BsYWNlaG9sZGVyIiwicmVzb2x2ZUxvYWRpbmdQbGFjZWhvbGRlck9yaWdpbmFsIiwiZG9uZSIsInNldEltbWVkaWF0ZSIsIl9zZXR1cExvYWRpbmdQbGFjZUhvbGRlcnMiLCJmYWN0b3J5IiwiQWN0aW9uU2hlZXRWaWV3IiwiYXR0cnMiLCJfc2NvcGUiLCJfZWxlbWVudCIsIl9hdHRycyIsIl9jbGVhckRlcml2aW5nTWV0aG9kcyIsImRlcml2ZU1ldGhvZHMiLCJfY2xlYXJEZXJpdmluZ0V2ZW50cyIsImRlcml2ZUV2ZW50cyIsImRldGFpbCIsImFjdGlvblNoZWV0IiwiYmluZCIsIl9kZXN0cm95IiwiZW1pdCIsInJlbW92ZSIsInJlZ2lzdGVyQW5pbWF0b3IiLCJBbmltYXRvciIsIkFjdGlvblNoZWV0RWxlbWVudCIsIk1pY3JvRXZlbnQiLCJtaXhpbiIsImRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudCIsIkFsZXJ0RGlhbG9nVmlldyIsImFsZXJ0RGlhbG9nIiwiQWxlcnREaWFsb2dBbmltYXRvciIsIkFuZHJvaWRBbGVydERpYWxvZ0FuaW1hdG9yIiwiSU9TQWxlcnREaWFsb2dBbmltYXRvciIsIkFuaW1hdG9yRmFjdG9yeSIsIkNhcm91c2VsVmlldyIsImNhcm91c2VsIiwiRGlhbG9nVmlldyIsImRpYWxvZyIsIkRpYWxvZ0VsZW1lbnQiLCJEaWFsb2dBbmltYXRvciIsIklPU0RpYWxvZ0FuaW1hdG9yIiwiQW5kcm9pZERpYWxvZ0FuaW1hdG9yIiwiU2xpZGVEaWFsb2dBbmltYXRvciIsIkZhYlZpZXciLCJHZW5lcmljVmlldyIsInNlbGYiLCJkaXJlY3RpdmVPbmx5IiwibW9kaWZpZXJUZW1wbGF0ZSIsImFkZE1vZGlmaWVyTWV0aG9kcyIsImFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzIiwiY2xlYW5lciIsIm9uRGVzdHJveSIsIl9ldmVudHMiLCJyZW1vdmVNb2RpZmllck1ldGhvZHMiLCJjbGVhckNvbXBvbmVudCIsInJlZ2lzdGVyIiwidmlldyIsInZpZXdLZXkiLCJkZWNsYXJlVmFyQXR0cmlidXRlIiwiZGVzdHJveSIsIm5vb3AiLCJBbmd1bGFyTGF6eVJlcGVhdERlbGVnYXRlIiwiTGF6eVJlcGVhdFZpZXciLCJsaW5rZXIiLCJfbGlua2VyIiwidXNlckRlbGVnYXRlIiwiJGV2YWwiLCJvbnNMYXp5UmVwZWF0IiwiaW50ZXJuYWxEZWxlZ2F0ZSIsIl9wcm92aWRlciIsIkxhenlSZXBlYXRQcm92aWRlciIsInBhcmVudE5vZGUiLCJyZWZyZXNoIiwiJHdhdGNoIiwiY291bnRJdGVtcyIsIl9vbkNoYW5nZSIsImRpcmVjdGl2ZUF0dHJpYnV0ZXMiLCJ0ZW1wbGF0ZUVsZW1lbnQiLCJfcGFyZW50U2NvcGUiLCJmb3JFYWNoIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0ciIsImNsb25lTm9kZSIsIml0ZW0iLCJfdXNlckRlbGVnYXRlIiwiY29uZmlndXJlSXRlbVNjb3BlIiwiRnVuY3Rpb24iLCJkZXN0cm95SXRlbVNjb3BlIiwiY3JlYXRlSXRlbUNvbnRlbnQiLCJpbmRleCIsIl9wcmVwYXJlSXRlbUVsZW1lbnQiLCJfYWRkU3BlY2lhbFByb3BlcnRpZXMiLCJfdXNpbmdCaW5kaW5nIiwiY2xvbmVkIiwiaSIsImxhc3QiLCIkaW5kZXgiLCIkZmlyc3QiLCIkbGFzdCIsIiRtaWRkbGUiLCIkZXZlbiIsIiRvZGQiLCIkZGVzdHJveSIsIkxhenlSZXBlYXREZWxlZ2F0ZSIsIk1vZGFsQW5pbWF0b3IiLCJGYWRlTW9kYWxBbmltYXRvciIsIiRwYXJzZSIsIk1vZGFsVmlldyIsInNob3ciLCJoaWRlIiwidG9nZ2xlIiwiTW9kYWxFbGVtZW50IiwiTmF2aWdhdG9yVmlldyIsIl9wcmV2aW91c1BhZ2VTY29wZSIsIl9ib3VuZE9uUHJlcG9wIiwiX29uUHJlcG9wIiwib24iLCJuYXZpZ2F0b3IiLCJldmVudCIsInBhZ2VzIiwibGVuZ3RoIiwib2ZmIiwiTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiRmFkZU5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvciIsIklPU1NsaWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiTGlmdE5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvciIsIlNpbXBsZVNsaWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yIiwiUGFnZVZpZXciLCJfY2xlYXJMaXN0ZW5lciIsImRlZmluZVByb3BlcnR5Iiwib25EZXZpY2VCYWNrQnV0dG9uIiwic2V0IiwiX3VzZXJCYWNrQnV0dG9uSGFuZGxlciIsIl9lbmFibGVCYWNrQnV0dG9uSGFuZGxlciIsIm5nRGV2aWNlQmFja0J1dHRvbiIsIm5nSW5maW5pdGVTY3JvbGwiLCJvbkluZmluaXRlU2Nyb2xsIiwiX29uRGV2aWNlQmFja0J1dHRvbiIsIiRldmVudCIsImxhc3RFdmVudCIsIlBvcG92ZXJWaWV3IiwicG9wb3ZlciIsIlBvcG92ZXJBbmltYXRvciIsIkZhZGVQb3BvdmVyQW5pbWF0b3IiLCJQdWxsSG9va1ZpZXciLCJwdWxsSG9vayIsIm9uQWN0aW9uIiwibmdBY3Rpb24iLCIkZG9uZSIsIlNwZWVkRGlhbFZpZXciLCJTcGxpdHRlckNvbnRlbnQiLCJsb2FkIiwiX3BhZ2VTY29wZSIsIlNwbGl0dGVyU2lkZSIsInNpZGUiLCJTcGxpdHRlciIsInByb3AiLCJTd2l0Y2hWaWV3IiwiX2NoZWNrYm94IiwiX3ByZXBhcmVOZ01vZGVsIiwibmdNb2RlbCIsImFzc2lnbiIsIiRwYXJlbnQiLCJjaGVja2VkIiwibmdDaGFuZ2UiLCJUYWJiYXJOb25lQW5pbWF0b3IiLCJUYWJiYXJGYWRlQW5pbWF0b3IiLCJUYWJiYXJTbGlkZUFuaW1hdG9yIiwiVGFiYmFyVmlldyIsIl9sYXN0UGFnZUVsZW1lbnQiLCJfbGFzdFBhZ2VTY29wZSIsIlRhYmJhckVsZW1lbnQiLCJUb2FzdFZpZXciLCJ0b2FzdCIsImRpcmVjdGl2ZSIsInJlc3RyaWN0IiwicmVwbGFjZSIsInRyYW5zY2x1ZGUiLCJwcmUiLCJyZWdpc3RlckV2ZW50SGFuZGxlcnMiLCJwb3N0IiwiZmlyZUNvbXBvbmVudEV2ZW50IiwiQ29tcG9uZW50Q2xlYW5lciIsImNvbnRyb2xsZXIiLCJiYWNrQnV0dG9uIiwibmdDbGljayIsIm9uQ2xpY2siLCJkZXN0cm95U2NvcGUiLCJkZXN0cm95QXR0cmlidXRlcyIsImJ1dHRvbiIsImRpc2FibGVkIiwidXRpbCIsImZpbmRQYXJlbnQiLCJfc3dpcGVyIiwic3dpcGVhYmxlIiwiaGFzQXR0cmlidXRlIiwiYXV0b1JlZnJlc2giLCJlbCIsIm9uQ2hhbmdlIiwiaXNSZWFkeSIsIiRicm9hZGNhc3QiLCJmYWIiLCJFVkVOVFMiLCJzcGxpdCIsInNjb3BlRGVmIiwicmVkdWNlIiwiZGljdCIsInRpdGxpemUiLCJzdHIiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiXyIsImhhbmRsZXIiLCJ0eXBlIiwiZ2VzdHVyZURldGVjdG9yIiwiX2dlc3R1cmVEZXRlY3RvciIsImpvaW4iLCJpY29uIiwiaW5kZXhPZiIsIiRvYnNlcnZlIiwiX3VwZGF0ZSIsIiRvbnNHbG9iYWwiLCJjc3MiLCJ1cGRhdGUiLCJvcmllbnRhdGlvbiIsInVzZXJPcmllbnRhdGlvbiIsIm9uc0lmT3JpZW50YXRpb24iLCJnZXRMYW5kc2NhcGVPclBvcnRyYWl0IiwiaXNQb3J0cmFpdCIsInBsYXRmb3JtIiwiZ2V0UGxhdGZvcm1TdHJpbmciLCJ1c2VyUGxhdGZvcm0iLCJ1c2VyUGxhdGZvcm1zIiwib25zSWZQbGF0Zm9ybSIsInRyaW0iLCJ1c2VyQWdlbnQiLCJtYXRjaCIsImlzT3BlcmEiLCJvcGVyYSIsImlzRmlyZWZveCIsIkluc3RhbGxUcmlnZ2VyIiwiaXNTYWZhcmkiLCJ0b1N0cmluZyIsImNhbGwiLCJpc0VkZ2UiLCJpc0Nocm9tZSIsImNocm9tZSIsImlzSUUiLCJkb2N1bWVudE1vZGUiLCJvbklucHV0IiwiTnVtYmVyIiwiY29tcGlsZUZ1bmN0aW9uIiwiZGlzcFNob3ciLCJkaXNwSGlkZSIsIm9uU2hvdyIsIm9uSGlkZSIsIm9uSW5pdCIsInZpc2libGUiLCJzb2Z0d2FyZUtleWJvYXJkIiwiX3Zpc2libGUiLCJwcmlvcml0eSIsInRlcm1pbmFsIiwibGF6eVJlcGVhdCIsIm9uc0xvYWRpbmdQbGFjZWhvbGRlciIsIl9yZXNvbHZlTG9hZGluZ1BsYWNlaG9sZGVyIiwiY29udGVudEVsZW1lbnQiLCJtb2RhbCIsIk5hdmlnYXRvckVsZW1lbnQiLCJyZXdyaXRhYmxlcyIsInJlYWR5IiwicGFnZUxvYWRlciIsImNyZWF0ZVBhZ2VMb2FkZXIiLCJmaXJlUGFnZUluaXRFdmVudCIsImYiLCJpc0F0dGFjaGVkIiwiZmlyZUFjdHVhbFBhZ2VJbml0RXZlbnQiLCJzZXRUaW1lb3V0IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwicG9zdExpbmsiLCJzcGVlZERpYWwiLCJzcGxpdHRlciIsIlNwbGl0dGVyQ29udGVudEVsZW1lbnQiLCJTcGxpdHRlclNpZGVFbGVtZW50IiwibmdDb250cm9sbGVyIiwic3dpdGNoVmlldyIsInRhYiIsInRhYmJhclZpZXciLCJjb250ZW50IiwiaHRtbCIsInB1dCIsInRvb2xiYXJCdXR0b24iLCJkZWNvbXBvc2VOb2RlIiwiY2hpbGRyZW4iLCIkJGVsZW1lbnQiLCIkJG9ic2VydmVycyIsImRlc3Ryb3lFbGVtZW50IiwiJCRsaXN0ZW5lcnMiLCIkJHdhdGNoZXJzIiwiY2xlYXIiLCJuZ0V2ZW50RGlyZWN0aXZlcyIsImRpcmVjdGl2ZU5hbWUiLCJkaXJlY3RpdmVOb3JtYWxpemUiLCIkZWxlbWVudCIsImxpc3RlbmVyIiwiJGFwcGx5IiwibWF0Y2hlcyIsImNvbmZpZyIsIiRwcm92aWRlIiwic2hpZnQiLCIkZGVsZWdhdGUiLCJrZXlzIiwiZGVjb3JhdG9yIiwiJHdpbmRvdyIsIiRjYWNoZUZhY3RvcnkiLCIkZG9jdW1lbnQiLCIkaHR0cCIsImNyZWF0ZU9uc2VuU2VydmljZSIsIk1vZGlmaWVyVXRpbCIsIkRJUkVDVElWRV9URU1QTEFURV9VUkwiLCJfdXRpbCIsIkRldmljZUJhY2tCdXR0b25IYW5kbGVyIiwiX2RldmljZUJhY2tCdXR0b25EaXNwYXRjaGVyIiwiX2RlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlciIsImdldERlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlciIsIm1ldGhvZE5hbWVzIiwibWV0aG9kTmFtZSIsImtsYXNzIiwicHJvcGVydGllcyIsInByb3BlcnR5IiwiZXZlbnROYW1lcyIsIm1hcCIsImxpc3RlbmVycyIsImV2ZW50TmFtZSIsInB1c2giLCJpc0VuYWJsZWRBdXRvU3RhdHVzQmFyRmlsbCIsIl9jb25maWciLCJhdXRvU3RhdHVzQmFyRmlsbCIsInNob3VsZEZpbGxTdGF0dXNCYXIiLCJjb21waWxlQW5kTGluayIsInBhZ2VFbGVtZW50IiwicGFnZVNjb3BlIiwiUGFnZUxvYWRlciIsInBhcmVudCIsImdldFBhZ2VIVE1MQXN5bmMiLCJwYXJhbXMiLCJlbGVtZW50cyIsImZpbmRFbGVtZW50ZU9iamVjdCIsImRlZmVycmVkIiwiZGVmZXIiLCJub3JtYWxpemVQYWdlSFRNTCIsInByb21pc2UiLCJ1cmwiLCJtZXRob2QiLCJyZXNwb25zZSIsImdlbmVyYXRlTW9kaWZpZXJUZW1wbGF0ZXIiLCJtb2RpZmllcnMiLCJhdHRyTW9kaWZpZXJzIiwibW9kaWZpZXIiLCJtZXRob2RzIiwiaGFzTW9kaWZpZXIiLCJuZWVkbGUiLCJ0b2tlbnMiLCJzb21lIiwicmVtb3ZlTW9kaWZpZXIiLCJmaWx0ZXIiLCJ0b2tlbiIsImFkZE1vZGlmaWVyIiwic2V0TW9kaWZpZXIiLCJ0b2dnbGVNb2RpZmllciIsIl90ciIsImZucyIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImNsYXNzZXMiLCJwYXR0IiwiY2xzIiwib2xkRm4iLCJuZXdGbiIsIm9iamVjdCIsInZhciIsInZhck5hbWUiLCJfZGVmaW5lVmFyIiwiX3JlZ2lzdGVyRXZlbnRIYW5kbGVyIiwiY29tcG9uZW50IiwiY2FwaXRhbGl6ZWRFdmVudE5hbWUiLCJsIiwiaXNBbmRyb2lkIiwiaXNJT1MiLCJpc1dlYlZpZXciLCJpc0lPUzdhYm92ZSIsInVhIiwicGFyc2VGbG9hdCIsImtleSIsIm5hbWVzIiwiY29udGFpbmVyIiwibm90aWZpY2F0aW9uIiwib3JpZ2luYWxOb3RpZmljYXRpb24iLCJtZXNzYWdlIiwiaW5qZWN0b3IiLCJqUXVlcnkiLCJ3YXJuIiwidGVtcGxhdGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImlkIiwidGV4dCJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7O0FBS0EsQ0FBQyxZQUFXO0FBQ1Y7O0FBQ0EsTUFBSUEsU0FBUyxNQUFNQyxJQUFOLENBQVcsWUFBVTtBQUFDQztBQUFLLEdBQTNCLElBQStCLFlBQS9CLEdBQThDLElBQTNEOztBQUVBO0FBQ0EsV0FBU0MsU0FBVCxHQUFvQixDQUFFOztBQUV0QjtBQUNBQSxZQUFVQyxNQUFWLEdBQW1CLFVBQVNDLEtBQVQsRUFBZ0I7QUFDakMsUUFBSUMsU0FBUyxLQUFLQyxTQUFsQjs7QUFFQTtBQUNBO0FBQ0EsUUFBSUMsUUFBUUMsT0FBT0MsTUFBUCxD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SUFBVCxFQUF2QjtBQUNEO0FBQ0Y7QUFDRixHQVZEO0FBWUQsQ0FmRCIsImZpbGUiOiJhbmd1bGFyLW9uc2VudWkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBTaW1wbGUgSmF2YVNjcmlwdCBJbmhlcml0YW5jZSBmb3IgRVMgNS4xXG4gKiBiYXNlZCBvbiBodHRwOi8vZWpvaG4ub3JnL2Jsb2cvc2ltcGxlLWphdmFzY3JpcHQtaW5oZXJpdGFuY2UvXG4gKiAgKGluc3BpcmVkIGJ5IGJhc2UyIGFuZCBQcm90b3R5cGUpXG4gKiBNSVQgTGljZW5zZWQuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBmblRlc3QgPSAveHl6Ly50ZXN0KGZ1bmN0aW9uKCl7eHl6O30pID8gL1xcYl9zdXBlclxcYi8gOiAvLiovO1xuXG4gIC8vIFRoZSBiYXNlIENsYXNzIGltcGxlbWVudGF0aW9uIChkb2VzIG5vdGhpbmcpXG4gIGZ1bmN0aW9uIEJhc2VDbGFzcygpe31cblxuICAvLyBDcmVhdGUgYSBuZXcgQ2xhc3MgdGhhdCBpbmhlcml0cyBmcm9tIHRoaXMgY2xhc3NcbiAgQmFzZUNsYXNzLmV4dGVuZCA9IGZ1bmN0aW9uKHByb3BzKSB7XG4gICAgdmFyIF9zdXBlciA9IHRoaXMucHJvdG90eXBlO1xuXG4gICAgLy8gU2V0IHVwIHRoZSBwcm90b3R5cGUgdG8gaW5oZXJpdCBmcm9tIHRoZSBiYXNlIGNsYXNzXG4gICAgLy8gKGJ1dCB3aXRob3V0IHJ1bm5pbmcgdGhlIGluaXQgY29uc3RydWN0b3IpXG4gICAgdmFyIHByb3RvID0gT2JqZWN0LmNyZWF0ZShfc3VwZXIpO1xuXG4gICAgLy8gQ29weSB0aGUgcHJvcGVydGllcyBvdmVyIG9udG8gdGhlIG5ldyBwcm90b3R5cGVcbiAgICBmb3IgKHZhciBuYW1lIGluIHByb3BzKSB7XG4gICAgICAvLyBDaGVjayBpZiB3ZSdyZSBvdmVyd3JpdGluZyBhbiBleGlzdGluZyBmdW5jdGlvblxuICAgICAgcHJvdG9bbmFtZV0gPSB0eXBlb2YgcHJvcHNbbmFtZV0gPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICB0eXBlb2YgX3N1cGVyW25hbWVdID09IFwiZnVuY3Rpb25cIiAmJiBmblRlc3QudGVzdChwcm9wc1tuYW1lXSlcbiAgICAgICAgPyAoZnVuY3Rpb24obmFtZSwgZm4pe1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgdG1wID0gdGhpcy5fc3VwZXI7XG5cbiAgICAgICAgICAgICAgLy8gQWRkIGEgbmV3IC5fc3VwZXIoKSBtZXRob2QgdGhhdCBpcyB0aGUgc2FtZSBtZXRob2RcbiAgICAgICAgICAgICAgLy8gYnV0IG9uIHRoZSBzdXBlci1jbGFzc1xuICAgICAgICAgICAgICB0aGlzLl9zdXBlciA9IF9zdXBlcltuYW1lXTtcblxuICAgICAgICAgICAgICAvLyBUaGUgbWV0aG9kIG9ubHkgbmVlZCB0byBiZSBib3VuZCB0ZW1wb3JhcmlseSwgc28gd2VcbiAgICAgICAgICAgICAgLy8gcmVtb3ZlIGl0IHdoZW4gd2UncmUgZG9uZSBleGVjdXRpbmdcbiAgICAgICAgICAgICAgdmFyIHJldCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgIHRoaXMuX3N1cGVyID0gdG1wO1xuXG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pKG5hbWUsIHByb3BzW25hbWVdKVxuICAgICAgICA6IHByb3BzW25hbWVdO1xuICAgIH1cblxuICAgIC8vIFRoZSBuZXcgY29uc3RydWN0b3JcbiAgICB2YXIgbmV3Q2xhc3MgPSB0eXBlb2YgcHJvdG8uaW5pdCA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IHByb3RvLmhhc093blByb3BlcnR5KFwiaW5pdFwiKVxuICAgICAgICA/IHByb3RvLmluaXQgLy8gQWxsIGNvbnN0cnVjdGlvbiBpcyBhY3R1YWxseSBkb25lIGluIHRoZSBpbml0IG1ldGhvZFxuICAgICAgICA6IGZ1bmN0aW9uIFN1YkNsYXNzKCl7IF9zdXBlci5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH1cbiAgICAgIDogZnVuY3Rpb24gRW1wdHlDbGFzcygpe307XG5cbiAgICAvLyBQb3B1bGF0ZSBvdXIgY29uc3RydWN0ZWQgcHJvdG90eXBlIG9iamVjdFxuICAgIG5ld0NsYXNzLnByb3RvdHlwZSA9IHByb3RvO1xuXG4gICAgLy8gRW5mb3JjZSB0aGUgY29uc3RydWN0b3IgdG8gYmUgd2hhdCB3ZSBleHBlY3RcbiAgICBwcm90by5jb25zdHJ1Y3RvciA9IG5ld0NsYXNzO1xuXG4gICAgLy8gQW5kIG1ha2UgdGhpcyBjbGFzcyBleHRlbmRhYmxlXG4gICAgbmV3Q2xhc3MuZXh0ZW5kID0gQmFzZUNsYXNzLmV4dGVuZDtcblxuICAgIHJldHVybiBuZXdDbGFzcztcbiAgfTtcblxuICAvLyBleHBvcnRcbiAgd2luZG93LkNsYXNzID0gQmFzZUNsYXNzO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIC8qKlxuICAgKiBJbnRlcm5hbCBzZXJ2aWNlIGNsYXNzIGZvciBmcmFtZXdvcmsgaW1wbGVtZW50YXRpb24uXG4gICAqL1xuICBtb2R1bGUuZmFjdG9yeSgnJG9uc2VuJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHdpbmRvdywgJGNhY2hlRmFjdG9yeSwgJGRvY3VtZW50LCAkdGVtcGxhdGVDYWNoZSwgJGh0dHAsICRxLCAkY29tcGlsZSwgJG9uc0dsb2JhbCwgQ29tcG9uZW50Q2xlYW5lcikge1xuXG4gICAgdmFyICRvbnNlbiA9IGNyZWF0ZU9uc2VuU2VydmljZSgpO1xuICAgIHZhciBNb2RpZmllclV0aWwgPSAkb25zR2xvYmFsLl9pbnRlcm5hbC5Nb2RpZmllclV0aWw7XG5cbiAgICByZXR1cm4gJG9uc2VuO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlT25zZW5TZXJ2aWNlKCkge1xuICAgICAgcmV0dXJuIHtcblxuICAgICAgICBESVJFQ1RJVkVfVEVNUExBVEVfVVJMOiAndGVtcGxhdGVzJyxcblxuICAgICAgICBjbGVhbmVyOiBDb21wb25lbnRDbGVhbmVyLFxuXG4gICAgICAgIHV0aWw6ICRvbnNHbG9iYWwuX3V0aWwsXG5cbiAgICAgICAgRGV2aWNlQmFja0J1dHRvbkhhbmRsZXI6ICRvbnNHbG9iYWwuX2RldmljZUJhY2tCdXR0b25EaXNwYXRjaGVyLFxuXG4gICAgICAgIF9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXI6ICRvbnNHbG9iYWwuX2RlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlcixcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0RGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdERldmljZUJhY2tCdXR0b25IYW5kbGVyO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlld1xuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbWV0aG9kTmFtZXNcbiAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBkaXNwb3NlIGFsbCBkcml2aW5nIG1ldGhvZHMuXG4gICAgICAgICAqL1xuICAgICAgICBkZXJpdmVNZXRob2RzOiBmdW5jdGlvbih2aWV3LCBlbGVtZW50LCBtZXRob2ROYW1lcykge1xuICAgICAgICAgIG1ldGhvZE5hbWVzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kTmFtZSkge1xuICAgICAgICAgICAgdmlld1ttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudFttZXRob2ROYW1lXS5hcHBseShlbGVtZW50LCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1ldGhvZE5hbWVzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kTmFtZSkge1xuICAgICAgICAgICAgICB2aWV3W21ldGhvZE5hbWVdID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmlldyA9IGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7Q2xhc3N9IGtsYXNzXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHByb3BlcnRpZXNcbiAgICAgICAgICovXG4gICAgICAgIGRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudDogZnVuY3Rpb24oa2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShrbGFzcy5wcm90b3R5cGUsIHByb3BlcnR5LCB7XG4gICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50WzBdW3Byb3BlcnR5XTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50WzBdW3Byb3BlcnR5XSA9IHZhbHVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJldHVybi1hc3NpZ25cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3XG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBldmVudE5hbWVzXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFttYXBdXG4gICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgY2xlYXIgYWxsIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAgKi9cbiAgICAgICAgZGVyaXZlRXZlbnRzOiBmdW5jdGlvbih2aWV3LCBlbGVtZW50LCBldmVudE5hbWVzLCBtYXApIHtcbiAgICAgICAgICBtYXAgPSBtYXAgfHwgZnVuY3Rpb24oZGV0YWlsKSB7IHJldHVybiBkZXRhaWw7IH07XG4gICAgICAgICAgZXZlbnROYW1lcyA9IFtdLmNvbmNhdChldmVudE5hbWVzKTtcbiAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gW107XG5cbiAgICAgICAgICBldmVudE5hbWVzLmZvckVhY2goZnVuY3Rpb24oZXZlbnROYW1lKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICBtYXAoZXZlbnQuZGV0YWlsIHx8IHt9KTtcbiAgICAgICAgICAgICAgdmlldy5lbWl0KGV2ZW50TmFtZSwgZXZlbnQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBldmVudE5hbWVzLmZvckVhY2goZnVuY3Rpb24oZXZlbnROYW1lLCBpbmRleCkge1xuICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lcnNbaW5kZXhdLCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZpZXcgPSBlbGVtZW50ID0gbGlzdGVuZXJzID0gbWFwID0gbnVsbDtcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNFbmFibGVkQXV0b1N0YXR1c0JhckZpbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhISRvbnNHbG9iYWwuX2NvbmZpZy5hdXRvU3RhdHVzQmFyRmlsbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHNob3VsZEZpbGxTdGF0dXNCYXI6ICRvbnNHbG9iYWwuc2hvdWxkRmlsbFN0YXR1c0JhcixcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBhdXRvU3RhdHVzQmFyRmlsbDogJG9uc0dsb2JhbC5hdXRvU3RhdHVzQmFyRmlsbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGRpcmVjdGl2ZVxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYWdlRWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKi9cbiAgICAgICAgY29tcGlsZUFuZExpbms6IGZ1bmN0aW9uKHZpZXcsIHBhZ2VFbGVtZW50LCBjYWxsYmFjaykge1xuICAgICAgICAgIGNvbnN0IGxpbmsgPSAkY29tcGlsZShwYWdlRWxlbWVudCk7XG4gICAgICAgICAgY29uc3QgcGFnZVNjb3BlID0gdmlldy5fc2NvcGUuJG5ldygpO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogT3ZlcndyaXRlIHBhZ2Ugc2NvcGUuXG4gICAgICAgICAgICovXG4gICAgICAgICAgYW5ndWxhci5lbGVtZW50KHBhZ2VFbGVtZW50KS5kYXRhKCdfc2NvcGUnLCBwYWdlU2NvcGUpO1xuXG4gICAgICAgICAgcGFnZVNjb3BlLiRldmFsQXN5bmMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhwYWdlRWxlbWVudCk7IC8vIEF0dGFjaCBhbmQgcHJlcGFyZVxuICAgICAgICAgICAgbGluayhwYWdlU2NvcGUpOyAvLyBSdW4gdGhlIGNvbnRyb2xsZXJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXdcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBwYWdlTG9hZGVyXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVQYWdlTG9hZGVyOiBmdW5jdGlvbih2aWV3KSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyAkb25zR2xvYmFsLlBhZ2VMb2FkZXIoXG4gICAgICAgICAgICAoe3BhZ2UsIHBhcmVudH0sIGRvbmUpID0+IHtcbiAgICAgICAgICAgICAgJG9uc0dsb2JhbC5faW50ZXJuYWwuZ2V0UGFnZUhUTUxBc3luYyhwYWdlKS50aGVuKGh0bWwgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcGlsZUFuZExpbmsoXG4gICAgICAgICAgICAgICAgICB2aWV3LFxuICAgICAgICAgICAgICAgICAgJG9uc0dsb2JhbC5fdXRpbC5jcmVhdGVFbGVtZW50KGh0bWwpLFxuICAgICAgICAgICAgICAgICAgZWxlbWVudCA9PiBkb25lKHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgZWxlbWVudC5fZGVzdHJveSgpO1xuICAgICAgICAgICAgICBpZiAoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoJ19zY29wZScpKSB7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmRhdGEoJ19zY29wZScpLiRkZXN0cm95KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAgICAgICAqIEBwYXJhbSB7U2NvcGV9IFtwYXJhbXMuc2NvcGVdXG4gICAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBbcGFyYW1zLmVsZW1lbnRdXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IFtwYXJhbXMuZWxlbWVudHNdXG4gICAgICAgICAqIEBwYXJhbSB7QXR0cmlidXRlc30gW3BhcmFtcy5hdHRyc11cbiAgICAgICAgICovXG4gICAgICAgIGNsZWFyQ29tcG9uZW50OiBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgICAgICBpZiAocGFyYW1zLnNjb3BlKSB7XG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLmRlc3Ryb3lTY29wZShwYXJhbXMuc2NvcGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwYXJhbXMuYXR0cnMpIHtcbiAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUF0dHJpYnV0ZXMocGFyYW1zLmF0dHJzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveUVsZW1lbnQocGFyYW1zLmVsZW1lbnQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwYXJhbXMuZWxlbWVudHMpIHtcbiAgICAgICAgICAgIHBhcmFtcy5lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95RWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgICAgICovXG4gICAgICAgIGZpbmRFbGVtZW50ZU9iamVjdDogZnVuY3Rpb24oZWxlbWVudCwgbmFtZSkge1xuICAgICAgICAgIHJldHVybiBlbGVtZW50LmluaGVyaXRlZERhdGEobmFtZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlXG4gICAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRQYWdlSFRNTEFzeW5jOiBmdW5jdGlvbihwYWdlKSB7XG4gICAgICAgICAgdmFyIGNhY2hlID0gJHRlbXBsYXRlQ2FjaGUuZ2V0KHBhZ2UpO1xuXG4gICAgICAgICAgaWYgKGNhY2hlKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICB2YXIgaHRtbCA9IHR5cGVvZiBjYWNoZSA9PT0gJ3N0cmluZycgPyBjYWNoZSA6IGNhY2hlWzFdO1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0aGlzLm5vcm1hbGl6ZVBhZ2VIVE1MKGh0bWwpKTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgdXJsOiBwYWdlLFxuICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIHZhciBodG1sID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxpemVQYWdlSFRNTChodG1sKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBub3JtYWxpemVQYWdlSFRNTDogZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICAgIGh0bWwgPSAoJycgKyBodG1sKS50cmltKCk7XG5cbiAgICAgICAgICBpZiAoIWh0bWwubWF0Y2goL148b25zLXBhZ2UvKSkge1xuICAgICAgICAgICAgaHRtbCA9ICc8b25zLXBhZ2UgX211dGVkPicgKyBodG1sICsgJzwvb25zLXBhZ2U+JztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIG1vZGlmaWVyIHRlbXBsYXRlciBmdW5jdGlvbi4gVGhlIG1vZGlmaWVyIHRlbXBsYXRlciBnZW5lcmF0ZSBjc3MgY2xhc3NlcyBib3VuZCBtb2RpZmllciBuYW1lLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gW21vZGlmaWVyc10gYW4gYXJyYXkgb2YgYXBwZW5kaXggbW9kaWZpZXJcbiAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAgICAgICAqL1xuICAgICAgICBnZW5lcmF0ZU1vZGlmaWVyVGVtcGxhdGVyOiBmdW5jdGlvbihhdHRycywgbW9kaWZpZXJzKSB7XG4gICAgICAgICAgdmFyIGF0dHJNb2RpZmllcnMgPSBhdHRycyAmJiB0eXBlb2YgYXR0cnMubW9kaWZpZXIgPT09ICdzdHJpbmcnID8gYXR0cnMubW9kaWZpZXIudHJpbSgpLnNwbGl0KC8gKy8pIDogW107XG4gICAgICAgICAgbW9kaWZpZXJzID0gYW5ndWxhci5pc0FycmF5KG1vZGlmaWVycykgPyBhdHRyTW9kaWZpZXJzLmNvbmNhdChtb2RpZmllcnMpIDogYXR0ck1vZGlmaWVycztcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ30gdGVtcGxhdGUgZWcuICdvbnMtYnV0dG9uLS0qJywgJ29ucy1idXR0b24tLSpfX2l0ZW0nXG4gICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vZGlmaWVycy5tYXAoZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoJyonLCBtb2RpZmllcik7XG4gICAgICAgICAgICB9KS5qb2luKCcgJyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIG1vZGlmaWVyIG1ldGhvZHMgdG8gdmlldyBvYmplY3QgZm9yIGN1c3RvbSBlbGVtZW50cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXcgb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSB7anFMaXRlfSBlbGVtZW50XG4gICAgICAgICAqL1xuICAgICAgICBhZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50czogZnVuY3Rpb24odmlldywgZWxlbWVudCkge1xuICAgICAgICAgIHZhciBtZXRob2RzID0ge1xuICAgICAgICAgICAgaGFzTW9kaWZpZXI6IGZ1bmN0aW9uKG5lZWRsZSkge1xuICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gTW9kaWZpZXJVdGlsLnNwbGl0KGVsZW1lbnQuYXR0cignbW9kaWZpZXInKSk7XG4gICAgICAgICAgICAgIG5lZWRsZSA9IHR5cGVvZiBuZWVkbGUgPT09ICdzdHJpbmcnID8gbmVlZGxlLnRyaW0oKSA6ICcnO1xuXG4gICAgICAgICAgICAgIHJldHVybiBNb2RpZmllclV0aWwuc3BsaXQobmVlZGxlKS5zb21lKGZ1bmN0aW9uKG5lZWRsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbnMuaW5kZXhPZihuZWVkbGUpICE9IC0xO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlbW92ZU1vZGlmaWVyOiBmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgICAgbmVlZGxlID0gdHlwZW9mIG5lZWRsZSA9PT0gJ3N0cmluZycgPyBuZWVkbGUudHJpbSgpIDogJyc7XG5cbiAgICAgICAgICAgICAgdmFyIG1vZGlmaWVyID0gTW9kaWZpZXJVdGlsLnNwbGl0KGVsZW1lbnQuYXR0cignbW9kaWZpZXInKSkuZmlsdGVyKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuICE9PSBuZWVkbGU7XG4gICAgICAgICAgICAgIH0pLmpvaW4oJyAnKTtcblxuICAgICAgICAgICAgICBlbGVtZW50LmF0dHIoJ21vZGlmaWVyJywgbW9kaWZpZXIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYWRkTW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYXR0cignbW9kaWZpZXInLCBlbGVtZW50LmF0dHIoJ21vZGlmaWVyJykgKyAnICcgKyBtb2RpZmllcik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXRNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5hdHRyKCdtb2RpZmllcicsIG1vZGlmaWVyKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRvZ2dsZU1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBpZiAodGhpcy5oYXNNb2RpZmllcihtb2RpZmllcikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZU1vZGlmaWVyKG1vZGlmaWVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE1vZGlmaWVyKG1vZGlmaWVyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBmb3IgKHZhciBtZXRob2QgaW4gbWV0aG9kcykge1xuICAgICAgICAgICAgaWYgKG1ldGhvZHMuaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuICAgICAgICAgICAgICB2aWV3W21ldGhvZF0gPSBtZXRob2RzW21ldGhvZF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgbW9kaWZpZXIgbWV0aG9kcyB0byB2aWV3IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZXcgb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0ZW1wbGF0ZVxuICAgICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgYWRkTW9kaWZpZXJNZXRob2RzOiBmdW5jdGlvbih2aWV3LCB0ZW1wbGF0ZSwgZWxlbWVudCkge1xuICAgICAgICAgIHZhciBfdHIgPSBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoJyonLCBtb2RpZmllcik7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBmbnMgPSB7XG4gICAgICAgICAgICBoYXNNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuaGFzQ2xhc3MoX3RyKG1vZGlmaWVyKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZW1vdmVNb2RpZmllcjogZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhfdHIobW9kaWZpZXIpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGFkZE1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKF90cihtb2RpZmllcikpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0TW9kaWZpZXI6IGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIHZhciBjbGFzc2VzID0gZWxlbWVudC5hdHRyKCdjbGFzcycpLnNwbGl0KC9cXHMrLyksXG4gICAgICAgICAgICAgICAgICBwYXR0ID0gdGVtcGxhdGUucmVwbGFjZSgnKicsICcuJyk7XG5cbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNscyA9IGNsYXNzZXNbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAoY2xzLm1hdGNoKHBhdHQpKSB7XG4gICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKGNscyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhfdHIobW9kaWZpZXIpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRvZ2dsZU1vZGlmaWVyOiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICAgICAgICB2YXIgY2xzID0gX3RyKG1vZGlmaWVyKTtcbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoY2xzKSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoY2xzKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKGNscyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGFwcGVuZCA9IGZ1bmN0aW9uKG9sZEZuLCBuZXdGbikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvbGRGbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbGRGbi5hcHBseShudWxsLCBhcmd1bWVudHMpIHx8IG5ld0ZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gbmV3Rm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZpZXcuaGFzTW9kaWZpZXIgPSBhcHBlbmQodmlldy5oYXNNb2RpZmllciwgZm5zLmhhc01vZGlmaWVyKTtcbiAgICAgICAgICB2aWV3LnJlbW92ZU1vZGlmaWVyID0gYXBwZW5kKHZpZXcucmVtb3ZlTW9kaWZpZXIsIGZucy5yZW1vdmVNb2RpZmllcik7XG4gICAgICAgICAgdmlldy5hZGRNb2RpZmllciA9IGFwcGVuZCh2aWV3LmFkZE1vZGlmaWVyLCBmbnMuYWRkTW9kaWZpZXIpO1xuICAgICAgICAgIHZpZXcuc2V0TW9kaWZpZXIgPSBhcHBlbmQodmlldy5zZXRNb2RpZmllciwgZm5zLnNldE1vZGlmaWVyKTtcbiAgICAgICAgICB2aWV3LnRvZ2dsZU1vZGlmaWVyID0gYXBwZW5kKHZpZXcudG9nZ2xlTW9kaWZpZXIsIGZucy50b2dnbGVNb2RpZmllcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZSBtb2RpZmllciBtZXRob2RzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlldyBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIHJlbW92ZU1vZGlmaWVyTWV0aG9kczogZnVuY3Rpb24odmlldykge1xuICAgICAgICAgIHZpZXcuaGFzTW9kaWZpZXIgPSB2aWV3LnJlbW92ZU1vZGlmaWVyID1cbiAgICAgICAgICAgIHZpZXcuYWRkTW9kaWZpZXIgPSB2aWV3LnNldE1vZGlmaWVyID1cbiAgICAgICAgICAgIHZpZXcudG9nZ2xlTW9kaWZpZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZSBhIHZhcmlhYmxlIHRvIEphdmFTY3JpcHQgZ2xvYmFsIHNjb3BlIGFuZCBBbmd1bGFySlMgc2NvcGUgYXMgJ3ZhcicgYXR0cmlidXRlIG5hbWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBkZWNsYXJlVmFyQXR0cmlidXRlOiBmdW5jdGlvbihhdHRycywgb2JqZWN0KSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhdHRycy52YXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YXIgdmFyTmFtZSA9IGF0dHJzLnZhcjtcbiAgICAgICAgICAgIHRoaXMuX2RlZmluZVZhcih2YXJOYW1lLCBvYmplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfcmVnaXN0ZXJFdmVudEhhbmRsZXI6IGZ1bmN0aW9uKGNvbXBvbmVudCwgZXZlbnROYW1lKSB7XG4gICAgICAgICAgdmFyIGNhcGl0YWxpemVkRXZlbnROYW1lID0gZXZlbnROYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgZXZlbnROYW1lLnNsaWNlKDEpO1xuXG4gICAgICAgICAgY29tcG9uZW50Lm9uKGV2ZW50TmFtZSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoY29tcG9uZW50Ll9lbGVtZW50WzBdLCBldmVudE5hbWUsIGV2ZW50ICYmIGV2ZW50LmRldGFpbCk7XG5cbiAgICAgICAgICAgIHZhciBoYW5kbGVyID0gY29tcG9uZW50Ll9hdHRyc1snb25zJyArIGNhcGl0YWxpemVkRXZlbnROYW1lXTtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgIGNvbXBvbmVudC5fc2NvcGUuJGV2YWwoaGFuZGxlciwgeyRldmVudDogZXZlbnR9KTtcbiAgICAgICAgICAgICAgY29tcG9uZW50Ll9zY29wZS4kZXZhbEFzeW5jKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdGVyIGV2ZW50IGhhbmRsZXJzIGZvciBhdHRyaWJ1dGVzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVzXG4gICAgICAgICAqL1xuICAgICAgICByZWdpc3RlckV2ZW50SGFuZGxlcnM6IGZ1bmN0aW9uKGNvbXBvbmVudCwgZXZlbnROYW1lcykge1xuICAgICAgICAgIGV2ZW50TmFtZXMgPSBldmVudE5hbWVzLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBldmVudE5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50TmFtZXNbaV07XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlckV2ZW50SGFuZGxlcihjb21wb25lbnQsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNBbmRyb2lkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gISEkd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2FuZHJvaWQvaSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0lPUzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhJHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8oaXBhZHxpcGhvbmV8aXBvZCB0b3VjaCkvaSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc1dlYlZpZXc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAkb25zR2xvYmFsLmlzV2ViVmlldygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNJT1M3YWJvdmU6IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdWEgPSAkd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgICAgdmFyIG1hdGNoID0gdWEubWF0Y2goLyhpUGFkfGlQaG9uZXxpUG9kIHRvdWNoKTsuKkNQVS4qT1MgKFxcZCspXyhcXGQrKS9pKTtcblxuICAgICAgICAgIHZhciByZXN1bHQgPSBtYXRjaCA/IHBhcnNlRmxvYXQobWF0Y2hbMl0gKyAnLicgKyBtYXRjaFszXSkgPj0gNyA6IGZhbHNlO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9O1xuICAgICAgICB9KSgpLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaXJlIGEgbmFtZWQgZXZlbnQgZm9yIGEgY29tcG9uZW50LiBUaGUgdmlldyBvYmplY3QsIGlmIGl0IGV4aXN0cywgaXMgYXR0YWNoZWQgdG8gZXZlbnQuY29tcG9uZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbZG9tXVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgbmFtZVxuICAgICAgICAgKi9cbiAgICAgICAgZmlyZUNvbXBvbmVudEV2ZW50OiBmdW5jdGlvbihkb20sIGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuXG4gICAgICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcblxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgIGV2ZW50W2tleV0gPSBkYXRhW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXZlbnQuY29tcG9uZW50ID0gZG9tID9cbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChkb20pLmRhdGEoZG9tLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpIHx8IG51bGwgOiBudWxsO1xuICAgICAgICAgIGV2ZW50LmluaXRFdmVudChkb20ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSArICc6JyArIGV2ZW50TmFtZSwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgICBkb20uZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZSBhIHZhcmlhYmxlIHRvIEphdmFTY3JpcHQgZ2xvYmFsIHNjb3BlIGFuZCBBbmd1bGFySlMgc2NvcGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIFV0aWwuZGVmaW5lVmFyKCdmb28nLCAnZm9vLXZhbHVlJyk7XG4gICAgICAgICAqIC8vID0+IHdpbmRvdy5mb28gYW5kICRzY29wZS5mb28gaXMgbm93ICdmb28tdmFsdWUnXG4gICAgICAgICAqXG4gICAgICAgICAqIFV0aWwuZGVmaW5lVmFyKCdmb28uYmFyJywgJ2Zvby1iYXItdmFsdWUnKTtcbiAgICAgICAgICogLy8gPT4gd2luZG93LmZvby5iYXIgYW5kICRzY29wZS5mb28uYmFyIGlzIG5vdyAnZm9vLWJhci12YWx1ZSdcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgX2RlZmluZVZhcjogZnVuY3Rpb24obmFtZSwgb2JqZWN0KSB7XG4gICAgICAgICAgdmFyIG5hbWVzID0gbmFtZS5zcGxpdCgvXFwuLyk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBzZXQoY29udGFpbmVyLCBuYW1lcywgb2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgbmFtZTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lcltuYW1lXSA9PT0gdW5kZWZpbmVkIHx8IGNvbnRhaW5lcltuYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lcltuYW1lXSA9IHt9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lcltuYW1lXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGFpbmVyW25hbWVzW25hbWVzLmxlbmd0aCAtIDFdXSA9IG9iamVjdDtcblxuICAgICAgICAgICAgaWYgKGNvbnRhaW5lcltuYW1lc1tuYW1lcy5sZW5ndGggLSAxXV0gIT09IG9iamVjdCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzZXQgdmFyPVwiJyArIG9iamVjdC5fYXR0cnMudmFyICsgJ1wiIGJlY2F1c2UgaXQgd2lsbCBvdmVyd3JpdGUgYSByZWFkLW9ubHkgdmFyaWFibGUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG9ucy5jb21wb25lbnRCYXNlKSB7XG4gICAgICAgICAgICBzZXQob25zLmNvbXBvbmVudEJhc2UsIG5hbWVzLCBvYmplY3QpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEF0dGFjaCB0byBhbmNlc3RvciB3aXRoIG9ucy1zY29wZSBhdHRyaWJ1dGUuXG4gICAgICAgICAgdmFyIGVsZW1lbnQgPSBvYmplY3QuX2VsZW1lbnRbMF07XG5cbiAgICAgICAgICB3aGlsZSAoZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ29ucy1zY29wZScpKSB7XG4gICAgICAgICAgICAgIHNldChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZGF0YSgnX3Njb3BlJyksIG5hbWVzLCBvYmplY3QpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgIC8vIElmIG5vIG9ucy1zY29wZSBlbGVtZW50IHdhcyBmb3VuZCwgYXR0YWNoIHRvICRyb290U2NvcGUuXG4gICAgICAgICAgc2V0KCRyb290U2NvcGUsIG5hbWVzLCBvYmplY3QpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1hY3Rpb24tc2hlZXRcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGFjdGlvbiBzaGVldC5bL2VuXVxuICogIFtqYV3jgZPjga7jgqLjgq/jgrfjg6fjg7Pjgrfjg7zjg4jjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlc2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0c2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0aGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZdsaXN0ZW5lcuODkeODqeODoeODvOOCv+OBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOAgeOBneOBruOCpOODmeODs+ODiOOBruODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844Gu6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5rih44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogQWN0aW9uIHNoZWV0IGRpcmVjdGl2ZS5cbiAgICovXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zQWN0aW9uU2hlZXQnLCBmdW5jdGlvbigkb25zZW4sIEFjdGlvblNoZWV0Vmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBhY3Rpb25TaGVldCA9IG5ldyBBY3Rpb25TaGVldFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGFjdGlvblNoZWV0KTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoYWN0aW9uU2hlZXQsICdwcmVzaG93IHByZWhpZGUgcG9zdHNob3cgcG9zdGhpZGUgZGVzdHJveScpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKGFjdGlvblNoZWV0LCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtYWN0aW9uLXNoZWV0JywgYWN0aW9uU2hlZXQpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGFjdGlvblNoZWV0Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoYWN0aW9uU2hlZXQpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1hY3Rpb24tc2hlZXQnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1hbGVydC1kaWFsb2dcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGFsZXJ0IGRpYWxvZy5bL2VuXVxuICogIFtqYV3jgZPjga7jgqLjg6njg7zjg4jjg4DjgqTjgqLjg63jgrDjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlc2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlc2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZWhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0c2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdHNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGhpZGVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0aGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZdsaXN0ZW5lcuODkeODqeODoeODvOOCv+OBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOAgeOBneOBruOCpOODmeODs+ODiOOBruODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844Gu6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5rih44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogQWxlcnQgZGlhbG9nIGRpcmVjdGl2ZS5cbiAgICovXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zQWxlcnREaWFsb2cnLCBmdW5jdGlvbigkb25zZW4sIEFsZXJ0RGlhbG9nVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciBhbGVydERpYWxvZyA9IG5ldyBBbGVydERpYWxvZ1ZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGFsZXJ0RGlhbG9nKTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoYWxlcnREaWFsb2csICdwcmVzaG93IHByZWhpZGUgcG9zdHNob3cgcG9zdGhpZGUgZGVzdHJveScpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKGFsZXJ0RGlhbG9nLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtYWxlcnQtZGlhbG9nJywgYWxlcnREaWFsb2cpO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdfc2NvcGUnLCBzY29wZSk7XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgYWxlcnREaWFsb2cuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhhbGVydERpYWxvZyk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLWFsZXJ0LWRpYWxvZycsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIlxuLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgLnZhbHVlKCdBbGVydERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5BbGVydERpYWxvZ0FuaW1hdG9yKVxuICAudmFsdWUoJ0FuZHJvaWRBbGVydERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5BbmRyb2lkQWxlcnREaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdJT1NBbGVydERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5JT1NBbGVydERpYWxvZ0FuaW1hdG9yKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLnZhbHVlKCdBbmltYXRpb25DaG9vc2VyJywgb25zLl9pbnRlcm5hbC5BbmltYXRvckZhY3RvcnkpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtY2Fyb3VzZWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQ2Fyb3VzZWwgY29tcG9uZW50LlsvZW5dXG4gKiAgIFtqYV3jgqvjg6vjg7zjgrvjg6vjgpLooajnpLrjgafjgY3jgovjgrPjg7Pjg53jg7zjg43jg7Pjg4jjgIJbL2phXVxuICogQGNvZGVwZW4geGJiek9RXG4gKiBAZ3VpZGUgVXNpbmdDYXJvdXNlbFxuICogICBbZW5dTGVhcm4gaG93IHRvIHVzZSB0aGUgY2Fyb3VzZWwgY29tcG9uZW50LlsvZW5dXG4gKiAgIFtqYV1jYXJvdXNlbOOCs+ODs+ODneODvOODjeODs+ODiOOBruS9v+OBhOaWuVsvamFdXG4gKiBAZXhhbXBsZVxuICogPG9ucy1jYXJvdXNlbCBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDIwMHB4XCI+XG4gKiAgIDxvbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgIC4uLlxuICogICA8L29ucy1jYXJvdXNlbC1pdGVtPlxuICogICA8b25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgICAuLi5cbiAqICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqIDwvb25zLWNhcm91c2VsPlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIGNhcm91c2VsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqvjg6vjg7zjgrvjg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdGNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGNoYW5nZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNoYW5nZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXJlZnJlc2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInJlZnJlc2hcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInJlZnJlc2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1vdmVyc2Nyb2xsXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJvdmVyc2Nyb2xsXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJvdmVyc2Nyb2xsXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5oyH5a6a44GV44KM44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ5LuY44GE44Gm44GE44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YWo44Gm5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zQ2Fyb3VzZWwnLCBmdW5jdGlvbigkb25zZW4sIENhcm91c2VsVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgY2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWxWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1jYXJvdXNlbCcsIGNhcm91c2VsKTtcblxuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoY2Fyb3VzZWwsICdwb3N0Y2hhbmdlIHJlZnJlc2ggb3ZlcnNjcm9sbCBkZXN0cm95Jyk7XG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGNhcm91c2VsKTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNhcm91c2VsLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1jYXJvdXNlbCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICB9O1xuICB9KTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNDYXJvdXNlbEl0ZW0nLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBpZiAoc2NvcGUuJGxhc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhcm91c2VsID0gJG9uc2VuLnV0aWwuZmluZFBhcmVudChlbGVtZW50WzBdLCAnb25zLWNhcm91c2VsJyk7XG4gICAgICAgICAgICBjYXJvdXNlbC5fc3dpcGVyLmluaXQoe1xuICAgICAgICAgICAgICBzd2lwZWFibGU6IGNhcm91c2VsLmhhc0F0dHJpYnV0ZSgnc3dpcGVhYmxlJyksXG4gICAgICAgICAgICAgIGF1dG9SZWZyZXNoOiBjYXJvdXNlbC5oYXNBdHRyaWJ1dGUoJ2F1dG8tcmVmcmVzaCcpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLWRpYWxvZ1xuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgZGlhbG9nLlsvZW5dXG4gKiAgW2phXeOBk+OBruODgOOCpOOCouODreOCsOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOS7mOOBhOOBpuOBhOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNEaWFsb2cnLCBmdW5jdGlvbigkb25zZW4sIERpYWxvZ1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICAgIHZhciBkaWFsb2cgPSBuZXcgRGlhbG9nVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGRpYWxvZyk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKGRpYWxvZywgJ3ByZXNob3cgcHJlaGlkZSBwb3N0c2hvdyBwb3N0aGlkZSBkZXN0cm95Jyk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMoZGlhbG9nLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtZGlhbG9nJywgZGlhbG9nKTtcbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZGlhbG9nLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMoZGlhbG9nKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtZGlhbG9nJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG4gICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbmh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAudmFsdWUoJ0RpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5EaWFsb2dBbmltYXRvcilcbiAgLnZhbHVlKCdJT1NEaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuSU9TRGlhbG9nQW5pbWF0b3IpXG4gIC52YWx1ZSgnQW5kcm9pZERpYWxvZ0FuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5BbmRyb2lkRGlhbG9nQW5pbWF0b3IpXG4gIC52YWx1ZSgnU2xpZGVEaWFsb2dBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuU2xpZGVEaWFsb2dBbmltYXRvcik7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1mYWJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhlIGZsb2F0aW5nIGFjdGlvbiBidXR0b24uWy9lbl1cbiAqICAgW2phXeOBk+OBruODleODreODvOODhuOCo+ODs+OCsOOCouOCr+OCt+ODp+ODs+ODnOOCv+ODs+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWkieaVsOWQjeOCkuOBl+OBpuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0ZhYicsIGZ1bmN0aW9uKCRvbnNlbiwgRmFiVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIGZhYiA9IG5ldyBGYWJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1mYWInLCBmYWIpO1xuXG4gICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIGZhYik7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1mYWInLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnR2VuZXJpY1ZpZXcnLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBHZW5lcmljVmlldyA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRpcmVjdGl2ZU9ubHldXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkRlc3Ryb3ldXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZV1cbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmRpcmVjdGl2ZU9ubHkpIHtcbiAgICAgICAgICBpZiAoIW9wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zLm1vZGlmaWVyVGVtcGxhdGUgaXMgdW5kZWZpbmVkLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzKHRoaXMsIG9wdGlvbnMubW9kaWZpZXJUZW1wbGF0ZSwgZWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRoaXMsIGVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhzZWxmKTtcblxuICAgICAgICAgIGlmIChvcHRpb25zLm9uRGVzdHJveSkge1xuICAgICAgICAgICAgb3B0aW9ucy5vbkRlc3Ryb3koc2VsZik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRycyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNlbGYgPSBlbGVtZW50ID0gc2VsZi5fZWxlbWVudCA9IHNlbGYuX3Njb3BlID0gc2NvcGUgPSBzZWxmLl9hdHRycyA9IGF0dHJzID0gb3B0aW9ucyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICogQHBhcmFtIHtqcUxpdGV9IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnZpZXdLZXlcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRpcmVjdGl2ZU9ubHldXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25EZXN0cm95XVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5tb2RpZmllclRlbXBsYXRlXVxuICAgICAqL1xuICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyID0gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBHZW5lcmljVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMsIG9wdGlvbnMpO1xuXG4gICAgICBpZiAoIW9wdGlvbnMudmlld0tleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMudmlld0tleSBpcyByZXF1aXJlZC4nKTtcbiAgICAgIH1cblxuICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHZpZXcpO1xuICAgICAgZWxlbWVudC5kYXRhKG9wdGlvbnMudmlld0tleSwgdmlldyk7XG5cbiAgICAgIHZhciBkZXN0cm95ID0gb3B0aW9ucy5vbkRlc3Ryb3kgfHwgYW5ndWxhci5ub29wO1xuICAgICAgb3B0aW9ucy5vbkRlc3Ryb3kgPSBmdW5jdGlvbih2aWV3KSB7XG4gICAgICAgIGRlc3Ryb3kodmlldyk7XG4gICAgICAgIGVsZW1lbnQuZGF0YShvcHRpb25zLnZpZXdLZXksIG51bGwpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfTtcblxuICAgIE1pY3JvRXZlbnQubWl4aW4oR2VuZXJpY1ZpZXcpO1xuXG4gICAgcmV0dXJuIEdlbmVyaWNWaWV3O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1sYXp5LXJlcGVhdFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1cbiAqICAgICBVc2luZyB0aGlzIGNvbXBvbmVudCBhIGxpc3Qgd2l0aCBtaWxsaW9ucyBvZiBpdGVtcyBjYW4gYmUgcmVuZGVyZWQgd2l0aG91dCBhIGRyb3AgaW4gcGVyZm9ybWFuY2UuXG4gKiAgICAgSXQgZG9lcyB0aGF0IGJ5IFwibGF6aWx5XCIgbG9hZGluZyBlbGVtZW50cyBpbnRvIHRoZSBET00gd2hlbiB0aGV5IGNvbWUgaW50byB2aWV3IGFuZFxuICogICAgIHJlbW92aW5nIGl0ZW1zIGZyb20gdGhlIERPTSB3aGVuIHRoZXkgYXJlIG5vdCB2aXNpYmxlLlxuICogICBbL2VuXVxuICogICBbamFdXG4gKiAgICAg44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI5YaF44Gn5o+P55S744GV44KM44KL44Ki44Kk44OG44Og44GuRE9N6KaB57Sg44Gu6Kqt44G/6L6844G/44Gv44CB55S76Z2i44Gr6KaL44GI44Gd44GG44Gr44Gq44Gj44Gf5pmC44G+44Gn6Ieq5YuV55qE44Gr6YGF5bu244GV44KM44CBXG4gKiAgICAg55S76Z2i44GL44KJ6KaL44GI44Gq44GP44Gq44Gj44Gf5aC05ZCI44Gr44Gv44Gd44Gu6KaB57Sg44Gv5YuV55qE44Gr44Ki44Oz44Ot44O844OJ44GV44KM44G+44GZ44CCXG4gKiAgICAg44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI44KS5L2/44GG44GT44Go44Gn44CB44OR44OV44Kp44O844Oe44Oz44K544KS5Yqj5YyW44GV44Gb44KL44GT44Go54Sh44GX44Gr5beo5aSn44Gq5pWw44Gu6KaB57Sg44KS5o+P55S744Gn44GN44G+44GZ44CCXG4gKiAgIFsvamFdXG4gKiBAY29kZXBlbiBRd3JHQm1cbiAqIEBndWlkZSBVc2luZ0xhenlSZXBlYXRcbiAqICAgW2VuXUhvdyB0byB1c2UgTGF6eSBSZXBlYXRbL2VuXVxuICogICBbamFd44Os44Kk44K444O844Oq44OU44O844OI44Gu5L2/44GE5pa5Wy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8c2NyaXB0PlxuICogICBvbnMuYm9vdHN0cmFwKClcbiAqXG4gKiAgIC5jb250cm9sbGVyKCdNeUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAqICAgICAkc2NvcGUuTXlEZWxlZ2F0ZSA9IHtcbiAqICAgICAgIGNvdW50SXRlbXM6IGZ1bmN0aW9uKCkge1xuICogICAgICAgICAvLyBSZXR1cm4gbnVtYmVyIG9mIGl0ZW1zLlxuICogICAgICAgICByZXR1cm4gMTAwMDAwMDtcbiAqICAgICAgIH0sXG4gKlxuICogICAgICAgY2FsY3VsYXRlSXRlbUhlaWdodDogZnVuY3Rpb24oaW5kZXgpIHtcbiAqICAgICAgICAgLy8gUmV0dXJuIHRoZSBoZWlnaHQgb2YgYW4gaXRlbSBpbiBwaXhlbHMuXG4gKiAgICAgICAgIHJldHVybiA0NTtcbiAqICAgICAgIH0sXG4gKlxuICogICAgICAgY29uZmlndXJlSXRlbVNjb3BlOiBmdW5jdGlvbihpbmRleCwgaXRlbVNjb3BlKSB7XG4gKiAgICAgICAgIC8vIEluaXRpYWxpemUgc2NvcGVcbiAqICAgICAgICAgaXRlbVNjb3BlLml0ZW0gPSAnSXRlbSAjJyArIChpbmRleCArIDEpO1xuICogICAgICAgfSxcbiAqXG4gKiAgICAgICBkZXN0cm95SXRlbVNjb3BlOiBmdW5jdGlvbihpbmRleCwgaXRlbVNjb3BlKSB7XG4gKiAgICAgICAgIC8vIE9wdGlvbmFsIG1ldGhvZCB0aGF0IGlzIGNhbGxlZCB3aGVuIGFuIGl0ZW0gaXMgdW5sb2FkZWQuXG4gKiAgICAgICAgIGNvbnNvbGUubG9nKCdEZXN0cm95ZWQgaXRlbSB3aXRoIGluZGV4OiAnICsgaW5kZXgpO1xuICogICAgICAgfVxuICogICAgIH07XG4gKiAgIH0pO1xuICogPC9zY3JpcHQ+XG4gKlxuICogPG9ucy1saXN0IG5nLWNvbnRyb2xsZXI9XCJNeUNvbnRyb2xsZXJcIj5cbiAqICAgPG9ucy1saXN0LWl0ZW0gb25zLWxhenktcmVwZWF0PVwiTXlEZWxlZ2F0ZVwiPlxuICogICAgIHt7IGl0ZW0gfX1cbiAqICAgPC9vbnMtbGlzdC1pdGVtPlxuICogPC9vbnMtbGlzdD5cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWxhenktcmVwZWF0XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBpbml0b25seVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUEgZGVsZWdhdGUgb2JqZWN0LCBjYW4gYmUgZWl0aGVyIGFuIG9iamVjdCBhdHRhY2hlZCB0byB0aGUgc2NvcGUgKHdoZW4gdXNpbmcgQW5ndWxhckpTKSBvciBhIG5vcm1hbCBKYXZhU2NyaXB0IHZhcmlhYmxlLlsvZW5dXG4gKiAgW2phXeimgee0oOOBruODreODvOODieOAgeOCouODs+ODreODvOODieOBquOBqeOBruWHpueQhuOCkuWnlOitsuOBmeOCi+OCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAgkFuZ3VsYXJKU+OBruOCueOCs+ODvOODl+OBruWkieaVsOWQjeOChOOAgemAmuW4uOOBrkphdmFTY3JpcHTjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQHByb3BlcnR5IGRlbGVnYXRlLmNvbmZpZ3VyZUl0ZW1TY29wZVxuICogQHR5cGUge0Z1bmN0aW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1GdW5jdGlvbiB3aGljaCByZWNpZXZlcyBhbiBpbmRleCBhbmQgdGhlIHNjb3BlIGZvciB0aGUgaXRlbS4gQ2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIHZhbHVlcyBpbiB0aGUgaXRlbSBzY29wZS5bL2VuXVxuICogICBbamFdWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgLyoqXG4gICAqIExhenkgcmVwZWF0IGRpcmVjdGl2ZS5cbiAgICovXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0xhenlSZXBlYXQnLCBmdW5jdGlvbigkb25zZW4sIExhenlSZXBlYXRWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHByaW9yaXR5OiAxMDAwLFxuICAgICAgdGVybWluYWw6IHRydWUsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgbGF6eVJlcGVhdCA9IG5ldyBMYXp5UmVwZWF0VmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBsYXp5UmVwZWF0ID0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnQW5ndWxhckxhenlSZXBlYXREZWxlZ2F0ZScsIGZ1bmN0aW9uKCRjb21waWxlKSB7XG5cbiAgICBjb25zdCBkaXJlY3RpdmVBdHRyaWJ1dGVzID0gWydvbnMtbGF6eS1yZXBlYXQnLCAnb25zOmxhenk6cmVwZWF0JywgJ29uc19sYXp5X3JlcGVhdCcsICdkYXRhLW9ucy1sYXp5LXJlcGVhdCcsICd4LW9ucy1sYXp5LXJlcGVhdCddO1xuICAgIGNsYXNzIEFuZ3VsYXJMYXp5UmVwZWF0RGVsZWdhdGUgZXh0ZW5kcyBvbnMuX2ludGVybmFsLkxhenlSZXBlYXREZWxlZ2F0ZSB7XG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB1c2VyRGVsZWdhdGVcbiAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGVtcGxhdGVFbGVtZW50XG4gICAgICAgKiBAcGFyYW0ge1Njb3BlfSBwYXJlbnRTY29wZVxuICAgICAgICovXG4gICAgICBjb25zdHJ1Y3Rvcih1c2VyRGVsZWdhdGUsIHRlbXBsYXRlRWxlbWVudCwgcGFyZW50U2NvcGUpIHtcbiAgICAgICAgc3VwZXIodXNlckRlbGVnYXRlLCB0ZW1wbGF0ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLl9wYXJlbnRTY29wZSA9IHBhcmVudFNjb3BlO1xuXG4gICAgICAgIGRpcmVjdGl2ZUF0dHJpYnV0ZXMuZm9yRWFjaChhdHRyID0+IHRlbXBsYXRlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cikpO1xuICAgICAgICB0aGlzLl9saW5rZXIgPSAkY29tcGlsZSh0ZW1wbGF0ZUVsZW1lbnQgPyB0ZW1wbGF0ZUVsZW1lbnQuY2xvbmVOb2RlKHRydWUpIDogbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIGNvbmZpZ3VyZUl0ZW1TY29wZShpdGVtLCBzY29wZSl7XG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuY29uZmlndXJlSXRlbVNjb3BlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLl91c2VyRGVsZWdhdGUuY29uZmlndXJlSXRlbVNjb3BlKGl0ZW0sIHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkZXN0cm95SXRlbVNjb3BlKGl0ZW0sIGVsZW1lbnQpe1xuICAgICAgICBpZiAodGhpcy5fdXNlckRlbGVnYXRlLmRlc3Ryb3lJdGVtU2NvcGUgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgIHRoaXMuX3VzZXJEZWxlZ2F0ZS5kZXN0cm95SXRlbVNjb3BlKGl0ZW0sIGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIF91c2luZ0JpbmRpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2VyRGVsZWdhdGUuY29uZmlndXJlSXRlbVNjb3BlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fdXNlckRlbGVnYXRlLmNyZWF0ZUl0ZW1Db250ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgbGF6eS1yZXBlYXRgIGRlbGVnYXRlIG9iamVjdCBpcyB2YWd1ZS4nKTtcbiAgICAgIH1cblxuICAgICAgbG9hZEl0ZW1FbGVtZW50KGluZGV4LCBkb25lKSB7XG4gICAgICAgIHRoaXMuX3ByZXBhcmVJdGVtRWxlbWVudChpbmRleCwgKHtlbGVtZW50LCBzY29wZX0pID0+IHtcbiAgICAgICAgICBkb25lKHtlbGVtZW50LCBzY29wZX0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgX3ByZXBhcmVJdGVtRWxlbWVudChpbmRleCwgZG9uZSkge1xuICAgICAgICBjb25zdCBzY29wZSA9IHRoaXMuX3BhcmVudFNjb3BlLiRuZXcoKTtcbiAgICAgICAgdGhpcy5fYWRkU3BlY2lhbFByb3BlcnRpZXMoaW5kZXgsIHNjb3BlKTtcblxuICAgICAgICBpZiAodGhpcy5fdXNpbmdCaW5kaW5nKCkpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyZUl0ZW1TY29wZShpbmRleCwgc2NvcGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGlua2VyKHNjb3BlLCAoY2xvbmVkKSA9PiB7XG4gICAgICAgICAgbGV0IGVsZW1lbnQgPSBjbG9uZWRbMF07XG4gICAgICAgICAgaWYgKCF0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuX3VzZXJEZWxlZ2F0ZS5jcmVhdGVJdGVtQ29udGVudChpbmRleCwgZWxlbWVudCk7XG4gICAgICAgICAgICAkY29tcGlsZShlbGVtZW50KShzY29wZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9uZSh7ZWxlbWVudCwgc2NvcGV9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgICAqL1xuICAgICAgX2FkZFNwZWNpYWxQcm9wZXJ0aWVzKGksIHNjb3BlKSB7XG4gICAgICAgIGNvbnN0IGxhc3QgPSB0aGlzLmNvdW50SXRlbXMoKSAtIDE7XG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKHNjb3BlLCB7XG4gICAgICAgICAgJGluZGV4OiBpLFxuICAgICAgICAgICRmaXJzdDogaSA9PT0gMCxcbiAgICAgICAgICAkbGFzdDogaSA9PT0gbGFzdCxcbiAgICAgICAgICAkbWlkZGxlOiBpICE9PSAwICYmIGkgIT09IGxhc3QsXG4gICAgICAgICAgJGV2ZW46IGkgJSAyID09PSAwLFxuICAgICAgICAgICRvZGQ6IGkgJSAyID09PSAxXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGVJdGVtKGluZGV4LCBpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgIGl0ZW0uc2NvcGUuJGV2YWxBc3luYygoKSA9PiB0aGlzLmNvbmZpZ3VyZUl0ZW1TY29wZShpbmRleCwgaXRlbS5zY29wZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cGVyLnVwZGF0ZUl0ZW0oaW5kZXgsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbVxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0uc2NvcGVcbiAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gaXRlbS5lbGVtZW50XG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3lJdGVtKGluZGV4LCBpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2luZ0JpbmRpbmcoKSkge1xuICAgICAgICAgIHRoaXMuZGVzdHJveUl0ZW1TY29wZShpbmRleCwgaXRlbS5zY29wZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwZXIuZGVzdHJveUl0ZW0oaW5kZXgsIGl0ZW0uZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5zY29wZS4kZGVzdHJveSgpO1xuICAgICAgfVxuXG4gICAgICBkZXN0cm95KCkge1xuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gbnVsbDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBBbmd1bGFyTGF6eVJlcGVhdERlbGVnYXRlO1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1tb2RhbFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAaW5pdG9ubHlcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIG1vZGFsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jg6Ljg7zjg4Djg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBNb2RhbCBkaXJlY3RpdmUuXG4gICAqL1xuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc01vZGFsJywgZnVuY3Rpb24oJG9uc2VuLCBNb2RhbFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogKGVsZW1lbnQsIGF0dHJzKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIG1vZGFsID0gbmV3IE1vZGFsVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKG1vZGFsLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIG1vZGFsKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLW1vZGFsJywgbW9kYWwpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMobW9kYWwpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1tb2RhbCcsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIG1vZGFsID0gZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLW5hdmlnYXRvclxuICogQGV4YW1wbGVcbiAqIDxvbnMtbmF2aWdhdG9yIGFuaW1hdGlvbj1cInNsaWRlXCIgdmFyPVwiYXBwLm5hdmlcIj5cbiAqICAgPG9ucy1wYWdlPlxuICogICAgIDxvbnMtdG9vbGJhcj5cbiAqICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5UaXRsZTwvZGl2PlxuICogICAgIDwvb25zLXRvb2xiYXI+XG4gKlxuICogICAgIDxwIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyXCI+XG4gKiAgICAgICA8b25zLWJ1dHRvbiBtb2RpZmllcj1cImxpZ2h0XCIgbmctY2xpY2s9XCJhcHAubmF2aS5wdXNoUGFnZSgncGFnZS5odG1sJyk7XCI+UHVzaDwvb25zLWJ1dHRvbj5cbiAqICAgICA8L3A+XG4gKiAgIDwvb25zLXBhZ2U+XG4gKiA8L29ucy1uYXZpZ2F0b3I+XG4gKlxuICogPG9ucy10ZW1wbGF0ZSBpZD1cInBhZ2UuaHRtbFwiPlxuICogICA8b25zLXBhZ2U+XG4gKiAgICAgPG9ucy10b29sYmFyPlxuICogICAgICAgPGRpdiBjbGFzcz1cImNlbnRlclwiPlRpdGxlPC9kaXY+XG4gKiAgICAgPC9vbnMtdG9vbGJhcj5cbiAqXG4gKiAgICAgPHAgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXJcIj5cbiAqICAgICAgIDxvbnMtYnV0dG9uIG1vZGlmaWVyPVwibGlnaHRcIiBuZy1jbGljaz1cImFwcC5uYXZpLnBvcFBhZ2UoKTtcIj5Qb3A8L29ucy1idXR0b24+XG4gKiAgICAgPC9wPlxuICogICA8L29ucy1wYWdlPlxuICogPC9vbnMtdGVtcGxhdGU+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBuYXZpZ2F0b3IuWy9lbl1cbiAqICBbamFd44GT44Gu44OK44OT44Ky44O844K/44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXB1c2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXB1c2hcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXB1c2hcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVwb3BcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXBvcFwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlcG9wXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHB1c2hcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RwdXNoXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0cHVzaFwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3Rwb3BcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3Rwb3BcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3Rwb3BcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pbml0XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcInNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cInNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1oaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiBhIHBhZ2UncyBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV3jg5rjg7zjgrjjga5cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuTmF2aWdhdG9yRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5OYXZpZ2F0b3JFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtbmF2aWdhdG9yJywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc05hdmlnYXRvcicsIGZ1bmN0aW9uKE5hdmlnYXRvclZpZXcsICRvbnNlbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuXG4gICAgICAvLyBOT1RFOiBUaGlzIGVsZW1lbnQgbXVzdCBjb2V4aXN0cyB3aXRoIG5nLWNvbnRyb2xsZXIuXG4gICAgICAvLyBEbyBub3QgdXNlIGlzb2xhdGVkIHNjb3BlIGFuZCB0ZW1wbGF0ZSdzIG5nLXRyYW5zY2x1ZGUuXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgTmF2aWdhdG9yVmlldyhzY29wZSwgZWxlbWVudCwgYXR0cnMpO1xuXG4gICAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdmlldyk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHZpZXcsICdwcmVwdXNoIHByZXBvcCBwb3N0cHVzaCBwb3N0cG9wIGluaXQgc2hvdyBoaWRlIGRlc3Ryb3knKTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtbmF2aWdhdG9yJywgdmlldyk7XG5cbiAgICAgICAgICAgIGVsZW1lbnRbMF0ucGFnZUxvYWRlciA9ICRvbnNlbi5jcmVhdGVQYWdlTG9hZGVyKHZpZXcpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtbmF2aWdhdG9yJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAgIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAgIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG5odHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgLnZhbHVlKCdOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLk5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdGYWRlVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5GYWRlTmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKVxuICAudmFsdWUoJ0lPU1NsaWRlVHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5JT1NTbGlkZU5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdMaWZ0VHJhbnNpdGlvbkFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5MaWZ0TmF2aWdhdG9yVHJhbnNpdGlvbkFuaW1hdG9yKVxuICAudmFsdWUoJ051bGxUcmFuc2l0aW9uQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLk5hdmlnYXRvclRyYW5zaXRpb25BbmltYXRvcilcbiAgLnZhbHVlKCdTaW1wbGVTbGlkZVRyYW5zaXRpb25BbmltYXRvcicsIG9ucy5faW50ZXJuYWwuU2ltcGxlU2xpZGVOYXZpZ2F0b3JUcmFuc2l0aW9uQW5pbWF0b3IpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtcGFnZVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSB2YXJcbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVmFyaWFibGUgbmFtZSB0byByZWZlciB0aGlzIHBhZ2UuWy9lbl1cbiAqICAgW2phXeOBk+OBruODmuODvOOCuOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG5nLWluZmluaXRlLXNjcm9sbFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1QYXRoIG9mIHRoZSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBvbiBpbmZpbml0ZSBzY3JvbGxpbmcuIFRoZSBwYXRoIGlzIHJlbGF0aXZlIHRvICRzY29wZS4gVGhlIGZ1bmN0aW9uIHJlY2VpdmVzIGEgZG9uZSBjYWxsYmFjayB0aGF0IG11c3QgYmUgY2FsbGVkIHdoZW4gaXQncyBmaW5pc2hlZC5bL2VuXVxuICogICBbamFdWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb24tZGV2aWNlLWJhY2stYnV0dG9uXG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBiYWNrIGJ1dHRvbiBpcyBwcmVzc2VkLlsvZW5dXG4gKiAgIFtqYV3jg4fjg5DjgqTjgrnjga7jg5Djg4Pjgq/jg5zjgr/jg7PjgYzmirzjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLoqK3lrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBuZy1kZXZpY2UtYmFjay1idXR0b25cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2l0aCBhbiBBbmd1bGFySlMgZXhwcmVzc2lvbiB3aGVuIHRoZSBiYWNrIGJ1dHRvbiBpcyBwcmVzc2VkLlsvZW5dXG4gKiAgIFtqYV3jg4fjg5DjgqTjgrnjga7jg5Djg4Pjgq/jg5zjgr/jg7PjgYzmirzjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLoqK3lrprjgafjgY3jgb7jgZnjgIJBbmd1bGFySlPjga5leHByZXNzaW9u44KS5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWluaXRcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImluaXRcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImluaXRcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1zaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1BhZ2UnLCBmdW5jdGlvbigkb25zZW4sIFBhZ2VWaWV3KSB7XG5cbiAgICBmdW5jdGlvbiBmaXJlUGFnZUluaXRFdmVudChlbGVtZW50KSB7XG4gICAgICAvLyBUT0RPOiByZW1vdmUgZGlydHkgZml4XG4gICAgICB2YXIgaSA9IDAsIGYgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGkrKyA8IDE1KSAge1xuICAgICAgICAgIGlmIChpc0F0dGFjaGVkKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnQsICdpbml0Jyk7XG4gICAgICAgICAgICBmaXJlQWN0dWFsUGFnZUluaXRFdmVudChlbGVtZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGkgPiAxMCkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbCB0byBmaXJlIFwicGFnZWluaXRcIiBldmVudC4gQXR0YWNoIFwib25zLXBhZ2VcIiBlbGVtZW50IHRvIHRoZSBkb2N1bWVudCBhZnRlciBpbml0aWFsaXphdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpcmVBY3R1YWxQYWdlSW5pdEV2ZW50KGVsZW1lbnQpIHtcbiAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICBldmVudC5pbml0RXZlbnQoJ3BhZ2Vpbml0JywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQXR0YWNoZWQoZWxlbWVudCkge1xuICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbGVtZW50LnBhcmVudE5vZGUgPyBpc0F0dGFjaGVkKGVsZW1lbnQucGFyZW50Tm9kZSkgOiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSBuZXcgUGFnZVZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHBhZ2UpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhwYWdlLCAnaW5pdCBzaG93IGhpZGUgZGVzdHJveScpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1wYWdlJywgcGFnZSk7XG4gICAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHMocGFnZSwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgc2NvcGUpO1xuXG4gICAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwYWdlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHMocGFnZSk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXBhZ2UnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBwb3N0OiBmdW5jdGlvbiBwb3N0TGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIGZpcmVQYWdlSW5pdEV2ZW50KGVsZW1lbnRbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1wb3BvdmVyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBwb3BvdmVyLlsvZW5dXG4gKiAgW2phXeOBk+OBruODneODg+ODl+OCquODvOODkOODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlaGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicHJlaGlkZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RzaG93XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0c2hvd1wiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdHNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0aGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicG9zdGhpZGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOBk+OBruOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOOBpeOBj+WFqOOBpuOBruOCpOODmeODs+ODiOODquOCueODiuODvOOBjOWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd5YmK6Zmk44GZ44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNQb3BvdmVyJywgZnVuY3Rpb24oJG9uc2VuLCBQb3BvdmVyVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgICAgdmFyIHBvcG92ZXIgPSBuZXcgUG9wb3ZlclZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHBvcG92ZXIpO1xuICAgICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhwb3BvdmVyLCAncHJlc2hvdyBwcmVoaWRlIHBvc3RzaG93IHBvc3RoaWRlIGRlc3Ryb3knKTtcbiAgICAgICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyhwb3BvdmVyLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcG9wb3ZlcicsIHBvcG92ZXIpO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHBvcG92ZXIuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhwb3BvdmVyKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcG9wb3ZlcicsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcblxuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAgIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAgIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG5odHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgLnZhbHVlKCdQb3BvdmVyQW5pbWF0b3InLCBvbnMuX2ludGVybmFsLlBvcG92ZXJBbmltYXRvcilcbiAgLnZhbHVlKCdGYWRlUG9wb3ZlckFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5GYWRlUG9wb3ZlckFuaW1hdG9yKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXB1bGwtaG9va1xuICogQGV4YW1wbGVcbiAqIDxzY3JpcHQ+XG4gKiAgIG9ucy5ib290c3RyYXAoKVxuICpcbiAqICAgLmNvbnRyb2xsZXIoJ015Q29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHRpbWVvdXQpIHtcbiAqICAgICAkc2NvcGUuaXRlbXMgPSBbMywgMiAsMV07XG4gKlxuICogICAgICRzY29wZS5sb2FkID0gZnVuY3Rpb24oJGRvbmUpIHtcbiAqICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICogICAgICAgICAkc2NvcGUuaXRlbXMudW5zaGlmdCgkc2NvcGUuaXRlbXMubGVuZ3RoICsgMSk7XG4gKiAgICAgICAgICRkb25lKCk7XG4gKiAgICAgICB9LCAxMDAwKTtcbiAqICAgICB9O1xuICogICB9KTtcbiAqIDwvc2NyaXB0PlxuICpcbiAqIDxvbnMtcGFnZSBuZy1jb250cm9sbGVyPVwiTXlDb250cm9sbGVyXCI+XG4gKiAgIDxvbnMtcHVsbC1ob29rIHZhcj1cImxvYWRlclwiIG5nLWFjdGlvbj1cImxvYWQoJGRvbmUpXCI+XG4gKiAgICAgPHNwYW4gbmctc3dpdGNoPVwibG9hZGVyLnN0YXRlXCI+XG4gKiAgICAgICA8c3BhbiBuZy1zd2l0Y2gtd2hlbj1cImluaXRpYWxcIj5QdWxsIGRvd24gdG8gcmVmcmVzaDwvc3Bhbj5cbiAqICAgICAgIDxzcGFuIG5nLXN3aXRjaC13aGVuPVwicHJlYWN0aW9uXCI+UmVsZWFzZSB0byByZWZyZXNoPC9zcGFuPlxuICogICAgICAgPHNwYW4gbmctc3dpdGNoLXdoZW49XCJhY3Rpb25cIj5Mb2FkaW5nIGRhdGEuIFBsZWFzZSB3YWl0Li4uPC9zcGFuPlxuICogICAgIDwvc3Bhbj5cbiAqICAgPC9vbnMtcHVsbC1ob29rPlxuICogICA8b25zLWxpc3Q+XG4gKiAgICAgPG9ucy1saXN0LWl0ZW0gbmctcmVwZWF0PVwiaXRlbSBpbiBpdGVtc1wiPlxuICogICAgICAgSXRlbSAje3sgaXRlbSB9fVxuICogICAgIDwvb25zLWxpc3QtaXRlbT5cbiAqICAgPC9vbnMtbGlzdD5cbiAqIDwvb25zLXBhZ2U+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgY29tcG9uZW50LlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBuZy1hY3Rpb25cbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVVzZSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBwYWdlIGlzIHB1bGxlZCBkb3duLiBBIDxjb2RlPiRkb25lPC9jb2RlPiBmdW5jdGlvbiBpcyBhdmFpbGFibGUgdG8gdGVsbCB0aGUgY29tcG9uZW50IHRoYXQgdGhlIGFjdGlvbiBpcyBjb21wbGV0ZWQuWy9lbl1cbiAqICAgW2phXXB1bGwgZG93buOBl+OBn+OBqOOBjeOBruaMr+OCi+iInuOBhOOCkuaMh+WumuOBl+OBvuOBmeOAguOCouOCr+OCt+ODp+ODs+OBjOWujOS6huOBl+OBn+aZguOBq+OBrzxjb2RlPiRkb25lPC9jb2RlPumWouaVsOOCkuWRvOOBs+WHuuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1jaGFuZ2VzdGF0ZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiY2hhbmdlc3RhdGVcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImNoYW5nZXN0YXRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBQdWxsIGhvb2sgZGlyZWN0aXZlLlxuICAgKi9cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNQdWxsSG9vaycsIGZ1bmN0aW9uKCRvbnNlbiwgUHVsbEhvb2tWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICB2YXIgcHVsbEhvb2sgPSBuZXcgUHVsbEhvb2tWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBwdWxsSG9vayk7XG4gICAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHB1bGxIb29rLCAnY2hhbmdlc3RhdGUgZGVzdHJveScpO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtcHVsbC1ob29rJywgcHVsbEhvb2spO1xuXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHB1bGxIb29rLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXB1bGwtaG9vaycsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zcGVlZC1kaWFsXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoZSBzcGVlZCBkaWFsLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgrnjg5Tjg7zjg4njg4DjgqTjgqLjg6vjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLjgZfjgabjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtb3BlblxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwib3BlblwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwib3Blblwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWNsb3NlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJjbG9zZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiY2xvc2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uY2VcbiAqIEBzaWduYXR1cmUgb25jZShldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0J3Mgb25seSB0cmlnZ2VyZWQgb25jZS5bL2VuXVxuICogIFtqYV3kuIDluqbjgaDjgZHlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9mZlxuICogQHNpZ25hdHVyZSBvZmYoZXZlbnROYW1lLCBbbGlzdGVuZXJdKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gSWYgdGhlIGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50IHR5cGUgd2lsbCBiZSByZW1vdmVkLlsvZW5dXG4gKiAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkuWJiumZpOOBl+OBvuOBmeOAguOCguOBl+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOaMh+WumuOBleOCjOOBquOBi+OBo+OBn+WgtOWQiOOBq+OBr+OAgeOBneOBruOCpOODmeODs+ODiOOBq+e0kOS7mOOBhOOBpuOBhOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBjOWFqOOBpuWJiumZpOOBleOCjOOBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25cbiAqIEBzaWduYXR1cmUgb24oZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqDjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOOBjOeZuueBq+OBl+OBn+mam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc1NwZWVkRGlhbCcsIGZ1bmN0aW9uKCRvbnNlbiwgU3BlZWREaWFsVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiBmYWxzZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIHNwZWVkRGlhbCA9IG5ldyBTcGVlZERpYWxWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGVlZC1kaWFsJywgc3BlZWREaWFsKTtcblxuICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnMoc3BlZWREaWFsLCAnb3BlbiBjbG9zZScpO1xuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzcGVlZERpYWwpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3BlZWREaWFsLl9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGVlZC1kaWFsJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuXG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZmFjdG9yeSgnU3BsaXR0ZXJDb250ZW50JywgZnVuY3Rpb24oJG9uc2VuLCAkY29tcGlsZSkge1xuXG4gICAgdmFyIFNwbGl0dGVyQ29udGVudCA9IENsYXNzLmV4dGVuZCh7XG5cbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgICAgICB0aGlzLmxvYWQgPSB0aGlzLl9lbGVtZW50WzBdLmxvYWQuYmluZCh0aGlzLl9lbGVtZW50WzBdKTtcbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IHRoaXMubG9hZCA9IHRoaXMuX3BhZ2VTY29wZSA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKFNwbGl0dGVyQ29udGVudCk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChTcGxpdHRlckNvbnRlbnQsIFsncGFnZSddKTtcblxuICAgIHJldHVybiBTcGxpdHRlckNvbnRlbnQ7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxMy0yMDE1IEFTSUFMIENPUlBPUkFUSU9OXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbiovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5mYWN0b3J5KCdTcGxpdHRlclNpZGUnLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlKSB7XG5cbiAgICB2YXIgU3BsaXR0ZXJTaWRlID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzID0gJG9uc2VuLmRlcml2ZU1ldGhvZHModGhpcywgdGhpcy5fZWxlbWVudFswXSwgW1xuICAgICAgICAgICdvcGVuJywgJ2Nsb3NlJywgJ3RvZ2dsZScsICdsb2FkJ1xuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nRXZlbnRzID0gJG9uc2VuLmRlcml2ZUV2ZW50cyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ21vZGVjaGFuZ2UnLCAncHJlb3BlbicsICdwcmVjbG9zZScsICdwb3N0b3BlbicsICdwb3N0Y2xvc2UnXG4gICAgICAgIF0sIGRldGFpbCA9PiBkZXRhaWwuc2lkZSA/IGFuZ3VsYXIuZXh0ZW5kKGRldGFpbCwge3NpZGU6IHRoaXN9KSA6IGRldGFpbCk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIHRoaXMuX2Rlc3Ryb3kuYmluZCh0aGlzKSk7XG4gICAgICB9LFxuXG4gICAgICBfZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdNZXRob2RzKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fc2NvcGUgPSB0aGlzLl9hdHRycyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNaWNyb0V2ZW50Lm1peGluKFNwbGl0dGVyU2lkZSk7XG4gICAgJG9uc2VuLmRlcml2ZVByb3BlcnRpZXNGcm9tRWxlbWVudChTcGxpdHRlclNpZGUsIFsncGFnZScsICdtb2RlJywgJ2lzT3BlbiddKTtcblxuICAgIHJldHVybiBTcGxpdHRlclNpZGU7XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNwbGl0dGVyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgc3BsaXQgdmlldy5bL2VuXVxuICogICBbamFd44GT44Gu44K544OX44Oq44OD44OI44OT44Ol44O844Kz44Oz44Od44O844ON44Oz44OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlcicsIGZ1bmN0aW9uKCRjb21waWxlLCBTcGxpdHRlciwgJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZTogdHJ1ZSxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICB2YXIgc3BsaXR0ZXIgPSBuZXcgU3BsaXR0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzcGxpdHRlcik7XG4gICAgICAgICAgJG9uc2VuLnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhzcGxpdHRlciwgJ2Rlc3Ryb3knKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyJywgc3BsaXR0ZXIpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3BsaXR0ZXIuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zd2l0Y2hcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBzd2l0Y2guWy9lbl1cbiAqICAgW2phXUphdmFTY3JpcHTjgYvjgonlj4LnhafjgZnjgovjgZ/jgoHjga7lpInmlbDlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTd2l0Y2gnLCBmdW5jdGlvbigkb25zZW4sIFN3aXRjaFZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIGlmIChhdHRycy5uZ0NvbnRyb2xsZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgZWxlbWVudCBjYW5cXCd0IGFjY2VwdCBuZy1jb250cm9sbGVyIGRpcmVjdGl2ZS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzd2l0Y2hWaWV3ID0gbmV3IFN3aXRjaFZpZXcoZWxlbWVudCwgc2NvcGUsIGF0dHJzKTtcbiAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHN3aXRjaFZpZXcsIGVsZW1lbnQpO1xuXG4gICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCBzd2l0Y2hWaWV3KTtcbiAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3dpdGNoJywgc3dpdGNoVmlldyk7XG5cbiAgICAgICAgJG9uc2VuLmNsZWFuZXIub25EZXN0cm95KHNjb3BlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzd2l0Y2hWaWV3Ll9ldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyhzd2l0Y2hWaWV3KTtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zd2l0Y2gnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICRvbnNlbi5jbGVhckNvbXBvbmVudCh7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgYXR0cnM6IGF0dHJzXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZWxlbWVudCA9IGF0dHJzID0gc2NvcGUgPSBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS52YWx1ZSgnVGFiYmFyTm9uZUFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5UYWJiYXJOb25lQW5pbWF0b3IpO1xuICBtb2R1bGUudmFsdWUoJ1RhYmJhckZhZGVBbmltYXRvcicsIG9ucy5faW50ZXJuYWwuVGFiYmFyRmFkZUFuaW1hdG9yKTtcbiAgbW9kdWxlLnZhbHVlKCdUYWJiYXJTbGlkZUFuaW1hdG9yJywgb25zLl9pbnRlcm5hbC5UYWJiYXJTbGlkZUFuaW1hdG9yKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnVGFiYmFyVmlldycsIGZ1bmN0aW9uKCRvbnNlbikge1xuICAgIHZhciBUYWJiYXJWaWV3ID0gQ2xhc3MuZXh0ZW5kKHtcblxuICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGlmIChlbGVtZW50WzBdLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdvbnMtdGFiYmFyJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXCJlbGVtZW50XCIgcGFyYW1ldGVyIG11c3QgYmUgYSBcIm9ucy10YWJiYXJcIiBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gYXR0cnM7XG4gICAgICAgIHRoaXMuX2xhc3RQYWdlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xhc3RQYWdlU2NvcGUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3Njb3BlLiRvbignJGRlc3Ryb3knLCB0aGlzLl9kZXN0cm95LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFyRGVyaXZpbmdFdmVudHMgPSAkb25zZW4uZGVyaXZlRXZlbnRzKHRoaXMsIGVsZW1lbnRbMF0sIFtcbiAgICAgICAgICAncmVhY3RpdmUnLCAncG9zdGNoYW5nZScsICdwcmVjaGFuZ2UnLCAnaW5pdCcsICdzaG93JywgJ2hpZGUnLCAnZGVzdHJveSdcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ01ldGhvZHMgPSAkb25zZW4uZGVyaXZlTWV0aG9kcyh0aGlzLCBlbGVtZW50WzBdLCBbXG4gICAgICAgICAgJ3NldEFjdGl2ZVRhYicsXG4gICAgICAgICAgJ3NldFRhYmJhclZpc2liaWxpdHknLFxuICAgICAgICAgICdnZXRBY3RpdmVUYWJJbmRleCcsXG4gICAgICAgICAgJ2xvYWRQYWdlJ1xuICAgICAgICBdKTtcbiAgICAgIH0sXG5cbiAgICAgIF9kZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXJEZXJpdmluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLl9jbGVhckRlcml2aW5nTWV0aG9kcygpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9zY29wZSA9IHRoaXMuX2F0dHJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBNaWNyb0V2ZW50Lm1peGluKFRhYmJhclZpZXcpO1xuXG4gICAgVGFiYmFyVmlldy5yZWdpc3RlckFuaW1hdG9yID0gZnVuY3Rpb24obmFtZSwgQW5pbWF0b3IpIHtcbiAgICAgIHJldHVybiB3aW5kb3cub25zLlRhYmJhckVsZW1lbnQucmVnaXN0ZXJBbmltYXRvcihuYW1lLCBBbmltYXRvcik7XG4gICAgfTtcblxuICAgIHJldHVybiBUYWJiYXJWaWV3O1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXRvYXN0XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyB0b2FzdCBkaWFsb2cuWy9lbl1cbiAqICBbamFd44GT44Gu44OI44O844K544OI44KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZXNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZXNob3dcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInByZXNob3dcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcG9zdHNob3dcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0c2hvd1wi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RoaWRlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0aGlkZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGhpZGVcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1kZXN0cm95XG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GXbGlzdGVuZXLjg5Hjg6njg6Hjg7zjgr/jgYzmjIflrprjgZXjgozjgarjgYvjgaPjgZ/loLTlkIjjgIHjgZ3jga7jgqTjg5njg7Pjg4jjga7jg6rjgrnjg4rjg7zjgYzlhajjgabliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOBrumWouaVsOOCquODluOCuOOCp+OCr+ODiOOCkua4oeOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIFRvYXN0IGRpcmVjdGl2ZS5cbiAgICovXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zVG9hc3QnLCBmdW5jdGlvbigkb25zZW4sIFRvYXN0Vmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJlOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHZhciB0b2FzdCA9IG5ldyBUb2FzdFZpZXcoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICAgJG9uc2VuLmRlY2xhcmVWYXJBdHRyaWJ1dGUoYXR0cnMsIHRvYXN0KTtcbiAgICAgICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModG9hc3QsICdwcmVzaG93IHByZWhpZGUgcG9zdHNob3cgcG9zdGhpZGUgZGVzdHJveScpO1xuICAgICAgICAgICAgJG9uc2VuLmFkZE1vZGlmaWVyTWV0aG9kc0ZvckN1c3RvbUVsZW1lbnRzKHRvYXN0LCBlbGVtZW50KTtcblxuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtdG9hc3QnLCB0b2FzdCk7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHNjb3BlKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB0b2FzdC5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKHRvYXN0KTtcbiAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtdG9hc3QnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0FjdGlvblNoZWV0QnV0dG9uJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtYWN0aW9uLXNoZWV0LWJ1dHRvbid9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0JhY2tCdXR0b24nLCBmdW5jdGlvbigkb25zZW4sICRjb21waWxlLCBHZW5lcmljVmlldywgQ29tcG9uZW50Q2xlYW5lcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlciwgdHJhbnNjbHVkZSkge1xuICAgICAgICAgICAgdmFyIGJhY2tCdXR0b24gPSBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHtcbiAgICAgICAgICAgICAgdmlld0tleTogJ29ucy1iYWNrLWJ1dHRvbidcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoYXR0cnMubmdDbGljaykge1xuICAgICAgICAgICAgICBlbGVtZW50WzBdLm9uQ2xpY2sgPSBhbmd1bGFyLm5vb3A7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgYmFja0J1dHRvbi5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAkb25zZW4ucmVtb3ZlTW9kaWZpZXJNZXRob2RzKGJhY2tCdXR0b24pO1xuICAgICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBDb21wb25lbnRDbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveVNjb3BlKHNjb3BlKTtcbiAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95QXR0cmlidXRlcyhhdHRycyk7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0JvdHRvbVRvb2xiYXInLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiB7XG4gICAgICAgIHByZTogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7XG4gICAgICAgICAgICB2aWV3S2V5OiAnb25zLWJvdHRvbVRvb2xiYXInXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG5cbiIsIlxuLyoqXG4gKiBAZWxlbWVudCBvbnMtYnV0dG9uXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0J1dHRvbicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgYnV0dG9uID0gR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7XG4gICAgICAgICAgdmlld0tleTogJ29ucy1idXR0b24nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShidXR0b24sICdkaXNhYmxlZCcsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50WzBdLmRpc2FibGVkO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLl9lbGVtZW50WzBdLmRpc2FibGVkID0gdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxuXG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0NhcmQnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1jYXJkJ30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1jaGVja2JveFxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNDaGVja2JveCcsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBsZXQgZWwgPSBlbGVtZW50WzBdO1xuXG4gICAgICAgIGNvbnN0IG9uQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ24oc2NvcGUsIGVsLmNoZWNrZWQpO1xuICAgICAgICAgIGF0dHJzLm5nQ2hhbmdlICYmIHNjb3BlLiRldmFsKGF0dHJzLm5nQ2hhbmdlKTtcbiAgICAgICAgICBzY29wZS4kcGFyZW50LiRldmFsQXN5bmMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ01vZGVsLCB2YWx1ZSA9PiBlbC5jaGVja2VkID0gdmFsdWUpO1xuICAgICAgICAgIGVsZW1lbnQub24oJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IGVsID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0R1bW15Rm9ySW5pdCcsIGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcbiAgICB2YXIgaXNSZWFkeSA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgbGluazoge1xuICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgIGlmICghaXNSZWFkeSkge1xuICAgICAgICAgICAgaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRvbnMtcmVhZHknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIEVWRU5UUyA9XG4gICAgKCdkcmFnIGRyYWdsZWZ0IGRyYWdyaWdodCBkcmFndXAgZHJhZ2Rvd24gaG9sZCByZWxlYXNlIHN3aXBlIHN3aXBlbGVmdCBzd2lwZXJpZ2h0ICcgK1xuICAgICAgJ3N3aXBldXAgc3dpcGVkb3duIHRhcCBkb3VibGV0YXAgdG91Y2ggdHJhbnNmb3JtIHBpbmNoIHBpbmNoaW4gcGluY2hvdXQgcm90YXRlJykuc3BsaXQoLyArLyk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNHZXN0dXJlRGV0ZWN0b3InLCBmdW5jdGlvbigkb25zZW4pIHtcblxuICAgIHZhciBzY29wZURlZiA9IEVWRU5UUy5yZWR1Y2UoZnVuY3Rpb24oZGljdCwgbmFtZSkge1xuICAgICAgZGljdFsnbmcnICsgdGl0bGl6ZShuYW1lKV0gPSAnJic7XG4gICAgICByZXR1cm4gZGljdDtcbiAgICB9LCB7fSk7XG5cbiAgICBmdW5jdGlvbiB0aXRsaXplKHN0cikge1xuICAgICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiBzY29wZURlZixcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIF8sIHRyYW5zY2x1ZGUpIHtcblxuICAgICAgICAgIHRyYW5zY2x1ZGUoc2NvcGUuJHBhcmVudCwgZnVuY3Rpb24oY2xvbmVkKSB7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZChjbG9uZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGF0dHIgPSAnbmcnICsgdGl0bGl6ZShldmVudC50eXBlKTtcblxuICAgICAgICAgICAgaWYgKGF0dHIgaW4gc2NvcGVEZWYpIHtcbiAgICAgICAgICAgICAgc2NvcGVbYXR0cl0oeyRldmVudDogZXZlbnR9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGdlc3R1cmVEZXRlY3RvcjtcblxuICAgICAgICAgIHNldEltbWVkaWF0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3RvciA9IGVsZW1lbnRbMF0uX2dlc3R1cmVEZXRlY3RvcjtcbiAgICAgICAgICAgIGdlc3R1cmVEZXRlY3Rvci5vbihFVkVOVFMuam9pbignICcpLCBoYW5kbGVyKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBnZXN0dXJlRGV0ZWN0b3Iub2ZmKEVWRU5UUy5qb2luKCcgJyksIGhhbmRsZXIpO1xuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ2VzdHVyZURldGVjdG9yLmVsZW1lbnQgPSBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IG51bGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuXG4iLCJcbi8qKlxuICogQGVsZW1lbnQgb25zLWljb25cbiAqL1xuXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zSWNvbicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICBpZiAoYXR0cnMuaWNvbi5pbmRleE9mKCd7eycpICE9PSAtMSkge1xuICAgICAgICAgIGF0dHJzLiRvYnNlcnZlKCdpY29uJywgKCkgPT4ge1xuICAgICAgICAgICAgc2V0SW1tZWRpYXRlKCgpID0+IGVsZW1lbnRbMF0uX3VwZGF0ZSgpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSA9PiB7XG4gICAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7XG4gICAgICAgICAgICB2aWV3S2V5OiAnb25zLWljb24nXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuXG4gICAgICB9XG5cbiAgICB9O1xuICB9KTtcblxufSkoKTtcblxuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtaWYtb3JpZW50YXRpb25cbiAqIEBjYXRlZ29yeSBjb25kaXRpb25hbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1Db25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gc2NyZWVuIG9yaWVudGF0aW9uLiBWYWxpZCB2YWx1ZXMgYXJlIHBvcnRyYWl0IGFuZCBsYW5kc2NhcGUuIERpZmZlcmVudCBmcm9tIG90aGVyIGNvbXBvbmVudHMsIHRoaXMgY29tcG9uZW50IGlzIHVzZWQgYXMgYXR0cmlidXRlIGluIGFueSBlbGVtZW50LlsvZW5dXG4gKiAgIFtqYV3nlLvpnaLjga7lkJHjgY3jgavlv5zjgZjjgabjgrPjg7Pjg4bjg7Pjg4Tjga7liLblvqHjgpLooYzjgYTjgb7jgZnjgIJwb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBp+OBjeOBvuOBmeOAguOBmeOBueOBpuOBruimgee0oOOBruWxnuaAp+OBq+S9v+eUqOOBp+OBjeOBvuOBmeOAglsvamFdXG4gKiBAc2VlYWxzbyBvbnMtaWYtcGxhdGZvcm0gW2VuXW9ucy1pZi1wbGF0Zm9ybSBjb21wb25lbnRbL2VuXVtqYV1vbnMtaWYtcGxhdGZvcm3jgrPjg7Pjg53jg7zjg43jg7Pjg4hbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWlmLW9yaWVudGF0aW9uPVwicG9ydHJhaXRcIj5cbiAqICAgPHA+VGhpcyB3aWxsIG9ubHkgYmUgdmlzaWJsZSBpbiBwb3J0cmFpdCBtb2RlLjwvcD5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaWYtb3JpZW50YXRpb25cbiAqIEBpbml0b25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRWl0aGVyIFwicG9ydHJhaXRcIiBvciBcImxhbmRzY2FwZVwiLlsvZW5dXG4gKiAgIFtqYV1wb3J0cmFpdOOCguOBl+OBj+OBr2xhbmRzY2FwZeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zSWZPcmllbnRhdGlvbicsIGZ1bmN0aW9uKCRvbnNlbiwgJG9uc0dsb2JhbCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG5cbiAgICAgIC8vIE5PVEU6IFRoaXMgZWxlbWVudCBtdXN0IGNvZXhpc3RzIHdpdGggbmctY29udHJvbGxlci5cbiAgICAgIC8vIERvIG5vdCB1c2UgaXNvbGF0ZWQgc2NvcGUgYW5kIHRlbXBsYXRlJ3MgbmctdHJhbnNjbHVkZS5cbiAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ29uc0lmT3JpZW50YXRpb24nLCB1cGRhdGUpO1xuICAgICAgICAgICRvbnNHbG9iYWwub3JpZW50YXRpb24ub24oJ2NoYW5nZScsIHVwZGF0ZSk7XG5cbiAgICAgICAgICB1cGRhdGUoKTtcblxuICAgICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkb25zR2xvYmFsLm9yaWVudGF0aW9uLm9mZignY2hhbmdlJywgdXBkYXRlKTtcblxuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgICAgdmFyIHVzZXJPcmllbnRhdGlvbiA9ICgnJyArIGF0dHJzLm9uc0lmT3JpZW50YXRpb24pLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB2YXIgb3JpZW50YXRpb24gPSBnZXRMYW5kc2NhcGVPclBvcnRyYWl0KCk7XG5cbiAgICAgICAgICAgIGlmICh1c2VyT3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgfHwgdXNlck9yaWVudGF0aW9uID09PSAnbGFuZHNjYXBlJykge1xuICAgICAgICAgICAgICBpZiAodXNlck9yaWVudGF0aW9uID09PSBvcmllbnRhdGlvbikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJycpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGdldExhbmRzY2FwZU9yUG9ydHJhaXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gJG9uc0dsb2JhbC5vcmllbnRhdGlvbi5pc1BvcnRyYWl0KCkgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcblxuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtaWYtcGxhdGZvcm1cbiAqIEBjYXRlZ29yeSBjb25kaXRpb25hbFxuICogQGRlc2NyaXB0aW9uXG4gKiAgICBbZW5dQ29uZGl0aW9uYWxseSBkaXNwbGF5IGNvbnRlbnQgZGVwZW5kaW5nIG9uIHRoZSBwbGF0Zm9ybSAvIGJyb3dzZXIuIFZhbGlkIHZhbHVlcyBhcmUgXCJvcGVyYVwiLCBcImZpcmVmb3hcIiwgXCJzYWZhcmlcIiwgXCJjaHJvbWVcIiwgXCJpZVwiLCBcImVkZ2VcIiwgXCJhbmRyb2lkXCIsIFwiYmxhY2tiZXJyeVwiLCBcImlvc1wiIGFuZCBcIndwXCIuWy9lbl1cbiAqICAgIFtqYV3jg5fjg6njg4Pjg4jjg5Xjgqnjg7zjg6DjgoTjg5bjg6njgqbjgrbjg7zjgavlv5zjgZjjgabjgrPjg7Pjg4bjg7Pjg4Tjga7liLblvqHjgpLjgYrjgZPjgarjgYTjgb7jgZnjgIJvcGVyYSwgZmlyZWZveCwgc2FmYXJpLCBjaHJvbWUsIGllLCBlZGdlLCBhbmRyb2lkLCBibGFja2JlcnJ5LCBpb3MsIHdw44Gu44GE44Ga44KM44GL44Gu5YCk44KS56m655m95Yy65YiH44KK44Gn6KSH5pWw5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqIEBzZWVhbHNvIG9ucy1pZi1vcmllbnRhdGlvbiBbZW5db25zLWlmLW9yaWVudGF0aW9uIGNvbXBvbmVudFsvZW5dW2phXW9ucy1pZi1vcmllbnRhdGlvbuOCs+ODs+ODneODvOODjeODs+ODiFsvamFdXG4gKiBAZXhhbXBsZVxuICogPGRpdiBvbnMtaWYtcGxhdGZvcm09XCJhbmRyb2lkXCI+XG4gKiAgIC4uLlxuICogPC9kaXY+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1pZi1wbGF0Zm9ybVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBpbml0b25seVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1PbmUgb3IgbXVsdGlwbGUgc3BhY2Ugc2VwYXJhdGVkIHZhbHVlczogXCJvcGVyYVwiLCBcImZpcmVmb3hcIiwgXCJzYWZhcmlcIiwgXCJjaHJvbWVcIiwgXCJpZVwiLCBcImVkZ2VcIiwgXCJhbmRyb2lkXCIsIFwiYmxhY2tiZXJyeVwiLCBcImlvc1wiIG9yIFwid3BcIi5bL2VuXVxuICogICBbamFdXCJvcGVyYVwiLCBcImZpcmVmb3hcIiwgXCJzYWZhcmlcIiwgXCJjaHJvbWVcIiwgXCJpZVwiLCBcImVkZ2VcIiwgXCJhbmRyb2lkXCIsIFwiYmxhY2tiZXJyeVwiLCBcImlvc1wiLCBcIndwXCLjga7jgYTjgZrjgozjgYvnqbrnmb3ljLrliIfjgorjgafopIfmlbDmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNJZlBsYXRmb3JtJywgZnVuY3Rpb24oJG9uc2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgIHZhciBwbGF0Zm9ybSA9IGdldFBsYXRmb3JtU3RyaW5nKCk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIGF0dHJzLiRvYnNlcnZlKCdvbnNJZlBsYXRmb3JtJywgZnVuY3Rpb24odXNlclBsYXRmb3JtKSB7XG4gICAgICAgICAgICBpZiAodXNlclBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdXBkYXRlKCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJG9uc2VuLmNsZWFyQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudCA9IHNjb3BlID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgICAgdmFyIHVzZXJQbGF0Zm9ybXMgPSBhdHRycy5vbnNJZlBsYXRmb3JtLnRvTG93ZXJDYXNlKCkudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgICAgICBpZiAodXNlclBsYXRmb3Jtcy5pbmRleE9mKHBsYXRmb3JtLnRvTG93ZXJDYXNlKCkpID49IDApIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0UGxhdGZvcm1TdHJpbmcoKSB7XG5cbiAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKSkge1xuICAgICAgICAgICAgcmV0dXJuICdhbmRyb2lkJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSkpIHx8IChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9SSU0gVGFibGV0IE9TL2kpKSB8fCAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQkIxMC9pKSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnYmxhY2tiZXJyeSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQaG9uZXxpUGFkfGlQb2QvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnaW9zJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvV2luZG93cyBQaG9uZXxJRU1vYmlsZXxXUERlc2t0b3AvaSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnd3AnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIE9wZXJhIDguMCsgKFVBIGRldGVjdGlvbiB0byBkZXRlY3QgQmxpbmsvdjgtcG93ZXJlZCBPcGVyYSlcbiAgICAgICAgICB2YXIgaXNPcGVyYSA9ICEhd2luZG93Lm9wZXJhIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIE9QUi8nKSA+PSAwO1xuICAgICAgICAgIGlmIChpc09wZXJhKSB7XG4gICAgICAgICAgICByZXR1cm4gJ29wZXJhJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNGaXJlZm94ID0gdHlwZW9mIEluc3RhbGxUcmlnZ2VyICE9PSAndW5kZWZpbmVkJzsgICAvLyBGaXJlZm94IDEuMCtcbiAgICAgICAgICBpZiAoaXNGaXJlZm94KSB7XG4gICAgICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc1NhZmFyaSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aW5kb3cuSFRNTEVsZW1lbnQpLmluZGV4T2YoJ0NvbnN0cnVjdG9yJykgPiAwO1xuICAgICAgICAgIC8vIEF0IGxlYXN0IFNhZmFyaSAzKzogXCJbb2JqZWN0IEhUTUxFbGVtZW50Q29uc3RydWN0b3JdXCJcbiAgICAgICAgICBpZiAoaXNTYWZhcmkpIHtcbiAgICAgICAgICAgIHJldHVybiAnc2FmYXJpJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNFZGdlID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCcgRWRnZS8nKSA+PSAwO1xuICAgICAgICAgIGlmIChpc0VkZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiAnZWRnZSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzQ2hyb21lID0gISF3aW5kb3cuY2hyb21lICYmICFpc09wZXJhICYmICFpc0VkZ2U7IC8vIENocm9tZSAxK1xuICAgICAgICAgIGlmIChpc0Nocm9tZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpc0lFID0gLypAY2Nfb24hQCovZmFsc2UgfHwgISFkb2N1bWVudC5kb2N1bWVudE1vZGU7IC8vIEF0IGxlYXN0IElFNlxuICAgICAgICAgIGlmIChpc0lFKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2llJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtaW5wdXRcbiAqL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zSW5wdXQnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudFswXTtcblxuICAgICAgICBjb25zdCBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICAgICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ24oc2NvcGUsIGVsLnR5cGUgPT09ICdudW1iZXInID8gTnVtYmVyKGVsLnZhbHVlKSA6IGVsLnZhbHVlKTtcbiAgICAgICAgICBhdHRycy5uZ0NoYW5nZSAmJiBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMubmdNb2RlbCwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gZWwudmFsdWUpIHtcbiAgICAgICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsZW1lbnQub24oJ2lucHV0Jywgb25JbnB1dClcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2lucHV0Jywgb25JbnB1dClcbiAgICAgICAgICBzY29wZSA9IGVsZW1lbnQgPSBhdHRycyA9IGVsID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMta2V5Ym9hcmQtYWN0aXZlXG4gKiBAY2F0ZWdvcnkgZm9ybVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1cbiAqICAgICBDb25kaXRpb25hbGx5IGRpc3BsYXkgY29udGVudCBkZXBlbmRpbmcgb24gaWYgdGhlIHNvZnR3YXJlIGtleWJvYXJkIGlzIHZpc2libGUgb3IgaGlkZGVuLlxuICogICAgIFRoaXMgY29tcG9uZW50IHJlcXVpcmVzIGNvcmRvdmEgYW5kIHRoYXQgdGhlIGNvbS5pb25pYy5rZXlib2FyZCBwbHVnaW4gaXMgaW5zdGFsbGVkLlxuICogICBbL2VuXVxuICogICBbamFdXG4gKiAgICAg44K944OV44OI44Km44Kn44Ki44Kt44O844Oc44O844OJ44GM6KGo56S644GV44KM44Gm44GE44KL44GL44Gp44GG44GL44Gn44CB44Kz44Oz44OG44Oz44OE44KS6KGo56S644GZ44KL44GL44Gp44GG44GL44KS5YiH44KK5pu/44GI44KL44GT44Go44GM5Ye65p2l44G+44GZ44CCXG4gKiAgICAg44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI44Gv44CBQ29yZG92YeOChGNvbS5pb25pYy5rZXlib2FyZOODl+ODqeOCsOOCpOODs+OCkuW/heimgeOBqOOBl+OBvuOBmeOAglxuICogICBbL2phXVxuICogQGV4YW1wbGVcbiAqIDxkaXYgb25zLWtleWJvYXJkLWFjdGl2ZT5cbiAqICAgVGhpcyB3aWxsIG9ubHkgYmUgZGlzcGxheWVkIGlmIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBvcGVuLlxuICogPC9kaXY+XG4gKiA8ZGl2IG9ucy1rZXlib2FyZC1pbmFjdGl2ZT5cbiAqICAgVGhlcmUgaXMgYWxzbyBhIGNvbXBvbmVudCB0aGF0IGRvZXMgdGhlIG9wcG9zaXRlLlxuICogPC9kaXY+XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1rZXlib2FyZC1hY3RpdmVcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIGNvbnRlbnQgb2YgdGFncyB3aXRoIHRoaXMgYXR0cmlidXRlIHdpbGwgYmUgdmlzaWJsZSB3aGVuIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBvcGVuLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7lsZ7mgKfjgYzjgaTjgYTjgZ/opoHntKDjga/jgIHjgr3jg5Xjg4jjgqbjgqfjgqLjgq3jg7zjg5zjg7zjg4njgYzooajnpLrjgZXjgozjgZ/mmYLjgavliJ3jgoHjgabooajnpLrjgZXjgozjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMta2V5Ym9hcmQtaW5hY3RpdmVcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dVGhlIGNvbnRlbnQgb2YgdGFncyB3aXRoIHRoaXMgYXR0cmlidXRlIHdpbGwgYmUgdmlzaWJsZSB3aGVuIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBoaWRkZW4uWy9lbl1cbiAqICAgW2phXeOBk+OBruWxnuaAp+OBjOOBpOOBhOOBn+imgee0oOOBr+OAgeOCveODleODiOOCpuOCp+OCouOCreODvOODnOODvOODieOBjOmaoOOCjOOBpuOBhOOCi+aZguOBruOBv+ihqOekuuOBleOCjOOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpO1xuXG4gIHZhciBjb21waWxlRnVuY3Rpb24gPSBmdW5jdGlvbihzaG93LCAkb25zZW4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgZGlzcFNob3cgPSBzaG93ID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgICAgICAgIGRpc3BIaWRlID0gc2hvdyA/ICdub25lJyA6ICdibG9jayc7XG5cbiAgICAgICAgdmFyIG9uU2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgZGlzcFNob3cpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvbkhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LmNzcygnZGlzcGxheScsIGRpc3BIaWRlKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgb25Jbml0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLnZpc2libGUpIHtcbiAgICAgICAgICAgIG9uU2hvdygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub24oJ3Nob3cnLCBvblNob3cpO1xuICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vbignaGlkZScsIG9uSGlkZSk7XG4gICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9uKCdpbml0Jywgb25Jbml0KTtcblxuICAgICAgICBpZiAob25zLnNvZnR3YXJlS2V5Ym9hcmQuX3Zpc2libGUpIHtcbiAgICAgICAgICBvblNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvbkhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRvbnNlbi5jbGVhbmVyLm9uRGVzdHJveShzY29wZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgb25zLnNvZnR3YXJlS2V5Ym9hcmQub2ZmKCdzaG93Jywgb25TaG93KTtcbiAgICAgICAgICBvbnMuc29mdHdhcmVLZXlib2FyZC5vZmYoJ2hpZGUnLCBvbkhpZGUpO1xuICAgICAgICAgIG9ucy5zb2Z0d2FyZUtleWJvYXJkLm9mZignaW5pdCcsIG9uSW5pdCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVsZW1lbnQgPSBzY29wZSA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zS2V5Ym9hcmRBY3RpdmUnLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBjb21waWxlOiBjb21waWxlRnVuY3Rpb24odHJ1ZSwgJG9uc2VuKVxuICAgIH07XG4gIH0pO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uc0tleWJvYXJkSW5hY3RpdmUnLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBjb21waWxlOiBjb21waWxlRnVuY3Rpb24oZmFsc2UsICRvbnNlbilcbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3QnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0J30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xpc3RIZWFkZXInLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1saXN0LWhlYWRlcid9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNMaXN0SXRlbScsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLWxpc3QtaXRlbSd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zTGlzdFRpdGxlJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIEdlbmVyaWNWaWV3LnJlZ2lzdGVyKHNjb3BlLCBlbGVtZW50LCBhdHRycywge3ZpZXdLZXk6ICdvbnMtbGlzdC10aXRsZSd9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtbG9hZGluZy1wbGFjZWhvbGRlclxuICogQGNhdGVnb3J5IHV0aWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dRGlzcGxheSBhIHBsYWNlaG9sZGVyIHdoaWxlIHRoZSBjb250ZW50IGlzIGxvYWRpbmcuWy9lbl1cbiAqICAgW2phXU9uc2VuIFVJ44GM6Kqt44G/6L6844G+44KM44KL44G+44Gn44Gr6KGo56S644GZ44KL44OX44Os44O844K544Ob44Or44OA44O844KS6KGo54++44GX44G+44GZ44CCWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8ZGl2IG9ucy1sb2FkaW5nLXBsYWNlaG9sZGVyPVwicGFnZS5odG1sXCI+XG4gKiAgIExvYWRpbmcuLi5cbiAqIDwvZGl2PlxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtbG9hZGluZy1wbGFjZWhvbGRlclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1UaGUgdXJsIG9mIHRoZSBwYWdlIHRvIGxvYWQuWy9lbl1cbiAqICAgW2phXeiqreOBv+i+vOOCgOODmuODvOOCuOOBrlVSTOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc0xvYWRpbmdQbGFjZWhvbGRlcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGlmIChhdHRycy5vbnNMb2FkaW5nUGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICBvbnMuX3Jlc29sdmVMb2FkaW5nUGxhY2Vob2xkZXIoZWxlbWVudFswXSwgYXR0cnMub25zTG9hZGluZ1BsYWNlaG9sZGVyLCBmdW5jdGlvbihjb250ZW50RWxlbWVudCwgZG9uZSkge1xuICAgICAgICAgICAgb25zLmNvbXBpbGUoY29udGVudEVsZW1lbnQpO1xuICAgICAgICAgICAgc2NvcGUuJGV2YWxBc3luYyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIiLCIvKipcbiAqIEBlbGVtZW50IG9ucy1yYWRpb1xuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNSYWRpbycsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBsZXQgZWwgPSBlbGVtZW50WzBdO1xuXG4gICAgICAgIGNvbnN0IG9uQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ24oc2NvcGUsIGVsLnZhbHVlKTtcbiAgICAgICAgICBhdHRycy5uZ0NoYW5nZSAmJiBzY29wZS4kZXZhbChhdHRycy5uZ0NoYW5nZSk7XG4gICAgICAgICAgc2NvcGUuJHBhcmVudC4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMubmdNb2RlbCwgdmFsdWUgPT4gZWwuY2hlY2tlZCA9IHZhbHVlID09PSBlbC52YWx1ZSk7XG4gICAgICAgICAgZWxlbWVudC5vbignY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICBlbGVtZW50Lm9mZignY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gZWwgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zUmFuZ2UnLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICBjb25zdCBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNldCA9ICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ247XG5cbiAgICAgICAgICBzZXQoc2NvcGUsIGVsZW1lbnRbMF0udmFsdWUpO1xuICAgICAgICAgIGlmIChhdHRycy5uZ0NoYW5nZSkge1xuICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzY29wZS4kcGFyZW50LiRldmFsQXN5bmMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ01vZGVsLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnRbMF0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsZW1lbnQub24oJ2lucHV0Jywgb25JbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQub2ZmKCdpbnB1dCcsIG9uSW5wdXQpO1xuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNSaXBwbGUnLCBmdW5jdGlvbigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1yaXBwbGUnfSk7XG4gICAgICAgICRvbnNlbi5maXJlQ29tcG9uZW50RXZlbnQoZWxlbWVudFswXSwgJ2luaXQnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zY29wZVxuICogQGNhdGVnb3J5IHV0aWxcbiAqIEBkZXNjcmlwdGlvblxuICogICBbZW5dQWxsIGNoaWxkIGVsZW1lbnRzIHVzaW5nIHRoZSBcInZhclwiIGF0dHJpYnV0ZSB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoZSBzY29wZSBvZiB0aGlzIGVsZW1lbnQuWy9lbl1cbiAqICAgW2phXVwidmFyXCLlsZ7mgKfjgpLkvb/jgaPjgabjgYTjgovlhajjgabjga7lrZDopoHntKDjga52aWV344Kq44OW44K444Kn44Kv44OI44Gv44CB44GT44Gu6KaB57Sg44GuQW5ndWxhckpT44K544Kz44O844OX44Gr6L+95Yqg44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBleGFtcGxlXG4gKiA8b25zLWxpc3Q+XG4gKiAgIDxvbnMtbGlzdC1pdGVtIG9ucy1zY29wZSBuZy1yZXBlYXQ9XCJpdGVtIGluIGl0ZW1zXCI+XG4gKiAgICAgPG9ucy1jYXJvdXNlbCB2YXI9XCJjYXJvdXNlbFwiPlxuICogICAgICAgPG9ucy1jYXJvdXNlbC1pdGVtIG5nLWNsaWNrPVwiY2Fyb3VzZWwubmV4dCgpXCI+XG4gKiAgICAgICAgIHt7IGl0ZW0gfX1cbiAqICAgICAgIDwvb25zLWNhcm91c2VsLWl0ZW0+XG4gKiAgICAgICA8L29ucy1jYXJvdXNlbC1pdGVtIG5nLWNsaWNrPVwiY2Fyb3VzZWwucHJldigpXCI+XG4gKiAgICAgICAgIC4uLlxuICogICAgICAgPC9vbnMtY2Fyb3VzZWwtaXRlbT5cbiAqICAgICA8L29ucy1jYXJvdXNlbD5cbiAqICAgPC9vbnMtbGlzdC1pdGVtPlxuICogPC9vbnMtbGlzdD5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ29uc2VuJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25zU2NvcGUnLCBmdW5jdGlvbigkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuZGF0YSgnX3Njb3BlJywgc2NvcGUpO1xuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ19zY29wZScsIHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNlYXJjaC1pbnB1dFxuICovXG5cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTZWFyY2hJbnB1dCcsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICBzY29wZTogZmFsc2UsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBsZXQgZWwgPSBlbGVtZW50WzBdO1xuXG4gICAgICAgIGNvbnN0IG9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgICAgJHBhcnNlKGF0dHJzLm5nTW9kZWwpLmFzc2lnbihzY29wZSwgZWwudHlwZSA9PT0gJ251bWJlcicgPyBOdW1iZXIoZWwudmFsdWUpIDogZWwudmFsdWUpO1xuICAgICAgICAgIGF0dHJzLm5nQ2hhbmdlICYmIHNjb3BlLiRldmFsKGF0dHJzLm5nQ2hhbmdlKTtcbiAgICAgICAgICBzY29wZS4kcGFyZW50LiRldmFsQXN5bmMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ01vZGVsLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlICE9PSBlbC52YWx1ZSkge1xuICAgICAgICAgICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWxlbWVudC5vbignaW5wdXQnLCBvbklucHV0KVxuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICBlbGVtZW50Lm9mZignaW5wdXQnLCBvbklucHV0KVxuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gZWwgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy1zZWdtZW50XG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1WYXJpYWJsZSBuYW1lIHRvIHJlZmVyIHRoaXMgc2VnbWVudC5bL2VuXVxuICogICBbamFd44GT44Gu44K/44OW44OQ44O844KS5Y+C54Wn44GZ44KL44Gf44KB44Gu5ZCN5YmN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RjaGFuZ2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RjaGFuZ2VcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cInBvc3RjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTZWdtZW50JywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciB2aWV3ID0gR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy1zZWdtZW50J30pO1xuICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICRvbnNlbi5yZWdpc3RlckV2ZW50SGFuZGxlcnModmlldywgJ3Bvc3RjaGFuZ2UnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNlbGVjdFxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvblxuICogQHNpZ25hdHVyZSBvbihldmVudE5hbWUsIGxpc3RlbmVyKVxuICogQGRlc2NyaXB0aW9uXG4gKiAgIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44GT44Gu44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb25jZVxuICogQHNpZ25hdHVyZSBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQncyBvbmx5IHRyaWdnZXJlZCBvbmNlLlsvZW5dXG4gKiAgW2phXeS4gOW6puOBoOOBkeWRvOOBs+WHuuOBleOCjOOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoOOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiAgIFtlbl1OYW1lIG9mIHRoZSBldmVudC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI5ZCN44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiAgIFtlbl1GdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44GM55m654Gr44GX44Gf6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWw44Kq44OW44K444Kn44Kv44OI44KS5oyH5a6a44GX44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBtZXRob2Qgb2ZmXG4gKiBAc2lnbmF0dXJlIG9mZihldmVudE5hbWUsIFtsaXN0ZW5lcl0pXG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBJZiB0aGUgbGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCBhbGwgbGlzdGVuZXJzIGZvciB0aGUgZXZlbnQgdHlwZSB3aWxsIGJlIHJlbW92ZWQuWy9lbl1cbiAqICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6Zmk44GX44G+44GZ44CC44KC44GX44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5oyH5a6a44GX44Gq44GL44Gj44Gf5aC05ZCI44Gr44Gv44CB44Gd44Gu44Kk44OZ44Oz44OI44Gr57SQ44Gl44GP5YWo44Gm44Gu44Kk44OZ44Oz44OI44Oq44K544OK44O844GM5YmK6Zmk44GV44KM44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3liYrpmaTjgZnjgovjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKVxuICAuZGlyZWN0aXZlKCdvbnNTZWxlY3QnLCBmdW5jdGlvbiAoJHBhcnNlLCAkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgIHNjb3BlOiBmYWxzZSxcblxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBjb25zdCBvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNldCA9ICRwYXJzZShhdHRycy5uZ01vZGVsKS5hc3NpZ247XG5cbiAgICAgICAgICBzZXQoc2NvcGUsIGVsZW1lbnRbMF0udmFsdWUpO1xuICAgICAgICAgIGlmIChhdHRycy5uZ0NoYW5nZSkge1xuICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMubmdDaGFuZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzY29wZS4kcGFyZW50LiRldmFsQXN5bmMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCkge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ01vZGVsLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnRbMF0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsZW1lbnQub24oJ2lucHV0Jywgb25JbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQub2ZmKCdpbnB1dCcsIG9uSW5wdXQpO1xuICAgICAgICAgIHNjb3BlID0gZWxlbWVudCA9IGF0dHJzID0gbnVsbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7IHZpZXdLZXk6ICdvbnMtc2VsZWN0JyB9KTtcbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtc3BsaXR0ZXItY29udGVudFxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwiZGVzdHJveVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwiZGVzdHJveVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuU3BsaXR0ZXJDb250ZW50RWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5TcGxpdHRlckNvbnRlbnRFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtc3BsaXR0ZXItY29udGVudCcsIGxhc3RSZWFkeSk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlckNvbnRlbnQnLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXR0ZXJDb250ZW50LCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICB2YXIgdmlldyA9IG5ldyBTcGxpdHRlckNvbnRlbnQoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB2aWV3KTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHZpZXcsICdkZXN0cm95Jyk7XG5cbiAgICAgICAgICBlbGVtZW50LmRhdGEoJ29ucy1zcGxpdHRlci1jb250ZW50Jywgdmlldyk7XG5cbiAgICAgICAgICBlbGVtZW50WzBdLnBhZ2VMb2FkZXIgPSAkb25zZW4uY3JlYXRlUGFnZUxvYWRlcih2aWV3KTtcblxuICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZpZXcuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLWNvbnRlbnQnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qKlxuICogQGVsZW1lbnQgb25zLXNwbGl0dGVyLXNpZGVcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLWRlc3Ryb3lcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcImRlc3Ryb3lcIiBldmVudCBpcyBmaXJlZC5bL2VuXVxuICogIFtqYV1cImRlc3Ryb3lcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wcmVvcGVuXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwcmVvcGVuXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVvcGVuXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcHJlY2xvc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInByZWNsb3NlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVjbG9zZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXBvc3RvcGVuXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0b3BlblwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdG9wZW5cIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y2xvc2VcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInBvc3RjbG9zZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwicG9zdGNsb3NlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtbW9kZWNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwibW9kZWNoYW5nZVwiIGV2ZW50IGlzIGZpcmVkLlsvZW5dXG4gKiAgW2phXVwibW9kZWNoYW5nZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuU3BsaXR0ZXJTaWRlRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5TcGxpdHRlclNpZGVFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtc3BsaXR0ZXItc2lkZScsIGxhc3RSZWFkeSk7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNTcGxpdHRlclNpZGUnLCBmdW5jdGlvbigkY29tcGlsZSwgU3BsaXR0ZXJTaWRlLCAkb25zZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICB2YXIgdmlldyA9IG5ldyBTcGxpdHRlclNpZGUoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKTtcblxuICAgICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB2aWV3KTtcbiAgICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHZpZXcsICdkZXN0cm95IHByZW9wZW4gcHJlY2xvc2UgcG9zdG9wZW4gcG9zdGNsb3NlIG1vZGVjaGFuZ2UnKTtcblxuICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXNwbGl0dGVyLXNpZGUnLCB2aWV3KTtcblxuICAgICAgICAgIGVsZW1lbnRbMF0ucGFnZUxvYWRlciA9ICRvbnNlbi5jcmVhdGVQYWdlTG9hZGVyKHZpZXcpO1xuXG4gICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtc3BsaXR0ZXItc2lkZScsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJylcbiAgICAuZGlyZWN0aXZlKCdvbnNUYWInLCB0YWIpXG4gICAgLmRpcmVjdGl2ZSgnb25zVGFiYmFySXRlbScsIHRhYik7IC8vIGZvciBCQ1xuXG4gIGZ1bmN0aW9uIHRhYigkb25zZW4sIEdlbmVyaWNWaWV3KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIHZpZXcgPSBHZW5lcmljVmlldy5yZWdpc3RlcihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHt2aWV3S2V5OiAnb25zLXRhYid9KTtcbiAgICAgICAgZWxlbWVudFswXS5wYWdlTG9hZGVyID0gJG9uc2VuLmNyZWF0ZVBhZ2VMb2FkZXIodmlldyk7XG5cbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy10YWJiYXJcbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyB0YWIgYmFyLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgr/jg5bjg5Djg7zjgpLlj4LnhafjgZnjgovjgZ/jgoHjga7lkI3liY3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtcmVhY3RpdmVcbiAqIEBpbml0b25seVxuICogQHR5cGUge0V4cHJlc3Npb259XG4gKiBAZGVzY3JpcHRpb25cbiAqICBbZW5dQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGN1c3RvbSBiZWhhdmlvciB3aGVuIHRoZSBcInJlYWN0aXZlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJyZWFjdGl2ZVwi44Kk44OZ44Oz44OI44GM55m654Gr44GV44KM44Gf5pmC44Gu5oyZ5YuV44KS54us6Ieq44Gr5oyH5a6a44Gn44GN44G+44GZ44CCWy9qYV1cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgb25zLXByZWNoYW5nZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gdGhlIFwicHJlY2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwcmVjaGFuZ2VcIuOCpOODmeODs+ODiOOBjOeZuueBq+OBleOCjOOBn+aZguOBruaMmeWLleOCkueLrOiHquOBq+aMh+WumuOBp+OBjeOBvuOBmeOAglsvamFdXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIG9ucy1wb3N0Y2hhbmdlXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtFeHByZXNzaW9ufVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXUFsbG93cyB5b3UgdG8gc3BlY2lmeSBjdXN0b20gYmVoYXZpb3Igd2hlbiB0aGUgXCJwb3N0Y2hhbmdlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFdXCJwb3N0Y2hhbmdlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaW5pdFxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJpbml0XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJpbml0XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtc2hvd1xuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJzaG93XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJzaG93XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtaGlkZVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJoaWRlXCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJoaWRlXCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQGF0dHJpYnV0ZSBvbnMtZGVzdHJveVxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7RXhwcmVzc2lvbn1cbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BbGxvd3MgeW91IHRvIHNwZWNpZnkgY3VzdG9tIGJlaGF2aW9yIHdoZW4gYSBwYWdlJ3MgXCJkZXN0cm95XCIgZXZlbnQgaXMgZmlyZWQuWy9lbl1cbiAqICBbamFd44Oa44O844K444GuXCJkZXN0cm95XCLjgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/mmYLjga7mjJnli5XjgpLni6zoh6rjgavmjIflrprjgafjgY3jgb7jgZnjgIJbL2phXVxuICovXG5cblxuLyoqXG4gKiBAbWV0aG9kIG9uXG4gKiBAc2lnbmF0dXJlIG9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpXG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXUFkZCBhbiBldmVudCBsaXN0ZW5lci5bL2VuXVxuICogICBbamFd44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgZPjga7jgqTjg5njg7Pjg4jjgYznmbrngavjgZXjgozjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAc2lnbmF0dXJlIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lcilcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCdzIG9ubHkgdHJpZ2dlcmVkIG9uY2UuWy9lbl1cbiAqICBbamFd5LiA5bqm44Gg44GR5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95Yqg44GX44G+44GZ44CCWy9qYV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqICAgW2VuXU5hbWUgb2YgdGhlIGV2ZW50LlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jlkI3jgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAqICAgW2VuXUZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlsvZW5dXG4gKiAgIFtqYV3jgqTjg5njg7Pjg4jjgYznmbrngavjgZfjgZ/pmpvjgavlkbzjgbPlh7rjgZXjgozjgovplqLmlbDjgqrjg5bjgrjjgqfjgq/jg4jjgpLmjIflrprjgZfjgb7jgZnjgIJbL2phXVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBvZmZcbiAqIEBzaWduYXR1cmUgb2ZmKGV2ZW50TmFtZSwgW2xpc3RlbmVyXSlcbiAqIEBkZXNjcmlwdGlvblxuICogIFtlbl1SZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuIElmIHRoZSBsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5bL2VuXVxuICogIFtqYV3jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLliYrpmaTjgZfjgb7jgZnjgILjgoLjgZfjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLmjIflrprjgZfjgarjgYvjgaPjgZ/loLTlkIjjgavjga/jgIHjgZ3jga7jgqTjg5njg7Pjg4jjgavntJDjgaXjgY/lhajjgabjga7jgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgYzliYrpmaTjgZXjgozjgb7jgZnjgIJbL2phXVxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogICBbZW5dTmFtZSBvZiB0aGUgZXZlbnQuWy9lbl1cbiAqICAgW2phXeOCpOODmeODs+ODiOWQjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICogICBbZW5dRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuWy9lbl1cbiAqICAgW2phXeWJiumZpOOBmeOCi+OCpOODmeODs+ODiOODquOCueODiuODvOOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhc3RSZWFkeSA9IHdpbmRvdy5vbnMuVGFiYmFyRWxlbWVudC5yZXdyaXRhYmxlcy5yZWFkeTtcbiAgd2luZG93Lm9ucy5UYWJiYXJFbGVtZW50LnJld3JpdGFibGVzLnJlYWR5ID0gb25zLl93YWl0RGlyZXRpdmVJbml0KCdvbnMtdGFiYmFyJywgbGFzdFJlYWR5KTtcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5kaXJlY3RpdmUoJ29uc1RhYmJhcicsIGZ1bmN0aW9uKCRvbnNlbiwgJGNvbXBpbGUsICRwYXJzZSwgVGFiYmFyVmlldykge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG5cbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgc2NvcGU6IHRydWUsXG5cbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgICB2YXIgdGFiYmFyVmlldyA9IG5ldyBUYWJiYXJWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG4gICAgICAgICRvbnNlbi5hZGRNb2RpZmllck1ldGhvZHNGb3JDdXN0b21FbGVtZW50cyh0YWJiYXJWaWV3LCBlbGVtZW50KTtcblxuICAgICAgICAkb25zZW4ucmVnaXN0ZXJFdmVudEhhbmRsZXJzKHRhYmJhclZpZXcsICdyZWFjdGl2ZSBwcmVjaGFuZ2UgcG9zdGNoYW5nZSBpbml0IHNob3cgaGlkZSBkZXN0cm95Jyk7XG5cbiAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtdGFiYmFyJywgdGFiYmFyVmlldyk7XG4gICAgICAgICRvbnNlbi5kZWNsYXJlVmFyQXR0cmlidXRlKGF0dHJzLCB0YWJiYXJWaWV3KTtcblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGFiYmFyVmlldy5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICRvbnNlbi5yZW1vdmVNb2RpZmllck1ldGhvZHModGFiYmFyVmlldyk7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtdGFiYmFyJywgdW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG9uc2VuLmZpcmVDb21wb25lbnRFdmVudChlbGVtZW50WzBdLCAnaW5pdCcpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ29uc2VuJykuZGlyZWN0aXZlKCdvbnNUZW1wbGF0ZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZXJtaW5hbDogdHJ1ZSxcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGNvbnRlbnQgPSBlbGVtZW50WzBdLnRlbXBsYXRlIHx8IGVsZW1lbnQuaHRtbCgpO1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoZWxlbWVudC5hdHRyKCdpZCcpLCBjb250ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKipcbiAqIEBlbGVtZW50IG9ucy10b29sYmFyXG4gKi9cblxuLyoqXG4gKiBAYXR0cmlidXRlIHZhclxuICogQGluaXRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGRlc2NyaXB0aW9uXG4gKiAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyB0b29sYmFyLlsvZW5dXG4gKiAgW2phXeOBk+OBruODhOODvOODq+ODkOODvOOCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdvbnNlbicpLmRpcmVjdGl2ZSgnb25zVG9vbGJhcicsIGZ1bmN0aW9uKCRvbnNlbiwgR2VuZXJpY1ZpZXcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcblxuICAgICAgLy8gTk9URTogVGhpcyBlbGVtZW50IG11c3QgY29leGlzdHMgd2l0aCBuZy1jb250cm9sbGVyLlxuICAgICAgLy8gRG8gbm90IHVzZSBpc29sYXRlZCBzY29wZSBhbmQgdGVtcGxhdGUncyBuZy10cmFuc2NsdWRlLlxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgdHJhbnNjbHVkZTogZmFsc2UsXG5cbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIHRoaXMgZGlydHkgZml4IVxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbMF0ubm9kZU5hbWUgPT09ICdvbnMtdG9vbGJhcicpIHtcbiAgICAgICAgICAgICAgR2VuZXJpY1ZpZXcucmVnaXN0ZXIoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB7dmlld0tleTogJ29ucy10b29sYmFyJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBAZWxlbWVudCBvbnMtdG9vbGJhci1idXR0b25cbiAqL1xuXG4vKipcbiAqIEBhdHRyaWJ1dGUgdmFyXG4gKiBAaW5pdG9ubHlcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAZGVzY3JpcHRpb25cbiAqICAgW2VuXVZhcmlhYmxlIG5hbWUgdG8gcmVmZXIgdGhpcyBidXR0b24uWy9lbl1cbiAqICAgW2phXeOBk+OBruODnOOCv+ODs+OCkuWPgueFp+OBmeOCi+OBn+OCgeOBruWQjeWJjeOCkuaMh+WumuOBl+OBvuOBmeOAglsvamFdXG4gKi9cbihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdvbnNUb29sYmFyQnV0dG9uJywgZnVuY3Rpb24oJG9uc2VuLCBHZW5lcmljVmlldykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgbGluazoge1xuICAgICAgICBwcmU6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciB0b29sYmFyQnV0dG9uID0gbmV3IEdlbmVyaWNWaWV3KHNjb3BlLCBlbGVtZW50LCBhdHRycyk7XG4gICAgICAgICAgZWxlbWVudC5kYXRhKCdvbnMtdG9vbGJhci1idXR0b24nLCB0b29sYmFyQnV0dG9uKTtcbiAgICAgICAgICAkb25zZW4uZGVjbGFyZVZhckF0dHJpYnV0ZShhdHRycywgdG9vbGJhckJ1dHRvbik7XG5cbiAgICAgICAgICAkb25zZW4uYWRkTW9kaWZpZXJNZXRob2RzRm9yQ3VzdG9tRWxlbWVudHModG9vbGJhckJ1dHRvbiwgZWxlbWVudCk7XG5cbiAgICAgICAgICAkb25zZW4uY2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdG9vbGJhckJ1dHRvbi5fZXZlbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgJG9uc2VuLnJlbW92ZU1vZGlmaWVyTWV0aG9kcyh0b29sYmFyQnV0dG9uKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnb25zLXRvb2xiYXItYnV0dG9uJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuXG4gICAgICAgICAgICAkb25zZW4uY2xlYXJDb21wb25lbnQoe1xuICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIGF0dHJzOiBhdHRycyxcbiAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2NvcGUgPSBlbGVtZW50ID0gYXR0cnMgPSBudWxsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAkb25zZW4uZmlyZUNvbXBvbmVudEV2ZW50KGVsZW1lbnRbMF0sICdpbml0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuQ29weXJpZ2h0IDIwMTMtMjAxNSBBU0lBTCBDT1JQT1JBVElPTlxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKTtcblxuICB2YXIgQ29tcG9uZW50Q2xlYW5lciA9IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAqL1xuICAgIGRlY29tcG9zZU5vZGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IGVsZW1lbnQucmVtb3ZlKCkuY2hpbGRyZW4oKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZWNvbXBvc2VOb2RlKGFuZ3VsYXIuZWxlbWVudChjaGlsZHJlbltpXSkpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0F0dHJpYnV0ZXN9IGF0dHJzXG4gICAgICovXG4gICAgZGVzdHJveUF0dHJpYnV0ZXM6IGZ1bmN0aW9uKGF0dHJzKSB7XG4gICAgICBhdHRycy4kJGVsZW1lbnQgPSBudWxsO1xuICAgICAgYXR0cnMuJCRvYnNlcnZlcnMgPSBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2pxTGl0ZX0gZWxlbWVudFxuICAgICAqL1xuICAgIGRlc3Ryb3lFbGVtZW50OiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Njb3BlfSBzY29wZVxuICAgICAqL1xuICAgIGRlc3Ryb3lTY29wZTogZnVuY3Rpb24oc2NvcGUpIHtcbiAgICAgIHNjb3BlLiQkbGlzdGVuZXJzID0ge307XG4gICAgICBzY29wZS4kJHdhdGNoZXJzID0gbnVsbDtcbiAgICAgIHNjb3BlID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTY29wZX0gc2NvcGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqL1xuICAgIG9uRGVzdHJveTogZnVuY3Rpb24oc2NvcGUsIGZuKSB7XG4gICAgICB2YXIgY2xlYXIgPSBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyKCk7XG4gICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ0NvbXBvbmVudENsZWFuZXInLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gQ29tcG9uZW50Q2xlYW5lcjtcbiAgfSk7XG5cbiAgLy8gb3ZlcnJpZGUgYnVpbHRpbiBuZy0oZXZlbnRuYW1lKSBkaXJlY3RpdmVzXG4gIChmdW5jdGlvbigpIHtcbiAgICB2YXIgbmdFdmVudERpcmVjdGl2ZXMgPSB7fTtcbiAgICAnY2xpY2sgZGJsY2xpY2sgbW91c2Vkb3duIG1vdXNldXAgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlbW92ZSBtb3VzZWVudGVyIG1vdXNlbGVhdmUga2V5ZG93biBrZXl1cCBrZXlwcmVzcyBzdWJtaXQgZm9jdXMgYmx1ciBjb3B5IGN1dCBwYXN0ZScuc3BsaXQoJyAnKS5mb3JFYWNoKFxuICAgICAgZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlTmFtZSA9IGRpcmVjdGl2ZU5vcm1hbGl6ZSgnbmctJyArIG5hbWUpO1xuICAgICAgICBuZ0V2ZW50RGlyZWN0aXZlc1tkaXJlY3RpdmVOYW1lXSA9IFsnJHBhcnNlJywgZnVuY3Rpb24oJHBhcnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKCRlbGVtZW50LCBhdHRyKSB7XG4gICAgICAgICAgICAgIHZhciBmbiA9ICRwYXJzZShhdHRyW2RpcmVjdGl2ZU5hbWVdKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZm4oc2NvcGUsIHskZXZlbnQ6IGV2ZW50fSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGVsZW1lbnQub24obmFtZSwgbGlzdGVuZXIpO1xuXG4gICAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5vbkRlc3Ryb3koc2NvcGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgZWxlbWVudC5vZmYobmFtZSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgIENvbXBvbmVudENsZWFuZXIuZGVzdHJveVNjb3BlKHNjb3BlKTtcbiAgICAgICAgICAgICAgICAgIHNjb3BlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgQ29tcG9uZW50Q2xlYW5lci5kZXN0cm95QXR0cmlidXRlcyhhdHRyKTtcbiAgICAgICAgICAgICAgICAgIGF0dHIgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1dO1xuXG4gICAgICAgIGZ1bmN0aW9uIGRpcmVjdGl2ZU5vcm1hbGl6ZShuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvLShbYS16XSkvZywgZnVuY3Rpb24obWF0Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXNbMV0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gICAgbW9kdWxlLmNvbmZpZyhmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgdmFyIHNoaWZ0ID0gZnVuY3Rpb24oJGRlbGVnYXRlKSB7XG4gICAgICAgICRkZWxlZ2F0ZS5zaGlmdCgpO1xuICAgICAgICByZXR1cm4gJGRlbGVnYXRlO1xuICAgICAgfTtcbiAgICAgIE9iamVjdC5rZXlzKG5nRXZlbnREaXJlY3RpdmVzKS5mb3JFYWNoKGZ1bmN0aW9uKGRpcmVjdGl2ZU5hbWUpIHtcbiAgICAgICAgJHByb3ZpZGUuZGVjb3JhdG9yKGRpcmVjdGl2ZU5hbWUgKyAnRGlyZWN0aXZlJywgWyckZGVsZWdhdGUnLCBzaGlmdF0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgT2JqZWN0LmtleXMobmdFdmVudERpcmVjdGl2ZXMpLmZvckVhY2goZnVuY3Rpb24oZGlyZWN0aXZlTmFtZSkge1xuICAgICAgbW9kdWxlLmRpcmVjdGl2ZShkaXJlY3RpdmVOYW1lLCBuZ0V2ZW50RGlyZWN0aXZlc1tkaXJlY3RpdmVOYW1lXSk7XG4gICAgfSk7XG4gIH0pKCk7XG59KSgpO1xuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuT2JqZWN0LmtleXMob25zLm5vdGlmaWNhdGlvbikuZmlsdGVyKG5hbWUgPT4gIS9eXy8udGVzdChuYW1lKSkuZm9yRWFjaChuYW1lID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxOb3RpZmljYXRpb24gPSBvbnMubm90aWZpY2F0aW9uW25hbWVdO1xuXG4gIG9ucy5ub3RpZmljYXRpb25bbmFtZV0gPSAobWVzc2FnZSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgdHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnID8gKG9wdGlvbnMubWVzc2FnZSA9IG1lc3NhZ2UpIDogKG9wdGlvbnMgPSBtZXNzYWdlKTtcblxuICAgIGNvbnN0IGNvbXBpbGUgPSBvcHRpb25zLmNvbXBpbGU7XG4gICAgbGV0ICRlbGVtZW50O1xuXG4gICAgb3B0aW9ucy5jb21waWxlID0gZWxlbWVudCA9PiB7XG4gICAgICAkZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChjb21waWxlID8gY29tcGlsZShlbGVtZW50KSA6IGVsZW1lbnQpO1xuICAgICAgcmV0dXJuIG9ucy4kY29tcGlsZSgkZWxlbWVudCkoJGVsZW1lbnQuaW5qZWN0b3IoKS5nZXQoJyRyb290U2NvcGUnKSk7XG4gICAgfTtcblxuICAgIG9wdGlvbnMuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICRlbGVtZW50LmRhdGEoJ19zY29wZScpLiRkZXN0cm95KCk7XG4gICAgICAkZWxlbWVudCA9IG51bGw7XG4gICAgfTtcblxuICAgIHJldHVybiBvcmlnaW5hbE5vdGlmaWNhdGlvbihvcHRpb25zKTtcbiAgfTtcbn0pO1xuIiwiLy8gY29uZmlybSB0byB1c2UganFMaXRlXG5pZiAod2luZG93LmpRdWVyeSAmJiBhbmd1bGFyLmVsZW1lbnQgPT09IHdpbmRvdy5qUXVlcnkpIHtcbiAgY29uc29sZS53YXJuKCdPbnNlbiBVSSByZXF1aXJlIGpxTGl0ZS4gTG9hZCBqUXVlcnkgYWZ0ZXIgbG9hZGluZyBBbmd1bGFySlMgdG8gZml4IHRoaXMgZXJyb3IuIGpRdWVyeSBtYXkgYnJlYWsgT25zZW4gVUkgYmVoYXZpb3IuJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxufVxuIiwiLypcbkNvcHlyaWdodCAyMDEzLTIwMTUgQVNJQUwgQ09SUE9SQVRJT05cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuKi9cblxuKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnb25zZW4nKS5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICB2YXIgdGVtcGxhdGVzID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwidGV4dC9vbnMtdGVtcGxhdGVcIl0nKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcGxhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdGVtcGxhdGUgPSBhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGVzW2ldKTtcbiAgICAgIHZhciBpZCA9IHRlbXBsYXRlLmF0dHIoJ2lkJyk7XG4gICAgICBpZiAodHlwZW9mIGlkID09PSAnc3RyaW5nJykge1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoaWQsIHRlbXBsYXRlLnRleHQoKSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxufSkoKTtcbiJdfQ==

'use strict';
/*global angular, $, setTimeout*/

/*
 *  AngularJS Autocomplete, version 0.6.0
 *  Wrapper for the jQuery UI Autocomplete Widget - v1.11.2
 *  API @ http://api.jqueryui.com/autocomplete/
 *
 *  <input type="text" ng-model="modelObj" ui-autocomplete="myOptions">
 *  $scope.myOptions = {
 *      options: {
 *          html: false, // boolean, uiAutocomplete extend, if true, you can use html string or DOM object in data.label for source
 *          onlySelectValid: false, // boolean, uiAutocomplete extend, if true, element value must be selected from suggestion menu, otherwise set validity of 'onlyselect' to false.
 *          focusOpen: false, // boolean, uiAutocomplete extend, if true, the suggestion menu auto open with all source data when focus
 *          groupLabel: null, // html string or DOM object, uiAutocomplete extend, it is used to group suggestion result, it can't be seleted.
 *          outHeight: 0, // number, uiAutocomplete extend, it is used to adjust suggestion menu' css style "max-height".
 *          appendTo: null, // jQuery UI Autocomplete Widget Options, the same below. http://api.jqueryui.com/autocomplete/#option
 *          autoFocus: false,
 *          delay: 300,
 *          disabled: false,
 *          minLength: 1,
 *          position: { my: "left top", at: "left bottom", collision: "none" },
 *          source: undefined // must be specified
 *      },
 *      events: // jQuery UI Autocomplete Widget Events, http://api.jqueryui.com/autocomplete/#event
 *      methods: // extend jQuery UI Autocomplete Widget Methods to AngularJS, http://api.jqueryui.com/autocomplete/#methods
 *               // then you can invoke methods like this: $scope.myOptions.methods.search('term');
 *               // add a new method 'filter' for filtering source data in AngularJS controller
 *  };
 */

angular.module('ui.autocomplete', [])
  .directive('uiAutocomplete', ['$timeout', '$exceptionHandler',
    function ($timeout, $exceptionHandler) {
      var proto = $.ui.autocomplete.prototype;
      var initSource = proto._initSource;
      var slice = Array.prototype.slice;

      function filter(array, term) {
        var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), 'i');
        return $.grep(array, function (value) {
          return matcher.test($('<div>').html(value.label || value.value || value).text());
        });
      }

      $.extend(proto, {
        _initSource: function () {
          if (this.options.html && $.isArray(this.options.source)) {
            this.source = function (request, response) {
              response(filter(this.options.source, request.term));
            };
          } else {
            initSource.call(this);
          }
        },

        _normalize: function (items) {
          // assume all items have the right format
          return $.map(items, function (item) {
            if (item && typeof item === "object") {
              return $.extend({
                label: item.label || item.value,
                value: item.value || item.label
              }, item);
            } else {
              return {
                label: item + '',
                value: item
              };
            }
          });
        },

        _renderItemData: function (ul, item) {
          var element = item.groupLabel || item.label;
          if (item.groupLabel) {
            element = $('<div>').append(element).addClass('ui-menu-group');
          } else if (this.options.html) {
            if (typeof element === 'object') {
              element = $(element);
            }
            if (typeof element !== 'object' || element.length > 1 || !element.is('a')) {
              element = $('<a>').append(element);
            }
          } else {
            element = $('<a>').text(element);
          }
          return $('<li>').append(element).appendTo(ul).data('ui-autocomplete-item', item);
        },

        _resizeMenu: function () {
          var that = this;
          setTimeout(function () {
            var ul = that.menu.element;
            var maxHeight = ul.css('max-height') || 0,
              width = Math.max(
                ul.width('').outerWidth() + 1,
                that.element.outerWidth()),
              oHeight = that.element.height(),
              height = $(window).height() - that.options.outHeight - ul.offset().top;
            height = maxHeight && height > maxHeight ? maxHeight : height;
            ul.css({
              width: width,
              maxHeight: height
            });
          }, 10);
        }
      });

      return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
          var status = false,
            selectItem = null,
            events = {},
            ngModel = null,
            each = angular.forEach,
            isObject = angular.isObject,
            extend = angular.extend,
            autocomplete = scope.$eval(attr.uiAutocomplete),
            valueMethod = angular.bind(element, element.val),
            methodsName = ['close', 'destroy', 'disable', 'enable', 'instance', 'option', 'search', 'widget'],
            eventsName = ['change', 'close', 'create', 'focus', 'open', 'response', 'search', 'select'];

          var unregisterWatchModel = scope.$watch(attr.ngModel, function (value) {
            ngModel = value;
            if (isObject(ngModel)) {
              // not only primitive type ngModel, you can also use object type ngModel!
              // there must have a property 'value' in ngModel if object type
              ctrl.$formatters.push(function (obj) {
                return obj.value;
              });
              ctrl.$parsers.push(function (value) {
                ngModel.value = value;
                return ngModel;
              });
              scope.$watch(attr.ngModel, function (model) {
                if (valueMethod() !== model.value) {
                  ctrl.$viewValue = model.value;
                  ctrl.$render();
                }
              }, true);
              ctrl.$pristine = false; // hack:prevent change to dirty
              ctrl.$setViewValue(ngModel.value);
              ctrl.$pristine = true;
            }
            if (value) {
              // unregister the watch after get value
              unregisterWatchModel();
            }
          });

          var uiEvents = {
            open: function (event, ui) {
              status = true;
              selectItem = null;
            },
            close: function (event, ui) {
              status = false;
            },
            select: function (event, ui) {
              selectItem = ui;
              $timeout(function () {
                element.blur();
              }, 0);
            },
            change: function (event, ui) {
              // update view value and Model value
              var value = valueMethod(),
                selected = false;

              if (selectItem && selectItem.item && (value.indexOf(selectItem.item.value) !== -1)) {
                value = selectItem.item.value;
                selected = true;
              }

              scope.$apply(function () {
                if (autocomplete.options.onlySelectValid) {
                  ctrl.$setValidity('onlyselect', selected);
                }
                if (value === null) {
                  ctrl.$render();
                } else if (value === '') {
                  changeNgModel();
                } else if (ctrl.$viewValue !== value) {
                  ctrl.$setViewValue(value);
                  ctrl.$render();
                  changeNgModel(selectItem);
                }
              });
            }
          };

          function changeNgModel(data) {
            if (isObject(ngModel)) {
              if (!ctrl.$viewValue && ctrl.$viewValue !== 0) {
                emptyObj(ngModel);
              } else if (data && data.item) {
                data.item.label = isObject(data.item.label) ? $('<div>').append(data.item.label).html() : data.item.label;
                extend(ngModel, data.item);
              }
              each(ctrl.$viewChangeListeners, function (listener) {
                try {
                  listener();
                } catch (e) {
                  $exceptionHandler(e);
                }
              });
            }
          }

          function cleanNgModel() {
            ctrl.$setViewValue('');
            ctrl.$render();
            changeNgModel();
          }

          function autoFocusHandler() {
            if (autocomplete.options.focusOpen && !status) {
              element.autocomplete('search', '');
            }
          }

          function checkOptions(options) {
            options = isObject(options) ? options : {};
            // if source not set, disabled autocomplete
            options.disabled = options.source ? options.disabled : true;
            // if focusOpen, minLength must be 0
            options.appendTo = options.appendTo || element.parents('.ng-view')[0] || element.parents('[ng-view]')[0] || null;
            options.minLength = options.focusOpen ? 0 : options.minLength;
            options.outHeight = options.outHeight || 0;
            options.position = options.position || {
              my: 'left top',
              at: 'left bottom',
              collision: 'flipfit'
            };
            return options;
          }

          function emptyObj(a) {
            if (isObject(a)) {
              var reg = /^\$/;
              each(a, function (value, key) {
                var type = typeof value;
                if (reg.test(key)) {
                  return; // don't clean private property of AngularJS
                } else if (type === 'number') {
                  a[key] = 0;
                } else if (type === 'string') {
                  a[key] = '';
                } else if (type === 'boolean') {
                  a[key] = false;
                } else if (isObject(value)) {
                  emptyObj(value);
                }
              });
            }
          }

          if (!isObject(autocomplete)) {
            return;
          }

          autocomplete.methods = {};
          autocomplete.options = checkOptions(autocomplete.options);

          // extend events to Autocomplete
          each(eventsName, function (name) {
            var _event = autocomplete.options[name];
            _event = typeof _event === 'function' ? _event : angular.noop;
            events[name] = function (event, ui) {
              if (uiEvents[name]) {
                uiEvents[name](event, ui);
              }
              _event(event, ui);
              if (autocomplete.events && typeof autocomplete.events[name] === 'function') {
                autocomplete.events[name](event, ui);
              }
            };
          });

          // extend Autocomplete methods to AngularJS
          each(methodsName, function (name) {
            autocomplete.methods[name] = function () {
              var args = slice.call(arguments);
              args.unshift(name);
              return element.autocomplete.apply(element, args);
            };
          });
          // add filter method to AngularJS
          autocomplete.methods.filter = filter;
          autocomplete.methods.clean = cleanNgModel;

          element.on('focus', autoFocusHandler);

          element.autocomplete(extend({}, autocomplete.options, events));
          autocomplete.widget = element.autocomplete('widget');
          // remove default class, use bootstrap style
          // autocomplete.widget.removeClass('ui-menu ui-corner-all ui-widget-content').addClass('dropdown-menu');
        }
      };
    }
  ]);

(function () {
  angular.module('imageSpinner', []).value('version', '0.1.5');
}.call(this));
;
(function () {
  var __bind = function (fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };
  angular.module('imageSpinner').constant('imageSpinnerDefaultSettings', {
    lines: 9,
    length: 10,
    width: 2,
    radius: 3,
    corners: 1,
    rotate: 0,
    direction: 1,
    color: '#000',
    speed: 1,
    trail: 10,
    shadow: false,
    hwaccel: false,
    className: 'spinner',
    zIndex: 2000000000,
    top: '50%',
    left: '50%'
  }).directive('imageSpinner', [
    '$window',
    'imageSpinnerDefaultSettings',
    function ($window, DefaultSettings) {
      var ImageLoader, SPINNER_CLASS_NAME, SpinnerBuilder, isEmpty, link;
      ImageLoader = $window.Image;
      SpinnerBuilder = function () {
        function SpinnerBuilder(el, settings) {
          var _this = this;
          this.el = el;
          this.settings = settings;
          this.load = __bind(this.load, this);
          if (settings == null) {
            settings = {};
          }
          settings = angular.extend(settings, DefaultSettings);
          this.spinner = new Spinner(settings);
          this.container = this.el.parent();
          this.container.hide = function () {
            return _this.container.css('display', 'none');
          };
          this.container.show = function () {
            return _this.container.css('display', 'block');
          };
          this.loader = new ImageLoader();
          this.loader.onload = function () {
            return _this.load();
          };
        }
        SpinnerBuilder.prototype.setWidth = function (width) {
          width = '' + width.replace(/px/, '') + 'px';
          return angular.element(this.container).css('width', width);
        };
        SpinnerBuilder.prototype.setHeight = function (height) {
          height = '' + height.replace(/px/, '') + 'px';
          return angular.element(this.container).css('height', height);
        };
        SpinnerBuilder.prototype.show = function () {
          this.loader.src = this.el.attr('src');
          this.el.css('display', 'none');
          return this.spin();
        };
        SpinnerBuilder.prototype.load = function () {
          this.unspin();
          this.el.css('display', 'block');
          return this.container.css('display', 'block');
        };
        SpinnerBuilder.prototype.spin = function () {
          if (this.hasSpinner) {
            return;
          }
          this.hasSpinner = true;
          return this.spinner.spin(this.container[0]);
        };
        SpinnerBuilder.prototype.unspin = function () {
          if (!this.hasSpinner) {
            return;
          }
          this.hasSpinner = false;
          return this.spinner.stop();
        };
        return SpinnerBuilder;
      }();
      SPINNER_CLASS_NAME = 'spinner-container';
      isEmpty = function (value) {
        return value === void 0 || value === null || value === '';
      };
      link = function (scope, element, attributes) {
        var container, image, settings, spinner, _this = this;
        container = angular.element('<div>').addClass(SPINNER_CLASS_NAME).css('position', 'relative');
        element.wrap(container);
        image = angular.element(element);
        settings = attributes.imageSpinnerSettings;
        if (settings == null) {
          settings = {};
        }
        settings = scope.$eval(settings);
        spinner = new SpinnerBuilder(image, settings);
        return function (spinner) {
          var flow, render, showable;
          render = function (src) {
            if (isEmpty(src) || isEmpty(image.attr('width')) || isEmpty(image.attr('height'))) {
              return;
            }
            return spinner.show();
          };
          flow = function () {
            var src;
            src = image.attr('src');
            if (showable()) {
              render(src);
              if (!isEmpty(src)) {
                return spinner.container.show();
              }
            } else {
              spinner.unspin();
              return spinner.container.hide();
            }
          };
          showable = function () {
            return !image.hasClass('ng-hide');
          };
          scope.$watch(function () {
            return showable();
          }, function (value) {
            if (value == null) {
              return;
            }
            return flow();
          });
          scope.$on('$destroy', function () {
            return spinner.container.hide();
          });
          attributes.$observe('ng-src', function (src) {
            if (isEmpty(src)) {
              return;
            }
            return flow();
          });
          attributes.$observe('src', function (src) {
            if (isEmpty(src)) {
              return;
            }
            return flow();
          });
          attributes.$observe('width', function (width) {
            if (isEmpty(width)) {
              return;
            }
            spinner.setWidth(width);
            return render(image.attr('src'));
          });
          return attributes.$observe('height', function (height) {
            if (isEmpty(height)) {
              return;
            }
            spinner.setHeight(height);
            return render(image.attr('src'));
          });
        }(spinner);
      };
      return {
        restrict: 'A',
        link: link,
        scope: {}
      };
    }
  ]);
}.call(this));
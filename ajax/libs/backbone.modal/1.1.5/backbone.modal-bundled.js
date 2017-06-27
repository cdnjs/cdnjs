(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  (function(factory) {
    if (typeof define === "function" && define.amd) {
      return define(["underscore", "backbone", "exports"], factory);
    } else if (typeof exports === "object") {
      return factory(require("underscore"), require("backbone"), exports);
    } else {
      return factory(_, Backbone, {});
    }
  })(function(_, Backbone, Modal) {
    Modal = (function(_super) {
      __extends(Modal, _super);

      Modal.prototype.prefix = 'bbm';

      Modal.prototype.animate = true;

      Modal.prototype.keyControl = true;

      Modal.prototype.showViewOnRender = true;

      function Modal() {
        this.triggerCancel = __bind(this.triggerCancel, this);
        this.triggerSubmit = __bind(this.triggerSubmit, this);
        this.triggerView = __bind(this.triggerView, this);
        this.clickOutsideElement = __bind(this.clickOutsideElement, this);
        this.clickOutside = __bind(this.clickOutside, this);
        this.checkKey = __bind(this.checkKey, this);
        this.rendererCompleted = __bind(this.rendererCompleted, this);
        this.args = Array.prototype.slice.apply(arguments);
        Backbone.View.prototype.constructor.apply(this, this.args);
        this.setUIElements();
      }

      Modal.prototype.render = function(options) {
        var data, _ref;
        data = this.serializeData();
        if (!options || _.isEmpty(options)) {
          options = 0;
        }
        this.$el.addClass("" + this.prefix + "-wrapper");
        this.modalEl = Backbone.$('<div />').addClass("" + this.prefix + "-modal");
        if (this.template) {
          this.modalEl.html(this.buildTemplate(this.template, data));
        }
        this.$el.html(this.modalEl);
        if (this.viewContainer) {
          this.viewContainerEl = this.modalEl.find(this.viewContainer);
          this.viewContainerEl.addClass("" + this.prefix + "-modal__views");
        } else {
          this.viewContainerEl = this.modalEl;
        }
        Backbone.$(':focus').blur();
        if (((_ref = this.views) != null ? _ref.length : void 0) > 0 && this.showViewOnRender) {
          this.openAt(options);
        }
        if (typeof this.onRender === "function") {
          this.onRender();
        }
        this.delegateModalEvents();
        if (this.$el.fadeIn && this.animate) {
          this.modalEl.css({
            opacity: 0
          });
          this.$el.fadeIn({
            duration: 100,
            complete: this.rendererCompleted
          });
        } else {
          this.rendererCompleted();
        }
        return this;
      };

      Modal.prototype.rendererCompleted = function() {
        var _ref;
        if (this.keyControl) {
          Backbone.$('body').on('keyup.bbm', this.checkKey);
          this.$el.on('mouseup.bbm', this.clickOutsideElement);
          this.$el.on('click.bbm', this.clickOutside);
        }
        this.modalEl.css({
          opacity: 1
        }).addClass("" + this.prefix + "-modal--open");
        if (typeof this.onShow === "function") {
          this.onShow();
        }
        return (_ref = this.currentView) != null ? typeof _ref.onShow === "function" ? _ref.onShow() : void 0 : void 0;
      };

      Modal.prototype.setUIElements = function() {
        var _ref;
        this.template = this.getOption('template');
        this.views = this.getOption('views');
        if ((_ref = this.views) != null) {
          _ref.length = _.size(this.views);
        }
        this.viewContainer = this.getOption('viewContainer');
        this.animate = this.getOption('animate');
        if (_.isUndefined(this.template) && _.isUndefined(this.views)) {
          throw new Error('No template or views defined for Backbone.Modal');
        }
        if (this.template && this.views && _.isUndefined(this.viewContainer)) {
          throw new Error('No viewContainer defined for Backbone.Modal');
        }
      };

      Modal.prototype.getOption = function(option) {
        if (!option) {
          return;
        }
        if (this.options && __indexOf.call(this.options, option) >= 0 && (this.options[option] != null)) {
          return this.options[option];
        } else {
          return this[option];
        }
      };

      Modal.prototype.serializeData = function() {
        var data;
        data = {};
        if (this.model) {
          data = _.extend(data, this.model.toJSON());
        }
        if (this.collection) {
          data = _.extend(data, {
            items: this.collection.toJSON()
          });
        }
        return data;
      };

      Modal.prototype.delegateModalEvents = function() {
        var cancelEl, key, match, selector, submitEl, trigger, _results;
        this.active = true;
        cancelEl = this.getOption('cancelEl');
        submitEl = this.getOption('submitEl');
        if (submitEl) {
          this.$el.on('click', submitEl, this.triggerSubmit);
        }
        if (cancelEl) {
          this.$el.on('click', cancelEl, this.triggerCancel);
        }
        _results = [];
        for (key in this.views) {
          if (_.isString(key) && key !== 'length') {
            match = key.match(/^(\S+)\s*(.*)$/);
            trigger = match[1];
            selector = match[2];
            _results.push(this.$el.on(trigger, selector, this.views[key], this.triggerView));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      Modal.prototype.undelegateModalEvents = function() {
        var cancelEl, key, match, selector, submitEl, trigger, _results;
        this.active = false;
        cancelEl = this.getOption('cancelEl');
        submitEl = this.getOption('submitEl');
        if (submitEl) {
          this.$el.off('click', submitEl, this.triggerSubmit);
        }
        if (cancelEl) {
          this.$el.off('click', cancelEl, this.triggerCancel);
        }
        _results = [];
        for (key in this.views) {
          if (_.isString(key) && key !== 'length') {
            match = key.match(/^(\S+)\s*(.*)$/);
            trigger = match[1];
            selector = match[2];
            _results.push(this.$el.off(trigger, selector, this.views[key], this.triggerView));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      Modal.prototype.checkKey = function(e) {
        if (this.active) {
          switch (e.keyCode) {
            case 27:
              return this.triggerCancel(e);
            case 13:
              return this.triggerSubmit(e);
          }
        }
      };

      Modal.prototype.clickOutside = function(e) {
        var _ref;
        if (((_ref = this.outsideElement) != null ? _ref.hasClass("" + this.prefix + "-wrapper") : void 0) && this.active) {
          return this.triggerCancel();
        }
      };

      Modal.prototype.clickOutsideElement = function(e) {
        return this.outsideElement = Backbone.$(e.target);
      };

      Modal.prototype.buildTemplate = function(template, data) {
        var templateFunction;
        if (typeof template === 'function') {
          templateFunction = template;
        } else {
          templateFunction = _.template(Backbone.$(template).html());
        }
        return templateFunction(data);
      };

      Modal.prototype.buildView = function(viewType, options) {
        var view;
        if (!viewType) {
          return;
        }
        if (options && _.isFunction(options)) {
          options = options();
        }
        if (_.isFunction(viewType)) {
          view = new viewType(options || this.args[0]);
          if (view instanceof Backbone.View) {
            return {
              el: view.render().$el,
              view: view
            };
          } else {
            return {
              el: viewType(options || this.args[0])
            };
          }
        }
        return {
          view: viewType,
          el: viewType.$el
        };
      };

      Modal.prototype.triggerView = function(e) {
        var index, instance, key, options, _base, _base1, _ref;
        if (e != null) {
          if (typeof e.preventDefault === "function") {
            e.preventDefault();
          }
        }
        options = e.data;
        instance = this.buildView(options.view, options.viewOptions);
        if (this.currentView) {
          this.previousView = this.currentView;
          if (!((_ref = options.openOptions) != null ? _ref.skipSubmit : void 0)) {
            if ((typeof (_base = this.previousView).beforeSubmit === "function" ? _base.beforeSubmit(e) : void 0) === false) {
              return;
            }
            if (typeof (_base1 = this.previousView).submit === "function") {
              _base1.submit();
            }
          }
        }
        this.currentView = instance.view || instance.el;
        index = 0;
        for (key in this.views) {
          if (options.view === this.views[key].view) {
            this.currentIndex = index;
          }
          index++;
        }
        if (options.onActive) {
          if (_.isFunction(options.onActive)) {
            options.onActive(this);
          } else if (_.isString(options.onActive)) {
            this[options.onActive].call(this, options);
          }
        }
        if (this.shouldAnimate) {
          return this.animateToView(instance.el);
        } else {
          this.shouldAnimate = true;
          return this.$(this.viewContainerEl).html(instance.el);
        }
      };

      Modal.prototype.animateToView = function(view) {
        var container, newHeight, previousHeight, style, tester, _base, _ref;
        style = {
          position: 'relative',
          top: -9999,
          left: -9999
        };
        tester = Backbone.$('<tester/>').css(style);
        tester.html(this.$el.clone().css(style));
        if (Backbone.$('tester').length !== 0) {
          Backbone.$('tester').replaceWith(tester);
        } else {
          Backbone.$('body').append(tester);
        }
        if (this.viewContainer) {
          container = tester.find(this.viewContainer);
        } else {
          container = tester.find("." + this.prefix + "-modal");
        }
        container.removeAttr('style');
        previousHeight = container.outerHeight();
        container.html(view);
        newHeight = container.outerHeight();
        if (previousHeight === newHeight) {
          this.$(this.viewContainerEl).html(view);
          if (typeof (_base = this.currentView).onShow === "function") {
            _base.onShow();
          }
          return (_ref = this.previousView) != null ? typeof _ref.destroy === "function" ? _ref.destroy() : void 0 : void 0;
        } else {
          if (this.animate) {
            this.$(this.viewContainerEl).css({
              opacity: 0
            });
            return this.$(this.viewContainerEl).animate({
              height: newHeight
            }, 100, (function(_this) {
              return function() {
                var _base1, _ref1;
                _this.$(_this.viewContainerEl).css({
                  opacity: 1
                }).removeAttr('style');
                _this.$(_this.viewContainerEl).html(view);
                if (typeof (_base1 = _this.currentView).onShow === "function") {
                  _base1.onShow();
                }
                return (_ref1 = _this.previousView) != null ? typeof _ref1.destroy === "function" ? _ref1.destroy() : void 0 : void 0;
              };
            })(this));
          } else {
            return this.$(this.viewContainerEl).css({
              height: newHeight
            }).html(view);
          }
        }
      };

      Modal.prototype.triggerSubmit = function(e) {
        var _ref, _ref1;
        if (e != null) {
          e.preventDefault();
        }
        if (Backbone.$(e.target).is('textarea')) {
          return;
        }
        if (this.beforeSubmit) {
          if (this.beforeSubmit(e) === false) {
            return;
          }
        }
        if (this.currentView && this.currentView.beforeSubmit) {
          if (this.currentView.beforeSubmit(e) === false) {
            return;
          }
        }
        if (!this.submit && !((_ref = this.currentView) != null ? _ref.submit : void 0) && !this.getOption('submitEl')) {
          return this.triggerCancel();
        }
        if ((_ref1 = this.currentView) != null) {
          if (typeof _ref1.submit === "function") {
            _ref1.submit();
          }
        }
        if (typeof this.submit === "function") {
          this.submit();
        }
        if (this.regionEnabled) {
          return this.trigger('modal:destroy');
        } else {
          return this.destroy();
        }
      };

      Modal.prototype.triggerCancel = function(e) {
        if (e != null) {
          e.preventDefault();
        }
        if (this.beforeCancel) {
          if (this.beforeCancel() === false) {
            return;
          }
        }
        if (typeof this.cancel === "function") {
          this.cancel();
        }
        if (this.regionEnabled) {
          return this.trigger('modal:destroy');
        } else {
          return this.destroy();
        }
      };

      Modal.prototype.destroy = function() {
        var removeViews;
        Backbone.$('body').off('keyup.bbm', this.checkKey);
        this.$el.off('mouseup.bbm', this.clickOutsideElement);
        this.$el.off('click.bbm', this.clickOutside);
        Backbone.$('tester').remove();
        if (typeof this.onDestroy === "function") {
          this.onDestroy();
        }
        this.shouldAnimate = false;
        this.modalEl.addClass("" + this.prefix + "-modal--destroy");
        removeViews = (function(_this) {
          return function() {
            var _ref;
            if ((_ref = _this.currentView) != null) {
              if (typeof _ref.remove === "function") {
                _ref.remove();
              }
            }
            return _this.remove();
          };
        })(this);
        if (this.$el.fadeOut && this.animate) {
          this.$el.fadeOut({
            duration: 200
          });
          return _.delay(function() {
            return removeViews();
          }, 200);
        } else {
          return removeViews();
        }
      };

      Modal.prototype.openAt = function(options) {
        var atIndex, attr, i, key, view;
        if (_.isNumber(options)) {
          atIndex = options;
        } else if (_.isNumber(options._index)) {
          atIndex = options._index;
        }
        i = 0;
        for (key in this.views) {
          if (key !== 'length') {
            if (_.isNumber(atIndex)) {
              if (i === atIndex) {
                view = this.views[key];
              }
              i++;
            } else if (_.isObject(options)) {
              for (attr in this.views[key]) {
                if (options[attr] === this.views[key][attr]) {
                  view = this.views[key];
                }
              }
            }
          }
        }
        if (view) {
          this.currentIndex = _.indexOf(this.views, view);
          this.triggerView({
            data: _.extend(view, {
              openOptions: options
            })
          });
        }
        return this;
      };

      Modal.prototype.next = function(options) {
        if (options == null) {
          options = {};
        }
        if (this.currentIndex + 1 < this.views.length) {
          return this.openAt(_.extend(options, {
            _index: this.currentIndex + 1
          }));
        }
      };

      Modal.prototype.previous = function(options) {
        if (options == null) {
          options = {};
        }
        if (this.currentIndex - 1 < this.views.length - 1) {
          return this.openAt(_.extend(options, {
            _index: this.currentIndex - 1
          }));
        }
      };

      return Modal;

    })(Backbone.View);
    Backbone.Modal = Modal;
    return Backbone.Modal;
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function(factory) {
    if (typeof define === "function" && define.amd) {
      return define(["underscore", "backbone", "backbone.marionette", "exports"], factory);
    } else if (typeof exports === "object") {
      return factory(require("underscore"), require("backbone"), require("backbone.marionette"), exports);
    } else {
      return factory(_, Backbone, Backbone.Marionette, {});
    }
  })(function(_, Backbone, Marionette, Modals) {
    Modals = (function(_super) {
      __extends(Modals, _super);

      function Modals() {
        this.destroy = __bind(this.destroy, this);
        return Modals.__super__.constructor.apply(this, arguments);
      }

      Modals.prototype.modals = [];

      Modals.prototype.zIndex = 0;

      Modals.prototype.show = function(view, options) {
        var lastModal, modalView, secondLastModal, _i, _j, _len, _len1, _ref, _ref1;
        if (options == null) {
          options = {};
        }
        this._ensureElement();
        Backbone.$('body').css({
          overflow: 'hidden'
        });
        if (this.modals.length > 0) {
          lastModal = _.last(this.modals);
          lastModal.modalEl.addClass("" + lastModal.prefix + "-view--stacked");
          secondLastModal = this.modals[this.modals.length - 1];
          if (secondLastModal != null) {
            secondLastModal.modalEl.removeClass("" + secondLastModal.prefix + "-modal--stacked-reverse");
          }
        }
        view.render(options);
        view.regionEnabled = true;
        this.triggerMethod('before:swap', view);
        this.triggerMethod('before:show', view);
        Marionette.triggerMethodOn(view, 'before:show');
        this.triggerMethod('swapOut', this.currentView);
        this.$el.append(view.el);
        this.currentView = view;
        this.triggerMethod('swap', view);
        _ref = this.modals;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          modalView = _ref[_i];
          modalView.undelegateModalEvents();
        }
        _ref1 = this.modals;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          modalView = _ref1[_j];
          modalView.$el.css({
            background: 'none'
          });
        }
        view.on('modal:destroy', this.destroy);
        this.modals.push(view);
        return this.zIndex++;
      };

      Modals.prototype.destroy = function() {
        var lastModal, view;
        view = this.currentView;
        if (!view) {
          return;
        }
        if (view.destroy && !view.isDestroyed) {
          view.destroy();
        } else if (view.remove) {
          view.remove();
        }
        view.off('modal:destroy', this.destroy);
        this.modals.splice(_.indexOf(this.modals, view), 1);
        this.zIndex--;
        this.currentView = this.modals[this.zIndex - 1];
        lastModal = _.last(this.modals);
        if (lastModal) {
          lastModal.$el.removeAttr('style');
          lastModal.modalEl.addClass("" + lastModal.prefix + "-modal--stacked-reverse");
          _.delay((function(_this) {
            return function() {
              return lastModal.modalEl.removeClass("" + lastModal.prefix + "-modal--stacked");
            };
          })(this), 300);
          if (this.zIndex !== 0) {
            lastModal.delegateModalEvents();
          }
        }
        if (this.zIndex === 0) {
          Backbone.$('body').css({
            overflow: 'visible'
          });
        }
        return this.triggerMethod('modal:destroy', view);
      };

      Modals.prototype.destroyAll = function() {
        var view, _i, _len, _ref, _results;
        _ref = this.modals;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          _results.push(this.destroy());
        }
        return _results;
      };

      return Modals;

    })(Marionette.Region);
    Marionette.Modals = Modals;
    return Marionette.Modals;
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  if (typeof Backbone === "undefined" || Backbone === null) {
    throw new Error("Backbone is not defined. Please include the latest version from http://documentcloud.github.com/backbone/backbone.js");
  }

  Backbone.Modal = (function(_super) {
    __extends(Modal, _super);

    Modal.prototype.prefix = 'bbm';

    function Modal() {
      this.triggerCancel = __bind(this.triggerCancel, this);
      this.triggerSubmit = __bind(this.triggerSubmit, this);
      this.triggerView = __bind(this.triggerView, this);
      this.clickOutside = __bind(this.clickOutside, this);
      this.checkKey = __bind(this.checkKey, this);
      this.args = Array.prototype.slice.apply(arguments);
      Backbone.View.prototype.constructor.apply(this, this.args);
      this.setUIElements();
      this.delegateModalEvents();
    }

    Modal.prototype.render = function(options) {
      var data, _ref,
        _this = this;
      if (options == null) {
        options = {};
      }
      data = this.serializeData();
      this.$el.addClass("" + this.prefix + "-wrapper");
      this.modalEl = Backbone.$('<div />').addClass("" + this.prefix + "-modal");
      if (this.template) {
        this.modalEl.html(this.template(data));
      }
      this.$el.html(this.modalEl);
      Backbone.$('body').on('keyup', this.checkKey);
      Backbone.$('body').on('click', this.clickOutside);
      if (this.viewContainer) {
        this.viewContainerEl = this.modalEl.find(this.viewContainer);
        this.viewContainerEl.addClass("" + this.prefix + "-modal__views");
      } else {
        this.viewContainerEl = this.modalEl;
      }
      this.$el.show();
      if (((_ref = this.views) != null ? _ref.length : void 0) > 0) {
        this.openAt(0);
      }
      if (typeof this.onRender === "function") {
        this.onRender();
      }
      this.modalEl.css({
        opacity: 0
      });
      this.$el.fadeIn({
        duration: 100,
        complete: function() {
          return _this.modalEl.css({
            opacity: 1
          }).addClass("" + _this.prefix + "-modal--open");
        }
      });
      return this;
    };

    Modal.prototype.setUIElements = function() {
      var _ref;
      this.template = this.getOption('template');
      this.views = this.getOption('views');
      if ((_ref = this.views) != null) {
        _ref.length = _.size(this.views);
      }
      this.viewContainer = this.getOption('viewContainer');
      this.$el.hide();
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
        if (key !== 'length') {
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
        if (key !== 'length') {
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
            return this.triggerCancel();
          case 13:
            return this.triggerSubmit();
        }
      }
    };

    Modal.prototype.clickOutside = function(e) {
      if (Backbone.$(e.target).hasClass("" + this.prefix + "-wrapper") && this.active) {
        return this.triggerCancel(null, true);
      }
    };

    Modal.prototype.buildView = function(viewType) {
      var view;
      if (!viewType) {
        return;
      }
      if (_.isFunction(viewType)) {
        view = new viewType(this.args[0]);
        if (view instanceof Backbone.View) {
          return {
            el: view.render().$el,
            view: view
          };
        } else {
          return {
            el: viewType(this.args[0])
          };
        }
      }
      return {
        view: viewType,
        el: viewType.$el
      };
    };

    Modal.prototype.triggerView = function(e) {
      var index, instance, key, options;
      if (e != null) {
        if (typeof e.preventDefault === "function") {
          e.preventDefault();
        }
      }
      options = e.data;
      instance = this.buildView(options.view);
      if (this.currentView) {
        this.previousView = this.currentView;
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
      var container, newHeight, previousHeight, style, tester, _ref,
        _this = this;
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
        return (_ref = this.previousView) != null ? typeof _ref.close === "function" ? _ref.close() : void 0 : void 0;
      } else {
        this.$(this.viewContainerEl).css({
          opacity: 0
        });
        return this.$(this.viewContainerEl).animate({
          height: newHeight
        }, 100, function() {
          var _ref1;
          _this.$(_this.viewContainerEl).css({
            opacity: 1
          }).removeAttr('style');
          _this.$(_this.viewContainerEl).html(view);
          return (_ref1 = _this.previousView) != null ? typeof _ref1.close === "function" ? _ref1.close() : void 0 : void 0;
        });
      }
    };

    Modal.prototype.triggerSubmit = function(e) {
      if (!e) {
        return;
      }
      if (e != null) {
        e.preventDefault();
      }
      if (this.beforeSubmit) {
        if (this.beforeSubmit() === false) {
          return;
        }
      }
      if (typeof this.submit === "function") {
        this.submit();
      }
      if (this.regionEnabled) {
        return this.trigger('modal:close');
      } else {
        return this.close();
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
        return this.trigger('modal:close');
      } else {
        return this.close();
      }
    };

    Modal.prototype.close = function() {
      var _this = this;
      Backbone.$('body').off('keyup', this.checkKey);
      Backbone.$('body').off('click', this.clickOutside);
      if (typeof this.onClose === "function") {
        this.onClose();
      }
      this.shouldAnimate = false;
      this.modalEl.addClass("" + this.prefix + "-modal--close");
      this.$el.fadeOut({
        duration: 200
      });
      return _.delay(function() {
        var _ref;
        if ((_ref = _this.currentView) != null) {
          if (typeof _ref.remove === "function") {
            _ref.remove();
          }
        }
        return _this.remove();
      }, 200);
    };

    Modal.prototype.openAt = function(index) {
      var i, key, view;
      i = 0;
      for (key in this.views) {
        if (key !== 'length') {
          if (i === index) {
            view = this.views[key];
          }
          i++;
        }
      }
      if (view) {
        this.currentIndex = index;
        this.triggerView({
          data: view
        });
      }
      return this;
    };

    Modal.prototype.next = function() {
      if (this.currentIndex + 1 < this.views.length) {
        return this.openAt(this.currentIndex + 1);
      }
    };

    Modal.prototype.previous = function() {
      if (this.currentIndex - 1 < this.views.length - 1) {
        return this.openAt(this.currentIndex - 1);
      }
    };

    return Modal;

  })(Backbone.View);

}).call(this);

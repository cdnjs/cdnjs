(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function(root, factory) {
    if (typeof define === "function" && define.amd) {
      return define(["exports", "underscore", "backbone", "backbone.marionette"], factory);
    } else if (typeof exports === "object") {
      return factory(exports, require("underscore"), require("backbone"), require("backbone.marionette"));
    } else {
      return root.Backbone.Marionette.Modals = factory((root.commonJsStrict = {}), root._, root.Backbone, root.Backbone.Marionette);
    }
  })(this, function(exports, _, Backbone, Marionette) {
    var Modals;
    return Modals = (function(_super) {
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
        if (this.modals.length > 0) {
          lastModal = _.last(this.modals);
          lastModal.modalEl.addClass("" + lastModal.prefix + "-view--stacked");
          secondLastModal = this.modals[this.modals.length - 1];
          if (secondLastModal != null) {
            secondLastModal.modalEl.removeClass("" + secondLastModal.prefix + "-modal--stacked-reverse");
          }
        }
        view.render();
        view.regionEnabled = true;
        this.triggerMethod('before:swap', view);
        this.triggerMethod('before:show', view);
        Marionette.triggerMethodOn(view, 'before:show');
        this.triggerMethod('swapOut', this.currentView);
        this.$el.append(view.el);
        this.currentView = view;
        this.triggerMethod('swap', view);
        this.triggerMethod('show', view);
        Marionette.triggerMethodOn(view, 'show');
        if (this.modals.length > 0) {
          _ref = this.modals;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            modalView = _ref[_i];
            modalView.$el.css({
              background: 'none'
            });
          }
        }
        _ref1 = this.modals;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          modalView = _ref1[_j];
          modalView.undelegateModalEvents();
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
            return lastModal.delegateModalEvents();
          }
        }
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
  });

}).call(this);

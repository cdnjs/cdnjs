angular.module("mobile-angular-ui.directives.capture", []).run([
  "CaptureService", "$rootScope", function(CaptureService, $rootScope) {
    return $rootScope.$on('$routeChangeStart', function() {
      return CaptureService.resetAll();
    });
  }
]).factory("CaptureService", [
  "$compile", function($compile) {
    var yielders;
    yielders = {};
    return {
      resetAll: function() {
        var name, yielder, _results;
        _results = [];
        for (name in yielders) {
          yielder = yielders[name];
          _results.push(this.resetYielder(name));
        }
        return _results;
      },
      resetYielder: function(name) {
        var b;
        b = yielders[name];
        return this.setContentFor(name, b.defaultContent, b.defaultScope);
      },
      putYielder: function(name, element, defaultScope, defaultContent) {
        var yielder;
        yielder = yielders[name] = {};
        yielder.name = name;
        yielder.element = element;
        yielder.defaultContent = defaultContent || "";
        return yielder.defaultScope = defaultScope;
      },
      getYielder: function(name) {
        return yielders[name];
      },
      removeYielder: function(name) {
        return delete yielders[name];
      },
      setContentFor: function(name, content, scope) {
        var b;
        b = yielders[name];
        if (!b) {
          return;
        }
        b.element.html(content);
        return $compile(b.element.contents())(scope);
      }
    };
  }
]).directive("contentFor", [
  "CaptureService", function(CaptureService) {
    return {
      link: function(scope, elem, attrs) {
        CaptureService.setContentFor(attrs.contentFor, elem.html(), scope);
        if (attrs.duplicate == null) {
          return elem.remove();
        } else {
          return elem;
        }
      }
    };
  }
]).directive("yieldTo", [
  "$compile", "CaptureService", function($compile, CaptureService) {
    return {
      link: function(scope, element, attr) {
        CaptureService.putYielder(attr.yieldTo, element, scope, element.html());
        return element.contents().remove();
      }
    };
  }
]);

angular.module('mobile-angular-ui.directives.carousel', []).run([
  "$rootScope", function($rootScope) {
    var carouselItems, findActiveItemIndex;
    $rootScope.carouselPrev = function(id) {
      return $rootScope.$emit("mobile-angular-ui.carousel.prev", id);
    };
    $rootScope.carouselNext = function(id) {
      return $rootScope.$emit("mobile-angular-ui.carousel.next", id);
    };
    carouselItems = function(id) {
      var elem;
      elem = angular.element(document.getElementById(id));
      return angular.element(elem.children()[0]).children();
    };
    findActiveItemIndex = function(items) {
      var found, idx, item, _i, _len;
      idx = -1;
      found = false;
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        idx += 1;
        if (angular.element(item).hasClass('active')) {
          found = true;
          break;
        }
      }
      if (found) {
        return idx;
      } else {
        return -1;
      }
    };
    $rootScope.$on("mobile-angular-ui.carousel.prev", function(e, id) {
      var idx, items, lastIdx;
      items = carouselItems(id);
      idx = findActiveItemIndex(items);
      lastIdx = items.length - 1;
      if (idx !== -1) {
        angular.element(items[idx]).removeClass("active");
      }
      if (idx <= 0) {
        return angular.element(items[lastIdx]).addClass("active");
      } else {
        return angular.element(items[idx - 1]).addClass("active");
      }
    });
    return $rootScope.$on("mobile-angular-ui.carousel.next", function(e, id) {
      var idx, items, lastIdx;
      items = carouselItems(id);
      idx = findActiveItemIndex(items);
      lastIdx = items.length - 1;
      if (idx !== -1) {
        angular.element(items[idx]).removeClass("active");
      }
      if (idx === lastIdx) {
        return angular.element(items[0]).addClass("active");
      } else {
        return angular.element(items[idx + 1]).addClass("active");
      }
    });
  }
]);

angular.module('mobile-angular-ui.directives.forms', []).directive("bsInput", function() {
  return {
    replace: true,
    require: "ngModel",
    link: function(scope, elem, attrs) {
      var ll, w1, w2, w3, _ref;
      if (attrs.id == null) {
        attrs.id = attrs.ngModel.replace(".", "_") + "_input";
      }
      if ((_ref = attrs.type) !== "checkbox" && _ref !== "radio") {
        elem.addClass("form-control");
      }
      ll = angular.element("<label for=\"" + attrs.id + "\" class=\"control-label col-sm-2\">" + attrs.label + "</label>");
      w1 = angular.element("<div class=\"form-group container-fluid\"></div>");
      w2 = angular.element("<div class=\"row\"></div>");
      w3 = angular.element("<div class=\"col-sm-10\"></div>");
      elem.wrap(w1).wrap(w2).wrap(w3);
      return w2.prepend(ll);
    }
  };
}).directive("switch", function() {
  return {
    restrict: "EA",
    replace: true,
    scope: {
      model: "=ngModel",
      disabled: "@"
    },
    template: "<div class=\"switch\" ng-click=\"toggle()\" ng-class=\"{ 'active': model }\">\n    <div class=\"switch-handle\"></div>\n</div>",
    link: function(scope, elem, attrs) {
      var toggle;
      scope.toggle = toggle = function() {
        if (attrs.disabled == null) {
          return scope.model = !scope.model;
        }
      };
      return setTimeout((function() {
        return elem.addClass('switch-transition-enabled');
      }), 200);
    }
  };
});

angular.module('mobile-angular-ui.directives.navbars', []).directive('navbarAbsoluteTop', function() {
  return {
    replace: false,
    restrict: "C",
    link: function(scope, elem, attrs) {
      return elem.parent().addClass('has-navbar-top');
    }
  };
}).directive('navbarAbsoluteBottom', function() {
  return {
    replace: false,
    restrict: "C",
    link: function(scope, elem, attrs) {
      return elem.parent().addClass('has-navbar-bottom');
    }
  };
});

angular.module('mobile-angular-ui.directives.overlay', []).directive('overlay', [
  "$compile", function($compile) {
    return {
      link: function(scope, elem, attrs) {
        var body, html, id, sameId;
        body = elem.html();
        id = attrs.overlay;
        html = "<div class=\"overlay\" id=\"" + id + "\" toggleable parent-active-class=\"overlay-in\" active-class=\"overlay-show\">\n  <div class=\"overlay-inner\">\n    <div class=\"overlay-background\"></div>\n    <a href=\"#" + id + "\" toggle=\"off\" class=\"overlay-dismiss\">\n      <i class=\"fa fa-times-circle-o\"></i>\n    </a>\n    <div class=\"overlay-content\">\n      <div class=\"overlay-body\">\n        " + body + "\n      </div>\n    </div>\n  </div>\n</div>";
        elem.remove();
        sameId = angular.element(document.getElementById(id));
        if (sameId.length > 0 && sameId.hasClass('overlay')) {
          sameId.remove();
        }
        return angular.element(document.body).prepend($compile(html)(scope));
      }
    };
  }
]);

angular.module("mobile-angular-ui.directives.panels", []).directive("bsPanel", function() {
  return {
    restrict: 'EA',
    replace: true,
    scope: false,
    transclude: true,
    link: function(scope, elem, attrs) {
      return elem.removeAttr('title');
    },
    template: function(elems, attrs) {
      var heading;
      heading = "";
      if (attrs.title) {
        heading = "<div class=\"panel-heading\">\n  <h2 class=\"panel-title\">\n    " + attrs.title + "\n  </h2>\n</div>";
      }
      return "<div class=\"panel\">\n  " + heading + "\n  <div class=\"panel-body\">\n     <div ng-transclude></div>\n  </div>\n</div>";
    }
  };
});

angular.module('mobile-angular-ui.directives.sidebars', []).directive('sidebarLeft', function() {
  return {
    replace: false,
    restrict: "C",
    link: function(scope, elem, attrs) {
      return elem.parent().addClass('has-sidebar-left');
    }
  };
}).directive('sidebarRight', function() {
  return {
    replace: false,
    restrict: "C",
    link: function(scope, elem, attrs) {
      return elem.parent().addClass('has-sidebar-right');
    }
  };
});

(function() {
  var Toggle, Toggleable, Toggler;
  Toggle = {
    moduleName: "mobile-angular-ui.directives.toggle",
    events: {
      toggle: "mobile-angular-ui.toggle.toggle",
      toggleByClass: "mobile-angular-ui.toggle.toggleByClass",
      togglerLinked: "mobile-angular-ui.toggle.linked",
      toggleableToggled: "mobile-angular-ui.toggle.toggled"
    },
    commands: {
      alternate: "toggle",
      activate: "on",
      deactivate: "off"
    },
    helpers: {
      updateElemClasses: function(elem, attrs, active) {
        var parent;
        if (active) {
          if (attrs.activeClass) {
            elem.addClass(attrs.activeClass);
          }
          if (attrs.inactiveClass) {
            elem.removeClass(attrs.inactiveClass);
          }
          parent = elem.parent();
          if (attrs.parentActiveClass) {
            parent.addClass(attrs.parentActiveClass);
          }
          if (attrs.parentInactiveClass) {
            return parent.removeClass(attrs.parentInactiveClass);
          }
        } else {
          if (attrs.inactiveClass) {
            elem.addClass(attrs.inactiveClass);
          }
          if (attrs.activeClass) {
            elem.removeClass(attrs.activeClass);
          }
          parent = elem.parent();
          if (attrs.parentInactiveClass) {
            parent.addClass(attrs.parentInactiveClass);
          }
          if (attrs.parentActiveClass) {
            return parent.removeClass(attrs.parentActiveClass);
          }
        }
      }
    }
  };
  Toggler = (function() {
    function Toggler(scope, elem, attrs) {
      var _ref;
      this.scope = scope;
      this.elem = elem;
      this.attrs = attrs;
      this.command = this.attrs.toggle || Toggle.commands.alternate;
      this.target = this.attrs.target;
      this.targetClass = this.attrs.targetClass;
      this.rootScope = this.scope;
      this.bubble = (_ref = this.attrs.bubble) === "true" || _ref === "1" || _ref === 1 || _ref === "" || _ref === "bubble";
      if ((!this.target) && this.attrs.href) {
        this.target = this.attrs.href.slice(1);
      }
      if (!(this.target || this.targetClass)) {
        throw "'target' or 'target-class' attribute required with 'toggle'";
      }
    }

    Toggler.prototype.toggle = function() {
      return this.rootScope.toggle(this.target, this.command);
    };

    Toggler.prototype.toggleByClass = function() {
      return this.rootScope.toggleByClass(this.targetClass, this.command);
    };

    Toggler.prototype.hasTarget = function() {
      return !!this.target;
    };

    Toggler.prototype.hasTargetClass = function() {
      return !!this.targetClass;
    };

    Toggler.prototype.fireTogglerLinked = function() {
      if (this.hasTarget()) {
        return this.rootScope.$emit(Toggle.events.togglerLinked, this.target);
      }
    };

    Toggler.prototype.link = function() {
      var _this = this;
      this.elem.on("click tap", function(e) {
        if (!_this.elem.hasClass("disabled")) {
          if (_this.hasTarget()) {
            _this.toggle();
          }
          if (_this.hasTargetClass()) {
            _this.toggleByClass();
          }
          if (!_this.bubble) {
            e.preventDefault();
            return false;
          } else {
            return true;
          }
        }
      });
      this.scope.$on(Toggle.events.toggleableToggled, function(e, id, newState) {
        if (id === _this.target) {
          return Toggle.helpers.updateElemClasses(_this.elem, _this.attrs, newState);
        }
      });
      return this.fireTogglerLinked();
    };

    return Toggler;

  })();
  Toggleable = (function() {
    function Toggleable(scope, elem, attrs) {
      this.scope = scope;
      this.elem = elem;
      this.attrs = attrs;
      this.id = this.attrs.id;
      this.exclusionGroup = this.attrs.exclusionGroup;
      this.toggleState = false;
      this["default"] = this.attrs["default"];
      this.rootScope = this.scope.$root;
    }

    Toggleable.prototype.setToggleState = function(value) {
      if (value !== this.toggleState) {
        return this.toggleState = value;
      }
    };

    Toggleable.prototype.getToggleState = function() {
      return !!this.toggleState;
    };

    Toggleable.prototype.notifyToggleState = function() {
      return this.rootScope.$emit(Toggle.events.toggleableToggled, this.id, this.getToggleState(), this.exclusionGroup);
    };

    Toggleable.prototype.toggleStateChanged = function() {
      Toggle.helpers.updateElemClasses(this.elem, this.attrs, this.getToggleState());
      return this.notifyToggleState();
    };

    Toggleable.prototype.runCommand = function(command) {
      var oldState;
      oldState = this.getToggleState();
      switch (command) {
        case Toggle.commands.activate:
          this.setToggleState(true);
          break;
        case Toggle.commands.deactivate:
          this.setToggleState(false);
          break;
        case Toggle.commands.alternate:
          this.setToggleState(!this.getToggleState());
      }
      if (oldState !== this.getToggleState()) {
        return this.toggleStateChanged();
      }
    };

    Toggleable.prototype.link = function() {
      var _this = this;
      if (this["default"]) {
        switch (this["default"]) {
          case "active":
            this.setToggleState(true);
            break;
          case "inactive":
            this.setToggleState(false);
        }
        this.toggleStateChanged();
      }
      this.scope.$on(Toggle.events.toggle, function(e, target, command) {
        if (target === _this.id) {
          return _this.runCommand(command);
        }
      });
      this.scope.$on(Toggle.events.toggleByClass, function(e, targetClass, command) {
        if (_this.elem.hasClass(targetClass)) {
          return _this.runCommand(command);
        }
      });
      this.scope.$on(Toggle.events.toggleableToggled, function(e, target, newState, sameGroup) {
        if (newState && (_this.id !== target) && (_this.exclusionGroup === sameGroup) && (_this.exclusionGroup != null)) {
          _this.setToggleState(false);
          return _this.toggleStateChanged();
        }
      });
      return this.scope.$on(Toggle.events.togglerLinked, function(e, target) {
        if (_this.id === target) {
          return _this.notifyToggleState();
        }
      });
    };

    return Toggleable;

  })();
  return angular.module(Toggle.moduleName, []).run([
    "$rootScope", function($rootScope) {
      $rootScope.toggle = function(target, command) {
        if (command == null) {
          command = "toggle";
        }
        return $rootScope.$emit(Toggle.events.toggle, target, command);
      };
      return $rootScope.toggleByClass = function(targetClass, command) {
        if (command == null) {
          command = "toggle";
        }
        return $rootScope.$emit(Toggle.events.toggleByClass, targetClass, command);
      };
    }
  ]).directive('toggle', [
    "$rootScope", function($rootScope) {
      return {
        restrict: "A",
        link: function(scope, elem, attrs) {
          var toggler;
          toggler = new Toggler($rootScope, elem, attrs);
          return toggler.link();
        }
      };
    }
  ]).directive('toggleable', [
    "$rootScope", function($rootScope) {
      return {
        restrict: "A",
        link: function(scope, elem, attrs) {
          var toggleable;
          toggleable = new Toggleable($rootScope, elem, attrs);
          return toggleable.link();
        }
      };
    }
  ]);
})();

angular.module("mobile-angular-ui.active-links", []).run([
  "$rootScope", function($rootScope) {
    return angular.forEach(["$locationChangeSuccess", "$includeContentLoaded"], function(evtName) {
      return $rootScope.$on(evtName, function() {
        var newPath;
        newPath = window.location.href;
        return angular.forEach(document.links, function(domLink) {
          var link;
          link = angular.element(domLink);
          if (domLink.href === newPath) {
            return link.addClass("active");
          } else {
            return link.removeClass("active");
          }
        });
      });
    });
  }
]);

angular.module('mobile-angular-ui.pointer-events', []).run([
  '$document', function($document) {
    return angular.element($document).on("click tap", function(e) {
      var target;
      target = angular.element(e.target);
      if (target.hasClass("disabled")) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      } else {
        return true;
      }
    });
  }
]);

angular.module("mobile-angular-ui", ['mobile-angular-ui.pointer-events', 'mobile-angular-ui.active-links', 'mobile-angular-ui.directives.toggle', 'mobile-angular-ui.directives.overlay', 'mobile-angular-ui.directives.forms', 'mobile-angular-ui.directives.panels', 'mobile-angular-ui.directives.capture', 'mobile-angular-ui.directives.sidebars', 'mobile-angular-ui.directives.navbars', 'mobile-angular-ui.directives.carousel']);

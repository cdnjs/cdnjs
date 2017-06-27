(function() {
  'use strict';

  angular.module('mobile-angular-ui.migrate.carousel', [])

  .run(["$rootScope", function($rootScope) {
      
      $rootScope.carouselPrev = function(id) {
        $rootScope.$emit("mobile-angular-ui.carousel.prev", id);
      };
      
      $rootScope.carouselNext = function(id) {
        $rootScope.$emit("mobile-angular-ui.carousel.next", id);
      };
      
      var carouselItems = function(id) {
        var elem = angular.element(document.getElementById(id));
        var res = angular.element(elem.children()[0]).children();
        elem = null;
        return res;
      };

      var findActiveItemIndex = function(items) {
        var idx = -1;
        var found = false;

        for (var _i = 0; _i < items.length; _i++) {
          var item = items[_i];
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
        var items = carouselItems(id);
        var idx = findActiveItemIndex(items);
        var lastIdx = items.length - 1;

        if (idx !== -1) {
          angular.element(items[idx]).removeClass("active");
        }

        if (idx <= 0) {
          angular.element(items[lastIdx]).addClass("active");
        } else {
          angular.element(items[idx - 1]).addClass("active");
        }

        items = null;
        idx = null;
        lastIdx = null;
      });

      $rootScope.$on("mobile-angular-ui.carousel.next", function(e, id) {
        var items = carouselItems(id);
        var idx = findActiveItemIndex(items);
        var lastIdx = items.length - 1;
        
        if (idx !== -1) {
          angular.element(items[idx]).removeClass("active");
        }
        
        if (idx === lastIdx) {
          angular.element(items[0]).addClass("active");
        } else {
          angular.element(items[idx + 1]).addClass("active");
        }
        
        items = null;
        idx = null;
        lastIdx = null;
      });
    }
  ]);

}());

(function() {
  'use strict';

  angular.module('mobile-angular-ui.migrate.disabled', []).run([
    '$document', function($document) {
      return angular.element($document).on("click tap", function(e) {
        var target;
        target = angular.element(e.target);
        if (target.hasClass("disabled")) {
          e.preventDefault();
          e.stopPropagation();
          target = null;
          return false;
        } else {
          target = null;
          return true;
        }
      });
    }
  ]);

}());
(function() {
  'use strict';      

  var module = angular.module('mobile-angular-ui.migrate.forms', []);

  // 
  // Old form helpers
  // 
  module.directive("bsFormControl", function() {
    var bs_col_classes = {};
    var bs_col_sizes = ['xs', 'sm', 'md', 'lg'];
    
    for (var i = 0; i < bs_col_sizes.length; i++) {
      for (var j = 1; j <= 12; j++) {
        bs_col_classes['col-' + bs_col_sizes[i] + "-" + j] = true;
      }
    }
    
    function separeBsColClasses(clss) {
      var intersection = "";
      var difference = "";

      for (var i = 0; i < clss.length; i++) {
          var v = clss[i];
          if (v in bs_col_classes) { 
            intersection += (v + " "); 
          } else {
            difference += (v + " ");
          }
      }

      return {i: intersection.trim(), d: difference.trim()};
    }

    return {
      replace: true,
      require: "ngModel",
      link: function(scope, elem, attrs) {

        if (attrs.labelClass === null || attrs.labelClass === undefined) {
          attrs.labelClass = "";
        }

        if (attrs.id === null || attrs.id === undefined) {
          attrs.id = attrs.ngModel.replace(".", "_") + "_input";
        }
        
        if ((elem[0].tagName == "SELECT") || ((elem[0].tagName == "INPUT" || elem[0].tagName == "TEXTAREA") && (attrs.type != "checkbox" && attrs.type != "radio"))) {
          elem.addClass("form-control");
        }
        
        var label = angular.element("<label for=\"" + attrs.id + "\" class=\"control-label\">" + attrs.label + "</label>");
        var w1 = angular.element("<div class=\"form-group row\"></div>"); 
        var w2 = angular.element("<div class=\"form-control-wrapper\"></div>");
        
        var labelColClasses = separeBsColClasses(attrs.labelClass.split(/\s+/));
        if (labelColClasses.i === "") {
          label.addClass("col-xs-12");
        }
        label.addClass(attrs.labelClass);

        var elemColClasses = separeBsColClasses(elem[0].className.split(/\s+/));
        elem.removeClass(elemColClasses.i);
        w2.addClass(elemColClasses.i);
        if (elemColClasses.i === "") {
          w2.addClass("col-xs-12");
        }
        elem.wrap(w1).wrap(w2);
        elem.parent().parent().prepend(label);
        elem.attr('id', attrs.id);

        label = w1 = w2 = labelColClasses = elemColClasses = null;
      }
    };
  });

}());
(function() {
  'use strict';      

  var module = angular.module('mobile-angular-ui.migrate.namespaceAliases', []);

  var uncamelize = function(text) {
    var separator = "-";

    text = text.replace(/[A-Z]/g, function (letter) {
      return separator + letter.toLowerCase();
    });
   
    return text.replace("/^" + separator + "/", '');   
  };

  var aliasDirective = function(aliasName, targetDirective, options) {
    options = options || {};
    var beforeLink = options.beforeLink;
    var restrict = options.restrict || 'A';
    module.directive(aliasName, ['$compile', function($compile){
      return {
          restrict: restrict,

          // this should be higher than any other directives
          // declared for the same element
          priority: 99999,
          compile: function(elem, attrs){
            
            var placeholder = angular.element(document.createElement('div'));
            elem.after(placeholder);
            // Detach element until link phase 
            // so Angular wont go down to the children.
            elem.remove();

            var dasherizedTarget = uncamelize(targetDirective);
            var dasherizedAlias = uncamelize(aliasName);

            if (restrict.match(/A/)) {
              // Replace old attr with new attr
              elem.attr(dasherizedTarget, elem.attr(dasherizedAlias));
              elem.removeAttr(dasherizedAlias);
            }

            if (restrict.match(/E/)) {
              elem[0].name = dasherizedTarget;
            }
            
            if (beforeLink) {
              beforeLink(elem, attrs);
            }
            
            return function(scope){
              placeholder.replaceWith(elem);
              $compile(elem)(scope);
              elem = null;
            };
          }
      };
    }]);
  };

  aliasDirective('switch', 'uiSwitch');
  aliasDirective('contentFor', 'uiContentFor', {
    beforeLink: function(elem) {
      elem.attr('uiDuplicate', elem.attr('duplicate'));
    }
  });
  aliasDirective('yieldTo', 'uiYieldTo');
}());
(function() {
  'use strict';
  var module = angular.module('mobile-angular-ui.migrate.overlay', []);
  module.directive('overlay', ['$compile', function($compile) {
    
    return {
        compile: function(tElem, tAttrs) {
            var rawContent = tElem.html();
            tElem.remove();
            
            return function postLink(scope, elem, attrs) {
                var active = "";
                var body = rawContent;
                var id = attrs.overlay;

                if (attrs["default"]) {
                  active = "default='" + attrs["default"] + "'";
                }

                var html = "<div class=\"overlay\" id=\"" + id + "\" toggleable " + active + " active-class=\"overlay-show\">\n  <div class=\"overlay-inner\">\n    <div class=\"overlay-background\"></div>\n    <a href=\"#" + id + "\" toggle=\"off\" class=\"overlay-dismiss\">\n      <i class=\"fa fa-times-circle-o\"></i>\n    </a>\n    <div class=\"overlay-content\">\n      <div class=\"overlay-body\">\n        " + body + "\n      </div>\n    </div>\n  </div>\n</div>";

                var sameId = angular.element(document.getElementById(id));

                if (sameId.length > 0 && sameId.hasClass('overlay')) {
                  sameId.remove();
                }

                body = angular.element(document.body);
                body.prepend($compile(html)(scope));

                if (attrs["default"] === "active") {
                  body.addClass('overlay-in');
                }
            };
        }
    };  

  }]);
}());
(function() {
  'use strict';      

  var module = angular.module('mobile-angular-ui.migrate.panels', []);

  // 
  // Old panel helpers
  //
  module.directive("bsPanel", function() {
    return {
      restrict: 'EA',
      replace: true,
      scope: false,
      transclude: true,
      link: function(scope, elem, attrs) {
        elem.removeAttr('title');
      },
      template: function(elems, attrs) {
        var heading = "";
        if (attrs.title) {
          heading = "<div class=\"panel-heading\">\n  <h2 class=\"panel-title\">\n    " + attrs.title + "\n  </h2>\n</div>";
        }
        return "<div class=\"panel\">\n  " + heading + "\n  <div class=\"panel-body\">\n     <div ng-transclude></div>\n  </div>\n</div>";
      }
    };
  });

}());
(function() {
  'use strict';  
  angular.module('mobile-angular-ui.migrate.switch', [])
  .directive("switch", function() {
    return {
      restrict: "EA",
      replace: true,
      scope: {
        model: "=ngModel",
        changeExpr: "@ngChange",
        disabled: "@"
      },
      template: "<div class='switch' ng-class='{active: model}'><div class='switch-handle'></div></div>",
      link: function(scope, elem, attrs) {

        elem.on('click tap', function(){
          if (attrs.disabled === null || attrs.disabled === undefined) {
            scope.model = !scope.model;
            scope.$apply();

            if (scope.changeExpr !== null && scope.changeExpr !== undefined) {
              scope.$parent.$eval(scope.changeExpr);
            }
          }
        });

        elem.addClass('switch-transition-enabled');
      }
    };
  });
}());
(function() {
  'use strict';      

  var module = angular.module('mobile-angular-ui.migrate.toggle', ['mobile-angular-ui.core.sharedState']);

  // Note!
  // This is an adaptation of 1.1 toggle/toggleable interface for SharedState service,
  // although this should fit the most common uses it is not 100% backward compatible.
  // 
  // Differences are:
  // - toggleByClass behaviour is not supported
  // - toggleByClass/togglerLinked/toggle events are not supported
  // 
  module.directive('toggle', ['SharedState',function(SharedState) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        var exclusionGroup        =  attrs.exclusionGroup,
            command               =  attrs.toggle || 'toggle',
            bubble                =  attrs.bubble !== undefined && attrs.bubble !== 'false',
            activeClass           =  attrs.activeClass,
            inactiveClass         =  attrs.inactiveClass,
            parentActiveClass     =  attrs.parentActiveClass,
            parentInactiveClass   =  attrs.parentInactiveClass,
            parent                =  elem.parent(),
            id                    =  attrs.target;

        if ((!id) && attrs.href) {
          id = attrs.href.slice(1);
        }

        if (!id) {
          throw new Error('Toggle directive requires "target" attribute to be set. If you are using toggleByClass yet be aware that is not supported by migration version of toggle.\nPlease switch to ui-* directives instead.');
        }

        var setupClasses = function(value) {
          if (value) {
            if (parentActiveClass) { parent.addClass(parentActiveClass); }
            if (activeClass) { elem.addClass(activeClass); }
            if (parentInactiveClass) { parent.removeClass(parentInactiveClass); }
            if (inactiveClass) { elem.removeClass(inactiveClass); }            
          } else {
            if (parentActiveClass) { parent.removeClass(parentActiveClass); }
            if (activeClass) { elem.removeClass(activeClass); }
            if (parentInactiveClass) { parent.addClass(parentInactiveClass); }
            if (inactiveClass) { elem.addClass(inactiveClass); }
          }
        };

        scope.$on('mobile-angular-ui.state.changed.' + id, function(evt, value) {
          setupClasses(value);
        });

        setupClasses(SharedState.get('id'));

        elem.on("click tap", function(e) {
          if (!scope.$$phase) {
            scope.$apply(function() {
              if (command === 'on') {
                SharedState.turnOn(id);
              } else if (command === 'off') {
                SharedState.turnOff(id);
              } else {
                SharedState.toggle(id);
              }
            });
          }

          if (!bubble) {
            e.preventDefault();
            return false;
          } else {
            return true;
          }
        });        
      }
    };
  }]);

  module.directive('toggleable', ['SharedState', '$rootScope', function(SharedState, $rootScope) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {

        var exclusionGroup        =  attrs.exclusionGroup,
            defaultValue          =  attrs.default === 'active',
            activeClass           =  attrs.activeClass,
            inactiveClass         =  attrs.inactiveClass,
            parentActiveClass     =  attrs.parentActiveClass,
            parentInactiveClass   =  attrs.parentInactiveClass,
            parent                =  elem.parent(),
            id                    =  attrs.toggleable || attrs.id;

        scope.$on('mobile-angular-ui.state.changed.' + id, function(evt, value) {

          if (value) {
            if (parentActiveClass) { parent.addClass(parentActiveClass); }
            if (activeClass) { elem.addClass(activeClass); }
            if (parentInactiveClass) { parent.removeClass(parentInactiveClass); }
            if (inactiveClass) { elem.removeClass(inactiveClass); }            
          } else {
            if (parentActiveClass) { parent.removeClass(parentActiveClass); }
            if (activeClass) { elem.removeClass(activeClass); }
            if (parentInactiveClass) { parent.addClass(parentInactiveClass); }
            if (inactiveClass) { elem.addClass(inactiveClass); }
          }

          $rootScope.$emit('mobile-angular-ui.toggle.toggled', id, value, exclusionGroup);
        });


        SharedState.initialize(scope, id, {defaultValue: defaultValue, exclusionGroup: exclusionGroup});
      }
    };    
  }]);

  module.run(['$rootScope', 'SharedState', function($rootScope, SharedState) {

    $rootScope.toggle = function(target, command) {
      if (command === 'on') {
        SharedState.turnOn(target);
      } else if (command === 'off') {
        SharedState.turnOff(target);
      } else {
        SharedState.toggle(target);
      }
    };

    // $rootScope.toggleByClass = function(target, command) {
    //  // Not supported 
    // };

  }]);
}());
(function() {
  'use strict';      

  angular.module('mobile-angular-ui.migrate', [
      'mobile-angular-ui.migrate.toggle',
      'mobile-angular-ui.migrate.forms',
      'mobile-angular-ui.migrate.panels',
      'mobile-angular-ui.migrate.disabled',
      'mobile-angular-ui.migrate.overlay',
      'mobile-angular-ui.migrate.carousel',
      'mobile-angular-ui.migrate.namespaceAliases',
      'mobile-angular-ui.migrate.switch'
    ]);
}());
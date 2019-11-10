'use strict';
/*
* angular-css-injector v1.0.4
* Written by Gabriel Delépine
* Special thanks to (github users) : @kleiinnn
* License: MIT
* https://github.com/Yappli/angular-css-injector/
*/
angular.module('angular.css.injector', [])
.provider('cssInjector', ['$interpolateProvider', function($interpolateProvider) {
	var singlePageMode = false;

	function CssInjector($compile, $rootScope, $rootElement){
        // Variables
        var head = angular.element(document.getElementsByTagName('head')[0]),
            scope;

        // Capture the event `locationChangeStart` when the url change. If singlePageMode===TRUE, call the function `removeAll`
        $rootScope.$on('$locationChangeStart', function()
        {
            if(singlePageMode === true)
                removeAll();
        });

        // Always called by the functions `addStylesheet` and `removeAll` to initialize the variable `scope`
        var _initScope = function()
        {
            if(scope === undefined)
            {
                scope = $rootElement.scope();
            }
        };

        // Used to add a CSS files in the head tag of the page
        var addStylesheet = function(href)
        {
            _initScope();

            if(scope.injectedStylesheets === undefined)
            {
                scope.injectedStylesheets = [];
                head.append($compile("<link data-ng-repeat='stylesheet in injectedStylesheets' data-ng-href='" + $interpolateProvider.startSymbol() + "stylesheet.href" + $interpolateProvider.endSymbol() + "' rel='stylesheet' />")(scope)); // Found here : http://stackoverflow.com/a/11913182/1662766
            }
            else
            {
                for(var i in scope.injectedStylesheets)
                {
                    if(scope.injectedStylesheets[i].href == href) // An url can't be added more than once. I use a loop FOR, not the function indexOf to make the code IE < 9 compatible
                        return;
                }
            }

            scope.injectedStylesheets.push({href: href});
        };

		var remove = function(href){
			_initScope();

			if(scope.injectedStylesheets){
				for(var i = 0; i < scope.injectedStylesheets.length; i++){
					if(scope.injectedStylesheets[i].href === href){
						scope.injectedStylesheets.splice(i, 1);
						return;
					}
				}
			}
		};

        // Used to remove all of the CSS files added with the function `addStylesheet`
        var removeAll = function()
        {
            _initScope();

            if(scope.injectedStylesheets !== undefined)
                scope.injectedStylesheets = []; // Make it empty
        };

        return {
            add: addStylesheet,
			remove: remove,
            removeAll: removeAll
        };
	}

	this.$get = ['$compile', '$rootScope', '$rootElement', function($compile, $rootScope, $rootElement){
		return new CssInjector($compile, $rootScope, $rootElement);
	}];

	this.setSinglePageMode = function(mode){
		singlePageMode = mode;
		return this;
	}
}]);

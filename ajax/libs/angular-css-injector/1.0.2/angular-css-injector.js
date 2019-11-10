/*
* angular-css-injector v1.0.2
* Written by Gabriel Delépine
* Special thanks to (github users) : @kleiinnn
* License: MIT
* https://github.com/Yappli/angular-css-injector/
*/
angular.module('angular.css.injector', [])
.provider('cssInjector', function() {
	var singlePageMode = false;
	
	function CssInjector($compile, $rootScope){
        // Variables
        var singlePageMode = false,
            head = angular.element(typeof jQuery == "undefined" ? document.querySelector('head') : 'head'), // TO make the code IE < 8 compatible, include jQuery in your page
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
                scope = head.scope(); // We initialise head's scope in a separated function because it is not defined at the time of the initialisation of the service.
        };
        
        // Used to add a CSS files in the head tag of the page
        var addStylesheet = function(href)
        {
            _initScope();
            
            if(scope.injectedStylesheets === undefined)
            {
                scope.injectedStylesheets = [];
                head.append($compile("<link data-ng-repeat='stylesheet in injectedStylesheets' data-ng-href='{{stylesheet.href}}' rel='stylesheet' />")(scope)); // Found here : http://stackoverflow.com/a/11913182/1662766
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
        
        // Used to remove all of the CSS files added with the function `addStylesheet`
        var removeAll = function()
        {
            _initScope();
            
            if(scope.injectedStylesheets !== undefined)
                scope.injectedStylesheets = []; // Make it empty
        };
		
        return {
            add: addStylesheet,
            removeAll: removeAll
        };
	}
	
	this.$get = function($compile, $rootScope){
		return new CssInjector($compile, $rootScope);
	};
	
	this.setSinglePageMode = function(mode){
		singlePageMode = mode;
		return this;
	}
});

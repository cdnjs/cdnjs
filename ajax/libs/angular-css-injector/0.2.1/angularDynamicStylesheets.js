/*
* angularDynamicStylesheets v0.2.0
* Copyleft 2013 Yappli
* License: MIT
* https://github.com/Yappli/angularDynamicStylesheets/
*/
angular.module('DynamicStylesheets', [])
.service('dynamicStylesheets', [
    '$compile', 
    '$rootScope',
    function($compile, $rootScope)
    {
        // Variables
        var scope;        
        var singlePageMode = false;
        
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
                scope = angular.element(document.querySelector('head')).scope();
        };
        
        // Used to add a CSS files in the head tag of the page
        var addStylesheet = function(href)
        {
            _initScope();
            
            if(scope.href_array_dynamicStylesheets === undefined)
            {
                scope.href_array_dynamicStylesheets = [];
                angular.element(document.querySelector('head')).append($compile("<link data-ng-repeat='stylesheet in href_array_dynamicStylesheets' data-ng-href='{{stylesheet.href}}' rel='stylesheet' />")(scope)); // Found here : http://stackoverflow.com/a/11913182/1662766
            }
            else
            {
                for(var i in scope.href_array_dynamicStylesheets)
                {
                    if(scope.href_array_dynamicStylesheets[i].href == href) // An url can't be added more than once. I use a loop FOR, not the function indexOf to make IE < 9 compatible
                        return;
                }
            }
            
            scope.href_array_dynamicStylesheets.push({href: href});
        };
        
        // Used to remove all of the CSS files added with the function `addStylesheet`
        var removeAll = function()
        {
            _initScope();
            
            if(scope.href_array_dynamicStylesheets !== undefined)
                scope.href_array_dynamicStylesheets = []; // Make it empty
        };
        
        // Used to set the boolean `singlePageMode`. If singlePageMode===TRUE, the function `removeAll` will be call every time the page change (based on the angular event `$locationChangeStart`)
        var setSinglePageMode = function(bool)
        {
            if(bool !== true && bool !== false)
                throw("Angular service `dynamicStylesheets` : function `setSinglePageMode` : Error parameter, boolean required.");
                
            singlePageMode = bool;
        };

        return {
            add: addStylesheet,
            removeAll: removeAll,
            setSinglePageMode: setSinglePageMode,
        };
    }
]);

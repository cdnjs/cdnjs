/*
* angularDynamicStylesheets v0.1.0
* Copyleft 2013 Yappli
*
* This program is free software. It comes without any warranty, to
* the extent permitted by applicable law. You can redistribute it
* and/or modify it under the terms of the Do What The Fuck You Want
* To Public License, Version 2, as published by Sam Hocevar. See
* http://sam.zoy.org/wtfpl/COPYING for more details.
*/
angular.module('DynamicStylesheets', [])
.service('dynamicStylesheets', [
    '$compile', 
    function($compile) {

        var scope = angular.element('head').scope();
   
        var addStylesheet = function(href)
        {
            if(scope.stylesheets_service_dynamicStylesheets === undefined)
            {
                angular.element('head').scope().stylesheets_service_dynamicStylesheets = [];
                angular.element('head').append($compile("<link data-ng-repeat='stylesheet in stylesheets_service_dynamicStylesheets' data-ng-href='{{stylesheet.href}}' rel='stylesheet' />")(scope)); // Found here : http://stackoverflow.com/a/11913182/1662766
            }
            else
            {
                for(var i in scope.stylesheets_service_dynamicStylesheets)
                {
                    if(scope.stylesheets_service_dynamicStylesheets[i].href == href) // An url can't be added more than once
                        return;
                }
            }
            
            scope.stylesheets_service_dynamicStylesheets.push({href: href});
        };

        return {
            add: addStylesheet,
        };
    }
]);

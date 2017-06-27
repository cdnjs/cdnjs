/*jshint unused: false */
/*global angular, bbResourcesOverrides */

(function () {
'use strict';

var bbResourcesOverrides;
    
bbResourcesOverrides = {
    "autonumeric_abbr_billions": "B",
    "autonumeric_abbr_millions": "M",
    "autonumeric_abbr_thousands": "K"
};

angular.module('sky.resources')
    .config(['bbResources', function (bbResources) {
        angular.extend(bbResources, bbResourcesOverrides);
    }]);
}());
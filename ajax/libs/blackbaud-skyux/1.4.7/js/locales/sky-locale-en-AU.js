/*jshint unused: false */
/*global angular, bbResourcesOverrides */

(function () {
'use strict';

var bbResourcesOverrides;
    
bbResourcesOverrides = {
    "autonumeric_abbr_billions": "bn",
    "date_range_picker_this_fiscal_year": "This financial year",
    "date_range_picker_last_fiscal_year": "Last financial year",
    "date_range_picker_next_fiscal_year": "Next financial year",
    "date_range_picker_filter_description_this_fiscal_year": "{0} for this financial year",
    "date_range_picker_filter_description_last_fiscal_year": "{0} from last financial year",
    "date_range_picker_filter_description_next_fiscal_year": "{0} for next financial year"
};

angular.module('sky.resources')
    .config(['bbResources', function (bbResources) {
        angular.extend(bbResources, bbResourcesOverrides);
    }]);
}());
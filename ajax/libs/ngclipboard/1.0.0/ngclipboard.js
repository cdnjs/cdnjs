/*! ngclipboard - v1.0.0 - 2015-10-21
* https://github.com/sachinchoolur/ngclipboard
* Copyright (c) 2015 Sachin; Licensed MIT */
(function() {
    'use strict';
    angular.module('ngclipboard', []).directive('ngclipboard', function() {
        return {
            restrict: 'A',
            scope: {
                ngclipboardSuccess: '&',
                ngclipboardError: '&'
            },
            link: function(scope, element) {

                var _id = element.attr('id');
                if (!_id) {
                    element.attr('id', 'ngclipboard' + Date.now());
                    _id = element.attr('id');
                }

                var clipboard = new Clipboard('#' + _id);

                clipboard.on('success', function(e) {
                    scope.ngclipboardSuccess({
                        e: e,
                        id: element.attr('id')
                    });
                });

                clipboard.on('error', function(e) {
                    scope.ngclipboardError({
                        e: e,
                        id: element.attr('id')
                    });
                });

            }
        };
    });
}());

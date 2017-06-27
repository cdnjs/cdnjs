/**
@fileOverview

@toc

*/

'use strict';

angular.module('oitozero.ngSweetAlert', [])
.factory('SweetAlert', [ '$timeout', '$window', function ( $timeout, $window ) {

	var swal = $window.swal;

	//public methods
	var self = {

		swal: function ( arg1, arg2, arg3 ) {
			$timeout(function(){
				if( typeof(arg2) === 'function' ) {
					swal( arg1, function(isConfirm){
						$timeout( function(){
							arg2(isConfirm);
						});
					}, arg3 );
				} else {
					swal( arg1, arg2, arg3 );
				}
			}, 200);
		},
		adv: function( object ) {
			$timeout(function() {
				swal( object );
			}, 200);
		},
		timed: function( title, message, type, time ) {
			$timeout(function() {
				swal( {
					title: title,
					text: message,
					type: type,
					timer: time
				} );
			}, 200);
		},
		success: function(title, message) {
			$timeout(function(){
				swal( title, message, 'success' );
			}, 200);
		},
		error: function(title, message) {
			$timeout(function(){
				swal( title, message, 'error' );
			}, 200);
		},
		warning: function(title, message) {
			$timeout(function(){
				swal( title, message, 'warning' );
			}, 200);
		},
		info: function(title, message) {	
			$timeout(function(){
				swal( title, message, 'info' );
			}, 200);
		}
	};
	
	return self;
}]);


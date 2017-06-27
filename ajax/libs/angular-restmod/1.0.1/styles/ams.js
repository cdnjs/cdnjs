/**
 * API Bound Models for AngularJS
 * @version v1.0.1 - 2014-09-11
 * @link https://github.com/angular-platanus/restmod
 * @author Ignacio Baixas <ignacio@platan.us>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';

angular.module('restmod').factory('AMSApi', ['restmod', 'inflector', 'DefaultPacker', function(restmod, inflector, DefaultPacker) {

	// special snakecase to camelcase renamer
	var amsRenamer = {
		decode: inflector.camelize,
		encode: function(_v) { return inflector.parameterize(_v, '_'); }
	};

	return restmod.mixin(function() {
		this.setProperty('style', 'AMS')
			.setProperty('primaryKey', 'id') // just to make sure
			.setRenamer(amsRenamer)
			.setPacker('packer', DefaultPacker)
			.setProperty('jsonMeta', 'meta')
			.setProperty('jsonLinks', 'links');
	});

}]);})(angular);
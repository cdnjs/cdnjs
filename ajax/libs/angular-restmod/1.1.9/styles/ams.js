/**
 * API Bound Models for AngularJS
 * @version v1.1.9 - 2015-05-07
 * @link https://github.com/angular-platanus/restmod
 * @author Ignacio Baixas <ignacio@platan.us>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';

angular.module('restmod').factory('AMSApi', ['restmod', 'inflector', function(restmod, inflector) {

	return restmod.mixin('DefaultPacker', { // include default packer extension
		$config: {
			style: 'AMS',
			primaryKey: 'id',
			jsonMeta: 'meta',
			jsonLinks: 'links'
		},

		$extend: {
			// special snakecase to camelcase renaming
			Model: {
				decodeName: inflector.camelize,
				encodeName: function(_v) { return inflector.parameterize(_v, '_'); },
				encodeUrlName: inflector.parameterize
			}
		}
	});

}]);})(angular);
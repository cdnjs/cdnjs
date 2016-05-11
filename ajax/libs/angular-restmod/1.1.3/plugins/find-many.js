/**
 * API Bound Models for AngularJS
 * @version v1.1.3 - 2014-09-25
 * @link https://github.com/angular-platanus/restmod
 * @author Ignacio Baixas <ignacio@platan.us>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';
/**
 * @mixin FindMany
 *
 * @description
 *
 * Adds the `Scope.$populate` method that enables multiple record resolving using one request.
 *
 * This plugin requires special api support for multiple id requests.
 */

angular.module('restmod').factory('restmod.FindMany', ['restmod', 'RMPackerCache', 'inflector', function(restmod, packerCache, inflector) {

  return restmod.mixin(function() {

    /**
     * @method $findManyUrl
     * @memberOf FindMany
     *
     * @description Provides the url for a findMany/populate operation.
     */
    this.define('Scope.$findManyUrl', function(_resource) {
      return this.$fetchManyUrl ? this.$fetchManyUrl(_resource) : this.$url(_resource);
    })
    /**
     * @method $populate
     * @memberOf FindMany
     *
     * @description Resolves a series of records using a single api call.
     *
     * By default, this method uses the same url used by `collection.$fetch`. To provide a different url
     * then override the `Scope.$findManyUrl` function.
     *
     * By default this method uses the pluralized variat of the primary key for the query parameter holding
     * the ids. You can override this parameter by setting the `findManyKey` configuration var.
     *
     * This method triggers the `before-find-many` event before sending the server request.
     *
     * Usage:
     *
     * ```javascript
     * var bikes = [
     *  Bike.$new(1),
     *  Bike.$new(2),
     *  Bike.$new(3)
     * ];
     *
     * Bike.$populate(bikes).$then(function() {
     *   // populate returns a fully fledged resource!
     *   alert('Ready!');
     * })
     * ```
     *
     * @param {array} _records Records to resolve.
     * @return {Resource} Resource holding the populate promise.
     */
    .define('Scope.$populate', function(_records, _params) {

      // Extract record pks for non resolved records and build a record map
      var pks = [],
          recordMap = {},
          params = _params || {},
          model = this.$type,
          dummy = model.dummy(true),
          record, request;

      for(var i = 0; i < _records.length; i++) {
        record = _records[i];
        if(!record.$resolved) {
          if(recordMap[record.$pk]) {
            recordMap[record.$pk].push(record);
          } else {
            recordMap[record.$pk] = [record];
            pks.push(record.$pk);
          }
        }
      }

      if(pks.length === 0) return dummy;

      // build request
      params[model.getProperty('findManyKey', inflector.pluralize(model.getProperty('primaryKey')))] = pks;
      request = {
        url: (this.$scope || this).$findManyUrl(this),
        method: 'GET',
        params: params
      };

      // allow user to modify request on hook
      dummy.$dispatch('before-find-many', [request]);

      // Execute request to fetch for required records
      return model.dummy(true).$send(request, function(_response) {
        try {
          packerCache.prepare();
          var raw = model.unpack(this, _response.data), pk, records;

          // load raw data into records
          for(var i = 0; i < raw.length; i++) {
            pk = model.inferKey(raw[i]);
            records = recordMap[pk];
            if(records) {
              for(var j = 0; j < records.length; j++) {
                if(!records[j].$resolved) records[j].$decode(raw[i]);
              }
            }
          }

        } finally {
          packerCache.clear();
        }
      });
    });
  });
}]);})(angular);
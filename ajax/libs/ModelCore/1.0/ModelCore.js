/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013 Klederson Bueno
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @author Klederson Bueno <klederson@klederson.com>
 * @version 1.1
 * @see https://github.com/klederson/ModelCore
 * @licence MIT
 */
 (function(){
  "use strict";

  angular.module('ModelCore', ['ng']).factory('ModelCore', function($http, $q, $filter, $rootScope) {

    //Making possible to instance the typeof ModelCore
    var ModelCore = function ModelCore(settings) {
      this.$init.apply(this, arguments);
    };

    //Making the magic happens
    ModelCore.prototype = {
      $uuid : null,
      $pkField : null,
      $settings : {},
      $mapping : {},
      $hasMany : {},
      $hasOne : {},
      $dataset : [],
      $scope : null,

      /**
       * Constructor and Initializer function
       */
       $init : function(settings) {
        var self = this;

        //apply settings and extend default ones
        self.$settings = angular.extend({
          headers : {
            "Content-Type" : "application/json"
          },
          dataField : {
            one : "content", //this MUST be configured as your rest pattern
            many : "items" //this MUST be configured as your rest pattern
          },

          urls : {
            // you can use a generic url for all and add parameters on the fly
            base : null
            // you can provide different url for each kind of method with parameters
            // get : null
            // post : null,
            // remove : null,
            // update : null //...
          }
        }, self.$settings);

        self.$uuid = ModelCore.getUUID();
      },

      $offline : false, //@TODO future implementation

      $resetTo : function(data) {
        var self = this;
        data = !data || {};
        for(var i in self.$mapping) {
          if(self.$mapping.hasOwnProperty(i)){
            self.__proto__[i] = typeof data[i] !== "undefined" ? data[i] : null;
          }
        }

        return self;
      },

      $reset : function() {
        return this.$resetTo({});
      },
      
      $add : function(o) {
        this.$dataset.push(o);
      },

      $new : function(data) {
        var self = this;

        data = typeof data === "undefined" ? self.$mapping : data;

        var o = new new ModelCore.newInstance({},self);
        o._cache = {};
        for(i in self.$mapping) {
          o._cache[i] = ModelCore.clone(self.$mapping[i]);
          o[i] = ModelCore.clone(self.$mapping[i]);
        }

        return o;
      },
      /**
       * Just an alias to the iterator next();
       */
       $fetch : function() {
        return this.next();
      },

      $incremental : function(query,options) {
        return this.$find(query,options,true);
      },

      /**
       * Perform a "SELECT" operation into the RESTful service
       *
       * @return Promise
       */
       $find : function(query,options,incremental) {
        var self = this;
        incremental = !(typeof incremental === "undefined" || incremental == false);

        return self.$call({
          url : self.$url("get"),
          method: "GET"
        }, self, query).success(function(result) {
          if(incremental !== true){
            self.$dataset = []; //cleanup
          }
          return self.$parse(result);
        });
      },

      $getRelationship : function(name, query, options) {
        var self = this;

        //search for many to many or one to many
        for(var rel in self.$hasMany) {
            if(rel === name) {
                self[rel] = new self.$mapping[rel]();
                query = query || {};
                
                for(var i in self.$hasMany[rel]) {
                    query[i] = self[self.$hasMany[rel][i]]; //set query based on $mapping fields
                }

                return self[rel].$find(query,options);
            }
        }

        //search for one to one
        for(var rel in self.$hasOne) {
            if(rel === name) {
                self[rel] = self.$mapping[rel]();

                var id = self[self.$hasMany[rel].id]; //mandatory
                var field = self.$hasMany[rel].field || null;

                return self[rel].$get(id,field);
            }
        }
      },

      $get : function(id,field) {
        var self = this;

        if(self.$pkField == null && typeof field === "undefined"){
          throw "You must setup a model.$pkField to perform this operation or define the second parameter field";
        }
        field = typeof field !== "undefined" ? field : self.$pkField;

        var parms = {};
        parms[field] = id;

        return self.$call({
          url : self.$url("get",parms),
          method : "GET"
        }, self).success(function(result) {
          self.$dataset = []; //cleanup
          self.$parse(result);

          self.$fetch();

          //This can be improved
          //This is when your server reply a LOT of items (probably because it does not support the GET /data/id HTTP/1.1)
          //and then the ModelCore handles it for you anyway
          self.$dataset = self.$dataset.length === 1 ? self.$dataset :
          $filter('filter')(self.$dataset, function (item) {return item[field] == id ? item : false;});

          return self.$dataset;
        });
      },

      $save : function() {
        var self = this;

        return self.$call({
          url : self.$url("post"),
          method : "POST",
          data : self.$toObject()
        }, self).success(function() {
          self.$cleanDiff();
        });
      },

      $cleanDiff : function() {
        var self = this;
        
        if(typeof self._cache === "undefined") {
          self._cache = {};
        }

        var data = self.$toObject();

        for(var field in data) {
          if(data.hasOwnProperty(field)){
            if(typeof data[field] === "object") {
              self._cache[field] = ModelCore.clone(data[field]);
            } else {
              self._cache[field] = data[field];
            }
          }
        }
      },

      $delete : function(id, field) {
        var self = this;

        if(self.$pkField == null && typeof field === "undefined"){
          throw "You must setup a model.$pkField to perform this operation or define the second parameter field";
        }
        field = typeof field !== "undefined" ? field : self.$pkField;

        id = typeof id === "undefined" ? self[field] : id;

        var parms = {};
        parms[field] = id;

        return self.$call({
          url : self.$url("delete",parms),
          method : "DELETE",
          data : self.$toObject()
        }, self).success(function() {
          ModelCore.destroy(self);
        });
      },

      /**
       * Get the current data ( with changes also ) from the object and return a Object
       *
       * @return Object
       */
       $toObject : function() {
        var self = this;
        //it's flat for now
        //@TODO make it multidimensional
        var field;
        var obj = {};
        for(field in self.$mapping) {
          if(self.$mapping.hasOwnProperty(field)){obj[field] = self[field];}
        }

        return obj;
      },

      /**
       * Get the original data (same that came from the rest of the offline object)
       *
       * @return Object
       */
       $original : function() {
        var self = this;

        var field;
        var obj = {};


        if(typeof self._cache === "undefined") {
          self._cache = {};
          return false;
        }

        for(field in self.$mapping) {
          if(self.$mapping.hasOwnProperty(field)){
            if(typeof obj[field] !== "object"){
              obj[field] = self._cache[field];
            }
            else{
              obj[field] = angular.extend(obj[field],self._cache[field]);
            }
          }
        }

        return obj;
      },

      /**
       * This method check if the model data has changed.
       * Is also possible to check a specific field for changes as well
       *
       * @return Boolean
       */
       $isChanged : function(field) {
        var self = this;
        var diff = self.$diff();

        if(typeof field === "undefined" && diff !== false){
          return Object.keys(diff).length > 0;
        } else if(diff[field]){
          return !!diff[field];
        } else {
          return false;
        }
      },

      /**
       * Check the difference between the original data and the new one based on model.$mapping
       * and than it returns an object only with the differences.
       *
       * @return Object
       */
       $diff : function(prev, now) {
        var self = this;
        var changes = {};

        prev = typeof prev === "undefined" ? self.$original() : prev;
        now = typeof now === "undefined" ? self.$toObject() : now;

        if(prev === false)
          return false;

        for (var prop in now) {
          if(now.hasOwnProperty(prop)){
            if (!prev || prev[prop] !== now[prop]) {
              if (typeof now[prop] === "object" && now[prop] !== null && typeof prev[prop] !== "undefined") {
                var c = self.$diff(prev[prop], now[prop]);

                if (! ModelCore.isEmpty(c) ){ // underscore
                  changes[prop] = c;
                }
              } else {
                changes[prop] = now[prop];
              }
            }
          }
        }

        return changes;
      },

      /**
       * Perform a RESTful call based on the given options and parameters.
       * Also based on the same parameters it can get data from the offline set if
       * model.$offline is set true
       *
       * @return Promise
       */
       $call : function(options,model,query) {
        var self = this;
        return !self.$offline ? ModelCore.call(options,model,query) : ModelCore.callOffline(options,model,query);
      },

      /**
       * This parses a RESTful or Offline data into model.$dataset
       *
       * @return Array
       */
       $parse : function(data) {
        var self = this;
        return self.$dataset = self.$dataset.concat( ModelCore.parse(data,self) );
      },

      __cursor : 0,

      /**
       * Moves the cursor to the next element into the dataset
       * and also setup all data to the current master model
       *
       * @return Boolean/Object
       */
       next : function() {
        var self = this;
        var current = self.__cursor;
        self.__cursor++;
        return self.$goTo(current);
      },

      /**
       * Moves the cursor to the prev element into the dataset
       * and also setup all data to the current master model
       *
       * @return Boolean/Object
       */
       prev : function() {
        var self = this;
        var current = self.__cursor;
        self.__cursor--;
        return self.$goTo(current);
      },

      /**
       * The man behind the curtain to move back and forward the cursor
       * along the model.$dataset
       *
       * @return Boolean/Object
       */
       $goTo : function(index) {
        var self = this;

        if (self.__cursor > self.$dataset.length) {
          self.__cursor = 0;
          return false;
        } else if(self.__cursor < 0) {
          self.__cursor = 0;
          return false;
        }

        self.$mapping = self.$dataset[index].$mapping;

        if(typeof self._cache === "undefined")
          self._cache = {};

        self._cache = self.$dataset[index]._cache;

        for(var field in self.$dataset[index].$toObject()) {
          self[field] = self.$dataset[index][field];
          self.__proto__[field] = self.$dataset[index][field];
        }

        return self.$dataset[index];
      },

      /**
       * Retrieve the URL for a given method with given parameters as well
       * @return String
       */
       $url : function(method, parameters) {
        var self = this;
        var url = (typeof self.$settings.urls[method] === "undefined" || self.$settings.urls[method] == null) ? self.$settings.urls.base : self.$settings.urls[method];

        if(url == null || typeof url === "undefined"){
          throw ("Model URL missing for " + typeof self +  " in ["+method+"].");
        }
        var r = /(:[A-z]+\/?)/g;

        var _parms = url.match(r);
        var i;
        for(i in _parms) {
          if(_parms.hasOwnProperty(i)){
            var replacement = _parms[i].replace("/","");
            var key = replacement.replace(":","");

            if(!parameters || typeof parameters[key] === "undefined") {
              url = url.replace(_parms[i],"");
            } else {
              url = url.replace(replacement,parameters[key]);
            }
          }
        }

        return url;
      }

    };

    /**** STATIC METHODS ****/

    ModelCore.destroy = function (model) {

      if (typeof model.$parentModel !== "undefined") {
        var index = model.$parentModel.$dataset.indexOf(model);
        model.$parentModel.$dataset.splice(index, 1);
      }


    };

    ModelCore.OfflineSettings = {
      key : "_ModelCoreOfflineData"
    };

    ModelCore.call = function (options, model, query) {
      var self = this;

      if (typeof options === 'undefined') {
        options = {};
      }

      if (!options.method){
        throw "You must setup a method";
      }

      if (!options.url){
        throw "You must setup an url";
      }

      if (query){
        options.params = query;
      }

      options.headers = model.$settings.headers;

      return $http(options);
    };

    ModelCore.__call = function (options, model, query) {
      var deferred = $q.defer();
      var _key = ModelCore.OfflineSettings.key;

      if (typeof Storage !== "undefined") {
        var data = {
          calls: [] //is this right?
        };
        var offline = sessionStorage.getItem(_key);

        if (typeof offline === "undefined" || offline == null) {
          sessionStorage.setItem(_key, "{}");
          offline = sessionStorage.getItem(_key);
        }

        offline = JSON.parse(offline);

        //error
        data.calls[options.method].push({ options: options, uuid: model.$uuid });

        angular.extend(offline, data);

        sessionStorage.setItem(_key, JSON.stringify(data));

        deferred.resolve(model);
      } else {
        // @todo data is currently undefined here.  What is supposed to go here?
        deferred.reject('Error processing offline call: ' + data.toString());
      }

      return deferred;
    };

    ModelCore.newInstance = function (data, model) {
      return ModelCore.instance(data, model);
    };

    ModelCore.parse = function (data, model) {
      var content = data[model.$settings.dataField.one] ? [ data[model.$settings.dataField.one] ] : data[model.$settings.dataField.many];

      var i;
      var self = this;

      var base = function (modelData) {
        angular.extend(modelData, model);
        return ModelCore.instance(modelData, model);
      };

      var dataset = [];
      for (i in content) {
        if(content.hasOwnProperty(i)){
          //Magic Mapping
          var field;
          content[i].$mapping = {};

          if (typeof model.$mapping !== "undefined"){
            angular.extend(content[i].$mapping, model.$mapping);
          }
          content[i]._cache = {};
          for (field in content[i]) {
            if (content[i].hasOwnProperty(field)) {
              if (field != "$mapping" && field != "_cache") {
                content[i].$mapping[field] = true;
                if (typeof content[i][field] === "object") {
                  content[i]._cache[field] = ModelCore.clone(content[i][field]);
                } else {
                  content[i]._cache[field] = content[i][field];
                }
              }
            }
          }

          content[i].$parentModel = model;

          dataset.push(new new ModelCore.newInstance(content[i], model));
        }
      }

      return dataset;
    };

    ModelCore.clone = function (obj) {
      // Handle the 3 simple types, and null or undefined
      if (null == obj || "object" !== typeof obj){ return obj;}

      // Handle Date
      if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
      }

      // Handle Array
      if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
          copy[i] = ModelCore.clone(obj[i]);
        }
        return copy;
      }

      // Handle Object
      if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = ModelCore.clone(obj[attr]);
        }
        return copy;
      }

      throw new Error("Unable to copy obj! Its type isn't supported.");
    };

    /**
     * This piece of code was just "stolen" from angular-activerecord and received small changes
     * Thanks dude! =)
     * @see http://github.com/bfanger/angular-activerecord/
     */
     ModelCore.instance = function(props,original) {
      var self;
      var parent = window._ModelCoreConstructor = this;
      var type = original ? original.$type : props.$type;

      //building the constructor with the right type
      self = new Function(
       "return function " + type + "(settings) { window._ModelCoreConstructor.apply(this,arguments) }"
       )();

      //Now let's retrieve persistent and other stuff from the "base" model
      var TabulaRasa = function () { this.$__construct = self; };
      TabulaRasa.prototype = parent.prototype;

      //Populate self prototype
      self.prototype = new TabulaRasa();


      //Extend original methods and properties
      if(original){
        angular.extend(self.prototype, original.__proto__);
      }
      //Apply custom methods and attributes
      if (props) {
        angular.extend(self.prototype, props);
      }


      angular.extend(self, parent, original);

      //Define references to it's masters methods
      self.__super__ = parent.prototype;

      //Uffff... it's done
      return self;
    };


    /** THIRD PART SCRIPTS **/

      //FROM PHP.js
      ModelCore.urlencode = function (str) {
        str = (str + '').toString();

      // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
      // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
      return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
    };

    //FROM PHP.js
    ModelCore.buildQuery = function (formdata, numeric_prefix, arg_separator) {
      var value, key, tmp = [];
      var self = this;

      var _http_build_query_helper = function (key, val, arg_separator) {
        var k, tmp = [];
        if (val === true) {
          val = "1";
        } else if (val === false) {
          val = "0";
        }
        if (val != null) {
          if (typeof(val) === "object") {
            for (k in val) {
              if (val.hasOwnProperty(k) && val[k] != null) {
                tmp.push(_http_build_query_helper(key + "[" + k + "]", val[k], arg_separator));
              }
            }
            return tmp.join(arg_separator);
          } else if (typeof(val) !== "function") {
            return self.urlencode(key) + "=" + self.urlencode(val);
          } else {
            throw new Error('There was an error processing for http_build_query().');
          }
        } else {
          return '';
        }
      };

      if (!arg_separator) {
        arg_separator = "&";
      }
      for (key in formdata) {
        if(formdata.hasOwnProperty(key)){
          value = formdata[key];
          if (numeric_prefix && !isNaN(key)) {
            key = String(numeric_prefix) + key;
          }
          var query = _http_build_query_helper(key, value, arg_separator);
          if (query !== '') {
            tmp.push(query);
          }
        }
      }

      return tmp.join(arg_separator);
    };

    //FROM Underscore.js
    ModelCore.isEmpty = function (obj) {
      if (obj == null) {return true;}
      if (obj.toString() === '[object Array]' || obj.toString() === '[object String]'){
        return obj.length === 0;
      }
      for (var key in obj){
        if (obj.hasOwnProperty(key)){return false;}
      }
      return true;
    };


   /* randomUUID.js - Version 1.0
    *
    * Copyright 2008, Robert Kieffer
    *
    * This software is made available under the terms of the Open Software License
    * v3.0 (available here: http://www.opensource.org/licenses/osl-3.0.php )
    *
    * The latest version of this file can be found at:
    * http://www.broofa.com/Tools/randomUUID.js
    *
    * For more information, or to comment on this, please go to:
    * http://www.broofa.com/blog/?p=151
    *
    * Create and return a "version 4" RFC-4122 UUID string.
    */
    ModelCore.getUUID = function () {
      var s = [], itoh = '0123456789ABCDEF';

      // Make array of random hex digits. The UUID only has 32 digits in it, but we
      // allocate an extra items to make room for the '-'s we'll be inserting.
      for (var i = 0; i < 36; i++) {s[i] = Math.floor(Math.random() * 0x10);}

      // Conform to RFC-4122, section 4.4
      s[14] = 4;  // Set 4 high bits of time_high field to version
      s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence

      // Convert to hex chars
      for (i = 0; i < 36; i++) {s[i] = itoh[s[i]];}

      // Insert '-'s
    s[8] = s[13] = s[18] = s[23] = '-';

    return s.join('');
  };

  ModelCore.queryToObject = function(str) {
   var queryString = str || window.location.search || '';
   var keyValPairs = [];
   var params      = {};
   queryString     = queryString.replace(/.*?\?/,"");

   if (queryString.length)
   {
      keyValPairs = queryString.split('&');
      for (var pairNum in keyValPairs)
      {
         var key = keyValPairs[pairNum].split('=')[0];
         if (!key.length) continue;
         if (typeof params[key] === 'undefined')
         params[key] = [];
         params[key].push(keyValPairs[pairNum].split('=')[1]);
      }
   }
   return params;
}


    //Finally returns the Service
    return ModelCore;
  });
})();
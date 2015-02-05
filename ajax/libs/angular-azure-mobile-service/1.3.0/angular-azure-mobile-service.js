'use strict';

angular.module('azure-mobile-service.module', [])
  .service('Azureservice', function Azureservice($q, AzureMobileServiceClient) {

    var API_URL = AzureMobileServiceClient.API_URL;
    var API_KEY = AzureMobileServiceClient.API_KEY;
    var VAILD_OAUTH_PROVIDERS = ['google', 'twitter', 'facebook', 'microsoftaccount', 'aad'];

    var MobileServiceClient = WindowsAzure.MobileServiceClient;
    var client = new MobileServiceClient(API_URL, API_KEY);

    
    var getCachedUser = function(){
        if (sessionStorage.loggedInUser){
            client.currentUser = JSON.parse(sessionStorage.loggedInUser);
        }
    };

    getCachedUser();

    var getTable = function(tableName, withFilterFn){
        
        if (typeof withFilterFn === 'function')
            return client.withFilter(withFilterFn).getTable(tableName);

        return client.getTable(tableName);
    };

    var isUndefinedOrNotAnObjectOrFunction = function(obj){
        return typeof obj === 'undefined' || (typeof obj !== 'object' && typeof obj !== 'function');
    };

    var isUndefinedOrNotAnObject = function(obj){
        return isNullOrUndefined(obj) || (typeof obj !== 'object');
    };

    var isNullOrUndefined = function(value){
        return value === null || typeof value === 'undefined';
    };
    var isNotNullOrUndefined = function(value){
        return !isNullOrUndefined(value);
    };

    //This will accept the Azure promise and turn it into a angular promise.
    //Elimiante the need for $scope.$apply in your controller.
    var wrapAzurePromiseWithAngularPromise = function(azurePromise){
        var deferred = $q.defer();

        azurePromise
            .done(function(items){
                deferred.resolve(items);
            },
            function(err){
                deferred.reject(err);
            });
        return deferred.promise;
    };

    return{
        /*
            The query method will create and return an azure query.

            @param string tableName                      REQUIRED The name of the table to query
            @param object obj 
                @param obj or function criteria          The search object or a function to filter
                                                         If function then it must be an OData predicate.
                @param array params                      Array of parameters to pass the criteria function
                @param array columns                     Array of column names to return
                @param int take                          Number of results to return
                @param int skip                          Number of reuslts to skip over
                @param array orderBy                     Array of objects
                    @param string column                 Column name to sort by
                    @param string direction              Direction to sort asc || desc         
            @param function withFilterFn                 OPTIONAL A function that can read and write arbitrary properties or add additional headers to the request
            @return promise               Returns a WindowsAzure promise
        */
        query: function(tableName, obj, withFilterFn){
            
            var data = null;

            if (isNullOrUndefined(tableName)){
                console.error('Azureservice.query: You must specify a table name');
                return null;
            }

            if (angular.isDefined(obj) && angular.isObject(obj)){
                
                if (isUndefinedOrNotAnObjectOrFunction(obj.criteria)){
                    obj.criteria = {};
                }
                
                data = getTable(tableName, withFilterFn).where(obj.criteria, obj.params);

                //Number of results to return
                if (isNotNullOrUndefined(obj.take) && angular.isNumber(obj.take)){
                    data = data.take(obj.take);
                }
                
                //number of results to skip
                if (isNotNullOrUndefined(obj.skip) && angular.isNumber(obj.take)){
                    data = data.skip(obj.skip);
                }

                //How to sort/order the data
                if (angular.isDefined(obj.orderBy) && angular.isArray(obj.orderBy)){
                    var orderBy = obj.orderBy;

                    for (var i=0; i < orderBy.length; i++){
                        var column = orderBy[i].column;
                        var dir = orderBy[i].direction;

                        if (angular.isDefined(column)){
                            if (angular.isDefined(dir) && dir.toLowerCase() === 'desc'){
                                data = data.orderByDescending(column);
                            }else if (angular.isDefined(column)){
                                data = data.orderBy(column);
                            }
                        }
                    }
                }

                //Return listed columns
                if (angular.isDefined(obj.columns) && angular.isArray(obj.columns)){
                    data = data.select(obj.columns.join());
                }
            
            }else {
                //No criteria specified - get everything - Note azure limits the count of returned items see docs.
                data = getTable(tableName, withFilterFn).where({});
            }

            return wrapAzurePromiseWithAngularPromise(data.includeTotalCount().read());
        },

        /*
         Get single item in Azure

         @param string tableName       REQUIRED The name of the table to query
         @param string id              REQUIRED String id of the item to get
         @param function withFilterFn  OPTIONAL A function that can read and write arbitrary properties or add additional headers to the request
         @return promise               Returns a WindowsAzure promise
         */
        getById: function (tableName, id, withFilterFn) {
            if (isNullOrUndefined(tableName)) {
                console.error('Azureservice.getById: You must specify a table name');
                return null;
            }

            if (isNullOrUndefined(id)) {
                console.error('Azureservice.getById: You must specify the id');
                return null;
            }

            return wrapAzurePromiseWithAngularPromise(getTable(tableName, withFilterFn).lookup(id));
        }, 

        /*
          Alias to .query(tableName, null, withFilterFn) 
          Returns all results
        */
        getAll: function(tableName, withFilterFn){
            return this.query(tableName, null, withFilterFn);
        },

        /*
          Insert row in to Azure

          @param string tableName       REQUIRED The name of the table to query
          @param object obj             REQUIRED A JSON object of data to insert into the database
          @param function withFilterFn  OPTIONAL A function that can read and write arbitrary properties or add additional headers to the request
          @return promise               Returns a WindowsAzure promise
        */

        insert: function(tableName, obj, withFilterFn){
            if (isNullOrUndefined(tableName)){
                console.error('Azureservice.insert: You must specify a table name');
                return null;
            }

            if (isUndefinedOrNotAnObject(obj)){
                console.error('Azureservice.insert: You must specify the insert object');
                return null;
            }

            return wrapAzurePromiseWithAngularPromise(getTable(tableName, withFilterFn).insert(obj));
        },

        /*
          Update row in Azure

          @param string tableName       REQUIRED The name of the table to query
          @param object obj             REQUIRED A JSON object of data to update into the database
          @param function withFilterFn  OPTIONAL A function that can read and write arbitrary properties or add additional headers to the request
          @return promise               Returns a WindowsAzure promise
        */

        update: function(tableName, obj, withFilterFn){
            if (isNullOrUndefined(tableName)){
                console.error('Azureservice.update: You must specify a table name');
                return null;
            }

            if (isUndefinedOrNotAnObject(obj)){
                console.error('Azureservice.update: You must specify the insert object');
                return null;
            }

            return wrapAzurePromiseWithAngularPromise(getTable(tableName, withFilterFn).update(obj));
        },

        /*
          Delete row(s) from Azure 

          @param string tableName       REQUIRED The name of the table to query
          @param object obj             REQUIRED A JSON object of data to query for deletion from the database
          @param function withFilterFn  OPTIONAL A function that can read and write arbitrary properties or add additional headers to the request
          @return promise               Returns a WindowsAzure promise
        */

        del: function(tableName, obj, withFilterFn){
            if (isNullOrUndefined(tableName)){
                console.error('Azureservice.del: You must specify a table name');
                return null;
            }

            if (isUndefinedOrNotAnObject(obj)){
                console.error('Azureservice.del: You must specify the insert object');
                return null;
            }

            return wrapAzurePromiseWithAngularPromise(getTable(tableName, withFilterFn).del(obj));
        },

        /*
          Logs a user into the oauthProvider service using Windows Azure
          Stores the data in sessionStorage for future queries
        
          @param  string oauthProvider  REQUIRED pass in an oauth provider
          @return promise               Returns a WindowsAzure promise
        */

        login: function(oauthProvider){

            if (!angular.isDefined(oauthProvider) || VAILD_OAUTH_PROVIDERS.indexOf(oauthProvider) === -1){
                throw new Error('Azureservice.login Invalid or no oauth provider listed.');
            }

            var promise = client.login(oauthProvider).then(function(){
                //cache login 
                sessionStorage.loggedInUser = JSON.stringify(client.currentUser);
            });
            
            return wrapAzurePromiseWithAngularPromise(promise);
        },
        /*
          Logs a user out 
        */

        logout: function(){
            //clear cache
            sessionStorage.loggedInUser = null;
            client.logout();
        },
        
        isLoggedIn: function(){
            return isNotNullOrUndefined(client.currentUser)  && isNotNullOrUndefined(sessionStorage.loggedInUser);
        }, 

        /*
            @param string name          the custom api name
            @param object options    
                @param string method        required get, post, put, delete
                @param object body          key/value to send in the request body
                @param object headers       key value  to send in the headers
                @param object parameters    key/value to send as parameters          

        */

        invokeApi: function(name, options){

            var deferred = $q.defer();

            var validMethods = ['get', 'post', 'put', 'delete'];

            if (isNullOrUndefined(name)){
                console.error('Azureservice.invokeApi No custom api name specified');
                return null;
            }

            if (isUndefinedOrNotAnObject(options)){
                options = {
                    method: 'get'
                }
            }else if (isNullOrUndefined(options.method)){
                options.method = 'get'
            }else if (validMethods.indexOf(options.method.toLowerCase()) === -1 ){
                console.error('Azureservice.invokeApi Invalid method type');
                return null;
            }
            

            client
                .invokeApi(name, options)
                .done(function(results){   
                    deferred.resolve(results.result);
                },
                function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        }
    };

});

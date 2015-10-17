(function (factory) {
  if (typeof breeze === "object") {
    factory(breeze);
  } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // CommonJS or Node: hard-coded dependency on "breeze"
    factory(require("breeze"));
  } else if (typeof define === "function" && define["amd"]) {
    // AMD anonymous module with hard-coded dependency on "breeze"
    define(["breeze"], factory);
  }
}(function (breeze) {
  "use strict";
  var core = breeze.core;

  var MetadataStore = breeze.MetadataStore;
  var JsonResultsAdapter = breeze.JsonResultsAdapter;
  var DataProperty = breeze.DataProperty;

  var OData;

  var ctor = function DataServiceODataAdapter() {
    this.name = "OData";
  };

  var proto = ctor.prototype; // minifies better (as seen in jQuery)

  proto.initialize = function () {
    OData = core.requireLib("OData", "Needed to support remote OData services");
    OData.jsonHandler.recognizeDates = true;
  };
  // borrow from AbstractDataServiceAdapter
  var abstractDsaProto = breeze.AbstractDataServiceAdapter.prototype;
  proto._catchNoConnectionError = abstractDsaProto._catchNoConnectionError;
  proto.changeRequestInterceptor = abstractDsaProto.changeRequestInterceptor;
  proto._createChangeRequestInterceptor = abstractDsaProto._createChangeRequestInterceptor;
  proto.headers = { "DataServiceVersion": "2.0" };
  proto.executeQuery = function (mappingContext) {

    var deferred = Q.defer();
    var url = mappingContext.getUrl();

    OData.read({
          requestUri: url,
          headers: this.headers
        },
        function (data, response) {
          var inlineCount;
          if (data.__count) {
            // OData can return data.__count as a string
            inlineCount = parseInt(data.__count, 10);
          }
          return deferred.resolve({ results: data.results, inlineCount: inlineCount, httpResponse: response });
        },
        function (error) {
          return deferred.reject(createError(error, url));
        }
    );
    return deferred.promise;
  };


  proto.fetchMetadata = function (metadataStore, dataService) {

    var deferred = Q.defer();

    var serviceName = dataService.serviceName;
    var url = dataService.qualifyUrl('$metadata');
    // OData.read(url,
    OData.read({
          requestUri: url,
          // headers: { "Accept": "application/json"}
          headers: { Accept: 'application/json;odata.metadata=full' }
        },
        function (data) {
          // data.dataServices.schema is an array of schemas. with properties of
          // entityContainer[], association[], entityType[], and namespace.
          if (!data || !data.dataServices) {
            var error = new Error("Metadata query failed for: " + url);
            return deferred.reject(error);
          }
          var csdlMetadata = data.dataServices;

          // might have been fetched by another query
          if (!metadataStore.hasMetadataFor(serviceName)) {
            try {
              metadataStore.importMetadata(csdlMetadata);
            } catch (e) {
              return deferred.reject(new Error("Metadata query failed for " + url + "; Unable to process returned metadata: " + e.message));
            }

            metadataStore.addDataService(dataService);
          }

          return deferred.resolve(csdlMetadata);

        }, function (error) {
          var err = createError(error, url);
          err.message = "Metadata query failed for: " + url + "; " + (err.message || "");
          return deferred.reject(err);
        },
        OData.metadataHandler
    );

    return deferred.promise;

  };

  proto.getRoutePrefix = function (/*dataService*/) {
    return '';
  } // see webApiODataCtor

  proto.saveChanges = function (saveContext, saveBundle) {
    var adapter = saveContext.adapter = this;
    var deferred = Q.defer();
    saveContext.routePrefix = adapter.getRoutePrefix(saveContext.dataService);
    var url = saveContext.dataService.qualifyUrl("$batch");

    var requestData = createChangeRequests(saveContext, saveBundle);
    var tempKeys = saveContext.tempKeys;
    var contentKeys = saveContext.contentKeys;

    OData.request({
      headers: { "DataServiceVersion": "2.0" },
      requestUri: url,
      method: "POST",
      data: requestData
    }, function (data, response) {
      var entities = [];
      var keyMappings = [];
      var saveResult = { entities: entities, keyMappings: keyMappings };
      data.__batchResponses.forEach(function (br) {
        br.__changeResponses.forEach(function (cr) {
          var response = cr.response || cr;
          var statusCode = response.statusCode;
          if ((!statusCode) || statusCode >= 400) {
            deferred.reject(createError(cr, url));
            return;
          }

          var contentId = cr.headers["Content-ID"];

          var rawEntity = cr.data;
          if (rawEntity) {
            var tempKey = tempKeys[contentId];
            if (tempKey) {
              var entityType = tempKey.entityType;
              if (entityType.autoGeneratedKeyType !== AutoGeneratedKeyType.None) {
                var tempValue = tempKey.values[0];
                var realKey = entityType.getEntityKeyFromRawEntity(rawEntity, DataProperty.getRawValueFromServer);
                var keyMapping = { entityTypeName: entityType.name, tempValue: tempValue, realValue: realKey.values[0] };
                keyMappings.push(keyMapping);
              }
            }
            entities.push(rawEntity);
          } else {
            var origEntity = contentKeys[contentId];
            entities.push(origEntity);
          }
        });
      });
      return deferred.resolve(saveResult);
    }, function (err) {
      return deferred.reject(createError(err, url));
    }, OData.batchHandler);

    return deferred.promise;

  };

  proto.jsonResultsAdapter = new JsonResultsAdapter({
    name: "OData_default",

    visitNode: function (node, mappingContext, nodeContext) {
      var result = {};
      if (node == null) return result;
      var metadata = node.__metadata;
      if (metadata != null) {
        // TODO: may be able to make this more efficient by caching of the previous value.
        var entityTypeName = MetadataStore.normalizeTypeName(metadata.type);
        var et = entityTypeName && mappingContext.entityManager.metadataStore.getEntityType(entityTypeName, true);
        // OData response doesn't distinguish a projection from a whole entity.
        // We'll assume that whole-entity data would have at least as many properties  (<=)
        // as the EntityType has mapped properties on the basis that
        // most projections remove properties rather than add them.
        // If not, assume it's a projection and do NOT treat as an entity
        if (et && et._mappedPropertiesCount <= Object.keys(node).length - 1) {
          // if (et && et._mappedPropertiesCount === Object.keys(node).length - 1) { // OLD
          result.entityType = et;
          var uriKey = metadata.uri || metadata.id;
          if (uriKey) {
            // Strip baseUri to make uriKey a relative uri
            // Todo: why is this necessary when absolute works for every OData source tested?
            var re = new RegExp('^' + mappingContext.dataService.serviceName, 'i');
            uriKey = uriKey.replace(re, '');
          }
          result.extraMetadata = {
            uriKey: uriKey,
            etag: metadata.etag
          }
        }
      }
      // OData v3 - projection arrays will be enclosed in a results array
      if (node.results) {
        result.node = node.results;
      }

      var propertyName = nodeContext.propertyName;
      result.ignore = node.__deferred != null || propertyName === "__metadata" ||
        // EntityKey properties can be produced by EDMX models
          (propertyName === "EntityKey" && node.$type && core.stringStartsWith(node.$type, "System.Data"));
      return result;
    }

  });

  function transformValue(prop, val) {
    if (prop.isUnmapped) return undefined;
    if (prop.dataType === DataType.DateTimeOffset) {
      // The datajs lib tries to treat client dateTimes that are defined as DateTimeOffset on the server differently
      // from other dateTimes. This fix compensates before the save.
      val = val && new Date(val.getTime() - (val.getTimezoneOffset() * 60000));
    } else if (prop.dataType.quoteJsonOData) {
      val = val != null ? val.toString() : val;
    }
    return val;
  }

  function createChangeRequests(saveContext, saveBundle) {
    var changeRequestInterceptor = saveContext.adapter._createChangeRequestInterceptor(saveContext, saveBundle);
    var changeRequests = [];
    var tempKeys = [];
    var contentKeys = [];
    var entityManager = saveContext.entityManager;
    var helper = entityManager.helper;
    var id = 0;
    var routePrefix = saveContext.routePrefix;

    saveBundle.entities.forEach(function (entity, index) {
      var aspect = entity.entityAspect;
      id = id + 1; // we are deliberately skipping id=0 because Content-ID = 0 seems to be ignored.
      var request = { headers: { "Content-ID": id, "DataServiceVersion": "2.0" } };
      contentKeys[id] = entity;
      if (aspect.entityState.isAdded()) {
        request.requestUri = routePrefix + entity.entityType.defaultResourceName;
        request.method = "POST";
        request.data = helper.unwrapInstance(entity, transformValue);
        tempKeys[id] = aspect.getKey();
      } else if (aspect.entityState.isModified()) {
        updateDeleteMergeRequest(request, aspect, routePrefix);
        request.method = "MERGE";
        request.data = helper.unwrapChangedValues(entity, entityManager.metadataStore, transformValue);
        // should be a PATCH/MERGE
      } else if (aspect.entityState.isDeleted()) {
        updateDeleteMergeRequest(request, aspect, routePrefix);
        request.method = "DELETE";
      } else {
        return;
      }
      request = changeRequestInterceptor.getRequest(request, entity, index);
      changeRequests.push(request);
    });
    saveContext.contentKeys = contentKeys;
    saveContext.tempKeys = tempKeys;
    changeRequestInterceptor.done(changeRequests);
    return {
      __batchRequests: [
        {
          __changeRequests: changeRequests
        }
      ]
    };

  }

  function updateDeleteMergeRequest(request, aspect, routePrefix) {
    var uriKey;
    var extraMetadata = aspect.extraMetadata;
    if (extraMetadata == null) {
      uriKey = getUriKey(aspect);
      aspect.extraMetadata = {
        uriKey: uriKey
      }
    } else {
      uriKey = extraMetadata.uriKey;
      if (extraMetadata.etag) {
        request.headers["If-Match"] = extraMetadata.etag;
      }
    }
    request.requestUri =
      // use routePrefix if uriKey lacks protocol (i.e., relative uri)
            uriKey.indexOf('//') > 0 ? uriKey : routePrefix + uriKey;
  }

  function getUriKey(aspect) {
    var entityType = aspect.entity.entityType;
    var resourceName = entityType.defaultResourceName;
    var kps = entityType.keyProperties;
    var uriKey = resourceName + "(";
    if (kps.length === 1) {
      uriKey = uriKey + fmtProperty(kps[0], aspect) + ")";
    } else {
      var delim = "";
      kps.forEach(function (kp) {
        uriKey = uriKey + delim + kp.nameOnServer + "=" + fmtProperty(kp, aspect);
        delim = ",";
      });
      uriKey = uriKey + ")";
    }
    return uriKey;
  }

  function fmtProperty(prop, aspect) {
    return prop.dataType.fmtOData(aspect.getPropertyValue(prop.name));
  }

  function createError(error, url) {
    // OData errors can have the message buried very deeply - and nonobviously
    // this code is tricky so be careful changing the response.body parsing.
    var result = new Error();
    var response = error && error.response;
    if (!response) {
      // in case DataJS returns "No handler for this data"
      result.message = error;
      result.statusText = error;
      return result;
    }
    result.message = response.statusText;
    result.statusText = response.statusText;
    result.status = response.statusCode;
    // non std
    if (url) result.url = url;
    result.body = response.body;
    if (response.body) {
      var nextErr;
      try {
        var body = JSON.parse(response.body);
        result.body = body;
        // OData v3 logic
        if (body['odata.error']) {
          body = body['odata.error'];
        }
        var msg = "";
        do {
          nextErr = body.error || body.innererror;
          if (!nextErr) msg = msg + getMessage(body);
          nextErr = nextErr || body.internalexception;
          body = nextErr || body;
        } while (nextErr);
        if (msg.length > 0) {
          result.message = msg;
        }
      } catch (e) {

      }
    }
    proto._catchNoConnectionError(result);
    return result;
  }

  function getMessage(body) {
    var msg = body.message || "";
    return ((typeof (msg) === "string") ? msg : msg.value) + "; ";
  }

  breeze.config.registerAdapter("dataService", ctor);


  var webApiODataCtor = function () {
    this.name = "webApiOData";
  }

  breeze.core.extend(webApiODataCtor.prototype, proto);

  webApiODataCtor.prototype.getRoutePrefix = function (dataService) {
    // Get the routePrefix from a Web API OData service name.
    // The routePrefix is presumed to be the pathname within the dataService.serviceName
    // Examples of servicename -> routePrefix:
    //   'http://localhost:55802/odata/' -> 'odata/'
    //   'http://198.154.121.75/service/odata/' -> 'service/odata/'
    var parser;
    if (typeof document === 'object') { // browser
      parser = document.createElement('a');
      parser.href = dataService.serviceName;
    } else { // node
      parser = url.parse(dataService.serviceName);
    }
    var prefix = parser.pathname;
    if (prefix[0] === '/') {
      prefix = prefix.substr(1);
    } // drop leading '/'  (all but IE)
    if (prefix.substr(-1) !== '/') {
      prefix += '/';
    }      // ensure trailing '/'
    return prefix;
  };

  breeze.config.registerAdapter("dataService", webApiODataCtor);
  // OData 4 adapter
  var webApiOData4Ctor = function () {
    this.name = "webApiOData4";
  }
  breeze.core.extend(webApiOData4Ctor.prototype, webApiODataCtor.prototype);
  webApiOData4Ctor.prototype.initialize = function () {
    // Aargh... they moved the cheese.
    var datajs = core.requireLib("datajs", "Needed to support remote OData v4 services");
    OData = datajs.V4.oData;
    OData.json.jsonHandler.recognizeDates = true;
  };
  webApiOData4Ctor.prototype.headers = { "OData-Version": "4.0" };
  breeze.config.registerAdapter("dataService", webApiOData4Ctor);


}));
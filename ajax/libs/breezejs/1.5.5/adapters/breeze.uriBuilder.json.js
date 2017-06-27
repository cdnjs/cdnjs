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

  var ctor = function UriBuilderJsonAdapter() {
    this.name = "json";
  };
  var proto = ctor.prototype;

  proto.initialize = function() {};

  proto.buildUri = function (entityQuery, metadataStore) {
    // force entityType validation;
    var entityType = entityQuery._getFromEntityType(metadataStore, false);
    if (!entityType) entityType = new EntityType(metadataStore);
    var json = entityQuery.toJSONExt( { entityType: entityType, toNameOnServer: true});
    json.from = undefined;
    json.queryOptions = undefined;

    var jsonString = JSON.stringify(json);
    var urlBody = encodeURIComponent(jsonString);
    return entityQuery.resourceName + "?" + urlBody;

  };

  breeze.config.registerAdapter("uriBuilder", ctor);

}));




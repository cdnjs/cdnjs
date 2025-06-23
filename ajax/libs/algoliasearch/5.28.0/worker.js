var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

// builds/worker.ts
var worker_exports = {};
__export(worker_exports, {
  algoliasearch: () => algoliasearch,
  apiClientVersion: () => apiClientVersion
});
import { abtestingClient } from "@algolia/client-abtesting";
import { analyticsClient } from "@algolia/client-analytics";
import { insightsClient } from "@algolia/client-insights";
import { personalizationClient } from "@algolia/client-personalization";
import { querySuggestionsClient } from "@algolia/client-query-suggestions";
import { searchClient } from "@algolia/client-search";
import { ingestionClient } from "@algolia/ingestion";
import { monitoringClient } from "@algolia/monitoring";
import { recommendClient } from "@algolia/recommend";

// builds/models.ts
var models_exports = {};
__export(models_exports, {
  apiClientVersion: () => apiClientVersion
});
__reExport(models_exports, client_abtesting_star);
__reExport(models_exports, client_analytics_star);
__reExport(models_exports, client_insights_star);
__reExport(models_exports, client_personalization_star);
__reExport(models_exports, client_query_suggestions_star);
__reExport(models_exports, client_search_star);
__reExport(models_exports, ingestion_star);
__reExport(models_exports, monitoring_star);
__reExport(models_exports, recommend_star);
import { apiClientVersion } from "@algolia/client-search";
import * as client_abtesting_star from "@algolia/client-abtesting";
import * as client_analytics_star from "@algolia/client-analytics";
import * as client_insights_star from "@algolia/client-insights";
import * as client_personalization_star from "@algolia/client-personalization";
import * as client_query_suggestions_star from "@algolia/client-query-suggestions";
import * as client_search_star from "@algolia/client-search";
import * as ingestion_star from "@algolia/ingestion";
import * as monitoring_star from "@algolia/monitoring";
import * as recommend_star from "@algolia/recommend";

// builds/worker.ts
__reExport(worker_exports, models_exports);
function algoliasearch(appId, apiKey, options) {
  if (!appId || typeof appId !== "string") {
    throw new Error("`appId` is missing.");
  }
  if (!apiKey || typeof apiKey !== "string") {
    throw new Error("`apiKey` is missing.");
  }
  const client = searchClient(appId, apiKey, options);
  let ingestionTransporter;
  if (options == null ? void 0 : options.transformation) {
    if (!options.transformation.region) {
      throw new Error("`region` must be provided when leveraging the transformation pipeline");
    }
    ingestionTransporter = ingestionClient(appId, apiKey, options.transformation.region, options);
  }
  return {
    ...client,
    async saveObjectsWithTransformation({ indexName, objects, waitForTasks }, requestOptions) {
      var _a;
      if (!ingestionTransporter) {
        throw new Error("`transformation.region` must be provided at client instantiation before calling this method.");
      }
      if (!((_a = options == null ? void 0 : options.transformation) == null ? void 0 : _a.region)) {
        throw new Error("`region` must be provided when leveraging the transformation pipeline");
      }
      return ingestionTransporter == null ? void 0 : ingestionTransporter.push(
        {
          indexName,
          watch: waitForTasks,
          pushTaskPayload: {
            action: "addObject",
            records: objects
          }
        },
        requestOptions
      );
    },
    async partialUpdateObjectsWithTransformation({ indexName, objects, createIfNotExists, waitForTasks }, requestOptions) {
      var _a;
      if (!ingestionTransporter) {
        throw new Error("`transformation.region` must be provided at client instantiation before calling this method.");
      }
      if (!((_a = options == null ? void 0 : options.transformation) == null ? void 0 : _a.region)) {
        throw new Error("`region` must be provided when leveraging the transformation pipeline");
      }
      return ingestionTransporter == null ? void 0 : ingestionTransporter.push(
        {
          indexName,
          watch: waitForTasks,
          pushTaskPayload: {
            action: createIfNotExists ? "partialUpdateObject" : "partialUpdateObjectNoCreate",
            records: objects
          }
        },
        requestOptions
      );
    },
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua() {
      return client.transporter.algoliaAgent.value;
    },
    initAbtesting: (initOptions) => {
      return abtestingClient(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options
      );
    },
    initAnalytics: (initOptions) => {
      return analyticsClient(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options
      );
    },
    initIngestion: (initOptions) => {
      return ingestionClient(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options
      );
    },
    initInsights: (initOptions) => {
      return insightsClient(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options
      );
    },
    initMonitoring: (initOptions = {}) => {
      return monitoringClient(initOptions.appId || appId, initOptions.apiKey || apiKey, initOptions.options);
    },
    initPersonalization: (initOptions) => {
      return personalizationClient(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options
      );
    },
    initQuerySuggestions: (initOptions) => {
      return querySuggestionsClient(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options
      );
    },
    initRecommend: (initOptions = {}) => {
      return recommendClient(initOptions.appId || appId, initOptions.apiKey || apiKey, initOptions.options);
    }
  };
}
export {
  algoliasearch,
  apiClientVersion
};
//# sourceMappingURL=worker.js.map
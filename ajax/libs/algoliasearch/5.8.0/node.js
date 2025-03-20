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

// builds/node.ts
var node_exports = {};
__export(node_exports, {
  algoliasearch: () => algoliasearch,
  apiClientVersion: () => apiClientVersion
});
import { abtestingClient } from "@algolia/client-abtesting";
import { analyticsClient } from "@algolia/client-analytics";
import { personalizationClient } from "@algolia/client-personalization";
import { searchClient } from "@algolia/client-search";
import { recommendClient } from "@algolia/recommend";

// builds/models.ts
var models_exports = {};
__export(models_exports, {
  apiClientVersion: () => apiClientVersion
});
__reExport(models_exports, client_abtesting_star);
__reExport(models_exports, client_analytics_star);
__reExport(models_exports, client_personalization_star);
__reExport(models_exports, client_search_star);
__reExport(models_exports, recommend_star);
import { apiClientVersion } from "@algolia/client-search";
import * as client_abtesting_star from "@algolia/client-abtesting";
import * as client_analytics_star from "@algolia/client-analytics";
import * as client_personalization_star from "@algolia/client-personalization";
import * as client_search_star from "@algolia/client-search";
import * as recommend_star from "@algolia/recommend";

// builds/node.ts
__reExport(node_exports, models_exports);
function algoliasearch(appId, apiKey, options) {
  if (!appId || typeof appId !== "string") {
    throw new Error("`appId` is missing.");
  }
  if (!apiKey || typeof apiKey !== "string") {
    throw new Error("`apiKey` is missing.");
  }
  const client = searchClient(appId, apiKey, options);
  return {
    ...client,
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua() {
      return client.transporter.algoliaAgent.value;
    },
    initRecommend: (initOptions = {}) => {
      return recommendClient(initOptions.appId || appId, initOptions.apiKey || apiKey, initOptions.options);
    },
    initAnalytics: (initOptions = {}) => {
      return analyticsClient(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options
      );
    },
    initAbtesting: (initOptions = {}) => {
      return abtestingClient(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options
      );
    },
    initPersonalization: (initOptions) => {
      return personalizationClient(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options
      );
    }
  };
}
export {
  algoliasearch,
  apiClientVersion
};
//# sourceMappingURL=node.js.map
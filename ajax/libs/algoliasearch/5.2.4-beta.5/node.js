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
  AbtestingClient: () => AbtestingClient,
  AnalyticsClient: () => AnalyticsClient,
  PersonalizationClient: () => PersonalizationClient,
  RecommendClient: () => RecommendClient,
  SearchClient: () => SearchClient,
  algoliasearch: () => algoliasearch,
  apiClientVersion: () => apiClientVersion
});
import { createHmac } from "node:crypto";
import { abtestingClient } from "@algolia/client-abtesting";
import { analyticsClient } from "@algolia/client-analytics";
import {
  DEFAULT_CONNECT_TIMEOUT_NODE,
  DEFAULT_READ_TIMEOUT_NODE,
  DEFAULT_WRITE_TIMEOUT_NODE,
  createMemoryCache,
  createNullCache,
  serializeQueryParameters
} from "@algolia/client-common";
import { personalizationClient } from "@algolia/client-personalization";
import { searchClient } from "@algolia/client-search";
import { recommendClient } from "@algolia/recommend";
import { createHttpRequester } from "@algolia/requester-node-http";

// builds/models.ts
var models_exports = {};
__export(models_exports, {
  AbtestingClient: () => AbtestingClient,
  AnalyticsClient: () => AnalyticsClient,
  PersonalizationClient: () => PersonalizationClient,
  RecommendClient: () => RecommendClient,
  SearchClient: () => SearchClient,
  apiClientVersion: () => apiClientVersion
});
__reExport(models_exports, client_search_star);
__reExport(models_exports, recommend_star);
__reExport(models_exports, client_personalization_star);
__reExport(models_exports, client_analytics_star);
__reExport(models_exports, client_abtesting_star);
import { apiClientVersion } from "@algolia/client-search";
import * as client_search_star from "@algolia/client-search";
import * as recommend_star from "@algolia/recommend";
import * as client_personalization_star from "@algolia/client-personalization";
import * as client_analytics_star from "@algolia/client-analytics";
import * as client_abtesting_star from "@algolia/client-abtesting";
import { SearchClient } from "@algolia/client-search";
import { RecommendClient } from "@algolia/recommend";
import { PersonalizationClient } from "@algolia/client-personalization";
import { AnalyticsClient } from "@algolia/client-analytics";
import { AbtestingClient } from "@algolia/client-abtesting";

// builds/node.ts
__reExport(node_exports, models_exports);
function algoliasearch(appId, apiKey, options) {
  if (!appId || typeof appId !== "string") {
    throw new Error("`appId` is missing.");
  }
  if (!apiKey || typeof apiKey !== "string") {
    throw new Error("`apiKey` is missing.");
  }
  function initRecommend(initOptions = {}) {
    return recommendClient(initOptions.appId || appId, initOptions.apiKey || apiKey, initOptions.options);
  }
  function initAnalytics(initOptions = {}) {
    return analyticsClient(
      initOptions.appId || appId,
      initOptions.apiKey || apiKey,
      initOptions.region,
      initOptions.options
    );
  }
  function initAbtesting(initOptions = {}) {
    return abtestingClient(
      initOptions.appId || appId,
      initOptions.apiKey || apiKey,
      initOptions.region,
      initOptions.options
    );
  }
  function initPersonalization(initOptions) {
    return personalizationClient(
      initOptions.appId || appId,
      initOptions.apiKey || apiKey,
      initOptions.region,
      initOptions.options
    );
  }
  return {
    ...searchClient(appId, apiKey, {
      timeouts: {
        connect: DEFAULT_CONNECT_TIMEOUT_NODE,
        read: DEFAULT_READ_TIMEOUT_NODE,
        write: DEFAULT_WRITE_TIMEOUT_NODE
      },
      requester: createHttpRequester(),
      algoliaAgents: [{ segment: "Node.js", version: process.versions.node }],
      responsesCache: createNullCache(),
      requestsCache: createNullCache(),
      hostsCache: createMemoryCache(),
      ...options
    }),
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua() {
      return this.transporter.algoliaAgent.value;
    },
    initAbtesting,
    initAnalytics,
    initPersonalization,
    initRecommend,
    /**
     * Helper: Generates a secured API key based on the given `parentApiKey` and given `restrictions`.
     *
     * @summary Helper: Generates a secured API key based on the given `parentApiKey` and given `restrictions`.
     * @param generateSecuredApiKey - The `generateSecuredApiKey` object.
     * @param generateSecuredApiKey.parentApiKey - The base API key from which to generate the new secured one.
     * @param generateSecuredApiKey.restrictions - A set of properties defining the restrictions of the secured API key.
     */
    generateSecuredApiKey({ parentApiKey, restrictions = {} }) {
      let mergedRestrictions = restrictions;
      if (restrictions.searchParams) {
        mergedRestrictions = {
          ...restrictions,
          ...restrictions.searchParams
        };
        delete mergedRestrictions.searchParams;
      }
      mergedRestrictions = Object.keys(mergedRestrictions).sort().reduce(
        (acc, key) => {
          acc[key] = mergedRestrictions[key];
          return acc;
        },
        {}
      );
      const queryParameters = serializeQueryParameters(mergedRestrictions);
      return Buffer.from(
        createHmac("sha256", parentApiKey).update(queryParameters).digest("hex") + queryParameters
      ).toString("base64");
    },
    /**
     * Helper: Retrieves the remaining validity of the previous generated `securedApiKey`, the `ValidUntil` parameter must have been provided.
     *
     * @summary Helper: Retrieves the remaining validity of the previous generated `secured_api_key`, the `ValidUntil` parameter must have been provided.
     * @param getSecuredApiKeyRemainingValidity - The `getSecuredApiKeyRemainingValidity` object.
     * @param getSecuredApiKeyRemainingValidity.securedApiKey - The secured API key generated with the `generateSecuredApiKey` method.
     */
    getSecuredApiKeyRemainingValidity({ securedApiKey }) {
      const decodedString = Buffer.from(securedApiKey, "base64").toString("ascii");
      const regex = /validUntil=(\d+)/;
      const match = decodedString.match(regex);
      if (match === null) {
        throw new Error("validUntil not found in given secured api key.");
      }
      return parseInt(match[1], 10) - Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
    }
  };
}
export {
  AbtestingClient,
  AnalyticsClient,
  PersonalizationClient,
  RecommendClient,
  SearchClient,
  algoliasearch,
  apiClientVersion
};
//# sourceMappingURL=node.js.map
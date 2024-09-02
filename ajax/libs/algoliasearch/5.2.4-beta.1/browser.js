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

// builds/browser.ts
var browser_exports = {};
__export(browser_exports, {
  ABTestingRegion: () => ABTestingRegion,
  AbtestingClient: () => AbtestingClient,
  AdvancedSyntaxFeatures: () => AdvancedSyntaxFeatures,
  AlternativesAsExact: () => AlternativesAsExact,
  AnalyticsClient: () => AnalyticsClient,
  AnalyticsRegion: () => AnalyticsRegion,
  Anchoring: () => Anchoring,
  AroundPrecision: () => AroundPrecision,
  AroundRadius: () => AroundRadius,
  AroundRadiusAll: () => AroundRadiusAll,
  AutomaticFacetFilter: () => AutomaticFacetFilter,
  AutomaticFacetFilters: () => AutomaticFacetFilters,
  BaseSearchParams: () => BaseSearchParams,
  BaseSearchParamsWithoutQuery: () => BaseSearchParamsWithoutQuery,
  BaseSearchResponse: () => BaseSearchResponse,
  BooleanString: () => BooleanString,
  Condition: () => Condition,
  Consequence: () => Consequence,
  ConsequenceHide: () => ConsequenceHide,
  ConsequenceParams: () => ConsequenceParams,
  ConsequenceQuery: () => ConsequenceQuery,
  ConsequenceQueryObject: () => ConsequenceQueryObject,
  CustomDeleteProps: () => CustomDeleteProps,
  CustomGetProps: () => CustomGetProps,
  CustomPostProps: () => CustomPostProps,
  CustomPutProps: () => CustomPutProps,
  DeletedAtResponse: () => DeletedAtResponse,
  Distinct: () => Distinct,
  Edit: () => Edit,
  EditType: () => EditType,
  ErrorBase: () => ErrorBase,
  ExactOnSingleWordQuery: () => ExactOnSingleWordQuery,
  Exhaustive: () => Exhaustive,
  FacetFilters: () => FacetFilters,
  FacetOrdering: () => FacetOrdering,
  FacetStats: () => FacetStats,
  Facets: () => Facets,
  HighlightResult: () => HighlightResult,
  HighlightResultOption: () => HighlightResultOption,
  IgnorePlurals: () => IgnorePlurals,
  IndexSettingsAsSearchParams: () => IndexSettingsAsSearchParams,
  MatchLevel: () => MatchLevel,
  MatchedGeoLocation: () => MatchedGeoLocation,
  Mode: () => Mode,
  NumericFilters: () => NumericFilters,
  OptionalFilters: () => OptionalFilters,
  Params: () => Params,
  Personalization: () => Personalization,
  PersonalizationClient: () => PersonalizationClient,
  Promote: () => Promote,
  PromoteObjectID: () => PromoteObjectID,
  PromoteObjectIDs: () => PromoteObjectIDs,
  QueryType: () => QueryType,
  Range: () => Range,
  RankingInfo: () => RankingInfo,
  ReRankingApplyFilter: () => ReRankingApplyFilter,
  RecommendClient: () => RecommendClient,
  Redirect: () => Redirect,
  RedirectRuleIndexData: () => RedirectRuleIndexData,
  RedirectRuleIndexMetadata: () => RedirectRuleIndexMetadata,
  RedirectURL: () => RedirectURL,
  RemoveStopWords: () => RemoveStopWords,
  RemoveWordsIfNoResults: () => RemoveWordsIfNoResults,
  RenderingContent: () => RenderingContent,
  SearchClient: () => SearchClient,
  SearchPagination: () => SearchPagination,
  SearchParams: () => SearchParams,
  SearchParamsObject: () => SearchParamsObject,
  SearchParamsQuery: () => SearchParamsQuery,
  SemanticSearch: () => SemanticSearch,
  SnippetResult: () => SnippetResult,
  SnippetResultOption: () => SnippetResultOption,
  SortRemainingBy: () => SortRemainingBy,
  SupportedLanguage: () => SupportedLanguage,
  TagFilters: () => TagFilters,
  TaskStatus: () => TaskStatus,
  TypoTolerance: () => TypoTolerance,
  TypoToleranceEnum: () => TypoToleranceEnum,
  Value: () => Value,
  algoliasearch: () => algoliasearch,
  apiClientVersion: () => apiClientVersion
});
import { abtestingClient } from "@algolia/client-abtesting";
import { analyticsClient } from "@algolia/client-analytics";
import {
  DEFAULT_CONNECT_TIMEOUT_BROWSER,
  DEFAULT_READ_TIMEOUT_BROWSER,
  DEFAULT_WRITE_TIMEOUT_BROWSER,
  createBrowserLocalStorageCache,
  createFallbackableCache,
  createMemoryCache
} from "@algolia/client-common";
import { personalizationClient } from "@algolia/client-personalization";
import { searchClient } from "@algolia/client-search";
import { recommendClient } from "@algolia/recommend";
import { createXhrRequester } from "@algolia/requester-browser-xhr";

// builds/models.ts
var models_exports = {};
__export(models_exports, {
  ABTestingRegion: () => ABTestingRegion,
  AbtestingClient: () => AbtestingClient,
  AdvancedSyntaxFeatures: () => AdvancedSyntaxFeatures,
  AlternativesAsExact: () => AlternativesAsExact,
  AnalyticsClient: () => AnalyticsClient,
  AnalyticsRegion: () => AnalyticsRegion,
  Anchoring: () => Anchoring,
  AroundPrecision: () => AroundPrecision,
  AroundRadius: () => AroundRadius,
  AroundRadiusAll: () => AroundRadiusAll,
  AutomaticFacetFilter: () => AutomaticFacetFilter,
  AutomaticFacetFilters: () => AutomaticFacetFilters,
  BaseSearchParams: () => BaseSearchParams,
  BaseSearchParamsWithoutQuery: () => BaseSearchParamsWithoutQuery,
  BaseSearchResponse: () => BaseSearchResponse,
  BooleanString: () => BooleanString,
  Condition: () => Condition,
  Consequence: () => Consequence,
  ConsequenceHide: () => ConsequenceHide,
  ConsequenceParams: () => ConsequenceParams,
  ConsequenceQuery: () => ConsequenceQuery,
  ConsequenceQueryObject: () => ConsequenceQueryObject,
  CustomDeleteProps: () => CustomDeleteProps,
  CustomGetProps: () => CustomGetProps,
  CustomPostProps: () => CustomPostProps,
  CustomPutProps: () => CustomPutProps,
  DeletedAtResponse: () => DeletedAtResponse,
  Distinct: () => Distinct,
  Edit: () => Edit,
  EditType: () => EditType,
  ErrorBase: () => ErrorBase,
  ExactOnSingleWordQuery: () => ExactOnSingleWordQuery,
  Exhaustive: () => Exhaustive,
  FacetFilters: () => FacetFilters,
  FacetOrdering: () => FacetOrdering,
  FacetStats: () => FacetStats,
  Facets: () => Facets,
  HighlightResult: () => HighlightResult,
  HighlightResultOption: () => HighlightResultOption,
  IgnorePlurals: () => IgnorePlurals,
  IndexSettingsAsSearchParams: () => IndexSettingsAsSearchParams,
  MatchLevel: () => MatchLevel,
  MatchedGeoLocation: () => MatchedGeoLocation,
  Mode: () => Mode,
  NumericFilters: () => NumericFilters,
  OptionalFilters: () => OptionalFilters,
  Params: () => Params,
  Personalization: () => Personalization,
  PersonalizationClient: () => PersonalizationClient,
  Promote: () => Promote,
  PromoteObjectID: () => PromoteObjectID,
  PromoteObjectIDs: () => PromoteObjectIDs,
  QueryType: () => QueryType,
  Range: () => Range,
  RankingInfo: () => RankingInfo,
  ReRankingApplyFilter: () => ReRankingApplyFilter,
  RecommendClient: () => RecommendClient,
  Redirect: () => Redirect,
  RedirectRuleIndexData: () => RedirectRuleIndexData,
  RedirectRuleIndexMetadata: () => RedirectRuleIndexMetadata,
  RedirectURL: () => RedirectURL,
  RemoveStopWords: () => RemoveStopWords,
  RemoveWordsIfNoResults: () => RemoveWordsIfNoResults,
  RenderingContent: () => RenderingContent,
  SearchClient: () => SearchClient,
  SearchPagination: () => SearchPagination,
  SearchParams: () => SearchParams,
  SearchParamsObject: () => SearchParamsObject,
  SearchParamsQuery: () => SearchParamsQuery,
  SemanticSearch: () => SemanticSearch,
  SnippetResult: () => SnippetResult,
  SnippetResultOption: () => SnippetResultOption,
  SortRemainingBy: () => SortRemainingBy,
  SupportedLanguage: () => SupportedLanguage,
  TagFilters: () => TagFilters,
  TaskStatus: () => TaskStatus,
  TypoTolerance: () => TypoTolerance,
  TypoToleranceEnum: () => TypoToleranceEnum,
  Value: () => Value,
  apiClientVersion: () => apiClientVersion
});
__reExport(models_exports, client_search_star);
__reExport(models_exports, recommend_star);
__reExport(models_exports, client_personalization_star);
__reExport(models_exports, client_analytics_star);
__reExport(models_exports, client_abtesting_star);
import { Region as ABTestingRegion } from "@algolia/client-abtesting";
import { Region as AnalyticsRegion } from "@algolia/client-analytics";
import {
  AdvancedSyntaxFeatures,
  AlternativesAsExact,
  Anchoring,
  AroundPrecision,
  AroundRadius,
  AroundRadiusAll,
  AutomaticFacetFilter,
  AutomaticFacetFilters,
  BaseSearchParams,
  BaseSearchParamsWithoutQuery,
  BaseSearchResponse,
  BooleanString,
  Condition,
  Consequence,
  ConsequenceHide,
  ConsequenceParams,
  ConsequenceQuery,
  ConsequenceQueryObject,
  CustomDeleteProps,
  CustomGetProps,
  CustomPostProps,
  CustomPutProps,
  DeletedAtResponse,
  Distinct,
  Edit,
  EditType,
  ErrorBase,
  ExactOnSingleWordQuery,
  Exhaustive,
  FacetFilters,
  FacetOrdering,
  Facets,
  FacetStats,
  HighlightResult,
  HighlightResultOption,
  IgnorePlurals,
  IndexSettingsAsSearchParams,
  MatchLevel,
  MatchedGeoLocation,
  Mode,
  NumericFilters,
  OptionalFilters,
  Params,
  Personalization,
  Promote,
  PromoteObjectID,
  PromoteObjectIDs,
  QueryType,
  Range,
  RankingInfo,
  ReRankingApplyFilter,
  Redirect,
  RedirectRuleIndexMetadata,
  RedirectRuleIndexData,
  RedirectURL,
  RemoveStopWords,
  RemoveWordsIfNoResults,
  RenderingContent,
  SearchPagination,
  SearchParams,
  SearchParamsObject,
  SearchParamsQuery,
  SemanticSearch,
  SnippetResult,
  SnippetResultOption,
  SortRemainingBy,
  SupportedLanguage,
  TagFilters,
  TaskStatus,
  TypoTolerance,
  TypoToleranceEnum,
  Value,
  apiClientVersion
} from "@algolia/client-search";
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

// builds/browser.ts
__reExport(browser_exports, models_exports);
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
        connect: DEFAULT_CONNECT_TIMEOUT_BROWSER,
        read: DEFAULT_READ_TIMEOUT_BROWSER,
        write: DEFAULT_WRITE_TIMEOUT_BROWSER
      },
      requester: createXhrRequester(),
      algoliaAgents: [{ segment: "Browser" }],
      authMode: "WithinQueryParameters",
      responsesCache: createMemoryCache(),
      requestsCache: createMemoryCache({ serializable: false }),
      hostsCache: createFallbackableCache({
        caches: [createBrowserLocalStorageCache({ key: `${apiClientVersion}-${appId}` }), createMemoryCache()]
      }),
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
    initRecommend
  };
}
export {
  ABTestingRegion,
  AbtestingClient,
  AdvancedSyntaxFeatures,
  AlternativesAsExact,
  AnalyticsClient,
  AnalyticsRegion,
  Anchoring,
  AroundPrecision,
  AroundRadius,
  AroundRadiusAll,
  AutomaticFacetFilter,
  AutomaticFacetFilters,
  BaseSearchParams,
  BaseSearchParamsWithoutQuery,
  BaseSearchResponse,
  BooleanString,
  Condition,
  Consequence,
  ConsequenceHide,
  ConsequenceParams,
  ConsequenceQuery,
  ConsequenceQueryObject,
  CustomDeleteProps,
  CustomGetProps,
  CustomPostProps,
  CustomPutProps,
  DeletedAtResponse,
  Distinct,
  Edit,
  EditType,
  ErrorBase,
  ExactOnSingleWordQuery,
  Exhaustive,
  FacetFilters,
  FacetOrdering,
  FacetStats,
  Facets,
  HighlightResult,
  HighlightResultOption,
  IgnorePlurals,
  IndexSettingsAsSearchParams,
  MatchLevel,
  MatchedGeoLocation,
  Mode,
  NumericFilters,
  OptionalFilters,
  Params,
  Personalization,
  PersonalizationClient,
  Promote,
  PromoteObjectID,
  PromoteObjectIDs,
  QueryType,
  Range,
  RankingInfo,
  ReRankingApplyFilter,
  RecommendClient,
  Redirect,
  RedirectRuleIndexData,
  RedirectRuleIndexMetadata,
  RedirectURL,
  RemoveStopWords,
  RemoveWordsIfNoResults,
  RenderingContent,
  SearchClient,
  SearchPagination,
  SearchParams,
  SearchParamsObject,
  SearchParamsQuery,
  SemanticSearch,
  SnippetResult,
  SnippetResultOption,
  SortRemainingBy,
  SupportedLanguage,
  TagFilters,
  TaskStatus,
  TypoTolerance,
  TypoToleranceEnum,
  Value,
  algoliasearch,
  apiClientVersion
};
//# sourceMappingURL=browser.js.map
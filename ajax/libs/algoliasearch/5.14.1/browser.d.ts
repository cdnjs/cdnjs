import { ClientOptions } from '@algolia/client-common';
import { Region as Region$1, RegionOptions as RegionOptions$1, AbtestingClient } from '@algolia/client-abtesting';
export * from '@algolia/client-abtesting';
export { Region as AbtestingRegion, RegionOptions as AbtestingRegionOptions, Status } from '@algolia/client-abtesting';
import { Region as Region$2, RegionOptions as RegionOptions$2, AnalyticsClient } from '@algolia/client-analytics';
export * from '@algolia/client-analytics';
export { Region as AnalyticsRegion, RegionOptions as AnalyticsRegionOptions } from '@algolia/client-analytics';
import { Region as Region$4, RegionOptions as RegionOptions$4, InsightsClient } from '@algolia/client-insights';
export * from '@algolia/client-insights';
export { Region as InsightsRegion, RegionOptions as InsightsRegionOptions } from '@algolia/client-insights';
import { Region as Region$5, RegionOptions as RegionOptions$5, PersonalizationClient } from '@algolia/client-personalization';
export * from '@algolia/client-personalization';
export { EventType, Region as PersonalizationRegion, RegionOptions as PersonalizationRegionOptions } from '@algolia/client-personalization';
import { Region as Region$6, RegionOptions as RegionOptions$6, QuerySuggestionsClient } from '@algolia/client-query-suggestions';
export * from '@algolia/client-query-suggestions';
export { Region as QuerySuggestionsRegion, RegionOptions as QuerySuggestionsRegionOptions } from '@algolia/client-query-suggestions';
import { SearchClient } from '@algolia/client-search';
export * from '@algolia/client-search';
export { Action, AdvancedSyntaxFeatures, AlternativesAsExact, Anchoring, AroundPrecision, AroundRadius, AroundRadiusAll, AutomaticFacetFilter, AutomaticFacetFilters, Banner, BannerImage, BannerImageUrl, BannerLink, BaseIndexSettings, BaseSearchParams, BaseSearchParamsWithoutQuery, BaseSearchResponse, BooleanString, Condition, Consequence, ConsequenceHide, ConsequenceParams, ConsequenceQuery, ConsequenceQueryObject, CustomDeleteProps, CustomGetProps, CustomPostProps, CustomPutProps, DeleteSourceProps, DeletedAtResponse, Distinct, Edit, EditType, ErrorBase, ExactOnSingleWordQuery, Exhaustive, FacetFilters, FacetOrdering, FacetStats, Facets, GetTaskProps, HighlightResult, HighlightResultOption, IgnorePlurals, IndexSettingsAsSearchParams, Languages, MatchLevel, MatchedGeoLocation, Mode, NumericFilters, OptionalFilters, Params, Personalization, Promote, PromoteObjectID, PromoteObjectIDs, QueryType, Range, RankingInfo, ReRankingApplyFilter, Redirect, RedirectRuleIndexData, RedirectRuleIndexMetadata, RedirectURL, RemoveStopWords, RemoveWordsIfNoResults, RenderingContent, SearchPagination, SearchParams, SearchParamsObject, SearchParamsQuery, SemanticSearch, SnippetResult, SnippetResultOption, SortRemainingBy, Source, SupportedLanguage, TagFilters, TaskStatus, TimeRange, TypoTolerance, TypoToleranceEnum, Value, Widgets, apiClientVersion } from '@algolia/client-search';
import { Region as Region$3, RegionOptions as RegionOptions$3, IngestionClient } from '@algolia/ingestion';
export * from '@algolia/ingestion';
export { Region as IngestionRegion, RegionOptions as IngestionRegionOptions } from '@algolia/ingestion';
import { MonitoringClient } from '@algolia/monitoring';
export * from '@algolia/monitoring';
import { RecommendClient } from '@algolia/recommend';
export * from '@algolia/recommend';

type Region = Region$1 | Region$2 | Region$3 | Region$4 | Region$5 | Region$6;
type RegionOptions = RegionOptions$1 | RegionOptions$2 | RegionOptions$3 | RegionOptions$4 | RegionOptions$5 | RegionOptions$6;

/**
 * Options forwarded to the client initialized via the `init` method.
 */
type InitClientOptions = Partial<{
    /**
     * App to target with the initialized client, defaults to the `algoliasearch` appId.
     */
    appId: string;
    /**
     * API key of the targeted app ID, defaults to the `algoliasearch` apiKey.
     */
    apiKey: string;
    options: ClientOptions;
}>;

type Algoliasearch = SearchClient & {
    initAbtesting: (initOptions: InitClientOptions & RegionOptions$1) => AbtestingClient;
    initAnalytics: (initOptions: InitClientOptions & RegionOptions$2) => AnalyticsClient;
    initIngestion: (initOptions: InitClientOptions & RegionOptions$3) => IngestionClient;
    initInsights: (initOptions: InitClientOptions & RegionOptions$4) => InsightsClient;
    initMonitoring: (initOptions?: InitClientOptions) => MonitoringClient;
    initPersonalization: (initOptions: InitClientOptions & RegionOptions$5) => PersonalizationClient;
    initQuerySuggestions: (initOptions: InitClientOptions & RegionOptions$6) => QuerySuggestionsClient;
    initRecommend: (initOptions?: InitClientOptions) => RecommendClient;
};
declare function algoliasearch(appId: string, apiKey: string, options?: ClientOptions): Algoliasearch;

export { type Algoliasearch, type InitClientOptions, type Region, type RegionOptions, algoliasearch };

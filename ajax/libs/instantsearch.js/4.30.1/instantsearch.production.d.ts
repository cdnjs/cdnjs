/// <reference types="google.maps" />
/// <reference types="node" />

import type algoliasearch from 'algoliasearch/lite';
import type { AlgoliaSearchHelper } from 'algoliasearch-helper';
import type * as ClientSearch from '@algolia/client-search';
import EventEmitter from 'events';
import type * as Places from 'places.js';
import type { PlainSearchParameters } from 'algoliasearch-helper';
import { default as qs_2 } from 'qs';
import type { SearchParameters } from 'algoliasearch-helper';
import type { SearchResults } from 'algoliasearch-helper';

declare type AlgoliaHit = {
    [attribute: string]: any;
    objectID: string;
    _highlightResult?: HitHighlightResult;
    _snippetResult?: HitSnippetResult;
    _rankingInfo?: {
        promoted: boolean;
        nbTypos: number;
        firstMatchedWord: number;
        proximityDistance?: number;
        geoDistance: number;
        geoPrecision?: number;
        nbExactWords: number;
        words: number;
        filters: number;
        userScore: number;
        matchedGeoLocation?: {
            lat: number;
            lng: number;
            distance: number;
        };
    };
    _distinctSeqID?: number;
    _geoLoc?: GeoLoc;
};

declare const analytics: AnalyticsWidget;

declare type AnalyticsWidget = WidgetFactory<AnalyticsWidgetDescription, AnalyticsWidgetParams, AnalyticsWidgetParams>;

declare type AnalyticsWidgetDescription = {
    $$type: 'ais.analytics';
    $$widgetType: 'ais.analytics';
    renderState: Record<string, unknown>;
    indexRenderState: {
        analytics: WidgetRenderState<Record<string, unknown>, AnalyticsWidgetParams>;
    };
};

declare type AnalyticsWidgetParams = {
    /**
     * A function that is called every time the query or refinements changes. You
     * need to add the logic to push the data to your analytics platform.
     */
    pushFunction: AnalyticsWidgetParamsPushFunction;
    /**
     * The number of milliseconds between the last search keystroke and calling `pushFunction`.
     *
     * @default 3000
     */
    delay?: number;
    /**
     * Triggers `pushFunction` after click on page or redirecting the page. This is useful if
     * you want the pushFunction to be called for the last actions before the user leaves the
     * current page, even if the delay wasn’t reached.
     *
     * @default false
     */
    triggerOnUIInteraction?: boolean;
    /**
     * Triggers `pushFunction` when InstantSearch is initialized. This means
     * the `pushFunction` might be called even though the user didn’t perfom
     * any search-related action.
     *
     * @default true
     */
    pushInitialSearch?: boolean;
    /**
     * Triggers `pushFunction` when the page changes, either through the UI or programmatically.
     *
     * @default false
     */
    pushPagination?: boolean;
};

declare type AnalyticsWidgetParamsPushFunction = (
/**
 * Contains the search parameters, serialized as a query string.
 */
formattedParameters: string, 
/**
 * Contains the whole search state.
 */
state: SearchParameters, 
/**
 * The last received results.
 */
results: SearchResults) => void;

declare type AnswersConnector = Connector<AnswersWidgetDescription, AnswersConnectorParams>;

declare type AnswersConnectorParams = {
    /**
     * Attributes to use for predictions.
     * If empty, we use all `searchableAttributes` to find answers.
     * All your `attributesForPrediction` must be part of your `searchableAttributes`.
     */
    attributesForPrediction?: string[];
    /**
     * The languages in the query. Currently only supports `en`.
     */
    queryLanguages: ['en'];
    /**
     * Maximum number of answers to retrieve from the Answers Engine.
     * Cannot be greater than 1000.
     * @default 1
     */
    nbHits?: number;
    /**
     * Debounce time in milliseconds to debounce render
     * @default 100
     */
    renderDebounceTime?: number;
    /**
     * Debounce time in milliseconds to debounce search
     * @default 100
     */
    searchDebounceTime?: number;
    /**
     * Whether to escape HTML tags from hits string values.
     *
     * @default true
     */
    escapeHTML?: boolean;
    /**
     * Extra parameters to pass to findAnswers method.
     * @default {}
     */
    extraParameters?: FindAnswersOptions;
};

declare type AnswersCSSClasses = Partial<{
    /**
     * CSS class to add to the root element of the widget.
     */
    root: string | string[];
    /**
     * CSS class to add to the wrapping element when no results.
     */
    emptyRoot: string | string[];
    /**
     * CSS classes to add to the header.
     */
    header: string | string[];
    /**
     * CSS classes to add to the loader.
     */
    loader: string | string[];
    /**
     * CSS class to add to the list of results.
     */
    list: string | string[];
    /**
     * CSS class to add to each result.
     */
    item: string | string[];
}>;

declare type AnswersRenderState = {
    /**
     * The matched hits from Algolia API.
     */
    hits: Hits;
    /**
     * Whether it's still loading the results from the Answers API.
     */
    isLoading: boolean;
};

declare type AnswersTemplates = Partial<{
    /**
     * Template to use for the header. This template will receive an object containing `hits` and `isLoading`.
     */
    header: Template<{
        hits: Hit[];
        isLoading: boolean;
    }>;
    /**
     * Template to use for the loader.
     */
    loader: Template;
    /**
     * Template to use for each result. This template will receive an object containing a single record.
     */
    item: Template<Hit>;
}>;

declare type AnswersWidget = WidgetFactory<AnswersWidgetDescription & {
    $$widgetType: 'ais.answers';
}, AnswersConnectorParams, AnswersWidgetParams>;

declare const answersWidget: AnswersWidget;

declare type AnswersWidgetDescription = {
    $$type: 'ais.answers';
    renderState: AnswersRenderState;
    indexRenderState: {
        answers: WidgetRenderState<AnswersRenderState, AnswersConnectorParams>;
    };
};

declare type AnswersWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * The templates to use for the widget.
     */
    templates?: AnswersTemplates;
    /**
     * The CSS classes to override.
     */
    cssClasses?: AnswersCSSClasses;
};

declare type AnyWidgetFactory = WidgetFactory<{
    $$type: string;
}, Record<string, any>, any>;

declare type AtLeastOne<TTarget, TMapped = {
    [Key in keyof TTarget]: Pick<TTarget, Key>;
}> = Partial<TTarget> & TMapped[keyof TMapped];

declare type AugmentedWidget<TWidgetFactory extends AnyWidgetFactory, TOverriddenKeys extends keyof Widget = 'init' | 'render' | 'dispose'> = Omit<ReturnType<TWidgetFactory>, TOverriddenKeys> & Pick<Required<Widget>, TOverriddenKeys>;

declare type AutocompleteConnector = Connector<AutocompleteWidgetDescription, AutocompleteConnectorParams>;

declare type AutocompleteConnectorParams = {
    /**
     * Escapes HTML entities from hits string values.
     *
     * @default `true`
     */
    escapeHTML?: boolean;
};

declare type AutocompleteRenderState = {
    /**
     * The current value of the query.
     */
    currentRefinement: string;
    /**
     * The indices this widget has access to.
     */
    indices: Array<{
        /**
         * The name of the index
         */
        indexName: string;
        /**
         * The resolved hits from the index matching the query.
         */
        hits: Hits;
        /**
         * The full results object from the Algolia API.
         */
        results: SearchResults;
        /**
         * Send event to insights middleware
         */
        sendEvent: SendEventForHits;
    }>;
    /**
     * Searches into the indices with the provided query.
     */
    refine: (query: string) => void;
};

declare type AutocompleteWidgetDescription = {
    $$type: 'ais.autocomplete';
    renderState: AutocompleteRenderState;
    indexRenderState: {
        autocomplete: WidgetRenderState<AutocompleteRenderState, AutocompleteConnectorParams>;
    };
    indexUiState: {
        query: string;
    };
};

declare type BindEventForHits = BuiltInBindEventForHits & CustomBindEventForHits;

declare type Bounds = {
    /**
     * The top right corner of the map view.
     */
    northEast: GeoLoc;
    /**
     * The bottom left corner of the map view.
     */
    southWest: GeoLoc;
};

declare const breadcrumb: BreadcrumbWidget;

declare type BreadcrumbConnector = Connector<BreadcrumbWidgetDescription, BreadcrumbConnectorParams>;

declare type BreadcrumbConnectorParams = {
    /**
     * Attributes to use to generate the hierarchy of the breadcrumb.
     */
    attributes: string[];
    /**
     * Prefix path to use if the first level is not the root level.
     */
    rootPath?: string;
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<BreadcrumbConnectorParamsItem>;
    /**
     * The level separator used in the records.
     *
     * @default '>'
     */
    separator?: string;
};

declare type BreadcrumbConnectorParamsItem = {
    /**
     * Label of the category or subcategory.
     */
    label: string;
    /**
     * Value of breadcrumb item.
     */
    value: string | null;
};

declare type BreadcrumbCSSClasses = Partial<{
    /**
     * CSS class to add to the root element of the widget.
     */
    root: string | string[];
    /**
     * CSS class to add to the root element of the widget if there are no refinements.
     */
    noRefinementRoot: string | string[];
    /**
     * CSS class to add to the list element.
     */
    list: string | string[];
    /**
     * CSS class to add to the items of the list. The items contains the link and the separator.
     */
    item: string | string[];
    /**
     * CSS class to add to the selected item in the list: the last one or the home if there are no refinements.
     */
    selectedItem: string | string[];
    /**
     * CSS class to add to the separator.
     */
    separator: string | string[];
    /**
     * CSS class to add to the links in the items.
     */
    link: string | string[];
}>;

declare type BreadcrumbRenderState = {
    /**
     * Creates the URL for a single item name in the list.
     */
    createURL: CreateURL<BreadcrumbConnectorParamsItem['value']>;
    /**
     * Array of objects defining the different values and labels.
     */
    items: BreadcrumbConnectorParamsItem[];
    /**
     * Sets the path of the hierarchical filter and triggers a new search.
     */
    refine: (value: BreadcrumbConnectorParamsItem['value']) => void;
    /**
     * True if refinement can be applied.
     */
    canRefine: boolean;
};

declare type BreadcrumbTemplates = Partial<{
    /**
     * Label of the breadcrumb's first element.
     */
    home: Template;
    /**
     * Symbol used to separate the elements of the breadcrumb.
     */
    separator: Template;
}>;

declare type BreadcrumbWidget = WidgetFactory<BreadcrumbWidgetDescription & {
    $$widgetType: 'ais.breadcrumb';
}, BreadcrumbConnectorParams, BreadcrumbWidgetParams>;

declare type BreadcrumbWidgetDescription = {
    $$type: 'ais.breadcrumb';
    renderState: BreadcrumbRenderState;
    indexRenderState: {
        breadcrumb: {
            [rootAttribute: string]: WidgetRenderState<BreadcrumbRenderState, BreadcrumbConnectorParams>;
        };
    };
};

declare type BreadcrumbWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Templates to use for the widget.
     */
    templates?: BreadcrumbTemplates;
    /**
     * CSS classes to add to the wrapping elements.
     */
    cssClasses?: BreadcrumbCSSClasses;
};

declare class BrowserHistory<TRouteState> implements Router<TRouteState> {
    /**
     * Transforms a UI state into a title for the page.
     */
    private readonly windowTitle?;
    /**
     * Time in milliseconds before performing a write in the history.
     * It prevents from adding too many entries in the history and
     * makes the back button more usable.
     *
     * @default 400
     */
    private readonly writeDelay;
    /**
     * Creates a full URL based on the route state.
     * The storage adaptor maps all syncable keys to the query string of the URL.
     */
    private readonly _createURL;
    /**
     * Parses the URL into a route state.
     * It should be symmetrical to `createURL`.
     */
    private readonly parseURL;
    private writeTimer?;
    private _onPopState;
    /**
     * Initializes a new storage provider that syncs the search state to the URL
     * using web APIs (`window.location.pushState` and `onpopstate` event).
     */
    constructor({ windowTitle, writeDelay, createURL, parseURL, }: BrowserHistoryArgs<TRouteState>);
    /**
     * Reads the URL and returns a syncable UI search state.
     */
    read(): TRouteState;
    /**
     * Pushes a search state into the URL.
     */
    write(routeState: TRouteState): void;
    /**
     * Sets a callback on the `onpopstate` event of the history API of the current page.
     * It enables the URL sync to keep track of the changes.
     */
    onUpdate(callback: (routeState: TRouteState) => void): void;
    /**
     * Creates a complete URL from a given syncable UI state.
     *
     * It always generates the full URL, not a relative one.
     * This allows to handle cases like using a <base href>.
     * See: https://github.com/algolia/instantsearch.js/issues/790
     */
    createURL(routeState: TRouteState): string;
    /**
     * Removes the event listener and cleans up the URL.
     */
    dispose(): void;
}

declare type BrowserHistoryArgs<TRouteState> = {
    windowTitle?: (routeState: TRouteState) => string;
    writeDelay: number;
    createURL: CreateURL_2<TRouteState>;
    parseURL: ParseURL<TRouteState>;
};

declare type BuiltInBindEventForHits = (eventType: string, hits: Hit | Hits, eventName?: string) => string;

declare type BuiltInSendEventForFacet = (eventType: string, facetValue: string, eventName?: string) => void;

declare type BuiltInSendEventForHits = (eventType: string, hits: Hit | Hits, eventName?: string) => void;

declare type BuiltInSendEventForToggle = (eventType: string, isRefined: boolean, eventName?: string) => void;

declare const clearRefinements: ClearRefinementsWidget;

declare type ClearRefinementsConnector = Connector<ClearRefinementsWidgetDescription, ClearRefinementsConnectorParams>;

declare type ClearRefinementsConnectorParams = {
    /**
     * The attributes to include in the refinements to clear (all by default). Cannot be used with `excludedAttributes`.
     */
    includedAttributes?: string[];
    /**
     * The attributes to exclude from the refinements to clear. Cannot be used with `includedAttributes`.
     */
    excludedAttributes?: string[];
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<string>;
};

declare type ClearRefinementsCSSClasses = Partial<{
    /**
     * CSS class to add to the wrapper element.
     */
    root: string | string[];
    /**
     * CSS class to add to the button of the widget.
     */
    button: string | string[];
    /**
     * CSS class to add to the button when there are no refinements.
     */
    disabledButton: string | string[];
}>;

declare type ClearRefinementsRenderState = {
    /**
     * Triggers the clear of all the currently refined values.
     */
    refine: () => void;
    /**
     * Indicates if search state is refined.
     * @deprecated prefer reading canRefine
     */
    hasRefinements: boolean;
    /**
     * Indicates if search state can be refined.
     */
    canRefine: boolean;
    /**
     * Creates a url for the next state when refinements are cleared.
     */
    createURL: CreateURL<void>;
};

declare type ClearRefinementsTemplates = Partial<{
    /**
     * Template for the content of the button
     */
    resetLabel: Template;
}>;

declare type ClearRefinementsWidget = WidgetFactory<ClearRefinementsWidgetDescription & {
    $$widgetType: 'ais.clearRefinements';
}, ClearRefinementsConnectorParams, ClearRefinementsWidgetParams>;

declare type ClearRefinementsWidgetDescription = {
    $$type: 'ais.clearRefinements';
    renderState: ClearRefinementsRenderState;
    indexRenderState: {
        clearRefinements: WidgetRenderState<ClearRefinementsRenderState, ClearRefinementsConnectorParams>;
    };
};

declare type ClearRefinementsWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Templates to use for the widget.
     */
    templates?: ClearRefinementsTemplates;
    /**
     * CSS classes to be added.
     */
    cssClasses?: ClearRefinementsCSSClasses;
};

declare type ComponentCSSClasses<TCSSClasses> = Required<{
    [className in keyof TCSSClasses]: string;
}>;

declare const configure: ConfigureWidget;

declare type ConfigureConnector = Connector<ConfigureWidgetDescription, ConfigureConnectorParams>;

declare type ConfigureConnectorParams = {
    /**
     * A list of [search parameters](https://www.algolia.com/doc/api-reference/search-api-parameters/)
     * to enable when the widget mounts.
     */
    searchParameters: PlainSearchParameters;
};

declare const configureRelatedItems: ConfigureRelatedItemsWidget;

declare type ConfigureRelatedItemsConnector = Connector<ConfigureRelatedItemsWidgetDescription, ConfigureRelatedItemsConnectorParams>;

declare type ConfigureRelatedItemsConnectorParams = {
    /**
     * The reference hit to extract the filters from.
     */
    hit: AlgoliaHit;
    /**
     * The schema to create the optional filters.
     * Each key represents an attribute from the hit.
     */
    matchingPatterns: MatchingPatterns;
    /**
     * Function to transform the generated search parameters.
     */
    transformSearchParameters?: TransformSearchParameters;
};

declare type ConfigureRelatedItemsWidget = WidgetFactory<ConfigureRelatedItemsWidgetDescription & {
    $$widgetType: 'ais.configureRelatedItems';
}, ConfigureRelatedItemsConnectorParams, ConfigureRelatedItemsWidgetParams>;

declare type ConfigureRelatedItemsWidgetDescription = {
    $$type: 'ais.configureRelatedItems';
} & Omit<ConfigureWidgetDescription, '$$type'>;

declare type ConfigureRelatedItemsWidgetParams = PlainSearchParameters;

declare type ConfigureRenderState = {
    /**
     * Refine the given search parameters.
     */
    refine: Refine;
};

declare type ConfigureWidget = (widgetParams: ConfigureWidgetParams) => Widget<ConfigureWidgetDescription & {
    $$widgetType: 'ais.configure';
    widgetParams: ConfigureConnectorParams;
}>;

declare type ConfigureWidgetDescription = {
    $$type: 'ais.configure';
    renderState: ConfigureRenderState;
    indexRenderState: {
        configure: WidgetRenderState<ConfigureRenderState, ConfigureConnectorParams>;
    };
    indexUiState: {
        configure: PlainSearchParameters;
    };
};

/**
 * A list of [search parameters](https://www.algolia.com/doc/api-reference/search-api-parameters/)
 * to enable when the widget mounts.
 */
declare type ConfigureWidgetParams = ConfigureConnectorParams['searchParameters'];

declare const connectAnswers: AnswersConnector;

declare const connectAutocomplete: AutocompleteConnector;

declare const connectBreadcrumb: BreadcrumbConnector;

declare const connectClearRefinements: ClearRefinementsConnector;

declare const connectConfigure: ConfigureConnector;

declare const connectConfigureRelatedItems: ConfigureRelatedItemsConnector;

declare const connectCurrentRefinements: CurrentRefinementsConnector;

declare const connectDynamicWidgets: DynamicWidgetsConnector;

/**
 * The **GeoSearch** connector provides the logic to build a widget that will display the results on a map. It also provides a way to search for results based on their position. The connector provides functions to manage the search experience (search on map interaction or control the interaction for example).
 *
 * @requirements
 *
 * Note that the GeoSearch connector uses the [geosearch](https://www.algolia.com/doc/guides/searching/geo-search) capabilities of Algolia. Your hits **must** have a `_geoloc` attribute in order to be passed to the rendering function.
 *
 * Currently, the feature is not compatible with multiple values in the _geoloc attribute.
 */
declare const connectGeoSearch: GeoSearchConnector;

/**
 * **HierarchicalMenu** connector provides the logic to build a custom widget
 * that will give the user the ability to explore facets in a tree-like structure.
 *
 * This is commonly used for multi-level categorization of products on e-commerce
 * websites. From a UX point of view, we suggest not displaying more than two
 * levels deep.
 *
 * @type {Connector}
 * @param {function(HierarchicalMenuRenderingOptions, boolean)} renderFn Rendering function for the custom **HierarchicalMenu** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomHierarchicalMenuWidgetParams)} Re-usable widget factory for a custom **HierarchicalMenu** widget.
 */
declare const connectHierarchicalMenu: HierarchicalMenuConnector;

declare const connectHits: HitsConnector;

declare const connectHitsPerPage: HitsPerPageConnector;

declare const connectHitsWithInsights: HitsConnector;

declare const connectInfiniteHits: InfiniteHitsConnector;

declare const connectInfiniteHitsWithInsights: InfiniteHitsConnector;

/**
 * **Menu** connector provides the logic to build a widget that will give the user the ability to choose a single value for a specific facet. The typical usage of menu is for navigation in categories.
 *
 * This connector provides a `toggleShowMore()` function to display more or less items and a `refine()`
 * function to select an item. While selecting a new element, the `refine` will also unselect the
 * one that is currently selected.
 *
 * **Requirement:** the attribute passed as `attribute` must be present in "attributes for faceting" on the Algolia dashboard or configured as attributesForFaceting via a set settings call to the Algolia API.
 */
declare const connectMenu: MenuConnector;

declare const connectNumericMenu: NumericMenuConnector;

/**
 * The connector handles the business logic and exposes
 * a simplified API to the rendering function.
 */
declare type Connector<TWidgetDescription extends WidgetDescription, TConnectorParams> = <TWidgetParams>(
/**
 * The render function.
 */
renderFn: Renderer<TWidgetDescription['renderState'], TConnectorParams & TWidgetParams>, 
/**
 * The called function when unmounting a widget.
 */
unmountFn?: Unmounter) => (widgetParams: TConnectorParams & TWidgetParams) => Widget<TWidgetDescription & {
    widgetParams: typeof widgetParams;
}>;

declare type ConnectorRenderStates = AnswersWidgetDescription['indexRenderState'] & AutocompleteWidgetDescription['indexRenderState'] & BreadcrumbWidgetDescription['indexRenderState'] & ClearRefinementsWidgetDescription['indexRenderState'] & ConfigureWidgetDescription['indexRenderState'] & CurrentRefinementsWidgetDescription['indexRenderState'] & GeoSearchWidgetDescription['indexRenderState'] & HierarchicalMenuWidgetDescription['indexRenderState'] & HitsWidgetDescription['indexRenderState'] & HitsPerPageWidgetDescription['indexRenderState'] & InfiniteHitsWidgetDescription['indexRenderState'] & MenuWidgetDescription['indexRenderState'] & NumericMenuWidgetDescription['indexRenderState'] & PaginationWidgetDescription['indexRenderState'] & PoweredByWidgetDescription['indexRenderState'] & QueryRulesWidgetDescription['indexRenderState'] & RangeWidgetDescription['indexRenderState'] & RatingMenuWidgetDescription['indexRenderState'] & RefinementListWidgetDescription['indexRenderState'] & RelevantSortWidgetDescription['indexRenderState'] & SearchBoxWidgetDescription['indexRenderState'] & SortByWidgetDescription['indexRenderState'] & StatsWidgetDescription['indexRenderState'] & ToggleRefinementWidgetDescription['indexRenderState'] & VoiceSearchWidgetDescription['indexRenderState'];

declare namespace connectors {
    export {
        connectClearRefinements,
        connectCurrentRefinements,
        connectHierarchicalMenu,
        connectHits,
        connectHitsWithInsights,
        connectHitsPerPage,
        connectInfiniteHits,
        connectInfiniteHitsWithInsights,
        connectMenu,
        connectNumericMenu,
        connectPagination,
        connectRange,
        connectRefinementList,
        connectSearchBox,
        connectSortBy,
        connectRatingMenu,
        connectStats,
        connectToggleRefinement,
        connectBreadcrumb,
        connectGeoSearch,
        connectPoweredBy,
        connectConfigure,
        connectConfigureRelatedItems as EXPERIMENTAL_connectConfigureRelatedItems,
        connectAutocomplete,
        connectQueryRules,
        connectVoiceSearch,
        connectAnswers as EXPERIMENTAL_connectAnswers,
        connectRelevantSort,
        connectDynamicWidgets,
        EXPERIMENTAL_connectDynamicWidgets
    }
}

declare type ConnectorUiStates = AutocompleteWidgetDescription['indexUiState'] & ConfigureWidgetDescription['indexUiState'] & GeoSearchWidgetDescription['indexUiState'] & HierarchicalMenuWidgetDescription['indexUiState'] & HitsPerPageWidgetDescription['indexUiState'] & InfiniteHitsWidgetDescription['indexUiState'] & MenuWidgetDescription['indexUiState'] & NumericMenuWidgetDescription['indexUiState'] & PaginationWidgetDescription['indexUiState'] & RangeWidgetDescription['indexUiState'] & RatingMenuWidgetDescription['indexUiState'] & RefinementListWidgetDescription['indexUiState'] & RelevantSortWidgetDescription['indexUiState'] & SearchBoxWidgetDescription['indexUiState'] & SortByWidgetDescription['indexUiState'] & ToggleRefinementWidgetDescription['indexUiState'] & VoiceSearchWidgetDescription['indexUiState'];

/**
 * **Pagination** connector provides the logic to build a widget that will let the user
 * choose the current page of the results.
 *
 * When using the pagination with Algolia, you should be aware that the engine won't provide you pages
 * beyond the 1000th hits by default. You can find more information on the [Algolia documentation](https://www.algolia.com/doc/guides/searching/pagination/#pagination-limitations).
 */
declare const connectPagination: PaginationConnector;

/**
 * **PoweredBy** connector provides the logic to build a custom widget that will displays
 * the logo to redirect to Algolia.
 */
declare const connectPoweredBy: PoweredByConnector;

declare const connectQueryRules: QueryRulesConnector;

/**
 * **Range** connector provides the logic to create custom widget that will let
 * the user refine results using a numeric range.
 *
 * This connectors provides a `refine()` function that accepts bounds. It will also provide
 * information about the min and max bounds for the current result set.
 */
declare const connectRange: RangeConnector;

/**
 * **StarRating** connector provides the logic to build a custom widget that will let
 * the user refine search results based on ratings.
 *
 * The connector provides to the rendering: `refine()` to select a value and
 * `items` that are the values that can be selected. `refine` should be used
 * with `items.value`.
 */
declare const connectRatingMenu: RatingMenuConnector;

/**
 * **RefinementList** connector provides the logic to build a custom widget that
 * will let the user filter the results based on the values of a specific facet.
 *
 * **Requirement:** the attribute passed as `attribute` must be present in
 * attributesForFaceting of the searched index.
 *
 * This connector provides:
 * - a `refine()` function to select an item.
 * - a `toggleShowMore()` function to display more or less items
 * - a `searchForItems()` function to search within the items.
 */
declare const connectRefinementList: RefinementListConnector;

declare const connectRelevantSort: RelevantSortConnector;

/**
 * **SearchBox** connector provides the logic to build a widget that will let the user search for a query.
 *
 * The connector provides to the rendering: `refine()` to set the query. The behaviour of this function
 * may be impacted by the `queryHook` widget parameter.
 */
declare const connectSearchBox: SearchBoxConnector;

declare const connectSortBy: SortByConnector;

declare const connectStats: StatsConnector;

/**
 * **Toggle** connector provides the logic to build a custom widget that will provide
 * an on/off filtering feature based on an attribute value or values.
 *
 * Two modes are implemented in the custom widget:
 *  - with or without the value filtered
 *  - switch between two values.
 */
declare const connectToggleRefinement: ToggleRefinementConnector;

declare const connectVoiceSearch: VoiceSearchConnector;

declare function createInfiniteHitsSessionStorageCache(): InfiniteHitsCache;

declare type CreateInsightsMiddleware = (props: InsightsProps) => InternalMiddleware;

declare const createInsightsMiddleware: CreateInsightsMiddleware;

/**
 * Exposes the metadata of mounted widgets in a custom
 * `<meta name="instantsearch:widgets" />` tag. The metadata per widget is:
 * - applied parameters
 * - widget name
 * - connector name
 */
declare function createMetadataMiddleware(): InternalMiddleware;

declare const createRouterMiddleware: <TUiState extends UiState = UiState, TRouteState = TUiState>(props?: RouterProps<TUiState, TRouteState>) => InternalMiddleware<TUiState>;

/**
 * Creates the URL for the given value.
 */
declare type CreateURL<TValue> = (value: TValue) => string;

declare type CreateURL_2<TRouteState> = (args: {
    qsModule: typeof qs_2;
    routeState: TRouteState;
    location: Location;
}) => string;

declare type CreateVoiceSearchHelper = (params: VoiceSearchHelperParams) => VoiceSearchHelper;

declare const currentRefinements: CurrentRefinementsWidget;

declare type CurrentRefinementsConnector = Connector<CurrentRefinementsWidgetDescription, CurrentRefinementsConnectorParams>;

declare type CurrentRefinementsConnectorParams = {
    /**
     * The attributes to include in the widget (all by default).
     * Cannot be used with `excludedAttributes`.
     *
     * @default `[]`
     */
    includedAttributes?: string[];
    /**
     * The attributes to exclude from the widget.
     * Cannot be used with `includedAttributes`.
     *
     * @default `['query']`
     */
    excludedAttributes?: string[];
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<CurrentRefinementsConnectorParamsItem>;
};

declare type CurrentRefinementsConnectorParamsItem = {
    /**
     * The index name.
     */
    indexName: string;
    /**
     * The attribute on which the refinement is applied.
     */
    attribute: string;
    /**
     * The textual representation of this attribute.
     */
    label: string;
    /**
     * Currently applied refinements.
     */
    refinements: CurrentRefinementsConnectorParamsRefinement[];
    /**
     * Removes the given refinement and triggers a new search.
     */
    refine(refinement: CurrentRefinementsConnectorParamsRefinement): void;
};

declare type CurrentRefinementsConnectorParamsRefinement = {
    /**
     * The attribute on which the refinement is applied.
     */
    attribute: string;
    /**
     * The type of the refinement.
     *
     * It can be one of those: 'facet'|'exclude'|'disjunctive'|'hierarchical'|'numeric'|'query'|'tag'.
     */
    type: string;
    /**
     * The raw value of the refinement.
     */
    value: string | number;
    /**
     * The label of the refinement to display.
     */
    label: string;
    /**
     * The value of the operator (only if applicable).
     */
    operator?: string;
    /**
     * The number of found items (only if applicable).
     */
    count?: number;
    /**
     * Whether the count is exhaustive (only if applicable).
     */
    exhaustive?: boolean;
};

declare type CurrentRefinementsCSSClasses = Partial<{
    /**
     * CSS class to add to the root element.
     */
    root: string | string[];
    /**
     * CSS class to add to the list element.
     */
    list: string | string[];
    /**
     * CSS class to add to the each item element.
     */
    item: string | string[];
    /**
     * CSS class to add to the label element.
     */
    label: string | string[];
    /**
     * CSS class to add to the category element.
     */
    category: string | string[];
    /**
     * CSS class to add to the categoryLabel element.
     */
    categoryLabel: string | string[];
    /**
     * CSS class to add to the delete element.
     */
    delete: string | string[];
}>;

declare type CurrentRefinementsRenderState = {
    /**
     * All the currently refined items, grouped by attribute.
     */
    items: CurrentRefinementsConnectorParamsItem[];
    /**
     * Indicates if search state can be refined.
     */
    canRefine: boolean;
    /**
     * Removes the given refinement and triggers a new search.
     */
    refine(refinement: CurrentRefinementsConnectorParamsRefinement): void;
    /**
     * Generates a URL for the next state.
     */
    createURL: CreateURL<CurrentRefinementsConnectorParamsRefinement>;
};

declare type CurrentRefinementsWidget = WidgetFactory<CurrentRefinementsWidgetDescription & {
    $$widgetType: 'ais.currentRefinements';
}, CurrentRefinementsConnectorParams, CurrentRefinementsWidgetParams>;

declare type CurrentRefinementsWidgetDescription = {
    $$type: 'ais.currentRefinements';
    renderState: CurrentRefinementsRenderState;
    indexRenderState: {
        currentRefinements: WidgetRenderState<CurrentRefinementsRenderState, CurrentRefinementsConnectorParams>;
    };
};

declare type CurrentRefinementsWidgetParams = {
    /**
     * The CSS Selector or `HTMLElement` to insert the widget into.
     */
    container: string | HTMLElement;
    /**
     * The CSS classes to override.
     */
    cssClasses?: CurrentRefinementsCSSClasses;
};

declare type CustomBindEventForHits = (customPayload: any) => string;

declare type CustomSendEventForFacet = (customPayload: any) => void;

declare type CustomSendEventForHits = (customPayload: any) => void;

declare type CustomSendEventForToggle = (customPayload: any) => void;

declare type DefaultSearchClient = ReturnType<typeof algoliasearch>;

declare type DisposeOptions = {
    helper: AlgoliaSearchHelper;
    state: SearchParameters;
    parent: IndexWidget;
};

declare type DummySearchClientV4 = {
    readonly transporter: any;
};

declare const dynamicWidgets: DynamicWidgetsWidget;

declare type DynamicWidgetsConnector = Connector<DynamicWidgetsWidgetDescription, DynamicWidgetsConnectorParams>;

declare type DynamicWidgetsConnectorParams = {
    widgets: Widget[];
    fallbackWidget?(args: {
        attribute: string;
    }): Widget;
    transformItems?(items: string[], metadata: {
        results: SearchResults;
    }): string[];
};

declare type DynamicWidgetsRenderState = {
    attributesToRender: string[];
};

declare type DynamicWidgetsWidget = WidgetFactory<DynamicWidgetsWidgetDescription & {
    $$widgetType: 'ais.dynamicWidgets';
}, Omit<DynamicWidgetsConnectorParams, 'widgets' | 'fallbackWidget'>, DynamicWidgetsWidgetParams>;

declare type DynamicWidgetsWidgetDescription = {
    $$type: 'ais.dynamicWidgets';
    renderState: DynamicWidgetsRenderState;
    indexRenderState: {
        dynamicWidgets: DynamicWidgetsRenderState;
    };
};

declare type DynamicWidgetsWidgetParams = {
    container: HTMLElement | string;
    widgets: Array<(container: HTMLElement) => Widget>;
    fallbackWidget?(args: {
        attribute: string;
        container: HTMLElement;
    }): Widget;
};

declare type Expand<T> = T extends infer O ? {
    [K in keyof O]: O[K];
} : never;

/** @deprecated use connectDynamicWidgets */
declare const EXPERIMENTAL_connectDynamicWidgets: DynamicWidgetsConnector;

/** @deprecated use dynamicWidgets */
declare const EXPERIMENTAL_dynamicWidgets: DynamicWidgetsWidget;

declare type FindAnswersOptions = DefaultSearchClient extends DummySearchClientV4 ? ClientSearch.FindAnswersOptions : any;

declare type GeoHit = Hit & Required<Pick<Hit, '_geoLoc'>>;

declare type GeoLoc = {
    lat: number;
    lng: number;
};

/**
 * The **GeoSearch** widget displays the list of results from the search on a Google Maps. It also provides a way to search for results based on their position. The widget also provide some of the common GeoSearch patterns like search on map interaction.
 *
 * @requirements
 *
 * Note that the GeoSearch widget uses the [geosearch](https://www.algolia.com/doc/guides/searching/geo-search) capabilities of Algolia. Your hits **must** have a `_geoloc` attribute in order to be displayed on the map.
 *
 * Currently, the feature is not compatible with multiple values in the _geoloc attribute.
 *
 * You are also responsible for loading the Google Maps library, it's not shipped with InstantSearch. You need to load the Google Maps library and pass a reference to the widget. You can find more information about how to install the library in [the Google Maps documentation](https://developers.google.com/maps/documentation/javascript/tutorial).
 *
 * Don't forget to explicitly set the `height` of the map container (default class `.ais-geo-search--map`), otherwise it won't be shown (it's a requirement of Google Maps).
 */
declare const geoSearch: GeoSearchWidget;

declare type GeoSearchConnector = Connector<GeoSearchWidgetDescription, GeoSearchConnectorParams>;

declare type GeoSearchConnectorParams = {
    /**
     * If true, refine will be triggered as you move the map.
     * @default true
     */
    enableRefineOnMapMove?: boolean;
    /**
     * Function to transform the items passed to the templates.
     * @default items => items
     */
    transformItems?: TransformItems<GeoHit>;
};

declare type GeoSearchCSSClasses = Partial<{
    /** The root div of the widget. */
    root: string | string[];
    /** The map container of the widget. */
    map: string | string[];
    /** The control element of the widget. */
    control: string | string[];
    /** The label of the control element. */
    label: string | string[];
    /** The selected label of the control element. */
    selectedLabel: string | string[];
    /** The input of the control element. */
    input: string | string[];
    /** The redo search button. */
    redo: string | string[];
    /** The disabled redo search button. */
    disabledRedo: string | string[];
    /** The reset refinement button. */
    reset: string | string[];
}>;

declare type GeoSearchMarker<TOptions> = {
    /**
     * Function used to create the options passed to the Google Maps marker.
     * See the documentation for more information:
     * https://developers.google.com/maps/documentation/javascript/reference/3/#MarkerOptions
     */
    createOptions?(item: GeoHit): TOptions;
    /**
     * Object that takes an event type (ex: `click`, `mouseover`) as key and a
     * listener as value. The listener is provided with an object that contains:
     * `event`, `item`, `marker`, `map`.
     */
    events: {
        [key: string]: (event: {
            item: any;
            marker: any;
            map: any;
            event: any;
        }) => void;
    };
};

declare type GeoSearchRenderState = {
    /**
     * Reset the current bounding box refinement.
     */
    clearMapRefinement(): void;
    /**
     * The current bounding box of the search.
     */
    currentRefinement?: Bounds;
    /**
     * Return true if the map has move since the last refinement.
     */
    hasMapMoveSinceLastRefine(): boolean;
    /**
     * Return true if the current refinement is set with the map bounds.
     */
    isRefinedWithMap(): boolean;
    /**
     * Return true if the user is able to refine on map move.
     */
    isRefineOnMapMove(): boolean;
    /**
     * The matched hits from Algolia API.
     */
    items: GeoHit[];
    /**
     * The current position of the search.
     */
    position?: GeoLoc;
    /**
     * Sets a bounding box to filter the results from the given map bounds.
     */
    refine(bounds: Bounds): void;
    /**
     * Send event to insights middleware
     */
    sendEvent: SendEventForHits;
    /**
     * Set the fact that the map has moved since the last refinement, should be
     * called on each map move. The call to the function triggers a new rendering
     * only when the value change.
     */
    setMapMoveSinceLastRefine(): void;
    /**
     * Toggle the fact that the user is able to refine on map move.
     */
    toggleRefineOnMapMove(): void;
};

declare type GeoSearchTemplates = Partial<{
    /** Template to use for the marker. */
    HTMLMarker: Template<GeoHit>;
    /** Template for the reset button. */
    reset: Template;
    /** Template for the toggle label. */
    toggle: Template;
    /** Template for the redo button. */
    redo: Template;
}>;

declare type GeoSearchWidget = WidgetFactory<GeoSearchWidgetDescription & {
    $$widgetType: 'ais.geoSearch';
}, GeoSearchConnectorParams, GeoSearchWidgetParams>;

declare type GeoSearchWidgetDescription = {
    $$type: 'ais.geoSearch';
    renderState: GeoSearchRenderState;
    indexRenderState: {
        geoSearch: WidgetRenderState<GeoSearchRenderState, GeoSearchConnectorParams>;
    };
    indexUiState: {
        geoSearch: {
            /**
             * The rectangular area in geo coordinates.
             * The rectangle is defined by two diagonally opposite points,
             * hence by 4 floats separated by commas.
             *
             * @example '47.3165,4.9665,47.3424,5.0201'
             */
            boundingBox: string;
        };
    };
};

declare type GeoSearchWidgetParams = {
    /**
     * By default the map will set the zoom accordingly to the markers displayed on it.
     * When we refine it may happen that the results are empty. For those situations we
     * need to provide a zoom to render the map.
     * @default 1
     */
    initialZoom?: number;
    /**
     * By default the map will set the position accordingly to the markers displayed on it.
     * When we refine it may happen that the results are empty. For those situations we need
     * to provide a position to render the map. This option is ignored when the `position`
     * is provided.
     * @default { lat: 0, lng: 0 }
     */
    initialPosition?: GeoLoc;
    /** Templates to use for the widget. */
    templates?: GeoSearchTemplates;
    /** CSS classes to add to the wrapping elements. */
    cssClasses?: GeoSearchCSSClasses;
    /**
     * Options for customize the built-in Google Maps marker. This option is
     * ignored when the `customHTMLMarker` is provided.
     */
    builtInMarker?: Partial<GeoSearchMarker<google.maps.MarkerOptions>>;
    /**
     * Options to customize the HTML marker. We provide an alternative to the
     * built-in Google Maps marker in order to have a full control of the marker
     * rendering. You can use plain HTML to build your marker.
     */
    customHTMLMarker?: Partial<GeoSearchMarker<Partial<HTMLMarkerArguments>>> | boolean;
    /**
     * If true, the map is used to search - otherwise it's for display purposes only.
     * @default true
     */
    enableRefine?: boolean;
    /**
     * If true, a button is displayed on the map when the refinement is coming from
     * the map in order to remove it.
     * @default true
     */
    enableClearMapRefinement?: boolean;
    /**
     * If true, the user can toggle the option `enableRefineOnMapMove` directly from the map.
     * @default true
     */
    enableRefineControl?: boolean;
    /**
     * Option forwarded to the Google Maps constructor.
     * See the documentation for more information:
     * https://developers.google.com/maps/documentation/javascript/reference/3/#MapOptions
     */
    mapOptions?: google.maps.MapOptions;
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Reference to the global `window.google` object.
     * See [the documentation](https://developers.google.com/maps/documentation/javascript/tutorial) for more information.
     */
    googleReference: typeof window['google'];
};

/**
 * @deprecated This function will be still supported in 4.x releases, but not further. It is replaced by the `insights` middleware. For more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/
 */
declare function getInsightsAnonymousUserToken(): string | undefined;

declare function getInsightsAnonymousUserTokenInternal(): string | undefined;

declare type GetWidgetRenderState<TWidgetFactory extends AnyWidgetFactory> = ReturnType<TWidgetFactory>['getWidgetRenderState'] extends (renderOptions: any) => infer TRenderState ? TRenderState extends Record<string, unknown> ? TRenderState : never : Record<string, unknown>;

declare namespace helpers {
    export {
        reverseHighlight,
        reverseSnippet,
        highlight,
        snippet,
        insights,
        getInsightsAnonymousUserToken,
        getInsightsAnonymousUserTokenInternal,
        HighlightOptions,
        ReverseHighlightOptions,
        SnippetOptions,
        ReverseSnippetOptions
    }
}

declare const hierarchicalMenu: HierarchicalMenuWidget;

declare type HierarchicalMenuConnector = Connector<HierarchicalMenuWidgetDescription, HierarchicalMenuConnectorParams>;

declare type HierarchicalMenuConnectorParams = {
    /**
     *  Attributes to use to generate the hierarchy of the menu.
     */
    attributes: string[];
    /**
     * Separator used in the attributes to separate level values.
     */
    separator?: string;
    /**
     * Prefix path to use if the first level is not the root level.
     */
    rootPath?: string | null;
    /**
     * Show the siblings of the selected parent levels of the current refined value. This
     * does not impact the root level.
     */
    showParentLevel?: boolean;
    /**
     * Max number of values to display.
     */
    limit?: number;
    /**
     * Whether to display the "show more" button.
     */
    showMore?: boolean;
    /**
     * Max number of values to display when showing more.
     */
    showMoreLimit?: number;
    /**
     * How to sort refinements. Possible values: `count|isRefined|name:asc|name:desc`.
     * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax).
     *
     * If a facetOrdering is set in the index settings, it is used when sortBy isn't passed
     */
    sortBy?: SortBy<HierarchicalMenuItem>;
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<HierarchicalMenuItem>;
};

declare type HierarchicalMenuCSSClasses = Partial<{
    /**
     * CSS class to add to the root element.
     */
    root: string | string[];
    /**
     * CSS class to add to the root element when no refinements.
     */
    noRefinementRoot: string | string[];
    /**
     * CSS class to add to the list element.
     */
    list: string | string[];
    /**
     * CSS class to add to the child list element.
     */
    childList: string | string[];
    /**
     * CSS class to add to each item element.
     */
    item: string | string[];
    /**
     * CSS class to add to each selected item element.
     */
    selectedItem: string | string[];
    /**
     * CSS class to add to each parent item element.
     */
    parentItem: string | string[];
    /**
     * CSS class to add to each link (when using the default template).
     */
    link: string | string[];
    /**
     * CSS class to add to each label (when using the default template).
     */
    label: string | string[];
    /**
     * CSS class to add to each count element (when using the default template).
     */
    count: string | string[];
    /**
     * CSS class to add to the show more element.
     */
    showMore: string | string[];
    /**
     * CSS class to add to the disabled show more element.
     */
    disabledShowMore: string | string[];
}>;

declare type HierarchicalMenuItem = {
    /**
     * Value of the menu item.
     */
    value: string;
    /**
     * Human-readable value of the menu item.
     */
    label: string;
    /**
     * Number of matched results after refinement is applied.
     */
    count: number;
    /**
     * Indicates if the refinement is applied.
     */
    isRefined: boolean;
    /**
     * n+1 level of items, same structure HierarchicalMenuItem
     */
    data: HierarchicalMenuItem[] | null;
};

declare type HierarchicalMenuRenderState = {
    /**
     * Creates an url for the next state for a clicked item.
     */
    createURL: CreateURL<string>;
    /**
     * Values to be rendered.
     */
    items: HierarchicalMenuItem[];
    /**
     * Sets the path of the hierarchical filter and triggers a new search.
     */
    refine: (value: string) => void;
    /**
     *  Indicates if search state can be refined.
     */
    canRefine: boolean;
    /**
     * True if the menu is displaying all the menu items.
     */
    isShowingMore: boolean;
    /**
     * Toggles the number of values displayed between `limit` and `showMoreLimit`.
     */
    toggleShowMore: () => void;
    /**
     * `true` if the toggleShowMore button can be activated (enough items to display more or
     * already displaying more than `limit` items)
     */
    canToggleShowMore: boolean;
    /**
     * Send event to insights middleware
     */
    sendEvent: SendEventForFacet;
};

declare type HierarchicalMenuTemplates = Partial<{
    /**
     * Item template, provided with `name`, `count`, `isRefined`, `url` data properties.
     */
    item: Template<{
        name: string;
        count: number;
        isRefined: boolean;
        url: string;
    }>;
    /**
     * Template used for the show more text, provided with `isShowingMore` data property.
     */
    showMoreText: Template<{
        isShowingMore: boolean;
    }>;
}>;

/**
 * The hierarchical menu widget is used to create a navigation based on a hierarchy of facet attributes.
 *
 * It is commonly used for categories with subcategories.
 *
 * All attributes (lvl0, lvl1 here) must be declared as [attributes for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting) in your
 * Algolia settings.
 *
 * By default, the separator we expect is ` > ` (with spaces) but you can use
 * a different one by using the `separator` option.
 * @requirements
 * Your objects must be formatted in a specific way to be
 * able to display hierarchical menus. Here's an example:
 *
 * ```javascript
 * {
 *   "objectID": "123",
 *   "name": "orange",
 *   "categories": {
 *     "lvl0": "fruits",
 *     "lvl1": "fruits > citrus"
 *   }
 * }
 * ```
 *
 * Every level must be specified entirely.
 * It's also possible to have multiple values per level, for example:
 *
 * ```javascript
 * {
 *   "objectID": "123",
 *   "name": "orange",
 *   "categories": {
 *     "lvl0": ["fruits", "vitamins"],
 *     "lvl1": ["fruits > citrus", "vitamins > C"]
 *   }
 * }
 * ```
 * @type {WidgetFactory}
 * @devNovel HierarchicalMenu
 * @category filter
 * @param {HierarchicalMenuWidgetParams} widgetParams The HierarchicalMenu widget options.
 * @return {Widget} A new HierarchicalMenu widget instance.
 * @example
 * search.addWidgets([
 *   instantsearch.widgets.hierarchicalMenu({
 *     container: '#hierarchical-categories',
 *     attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2'],
 *   })
 * ]);
 */
declare type HierarchicalMenuWidget = WidgetFactory<HierarchicalMenuWidgetDescription & {
    $$widgetType: 'ais.hierarchicalMenu';
}, HierarchicalMenuConnectorParams, HierarchicalMenuWidgetParams>;

declare type HierarchicalMenuWidgetDescription = {
    $$type: 'ais.hierarchicalMenu';
    renderState: HierarchicalMenuRenderState;
    indexRenderState: {
        hierarchicalMenu: {
            [rootAttribute: string]: WidgetRenderState<HierarchicalMenuRenderState, HierarchicalMenuConnectorParams>;
        };
    };
    indexUiState: {
        hierarchicalMenu: {
            [rootAttribute: string]: string[];
        };
    };
};

declare type HierarchicalMenuWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Array of attributes to use to generate the hierarchy of the menu.
     */
    attributes: string[];
    /**
     * Separator used in the attributes to separate level values.
     */
    separator?: string;
    /**
     * Prefix path to use if the first level is not the root level.
     */
    rootPath?: string;
    /**
     * Show the siblings of the selected parent level of the current refined value.
     *
     * With `showParentLevel` set to `true` (default):
     * - Parent lvl0
     *   - **lvl1**
     *     - **lvl2**
     *     - lvl2
     *     - lvl2
     *   - lvl 1
     *   - lvl 1
     * - Parent lvl0
     * - Parent lvl0
     *
     * With `showParentLevel` set to `false`:
     * - Parent lvl0
     *   - **lvl1**
     *     - **lvl2**
     * - Parent lvl0
     * - Parent lvl0
     */
    showParentLevel?: boolean;
    /**
     * Max number of values to display.
     */
    limit?: number;
    /**
     * Whether to display the "show more" button.
     */
    showMore?: boolean;
    /**
     * Max number of values to display when showing more.
     * does not impact the root level.
     */
    showMoreLimit?: number;
    /**
     * How to sort refinements. Possible values: `count|isRefined|name:asc|name:desc`.
     * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax).
     */
    sortBy?: SortBy<HierarchicalMenuItem>;
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<HierarchicalMenuItem>;
    /**
     * Templates to use for the widget.
     */
    templates?: HierarchicalMenuTemplates;
    /**
     * CSS classes to add to the wrapping elements.
     */
    cssClasses?: HierarchicalMenuCSSClasses;
};

declare function highlight({ attribute, highlightedTagName, hit, cssClasses, }: HighlightOptions): string;

declare type HighlightOptions = {
    attribute: string | string[];
    highlightedTagName?: string;
    hit: Partial<Hit>;
    cssClasses?: Partial<{
        highlighted: string;
    }>;
};

declare function historyRouter<TRouteState = UiState>({ createURL, parseURL, writeDelay, windowTitle, }?: Partial<BrowserHistoryArgs<TRouteState>>): BrowserHistory<TRouteState>;

declare type Hit = {
    __position: number;
    __queryID?: string;
} & AlgoliaHit;

declare type HitAttributeHighlightResult = {
    value: string;
    matchLevel: 'none' | 'partial' | 'full';
    matchedWords: string[];
    fullyHighlighted?: boolean;
};

declare type HitAttributeSnippetResult = Pick<HitAttributeHighlightResult, 'value' | 'matchLevel'>;

declare type HitHighlightResult = {
    [attribute: string]: HitAttributeHighlightResult | HitAttributeHighlightResult[] | HitHighlightResult[] | HitHighlightResult;
};

declare type Hits = Hit[];

declare const hits: HitsWidget;

declare type HitsConnector = Connector<HitsWidgetDescription, HitsConnectorParams>;

declare type HitsConnectorParams = {
    /**
     * Whether to escape HTML tags from hits string values.
     *
     * @default true
     */
    escapeHTML?: boolean;
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<Hit>;
};

declare type HitsCSSClasses = Partial<{
    /**
     * CSS class to add to the wrapping element.
     */
    root: string | string[];
    /**
     * CSS class to add to the wrapping element when no results.
     */
    emptyRoot: string | string[];
    /**
     * CSS class to add to the list of results.
     */
    list: string | string[];
    /**
     * CSS class to add to each result.
     */
    item: string | string[];
}>;

declare type HitSnippetResult = {
    [attribute: string]: HitAttributeSnippetResult[] | HitSnippetResult[] | HitAttributeSnippetResult | HitSnippetResult;
};

declare const hitsPerPage: HitsPerPageWidget;

declare type HitsPerPageConnector = Connector<HitsPerPageWidgetDescription, HitsPerPageConnectorParams>;

declare type HitsPerPageConnectorParams = {
    /**
     * Array of objects defining the different values and labels.
     */
    items: HitsPerPageConnectorParamsItem[];
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<HitsPerPageRenderStateItem>;
};

declare type HitsPerPageConnectorParamsItem = {
    /**
     * Label to display in the option.
     */
    label: string;
    /**
     * Number of hits to display per page.
     */
    value: number;
    /**
     * The default hits per page on first search.
     *
     * @default false
     */
    default?: boolean;
};

declare type HitsPerPageCSSClasses = Partial<{
    /**
     * CSS classes added to the outer `<div>`.
     */
    root: string | string[];
    /**
     * CSS classes added to the parent `<select>`.
     */
    select: string | string[];
    /**
     * CSS classes added to each `<option>`.
     */
    option: string | string[];
}>;

declare type HitsPerPageRenderState = {
    /**
     * Array of objects defining the different values and labels.
     */
    items: HitsPerPageRenderStateItem[];
    /**
     * Sets the number of hits per page and triggers a search.
     */
    refine: (value: number) => void;
    /**
     * Indicates whether or not the search has results.
     */
    hasNoResults: boolean;
};

declare type HitsPerPageRenderStateItem = {
    /**
     * Label to display in the option.
     */
    label: string;
    /**
     * Number of hits to display per page.
     */
    value: number;
    /**
     * Indicates if it's the current refined value.
     */
    isRefined: boolean;
};

declare type HitsPerPageWidget = WidgetFactory<HitsPerPageWidgetDescription & {
    $$widgetType: 'ais.hitsPerPage';
}, HitsPerPageConnectorParams, HitsPerPageWidgetParams>;

declare type HitsPerPageWidgetDescription = {
    $$type: 'ais.hitsPerPage';
    renderState: HitsPerPageRenderState;
    indexRenderState: {
        hitsPerPage: WidgetRenderState<HitsPerPageRenderState, HitsPerPageConnectorParams>;
    };
    indexUiState: {
        hitsPerPage: number;
    };
};

declare type HitsPerPageWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * CSS classes to be added.
     */
    cssClasses?: HitsPerPageCSSClasses;
};

declare type HitsRenderState = {
    /**
     * The matched hits from Algolia API.
     */
    hits: Hits;
    /**
     * The response from the Algolia API.
     */
    results?: SearchResults<Hit>;
    /**
     * Sends an event to the Insights middleware.
     */
    sendEvent: SendEventForHits;
    /**
     * Returns a string for the `data-insights-event` attribute for the Insights middleware
     */
    bindEvent: BindEventForHits;
};

declare type HitsTemplates = Partial<{
    /**
     * Template to use when there are no results.
     *
     * @default 'No Results'
     */
    empty: Template;
    /**
     * Template to use for each result. This template will receive an object containing a single record.
     *
     * @default ''
     */
    item: TemplateWithBindEvent<Hit & {
        __hitIndex: number;
    }>;
}>;

declare type HitsWidget = WidgetFactory<HitsWidgetDescription & {
    $$widgetType: 'ais.hits';
}, HitsConnectorParams, HitsWidgetParams>;

declare type HitsWidgetDescription = {
    $$type: 'ais.hits';
    renderState: HitsRenderState;
    indexRenderState: {
        hits: WidgetRenderState<HitsRenderState, HitsConnectorParams>;
    };
};

declare type HitsWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Templates to use for the widget.
     */
    templates?: HitsTemplates;
    /**
     * CSS classes to add.
     */
    cssClasses?: HitsCSSClasses;
};

declare type HTMLMarkerArguments = {
    __id: string;
    position: google.maps.LatLngLiteral;
    map: google.maps.Map;
    template: string;
    title?: string;
    className: string;
    anchor?: {
        x: number;
        y: number;
    };
};

declare const index: (widgetParams: IndexWidgetParams) => IndexWidget;

declare type IndexInitOptions = Pick<InitOptions, 'instantSearchInstance' | 'parent' | 'uiState'>;

declare type IndexRenderOptions = Pick<RenderOptions, 'instantSearchInstance'>;

declare type IndexRenderState = Partial<ConnectorRenderStates & WidgetRenderStates>;

declare type IndexUiState = Partial<ConnectorUiStates & WidgetUiStates>;

declare type IndexWidget = Omit<Widget<IndexWidgetDescription & {
    widgetParams: IndexWidgetParams;
}>, 'getWidgetUiState' | 'getWidgetState'> & {
    getIndexName(): string;
    getIndexId(): string;
    getHelper(): AlgoliaSearchHelper | null;
    getResults(): SearchResults | null;
    getScopedResults(): ScopedResult[];
    getParent(): IndexWidget | null;
    getWidgets(): Array<Widget | IndexWidget>;
    createURL(state: SearchParameters): string;
    addWidgets(widgets: Array<Widget | IndexWidget>): IndexWidget;
    removeWidgets(widgets: Array<Widget | IndexWidget>): IndexWidget;
    init(options: IndexInitOptions): void;
    render(options: IndexRenderOptions): void;
    dispose(): void;
    /**
     * @deprecated
     */
    getWidgetState(uiState: UiState): UiState;
    getWidgetUiState<TUiState = UiState>(uiState: TUiState): TUiState;
    getWidgetSearchParameters(searchParameters: SearchParameters, searchParametersOptions: {
        uiState: IndexUiState;
    }): SearchParameters;
    refreshUiState(): void;
};

declare type IndexWidgetDescription = {
    $$type: 'ais.index';
    $$widgetType: 'ais.index';
};

declare type IndexWidgetParams = {
    indexName: string;
    indexId?: string;
};

declare const infiniteHits: InfiniteHitsWidget;

declare type InfiniteHitsCache = {
    read: Read;
    write: Write;
};

declare type InfiniteHitsCachedHits = {
    [page: number]: Hits;
};

declare type InfiniteHitsConnector = Connector<InfiniteHitsWidgetDescription, InfiniteHitsConnectorParams>;

declare type InfiniteHitsConnectorParams = {
    /**
     * Escapes HTML entities from hits string values.
     *
     * @default `true`
     */
    escapeHTML?: boolean;
    /**
     * Enable the button to load previous results.
     *
     * @default `false`
     */
    showPrevious?: boolean;
    /**
     * Receives the items, and is called before displaying them.
     * Useful for mapping over the items to transform, and remove or reorder them.
     */
    transformItems?: TransformItems<Hit>;
    /**
     * Reads and writes hits from/to cache.
     * When user comes back to the search page after leaving for product page,
     * this helps restore InfiniteHits and its scroll position.
     */
    cache?: InfiniteHitsCache;
};

declare type InfiniteHitsCSSClasses = Partial<{
    /**
     * The root element of the widget.
     */
    root: string | string[];
    /**
     * The root container without results.
     */
    emptyRoot: string | string[];
    /**
     * The list of results.
     */
    list: string | string[];
    /**
     * The list item.
     */
    item: string | string[];
    /**
     * The “Show previous” button.
     */
    loadPrevious: string | string[];
    /**
     * The disabled “Show previous” button.
     */
    disabledLoadPrevious: string | string[];
    /**
     * The “Show more” button.
     */
    loadMore: string | string[];
    /**
     * The disabled “Show more” button.
     */
    disabledLoadMore: string | string[];
}>;

declare type InfiniteHitsRenderState = {
    /**
     * Loads the previous results.
     */
    showPrevious: () => void;
    /**
     * Loads the next page of hits.
     */
    showMore: () => void;
    /**
     * Indicates whether the first page of hits has been reached.
     */
    isFirstPage: boolean;
    /**
     * Indicates whether the last page of hits has been reached.
     */
    isLastPage: boolean;
    /**
     * Send event to insights middleware
     */
    sendEvent: SendEventForHits;
    /**
     * Returns a string of data-insights-event attribute for insights middleware
     */
    bindEvent: BindEventForHits;
    /**
     * Hits for the current page
     */
    currentPageHits: Hits;
    /**
     * Hits for current and cached pages
     */
    hits: Hits;
    /**
     * The response from the Algolia API.
     */
    results?: SearchResults<Hit>;
};

declare type InfiniteHitsTemplates = Partial<{
    /**
     * The template to use when there are no results.
     */
    empty: Template<{
        results: SearchResults;
    }>;
    /**
     * The template to use for the “Show previous” label.
     */
    showPreviousText: Template;
    /**
     * The template to use for the “Show more” label.
     */
    showMoreText: Template;
    /**
     * The template to use for each result.
     */
    item: TemplateWithBindEvent<Hit & {
        __hitIndex: number;
    }>;
}>;

declare type InfiniteHitsWidget = WidgetFactory<InfiniteHitsWidgetDescription & {
    $$widgetType: 'ais.infiniteHits';
}, InfiniteHitsConnectorParams, InfiniteHitsWidgetParams>;

declare type InfiniteHitsWidgetDescription = {
    $$type: 'ais.infiniteHits';
    renderState: InfiniteHitsRenderState;
    indexRenderState: {
        infiniteHits: WidgetRenderState<InfiniteHitsRenderState, InfiniteHitsConnectorParams>;
    };
    indexUiState: {
        page: number;
    };
};

declare type InfiniteHitsWidgetParams = {
    /**
     * The CSS Selector or `HTMLElement` to insert the widget into.
     */
    container: string | HTMLElement;
    /**
     * The CSS classes to override.
     */
    cssClasses?: InfiniteHitsCSSClasses;
    /**
     * The templates to use for the widget.
     */
    templates?: InfiniteHitsTemplates;
    /**
     * Reads and writes hits from/to cache.
     * When user comes back to the search page after leaving for product page,
     * this helps restore InfiniteHits and its scroll position.
     */
    cache?: InfiniteHitsCache;
};

declare type InitOptions = SharedRenderOptions & {
    uiState: UiState;
    results?: undefined;
};

/**
 * @deprecated This function will be still supported in 4.x releases, but not further. It is replaced by the `insights` middleware. For more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/
 */
declare function insights(method: InsightsClientMethod, payload: Partial<InsightsClientPayload>): string;

declare type InsightsAddAlgoliaAgent = (method: 'addAlgoliaAgent', algoliaAgent: string) => void;

declare type InsightsClient = InsightsAddAlgoliaAgent & InsightsSendEvent & InsightsOnUserTokenChange & InsightsInit & InsightsSetUserToken & InsightsGetUserToken & {
    queue?: Array<[string, any]>;
};

declare type InsightsClientMethod = 'viewedObjectIDs' | 'clickedFilters' | 'clickedObjectIDsAfterSearch' | 'convertedObjectIDsAfterSearch';

declare type InsightsClientPayload = {
    eventName: string;
    queryID: string;
    index: string;
    objectIDs: string[];
    positions?: number[];
};

declare type InsightsEvent = {
    insightsMethod?: InsightsClientMethod;
    payload: any;
    widgetType: string;
    eventType: string;
    hits?: Hit[];
    attribute?: string;
};

declare type InsightsGetUserToken = (method: 'getUserToken', options?: any, callback?: (error: any, userToken: string) => void) => void;

declare type InsightsInit = (method: 'init', options: {
    appId: string;
    apiKey: string;
}) => void;

declare type InsightsOnUserTokenChange = (method: 'onUserTokenChange', callback?: (userToken: string) => void, options?: {
    immediate?: boolean;
}) => void;

declare type InsightsProps = {
    insightsClient: null | InsightsClient;
    insightsInitParams?: {
        userHasOptedOut?: boolean;
        useCookie?: boolean;
        cookieDuration?: number;
        region?: 'de' | 'us';
    };
    onEvent?: (event: InsightsEvent, insightsClient: null | InsightsClient) => void;
};

declare type InsightsSendEvent = (method: InsightsClientMethod, payload: InsightsClientPayload) => void;

declare type InsightsSetUserToken = (method: 'setUserToken', userToken: string) => void;

/**
 * The actual implementation of the InstantSearch. This is
 * created using the `instantsearch` factory function.
 * It emits the 'render' event every time a search is done
 */
declare class InstantSearch<TUiState extends UiState = UiState, TRouteState = TUiState> extends EventEmitter {
    client: InstantSearchOptions['searchClient'];
    indexName: string;
    insightsClient: InsightsClient | null;
    onStateChange: InstantSearchOptions['onStateChange'] | null;
    helper: AlgoliaSearchHelper | null;
    mainHelper: AlgoliaSearchHelper | null;
    mainIndex: IndexWidget;
    started: boolean;
    templatesConfig: Record<string, unknown>;
    renderState: RenderState;
    _stalledSearchDelay: number;
    _searchStalledTimer: any;
    _isSearchStalled: boolean;
    _initialUiState: UiState;
    _createURL: CreateURL<UiState>;
    _searchFunction?: InstantSearchOptions['searchFunction'];
    _mainHelperSearch?: AlgoliaSearchHelper['search'];
    middleware: Array<{
        creator: Middleware;
        instance: MiddlewareDefinition;
    }>;
    sendEventToInsights: (event: InsightsEvent) => void;
    constructor(options: InstantSearchOptions<TUiState, TRouteState>);
    /**
     * Hooks a middleware into the InstantSearch lifecycle.
     */
    use(...middleware: Middleware[]): this;
    /**
     * Removes a middleware from the InstantSearch lifecycle.
     */
    unuse(...middlewareToUnuse: Middleware[]): this;
    EXPERIMENTAL_use(...middleware: Middleware[]): this;
    /**
     * Adds a widget to the search instance.
     * A widget can be added either before or after InstantSearch has started.
     * @param widget The widget to add to InstantSearch.
     *
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`.
     */
    addWidget(widget: Widget): this;
    /**
     * Adds multiple widgets to the search instance.
     * Widgets can be added either before or after InstantSearch has started.
     * @param widgets The array of widgets to add to InstantSearch.
     */
    addWidgets(widgets: Array<Widget | IndexWidget>): this;
    /**
     * Removes a widget from the search instance.
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`
     * @param widget The widget instance to remove from InstantSearch.
     *
     * The widget must implement a `dispose()` method to clear its state.
     */
    removeWidget(widget: Widget | IndexWidget): this;
    /**
     * Removes multiple widgets from the search instance.
     * @param widgets Array of widgets instances to remove from InstantSearch.
     *
     * The widgets must implement a `dispose()` method to clear their states.
     */
    removeWidgets(widgets: Array<Widget | IndexWidget>): this;
    /**
     * Ends the initialization of InstantSearch.js and triggers the
     * first search. This method should be called after all widgets have been added
     * to the instance of InstantSearch.js. InstantSearch.js also supports adding and removing
     * widgets after the start as an **EXPERIMENTAL** feature.
     */
    start(): void;
    /**
     * Removes all widgets without triggering a search afterwards. This is an **EXPERIMENTAL** feature,
     * if you find an issue with it, please
     * [open an issue](https://github.com/algolia/instantsearch.js/issues/new?title=Problem%20with%20dispose).
     * @return {undefined} This method does not return anything
     */
    dispose(): void;
    scheduleSearch: ((...args: any[]) => void) & {
        wait(): Promise<void>;
        cancel(): void;
    };
    scheduleRender: ((...args: any[]) => void) & {
        wait(): Promise<void>;
        cancel(): void;
    };
    scheduleStalledRender(): void;
    setUiState(uiState: UiState | ((previousUiState: UiState) => UiState)): void;
    getUiState(): UiState;
    onInternalStateChange: ((...args: any[]) => void) & {
        wait(): Promise<void>;
        cancel(): void;
    };
    createURL(nextState?: UiState): string;
    refresh(): void;
}

/**
 * InstantSearch is the main component of InstantSearch.js. This object
 * manages the widget and lets you add new ones.
 *
 * Two parameters are required to get you started with InstantSearch.js:
 *  - `indexName`: the main index that you will use for your new search UI
 *  - `searchClient`: the search client to plug to InstantSearch.js
 *
 * The [search client provided by Algolia](algolia.com/doc/api-client/getting-started/what-is-the-api-client/javascript/)
 * needs an `appId` and an `apiKey`. Those parameters can be found in your
 * [Algolia dashboard](https://www.algolia.com/api-keys).
 *
 * If you want to get up and running quickly with InstantSearch.js, have a
 * look at the [getting started](https://www.algolia.com/doc/guides/building-search-ui/getting-started/js/).
 */
declare const instantsearch: InstantSearchModule;
export default instantsearch;

declare type InstantSearchModule = {
    <TUiState = Record<string, unknown>, TRouteState = TUiState>(options: InstantSearchOptions<Expand<UiState & TUiState>, TRouteState>): InstantSearch<Expand<UiState & TUiState>, TRouteState>;
    version: string;
    connectors: typeof connectors;
    widgets: typeof widgets;
    middlewares: typeof middlewares;
    routers: typeof routers;
    stateMappings: typeof stateMappings;
    createInfiniteHitsSessionStorageCache: typeof createInfiniteHitsSessionStorageCache;
    highlight: typeof helpers.highlight;
    reverseHighlight: typeof helpers.reverseHighlight;
    snippet: typeof helpers.snippet;
    reverseSnippet: typeof helpers.reverseSnippet;
    insights: typeof helpers.insights;
};

/**
 * Global options for an InstantSearch instance.
 */
declare type InstantSearchOptions<TUiState extends UiState = UiState, TRouteState = TUiState> = {
    /**
     * The name of the main index
     */
    indexName: string;
    /**
     * The search client to plug to InstantSearch.js
     *
     * Usage:
     * ```javascript
     * // Using the default Algolia search client
     * instantsearch({
     *   indexName: 'indexName',
     *   searchClient: algoliasearch('appId', 'apiKey')
     * });
     *
     * // Using a custom search client
     * instantsearch({
     *   indexName: 'indexName',
     *   searchClient: {
     *     search(requests) {
     *       // fetch response based on requests
     *       return response;
     *     },
     *     searchForFacetValues(requests) {
     *       // fetch response based on requests
     *       return response;
     *     }
     *   }
     * });
     * ```
     */
    searchClient: SearchClient;
    /**
     * The locale used to display numbers. This will be passed
     * to `Number.prototype.toLocaleString()`
     */
    numberLocale?: string;
    /**
     * A hook that will be called each time a search needs to be done, with the
     * helper as a parameter. It's your responsibility to call `helper.search()`.
     * This option allows you to avoid doing searches at page load for example.
     */
    searchFunction?: (helper: AlgoliaSearchHelper) => void;
    /**
     * Function called when the state changes.
     *
     * Using this function makes the instance controlled. This means that you
     * become in charge of updating the UI state with the `setUiState` function.
     */
    onStateChange?: (params: {
        uiState: UiState;
        setUiState(uiState: UiState | ((previousUiState: UiState) => UiState)): void;
    }) => void;
    /**
     * Injects a `uiState` to the `instantsearch` instance. You can use this option
     * to provide an initial state to a widget. Note that the state is only used
     * for the first search. To unconditionally pass additional parameters to the
     * Algolia API, take a look at the `configure` widget.
     */
    initialUiState?: TUiState;
    /**
     * Time before a search is considered stalled. The default is 200ms
     */
    stalledSearchDelay?: number;
    /**
     * Router configuration used to save the UI State into the URL or any other
     * client side persistence. Passing `true` will use the default URL options.
     */
    routing?: RouterProps<TUiState, TRouteState> | boolean;
    /**
     * the instance of search-insights to use for sending insights events inside
     * widgets like `hits`.
     *
     * @deprecated This property will be still supported in 4.x releases, but not further. It is replaced by the `insights` middleware. For more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/
     */
    insightsClient?: InsightsClient;
};

declare type InternalMiddleware<TUiState extends UiState = UiState> = (options: MiddlewareOptions) => MiddlewareDefinition<TUiState>;

declare function isMetadataEnabled(): boolean;

declare type MatchingPatterns = {
    [attribute: string]: {
        /**
         * The score of the optional filter.
         *
         * @see https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/in-depth/optional-filters/
         */
        score: number;
    };
};

declare const menu: MenuWidget;

declare type MenuConnector = Connector<MenuWidgetDescription, MenuConnectorParams>;

declare type MenuConnectorParams = {
    /**
     * Name of the attribute for faceting (eg. "free_shipping").
     */
    attribute: string;
    /**
     * How many facets values to retrieve.
     */
    limit?: number;
    /**
     * Whether to display a button that expands the number of items.
     */
    showMore?: boolean;
    /**
     * How many facets values to retrieve when `toggleShowMore` is called, this value is meant to be greater than `limit` option.
     */
    showMoreLimit?: number;
    /**
     * How to sort refinements. Possible values: `count|isRefined|name:asc|name:desc`.
     *
     * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax).
     *
     * If a facetOrdering is set in the index settings, it is used when sortBy isn't passed
     */
    sortBy?: SortBy<MenuItem>;
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<MenuItem>;
};

declare type MenuCSSClasses = Partial<{
    /**
     * CSS class to add to the root element.
     */
    root: string | string[];
    /**
     * CSS class to add to the root element when no refinements.
     */
    noRefinementRoot: string | string[];
    /**
     * CSS class to add to the list element.
     */
    list: string | string[];
    /**
     * CSS class to add to each item element.
     */
    item: string | string[];
    /**
     * CSS class to add to each selected item element.
     */
    selectedItem: string | string[];
    /**
     * CSS class to add to each link (when using the default template).
     */
    link: string | string[];
    /**
     * CSS class to add to each label (when using the default template).
     */
    label: string | string[];
    /**
     * CSS class to add to each count element (when using the default template).
     */
    count: string | string[];
    /**
     * CSS class to add to the show more button.
     */
    showMore: string | string[];
    /**
     * CSS class to add to the disabled show more button.
     */
    disabledShowMore: string | string[];
}>;

declare type MenuItem = {
    /**
     * The value of the menu item.
     */
    value: string;
    /**
     * Human-readable value of the menu item.
     */
    label: string;
    /**
     * Number of results matched after refinement is applied.
     */
    count: number;
    /**
     * Indicates if the refinement is applied.
     */
    isRefined: boolean;
};

declare type MenuRenderState = {
    /**
     * The elements that can be refined for the current search results.
     */
    items: MenuItem[];
    /**
     * Creates the URL for a single item name in the list.
     */
    createURL: CreateURL<string>;
    /**
     * Filter the search to item value.
     */
    refine(value: string): void;
    /**
     * True if refinement can be applied.
     */
    canRefine: boolean;
    /**
     * True if the menu is displaying all the menu items.
     */
    isShowingMore: boolean;
    /**
     * Toggles the number of values displayed between `limit` and `showMore.limit`.
     */
    toggleShowMore(): void;
    /**
     * `true` if the toggleShowMore button can be activated (enough items to display more or
     * already displaying more than `limit` items)
     */
    canToggleShowMore: boolean;
    /**
     * Send event to insights middleware
     */
    sendEvent: SendEventForFacet;
};

declare const menuSelect: MenuSelectWidget;

declare type MenuSelectCSSClasses = Partial<{
    /**
     * CSS class to add to the root element.
     */
    root: string | string[];
    /**
     * CSS class to add to the root when there are no items to display
     */
    noRefinementRoot: string | string[];
    /**
     * CSS class to add to the select element.
     */
    select: string | string[];
    /**
     * CSS class to add to the option element.
     */
    option: string | string[];
}>;

declare type MenuSelectTemplates = Partial<{
    /**
     * Item template, provided with `label`, `count`, `isRefined` and `value` data properties.
     */
    item: Template<{
        label: string;
        value: string;
        count: number;
        isRefined: boolean;
    }>;
    /**
     * Label of the "see all" option in the select.
     */
    defaultOption: Template;
}>;

declare type MenuSelectWidget = WidgetFactory<MenuWidgetDescription & {
    $$widgetType: 'ais.menuSelect';
}, MenuConnectorParams, MenuSelectWidgetParams>;

declare type MenuSelectWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Customize the output through templating.
     */
    templates?: MenuSelectTemplates;
    /**
     * CSS classes to add to the wrapping elements.
     */
    cssClasses?: MenuSelectCSSClasses;
};

declare type MenuTemplates = Partial<{
    /**
     * Item template. The string template gets the same values as the function.
     */
    item: Template<{
        count: number;
        cssClasses: MenuCSSClasses;
        isRefined: boolean;
        label: string;
        url: string;
        value: string;
    }>;
    /**
     * Template used for the show more text, provided with `isShowingMore` data property.
     */
    showMoreText: Template<{
        isShowingMore: boolean;
    }>;
}>;

declare type MenuWidget = WidgetFactory<MenuWidgetDescription & {
    $$widgetType: 'ais.menu';
}, MenuConnectorParams, MenuWidgetParams>;

declare type MenuWidgetDescription = {
    $$type: 'ais.menu';
    renderState: MenuRenderState;
    indexRenderState: {
        menu: {
            [attribute: string]: WidgetRenderState<MenuRenderState, MenuConnectorParams>;
        };
    };
    indexUiState: {
        menu: {
            [attribute: string]: string;
        };
    };
};

declare type MenuWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Customize the output through templating.
     */
    templates?: MenuTemplates;
    /**
     * CSS classes to add to the wrapping elements.
     */
    cssClasses?: MenuCSSClasses;
};

declare type Middleware = (options: MiddlewareOptions) => AtLeastOne<MiddlewareDefinition>;

declare type MiddlewareDefinition<TUiState extends UiState = UiState> = {
    onStateChange(options: {
        uiState: TUiState;
    }): void;
    subscribe(): void;
    unsubscribe(): void;
};

declare type MiddlewareOptions = {
    instantSearchInstance: InstantSearch;
};

declare namespace middlewares {
    export {
        InsightsEvent,
        InsightsProps,
        CreateInsightsMiddleware,
        createInsightsMiddleware,
        RouterProps,
        createRouterMiddleware,
        isMetadataEnabled,
        createMetadataMiddleware
    }
}

declare const numericMenu: NumericMenuWidget;

declare type NumericMenuComponentCSSClasses = ComponentCSSClasses<NumericMenuCSSClasses>;

declare type NumericMenuConnector = Connector<NumericMenuWidgetDescription, NumericMenuConnectorParams>;

declare type NumericMenuConnectorParams = {
    /**
     * Name of the attribute for filtering
     */
    attribute: string;
    /**
     * List of all the items
     */
    items: NumericMenuConnectorParamsItem[];
    /**
     * Function to transform the items passed to the templates
     */
    transformItems?: TransformItems<NumericMenuRenderStateItem>;
};

declare type NumericMenuConnectorParamsItem = {
    /**
     * Name of the option
     */
    label: string;
    /**
     * Higher bound of the option (<=)
     */
    start?: number;
    /**
     * Lower bound of the option (>=)
     */
    end?: number;
};

declare type NumericMenuCSSClasses = Partial<{
    /**
     * CSS class to add to the root element.
     */
    root: string | string[];
    /**
     * CSS class to add to the root element when no refinements.
     */
    noRefinementRoot: string | string[];
    /**
     * CSS class to add to the list element.
     */
    list: string | string[];
    /**
     * CSS class to add to each item element.
     */
    item: string | string[];
    /**
     * CSS class to add to each selected item element.
     */
    selectedItem: string | string[];
    /**
     * CSS class to add to each label element.
     */
    label: string | string[];
    /**
     * CSS class to add to each label text element.
     */
    labelText: string | string[];
    /**
     * CSS class to add to each radio element (when using the default template).
     */
    radio: string | string[];
}>;

declare type NumericMenuRenderState = {
    /**
     * The list of available choices
     */
    items: NumericMenuRenderStateItem[];
    /**
     * Creates URLs for the next state, the string is the name of the selected option
     */
    createURL: CreateURL<NumericMenuRenderStateItem['value']>;
    /**
     * `true` if the last search contains no result
     */
    hasNoResults: boolean;
    /**
     * Sets the selected value and trigger a new search
     */
    refine: (facetValue: string) => void;
    /**
     * Send event to insights middleware
     */
    sendEvent: SendEventForFacet;
};

declare type NumericMenuRenderStateItem = {
    /**
     *  Name of the option.
     */
    label: string;
    /**
     * URL encoded of the bounds object with the form `{start, end}`.
     * This value can be used verbatim in the webpage and can be read by `refine`
     * directly. If you want to inspect the value, you can do:
     * `JSON.parse(decodeURI(value))` to get the object.
     */
    value: string;
    /**
     * True if the value is selected
     */
    isRefined: boolean;
};

declare type NumericMenuTemplates = Partial<{
    /**
     * Item template, provided with `label` (the name in the configuration), `isRefined`, `url`, `value` (the setting for the filter) data properties.
     */
    item: Template<{
        /**
         * The name of the attribute.
         */
        attribute: string;
        /**
         * The label for the option.
         */
        label: string;
        /**
         * The encoded URL of the bounds object with a {start, end} form. This
         * value can be used verbatim in the webpage and can be read by refine
         * directly. If you want to inspect the value, you can do JSON.parse(window.decodeURI(value))
         * to get the object.
         */
        value: string;
        /**
         *  Whether or not the refinement is selected.
         */
        isRefined: boolean;
        /**
         * The URL with the applied refinement.
         */
        url: string;
        /**
         * The CSS classes provided to the widget.
         */
        cssClasses: NumericMenuComponentCSSClasses;
    }>;
}>;

declare type NumericMenuWidget = WidgetFactory<NumericMenuWidgetDescription & {
    $$widgetType: 'ais.numericMenu';
}, NumericMenuConnectorParams, NumericMenuWidgetParams>;

declare type NumericMenuWidgetDescription = {
    $$type: 'ais.numericMenu';
    renderState: NumericMenuRenderState;
    indexRenderState: {
        numericMenu: {
            [attribute: string]: WidgetRenderState<NumericMenuRenderState, NumericMenuConnectorParams>;
        };
    };
    indexUiState: {
        numericMenu: {
            [attribute: string]: string;
        };
    };
};

declare type NumericMenuWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Templates to use for the widget.
     */
    templates?: NumericMenuTemplates;
    /**
     * CSS classes to add to the wrapping elements.
     */
    cssClasses?: NumericMenuCSSClasses;
};

declare const pagination: PaginationWidget;

declare type PaginationConnector = Connector<PaginationWidgetDescription, PaginationConnectorParams>;

declare type PaginationConnectorParams = {
    /**
     * The total number of pages to browse.
     */
    totalPages?: number;
    /**
     * The padding of pages to show around the current page
     * @default 3
     */
    padding?: number;
};

declare type PaginationCSSClasses = Partial<{
    /**
     * CSS classes added to the root element of the widget.
     */
    root: string | string[];
    /**
     * CSS class to add to the root element of the widget if there are no refinements.
     */
    noRefinementRoot: string | string[];
    /**
     * CSS classes added to the wrapping `<ul>`.
     */
    list: string | string[];
    /**
     * CSS classes added to each `<li>`.
     */
    item: string | string[];
    /**
     * CSS classes added to the first `<li>`.
     */
    firstPageItem: string | string[];
    /**
     * CSS classes added to the last `<li>`.
     */
    lastPageItem: string | string[];
    /**
     * CSS classes added to the previous `<li>`.
     */
    previousPageItem: string | string[];
    /**
     * CSS classes added to the next `<li>`.
     */
    nextPageItem: string | string[];
    /**
     * CSS classes added to page `<li>`.
     */
    pageItem: string | string[];
    /**
     * CSS classes added to the selected `<li>`.
     */
    selectedItem: string | string[];
    /**
     * CSS classes added to the disabled `<li>`.
     */
    disabledItem: string | string[];
    /**
     * CSS classes added to each link.
     */
    link: string | string[];
}>;

declare type PaginationRenderState = {
    /** Creates URLs for the next state, the number is the page to generate the URL for. */
    createURL: CreateURL<number>;
    /** Sets the current page and triggers a search. */
    refine(page: number): void;
    /** true if this search returned more than one page */
    canRefine: boolean;
    /** The number of the page currently displayed. */
    currentRefinement: number;
    /** The number of hits computed for the last query (can be approximated). */
    nbHits: number;
    /** The number of pages for the result set. */
    nbPages: number;
    /** The actual pages relevant to the current situation and padding. */
    pages: number[];
    /** true if the current page is also the first page. */
    isFirstPage: boolean;
    /** true if the current page is also the last page. */
    isLastPage: boolean;
};

declare type PaginationTemplates = Partial<{
    /**
     * Label for the Previous link.
     */
    previous: string;
    /**
     * Label for the Next link.
     */
    next: string;
    /**
     * Label for the First link.
     */
    first: string;
    /**
     * Label for the Last link.
     */
    last: string;
}>;

declare type PaginationWidget = WidgetFactory<PaginationWidgetDescription & {
    $$widgetType: 'ais.pagination';
}, PaginationConnectorParams, PaginationWidgetParams>;

declare type PaginationWidgetDescription = {
    $$type: 'ais.pagination';
    renderState: PaginationRenderState;
    indexRenderState: {
        pagination: WidgetRenderState<PaginationRenderState, PaginationConnectorParams>;
    };
    indexUiState: {
        page: number;
    };
};

declare type PaginationWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * The max number of pages to browse.
     */
    totalPages?: number;
    /**
     * The number of pages to display on each side of the current page.
     * @default 3
     */
    padding?: number;
    /**
     * Where to scroll after a click, set to `false` to disable.
     * @default body
     */
    scrollTo?: string | HTMLElement | boolean;
    /**
     * Whether to show the "first page" control
     * @default true
     */
    showFirst?: boolean;
    /**
     * Whether to show the "last page" control
     * @default true
     */
    showLast?: boolean;
    /**
     * Whether to show the "next page" control
     * @default true
     */
    showNext?: boolean;
    /**
     * Whether to show the "previous page" control
     * @default true
     */
    showPrevious?: boolean;
    /**
     * Text to display in the links.
     */
    templates?: PaginationTemplates;
    /**
     * CSS classes to be added.
     */
    cssClasses?: PaginationCSSClasses;
};

/**
 * The panel widget wraps other widgets in a consistent panel design.
 * It also reacts, indicates and sets CSS classes when widgets are no longer relevant for refining.
 */
declare const panel: PanelWidget;

declare type PanelCSSClasses = Partial<{
    /**
     * CSS classes to add to the root element of the widget.
     */
    root: string | string[];
    /**
     * CSS classes to add to the root element of the widget when there's no refinements.
     */
    noRefinementRoot: string | string[];
    /**
     * CSS classes to add to the root element when collapsible (`collapse` is defined).
     */
    collapsibleRoot: string | string[];
    /**
     * CSS classes to add to the root element when collapsed.
     */
    collapsedRoot: string | string[];
    /**
     * CSS classes to add to the collapse button element.
     */
    collapseButton: string | string[];
    /**
     * CSS classes to add to the collapse icon of the button.
     */
    collapseIcon: string | string[];
    /**
     * CSS classes to add to the header.
     */
    header: string | string[];
    /**
     * CSS classes to add to the body.
     */
    body: string | string[];
    /**
     * CSS classes to add to the footer.
     */
    footer: string | string[];
}>;

declare type PanelRenderOptions<TWidgetFactory extends AnyWidgetFactory> = RenderOptions & GetWidgetRenderState<TWidgetFactory>;

declare type PanelTemplates<TWidget extends AnyWidgetFactory> = Partial<{
    /**
     * Template to use for the header.
     */
    header: Template<PanelRenderOptions<TWidget>>;
    /**
     * Template to use for the footer.
     */
    footer: Template<PanelRenderOptions<TWidget>>;
    /**
     * Template to use for collapse button.
     */
    collapseButtonText: Template<{
        collapsed: boolean;
    }>;
}>;

declare type PanelWidget = <TWidgetFactory extends AnyWidgetFactory>(panelWidgetParams?: PanelWidgetParams<TWidgetFactory>) => (widgetFactory: TWidgetFactory) => (widgetParams: Parameters<TWidgetFactory>[0]) => AugmentedWidget<TWidgetFactory>;

declare type PanelWidgetParams<TWidgetFactory extends AnyWidgetFactory> = {
    /**
     * A function that is called on each render to determine if the
     * panel should be hidden based on the render options.
     */
    hidden?(options: PanelRenderOptions<TWidgetFactory>): boolean;
    /**
     * A function that is called on each render to determine if the
     * panel should be collapsed based on the render options.
     */
    collapsed?(options: PanelRenderOptions<TWidgetFactory>): boolean;
    /**
     * The templates to use for the widget.
     */
    templates?: PanelTemplates<TWidgetFactory>;
    /**
     * The CSS classes to override.
     */
    cssClasses?: PanelCSSClasses;
};

declare type ParamTrackedFilters = {
    [facetName: string]: (facetValues: TrackedFilterRefinement[]) => TrackedFilterRefinement[];
};

declare type ParamTransformItems = TransformItems<any>;

declare type ParamTransformRuleContexts = (ruleContexts: string[]) => string[];

declare type ParseURL<TRouteState> = (args: {
    qsModule: typeof qs_2;
    location: Location;
}) => TRouteState;

declare type PlacesInstance = Places.PlacesInstance;

declare type PlacesWidget = WidgetFactory<PlacesWidgetDescription, PlacesWidgetParams, PlacesWidgetParams>;

/**
 * This widget sets the geolocation value for the search based on the selected
 * result in the Algolia Places autocomplete.
 */
declare const placesWidget: PlacesWidget;

declare type PlacesWidgetDescription = {
    $$type: 'ais.places';
    $$widgetType: 'ais.places';
    renderState: Record<string, unknown>;
    indexRenderState: {
        places: WidgetRenderState<Record<string, unknown>, PlacesWidgetParams>;
    };
    indexUiState: {
        places: {
            query: string;
            position: string;
        };
    };
};

declare type PlacesWidgetParams = {
    /**
     * The Algolia Places reference to use.
     *
     * @see https://github.com/algolia/places
     */
    placesReference: (options: StaticOptions & ReconfigurableOptions) => PlacesInstance;
    /**
     * The default position when the input is empty.
     */
    defaultPosition?: string[];
} & StaticOptions;

declare const poweredBy: PoweredByWidget;

declare type PoweredByConnector = Connector<PoweredByWidgetDescription, PoweredByConnectorParams>;

declare type PoweredByConnectorParams = {
    /** the url to redirect to on click */
    url?: string;
};

declare type PoweredByCSSClasses = Partial<{
    /**
     * CSS class to add to the wrapping element.
     */
    root: string | string[];
    /**
     * CSS class to add to the link.
     */
    link: string | string[];
    /**
     * CSS class to add to the SVG logo.
     */
    logo: string | string[];
}>;

declare type PoweredByRenderState = {
    /** the url to redirect to on click */
    url: string;
};

declare type PoweredByWidget = WidgetFactory<PoweredByWidgetDescription & {
    $$widgetType: 'ais.poweredBy';
}, PoweredByConnectorParams, PoweredByWidgetParams>;

declare type PoweredByWidgetDescription = {
    $$type: 'ais.poweredBy';
    renderState: PoweredByRenderState;
    indexRenderState: {
        poweredBy: WidgetRenderState<PoweredByRenderState, PoweredByConnectorParams>;
    };
};

declare type PoweredByWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * The theme of the logo.
     * @default 'light'
     */
    theme?: 'light' | 'dark';
    /**
     * CSS classes to add.
     */
    cssClasses?: PoweredByCSSClasses;
};

declare const queryRuleContext: QueryRuleContextWidget;

declare type QueryRuleContextWidget = WidgetFactory<QueryRulesWidgetDescription & {
    $$widgetType: 'ais.queryRuleContext';
}, QueryRulesConnectorParams, QueryRuleContextWidgetParams>;

declare type QueryRuleContextWidgetParams = {
    trackedFilters: ParamTrackedFilters;
    transformRuleContexts?: ParamTransformRuleContexts;
};

declare const queryRuleCustomData: QueryRuleCustomDataWidget;

declare type QueryRuleCustomDataCSSClasses = Partial<{
    root: string | string[];
}>;

declare type QueryRuleCustomDataTemplates = Partial<{
    default: Template<{
        items: any[];
    }>;
}>;

declare type QueryRuleCustomDataWidget = WidgetFactory<QueryRulesWidgetDescription & {
    $$widgetType: 'ais.queryRuleCustomData';
}, QueryRulesConnectorParams, QueryRuleCustomDataWidgetParams>;

declare type QueryRuleCustomDataWidgetParams = {
    container: string | HTMLElement;
    cssClasses?: QueryRuleCustomDataCSSClasses;
    templates?: QueryRuleCustomDataTemplates;
};

declare type QueryRulesConnector = Connector<QueryRulesWidgetDescription, QueryRulesConnectorParams>;

declare type QueryRulesConnectorParams = {
    trackedFilters?: ParamTrackedFilters;
    transformRuleContexts?: ParamTransformRuleContexts;
    transformItems?: ParamTransformItems;
};

declare type QueryRulesRenderState = {
    items: any[];
};

declare type QueryRulesWidgetDescription = {
    $$type: 'ais.queryRules';
    renderState: QueryRulesRenderState;
    indexRenderState: {
        queryRules: WidgetRenderState<QueryRulesRenderState, QueryRulesConnectorParams>;
    };
};

declare type Range_2 = {
    min: RangeMin;
    max: RangeMax;
};

declare type RangeBoundaries = [RangeMin, RangeMax];

declare type RangeConnector = Connector<RangeWidgetDescription, RangeConnectorParams>;

declare type RangeConnectorParams = {
    /**
     * Name of the attribute for faceting.
     */
    attribute: string;
    /**
     * Minimal range value, default to automatically computed from the result set.
     */
    min?: number;
    /**
     * Maximal range value, default to automatically computed from the result set.
     */
    max?: number;
    /**
     * Number of digits after decimal point to use.
     */
    precision?: number;
};

declare const rangeInput: RangeInputWidget;

declare type RangeInputCSSClasses = Partial<{
    /**
     * CSS class to add to the root element.
     */
    root: string | string[];
    /**
     * CSS class to add to the root element when there's no refinements.
     */
    noRefinement: string | string[];
    /**
     * CSS class to add to the form element.
     */
    form: string | string[];
    /**
     * CSS class to add to the label element.
     */
    label: string | string[];
    /**
     * CSS class to add to the input element.
     */
    input: string | string[];
    /**
     * CSS class to add to the min input element.
     */
    inputMin: string | string[];
    /**
     * CSS class to add to the max input element.
     */
    separator: string | string[];
    /**
     * CSS class to add to the separator of the form.
     */
    inputMax: string | string[];
    /**
     * CSS class to add to the submit button of the form.
     */
    submit: string | string[];
}>;

declare type RangeInputTemplates = Partial<{
    /**
     * The label of the separator, between min and max.
     * @default "to"
     */
    separatorText: Template;
    /**
     * The label of the submit button
     * @default "Go"
     */
    submitText: Template;
}>;

declare type RangeInputWidget = WidgetFactory<Omit<RangeWidgetDescription, '$$type'> & {
    $$widgetType: 'ais.rangeInput';
    $$type: 'ais.rangeInput';
}, RangeConnectorParams, RangeInputWidgetParams>;

declare type RangeInputWidgetParams = {
    /**
     * Valid CSS Selector as a string or DOMElement.
     */
    container: string | HTMLElement;
    /**
     * Name of the attribute for faceting.
     */
    attribute: string;
    /**
     * Minimal slider value, default to automatically computed from the result set.
     */
    min?: number;
    /**
     * Maximal slider value, defaults to automatically computed from the result set.
     */
    max?: number;
    /**
     * Number of digits after decimal point to use.
     * @default 0
     */
    precision?: number;
    /**
     * Labels to use for the widget.
     */
    templates?: RangeInputTemplates;
    /**
     * CSS classes to add.
     */
    cssClasses?: RangeInputCSSClasses;
};

declare type RangeMax = number | undefined;

declare type RangeMin = number | undefined;

declare type RangeRenderState = {
    /**
     * Sets a range to filter the results on. Both values
     * are optional, and will default to the higher and lower bounds. You can use `undefined` to remove a
     * previously set bound or to set an infinite bound.
     * @param rangeValue tuple of [min, max] bounds
     */
    refine(rangeValue: RangeBoundaries): void;
    /**
     * Indicates whether this widget can be refined
     */
    canRefine: boolean;
    /**
     * Send an event to the insights middleware
     */
    sendEvent: SendEventForFacet;
    /**
     * Maximum range possible for this search
     */
    range: Range_2;
    /**
     * Current refinement of the search
     */
    start: RangeBoundaries;
    /**
     * Transform for the rendering `from` and/or `to` values.
     * Both functions take a `number` as input and should output a `string`.
     */
    format: {
        from(fromValue: number): string;
        to(toValue: number): string;
    };
};

/**
 * The range slider is a widget which provides a user-friendly way to filter the
 * results based on a single numeric range.
 *
 * @requirements
 * The attribute passed to `attribute` must be declared as an
 * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
 * in your Algolia settings.
 *
 * The values inside this attribute must be JavaScript numbers (not strings).
 */
declare const rangeSlider: RangeSliderWidget;

declare type RangeSliderCssClasses = Partial<{
    /**
     * CSS class to add to the root element.
     */
    root: string | string[];
    /**
     * CSS class to add to the disabled root element.
     */
    disabledRoot: string | string[];
}>;

declare type RangeSliderTooltipOptions = {
    /**
     * The function takes the raw value as input, and should return
     * a string for the label that should be used for this value.
     * @example
     * { format(rawValue) {return '$' + Math.round(rawValue).toLocaleString() } }
     */
    format(value: number): string;
};

declare type RangeSliderWidget = WidgetFactory<Omit<RangeWidgetDescription, '$$type'> & {
    $$widgetType: 'ais.rangeSlider';
    $$type: 'ais.rangeSlider';
}, RangeConnectorParams, RangeSliderWidgetParams>;

declare type RangeSliderWidgetParams = {
    /**
     * CSS Selector or DOMElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Name of the attribute for faceting.;
     */
    attribute: string;
    /**
     * Should we show tooltips or not.
     * The default tooltip will show the raw value.
     * You can also provide an object with a format function as an attribute.
     * So that you can format the tooltip display value as you want.
     * @default true
     */
    tooltips?: boolean | RangeSliderTooltipOptions;
    /**
     * CSS classes to add to the wrapping elements.
     */
    cssClasses?: RangeSliderCssClasses;
    /**
     * Show slider pips.
     * @default true
     */
    pips?: boolean;
    /**
     * Number of digits after decimal point to use.
     * @default 0
     */
    precision?: number;
    /**
     * Every handle move will jump that number of steps.
     */
    step?: number;
    /**
     * Minimal slider value, default to automatically computed from the result set.
     */
    min?: number;
    /**
     * Maximal slider value, defaults to automatically computed from the result set.
     */
    max?: number;
};

declare type RangeWidgetDescription = {
    $$type: 'ais.range';
    renderState: RangeRenderState;
    indexRenderState: {
        range: {
            [attribute: string]: WidgetRenderState<RangeRenderState, RangeConnectorParams>;
        };
    };
    indexUiState: {
        range: {
            [attribute: string]: string;
        };
    };
};

declare const ratingMenu: RatingMenuWidget;

declare type RatingMenuConnector = Connector<RatingMenuWidgetDescription, RatingMenuConnectorParams>;

declare type RatingMenuConnectorParams = {
    /**
     * Name of the attribute for faceting (eg. "free_shipping").
     */
    attribute: string;
    /**
     * The maximum rating value.
     */
    max?: number;
};

declare type RatingMenuCSSClasses = Partial<{
    /**
     * CSS class to add to the root element.
     */
    root: string | string[];
    /**
     * CSS class to add to the root element when there's no refinements.
     */
    noRefinementRoot: string | string[];
    /**
     * CSS class to add to the list element.
     */
    list: string | string[];
    /**
     * CSS class to add to each item element.
     */
    item: string | string[];
    /**
     * CSS class to add the selected item element.
     */
    selectedItem: string | string[];
    /**
     * CSS class to add a disabled item element.
     */
    disabledItem: string | string[];
    /**
     * CSS class to add to each link element.
     */
    link: string | string[];
    /**
     * CSS class to add to each star element (when using the default template).
     */
    starIcon: string | string[];
    /**
     * CSS class to add to each full star element (when using the default template).
     */
    fullStarIcon: string | string[];
    /**
     * CSS class to add to each empty star element (when using the default template).
     */
    emptyStarIcon: string | string[];
    /**
     * CSS class to add to each label.
     */
    label: string | string[];
    /**
     * CSS class to add to each counter.
     */
    count: string | string[];
}>;

declare type RatingMenuRenderState = {
    /**
     * Possible star ratings the user can apply.
     */
    items: StarRatingItems[];
    /**
     * Creates an URL for the next state (takes the item value as parameter). Takes the value of an item as parameter.
     */
    createURL: CreateURL<string>;
    /**
     *  Indicates if search state can be refined.
     */
    canRefine: boolean;
    /**
     * Selects a rating to filter the results (takes the filter value as parameter). Takes the value of an item as parameter.
     */
    refine: (value: string) => void;
    /**
     * `true` if the last search contains no result.
     */
    hasNoResults: boolean;
    /**
     * Send event to insights middleware
     */
    sendEvent: SendEvent;
};

declare type RatingMenuTemplates = Partial<{
    /**
     * Item template, provided with `name`, `count`, `isRefined`, `url` data properties.
     */
    item: Template<{
        name: string;
        count: number;
        isRefined: boolean;
        url: string;
    }>;
}>;

/**
 * Rating menu is used for displaying grade like filters. The values are normalized within boundaries.
 *
 * The maximum value can be set (with `max`), the minimum is always 0.
 *
 * @requirements
 * The attribute passed to `attribute` must be declared as an
 * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
 * in your Algolia settings.
 *
 * The values inside this attribute must be JavaScript numbers (not strings).
 *
 * @type {WidgetFactory}
 * @devNovel RatingMenu
 * @category filter
 * @param {RatingMenuWidgetParams} widgetParams RatingMenu widget options.
 * @return {Widget} A new RatingMenu widget instance.
 * @example
 * search.addWidgets([
 *   instantsearch.widgets.ratingMenu({
 *     container: '#stars',
 *     attribute: 'rating',
 *     max: 5,
 *   })
 * ]);
 */
declare type RatingMenuWidget = WidgetFactory<RatingMenuWidgetDescription & {
    $$widgetType: 'ais.ratingMenu';
}, RatingMenuConnectorParams, RatingMenuWidgetParams>;

declare type RatingMenuWidgetDescription = {
    $$type: 'ais.ratingMenu';
    renderState: RatingMenuRenderState;
    indexRenderState: {
        ratingMenu: {
            [attribute: string]: WidgetRenderState<RatingMenuRenderState, RatingMenuConnectorParams>;
        };
    };
    indexUiState: {
        ratingMenu: {
            [attribute: string]: number;
        };
    };
};

declare type RatingMenuWidgetParams = {
    /**
     * Place where to insert the widget in your webpage.
     */
    container: string | HTMLElement;
    /**
     * Name of the attribute in your records that contains the ratings.
     */
    attribute: string;
    /**
     * The maximum rating value.
     */
    max?: number;
    /**
     * Templates to use for the widget.
     */
    templates?: RatingMenuTemplates;
    /**
     * CSS classes to add.
     */
    cssClasses?: RatingMenuCSSClasses;
};

declare type Read = ({ state, }: {
    state: PlainSearchParameters;
}) => InfiniteHitsCachedHits | null;

declare type ReconfigurableOptions = Places.ReconfigurableOptions;

/**
 * Refine the given search parameters.
 */
declare type Refine = (searchParameters: PlainSearchParameters) => void;

declare type Refine_2 = (relevancyStrictness: number) => void;

/**
 * The refinement list widget is one of the most common widget that you can find
 * in a search UI. With this widget, the user can filter the dataset based on facets.
 *
 * The refinement list displays only the most relevant facets for the current search
 * context. The sort option only affects the facet that are returned by the engine,
 * not which facets are returned.
 *
 * This widget also implements search for facet values, which is a mini search inside the
 * values of the facets. This makes easy to deal with uncommon facet values.
 *
 * @requirements
 *
 * The attribute passed to `attribute` must be declared as an
 * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
 * in your Algolia settings.
 *
 * If you also want to use search for facet values on this attribute, you need to make it searchable using the [dashboard](https://www.algolia.com/explorer/display/) or using the [API](https://www.algolia.com/doc/guides/searching/faceting/#search-for-facet-values).
 */
declare const refinementList: RefinementListWidget;

declare type RefinementListConnector = Connector<RefinementListWidgetDescription, RefinementListConnectorParams>;

declare type RefinementListConnectorParams = {
    /**
     * The name of the attribute in the records.
     */
    attribute: string;
    /**
     * How the filters are combined together.
     */
    operator?: 'and' | 'or';
    /**
     * The max number of items to display when
     * `showMoreLimit` is not set or if the widget is showing less value.
     */
    limit?: number;
    /**
     * Whether to display a button that expands the number of items.
     */
    showMore?: boolean;
    /**
     * The max number of items to display if the widget
     * is showing more items.
     */
    showMoreLimit?: number;
    /**
     * How to sort refinements. Possible values: `count|isRefined|name:asc|name:desc`.
     *
     * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax).
     *
     * If a facetOrdering is set in the index settings, it is used when sortBy isn't passed
     */
    sortBy?: SortBy<RefinementListItem>;
    /**
     * Escapes the content of the facet values.
     */
    escapeFacetValues?: boolean;
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<RefinementListItem>;
};

declare type RefinementListCSSClasses = RefinementListOwnCSSClasses & RefinementListSearchableCSSClasses;

declare type RefinementListItem = {
    /**
     * The value of the refinement list item.
     */
    value: string;
    /**
     * Human-readable value of the refinement list item.
     */
    label: string;
    /**
     * Human-readable value of the searched refinement list item.
     */
    highlighted?: string;
    /**
     * Number of matched results after refinement is applied.
     */
    count: number;
    /**
     * Indicates if the list item is refined.
     */
    isRefined: boolean;
};

declare type RefinementListItemData = {
    /**
     * The number of occurrences of the facet in the result set.
     */
    count: number;
    /**
     * True if the value is selected.
     */
    isRefined: boolean;
    /**
     * The label to display.
     */
    label: string;
    /**
     * The value used for refining.
     */
    value: string;
    /**
     * The label highlighted (when using search for facet values). This value is displayed in the default template.
     */
    highlighted: string;
    /**
     * The url with this refinement selected.
     */
    url: string;
    /**
     * Object containing all the classes computed for the item.
     */
    cssClasses: RefinementListCSSClasses;
};

declare type RefinementListOwnCSSClasses = Partial<{
    /**
     * CSS class to add to the root element.
     */
    root: string | string[];
    /**
     * CSS class to add to the root element when no refinements.
     */
    noRefinementRoot: string | string[];
    /**
     * CSS class to add to the root element with no results.
     */
    noResults: string | string[];
    /**
     * CSS class to add to the list element.
     */
    list: string | string[];
    /**
     * CSS class to add to each item element.
     */
    item: string | string[];
    /**
     * CSS class to add to each selected element.
     */
    selectedItem: string | string[];
    /**
     * CSS class to add to each label element (when using the default template).
     */
    label: string | string[];
    /**
     * CSS class to add to each checkbox element (when using the default template).
     */
    checkbox: string | string[];
    /**
     * CSS class to add to each label text element.
     */
    labelText: string | string[];
    /**
     * CSS class to add to the show more element
     */
    showMore: string | string[];
    /**
     * CSS class to add to the disabled show more element
     */
    disabledShowMore: string | string[];
    /**
     * CSS class to add to each count element (when using the default template).
     */
    count: string | string[];
    /**
     * CSS class to add to the searchable container.
     */
    searchBox: string | string[];
}>;

declare type RefinementListOwnTemplates = Partial<{
    /**
     * Item template, provided with `label`, `highlighted`, `value`, `count`, `isRefined`, `url` data properties.
     */
    item: Template<RefinementListItemData>;
    /**
     * Template used for the show more text, provided with `isShowingMore` data property.
     */
    showMoreText: Template;
    /**
     * Templates to use for search for facet values when there are no results.
     */
    searchableNoResults: Template;
}>;

declare type RefinementListRenderState = {
    /**
     * The list of filtering values returned from Algolia API.
     */
    items: RefinementListItem[];
    /**
     * indicates whether the results are exhaustive (complete)
     */
    hasExhaustiveItems: boolean;
    /**
     * Creates the next state url for a selected refinement.
     */
    createURL: CreateURL<string>;
    /**
     * Action to apply selected refinements.
     */
    refine(value: string): void;
    /**
     * Send event to insights middleware
     */
    sendEvent: SendEventForFacet;
    /**
     * Searches for values inside the list.
     */
    searchForItems(query: string): void;
    /**
     * `true` if the values are from an index search.
     */
    isFromSearch: boolean;
    /**
     * `true` if a refinement can be applied.
     */
    canRefine: boolean;
    /**
     * `true` if the toggleShowMore button can be activated (enough items to display more or
     * already displaying more than `limit` items)
     */
    canToggleShowMore: boolean;
    /**
     * True if the menu is displaying all the menu items.
     */
    isShowingMore: boolean;
    /**
     * Toggles the number of values displayed between `limit` and `showMoreLimit`.
     */
    toggleShowMore(): void;
};

declare type RefinementListSearchableCSSClasses = Partial<{
    searchableRoot: string | string[];
    searchableForm: string | string[];
    searchableInput: string | string[];
    searchableSubmit: string | string[];
    searchableSubmitIcon: string | string[];
    searchableReset: string | string[];
    searchableResetIcon: string | string[];
    searchableLoadingIndicator: string | string[];
    searchableLoadingIcon: string | string[];
}>;

declare type RefinementListSearchableTemplates = Partial<{
    /**
     * Templates to use for search for facet values submit button.
     */
    searchableSubmit: SearchBoxTemplates['submit'];
    /**
     * Templates to use for search for facet values reset button.
     */
    searchableReset: SearchBoxTemplates['reset'];
    /**
     * Templates to use for the search for facet values loading indicator.
     */
    searchableLoadingIndicator: SearchBoxTemplates['loadingIndicator'];
}>;

declare type RefinementListTemplates = RefinementListOwnTemplates & RefinementListSearchableTemplates;

declare type RefinementListWidget = WidgetFactory<RefinementListWidgetDescription & {
    $$widgetType: 'ais.refinementList';
}, RefinementListConnectorParams, RefinementListWidgetParams>;

declare type RefinementListWidgetDescription = {
    $$type: 'ais.refinementList';
    renderState: RefinementListRenderState;
    indexRenderState: {
        refinementList: {
            [attribute: string]: WidgetRenderState<RefinementListRenderState, RefinementListConnectorParams>;
        };
    };
    indexUiState: {
        refinementList: {
            [attribute: string]: string[];
        };
    };
};

declare type RefinementListWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Add a search input to let the user search for more facet values. In order
     * to make this feature work, you need to make the attribute searchable
     * [using the API](https://www.algolia.com/doc/guides/searching/faceting/?language=js#declaring-a-searchable-attribute-for-faceting)
     * or [the dashboard](https://www.algolia.com/explorer/display/)
     */
    searchable?: boolean;
    /**
     * Value of the search field placeholder.
     */
    searchablePlaceholder?: string;
    /**
     * When `false` the search field will become disabled if there are less items
     * to display than the `options.limit`, otherwise the search field is always usable.
     */
    searchableIsAlwaysActive?: boolean;
    /**
     * When activated, it will escape the facet values that are returned from Algolia.
     * In this case, the surrounding tags will always be `<mark></mark>`.
     */
    searchableEscapeFacetValues?: boolean;
    /**
     * Templates to use for the widget.
     */
    templates?: RefinementListTemplates;
    /**
     * CSS classes to add to the wrapping elements.
     */
    cssClasses?: RefinementListCSSClasses;
};

declare const relevantSort: RelevantSortWidget;

declare type RelevantSortConnector = Connector<RelevantSortWidgetDescription, RelevantSortConnectorParams>;

declare type RelevantSortConnectorParams = Record<string, unknown>;

declare type RelevantSortCSSClasses = Partial<{
    root: string;
    text: string;
    button: string;
}>;

declare type RelevantSortRenderState = {
    /**
     * Indicates if it has appliedRelevancyStrictness greater than zero
     */
    isRelevantSorted: boolean;
    /**
     * Indicates if the results come from a virtual replica
     */
    isVirtualReplica: boolean;
    /**
     * Indicates if search state can be refined
     */
    canRefine: boolean;
    /**
     * Sets the value as relevancyStrictness and trigger a new search
     */
    refine: Refine_2;
};

declare type RelevantSortTemplates = Partial<{
    text: Template<{
        isRelevantSorted: boolean;
    }>;
    button: Template<{
        isRelevantSorted: boolean;
    }>;
}>;

declare type RelevantSortWidget = WidgetFactory<RelevantSortWidgetDescription & {
    $$widgetType: 'ais.relevantSort';
}, RelevantSortConnectorParams, RelevantSortWidgetParams>;

declare type RelevantSortWidgetDescription = {
    $$type: 'ais.relevantSort';
    renderState: RelevantSortRenderState;
    indexRenderState: {
        relevantSort: WidgetRenderState<RelevantSortRenderState, RelevantSortConnectorParams>;
    };
    indexUiState: {
        relevantSort: number;
    };
};

declare type RelevantSortWidgetParams = {
    container: string | HTMLElement;
    cssClasses?: RelevantSortCSSClasses;
    templates?: RelevantSortTemplates;
};

/**
 * The render function.
 */
declare type Renderer<TRenderState, TWidgetParams> = (
/**
 * The base render options plus the specific options of the widget.
 */
renderState: TRenderState & RendererOptions<TWidgetParams>, 
/**
 * If is the first run.
 */
isFirstRender: boolean) => void;

/**
 * The base renderer options. All render functions receive
 * the options below plus the specific options per connector.
 */
declare type RendererOptions<TWidgetParams> = {
    /**
     * The original widget params. Useful as you may
     * need them while using the render function.
     */
    widgetParams: TWidgetParams;
    /**
     * The current instant search instance.
     */
    instantSearchInstance: InstantSearch;
    /**
     * The original search results.
     */
    results?: SearchResults;
    /**
     * The mutable list of hits. The may change depending
     * of the given transform items function.
     */
    hits?: Hits;
    /**
     * The current insights client, if any.
     */
    insights?: InsightsClient;
};

declare type RenderOptions = SharedRenderOptions & {
    results: SearchResults;
};

declare type RenderState = {
    [indexId: string]: IndexRenderState;
};

declare type RenderStateLifeCycle<TWidgetDescription extends WidgetDescription & WidgetParams> = TWidgetDescription extends RequiredKeys<WidgetDescription, 'renderState' | 'indexRenderState'> & WidgetParams ? RequiredRenderStateLifeCycle<TWidgetDescription> : Partial<RequiredRenderStateLifeCycle<TWidgetDescription>>;

declare type RequiredKeys<TObject, TKeys extends keyof TObject> = Expand<Required<Pick<TObject, TKeys>> & Omit<TObject, TKeys>>;

declare type RequiredRenderStateLifeCycle<TWidgetDescription extends WidgetDescription & WidgetParams> = {
    /**
     * Returns the render state of the current widget to pass to the render function.
     */
    getWidgetRenderState: (renderOptions: InitOptions | RenderOptions) => Expand<WidgetRenderState<TWidgetDescription['renderState'], TWidgetDescription['widgetParams']>>;
    /**
     * Returns IndexRenderState of the current index component tree
     * to build the render state of the whole app.
     */
    getRenderState: (renderState: Expand<IndexRenderState & Partial<TWidgetDescription['indexRenderState']>>, renderOptions: InitOptions | RenderOptions) => IndexRenderState & TWidgetDescription['indexRenderState'];
};

declare type RequiredUiStateLifeCycle<TWidgetDescription extends WidgetDescription> = {
    /**
     * This function is required for a widget to be taken in account for routing.
     * It will derive a uiState for this widget based on the existing uiState and
     * the search parameters applied.
     *
     * @param uiState - Current state.
     * @param widgetStateOptions - Extra information to calculate uiState.
     */
    getWidgetUiState: (uiState: Expand<Partial<TWidgetDescription['indexUiState'] & IndexUiState>>, widgetUiStateOptions: {
        searchParameters: SearchParameters;
        helper: AlgoliaSearchHelper;
    }) => Partial<IndexUiState & TWidgetDescription['indexUiState']>;
    /**
     * This function is required for a widget to be taken in account for routing.
     * It will derive a uiState for this widget based on the existing uiState and
     * the search parameters applied.
     *
     * @deprecated Use `getWidgetUiState` instead.
     * @param uiState - Current state.
     * @param widgetStateOptions - Extra information to calculate uiState.
     */
    getWidgetState?: RequiredUiStateLifeCycle<TWidgetDescription>['getWidgetUiState'];
    /**
     * This function is required for a widget to behave correctly when a URL is
     * loaded via e.g. Routing. It receives the current UiState and applied search
     * parameters, and is expected to return a new search parameters.
     *
     * @param state - Applied search parameters.
     * @param widgetSearchParametersOptions - Extra information to calculate next searchParameters.
     */
    getWidgetSearchParameters: (state: SearchParameters, widgetSearchParametersOptions: {
        uiState: Expand<Partial<TWidgetDescription['indexUiState'] & IndexUiState>>;
    }) => SearchParameters;
};

declare type RequiredWidgetLifeCycle<TWidgetDescription extends WidgetDescription> = {
    /**
     * Identifier for connectors and widgets.
     */
    $$type: TWidgetDescription['$$type'];
    /**
     * Called once before the first search.
     */
    init?: (options: InitOptions) => void;
    /**
     * Called after each search response has been received.
     */
    render?: (options: RenderOptions) => void;
    /**
     * Called when this widget is unmounted. Used to remove refinements set by
     * during this widget's initialization and life time.
     */
    dispose?: (options: DisposeOptions) => SearchParameters | void;
};

declare type RequiredWidgetType<TWidgetDescription extends WidgetDescription> = {
    /**
     * Identifier for widgets.
     */
    $$widgetType: TWidgetDescription['$$widgetType'];
};

declare function reverseHighlight({ attribute, highlightedTagName, hit, cssClasses, }: ReverseHighlightOptions): string;

declare type ReverseHighlightOptions = {
    attribute: string | string[];
    highlightedTagName?: string;
    hit: Partial<Hit>;
    cssClasses?: Partial<{
        highlighted: string;
    }>;
};

declare function reverseSnippet({ attribute, highlightedTagName, hit, cssClasses, }: ReverseSnippetOptions): string;

declare type ReverseSnippetOptions = {
    attribute: string | string[];
    highlightedTagName?: string;
    hit: Partial<Hit>;
    cssClasses?: Partial<{
        highlighted: string;
    }>;
};

/**
 * The router is the part that saves and reads the object from the storage.
 * Usually this is the URL.
 */
declare type Router<TRouteState = UiState> = {
    /**
     * onUpdate Sets an event listener that is triggered when the storage is updated.
     * The function should accept a callback to trigger when the update happens.
     * In the case of the history / URL in a browser, the callback will be called
     * by `onPopState`.
     */
    onUpdate(callback: (route: TRouteState) => void): void;
    /**
     * Reads the storage and gets a route object. It does not take parameters,
     * and should return an object
     */
    read(): TRouteState;
    /**
     * Pushes a route object into a storage. Takes the UI state mapped by the state
     * mapping configured in the mapping
     */
    write(route: TRouteState): void;
    /**
     * Transforms a route object into a URL. It receives an object and should
     * return a string. It may return an empty string.
     */
    createURL(state: TRouteState): string;
    /**
     * Called when InstantSearch is disposed. Used to remove subscriptions.
     */
    dispose(): void;
};

declare type RouterProps<TUiState extends UiState = UiState, TRouteState = TUiState> = {
    router?: Router<TRouteState>;
    stateMapping?: StateMapping<TUiState, TRouteState>;
};

declare namespace routers {
    export {
        historyRouter as history
    }
}

declare type ScopedResult = {
    indexId: string;
    results: SearchResults;
    helper: AlgoliaSearchHelper;
};

declare const searchBox: SearchBoxWidget;

declare type SearchBoxConnector = Connector<SearchBoxWidgetDescription, SearchBoxConnectorParams>;

declare type SearchBoxConnectorParams = {
    /**
     * A function that will be called every time
     * a new value for the query is set. The first parameter is the query and the second is a
     * function to actually trigger the search. The function takes the query as the parameter.
     *
     * This queryHook can be used to debounce the number of searches done from the searchBox.
     */
    queryHook?: (query: string, hook: (value: string) => void) => void;
};

declare type SearchBoxCSSClasses = Partial<{
    /**
     * CSS class to add to the wrapping `<div>`
     */
    root: string | string[];
    /**
     * CSS class to add to the form
     */
    form: string | string[];
    /**
     * CSS class to add to the input.
     */
    input: string | string[];
    /**
     * CSS classes added to the submit button.
     */
    submit: string | string[];
    /**
     * CSS classes added to the submit icon.
     */
    submitIcon: string | string[];
    /**
     * CSS classes added to the reset button.
     */
    reset: string | string[];
    /**
     * CSS classes added to the reset icon.
     */
    resetIcon: string | string[];
    /**
     * CSS classes added to the loading indicator element.
     */
    loadingIndicator: string | string[];
    /**
     * CSS classes added to the loading indicator icon.
     */
    loadingIcon: string | string[];
}>;

/**
 * @typedef {Object} CustomSearchBoxWidgetParams@typedef {Object} CustomSearchBoxWidgetParams
 * @property {function(string, function(string))} [queryHook = undefined] A function that will be called every time
 * a new value for the query is set. The first parameter is the query and the second is a
 * function to actually trigger the search. The function takes the query as the parameter.
 *
 * This queryHook can be used to debounce the number of searches done from the searchBox.
 */
declare type SearchBoxRenderState = {
    /**
     * The query from the last search.
     */
    query: string;
    /**
     * Sets a new query and searches.
     */
    refine: (value: string) => void;
    /**
     * Remove the query and perform search.
     */
    clear: () => void;
    /**
     * `true` if the search results takes more than a certain time to come back
     * from Algolia servers. This can be configured on the InstantSearch constructor with the attribute
     * `stalledSearchDelay` which is 200ms, by default.
     */
    isSearchStalled: boolean;
};

declare type SearchBoxTemplates = Partial<{
    /**
     * Template used for displaying the submit button. Can accept a function or a Hogan string.
     */
    submit: Template;
    /**
     * Template used for displaying the reset button. Can accept a function or a Hogan string.
     */
    reset: Template;
    /**
     * Template used for displaying the loading indicator. Can accept a function or a Hogan string.
     */
    loadingIndicator: Template;
}>;

/**
 * The searchbox widget is used to let the user set a text based query.
 *
 * This is usually the  main entry point to start the search in an instantsearch context. For that
 * reason is usually placed on top, and not hidden so that the user can start searching right
 * away.
 *
 */
declare type SearchBoxWidget = WidgetFactory<SearchBoxWidgetDescription & {
    $$widgetType: 'ais.searchBox';
}, SearchBoxConnectorParams, SearchBoxWidgetParams>;

declare type SearchBoxWidgetDescription = {
    $$type: 'ais.searchBox';
    renderState: SearchBoxRenderState;
    indexRenderState: {
        searchBox: WidgetRenderState<SearchBoxRenderState, SearchBoxConnectorParams>;
    };
    indexUiState: {
        query: string;
    };
};

declare type SearchBoxWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget
     */
    container: string | HTMLElement;
    /**
     * The placeholder of the input
     */
    placeholder?: string;
    /**
     * Whether the input should be autofocused
     */
    autofocus?: boolean;
    /**
     * If set, trigger the search
     * once `<Enter>` is pressed only.
     */
    searchAsYouType?: boolean;
    /**
     * Whether to show the reset button
     */
    showReset?: boolean;
    /**
     * Whether to show the submit button
     */
    showSubmit?: boolean;
    /**
     * Whether to show the loading indicator (replaces the submit if
     * the search is stalled)
     */
    showLoadingIndicator?: boolean;
    /**
     * CSS classes to add
     */
    cssClasses?: SearchBoxCSSClasses;
    /**
     * Templates used for customizing the rendering of the searchbox
     */
    templates?: SearchBoxTemplates;
    /**
     * A function that is called every time a new search is done. You
     * will get the query as the first parameter and a search (query) function to call as the second parameter.
     * This `queryHook` can be used to debounce the number of searches done from the search box.
     */
    queryHook?: (query: string, hook: (value: string) => void) => void;
};

declare type SearchClient = {
    search: DefaultSearchClient['search'];
    searchForFacetValues: DefaultSearchClient['searchForFacetValues'];
    addAlgoliaAgent?: DefaultSearchClient['addAlgoliaAgent'];
    initIndex?: (indexName: string) => SearchIndex extends {
        findAnswers: any;
    } ? Partial<Pick<SearchIndex, 'findAnswers'>> : SearchIndex;
};

declare type SearchIndex = ReturnType<DefaultSearchClient['initIndex']>;

declare type SendEvent = (...args: [InsightsEvent] | [string, string, string?]) => void;

declare type SendEventForFacet = BuiltInSendEventForFacet & CustomSendEventForFacet;

declare type SendEventForHits = BuiltInSendEventForHits & CustomSendEventForHits;

declare type SendEventForToggle = BuiltInSendEventForToggle & CustomSendEventForToggle;

declare type SharedRenderOptions = {
    instantSearchInstance: InstantSearch;
    parent: IndexWidget | null;
    templatesConfig: Record<string, unknown>;
    scopedResults: ScopedResult[];
    state: SearchParameters;
    renderState: IndexRenderState;
    helper: AlgoliaSearchHelper;
    searchMetadata: {
        isSearchStalled: boolean;
    };
    createURL(state: SearchParameters): string;
};

declare function simpleStateMapping<TUiState extends UiState = UiState>(): StateMapping<TUiState, TUiState>;

declare function singleIndexStateMapping<TUiState extends UiState = UiState>(indexName: keyof TUiState): StateMapping<TUiState, TUiState[typeof indexName]>;

declare function snippet({ attribute, highlightedTagName, hit, cssClasses, }: SnippetOptions): string;

declare type SnippetOptions = {
    attribute: string | string[];
    highlightedTagName?: string;
    hit: Partial<Hit>;
    cssClasses?: {
        highlighted?: string;
    };
};

/**
 * Transforms the given items.
 */
declare type SortBy<TItem> = ((a: TItem, b: TItem) => number) | Array<'count' | 'isRefined' | 'name:asc' | 'name:desc'>;

/**
 * Sort by selector is a widget used for letting the user choose between different
 * indices that contains the same data with a different order / ranking formula.
 */
declare const sortBy: SortByWidget;

declare type SortByConnector = Connector<SortByWidgetDescription, SortByConnectorParams>;

declare type SortByConnectorParams = {
    /**
     * Array of objects defining the different indices to choose from.
     */
    items: SortByItem[];
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<SortByItem>;
};

declare type SortByIndexDefinition = {
    /**
     * The name of the index to target.
     */
    value: string;
    /**
     * The label of the index to display.
     */
    label: string;
};

/**
 * The **SortBy** connector provides the logic to build a custom widget that will display a
 * list of indices. With Algolia, this is most commonly used for changing ranking strategy. This allows
 * a user to change how the hits are being sorted.
 */
declare type SortByItem = {
    /**
     * The name of the index to target.
     */
    value: string;
    /**
     * The label of the index to display.
     */
    label: string;
};

declare type SortByRenderState = {
    /**
     * The initially selected index.
     */
    initialIndex?: string;
    /**
     * The currently selected index.
     */
    currentRefinement: string;
    /**
     * All the available indices
     */
    options: SortByItem[];
    /**
     * Switches indices and triggers a new search.
     */
    refine: (value: string) => void;
    /**
     * `true` if the last search contains no result.
     */
    hasNoResults: boolean;
};

declare type SortByWidget = WidgetFactory<SortByWidgetDescription & {
    $$widgetType: 'ais.sortBy';
}, SortByConnectorParams, SortByWidgetParams>;

declare type SortByWidgetCssClasses = Partial<{
    /**
     * CSS classes added to the outer `<div>`.
     */
    root: string | string[];
    /**
     * CSS classes added to the parent `<select>`.
     */
    select: string | string[];
    /**
     * CSS classes added to each `<option>`.
     */
    option: string | string[];
}>;

declare type SortByWidgetDescription = {
    $$type: 'ais.sortBy';
    renderState: SortByRenderState;
    indexRenderState: {
        sortBy: WidgetRenderState<SortByRenderState, SortByConnectorParams>;
    };
    indexUiState: {
        sortBy: string;
    };
};

declare type SortByWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Array of objects defining the different indices to choose from.
     */
    items: SortByIndexDefinition[];
    /**
     * CSS classes to be added.
     */
    cssClasses?: SortByWidgetCssClasses;
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<SortByItem>;
};

declare type StarRatingItems = {
    /**
     * Name corresponding to the number of stars.
     */
    name: string;
    /**
     * Human-readable name corresponding to the number of stars.
     */
    label: string;
    /**
     * Number of stars as string.
     */
    value: string;
    /**
     * Count of matched results corresponding to the number of stars.
     */
    count: number;
    /**
     *  Array of length of maximum rating value with stars to display or not.
     */
    stars: boolean[];
    /**
     * Indicates if star rating refinement is applied.
     */
    isRefined: boolean;
};

/**
 * The state mapping is a way to customize the structure before sending it to the router.
 * It can transform and filter out the properties. To work correctly, the following
 * should be valid for any UiState:
 * `UiState = routeToState(stateToRoute(UiState))`.
 */
declare type StateMapping<TUiState = UiState, TRouteState = TUiState> = {
    /**
     * Transforms a UI state representation into a route object.
     * It receives an object that contains the UI state of all the widgets in the page.
     * It should return an object of any form as long as this form can be read by
     * the `routeToState` function.
     */
    stateToRoute(uiState: TUiState): TRouteState;
    /**
     * Transforms route object into a UI state representation.
     * It receives an object that contains the UI state stored by the router.
     * The format is the output of `stateToRoute`.
     */
    routeToState(routeState: TRouteState): TUiState;
};

declare namespace stateMappings {
    export {
        simpleStateMapping as simple,
        singleIndexStateMapping as singleIndex
    }
}

declare type StaticOptions = Places.StaticOptions;

/**
 * The `stats` widget is used to display useful insights about the current results.
 *
 * By default, it will display the **number of hits** and the time taken to compute the
 * results inside the engine.
 */
declare const stats: StatsWidget;

declare type StatsConnector = Connector<StatsWidgetDescription, StatsConnectorParams>;

declare type StatsConnectorParams = Record<string, unknown>;

declare type StatsCSSClasses = Partial<{
    /**
     * CSS class to add to the root element.
     */
    root: string | string[];
    /**
     * CSS class to add to the text span element.
     */
    text: string | string[];
}>;

/**
 * **Stats** connector provides the logic to build a custom widget that will displays
 * search statistics (hits number and processing time).
 */
declare type StatsRenderState = {
    /**
     * The maximum number of hits per page returned by Algolia.
     */
    hitsPerPage?: number;
    /**
     * The number of hits in the result set.
     */
    nbHits: number;
    /**
     * The number of sorted hits in the result set (when using Relevant sort).
     */
    nbSortedHits?: number;
    /**
     * Indicates whether the index is currently using Relevant sort and is displaying only sorted hits.
     */
    areHitsSorted: boolean;
    /**
     * The number of pages computed for the result set.
     */
    nbPages: number;
    /**
     * The current page.
     */
    page: number;
    /**
     * The time taken to compute the results inside the Algolia engine.
     */
    processingTimeMS: number;
    /**
     * The query used for the current search.
     */
    query: string;
};

declare type StatsTemplates = Partial<{
    /**
     * Text template, provided with `hasManyResults`, `hasNoResults`, `hasOneResult`, `hitsPerPage`, `nbHits`, `nbSortedHits`, `nbPages`, `areHitsSorted`, `page`, `processingTimeMS`, `query`.
     */
    text: Template<{
        hasManyResults: boolean;
        hasNoResults: boolean;
        hasOneResult: boolean;
    } & StatsRenderState>;
}>;

declare type StatsWidget = WidgetFactory<StatsWidgetDescription & {
    $$widgetType: 'ais.stats';
}, StatsConnectorParams, StatsWidgetParams>;

declare type StatsWidgetDescription = {
    $$type: 'ais.stats';
    renderState: StatsRenderState;
    indexRenderState: {
        stats: WidgetRenderState<StatsRenderState, StatsConnectorParams>;
    };
};

declare type StatsWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Templates to use for the widget.
     */
    templates?: StatsTemplates;
    /**
     * CSS classes to add.
     */
    cssClasses?: StatsCSSClasses;
};

declare type Status = 'initial' | 'askingPermission' | 'waiting' | 'recognizing' | 'finished' | 'error';

declare type Template<TTemplateData = void> = string | ((data: TTemplateData) => string);

declare type TemplateWithBindEvent<TTemplateData = void> = string | ((data: TTemplateData, bindEvent: BindEventForHits) => string);

/**
 * The toggleRefinement widget lets the user either:
 *  - switch between two values for a single facetted attribute (free_shipping / not_free_shipping)
 *  - toggleRefinement a faceted value on and off (only 'canon' for brands)
 *
 * This widget is particularly useful if you have a boolean value in the records.
 *
 * @requirements
 * The attribute passed to `attribute` must be declared as an
 * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
 * in your Algolia settings.
 */
declare const toggleRefinement: ToggleRefinementWidget;

declare type ToggleRefinementConnector = Connector<ToggleRefinementWidgetDescription, ToggleRefinementConnectorParams>;

declare type ToggleRefinementConnectorParams = {
    /** Name of the attribute for faceting (eg. "free_shipping"). */
    attribute: string;
    /**
     * Value to filter on when toggled.
     * @default "true"
     */
    on?: string | string[] | boolean | boolean[] | number | number[];
    /**
     * Value to filter on when not toggled.
     */
    off?: string | string[] | boolean | boolean[] | number | number[];
};

declare type ToggleRefinementCSSClasses = Partial<{
    /**
     * CSS class to add to the root element.
     */
    root: string | string[];
    /**
     * CSS class to add to the label wrapping element.
     */
    label: string | string[];
    /**
     * CSS class to add to the checkbox.
     */
    checkbox: string | string[];
    /**
     * CSS class to add to the label text.
     */
    labelText: string | string[];
}>;

declare type ToggleRefinementRenderState = {
    /** The current toggle value */
    value: {
        name: string;
        isRefined: boolean;
        count: number | null;
        onFacetValue: ToggleRefinementValue;
        offFacetValue: ToggleRefinementValue;
    };
    /** Creates an URL for the next state. */
    createURL: CreateURL<string>;
    /** send a "facet clicked" insights event */
    sendEvent: SendEventForToggle;
    /** Indicates if search state can be refined. */
    canRefine: boolean;
    /** Updates to the next state by applying the toggle refinement. */
    refine: (value?: {
        isRefined: boolean;
    }) => void;
};

declare type ToggleRefinementTemplates = Partial<{
    /**
     * the text that describes the toggle action
     */
    labelText: Template<ToggleRefinementValue>;
}>;

declare type ToggleRefinementValue = {
    /** whether this option is enabled */
    isRefined: boolean;
    /** number of result if this option is enabled */
    count: number | null;
};

declare type ToggleRefinementWidget = WidgetFactory<ToggleRefinementWidgetDescription & {
    $$widgetType: 'ais.toggleRefinement';
}, ToggleRefinementConnectorParams, ToggleRefinementWidgetParams>;

declare type ToggleRefinementWidgetDescription = {
    $$type: 'ais.toggleRefinement';
    renderState: ToggleRefinementRenderState;
    indexRenderState: {
        toggleRefinement: {
            [attribute: string]: WidgetRenderState<ToggleRefinementRenderState, ToggleRefinementConnectorParams>;
        };
    };
    indexUiState: {
        toggle: {
            [attribute: string]: boolean;
        };
    };
};

declare type ToggleRefinementWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Templates to use for the widget.
     */
    templates?: ToggleRefinementTemplates;
    /**
     * CSS classes to be added.
     */
    cssClasses?: ToggleRefinementCSSClasses;
};

declare type TrackedFilterRefinement = string | number | boolean;

/**
 * Transforms the given items.
 */
declare type TransformItems<TItem> = (items: TItem[]) => TItem[];

declare type TransformSearchParameters = (searchParameters: SearchParameters) => PlainSearchParameters;

declare type UiState = {
    [indexId: string]: IndexUiState;
};

declare type UiStateLifeCycle<TWidgetDescription extends WidgetDescription> = TWidgetDescription extends RequiredKeys<WidgetDescription, 'indexUiState'> ? RequiredUiStateLifeCycle<TWidgetDescription> : Partial<RequiredUiStateLifeCycle<TWidgetDescription>>;

/**
 * The called function when unmounting a widget.
 */
declare type Unmounter = () => void;

declare type VoiceListeningState = {
    status: Status;
    transcript: string;
    isSpeechFinal: boolean;
    errorCode?: string;
};

declare const voiceSearch: VoiceSearchWidget;

declare type VoiceSearchConnector = Connector<VoiceSearchWidgetDescription, VoiceSearchConnectorParams>;

declare type VoiceSearchConnectorParams = {
    searchAsYouSpeak?: boolean;
    language?: string;
    additionalQueryParameters?: (params: {
        query: string;
    }) => PlainSearchParameters | void;
    createVoiceSearchHelper?: CreateVoiceSearchHelper;
};

declare type VoiceSearchCSSClasses = Partial<{
    root: string | string[];
    button: string | string[];
    status: string | string[];
}>;

declare type VoiceSearchHelper = {
    getState: () => VoiceListeningState;
    isBrowserSupported: () => boolean;
    isListening: () => boolean;
    startListening: () => void;
    stopListening: () => void;
    dispose: () => void;
};

declare type VoiceSearchHelperParams = {
    searchAsYouSpeak: boolean;
    language?: string;
    onQueryChange: (query: string) => void;
    onStateChange: () => void;
};

declare type VoiceSearchRenderState = {
    isBrowserSupported: boolean;
    isListening: boolean;
    toggleListening: () => void;
    voiceListeningState: VoiceListeningState;
};

declare type VoiceSearchTemplateProps = {
    status: string;
    errorCode: string;
    isListening: boolean;
    transcript: string;
    isSpeechFinal: boolean;
    isBrowserSupported: boolean;
};

declare type VoiceSearchTemplates = Partial<{
    buttonText: Template<VoiceSearchTemplateProps>;
    status: Template<VoiceSearchTemplateProps>;
}>;

declare type VoiceSearchWidget = WidgetFactory<VoiceSearchWidgetDescription & {
    $$type: 'ais.voiceSearch';
}, VoiceSearchConnectorParams, VoiceSearchWidgetParams>;

declare type VoiceSearchWidgetDescription = {
    $$type: 'ais.voiceSearch';
    renderState: VoiceSearchRenderState;
    indexRenderState: {
        voiceSearch: WidgetRenderState<VoiceSearchRenderState, VoiceSearchConnectorParams>;
    };
    indexUiState: {
        query: string;
    };
};

declare type VoiceSearchWidgetParams = {
    container: string | HTMLElement;
    cssClasses?: VoiceSearchCSSClasses;
    templates?: VoiceSearchTemplates;
    searchAsYouSpeak?: boolean;
    language?: string;
    additionalQueryParameters?: (params: {
        query: string;
    }) => PlainSearchParameters | void;
    createVoiceSearchHelper?: CreateVoiceSearchHelper;
};

declare type Widget<TWidgetDescription extends WidgetDescription & WidgetParams = {
    $$type: string;
    widgetParams: unknown;
}> = Expand<RequiredWidgetLifeCycle<TWidgetDescription> & WidgetType<TWidgetDescription> & UiStateLifeCycle<TWidgetDescription> & RenderStateLifeCycle<TWidgetDescription>>;

declare type WidgetDescription = {
    $$type: string;
    $$widgetType?: string;
    renderState?: Record<string, unknown>;
    indexRenderState?: Record<string, unknown>;
    indexUiState?: Record<string, unknown>;
};

/**
 * The function that creates a new widget.
 */
declare type WidgetFactory<TWidgetDescription extends WidgetDescription, TConnectorParams, TWidgetParams> = (
/**
 * The params of the widget.
 */
widgetParams: TWidgetParams & TConnectorParams) => Widget<TWidgetDescription & {
    widgetParams: TConnectorParams;
}>;

declare type WidgetParams = {
    widgetParams: NonNullable<unknown>;
};

declare type WidgetRenderState<TWidgetRenderState, TWidgetParams> = TWidgetRenderState & {
    widgetParams: TWidgetParams;
};

declare type WidgetRenderStates = AnalyticsWidgetDescription['indexRenderState'] & PlacesWidgetDescription['indexRenderState'];

declare namespace widgets {
    export {
        analytics,
        breadcrumb,
        clearRefinements,
        configure,
        currentRefinements,
        answersWidget as EXPERIMENTAL_answers,
        configureRelatedItems as EXPERIMENTAL_configureRelatedItems,
        dynamicWidgets,
        EXPERIMENTAL_dynamicWidgets,
        geoSearch,
        hierarchicalMenu,
        hits,
        hitsPerPage,
        index,
        infiniteHits,
        menu,
        menuSelect,
        numericMenu,
        pagination,
        panel,
        placesWidget as places,
        poweredBy,
        queryRuleContext,
        queryRuleCustomData,
        rangeInput,
        rangeSlider,
        ratingMenu,
        refinementList,
        relevantSort,
        searchBox,
        sortBy,
        stats,
        toggleRefinement,
        voiceSearch
    }
}

declare type WidgetType<TWidgetDescription extends WidgetDescription> = TWidgetDescription extends RequiredKeys<WidgetDescription, '$$widgetType'> ? RequiredWidgetType<TWidgetDescription> : {
    /**
     * Identifier for widgets.
     */
    $$widgetType?: string;
};

declare type WidgetUiStates = PlacesWidgetDescription['indexUiState'];

declare type Write = ({ state, hits, }: {
    state: PlainSearchParameters;
    hits: InfiniteHitsCachedHits;
}) => void;

export { }

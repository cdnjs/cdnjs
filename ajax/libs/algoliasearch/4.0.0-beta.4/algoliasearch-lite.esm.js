import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { version, AuthMode } from '@algolia/client-common';
import { createSearchClient, multipleQueries, multipleSearchForFacetValues, initIndex, search, searchForFacetValues } from '@algolia/client-search';
import { LogLevelEnum } from '@algolia/logger-common';
import { createConsoleLogger } from '@algolia/logger-console';
import { createBrowserXhrRequester } from '@algolia/requester-browser-xhr';
import { createUserAgent } from '@algolia/transporter';

function algoliasearch(appId, apiKey, options = {}) {
    const logger = createConsoleLogger(options.logLevel || LogLevelEnum.Error);
    return createSearchClient({
        appId,
        apiKey,
        timeouts: {
            read: 1,
            write: 30,
        },
        requester: createBrowserXhrRequester(),
        logger,
        responsesCache: createInMemoryCache(),
        requestsCache: createInMemoryCache(),
        hostsCache: createBrowserLocalStorageCache(version, logger),
        userAgent: createUserAgent(version).add({
            segment: 'Browser',
            version: 'lite',
        }),
        authMode: AuthMode.WithinQueryParameters,
        methods: {
            search: multipleQueries,
            searchForFacetValues: multipleSearchForFacetValues,
            multipleQueries,
            multipleSearchForFacetValues,
            initIndex: base => (indexName) => {
                return initIndex(base)(indexName, {
                    methods: { search, searchForFacetValues },
                });
            },
        },
    });
}
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, functional/immutable-data
window.algoliasearch = algoliasearch;

export default algoliasearch;

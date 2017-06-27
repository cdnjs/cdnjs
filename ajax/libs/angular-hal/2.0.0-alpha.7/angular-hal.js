(function(
  angular
) {
  'use strict';

  // Add new module for utilities
  angular.module('angular-hal.utility', []);

})(
  angular
);

(function(
  module
) {
  'use strict';

  // Regirster NormalizeLinkFactory
  module.factory('$resolveUrl', ResolveUrlFactory);

  // Inject Dependencies
  ResolveUrlFactory.$inject = [];

  /**
   * Factory for Url Resolver
   */
  function ResolveUrlFactory() {
    return resolveUrl;

    /**
     * Resolve whole URL
     * 
     * @param {String} baseUrl
     * @param {String} path
     * @return {String}
     */
    function resolveUrl(baseUrl, path) {
      var resultHref = ''
        , reFullUrl = /^((?:\w+\:)?)((?:\/\/)?)([^\/]*)((?:\/.*)?)$/
        , baseHrefMatch = reFullUrl.exec(baseUrl)
        , hrefMatch = reFullUrl.exec(path);

      for (var partIndex = 1; partIndex < 5; partIndex++) {
        if (hrefMatch[partIndex]) {
          resultHref += hrefMatch[partIndex];
        } else {
          resultHref += baseHrefMatch[partIndex];
        }
      }

      return resultHref;
    }
  }
})(
  angular.module('angular-hal.utility')
);

(function(
  module,
  extend
) {
  'use strict';

  // Regirster NormalizeLinkFactory
  module.factory('$normalizeLink', NormalizeLinkFactory);

  // Inject Dependencies
  NormalizeLinkFactory.$inject = [
    '$resolveUrl',
  ];

  /**
   * Factory for Link Normalizer
   */
  function NormalizeLinkFactory($resolveUrl) {
    return normalizeLink;

    /**
     * @param {String} baseUrl
     * @param {mixed}  link
     * @return {Object}
     */
    function normalizeLink(baseUrl, link) {
      if (Array.isArray(link)) {
        return link.map(function (item) {
          return normalizeLink(baseUrl, item);
        });
      }
      if(typeof link === 'string') {
        return {
          href: $resolveUrl(baseUrl, link),
        };
      }
      if(typeof link.href === 'string') {
        link.href = $resolveUrl(baseUrl, link.href);
        return link;
      }
      if(Array.isArray(link.href)) {
        return link.href.map(function (href) {
          var newLink = extend({}, link, {
            href: href,
          });
          return normalizeLink(baseUrl, newLink);
        });
      }
      return {
        href: baseUrl,
      };
    }
  }
})(
  angular.module('angular-hal.utility'),
  angular.extend
);

(function(
  module
) {
  'use strict';

  // Regirster ExtendReadOnlyFactory
  module.factory('$extendReadOnly', ExtendReadOnlyFactory);

  // Inject Dependencies
  ExtendReadOnlyFactory.$inject = [];

  /**
   * Factory for Extend Read Only
   */
  function ExtendReadOnlyFactory() {
    return extendReadOnly;

    /**
     * Extend properties from copy read-only to target
     * @param {Object} target
     * @param {Object} copy
     */
    function extendReadOnly(target, copy) {
      for(var key in copy) {
        Object.defineProperty(target, key, {
          configurable: false,
          enumerable: false,
          value: copy[key],
        });
      }
    }
  }
})(
  angular.module('angular-hal.utility')
);

(function(
  module
) {
  'use strict';

  // Regirster DefineReadOnlyFactory
  module.factory('$defineReadOnly', DefineReadOnlyFactory);

  // Inject Dependencies
  DefineReadOnlyFactory.$inject = [];

  /**
   * Factory for Define Read Only
   */
  function DefineReadOnlyFactory() {
    return defineReadOnly;

    /**
     * Define read-only property in target
     * @param {Object} target
     * @param {String} key
     * @param {mixed}  value
     */
    function defineReadOnly(target, key, value) {
      Object.defineProperty(target, key, {
        configurable: false,
        enumerable: true,
        value: value,
        writable: true,
      });
    }
  }
})(
  angular.module('angular-hal.utility')
);

(function(
  angular
) {
  'use strict';

  // Add module for url generator
  angular.module('angular-hal.url-generator', []);

})(
  angular
);

(function(
  module
) {
  'use strict';

  // Regirster UrlGeneratorFactory
  module.factory('$generateUrl', UrlGeneratorFactory);

  // Inject Dependencies
  UrlGeneratorFactory.$inject = [
    '$window',
  ];

  /**
   * Factory for URL Generator
   */
  function UrlGeneratorFactory($window) {
    var rfc6570;

    /**
     * Initialize Everything
     */
    (function init() {
      rfc6570 = searchRfc6570();
    })();

    return generate;

    /**
     * Search for RFC6570
     */
    function searchRfc6570() {
      if(typeof $window.rfc6570 != 'undefined') {
        return $window.rfc6570;
      }
      
      if(!rfc6570 &&
        typeof require !== 'undefined') {
        return require('rfc6570/src/main');
      }

      throw new Error('Could not find rfc6570 library.');
    }

    /**
     * Generate url from template
     * 
     * @param  {String} template
     * @param  {Object} parameters
     * @return {String}
     */
    function generate(template, parameters) {
      return new rfc6570.UriTemplate(template).stringify(parameters);
    }
  }
})(
  angular.module('angular-hal.url-generator')
);

(function(
  angular
) {
  'use strict';

  // Add module for resource
  angular.module('angular-hal.resource', [
    'angular-hal.utility',
    'angular-hal.configuration',
	]);

})(
  angular
);

(function(
  module
) {
  'use strict';

  // Add factory for Resource
  module.factory('Resource', ResourceFactory);

  // Inject Dependencies
  ResourceFactory.$inject = [
    'HalResourceClient',
    '$generateUrl',
    '$extendReadOnly',
    '$defineReadOnly',
    '$normalizeLink',
    '$halConfiguration',
  ];

  /**
   * Factory for Resource
   * 
   * @param {Function} HalResourceClient
   * @param {Function} $generateUrl
   * @param {Function} $extendReadOnly
   * @param {Function} $defineReadOnly
   * @param {Function} $normalizeLink
   * @param {Object}   $halConfiguration
   */
  function ResourceFactory(
    HalResourceClient,
    $generateUrl,
    $extendReadOnly,
    $defineReadOnly,
    $normalizeLink,
    $halConfiguration
  ) {
    return Resource;

    /**
     * @param {Object} data
     * @param {Object} response
     */
    function Resource(data, response) {
      var self = this
        , links = {}
        , embedded = {}
        , client;

      /**
       * Initialize the Resource
       */
      (function init() {
        if(typeof data !== 'object' ||
          data === null) {
          data = {};
        }
        initializeData();
        initializeEmbedded();
        initializeLinks();
        inititalizeClient();

        $extendReadOnly(self, {
          $hasLink: $hasLink,
          $hasEmbedded: $hasEmbedded,
          $has: $has,
          $href: $href,
          $meta: $meta,
          $link: $link,
          $request: $request,
          $response: $response,
        });
      })();

      /**
       * Add all data from data to itself
       */
      function initializeData() {
        for(var propertyName in data) {
          if(!data.hasOwnProperty(propertyName)) {
            continue;
          }
          if(isMetaProperty(propertyName)) {
            continue;
          }
          $defineReadOnly(self, propertyName, data[propertyName]);
        }
      }

      /**
       * Normalize all Links
       */
      function initializeLinks() {
        if(typeof data[$halConfiguration.linksAttribute] !== 'object') {
          return;
        }

        Object
          .keys(data[$halConfiguration.linksAttribute])
          .forEach(function(rel) {
            var link = data[$halConfiguration.linksAttribute][rel];
            links[rel] = $normalizeLink(response.config.url, link);
          });
      }

      /**
       * Normalize Embedded Contents
       */
      function initializeEmbedded() {
        if(typeof data[$halConfiguration.embeddedAttribute] !== 'object') {
          return;
        }

        Object
          .keys(data[$halConfiguration.embeddedAttribute])
          .forEach(function(rel) {
            embedResource(rel, data[$halConfiguration.embeddedAttribute][rel]);
          });
      }

      /**
       * Initialize the HTTP CLIENT
       */
      function inititalizeClient() {
        client = new HalResourceClient(self, embedded);
      }

      /**
       * Embed a resource(s)
       * 
       * @param {String}          rel
       * @param {Object|Object[]} resources
       */
      function embedResource(rel, resources) {
        if (Array.isArray(resources)) {
          embedded[rel] = [];
          resources.forEach(function (resource) {
            embedded[rel].push(new Resource(resource, response));
          });
          return;
        }
        embedded[rel] = new Resource(resources, response);
      }

      /**
       * Determine if a property name is a meta property
       * @param {String} propertyName
       * @return {Boolean}
       */
      function isMetaProperty(propertyName) {
        for(var i = 0; i < $halConfiguration.ignoreAttributePrefixes.length; i++) {
          if(propertyName.substr(0, 1) === $halConfiguration.ignoreAttributePrefixes[i]) {
            return true;
          }
          if(propertyName === $halConfiguration.linksAttribute ||
            propertyName === $halConfiguration.embeddedAttribute) {
            return true;
          }
        }
        return false;
      }

      /**
       * @param {String} rel
       * @return {Boolean}
       */
      function $hasLink(rel) {
        return typeof links[rel] !== 'undefined';
      }

      /**
       * @param {String} rel
       * @return {Boolean}
       */
      function $hasEmbedded(rel) {
        return typeof embedded[rel] !== 'undefined';
      }

      /**
       * @param {String} rel
       * @return {Boolean}
       */
      function $has(rel) {
        return $hasLink(rel) || $hasEmbedded(rel);
      }

      /**
       * Get the href of a Link
       * 
       * @param {String} rel
       * @param {Object} parameters
       * @return {String}
       */
      function $href(rel, parameters) {
        if(!$hasLink(rel)) {
          throw new Error('link "' + rel + '" is undefined');
        }

        var link = links[rel]
          , href = link.href;

        if(Array.isArray(link)) {
          href = [];
          for(var i = 0; i < link.length; i++) {
            var subLink = link[i]
              , subHref = subLink.href;
            if(typeof subLink.templated !== 'undefined' &&
              subLink.templated) {
              subHref = $generateUrl(subLink.href, parameters);
            }
            subHref = $halConfiguration.urlTransformer(subHref);
            href.push(subHref);
          }
        } else {
          if(typeof link.templated !== 'undefined' &&
            link.templated) {
            href = $generateUrl(link.href, parameters);
          }

          href = $halConfiguration.urlTransformer(href);
        }

        return href;
      }

      /**
       * Get a link
       *
       * !! To get a href, use $href instead !!
       * 
       * @param {String} rel
       * @return {Object}
       */
      function $link(rel) {
        if(!$hasLink(rel)) {
          throw new Error('link "' + rel + '" is undefined');
        }
        var link = links[rel];
        return link;
      }

      /**
       * Get meta properties
       *
       * !! To get a href, use $href instead !!
       * !! To get a link, use $link instead !!
       * !! To get an embedded resource, use $request().$get(rel) instead !!
       * 
       * @param {String} rel
       * @return {Object}
       */
      function $meta(name) {
        for(var i = 0; i < $halConfiguration.ignoreAttributePrefixes.length; i++) {
          var fullName = $halConfiguration.ignoreAttributePrefixes[i] + name;
          return data[fullName];
        }
      }

      /**
       * Get the Original Response
       *
       * @return {Object)}
       */
      function $response() {
        return response;
      }

      /**
       * Get the client to perform requests
       *
       * @return {HalResourceClient)}
       */
      function $request() {
        return client;
      }
    }
  }
})(
  angular.module('angular-hal.resource')
);

(function(
  module,
  merge,
  extend
) {
  'use strict';

  // Add factory for HalResourceClient
  module.factory('HalResourceClient', HalResourceClientFactory);

  // Inject Dependencies
  HalResourceClientFactory.$inject = [
    '$q',
    '$extendReadOnly',
    '$injector',
    '$halConfiguration',
  ];

  /**
   * Factory for HalResourceClient
   * @param {Q}        $q
   * @param {Function} $extendReadOnly
   * @param {Injector} $injector Prevent Circular Dependency by injecting $injector instead of $http
   * @param {Object}   $halConfiguration
   */
  function HalResourceClientFactory($q, $extendReadOnly, $injector, $halConfiguration) {
    return HalResourceClient;

    /**
     * @param {Resource} resource
     * @param {Object}   links
     * @param {Object}   embedded
     */
    function HalResourceClient(resource, embedded) {
      var self = this
        , $http = $injector.get('$http');

      /**
       * Initialize the client
       */
      (function init() {
        $extendReadOnly(self, {
          $request: $request,
          $get: $get,
          $post: $post,
          $put: $put,
          $patch: $patch,
          $delete: $delete,
          $del: $delete,
          $link: $link,
          $unlink: $unlink,
        });
      })();

      /**
       * Execute a HTTP request against a link
       * 
       * @param {String}      method
       * @param {String}      rel
       * @param {Object|null} urlParams
       * @param {mixed|null}  body
       * @param {Object}      options
       * @return {Promise}
       */
      function $request(method, rel, urlParams, body, options) {
        var promises;

        method = method || 'GET';
        rel = rel || $halConfiguration.selfLink;
        urlParams = urlParams || {};
        body = body || null;
        options = options || {};

        if(method === 'GET' &&
            rel === $halConfiguration.selfLink) {
          return $q.resolve(resource);
        }

        if(resource.$hasEmbedded(rel) &&
          Array.isArray(embedded[rel])) {
          promises = [];
          for(var i = 0; i < embedded[rel].length; i++) {
            promises.push(embedded[rel][i].$request().$request(method, 'self', urlParams, body, options));
          }
          return $q.all(promises);
        }

        if(resource.$hasEmbedded(rel)) {
          return embedded[rel].$request().$request(method, 'self', urlParams, body, options);
        }

        if(resource.$hasLink(rel)) {
          var url = resource.$href(rel, urlParams);

          extend(options, {
            method: method,
            data: body,
          });

          if(Array.isArray(url)) {
            promises = [];
            for(var j = 0; j < url.length; j++) {
              promises.push($http(merge(options, {url: url[j]})));
            }
            return $q.all(promises);
          }

          return $http(merge(options, {
            url: resource.$href(rel, urlParams),
          }));
        }

        return $q.reject(new Error('link "' + rel + '" is undefined'));
      }

      /**
       * Execute a HTTP GET request against a link or
       * load an embedded resource
       * 
       * @param {String}      rel
       * @param {Object|null} urlParams
       * @param {Object}      options
       * @return {Promise}
       */
      function $get(rel, urlParams, options) {
        return $request('GET', rel, urlParams, undefined, options);
      }

      /**
       * Execute a HTTP POST request against a link
       * 
       * @param {String}      rel
       * @param {Object|null} urlParams
       * @param {mixed|null}  body
       * @param {Object}      options
       * @return {Promise}
       */
      function $post(rel, urlParams, body, options) {
        return $request('POST', rel, urlParams, body, options);
      }

      /**
       * Execute a HTTP PUT request against a link
       * 
       * @param {String}      rel
       * @param {Object|null} urlParams
       * @param {mixed|null}  body
       * @param {Object}      options
       * @return {Promise}
       */
      function $put(rel, urlParams, body, options) {
        return $request('PUT', rel, urlParams, body, options);
      }

      /**
       * Execute a HTTP PATCH request against a link
       * 
       * @param {String}      rel
       * @param {Object|null} urlParams
       * @param {mixed|null}  body
       * @param {Object}      options
       * @return {Promise}
       */
      function $patch(rel, urlParams, body, options) {
        return $request('PATCH', rel, urlParams, body, options);
      }

      /**
       * Execute a HTTP DELEET request against a link
       * 
       * @param {String}      rel
       * @param {Object|null} urlParams
       * @param {Object}      options
       * @return {Promise}
       */
      function $delete(rel, urlParams, options) {
        return $request('DELETE', rel, urlParams, undefined, options);
      }

      /**
       * Execute a HTTP LINK request against a link
       * 
       * @param {String}       rel
       * @param {Object|null}  urlParams
       * @param {LinkHeader[]} body
       * @param {Object}       options
       * @return {Promise}
       */
      function $link(rel, urlParams, links, options) {
        options = options || {};
        options.headers = options.headers || {};
        options.headers.Link = links.map(toStringItem);
        return $request('LINK', rel, urlParams, undefined, options);
      }

      /**
       * Execute a HTTP UNLINK request against a link
       * 
       * @param {String}       rel
       * @param {Object|null}  urlParams
       * @param {LinkHeader[]} body
       * @param {Object}       options
       * @return {Promise}
       */
      function $unlink(rel, urlParams, links, options) {
        options = options || {};
        options.headers = options.headers || {};
        options.headers.Link = links.map(toStringItem);
        return $request('UNLINK', rel, urlParams, undefined, options);
      }

      /**
       * @param {mixed} item
       * @return {String}
       */
      function toStringItem(item) {
        return item.toString();
      }
    }
  }
})(
  angular.module('angular-hal.resource'),
  angular.merge,
  angular.extend
);

(function(
  angular
) {
  'use strict';

  // Add module for http interception
  angular.module('angular-hal.http-interception', [
    'angular-hal.resource',
    'angular-hal.configuration',
    'angular-hal.content-type',
  ]);

})(
  angular
);

(function(
  module
) {
  'use strict';

  // Add factory for $transformResponseToResource
  module.factory('$transformResponseToResource', ResponseToResourceTransformerFactory);

  // Inject Dependencies
  ResponseToResourceTransformerFactory.$inject = [
    'Resource',
  ];

  /**
   * @param {Function} Resource
   */
  function ResponseToResourceTransformerFactory(Resource) {
    return transform;

    /**
     * @param {Response}
     * @return {Resource}
     */
    function transform(response) {
      return new Resource(response.data, response);
    }
  }
})(
  angular.module('angular-hal.http-interception')
);

(function(
  module
) {
  'use strict';

  // Add Factory for ResourceHttpInterceptorFactory
  module.factory('ResourceHttpInterceptor', ResourceHttpInterceptorFactory);

  // Inject Dependencies
  ResourceHttpInterceptorFactory.$inject = [
    '$transformResponseToResource',
    '$halConfiguration',
	'$contentType'
  ];

  /**
   * @param {Function} $transformResponseToResource
   * @return {Object}
   */
  function ResourceHttpInterceptorFactory($transformResponseToResource, $halConfiguration, $contentType) {
    var CONTENT_TYPE = 'application/hal+json';

    return {
      request: transformRequest,
      response: transformResponse,
    };

    /**
     * Add Hal Json As an accepted format
     * @param {Request} request
     * @return {Request}
     */
    function transformRequest(request) {
      if(typeof request.headers.Accept === 'undefined') {
        request.headers.Accept = CONTENT_TYPE;
      } else {
        request.headers.Accept = [
          CONTENT_TYPE,
          request.headers.Accept
        ].join(', ');
      }

      return request;
    }

    /**
     * Transform Response
     *
     * @param {Response} response
     * @return {Response|Resource}
     */
    function transformResponse(response) {
      if($contentType.match(response.headers('Content-Type'), CONTENT_TYPE)) {
        return $transformResponseToResource(response);
      }
      if(response.config.forceHal) {
        return $transformResponseToResource(response);
      }
      if((
          response.headers('Content-Type') === 'application/json' ||
          response.headers('Content-Type') === null
        ) &&
        $halConfiguration.forceJSONResource) {
        return $transformResponseToResource(response);
      }

      return response;
    }
  }
})(
  angular.module('angular-hal.http-interception')
);

(function(
  module
) {
  'use strict';

  // Configure Http Interception
  module.config(HttpInterceptorConfiguration);

  // Inject Dependencies
  HttpInterceptorConfiguration.$inject = [
    '$httpProvider',
  ];

  /**
   * @param {HttpProvider} $httpProvider
   */
  function HttpInterceptorConfiguration($httpProvider) {
    $httpProvider.interceptors.push('ResourceHttpInterceptor');
  }

})(
  angular.module('angular-hal.http-interception')
);

(function(
  angular
) {
  'use strict';

  // Add module for content type checker
  angular.module('angular-hal.content-type', []);

})(
  angular
);

(function (module) {
	'use strict';

	// Regirster ContentType
	module.service('$contentType', ContentType);

	// Inject Dependencies
	ContentType.$inject = ['$window'];

	/**
	 * Factory for Content-Type parser
	 */
	function ContentType($window) {
		var self = this
			, contentTypeLibrary;

		/**
		 * Initialize Everything
		 */
		(function init() {
			contentTypeLibrary = searchContentType();
			self.match = match;
		})();

		/**
		 * Search for content-type lib
		 */
		function searchContentType() {
			if (typeof $window.contentType !== 'undefined') {
				return $window.contentType;
			}

			if (typeof require !== 'undefined') {
				return require('content-type');
			}

			throw new Error('Could not find content-type library.');
		}

		/**
		 * Check content-type matching
		 *
		 * @param  {String} contentType
		 * @param  {String} type
		 * @return {Boolean}
		 */
		function match(contentType, type) {
			if(typeof contentType !== 'string') {
				return false;
			}
			return contentTypeLibrary.parse(contentType).type === type;
		}
	}
})(angular.module('angular-hal.content-type'));

(function(
  angular
) {
  'use strict';

  // Add module for configuration
  angular.module('angular-hal.configuration', []);

})(
  angular
);

(function(
  module
) {
  'use strict';

  // Add Factory for ResourceHttpInterceptorFactory
  module.provider('$halConfiguration', HalConfigurationProvider);

  // Inject Dependencies
  HalConfigurationProvider.$inject = [];

  /**
   * @return {Object}
   */
  function HalConfigurationProvider() {
    var linksAttribute = '_links'
      , embeddedAttribute = '_embedded'
      , ignoreAttributePrefixes = [
          '_',
          '$',
        ]
      , selfLink = 'self'
      , forceJSONResource = false
      , urlTransformer = noopUrlTransformer;

    // Inject Dependencies
    $get.$inject = [
      '$log',
    ];

    return {
      setLinksAttribute: setLinksAttribute,
      setEmbeddedAttribute: setEmbeddedAttribute,
      setIgnoreAttributePrefixes: setIgnoreAttributePrefixes,
      addIgnoreAttributePrefix: addIgnoreAttributePrefix,
      setSelfLink: setSelfLink,
      setForceJSONResource: setForceJSONResource,
      setUrlTransformer: setUrlTransformer,
      $get: $get,
    };

    /**
     * @param {String} newLinksAttribute
     */
    function setLinksAttribute(newLinksAttribute) {
      linksAttribute = newLinksAttribute;
    }

    /**
     * @param {String} newEmbeddedAttribute
     */
    function setEmbeddedAttribute(newEmbeddedAttribute) {
      embeddedAttribute = newEmbeddedAttribute;
    }

    /**
     * @param {String[]} newIgnoreAttributePrefixes
     */
    function setIgnoreAttributePrefixes(newIgnoreAttributePrefixes) {
      ignoreAttributePrefixes = newIgnoreAttributePrefixes;
    }

    /**
     * @param {String} ignoreAttributePrefix
     */
    function addIgnoreAttributePrefix(ignoreAttributePrefix) {
      ignoreAttributePrefixes.push(ignoreAttributePrefix);
    }

    /**
     * @param {String} newSelfLink
     */
    function setSelfLink(newSelfLink) {
      selfLink = newSelfLink;
    }

    /**
     * @param {Boolean} newForceJSONResource
     */
    function setForceJSONResource(newForceJSONResource) {
      forceJSONResource = newForceJSONResource;
    }

    /**
     * @param {Function}
     * @deprecated $halConfigurationProvider.setUrlTransformer is deprecated. Please write a http interceptor instead.
     * @see https://docs.angularjs.org/api/ng/service/$http#interceptors
     */
    function setUrlTransformer(newUrlTransformer) {
      urlTransformer = newUrlTransformer;
    }

    /**
     * @param {String}
     * @return {String}
     */
    function noopUrlTransformer(url) {
      return url;
    }

    /**
     * @return {Object}
     */
    function $get($log) {
      if(urlTransformer !== noopUrlTransformer) {
        $log.log('$halConfigurationProvider.setUrlTransformer is deprecated. Please write a http interceptor instead.');
      }

      return Object.freeze({
        linksAttribute: linksAttribute,
        embeddedAttribute: embeddedAttribute,
        ignoreAttributePrefixes: ignoreAttributePrefixes,
        selfLink: selfLink,
        forceJSONResource: forceJSONResource,
        urlTransformer: urlTransformer,
      });
    }
  }
})(
  angular.module('angular-hal.configuration')
);

(function(
  angular
) {
  'use strict';

  // Add module for client
  angular.module('angular-hal.client', [
    'angular-hal.utility',
  ]);

})(
  angular
);

(function(
  module,
  merge,
  forEach
) {
  'use strict';

  // Add factory for LinkHeader
  module.factory('LinkHeader', LinkHeaderFactory);

  // Inject Dependencies
  LinkHeaderFactory.$inject = [];

  /**
   * Factory for LinkHeader
   */
  function LinkHeaderFactory() {
    return LinkHeader;

    /**
     * Link Header
     *
     * @param {String} uriReference The Link Value
     * @param {Object} linkParams   The Link Params
     * @constructor
     */
    function LinkHeader(uriReference, linkParams) {
      var self = this;

      /**
       * Initialize the LinkHeader
       *
       * @return void
       */
      (function init() {
        merge(self, {
          uriReference: uriReference,
          linkParams: angular.merge(
            {
              rel: null,
              anchor: null,
              rev: null,
              hreflang: null,
              media: null,
              title: null,
              type: null,
            },
            linkParams
          ),
        });
      })();

      /**
       * Convert LinkHeader to String
       *
       * @return {String}
       */
      self.toString = function toString() {
        var result = '<' + self.uriReference + '>'
          , params = [];

        forEach(
          self.linkParams,
          function(paramValue, paramName) {
            if(paramValue) {
              params.push(paramName + '="' + paramValue + '"');
            }
          }
        );

        if(params.length < 1) {
          return result;
        }

        result = result + ';' + params.join(';');

        return result;
      };

      return this;
    }
  }
})(
  angular.module('angular-hal.client'),
  angular.merge,
  angular.forEach
);

(function(
  module,
  extend,
  merge
) {
  'use strict';

  // Add halCLient service
  module.service('halClient', HalClientService);
  module.service('$halClient', HalClientService);

  // Inject Dependencies
  HalClientService.$inject = [
    '$log',
    '$http',
    'LinkHeader',
    '$halConfiguration',
  ];

  /**
   * @param {Log}      $log
   * @param {Http}     $http
   * @param {Function} LinkHeader
   * @param {Object}   $halConfiguration
   * @deprecated The halClient service is deprecated. Please use $http directly instead.
   */
  function HalClientService($log, $http, LinkHeader, $halConfiguration) {
    var self = this;

    /**
     * @return Initialize halClient
     */
     (function init() {
        extend(self, {
          $get: $get,
          $post: $post,
          $put: $put,
          $patch: $patch,
          $delete: $delete,
          $del: $delete,
          $link: $link,
          $unlink: $unlink,
          LinkHeader: LinkHeader,
        });
     })();

    /* @ngNoInject */
    function $get(href, options) {
      return $request('GET', href, options);
    }

    function $post(href, options, data) {
      return $request('POST', href, options, data);
    }

    function $put(href, options, data) {
      return $request('PUT', href, options, data);
    }

    function $patch(href, options, data) {
      return $request('PATCH', href, options, data);
    }

    function $delete(href, options) {
      return $request('DELETE', href, options);
    }

    function $link(href, options, linkHeaders) {
      options = options || {};
      options.headers = options.headers || {};
      options.headers.Link = linkHeaders.map(function(link) { return link.toString(); });
      return $request('LINK', href, options);
    }

    function $unlink(href, options, linkHeaders) {
      options = options || {};
      options.headers = options.headers || {};
      options.headers.Link = linkHeaders.map(function(link) { return link.toString(); });
      return $request('UNLINK', href, options);
    }

    function $request(method, href, options, data) {
      options = options || {};
      $log.log('The halClient service is deprecated. Please use $http directly instead.');
      return $http(merge(options, {
        method: method,
        url: $halConfiguration.urlTransformer(href),
        data: data,
      }));
    }
  }
})(
  angular.module('angular-hal.client'),
  angular.extend,
  angular.merge
);

(function(
  angular
) {
  'use strict';

  // Combine needed Modules
  angular.module('angular-hal', [
    'angular-hal.url-generator',
    'angular-hal.content-type',
    'angular-hal.http-interception',
    'angular-hal.client',
    'ng',
  ]);

})(
  angular
);

//# sourceMappingURL=angular-hal.js.map

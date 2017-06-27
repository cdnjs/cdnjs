/* global angular */

angular.module('angular-hal', [])

.service('halClient', [
    '$http', '$q', '$window',
    function (
        $http, $q, $window
    ) {
        var rfc6570 = $window.rfc6570;

        /* @ngNoInject */
        this.$get = function (href, options) {
            return callService('GET', href, options);
        }; //get

        this.$post = function (href, options, data) {
            return callService('POST', href, options, data);
        }; //post

        this.$put = function (href, options, data) {
            return callService('PUT', href, options, data);
        }; //put

        this.$patch = function (href, options, data) {
            return callService('PATCH', href, options, data);
        }; //patch

        this.$del = function (href, options) {
            return callService('DELETE', href, options);
        }; //del

        this.$link = function (href, options, linkHeaders) {
            return callService('LINK', href, options, linkHeaders);
        }; // link

        this.$unlink = function (href, options, linkHeaders) {
            return callService('UNLINK', href, options, linkHeaders);
        }; // unlink

        this.LinkHeader = LinkHeader;

        function Resource(href, options, data, response) {
            var linksAttribute = options.linksAttribute || '_links';
            var embeddedAttribute = options.embeddedAttribute || '_embedded';
            var ignoreAttributePrefixes = options.ignoreAttributePrefixes || ['_', '$'];
            var links = {};
            var embedded = {};

            href = getSelfLink(href, data).href;

            defineHiddenProperty(this, '$links', function(rel) {
                if(!this.$has(rel)) {
                    return null;
                }

                return links[rel];
            });

            defineHiddenProperty(this, '$href', function (rel, params) {
                if (!this.$has(rel)) {
                    return null;
                }

                return hrefLink(links[rel], params);
            });
            /**
             * Fetch Meta Contents
             * @param  {String} name the meta key name without the _ in front
             * @return {mixed} the meta content
             */
            defineHiddenProperty(this, '$meta', function $meta(name) {
                for(var i = 0; i < ignoreAttributePrefixes.length; i++) {
                    var fullName = ignoreAttributePrefixes[i] + name;

                    if(
                        embeddedAttribute !== fullName &&
                        linksAttribute !== fullName &&
                        data.hasOwnProperty(fullName)
                    ) {
                        return data[fullName];
                    }
                }

                return null;
            });
            defineHiddenProperty(this, '$has', function (rel) {
                return rel in links;
            });
            defineHiddenProperty(this, '$get', function (rel, params, options) {
                if(!this.$has(rel)) {
                    return missingLink(rel);
                }

                var link = links[rel];
                return callLink('GET', link, params, undefined, options);
            });
            defineHiddenProperty(this, '$post', function (rel, params, data, options) {
                if(!this.$has(rel)) {
                    return missingLink(rel);
                }

                var link = links[rel];
                return callLink('POST', link, params, data, options);
            });
            defineHiddenProperty(this, '$put', function (rel, params, data, options) {
                if(!this.$has(rel)) {
                    return missingLink(rel);
                }

                var link = links[rel];
                return callLink('PUT', link, params, data, options);
            });
            defineHiddenProperty(this, '$patch', function (rel, params, data, options) {
                if(!this.$has(rel)) {
                    return missingLink(rel);
                }

                var link = links[rel];
                return callLink('PATCH', link, params, data, options);
            });
            defineHiddenProperty(this, '$del', function (rel, params, options) {
                if(!this.$has(rel)) {
                    return missingLink(rel);
                }

                var link = links[rel];
                return callLink('DELETE', link, params, undefined, options);
            });
            defineHiddenProperty(this, '$response', function () {
                return response;
            });
            defineHiddenProperty(this, '$link', function (rel, params, linkHeaders, options) {
                var link = links[rel];
                return callLink('LINK', link, params, linkHeaders, options);
            });
            defineHiddenProperty(this, '$unlink', function (rel, params, linkHeaders, options) {
                var link = links[rel];
                return callLink('UNLINK', link, params, linkHeaders, options);
            });


            Object.keys(data)
                .filter(function (key) {
                    return key !== linksAttribute && key !== embeddedAttribute && (!~ignoreAttributePrefixes.indexOf(key[0]));
                })
                .forEach(function (key) {
                    Object.defineProperty(this, key, {
                        configurable: false,
                        enumerable: true,
                        value: data[key],
                        writable: true
                    });
                }, this);


            if (data[linksAttribute]) {
                Object
                    .keys(data[linksAttribute])
                    .forEach(function (rel) {
                        var link = data[linksAttribute][rel];
                        link = normalizeLink(href, link);
                        links[rel] = link;
                    }, this);
            }

            if (data[embeddedAttribute]) {
                Object
                    .keys(data[embeddedAttribute])
                    .forEach(function (rel) {
                        var embedded = data[embeddedAttribute][rel];
                        var link = getSelfLink(href, embedded);
                        links[rel] = link;
                        //console.log(link)

                        var resource = createResource(href, options, embedded, response);

                        embedResource(resource);

                    }, this);
            }

            /**
             * Return Missing Link Promise
             * @param  {String} rel Missing rel name
             * @return {Promise}
             */
            function missingLink(rel) {
                return $q(function(undefined, reject) {
                    reject(new Error('link "' + rel + '" is undefined'));
                });
            }

            function defineHiddenProperty(target, name, value) {
                Object.defineProperty(target, name, {
                    configurable: false,
                    enumerable: false,
                    value: value
                });
            } //defineHiddenProperty


            function embedResource(resource) {
                if (Array.isArray(resource)) return resource.map(function (resource) {
                    return embedResource(resource);
                });

                var href = resource.$href('self');

                embedded[href] = $q.when(resource);
            } //embedResource

            function hrefLink(link, params) {
                var href = link.templated ? new rfc6570.UriTemplate(link.href).stringify(params) : link.href;

                return href;
            } //hrefLink

            function callLink(method, link, params, data, extraOptions) {
                var linkHref;

                if (Array.isArray(link)) {
                    return $q.all(link.map(function (link) {
                        if (method !== 'GET') throw 'method is not supported for arrays';

                        return callLink(method, link, params, data, extraOptions);
                    }));
                }

                linkHref = hrefLink(link, params);

                var callOptions = angular.extend({}, options, extraOptions);

                if (method === 'GET') {
                    if (linkHref in embedded) return embedded[linkHref];

                    return callService(method, linkHref, callOptions, data);
                } else {
                    return callService(method, linkHref, callOptions, data);
                }

            } //callLink

            function getSelfLink(baseHref, resource) {

                if (Array.isArray(resource)) return resource.map(function (resource) {
                    return getSelfLink(baseHref, resource);
                });

                return normalizeLink(baseHref, resource && resource[linksAttribute] && resource[linksAttribute].self);
            } //getSelfLink

        } //Resource


        function createResource(href, options, data, response) {
            if (Array.isArray(data)) return data.map(function (data) {
                return createResource(href, options, data, response);
            });

            var resource = new Resource(href, options, data, response);

            return resource;

        } //createResource


        function normalizeLink(baseHref, link) {
            if (Array.isArray(link)) return link.map(function (link) {
                return normalizeLink(baseHref, link);
            });

            if (link) {
                if (typeof link === 'string') link = {
                    href: link
                };
                link.href = resolveUrl(baseHref, link.href);
            } else {
                link = {
                    href: baseHref
                };
            }

            return link;
        } //normalizeLink


        function callService(method, href, options, data) {
            if (!options) options = {};
            if (!options.headers) options.headers = {};
            if (!options.headers['Content-Type']) options.headers['Content-Type'] = 'application/json';
            if (!options.headers.Accept) options.headers.Accept = 'application/hal+json,application/json';

            if(method === 'LINK' || method === 'UNLINK') {
                options.headers.Link = [];
                angular.forEach(data, function(link) {
                    options.headers.Link.push(link.toString());
                });
            }

            var config = {
                 method: method,
                 url: options.transformUrl ? options.transformUrl(href) : href,
                 headers: options.headers,
                 data: data
            };
            if (options.httpConfig) {
              config = angular.extend(config, options.httpConfig);
            }

            var resource = (
                $http(config)
                .then(function (res) {

                    switch (Math.floor(res.status / 100)) {
                    case 2:
                        if (res.data) {
                            if (res.data) return createResource(href, options, res.data, res);
                        }
                        if (res.headers('Content-Location')) return res.headers('Content-Location');
                        if (res.headers('Location')) return res.headers('Location');
                        return null;

                    default:
                        return $q.reject(res.status);
                    }

                })
            );

            return resource;
        } //callService


        function resolveUrl(baseHref, href) {
            var resultHref = '';
            var reFullUrl = /^((?:\w+\:)?)((?:\/\/)?)([^\/]*)((?:\/.*)?)$/;
            var baseHrefMatch = reFullUrl.exec(baseHref);
            var hrefMatch = reFullUrl.exec(href);

            for (var partIndex = 1; partIndex < 5; partIndex++) {
                if (hrefMatch[partIndex]) resultHref += hrefMatch[partIndex];
                else resultHref += baseHrefMatch[partIndex];
            }

            return resultHref;
        } //resolveUrl

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
                angular.merge(self, {
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
                var result = '<' + self.uriReference + '>',
                    params = [];

                angular.forEach(
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

]); //service

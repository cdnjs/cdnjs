/* global angular */

angular.module('angular-hal', [])

.service('halClient', [
    '$http', '$q', '$window',
    function (
        $http, $q, $window
    ) {
        var rfc6570 = $window.rfc6570;

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


        function Resource(href, options, data, response) {
            var linksAttribute = options.linksAttribute || '_links';
            var embeddedAttribute = options.embeddedAttribute || '_embedded';
            var ignoreAttributePrefixes = options.ignoreAttributePrefixes || ['_', '$'];
            var links = {};
            var embedded = {};

            href = getSelfLink(href, data).href;

            defineHiddenProperty(this, '$href', function (rel, params) {
                if (!(rel in links)) return null;

                return hrefLink(links[rel], params);
            });
            defineHiddenProperty(this, '$has', function (rel) {
                return rel in links;
            });
            defineHiddenProperty(this, '$get', function (rel, params, options) {
                var link = links[rel];
                return callLink('GET', link, params, options);
            });
            defineHiddenProperty(this, '$post', function (rel, params, data, options) {
                var link = links[rel];
                return callLink('POST', link, params, data, options);
            });
            defineHiddenProperty(this, '$put', function (rel, params, data, options) {
                var link = links[rel];
                return callLink('PUT', link, params, data, options);
            });
            defineHiddenProperty(this, '$patch', function (rel, params, data, options) {
                var link = links[rel];
                return callLink('PATCH', link, params, data, options);
            });
            defineHiddenProperty(this, '$del', function (rel, params, options) {
                var link = links[rel];
                return callLink('DELETE', link, params, options);
            });
            defineHiddenProperty(this, '$response', function () {
                return response;
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

                        return callLink(method, link, params, data);
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

    }

]); //service

/**
 * @ngdoc service
 * @name ngMeta.ngMeta
 * @description
 * # A metatags service for single-page applications
 * that supports setting title, description, open-graph and twitter card meta tags
 */
angular.module('ngMeta', [])
    .provider('ngMeta', function () {

        'use strict';

        var defaults = {
            title: '',
            titleSuffix: '',
            description: '',
            ogImgUrl: '',
            ogTitle: '',
            twCard: ''
        };

        var config = {
            name: 'ngMeta',
            useTitleSuffix: false,
            ogType: 'website',
            ogSiteName: '',
            ogLocale: 'en_US',
        };

        //Constructor
        function Meta($rootScope) {

            var setTitle = function (title, titleSuffix) {
                $rootScope[config.name].title = title || defaults.title;
                if (config.useTitleSuffix) {
                    $rootScope[config.name].title += titleSuffix || defaults.titleSuffix;
                }
            };

            var setDescription = function (description) {
                $rootScope[config.name].description = description || defaults.description;
            };

            var setOgImgUrl = function (ogImgUrl) {
                $rootScope[config.name].ogImgUrl = ogImgUrl || defaults.ogImgUrl;
            };

            var readRouteMeta = function (meta) {
                meta = meta || {};
                setTitle(meta.title, meta.titleSuffix);
                setDescription(meta.description);
                setOgImgUrl(meta.ogImgUrl);
            };

            var update = function (event, current) {
                readRouteMeta(current.meta);
            };

            $rootScope[config.name] = {};
            $rootScope[config.name].ogType = config.ogType;
            $rootScope[config.name].ogSiteName = config.ogSiteName;
            $rootScope[config.name].ogLocale = config.ogLocale;
            $rootScope.$on('$routeChangeSuccess', update);
            $rootScope.$on('$stateChangeSuccess', update);

            return {
                'setTitle': setTitle,
                'setDescription': setDescription,
                'setOgImgUrl': setOgImgUrl
            };
        }

        /* Set defaults */

        this.setDefaultTitle = function (titleStr) {
            defaults.title = titleStr;
        };

        this.setDefaultTitleSuffix = function (titleSuffix) {
            defaults.titleSuffix = titleSuffix;
        };

        this.setDefaultDescription = function (desc) {
            defaults.description = desc;
        };

        this.setDefaultOgImgUrl = function (imgUrl) {
            defaults.ogImgUrl = imgUrl;
        };

        /* One-time config */

        this.setName = function (varName) {
            config.name = varName;
        };

        this.useTitleSuffix = function (bool) {
            config.useTitleSuffix = !!bool;
        };

        this.setOgType = function (type) {
            config.ogType = type;
        };

        this.setOgSiteName = function (siteName) {
            config.ogSiteName = siteName;
        };

        this.setOgLocale = function (locale) {
            config.ogLocale = locale;
        };

        // Method for instantiating
        this.$get = ["$rootScope", function ($rootScope) {
            return new Meta($rootScope);
        }];
    });
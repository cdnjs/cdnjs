/*! angular-deckgrid (v0.5.0) - Copyright: 2013 - 2014, André König (andre.koenig@posteo.de) - MIT */
/*
 * angular-deckgrid
 *
 * Copyright(c) 2013-2014 André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König (andre.koenig@posteo.de)
 *
 */

angular.module('akoenig.deckgrid', []);

angular.module('akoenig.deckgrid').directive('deckgrid', [

    'DeckgridDescriptor',

    function initialize (DeckgridDescriptor) {

        'use strict';

        return DeckgridDescriptor.create();
    }
]);
/*
 * angular-deckgrid
 *
 * Copyright(c) 2013-2014 André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König (andre.koenig@posteo.de)
 *
 */

angular.module('akoenig.deckgrid').factory('DeckgridDescriptor', [

    'Deckgrid',
    '$templateCache',

    function initialize (Deckgrid, $templateCache) {

        'use strict';

        /**
         * This is a wrapper around the AngularJS
         * directive description object.
         *
         */
        function Descriptor () {
            this.restrict = 'AE';

            this.template = '<div data-ng-repeat="column in columns" class="{{layout.classList}}">' +
                                '<div data-ng-repeat="card in column" data-ng-include="cardTemplate"></div>' +
                            '</div>';

            this.scope = {
                'model': '=source'
            };

            //
            // Will be created in the linking function.
            //
            this.$$deckgrid = null;

            this.transclude = true;
            this.link = this.$$link.bind(this);

            //
            // Will be incremented if using inline templates.
            //
            this.$$templateKeyIndex = 0;

        }

        /**
         * @private
         *
         * Cleanup method. Will be called when the
         * deckgrid directive should be destroyed.
         *
         */
        Descriptor.prototype.$$destroy = function $$destroy () {
            this.$$deckgrid.destroy();
        };

        /**
         * @private
         *
         * The deckgrid link method. Will instantiate the deckgrid.
         *
         */
        Descriptor.prototype.$$link = function $$link (scope, elem, attrs, nullController, transclude) {
            var templateKey = 'deckgrid/innerHtmlTemplate' + (++this.$$templateKeyIndex) + '.html';

            scope.$on('$destroy', this.$$destroy.bind(this));

            if (angular.isUndefined(attrs.cardtemplate)) {
                if (angular.isUndefined(attrs.cardtemplatestring)) {
                    // use the provided inner html as template
                    transclude(scope, function onTransclude (innerHTML) {
                        var extractedInnerHTML = [],
                            i = 0,
                            len = innerHTML.length,
                            outerHTML;

                        for (i; i < len; i = i + 1) {
                            outerHTML = innerHTML[i].outerHTML;

                            if (angular.isDefined(outerHTML)) {
                                extractedInnerHTML.push(outerHTML);
                            }
                        }

                        $templateCache.put(templateKey, extractedInnerHTML.join());
                    });
                } else {
                    // use the provided template string
                    //
                    // note: the attr is accessed via the elem object, as the attrs content
                    // is already compiled and thus lacks the {{...}} expressions
                    $templateCache.put(templateKey, elem.attr('cardtemplatestring'));
                }

                scope.cardTemplate = templateKey;
            } else {
                // use the provided template file
                scope.cardTemplate = attrs.cardtemplate;
            }

            scope.mother = scope.$parent;

            this.$$deckgrid = Deckgrid.create(scope, elem[0]);
        };

        return {
            create : function create () {
                return new Descriptor();
            }
        };
    }
]);

/*
 * angular-deckgrid
 *
 * Copyright(c) 2013-2014 André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König (andre.koenig@posteo.de)
 *
 */

angular.module('akoenig.deckgrid').factory('Deckgrid', [

    '$window',
    '$log',

    function initialize ($window, $log) {

        'use strict';

        /**
         * The deckgrid directive.
         *
         */
        function Deckgrid (scope, element) {
            var self = this,
                watcher,
                mql;

            this.$$elem = element;
            this.$$watchers = [];

            this.$$scope = scope;
            this.$$scope.columns = [];

            //
            // The layout configuration will be parsed from
            // the pseudo "before element." There you have to save all
            // the column configurations.
            //
            this.$$scope.layout = this.$$getLayout();

            this.$$createColumns();

            //
            // Register model change.
            //
            watcher = this.$$scope.$watchCollection('model', this.$$onModelChange.bind(this));

            this.$$watchers.push(watcher);

            //
            // Register media query change events.
            //
            angular.forEach(self.$$getMediaQueries(), function onIteration (rule) {
                var handler = self.$$onMediaQueryChange.bind(self);

                function onDestroy () {
                    rule.removeListener(handler);
                }

                rule.addListener(handler);

                self.$$watchers.push(onDestroy);
            });
            
            mql = $window.matchMedia('(orientation: portrait)');
            mql.addListener(self.$$onMediaQueryChange.bind(self));

        }

        /**
         * @private
         *
         * Extracts the media queries out of the stylesheets.
         *
         * This method will fetch the media queries out of the stylesheets that are
         * responsible for styling the angular-deckgrid.
         *
         * @return {array} An array with all respective styles.
         *
         */
        Deckgrid.prototype.$$getMediaQueries = function $$getMediaQueries () {
            var stylesheets = [],
                mediaQueries = [];

            stylesheets = Array.prototype.concat.call(
                Array.prototype.slice.call(document.querySelectorAll('style[type=\'text/css\']')),
                Array.prototype.slice.call(document.querySelectorAll('link[rel=\'stylesheet\']'))
            );

            function extractRules (stylesheet) {
                try {
                    return (stylesheet.sheet.cssRules || []);
                } catch (e) {
                    return [];
                }
            }

            function hasDeckgridStyles (rule) {
                var regexe   = /\[(\w*-)?deckgrid\]::?before/g,
                    i        = 0,
                    selector = '';

                if (!rule.media || angular.isUndefined(rule.cssRules)) {
                    return false;
                }

                i = rule.cssRules.length - 1;

                for (i; i >= 0; i = i - 1) {
                    selector = rule.cssRules[i].selectorText;

                    if (angular.isDefined(selector) && selector.match(regexe)) {
                        return true;
                    }
                }

                return false;
            }

            angular.forEach(stylesheets, function onIteration (stylesheet) {
                var rules = extractRules(stylesheet);

                angular.forEach(rules, function inRuleIteration (rule) {
                    if (hasDeckgridStyles(rule)) {
                        mediaQueries.push($window.matchMedia(rule.media.mediaText));
                    }
                });
            });

            return mediaQueries;
        };

        /**
         * @private
         *
         * Creates the column segmentation. With other words:
         * This method creates the internal data structure from the
         * passed "source" attribute. Every card within this "source"
         * model will be passed into this internal column structure by
         * reference. So if you modify the data within your controller
         * this directive will reflect these changes immediately.
         *
         * NOTE that calling this method will trigger a complete template "redraw".
         *
         */
        Deckgrid.prototype.$$createColumns = function $$createColumns () {
            var self = this;

            if (!this.$$scope.layout) {
                return $log.error('angular-deckgrid: No CSS configuration found (see ' +
                                   'https://github.com/akoenig/angular-deckgrid#the-grid-configuration)');
            }

            this.$$scope.columns = [];

            angular.forEach(this.$$scope.model, function onIteration (card, index) {
                var column = (index % self.$$scope.layout.columns) | 0;

                if (!self.$$scope.columns[column]) {
                    self.$$scope.columns[column] = [];
                }

                card.$index = index;
                self.$$scope.columns[column].push(card);
            });
        };

        /**
         * @private
         *
         * Parses the configuration out of the configured CSS styles.
         *
         * Example:
         *
         *     .deckgrid::before {
         *         content: '3 .column.size-1-3';
         *     }
         *
         * Will result in a three column grid where each column will have the
         * classes: "column size-1-3".
         *
         * You are responsible for defining the respective styles within your CSS.
         *
         */
        Deckgrid.prototype.$$getLayout = function $$getLayout () {
            var content = $window.getComputedStyle(this.$$elem, ':before').content,
                layout;

            if (content) {
                content = content.replace(/'/g, '');  // before e.g. '3 .column.size-1of3'
                content = content.replace(/"/g, '');  // before e.g. "3 .column.size-1of3"
                content = content.split(' ');

                if (2 === content.length) {
                    layout = {};
                    layout.columns = (content[0] | 0);
                    layout.classList = content[1].replace(/\./g, ' ').trim();
                }
            }

            return layout;
        };

        /**
         * @private
         *
         * Event that will be triggered if a CSS media query changed.
         *
         */
        Deckgrid.prototype.$$onMediaQueryChange = function $$onMediaQueryChange () {
            var self = this,
                layout = this.$$getLayout();

            //
            // Okay, the layout has changed.
            // Creating a new column structure is not avoidable.
            //
            if (layout.columns !== this.$$scope.layout.columns) {
                self.$$scope.layout = layout;

                self.$$scope.$apply(function onApply () {
                    self.$$createColumns();
                });
            }
        };

        /**
         * @private
         *
         * Event that will be triggered when the source model has changed.
         *
         */
        Deckgrid.prototype.$$onModelChange = function $$onModelChange (newModel, oldModel) {
            var self = this;

            newModel = newModel || [];
            oldModel = oldModel || [];

            if (!angular.equals(oldModel, newModel)) {
                self.$$createColumns();
            }
        };

        /**
         * Destroys the directive. Takes care of cleaning all
         * watchers and event handlers.
         *
         */
        Deckgrid.prototype.destroy = function destroy () {
            var i = this.$$watchers.length - 1;

            for (i; i >= 0; i = i - 1) {
                this.$$watchers[i]();
            }
        };

        return {
            create : function create (scope, element) {
                return new Deckgrid(scope, element);
            }
        };
    }
]);

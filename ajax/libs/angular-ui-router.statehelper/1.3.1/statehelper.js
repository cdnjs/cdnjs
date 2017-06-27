/**
 * A helper module for AngularUI Router, which allows you to define your states as an object tree.
 * @author Mark Lagendijk <mark@lagendijk.info>
 * @license MIT
 */
angular.module('ui.router.stateHelper', [ 'ui.router' ])
    .provider('stateHelper', ['$stateProvider', function($stateProvider){
        var self = this;

        /**
         * Recursively sets the states using $stateProvider.state.
         * Child states are defined via a `children` property.
         *
         * 1. Recursively calls itself for all descendant states, by traversing the `children` properties.
         * 2. Converts all the state names to dot notation, of the form `grandfather.father.state`.
         * 3. Sets `parent` property of the descendant states.
         *
         * @param {Object} state - A regular ui.router state object.
         * @param {Array} [state.children] - An optional array of child states.
         * @deprecated {Boolean} keepOriginalNames - An optional flag that prevents conversion 
         *     of names to dot notation if true. (use options.keepOriginalNames instead)
         * @param {Object} [options] - An optional options object.
         * @param {Boolean} [options.keepOriginalNames=false] An optional flag that 
         *     prevents conversion of names to dot notation if true.
         * @param {Boolean} [options.siblingTraversal=false] An optional flag that 
         *     adds `nextSibling` and `previousSibling` properties when enabled
         */
        this.state = function(state){
            var args = Array.prototype.slice.apply(arguments);
            var options = {
                keepOriginalNames: false,
                siblingTraversal: false
            };  

            if (typeof args[1] === 'boolean') {
                options.keepOriginalNames = args[1];
            } 
            else if (typeof args[1] === 'object') {
                angular.extend(options, args[1]);
            }

            if (!options.keepOriginalNames) {
                fixStateName(state);
            }

            $stateProvider.state(state);

            if(state.children && state.children.length){
                state.children.forEach(function(childState){
                    childState.parent = state;
                    self.state(childState, options);
                });

                if (options.siblingTraversal) {
                    addSiblings(state);
                }
            }

            return self;
        };

        this.setNestedState = this.state;

        self.$get = angular.noop;

        /**
         * Converts the name of a state to dot notation, of the form `grandfather.father.state`.
         * @param state
         */
        function fixStateName(state){
            if(state.parent){
                state.name = (angular.isObject(state.parent) ? state.parent.name : state.parent) + '.' + state.name;
            }
        }

        function addSiblings(state) {
            state.children.forEach(function (childState, idx, array) {
                if (array[idx + 1]) {
                    childState.nextSibling = array[idx + 1].name;
                }
                if (array[idx - 1]) {
                    childState.previousSibling = array[idx - 1].name;
                }
            });
        }
    }]);

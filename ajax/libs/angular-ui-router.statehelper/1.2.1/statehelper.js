/**
 * A helper module for AngularUI Router, which allows you to define your states as an object tree.
 * @author Mark Lagendijk <mark@lagendijk.info>
 * @license MIT
 */
angular.module('ui.router.stateHelper', [ 'ui.router' ])
    .provider('stateHelper', function($stateProvider){
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
         * @param {Boolean} keepOriginalNames - An optional flag that prevents conversion of names to dot notation if true.
         */
        this.state = function(state, keepOriginalNames){
            if(!keepOriginalNames){
                fixStateName(state);
            }
            $stateProvider.state(state);

            if(state.children && state.children.length){
                state.children.forEach(function(childState){
                    childState.parent = state;
                    self.state(childState, keepOriginalNames);
                });
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
    });
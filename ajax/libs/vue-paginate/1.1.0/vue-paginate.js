;(function () {

    var state = {};

    // The initial list (before it's sliced)
    var originalLists = {};

    var vuePaginate = {};

    var helpers = {
        capitalize: function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    };

    function setNumberOfPages (vm, listName, length) {
        state[listName].numberOfItems = length;
        state[listName].numberOfPages = Math.ceil(state[listName].numberOfItems / state[listName].perPage);

        // Set numberOfPages on the vm instance 
        // so you can use it in your links section.
        vm.$set(listName + 'Links', state[listName].numberOfPages);
    }

    vuePaginate.install = function (Vue) {
        Vue.directive('paginate', {
            twoWay: true,

            bind: function() {
                // Turn off warnings (because we're using vm.$set)
                Vue.config.silent = true;

                var vm = this.vm;
                var listName = this.expression;
                var perPage = +this.arg;

                if (!vm[listName]) {
                    throw new Error('[vue-paginate] the list name "' + listName + '" is not defined in your vm instance.');
                }

                originalLists[listName] = vm[listName];
                
                // Set the full version on the vm
                vm.$set('full' + helpers.capitalize(listName), originalLists[listName]);

                state[listName] = { currentPage: 0 };
                state[listName].perPage = perPage;
                
                setNumberOfPages(vm, listName, originalLists[listName].length);

                vm['change' + helpers.capitalize(listName) + 'Page'] = function (page) {
                    // Reset the list with original data for two reasons:
                    // 1. To change it, so the update hook gets triggered.
                    // 2. To slice it with new positions from the beginning.
                    vm[listName] = originalLists[listName];
                    
                    state[listName].currentPage = page;
                };

                // Another way to navigate pages (Next & Prev)
                vm['next' + helpers.capitalize(listName) + 'Page'] = function() {
                    vm[listName] = originalLists[listName];

                    state[listName].currentPage = (state[listName].currentPage + 1 < state[listName].numberOfPages) ?
                        state[listName].currentPage + 1 :
                        state[listName].currentPage;
                };

                vm['prev' + helpers.capitalize(listName) + 'Page'] = function() {
                    vm[listName] = originalLists[listName];

                    state[listName].currentPage = (state[listName].currentPage - 1 > 0) ?
                        state[listName].currentPage - 1 :
                        0;
                };

                vm['refresh' + helpers.capitalize(listName) + 'Page'] = function () {
                    vm['change' + helpers.capitalize(listName) + 'Page'](0);
                };

                // Turn on warnings back
                Vue.config.silent = false;
            },

            update: function (list) {
                var listName = this.expression;

                // Refresh number of pages (useful in case you're filtering the list)
                setNumberOfPages(this.vm, listName, list.length);

                state[listName].currentPage = state[listName].currentPage >= state[listName].numberOfPages ?
                    state[listName].numberOfPages - 1 : 
                    state[listName].currentPage;

                var index = state[listName].currentPage * state[listName].perPage;
                
                this.set(list.slice(index, index + state[listName].perPage));
            },
        })
    }

    if (typeof exports == "object") {
        module.exports = vuePaginate;
    } else if (typeof define == "function" && define.amd) {
        define([], function(){ return vuePaginate });
    } else if (window.Vue) {
        window.VuePaginate = vuePaginate;
        Vue.use(vuePaginate);
    }

})();


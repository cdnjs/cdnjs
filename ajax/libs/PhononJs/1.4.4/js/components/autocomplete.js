phonon.autocomplete = (function (Awesomplete) {

    /**
     * Fix the width of the list
     *
     * @param {Object} event
     */
    var open = function (event) {
        var input = event.target
        var list = input.parentNode.querySelector('ul')
        if (list) {
            list.style.width = input.clientWidth + 'px'
        }
    }

    /* Use of Awesomplete
    * https://github.com/LeaVerou/awesomplete
    * License: https://github.com/LeaVerou/awesomplete/blob/gh-pages/LICENSE
    */
    var init = function (input, opts) {
        if (typeof Awesomplete === 'undefined') {
            console.error('The autocomplete component requires Awesomplete dependency.')
            return
        }

        input.addEventListener('awesomplete-open', open)
        return new Awesomplete(input, opts)
    }

    return init

})(window.Awesomplete);

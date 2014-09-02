// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

    $(function(){

        var $window = $(window);

        // Disable certain links in docs
        $('section [href^=#]').click(function (e) {
            e.preventDefault()
        });

        // side bar
        $('.bs-docs-sidenav').affix({
            offset: {
                top: function () { return $window.width() <= 980 ? 290 : 210 }
                , bottom: 270
            }
        });
        // Buttons download
        $('.download-btn').button();

        // make code pretty
        window.prettyPrint && prettyPrint();

    })
}(window.jQuery);
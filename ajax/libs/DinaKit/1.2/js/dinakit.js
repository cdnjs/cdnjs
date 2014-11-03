/*!
 *  Dinakit Framework 1.2 by @IanGraphics - http://dinakit.itemplat.es/
 *  author: Kader Bouyakoub - author uri: https://github.com/bkader
 *  License - "Don't Be A Dick License" - DBAD by philsturgeon (http://www.dbad-license.org/)
 */

(function($){

    /* ignore links with href="#" */
    $(document).on('click', 'a[href=#]', function(e) {
        e.preventDefault();
    });

    // close alerts
    $(document).on("click",".alert-close",function(t){
        $(this).closest(".alert").slideUp(150,function(){
            $(this).remove()
        });
        t.preventDefault()
    });

    // close modals
    $(document).on("click",".modal-close",function(t){
        $(this).closest(".modal").fadeOut(150,function(){
            $(this).remove()
        });
        t.preventDefault()
    });

    // scroll to
    $(document).on("click",".scroll",function(t){
        var target = $(this).attr('href');
        $("html, body").animate({ scrollTop: $(target).offset().top }, 1000);
        t.preventDefault()
    });

    // automatically add icons to menu items
    $(".menu > li").has("ul").each(function(){
        $("> a:not(.no-fa)",this).append('<i class="fa fa-angle-down"></i>');
        $("ul > li",this).has("ul").each(function(){
            $("> a:not(.no-fa)",this).append('<i class="fa fa-angle-right"></i>')
        })
    });

})(jQuery);
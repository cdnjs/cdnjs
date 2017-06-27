/*
 * VenoBox - jQuery Plugin
 * version: 1.7.1
 * @requires jQuery
 *
 * Examples at http://veno.es/venobox/
 * License: MIT License
 * License URI: https://github.com/nicolafranchini/VenoBox/blob/master/LICENSE
 * Copyright 2013-2017 Nicola Franchini - @nicolafranchini
 *
 */
(function($){

    var autoplay, bgcolor, blocknum, blocktitle, border, core, container, content, dest, 
        evitacontent, evitanext, evitaprev, extraCss, figliall, framewidth, frameheight, 
        infinigall, items, keyNavigationDisabled, margine, numeratio, overlayColor, overlay, 
        prima, title, thisgall, thenext, theprev, type, finH, sonH, nextok, prevok, preloader, 
        navigation, spinner, titlePosition, titleColor, titleBackground, closeColor, closeBackground,
        numerationPosition, numerationColor, numerationBackground,
        pre_open_callback, post_open_callback, pre_close_callback, post_close_callback, post_resize_callback;

    $.fn.extend({
        //plugin name - venobox
        venobox: function(options) {

          // default option
          var defaults = {
              arrowsColor : '#B6B6B6',
              autoplay : false, // same as data-autoplay - thanks @codibit
              bgcolor: '#fff',
              border: '0',
              closeBackground : '#161617',
              closeColor : '#d2d2d2',
              framewidth: '',
              frameheight: '',
              infinigall: false,
              numeratio: false,
              numerationBackground : '#161617',
              numerationColor : '#d2d2d2',
              numerationPosition : 'top', // 'top' || 'bottom'
              overlayClose: true, // disable overlay click-close - thanx @martybalandis
              overlayColor : 'rgba(23,23,23,0.85)',
              spinner : 'double-bounce', // available: 'rotating-plane' | 'double-bounce' | 'wave' | 'wandering-cubes' | 'spinner-pulse' | 'three-bounce' | 'cube-grid'
              spinColor : '#d2d2d2',              
              titleattr: 'title', // specific attribute to get a title (e.g. [data-title]) - thanx @mendezcode
              titleBackground: '#161617',
              titleColor: '#d2d2d2',
              titlePosition : 'top', // 'top' || 'bottom'
              pre_open_callback: function(){ return true; }, // Callbacks - thanx @garyee
              post_open_callback: function(){},
              pre_close_callback: function(){ return true; },
              post_close_callback: function(){},
              post_resize_callback: function(){}
          };

          var option = $.extend(defaults, options);

            return this.each(function() {
                  var obj = $(this);

                  // Prevent double initialization - thanx @matthistuff
                  if(obj.data('venobox')) {
                    return true;
                  }

                  obj.addClass('vbox-item');
                  obj.data('framewidth', option.framewidth);
                  obj.data('frameheight', option.frameheight);
                  obj.data('border', option.border);
                  obj.data('bgcolor', option.bgcolor);
                  obj.data('numeratio', option.numeratio);
                  obj.data('infinigall', option.infinigall);
                  obj.data('overlaycolor', option.overlayColor)

                  obj.data('venobox', true);

                  post_open_callback = option.post_open_callback;
                  post_resize_callback = option.post_resize_callback;

                  obj.on('click', function(e){
                    // e.stopPropagation();
                    e.preventDefault();

                    obj = $(this);

                    var rtn = option.pre_open_callback(obj);
                    if(rtn != undefined && !rtn) {
                      return;
                    }

                    overlayColor = obj.data('overlay') || obj.data('overlaycolor');

                    framewidth = obj.data('framewidth');
                    frameheight = obj.data('frameheight');
                    // set data-autoplay="true" for vimeo and youtube videos - thanx @zehfernandes
                    autoplay = obj.data('autoplay') || option.autoplay; 
                    border = obj.data('border');
                    bgcolor = obj.data('bgcolor');
                    nextok = false;
                    prevok = false;
                    keyNavigationDisabled = false;

                    // set a different url to be loaded via ajax using data-href="" - thanx @pixeline
                    dest = obj.data('href') || obj.attr('href');
                    extraCss = obj.data( 'css' ) || "";

                    $('body').addClass('vbox-open');

                    preloader = '<div class="vbox-preloader">';

                    switch (option.spinner) {

                        case 'rotating-plane':
                            preloader += '<div class="sk-rotating-plane"></div>';
                            break;
                        case 'double-bounce':
                            preloader += '<div class="sk-double-bounce">'
                            + '<div class="sk-child sk-double-bounce1"></div>'
                            + '<div class="sk-child sk-double-bounce2"></div>'
                            + '</div>';
                            break;
                        case 'wave':
                            preloader += '<div class="sk-wave">'
                            + '<div class="sk-rect sk-rect1"></div>'
                            + '<div class="sk-rect sk-rect2"></div>'
                            + '<div class="sk-rect sk-rect3"></div>'
                            + '<div class="sk-rect sk-rect4"></div>'
                            + '<div class="sk-rect sk-rect5"></div>'
                            + '</div>';
                            break;
                        case 'wandering-cubes':
                            preloader += '<div class="sk-wandering-cubes">'
                            + '<div class="sk-cube sk-cube1"></div>'
                            + '<div class="sk-cube sk-cube2"></div>'
                            + '</div>';
                            break;
                          case 'spinner-pulse':
                            preloader += '<div class="sk-spinner sk-spinner-pulse"></div>';
                            break;
                        case 'three-bounce':
                            preloader += '<div class="sk-three-bounce">'
                            + '<div class="sk-child sk-bounce1"></div>'
                            + '<div class="sk-child sk-bounce2"></div>'
                            + '<div class="sk-child sk-bounce3"></div>'
                            + '</div>';
                            break;
                        case 'cube-grid':
                            preloader += '<div class="sk-cube-grid">'
                            + '<div class="sk-cube sk-cube1"></div>'
                            + '<div class="sk-cube sk-cube2"></div>'
                            + '<div class="sk-cube sk-cube3"></div>'
                            + '<div class="sk-cube sk-cube4"></div>'
                            + '<div class="sk-cube sk-cube5"></div>'
                            + '<div class="sk-cube sk-cube6"></div>'
                            + '<div class="sk-cube sk-cube7"></div>'
                            + '<div class="sk-cube sk-cube8"></div>'
                            + '<div class="sk-cube sk-cube9"></div>'
                            + '</div>';
                            break;
                    }
                    preloader += '</div>';


                    navigation = '<a class="vbox-next"><span>next</span></a><a class="vbox-prev"><span>prev</span></a>';
                    vbheader = '<div class="vbox-title"></div><div class="vbox-num">0/0</div><div class="vbox-close">&times;</div>';
                    core = '<div class="vbox-overlay ' + extraCss + '" style="background:'+ overlayColor +'">'
                    + preloader + '<div class="vbox-container"><div class="vbox-content"></div></div>' + vbheader + navigation + '</div>';

                    $('body').append(core);

                    $('.vbox-preloader .sk-child, .vbox-preloader .sk-rotating-plane, .vbox-preloader .sk-rect, .vbox-preloader .sk-cube, .vbox-preloader .sk-spinner-pulse').css('background-color', option.spinColor);

                    overlay = $('.vbox-overlay');
                    container = $('.vbox-container');
                    content = $('.vbox-content');
                    blocknum = $('.vbox-num');
                    blocktitle = $('.vbox-title');

                    blocktitle.css(option.titlePosition, '-1px');
                    blocktitle.css({
                      'color' : option.titleColor,
                      'background-color' : option.titleBackground
                    });

                    $('.vbox-close').css({
                      'color' : option.closeColor,
                      'background-color' : option.closeBackground
                    });

                    $('.vbox-num').css(option.numerationPosition, '-1px');
                    $('.vbox-num').css({
                      'color' : option.numerationColor,
                      'background-color' : option.numerationBackground
                    });

                    $('.vbox-next span, .vbox-prev span').css({
                      'border-top-color' : option.arrowsColor,
                      'border-right-color' : option.arrowsColor
                    });


                    content.html('');
                    content.css('opacity', '0');

                    checknav();

                    // fade in overlay
                    overlay.animate({opacity:1}, 250, function(){
    
                      if(obj.data('vbtype') == 'iframe'){
                        loadIframe();
                      }else if (obj.data('vbtype') == 'inline'){
                        loadInline();
                      }else if (obj.data('vbtype') == 'ajax'){
                        loadAjax();
                      }else if (obj.data('vbtype') == 'vimeo'){
                        loadVid(autoplay, 'vimeo');
                      }else if (obj.data('vbtype') == 'youtube'){
                        loadVid(autoplay, 'youtube');
                      } else {
                        content.html('<img src="'+dest+'">');
                        preloadFirst();
                      }
                    });

                    /* -------- CHECK NEXT / PREV -------- */
                    function checknav(){

                      thisgall = obj.data('vbgall');
                      numeratio = obj.data('numeratio');
                      infinigall = obj.data('infinigall');

                      items = $('.vbox-item[data-vbgall="' + thisgall + '"]');

                      if(items.length > 1 && numeratio === true){
                        blocknum.html(items.index(obj)+1 + ' / ' + items.length);
                        blocknum.show();
                      }else{
                        blocknum.hide();
                      }

                      thenext = items.eq( items.index(obj) + 1 );
                      theprev = items.eq( items.index(obj) - 1 );

                      if(obj.attr(option.titleattr)){
                        title = obj.attr(option.titleattr);
                        blocktitle.show();
                      }else{
                        title = '';
                        blocktitle.hide();
                      }

                      if (items.length > 1 && infinigall === true) {

                        nextok = true;
                        prevok = true;

                        if(thenext.length < 1 ){
                          thenext = items.eq(0);
                        }
                        if(items.index(obj) < 1 ){
                          theprev = items.eq( items.index(items.length) );
                        }

                      } else {

                        if(thenext.length > 0 ){
                          $('.vbox-next').css('display', 'block');
                          nextok = true;
                        }else{
                          $('.vbox-next').css('display', 'none');
                          nextok = false;
                        }
                        if(items.index(obj) > 0 ){
                          $('.vbox-prev').css('display', 'block');
                          prevok = true;
                        }else{
                          $('.vbox-prev').css('display', 'none');
                          prevok = false;
                        }
                      }
                    }
                    
                    /* -------- NAVIGATION CODE -------- */
                    var gallnav = {
                      
                      prev: function() {

                        if (keyNavigationDisabled) {
                          return;
                        } else {
                          keyNavigationDisabled = true;
                        }

                        overlayColor = theprev.data('overlay') || theprev.data('overlaycolor');

                        framewidth = theprev.data('framewidth');
                        frameheight = theprev.data('frameheight');
                        border = theprev.data('border');
                        bgcolor = theprev.data('bgcolor');
                        dest = theprev.data('href') || theprev.attr('href');

                        autoplay = theprev.data('autoplay');

                        if(theprev.attr(option.titleattr)){
                          title = theprev.attr(option.titleattr);
                        }else{
                          title = '';
                        }

                        content.animate({ opacity:0}, 500, function(){
                          
                          overlay.css('background',overlayColor);

                          if (theprev.data('vbtype') == 'iframe') {
                            loadIframe();
                          } else if (theprev.data('vbtype') == 'inline'){
                            loadInline();
                          } else if (theprev.data('vbtype') == 'ajax'){
                            loadAjax();
                          } else if (theprev.data('vbtype') == 'youtube'){
                            loadVid(autoplay, 'youtube');
                          } else if (theprev.data('vbtype') == 'vimeo'){
                            loadVid(autoplay, 'vimeo');
                          }else{
                            content.html('<img src="'+dest+'">');
                            preloadFirst();
                          }
                          obj = theprev;
                          checknav();
                          keyNavigationDisabled = false;
                        });

                      },

                      next: function() {
                        
                        if (keyNavigationDisabled) {
                          return;
                        } else {
                          keyNavigationDisabled = true;
                        }

                        overlayColor = thenext.data('overlay') || thenext.data('overlaycolor');

                        framewidth = thenext.data('framewidth');
                        frameheight = thenext.data('frameheight');
                        border = thenext.data('border');
                        bgcolor = thenext.data('bgcolor');
                        dest = thenext.data('href') || thenext.attr('href');
                        autoplay = thenext.data('autoplay');

                        if(thenext.attr(option.titleattr)){
                          title = thenext.attr(option.titleattr);
                        }else{
                          title = '';
                        }

                        content.animate({ opacity:0}, 500, function(){
                          
                          overlay.css('background',overlayColor);

                          if (thenext.data('vbtype') == 'iframe') {
                            loadIframe();
                          } else if (thenext.data('vbtype') == 'inline'){
                            loadInline();
                          } else if (thenext.data('vbtype') == 'ajax'){
                            loadAjax();
                          } else if (thenext.data('vbtype') == 'youtube'){
                            loadVid(autoplay, 'youtube');
                          } else if (thenext.data('vbtype') == 'vimeo'){
                            loadVid(autoplay, 'vimeo');
                          }else{
                            content.html('<img src="'+dest+'">');
                            preloadFirst();
                          }
                          obj = thenext;
                          checknav();
                          keyNavigationDisabled = false;
                        });
                      }
                    };

                    /* -------- NAVIGATE WITH ARROW KEYS -------- */
                    $('body').keydown(function(e) {
                      if(e.keyCode == 37 && prevok == true) { // left
                        gallnav.prev();
                      }

                      if(e.keyCode == 39 && nextok == true) { // right
                        gallnav.next();
                      }
                    });

                    /* -------- PREVGALL -------- */
                    $('.vbox-prev').click(function(){
                      gallnav.prev();
                    });
                    
                    /* -------- NEXTGALL -------- */
                    $('.vbox-next').click(function(){
                      gallnav.next();
                    });
                    
                    /* -------- ESCAPE HANDLER -------- */
                    function escapeHandler(e) {
                      if(e.keyCode === 27) {
                        closeVbox();
                      }
                    }

                    /* -------- CLOSE VBOX -------- */
                    function closeVbox(){

                      var rtn = option.pre_close_callback(obj, content, blocknum, blocktitle);
                      if(rtn!=undefined && !rtn) {
                        return;
                      }

                      $('body').removeClass('vbox-open');
                      $('body').off('keydown', escapeHandler);
                      overlay.animate({opacity:0}, 500, function(){
                        overlay.remove();
                        keyNavigationDisabled = false;
                        obj.focus();

                        option.post_close_callback(obj,content,blocknum,blocktitle); 
                      });
                    }

                    /* -------- CLOSE CLICK -------- */
                    var closeclickclass = '.vbox-overlay';
                    if(!option.overlayClose){
                        closeclickclass = '.vbox-close';    // close only on X
                    }

                    $(closeclickclass).click(function(e){
                      if ($(e.target).is('.vbox-overlay') || $(e.target).is('.vbox-content') || $(e.target).is('.vbox-close') || $(e.target).is('.vbox-preloader')) {
                         closeVbox();
                      }
                    })
                    $('body').keydown(escapeHandler);
                    return false;
                  });
            });
        }
    });

    /* -------- LOAD AJAX -------- */
    function loadAjax(){
      $.ajax({
      url: dest,
      cache: false
      }).done(function( msg ) {
          content.html('<div class="vbox-inline">'+ msg +'</div>');
          preloadFirst();

      }).fail(function() {
          content.html('<div class="vbox-inline"><p>Error retrieving contents, please retry</div>');
          updateoverlay();
      })
    }

    /* -------- LOAD IFRAME -------- */
    function loadIframe(){
      content.html('<iframe class="venoframe" src="'+dest+'"></iframe>');
    //  $('.venoframe').load(function(){ // valid only for iFrames in same domain
      updateoverlay();
    //  });
    }

    /* -------- LOAD VIDEO -------- */
    function loadVid(autoplay, host){

      var player, videoid;

      // set rel=0 to hide related videos at the end of YT + optional autoplay
      var stringAutoplay = autoplay ? "?rel=0&autoplay=1" : "?rel=0";

      if (host == 'vimeo') {
        player = 'https://player.vimeo.com/video/';
        var pezzi = dest.split('/');
        videoid = pezzi[pezzi.length-1];
      } else {
        player = 'https://www.youtube.com/embed/';
        videoid = YouTubeGetID(dest);       
      }
      content.html('<iframe class="venoframe vbvid" webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder="0" src="'+player+videoid+stringAutoplay+'"></iframe>');
      updateoverlay();
    }

    /**
    * Get YouTube ID from various YouTube URL
    * @author: takien
    * @url: https://gist.github.com/takien/4077195
    */
    function YouTubeGetID(url){
      var ID = '';
      url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      if(url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
      }
      else {
        ID = url;
      }
      return ID;
    }

    /* -------- LOAD INLINE -------- */
    function loadInline(){
      content.html('<div class="vbox-inline">'+$(dest).html()+'</div>');
      updateoverlay();
    }

    /* -------- PRELOAD IMAGE -------- */
    function preloadFirst(){
      images = $('.vbox-content').find('img');

      if (images.length) {
        images.each(function(){
          $(this).one('load', function() {
            updateoverlay();
          });
        });
      } else {
        updateoverlay();
      }
    }

    /* -------- CENTER ON LOAD -------- */
    function updateoverlay(){

      blocktitle.html(title);
      content.find(">:first-child").addClass('figlio');
      $('.figlio').css('width', framewidth).css('height', frameheight).css('padding', border).css('background', bgcolor);

      updateol(sonH, finH);

      content.animate({
          'opacity': '1'
        },'slow', post_open_callback(content,blocknum,blocktitle)
      )
    }

    /* -------- CENTER FRAME -------- */
    function updateol(){

        sonH = content.outerHeight();
        finH = $(window).height();

        if(sonH+30 < finH){
          margine = (finH - sonH)/2;
          content.css('margin-top', margine);
          content.css('margin-bottom', margine);
        }else{
          content.css('margin-top', '30px');
          content.css('margin-bottom', '30px');
        }
        post_resize_callback(content,blocknum,blocktitle); 
    }

    $(window).resize(function(){
      if($('.vbox-content').length){
        setTimeout(updateol(), 800);
      }
    });

})(jQuery);
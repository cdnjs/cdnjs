/*
 * jQuery Booklet Plugin
 * Copyright (c) 2010 - 2012 W. Grauvogel (http://builtbywill.com/)
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version : 1.4.0
 *
 * Originally based on the work of:
 *	1) Charles Mangin (http://clickheredammit.com/pageflip/)
 */
;(function ($) {

    $.fn.booklet = function (options, param1, param2) {

        var obj, method, params, output, result, config, index;

        // option type string - api call
        if(typeof options === 'string') {
            result = new Array();
            $(this).each(function(){
                obj = $(this).data('booklet');
                if(obj) {
                    method = options;
                    // add optional parameters
                    params = new Array();
                    if(param1) {
                        params.push(param1);
                    }
                    if(param2) {
                        params.push(param2);
                    }
                    if(obj[method]) {
                        output = obj[method].apply(obj, params);
                        if(typeof output !== 'undefined' || output){
                            result.push(obj[method].apply(obj, params));
                        }
                    } else {
                        $.error('Method "' +  method + '" does not exist on jQuery.booklet.');
                    }
                } else {
                    $.error('jQuery.booklet has not been initialized. Method "'+options+'" cannot be called.');
                }
            });
            if(result.length == 1){
                return result[0];
            } else if (result.length > 0) {
                return result;
            } else {
                return $(this);
            }
        }
        // option type number - api call
        else if(typeof options === 'number') {
            return $(this).each(function(){
                obj = $(this).data('booklet');
                if(obj) {
                    index = options;
                    obj.gotopage(index);
                } else {
                    $.error('jQuery.booklet has not been initialized.');
                }
            });
        }
        // else build new booklet
        else if (typeof method === 'object' || !method ) {
            return $(this).each(function(){
                config = $.extend({}, $.fn.booklet.defaults, options);
                obj = $(this).data('booklet');

                // destroy old booklet before creating new one
                if(obj) {
                    obj.destroy();
                }

                // instantiate the booklet
                obj = new Booklet($(this), config);
                obj.init();

                return this; // preserve chaining on main function
            });
        }
    };

    function Booklet(inTarget, inOptions) {
        var target = inTarget,
            options = inOptions,
            isInit = false,
            isBusy = false,
            isPlaying = false,
            isHoveringRight = false,
            isHoveringLeft = false,
            isDisabled = false,
            templates = {
                empty: '<div class="b-page-empty" title=""></div>', //book page with no content
                blank: '<div class="b-page-blank" title=""></div>', //transparent item used with closed books
                sF:    '<div class="b-shadow-f"></div>',
                sB:    '<div class="b-shadow-b"></div>'
            },
            directions = {
                leftToRight: 'LTR',
                rightToLeft: 'RTL'
            },
            css = {}, anim = {},
            hoverShadowWidth, hoverFullWidth, hoverCurlWidth,
            pages = new Array(),

            currentHash = '', hashRoot = '/page/', hash, i, j, h, a, diff,
            originalPageTotal, startingPageNumber,
        //page content vars
            pN, p0, p1, p2, p3, p4, pNwrap, p0wrap, p1wrap, p2wrap, p3wrap, p4wrap, wraps, sF, sB,
        //control vars
            p3drag, p0drag, ctrls, overlaysB, overlayN, overlayP, tabs, tabN, tabP, arrows, arrowN, arrowP, customN, customP, ctrlsN, ctrlsP, menu, pause, play,
            pageSelector, pageSelectorList, listItemNumbers, listItemTitle, pageListItem, pageSelectorHeight,
            chapter, chapterSelector, chapterSelectorList, chapterListItem, chapterSelectorHeight,
            wPercent, wOrig, hPercent, hOrig,
            pWidth, pWidthN, pWidthH, pHeight, speedH,

            events = {
                create: 'bookletcreate', // called when booklet has been created
                start:  'bookletstart',  // called when booklet starts to change pages
                change: 'bookletchange', // called when booklet has finished changing pages
                add:    'bookletadd',    // called when booklet has added a page
                remove: 'bookletremove'  // called when booklet has removed a page
            },
            callback,

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // CLASSES
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            Page = function (contentNode, index, options) {
                var chapter = '',
                    title = '',
                    pageNode;

                // save chapter title
                if(contentNode.attr('rel')) {
                    chapter = contentNode.attr('rel');
                }
                // save page title
                if(contentNode.attr('title')) {
                    title = contentNode.attr('title');
                }

                //give content the correct wrapper and page wrapper
                if(contentNode.hasClass('b-page-empty')) {
                    contentNode.wrap('<div class="b-page"><div class="b-wrap"></div></div>');
                } else if(options.closed && options.covers && (index == 1 || index == options.pageTotal - 2)) {
                    contentNode.wrap('<div class="b-page"><div class="b-wrap b-page-cover"></div></div>');
                } else if(index % 2 != 0) {
                    contentNode.wrap('<div class="b-page"><div class="b-wrap b-wrap-right"></div></div>');
                } else {
                    contentNode.wrap('<div class="b-page"><div class="b-wrap b-wrap-left"></div></div>');
                }

                pageNode = contentNode.parents('.b-page').addClass('b-page-' + index);

                // add page numbers
                if(
                    options.pageNumbers &&
                        !contentNode.hasClass('b-page-empty') &&
                        //(options.layoutSingle && !contentNode.hasClass('b-page-blank')) &&
                        (!options.closed || (options.closed && !options.covers) || (options.closed && options.covers && index != 1 && index != options.pageTotal - 2))
                    ) {
                    if(options.direction == directions.leftToRight) {
                        startingPageNumber++;
                    }
                    contentNode.parent().append('<div class="b-counter">' + startingPageNumber + '</div>');
                    if(options.direction == directions.rightToLeft) {
                        startingPageNumber--;
                    }
                }

                return {
                    index: index,
                    contentNode: contentNode[0],
                    pageNode: pageNode[0],
                    chapter: chapter,
                    title: title
                }
            },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // INITIAL FUNCTIONS
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            init = function () {
                // remove load wrapper for compatibility with version 1.2.0
                target.find('.b-load').children().unwrap();

                // setup target DOM object
                target.addClass('booklet');

                // store data for api calls
                target.data('booklet', this);

                // save original number of pages
                originalPageTotal = target.children().length;
                options.currentIndex = 0;

                // generate page markup
                initPages();
                // initialize options
                updateOptions();
                // update after initialized
                updatePages();

                updateControlVisibility();
                updateMenu();

                isInit = true;
                isDisabled = false;

                callback = {
                    options: jQuery.extend({},options),
                    index: options.currentIndex,
                    pages: [pages[options.currentIndex].contentNode, pages[options.currentIndex+1].contentNode]
                };
                if(options.create) {
                    target.unbind(events.create+'.booklet').bind(events.create+'.booklet', options.create);
                }
                target.trigger(events.create, callback);
            },
            enable = function () {
                isDisabled = false;
                updateOptions();
                updateManualControls();
            },
            disable = function () {
                destroyControls();
            },
            destroy = function () {
                // destroy all booklet items
                destroyControls();
                destroyPages();

                // clear class from target DOM object
                target.removeClass('booklet');

                // clear out booklet from data object
                target.removeData('booklet');

                isInit = false;
            },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // PAGE FUNCTIONS
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            initPages = function () {

                pages = new Array();

                // fix for odd number of pages
                if((target.children().length % 2) != 0) {
                    // if book is closed and using covers, add page before back cover, else after last page
                    if(options.closed && options.covers) {
                        target.children().last().before(templates.blank);
                    } else {
                        target.children().last().after(templates.blank);
                    }
                }

                // if closed book, add empty pages to start and end
                if(options.closed) {
                    $(templates.empty).attr({title: options.closedFrontTitle || '', rel: options.closedFrontChapter || ''}).prependTo(target);
                    target.children().last().attr({title: options.closedBackTitle || '', rel: options.closedBackChapter || ''});
                    target.append(templates.empty);
                }

                // set total page count
                options.pageTotal = target.children().length;

                startingPageNumber = 0;

                if(options.direction == directions.rightToLeft) {
                    startingPageNumber = options.pageTotal;
                    if(options.closed) {
                        startingPageNumber -= 2;
                    }
                    if(options.covers) {
                        startingPageNumber -= 2;
                    }
                    $(target.children().get().reverse()).each(function () {
                        $(this).appendTo(target);
                    });
                }

                if (!isInit) {
                    // set currentIndex
                    if(options.direction == directions.leftToRight) {
                        options.currentIndex = 0;
                    } else if(options.direction == directions.rightToLeft) {
                        options.currentIndex = options.pageTotal - 2;
                    }

                    if(!isNaN(options.startingPage) && options.startingPage <= options.pageTotal && options.startingPage > 0) {
                        if((options.startingPage % 2) != 0) {
                            options.startingPage--
                        }
                        options.currentIndex = options.startingPage;
                    }
                }

                /*
                 if(options.layoutSingle) {
                 target.children().each(function () {
                 if(options.direction == directions.leftToRight){
                 $(this).before(templates.blank);
                 }else{
                 $(this).after(templates.blank);
                 }
                 });
                 }
                 */

                // load pages
                target.children().each(function (i) {
                    var newPage = new Page($(this), i, options);
                    pages.push(newPage);
                });
            },
            updatePages = function () {
                updatePageStructure();
                updatePageCSS();
                updateManualControls();
            },
            updatePageStructure = function () {
                // reset all content
                target.find('.b-page').removeClass('b-pN b-p0 b-p1 b-p2 b-p3 b-p4').hide();

                // add page classes
                if(options.currentIndex - 2 >= 0) {
                    target.find('.b-page-' + (options.currentIndex - 2)).addClass('b-pN').show();
                    target.find('.b-page-' + (options.currentIndex - 1)).addClass('b-p0').show();
                }
                target.find('.b-page-' + (options.currentIndex)).addClass('b-p1').show();
                target.find('.b-page-' + (options.currentIndex + 1)).addClass('b-p2').show();
                if(options.currentIndex + 3 <= options.pageTotal) {
                    target.find('.b-page-' + (options.currentIndex + 2)).addClass('b-p3').show();
                    target.find('.b-page-' + (options.currentIndex + 3)).addClass('b-p4').show();
                }

                // save structure elems to vars
                pN = target.find('.b-pN');
                p0 = target.find('.b-p0');
                p1 = target.find('.b-p1');
                p2 = target.find('.b-p2');
                p3 = target.find('.b-p3');
                p4 = target.find('.b-p4');
                pNwrap = target.find('.b-pN .b-wrap');
                p0wrap = target.find('.b-p0 .b-wrap');
                p1wrap = target.find('.b-p1 .b-wrap');
                p2wrap = target.find('.b-p2 .b-wrap');
                p3wrap = target.find('.b-p3 .b-wrap');
                p4wrap = target.find('.b-p4 .b-wrap');
                wraps = target.find('.b-wrap');

                if(options.shadows) {
                    target.find('.b-shadow-f, .b-shadow-b').remove();
                    sF = $(templates.sF).css(css.sF).appendTo(p3);
                    sB = $(templates.sB).appendTo(p0).css(css.sB);
                }
            },
            updatePageCSS = function () {
                // update css
                target.find('.b-shadow-f, .b-shadow-b, .b-p0, .b-p3').css({'filter': '', 'zoom': ''});

                target.find('.b-page').removeAttr('style');
                wraps.removeAttr('style');

                wraps.css(css.wrap);
                p0wrap.css(css.p0wrap);
                p1.css(css.p1);
                p2.css(css.p2);
                if(options.closed && options.autoCenter && options.currentIndex >= options.pageTotal - 2) {
                    p2.hide();
                }
                pN.css(css.pN);
                p0.css(css.p0);
                p3.stop().css(css.p3);
                p4.css(css.p4);

                if(options.closed && options.autoCenter && options.currentIndex == 0) {
                    pN.css({'left': 0});
                    p1.css({'left': pWidthN});
                    p2.css({'left': 0});
                    p3.css({'left': pWidth});
                    p4.css({'left': 0});
                }

                if(options.closed && options.autoCenter && (options.currentIndex == 0 || options.currentIndex >= options.pageTotal - 2)) {
                    if(options.overlays) {
                        overlaysB.width('100%');
                    }
                    target.width(pWidth);
                } else {
                    if(options.overlays) {
                        overlaysB.width('50%');
                    }
                    target.width(options.width);
                }

                // ie fix
                target.find('.b-page').css({'filter': '', 'zoom': ''});
            },
            destroyPages = function() {
                // remove booklet markup
                target.find(".b-wrap").unwrap();
                target.find(".b-wrap").children().unwrap();
                target.find(".b-counter, .b-page-blank, .b-page-empty, .b-shadow-f, .b-shadow-b").remove();

                // revert page order to original
                if(options.direction == directions.rightToLeft) {
                    $(target.children().get().reverse()).each(function () {
                        $(this).appendTo(target);
                    });
                }
            },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // OPTION / CONTROL FUNCTIONS
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            updateOptions = function (newOptions) {

                var didUpdate = false;

                // update options if newOptions have been passed in
                if(newOptions != null && typeof newOptions != "undefined"){

                    // remove page structure, revert to original order
                    destroyPages();
                    destroyControls();

                    isDisabled = false;

                    options = $.extend({}, options, newOptions);
                    didUpdate = true;

                    initPages();
                }

                // set width + height
                if(!options.width) {
                    options.width = target.width();
                } else if(typeof options.width == 'string' && options.width.indexOf("px") != -1) {
                    options.width = options.width.replace('px', '');
                } else if(typeof options.width == 'string' && options.width.indexOf("%") != -1) {
                    wPercent = true;
                    wOrig = options.width;
                    options.width = (options.width.replace('%', '') / 100) * parseFloat(target.parent().css('width'));
                }
                if(!options.height) {
                    options.height = target.height();
                } else if(typeof options.height == 'string' && options.height.indexOf("px") != -1) {
                    options.height = options.height.replace('px', '');
                } else if(typeof options.height == 'string' && options.height.indexOf("%") != -1) {
                    hPercent = true;
                    hOrig = options.height;
                    options.height = (options.height.replace('%', '') / 100) * parseFloat(target.parent().css('height'));
                }
                target.width(options.width);
                target.height(options.height);

                // save page sizes and other vars
                pWidth  = options.width / 2;
                pWidthN = '-' + (pWidth) + 'px';
                pWidthH = pWidth / 2;
                pHeight = options.height;
                speedH  = options.speed / 2;

                // set position
                if(options.closed && options.autoCenter) {
                    if(options.currentIndex == 0) {
                        target.width(pWidth);
                    } else if(options.currentIndex >= options.pageTotal - 2) {
                        target.width(pWidth);
                    }
                }

                // save shadow widths for anim
                if(options.shadows) {
                    options.shadowTopFwdWidth = '-' + options.shadowTopFwdWidth + 'px';
                    options.shadowTopBackWidth = '-' + options.shadowTopBackWidth + 'px';
                }

                // set total page count
                options.pageTotal = target.children('.b-page').length;

                // set booklet opts.name
                if(options.name) {
                    document.title = options.name;
                } else {
                    options.name = document.title;
                }

                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                // update all CSS, as sizes may have changed
                updateCSSandAnimations();
                if (isInit) {
                    updatePages();
                }

                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // CONTROLS + MENU
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                // setup menu
                if(options.menu && $(options.menu).length > 0) {
                    menu = $(options.menu);

                    if(!menu.hasClass('b-menu')) {
                        menu.addClass('b-menu');
                    }

                    // setup page selector
                    if(options.pageSelector && menu.find('.b-selector-page').length == 0) {
                        //add selector
                        pageSelector = $('<div class="b-selector b-selector-page"><span class="b-current">' + (options.currentIndex + 1) + ' - ' + (options.currentIndex + 2) + '</span></div>').appendTo(menu);
                        pageSelectorList = $('<ul></ul>').appendTo(pageSelector).empty().css('height', 'auto');

                        // loop through all pages
                        for(i = 0; i < options.pageTotal; i += 2) {
                            j = i;
                            // numbers for normal view
                            listItemNumbers = (j + 1) + '-' + (j + 2);
                            if(options.closed) {
                                // numbers for closed book
                                j--;
                                if(i == 0) {
                                    listItemNumbers = '1'
                                } else if(i == options.pageTotal - 2) {
                                    listItemNumbers = options.pageTotal - 2
                                } else {
                                    listItemNumbers = (j + 1) + '-' + (j + 2);
                                }
                                // numbers for closed book with covers
                                if(options.covers) {
                                    j--;
                                    if(i == 0) {
                                        listItemNumbers = ''
                                    } else if(i == options.pageTotal - 2) {
                                        listItemNumbers = ''
                                    } else {
                                        listItemNumbers = (j + 1) + '-' + (j + 2);
                                    }
                                }
                            }
                            if(i == 0) {
                                pageSelector.find('.b-current').text(listItemNumbers);
                            }

                            // get the title
                            listItemTitle = pages[i].title;
                            if(listItemTitle == '') {
                                listItemTitle = pages[i + 1].title;
                            }

                            // get title for reversed direction
                            if(options.direction == directions.rightToLeft) {
                                listItemTitle = pages[Math.abs(i - options.pageTotal) - 1].title;
                                if(listItemTitle == ''){ listItemTitle = pages[Math.abs(i - options.pageTotal) - 2].title; }
                            }

                            // add the list item
                            pageListItem = $('<li><a href="#' + hashRoot + (i + 1) + '" id="selector-page-' + i + '"><span class="b-text">' + listItemTitle + '</span><span class="b-num">' + listItemNumbers + '</span></a></li>').appendTo(pageSelectorList);

                            if(!options.hash) {
                                pageListItem.find('a').bind('click.booklet', function () {
                                    if(options.direction == directions.rightToLeft) {
                                        pageSelector.find('.b-current').text($(this).find('.b-num').text());
                                        goToPage(Math.abs(parseInt($(this).attr('id').replace('selector-page-', '')) - options.pageTotal) - 2);
                                    } else {
                                        goToPage(parseInt($(this).attr('id').replace('selector-page-', '')));
                                    }
                                    return false;
                                });
                            }
                        }

                        // set height
                        pageSelectorHeight = pageSelectorList.height();
                        pageSelectorList.css({'height': 0, 'padding-bottom': 0});

                        // add hover effects
                        pageSelector.bind('mouseenter.booklet', function () {
                            pageSelectorList.stop().animate({height: pageSelectorHeight, paddingBottom: 10}, 500);
                        }).bind('mouseleave.booklet', function () {
                                pageSelectorList.stop().animate({height: 0, paddingBottom: 0}, 500);
                            });
                    } else if (!options.pageSelector) {
                        menu.find('.b-selector-page').remove();
                        pageSelector = pageSelectorList = listItemNumbers = listItemTitle = pageListItem = pageSelectorHeight = null;
                    }

                    // setup chapter selector
                    if(options.chapterSelector && menu.find('.b-selector-chapter').length == 0) {

                        chapter = pages[options.currentIndex].chapter;
                        if(chapter == "") {
                            chapter = pages[options.currentIndex + 1].chapter;
                        }

                        chapterSelector = $('<div class="b-selector b-selector-chapter"><span class="b-current">' + chapter + '</span></div>').appendTo(menu);
                        chapterSelectorList = $('<ul></ul>').appendTo(chapterSelector).empty().css('height', 'auto');

                        for(i = 0; i < options.pageTotal; i += 1) {
                            if(pages[i].chapter != "" && typeof pages[i].chapter != "undefined") {
                                if(options.direction == directions.rightToLeft) {
                                    j = i;
                                    if(j % 2 != 0) {
                                        j--;
                                    }
                                    chapterSelector.find('.b-current').text(pages[i].chapter);
                                    chapterListItem = $('<li><a href="#' + hashRoot + (j + 1) + '" id="selector-page-' + (j) + '"><span class="b-text">' + pages[i].chapter + '</span></a></li>').prependTo(chapterSelectorList);
                                } else {
                                    chapterListItem = $('<li><a href="#' + hashRoot + (i + 1) + '" id="selector-page-' + i + '"><span class="b-text">' + pages[i].chapter + '</span></a></li>').appendTo(chapterSelectorList);
                                }
                                if(!options.hash) {
                                    chapterListItem.find('a').bind('click.booklet', function () {
                                        if(options.direction == directions.rightToLeft) {
                                            chapterSelector.find('.b-current').text($(this).find('.b-text').text());
                                            goToPage(Math.abs(parseInt($(this).attr('id').replace('selector-page-', '')) - options.pageTotal) - 2);
                                        } else {
                                            goToPage(parseInt($(this).attr('id').replace('selector-page-', '')));
                                        }
                                        return false;
                                    });
                                }
                            }
                        }

                        chapterSelectorHeight = chapterSelectorList.height();
                        chapterSelectorList.css({'height': 0, 'padding-bottom': 0});

                        chapterSelector.bind('mouseenter.booklet', function () {
                            chapterSelectorList.stop().animate({height: chapterSelectorHeight, paddingBottom: 10}, 500);
                        }).bind('mouseleave.booklet', function () {
                                chapterSelectorList.stop().animate({height: 0, paddingBottom: 0}, 500);
                            });
                    } else if (!options.chapterSelector) {
                        menu.find('.b-selector-chapter').remove();
                        chapter = chapterSelector = chapterSelectorList = chapterListItem = chapterSelectorHeight = null;
                    }

                } else {
                    menu = null;
                    if(options.menu){
                        $(options.menu).removeClass('b-menu');
                    }
                    target.find('.b-selector').remove();
                }

                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                ctrls = target.find('.b-controls');
                if(ctrls.length == 0) {
                    ctrls = $('<div class="b-controls"></div>').appendTo(target);
                }

                // force no overlays if using manual controls
                if(options.manual && $.ui) {
                    options.overlays = false;
                }

                // user defined prev next controls
                if (customN) {
                    customN.unbind('click.booklet');
                }
                if(options.next && $(options.next).length > 0) {
                    customN = $(options.next);
                    customN.bind('click.booklet', function (e) {
                        e.preventDefault();
                        next();
                    });
                } else {
                    customN = null;
                }
                if (customP) {
                    customP.unbind('click.booklet');
                }
                if(options.prev && $(options.prev).length > 0) {
                    customP = $(options.prev);
                    customP.bind('click.booklet', function (e) {
                        e.preventDefault();
                        prev();
                    });
                } else {
                    customP = null;
                }

                // add overlays
                overlaysB = target.find('.b-overlay');
                if(options.overlays && overlaysB.length == 0) {
                    overlayP = $('<div class="b-overlay b-overlay-prev b-prev" title="' + options.previousControlTitle + '"></div>').appendTo(ctrls);
                    overlayN = $('<div class="b-overlay b-overlay-next b-next" title="' + options.nextControlTitle + '"></div>').appendTo(ctrls);
                    overlaysB = target.find('.b-overlay');
                    // ie fix
                    if($.browser.msie) {
                        overlaysB.css({'background': '#fff', 'filter': 'progid:DXImageTransform.Microsoft.Alpha(opacity=0) !important'});
                    }
                } else if (!options.overlays) {
                    overlaysB.remove();
                    overlaysB = null;
                }

                // add tabs
                tabs = target.find('.b-tab');
                if(options.tabs && tabs.length == 0) {
                    tabP = $('<div class="b-tab b-tab-prev b-prev" title="' + options.previousControlTitle + '">' + options.previousControlText + '</div>').appendTo(ctrls);
                    tabN = $('<div class="b-tab b-tab-next b-next" title="' + options.nextControlTitle + '">' + options.nextControlText + '</div>').appendTo(ctrls);
                    tabs = target.find('.b-tab');
                } else if (!options.tabs) {
                    target.css({'marginTop': 0});
                    tabs.remove();
                    tabs = null;
                }

                // update tab css, options might have changed
                if (options.tabs && tabs.length > 0) {
                    if(options.tabWidth) {
                        tabs.width(options.tabWidth);
                    }
                    if(options.tabHeight) {
                        tabs.height(options.tabHeight);
                    }

                    tabs.css({'top': '-' + tabN.outerHeight() + 'px'});
                    target.css({'marginTop': tabN.outerHeight()});

                    // update controls for RTL direction
                    if(options.direction == directions.rightToLeft) {
                        tabN.html(options.previousControlText).attr('title', options.previousControlTitle);
                        tabP.html(options.nextControlText).attr('title', options.nextControlTitle);
                    }
                }

                // add arrows
                arrows = target.find('.b-arrow');
                if(options.arrows && arrows.length == 0) {
                    arrowP = $('<div class="b-arrow b-arrow-prev b-prev" title="' + options.previousControlTitle + '"><div>' + options.previousControlText + '</div></div>').appendTo(ctrls);
                    arrowN = $('<div class="b-arrow b-arrow-next b-next" title="' + options.nextControlTitle + '"><div>' + options.nextControlText + '</div></div>').appendTo(ctrls);
                    arrows = target.find('.b-arrow');

                    // update ctrls for RTL direction
                    if(options.direction == directions.rightToLeft) {
                        arrowN.html('<div>' + options.previousControlText + '</div>').attr('title', options.previousControlTitle);
                        arrowP.html('<div>' + options.nextControlText + '</div>').attr('title', options.nextControlTitle);
                    }
                } else if (!options.arrows) {
                    arrows.remove();
                    arrows = null;
                }

                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                // save all "b-prev" and "b-next" controls
                ctrlsN = ctrls.find('.b-next');
                ctrlsP = ctrls.find('.b-prev');

                // reset all bound events
                ctrlsN.unbind(".booklet");
                ctrlsP.unbind(".booklet");

                // add click actions
                ctrlsN.bind('click.booklet', function (e) {
                    e.preventDefault();
                    next();
                });
                ctrlsP.bind('click.booklet', function (e) {
                    e.preventDefault();
                    prev();
                });

                // add page hover animations
                if(options.overlays && options.hovers) {
                    // hovers to start draggable forward
                    ctrlsN.bind("mouseover.booklet", function () {
                        startHoverAnimation(true);
                    }).bind("mouseout.booklet", function () {
                            endHoverAnimation(true);
                        });

                    // hovers to start draggable backwards
                    ctrlsP.bind("mouseover.booklet", function () {
                        startHoverAnimation(false);
                    }).bind("mouseout.booklet", function () {
                            endHoverAnimation(false);
                        });
                }

                // add arrow animations
                if(options.arrows) {
                    if(options.arrowsHide) {
                        if($.support.opacity) {
                            ctrlsN.bind('hover.booklet', function () {
                                arrowN.find('div').stop().fadeTo('fast', 1);
                            }, function () {
                                arrowN.find('div').stop().fadeTo('fast', 0);
                            });
                            ctrlsP.bind('hover.booklet', function () {
                                arrowP.find('div').stop().fadeTo('fast', 1);
                            }, function () {
                                arrowP.find('div').stop().fadeTo('fast', 0);
                            });
                        } else {
                            ctrlsN.bind('hover.booklet', function () {
                                arrowN.find('div').show();
                            }, function () {
                                arrowN.find('div').hide();
                            });
                            ctrlsP.bind('hover.booklet', function () {
                                arrowP.find('div').show();
                            }, function () {
                                arrowP.find('div').hide();
                            });
                        }
                    } else {
                        arrowN.find('div').show();
                        arrowP.find('div').show();
                    }
                }

                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                // keyboard controls
                $(document).bind('keyup.booklet', function (event) {
                    if(event.keyCode == 37 && options.keyboard && !isDisabled) {
                        prev();
                    } else if(event.keyCode == 39 && options.keyboard && !isDisabled) {
                        next();
                    }
                });

                // hash controls
                clearInterval(h);
                h = null;
                if(options.hash) {
                    initHash();
                    clearInterval(h);
                    h = setInterval(function () {
                        pollHash()
                    }, 250);
                }

                // percentage resizing
                $(window).bind('resize.booklet', function () {
                    if((wPercent || hPercent) && !isDisabled) {
                        updatePercentageSize();
                    }
                });

                // auto flip book controls
                if(options.auto && options.delay) {
                    clearInterval(a);
                    a = setInterval(function () {
                        if(options.direction == directions.leftToRight) {
                            next();
                        } else {
                            prev();
                        }
                    }, options.delay);
                    isPlaying = true;

                    if(options.pause && $(options.pause).length > 0) {
                        pause = $(options.pause);
                        pause.unbind('click.booklet')
                            .bind('click.booklet', function (e) {
                                e.preventDefault();
                                if(isPlaying) {
                                    clearInterval(a);
                                    isPlaying = false;
                                }
                            });
                    }

                    if(options.play && $(options.play).length > 0) {
                        play = $(options.play);
                        play.unbind('click.booklet')
                            .bind('click.booklet', function (e) {
                                e.preventDefault();
                                if(!isPlaying) {
                                    clearInterval(a);
                                    a = setInterval(function () {
                                        if(options.direction == directions.leftToRight) {
                                            next();
                                        } else {
                                            prev();
                                        }
                                    }, options.delay);
                                    isPlaying = true;
                                }
                            });
                    }
                } else {
                    clearInterval(a);
                    a = null;
                    if(options.pause && $(options.pause).length > 0) {
                        $(options.pause).unbind('click.booklet');
                    }
                    pause = null;
                    if(options.play && $(options.play).length > 0) {
                        $(options.play).unbind('click.booklet');
                    }
                    play = null;
                    isPlaying = false;
                }

                if(didUpdate){
                    updatePages();
                    updateControlVisibility();
                    updateMenu();
                }
            },
            updateCSSandAnimations = function () {
                // init base css
                css = {
                    wrap: {
                        left: 0,
                        width: pWidth - (options.pagePadding * 2) - (options.pageBorder * 2),
                        height: pHeight - (options.pagePadding * 2) - (options.pageBorder * 2),
                        padding: options.pagePadding
                    },
                    p0wrap: {
                        right: 0,
                        left: 'auto'
                    },
                    p1: {
                        left: 0,
                        width: pWidth,
                        height: pHeight
                    },
                    p2: {
                        left: pWidth,
                        width: pWidth,
                        opacity: 1,
                        height: pHeight
                    },
                    pN: {
                        left: 0,
                        width: pWidth,
                        height: pHeight
                    },
                    p0: {
                        left: 0,
                        width: 0,
                        height: pHeight
                    },
                    p3: {
                        left: pWidth * 2,
                        width: 0,
                        height: pHeight,
                        paddingLeft: 0
                    },
                    p4: {
                        left: pWidth,
                        width: pWidth,
                        height: pHeight
                    },
                    sF: {
                        right: 0,
                        width: pWidth,
                        height: pHeight
                    },
                    sB: {
                        left: 0,
                        width: pWidth,
                        height: pHeight
                    }
                };

                hoverShadowWidth = 10;
                hoverFullWidth = options.hoverWidth + hoverShadowWidth;
                hoverCurlWidth = (options.hoverWidth / 2) + hoverShadowWidth;

                // init animation params
                anim = {

                    hover: {
                        speed:    options.hoverSpeed,
                        size:     options.hoverWidth,

                        p2:          {width: pWidth - hoverCurlWidth},
                        p3:          {left: options.width - hoverFullWidth, width: hoverCurlWidth},
                        p3closed:    {left: pWidth - options.hoverWidth, width: hoverCurlWidth},
                        p3wrap:      {left: hoverShadowWidth},

                        p2end:       {width: pWidth},
                        p2closedEnd: {width: pWidth, left:0},
                        p3end:       {left: options.width, width: 0},
                        p3closedEnd: {left: pWidth, width: 0},
                        p3wrapEnd:   {left: 10},

                        p1:          {left: hoverCurlWidth, width: pWidth - hoverCurlWidth},
                        p1wrap:      {left: '-'+hoverCurlWidth+'px'},
                        p0:          {left: hoverCurlWidth, width: hoverCurlWidth},
                        p0wrap:      {right: hoverShadowWidth},

                        p1end:       {left: 0, width: pWidth},
                        p1wrapEnd:   {left: 0},
                        p0end:       {left: 0, width: 0},
                        p0wrapEnd:   {right: 0}
                    },

                    // forward
                    p2: {
                        width: 0
                    },
                    p2closed: {
                        width: 0,
                        left: pWidth
                    },
                    p4closed: {
                        left: pWidth
                    },
                    p3in: {
                        left: pWidthH,
                        width: pWidthH,
                        paddingLeft: options.shadowBtmWidth
                    },
                    p3inDrag: {
                        left: pWidth / 4,
                        width: pWidth * .75,
                        paddingLeft: options.shadowBtmWidth
                    },
                    p3out: {
                        left: 0,
                        width: pWidth,
                        paddingLeft: 0
                    },
                    p3wrapIn:  {
                        left: options.shadowBtmWidth
                    },
                    p3wrapOut: {
                        left: 0
                    },

                    // backwards
                    p1: {
                        left: pWidth,
                        width: 0
                    },
                    p1wrap: {
                        left: pWidthN
                    },
                    p0: {
                        left: pWidth,
                        width: pWidth
                    },
                    p0in: {
                        left: pWidthH,
                        width: pWidthH
                    },
                    p0out: {
                        left: pWidth,
                        width: pWidth
                    },
                    p0outClosed: {
                        left: 0,
                        width: pWidth
                    },
                    p2back: {
                        left: 0
                    },
                    p0wrapDrag: {
                        right: 0
                    },
                    p0wrapIn: {
                        right: options.shadowBtmWidth
                    },
                    p0wrapOut: {
                        right: 0
                    }
                };
            },
            updatePercentageSize = function () {
                // recalculate size for percentage values, called with window is resized
                if(wPercent) {
                    options.width = (wOrig.replace('%', '') / 100) * parseFloat(target.parent().css('width'));
                    target.width(options.width);
                    pWidth = options.width / 2;
                    pWidthN = '-' + (pWidth) + 'px';
                    pWidthH = pWidth / 2;
                }
                if(hPercent) {
                    options.height = (hOrig.replace('%', '') / 100) * parseFloat(target.parent().css('height'));
                    target.height(options.height);
                    pHeight = options.height;
                }
                updateCSSandAnimations();
                updatePageCSS();
            },
            updateControlVisibility = function () {
                // update controls, cursors and visibility
                if(options.overlays || options.tabs || options.arrows) {
                    if($.support.opacity) {
                        if(options.currentIndex >= 2 && options.currentIndex != 0) {
                            ctrlsP.fadeIn('fast').css('cursor', options.cursor);
                        } else {
                            ctrlsP.fadeOut('fast').css('cursor', 'default');
                        }
                        if(options.currentIndex < options.pageTotal - 2) {
                            ctrlsN.fadeIn('fast').css('cursor', options.cursor);
                        } else {
                            ctrlsN.fadeOut('fast').css('cursor', 'default');
                        }
                    } else {
                        if(options.currentIndex >= 2 && options.currentIndex != 0) {
                            ctrlsP.show().css('cursor', options.cursor);
                        } else {
                            ctrlsP.hide().css('cursor', 'default');
                        }
                        if(options.currentIndex < options.pageTotal - 2) {
                            ctrlsN.show().css('cursor', options.cursor);
                        } else {
                            ctrlsN.hide().css('cursor', 'default');
                        }
                    }
                }
            },
            updateMenu = function () {
                if(options.pageSelector) {
                    var currentPageNumbers = '';
                    if(options.direction == directions.rightToLeft) {
                        currentPageNumbers = (Math.abs(options.currentIndex - options.pageTotal) - 1) + ' - ' + ((Math.abs(options.currentIndex - options.pageTotal)));
                        if(options.closed) {
                            if(options.currentIndex == options.pageTotal - 2) {
                                currentPageNumbers = '1'
                            } else if(options.currentIndex == 0) {
                                currentPageNumbers = options.pageTotal - 2
                            } else {
                                currentPageNumbers = (Math.abs(options.currentIndex - options.pageTotal) - 2) + ' - ' + ((Math.abs(options.currentIndex - options.pageTotal) - 1));
                            }

                            if(options.covers) {
                                if(options.currentIndex == options.pageTotal - 2) {
                                    currentPageNumbers = ''
                                } else if(options.currentIndex == 0) {
                                    currentPageNumbers = ''
                                } else {
                                    currentPageNumbers = (Math.abs(options.currentIndex - options.pageTotal) - 3) + ' - ' + ((Math.abs(options.currentIndex - options.pageTotal) - 2));
                                }
                            }
                        }
                    } else {
                        currentPageNumbers = (options.currentIndex + 1) + ' - ' + (options.currentIndex + 2);
                        if(options.closed) {
                            if(options.currentIndex == 0) {
                                currentPageNumbers = '1'
                            } else if(options.currentIndex == options.pageTotal - 2) {
                                currentPageNumbers = options.pageTotal - 2
                            } else {
                                currentPageNumbers = (options.currentIndex) + '-' + (options.currentIndex + 1);
                            }

                            if(options.covers) {
                                if(options.currentIndex == 0) {
                                    currentPageNumbers = ''
                                } else if(options.currentIndex == options.pageTotal - 2) {
                                    currentPageNumbers = ''
                                } else {
                                    currentPageNumbers = (options.currentIndex - 1) + '-' + (options.currentIndex);
                                }
                            }
                        }
                    }
                    $(options.menu + ' .b-selector-page .b-current').text(currentPageNumbers);
                }
                if(options.chapterSelector) {
                    if(pages[options.currentIndex].chapter != "") {
                        $(options.menu + ' .b-selector-chapter .b-current').text(pages[options.currentIndex].chapter);
                    } else if(pages[options.currentIndex + 1].chapter != "") {
                        $(options.menu + ' .b-selector-chapter .b-current').text(pages[options.currentIndex + 1].chapter);
                    }

                    if(options.direction == directions.rightToLeft && pages[options.currentIndex + 1].chapter != "") {
                        $(options.menu + ' .b-selector-chapter .b-current').text(pages[options.currentIndex + 1].chapter);
                    } else if(pages[options.currentIndex] != "") {
                        $(options.menu + ' .b-selector-chapter .b-current').text(pages[options.currentIndex].chapter);
                    }
                }
            },
            updateManualControls = function () {
                var origX, newX, diff, fullPercent, shadowPercent, shadowW, curlW, underW, targetPercent, curlLeft, p1wrapLeft;

                // reset vars
                isHoveringRight = isHoveringLeft = p3drag = p0drag = false;

                // manual page turning, check if jQuery UI is loaded
                target.find('.b-page').draggable('destroy').removeClass('b-grab b-grabbing');
                if(options.manual && $.ui) {

                    // implement draggable forward
                    p3.draggable({
                        axis: "x",
                        containment: [
                            target.offset().left,
                            0,
                            p2.offset().left + pWidth - hoverFullWidth,
                            pHeight
                        ],
                        drag: function (event, ui) {
                            p3drag = true;
                            p3.removeClass('b-grab').addClass('b-grabbing');

                            // calculate positions
                            origX = ui.originalPosition.left;
                            newX = ui.position.left;
                            diff = origX - newX;
                            fullPercent = diff / origX;
                            shadowPercent = fullPercent < 0.5 ? fullPercent : (1 - fullPercent);
                            shadowW = (shadowPercent * options.shadowBtmWidth * 2) + hoverShadowWidth;
                            shadowW = diff / origX >= 0.5 ? shadowW -= hoverShadowWidth :shadowW;

                            // move shadows
                            if(options.shadows) {
                                sF.css({'right': '-' + (options.shadowTopFwdWidth*shadowPercent*2) + 'px'});
                                if($.support.opacity) {
                                    sF.css({'opacity': shadowPercent*2});
                                } else {
                                    sF.css({'right': 'auto', 'left': 0.1 * p3.width()});
                                }
                            }

                            // set top page curl width
                            curlW = hoverCurlWidth + diff / 2;
                            curlW = curlW > pWidth ? pWidth : curlW; // constrain max width

                            // set bottom page width, hide
                            underW = pWidth - curlW;

                            // calculate positions for closed and auto-centered book
                            if(options.closed && options.autoCenter) {
                                if(options.currentIndex == 0) {
                                    targetPercent = 0.5 + 0.5*fullPercent;
                                    curlW = hoverCurlWidth + (hoverCurlWidth * fullPercent) + diff;
                                    curlW = curlW > pWidth ? pWidth : curlW;
                                    underW = pWidth - curlW;

                                    p2.css({left: pWidth*fullPercent});
                                    p4.css({left: pWidth*fullPercent});
                                    target.width(options.width*targetPercent);
                                } else if(options.currentIndex == options.pageTotal - 4) {
                                    targetPercent = (1 - fullPercent) + 0.5*fullPercent;
                                    underW = pWidth - curlW;

                                    p4.hide();
                                    target.width(options.width*targetPercent);
                                } else {
                                    target.width(options.width);
                                }
                            }

                            // set values
                            p3.width(curlW);
                            p3wrap.css({left: shadowW});
                            p2.width(underW);
                        },
                        stop: function (event, ui) {
                            endHoverAnimation(false);
                            if(fullPercent > options.hoverThreshold) {
                                if(options.shadows && !$.support.opacity) {
                                    sF.css({'left': 'auto', opacity: 0});
                                }
                                next();
                                p3.removeClass('b-grab b-grabbing');
                            } else {
                                p3drag = false;
                                p3.removeClass('b-grabbing').addClass('b-grab');

                                sF.animate({left: 'auto', opacity: 0}, anim.hover.speed, options.easing).css(css.sF);

                                if(options.closed && options.autoCenter) {
                                    if(options.currentIndex == 0) {
                                        p2.animate({left: 0}, anim.hover.speed, options.easing);
                                        p4.animate({left: 0}, anim.hover.speed, options.easing);
                                        target.animate({width: options.width*0.5}, anim.hover.speed, options.easing);
                                    } else {
                                        target.animate({width: options.width}, anim.hover.speed, options.easing);
                                    }
                                }
                            }
                        }
                    });

                    // implement draggable backwards
                    p0.draggable({
                        axis: "x",
                        //containment: 'parent',
                        containment: [
                            target.offset().left + hoverCurlWidth,
                            0,
                            target.offset().left + options.width,
                            pHeight
                        ],
                        drag: function (event, ui) {
                            p0drag = true;
                            p0.removeClass('b-grab').addClass('b-grabbing');

                            // calculate positions
                            origX = ui.originalPosition.left;
                            newX = ui.position.left;
                            diff = newX - origX;
                            fullPercent = diff / (options.width - origX);
                            if(options.closed && options.autoCenter && options.currentIndex == 2) {
                                fullPercent = diff / (pWidth - origX);
                            }
                            if(fullPercent > 1){fullPercent = 1;}

                            shadowPercent = fullPercent < 0.5 ? fullPercent : (1 - fullPercent);
                            shadowW = (shadowPercent * options.shadowBtmWidth * 2) + hoverShadowWidth;
                            shadowW = diff / origX >= 0.5 ? shadowW -= hoverShadowWidth :shadowW;

                            if(options.shadows) {
                                if($.support.opacity) {
                                    sB.css({'opacity': shadowPercent*2});
                                } else {
                                    sB.css({'left': options.shadowTopBackWidth*shadowPercent*2});
                                }
                            }

                            curlW = fullPercent*(pWidth-hoverCurlWidth) + hoverCurlWidth + shadowW;
                            curlLeft = curlW - shadowW;
                            p1wrapLeft = -curlLeft;

                            // calculate positions for closed and auto-centered book
                            if(options.closed && options.autoCenter) {
                                if(options.currentIndex == 2) {
                                    targetPercent = (1-fullPercent) + 0.5*fullPercent;
                                    curlLeft = (1-fullPercent)*curlLeft;
                                    p1wrapLeft = -curlLeft - (options.width - (options.width*targetPercent));
                                    pN.hide();
                                    p2.css({left: pWidth*(1-fullPercent)});
                                    p4.css({left: pWidth*(1-fullPercent)});
                                    target.width(options.width*targetPercent);
                                } else if(options.currentIndex == options.pageTotal - 2) {
                                    targetPercent = 0.5 + 0.5*fullPercent;
                                    target.width(options.width*targetPercent);
                                } else {
                                    target.width(options.width);
                                }
                            }

                            // set values
                            ui.position.left = curlLeft;
                            p0.css({width: curlW});
                            p0wrap.css({right: shadowW});
                            p1.css({left: curlLeft, width: pWidth - curlLeft});
                            p1wrap.css({left: p1wrapLeft});
                        },
                        stop: function (event, ui) {
                            endHoverAnimation(true);
                            if(fullPercent > options.hoverThreshold) {
                                prev();
                                p0.removeClass('b-grab b-grabbing');
                            } else {
                                sB.animate({opacity: 0}, anim.hover.speed, options.easing).css(css.sB);
                                p0drag = false;
                                p0.removeClass('b-grabbing').addClass('b-grab');

                                if(options.closed && options.autoCenter) {
                                    if(options.currentIndex == 2) {
                                        p2.animate({left: pWidth}, anim.hover.speed*2, options.easing);
                                        p4.animate({left: pWidth}, anim.hover.speed*2, options.easing);
                                        target.animate({width: options.width}, anim.hover.speed*2, options.easing);
                                    } else if(options.currentIndex == options.pageTotal - 2) {
                                        target.animate({width: options.width*0.5}, anim.hover.speed, options.easing);
                                    }
                                }
                            }
                        }
                    });

                    target.find('.b-page').unbind('click.booklet');
                    if (options.hoverClick) {
                        target.find('.b-pN, .b-p0').bind('click.booklet', prev).css({cursor:'pointer'});
                        target.find('.b-p3, .b-p4').bind('click.booklet', next).css({cursor:'pointer'});
                    }

                    // mouse tracking for page movement
                    target.unbind('mousemove.booklet').bind('mousemove.booklet', function (e) {
                        diff = e.pageX - target.offset().left;
                        if(diff < anim.hover.size) {
                            startHoverAnimation(false);
                        } else if(diff > pWidth - anim.hover.size && options.currentIndex == 0 && options.autoCenter && options.closed) {
                            startHoverAnimation(true);
                        } else if(diff > anim.hover.size && diff <= options.width - anim.hover.size) {
                            endHoverAnimation(false);
                            endHoverAnimation(true);
                        } else if(diff > options.width - anim.hover.size) {
                            startHoverAnimation(true);
                        }
                    }).unbind('mouseleave.booklet').bind('mouseleave.booklet', function () {
                            endHoverAnimation(false);
                            endHoverAnimation(true);
                        });

                }
            },
            initHash = function () {
                hash = getHashNum();

                if(!isNaN(hash) && hash <= options.pageTotal - 1 && hash >= 0 && hash != '') {
                    if((hash % 2) != 0) {
                        hash--;
                    }
                    options.currentIndex = hash;
                } else {
                    updateHash(options.currentIndex + 1, options);
                }

                currentHash = hash;
            },
            pollHash = function () {
                hash = getHashNum();

                // check page num
                if(!isNaN(hash) && hash <= options.pageTotal - 1 && hash >= 0) {
                    if(hash != options.currentIndex && hash.toString() != currentHash) {
                        if((hash % 2) != 0) {

                            hash--
                        }

                        document.title = options.name + options.hashTitleText + (hash + 1);

                        if(!isBusy) {
                            goToPage(hash);
                            currentHash = hash;
                        }
                    }
                }
            },
            getHashNum = function () {
                var hash, hashNum;
                // get page number from hash tag, last element
                hash = window.location.hash.split('/');
                if(hash.length > 1) {
                    hashNum = parseInt(hash[2]) - 1;
                    if(options.direction == directions.rightToLeft) {
                        hashNum = Math.abs(hashNum + 1 - options.pageTotal);
                    }
                    return hashNum;
                } else {
                    return '';
                }
            },
            updateHash = function (hash, options) {
                // set the hash
                if(options.hash) {
                    if(options.direction == directions.rightToLeft) {
                        hash = Math.abs(hash - options.pageTotal);
                    }
                    window.location.hash = hashRoot + hash;
                }
            },
            destroyControls = function () {

                if(options.menu){
                    $(options.menu).removeClass('b-menu');
                }
                menu = null;

                if (customN) {
                    customN.unbind('click.booklet');
                    customN = null;
                }

                if (customP) {
                    customP.unbind('click.booklet');
                    customP = null;
                }

                if (ctrlsN) {
                    ctrlsN.unbind(".booklet");
                    ctrlsN = null;
                }
                if (ctrlsP) {
                    ctrlsP.unbind(".booklet");
                    ctrlsP = null;
                }

                target.find('.b-selector, .b-controls').remove();

                // keyboard
                //$(document).unbind('keyup.booklet');
                isDisabled = true;

                // hash
                clearInterval(h);
                h = null;

                // window resize
                //$(window).unbind('resize.booklet');

                // auto play
                clearInterval(a);
                a = null;
                if(options.pause && $(options.pause).length > 0) {
                    $(options.pause).unbind('click.booklet');
                }
                pause = null;
                if(options.play && $(options.play).length > 0) {
                    $(options.play).unbind('click.booklet');
                }
                play = null;

                destroyManualControls();
            },
            destroyManualControls = function () {
                // remove old draggables
                target.find('.b-page').draggable('destroy').removeClass('b-grab b-grabbing');
                // remove mouse tracking for page movement
                target.unbind('.booklet');
            },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // DYNAMIC FUNCTIONS
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            addPage = function (index, html) {
                // validate inputs
                if(index == "start") {
                    index = 0;
                } else if(index == "end") {
                    index = originalPageTotal;
                } else if(typeof index == "number") {
                    if(index < 0 || index > originalPageTotal) {
                        return;
                    }
                } else if(typeof index == "undefined") {
                    return;
                }

                if(typeof html == "undefined" || html == '') {
                    return;
                }

                // remove page structure, revert to original order
                destroyPages();
                destroyControls();

                // add new page
                if(options.closed && options.covers && index == originalPageTotal) {
                    //end of closed-covers book
                    target.children(':eq(' + (index - 1) + ')').before(html);
                } else if(options.closed && options.covers && index == 0) {
                    //start of closed-covers book
                    target.children(':eq(' + index + ')').after(html);
                } else if(index == originalPageTotal) {
                    //end of book
                    target.children(':eq(' + (index - 1) + ')').after(html);
                } else {
                    target.children(':eq(' + index + ')').before(html);
                }

                originalPageTotal = target.children().length;

                // callback for adding page, returns options, index and the page node
                callback = {
                    options: jQuery.extend({},options),
                    index: index,
                    page: target.children(':eq(' + index + ')')[0]
                };
                if(options.add) {
                    target.unbind(events.add+'.booklet').bind(events.add+'.booklet', options.add);
                }
                target.trigger(events.add, callback);

                isDisabled = false;

                // recall initialize functions
                initPages();
                updateOptions();
                updatePages();
                updateControlVisibility();
                updateMenu();
            },
            removePage = function(index) {
                // validate inputs
                if(index == "start") {
                    index = 0;
                } else if(index == "end") {
                    index = originalPageTotal;
                } else if(typeof index == "number") {
                    if(index < 0 || index > originalPageTotal) {
                        return;
                    }
                } else if(typeof index == "undefined") {
                    return;
                }

                // stop if removing last remaining page
                if(target.children('.b-page').length == 2 && target.find('.b-page-blank').length > 0) {
                    return;
                }

                // remove page structure, revert to original order
                destroyPages();
                destroyControls();

                if(index >= options.currentIndex) {
                    if(index > 0 && (index % 2) != 0) {
                        options.currentIndex-=2;
                    }
                    if(options.currentIndex < 0){
                        options.currentIndex = 0;
                    }
                }

                var removedPage;

                // remove page
                if(options.closed && options.covers && index == originalPageTotal) {
                    // end of closed-covers book
                    removedPage = target.children(':eq(' + (index - 1) + ')').remove();
                } else if(options.closed && options.covers && index == 0) {
                    // start of closed-covers book
                    removedPage = target.children(':eq(' + index + ')').remove();
                } else if(index == originalPageTotal) {
                    // end of book
                    removedPage = target.children(':eq(' + (index - 1) + ')').remove();
                } else {
                    removedPage = target.children(':eq(' + index + ')').remove();
                }

                originalPageTotal = target.children().length;

                // callback for adding page, returns options, index and the page node
                callback = {
                    options: jQuery.extend({},options),
                    index: index,
                    page: removedPage[0]
                };
                if(options.remove) {
                    target.unbind(events.remove+'.booklet').bind(events.remove+'.booklet', options.remove);
                }
                target.trigger(events.remove, callback);

                removedPage = null;
                isDisabled = false;

                // recall initialize functions
                initPages();
                updatePages();
                updateOptions();
                updateControlVisibility();
                updateMenu();
            },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // ANIMATION FUNCTIONS
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            next = function () {
                if(!isBusy) {
                    if(isPlaying && options.currentIndex + 2 >= options.pageTotal) {
                        goToPage(0);
                    } else {
                        goToPage(options.currentIndex + 2);
                    }
                }
            },
            prev = function () {
                if(!isBusy) {
                    if(isPlaying && options.currentIndex - 2 < 0) {
                        goToPage(options.pageTotal - 2);
                    } else {
                        goToPage(options.currentIndex - 2);
                    }
                }
            },
            goToPage = function (newIndex) {
                var speed;

                // moving forward (increasing number)
                if(newIndex > options.currentIndex && newIndex < options.pageTotal && newIndex >= 0 && !isBusy) {
                    isBusy = true;
                    diff = newIndex - options.currentIndex;
                    options.currentIndex = newIndex;
                    options.movingForward = true;

                    // callback when starting booklet animation
                    callback = {
                        options: jQuery.extend({},options),
                        index: newIndex,
                        pages: [pages[newIndex].contentNode, pages[newIndex+1].contentNode]
                    };
                    if(options.start) {
                        target.unbind(events.start+'.booklet').bind(events.start+'.booklet', options.start);
                    }
                    target.trigger(events.start, callback);

                    updateMenu();
                    if(newIndex == options.pageTotal - 2) updateControlVisibility();
                    updateHash(options.currentIndex + 1, options);

                    // set animation speed, depending if user dragged any distance or not
                    speed = p3drag === true ? options.speed * (p3.width() / pWidth) : speedH;

                    startPageAnimation(diff, true, sF, speed);

                    // hide p2 as p3 moves across it
                    if(options.closed && options.autoCenter && newIndex - diff == 0) {
                        p2.stop().animate(anim.p2closed, p3drag === true ? speed : speed*2, options.easing);
                        p4.stop().animate(anim.p4closed, p3drag === true ? speed : speed*2, options.easing);
                    } else {
                        p2.stop().animate(anim.p2, speed, p3drag === true ? options.easeOut : options.easeIn);
                    }

                    // if animating after a manual drag, calculate new speed and animate out
                    if(p3drag) {

                        p3.animate(anim.p3out, speed, options.easeOut);
                        p3wrap.animate(anim.p3wrapOut, speed, options.easeOut, function () {updateAfter()});

                    } else {

                        p3.stop().animate(anim.p3in, speed, options.easeIn)
                            .animate(anim.p3out, speed, options.easeOut);

                        p3wrap.animate(anim.p3wrapIn, speed, options.easeIn)
                            .animate(anim.p3wrapOut, speed, options.easeOut, function () {updateAfter()});
                    }

                    // moving backward (decreasing number)
                } else if(newIndex < options.currentIndex && newIndex < options.pageTotal && newIndex >= 0 && !isBusy) {
                    isBusy = true;
                    diff = options.currentIndex - newIndex;
                    options.currentIndex = newIndex;
                    options.movingForward = false;

                    // callback when starting booklet animation
                    callback = {
                        options: jQuery.extend({},options),
                        index: newIndex,
                        pages: [pages[newIndex].contentNode, pages[newIndex+1].contentNode]
                    };
                    if(options.start) {
                        target.unbind(events.start+'.booklet').bind(events.start+'.booklet', options.start);
                    }
                    target.trigger(events.start, callback);

                    updateMenu();
                    if(newIndex == 0) updateControlVisibility();
                    updateHash(options.currentIndex + 1, options);

                    // set animation speed, depending if user dragged any distance or not
                    speed = p0drag === true ? options.speed * (p0.width() / pWidth) : speedH;

                    startPageAnimation(diff, false, sB, speed);

                    if(p0drag) {
                        // hide p1 as p0 moves across it
                        p1.animate(anim.p1, speed, options.easeOut);
                        p1wrap.animate(anim.p1wrap, speed, options.easeOut);

                        if(options.closed && options.autoCenter && options.currentIndex == 0) {
                            p0.animate(anim.p0outClosed, speed, options.easeOut);
                            p2.stop().animate(anim.p2back, speed, options.easeOut);
                        }else{
                            p0.animate(anim.p0, speed, options.easeOut);
                        }

                        p0wrap.animate(anim.p0wrapDrag, speed, options.easeOut, function () {updateAfter()});
                    }else{
                        // hide p1 as p0 moves across it
                        p1.animate(anim.p1, speed*2, options.easing);
                        p1wrap.animate(anim.p1wrap, speed*2, options.easing);

                        if(options.closed && options.autoCenter && options.currentIndex == 0) {
                            p0.animate(anim.p0in, speed, options.easeIn)
                                .animate(anim.p0outClosed, speed, options.easeOut);
                            p2.stop().animate(anim.p2back, speed*2, options.easing);
                        }else{
                            p0.animate(anim.p0in, speed, options.easeIn)
                                .animate(anim.p0out, speed, options.easeOut);
                        }

                        p0wrap.animate(anim.p0wrapIn, speed, options.easeIn)
                            .animate(anim.p0wrapOut, speed, options.easeOut, function () {updateAfter()});
                    }
                }
            },
            startHoverAnimation = function (inc) {
                if((options.hovers && options.overlays) || options.manual){
                    if(inc) {
                        if(!isBusy && !isHoveringRight && !isHoveringLeft && !p3drag && options.currentIndex + 2 <= options.pageTotal - 2) {
                            // animate
                            p2.stop().animate(anim.hover.p2, anim.hover.speed, options.easing);
                            p3.addClass('b-grab');
                            if(options.closed && options.autoCenter && options.currentIndex == 0) {
                                p3.stop().animate(anim.hover.p3closed, anim.hover.speed, options.easing);
                            } else {
                                p3.stop().animate(anim.hover.p3, anim.hover.speed, options.easing);
                            }
                            p3wrap.stop().animate(anim.hover.p3wrap, anim.hover.speed, options.easing);
                            if(options.shadows && !$.support.opacity) {
                                sF.css({'right': 'auto', 'left': '-40%'});
                            }
                            isHoveringRight = true;
                        }
                    } else {
                        if(!isBusy && !isHoveringLeft && !isHoveringRight && !p0drag && options.currentIndex - 2 >= 0) {
                            // animate
                            p1.stop().animate(anim.hover.p1, anim.hover.speed, options.easing);
                            p0.addClass('b-grab');
                            p1wrap.stop().animate(anim.hover.p1wrap, anim.hover.speed, options.easing);
                            p0.stop().animate(anim.hover.p0, anim.hover.speed, options.easing);
                            p0wrap.stop().animate(anim.hover.p0wrap, anim.hover.speed, options.easing);
                            if(options.shadows && !$.support.opacity) {
                                sB.css({'left': -0.38 * pWidth});
                            }
                            isHoveringLeft = true;
                        }
                    }
                }
            },
            endHoverAnimation = function (inc) {
                if((options.hovers && options.overlays) || options.manual){
                    if(inc) {
                        if(!isBusy && isHoveringRight && !p3drag && options.currentIndex + 2 <= options.pageTotal - 2) {
                            if(options.closed && options.autoCenter && options.currentIndex == 0) {
                                p2.stop().animate(anim.hover.p2closedEnd, anim.hover.speed, options.easing);
                                p3.stop().animate(anim.hover.p3closedEnd, anim.hover.speed, options.easing);
                            } else {
                                p2.stop().animate(anim.hover.p2end, anim.hover.speed, options.easing);
                                p3.stop().animate(anim.hover.p3end, anim.hover.speed, options.easing);
                            }
                            p3wrap.stop().animate(anim.hover.p3wrapEnd, anim.hover.speed, options.easing);
                            if(options.shadows && !$.support.opacity) {
                                sF.css({'left': 'auto'});
                            }
                            isHoveringRight = false;
                        }
                    } else {
                        if(!isBusy && isHoveringLeft && !p0drag && options.currentIndex - 2 >= 0) {
                            p1.stop().animate(anim.hover.p1end, anim.hover.speed, options.easing);
                            p1wrap.stop().animate(anim.hover.p1wrapEnd, anim.hover.speed, options.easing);
                            p0.stop().animate(anim.hover.p0end, anim.hover.speed, options.easing);
                            p0wrap.stop().animate(anim.hover.p0wrapEnd, anim.hover.speed, options.easing);
                            isHoveringLeft = false;
                        }
                    }
                }
            },
            startPageAnimation = function (diff, inc, shadow, speed) {
                // setup content
                if(inc && diff > 2) {

                    // initialize next 2 pages, if jumping forward in the book
                    target.find('.b-p3, .b-p4').removeClass('b-p3 b-p4').hide();
                    target.find('.b-page-' + options.currentIndex).addClass('b-p3').show().stop().css(css.p3);
                    target.find('.b-page-' + (options.currentIndex + 1)).addClass('b-p4').show().css(css.p4);
                    target.find('.b-page-' + options.currentIndex + ' .b-wrap').show().css(css.wrap);
                    target.find('.b-page-' + (options.currentIndex + 1) + ' .b-wrap').show().css(css.wrap);

                    p3 = target.find('.b-p3');
                    p4 = target.find('.b-p4');
                    p3wrap = target.find('.b-p3 .b-wrap');
                    p4wrap = target.find('.b-p4 .b-wrap');

                    if(options.closed && options.autoCenter && options.currentIndex - diff == 0) {
                        p3.css({'left': pWidth});
                        p4.css({'left': 0});
                    }

                    if(isHoveringRight) {
                        p3.css({'left': options.width - 40, 'width': 20, 'padding-left': 10});
                    }

                    if(options.shadows) {
                        target.find('.b-shadow-f').remove();
                        sF = $(templates.sF).css(css.sF).appendTo(p3);
                        shadow = sF;
                    }

                } else if(!inc && diff > 2) {

                    // initialize previous 2 pages, if jumping backwards in the book
                    target.find('.b-pN, .b-p0').removeClass('b-pN b-p0').hide();
                    target.find('.b-page-' + options.currentIndex).addClass('b-pN').show().css(css.pN);
                    target.find('.b-page-' + (options.currentIndex + 1)).addClass('b-p0').show().css(css.p0);
                    target.find('.b-page-' + options.currentIndex + ' .b-wrap').show().css(css.wrap);
                    target.find('.b-page-' + (options.currentIndex + 1) + ' .b-wrap').show().css(css.wrap);

                    pN = target.find('.b-pN');
                    p0 = target.find('.b-p0');
                    pNwrap = target.find('.b-pN .b-wrap');
                    p0wrap = target.find('.b-p0 .b-wrap');

                    if(options.closed && options.autoCenter) {
                        pN.css({'left': 0});
                    }
                    p0wrap.css(css.p0wrap);

                    if(isHoveringLeft) {
                        p0.css({left: 10, width: 40});
                        p0wrap.css({right: 10});
                    }

                    if(options.shadows) {
                        target.find('.b-shadow-b, .b-shadow-f').remove();
                        sB = $(templates.sB).appendTo(p0).css(css.sB);
                        shadow = sB;
                    }
                }

                // update page visibility
                // if moving to start and end of book
                if(options.closed) {
                    if(!inc && options.currentIndex == 0) {
                        pN.hide();
                    } else if(!inc) {
                        pN.show();
                    }
                    if(inc && options.currentIndex >= options.pageTotal - 2) {
                        p4.hide();
                    } else if(inc) {
                        p4.show();
                    }
                }

                // init shadows
                if(options.shadows) {
                    // check for opacity support -> animate shadow overlay on moving slide
                    if($.support.opacity) {
                        if(!p3drag && !p0drag) {
                            shadow.animate({opacity: 1}, speed, options.easeIn);
                        }
                        shadow.animate({opacity: 0}, speed, options.easeOut);
                    } else {
                        if(inc) {
                            shadow.animate({right: options.shadowTopFwdWidth}, speed*2, options.easeIn);
                        } else {
                            shadow.animate({left: options.shadowTopBackWidth}, speed*2, options.easeIn);
                        }
                    }
                }

                // init position animation
                if(options.closed && options.autoCenter) {
                    if(options.currentIndex == 0) {
                        p3.hide();
                        p4.hide();
                        target.animate({width: pWidth}, !p3drag && !p0drag ? speed*2 : speed, options.easing);
                    } else if(options.currentIndex >= options.pageTotal - 2) {
                        p0.hide();
                        pN.hide();
                        target.animate({width: pWidth}, speed*2, options.easing);
                    } else {
                        target.animate({width: options.width}, speed*2, options.easing);
                    }
                }

            },
            updateAfter = function () {
                updatePages();
                updateMenu();
                updateControlVisibility();
                isBusy = false;

                // callback when ending booklet animation
                callback = {
                    options: jQuery.extend({},options),
                    index: options.currentIndex,
                    pages: [pages[options.currentIndex].contentNode, pages[options.currentIndex+1].contentNode]
                };
                if(options.change) {
                    target.unbind(events.change+'.booklet').bind(events.change+'.booklet', options.change);
                }
                target.trigger(events.change, callback);
            };

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // PUBLIC FUNCTIONS
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        return {
            init: init,
            enable: enable,
            disable: disable,
            destroy: destroy,
            next: next,
            prev: prev,
            gotopage: function (index) {
                if(typeof index === 'string') {
                    // validate inputs
                    if(index == "start") {
                        index = 0;
                    } else if(index == "end") {
                        index = originalPageTotal - 1;
                    }
                } else if(typeof index === "number") {
                    if(index < 0 || index >= originalPageTotal) {
                        return;
                    }
                } else if(typeof index === "undefined") {
                    return;
                }
                // adjust for odd page
                if(index % 2 != 0) {
                    index -= 1;
                }
                // adjust for booklet direction
                if(options.direction == directions.rightToLeft) {
                    index = Math.abs(index - options.pageTotal) - 2;
                }
                goToPage(index);
            },
            add: addPage,
            remove: removePage,
            option: function(name, value) {
                if(typeof name === 'string') {
                    // if option exists
                    if(options[name]) {
                        if(typeof value !== 'undefined'){
                            // if value is sent in, set the option value and update options
                            options[name] = value;
                            updateOptions();
                        } else {
                            // if no value sent in, get the current option value
                            return options[name];
                        }
                    } else {
                        $.error('Option "' +  name + '" does not exist on jQuery.booklet.');
                    }
                } else if(typeof name === 'object'){
                    // if sending in an object, update options
                    updateOptions(name);
                } else if(typeof name === 'undefined' || !name) {
                    // return a copy of the options object, to avoid changes
                    return jQuery.extend({},options);
                }
            }
        }
    }

    // define default options
    $.fn.booklet.defaults = {
        name:                 null,                            // name of the booklet to display in the document title bar
        width:                600,                             // container width
        height:               400,                             // container height
        speed:                1000,                            // speed of the transition between pages
        direction:            'LTR',                           // direction of the overall content organization, default LTR, left to right, can be RTL for languages which read right to left
        startingPage:         0,                               // index of the first page to be displayed
        easing:               'easeInOutQuad',                 // easing method for complete transition
        easeIn:               'easeInQuad',                    // easing method for first half of transition
        easeOut:              'easeOutQuad',                   // easing method for second half of transition

        closed:               false,                           // start with the book "closed", will add empty pages to beginning and end of book
        closedFrontTitle:     'Beginning',                     // used with "closed", "menu" and "pageSelector", determines title of blank starting page
        closedFrontChapter:   'Beginning of Book',             // used with "closed", "menu" and "chapterSelector", determines chapter name of blank starting page
        closedBackTitle:      'End',                           // used with "closed", "menu" and "pageSelector", determines chapter name of blank ending page
        closedBackChapter:    'End of Book',                   // used with "closed", "menu" and "chapterSelector", determines chapter name of blank ending page
        covers:               false,                           // used with "closed", makes first and last pages into covers, without page numbers (if enabled)
        autoCenter:           false,                           // used with "closed", makes book position in center of container when closed

        pagePadding:          10,                              // padding for each page wrapper
        pageNumbers:          true,                            // display page numbers on each page
        pageBorder:           0,                               // size of the border around each page

        manual:               true,                            // enables manual page turning, requires jQuery UI to function
        hovers:               true,                            // enables preview page-turn hover animation, shows a small preview of previous or next page on hover
        hoverWidth:           50,                              // default width for page-turn hover preview
        hoverSpeed:           500,                             // default speed for page-turn hover preview
        hoverThreshold:       0.25,                            // default percentage used for manual page dragging, sets the percentage amount a drag must be before moving next or prev
        hoverClick:           true,                            // enables hovered arreas to be clicked when using manual page turning
        overlays:             false,                           // enables navigation using a page sized overlay, when enabled links inside the content will not be clickable
        tabs:                 false,                           // adds tabs along the top of the pages
        tabWidth:             60,                              // set the width of the tabs
        tabHeight:            20,                              // set the height of the tabs
        nextControlText:      'Next',                          // inline text for all 'next' controls
        previousControlText:  'Previous',                      // inline text for all 'previous' controls
        nextControlTitle:     'Next Page',                     // text for title attributes of all 'next' controls
        previousControlTitle: 'Previous Page',                 // text for title attributes of all 'previous' controls
        arrows:               false,                           // adds arrow overlays over the book edges
        arrowsHide:           false,                           // auto hides arrows when controls are not hovered
        cursor:               'pointer',                       // cursor css setting for side bar areas

        hash:                 false,                           // enables navigation using a hash string, ex: #/page/1 for page 1, will affect all booklets with 'hash' enabled
        hashTitleText:        " - Page ",                      // text which forms the hash page title, ex: (Name)" - Page "(1)
        keyboard:             true,                            // enables navigation with arrow keys (left: previous, right: next)
        next:                 null,                            // selector for element to use as click trigger for next page
        prev:                 null,                            // selector for element to use as click trigger for previous page
        auto:                 false,                           // enables automatic navigation, requires "delay"
        delay:                5000,                            // amount of time between automatic page flipping
        pause:                null,                            // selector for element to use as click trigger for pausing auto page flipping
        play:                 null,                            // selector for element to use as click trigger for restarting auto page flipping

        menu:                 null,                            // selector for element to use as the menu area, required for 'pageSelector'
        pageSelector:         false,                           // enables navigation with a drop-down menu of pages, requires 'menu'
        chapterSelector:      false,                           // enables navigation with a drop-down menu of chapters, determined by the "rel" attribute, requires 'menu'

        shadows:              true,                            // display shadows on page animations
        shadowTopFwdWidth:    166,                             // shadow width for top forward animation
        shadowTopBackWidth:   166,                             // shadow width for top back animation
        shadowBtmWidth:       50,                              // shadow width for bottom shadow

        create:               null,                            // called when booklet has been created
        start:                null,                            // called when booklet starts to change pages
        change:               null,                            // called when booklet has finished changing pages
        add:                  null,                            // called when booklet has added a page
        remove:               null                             // called when booklet has removed a page
    }

})(jQuery);
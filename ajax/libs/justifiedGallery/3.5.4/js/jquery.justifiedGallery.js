/*!
 * Justified Gallery - v3.5.4
 * http://miromannino.github.io/Justified-Gallery/
 * Copyright (c) 2015 Miro Mannino
 * Licensed under the MIT license.
 */
(function($) {

  /* Events
    jg.complete : called when all the gallery has been created
    jg.resize : called when the gallery has been resized
  */

  $.fn.justifiedGallery = function (arg) {

    // Default options
    var defaults = {
      sizeRangeSuffixes : {
        'lt100': '',  // e.g. Flickr uses '_t'
        'lt240': '',  // e.g. Flickr uses '_m' 
        'lt320': '',  // e.g. Flickr uses '_n' 
        'lt500': '',  // e.g. Flickr uses '' 
        'lt640': '',  // e.g. Flickr uses '_z'
        'lt1024': '', // e.g. Flickr uses '_b'
      },
      rowHeight : 120,
      maxRowHeight : 0, // negative value = no limits, 0 = 1.5 * rowHeight
      margins : 1,
      border: -1, // negative value = same as margins, 0 = disabled

      lastRow : 'nojustify', // or can be 'justify' or 'hide'
      justifyThreshold: 0.75, /* if row width / available space > 0.75 it will be always justified 
                                  (i.e. lastRow setting is not considered) */
      fixedHeight : false,
      waitThumbnailsLoad : true,
      captions : true,
      cssAnimation: false,
      imagesAnimationDuration : 500, // ignored with css animations
      captionSettings : { // ignored with css animations
        animationDuration : 500,
        visibleOpacity : 0.7, 
        nonVisibleOpacity : 0.0 
      },
      rel : null, // rewrite the rel of each analyzed links
      target : null, // rewrite the target of all links
      extension : /\.[^.\\/]+$/,
      refreshTime : 100,
      randomize : false
    };

    function getSuffix(width, height, context) {
      var longestSide;
      longestSide = (width > height) ? width : height;
      if (longestSide <= 100) {
        return context.settings.sizeRangeSuffixes.lt100;
      } else if (longestSide <= 240) {
        return context.settings.sizeRangeSuffixes.lt240;
      } else if (longestSide <= 320) {
        return context.settings.sizeRangeSuffixes.lt320;
      } else if (longestSide <= 500) {
        return context.settings.sizeRangeSuffixes.lt500;
      } else if (longestSide <= 640) {
        return context.settings.sizeRangeSuffixes.lt640;
      } else {
        return context.settings.sizeRangeSuffixes.lt1024;
      }
    }

    function endsWith(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    function removeSuffix(str, suffix) {
      return str.substring(0, str.length - suffix.length);
    }

    function getUsedSuffix(str, context) {
      var voidSuffix = false;
      for (var si in context.settings.sizeRangeSuffixes) {
        if (context.settings.sizeRangeSuffixes[si].length === 0) {
          voidSuffix = true;
          continue;
        }
        if (endsWith(str, context.settings.sizeRangeSuffixes[si])) {
          return context.settings.sizeRangeSuffixes[si];
        }
      }

      if (voidSuffix) return "";
      else throw 'unknown suffix for ' + str;
    }

    /* Given an image src, with the width and the height, returns the new image src with the
       best suffix to show the best quality thumbnail. */
    function newSrc(imageSrc, imgWidth, imgHeight, context) {
      var matchRes = imageSrc.match(context.settings.extension);
      var ext = (matchRes != null) ? matchRes[0] : '';
      var newImageSrc = imageSrc.replace(context.settings.extension, '');
      newImageSrc = removeSuffix(newImageSrc, getUsedSuffix(newImageSrc, context));
      newImageSrc += getSuffix(imgWidth, imgHeight, context) + ext;
      return newImageSrc;
    }

    function onEntryMouseEnterForCaption (ev) {
      var $caption = $(ev.currentTarget).find('.caption');
      if (ev.data.settings.cssAnimation) {
        $caption.addClass('caption-visible').removeClass('caption-hidden');
      } else {
        $caption.stop().fadeTo(ev.data.settings.captionSettings.animationDuration, 
                               ev.data.settings.captionSettings.visibleOpacity);
      }
    }

    function onEntryMouseLeaveForCaption (ev) {
      var $caption = $(ev.currentTarget).find('.caption');
      if (ev.data.settings.cssAnimation) {
        $caption.removeClass('caption-visible').removeClass('caption-hidden');
      } else {
        $caption.stop().fadeTo(ev.data.settings.captionSettings.animationDuration, 
                               ev.data.settings.captionSettings.nonVisibleOpacity);
      }
    }

    function showImg($entry, callback, context) {
      if (context.settings.cssAnimation) {
        $entry.addClass('entry-visible');
        callback();
      } else {
        $entry.stop().fadeTo(context.settings.imagesAnimationDuration, 1.0, callback);
      }
    }

    function hideImgImmediately($entry, context) {
      if (context.settings.cssAnimation) {
        $entry.removeClass('entry-visible');
      } else {
        $entry.stop().fadeTo(0, 0);
      }
    }

    function imgFromEntry($entry) {
      var $img = $entry.find('> img');
      if ($img.length === 0) $img = $entry.find('> a > img');    
      return $img;
    }

    function displayEntry($entry, x, y, imgWidth, imgHeight, rowHeight, context) {
      var $image = imgFromEntry($entry);
      $image.css('width', imgWidth);
      $image.css('height', imgHeight);
      //if ($entry.get(0) === $image.parent().get(0)) { // this creates an error in link_around_img test
        $image.css('margin-left', - imgWidth / 2);
        $image.css('margin-top', - imgHeight / 2);
      //}
      $entry.width(imgWidth);
      $entry.height(rowHeight);
      $entry.css('top', y);
      $entry.css('left', x);

      //DEBUG// console.log('displayEntry (w: ' + $image.width() + ' h: ' + $image.height());

      // Image reloading for an high quality of thumbnails
      var imageSrc = $image.attr('src');
      var newImageSrc = newSrc(imageSrc, imgWidth, imgHeight, context);

      $image.one('error', function () {
        //DEBUG// console.log('revert the original image');
        $image.attr('src', $image.data('jg.originalSrc')); //revert to the original thumbnail, we got it.
      });

      function loadNewImage() {
        if (imageSrc !== newImageSrc) { //load the new image after the fadeIn
          $image.attr('src', newImageSrc);
        }
      }

      if ($image.data('jg.loaded') === 'skipped') {
        onImageEvent(imageSrc, function() {
          showImg($entry, loadNewImage, context);
          $image.data('jg.loaded', true);
        });
      } else {
        showImg($entry, loadNewImage, context);
      }

      // Captions ------------------------------
      var captionMouseEvents = $entry.data('jg.captionMouseEvents');
      if (context.settings.captions === true) {
        var $imgCaption = $entry.find('.caption');
        if ($imgCaption.length === 0) { // Create it if it doesn't exists
          var caption = $image.attr('alt');
          if (typeof caption === 'undefined') caption = $entry.attr('title');
          if (typeof caption !== 'undefined') { // Create only we found something
            $imgCaption = $('<div class="caption">' + caption + '</div>');
            $entry.append($imgCaption);
          }
        }
      
        // Create events (we check again the $imgCaption because it can be still inexistent)
        if ($imgCaption.length !== 0) {
          if (!context.settings.cssAnimation) {
            $imgCaption.stop().fadeTo(context.settings.imagesAnimationDuration, 
                                      context.settings.captionSettings.nonVisibleOpacity); 
          }
          if (typeof captionMouseEvents === 'undefined') {
            captionMouseEvents = {
              mouseenter: onEntryMouseEnterForCaption,
              mouseleave: onEntryMouseLeaveForCaption
            };
            $entry.on('mouseenter', undefined, context, captionMouseEvents.mouseenter);
            $entry.on('mouseleave', undefined, context, captionMouseEvents.mouseleave);
            $entry.data('jg.captionMouseEvents', captionMouseEvents);
          }
        }
      } else {
        if (typeof captionMouseEvents !== 'undefined') {
          $entry.off('mouseenter', undefined, context, captionMouseEvents.mouseenter);
          $entry.off('mouseleave', undefined, context, captionMouseEvents.mouseleave);
          $entry.removeData('jg.captionMouseEvents');
        }
      }

    }

    function prepareBuildingRow(context, isLastRow) {
      var settings = context.settings;
      var i, $entry, $image, imgAspectRatio, newImgW, newImgH, justify = true;
      var minHeight = 0;
      var availableWidth = context.galleryWidth - 2 * context.border - (
                            (context.buildingRow.entriesBuff.length - 1) * settings.margins);
      var rowHeight = availableWidth / context.buildingRow.aspectRatio;
      var justificable = context.buildingRow.width / availableWidth > settings.justifyThreshold;

      //Skip the last row if we can't justify it and the lastRow == 'hide'
      if (isLastRow && settings.lastRow === 'hide' && !justificable) {
        for (i = 0; i < context.buildingRow.entriesBuff.length; i++) {
          $entry = context.buildingRow.entriesBuff[i];
          if (settings.cssAnimation) 
            $entry.removeClass('entry-visible');            
          else
            $entry.stop().fadeTo(0, 0);
        }
        return -1;
      }

      // With lastRow = nojustify, justify if is justificable (the images will not become too big)
      if (isLastRow && !justificable && settings.lastRow === 'nojustify') justify = false;

      for (i = 0; i < context.buildingRow.entriesBuff.length; i++) {
        $image = imgFromEntry(context.buildingRow.entriesBuff[i]);
        imgAspectRatio = $image.data('jg.imgw') / $image.data('jg.imgh');

        if (justify) {
          newImgW = (i === context.buildingRow.entriesBuff.length - 1) ? availableWidth 
                      : rowHeight * imgAspectRatio;
          newImgH = rowHeight;

          /* With fixedHeight the newImgH must be greater than rowHeight. 
          In some cases here this is not satisfied (due to the justification).
          But we comment it, because is better to have a shorter but justified row instead 
          to have a cropped image at the end. */
          /*if (settings.fixedHeight && newImgH < settings.rowHeight) {
            newImgW = settings.rowHeight * imgAspectRatio;
            newImgH = settings.rowHeight;
          }*/

        } else {
          newImgW = settings.rowHeight * imgAspectRatio;
          newImgH = settings.rowHeight;
        }

        availableWidth -= Math.round(newImgW);
        $image.data('jg.jimgw', Math.round(newImgW));
        $image.data('jg.jimgh', Math.ceil(newImgH));
        if (i === 0 || minHeight > newImgH) minHeight = newImgH;
      }

      if (settings.fixedHeight && minHeight > settings.rowHeight) 
        minHeight = settings.rowHeight;

      return {minHeight: minHeight, justify: justify};
    }

    function rewind(context) {
      context.lastAnalyzedIndex = -1;
      context.buildingRow.entriesBuff = [];
      context.buildingRow.aspectRatio = 0;
      context.buildingRow.width = 0;
      context.offY = context.border;
    }

    function flushRow(context, isLastRow) {
      var settings = context.settings;
      var $entry, $image, minHeight, buildingRowRes, offX = context.border;

      //DEBUG// console.log('flush (isLastRow: ' + isLastRow + ')');

      buildingRowRes = prepareBuildingRow(context, isLastRow);
      minHeight = buildingRowRes.minHeight;
      if (isLastRow && settings.lastRow === 'hide' && minHeight === -1) {
        context.buildingRow.entriesBuff = [];
        context.buildingRow.aspectRatio = 0;
        context.buildingRow.width = 0;
        return;
      }

      if (settings.maxRowHeight > 0 && settings.maxRowHeight < minHeight)
        minHeight = settings.maxRowHeight;
      else if (settings.maxRowHeight === 0 && (1.5 * settings.rowHeight) < minHeight)
        minHeight = 1.5 * settings.rowHeight;

      for (var i = 0; i < context.buildingRow.entriesBuff.length; i++) {
        $entry = context.buildingRow.entriesBuff[i];
        $image = imgFromEntry($entry);
        displayEntry($entry, offX, context.offY, $image.data('jg.jimgw'), 
                     $image.data('jg.jimgh'), minHeight, context);
        offX += $image.data('jg.jimgw') + settings.margins;
      }

      //Gallery Height
      context.$gallery.height(context.offY + minHeight + context.border + 
        (context.spinner.active ? context.spinner.$el.innerHeight() : 0)
      );

      if (!isLastRow || (minHeight <= context.settings.rowHeight && buildingRowRes.justify)) {
        //Ready for a new row
        context.offY += minHeight + context.settings.margins;

        //DEBUG// console.log('minHeight: ' + minHeight + ' offY: ' + context.offY);

        context.buildingRow.entriesBuff = []; //clear the array creating a new one
        context.buildingRow.aspectRatio = 0;
        context.buildingRow.width = 0;
        context.$gallery.trigger('jg.rowflush');
      }
    }

    function checkWidth(context) {
      context.checkWidthIntervalId = setInterval(function () {
        var galleryWidth = parseInt(context.$gallery.width(), 10);
        if (context.galleryWidth !== galleryWidth) {
          //DEBUG// console.log("resize. old: " + context.galleryWidth + " new: " + galleryWidth);
          
          context.galleryWidth = galleryWidth;
          rewind(context);

          // Restart to analyze
          startImgAnalyzer(context, true);
        }
      }, context.settings.refreshTime);
    } 

    function startLoadingSpinnerAnimation(spinnerContext) {
      clearInterval(spinnerContext.intervalId);
      spinnerContext.intervalId = setInterval(function () {
        if (spinnerContext.phase < spinnerContext.$points.length) 
          spinnerContext.$points.eq(spinnerContext.phase).fadeTo(spinnerContext.timeslot, 1);
        else
          spinnerContext.$points.eq(spinnerContext.phase - spinnerContext.$points.length)
                        .fadeTo(spinnerContext.timeslot, 0);
        spinnerContext.phase = (spinnerContext.phase + 1) % (spinnerContext.$points.length * 2);
      }, spinnerContext.timeslot);
    }

    function stopLoadingSpinnerAnimation(spinnerContext) {
      clearInterval(spinnerContext.intervalId);
      spinnerContext.intervalId = null;
    }

    function stopImgAnalyzerStarter(context) {
      context.yield.flushed = 0;
      if (context.imgAnalyzerTimeout !== null) clearTimeout(context.imgAnalyzerTimeout);
    }

    function startImgAnalyzer(context, isForResize) {
      stopImgAnalyzerStarter(context);
      context.imgAnalyzerTimeout = setTimeout(function () { 
        analyzeImages(context, isForResize); 
      }, 0.001);
      analyzeImages(context, isForResize);
    }

    function analyzeImages(context, isForResize) {
      
      /* //DEBUG// 
      var rnd = parseInt(Math.random() * 10000, 10);
      console.log('analyzeImages ' + rnd + ' start');
      console.log('images status: ');
      for (var i = 0; i < context.entries.length; i++) {
        var $entry = $(context.entries[i]);
        var $image = imgFromEntry($entry);
        console.log(i + ' (alt: ' + $image.attr('alt') + 'loaded: ' + $image.data('jg.loaded') + ')');
      }*/

      /* The first row */
      var settings = context.settings;
      var isLastRow;
      
      for (var i = context.lastAnalyzedIndex + 1; i < context.entries.length; i++) {
        var $entry = $(context.entries[i]);
        var $image = imgFromEntry($entry);

        if ($image.data('jg.loaded') === true || $image.data('jg.loaded') === 'skipped') {
          isLastRow = i >= context.entries.length - 1;

          var availableWidth = context.galleryWidth - 2 * context.border - (
                               (context.buildingRow.entriesBuff.length - 1) * settings.margins);
          var imgAspectRatio = $image.data('jg.imgw') / $image.data('jg.imgh');
          if (availableWidth / (context.buildingRow.aspectRatio + imgAspectRatio) < settings.rowHeight) {
            flushRow(context, isLastRow);
            if(++context.yield.flushed >= context.yield.every) {
              //DEBUG// console.log("yield");
              startImgAnalyzer(context, isForResize);
              return;
            }
          }

          context.buildingRow.entriesBuff.push($entry);
          context.buildingRow.aspectRatio += imgAspectRatio;
          context.buildingRow.width += imgAspectRatio * settings.rowHeight;
          context.lastAnalyzedIndex = i;

        } else if ($image.data('jg.loaded') !== 'error') {
          return;
        }
      }

      // Last row flush (the row is not full)
      if (context.buildingRow.entriesBuff.length > 0) flushRow(context, true);

      if (context.spinner.active) {
        context.spinner.active = false;
        context.$gallery.height(context.$gallery.height() - context.spinner.$el.innerHeight());
        context.spinner.$el.detach();
        stopLoadingSpinnerAnimation(context.spinner);
      }

      /* Stop, if there is, the timeout to start the analyzeImages.
          This is because an image can be set loaded, and the timeout can be set,
          but this image can be analyzed yet. 
      */
      stopImgAnalyzerStarter(context);

      //On complete callback
      if (!isForResize) 
        context.$gallery.trigger('jg.complete'); 
      else 
        context.$gallery.trigger('jg.resize');

      //DEBUG// console.log('analyzeImages ' + rnd +  ' end');
    }

    function checkSettings (context) {
      var settings = context.settings;

      function checkSuffixesRange(range) {
        if (typeof settings.sizeRangeSuffixes[range] !== 'string')
          throw 'sizeRangeSuffixes.' + range + ' must be a string';
      }

      function checkOrConvertNumber(parent, settingName) {
        if (typeof parent[settingName] === 'string') {
          parent[settingName] = parseFloat(parent[settingName], 10);
          if (isNaN(parent[settingName])) throw 'invalid number for ' + settingName;
        } else if (typeof parent[settingName] === 'number') {
          if (isNaN(parent[settingName])) throw 'invalid number for ' + settingName;
        } else {
          throw settingName + ' must be a number';
        }
      }

      if (typeof settings.sizeRangeSuffixes !== 'object')
        throw 'sizeRangeSuffixes must be defined and must be an object';

      checkSuffixesRange('lt100');
      checkSuffixesRange('lt240');
      checkSuffixesRange('lt320');
      checkSuffixesRange('lt500');
      checkSuffixesRange('lt640');
      checkSuffixesRange('lt1024');

      checkOrConvertNumber(settings, 'rowHeight');
      checkOrConvertNumber(settings, 'maxRowHeight');

      if (settings.maxRowHeight > 0 && 
          settings.maxRowHeight < settings.rowHeight) {
        settings.maxRowHeight = settings.rowHeight;
      }
      
      checkOrConvertNumber(settings, 'margins');
      checkOrConvertNumber(settings, 'border');

      if (settings.lastRow !== 'nojustify' &&
          settings.lastRow !== 'justify' &&
          settings.lastRow !== 'hide') {
        throw 'lastRow must be "nojustify", "justify" or "hide"';
      }

      checkOrConvertNumber(settings, 'justifyThreshold');
      if (settings.justifyThreshold < 0 || settings.justifyThreshold > 1)
        throw 'justifyThreshold must be in the interval [0,1]';
      if (typeof settings.cssAnimation !== 'boolean') {
        throw 'cssAnimation must be a boolean'; 
      }
      
      checkOrConvertNumber(settings.captionSettings, 'animationDuration');
      checkOrConvertNumber(settings, 'imagesAnimationDuration');

      checkOrConvertNumber(settings.captionSettings, 'visibleOpacity');
      if (settings.captionSettings.visibleOpacity < 0 || settings.captionSettings.visibleOpacity > 1)
        throw 'captionSettings.visibleOpacity must be in the interval [0, 1]';

      checkOrConvertNumber(settings.captionSettings, 'nonVisibleOpacity');
      if (settings.captionSettings.visibleOpacity < 0 || settings.captionSettings.visibleOpacity > 1)
        throw 'captionSettings.nonVisibleOpacity must be in the interval [0, 1]';

      if (typeof settings.fixedHeight !== 'boolean') {
        throw 'fixedHeight must be a boolean';  
      }

      if (typeof settings.captions !== 'boolean') {
        throw 'captions must be a boolean'; 
      }

      checkOrConvertNumber(settings, 'refreshTime');

      if (typeof settings.randomize !== 'boolean') {
        throw 'randomize must be a boolean';  
      }

    }

    function onImageEvent(imageSrc, onLoad, onError) {
      if (!onLoad && !onError) {
        return;
      }
      /* Check if the image is loaded or not using another image object.
       We cannot use the 'complete' image property, because some browsers,
       with a 404 set complete = true */
      var memImage = new Image();
      var $memImage = $(memImage);
      if (onLoad) {
        $memImage.one('load', function () {
          $memImage.off('load error');
          onLoad(memImage);
        });
      }
      if (onError) {
        $memImage.one('error', function() {
          $memImage.off('load error');
          onError(memImage);
        });
      }
      memImage.src = imageSrc;
    }

    return this.each(function (index, gallery) {

      var $gallery = $(gallery);
      $gallery.addClass('justified-gallery');

      var context = $gallery.data('jg.context');
      if (typeof context === 'undefined') {

        if (typeof arg !== 'undefined' && arg !== null && typeof arg !== 'object') 
          throw 'The argument must be an object';

        // Spinner init
        var $spinner = $('<div class="spinner"><span></span><span></span><span></span></div>');
        var extendedSettings = $.extend({}, defaults, arg);

        var border = extendedSettings.border >= 0 ? extendedSettings.border : extendedSettings.margins;

        //Context init
        context = {
          settings : extendedSettings,
          imgAnalyzerTimeout : null,
          entries : null,
          buildingRow : {
            entriesBuff : [],
            width : 0,
            aspectRatio : 0
          },
          lastAnalyzedIndex : -1,
          yield : {
            every : 2, /* do a flush every context.yield.every flushes (
                  * must be greater than 1, else the analyzeImages will loop */
            flushed : 0 //flushed rows without a yield
          },
          border : border,
          offY : border,
          spinner : {
            active : false,
            phase : 0,
            timeslot : 150,
            $el : $spinner,
            $points : $spinner.find('span'),
            intervalId : null
          },
          checkWidthIntervalId : null,
          galleryWidth :  $gallery.width(),
          $gallery : $gallery
        };

        $gallery.data('jg.context', context);

      } else if (arg === 'norewind') {
        /* Hide the image of the buildingRow to prevent strange effects when the row will be
           re-justified again */
        for (var i = 0; i < context.buildingRow.entriesBuff.length; i++) {
          hideImgImmediately(context.buildingRow.entriesBuff[i], context);
        }
        // In this case we don't rewind, and analyze all the images
      } else {
        context.settings = $.extend({}, context.settings, arg);
        context.border = context.settings.border >= 0 ? context.settings.border : context.settings.margins;
        rewind(context);
      }
      
      checkSettings(context);

      context.entries = $gallery.find('> a, > div:not(.spinner)').toArray();
      if (context.entries.length === 0) return;

      // Randomize
      if (context.settings.randomize) {
        context.entries.sort(function () { return Math.random() * 2 - 1; });
        $.each(context.entries, function () {
          $(this).appendTo($gallery);
        });
      }

      var imagesToLoad = false;
      var skippedImages = false;
      $.each(context.entries, function (index, entry) {
        var $entry = $(entry);
        var $image = imgFromEntry($entry);

        $entry.addClass('jg-entry');

        if ($image.data('jg.loaded') !== true && $image.data('jg.loaded') !== 'skipped') {

          // Link Rel global overwrite
          if (context.settings.rel !== null) $entry.attr('rel', context.settings.rel);

          // Link Target global overwrite
          if (context.settings.target !== null) $entry.attr('target', context.settings.target);

          // Image src
          var imageSrc = (typeof $image.data('safe-src') !== 'undefined') ? 
                            $image.data('safe-src') : $image.attr('src');
          $image.data('jg.originalSrc', imageSrc);
          $image.attr('src', imageSrc);

          var width = parseInt($image.attr('width'), 10);
          var height = parseInt($image.attr('height'), 10);
          if(context.settings.waitThumbnailsLoad !== true && !isNaN(width) && !isNaN(height)) {
            $image.data('jg.imgw', width);
            $image.data('jg.imgh', height);
            $image.data('jg.loaded', 'skipped');
            skippedImages = true;
            startImgAnalyzer(context, false);
            return true;
          }

          $image.data('jg.loaded', false);
          imagesToLoad = true;

          // Spinner start
          if (context.spinner.active === false) {
            context.spinner.active = true;
            $gallery.append(context.spinner.$el);
            $gallery.height(context.offY + context.spinner.$el.innerHeight());
            startLoadingSpinnerAnimation(context.spinner);
          }

          onImageEvent(imageSrc, function imgLoaded (loadImg) {
            //DEBUG// console.log('img load (alt: ' + $image.attr('alt') + ')');
            $image.data('jg.imgw', loadImg.width);
            $image.data('jg.imgh', loadImg.height);
            $image.data('jg.loaded', true);
            startImgAnalyzer(context, false);
          }, function imgLoadError () {
            //DEBUG// console.log('img error (alt: ' + $image.attr('alt') + ')');
            $image.data('jg.loaded', 'error');
            startImgAnalyzer(context, false);
          });

        }

      });

      if (!imagesToLoad && !skippedImages) startImgAnalyzer(context, false);
      checkWidth(context);
    });

  };
  
}(jQuery));

/**
 * Angular Carousel - Mobile friendly touch carousel for AngularJS
 * @version v0.0.1 - 2013-04-24
 * @link http://revolunet.com.github.com/angular-carousel
 * @author Julien Bouquillon <julien@revolunet.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
/*global angular, console, $*/

"use strict";

/*
Angular touch carousel with CSS GPU accel
http://github.com/revolunet/angular-carousel
*/

angular.module('angular-carousel', [])
  .directive('carousel', ['$document', function($document) {
    // track number of carousel instances
    var carousels = 0;
    return {
      restrict: 'A',
      scope: true,
      controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
        /*
          listen for item add/remove in the ng-repeat
          only used to resize the container based on the first slide added
        */
        var nbItems = 0;
        var width = 0;
        this.addElement = function(elm){
          nbItems++;
          if (nbItems===1) {
            // auto resize the container to fit the first slide
            width = elm[0].getBoundingClientRect().width;
            // todo : 2px substract because of some mobile viewports weirds behaviours (android)
            $element.parent().css('width', (this.getWidth() - 2) + 'px');
          }
        };
        this.removeElement = function(elm){
          nbItems--;
        };
        this.getWidth = function() {
          return width;
        };
      }],
      compile: function(tElement, tAttrs) {

        tElement.addClass('carousel-slides');
        tElement.find('li').attr('slide-announcer', true);

        return function(scope, iElement, iAttrs, controller) {
          // init some variables
          carousels++;
          var carouselId = 'carousel-' + carousels;
          var swiping = 0,
              startX = 0,
              startOffset  = 0,
              offset  = 0,
              curSlide = 0,
              minSwipePercentage = 0.1;

          // add a wrapper div that will hide overflow
          var carousel = iElement.wrap("<div id='" + carouselId +"' class='carousel-container'></div>"),
              container = carousel.parent();

          // todo : cannot access this controller method from a bound event ? #WTF
          container.getWidth = controller.getWidth;

          var getSlides = function() {
              /* returns items in the carousel */
              return carousel.find('li');
          };

          var getSlidesCount = function() {
              /* returns the detected number of items in the carousel */
              return getSlides().length;
          };

          var transformEvent = function(event) {
            /* allow mouseEvent + touchEvent */
            if ((typeof event.originalEvent !== 'undefined') && event.originalEvent.touches > 0)
              event = event.originalEvent.touches[0];
            else if ((typeof event.touches !== 'undefined') && event.touches.length > 0)
              event = event.touches[0];
            else if ((typeof event.changedTouches !== 'undefined') && event.changedTouches.length > 0)
              event = event.changedTouches[0];
            return event;
          };

          var swipeStart = function(event) {
            /* capture initial event position */
            event = transformEvent(event);
            if (swiping === 0) {
              swiping = 1;
              startX = event.clientX;
            }
            $document.bind('mouseup', swipeEnd);
          };

          var swipe = function(event) {
            /* follow cursor movement */
            if (swiping===0) return;
            event.preventDefault();
            event = transformEvent(event);

            var deltaX = event.clientX - startX;
            if (swiping === 1 && deltaX !== 0) {
              swiping = 2;
              startOffset = offset;
            }
            else if (swiping === 2) {
              var slideCount = getSlidesCount();
              // ratio is used for the 'rubber band' effect
              var ratio = 1;
              if ((curSlide === 0 && event.clientX > startX) || (curSlide === slideCount - 1 && event.clientX < startX))
                ratio = 3;
              offset = startOffset + deltaX / ratio;
              carousel.css({
                '-webkit-transform': 'translate3d(' + offset + 'px,0,0)'
              }).removeClass().addClass('carousel-noanimate');
            }
          };

          var swipeEnd = function(event) {
            $document.unbind('mouseup', swipeEnd);
            /* when movement ends, go to next slide or stay on the same */
            event = transformEvent(event);
            var slideCount = getSlidesCount(),
                prevSlide = curSlide;
            if (swiping > 0) {
              swiping = 0;
              curSlide = offset < startOffset ? curSlide + 1 : curSlide - 1;
              curSlide = Math.min(Math.max(curSlide, 0), slideCount - 1);
              var slideWidth = container.getWidth(),
                  delta = event.clientX - startX;
              if (Math.abs(delta) <= slideWidth * minSwipePercentage) {
                // prevent swipe if not swipped enough
                curSlide = prevSlide;
              }
              offset = curSlide * -slideWidth;
              carousel.removeClass('carousel-noanimate').addClass('carousel-animate').css('-webkit-transform', 'translate3d(' + offset + 'px,0,0)');
            }
          };

          // bind events
          container.bind('mousedown touchstart', swipeStart);
          container.bind('mousemove touchmove', swipe);
          container.bind('mouseup touchend', swipeEnd);

          scope.destroy = function(callback) {
              // todo
          };
        };
      }
    };
  }])
  .directive('slideAnnouncer', function() {
    /* listen to modifications on the ng-repeat */
    return {
      restrict: 'A',
      require : '^carousel',
      link: function(scope, element, attrs, slideAnnouncerCtrl) {
          if(!slideAnnouncerCtrl){
              return;
          }
          slideAnnouncerCtrl.addElement(element);
          scope.$on("$destroy",function(){
             slideAnnouncerCtrl.removeElement(element);
          });
      }
    };
  });

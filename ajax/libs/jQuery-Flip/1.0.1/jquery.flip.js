/*! flip - v1.0.0 - 2015-04-04
* https://github.com/nnattawat/flip
* Copyright (c) 2015 Nattawat Nonsung; Licensed MIT */
(function( $ ) {
  var flip = function($dom) {
    $dom.data("fliped", true);

    var rotateAxis = "rotate" + $dom.data("axis");
    $dom.find(".front").css({
      transform: rotateAxis + ($dom.data("reverse") ? "(-180deg)" : "(180deg)")
    });

    $dom.find(".back").css({
      transform: rotateAxis + "(0deg)"
    });
  };

  var unflip = function($dom) {
    $dom.data("fliped", false);

    var rotateAxis = "rotate" + $dom.data("axis");
    $dom.find(".front").css({
      transform: rotateAxis + "(0deg)"
    });

    $dom.find(".back").css({
      transform: rotateAxis + ($dom.data("reverse") ? "(180deg)" : "(-180deg)")
    });
  };

  $.fn.flip = function(options) {
    this.each(function(){
      var $dom = $(this);

      if (options !== undefined && typeof(options) == "boolean") { // Force flip the DOM
        if (options) {
          flip($dom);
        } else {
          unflip($dom);
        }
      } else { //Init flipable DOM
        var settings = $.extend({
          axis: "y",
          reverse: false,
          trigger: "click",
          speed: 500
        }, options );
        
        // save reverse and axis css to DOM for performing flip
        $dom.data("reverse", settings.reverse);
        $dom.data("axis", settings.axis);

        if (settings.axis.toLowerCase() == "x") {
          var prespective = $dom.outerHeight() * 2;
          var rotateAxis = "rotatex";
        } else {
          var prespective = $dom.outerWidth() * 2;
          var rotateAxis = "rotatey";
        }

        $dom.find(".back").css({
          transform: rotateAxis + "(" + (settings.reverse? "180deg" : "-180deg") + ")"
        });

        $dom.css({
          perspective: prespective,
          position: "relative"
        });

        var speedInSec = settings.speed / 1000 || 0.5;
        $dom.find(".front, .back")
          .outerHeight($dom.height())
          .outerWidth($dom.width())
          .css({
            "transform-style": "preserve-3d",
            position: "absolute",
            transition: "all " + speedInSec + "s ease-out",
            "backface-visibility": "hidden"
          });


        if (settings.trigger.toLowerCase() == "click") {
          $dom.find('button, a, input[type="submit"]').click(function (event) {
            event.stopPropagation();
          });

          $dom.click(function() {
            if ($dom.data("fliped")) {
              unflip($dom);
            } else {
              flip($dom);
            }
          });
        } else if (settings.trigger.toLowerCase() == "hover") {
          var performFlip = function() {
            $dom.unbind('mouseleave', performUnflip);

            flip($dom);

            setTimeout(function() {
              $dom.bind('mouseleave', performUnflip);
              if (!$dom.is(":hover")) {
                unflip($dom);
              }
            }, (settings.speed + 150));
          };

          var performUnflip = function() {
            unflip($dom);
          };

          $dom.mouseenter(performFlip);
          $dom.mouseleave(performUnflip);
        }
      }
    });

    return this;
  };
 
}( jQuery ));
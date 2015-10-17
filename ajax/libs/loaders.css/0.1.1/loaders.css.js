(function ($) {

  $(function() {

    var addDivs = function(n) {
      var arr = [];
      for (i = 1; i <= n; i++) {
        arr.push('<div></div>');
      }
      return arr;
    };

    $('.loader-inner.ball-pulse').html(addDivs(3));
    $('.loader-inner.ball-grid-pulse').html(addDivs(9));
    $('.loader-inner.ball-clip-rotate').html(addDivs(1));
    $('.loader-inner.ball-clip-rotate-pulse').html(addDivs(2));
    $('.loader-inner.square-spin').html(addDivs(1));
    $('.loader-inner.ball-clip-rotate-multiple').html(addDivs(2));
    $('.loader-inner.ball-pulse-rise').html(addDivs(5));
    $('.loader-inner.ball-rotate').html(addDivs(1));
    $('.loader-inner.cube-transition').html(addDivs(2));
    $('.loader-inner.ball-zig-zag').html(addDivs(2));
    $('.loader-inner.ball-zig-zag-deflect').html(addDivs(2));
    $('.loader-inner.ball-triangle-path').html(addDivs(3));
    $('.loader-inner.ball-scale').html(addDivs(1));
    $('.loader-inner.line-scale').html(addDivs(5));
    $('.loader-inner.line-scale-party').html(addDivs(4));
    $('.loader-inner.ball-scale-multiple').html(addDivs(3));
    $('.loader-inner.ball-pulse-sync').html(addDivs(3));
    $('.loader-inner.ball-beat').html(addDivs(3));
    $('.loader-inner.line-scale-pulse-out').html(addDivs(5));
    $('.loader-inner.line-scale-pulse-out-rapid').html(addDivs(5));
    $('.loader-inner.ball-scale-ripple').html(addDivs(1));
    $('.loader-inner.ball-scale-ripple-multiple').html(addDivs(3));
    $('.loader-inner.ball-spin-fade-loader').html(addDivs(8));
    $('.loader-inner.line-spin-fade-loader').html(addDivs(8));
    $('.loader-inner.triangle-skew-spin').html(addDivs(1));
    $('.loader-inner.pacman').html(addDivs(5));
    $('.loader-inner.ball-grid-beat').html(addDivs(9));
    $('.loader-inner.semi-circle-spin').html(addDivs(1));

  });

}).call(window, window.$ || window.jQuery || window.Zepto);

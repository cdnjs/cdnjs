/*
 * FFT plugin for dancer.js
 *
 * Usage of frequencies being 2px with 1px spacing:
 *
 * var dancer = new Dancer('song.ogg'),
 *     canvas = document.getElementById('fftcanvas');
 * dancer.fft( canvas, { width: 2, spacing: 1 });
 */

(function() {
  Dancer.addPlugin( 'fft', function( canvasEl, options ) {
    options = options || {};
    var
      ctx     = canvasEl.getContext( '2d' ),
      h       = canvasEl.height,
      w       = canvasEl.width,
      width   = options.width || 1,
      spacing = options.spacing || 0,
      count   = options.count || 512;

    ctx.fillStyle = options.fillStyle || "white";

    this.bind( 'update', function() {
      var spectrum = this.getSpectrum();
      ctx.clearRect( 0, 0, w, h );
      for ( var i = 0, l = spectrum.length; i < l && i < count; i++ ) {
        ctx.fillRect( i * ( spacing + width ), h, width, -spectrum[ i ] * h );
      }
    });

    return this;
  });
})();

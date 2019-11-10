$.noty.themes.metroui = {
  name    : 'metroui',
  helpers : {},
  modal   : {
    css: {
      position       : 'fixed',
      width          : '100%',
      height         : '100%',
      backgroundColor: '#000',
      zIndex         : 10000,
      opacity        : 0.6,
      display        : 'none',
      left           : 0,
      top            : 0
    }
  },
  style   : function () {

    this.$bar.css({
      overflow    : 'hidden',
      margin      : '4px 0',
      borderRadius: '0',
      position    : 'relative'
    });

    this.$progressBar.css({
      position       : 'absolute',
      left           : 0,
      bottom         : 0,
      height         : 4,
      width          : '100%',
      backgroundColor: '#000000',
      opacity        : 0.2,
      '-ms-filter'   : 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)',
      filter         : 'alpha(opacity=20)'
    });

    this.$message.css({
      textAlign: 'center',
      padding  : '1.25rem',
      width    : 'auto',
      position : 'relative'
    });

    this.$closeButton.css({
      position  : 'absolute',
      top       : '.25rem', right: '.25rem',
      width     : 10, height: 10,
      background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAxUlEQVR4AR3MPUoDURSA0e++uSkkOxC3IAOWNtaCIDaChfgXBMEZbQRByxCwk+BasgQRZLSYoLgDQbARxry8nyumPcVRKDfd0Aa8AsgDv1zp6pYd5jWOwhvebRTbzNNEw5BSsIpsj/kurQBnmk7sIFcCF5yyZPDRG6trQhujXYosaFoc+2f1MJ89uc76IND6F9BvlXUdpb6xwD2+4q3me3bysiHvtLYrUJto7PD/ve7LNHxSg/woN2kSz4txasBdhyiz3ugPGetTjm3XRokAAAAASUVORK5CYII=)",
      display   : 'none',
      cursor    : 'pointer'
    });

    this.$buttons.css({
      padding        : 5,
      textAlign      : 'right',
      borderTop      : '1px solid #ccc',
      backgroundColor: '#fff'
    });

    this.$buttons.find('button').css({
      marginLeft: 5
    });

    this.$buttons.find('button:first').css({
      marginLeft: 0
    });

    this.$bar.on({
      mouseenter: function () {
        $(this).find('.noty_close').stop().fadeTo('normal', 1);
      },
      mouseleave: function () {
        $(this).find('.noty_close').stop().fadeTo('normal', 0);
      }
    });

    switch (this.options.layout.name) {
      case 'top':
        this.$bar.css({
          border   : 'none',
          boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.3)"
        });
        break;
      case 'topCenter':
      case 'center':
      case 'bottomCenter':
      case 'inline':
        this.$bar.css({
          border   : 'none',
          boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.3)"
        });
        this.$message.css({textAlign: 'center'});
        break;
      case 'topLeft':
      case 'topRight':
      case 'bottomLeft':
      case 'bottomRight':
      case 'centerLeft':
      case 'centerRight':
        this.$bar.css({
          border   : 'none',
          boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.3)"
        });
        this.$message.css({textAlign: 'left'});
        break;
      case 'bottom':
        this.$bar.css({
          border   : 'none',
          boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.3)"
        });
        break;
      default:
        this.$bar.css({
          border   : 'none',
          boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.3)"
        });
        break;
    }

    switch (this.options.type) {
      case 'alert':
      case 'notification':
        this.$bar.css({backgroundColor: '#fff', border: 'none', color: '#1d1d1d'});
        break;
      case 'warning':
        this.$bar.css({backgroundColor: '#FA6800', border: 'none', color: '#fff'});
        this.$buttons.css({borderTop: '1px solid #FA6800'});
        break;
      case 'error':
        this.$bar.css({backgroundColor: '#CE352C', border: 'none', color: '#fff'});
        this.$message.css({fontWeight: 'bold'});
        this.$buttons.css({borderTop: '1px solid #CE352C'});
        break;
      case 'information':
        this.$bar.css({backgroundColor: '#1BA1E2', border: 'none', color: '#fff'});
        this.$buttons.css({borderTop: '1px solid #1BA1E2'});
        break;
      case 'success':
        this.$bar.css({backgroundColor: '#60A917', border: 'none', color: '#fff'});
        this.$buttons.css({borderTop: '1px solid #50C24E'});
        break;
      default:
        this.$bar.css({backgroundColor: '#fff', border: 'none', color: '#1d1d1d'});
        break;
    }
  },
  callback: {
    onShow : function () {

    },
    onClose: function () {

    }
  }
};
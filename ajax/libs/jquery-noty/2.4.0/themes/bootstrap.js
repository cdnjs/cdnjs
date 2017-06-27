$.noty.themes.bootstrapTheme = {
  name    : 'bootstrapTheme',
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
      top            : 0,
      wordBreak      : 'break-all'
    }
  },
  style   : function () {

    var containerSelector = this.options.layout.container.selector;
    $(containerSelector).addClass('list-group');

    this.$closeButton.append('<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>');
    this.$closeButton.addClass('close');

    this.$bar.addClass("list-group-item").css('padding', '0px').css('position', 'relative');

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

    switch (this.options.type) {
      case 'alert':
      case 'notification':
        this.$bar.addClass("list-group-item-info");
        break;
      case 'warning':
        this.$bar.addClass("list-group-item-warning");
        break;
      case 'error':
        this.$bar.addClass("list-group-item-danger");
        break;
      case 'information':
        this.$bar.addClass("list-group-item-info");
        break;
      case 'success':
        this.$bar.addClass("list-group-item-success");
        break;
    }

    this.$message.css({
      textAlign: 'center',
      padding  : '8px 10px 9px',
      width    : 'auto',
      position : 'relative'
    });
  },
  callback: {
    onShow : function () { },
    onClose: function () { }
  }
};


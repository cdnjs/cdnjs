$.noty.themes.semanticUI = {
  name    : 'semanticUI',

  template : '<div class="ui message"><div class="content"><div class="header"></div></div></div>',

  animation: {
    open : {
      animation: 'fade',
      duration : '800ms'
    },
    close: {
      animation: 'fade left',
      duration : '800ms'
    }
  },

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
    this.$message = this.$bar.find('.ui.message');

    this.$message.find('.header').html(this.options.header);
    this.$message.find('.content').append(this.options.text);

    this.$bar.css({
      margin: '0.5em'
    });

    if (this.options.icon) {
      this.$message.addClass('icon').prepend($('<i/>').addClass(this.options.icon));
    }

    switch (this.options.size) {
      case 'mini':
        this.$message.addClass('mini');
        break;
      case 'tiny':
        this.$message.addClass('tiny');
        break;
      case 'small':
        this.$message.addClass('small');
        break;
      case 'large':
        this.$message.addClass('large');
        break;
      case 'big':
        this.$message.addClass('big');
        break;
      case 'huge':
        this.$message.addClass('huge');
        break;
      case 'massive':
        this.$message.addClass('massive');
        break;
    }

    switch (this.options.type) {
      case 'info':
        this.$message.addClass('info');
        break;
      case 'warning':
        this.$message.addClass('warning');
        break;
      case 'error':
        this.$message.addClass('error');
        break;
      case 'negative':
        this.$message.addClass('negative');
        break;
      case 'success':
        this.$message.addClass('success');
        break;
      case 'positive':
        this.$message.addClass('positive');
        break;
      case 'floating':
        this.$message.addClass('floating');
        break;
    }
  },
  callback: {
    onShow : function () {
      // Enable transition
      this.$bar.addClass('transition');
      // Actual transition
      this.$bar.transition(this.options.animation.open);
    },
    onClose: function () {
      this.$bar.transition(this.options.animation.close);
    }
  }
};

// Livestamp.js / v1.0.0 / (c) 2012 Matt Bradley / MIT License
(function($, moment) {
  var updateInterval = 1e3,
      paused = false,
      $livestamps = $([]),

  init = function() {
    livestampGlobal.resume();
  },

  prep = function($jq, timestamp) {
    if (!moment.isMoment(timestamp))
      timestamp = parseFloat(timestamp) * 1e3;

    if (!isNaN(timestamp) || moment.isMoment(timestamp)) {
      var newData = $.extend({ }, { 'original': $jq.contents() }, $jq.data('livestampdata'));
      newData.moment = moment(timestamp);

      $jq.data('livestampdata', newData)
        .empty()
        .removeAttr('data-livestamp')
        .removeData('livestamp');

      $livestamps = $livestamps.add($jq);
    }
  },

  run = function() {
    if (paused) return;
    livestampGlobal.update();
    setTimeout(run, updateInterval);
  },

  livestampGlobal = {
    update: function() {
      $('[data-livestamp]').each(function() {
        var $this = $(this);
        prep($this, $this.data('livestamp'));
      });

      var toRemove = [ ];

      $livestamps.each(function() {
        var $this = $(this),
            data = $this.data('livestampdata');

        if (data === undefined)
          toRemove.push(this);
        else if (moment.isMoment(data.moment)) {
          var from = $this.html(),
              to = data.moment.fromNow();

          if (from != to) {
            var e = $.Event('change.livestamp');
            $this.trigger(e, [from, to]);
            if (!e.isDefaultPrevented())
              $this.html(to);
          }
        }
      });

      $livestamps = $livestamps.not(toRemove);
    },

    pause: function() {
      paused = true;
    },

    resume: function() {
      paused = false;
      run();
    },

    interval: function(interval) {
      if (interval === undefined)
        return updateInterval;
      updateInterval = interval;
    }
  },

  livestampLocal = {
    add: function($jq, timestamp) {
      if (timestamp === undefined || timestamp instanceof Date)
        timestamp = moment(timestamp);

      if (typeof timestamp != 'number' && !moment.isMoment(timestamp))
        return $jq;

      $jq.each(function() {
        prep($(this), timestamp);
      });

      livestampGlobal.update();
      return $jq;
    },

    destroy: function($jq) {
      $livestamps = $livestamps.not($jq);
      $jq.each(function() {
        var $this = $(this),
            data = $this.data('livestampdata');

        if (data === undefined)
          return $jq;

        $this
          .empty()
          .append(data.original !== undefined ? data.original : '')
          .removeData('livestampdata');
      });

      return $jq;
    },

    isLivestamp: function($jq) {
      return $jq.data('livestampdata') !== undefined;
    }
  };

  $.livestamp = livestampGlobal;
  $(init);
  $.fn.livestamp = function(method, options) {
    if (typeof method !== 'string') {
      options = method;
      method = 'add';
    }

    if ($.isFunction(livestampLocal[method]))
      return livestampLocal[method](this, options);

    return this;
  };
})(jQuery, moment);

function APlayer(option) {
    this.option = option;
    this.init();
}

APlayer.prototype.init = function () {
    this.option.element.innerHTML = ''
        + '<div class="aplayer-pic">'
        +     '<img src="' + this.option.music.pic + '">'
        +     '<div class="aplayer-button aplayer-pause aplayer-hide">'
        +         '<i class="demo-icon icon-pause"></i>'
        +     '</div>'
        +     '<div class="aplayer-button aplayer-play">'
        +         '<i class="demo-icon icon-play"></i>'
        +     '</div>'
        + '</div>'
        + '<div class="aplayer-info">'
        +     '<div class="aplayer-music">'
        +         '<span class="aplayer-title">' + this.option.music.title + '</span>'
        +         '<span class="aplayer-author"> - ' + this.option.music.author + '</span>'
        +         '<a href="#" title="分享至微博"><i class="demo-icon icon-weibo"></i></a>'
        +     '</div>'
        +     '<div class="aplayer-controller">'
        +         '<div class="aplayer-bar-wrap">'
        +             '<div class="aplayer-bar">'
        +                 '<div class="aplayer-loaded" style="width: 0%"></div>'
        +                 '<div class="aplayer-played" style="width: 0%">'
        +                     '<span class="aplayer-thumb"></span>'
        +                 '</div>'
        +             '</div>'
        +         '</div>'
        +         '<span class="aplayer-time"> - <span class="aplayer-ptime">00:00</span>/<span class="aplayer-dtime">00:00</span><i class="demo-icon icon-volume-down"></i></span>'
        +     '</div>'
        + '</div>';

    var _self = this;
    this.audio = document.createElement("audio");
    this.audio.src = this.option.music.url;
    this.audio.loop = true;

    this.audio.addEventListener('durationchange', function() {
        _self.option.element.getElementsByClassName('aplayer-dtime')[0].innerHTML = _self.secondToTime(_self.audio.duration);
    });
    this.audio.addEventListener('canplay', function() {
        _self.loadedTime = setInterval(function () {
            var percentage = _self.audio.buffered.end(_self.audio.buffered.length - 1) / _self.audio.duration;
            _self.updateBar.call(_self, 'loaded', percentage);
            if (percentage === 1) {
                clearInterval(_self.loadedTime);
            }
        }, 500);
    });

    this.playButton = this.option.element.getElementsByClassName('aplayer-play')[0];
    this.pauseButton = this.option.element.getElementsByClassName('aplayer-pause')[0];
    this.playButton.addEventListener('click', function () {
        _self.play.call(_self);
    });
    this.pauseButton.addEventListener('click', function () {
        _self.pause.call(_self);
    });

    this.playedBar = this.option.element.getElementsByClassName('aplayer-played')[0];
    this.loadedBar = this.option.element.getElementsByClassName('aplayer-loaded')[0];
    if (this.option.autoplay) {
        this.play();
    }
};

APlayer.prototype.play = function () {
    this.playButton.classList.add('aplayer-hide');
    this.pauseButton.classList.remove('aplayer-hide');
    this.audio.play();
    var _self = this;
    this.playedTime = setInterval(function () {
        _self.updateBar.call(_self, 'played', _self.audio.currentTime / _self.audio.duration);
        _self.option.element.getElementsByClassName('aplayer-ptime')[0].innerHTML = _self.secondToTime(_self.audio.currentTime);
    }, 100);
};

APlayer.prototype.pause = function () {
    this.pauseButton.classList.add('aplayer-hide');
    this.playButton.classList.remove('aplayer-hide');
    this.audio.pause();
    clearInterval(this.playedTime);
};

APlayer.prototype.updateBar = function (type, percentage) {
    this[type + 'Bar'].style.width = percentage * 100 + '%';
};

APlayer.prototype.secondToTime = function (second) {
    var add0 = function (num) {
        return num < 10 ? '0' + num : '' + num;
    };
    var min = parseInt(second / 60);
    var sec = parseInt(second - min * 60);
    return add0(min) + ':' + add0(sec);
};
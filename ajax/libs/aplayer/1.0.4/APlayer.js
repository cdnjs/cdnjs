function APlayer(option) {
    this.option = option;
}

APlayer.prototype.init = function () {
    // 填充HTML
    this.option.element.innerHTML = ''
        + '<div class="aplayer-pic">'
        +     '<img src="' + this.option.music.pic + '">'
        +     '<div class="aplayer-button aplayer-pause aplayer-hide">'
        +         '<i class="demo-icon aplayer-icon-pause"></i>'
        +     '</div>'
        +     '<div class="aplayer-button aplayer-play">'
        +         '<i class="demo-icon aplayer-icon-play"></i>'
        +     '</div>'
        + '</div>'
        + '<div class="aplayer-info">'
        +     '<div class="aplayer-music">'
        +         '<a href="javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f=\'http://v.t.sina.com.cn/share/share.php?appkey=2992571369\',u=z||d.location,p=[\'&url=\',e(u),\'&title=\',e(t||d.title),\'&source=\',e(r),\'&sourceUrl=\',e(l),\'&content=\',c||\'gb2312\',\'&pic=\',e(p||\'\')].join(\'\');function%20a(){if(!window.open([f,p].join(\'\'),\'mb\',[\'toolbar=0,status=0,resizable=1,width=440,height=430,left=\',(s.width-440)/2,\',top=\',(s.height-430)/2].join(\'\')))u.href=[f,p].join(\'\');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,\'\',\'\',\'' + this.option.music.pic + '\',\'' + '#APlayer音乐分享# ' + this.option.music.title + ' - ' + this.option.music.author + ' \',\'\',\'\'));" title="分享至微博"><i class="demo-icon aplayer-icon-weibo"></i></a>'
        +         '<span class="aplayer-title">' + this.option.music.title + '</span>'
        +         '<span class="aplayer-author"> - ' + this.option.music.author + '</span>'
        +     '</div>'
        +     '<div class="aplayer-controller">'
        +         '<div class="aplayer-bar-wrap">'
        +             '<div class="aplayer-bar">'
        +                 '<div class="aplayer-loaded" style="width: 0"></div>'
        +                 '<div class="aplayer-played" style="width: 0">'
        +                     '<span class="aplayer-thumb"></span>'
        +                 '</div>'
        +             '</div>'
        +         '</div>'
        +         '<span class="aplayer-time">'
        +             ' - <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span>'
        +             '<div class="aplayer-volume-wrap">'
        +                 '<i class="demo-icon aplayer-icon-volume-down"></i>'
        +                 '<div class="aplayer-volume-bar-wrap">'
        +                     '<div class="aplayer-volume-bar">'
        +                         '<div class="aplayer-volume" style="height: 80%"></div>'
        +                     '</div>'
        +                 '</div>'
        +             '</div>'
        +         '</span>'
        +     '</div>'
        + '</div>';

    // 创建audio元素
    this.audio = document.createElement("audio");
    this.audio.src = this.option.music.url;
    this.audio.loop = true;

    // 显示音频总时间
    var _self = this;
    this.audio.addEventListener('durationchange', function() {
        _self.option.element.getElementsByClassName('aplayer-dtime')[0].innerHTML = _self.secondToTime(_self.audio.duration);
    });

    // 显示加载进度条
    this.audio.addEventListener('canplay', function() {
        _self.loadedTime = setInterval(function () {
            var percentage = _self.audio.buffered.end(_self.audio.buffered.length - 1) / _self.audio.duration;
            _self.updateBar.call(_self, 'loaded', percentage, 'width');
            if (percentage === 1) {
                clearInterval(_self.loadedTime);
            }
        }, 500);
    });

    // 播放暂停按钮
    this.playButton = this.option.element.getElementsByClassName('aplayer-play')[0];
    this.pauseButton = this.option.element.getElementsByClassName('aplayer-pause')[0];
    this.playButton.addEventListener('click', function () {
        _self.play.call(_self);
    });
    this.pauseButton.addEventListener('click', function () {
        _self.pause.call(_self);
    });

    // 播放进度控制(拖拽滑块 点击进度条)
    this.playedBar = this.option.element.getElementsByClassName('aplayer-played')[0];
    this.loadedBar = this.option.element.getElementsByClassName('aplayer-loaded')[0];
    this.thumb = this.option.element.getElementsByClassName('aplayer-thumb')[0];
    this.bar = this.option.element.getElementsByClassName('aplayer-bar')[0];
    var barWidth;
    this.bar.addEventListener('click', function (event) {
        var e = event || window.event;
        barWidth = _self.bar.clientWidth;
        var percentage = (e.clientX - getElementViewLeft(_self.bar)) / barWidth;
        _self.updateBar.call(_self, 'played', percentage, 'width');
        _self.option.element.getElementsByClassName('aplayer-ptime')[0].innerHTML = _self.secondToTime(percentage * _self.audio.duration);
        _self.audio.currentTime = parseFloat(_self.playedBar.style.width) / 100 * _self.audio.duration;
    });

    this.thumb.addEventListener('mousedown', function () {
        barWidth = _self.bar.clientWidth;
        clearInterval(_self.playedTime);
        document.addEventListener('mousemove', thumbMove);
        document.addEventListener('mouseup', thumbUp);
    });

    function thumbMove (event) {
        var e = event || window.event;
        var percentage = (e.clientX - getElementViewLeft(_self.bar)) / barWidth;
        percentage = percentage > 0 ? percentage : 0;
        percentage = percentage < 1 ? percentage : 1;
        _self.updateBar.call(_self, 'played', percentage, 'width');
        _self.option.element.getElementsByClassName('aplayer-ptime')[0].innerHTML = _self.secondToTime(percentage * _self.audio.duration);
    }

    function thumbUp () {
        document.removeEventListener('mouseup', thumbUp);
        document.removeEventListener('mousemove', thumbMove);
        _self.audio.currentTime = parseFloat(_self.playedBar.style.width) / 100 * _self.audio.duration;
        _self.playedTime = setInterval(function () {
            _self.updateBar.call(_self, 'played', _self.audio.currentTime / _self.audio.duration, 'width');
            _self.option.element.getElementsByClassName('aplayer-ptime')[0].innerHTML = _self.secondToTime(_self.audio.currentTime);
        }, 100);
    }

    // 音量控制
    this.audio.volume = 0.8;
    this.volumeBar = this.option.element.getElementsByClassName('aplayer-volume')[0];
    var volumeBarWrap = this.option.element.getElementsByClassName('aplayer-volume-bar')[0];
    var volumeicon = _self.option.element.getElementsByClassName('aplayer-time')[0].getElementsByTagName('i')[0];
    var barHeight = 35;
    this.option.element.getElementsByClassName('aplayer-volume-bar-wrap')[0].addEventListener('click', function (event) {
        var e = event || window.event;
        var percentage = (barHeight - e.clientY + getElementViewTop(volumeBarWrap)) / barHeight;
        percentage = percentage > 0 ? percentage : 0;
        percentage = percentage < 1 ? percentage : 1;
        _self.updateBar.call(_self, 'volume', percentage, 'height');
        _self.audio.volume = percentage;
        if (_self.audio.muted) {
            _self.audio.muted = false;
        }
        if (percentage === 1) {
            volumeicon.className = 'demo-icon aplayer-icon-volume-up';
        }
        else {
            volumeicon.className = 'demo-icon aplayer-icon-volume-down';
        }
    });
    volumeicon.addEventListener('click', function () {
        if (_self.audio.muted) {
            _self.audio.muted = false;
            volumeicon.className = _self.audio.volume === 1 ? 'demo-icon aplayer-icon-volume-up' : 'demo-icon aplayer-icon-volume-down';
            _self.updateBar.call(_self, 'volume', _self.audio.volume, 'height');
        }
        else {
            _self.audio.muted = true;
            volumeicon.className = 'demo-icon aplayer-icon-volume-off';
            _self.updateBar.call(_self, 'volume', 0, 'height');
        }
    });

    // 获取元素相对窗口位置
    function getElementViewLeft (element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        var elementScrollLeft;
        while (current !== null){
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
        return actualLeft - elementScrollLeft;
    }
    function getElementViewTop (element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        var elementScrollTop;
        while (current !== null){
            actualTop += current. offsetTop;
            current = current.offsetParent;
        }
        elementScrollTop = document.body.scrollTop + document.documentElement.scrollTop;
        return actualTop - elementScrollTop;
    }

    // 自动播放
    if (this.option.autoplay) {
        this.play();
    }
};

// 播放
APlayer.prototype.play = function () {
    this.playButton.classList.add('aplayer-hide');
    this.pauseButton.classList.remove('aplayer-hide');
    this.audio.play();
    var _self = this;
    this.playedTime = setInterval(function () {
        _self.updateBar.call(_self, 'played', _self.audio.currentTime / _self.audio.duration, 'width');
        _self.option.element.getElementsByClassName('aplayer-ptime')[0].innerHTML = _self.secondToTime(_self.audio.currentTime);
    }, 100);
};

// 暂停
APlayer.prototype.pause = function () {
    this.pauseButton.classList.add('aplayer-hide');
    this.playButton.classList.remove('aplayer-hide');
    this.audio.pause();
    clearInterval(this.playedTime);
};

// 更新进度条(加载进度条 播放进度条)
APlayer.prototype.updateBar = function (type, percentage, direction) {
    percentage = percentage > 0 ? percentage : 0;
    percentage = percentage < 1 ? percentage : 1;
    this[type + 'Bar'].style[direction] = percentage * 100 + '%';
};

// 将秒数整理为 00:00 格式
APlayer.prototype.secondToTime = function (second) {
    var add0 = function (num) {
        return num < 10 ? '0' + num : '' + num;
    };
    var min = parseInt(second / 60);
    var sec = parseInt(second - min * 60);
    return add0(min) + ':' + add0(sec);
};
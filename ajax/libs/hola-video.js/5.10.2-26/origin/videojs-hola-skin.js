(function(window, vjs){
'use strict';
var volume_icon_svg = '<svg height="100%" width="100%" viewBox="0 0 36 36">'
    +'<defs><clipPath id="{vjs-volume-mask1}">'
    +'<path d="m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z"></path>'
    +'<path d="M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z"></path>'
    +'<path class="vjs-volume-mask" d="M 9.09,5.20 6.47,7.88 26.82,28.77 '
    +'29.66,25.99 z"></path></clipPath><clipPath id="{vjs-volume-mask2}">'
    +'<path class="vjs-volume-mask" d="m -11.45,-15.55 -4.44,4.51 20.45,20.94 '
    +'4.55,-4.66 z"></path></clipPath></defs>'
    +'<g clip-path="url(#{vjs-volume-mask1})"><path d="M8,21 L12,21 L17,26 '
    +'L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 '
    +'21.5,18 C21.5,16.26 20.48,14.74 19,14 Z"></path>'
    +'<path class="volume-level-2" d="M19,11.29 C21.89,12.15 24,'
    +'14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 '
    +'26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z"></path></g>'
    +'<path clip-path="url(#{vjs-volume-mask2})" d="M 9.25,9 7.98,10.27 '
    +'24.71,27 l 1.27,-1.27 Z"></path>'
    +'</svg>';
var fullscreen_svg = '<svg height="100%" width="100%" viewBox="0 0 36 36">'
    +'<g><path d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"/></g>'
    +'<g><path d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"/></g>'
    +'<g><path d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"/></g>'
    +'<g><path d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"/></g>'
    +'</svg>';
var exit_fullscreen_svg = '<svg height="100%" width="100%" viewBox="0 0 36 36">'
    +'<g><path d="m 20,26 2,0 0,-4 4,0 0,-2 -6,0 0,6 0,0 z"/></g>'
    +'<g><path d="m 10,22 4,0 0,4 2,0 0,-6 -6,0 0,2 0,0 z"/></g>'
    +'<g><path d="m 14,14 -4,0 0,2 6,0 0,-6 -2,0 0,4 0,0 z"/></g>'
    +'<g><path d="m 22,14 0,-4 -2,0 0,6 6,0 0,-2 -4,0 0,0 z"/></g>'
    +'</svg>';
var play_button_svg = '<svg height="100%" width="100%" viewBox="0 14 96 68">'
    +'<path d="M96,44.3v7.3c-0.1,7.7-1,15.5-1,15.5s-0.9,6.6-3.8,9.5c-3.6,3.8-'
    +'7.7,3.8-9.6,4c-13.4,1-33.5,0.9-33.5,0.9 c-0.8,0-25-0.2-32.5-0.9c-2.1-0.4'
    +'-6.9-0.3-10.6-4.1c-2.9-2.9-3.8-9.5-3.8-9.5s-1-7.7-1.1-15.5v-7.3c0.2-7.8,'
    +'1.1-15.5,1.1-15.5 s0.9-6.6,3.8-9.5c3.6-3.8,7.7-3.8,9.6-4.1c13.4-1,33.5-'
    +'0.9,33.5-0.9s20.1-0.1,33.5,0.9c1.9,0.2,5.9,0.2,9.6,4.1 c2.9,2.9,3.8,9.5,'
    +'3.8,9.5S95.9,36.6,96,44.3z M38.3,61.4L64,47.9L38.3,34.4V61.4z"/>'
    +'<polygon points="64,47.9 38.3,61.4 38.3,34.4" fill="#fff"/>'
    +'</svg>';
var slider_gaps = '<div class="vjs-slider-gap-left"></div>'
    +'<div class="vjs-slider-gap-right"></div>';
var skin = '.vjs5-hola-skin';
var custom_css = skin+' .vjs-big-play-button:hover .vjs-button-icon {'
    +'    fill: @play_button_color;'
    +'}'
    +skin+':not(.vjs-ad-playing) .vjs-progress-control .vjs-play-progress,'
    +skin+' .vjs-progress-control .vjs-mouse-display:before,'
    +skin+' .vjs-progress-control .vjs-play-progress:before,'
    +skin+' .vjs-captions-toggle>.vjs-button-icon:after {'
    +'    background-color: @seek_bar_color;'
    +'}';

function add_css(url, ver){
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', url+(ver ? '?'+ver : ''));
    document.getElementsByTagName('head')[0].appendChild(link);
}

var HolaSkin = function(player, opt){
    var _this = this;
    this.player = player;
    this.el = player.el();
    this.opt = opt;
    this.classes_added = [];
    player.on('dispose', function(){ _this.dispose(); });
    player.on('ready', function(){ _this.init(); });
    var resize = this._resize = this.resize.bind(this);
    player.on('resize', resize);
    player.on('fullscreenchange', function(){ setTimeout(resize); });
    window.addEventListener('resize', resize);
    this.apply();
    this.resize();
};

HolaSkin.prototype.apply = function(){
    var c, classes = [this.opt.className];
    if (this.opt.show_controls_before_start)
        classes.push('vjs-show-controls-before-start');
    if (this.opt.show_time_for_live)
        classes.push('vjs-show-time-for-live');
    while (c = classes.shift())
    {
        if (this.player.addClass(c))
            this.classes_added.push(c);
    }
};

HolaSkin.prototype.resize = function(){
    this.player.toggleClass('vjs-small', this.el.offsetWidth<=480);
};

HolaSkin.prototype.init = function(){
    var _this = this;
    var player = this.player;
    this.init_volume_button();
    this.has_played = false;
    var play_el = player.controlBar.playToggle.el();
    play_el.appendChild(vjs.createEl('div', {className: 'vjs-button-icon'}));
    player.on('play', function(){
        _this.is_ended = false;
        _this.update_state(player);
    })
    .on('ended', function(){
        _this.is_ended = true;
        _this.update_state(player);
    })
    .on('seeking', function(){
        // hide replay button if it's not rewind to the start (cur time == 0)
        if (player.currentTime())
        {
            _this.is_ended = false;
            _this.has_played = true;
        }
        else
            _this.has_played = false;
        _this.update_state(player);
    })
    .on('timeupdate', function(val, t1, t2){
        var has_pos = !!player.currentTime();
        if (has_pos==_this.has_played)
            return;
        _this.has_played = has_pos;
        _this.update_state(player);
    })
    .on('mouseleave', function(){
        if (!player.hasClass('vjs-settings-expanded'))
            player.userActive(false);
    });
    this.update_state(player);
    var control_bar = player.controlBar;
    var progress_holder = control_bar.progressControl.seekBar.el();
    progress_holder.insertAdjacentHTML('beforeend', slider_gaps);
    player.addChild('PlayAnimation');
    var volume_btn = control_bar.volumeMenuButton;
    var volume_slider = volume_btn.volumeBar.el();
    volume_slider.insertAdjacentHTML('beforeend', slider_gaps);
    volume_btn.on('mouseenter', function(){
        volume_btn.addClass('vjs-show-volume-button'); });
    var interval, report_activity = player.reportUserActivity.bind(player);
    control_bar.on('mouseenter', function(){
        interval = this.setInterval(report_activity, 250); });
    control_bar.on('mouseleave', function(){
        if (interval)
            this.clearInterval(interval);
        volume_btn.removeClass('vjs-show-volume-button');
    });
    var spacer_el = control_bar.customControlSpacer.el();
    control_bar.on('mousemove', function(e){
        var r = spacer_el.getBoundingClientRect();
        if (e.clientX>r.left || e.clientY<r.top)
            volume_btn.removeClass('vjs-show-volume-button');
    });
    if (this.opt.title)
        player.addChild('TopBar', {title: this.opt.title});
};

HolaSkin.prototype.update_state = function(player){
    var replay_classname = 'vjs-play-control-replay';
    player.controlBar.playToggle.toggleClass(replay_classname, this.is_ended);
    player.bigPlayButton.toggleClass(replay_classname, this.is_ended);
    player.toggleClass('vjs-pos-ended', this.is_ended && this.has_played);
    player.toggleClass('vjs-pos-started', this.has_played);
    var poster = player.posterImage.el();
    if (this.is_ended)
    {
        player.controlBar.playToggle.controlText('Replay');
        setTimeout(function(){ poster.style.opacity = 1; });
    }
    else
        poster.style.opacity = '';
};

HolaSkin.prototype.init_volume_button = function(){
    var player = this.player, btn = player.controlBar.volumeMenuButton;
    var override = function(obj, events, method, fn){
        var p = VolumeMenuButton.prototype;
        btn.off(obj, events, p[method]);
        btn.on(obj, events, fn);
        btn[method] = fn;
    };
    override(player, ['volumechange', 'loadstart'], 'volumeUpdate', function(){
        var i, el = this.el_, _this = this;
        var vol = !this.player_.muted() && this.player_.volume();
        var level = !vol ? 0 : vol<0.5 ? 1 : 2;
        for (i = 0; i < 2; i++)
            vjs.toggleClass(el, 'vjs-vol-'+i, i==level);
        var muted = !vol;
        if (this.muted_!==undefined && this.muted_==muted)
            return;
        this.muted_ = muted;
        this.controlText(muted ? 'Unmute' : 'Mute');
        var masks = el.querySelectorAll('.vjs-volume-mask');
        var from = vol ? 20 : 0, to = vol ? 0 : 20;
        var start = window.performance && window.performance.now();
        var animate = function(time){
            var progress = time ? (time-start)/250 : 1;
            var v = from+(to-from)*Math.max(Math.min(progress, 1), 0);
            for (i = 0; i < masks.length; i++)
                masks[i].setAttribute('transform', 'translate('+v+','+v+')');
            if (v!=to)
                _this.animId = window.requestAnimationFrame(animate);
        };
        if (!start || !window.requestAnimationFrame)
            return void animate();
        if (this.animId)
            window.cancelAnimationFrame(this.animId);
        this.animId = window.requestAnimationFrame(animate);
    });
    var prevent_click = false;
    override(btn, ['tap', 'click'], 'handleClick', function(){
        if (prevent_click)
            return;
        this.player_.muted(!this.player_.muted() && !!this.player_.volume());
        if (!this.player_.muted() && !this.player_.volume())
            this.player_.volume(1);
    });
    btn.on('mousedown', function(event){
        prevent_click = this.volumeBar.el().contains(event.target);
    });
    btn.volumeUpdate();
};

HolaSkin.prototype.dispose = function(){
    while (this.classes_added.length)
        this.player.removeClass(this.classes_added.pop());
    window.removeEventListener('resize', this._resize);
};

var MenuButton = vjs.getComponent('MenuButton');
var VolumeMenuButton = vjs.getComponent('VolumeMenuButton');
VolumeMenuButton.prototype.createEl = function(){
    var el = MenuButton.prototype.createEl.call(this);
    var id = this.player_.id();
    var svg = volume_icon_svg
        .replace(/{vjs-volume-mask1}/g, 'vjs-volume-mask1_'+id)
        .replace(/{vjs-volume-mask2}/g, 'vjs-volume-mask2_'+id);
    var icon = this.icon_ = vjs.createEl('div',
        {className: 'vjs-button-icon', innerHTML: svg});
    el.insertBefore(icon, el.firstChild);
    return el;
};
VolumeMenuButton.prototype.tooltipHandler = function(){
    return this.icon_;
};

var Button = vjs.getComponent('Button');
var FullscreenToggle = vjs.getComponent('FullscreenToggle');
FullscreenToggle.prototype.controlText_ = 'Full screen';
FullscreenToggle.prototype.createEl = function(){
    var el = Button.prototype.createEl.call(this);
    el.insertBefore(vjs.createEl('div', {
        className: 'vjs-button-icon vjs-fullscreen-icon',
        innerHTML: fullscreen_svg,
    }), el.firstChild);
    el.insertBefore(vjs.createEl('div', {
        className: 'vjs-button-icon vjs-exit-fullscreen-icon',
        innerHTML: exit_fullscreen_svg,
    }), el.firstChild);
    return el;
};
FullscreenToggle.prototype.updateHint = function(){
    this.controlText(this.player_.isFullscreen() ? 'Exit full screen' :
        'Full screen');
};

var BigPlayButton = vjs.getComponent('BigPlayButton');
BigPlayButton.prototype.createEl = function(){
    var el = Button.prototype.createEl.call(this);
    el.appendChild(vjs.createEl('div', {
        className: 'vjs-button-icon',
        innerHTML: play_button_svg,
    }));
    return el;
};

vjs.registerComponent('ControlsWatermark', vjs.extend(Button, {
    constructor: function(player, opt){
        Button.apply(this, arguments);
    },
    createEl: function(){
        var opt = this.options_;
        var el = vjs.createEl('div', {className: 'vjs-controls-watermark'});
        if (!opt.image)
            return el;
        var container = opt.url ? vjs.createEl('a', {href: opt.url,
            target: '_blank'}) : el;
        if (opt.url)
            el.insertBefore(container, el.firstChild);
        container.appendChild(vjs.createEl('img', {src: opt.image}));
        return el;
    },
    buildCSSClass: function(){
        return 'vjs-controls-watermark '+
            Button.prototype.buildCSSClass.apply(this, arguments);
    }
}));

var SeekBar = vjs.getComponent('SeekBar');
var orig_createEl = SeekBar.prototype.createEl;
SeekBar.prototype.createEl = function(){
    var el = orig_createEl.call(this);
    el.appendChild(vjs.createEl('div', {className: 'vjs-slider-padding'}));
    return el;
};

var ControlBar = vjs.getComponent('ControlBar');
var controlbar_createEl = ControlBar.prototype.createEl;
ControlBar.prototype.createEl = function(){
    var el = controlbar_createEl.call(this);
    el.appendChild(vjs.createEl('div',
        {className: 'vjs-gradient vjs-bottom-gradient'}));
    return el;
};

var Component = vjs.getComponent('Component');
vjs.registerComponent('PlayAnimation', vjs.extend(Component, {
    constructor: function(player, opt){
        Component.apply(this, arguments);
        var _this = this, timeout;
        player.on(['videoclick'], function(){
            if (!player.hasStarted())
                return;
            _this.el_.style.display = 'block';
            _this.clearTimeout(timeout);
            timeout = _this.setTimeout(function(){
                _this.el_.style.display = '';
            }, 500);
        });
    },
    createEl: function(){
        var el = Component.prototype.createEl.apply(this, arguments);
        el.className = 'vjs-play-animation';
        return el;
    },
}));

vjs.registerComponent('TopBar', vjs.extend(Component, {
    createEl: function(){
        var el = vjs.createEl('div', {className: 'vjs-top-bar'});
        el.appendChild(vjs.createEl('div',
            {className: 'vjs-gradient vjs-top-gradient'}));
        el.appendChild(vjs.createEl('div', {className: 'vjs-video-title',
            innerHTML: this.options_.title}));
        return el;
    },
}));

var LoadingSpinner = vjs.getComponent('LoadingSpinner');
var spinner_createEl = LoadingSpinner.prototype.createEl;
LoadingSpinner.prototype.createEl = function(){
    var el = spinner_createEl.call(this);
    var rotator = vjs.createEl('div', {className: 'vjs-spinner-rotator'});
    rotator.appendChild(vjs.createEl('div', {className: 'vjs-spinner-left'}));
    rotator.appendChild(vjs.createEl('div', {className: 'vjs-spinner-right'}));
    el.appendChild(rotator);
    return el;
};

var Tooltip = vjs.getComponent('Tooltip');
var tooltip_show = Tooltip.prototype.show;
Tooltip.prototype.show = function(){
    if (this.timeout)
    {
        this.clearTimeout(this.timeout);
        this.timeout = 0;
    }
    return tooltip_show.apply(this, arguments);
};

var defaults = {
    className: 'vjs5-hola-skin',
    css: '/css/videojs-hola-skin.css',
    ver: 'ver=0.0.5-75'
};

vjs.plugin('hola_skin', function(options){
    if (options === false)
        options = {css: false, className: false};
    var opt = vjs.mergeOptions(defaults, options);
    if (opt.css && (!options.className || options.css))
        add_css(opt.css, opt.ver);
    add_css('//fonts.googleapis.com/css?family=Roboto:400,500');
    if (opt.play_button_color||opt.seek_bar_color)
    {
        custom_css = custom_css
            .replace(/@play_button_color/g, opt.play_button_color||'#00b7f1')
            .replace(/@seek_bar_color/g, opt.seek_bar_color||'#00b7f1');
        require('browserify-css').createStyle(custom_css);
    }
    new HolaSkin(this, opt);
});

}(window, window.videojs));

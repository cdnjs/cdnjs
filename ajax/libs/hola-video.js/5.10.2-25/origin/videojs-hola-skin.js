(function(window, vjs){
'use strict';

// helpers

function add_css(url, ver){
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', url+(ver ? '?'+ver : ''));
    document.getElementsByTagName('head')[0].appendChild(link);
}

function get_class_name(element){
    return element.className.split(/\s+/g);
}

function add_class_name(element, class_name){
    var classes = get_class_name(element);
    if (classes.indexOf(class_name)==-1)
    {
        classes.push(class_name);
        element.className = classes.join(' ');
        return true;
    }
    return false;
}

function remove_class_name(element, class_name){
    var classes = get_class_name(element);
    var class_index = classes.indexOf(class_name);
    if (class_index>=0)
    {
        classes.splice(class_index, 1);
        element.className = classes.join(' ');
    }
}

// main skin code

var HolaSkin = function(video, opt){
    var _this = this;
    this.vjs = video;
    this.el = video.el();
    this.opt = opt;
    this.intv = 0;
    this.stagger = 5;
    this.steptotal = 5;
    this.classes_added = [];
    this.vjs.on('dispose', function(){ _this.dispose(); });
    this.vjs.on('ready', function(){ _this.init(); });
    this._resize = this.resize.bind(this);
    this.vjs.on('resize', this._resize);
    window.addEventListener('resize', this._resize);
    this.apply();
    this.resize();
};

HolaSkin.prototype.apply = function(){
    var c, classes = [this.opt.className];
    if (this.opt.show_controls_before_start)
        classes.push('vjs-show-controls-before-start');
    while ((c = classes.shift()))
    {
        if (add_class_name(this.el, c))
            this.classes_added.push(c);
    }
};

HolaSkin.prototype.resize = function(){
    var vjs_large = 'vjs-large';
    if (this.el.offsetWidth>=768)
        add_class_name(this.el, vjs_large);
    else
        remove_class_name(this.el, vjs_large);
};

// play/pause curves and transform
var play1 = 'M 0,0 0,20 14,10 Z';
var play2 = 'M 0,0 0,20 0,10 Z';
var pause1 = 'M 0,0 0,0 0,20 0,20 M 0,0 0,0 0,20 0,20 Z';
var pause2 = 'M 0,0 5,0 5,20 0,20 M 9,0 14,0 14,20 9,20 Z';
var replay = '';
var morph_html = [
    '<svg height="3em" width="3em" viewBox="-13 -10 40 40">',
        '<g id="move">',
            '<g id="{morph}">',
                '<path d="M 0,0 5,0 5,20 0,20 M 9,0 14,0 14,20 9,20 Z"/>',
                '<path d="M 0,0 0,20 14,10 Z"/>',
                '<g class="replay">',
                    '<g class="arrow">',
                        '<path class="st1" d="M50,50.3c-3.6,3.5-8.5,5.7-14,5.7c-11,0-20-9-20-20s9-20,20-20s20,9,20,20"/>',
                        '<polygon class="st2" points="64,36 48,36 56,46"/>',
                    '</g>',
                '</g>',
            '</g>',
        '</g>',
    '</svg>'].join('');
var umorph_html = [
    '<svg width="100%" height="100%" viewBox="-15 -10 40 40">',
        '<use id="u{morph}" xlink:href="#{morph}" x="0" y="0"/>',
    '</svg>'].join('');

var volume_icon_svg = '<svg height="2.8em" width="2.8em" viewBox="-5 -7 30 30">'
    +'<polygon points="4,5 4,5 0,5 0,11 4,11 4,11 8,16 8,0"/>'
    +'<polygon class="volume-level-0" points="11.5,4 10,5.5 12.5,8 10,10.5 11.5,12 14,9.5 16.5,12 18,10.5 15.5,8 18,5.5 16.5,4 14,6.5"/>'
    +'<g>'
        +'<path class="volume-level-1" d="M10,4.6v6.9c1.2-0.7,2-2,2-3.4S11.2,5.2,10,4.6z"/>'
        +'<path class="volume-level-2" d="M16,8c0-2.2-0.9-4.2-2.3-5.6L12,3.6c1.2,1.1,2,2.7,2,4.4c0,1.8-0.8,3.3-2,4.4l1.7,1.2C15.1,12.2,16,10.2,16,8z"/>'
        +'<path class="volume-level-3" d="M16.9,0l-1.6,1.2C17,3,18,5.4,18,8c0,2.6-1,5-2.7,6.8l1.6,1.2c1.9-2.1,3.1-4.9,3.1-8C20,4.9,18.8,2.1,16.9,0z"/>'
    +'</g>'
+'</svg>';

var gap_name = 'vjs-slider-gap';
var slider_gaps = '<div class="'+gap_name+'-left"></div><div class="'+gap_name+'-right"></div>';

HolaSkin.prototype.set_play_button_state = function(btn_svg, state){
    if (this.play_state==state)
        return;
    this.play_state = state;
    var intv = this.intv;
    var _this = this;
    var steptotal = this.steptotal;
    var stagger = this.stagger;
    function mk_transition(from, to, steps){
        return (function(){
            var start = isNaN(from) ? from : parseFloat(from);
            var delta = isNaN(from) ? '' : (parseFloat(to)-start)/
                parseFloat(steps);
            return (function(){ return start += delta; });
        }());
    }
    function mk_transform(from_path, to_path, steps){
        var path1pts = from_path.split(' ').slice(1, -1);
        var path2pts = to_path.split(' ').slice(1, -1);
        return (function(){
            var pathgen = path1pts.map(function(coord, index){
                return coord.split(',').map(function(fld, idx){
                    return mk_transition(fld,
                        path2pts[index].split(',')[idx], steps);
                });
            });
            return (function(){
                return pathgen.reduce(function(prev, curr){
                    if (curr.length==1)
                        return prev+' '+curr[0]();
                    return prev+' '+curr.reduce(function(prv, crr){
                        return prv()+','+crr();
                    });
                }, 'M')+' Z';
            });
        }());
    }
    var umorph = document.getElementById('umorph_'+this.vjs.id());
    var bars = btn_svg.getElementsByTagName('path');
    var stepcnt = 0, stepcnt1 = 0;
    if (intv)
        clearInterval(intv);
    if (state=='ended')
    {
        umorph.setAttribute('transform', 'translate(-2, 0)');
        // XXX michaelg workaround: chrome sometimes won't re-render <use> tag
        // when the xlinked group is updated by css. This forces the update
        // by applying transform to one of the invisible elements of xlinked
        // group.
        var render_cnt = 5;
        var render_intv = setInterval(function(){
            bars[0].setAttribute('transform', 'rotate('+render_cnt+')');
            render_cnt--;
            if(render_cnt<0)
                clearInterval(render_intv);
        }, 100);
        // end workaround
        btn_svg.parentNode.setAttribute('transform', 'translate(0, 0)');
        bars[0].setAttribute('d', replay);
        bars[1].setAttribute('display', 'none');
        return;
    }
    bars[1].removeAttribute('display');
    var is_transformed = btn_svg.parentNode.getAttribute('transform');
    btn_svg.parentNode.removeAttribute('transform');
    umorph.removeAttribute('transform');
    // need to clear the attribute to avoid glitch with transition from
    // replay icon to animated pause icon
    if (is_transformed)
        bars[0].setAttribute('d', '');
    if (state=='paused')
    {
        var mk_path3 = mk_transform(play2, play1, steptotal);
        var mk_path4 = mk_transform(pause2, pause1, steptotal);
        this.intv = setInterval(function(){
            if (stepcnt < steptotal)
                bars[1].setAttribute('d', mk_path4());
            if (stepcnt >= stagger)
                bars[0].setAttribute('d', mk_path3());
            stepcnt++;
            if (stepcnt >= steptotal+stagger)
            {
                clearInterval(_this.intv);
                _this.intv = 0;
            }
        }, 20);
        return;
    }

    var mk_path1 = mk_transform(play1, play2, steptotal);
    var mk_path2 = mk_transform(pause1, pause2, steptotal);
    this.intv = setInterval(function(){
        if (stepcnt < steptotal)
            bars[0].setAttribute('d', mk_path1());
        if (stepcnt >= stagger)
            bars[1].setAttribute('d', mk_path2());
        stepcnt++;
        if (stepcnt >= steptotal+stagger)
        {
            clearInterval(_this.intv);
            _this.intv = 0;
        }
    }, 20);
};

HolaSkin.prototype.init = function(){
    var _this = this;
    var player = this.vjs;
    // play button special treatment: both buttons share a single shape
    // that's how it is morphed simultaneously
    if (!!this.opt.no_play_transform)
    {
        this.steptotal = 1;
        this.stagger = 0;
    }
    this.has_played = false;
    var play_button = player.controlBar.playToggle.el();
    play_button.insertAdjacentHTML('beforeend',
        morph_html.replace(/{morph}/g, 'morph_'+player.id()));
    player.bigPlayButton.el().insertAdjacentHTML('beforeend',
        umorph_html.replace(/{morph}/g, 'morph_'+player.id()));
    player.on('play', function(){
        _this.is_ended = false;
        _this.update_state(player);
    })
    .on('pause', function(){ _this.update_state(player); })
    .on('adend', function(){ _this.update_state(player); })
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
    });
    this.update_state(player);
    var volume_slider = player.controlBar.volumeMenuButton.volumeBar.el();
    volume_slider.insertAdjacentHTML('beforeend', slider_gaps);
    var progress_holder = player.controlBar.progressControl.seekBar.el();
    progress_holder.insertAdjacentHTML('beforeend', slider_gaps);
};

HolaSkin.prototype.update_state = function(player){
    var play_button = player.controlBar.playToggle.el();
    var big_play_button = player.bigPlayButton.el();
    var replay_classname = 'vjs-play-control-replay';
    var started_classname = 'vjs-pos-started';
    var ended_classname = 'vjs-pos-ended';
    if (this.is_ended)
    {
        add_class_name(play_button, replay_classname);
        add_class_name(big_play_button, replay_classname);
        add_class_name(player.el_, ended_classname);
    }
    else
    {
        remove_class_name(play_button, replay_classname);
        remove_class_name(big_play_button, replay_classname);
        remove_class_name(player.el_, ended_classname);
    }
    if (this.has_played)
        add_class_name(player.el_, started_classname);
    else
    {
        remove_class_name(player.el_, started_classname);
        remove_class_name(player.el_, ended_classname);
    }
    this.set_play_button_state(document.getElementById('morph_'+player.id()),
        this.is_ended ? 'ended' : player.paused() ? 'paused' : 'playing');
};

HolaSkin.prototype.dispose = function(){
    while (this.classes_added.length)
        remove_class_name(this.el, this.classes_added.pop());
    window.removeEventListener('resize', this._resize);
};

// update some vjs controls

var MenuButton = vjs.getComponent('MenuButton');
var VolumeMenuButton = vjs.getComponent('VolumeMenuButton');
VolumeMenuButton.prototype.createEl = function(){
    var el = MenuButton.prototype.createEl.call(this);

    var icon = this.icon_ = document.createElement('div');
    icon.setAttribute('class', 'vjs-button-icon');
    icon.innerHTML = volume_icon_svg;
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

    var icon = this.icon_ = document.createElement('div');
    icon.setAttribute('class', 'vjs-button-icon');
    el.insertBefore(icon, el.firstChild);

    return el;
};
FullscreenToggle.prototype.updateHint = function(){
    if (this.player_.isFullscreen()) {
        this.controlText('Exit full screen');
    } else {
        this.controlText('Full screen');
    }
};

var defaults = {
    className: 'vjs5-hola-skin',
    css: '/css/videojs-hola-skin.css',
    ver: 'ver=0.0.5-39'
};

// VideoJS plugin register

vjs.plugin('hola_skin', function(options){
    if (options === false)
        options = {css: false, className: false};
    var opt = vjs.mergeOptions(defaults, options);
    if (opt.css && (!options.className || options.css))
        add_css(opt.css, opt.ver);
    new HolaSkin(this, opt);
});

}(window, window.videojs));

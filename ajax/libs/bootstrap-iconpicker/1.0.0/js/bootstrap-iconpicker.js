/* ========================================================================
 * Bootstrap: bootstrap-iconpicker.js v1.0.0
 * https://victor-valencia.github.com/bootstrap-iconpicker
 * ========================================================================
 * Copyright 2013 Victor Valencia Rico.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";


    // ICONPICKER PUBLIC CLASS DEFINITION
    // ==============================
    var Iconpicker = function (element, options) {
      this.$element = $(element);
      this.options  = $.extend({}, Iconpicker.DEFAULTS, this.$element.data());      
      this.options  = $.extend({}, this.options, options);      
    };

    Iconpicker.ICONSET = {
        glyphicon : [
            'glyphicon-adjust',
            'glyphicon-align-center',
            'glyphicon-align-justify',
            'glyphicon-align-left',
            'glyphicon-align-right',
            'glyphicon-arrow-down',
            'glyphicon-arrow-left',
            'glyphicon-arrow-right',
            'glyphicon-arrow-up',
            'glyphicon-asterisk',
            'glyphicon-backward',
            'glyphicon-ban-circle',
            'glyphicon-barcode',
            'glyphicon-bell',
            'glyphicon-bold',
            'glyphicon-book',
            'glyphicon-bookmark',
            'glyphicon-briefcase',
            'glyphicon-bullhorn',
            'glyphicon-calendar',
            'glyphicon-camera',
            'glyphicon-certificate',
            'glyphicon-check',
            'glyphicon-chevron-down',
            'glyphicon-chevron-left',
            'glyphicon-chevron-right',
            'glyphicon-chevron-up',
            'glyphicon-circle-arrow-down',
            'glyphicon-circle-arrow-left',
            'glyphicon-circle-arrow-right',
            'glyphicon-circle-arrow-up',
            'glyphicon-cloud',
            'glyphicon-cloud-download',
            'glyphicon-cloud-upload',
            'glyphicon-cog',
            'glyphicon-collapse-down',
            'glyphicon-collapse-up',
            'glyphicon-comment',
            'glyphicon-compressed',
            'glyphicon-copyright-mark',
            'glyphicon-credit-card',
            'glyphicon-cutlery',
            'glyphicon-dashboard',
            'glyphicon-download',
            'glyphicon-download-alt',
            'glyphicon-earphone',
            'glyphicon-edit',
            'glyphicon-eject',
            'glyphicon-envelope',
            'glyphicon-euro',
            'glyphicon-exclamation-sign',
            'glyphicon-expand',
            'glyphicon-export',
            'glyphicon-eye-close',
            'glyphicon-eye-open',
            'glyphicon-facetime-video',
            'glyphicon-fast-backward',
            'glyphicon-fast-forward',
            'glyphicon-file',
            'glyphicon-film',
            'glyphicon-filter',
            'glyphicon-fire',
            'glyphicon-flag',
            'glyphicon-flash',
            'glyphicon-floppy-disk',
            'glyphicon-floppy-open',
            'glyphicon-floppy-remove',
            'glyphicon-floppy-save',
            'glyphicon-floppy-saved',
            'glyphicon-folder-close',
            'glyphicon-folder-open',
            'glyphicon-font',
            'glyphicon-forward',
            'glyphicon-fullscreen',
            'glyphicon-gbp',
            'glyphicon-gift',
            'glyphicon-glass',
            'glyphicon-globe',
            'glyphicon-hand-down',
            'glyphicon-hand-left',
            'glyphicon-hand-right',
            'glyphicon-hand-up',
            'glyphicon-hd-video',
            'glyphicon-hdd',
            'glyphicon-header',
            'glyphicon-headphones',
            'glyphicon-heart',
            'glyphicon-heart-empty',
            'glyphicon-home',
            'glyphicon-import',
            'glyphicon-inbox',
            'glyphicon-indent-left',
            'glyphicon-indent-right',
            'glyphicon-info-sign',
            'glyphicon-italic',
            'glyphicon-leaf',
            'glyphicon-link',
            'glyphicon-list',
            'glyphicon-list-alt',
            'glyphicon-lock',
            'glyphicon-log-in',
            'glyphicon-log-out',
            'glyphicon-magnet',
            'glyphicon-map-marker',
            'glyphicon-minus',
            'glyphicon-minus-sign',
            'glyphicon-move',
            'glyphicon-music',
            'glyphicon-new-window',
            'glyphicon-off',
            'glyphicon-ok',
            'glyphicon-ok-circle',
            'glyphicon-ok-sign',
            'glyphicon-open',
            'glyphicon-paperclip',
            'glyphicon-pause',
            'glyphicon-pencil',
            'glyphicon-phone',
            'glyphicon-phone-alt',
            'glyphicon-picture',
            'glyphicon-plane',
            'glyphicon-play',
            'glyphicon-play-circle',
            'glyphicon-plus',
            'glyphicon-plus-sign',
            'glyphicon-print',
            'glyphicon-pushpin',
            'glyphicon-qrcode',
            'glyphicon-question-sign',
            'glyphicon-random',
            'glyphicon-record',
            'glyphicon-refresh',
            'glyphicon-registration-mark',
            'glyphicon-remove',
            'glyphicon-remove-circle',
            'glyphicon-remove-sign',
            'glyphicon-repeat',
            'glyphicon-resize-full',
            'glyphicon-resize-horizontal',
            'glyphicon-resize-small',
            'glyphicon-resize-vertical',
            'glyphicon-retweet',
            'glyphicon-road',
            'glyphicon-save',
            'glyphicon-saved',
            'glyphicon-screenshot',
            'glyphicon-sd-video',
            'glyphicon-search',
            'glyphicon-send',
            'glyphicon-share',
            'glyphicon-share-alt',
            'glyphicon-shopping-cart',
            'glyphicon-signal',
            'glyphicon-sort',
            'glyphicon-sort-by-alphabet',
            'glyphicon-sort-by-alphabet-alt',
            'glyphicon-sort-by-attributes',
            'glyphicon-sort-by-attributes-alt',
            'glyphicon-sort-by-order',
            'glyphicon-sort-by-order-alt',
            'glyphicon-sound-5-1',
            'glyphicon-sound-6-1',
            'glyphicon-sound-7-1',
            'glyphicon-sound-dolby',
            'glyphicon-sound-stereo',
            'glyphicon-star',
            'glyphicon-star-empty',
            'glyphicon-stats',
            'glyphicon-step-backward',
            'glyphicon-step-forward',
            'glyphicon-stop',
            'glyphicon-subtitles',
            'glyphicon-tag',
            'glyphicon-tags',
            'glyphicon-tasks',
            'glyphicon-text-height',
            'glyphicon-text-width',
            'glyphicon-th',
            'glyphicon-th-large',
            'glyphicon-th-list',
            'glyphicon-thumbs-down',
            'glyphicon-thumbs-up',
            'glyphicon-time',
            'glyphicon-tint',
            'glyphicon-tower',
            'glyphicon-transfer',
            'glyphicon-trash',
            'glyphicon-tree-conifer',
            'glyphicon-tree-deciduous',
            'glyphicon-unchecked',
            'glyphicon-upload',
            'glyphicon-usd',
            'glyphicon-user',
            'glyphicon-volume-down',
            'glyphicon-volume-off',
            'glyphicon-volume-up',
            'glyphicon-warning-sign',
            'glyphicon-wrench',
            'glyphicon-zoom-in',
            'glyphicon-zoom-out' 
        ],
        fontawesome : [
            'fa-adjust',
            'fa-anchor',
            'fa-archive',
            //'fa-arrows',
            //'fa-arrows-h',
            //'fa-arrows-v',
            'fa-asterisk',
            'fa-ban',
            'fa-bar-chart-o',
            'fa-barcode',
            //'fa-bars',
            'fa-beer',
            'fa-bell',
            'fa-bell-o',
            'fa-bolt',
            'fa-book',
            'fa-bookmark',
            'fa-bookmark-o',
            'fa-briefcase',
            'fa-bug',
            //'fa-building-o',
            'fa-bullhorn',
            'fa-bullseye',
            'fa-calendar',
            'fa-calendar-o',
            'fa-camera',
            'fa-camera-retro',
            'fa-caret-square-o-down',
            'fa-caret-square-o-left',
            'fa-caret-square-o-right',
            'fa-caret-square-o-up',
            'fa-certificate',
            'fa-check',
            'fa-check-circle',
            'fa-check-circle-o',
            'fa-check-square',
            'fa-check-square-o',
            'fa-circle',
            'fa-circle-o',
            'fa-clock-o',
            'fa-cloud',
            'fa-cloud-download',
            'fa-cloud-upload',
            'fa-code',
            'fa-code-fork',
            'fa-coffee',
            'fa-cog',
            'fa-cogs',
            'fa-comment',
            'fa-comment-o',
            'fa-comments',
            'fa-comments-o',
            'fa-compass',
            'fa-credit-card',
            'fa-crop',
            'fa-crosshairs',
            'fa-cutlery',
            'fa-dashboard',
            'fa-desktop',
            'fa-dot-circle-o',
            'fa-download',
            'fa-edit',
            //'fa-ellipsis-h',
            //'fa-ellipsis-v',
            'fa-envelope',
            'fa-envelope-o',
            'fa-eraser',
            'fa-exchange',
            'fa-exclamation',
            'fa-exclamation-circle',
            'fa-exclamation-triangle',
            'fa-external-link',
            'fa-external-link-square',
            'fa-eye',
            'fa-eye-slash',
            'fa-female',
            'fa-fighter-jet',
            'fa-film',
            'fa-filter',
            'fa-fire',
            'fa-fire-extinguisher',
            'fa-flag',
            'fa-flag-checkered',
            'fa-flag-o',
            'fa-flash',
            'fa-flask',
            'fa-folder',
            'fa-folder-o',
            'fa-folder-open',
            'fa-folder-open-o',
            'fa-frown-o',
            'fa-gamepad',
            'fa-gavel',
            'fa-gear',
            'fa-gears',
            'fa-gift',
            'fa-glass',
            'fa-globe',
            'fa-group',
            //'fa-hdd-o',
            'fa-headphones',
            'fa-heart',
            'fa-heart-o',
            'fa-home',
            'fa-inbox',
            'fa-info',
            'fa-info-circle',
            'fa-key',
            'fa-keyboard-o',
            'fa-laptop',
            'fa-leaf',
            'fa-legal',
            'fa-lemon-o',
            'fa-level-down',
            'fa-level-up',
            'fa-lightbulb-o',
            'fa-location-arrow',
            'fa-lock',
            'fa-magic',
            'fa-magnet',
            'fa-mail-forward',
            'fa-mail-reply',
            'fa-mail-reply-all',
            'fa-male',
            'fa-map-marker',
            'fa-meh-o',
            'fa-microphone',
            'fa-microphone-slash',
            'fa-minus',
            'fa-minus-circle',
            'fa-minus-square',
            'fa-minus-square-o',
            'fa-mobile',
            'fa-mobile-phone',
            'fa-money',
            'fa-moon-o',
            'fa-music',
            'fa-pencil',
            'fa-pencil-square',
            'fa-pencil-square-o',
            'fa-phone',
            'fa-phone-square',
            'fa-picture-o',
            'fa-plane',
            'fa-plus',
            'fa-plus-circle',
            'fa-plus-square',
            //'fa-plus-square-o',
            'fa-power-off',
            'fa-print',
            'fa-puzzle-piece',
            'fa-qrcode',
            'fa-question',
            'fa-question-circle',
            'fa-quote-left',
            'fa-quote-right',
            'fa-random',
            'fa-refresh',
            'fa-reply',
            'fa-reply-all',
            'fa-retweet',
            'fa-road',
            'fa-rocket',
            'fa-rss',
            'fa-rss-square',
            'fa-search',
            'fa-search-minus',
            'fa-search-plus',
            'fa-share',
            'fa-share-square',
            'fa-share-square-o',
            'fa-shield',
            'fa-shopping-cart',
            'fa-sign-in',
            'fa-sign-out',
            'fa-signal',
            'fa-sitemap',
            'fa-smile-o',
            'fa-sort',
            'fa-sort-alpha-asc',
            'fa-sort-alpha-desc',
            'fa-sort-amount-asc',
            'fa-sort-amount-desc',
            'fa-sort-asc',
            'fa-sort-desc',
            'fa-sort-down',
            'fa-sort-numeric-asc',
            'fa-sort-numeric-desc',
            'fa-sort-up',
            'fa-spinner',
            'fa-square',
            'fa-square-o',
            'fa-star',
            'fa-star-half',
            'fa-star-half-empty',
            'fa-star-half-full',
            'fa-star-half-o',
            'fa-star-o',
            'fa-subscript',
            'fa-suitcase',
            'fa-sun-o',
            'fa-superscript',
            'fa-tablet',
            'fa-tachometer',
            'fa-tag',
            'fa-tags',
            'fa-tasks',
            'fa-terminal',
            'fa-thumb-tack',
            'fa-thumbs-down',
            'fa-thumbs-o-down',
            'fa-thumbs-o-up',
            'fa-thumbs-up',
            'fa-ticket',
            'fa-times',
            'fa-times-circle',
            'fa-times-circle-o',
            'fa-tint',
            'fa-toggle-down',
            'fa-toggle-left',
            'fa-toggle-right',
            'fa-toggle-up',
            'fa-trash-o',
            'fa-trophy',
            'fa-truck',
            'fa-umbrella',
            'fa-unlock',
            //'fa-unlock-alt',
            'fa-unsorted',
            'fa-upload',
            'fa-user',
            //'fa-users',
            'fa-video-camera',
            'fa-volume-down',
            'fa-volume-off',
            'fa-volume-up',
            'fa-warning',
            'fa-wheelchair',
            'fa-wrench',
            'fa-check-square',
            'fa-check-square-o',
            'fa-circle',
            'fa-circle-o',
            'fa-dot-circle-o',
            'fa-minus-square',
            'fa-minus-square-o',
            'fa-plus-square',
            //'fa-plus-square-o',
            'fa-square',
            'fa-square-o',
            'fa-bitcoin',
            'fa-btc',
            'fa-cny',
            'fa-dollar',
            'fa-eur',
            'fa-euro',
            'fa-gbp',
            'fa-inr',
            'fa-jpy',
            'fa-krw',
            'fa-money',
            'fa-rmb',
            'fa-rouble',
            'fa-rub',
            'fa-ruble',
            'fa-rupee',
            'fa-try',
            'fa-turkish-lira',
            'fa-usd',
            'fa-won',
            'fa-yen',
            'fa-align-center',
            'fa-align-justify',
            'fa-align-left',
            'fa-align-right',
            'fa-bold',
            'fa-chain',
            'fa-chain-broken',
            'fa-clipboard',
            'fa-columns',
            'fa-copy',
            'fa-cut',
            'fa-dedent',
            'fa-eraser',
            'fa-file',
            'fa-file-o',
            'fa-file-text',
            'fa-file-text-o',
            'fa-files-o',
            'fa-floppy-o',
            'fa-font',
            'fa-indent',
            'fa-italic',
            'fa-link',
            'fa-list',
            'fa-list-alt',
            'fa-list-ol',
            'fa-list-ul',
            'fa-outdent',
            'fa-paperclip',
            'fa-paste',
            'fa-repeat',
            'fa-rotate-left',
            'fa-rotate-right',
            'fa-save',
            'fa-scissors',
            'fa-strikethrough',
            'fa-table',
            'fa-text-height',
            'fa-text-width',
            'fa-th',
            'fa-th-large',
            'fa-th-list',
            'fa-underline',
            'fa-undo',
            'fa-unlink',
            'fa-angle-double-down',
            'fa-angle-double-left',
            'fa-angle-double-right',
            'fa-angle-double-up',
            'fa-angle-down',
            'fa-angle-left',
            'fa-angle-right',
            'fa-angle-up',
            'fa-arrow-circle-down',
            'fa-arrow-circle-left',
            'fa-arrow-circle-o-down',
            'fa-arrow-circle-o-left',
            'fa-arrow-circle-o-right',
            'fa-arrow-circle-o-up',
            'fa-arrow-circle-right',
            'fa-arrow-circle-up',
            'fa-arrow-down',
            'fa-arrow-left',
            'fa-arrow-right',
            'fa-arrow-up',
            //'fa-arrows',
            //'fa-arrows-alt',
            //'fa-arrows-h',
            //'fa-arrows-v',
            'fa-caret-down',
            'fa-caret-left',
            'fa-caret-right',
            'fa-caret-square-o-down',
            'fa-caret-square-o-left',
            'fa-caret-square-o-right',
            'fa-caret-square-o-up',
            'fa-caret-up',
            'fa-chevron-circle-down',
            'fa-chevron-circle-left',
            'fa-chevron-circle-right',
            'fa-chevron-circle-up',
            'fa-chevron-down',
            'fa-chevron-left',
            'fa-chevron-right',
            'fa-chevron-up',
            'fa-hand-o-down',
            'fa-hand-o-left',
            'fa-hand-o-right',
            'fa-hand-o-up',
            'fa-long-arrow-down',
            'fa-long-arrow-left',
            'fa-long-arrow-right',
            'fa-long-arrow-up',
            'fa-toggle-down',
            'fa-toggle-left',
            'fa-toggle-right',
            'fa-toggle-up',
            //'fa-arrows-alt',
            'fa-backward',
            //'fa-compress',
            'fa-eject',
            //'fa-expand',
            'fa-fast-backward',
            'fa-fast-forward',
            'fa-forward',
            'fa-pause',
            'fa-play',
            'fa-play-circle',
            'fa-play-circle-o',
            'fa-step-backward',
            'fa-step-forward',
            'fa-stop',
            'fa-youtube-play',
            'fa-adn',
            'fa-android',
            'fa-apple',
            'fa-bitbucket',
            'fa-bitbucket-square',
            'fa-bitcoin',
            'fa-btc',
            'fa-css3',
            'fa-dribbble',
            'fa-dropbox',
            'fa-facebook',
            'fa-facebook-square',
            'fa-flickr',
            'fa-foursquare',
            'fa-github',
            'fa-github-alt',
            'fa-github-square',
            'fa-gittip',
            'fa-google-plus',
            'fa-google-plus-square',
            'fa-html5',
            'fa-instagram',
            'fa-linkedin',
            'fa-linkedin-square',
            'fa-linux',
            'fa-maxcdn',
            'fa-pagelines',
            'fa-pinterest',
            'fa-pinterest-square',
            'fa-renren',
            'fa-skype',
            'fa-stack-exchange',
            'fa-stack-overflow',
            'fa-trello',
            'fa-tumblr',
            'fa-tumblr-square',
            'fa-twitter',
            'fa-twitter-square',
            'fa-vimeo-square',
            'fa-vk',
            'fa-weibo',
            'fa-windows',
            'fa-xing',
            'fa-xing-square',
            'fa-youtube',
            'fa-youtube-play',
            'fa-youtube-square',
            'fa-ambulance',
            'fa-h-square',
            //'fa-hospital-o',
            'fa-medkit',
            'fa-plus-square',
            'fa-stethoscope',
            'fa-user-md',
            'fa-wheelchair'        
        ]
    };  

    Iconpicker.DEFAULTS = {
        iconset: 'glyphicon',
        icon: '',
        rows: 4,
        cols: 4,
        placement: 'right',
    };

    Iconpicker.prototype.createButtonBar = function(){    
        var op = this.options;
        var tr = $('<tr></tr>');
        for(var i = 0; i < op.cols; i++){
            var btn = $('<button class="btn btn-primary"><span class="glyphicon"></span></button>');        
            var td = $('<td class="text-center"></td>');
            if(i == 0 || i == op.cols - 1){            
                btn.val((i==0) ? -1: 1);
                btn.addClass((i==0) ? 'btn-previous': 'btn-next');
                btn.find('span').addClass( (i == 0) ? 'glyphicon-arrow-left': 'glyphicon-arrow-right');            
                td.append(btn);
                tr.append(td);
            }
            else if(tr.find('.page-count').length == 0){
                td.attr('colspan', op.cols - 2).append('<span class="page-count"></span>');
                tr.append(td);            
            }            
        }
        op.table.find('thead').append(tr); 
    };
  
    Iconpicker.prototype.updateButtonBar = function(page){
        var op = this.options;
        var total_pages = Math.ceil( op.icons.length / (op.cols * op.rows) );
        op.table.find('.page-count').html(page + ' / ' + total_pages);
        if(page == 1){
            op.table.find('.btn-previous').addClass('disabled');    
        }
        else{
            op.table.find('.btn-previous').removeClass('disabled');
        }
        if(page == total_pages){
            op.table.find('.btn-next').addClass('disabled');    
        }
        else{
            op.table.find('.btn-next').removeClass('disabled');
        }
    };
  
    Iconpicker.prototype.bindEvents = function(){
        var op = this.options;
        var el = this;
        op.table.find('.btn-previous, .btn-next').off('click').on('click', function(){        
            var inc = parseInt($(this).val());
            el.changeList(op.page + inc);
        });
        op.table.find('.btn-icon').off('click').on('click', function(){          
            el.select($(this).val());
            el.$element.popover('destroy');
        });  
    };
  
    Iconpicker.prototype.select = function(icon){    
        var op = this.options;
        var el = this.$element;    
        op.selected = $.inArray(icon, op.icons);
        if(op.selected == -1){
            op.selected = 0;
            icon = op.icons[op.selected];
        }
        if(icon != '' && op.selected >= 0){
            op.icon = icon;
            el.find('input').val(icon);
            el.find('i').attr('class', '').addClass((op.iconset == 'glyphicon') ? 'glyphicon' : 'fa').addClass(icon);
            op.table.find('button.btn-warning').removeClass('btn-warning');
        }    
    };
  
    Iconpicker.prototype.switchPage = function(icon){
        var op = this.options;
        op.selected = $.inArray(icon, op.icons);
        if(icon != '' && op.selected >= 0){
            var page = Math.ceil( (op.selected + 1) / (op.cols * op.rows) );
            this.changeList(page);
        }    
        op.table.find('.'+icon).parent().addClass('btn-warning');
    };
          
    Iconpicker.prototype.changeList = function(page){
        var op = this.options;
        this.updateButtonBar(page);
        var tbody = op.table.find('tbody').empty();
        var offset = (page - 1) * op.rows * op.cols;
        for(var i = 0; i < op.rows; i++){
            var tr = $('<tr></tr>');            
            for(var j = 0; j < op.cols; j++){
                var pos = offset + (i * op.cols) + j;
                var btn = $('<button class="btn btn-default btn-icon"></button>').hide();
                if(pos < op.icons.length){
                    btn = $('<button class="btn btn-default btn-icon" value="' + op.icons[pos] + '" title="' + op.icons[pos] + '"><i class="' + ( (op.iconset == 'glyphicon') ? 'glyphicon' : 'fa' ) + ' ' + op.icons[pos] + '"></i></button>');                            
                }                
                var td = $('<td></td>').append(btn);
                tr.append(td);
            }
            tbody.append(tr);
        }
        op.page = page;
        this.bindEvents();
    }  
  
    // ICONPICKER PLUGIN DEFINITION
    // ========================
    var old = $.fn.iconpicker;
    $.fn.iconpicker = function (option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('bs.iconpicker');
            var options = typeof option == 'object' && option;
            if (!data) $this.data('bs.iconpicker', (data = new Iconpicker(this, options)));
            var op = data.options;
            op = $.extend(op, {
                icons: (op.iconset == Iconpicker.DEFAULTS.iconset) ? Iconpicker.ICONSET.glyphicon : Iconpicker.ICONSET.fontawesome,
                page: 1,
                selected: -1,
                table: $('<table class="table-icons"><thead></thead><tbody></tbody></table>')
            });
            $this.empty().append('<i></i>').append('<input type="hidden" name="' + $this.attr('name') + '"></input>').append('<span class="caret"></span>');
            $this.addClass('iconpicker');
            data.createButtonBar();
            data.changeList(1);
            $this.on('click', function(){          
                $this.popover({
                    animation: false,
                    trigger: 'manual',
                    html: true,
                    content: data.options.table,
                    container: 'body',
                    placement: data.options.placement
                }).on('shown.bs.popover', function () {
                    data.switchPage(op.icon);
                    data.bindEvents();
                });  
                $this.popover('show');
            });
            data.select(op.icon);      
        });
    };

    $.fn.iconpicker.Constructor = Iconpicker;


    // ICONPICKER NO CONFLICT
    // ==================
    $.fn.iconpicker.noConflict = function () {
        $.fn.iconpicker = old;
        return this;
    };


    // ICONPICKER DATA-API
    // ===============
    $('body').on('click', function (e) {
        $('.iconpicker').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if ( ! $(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('destroy');
            }
        });
    });
  
    $('button[role="iconpicker"]').iconpicker();
    
  
}(window.jQuery);
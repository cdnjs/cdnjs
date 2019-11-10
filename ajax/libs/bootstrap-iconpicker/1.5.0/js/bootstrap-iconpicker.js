/* ========================================================================
 * Bootstrap: bootstrap-iconpicker.js v1.5.0 by @recktoner
 * https://victor-valencia.github.com/bootstrap-iconpicker
 * ========================================================================
 * Copyright 2013-2014 Victor Valencia Rico.
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
            'adjust',
            'align-center',
            'align-justify',
            'align-left',
            'align-right',
            'arrow-down',
            'arrow-left',
            'arrow-right',
            'arrow-up',
            'asterisk',
            'backward',
            'ban-circle',
            'barcode',
            'bell',
            'bold',
            'book',
            'bookmark',
            'briefcase',
            'bullhorn',
            'calendar',
            'camera',
            'certificate',
            'check',
            'chevron-down',
            'chevron-left',
            'chevron-right',
            'chevron-up',
            'circle-arrow-down',
            'circle-arrow-left',
            'circle-arrow-right',
            'circle-arrow-up',
            'cloud',
            'cloud-download',
            'cloud-upload',
            'cog',
            'collapse-down',
            'collapse-up',
            'comment',
            'compressed',
            'copyright-mark',
            'credit-card',
            'cutlery',
            'dashboard',
            'download',
            'download-alt',
            'earphone',
            'edit',
            'eject',
            'envelope',
            'euro',
            'exclamation-sign',
            'expand',
            'export',
            'eye-close',
            'eye-open',
            'facetime-video',
            'fast-backward',
            'fast-forward',
            'file',
            'film',
            'filter',
            'fire',
            'flag',
            'flash',
            'floppy-disk',
            'floppy-open',
            'floppy-remove',
            'floppy-save',
            'floppy-saved',
            'folder-close',
            'folder-open',
            'font',
            'forward',
            'fullscreen',
            'gbp',
            'gift',
            'glass',
            'globe',
            'hand-down',
            'hand-left',
            'hand-right',
            'hand-up',
            'hd-video',
            'hdd',
            'header',
            'headphones',
            'heart',
            'heart-empty',
            'home',
            'import',
            'inbox',
            'indent-left',
            'indent-right',
            'info-sign',
            'italic',
            'leaf',
            'link',
            'list',
            'list-alt',
            'lock',
            'log-in',
            'log-out',
            'magnet',
            'map-marker',
            'minus',
            'minus-sign',
            'move',
            'music',
            'new-window',
            'off',
            'ok',
            'ok-circle',
            'ok-sign',
            'open',
            'paperclip',
            'pause',
            'pencil',
            'phone',
            'phone-alt',
            'picture',
            'plane',
            'play',
            'play-circle',
            'plus',
            'plus-sign',
            'print',
            'pushpin',
            'qrcode',
            'question-sign',
            'random',
            'record',
            'refresh',
            'registration-mark',
            'remove',
            'remove-circle',
            'remove-sign',
            'repeat',
            'resize-full',
            'resize-horizontal',
            'resize-small',
            'resize-vertical',
            'retweet',
            'road',
            'save',
            'saved',
            'screenshot',
            'sd-video',
            'search',
            'send',
            'share',
            'share-alt',
            'shopping-cart',
            'signal',
            'sort',
            'sort-by-alphabet',
            'sort-by-alphabet-alt',
            'sort-by-attributes',
            'sort-by-attributes-alt',
            'sort-by-order',
            'sort-by-order-alt',
            'sound-5-1',
            'sound-6-1',
            'sound-7-1',
            'sound-dolby',
            'sound-stereo',
            'star',
            'star-empty',
            'stats',
            'step-backward',
            'step-forward',
            'stop',
            'subtitles',
            'tag',
            'tags',
            'tasks',
            'text-height',
            'text-width',
            'th',
            'th-large',
            'th-list',
            'thumbs-down',
            'thumbs-up',
            'time',
            'tint',
            'tower',
            'transfer',
            'trash',
            'tree-conifer',
            'tree-deciduous',
            'unchecked',
            'upload',
            'usd',
            'user',
            'volume-down',
            'volume-off',
            'volume-up',
            'warning-sign',
            'wrench',
            'zoom-in',
            'zoom-out'
        ],
        fa : $.fontawesome || []
    };

    Iconpicker.DEFAULTS = {
        iconset: 'glyphicon',
        icon: '',
        rows: 4,
        cols: 4,
        placement: 'bottom',
        arrowClass: 'btn-primary',
        selectedClass: 'btn-warning',        
        unselectedClass: 'btn-default',
        search: true,
        searchText: 'Search icon'
    };

    Iconpicker.prototype.createButtonBar = function(){
        var op = this.options;
        var tr = $('<tr></tr>');
        for(var i = 0; i < op.cols; i++){
            var btn = $('<button class="btn ' + op.arrowClass + '"><span class="glyphicon"></span></button>');
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
        if(op.search == true){
            var search = [
                '<tr>',
                '   <td colspan="' + op.cols + '">',
                '       <input type="text" class="form-control search-control" style="width: ' + op.cols * 39 + 'px;" placeholder="' + op.searchText + '">',
                '   </td>',
                '</tr>'
            ];            
            op.table.find('thead').append(search.join(''));
        }
    };

    Iconpicker.prototype.updateButtonBar = function(page){
        var op = this.options;
        var total_pages = Math.ceil( op.icons.length / (op.cols * op.rows) );
        op.table.find('.page-count').html(((total_pages == 0 ) ? 0: page) + ' / ' + total_pages);
        var btn_prev = op.table.find('.btn-previous');
        var btn_next = op.table.find('.btn-next');
        (page == 1) ? btn_prev.addClass('disabled'): btn_prev.removeClass('disabled');
        (page == total_pages || total_pages == 0) ? btn_next.addClass('disabled'): btn_next.removeClass('disabled');
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
        op.table.find('.search-control').off('keyup').on('keyup', function(e){
            el.changeList(1);
        });
    };

    Iconpicker.prototype.select = function(icon){
        var op = this.options;
        var el = this.$element;
        op.selected = $.inArray(icon.replace(op.iconClassFix, ''), op.icons);
        if(op.selected == -1){
            op.selected = 0;
            icon = op.iconClassFix + op.icons[op.selected];
        }
        if(icon != '' && op.selected >= 0){
            op.icon = icon;
            el.find('input').val(icon);
            el.find('i').attr('class', '').addClass(op.iconClass).addClass(icon);
            el.trigger({ type: "change", icon: icon });
            op.table.find('button.' + op.selectedClass).removeClass(op.selectedClass);
        }
    };

    Iconpicker.prototype.switchPage = function(icon){
        var op = this.options;
        op.selected = $.inArray(icon.replace(op.iconClassFix, ''), op.icons);
        if(icon != '' && op.selected >= 0){
            var page = Math.ceil( (op.selected + 1) / (op.cols * op.rows) );
            this.changeList(page);
        }        
        op.table.find('i.'+icon).parent().addClass(op.selectedClass);
    };

    Iconpicker.prototype.changeList = function(page){
        var op = this.options;
        var search = "";
        if(op.search == true){
            search = op.table.find('.search-control').val();
            if(search == ""){
                op.icons = Iconpicker.ICONSET[op.ic];
            }
            else{
                var result = [];
                $.each(Iconpicker.ICONSET[op.ic], function(i, v){
                   if(v.indexOf(search) > -1){
                       result.push(v);
                   } 
                });
                op.icons = result;
            }   
        }
        this.updateButtonBar(page);
        var tbody = op.table.find('tbody').empty();
        var offset = (page - 1) * op.rows * op.cols;
        for(var i = 0; i < op.rows; i++){
            var tr = $('<tr></tr>');
            for(var j = 0; j < op.cols; j++){
                var pos = offset + (i * op.cols) + j;
                var btn = $('<button class="btn ' + op.unselectedClass + ' btn-icon"></button>').hide();
                if(pos < op.icons.length){
                    var v = op.iconClassFix + op.icons[pos];
                    btn = $('<button class="btn ' + ( (op.icon == v) ? op.selectedClass : op.unselectedClass ) + ' btn-icon" value="' + v + '" title="' + v + '"><i class="' + op.iconClass + ' ' + v + '"></i></button>');
                }
                var td = $('<td></td>').append(btn);
                tr.append(td);
            }
            tbody.append(tr);
        }
        op.page = page;
        this.bindEvents();
    }

    Iconpicker.prototype.setIcon = function (icon) {
        this.select(icon);
    }

    // ICONPICKER PLUGIN DEFINITION
    // ========================
    var old = $.fn.iconpicker;
    $.fn.iconpicker = function (option, params) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('bs.iconpicker');
            var options = typeof option == 'object' && option;
            if (!data) $this.data('bs.iconpicker', (data = new Iconpicker(this, options)));
            if (typeof option == 'string') data[option](params)
            else{
                var op = data.options;
                var ic = (op.iconset == 'fontawesome') ? 'fa' : 'glyphicon';
                op = $.extend(op, {
                    ic: ic,
                    icons: Iconpicker.ICONSET[ic],
                    iconClass: ic,
                    iconClassFix: ic + '-',
                    page: 1,
                    selected: -1,
                    table: $('<table class="table-icons"><thead></thead><tbody></tbody></table>')
                });
                var name = ( typeof $this.attr('name') != 'undefined' ) ? 'name="' + $this.attr('name') + '"' : '';
                $this.empty()
                    .append('<i></i>')
                    .append('<input type="hidden" ' + name + '></input>')
                    .append('<span class="caret"></span>');
                $this.addClass('iconpicker');
                data.createButtonBar();                
                data.changeList(1);
                $this.on('click', function(e){
                    e.preventDefault();
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

                    $this.data('bs.popover').tip().addClass('iconpicker-popover')
                    $this.popover('show');
                });
                data.select(op.icon);
            }
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
    $(document).on('click', 'body', function (e) {
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

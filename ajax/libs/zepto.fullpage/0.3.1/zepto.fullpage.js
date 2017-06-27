/*!
 * zepto.fullpage.js v0.3.1 (https://github.com/yanhaijing/zepto.fullpage)
 * API https://github.com/yanhaijing/zepto.fullpage/blob/master/doc/api.md
 * Copyright 2014 yanhaijing. All Rights Reserved
 * Licensed under MIT (https://github.com/yanhaijing/zepto.fullpage/blob/master/LICENSE)
 */
(function($, window, undefined) {
    if (typeof $ === 'undefined') {
        throw new Error('zepto.fullpage\'s script requires Zepto');
    }
    $(document).on('touchmove', function(e) {
        e.preventDefault();
    });
    var fullpage = null;
    var d = {
        page: '.page',
        start: 0,
        duration: 500,
        loop: false,
        drag: false,
        dir: 'v',
        change: function(data) {},
        beforeChange: function(data) {},
        afterChange: function(data) {},
        orientationchange: function(orientation) {}
    };

    function fix(cur, pagesLength, loop) {
        if (cur < 0) {
            return !!loop ? pagesLength - 1 : 0;
        }

        if (cur >= pagesLength) {
            return !!loop ? 0 : pagesLength - 1;
        }


        return cur;
    }

    function move($ele, dir, dist) {
        var translate = dir === 'v' ? 'translateY' : 'translateX';
        $ele.css({'-webkit-transform':translate + '(' + dist + 'px)','transform':translate + '(' + dist + 'px)'});
    }

    function init(option) {
        var o = $.extend(true, {}, d, option);
        var that = this;
        that.curIndex = -1;
        that.o = o;

        that.startY = 0;
        that.movingFlag = false;

        that.$this.addClass('fullPage-wp');
        that.$parent = that.$this.parent();
        that.$pages = that.$this.find(o.page).addClass('fullPage-page fullPage-dir-' + o.dir);
        that.pagesLength = that.$pages.length;
        that.update();
        that.initEvent();
        that.status = 1;
    }

    function Fullpage($this, option) {
        this.$this = $this;
        init.call(this, option);
    }

    $.extend(Fullpage.prototype, {
        update: function() {
            if (this.o.dir === 'h') {
                this.width = this.$parent.width();
                this.$pages.width(this.width);
                this.$this.width(this.width * this.pagesLength);
            }

            this.height = this.$parent.height();
            this.$pages.height(this.height);

            this.moveTo(this.curIndex < 0 ? this.o.start : this.curIndex);
        },
        initEvent: function() {
            var that = this;
            var $this = that.$this;

            $this.on('touchstart', function(e) {
                if (!that.status) {return 1;}
                //e.preventDefault();
                if (that.movingFlag) {
                    return 0;
                }

                that.startX = e.targetTouches[0].pageX;
                that.startY = e.targetTouches[0].pageY;
            });
            $this.on('touchend', function(e) {
                if (!that.status) {return 1;}
                //e.preventDefault();
                if (that.movingFlag) {
                    return 0;
                }

                var sub = that.o.dir === 'v' ? e.changedTouches[0].pageY - that.startY : e.changedTouches[0].pageX - that.startX;
                var der = (sub > 30 || sub < -30) ? sub > 0 ? -1 : 1 : 0;

                that.moveTo(that.curIndex + der, true);
            });
            if (that.o.drag) {
                $this.on('touchmove', function(e) {
                    if (!that.status) {return 1;}
                    //e.preventDefault();
                    if (that.movingFlag) {
                        return 0;
                    }

                    var y = e.changedTouches[0].pageY - that.startY;
                    var x = e.changedTouches[0].pageX - that.startX;
                    var dist = (that.o.dir === 'v' ? (-that.curIndex * that.height + y) : (-that.curIndex * that.width + x));
                    $this.removeClass('anim');
                    move($this, that.o.dir, dist);
                });
            }

            // 翻转屏幕提示
            // ==============================             
            window.addEventListener("orientationchange", function() {
                if (window.orientation === 180 || window.orientation === 0) {
                    that.o.orientationchange('portrait');
                }
                if (window.orientation === 90 || window.orientation === -90) {
                    that.o.orientationchange('landscape');
                }
            }, false);

            window.addEventListener("resize", function() {
                that.update();
            }, false);
        },

        start: function() {
            this.status = 1;
        },
        stop: function() {
            this.status = 0;
        },
        moveTo: function(next, anim) {
            var that = this;
            var $this = that.$this;
            var cur = that.curIndex;
            next = fix(next, that.pagesLength, that.o.loop);

            if (anim) {
                $this.addClass('anim');
            } else {
                $this.removeClass('anim');
            }

            if (next !== cur) {
                that.o.beforeChange({
                    next: next,
                    cur: cur
                });
            }

            that.movingFlag = true;
            that.curIndex = next;
            move($this, that.o.dir, -next * (that.o.dir === 'v' ? that.height : that.width));

            if (next !== cur) {
                that.o.change({
                    prev: cur,
                    cur: next
                });
            }

            window.setTimeout(function() {
                that.movingFlag = false;
                if (next !== cur) {
                    that.o.afterChange({
                        prev: cur,
                        cur: next
                    });
                    that.$pages.removeClass('cur').eq(next).addClass('cur');
                }
            }, that.o.duration);
        },
        movePrev: function(anim) {
            this.moveTo(this.curIndex - 1, anim);
        },
        moveNext: function(anim) {
            this.moveTo(this.curIndex + 1, anim);
        }
    });

    $.fn.fullpage = function(option) {
        if (!fullpage) {
            fullpage = new Fullpage($(this), option);
        }
        return this;
    };
    $.fn.fullpage.version = '0.3.1';
    //暴露方法
    $.each(['update', 'moveTo', 'moveNext', 'movePrev', 'start', 'stop'], function(key, val) {
        $.fn.fullpage[val] = function() {
            if (!fullpage) {
                return 0;
            }
            fullpage[val].apply(fullpage, [].slice.call(arguments, 0));
        };
    });
}(Zepto, window));

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

    function init(option) {
        var o = $.extend(true, {}, d, option);
        var that = this;
        that.curIndex = -1;
        that.o = o;

        that.startY = 0;
        that.movingFlag = false;

        that.$this.addClass('fullPage-wp');
        that.$parent = that.$this.parent();
        that.$pages = that.$this.find(o.page).addClass('fullPage-page');
        that.pagesLength = that.$pages.length;
        that.update();
        that.initEvent();
    }

    function Fullpage($this, option) {
        this.$this = $this;
        init.call(this, option);
    }

    $.extend(Fullpage.prototype, {
        update: function() {
            this.height = this.$parent.height();

            this.$pages.height(this.height);

            this.moveTo(this.curIndex < 0 ? this.o.start : this.curIndex);
        },
        initEvent: function() {
            var that = this;
            //var $this = that.$this;

            that.start();

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
            var that = this;
            var $this = that.$this;

            $this.on('touchstart', function(e) {
                e.preventDefault();
                if (that.movingFlag) {
                    return 0;
                }

                that.startY = e.targetTouches[0].pageY;
            });
            $this.on('touchend', function(e) {
                e.preventDefault();
                if (that.movingFlag) {
                    return 0;
                }

                var sub = e.changedTouches[0].pageY - that.startY;
                var der = (sub > 30 || sub < -30) ? sub > 0 ? -1 : 1 : 0;

                that.moveTo(that.curIndex + der, true);
            });
            if (that.o.drag) {
                $this.on('touchmove', function(e) {
                    e.preventDefault();
                    if (that.movingFlag) {
                        return 0;
                    }

                    var top = e.changedTouches[0].pageY - that.startY;
                    $this.removeClass('anim')
                        .css('-webkit-transform', 'translateY(' + (-that.curIndex * that.height + top) + 'px)')
                        .css('transform', 'translateY(' + (-that.curIndex * that.height + top) + 'px)');
                });
            }
        },
        stop: function() {
            var that = this;
            var $this = that.$this;

            $this.off('touchstart');
            $this.off('touchend');
            if (that.o.drag) {
                $this.off('touchmove');
            }
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
            $this.css('-webkit-transform', 'translateY(' + (-next * that.height) + 'px)');
            $this.css('transform', 'translateY(' + (-next * that.height) + 'px)');

            if (next !== cur) {
                that.o.change({
                    next: next,
                    cur: cur
                });
            }

            window.setTimeout(function() {
                that.movingFlag = false;
                if (next !== cur) {
                    that.o.afterChange({
                        next: next,
                        cur: cur
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
    //暴漏方法
    $.each(['update', 'moveTo', 'moveNext', 'movePrev', 'start', 'stop'], function(key, val) {
        $.fn.fullpage[val] = function() {
            if (!fullpage) {
                return 0;
            }
            fullpage[val].apply(fullpage, [].slice.call(arguments, 0));
        };
    });
}(Zepto, window));
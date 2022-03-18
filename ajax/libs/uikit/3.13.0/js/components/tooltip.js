/*! UIkit 3.13.0 | https://www.getuikit.com | (c) 2014 - 2022 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikittooltip', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitTooltip = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    var Container = {
      props: {
        container: Boolean },


      data: {
        container: true },


      computed: {
        container(_ref) {let { container } = _ref;
          return container === true && this.$container || container && uikitUtil.$(container);
        } } };

    var Togglable = {
      props: {
        cls: Boolean,
        animation: 'list',
        duration: Number,
        origin: String,
        transition: String },


      data: {
        cls: false,
        animation: [false],
        duration: 200,
        origin: false,
        transition: 'linear',
        clsEnter: 'uk-togglabe-enter',
        clsLeave: 'uk-togglabe-leave',

        initProps: {
          overflow: '',
          height: '',
          paddingTop: '',
          paddingBottom: '',
          marginTop: '',
          marginBottom: '' },


        hideProps: {
          overflow: 'hidden',
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0 } },



      computed: {
        hasAnimation(_ref) {let { animation } = _ref;
          return !!animation[0];
        },

        hasTransition(_ref2) {let { animation } = _ref2;
          return this.hasAnimation && animation[0] === true;
        } },


      methods: {
        toggleElement(targets, toggle, animate) {
          return new Promise((resolve) =>
          Promise.all(
          uikitUtil.toNodes(targets).map((el) => {
            const show = uikitUtil.isBoolean(toggle) ? toggle : !this.isToggled(el);

            if (!uikitUtil.trigger(el, "before" + (show ? 'show' : 'hide'), [this])) {
              return Promise.reject();
            }

            const promise = (
            uikitUtil.isFunction(animate) ?
            animate :
            animate === false || !this.hasAnimation ?
            this._toggle :
            this.hasTransition ?
            toggleHeight(this) :
            toggleAnimation(this))(
            el, show);

            const cls = show ? this.clsEnter : this.clsLeave;

            uikitUtil.addClass(el, cls);

            uikitUtil.trigger(el, show ? 'show' : 'hide', [this]);

            const done = () => {
              uikitUtil.removeClass(el, cls);
              uikitUtil.trigger(el, show ? 'shown' : 'hidden', [this]);
              this.$update(el);
            };

            return promise ?
            promise.then(done, () => {
              uikitUtil.removeClass(el, cls);
              return Promise.reject();
            }) :
            done();
          })).
          then(resolve, uikitUtil.noop));

        },

        isToggled(el) {if (el === void 0) {el = this.$el;}
          [el] = uikitUtil.toNodes(el);
          return uikitUtil.hasClass(el, this.clsEnter) ?
          true :
          uikitUtil.hasClass(el, this.clsLeave) ?
          false :
          this.cls ?
          uikitUtil.hasClass(el, this.cls.split(' ')[0]) :
          uikitUtil.isVisible(el);
        },

        _toggle(el, toggled) {
          if (!el) {
            return;
          }

          toggled = Boolean(toggled);

          let changed;
          if (this.cls) {
            changed = uikitUtil.includes(this.cls, ' ') || toggled !== uikitUtil.hasClass(el, this.cls);
            changed && uikitUtil.toggleClass(el, this.cls, uikitUtil.includes(this.cls, ' ') ? undefined : toggled);
          } else {
            changed = toggled === el.hidden;
            changed && (el.hidden = !toggled);
          }

          uikitUtil.$$('[autofocus]', el).some((el) => uikitUtil.isVisible(el) ? el.focus() || true : el.blur());

          if (changed) {
            uikitUtil.trigger(el, 'toggled', [toggled, this]);
            this.$update(el);
          }
        } } };



    function toggleHeight(_ref3) {let { isToggled, duration, initProps, hideProps, transition, _toggle } = _ref3;
      return (el, show) => {
        const inProgress = uikitUtil.Transition.inProgress(el);
        const inner = el.hasChildNodes() ?
        uikitUtil.toFloat(uikitUtil.css(el.firstElementChild, 'marginTop')) +
        uikitUtil.toFloat(uikitUtil.css(el.lastElementChild, 'marginBottom')) :
        0;
        const currentHeight = uikitUtil.isVisible(el) ? uikitUtil.height(el) + (inProgress ? 0 : inner) : 0;

        uikitUtil.Transition.cancel(el);

        if (!isToggled(el)) {
          _toggle(el, true);
        }

        uikitUtil.height(el, '');

        // Update child components first
        uikitUtil.fastdom.flush();

        const endHeight = uikitUtil.height(el) + (inProgress ? 0 : inner);
        uikitUtil.height(el, currentHeight);

        return (
        show ?
        uikitUtil.Transition.start(
        el,
        { ...initProps, overflow: 'hidden', height: endHeight },
        Math.round(duration * (1 - currentHeight / endHeight)),
        transition) :

        uikitUtil.Transition.start(
        el,
        hideProps,
        Math.round(duration * (currentHeight / endHeight)),
        transition).
        then(() => _toggle(el, false))).
        then(() => uikitUtil.css(el, initProps));
      };
    }

    function toggleAnimation(cmp) {
      return (el, show) => {
        uikitUtil.Animation.cancel(el);

        const { animation, duration, _toggle } = cmp;

        if (show) {
          _toggle(el, true);
          return uikitUtil.Animation.in(el, animation[0], duration, cmp.origin);
        }

        return uikitUtil.Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(() =>
        _toggle(el, false));

      };
    }

    var Position = {
      props: {
        pos: String,
        offset: null,
        flip: Boolean,
        clsPos: String },


      data: {
        pos: "bottom-" + (uikitUtil.isRtl ? 'right' : 'left'),
        flip: true,
        offset: false,
        clsPos: '' },


      connected() {
        this.pos = this.$props.pos.split('-').concat('center').slice(0, 2);
        this.dir = this.pos[0];
        this.align = this.pos[1];
      },

      methods: {
        positionAt(element, target, boundary) {
          uikitUtil.removeClasses(element, this.clsPos + "-(top|bottom|left|right)(-[a-z]+)?");

          let { offset } = this;
          const axis = this.getAxis();
          const dir = this.pos[0];
          const align = this.pos[1];

          if (!uikitUtil.isNumeric(offset)) {
            const node = uikitUtil.$(offset);
            offset = node ?
            uikitUtil.offset(node)[axis === 'x' ? 'left' : 'top'] -
            uikitUtil.offset(target)[axis === 'x' ? 'right' : 'bottom'] :
            0;
          }

          const { x, y } = uikitUtil.positionAt(
          element,
          target,
          axis === 'x' ? uikitUtil.flipPosition(dir) + " " + align : align + " " + uikitUtil.flipPosition(dir),
          axis === 'x' ? dir + " " + align : align + " " + dir,
          axis === 'x' ? "" + (
          dir === 'left' ? -offset : offset) : " " + (
          dir === 'top' ? -offset : offset),
          null,
          this.flip,
          boundary).
          target;

          this.dir = axis === 'x' ? x : y;
          this.align = axis === 'x' ? y : x;

          uikitUtil.toggleClass(element, this.clsPos + "-" + this.dir + "-" + this.align, this.offset === false);
        },

        getAxis() {
          return this.dir === 'top' || this.dir === 'bottom' ? 'y' : 'x';
        } } };

    var Component = {
      mixins: [Container, Togglable, Position],

      args: 'title',

      props: {
        delay: Number,
        title: String },


      data: {
        pos: 'top',
        title: '',
        delay: 0,
        animation: ['uk-animation-scale-up'],
        duration: 100,
        cls: 'uk-active',
        clsPos: 'uk-tooltip' },


      beforeConnect() {
        this._hasTitle = uikitUtil.hasAttr(this.$el, 'title');
        uikitUtil.attr(this.$el, 'title', '');
        this.updateAria(false);
        makeFocusable(this.$el);
      },

      disconnected() {
        this.hide();
        uikitUtil.attr(this.$el, 'title', this._hasTitle ? this.title : null);
      },

      methods: {
        show() {
          if (this.isToggled(this.tooltip || null) || !this.title) {
            return;
          }

          this._unbind = uikitUtil.once(
          document, "show keydown " +
          uikitUtil.pointerDown,
          this.hide,
          false,
          (e) =>
          e.type === uikitUtil.pointerDown && !uikitUtil.within(e.target, this.$el) ||
          e.type === 'keydown' && e.keyCode === 27 ||
          e.type === 'show' && e.detail[0] !== this && e.detail[0].$name === this.$name);


          clearTimeout(this.showTimer);
          this.showTimer = setTimeout(this._show, this.delay);
        },

        async hide() {
          if (uikitUtil.matches(this.$el, 'input:focus')) {
            return;
          }

          clearTimeout(this.showTimer);

          if (!this.isToggled(this.tooltip || null)) {
            return;
          }

          await this.toggleElement(this.tooltip, false, false);
          uikitUtil.remove(this.tooltip);
          this.tooltip = null;
          this._unbind();
        },

        _show() {
          this.tooltip = uikitUtil.append(
          this.container, "<div class=\"" +
          this.clsPos + "\"> <div class=\"" +
          this.clsPos + "-inner\">" + this.title + "</div> </div>");



          uikitUtil.on(this.tooltip, 'toggled', (e, toggled) => {
            this.updateAria(toggled);

            if (!toggled) {
              return;
            }

            this.positionAt(this.tooltip, this.$el);

            this.origin =
            this.getAxis() === 'y' ?
            uikitUtil.flipPosition(this.dir) + "-" + this.align :
            this.align + "-" + uikitUtil.flipPosition(this.dir);
          });

          this.toggleElement(this.tooltip, true);
        },

        updateAria(toggled) {
          uikitUtil.attr(this.$el, 'aria-expanded', toggled);
        } },


      events: {
        focus: 'show',
        blur: 'hide',

        [uikitUtil.pointerEnter + " " + uikitUtil.pointerLeave](e) {
          if (!uikitUtil.isTouch(e)) {
            this[e.type === uikitUtil.pointerEnter ? 'show' : 'hide']();
          }
        },

        // Clicking a button does not give it focus on all browsers and platforms
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus
        [uikitUtil.pointerDown](e) {
          if (uikitUtil.isTouch(e)) {
            this.show();
          }
        } } };



    function makeFocusable(el) {
      if (!uikitUtil.isFocusable(el)) {
        uikitUtil.attr(el, 'tabindex', '0');
      }
    }

    if (typeof window !== 'undefined' && window.UIkit) {
      window.UIkit.component('tooltip', Component);
    }

    return Component;

}));

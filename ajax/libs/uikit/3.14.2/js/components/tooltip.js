/*! UIkit 3.14.2 | https://www.getuikit.com | (c) 2014 - 2022 YOOtheme | MIT License */

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
        velocity: Number,
        origin: String,
        transition: String },


      data: {
        cls: false,
        animation: [false],
        duration: 200,
        velocity: 0.2,
        origin: false,
        transition: 'ease',
        clsEnter: 'uk-togglabe-enter',
        clsLeave: 'uk-togglabe-leave',

        initProps: {
          overflow: '',
          maxHeight: '',
          paddingTop: '',
          paddingBottom: '',
          marginTop: '',
          marginBottom: '',
          boxShadow: '' },


        hideProps: {
          overflow: 'hidden',
          maxHeight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0,
          boxShadow: 'none' } },



      computed: {
        hasAnimation(_ref) {let { animation } = _ref;
          return !!animation[0];
        },

        hasTransition(_ref2) {let { animation } = _ref2;
          return uikitUtil.startsWith(animation[0], 'slide');
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

            if (!animate) {
              uikitUtil.Animation.cancel(el);
              uikitUtil.Transition.cancel(el);
            }

            const promise = (
            uikitUtil.isFunction(animate) ?
            animate :
            animate === false || !this.hasAnimation ?
            toggleInstant(this) :
            this.hasTransition ?
            toggleTransition(this) :
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



    function toggleInstant(_ref3) {let { _toggle } = _ref3;
      return (el, show) => {
        uikitUtil.Animation.cancel(el);
        uikitUtil.Transition.cancel(el);
        return _toggle(el, show);
      };
    }

    function toggleTransition(cmp) {
      switch (cmp.animation[0]) {
        case 'slide-left':
          return slideHorizontal(cmp);
        case 'slide-right':
          return slideHorizontal(cmp, true);}

      return slide(cmp);
    }

    function slide(_ref4)







    {let { isToggled, duration, velocity, initProps, hideProps, transition, _toggle } = _ref4;
      return (el, show) => {
        const inProgress = uikitUtil.Transition.inProgress(el);
        const inner =
        !inProgress && el.hasChildNodes() ?
        uikitUtil.toFloat(uikitUtil.css(el.firstElementChild, 'marginTop')) +
        uikitUtil.toFloat(uikitUtil.css(el.lastElementChild, 'marginBottom')) :
        0;
        const currentHeight = uikitUtil.isVisible(el) ? uikitUtil.toFloat(uikitUtil.css(el, 'height')) + inner : 0;

        const props = inProgress ? uikitUtil.css(el, Object.keys(initProps)) : show ? hideProps : initProps;

        uikitUtil.Transition.cancel(el);

        if (!isToggled(el)) {
          _toggle(el, true);
        }

        uikitUtil.css(el, 'maxHeight', '');

        // Update child components first
        uikitUtil.fastdom.flush();

        const endHeight = uikitUtil.toFloat(uikitUtil.css(el, 'height')) + inner;
        duration = velocity * endHeight + duration;

        uikitUtil.css(el, { ...props, maxHeight: currentHeight });

        return (
        show ?
        uikitUtil.Transition.start(
        el,
        { ...initProps, overflow: 'hidden', maxHeight: endHeight },
        duration * (1 - currentHeight / endHeight),
        transition) :

        uikitUtil.Transition.start(
        el,
        hideProps,
        duration * (currentHeight / endHeight),
        transition).
        then(() => _toggle(el, false))).
        then(() => uikitUtil.css(el, initProps));
      };
    }

    function slideHorizontal(_ref5, right) {let { isToggled, duration, velocity, transition, _toggle } = _ref5;
      return (el, show) => {
        const visible = uikitUtil.isVisible(el);
        const marginLeft = uikitUtil.toFloat(uikitUtil.css(el, 'marginLeft'));

        uikitUtil.Transition.cancel(el);

        const [scrollElement] = uikitUtil.scrollParents(el);
        uikitUtil.css(scrollElement, 'overflowX', 'hidden');

        if (!isToggled(el)) {
          _toggle(el, true);
        }

        const width = uikitUtil.toFloat(uikitUtil.css(el, 'width'));
        duration = velocity * width + duration;

        const percent = visible ? (width + marginLeft * (right ? -1 : 1)) / width * 100 : 0;
        const offsetEl = uikitUtil.offset(el);
        const useClipPath = right ?
        offsetEl.right < scrollElement.clientWidth :
        Math.round(offsetEl.left) > 0;

        uikitUtil.css(el, {
          clipPath: useClipPath ?
          right ? "polygon(0 0," +
          percent + "% 0," + percent + "% 100%,0 100%)" : "polygon(" + (
          100 - percent) + "% 0,100% 0,100% 100%," + (100 - percent) + "% 100%)" :
          '',
          marginLeft: (100 - percent) * (right ? 1 : -1) / 100 * width });


        return (
        show ?
        uikitUtil.Transition.start(
        el,
        {
          clipPath: useClipPath ? "polygon(0 0,100% 0,100% 100%,0 100%)" : '',
          marginLeft: 0 },

        duration * (1 - percent / 100),
        transition) :

        uikitUtil.Transition.start(
        el,
        {
          clipPath: useClipPath ?
          right ? "polygon(0 0,0 0,0 100%,0 100%)" : "polygon(100% 0,100% 0,100% 100%,100% 100%)" :


          '',
          marginLeft: (right ? 1 : -1) * width },

        duration * (percent / 100),
        transition).
        then(() => _toggle(el, false))).
        then(() => {
          uikitUtil.css(scrollElement, 'overflowX', '');
          uikitUtil.css(el, { clipPath: '', marginLeft: '' });
        });
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
        flip: Boolean },


      data: {
        pos: "bottom-" + (uikitUtil.isRtl ? 'right' : 'left'),
        flip: true,
        offset: false },


      connected() {
        this.pos = this.$props.pos.split('-').concat('center').slice(0, 2);
        [this.dir, this.align] = this.pos;
        this.axis = uikitUtil.includes(['top', 'bottom'], this.dir) ? 'y' : 'x';
      },

      methods: {
        positionAt(element, target, boundary) {
          let offset = [this.getPositionOffset(element), this.getShiftOffset(element)];

          const attach = {
            element: [uikitUtil.flipPosition(this.dir), this.align],
            target: [this.dir, this.align] };


          if (this.axis === 'y') {
            for (const prop in attach) {
              attach[prop] = attach[prop].reverse();
            }
            offset = offset.reverse();
          }

          // Ensure none positioned element does not generate scrollbars
          const elDim = uikitUtil.dimensions(element);
          uikitUtil.css(element, { top: -elDim.height, left: -elDim.width });

          uikitUtil.positionAt(element, target, {
            attach,
            offset,
            boundary,
            flip: this.flip,
            viewportOffset: this.getViewportOffset(element) });

        },

        getPositionOffset(element) {
          return (
            uikitUtil.toPx(
            this.offset === false ? uikitUtil.getCssVar('position-offset', element) : this.offset,
            this.axis === 'x' ? 'width' : 'height',
            element) * (
            uikitUtil.includes(['left', 'top'], this.dir) ? -1 : 1));

        },

        getShiftOffset(element) {
          return uikitUtil.includes(['center', 'justify', 'stretch'], this.align) ?
          0 :
          uikitUtil.toPx(
          uikitUtil.getCssVar('position-shift-offset', element),
          this.axis === 'y' ? 'width' : 'height',
          element) * (
          uikitUtil.includes(['left', 'top'], this.align) ? 1 : -1);
        },

        getViewportOffset(element) {
          return uikitUtil.toPx(uikitUtil.getCssVar('position-viewport-offset', element));
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
        cls: 'uk-active' },


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
          this.container, "<div class=\"uk-" +
          this.$options.name + "\"> <div class=\"uk-" +
          this.$options.name + "-inner\">" + this.title + "</div> </div>");



          uikitUtil.on(this.tooltip, 'toggled', (e, toggled) => {
            this.updateAria(toggled);

            if (!toggled) {
              return;
            }

            this.positionAt(this.tooltip, this.$el);

            const [dir, align] = getAlignment(this.tooltip, this.$el, this.pos);

            this.origin =
            this.axis === 'y' ?
            uikitUtil.flipPosition(dir) + "-" + align :
            align + "-" + uikitUtil.flipPosition(dir);
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

    function getAlignment(el, target, _ref) {let [dir, align] = _ref;
      const elOffset = uikitUtil.offset(el);
      const targetOffset = uikitUtil.offset(target);
      const properties = [
      ['left', 'right'],
      ['top', 'bottom']];


      for (const props of properties) {
        if (elOffset[props[0]] >= targetOffset[props[1]]) {
          dir = props[1];
          break;
        }
        if (elOffset[props[1]] <= targetOffset[props[0]]) {
          dir = props[0];
          break;
        }
      }

      const props = uikitUtil.includes(properties[0], dir) ? properties[1] : properties[0];
      if (elOffset[props[0]] === targetOffset[props[0]]) {
        align = props[0];
      } else if (elOffset[props[1]] === targetOffset[props[1]]) {
        align = props[1];
      } else {
        align = 'center';
      }

      return [dir, align];
    }

    if (typeof window !== 'undefined' && window.UIkit) {
      window.UIkit.component('tooltip', Component);
    }

    return Component;

}));

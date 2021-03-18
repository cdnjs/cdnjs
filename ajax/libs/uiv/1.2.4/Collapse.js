function isElement (el) {
  return el && el.nodeType === Node.ELEMENT_NODE
}

function addClass (el, className) {
  if (!isElement(el)) {
    return
  }
  if (el.className) {
    var classes = el.className.split(' ');
    if (classes.indexOf(className) < 0) {
      classes.push(className);
      el.className = classes.join(' ');
    }
  } else {
    el.className = className;
  }
}

function removeClass (el, className) {
  if (!isElement(el)) {
    return
  }
  if (el.className) {
    var classes = el.className.split(' ');
    var newClasses = [];
    for (var i = 0, l = classes.length; i < l; i++) {
      if (classes[i] !== className) {
        newClasses.push(classes[i]);
      }
    }
    el.className = newClasses.join(' ');
  }
}

var COLLAPSE = 'collapse';
var IN = 'in';
var COLLAPSING = 'collapsing';

var Collapse = {
  render: function render (h) {
    return h(this.tag, {}, this.$slots.default)
  },
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    value: {
      type: Boolean,
      default: false
    },
    transition: {
      type: Number,
      default: 350
    }
  },
  data: function data () {
    return {
      timeoutId: 0
    }
  },
  watch: {
    value: function value (show) {
      this.toggle(show);
    }
  },
  mounted: function mounted () {
    var el = this.$el;
    addClass(el, COLLAPSE);
    if (this.value) {
      addClass(el, IN);
    }
  },
  methods: {
    toggle: function toggle (show) {
      var this$1 = this;

      clearTimeout(this.timeoutId);
      var el = this.$el;
      if (show) {
        this.$emit('show');
        removeClass(el, COLLAPSE);
        el.style.height = 'auto';
        var height = window.getComputedStyle(el).height;
        el.style.height = null;
        addClass(el, COLLAPSING);
        el.offsetHeight; // force repaint
        el.style.height = height;
        this.timeoutId = setTimeout(function () {
          removeClass(el, COLLAPSING);
          addClass(el, COLLAPSE);
          addClass(el, IN);
          el.style.height = null;
          this$1.timeoutId = 0;
          this$1.$emit('shown');
        }, this.transition);
      } else {
        this.$emit('hide');
        el.style.height = window.getComputedStyle(el).height;
        removeClass(el, IN);
        removeClass(el, COLLAPSE);
        el.offsetHeight;
        el.style.height = null;
        addClass(el, COLLAPSING);
        this.timeoutId = setTimeout(function () {
          addClass(el, COLLAPSE);
          removeClass(el, COLLAPSING);
          el.style.height = null;
          this$1.timeoutId = 0;
          this$1.$emit('hidden');
        }, this.transition);
      }
    }
  }
};

export default Collapse;
//# sourceMappingURL=Collapse.js.map

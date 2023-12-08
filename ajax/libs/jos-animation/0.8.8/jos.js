class jos {
  default_once = !1;
  default_animation = "fade";
  default_animationinverse = void 0;
  default_timingFunction = "ease-in-out";
  default_threshold = 0;
  default_duration = 0.4;
  default_delay = 0;
  default_intersectionRatio = 0;
  default_rootMargin = "-10% 0% -40% 0%";
  default_startVisible = void 0;
  default_scrolldirection = void 0;
  default_passive = !0;
  default_mirror = void 0;
  debug = !1;
  disable = !1;
  static version = "0.8.8";
  static author = "Jesvi Jonathan";
  static github = "https://github.com/jesvijonathan/JOS-Animation-Library";
  options = {};
  jos_stylesheet = void 0;
  boxes = void 0;
  observers = [];
  scrollEnter = [];
  constructor() {}
  version() {
    console.log(
      `JOS: Javascript On Scroll Animation Library\n    - Version: ${jos.version}\n    - Author: ${jos.author}\n    - Github: ${jos.github}\n`
    );
  }
  debugger(type = 0) {
    0 == type &&
      this.debugMode &&
      (this.version(),
      console.log(
        `JOS Settings:\n    - animation: ${this.default_animation}\n    - once: ${this.default_once}\n    - animationinverse: ${this.default_animationinverse}\n    - timingFunction: ${this.default_timingFunction}\n    - duration: ${this.default_duration}\n    - delay: ${this.default_delay}\n    - threshold: ${this.default_threshold}\n    - startVisible: ${this.default_startVisible}\n    - scrolldirection: ${this.default_scrolldirection}\n    - intersectionRatio: ${this.default_intersectionRatio}\n    - rootMargin: ${this.default_rootMargin}\n    - disable: ${this.disable}\n    - debugMode: ${this.debugMode}\n`
      )),
      console.log("JOS Initialized:\n\n"),
      (1 != type && 0 != type) ||
        !this.debugMode ||
        console.log(this.boxes || "No Elements Found");
  }
  callbackRouter_anchor = (entries, observer) => {
    let entry = entries[0],
      parentTarget = entry.target;
    document
      .querySelectorAll("[data-jos_anchor='#" + parentTarget.id + "']")
      .forEach((target) => {
        let target_jos_animation = target.dataset.jos_animation,
          target_jos_animationinverse = target.dataset.jos_animationinverse;
        if (entry.isIntersecting) {
          if (null != target.dataset.jos_counter) {
            let counter_value = parseInt(target.dataset.jos_counter);
            counter_value++, (target.dataset.jos_counter = counter_value);
          }
          target_jos_animation &&
            (target.classList.remove("jos-" + target_jos_animation),
            null != target.dataset.jos_invoke &&
              window[target.dataset.jos_invoke](target),
            (null == target.dataset.jos_once &&
              "false" == target.dataset.jos_once) ||
              (("true" == target.dataset.jos_once ||
                target.dataset.jos_counter >= target.dataset.jos_once) &&
                observer.unobserve(target)),
            null != target_jos_animationinverse &&
              target.classList.add("jos-" + target_jos_animationinverse));
        } else
          (void 0 !== target.dataset.jos_scrolldirection &&
            "down" !== target.dataset.jos_scrolldirection &&
            "none" !== target.dataset.jos_scrolldirection) ||
            (target.classList.add("jos-" + target_jos_animation),
            void 0 !== target.dataset.jos_invoke_out &&
              window[target.dataset.jos_invoke_out](target));
      });
  };
  callbackScroller = (scl) => {
    const defaultRootMargin = this.default_rootMargin;
    let wh = window.innerHeight;
    const updateBox = (box) => {
      const rootMargin = box.dataset.jos_rootmargin || defaultRootMargin,
        rootMarginValues = rootMargin.split(" ").map(parseFloat),
        topMargin = (wh * rootMarginValues[0]) / 100,
        bottomMargin = (wh * rootMarginValues[2]) / 100;
      box.jos = {
        rootMargin: rootMargin,
        rootMarginValues: rootMarginValues,
        topMargin: topMargin,
        bottomMargin: bottomMargin,
      };
      const elementRect = box.getBoundingClientRect(),
        elementTop = elementRect.top - box.jos.topMargin,
        elementBottom = elementRect.bottom - box.jos.bottomMargin,
        windowScrollProgress = elementRect.top / wh,
        rootScrollProgress =
          elementTop / (wh - box.jos.topMargin - box.jos.bottomMargin);
      let scrollProgress = 0;
      (scrollProgress =
        rootScrollProgress < 0
          ? 0
          : rootScrollProgress > 100
          ? 1
          : rootScrollProgress),
        (box.jos = {
          elementRect: elementRect,
          elementTop: elementTop,
          elementBottom: elementBottom,
          windowScrollProgress: windowScrollProgress,
          rootScrollProgress: rootScrollProgress,
          scrollProgress: scrollProgress,
        }),
        window[box.dataset.jos_scroll](box);
    };
    document.onscroll = (e) => {
      scl.forEach(updateBox);
    };
  };
  callbackRouter = (entries, observer, type = 1) => {
    if (1 == this.disable) return;
    let entry = entries[0],
      target = entry.target,
      target_jos_animation = target.dataset.jos_animation,
      target_jos_animationinverse = target.dataset.jos_animationinverse,
      scroll_dir = 1;
    if (
      ((scroll_dir = entry.boundingClientRect.top < 0 ? 0 : 1),
      entry.isIntersecting)
    ) {
      if (
        ("false" != target.dataset.jos_scroll &&
          null != target.dataset.jos_scroll &&
          (this.scrollEnter.push(target),
          this.callbackScroller(this.scrollEnter)),
        null != target.dataset.jos_counter)
      ) {
        let counter_value = parseInt(target.dataset.jos_counter);
        counter_value++, (target.dataset.jos_counter = counter_value);
      }
      "false" == target.dataset.jos_mirror &&
        target.classList.remove("jos-no-mirror"),
        target_jos_animation &&
          (target.classList.remove("jos-" + target_jos_animation),
          null != target.dataset.jos_invoke &&
            window[target.dataset.jos_invoke](target),
          (null == target.dataset.jos_once &&
            "false" == target.dataset.jos_once) ||
            (("true" == target.dataset.jos_once ||
              target.dataset.jos_counter >= target.dataset.jos_once) &&
              observer.unobserve(target))),
        null != target_jos_animationinverse &&
          target.classList.add("jos-" + target_jos_animationinverse);
    } else
      (void 0 === target.dataset.jos_scrolldirection ||
        (1 === scroll_dir && "down" === target.dataset.jos_scrolldirection) ||
        (0 === scroll_dir && "up" === target.dataset.jos_scrolldirection) ||
        "none" === target.dataset.jos_scrolldirection) &&
        (target.classList.toggle(
          "jos-no-mirror",
          "false" == target.dataset.jos_mirror
        ),
        target.classList.add("jos-" + target_jos_animation),
        null != target_jos_animationinverse &&
          target.classList.remove("jos-" + target_jos_animationinverse),
        void 0 !== target.dataset.jos_invoke_out &&
          window[target.dataset.jos_invoke_out](target)),
        "false" != target.dataset.jos_scroll &&
          null != target.dataset.jos_scroll &&
          ((this.scrollEnter = this.scrollEnter.filter(
            (item) => item.id !== target.id
          )),
          this.callbackScroller(this.scrollEnter));
  };
  animationInit() {
    let doit = [];
    this.boxes.forEach((box) => {
      let object_default_once = box.dataset.jos_once,
        object_default_animation =
          box.dataset.jos_animation || this.default_animation,
        object_default_animationinverse = box.dataset.jos_animationinverse,
        object_default_timingFunction = box.dataset.jos_timingFunction,
        object_default_duration = box.dataset.jos_duration,
        object_default_delay = box.dataset.jos_delay,
        object_default_mirror = box.dataset.jos_mirror || this.default_mirror;
      box.classList.contains("jos_disabled") &&
        (box.classList.remove("jos_disabled"), box.classList.add("jos")),
        object_default_once &&
        ("true" == object_default_once || /^\d+$/.test(object_default_once))
          ? box.setAttribute("data-jos_once", object_default_once)
          : box.setAttribute(
              "data-jos_once",
              this.default_once ? "1" : "false"
            ),
        box.setAttribute("data-jos_animation", object_default_animation),
        object_default_animationinverse &&
          box.setAttribute(
            "data-jos_animationinverse",
            object_default_animationinverse
          ),
        object_default_timingFunction &&
          box.setAttribute(
            "data-jos_timingFunction",
            object_default_timingFunction
          ),
        "false" == object_default_mirror &&
          box.setAttribute("data-jos_mirror", object_default_mirror),
        object_default_duration &&
          box.setAttribute("data-jos_duration", object_default_duration),
        object_default_delay &&
          box.setAttribute("data-jos_delay", object_default_delay),
        box.setAttribute("data-jos_counter", "0"),
        box.classList.add("jos-" + object_default_animation),
        (box.dataset.jos_startvisible || this.default_startVisible) &&
          doit.push(box),
        this.default_scrolldirection &&
          box.setAttribute(
            "data-jos_scrolldirection",
            this.default_scrolldirection
          );
      let box_observer = {
        rootMargin: [
          box.dataset.jos_rootmargin_top ||
            this.default_rootMargin.split(" ")[0],
          box.dataset.jos_rootmargin_right ||
            this.default_rootMargin.split(" ")[1],
          box.dataset.jos_rootmargin_bottom ||
            this.default_rootMargin.split(" ")[2],
          box.dataset.jos_rootmargin_left ||
            this.default_rootMargin.split(" ")[3],
        ]
          .map((value) =>
            value.startsWith("-") ? value.substring(1) : `-${value}`
          )
          .join(" "),
        threshold: this.default_threshold,
        passive: this.default_passive,
      };
      if (box.dataset.jos_anchor) {
        const observer = new IntersectionObserver(
          this.callbackRouter_anchor,
          box_observer
        );
        this.observers.push(observer),
          observer.observe(
            document.getElementById(box.dataset.jos_anchor.substring(1))
          );
      } else {
        const observer = new IntersectionObserver(
          this.callbackRouter,
          box_observer
        );
        this.observers.push(observer), observer.observe(box);
      }
    }),
      setTimeout(() => {
        doit.forEach((box) => {
          let box_time = box.dataset.jos_startvisible;
          setTimeout(() => {
            "true" == box_time && (box_time = 0),
              box.classList.remove("jos-" + box.dataset.jos_animation);
          }, box_time || this.default_startVisible);
        });
      }, 100);
  }
  animationUnset(state = 0) {
    -1 != state &&
      this.boxes?.forEach((box) => {
        box.classList.remove("jos"),
          box.classList.add("jos_disabled"),
          0 == state
            ? box.classList.add("jos-" + box.dataset.jos_animation)
            : box.classList.remove("jos-" + box.dataset.jos_animation);
      }),
      this.observers?.forEach((observer) => observer.disconnect());
  }
  getStylesheet() {
    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
    const styleSheet = styleElement.sheet;
    styleSheet.insertRule(
      ".jos-no-mirror {    transition: 0s forwards !important;}"
    );
    let s =
      "all " +
      this.default_duration +
      "s " +
      this.default_timingFunction +
      " " +
      this.default_delay +
      "s ;";
    styleSheet.insertRule(".jos {transition: " + s + ";}"),
      (this.jos_stylesheet = styleSheet);
  }
  getBoxes() {
    return (
      (this.boxes = void 0),
      this.boxes || (this.boxes = document.querySelectorAll(".jos")),
      this.boxes
    );
  }
  getDefault(options = {}) {
    let {
      once: once,
      animation: animation,
      animationinverse: animationinverse,
      timingFunction: timingFunction,
      threshold: threshold,
      startVisible: startVisible,
      scrollDirection: scrollDirection,
      intersectionRatio: intersectionRatio,
      duration: duration,
      mirror: mirror,
      delay: delay,
      debugMode: debugMode,
      disable: disable,
      rootMargin: rootMargin,
      rootMarginTop: rootMarginTop,
      rootMarginBottom: rootMarginBottom,
    } = options;
    (this.default_once = once || this.default_once),
      (this.default_animation = animation || this.default_animation),
      (this.default_animationinverse =
        animationinverse || this.default_animation),
      (this.default_timingFunction =
        timingFunction || this.default_timingFunction),
      (this.default_threshold = threshold || this.default_threshold),
      (this.default_startVisible = startVisible || this.default_startVisible),
      (this.default_scrolldirection =
        scrollDirection || this.default_scrolldirection),
      (this.default_intersectionRatio =
        intersectionRatio || this.default_threshold),
      (this.default_duration = duration || this.default_duration),
      (this.default_delay = delay || this.default_delay),
      (this.debugMode = debugMode || this.debugMode),
      (this.disable = disable || this.disable),
      (this.default_rootMargin =
        rootMargin ||
        `${rootMarginTop || "-10%"} 0% ${rootMarginBottom || "-40%"} 0%`),
      (this.default_mirror = mirror || this.default_mirror);
  }
  init(options = this.options) {
    (this.options = options),
      this.getDefault(options),
      this.getStylesheet(),
      this.getBoxes(),
      this.debugMode && this.debugger(),
      this.disable ? this.stop() : this.start();
  }
  start(state = 0) {
    return (
      -1 != state && (this.stop(), this.animationInit()),
      (this.disable = !1),
      "Started"
    );
  }
  stop(state = 0) {
    return (
      1 == state ? (state = 0) : 0 == state && (state = 1),
      (this.disable = !0),
      -1 != state && this.animationUnset(state),
      "Stopped"
    );
  }
  refresh() {
    return (
      this.animationUnset(-1),
      (this.boxes = void 0),
      this.getBoxes(),
      this.animationInit(),
      this.debugger(1),
      "Refreshed"
    );
  }
  destroy(state = 0) {
    this.animationUnset(-1),
      (this.boxes = void 0),
      (this.observers = []),
      1 == state && (this.jos_stylesheet.disabled = !0),
      (this.jos_stylesheet = void 0);
    for (let prop in this)
      this.hasOwnProperty(prop) &&
        "function" != typeof this[prop] &&
        (this[prop] = void 0);
    return Object.setPrototypeOf(this, null), "JOS Instance Nuked";
  }
}
const JOS = new jos();
"undefined" != typeof module &&
  void 0 !== module.exports &&
  (module.exports = JOS);
// By Jesvi Jonathan
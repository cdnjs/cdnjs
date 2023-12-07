class jos {
  default_once = false;
  default_animation = "fade";
  default_animationinverse = undefined;
  default_timingFunction = "ease-in-out";
  default_threshold = 0;
  default_duration = 0.4;
  default_delay = 0;
  default_intersectionRatio = 0;
  default_rootMargin = "-10% 0% -40% 0%";
  default_startVisible = undefined;
  default_scrolldirection = undefined;
  default_passive = true;

  debug = false;
  disable = false;

  static version = "0.8.1 (Debug)";
  static author = "Jesvi Jonathan";
  static github = "https://github.com/jesvijonathan/JOS-Animation-Library";

  options = {};
  jos_stylesheet = undefined;
  boxes = undefined;
  observers = [];

  constructor() {}

  version() {
    console.log(`JOS: Javascript On Scroll Animation Library
    - Version: ${jos.version}
    - Author: ${jos.author}
    - Github: ${jos.github}\n`);
  }
  //debugger = () => null;
  debugger(type = 0) {
    if (type == 0 && this.debugMode) {
      this.version();
      console.log(`JOS Settings:
- animation: ${this.default_animation}
- once: ${this.default_once}
- animationinverse: ${this.default_animationinverse}
- timingFunction: ${this.default_timingFunction}
- duration: ${this.default_duration}
- delay: ${this.default_delay}
- threshold: ${this.default_threshold}
- startVisible: ${this.default_startVisible}
- scrolldirection: ${this.default_scrolldirection}
- intersectionRatio: ${this.default_intersectionRatio}
- rootMargin: ${this.default_rootMargin}
- disable: ${this.disable}
- debugMode: ${this.debugMode}\n`);
    }
    console.log("JOS Initialized:\n\n");
    if ((type == 1 || type == 0) && this.debugMode) {
      console.log(this.boxes || "No Elements Found");
    }
  }

  callbackRouter_anchor = (entries, observer) => {
    let entry = entries[0];
    let parentTarget = entry.target;
    let elem = document.querySelectorAll(
      "[data-jos_anchor='#" + parentTarget.id + "']"
    );
    elem.forEach((target) => {
      let target_jos_animation = target.dataset.jos_animation;
      let target_jos_animationinverse = target.dataset.jos_animationinverse;
      let scroll_dir = 1;
      if (entry.isIntersecting) {
        if (target.dataset.jos_counter != undefined) {
          let counter_value = parseInt(target.dataset.jos_counter);
          counter_value++;
          target.dataset.jos_counter = counter_value;
        }
        if (target_jos_animation) {
          target.classList.remove("jos-" + target_jos_animation);
          if (target.dataset.jos_invoke != undefined) {
            window[target.dataset.jos_invoke](target);
          }
          if (
            target.dataset.jos_once != undefined ||
            target.dataset.jos_once != "false"
          ) {
            if (target.dataset.jos_once == "true") {
              observer.unobserve(target);
            } else if (target.dataset.jos_counter >= target.dataset.jos_once) {
              observer.unobserve(target);
            }
          }
          if (target_jos_animationinverse != undefined) {
            target.classList.add("jos-" + target_jos_animationinverse);
          }
        }
      } else {
        if (
          target.dataset.jos_scrolldirection === undefined ||
          (scroll_dir === 1 && target.dataset.jos_scrolldirection === "down") ||
          (scroll_dir === 0 && target.dataset.jos_scrolldirection === "up") ||
          target.dataset.jos_scrolldirection === "none"
        ) {
          target.classList.add("jos-" + target_jos_animation);
          if (target.dataset.jos_invoke_out !== undefined) {
            window[target.dataset.jos_invoke_out](target);
          }
        }
      }
    });
  };

  callbackRouter = (entries, observer, type = 1) => {
    if (this.disable == true) {
      return;
    }
    let entry = entries[0];
    let target = entry.target;
    let target_jos_animation = target.dataset.jos_animation;
    let target_jos_animationinverse = target.dataset.jos_animationinverse;
    let scroll_dir = 1;
    if (entry.boundingClientRect.top < 0) {
      scroll_dir = 0;
    } else {
      scroll_dir = 1;
    }
    if (entry.isIntersecting) {
      if (target.dataset.jos_counter != undefined) {
        let counter_value = parseInt(target.dataset.jos_counter);
        counter_value++;
        target.dataset.jos_counter = counter_value;
      }
      if (target_jos_animation) {
        target.classList.remove("jos-" + target_jos_animation);
        if (target.dataset.jos_invoke != undefined) {
          window[target.dataset.jos_invoke](target);
        }
        if (
          target.dataset.jos_once != undefined ||
          target.dataset.jos_once != "false"
        ) {
          if (target.dataset.jos_once == "true") {
            observer.unobserve(target);
          } else if (target.dataset.jos_counter >= target.dataset.jos_once) {
            observer.unobserve(target);
          }
        }
      }
      if (target_jos_animationinverse != undefined) {
        target.classList.add("jos-" + target_jos_animationinverse);
      }
    } else {
      if (
        target.dataset.jos_scrolldirection === undefined ||
        (scroll_dir === 1 && target.dataset.jos_scrolldirection === "down") ||
        (scroll_dir === 0 && target.dataset.jos_scrolldirection === "up") ||
        target.dataset.jos_scrolldirection === "none"
      ) {
        target.classList.add("jos-" + target_jos_animation);
        if (target_jos_animationinverse != undefined) {
          target.classList.remove("jos-" + target_jos_animationinverse);
        }
        if (target.dataset.jos_invoke_out !== undefined) {
          window[target.dataset.jos_invoke_out](target);
        }
      }
    }
  };

  animationInit() {
    let doit = [];
    this.boxes.forEach((box) => {
      let object_default_once = box.dataset.jos_once;
      let object_default_animation =
        box.dataset.jos_animation || this.default_animation;
      let object_default_animationinverse = box.dataset.jos_animationinverse;
      let object_default_timingFunction = box.dataset.jos_timingFunction;
      let object_default_duration = box.dataset.jos_duration;
      let object_default_delay = box.dataset.jos_delay;
      if (box.classList.contains("jos_disabled")) {
        box.classList.remove("jos_disabled");
        box.classList.add("jos");
      }
      if (
        object_default_once &&
        (object_default_once == "true" || /^\d+$/.test(object_default_once))
      ) {
        box.setAttribute("data-jos_once", object_default_once);
      } else {
        box.setAttribute("data-jos_once", this.default_once ? "1" : "false");
      }
      box.setAttribute("data-jos_animation", object_default_animation);
      if (object_default_animationinverse) {
        box.setAttribute(
          "data-jos_animationinverse",
          object_default_animationinverse
        );
      }
      if (object_default_timingFunction) {
        box.setAttribute(
          "data-jos_timingFunction",
          object_default_timingFunction
        );
      }
      if (object_default_duration) {
        box.setAttribute("data-jos_duration", object_default_duration);
      }
      if (object_default_delay) {
        box.setAttribute("data-jos_delay", object_default_delay);
      }
      box.setAttribute("data-jos_counter", "0");
      box.classList.add("jos-" + object_default_animation);
      if (box.dataset.jos_startvisible || this.default_startVisible) {
        doit.push(box);
      }
      if (this.default_scrolldirection) {
        box.setAttribute(
          "data-jos_scrolldirection",
          this.default_scrolldirection
        );
      }
      let rootMargin = [
        box.dataset.jos_rootmargin_top || this.default_rootMargin.split(" ")[0],
        box.dataset.jos_rootmargin_left ||
          this.default_rootMargin.split(" ")[3],
        box.dataset.jos_rootmargin_bottom ||
          this.default_rootMargin.split(" ")[2],
        box.dataset.jos_rootmargin_left ||
          this.default_rootMargin.split(" ")[1],
      ].join(" ");
      let box_observer = {
        rootMargin,
        threshold: this.default_threshold,
        passive: this.default_passive,
      };
      if (box.dataset.jos_anchor) {
        const observer = new IntersectionObserver(
          this.callbackRouter_anchor,
          box_observer
        );
        this.observers.push(observer);
        observer.observe(
          document.getElementById(box.dataset.jos_anchor.substring(1))
        );
      } else {
        const observer = new IntersectionObserver(
          this.callbackRouter,
          box_observer
        );
        this.observers.push(observer);
        observer.observe(box);
      }
    });
    setTimeout(() => {
      doit.forEach((box) => {
        let box_time = box.dataset.jos_startvisible;
        setTimeout(() => {
          if (box_time == "true") {
            box_time = 0;
          }
          box.classList.remove("jos-" + box.dataset.jos_animation);
        }, box_time || this.default_startVisible);
      });
    }, 100);
  }

  animationUnset(state = 0) {
    if (state != -1) {
      this.boxes?.forEach((box) => {
        box.classList.remove("jos");
        box.classList.add("jos_disabled");
        if (state == 0) {
          box.classList.add("jos-" + box.dataset.jos_animation);
        } else {
          box.classList.remove("jos-" + box.dataset.jos_animation);
        }
      });
    }
    this.observers?.forEach((observer) => observer.disconnect());
  }

  getstylesheet() {
    if (!this.jos_stylesheet) {
      this.jos_stylesheet = document.getElementById("jos-stylesheet").sheet;
    }
    this.jos_stylesheet.insertRule(
      ".jos {" +
        ("transition: " +
          this.default_duration +
          "s " +
          this.default_timingFunction +
          " " +
          this.default_delay +
          "s !important;") +
        "}"
    );
    return this.jos_stylesheet;
  }

  getBoxes() {
    this.boxes = undefined;

    if (!this.boxes) {
      this.boxes = document.querySelectorAll(".jos");
    }
    return this.boxes;
  }

  getdefault(options = {}) {
    let {
      once,
      animation,
      animationinverse,
      timingFunction,
      threshold,
      startVisible,
      scrollDirection,
      intersectionRatio,
      duration,
      delay,
      debugMode,
      disable,
      rootMargin,
      rootMarginTop,
      rootMarginBottom,
    } = options;
    this.default_once = once || this.default_once;
    this.default_animation = animation || this.default_animation;
    this.default_animationinverse = animationinverse || this.default_animation;
    this.default_timingFunction = timingFunction || this.default_timingFunction;
    this.default_threshold = threshold || this.default_threshold;
    this.default_startVisible = startVisible || this.default_startVisible;
    this.default_scrolldirection =
      scrollDirection || this.default_scrolldirection;
    this.default_intersectionRatio =
      intersectionRatio || this.default_threshold;
    this.default_duration = duration || this.default_duration;
    this.default_delay = delay || this.default_delay;
    this.debugMode = debugMode || this.debugMode;
    this.disable = disable || this.disable;
    this.default_rootMargin =
      rootMargin ||
      `${rootMarginTop || "-10%"} 0% ${rootMarginBottom || "-40%"} 0%`;
  }

  init(options = this.options) {
    this.options = options;
    this.getdefault(options);
    this.getstylesheet();
    this.getBoxes();
    if (this.debugMode) {
      this.debugger();
    }
    if (this.disable) {
      this.stop();
    } else {
      this.start();
    }
  }

  start(state = 0) {
    // 0 - Normal/Full Start
    // -1 - Resume with current state
    if (state != -1) {
      this.stop();
      this.animationInit();
    }
    this.disable = false;
    return "Started";
  }

  stop(state = 0) {
    if (state == 1) {
      state = 0;
    } else if (state == 0) {
      state = 1;
    }
    // 0 - Stop | final state | opacity 1
    // 1 - Stop | blank | opacity 0
    // -1 - Pause | final state of elements in viewport
    this.disable = true;
    if (state != -1) {
      this.animationUnset(state);
    }
    return "Stopped";
  }
  refresh() {
    this.animationUnset(-1);
    this.boxes = undefined;
    this.getBoxes();
    this.animationInit();
    this.debugger(1);
    return "Refreshed";
  }

  destroy(state = 0) {
    // 0 - dont remove stylesheet | To preseve state
    // 1 - remove along with stylesheet & jos stylesheet reference
    this.animationUnset(-1);
    this.boxes = undefined;
    this.observers = [];
    if (state == 1) {
      this.jos_stylesheet.disabled = true;
    }
    this.jos_stylesheet = undefined;
    for (let prop in this) {
      if (this.hasOwnProperty(prop) && typeof this[prop] !== "function") {
        this[prop] = undefined;
      }
    }
    Object.setPrototypeOf(this, null);
    return "JOS Instance Nuked";
  }
}
const JOS = new jos();
// By Jesvi Jonathan
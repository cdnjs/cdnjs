/********************************************/
/*			© Arthur Guiot 2017				*/
/*				DisplayJS					*/
/*			https://display.js.org/			*/
/********************************************/
class DisplayJS {
  constructor(obj) {
    this.obj = obj;
  }
  /* DOM manipulation and browser API.*/
  var(push) {
    // the function
    const var_push = () => {
      this.if();
      this.else();
      const elements = document.querySelectorAll("[var]");
      for (let i = 0; i < elements.length; i++) {
        const attr = elements[i].getAttribute("var");

        if (!attr.includes(".")) {
          elements[i].innerHTML = this.obj[attr];
        } else {
          const parts = attr.split(".");
          let val = this.obj[parts[0]];

          for (let p = 1; p < parts.length; p++) {
            val = val[parts[p]];
          }

          elements[i].innerHTML = val;
        }
      }
    };
    // push var cheking
    if (!push) {
      var_push();
    } else if (push == true) {
      var_push();
      this.live(this.obj, () => {
        var_push();
      });
    } else {
      window.setInterval(() => {
        var_push();
      }, push);
    }
  }
  // aliases of $.var();
  render(push) {
    this.var(push);
  }
  renderVariables(push) {
    this.var(push);
  }
  // Transform HTML special chars
  xss(str) {
    const lt = /</g;
    const gt = />/g;
    const ap = /'/g;
    const ic = /"/g;
    return str
      .toString()
      .replace(lt, "&lt;")
      .replace(gt, "&gt;")
      .replace(ap, "&#39;")
      .replace(ic, "&#34;");
  }
  // encode the URI
  xssURI(str) {
    return encodeURI(str);
  }
  // Target input to variable
  target(
    callback = () => {
      this.var();
    }
  ) {
    const addEventListener = (() => {
      if (document.addEventListener) {
        return (element, event, handler) => {
          element.addEventListener(event, handler, false);
        };
      }

      return (element, event, handler) => {
        element.attachEvent(`on${event}`, handler);
      };
    })();
    const obj = this.obj;
    [].forEach.call(document.querySelectorAll("[target]"), x => {
      addEventListener(x, "change", function() {
        const attr1 = x.getAttribute("target");
        if (this.type == "checkbox") {
          obj[attr1] = this.checked;
        } else if (this.type == "select") {
          obj[attr1] = this.options[this.selectedIndex].value;
        } else {
          obj[attr1] = this.value;
        }
        callback(x);
      });
      addEventListener(x, "keydown", function() {
        const attr2 = x.getAttribute("target");
        if (this.type == "checkbox") {
          obj[attr2] = this.checked;
        } else if (this.type == "select") {
          obj[attr2] = this.options[this.selectedIndex].value;
        } else {
          obj[attr2] = this.value;
        }
        callback(x);
      });
      addEventListener(x, "input", function() {
        const attr3 = x.getAttribute("target");
        if (this.type == "checkbox") {
          obj[attr3] = this.checked;
        } else if (this.type == "select") {
          obj[attr3] = this.options[this.selectedIndex].value;
        } else {
          obj[attr3] = this.value;
        }
        callback(x);
      });
      addEventListener(x, "paste", function() {
        const attr4 = x.getAttribute("target");
        if (this.type == "checkbox") {
          obj[attr4] = this.checked;
        } else if (this.type == "select") {
          obj[attr4] = this.options[this.selectedIndex].value;
        } else {
          obj[attr4] = this.value;
        }
        callback(x);
      });
    });
  }
  // if...else function
  if(push) {
    const if_push = () => {
      const elements = document.querySelectorAll("[if]");
      for (let i = 0; i < elements.length; i++) {
        const attr = elements[i].getAttribute("if");
        const el = [];
        el.push(elements[i]);
        if (eval(this.obj[attr])) {
          this.show(this.toNodeList(el[0]));
        } else {
          this.hide(this.toNodeList(el[0]));
        }
      }
    };
    if (!push) {
      if_push();
    } else if (push == true) {
      if_push();
      this.live(this.obj, () => {
        if_push();
      });
    } else {
      window.setInterval(() => {
        if_push();
      }, push);
    }
  }
  else(push) {
    const else_push = () => {
      const elements = document.querySelectorAll("[else]");
      for (let i = 0; i < elements.length; i++) {
        const attr = elements[i].getAttribute("else");
        const el = [];
        el.push(elements[i]);
        if (eval(this.obj[attr])) {
          this.hide(this.toNodeList(el[0]));
        } else {
          this.show(this.toNodeList(el[0]));
        }
      }
    };
    if (!push) {
      else_push();
    } else if (push == true) {
      else_push();
      this.live(this.obj, () => {
        else_push();
      });
    } else {
      window.setInterval(() => {
        else_push();
      }, push);
    }
  }
  toNodeList(el) {
    el.setAttribute("wrapNodeList", "");
    const list = document.querySelectorAll("[wrapNodeList]");
    el.removeAttribute("wrapNodeList");
    return list;
  }
  // custom repeat function
  repeat(el, array, join, start = "", end = "") {
    el = this.s(el);
    let text = start;
    if (typeof join == "object") {
      for (let i = 0; i < array.length; i++) {
        text += join[i] + String(array[i]);
      }
    } else {
      for (let i = 0; i < array.length; i++) {
        text += join + String(array[i]);
      }
    }
    text += end;
    el[0].innerHTML = text;
  }
  // parsing the DOM for on and action attribute
  onEvent() {
    const elements = document.querySelectorAll("[on]");
    for (let i = 0; i < elements.length; i++) {
      const attr = elements[i].getAttribute("on");
      const action = elements[i].getAttribute("action");
      elements[i].addEventListener(attr, () => {
        eval(action);
      });
    }
  }
  // apply function to each elements selected
  all(el, callback) {
    el = this.s(el);
    el.forEach(data => {
      callback(this.toNodeList(data));
    });
  }
  /* Basic DOM manipulation */
  text(el, text) {
    el = this.s(el);
    return text ? (el[0].innerHTML = this.xss(text)) : el[0].innerHTML;
  }
  html(el, html) {
    el = this.s(el);
    return html ? (el[0].innerHTML = html) : el[0].innerHTML;
  }
  append(el, html) {
    el = this.s(el);
    el[0].innerHTML += html;
  }
  after(el, html) {
    el = this.s(el);
    el[0].insertAdjacentHTML("afterend", html);
  }
  before(el, html) {
    el = this.s(el);
    el[0].insertAdjacentHTML("beforebegin", html);
  }
  clone(el) {
    el[0].cloneNode(true);
  }
  is(el1, el2) {
    el1 = this.s(el1);
    el2 = this.s(el2);
    if (el1[0] === el2[0]) {
      return true;
    }
    return false;
  }
  select(str) {
    return str instanceof NodeList ? str : document.querySelectorAll(str);
  }
  single(str) {
    return this.isElement(str) ? str : document.querySelector(str);
  }
  // alias of $.select()
  s(str) {
    return this.select(str);
  }
  empty(el) {
    el = this.s(el);
    el[0].innerHTML = "";
  }
  valEmpty(el) {
    el = this.s(el);
    el[0].value = null;
  }
  remove(el) {
    el = this.s(el);
    el[0].parentNode.removeChild(el[0]);
  }
  on(el, event, callback) {
    el = this.s(el);
    el[0].addEventListener(event, callback);
  }
  ready(fn) {
    if (
      document.attachEvent
        ? document.readyState === "complete"
        : document.readyState !== "loading"
    ) {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }
  scroll(callback) {
    window.addEventListener("scroll", callback);
  }
  scrollTo(x, y) {
    window.scroll(x, y);
  }
  scrollTop(el) {
    el =
      el != null
        ? el
        : document.body.scrollTop == 0
          ? this.toNodeList(document.documentElement)
          : this.toNodeList(document.body);
    el = this.s(el);
    return el[0].scrollTop;
  }
  show(el) {
    el = this.s(el);
    el[0].style.display = "block";
    return true;
  }
  hide(el) {
    el = this.s(el);
    el[0].style.display = "none";
    return true;
  }
  hasClass(el, className) {
    el = this.s(el);
    if (el[0].classList) {
      return el[0].classList.contains(className);
    }
    return !!el[0].className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
  }
  addClass(el, className) {
    el = this.s(el);
    if (el[0].classList) {
      el[0].classList.add(className);
    } else if (!this.hasClass(el, className)) {
      el[0].className += ` ${className}`;
    }
  }
  removeClass(el, className) {
    el = this.s(el);
    if (el[0].classList) {
      el[0].classList.remove(className);
    } else if (this.hasClass(el, className)) {
      const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
      el[0].className = el[0].className.replace(reg, " ");
    }
  }
  toggleClass(el, className) {
    el = this.s(el);
    if (this.hasClass(el, className)) {
      this.removeClass(el, className);
    } else {
      this.addClass(el, className);
    }
  }
  css(el, name, value) {
    el = this.s(el);
    if (typeof name == "object") {
      for (let i in name) {
        el[0].style[i] = name[i];
      }
    } else {
      el[0].style[name] = value;
    }
  }
  getStyle(el, styleProp) {
    el = this.s(el);
    return el[0].style[styleProp];
  }
  fadeOut(el, i = 0.1) {
    el = this.s(el)[0];
    el.style.opacity = 1;

    (function fade() {
      if ((el.style.opacity -= i) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }
  fadeIn(el, i = 0.1, display) {
    el = this.s(el)[0];
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
      let val = parseFloat(el.style.opacity);
      if (!((val += i) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }
  // Create a function in the DisplayJS object
  get fn() {
    return DisplayJS.prototype;
  }
  // dynamically update something
  dynamic(callback, push = 250) {
    window.setInterval(callback, push);
  }
  parent(el, n = 0) {
    el = this.s(el);
    let newEl = el[0];
    for (const i in this.range(n)) {
      newEl = newEl.parentNode;
    }
    return this.toNodeList(newEl);
  }
  isNode(el) {
    return typeof Node === "object"
      ? el instanceof Node
      : el &&
          typeof el === "object" &&
          typeof el.nodeType === "number" &&
          typeof el.nodeName === "string";
  }
  isElement(el) {
    return typeof HTMLElement === "object"
      ? el instanceof HTMLElement //DOM2
      : el &&
          typeof el === "object" &&
          el !== null &&
          el.nodeType === 1 &&
          typeof el.nodeName === "string";
  }
  // create custom component
  component(name, callback) {
    class component extends HTMLElement {
      constructor() {
        super();
        callback(this);
      }
    }
    customElements.define(name, component);
  }
  // import a script
  import(source, callback) {
    let script = document.createElement("script");
    const prior = document.getElementsByTagName("script")[0];
    script.async = 1;

    script.onload = script.onreadystatechange = (_, isAbort) => {
      if (
        isAbort ||
        !script.readyState ||
        /loaded|complete/.test(script.readyState)
      ) {
        script.onload = script.onreadystatechange = null;
        script = undefined;

        if (!isAbort) {
          if (callback) callback();
        }
      }
    };

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
  }
  sleep(ms) {
    const waitUntil = new Date().getTime() + ms;
    while (new Date().getTime() < waitUntil) true;
  }
  getProp(el) {
    el = this.s(el);
    return this.extend(el[0], {
      text: el[0].innerText,
      html: el[0].innerHTML,
      css: window.getComputedStyle(el[0]),
      height: el[0].outerHeight,
      width: el[0].outerWidth
    });
  }

  // Math and array manipulation + includes
  extend(defaults, options) {
    const extended = {};
    let prop;
    for (prop in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
        extended[prop] = defaults[prop];
      }
    }
    for (prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        extended[prop] = options[prop];
      }
    }
    return extended;
  }
  arange(start, end, step, offset) {
    const len = (Math.abs(end - start) + (offset || 0) * 2) / (step || 1) + 1;
    const direction = start < end ? 1 : -1;
    const startingPoint = start - direction * (offset || 0);
    const stepSize = direction * (step || 1);

    return Array(len)
      .fill(0)
      .map((_, index) => startingPoint + stepSize * index);
  }
  range(n) {
    return this.arange(0, n, 1);
  }
  linespace(start, end, n) {
    const diff = end - start;
    const step = diff / n;
    return this.arange(start, end, step);
  }
  reshape(array, part) {
    const tmp = [];
    for (let i = 0; i < array.length; i += part) {
      tmp.push(array.slice(i, i + part));
    }
    return tmp;
  }
  flatten(array) {
    return array.reduce((a, b) => a.concat(b), []);
  }
  drop(array, val) {
    return val > 0
      ? array.slice(val, array.length)
      : array.slice(0, array.length + val);
  }
  isIn(array, val) {
    return array.includes(val) ? true : false;
  }
  rmFromArray(array, condition) {
    const obj = [];
    for (const i in array) {
      if (condition(i) == !1) {
        obj.push(array[i]);
      }
    }
    return obj;
  }
  //= includes
}
// Browserify / Node.js
if (typeof define === "function" && define.amd) {
  define(() => new DisplayJS());
  // CommonJS and Node.js module support.
} else if (typeof exports !== "undefined") {
  // Support Node.js specific `module.exports` (which can be a function)
  if (typeof module !== "undefined" && module.exports) {
    exports = module.exports = new DisplayJS();
  }
  // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
  exports.DisplayJS = new DisplayJS();
} else if (typeof global !== "undefined") {
  global.DisplayJS = new DisplayJS();
}

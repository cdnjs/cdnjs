"use strict";
function _toConsumableArray(e) {
  return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(e, r) {
  if (e) {
    if ("string" == typeof e) return _arrayLikeToArray(e, r);
    var t = Object.prototype.toString.call(e).slice(8, -1);
    return (
      "Object" === t && e.constructor && (t = e.constructor.name),
      "Map" === t || "Set" === t
        ? Array.from(e)
        : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        ? _arrayLikeToArray(e, r)
        : void 0
    );
  }
}

function _iterableToArray(e) {
  if (("undefined" != typeof Symbol && null != e[Symbol.iterator]) || null != e["@@iterator"]) return Array.from(e);
}

function _arrayWithoutHoles(e) {
  if (Array.isArray(e)) return _arrayLikeToArray(e);
}

function _arrayLikeToArray(e, r) {
  (null == r || r > e.length) && (r = e.length);
  for (var t = 0, a = new Array(r); t < r; t++) a[t] = e[t];
  return a;
}

function _classCallCheck(e, r) {
  if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var a = r[t];
    (a.enumerable = a.enumerable || !1),
      (a.configurable = !0),
      "value" in a && (a.writable = !0),
      Object.defineProperty(e, a.key, a);
  }
}

function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), e;
}
var peopleConfig = {
    src: GLOBAL_CONFIG.peoplecanvas.img,
    rows: 15,
    cols: 7,
  },
  randomRange = function (e, r) {
    return e + Math.random() * (r - e);
  },
  randomIndex = function (e) {
    return 0 | randomRange(0, e.length);
  },
  removeFromArray = function (e, r) {
    return e.splice(r, 1)[0];
  },
  removeItemFromArray = function (e, r) {
    return removeFromArray(e, e.indexOf(r));
  },
  removeRandomFromArray = function (e) {
    return removeFromArray(e, randomIndex(e));
  },
  getRandomFromArray = function (e) {
    return e[0 | randomIndex(e)];
  },
  resetPeep = function (e) {
    var r,
      t,
      a = e.stage,
      n = e.peep,
      o = 0.5 < Math.random() ? 1 : -1,
      i = 100 - 250 * gsap.parseEase("power2.in")(Math.random()),
      s = a.height - n.height + i;
    return (
      1 == o ? ((r = -n.width), (t = a.width), (n.scaleX = 1)) : ((r = a.width + n.width), (t = 0), (n.scaleX = -1)),
      (n.x = r),
      (n.y = s),
      {
        startX: r,
        startY: (n.anchorY = s),
        endX: t,
      }
    );
  },
  normalWalk = function (e) {
    var r = e.peep,
      t = e.props,
      a = (t.startX, t.startY),
      n = t.endX,
      o = gsap.timeline();
    return (
      o.timeScale(randomRange(0.5, 1.5)),
      o.to(
        r,
        {
          duration: 10,
          x: n,
          ease: "none",
        },
        0
      ),
      o.to(
        r,
        {
          duration: 0.25,
          repeat: 40,
          yoyo: !0,
          y: a - 10,
        },
        0
      ),
      o
    );
  },
  walks = [normalWalk],
  Peep = (function () {
    function a(e) {
      var r = e.image,
        t = e.rect;
      _classCallCheck(this, a),
        (this.image = r),
        this.setRect(t),
        (this.x = 0),
        (this.y = 0),
        (this.anchorY = 0),
        (this.scaleX = 1),
        (this.walk = null);
    }
    return (
      _createClass(a, [
        {
          key: "setRect",
          value: function (e) {
            (this.rect = e),
              (this.width = e[2]),
              (this.height = e[3]),
              (this.drawArgs = [this.image].concat(_toConsumableArray(e), [0, 0, this.width, this.height]));
          },
        },
        {
          key: "render",
          value: function (e) {
            e.save(),
              e.translate(this.x, this.y),
              e.scale(this.scaleX, 1),
              e.drawImage.apply(e, _toConsumableArray(this.drawArgs)),
              e.restore();
          },
        },
      ]),
      a
    );
  })(),
  img = document.createElement("img");
(img.onload = init), (img.src = peopleConfig.src);
let peoplecanvasEl = document.getElementById("peoplecanvas");

let ctx = peoplecanvasEl ? peoplecanvasEl.getContext("2d") : undefined,
  stage = {
    width: 0,
    height: 0,
  },
  allPeeps = [],
  availablePeeps = [],
  crowd = [];

function init() {
  if (!peoplecanvasEl) return;
  createPeeps(), resize(), gsap.ticker.add(render), window.addEventListener("resize", resize);
}
document.addEventListener("pjax:success", e => {
  peoplecanvasEl = document.getElementById("peoplecanvas");
  if (peoplecanvasEl) {
    (ctx = peoplecanvasEl ? peoplecanvasEl.getContext("2d") : undefined), window.removeEventListener("resize", resize);
    gsap.ticker.remove(render);
    setTimeout(() => {
      if (!peoplecanvasEl) return;
      resize(), gsap.ticker.add(render), window.addEventListener("resize", resize);
    }, 300);
  }
});

function createPeeps() {
  for (
    var e = peopleConfig.rows,
      r = peopleConfig.cols,
      t = e * r,
      a = img.naturalWidth / e,
      n = img.naturalHeight / r,
      o = 0;
    o < t;
    o++
  )
    allPeeps.push(
      new Peep({
        image: img,
        rect: [(o % e) * a, ((o / e) | 0) * n, a, n],
      })
    );
}

function resize() {
  if (peoplecanvasEl && peoplecanvasEl.clientWidth != 0) {
    (stage.width = peoplecanvasEl.clientWidth),
      (stage.height = peoplecanvasEl.clientHeight),
      (peoplecanvasEl.width = stage.width * devicePixelRatio),
      (peoplecanvasEl.height = stage.height * devicePixelRatio),
      crowd.forEach(function (e) {
        e.walk.kill();
      }),
      (crowd.length = 0),
      (availablePeeps.length = 0),
      availablePeeps.push.apply(availablePeeps, allPeeps),
      initCrowd();
  }
}

function initCrowd() {
  for (; availablePeeps.length; ) addPeepToCrowd().walk.progress(Math.random());
}

function addPeepToCrowd() {
  var e = removeRandomFromArray(availablePeeps),
    r = getRandomFromArray(walks)({
      peep: e,
      props: resetPeep({
        peep: e,
        stage: stage,
      }),
    }).eventCallback("onComplete", function () {
      removePeepFromCrowd(e), addPeepToCrowd();
    });
  return (
    (e.walk = r),
    crowd.push(e),
    crowd.sort(function (e, r) {
      return e.anchorY - r.anchorY;
    }),
    e
  );
}

function removePeepFromCrowd(e) {
  removeItemFromArray(crowd, e), availablePeeps.push(e);
}

function render() {
  if (!peoplecanvasEl) return;
  (peoplecanvasEl.width = peoplecanvasEl.width),
    ctx.save(),
    ctx.scale(devicePixelRatio, devicePixelRatio),
    crowd.forEach(function (e) {
      e.render(ctx);
    }),
    ctx.restore();
}

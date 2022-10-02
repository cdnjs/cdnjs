let Parallax = {};
Parallax.options = {};
Parallax.options.speed = 0.25;
Parallax.options.zIndex = -100;
Parallax.options.fade = 1500;
Parallax.slidein = () => {
  let slider = Parallax.mirrors[0].slider;
  if (Parallax.mirrors.length >= 2) {
    slider = Parallax.mirrors[1].slider;
  }
  var opac = parseFloat(slider.style.opacity);
  if (opac !== 1) {
    if (Parallax.mirrors.length >= 2) {
      opac = opac + 0.1;
      slider.style.opacity = opac;
      setTimeout(Parallax.slidein, Parallax.options.fade / 10);
    }else{
      slider.style.opacity = 1;
    }
  } else {
    if (Parallax.mirrors.length >= 2) {
      Parallax.mirrors[0].mirror.remove();
      Parallax.mirrors.shift();
    }
  }
};
Parallax.start = () => {
  let mirror = document.createElement("div");
  mirror.classList.add("parallax-mirror");
  mirror.style.visibility = "hidden";
  mirror.style.zIndex = Parallax.options.zIndex;
  mirror.style.position = "fixed";
  mirror.style.top = 0;
  mirror.style.left = 0;
  mirror.style.overflow = "hidden";
  Parallax.window.appendChild(mirror);
  let slider = document.createElement("img");
  slider.src = Parallax.options.src;
  slider.alt = "parallax";
  slider.classList.add("parallax-slider");
  slider.style.opacity = 0;
  mirror.appendChild(slider);
  if (!Parallax.mirrors) {
    Parallax.mirrors = [];
  }
  let mirrorItem = {};
  mirrorItem.mirror = mirror;
  mirrorItem.slider = slider;
  Parallax.mirrors.push(mirrorItem);
  Parallax.slidein();
  slider.addEventListener(
    "load",
    function () {
      Parallax.update();
    },
    false
  );
};
Parallax.init = () => {
  function loadDimensions() {
    Parallax.wH = document.documentElement.clientHeight;
    Parallax.wW = document.documentElement.clientWidth;
  }
  function getScrollTop() {
    var scrollPos;
    if (window.pageYOffset) {
      scrollPos = window.pageYOffset;
    } else if (document.compatMode && document.compatMode != "BackCompat") {
      scrollPos = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollPos = document.body.scrollTop;
    }
    return scrollPos;
  }
  function loadScrollPosition() {
    const winScrollTop = getScrollTop();
    Parallax.sT = Math.max(0, winScrollTop);
    Parallax.sL = Math.max(0, document.body.scrollLeft);
    Parallax.overScroll = Math.min(winScrollTop, 0);
  }
  window.addEventListener(
    "resize",
    function () {
      loadDimensions();
      Parallax.update();
    },
    false
  );
  loadDimensions();
  let lastPosition = -1;
  (function loop() {
    const yoffset = getScrollTop();
    if (lastPosition !== yoffset) {
      lastPosition = yoffset;
      loadScrollPosition();
      Parallax.update();
    }
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame;
    window.requestAnimationFrame(loop);
  })();
};

Parallax.refreshItem = (slider) => {
  Parallax.options.aspectRatio =
    slider.naturalWidth / (slider.naturalHeight || 1);
  const aspect = Parallax.options.aspectRatio || 1;
  Parallax.options.boxWidth = Parallax.window.clientWidth;
  Parallax.options.boxHeight = Parallax.window.clientHeight;
  Parallax.options.boxOffsetTop = Parallax.window.scrollTop;
  Parallax.options.boxOffsetLeft = Parallax.window.scrollLeft;
  Parallax.options.boxOffsetBottom =
    Parallax.options.boxOffsetTop + Parallax.options.boxHeight;
  const winHeight = Parallax.wH;
  const maxOffset = Parallax.options.boxOffsetTop;
  const minOffset = Math.max(
    Parallax.options.boxOffsetTop + Parallax.options.boxHeight - winHeight,
    0
  );
  const imageHeightMin =
    (Parallax.options.boxHeight +
      (maxOffset - minOffset) * (1 - Parallax.options.speed)) |
    0;
  const imageOffsetMin =
    ((Parallax.options.boxOffsetTop - maxOffset) *
      (1 - Parallax.options.speed)) |
    0;
  let margin;
  if (Parallax.options.boxWidth < imageHeightMin * aspect) {
    Parallax.options.imageWidth = (imageHeightMin * aspect) | 0;
    Parallax.options.imageHeight = imageHeightMin;
    Parallax.options.offsetBaseTop = imageOffsetMin;
    margin = Parallax.options.imageWidth - Parallax.options.boxWidth;
    Parallax.options.offsetLeft = (-margin / 2) | 0;
  } else {
    Parallax.options.imageWidth = Parallax.options.boxWidth;
    Parallax.options.imageHeight = (Parallax.options.boxWidth / aspect) | 0;
    Parallax.options.offsetLeft = 0;
    margin = Parallax.options.imageHeight - imageHeightMin;
    Parallax.options.offsetBaseTop = (imageOffsetMin - margin / 2) | 0;
  }
};
Parallax.renderItem = (mirror, slider) => {
  const scrollTop = Parallax.sT;
  const scrollLeft = Parallax.sL;
  const scrollBottom = scrollTop + Parallax.wH;
  if (
    Parallax.options.boxOffsetBottom > scrollTop &&
    Parallax.options.boxOffsetTop <= scrollBottom
  ) {
    Parallax.options.visibility = "visible";
    Parallax.options.mirrorTop = Parallax.options.boxOffsetTop - scrollTop;
    Parallax.options.mirrorLeft = Parallax.options.boxOffsetLeft - scrollLeft;
    Parallax.options.offsetTop =
      Parallax.options.offsetBaseTop -
      Parallax.options.mirrorTop * (1 - Parallax.options.speed);
  } else {
    Parallax.options.visibility = "hidden";
  }
  mirror.style.transform =
    "translate3d(" +
    Parallax.options.mirrorLeft +
    "px, " +
    Parallax.options.mirrorTop +
    "px, 0px)";
  mirror.style.visibility = Parallax.options.visibility;
  mirror.style.height = Parallax.options.boxHeight + "px";
  mirror.style.width = Parallax.options.boxWidth + "px";

  slider.style.transform =
    "translate3d(" +
    Parallax.options.offsetLeft +
    "px, " +
    Parallax.options.offsetTop +
    "px, 0px)";
  slider.style.position = "absolute";
  slider.style.height = Parallax.options.imageHeight + "px";
  slider.style.width = Parallax.options.imageWidth + "px";
  slider.style.maxWidth = "none";
};
Parallax.update = () => {
  if (!Parallax.mirrors) {
    return
  }
  Parallax.mirrors.forEach((e) => {
    Parallax.refreshItem(e.slider);
    Parallax.renderItem(e.mirror, e.slider);
  });
};

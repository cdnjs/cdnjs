export function initMasonry() {
  var loadingPlaceholder = document.querySelector(".loading-placeholder");
  var masonryContainer = document.querySelector("#masonry-container");
  if (!loadingPlaceholder || !masonryContainer) return;

  loadingPlaceholder.style.display = "block";
  masonryContainer.style.display = "none";

  var images = document.querySelectorAll(
    "#masonry-container .masonry-item img",
  );
  var loadedCount = 0;

  function onImageLoad() {
    loadedCount++;
    if (loadedCount === images.length) {
      initializeMasonryLayout();
    }
  }

  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    if (img.complete) {
      onImageLoad();
    } else {
      img.addEventListener("load", onImageLoad);
    }
  }

  if (loadedCount === images.length) {
    initializeMasonryLayout();
  }
  function initializeMasonryLayout() {
    loadingPlaceholder.style.opacity = 0;
    setTimeout(() => {
      loadingPlaceholder.style.display = "none";
      masonryContainer.style.display = "block";
      var masonry = new MiniMasonry({
        baseWidth: 255,
        container: masonryContainer,
        gutterX: 10,
        gutterY: 10,
        surroundingGutter: false,
      });
      masonry.layout();
      masonryContainer.style.opacity = 1;
    }, 100);
  }
}

if (Global.data_config.masonry) {
  try {
    swup.hooks.on("page:view", initMasonry);
  } catch (e) {}

  document.addEventListener("DOMContentLoaded", initMasonry);
}

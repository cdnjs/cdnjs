Global.initMasonry = () => {
  var loadingPlaceholder = document.querySelector(".loading-placeholder");
  var masonryContainer = document.querySelector("#masonry-container");
  if (!loadingPlaceholder || !masonryContainer) return;

  loadingPlaceholder.style.display = "block";
  masonryContainer.style.display = "none";

  var images = document.querySelectorAll("#masonry-container .masonry-item img");
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
    loadingPlaceholder.style.display = "none";
    masonryContainer.style.display = "block";

    var masonry = new MiniMasonry({
      container: masonryContainer,
      gutterX: 10,
      gutterY: 5,
      surroundingGutter: false,
    });
    masonry.layout();
  }
}

  

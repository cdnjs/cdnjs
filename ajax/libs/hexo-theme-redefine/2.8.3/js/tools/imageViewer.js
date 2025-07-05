export default function imageViewer() {
  let isBigImage = false;
  let scale = 1;
  let isMouseDown = false;
  let dragged = false;
  let currentImgIndex = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let translateX = 0;
  let translateY = 0;

  const maskDom = document.querySelector(".image-viewer-container");
  if (!maskDom) {
    console.warn(
      "Image viewer container not found. Exiting imageViewer function.",
    );
    return;
  }

  const targetImg = maskDom.querySelector("img");
  if (!targetImg) {
    console.warn(
      "Target image not found in image viewer container. Exiting imageViewer function.",
    );
    return;
  }

  const showHandle = (isShow) => {
    document.body.style.overflow = isShow ? "hidden" : "auto";
    isShow
      ? maskDom.classList.add("active")
      : maskDom.classList.remove("active");
  };

  const zoomHandle = (event) => {
    event.preventDefault();
    const rect = targetImg.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const dx = offsetX - rect.width / 2;
    const dy = offsetY - rect.height / 2;
    const oldScale = scale;
    scale += event.deltaY * -0.001;
    scale = Math.min(Math.max(0.8, scale), 4);

    if (oldScale < scale) {
      // Zooming in
      translateX -= dx * (scale - oldScale);
      translateY -= dy * (scale - oldScale);
    } else {
      // Zooming out
      translateX = 0;
      translateY = 0;
    }

    targetImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  };

  const dragStartHandle = (event) => {
    event.preventDefault();
    isMouseDown = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    targetImg.style.cursor = "grabbing";
  };

  let lastTime = 0;
  const throttle = 100;

  const dragHandle = (event) => {
    if (isMouseDown) {
      const currentTime = new Date().getTime();
      if (currentTime - lastTime < throttle) {
        return;
      }
      lastTime = currentTime;
      const deltaX = event.clientX - lastMouseX;
      const deltaY = event.clientY - lastMouseY;
      translateX += deltaX;
      translateY += deltaY;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
      targetImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      dragged = true;
    }
  };

  const dragEndHandle = (event) => {
    if (isMouseDown) {
      event.stopPropagation();
    }
    isMouseDown = false;
    targetImg.style.cursor = "grab";
  };

  targetImg.addEventListener("wheel", zoomHandle, { passive: false });
  targetImg.addEventListener("mousedown", dragStartHandle, { passive: false });
  targetImg.addEventListener("mousemove", dragHandle, { passive: false });
  targetImg.addEventListener("mouseup", dragEndHandle, { passive: false });
  targetImg.addEventListener("mouseleave", dragEndHandle, { passive: false });

  maskDom.addEventListener("click", (event) => {
    if (!dragged) {
      isBigImage = false;
      showHandle(isBigImage);
      scale = 1;
      translateX = 0;
      translateY = 0;
      targetImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
    dragged = false;
  });

  const imgDoms = document.querySelectorAll(
    ".markdown-body img, .masonry-item img, #shuoshuo-content img",
  );

  const escapeKeyListener = (event) => {
    if (event.key === "Escape" && isBigImage) {
      isBigImage = false;
      showHandle(isBigImage);
      scale = 1;
      translateX = 0;
      translateY = 0;
      targetImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      // Remove the event listener when the image viewer is closed
      document.removeEventListener("keydown", escapeKeyListener);
    }
  };

  if (imgDoms.length > 0) {
    imgDoms.forEach((img, index) => {
      img.addEventListener("click", () => {
        currentImgIndex = index;
        isBigImage = true;
        showHandle(isBigImage);
        targetImg.src = img.src;
        document.addEventListener("keydown", escapeKeyListener);
      });
    });

    const handleArrowKeys = (event) => {
      if (!isBigImage) return;

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        currentImgIndex =
          (currentImgIndex - 1 + imgDoms.length) % imgDoms.length;
      } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        currentImgIndex = (currentImgIndex + 1) % imgDoms.length;
      } else {
        return;
      }

      const currentImg = imgDoms[currentImgIndex];
      let newSrc = currentImg.src;

      if (currentImg.hasAttribute("lazyload")) {
        newSrc = currentImg.getAttribute("data-src");
        currentImg.src = newSrc;
        currentImg.removeAttribute("lazyload");
      }

      targetImg.src = newSrc;
    };

    document.addEventListener("keydown", handleArrowKeys);
  } else {
    // console.warn("No images found to attach image viewer functionality.");
  }
}

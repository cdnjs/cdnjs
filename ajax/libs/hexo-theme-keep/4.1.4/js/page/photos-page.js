/* global KEEP */

function photosPageHandle() {
  const layoutImages = () => {
    const gallery = document.querySelector('.photo-album-box')
    const images = gallery.querySelectorAll('img')
    const columns = 3
    gallery.style.columnCount = `${columns}`
    const columnHeights = new Array(columns).fill(0)
    images.forEach((img) => {
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights))
      img.style.column = shortestColumn + 1
      columnHeights[shortestColumn] += img.height
    })
  }
  layoutImages()
}

if (KEEP.theme_config?.pjax?.enable === true && KEEP.utils) {
  photosPageHandle()
} else {
  window.addEventListener('DOMContentLoaded', photosPageHandle)
}

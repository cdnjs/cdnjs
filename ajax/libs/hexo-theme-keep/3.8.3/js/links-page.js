/* global KEEP */

function linksPageHandle() {
  const friendsLinkBoxDom = document.querySelector('.friends-link-list')
  const linkTypeDoms = friendsLinkBoxDom.querySelectorAll('.link-type-title')
  const linksCount = friendsLinkBoxDom.querySelectorAll('.friends-link-item').length
  let columns = 2

  if (linksCount >= 80) {
    columns = 4
  } else if (linksCount >= 60) {
    columns = 3
  }

  friendsLinkBoxDom.style.gridTemplateColumns = `repeat(${columns}, 1fr)`
  linkTypeDoms.forEach((ltd) => {
    ltd.style.gridColumn = `span ${columns}`
  })
}

if (KEEP.theme_config.pjax.enable === true && KEEP.utils) {
  linksPageHandle()
} else {
  window.addEventListener('DOMContentLoaded', linksPageHandle)
}

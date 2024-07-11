/* global KEEP */

function linksPageHandle() {
  const friendsLinkBoxDom = document.querySelector('.friends-link-list')

  if (!friendsLinkBoxDom) {
    return
  }

  const linkTypeDoms = friendsLinkBoxDom.querySelectorAll('.link-type-title')
  const linkItemDoms = friendsLinkBoxDom.querySelectorAll('.friends-link-item')
  const linksCount = linkItemDoms.length
  let columns = 2

  if (linksCount >= 80) {
    columns = 4
  } else if (linksCount >= 60) {
    columns = 3
  }

  friendsLinkBoxDom.style.gridTemplateColumns = `repeat(${columns}, 1fr)`
  linkTypeDoms.forEach((ltd) => {
    ltd.style.gridColumn = `span ${columns}`

    let folded = false
    const siblings = []
    let nextSibling = ltd.nextElementSibling

    while (nextSibling) {
      if (nextSibling.classList.contains('friends-link-item')) {
        siblings.push(nextSibling)
        nextSibling = nextSibling.nextElementSibling
      } else {
        break
      }
    }

    const foldDom = ltd.querySelector('.fold')
    foldDom.addEventListener('click', () => {
      folded = !folded
      foldDom.classList.remove(`fa-chevron-${folded ? 'down' : 'left'}`)
      foldDom.classList.add(`fa-chevron-${folded ? 'left' : 'down'}`)
      siblings.forEach((link) => (link.style.display = folded ? 'none' : 'block'))
    })
  })
}

if (KEEP.theme_config?.pjax?.enable === true && KEEP.utils) {
  linksPageHandle()
} else {
  window.addEventListener('DOMContentLoaded', linksPageHandle)
}

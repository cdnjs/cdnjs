/* global KEEP */

function resetCategoriesPage() {
  const resetCategoryDom = (domList) => {
    domList.forEach((dom) => {
      const categoryNameDom = dom.querySelector('.site-all-category-list-link')
      const categoryCountDom = dom.querySelector('.site-all-category-list-count')
      const childCategoryInfo = dom.querySelector('.site-all-category-list-child')

      let domTemplate = `
            <div class="self-category-info">
              <div class="left">${
                childCategoryInfo ? '<i class="icon fa-solid fa-chevron-right"></i> ' : ''
              }${categoryNameDom.outerHTML}</div>
              <div class="right">${categoryCountDom.outerHTML}</div>
            </div>
          `

      if (childCategoryInfo) {
        resetCategoryDom(childCategoryInfo.querySelectorAll('.site-all-category-list-item'))
        domTemplate += childCategoryInfo.outerHTML
      }

      dom.innerHTML = domTemplate
    })
  }

  const expandHandle = () => {
    const selfCategoryInfoDom = document.querySelectorAll('.site-all-category-list-item')
    selfCategoryInfoDom.forEach((dom) => {
      let isExpand = false
      const iconDom = dom.querySelector('.self-category-info .left .icon')
      const childDom = dom.querySelector('.site-all-category-list-child')

      iconDom &&
        iconDom.addEventListener('click', () => {
          isExpand = !isExpand
          if (childDom) {
            if (isExpand) {
              childDom.style.height = 'auto'
              childDom.style.visibility = 'visible'
              iconDom.classList.add('fa-chevron-down')
              iconDom.classList.remove('fa-chevron-right')
            } else {
              childDom.style.height = '0'
              childDom.style.visibility = 'hidden'
              iconDom.classList.add('fa-chevron-right')
              iconDom.classList.remove('fa-chevron-down')
            }
          }
        })
    })
  }

  resetCategoryDom(
    document.querySelectorAll('.site-all-category-list .site-all-category-list-item')
  )

  expandHandle()
}

if (KEEP.theme_config.pjax.enable === true && KEEP.utils) {
  resetCategoriesPage()
} else {
  window.addEventListener('DOMContentLoaded', resetCategoriesPage)
}

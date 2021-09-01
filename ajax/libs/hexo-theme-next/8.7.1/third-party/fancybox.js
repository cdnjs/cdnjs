document.addEventListener('page:loaded', () => {

  /**
   * Wrap images with fancybox.
   */
  document.querySelectorAll('.post-body :not(a) > img, .post-body > img').forEach(element => {
    const $image = $(element);
    const imageLink = $image.attr('data-src') || $image.attr('src');
    const $imageWrapLink = $image.wrap(`<a class="fancybox fancybox.image" href="${imageLink}" itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>`).parent('a');
    if ($image.is('.post-gallery img')) {
      $imageWrapLink.attr('data-fancybox', 'gallery').attr('rel', 'gallery');
    } else if ($image.is('.group-picture img')) {
      $imageWrapLink.attr('data-fancybox', 'group').attr('rel', 'group');
    } else {
      $imageWrapLink.attr('data-fancybox', 'default').attr('rel', 'default');
    }

    const imageTitle = $image.attr('title') || $image.attr('alt');
    if (imageTitle) {
      // Do not append image-caption if pandoc has already created a figcaption
      if (!$imageWrapLink.next('figcaption').length) {
        $imageWrapLink.append(`<p class="image-caption">${imageTitle}</p>`);
      }
      // Make sure img title tag will show correctly in fancybox
      $imageWrapLink.attr('title', imageTitle).attr('data-caption', imageTitle);
    }
  });

  $.fancybox.defaults.hash = false;
  $('.fancybox').fancybox({
    loop   : true,
    helpers: {
      overlay: {
        locked: false
      }
    }
  });
});

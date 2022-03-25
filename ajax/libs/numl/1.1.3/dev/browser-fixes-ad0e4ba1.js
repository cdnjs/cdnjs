const isSafari =  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

function fixSafariInvisibleContents(el) {
  if (isSafari) {
    requestAnimationFrame(() => {
      el.style.display = 'block';
      requestAnimationFrame(() => {el.style.display = '';});
    });
  }
}

export { fixSafariInvisibleContents as f };

const initScrollTopBottom = () => {
  const backToTopButton_dom = document.querySelector(".tool-scroll-to-top");
  const backToBottomButton_dom = document.querySelector(
    ".tool-scroll-to-bottom",
  );

  const backToTop = () => {
    window.scrollTo({
      top: 0, // scrolls to the top of the page
      behavior: "smooth",
    });
  };

  const backToBottom = () => {
    const docHeight = document.body.scrollHeight;
    window.scrollTo({
      top: docHeight, // scrolls to the bottom of the page
      behavior: "smooth",
    });
  };

  const initBackToTop = () => {
    backToTopButton_dom.addEventListener("click", backToTop);
  };

  const initBackToBottom = () => {
    backToBottomButton_dom.addEventListener("click", backToBottom);
  };

  initBackToTop();
  initBackToBottom();
};

export default initScrollTopBottom;

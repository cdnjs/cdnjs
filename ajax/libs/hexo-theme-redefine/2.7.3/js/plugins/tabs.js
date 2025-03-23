function setTabs() {
  let tabs = document.querySelectorAll(".tabs .nav-tabs");
  if (!tabs) return;

  tabs.forEach((tab) => {
    tab.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const parentTab = e.target.parentElement.parentElement.parentElement;
        parentTab.querySelector(".nav-tabs .active").classList.remove("active");
        e.target.parentElement.classList.add("active");
        parentTab
          .querySelector(".tab-content .active")
          .classList.remove("active");
        parentTab.querySelector(e.target.className).classList.add("active");

        return false;
      });
    });
  });
}

try {
  swup.hooks.on("page:view", setTabs);
} catch (e) {}

document.addEventListener("DOMContentLoaded", setTabs);

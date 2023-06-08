/*
const sections = [...document.querySelectorAll("section")];

let options = {
  rootMargin: "0px",
  threshold: 0.25
};

const callback = (entries, observer) => {
  entries.forEach(entry => {
    const { target } = entry;
    console.log(entry, target)
    
    if (entry.intersectionRatio >= 0.25) {
      target.classList.add("is-visible");
    } else {
      target.classList.remove("is-visible");
    }
  });
};

const observer = new IntersectionObserver(callback, options);

sections.forEach((section, index) => {
  observer.observe(section);
});

window.onload(removeClass());

*/

//--------------------------------


const sections = $("section");

let options = {
  rootMargin: "0px",
  threshold: 0.25
};

const callback = (entries, observer) => {
  entries.forEach(entry => {
    const { target } = entry;
    console.log(entry, target);
    
    if (entry.intersectionRatio >= 0.25) {
      $(target).addClass("is-visible");
    } else {
      $(target).removeClass("is-visible");
    }
  });
};

const observer = new IntersectionObserver(callback, options);

sections.each((index, section) => {
  observer.observe(section);
});

$(window).on("load", removeClass);

function removeClass() {
  // Your removeClass function implementation goes here i.e. a callback
}

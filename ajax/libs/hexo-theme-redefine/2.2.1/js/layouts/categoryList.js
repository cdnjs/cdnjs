function categoryListInit() {
  var allParentElements = document.querySelectorAll(".all-category-list-item");

  let parentElements = Array.from(allParentElements).filter((item) => {
    return item.parentElement.classList.contains("all-category-list");
  });

  // Loop through each parent element
  // Set initial maxHeight and marginTop values for child elements
  parentElements.forEach(function (parentElement) {
    var childElements = parentElement.querySelectorAll(
      ".all-category-list-child"
    );
    childElements.forEach(function (childElement) {
      childElement.style.maxHeight = "0px";
      childElement.style.marginTop = "0px";
    });
  });

  // Loop through each parent element
  parentElements.forEach(function (parentElement, index) {
    // Add click event listener to the parent element
    parentElement.addEventListener("click", function () {
      // Toggle the display of child elements
      var childElements = parentElement.querySelectorAll(
        ".all-category-list-child"
      );
      childElements.forEach(function (childElement) {
        childElement.style.maxHeight =
          childElement.style.maxHeight === "0px" ? "1000px" : "0px";
        childElement.style.marginTop =
          childElement.style.marginTop === "0px" ? "15px" : "0px";
      });

      // If there is a next sibling in the parentElements array, toggle its display as well
      if (index % 2 === 0 && parentElements[index + 1]) {
        var siblingChildElements = parentElements[index + 1].querySelectorAll(
          ".all-category-list-child"
        );
        siblingChildElements.forEach(function (siblingChildElement) {
          siblingChildElement.style.maxHeight =
            siblingChildElement.style.maxHeight === "0px" ? "1000px" : "0px";
          siblingChildElement.style.marginTop =
            siblingChildElement.style.marginTop === "0px" ? "15px" : "0px";
        });
      }

      // If there is a previous sibling in the parentElements array, toggle its display as well
      if (index % 2 === 1 && parentElements[index - 1]) {
        var siblingChildElements = parentElements[index - 1].querySelectorAll(
          ".all-category-list-child"
        );
        siblingChildElements.forEach(function (siblingChildElement) {
          siblingChildElement.style.maxHeight =
            siblingChildElement.style.maxHeight === "0px" ? "1000px" : "0px";
          siblingChildElement.style.marginTop =
            siblingChildElement.style.marginTop === "0px" ? "15px" : "0px";
        });
      }
    });
  });
}


if (Global.theme_config.global.pjax === true && Global.utils) {
    categoryListInit();
} else {
    window.addEventListener('DOMContentLoaded', categoryListInit);
}

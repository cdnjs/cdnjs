// Function to format the dates
function formatEssayDates() {
  const dateElements = document.querySelectorAll(".essay-date");

  if (!dateElements) {
    return;
  }

  dateElements.forEach(function (element) {
    const rawDate = element.getAttribute("data-date");
    const locale = config.language || "en";

    const formattedDate = moment(rawDate).locale(locale).calendar();
    element.textContent = formattedDate;
  });
}

try {
  swup.hooks.on("page:view", formatEssayDates);
} catch (e) {
  console.error(e);
}

// Initial call for the first page load
document.addEventListener("DOMContentLoaded", formatEssayDates);

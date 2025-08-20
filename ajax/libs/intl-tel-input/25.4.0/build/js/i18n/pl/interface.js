const interfaceTranslations = {
  selectedCountryAriaLabel: "Wybrany kraj",
  noCountrySelected: "Nie wybrano kraju",
  countryListAriaLabel: "Lista krajów",
  searchPlaceholder: "Szukaj",
  searchResultsText(count) {
    if (count === 0) {
      return "Nie znaleziono wyników";
    }
    if (count === 1) {
      return "Znaleziono 1 wynik";
    }
    const isFew = count % 10 >= 2 && count % 10 <= 4 && !(count % 100 >= 12 && count % 100 <= 14);
    const suffix = isFew ? "wyniki" : "wyników";
    return `Znaleziono ${count} ${suffix}`;
  },
  // additional countries (not supported by country-list library)
  ac: "Wyspa Wniebowstąpienia",
  xk: "Kosowo"
};
export default interfaceTranslations;

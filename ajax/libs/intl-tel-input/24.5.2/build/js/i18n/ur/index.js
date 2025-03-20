import countryTranslations from "./countries.js";
import interfaceTranslations from "./interface.js";
export { countryTranslations, interfaceTranslations };
const allTranslations = { ...countryTranslations, ...interfaceTranslations };
export default allTranslations;

import * as Browser from "@hyperjump/browser";


const id = "https://json-schema.org/keyword/title";

const compile = (schema) => Browser.value(schema);
const interpret = () => true;
const annotation = (title) => title;

export default { id, compile, interpret, annotation };

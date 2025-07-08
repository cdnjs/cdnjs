import * as Browser from "@hyperjump/browser";


const id = "https://json-schema.org/keyword/description";

const compile = (schema) => Browser.value(schema);
const interpret = () => true;
const annotation = (description) => description;

export default { id, compile, interpret, annotation };

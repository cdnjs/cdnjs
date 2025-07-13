import * as Browser from "@hyperjump/browser";


const id = "https://json-schema.org/keyword/default";

const compile = (schema) => Browser.value(schema);
const interpret = () => true;
const annotation = (value) => value;

export default { id, compile, interpret, annotation };

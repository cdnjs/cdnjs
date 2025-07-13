import * as Browser from "@hyperjump/browser";


const id = "https://json-schema.org/keyword/deprecated";

const compile = (schema) => Browser.value(schema);
const interpret = () => true;
const annotation = (deprecated) => deprecated;

export default { id, compile, interpret, annotation };

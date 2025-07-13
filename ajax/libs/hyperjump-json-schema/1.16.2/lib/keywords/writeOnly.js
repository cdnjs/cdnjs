import * as Browser from "@hyperjump/browser";


const id = "https://json-schema.org/keyword/writeOnly";

const compile = (schema) => Browser.value(schema);
const interpret = () => true;
const annotation = (writeOnly) => writeOnly;

export default { id, compile, interpret, annotation };

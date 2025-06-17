import * as Browser from "@hyperjump/browser";


const id = "https://json-schema.org/keyword/readOnly";

const compile = (schema) => Browser.value(schema);
const interpret = () => true;
const annotation = (readOnly) => readOnly;

export default { id, compile, interpret, annotation };

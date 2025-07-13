import * as Browser from "@hyperjump/browser";


const id = "https://json-schema.org/keyword/format";

const compile = (schema) => Browser.value(schema);
const interpret = () => true;
const annotation = (format) => format;

export default { id, compile, interpret, annotation };

import * as Browser from "@hyperjump/browser";


const id = "https://json-schema.org/keyword/contentEncoding";

const compile = (schema) => Browser.value(schema);
const interpret = () => true;
const annotation = (contentEncoding) => contentEncoding;

export default { id, compile, interpret, annotation };

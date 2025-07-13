import * as Browser from "@hyperjump/browser";


const id = "https://json-schema.org/keyword/examples";

const compile = (schema) => Browser.value(schema);
const interpret = () => true;
const annotation = (examples) => examples;

export default { id, compile, interpret, annotation };

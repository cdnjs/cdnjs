import * as Browser from "@hyperjump/browser";


const id = "https://spec.openapis.org/oas/3.0/keyword/example";

const compile = (schema) => Browser.value(schema);
const interpret = () => true;
const annotation = (example) => example;

export default { id, compile, interpret, annotation };

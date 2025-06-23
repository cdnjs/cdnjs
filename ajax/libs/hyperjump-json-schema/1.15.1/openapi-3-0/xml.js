import * as Browser from "@hyperjump/browser";


const id = "https://spec.openapis.org/oas/3.0/keyword/xml";

const compile = (schema) => Browser.value(schema);
const interpret = () => true;
const annotation = (xml) => xml;

export default { id, compile, interpret, annotation };

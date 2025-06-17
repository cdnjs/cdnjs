import * as Browser from "@hyperjump/browser";


const id = "https://json-schema.org/keyword/contentMediaType";

const compile = (schema) => Browser.value(schema);
const interpret = () => true;
const annotation = (contentMediaType) => contentMediaType;

export default { id, compile, interpret, annotation };

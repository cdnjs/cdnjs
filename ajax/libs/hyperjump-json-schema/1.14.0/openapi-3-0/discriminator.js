import * as Browser from "@hyperjump/browser";


const id = "https://spec.openapis.org/oas/3.0/keyword/discriminator";

const compile = (schema) => Browser.value(schema);
const interpret = () => true;
const annotation = (discriminator) => discriminator;

export default { id, compile, interpret, annotation };

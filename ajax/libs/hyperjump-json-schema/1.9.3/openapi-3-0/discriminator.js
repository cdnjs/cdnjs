import * as Browser from "@hyperjump/browser";
import * as Instance from "../annotations/annotated-instance.js";


const id = "https://spec.openapis.org/oas/3.0/keyword/discriminator";

const compile = (schema) => Browser.value(schema);

const interpret = (discriminator, instance, _ast, _dynamicAnchors, _quiet, schemaLocation) => {
  Instance.setAnnotation(instance, id, schemaLocation, discriminator);
  return true;
};

export default { id, compile, interpret };

import * as Browser from "@hyperjump/browser";
import * as Instance from "../annotations/annotated-instance.js";


const id = "https://spec.openapis.org/oas/3.0/keyword/xml";

const compile = (schema) => Browser.value(schema);

const interpret = (xml, instance, _ast, _dynamicAnchors, _quiet, schemaLocation) => {
  Instance.setAnnotation(instance, id, schemaLocation, xml);
  return true;
};

export default { id, compile, interpret };

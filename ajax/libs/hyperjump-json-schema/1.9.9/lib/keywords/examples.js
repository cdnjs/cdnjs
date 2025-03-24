import * as Browser from "@hyperjump/browser";
import * as Instance from "../../annotations/annotated-instance.js";


const id = "https://json-schema.org/keyword/examples";

const compile = (schema) => Browser.value(schema);

const interpret = (examples, instance, _ast, _dynamicAnchors, _quiet, schemaLocation) => {
  Instance.setAnnotation(instance, id, schemaLocation, examples);
  return true;
};

export default { id, compile, interpret };

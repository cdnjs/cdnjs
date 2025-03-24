import * as Browser from "@hyperjump/browser";
import * as Instance from "../../annotations/annotated-instance.js";


const id = "https://json-schema.org/keyword/contentEncoding";

const compile = (schema) => Browser.value(schema);

const interpret = (contentEncoding, instance, _ast, _dynamicAnchors, _quiet, schemaLocation) => {
  Instance.setAnnotation(instance, id, schemaLocation, contentEncoding);
  return true;
};

export default { id, compile, interpret };

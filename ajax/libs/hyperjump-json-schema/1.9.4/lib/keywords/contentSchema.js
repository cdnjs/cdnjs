import { canonicalUri } from "../schema.js";
import * as Instance from "../../annotations/annotated-instance.js";


const id = "https://json-schema.org/keyword/contentSchema";

const compile = (contentSchema) => canonicalUri(contentSchema);

const interpret = (contentSchema, instance, _ast, _dynamicAnchors, _quiet, schemaLocation) => {
  Instance.setAnnotation(instance, id, schemaLocation, contentSchema);
  return true;
};

export default { id, compile, interpret };

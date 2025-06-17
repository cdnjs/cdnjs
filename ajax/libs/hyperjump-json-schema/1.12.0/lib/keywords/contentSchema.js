import { canonicalUri } from "../schema.js";


const id = "https://json-schema.org/keyword/contentSchema";

const compile = (contentSchema) => canonicalUri(contentSchema);
const interpret = () => true;
const annotation = (contentSchema) => contentSchema;

export default { id, compile, interpret, annotation };

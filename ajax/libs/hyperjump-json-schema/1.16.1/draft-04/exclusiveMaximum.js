const id = "https://json-schema.org/keyword/draft-04/exclusiveMaximum";
const compile = (schema) => schema.value;
const interpret = () => true;

export default { id, compile, interpret };

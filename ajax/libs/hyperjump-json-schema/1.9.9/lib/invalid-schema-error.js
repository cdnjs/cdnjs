export class InvalidSchemaError extends Error {
  constructor(output) {
    super("Invalid Schema");
    this.name = this.constructor.name;
    this.output = output;
  }
}

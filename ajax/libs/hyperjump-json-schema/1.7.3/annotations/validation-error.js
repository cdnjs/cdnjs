export class ValidationError extends Error {
  constructor(output) {
    super("Validation Error");
    this.name = this.constructor.name;
    this.output = output;
  }
}

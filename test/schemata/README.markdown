`npm-package.json` is the schemata against which all cdnjs `package.json` files will be validated.

Currently we use a modified version of the `npm-package.json` spec,
the addition being a required `filename` property which we use for
auto-generation of library links on http://cdnjs.com/
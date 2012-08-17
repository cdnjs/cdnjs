<a href="http://travis-ci.org/cdnjs/cdnjs"><img src="https://secure.travis-ci.org/cdnjs/cdnjs.png" alt="Build Status" style="max-width:100%;"></a>


# cdnJS Script Repository

The repository mirroring all scripts on cdnjs.cloudflare.com

Want your script included? Easy.

1. Fork this repository
2. Add your library (following the conventions of this repository)
  * 1 library per pull request
  * include a package.json in the npm format (see `test/schemata/npm-package.json` for details - it's very simple)
3. Run your package.json through a [JSON Validator](http://jsonlint.com/)
  * Bonus points: set up a [Travis CI hook](http://about.travis-ci.org/docs/user/getting-started/) (we already made the `.travis.yml`) for your fork!
4. Send us a pull request.
  * Make sure you include in the pull description:
      1. Where you downloaded the script
      2. If it isn't clear, how you found the version of the script
  * e.g. https://github.com/cdnjs/cdnjs/pull/229
  * If you set up Travis CI, include your badge for super-readability!

## Running the validator
1. Install all the needed dependencies locally (you will need `npm` and `node`): `npm install`
2. Run the test suite: `npm test`

<img alt="Clicky" width="1" height="1" src="//in.getclicky.com/66606907ns.gif" />


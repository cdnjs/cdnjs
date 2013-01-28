<a href="http://travis-ci.org/cdnjs/cdnjs"><img src="https://secure.travis-ci.org/cdnjs/cdnjs.png" alt="Build Status" style="max-width:100%;"></a>


# cdnJS Script Repository

The repository mirroring all scripts on cdnjs.cloudflare.com

We will host any version of any library. Feel free to add a pull request for an older version of a library if your site still uses it.

__Libraries must have notable popularity. 100 watchers on GitHub is a good example, but as long as reasonably popularity can be demonstrated the library will be added.__

## Pull requests steps

1. Fork this repository
  * Install all the needed dependencies locally (you will need `node`): `npm install`
2. Add your library (following the conventions of this repository)
  * 1 commit per pull request
  * 1 library per pull request
  * The pull request must be tagged in the original repository (some exceptions apply)
  * include a package.json in the npm format (see `test/schemata/npm-package.json` for details - it's very simple)
  * Run `npm test` to check everything is ok
3. Send us a pull request.
  * Make sure you include in the pull description:
      1. Where you downloaded the script
      2. If it isn't clear, how you found the version of the script
  * e.g. https://github.com/cdnjs/cdnjs/pull/541
4. If the library doesn't already provide a minified version, our preferred minifier is [UglifyJS](http://marijnhaverbeke.nl/uglifyjs "UglifyJS")

## Running the validator
1. Install all the needed dependencies locally (you will need `node`): `npm install`
2. Run the test suite: `npm test`

<img alt="Clicky" width="1" height="1" src="//in.getclicky.com/66606907ns.gif" />


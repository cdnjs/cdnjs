<a href="http://travis-ci.org/cdnjs/cdnjs"><img src="https://secure.travis-ci.org/cdnjs/cdnjs.png" alt="Build Status" style="max-width:100%;"></a>

# cdnJS Script Repository

The repository mirroring all scripts on cdnjs.cloudflare.com, created and maintained by [Thomas Davis](https://twitter.com/neutralthoughts), [Ryan Kirkman](https://twitter.com/ryan_kirkman) and [Lachlan Collins](http://plus.google.com/116251728973496544370?prsrc=3)

We will host any version of any library. Feel free to add a pull request for an older version of a library if your site still uses it.

__Libraries must have notable popularity. 100 watchers on GitHub is a good example, but as long as reasonably popularity can be demonstrated the library will be added.__
## Extensions, Plugins, Resources

[Extensions, Plugins, Resources](https://github.com/cdnjs/cdnjs/wiki/Extensions%2C-Plugins%2C-Resources)

## Conventions

* Filenames should **not** include version number and be **lowercase**
* Javascript & Css files should be minified, If the library doesn't already provide a minified version, our preferred minifier is [UglifyJS](http://marijnhaverbeke.nl/uglifyjs "UglifyJS")
* If updating an existing library, try to keep consistent with the existing structure

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

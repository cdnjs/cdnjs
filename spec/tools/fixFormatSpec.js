var colors = require('colors');
var rewire = require('rewire');
var fixFormatFile = rewire('../../tools/fixFormat.js');

describe('fixFormat - tool to fix package.json file of libraries', () => {
  beforeEach(() => {
    this.packagesMock = [
      {
        name: 'jquery',
        npmName: 'jquery',
        npmFileMap: [
          {
            basePath: 'dist',
            files: [
              '**/*'
            ]
          }
        ],
        filename: 'jquery.min.js',
        version: '3.1.1',
        description: 'JavaScript library for DOM operations',
        homepage: 'http://jquery.com/',
        keywords: [
          'jquery',
          'library',
          'ajax',
          'framework',
          'toolkit',
          'popular'
        ],
        namespace: 'jQuery',
        repository: {
          type: 'git',
          url: 'https://github.com/jquery/jquery'
        },
        license: 'MIT',
        author: {
          name: 'jQuery Foundation and other contributors',
          url: 'https://github.com/jquery/jquery/blob/master/AUTHORS.txt'
        }
      }
    ];

    function FakeFs() {
      this.writeFile = function (_file, content) {
        this.writtenFile = content;
      };

      this.writeFileSync = function (_file, content) {
        this.writtenFile = content;
      };

      this.readFileSync = function (item, _encoding) {
        return item;
      };
    }

    this.fsMock = new FakeFs();

    function FakeConsole() {
      this.logged = [],

      this.log = function (arg) {
        this.logged.push(arg);
      };
    }

    this.consoleMock = new FakeConsole();
  });

  describe('When there are extraneous keys', () => {
    beforeEach((done) => {
      this.packagesMock[0].bin = 'some bin';
      this.packagesMock[0].jshintConfig = 'some jshintConfig';
      this.packagesMock[0].eslintConfig = 'some eslintConfig';
      this.packagesMock[0].maintainers = 'some maintainers';
      this.packagesMock[0].styles = 'some styles';
      this.packagesMock[0].requiredFiles = 'some requiredFiles';
      this.packagesMock[0].install = 'some install';
      this.packagesMock[0].typescript = 'some typescript';
      this.packagesMock[0].browserify = 'some browserify';
      this.packagesMock[0].browser = 'some browser';
      this.packagesMock[0].jam = 'some jam';
      this.packagesMock[0].jest = 'some jest';
      this.packagesMock[0].scripts = 'some scripts';
      this.packagesMock[0].devDependencies = 'some devDependencies';
      this.packagesMock[0].main = 'some main';
      this.packagesMock[0].peerDependencies = 'some peerDependencies';
      this.packagesMock[0].contributors = 'some contributors';
      this.packagesMock[0].bugs = 'some bugs';
      this.packagesMock[0].gitHEAD = 'some gitHEAD';
      this.packagesMock[0].gitHead = 'some gitHead';
      this.packagesMock[0].spm = 'some spm';
      this.packagesMock[0].dist = 'some dist';
      this.packagesMock[0].issues = 'some issues';
      this.packagesMock[0].files = 'some files';
      this.packagesMock[0].ignore = 'some ignore';
      this.packagesMock[0].engines = 'some engines';
      this.packagesMock[0].engine = 'some engine';
      this.packagesMock[0].directories = 'some directories';
      this.packagesMock[0].repositories = 'some repositories';
      this.packagesMock[0].dependencies = 'some dependencies';
      this.packagesMock[0].optionalDependencies = 'some optional dependencies';

      fixFormatFile.__set__({
        fs: this.fsMock,
        packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
      });

      fixFormatFile.fixFormat();
      done();
    });

    it('deletes all extraneous keys', () => {
      var result = JSON.parse(this.fsMock.writtenFile);

      expect(result.bin).toBeUndefined();
      expect(result.jshintConfig).toBeUndefined();
      expect(result.eslintConfig).toBeUndefined();
      expect(result.maintainers).toBeUndefined();
      expect(result.styles).toBeUndefined();
      expect(result.requiredFiles).toBeUndefined();
      expect(result.install).toBeUndefined();
      expect(result.typescript).toBeUndefined();
      expect(result.browserify).toBeUndefined();
      expect(result.browser).toBeUndefined();
      expect(result.jam).toBeUndefined();
      expect(result.jest).toBeUndefined();
      expect(result.scripts).toBeUndefined();
      expect(result.devDependencies).toBeUndefined();
      expect(result.main).toBeUndefined();
      expect(result.peerDependencies).toBeUndefined();
      expect(result.contributors).toBeUndefined();
      expect(result.bugs).toBeUndefined();
      expect(result.gitHEAD).toBeUndefined();
      expect(result.gitHead).toBeUndefined();
      expect(result.spm).toBeUndefined();
      expect(result.dist).toBeUndefined();
      expect(result.issues).toBeUndefined();
      expect(result.files).toBeUndefined();
      expect(result.ignore).toBeUndefined();
      expect(result.engines).toBeUndefined();
      expect(result.engine).toBeUndefined();
      expect(result.directories).toBeUndefined();
      expect(result.repositories).toBeUndefined();
      expect(result.dependencies).toBeUndefined();
      expect(result.optionalDependencies).toBeUndefined();
    });
  });

  describe('When "repository" key exists', () => {
    describe('When repository type is git', () => {
      describe('When "homepage" key exists', () => {
        describe('When homepage is a duplicate of repository', () => {
          beforeEach((done) => {
            this.packagesMock[0].homepage = 'https://github.com/jquery/jquery';

            fixFormatFile.__set__({
              fs: this.fsMock,
              packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
            });

            fixFormatFile.fixFormat();
            done();
          });

          it('deletes homepage', () => {
            var result = JSON.parse(this.fsMock.writtenFile);

            expect(result.homepage).toBeUndefined();
          });
        });

        describe('When homepage is same as repository plus "#readme"', () => {
          beforeEach((done) => {
            this.packagesMock[0].homepage = 'https://github.com/jquery/jquery#readme';

            fixFormatFile.__set__({
              fs: this.fsMock,
              packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
            });

            fixFormatFile.fixFormat();
            done();
          });

          it('deletes homepage', () => {
            var result = JSON.parse(this.fsMock.writtenFile);

            expect(result.homepage).toBeUndefined();
          });
        });

        describe('When homepage is same as repository plus ".git"', () => {
          beforeEach((done) => {
            this.packagesMock[0].homepage = 'https://github.com/jquery/jquery.git';

            fixFormatFile.__set__({
              fs: this.fsMock,
              packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
            });

            fixFormatFile.fixFormat();
            done();
          });

          it('deletes homepage', () => {
            var result = JSON.parse(this.fsMock.writtenFile);

            expect(result.homepage).toBeUndefined();
          });
        });

        describe('When homepage is different from repository', () => {
          beforeEach((done) => {
            fixFormatFile.__set__({
              fs: this.fsMock,
              packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
            });

            fixFormatFile.fixFormat();
            done();
          });

          it('does not delete homepage', () => {
            var result = JSON.parse(this.fsMock.writtenFile);

            expect(result.homepage).toEqual('http://jquery.com/');
          });
        });
      });
    });

    describe('When repository type is not git', () => {
      beforeEach((done) => {
        this.packagesMock[0].homepage = 'https://github.com/jquery/jquery';
        this.packagesMock[0].repository.type = 'not git';

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('does not delete homepage', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.homepage).toEqual('https://github.com/jquery/jquery');
      });
    });
  });

  describe('When repository key does not exist in package.json', () => {
    beforeEach((done) => {
      delete this.packagesMock[0].repository;

      fixFormatFile.__set__({
        fs: this.fsMock,
        packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
      });

      fixFormatFile.fixFormat();
      done();
    });

    it('does not delete homepage', () => {
      var result = JSON.parse(this.fsMock.writtenFile);

      expect(result.homepage).toEqual('http://jquery.com/');
    });
  });

  describe('When "authors" key exists', () => {
    describe('When "authors" is not an array', () => {
      beforeEach((done) => {
        delete this.packagesMock[0].author;
        this.packagesMock[0].authors = 'some author';

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('assigns "authors" to "author" and removes "authors"', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.author).toEqual('some author');
        expect(result.authors).toBeUndefined();
      });
    });

    describe('When "authors" is an array of length 1', () => {
      beforeEach((done) => {
        delete this.packagesMock[0].author;
        this.packagesMock[0].authors = ['some author'];

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('assigns first element from "authors" to "author" and removes "authors"', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.author).toEqual('some author');
        expect(result.authors).toBeUndefined();
      });
    });

    describe('When "authors" is an array of length > 1', () => {
      beforeEach((done) => {
        this.packagesMock[0].authors = ['first author', 'second author'];

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('does not do anything', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.authors).toEqual(['first author', 'second author']);
      });
    });
  });

  describe('When "author" key exists', () => {
    describe('When "author" is an array', () => {
      beforeEach((done) => {
        this.packagesMock[0].author = ['first author', 'second author'];

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('assigns "author" array to "authors" and removes "author"', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.authors).toEqual(['first author', 'second author']);
        expect(result.author).toBeUndefined();
      });
    });

    describe('When "author" is not an array', () => {
      beforeEach((done) => {
        this.packagesMock[0].author = { name: 'Sebastian Bach' };

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('assigns "author" array to "authors" and removes "author"', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.authors).toBeUndefined();
        expect(result.author).toEqual({ name: 'Sebastian Bach' });
      });
    });
  });

  describe('When "licenses" key exists', () => {
    describe('When "licenses" is not an array', () => {
      beforeEach((done) => {
        this.packagesMock[0].licenses = 'Some license';

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('assigns "licenses" to "license" and removes "licenses"', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.licenses).toBeUndefined();
        expect(result.license).toEqual('Some license');
      });
    });

    describe('When "licenses" is an array of length 1', () => {
      beforeEach((done) => {
        this.packagesMock[0].licenses = ['Some license'];

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('assigns the first element of "licenses" to "license" and removes "licenses"', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.licenses).toBeUndefined();
        expect(result.license).toEqual('Some license');
      });
    });

    describe('When "licenses" is an array of length > 1', () => {
      beforeEach((done) => {
        this.packagesMock[0].licenses = ['first license', 'second license'];

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('doesnt do anything', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.licenses).toEqual(['first license', 'second license']);
      });
    });

    describe('When some of the licenses type is not undefined', () => {
      describe('When license-list file contains the license type', () => {
        beforeEach((done) => {
          delete this.packagesMock[0].license;
          this.packagesMock[0].licenses = [
            {
              name: 'first license',
              type: 'MIT'
            },
            {
              name: 'second license',
              type: 'Xerox'
            }
          ];

          fixFormatFile.__set__({
            fs: this.fsMock,
            packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg))),
            console: this.consoleMock
          });

          fixFormatFile.fixFormat();
          done();
        });

        it('replaces each license with its type', () => {
          var result = JSON.parse(this.fsMock.writtenFile);

          expect(result.licenses).toEqual(['MIT', 'Xerox']);
        });
      });

      describe('When license-list file does not contain the license type', () => {
        beforeEach((done) => {
          delete this.packagesMock[0].license;
          this.packagesMock[0].licenses = [
            {
              name: 'first license',
              type: 'Def not supported type: AHA!'
            },
            {
              name: 'second license',
              type: 'This one too. boo-la-la!!'
            }
          ];

          fixFormatFile.__set__({
            fs: this.fsMock,
            packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg))),
            console: this.consoleMock
          });

          fixFormatFile.fixFormat();
          done();
        });

        it('throws a console warning', () => {
          var result = JSON.parse(this.fsMock.writtenFile);

          expect(result.licenses).toEqual([
            {
              name: 'first license',
              type: 'Def not supported type: AHA!'
            },
            {
              name: 'second license',
              type: 'This one too. boo-la-la!!'
            }
          ]);
          expect(this.consoleMock.logged[0])
            .toEqual('Library jquery has un-recognized license - Def not supported type: AHA!'.yellow);
          expect(this.consoleMock.logged[1])
            .toEqual('Library jquery has un-recognized license - This one too. boo-la-la!!'.yellow);
        });
      });
    });

    describe('When licenses type is undefined', () => {
      beforeEach((done) => {
        delete this.packagesMock[0].license;
        this.packagesMock[0].licenses = [
          { name: 'first license' },
          { name: 'second license' }
        ];

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('doesnt do anything', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.licenses).toEqual([
          { name: 'first license' },
          { name: 'second license' }
        ]);
      });
    });
  });

  describe('When "license" key exists', () => {
    describe('When "license" is an array', () => {
      beforeEach((done) => {
        this.packagesMock[0].license = ['first license', 'second license'];

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('assigns "license" to "licenses" and removes "license"', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.license).toBeUndefined;
        expect(result.licenses).toEqual(['first license', 'second license']);
      });
    });

    describe('When "license" is not an array', () => {
      beforeEach((done) => {
        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('doesnt do anything', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.license).toEqual('MIT');
      });
    });

    describe('When license type is not undefined', () => {
      describe('When license-list file contains the license type', () => {
        beforeEach((done) => {
          this.packagesMock[0].license = {
              name: 'first license',
              type: 'MIT'
            };

          fixFormatFile.__set__({
            fs: this.fsMock,
            packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
          });

          fixFormatFile.fixFormat();
          done();
        });

        it('replaces each license with its type', () => {
          var result = JSON.parse(this.fsMock.writtenFile);

          expect(result.license).toEqual('MIT');
        });
      });

      describe('When license-list file does not contain the license type', () => {
        beforeEach((done) => {
          this.packagesMock[0].license = {
              name: 'first license',
              type: 'Definitely not this one!'
            };

          fixFormatFile.__set__({
            fs: this.fsMock,
            packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg))),
            console: this.consoleMock
          });

          fixFormatFile.fixFormat();
          done();
        });

        it('replaces each license with its type', () => {
          var result = JSON.parse(this.fsMock.writtenFile);

          expect(result.license).toEqual({ name: 'first license', type: 'Definitely not this one!' });
          expect(this.consoleMock.logged[0])
            .toEqual('Library jquery has un-recognized license - Definitely not this one!'.yellow);
        });
      });
    });

    describe('When license type is undefined', () => {
      beforeEach((done) => {
        this.packagesMock[0].license = [
          { name: 'some license' }
        ];

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('doesnt do anything', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.license).toEqual({ name: 'some license' });
      });
    });
  });

  describe('When "npmFileMap" key exists', () => {
    describe('When some elements in npmFileMap contain "basePath"', () => {
      describe('When "basePath" contain "/" symbols', () => {
        beforeEach((done) => {
          this.packagesMock[0].npmFileMap = [
            {
              basePath: '/dist/something'
            },
            {
              basePath: 'dist/something-else/'
            }
          ];

          fixFormatFile.__set__({
            fs: this.fsMock,
            packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
          });

          fixFormatFile.fixFormat();
          done();
        });

        it('removes leading/last character forward slash symbols', () => {
          var result = JSON.parse(this.fsMock.writtenFile);

          expect(result.npmFileMap).toEqual([
            { basePath: 'dist/something' },
            { basePath: 'dist/something-else' }
          ]);
        });
      });
    });
  });

  describe('When "keywords" key exists', () => {
    describe('When keywords contain duplicate values', () => {
      beforeEach((done) => {
        this.packagesMock[0].keywords = [
          'something', 'something', 'oops', 'oops'
        ];

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('removes duplicate keywords', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.keywords).toEqual([
          'something', 'oops'
        ]);
      });
    });

    describe('When keywords dont contain duplicate values', () => {
      beforeEach((done) => {
        this.packagesMock[0].keywords = [
          'something', 'no duplicates here'
        ];

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('doesnt do anything', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.keywords).toEqual([
          'something', 'no duplicates here'
        ]);
      });
    });
  });

  describe('When "autoupdate" key exists', () => {
    describe('When "autoupdate" has basePath', () => {
      beforeEach((done) => {
        this.packagesMock[0].autoupdate = {
          basePath: '/some/base/path/'
        };

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('removes leading/last character forward slashes and moves basePath to "fileMap" key array', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.autoupdate.fileMap[0].basePath).toEqual('some/base/path');
      });
    });

    describe('When "autoupdate" has files', () => {
      beforeEach((done) => {
        this.packagesMock[0].autoupdate = {
          files: 'some files'
        };

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('moves files to "fileMap" key array', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.autoupdate.fileMap[0].files).toEqual('some files');
      });
    });

    describe('When "autoupdate" does not have basePath', () => {
      beforeEach((done) => {
        this.packagesMock[0].autoupdate = {
          files: 'some files'
        };

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('sets autoupdate to empty string on first element of fileMap key array', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.autoupdate.fileMap[0].basePath).toEqual('');
      });
    });

    describe('When "autoupdate" does not have files', () => {
      beforeEach((done) => {
        this.packagesMock[0].autoupdate = {
          basePath: 'some/path'
        };

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('sets files to undefined on first element of fileMap key array', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.autoupdate.fileMap[0].files).toBeUndefined();
      });
    });
  });

  describe('When package filename does not contain "min"', () => {
    describe('When minified js file exists in the package folder', () => {
      beforeEach((done) => {
        this.packagesMock[0].filename = 'jquery.js';

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg))),
          isThere: function () { return true; }
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('adds "min" to the filename', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.filename).toEqual('jquery.min.js');
      });
    });

    describe('When minified js file does not exist in the package folder', () => {
      beforeEach((done) => {
        this.packagesMock[0].filename = 'jquery.js';

        fixFormatFile.__set__({
          fs: this.fsMock,
          packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg))),
          isThere: function () { return false; }
        });

        fixFormatFile.fixFormat();
        done();
      });

      it('does not add "min" to the filename', () => {
        var result = JSON.parse(this.fsMock.writtenFile);

        expect(result.filename).toEqual('jquery.js');
      });
    });
  });

  describe('When package filename contains "min"', () => {
    beforeEach((done) => {
      this.packagesMock[0].filename = 'jquery.min.js';

      fixFormatFile.__set__({
        fs: this.fsMock,
        packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg))),
        isThere: function () { return true; }
      });

      fixFormatFile.fixFormat();
      done();
    });

    it('doesnt change the filename', () => {
      var result = JSON.parse(this.fsMock.writtenFile);

      expect(result.filename).toEqual('jquery.min.js');
    });
  });

  describe('When indentation is incorrect', () => {
    beforeEach((done) => {
      fixFormatFile.__set__({
        fs: this.fsMock,
        packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg))),
        isThere: function () { return true; }
      });

      fixFormatFile.fixFormat();
      done();
    });

    it('corrects indentation to two spaces', () => {
      var result = this.fsMock.writtenFile;

      expect(result).not.toEqual(JSON.stringify(this.packagesMock[0]) + '\n');
      expect(result).toEqual(JSON.stringify(this.packagesMock[0], null, 2) + '\n');
    });
  });

  describe('When there are keys with leading underscores', () => {
    beforeEach((done) => {
      this.packagesMock[0]._id = 'somepackage@0.0.1';
      this.packagesMock[0]._shasum = '9249107447ee203a753m5a497a302ab92ef7abe8';
      this.packagesMock[0]._from = 'somepackage@latest';
      this.packagesMock[0]._npmVersion = '2.0.0';

      fixFormatFile.__set__({
        fs: this.fsMock,
        packages: this.packagesMock.map((pkg) => (JSON.stringify(pkg)))
      });

      fixFormatFile.fixFormat();
      done();
    });

    it('removes keys with leading underscores', () => {
      var result = JSON.parse(this.fsMock.writtenFile);

      expect(result._id).toBeUndefined();
      expect(result._shasum).toBeUndefined();
      expect(result._from).toBeUndefined();
      expect(result._npmVersion).toBeUndefined();
    });
  });
});

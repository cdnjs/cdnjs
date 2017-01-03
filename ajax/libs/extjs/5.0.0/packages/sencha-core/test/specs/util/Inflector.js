describe("Ext.util.Inflector", function() {
    var Inflector = Ext.util.Inflector;

    //set of irregular words taken from http://www.english-zone.com/spelling/plurals.html
    var testWords = {
        bus : 'buses',
        word : 'words',
        tomato: 'tomatoes',
        potato: 'potatoes',
        person: 'people',
        alumnus: 'alumni',
        cactus: 'cacti',
        focus: 'foci',
        nucleus: 'nuclei',
        radius: 'radii',
        stimulus: 'stimuli',
        axis : 'axes',
        analysis: 'analyses',
        basis: 'bases',
        crisis: 'crises',
        diagnosis: 'diagnoses',
        ellipsis: 'ellipses',
        hypothesis: 'hypotheses',
        oasis: 'oases',
        paralysis: 'paralyses',
        parenthesis: 'parentheses',
        synthesis: 'syntheses',
        synopsis: 'synopses',
        thesis: 'theses',
        appendix: 'appendices',
        index: 'indexes',
        matrix: 'matrices',
        beau: 'beaux',
        bureau: 'bureaux',
        tableau: 'tableaux',
        child: 'children',
        man: 'men',
        ox: 'oxen',
        woman: 'women',
        bacterium: 'bacteria',
        corpus: 'corpora',
        criterion: 'criteria',
        curriculum: 'curricula',
        datum: 'data',
        genus: 'genera',
        medium: 'media',
        memorandum: 'memoranda',
        phenomenon: 'phenomena',
        stratum: 'strata',
        deer: 'deer',
        fish: 'fish',
        means: 'means',
        offspring: 'offspring',
        series: 'series',
        sheep: 'sheep',
        species: 'species',
        foot: 'feet',
        goose: 'geese',
        tooth: 'teeth',
        antenna: 'antennae',
        formula: 'formulae',
        nebula: 'nebulae',
        vertebra: 'vertebrae',
        vita: 'vitae',
        louse: 'lice',
        mouse: 'mice'
    };

    describe("pluralizing words", function() {
        describe("normal words", function() {
            it("should pluralize the word correctly", function() {
                for (var singular in testWords) {
                    expect(Inflector.pluralize(singular)).toEqual(testWords[singular]);
                }
            });
        });

        describe("uncountable words", function() {
            it("should return the same word", function() {
                expect(Inflector.pluralize('sheep')).toEqual('sheep');
            });
        });
    });

    describe("clearing existing pluralizations", function() {
        var original;

        beforeEach(function() {
            original = Inflector.plurals;
        });

        afterEach(function() {
            Inflector.plurals = original;
        });

        it("should remove all singular rule definitions", function() {
            Inflector.clearPlurals();
            expect(Inflector.plurals.length).toEqual(0);
        });
    });

    describe("clearing existing singularizations", function() {
        var original;

        beforeEach(function() {
            original = Inflector.singulars;
        });

        afterEach(function() {
            Inflector.singulars = original;
        });

        it("should remove all singular rule definitions", function() {
            Inflector.clearSingulars();
            expect(Inflector.singulars.length).toEqual(0);
        });
    });

    describe("adding pluralizations", function() {
        it("should add to the plurals array", function() {
            var count = Inflector.plurals.length;

            Inflector.plural(/^(ox)$/, "$1");
            expect(Inflector.plurals.length).toEqual(count + 1);
        });

        it("should recognize the new pluralization correctly", function() {
            var oldPlurals = Inflector.plurals;
            Inflector.plurals = [];

            //shouldn't be recognized yet
            expect(Inflector.pluralize('ox')).toEqual('ox');

            Inflector.plural(/^(ox)$/, "$1en");
            expect(Inflector.pluralize('ox')).toEqual('oxen');

            Inflector.plurals = oldPlurals;
        });
    });

    describe("adding singularizations", function() {
        it("should add to the singulars array", function() {
            var count = Inflector.singulars.length;

            Inflector.singular(/^(ox)en$/, "$1");
            expect(Inflector.singulars.length).toEqual(count + 1);
        });

        it("should recognize the new singularization correctly", function() {
            var oldSingulars = Inflector.singulars;

            Inflector.singulars = [];

            //shouldn't be recognized yet
            expect(Inflector.singularize('oxen')).toEqual('oxen');

            Inflector.singular(/^(ox)en$/, "$1");
            expect(Inflector.singularize('oxen')).toEqual('ox');

            Inflector.singulars = oldSingulars;
        });
    });

    describe("singularizing words", function() {
        describe("normal words", function() {
            it("should singularize the word correctly", function() {
                for (var singular in testWords) {
                    expect(Inflector.singularize(testWords[singular])).toEqual(singular);
                }
            });
        });

        describe("uncountable words", function() {
            it("should return the same word", function() {
                expect(Inflector.singularize('sheep')).toEqual('sheep');
            });
        });
    });

    describe("classifying words", function() {
        var forms;

        beforeEach(function() {
            forms = ['user', 'users', 'User', 'Users'];
        });

        it("should correctly classify", function() {
            Ext.each(forms, function(form) {
                expect(Inflector.classify(form)).toEqual('User');
            }, this);
        });
    });

    describe("uncountable words", function() {
        it("should be detected", function() {
            expect(Inflector.isTransnumeral('sheep')).toEqual(true);
        });

        it("should not return false positives", function() {
            expect(Inflector.isTransnumeral('person')).toEqual(false);
        });
    });

    describe("ordinalizing numbers", function() {
        it("should add st to numbers ending in 1", function() {
            expect(Inflector.ordinalize(21)).toEqual("21st");
        });

        it("should add nd to numbers ending in 2", function() {
            expect(Inflector.ordinalize(22)).toEqual("22nd");
        });

        it("should add rd to numbers ending in 3", function() {
            expect(Inflector.ordinalize(23)).toEqual("23rd");
        });

        it("should add th to all other numbers", function() {
            expect(Inflector.ordinalize(24)).toEqual("24th");
        });

        it("should add th to all early teens", function() {
            expect(Inflector.ordinalize(11)).toEqual("11th");
            expect(Inflector.ordinalize(12)).toEqual("12th");
            expect(Inflector.ordinalize(13)).toEqual("13th");
        });
    });
});

// package metadata file for Meteor.js
'use strict';

var packageName = 'dreamerslab:jquery.actual'; // https://atmospherejs.com/mediatainment/switchery
var where = 'client'; // where to install: 'client' or 'server'. For both, pass nothing.

Package.describe({
    name: packageName,
    version: '1.0.18',
    // Brief, one-line summary of the package.
    summary: 'Get the actual width/height of invisible DOM elements with jQuery.',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/dreamerslab/jquery.actual'
});

Package.onUse(function (api) {
    api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']);
    api.use('jquery', where);
    api.addFiles('jquery.actual.js', where);
});

Package.onTest(function (api) {
    api.use([packageName, 'sanjo:jasmine'], where);
    api.use(['webapp','tinytest'], where);
    api.addFiles('meteor/tests.js', where); // testing specific files
});

'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var coverageEnforcer = require('gulp-istanbul-enforcer');

var globs = {
  js: ['lib/**/*.js'],
  specs: ['specs/**/*specs.js'],  
};

gulp.task('jshint', function () {
  return gulp.src(globs.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Testing
var coverageOptions = {
  dir: './coverage',
  reporters: ['html', 'lcov', 'text-summary', 'html'],
  reportOpts: {
    dir: './coverage'
  }
};

gulp.task('enforce-coverage', ['mocha-server'], function () {
  var options = {
    thresholds: {
      statements: 80,
      branches: 80,
      lines: 80,
      functions: 80
    },
    coverageDirectory: 'coverage',
    rootDirectory: 'server'
  };
  return gulp.src(globs.js.server)
    .pipe(coverageEnforcer(options));
});

gulp.task('mocha-server', function () {
  return gulp.src(globs.specs, {
      read: false
    })
    .pipe(mocha({
      reporter: 'spec'
    }))
    .pipe(istanbul.writeReports(coverageOptions));
});

gulp.task('default', ['jshint'], function () {
  return gulp.start('mocha-server');
});
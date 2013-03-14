/*
 * grunt-preload-assets
 * https://github.com/gunta/grunt-preload-assets
 *
 * Copyright (c) 2013 Gunther Brunner
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		// Configuration to be run (and then tested).
		preload_assets: {
			default_options: {
				options: {
//					basePath: 'test/',
					ignoreBasePath: 'test/fixtures/',
					template: 'preloadjs-var'
				},
				files: {
					'tmp/default_options.js': ['test/fixtures/*.png', 'test/fixtures/*.jpg']
				}
			},
			custom_options: {
				options: {
//					basePath: 'test/',
					template: 'custom-sample-var'

				},
				files: {
					'tmp/custom_options.js': ['test/fixtures/*.png', 'test/fixtures/*.jpg']
				}
			},
			fulljson_options: {
				options: {
					template: 'full-json',
					detect: {
						id: true,
						bytes: true,
						totalBytes: true,
						src: true,
						lastModified: true,
						md5: true
					}
				},
				files: {
					'tmp/fulljson_options.json': ['test/fixtures/*.*']
				}
			},
			fulljson_idkey_options: {
				options: {
					template: 'full-json-idkey',
					ignoreBasePath: 'test/'
				},
				files: {
					'tmp/fulljson_idkey_options.json': ['test/fixtures/*.*']
				}
			},
			csv_options: {
				options: {
					template: 'filelist-csv'
				},
				files: {
					'tmp/csv_options.csv': ['test/fixtures/*.*']
				}
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'preload_assets', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'preload_assets']);
//	grunt.registerTask('default', ['jshint', 'test']);

};

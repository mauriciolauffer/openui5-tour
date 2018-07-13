module.exports = function(config) {
  'use strict';

  config.set({
    frameworks: ['openui5', 'qunit'],
    openui5: {
      path: 'http://localhost:8080/resources/sap-ui-core.js',
      useMockServer: false
    },
    client: {
      openui5: {
        config: {
          theme: 'sap_belize',
          language: 'EN',
          bindingSyntax: 'complex',
          compatVersion: 'edge',
          preload: 'async',
          libs: 'openui5.tour',
          resourceroots: {
            'openui5.tour': 'base/src/openui5/tour',
            'test.unit': 'base/test/openui5/tour/unit'
          }
        },
        tests: ['test/unit/allTests']
      },
      clearContext: false,
      qunit: {
        showUI: true,
        testTimeout: 20000, //20 secs
        autostart: false,
        noglobals: true
      }
    },
    files: [
      {
        pattern: 'src/**',
        included: false,
        served: true,
        watched: true
      },
      {
        pattern: 'test/openui5/tour/unit/**',
        included: false,
        served: true,
        watched: true
      }
    ],
    preprocessors: {
      'src/**/!(thirdparty)/*.js': ['coverage']
    },
    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/',
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80
        }
      }
    },
    autoWatch: true,
    useIframe: false,
    browsers: ['Chrome'],
    reporters: ['progress', 'coverage', 'coveralls'],
    reportSlowerThan: 200,
    singleRun: false
  });
};

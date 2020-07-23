module.exports = function(config) {
  'use strict';

  config.set({
    frameworks: ['ui5'],
    ui5: {
      type: 'library'
    },
    preprocessors: {
      'src/**/!(thirdparty)/*.js': ['coverage']
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80
        }
      }
    },
    browsers: ['Chrome'],
    browserConsoleLogOptions: {
      level: 'error'
    },
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    useIframe: false,
    reporters: ['progress', 'coverage'],
    reportSlowerThan: 200,
    singleRun: false
  });
};

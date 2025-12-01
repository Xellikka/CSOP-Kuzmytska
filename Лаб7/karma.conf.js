module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',         
      dir: 'coverage/',       
      subdir: '.',
      check: {
        global: {
          statements: 75,   
          branches: 75,
          functions: 75,
          lines: 75
        }
      }
    },
    browsers: ['Chrome'], 
    singleRun: true
  });
};

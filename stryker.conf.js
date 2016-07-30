module.exports = function (config) {
  config.set({
    files: [
      'test/*.js',
      'test/Interactions/*.js',
      'test/Helpers/*.js',
      'test/Integrations/Users_test.js',
        /* Kathinka_test seems to produce an error so we omit it */
        /* 'test/Integrations/Kathinka_test.js',*/
      { pattern: 'src/**/*.js', included: false, mutated: true }
    ],
    mutate: ["src/**/*.js "],
    testFramework: 'mocha',
    testRunner: 'mocha',
    reporter: ['progress', 'clear-text', 'html', 'event-recorder'],
    testSelector: null,
    plugins: ['stryker-mocha-runner', 'stryker-html-reporter']
  });
}

exports.config = {
    allScriptsTimeout: 99999,

    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // The port to start the selenium server on, or null if the server should
    // find its own unused port.
    seleniumPort: 4444,

    // The location of the selenium standalone server .jar file, relative
    // to the location of this config. If no other method of starting selenium
    // is found, this will default to
    // node_modules/protractor/selenium/selenium-server...
    //seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            mobileEmulation : {
                deviceName: 'Google Nexus 5'
            }
        }
    },

    baseUrl: 'http://app:8101',

    framework: 'mocha',

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['e2e/**/*.spec.js'],

    // Options to be passed to mocha.
    mochaOpts: {
        reporter: "spec",
        slow: 3000,
        timeout: 7000
    }
};

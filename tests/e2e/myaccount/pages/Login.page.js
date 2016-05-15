'use strict';

module.exports = LoginPage;

function LoginPage() {
    this.url =  '/#/app/login?env=testing';
    this.emailInput = element(by.model('credentials.email'));
    this.sendCodeButton = element(by.id('send-code-btn'));
    this.codeInput = element(by.model('credentials.code'));
    this.loginButton = element(by.id('login-btn'));

    this.go = function() {
        browser.get(this.url);
    };

    this.login = function(email, code) {
        this.emailInput.sendKeys(email);
        this.sendCodeButton.click();
        this.codeInput.sendKeys(code);
        this.loginButton.click();
        browser.waitForAngular();
    };
}

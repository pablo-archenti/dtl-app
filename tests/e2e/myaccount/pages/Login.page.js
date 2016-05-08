'use strict';

module.exports = LoginPage;

function LoginPage() {
    this.url =  '/#/app/login';
    this.email = element(by.model('credentials.email'));
    this.sendCodeButton = element(by.id('send-code-btn'));
    this.code = element(by.model('credentials.code'));
    this.loginButton = element(by.id('login-btn'));

    this.go = function() {
        browser.get(this.url);
    };

    this.login = function(email, code) {
        this.email.sendKeys(email);
        this.sendCodeButton.click();
        this.code.sendKeys(code);
        this.loginButton.click();
    };
}

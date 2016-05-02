'use strict';

module.exports = RegistrationPage;

function RegistrationPage() {
    this.url =  '/#/app/signup/step1';
    this.nameInput = element(by.model('data.name'));
    this.emailInput = element(by.model('data.email'));
    this.phoneInput = element(by.model('data.phone'));
    this.step1Button = element(by.id('step1-button'));
    this.step2Button = element(by.id('step2-button'));
    this.submitButton = element(by.css('[type=submit]'));

    this.go = function() {
        browser.get(this.url);
    };

    this.completeStep1 = function(name, email, phone) {
        this.nameInput.sendKeys(name);
        this.emailInput.sendKeys(email);
        this.phoneInput.sendKeys(phone);
        this.step1Button.click();
    };

    this.completeStep2 = function() {

        this.step2Button.click();
    };

    this.submit = function() {

        this.submitButton.click();
    };

    this.register = function(data) {
        this.completeStep1(data.name, data.email, data.phone);
        this.completeStep2();
        this.submit();
    }
}

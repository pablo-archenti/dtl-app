'use strict';

module.exports = MyAccountPage;

function MyAccountPage() {
    this.signupUrl = '/#/app/signup/step1?env=testing';
    this.myAccountUrl = '/#/app/editMyAccount/step1?env=testing';
    this.nameInput = element(by.model('data.name'));
    this.emailInput = element(by.model('data.email'));
    this.phoneInput = element(by.model('data.phone'));
    this.helpDonation = element(by.model('data.helpWith.donacion'));
    this.projectsInChargeLabel = element(by.css("label[for='projectsInCharge']"));
    this.projectsInChargeChkbox = element(by.model('data.projectsInCharge'));
    this.step1Button = element(by.id('step1-button'));
    this.step2Button = element(by.id('step2-button'));
    this.submitButton = element(by.css('[type=submit]'));

    this.goSignup = function() {
        browser.get(this.signupUrl);
    };

    this.goMyAccount = function() {
        browser.get(this.myAccountUrl);
    };

    this.enterName = function(name) {
        this.nameInput.clear();
        this.nameInput.sendKeys(name);
    };

    this.enterEmail = function(email) {
        this.emailInput.sendKeys(email);
    };

    this.enterPhone = function(phone) {
        this.phoneInput.sendKeys(phone);
    };

    this.selectHelpDonation = function() {
        this.helpDonation.click();
    };

    this.selectProjectsInCharge = function() {
        this.projectsInChargeLabel.click();
    };

    this.submitStep1 = function() {
        this.step1Button.click();
    };

    this.submitStep2 = function() {
        this.step2Button.click();
    };

    this.submit = function() {
        this.submitButton.click();
    };

    this.register = function(data) {
        this.enterName(data.name);
        this.enterEmail(data.email);
        this.enterPhone(data.phone);
        this.submitStep1();
        this.submitStep2();
        this.submit();
    }
}

'use strict';

module.exports = MyAccountPage;

function MyAccountPage() {
    this.url = '/#/app/myaccount?env=testing';
    this.signupButton = element(by.buttonText('Registrate'));
    this.editMyAccountButton = element(by.id('edit-account-btn'));
    this.nameInput = element(by.model('data.name'));
    this.emailInput = element(by.model('data.email'));
    this.phoneInput = element(by.model('data.phone'));
    this.helpDonationChkbox = element(by.model('data.helpWith.donacion'));
    this.projectsInChargeLabel = element(by.css("label[for='projectsInCharge']"));
    this.projectsInChargeChkbox = element(by.model('data.projectsInCharge'));
    this.step1Button = element(by.id('step1-button'));
    this.step2Button = element(by.id('step2-button'));
    this.submitButton = element(by.css('[type=submit]'));
    this.logoutButton = element(by.id('logout-btn'));
    this.deleteButton = element(by.id('delete-account-btn'));
    this.confirmationButton = element(by.buttonText('Confirmar'));

    this.go = function() {
        browser.get(this.url);
    };

    this.clickSignupButton = function() {
        this.signupButton.click();
    };

    this.clickEditMyAccountButton = function() {
        this.editMyAccountButton.click();
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
        this.helpDonationChkbox.click();
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

    this.logout = function() {
        this.logoutButton.click();
    };

    this.clickDelete = function() {
        this.deleteButton.click();
    };

    this.clickConfirmation = function() {
        this.confirmationButton.click();
    };

    this.deleteAccount = function() {
        this.clickDelete();
        this.clickConfirmation();
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

'use strict';

module.exports = DeleteAccount;

function DeleteAccount() {
    this.url =  '/#/app/myaccount?env=testing';
    this.deleteAccountButton = element(by.id('delete-account-btn'));
    this.confirmationButton = element(by.buttonText('Confirmar'));

    this.go = function() {
        browser.get(this.url);
    };

    this.clickDelete = function() {
        this.deleteAccountButton.click();
    };

    this.clickConfirm = function() {
        this.confirmationButton.click();
    };

    this.delete = function() {
        this.clickDelete();
        this.clickConfirm();
    };
}

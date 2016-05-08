'use strict';

module.exports = LogoutPage;

function LogoutPage() {
    this.url =  '/#/app/myaccount';
    this.logoutButton = element(by.id('logout-btn'));

    this.go = function() {
        browser.get(this.url);
    };

    this.logout = function() {
        this.logoutButton.click();
    };
}

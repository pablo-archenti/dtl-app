'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var helpers = require('../helpers');
var fixtures = require('../fixtures');
var MyAccountPage = require('./pages/MyAccount.page');
var LoginPage = require('./pages/Login.page');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('User account edition', function() {
    var myAccountPage = new MyAccountPage(),
        loginPage = new LoginPage();

    before(function () {
        loginPage.go();
        loginPage.login(
            fixtures.registeredUser.email,
            fixtures.registeredUser.code
        );
        myAccountPage.go();
    });

    describe('Successful edition', function () {
        before(function() {
            myAccountPage.clickEditMyAccountButton();
            myAccountPage.enterName('Pablo Nuevo');
            myAccountPage.submitStep1();
            myAccountPage.selectHelpDonation();
            myAccountPage.submitStep2();
            myAccountPage.selectProjectsInCharge();
            myAccountPage.submit();
        });

        it('User name should match the new one', function () {
            myAccountPage.clickEditMyAccountButton();
            expect(myAccountPage.nameInput.getAttribute('value')).to.eventually.equal('Pablo Nuevo');
        });

        it('Donation help should be selected', function () {
            myAccountPage.submitStep1();
            expect(myAccountPage.helpDonationChkbox.isSelected()).to.eventually.equal(true);
        });

        it('Projects in charge should be selected', function () {
            myAccountPage.submitStep2();
            expect(myAccountPage.projectsInChargeChkbox.isSelected()).to.eventually.equal(true);
        });
    });
});

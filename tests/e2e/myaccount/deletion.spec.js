'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var helpers = require('../helpers');
var fixtures = require('../fixtures');
var DeleteAccountPage = require('./pages/DeleteAccount.page');
var LoginPage = require('./pages/Login.page');
var ProjectsListingPage = require('../projects/pages/ProjectsListing.page');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('User deletion', function() {
    var deleteAccountPage = new DeleteAccountPage(),
        loginPage = new LoginPage(),
        projectsListingPage = new ProjectsListingPage();

    beforeEach(function () {
        loginPage.go();
        loginPage.login(
            fixtures.deletableUser.email,
            fixtures.deletableUser.code
        );
        browser.waitForAngular();
        deleteAccountPage.go();
    });

    describe('Successful deletion', function() {

        it('should take the user to the projects listing page', function () {
            deleteAccountPage.delete();
            expect(helpers.getUrlPath(browser.getCurrentUrl())).to.eventually.equal(projectsListingPage.url);
        });
    });
});

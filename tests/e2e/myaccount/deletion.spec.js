'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var helpers = require('../helpers');
var fixtures = require('../fixtures');
var MyAccountPage = require('./pages/MyAccount.page');
var LoginPage = require('./pages/Login.page');
var ProjectsPage = require('../projects/pages/Projects.page');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('User deletion', function() {
    var myAccountPage = new MyAccountPage(),
        loginPage = new LoginPage(),
        projectsPage = new ProjectsPage();

    beforeEach(function () {
        loginPage.go();
        loginPage.login(
            fixtures.deletableUser.email,
            fixtures.deletableUser.code
        );
        myAccountPage.go();
    });

    it('Successful', function () {
        browser.waitForAngular();
        myAccountPage.deleteAccount();
        expect(helpers.getUrlPath(browser.getCurrentUrl())).to.eventually.equal(projectsPage.url);
    });
});

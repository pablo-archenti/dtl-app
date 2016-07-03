'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var helpers = require('../helpers');
var fixtures = require('../fixtures');
var LoginPage = require('./pages/Login.page');
var ProjectsPage = require('../projects/pages/Projects.page');
var MyAccountPage = require('./pages/MyAccount.page');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('User authentication', function() {
    var loginPage = new LoginPage(),
        projectsPage = new ProjectsPage(),
        myAccountPage = new MyAccountPage();

    describe('User login', function() {

        beforeEach(function() {
            loginPage.go();
        });

        it('Successful', function () {
            loginPage.login(
                fixtures.registeredUser.email,
                fixtures.registeredUser.code
            );
            expect(helpers.getUrlPath(browser.getCurrentUrl())).to.eventually.equal(projectsPage.url);
        });
    });

    describe('User logout', function() {

        beforeEach(function () {
            loginPage.go();
            loginPage.login(
                fixtures.registeredUser.email,
                fixtures.registeredUser.code
            );
            myAccountPage.go();
        });

        it('Successful', function () {
            myAccountPage.logout();
            expect(helpers.getUrlPath(browser.getCurrentUrl())).to.eventually.equal(loginPage.url);
        });
    });


});

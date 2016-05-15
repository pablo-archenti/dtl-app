'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var helpers = require('../helpers');
var fixtures = require('../fixtures');
var LoginPage = require('./pages/Login.page');
var MyAccountPage = require('./pages/MyAccount.page');
var ProjectsPage = require('../projects/pages/Projects.page');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('User authentication', function() {
    var loginPage = new LoginPage(),
        myAccountPage = new MyAccountPage(),
        projectsPage = new ProjectsPage();

    describe('User login', function() {

        beforeEach(function() {
            loginPage.go();
        });

        it('Successful user login', function () {
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

        it('Successful user logout', function () {
            myAccountPage.logout();
            expect(helpers.getUrlPath(browser.getCurrentUrl())).to.eventually.equal(loginPage.url);
        });
    });


});





'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var helpers = require('../helpers');
var fixtures = require('../fixtures');
var LoginPage = require('./pages/Login.page');
var LogoutPage = require('./pages/Logout.page');
var ProjectsListingPage = require('../projects/pages/ProjectsListing.page');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('User authentication', function() {
    var loginPage = new LoginPage(),
        logoutPage = new LogoutPage(),
        projectsListingPage = new ProjectsListingPage();

    describe('User login', function() {

        beforeEach(function() {
            loginPage.go();
        })

        it('Successful user login', function () {
            loginPage.login(
                fixtures.registeredUser.email,
                fixtures.registeredUser.code
            );
            expect(helpers.getUrlPath(browser.getCurrentUrl())).to.eventually.equal(projectsListingPage.url);
        });
    });

    describe('User logout', function() {

        beforeEach(function () {
            loginPage.go();
            loginPage.login(
                fixtures.registeredUser.email,
                fixtures.registeredUser.code
            );
            logoutPage.go();
        });

        it('Successful user logout', function () {
            logoutPage.logout();
            expect(helpers.getUrlPath(browser.getCurrentUrl())).to.eventually.equal(loginPage.url);
        });
    });


})





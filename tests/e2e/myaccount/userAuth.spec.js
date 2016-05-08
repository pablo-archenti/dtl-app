'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var helpers = require('../helpers');
var LoginPage = require('./pages/Login.page');
var LogoutPage = require('./pages/Logout.page');
var ProjectsListingPage = require('../projects/pages/ProjectsListing.page');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('User authentication', function() {
    var loginPage,
        logoutPage,
        projectsListingPage;

    before(function () {
        loginPage = new LoginPage();
        logoutPage = new LogoutPage();
        projectsListingPage = new ProjectsListingPage();
    });

    describe('User login', function() {

        beforeEach(function() {
            loginPage.go();
        })

        describe('Successful login', function() {

            it('should take the login user to the projects listing page', function () {
                loginPage.login(
                    helpers.registeredUser.email,
                    helpers.registeredUser.code
                );
                expect(helpers.getUrlPath(browser.getCurrentUrl())).to.eventually.equal(projectsListingPage.url);
            });
        });
    });

    describe('User logout', function() {

        beforeEach(function () {
            loginPage.go();
            loginPage.login(
                helpers.registeredUser.email,
                helpers.registeredUser.code
            );
            logoutPage.go();
        });

        describe('Successful logout', function() {

            it('should take the login user to the login page', function () {
                logoutPage.logout();
                expect(helpers.getUrlPath(browser.getCurrentUrl())).to.eventually.equal(loginPage.url);
            });
        });
    });


})





'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var helpers = require('../helpers');
var RegistrationPage = require('./pages/Registration.page');
var ProjectsListingPage = require('../projects/pages/ProjectsListing.page');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('User registration', function() {
    var registrationPage = new RegistrationPage(),
        projectsListingPage = new ProjectsListingPage();

    beforeEach(function () {
        registrationPage.go();
    });

    describe('Successful registration', function() {

        it('should take the new user to the projects listing page', function () {
            registrationPage.register({
                name: 'Pablo Nuevo Perez',
                email: 'pablo.nuevo.perez@desdetulugar.com.ar',
                phone: '11111'
            });
            expect(helpers.getUrlPath(browser.getCurrentUrl())).to.eventually.equal(projectsListingPage.url);
        });
    });
});

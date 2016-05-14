'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var helpers = require('../helpers');
var MyAccountPage = require('./pages/MyAccount.page');
var ProjectsListingPage = require('../projects/pages/ProjectsListing.page');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('User registration', function() {
    var myAccountPage = new MyAccountPage(),
        projectsListingPage = new ProjectsListingPage();

    beforeEach(function () {
        myAccountPage.goSignup();
    });

    it('Successful user registration', function () {
        myAccountPage.register({
            name: 'Pablo Nuevo Perez',
            email: 'pablo.nuevo.perez@desdetulugar.com.ar',
            phone: '11111'
        });
        expect(helpers.getUrlPath(browser.getCurrentUrl())).to.eventually.equal(projectsListingPage.url);
    });
});

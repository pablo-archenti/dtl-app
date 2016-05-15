'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var helpers = require('../helpers');
var MyAccountPage = require('./pages/MyAccount.page');
var LoginPage = require('./pages/Login.page');
var ProjectsPage = require('../projects/pages/Projects.page');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('User registration', function() {
    var myAccountPage = new MyAccountPage(),
        loginPage = new LoginPage(),
        projectsPage = new ProjectsPage();

    before(function () {
        loginPage.go();
    });

    it('Successful user registration', function () {
        myAccountPage.clickSignupButton();
        myAccountPage.register({
            name: 'Pablo Nuevo Perez',
            email: 'pablo.nuevo.perez@desdetulugar.com.ar',
            phone: '11111'
        });
        expect(helpers.getUrlPath(browser.getCurrentUrl())).to.eventually.equal(projectsPage.url);
    });
});

'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var helpers = require('../helpers');
var fixtures = require('../fixtures');
var LoginPage = require('../myaccount/pages/Login.page');
var ProjectPage = require('./pages/Project.page');
var ProjectsPage = require('./pages/Projects.page');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Project', function() {
    var loginPage = new LoginPage(),
        projectPage = new ProjectPage(),
        projectsPage = new ProjectsPage();

    beforeEach(function() {
        loginPage.go();
        loginPage.login(
            fixtures.registeredUser.email,
            fixtures.registeredUser.code
        );
    });

    describe('Subscribe', function() {

        it('Successful', function () {
            var projectPage = projectsPage.getProject(2);
            projectPage.go();
            projectPage.subscribe('My comment');
        });
    });

    describe('Unsubscribe', function() {

        it('Successful', function () {
            var projectPage = projectsPage.getProject(2);
            projectPage.go();
            projectPage.unsubscribe();
        });
    });

});

'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var helpers = require('../helpers');
var fixtures = require('../fixtures');
var ProjectsPage = require('./pages/Projects.page');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Projects', function() {
    var projectsPage = new ProjectsPage();

    beforeEach(function() {
        projectsPage.go();
    });

    describe('Listing', function() {

        it('should list all projects available', function () {
            expect(projectsPage.getNumberOfProjects()).to.eventually.equal(7);
        });
    });

});

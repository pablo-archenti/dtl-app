'use strict';

var Project = require('./Project.page');

module.exports = ProjectsPage;

function ProjectsPage() {
    this.url =  '/#/app/projects/list?env=testing';

    this.go = function() {
        browser.get(this.url);
    };

    this.getProject = function(position) {
        return new Project(element(by.repeater('project in projects').row(position)));
    };

    this.getNumberOfProjects = function() {
        return element.all(by.repeater('project in projects'))
        .then(function(p) {
           return p.length;
        });
    }
}

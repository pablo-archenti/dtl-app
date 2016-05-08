'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var RegistrationPage = require('./pages/Registration.page');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('User registration', function() {
    var registrationPage;

    before(function () {
        registrationPage = new RegistrationPage();
        registrationPage.go();
    });

    describe('Successful registration', function() {

        it('should take the new user to the projects list page', function () {
            registrationPage.register({
                name: 'Pablo Perez',
                email: 'pablo.perez@desdetulugar.com.ar',
                phone: '11111'
            });
            browser.getTitle().then(function(title) {
                console.log('TITLE: ', title);
            });
        });
    });
});

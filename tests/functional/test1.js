'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('my app', function() {

    beforeEach(function () {
        browser.get('');
    });

    it('should automatically redirect to / when location hash is empty', function() {
        //expect(browser.getLocationAbsUrl()).toMatch("/#/app/login");
        expect(browser.getLocationAbsUrl()).to.eventually.equal("/app/projects/list");
    });
});

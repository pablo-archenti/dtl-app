
describe('storage', function () {

    describe('localStorage', function() {
        var localStorage;

        beforeEach(module('storage'));
        beforeEach(inject(function (_localStorage_) {
          localStorage = _localStorage_;
        }));

        describe('set', function () {

          it('assigns a value to a key', function () {
            localStorage.set('testkey', 1);
            localStorage.get('testkey').should.equal(1);
          });

        });
    });
});

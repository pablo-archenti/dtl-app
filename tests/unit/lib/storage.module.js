
describe('storage', function () {

    describe('localStorage', function() {
        var localStorage;

        beforeEach(module('storage'));
        beforeEach(inject(function (_localStorage_) {
          localStorage = _localStorage_;
        }));
        
        it('can get an instance of my factory', function() {
            expect(localStorage).to.not.be.undefined;
        });

        describe('set', function () {

          it('assigns a value to a key', function () {
                localStorage.set('testkey', 1);
                localStorage.get('testkey').should.equal(1);
          });

          it('assigns a value to a key', function () {
                localStorage.set('testkey', 1);
                localStorage.get('testkey').should.equal(1);
          });

        });
    });
});


describe('storage', function () {

    describe('localStorage', function() {
        var localStorage,
            $window;

        beforeEach(module('storage'));
        beforeEach(inject(function (_localStorage_, _$window_) {
            localStorage = _localStorage_;
            $window = _$window_;
        }));

        describe('set', function () {

            it('assigns a value to a key', function () {
                var key = 'test1';
                var value = { key: 'value'};

                sinon.spy($window.localStorage, 'setItem');
                localStorage.set(key, value);
                $window.localStorage.setItem.getCall(0).args[0].should.equal(key);
                $window.localStorage.setItem.getCall(0).args[1].should.equal(JSON.stringify(value));
                $window.localStorage.setItem.restore();
            });
        });

        describe('get', function () {
            var getItemStub;

            beforeEach(function() {
                getItemStub = sinon.stub($window.localStorage, 'getItem');
            });
            afterEach(function() {
                $window.localStorage.getItem.restore();
            });

            it('returns a value from an existing key', function () {
                var key = 'test1';
                getItemStub.withArgs(key).returns('{"key": 10}');
                localStorage.get(key).should.deep.equal({key: 10});
            });
            it('returns null when value is null', function () {
                var key = 'test1';
                getItemStub.withArgs(key).returns(null);
                expect(localStorage.get(key)).to.equal(null);
            });
            it('returns 0 when value is 0', function () {
                var key = 'test1';
                getItemStub.withArgs(key).returns(0);
                expect(localStorage.get(key)).to.equal(0);
            });
            it('returns null when value is undefined', function () {
                var key = 'test1';
                getItemStub.withArgs(key).returns(undefined);
                expect(localStorage.get(key)).to.equal(null);
            });
        });
    });
});

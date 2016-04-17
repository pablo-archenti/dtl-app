describe('storage.module', function () {

    describe('localStorage', function() {
        var localStorage,
            $window;

        beforeEach(module('storage'));
        beforeEach(module(function($provide) {
            $provide.factory('$window', function() {
                return {
                    localStorage: {
                        setItem: sinon.spy(),
                        getItem: sinon.stub(),
                        removeItem: sinon.spy(),
                        clear: sinon.spy()
                    }
                };
            });
        }));
        beforeEach(inject(function (_localStorage_, _$window_) {
            localStorage = _localStorage_;
            $window = _$window_;
        }));

        describe('set', function () {
            it('assigns a value to a key', function () {
                var key = 'test1';
                var value = { key: 'value'};

                localStorage.set(key, value);
                $window.localStorage.setItem.getCall(0).args[0].should.equal(key);
                $window.localStorage.setItem.getCall(0).args[1].should.equal(JSON.stringify(value));
            });
        });

        describe('get', function () {
            it('returns a value from an existing key', function () {
                var key = 'test1';
                $window.localStorage.getItem.withArgs(key).returns('{"key": 10}');
                localStorage.get(key).should.deep.equal({key: 10});
            });

            it('returns null when value is null', function () {
                var key = 'test1';
                $window.localStorage.getItem.withArgs(key).returns(null);
                expect(localStorage.get(key)).to.equal(null);
            });

            it('returns 0 when value is 0', function () {
                var key = 'test1';
                $window.localStorage.getItem.withArgs(key).returns(0);
                expect(localStorage.get(key)).to.equal(0);
            });

            it('returns null when value is undefined', function () {
                var key = 'test1';
                $window.localStorage.getItem.withArgs(key).returns(undefined);
                expect(localStorage.get(key)).to.equal(null);
            });
        });

        describe('remove', function () {
            it('delete by key', function () {
                localStorage.remove('key1');
                $window.localStorage.removeItem.getCall(0).args[0].should.equal('key1');
            });
        });

        describe('clear', function () {
            it('delete all the storage', function () {
                localStorage.clear();
                $window.localStorage.clear.calledOnce.should.equal(true);
            });
        });
    });
});

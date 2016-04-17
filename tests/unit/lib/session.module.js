describe('session.module', function () {

    describe('userSession', function() {
        var userSession,
            localStorage;

        beforeEach(module('session'));
        beforeEach(function() {
            module({
                'localStorage': {
                    set: sinon.spy(),
                    get: sinon.stub(),
                    remove: sinon.spy()
                }
            });
        });
        beforeEach(inject(function (_userSession_, _localStorage_) {
            userSession = _userSession_;
            localStorage = _localStorage_;
        }));

        describe('getUserId', function() {
            it('should return user id', function() {
                sinon.stub(userSession, "getUserData").returns({ id:100 });

                userSession.getUserId().should.equal(100);
            });

            it('should return null when not set', function() {
                sinon.stub(userSession, "getUserData").returns(null);

                expect(userSession.getUserId()).equal(null);
            });
        });

        describe('getUserData', function() {
            it('should return user data value', function() {
                localStorage.get.returns({ id: 1});

                userSession.getUserData().should.deep.equal({ id: 1 });
            });
        });

        describe('setUserData', function() {
            it('should set user data', function() {
                userSession.setUserData({ id: 1 });

                localStorage.set.getCall(0).args[0].should.equal("user.data");
                localStorage.set.getCall(0).args[1].should.deep.equal({ id: 1 });
            });
        });

        describe('getToken', function() {
            it('should return user session token', function() {
                localStorage.get.returns("token1");

                userSession.getToken().should.deep.equal("token1");
            });
        });

        describe('setToken', function() {
            it('should set user session token', function() {
                userSession.setToken("token1");

                localStorage.set.getCall(0).args[0].should.equal("user.token");
                localStorage.set.getCall(0).args[1].should.deep.equal("token1");
            });
        });

        describe('clearSession', function() {
            it('should clear all user session data', function() {
                userSession.clearSession();

                localStorage.remove.getCall(0).args[0].should.equal("user.data");
                localStorage.remove.getCall(1).args[0].should.deep.equal("user.token");
            });
        });
    });
});

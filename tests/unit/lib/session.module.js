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

    describe('goBackState', function() {
        var goBackState;

        beforeEach(module('session'));
        beforeEach(inject(function (_goBackState_) {
            goBackState = _goBackState_;
        }));

        describe('save', function() {
            it('should set state and params', function() {
                goBackState.save('state1', { id: 100 });
                goBackState.getState().should.equal('state1');
                goBackState.getParams().should.deep.equal({ id: 100 });
            });
        });

        describe('getState', function() {
            it('should return state', function() {
                goBackState.save('state1');
                goBackState.getState().should.equal('state1');
            });
            it('should return default state if not previously set', function() {
                goBackState.save();
                goBackState.getState('defaultState').should.equal('defaultState');
            });
        });

        describe('getParams', function() {
            it('should return state params', function() {
                goBackState.save('state1', { id: 200 });
                goBackState.getParams().should.deep.equal({ id: 200 });
            });
            it('should return default params if not previously set', function() {
                goBackState.save();
                goBackState.getParams({ id: 200 }).should.deep.equal({ id: 200 });
            });
        });
    });

    describe('deviceSession', function() {
        var deviceSession,
            localStorage;

        beforeEach(module('session'));
        beforeEach(function() {
            module({
                'localStorage': {
                    set: sinon.spy(),
                    get: sinon.stub()
                }
            });
        });
        beforeEach(inject(function (_deviceSession_, _localStorage_) {
            deviceSession = _deviceSession_;
            localStorage = _localStorage_;
        }));

        describe('setToken', function() {
            it('should set device token', function() {
                deviceSession.setToken('token1');
                localStorage.set.getCall(0).args[0].should.equal('device.token');
                localStorage.set.getCall(0).args[1].should.equal('token1');
            });
        });

        describe('getToken', function() {
            it('should return device token if exists', function() {
                localStorage.get.withArgs('device.token').returns('token1');
                deviceSession.getToken().should.equal('token1');
            });
            it('should return null if doesn\'t exist', function() {
                localStorage.get.withArgs('device.token').returns(null);
                expect(deviceSession.getToken()).to.be.equal(null);
            });
        });

    });
});

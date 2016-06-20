describe('ui.module', function () {

    describe('loader', function() {
        var loader,
            $ionicLoading,
            uiResource;

        beforeEach(module('ui'));
        beforeEach(function() {
            module({
                '$ionicLoading': {
                    show: sinon.spy(),
                    hide: sinon.spy()
                },
                'uiResource': {
                    getText: sinon.stub()
                }
            });
        });
        beforeEach(inject(function (_loader_, _$ionicLoading_, _uiResource_) {
            loader = _loader_;
            $ionicLoading = _$ionicLoading_;
            uiResource = _uiResource_;
        }));

        describe('show', function() {
            var key = 'key1';

            it('should load spinner with text', function() {
                uiResource.getText.withArgs(key).returns('text1');
                loader.show(key);
                $ionicLoading.show.getCall(0).args[0].should.deep.equal({
                    template: '<ion-spinner></ion-spinner><div>text1</div>'
                });
            });

            it('should load spinner without text', function() {
                uiResource.getText.withArgs(key).returns(null);
                loader.show(key);
                $ionicLoading.show.getCall(0).args[0].should.deep.equal({
                    template: '<ion-spinner></ion-spinner>'
                });
            });
        });

        describe('hide', function() {
            it('should call ionic loader hide() method', function() {
                loader.hide();
                $ionicLoading.hide.calledOnce.should.equal(true);
            });
        });
    });

    describe('alert', function() {
        var alert,
            $ionicPopup,
            $timeout,
            uiResource,
            popUpInstance;

        beforeEach(module('ui'));
        beforeEach(function() {
            module({
                '$ionicPopup': {
                    alert: sinon.stub(),
                    confirm: sinon.stub()
                },
                '$timeout': sinon.spy(),
                'uiResource': {
                    getText: sinon.stub()
                }
            });
        });
        beforeEach(inject(function (_alert_, _$ionicPopup_, _$timeout_, _uiResource_) {
            alert = _alert_;
            $ionicPopup = _$ionicPopup_;
            $timeout = _$timeout_;
            uiResource = _uiResource_;
        }));

        beforeEach(function() {
            popUpInstance = { close: sinon.spy() };
            $ionicPopup.alert.returns(popUpInstance);
            uiResource.getText.withArgs('key1').returns('text1');
        });

        describe('info', function() {

            it('should pop up an info alert with text and default seconds', function() {
                alert.info('key1');

                $ionicPopup.alert.getCall(0).args[0].should.deep.equal({
                    title: 'Info',
                    cssClass: 'alert-info',
                    template: 'text1'
                });
                $timeout.getCall(0).args[0]();
                $timeout.getCall(0).args[1].should.equal(5000);
                popUpInstance.close.calledOnce.should.equal(true);
            });

            it('should pop up an info alert with text and specified seconds', function() {
                alert.info('key1', 10000);

                $ionicPopup.alert.getCall(0).args[0].should.deep.equal({
                    title: 'Info',
                    cssClass: 'alert-info',
                    template: 'text1'
                });
                $timeout.getCall(0).args[0]();
                $timeout.getCall(0).args[1].should.equal(10000);
                popUpInstance.close.calledOnce.should.equal(true);
            });
        });

        describe('error', function() {

            it('should pop up an error alert with default text and seconds', function() {
                uiResource.getText.withArgs('key1').returns(null);
                uiResource.getText.withArgs('default.error').returns('text1');

                alert.error();

                $ionicPopup.alert.getCall(0).args[0].should.deep.equal({
                    title: 'Error',
                    cssClass: 'alert-error',
                    template: 'text1'
                });
                $timeout.getCall(0).args[0]();
                $timeout.getCall(0).args[1].should.equal(5000);
                popUpInstance.close.calledOnce.should.equal(true);
            });

            it('should pop up an error alert with text and specified seconds', function() {
                alert.error('key1', 2000);

                $ionicPopup.alert.getCall(0).args[0].should.deep.equal({
                    title: 'Error',
                    cssClass: 'alert-error',
                    template: 'text1'
                });
                $timeout.getCall(0).args[0]();
                $timeout.getCall(0).args[1].should.equal(2000);
                popUpInstance.close.calledOnce.should.equal(true);
            });
        });

        describe('confirm', function() {

            it('should pop up a confirmation window', function(done) {
                $ionicPopup.confirm.returns(Promise.resolve(true));

                alert.confirm('key1').should.eventually.equal(true).notify(done);

                $ionicPopup.confirm.getCall(0).args[0].should.deep.equal({
                    title: 'Confirmación',
                    cssClass: 'alert-confirm',
                    template: 'text1',
                    okText: 'Confirmar',
                    cancelText: 'Cancelar'
                });
            });

        });

    });

});

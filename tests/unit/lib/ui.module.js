
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

});

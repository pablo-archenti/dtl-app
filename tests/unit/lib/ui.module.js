
describe('ui.module', function () {

    describe('loader', function() {
        var loader,
            $ionicLoading,
            uiResource;

        beforeEach(module('ui'));
        beforeEach(inject(function (_loader_, _$ionicLoading_, _uiResource_) {
            loader = _loader_;
            $ionicLoading = _$ionicLoading_;
            uiResource = _uiResource_;
        }));
        beforeEach(function() {
            getTextStub = sinon.stub(uiResource, "getText");
            showSpy = sinon.spy($ionicLoading, "show");
        });
        afterEach(function() {
            uiResource.getText.restore();
            $ionicLoading.show.restore();
        });

        describe('show', function() {
            var key = 'key1';

            it('should loading spinner with text', function() {
                getTextStub.withArgs(key).returns('text');

                loader.show(key);
                showSpy.getCall(0).args[0].should.deep.equal({
                    template: '<ion-spinner></ion-spinner><div>text</div>'
                });
            });

        });
    });

});

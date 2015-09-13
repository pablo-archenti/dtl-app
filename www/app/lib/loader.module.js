(function() {
    'use strict';

    angular.module('loader', [])
    .factory('loader', loader);

    loader.$inject = ['$ionicLoading', '$timeout'];

    function loader($ionicLoading, $timeout) {
        return {
            showLoading: function(text) {
                text = text || 'Loading...';
                $ionicLoading.show({
                    template: text
                });
            },

            hideLoading: function() {
                $ionicLoading.hide();
            },

            toggleLoadingWithMessage: function(text, timeout) {
                var self = this;
                self.showLoading(text);

                $timeout(function() {
                    self.hideLoading();
                }, timeout || 3000);
            }
        };
    }

})();

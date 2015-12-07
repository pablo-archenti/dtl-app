(function() {
    'use strict';

    angular.module('ui', [])
    .factory('loader', loader)
    .factory('alert', alert);

    loader.$inject = ['$ionicLoading', '$timeout'];
    alert.$inject  = ['$ionicPopup', '$timeout'];

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

    function alert($ionicPopup, $timeout) {
        var alertPopup;
        return {
            info: function(text, timeout) {
                alertPopup = $ionicPopup.alert({
                    title: 'Info',
                    template: text
                });
                $timeout(function() {
                        alertPopup.close();
                    },
                    timeout || 10000
                );
            },
            error: function(text, timeout) {
                alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: text || 'Ha ocurrido un error. Inténtalo nuevamente.'
                });
                $timeout(function() {
                        alertPopup.close();
                    },
                    timeout || 10000
                );
            },
            confirm: function(text) {
                return $ionicPopup.confirm({
                    title: 'Estás seguro?',
                    template: text
                })
                .then(function(yes) {
                    if (yes) return true;
                    else return false;
                });
            }
        };
    }

})();

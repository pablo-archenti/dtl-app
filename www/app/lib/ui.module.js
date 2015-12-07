(function() {
    'use strict';

    angular.module('ui', [])
    .provider('uiResource', uiResource)
    .factory('loader', loader)
    .factory('alert', alert);

    loader.$inject = ['$ionicLoading', '$timeout'];
    alert.$inject  = ['$ionicPopup', '$timeout', 'uiResource'];

    function uiResource() {
        var texts;
        return {
            setTexts: function(t) {
                texts = t;
            },
            $get: function () {
                return {
                    texts: texts
                };
            }
        };
    }

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

    function alert($ionicPopup, $timeout, uiResource) {
        var alertPopup;

        function getMessage(key) {
            return uiResource.texts[key] || null;
        }

        return {
            info: function(text, timeout) {
                alertPopup = $ionicPopup.alert({
                    title: 'Info',
                    template: getMessage(text)
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
                    template: getMessage(text) || 'Ha ocurrido un error. Inténtalo nuevamente.'
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
                    template: getMessage(text)
                })
                .then(function(yes) {
                    if (yes) return true;
                    else return false;
                });
            }
        };
    }

})();

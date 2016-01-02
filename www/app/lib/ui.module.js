(function() {
    'use strict';

    angular.module('ui', [])
    .provider('uiResource', uiResource)
    .factory('loader', loader)
    .factory('alert', alert);

    loader.$inject = ['$ionicLoading', '$timeout', 'uiResource'];
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

    function loader($ionicLoading, $timeout, uiResource) {

        function getMessage(key) {
            return uiResource.texts[key] || null;
        }

        return {
            show: function(text) {
                text = getMessage(text) || 'Cargando...';
                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner><div>' + text + '</div>'
                });
            },

            hide: function() {
                $ionicLoading.hide();
            },

            toggle: function(text, timeout) {
                var self = this;
                self.show(text);

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
                    cssClass: 'alert-info',
                    template: getMessage(text)
                });
                $timeout(function() {
                        alertPopup.close();
                    },
                    timeout || 5000
                );
            },
            error: function(text, timeout) {
                alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    cssClass: 'alert-error',
                    template: getMessage(text) || 'Ha ocurrido un error. Inténtalo nuevamente.'
                });
                $timeout(function() {
                        alertPopup.close();
                    },
                    timeout || 5000
                );
            },
            confirm: function(text) {
                return $ionicPopup.confirm({
                    title: 'Estás seguro?',
                    cssClass: 'alert-confirm',
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

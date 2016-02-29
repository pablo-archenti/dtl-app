(function() {
    'use strict';

    angular.module('ui', [])
    .provider('uiResource', uiResource)
    .factory('loader', loader)
    .factory('alert', alert);

    loader.$inject = ['$ionicLoading', 'uiResource'];
    alert.$inject  = ['$ionicPopup', '$timeout', 'uiResource'];

    function uiResource() {
        var texts;
        return {
            setTexts: function(t) {
                texts = t;
            },
            $get: function () {
                return {
                    getText: function(key) {
                        return texts[key] || null;
                    }
                };
            }
        };
    }

    function loader($ionicLoading, uiResource) {

        return {
            show: function(textKey) {
                var text = uiResource.getText(textKey);
                text = text && '<div>' + text + '</div>' || '';
                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner>' + text
                });
            },

            hide: function() {
                $ionicLoading.hide();
            }
        };
    }

    function alert($ionicPopup, $timeout, uiResource) {
        var alertPopup;

        return {
            info: function(textKey, timeout) {
                alertPopup = $ionicPopup.alert({
                    title: 'Info',
                    cssClass: 'alert-info',
                    template: uiResource.getText(textKey)
                });
                $timeout(function() {
                        alertPopup.close();
                    },
                    timeout || 5000
                );
            },
            error: function(textKey, timeout) {
                alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    cssClass: 'alert-error',
                    template: uiResource.getText(textKey) || 'Ha ocurrido un error. Inténtalo nuevamente.'
                });
                $timeout(function() {
                        alertPopup.close();
                    },
                    timeout || 5000
                );
            },
            confirm: function(textKey) {
                return $ionicPopup.confirm({
                    title: 'Confirmación',
                    cssClass: 'alert-confirm',
                    template: uiResource.getText(textKey),
                    okText: 'Confirmar',
                    cancelText: 'Cancelar'
                })
                .then(function(yes) {
                    if (yes) return true;
                    else return false;
                });
            }
        };
    }

})();

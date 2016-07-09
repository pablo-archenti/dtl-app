(function() {
    'use strict';

    angular
    .module('myaccount')
    .controller('MyAccountCtrl', MyAccountCtrl)
    .controller('EditMyAccountCtrl', EditMyAccountCtrl)
    .controller('LoginCtrl', LoginCtrl)
    .controller('SignupCtrl', SignupCtrl);

    MyAccountCtrl.$inject      = ['$scope', '$state', '$ionicHistory', 'alert', 'dtlVolunteer', 'loader', 'dtlDeviceToken'];
    EditMyAccountCtrl.$inject  = ['$scope', '$state', '$ionicHistory', 'alert', 'dtlVolunteer', 'loader'];
    LoginCtrl.$inject          = ['$scope', '$state', '$ionicHistory', 'dtlVolunteer', 'loader', 'alert', 'dtlDeviceToken', 'goBackState'];
    SignupCtrl.$inject         = ['$scope', '$state', '$ionicHistory', 'dtlVolunteer', 'alert', 'loader', 'goBackState'];

    function MyAccountCtrl($scope, $state, $ionicHistory, alert, dtlVolunteer, loader, dtlDeviceToken) {

        $scope.delete = function() {
            alert.confirm('account.confirmDeletion')
            .then(function(ok) {
                if (ok) {
                    loader.show('deletingAccount');
                    dtlVolunteer.deleteAccount()
                    .then(function() {
                        $ionicHistory.nextViewOptions({
                            historyRoot: true
                        });
                        $state.go('app.projects.list');
                    })
                    .finally(function() {
                        loader.hide();
                    });
                }
            })
            .catch(function() {
                alert.error();
            });
        };

        $scope.logout = function() {
            loader.show('loggingOut');
            dtlVolunteer.logout()
            .finally(function() {
                loader.hide();
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $ionicHistory.clearCache();
                $state.go('app.login');
                dtlDeviceToken.unsetVolunteer();
            });
        };
    }

    function EditMyAccountCtrl($scope, $state, $ionicHistory, alert, dtlVolunteer, loader) {
        $scope.viewTitle = 'Editar';

        initView();
        function initView() {
            loader.show();
            dtlVolunteer.getAccount()
            .then(function(data) {
                $scope.data = data;
            })
            .catch(function() {
                alert.error();
                $state.go('app.myaccount');
            })
            .finally(function() {
                loader.hide();
            });
        }

        $scope.submitData = function(userData) {
            loader.show('updatingData');
            dtlVolunteer.updateAccount(userData)
            .then(function() {
                //prevent back button
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $state.go('app.myaccount');
            })
            .catch(function() {
                alert.error();
            })
            .finally(function() {
                loader.hide();
            });
        };

        $scope.cancel = function() {
            $scope.data = {};
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.myaccount');
        };
    }

    function LoginCtrl($scope, $state, $ionicHistory, dtlVolunteer, loader, alert, dtlDeviceToken, goBackState) {

        $scope.showCode = function() {
            $scope.codeShown = 1;
            $scope.codeHidden = 0;
        };

        $scope.hideCode = function() {
            $scope.codeShown = 0;
            $scope.codeHidden = 1;
        };

        $scope.login = function(credentials) {
            loader.show('loggingIn');
            dtlVolunteer.login(credentials)
            .then(function() {
                //prevent back button
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $scope.hideCode();
                $state.go(goBackState.getState('app.projects.list'), goBackState.getParams());
                dtlDeviceToken.setVolunteer();
            })
            .catch(function() {
                alert.error();
            })
            .finally(function() {
                loader.hide();
            });
        };

        $scope.sendLoginCode = function(email) {
            loader.show('sendingCode');

            dtlVolunteer.sendLoginCode(email)
            .then(function() {
                $scope.showCode();
            })
            .catch(function(err) {
                var message = (err.status === 404) ? 'account.notExists' : null;
                alert.error(message);
            })
            .finally(function() {
                loader.hide();
            });
        };

        $scope.cancelLogin = function() {
            $scope.hideCode();
        };

        $scope.hideCode();
    }

    function SignupCtrl($scope, $state, $ionicHistory, dtlVolunteer, alert, loader, goBackState) {

        $scope.data = {};

        $scope.submitData = function(userData) {
            loader.show('signingUp');
            dtlVolunteer.createAccount(userData)
            .then(function(volunteer) {
                return dtlVolunteer.login({
                    email: volunteer.email,
                    code: volunteer.code
                });
            })
            .then(function() {
                //prevent back button
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $state.go(goBackState.getState('app.projects.list'), goBackState.getParams());
            })
            .catch(function(err) {
                var message = null;
                if (err.code == 'uniqueness')
                message = 'account.exists';
                alert.error(message);
            })
            .finally(function() {
                loader.hide();
            });
        };

        $scope.cancel = function() {
            $scope.data = {};
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.myaccount');
        };
    }

})();

(function() {
    'use strict';

    angular
        .module('myaccount')
        .controller('MyAccountCtrl', MyAccountCtrl)
        .controller('EditMyAccountCtrl', EditMyAccountCtrl)
        .controller('LoginCtrl', LoginCtrl)
        .controller('SignupCtrl', SignupCtrl);

    MyAccountCtrl.$inject      = ['$scope', '$state', '$ionicHistory', 'alert', 'accountService'];
    EditMyAccountCtrl.$inject  = ['$scope', '$state', '$ionicHistory', 'alert', 'accountService', 'loader'];
    LoginCtrl.$inject          = ['$scope', '$state', '$ionicHistory', 'accountService', 'loader', 'alert'];
    SignupCtrl.$inject         = ['$scope', '$state', '$ionicHistory', 'accountService', 'alert'];

    function MyAccountCtrl($scope, $state, $ionicHistory, alert, accountService) {

        $scope.delete = function() {
            alert.confirm('account.confirmDeletion')
            .then(function(ok) {
                if (ok) {
                    accountService.deleteAccount()
                    .then(function() {
                        $ionicHistory.nextViewOptions({
                            historyRoot: true
                        });
                        $state.go('app.login');
                        alert.info('account.deleted');
                    });
                }
            })
            .catch(function() {
                alert.error();
            });
        };

        $scope.logout = function() {
            accountService.logout()
            .then(function() {
                $state.go('app.login');
                alert.info('account.logout');
            })
            .catch(function() {
                alert.error();
            });
        };
    }

    function EditMyAccountCtrl($scope, $state, $ionicHistory, alert, accountService, loader) {
        initView();
        function initView() {
            loader.showLoading('Cargando datos...');
            accountService.getAccount()
            .then(function(data) {
                $scope.data = data;
            })
            .catch(function() {
                alert.error();
                $state.go('app.myaccount');
            })
            .finally(function() {
                loader.hideLoading();
            });
        }

        $scope.submitData = function(userData) {
            accountService.updateAccount(userData)
            .then(function() {
                //prevent back button
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $state.go('app.myaccount');
            })
            .catch(function() {
                alert.error();
            });
        };
    }

    function LoginCtrl($scope, $state, $ionicHistory, accountService, loader, alert) {

        $scope.showCode = function() {
            $scope.codeShown = 1;
            $scope.codeHidden = 0;
        };

        $scope.hideCode = function() {
            $scope.codeShown = 0;
            $scope.codeHidden = 1;
        };

        $scope.login = function(credentials) {
            accountService.login(credentials)
            .then(function() {
                //prevent back button
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $scope.hideCode();
                $state.go('app.projectsList');
            })
            .catch(function() {
                alert.error();
            });
        };

        $scope.requestLoginCode = function(email) {
            loader.showLoading('Enviando email...');

            accountService.requestLoginCode(email)
            .then(function() {
                $scope.showCode();
            })
            .catch(function(err) {
                var message = (err.status === 404) ? 'account.notExists' : null;
                alert.error(message);
            })
            .finally(function() {
                loader.hideLoading();
            });
        };

        $scope.cancelLogin = function() {
            $scope.hideCode();
        };

        $scope.hideCode();
    }

    function SignupCtrl($scope, $state, $ionicHistory, accountService, alert) {

        $scope.data = {};

        $scope.submitData = function(userData) {
            accountService.createAccount(userData)
            .then(function(volunteer) {
                return accountService.login({
                    email: volunteer.email,
                    code: volunteer.code
                });
            })
            .then(function() {
                //prevent back button
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $state.go('app.projectsList');
            })
            .catch(function(err) {
                var message = null;
                if (err.code == 'uniqueness')
                    message = 'account.exists';
                alert.error(message);
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

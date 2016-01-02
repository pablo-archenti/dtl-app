(function() {
    'use strict';

    angular
        .module('myaccount')
        .controller('MyAccountCtrl', MyAccountCtrl)
        .controller('EditMyAccountCtrl', EditMyAccountCtrl)
        .controller('LoginCtrl', LoginCtrl)
        .controller('SignupCtrl', SignupCtrl);

    MyAccountCtrl.$inject      = ['$scope', '$state', '$ionicHistory', 'alert', 'accountService', 'loader'];
    EditMyAccountCtrl.$inject  = ['$scope', '$state', '$ionicHistory', 'alert', 'accountService', 'loader'];
    LoginCtrl.$inject          = ['$scope', '$state', '$ionicHistory', 'accountService', 'loader', 'alert'];
    SignupCtrl.$inject         = ['$scope', '$state', '$ionicHistory', 'accountService', 'alert', 'loader'];

    function MyAccountCtrl($scope, $state, $ionicHistory, alert, accountService, loader) {

        $scope.delete = function() {
            alert.confirm('account.confirmDeletion')
            .then(function(ok) {
                if (ok) {
                    loader.show('deletingAccount');
                    accountService.deleteAccount()
                    .then(function() {
                        $ionicHistory.nextViewOptions({
                            historyRoot: true
                        });
                        $state.go('app.login');
                    })
                    .finally(function() {
                        loader.hide();
                        alert.info('account.deleted');
                    });
                }
            })
            .catch(function() {
                alert.error();
            });
        };

        $scope.logout = function() {
            loader.show('loggingOut');
            accountService.logout()
            .then(function() {
                $state.go('app.login');
            })
            .catch(function() {
                alert.error();
            })
            .finally(function() {
                loader.hide();
            });
        };
    }

    function EditMyAccountCtrl($scope, $state, $ionicHistory, alert, accountService, loader) {
        initView();
        function initView() {
            loader.show('loadingData');
            accountService.getAccount()
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
            loader.show('loggingIn');
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
            })
            .finally(function() {
                loader.hide();
            });
        };

        $scope.sendLoginCode = function(email) {
            loader.show('sendingCode');

            accountService.sendLoginCode(email)
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

    function SignupCtrl($scope, $state, $ionicHistory, accountService, alert, loader) {

        $scope.data = {};

        $scope.submitData = function(userData) {
            loader.show('signingUp');
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

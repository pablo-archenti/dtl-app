angular.module('app')
.config(['$ionicAppProvider', configure]);

function configure($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID for the server
    app_id: '32e304f3',
    // The API key all services will use for this app
    api_key: '05cf53866bde417ecc331e0ec4642b1720db808b300d0511'
  });
}

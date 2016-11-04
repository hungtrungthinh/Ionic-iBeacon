angular.module('starter.controllers', [])

.controller('MonitoringCtrl', function($scope) {
  $scope.isMonitoring = false;
  $scope.mode = 'uuid';
  $scope.device = {
    uuid: '',
    identifier: '',
    major: 65535,
    minor: 65535
  }
  $scope.messages = [];
  $scope.beaconRegion = null;

  var delegate = new cordova.plugins.locationManager.Delegate();
  delegate.didDetermineStateForRegion = function (pluginResult) {
      messages.push('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
      cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
          + JSON.stringify(pluginResult));
  };
  delegate.didStartMonitoringForRegion = function (pluginResult) {
      console.log('didStartMonitoringForRegion:', pluginResult);

      messages.push('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
  };
  delegate.didRangeBeaconsInRegion = function (pluginResult) {
      messages.push('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
  };  

  var startMonitoring = function() {
    if (mode == 'uuid') {
      $scope.isMonitoring = true;

      $scope.beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
        $scope.device.identifier, 
        $scope.device.uuid, 
        $scope.device.major, 
        $scope.device.minor
      );
      
      cordova.plugins.locationManager.startMonitoringForRegion($scope.beaconRegion)
        .fail(function(e) { console.error(e); })
        .done();

    }    
  };

  var stopMonitoring = function() {
    if ($scope.beaconRegion != null) {
      cordova.plugins.locationManager.stopMonitoringForRegion(beaconRegion)
        .fail(function(e) { console.error(e); })
        .done();
      
      $scope.beaconRegion = null;      
      $scope.isMonitoring = false;
    }    
  };

   $scope.tappedButton = function() {
    if ($scope.isMonitoring) {
      stopMonitoring();
    } else {
      startMonitoring();
    }
  };
})

.controller('RangingCtrl', function($scope, IBEACON) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

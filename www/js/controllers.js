angular.module('starter.controllers', [])

.controller('MonitoringCtrl', function($scope) {
  $scope.isMonitoring = false;
  $scope.mode = 'uuid';  
  $scope.device = {
    uuid: '58E71079-4CDB-44F8-8F11-278A1246B308',
    identifier: 'gimbal-series-21',
    major: 65535,
    minor: 65535
  }
  $scope.messages = [];
  $scope.beaconRegion = null;
  
  var startMonitoring = function() {

    if ($scope.mode == 'uuid') {
      $scope.isMonitoring = true;

      ionic.Platform.ready(function(){
        // will execute when device is ready, or immediately if the device is already ready.
        var delegate = new cordova.plugins.locationManager.Delegate();
        delegate.didDetermineStateForRegion = function (pluginResult) {
            console.log('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
            cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                + JSON.stringify(pluginResult));
        };
        delegate.didStartMonitoringForRegion = function (pluginResult) {
            console.log('didStartMonitoringForRegion:', pluginResult);

            console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
        };
        delegate.didRangeBeaconsInRegion = function (pluginResult) {
                           
            console.log('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
        };
                           
       delegate.didExitRegion = function(pluginResult) {
                           alert("didExit");
           pluginResult.region = Regions.fromJson(pluginResult.region);
       };
       
       delegate.didEnterRegion = function(pluginResult) {
                           alert("didEnter");
           pluginResult.region = Regions.fromJson(pluginResult.region);
       };
      
      alert($scope.device.uuid);
      $scope.beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
        
        $scope.device.identifier,
        $scope.device.uuid,
        $scope.device.major,
        $scope.device.minor
      );

      cordova.plugins.locationManager.setDelegate(delegate);
      
      cordova.plugins.locationManager.startMonitoringForRegion($scope.beaconRegion)
        .fail(function(e) { console.error(e); })
        .done();

      });
      
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
  $scope.isRanging = false;
  $scope.mode = 'uuid';
  $scope.device = {
    uuid: '58E71079-4CDB-44F8-8F11-278A1246B308',
    identifier: 'gimbal-series-21',
    major: 65535,
    minor: 65535
  }
  
  $scope.messages = [];
  $scope.beaconRegion = null;
  
  var startRanging = function() {

    if ($scope.mode == 'uuid') {
      $scope.isRanging = true;
      ionic.Platform.ready(function(){        
        // will execute when device is ready, or immediately if the device is already ready.
        var delegate = new cordova.plugins.locationManager.Delegate();

        delegate.didDetermineStateForRegion = function (pluginResult) {
            //console.log('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

            cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                + JSON.stringify(pluginResult));
        };

        delegate.didStartMonitoringForRegion = function (pluginResult) {
            //console.log('didStartMonitoringForRegion:', pluginResult);

            //console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
        };

        delegate.didRangeBeaconsInRegion = function (pluginResult) {
          //console.log(pluginResult.beacons);
          console.log('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
        };

        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion($scope.device.identifier, $scope.device.uuid, $scope.device.major, $scope.device.minor);

        cordova.plugins.locationManager.setDelegate(delegate);

        // required in iOS 8+
        cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
        // or cordova.plugins.locationManager.requestAlwaysAuthorization()

        cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
            .fail(function(e) { console.error(e); })
            .done();
      });
      
    }  
  
  };

  var stopRanging = function() {
    if ($scope.beaconRegion != null) {
      /*cordova.plugins.locationManager.stopMonitoringForRegion(beaconRegion)
        .fail(function(e) { console.error(e); })
        .done();
      */
      $scope.beaconRegion = null;      
      $scope.isRanging = false;
    }    
  };

   $scope.tappedButton = function() {
    if ($scope.isMonitoring) {
      stopRanging();
    } else {
      startRanging();
    }
  };
})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

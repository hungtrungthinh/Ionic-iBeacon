angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.isScanning - false;
  $scope.items = [
    {
      type: 'Gimbal Beacon Series 21',
      uuid: '58SE71079-4CDB-44F8-8F11-278A1246B308',
      rssi: '-85'
    }
  ];

  var startScanning = function() {
    $scope.isScanning = true;
  };

  var stopScanning = function() {
    $scope.isScanning = false;
  };

   $scope.tappedButton = function() {
    if ($scope.isScanning) {
      stopScanning();
    } else {
      startScanning();
    }
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

angular.module('myApp').controller('ProfileController', [
  '$scope',
  '$rootScope',
  '$http',
  '$window',
  '$location',
  'Upload',
  function($scope, $rootScope, $http, $window, $location, Upload) {
    $rootScope.playmateProfile = [];
    $rootScope.playmateMatches = [];
    console.log('trying to access playstyle array values:', $rootScope.playmateProfile);

    // retrieve newest playmate created from server
    $scope.displayProfile = function() {
      $http({
        method: 'GET',
        url: '/getNewest'
      }).then(function(response) {
        $rootScope.playmateProfile = response.data;
        console.log('SUCCESS, newest playmate:', response.data);
      }, function myError (response) {
        console.log(response.statusText);
      });
    }; // end displayProfile
    $scope.displayProfile();

    // post method to send playmate's playstyles to find matches
    $scope.displayMatches = function() {
      // collect user input to send to database
      var playstylesToSend = {
        // playstyles: response.data.playstyles ? How do I access these values???
        playstyles: 'Chaser' // hardcode to test route
      };

      console.log('sending to server:', playstylesToSend);
      // post method to send input data to database
      $http({
        method: 'POST',
        url: '/sendPlaystyles',
        data: playstylesToSend
      }).then(function() {
        $scope.displayMatches();
      }); // end post method
    }; // end displayMatches

}]);

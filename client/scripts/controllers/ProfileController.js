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

    // retrieve newest playmate created from server
    $scope.displayProfile = function() {
      $http({
        method: 'GET',
        url: '/getNewest'
      }).then(function(response) {
        $rootScope.playmateProfile = response.data;
        console.log('SUCCESS, newest playmate:', response.data);
        console.log('trying to access first playstyle:', response.data[0].playstyles[0]);

        // i know that i need to access the playstyle values in the response.data
        // but i don't know how to access it
      }, function myError (response) {
        console.log(response.statusText);
      });
    }; // end displayProfile
    $scope.displayProfile();

    // post method to send playmate's playstyles to find matches
    $scope.displayMatches = function() {
      // collect user input to send to database
      var playstylesToSend = {
        playstyle1: response.data[0].breed
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

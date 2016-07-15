angular.module('myApp').controller('ProfileController', [
  '$scope',
  '$rootScope',
  '$http',
  '$window',
  '$location',
  'Upload',
  function($scope, $rootScope, $http, $window, $location, Upload) {
    $rootScope.playmateProfile = [];
    console.log('inside of profileController, playmateProfile array:', $rootScope.playmateProfile);

    // get method to retrieve newest playmate created from server
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

}]);
